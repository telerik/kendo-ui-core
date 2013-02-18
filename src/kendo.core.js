(function($, evil, undefined) {
    var kendo = window.kendo = window.kendo || {},
        extend = $.extend,
        each = $.each,
        proxy = $.proxy,
        isArray = $.isArray,
        noop = $.noop,
        isFunction = $.isFunction,
        math = Math,
        Template,
        JSON = window.JSON || {},
        support = {},
        percentRegExp = /%/,
        formatRegExp = /\{(\d+)(:[^\}]+)?\}/g,
        boxShadowRegExp = /(\d+?)px\s*(\d+?)px\s*(\d+?)px\s*(\d+?)?/i,
        FUNCTION = "function",
        STRING = "string",
        NUMBER = "number",
        OBJECT = "object",
        NULL = "null",
        BOOLEAN = "boolean",
        UNDEFINED = "undefined",
        getterCache = {},
        setterCache = {},
        slice = [].slice,
        globalize = window.Globalize;

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
        fn = subclass.fn = subclass.prototype = new base();

        for (member in proto) {
            if (typeof proto[member] === OBJECT && !(proto[member] instanceof Array) && proto[member] !== null) {
                // Merge object members
                fn[member] = extend(true, {}, base.prototype[member], proto[member]);
            } else {
                fn[member] = proto[member];
            }
        }

        fn.constructor = subclass;
        subclass.extend = that.extend;

        return subclass;
    };

    var preventDefault = function() {
        this._defaultPrevented = true;
    };

    var isDefaultPrevented = function() {
        return this._defaultPrevented === true;
    };

    var Observable = Class.extend({
        init: function() {
            this._events = {};
        },

        bind: function(eventName, handlers, one) {
            var that = this,
                idx,
                eventNames = typeof eventName === STRING ? [eventName] : eventName,
                length,
                original,
                handler,
                handlersIsFunction = typeof handlers === FUNCTION,
                events;

            if (handlers === undefined) {
                for (idx in eventName) {
                    that.bind(idx, eventName[idx]);
                }
                return that;
            }

            for (idx = 0, length = eventNames.length; idx < length; idx++) {
                eventName = eventNames[idx];

                handler = handlersIsFunction ? handlers : handlers[eventName];

                if (handler) {
                    if (one) {
                        original = handler;
                        handler = function() {
                            that.unbind(eventName, handler);
                            original.apply(that, arguments);
                        };
                    }
                    events = that._events[eventName] = that._events[eventName] || [];
                    events.push(handler);
                }
            }

            return that;
        },

        one: function(eventNames, handlers) {
            return this.bind(eventNames, handlers, true);
        },

        first: function(eventName, handlers) {
            var that = this,
                idx,
                eventNames = typeof eventName === STRING ? [eventName] : eventName,
                length,
                handler,
                handlersIsFunction = typeof handlers === FUNCTION,
                events;

            for (idx = 0, length = eventNames.length; idx < length; idx++) {
                eventName = eventNames[idx];

                handler = handlersIsFunction ? handlers : handlers[eventName];

                if (handler) {
                    events = that._events[eventName] = that._events[eventName] || [];
                    events.unshift(handler);
                }
            }

            return that;
        },

        trigger: function(eventName, e) {
            var that = this,
                events = that._events[eventName],
                idx,
                length;

            if (events) {
                e = e || {};

                e.sender = that;

                e._defaultPrevented = false;

                e.preventDefault = preventDefault;

                e.isDefaultPrevented = isDefaultPrevented;

                events = events.slice();

                for (idx = 0, length = events.length; idx < length; idx++) {
                    events[idx].call(that, e);
                }

                return e._defaultPrevented === true;
            }

            return false;
        },

        unbind: function(eventName, handler) {
            var that = this,
                events = that._events[eventName],
                idx,
                length;

            if (eventName === undefined) {
                that._events = {};
            } else if (events) {
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


     function compilePart(part, stringPart) {
         if (stringPart) {
             return "'" +
                 part.split("'").join("\\'")
                     .split('\\"').join('\\\\\\"')
                     .replace(/\n/g, "\\n")
                     .replace(/\r/g, "\\r")
                     .replace(/\t/g, "\\t") + "'";
         } else {
             var first = part.charAt(0),
                 rest = part.substring(1);

             if (first === "=") {
                 return "+(" + rest + ")+";
             } else if (first === ":") {
                 return "+e(" + rest + ")+";
             } else {
                 return ";" + part + ";o+=";
             }
         }
     }

    var argumentNameRegExp = /^\w+/,
        encodeRegExp = /\$\{([^}]*)\}/g,
        escapedCurlyRegExp = /\\\}/g,
        curlyRegExp = /__CURLY__/g,
        escapedSharpRegExp = /\\#/g,
        sharpRegExp = /__SHARP__/g,
        zeros = ["", "0", "00", "000", "0000"];

    Template = {
        paramName: "data", // name of the parameter of the generated template
        useWithBlock: true, // whether to wrap the template in a with() block
        render: function(template, data) {
            var idx,
                length,
                html = "";

            for (idx = 0, length = data.length; idx < length; idx++) {
                html += template(data[idx]);
            }

            return html;
        },
        compile: function(template, options) {
            var settings = extend({}, this, options),
                paramName = settings.paramName,
                argumentName = paramName.match(argumentNameRegExp)[0],
                useWithBlock = settings.useWithBlock,
                functionBody = "var o,e=kendo.htmlEncode;",
                parts,
                idx;

            if (isFunction(template)) {
                if (template.length === 2) {
                    //looks like jQuery.template
                    return function(d) {
                        return template($, { data: d }).join("");
                    };
                }
                return template;
            }

            functionBody += useWithBlock ? "with(" + paramName + "){" : "";

            functionBody += "o=";

            parts = template
                .replace(escapedCurlyRegExp, "__CURLY__")
                .replace(encodeRegExp, "#=e($1)#")
                .replace(curlyRegExp, "}")
                .replace(escapedSharpRegExp, "__SHARP__")
                .split("#");

            for (idx = 0; idx < parts.length; idx ++) {
                functionBody += compilePart(parts[idx], idx % 2 === 0);
            }

            functionBody += useWithBlock ? ";}" : ";";

            functionBody += "return o;";

            functionBody = functionBody.replace(sharpRegExp, "#");

            try {
                return new Function(argumentName, functionBody);
            } catch(e) {
                throw new Error(kendo.format("Invalid template:'{0}' Generated code:'{1}'", template, functionBody));
            }
        }
    };

function pad(number, digits, end) {
    number = number + "";
    digits = digits || 2;
    end = digits - number.length;

    if (end) {
        return zeros[digits].substring(0, end) + number;
    }

    return number;
}

    //JSON stringify
(function() {
    var escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
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
        toString = {}.toString;

    if (typeof Date.prototype.toJSON !== FUNCTION) {

        Date.prototype.toJSON = function () {
            var that = this;

            return isFinite(that.valueOf()) ?
                pad(that.getUTCFullYear(), 4) + "-" +
                pad(that.getUTCMonth() + 1)   + "-" +
                pad(that.getUTCDate())        + "T" +
                pad(that.getUTCHours())       + ":" +
                pad(that.getUTCMinutes())     + ":" +
                pad(that.getUTCSeconds())     + "Z" : null;
        };

        String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function () {
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
                    if (Object.hasOwnProperty.call(value, k)) {
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
    var dateFormatRegExp = /dddd|ddd|dd|d|MMMM|MMM|MM|M|yyyy|yy|HH|H|hh|h|mm|m|fff|ff|f|tt|ss|s|"[^"]*"|'[^']*'/g,
        standardFormatRegExp =  /^(n|c|p|e)(\d*)$/i,
        literalRegExp = /["'].*?["']/g,
        commaRegExp = /\,/g,
        EMPTY = "",
        POINT = ".",
        COMMA = ",",
        SHARP = "#",
        ZERO = "0",
        PLACEHOLDER = "??",
        EN = "en-US";

    //cultures
    kendo.cultures = {"en-US" : {
        name: EN,
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
                AM: [ "AM", "am", "AM" ],
                PM: [ "PM", "pm", "PM" ],
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
                ":": ":",
                firstDay: 0
            }
        }
    }};


     function findCulture(culture) {
        if (culture) {
            if (culture.numberFormat) {
                return culture;
            }

            if (typeof culture === STRING) {
                var cultures = kendo.cultures;
                return cultures[culture] || cultures[culture.split("-")[0]] || null;
            }

            return null;
        }

        return null;
    }

    function getCulture(culture) {
        if (culture) {
            culture = findCulture(culture);
        }

        return culture || kendo.cultures.current;
    }

    kendo.culture = function(cultureName) {
        var cultures = kendo.cultures, culture;

        if (cultureName !== undefined) {
            culture = findCulture(cultureName) || cultures[EN];
            culture.calendar = culture.calendars.standard;
            cultures.current = culture;
        } else {
            return cultures.current;
        }
    };

    kendo.findCulture = findCulture;
    kendo.getCulture = getCulture;

    //set current culture to en-US.
    kendo.culture(EN);

    function formatDate(date, format, culture) {
        culture = getCulture(culture);

        var calendar = culture.calendars.standard,
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
                result = pad(date.getFullYear(), 4);
            } else if (match === "h" ) {
                result = date.getHours() % 12 || 12;
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
                result = date.getHours() < 12 ? calendar.AM[0] : calendar.PM[0];
            }

            return result !== undefined ? result : match.slice(1, match.length - 1);
        });
    }

    //number formatting
    function formatNumber(number, format, culture) {
        culture = getCulture(culture);

        var numberFormat = culture.numberFormat,
            groupSize = numberFormat.groupSize[0],
            groupSeparator = numberFormat[COMMA],
            decimal = numberFormat[POINT],
            precision = numberFormat.decimals,
            pattern = numberFormat.pattern[0],
            literals = [],
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
            hasGroup,
            hasNegativeFormat,
            decimalIndex,
            sharpIndex,
            zeroIndex,
            hasZero, hasSharp,
            percentIndex,
            currencyIndex,
            startZeroIndex,
            start = -1,
            end;

        //return empty string if no number
        if (number === undefined) {
            return EMPTY;
        }

        if (!isFinite(number)) {
            return number;
        }

        //if no format then return number.toString() or number.toLocaleString() if culture.name is not defined
        if (!format) {
            return culture.name.length ? number.toLocaleString() : number.toString();
        }

        formatAndPrecision = standardFormatRegExp.exec(format);

        // standard formatting
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
                return customPrecision ? number.toExponential(precision) : number.toExponential(); // toExponential() and toExponential(undefined) differ in FF #653438.
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

        //custom formatting
        //
        //separate format by sections.

        //make number positive
        if (negative) {
            number = -number;
        }

        format = format.split(";");
        if (negative && format[1]) {
            //get negative format
            format = format[1];
            hasNegativeFormat = true;
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

        if (format.indexOf("'") > -1 || format.indexOf("\"") > -1) {
            format = format.replace(literalRegExp, function(match) {
                literals.push(match);
                return PLACEHOLDER;
            });
        }

        percentIndex = format.indexOf("%");
        currencyIndex = format.indexOf("$");

        isPercent = percentIndex != -1;
        isCurrency = currencyIndex != -1;

        //multiply number if the format has percent
        if (isPercent) {
            if (format[percentIndex - 1] !== "\\") {
                number *= 100;
            } else {
                format = format.split("\\").join("");
            }
        }

        if (isCurrency && format[currencyIndex - 1] === "\\") {
            format = format.split("\\").join("");
            isCurrency = false;
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

        hasGroup = format.indexOf(COMMA) > -1;
        if (hasGroup) {
            format = format.replace(commaRegExp, EMPTY);
        }

        decimalIndex = format.indexOf(POINT);
        length = format.length;

        if (decimalIndex != -1) {
            zeroIndex = format.lastIndexOf(ZERO) - decimalIndex;
            sharpIndex = format.lastIndexOf(SHARP) - decimalIndex;
            fraction = number.toString().split(POINT)[1] || EMPTY;
            hasZero = zeroIndex > -1;
            hasSharp = sharpIndex > -1;
            idx = fraction.length;

            if (!hasZero && !hasSharp) {
                format = format.substring(0, decimalIndex) + format.substring(decimalIndex + 1);
                length = format.length;
                decimalIndex = -1;
                idx = 0;
            } if (hasZero && zeroIndex > sharpIndex) {
                idx = zeroIndex;
            } else if (sharpIndex > zeroIndex) {
                if (hasSharp && idx > sharpIndex) {
                    idx = sharpIndex;
                } else if (hasZero && idx < zeroIndex) {
                    idx = zeroIndex;
                }
            }

            if (idx > -1) {
                number = number.toFixed(idx);
            }
        } else {
            number = number.toFixed(0);
        }

        sharpIndex = format.indexOf(SHARP);
        startZeroIndex = zeroIndex = format.indexOf(ZERO);

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
            if (hasGroup) {
                if (integerLength === groupSize && integerLength < decimalIndex - startZeroIndex) {
                    integer = groupSeparator + integer;
                } else if (integerLength > groupSize) {
                    value = EMPTY;
                    for (idx = 0; idx < integerLength; idx++) {
                        if (idx > 0 && (integerLength - idx) % groupSize === 0) {
                            value += groupSeparator;
                        }
                        value += integer.charAt(idx);
                    }

                    integer = value;
                }
            }

            number = format.substring(0, start);

            if (negative && !hasNegativeFormat) {
                number += "-";
            }

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

            if (literals[0]) {
                length = literals.length;
                for (idx = 0; idx < length; idx++) {
                    number = number.replace(PLACEHOLDER, literals[idx]);
                }
            }
        }

        return number;
    }

    var toString = function(value, fmt, culture) {
        if (fmt) {
            if (value instanceof Date) {
                return formatDate(value, fmt, culture);
            } else if (typeof value === NUMBER) {
                return formatNumber(value, fmt, culture);
            }
        }

        return value !== undefined ? value : "";
    };

    if (globalize) {
        toString = proxy(globalize.format, globalize);
    }

    kendo.format = function(fmt) {
        var values = arguments;

        return fmt.replace(formatRegExp, function(match, index, placeholderFormat) {
            var value = values[parseInt(index, 10) + 1];

            return toString(value, placeholderFormat ? placeholderFormat.substring(1) : "");
        });
    };

    kendo._extractFormat = function (format) {
        if (format.slice(0,3) === "{0:") {
            format = format.slice(3, format.length - 1);
        }

        return format;
    };

    kendo.toString = toString;
    })();


(function() {
    var nonBreakingSpaceRegExp = /\u00A0/g,
        exponentRegExp = /[eE][\-+]?[0-9]+/,
        shortTimeZoneRegExp = /[+|\-]\d{1,2}/,
        longTimeZoneRegExp = /[+|\-]\d{1,2}:\d{2}/,
        dateRegExp = /^\/Date\((.*?)\)\/$/,
        formatsSequence = ["G", "g", "d", "F", "D", "y", "m", "T", "t"],
        numberRegExp = {
            2: /^\d{1,2}/,
            4: /^\d{4}/
        };

    function outOfRange(value, start, end) {
        return !(value >= start && value <= end);
    }

    function designatorPredicate(designator) {
        return designator.charAt(0);
    }

    function mapDesignators(designators) {
        return $.map(designators, designatorPredicate);
    }

    //if date's day is different than the typed one - adjust
    function adjustDate(date, hours) {
        if (!hours && date.getHours() === 23) {
            date.setHours(date.getHours() + 2);
        }
    }

    function parseExact(value, format, culture) {
        if (!value) {
            return null;
        }

        var lookAhead = function (match) {
                var i = 0;
                while (format[idx] === match) {
                    i++;
                    idx++;
                }
                if (i > 0) {
                    idx -= 1;
                }
                return i;
            },
            getNumber = function(size) {
                var rg = numberRegExp[size] || new RegExp('^\\d{1,' + size + '}'),
                    match = value.substr(valueIdx, size).match(rg);

                if (match) {
                    match = match[0];
                    valueIdx += match.length;
                    return parseInt(match, 10);
                }
                return null;
            },
            getIndexByName = function (names) {
                var i = 0,
                    length = names.length,
                    name, nameLength;

                for (; i < length; i++) {
                    name = names[i];
                    nameLength = name.length;

                    if (value.substr(valueIdx, nameLength) == name) {
                        valueIdx += nameLength;
                        return i + 1;
                    }
                }
                return null;
            },
            checkLiteral = function() {
                var result = false;
                if (value.charAt(valueIdx) === format[idx]) {
                    valueIdx++;
                    result = true;
                }
                return result;
            },
            calendar = culture.calendars.standard,
            year = null,
            month = null,
            day = null,
            hours = null,
            minutes = null,
            seconds = null,
            milliseconds = null,
            idx = 0,
            valueIdx = 0,
            literal = false,
            date = new Date(),
            shortYearCutOff = 30,
            defaultYear = date.getFullYear(),
            ch, count, length, pattern,
            pmHour, UTC, ISO8601, matches,
            amDesignators, pmDesignators,
            hoursOffset, minutesOffset,
            century;

        if (!format) {
            format = "d"; //shord date format
        }

        //if format is part of the patterns get real format
        pattern = calendar.patterns[format];
        if (pattern) {
            format = pattern;
        }

        format = format.split("");
        length = format.length;

        for (; idx < length; idx++) {
            ch = format[idx];

            if (literal) {
                if (ch === "'") {
                    literal = false;
                } else {
                    checkLiteral();
                }
            } else {
                if (ch === "d") {
                    count = lookAhead("d");
                    day = count < 3 ? getNumber(2) : getIndexByName(calendar.days[count == 3 ? "namesAbbr" : "names"]);

                    if (day === null || outOfRange(day, 1, 31)) {
                        return null;
                    }
                } else if (ch === "M") {
                    count = lookAhead("M");
                    month = count < 3 ? getNumber(2) : getIndexByName(calendar.months[count == 3 ? 'namesAbbr' : 'names']);

                    if (month === null || outOfRange(month, 1, 12)) {
                        return null;
                    }
                    month -= 1; //because month is zero based
                } else if (ch === "y") {
                    count = lookAhead("y");
                    year = getNumber(count);

                    if (year === null) {
                        return null;
                    }

                    if (count == 2) {
                        century = defaultYear - defaultYear % 100;
                        if (shortYearCutOff < year) {
                            century -= 100;
                        }
                        year = century + year;
                    }
                } else if (ch === "h" ) {
                    lookAhead("h");
                    hours = getNumber(2);
                    if (hours == 12) {
                        hours = 0;
                    }
                    if (hours === null || outOfRange(hours, 0, 11)) {
                        return null;
                    }
                } else if (ch === "H") {
                    lookAhead("H");
                    hours = getNumber(2);
                    if (hours === null || outOfRange(hours, 0, 23)) {
                        return null;
                    }
                } else if (ch === "m") {
                    lookAhead("m");
                    minutes = getNumber(2);
                    if (minutes === null || outOfRange(minutes, 0, 59)) {
                        return null;
                    }
                } else if (ch === "s") {
                    lookAhead("s");
                    seconds = getNumber(2);
                    if (seconds === null || outOfRange(seconds, 0, 59)) {
                        return null;
                    }
                } else if (ch === "f") {
                    count = lookAhead("f");
                    milliseconds = getNumber(count);

                    if (milliseconds !== null && count > 3) {
                        milliseconds = parseInt(milliseconds.toString().substring(0, 3), 10);
                    }

                    if (milliseconds === null || outOfRange(milliseconds, 0, 999)) {
                        return null;
                    }

                } else if (ch === "t") {
                    count = lookAhead("t");
                    amDesignators = calendar.AM;
                    pmDesignators = calendar.PM;

                    if (count === 1) {
                        amDesignators = mapDesignators(amDesignators);
                        pmDesignators = mapDesignators(pmDesignators);
                    }

                    pmHour = getIndexByName(pmDesignators);
                    if (!pmHour && !getIndexByName(amDesignators)) {
                        return null;
                    }
                }
                else if (ch === "z") {
                    UTC = true;
                    count = lookAhead("z");

                    if (value.substr(valueIdx, 1) === "Z") {
                        if (!ISO8601) {
                            return null;
                        }

                        checkLiteral();
                        continue;
                    }

                    matches = value.substr(valueIdx, 6)
                                   .match(count > 2 ? longTimeZoneRegExp : shortTimeZoneRegExp);

                    if (!matches) {
                        return null;
                    }

                    matches = matches[0];
                    valueIdx = matches.length;
                    matches = matches.split(":");

                    hoursOffset = parseInt(matches[0], 10);
                    if (outOfRange(hoursOffset, -12, 13)) {
                        return null;
                    }

                    if (count > 2) {
                        minutesOffset = parseInt(matches[1], 10);
                        if (isNaN(minutesOffset) || outOfRange(minutesOffset, 0, 59)) {
                            return null;
                        }
                    }
                } else if (ch === "T") {
                    ISO8601 = checkLiteral();
                } else if (ch === "'") {
                    literal = true;
                    checkLiteral();
                } else if (!checkLiteral()) {
                    return null;
                }
            }
        }

        if (year === null) {
            year = defaultYear;
        }

        if (pmHour && hours < 12) {
            hours += 12;
        }

        if (day === null) {
            day = 1;
        }

        if (UTC) {
            if (hoursOffset) {
                hours += -hoursOffset;
            }

            if (minutesOffset) {
                minutes += -minutesOffset;
            }

            value = new Date(Date.UTC(year, month, day, hours, minutes, seconds, milliseconds));
        } else {
            value = new Date(year, month, day, hours, minutes, seconds, milliseconds);
            adjustDate(value, hours);
        }

        if (year < 100) {
            value.setFullYear(year);
        }

        if (value.getDate() !== day && UTC === undefined) {
            return null;
        }

        return value;
    }

    kendo._adjustDate = adjustDate;

    kendo.parseDate = function(value, formats, culture) {
        if (value instanceof Date) {
            return value;
        }

        var idx = 0,
            date = null,
            length, patterns;

        if (value && value.indexOf("/D") === 0) {
            date = dateRegExp.exec(value);
            if (date) {
                return new Date(parseInt(date[1], 10));
            }
        }

        culture = kendo.getCulture(culture);

        if (!formats) {
            formats = [];
            patterns = culture.calendar.patterns;
            length = formatsSequence.length;

            for (; idx < length; idx++) {
                formats[idx] = patterns[formatsSequence[idx]];
            }
            formats[idx] = "ddd MMM dd yyyy HH:mm:ss";
            formats[++idx] = "yyyy-MM-ddTHH:mm:ss.fffffffzzz";
            formats[++idx] = "yyyy-MM-ddTHH:mm:ss.fffzzz";
            formats[++idx] = "yyyy-MM-ddTHH:mm:sszzz";
            formats[++idx] = "yyyy-MM-ddTHH:mmzzz";
            formats[++idx] = "yyyy-MM-ddTHH:mmzz";
            formats[++idx] = "yyyy-MM-ddTHH:mm:ss";
            formats[++idx] = "yyyy-MM-ddTHH:mm";
            formats[++idx] = "yyyy-MM-dd";

            idx = 0;
        }

        formats = isArray(formats) ? formats: [formats];
        length = formats.length;

        for (; idx < length; idx++) {
            date = parseExact(value, formats[idx], culture);
            if (date) {
                return date;
            }
        }

        return date;
    };

    kendo.parseInt = function(value, culture) {
        var result = kendo.parseFloat(value, culture);
        if (result) {
            result = result | 0;
        }
        return result;
    };

    kendo.parseFloat = function(value, culture, format) {
        if (!value && value !== 0) {
           return null;
        }

        if (typeof value === NUMBER) {
           return value;
        }

        value = value.toString();
        culture = kendo.getCulture(culture);

        var number = culture.numberFormat,
            percent = number.percent,
            currency = number.currency,
            symbol = currency.symbol,
            percentSymbol = percent.symbol,
            negative = value.indexOf("-") > -1,
            parts, isPercent;

        //handle exponential number
        if (exponentRegExp.test(value)) {
            value = parseFloat(value);
            if (isNaN(value)) {
                value = null;
            }
            return value;
        }

        if (value.indexOf(symbol) > -1 || (format && format.toLowerCase().indexOf("c") > -1)) {
            number = currency;
            parts = number.pattern[0].replace("$", symbol).split("n");
            if (value.indexOf(parts[0]) > -1 && value.indexOf(parts[1]) > -1) {
                value = value.replace(parts[0], "").replace(parts[1], "");
                negative = true;
            }
        } else if (value.indexOf(percentSymbol) > -1) {
            isPercent = true;
            number = percent;
            symbol = percentSymbol;
        }

        value = value.replace("-", "")
                     .replace(symbol, "")
                     .replace(nonBreakingSpaceRegExp, " ")
                     .split(number[","].replace(nonBreakingSpaceRegExp, " ")).join("")
                     .replace(number["."], ".");

        value = parseFloat(value);

        if (isNaN(value)) {
            value = null;
        } else if (negative) {
            value *= -1;
        }

        if (value && isPercent) {
            value /= 100;
        }

        return value;
    };

    if (globalize) {
        kendo.parseDate = function (value, format, culture) {
            if (value instanceof Date) {
                return value;
            }

            return globalize.parseDate(value, format, culture);
        };

        kendo.parseFloat = function (value, culture) {
            if (typeof value === NUMBER) {
                return value;
            }

            if (value === undefined) {
               return null;
            }

            return globalize.parseFloat(value, culture);
        };
    }
})();

    function wrap(element) {
        var browser = support.browser,
            percentage,
            isRtl = element.css("direction") == "rtl";

        if (!element.parent().hasClass("k-animation-container")) {
            var shadow = element.css(kendo.support.transitions.css + "box-shadow") || element.css("box-shadow"),
                radius = shadow ? shadow.match(boxShadowRegExp) || [ 0, 0, 0, 0, 0 ] : [ 0, 0, 0, 0, 0 ],
                blur = math.max((+radius[3]), +(radius[4] || 0)),
                left = (-radius[1]) + blur,
                right = (+radius[1]) + blur,
                bottom = (+radius[2]) + blur,
                width = element[0].style.width,
                height = element[0].style.height,
                percentWidth = percentRegExp.test(width),
                percentHeight = percentRegExp.test(height);

            if (browser.opera) { // Box shadow can't be retrieved in Opera
                left = right = bottom = 5;
            }

            percentage = percentWidth || percentHeight;

            if (!percentWidth) { width = element.outerWidth(); }
            if (!percentHeight) { height = element.outerHeight(); }

            element.wrap(
                         $("<div/>")
                         .addClass("k-animation-container")
                         .css({
                             width: width,
                             height: height,
                             marginLeft: left * (isRtl ? 1 : -1),
                             paddingLeft: left,
                             paddingRight: right,
                             paddingBottom: bottom
                         }));

            if (percentage) {
                element.css({
                    width: "100%",
                    height: "100%",
                    boxSizing: "border-box",
                    mozBoxSizing: "border-box",
                    webkitBoxSizing: "border-box"
                });
            }
        } else {
            var wrapper = element.parent(".k-animation-container"),
                wrapperStyle = wrapper[0].style;

            if (wrapper.is(":hidden")) {
                wrapper.show();
            }

            percentage = percentRegExp.test(wrapperStyle.width) || percentRegExp.test(wrapperStyle.height);

            if (!percentage) {
                wrapper.css({
                    width: element.outerWidth(),
                    height: element.outerHeight()
                });
            }
        }

        if (browser.msie && math.floor(browser.version) <= 7) {
            element.css({
                zoom: 1
            });
        }

        return element.parent();
    }

    function deepExtend(destination) {
        var i = 1,
            length = arguments.length;

        for (i = 1; i < length; i++) {
            deepExtendOne(destination, arguments[i]);
        }

        return destination;
    }

    function deepExtendOne(destination, source) {
        var ObservableArray = kendo.data.ObservableArray,
            property,
            propValue,
            propType,
            destProp;

        for (property in source) {
            propValue = source[property];
            propType = typeof propValue;
            if (propType === OBJECT && propValue !== null && propValue.constructor !== Array && propValue.constructor !== ObservableArray) {
                if (propValue instanceof Date) {
                    destination[property] = new Date(propValue.getTime());
                } else {
                    destProp = destination[property];
                    if (typeof (destProp) === OBJECT) {
                        destination[property] = destProp || {};
                    } else {
                        destination[property] = {};
                    }
                    deepExtendOne(destination[property], propValue);
                }
            } else if (propType !== UNDEFINED) {
                destination[property] = propValue;
            }
        }

        return destination;
    }

    function testRx(agent, rxs, dflt) {
        for (var rx in rxs) {
            if (rxs.hasOwnProperty(rx) && rxs[rx].test(agent)) {
                return rx;
            }
        }
        return dflt !== undefined ? dflt : agent;
    }

    function getComputedStyles(element, properties) {
        var styles = {}, computedStyle;

        if (document.defaultView && document.defaultView.getComputedStyle) {
            computedStyle = document.defaultView.getComputedStyle(element, "");

            if (properties) {
                $.each(properties, function(idx, value) {
                    styles[value] = computedStyle.getPropertyValue(value);
                });
            }
        } else {
            computedStyle = element.currentStyle;

            if (properties) {
                $.each(properties, function(idx, value) {
                    styles[value] = computedStyle[value.replace(/\-(\w)/g, function (strMatch, g1) { return g1.toUpperCase(); })];
                });
            }
        }

        if (!kendo.size(styles)) {
            styles = computedStyle;
        }

        return styles;
    }

    (function() {
        support.scrollbar = function() {
            var div = document.createElement("div"),
                result;

            div.style.cssText = "overflow:scroll;overflow-x:hidden;zoom:1;clear:both";
            div.innerHTML = "&nbsp;";
            document.body.appendChild(div);

            result = div.offsetWidth - div.scrollWidth;

            document.body.removeChild(div);
            return result;
        };

        support.isRtl = function(element) {
            return $(element).closest(".k-rtl").length > 0;
        };

        var table = document.createElement("table");

        // Internet Explorer does not support setting the innerHTML of TBODY and TABLE elements
        try {
            table.innerHTML = "<tr><td></td></tr>";

            support.tbodyInnerHtml = true;
        } catch (e) {
            support.tbodyInnerHtml = false;
        }

        support.touch = "ontouchstart" in window;
        support.pointers = navigator.msPointerEnabled;

        var transitions = support.transitions = false,
            transforms = support.transforms = false,
            elementProto = "HTMLElement" in window ? HTMLElement.prototype : [];

        support.hasHW3D = ("WebKitCSSMatrix" in window && "m11" in new window.WebKitCSSMatrix()) || "MozPerspective" in document.documentElement.style || "msPerspective" in document.documentElement.style;
        support.hasNativeScrolling = typeof document.documentElement.style.webkitOverflowScrolling == "string";

        each([ "Moz", "webkit", "O", "ms" ], function () {
            var prefix = this.toString(),
                hasTransitions = typeof table.style[prefix + "Transition"] === STRING;

            if (hasTransitions || typeof table.style[prefix + "Transform"] === STRING) {
                var lowPrefix = prefix.toLowerCase();

                transforms = {
                    css: "-" + lowPrefix + "-",
                    prefix: prefix,
                    event: (lowPrefix === "o" || lowPrefix === "webkit") ? lowPrefix : ""
                };

                if (hasTransitions) {
                    transitions = transforms;
                    transitions.event = transitions.event ? transitions.event + "TransitionEnd" : "transitionend";
                }

                return false;
            }
        });

        support.transforms = transforms;
        support.transitions = transitions;

        support.devicePixelRatio = window.devicePixelRatio === undefined ? 1 : window.devicePixelRatio;
        support.screenWidth = window.outerWidth || window.screen ? window.screen.availWidth : window.innerWidth;
        support.screenHeight = window.outerHeight || window.screen ? window.screen.availHeight : window.innerHeight;

        support.detectOS = function (ua) {
            var os = false, minorVersion, match = [],
                notAndroidPhone = !/mobile safari/i.test(ua),
                agentRxs = {
                    fire: /(Silk)\/(\d+)\.(\d+(\.\d+)?)/,
                    android: /(Android|Android.*(?:Opera|Firefox).*?\/)\s*(\d+)\.(\d+(\.\d+)?)/,
                    iphone: /(iPhone|iPod).*OS\s+(\d+)[\._]([\d\._]+)/,
                    ipad: /(iPad).*OS\s+(\d+)[\._]([\d_]+)/,
                    meego: /(MeeGo).+NokiaBrowser\/(\d+)\.([\d\._]+)/,
                    webos: /(webOS)\/(\d+)\.(\d+(\.\d+)?)/,
                    blackberry: /(BlackBerry|BB10).*?Version\/(\d+)\.(\d+(\.\d+)?)/,
                    playbook: /(PlayBook).*?Tablet\s*OS\s*(\d+)\.(\d+(\.\d+)?)/,
                    wp: /(Windows Phone(?: OS)?)\s(\d+)\.(\d+(\.\d+)?)/,
                    windows: /(MSIE)\s+(\d+)\.(\d+(\.\d+)?)/
                },
                osRxs = {
                    ios: /^i(phone|pad|pod)$/i,
                    android: /^android|fire$/i,
                    blackberry: /^blackberry|playbook/i,
                    windows: /windows/,
                    wp: /wp/
                },
                formFactorRxs = {
                    tablet: /playbook|ipad|fire/i
                },
                browserRxs = {
                    omini: /Opera\sMini/i,
                    omobile: /Opera\sMobi/i,
                    firefox: /Firefox|Fennec/i,
                    mobilesafari: /version\/.*safari/i,
                    chrome: /chrome/i,
                    webkit: /webkit/i,
                    ie: /MSIE|Windows\sPhone/i
                };

            for (var agent in agentRxs) {
                if (agentRxs.hasOwnProperty(agent)) {
                    match = ua.match(agentRxs[agent]);
                    if (match) {
                        if (agent == "windows" && "plugins" in navigator) { return false; } // Break if not Metro/Mobile Windows

                        os = {};
                        os.device = agent;
                        os.tablet = testRx(agent, formFactorRxs, false);
                        os.browser = testRx(ua, browserRxs, "default");
                        os.name = testRx(agent, osRxs);
                        os[os.name] = true;
                        os.majorVersion = match[2];
                        os.minorVersion = match[3].replace("_", ".");
                        minorVersion = os.minorVersion.replace(".", "").substr(0, 2);
                        os.flatVersion = os.majorVersion + minorVersion + (new Array(3 - (minorVersion.length < 3 ? minorVersion.length : 2)).join("0"));
                        os.appMode = window.navigator.standalone || (/file|local/).test(window.location.protocol) || typeof window.PhoneGap !== UNDEFINED || typeof window.cordova !== UNDEFINED; // Use file protocol to detect appModes.

                        if (os.android && (support.devicePixelRatio < 1.5 && os.flatVersion < 400 || notAndroidPhone) && (support.screenWidth > 800 || support.screenHeight > 800)) {
                            os.tablet = agent;
                        }

                        break;
                    }
                }
            }
            return os;
        };

        support.mobileOS = support.detectOS(navigator.userAgent);

        support.kineticScrollNeeded = support.mobileOS && support.touch;

        support.mouseAndTouchPresent = support.touch && !(support.mobileOS.ios || support.mobileOS.android);

        function detectBrowser(ua) {
            var browser = false, match = [],
                browserRxs = {
                    webkit: /(chrome)[ \/]([\w.]+)/i,
                    safari: /(webkit)[ \/]([\w.]+)/i,
                    opera: /(opera)(?:.*version|)[ \/]([\w.]+)/i,
                    msie: /(msie) ([\w.]+)/i,
                    mozilla: /(mozilla)(?:.*? rv:([\w.]+)|)/i
                };

            for (var agent in browserRxs) {
                if (browserRxs.hasOwnProperty(agent)) {
                    match = ua.match(browserRxs[agent]);
                    if (match) {
                        browser = {};
                        browser[agent] = true;
                        browser[match[1].toLowerCase()] = true;
                        browser.version = match[2];

                        break;
                    }
                }
            }
            return browser;
        }

        support.browser = detectBrowser(navigator.userAgent);

        (function(browser) {
            // add browser-specific CSS class
            var cssClass,
                version = "" + browser.version,
                majorVersion = version.substring(0, version.indexOf("."));

            if (browser.msie) {
                cssClass = "ie";
            } else if (browser.mozilla) {
                cssClass = "ff";
            } else if (browser.safari) {
                cssClass = "safari";
            } else if (browser.webkit) {
                cssClass = "webkit";
            } else if (browser.opera) {
                cssClass = "opera";
            }

            if (cssClass) {
                $(document.documentElement).addClass("k-" + cssClass + " k-" + cssClass + majorVersion);
            }
        })(support.browser);

        support.zoomLevel = function() {
            return support.touch ? (document.documentElement.clientWidth / window.innerWidth) : 1;
        };

        support.eventCapture = document.documentElement.addEventListener;

        support.placeholder = "placeholder" in document.createElement("input");
        support.stableSort = (function() {
            var sorted = [0,1,2,3,4,5,6,7,8,9,10,11,12].sort(function() { return 0; } );
            return sorted[0] === 0 && sorted[1] === 1 && sorted[2] === 2 && sorted[3] === 3 && sorted[4] === 4 &&
                sorted[5] === 5 && sorted[6] === 6 && sorted[7] === 7 && sorted[8] === 8 &&
                sorted[9] === 9 && sorted[10] === 10 && sorted[11] === 11 && sorted[12] === 12;
        })();

        support.matchesSelector = elementProto.webkitMatchesSelector || elementProto.mozMatchesSelector ||
                                  elementProto.msMatchesSelector || elementProto.oMatchesSelector || elementProto.matchesSelector ||
          function( selector ) {
              var nodeList = document.querySelectorAll ? ( this.parentNode || document ).querySelectorAll( selector ) || [] : $(selector),
                  i = nodeList.length;

              while (i--) {
                  if (nodeList[i] == this) {
                      return true;
                  }
              }

              return false;
          };
    })();


    function size(obj) {
        var result = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key) && key != "toJSON") { // Ignore fake IE7 toJSON.
                result++;
            }
        }

        return result;
    }

    function isNodeEmpty(element) {
        return $.trim($(element).contents().filter(function () { return this.nodeType != 8; }).html()) === "";
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
        top: { reverse: "bottom" },
        bottom: { reverse: "top" },
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

    function fx(element) {
        return new kendo.fx.Element(element);
    }

    $.extend(fx, {
        Element: function(element) {
            this.element = $(element);
        },

        promise: function (element, options) {
            if (!element.is(":visible")) {
                element.css({ display: element.data("olddisplay") || "block" }).css("display");
            }

            if (options.hide) {
                element.data("olddisplay", element.css("display")).hide();
            }

            if (options.init) {
                options.init();
            }

            if (options.completeCallback) {
                options.completeCallback(element); // call the external complete callback with the element
            }

            element.dequeue();
        },

        transitionPromise: function(element, destination, options) {
            var container = kendo.wrap(element);
            container.append(destination);

            element.hide();
            destination.show();

            if (options.completeCallback) {
                options.completeCallback(element); // call the external complete callback with the element
            }

            return element;
        }
    });

    function prepareAnimationOptions(options, duration, reverse, complete) {
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

        return extend({
            //default options
            effects: {},
            duration: 400, //jQuery default duration
            reverse: false,
            init: noop,
            teardown: noop,
            hide: false
        }, options, { completeCallback: options.complete, complete: noop }); // Move external complete callback, so deferred.resolve can be always executed.

    }

    function animate(element, options, duration, reverse, complete) {
        var idx = 0,
            length = element.length,
            instance;

        for (; idx < length; idx ++) {
            instance = $(element[idx]);
            instance.queue(function() {
                fx.promise(instance, prepareAnimationOptions(options, duration, reverse, complete));
            });
        }

        return element;
    }

    function animateTo(element, destination, options, duration, reverse, complete) {
        return fx.transitionPromise(element, destination, prepareAnimationOptions(options, duration, reverse, complete));
    }

    function toggleClass(element, classes, options, add) {
        if (classes) {
            classes = classes.split(" ");

            each(classes, function(idx, value) {
                element.toggleClass(value, add);
            });
        }

        return element;
    }

    if (!("kendoAnimate" in $.fn)) {
        extend($.fn, {
            kendoStop: function(clearQueue, gotoEnd) {
                return this.stop(clearQueue, gotoEnd);
            },

            kendoAnimate: function(options, duration, reverse, complete) {
                return animate(this, options, duration, reverse, complete);
            },

            kendoAnimateTo: function(destination, options, duration, reverse, complete) {
                return animateTo(this, destination, options, duration, reverse, complete);
            },

            kendoAddClass: function(classes, options){
                return kendo.toggleClass(this, classes, options, true);
            },
            kendoRemoveClass: function(classes, options){
                return kendo.toggleClass(this, classes, options, false);
            },
            kendoToggleClass: function(classes, options, toggle){
                return kendo.toggleClass(this, classes, options, toggle);
            }
        });
    }

    var ampRegExp = /&/g,
        ltRegExp = /</g,
        gtRegExp = />/g;
    function htmlEncode(value) {
        return ("" + value).replace(ampRegExp, "&amp;").replace(ltRegExp, "&lt;").replace(gtRegExp, "&gt;");
    }

    var touchLocation = function(e) {
        var originalEvent = typeof e.pageX == UNDEFINED ? e.originalEvent : e;
        return {
            idx: support.pointers ? originalEvent.pointerId : 0,
            x: originalEvent.pageX,
            y: originalEvent.pageY
        };
    };

    var eventTarget = function (e) {
        return e.target;
    };

    if (support.touch) {

        var mobileChrome = (support.mobileOS.browser == "chrome" && !support.mobileOS.ios);

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
            var touches = "originalEvent" in e ? e.originalEvent.changedTouches : "changedTouches" in e ? e.changedTouches : null,
                property = mobileChrome ? "screen" : "client";

            return touches ? document.elementFromPoint(touches[0][property + "X"], touches[0][property + "Y"]) : e.target;
        };

        each(["swipe", "swipeLeft", "swipeRight", "swipeUp", "swipeDown", "doubleTap", "tap"], function(m, value) {
            $.fn[value] = function(callback) {
                return this.bind(value, callback);
            };
        });
    }

    if (support.touch) {
        if (!support.mobileOS) {
            support.mousedown = "mousedown touchstart";
            support.mouseup = "mouseup touchend";
            support.mousemove = "mousemove touchmove";
            support.mousecancel = "mouseleave touchcancel";
            support.click = "click";
            support.resize = "resize";
        } else {
            support.mousedown = "touchstart";
            support.mouseup = "touchend";
            support.mousemove = "touchmove";
            support.mousecancel = "touchcancel";
            support.click = "touchend";
            support.resize = "orientationchange";
        }
    } else if (support.pointers) {
        support.mousemove = "MSPointerMove";
        support.mousedown = "MSPointerDown";
        support.mouseup = "MSPointerUp";
        support.mousecancel = "MSPointerCancel";
        support.click = "MSPointerUp";
        support.resize = "orientationchange resize";
    } else {
        support.mousemove = "mousemove";
        support.mousedown = "mousedown";
        support.mouseup = "mouseup";
        support.mousecancel = "mouseleave";
        support.click = "click";
        support.resize = "resize";
    }

    var wrapExpression = function(members, paramName) {
        var result = paramName || "d",
            index,
            idx,
            length,
            member,
            count = 1;

        for (idx = 0, length = members.length; idx < length; idx++) {
            member = members[idx];
            if (member !== "") {
                index = member.indexOf("[");

                if (index !== 0) {
                    if (index == -1) {
                        member = "." + member;
                    } else {
                        count++;
                        member = "." + member.substring(0, index) + " || {})" + member.substring(index);
                    }
                }

                count++;
                result += member + ((idx < length - 1) ? " || {})" : ")");
            }
        }
        return new Array(count).join("(") + result;
    },
    localUrlRe = /^([a-z]+:)?\/\//i;

    extend(kendo, {
        ui: kendo.ui || {},
        fx: kendo.fx || fx,
        mobile: kendo.mobile || {},
        data: kendo.data || {},
        dataviz: kendo.dataviz || {ui: { roles: {}}},
        keys: {
            INSERT: 45,
            DELETE: 46,
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
            PAGEDOWN: 34,
            F2: 113,
            F10: 121,
            F12: 123
        },
        support: kendo.support || support,
        animate: kendo.animate || animate,
        ns: "",
        attr: function(value) {
            return "data-" + kendo.ns + value;
        },
        wrap: wrap,
        deepExtend: deepExtend,
        getComputedStyles: getComputedStyles,
        size: size,
        isNodeEmpty: isNodeEmpty,
        getOffset: kendo.getOffset || getOffset,
        parseEffects: kendo.parseEffects || parseEffects,
        toggleClass: kendo.toggleClass || toggleClass,
        directions: kendo.directions || directions,
        Observable: Observable,
        Class: Class,
        Template: Template,
        template: proxy(Template.compile, Template),
        render: proxy(Template.render, Template),
        stringify: proxy(JSON.stringify, JSON),
        touchLocation: touchLocation,
        eventTarget: eventTarget,
        htmlEncode: htmlEncode,
        isLocalUrl: function(url) {
            return url && !localUrlRe.test(url);
        },

        expr: function(expression, safe, paramName) {
            expression = expression || "";

            if (typeof safe == STRING) {
                paramName = safe;
                safe = false;
            }

            paramName = paramName || "d";

            if (expression && expression.charAt(0) !== "[") {
                expression = "." + expression;
            }

            if (safe) {
                expression = wrapExpression(expression.split("."), paramName);
            } else {
                expression = paramName + expression;
            }

            return expression;
        },

        getter: function(expression, safe) {
            return getterCache[expression] = getterCache[expression] || new Function("d", "return " + kendo.expr(expression, safe));
        },

        setter: function(expression) {
            return setterCache[expression] = setterCache[expression] || new Function("d,value", kendo.expr(expression) + "=value");
        },

        accessor: function(expression) {
            return {
                get: kendo.getter(expression),
                set: kendo.setter(expression)
            };
        },

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
        },

        roleSelector: function(role) {
            return role.replace(/(\S+)/g, "[" + kendo.attr("role") + "=$1],").slice(0, -1);
        },


        logToConsole: function(message) {
            var console = window.console;

            if (typeof(console) != "undefined" && console.log) {
                console.log(message);
            }
        }
    });

    var Widget = Observable.extend( {
        init: function(element, options) {
            var that = this;

            that.element = kendo.jQuery(element).handler(that);

            Observable.fn.init.call(that);

            options = that.options = extend(true, {}, that.options, options);

            if (!that.element.attr(kendo.attr("role"))) {
                that.element.attr(kendo.attr("role"), (options.name || "").toLowerCase());
            }

            that.element.data("kendo" + options.prefix + options.name, that);

            that.bind(that.events, options);
        },

        events: [],

        options: {
            prefix: ""
        },

        _tabindex: function(target) {
            target = target || this.wrapper;

            var element = this.element,
                TABINDEX = "tabindex",
                tabindex = target.attr(TABINDEX) || element.attr(TABINDEX);

            element.removeAttr(TABINDEX);

            target.attr(TABINDEX, !isNaN(tabindex) ? tabindex : 0);
        },

        setOptions: function(options) {
            var that = this,
                idx = 0,
                length = that.events.length,
                e;

            for (; idx < length; idx ++) {
                e = that.events[idx];
                if (that.options[e] && options[e]) {
                    that.unbind(e, that.options[e]);
                }
            }

            $.extend(that.options, options);
            that.bind(that.events, options);
        },

        destroy: function() {
            var that = this;

            that.element.removeData("kendo" + that.options.prefix + that.options.name);

            that.unbind();
        }
    });

    kendo.notify = noop;

    var templateRegExp = /template$/i,
        jsonRegExp = /^\s*(?:\{(?:.|\r\n|\n)*\}|\[(?:.|\r\n|\n)*\])\s*$/,
        jsonFormatRegExp = /^\{(\d+)(:[^\}]+)?\}/,
        dashRegExp = /([A-Z])/g;

    function parseOption(element, option) {
        var value;

        if (option.indexOf("data") === 0) {
            option = option.substring(4);
            option = option.charAt(0).toLowerCase() + option.substring(1);
        }

        option = option.replace(dashRegExp, "-$1");
        value = element.getAttribute("data-" + kendo.ns + option);

        if (value === null) {
            value = undefined;
        } else if (value === "null") {
            value = null;
        } else if (value === "true") {
            value = true;
        } else if (value === "false") {
            value = false;
        } else if (!isNaN(parseFloat(value))) {
            value = parseFloat(value);
        } else if (jsonRegExp.test(value) && !jsonFormatRegExp.test(value)) {
            value = evil("(" + value + ")");
        }

        return value;
    }

    function parseOptions(element, options) {
        var result = {},
            option,
            value;

        for (option in options) {
            value = parseOption(element, option);

            if (value !== undefined) {

                if (templateRegExp.test(option)) {
                    value = kendo.template($("#" + value).html());
                }

                result[option] = value;
            }
        }

        return result;
    }

    kendo.initWidget = function(element, options, roles) {
        var result,
            option,
            widget,
            idx,
            length,
            role,
            value,
            dataSource;

        // Preserve backwards compatibility with (element, options, namespace) signature, where namespace was kendo.ui
        if (!roles) {
            roles = kendo.ui.roles;
        } else if (roles.roles) {
            roles = roles.roles;
        }

        element = element.nodeType ? element : element[0];

        role = element.getAttribute("data-" + kendo.ns + "role");

        if (!role) {
            return;
        }

        if (role.indexOf(".") === -1) {
            widget = roles[role];
        } else { // full namespace path - like kendo.ui.Widget
            widget = kendo.getter(role)(window);
        }

        if (!widget) {
            return;
        }

        dataSource = parseOption(element, "dataSource");

        options = $.extend({}, parseOptions(element, widget.fn.options), options);

        if (dataSource) {
            if (typeof dataSource === STRING) {
                options.dataSource = kendo.getter(dataSource)(window);
            } else {
                options.dataSource = dataSource;
            }
        }

        for (idx = 0, length = widget.fn.events.length; idx < length; idx++) {
            option = widget.fn.events[idx];

            value = parseOption(element, option);

            if (value !== undefined) {
                options[option] = kendo.getter(value)(window);
            }
        }

        result = $(element).data("kendo" + widget.fn.options.prefix + widget.fn.options.name);

        if (!result) {
            result = new widget(element, options);
        } else {
            result.setOptions(options);
        }

        return result;
    };

    kendo.rolesFromNamespaces = function(namespaces) {
        var roles = [],
            idx,
            length;

        if (!namespaces[0]) {
            namespaces = [kendo.ui, kendo.dataviz.ui];
        }

        for (idx = 0, length = namespaces.length; idx < length; idx ++) {
            roles[idx] = namespaces[idx].roles;
        }

        return extend.apply(null, [{}].concat(roles.reverse()));
    };

    kendo.init = function(element) {
        var roles = kendo.rolesFromNamespaces(slice.call(arguments, 1));

        $(element).find("[data-" + kendo.ns + "role]").andSelf().each(function(){
            kendo.initWidget(this, {}, roles);
        });
    };

    kendo.destroy = function(element) {
        $(element).find("[data-" + kendo.ns + "role]").andSelf().each(function(){
            var element = $(this),
                widget = kendo.widgetInstance(element, kendo.ui) ||
                         kendo.widgetInstance(element, kendo.mobile.ui) ||
                         kendo.widgetInstance(element, kendo.dataviz.ui);

            if (widget) {
                widget.destroy();
            }
        });
    };

    kendo.parseOptions = parseOptions;

    extend(kendo.ui, {
        Widget: Widget,
        roles: {},
        progress: function(container, toggle) {
            var mask = container.find(".k-loading-mask");

            if (toggle) {
                if (!mask.length) {
                    mask = $("<div class='k-loading-mask'><span class='k-loading-text'>Loading...</span><div class='k-loading-image'/><div class='k-loading-color'/></div>")
                        .width("100%").height("100%")
                        .prependTo(container)
                        .css({ top: container.scrollTop(), left: container.scrollLeft() });
                }
            } else if (mask) {
                mask.remove();
            }
        },
        plugin: function(widget, register, prefix) {
            var name = widget.fn.options.name,
                getter;

            register = register || kendo.ui;
            prefix = prefix || "";

            register[name] = widget;

            register.roles[name.toLowerCase()] = widget;

            getter = "getKendo" + prefix + name;
            name = "kendo" + prefix + name;

            $.fn[name] = function(options) {
                var value = this,
                    args;

                if (typeof options === STRING) {
                    args = slice.call(arguments, 1);

                    this.each(function(){
                        var widget = $.data(this, name),
                            method,
                            result;

                        if (!widget) {
                            throw new Error(kendo.format("Cannot call method '{0}' of {1} before it is initialized", options, name));
                        }

                        method = widget[options];

                        if (typeof method !== FUNCTION) {
                            throw new Error(kendo.format("Cannot find method '{0}' of {1}", options, name));
                        }

                        result = method.apply(widget, args);

                        if (result !== undefined) {
                            value = result;
                            return false;
                        }
                    });
                } else {
                    this.each(function() {
                        new widget(this, options);
                    });
                }

                return value;
            };

            $.fn[getter] = function() {
                return this.data(name);
            };
        }
    });

    var ContainerNullObject = { bind: $.noop };

    var MobileWidget = Widget.extend({
        init: function(element, options) {
            Widget.fn.init.call(this, element, options);
            this.element.autoApplyNS();
            this.wrapper = this.element;
        },

        destroy: function() {
            Widget.fn.destroy.call(this);
            this.element.kendoDestroy();
        },

        options: {
            prefix: "Mobile"
        },

        events: [],

        view: function() {
            var viewElement = this.element.closest(kendo.roleSelector("view splitview modalview"));
            return kendo.widgetInstance(viewElement, kendo.mobile.ui);
        },

        container: function() {
            var element = this.element.closest(kendo.roleSelector("view layout modalview"));
            return kendo.widgetInstance(element, kendo.mobile.ui) || ContainerNullObject;
        }
    });

    extend(kendo.mobile, {
        init: function(element) {
            kendo.init(element, kendo.mobile.ui, kendo.ui, kendo.dataviz.ui);
        },

        ui: {
            Widget: MobileWidget,
            roles: {},
            plugin: function(widget) {
                kendo.ui.plugin(widget, kendo.mobile.ui, "Mobile");
            }
        }
    });

    kendo.touchScroller = function(elements, options) {
        // return the first touch scroller
        return $(elements).map(function(idx, element) {
            element = $(element);
            if (support.kineticScrollNeeded && kendo.mobile.ui.Scroller && !element.data("kendoMobileScroller")) {
                element.kendoMobileScroller(options);
                return element.data("kendoMobileScroller");
            } else {
                return false;
            }
        })[0];
    };

    kendo.preventDefault = function(e) {
        e.preventDefault();
    };

    kendo.widgetInstance = function(element, suite) {
        var widget = suite.roles[element.data(kendo.ns + "role")];

        if (widget) {
            return element.data("kendo" + widget.fn.options.prefix + widget.fn.options.name);
        }
    };

    kendo.onResize = function(callback) {
        var handler = callback;
        if (support.mobileOS.android) {
            handler = function() { setTimeout(callback, 200); };
        }

        $(window).on(support.resize, handler);
    };

    kendo.attrValue = function(element, key) {
        return element.data(kendo.ns + key);
    };

    kendo.days = {
        Sunday: 0,
        Monday: 1,
        Tuesday: 2,
        Wednesday: 3,
        Thursday: 4,
        Friday: 5,
        Saturday: 6
    };

    function focusable(element, isTabIndexNotNaN) {
        var nodeName = element.nodeName.toLowerCase();

        return (/input|select|textarea|button|object/.test(nodeName) ?
                !element.disabled :
                "a" === nodeName ?
                element.href || isTabIndexNotNaN :
                isTabIndexNotNaN
               ) &&
            visible(element);
    }

    function visible(element) {
        return !$(element).parents().andSelf().filter(function() {
            return $.css(this,"visibility") === "hidden" || $.expr.filters.hidden(this);
        }).length;
    }

    $.extend($.expr[ ":" ], {
        focusable: function(element) {
            var idx = $.attr(element, "tabindex");
            return focusable(element, !isNaN(idx) && idx > -1);
        }
    });

    var MOUSE_EVENTS = ["mousedown", "mousemove", "mouseenter", "mouseleave", "mouseover", "mouseout", "mouseup", "click"];
    var EXCLUDE_BUST_CLICK_SELECTOR = "label, input, [data-rel=external]";

    var MouseEventNormalizer = {
        setupMouseMute: function() {
            var idx = 0,
                length = MOUSE_EVENTS.length,
                element = document.documentElement;

            if (MouseEventNormalizer.mouseTrap || !support.eventCapture) {
                return;
            }

            MouseEventNormalizer.mouseTrap = true;

            MouseEventNormalizer.bustClick = false;
            MouseEventNormalizer.captureMouse = false;

            var handler = function(e) {
                if (MouseEventNormalizer.captureMouse) {
                    if (e.type === "click") {
                        if (MouseEventNormalizer.bustClick && !$(e.target).is(EXCLUDE_BUST_CLICK_SELECTOR)) {
                            e.preventDefault();
                            e.stopPropagation();
                        }
                    } else {
                        e.stopPropagation();
                    }
                }
            };

            for (; idx < length; idx++) {
                element.addEventListener(MOUSE_EVENTS[idx], handler, true);
            }
        },

        muteMouse: function(e) {
            MouseEventNormalizer.captureMouse = true;
            if (e.data.bustClick) {
                MouseEventNormalizer.bustClick = true;
            }
            clearTimeout(MouseEventNormalizer.mouseTrapTimeoutID);
        },

        unMuteMouse: function() {
            clearTimeout(MouseEventNormalizer.mouseTrapTimeoutID);
            MouseEventNormalizer.mouseTrapTimeoutID = setTimeout(function() {
                MouseEventNormalizer.captureMouse = false;
                MouseEventNormalizer.bustClick = false;
            }, 400);
        }
    };

    var eventMap = {
        down: "touchstart mousedown",
        move: "mousemove touchmove",
        up: "mouseup touchend touchcancel",
        cancel: "mouseleave touchcancel"
    };

    if (support.touch && (support.mobileOS.ios || support.mobileOS.android)) {
        eventMap = {
            down: "touchstart",
            move: "touchmove",
            up: "touchend touchcancel",
            cancel: "touchcancel"
        };
    }

    if (support.pointers) {
        eventMap = {
            down: "MSPointerDown",
            move: "MSPointerMove",
            up: "MSPointerUp",
            cancel: "MSPointerCancel MSPointerLeave"
        };

        // Create MSPointerEnter/MSPointerLeave events using mouseover/out and event-time checks
        jQuery.each({
            MSPointerEnter: "MSPointerOver",
            MSPointerLeave: "MSPointerOut"
        }, function( orig, fix ) {
            jQuery.event.special[ orig ] = {
                delegateType: fix,
                bindType: fix,

                handle: function( event ) {
                    var ret,
                        target = this,
                        related = event.relatedTarget,
                        handleObj = event.handleObj;

                    // For mousenter/leave call the handler if related is outside the target.
                    // NB: No relatedTarget if the mouse left/entered the browser window
                    if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
                        event.type = handleObj.origType;
                        ret = handleObj.handler.apply( this, arguments );
                        event.type = fix;
                    }
                    return ret;
                }
            };
        });
    }


    var getEventMap = function(e) { return (eventMap[e] || e); },
        eventRegEx = /([^ ]+)/g;

    kendo.applyEventMap = function(events, ns) {
        events = events.replace(eventRegEx, getEventMap);

        if (ns) {
            events = events.replace(eventRegEx, "$1." + ns);
        }

        return events;
    };

    var on = $.fn.on;

    function kendoJQuery(selector, context) {
        return new kendoJQuery.fn.init(selector, context);
    }

    extend(true, kendoJQuery, $);

    kendoJQuery.fn = kendoJQuery.prototype = new $();

    kendoJQuery.fn.constructor = kendoJQuery;

    kendoJQuery.fn.init = function(selector, context) {
        if (context && context instanceof $ && !(context instanceof kendoJQuery)) {
            context = kendoJQuery(context);
        }

        return $.fn.init.call(this, selector, context, rootjQuery);
    };

    kendoJQuery.fn.init.prototype = kendoJQuery.fn;

    var rootjQuery = kendoJQuery(document);

    extend(kendoJQuery.fn, {
        handler: function(handler) {
            this.data("handler", handler);
            return this;
        },

        autoApplyNS: function(ns) {
            this.data("kendoNS", ns || kendo.guid());
            return this;
        },

        on: function() {
            var that = this,
                ns = that.data("kendoNS");

            // support for event map signature
            if (arguments.length === 1) {
                return on.call(that, arguments[0]);
            }

            var context = that,
                args = slice.call(arguments);

            if (typeof args[args.length -1] === UNDEFINED) {
                args.pop();
            }

            var callback =  args[args.length - 1],
                events = kendo.applyEventMap(args[0], ns);

            // setup mouse trap
            if (support.mouseAndTouchPresent && events.search(/mouse|click/) > -1 && this[0] !== document.documentElement) {
                MouseEventNormalizer.setupMouseMute();

                var selector = args.length === 2 ? null : args[1],
                    bustClick = events.indexOf("click") > -1 && events.indexOf("touchend") > -1;

                on.call(this,
                    {
                        touchstart: MouseEventNormalizer.muteMouse,
                        touchend: MouseEventNormalizer.unMuteMouse
                    },
                    selector,
                    {
                        bustClick: bustClick
                    });
            }

            if (typeof callback === STRING) {
                context = that.data("handler");
                callback = context[callback];

                args[args.length - 1] = function(e) {
                    callback.call(context, e);
                };
            }

            args[0] = events;

            on.apply(that, args);

            return that;
        },

        kendoDestroy: function(ns) {
            ns = ns || this.data("kendoNS");

            if (ns) {
                this.off("." + ns);
            }

            return this;
        }
    });

    kendo.jQuery = kendoJQuery;
    kendo.eventMap = eventMap;
})(jQuery, eval);

/*global kendo_module:true */
if (typeof kendo_module === "undefined") {
    kendo_module = function(){};
}

kendo_module({
    id: "core",
    name: "Core",
    category: "framework",
    description: "The core of the Kendo framework."
});
