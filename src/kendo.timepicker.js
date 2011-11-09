(function($, undefined) {
    var kendo = window.kendo,
        touch = kendo.support.touch,
        keys = kendo.keys,
        ui = kendo.ui,
        Widget = ui.Widget,
        keys = kendo.keys,
        CHANGE = "change",
        CLICK = (touch ? "touchend" : "click"),
        DEFAULT = "k-state-default",
        DISABLED = "disabled",
        LI = "li",
        DIV = "<div/>",
        FOCUSED = "k-state-focused",
        HOVER = "k-state-hover",
        HOVEREVENTS = "mouseenter mouseleave",
        MOUSEDOWN = (touch ? "touchstart" : "mousedown"),
        MS_PER_MINUTE = 60000,
        MS_PER_DAY = 86400000,
        SELECTED = "k-state-selected",
        STATEDISABLED = "k-state-disabled",
        proxy = $.proxy,
        DATE = Date,
        TODAY = new DATE();

    TODAY = new DATE(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate(), 0, 0, 0);

    var TimeView = function(options) {
        var that = this, list;

        that.options = options;

        that.ul = $('<ul class="k-list k-reset"/>')
                    .css({ overflow: "auto", width: options.anchor.width() - 6, height: "200px" })
                    .bind(MOUSEDOWN, options.clearBlurTimeout)
                    .delegate(LI, "click", proxy(that._click, that))
                    .delegate(LI, "mouseenter", function() { $(this).addClass(HOVER); })
                    .delegate(LI, "mouseleave", function() { $(this).removeClass(HOVER); });

        list = $("<div class='k-list-container'/>").append(that.ul);

        that.popup = new ui.Popup(list, options);

        that.template = kendo.template('<li class="k-item" unselectable="on">#=data#</li>', { useWithBlock: false });
    }

    TimeView.prototype = {
        _click: function(e) {
            var that = this,
                li = $(e.currentTarget);

            that.select(li);
            that.options.change(li.text());
            that.close();
        },

        current: function(candidate) {
            var that = this;

            if (candidate !== undefined) {
                if (that._current) {
                    that._current.removeClass(SELECTED);
                }

                if (candidate) {
                    candidate = $(candidate);
                    candidate.addClass(SELECTED);
                    that.scroll(candidate[0]);
                }

                that._current = candidate;
            } else {
                return that._current;
            }
        },

        close: function() {
            this.popup.close();
        },

        open: function() {
            var that = this;

            if (!that.ul[0].firstChild) {
                that.refresh();
            }

            that.popup.open();
            if (that._current) {
                that.scroll(that._current[0]);
            }
        },

        _move: function(e) {
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
                that.close();
            }
        },

        refresh: function() {
            var that = this,
                options = that.options,
                format = options.format,
                min = options.min,
                max = options.max,
                msMin = getMilliseconds(min),
                msMax = getMilliseconds(max),
                msInterval = options.interval * MS_PER_MINUTE,
                toString = kendo.toString,
                template = that.template,
                start = new DATE(min),
                length = MS_PER_DAY / msInterval,
                idx = 0, length,
                html = "";

            if (msMin != msMax) {
                length = Math.abs(msMin - msMax) / msInterval + 1
            }

            for (; idx < length; idx++) {
                if (idx) {
                    setTime(start, msInterval);
                }

                if (msMax && getMilliseconds(start) > msMax) {
                    start = new DATE(max);
                }

                html += template(toString(start, format));
            }

            that.ul[0].innerHTML = html;

            that.select(that._value);
        },

        scroll: function(item) {
            if (!item) return;

            var ul = this.ul[0],
                itemOffsetTop = item.offsetTop,
                itemOffsetHeight = item.offsetHeight,
                ulScrollTop = ul.scrollTop,
                ulOffsetHeight = ul.clientHeight,
                bottomDistance = itemOffsetTop + itemOffsetHeight;

            ul.scrollTop = ulScrollTop > itemOffsetTop
                        ? itemOffsetTop
                        : bottomDistance > (ulScrollTop + ulOffsetHeight)
                        ? bottomDistance - ulOffsetHeight
                        : ulScrollTop;
        },

        select: function(li) {
            var that = this,
                current = that._current;

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
        }
    };

    function setTime(date, time) {
        var tzOffsetBefore = date.getTimezoneOffset(),
        resultDATE = new DATE(date.getTime() + time),
        tzOffsetDiff = resultDATE.getTimezoneOffset() - tzOffsetBefore;

        date.setTime(resultDATE.getTime() + tzOffsetDiff * MS_PER_MINUTE);
    }

    function getMilliseconds(date) {
        return date.getHours() * 60 * MS_PER_MINUTE + date.getMinutes() * MS_PER_MINUTE + date.getSeconds() * 1000 + date.getMilliseconds();
    }

    function inRange(value, min, max) {
        if (!value) {
            return true;
        }

        var msMin = getMilliseconds(min),
            msMax = getMilliseconds(max),
            msValue = getMilliseconds(value);

        if (msMin == msMax) {
            return true;
        } else {
            return msValue > msMin && msValue < msMax;
        }

        return true;
    }

    kendo.TimeView = TimeView;

    var TimePicker = Widget.extend({
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            element = that.element;
            options = that.options;

            options.format = options.format || kendo.culture().calendar.patterns["t"];

            that._wrapper();

            that.timeView = new TimeView($.extend({}, options, {
                anchor: that.wrapper,
                format: options.format,
                change: function(value) {
                    that.element.val(value);
                },
                clearBlurTimeout: proxy(that._clearBlurTimeout, that)
            }));

            that._icon();

            element.addClass("k-input")
                .bind({
                    keydown: proxy(that._keydown, that),
                    focus: function(e) {
                        clearTimeout(that._bluring);
                        that._inputWrapper.addClass(FOCUSED);
                    },
                    blur: proxy(that._blur, that)
                });

            /**
            * Fires when the selected date is changed
            * @name kendo.ui.DatePicker#change
            * @event
            * @param {Event} e
            */
            /**
            * Fires when the calendar is opened
            * @name kendo.ui.DatePicker#open
            * @event
            * @param {Event} e
            */
            /**
            * Fires when the calendar is closed
            * @name kendo.ui.DatePicker#close
            * @event
            * @param {Event} e
            */
            that.bind(CHANGE, options);

            that.enable(!element.is('[disabled]'));
            that.value(options.value || element.val());
        },
        options: {
            name: "TimePicker",
            min: TODAY,
            max: TODAY,
            value: null,
            interval: 30
        },

        enable: function(enable) {
            var that = this,
                arrow = that._arrow,
                element = that.element,
                wrapper = that._inputWrapper;

            arrow.unbind(CLICK)
                .unbind(MOUSEDOWN);

            if (enable === false) {
                wrapper
                    .removeClass(DEFAULT)
                    .addClass(STATEDISABLED)
                    .unbind(HOVEREVENTS);

                element.attr(DISABLED, DISABLED);
            } else {
                wrapper
                    .removeClass(STATEDISABLED)
                    .addClass(DEFAULT)
                    .bind(HOVEREVENTS, that._toggleHover);

                element
                    .removeAttr(DISABLED);

                arrow.bind(CLICK, proxy(that._click, that))
                     .bind(MOUSEDOWN, proxy(that._clearBlurTimeout, that))
            }
        },

        close: function() {
            this.timeView.close();
        },

        open: function() {
            this.timeView.open();
        },

        //refactor
        value: function(value) {
            var that = this,
                options = that.options,
                text = value;

            if (value === undefined) {
                return that._value;
            }

            value = kendo.parseDate(value, options.format);

            if (!inRange(value, options.min, options.max)) {
                value = null;
            }

            that._update(value && typeof text === "string" ? text : value);
            that._old = that._value;
        },

        _blur: function() {
            var that = this;

            that._bluring = setTimeout(function() {
                that._change(that.element.val());
                if (!touch) {
                    that.close();
                }
                that._inputWrapper.removeClass(FOCUSED);
            }, 100);
        },

        _clearBlurTimeout: function() {
            var that = this;
            setTimeout(function() {
                clearTimeout(that._bluring);
                that.element.focus();
            });
        },

        _click: function() {
            this.timeView.toggle();
        },

        _change: function(value) {
            var that = this;

            that._update(value);
            value = that._value;

            if (that._old != value) {
                that._old = value;
                that.trigger(CHANGE);

                // trigger the DOM change event so any subscriber gets notified
                that.element.trigger(CHANGE);
            }
        },

        _icon: function() {
            var that = this,
                element = that.element,
                arrow;

            arrow = element.next("span.k-select");

            if (!arrow[0]) {
                arrow = $('<span class="k-select"><span class="k-icon k-icon-clock">select</span></span>').insertAfter(element);
            }

            that._arrow = arrow;
        },

        _keydown: function(e) {
            var that = this,
                key = e.keyCode,
                enter = key == keys.ENTER,
                timeView = that.timeView;

            if (timeView.popup.visible() || e.altKey || enter) {
                timeView._move(e);
            }

            if (enter) {
                that._change(that.element.val());
            }
        },

        _toggleHover: function(e) {
            if (!touch) {
                $(e.currentTarget).toggleClass(HOVER, e.type === "mouseenter");
            }
        },

        //refactor
        _update: function(value) {
            var that = this,
                current = that._value,
                format = that.options.format,
                date, text;

            if (value === null) {
                that._value = date = value;
            } else if (typeof value === "string") {
                date = kendo.parseDate(value, format);

                if (date) {
                    if (!current) {
                        current = TODAY;
                    }

                    current = new DATE(current.getFullYear(),
                                   current.getMonth(),
                                   current.getDate(),
                                   date.getHours(),
                                   date.getMinutes(),
                                   date.getSeconds(),
                                   date.getMilliseconds());

                    date = new DATE(current);
                }
                that._value = date;
            } else {
                that._value = date = new DATE(value);
            }

            text = kendo.toString(date, format);

            that.element.val(date ? text : value);
            that.timeView.value(text);
        },

        _wrapper: function() {
            var that = this,
                element = that.element,
                wrapper;

            wrapper = element.parents(".k-timepicker");

            if (!wrapper[0]) {
                wrapper = element.wrap(DIV).parent().addClass("k-picker-wrap k-state-default");
                wrapper = wrapper.wrap(DIV).parent();
            }

            wrapper[0].style.cssText = element[0].style.cssText;
            element.css({
                width: "100%",
                height: "auto"
            });

            that.wrapper = wrapper.addClass("k-widget k-timepicker k-header");
            that._inputWrapper = $(wrapper[0].firstChild);
        }
    });

    ui.plugin(TimePicker);

})(jQuery);
