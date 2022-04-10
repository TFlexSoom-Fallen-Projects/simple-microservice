import { createClient } from 'redis';

var redis = null;

export async function configure(configurator) {
    const config = configurator.cache || {};

    if(!config.connectionString) {
        console.debug("No Redids Database string provided... Leaving no connection!");
        return;
    }

    redis = createClient({
        url: config.connectionString
    });

    redis.on('error', (err) => console.log('Redis Client Error', err));

    await redis.connect();
}

export function getInstance() {
    if(!redis) {
        throw new Error("Cache Instance not configured!");
    }

    return redis;
}