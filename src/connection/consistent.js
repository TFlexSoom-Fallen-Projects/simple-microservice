import { Sequelize } from 'sequelize';

var sequelize = null;
var models = new Set();

export function addModel(model) {
    models.add(model);
}

export async function configure(configurator) {
    const config = configurator.consitent || {};

    if(!config.connectionString) {
        console.debug("No SQL Database string provided... defaulting to sqlite");
    }

    sequelize = new Sequelize(config.connectionString || 'sqlite::memory:', {
        pool: config.pool || {}
    });

    for(const m of models) {
        if(config.verboseSchemas) {
            console.log("Defining Schema For: " + m + " with " + sequelize);
        }

        m.classDefine(sequelize);
    }

    await sequelize.sync({ force: true });
}

export function getInstance() {
    if(!sequelize) {
        throw new Error("Consistent Database Instance not configured!");
    }

    return sequelize;
}

// (async () => {
//   await sequelize.sync();
//   const jane = await User.create({
//     username: 'janedoe',
//     birthday: new Date(1980, 6, 20)
//   });
//   console.log(jane.toJSON());
// })();