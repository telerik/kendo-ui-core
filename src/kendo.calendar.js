(function($, undefined) {
    /**
    * @name kendo.ui.Calendar.Description
    *
    * @section
    *   <p>
    *       The Calendar widget renders a graphical calendar that supports navigation and selection.
    *       It supports custom templates for "month" view, configurable options for min and max date,
    *       start view and the depth of the navigation.
    *   </p>
    *
    *   <h3>Getting Started</h3>
    *
    * @exampleTitle Creating a Calendar from existing DIV element
    * @example
    * <!-- HTML -->
    * <div id="calendar"></div>
    *
    * @exampleTitle Calendar initialization
    * @example
    *   $(document).ready(function(){
    *      $("#calendar").kendoCalendar();
    *   });
    * @section
    *  <p>
    *      When a Calendar is initialized, it will automatically be displayed near the
    *      location of the used HTML element.
    *  </p>
    *  <h3>Configuring Calendar behaviors</h3>
    *  <p>
    *      Calendar provides many configuration options that can be easily set during initialization.
    *      Among the properties that can be controlled:
    *  </p>
    *  <ul>
    *      <li>Selected date</li>
    *      <li>Minimum/Maximum date</li>
    *      <li>Start view</li>
    *      <li>Define the navigation depth (last view to which end user can navigate)</li>
    *      <li>Day template</li>
    *      <li>Footer template</li>
    *  </ul>
    * @exampleTitle Create Calendar with selected date and defined min and max date
    * @example
    *  $("#calendar").kendoCalendar({
    *      value: new Date(),
    *      min: new Date(1950, 0, 1),
    *      max: new Date(2049, 11, 31)
    *  });
    * <p>
    *   Calendar will not navigate to dates less than min and bigger than max date.
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
    * @exampleTitle Create Calendar, which allows to select month
    * @example
    *  $("#calendar").kendoCalendar({
    *      start: "year",
    *      depth: "year"
    *  });
    *
    *  @section
    * <h3>Customize day template</h3>
    * <p>
    *   Calendar allows to customize content of the rendered day in the "month" view.
    *
    * @exampleTitle Create Calendar with custom template
    * @example
    *  $("#calendar").kendoCalendar({
    *      month: {
    *         content: '<div class="custom"><#=data.value#></div>'
    *      }
    *  });
    *  @section
    *  <p>
    *     This templates wraps the "value" in a div HTML element. Here is an example of the object
    *     passed to the template function:
    *  </p>
    * @exampleTitle Structure of the data object passed to the template
    * @example
    *  data = {
    *    date: date, // Date object corresponding to the current cell
    *    title: kendo.toString(date, "D"),
    *    value: date.getDate(),
    *    dateString: "2011/0/1" //formatted date using yyyy/MM/dd format and month is zero based
    *  };
    */
    var kendo = window.kendo,
        ui = kendo.ui,
        Widget = ui.Widget,
        parse = kendo.parseDate,
        template = kendo.template,
        transitions = kendo.support.transitions,
        transitionOrigin = transitions ? transitions.css + "transform-origin" : "",
        cellTemplate = template('<td#=data.cssClass#><a class="k-link" href="\\#" data-#=data.ns#value="#=data.dateString#">#=data.value#</a></td>', { useWithBlock: false }),
        emptyCellTemplate = template("<td>&nbsp;</td>", { useWithBlock: false }),
        CLICK = kendo.support.touch ? "touchend" : "click",
        MIN = "min",
        LEFT = "left",
        SLIDE = "slide",
        MONTH = "month",
        CENTURY = "century",
        CHANGE = "change",
        NAVIGATE = "navigate",
        VALUE = "value",
        HOVER = "k-state-hover",
        DISABLED = "k-state-disabled",
        OTHERMONTH = "k-other-month",
        OTHERMONTHCLASS = ' class="' + OTHERMONTH + '"',
        CELLSELECTOR = "td:has(.k-link)",
        MOUSEENTER = "mouseenter",
        MOUSELEAVE = "mouseleave",
        MS_PER_MINUTE = 60000,
        MS_PER_DAY = 86400000,
        PREVARROW = "_prevArrow",
        NEXTARROW = "_nextArrow",
        proxy = $.proxy,
        extend = $.extend,
        DATE = Date,
        views = {
            month: 0,
            year: 1,
            decade: 2,
            century: 3
        };

    var Calendar = Widget.extend(/** @lends kendo.ui.Calendar.prototype */{
        /**
         * @constructs
         * @extends kendo.ui.Widget
         * @param {DomElement} element DOM element
         * @param {Object} options Configuration options.
         * @option {Date} [value] <null> Specifies the selected date.
         * @option {Date} [min] <Date(1900, 0, 1)> Specifies the minimum date, which the calendar can show.
         * @option {Date} [max] <Date(2099, 11, 31)> Specifies the maximum date, which the calendar can show.
         * @option {String} [footer] <> Specifies the content of the footer. If false, the footer will not be rendered.
         * @option {String} [format] <MM/dd/yyyy> Specifies the format, which is used to parse value set with value() method.
         * @option {String} [start] <month> Specifies the start view.
         * @option {String} [depth] Specifies the navigation depth.
         */
        init: function(element, options) {
            var that = this, value;

            Widget.fn.init.call(that, element, options);

            element = that.element;
            options = that.options;

            element.addClass("k-widget k-calendar");

            that._templates();

            that._header();

            if (options.footer) {
                that._footer();
            }

            element
                .delegate(CELLSELECTOR, MOUSEENTER, mouseenter)
                .delegate(CELLSELECTOR, MOUSELEAVE, mouseleave)
                .delegate(CELLSELECTOR, CLICK, proxy(that._click, that));

            that.bind([
                /**
                * Fires when the selected date is changed
                * @name kendo.ui.Calendar#change
                * @event
                * @param {Event} e
                */
                /**
                * Fires when navigate
                * @name kendo.ui.Calendar#navigate
                * @event
                * @param {Event} e
                */
                CHANGE,
                NAVIGATE
            ], options);

            value = options.value;
            validate(options);

            that._index = views[options.start];
            that._current = new DATE(restrictValue(value, options.min, options.max));

            that.value(value);
        },

        options: {
            name: "Calendar",
            value: null,
            min: new DATE(1900, 0, 1),
            max: new DATE(2099, 11, 31),
            footer : '#= kendo.toString(data,"D") #',
            start: MONTH,
            depth: MONTH,
            animation: {
                horizontal: {
                    effects: SLIDE,
                    duration: 500,
                    divisor: 2
                },
                vertical: {
                    effects: "zoomIn",
                    duration: 400
                }
            }
        },

        /**
        * Gets/Sets the min value of the calendar.
        * @param {Date|String} value The min date to set.
        * @returns {Date} The min value of the calendar.
        * @example
        * var calendar = $("#calendar").data("kendoCalendar");
        *
        * // get the min value of the calendar.
        * var min = calendar.min();
        *
        * // set the min value of the calendar.
        * calendar.min(new Date(1900, 0, 1));
        */
        min: function(value) {
            return this._option(MIN, value);
        },

        /**
        * Gets/Sets the max value of the calendar.
        * @param {Date|String} value The max date to set.
        * @returns {Date} The max value of the calendar.
        * @example
        * var calendar = $("#calendar").data("kendoCalendar");
        *
        * // get the max value of the calendar.
        * var max = calendar.max();
        *
        * // set the max value of the calendar.
        * calendar.max(new Date(2100, 0, 1));
        */
        max: function(value) {
            return this._option("max", value);
        },

        /**
        * Navigates to the past
        * @example
        * calendar.navigateToPast();
        */
        navigateToPast: function() {
            this._navigate(PREVARROW, -1);
        },

        /**
        * Navigates to the future
        * @example
        * calendar.navigateToFuture();
        */
        navigateToFuture: function() {
            this._navigate(NEXTARROW, 1);
        },

        /**
        * Navigates to the upper view
        * @example
        * calendar.navigateUp();
        */
        navigateUp: function() {
            var that = this,
                index = that._index;

            if (that._title.hasClass(DISABLED)) {
                return;
            }

            that.navigate(that._current, ++index);
        },

        /**
        * Navigates to the lower view
        * @param {Date} value Desired date
        * @example
        * calendar.navigateDown(value);
        */
        navigateDown: function(value) {
            var that = this,
            index = that._index,
            depth = that.options.depth;

            if (!value) {
                return;
            }

            if (index === views[depth]) {
                if (+that._value != +value) {
                    that.value(value);
                    that.trigger(CHANGE);
                }
                return;
            }

            that.navigate(value, --index);
        },

        /**
        * Navigates to view
        * @param {Date} value Desired date
        * @param {String} view Desired view
        * @example
        * calendar.navigate(value, view);
        */
        navigate: function(value, view) {
            view = isNaN(view) ? views[view] : view;

            var that = this,
                options = that.options,
                min = options.min,
                max = options.max,
                title = that._title,
                from = that._table,
                selectedValue = that._value,
                currentValue = that._current,
                future = value && +value > +currentValue,
                vertical = view !== undefined && view !== that._index,
                to, currentView, compare;

            //do not navigate if the view is still animating
            if (from && from.parent().data("animating")) {
                return;
            }

            if (!value) {
                value = currentValue;
            } else {
                that._current = value = new DATE(restrictValue(value, min, max))
            }

            if (view === undefined) {
                view = that._index;
            } else {
                that._index = view;
            }

            that._view = currentView = calendar.views[view];
            compare = currentView.compare;

            title.toggleClass(DISABLED, view === views[CENTURY])
            that[PREVARROW].toggleClass(DISABLED, compare(value, min) < 1);
            that[NEXTARROW].toggleClass(DISABLED, compare(value, max) > -1);

            if (!from || that._changeView) {
                title.html(currentView.title(value));

                that._table = to = $(currentView.content(extend({
                    min: min,
                    max: max,
                    date: value
                }, that[currentView.name])));

                that._animate({
                    from: from,
                    to: to,
                    vertical: vertical,
                    future: future
                });

                that.trigger(NAVIGATE);
            }

            if (view === views[options.depth] && selectedValue) {
                that._class("k-state-selected", currentView.toDateString(selectedValue));
            }

            that._changeView = true;
        },

        /**
        * Gets/Sets the value of the calendar.
        * @param {Date|String} value The date to set.
        * @returns {Date} The value of the calendar.
        * @example
        * var calendar = $("#calendar").data("kendoCalendar");
        *
        * // get the value of the calendar.
        * var value = calendar.value();
        *
        * // set the value of the calendar.
        * calendar.value(new Date());
        */
        value: function(value) {
            var that = this,
            view = that._view,
            options = that.options,
            min = options.min,
            max = options.max;

            if (value === undefined) {
                return that._value;
            }

            value = parse(value, options.format);

            if (value !== null) {
                value = new DATE(value);

                if (!isInRange(value, min, max)) {
                    value = null;
                }
            }

            that._value = value;
            that._changeView = !value || view && view.compare(value, that._current) !== 0;

            that.navigate(value);
        },

        _animate: function(options) {
            var that = this,
                from = options.from,
                to = options.to;

            if (!from) {
                to.insertAfter(that.element[0].firstChild);
            } else if (!from.is(":visible") || that.options.animation === false) {
                to.insertAfter(from);
                from.remove();
            } else {
                that[options.vertical ? "_vertical" : "_horizontal"](from, to, options.future);
            }
        },

        _horizontal: function(from, to, future) {
            var that = this,
                horizontal = that.options.animation.horizontal,
                effects = horizontal.effects,
                viewWidth = from.outerWidth();

                if (effects && effects.indexOf(SLIDE) != -1) {
                    from.add(to).css({ width: viewWidth });

                    from.wrap("<div/>");

                    from.parent()
                    .css({
                        position: "relative",
                        width: viewWidth * 2,
                        "float": LEFT,
                        left: future ? 0 : -viewWidth
                    });

                    to[future ? "insertAfter" : "insertBefore"](from);

                    extend(horizontal, {
                        effects: SLIDE + ":" + (future ? LEFT : "right"),
                        complete: function() {
                            from.remove();
                            to.unwrap();
                        }
                    });

                    from.parent().kendoStop(true, true).kendoAnimate(horizontal);
                }
        },

        _vertical: function(from, to) {
            var that = this,
                vertical = that.options.animation.vertical,
                effects = vertical.effects,
                viewWidth = from.outerWidth(),
                cell, position;

            if (effects && effects.indexOf("zoomIn") != -1) {
                to.css({
                    position: "absolute",
                    top: from.prev().outerHeight(),
                    left: 0
                }).insertBefore(from);

                if (transitionOrigin) {
                    cell = that._cellByDate(that._view.toDateString(that._current));
                    position = cell.position();
                    position = (position.left + parseInt(cell.width() / 2)) + "px" + " " + (position.top + parseInt(cell.height() / 2) + "px");
                    to.css(transitionOrigin, position);
                }

                from.kendoStop(true, true).kendoAnimate({
                    effects: "fadeOut",
                    duration: 600,
                    complete: function() {
                        from.remove();
                        to.css({
                            position: "static",
                            top: 0,
                            left: 0
                        });
                    }
                });

                to.kendoStop(true, true).kendoAnimate(vertical);
            }
        },

        _click: function(e) {
            var that = this,
                options = that.options,
                currentValue = that._current,
                link = $(e.currentTarget.firstChild),
                value = link.attr(kendo.attr(VALUE)).split("/");

            //Safari cannot create corretly date from "1/1/2090"
            value = new DATE(value[0], value[1], value[2]);

            e.preventDefault();

            if (link.parent().hasClass(OTHERMONTH)) {
                currentValue = value;
            } else {
                that._view.setDate(currentValue, value);
            }

            that.navigateDown(restrictValue(currentValue, options.min, options.max));
        },

        _focus: function(value) {
            var that = this,
                view = that._view;

            if (view.compare(value, that._current) !== 0) {
                that.navigate(value);
            } else {
                that._current = value;
            }

            that._class("k-state-focused", view.toDateString(value));
        },

        _footer: function() {
            var that = this,
                element = that.element,
                today = new DATE();

            if (!element.find(".k-footer")[0]) {
                element.append('<div class="k-footer"><a href="#" class="k-link k-nav-today"></a></div>');
            }

            that._today = element
                        .find(".k-nav-today")
                        .html(template(that.options.footer)(today))
                        .attr("title", kendo.toString(today, "D"))
                        .bind(CLICK, proxy(that._todayClick, that));
        },

        _header: function() {
            var that = this,
            element = that.element,
            links;

            if (!element.find(".k-header")[0]) {
                element.html('<div class="k-header">'
                           + '<a href="#" class="k-link k-nav-prev"><span class="k-icon k-arrow-prev"></span></a>'
                           + '<a href="#" class="k-link k-nav-fast"></a>'
                           + '<a href="#" class="k-link k-nav-next"><span class="k-icon k-arrow-next"></span></a>'
                           + '</div>');
            }

            links = element.find(".k-link")
                           .hover(mouseenter, mouseleave)
                           .click(false);

            that._title = links.eq(1).bind(CLICK, proxy(that.navigateUp, that));
            that[PREVARROW] = links.eq(0).bind(CLICK, proxy(that.navigateToPast, that));
            that[NEXTARROW] = links.eq(2).bind(CLICK, proxy(that.navigateToFuture, that));
        },

        _cellByDate: function(value) {
            return this._table.find("td:not(." + OTHERMONTH + ")")
                       .filter(function() {
                           return $(this.firstChild).attr(kendo.attr(VALUE)) === value;
                       });
        },

        _class: function(className, value) {
            this._table.find("td:not(." + OTHERMONTH + ")")
                .removeClass(className)
                .filter(function() {
                   return $(this.firstChild).attr(kendo.attr(VALUE)) === value;
                })
                .addClass(className);
        },

        _navigate: function(arrow, modifier) {
            var that = this,
                index = that._index + 1,
                currentValue = new DATE(that._current);

            arrow = that[arrow];

            if (!arrow.hasClass(DISABLED)) {
                if (index > 3) {
                    currentValue.setFullYear(currentValue.getFullYear() + 100 * modifier);
                } else {
                    calendar.views[index].setDate(currentValue, modifier);
                }

                that.navigate(currentValue);
            }
        },

        _option: function(option, value) {
            var that = this,
                options = that.options,
                selectedValue = +that._value,
                bigger, navigate;

            if (value === undefined) {
                return options[option];
            }

            value = parse(value, options.format);

            if (!value) {
                return;
            }

            options[option] = new DATE(value);

            navigate = that._view.compare(value, that._current);

            if (option === MIN) {
                bigger = +value > selectedValue;
                navigate = navigate > -1
            } else {
                bigger = selectedValue > +value;
                navigate = navigate < 1;
            }

            if (bigger) {
                that.value(null);
            } else if (navigate) {
                that.navigate();
            }
        },

        _todayClick: function(e) {
            var that = this,
                depth = views[that.options.depth],
                today = new DATE();

            e.preventDefault();

            if (that._view.compare(that._current, today) === 0 && that._index == depth) {
                that._changeView = false;
            }

            that._value = today;
            that.navigate(today, depth);

            that.trigger(CHANGE);
        },

        _templates: function() {
            var that = this,
                month = that.options.month || {},
                content = month.content,
                empty = month.empty;

            that.month = {
                content: template('<td#=data.cssClass#><a class="k-link" href="\\#" ' + kendo.attr("value") + '="#=data.dateString#" title="#=data.title#">' + (content || "#=data.value#") + '</a></td>', { useWithBlock: !!content }),
                empty: template("<td>" + (empty || "&nbsp;") + "</td>", { useWithBlock: !!empty })
            };
        }
    });

    ui.plugin(Calendar);

    var calendar = {
        firstDayOfMonth: function (date) {
            return new DATE(
                date.getFullYear(),
                date.getMonth(),
                1
            );
        },

        firstVisibleDay: function (date) {
            var firstDay = kendo.culture().calendar.firstDay,
            firstVisibleDay = new DATE(date.getFullYear(), date.getMonth(), 0, date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());

            while (firstVisibleDay.getDay() != firstDay) {
                calendar.setTime(firstVisibleDay, -1 * MS_PER_DAY)
            }

            return firstVisibleDay;
        },

        setTime: function (date, time) {
            var tzOffsetBefore = date.getTimezoneOffset(),
            resultDATE = new DATE(date.getTime() + time),
            tzOffsetDiff = resultDATE.getTimezoneOffset() - tzOffsetBefore;

            date.setTime(resultDATE.getTime() + tzOffsetDiff * MS_PER_MINUTE);
        },
        views: [{
            name: MONTH,
            title: function(date) {
                return kendo.culture().calendar.months.names[date.getMonth()] + " " + date.getFullYear();
            },
            content: function(options) {
                var that = this,
                idx = 0,
                min = options.min,
                max = options.max,
                date = options.date,
                currentCalendar = kendo.culture().calendar,
                firstDayIdx = currentCalendar.firstDay,
                days = currentCalendar.days,
                names = shiftArray(days.names, firstDayIdx),
                abbr = shiftArray(days.namesAbbr, firstDayIdx),
                short = shiftArray(days.namesShort, firstDayIdx),
                start = calendar.firstVisibleDay(date),
                firstDayOfMonth = that.first(date),
                lastDayOfMonth = that.last(date),
                toDateString = that.toDateString,
                today = new DATE(),
                html = '<table class="k-content" cellspacing="0"><thead><tr>';

                for (; idx < 7; idx++) {
                    html += '<th abbr="' + abbr[idx] + '" scope="col" title="' + names[idx] + '">' + short[idx] + '</th>';
                }

                today = +new DATE(today.getFullYear(), today.getMonth(), today.getDate());

                return view({
                    cells: 42,
                    perRow: 7,
                    html: html += "</tr></thead><tbody><tr>",
                    start: new DATE(start.getFullYear(), start.getMonth(), start.getDate()),
                    min: new DATE(min.getFullYear(), min.getMonth(), min.getDate()),
                    max: new DATE(max.getFullYear(), max.getMonth(), max.getDate()),
                    content: options.content,
                    empty: options.empty,
                    setter: that.setDate,
                    build: function(date, idx) {
                        var cssClass = [],
                        day = date.getDay();

                        if (date < firstDayOfMonth || date > lastDayOfMonth) {
                            cssClass.push(OTHERMONTH);
                        }

                        if (+date === today) {
                            cssClass.push("k-today");
                        }

                        if (day === 0 || day === 6) {
                            cssClass.push("k-weekend");
                        }

                        return {
                            date: date,
                            ns: kendo.ns,
                            title: kendo.toString(date, "D"),
                            value: date.getDate(),
                            dateString: toDateString(date),
                            cssClass: cssClass[0] ? ' class="' + cssClass.join(" ") + '"' : ""
                        };
                    }
                });
            },
            first: function(date) {
                return calendar.firstDayOfMonth(date);
            },
            last: function(date) {
                return new DATE(date.getFullYear(), date.getMonth() + 1, 0);
            },
            compare: function(date1, date2) {
                var result,
                month1 = date1.getMonth(),
                year1 = date1.getFullYear(),
                month2 = date2.getMonth(),
                year2 = date2.getFullYear();

                if (year1 > year2) {
                    result = 1;
                } else if (year1 < year2) {
                    result = -1;
                } else {
                    result = month1 == month2 ? 0 : month1 > month2 ? 1 : -1;
                }

                return result;
            },
            setDate: function(date, value) {
                if (value instanceof DATE) {
                    date.setFullYear(value.getFullYear(), value.getMonth(), value.getDate());
                } else {
                    calendar.setTime(date, value * MS_PER_DAY);
                }
            },
            toDateString: function(date) {
                return date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate();
            }
        },
        {
            name: "year",
            title: function(date) {
                return date.getFullYear();
            },
            content: function(options) {
                var namesAbbr = kendo.culture().calendar.months.namesAbbr,
                toDateString = this.toDateString,
                min = options.min,
                max = options.max;

                return view({
                    min: new DATE(min.getFullYear(), min.getMonth(), 1),
                    max: new DATE(max.getFullYear(), max.getMonth(), 1),
                    start: new DATE(options.date.getFullYear(), 0, 1),
                    setter: this.setDate,
                    build: function(date) {
                        return {
                            value: namesAbbr[date.getMonth()],
                            ns: kendo.ns,
                            dateString: toDateString(date),
                            cssClass: ""
                        };
                    }
                });
            },
            first: function(date) {
                return new DATE(date.getFullYear(), 0, date.getDate());
            },
            last: function(date) {
                return new DATE(date.getFullYear(), 11, date.getDate());
            },
            compare: function(date1, date2){
                return compare(date1, date2);
            },
            setDate: function(date, value) {
                if (value instanceof DATE) {
                    date.setFullYear(value.getFullYear(),
                    value.getMonth(),
                    date.getDate());
                } else {
                    var month = date.getMonth() + value;

                    date.setMonth(month);

                    if (month > 11) {
                        month -= 12;
                    }

                    if (month > 0 && date.getMonth() != month) {
                        date.setDate(0);
                    }
                }
            },
            toDateString: function(date) {
                return date.getFullYear() + "/" + date.getMonth() + "/1";
            }
        },
        {
            name: "decade",
            title: function(date) {
                var start = date.getFullYear();

                start = start - start % 10;

                return start + "-" + (start + 9);
            },
            content: function(options) {
                var year = options.date.getFullYear(),
                toDateString = this.toDateString;

                return view({
                    start: new DATE(year - year % 10 - 1, 0, 1),
                    min: new DATE(options.min.getFullYear(), 0, 1),
                    max: new DATE(options.max.getFullYear(), 0, 1),
                    setter: this.setDate,
                    build: function(date, idx) {
                        return {
                            value: date.getFullYear(),
                            ns: kendo.ns,
                            dateString: toDateString(date),
                            cssClass: idx == 0 || idx == 11 ? OTHERMONTHCLASS : ""
                        };
                    }
                });
            },
            first: function(date) {
                var year = date.getFullYear();
                return new DATE(year - year % 10, date.getMonth(), date.getDate());
            },
            last: function(date) {
                var year = date.getFullYear();
                return new DATE(year - year % 10 + 9, date.getMonth(), date.getDate());
            },
            compare: function(date1, date2) {
                return compare(date1, date2, 10);
            },
            setDate: function(date, value) {
                setDate(date, value, 1);
            },
            toDateString: function(date) {
                return date.getFullYear() + "/0/1";
            }
        },
        {
            name: CENTURY,
            title: function(date) {
                var start = date.getFullYear();

                start = start - start % 100;

                return start + "-" + (start + 99);
            },
            content: function(options) {
                var year = options.date.getFullYear(),
                minYear = options.min.getFullYear(),
                maxYear = options.max.getFullYear(),
                toDateString = this.toDateString;

                minYear = minYear - minYear % 10;
                maxYear = maxYear - maxYear % 10;

                if (maxYear - minYear < 10) {
                    maxYear = minYear + 9;
                }

                return view({
                    start: new DATE(year - year % 100 - 10, 0, 1),
                    min: new DATE(minYear, 0, 1),
                    max: new DATE(maxYear, 0, 1),
                    setter: this.setDate,
                    build: function(date, idx) {
                        var year = date.getFullYear();
                        return {
                            value: year + " - " + (year + 9),
                            ns: kendo.ns,
                            dateString: toDateString(date),
                            cssClass: idx == 0 || idx == 11 ? OTHERMONTHCLASS : ""
                        };
                    }
                });
            },
            first: function(date) {
                var year = date.getFullYear();
                return new DATE(year - year % 100, date.getMonth(), date.getDate());
            },
            last: function(date) {
                var year = date.getFullYear();
                return new DATE(year - year % 100 + 99, date.getMonth(), date.getDate());
            },
            compare: function(date1, date2) {
                return compare(date1, date2, 100);
            },
            setDate: function(date, value) {
                setDate(date, value, 10);
            },
            toDateString: function(date) {
                var year = date.getFullYear();
                return (year - year % 10) + "/0/1";
            }
        }]
    }

    function view(options) {
        var idx = 0,
            data,
            view = options.view,
            min = options.min,
            max = options.max,
            start = options.start,
            setter = options.setter,
            build = options.build,
            length = options.cells || 12,
            cellsPerRow = options.perRow || 4,
            toDateString = options.toDateString,
            content = options.content || cellTemplate,
            empty = options.empty || emptyCellTemplate,
            html = options.html || '<table class="k-content k-meta-view" cellspacing="0"><tbody><tr>';

        for(; idx < length; idx++) {
            if (idx > 0 && idx % cellsPerRow == 0) {
                html += "</tr><tr>";
            }

            data = build(start, idx);

            html += isInRange(start, min, max) ? content(data) : empty(data);

            setter(start, 1);
        }

        return html + "</tr></tbody></table>";
    }

    function compare(date1, date2, modifier) {
        var year1 = date1.getFullYear(),
            start  = date2.getFullYear(),
            end = start,
            result = 0;

        if (modifier) {
            start = start - start % modifier;
            end = start - start % modifier + modifier - 1;
        }

        if (year1 > end) {
            result = 1;
        } else if (year1 < start) {
            result = -1;
        }

        return result;
    }

    function restrictValue (value, min, max) {
        var today = new DATE();

        today = new DATE(today.getFullYear(), today.getMonth(), today.getDate());

        if (value) {
            today = new DATE(value);
        }

        if (min > today) {
            today = new DATE(min);
        } else if (max < today) {
            today = new DATE(max);
        }
        return today;
    }

    function isInRange(date, min, max) {
        return +date >= +min && +date <= +max;
    }

    function shiftArray(array, idx) {
        return array.slice(idx).concat(array.slice(0, idx));
    }

    function setDate(date, value, multiplier) {
        value = value instanceof DATE ? value.getFullYear() : date.getFullYear() + multiplier * value;
        date.setFullYear(value);
    }

    function mouseenter() {
        $(this).addClass(HOVER);
    }

    function mouseleave() {
        $(this).removeClass(HOVER);
    }

    function validate(options) {
        var start = views[options.start],
            depth = views[options.depth],
            format = options.format || kendo.culture().calendar.patterns.d;

        if (isNaN(start)) {
            start = 0;
            options.start = MONTH;
        }

        if (depth === undefined || depth > start) {
            options.depth = MONTH;
        }

        if (format.slice(0,3) === "{0:") {
            format = format.slice(3, format.length - 1);
        }

        options.format = format;
    }

    calendar.restrictValue = restrictValue;
    calendar.isInRange = isInRange;
    calendar.validate = validate;
    calendar.viewsEnum = views;

    kendo.calendar = calendar;
})(jQuery);
