(function ($) {

    var $t = $.telerik;
    var whiteSpaceRegExp = /\s+/;

    $t.scripts.push("telerik.list.js");

    $t.list = {
        htmlBuilder: function (element, className, isSelect) {
            var val,
                text,
                id = element.id,
                name = element.name,
                builder = new $t.stringBuilder(),
                $element = $(element);

            if (isSelect) {
                text = $element.find('option:selected').text();
                val = $element.val();
            } else {
                text = element.value;
            }

            function wrapper() {
                return $(['<div class="t-widget', className, 't-header"></div>'].join(" "));
            }

            this.render = function () {
                $element.wrap(wrapper()).hide();
                var $innerWrapper = $('<div class="t-dropdown-wrap t-state-default"></div>').insertBefore($element);

                this.text({
                    builder: builder,
                    text: text,
                    id: id,
                    name: name
                })
                .appendTo($innerWrapper);

                //button
                $('<span class="t-select"><span class="t-icon t-arrow-down">select</span></span>')
                .appendTo($innerWrapper);

                if (isSelect) {
                    builder.buffer = [];
                    $(builder
                        .cat('<input style="display:none;" type="text" ')
                        .catIf('value="', val, '" ', val)
                        .catIf('name="', name, '" ', name)
                        .cat('/>')
                        .string())
                    .insertAfter($innerWrapper);
                }
            }

            this.text = function (options) {
                return $(['<span class="t-input">', options.text || '&nbsp;', '</span>'].join(""));
            }
        },

        initialize: function () {
            this.previousValue = this.value();

            $t.bind(this, {
                dataBinding: this.onDataBinding,
                dataBound: this.onDataBound,
                error: this.onError,
                open: this.onOpen,
                close: this.onClose,
                valueChange: this.onChange,
                load: this.onLoad
            });
        },

        common: function () {
            this.open = function () {
                if (!this.loader.isAjax() && (!this.data || this.data.length == 0)) {
                    return;
                }

                var $wrapper = this.$wrapper || this.$element,
                    dropDown = this.dropDown,
                    dropDownZ = dropDown.$element.css('z-index');

                var position = {
                    offset: $wrapper.offset(),
                    outerHeight: $wrapper.outerHeight(),
                    outerWidth: $wrapper.outerWidth(),
                    zIndex: dropDownZ && dropDownZ != 'auto' ? dropDownZ : $t.getElementZIndex($wrapper[0])
                }

                if (dropDown.$items) {
                    dropDown.open(position);
                } else {
                    this.fill(function () { dropDown.open(position); });
                }
            }

            this.close = function () {
                this.dropDown.close();
            }

            this.dataBind = function (data, preserveStatus) {
                this.data = data = (data || []);

                var index = -1,
                    length = data.length,
                    placeholder = this.placeholder;

                if (placeholder && data[0] && data[0].Text !== placeholder) {
                    var first = [{
                        Text: placeholder,
                        Value: ""
                    }];

                    for (var idx = 0; idx < length; idx++) {
                        first.push(data[idx]);
                    }
                    this.data = data = first;
                }

                for (var i = 0; i < length; i++) {
                    var item = data[i];
                    if (item) {
                        if (item.Selected) {
                            index = i;
                        }
                    }
                }

                this.dropDown.dataBind(data, this.encoded);

                if (index != -1) {
                    this.index = index;
                    this.select(index);
                }

                if (!preserveStatus) {
                    this.text('');
                    this.$element.val('');
                    if (this.filteredDataIndexes) {
                        this.filteredDataIndexes = null;
                    }
                }
            }

            this.highlight = function (argument) {

                var rebind = function (component) {
                    var dropDown = component.dropDown;

                    component.close();
                    if (!dropDown.$items) {
                        dropDown.dataBind(component.data, component.encoded);
                    }

                    dropDown.$items
                            .removeClass('t-state-selected')
                            .eq(index)
                            .addClass('t-state-selected');
                }

                var index = -1;

                if (!this.data) return index;

                if (!isNaN(argument - 0)) { // index
                    if (argument > -1 && argument < this.data.length) {

                        index = argument;

                        rebind(this);
                    }

                } else if ($.isFunction(argument)) { // predicate

                    for (var i = 0, len = this.data.length; i < len; i++) {
                        if (argument(this.data[i])) {
                            index = i;
                            break;
                        }
                    }

                    if (index != -1)
                        rebind(this);

                } else { // dom node
                    index = this.dropDown.highlight(argument);
                }

                return index;
            }
        },

        filtering: function () {
            this.filter = function (component) {
                component.isFiltered = true;

                var performAjax = true,
                    data = component.data,
                    input = component.$text[0],
                    text = input.value,
                    trigger = component.trigger,
                    dropDown = component.dropDown,
                    shouldFilter = true;

                if (component.minChars == 0 && text.length == 0) {
                    shouldFilter = false;
                }

                text = this.multiple(text);

                if (component.minChars > 0 && text.length < component.minChars) return;

                var filterIndex = component.filter;
                if (component.loader.isAjax()) {

                    if (shouldFilter && component.cache && data && data.length > 0) {

                        component.filters[filterIndex](component, data, text);

                        var filteredDataIndexes = component.filteredDataIndexes;

                        if ((filteredDataIndexes && filteredDataIndexes.length > 0)
                        || (filterIndex == 0 && component.selectedIndex != -1))
                            performAjax = false;
                    }

                    if (performAjax) {

                        var postData = {};
                        postData[component.queryString.text] = text;

                        component.loader.ajaxRequest(function (data) {
                            var trigger = component.trigger;
                            var dropDown = component.dropDown;

                            if (data && data.length == 0) {
                                dropDown.close();
                                dropDown.dataBind();
                                return;
                            }

                            component.data = data;

                            $t.trigger(component.element, 'dataBound');

                            component.filters[filterIndex](component, data, text);

                            var $items = dropDown.$items;
                            if ($items.length > 0) {
                                if (!dropDown.isOpened()) trigger.open();
                                component.filtering.autoFill(component, $items.first().text());
                            }
                            else trigger.close();

                        }, { data: postData });
                    }
                } else {
                    performAjax = false;
                    component.filters[filterIndex](component, component.data, text);
                }

                if (!performAjax) {
                    var $items = dropDown.$items;
                    if (!$items) {
                        return;
                    }

                    var itemsLength = $items.length,
                        selectedIndex = component.selectedIndex;

                    var itemText = filterIndex == 0
                    ? selectedIndex != -1
                    ? $items[selectedIndex].innerText || $items[selectedIndex].textContent
                    : ''
                    : $items.length > 0
                    ? $items.first().text()
                    : '';

                    this.autoFill(component, itemText);

                    if (itemsLength == 0) {
                        trigger.close();
                    } else {
                        if (!dropDown.isOpened()) {
                            trigger.open();
                        }
                    }
                }
            }

            this.multiple = function (text) { return text; } // overriden by autocomplete
        },

        filters: function () { //mixin
            this.filters = [
                function firstMatch(component, data, inputText) {
                    if (!data || data.length == 0) return;
                    var dropDown = component.dropDown;
                    var $items = dropDown.$items;

                    if (!$items || $items.length == 0 || component.loader.isAjax()) {
                        dropDown.dataBind(data, component.encoded);
                        $items = dropDown.$items;
                    }

                    for (var i = 0, length = data.length; i < length; i++) {
                        if (data[i].Text.slice(0, inputText.length).toLowerCase() == inputText.toLowerCase()) {
                            var item = $items[i];

                            component.selectedIndex = i;
                            dropDown.highlight(item);
                            dropDown.scrollTo(item);
                            return;
                        }
                    }

                    $items.removeClass('t-state-selected');
                    component.selectedIndex = -1;

                    $t.list.highlightFirstOnFilter(component, $items);
                },

                createItemsFilter(false, function (inputText, itemText) {
                    return itemText.slice(0, inputText.length).toLowerCase() == inputText.toLowerCase();
                }),

                createItemsFilter(true, function (inputText, itemText) {
                    return itemText && itemText.toLowerCase().indexOf(inputText.toLowerCase()) != -1
                })
            ]
        },

        loader: function (component) {
            this.ajaxError = false;
            this.component = component;

            this.isAjax = function () {
                return component.ajax || component.ws || component.onDataBinding;
            }

            function ajaxOptions(complete, options) {
                var result = {
                    url: (component.ajax || component.ws)['selectUrl'],
                    type: 'POST',
                    data: {},
                    dataType: 'text', // using 'text' instead of 'json' because of DateTime serialization
                    error: function (xhr, status) {
                        component.loader.ajaxError = true;
                        if ($t.ajaxError(component.element, 'error', xhr, status))
                            return;
                    },
                    complete: $.proxy(function () { this.hideBusy(); }, component.loader),

                    success: function (data, status, xhr) {
                        try {
                            data = eval('(' + data + ')');
                        } catch (e) {
                            // in case the result is not JSON raise the 'error' event
                            if (!$t.ajaxError(component.element, 'error', xhr, 'parseeror'))
                                alert('Error! The requested URL did not return JSON.');
                            component.loader.ajaxError = true;
                            return;
                        }
                        data = data.d || data; // Support the `d` returned by MS Web Services 

                        if (complete)
                            complete.call(component, data);

                    }
                }

                $.extend(result, options);

                if (component.ws) {
                    result.data = $t.toJson(result.data);
                    result.contentType = 'application/json; charset=utf-8';
                }

                return result;
            }

            this.ajaxRequest = function (complete, options) {
                var e = {};

                if ($t.trigger(component.element, 'dataBinding', e))
                    return;

                if (component.ajax || component.ws) {
                    this.showBusy();
                    $.ajax(ajaxOptions(complete, { data: $.extend({}, options ? options.data : {}, e.data) }));
                }
                else
                    if (complete) complete.call(component, component.data);
            },

            this.showBusy = function () {
                this.busyTimeout = setTimeout($.proxy(function () {
                    this.component.$wrapper.find('> .t-dropdown-wrap .t-icon').addClass('t-loading');
                }, this), 100);
            },

            this.hideBusy = function () {
                clearTimeout(this.busyTimeout);
                this.component.$wrapper.find('> .t-dropdown-wrap .t-icon').removeClass('t-loading');
            }
        },

        trigger: function (component) {
            this.component = component;
            this.change = function () {
                var previousValue = component.previousValue;
                var value = component.value();
                if (previousValue == undefined || value != previousValue) {
                    $t.trigger(component.element, 'valueChange', { value: value });
                    component._oldIndex = component.selectedIndex;
                } else if (component.selectedIndex !== component._oldIndex) {
                    $t.trigger(component.element, 'valueChange', { value: value });
                    component._oldIndex = component.selectedIndex;
                }

                component.previousValue = component.value();
            }

            this.open = function () {
                var dropDown = component.dropDown;
                if ((dropDown.$items && dropDown.$items.length > 0) && !dropDown.isOpened() && !$t.trigger(component.element, 'open')) {
                    component.open();
                }
            }

            this.close = function () {
                var dropDown = component.dropDown;
                if ((dropDown.$element.is(':animated') || dropDown.isOpened()) && !$t.trigger(component.element, 'close')) {
                    component.close();
                }
            }
        },

        retrieveData: function (select) {
            var items = [];
            var $options = $(select).find('option');

            for (var i = 0, length = $options.length; i < length; i++) {
                var $option = $options.eq(i);
                items[i] = {
                    Text: $option.text(),
                    Value: $option.val(),
                    Selected: $option.is(':selected')
                }
            }
            return items;
        },

        highlightFirstOnFilter: function (component, $items) {
            if (component.highlightFirst) {
                $items.first().addClass('t-state-selected');
                component.dropDown.scrollTo($items[0]);
            }
        },

        moveToEnd: function (element) {
            if (element.createTextRange) {
                var range = element.createTextRange();
                range.moveStart('textedit', 1);
                range.select();
            }
        },

        selection: function (input, start, end) {
            if (input.createTextRange) {
                var selRange = input.createTextRange();
                selRange.collapse(true);
                selRange.moveStart('character', start);
                selRange.moveEnd('character', end - start);
                selRange.select();
            } else if (input.selectionStart) {
                input.selectionStart = start;
                input.selectionEnd = end;
            }
        },

        updateTextAndValue: function (component, text, value) {
            component.text(text);

            var val = value === null ? text : value;
            component.$element.val(val);
        },

        getZIndex: function (element) {
            var zIndex = 'auto';
            $(element).parents().andSelf().each(function () { //get element 
                zIndex = $(this).css('zIndex');
                if (Number(zIndex)) {
                    zIndex = Number(zIndex) + 1;
                    return false;
                }
            });
            return zIndex;
        },

        keycodes: [8, // backspace
                   9, // tab
                  13, // enter
                  27, // escape
                  37, // left arrow
                  38, // up arrow
                  39, // right arrow
                  40, // down arrow
                  35, // end
                  36] // home
    }

    function createItemsFilter(global, condition) {
        return function (component, data, inputText) {
            if (!data || data.length == 0) return;

            var filteredDataIndexes = $.map(data, function (item, index) {
                var text = item.Text;
                if (condition(inputText, text !== undefined ? text : item)) {
                    return index;
                }
            });

            var formatRegExp = new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + inputText.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi, "\\$1") + ")(?![^<>]*>)(?![^&;]+;)", global ? 'ig' : 'i');

            component.filteredDataIndexes = filteredDataIndexes;
            component.selectedIndex = -1;

            component.dropDown.onItemCreate = function (e) { if (inputText) e.html = e.html.replace(formatRegExp, "<strong>$1</strong>"); }
            component.dropDown.dataBind($.map(filteredDataIndexes, function (item, index) {
                return data[item];
            }), component.encoded);

            var $items = component.dropDown.$items;
            $items.removeClass('t-state-selected');
            $t.list.highlightFirstOnFilter(component, $items);
        };
    }

    function firstMatch(data, $items, text) {
        if (!data || !$items) return null;

        var valueLength = text.length;
        text = text.toLowerCase();

        for (var i = 0, length = data.length; i < length; i++) {
            if (data[i].Text.slice(0, valueLength).toLowerCase() == text)
                return $items[i];
        }
    }

    $t.dropDownList = function (element, options) {
        if (options && options.enabled === undefined) {
            options.enabled = !$(element).is("[disabled]");
        }

        $.extend(this, options);

        var isSelect = element.nodeName.toLowerCase() == 'select';
        if (isSelect && !this.data) {
            this.data = $t.list.retrieveData(element);
            new $t.list.htmlBuilder(element, 't-dropdown', isSelect).render();
            element = element.previousSibling; //set element to input
        }

        var cachedInput = '';
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
        this.$wrapper = $element.closest('.t-dropdown');
        var $text = this.$text = this.$wrapper.find('> .t-dropdown-wrap > .t-input');

        //allow element to be focused
        if (!this.$wrapper.attr('tabIndex')) this.$wrapper.attr('tabIndex', 0);

        this.dropDown = new $t.dropDown({
            attr: this.dropDownAttr,
            effects: this.effects,
            onClick: $.proxy(function (e) {
                this.select(e.item);
                this.trigger.change();
                this.trigger.close();
                this.$wrapper.focus();
            }, this)
        });

        this.dropDown.$element.css('direction', this.$wrapper.closest('.t-rtl').length ? 'rtl' : '');

        var updateCssOnPropertyChange = function (e) {
            var attr = 'class',
                classValue = $element.attr(attr);

            if ((e.attrName && e.attrName == "class") || (e.propertyName && e.propertyName == "className")) {

                var innerWrap = $element.prev(".t-dropdown-wrap");

                var stateClass = /\b(t-state-[\w]+)\b/.exec(innerWrap.attr(attr));
                if (!(stateClass && stateClass[0])) {
                    stateClass = "";
                } else {
                    stateClass = stateClass[0];
                }

                if (classValue != innerWrap.attr(attr)) {
                    innerWrap.attr(attr, classValue).addClass('t-dropdown-wrap ' + stateClass);
                }
            }
        }

        if ($.browser.msie) {
            element.attachEvent("onpropertychange", updateCssOnPropertyChange);

        } else {
            $element.bind("DOMAttrModified", updateCssOnPropertyChange);
        }

        this.fill = function (callback, options) {
            function updateSelectedItem(component) {
                var selector,
                    value = component.selectedValue || component.value();

                if (value) {
                    selector = function (dataItem) { return value == (dataItem.Value || dataItem.Text); };
                } else {
                    var $items = component.dropDown.$items,
                        selectedIndex = component.index,
                        selectedItemsLength = $items.filter('.t-state-selected').length;

                    selector = selectedIndex != -1 && selectedIndex < $items.length
                            ? selectedIndex
                            : selectedItemsLength > 0
                            ? selectedItemsLength - 1
                            : 0;
                }

                component.select(selector);
                component._oldIndex = component.selectedIndex;
            }

            var dropDown = this.dropDown,
                loader = this.loader;

            if (!dropDown.$items && !loader.ajaxError) {
                if (loader.isAjax()) {
                    options = options || {};
                    loader.ajaxRequest(function (data) {
                        this.dataBind(data, true);
                        updateSelectedItem(this);

                        $t.trigger(this.element, 'dataBound');
                        this.trigger.change();

                        if (callback) callback();
                    }, options);
                }
                else {
                    this.dataBind(this.data);
                    updateSelectedItem(this);

                    if (callback) callback();
                }
            }
        }

        this.enable = function () {
            var wrapper = this.$wrapper.removeClass('t-state-disabled');

            if (!wrapper.data("events")) {
                this.$wrapper
                    .removeClass('t-state-disabled')
                    .bind({
                        keydown: $.proxy(keydown, this),
                        keypress: $.proxy(keypress, this),
                        click: $.proxy(function (e) {
                            var trigger = this.trigger;
                            var dropDown = this.dropDown;

                            this.$wrapper.focus();

                            if (dropDown.isOpened())
                                trigger.close();
                            else if (!dropDown.$items)
                                this.fill(trigger.open);
                            else
                                trigger.open();
                        }, this),
                        focus: $.proxy(function () {
                            this.$wrapper.find(".t-dropdown-wrap").addClass("t-state-focused").removeClass("t-state-default");
                        }, this),
                        blur: $.proxy(function () {
                            this.$wrapper.find(".t-dropdown-wrap").addClass("t-state-default").removeClass("t-state-focused");
                        }, this)
                    });
            }

            $element.removeAttr("disabled");
        }

        this.disable = function () {
            $element.attr("disabled", "disabled");
            this.$wrapper
                .addClass('t-state-disabled')
                .unbind();
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
                this.selectedIndex = index;

                $t.list.updateTextAndValue(this, this.data[index].Text, this.data[index].Value);
            }

            return index;
        }

        this.text = function (text) {
            if (text !== undefined) {
                if (this.encoded) {
                    text = $t.encode(text);
                }
                this.$text.html(text && text.replace(whiteSpaceRegExp, '') ? text : '&nbsp;');
            } else {
                return this.$text.html();
            }
        }

        this.value = function (value) {
            if (value !== undefined) {
                var index = this.select(function (dataItem) {
                    return value == dataItem.Value;
                });

                if (index == -1) {
                    index = this.select(function (dataItem) {
                        return value == dataItem.Text;
                    });
                }

                if (index != -1) {
                    this.previousValue = this.$element.val(); //prevent change event
                }

            } else {
                return this.$element.val();
            }
        }

        $t.list.common.call(this);
        $t.list.initialize.call(this);

        $(document.documentElement).bind('mousedown', $.proxy(function (e) {
            var $dropDown = this.dropDown.$element;
            var isDropDown = $dropDown && $dropDown.parent().length > 0;

            if ($.contains(this.$wrapper[0], e.target)
                || (isDropDown && $.contains($dropDown.parent()[0], e.target)))
                return;

            this.trigger.change();
            this.trigger.close();
        }, this));

        this[this.enabled ? 'enable' : 'disable']();

        // PRIVATE methods
        function resetTimer() {
            clearTimeout(this.timeout);
            this.timeout = setTimeout($.proxy(function () { cachedInput = '' }, this), this.delay);
        }

        function keydown(e) {
            var trigger = this.trigger;
            var dropDown = this.dropDown;
            var key = e.keyCode || e.which;

            if (e.altKey && (key == 38 || key == 40)) {
                var action = key == 38 ? trigger.close : trigger.open;
                if (!dropDown.$items) {
                    this.fill(action); //creates items 
                } else {
                    action();
                }

                return;
            }

            if (key > 34 && key < 41) {

                e.preventDefault();

                if (!dropDown.$items) {
                    this.fill();
                    return;
                }

                var $items = dropDown.$items,
                    $selectedItem = $($items[this.selectedIndex]);

                var $item = (key == 35) ? $items.last() // end
                         : (key == 36) ? $items.first() // home
                         : (key == 37 || key == 38) ? $selectedItem.prev() // up
                         : (key == 39 || key == 40) ? $selectedItem.next() // down
                         : [];

                if ($item.length) {
                    var item = $item[0];

                    this.select(item);
                    dropDown.scrollTo(item);

                    if (!dropDown.isOpened())
                        trigger.change();
                }
            }

            if (key == 8) {
                $.proxy(resetTimer, this)();
                e.preventDefault();
                cachedInput = cachedInput.slice(0, -1);
            }

            if (key == 9 || key == 13 || key == 27) {
                trigger.change();
                trigger.close();
            }
        }

        function keypress(e) {
            var dropDown = this.dropDown;
            var key = e.keyCode || e.charCode;

            if (key == 0 || $.inArray(key, $t.list.keycodes) != -1 || e.ctrlKey || e.altKey || e.shiftKey) return;

            if (!dropDown.$items) {
                this.fill($.proxy(function () {
                    _filter(key);
                }, this));
                return;
            }

            _filter(key);
        }

        var _filter = $.proxy(function _filter(key) {
            var dropDown = this.dropDown;
            var tempInputValue = cachedInput;
            tempInputValue += String.fromCharCode(key);

            if (tempInputValue) {

                var item = firstMatch(this.data, dropDown.$items, tempInputValue);

                if (item) {
                    this.select(item);
                    dropDown.scrollTo(item);
                }

                cachedInput = tempInputValue;
            }

            $.proxy(resetTimer, this)();
        }, this);

        if (that.cascadeTo) {
            var cascadingElement = $("#" + that.cascadeTo).attr("disabled", "disabled");

            cascadingElement.bind("load", function () {
                if (that.value()) {
                    that.$element.trigger("valueChange");
                }
            })

            that.$element.bind("valueChange", $.proxy(function () {
                var ddl = cascadingElement.data("tDropDownList");
                if (ddl) {
                    var tempData = [],
                        data = {};

                    data[that.$element.attr("name")] = that.value();

                    if (ddl.loader.isAjax()) {
                        if (that.placeholder) {
                            tempData[0] = {
                                Text: that.placeholder,
                                Value: ""
                            };
                        }
                        ddl.dataBind(tempData);
                    }

                    ddl.select(0);
                    ddl.disable();
                    if (that.value() === "" && that.placeholder) {
                        ddl.$element.trigger("valueChange");
                        return;
                    }

                    ddl.reload(function () {
                        var idx = tempData[0] ? 1 : 0;
                        if (ddl.data[idx]) {
                            ddl.enable();
                        }
                    }, { data: data });
                }
            }, that));
        }
    }

    $.fn.tDropDownList = function (options) {
        return $t.create(this, {
            name: 'tDropDownList',
            init: function (element, options) {
                return new $t.dropDownList(element, options)
            },
            options: options
        });
    };

    // default options
    $.fn.tDropDownList.defaults = {
        effects: $t.fx.slide.defaults(),
        accessible: false,
        index: 0,
        delay: 500,
        encoded: true
    };

})(jQuery);
