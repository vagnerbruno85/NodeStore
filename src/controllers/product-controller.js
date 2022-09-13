'use strict';

const ValidationContract = require('../validators/fluent-validators');
const repository = require('../repositories/product-repository');
//const azure = require('azure-storage');
const guid = require('guid');
//var config = require('../config');

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
exports.getBySlug = async(req,res,next) => {
    try {
        let data = await repository.getBySlug(req.params.slug);
        res.status(200).send(data);   
    } catch (error) {
        res.status(500).send({
            message:'Falha ao processar sua requisição'
        });
    }
}
exports.getById = async(req,res,next) => {
    try {
        let data = await repository.getById(req.params.id);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message:'Falha ao processar sua requisição'
        });
    }
}
exports.getByTag = async(req,res,next) => {
    
    try {
        let data = await repository.getByTag(req.params.tag);
            res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message:'Falha ao processar sua requisição'
        });
    }

}

exports.post = async(req,res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, 'O Titulo deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.slug, 3, 'O slug deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.description, 3, 'A descrição deve conter pelo menos 3 caracteres');
    //Se os dados forem inválidos
    if(!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        /*
        const blobSvc = azure.createBlobService(config.userImagesBlobConnectionString);
        let filename = guid.raw().toString() + '.jpg';
        let rawdata = req.body.image;
        let matches = rawdata.match(/^data:([A-Za-z+\/]+);base64,(.+)$/);
        let type = matches[1];
        let buffer = new Buffer(matches[2], 'base64');


        await blobSvc.createBlockBlobFromText('product-images',filename, buffer, {
            contentType: type
        }, function (error, result, response) {
            if(error) {
                filename = 'default-product.png'
            }
        });

        await repository.create({
            title: req.body.title,
            slug: req.body.slug,
            description: req.body.description,
            price: req.body.price,
            active: true,
            tags: req.body.tags,
            image: 'https://nodestr.blob.core.windows.net/product-images/' + filename
        });
        */

        await repository.create(req.body);     
            res.status(201).send({ message: 'Produto cadastrado com sucesso!'});
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message:'Falha ao processar sua requisição'
        });
    }
           
};

exports.put = async(req,res,next) => {
    try {
        await repository.update(req.params.id, req.body);    
            res.status(200).send({
                message: 'Produto atualizado com sucesso!'
            });
    } catch (error) {
        res.status(500).send({
            message:'Falha ao processar sua requisição'
        });
    }

};

exports.delete = async(req,res,next) => {
    try {
        await repository.delete(req.body.id)
            res.status(200).send({
                message: 'Produto removido com sucesso!'
            });
    } catch (error) {
        res.status(500).send({
            message:'Falha ao processar sua requisição'
        });
    }
        
};



