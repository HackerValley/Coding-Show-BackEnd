/**
 * Created by sunny on 2017/1/17.
 */
import request from 'supertest';
import app from '../app';
import {expect} from 'chai';
export let cookie = '';
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
before(function(done) {
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
            let header = res.header;
            let setCookieArray = header['set-cookie'];

            for (let i=0,len=setCookieArray.length;i<len;i++) {
                let value = setCookieArray[i];
                let result = value.match(/^coding_show=([a-zA-Z0-9%\.\-_]+);\s/);
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