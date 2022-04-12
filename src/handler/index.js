import express from 'express';
import * as helloWorld from './helloWorld';
import * as urlShorten from './urlShorten';

const app = express();

app.use(express.json());

app.use(helloWorld.router);
app.use(urlShorten.router);

export async function serve(configurator) {
    const port = configurator.port || 8080;
    app.listen(port);
}
