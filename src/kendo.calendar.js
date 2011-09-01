(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Component = ui.Component,
        IFTEMPLATE = '<# if(data.getDate) { #> {0} <# } else { #> <# } #>',
        ANCHORSTART = '<a class="k-link" href="#">',
        ANCHOREND = '</a>',
        METAVIEWOBJECT = {
            length: 12,
            columns: 4,
            html: '<table class="k-content k-meta-view" cellspacing="0"><tbody><tr>'
        };


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
                    content: IFTEMPLATE.replace("{0}", '<a class="k-link" href="#" title="<#=kendo.toString(data,"D")#>"><#=data.getDate()#></a>')
                },
                year: {
                    title: "<#=data.getFullYear()#>",
                    content: IFTEMPLATE.replace("{0}", ANCHORSTART + "<#= kendo.culture().calendar.months.namesAbbr[data.getMonth()]#>" + ANCHOREND)
                },
                decade: {
                    title: "<# var start = data.getFullYear(); start = start - start % 10; #><#=start#>-<#=start + 9#>",
                    content: IFTEMPLATE.replace("{0}", ANCHORSTART + "<#=data.getFullYear()#>" + ANCHOREND)
                },
                century: {
                    title: "<# var start = data.getFullYear(); start = start - start % 100; #><#=start#>-<#=start + 99#>",
                    content: IFTEMPLATE.replace("{0}", ANCHORSTART + "<# var start = data.getFullYear(); start = start - start % 10; #><#=start#>-<#=start + 9#>" + ANCHOREND)
                }
            }
        },

        navigateDown: function() {
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

    kendo.ui.Calendar = Calendar;

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
            content: function(options) {
                var idx = 0,
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
                html = '<table class="k-content" summary="calendar widget"><thead><tr>';

                for (; idx < 7; idx++) {
                    html += '<th abbr="' + abbr[idx] + '" scope="col" title="' + names[idx] + '">' + short[idx] + '</th>';
                }

                start.setDate(start.getDate() - 1);

                $.extend(options, {
                    min: new Date(min.getFullYear(), min.getMonth(), min.getDate()),
                    max: new Date(max.getFullYear(), max.getMonth(), max.getDate()),
                    html: html += "</tr></thead><tbody><tr>",
                    start: start,
                    length: 42,
                    columns: 7,
                    setter: function(date) {
                        date.setDate(date.getDate() + 1);
                    }
                });

                return render(options);
            }
        },

        year: {
            title: function(date, template) {
                return template(date);
            },
            content: function(options) {
                var min = options.min,
                    max = options.max;

                $.extend(options,
                METAVIEWOBJECT, {
                    min: new Date(min.getFullYear(), min.getMonth(), 1),
                    max: new Date(max.getFullYear(), max.getMonth(), 1),
                    start: new Date(options.date.getFullYear(), 0, 1),
                    setter: function(date, idx) {
                        date.setMonth(idx);
                    }
                });

                return render(options);
            }
        },
        decade: {
            title: function(date, template) {
                return template(date);
            },
            content: function(options) {
                var year = options.date.getFullYear();

                year = year - year % 10 - 1;

                $.extend(options,
                METAVIEWOBJECT, {
                    min: new Date(options.min.getFullYear(), 0, 1),
                    max: new Date(options.max.getFullYear(), 0, 1),
                    start: new Date(year, 0, 1),
                    setter: function(date, idx) {
                        date.setFullYear(year + idx);
                    }
                });

                return render(options);
            }
        },
        century: {
            title: function(date, template) {
                return template(date);
            },
            content: function(options) {
                var year = options.date.getFullYear();

                year = year - year % 100 - 10;

                $.extend(options,
                METAVIEWOBJECT, {
                    min: new Date(options.min.getFullYear() - 10, 0, 1),
                    max: new Date(options.max.getFullYear(), 0, 1),
                    start: new Date(year, 0, 1),
                    setter: function(date, idx) {
                        date.setFullYear(year + idx * 10);
                    }
                });

                return render(options);
            }
        }
    }

    function render(options) {
        var idx = 0,
            html = options.html,
            template = options.template,
            start = options.start;

        for(; idx < options.length; idx++) {
            if (idx > 0 && idx % options.columns == 0) {
                html += "</tr><tr>";
            }

            options.setter(start, idx);

            html += "<td>" + options.template(inRange(start, options.min, options.max) ? start : {}) + "</td>";
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
