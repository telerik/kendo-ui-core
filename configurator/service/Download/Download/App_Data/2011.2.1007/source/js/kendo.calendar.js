(function($, undefined) {
    /**
    * @name kendo.ui.Calendar.Description
    *
    * @section
    *   <p>
    *       The Calendar widget allows to the end user to select a date from a graphical calendar.
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
    *    The first rendered view can be defined with "startView" option. Navigation depth
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
    *      startView: "year",
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
    *    dateString: toDateString(date) //Date formatted using "MM/dd/yyyy" format
    *  };
    */
    var kendo = window.kendo,
        ui = kendo.ui,
        touch = kendo.support.touch,
        Component = ui.Component,
        template = kendo.template,
        transitions = kendo.support.transitions,
        transitionOrigin = transitions ? transitions.css + "transform-origin" : "",
        cellTemplate = template('<td#=data.cssClass#><a class="k-link" href="\\#" data-value="#=data.dateString#">#=data.value#</a></td>'),
        cellEmptyTemplate = template("<td>&nbsp;</td>"),
        LEFT = "left",
        SLIDE = "slide",
        MONTH = "month",
        YEAR = "year",
        DECADE = "decade",
        CENTURY = "century",
        CLICK = "click",
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
        msPerMinute = 60000,
        msPerDay = 86400000,
        proxy = $.proxy,
        extend = $.extend,
        DATE = Date;

    var Calendar = Component.extend(/** @lends kendo.ui.Calendar.prototype */{
        /**
         * @constructs
         * @extends kendo.ui.Component
         * @param {DomElement} element DOM element
         * @param {Object} options Configuration options.
         * @option {Date} [value] <null> Specifies the selected date.
         * @option {Date} [min] <Date(1900, 0, 1)> Specifies the minimum date, which the calendar can show.
         * @option {Date} [max] <Date(2099, 11, 31)> Specifies the maximum date, which the calendar can show.
         * @option {String} [footer] <> Specifies the content of the footer. If false, the footer will not be rendered.
         * @option {String} [format] <MM/dd/yyyy> Specifies the format, which is used to parse value set with value() method.
         * @option {String} [startView] <month> Specifies the start view.
         * @option {String} [depth] Specifies the navigation depth.
         */
        init: function(element, options) {
            var that = this;

            Component.fn.init.call(that, element, options);

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

            that._currentView = options.startView;

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

            that.value(options.value);
        },

        options: {
            value: null,
            min: new Date(1900, 0, 1),
            max: new Date(2099, 11, 31),
            footer : '#= kendo.toString(data,"D") #',
            format: kendo.culture().calendar.patterns.d,
            startView: MONTH,
            depth: MONTH,
            month: {
                content: "#=data.value#",
                empty: "&nbsp;"
            },
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
            var that = this,
                options = that.options;

            if (value === undefined) {
                return options.min;
            }

            value = kendo.parseDate(value, options.format);

            if (!value) {
                return;
            }

            options.min = new DATE(value);

            if (+value > +that._value) {
                that.value(null);
            } else if (that._view.compare(value, that._viewedValue) > -1) {
                that.navigate();
            }
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
            var that = this,
                options = that.options;

            if (value === undefined) {
                return options.max;
            }

            value = kendo.parseDate(value, options.format);

            if (!value) {
                return;
            }

            options.max = new DATE(value);

            if (+value < +that._value) {
                that.value(null);
            } else if (that._view.compare(value, that._viewedValue) < 1) {
                that.navigate();
            }
        },

        /**
        * Navigates to the past
        * @example
        * calendar.navigateToPast();
        */
        navigateToPast: function() {
            var that = this;
            if (!that._prevArrow.hasClass(DISABLED)) {
                that.navigate(that._setViewedValue(-1));
            }
        },

        /**
        * Navigates to the future
        * @example
        * calendar.navigateToFuture();
        */
        navigateToFuture: function() {
            var that = this;
            if (!that._nextArrow.hasClass(DISABLED)) {
                that.navigate(that._setViewedValue(1));
            }
        },

        /**
        * Navigates to the upper view
        * @example
        * calendar.navigateUp();
        */
        navigateUp: function() {
            var that = this,
                currentView = that._currentView;

            if (currentView == CENTURY) {
                return;
            }

            if (currentView === MONTH) {
                currentView = YEAR;
            } else if (currentView === YEAR) {
                currentView = DECADE;
            } else if (currentView === DECADE) {
                currentView = CENTURY;
            }

            that._currentView = currentView;

            that.navigate();
        },

        /**
        * Navigates to the lower view
        * @param {Date} value Desired date
        * @example
        * calendar.navigateDown(value);
        */
        navigateDown: function(value) {
            var that = this,
            depth = that.options.depth,
            currentView = that._currentView;

            if (!value) {
                return;
            }

            if (currentView === depth) {
                if (that._view.compare(value, that._viewedValue) === 0) {
                    that._changeView = false;
                }

                if (+that._value != +value) {
                    that.value(value);
                    that.trigger(CHANGE);
                }

                return;
            }

            if (currentView === CENTURY) {
                currentView = DECADE;
            } else if (currentView === DECADE) {
                currentView = YEAR;
            } else if (currentView === YEAR) {
                currentView = MONTH;
            }

            that._currentView = currentView;

            that.navigate(value);
        },

        /**
        * Navigates to view
        * @param {Date} value Desired date
        * @param {String} viewName Desired view
        * @example
        * calendar.navigate(value, view);
        */
        navigate: function(value, viewName) {
            var that = this,
                view, compare,
                options = that.options,
                min = options.min,
                max = options.max,
                title = that._title,
                oldTable = that._table,
                selectedValue = that._value,
                viewedValue = that._viewedValue,
                future = value && +value > +viewedValue,
                vertical = !value || +value === +viewedValue,
                newTable;

            if (oldTable && oldTable.parent().data("animating")) {
                return;
            }

            if (!value) {
                value = viewedValue;
            } else {
                that._viewedValue = value = new DATE(restrictValue(value, min, max))
            }

            if (!viewName) {
                viewName = that._currentView;
            } else {
                that._currentView = viewName;
            }

            that._view = view = calendar[viewName];
            compare = view.compare;

            title.toggleClass(DISABLED, viewName === CENTURY)
            that._prevArrow.toggleClass(DISABLED, compare(value, min) < 1);
            that._nextArrow.toggleClass(DISABLED, compare(value, max) > -1);

            if (!oldTable || that._changeView) {
                title.html(view.title(value));

                newTable = $(view.content(extend({
                    min: min,
                    max: max,
                    date: value
                }, that[viewName])));

                that._table = newTable;

                that._animate({
                    oldTable: oldTable,
                    newTable: newTable,
                    vertical: vertical,
                    future: future
                });

                that.trigger(NAVIGATE);
            }

            if (viewName === options.depth && selectedValue) {
                that._setClass("k-state-selected", view.toDateString(selectedValue));
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
            options = that.options,
            min = options.min,
            max = options.max;

            if (value === undefined) {
                return that._value;
            }

            value = kendo.parseDate(value, options.format);

            if (value !== null) {
                value = new Date(value);

                if (!isInRange(value, min, max)) {
                    value = null;
                }
            }

            that._value = value;
            that._viewedValue = new DATE(restrictValue(value, min, max));

            that.navigate(value || that._viewedValue);
        },

        _animate: function(options) {
            var that = this,
                oldTable = options.oldTable,
                newTable = options.newTable;

            if (!oldTable) {
                newTable.insertAfter(that.element[0].firstChild);
            } else if (!oldTable.is(":visible") || that.options.animation === false) {
                newTable.insertAfter(oldTable);
                oldTable.remove();
            } else {
                if (options.vertical) {
                    that._animateVertical(oldTable, newTable);
                } else {
                    that._animateHorizontal(oldTable, newTable, options.future);
                }
            }
        },

        _animateHorizontal: function(oldTable, newTable, future) {
            var that = this,
                horizontal = that.options.animation.horizontal,
                effects = horizontal.effects,
                viewWidth = oldTable.outerWidth();

                if (effects && effects.indexOf(SLIDE) != -1) {
                    oldTable.add(newTable).css({ width: viewWidth });

                    oldTable.wrap("<div/>");

                    oldTable.parent()
                    .css({
                        position: "relative",
                        width: viewWidth * 2,
                        "float": LEFT,
                        left: future ? 0 : -viewWidth
                    });

                    newTable[future ? "insertAfter" : "insertBefore"](oldTable);

                    extend(horizontal, {
                        effects: SLIDE + ":" + (future ? LEFT : "right"),
                        complete: function() {
                            oldTable.remove();
                            newTable.unwrap();
                        }
                    });

                    oldTable.parent().kendoStop(true, true).kendoAnimate(horizontal);
                }
        },

        _animateVertical: function(oldTable, newTable) {
            var that = this,
                vertical = that.options.animation.vertical,
                effects = vertical.effects,
                viewWidth = oldTable.outerWidth(),
                cell, position;

            if (effects && effects.indexOf("zoomIn") != -1) {
                newTable.css({
                    position: "absolute",
                    top: oldTable.prev().outerHeight(),
                    left: 0
                }).insertBefore(oldTable);

                if (transitionOrigin) {
                    cell = that._getCell(that._view.toDateString(that._viewedValue));
                    position = cell.position();
                    position = (position.left + parseInt(cell.width() / 2)) + "px" + " " + (position.top + parseInt(cell.height() / 2) + "px");
                    newTable.css(transitionOrigin, position);
                }

                oldTable.kendoStop(true, true).kendoAnimate({
                    effects: "fadeOut",
                    duration: 600,
                    complete: function() {
                        oldTable.remove();
                        newTable.css({
                            position: "static",
                            top: 0,
                            left: 0
                        });
                    }
                });

                newTable.kendoStop(true, true).kendoAnimate(vertical);
            }
        },

        _click: function(e) {
            var that = this,
                viewedValue = that._viewedValue,
                link = $(e.currentTarget.firstChild),
                value = link.data(VALUE).split("/");

            //Safari cannot create corretly date from "1/1/2090"
            value = new DATE(parseInt(value[2]), parseInt(value[0]) - 1, parseInt(value[1]));

            e.preventDefault();

            if (link.parent().hasClass(OTHERMONTH)) {
                viewedValue = value;
            } else {
                that._view.setDate(viewedValue, value);
            }

            that.navigateDown(viewedValue);
        },

        _focus: function(value) {
            var that = this,
                view = that._view;

            if (view.compare(value, that._viewedValue) !== 0) {
                that.navigate(value);
            } else {
                that._viewedValue = value;
            }

            that._setClass("k-state-focused", view.toDateString(value));
        },

        _footer: function() {
            var that = this,
            element = that.element,
            today = new DATE();

            if (!element.find(".k-footer")[0]) {
                element.append('<div class="k-footer"><a href="#" class="k-link k-nav-today"></a></div>');
            }

            element.find(".k-nav-today")
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

            links = element.find(".k-link").hover(mouseenter, mouseleave).click(false);

            that._prevArrow = links.eq(0)
                                  .bind(touch ? "touchend" : CLICK, function(e) {
                                      if (!that._prevArrow.hasClass(DISABLED)) {
                                          that.navigateToPast();
                                      }
                                  });

            that._title = links.eq(1)
                              .bind(touch ? "touchend" : CLICK, function(e) {
                                  if (!that._title.hasClass(DISABLED)) {
                                      that.navigateUp();
                                  }
                              });

            that._nextArrow = links.eq(2)
                                  .bind(touch ? "touchend" : CLICK, function(e) {
                                      if (!that._nextArrow.hasClass(DISABLED)) {
                                          that.navigateToFuture();
                                      }
                                  });
        },

        _getCell: function(value) {
            return this._table
                       .find("td:not(." + OTHERMONTH + ")")
                       .filter(function() {
                           return $(this.firstChild).data(VALUE) === value;
                       });
        },

        _setClass: function(className, value) {
            this._table
                .find("td:not(." + OTHERMONTH + ")")
                .removeClass(className)
                .filter(function() {
                   return $(this.firstChild).data(VALUE) === value;
                })
                .addClass(className);
        },

        _setViewedValue: function(value) {
            var that = this,
            viewedValue = new DATE(that._viewedValue),
            currentView = that._currentView;

            if (currentView === MONTH) {
                viewedValue.setMonth(viewedValue.getMonth() + value);
            } else {
                if (currentView === DECADE) {
                    value *= 10;
                } else if (currentView === CENTURY) {
                    value *= 100;
                }

                viewedValue.setFullYear(viewedValue.getFullYear() + value);
            }
            return viewedValue;
        },

        _todayClick: function(e) {
            var that = this,
                today = new DATE();

            e.preventDefault();

            if (that._view.compare(that._viewedValue, today) === 0 && that._currentView == that.options.depth) {
                that._changeView = false;
            }

            that._currentView = that.options.depth;

            that.value(today);
            that.trigger(CHANGE);
        },

        _templates: function() {
            var that = this,
                month = that.options.month;

            that.month = {
                content: template('<td#=data.cssClass#><a class="k-link" href="\\#" data-value="#=data.dateString#" title="#=data.title#">' + month.content + '</a></td>'),
                empty: template("<td>" + month.empty + "</td>")
            };
        }
    });

    ui.plugin("Calendar", Calendar);

    var calendar = {
        firstDayOfMonth: function (date) {
            return new DATE(
                date.getFullYear(),
                date.getMonth(),
                1
            );
        },

        firstVisibleDay: function (date) {
            var firstDayOfWeek = kendo.culture().calendar.firstDayOfWeek,
                firstVisibleDay = new DATE(date.getFullYear(), date.getMonth(), 0, date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());

            while (firstVisibleDay.getDay() != firstDayOfWeek) {
                calendar.setTime(firstVisibleDay, -1 * msPerDay)
            }

            return firstVisibleDay;
        },

        setTime: function (date, time) {
            var tzOffsetBefore = date.getTimezoneOffset(),
                resultDATE = new DATE(date.getTime() + time),
                tzOffsetDiff = resultDATE.getTimezoneOffset() - tzOffsetBefore;

            date.setTime(resultDATE.getTime() + tzOffsetDiff * msPerMinute);
        },

        month: {
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
                    firstDayIdx = currentCalendar.firstDayOfWeek,
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
                    calendar.setTime(date, value * msPerDay);
                }
            },
            toDateString: function(date) {
                return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
            }
        },

        year: {
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
                    var day = date.getDate(),
                        month = date.getMonth() + value;

                    date.setMonth(month);

                    if (month > 11) {
                        month -= 11;
                    } else if (month < 0) {
                        month = 11 + month;
                    }

                    if (date.getMonth() != month) {
                        date.setMonth(month);
                    }
                }
            },
            toDateString: function(date) {
                return (date.getMonth() + 1) + "/1/" + date.getFullYear();
            }
        },
        decade: {
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
                return "1/1/" + date.getFullYear();
            }
        },
        century: {
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
                return "1/1/" + (year - year % 10);
            }
        }
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
            empty = options.empty || cellEmptyTemplate,
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

    calendar.restrictValue = restrictValue;
    calendar.isInRange = isInRange;

    kendo.calendar = calendar;
})(jQuery);
