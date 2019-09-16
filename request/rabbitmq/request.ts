export default class RabbitMQRepository {
    removeStore(params) {
        console.log('removeStore');

        global.rabbitmq.createChannel(function (err, ch) {
            const msg = JSON.stringify(params);

            const q = 'remove-store';
            ch.assertQueue(q, {durable: false});
            ch.sendToQueue(q, new Buffer(msg));

            console.log(" [x] Sent %s", msg);
        });
    }
}

