(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Component = ui.Component;

    var Calendar = Component.extend({
        init: function(element, options) {
            var that = this;

            Component.fn.init.call(that, element, options);

            that._templates();

            that._header();
        },

        options: {
            templates: {
                month: {
                    title: "<#=kendo.culture().calendar.months.names[data.getMonth()]#> <#= data.getFullYear()#>",
                    content: '<a class="k-link" href="#" title="<#=kendo.toString(data,"D")#>"><#=data.getDate()#></a>'
                },
                year: {
                    title: "<#=data.getFullYear()#>",
                    content: "<#=window.kendo.culture().calendar.month.names[data.getMonth()]#>"
                },
                decade: {
                    title: "",
                    content: ""
                },
                century: {
                    title: "",
                    content: ""
                }
            }
        },

        navigateDown: function() {
            var focusedDate = this.focusedDate;
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
                template = kendo.template,
                templates = that.options.templates;

            that.templates = {};
            $.each(["month", "year", "decade", "century"], function(i, view) {
                that.templates[view] = {
                    title: template(templates[view].title),
                    content: template(templates[view].content)
                };
            });
        }
    });

    var calendar = {
        msPerMinute: 60000,
        msPerDay: 86400000,
        firstDayOfMonth: function (date) {
            return new Date(
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
                firstVisibleDay = new Date(date.getFullYear(), date.getMonth(), 0, date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());

            while (firstVisibleDay.getDay() != firstDayOfWeek) {
                calendar.setTime(firstVisibleDay, -1 * calendar.msPerDay)
            }

            return firstVisibleDay;
        },

        setTime: function (date, time) {
            var tzOffsetBefore = date.getTimezoneOffset(),
                resultDate = new Date(date.getTime() + time),
                tzOffsetDiff = resultDate.getTimezoneOffset() - tzOffsetBefore;

            date.setTime(resultDate.getTime() + tzOffsetDiff * calendar.msPerMinute);
        },

        pad: function (value) {
            if (value < 10) {
                return '0' + value;
            }

            return value;
        },

        month: {
            title: function(date, template) {
                return template(date);
            },
            content: function(date, template) {
                var currentCalendar = kendo.culture().calendar,
                    firstDayIdx = currentCalendar.firstDayOfWeek,
                    days = currentCalendar.days,
                    names = days.names,
                    abbr = days.namesAbbr,
                    short = days.namesShort,
                    html = '<table class="k-content" summary="calendar widget"><thead><tr>',
                    idx = 0;

                date = calendar.firstVisibleDay(date);

                names = shiftArray(names, firstDayIdx);
                abbr = shiftArray(abbr, firstDayIdx);
                short = shiftArray(short, firstDayIdx);

                for (; idx < 7; idx++) {
                    html += '<th abbr="' + abbr[idx] + '" scope="col" title="' + names[idx] + '">' + short[idx] + '</th>';
                }

                html += "</tr></thead><tbody><tr>";

                for (idx = 0; idx < 42; idx++) {
                    if (idx != 0 && idx % 7 == 0) {
                        html += "</tr><tr>";
                    }

                    html += "<td>"+ template(date) + "</td>";

                    date.setDate(date.getDate() + 1);
                }

                return html + "</tr></tbody></table>";
            }
        }
    }

    function shiftArray(array, idx) {
        return array.slice(idx).concat(array.slice(0, idx));
    }

    kendo.calendar = calendar;

    kendo.ui.Calendar = Calendar;
})(jQuery);
