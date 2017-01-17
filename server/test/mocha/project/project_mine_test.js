/**
 * Created by sunny on 2017/1/17.
 */
import request from 'supertest';
import {cookie} from '../../login_before_mocha';
import {expect} from 'chai';
import app from '../../../app';

describe('project list', function() {
    it('should get mine project list',function(done) {
        request(app)
            .get('/api/projects/mine')
            .query({query_type:'release'})
            .set('Cookie','coding_show='+cookie)
            .expect(200)
            .end(function(err,res) {
                if (err) {
                    return done(err);
                }
                expect(res.body).to.have.property('data');
                console.info('我发布的项目',res.body.data);
                done();
            });
    });
});