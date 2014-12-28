(function(f, define){
    define([ "./kendo.list", "./kendo.mobile.scroller" ], f);
})(function(){

var __meta__ = {
    id: "combobox",
    name: "ComboBox",
    category: "web",
    description: "The ComboBox widget allows the selection from pre-defined values or entering a new value.",
    depends: [ "list" ],
    features: [ {
        id: "mobile-scroller",
        name: "Mobile scroller",
        description: "Support for kinetic scrolling in mobile device",
        depends: [ "mobile.scroller" ]
    } ]
};

(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        List = ui.List,
        Select = ui.Select,
        caret = kendo.caret,
        support = kendo.support,
        placeholderSupported = support.placeholder,
        activeElement = kendo._activeElement,
        keys = kendo.keys,
        ns = ".kendoComboBox",
        CLICK = "click" + ns,
        MOUSEDOWN = "mousedown" + ns,
        DISABLED = "disabled",
        READONLY = "readonly",
        CHANGE = "change",
        DEFAULT = "k-state-default",
        FOCUSED = "k-state-focused",
        STATEDISABLED = "k-state-disabled",
        ARIA_DISABLED = "aria-disabled",
        ARIA_READONLY = "aria-readonly",
        STATE_SELECTED = "k-state-selected",
        STATE_FILTER = "filter",
        STATE_ACCEPT = "accept",
        STATE_REBIND = "rebind",
        HOVEREVENTS = "mouseenter" + ns + " mouseleave" + ns,
        NULL = null,
        proxy = $.proxy;

    var ComboBox = Select.extend({
        init: function(element, options) {
            var that = this, text;

            that.ns = ns;

            options = $.isArray(options) ? { dataSource: options } : options;

            Select.fn.init.call(that, element, options);

            options = that.options;
            element = that.element.on("focus" + ns, proxy(that._focusHandler, that));

            options.placeholder = options.placeholder || element.attr("placeholder");

            that._reset();

            that._wrapper();

            that._input();

            that._tabindex(that.input);

            that._popup();

            that._dataSource();
            that._ignoreCase();

            that._enable();

            that._oldIndex = that.selectedIndex = -1;

            that._cascade();

            that._aria();

            if (options.autoBind) {
                that._filterSource(); //TODO: diff when just bind and actually filter
            } else {
                text = options.text;

                if (!text && that._isSelect) {
                    text = element.children(":selected").text();
                }

                if (text) {
                    that.input.val(text);
                    that._prev = text;
                }
            }

            if (!text) {
                that._placeholder();
            }

            kendo.notify(that);
        },

        options: {
            name: "ComboBox",
            enabled: true,
            index: -1,
            text: null,
            value: null,
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
            cascadeFrom: "",
            cascadeFromField: "",
            ignoreCase: true,
            animation: {}
        },

        events:[
            "open",
            "close",
            CHANGE,
            "select",
            "filtering",
            "dataBinding",
            "dataBound",
            "cascade"
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

        _focusHandler: function() {
            this.input.focus();
        },

        _arrowClick: function() {
            this._toggle();
        },

        _inputFocus: function() {
            this._inputWrapper.addClass(FOCUSED);
            this._placeholder(false);
        },

        _inputFocusout: function() {
            var that = this;

            that._inputWrapper.removeClass(FOCUSED);
            clearTimeout(that._typing);
            that._typing = null;

            if (that.options.text !== that.input.val()) {
                that.text(that.text());
            }

            that._placeholder();
            that._blur();

            that.element.blur();
        },

        _editable: function(options) {
            var that = this,
                disable = options.disable,
                readonly = options.readonly,
                wrapper = that._inputWrapper.off(ns),
                input = that.element.add(that.input.off(ns)),
                arrow = that._arrow.parent().off(CLICK + " " + MOUSEDOWN);

            if (!readonly && !disable) {
                wrapper
                    .addClass(DEFAULT)
                    .removeClass(STATEDISABLED)
                    .on(HOVEREVENTS, that._toggleHover);

                input.removeAttr(DISABLED)
                     .removeAttr(READONLY)
                     .attr(ARIA_DISABLED, false)
                     .attr(ARIA_READONLY, false);

                arrow.on(CLICK, proxy(that._arrowClick, that))
                     .on(MOUSEDOWN, function(e) { e.preventDefault(); });

                that.input
                    .on("keydown" + ns, proxy(that._keydown, that))
                    .on("focus" + ns, proxy(that._inputFocus, that))
                    .on("focusout" + ns, proxy(that._inputFocusout, that));

            } else {
                wrapper
                    .addClass(disable ? STATEDISABLED : DEFAULT)
                    .removeClass(disable ? DEFAULT : STATEDISABLED);

                input.attr(DISABLED, disable)
                     .attr(READONLY, readonly)
                     .attr(ARIA_DISABLED, disable)
                     .attr(ARIA_READONLY, readonly);
            }
        },

        open: function() {
            var that = this;
            var state = that._state;
            var serverFiltering = that.dataSource.options.serverFiltering;

            if (that.popup.visible()) {
                return;
            }

            if ((!that.ul[0].firstChild && state !== STATE_FILTER) ||
                (state === STATE_ACCEPT && !serverFiltering)) {
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
                keepState = true,
                hasChild, custom;

            that._angularItems("cleanup");
            that.trigger("dataBinding");

            ul.innerHTML = kendo.render(that.template, data);
            that._height(length);

            if (that.popup.visible()) {
                that.popup._position();
            }

            if (that._isSelect) {
                hasChild = that.element[0].children[0];

                if (state === STATE_REBIND) {
                    that._state = "";
                }

                custom = that._option;
                that._option = undefined;
                that._options(data);

                if (custom && custom[0].selected) {
                    that._custom(custom.val(), keepState);
                } else if (!that._bound && !hasChild) {
                    that._custom("", keepState);
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
                that._selectItem();
            }

            if (that._open) {
                that._open = false;

                if (that._typing && that.input[0] !== activeElement()) {
                    that.popup.close();
                } else {
                    that.toggle(!!length);
                }

                that._typing = null;
            }

            if (that._touchScroller) {
                that._touchScroller.reset();
            }

            that._makeUnselectable();

            that._hideBusy();
            that._bound = true;
            that._angularItems("compile");
            that.trigger("dataBound");
        },

        suggest: function(word) {
            var that = this,
                element = that.input[0],
                value = that.text(),
                caretIdx = caret(element)[0],
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

            if (caretIdx <= 0) {
                caretIdx = value.toLowerCase().indexOf(word.toLowerCase()) + 1;
            }

            if (word) {
                idx = word.toLowerCase().indexOf(value.toLowerCase());
                if (idx > -1) {
                    value += word.substring(idx + value.length);
                }
            } else {
                value = value.substring(0, caretIdx);
            }

            if (value.length !== caretIdx || !word) {
                element.value = value;
                if (element === activeElement()) {
                    caret(element, caretIdx, value.length);
                }
            }
        },

        text: function (text) {
            text = text === null ? "" : text;

            var that = this;
            var input = that.input[0];
            var ignoreCase = that.options.ignoreCase;
            var loweredText = text;
            var dataItem;
            var value;

            if (text !== undefined) {
                dataItem = that.dataItem();

                if (dataItem && that._text(dataItem) === text) {
                    value = that._value(dataItem);
                    if (value === null) {
                        value = "";
                    } else {
                        value += "";
                    }

                    if (value === that._old) {
                        that._triggerCascade();
                        return;
                    }
                }

                if (ignoreCase) {
                    loweredText = loweredText.toLowerCase();
                }

                that._select(function(data) {
                    data = that._text(data);

                    if (ignoreCase) {
                        data = (data + "").toLowerCase();
                    }

                    return data === loweredText;
                });

                if (that.selectedIndex < 0) {
                    that._custom(text);
                    input.value = text;
                }

                that._prev = input.value;
                that._triggerCascade();
            } else {
                return input.value;
            }
        },

        toggle: function(toggle) {
            this._toggle(toggle, true);
        },

        value: function(value) {
            var that = this,
                options = that.options,
                idx;

            if (value !== undefined) {
                if (value !== null) {
                    value = value.toString();
                }

                that._selectedValue = value;

                if (!that._open && value && that._fetchItems(value)) {
                    return;
                }

                idx = that._index(value);

                if (idx > -1) {
                    that.select(idx);
                } else {
                    that.current(NULL);
                    that._custom(value);

                    if (options.value !== value || options.text !== that.input.val()) {
                        that.text(value);
                        that._placeholder();
                    }
                }

                that._old = that._accessor();
                that._oldIndex = that.selectedIndex;
            } else {
                return that._accessor();
            }
        },

        _accept: function(li) {
            var that = this;

            if (li) {
                that._focus(li);
            } else {
                that.text(that.text());
                that._change();
            }
        },

        _custom: function(value, keepState) {
            var that = this;
            var element = that.element;
            var custom = that._option;

            if (that._state === STATE_FILTER && !keepState) {
                that._state = STATE_ACCEPT;
            }

            if (that._isSelect) {
                if (!custom) {
                    custom = that._option = $("<option/>");
                    element.append(custom);
                }
                custom.text(value);
                custom[0].selected = true;
            } else {
                element.val(value);
            }

            that._selectedValue = value;
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
                    if (dataSource.view()[0]) {
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
                    li = that.ul[0].firstChild;
                    if (li) {
                        li = $(li);
                    }
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
                accessKey = element.accessKey,
                wrapper = that.wrapper,
                SELECTOR = "input.k-input",
                name = element.name || "",
                input;

            if (name) {
                name = 'name="' + name + '_input" ';
            }

            input = wrapper.find(SELECTOR);

            if (!input[0]) {
                wrapper.append('<span tabindex="-1" unselectable="on" class="k-dropdown-wrap k-state-default"><input ' + name + 'class="k-input" type="text" autocomplete="off"/><span tabindex="-1" unselectable="on" class="k-select"><span unselectable="on" class="k-icon k-i-arrow-s">select</span></span></span>')
                       .append(that.element);

                input = wrapper.find(SELECTOR);
            }

            input[0].style.cssText = element.style.cssText;

            if (element.maxLength > -1) {
                input[0].maxLength = element.maxLength;
            }

            input.addClass(element.className)
                 .val(this.options.text || element.value)
                 .css({
                    width: "100%",
                    height: element.style.height
                 })
                 .attr({
                     "role": "combobox",
                     "aria-expanded": false
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
            that._typing = null;

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

                if (!placeholder && input[0] === activeElement()) {
                    caret(input[0], 0, 0);
                }
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

                that._typing = null;
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

                if (value === null) {
                    value = "";
                }

                that._prev = that.input[0].value = text;
                that._accessor(value !== undefined ? value : text, idx);
                that._selectedValue = that._accessor();
                that._placeholder();

                if (that._optionID) {
                    that._current.attr("aria-selected", true);
                }
            }
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
        },

        _clearSelection: function(parent, isFiltered) {
            var that = this,
                hasValue = parent._selectedValue || parent.value(),
                custom = hasValue && parent.selectedIndex === -1;

            if (isFiltered || !hasValue || custom) {
                that.value("");
                that.options.value = "";
            }
        }
    });

    ui.plugin(ComboBox);
})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
