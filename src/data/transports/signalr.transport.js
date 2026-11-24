import { isFunction } from "../common.js";
import { $ } from "../../core/services/kendo-jquery.service.js";
import { formatterService } from "../../core/services/formatter.service.js";
import { RemoteTransport } from "./remote.transport.js";
function isJQueryPromise(promise) {
    return Boolean(promise && isFunction(promise.done) && isFunction(promise.fail));
}
function isNativePromise(promise) {
    return Boolean(promise && isFunction(promise.then) && isFunction(promise.catch));
}
function isSignalRHub(hub) {
    return Boolean(hub && isFunction(hub.on) && isFunction(hub.invoke));
}
export class SignalRTransport extends RemoteTransport {
    constructor(options) {
        super({});
        if (this.init === SignalRTransport.prototype.init) {
            this.init(options);
        }
    }
    init(options) {
        const signalr = options && options.signalr ? options.signalr : {};
        const promise = signalr.promise;
        if (!promise) {
            throw new Error('The "promise" option must be set.');
        }
        if (!isJQueryPromise(promise) && !isNativePromise(promise)) {
            throw new Error('The "promise" option must be a Promise.');
        }
        const hub = signalr.hub;
        if (!hub) {
            throw new Error('The "hub" option must be set.');
        }
        if (!isSignalRHub(hub)) {
            throw new Error('The "hub" option is not a valid SignalR hub proxy.');
        }
        this.promise = promise;
        this.hub = hub;
        super.init(options);
        if (!isFunction(options.push)) {
            this.push = ((callbacks) => {
                const resolvedCallbacks = (callbacks || {});
                const client = this.options.signalr?.client || {};
                if (client.create) {
                    this.hub.on(client.create, resolvedCallbacks.pushCreate);
                }
                if (client.update) {
                    this.hub.on(client.update, resolvedCallbacks.pushUpdate);
                }
                if (client.destroy) {
                    this.hub.on(client.destroy, resolvedCallbacks.pushDestroy);
                }
            });
        }
    }
    read(options) {
        this._crud(options, "read");
    }
    create(options) {
        this._crud(options, "create");
    }
    update(options) {
        this._crud(options, "update");
    }
    destroy(options) {
        this._crud(options, "destroy");
    }
    _crud(options, type) {
        const hub = this.hub;
        const promise = this.promise;
        const method = this.options.signalr?.server?.[type];
        if (!method) {
            throw new Error(formatterService.format('The "server.{0}" option must be set.', type));
        }
        const args = [method];
        const data = this.parameterMap(options.data, type);
        if (!$.isEmptyObject(data)) {
            args.push(data);
        }
        if (isJQueryPromise(promise)) {
            promise.done(function () {
                const request = hub.invoke.apply(hub, args);
                if (isJQueryPromise(request)) {
                    request.done(options.success).fail(options.error);
                }
                else if (isNativePromise(request)) {
                    request.then(options.success).catch(options.error);
                }
            });
        }
        else if (isNativePromise(promise)) {
            promise.then(function () {
                const request = hub.invoke.apply(hub, args);
                if (isNativePromise(request)) {
                    request.then(options.success).catch(options.error);
                }
                else if (isJQueryPromise(request)) {
                    request.done(options.success).fail(options.error);
                }
            });
        }
    }
}
SignalRTransport.fn = SignalRTransport.prototype;
if (SignalRTransport.applyEnumerablePrototype) {
    SignalRTransport.applyEnumerablePrototype();
}
