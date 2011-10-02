(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Component = ui.Component,
        template = kendo.template,
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
        OTHERMONTH = ' class="k-other-month"',
        CELLSELECTOR = "td:has(.k-link)",
        MOUSEENTER = "mouseenter",
        MOUSELEAVE = "mouseleave",
        cellTemplate = template('<td<#=data.otherMonth#>><a class="k-link" href="#" data-value="<#=data.dateString#>"><#=data.value#></a></td>');
        cellEmptyTemplate = template("<td> </td>");
        msPerMinute = 60000,
        msPerDay = 86400000,
        extend = $.extend,
        proxy = $.proxy,
        DATE = Date;

    var Calendar = Component.extend({
        init: function(element, options) {
            var that = this;

            Component.fn.init.call(that, element, options);

            element.addClass("k-widget k-calendar");

            options = that.options;

            that.bind([CHANGE, NAVIGATE], options);

            that._templates();

            that._header();

            that.element
                .delegate(CELLSELECTOR, MOUSEENTER, mouseenter)
                .delegate(CELLSELECTOR, MOUSELEAVE, mouseleave)
                .delegate(CELLSELECTOR, CLICK, function(e) {
                    e.preventDefault();
                    var date = new DATE($(e.currentTarget.firstChild).data(VALUE)),
                        viewedValue = that._viewedValue;

                    that._view.setDate(viewedValue, date);
                    that.navigateDown(viewedValue);
                });

            that._currentView = options.startView;

            that.value(options.value);
        },

        options: {
            value: null,
            min: new Date(1900, 0, 1),
            max: new Date(2099, 11, 31),
            depth: MONTH,
            startView: MONTH,
            month: {
                content: "<#=data.value#>",
                empty: " "
            }
        },

        navigateToPast: function() {
            var that = this;
            that.navigate(that._setViewedValue(-1));
        },

        navigateToFuture: function() {
            var that = this;

            that.navigate(that._setViewedValue(1));
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

        navigate: function(value, viewName) {
            var that = this,
                view, compare,
                selectedValue = that._value,
                options = that.options,
                min = options.min,
                max = options.max,
                title = that._title,
                oldTable = that._table,
                isFuture = value && +value > +that._viewedValue,
                differentView = !value || +value === +that._viewedValue,
                newTable;

            if (!value) {
                value = that._viewedValue;
            } else {
                value = calendar.defineViewedValue(value, min, max);
                that._viewedValue = new DATE(value);
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

                newTable = $(view.content($.extend({
                    min: min,
                    max: max,
                    date: value
                }, that[viewName])));

                that._table = newTable;

                if (!oldTable) {
                    that.element.append(newTable);
                } else {
                    that._animate(oldTable, newTable, isFuture, differentView);
                }

                that.trigger(NAVIGATE);
            }

            if (viewName === options.depth && selectedValue) {
                that._setClass("k-state-selected", view.toDateString(selectedValue));
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

            //parse date

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
            that._viewedValue = calendar.defineViewedValue(value, min, max);

            that.navigate(value);
        },

        _animate: function(oldView, newView, isFuture, differentView) {
            var that = this;

            //put overlay over the calendar

            if (differentView) {
                that._zoomIn(oldView, newView);
            } else {
                that._animateHorizontal(oldView, newView, isFuture);
            }
        },

        _animateHorizontal: function(oldView, newView, isFuture) {
            var viewWidth = oldView.outerWidth();

            oldView.add(newView).css({width: viewWidth, 'float': 'left' });

            oldView.wrap("<div/>");

            oldView.parent()
                .css({
                    position: 'relative',
                    width: viewWidth * 2,
                    'float': 'left',
                    left: isFuture ? 0 : -200
                });

                newView[isFuture ? "insertAfter" : "insertBefore"](oldView);

            //put in options
            oldView.parent().kendoStop(true).kendoAnimate({
                effects: "slide:" + (isFuture ? "left" : "right"),
                duration: 500,
                divisor: 2,
                complete: function() {
                    oldView.remove();
                    newView.unwrap();
                }
            });
        },

        _zoomIn: function(oldView, newView) {
            var viewWidth = oldView.outerWidth();

            newView.css({
                position: "absolute",
                top: oldView.prev().outerHeight(),
                left: 0
            }).insertAfter(oldView);

            oldView.kendoStop(true).kendoAnimate({
                effects: "fadeOut",
                duration: 500,
                complete: function() {
                   oldView.remove();
                }
            });

            //put in animation
            newView.kendoStop(true).kendoAnimate({
                effects: "zoomIn",
                duration: 500,
                complete: function() {
                    newView.css({
                        position: "static",
                        top: 0,
                        left: 0
                    });
                }
            });
        },

        _focusCell: function(value) {
            var that = this,
                view = that._view;

            if (view.compare(value, that._viewedValue) !== 0) {
                that.navigate(value);
            } else {
                that._viewedValue = value;
            }

            that._setClass("k-state-focused", view.toDateString(value));
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

            links = element.find(".k-link").hover(mouseenter, mouseleave);

            that._prevArrow = links.eq(0)
                                  .bind(CLICK, function(e) {
                                      e.preventDefault();
                                      if (!that._prevArrow.hasClass(DISABLED)) {
                                          that.navigateToPast();
                                      }
                                  });

            that._title = links.eq(1)
                              .bind(CLICK, function(e) {
                                  e.preventDefault();
                                  if (!that._title.hasClass(DISABLED)) {
                                      that.navigateUp();
                                  }
                              });

            that._nextArrow = links.eq(2)
                                  .bind(CLICK, function(e) {
                                      e.preventDefault();
                                      if (!that._nextArrow.hasClass(DISABLED)) {
                                          that.navigateToFuture();
                                      }
                                  });
        },

        _setClass: function(className, value) {
            this._table
                .find("td:not(.k-other-month)")
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

        _templates: function() {
            var that = this,
                month = that.options.month;

            that.month = {
                content: template('<td<#=data.otherMonth#>><a class="k-link" href="#" data-value="<#=data.dateString#>" title="<#=data.title#>">' + month.content + '</a></td>'),
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

        defineViewedValue: function (value, min, max) {
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
                    html = '<table class="k-content"><thead><tr>';

                for (; idx < 7; idx++) {
                    html += '<th abbr="' + abbr[idx] + '" scope="col" title="' + names[idx] + '">' + short[idx] + '</th>';
                }

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
                    build: function(date) {
                        return {
                            date: date,
                            title: kendo.toString(date, "D"),
                            value: date.getDate(),
                            dateString: toDateString(date),
                            otherMonth: date < firstDayOfMonth || date > lastDayOfMonth ? OTHERMONTH : ''
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
                            otherMonth: ""
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
                    date.setMonth(date.getMonth() + value);
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
                            otherMonth: idx == 0 || idx == 11 ? OTHERMONTH : ""
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
                            value: year + "-" + (year + 9),
                            dateString: toDateString(date),
                            otherMonth: idx == 0 || idx == 11 ? OTHERMONTH : ""
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

            html += inRange(start, min, max) ? content(data) : empty(data);

            setter(start, 1);
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

    kendo.calendar = calendar;

})(jQuery);
