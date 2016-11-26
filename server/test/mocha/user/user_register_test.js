/**
 * Created by sunny on 2016/11/26.
 */
import request from 'supertest';
import app from '../../../app';

describe('user register', function() {
    it.skip('should register success', function(done) {
        request(app)
            .post('/api/user/register')
            .send({
                username: 'test-'+new Date().getTime(),
                password:'xxxxxx',
                email:Math.random()+'@xxx.com'
            })
            .expect(200, {
                status:0
            },done);
    });
});