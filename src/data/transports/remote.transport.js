import { CREATE, DESTROY, READ, STRING, UPDATE, ajax, crud, each, extend, identity, isFunction, isPlainObject, noop } from "../common.js";
import { $ } from "../../core/services/kendo-jquery.service.js";
import { Class } from "../../core/base/class.js";
import { Cache } from "../cache.js";
const emptyCache = {
    find: noop,
    add: noop
};
function isParameterMapRule(value) {
    return isPlainObject(value);
}
export class RemoteTransport extends Class {
    static options = {
        parameterMap: identity
    };
    constructor(options) {
        super();
        if (this.init === RemoteTransport.prototype.init) {
            this.init(options);
        }
    }
    init(options) {
        const that = this;
        let parameterMap;
        options = that.options = extend({}, that.options, options);
        each(crud, function (index, type) {
            if (typeof options[type] === STRING) {
                options[type] = {
                    url: options[type]
                };
            }
        });
        that.cache = options.cache ? Cache.create(options.cache) : emptyCache;
        parameterMap = options.parameterMap || identity;
        if (options.submit) {
            that.submit = options.submit;
        }
        if (isFunction(options.push)) {
            that.push = options.push;
        }
        if (!that.push) {
            that.push = identity;
        }
        that.parameterMap = isFunction(parameterMap) ? parameterMap : function (options) {
            const result = {};
            each(options, function (option, value) {
                let mappedOption = option;
                let mappedValue = value;
                if (mappedOption in parameterMap) {
                    const rule = parameterMap[mappedOption];
                    if (isParameterMapRule(rule)) {
                        mappedValue = rule.value(mappedValue);
                        mappedOption = rule.key;
                    }
                    else {
                        mappedOption = rule;
                    }
                }
                result[mappedOption] = mappedValue;
            });
            return result;
        };
    }
    create(options) {
        return ajax(this.setup(options, CREATE));
    }
    read(options) {
        const that = this;
        let success;
        let error;
        let result;
        const cache = that.cache;
        const requestOptions = that.setup(options, READ);
        success = requestOptions.success || noop;
        error = requestOptions.error || noop;
        result = cache.find(requestOptions.data);
        if (result !== undefined) {
            success(result);
        }
        else {
            requestOptions.success = function (result) {
                cache.add(requestOptions.data, result);
                success(result);
            };
            $.ajax(requestOptions);
        }
    }
    update(options) {
        return ajax(this.setup(options, UPDATE));
    }
    destroy(options) {
        return ajax(this.setup(options, DESTROY));
    }
    setup(options = {}, type) {
        options = options || {};
        const that = this;
        let parameters;
        const operation = that.options[type];
        const operationData = operation.data;
        const optionData = options.data;
        const data = typeof operationData === "function" ? operationData(optionData) : operationData;
        const resolvedOptions = extend(true, {}, operation, options);
        parameters = extend(true, {}, data, options.data);
        resolvedOptions.data = that.parameterMap(parameters, type);
        if (typeof operation.url === "function") {
            resolvedOptions.url = operation.url(parameters);
        }
        return resolvedOptions;
    }
}
RemoteTransport.applyEnumerablePrototype();
RemoteTransport.applyPrototypeMembers();
