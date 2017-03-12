import mongoose, { Schema } from 'mongoose';
const developerSchema = new Schema({
    uid: Schema.Types.ObjectId, // 用户id
    pid: Schema.Types.ObjectId, // 参与项目id
    avatar:String,
    nickname:String,
    dev_skills: {type:[Number],default:[]}, // 开发技术栈
    create_time: { type: Date, default: Date.now } // 申请时间
});
developerSchema.index({uid:1,pid:1},{unique:true});
export default mongoose.model('developer', developerSchema);
