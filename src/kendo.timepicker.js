(function(f, define){
    define([ "./kendo.popup" ], f);
})(function(){

var __meta__ = {
    id: "timepicker",
    name: "TimePicker",
    category: "web",
    description: "The TimePicker widget allows the end user to select a value from a list of predefined values or to type a new value.",
    depends: [ "popup" ]
};

(function($, undefined) {
    var kendo = window.kendo,
        keys = kendo.keys,
        parse = kendo.parseDate,
        activeElement = kendo._activeElement,
        extractFormat = kendo._extractFormat,
        support = kendo.support,
        browser = support.browser,
        ui = kendo.ui,
        Widget = ui.Widget,
        OPEN = "open",
        CLOSE = "close",
        CHANGE = "change",
        ns = ".kendoTimePicker",
        CLICK = "click" + ns,
        DEFAULT = "k-state-default",
        DISABLED = "disabled",
        READONLY = "readonly",
        LI = "li",
        SPAN = "<span/>",
        FOCUSED = "k-state-focused",
        HOVER = "k-state-hover",
        HOVEREVENTS = "mouseenter" + ns + " mouseleave" + ns,
        MOUSEDOWN = "mousedown" + ns,
        MS_PER_MINUTE = 60000,
        MS_PER_DAY = 86400000,
        SELECTED = "k-state-selected",
        STATEDISABLED = "k-state-disabled",
        ARIA_SELECTED = "aria-selected",
        ARIA_EXPANDED = "aria-expanded",
        ARIA_HIDDEN = "aria-hidden",
        ARIA_DISABLED = "aria-disabled",
        ARIA_READONLY = "aria-readonly",
        ARIA_ACTIVEDESCENDANT = "aria-activedescendant",
        ID = "id",
        isArray = $.isArray,
        extend = $.extend,
        proxy = $.proxy,
        DATE = Date,
        TODAY = new DATE();

    TODAY = new DATE(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate(), 0, 0, 0);

    var TimeView = function(options) {
        var that = this,
            id = options.id;

        that.options = options;

        that.ul = $('<ul tabindex="-1" role="listbox" aria-hidden="true" unselectable="on" class="k-list k-reset"/>')
                    .css({ overflow: support.kineticScrollNeeded ? "": "auto" })
                    .on(CLICK, LI, proxy(that._click, that))
                    .on("mouseenter" + ns, LI, function() { $(this).addClass(HOVER); })
                    .on("mouseleave" + ns, LI, function() { $(this).removeClass(HOVER); });

        that.list = $("<div class='k-list-container'/>")
                    .append(that.ul)
                    .on(MOUSEDOWN, preventDefault);

        if (id) {
            that._timeViewID = id + "_timeview";
            that._optionID = id + "_option_selected";

            that.ul.attr(ID, that._timeViewID);
        }

        that._popup();
        that._heightHandler = proxy(that._height, that);

        that.template = kendo.template('<li tabindex="-1" role="option" class="k-item" unselectable="on">#=data#</li>', { useWithBlock: false });
    };

    TimeView.prototype = {
        current: function(candidate) {
            var that = this,
                active = that.options.active;

            if (candidate !== undefined) {
                if (that._current) {
                    that._current
                        .removeClass(SELECTED)
                        .removeAttr(ARIA_SELECTED)
                        .removeAttr(ID);
                }

                if (candidate) {
                    candidate = $(candidate).addClass(SELECTED)
                                            .attr(ID, that._optionID)
                                            .attr(ARIA_SELECTED, true);

                    that.scroll(candidate[0]);
                }

                that._current = candidate;

                if (active) {
                    active(candidate);
                }
            } else {
                return that._current;
            }
        },

        close: function() {
            this.popup.close();
        },

        destroy: function() {
            var that = this;

            that.ul.off(ns);
            that.list.off(ns);

            if (that._touchScroller) {
                that._touchScroller.destroy();
            }

            that.popup.destroy();
        },

        open: function() {
            var that = this;

            if (!that.ul[0].firstChild) {
                that.bind();
            }

            that.popup.open();
            if (that._current) {
                that.scroll(that._current[0]);
            }
        },

        dataBind: function(dates) {
            var that = this,
                options = that.options,
                format = options.format,
                toString = kendo.toString,
                template = that.template,
                length = dates.length,
                idx = 0,
                date,
                html = "";

            for (; idx < length; idx++) {
                date = dates[idx];

                if (isInRange(date, options.min, options.max)) {
                    html += template(toString(date, format, options.culture));
                }
            }

            that._html(html);
        },

        refresh: function() {
            var that = this,
                options = that.options,
                format = options.format,
                offset = dst(),
                ignoreDST = offset < 0,
                min = options.min,
                max = options.max,
                msMin = getMilliseconds(min),
                msMax = getMilliseconds(max),
                msInterval = options.interval * MS_PER_MINUTE,
                toString = kendo.toString,
                template = that.template,
                start = new DATE(+min),
                startDay = start.getDate(),
                msStart, lastIdx,
                idx = 0, length,
                html = "";

            if (ignoreDST) {
                length = (MS_PER_DAY + (offset * MS_PER_MINUTE)) / msInterval;
            } else {
                length = MS_PER_DAY / msInterval;
            }


            if (msMin != msMax) {
                if (msMin > msMax) {
                    msMax += MS_PER_DAY;
                }

                length = ((msMax - msMin) / msInterval) + 1;
            }

            lastIdx = parseInt(length, 10);

            for (; idx < length; idx++) {
                if (idx) {
                    setTime(start, msInterval, ignoreDST);
                }

                if (msMax && lastIdx == idx) {
                    msStart = getMilliseconds(start);
                    if (startDay < start.getDate()) {
                        msStart += MS_PER_DAY;
                    }

                    if (msStart > msMax) {
                        start = new DATE(+max);
                    }
                }

                html += template(toString(start, format, options.culture));
            }

            that._html(html);
        },

        bind: function() {
            var that = this,
                dates = that.options.dates;

            if (dates && dates[0]) {
                that.dataBind(dates);
            } else {
                that.refresh();
            }
        },

        _html: function(html) {
            var that = this;

            that.ul[0].innerHTML = html;

            that.popup.unbind(OPEN, that._heightHandler);
            that.popup.one(OPEN, that._heightHandler);

            that.current(null);
            that.select(that._value);
        },

        scroll: function(item) {
            if (!item) {
                return;
            }

            var ul = this.ul[0],
                itemOffsetTop = item.offsetTop,
                itemOffsetHeight = item.offsetHeight,
                ulScrollTop = ul.scrollTop,
                ulOffsetHeight = ul.clientHeight,
                bottomDistance = itemOffsetTop + itemOffsetHeight,
                touchScroller = this._touchScroller,
                elementHeight;

            if (touchScroller) {
                elementHeight = this.list.height();

                if (itemOffsetTop > elementHeight) {
                    itemOffsetTop = itemOffsetTop - elementHeight + itemOffsetHeight;
                }

                touchScroller.scrollTo(0, -itemOffsetTop);
            } else {
                ul.scrollTop = ulScrollTop > itemOffsetTop ?
                               itemOffsetTop : bottomDistance > (ulScrollTop + ulOffsetHeight) ?
                               bottomDistance - ulOffsetHeight : ulScrollTop;
            }
        },

        select: function(li) {
            var that = this,
                options = that.options,
                current = that._current;

            if (li instanceof Date) {
                li = kendo.toString(li, options.format, options.culture);
            }

            if (typeof li === "string") {
                if (!current || current.text() !== li) {
                    li = $.grep(that.ul[0].childNodes, function(node) {
                        return (node.textContent || node.innerText) == li;
                    });

                    li = li[0] ? li : null;
                } else {
                    li = current;
                }
            }

            that.current(li);
        },

        setOptions: function(options) {
            var old = this.options;

            options.min = parse(options.min);
            options.max = parse(options.max);

            this.options = extend(old, options, {
                active: old.active,
                change: old.change,
                close: old.close,
                open: old.open
            });

            this.bind();
        },

        toggle: function() {
            var that = this;

            if (that.popup.visible()) {
                that.close();
            } else {
                that.open();
            }
        },

        value: function(value) {
            var that = this;

            that._value = value;
            if (that.ul[0].firstChild) {
                that.select(value);
            }
        },

        _click: function(e) {
            var that = this,
                li = $(e.currentTarget);

            if (!e.isDefaultPrevented()) {
                that.select(li);
                that.options.change(li.text(), true);
                that.close();
            }
        },

        _height: function() {
            var that = this;
            var list = that.list;
            var parent = list.parent(".k-animation-container");
            var height = that.options.height;

            if (that.ul[0].children.length) {
                list.add(parent)
                    .show()
                    .height(that.ul[0].scrollHeight > height ? height : "auto")
                    .hide();
            }
        },

        _parse: function(value) {
            var that = this,
                options = that.options,
                current = that._value || TODAY;

            if (value instanceof DATE) {
                return value;
            }

            value = parse(value, options.parseFormats, options.culture);

            if (value) {
                value = new DATE(current.getFullYear(),
                                 current.getMonth(),
                                 current.getDate(),
                                 value.getHours(),
                                 value.getMinutes(),
                                 value.getSeconds(),
                                 value.getMilliseconds());
            }

            return value;
        },

        _adjustListWidth: function() {
            var list = this.list,
                width = list[0].style.width,
                wrapper = this.options.anchor,
                computedStyle, computedWidth;

            if (!list.data("width") && width) {
                return;
            }

            computedStyle = window.getComputedStyle ? window.getComputedStyle(wrapper[0], null) : 0;
            computedWidth = computedStyle ? parseFloat(computedStyle.width) : wrapper.outerWidth();

            if (computedStyle && (browser.mozilla || browser.msie)) { // getComputedStyle returns different box in FF and IE.
                computedWidth += parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight) + parseFloat(computedStyle.borderLeftWidth) + parseFloat(computedStyle.borderRightWidth);
            }

            width = computedWidth - (list.outerWidth() - list.width());

            list.css({
                fontFamily: wrapper.css("font-family"),
                width: width
            })
            .data("width", width);
        },

        _popup: function() {
            var that = this,
                list = that.list,
                options = that.options,
                anchor = options.anchor;

            that.popup = new ui.Popup(list, extend(options.popup, {
                anchor: anchor,
                open: options.open,
                close: options.close,
                animation: options.animation,
                isRtl: support.isRtl(options.anchor)
            }));

            that._touchScroller = kendo.touchScroller(that.popup.element);
        },

        move: function(e) {
            var that = this,
                key = e.keyCode,
                ul = that.ul[0],
                current = that._current,
                down = key === keys.DOWN;

            if (key === keys.UP || down) {
                if (e.altKey) {
                    that.toggle(down);
                    return;
                } else if (down) {
                    current = current ? current[0].nextSibling : ul.firstChild;
                } else {
                    current = current ? current[0].previousSibling : ul.lastChild;
                }

                if (current) {
                    that.select(current);
                }

                that.options.change(that._current.text());
                e.preventDefault();

            } else if (key === keys.ENTER || key === keys.TAB || key === keys.ESC) {
                e.preventDefault();
                if (current) {
                    that.options.change(current.text(), true);
                }
                that.close();
            }
        }
    };

    function setTime(date, time, ignoreDST) {
        var offset = date.getTimezoneOffset(),
            offsetDiff;

        date.setTime(date.getTime() + time);

        if (!ignoreDST) {
            offsetDiff = date.getTimezoneOffset() - offset;
            date.setTime(date.getTime() + offsetDiff * MS_PER_MINUTE);
        }
    }

    function dst() {
        var today = new DATE(),
            midnight = new DATE(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0),
            noon = new DATE(today.getFullYear(), today.getMonth(), today.getDate(), 12, 0, 0);

        return -1 * (midnight.getTimezoneOffset() - noon.getTimezoneOffset());
    }

    function getMilliseconds(date) {
        return date.getHours() * 60 * MS_PER_MINUTE + date.getMinutes() * MS_PER_MINUTE + date.getSeconds() * 1000 + date.getMilliseconds();
    }

    function isInRange(value, min, max) {
        var msMin = getMilliseconds(min),
            msMax = getMilliseconds(max),
            msValue;

        if (!value || msMin == msMax) {
            return true;
        }

        msValue = getMilliseconds(value);

        if (msMin > msValue) {
            msValue += MS_PER_DAY;
        }

        if (msMax < msMin) {
            msMax += MS_PER_DAY;
        }

        return msValue >= msMin && msValue <= msMax;
    }

    TimeView.getMilliseconds = getMilliseconds;

    kendo.TimeView = TimeView;

    var TimePicker = Widget.extend({
        init: function(element, options) {
            var that = this, ul, timeView, disabled;

            Widget.fn.init.call(that, element, options);

            element = that.element;
            options = that.options;

            options.min = parse(element.attr("min")) || parse(options.min);
            options.max = parse(element.attr("max")) || parse(options.max);

            normalize(options);

            that._wrapper();

            that.timeView = timeView = new TimeView(extend({}, options, {
                id: element.attr(ID),
                anchor: that.wrapper,
                format: options.format,
                change: function(value, trigger) {
                    if (trigger) {
                        that._change(value);
                    } else {
                        element.val(value);
                    }
                },
                open: function(e) {
                    that.timeView._adjustListWidth();

                    if (that.trigger(OPEN)) {
                        e.preventDefault();
                    } else {
                        element.attr(ARIA_EXPANDED, true);
                        ul.attr(ARIA_HIDDEN, false);
                    }
                },
                close: function(e) {
                    if (that.trigger(CLOSE)) {
                        e.preventDefault();
                    } else {
                        element.attr(ARIA_EXPANDED, false);
                        ul.attr(ARIA_HIDDEN, true);
                    }
                },
                active: function(current) {
                    element.removeAttr(ARIA_ACTIVEDESCENDANT);
                    if (current) {
                        element.attr(ARIA_ACTIVEDESCENDANT, timeView._optionID);
                    }
                }
            }));
            ul = timeView.ul;

            that._icon();
            that._reset();

            try {
                element[0].setAttribute("type", "text");
            } catch(e) {
                element[0].type = "text";
            }

            element.addClass("k-input")
                   .attr({
                        "role": "combobox",
                        "aria-expanded": false,
                        "aria-owns": timeView._timeViewID
                   });

            disabled = element.is("[disabled]");
            if (disabled) {
                that.enable(false);
            } else {
                that.readonly(element.is("[readonly]"));
            }

            that._old = that._update(options.value || that.element.val());
            that._oldText = element.val();

            kendo.notify(that);
        },

        options: {
            name: "TimePicker",
            min: TODAY,
            max: TODAY,
            format: "",
            dates: [],
            parseFormats: [],
            value: null,
            interval: 30,
            height: 200,
            animation: {}
        },

        events: [
         OPEN,
         CLOSE,
         CHANGE
        ],

        setOptions: function(options) {
            var that = this;
            var value = that._value;

            Widget.fn.setOptions.call(that, options);
            options = that.options;

            normalize(options);

            that.timeView.setOptions(options);

            if (value) {
                that.element.val(kendo.toString(value, options.format, options.culture));
            }
        },

        dataBind: function(dates) {
            if (isArray(dates)) {
                this.timeView.dataBind(dates);
            }
        },

        _editable: function(options) {
            var that = this,
                disable = options.disable,
                readonly = options.readonly,
                arrow = that._arrow.off(ns),
                element = that.element.off(ns),
                wrapper = that._inputWrapper.off(ns);

            if (!readonly && !disable) {
                wrapper
                    .addClass(DEFAULT)
                    .removeClass(STATEDISABLED)
                    .on(HOVEREVENTS, that._toggleHover);

                element.removeAttr(DISABLED)
                       .removeAttr(READONLY)
                       .attr(ARIA_DISABLED, false)
                       .attr(ARIA_READONLY, false)
                       .on("keydown" + ns, proxy(that._keydown, that))
                       .on("focusout" + ns, proxy(that._blur, that))
                       .on("focus" + ns, function() {
                           that._inputWrapper.addClass(FOCUSED);
                       });

               arrow.on(CLICK, proxy(that._click, that))
                   .on(MOUSEDOWN, preventDefault);
            } else {
                wrapper
                    .addClass(disable ? STATEDISABLED : DEFAULT)
                    .removeClass(disable ? DEFAULT : STATEDISABLED);

                element.attr(DISABLED, disable)
                       .attr(READONLY, readonly)
                       .attr(ARIA_DISABLED, disable)
                       .attr(ARIA_READONLY, readonly);
            }
        },

        readonly: function(readonly) {
            this._editable({
                readonly: readonly === undefined ? true : readonly,
                disable: false
            });
        },

        enable: function(enable) {
            this._editable({
                readonly: false,
                disable: !(enable = enable === undefined ? true : enable)
            });
        },

        destroy: function() {
            var that = this;

            Widget.fn.destroy.call(that);

            that.timeView.destroy();

            that.element.off(ns);
            that._arrow.off(ns);
            that._inputWrapper.off(ns);

            if (that._form) {
                that._form.off("reset", that._resetHandler);
            }
        },

        close: function() {
            this.timeView.close();
        },

        open: function() {
            this.timeView.open();
        },

        min: function (value) {
            return this._option("min", value);
        },

        max: function (value) {
            return this._option("max", value);
        },

        value: function(value) {
            var that = this;

            if (value === undefined) {
                return that._value;
            }

            that._old = that._update(value);

            if (that._old === null) {
                that.element.val("");
            }

            that._oldText = that.element.val();
        },

        _blur: function() {
            var that = this,
                value = that.element.val();

            that.close();
            if (value !== that._oldText) {
                that._change(value);
            }
            that._inputWrapper.removeClass(FOCUSED);
        },

        _click: function() {
            var that = this,
                element = that.element;

            that.timeView.toggle();

            if (!support.touch && element[0] !== activeElement()) {
                element.focus();
            }
        },

        _change: function(value) {
            var that = this;

            value = that._update(value);

            if (+that._old != +value) {
                that._old = value;
                that._oldText = that.element.val();

                // trigger the DOM change event so any subscriber gets notified
                that.element.trigger(CHANGE);

                that.trigger(CHANGE);
            }
        },

        _icon: function() {
            var that = this,
                element = that.element,
                arrow;

            arrow = element.next("span.k-select");

            if (!arrow[0]) {
                arrow = $('<span unselectable="on" class="k-select"><span unselectable="on" class="k-icon k-i-clock">select</span></span>').insertAfter(element);
            }

            that._arrow = arrow.attr({
                "role": "button",
                "aria-controls": that.timeView._timeViewID
            });
        },

        _keydown: function(e) {
            var that = this,
                key = e.keyCode,
                timeView = that.timeView,
                value = that.element.val();

            if (timeView.popup.visible() || e.altKey) {
                timeView.move(e);
            } else if (key === keys.ENTER && value !== that._oldText) {
                that._change(value);
            }
        },

        _option: function(option, value) {
            var that = this,
                options = that.options;

            if (value === undefined) {
                return options[option];
            }

            value = that.timeView._parse(value);

            if (!value) {
                return;
            }

            value = new DATE(+value);

            options[option] = value;
            that.timeView.options[option] = value;
            that.timeView.bind();
        },

        _toggleHover: function(e) {
            $(e.currentTarget).toggleClass(HOVER, e.type === "mouseenter");
        },

        _update: function(value) {
            var that = this,
                options = that.options,
                timeView = that.timeView,
                date = timeView._parse(value);

            if (!isInRange(date, options.min, options.max)) {
                date = null;
            }

            that._value = date;
            that.element.val(date ? kendo.toString(date, options.format, options.culture) : value);
            timeView.value(date);

            return date;
        },

        _wrapper: function() {
            var that = this,
                element = that.element,
                wrapper;

            wrapper = element.parents(".k-timepicker");

            if (!wrapper[0]) {
                wrapper = element.wrap(SPAN).parent().addClass("k-picker-wrap k-state-default");
                wrapper = wrapper.wrap(SPAN).parent();
            }

            wrapper[0].style.cssText = element[0].style.cssText;
            that.wrapper = wrapper.addClass("k-widget k-timepicker k-header")
                                  .addClass(element[0].className);

            element.css({
                width: "100%",
                height: element[0].style.height
            });

            that._inputWrapper = $(wrapper[0].firstChild);
        },

        _reset: function() {
            var that = this,
                element = that.element,
                formId = element.attr("form"),
                form = formId ? $("#" + formId) : element.closest("form");

            if (form[0]) {
                that._resetHandler = function() {
                    that.value(element[0].defaultValue);
                };

                that._form = form.on("reset", that._resetHandler);
            }
        }
    });

    function normalize(options) {
        var parseFormats = options.parseFormats;

        options.format = extractFormat(options.format || kendo.getCulture(options.culture).calendars.standard.patterns.t);

        parseFormats = isArray(parseFormats) ? parseFormats : [parseFormats];
        parseFormats.splice(0, 0, options.format);
        options.parseFormats = parseFormats;
    }

    function preventDefault(e) {
        e.preventDefault();
    }

    ui.plugin(TimePicker);

})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
