/**
 * Created by sunny on 2016/11/26.
 */
import request from 'supertest';
import app from '../../../app';
import {expect} from 'chai';
let cookie = '';
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
 其对应的密码为xxxxxx
 */
describe('user login', function() {
    it('should get error when not login',function(done) {
        request(app)
            .get('/api/test/login')
            .set('X-Requested-With','XMLHttpRequest')
            .expect(200)
            .end(function(err,res) {
                if (err) {
                    return done(err);
                }
                expect(res.body).to.have.property('status').and.equal(0xffff);
                done();
            });
    });
    it('should login success', function(done) {
        request(app)
            .post('/api/user/login')
            .send({
                username: 'test-1480130335119',
                password:'xxxxxx'
            })
            .expect(200)
            .end(function(err,res) {
                if (err) {
                    return done(err);
                }
                expect(res.body).to.have.property('status').and.equal(0);
                var header = res.header;
                var setCookieArray = header['set-cookie'];

                for (var i=0,len=setCookieArray.length;i<len;i++) {
                    var value = setCookieArray[i];
                    var result = value.match(/^coding_show=([a-zA-Z0-9%\.\-_]+);\s/);
                    if (result && result.length > 1) {
                        cookie = result[1];
                        break;
                    }
                }
                if (!cookie) {
                    return done(new Error('查找cookie失败'));
                }
                done();
            });
    });

    it('should get none error when login',function(done) {
        request(app)
            .get('/api/test/login')
            .set('Cookie','coding_show='+cookie)
            .expect(200,{status:0},done);
    });
});