/**
 * Created by sunny on 2016/11/26.
 */
import request from 'supertest';
import app from '../../../app';
/*
测试之前保证这个用户在数据库中
 {
 "username" : "test-1480130335119",
 "email" : "0.029710949398577213@xxx.com",
 "passwd" : "Mies4fjvr5ZgxWzyVasNamF4DqbfYn4AsBbur2jmcTU=",
 "_id" : ObjectId("5838ff1fa390f44450a71532"),
 "last_login_time" : "2016-11-26 11:18:55",
 "create_time" : "2016-11-26 11:18:55",
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
    it('should login success', function(done) {
        request(app)
            .post('/api/user/login')
            .send({
                username: 'test-1480130335119',
                password:'xxxxxx'
            })
            .expect(200, {
                status:0
            },done);
    });
});