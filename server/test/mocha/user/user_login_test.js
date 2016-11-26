/**
 * Created by sunny on 2016/11/26.
 */
import request from 'supertest';
import app from '../../../app';
/*
测试之前保证这个用户在数据库中
 {
 "username" : "test-1480133075322",
 "email" : "0.5373769130092114@xxx.com",
 "passwd" : "kroJiDZsJEavrZlRBrMAqtebITzRLdPE//b/8i1UqNE=",
 "_id" : ObjectId("583909d347042734848dd528"),
 "last_login_time" : "2016-11-26 12:04:35",
 "create_time" : "2016-11-26 12:04:35",
 "avatar" : "",
 "sns_type" : 0,
 "skill" : [],
 "telephone" : "",
 "level" : 0,
 "nickname" : "",
 "__v" : 0
 }
 */
describe('user login', function() {
    it.skip('should login success', function(done) {
        request(app)
            .post('/api/user/login')
            .send({
                username: 'test-1480133075322',
                password:'xxxxxx'
            })
            .expect(200, {
                status:0
            },done);
    });
});