;(function($, window) {
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
        Template,
        JSON = JSON || {},
        support = {},
        FUNCTION = "function",
        STRING = "string",
        NUMBER = "number",
        OBJECT = "object",
        NULL = "null",
        BOOLEAN = "boolean";

    function Event() {
        this._isPrevented = false;
    }

    Event.prototype = {
        preventDefault: function() {
            this._isPrevented = true;
        },
        isDefaultPrevented: function() {
            return this._isPrevented;
        }
    };

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
                events;

            for (idx = 0, length = eventNames.length; idx < length; idx++) {
                eventName = eventNames[idx];

                handler = isFunction(handlers) ? handlers : handlers[eventName];

                if (handler) {
                    events = that._events[eventName] || []
                    events.push(handler);
                    that._events[eventName] = events;
                }
            }

            return that;
        },

        trigger: function(eventName, parameter) {
            var that = this,
                events = that._events[eventName],
                args = extend(parameter, new Event()),
                idx,
                length;

            if (events) {
                for (idx = 0, length = events.length; idx < length; idx++) {
                    events[idx].call(that, args);
                }
            }

            return args.isDefaultPrevented();
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
                functionBody = "var o='',e = kendo.htmlEncode;",
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

            functionBody += "o+='";

            functionBody += template.replace(/[\r\t\n]/g, " ")
                .replace(quoteRegExp,"\t")
                .split("'").join("\\'")
                .split("\t").join("'")
                .replace(encodeRegExp, "';o+=e($1);o+='")
                .replace(evalRegExp, "';o+=$1;o+='")
                .split(begin).join("';")
                .split(end).join("o+='");

            functionBody += useWithBlock ? "'}" : "';";

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
    var culture =   {
        days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        abbrDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        shortestDays: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        abbrMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        longTime: "h:mm:ss tt",
        longDate: "dddd, MMMM dd, yyyy",
        shortDate: "M/d/yyyy",
        shortTime: "h:mm tt",
        fullDateTime: "dddd, MMMM dd, yyyy h:mm:ss tt",
        generalDateShortTime: "M/d/yyyy h:mm tt",
        generalDateTime: "M/d/yyyy h:mm:ss tt",
        sortableDateTime: "yyyy'-'MM'-'ddTHH':'mm':'ss",
        universalSortableDateTime: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
        monthYear: "MMMM, yyyy",
        monthDay: "MMMM dd",
        today: "today",
        tomorrow: "tomorrow",
        yesterday: "yesterday",
        next: "next",
        last: "last",
        year: "year",
        month: "month",
        week: "week",
        day: "day",
        am: "AM",
        pm: "PM",
        dateSeparator: "/",
        timeSeparator: ":",
        firstDayOfWeek: 0,
        currencydecimaldigits: 2,
        currencydecimalseparator: '.',
        currencygroupseparator: ',',
        currencygroupsize: 3,
        currencynegative: 0,
        currencypositive: 0,
        currencysymbol: '$',
        numericdecimaldigits: 2,
        numericdecimalseparator: '.',
        numericgroupseparator: ',',
        numericgroupsize: 3,
        numericnegative: 1,
        percentdecimaldigits: 2,
        percentdecimalseparator: '.',
        percentgroupseparator: ',',
        percentgroupsize: 3,
        percentnegative: 0,
        percentpositive: 0,
        percentsymbol: '%'
    },
    customFormatRegEx = /[0#?]/,
    standardFormats = {
        d: culture.shortDate,
        D: culture.longDate,
        F: culture.fullDateTime,
        g: culture.generalDateShortTime,
        G: culture.generalDateTime,
        m: culture.monthDay,
        M: culture.monthDay,
        s: culture.sortableDateTime,
        t: culture.shortTime,
        T: culture.longTime,
        u: culture.universalSortableDateTime,
        y: culture.monthYear,
        Y: culture.monthYear
    },
    patterns = {
        numeric: ["n", "-n"],
        currency: ["$n", "($n)"],
        percent: {
            positive: ['n *', 'n*', '*n'],
            negative: ['-n *', '-n*', '-*n']
        }
    },
    formatRegExp = /{(\d+)(:[^\}]+)?}/g,
    dateFormatRegExp = /dddd|ddd|dd|d|MMMM|MMM|MM|M|yyyy|yy|HH|H|hh|h|mm|m|fff|ff|f|tt|ss|s|"[^"]*"|'[^']*'/g;

    function pad(number) {
        return number < 10 ? "0" + number : number;
    }

    function formatDate(date, format) {
        format = standardFormats[format] || format;

        return format.replace(dateFormatRegExp, function (match) {
            if (match === "d") {
                return date.getDate();
            } else if (match === "dd") {
                return pad(date.getDate());
            } else if (match === "ddd") {
                return culture.abbrDays[date.getDay()];
            } else if (match === "dddd") {
                return culture.days[date.getDay()];
            } else if (match === "M") {
                return date.getMonth() + 1;
            } else if (match === "MM") {
                return pad(date.getMonth() + 1);
            } else if (match === "MMM") {
                return culture.abbrMonths[date.getMonth()];
            } else if (match === "MMMM") {
                return culture.months[date.getMonth()];
            } else if (match === "yy") {
                return pad(date.getFullYear() % 100);
            } else if (match === "yyyy") {
                return date.getFullYear();
            } else if (match === "h" ) {
                return date.getHours() % 12 || 12
            } else if (match === "hh") {
                return pad(date.getHours() % 12 || 12);
            } else if (match === "H") {
                return date.getHours();
            } else if (match === "HH") {
                return pad(date.getHours());
            } else if (match === "m") {
                return date.getMinutes();
            } else if (match === "mm") {
                return pad(date.getMinutes());
            } else if (match === "s") {
                return date.getSeconds();
            } else if (match === "ss") {
                return pad(date.getSeconds());
            } else if (match === "f") {
                return Math.floor(date.getMilliseconds() / 100);
            } else if (match === "ff") {
                return Math.floor(date.getMilliseconds() / 10);
            } else if (match === "fff") {
                return date.getMilliseconds();
            } else if (match === "tt") {
                return date.getHours() < 12 ? culture.am : culture.pm
            }

            return match.slice(1, match.length - 1);
        });
    }

    //number formatting

    function zeroPad(match) {
        var result = "",
        i = isNaN(match) ? match.length : match;

        while (i > 0) {
            i--;
            result += 0;
        }
        return result;
    }

    function replace(result, reg) {
        return result.replace(reg, zeroPad).replace(digitPlaceholderRegExp, EMPTY);
    }

    var EMPTY = "",
        POINT = ".",
        COMMA = ",",
        standardFormatRegExp =  /^(n|c|e)(\d*)$/i,
        customFormatRegExp = /([#0,]+)/,
        digitPlaceholderRegExp = /#+/,
        leftMostZeroRegExp = /(0+#+)+/,
        rigtMostZeroRegExp = /(#+0+)+/,
        expRegExp = /^([e|E][-|+]*[\d]*)/,
        digitsRegExp = /\d+/;

    function formatNumber(number, format) {
        var groupSize = 3,
            groupSeparator = ",",
            decimal = ".",
            decimalDigits = 2,
            symbol = "$";

        if (number === undefined) {
            return EMPTY;
        }

        if (!format) {
            return number.toString();
        }

        var formatMatches = standardFormatRegExp.exec(format);

        if (formatMatches) {

            if (formatMatches[2]) {
                decimalDigits = new Number(formatMatches[2]);
            }

            var negative = number < 0;

            //exponent
            if (formatMatches[1].toLowerCase() === "e") {
                if (formatMatches[2]) {
                    return number.toExponential(decimalDigits);
                } else {
                    return number.toExponential();
                }
            }
            //end

            number = number.toFixed(decimalDigits);
            number = number.toString().split(".");

            var integer = number[0];
            var fraction = number[1];
            var value = "";
            var idx, length;

            if (negative) {
                integer = integer.substring(1);
            }

            for (idx = 0, length = integer.length; idx < length; idx++) {
                if ((length - idx) % groupSize === 0) {
                    value += groupSeparator;
                }

                value += integer.charAt(idx);
            }

            number = value;
            if (fraction) {
                number += decimal + fraction.substr(0, decimalDigits);
            }

            if (formatMatches[1].toLowerCase() === "n") {
                return negative ? patterns.numeric[1].replace("n", number) : number;
            } else if (formatMatches[1].toLowerCase() === "c") {
                return patterns.currency[negative ? 1 : 0].replace("n", number);
            }
        }

        format = format.split(";");
        if (number < 0 && format[1]) {
            number = Math.abs(number);
            format = format[1];
        } else if (number === 0) {
            format = format[2] || format[0];
        } else {
            format = format[0];
        }

        // end

        if (format.indexOf("%") !== -1) {
            number *= 100;
        }
        number = number.toString().split(POINT);

        format = format.split(POINT);

        //awful code!!!
        if (format[1] && /0$/.test(format[1])) {
            number = parseFloat(number[0] + "." + number[1]).toFixed(format[1].length).toString().split(".");
        }

        //if(format[1]) {
        //    var found = customFormatRegExp.exec(format[1]);
        //    if (found && /0$/.test(found[0])) {
        //        number = parseFloat(number[0] + (number[1] ? "." + number[1] : "")).toFixed(format[1].length - 1).toString().split(".");
        //    }
        //}

        var matchedLength,
            result = number[0],
            length = result.length,
            integer = format[0],
            fraction = format[1],
            hasGroupSeparator = integer.indexOf(COMMA) !== -1,
            groupSeparatorRegExp = new RegExp('(-?[0-9]+)([0-9]{' + groupSize + '})');

        integer = integer.replace(customFormatRegExp, function(match) {
            matchedLength = match.length;
            if (matchedLength > length) {
                result = match.slice(0, matchedLength - length) + result;
            }

            result = replace(result, leftMostZeroRegExp);

            if (hasGroupSeparator) {
                result = result.replace(COMMA, EMPTY);
                if (groupSeparator && groupSize != 0) {
                    while (groupSeparatorRegExp.test(result)) {
                        result = result.replace(groupSeparatorRegExp, '$1' + groupSeparator + '$2');
                    }
                }
            }

            return result;
        });

        if (fraction) {
            fraction = fraction.replace(customFormatRegExp, function(match) {
                matchedLength = match.length;
                result = number[1] !== undefined ? number[1] : EMPTY;
                length = result.length;

                if (matchedLength > length) {
                    result = result + match.slice(length);
                }

                result = replace(result, rigtMostZeroRegExp);

                if (result.length) {
                    integer += decimal;
                }

                return result;
            });

            integer += fraction;
        }

        return integer;
    }
    function toString(value, fmt) {
        if (fmt) {
            if (value instanceof Date) {
                return formatDate(value, fmt);
            } else if (typeof value === "number") {
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
    }

    kendo.toString = toString;
    })();

    function throttle(delay, callback) {
        var timeout_id,
            last_call = 0,
            omit_ending = arguments[2] || false;

        return function () {
            var that = this,
                time_span = +new Date() - last_call,
                args = arguments;

            function execute() {
                last_call = +new Date();
                callback.apply(that, args);
            }

            function clear() {
                clearTimeout(timeout_id);
                timeout_id = undefined;
            }

            timeout_id && clear();

            if (time_span > delay)
                execute();
            else
                if (!omit_ending)
                    timeout_id = setTimeout( execute, delay - time_span);
        };
    }

    function wrap(element) {
        if (!element.parent().hasClass('t-animation-container')) {
            var shadow = element.css(kendo.support.transitions.css + 'box-shadow') || element.css('box-shadow'),
                radius = shadow ? shadow.match(/(\d+?)px\s*(\d+?)px\s*(\d+?)px\s*(\d+?)?/i) || [ 0, 0, 0, 0, 0 ] : [ 0, 0, 0, 0, 0 ],
                blur = Math.max((+radius[3]), +(radius[4] || 0)),
                right = (+radius[1]) + blur,
                bottom = (+radius[2]) + blur;

            if ($.browser.opera) // Box shadow can't be retrieved in Opera
                right = bottom = 5;

            element.wrap(
                         $('<div/>')
                         .addClass('t-animation-container')
                         .css({
                             width: element.outerWidth(),
                             height: element.outerHeight(),
                             paddingRight: right,
                             paddingBottom: bottom
                         }));
        } else {
            element.parent().show().css({
                width: element.outerWidth(),
                height: element.outerHeight()
            });
        }

        if ($.browser.msie && Math.floor($.browser.version) <= 7)
            element.css({
                width: '100%',
                zoom: 1
            });

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
        support.transitions = false;

        /**
         * Indicates whether the browser supports hardware 3d transitions.
         * @name kendo.support.hasHW3D
         * @property {Boolean}
         */
        support.hasHW3D = 'WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix();

        each([ 'Moz', 'webkit', 'O', 'ms' ], function () {
            var prefix = this.toString();

            if (typeof table.style[prefix + 'Transition'] === 'string') {
                var lowPrefix = prefix.toLowerCase();

                support.transitions = {
                    css: '-' + lowPrefix + '-',
                    prefix: prefix,
                    event: (lowPrefix === 'o' || lowPrefix === 'webkit') ? lowPrefix : ''
                };

                support.transitions.event = support.transitions.event ? support.transitions.event + 'TransitionEnd' : 'transitionend';

                return false;
            }
        });

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

    var effectInit = {
            fadeIn: function(element) {
                element.css('opacity', 0);
            },
            zoomIn: function(element) {
                if (kendo.support.transitions)
                    element.css(kendo.support.transitions.css + "transform", "scale(.01)");
            },
            expandVertical: function(element) {
                if (element.data('initialHeight') === undefined)
                    element.data('initialHeight', element[0].style.height);
            },
            expandVerticalReverse: function(element) {
                if (element.data('initialHeight') === undefined)
                    element.data('initialHeight', element[0].style.height);

                element
                    .css('height', element.height())
                    .css('height')
            }
        };
    extend(effectInit, {
                fadeOutReverse: effectInit.fadeIn,
                zoomOutReverse: effectInit.zoomIn
            });

    function size(obj) {
        var size = 0, key;
        for (key in obj)
            obj.hasOwnProperty(key) && size++;

        return size;
    }

    function parseEffects(input, mirror) {
        var effects = {};

        if (typeof input === "string")
            each(input.split(" "), function() {
                var effect = this.split(":"),
                    direction = effect[1],
                    effectBody = {};

                effect.length > 1 && (effectBody["direction"] = mirror ? kendo.directions[direction].reverse : direction);

                effects[effect[0]] = effectBody;
            });
        else
            each(input, function(idx) {
                if (this.direction && mirror)
                    this.direction = kendo.directions[this.direction].reverse;

                effects[idx] = this;
            });

        return effects;
    }

    var directions = {
        left: {
            reverse: "right",
            property: "left",
            transition: "translateX",
            vertical: false,
            modifier: -1
        },
        right: {
            reverse: "left",
            property: "left",
            transition: "translateX",
            vertical: false,
            modifier: 1
        },
        down: {
            reverse: "up",
            property: "top",
            transition: "translateY",
            vertical: true,
            modifier: 1
        },
        up: {
            reverse: "down",
            property: "top",
            transition: "translateY",
            vertical: true,
            modifier: -1
        },
        "in": {
            reverse: "out",
            modifier: -1
        },
        out: {
            reverse: "in",
            modifier: 1
        }
    };

    function animate(element, options, duration, reverse, complete) {
        var effects = {};

        if (typeof options === "string") {
            // options is the list of effect names separated by space e.g. animate(element, "fadeIn slideDown")

            effects = parseEffects(options);

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

            if (typeof duration === "boolean"){
                duration = 400;
                reverse = duration;
            }

            options = {
                effects: effects,
                duration: duration,
                reverse: reverse,
                complete: complete
            };
        }

        if ('effects' in options && typeof options.effects === "string")
            options.effects = parseEffects(options.effects);

        options = extend({
            //default options
            effects: {},
            duration: 400, //jQuery default duration
            reverse: false,
            complete: noop,
            teardown: noop,
            hide: false,
            show: false
        }, options);

        each( options.effects, function (effectName) {
            var effect = options.reverse ? effectName + 'Reverse' : effectName;

            if (effect in effectInit)
                effectInit[effect](element);
        });

        if (options.show && !element.is(':visible')) {
            element.show();
        }

        return element.queue(function () {
            var promises = [], effects = options.effects;

            if (typeof effects === "string") {
                effects = parseEffects(options.effects);
            }

            if (kendo.fx && support.transitions) {
                var pkg = {
                    element: element,
                    eventNo: 0,
                    effectCount: size(effects)
                };

                var px = proxy( kendo.fx.deQueue, pkg );
                element.bind(support.transitions.event, px);
            }

            element.data("animating", true);

            var teardowns = [];

            // create a promise for each effect
            each(effects, function(effectName, settings) {
                var promise = $.Deferred(function(deferred) {
                    var effect = kendo.fx[effectName];

                    if (effect) {
                        var opt = settings.options; // Something goes wrong when there's no variable and the complete callback is called too many times.
                        settings.options = extend(opt, {
                            duration: options.duration,
                            direction: settings.direction,
                            complete: function () {
                                each(options.effects, function(idx, effect) {
                                    if ('options' in effect && 'teardown' in effect.options)
                                        teardowns.push(effect.options.teardown); // collect the internal completion callbacks
                                });

                                deferred.resolve();
                            }
                        });

                        effect[options.reverse? "reverse" : "play"](element, settings.properties, settings.options);
                    } else {
                        deferred.resolve();
                    }
                }).promise();

                promises.push(promise);
            });

            //wait for all effects to complete
            $.when.apply(null, promises).then(function() {
                element.removeData("animating");
                element.dequeue(); // call next animation from the queue

                if (options.hide) {
                    element.hide();
                }

                options.complete(); // call the complete callback
                each(teardowns, function () { this(); }); // call the internal completion callbacks
            });
       });
    }

    extend($.fn, /** @lends jQuery.fn */{
        kendoStop: function(clearQueue, gotoEnd) {
            if (kendo.support.transitions && 'stopQueue' in kendo.fx)
                return kendo.fx.stopQueue(this, clearQueue || false, gotoEnd || false);
            else
                return this.stop(clearQueue, gotoEnd);
        },
        kendoAnimate: function(options, duration, reverse, complete) {
            return animate(this, options, duration, reverse, complete);
        }
    });

    function toggleClass(element, classes, options, add) {
        if (classes) {
            classes = classes.split(' ');

            if (support.transitions) {
                options = extend({
                    exclusive: 'all',
                    duration: 400,
                    ease: 'ease-out'
                }, options);

                element.css(support.transitions.css + 'transition', options.exclusive + ' ' + options.duration + 'ms ' + options.ease);
                setTimeout(function() {
                    element.css(support.transitions.css + 'transition', 'none');
                }, options.duration + 20); // TODO: this should fire a kendoAnimate session instead.
            }

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

    /**
     * Encodes HTML characters to entities.
     * @name kendo.htmlEncode
     * @function
     * @param {String} value The string that needs to be HTML encoded.
     * @returns {String} The encoded string.
     */
    function htmlEncode(value) {
        return ("" + value).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
    }

    var touchLocation = function(e) {
        return {
            idx: 0,
            x: e.pageX,
            y: e.pageY
        };
    };

    if (support.touch) {
        /** @ignore */
        touchLocation = function(e, id) {
            var changedTouches = e.changedTouches || e.originalEvent.changedTouches;

            if (id) {
                var output = null;
                each(changedTouches, function(idx, value) {
                    if (id == value.identifier)
                        output = {
                            idx: value.identifier,
                            x: value.pageX,
                            y: value.pageY
                        };
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

        each(['swipe', 'swipeLeft', 'swipeRight', 'swipeUp', 'swipeDown', 'doubleTap', 'tap'], function(m, value) {
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
        fx: {},
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
        parseEffects: parseEffects,
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
})(jQuery, window);
