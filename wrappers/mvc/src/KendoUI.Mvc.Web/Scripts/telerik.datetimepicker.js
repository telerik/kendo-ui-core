(function ($) {

    var $t = $.telerik;

    $t.scripts = $t.scripts || [];
    $t.scripts.push("telerik.datetimepicker.js");

    function getButtonHtml(type, titleText) {
        var builderHtml = new $t.stringBuilder();
        return builderHtml.cat('<span class="t-icon t-icon-')
                                      .cat(type)
                                      .cat('" ')
                                      .catIf('title="', titleText)
                                      .catIf(titleText, titleText)
                                      .cat('"></span>')
                                      .string();
    }

    $t.datetimepicker = function (element, options) {
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
                            this.$element.removeClass('t-state-error');
                        }, this),
                        blur: $.proxy(function(e) {
                            this._bluring = setTimeout($.proxy(function() {
                                if ($element.val() && this.parse($element.val()) === null) {
                                    this.$element.addClass('t-state-error');
                                }

                                if (!this.dateView.isOpened() && this.dateView === this.dateView.$calendar.data("associatedDateView")) {
                                    this._update($element.val());
                                }
                            }, this), 100);
                        }, this)
                    });

        if (!$element.parent().hasClass('t-picker-wrap')) {

            $element.wrap('<div class="t-widget t-datetimepicker"><div class="t-picker-wrap"></div></div>');

            if (options.showCalendarButton || options.showTimeButton) {
                $(new $t.stringBuilder()
                    .cat('<span class="t-select">')
                    .catIf(getButtonHtml('calendar', options.calendarButtonTitle), options.showCalendarButton)
                    .cat(getButtonHtml('clock', options.timeButtonTitle), options.showTimeButton)
                    .cat('</span>')
                    .string())
                .insertAfter($element);
            }
        }

        this.$wrapper = $element.closest('.t-datetimepicker')
                    .find('.t-icon-clock')
                    .bind('click', this.enabled ? $.proxy(this._toggleTimeView, this) : $t.preventDefault)
                    .end()
                    .find('.t-icon-calendar')
                    .bind('click', this.enabled ? $.proxy(this._toggleDateView, this) : $t.preventDefault)
                    .end();

        this.timeView = new $t.timeView({
            dates: this.dates,
            effects: this.effects,
            dropDownAttr: this.dropDownAttr,
            format: this.timeFormat,
            interval: this.interval,
            isRtl: $element.closest('.t-rtl').length,
            minValue: this.startTimeValue,
            maxValue: this.endTimeValue,
            onNavigateWithOpenPopup: $.proxy(function (value) {
                var date = this.parse(value, this.timeFormat);
                this.$element.val($t.datetime.format(date, this.format));
            }, this),
            onChange: $.proxy(function (value) {
                clearTimeout(this._bluring);
                this._update(this.parse(value, this.timeFormat));
                this._close('time');
                window.setTimeout(function(){$element.focus();}, 1);
            }, this)
        });

        this.dateView = new $t.dateView({
            todayFormat: this.todayFormat,
            selectedValue: this.selectedValue,
            minValue: this.minValue,
            maxValue: this.maxValue,
            effects: this.effects,
            isRtl: $element.closest('.t-rtl').length,
            onChange: $.proxy(function (value) {
                this._update(value);
                this._close('date');
            }, this)
        });

        this.dateView.$calendar
            .bind("click", $.proxy(function(e) {
                e.stopPropagation();
                clearTimeout(this._bluring);
                if (this.dateView !== this.dateView.$calendar.data("associatedDateView")) {
                    return;
                }
                if (e.target.parentNode.className.indexOf("t-state-selected") != -1) {
                    this._close("date");
                }
                window.setTimeout(function(){$element.focus();}, 1);
            }, this));

        this.inputValue = $element.val();
        var value = this.selectedValue || this.inputValue;
        if (value) {
            var parsedValue = this.parse(value);
            this.dateView.selectedValue = parsedValue; //should set it if dateView has never been open;
            this._value(this.parse(value));
        }

        $(document.documentElement).bind('mousedown', $.proxy(function (e) {
            var val = this.$element.val();
            if (val != this.inputValue) {
                this._update(val);
            }
            
            var $calendar = this.dateView.$calendar;
            if (!$calendar) return;

            var $dropDown = this.timeView.dropDown.$element;
            var isDropDown = $dropDown && $dropDown.parent().length > 0;
            var associatedDateView = $calendar.data('associatedDateView');

            var target = e.target;
            if ($.contains(this.$wrapper[0], target)
            || (associatedDateView && associatedDateView == this.dateView && $.contains($calendar[0], target))
            || (isDropDown && $.contains($dropDown.parent()[0], target)))
                return;

            this._close('date');
            this._close('time');

        }, this));

        $t.bind(this, {
            open: this.onOpen,
            close: this.onClose,
            valueChange: this.onChange,
            load: this.onLoad
        });
    }

    $t.datetimepicker.prototype = {
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
                    value: val
                };

                if ($t.trigger(this.element, 'valueChange', data)) {
                    this._value(oldValue);
                }
            }
        },

        _value: function (value) {
            var text = this.$element.val();
            var isNull = value === null;

            this.selectedValue = value;
            this.timeView.value(isNull ? null : $t.datetime.format(value, this.timeFormat));
            this.dateView.value(value);

            if (!isNull)
                text = $t.datetime.format(value, this.format);

            this.inputValue = text;
            this.$element.toggleClass('t-state-error', isNull && text != '')
                         .val(text);
        },

        _open: function (popup) {
            if (!this[popup == "time" ? 'timeView' : 'dateView'].isOpened())
                this._trigger(popup, 'open');
        },

        _close: function (popup) {
            var dateView = this.dateView;
            var dropDown = this.timeView.dropDown;

            if ((popup == "time" && !dropDown.$element.is(':animated') && dropDown.isOpened())
            || (!dateView.$calendar.is(':animated') && dateView.isOpened()))
                this._trigger(popup, 'close');
        },

        _trigger: function (popup, methodName) {
            if (!$t.trigger(this.element, methodName, { popup: popup }))
                this[methodName](popup)
        },

        _keydown: function (e) {
            var keyCode = e.keyCode,
                isDateViewOpened = this.dateView.isOpened();

            if (keyCode == 9 || keyCode == 27 || (keyCode == 13 && this.inputValue != this.$element.val())) {
                this._update(this.$element.val());
                this._close('date');
                this._close('time');
                return;
            }

            if (e.altKey) {
                if (keyCode == 40) {
                    this._close(isDateViewOpened ? 'date' : 'time');
                    this._open(isDateViewOpened ? 'time' : 'date');
                } else if (keyCode == 38) {
                    this._close(isDateViewOpened ? 'date' : 'time');
                }
                return;
            }

            if (isDateViewOpened) {
                this.dateView.navigate(e);
                return;
            }

            if (this.timeView.isOpened() && (keyCode === 38 || keyCode === 40)) {
                this.timeView.navigate(e);
                return;
            }
        },

        _toggleDateView: function () {
            if (this.dateView.isOpened()) {
                this._close('date')
            } else {
                this.element.focus();
                this._open('date')
                this._close('time')
            }
        },

        _toggleTimeView: function () {
            if (this.timeView.isOpened()) {
                this._close('time')
            } else {
                this.element.focus();
                this._open('time');
                this._close('date');
            }
        },

        enable: function () {
            this.$element.attr('disabled', false);
            this.$wrapper
                .removeClass('t-state-disabled')
                .find('.t-icon-clock')
                .unbind('click')
                .bind('click', $.proxy(this._toggleTimeView, this))
                .end()
                .find('.t-icon-calendar')
                .unbind('click')
                .bind('click', $.proxy(this._toggleDateView, this));
        },

        disable: function (e) {
            this.$element.attr('disabled', true);
            this.$wrapper
                .addClass('t-state-disabled')
                .find('.t-icon')
                .unbind('click')
                .bind('click', $t.preventDefault);
        },

        open: function (popup) {
            var $element = this.$element;
            var position = {
                offset: $element.offset(),
                outerHeight: $element.outerHeight(),
                outerWidth: $element.outerWidth(),
                zIndex: $t.getElementZIndex($element[0])
            }

            this[popup == "time" ? 'timeView' : 'dateView'].open(position);
        },

        close: function (popup) {
            this[popup == "time" ? 'timeView' : 'dateView'].close();
        },

        value: function (val) {
            if (val === undefined)
                return this.selectedValue;

            var parsedValue = this.parse(val);
            parsedValue = $t.datepicker.isInRange(parsedValue, this.minValue, this.maxValue) ? parsedValue : null;

            if (parsedValue === null)
                this.$element.removeClass('t-state-error').val('');

            this._value(parsedValue);

            return this;
        },

        parse: function (value, format) {
            if (value === null || value.getDate)
                return value;

            format = format || this.format;

            var result = $t.datetime.parse({
                AM: $t.cultureInfo.am,
                PM: $t.cultureInfo.pm,
                value: value,
                format: format,
                baseDate: this.selectedValue ? new $t.datetime(this.selectedValue) : new $t.datetime()
            });

            return result != null ? result.toDate() : null;
        }
    }

    $.each(["min", "max"], $.proxy(function (index, method) {
        $t.datetimepicker.prototype[method] =
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

    $.each(["startTime", "endTime"], $.proxy(function (index, method) {
        $t.datetimepicker.prototype[method] =
            function (value) {
                var propertyName = method + 'Value';
                if (value === undefined)
                    return this[propertyName];

                var parsedValue = this.parse(value, $t.cultureInfo.shortTime);
                if (parsedValue !== null) {
                    this[propertyName] = parsedValue;
                    method == 'startTime' ? this.timeView.min(parsedValue) : this.timeView.max(parsedValue)
                }
            };
    }, this));

    $.fn.tDateTimePicker = function (options) {
        $.fn.tDateTimePicker.defaults.timeFormat = $t.cultureInfo.shortTime;

        return $t.create(this, {
            name: 'tDateTimePicker',
            init: function (element, options) {
                return new $t.datetimepicker(element, options);
            },
            options: options
        });
    };

    $.fn.tDateTimePicker.defaults = {
        effects: $t.fx.slide.defaults(),
        selectedValue: null,
        format: $t.cultureInfo.generalDateTime,
        focusedDate: new $t.datetime(),
        minValue: new Date(1899, 11, 31),
        maxValue: new Date(2100, 0, 1),
        startTimeValue: new $t.datetime().hours(0).minutes(0).seconds(0).toDate(),
        endTimeValue: new $t.datetime().hours(0).minutes(0).seconds(0).toDate(),
        calendarButtonTitle: "Open the calendar",
        timeButtonTitle: "Open the time view",
        showCalendarButton: true,
        showTimeButton: true,
        shortYearCutOff: 30,
        enabled: true,
        interval: 30
    };

})(jQuery);
