import App from './app';
import RequestController from './controller/request';

const app = new App(
    [
        new RequestController()
    ],
    5010,
);

app.initializeFinalMiddlewares();

app.listen();