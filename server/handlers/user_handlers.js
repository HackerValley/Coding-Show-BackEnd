import userModel from '../models/user_model';

export default class UserHandler {

    // 查询某个用户信息
    getOne(someInfo){
        return userModel.getOne( someInfo )
                .then((userInfo)=>{
                    return {
                        status: 1,
                        msg: 'success',
                        data: userInfo
                    }
                })
                .catch((err)=>{
                    return {
                        status: 0,
                        msg: 'error',
                        data: err
                    }
                });
    };
    // 添加用户
    addUser(userInfo) {
        return userModel.add(new userModel(userInfo))
            .then((user)=>{
                return {
                    status: 1,
                    msg: 'success',
                    data: user
                }
            })
            .catch((err)=>{
                return {
                    status: 0,
                    msg: 'error',
                    data: err
                }
            });
    }

}
