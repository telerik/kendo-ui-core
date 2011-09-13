(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Component = ui.Component,
        MONTH = "month",
        YEAR = "year",
        DECADE = "decade",
        CENTURY = "century",
        CLICK = "click",
        VALUE = "value",
        DISABLED = "k-state-disabled",
        SELECTED = "k-state-selected",
        OTHERMONTH = ' class="k-other-month"',
        extend = $.extend,
        proxy = $.proxy,
        DATE = Date;

    function defineViewedDate(value, min, max) {
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

    var Calendar = Component.extend({
        init: function(element, options) {
            var that = this;

            Component.fn.init.call(that, element, options);

            element.addClass("k-widget k-calendar");

            options = that.options;

            that._templates();

            that._header();

            that._viewedDate = viewedDate = defineViewedDate(options.value, options.min, options.max);

            that.element.delegate("td:has(.k-link)", CLICK, function(e) {
                e.preventDefault();
                that.navigateDown(new DATE($(e.currentTarget.children[0]).data(VALUE)));
            });

            that._currentView = options.firstView;

            that.navigate();
        },

        options: {
            value: null,
            min: new Date(1900, 0, 1),
            max: new Date(2099, 11, 31),
            depth: MONTH,
            firstView: MONTH,
            month: {
                content: "<#=data.day#>",
                empty: " "
            }
        },

        _setViewedDate: function(value) {
            var that = this,
            viewedDate = that._viewedDate,
            currentView = that._currentView;

            if (currentView === MONTH) {
                viewedDate.setMonth(viewedDate.getMonth() + value);
            } else {
                if (currentView === DECADE) {
                    value *= 10;
                } else if (currentView === CENTURY) {
                    value *= 100;
                }

                viewedDate.setFullYear(viewedDate.getFullYear() + value);
            }
        },

        navigateToPast: function() {
            var that = this;

            that._setViewedDate(-1);

            that.navigate();
        },

        navigateToFuture: function() {
            var that = this;

            that._setViewedDate(1);

            that.navigate();
        },

        navigateUp: function() {
            var that = this,
                currentView = that._currentView;

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

        navigateDown: function(value) {
            var that = this,
            depth = that.options.depth,
            currentView = that._currentView;

            if (currentView === depth) {
                if (calendar[currentView].compare(value, that._viewedDate) === 0) {
                    that._changeView = false;
                }

                that.value(value);
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

        navigate: function(value, viewName) {
            var that = this,
                dateString, calendarView, compare,
                selectedValue = that._value,
                options = that.options,
                min = options.min,
                max = options.max,
                oldView = that.view,
                newView;

            if (!value) {
                value = that._viewedDate;
            }

            if (!viewName) {
                viewName = that._currentView;
            }

            calendarView = calendar[viewName];
            compare = calendarView.compare;

            that.title
                .toggleClass(DISABLED, viewName === CENTURY)
                .html(calendarView.title(value));

            that.prevArrow.toggleClass(DISABLED, compare(value, min) < 1);
            that.nextArrow.toggleClass(DISABLED, compare(value, max) > -1);

            if (!oldView || that._changeView) {
                newView = $(calendarView.content(extend({
                    min: min,
                    max: max,
                    date: value
                }, that[viewName])));

                if (!oldView) {
                    that.element.append(newView);
                } else {
                    newView.insertBefore(oldView);
                    oldView.remove();
                }

                that.view = newView;
            }

            if (viewName === options.depth && selectedValue) {
                dateString = calendarView.toDateString(selectedValue);

                that.view.find("td:not(.k-other-month)")
                    .removeClass(SELECTED)
                    .filter(function() {
                       return $(this).children().eq(0).data(VALUE) === dateString;
                    })
                    .addClass(SELECTED);
            }

            that._changeView = true;
        },

        value: function(value) {
            var that = this,
            options = that.options,
            min = options.min,
            max = options.max;

            if (value === undefined) {
                return that._value;
            }

            if (value !== null) {
                value = new Date(value);

                if (isNaN(value.getDate())) {
                    value = null;
                } else if(value < min) {
                    value = new DATE(min);
                } else if(value > max) {
                    value = new DATE(max);
                }
            }

            that._value = value;
            that._viewedDate = new DATE(value);

            that.navigate(value, options.depth);
        },

        _header: function() {
            var that = this,
            element = that.element;

            if (!element.find(".k-header")[0]) {
                element.html('<div class="k-header">'
                           + '<a href="#" class="k-link k-nav-prev"><span class="k-icon k-arrow-prev"></span></a>'
                           + '<a href="#" class="k-link k-nav-fast"></a>'
                           + '<a href="#" class="k-link k-nav-next"><span class="k-icon k-arrow-next"></span></a>'
                           + '</div>');
            }

            that.prevArrow = element.find(".k-nav-prev")
                                    .bind(CLICK, function(e) {
                                        e.preventDefault();
                                        if (!that.prevArrow.hasClass(DISABLED)) {
                                            that.navigateToPast();
                                        }
                                    });

            that.title = element.find(".k-nav-fast")
                                .bind(CLICK, function(e) {
                                    e.preventDefault();
                                    if (!that.title.hasClass(DISABLED)) {
                                        that.navigateUp();
                                    }
                                });

            that.nextArrow = element.find(".k-nav-next")
                                    .bind(CLICK, function(e) {
                                        e.preventDefault();
                                        if (!that.nextArrow.hasClass(DISABLED)) {
                                            that.navigateToFuture();
                                        }
                                    });
        },

        _templates: function() {
            var that = this,
                month = that.options.month,
                template = kendo.template;

            that.month = {
                content: template('<td<#=data.otherMonth#>><a class="k-link" href="#" data-value="<#=data.dateString#>" title="<#=data.title#>">' + month.content + '</a></td>'),
                empty: template("<td>" + month.empty + "</td>")
            };
        }
    });

    kendo.ui.Calendar = Calendar;

    var calendar = {
        msPerMinute: 60000,
        msPerDay: 86400000,
        firstDayOfMonth: function (date) {
            return new DATE(
                date.getFullYear(),
                date.getMonth(),
                1,
                date.getHours(),
                date.getMinutes(),
                date.getSeconds(),
                date.getMilliseconds()
            );
        },

        firstVisibleDay: function (date) {
            var firstDayOfWeek = kendo.culture().calendar.firstDayOfWeek,
                firstVisibleDay = new DATE(date.getFullYear(), date.getMonth(), 0, date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());

            while (firstVisibleDay.getDay() != firstDayOfWeek) {
                calendar.setTime(firstVisibleDay, -1 * calendar.msPerDay)
            }

            return firstVisibleDay;
        },

        setTime: function (date, time) {
            var tzOffsetBefore = date.getTimezoneOffset(),
                resultDATE = new DATE(date.getTime() + time),
                tzOffsetDiff = resultDATE.getTimezoneOffset() - tzOffsetBefore;

            date.setTime(resultDATE.getTime() + tzOffsetDiff * calendar.msPerMinute);
        },

        month: {
            title: function(date) {
                return kendo.culture().calendar.months.names[date.getMonth()] + " " + date.getFullYear();
            },
            content: function(options) {
                var idx = 0, data,
                    date = options.date,
                    currentCalendar = kendo.culture().calendar,
                    firstDayIdx = currentCalendar.firstDayOfWeek,
                    days = currentCalendar.days,
                    names = shiftArray(days.names, firstDayIdx),
                    abbr = shiftArray(days.namesAbbr, firstDayIdx),
                    short = shiftArray(days.namesShort, firstDayIdx),
                    start = calendar.firstVisibleDay(date),
                    firstDayOfMonth = calendar.firstDayOfMonth(date),
                    lastDayOfMonth = new DATE(firstDayOfMonth.getFullYear(), firstDayOfMonth.getMonth() + 1, 0),
                    min = options.min,
                    max = options.max,
                    content = options.content,
                    empty = options.empty,
                    html = '<table class="k-content"><thead><tr>';

                for (; idx < 7; idx++) {
                    html += '<th abbr="' + abbr[idx] + '" scope="col" title="' + names[idx] + '">' + short[idx] + '</th>';
                }

                html += "</tr></thead><tbody><tr>";

                start = new DATE(start.getFullYear(), start.getMonth(), start.getDate());
                min = new DATE(min.getFullYear(), min.getMonth(), min.getDate());
                max = new DATE(max.getFullYear(), max.getMonth(), max.getDate());

                for (idx = 0; idx < 42; idx++) {
                    if (idx > 0 && idx % 7 == 0) {
                        html += "</tr><tr>";
                    }

                    data = {
                        date: start,
                        title: kendo.toString(start, "D"),
                        day: start.getDate(),
                        dateString: this.toDateString(start),
                        otherMonth: start < firstDayOfMonth || start > lastDayOfMonth ? OTHERMONTH : ''
                    };

                    html += inRange(start, min, max) ? content(data) : empty(data);

                    start.setDate(start.getDate() + 1);
                }

                return html + "</tr></tbody></table>";
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
                    min = options.min,
                    max = options.max;

                extend(options, {
                    min: new DATE(min.getFullYear(), min.getMonth(), 1),
                    max: new DATE(max.getFullYear(), max.getMonth(), 1),
                    start: new DATE(options.date.getFullYear(), 0, 1),
                    setter: function(date) {
                        date.setMonth(date.getMonth() + 1);
                    },
                    toString: function(date) {
                        return namesAbbr[date.getMonth()];
                    },
                    toDateString: this.toDateString
                });

                return view(options);
            },
            compare: function(date1, date2){
                return compare(date1, date2);
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
                var year = options.date.getFullYear();

                extend(options, {
                    view: DECADE,
                    start: new DATE(year = year - year % 10 - 1, 0, 1),
                    min: new DATE(options.min.getFullYear(), 0, 1),
                    max: new DATE(options.max.getFullYear(), 0, 1),
                    setter: function(date) {
                        date.setFullYear(date.getFullYear() + 1);
                    },
                    toString: function(date) {
                        return date.getFullYear();
                    },
                    toDateString: this.toDateString
                });

                return view(options);
            },
            compare: function(date1, date2) {
                return compare(date1, date2, 10);
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
                var year = options.date.getFullYear();

                extend(options, {
                    view: CENTURY,
                    start: new DATE(year - year % 100 - 10, 0, 1),
                    min: new DATE(options.min.getFullYear() - 10, 0, 1),
                    max: new DATE(options.max.getFullYear(), 0, 1),
                    setter: function(date) {
                        date.setFullYear(date.getFullYear() + 10);
                    },
                    toString: function(date) {
                        var year = date.getFullYear();
                        return year + "-" + (year + 9);
                    },
                    toDateString: this.toDateString
                });

                return view(options);
            },
            compare: function(date1, date2) {
                return compare(date1, date2, 100);
            },
            toDateString: function(date) {
                var year = date.getFullYear();
                return "1/1/" + (year - year % 10);
            }
        }
    }

    function view(options) {
        var idx = 0, otherMonth,
            view = options.view,
            min = options.min,
            max = options.max,
            start = options.start,
            setter = options.setter,
            toString = options.toString,
            toDateString = options.toDateString,
            html = '<table class="k-content k-meta-view" cellspacing="0"><tbody><tr>';

        for(; idx < 12; idx++) {
            if (idx > 0 && idx % 4 == 0) {
                html += "</tr><tr>";
            }

            if (inRange(start, min, max)) {
                html += '<td';

                if (view != undefined && (idx == 0 || idx == 11)) {
                    html += OTHERMONTH;
                }

                html += '><a class="k-link" data-value="' + toDateString(start) + '">' + toString(start) + "</a></td>";
            } else {
                html += "<td> </td>";
            }

            setter(start);
        }

        return html + "</tr></tbody></table>";
    }

    function compare(date1, date2, modifier) {
        var year1 = date1.getFullYear(),
            year2 = date2.getFullYear(),
            result = 0;

        if (modifier) {
            if (year2 > year1) {
                year1 += modifier;
            } else if (year2 < year1) {
                year1 -= modifier;
            }
        }

        if (year1 > year2) {
            result = 1;
        } else if (year1 < year2) {
            result = -1;
        }

        return result;

    }

    function inRange(date, min, max) {
        return +date >= +min && +date <= +max;
    }

    function shiftArray(array, idx) {
        return array.slice(idx).concat(array.slice(0, idx));
    }

    kendo.calendar = calendar;

})(jQuery);
