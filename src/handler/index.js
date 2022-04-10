import express from 'express';
import * as helloWorld from './helloWorld';


const app = express();

app.use(helloWorld.router);

export async function serve(configurator) {
    const port = configurator.port || 8080;
    app.listen(port);
}
