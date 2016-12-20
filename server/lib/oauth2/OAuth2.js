/**
 * User: sunny
 * Date: 14-4-15
 * Time: 上午10:00
 */
import request  from 'request';
import crypto  from 'crypto';
import slogger from 'node-slogger';
import URLSafeBase64 from '../../utils/urlsafe-base64';
import '../../utils/string';
import time from '../../utils/time';

const TIME_OUT_MILLISECONDS = 30 * 1000;
const POOL_SIZE = 100;
let reqId = 0;

export default class OAuth2 {
    /**
     *
     * @param option
     * @constructor
     */
    constructor(option) {
        if (option) {
            for (let key in option) {
                this[key] = option[key];
            }
        }
    }

    _createState(req, params, callback) {
        let self = this;
        crypto.randomBytes(16, function (err, buf) {
            if (err) {
                callback(err);
                return;
            }
            let rand = new Buffer(buf).toString('hex');
            let state = params && params instanceof Object ? params : {};
            state['type'] = self.type;
            state['time'] = new Date().getTime();
            state['rand'] = rand;

            req.session.rand = rand;
            let str = JSON.stringify(state) + '';
            callback(false, URLSafeBase64.encode(new Buffer(str, 'utf8')));
        });

    }

    _createAuthParamsString(goto, state) {
        return '?client_id=' + this.clientId + '&response_type=code&redirect_uri=' + encodeURIComponent(this.redirectUri + '?goto=' + encodeURIComponent(goto)) + '&state=' + state;
    }

    getAuthUrl(req, params, callback) {
        let self = this;
        let goto = params.goto;
        params.goto = undefined;
        this._createState(req, params, function (err, state) {
            if (err) {
                callback(err);
                return;
            }
            let url = self.authUrl + self._createAuthParamsString(goto, state);
            callback(false, url);
        });
    }

    _createAccessTokenReqParams(code) {
        return {
            client_id: this.clientId,
            client_secret: this.clientSecret,
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: this.redirectUri
        };
    }
    _doRequest(options, callback) {
        const url = options.url;
        const description = options.description || '';
        options = Object.assign({
            json: true,
            timeout: TIME_OUT_MILLISECONDS,
            pool: {maxSockets: POOL_SIZE}
        },options);
        if (!options.method && options.form) {
            options.method = 'POST';
        }
        options.headers = Object.assign({
            'User-Agent': 'coding show backend'
        },options.headers);
        reqId++;

        slogger.trace(description,reqId,'开始请求', options);
        let msg = '';
        request(options, function (error, response, body) {
            slogger.trace(description,reqId,'请求结束', error, body);
            if (error) {
                msg = '请求'+description+'时失败';
                slogger.error(msg,error);
                return callback(msg);
            }
            if (!response){
                msg = '请求'+description+'失败,未知错误';
                return callback(msg);
            }
            if (response.statusCode != 200) {
                msg = `请求${description}失败[${response.statusCode}]`;
                slogger.error(msg,body);
                return callback(msg);
            }
            callback(false,body);
        });
    }


    /**
     *
     * @param code
     * @param callback
     */
    getAccessToken(code, callback) {
        this._doRequest({
            url : this.accessTokenUrl,
            description:'获取access token',
            method : 'POST',
            form : this._createAccessTokenReqParams(code)
        },callback);
    }
    getUserInfo(accessToken,callback) {
        throw new Error('尚未实现');
    }

}
