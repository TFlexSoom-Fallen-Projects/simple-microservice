import * as cron from './cron';

export async function configure(configurator) {
    await cron.configure(configurator);
}