(function($, undefined) {
    /**
    * @name kendo.ui.TimePicker.Description
    *
    * @section
    *   <p>
    *       The TimePicker widget allows to the end user to select a value from a list of predefined values or
    *       to type a new value. It supports configurable options for the format, min and max time
    *       and the interval between predefined values in the list.
    *   </p>
    *
    *   <h3>Getting Started</h3>
    *
    * @exampleTitle Creating a TimePicker from existing INPUT element
    * @example
    * <!-- HTML -->
    * <input id="timepicker"/>
    *
    * @exampleTitle TimePicker initialization
    * @example
    *   $(document).ready(function(){
    *      $("#timepicker").kendoTimePicker();
    *   });
    * @section
    *  <p>
    *      When a TimePicker is initialized, it will automatically be displayed near the
    *      location of the used HTML element.
    *  </p>
    *  <h3>Configuring TimePicker behaviors</h3>
    *  <p>
    *      TimePicker provides configuration options that can be easily set during initialization.
    *      Among the properties that can be controlled:
    *  </p>
    *  <ul>
    *      <li>Selected time</li>
    *      <li>Minimum/Maximum time</li>
    *      <li>Define format</li>
    *      <li>Define interval between predefined values in the list</li>
    *  </ul>
    * @exampleTitle Create TimePicker with selected time and defined min and max time
    * @example
    *  $("#timepicker").kendoTimePicker({
    *      value: new Date(2000, 10, 10, 10, 0, 0),
    *      min: new Date(1950, 0, 1, 8, 0, 0),
    *      max: new Date(2049, 11, 31, 18, 0, 0)
    *  });
    *  @section
    * <p>
    *   TimePicker will set the value only if the entered time is valid and if it is in the defined range
    * </p>
    * @section
    *
    * @exampleTitle Define time format
    * @example
    *  $("#timepicker").kendoTimePicker({
    *      format: "hh:mm:ss tt"
    *  });
    *
    * @exampleTitle Define the interval between values in the list
    * @example
    *  $("#timepicker").kendoTimePicker({
    *      interval: 15 //in minutes
    *  });
    *
    */

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
                    .css({ overflow: "auto"})
                    .bind(MOUSEDOWN, options.clearBlurTimeout)
                    .delegate(LI, "click", proxy(that._click, that))
                    .delegate(LI, "mouseenter", function() { $(this).addClass(HOVER); })
                    .delegate(LI, "mouseleave", function() { $(this).removeClass(HOVER); });

        that.list = $("<div class='k-list-container'/>").append(that.ul);

        that._popup();

        that.template = kendo.template('<li class="k-item" unselectable="on">#=data#</li>', { useWithBlock: false });
    }

    TimeView.prototype = {
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
                if (msMin > msMax) {
                    msMax += MS_PER_DAY;
                }
                length = (msMax - msMin) / msInterval + 1;
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

            that._height(length);

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
        },

        _click: function(e) {
            var that = this,
                li = $(e.currentTarget);

            that.select(li);
            that.options.change(li.text(), true);
            that.close();
        },

        _height: function(length) {
            if (length) {
                var that = this,
                    list = that.list,
                    parent = list.parent(".k-animation-container"),
                    height = that.options.height;

                list.add(parent)
                    .show()
                    .height(that.ul[0].scrollHeight > height ? height : "auto")
                    .hide();
            }
        },

        _popup: function() {
            var that = this,
                list = that.list,
                options = that.options,
                anchor = options.anchor,
                width;

            that.popup = new ui.Popup(list, {
                anchor: anchor,
                open: options.open,
                close: options.close,
                animation: options.animation
            });

            width = anchor.outerWidth() - (list.outerWidth() - list.width());

            list.css({
                fontFamily: anchor.css("font-family"),
                width: width
            });
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
                that.close();
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

        return msValue >= msMin && msValue <= msMax
    }

    kendo.TimeView = TimeView;

    var TimePicker = Widget.extend(/** @lends kendo.ui.TimePicker.prototype */{
        /**
         * @constructs
         * @extends kendo.ui.Widget
         * @param {DomElement} element DOM element
         * @param {Object} options Configuration options.
         * @option {Date} [value] <null> Specifies the selected time.
         * @option {Date} [min] <00:00> Specifies the start value in the popup list.
         * @option {Date} [max] <00:00> Specifies the end value in the popup list.
         * @option {String} [format] <h:mm tt> Specifies the format, which is used to parse value set with value() method.
         * @option {Number} [interval] <30> Specifies the interval, between values in the popup list, in minutes.
         */
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
                change: function(value, trigger) {
                    if (trigger) {
                        that._change(value);
                    } else {
                        element.val(value);
                    }
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
            * Fires when the value is changed
            * @name kendo.ui.TimePicker#change
            * @event
            * @param {Event} e
            */
            /**
            * Fires when the popup is opened
            * @name kendo.ui.TimePicker#open
            * @event
            * @param {Event} e
            */
            /**
            * Fires when the popup is closed
            * @name kendo.ui.TimePicker#close
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
            interval: 30,
            height: 200
        },

        /**
        * Enable/Disable the timepicker widget.
        * @param {Boolean} enable The argument, which defines whether to enable/disable the timepicker.
        * @example
        * var timepicker = $("timepicker").data("kendoTimePicker");
        *
        * // disables the timepicker
        * timepicker.enable(false);
        *
        * // enables the timepicker
        * timepicker.enable(true);
        */
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

        /**
        * Closes the popup.
        * @name kendo.ui.TimePicker#close
        * @function
        * @example
        * timepicker.close();
        */
        close: function() {
            this.timeView.close();
        },

        /**
        * Opens the popup.
        * @name kendo.ui.TimePicker#open
        * @function
        * @example
        * timepicker.open();
        */
        open: function() {
            this.timeView.open();
        },

        /**
        * Gets/Sets the min value of the timepicker.
        * @param {Date|String} value The min time to set.
        * @returns {Date} The min value of the timepicker.
        * @example
        * var timepicker = $("#timepicker").data("kendoTimePicker");
        *
        * // get the min value of the timepicker.
        * var min = timepicker.min();
        *
        * // set the min value of the timepicker.
        * timepicker.min(new Date(1900, 0, 1, 10, 0, 0));
        */
        min: function (value) {
            return this._option("min", value);
        },

        /**
        * Gets/Sets the max value of the timepicker.
        * @param {Date|String} value The max time to set.
        * @returns {Date} The max value of the timepicker.
        * @example
        * var timepicker = $("#timepicker").data("kendoTimePicker");
        *
        * // get the max value of the timepicker.
        * var max = timepicker.max();
        *
        * // set the max value of the timepicker.
        * timepicker.max(new Date(1900, 0, 1, 18, 0, 0));
        */
        max: function (value) {
            return this._option("max", value);
        },

        /**
        * Gets/Sets the value of the timepicker.
        * @param {Date|String} value The value to set.
        * @returns {Date} The value of the timepicker.
        * @example
        * var timepicker = $("#timepicker").data("kendoTimePicker");
        *
        * // get the value of the timepicker.
        * var value = timepicker.value();
        *
        * // set the value of the timepicker.
        * timepicker.value("10:00 AM"); //parse "10:00 AM" time and selects it in the popup.
        */
        value: function(value) {
            var that = this;

            if (value === undefined) {
                return that._value;
            }

            that._old = that._update(value);
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

            value = that._update(value);

            if (+that._old != +value) {
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
                timeView.move(e);
            }

            if (enter) {
                that._change(that.element.val());
            }
        },

        _option: function(option, value) {
            var that = this,
                options = that.options;

            if (value === undefined) {
                return options[option];
            }

            value = that._parse(value);

            if (!value) {
                return;
            }

            value = new DATE(value);

            options[option] = value;
            that.timeView.options[option] = value;
            that.timeView.refresh();
        },

        _parse: function(value) {
            var that = this,
                current = that._value || TODAY;

            if (value instanceof DATE) {
                return value;
            }

            value = kendo.parseDate(value, that.options.format);

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

        _toggleHover: function(e) {
            if (!touch) {
                $(e.currentTarget).toggleClass(HOVER, e.type === "mouseenter");
            }
        },

        _update: function(value) {
            var that = this,
                current = that._value,
                options = that.options,
                date = that._parse(value),
                text = kendo.toString(date, options.format);

            if (!isInRange(date, options.min, options.max)) {
                date = null;
            }

            that._value = date;
            that.element.val(date ? text : value);
            that.timeView.value(text);

            return date;
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
