/**
 * Created by sunny on 2017/1/17.
 */
import request from 'supertest';
import {cookie} from '../../login_before_mocha';
import {expect} from 'chai';
import app from '../../../app';

describe('join project apply', function() {
    it('should join project success',function(done) {
        request(app)
            .post('/api/developers')
            .send({dev_skills:[1,2],pid:'586b3b1bb80c9056a0900214'})
            .set('Cookie','coding_show='+cookie)
            .expect(200)
            .end(function(err,res) {
                if (err) {
                    return done(err);
                }
                expect(res.body).to.have.property('status');
                console.info('申请结果',res.body);
                done();
            });
    });
});