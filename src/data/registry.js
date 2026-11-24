import { STRING, extend, isFunction, isPlainObject } from "./common.js";
import { $ } from "../core/services/kendo-jquery.service.js";
import { utilsService } from "../core/services/utils.service.js";
import { DataReader } from "./data-reader.js";
import { LocalTransport } from "./transports/local.transport.js";
import { RemoteTransport } from "./transports/remote.transport.js";
function isTransportConstructor(value) {
    return !isPlainObject(value);
}
export class DataRegistry {
    constructor() {
        this.readers = { json: DataReader };
        this.schemas = {};
        this.transports = {};
    }
    register(config) {
        if (config.readers) {
            extend(true, this.readers, config.readers);
        }
        if (config.schemas) {
            extend(true, this.schemas, config.schemas);
        }
        if (config.transports) {
            extend(true, this.transports, config.transports);
        }
    }
    setReaders(value) {
        this.register({
            readers: value || {}
        });
    }
    setSchemas(value) {
        this.register({
            schemas: value || {}
        });
    }
    setTransports(value) {
        this.register({
            transports: value || {}
        });
    }
    getReader(type) {
        return this.readers[type || "json"];
    }
    getSchema(type) {
        return this.schemas[type];
    }
    getTransport(type) {
        return this.transports[type];
    }
    createReader(type, schema) {
        return new (this.getReader(type))(schema);
    }
    createTransport(options, data, dataSource) {
        let transport;
        let transportOptions = options.transport ? $.extend({}, options.transport) : null;
        if (transportOptions) {
            transportOptions.read = typeof transportOptions.read === STRING ? {
                url: transportOptions.read
            } : transportOptions.read;
            if (options.type === "jsdo") {
                transportOptions.dataSource = dataSource;
            }
            if (options.type) {
                const registeredTransport = this.transports[options.type];
                this.transports = this.transports || {};
                this.schemas = this.schemas || {};
                if (!registeredTransport) {
                    utilsService.logToConsole("Unknown DataSource transport type '" + options.type + "'.\nVerify that registration scripts for this type are included after Kendo UI on the page.", "warn");
                }
                else if (isTransportConstructor(registeredTransport)) {
                    transport = new registeredTransport(extend(transportOptions, {
                        data: data
                    }));
                }
                else {
                    transportOptions = extend(true, {}, registeredTransport, transportOptions);
                }
                options.schema = extend(true, {}, this.schemas[options.type], options.schema);
            }
            if (!transport) {
                transport = isFunction(transportOptions.read) ? transportOptions : new RemoteTransport(transportOptions);
            }
        }
        else {
            transport = new LocalTransport({
                data: options.data || []
            });
        }
        return transport;
    }
}
export const dataRegistry = new DataRegistry();
