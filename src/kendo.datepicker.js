(function($, undefined) {
    /**
    * @name kendo.ui.DatePicker.Description
    *
    * @section
    *   <p>
    *       The DatePicker widget allows the end user to select a date from a calendar or by direct input.
    *       It supports custom templates for "month" view, configurable options for min and max date,
    *       start view and the depth of the navigation.
    *   </p>
    *
    *   <h3>Getting Started</h3>
    *
    * @exampleTitle Creating a DatePicker from existing INPUT element
    * @example
    * <!-- HTML -->
    * <input id="datepicker"/>
    *
    * @exampleTitle DatePicker initialization
    * @example
    *   $(document).ready(function(){
    *      $("#datepicker").kendoDatePicker();
    *   });
    * @section
    *  <p>
    *      When a DatePicker is initialized, it will automatically be displayed near the
    *      location of the used HTML element.
    *  </p>
    *  <h3>Configuring DatePicker behaviors</h3>
    *  <p>
    *      DatePicker provides configuration options that can be easily set during initialization.
    *      Among the properties that can be controlled:
    *  </p>
    *  <ul>
    *      <li>Selected date</li>
    *      <li>Minimum/Maximum date</li>
    *      <li>Define format</li>
    *      <li>Start view</li>
    *      <li>Define the navigation depth (last view to which end user can navigate)</li>
    *  </ul>
    * @exampleTitle Create DatePicker with selected date and defined min and max date
    * @example
    *  $("#datepicker").kendoDatePicker({
    *      value: new Date(),
    *      min: new Date(1950, 0, 1),
    *      max: new Date(2049, 11, 31)
    *  });
    *  @section
    * <p>
    *   DatePicker will set the value only if the entered date is valid and if it is in the defined range
    * </p>
    * @section
    * <h3>Define start view and navigation depth</h3>
    * <p>
    *    The first rendered view can be defined with "start" option. Navigation depth
    *    can be controlled with "depth" option. Predefined views are:
    *    <ul>
    *       <li>"month" - shows the days from the month</li>
    *       <li>"year" - shows the months of the year</li>
    *       <li>"decade" - shows the years from the decade</li>
    *       <li>"century" - shows the decades from the century</li>
    *    </ul>
    * </p>
    *
    * @exampleTitle Create Month picker
    * @example
    *  $("#datepicker").kendoDatePicker({
    *      start: "year",
    *      depth: "year"
    *  });
    *
    */

    var kendo = window.kendo,
    ui = kendo.ui,
    touch = kendo.support.touch,
    Widget = ui.Widget,
    parse = kendo.parseDate,
    keys = kendo.keys,
    template = kendo.template,
    DIV = "<div />",
    CLICK = (touch ? "touchend" : "click"),
    OPEN = "open",
    CLOSE = "close",
    CHANGE = "change",
    NAVIGATE = "navigate",
    DATEVIEW = "dateView",
    DISABLED = "disabled",
    DEFAULT = "k-state-default",
    FOCUSED = "k-state-focused",
    SELECTED = "k-state-selected",
    STATEDISABLED = "k-state-disabled",
    HOVER = "k-state-hover",
    HOVEREVENTS = "mouseenter mouseleave",
    MOUSEDOWN = (touch ? "touchstart" : "mousedown"),
    MIN = "min",
    MAX = "max",
    MONTH = "month",
    FIRST = "first",
    calendar = kendo.calendar,
    views = calendar.viewsEnum,
    isInRange = calendar.isInRange,
    restrictValue = calendar.restrictValue,
    proxy = $.proxy,
    DATE = Date,
    sharedCalendar;

    var DateView = function(options) {
        var that = this,
            body = document.body;

        if (!sharedCalendar) {
            sharedCalendar = new ui.Calendar($(DIV).hide().appendTo(body));
        }

        that.calendar = sharedCalendar;
        that.options = options = options || {};
        that.popup = new ui.Popup($(DIV).addClass("k-calendar-container").appendTo(body), options);

        that._templates();

        that.value(options.value);
    };

    DateView.prototype = {
        _calendar: function() {
            var that = this,
                popup = that.popup,
                options = that.options,
                calendar = that.calendar,
                element = calendar.element;

            if (element.data(DATEVIEW) !== that) {

                element.appendTo(popup.element)
                       .data(DATEVIEW, that)
                       .bind(CLICK, proxy(that._click, that))
                       .unbind(MOUSEDOWN)
                       .bind(MOUSEDOWN, options.clearBlurTimeout)
                       .show();

                calendar.unbind(CHANGE)
                        .unbind(NAVIGATE)
                        .bind(NAVIGATE, proxy(that._navigate, that))
                        .bind(CHANGE, options);

                calendar.month = that.month;
                calendar.options.depth = options.depth;

                calendar._today.html(that.footer(new DATE()));

                calendar.min(options.min);
                calendar.max(options.max);

                calendar.navigate(that._value, options.start);
                that.value(that._value);
            }
        },

        open: function() {
            var that = this;

            that._calendar();
            setTimeout( function () { that.popup.open(); });
        },

        close: function() {
            this.popup.close();
        },

        min: function(value) {
            this._option(MIN, value);
        },

        max: function(value) {
            this._option(MAX, value);
        },

        toggle: function() {
            var that = this;

            that[that.popup.visible() ? CLOSE : OPEN]();
        },

        move: function(e) {
            var that = this,
                options = that.options,
                min = options.min,
                max = options.max,
                currentValue = new DATE(that._current),
                calendar = that.calendar,
                index = calendar._index,
                view = calendar._view,
                key = e.keyCode,
                dateString, value, prevent, method;

            if (key == keys.ESC) {
                that.close();
                return;
            }

            if (e.altKey) {
                if (key == keys.DOWN) {
                    that.open();
                    prevent = true;
                } else if (key == keys.UP) {
                    that.close();
                    prevent = true;
                }
            }

            if (!that.popup.visible()) {
                return;
            }

            if (e.ctrlKey) {
                if (key == keys.RIGHT) {
                    calendar.navigateToFuture();
                    prevent = true;
                } else if (key == keys.LEFT) {
                    calendar.navigateToPast();
                    prevent = true;
                } else if (key == keys.UP) {
                    calendar.navigateUp();
                    prevent = true;
                } else if (key == keys.DOWN) {
                    that._navigateDown();
                    prevent = true;
                }
            } else {
                if (key == keys.RIGHT) {
                    value = 1;
                    prevent = true;
                } else if (key == keys.LEFT) {
                    value = -1;
                    prevent = true;
                } else if (key == keys.UP) {
                    value = index === 0 ? -7 : -4;
                    prevent = true;
                } else if (key == keys.DOWN) {
                    value = index === 0 ? 7 : 4;
                    prevent = true;
                } else if (key == keys.ENTER) {
                    that._navigateDown();
                    prevent = true;
                } else if (key == keys.HOME || key == keys.END) {
                    method = key == keys.HOME ? FIRST : "last";
                    currentValue = view[method](currentValue);
                    prevent = true;
                } else if (key == keys.PAGEUP) {
                    prevent = true;
                    calendar.navigateToPast();
                } else if (key == keys.PAGEDOWN) {
                    prevent = true;
                    calendar.navigateToFuture();
                }

                if (value || method) {
                    if (!method) {
                        view.setDate(currentValue, value);
                    }

                    that._current = currentValue = restrictValue(currentValue, options.min, options.max);
                    calendar._focus(currentValue);
                }
            }

            if (prevent) {
                e.preventDefault();
            }
        },

        value: function(value) {
            var that = this,
                calendar = that.calendar,
                options = that.options;

            that._value = value;
            that._current = new DATE(restrictValue(value, options.min, options.max));

            if (calendar.element.data(DATEVIEW) === that) {
                calendar._focus(that._current);
                calendar.value(value);
            }
        },

        _click: function(e) {
            if (e.currentTarget.className.indexOf(SELECTED) !== -1) {
                this.close();
            }
        },

        _navigate: function() {
            var that = this,
                calendar = that.calendar;

            that._current = new DATE(calendar._current);
            calendar._focus(calendar._current);
        },

        _navigateDown: function() {
            var that = this,
                calendar = that.calendar,
                currentValue = calendar._current,
                cell = calendar._table.find("." + FOCUSED),
                value = cell.children(":" + FIRST).attr(kendo.attr("value")).split("/");

            //Safari cannot create corretly date from "1/1/2090"
            value = new DATE(value[0], value[1], value[2]);

            if (!cell[0] || cell.hasClass(SELECTED)) {
                that.close();
                return;
            }

            calendar._view.setDate(currentValue, value);
            calendar.navigateDown(currentValue);
        },

        _option: function(option, value) {
            var that = this,
                options = that.options,
                calendar = that.calendar;

            options[option] = value;

            if (calendar.element.data(DATEVIEW) === that) {
                calendar[option](value);
            }
        },

        _templates: function() {
            var that = this,
                options = that.options,
                month = options.month || {},
                content = month.content,
                empty = month.empty;

            that.month = {
                content: template('<td#=data.cssClass#><a class="k-link" href="\\#" ' + kendo.attr("value") + '="#=data.dateString#" title="#=data.title#">' + (content || "#=data.value#") + '</a></td>', { useWithBlock: !!content }),
                empty: template("<td>" + (empty || "&nbsp;") + "</td>", { useWithBlock: !!empty })
            };

            that.footer = template(options.footer || '#= kendo.toString(data,"D") #', { useWithBlock: false });
        }
    };

    kendo.DateView = DateView;

    var DatePicker = Widget.extend(/** @lends kendo.ui.DatePicker.prototype */{
        /**
         * @constructs
         * @extends kendo.ui.Widget
         * @param {DomElement} element DOM element
         * @param {Object} options Configuration options.
         * @option {Date} [value] <null> Specifies the selected date.
         * @option {Date} [min] <Date(1900, 0, 1)> Specifies the minimum date, which the calendar can show.
         * @option {Date} [max] <Date(2099, 11, 31)> Specifies the maximum date, which the calendar can show.
         * @option {String} [format] <MM/dd/yyyy> Specifies the format, which is used to parse value set with value() method.
         * @option {String} [start] <month> Specifies the start view.
         * @option {String} [depth] Specifies the navigation depth.
         */
        init: function(element, options) {
            var that = this,
                dateView, enable;

            Widget.fn.init.call(that, element, options);
            element = that.element;
            options = that.options;

            calendar.validate(options);

            that._wrapper();

            that.dateView = dateView = new DateView($.extend({}, options, {
                anchor: that.wrapper,
                change: function() {
                    // calendar is the current scope
                    that._change(this.value());
                    that.close();
                },
                clearBlurTimeout: proxy(that._clearBlurTimeout, that)
            }));

            that._icon();

            that.input = element
                        .addClass("k-input")
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
            that.value(options.value || that.element.val());
        },

        options: {
            name: "DatePicker",
            value: null,
            min: new Date(1900, 0, 1),
            max: new Date(2099, 11, 31),
            start: MONTH,
            depth: MONTH
        },

        /**
        * Enable/Disable the datepicker widget.
        * @param {Boolean} enable The argument, which defines whether to enable/disable the datepicker.
        * @example
        * var datepicker = $("#datepicker").data("kendoDatePicker");
        *
        * // disables the datepicker
        * datepicker.enable(false);
        *
        * // enables the datepicker
        * datepicker.enable(true);
        */
        enable: function(enable) {
            var that = this,
                icon = that._icon,
                wrapper = that._inputWrapper,
                element = that.element;

            icon.unbind(CLICK)
                .unbind(MOUSEDOWN);

            if (enable === false) {
                wrapper
                    .removeClass(DEFAULT)
                    .addClass(STATEDISABLED)
                    .unbind(HOVEREVENTS);

                element.attr(DISABLED, DISABLED);
            } else {
                wrapper
                    .addClass(DEFAULT)
                    .removeClass(STATEDISABLED)
                    .bind(HOVEREVENTS, that._toggleHover);

                element
                    .removeAttr(DISABLED);

                icon.bind(CLICK, proxy(that._click, that))
                    .bind(MOUSEDOWN, proxy(that._clearBlurTimeout, that))
            }
        },

        /**
        * Opens the calendar.
        * @name kendo.ui.DatePicker#open
        * @function
        * @example
        * datepicker.open();
        */
        open: function() {
            this.dateView.open();
        },

        /**
        * Closes the calendar.
        * @name kendo.ui.DatePicker#close
        * @function
        * @example
        * datepicker.close();
        */
        close: function() {
            this.dateView.close();
        },

        /**
        * Gets/Sets the min value of the datepicker.
        * @param {Date|String} value The min date to set.
        * @returns {Date} The min value of the datepicker.
        * @example
        * var datepicker = $("#datepicker").data("kendoDatePicker");
        *
        * // get the min value of the datepicker.
        * var min = datepicker.min();
        *
        * // set the min value of the datepicker.
        * datepicker.min(new Date(1900, 0, 1));
        */
        min: function(value) {
            return this._option(MIN, value);
        },

        /**
        * Gets/Sets the max value of the datepicker.
        * @param {Date|String} value The max date to set.
        * @returns {Date} The max value of the datepicker.
        * @example
        * var datepicker = $("#datepicker").data("kendoDatePicker");
        *
        * // get the max value of the datepicker.
        * var max = datepicker.max();
        *
        * // set the max value of the datepicker.
        * datepicker.max(new Date(1900, 0, 1));
        */
        max: function(value) {
            return this._option(MAX, value);
        },

        /**
        * Gets/Sets the value of the datepicker.
        * @param {Date|String} value The value to set.
        * @returns {Date} The value of the datepicker.
        * @example
        * var datepicker = $("#datepicker").data("kendoDatePicker");
        *
        * // get the value of the datepicker.
        * var value = datepicker.value();
        *
        * // set the value of the datepicker.
        * datepicker.value("10/10/2000"); //parse "10/10/2000" date and selects it in the calendar.
        */
        value: function(value) {
            var that = this;

            if (value === undefined) {
                return that._value;
            }

            that._old = that._update(value);
        },

        _toggleHover: function(e) {
            if (!touch) {
                $(e.currentTarget).toggleClass(HOVER, e.type === "mouseenter");
            }
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
            this.dateView.toggle();
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

        _keydown: function(e) {
            var that = this,
                dateView = that.dateView;

            if (!dateView.popup.visible() && e.keyCode == keys.ENTER) {
                that._change(that.element.val());
            } else {
                dateView.move(e);
            }
        },

        _icon: function() {
            var that = this,
                element = that.element,
                icon;

            icon = element.next("span.k-select");

            if (!icon[0]) {
                icon = $('<span class="k-select"><span class="k-icon k-icon-calendar">select</span></span>').insertAfter(element);
            }

            that._icon = icon;
        },

        _option: function(option, value) {
            var that = this,
                options = that.options;

            if (value === undefined) {
                return options[option];
            }

            value = parse(value, options.format);

            if (!value) {
                return;
            }

            options[option] = new DATE(value);
            that.dateView[option](value);
        },

        _update: function(value) {
            var that = this,
                options = that.options,
                format = options.format,
                date = parse(value, format);

            if (!isInRange(date, options.min, options.max)) {
                date = null;
            }

            that._value = date;
            that.dateView.value(date);
            that.element.val(date ? kendo.toString(date, format) : value);

            return date;
        },

        _wrapper: function() {
            var that = this,
                element = that.element,
                wrapper;

            wrapper = element.parents(".k-datepicker");

            if (!wrapper[0]) {
                wrapper = element.wrap(DIV).parent().addClass("k-picker-wrap k-state-default");
                wrapper = wrapper.wrap(DIV).parent();
            }

            wrapper[0].style.cssText = element[0].style.cssText;
            element.css({
                width: "100%",
                height: "auto"
            });

            that.wrapper = wrapper.addClass("k-widget k-datepicker k-header");
            that._inputWrapper = $(wrapper[0].firstChild);
        }
    });

    ui.plugin(DatePicker);

})(jQuery);
