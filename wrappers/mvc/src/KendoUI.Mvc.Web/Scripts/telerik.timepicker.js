(function ($) {

    var $t = $.telerik;
    $t.scripts.push("telerik.timepicker.js");

    $t.timeView = function (options) {
        $.extend(this, options);

        var dropDown = this.dropDown = new $t.dropDown({
            attr: this.dropDownAttr,
            effects: this.effects,
            onClick: function (e) {
                var item = e.item;
                options.onChange(item.innerText || item.textContent);
            }
        });

        dropDown.$element
                .addClass('t-time-popup')
                .css('direction', this.isRtl ? 'rtl' : '');
    }

    $t.timeView.prototype = {
        _ensureItems: function () {
            if (!this.dropDown.$items) {
                if (this.dates) {
                    this.dataBind(this.dates);
                } else {
                    this.bind();
                }
            }
        },

        open: function (position) {
            this._ensureItems();
            this.dropDown.open(position);
        },

        close: function () {
            this.dropDown.close();
        },

        dataBind: function (data) {
            if (!data) {
                return;
            }
            var min = this.minValue;
            var max = this.maxValue;

            var availableHours = [];
            var format = this.format;
            var formater = $t.datetime.format;
            var isInRange = $t.timeView.isInRange;
            var date;

            for (var i = 0, length = data.length; i < length; i++) {
                date = data[i];

                if (isInRange(date, min, max)) {
                    availableHours[i] = formater(data[i], format);
                }
            }

            this.dropDown.dataBind(availableHours);
        },

        bind: function () {
            var getTimeMilliseconds = $t.timeView.getTimeMilliseconds;

            var availableHours = [];
            var format = this.format;
            var interval = this.interval;
            var tmpDate = new $t.datetime(this.minValue);
            var msMinTime = getTimeMilliseconds(tmpDate);
            var msMaxTime = getTimeMilliseconds(this.maxValue);
            var msInterval = interval * $t.datetime.msPerMinute;
            var dst = $t.datetime.dst() * $t.datetime.msPerMinute;
            var ignoreDST = dst < 0;

            if (!ignoreDST) {
                dst = 0;
            }

            var records = parseInt(($t.datetime.msPerDay + dst) / (interval * $t.datetime.msPerMinute));

            if (msMinTime != msMaxTime) {
                var result = msMinTime < msMaxTime ?
                             msMaxTime - msMinTime :
                             msMaxTime + $t.datetime.msPerDay - msMinTime;

                records = parseInt(result / msInterval) + 1;
            }

            var add = $t.datetime.add;
            var formater = $t.datetime.format;
            for (var i = 0; i < records; i++) {
                availableHours[i] = formater(tmpDate.toDate(), format);
                tmpDate = add(tmpDate, msInterval, ignoreDST);
            }

            if (getTimeMilliseconds(tmpDate) - msInterval - msMaxTime != 0 && msMinTime != msMaxTime && availableHours[records - 1] != formater(this.maxValue, format)) {
                availableHours[records] = formater(this.maxValue, format);
            }

            this.dropDown.dataBind(availableHours);
        },

        isOpened: function () {
            return this.dropDown.isOpened();
        },

        value: function (value) {
            this._ensureItems();
            var dropDown = this.dropDown;

            if (value === undefined)
                return dropDown.$items.filter('.t-state-selected').text();

            var $items = dropDown.$items;
            if (!$items) return;

            $items.removeClass('t-state-selected');
            if (value) {
                dropDown.highlight($.grep($items, function (li) {
                    return (li.innerText || li.textContent) == value;
                }));
            }
        },

        navigate: function (e) {
            var key = e.keyCode || e.which;

            if (key == 38 || key == 40)
                e.preventDefault();

            this._ensureItems();
            var dropDown = this.dropDown;
            var $items = dropDown.$items;
            var $selectedItem = $items.filter('.t-state-selected');

            var $item = $selectedItem.length == 0 || $items.length == 1
                            ? $items.first()
                            : (key == 38) ? $selectedItem.prev() // up
                            : (key == 40) ? $selectedItem.next() // down
                            : [];

            if ($item.length) {
                var text = $item.text();
                dropDown.scrollTo($item[0]);
                dropDown.highlight($item[0]);
                if (!dropDown.isOpened())
                    this.onChange(text);
                else
                    this.onNavigateWithOpenPopup(text);
            }
        }
    }

    $.each(["min", "max"], $.proxy(function (index, method) {
        $t.timeView.prototype[method] =
            function (value) {
                var propertyName = method + 'Value';
                if (value === undefined)
                    return this[propertyName];

                this[propertyName] = new Date(value.value ? value.value : value);
                this.bind();
            };
    }, this));

    $.extend($t.timeView, {
        isInRange: function (value, minValue, maxValue) {
            if (value === null) return true;

            var getTimeMilliseconds = $t.timeView.getTimeMilliseconds;
            var msPerDay = $t.datetime.msPerDay;
            var msValue = getTimeMilliseconds(value);
            var msMinTime = getTimeMilliseconds(minValue);
            var msMaxTime = getTimeMilliseconds(maxValue);

            msValue = msMinTime > msValue
                    ? msValue + msPerDay
                    : msValue;

            msMaxTime = msMinTime > msMaxTime
                        ? msMaxTime + msPerDay
                        : msMaxTime;

            return msMinTime - msMaxTime == 0 || msValue >= msMinTime && msValue <= msMaxTime;
        },

        getTimeMilliseconds: function (value) {
            value = value.value ? value : new $t.datetime(value);
            return ((value.hours() * 60) + value.minutes()) * $t.datetime.msPerMinute + value.seconds() * 1000 + value.milliseconds();
        }
    });

    $t.timepicker = function (element, options) {

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

                                this._update($element.val());
                            }, this), 100);
                        }, this)
                    });


        if (!$element.parent().hasClass('t-picker-wrap')) {

            $element.wrap('<div class="t-widget t-timepicker"><div class="t-picker-wrap"></div></div>');

            if (options.showButton) {
                var builder = new $t.stringBuilder(),
                title = options.buttonTitle;

                $(builder
                    .cat('<span class="t-select">')
                    .cat('<span class="t-icon t-icon-clock" ')
                    .catIf('title="', title)
                    .catIf(title, title)
                    .cat('"></span></span>')
                    .string())
                .insertAfter($element);
            }
        }

        this.timeView = new $t.timeView({
            dates: this.dates,
            effects: this.effects,
            dropDownAttr: this.dropDownAttr,
            format: this.format,
            interval: this.interval,
            isRtl: $element.closest('.t-rtl').length,
            minValue: this.minValue,
            maxValue: this.maxValue,
            onNavigateWithOpenPopup: $.proxy(function (value) {
                this.$element.val(value);
            }, this),
            onChange: $.proxy(function (value) {
                clearTimeout(this._bluring);
                if (value != this.inputValue) {
                    this._update(value);
                }
                this._close();
                window.setTimeout(function () { $element.focus(); }, 1);
            }, this)
        });

        this.inputValue = $element.val();

        var value = this.selectedValue || this.inputValue;
        if (value) {
            this._value(this.parse(value));
        }

        var clickHandler = this.enabled
                         ? $.proxy(this._togglePopup, this)
                         : $t.preventDefault;

        this.$wrapper = $element.closest('.t-timepicker')
            .find('.t-icon')
            .bind('click', clickHandler)
            .end();

        $(document.documentElement).bind('mousedown', $.proxy(function (e) {
            var val = this.$element.val();
            if (val != this.inputValue) {
                this._update(val);
            }

            var $dropDown = this.timeView.dropDown.$element;
            var isDropDown = $dropDown && $dropDown.parent().length > 0;

            if (!isDropDown
            || $.contains(this.$wrapper[0], e.target)
            || $.contains($dropDown.parent()[0], e.target))
                return;

            this._close();

        }, this));

        $t.bind(this, {
            open: this.onOpen,
            close: this.onClose,
            valueChange: this.onChange,
            load: this.onLoad
        });
    }

    $t.timepicker.prototype = {
        _close: function () {
            var dropDown = this.timeView.dropDown;
            if (!dropDown.$element.is(':animated') && dropDown.isOpened())
                this._trigger('close');
        },

        _open: function () {
            if (!this.timeView.isOpened())
                this._trigger('open');
        },

        _trigger: function (methodName) {
            if (!$t.trigger(this.element, methodName))
                this[methodName]();
        },

        _togglePopup: function () {
            if (this.timeView.isOpened()) {
                this._close();
            } else {
                this.element.focus();
                this._open();
            }
        },

        _update: function (val) {

            var minValue = this.minValue,
                maxValue = this.maxValue,
                val = this.parse(val),
                oldValue = this.selectedValue;

            if (val != null && !$t.timeView.isInRange(val, minValue, maxValue)) {
                var getTimeMilliseconds = $t.timeView.getTimeMilliseconds,
                    msValue = getTimeMilliseconds(val),
                    minDiff = Math.abs(getTimeMilliseconds(minValue) - msValue),
                    maxDiff = Math.abs(getTimeMilliseconds(maxValue) - msValue);

                val = new Date(minDiff < maxDiff ? minValue : maxValue);
            }

            var formattedSelectedValue = oldValue ? $t.datetime.format(oldValue, this.format) : '',
                formattedValue = val ? $t.datetime.format(val, this.format) : '';

            this._value(val);

            if (formattedValue != formattedSelectedValue) {
                if ($t.trigger(this.element, 'valueChange', { previousValue: oldValue, value: val })) {
                    this._value(oldValue)
                }
            }
        },

        _value: function (value) {
            var text = this.$element.val();
            var isNull = value === null;

            this.selectedValue = value;
            this.timeView.value(isNull ? null : $t.datetime.format(value, this.format));

            if (!isNull)
                text = $t.datetime.format(value, this.format);

            this.inputValue = text;
            this.$element.toggleClass('t-state-error', isNull && text != '')
                         .val(text);
        },

        _keydown: function (e) {
            var key = e.keyCode || e.which;

            if (e.altKey) {
                if (key == 40) {
                    this._open();
                } else if (key == 38) {
                    this._close();
                }
                return;
            }

            if (!e.shiftKey && (key === 38 || key === 40)) {
                this.timeView.navigate(e);
                return;
            }

            if (key == 9 || key == 13 || key == 27) {
                this._update(this.$element.val());
                this._close();
            }
        },

        enable: function () {
            this.$element.attr('disabled', false);
            this.$wrapper.removeClass('t-state-disabled')
                         .find('.t-icon')
                         .unbind('click')
                         .bind('click', $.proxy(this._togglePopup, this));
        },

        disable: function (e) {
            this.$element.attr('disabled', true);
            this.$wrapper.addClass('t-state-disabled')
                         .find('.t-icon')
                         .unbind('click')
                         .bind('click', $t.preventDefault);
        },

        value: function (val) {
            if (val === undefined)
                return this.selectedValue;

            var parsedValue = this.parse(val);
            parsedValue = $t.timeView.isInRange(parsedValue, this.minValue, this.maxValue) ? parsedValue : null;

            if (parsedValue === null)
                this.$element.removeClass('t-state-error').val('');

            this._value(parsedValue);

            return this;
        },

        parse: function (value) {
            if (value === null || value.getDate)
                return value;

            var result = $t.datetime.parse({
                AM: $t.cultureInfo.am,
                PM: $t.cultureInfo.pm,
                value: value,
                format: this.format,
                baseDate: this.selectedValue ? new $t.datetime(this.selectedValue) : new $t.datetime()
            });
            return result != null ? result.toDate() : null;
        },

        open: function () {
            var $element = this.$element;
            this.timeView.open({
                offset: $element.offset(),
                outerHeight: $element.outerHeight(),
                outerWidth: $element.outerWidth(),
                zIndex: $t.getElementZIndex($element[0])
            });
        },

        close: function () {
            this.timeView.close();
        }
    }

    $.each(["min", "max"], $.proxy(function (index, method) {
        $t.timepicker.prototype[method] =
            function (value) {
                var propertyName = method + 'Value';
                if (value === undefined)
                    return this[propertyName];

                var parsedValue = this.parse(value);
                if (parsedValue !== null) {
                    this[propertyName] = parsedValue;
                    this.timeView[method](parsedValue);
                }
            };
    }, this));

    $.fn.tTimePicker = function (options) {
        return $t.create(this, {
            name: 'tTimePicker',
            init: function (element, options) {
                return new $t.timepicker(element, options);
            },
            options: options
        });
    };

    $.fn.tTimePicker.defaults = {
        effects: $t.fx.slide.defaults(),
        minValue: new $t.datetime().hours(0).minutes(0).seconds(0).toDate(),
        maxValue: new $t.datetime().hours(0).minutes(0).seconds(0).toDate(),
        selectedValue: null,
        format: $t.cultureInfo.shortTime,
        interval: 30,
        showButton: true,
        buttonTitle: 'Open the calendar',
        enabled: true,
        openOnFocus: false
    };

})(jQuery);