/**
 * Created by sunny on 2016/11/29.
 */
import modelHelper from '../../helpers/model_helper';
import userModel from '../../models/user_model';

modelHelper.pageViaServer(userModel,{},{},function(err,page) {
    if (err) {
        return console.error(err);
    }
    console.log(page);
});