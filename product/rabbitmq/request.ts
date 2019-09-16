import ProductRepository from "../repository/product";

export default class RabbitMQRepository {
    removeStore() {
        global.rabbitmq.createChannel(function (err, ch) {
            const q = 'remove-store';

            ch.assertQueue(q, {durable: false});
            ch.prefetch(1);

            ch.consume(q, function (msg) {
                console.log(" [x] Received %s", msg.content.toString());
                const productRepository = new ProductRepository();
                const request = JSON.parse(msg.content);
                productRepository.removeStore(request.idProduct);
            }, {noAck: true});

        });
    }
}

