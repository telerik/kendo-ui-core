(function ($) {

    var $t = $.telerik;
    $t.scripts.push("telerik.combobox.js");

    $t.combobox = function (element, options) {
        if (options && options.enabled === undefined) {
            options.enabled = !$(element).is("[disabled]");
        }

        $.extend(this, options);

        var isTextBox = element.nodeName.toLowerCase() == 'input' && element.type.toLowerCase() == 'text';
        var isSelect = element.nodeName.toLowerCase() == 'select';

        if ((isTextBox || isSelect) && !$(element).parent().hasClass("t-combobox")) {
            if (isSelect && !this.data) {
                this.data = $t.list.retrieveData(element);
            }

            var htmlBuilder = new $t.list.htmlBuilder(element, 't-combobox', isSelect);

            htmlBuilder.text = function (options) {
                var builder = options.builder;
                builder.buffer = [];
                return $(builder
                        .cat('<input class="t-input" autocomplete="off" type="text" ')
                        .catIf('value="', options.text, '" ', options.text)
                        .catIf('name="', options.name, '-input" ', options.name)
                        .cat('/>')
                        .string());
            }

            htmlBuilder.render();

            if (isSelect) {
                element = element.previousSibling; //set element to input
            }
        }

        this.element = element;

        var that = this;
        var $element = this.$element = $(element).closest("form")
                                            .bind("reset", function () {
                                                setTimeout(function () {
                                                    that.value(element.value);
                                                });
                                            })
                                            .end();

        this.loader = new $t.list.loader(this);
        this.trigger = new $t.list.trigger(this);
        var $wrapper = this.$wrapper = $element.closest('.t-combobox');
        var $selectIcon = this.$wrapper.find('.t-select');

        var $text = this.$text = this.$wrapper.find('> .t-dropdown-wrap > .t-input')
                                     .attr('autocomplete', 'off')
                                     .bind("paste", $.proxy(function (e) {
                                         setTimeout($.proxy(function () {
                                             this.$element.val(e.target.value);
                                             resetTimer(this);
                                         }, this), 0);
                                     }, this));

        var updateCssOnPropertyChange = function (e) {
            var attr = "class",
                classValue = $element.attr(attr) || "";

            if ((e.attrName && e.attrName == attr) || (e.propertyName && e.propertyName == "className")) {
                if (classValue != $text.attr(attr)) {
                    $text.attr(attr, classValue).addClass('t-input');
                }
            }
        }

        if ($.browser.msie) {
            element.attachEvent("onpropertychange", updateCssOnPropertyChange);

        } else {
            $element.bind("DOMAttrModified", updateCssOnPropertyChange);
        }

        $element.closest("form").bind("reset", $.proxy(function (e) {
            var that = this;
            window.setTimeout(function () {
                if ($element.val() != "") {
                    that.value($element.val());
                } else {
                    that.highlight(0);
                    that.selectedIndex = 0;
                }
            }, 1);
        }, this));

        this.filtering = new $t.list.filtering(this);
        this.filtering.autoFill = function (component, itemText) {
            if (component.autoFill && (component.lastKeyCode != 8 && component.lastKeyCode != 46)) {

                var input = component.$text[0];

                var endIndex = $t.caretPos(input);

                var filterString = input.value.substring(0, endIndex);

                var matchIndex = itemText.toLowerCase().indexOf(filterString.toLowerCase());

                if (matchIndex != -1) {

                    var stringToAppend = itemText.substring(matchIndex + filterString.length);

                    input.value = filterString + stringToAppend;

                    $t.list.selection(input, endIndex, endIndex + stringToAppend.length);
                }
            }
        }

        this.dropDown = new $t.dropDown({
            attr: this.dropDownAttr,
            effects: this.effects,
            onOpen: $.proxy(function () {
                var data = this.data;
                var dropDown = this.dropDown;
                if (data.length == 0) return;

                var text = this.$text.val();
                var selectedIndex = this.selectedIndex;

                if (selectedIndex != -1 && this.isFiltered) {
                    if (text == data[selectedIndex].Text) {
                        this.filteredDataIndexes = [];
                        dropDown.onItemCreate = null;
                        if (this.filter) {
                            dropDown.dataBind(this.data, this.encoded);
                        }
                        this.select(dropDown.$items[selectedIndex]);
                    } else
                        this.filters[this.filter](this, this.data, text);

                    this.isFiltered = false;
                }
            }, this),
            onClick: $.proxy(function (e) {
                this.select(e.item);
                this.trigger.change();
                this.trigger.close();
                $text.focus();
            }, this)
        });

        this.dropDown.$element.css('direction', $wrapper.closest('.t-rtl').length ? 'rtl' : '');

        this.enable = function () {
            $wrapper.removeClass('t-state-disabled');
            $text.removeAttr("disabled");
            $element.removeAttr("disabled");
            if (!$selectIcon.data("events")) {
                $selectIcon.bind('click', $.proxy(togglePopup, this));
            }
        }

        this.disable = function () {
            $wrapper.addClass('t-state-disabled')
            $text.attr('disabled', 'disabled');
            $element.attr('disabled', 'disabled');
            $selectIcon.unbind('click');
        }

        this[this.enabled ? 'enable' : 'disable']();

        this.fill = function (callback, options, ignoreInputValue) {
            function updateSelection(component) {
                var value = component.selectedValue || component.value();

                if (value) {
                    component.value(value);
                    return;
                }

                var $items = dropDown.$items;
                var selectedIndex = component.index;
                var $selectedItems = $items.filter('.t-state-selected')
                var selectedItemsLength = $selectedItems.length;

                var item = selectedIndex != -1 && selectedIndex < $items.length
                    ? $items[selectedIndex]
                    : selectedItemsLength > 0
                    ? $selectedItems[selectedItemsLength - 1]
                    : null;

                if (item)
                    component.select(item);
                else {
                    component.selectedIndex = -1;
                    if (component.highlightFirst)
                        component.highlight($items[0]);
                }

                component._oldIndex = component.selectedIndex;
            }

            var loader = this.loader;
            var dropDown = this.dropDown;
            var minChars = this.minChars;
            var textValue = this.text();
            var textValueLength = textValue.length;

            if (!dropDown.$items && !loader.ajaxError) {
                if ((loader.isAjax() || this.onDataBinding) && textValueLength >= minChars) {
                    options = options || {};
                    var postData = $.extend({}, options);
                    if (ignoreInputValue) {
                        textValue = "";
                    }
                    postData[this.queryString.text] = textValue;

                    loader.ajaxRequest(function (data) {
                        this.dataBind(data, true);
                        updateSelection(this);

                        $t.trigger(this.element, 'dataBound');
                        this.trigger.change();

                        if (callback) callback();
                    },
                    { data: postData });
                }
                else {
                    this.dataBind(this.data, true);
                    updateSelection(this);
                    if (callback) callback();
                }
            }
        }

        this.reload = function () {
            this.dropDown.$items = null;
            if (arguments.length) {
                this.fill(arguments[0], arguments[1]);
            } else {
                this.fill();
            }
        }

        this.select = function (item) {
            var index = this.highlight(item);

            if (index != -1) {
                var filteredDataIndexes = this.filteredDataIndexes;

                //set selected Index
                this.selectedIndex = (filteredDataIndexes && filteredDataIndexes.length) > 0 ? filteredDataIndexes[index] : index;

                var dataItem = this.data[this.selectedIndex];

                $t.list.updateTextAndValue(this, dataItem.Text, dataItem.Value);
            }

            return index;
        }

        this.text = function () {
            return this.$text.val.apply(this.$text, arguments);
        }

        this.value = function () {
            if (arguments.length) {
                var value = arguments[0];
                var index = this.select(function (dataItem) {
                    return value == (dataItem.Value || dataItem.Text);
                });

                if (index == -1) {
                    this.selectedIndex = index;
                    this.$element.val(value);
                    this.text(value);
                }
                this.previousValue = this.$element.val(); //prevent change event
                this._oldIndex = this.selectedIndex;

            } else {
                return this.$element.val();
            }
        }

        $t.list.common.call(this);
        $t.list.filters.call(this);
        $t.list.initialize.call(this);

        $(document.documentElement).bind('mousedown', $.proxy(function (e) {
            var $dropDown = this.dropDown.$element;
            var isDropDown = $dropDown && $dropDown.parent().length > 0;

            if ($.contains(this.$wrapper[0], e.target)
                || (isDropDown && $.contains($dropDown.parent()[0], e.target)))
                return;

            if (this._textChanged) {
                this._textChanged = false;
                var data = findItemByText(this.data, this.$text.val(), this.ignoreCase);
                if (data) {
                    this.selectedIndex = data.index;
                    this.text(data.dataItem.Text);
                    this.$element.val(data.dataItem.Value || data.dataItem.Text);
                } else {
                    this.selectedIndex = -1;
                    this.$element.val(this.$text.val());
                }
            }

            this.trigger.change();
            this.trigger.close();
        }, this));

        this.$text
            .bind({
                keydown: $.proxy(keydown, this),
                keypress: $.proxy(keypress, this),
                focus: $.proxy(function (e) {
                    if (this.openOnFocus) {
                        var trigger = this.trigger;
                        var dropDown = this.dropDown;
                        if (!dropDown.$items) {
                            this.fill(trigger.open);
                        } else {
                            trigger.open();
                        }
                    }
                    var $text = this.$text;

                    clearTimeout(this.selectTextTimeout);
                    this.selectTextTimeout = window.setTimeout(function () { $t.list.selection($text[0], 0, $text.val().length); }, 130); //depends on the PC :(
                }, this),
                blur: $.proxy(function () {
                    clearTimeout(this.selectTextTimeout);
                }, this)
            });

        function togglePopup(e) {
            var dropDown = this.dropDown,
                trigger = this.trigger;

            this.loader.ajaxError = false;
            if (!dropDown.isOpened()) {
                if (!dropDown.$items) {
                    this.fill(trigger.open, {}, true);
                } else {
                    trigger.open();
                }
                $text[0].focus();
            } else {
                trigger.close();
            }
        }

        //PRIVATE
        function resetTimer(component) {
            clearTimeout(component.timeout);
            component.timeout = setTimeout(function () { component.filtering.filter(component) }, component.delay);
        }

        function keydown(e) {
            var trigger = this.trigger;
            var dropDown = this.dropDown;
            var key = e.keyCode || e.which;
            this.lastKeyCode = key;

            if (e.altKey) {
                if (key == 38 || key == 40) {
                    var action = key == 38 ? trigger.close : trigger.open;
                    if (!dropDown.$items) {
                        this.fill(action); //creates items 
                    } else {
                        action();
                    }
                }
                return;
            }

            if (!e.shiftKey && (key == 38 || key == 40)) {

                e.preventDefault();

                var selectItem = $.proxy(function () {
                    var $items = dropDown.$items,
                        $selectedItem = $items.filter('.t-state-selected:first');

                    var $item = $selectedItem.length == 0 || $items.length == 1 || this.selectedIndex == -1 ? $items.first()
                                 : (key == 38) ? $selectedItem.prev() // up
                                 : (key == 40) ? $selectedItem.next() // down
                                 : [];

                    if ($item.length) {
                        var item = $item[0];

                        this.select(item);
                        dropDown.scrollTo(item);

                        if (!dropDown.isOpened()) {
                            trigger.change();
                        }
                    }
                }, this);

                if (!dropDown.$items) {

                    if (this.index != -1 || this.value() || this.selectedValue) {
                        selectItem = null;
                    }

                    this.fill(selectItem); //creates items 
                    return;
                }

                selectItem();
                return;
            }

            if (key == 8 || key == 46 || (e.ctrlKey && key == 88)) {
                var $text = this.$text;

                if ($text.val() != '') resetTimer(this); //reset and start filtering after delay

                setTimeout($.proxy(function () {
                    if ($text.val() == '') {
                        this.selectedIndex = -1;
                        this.$element.val('');
                    } else {
                        this.$element.val(this.$text.val());
                    }
                }, this), 0);

                return;
            }

            if (key == 13) {
                if (dropDown.isOpened()) {
                    e.preventDefault();

                    var $selectedItems = dropDown.$items.filter('.t-state-selected:first');

                    if ($selectedItems.length > 0)
                        this.select($selectedItems[0]);
                    else
                        this.$element.val(this.$text.val());

                    trigger.change();
                    trigger.close();
                    $t.list.moveToEnd(this.$text[0]);
                }
                return;
            }

            if (key == 27 || key == 9) {
                clearTimeout(this.timeout);
                var data;

                if (this.selectedIndex !== undefined && this.selectedIndex > -1 && this.data[this.selectedIndex].Text === this.$text.val()) {
                    data = { dataItem: this.data[this.selectedIndex], index: this.selectedIndex };
                } else {
                    data = findItemByText(this.data, this.$text.val(), this.ignoreCase);
                }

                if (data) {
                    this.selectedIndex = data.index;
                    this.text(data.dataItem.Text);
                    this.$element.val(data.dataItem.Value || data.dataItem.Text);
                } else {
                    this.selectedIndex = -1;
                    this.$element.val(this.$text.val());
                }

                trigger.change();
                trigger.close();
                if (key == 27) this.$text.blur();
                return;
            }

            resetTimer(this);
        }

        function keypress(e) {
            this._textChanged = true;
            var key = e.keyCode || e.charCode;

            if (!e.shiftKey && (key == 0 || $.inArray(key, $t.list.keycodes) != -1 || e.ctrlKey)) return true;

            // always set value. Select(item) will override it if needed.
            setTimeout($.proxy(function () { this.$element.val(this.$text.val()); }, this), 0);
        }

        if (that.cascadeTo) {
            var cascadingElement = $("#" + that.cascadeTo).attr("disabled", "disabled");

            cascadingElement.bind("load", function () {
                if (that.selectedValue || that.value()) { //that.value()) {
                    that.$element.trigger("valueChange");
                }
            })

            that.$element.bind("valueChange", $.proxy(function () {
                var combobox = cascadingElement.data("tComboBox");
                if (combobox) {
                    var tempData = [],
                        data = {};

                    data[that.$element.attr("name")] = that.value();

                    if (combobox.loader.isAjax()) {
                        if (that.placeholder) {
                            tempData[0] = {
                                Text: that.placeholder,
                                Value: ""
                            };
                        }
                        combobox.dataBind(tempData);
                    }

                    combobox.select(0);
                    combobox.disable();
                    if ((that.selectedValue || that.value()) === "" && that.placeholder) {
                        combobox.$element.trigger("valueChange");
                        return;
                    }

                    combobox.reload(function () {
                        var idx = tempData[0] ? 1 : 0;
                        if (combobox.data[idx]) {
                            combobox.enable();
                        } else {
                            combobox.value("");
                        }
                    }, data);
                }
            }, that));
        }
    }

    function findItemByText(data, inputText, ignoreCase) {
        if (!inputText) {
            return;
        }

        if (data) {
            //find if text has exact match with one of data items.
            for (var i = 0, len = data.length; i < len; i++) {
                var dataItem = data[i],
                    text = dataItem.Text;

                if (ignoreCase) {
                    text = text.toLowerCase();
                    inputText = inputText.toLowerCase();
                }

                if (text == inputText) {
                    return { dataItem: dataItem, index: i };
                }
            }
        }
    }

    $.fn.tComboBox = function (options) {
        return $t.create(this, {
            name: 'tComboBox',
            init: function (element, options) {
                return new $t.combobox(element, options)
            },
            options: options
        });
    };

    // default options
    $.fn.tComboBox.defaults = {
        ignoreCase: true,
        encoded: true,
        openOnFocus: false,
        effects: $t.fx.slide.defaults(),
        index: -1,
        autoFill: true,
        highlightFirst: true,
        filter: 0,
        delay: 200,
        minChars: 0,
        cache: true,
        queryString: {
            text: 'text'
        }
    };
})(jQuery);
