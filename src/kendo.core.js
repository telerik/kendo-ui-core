;(function($, undefined) {
    /**
     * @name kendo
     * @namespace This object contains all code introduced by the Kendo project, plus helper functions that are used across all components.
     */
    var kendo = window.kendo = window.kendo || {},
        extend = $.extend,
        each = $.each,
        proxy = $.proxy,
        noop = $.noop,
        isFunction = $.isFunction,
        math = Math,
        Template,
        JSON = JSON || {},
        support = {},
        boxShadowRegExp = /(\d+?)px\s*(\d+?)px\s*(\d+?)px\s*(\d+?)?/i,
        newLineTabRegExp = /[\r\t\n]/g,
        FUNCTION = "function",
        STRING = "string",
        NUMBER = "number",
        OBJECT = "object",
        NULL = "null",
        BOOLEAN = "boolean";

    function Class() {}

    Class.extend = function(proto) {
        var base = function() {},
            member,
            that = this,
            subclass = proto && proto.init ? proto.init : function () {
                that.apply(this, arguments);
            },
            fn;

        base.prototype = that.prototype;
        fn = subclass.fn = subclass.prototype = extend(new base, proto);

        for (member in fn) {
            if (typeof fn[member] === OBJECT) {
                fn[member] = extend(true, {}, base.prototype[member], proto[member]);
            }
        }

        fn.constructor = subclass;
        subclass.extend = that.extend;

        return subclass;
    };

    var Observable = Class.extend(/** @lends kendo.Observable.prototype */{
        /**
         * Creates an observable instance.
         * @constructs
         * @class Represents a class that can trigger events, along with methods that subscribe handlers to these events.
         */
        init: function() {
            this._events = {};
        },

        bind: function(eventName, handlers) {
            var that = this,
                idx,
                eventNames = $.isArray(eventName) ? eventName : [eventName],
                length,
                handler,
                events;

            for (idx = 0, length = eventNames.length; idx < length; idx++) {
                eventName = eventNames[idx];

                handler = isFunction(handlers) ? handlers : handlers[eventName];

                if (handler) {
                    events = that._events[eventName] || [];
                    events.push(handler);
                    that._events[eventName] = events;
                }
            }

            return that;
        },

        trigger: function(eventName, parameter) {
            var that = this,
                events = that._events[eventName],
                isDefaultPrevented = false,
                args = extend(parameter, {
                    preventDefault: function() {
                        isDefaultPrevented = true;
                    },
                    isDefaultPrevented: function() {
                        return isDefaultPrevented;
                    }
                }),
                idx,
                length;

            if (events) {
                for (idx = 0, length = events.length; idx < length; idx++) {
                    events[idx].call(that, args);
                }
            }

            return isDefaultPrevented;
        },

        unbind: function(eventName, handler) {
            var that = this,
                events = that._events[eventName],
                idx,
                length;

            if (events) {
                if (handler) {
                    for (idx = 0, length = events.length; idx < length; idx++) {
                        if (events[idx] === handler) {
                            events.splice(idx, 1);
                        }
                    }
                } else {
                    that._events[eventName] = [];
                }
            }

            return that;
        }
    });

    /**
     * @name kendo.Template.Description
     *
     * @section Templates offer way of creating html chunks.
     *  Options such as html encoding and compilation for optimal performance are available.
     *
     * @exampleTitle Basic template
     * @example
     *
     *  var inlineTemplate = kendo.template("Hello, <#= firstName #> <#= lastName #>");
     *  var inlineData = { firstName: "John", lastName: "Doe" };
     *  $("#inline").html(inlineTemplate(inlineData));
     *
     *  Output:
     *  Hello, John Doe!
     *
     * @exampleTitle Encoding HTML
     * @example
     *
     * var encodingTemplate = kendo.template("HTML tags are encoded like this - ${ html }");
     * var encodingData = { html: "<strong>lorem ipsum</strong>" };
     * $("#encoding").html(encodingTemplate(encodingData));
     *
     *  Output:
     *  HTML tags are encoded like this - <strong>lorem ipsum</strong>
     */

    /**
     * @name kendo.Template
     * @namespace
     */
    Template = /** @lends kendo.Template */ {
        paramName: "data", // name of the parameter of the generated template
        useWithBlock: true, // whether to wrap the template in a with() block
        begin: "<#", // the marker which denotes the beginning of executable code
        end: "#>", // the marker which denotes the end of executable code
        /**
         * Renders a template for each item of the data.
         * @ignore
         * @name kendo.Template.render
         * @static
         * @function
         * @param {String} [template] The template that will be rendered
         * @param {Array} [data] Data items
         * @returns {String} The rendered template
         */
        render: function(template, data) {
            var idx,
                length,
                html = "";

            for (idx = 0, length = data.length; idx < length; idx++) {
                html += template(data[idx]);
            }

            return html;
        },
        /**
         * Compiles a template to a function that builds HTML. Useful when a template will be used several times.
         * @ignore
         * @name kendo.Template.compile
         * @static
         * @function
         * @param {String} [template] The template that will be compiled
         * @param {Object} [options] Compilation options
         * @returns {Function} The compiled template
         */
        compile: function(template, options) {
            var settings = extend({}, this, options),
                paramName = settings.paramName,
                begin = settings.begin,
                end = settings.end,
                useWithBlock = settings.useWithBlock,
                functionBody = "var o,e=kendo.htmlEncode;",
                encodeRegExp = /\${([^}]*)}/g,
                evalRegExp = new RegExp(begin + "=(.+?)" + end, "g"),
                quoteRegExp = new RegExp("'(?=[^" + end[0] + "]*" + end + ")", "g");

            if (isFunction(template)) {
                if (template.length === 2) {
                    //looks like jQuery.template
                    return function(d) {
                        return template($, { data: d }).join("");
                    }
                }
                return template;
            }

            functionBody += useWithBlock ? "with(" + paramName + "){" : "";

            functionBody += "o='";

            functionBody += template.replace(newLineTabRegExp, " ")
                .replace(quoteRegExp,"\t")
                .split("'").join("\\'")
                .split("\t").join("'")
                .replace(encodeRegExp, "'+e($1)+'")
                .replace(evalRegExp, "'+($1)+'")
                .split(begin).join("';")
                .split(end).join("o+='");

            functionBody += useWithBlock ? "';}" : "';";

            functionBody += "return o;";

            return new Function(paramName, functionBody);
        }
    };


    //JSON stringify
(function() {
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            "\"" : '\\"',
            "\\": "\\\\"
        },
        rep,
        formatters,
        toString = {}.toString,
        hasOwnProperty = {}.hasOwnProperty;

    if (typeof Date.prototype.toJSON !== FUNCTION) {

        /** @ignore */
        Date.prototype.toJSON = function (key) {
            var that = this;

            return isFinite(that.valueOf()) ?
                that.getUTCFullYear()     + "-" +
                pad(that.getUTCMonth() + 1) + "-" +
                pad(that.getUTCDate())      + "T" +
                pad(that.getUTCHours())     + ":" +
                pad(that.getUTCMinutes())   + ":" +
                pad(that.getUTCSeconds())   + "Z" : null;
        };

        String.prototype.toJSON = Number.prototype.toJSON = /** @ignore */ Boolean.prototype.toJSON = function (key) {
            return this.valueOf();
        };
    }

    function quote(string) {
        escapable.lastIndex = 0;
        return escapable.test(string) ? "\"" + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === STRING ? c :
                "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
        }) + "\"" : "\"" + string + "\"";
    }

    function str(key, holder) {
        var i,
            k,
            v,
            length,
            mind = gap,
            partial,
            value = holder[key],
            type;

        if (value && typeof value === OBJECT && typeof value.toJSON === FUNCTION) {
            value = value.toJSON(key);
        }

        if (typeof rep === FUNCTION) {
            value = rep.call(holder, key, value);
        }

        type = typeof value;
        if (type === STRING) {
            return quote(value);
        } else if (type === NUMBER) {
            return isFinite(value) ? String(value) : NULL;
        } else if (type === BOOLEAN || type === NULL) {
            return String(value);
        } else if (type === OBJECT) {
            if (!value) {
                return NULL;
            }
            gap += indent;
            partial = [];
            if (toString.apply(value) === "[object Array]") {
                length = value.length;
                for (i = 0; i < length; i++) {
                    partial[i] = str(i, value) || NULL;
                }
                v = partial.length === 0 ? "[]" : gap ?
                    "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" :
                    "[" + partial.join(",") + "]";
                gap = mind;
                return v;
            }
            if (rep && typeof rep === OBJECT) {
                length = rep.length;
                for (i = 0; i < length; i++) {
                    if (typeof rep[i] === STRING) {
                        k = rep[i];
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ": " : ":") + v);
                        }
                    }
                }
            } else {
                for (k in value) {
                    if (hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ": " : ":") + v);
                        }
                    }
                }
            }

            v = partial.length === 0 ? "{}" : gap ?
                "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" :
                "{" + partial.join(",") + "}";
            gap = mind;
            return v;
        }
    }

    if (typeof JSON.stringify !== FUNCTION) {
        JSON.stringify = function (value, replacer, space) {
            var i;
            gap = "";
            indent = "";

            if (typeof space === NUMBER) {
                for (i = 0; i < space; i += 1) {
                    indent += " ";
                }

            } else if (typeof space === STRING) {
                indent = space;
            }

            rep = replacer;
            if (replacer && typeof replacer !== FUNCTION && (typeof replacer !== OBJECT || typeof replacer.length !== NUMBER)) {
                throw new Error("JSON.stringify");
            }

            return str("", {"": value});
        };
    }
})();

// Date and Number formatting
(function() {
    var formatRegExp = /{(\d+)(:[^\}]+)?}/g,
        dateFormatRegExp = /dddd|ddd|dd|d|MMMM|MMM|MM|M|yyyy|yy|HH|H|hh|h|mm|m|fff|ff|f|tt|ss|s|"[^"]*"|'[^']*'/g,
        standardFormatRegExp =  /^(n|c|p|e)(\d*)$/i,
        EMPTY = "",
        POINT = ".",
        COMMA = ",",
        SHARP = "#",
        ZERO = "0";

    //cultures
    kendo.cultures = {"en-US" : {
        name: "en-US",
        numberFormat: {
            pattern: ["-n"],
            decimals: 2,
            ",": ",",
            ".": ".",
            groupSize: [3],
            percent: {
                pattern: ["-n %", "n %"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "%"
            },
            currency: {
                pattern: ["($n)", "$n"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "$"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    namesAbbr: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                    namesShort: [ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa" ]
                },
                months: {
                    names: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                    namesAbbr: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
                },
                AM: ["AM"],
                PM: ["PM"],
                patterns: {
                    d: "M/d/yyyy",
                    D: "dddd, MMMM dd, yyyy",
                    F: "dddd, MMMM dd, yyyy h:mm:ss tt",
                    g: "M/d/yyyy h:mm tt",
                    G: "M/d/yyyy h:mm:ss tt",
                    m: "MMMM dd",
                    M: "MMMM dd",
                    s: "yyyy'-'MM'-'ddTHH':'mm':'ss",
                    t: "h:mm tt",
                    T: "h:mm:ss tt",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "MMMM, yyyy",
                    Y: "MMMM, yyyy"
                },
                "/": "/",
                ":": ":"
            }
        }
    }};

    //get or set culture.
    kendo.culture = function(cultureName) {
        if (cultureName !== undefined) {
            var cultures = kendo.cultures,
                culture = cultures[cultureName] || cultures["en-US"];

            culture.calendar = culture.calendars.standard;
            kendo.currentCulture = culture;
        } else {
            return kendo.currentCulture;
        }
    }

    //set current culture to en-US.
    kendo.culture("en-US");

    function pad(number) {
        return number < 10 ? "0" + number : number;
    }

    function formatDate(date, format) {
        var calendar = kendo.currentCulture.calendar,
            days = calendar.days,
            months = calendar.months;

        format = calendar.patterns[format] || format;

        return format.replace(dateFormatRegExp, function (match) {
            var result;

            if (match === "d") {
                result = date.getDate();
            } else if (match === "dd") {
                result = pad(date.getDate());
            } else if (match === "ddd") {
                result = days.namesAbbr[date.getDay()];
            } else if (match === "dddd") {
                result = days.names[date.getDay()];
            } else if (match === "M") {
                result = date.getMonth() + 1;
            } else if (match === "MM") {
                result = pad(date.getMonth() + 1);
            } else if (match === "MMM") {
                result = months.namesAbbr[date.getMonth()];
            } else if (match === "MMMM") {
                result = months.names[date.getMonth()];
            } else if (match === "yy") {
                result = pad(date.getFullYear() % 100);
            } else if (match === "yyyy") {
                result = date.getFullYear();
            } else if (match === "h" ) {
                result = date.getHours() % 12 || 12
            } else if (match === "hh") {
                result = pad(date.getHours() % 12 || 12);
            } else if (match === "H") {
                result = date.getHours();
            } else if (match === "HH") {
                result = pad(date.getHours());
            } else if (match === "m") {
                result = date.getMinutes();
            } else if (match === "mm") {
                result = pad(date.getMinutes());
            } else if (match === "s") {
                result = date.getSeconds();
            } else if (match === "ss") {
                result = pad(date.getSeconds());
            } else if (match === "f") {
                result = math.floor(date.getMilliseconds() / 100);
            } else if (match === "ff") {
                result = math.floor(date.getMilliseconds() / 10);
            } else if (match === "fff") {
                result = date.getMilliseconds();
            } else if (match === "tt") {
                result = date.getHours() < 12 ? calendar.AM[0] : calendar.PM[0]
            }

            return result !== undefined ? result : match.slice(1, match.length - 1);
        });
    }

    //number formatting
    function formatNumber(number, format) {
        var culture = kendo.currentCulture,
            numberFormat = culture.numberFormat,
            groupSize = numberFormat.groupSize[0],
            groupSeparator = numberFormat[COMMA],
            decimal = numberFormat[POINT],
            precision = numberFormat.decimals,
            pattern = numberFormat.pattern[0],
            symbol,
            isCurrency, isPercent,
            customPrecision,
            formatAndPrecision,
            negative = number < 0,
            integer,
            fraction,
            integerLength,
            fractionLength,
            replacement = EMPTY,
            value = EMPTY,
            idx,
            length,
            ch,
            decimalIndex,
            sharpIndex,
            zeroIndex,
            start = -1,
            end;

        //return empty string if no number
        if (number === undefined) {
            return EMPTY;
        }

        //if no format then return number.toString() or number.toLocaleString() if culture.name is not defined
        if (!format) {
            return culture.name.length ? number.toLocaleString() : number.toString();
        }

        formatAndPrecision = standardFormatRegExp.exec(format);

        //standard formatting
        if (formatAndPrecision) {
            format = formatAndPrecision[1].toLowerCase();

            isCurrency = format === "c";
            isPercent = format === "p";

            if (isCurrency || isPercent) {
                //get specific number format information if format is currency or percent
                numberFormat = isCurrency ? numberFormat.currency : numberFormat.percent;
                groupSize = numberFormat.groupSize[0];
                groupSeparator = numberFormat[COMMA];
                decimal = numberFormat[POINT];
                precision = numberFormat.decimals;
                symbol = numberFormat.symbol;
                pattern = numberFormat.pattern[negative ? 0 : 1];
            }

            customPrecision = formatAndPrecision[2];

            if (customPrecision) {
                precision = +customPrecision;
            }

            //return number in exponential format
            if (format === "e") {
                return number.toExponential(customPrecision ? precision : undefined);
            }

            // multiply if format is percent
            if (isPercent) {
                number *= 100;
            }

            number = number.toFixed(precision);
            number = number.split(POINT);

            integer = number[0];
            fraction = number[1];

            //exclude "-" if number is negative.
            if (negative) {
                integer = integer.substring(1);
            }

            value = integer;
            integerLength = integer.length;

            //add group separator to the number if it is longer enough
            if (integerLength >= groupSize) {
                value = EMPTY;
                for (idx = 0; idx < integerLength; idx++) {
                    if (idx > 0 && (integerLength - idx) % groupSize === 0) {
                        value += groupSeparator;
                    }
                    value += integer.charAt(idx);
                }
            }

            if (fraction) {
                value += decimal + fraction;
            }

            if (format === "n" && !negative) {
                return value;
            }

            number = EMPTY;

            for (idx = 0, length = pattern.length; idx < length; idx++) {
                ch = pattern.charAt(idx);

                if (ch === "n") {
                    number += value;
                } else if (ch === "$" || ch === "%") {
                    number += symbol;
                } else {
                    number += ch;
                }
            }

            return number;
        }

        /* custom formatting */
        //separate format by sections.
        format = format.split(";");
        if (negative && format[1]) {
            //make number positive and get negative format
            number = -number;
            format = format[1];
        } else if (number === 0) {
            //format for zeros
            format = format[2] || format[0];
            if (format.indexOf(SHARP) == -1 && format.indexOf(ZERO) == -1) {
                //return format if it is string constant.
                return format;
            }
        } else {
            format = format[0];
        }

        isCurrency = format.indexOf("$") != -1;
        isPercent = format.indexOf("%") != -1;

        //multiply number if the format has percent
        if (isPercent) {
            number *= 100;
        }

        if (isCurrency || isPercent) {
            //get specific number format information if format is currency or percent
            numberFormat = isCurrency ? numberFormat.currency : numberFormat.percent;
            groupSize = numberFormat.groupSize[0];
            groupSeparator = numberFormat[COMMA];
            decimal = numberFormat[POINT];
            precision = numberFormat.decimals;
            symbol = numberFormat.symbol;
        }

        decimalIndex = format.indexOf(POINT);
        length = format.length;

        if (decimalIndex != -1) {
            sharpIndex = format.lastIndexOf(SHARP);
            zeroIndex = format.lastIndexOf(ZERO);

            if (zeroIndex != -1) {
                value = number.toFixed(zeroIndex - decimalIndex);
                number = number.toString();
                number = number.length > value.length && sharpIndex > zeroIndex ? number : value;
            }
        } else {
            number = number.toFixed(0);
        }

        sharpIndex = format.indexOf(SHARP);
        zeroIndex = format.indexOf(ZERO);

        //define the index of the first digit placeholder
        if (sharpIndex == -1 && zeroIndex != -1) {
            start = zeroIndex;
        } else if (sharpIndex != -1 && zeroIndex == -1) {
            start = sharpIndex;
        } else {
            start = sharpIndex > zeroIndex ? zeroIndex : sharpIndex;
        }

        sharpIndex = format.lastIndexOf(SHARP);
        zeroIndex = format.lastIndexOf(ZERO);

        //define the index of the last digit placeholder
        if (sharpIndex == -1 && zeroIndex != -1) {
            end = zeroIndex;
        } else if (sharpIndex != -1 && zeroIndex == -1) {
            end = sharpIndex;
        } else {
            end = sharpIndex > zeroIndex ? sharpIndex : zeroIndex;
        }

        if (start == length) {
            end = start;
        }

        if (start != -1) {
            value = number.toString().split(POINT);
            integer = value[0];
            fraction = value[1] || EMPTY;

            integerLength = integer.length;
            fractionLength = fraction.length;

            //add group separator to the number if it is longer enough
            if (integerLength >= groupSize && format.indexOf(COMMA) != -1) {
                value = EMPTY;
                for (idx = 0; idx < integerLength; idx++) {
                    if (idx > 0 && (integerLength - idx) % groupSize === 0) {
                        value += groupSeparator;
                    }
                    value += integer.charAt(idx);
                }
                integer = value;
            }

            number = format.substring(0, start);

            for (idx = start; idx < length; idx++) {
                ch = format.charAt(idx);

                if (decimalIndex == -1) {
                    if (end - idx < integerLength) {
                        number += integer;
                        break;
                    }
                } else {
                    if (zeroIndex != -1 && zeroIndex < idx) {
                        replacement = EMPTY;
                    }

                    if ((decimalIndex - idx) <= integerLength && decimalIndex - idx > -1) {
                        number += integer;
                        idx = decimalIndex;
                    }

                    if (decimalIndex === idx) {
                        number += (fraction ? decimal : EMPTY) + fraction;
                        idx += end - decimalIndex + 1;
                        continue;
                    }
                }

                if (ch === ZERO) {
                    number += ch;
                    replacement = ch;
                } else if (ch === SHARP) {
                    number += replacement;
                } else if (ch === COMMA) {
                    continue;
                }
            }

            if (end >= start) {
                number += format.substring(end + 1);
            }

            //replace symbol placeholders
            if (isCurrency || isPercent) {
                value = EMPTY;
                for (idx = 0, length = number.length; idx < length; idx++) {
                    ch = number.charAt(idx);
                    value += (ch === "$" || ch === "%") ? symbol : ch;
                }
                number = value;
            }
        }

        return number;
    }

    function toString(value, fmt) {
        var globalize = window.Globalize;
        if (globalize) {
            return globalize.format(value, fmt);
        }

        if (fmt) {
            if (value instanceof Date) {
                return formatDate(value, fmt);
            } else if (typeof value === NUMBER) {
                return formatNumber(value, fmt);
            }
        }

        return value !== undefined ? value : "";
    }

    kendo.format = function(fmt) {
        var values = arguments;

        return fmt.replace(formatRegExp, function(match, index, placeholderFormat) {
            var value = values[parseInt(index) + 1];

            return toString(value, placeholderFormat ? placeholderFormat.substring(1) : "");
        });
    };

    kendo.toString = toString;
    })();

    function throttle(delay, callback) {
        var timeoutId,
            lastCall = 0,
            omitEnding = arguments[2] || false;

        return function () {
            var that = this,
                timeSpan = +new Date() - lastCall,
                args = arguments;

            function execute() {
                lastCall = +new Date();
                callback.apply(that, args);
            }

            function clear() {
                clearTimeout(timeoutId);
                timeoutId = undefined;
            }

            timeoutId && clear();

            if (timeSpan > delay) {
                execute();
            } else if (!omitEnding) {
                timeoutId = setTimeout(execute, delay - timeSpan);
            }
        };
    }

    function wrap(element) {
        var browser = $.browser;

        if (!element.parent().hasClass("t-animation-container")) {
            var shadow = element.css(kendo.support.transitions.css + "box-shadow") || element.css("box-shadow"),
                radius = shadow ? shadow.match(boxShadowRegExp) || [ 0, 0, 0, 0, 0 ] : [ 0, 0, 0, 0, 0 ],
                blur = math.max((+radius[3]), +(radius[4] || 0)),
                right = (+radius[1]) + blur,
                bottom = (+radius[2]) + blur;

            if (browser.opera) { // Box shadow can't be retrieved in Opera
                right = bottom = 5;
            }

            element.wrap(
                         $("<div/>")
                         .addClass("t-animation-container")
                         .css({
                             width: element.outerWidth(),
                             height: element.outerHeight(),
                             paddingRight: right,
                             paddingBottom: bottom
                         }));
        } else {
            var wrap = element.parent(".t-animation-container");

            if (wrap.is(":hidden")) {
                wrap.show();
            }

            wrap.css({
                    width: element.outerWidth(),
                    height: element.outerHeight()
                });
        }

        if (browser.msie && math.floor(browser.version) <= 7) {
            element.css({
                zoom: 1
            });
        }

        return element.parent();
    }

    /**
     * Contains results from feature detection.
     * @name kendo.support
     * @namespace Contains results from feature detection.
     */
    (function() {
        /**
         * Indicates the width of the browser scrollbar. A value of zero means that the browser does not show a visual representation of a scrollbar (i.e. mobile browsers).
         * @name kendo.support.scrollbar
         * @property {Boolean}
         */
        support.scrollbar = function() {
            var div = document.createElement("div"),
                result;

            div.style.cssText = "overflow:scroll;overflow-x:hidden;zoom:1";
            div.innerHTML = "&nbsp;";
            document.body.appendChild(div);

            result = div.offsetWidth - div.scrollWidth;

            document.body.removeChild(div);
            return result;
        };

        var table = document.createElement("table");

        // Internet Explorer does not support setting the innerHTML of TBODY and TABLE elements
        try {
            table.innerHTML = "<tr><td></td></tr>";

            /**
             * Indicates whether the browser supports setting of the &lt;tbody&gt; innerHtml.
             * @name kendo.support.tbodyInnerHtml
             * @property {Boolean}
             */
            support.tbodyInnerHtml = true;
        } catch (e) {
            support.tbodyInnerHtml = false;
        }

        /**
         * Indicates whether the browser supports touch events.
         * @name kendo.support.touch
         * @property {Boolean}
         */
        support.touch = "ontouchstart" in window;

        /**
         * Indicates whether the browser supports CSS transitions.
         * @name kendo.support.transitions
         * @property {Boolean}
         */
        var transitions = support.transitions = false;

        /**
         * Indicates whether the browser supports hardware 3d transitions.
         * @name kendo.support.hasHW3D
         * @property {Boolean}
         */
        support.hasHW3D = "WebKitCSSMatrix" in window && "m11" in new WebKitCSSMatrix();

        each([ "Moz", "webkit", "O", "ms" ], function () {
            var prefix = this.toString();

            if (typeof table.style[prefix + "Transition"] === STRING) {
                var lowPrefix = prefix.toLowerCase();

                transitions = {
                    css: "-" + lowPrefix + "-",
                    prefix: prefix,
                    event: (lowPrefix === "o" || lowPrefix === "webkit") ? lowPrefix : ""
                };

                transitions.event = transitions.event ? transitions.event + "TransitionEnd" : "transitionend";

                return false;
            }
        });

        support.transitions = transitions;
        
        function detectOS(ua) {
            var os = false, match = [],
                agentRxs = {
                    android: /(Android)\s+(\d+)\.([\d.]+)/,
                    iphone: /(iPhone|iPod).*OS\s+(\d+)[\._]([\d\._]+)/,
                    ipad: /(iPad).*OS\s+(\d+)[\._]([\d_]+)/,
                    meego: /(MeeGo).+NokiaBrowser\/(\d+)\.([\d\._]+)/,
                    webos: /(webOS)\/(\d+)\.([\d.]+)/,
                    blackberry: /(BlackBerry).*?Version\/(\d+)\.([\d.]+)/
                };
            for (var agent in agentRxs) {
                if (agentRxs.hasOwnProperty(agent)) {
                    match = ua.match(agentRxs[agent]);
                    if (match) {
                        os = {};
                        os.name = agent.toLowerCase();
                        os[os.name] = true;
                        os.majorVersion = match[2];
                        os.minorVersion = match[3].replace("_", ".");
                        os.flatVersion = os.majorVersion + os.minorVersion.replace(".", "");
                        os.flatVersion = os.flatVersion + (new Array(4 - os.flatVersion.length).join("0")); // Pad with zeroes
                        os.ios = (agent in { iphone:0, ipod:0, ipad:0 });

                        break;
                    }
                }
            }
            return os;
        }

        /**
         * Parses the mobile OS type and version from the browser user agent.
         * @name kendo.support.mobileOS
         */
        support.mobileOS = detectOS(navigator.userAgent);

        support.zoomLevel = function() {
            return support.touch ? (document.documentElement.clientWidth / window.innerWidth) : 1;
        };

        /**
         * Indicates the browser device pixel ratio.
         * @name kendo.support.devicePixelRatio
         * @property {Float}
         */
        support.devicePixelRatio = window.devicePixelRatio === undefined ? 1 : window.devicePixelRatio;
    })();

    /**
     * Exposed by jQuery.
     * @ignore
     * @name jQuery.fn
     * @namespace Handy jQuery plug-ins that are used by all Kendo components.
     */

    function size(obj) {
        var size = 0, key;
        for (key in obj) {
            obj.hasOwnProperty(key) && size++;
        }

        return size;
    }

    function getOffset(element, type) {
        if (!type) {
            type = "offset";
        }

        var result = element[type](),
            mobileOS = support.mobileOS;

        if (support.touch && mobileOS.ios && mobileOS.flatVersion < 410) { // Extra processing only in broken iOS'
            var offset = type == "offset" ? result : element.offset(),
                positioned = (result.left == offset.left && result.top == offset.top);

            if (positioned) {
                return {
                    top: result.top - window.scrollY,
                    left: result.left - window.scrollX
                };
            }
        }

        return result;
    }

    var directions = {
        left: { reverse: "right" },
        right: { reverse: "left" },
        down: { reverse: "up" },
        up: { reverse: "down" },
        "in": { reverse: "out" },
        out: { reverse: "in" }
    };

    function parseEffects(input) {
        var effects = {};

        each((typeof input === "string" ? input.split(" ") : input), function(idx) {
            effects[idx] = this;
        });

        return effects;
    }

    fx = {
        promise: function (element, options) {
            if (options.show) {
                element.show();
            }

            if (options.hide) {
                element.hide();
            }

            if (options.completeCallback) {
                options.completeCallback(); // call the external complete callback
            }

            element.dequeue();
        }
    };

    function animate(element, options, duration, reverse, complete) {
        if (typeof options === STRING) {
            // options is the list of effect names separated by space e.g. animate(element, "fadeIn slideDown")

            // only callback is provided e.g. animate(element, options, function() {});
            if (isFunction(duration)) {
                complete = duration;
                duration = 400;
                reverse = false;
            }

            if (isFunction(reverse)) {
                complete = reverse;
                reverse = false;
            }

            if (typeof duration === BOOLEAN){
                reverse = duration;
                duration = 400;
            }

            options = {
                effects: options,
                duration: duration,
                reverse: reverse,
                complete: complete
            };
        }

        options = extend({
            //default options
            effects: {},
            duration: 400, //jQuery default duration
            reverse: false,
            init: noop,
            complete: noop,
            teardown: noop,
            hide: false,
            show: false
        }, options, { completeCallback: options.complete }); // Move external complete callback, so deferred.resolve can be always executed.

        return element.queue(function () {
            fx.promise(element, options);
        });
    }

    extend($.fn, /** @lends jQuery.fn */{
        kendoStop: function(clearQueue, gotoEnd) {
            return this.stop(clearQueue, gotoEnd);
        },
        kendoAnimate: function(options, duration, reverse, complete) {
            return animate(this, options, duration, reverse, complete);
        }
    });

    function toggleClass(element, classes, options, add) {
        if (classes) {
            classes = classes.split(" ");

            each(classes, function(idx, value) {
                element.toggleClass(value, add);
            });
        }

        return element;
    }

    extend($.fn, /** @lends jQuery.fn */{
        kendoAddClass: function(classes, options){
            return toggleClass(this, classes, options, true);
        },
        kendoRemoveClass: function(classes, options){
            return toggleClass(this, classes, options, false);
        },
        kendoToggleClass: function(classes, options, toggle){
            return toggleClass(this, classes, options, toggle);
        }
    });

    var ampRegExp = /&/g,
        ltRegExp = /</g,
        gtRegExp = />/g;
    /**
     * Encodes HTML characters to entities.
     * @name kendo.htmlEncode
     * @function
     * @param {String} value The string that needs to be HTML encoded.
     * @returns {String} The encoded string.
     */
    function htmlEncode(value) {
        return ("" + value).replace(ampRegExp, "&amp;").replace(ltRegExp, "&lt;").replace(gtRegExp, "&gt;");
    }

    var touchLocation = function(e) {
        return {
            idx: 0,
            x: e.pageX,
            y: e.pageY
        };
    };

    var eventTarget = function (e) {
        return e.target;
    };

    if (support.touch) {
        /** @ignore */
        touchLocation = function(e, id) {
            var changedTouches = e.changedTouches || e.originalEvent.changedTouches;

            if (id) {
                var output = null;
                each(changedTouches, function(idx, value) {
                    if (id == value.identifier) {
                        output = {
                            idx: value.identifier,
                            x: value.pageX,
                            y: value.pageY
                        };
                    }
                });
                return output;
            } else {
                return {
                    idx: changedTouches[0].identifier,
                    x: changedTouches[0].pageX,
                    y: changedTouches[0].pageY
                };
            }
        };

        eventTarget = function(e) {
            var touches = "originalEvent" in e ? e.originalEvent.changedTouches : "changedTouches" in e ? e.changedTouches : null;

            return touches ? document.elementFromPoint(touches[0].clientX, touches[0].clientY) : null;
        };

        each(["swipe", "swipeLeft", "swipeRight", "swipeUp", "swipeDown", "doubleTap", "tap"], function(m, value) {
            $.fn[value] = function(callback) {
                return this.bind(value, callback)
            }
        });
    }

    extend(kendo, /** @lends kendo */ {
        /**
         * @name kendo.ui
         * @namespace Contains all classes for the Kendo UI components.
         */
        ui: {
            /**
             * Shows an overlay with a loading message, indicating that an action is in progress.
             * @name kendo.ui.progress
             * @function
             * @param {jQueryObject} container The container that will hold the overlay
             * @param {Boolean} toggle Whether the overlay should be shown or hidden
             */
            progress: function(container, toggle) {
                var mask = container.find(".t-loading-mask");

                if (toggle) {
                    if (!mask.length) {
                        mask = $("<div class='t-loading-mask'><span class='t-loading-text'>Loading...</span><div class='t-loading-image'/><div class='t-loading-color'/></div>")
                            .width("100%").height("100%")
                            .prependTo(container);
                    }
                } else if (mask) {
                    mask.remove();
                }
            }
        },
        fx: fx,
        data: {},
        keys: {
            BACKSPACE: 8,
            TAB: 9,
            ENTER: 13,
            ESC: 27,
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40,
            END: 35,
            HOME: 36,
            SPACEBAR: 32,
            PAGEUP: 33,
            PAGEDOWN: 34
        },
        support: support,
        animate: animate,
        throttle: throttle,
        wrap: wrap,
        size: size,
        getOffset: getOffset,
        parseEffects: parseEffects,
        toggleClass: toggleClass,
        directions: directions,
        Observable: Observable,
        Class: Class,
        Template: Template,
        /**
         * Shorthand for {@link kendo.Template.compile}.
         * @name kendo.template
         * @function
         */
        template: proxy(Template.compile, Template),
        /**
         * Shorthand for {@link kendo.Template.render}.
         * @name kendo.render
         * @function
         */
        render: proxy(Template.render, Template),
        stringify: proxy(JSON.stringify, JSON),
        touchLocation: touchLocation,
        eventTarget: eventTarget,
        htmlEncode: htmlEncode,
        /** @ignore */
        getter: function(expression) {
            expression = expression || "";

            if (expression && expression.charAt(0) !== "[") {
                expression = "." + expression;
            }

            return new Function("d", "return d" + expression);
        },
        /** @ignore */
        setter: function(expression) {
            return new Function("d,value", "d." + expression + "=value");
        },
        /** @ignore */
        accessor: function(expression) {
            return {
                get: kendo.getter(expression),
                set: kendo.setter(expression)
            };
        },
        /** @ignore */
        guid: function() {
            var id = "", i, random;

            for (i = 0; i < 32; i++) {
                random = math.random() * 16 | 0;

                if (i == 8 || i == 12 || i == 16 || i == 20) {
                    id += "-";
                }
                id += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
            }

            return id;
        }
    });

    var Component = Observable.extend( /** @lends kendo.ui.Component.prototype */ {
        /**
         * Initializes component. Sets `element` and `options` properties.
         * @constructs
         * @class Represents a UI component. Base class for all Kendo components
         * @extends kendo.Observable
         */
        init: function(element, options) {
            var that = this;

            Observable.fn.init.call(that);
            that.element = $(element);
            that.options = extend(true, {}, that.options, options);
        }
    });

    extend(kendo.ui, /** @lends kendo.ui */{
        Component: Component,
        /**
         * Helper method for writing new components.
         * Exposes a jQuery plug-in that will handle the component creation and attach its client-side object in the appropriate data-kendo* attribute.
         * Also triggers the init event, when the component has been created.
         * @name kendo.ui.plugin
         * @function
         * @param {String} name The name of the component.
         * @param {kendo.ui.Component} component The component function.
         * @example
         * function TextBox(element, options);
         * kendo.ui.plugin("TextBox", TextBox);
         *
         * // initialize a new TextBox for each input, with the given options object.
         * $("input").kendoTextBox({ });
         * // get the TextBox object and call the value API method
         * $("input").data("kendoTextBox").value();
         */
        plugin: function(name, component) {
            // expose it in the kendo.ui namespace
            kendo.ui[name] = component;

            name = "kendo" + name;
            // expose a jQuery plugin
            $.fn[name] = function(options) {
                $(this).each(function() {
                    var comp = new component(this, options);
                    $(this).data(name, comp);
                });
                return this;
            }
        }
    });
})(jQuery);
