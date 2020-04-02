const crypto = require('crypto'); // crypto é uma biblioteca do node, ele pode ser usado tbm para gerar ID
const connection = require('../database/connection');

module.exports = {

    async index(request, response){
        const ongs = await connection('ongs').select('*');

        return response.json(ongs);
    },

    async create(request, response){
        const {name, email, whatsapp, city, uf} = request.body; // pegar cada váriavel separadamente, garante que o usuário não mande dados a mais

        const id = crypto.randomBytes(4).toString('HEX');
        
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })

        return response.json({id});    
    }
}