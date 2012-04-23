(function ($) {

    var $t = $.telerik;
    $t.scripts.push("telerik.datepicker.js");

    var sharedCalendar = null,
		mobileSafari = (navigator.userAgent.search(/like\sMac\sOS\sX;.*Mobile\/\S+/) != -1),
		mobileSafari41 = (navigator.userAgent.search(/4_1\slike\sMac\sOS\sX;.*Mobile\/\S+/) != -1); // The bug is undetectable there.

    $t.datetime.parseByToken = function (value, today) {
        if (value === null || value === '') return null;

        today = today || new $t.datetime(); // required for unit tests
        var firstToken = null;
        var secondToken = null;
        var tokenType = null;
        var pos = 0;

        var Matches = function (name) {
            var token = null;
            if (name && value.substring(pos, pos + name.length).toLowerCase() == name.toLowerCase()) {
                token = name;
            }
            return token;
        }

        var searchForDayMonth = function () {
            var token = null;
            $.each(['days', 'abbrDays', 'months', 'abbrMonths'], function (index, key) {
                if (token !== null) return;

                $.each($t.cultureInfo[key], function (index, name) {
                    if (token !== null) return;
                    token = Matches(name);
                });

                tokenType = key;
            });
            return token;
        }

        var adjustDate = function () {
            var gap;
            var modifyDate = function (mod, isday) {
                today[isday ? 'date' : 'month']
                    (today[isday ? 'date' : 'month']()
                     + (gap != 0 ? ((gap + ((gap > 0 ? 1 : -1) * mod)) % mod) : 0)
                        + (secondToken ?
                            (firstToken == $t.cultureInfo['next'] ? 1 : -1) * mod : 0));
            }
            var arrayPosition = $.inArray(secondToken || firstToken, $t.cultureInfo[tokenType]);
            if (tokenType.toLowerCase().indexOf('day') > -1) {
                gap = (arrayPosition == 0 ? 7 : arrayPosition) - today.day();
                modifyDate(7, true)
            } else {
                gap = arrayPosition - today.month();
                modifyDate(12, false)
            }
        }

        var adjustDateBySecondToken = function () {
            var gapDiff = function (possition) {
                var gap;
                switch (secondToken) {
                    case 'year': gap = possition == 1 ? 1 : 0; break;
                    case 'month': gap = possition == 2 ? 1 : 0; break;
                    case 'week': gap = possition == 3 ? 7 : 0; break;
                    case 'day': gap = possition == 3 ? 1 : 0; break;
                }
                return gap;
            }
            var direction = (firstToken == $t.cultureInfo['next'] ? 1 : -1);
            today.year(
                    today.year() + gapDiff(1) * direction,
                    today.month() + gapDiff(2) * direction,
                    today.date() + gapDiff(3) * direction
                );
        }

        // search for first token
        $.each(['today', 'tomorrow', 'yesterday', 'next', 'last'], function (index, name) {
            if (firstToken !== null) return;
            firstToken = Matches($t.cultureInfo[name]);
        })

        if (firstToken !== null) {
            pos += firstToken.length;

            if (/[^\s\d]\s+[^\s\d]/i.test(value)) {
                pos++;
                $.each(['year', 'month', 'week', 'day'], function (index, name) {
                    if (secondToken !== null) return;
                    secondToken = Matches($t.cultureInfo[name]);
                })
                tokenType = null;

                if (secondToken === null) {
                    secondToken = searchForDayMonth();
                }
                if (secondToken === null)
                    return null; // invalid date.
            } else {
                switch (firstToken) {
                    case $t.cultureInfo['today']: break;
                    case $t.cultureInfo['tomorrow']:
                        today.date(today.date() + 1);
                        break;
                    case $t.cultureInfo['yesterday']:
                        today.date(today.date() - 1);
                        break;
                    default:
                        today = null; // incorrect token
                        break;
                }

                return today;
            }

        } else {
            firstToken = searchForDayMonth();
            if (firstToken != null) {
                adjustDate();
                return today;
            } else {
                return null;
            }
        }

        // first and second tokens are not null
        if (tokenType !== null)
            adjustDate();
        else // second token is year, month, week, day
            adjustDateBySecondToken();

        return today;
    };

    function defineFocusedDate(focusedValue, selectedValue, minValue, maxValue) {
        if (selectedValue) {
            focusedValue = new Date(selectedValue);
        }

        if (minValue > focusedValue) {
            focusedValue = new Date(minValue);
        } else if (maxValue < focusedValue) {
            focusedValue = new Date(maxValue);
        }

        return focusedValue;
    }

    /*
    options.minValue
    options.maxValue
    options.selectedValue
    options.effects
    options.onChange
    options.isRtl
    options.zIndex
    */

    $t.dateView = function (options) {
        $.extend(this, options);
        this.isValueChanged = false;

        this.focusedValue = defineFocusedDate(new Date(), this.selectedValue, this.minValue, this.maxValue);

        this.$calendar = this._createSharedCalendar();
    }

    $t.dateView.prototype = {
        _createSharedCalendar: function () {
            if (!sharedCalendar) {
                sharedCalendar = $($t.calendar.html(new $t.datetime(this.focusedValue), this.selectedValue ? new $t.datetime(this.selectedValue) : null, new $t.datetime(this.minValue), new $t.datetime(this.maxValue)))
                                .hide()
                                .addClass('t-popup t-datepicker-calendar')
                                .appendTo(document.body)
                                .tCalendar({
                                    selectedValue: this.selectedValue,
                                    minDate: this.minValue,
                                    maxDate: this.maxValue
                                });

                if ($.browser.msie && parseInt($.browser.version) < 7) {
                    sharedCalendar.prepend('<iframe src="javascript:\'\';" style="position:absolute; width: 100%; height: 190px; border: 0; top: 0; left: 0; opacity: 0; filter:alpha(opacity=0);"></iframe>');
                }

                $t.fx._wrap(sharedCalendar).css('display', 'none');

                if ($.browser.msie && $.browser.version <= 6)
                    $('<iframe class="t-iframe-overlay" src="javascript:false;"></iframe>')
                        .prependTo(sharedCalendar)
                        .height(sharedCalendar.height());
            }

            return sharedCalendar;
        },

        _getCalendar: function () {
            return sharedCalendar.data('tCalendar');
        },

        _reassignSharedCalendar: function () {
            var calendar = this._getCalendar();

            if (sharedCalendar.data('associatedDateView') != this) {
                sharedCalendar.stop(true, true);

                this.focusedValue = defineFocusedDate(this.focusedValue, this.selectedValue, this.minValue, this.maxValue);

                calendar.minDate = this.minValue;
                calendar.maxDate = this.maxValue;
                calendar.selectedValue = this.selectedValue;
                calendar.goToView(0, this.focusedValue);
                calendar._footer(this.todayFormat);

                sharedCalendar
                    .unbind('change')
                    .bind('change', $.proxy(function (e) {
                        var selectedValue = this.selectedValue;
                        var newValue = new $t.datetime(e.date);
                        if (selectedValue !== null)
                            newValue.hours(selectedValue.getHours())
                                    .minutes(selectedValue.getMinutes())
                                    .seconds(selectedValue.getSeconds())
                                    .milliseconds(selectedValue.getMilliseconds());
                        this.onChange(newValue.toDate());
                    }, this))
                    .unbind('navigate')
                    .bind('navigate', $.proxy(function (e) {
                        var focusedValue = this.focusedValue;
                        var viewedMonth = calendar.viewedMonth;
                        var viewIndex = calendar.currentView.index;

                        focusedValue.setFullYear(viewedMonth.year(), viewedMonth.month(), focusedValue.getDate());

                        $t.calendar.focusDate(focusedValue, viewIndex, sharedCalendar, e.direction);

                    }, this))
                    .data('associatedDateView', this);

                calendar.value(this.selectedValue);

                $t.calendar.focusDate(this.focusedValue, calendar.currentView.index, sharedCalendar);
            }
        },

        open: function (position) {
            if (this.isOpened())
                return;

            this._reassignSharedCalendar();

            var isRtl = this.isRtl;
            var $calendar = this.$calendar;

            // reposition & rewire the shared calendar
            elementPosition = position.offset;
            elementPosition.top += position.outerHeight;

            if (mobileSafari) {
                if (!document.body.scrollLeft && !mobileSafari41)
                    elementPosition.left -= window.pageXOffset;
                if (!document.body.scrollTop && !mobileSafari41)
                    elementPosition.top -= window.pageYOffset;
            }

            if (isRtl)
                elementPosition.left -= (sharedCalendar.outerWidth() || sharedCalendar.parent().outerWidth()) - position.outerWidth;

            $t.fx._wrap(sharedCalendar).css($.extend({
                position: 'absolute',
                direction: isRtl ? 'rtl' : '',
                display: sharedCalendar.is(':visible') ? '' : 'none'
            }, elementPosition));

            var calendar = this._getCalendar();
            var viewIndex = calendar.currentView.index;

            if (!sharedCalendar.is(':visible') && calendar.viewedMonth.value - this.focusedValue != 0) {
                calendar.goToView(viewIndex, this.focusedValue)
                        .value(this.selectedValue);
            }

            $t.calendar.focusDate(this.focusedValue, calendar.currentView.index, sharedCalendar);

            $t.fx._wrap($calendar).css('zIndex', position.zIndex).show();

            $t.fx.play(this.effects, $calendar, { direction: 'bottom' });
        },

        close: function () {
            if (this.isOpened())
                $t.fx.rewind(this.effects, this.$calendar, { direction: 'bottom' }, function () {
                    if (sharedCalendar)
                        $t.fx._wrap(sharedCalendar).hide();
                });
        },

        isOpened: function () {
            return sharedCalendar && sharedCalendar.data('associatedDateView') == this && sharedCalendar.is(':visible');
        },

        value: function (value) {
            if (value === undefined)
                return this.selectedValue;

            var isNull = value === null;
            var calendar = this._getCalendar();

            //set selected date
            if (!isNull)
                value = value.value ? new Date(value.value) : value;

            calendar.value(value);
            this.selectedValue = value;

            //update focused date;
            if (isNull)
                value = new Date();

            this.focusedValue = new Date(value);
            $t.calendar.focusDate(value, calendar.currentView.index, sharedCalendar);
        },

        navigate: function (e) {
            if (this.isOpened() && $('.t-overlay', sharedCalendar).length > 0)
                return;

            var isFuture;
            var isNavProcessed = false;
            var $calendar = this.$calendar;
            var calendar = this._getCalendar();
            var viewedMonth = calendar.viewedMonth;
            var currentView = calendar.currentView;
            var viewIndex = currentView.index;
            var date = new $t.datetime(this.focusedValue);

            var navigate = function (className, method, futureNav) {
                if (!$(className, $calendar).hasClass('t-state-disabled')) {
                    if ('navigateUp' == method) viewIndex += 1;
                    isFuture = futureNav || false;
                    calendar[method]();
                    return true;
                }
                else return false;
            }

            var navigateDown = function () {
                var target = $t.calendar.findTarget(date, viewIndex, $calendar, false)[0];
                calendar.navigateDown(e, target, viewIndex);
                viewIndex = viewIndex == 0 ? 0 : viewIndex - 1;
                isFuture = true;
            }

            var navPrevNext = function (className, method, futureNav) {
                var diff = !futureNav ? -1 : 1;
                if (!navigate(className, method, futureNav)) return false;
                if (viewIndex == 0)
                    date.addMonth(diff);
                else
                    date.addYear(diff * (viewIndex == 1 ? 1 : viewIndex == 2 ? 10 : 100));
                return true;
            }

            var adjustDate = $t.datepicker.adjustDate;

            if ($calendar.is(':visible') && !e.shiftKey) {
                isNavProcessed = true;
                switch (e.keyCode) {
                    case 37: // left arrow
                        if (e.ctrlKey) {
                            if (!navPrevNext('.t-nav-prev', 'navigateToPast')) return;
                        } else {
                            adjustDate(viewIndex, date, -1, -1); // date modified by reference
                            if (currentView.navCheck(date, viewedMonth, false))
                                if (!navigate('.t-nav-prev', 'navigateToPast')) return;
                        }
                        break;
                    case 38: // up arrow
                        if (e.ctrlKey) {
                            navigate('.t-nav-fast', 'navigateUp');
                        } else {
                            adjustDate(viewIndex, date, -7, -4); // date modified by reference
                            if (currentView.navCheck(date, viewedMonth, false))
                                if (!navigate('.t-nav-prev', 'navigateToPast')) return;
                        }
                        break;
                    case 39: // right arrow
                        if (e.ctrlKey) {
                            if (!navPrevNext('.t-nav-next', 'navigateToFuture', true)) return;
                        } else {
                            adjustDate(viewIndex, date, 1, 1); // date modified by reference
                            if (currentView.navCheck(date, viewedMonth, true))
                                if (!navigate('.t-nav-next', 'navigateToFuture', true)) return;
                        }
                        break;
                    case 40: //down arrow
                        if (e.ctrlKey) {
                            navigateDown();
                        } else {
                            adjustDate(viewIndex, date, 7, 4); // date modified by reference
                            if (currentView.navCheck(date, viewedMonth, true))
                                if (!navigate('.t-nav-next', 'navigateToFuture', true)) return;
                        }
                        break;
                    case 33: // page up
                        if (!navPrevNext('.t-nav-prev', 'navigateToPast')) return;
                        break;
                    case 34: //page down
                        if (!navPrevNext('.t-nav-next', 'navigateToFuture', true)) return;
                        break;
                    case 35: //end
                        date = $t.calendar.views[viewIndex].firstLastDay(date, false, calendar);
                        break;
                    case 36: //home
                        date = $t.calendar.views[viewIndex].firstLastDay(date, true, calendar);
                        break;
                    case 13: // enter
                        e.stopPropagation();

                        if (viewIndex == 0)
                            this.onChange(this.focusedValue);
                        else
                            navigateDown();
                        break;
                    default:
                        isNavProcessed = false;
                        break;
                }
            }

            if (isNavProcessed) {
                e.preventDefault();
                date = $t.calendar.fitDateToRange(date, new $t.datetime(this.minValue), new $t.datetime(this.maxValue));

                $t.calendar.focusDate(date.toDate(), viewIndex, $calendar, isFuture);
                this.focusedValue = date.toDate();
            }
        }
    }

    $.each(['min', 'max'], $.proxy(function (index, method) {
        $t.dateView.prototype[method] =
            function (value) {
                var propertyName = method + 'Value';
                if (value === undefined)
                    return this[propertyName];

                this[propertyName] = new Date(value.value ? value.value : value);

                if (sharedCalendar.data("associatedDateView") === this) {
                    sharedCalendar.data("associatedDateView", null);
                    this._reassignSharedCalendar();
                }
            };
    }, this));

    $t.datepicker = function (element, options) {
        $.extend(this, options);

        if (element.nodeName.toLowerCase() !== "input" && element.type.toLowerCase() !== "text") {
            throw "Target element is not a INPUT";
        }

        this.element = element;
        var $element = this.$element = $(element)
                    .addClass('t-input')
                    .attr('autocomplete', 'off')
                    .bind({
                        keydown: $.proxy(this._keydown, this),
                        focus: $.proxy(function (e) {
                            if (this.openOnFocus) {
                                this._open();
                            }
                            this.$element.removeClass('t-state-error');
                        }, this),
                        blur: $.proxy(function (e) {
                            this._bluring = setTimeout($.proxy(function () {
                                if ($element.val() && this.parse($element.val()) === null) {
                                    this.$element.addClass('t-state-error');
                                }

                                if (!this.dateView.isOpened() && this.dateView === this.dateView.$calendar.data("associatedDateView")) {
                                    this._update($element.val());
                                }
                            }, this), 100);
                        }, this)
                    }); ;

        if (!$element.parent().hasClass('t-picker-wrap')) {

            $element.wrap('<div class="t-widget t-datepicker"><div class="t-picker-wrap"></div></div>');

            if (options.showButton) {
                var builder = new $t.stringBuilder(),
                    title = options.buttonTitle;

                $(builder
                    .cat('<span class="t-select">')
                    .cat('<span class="t-icon t-icon-calendar" ')
                    .catIf('title="', title)
                    .catIf(title, title)
                    .cat('"></span></span>')
                    .string())
                .insertAfter($element);
            }
        }

        this.dateView = new $t.dateView({
            todayFormat: this.todayFormat,
            selectedValue: this.selectedValue,
            minValue: this.minValue,
            maxValue: this.maxValue,
            effects: this.effects,
            isRtl: $element.closest('.t-rtl').length,
            onChange: $.proxy(function (value) {
                this._update(value);
                this._close();
            }, this)
        });

        this.dateView.$calendar
            .bind("click", $.proxy(function (e) {
                e.stopPropagation();
                clearTimeout(this._bluring);
                if (this.dateView !== this.dateView.$calendar.data("associatedDateView")) {
                    return;
                }
                if (e.target.parentNode.className.indexOf("t-state-selected") != -1) {
                    this._close();
                }
                window.setTimeout(function () { $element.focus(); }, 1);
            }, this));

        this.inputValue = $element.val();
        var value = this.selectedValue || this.inputValue;
        if (value) {
            this._value(this.parse(value));
        }

        var clickHandler = this.enabled
                         ? $.proxy(this._togglePopup, this)
                         : $t.preventDefault;

        this.$wrapper = $element.closest('.t-datepicker')
            .find('.t-icon')
            .bind('click', clickHandler)
            .end();

        $(document.documentElement).bind('mousedown', $.proxy(function (e) {
            var val = this.$element.val();
            if (val != this.inputValue) {
                this._update(val);
            }

            if (!sharedCalendar) return;

            var associatedDateView = sharedCalendar.data('associatedDateView');
            if (!associatedDateView || associatedDateView != this.dateView) {
                return;
            }

            if (!$.contains(this.$wrapper[0], e.target) && !$.contains(sharedCalendar[0], e.target)) {
                this._close();
            }
        }, this));

        $t.bind(this, {
            open: this.onOpen,
            close: this.onClose,
            valueChange: this.onChange,
            load: this.onLoad
        });
    }

    $t.datepicker.prototype = {
        _togglePopup: function () {
            if (this.dateView.isOpened()) {
                this._close();
            } else {
                this.element.focus();
                this._open();
            }
        },

        _close: function () {
            if (!sharedCalendar.is(':animated') && this.dateView.isOpened())
                this._trigger('close');
        },

        _open: function () {
            if (!this.dateView.isOpened())
                this._trigger('open');
        },

        _trigger: function (methodName) {
            if (!$t.trigger(this.element, methodName))
                this[methodName]();
        },

        _update: function (val) {
            val = this.parse(val);

            if (val != null) {
                if (val - this.minValue <= 0) {
                    val = this.minValue;
                }
                else if (val - this.maxValue >= 0) {
                    val = this.maxValue;
                }
            }

            var oldValue = this.selectedValue,
                formattedSelectedValue = oldValue ? $t.datetime.format(oldValue, this.format) : '',
                formattedValue = val ? $t.datetime.format(val, this.format) : '';

            this._value(val);

            if (formattedValue != formattedSelectedValue) {
                var data = {
                    previousValue: oldValue,
                    value: val,
                    previousDate: oldValue,
                    date: val
                };

                if ($t.trigger(this.element, 'valueChange', data)) {
                    this._value(oldValue)
                }
            }
        },

        _keydown: function (e) {
            var keyCode = e.keyCode;

            if (keyCode == 9 || (keyCode == 13 && this.inputValue != this.$element.val())) {
                this._update(this.$element.val());
                this._close();
            } else if (keyCode == 27) {
                this._close();
            } else if (e.altKey) {
                if (keyCode == 40) {
                    this._open();
                } else if (keyCode == 38) {
                    this._close();
                }
            } else {
                this.dateView.navigate(e);
            }
        },

        enable: function () {
            this.$element.attr('disabled', false);
            this.$wrapper
                .removeClass('t-state-disabled')
                .find('.t-icon')
                .unbind('click')
                .bind('click', $.proxy(this._togglePopup, this));
        },

        disable: function (e) {
            this.$element.attr('disabled', true);
            this.$wrapper
                .addClass('t-state-disabled')
                .find('.t-icon')
                .unbind('click')
                .bind('click', $t.preventDefault);
        },

        _value: function (value) {
            var text = this.$element.val();
            var isNull = value === null;

            this.selectedValue = value;

            this.dateView.value(value);

            if (!isNull) {
                text = $t.datetime.format(value, this.format);
            }

            this.inputValue = text;
            this.$element.toggleClass('t-state-error', isNull && text != '')
                         .val(text);
        },

        value: function (val) {
            if (val === undefined)
                return this.selectedValue;

            var parsedValue = this.parse(val);
            parsedValue = $t.datepicker.isInRange(parsedValue, this.minValue, this.maxValue) ? parsedValue : null;

            if (parsedValue === null) {
                this.$element.removeClass('t-state-error').val('');
            }

            this._value(parsedValue);

            return this;
        },

        //obsolete
        showPopup: function () {
            this.open();
        },

        //obsolete
        hidePopup: function () {
            this.close();
        },

        open: function () {
            var $element = this.$element;

            this.dateView.open({
                offset: $element.offset(),
                outerHeight: $element.outerHeight(),
                outerWidth: $element.outerWidth(),
                zIndex: $t.getElementZIndex($element[0])
            });
        },

        close: function () {
            this.dateView.close();
        },

        parse: function (value, format) {
            if (value === null || value.getDate)
                return value;

            var result = $t.datetime.parse({
                value: value,
                format: format || this.format,
                shortYearCutOff: this.shortYearCutOff
            });
            return result != null ? result.toDate() : null;

        }
    }

    $.each(["min", "max"], $.proxy(function (index, method) {
        $t.datepicker.prototype[method] =
        function (value) {
            var propertyName = method + 'Value';
            if (value === undefined)
                return this[propertyName];

            var parsedValue = this.parse(value);

            if (parsedValue !== null) {
                var oldValue = this[propertyName];
                this[propertyName] = parsedValue;

                if (this.minValue > this.maxValue) {
                    this[propertyName] = oldValue;
                    return;
                }

                this.dateView[method](parsedValue);
            }
        };
    }, this));

    $.extend($t.datepicker, {
        adjustDate: function (viewIndex, date, monthValue, otherViewValue) {
            if (viewIndex == 0)
                $t.datetime.modify(date, $t.datetime.msPerDay * monthValue);
            else if (viewIndex == 1)
                date.addMonth(otherViewValue);
            else
                date.addYear((viewIndex == 2 ? otherViewValue : 10 * otherViewValue));
        },

        isInRange: function (date, minDate, maxDate) {
            if (!date) return false;
            return minDate - date <= 0 && maxDate - date >= 0;
        }
    });

    $.fn.tDatePicker = function (options) {
        return $t.create(this, {
            name: 'tDatePicker',
            init: function (element, options) {
                return new $t.datepicker(element, options);
            },
            options: options
        });
    };

    $.fn.tDatePicker.defaults = {
        effects: $t.fx.slide.defaults(),
        selectedValue: null,
        format: $t.cultureInfo.shortDate,
        minValue: new Date(1899, 11, 31),
        maxValue: new Date(2100, 0, 1),
        shortYearCutOff: 30,
        showButton: true,
        buttonTitle: 'Open the calendar',
        enabled: true,
        openOnFocus: false
    };

})(jQuery);