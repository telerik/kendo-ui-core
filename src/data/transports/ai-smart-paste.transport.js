import { extend, isFunction } from "../common.js";
import { $ } from "../../core/services/kendo-jquery.service.js";
import { Class } from "../../core/base/class.js";
function asSmartPasteService(service) {
    return typeof service === "string" ? undefined : service;
}
export class AISmartPasteTransport extends Class {
    constructor(options) {
        super();
        if (this.init === AISmartPasteTransport.prototype.init) {
            this.init(options);
        }
    }
    init(options) {
        const that = this;
        options = that.options = extend({}, that.options, options);
    }
    read(options) {
        const that = this;
        options = that.options = extend({}, that.options, options);
        const requestOptions = that.setup(options);
        if (that.options.requestStart) {
            that.options.requestStart(requestOptions);
        }
        $.ajax(requestOptions);
    }
    setup(options) {
        const that = this;
        const rawService = options?.service || that.options.service;
        const service = asSmartPasteService(rawService);
        const data = that.getData(options);
        const url = typeof rawService === "string" ? rawService : service?.url || "";
        const requestOptions = {
            url: url,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function (response) {
                if (that.options.success) {
                    that.options.success(response);
                }
            },
            error: function (response) {
                const resObject = {
                    status: response.status,
                    statusText: response.statusText,
                    responseText: response.responseText
                };
                if (that.options.error) {
                    that.options.error(resObject);
                }
            }
        };
        if (service?.headers) {
            requestOptions.headers = service.headers;
        }
        return requestOptions;
    }
    getData(options = {}) {
        const service = asSmartPasteService(options?.service);
        const formFields = options?.formFields;
        const content = options?.content;
        const defaultData = {
            formFields: formFields,
            content: content
        };
        if (service?.data && isFunction(service.data)) {
            return $.extend({}, defaultData, service.data());
        }
        if (service?.data && Object.keys(service.data).length) {
            return $.extend({}, defaultData, service.data);
        }
        return defaultData;
    }
    success(response) {
        const that = this;
        if (that.options.success) {
            that.options.success(response);
        }
        return response;
    }
    error(response) {
        const that = this;
        const resObject = {
            status: response.status,
            statusText: response.statusText,
            responseText: response.responseText
        };
        if (that.options.error) {
            that.options.error(resObject);
        }
    }
}
AISmartPasteTransport.applyEnumerablePrototype();
AISmartPasteTransport.applyPrototypeMembers();
