import Service from './service';
import * as consistent from '../connection/consistent';
import { Model, DataTypes } from 'sequelize';
import {createHash} from 'crypto'

const MAX_STRING_LEN = 512;

const DIRECTORY = {
    SIMPLE_SHORT: 1,
}

const PREFIX_TO_DIRECTORY = {
    1: DIRECTORY.SIMPLE_SHORT,
}

const hasher = createHash('sha256');

export default class URLShortenService extends Service {
    static INSTANCE = new URLShortenService();

    mappings = {};

    construct() {
        consistent.addModel(URLPrefixModel);
        consistent.addModel(URLShortenModel);
    }

    async configure(configurator) {
        const prefixes = await URLPrefixModel.findAll();
        var newMappings = {};
        for(const prefix of prefixes) {
            newMappings[prefix.id] = prefix.directory;
        }

        for(const m in PREFIX_TO_DIRECTORY) {
            if(newMappings[m] === undefined) {
                const newEntry = await URLPrefixModel.create({directory: PREFIX_TO_DIRECTORY[m]});
            }
        }
    }

    getName() {
        return "URL SHORTEN SERVICE";
    }

    async insertNewURL(url) {
        hasher.update(url);
        var hash = hasher.copy().digest('hex');
        var entry = await URLShortenModel.findOne({ where: { key: hash }});
        if(entry !== null) {
            return {key: entry.key, url: entry.url};
        }
            
        const newEntry = await URLShortenModel.create({key: hash, url: url});
        return {key: newEntry.key, url: newEntry.url};
    }
}

URLShortenService.enable(URLShortenService.INSTANCE);

class URLPrefixModel extends Model {
    static classDefine(sequelize) {
        URLPrefixModel.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                directory: {
                    type: DataTypes.INTEGER,
                    key: true,
                    allowNull: false,
                }
            }, 
            {sequelize, modelName: "url_direct"}
        );
    }
}

class URLShortenModel extends Model {
    static classDefine(sequelize) {
        URLShortenModel.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                key: {
                    type: DataTypes.STRING(MAX_STRING_LEN),
                    key: true,
                    allowNull: false,
                },
                url: {
                    type: DataTypes.STRING(2048),
                    allowNull: false,
                }
            }, 
            {sequelize, modelName: "url_shorten"}
        );
    }
}
