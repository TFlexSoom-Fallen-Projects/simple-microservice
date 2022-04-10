import mongoose from 'mongoose';

// NOTE: Model is not to be confused with the mongoose Model which is created to
//   open a new connection. Instead models are objects which generate the mongoose models
//   based on the encapsulated schema.
// 
//   The "models" are more just wrapped Schema objects... we could rename to schemas instead

var mongooseConn = null;
var models = new Set();

export function addModel(model) {
    models.add(model);
}

export async function configure(configurator) {
    const config = configurator.available || {};

    if(!config.connectionString) {
        console.debug("No Mongo Database string provided... Leaving no connection!");
        return;
    }

    mongooseConn = await new mongoose.createConnection(config.connectionString, 
        config.options    
    );

    for(m in models) {
        m.classDefine();
    }
}

export function getInstance() {
    if(!mongooseConn) {
        throw new Error("Available Database Instance not configured!");
    }

    return mongooseConn;
}