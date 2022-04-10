import Service from './service';
import * as cron from '../engine/cron';
import * as consistent from '../connection/consistent';
import { Model, DataTypes } from 'sequelize';

const HELLO_WORLD_CRON_NAME = "HelloWorldService";

export default class HelloWorldService extends Service {
    static INSTANCE = new HelloWorldService();
    message = "Hello World!";
    lastID = 0;

    construct() {
        cron.addJob(HELLO_WORLD_CRON_NAME, '* * * * *', async () => { await HelloWorldService.INSTANCE.incrementer() });
        consistent.addModel(HelloWorldModel);
    }

    configure(configurator) {
        const config = configurator.helloworldservice || {};

        this.message = config.message || this.message;
    }

    getName() {
        return "HELLO WORLD SERVICE";
    }

    getMessage = async function() {
        await this.incrementer();
        return `${this.message} ${this.getVal()}`;
    }

    incrementer = async function() {
        const newEntry = await HelloWorldModel.create({message: this.message});
        this.lastID = newEntry.id;
    }

    getVal() {
        return this.lastID;
    }
}

HelloWorldService.enable(HelloWorldService.INSTANCE);

class HelloWorldModel extends Model {
    static classDefine(sequelize) {
        HelloWorldModel.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                message: {
                    type: DataTypes.STRING,
                    allowNull: false,
                }
            }, 
            {sequelize, modelName: "hello_world"}
        );
    }
}

