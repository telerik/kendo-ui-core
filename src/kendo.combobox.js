(function(f, define){
    define([ "./kendo.list", "./kendo.mobile.scroller" ], f);
})(function(){

var __meta__ = { // jshint ignore:line
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
    }, {
        id: "virtualization",
        name: "VirtualList",
        description: "Support for virtualization",
        depends: [ "virtuallist" ]
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
        STATE_FILTER = "filter",
        STATE_ACCEPT = "accept",
        STATE_REBIND = "rebind",
        HOVEREVENTS = "mouseenter" + ns + " mouseleave" + ns,
        proxy = $.proxy;

    var ComboBox = Select.extend({
        init: function(element, options) {
            var that = this, text, disabled;

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

            that._aria();

            that._initialIndex = options.index;

            that._initList();

            that._cascade();

            if (options.autoBind) {
                that._filterSource();
            } else {
                text = options.text;

                if (!text && that._isSelect) {
                    text = element.children(":selected").text();
                }

                if (text) {
                    that._setText(text);
                }
            }

            if (!text) {
                that._placeholder();
            }

            disabled = $(that.element).parents("fieldset").is(':disabled');

            if (disabled) {
                that.enable(false);
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
            filter: "none",
            placeholder: "",
            suggest: false,
            cascadeFrom: "",
            cascadeFromField: "",
            ignoreCase: true,
            animation: {},
            virtual: false,
            template: null,
            groupTemplate: "#:data#",
            fixedGroupTemplate: "#:data#"
        },

        events:[
            "open",
            "close",
            CHANGE,
            "select",
            "filtering",
            "dataBinding",
            "dataBound",
            "cascade",
            "set"
        ],

        setOptions: function(options) {
            Select.fn.setOptions.call(this, options);

            this.listView.setOptions(options);

            this._accessors();
            this._aria();
        },

        destroy: function() {
            var that = this;

            that.input.off(ns);
            that.element.off(ns);
            that._inputWrapper.off(ns);
            clearTimeout(that._pasteTimeout);

            that._arrow.parent().off(CLICK + " " + MOUSEDOWN);
            that._clear.off(CLICK + " " + MOUSEDOWN);

            Select.fn.destroy.call(that);
        },

        _focusHandler: function() {
            this.input.focus();
        },

        _arrowClick: function() {
            this._toggle();
        },

        _clearClick: function() {
            this.value(null);
        },

        _inputFocus: function() {
            this._inputWrapper.addClass(FOCUSED);
            this._placeholder(false);
        },

        _inputFocusout: function() {
            var that = this;
            var value = that.value();

            that._inputWrapper.removeClass(FOCUSED);
            clearTimeout(that._typingTimeout);
            that._typingTimeout = null;

            that.text(that.text());

            if (value !== that.value() && that.trigger("select", { item: that._focus() })) {
                that.value(value);
                return;
            }

            that._placeholder();
            that._blur();

            that.element.blur();
        },

        _inputPaste: function() {
            var that = this;
            clearTimeout(that._pasteTimeout);
            that._pasteTimeout = null;

            that._pasteTimeout = setTimeout(function() {
                that.search();
            });
        },

        _editable: function(options) {
            var that = this,
                disable = options.disable,
                readonly = options.readonly,
                wrapper = that._inputWrapper.off(ns),
                input = that.element.add(that.input.off(ns)),
                arrow = that._arrow.parent().off(CLICK + " " + MOUSEDOWN),
                clear = that._clear;

            if (!readonly && !disable) {
                wrapper
                    .addClass(DEFAULT)
                    .removeClass(STATEDISABLED)
                    .on(HOVEREVENTS, that._toggleHover);

                input.removeAttr(DISABLED)
                     .removeAttr(READONLY)
                     .attr(ARIA_DISABLED, false);

                arrow.on(CLICK, proxy(that._arrowClick, that))
                     .on(MOUSEDOWN, function(e) { e.preventDefault(); });

                clear.on(CLICK, proxy(that._clearClick, that))
                    .on(MOUSEDOWN, function(e) { e.preventDefault(); });

                that.input
                    .on("keydown" + ns, proxy(that._keydown, that))
                    .on("focus" + ns, proxy(that._inputFocus, that))
                    .on("focusout" + ns, proxy(that._inputFocusout, that))
                    .on("paste" + ns, proxy(that._inputPaste, that));

            } else {
                wrapper
                    .addClass(disable ? STATEDISABLED : DEFAULT)
                    .removeClass(disable ? DEFAULT : STATEDISABLED);

                input.attr(DISABLED, disable)
                     .attr(READONLY, readonly)
                     .attr(ARIA_DISABLED, disable);
            }
        },

        open: function() {
            var that = this;
            var state = that._state;

            if (that.popup.visible()) {
                return;
            }

            if ((!that.listView.bound() && state !== STATE_FILTER) || state === STATE_ACCEPT) {
                that._open = true;
                that._state = STATE_REBIND;
                that._filterSource();
            } else {
                that.popup.open();
                that._focusItem();
            }
        },

        _updateSelectionState: function() {
            var that = this;
            var text = that.options.text;
            var value = that.options.value;

            if (that.listView.isFiltered()) {
                return;
            }

            if (that.selectedIndex === -1) {
                if (text === undefined || text === null) {
                    text = value;
                }

                that._accessor(value);
                that.input.val(text || that.input.val());
                that._placeholder();
            } else if (that._oldIndex === -1) {
                that._oldIndex = that.selectedIndex;
            }
        },

        _buildOptions: function(data) {
            var that = this;
            if (!that._isSelect) {
                return;
            }

            var custom = that._customOption;

            if (that._state === STATE_REBIND) {
                that._state = "";
            }

            that._customOption = undefined;
            that._options(data, "", that.value());

            if (custom && custom[0].selected) {
                that._custom(custom.val());
            }
        },

        _updateSelection: function() {
            var that = this;
            var listView = that.listView;
            var initialIndex = that._initialIndex;
            var hasInitialIndex = initialIndex !== null && initialIndex > -1;
            var filtered = that._state === STATE_FILTER;

            if (filtered) {
                $(listView.focus()).removeClass("k-state-selected");
                return;
            }

            if (that._fetch) {
                return;
            }

            if (!listView.value().length) {
                if (hasInitialIndex) {
                    that.select(initialIndex);
                } else if (that._accessor()) {
                    listView.value(that._accessor());
                }
            }

            that._initialIndex = null;

            var dataItem = listView.selectedDataItems()[0];

            if (!dataItem) {
                return;
            }

            if (that._value(dataItem) !== that.value()) {
                that._custom(that._value(dataItem));
            }

            if (that.text() && that.text() !== that._text(dataItem)) {
                that._selectValue(dataItem);
            }
        },

        _updateItemFocus: function() {
            var listView = this.listView;

            if (!this.options.highlightFirst) {
                listView.focus(-1);
            } else if (!listView.focus() && !listView.focusIndex()) {
                listView.focus(0);
            }
        },

        _listBound: function() {
            var that = this;
            var isActive = that.input[0] === activeElement();

            var data = that.dataSource.flatView();
            var skip = that.listView.skip();
            var isFirstPage = skip === undefined || skip === 0;

            that._presetValue = false;

            that._resizePopup();

            that.popup.position();

            that._buildOptions(data);

            that._makeUnselectable();

            that._updateSelection();

            if (data.length && isFirstPage) {
                that._updateItemFocus();

                if (that.options.suggest && isActive && that.input.val()) {
                    that.suggest(data[0]);
                }
            }

            if (that._open) {
                that._open = false;

                if (that._typingTimeout && !isActive) {
                    that.popup.close();
                } else {
                    that.toggle(!!data.length);
                }

                that._typingTimeout = null;
            }

            that._hideBusy();
            that.trigger("dataBound");
        },

        _listChange: function() {
            this._selectValue(this.listView.selectedDataItems()[0]);

            if (this._presetValue) {
                this._oldIndex = this.selectedIndex;
            }
        },

        _get: function(candidate) {
            var data, found, idx;

            if (typeof candidate === "function") {
                data = this.dataSource.flatView();

                for (idx = 0; idx < data.length; idx++) {
                    if (candidate(data[idx])) {
                        candidate = idx;
                        found = true;
                        break;
                    }
                }

                if (!found) {
                    candidate = -1;
                }
            }

            return candidate;
        },

        _select: function(candidate, keepState) {
            candidate = this._get(candidate);

            if (candidate === -1) {
                this.input[0].value = "";
                this._accessor("");
            }

            this.listView.select(candidate);

            if (!keepState && this._state === STATE_FILTER) {
                this._state = STATE_ACCEPT;
            }
        },

        _selectValue: function(dataItem) {
            var idx = this.listView.select();
            var value = "";
            var text = "";

            idx = idx[idx.length - 1];
            if (idx === undefined) {
                idx = -1;
            }

            this.selectedIndex = idx;

            if (idx === -1) {
                value = text = this.input[0].value;
                this.listView.focus(-1);
            } else {
                if (dataItem) {
                    value = this._dataValue(dataItem);
                    text = this._text(dataItem);
                }

                if (value === null) {
                    value = "";
                }
            }

            this._prev = this.input[0].value = text;
            this._accessor(value !== undefined ? value : text, idx);

            this._placeholder();
            this._triggerCascade();
        },

        refresh: function() {
            this.listView.refresh();
        },

        suggest: function(word) {
            var that = this;
            var element = that.input[0];
            var value = that.text();
            var caretIdx = caret(element)[0];
            var key = that._last;
            var idx;

            if (key == keys.BACKSPACE || key == keys.DELETE) {
                that._last = undefined;
                return;
            }

            word = word || "";

            if (typeof word !== "string") {
                if (word[0]) {
                    word = that.dataSource.view()[List.inArray(word[0], that.ul[0])];
                }

                word = word ? that._text(word) : "";
            }

            if (caretIdx <= 0) {
                caretIdx = value.toLowerCase().indexOf(word.toLowerCase()) + 1;
            }

            if (word) {
                word = word.toString();
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

            if (text === undefined) {
                return input.value;
            }

            if (that.options.autoBind === false && !that.listView.bound()) {
                that._setText(text);
                return;
            }

            dataItem = that.dataItem();

            if (dataItem && that._text(dataItem) === text) {
                value = that._value(dataItem);

                if (value === List.unifyType(that._old, typeof value)) {
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
                that._accessor(text);
                input.value = text;

                that._triggerCascade();
            }

            that._prev = input.value;
        },

        toggle: function(toggle) {
            this._toggle(toggle, true);
        },

        value: function(value) {
            var that = this;
            var options = that.options;
            var listView = that.listView;

            if (value === undefined) {
                value = that._accessor() || that.listView.value()[0];
                return value === undefined || value === null ? "" : value;
            }

            that.trigger("set", { value: value });

            if (value === options.value && that.input.val() === options.text) {
                return;
            }

            that._accessor(value);

            if (that._isFilterEnabled() && listView.bound() && listView.isFiltered()) {
                that._clearFilter();
            } else {
                that._fetchData();
            }

            listView
                .value(value)
                .done(function() {
                    if (that.selectedIndex === -1) {
                        that._accessor(value);
                        that.input.val(value);
                        that._placeholder(true);
                    }

                    that._old = that._accessor();
                    that._oldIndex = that.selectedIndex;

                    that._prev = that.input.val();

                    if (that._state === STATE_FILTER) {
                        that._state = STATE_ACCEPT;
                    }
                });
        },

        _click: function(e) {
            var item = e.item;

            e.preventDefault();

            if (this.trigger("select", { item: item })) {
                this.close();
                return;
            }

            this._userTriggered = true;

            this._select(item);
            this._blur();
        },

        _filter: function(word) {
            var that = this;
            var options = that.options;
            var dataSource = that.dataSource;
            var ignoreCase = options.ignoreCase;
            var predicate = function (dataItem) {
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

            this.listView.focus(this._get(predicate));

            var current = this.listView.focus();

            if (current) {
                if (options.suggest) {
                    that.suggest(current);
                }

                this.open();
            }

            if (this.options.highlightFirst && !word) {
                this.listView.focusFirst();
            }
        },

        _input: function() {
            var that = this,
                element = that.element.removeClass("k-input")[0],
                accessKey = element.accessKey,
                wrapper = that.wrapper,
                SELECTOR = "input.k-input",
                name = element.name || "",
                input,
                maxLength;

            if (name) {
                name = 'name="' + name + '_input" ';
            }

            input = wrapper.find(SELECTOR);

            if (!input[0]) {
                wrapper.append('<span tabindex="-1" unselectable="on" class="k-dropdown-wrap k-state-default"><input ' + name + 'class="k-input" type="text" autocomplete="off"/><span unselectable="on" class="k-icon k-i-close">clear</span><span tabindex="-1" unselectable="on" class="k-select"><span unselectable="on" class="k-icon k-i-arrow-s">select</span></span></span>')
                    .append(that.element);

                input = wrapper.find(SELECTOR);
            }

            input[0].style.cssText = element.style.cssText;
            input[0].title = element.title;

            maxLength = parseInt(this.element.prop("maxlength") || this.element.attr("maxlength"), 10);
            if (maxLength > -1) {
                input[0].maxLength = maxLength;
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
            that._arrow = wrapper.find(".k-icon:last")
                .attr({
                    "role": "button",
                    "tabIndex": -1
                });
            that._clear = wrapper.find(".k-icon:first")
                .attr({
                    "role": "button",
                    "tabIndex": -1
                });

            if (element.id) {
                that._arrow.attr("aria-controls", that.ul[0].id);
                that._clear.attr("aria-controls", that.ul[0].id);
            }
        },

        _keydown: function(e) {
            var that = this,
                key = e.keyCode;

            that._last = key;

            clearTimeout(that._typingTimeout);
            that._typingTimeout = null;

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

            that._typingTimeout = setTimeout(function() {
                var value = that.text();

                if (that._prev !== value) {
                    that._prev = value;

                    if (that.options.filter === "none") {
                        that.listView.select(-1);
                    }

                    that.search(value);
                }

                that._typingTimeout = null;
            }, that.options.delay);
        },

        _setText: function(text) {
            this.input.val(text);
            this._prev = text;
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
            var that = this;
            var hasValue = parent.value();
            var custom = hasValue && parent.selectedIndex === -1;

            if (this.selectedIndex == -1 && this.value()) {
                return;
            }

            if (isFiltered || !hasValue || custom) {
                that.options.value = "";
                that.value("");
            }
        },

        _preselect: function(value, text) {
            this.input.val(text);
            this._accessor(value);

            this._old = this._accessor();
            this._oldIndex = this.selectedIndex;

            this.listView.setValue(value);
            this._placeholder();

            this._initialIndex = null;
            this._presetValue = true;
        }
    });

    ui.plugin(ComboBox);
})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
