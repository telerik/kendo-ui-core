(function($, window) {
    var kendo = window.kendo = window.kendo || {},
        core = kendo.core = {},
        extend = $.extend,
        Template;

    function Observable() {
        this._list = {};
    }

    Observable.prototype = {
        bind: function(eventName, handler) {
            var that = this,
                list = that._list[eventName] || [];

            list.push(handler);

            that._list[eventName] = list;

            return that;
        },

        trigger: function(eventName, parameter) {
            var that = this,
                list = that._list[eventName],
                idx,
                length;

            if (list) {
                for (idx = 0, length = list.length; idx < length; idx++) {
                    list[idx].call(that, parameter);
                }
            }

            return that;
        },

        unbind: function(eventName, handler) {
            var that = this,
                list = that._list[eventName],
                idx,
                length;

            if (list) {
                if (handler) {
                    for (idx = 0, length = list.length; idx < length; idx++) {
                        if (list[idx] === handler) {
                            list.splice(idx, 1);
                        }
                    }
                } else {
                    that._list[eventName] = [];
                }
            }

            return that;
        }
    }

    Template = {
        paramName: "data", // name of the parameter of the generated template
        useWith: true, // whether to put
        begin: "<%",
        end: "%>",
        compile: function(template, options) {
            var settings = extend({}, this, options),
                paramName = settings.paramName,
                begin = settings.begin,
                end = settings.end,
                useWith = settings.useWith,
                functionBody = "var o='';",
                evalRegExp = new RegExp(begin + "=(.+?)" + end, "g"),
                quoteRegExp = new RegExp("'(?=.*?" + end + ")", "g");

            functionBody += useWith ? "with(" + paramName + "){" : "";

            functionBody += "o+='";

            functionBody += template.replace(/[\r\t\n]/g, " ")
                .replace(quoteRegExp,"\t")
                .split("'").join("\\'")
                .split("\t").join("'")
                .replace(evalRegExp, "'; o+=$1; o+='")
                .split(begin).join("';")
                .split(end).join("o+='");

            functionBody += useWith ? "'}" : "';";

            functionBody += "return o;";

            return new Function(paramName, functionBody);
        }
    };
    extend(core, {
        Observable: Observable,
        Template: Template
    });
})(jQuery, window);
