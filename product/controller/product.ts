import * as express from 'express';
import {Product} from "../entity/Product";
import ProductRepository from "../repository/product";

export default class ProductController {
    public path = '/product';
    public router = express.Router();

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.post(this.path, this.create);
        this.router.get(this.path, this.read);
        this.router.get(`${this.path}/:id`, this.readOne);
        this.router.put(`${this.path}/:id`, this.update);
        this.router.delete(`${this.path}/:id`, this.delete);
    }

    async create(req, res, next) {

        try {
            const params = {
                name: req.body.name,
                price: req.body.price,
                qtd: req.body.qtd
            };

            const productRepository = new ProductRepository();

            const product = new Product(null, params.name, params.price, params.qtd);
            await productRepository.create(product);

            res.status(201).jsonp(product);
        } catch (e) {
            next(e);
        }
    }

    async read(req, res) {
        const repository = new ProductRepository();
        const response = await repository.read();
        res.status(200).jsonp(response);
    }

    async readOne(req, res) {
        const repository = new ProductRepository();
        const response = await repository.readOne(req.params.id);
        res.status(200).json(response[0]);
    }

    async update(req, res) {

        try {
            const params = {
                id: +req.params.id,
                name: req.body.name,
                price: req.body.price,
                qtd: req.body.qtd
            };

            const productRepository = new ProductRepository();

            const product = new Product(params.id, params.name, params.price, params.qtd);

            const response = await productRepository.updade(product);

            res.status(200).jsonp(response);
        } catch (e) {
            console.log(e);
            res.status(500).send();
        }
    }

    async delete(req, res) {
        const params = {
            id: req.params.id
        };

        const repository = new ProductRepository();
        const response = await repository.delete(params.id);
        res.status(200).jsonp(response);
    }

}