(function($, window) {
    var kendo = window.kendo = window.kendo || {},
        core = kendo.core = {},
        extend = $.extend,
        Template;

    function Observable() {
        this._handlers = {};
    }

    Observable.prototype = {
        bind: function(eventName, handler) {
            var that = this,
                handlers = that._handlers[eventName] || [];

            handlers.push(handler);

            that._handlers[eventName] = handlers;

            return that;
        },

        trigger: function(eventName, parameter) {
            var that = this,
                handlers = that._handlers[eventName],
                idx,
                length;

            if (handlers) {
                for (idx = 0, length = handlers.length; idx < length; idx++) {
                    handlers[idx].call(that, parameter);
                }
            }

            return that;
        },

        unbind: function(eventName, handler) {
            var that = this,
                handlers = that._handlers[eventName],
                idx,
                length;

            if (handlers) {
                if (handler) {
                    for (idx = 0, length = handlers.length; idx < length; idx++) {
                        if (handlers[idx] === handler) {
                            handlers.splice(idx, 1);
                        }
                    }
                } else {
                    that._handlers[eventName] = [];
                }
            }

            return that;
        }
    }

    Template = {
        paramName: "data", // name of the parameter of the generated template
        useWithBlock: true, // whether to wrap the template in a with() block
        begin: "<%", // the marker which denotes the beginning of executable code
        end: "%>", // the marker which denotes the end of executable code
        compile: function(template, options) {
            var settings = extend({}, this, options),
                paramName = settings.paramName,
                begin = settings.begin,
                end = settings.end,
                useWithBlock = settings.useWithBlock,
                functionBody = "var o='';",
                evalRegExp = new RegExp(begin + "=(.+?)" + end, "g"),
                quoteRegExp = new RegExp("'(?=.*?" + end + ")", "g");

            functionBody += useWithBlock ? "with(" + paramName + "){" : "";

            functionBody += "o+='";

            functionBody += template.replace(/[\r\t\n]/g, " ")
                .replace(quoteRegExp,"\t")
                .split("'").join("\\'")
                .split("\t").join("'")
                .replace(evalRegExp, "'; o+=$1; o+='")
                .split(begin).join("';")
                .split(end).join("o+='");

            functionBody += useWithBlock ? "'}" : "';";

            functionBody += "return o;";

            return new Function(paramName, functionBody);
        }
    };
    extend(core, {
        Observable: Observable,
        Template: Template
    });
})(jQuery, window);
