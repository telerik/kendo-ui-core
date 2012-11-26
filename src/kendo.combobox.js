(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        List = ui.List,
        Select = ui.Select,
        support = kendo.support,
        placeholderSupported = support.placeholder,
        removeFiltersForField = Select.removeFiltersForField,
        keys = kendo.keys,
        ns = ".kendoComboBox",
        CLICK = "touchend" + ns + " click" + ns,
        ATTRIBUTE = "disabled",
        CHANGE = "change",
        DEFAULT = "k-state-default",
        DISABLED = "k-state-disabled",
        FOCUSED = "k-state-focused",
        MOUSEDOWN = "mousedown" + ns + " touchstart" + ns,
        SELECT = "select",
        ARIA_DISABLED = "aria-disabled",
        STATE_SELECTED = "k-state-selected",
        STATE_FILTER = "filter",
        STATE_ACCEPT = "accept",
        STATE_REBIND = "rebind",
        HOVEREVENTS = "mouseenter" + ns + " mouseleave" + ns,
        NULL = null,
        proxy = $.proxy;

    var ComboBox = Select.extend({
        init: function(element, options) {
            var that = this, wrapper, text;

            that.ns = ns;

            options = $.isArray(options) ? { dataSource: options } : options;

            Select.fn.init.call(that, element, options);

            that._focusHandler = function() {
                that.input.focus();
            };

            options = that.options;
            element = that.element.on("focus" + ns, that._focusHandler);

            options.placeholder = options.placeholder || element.attr("placeholder");

            that._reset();

            that._wrapper();

            that._input();

            that._popup();

            that._accessors();

            that._dataSource();

            that._enable();

            that._cascade();

            wrapper = that._inputWrapper;

            that.input
                .on("keydown" + ns, proxy(that._keydown, that))
                .on("focus" + ns, function() {
                    wrapper.addClass(FOCUSED);
                    that._placeholder(false);
                })
                .on("blur" + ns, function() {
                    wrapper.removeClass(FOCUSED);
                    clearTimeout(that._typing);

                    if (that.options.text !== that.input.val()) {
                        that.text(that.text());
                    }

                    that._placeholder();
                    that._blur();

                    element.blur();
                })
                .attr({
                    "role": "combobox",
                    "aria-expanded": false
                });

            that._aria();

            that._oldIndex = that.selectedIndex = -1;
            that._old = that.value();

            if (options.autoBind) {
                that._filterSource();
            } else {
                text = options.text;

                if (!text && element.is(SELECT)) {
                    text = element.children(":selected").text();
                }

                if (text) {
                    that.input.val(text);
                }
            }

            if (!text) {
                that._placeholder();
            }

            kendo.notify(that);
        },

        options: {
            name: "ComboBox",
            enable: true,
            index: -1,
            autoBind: true,
            delay: 200,
            dataTextField: "",
            dataValueField: "",
            minLength: 0,
            height: 200,
            highlightFirst: true,
            template: "",
            filter: "none",
            placeholder: "",
            suggest: false,
            ignoreCase: true,
            animation: {}
        },

        events:[
            "open",

            "close",

            CHANGE,
            "select",
            "dataBinding",
            "dataBound"
        ],

        setOptions: function(options) {
            Select.fn.setOptions.call(this, options);

            this._template();
            this._accessors();
            this._aria();
        },

        current: function(li) {
            var that = this,
                current = that._current;

            if (li === undefined) {
                return current;
            }

            if (current) {
                current.removeClass(STATE_SELECTED);
            }

            Select.fn.current.call(that, li);
        },

        destroy: function() {
            var that = this;

            that.input.off(ns);
            that.element.off(ns);
            that._inputWrapper.off(ns);

            Select.fn.destroy.call(that);
        },

        enable: function(enable) {
            var that = this,
                input = that.input.add(that.element),
                wrapper = that._inputWrapper.off(HOVEREVENTS),
                arrow = that._arrow.parent().off(CLICK + " " + MOUSEDOWN);

            if (enable === false) {
                wrapper
                    .removeClass(DEFAULT)
                    .addClass(DISABLED);

                input.attr(ATTRIBUTE, ATTRIBUTE)
                     .attr(ARIA_DISABLED, true);
            } else {
                wrapper
                    .removeClass(DISABLED)
                    .addClass(DEFAULT)
                    .on(HOVEREVENTS, that._toggleHover);

                input.removeAttr(ATTRIBUTE)
                     .attr(ARIA_DISABLED, false);

                arrow.on(CLICK, function() { that.toggle(); })
                     .on(MOUSEDOWN, function(e) { e.preventDefault(); });
            }
        },

        open: function() {
            var that = this,
                serverFiltering = that.dataSource.options.serverFiltering;

            if (that.popup.visible()) {
                return;
            }

            if (!that.ul[0].firstChild || (that._state === STATE_ACCEPT && !serverFiltering)) {
                that._open = true;
                that._state = STATE_REBIND;
                that._filterSource();
            } else {
                that.popup.open();
                that._scroll(that._current);
            }
        },

        refresh: function() {
            var that = this,
                ul = that.ul[0],
                options = that.options,
                state = that._state,
                data = that._data(),
                length = data.length,
                value, open, custom;

            that.trigger("dataBinding");

            ul.innerHTML = kendo.render(that.template, data);
            that._height(length);

            if (that.popup.visible()) {
                that.popup._position();
            }

            if (that.element.is(SELECT)) {
                if (state === STATE_REBIND) {
                    value = that.value();
                    that._state = "";
                }

                custom = that._option;
                that._option = undefined;
                that._options(data);

                if (custom && custom[0].selected) {
                    that._custom(custom.val());
                }
            }

            if (length) {
                if (options.highlightFirst) {
                    that.current($(ul.firstChild));
                }

                if (options.suggest && that.input.val() && that._request !== undefined /*first refresh ever*/) {
                    that.suggest($(ul.firstChild));
                }
            }

            if (state !== STATE_FILTER && !that._fetch) {
                that._selectItem(value);
            }

            if (that._open) {
                that._open = false;
                open = !!length;

                if (that._typing && that.input[0] !== document.activeElement) {
                    open = false;
                }

                that.toggle(open);
                that._typing = undefined;
            }

            if (that._touchScroller) {
                that._touchScroller.reset();
            }

            that._makeUnselectable();

            that._hideBusy();
            that._bound = true;
            that.trigger("dataBound");
        },

        select: function(li) {
            var that = this;

            if (li === undefined) {
                return that.selectedIndex;
            } else {
                that._select(li);
                that._old = that._accessor();
                that._oldIndex = that.selectedIndex;
            }
        },

        search: function(word) {
            word = typeof word === "string" ? word : this.text();
            var that = this,
                length = word.length,
                options = that.options,
                ignoreCase = options.ignoreCase,
                filter = options.filter,
                field = options.dataTextField;

            clearTimeout(that._typing);

            if (length >= options.minLength) {
                that._state = STATE_FILTER;
                if (filter === "none") {
                    that._filter(word);
                } else {
                    that._open = true;
                    that._filterSource({
                        value: ignoreCase ? word.toLowerCase() : word,
                        field: field,
                        operator: filter,
                        ignoreCase: ignoreCase
                    });
                }
            }
        },

        suggest: function(word) {
            var that = this,
                element = that.input[0],
                value = that.text(),
                caret = List.caret(element),
                key = that._last,
                idx;

            if (key == keys.BACKSPACE || key == keys.DELETE) {
                that._last = undefined;
                return;
            }

            word = word || "";

            if (typeof word !== "string") {
                idx = List.inArray(word[0], that.ul[0]);

                if (idx > -1) {
                    word = that._text(that.dataSource.view()[idx]);
                } else {
                    word = "";
                }
            }

            if (caret <= 0) {
                caret = value.toLowerCase().indexOf(word.toLowerCase()) + 1;
            }

            if (word) {
                idx = word.toLowerCase().indexOf(value.toLowerCase());
                if (idx > -1) {
                    value += word.substring(idx + value.length);
                }
            } else {
                value = value.substring(0, caret);
            }

            if (value.length !== caret || !word) {
                element.value = value;
                List.selectText(element, caret, value.length);
            }
        },

        text: function (text) {
            text = text === null ? "" : text;

            var that = this,
                textAccessor = that._text,
                input = that.input[0],
                ignoreCase = that.options.ignoreCase,
                loweredText = text,
                dataItem;

            if (text !== undefined) {
                dataItem = that.dataItem();

                if (dataItem && textAccessor(dataItem) === text) {
                    return;
                }

                if (ignoreCase) {
                    loweredText = loweredText.toLowerCase();
                }

                that._select(function(data) {
                    data = textAccessor(data);

                    if (ignoreCase) {
                        data = (data + "").toLowerCase();
                    }

                    return data === loweredText;
                });

                if (that.selectedIndex < 0) {
                    that._custom(text);
                    input.value = text;
                }
            } else {
                return input.value;
            }
        },

        toggle: function(toggle) {
            var that = this;

            that._toggle(toggle);
        },

        value: function(value) {
            var that = this,
                idx;

            if (value !== undefined) {
                if (value !== null) {
                    value = value.toString();
                }

                if (!that._open && value && that._valueOnFetch(value)) {
                    return;
                }

                idx = that._index(value);

                if (idx > -1) {
                    that.select(idx);
                } else {
                    that.current(NULL);
                    that._custom(value);
                    that.text(value);
                    that._placeholder();
                }

                that._old = that._accessor();
                that._oldIndex = that.selectedIndex;
            } else {
                return that._accessor();
            }
        },

        _accept: function(li) {
            var that = this;

            if (li && that.popup.visible()) {
                that._focus(li);
            } else {
                that.text(that.text());
                that._change();
            }
        },

        _custom: function(value) {
            var that = this,
                element = that.element,
                custom = that._option;

            if (that._state === STATE_FILTER) {
                that._state = STATE_ACCEPT;
            }

            if (element.is(SELECT)) {
                if (!custom) {
                    custom = that._option = $("<option/>");
                    element.append(custom);
                }
                custom.text(value);
                custom[0].selected = true;
            } else {
                element.val(value);
            }
        },

        _filter: function(word) {
            var that = this,
                options = that.options,
                dataSource = that.dataSource,
                ignoreCase = options.ignoreCase,
                predicate = function (dataItem) {
                    var text = that._text(dataItem);
                    if (text !== undefined) {
                        text = text + "";
                        if (text !== "" && word === "") {
                            return false;
                        }

                        if (ignoreCase) {
                            text = text.toLowerCase();
                        }

                        return text.indexOf(word) === 0;
                    }
                };

            if (ignoreCase) {
                word = word.toLowerCase();
            }

            if (!that.ul[0].firstChild) {
                dataSource.one(CHANGE, function () {
                    if (dataSource.data()[0]) {
                        that.search(word);
                    }
                }).fetch();
                return;
            }

            if (that._highlight(predicate) !== -1) {
                if (options.suggest && that._current) {
                    that.suggest(that._current);
                }
                that.open();
            }

            that._hideBusy();
        },

        _highlight: function(li) {
            var that = this, idx;

            if (li === undefined || li === null) {
                return -1;
            }

            li = that._get(li);
            idx = List.inArray(li[0], that.ul[0]);

            if (idx == -1) {
                if (that.options.highlightFirst && !that.text()) {
                    li = $(that.ul[0].firstChild);
                } else {
                    li = NULL;
                }
            }

            that.current(li);

            return idx;
        },

        _input: function() {
            var that = this,
                element = that.element.removeClass("k-input")[0],
                tabIndex = element.tabIndex,
                accessKey = element.accessKey,
                wrapper = that.wrapper,
                SELECTOR = "input.k-input",
                input, DOMInput,
                name = element.name || "";

            if (name) {
                name = 'name="' + name + '_input" ';
            }

            input = wrapper.find(SELECTOR);

            if (!input[0]) {
                wrapper.append('<span tabindex="-1" unselectable="on" class="k-dropdown-wrap k-state-default"><input ' + name + 'class="k-input" type="text" autocomplete="off"/><span tabindex="-1" unselectable="on" class="k-select"><span unselectable="on" class="k-icon k-i-arrow-s">select</span></span></span>')
                       .append(that.element);

                input = wrapper.find(SELECTOR);
            }

            DOMInput = input[0];
            DOMInput.tabIndex = tabIndex;
            DOMInput.style.cssText = element.style.cssText;

            if (element.maxLength > -1) {
                DOMInput.maxLength = element.maxLength;
            }

            input.addClass(element.className)
                 .val(element.value)
                 .css({
                    width: "100%",
                    height: element.style.height
                 })
                 .show();

            if (placeholderSupported) {
                input.attr("placeholder", that.options.placeholder);
            }

            if (accessKey) {
                element.accessKey = "";
                input[0].accessKey = accessKey;
            }

            that._focused = that.input = input;
            that._inputWrapper = $(wrapper[0].firstChild);
            that._arrow = wrapper.find(".k-icon")
                                 .attr({
                                     "role": "button",
                                     "tabIndex": -1
                                 });

            if (element.id) {
                that._arrow.attr("aria-controls", that.ul[0].id);
            }
        },

        _keydown: function(e) {
            var that = this,
                key = e.keyCode;

            that._last = key;

            clearTimeout(that._typing);

            if (key != keys.TAB && !that._move(e)) {
               that._search();
            }
        },

        _placeholder: function(show) {
            if (placeholderSupported) {
                return;
            }

            var that = this,
                input = that.input,
                placeholder = that.options.placeholder,
                value;

            if (placeholder) {
                value = that.value();

                if (show === undefined) {
                    show = !value;
                }

                input.toggleClass("k-readonly", show);

                if (!show) {
                    if (!value) {
                        placeholder = "";
                    } else {
                        return;
                    }
                }

                input.val(placeholder);
            }
        },

        _search: function() {
            var that = this;

            that._typing = setTimeout(function() {
                var value = that.text();
                if (that._prev !== value) {
                    that._prev = value;
                    that.search(value);
                }
            }, that.options.delay);
        },

        _select: function(li) {
            var that = this,
                text,
                value,
                data = that._data(),
                idx = that._highlight(li);

            that.selectedIndex = idx;

            if (idx !== -1) {
                if (that._state === STATE_FILTER) {
                    that._state = STATE_ACCEPT;
                }

                that._current.addClass(STATE_SELECTED);

                data = data[idx];
                text = that._text(data);
                value = that._value(data);

                that._prev = that.input[0].value = text;
                that._accessor(value !== undefined ? value : text, idx);
                that._placeholder();

                if (that._optionID) {
                    that._current.attr("aria-selected", true);
                }
            }
        },

        _filterSource: function(filter) {
            var that = this,
                options = that.options,
                dataSource = that.dataSource,
                expression = dataSource.filter() || {};

            removeFiltersForField(expression, options.dataTextField);

            if (filter) {
                expression = expression.filters || [];
                expression.push(filter);
            }

            dataSource.filter(expression);
        },

        _wrapper: function() {
            var that = this,
                element = that.element,
                wrapper = element.parent();

            if (!wrapper.is("span.k-widget")) {
                wrapper = element.hide().wrap("<span />").parent();
                wrapper[0].style.cssText = element[0].style.cssText;
            }

            that.wrapper = wrapper.addClass("k-widget k-combobox k-header")
                                  .addClass(element[0].className)
                                  .css("display", "");
        }
    });

    ui.plugin(ComboBox);
})(window.kendo.jQuery);
