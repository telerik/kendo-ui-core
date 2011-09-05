(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Component = ui.Component,
        extend = $.extend,
        DATE = Date;

    function defineCurrentDate(value, min, max) {
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

            that.current = defineCurrentDate(that.value, that.options.min, that.options.max);

            that._templates();

            that._header();

            that.currentView = that.options.firstView;

            that.view = $('<table class="k-content">');
            that.element.append(that.view); //append table;

            that.element.find(".k-nav-prev:not(.k-state-disabled)")
                .bind("click", $.proxy(function(e) {
                    e.preventDefault();
                    that.navigateToPast();
                }));

            that.element.find(".k-nav-next:not(.k-state-disabled)")
                .bind("click", $.proxy(function(e) {
                    e.preventDefault();
                    that.navigateToFuture();
                }));

            that.element.find(".k-nav-fast:not(.k-state-disabled)")
                .bind("click", $.proxy(function(e) {
                    e.preventDefault();
                    that.navigateUp();
                }));

            that.navigate(that.options.value);
        },

        options: {
            value: null,
            min: new Date(1900, 0, 1),
            max: new Date(2099, 11, 31),
            depth: "month",
            firstView: "month",
            month: {
                content: "<#=data.day#>",
                empty: " "
            }
        },

        navigateToPast: function() {
            var that = this,
            current = that.current,
            currentView = that.currentView;

            if (currentView === "month") {
                current.setMonth(current.getMonth() - 1);
            } else if (currentView === "year") {
                current.setFullYear(current.getFullYear() - 1);
            } else if (currentView === "decade") {
                current.setFullYear(current.getFullYear() - 10);
            } else if (currentView == "century") {
                current.setFullYear(current.getFullYear() - 100);
            }

            that.navigate(current, that.currentView);
        },

        navigateToFuture: function() {
            var that = this,
            current = that.current,
            currentView = that.currentView;

            if (currentView === "month") {
                current.setMonth(current.getMonth() + 1);
            } else if (currentView === "year") {
                current.setFullYear(current.getFullYear() + 1);
            } else if (currentView === "decade") {
                current.setFullYear(current.getFullYear() + 10);
            } else if (currentView == "century") {
                current.setFullYear(current.getFullYear() + 100);
            }

            that.navigate(current, that.currentView);
        },

        navigateUp: function() {
            var that = this,
                currentView = that.currentView;

            if (currentView === "month") {
                that.currentView = "year";
            } else if (currentView === "year") {
                that.currentView = "decade";
            } else if (currentView === "decade") {
                that.currentView = "century";
                that.element.find(".k-nav-fast").addClass("k-state-disabled");
            }

            that.navigate(that.current, that.currentView);
        },

        navigate: function(date, view) {
            var that = this,
            options = that.options,
            template;

            date = date || that.current;
            view = view || options.firstView;

            that.title.html(calendar[view].title(date));

            var newView = $(calendar[view].content(extend({
                min: options.min,
                max: options.max,
                date: date
            }, that[view])))

            newView.insertAfter(that.view);
            that.view.remove();
            that.view = newView;
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

            that.prevArrow = element.find(".k-nav-prev");
            that.title = element.find(".k-nav-fast");
            that.nextArrow = element.find(".k-nav-next");
        },

        _templates: function() {
            var that = this,
                month = that.options.month,
                template = kendo.template,
                MONTH = "month";


            that.month = {
                content: template('<td><a class="k-link" href="#" title="<#=data.title#>">' + month.content + '</a></td>'),
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

        pad: function (value) {
            if (value < 10) {
                return '0' + value;
            }

            return value;
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
                        day: start.getDate()
                    };

                    html += inRange(start, min, max) ? content(data) : empty(data);
                }

                return html + "</tr></tbody></table>";
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
                    render: function(date) {
                        return namesAbbr[date.getMonth()];
                    }
                });

                return view(options);
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
                    render: function(date) {
                        return date.getFullYear();
                    }
                });

                return view(options);
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
                    render: function(date) {
                        var year = date.getFullYear();
                        return year + "-" + (year + 9);
                    }
                });

                return view(options);
            }
        }
    }

    function view(options) {
        var idx = 0,
            min = options.min,
            max = options.max,
            start = options.start,
            setter = options.setter,
            render = options.render,
            html = '<table class="k-content k-meta-view" cellspacing="0"><tbody><tr>';

        for(; idx < 12; idx++) {
            if (idx > 0 && idx % 4 == 0) {
                html += "</tr><tr>";
            }

            if (inRange(start, min, max)) {
                html += '<td><a class="k-link">' + render(start) + "</a></td>";
            } else {
                html += "<td> </td>";
            }

            setter(start);
        }

        return html + "</tr></tbody></table>";
    }

    function inRange(date, min, max) {
        return +date >= +min && +date <= +max;
    }

    function shiftArray(array, idx) {
        return array.slice(idx).concat(array.slice(0, idx));
    }

    kendo.calendar = calendar;

})(jQuery);
