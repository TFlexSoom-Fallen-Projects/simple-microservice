import * as configurator from '../configurator';
import * as connPools from '../connection';
import * as engine from '../engine';
import * as services from '../service';
import * as handlers from '../handler';

export default function start() {
    return new Promise( startPromise )
}

async function startPromise(resolve, reject) {
    try {
        await services.construct();
        await connPools.configure(configurator);
        await engine.configure(configurator);
        await services.start(configurator, engine);
        await handlers.serve();

    } catch (e) {
        reject(e);
    } 

    resolve();
}