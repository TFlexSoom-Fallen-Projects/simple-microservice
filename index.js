import process from 'process';
import * as app from "./src/app";

app.start().then(
    () => { console.log("Application Started!"); },
    (error) => { console.error("Unable to Start Application!", error); process.exit(1); }
);

console.log("Reached End of Execution for Synchronous code.");