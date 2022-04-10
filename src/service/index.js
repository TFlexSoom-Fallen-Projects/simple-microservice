import * as helloWorldService from './helloWorldService';
import Service from './service';

export function construct() {
    for(const instance of Service.getList()) {
        instance.construct();
    }
}

export function start(conf) {
    for(const instance of Service.getList()) {
        instance.configure(conf);
    }
}