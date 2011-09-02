(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Component = ui.Component,
        extend = $.extend,
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

            that.viewedDate = defineViewedDate(that.value, that.min, that.max);

            that._templates();

            that._header();
        },

        options: {
            value: null,
            startView: "month",
            depth: "month",
            month: {
                title: "<#=data.month#> <#=data.year#>",
                content: "<#=data.day#>",
                empty: " "
            }
        },

        navigateDown: function() {

        },

        navigateUp: function() {

        },

        navigateLeft: function() {

        },

        navigateRight: function() {

        },

        navigate: function(date, view) {
            //define direction depending on
        },

        _header: function() {
            var that = this,
                element = that.element;

            if (!element.find(".k-header")[0]) {
                element.html('<div class="k-header">'
                           + '<a href="#" class="k-link k-nav-prev"><span class="k-icon k-arrow-prev"></span></a>'
                           + '<a href="#" class="k-link k-nav-fast"></a>'
                           + '<a href="#" class="k-link k-nav-prev"><span class="k-icon k-arrow-next"></span></a>'
                           + '</div>');
            }

            that.title = element.find(".k-nav-fast");
        },

        _templates: function() {
            var that = this,
                month = that.options.month,
                template = kendo.template,
                MONTH = "month";


            that.month = {
                title: template(month.title),
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
            title: function(date, template) {
                return template({
                    date: date,
                    month: kendo.culture().calendar.months.names[date.getMonth()],
                    year: date.getFullYear()
                });
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
                    template = options.template,
                    empty = options.empty,
                    html = '<table class="k-content" summary="calendar widget"><thead><tr>';

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

                    html += inRange(start, min, max) ? template(data) : empty(data);
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
