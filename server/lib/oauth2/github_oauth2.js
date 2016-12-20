/**
 * Created by sunny on 2016/12/15.
 */
import request  from 'request';
import OAuth2 from './OAuth2';
import {OAUTH2_CONFIG} from '../../config';

const TYPE = 'github';
const CONFIG = OAUTH2_CONFIG[TYPE];
const URL_AUTH = 'https://github.com/login/oauth/authorize';
const URL_ACCESS_TOKEN = 'https://github.com/login/oauth/access_token';
const CLIENT_ID = CONFIG.clientId;
const CLIENT_SECRET = CONFIG.clientSecret;
const REDIRECT_URL = 'http://www.coding-show.com/api/user/oauth2/callback/github';
const REDIRECT_URL_HTTPS = 'https://www.coding-show.com/api/user/oauth2/callback/github';
const USER_INFO_URL = 'https://api.github.com/user';

class GithubOAuth2 extends OAuth2 {
    getUserInfo(accessToken,callback) {
        super._doRequest({
            method:'GET',
            url : USER_INFO_URL,
            desciption:'获取github用户信息',
            headers:{Authorization : 'token ' + accessToken}
        },function(error,  body) {
            if (error) {
                return callback(err);
            }
            callback(false,{
                sns_id : user.id,
                sns_type : 2,
                avatar : user.avatar_url,
                access_token : accessToken,
                nickname : user.name
            });
        });
    }

}

export default  {
    http : new GithubOAuth2({
        authUrl:URL_AUTH,
        accessTokenUrl: URL_ACCESS_TOKEN,
        clientId:CLIENT_ID,
        clientSecret:CLIENT_SECRET,
        redirectUri:REDIRECT_URL,
        type:TYPE
    }),
    https : new GithubOAuth2({
        authUrl:URL_AUTH,
        accessTokenUrl: URL_ACCESS_TOKEN,
        clientId:CLIENT_ID,
        clientSecret:CLIENT_SECRET,
        redirectUri:REDIRECT_URL_HTTPS,
        type:TYPE
    })
};
