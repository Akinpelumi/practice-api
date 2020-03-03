import request from 'supertest';
import expect from 'expect';
import { up, down, createPostTable, createUserTable, dropUserTable, dropPostTable } from '../../db/migration';
import app from '../../app';

describe('User', () => {
    before (async () => {
        try{
            await down(dropUserTable, dropPostTable);
            await up(createUserTable, createPostTable);
        } catch (e) {
            console.log(e.message);
        }
    })
    describe('GetUser', () => {
        it('should retrieve all the existing users', (done) => {
            request(app)
                .get('/api/v1/users')
                .expect(200)
                .expect((res) => {
                    expect(res.body).toInclude({
                        message: 'All users on display',
                        status: 'Success'
                    })
                })
                .end(done)
        })

        // it('should retrieve just a particular user', (done) => {
        //     request(app)
        //         .get('/api/v1/users/:id')
        //         .expect(200)
        //         .expect((res) => {
        //             expect(res.body).toInclude({
        //                 message: 'Requested user on display',
        //                 status: 'Success'
        //             })
        //         })
        //         .end(done)
        // })
    })
})
