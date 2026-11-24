import { Class } from "../../core/base/class.js";
export class LocalTransport extends Class {
    constructor(options) {
        super();
        if (this.init === LocalTransport.prototype.init) {
            this.init(options);
        }
    }
    init(options) {
        this.data = options.data;
    }
    read(options) {
        options.success(this.data);
    }
    update(options) {
        options.success(options.data);
    }
    create(options) {
        options.success(options.data);
    }
    destroy(options) {
        options.success(options.data);
    }
}
LocalTransport.applyEnumerablePrototype();
LocalTransport.applyPrototypeMembers();
