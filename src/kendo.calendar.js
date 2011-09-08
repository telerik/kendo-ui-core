(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Component = ui.Component,
        MONTH = "month",
        YEAR = "year",
        DECADE = "decade",
        CENTURY = "century",
        CLICK = "click",
        DISABLED = "k-state-disabled",
        SELECTED = "k-state-selected",
        DAYSELECTOR = "td:not(k-other-month)",
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
            var that = this,
                viewedDate;

            Component.fn.init.call(that, element, options);

            element.addClass("k-widget k-calendar");

            options = that.options;

            that._templates();

            that._header();

            that._viewedDate = viewedDate = defineViewedDate(options.value, options.min, options.max);

            that.element.delegate(DAYSELECTOR, CLICK, function(e) {
                e.preventDefault();
                that.navigateDown(new DATE($(e.currentTarget.children[0]).data("value")));
            });

            that.currentView = options.firstView;

            that.view = $('<table class="k-content">');
            that.element.append(that.view);

            that.navigate(viewedDate, that.currentView);
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

        _setDate: function(direction) {
            var that = this,
            viewedDate = that._viewedDate,
            currentView = that.currentView,
            value = direction * 1;

            if (currentView === MONTH) {
                viewedDate.setMonth(viewedDate.getMonth() + value);
            } else {
                if (currentView === DECADE) {
                    value *= 10;
                } else if (currentView ===CENTURY) {
                    value *= 100;
                }

                viewedDate.setFullYear(viewedDate.getFullYear() + value);
            }
        },

        navigateToPast: function() {
            var that = this;

            that._setDate(-1);

            that.navigate(that._viewedDate, that.currentView);
        },

        navigateToFuture: function() {
            var that = this;

            that._setDate(1);

            that.navigate(that._viewedDate, that.currentView);
        },

        navigateUp: function() {
            var that = this,
                currentView = that.currentView;

            if (currentView === MONTH) {
                that.currentView = YEAR;
            } else if (currentView === YEAR) {
                that.currentView = DECADE;
            } else if (currentView === DECADE) {
                that.currentView = CENTURY;
            }

            that.navigate(that._viewedDate, that.currentView);
        },

        navigateDown: function(value) {
            var that = this,
            depth = that.options.depth,
            currentView = that.currentView;

            if (currentView === depth) {
                that.value(value);
                return;
            }

            if (currentView === CENTURY) {
                that.currentView = DECADE;
            } else if (currentView === DECADE) {
                that.currentView = YEAR;
            } else if (currentView === YEAR) {
                that.currentView = MONTH;
            }

            that.navigate(value, that.currentView);
        },

        navigate: function(date, viewName) {
            var that = this,
                dateString,
                selectedValue = that._value,
                options = that.options,
                min = options.min,
                max = options.max,
                view = calendar[viewName],
                compare = view.compare,
                oldView = that.view,
                newView;

            date = date || that._viewedDate;

            that.title
                .toggleClass(DISABLED, viewName === CENTURY)
                .html(view.title(date));

            that.prevArrow.toggleClass(DISABLED, compare(date, min) < 1);
            that.nextArrow.toggleClass(DISABLED, compare(date, max) > -1);

            newView = $(view.content(extend({
                min: min,
                max: max,
                date: date
            }, that[viewName])));

            if (viewName === options.depth && selectedValue) {
                dateString = view.toDateString(selectedValue);

                newView.find(DAYSELECTOR)
                       .removeClass(SELECTED)
                       .filter(function() {
                           return $(this).children().eq(0).data("value") === dateString;
                       })
                       .addClass(SELECTED);
            }

            //animate
            //var wrapper = kendo.wrap(oldView);
            //newView.insertBefore(oldView);

            //oldView.css("float", "left");
            //newView.css("float", "left");

            //var offset = oldView.offset();
            //var width = oldView.outerWidth();

            //wrapper.css({
            //    left: offset.left - width,
            //    width: width * 2,
            //    position: "relative",
            //    overflow: "visible"
            //});

            //that.view = newView;

            newView.insertBefore(oldView);
            that.view = newView;
            oldView.remove();
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
            element = that.element,
            prevArrow, nextArrow, title;

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
                    currentCalendar = kendo.culture().calendar,
                    firstDayIdx = currentCalendar.firstDayOfWeek,
                    days = currentCalendar.days,
                    names = shiftArray(days.names, firstDayIdx),
                    abbr = shiftArray(days.namesAbbr, firstDayIdx),
                    short = shiftArray(days.namesShort, firstDayIdx),
                    start = calendar.firstVisibleDay(options.date),
                    firstDayOfMonth = calendar.firstDayOfMonth(options.date),
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

                start.setDate(start.getDate() - 1);
                min = new DATE(min.getFullYear(), min.getMonth(), min.getDate());
                max = new DATE(max.getFullYear(), max.getMonth(), max.getDate());

                for (idx = 0; idx < 42; idx++) {
                    if (idx > 0 && idx % 7 == 0) {
                        html += "</tr><tr>";
                    }

                    start.setDate(start.getDate() + 1);

                    data = {
                        date: start,
                        title: kendo.toString(start, "D"),
                        day: start.getDate(),
                        dateString: this.toDateString(start),
                        otherMonth: start < firstDayOfMonth || start > lastDayOfMonth ? ' class="k-other-month"' : ''
                    };

                    html += inRange(start, min, max) ? content(data) : empty(data);
                }

                return html + "</tr></tbody></table>";
            },
            compare: function(date1, date2) {
                var result,
                    date1Month = date1.getMonth(),
                    date1Year = date1.getFullYear(),
                    date2Month = date2.getMonth(),
                    date2Year = date2.getFullYear();

                if (date1Year > date2Year) {
                    result = 1;
                } else if (date1Year < date2Year) {
                    result = -1;
                } else {
                    result = date1Month == date2Month ? 0 : date1Month > date2Month ? 1 : -1;
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
        var idx = 0,
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
                html += '<td><a class="k-link" data-value="' + toDateString(start) + '">' + toString(start) + "</a></td>";
            } else {
                html += "<td> </td>";
            }

            setter(start);
        }

        return html + "</tr></tbody></table>";
    }

    function compare(date1, date2, modifier) {
        var date1year = date1.getFullYear(),
            date2year = date2.getFullYear(),
            result = 0;

        if (modifier) {
            if (date2year > date1year) {
                date1year += modifier;
            } else if (date2year < date1year) {
                date1year -= modifier;
            }
        }

        if (date1year > date2year) {
            result = 1;
        } else if (date1year < date2year) {
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
