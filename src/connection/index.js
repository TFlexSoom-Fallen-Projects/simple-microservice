import * as available from './available';
import * as cache from './cache';
import * as consistent from './consistent';

export async function configure(configurator) {
    await available.configure(configurator);
    await cache.configure(configurator);
    await consistent.configure(configurator);
}