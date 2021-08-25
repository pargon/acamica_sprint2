const assert = require("assert");
const mate = require('../src/mate');

describe('Matematica', ()=>{
    it('la suma de 2+2 debe ser correcta', ()=>{
        const res = mate.suma(2,2);

        assert.strictEqual( res, 4 );
    })
});
