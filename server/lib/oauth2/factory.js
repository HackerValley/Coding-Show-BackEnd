/**
 * User: sunny
 * Date: 14-4-15
 * Time: 下午4:40
 */
import githubOAuth2 from './github_oauth2';
const MAP_OAUTH2_INSTANCE = {
    github : githubOAuth2
};
/**
 *
 * @param type
 * @param protocol
 * @returns OAuth2
 */
exports.getInstance = function(type, protocol) {

    let instance = MAP_OAUTH2_INSTANCE[type];
    if (!instance) {
        return null;
    }
    return instance[protocol];
};





