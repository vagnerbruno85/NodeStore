'use strict';

//const ValidationContract = require('../validators/fluent-validators');
const repository = require('../repositories/order-repository');
const guid = require('guid');
const authService = require('../services/auth-service');


exports.post = async(req,res, next) => {
    //let contract = new ValidationContract();
    //contract.hasMinLen(req.body.name, 3, 'O Titulo deve conter pelo menos 3 caracteres');
    //contract.isEmail(req.body.email,'E-mail inválido');
    //contract.hasMinLen(req.body.password, 6, 'A descrição deve conter pelo menos 3 caracteres');

    //Se os dados forem inválidos
    //if(!contract.isValid()) {
    //    res.status(400).send(contract.errors()).end();
    //    return;
    //}

    console.log(req.body)
    try {
        //recupera o token
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
    
        //Decodifica o token
        const data = await authService.decodeToken(token);
    
        await repository.create({
            customer: data.id,
            number: guid.raw().substring(0,6),
            items: req.body.items
        });     
            res.status(201).send({ message: 'Pedido cadastrado com sucesso!'});
    } catch (error) {
        res.status(500).send({
            message:'Falha ao processar sua requisição'
        });
    }
           
};

exports.get = async(req,res,next) => {
    try {
        let data = await repository.get();
        res.status(200).send(data);        
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}
