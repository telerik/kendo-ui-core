(function ($) {
    // fix background flickering under IE6
    try {
        if (document.execCommand)
            document.execCommand('BackgroundImageCache', false, true);
    } catch (e) { }

    var dateCheck = /\d/;
    var whiteSpaceRegExp = /\s+/;
    var version = parseInt($.browser.version.substring(0, 5).replace('.', ''));
    var geckoFlicker = $.browser.mozilla && version >= 180 && version <= 191;
    var dateFormatTokenRegExp = /d{1,4}|M{1,4}|yy(?:yy)?|([Hhmstf])\1*|"[^"]*"|'[^']*'/g;
    var mobileSafari = (navigator.userAgent.search(/like\sMac\sOS\sX;.*Mobile\/\S+/) != -1);
    var mobileSafari41 = (navigator.userAgent.search(/4_1\slike\sMac\sOS\sX;.*Mobile\/\S+/) != -1); // The bug is undetectable there.

    var useTriggerHandler = (function () {
        var dummyEvent = new $.Event("triggerHandlerTest");

        $("<div />").triggerHandler(dummyEvent);

        return !dummyEvent.isDefaultPrevented();
    })();

    var $t = $.telerik = {

        create: function (query, settings) {
            var name = settings.name;
            var options = $.extend({}, $.fn[name].defaults, settings.options);

            return query.each(function () {
                var $$ = $(this);
                options = $.meta ? $.extend({}, options, $$.data()) : options;

                if (!$$.data(name)) {
                    var component = settings.init(this, options);

                    $$.data(name, component);

                    $t.trigger(this, 'load');

                    if (settings.success) settings.success(component);
                }
            });
        },

        toJson: function (o) {
            function serializeArray(array) {
                return '[' + $.map(array, serialize).join(',') + ']';
            }

            function serialize(obj) {
                var result = [];
                for (var key in obj) {
                    var value = obj[key];
                    if ($.isArray(value)) {
                        result.push('"' + key + '":' + serializeArray(value));
                    } else if (typeof value != 'object') {
                        result.push('"' + key + '":"' + (value == null ? "" : value) + '"');
                    } else {
                        result.push('"' + key + '":' + serialize(value));
                    }
                }
                return '{' + result.join(',') + '}';
            }

            if ($.isArray(o)) {
                return serializeArray(o);
            } else {
                return serialize(o);
            }
        },

        delegate: function (context, handler) {
            return function (e) {
                handler.apply(context, [e, this]);
            };
        },

        stop: function (handler, context) {
            return function (e) {
                e.stopPropagation();
                handler.apply(context || this, arguments);
            };
        },

        stopAll: function (handler, context) {
            return function (e) {
                e.preventDefault();
                e.stopPropagation();
                handler.apply(context || this, arguments);
            }
        },

        bind: function (context, events) {
            var $element = $(context.element ? context.element : context);
            $.each(events, function (eventName) {
                if ($.isFunction(this)) $element.bind(eventName, this);
            });
        },

        preventDefault: function (e) {
            e.preventDefault();
        },

        hover: function () {
            $(this).addClass('t-state-hover');
        },

        leave: function () {
            $(this).removeClass('t-state-hover');
        },

        buttonHover: function () {
            $(this).addClass('t-button-hover');
        },

        buttonLeave: function () {
            $(this).removeClass('t-button-hover');
        },

        stringBuilder: function () {
            this.buffer = [];
        },

        ajaxError: function (element, eventName, xhr, status) {
            var prevented = this.trigger(element, eventName,
                {
                    XMLHttpRequest: xhr,
                    textStatus: status
                });

            if (!prevented) {
                if (status == 'error' && xhr.status != '0')
                    alert('Error! The requested URL returned ' + xhr.status + ' - ' + xhr.statusText);
                if (status == 'timeout')
                    alert('Error! Server timeout.');
            }

            return prevented;
        },

        trigger: function (element, eventName, e) {
            e = $.extend(e || {}, new $.Event(eventName));
            if (useTriggerHandler) {
                $(element).triggerHandler(e);
            } else {
                e.stopPropagation();
                $(element).trigger(e);
            }
            return e.isDefaultPrevented();
        },

        // Returns the type as a string. Not full. Used in string formatting
        getType: function (obj) {
            if (obj instanceof Date)
                return 'date';
            if (typeof obj === "number")
                return 'number';
            return 'object';
        },

        formatString: function () {
            var s = arguments[0];

            for (var i = 0, l = arguments.length - 1; i < l; i++) {
                var reg = new RegExp('\\{' + i + '(:([^\\}]+))?\\}', 'gm');

                var argument = arguments[i + 1];

                var formatter = this.formatters[this.getType(argument)];
                if (formatter) {
                    var match = reg.exec(s);
                    if (match)
                        argument = formatter(argument, match[2]);
                }

                s = s.replace(reg, function () {
                    return argument;
                });
            }
            return s;
        },

        splitClassesFromAttr: function (attr) {
            var classRegExp = /class="([^"]*)"/i,
                splitAttr = {
                    classes: '',
                    attributes: ''
                },
                className;

            if (attr) {
                className = classRegExp.exec(attr);
                splitAttr.attributes = $.trim(attr.replace(classRegExp, ""));

                if (className) {
                    splitAttr.classes = className[1];
                }
            }

            return splitAttr;
        },

        getElementZIndex: function (element) {
            var zIndex;
            $(element).parents().andSelf().each(function () {
                zIndex = $(this).css('zIndex');
                if (Number(zIndex)) {
                    zIndex = Number(zIndex) + 1;
                    return false;
                }
            });

            return zIndex == 'auto' ? 1 : zIndex; // 'auto' causes problems if there is Upload behind the dropdown
        },

        scrollbarWidth: function () {
            var div = document.createElement("div"),
                result;

            div.style.cssText = "overflow:scroll;overflow-x:hidden;zoom:1";
            div.innerHTML = "&nbsp;";
            document.body.appendChild(div);

            result = div.offsetWidth - div.scrollWidth;

            document.body.removeChild(div);
            return result;
        },

        lastIndexOf: function (value, character) {
            var characterLength = character.length;
            for (var i = value.length - 1; i > -1; i--)
                if (value.substr(i, characterLength) == character) return i;
            return -1;
        },

        caretPos: function (element) {
            var pos = -1;

            if (document.selection)
                pos = Math.abs(element.document.selection.createRange().moveStart('character', -element.value.length));
            else if (element.selectionStart !== undefined)
                pos = element.selectionStart;

            return pos;
        },

        encode: function (value) {
            return value.replace(/&/g, '&amp;')
                        .replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;')
                        .replace(/\u00a0/g, '&nbsp;')
                        .replace(/'/g, '&#39;');
        },

        formatters: {},

        fx: {},

        cultureInfo: {
            days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            abbrDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            shortestDays: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            abbrMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            longTime: 'h:mm:ss tt',
            longDate: 'dddd, MMMM dd, yyyy',
            shortDate: 'M/d/yyyy',
            shortTime: 'h:mm tt',
            fullDateTime: 'dddd, MMMM dd, yyyy h:mm:ss tt',
            generalDateShortTime: 'M/d/yyyy h:mm tt',
            generalDateTime: 'M/d/yyyy h:mm:ss tt',
            sortableDateTime: "yyyy'-'MM'-'ddTHH':'mm':'ss",
            universalSortableDateTime: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
            monthYear: 'MMMM, yyyy',
            monthDay: 'MMMM dd',
            today: 'today',
            tomorrow: 'tomorrow',
            yesterday: 'yesterday',
            next: 'next',
            last: 'last',
            year: 'year',
            month: 'month',
            week: 'week',
            day: 'day',
            am: 'AM',
            pm: 'PM',
            dateSeparator: '/',
            timeSeparator: ':',
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

        patterns: {     // * - placeholder for the symbol; n - placeholder for the number
            numeric: {
                negative: ['(n)', '-n', '- n', 'n-', 'n -']
            },
            currency: {
                positive: ['*n', 'n*', '* n', 'n *'],
                negative: ['(*n)', '-*n', '*-n', '*n-', '(n*)', '-n*', 'n-*', 'n*-', '-n *', '-* n', 'n *-', '* n-', '* -n', 'n- *', '(* n)', '(n *)']
            },
            percent: {
                positive: ['n *', 'n*', '*n'],
                negative: ['-n *', '-n*', '-*n']
            }
        }
    };

    var filter, map;

    if (Array.prototype.filter !== undefined) {
        filter = function (array, predicate) {
            return array.filter(predicate);
        }
    } else {
        filter = function (array, predicate) {
            var result = [], length = array.length;

            for (var i = 0; i < length; i++) {
                var value = array[i];

                if (predicate(value, i, array)) {
                    result[result.length] = value;
                }
            }

            return result;
        }
    }

    if (Array.prototype.map !== undefined) {
        map = function (array, callback) {
            return array.map(callback);
        }
    } else {
        map = function (array, callback) {
            var length = array.length, result = new Array(length);

            for (var i = 0; i < length; i++) {
                result[i] = callback(array[i], i, array);
            }

            return result;
        }
    }

    $t.dropDown = function (options) {
        $.extend(this, options);

        this.$element = $(new $t.stringBuilder().cat('<div ')
                                 .catIf(options.attr, options.attr)
                                 .cat('><ul class="t-reset"></ul></div>')
                                 .string())
                                 .addClass("t-popup t-group")
                                 .hide();

        this.$element.delegate('.t-reset > .t-item', 'mouseenter', $t.hover)
                     .delegate('.t-reset > .t-item', 'mouseleave', $t.leave)
                     .delegate('.t-reset > .t-item', 'click',
                        $.proxy(function (e) {
                            if (this.onClick)
                                this.onClick($.extend(e, { item: $(e.target).closest('.t-item')[0] }));
                        }, this));

        this.$element.tScrollable();
    };

    $t.dropDown.prototype = {
        _html: function (data, isEncoded) {
            var html = new $t.stringBuilder();
            if (data) {
                for (var i = 0, length = data.length; i < length; i++) {

                    var text = "&nbsp;",
                        dataItem = data[i];

                    if (dataItem) {
                        if (dataItem.Text !== undefined) {
                            text = dataItem.Text;
                        } else {
                            text = dataItem;
                        }

                        if (isEncoded) {
                            text = $t.encode(text);
                        }

                        if (!text || !text.replace(whiteSpaceRegExp, '')) {
                            text = '&nbsp;';
                        }
                    }

                    var e = {
                        html: text,
                        dataItem: dataItem
                    };

                    if (this.onItemCreate) this.onItemCreate(e);

                    html.cat('<li unselectable="on" class="t-item">').cat(e.html).cat('</li>');
                }
            }
            return html.string();
        },

        open: function (position) {
            if (this.onOpen) this.onOpen();

            if (this.isOpened() || !this.$items) return;

            var $element = this.$element,
                width;

            if (!$element.parent()[0]) {
                $element.hide().appendTo(document.body);
            }

            if ($element[0].style.width == '')
                width = position.outerWidth ? position.outerWidth - 2 : 0;
            else
                width = parseInt(this.attr ? $('<div' + this.attr + '></div>')[0].style.width : $element[0].style.width);

            $element.css('overflowY', 'auto')
                    .css('width', width);

            var elementPosition = position.offset;
            elementPosition.top += position.outerHeight;

            if (mobileSafari) {
                if (!document.body.scrollLeft && !mobileSafari41)
                    elementPosition.left -= window.pageXOffset;
                if (!document.body.scrollTop && !mobileSafari41)
                    elementPosition.top -= window.pageYOffset;
            }

            $t.fx._wrap($element).css($.extend({
                position: 'absolute',
                zIndex: position.zIndex
            }, elementPosition));

            if (geckoFlicker)
                $element.css('overflow', 'hidden');

            $element.parent().show();

            $t.fx.play(this.effects, $element, { direction: 'bottom' }, $.proxy(function () {
                $element.css("overflow", "auto");

                var height = $element.css("height");
                if (height == "auto" || height != "100%") {
                    $element.css("height", "100%");
                }

                var $selectedItems = this.$items.filter('.t-state-selected');
                if ($selectedItems.length) this.scrollTo($selectedItems[0]);
            }, this));
        },

        close: function (e) {
            if (!this.isOpened()) return;

            var $element = this.$element;
            var $items = this.$items;

            if (geckoFlicker)
                $element.css('overflow', 'hidden');

            $t.fx.rewind(this.effects, $element, { direction: 'bottom' }, function () {
                if (geckoFlicker) {
                    $element.css('overflow', 'auto');
                }

                if ($items) {
                    $items.removeClass("t-state-hover"); // removes accidentally triggered hover states while closing
                }

                if ($element.parent(".t-animation-container")[0]) {
                    $element.parent().hide();
                }
            });
        },

        dataBind: function (data, isEncoded) {
            data = data || [];

            var $element = this.$element;

            if ($element[0].style.height == "100%") {
                $element.css("height", "auto");
            }

            var elementHeight = $element[0].style.height,
                height = elementHeight && elementHeight != 'auto' ? elementHeight : '200px',
                $ul = $element.find('> ul');

            $ul[0].innerHTML = this._html(data, isEncoded);

            var $items = this.$items = $ul.children();
            $element.css('height', $items.length > 10 ? height : 'auto');
        },

        highlight: function (li) {
            return $(li).addClass('t-state-selected')
                        .siblings()
                        .removeClass('t-state-selected')
                        .end()
                        .index();
        },

        isOpened: function () {
            return this.$element.is(':visible');
        },

        scrollTo: function (item) {

            if (!item) return;

            var itemOffsetTop = item.offsetTop;
            var itemOffsetHeight = item.offsetHeight;

            var dropDown = this.$element[0];
            var dropDownScrollTop = dropDown.scrollTop;
            var dropDownOffsetHeight = dropDown.clientHeight;
            var bottomDistance = itemOffsetTop + itemOffsetHeight;

            dropDown.scrollTop = dropDownScrollTop > itemOffsetTop
                                    ? itemOffsetTop
                                    : bottomDistance > (dropDownScrollTop + dropDownOffsetHeight)
                                    ? bottomDistance - dropDownOffsetHeight
                                    : dropDownScrollTop;
        }
    };

    $t.datetime = function () {
        if (arguments.length == 0)
            this.value = new Date();
        else if (arguments.length == 1)
            this.value = new Date(arguments[0]);
        else if (arguments.length == 3)
            this.value = new Date(arguments[0], arguments[1], arguments[2]);
        else if (arguments.length == 6)
            this.value = new Date(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
        else
            this.value = new Date(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6]);

        return this;
    }

    $.extend($t.datetime, {
        msPerMinute: 60000,
        msPerDay: 86400000,
        add: function (date, valueToAdd, ignoreDST) {
            var tzOffsetBefore = date.timeOffset();
            var resultDate = new $t.datetime(date.time() + valueToAdd);
            var tzOffsetDiff = resultDate.timeOffset() - tzOffsetBefore;

            if (ignoreDST) {
                return resultDate;
            }

            return new $t.datetime(resultDate.time() + tzOffsetDiff * $t.datetime.msPerMinute);
        },

        subtract: function (date, dateToSubtract) {
            dateToSubtract = new $t.datetime(dateToSubtract).toDate();
            var diff = date.time() - dateToSubtract;
            var tzOffsetDiff = date.timeOffset() - dateToSubtract.timeOffset();
            return diff - (tzOffsetDiff * $t.datetime.msPerMinute);
        },

        firstDayOfMonth: function (date) {
            return new $t.datetime(0)
                        .hours(date.hours())
                        .minutes(date.minutes())
                        .seconds(date.seconds())
                        .milliseconds(date.milliseconds())
                        .year(date.year(), date.month(), 1);
        },

        dst: function () {
            var today = new $t.datetime(),
                midnight = new $t.datetime(today.year(), today.month(), today.date(), 0, 0, 0),
                noon = new $t.datetime(today.year(), today.month(), today.date(), 12, 0, 0);

            return -1 * (midnight.timeOffset() - noon.timeOffset());
        },

        firstVisibleDay: function (date) {
            var firstDayOfWeek = $t.cultureInfo.firstDayOfWeek;
            var firstVisibleDay = new $t.datetime(date.year(), date.month(), 0, date.hours(), date.minutes(), date.seconds(), date.milliseconds());
            while (firstVisibleDay.day() != firstDayOfWeek) {
                $t.datetime.modify(firstVisibleDay, -1 * $t.datetime.msPerDay)
            }
            return firstVisibleDay;
        },

        modify: function (date, value) {
            var tzOffsetBefore = date.timeOffset();
            var resultDate = new $t.datetime(date.time() + value);
            var tzOffsetDiff = resultDate.timeOffset() - tzOffsetBefore;
            date.time(resultDate.time() + tzOffsetDiff * $t.datetime.msPerMinute);
        },

        pad: function (value) {
            if (value < 10)
                return '0' + value;
            return value;
        },

        standardFormat: function (format) {
            var l = $t.cultureInfo;

            var standardFormats = {
                d: l.shortDate,
                D: l.longDate,
                F: l.fullDateTime,
                g: l.generalDateShortTime,
                G: l.generalDateTime,
                m: l.monthDay,
                M: l.monthDay,
                s: l.sortableDateTime,
                t: l.shortTime,
                T: l.longTime,
                u: l.universalSortableDateTime,
                y: l.monthYear,
                Y: l.monthYear
            };

            return standardFormats[format];
        },

        format: function (date, format) {
            var l = $t.cultureInfo;

            var d = date.getDate();
            var day = date.getDay();
            var M = date.getMonth();
            var y = date.getFullYear();
            var h = date.getHours();
            var m = date.getMinutes();
            var s = date.getSeconds();
            var f = date.getMilliseconds();
            var pad = $t.datetime.pad;

            var dateFormatters = {
                d: d,
                dd: pad(d),
                ddd: l.abbrDays[day],
                dddd: l.days[day],

                M: M + 1,
                MM: pad(M + 1),
                MMM: l.abbrMonths[M],
                MMMM: l.months[M],

                yy: pad(y % 100),
                yyyy: y,

                h: h % 12 || 12,
                hh: pad(h % 12 || 12),
                H: h,
                HH: pad(h),

                m: m,
                mm: pad(m),

                s: s,
                ss: pad(s),

                f: Math.floor(f / 100),
                ff: Math.floor(f / 10),
                fff: f,

                tt: h < 12 ? l.am : l.pm
            };

            format = format || 'G';
            format = $t.datetime.standardFormat(format) ? $t.datetime.standardFormat(format) : format;

            return format.replace(dateFormatTokenRegExp, function (match) {
                return match in dateFormatters ? dateFormatters[match] : match.slice(1, match.length - 1);
            });
        },

        parse: function (options) {
            var value = options.value;
            var format = options.format;

            if (value && value.value) return value;

            format = $t.datetime.standardFormat(format) ? $t.datetime.standardFormat(format) : format;
            if (dateCheck.test(value))
                return $t.datetime.parseMachineDate({
                    value: value,
                    format: format,
                    shortYearCutOff: options.shortYearCutOff,
                    baseDate: options.baseDate,
                    AM: $t.cultureInfo.am,
                    PM: $t.cultureInfo.pm
                });

            return $t.datetime.parseByToken ? $t.datetime.parseByToken(value, options.today) : null;
        },

        parseMachineDate: function (options) {

            var AM = options.AM,
                PM = options.PM,
                value = options.value,
                format = options.format,
                baseDate = options.baseDate,
                shortYearCutOff = options.shortYearCutOff || 30,
                year = null,
                month = null,
                day = null,
                hours = 0,
                minutes = 0,
                seconds = 0,
                milliseconds = 0,
                isAM,
                isPM,
                literal = false,
                matches = function (match) {
                    return (formatPosition + 1 < format.length && format.charAt(formatPosition + 1) == match);
                },
            // Returns count of the format character in the date format string
                lookAhead = function (match) {
                    var index = 0;
                    while (matches(match)) {
                        index++;
                        formatPosition++
                    }
                    return index;
                },
            // Extract a number from the string value
                getNumber = function (size) {
                    var digits = new RegExp('^\\d{1,' + size + '}');
                    var num = value.substr(currentTokenIndex).match(digits);
                    if (num) {
                        currentTokenIndex += num[0].length;
                        return parseInt(num[0], 10);
                    } else {
                        return -1;
                    }
                },
            // Extract a name from the string value and convert to an index
                getName = function (names) {
                    for (var i = 0; i < names.length; i++) {
                        if (value.substr(currentTokenIndex, names[i].length) == names[i]) {
                            currentTokenIndex += names[i].length;
                            return i + 1;
                        }
                    }
                    return -1;
                },
                checkLiteral = function () {
                    if (value.charAt(currentTokenIndex) == format.charAt(formatPosition)) {
                        currentTokenIndex++;
                        return true;
                    } else {
                        return false;
                    }
                },
                normalizeTime = function (val) {
                    return val === -1 ? 0 : val;
                },
                count = 0,
                currentTokenIndex = 0,
                valueLength = value.length;

            for (var formatPosition = 0, flength = format.length; formatPosition < flength; formatPosition++) {
                if (currentTokenIndex == valueLength) break;
                if (literal) {
                    checkLiteral();
                    if (format.charAt(formatPosition) == "'")
                        literal = false;
                } else {
                    switch (format.charAt(formatPosition)) {
                        case 'd':
                            count = lookAhead('d');
                            day = count <= 1 ? getNumber(2) : getName($t.cultureInfo[count == 3 ? 'days' : 'abbrDays']);
                            if (day === null || (day < 1 || day > 31)) {
                                return null;
                            }
                            break;
                        case 'M':
                            count = lookAhead('M');
                            month = count <= 1 ? getNumber(2) : getName($t.cultureInfo[count == 3 ? 'months' : 'abbrMonths']);
                            if (month === null || (month < 1 || month > 12)) {
                                return null;
                            }
                            month -= 1;
                            break;
                        case 'y':
                            count = lookAhead('y');
                            year = getNumber(count <= 1 ? 2 : 4);
                            if (year < 0 || year.toString().length <= count) {
                                return null;
                            }
                            break;
                        case 'H': // 0-24 hours
                            count = lookAhead('H');
                            hours = normalizeTime(getNumber(2));
                            if (hours === null || (hours < 0 || hours > 23)) {
                                return null;
                            }
                            break;
                        case 'h': // 0-12 hours
                            lookAhead('h')
                            hours = normalizeTime(getNumber(2));
                            if (hours == 12) {
                                hours = 0;
                            }
                            if (hours === null || (hours < 0 || hours > 11)) {
                                return null;
                            }
                            break;
                        case 'm':
                            lookAhead('m');
                            minutes = normalizeTime(getNumber(2));
                            if (minutes === null || (minutes < 0 || minutes > 59)) {
                                return null;
                            }
                            break;
                        case 's':
                            lookAhead('s');
                            seconds = normalizeTime(getNumber(2));
                            if (seconds === null || (seconds < 0 || seconds > 59)) {
                                return null;
                            }
                            break;
                        case 'f':
                            count = lookAhead('f');
                            milliseconds = normalizeTime(getNumber(count <= 0 ? 1 : count + 1));
                            if (milliseconds === null || (milliseconds < 0 || milliseconds > 999)) {
                                return null;
                            }
                            break;
                        case 't': // AM/PM or A/P
                            count = lookAhead('t');
                            AM = count > 0 ? AM : 'a';
                            PM = count > 0 ? PM : 'p';

                            var subValue = value.substr(currentTokenIndex).toLowerCase();
                            isAM = subValue.indexOf(AM.toLowerCase()) != -1;
                            isPM = subValue.indexOf(PM.toLowerCase()) != -1;

                            currentTokenIndex += isPM ? PM.length : isAM ? AM.length : 0;
                            break;
                        case "'":
                            checkLiteral();
                            literal = true;
                            break;
                        default:
                            if (!checkLiteral()) {
                                return null;
                            }
                    }
                }
            }

            var date = new $t.datetime();

            if (year !== null && year < 100)
                year += date.year() - date.year() % 100 +
                                (year <= shortYearCutOff ? 0 : -100);

            hours = (isPM && hours < 12)
                  ? hours + 12
                  : hours == 12 && isAM
                  ? 0
                  : hours;

            if (baseDate == undefined) {
                if (year === null) year = date.year();

                if (day === null) {
                    day = 1;
                }

                date = new $t.datetime(year, month, day, hours, minutes, seconds, milliseconds);

            } else {
                date = new $t.datetime(year !== null ? year : baseDate.year(),
                                       month !== null ? month : baseDate.month(),
                                       day !== null ? day : baseDate.date(),
                                       hours, minutes, seconds, milliseconds);
            }
            return date;
        }
    });

    $t.datetime.prototype = {

        year: function () {
            if (arguments.length == 0)
                return this.value.getFullYear();
            else if (arguments.length == 1)
                this.value.setFullYear(arguments[0]);
            else
                this.value.setFullYear(arguments[0], arguments[1], arguments[2]);

            return this;
        },

        timeOffset: function () {
            return this.value.getTimezoneOffset();
        },

        day: function () {
            return this.value.getDay();
        },

        toDate: function () {
            return this.value;
        },

        addMonth: function (value) {
            this.month(this.month() + value);
        },

        addYear: function (value) {
            this.year(this.year() + value);
        }
    };

    $.each(["Month", "Date", "Hours", "Minutes", "Seconds", "Milliseconds", "Time"], function (index, timeComponent) {
        $t.datetime.prototype[timeComponent.toLowerCase()] =
            function () {
                if (arguments.length == 1)
                    this.value["set" + timeComponent](arguments[0]);
                else
                    return this.value["get" + timeComponent]();

                return this;
            };
    });

    /* Number formatting ===================================*/
    var customFormatRegEx = /[0#?]/;
    var standartFormatRegEx = /n|p|c/i;

    function round(value, precision) {
        var power = Math.pow(10, precision || 0);
        return Math.round(value * power) / power;
    }

    function reverse(str) {
        return str.split('').reverse().join('');
    }

    function injectInFormat(val, format, appendExtras) {
        var i = 0, j = 0,
            fLength = format.length,
            vLength = val.length,
            builder = new $t.stringBuilder();

        while (i < fLength && j < vLength && format.substring(i).search(customFormatRegEx) >= 0) {

            if (format.charAt(i).match(customFormatRegEx))
                builder.cat(val.charAt(j++));
            else
                builder.cat(format.charAt(i));

            i++;
        }

        builder.catIf(val.substring(j), j < vLength && appendExtras)
               .catIf(format.substring(i), i < fLength);

        var result = reverse(builder.string()),
            zeroIndex;

        if (result.indexOf('#') > -1)
            zeroIndex = result.indexOf('0');

        if (zeroIndex > -1) {
            var first = result.slice(0, zeroIndex),
                second = result.slice(zeroIndex, result.length);
            result = first.replace(/#/g, '') + second.replace(/#/g, '0');
        } else {
            result = result.replace(/#/g, '');
        }

        if (result.indexOf(',') == 0)
            result = result.replace(/,/g, '');

        return appendExtras ? result : reverse(result);
    }

    $t.formatNumber = function (number,
                                format,
                                digits,
                                separator,
                                groupSeparator,
                                groupSize,
                                positive,
                                negative,
                                symbol,
                                isTextBox) {

        if (!format) return number;

        var type, customFormat, negativeFormat, zeroFormat, sign = number < 0;

        format = format.split(':');
        format = format.length > 1 ? format[1].replace('}', '') : format[0];

        var isCustomFormat = customFormatRegEx.test(format) && !standartFormatRegEx.test(format);

        if (isCustomFormat) {
            format = format.split(';');
            customFormat = format[0];
            negativeFormat = format[1];
            zeroFormat = format[2];
            format = (sign && negativeFormat ? negativeFormat : customFormat).indexOf('%') != -1 ? 'p' : 'n';
        }

        switch (format.toLowerCase().charAt(0)) {
            case 'd':
                return Math.round(number).toString();
            case 'c':
                type = 'currency'; break;
            case 'n':
                type = 'numeric'; break;
            case 'p':
                type = 'percent';
                if (!isTextBox) number = Math.abs(number) * 100;
                break;
            default:
                return number.toString();
        }

        var matches = format.match(dateCheck);
        if (matches) {
            digits = parseInt(matches[0], 10);
        }

        var zeroPad = function (str, count, left) {
            for (var l = str.length; l < count; l++)
                str = left ? ('0' + str) : (str + '0');

            return str;
        };

        var addGroupSeparator = function (number, groupSeperator, groupSize) {
            if (groupSeparator && groupSize != 0) {
                var regExp = new RegExp('(-?[0-9]+)([0-9]{' + groupSize + '})');
                while (regExp.test(number)) {
                    number = number.replace(regExp, '$1' + groupSeperator + '$2');
                }
            }
            return number;
        };

        var cultureInfo = cultureInfo || $t.cultureInfo,
            patterns = $t.patterns,
            undefined;

        //define Number Formating info.
        digits = digits || digits === 0 ? digits : cultureInfo[type + 'decimaldigits'];
        separator = separator !== undefined ? separator : cultureInfo[type + 'decimalseparator'];
        groupSeparator = groupSeparator !== undefined ? groupSeparator : cultureInfo[type + 'groupseparator'];
        groupSize = groupSize || groupSize == 0 ? groupSize : cultureInfo[type + 'groupsize'];
        negative = negative || negative === 0 ? negative : cultureInfo[type + 'negative'];
        positive = positive || positive === 0 ? positive : cultureInfo[type + 'positive'];
        symbol = symbol || cultureInfo[type + 'symbol'];

        var exponent, left, right;

        if (isCustomFormat) {
            var splits = (sign && negativeFormat ? negativeFormat : customFormat).split('.'),
                leftF = splits[0],
                rightF = splits.length > 1 ? splits[1] : '',
                lastIndexZero = $t.lastIndexOf(rightF, '0'),
                lastIndexSharp = $t.lastIndexOf(rightF, '#');
            digits = (lastIndexSharp > lastIndexZero ? lastIndexSharp : lastIndexZero) + 1;
        }

        var rounded = round(number, digits);
        number = isFinite(rounded) ? rounded : number;

        if (number.toString().toLowerCase().indexOf("e") > -1) {
            number = number.toFixed(digits);
        }

        var split = number.toString().split('.');

        left = split[0];
        left = sign ? left.replace('-', '') : left;

        right = split.length > 1 ? split[1] : '';

        if (exponent) {
            if (!sign) {
                right = zeroPad(right, exponent, false);
                left += right.slice(0, exponent);
                right = right.substr(exponent);
            } else {
                left = zeroPad(left, exponent + 1, true);
                right = left.slice(exponent, left.length) + right;
                left = left.slice(0, exponent);
            }
        }

        var rightLength = right.length;
        if (digits < 1 || (isCustomFormat && lastIndexZero == -1 && rightLength === 0))
            right = '';
        else
            right = rightLength > digits ? right.slice(0, digits) : zeroPad(right, digits, false);

        var result;
        if (isCustomFormat) {
            if (left == 0) left = '';

            left = injectInFormat(reverse(left), reverse(leftF), true).replace(/,/g, "");
            left = leftF.indexOf(',') != -1 ? addGroupSeparator(left, groupSeparator, groupSize) : left;

            right = right && rightF ? injectInFormat(right, rightF) : '';

            result = number === 0 && zeroFormat ? zeroFormat
                : (sign && !negativeFormat ? '-' : '') + left + (right.length > 0 ? separator + right : '');

        } else {

            left = addGroupSeparator(left, groupSeparator, groupSize)
            patterns = patterns[type];
            var pattern = sign ? patterns['negative'][negative]
                        : symbol ? patterns['positive'][positive]
                        : null;

            var numberString = left + (right.length > 0 ? separator + right : '');

            result = pattern ? pattern.replace('n', numberString).replace('*', symbol) : numberString;
        }
        return result;
    };
    /*============================*/

    $.extend($t.formatters, {
        date: $t.datetime.format,
        number: $t.formatNumber
    });

    $t.scripts = [];

    var jobs = [];

    function resolve(dependencies, callback) {
        var scripts = $t.scripts;

        dependencies = $.grep(dependencies, function (dependency) {
            dependency = dependency.toLowerCase().replace(".min", "");
            if (dependency.indexOf("jquery-") > -1 || (dependency.indexOf("jquery.validate") > -1 && $.fn.validate) || dependency.indexOf("telerik.common") > -1) {
                return false;
            }

            var loaded = false;

            for (var i = 0; i < scripts.length; i++) {
                var script = scripts[i];
                if (dependency.indexOf(script) > -1) {
                    loaded = true;
                    break;
                }
            }
            return !loaded;
        });

        var load = function (dependency) {
            if (dependency) {
                $.ajax({
                    url: dependency,
                    dataType: "script",
                    cache: !$.browser.msie, // otherwise IE6/7 do not execute the scripts after refresh
                    success: function () {
                        load(dependencies.shift());
                    }
                });
            } else {
                callback();
                jobs.shift();
                if (jobs.length) {
                    jobs[0]();
                }
            }
        };
        load(dependencies.shift());
    }

    $t.load = function (dependencies, callback) {
        jobs.push(function () {
            resolve(dependencies, callback);
        });

        if (jobs.length == 1) {
            resolve(dependencies, callback);
        }
    };

    $t.stringBuilder.prototype = {

        cat: function (what) {
            this.buffer.push(what);
            return this;
        },

        rep: function (what, howManyTimes) {
            for (var i = 0; i < howManyTimes; i++)
                this.cat(what);
            return this;
        },

        catIf: function () {
            var args = arguments;
            if (args[args.length - 1])
                for (var i = 0, length = args.length - 1; i < length; i++)
                    this.cat(args[i]);

            return this;
        },

        string: function () {
            return this.buffer.join('');
        }
    };

    $t.isTouch = "ontouchstart" in window;

    var moveEvent = "mousemove",
        startEvent = "mousedown",
        endEvent = "mouseup";

    if ($t.isTouch) {
        moveEvent = "touchmove";
        startEvent = "touchstart";
        endEvent = "touchend";
    }

    $.extend($.fn, {
        tScrollable: function (options) {
            $(this).each(function () {
                if ($t.isTouch || (options && options.force)) {
                    new Scroller(this);
                }
            });
        }
    });

    function Scroller(element) {
        this.element = element;
        this.wrapper = $(element);

        this._horizontalScrollbar = $('<div class="t-touch-scrollbar" />');
        this._verticalScrollbar = this._horizontalScrollbar.clone();
        this._scrollbars = this._horizontalScrollbar.add(this._verticalScrollbar);

        this._startProxy = $.proxy(this._start, this);
        this._stopProxy = $.proxy(this._stop, this);
        this._dragProxy = $.proxy(this._drag, this);

        this._create();
    }

    $t.touchLocation = function (e) {
        return {
            idx: 0,
            x: e.pageX,
            y: e.pageY
        };
    };

    $t.eventTarget = function (e) {
        return e.target;
    };

    $t.eventCurrentTarget = function (e) {
        return e.currentTarget;
    };

    if ($t.isTouch) {
        $t.touchLocation = function (e, id) {
            var changedTouches = e.changedTouches || e.originalEvent.changedTouches;

            if (id) {
                var output = null;
                each(changedTouches, function (idx, value) {
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
                if (e.type in { touchstart: {}, touchmove: {}, touchend: {}, touchcancel: {} }) {
                    return {
                        idx: changedTouches[0].identifier,
                        x: changedTouches[0].pageX,
                        y: changedTouches[0].pageY
                    };
                } else {
                    return {
                        idx: 0,
                        x: e.pageX,
                        y: e.pageY
                    };
                }
            }
        };

        $t.eventTarget = function (e) {
            var touches = "originalEvent" in e ? e.originalEvent.changedTouches : "changedTouches" in e ? e.changedTouches : null;

            return touches ? document.elementFromPoint(touches[0].clientX, touches[0].clientY) : null;
        };

        $t.eventCurrentTarget = $t.eventTarget;
    }

    $t.zoomLevel = function () {
        return $t.isTouch ? (document.documentElement.clientWidth / window.innerWidth) : 1;
    };

    Scroller.prototype = {
        _create: function () {
            this.wrapper
                .css("overflow", "hidden")
                .bind(startEvent, $.proxy(this._wait, this));

        },
        _wait: function (e) {
            var startLocation = $t.touchLocation(e);

            this.start = {
                x: startLocation.x + this.wrapper.scrollLeft(),
                y: startLocation.y + this.wrapper.scrollTop()
            };

            $(document)
                .bind(moveEvent, this._startProxy)
                .bind(endEvent, this._stopProxy);
        },
        _start: function (e) {
            var currentLocation = $t.touchLocation(e);
            this._dragged = false;

            if (this.start.x - currentLocation.x > 10 || this.start.y - currentLocation.y > 10) {
                e.preventDefault();

                this._dragged = true;

                $(document).unbind(moveEvent, this._startProxy)
                           .bind(moveEvent, this._dragProxy);

                var width = this.wrapper.innerWidth(),
                    height = this.wrapper.innerHeight(),
                    offset = this.wrapper.offset(),
                    scrollWidth = this.wrapper.attr("scrollWidth"),
                    scrollHeight = this.wrapper.attr("scrollHeight");

                if (scrollWidth > width) {
                    this._horizontalScrollbar
                        .appendTo(document.body)
                        .css({
                            width: Math.floor((width / scrollWidth) * width),
                            left: this.wrapper.scrollLeft() + offset.left + parseInt(this.wrapper.css("borderLeftWidth")),
                            top: offset.top + this.wrapper.innerHeight() + parseInt(this.wrapper.css("borderTopWidth")) - this._horizontalScrollbar.outerHeight()
                        });
                }

                if (scrollHeight > height) {
                    this._verticalScrollbar
                        .appendTo(document.body)
                        .css({
                            height: Math.floor((height / scrollHeight) * height),
                            top: this.wrapper.scrollTop() + offset.top + parseInt(this.wrapper.css("borderTopWidth")),
                            left: offset.left + this.wrapper.innerWidth() + parseInt(this.wrapper.css("borderLeftWidth")) - this._verticalScrollbar.outerWidth()
                        });
                }

                this._scrollbars
                    .stop()
                    .fadeTo(200, 0.5);
            }
        },

        _drag: function (e) {
            if (!this._dragged)
                e.preventDefault();

            var currentLocation = $t.touchLocation(e),
                offset = this.wrapper.offset(),
                startLeft = offset.left + parseInt(this.wrapper.css("borderLeftWidth")),
                startTop = offset.top + parseInt(this.wrapper.css("borderTopWidth")),
                horizontalDifference = this.start.x - currentLocation.x,
                verticalDifference = this.start.y - currentLocation.y,
                left = Math.max(startLeft, startLeft + horizontalDifference),
                top = Math.max(startTop, startTop + verticalDifference);

            left = Math.min(startLeft + this.wrapper.innerWidth() - this._horizontalScrollbar.outerWidth() - this._horizontalScrollbar.outerHeight(), left);
            top = Math.min(startTop + this.wrapper.innerHeight() - this._verticalScrollbar.outerHeight() - this._verticalScrollbar.outerWidth(), top);

            this._horizontalScrollbar.css("left", left);
            this._verticalScrollbar.css("top", top);

            this.wrapper
                .scrollLeft(horizontalDifference)
                .scrollTop(verticalDifference);
        },
        _stop: function () {
            $(document).unbind(moveEvent, this._startProxy)
                       .unbind(moveEvent, this._dragProxy)
                       .unbind(endEvent, this._stopProxy);

            this._scrollbars
                .stop()
                .fadeTo(400, 0);
        }
    };

    // Effects ($t.fx)

    var prepareAnimations = function (effects, target, end) {
        if (target.length == 0 && end) {
            end();
            return null;
        }

        var animationsToPlay = effects.list.length;

        return function () {
            if (--animationsToPlay == 0 && end)
                end();
        };
    };

    $.extend($t.fx, {
        _wrap: function (element) {
            if (!element.parent().hasClass('t-animation-container')) {
                element.wrap(
                             $('<div/>')
                             .addClass('t-animation-container')
                             .css({
                                 width: element.outerWidth(),
                                 height: element.outerHeight()
                             }));
            }

            return element.parent();
        },

        play: function (effects, target, options, end) {
            var afterAnimation = prepareAnimations(effects, target, end);

            if (afterAnimation === null) return;

            target.stop(false, true);

            for (var i = 0, len = effects.list.length; i < len; i++) {

                var effect = new $t.fx[effects.list[i].name](target);

                if (!target.data('effect-' + i)) {
                    effect.play(
                    $.extend(
                        effects.list[i], {
                            openDuration: effects.openDuration,
                            closeDuration: effects.closeDuration
                        },
                        options), afterAnimation);

                    target.data('effect-' + i, effect);
                }
            }
        },

        rewind: function (effects, target, options, end) {
            var afterAnimation = prepareAnimations(effects, target, end);

            if (afterAnimation === null) return;

            for (var i = effects.list.length - 1; i >= 0; i--) {
                var effect = target.data('effect-' + i) || new $t.fx[effects.list[i].name](target);

                effect.rewind(
                    $.extend(
                        effects.list[i], {
                            openDuration: effects.openDuration,
                            closeDuration: effects.closeDuration
                        },
                        options), afterAnimation);

                target.data('effect-' + i, null);
            }
        }
    });

    // simple show/hide toggle

    $t.fx.toggle = function (element) {
        this.element = element.stop(false, true);
    };

    $t.fx.toggle.prototype = {
        play: function (options, end) {
            this.element.show();
            if (end) end();
        },
        rewind: function (options, end) {
            this.element.hide();
            if (end) end();
        }
    };

    $t.fx.toggle.defaults = function () {
        return { list: [{ name: 'toggle'}] };
    };

    // slide animation

    $t.fx.slide = function (element) {
        this.element = element;

        this.animationContainer = $t.fx._wrap(element);
    };

    $t.fx.slide.prototype = {
        play: function (options, end) {

            var animationContainer = this.animationContainer;

            this.element.css('display', 'block').stop();

            animationContainer
                .css({
                    display: 'block',
                    overflow: 'hidden'
                });

            var width = this.element.outerWidth();
            var height = this.element.outerHeight();
            var animatedProperty = options.direction == 'bottom' ? 'marginTop' : 'marginLeft';
            var animatedStartValue = options.direction == 'bottom' ? -height : -width;

            animationContainer
                .css({
                    width: width,
                    height: height
                });

            var animationEnd = {};
            animationEnd[animatedProperty] = 0;

            this.element
                .css('width', this.element.width())
                .each(function () { this.style.cssText = this.style.cssText; })
                .css(animatedProperty, animatedStartValue)
                .animate(animationEnd, {
                    queue: false,
                    duration: options.openDuration,
                    easing: 'linear',
                    complete: function () {
                        animationContainer.css('overflow', '');

                        if (end) end();
                    }
                });
        },

        rewind: function (options, end) {
            var animationContainer = this.animationContainer;

            this.element.stop(false, true);

            animationContainer.css({
                overflow: 'hidden'
            });

            var animatedProperty;

            switch (options.direction) {
                case 'bottom': animatedProperty = { marginTop: -this.element.outerHeight() };
                    break;
                case 'right': animatedProperty = { marginLeft: -this.element.outerWidth() }; break;
            }

            this.element
                .animate(animatedProperty, {
                    queue: false,
                    duration: options.closeDuration,
                    easing: 'linear',
                    complete: function () {
                        animationContainer
                            .css({
                                display: 'none',
                                overflow: ''
                            });

                        if (end) end();
                    }
                });
        }
    };

    $t.fx.slide.defaults = function () {
        return { list: [{ name: 'slide'}], openDuration: 'fast', closeDuration: 'fast' };
    };

    // property animation

    $t.fx.property = function (element) {
        this.element = element;
    };

    $t.fx.property.prototype = {
        _animate: function (properties, duration, reverse, end) {
            var startValues = { overflow: 'hidden' },
                endValues = {},
                $element = this.element;

            $.each(properties, function (i, prop) {
                var value;

                switch (prop) {
                    case 'height':
                    case 'width': value = $element[prop](); break;

                    case 'opacity': value = 1; break;

                    default: value = $element.css(prop); break;
                }

                startValues[prop] = reverse ? value : 0;
                endValues[prop] = reverse ? 0 : value;
            });

            $element.css(startValues)
                    .show()
                    .animate(endValues, {
                        queue: false,
                        duration: duration,
                        easing: 'linear',
                        complete: function () {
                            if (reverse)
                                $element.hide();

                            $.each(endValues, function (property) {
                                endValues[property] = '';
                            });

                            $element.css($.extend({ overflow: '' }, endValues));

                            if (end) end();
                        }
                    });
        },

        play: function (options, complete) {
            this._animate(options.properties, options.openDuration, false, complete);
        },

        rewind: function (options, complete) {
            this._animate(options.properties, options.closeDuration, true, complete);
        }
    }

    $t.fx.property.defaults = function () {
        return { list: [{ name: 'property', properties: arguments}], openDuration: 'fast', closeDuration: 'fast' };
    };

    // fix the MVC validation code for IE (document.getElementsByName matches `id` and `name` instead of just `name`). http://www.w3.org/TR/REC-DOM-Level-1/level-one-html.html#ID-71555259
    $(document).ready(function () {
        if ($.browser.msie && typeof (Sys) != 'undefined' && typeof (Sys.Mvc) != 'undefined' && typeof (Sys.Mvc.FormContext) != 'undefined') {
            var patch = function (formElement, name) {
                return $.grep(formElement.getElementsByTagName('*'), function (element) {
                    return element.name == name;
                });
            };

            if (Sys.Mvc.FormContext)
                Sys.Mvc.FormContext.$F = Sys.Mvc.FormContext._getFormElementsWithName = patch;
        }

    });

    /*core.js*/
    //==============================================================
    //==============================================================
    //==============================================================
    //==============================================================
    //==============================================================
    //==============================================================
    //==============================================================
    //==============================================================    
    var extend = $.extend,
        proxy = $.proxy,
        type = $.type,
        isFunction = $.isFunction,
        isPlainObject = $.isPlainObject,
        isEmptyObject = $.isEmptyObject,
        each = $.each,
        noop = $.noop;

    //Event ================================
    function Event() {
        this._isPrevented = false;
    }

    Event.prototype = {
        preventDefault: function () {
            this._isPrevented = true;
        },
        isDefaultPrevented: function () {
            return this._isPrevented;
        }
    };

    //Class =====================================
    function Class() {
    }

    Class.extend = function (proto) {
        var base = function () { },
            that = this,
            subclass = proto && proto.init ? proto.init : function () {
                that.apply(this, arguments);
            },
            subProto;

        base.prototype = that.prototype;
        subProto = subclass.fn = subclass.prototype = extend(new base, proto);

        for (var member in subProto) {
            if (typeof subProto[member] === "object") {
                subProto[member] = extend(true, {}, base.prototype[member], proto[member]);
            }
        }

        subProto.constructor = subclass;
        subclass.extend = that.extend;

        return subclass;
    };

    $.telerik.Class = Class;

    //Observable ================================
    var Observable = Class.extend({

        init: function () {
            this._events = {};
        },

        bind: function (eventName, handlers) {
            var that = this,
                idx,
                eventNames = $.isArray(eventName) ? eventName : [eventName],
                length,
                events;

            for (idx = 0, length = eventNames.length; idx < length; idx++) {
                eventName = eventNames[idx];

                handler = $.isFunction(handlers) ? handlers : handlers[eventName];

                if (handler) {
                    events = that._events[eventName] || []
                    events.push(handler);
                    that._events[eventName] = events;
                }
            }

            return that;
        },

        trigger: function (eventName, parameter) {
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

        unbind: function (eventName, handler) {
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

    //Query =========================================
    var Comparer = {
        selector: function (field) {
            if ($.isFunction(field)) {
                return  field 
            } else {
                var accessor = getter(field);
                return function (record) {
                        var value = accessor(record);
                        if (typeof value === "string") {
                            var date = /^\/Date\((.*?)\)\/$/.exec(value);
                            if (date) {
                                value = new Date(parseInt(date[1]));
                                return value;
                            }
                        }
                        return value;
                    }
            }
        },
        asc: function (field) {
            var selector = this.selector(field);
            return function (a, b) {
                a = selector(a);
                b = selector(b);

                return a > b ? 1 : (a < b ? -1 : 0);
            };
        },
        desc: function (field) {
            var selector = this.selector(field);
            return function (a, b) {
                a = selector(a);
                b = selector(b);

                return a < b ? 1 : (a > b ? -1 : 0);
            };
        },
        create: function (descriptor) {
            return Comparer[descriptor.dir.toLowerCase()](descriptor.field);
        },
        combine: function (comparers) {
            return function (a, b) {
                var result = comparers[0](a, b),
                     idx,
                     length;

                for (idx = 1, length = comparers.length; idx < length; idx++) {
                    result = result || comparers[idx](a, b);
                }

                return result;
            }
        }
    };

    var operators = (function(){
         var quoteRegExp = /(?=['\\])/g;
         var dateRegExp = /^\/Date\((.*?)\)\/$/;

         function quote(value) {
             return value.replace(quoteRegExp, "\\");
         }
 
         function operator(op, a, b, ignore) {
             var date;
 
             if (b != null) {
                 if (typeof b === "string") {
                     b = quote(b);
                     date = dateRegExp.exec(b);
                     if (date) {
                         b = new Date(+date[1]);
                     } else if (ignore) {
                         b = "'" + b.toLowerCase() + "'";
                         a = a + ".toLowerCase()";
                     } else {
                         b = "'" + b + "'";
                     }
                 }
 
                 if (b.getTime) {
                     //b looks like a Date
                     a = "(" + a + "?(" + a + ".getTime ? " + a + ".getTime(): new Date(+(/^\\/Date\\((.*?)\\)\\/$/.exec(" + a + "))[1]).getTime()):" + a + ")";
                     b = b.getTime();
                 }
             }
 
             return a + " " + op + " " + b;
         }
 
         return {
             eq: function(a, b, ignore) {
                 return operator("==", a, b, ignore);
             },
             neq: function(a, b, ignore) {
                 return operator("!=", a, b, ignore);
             },
             gt: function(a, b, ignore) {
                 return operator(">", a, b, ignore);
             },
             gte: function(a, b, ignore) {
                 return operator(">=", a, b, ignore);
             },
             lt: function(a, b, ignore) {
                 return operator("<", a, b, ignore);
             },
             lte: function(a, b, ignore) {
                 return operator("<=", a, b, ignore);
             },
             startswith: function(a, b, ignore) {
                 if (ignore) {
                     a = a + ".toLowerCase()";
                     if (b) {
                         b = b.toLowerCase();
                     }
                 }
 
                 if (b) {
                     b = quote(b);
                 }
 
                 return a + ".lastIndexOf('" + b + "', 0) == 0";
             },
             endswith: function(a, b, ignore) {
                 if (ignore) {
                     a = a + ".toLowerCase()";
                     if (b) {
                         b = b.toLowerCase();
                     }
                 }
 
                 if (b) {
                     b = quote(b);
                 }
 
                 return a + ".lastIndexOf('" + b + "') == " + a + ".length - " + (b || "").length;
             },
             contains: function(a, b, ignore) {
                 if (ignore) {
                     a = a + ".toLowerCase()";
                     if (b) {
                         b = b.toLowerCase();
                     }
                 }
 
                 if (b) {
                     b = quote(b);
                 }
 
                 return a + ".indexOf('" + b + "') >= 0";
             },
             doesnotcontain: function(a, b, ignore) {
                 if (ignore) {
                     a = a + ".toLowerCase()";
                     if (b) {
                         b = b.toLowerCase();
                     }
                 }
 
                 if (b) {
                     b = quote(b);
                 }
 
                 return a + ".indexOf('" + b + "') == -1";
             }
         };
     })();
 
    var Query = function (data) {
        return new Query.fn.init(data);
    };

    var operatorMap = {
         "==": "eq",
         equals: "eq",
         isequalto: "eq",
         equalto: "eq",
         equal: "eq",
         "!=": "neq",
         ne: "neq",
         notequals: "neq",
         isnotequalto: "neq",
         notequalto: "neq",
         notequal: "neq",         
         "<": "lt",
         islessthan: "lt",
         lessthan: "lt",
         less: "lt",
         "<=": "lte",
         le: "lte",
         islessthanorequalto: "lte",
         lessthanequal: "lte",
         ">": "gt",
         isgreaterthan: "gt",
         greaterthan: "gt",
         greater: "gt",
         ">=": "gte",
         isgreaterthanorequalto: "gte",
         greaterthanequal: "gte",
         ge: "gte",
         substringof: "contains",
         notsubstringof: "doesnotcontain"
     };

      function normalizeOperator(expression) {
         var idx,
             length,
             filter,
             operator,
             filters = expression.filters;

         if (filters) {
             for (idx = 0, length = filters.length; idx < length; idx++) {
                 filter = filters[idx];
                 operator = filter.operator;

                 if (operator && typeof operator === "string") {
                     filter.operator = operatorMap[operator.toLowerCase()] || operator;
                 }

                 normalizeOperator(filter);
             }
         }
     }

     function normalizeFilter(expression) {
         if (expression && !isEmptyObject(expression)) {
             if ($.isArray(expression) || !expression.filters) {
                 expression = {
                     logic: "and",
                     filters: $.isArray(expression) ? expression : [expression]
                 };
             }

             normalizeOperator(expression);

             return expression;
         }
     }

    Query.normalizeFilter = normalizeFilter;       

    Query.filterExpr = function(expression) {
        var expressions = [],
            logic = { and: " && ", or: " || " },
            idx,
            length,
            filter,
            expr,
            fieldFunctions = [],
            operatorFunctions = [],
            field,
            operator,
            filters = expression.filters;

        for (idx = 0, length = filters.length; idx < length; idx++) {
            filter = filters[idx];
            field = filter.field;
            operator = filter.operator;

            if (filter.filters) {
                expr = Query.filterExpr(filter);
                //Nested function fields or operators - update their index e.g. __o[0] -> __o[1]
                filter = expr.expression
                .replace(/__o\[(\d+)\]/g, function(match, index) {
                    index = +index;
                    return "__o[" + (operatorFunctions.length + index) + "]";
                })
                .replace(/__f\[(\d+)\]/g, function(match, index) {
                    index = +index;
                    return "__f[" + (fieldFunctions.length + index) + "]";
                });

                operatorFunctions.push.apply(operatorFunctions, expr.operators);
                fieldFunctions.push.apply(fieldFunctions, expr.fields);
            } else {
                if (typeof field === "function") {
                    expr = "__f[" + fieldFunctions.length +"](d)";
                    fieldFunctions.push(field);
                } else {
                    expr = $t.expr(field);
                }

                if (typeof operator === "function") {
                    filter = "__o[" + operatorFunctions.length + "](" + expr + ", " + filter.value + ")";
                    operatorFunctions.push(operator);
                } else {
                    filter = operators[(operator || "eq").toLowerCase()](expr, filter.value, filter.ignoreCase !== undefined? filter.ignoreCase : true);
                }
            }

            expressions.push(filter);
        }
        return  { expression: "(" + expressions.join(logic[expression.logic]) + ")", fields: fieldFunctions, operators: operatorFunctions };
    };

    $t.query = Query;

    Query.expandSort = function (field, dir) {
        var descriptor = typeof field === "string" ? { field: field, dir: dir} : field,
            descriptors = $.isArray(descriptor) ? descriptor : (descriptor !== undefined ? [descriptor] : []);

        return $.grep(descriptors, function (d) { return !!d.dir; });
    }
    
    Query.expandAggregates = function (expressions) {
        return expressions = $.isArray(expressions) ? expressions : [expressions];
    }
    Query.expandGroup = function (field, dir) {
        var descriptor = typeof field === "string" ? { field: field, dir: dir} : field,
           descriptors = $.isArray(descriptor) ? descriptor : (descriptor !== undefined ? [descriptor] : []);

        return $.map(descriptors, function (d) { return { field: d.field, dir: d.dir || "asc", aggregates: d.aggregates }; });
    }

    Query.fn = Query.prototype = {
        init: function (data) {
            this.data = data || [];
            return this;
        },
        toArray: function () {
            return this.data;
        },
        skip: function (count) {
            return new Query(this.data.slice(count));
        },
        take: function (count) {
            return new Query(this.data.slice(0, count));
        },
        orderBy: function (selector) {
            var result = this.data.slice(0),
                comparer = $.isFunction(selector) || !selector ? Comparer.asc(selector) : selector.compare;

            return new Query(result.sort(comparer));
        },
        orderByDescending: function (selector) {
            return new Query(this.data.slice(0).sort(Comparer.desc(selector)));
        },
        sort: function (field, dir) {
            var idx,
                length,
                descriptors = Query.expandSort(field, dir),
                comparers = [];

            if (descriptors.length) {
                for (idx = 0, length = descriptors.length; idx < length; idx++) {
                    comparers.push(Comparer.create(descriptors[idx]));
                }

                return this.orderBy({ compare: Comparer.combine(comparers) });
            }

            return this;
        },
        filter: function(expressions) {
          var idx,
             current,
             length,
             compiled,
             predicate,
             data = this.data,
             fields,
             operators,
             result = [],
             filter;

             expressions = normalizeFilter(expressions);

             if (!expressions || expressions.filters.length === 0) {
                 return this;
             }

             compiled = Query.filterExpr(expressions);
             fields = compiled.fields;
             operators = compiled.operators;

             predicate = filter = new Function("d, __f, __o", "return " + compiled.expression);

             if (fields.length || operators.length) {
                 filter = function(d) {
                     return predicate(d, fields, operators);
                 };
             }

             for (idx = 0, length = data.length; idx < length; idx++) {
                 current = data[idx];

                 if (filter(current)) {
                     result.push(current);
                 }
             }
             return new Query(result);
         },
        where: function (predicate) {
            return Query(filter(this.data, predicate));
        },
        select: function (selector) {
            return Query(map(this.data, selector));
        },
        concat: function (value) {
            return Query(this.data.concat(value.data));
        },
        count: function () {
            return this.data.length;
        },
        any: function (predicate) {
            if ($.isFunction(predicate)) {
                for (var index = 0, length = this.data.length; index < length; index++) {
                    if (predicate(this.data[index], index)) {
                        return true;
                    }
                }

                return false;
            }
            return !!this.data.length;
        },
        group: function (descriptors, allData) {
            descriptors = Query.expandGroup(descriptors || []);
            allData = allData || this.data;

            var that = this,
                result = new Query(that.data),
                descriptor;

            if (descriptors.length > 0) {
                descriptor = descriptors[0];
                result = result.groupBy(descriptor).select(function (group) {
                    var data = new Query(allData).filter([{ field: group.field, operator: "eq", value: group.value}]);
                    return {
                        field: group.field,
                        value: group.value,
                        items: descriptors.length > 1 ? new Query(group.items).group(descriptors.slice(1), data.toArray()).toArray() : group.items,
                        hasSubgroups: descriptors.length > 1,
                        aggregates: data.aggregate(descriptor.aggregates)
                    }
                });
            }
            return result;
        },
        groupBy: function (descriptor) {
            if (isEmptyObject(descriptor) || !this.data.length) {
                return new Query([]);
            }

            var field = descriptor.field,
                sorted = this.sort(field, descriptor.dir || "asc").toArray(),
                accr = accessor(field),
                item,
                groupValue = accr.get(sorted[0], field),
                aggregate = {},
                group = {
                    field: field,
                    value: groupValue,
                    items: []
                },
                currentValue,
                idx,
                len,
                result = [group];

            for (idx = 0, len = sorted.length; idx < len; idx++) {
                item = sorted[idx];
                currentValue = accr.get(item, field);
                if (groupValue !== currentValue) {
                    groupValue = currentValue;
                    aggregate = {};
                    group = {
                        field: field,
                        value: groupValue,
                        items: []
                    };
                    result.push(group);
                }
                group.items.push(item);
            }
            return new Query(result);
        },
        aggregate: function (aggregates) {
            var idx,
                len,
                result = {};

            for (idx = 0, len = this.data.length; idx < len; idx++) {
                calculateAggregate(result, aggregates, this.data[idx], idx, len);
            }
            return result;
        }
    }

    function calculateAggregate(accumulator, aggregates, item, index, length) {
        aggregates = aggregates || [];
        var idx,
            aggr,
            functionName,
            fieldAccumulator,
            len = aggregates.length;

        for (idx = 0; idx < len; idx++) {
            aggr = aggregates[idx];
            functionName = aggr.aggregate;
            var field = aggr.field;
            accumulator[field] = accumulator[field] || {};
            accumulator[field][functionName] = functions[functionName.toLowerCase()](accumulator[field][functionName], item, accessor(field), index, length);
        }
    }

    var functions = {
        sum: function (accumulator, item, accessor) {
            return accumulator = (accumulator || 0) + accessor.get(item);
        },
        count: function (accumulator, item, accessor) {
            return (accumulator || 0) + 1;
        },
        average: function (accumulator, item, accessor, index, length) {
            accumulator = (accumulator || 0) + accessor.get(item);
            if (index == length - 1) {
                accumulator = accumulator / length;
            }
            return accumulator;
        },
        max: function (accumulator, item, accessor) {
            var accumulator = (accumulator || 0),
                value = accessor.get(item);
            if (accumulator < value) {
                accumulator = value;
            }
            return accumulator;
        },
        min: function (accumulator, item, accessor) {
            var value = accessor.get(item),
                accumulator = (accumulator || value)
            if (accumulator > value) {
                accumulator = value;
            }
            return accumulator;
        }
    };
    Query.fn.init.prototype = Query.fn;
    //End Query =========================================

    //Model =============================================
    var type = $.type,
        UPDATED = "UPDATED",
        PRISTINE = "PRISTINE",
        CREATED = "CREATED",
        DESTROYED = "DESTROYED";

    function equal(x, y) {
        if (x === y) {
            return true;
        }

        var xtype = type(x), ytype = type(y), field;

        if (xtype !== ytype) {
            return false;
        }

        if (xtype === "date") {
            return x.getTime() === y.getTime();
        }

        if (xtype !== "object" && xtype !== "array") {
            return false;
        }

        for (field in x) {
            if (!equal(x[field], y[field])) {
                return false;
            }
        }

        return true;
    }
    var expr =  function (expression, safe) {
        expression = expression || "";

        if (expression && expression.charAt(0) !== "[") {
            expression = "." + expression;
        }

        if (safe) {
            expression = wrapExpression(expression.split("."));
        } else {
            expression = "d" + expression;
        }

        return expression;
    },
    getter = function (expression, safe) {        
        return new Function("d", "return " + expr(expression, safe));
    },
    setter = function (expression) {
        return new Function("d,value", "d." + expression + "=value");
    },
    accessor = function (expression) {
        return {
            get: getter(expression),
            set: setter(expression)
        }
    };

    var wrapExpression = function (members) {
        var result = "d",
            index,
            idx,
            length,
            member,
            count = 1;

        for (idx = 0, length = members.length; idx < length; idx++) {
            member = members[idx];
            if (member !== "") {
                index = member.indexOf("[");

                if (index != 0) {
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
    }

    var Model = Observable.extend({
        init: function (data) {
            var that = this;

            Observable.fn.init.call(that);

            that.state = PRISTINE;

            that._accessors = {};

            that._modified = false;

            that.data = extend(true, {}, data);
            that.pristine = extend(true, {}, data);

            if (that.id() === undefined) {
                that.state = CREATED;
                that.data["__id"] = that.guid();
            }
        },

        guid: function () {
            var id = "", i, random;

            for (i = 0; i < 32; i++) {
                random = Math.random() * 16 | 0;

                if (i == 8 || i == 12 || i == 16 || i == 20) {
                    id += "-";
                }
                id += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
            }

            return id;
        },

        accessor: function (field) {
            var accessors = this._accessors;

            return accessors[field] = accessors[field] || accessor(field);
        },

        get: function (field) {
            var that = this,
                accessor = that.accessor(field);

            return accessor.get(that.data);
        },

        set: function (fields, value) {
            var that = this,
                field,
                values = {},
                accessor;

            if (typeof fields === "string") {
                values[fields] = value;
            } else {
                values = fields;
            }

            that._modified = false;

            for (field in values) {
                accessor = that.accessor(field);

                value = values[field];

                if (!equal(value, accessor.get(that.data))) {
                    accessor.set(that.data, value);
                    that._modified = true;
                }
            }

            if (that._modified) {
                that.state = that.isNew() ? CREATED : UPDATED;
                that.trigger("change");
            }
        },

        isNew: function () {
            return this.state === CREATED;
        },

        destroy: function () {
            this.state = DESTROYED;
        },

        changes: function () {
            var modified = null,
                field,
                that = this,
                data = that.data,
                pristine = that.pristine;

            for (field in data) {
                if (field !== "__id" && !equal(pristine[field], data[field])) {
                    modified = modified || {};
                    modified[field] = data[field];
                }
            }

            return modified;
        }
    });

    Model.define = function (options) {
        var model,
            proto = options || {},
            id = proto.id || "id",
            set,
            get;

        if ($.isFunction(id)) {
            get = id;
            set = id;
        } else {
            get = getter(id);
            set = setter(id);
        }

        id = function (data, value) {
            if (value === undefined) {
                return data["__id"] || get(data);
            } else {
                set(data, value);
            }
        }

        proto.id = function (value) {
            return id(this.data, value);
        }

        model = Model.extend(proto);
        model.id = id;

        return model;
    }

    Model.UPDATED = UPDATED;
    Model.PRISTINE = PRISTINE;
    Model.CREATED = CREATED;
    Model.DESTROYED = DESTROYED;

    //DataSource ========================================
    var CREATE = "create",
        READ = "read",
        UPDATE = "update",
        DESTROY = "destroy",
        CHANGE = "change",
        ERROR = "error",
        crud = [CREATE, READ, UPDATE, DESTROY],
        identity = function (o) { return o; };


    function process(data, options) {
        var query = new Query(data),
            options = options || {},
            page = options.page,
            pageSize = options.pageSize,
            group = options.group,
            sort = Query.expandSort(options.sort).concat(Query.expandGroup(group || [])),
            total,
            filter = options.filter;

        if (filter) {
            query = query.filter(filter);
            total = query.toArray().length;
        }

        if (sort) {
            query = query.sort(sort);
        }

        if (page !== undefined && pageSize !== undefined) {
            query = query.skip((page - 1) * pageSize).take(pageSize);
        }

        if (group) {
            query = query.group(group, data);
        }

        return {
            total: total,
            data: query.toArray()
        };
    }

    function calculateAggregates(data, options) {
        var query = new Query(data),
            options = options || {},
            aggregates = options.aggregates,
            filter = options.filter;

        if (filter) {
            query = query.filter(filter);
        }
        return query.aggregate(aggregates);
    }

    var LocalTransport = Class.extend({
        init: function (options) {
            this.data = options.data;
        },

        read: function (options) {
            options.success(this.data);
        },
        update: noop
    });

    var RemoteTransport = Class.extend({
        init: function (options) {
            var that = this;

            options = that.options = extend({}, that.options, options);

            each(crud, function (index, type) {
                if (typeof options[type] === "string") {
                    options[type] = {
                        url: options[type]
                    };
                }
            });

            that.cache = options.cache ? Cache.create(options.cache) : {
                find: noop,
                add: noop
            }

            that.dialect = options.dialect;
        },

        options: {
            dialect: {
                read: identity,
                update: identity,
                destroy: identity,
                create: identity
            }
        },

        create: function (options) {
            $.ajax(this.setup(options, CREATE));
        },

        read: function (options) {
            var that = this,
                success,
                error,
                result,
                cache = that.cache;

            options = that.setup(options, READ);

            success = options.success || noop;
            error = options.error || noop;

            result = cache.find(options.data);

            if (result !== undefined) {
                success(result);
            } else {
                options.success = function (result) {
                    cache.add(options.data, result);

                    success(result);
                };
                $.ajax(options);
            }
        },

        update: function (options) {
            $.ajax(this.setup(options, UPDATE));
        },

        destroy: function (options) {
            $.ajax(this.setup(options, DESTROY));
        },

        setup: function (options, type) {
            options = options || {};

            var that = this,
                operation = that.options[type],
                data = isFunction(operation.data) ? operation.data() : operation.data;

            options = extend(true, {}, operation, options);
            options.data = that.dialect[type](extend(data, options.data));

            return options;
        }
    });

    Cache.create = function (options) {
        var store = {
            "inmemory": function () { return new Cache(); },
            "localstorage": function () { return new LocalStorageCache(); }
        };

        if (isPlainObject(options) && isFunction(options.find)) {
            return options;
        }

        if (options === true) {
            return new Cache();
        }

        return store[options]();
    }

    function Cache() {
        this._store = {};
    }

    Cache.prototype = {
        add: function (key, data) {
            if (key !== undefined) {
                this._store[stringify(key)] = data;
            }
        },
        find: function (key) {
            return this._store[stringify(key)];
        },
        clear: function () {
            this._store = {};
        },
        remove: function (key) {
            delete this._store[stringify(key)];
        }
    }

    function LocalStorageCache() {
        this._store = window.localStorage;
    }

    LocalStorageCache.prototype = {
        add: function (key, data) {
            if (key != undefined) {
                this._store.setItem(stringify(key), stringify(data));
            }
        },
        find: function (key) {
            return $.parseJSON(this._store.getItem(stringify(key)));
        },
        clear: function () {
            this._store.clear();
        },
        remove: function (key) {
            this._store.removeItem(stringify(key));
        }
    }

    var DataSource = Observable.extend({
        init: function (options) {
            var that = this, id, model, transport;

            options = that.options = extend({}, that.options, options);

            extend(that, {
                _map: {},
                _models: {},
                _data: [],
                _view: [],
                _pageSize: options.pageSize,
                _page: options.page || (options.pageSize ? 1 : undefined),
                _sort: options.sort,
                _filter: options.filter,
                _group: options.group,
                _aggregates: options.aggregates
            });

            Observable.fn.init.call(that);

            model = options.model;
            transport = options.transport;

            if (model === undefined) {
                model = {};
            } else if (isPlainObject(model)) {
                options.model = model = Model.define(model);
            }

            id = model.id;

            that._deserializer = extend({
                data: identity,
                total: function (data) {
                    return data.length;
                },
                status: function (data) {
                    return data.status;
                },
                groups: function (data) {
                    return data;
                },
                aggregates: function (data) {
                    return {};
                }
            }, options.deserializer);

            if (transport) {
                that.transport = isFunction(transport.read) ? transport : new RemoteTransport(transport);
            } else {
                that.transport = new LocalTransport({ data: options.data });
            }

            if (id) {
                that.find = function (id) {
                    return that._data[that._map[id]];
                };
                that.id = function (record) {
                    return id(record);
                };
            } else {
                that.find = that.at;
            }

            that.bind([ERROR, CHANGE, CREATE, DESTROY, UPDATE], options);
        },

        options: {
            data: [],
            serverSorting: false,
            serverPaging: false,
            serverFiltering: false,
            serverGrouping: false,
            serverAggregates: false,
            autoSync: false,
            sendAllFields: true,
            batch: {
                mode: "multiple"
            }
        },

        model: function (id) {
            var that = this,
                model = id && that._models[id];

            if (!model) {
                model = new that.options.model(that.find(id));
                that._models[model.id()] = model;
                model.bind(CHANGE, function () {
                    that.trigger(UPDATE, { model: model });
                });
            }

            return model;
        },

        _idMap: function (data) {
            var that = this, id = that.id, idx, length, map = {};

            if (id) {
                for (idx = 0, length = data.length; idx < length; idx++) {
                    map[id(data[idx])] = idx;
                }
            }

            that._map = map;
        },

        _byState: function (state, selector) {
            var models = this._models,
                result = [],
                model,
                selector = selector || identity,
                id;

            for (id in models) {
                model = models[id];

                if (model.state === state) {
                    result.push(selector(model));
                }
            }

            return result;
        },

        _createdModels: function () {
            return this._byState(Model.CREATED, function (model) {
                return model.data;
            });
        },

        _updatedModels: function () {
            var that = this,
                sendAllFields = that.options.sendAllFields;
            return that._byState(Model.UPDATED, function (model) {
                if (sendAllFields) {
                    return model.data;
                }

                return model.changes();
            });
        },

        _destroyedModels: function () {
            var that = this,
                options = that.options;

            return that._byState(Model.DESTROYED, function (model) {
                var data = {};

                if (options.sendAllFields) {
                    return model.data;
                }

                options.model.id(data, model.id());

                return data;
            });
        },

        sync: function () {
            var that = this,
                updated,
                created,
                destroyed,
                batch = that.options.batch,
                mode,
                transport = that.transport,
                promises = that._promises = [];

            updated = that._updatedModels();

            created = that._createdModels();

            destroyed = that._destroyedModels();

            if (batch === false) {
                mode = "multiple";
            }
            else if ((batch.mode || "multiple") === "multiple") {
                mode = "single";
            }

            if (mode) {
                that._send(created, proxy(transport.create, transport), mode);
                that._send(updated, proxy(transport.update, transport), mode);
                that._send(destroyed, proxy(transport.destroy, transport), mode);
            } else {
                that._send({
                    created: created,
                    updated: updated,
                    destroyed: destroyed
                },
                    proxy(transport.update, transport),
                    "single"
                );
            }

            $.when.apply(null, promises).then(function () {
                that.trigger(CHANGE);
            });
        },

        _syncSuccess: function (origData, data) {
            var that = this,
                origValue,
                origId,
                models = that._models,
                map = that._map,
                deserializer = that._deserializer;

            if (!deserializer.status(data)) {
                return that.error({ data: origData });
            }

            $.each(origData, function (index, value) {
                delete models[that.id(value)];
            });

            data = deserializer.data(data);
            $.each(data, function (index, value) {
                origValue = origData[index];
                if (origValue) {
                    origId = that.id(origValue);
                    index = map[origId];

                    if (index >= 0) {
                        that._data[index] = value;
                    }
                }
            });
            that._idMap(that._data);
        },

        _syncError: function (origData, data) {
            this.error({ data: origData });
        },

        _send: function (data, method, mode) {
            var that = this,
                idx,
                promises = that._promises,
                success = proxy(that._syncSuccess, that, data),
                error = proxy(that._syncError, that, data);

            if (data.length == 0) {
                return;
            }

            if (mode === "multiple") {
                for (idx = 0, length = data.length; idx < length; idx++) {
                    promises.push(
                        method({
                            data: data[idx],
                            success: success,
                            error: error
                        })
                    );
                }
            } else {
                promises.push(
                    method({
                        data: data,
                        success: success,
                        error: error
                    })
                );
            }

            return promises;
        },

        create: function (index, values) {
            var that = this,
                data = that._data,
                model = that.model();

            if (typeof index !== "number") {
                values = index;
                index = undefined;
            }

            model.set(values);

            index = index !== undefined ? index : data.length;

            data.splice(index, 0, model.data);

            that._idMap(data);

            that.trigger(CREATE, { model: model });

            return model;
        },

        read: function (additionalData) {
            var that = this,
                options = extend(additionalData, {
                    page: that._page,
                    pageSize: that._pageSize,
                    sort: that._sort,
                    filter: that._filter,
                    group: that._group,
                    aggregates: that._aggregates
                });

            that.transport.read({
                data: options,
                success: proxy(that.success, that),
                error: proxy(that.error, that)
            });
        },

        update: function (id, values) {
            var that = this,
            model = that.model(id);

            if (model) {
                model.set(values);
            }
        },

        destroy: function (id) {
            var that = this,
            model = that.model(id);

            if (model) {
                that._data.splice(that._map[id], 1);

                that._idMap(that._data);

                model.destroy();

                that.trigger(DESTROY, { model: model });
            }
        },

        error: function () {
            this.trigger(ERROR, arguments);
        },

        success: function (data) {
            var that = this,
            options = {},
            result,
            updated = Model ? that._updatedModels() : [],
            hasGroups = that.options.serverGrouping === true && that._group && that._group.length > 0,
            models = that._models;

            that._total = that._deserializer.total(data);

            if (that._aggregates && that.options.serverAggregates) {
                that._aggregateResult = that._deserializer.aggregates(data);
            }

            if (hasGroups) {
                data = that._deserializer.groups(data);
            } else {
                data = that._deserializer.data(data);
            }

            that._data = data;

            $.each(updated, function () {
                var updatedId = that.id(this);
                $.each(data, function () {
                    if (updatedId === that.id(this)) {
                        delete models[updatedId];
                    }
                });
            });

            if (that.options.serverPaging !== true) {
                options.page = that._page;
                options.pageSize = that._pageSize;
            }

            if (that.options.serverSorting !== true) {
                options.sort = that._sort;
            }

            if (that.options.serverFiltering !== true) {
                options.filter = that._filter;
            }

            if (that.options.serverGrouping !== true) {
                options.group = that._group;
            }

            if (that.options.serverAggregates !== true) {
                options.aggregates = that._aggregates;
                that._aggregateResult = calculateAggregates(data, options);
            }

            result = process(data, options);

            that._view = result.data;

            if (result.total !== undefined && !that.options.serverFiltering) {
                that._total = result.total;
            }

            that._idMap(data);

            that.trigger(CHANGE);
        },

        changes: function (id) {
            var that = this,
                model = that._models[id];

            if (model && model.state === Model.UPDATED) {
                return model.changes();
            }
        },

        hasChanges: function (id) {
            var that = this,
                model,
                models = that._models,
                id;

            if (id === undefined) {
                for (id in models) {
                    if (models[id].state !== Model.PRISTINE) {
                        return true;
                    }
                }

                return false;
            }

            model = models[id];

            return !!model && model.state === Model.UPDATED;
        },

        at: function (index) {
            return this._data[index];
        },

        data: function (value) {
            if (value !== undefined) {
                this._data = value;
            } else {
                return this._data;
            }
        },

        view: function () {
            return this._view;
        },

        query: function (options) {
            var that = this,
                options = options,
                result,
                remote = that.options.serverSorting || that.options.serverPaging || that.options.serverFiltering || that.options.serverGrouping || that.options.serverAggregates;

            if (options !== undefined) {
                that._pageSize = options.pageSize;
                that._page = options.page;
                that._sort = options.sort;
                that._filter = options.filter;
                that._group = options.group;
                that._aggregates = options.aggregates;

                if (options.sort) {
                    that._sort = options.sort = Query.expandSort(options.sort);
                }

                if (options.filter) {
                    that._filter = options.filter = normalizeFilter(options.filter);
                }

                if (options.group) {
                    that._group = options.group = Query.expandGroup(options.group);
                }
                if (options.aggregates) {
                    that._aggregates = options.aggregates = Query.expandAggregates(options.aggregates);
                }
            }

            if (remote || (that._data === undefined || that._data.length == 0)) {
                that.read(options);
            } else {
                result = process(that._data, options);

                if (result.total !== undefined && !that.options.serverFiltering) {
                    that._total = result.total;
                }

                that._view = result.data;
                that._aggregateResult = calculateAggregates(that._data, options);
                that.trigger(CHANGE);
            }
        },

        fetch: function () {
            var that = this;

            that.query({
                page: that.page(),
                pageSize: that.pageSize(),
                sort: that.sort(),
                filter: that.filter(),
                group: that.group(),
                aggregate: that.aggregate()
            });
        },

        page: function (val) {
            var that = this;

            if (val !== undefined) {
                val = Math.max(Math.min(Math.max(val, 1), that._totalPages()), 1);
                that.query({ page: val, pageSize: that.pageSize(), sort: that.sort(), filter: that.filter(), group: that.group(), aggregates: that.aggregate() });
                return;
            }
            return that._page;
        },

        pageSize: function (val) {
            var that = this;

            if (val !== undefined) {
                that.query({ page: that.page(), pageSize: val, sort: that.sort(), filter: that.filter(), group: that.group(), aggregates: that.aggregate() });
                return;
            }

            return that._pageSize;
        },

        sort: function (val) {
            var that = this;

            if (val !== undefined) {
                that.query({ page: that.page(), pageSize: that.pageSize(), sort: val, filter: that.filter(), group: that.group(), aggregates: that.aggregate() });
                return;
            }

            return this._sort;
        },

        filter: function (val) {
            var that = this;

            if (val !== undefined) {
                that.query({ page: that.page(), pageSize: that.pageSize(), sort: that.sort(), filter: val, group: that.group(), aggregates: that.aggregate() });
                return;
            }

            return that._filter;
        },

        group: function (val) {
            var that = this;

            if (val !== undefined) {
                that.query({ page: that.page(), pageSize: that.pageSize(), sort: that.sort(), filter: that.filter(), group: val, aggregates: that.aggregate() });
                return;
            }

            return that._group;
        },

        total: function () {
            return this._total;
        },

        aggregate: function (val) {
            var that = this;

            if (val !== undefined) {
                that.query({ page: that.page(), pageSize: that.pageSize(), sort: that.sort(), filter: val, group: that.group(), aggregates: val });
                return;
            }

            return that._aggregates;
        },
        aggregates: function () {
            return this._aggregateResult;
        },
        _totalPages: function () {
            var that = this,
                pageSize = that.pageSize() || that.total();

            return Math.ceil((that.total() || 0) / pageSize);
        }
    });

    DataSource.create = function (options) {
        options = $.isArray(options) ? { data: options} : options;

        var dataSource = options || {},
            data = dataSource.data,
            fields = dataSource.fields,
            table = dataSource.table,
            select = dataSource.select;

        if (fields) {
            if (!data) {
                if (table) {
                    data = inferTable(table, fields);
                } else if (select) {
                    data = inferSelect(select, fields);
                }
            } else if (select) {
                rebuildSelect(data, select, fields);
            }
        }

        dataSource.data = data;

        return dataSource instanceof DataSource ? dataSource : new DataSource(dataSource);
    };

    function inferSelect(select, fields) {
        var options = $(select)[0].children,
            optionIndex,
            optionCount,
            data = [],
            record,
            option;

        for (optionIndex = 0, optionCount = options.length; optionIndex < optionCount; optionIndex++) {
            record = {};
            option = options[optionIndex];

            record[fields[0].field] = option.text;
            record[fields[1].field] = option.value;

            data.push(record);
        }

        return data;
    }

    function rebuildSelect(data, select, fields) {
        var getText = getter(fields[0].field),
            getValue = getter(fields[1].field),
            length = data.length,
            options = [],
            i = 0;

        for (; i < length; i++) {
            var option = "<option",
               dataItem = data[i],
               text = getText(dataItem),
               value = getValue(dataItem);

            if (value || value === 0) {
                option += " value=" + value;
            }

            option += ">";

            if (text || text === 0) {
                option += text;
            }

            option += "</option>";
            options.push(option);
        }

        select.html(options.join(""));
    }

    function inferTable(table, fields) {
        var tbody = $(table)[0].tBodies[0],
        rows = tbody ? tbody.rows : [],
        rowIndex,
        rowCount,
        fieldIndex,
        fieldCount = fields.length,
        data = [],
        cells,
        record,
        cell,
        empty;

        for (rowIndex = 0, rowCount = rows.length; rowIndex < rowCount; rowIndex++) {
            record = {};
            empty = true;
            cells = rows[rowIndex].cells;

            for (fieldIndex = 0; fieldIndex < fieldCount; fieldIndex++) {
                cell = cells[fieldIndex];
                if (cell.nodeName.toLowerCase() !== "th") {
                    empty = false;
                    record[fields[fieldIndex].field] = cell.innerHTML;
                }
            }
            if (!empty) {
                data.push(record);
            }
        }

        return data;
    }

    $t.DataSource = DataSource;
    $t.Model = Model;
    $t.getter = getter;
    $t.setter = setter;
    $t.expr = expr;

    //Template ================================
    var Template = {
        paramName: "data", // name of the parameter of the generated template
        useWithBlock: true, // whether to wrap the template in a with() block
        begin: "<#", // the marker which denotes the beginning of executable code
        end: "#>", // the marker which denotes the end of executable code
        render: function (template, data) {
            var idx,
                length,
                html = "";

            for (idx = 0, length = data.length; idx < length; idx++) {
                html += template(data[idx]);
            }

            return html;
        },
        compile: function (template, options) {
            var settings = extend({}, this, options),
                paramName = settings.paramName,
                begin = settings.begin,
                end = settings.end,
                useWithBlock = settings.useWithBlock,
                functionBody = "var o='',e = $.telerik.htmlEncode;",
                encodeRegExp = /\${([^}]*)}/g,
                evalRegExp = new RegExp(begin + "=(.+?)" + end, "g"),
                quoteRegExp = new RegExp("'(?=[^" + end[0] + "]*" + end + ")", "g");

            functionBody += useWithBlock ? "with(" + paramName + "){" : "";

            functionBody += "o+='";

            functionBody += template.replace(/[\r\t\n]/g, " ")
                .replace(quoteRegExp, "\t")
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

    function htmlEncode(value) {
        return ("" + value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    $.telerik.template = $.proxy(Template.compile, Template);
    $.telerik.htmlEncode = htmlEncode;

    //Component ================================
    var Component = Observable.extend({
        init: function (element, options) {
            var that = this;

            Observable.fn.init.call(that);
            that.element = $(element);
            that.options = extend(true, {}, that.options, options);
        }
    });

    $.telerik.Component = Component;

    //deepExtend ================================
    function deepExtend(destination) {
        var i = 1,
            length = arguments.length;

        for (i = 1; i < length; i++) {
            deepExtendOne(destination, arguments[i]);
        }

        return destination;
    }

    function deepExtendOne(destination, source) {
        var property,
            propValue,
            propType,
            destProp;

        for (property in source) {
            propValue = source[property];
            propType = typeof propValue;
            if (propType === "object" && propValue !== null && propValue.constructor !== Array) {
                destProp = destination[property];
                if (typeof (destProp) === "object") {
                    destination[property] = destProp || {};
                } else {
                    destination[property] = {};
                }
                deepExtendOne(destination[property], propValue);
            } else if (propType !== "undefined") {
                destination[property] = propValue;
            }
        }

        return destination;
    }

    $.telerik.deepExtend = deepExtend;

    //end core.js ==================================================
    //==============================================================
    //==============================================================
})(jQuery);
