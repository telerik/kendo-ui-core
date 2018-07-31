(function(f, define){
    define([ "./kendo.list", "./kendo.mobile.scroller", "./kendo.virtuallist" ], f);
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
        nsFocusEvent = ns + "FocusEvent",
        CLICK = "click" + ns,
        MOUSEDOWN = "mousedown" + ns,
        DISABLED = "disabled",
        READONLY = "readonly",
        CHANGE = "change",
        LOADING = "k-i-loading",
        DEFAULT = "k-state-default",
        FOCUSED = "k-state-focused",
        STATEDISABLED = "k-state-disabled",
        ARIA_DISABLED = "aria-disabled",
        STATE_FILTER = "filter",
        STATE_ACCEPT = "accept",
        STATE_REBIND = "rebind",
        HOVEREVENTS = "mouseenter" + ns + " mouseleave" + ns,
        proxy = $.proxy,
        newLineRegEx = /(\r\n|\n|\r)/gm;

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

            that._clearButton();

            that._tabindex(that.input);

            that._popup();

            that._dataSource();
            that._ignoreCase();

            that._enable();

            that._attachFocusEvents();

            that._oldIndex = that.selectedIndex = -1;

            that._aria();

            that._initialIndex = options.index;

            that.requireValueMapper(that.options);
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
            that._toggleCloseVisibility();
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
            minLength: 1,
            enforceMinLength: false,
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
            fixedGroupTemplate: "#:data#",
            clearButton: true,
            syncValueAndText: true,
            autoWidth: false
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
            var listOptions = this._listOptions(options);

            Select.fn.setOptions.call(this, options);

            this.listView.setOptions(listOptions);

            this._accessors();
            this._aria();
            this._clearButton();
        },

        destroy: function() {
            var that = this;

            that.input.off(ns);
            that.input.off(nsFocusEvent);
            that.element.off(ns);
            that._inputWrapper.off(ns);
            clearTimeout(that._pasteTimeout);

            that._arrow.off(CLICK + " " + MOUSEDOWN);
            that._clear.off(CLICK + " " + MOUSEDOWN);

            Select.fn.destroy.call(that);
        },

        _change: function() {
            var that = this;
            var text = that.text();
            var hasText = text && text !== that._oldText && text !== that.options.placeholder;
            var index = that.selectedIndex;
            var isCustom = index === -1;

            if (!that.options.syncValueAndText && !that.value() && isCustom && hasText) {
                that._old = "";
                that._oldIndex = index;
                that._oldText = text;

                if (!that._typing) {
                    // trigger the DOM change event so any subscriber gets notified
                    that.element.trigger(CHANGE);
                }

                that.trigger(CHANGE);
                that._typing = false;
                return;
            }

            Select.fn._change.call(that);
            that._toggleCloseVisibility();
        },

        _attachFocusEvents: function() {
            var that = this;
            that.input.on("focus" + nsFocusEvent, proxy(that._inputFocus, that))
                      .on("focusout" + nsFocusEvent, proxy(that._inputFocusout, that));
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
            var value = that.value();

            that._userTriggered = true;
            that._inputWrapper.removeClass(FOCUSED);
            clearTimeout(that._typingTimeout);
            that._typingTimeout = null;

            that.text(that.text());

            var item = that._focus();
            var dataItem = this.listView.dataItemByIndex(this.listView.getElementIndex(item));

            if (value !== that.value() && that.trigger("select", { dataItem: dataItem, item: item })) {
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
                arrow = that._arrow.off(CLICK + " " + MOUSEDOWN),
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

                clear.on(CLICK + " touchend" + ns, proxy(that._clearValue, that))
                    .on(MOUSEDOWN, function(e) { e.preventDefault(); });

                that.input
                    .on("keydown" + ns, proxy(that._keydown, that))
                    .on("input" + ns, proxy(that._search, that))
                    .on("paste" + ns, proxy(that._inputPaste, that));

            } else {
                wrapper
                    .addClass(disable ? STATEDISABLED : DEFAULT)
                    .removeClass(disable ? DEFAULT : STATEDISABLED);

                input.attr(DISABLED, disable)
                     .attr(READONLY, readonly)
                     .attr(ARIA_DISABLED, disable);
            }

            that._toggleCloseVisibility();
        },

        open: function() {
            var that = this;
            var state = that._state;
            var isFiltered = that.dataSource.filter() ? that.dataSource.filter().filters.length > 0 : false;

            if (that.popup.visible()) {
                return;
            }

            if ((!that.listView.bound() && state !== STATE_FILTER) || state === STATE_ACCEPT) {
                that._open = true;
                that._state = STATE_REBIND;
                if ((that.options.minLength !== 1 && !isFiltered) || (isFiltered && that.value() && that.selectedIndex === -1 )) {
                    that.refresh();
                    that._openPopup();
                    if (!this.options.virtual) {
                        that.listView.bound(false);
                    }
                } else {
                    that._filterSource();
                }
            } else if (that._allowOpening()) {
                // In some cases when the popup is opened resize is triggered which will cause it to close
                // Setting the below flag will prevent this from happening
                that.popup._hovered = true;
                that._openPopup();
                if(that.options.virtual){
                    that._focusItem();
                }
            }
        },

        _scrollToFocusedItem: function() {
            var listView = this.listView;

            listView.scrollToIndex(listView.getElementIndex(listView.focus()));
        },

        _openPopup: function() {
            this.popup.one("activate", proxy(this._scrollToFocusedItem, this));
            this.popup.open();
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

            if (custom && custom[0].selected && !that.listView._emptySearch) {
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
            } else if (that._value(dataItem) !== that.element[0].value){
                that._accessor(that._value(dataItem));
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
            var length = data.length;
            var groupsLength = that.dataSource._group ? that.dataSource._group.length : 0;
            var isFirstPage = skip === undefined || skip === 0;

            that._presetValue = false;

            that._renderFooter();
            that._renderNoData();
            that._toggleNoData(!length);
            that._toggleHeader(!!groupsLength && !!length);

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
                    that.toggle(that._allowOpening());
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
            var that = this;
            candidate = that._get(candidate);

            if (candidate === -1) {
                that.input[0].value = "";
                that._accessor("");
            }

            return that.listView.select(candidate).done(function() {
                if (!keepState && that._state === STATE_FILTER) {
                    that._state = STATE_ACCEPT;
                }
                that._toggleCloseVisibility();
            });
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

            if (this.listView.isFiltered() && idx !== -1) {
                this._valueBeforeCascade = this._old;
            }

            if (idx === -1 && !dataItem) {
                if (this.options.syncValueAndText) {
                    if (this.options.dataTextField === this.options.dataValueField) {
                        text = this._accessor();
                    } else {
                        text = this.input[0].value;
                    }
                    value = text;
                }
                else {
                    text = this.text();
                }
                this.listView.focus(-1);
            } else {
                if (dataItem || dataItem === 0) {
                    value = this._dataValue(dataItem);
                    text = this._text(dataItem);
                }

                if (value === null) {
                    value = "";
                }
            }

            this._setDomInputValue(text);
            this._accessor(value !== undefined ? value : text, idx);

            this._placeholder();
            this._triggerCascade();
        },

        _setDomInputValue: function(text){
            var that = this;
            var currentCaret = caret(this.input);
            var caretStart;

            if(currentCaret && currentCaret.length){
                caretStart = currentCaret[0];
            }

            this._prev = this.input[0].value = text;

            if(caretStart && this.selectedIndex === -1){
                var mobile = support.mobileOS;
                if(mobile.wp || mobile.android) {// without the timeout the caret is at the end of the input
                    setTimeout(function() { that.input[0].setSelectionRange(caretStart, caretStart); }, 0);
                }
                else {
                    this.input[0].setSelectionRange(caretStart, caretStart);
                }
            }
        },

        refresh: function() {
            this.listView.refresh();
        },

        _toggleCloseVisibility: function() {
            var preventShow = this.element.is(":disabled") || this.element.is("[readonly]");

            if (this.text() && !preventShow) {
                this._showClear();
            } else {
                this._hideClear();
            }
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

            if (dataItem && that._text(dataItem).replace && that._text(dataItem).replace(newLineRegEx,"") === text) {
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
            }).done(function() {
                if (that.selectedIndex < 0) {
                    input.value = text;

                    if (that.options.syncValueAndText) {
                        that._accessor(text);
                    }

                    that._cascadeTriggered = true;
                    that._triggerCascade();
                }

                that._prev = input.value;
            });

            that._toggleCloseVisibility();
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

            that.requireValueMapper(that.options, value);

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
                    if (that.selectedIndex === -1 && (!listView._selectedDataItems || !listView._selectedDataItems.length)) {
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
                    that._toggleCloseVisibility();
                });
        },

        _hideBusy: function () {
            var that = this;
            clearTimeout(that._busy);
            that._arrowIcon.removeClass(LOADING);
            that._focused.attr("aria-busy", false);
            that._busy = null;
            that._toggleCloseVisibility();
        },

        _click: function(e) {
            var that = this;
            var item = e.item;
            var dataItem = that.listView.dataItemByIndex(that.listView.getElementIndex(item));

            e.preventDefault();

            if (that.trigger("select", { dataItem: dataItem, item: item })) {
                that.close();
                return;
            }

            that._userTriggered = true;

            that._select(item).done(function() {
                that._blur();
            });
        },

        _syncValueAndText: function () {
            return this.options.syncValueAndText;
        },

        _inputValue: function() {
            return this.text();
        },

        _searchByWord: function(word) {
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
                wrapper.append('<span tabindex="-1" unselectable="on" class="k-dropdown-wrap k-state-default"><input ' + name + 'class="k-input" type="text" autocomplete="off"/><span unselectable="on" class="k-select" aria-label="select"><span class="k-icon k-i-arrow-60-down"></span></span></span>')
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
                 .css({
                    width: "",
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
            that._arrow = wrapper.find(".k-select")
                .attr({
                    "role": "button",
                    "tabIndex": -1
                });
            that._arrowIcon = that._arrow.find(".k-icon");

            if (element.id) {
                that._arrow.attr("aria-controls", that.ul[0].id);
            }
        },

        _clearButton: function() {
            List.fn._clearButton.call(this);

            if (this.options.clearButton) {
                this._clear.insertAfter(this.input);
                this.wrapper.addClass("k-combobox-clearable");
            }
        },

        _keydown: function(e) {
            var that = this,
                key = e.keyCode;

            that._last = key;

            clearTimeout(that._typingTimeout);
            that._typingTimeout = null;

            if (key === keys.HOME) {
                that._firstItem();
            } else if (key === keys.END) {
                that._lastItem();
            } else if (key === keys.ENTER || key === keys.TAB) {
                var current = that.listView.focus();
                var dataItem = that.dataItem();
                var shouldTrigger = true;

                if (!that.popup.visible() && (!dataItem || that.text() !== that._text(dataItem))) {
                    current = null;
                }

                if (current) {
                    if (that.popup.visible()) {
                        e.preventDefault();
                    }

                    dataItem = that.listView.dataItemByIndex(that.listView.getElementIndex(current));

                    if(dataItem){
                        shouldTrigger = that._value(dataItem) !==  List.unifyType(that.value(), typeof that._value(dataItem));
                    }

                    if (shouldTrigger && that.trigger("select", { dataItem: dataItem, item: current })) {
                        return;
                    }

                    that._userTriggered = true;

                    that._select(current).done(function() {
                        that._blur();
                        that._valueBeforeCascade = that._old = that.value();
                    });
                } else {
                    if(that._syncValueAndText() || that._isSelect){
                        that._accessor(that.input.val());
                    }

                    that.listView.value(that.input.val());
                    that._blur();
                }
            } else if (key != keys.TAB && !that._move(e)) {
               that._search();
            } else if (key === keys.ESC && !that.popup.visible()) {
                that._clearValue();
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
                    that._toggleCloseVisibility();
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
                // Reset selected value for cascading
                that._selectedValue = null;
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
            this._toggleCloseVisibility();
        }
    });

    ui.plugin(ComboBox);
})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
