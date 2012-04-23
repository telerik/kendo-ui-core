(function ($) {
    var $t = $.telerik;

    $t.scripts.push("telerik.autocomplete.js");

    $t.autocomplete = function (element, options) {
        $.extend(this, options);

        var $element = this.$element = $(element)
                                    .addClass('t-widget t-autocomplete t-input')
                                    .attr('autocomplete', 'off')
                                    .bind("paste", $.proxy(function (e) {
                                        resetTimer(this);
                                    }, this));

        this.$text = $element;
        this.element = element;
        this.trigger = new $t.list.trigger(this);
        this.trigger.change = function () {
            var text = this.component.text();
            var previousValue = this.component.previousValue;

            if (previousValue == undefined || text != previousValue)
                $t.trigger(this.component.element, 'valueChange', { value: text });

            this.component.previousValue = text;
        }

        this.loader = new $t.list.loader(this);
        this.loader.showBusy = function () {
            this.busyTimeout = setTimeout($.proxy(function () {
                this.component.$element.addClass('t-loading');
            }, this), 100);
        }
        this.loader.hideBusy = function () {
            clearTimeout(this.busyTimeout);
            this.component.$element.removeClass('t-loading');
        }

        this.filtering = new $t.list.filtering(this);
        this.filtering.autoFill = function (component, itemText) {
            if (component.autoFill && (component.lastKeyCode != 8 && component.lastKeyCode != 46)) {

                var input = component.$text[0],
                    textBoxValue = input.value,
                    separator = component.separator,
                    endIndex = $t.caretPos(input),
                    multiple = component.multiple;

                var lastSeparatorIndex = multiple && separator ? $t.lastIndexOf(textBoxValue.substring(0, endIndex), separator) : -1;
                var startIndex = lastSeparatorIndex != -1 ? lastSeparatorIndex + separator.length : 0;

                var filterString = textBoxValue.substring(startIndex, endIndex);
                var matchIndex = itemText.toLowerCase().indexOf(filterString.toLowerCase());

                if (matchIndex != -1) {

                    var stringToAppend = itemText.substring(matchIndex + filterString.length);

                    if (multiple) {
                        var split = textBoxValue.split(separator),
                            wordIndex = valueArrayIndex(input, separator);

                        split[wordIndex] = filterString + stringToAppend;
                        input.value = split.join(separator) + (component.multiple && wordIndex != 0 && wordIndex == split.length - 1 ? separator : '');
                    } else {
                        input.value = filterString + stringToAppend;
                    }

                    $t.list.selection(input, endIndex, endIndex + stringToAppend.length);
                }
            }
        }

        this.enable = function () {
            $element
            .removeClass('t-state-disabled')
            .removeAttr("disabled");
        }

        this.disable = function () {
            $element
            .addClass('t-state-disabled')
            .attr('disabled', 'disabled');
        }

        this.filtering.multiple = $.proxy(function (text) {
            if (this.multiple) {
                text = text.split(this.separator);
                text = text[valueArrayIndex(this.$text[0], this.separator)];
            }
            return text;
        }, this);

        this.dropDown = new $t.dropDown({
            attr: this.dropDownAttr,
            effects: this.effects,
            onClick: $.proxy(function (e) {
                this.select(e.item);
                this.trigger.change();
                this.trigger.close();
            }, this)
        });

        this.dropDown.$element.css('direction', $element.closest('.t-rtl').length ? 'rtl' : '');

        this.fill = function (callback) {
            function highlightItem(component) {
                var $item = component.highlightFirst ? dropDown.$items.first() : null;
                if ($item) $item.addClass('t-state-selected');
            }

            var loader = this.loader;
            var dropDown = this.dropDown;
            var minChars = this.minChars;
            var textValue = this.text();
            var textValueLength = textValue.length;

            if (!dropDown.$items && !loader.ajaxError) {
                if ((loader.isAjax() || this.onDataBinding) && textValueLength >= minChars) {

                    var postData = {};
                    postData[this.queryString.text] = textValue;

                    loader.ajaxRequest(function (data) {
                        this.dataBind(data, true);
                        highlightItem(this);

                        $t.trigger(this.element, 'dataBound');
                        this.trigger.change();

                        if (callback) callback();
                    },
                    { data: postData });
                }
                else {
                    this.dataBind(this.data, true);
                    highlightItem(this);
                    if (callback) callback();
                }
            }
        }

        this.text = function () {
            if (arguments.length > 0) {
                this.previousValue = arguments[0];
            }
            return this.$text.val.apply(this.$text, arguments);
        }

        this.value = function () {
            return this.text.apply(this, arguments);
        }

        this.select = function (item) {

            var index = this.highlight(item);

            if (index == -1) return index;

            var filteredDataIndexes = this.filteredDataIndexes;
            var itemIndex = (filteredDataIndexes && filteredDataIndexes.length) > 0 ? filteredDataIndexes[index] : index;

            var item = this.data[itemIndex];
            var dataText = item.Text ? item.Text : item;
            var value = dataText;

            if (this.multiple) {

                var $element = this.$element
                var separator = this.separator;
                var wordIndex = valueArrayIndex($element[0], separator);

                value = $element.val().split(separator);
                value[wordIndex] = dataText;
                value = value.join(separator) + (wordIndex == value.length - 1 ? separator : '');
            }

            this.$text.val(value);
        }

        $t.list.common.call(this);
        $t.list.filters.call(this);
        $t.list.initialize.call(this);

        //overrides common.databind method
        this.dataBind = function (data, preserveStatus) {
            this.data = data = (data || []);
            this.dropDown.dataBind(data, this.encoded);
            if (!preserveStatus) {
                this.$text.val('');
            }
        }

        $element
            .bind({
                focus: $.proxy(function (e) { e.stopPropagation(); }, this),
                keydown: $.proxy(keydown, this),
                keypress: $.proxy(function (e) {
                    var key = e.keyCode || e.charCode;

                    if (key == 0 || $.inArray(key, $t.list.keycodes) != -1 || e.ctrlKey) return true;

                }, this)
            });

        $(document.documentElement).bind('mousedown', $.proxy(function (e) {
            var $parent = this.dropDown.$element.parent();
            var parentLength = $parent.length;

            if ((!parentLength && element !== e.target) || (parentLength && !$.contains(element, e.target) && !$.contains($parent[0], e.target))) {
                this.trigger.change();
                this.trigger.close();
            }
        }, this));

        //PRIVATE
        function valueArrayIndex(input, separator) {
            return input.value.substring(0, $t.caretPos(input)).split(separator).length - 1;
        }

        function resetTimer(component) {
            clearTimeout(component.timeout);
            component.timeout = setTimeout(function () { component.filtering.filter(component) }, component.delay);
        }

        function keydown(e) {
            var trigger = this.trigger;
            var dropDown = this.dropDown;
            var key = e.keyCode || e.which;
            this.lastKeyCode = key;

            if (!e.shiftKey && key > 36 && key < 41 && key != 37 && key != 39) {

                e.preventDefault();

                if (dropDown.isOpened()) {

                    if (!dropDown.$items) this.fill();

                    var $items = dropDown.$items;

                    var $selectedItem = $items.filter('.t-state-selected:first');

                    var $item = [];

                    if (key == 38) {
                        var prevItem = $selectedItem.prev();
                        $item = prevItem.length ? prevItem : $items.last();
                    } else if (key == 40) {
                        var nextItem = $selectedItem.next();
                        $item = nextItem.length ? nextItem : $items.first();
                    }

                    if ($item.length) {
                        var item = $item[0];

                        this.highlight(item);
                        dropDown.scrollTo(item);

                        this.filtering.autoFill(this, $item.text());
                    }
                }
                return;
            }

            if (key == 8 || key == 46) {
                var $element = this.$element;

                if ($element.val() != '') resetTimer(this); //reset and start filtering after delay

                setTimeout($.proxy(function () {
                    if ($element.val() == '') {
                        trigger.close();
                    }
                }, this), 0);
                return;
            }

            if (key == 13) {

                if (dropDown.isOpened()) e.preventDefault();

                if (dropDown.$items) {
                    var $selectedItems = dropDown.$items.filter('.t-state-selected:first');

                    if ($selectedItems.length > 0) {
                        this.select($selectedItems[0]);
                    }
                }
                trigger.change();
                trigger.close();
                $t.list.moveToEnd(this.element);
                return;
            }

            if (key == 27 || key == 9) {
                clearTimeout(this.timeout);
                trigger.change();
                trigger.close();
                return;
            }

            resetTimer(this); //reset and start filtering after delay
        }
    }

    // jQuery extender
    $.fn.tAutoComplete = function (options) {
        return $t.create(this, {
            name: 'tAutoComplete',
            init: function (element, options) {
                return new $t.autocomplete(element, options)
            },
            options: options
        });
    };

    // default options
    $.fn.tAutoComplete.defaults = {
        encoded: true,
        effects: $t.fx.slide.defaults(),
        filter: 1,
        delay: 200,
        minChars: 1,
        cache: true,
        autoFill: false,
        highlightFirst: false,
        queryString: {
            text: 'text'
        },
        multiple: false,
        separator: ', '
    };
})(jQuery);
