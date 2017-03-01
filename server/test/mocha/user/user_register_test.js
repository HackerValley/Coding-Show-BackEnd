/**
 * Created by sunny on 2016/11/26.
 */
import {expect} from 'chai';
import request from 'supertest';
import crypto from 'crypto';
import app from '../../../app';

describe('user register', function() {
    var username = 'test-'+crypto.randomBytes(8).toString('hex');
    var password = crypto.randomBytes(8).toString('hex');
    it('should register success', function(done) {
        request(app)
            .post('/api/user/register')
            .send({
                username: username,
                password:password,
                nickname:username,
                email:Math.random()+'@xxx.com',
                phone:(Math.random()+'').replace('0.','')
            })
            .expect(200, {
                status:0
            },done);
    });
    it('should login ok',function(done) {
        request(app)
            .post('/api/user/login')
            .send({
                username: username,
                password:password
            })
            .expect(200)
            .end(function(err,res) {
                if (err) {
                    return done(err);
                }
                expect(res.body).to.have.property('status').and.equal(0);
                done();
            });
    });
});