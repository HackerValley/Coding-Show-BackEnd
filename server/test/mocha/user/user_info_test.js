/**
 * Created by sunny on 2017/3/2.
 */
import request from 'supertest';
import {cookie} from '../../login_before_mocha';
import {expect} from 'chai';
import app from '../../../app';

describe('user info', function() {
    it('should get user info ok',function(done) {
        request(app)
            .get('/api/user')
            .set('Cookie','coding_show='+cookie)
            .expect(200)
            .end(function(err,res) {
                if (err) {
                    return done(err);
                }
                expect(res.body).to.have.property('data');
                console.info('my info',res.body.data);
                done();
            });
    });
});