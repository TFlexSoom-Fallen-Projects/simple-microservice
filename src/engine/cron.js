import { CronJob } from 'cron';

var jobs = {};

export function addJob(name, schedule, callback) {
    if(jobs[name] !== undefined) {
        throw new Error("Job Added Twice!");
    }

    jobs[name] = new CronJob(schedule, callback);
}

export function startJob(name) {
    jobs[name].start();
}

export function stopJob(name) {
    jobs[name].stop();
}

export async function configure(configurator) {
    const js = Object.values(jobs);
    for(const j of js) {
        j.start();
    }
}