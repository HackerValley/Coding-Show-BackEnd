/**
 * Created by sunny on 2017/3/11.
 */
import mongoose,{Schema} from 'mongoose';
import ProductModel from '../../models/project_model';
import '../../config';
const ObjectId=  mongoose.Types.ObjectId;
const id = new ObjectId('586b3b1bb80c9056a0900214');

ProductModel.findOne({
    _id:id
},'_id',function(err,doc){
    console.log(err,doc);
});