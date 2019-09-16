import App from './app';
import ProductController from './controller/product';

const app = new App(
    [
        new ProductController(),
    ],
    5000,
);

app.initializeFinalMiddlewares();

app.listen();