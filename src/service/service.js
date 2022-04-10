export default class Service {
    static serviceList = [];
    static enable(instanceRef) {
        console.log("ENABLING: " + instanceRef.getName());
        Service.serviceList.push(instanceRef);
    }

    static getList() {
        return Service.serviceList;
    }

    construct() {}
    start(configurator) {}
    getName() { return "DEFAULT" }
}