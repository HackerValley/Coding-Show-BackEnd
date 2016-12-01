/**
 * Created by sunny on 2016/11/29.
 */
import {pageViaServer} from '../../helpers/model_helper';
import '../../config';
import userModel from '../../models/user_model';

pageViaServer(userModel,{},{},function(err,page) {
    if (err) {
        return console.error(err);
    }
    console.log(page);
});
