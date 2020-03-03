import request from 'supertest';
import app from '../../app';
import { up, down, createPostTable, createUserTable, dropUserTable, dropPostTable } from '../../db/migration';



describe('Welcome Route(index)', () => {
    before(async() => {
        try{
            await down(dropUserTable, dropPostTable);
            await up(createUserTable, createPostTable);
        }catch(e)
        {
            console.log(e.message);
        }
       
    });
    it('Should check if it returns 200 as status code', (done) => {
        request(app)
            .get('/')
            .expect(200)
            .end(done);
    });
});
