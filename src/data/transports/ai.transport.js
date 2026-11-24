import { extend, isFunction } from "../common.js";
import { $ } from "../../core/services/kendo-jquery.service.js";
import { Class } from "../../core/base/class.js";
import { utilsService } from "../../core/services/utils.service.js";
function asAiService(service) {
    return typeof service === "string" ? undefined : service;
}
export class AiTransport extends Class {
    constructor(options) {
        super();
        if (this.init === AiTransport.prototype.init) {
            this.init(options);
        }
    }
    init(options) {
        const that = this;
        options = that.options = extend({}, that.options, options);
        that.messageTypes = {
            ai: "assistant",
            system: "system",
            user: "user",
            tool: "tool"
        };
    }
    read(options) {
        const that = this;
        const requestOptions = that.setup(options);
        if (that.options.requestStart) {
            that.options.requestStart(requestOptions);
        }
        return $.ajax(requestOptions);
    }
    success(response, options) {
        const that = this;
        const service = asAiService(options?.service || that.options.service);
        const outputGetter = service?.outputGetter || that._getResponseData;
        const isRetry = options?.isRetry;
        const prompt = options?.prompt;
        const output = {
            id: utilsService.guid(),
            output: outputGetter(response),
            prompt: prompt,
            isRetry: isRetry,
            response: response
        };
        if (that.options.success) {
            that.options.success(output);
        }
    }
    error(response, options) {
        const that = this;
        const service = asAiService(options?.service || that.options.service);
        const outputGetter = service?.outputGetter || that._getResponseData;
        const isRetry = options?.isRetry;
        const prompt = options?.prompt;
        const resObject = {
            status: response.status,
            statusText: response.statusText,
            responseText: response.responseText
        };
        const output = {
            id: utilsService.guid(),
            output: outputGetter(resObject),
            prompt: prompt,
            isRetry: isRetry,
            response: response
        };
        if (that.options.error) {
            that.options.error(output);
        }
    }
    setup(options = {}) {
        const that = this;
        const rawService = options?.service || that.options.service;
        const service = asAiService(rawService);
        const data = that.getData(options);
        const url = typeof rawService === "string" ? rawService : service?.url || "";
        const requestOptions = {
            url: url,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function (response) {
                that.success.call(that, response, options);
            },
            error: function (response) {
                that.error.call(that, response, options);
            }
        };
        if (service?.headers) {
            requestOptions.headers = service.headers;
        }
        return requestOptions;
    }
    getData(options) {
        const that = this;
        const service = asAiService(options?.service);
        const isRetry = options?.isRetry;
        const history = options?.history || [];
        const prompt = options?.prompt;
        const defaultData = [...history, {
                role: that.messageTypes.user,
                contents: [{
                        $type: "text",
                        text: prompt
                    }]
            }];
        if (service?.data && isFunction(service.data)) {
            return service.data(prompt, isRetry, history);
        }
        if (service?.data && Object.keys(service.data).length) {
            return $.extend({}, service.data, {
                messages: defaultData
            });
        }
        return defaultData;
    }
    _getResponseData(response) {
        const aiResponse = response;
        return aiResponse?.messages?.[0]?.contents?.[0]?.text || "An error occurred while processing the request.";
    }
}
AiTransport.applyEnumerablePrototype();
AiTransport.applyPrototypeMembers();
