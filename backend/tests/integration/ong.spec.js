const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach( async () => {
        await connection.migrate.rollback();        
        await connection.migrate.latest();        
    });

    afterAll( async () => {
        await connection.destroy();
    });

    it('should be able to create a new ONG', async () => {
        const respose = await request(app)
            .post('/ongs')
            .send({
                name: "Vinicius Zucatti",
                email: "viniciuszucatti@gmail.com",
                whatsapp: "51991901783",
                city: "Porto Alegre",
                uf: "RS"
            })

        expect(respose.body).toHaveProperty('id');
        expect(respose.body.id).toHaveLength(8);

    })
})