/**
 * Created by sunny on 2016/11/25.
 */
import crypto from 'crypto';
const SECRET = '1cce008d0ed7c1dc528b0bc15c1242fc';
export default {
    passwdSign : function(username,passwd) {
        return crypto.createHmac('sha256',SECRET).update(username+passwd).digest('base64');
    },
    passwdVerify : function(username,passwdInput,passwdDb) {
        var expectPass = this.passwdSign(username,passwdInput);
        return passwdDb === expectPass;
    }
};