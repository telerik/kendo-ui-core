(function ($) {
    var $t = $.telerik,
        replaceUrlRegExp = /{0:?/,
        dateFormatRegExp = /{0:?(\S|\s)*}/;

    $t.scripts.push("telerik.calendar.js");

    function defineViewedMonth(selectedValue, minValue, maxValue) {
        var today = new $t.datetime();
        if (selectedValue) {
            today = new $t.datetime(selectedValue);
        }

        if (minValue > today.value) {
            today = new $t.datetime(minValue);
        } else if (maxValue < today.value) {
            today = new $t.datetime(maxValue);
        }
        return $t.datetime.firstDayOfMonth(today);
    }

    $.extend($t, {
        calendar: function (element, options) {
            this.element = element;

            $.extend(this, options);

            var minDate = new $t.datetime(this.minDate);
            var maxDate = new $t.datetime(this.maxDate);

            this.currentView = $t.calendar.views[0];
            this.viewedMonth = defineViewedMonth(this.selectedDate, this.minDate, this.maxDate);

            var header = new $t.stringBuilder()
                         .cat('<a href="#" class="t-link t-nav-prev')
                         .catIf(' t-state-disabled', this.currentView.compare(this.viewedMonth, minDate, false) <= 0)
                         .cat('">')
			             .cat('<span class="t-icon t-arrow-prev"></span></a><a href="#" class="t-link t-nav-fast">')
			             .cat(this.currentView.title(this.viewedMonth))
			             .cat('</a>')
			             .cat('<a href="#" class="t-link t-nav-next')
                         .catIf(' t-state-disabled', this.currentView.compare(this.viewedMonth, maxDate, true) >= 0)
                         .cat('"><span class="t-icon t-arrow-next"></span></a>');

            $('.t-header', this.element).html(header.string());

            /* header */
            $('.t-nav-next:not(.t-state-disabled)', element)
			    .live('click', $.proxy(this.navigateToFuture, this));

            $('.t-nav-prev:not(.t-state-disabled)', element)
			    .live('click', $.proxy(this.navigateToPast, this));

            $('.t-nav-fast:not(.t-state-disabled)', element)
			    .live('click', $.proxy(this.navigateUp, this));

            $('.t-link.t-state-disabled', element)
			    .live('click', $t.preventDefault);

            $('td:not(.t-state-disabled):has(.t-link)', element)
				.live('mouseenter', $t.hover)
			    .live('mouseleave', $t.leave)
			    .live('click', $.proxy(this.navigateDown, this));

            $t.bind(this, {
                change: this.onChange,
                load: this.onLoad
            });

            this._footer(this.todayFormat);
        }
    });

    $t.calendar.prototype = {
        stopAnimation: false, // used by tests

        updateSelection: function () {
            var firstDayOfMonth = $t.datetime.firstDayOfMonth(this.viewedMonth).toDate();
            var lastDayOfMonth = new $t.datetime(firstDayOfMonth).date(32).date(0).toDate();

            if (this.selectedDate === null || !$t.calendar.isInRange(this.selectedDate, firstDayOfMonth, lastDayOfMonth)) {
                var viewedMonth = defineViewedMonth(this.selectedDate, this.minDate, this.maxDate);
                this.goToView(0, viewedMonth);
            }

            var me = this;
            var days = $('.t-content td:not(.t-other-month)', this.element)
		                .removeClass('t-state-selected');

            if (this.selectedDate !== null) {
                days.filter(function () {
                    return (parseInt($(this).text(), 10) == me.selectedDate.getDate());
                })
		        .addClass('t-state-selected');
            }
        },

        value: function () {
            if (arguments.length == 0)
                return this.selectedDate;
            if (arguments.length == 1)
                this.selectedDate = arguments[0] === null ? null : new Date(arguments[0].value ? arguments[0].value : arguments[0]);
            else if (arguments.length > 1)
                this.selectedDate = new Date(arguments[0], arguments[1], arguments[2]);

            this.updateSelection();

            return this;
        },

        overlay: function (show) {
            if (!show)
                return $('.t-overlay', this.element).remove();

            var overlay = $('<div/>')
		        .addClass('t-overlay')
		        .css({
		            opacity: 0,
		            width: this.element.offsetWidth,
		            height: this.element.offsetHeight,
		            position: 'absolute',
		            top: 0,
		            left: 0,
		            zIndex: 3,
		            backgroundColor: '#fff'
		        });

            $(this.element).find(".t-header").after(overlay);
        },

        goToView: function (viewIndex, viewedMonth) {
            if (viewIndex < 0 || $t.calendar.views.length <= viewIndex)
                return;

            var minDate = new $t.datetime(this.minDate);
            var maxDate = new $t.datetime(this.maxDate);

            if (typeof viewedMonth != 'undefined') {
                viewedMonth = viewedMonth.value ? viewedMonth : new $t.datetime(viewedMonth);
                this.viewedMonth = $t.datetime.firstDayOfMonth(viewedMonth);
            }

            this.currentView = $t.calendar.views[viewIndex];
            $('.t-nav-prev', this.element)
				.toggleClass('t-state-disabled', this.currentView.compare(viewedMonth, minDate, false) <= 0);

            $('.t-nav-next', this.element)
				.toggleClass('t-state-disabled', this.currentView.compare(viewedMonth, maxDate, true) >= 0);

            $('.t-nav-fast', this.element)
                .html(this.currentView.title(viewedMonth))
                .toggleClass('t-state-disabled', viewIndex == $t.calendar.views.length - 1);

            $('.t-content', this.element)
                .html(this.currentView.body(viewedMonth, minDate, maxDate, this.selectedDate ? new $t.datetime(this.selectedDate) : null, this.urlFormat, this.dates))
                .toggleClass('t-meta-view', viewIndex == 1 || viewIndex == 2);

            return this;
        },

        navigateVertically: function (viewIndex, viewedMonth, plunge, target) {
            viewedMonth = new $t.datetime(viewedMonth);
            this.viewedMonth = $t.datetime.firstDayOfMonth(viewedMonth);

            this.currentView = $t.calendar.views[viewIndex];

            this.overlay(true);

            var minDate = new $t.datetime(this.minDate);
            var maxDate = new $t.datetime(this.maxDate);

            var oldView = $('.t-content', this.element);

            var oldViewWidth = oldView.outerWidth();
            var oldViewHeight = oldView.outerHeight();
            var oldViewFontSize = oldView.css('font-size');
            var oldViewLineHeight = oldView.css('line-height');

            if (oldViewLineHeight === 'normal') oldViewLineHeight = parseInt(oldViewFontSize) * 1.5;

            oldView.find('td').removeClass('t-state-hover');

            $('.t-nav-fast', this.element)
		        .html(this.currentView.title(viewedMonth))
		        .toggleClass('t-state-disabled', viewIndex == $t.calendar.views.length - 1);

            $('.t-nav-prev', this.element)
		        .toggleClass('t-state-disabled', this.currentView.compare(this.viewedMonth, minDate, false) <= 0);

            $('.t-nav-next', this.element)
		        .toggleClass('t-state-disabled', this.currentView.compare(this.viewedMonth, maxDate, true) >= 0);

            var newView = $('<table class="t-content" cellspacing="0"></table>')
		                    .html(this.currentView.body(viewedMonth, minDate, maxDate, this.selectedDate ? new $t.datetime(this.selectedDate) : null, this.urlFormat, this.dates))
		                    .toggleClass('t-meta-view', viewIndex == 1 || viewIndex == 2);

            var me = this;

            var maximizedViewProperties = {
                fontSize: oldViewFontSize,
                lineHeight: oldViewLineHeight,
                top: 0, left: 0,
                width: oldViewWidth,
                height: oldViewHeight,
                opacity: 1
            };

            var outerAnimationContainer;

            if (plunge) {
                outerAnimationContainer =
		            $t.fx._wrap(oldView)
		                 .css({
		                     overflow: 'hidden',
		                     position: 'relative'
		                 });
                newView.wrap($('<div/>')
		               .addClass('t-animation-container')
		               .css($.extend({
		                   position: 'absolute',
		                   zIndex: 1,
		                   fontSize: 1,
		                   lineHeight: 1,
		                   width: target.outerWidth(),
		                   height: target.outerHeight(),
		                   opacity: 0
		               }, target.position())))
		               .parent()
		               .insertAfter(oldView);

                if (!this.stopAnimation) {
                    newView.parent()
		                   .animate({
		                       fontSize: oldViewFontSize,
		                       lineHeight: oldViewLineHeight,
		                       top: 0, left: 0,
		                       width: oldViewWidth,
		                       height: oldViewHeight,
		                       opacity: 1
		                   }, 'normal', function () {
		                       $(me.element).find(".t-header").after(newView);
		                       outerAnimationContainer.remove();
		                       me.overlay(false);
		                   });
                } else { //animation is stopped for test purposes
                    oldView.remove();
                    $(me.element).find(".t-header").after(newView);
                    outerAnimationContainer.remove();
                    me.overlay(false);
                }
            } else {

                newView.insertBefore(oldView);

                outerAnimationContainer =
		            $t.fx._wrap(newView)
		                 .css({
		                     overflow: 'hidden',
		                     position: 'relative'
		                 });

                var coordinatesMod;
                if (viewIndex != 0)
                    coordinatesMod = $t.calendar.views[viewIndex].verticalDate(this.viewedMonth);

                var collapseCoordinates = {
                    top: (Math.floor(coordinatesMod / 4.0) * oldViewHeight) / 3.0,
                    left: ((coordinatesMod % 4) * oldViewWidth) / 4.0
                };

                oldView.wrap($('<div/>')
		               .addClass('t-animation-container')
		               .css($.extend({
		                   position: 'absolute'
		               }, maximizedViewProperties)))
		               .parent()
		               .insertAfter(newView)

                if (!this.stopAnimation) {
                    oldView.parent()
		                   .animate($.extend({
		                       fontSize: 1,
		                       lineHeight: 1,
		                       width: 48,
		                       height: 54,
		                       opacity: 0
		                   }, collapseCoordinates), 'normal', function () {
		                       $(me.element).find(".t-header").after(newView);
		                       outerAnimationContainer.remove();
		                       me.overlay(false);
		                   });
                } else {//animation is stopped for test purposes
                    oldView.remove();
                    $(me.element).find(".t-header").after(newView);
                    outerAnimationContainer.remove();
                    me.overlay(false);
                }
            }
            $t.trigger(this.element, 'navigate', {
                direction: plunge
            });
        },

        navigateHorizontally: function (viewIndex, viewedMonth, forward) {
            viewedMonth = new $t.datetime(viewedMonth);

            var minDate = new $t.datetime(this.minDate);
            var maxDate = new $t.datetime(this.maxDate);
            this.viewedMonth = $t.datetime.firstDayOfMonth($t.calendar.fitDateToRange(viewedMonth, minDate, maxDate));

            this.currentView = $t.calendar.views[viewIndex];

            $('.t-nav-fast', this.element)
		        .html(this.currentView.title(viewedMonth))
		        .toggleClass('t-state-disabled', viewIndex == $t.calendar.views.length - 1);

            $('.t-nav-prev', this.element)
		        .toggleClass('t-state-disabled', this.currentView.compare(this.viewedMonth, minDate, false) <= 0);

            $('.t-nav-next', this.element)
		        .toggleClass('t-state-disabled', this.currentView.compare(this.viewedMonth, maxDate, true) >= 0);

            this.overlay(true);

            var newView = $('<table class="t-content" cellspacing="0"></table>')
		                      .html(this.currentView.body(viewedMonth, minDate, maxDate, this.selectedDate ? new $t.datetime(this.selectedDate) : null, this.urlFormat, this.dates))
		                      .toggleClass('t-meta-view', viewIndex == 1 || viewIndex == 2);

            var oldView = $('.t-content', this.element);

            var viewWidth = oldView.outerWidth();

            oldView.add(newView)
		           .css({ width: viewWidth, 'float': 'left' });

            var animationContainer =
		           $t.fx._wrap(oldView)
		                .css({
		                    position: 'relative',
		                    width: viewWidth * 2,
		                    'float': 'left',
		                    left: (forward ? 0 : -200)
		                });

            newView[forward ? 'insertAfter' : 'insertBefore'](oldView);

            var me = this;
            if (!this.stopAnimation) {
                animationContainer.animate({ left: (forward ? -200 : 0) }, 'normal', function () {
                    $(me.element).find(".t-header").after(newView);
                    animationContainer.remove();
                    me.overlay(false);
                });
            } else { //animation is stopped for test purposes
                oldView.remove();
                $(me.element).find(".t-header").after(newView);
                animationContainer.remove();
                me.overlay(false);
            }

            $t.trigger(this.element, 'navigate', {
                direction: forward
            });
        },

        navigateUp: function (e) {
            if (e) e.preventDefault();
            var currentViewIndex = this.currentView.index;
            this.navigateVertically(currentViewIndex + 1, this.viewedMonth.toDate(), false);
        },

        navigateDown: function (e, target, viewIndex) {
            var $target = $($(e.target).hasClass('t-input') ? target : e.target);
            var clickedText = $target.text();
            var currentViewIndex = viewIndex || this.currentView.index;

            var href = $target.attr('href');
            if (href && (href.charAt(href.length - 1) == '#'))
                e.preventDefault();

            if (currentViewIndex == 0) {
                var date = parseInt(clickedText, 10);

                var month = this.viewedMonth.month();

                if ($target.parent().hasClass('t-other-month'))
                    month += (date < 15 ? 1 : -1);

                var newlySelectedDate = new Date(this.viewedMonth.year(), month, date);

                if (!this.selectedDate || (this.selectedDate > newlySelectedDate || newlySelectedDate > this.selectedDate)) {
                    if ($t.trigger(this.element, 'change', {
                        previousDate: this.selectedDate,
                        date: newlySelectedDate
                    }))
                        return this;

                    this.selectedDate = newlySelectedDate;
                }

                this.updateSelection();
            } else {
                if (currentViewIndex != 0)
                    $t.calendar.views[currentViewIndex].verticalDate(this.viewedMonth, clickedText);

                this.viewedMonth = $t.calendar.fitDateToRange(this.viewedMonth, new $t.datetime(this.minDate), new $t.datetime(this.maxDate));

                this.navigateVertically(currentViewIndex - 1, this.viewedMonth.toDate(), true, $target.add($target.parent()).filter('td'));
            }
        },

        navigateToPast: function (e) {
            if (e) e.preventDefault();
            var currentViewIndex = this.currentView.index;

            if (currentViewIndex == 0) {
                this.viewedMonth.date(1).date(-1);
            } else
                this.viewedMonth.addYear(-Math.pow(10, currentViewIndex - 1));

            this.navigateHorizontally(currentViewIndex, this.viewedMonth.toDate(), false);
        },

        navigateToFuture: function (e) {
            if (e) e.preventDefault();
            var currentViewIndex = this.currentView.index;

            if (currentViewIndex == 0)
                this.viewedMonth.date(32).date(1);
            else
                this.viewedMonth.addYear(Math.pow(10, currentViewIndex - 1));

            this.navigateHorizontally(currentViewIndex, this.viewedMonth.toDate(), true);
        },

        _footer: function (format) {
            var that = this,
                footer = that.footer,
                today = new Date(),
                formattedValue = $.telerik.datetime.format(today, format || "d");


            if (!footer) {
                that.footer = footer = $('<div style="display:none" class="t-footer"><a href="#" class="t-link t-nav-today"></a></div>');
                $(that.element).append(footer);
                footer.find("a").click(function (e) {
                    e.preventDefault();

                    if (!that.selectedDate || (that.selectedDate > today || today > that.selectedDate)) {
                        if (!$t.trigger(that.element, 'change', {
                            previousDate: that.selectedDate,
                            date: today
                        })) {
                            that.selectedDate = today;
                            that.updateSelection();
                        }
                    }
                });
            }

            footer.find("a")
                  .attr("title", formattedValue)
                  .html(formattedValue);

            footer.toggle(!!format);
        }
    }

    $.fn.tCalendar = function (options) {
        return $t.create(this, {
            name: 'tCalendar',
            init: function (element, options) {
                return new $t.calendar(element, options);
            },
            options: options
        });
    };

    $.fn.tCalendar.defaults = {
        selectedDate: null,
        minDate: new Date(1899, 11, 31),
        maxDate: new Date(2100, 0, 1)
    };

    $.extend($t.calendar, {
        views: [{
            /* Month */
            index: 0,
            title: function (viewedMonth) {
                return new $t.stringBuilder()
			        .cat($t.cultureInfo.months[viewedMonth.month()])
			        .cat(' ')
			        .cat(viewedMonth.year()).string();
            },
            body: function (viewedMonth, minDate, maxDate, selectedDate, urlFormat, dates) {
                var html = (new $t.stringBuilder())
			               .cat('<thead><tr>');

                var firstDayIndex = $t.cultureInfo.firstDayOfWeek,
                    days = $t.cultureInfo.days,
                    abbrDays = $t.cultureInfo.abbrDays,
                    shortestDays = $t.cultureInfo.shortestDays;

                days = days.slice(firstDayIndex).concat(days.slice(0, firstDayIndex));
                abbrDays = abbrDays.slice(firstDayIndex).concat(abbrDays.slice(0, firstDayIndex));
                shortestDays = shortestDays.slice(firstDayIndex).concat(shortestDays.slice(0, firstDayIndex));

                for (var i = 0; i < 7; i++) {
                    html.cat('<th scope="col" abbr="')
                        .cat(abbrDays[i])
                        .cat('" title="')
                        .cat(days[i])
                        .cat('">')
                        .cat(shortestDays[i])
                        .cat('</th>');
                }

                html.cat('</tr></thead><tbody>');

                var currentDayInCalendar = $t.datetime.firstVisibleDay(viewedMonth);

                var month = viewedMonth.month();

                var selectedDateInViewedMonth = selectedDate === null ? false :
                                                viewedMonth.year() == selectedDate.year();
                var cellClass;

                for (var weekRow = 0; weekRow < 6; weekRow++) {

                    html.cat('<tr>');

                    for (var day = 0; day < 7; day++) {
                        cellClass =
			            currentDayInCalendar.month() != month ? 't-other-month' :
			            (selectedDateInViewedMonth
			            && currentDayInCalendar.month() == selectedDate.month()
			            && currentDayInCalendar.date() == selectedDate.date()) ? ' t-state-selected' : '';

                        html.cat('<td')
			                .catIf(' class="' + cellClass + '"', cellClass)
			                .cat('>');

                        if ($t.calendar.isInRange(currentDayInCalendar.toDate(), minDate.toDate(), maxDate.toDate())) {
                            html.cat('<a href="')
                            var url = '#';
                            if (urlFormat) {
                                url = $t.calendar.formatUrl(urlFormat, currentDayInCalendar);
                                if (dates && !$t.calendar.isInCollection(currentDayInCalendar, dates)) {
                                    url = '#';
                                }
                            }

                            html.cat(url)
			                    .cat('" class="t-link')
			                    .cat(url != '#' ? ' t-action-link' : '')
                                .cat('" title="')
                                .cat($t.datetime.format(currentDayInCalendar.toDate(), $t.cultureInfo.longDate))
			                    .cat('">')
			                    .cat(currentDayInCalendar.date())
			                    .cat('</a>');
                        } else {
                            html.cat('&nbsp;');
                        }
                        html.cat('</td>');

                        $t.datetime.modify(currentDayInCalendar, $t.datetime.msPerDay);
                    }

                    html.cat('</tr>');
                }
                html.cat('</tbody>');
                return html.string();
            },
            compare: function (date1, date2) {
                var result;
                var date1Month = date1.month();
                var date1Year = date1.year();
                var date2Month = date2.month();
                var date2Year = date2.year();

                if (date1Year > date2Year)
                    result = 1;
                else if (date1Year < date2Year)
                    result = -1;
                else // date1Year == date2Year
                    result = date1Month == date2Month ? 0 :
			                 date1Month > date2Month ? 1 : -1;
                return result;
            },
            firstLastDay: function (date, isFirstDay, calendar) {
                return isFirstDay ? $t.datetime.firstDayOfMonth(date) : new $t.datetime(date.year(), date.month() + 1, 0);
            },
            navCheck: function (date1, date2, isBigger) {
                if (isBigger) {
                    return new $t.datetime(date2.year(), date2.month() + 1, date2.date()).value - date1.value <= 0;
                } else {
                    return this.compare(date1, date2) === -1;
                }
            }
        },
			 {   /*Year*/
			     index: 1,
			     title: function (viewedMonth) { return viewedMonth.year(); },
			     body: function (viewedMonth, minDate, maxDate) {
			         return $t.calendar.metaView(true, viewedMonth, function () {
			             var result = [];

			             var startMonth = 0;
			             var endMonth = 11;

			             if (minDate.year() == maxDate.year()) {
			                 startMonth = minDate.month();
			                 endMonth = maxDate.month();
			             }
			             else if (viewedMonth.year() == minDate.year())
			                 startMonth = minDate.month();
			             else if (viewedMonth.year() == maxDate.year())
			                 endMonth = maxDate.month();

			             for (var i = 0; i < 12; i++) {
			                 if (i >= startMonth && i <= endMonth)
			                     result.push($t.cultureInfo.abbrMonths[i]);
			                 else
			                     result.push('&nbsp;');
			             }

			             return result;
			         });
			     },
			     compare: function (date1, date2) {
			         return date1.year() > date2.year() ? 1 : date1.year() < date2.year() ? -1 : 0;
			     },
			     verticalDate: function (date, clickedText) {
			         if (!clickedText)
			             return date.month();
			         date.month($.inArray(clickedText, $t.cultureInfo.abbrMonths));
			     },
			     firstLastDay: function (date, isFirstDay) {
			         return new $t.datetime(date.year(), isFirstDay ? 0 : 11, 1);
			     },
			     navCheck: function (date1, date2, isBigger) {
			         var tmp = this.compare(date1, date2);
			         return isBigger ? tmp == 1 : tmp == -1;
			     }
			 },
			 {   /*Decade*/
			     index: 2,
			     title: function (viewedMonth) {
			         var firstYearInDecade = viewedMonth.year() - viewedMonth.year() % 10;
			         return firstYearInDecade + '-' + (firstYearInDecade + 9);
			     },
			     body: function (viewedMonth, minDate, maxDate) {
			         return $t.calendar.metaView(false, viewedMonth, function () {
			             var result = [];
			             var minYear = minDate.year();
			             var maxYear = maxDate.year();
			             var year = viewedMonth.year() - viewedMonth.year() % 10 - 1;

			             for (var i = 0; i < 12; i++)
			                 result.push(year + i >= minYear && year + i <= maxYear ? year + i : '&nbsp;');

			             return result;
			         });
			     },
			     compare: function (date1, date2, checkBigger) {
			         var year = date1.year();
			         var minDecade = (year - year % 10);
			         var maxDecade = (year - year % 10 + 9);
			         return $t.calendar.check(minDecade, maxDecade, date2, checkBigger);
			     },
			     verticalDate: function (date, clickedText) {
			         if (!clickedText)
			             return date.year() % 10 + 1;
			         date.year(clickedText);
			     },
			     firstLastDay: function (date, isFirstDay) {
			         return new $t.datetime(date.year() - date.year() % 10 + (isFirstDay ? 0 : 9), 0, 1);
			     },
			     navCheck: function (date1, date2, isBigger) {
			         var tmp = this.compare(date2, date1, isBigger);
			         return isBigger ? tmp == -1 : tmp == 1;
			     }
			 },
			 {   /*Century*/
			     index: 3,
			     title: function (viewedMonth) {
			         var firstYearInCentury = viewedMonth.year() - viewedMonth.year() % 100;

			         return firstYearInCentury + '-' + (firstYearInCentury + 99);
			     },
			     body: function (viewedMonth, minDate, maxDate) {
			         return $t.calendar.metaView(false, viewedMonth, function () {
			             var firstYearInCentury = viewedMonth.year() - viewedMonth.year() % 100;

			             var result = [];

			             for (var i = -1; i < 11; i++) {
			                 var firstYearInCenturyTemp = firstYearInCentury + i * 10;
			                 if ((firstYearInCenturyTemp + 10) >= minDate.year() && firstYearInCenturyTemp <= maxDate.year())
			                     result.push(firstYearInCenturyTemp + '-<br />' +
			                     (firstYearInCenturyTemp + 9) + '&nbsp;');
			                 else
			                     result.push('&nbsp;<br />&nbsp;');
			             }
			             return result;
			         });
			     },
			     compare: function (date1, date2, checkBigger) {
			         var year = date1.year();
			         var minCentury = (year - year % 100);
			         var maxCentury = (year - year % 100 + 99);
			         return $t.calendar.check(minCentury, maxCentury, date2, checkBigger);
			     },
			     verticalDate: function (date, clickedText) {
			         if (!clickedText)
			             return Math.ceil(date.year() / 10) % 10 + 1;

			         date.year(clickedText.substring(0, clickedText.indexOf('-')));
			     },
			     firstLastDay: function (date, isFirstDay) {
			         return isFirstDay ? new $t.datetime(date.year() - (date.year() % 100), 0, 1) :
			                new $t.datetime(date.year() - (date.year() % 100) + 99, 0, 1);
			     },
			     navCheck: function (date1, date2, isBigger) {
			         var tmp = this.compare(date2, date1, isBigger);
			         return isBigger ? tmp == -1 : tmp == 1;
			     }
			 }],

        check: function (value1, value2, date, checkBigger) {
            var check = function (val) {
                return val < date.year() ? -1 :
			 val > date.year() ? 1 : 0;
            }
            return checkBigger ? check(value2) : check(value1);
        },

        html: function (viewedMonth, selectedDate, minDate, maxDate, urlFormat, dates) {
            viewedMonth = viewedMonth || new $t.datetime();
            minDate = minDate || new $t.datetime($.fn.tCalendar.defaults.minDate);
            maxDate = maxDate || new $t.datetime($.fn.tCalendar.defaults.maxDate);

            return new $t.stringBuilder().cat('<div class="t-widget t-calendar">')
			                             .cat('<div class="t-header">')
			                             .cat('<a href="#" class="t-link t-nav-prev">')
			                             .cat('<span class="t-icon t-arrow-prev"></span></a><a href="#" class="t-link t-nav-fast">')
			                             .cat($t.calendar.views[0].title(viewedMonth))
			                             .cat('</a>')
			                             .cat('<a href="#" class="t-link t-nav-next"><span class="t-icon t-arrow-next"></span></a>')
			                             .cat('</div>')
			                             .cat('<table class="t-content" cellspacing="0">')
			                             .cat($t.calendar.views[0].body(viewedMonth, minDate, maxDate, selectedDate, urlFormat, dates))
			                             .cat('</table></div>')
			                             .string();
        },

        metaView: function (isYearView, viewedMonth, getCollection) {
            var html = new $t.stringBuilder();

            var collection = getCollection();

            html.cat('<tr>');

            // build 4x3 table
            for (var i = 0, len = collection.length; i < len; i++) {

                html.catIf('</tr><tr>', i > 0 && i % 4 == 0)
			        .cat('<td')
			        .catIf(' class="t-other-month"', (i == 0 || i == len - 1) && isYearView == false)
			        .cat('>');

                if (collection[i] !== '&nbsp;' && collection[i] !== '&nbsp;<br />&nbsp;')
                    html.cat('<a href="#" class="t-link">')
			            .cat(collection[i]).cat('</a>')
                else
                    html.cat(collection[i]);

                html.cat('</td>');
            }

            html.cat('</tr>');

            return html.string();
        },

        isInRange: function (date, minDate, maxDate) {
            if (!date) return false;

            var d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            var min = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
            var max = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate());

            return min - d <= 0 && max - d >= 0;
        },

        fitDateToRange: function (date, minDate, maxDate) {
            if (date.value < minDate.value) date = new $t.datetime(minDate.value)
            if (date.value > maxDate.value) date = new $t.datetime(maxDate.value)
            return date;
        },

        isInCollection: function (date, dates) {
            var months = dates[date.year()];
            if (months) {
                var days = months[date.month()];
                if (days && $.inArray(date.date(), days) != -1)
                    return true;
            }
            return false;
        },

        findTarget: function (focusedDate, viewedIndex, calendar, isFuture) {
            focusedDate = focusedDate.value ? focusedDate : new $t.datetime(focusedDate);
            var findTarget = function (collection, searchedText) {
                return $.grep(collection, function (item) {
                    return $(item).children().eq(0).text().indexOf(searchedText) > -1;
                })[0];
            }

            var selector = isFuture ? 'last' : 'first';
            var cells = $('.t-content:' + selector + ' td:has(> .t-link)', calendar).removeClass('t-state-focus');

            var $target;
            if (viewedIndex == 0) {
                $target = $(findTarget(cells.filter(':not(.t-other-month)'), focusedDate.date()));
            } else if (viewedIndex == 1) {
                $target = $(findTarget(cells, $t.cultureInfo.abbrMonths[focusedDate.month()]));
            } else if (viewedIndex == 2 || viewedIndex == 3) {
                var year = focusedDate.year();
                $target = $(findTarget(cells, viewedIndex == 2 ? year : year - (year % 10)));
                if ($target.length == 0 && viewedIndex == 3)
                    $target = $(findTarget(cells, year - (year % 10) + 99));
            }
            return $target;
        },

        focusDate: function (focusedDate, viewedIndex, calendar, isFuture) {
            $t.calendar.findTarget(focusedDate, viewedIndex, calendar, isFuture).addClass('t-state-focus');
        },

        formatUrl: function (urlFormat, date) {
            var format = urlFormat.match(dateFormatRegExp);
            if (format) {
                format = format[0];
                var dateFormat = format === "{0}" ? $t.cultureInfo.generalDateTime : format.replace(replaceUrlRegExp, "").replace("}", "");

                return urlFormat.replace(format, $t.datetime.format(date.toDate(), dateFormat));
            }
            return urlFormat;
        }
    });

})(jQuery);
