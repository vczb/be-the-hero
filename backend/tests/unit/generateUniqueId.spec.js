const generateUniqueId = require('../../src/utils/generateUniqueId');
describe('Generate Unique ID', ()=>{
    it('should generate an unique ID', ()=> {

        const id = generateUniqueId();
        const differentId = generateUniqueId();

        expect(id).toHaveLength(8);
        expect(id).not.toBe(differentId);
        
    });
});