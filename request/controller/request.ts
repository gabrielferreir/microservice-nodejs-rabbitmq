import * as express from 'express';
import {Request} from "../entity/Request";
import RequestRepository from "../repository/request";
import RabbitMQRepository from "../rabbitmq/request";

export default class ProductController {
    public path = '/request';
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
                consumerName: req.body.consumerName,
                idProduct: req.body.idProduct
            };

            const requestRepository = new RequestRepository();

            const request = new Request(null, params.consumerName, params.idProduct);
            await requestRepository.create(request);

            const rabbitMQRepository = new RabbitMQRepository();
            rabbitMQRepository.removeStore(request);

            res.status(201).jsonp(request);
        } catch (e) {
            next(e);
        }
    }

    async read(req, res) {
        const repository = new RequestRepository();
        const response = await repository.read();
        res.status(200).jsonp(response);
    }

    async readOne(req, res) {
        const repository = new RequestRepository();
        const response = await repository.readOne(req.params.id);
        res.status(200).json(response[0]);
    }

    async update(req, res) {

        try {
            const params = {
                id: +req.params.id,
                name: req.body.name,
                price: req.body.price
            };

            const requestRepository = new RequestRepository();

            const product = new Request(params.id, params.name, params.price);

            const response = await requestRepository.updade(product);

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

        const repository = new RequestRepository();
        const response = await repository.delete(params.id);
        res.status(200).jsonp(response);
    }

}