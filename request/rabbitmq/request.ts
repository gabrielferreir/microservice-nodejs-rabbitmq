export default class RabbitMQRepository {
    removeStore(params) {
        global.rabbitmq.createChannel(function (err, ch) {
            const msg = JSON.stringify(params);

            const q = 'remove-store';
            ch.assertQueue(q, {durable: false});
            ch.sendToQueue(q, Buffer.from(msg));

            console.log(" [x] Sent %s", msg);
        });
    }
}

