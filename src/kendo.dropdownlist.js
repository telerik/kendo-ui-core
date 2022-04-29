(function(f, define){
    define([ "./kendo.list", "./kendo.mobile.scroller", "./kendo.virtuallist", "./kendo.html.button" ], f);
})(function(){

var __meta__ = { // jshint ignore:line
    id: "dropdownlist",
    name: "DropDownList",
    category: "web",
    description: "The DropDownList widget displays a list of values and allows the selection of a single value from the list.",
    depends: [ "list", "html.button" ],
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
        html = kendo.html,
        List = ui.List,
        Select = ui.Select,
        support = kendo.support,
        activeElement = kendo._activeElement,
        ObservableObject = kendo.data.ObservableObject,
        keys = kendo.keys,
        ns = ".kendoDropDownList",
        nsFocusEvent = ns + "FocusEvent",
        DISABLED = "disabled",
        READONLY = "readonly",
        CHANGE = "change",
        FOCUSED = "k-focus",
        STATEDISABLED = "k-disabled",
        ARIA_DISABLED = "aria-disabled",
        ARIA_READONLY = "aria-readonly",
        CLICKEVENTS = "click" + ns + " touchend" + ns,
        HOVEREVENTS = "mouseenter" + ns + " mouseleave" + ns,
        TABINDEX = "tabindex",
        STATE_FILTER = "filter",
        STATE_ACCEPT = "accept",
        MSG_INVALID_OPTION_LABEL = "The `optionLabel` option is not valid due to missing fields. Define a custom optionLabel as shown here http://docs.telerik.com/kendo-ui/api/javascript/ui/dropdownlist#configuration-optionLabel",
        OPEN = "open",
        CLOSE = "close";

    var DropDownList = Select.extend( {
        init: function(element, options) {
            var that = this;
            var index = options && options.index;
            var optionLabel, text, disabled;

            that.ns = ns;
            options = Array.isArray(options) ? { dataSource: options } : options;

            Select.fn.init.call(that, element, options);

            options = that.options;
            element = that.element.on("focus" + ns, that._focusHandler.bind(that));

            that._focusInputHandler = that._focusInput.bind(that);

            that.optionLabel = $();
            that._optionLabel();

            that._inputTemplate();

            that._reset();

            that._prev = "";
            that._word = "";

            that._wrapper();

            that._tabindex();
            that.wrapper.data(TABINDEX, that.wrapper.attr(TABINDEX));

            that._span();

            that._popup();

            that._mobile();

            that._dataSource();

            that._ignoreCase();

            that._filterHeader();

            that._aria();

            that._enable();

            that._attachFocusHandlers();

            that._oldIndex = that.selectedIndex = -1;

            if (index !== undefined) {
                options.index = index;
            }

            that._initialIndex = options.index;

            that.requireValueMapper(that.options);
            that._initList();
            that.listView.one("dataBound", that._attachAriaActiveDescendant.bind(that));

            that._cascade();

            that.one("set", function(e) {
                if (!e.sender.listView.bound() && that.hasOptionLabel()) {
                    that._textAccessor(that._optionLabelText());
                }
            });

            if (options.autoBind) {
                that.dataSource.fetch();
            } else if (that.selectedIndex === -1) { //selectedIndex !== -1 when cascade functionality happens instantly
                text = options.text || "";
                if (!text) {
                    optionLabel = options.optionLabel;

                    if (optionLabel && options.index === 0) {
                        text = optionLabel;
                    } else if (that._isSelect) {
                        text = element.children(":selected").text();
                    }
                }

                that._textAccessor(text);
            }

            disabled = $(that.element).parents("fieldset").is(':disabled');

            if (disabled) {
                that.enable(false);
            }

            that.listView.bind("click", function(e) { e.preventDefault(); });

            kendo.notify(that);
            that._applyCssClasses();
        },

        options: {
            name: "DropDownList",
            enabled: true,
            autoBind: true,
            index: 0,
            text: null,
            value: null,
            delay: 500,
            height: 200,
            dataTextField: "",
            dataValueField: "",
            optionLabel: "",
            cascadeFrom: "",
            cascadeFromField: "",
            cascadeFromParentField: "",
            ignoreCase: true,
            animation: {},
            filter: "none",
            minLength: 1,
            enforceMinLength: false,
            virtual: false,
            template: null,
            valueTemplate: null,
            optionLabelTemplate: null,
            groupTemplate: "#:data#",
            fixedGroupTemplate: "#:data#",
            autoWidth: false,
            popup: null,
            filterTitle: null,
            size: "medium",
            fillMode: "solid",
            rounded: "medium"
        },

        events: [
            "open",
            "close",
            CHANGE,
            "select",
            "filtering",
            "dataBinding",
            "dataBound",
            "cascade",
            "set",
            "kendoKeydown"
        ],

        setOptions: function(options) {
            Select.fn.setOptions.call(this, options);

            this.listView.setOptions(this._listOptions(options));

            this._optionLabel();
            this._inputTemplate();
            this._accessors();
            this._filterHeader();
            this._enable();
            this._aria();

            if (!this.value() && this.hasOptionLabel()) {
                this.select(0);
            }
        },

        destroy: function() {
            var that = this;

            Select.fn.destroy.call(that);

            that.wrapper.off(ns);
            that.wrapper.off(nsFocusEvent);
            that.element.off(ns);

            that._arrow.off();
            that._arrow = null;
            that._arrowIcon = null;

            that.optionLabel.off();

            if(that.filterInput){
                that.filterInput.off(nsFocusEvent);
            }
        },

        open: function() {
            var that = this;
            var isFiltered = that.dataSource.filter() ? that.dataSource.filter().filters.length > 0 : false;
            var listView = this.listView;

            if (that.popup.visible()) {
                return;
            }

            if (!that.listView.bound() || that._state === STATE_ACCEPT) {
                that._open = true;
                that._state = "rebind";

                if (that.filterInput) {
                    that.filterInput.val("");
                    that._prev = "";
                }

                if (that.filterInput && that.options.minLength !== 1 && !isFiltered) {
                    that.refresh();
                    that.popup.one("activate", that._focusInputHandler);
                    that.wrapper.attr("aria-activedescendant", listView._optionID);
                    that.popup.open();
                    that._resizeFilterInput();
                } else {
                    that._filterSource();
                }
            } else if (that._allowOpening()) {
                that._focusFilter = true;
                that.popup.one("activate", that._focusInputHandler);
                // In some cases when the popup is opened resize is triggered which will cause it to close
                // Setting the below flag will prevent this from happening
                that.popup._hovered = true;
                that.wrapper.attr("aria-activedescendant", listView._optionID);
                that.popup.open();
                that._resizeFilterInput();
                that._focusItem();
            }
        },

        close: function() {
            this._attachAriaActiveDescendant();
            this.popup.close();
        },

        _attachAriaActiveDescendant: function() {
            var wrapper = this.wrapper,
                inputId = wrapper.find(".k-input-inner").attr('id');

            wrapper.attr("aria-describedby", inputId);
        },

        _focusInput: function () {
            this._focusElement(this.filterInput);
        },

        _resizeFilterInput: function () {
            var filterInput = this.filterInput;
            var originalPrevent = this._prevent;

            if (!filterInput) {
                return;
            }

            var isInputActive = this.filterInput[0] === activeElement();
            var caret = kendo.caret(this.filterInput[0])[0];

            this._prevent = true;

            filterInput.addClass("k-hidden");
            filterInput.closest(".k-list-filter").css("width", this.popup.element.css("width"));
            filterInput.removeClass("k-hidden");

            if (isInputActive) {
                filterInput.trigger("focus");
                kendo.caret(filterInput[0], caret);
            }

            this._prevent = originalPrevent;
        },

        _allowOpening: function() {
            return this.hasOptionLabel() || this.filterInput || Select.fn._allowOpening.call(this);
        },

        toggle: function(toggle) {
            this._toggle(toggle, true);
        },

        current: function(candidate) {
            var current;

            if (candidate === undefined) {
                current = this.listView.focus();

                if (!current && this.selectedIndex === 0 && this.hasOptionLabel()) {
                    return this.optionLabel;
                }

                return current;
            }

            this._focus(candidate);
        },

        dataItem: function(index) {
            var that = this;
            var dataItem = null;

            if (index === null) { return index; }

            if (index === undefined) {
                dataItem = that.listView.selectedDataItems()[0];
            } else {
                if (typeof index !== "number") {
                    if (that.options.virtual) {
                        return that.dataSource.getByUid($(index).data("uid"));
                    }
                    if (index.hasClass("k-list-optionlabel")) {
                        index = -1;
                    } else {
                        index = $(that.items()).index(index);
                    }
                } else if (that.hasOptionLabel()) {
                    index -= 1;
                }

                dataItem = that.dataSource.flatView()[index];
            }

            if (!dataItem) {
                dataItem = that._optionLabelDataItem();
            }

            return dataItem;
        },

        refresh: function() {
            this.listView.refresh();
        },

        text: function (text) {
            var that = this;
            var loweredText;
            var ignoreCase = that.options.ignoreCase;

            text = text === null ? "" : text;

            if (text !== undefined) {
                if (typeof text !== "string") {
                    that._textAccessor(text);
                    return;
                }

                loweredText = ignoreCase ? text.toLowerCase() : text;

                that._select(function(data) {
                    data = that._text(data);

                    if (ignoreCase) {
                        data = (data + "").toLowerCase();
                    }

                    return data === loweredText;
                }).done(function() {
                    that._textAccessor(that.dataItem() || text);
                });

            } else {
                return that._textAccessor();
            }
        },

        _clearFilter: function() {
            $(this.filterInput).val("");
            Select.fn._clearFilter.call(this);
        },

        value: function(value) {
            var that = this;
            var listView = that.listView;
            var dataSource = that.dataSource;
            var valueFn = function() { that.value(value); };

            if (value === undefined) {
                value = that._accessor() || that.listView.value()[0];
                return value === undefined || value === null ? "" : value;
            }

            that.requireValueMapper(that.options, value);

            if (value || !that.hasOptionLabel()) {
                that._initialIndex = null;
            }

            this.trigger("set", { value: value });

            if (that._request && that.options.cascadeFrom && that.listView.bound()) {
                if (that._valueSetter) {
                    dataSource.unbind(CHANGE, that._valueSetter);
                }

                that._valueSetter = valueFn.bind(that);

                dataSource.one(CHANGE, that._valueSetter);
                return;
            }

            if (that._isFilterEnabled() && listView.bound() && listView.isFiltered()) {
                that._clearFilter();
            } else {
                that._fetchData();
            }

            listView.value(value).done(function() {
                that._old = that._valueBeforeCascade = that._accessor();
                that._oldIndex = that.selectedIndex;
            });
        },

        hasOptionLabel: function() {
            return this.optionLabel && !!this.optionLabel[0];
        },

        _optionLabel: function() {
            var that = this;
            var options = that.options;
            var optionLabel = options.optionLabel;
            var template = options.optionLabelTemplate;

            if (!optionLabel) {
                that.optionLabel.off().remove();
                that.optionLabel = $();
                return;
            }

            if (!template) {
                template = "#:";

                if (typeof optionLabel === "string") {
                    template += "data";
                } else {
                    template += kendo.expr(options.dataTextField, "data");
                }

                template += "#";
            }

            if (typeof template !== "function") {
                template = kendo.template(template);
            }

            that.optionLabelTemplate = template;

            if (!that.hasOptionLabel()) {
                that.optionLabel = $('<div role="option" class="k-list-optionlabel"></div>').prependTo(that.list);
            }

            that.optionLabel.html(template(optionLabel))
                            .off()
                            .on(CLICKEVENTS, that._click.bind(that))
                            .on(HOVEREVENTS, that._toggleHover);

            that.angular("compile", function() {
                return { elements: that.optionLabel, data: [{ dataItem: that._optionLabelDataItem() }] };
            });
        },

        _optionLabelText: function() {
            var optionLabel = this.options.optionLabel;
            return (typeof optionLabel === "string") ? optionLabel : this._text(optionLabel);
        },

        _optionLabelDataItem: function() {
            var that = this;
            var optionLabel = that.options.optionLabel;

            if (that.hasOptionLabel()) {
                return $.isPlainObject(optionLabel) ? new ObservableObject(optionLabel) : that._assignInstance(that._optionLabelText(), "");
            }

            return undefined;
        },

        _buildOptions: function(data) {
            var that = this;
            if (!that._isSelect) {
                return;
            }

            var value = that.listView.value()[0];
            var optionLabel = that._optionLabelDataItem();
            var optionLabelValue = optionLabel && that._value(optionLabel);

            if (value === undefined || value === null) {
                value = "";
            }

            if (optionLabel) {
                if (optionLabelValue === undefined || optionLabelValue === null) {
                    optionLabelValue = "";
                }

                optionLabel = '<option value="' + optionLabelValue + '">' + that._text(optionLabel) + "</option>";
            }

            that._options(data, optionLabel, value);

            if (value !== List.unifyType(that._accessor(), typeof value)) {
                that._customOption = null;
                that._custom(value);
            }
        },

        _listBound: function() {

            var that = this;
            var initialIndex = that._initialIndex;
            var filtered = that._state === STATE_FILTER;

            var data = that.dataSource.flatView();
            var dataItem;

            that._presetValue = false;

            that._renderFooter();
            that._renderNoData();
            that._toggleNoData(!data.length);

            that._resizePopup(true);

            that.popup.position();

            that._buildOptions(data);

            if (!filtered) {
                if (that._open) {
                    that.toggle(that._allowOpening());
                }

                that._open = false;

                if (!that._fetch) {
                    if (data.length) {
                        if (!that.listView.value().length && initialIndex > -1 && initialIndex !== null) {
                            that.select(initialIndex);
                        }

                        that._initialIndex = null;
                        dataItem = that.listView.selectedDataItems()[0];
                        if (dataItem && that.text() !== that._text(dataItem)) {
                            that._selectValue(dataItem);
                        }
                    } else if (that._textAccessor() !== that._optionLabelText()) {
                        that.listView.value("");
                        that._selectValue(null);
                        that._oldIndex = that.selectedIndex;
                    }
                }
            }

            that._hideBusy();
            that.trigger("dataBound");
        },

        _listChange: function() {
            this._selectValue(this.listView.selectedDataItems()[0]);

            if (this._presetValue || (this._old && this._oldIndex === -1)) {
                this._oldIndex = this.selectedIndex;
            }
        },

        _filterPaste: function() {
            this._search();
        },

        _attachFocusHandlers: function() {
            var that = this;
            var wrapper = that.wrapper;

            wrapper.on("focusin" + nsFocusEvent, that._focusinHandler.bind(that))
                   .on("focusout" + nsFocusEvent, that._focusoutHandler.bind(that));
            if(that.filterInput) {
                that.filterInput.on("focusin" + nsFocusEvent, that._focusinHandler.bind(that))
                   .on("focusout" + nsFocusEvent, that._focusoutHandler.bind(that));
            }
        },

        _focusHandler: function() {
            this.wrapper.trigger("focus");
        },

        _focusinHandler: function() {
            this.wrapper.addClass(FOCUSED);
            this._prevent = false;
        },

        _focusoutHandler: function() {
            var that = this;
            var isIFrame = window.self !== window.top;

            if (!that._prevent) {
                clearTimeout(that._typingTimeout);

                if (support.mobileOS.ios && isIFrame) {
                    that._change();
                } else {
                    that._blur();
                }

                that.wrapper.removeClass(FOCUSED);
                that._prevent = true;
                that._open = false;
                that.element.trigger("blur");
            }
        },

        _wrapperMousedown: function() {
            this._prevent = !!this.filterInput;
        },

        _wrapperClick: function(e) {
            e.preventDefault();
            this.popup.unbind("activate", this._focusInputHandler);
            this._focused = this.wrapper;
            this._prevent = false;
            this._toggle();
        },

        _editable: function(options) {
            var that = this;
            var element = that.element;
            var disable = options.disable;
            var readonly = options.readonly;
            var wrapper = that.wrapper.add(that.filterInput).off(ns);
            var dropDownWrapper = that.wrapper.off(HOVEREVENTS);

            if (!readonly && !disable) {
                element.prop(DISABLED, false).prop(READONLY, false);

                dropDownWrapper
                    .removeClass(STATEDISABLED)
                    .on(HOVEREVENTS, that._toggleHover);

                wrapper
                    .attr(TABINDEX, wrapper.data(TABINDEX))
                    .attr(ARIA_DISABLED, false)
                    .attr(ARIA_READONLY, false)
                    .on("keydown" + ns, that, that._keydown.bind(that))
                    .on(kendo.support.mousedown + ns, that._wrapperMousedown.bind(that))
                    .on("paste" + ns, that._filterPaste.bind(that));

                that.wrapper.on("click" + ns, that._wrapperClick.bind(that));

                if (!that.filterInput) {
                    wrapper.on("keypress" + ns, that._keypress.bind(that));
                } else {
                    wrapper.on("input" + ns, that._search.bind(that));
                }

            } else if (disable) {
                wrapper.removeAttr(TABINDEX);
                dropDownWrapper.addClass(STATEDISABLED);
            } else {
                dropDownWrapper.removeClass(STATEDISABLED);
            }

            element.attr(DISABLED, disable)
                   .attr(READONLY, readonly);

            wrapper.attr(ARIA_DISABLED, disable)
                    .attr(ARIA_READONLY, readonly);
        },

        _keydown: function(e) {
            var that = this;
            var key = e.keyCode;
            var altKey = e.altKey;
            var isInputActive;
            var handled;

            var isPopupVisible = that.popup.visible();

            if (that.filterInput) {
                isInputActive = that.filterInput[0] === activeElement();
            }

            if (key === keys.LEFT) {
                key = keys.UP;
                handled = true;
            } else if (key === keys.RIGHT) {
                key = keys.DOWN;
                handled = true;
            }

            if (handled && isInputActive) {
                return;
            }

            e.keyCode = key;

            if ((altKey && key === keys.UP) || key === keys.ESC) {
                that._focusElement(that.wrapper);
            }

            if (that._state === STATE_FILTER && key === keys.ESC) {
                that._clearFilter();
                that._open = false;
                that._state = STATE_ACCEPT;
            }

            if (key === keys.ENTER && that._typingTimeout && that.filterInput && isPopupVisible) {
                e.preventDefault();
                return;
            }

            if (key === keys.SPACEBAR && !isInputActive) {
                that.toggle(!isPopupVisible);
                e.preventDefault();
            }

            handled = that._move(e);

            if (handled) {
                return;
            }

            if (!isPopupVisible || !that.filterInput) {
                var current = that._focus();

                if (key === keys.HOME) {
                    handled = true;
                    that._firstItem();
                } else if (key === keys.END) {
                    handled = true;
                    that._lastItem();
                }

                if (handled) {
                    if (that.trigger("select", { dataItem: that._getElementDataItem(that._focus()), item: that._focus() })) {
                        that._focus(current);
                        return;
                    }

                    that._select(that._focus(), true).done(function() {
                        if (!isPopupVisible) {
                            that._blur();
                        }
                    });
                    e.preventDefault();
                }
            }

            if (!altKey && !handled && that.filterInput) {
                that._search();
            }
        },

        _matchText: function(text, word) {
            var ignoreCase = this.options.ignoreCase;

            if (text === undefined || text === null) {
                return false;
            }

            text = text + "";

            if (ignoreCase) {
                text = text.toLowerCase();
            }

            return text.indexOf(word) === 0;
        },

        _shuffleData: function(data, splitIndex) {
            var optionDataItem = this._optionLabelDataItem();

            if (optionDataItem) {
                data = [optionDataItem].concat(data);
            }

            return data.slice(splitIndex).concat(data.slice(0, splitIndex));
        },

        _selectNext: function() {
            var that = this;
            var data = that.dataSource.flatView();
            var dataLength = data.length + (that.hasOptionLabel() ? 1 : 0);
            var isInLoop = sameCharsOnly(that._word, that._last);
            var startIndex = that.selectedIndex;
            var oldFocusedItem;
            var text;

            if (startIndex === -1) {
                startIndex = 0;
            } else {
                startIndex += isInLoop ? 1 : 0;
                startIndex = normalizeIndex(startIndex, dataLength);
            }

            data = data.toJSON ? data.toJSON() : data.slice();
            data = that._shuffleData(data, startIndex);

            for (var idx = 0; idx < dataLength; idx++) {
                text = that._text(data[idx]);

                if (isInLoop && that._matchText(text, that._last)) {
                    break;
                } else if (that._matchText(text, that._word)) {
                    break;
                }
            }

            if (idx !== dataLength) {
                oldFocusedItem = that._focus();

                that._select(normalizeIndex(startIndex + idx, dataLength)).done(function() {
                    var done = function() {
                        if (!that.popup.visible()) {
                            that._change();
                        }
                    };

                    if (that.trigger("select", { dataItem: that._getElementDataItem(that._focus()), item: that._focus() })) {
                        that._select(oldFocusedItem).done(done);
                    } else {
                        done();
                    }
                });
            }
        },

        _keypress: function(e) {
            var that = this;

            if (e.which === 0 || e.keyCode === kendo.keys.ENTER) {
                return;
            }

            var character = String.fromCharCode(e.charCode || e.keyCode);

            if (that.options.ignoreCase) {
                character = character.toLowerCase();
            }

            if (character === " ") {
                e.preventDefault();
            }

            that._word += character;
            that._last = character;

            that._search();
        },

        _popupOpen: function() {
            var popup = this.popup;

            popup.wrapper = kendo.wrap(popup.element);

            if (popup.element.closest(".km-root")[0]) {
                popup.wrapper.addClass("km-popup km-widget");
                this.wrapper.addClass("km-widget");
            }
        },

        _popup: function() {
            Select.fn._popup.call(this);
            this.popup.one("open", this._popupOpen.bind(this));
        },

        _getElementDataItem: function(element) {
            if (!element || !element[0]) {
                return null;
            }

            if (element[0] === this.optionLabel[0]) {
                return this._optionLabelDataItem();
            }

            return this.listView.dataItemByIndex(this.listView.getElementIndex(element));
        },

        _click: function (e) {
            var that = this;
            var item = e.item || $(e.currentTarget);

            e.preventDefault();

            if (that.trigger("select", { dataItem: that._getElementDataItem(item), item: item })) {
                that.close();
                return;
            }

            that._userTriggered = true;

            that._select(item).done(function() {
                that._blur();
                that._focusElement(that.wrapper);
            });
        },

        _focusElement: function(element) {
            var active = activeElement();
            var wrapper = this.wrapper;
            var filterInput = this.filterInput;
            var compareElement = element === filterInput ? wrapper : filterInput;
            var touchEnabled = support.mobileOS && (support.touch || support.MSPointers || support.pointers);

            if (filterInput && filterInput[0] === element[0] && touchEnabled) {
                return;
            }

            if (filterInput && (compareElement[0] === active || this._focusFilter)) {
                this._focusFilter = false;
                this._prevent = true;
                this._focused = element.trigger("focus");
            }
        },

        _searchByWord: function(word) {
            if (!word) {
                return;
            }

            var that = this;
            var ignoreCase = that.options.ignoreCase;

            if (ignoreCase) {
                word = word.toLowerCase();
            }

            that._select(function(dataItem) {
                return that._matchText(that._text(dataItem), word);
            });
        },

        _inputValue: function() {
            return this.text();
        },

        _search: function() {
            var that = this;
            var dataSource = that.dataSource;

            clearTimeout(that._typingTimeout);

            if (that._isFilterEnabled()) {
                that._typingTimeout = setTimeout(function() {
                    var value = that.filterInput.val();

                    if (that._prev !== value) {
                        that._prev = value;
                        that.search(value);
                        that._resizeFilterInput();
                    }

                    that._typingTimeout = null;
                }, that.options.delay);
            } else {
                that._typingTimeout = setTimeout(function() {
                    that._word = "";
                }, that.options.delay);

                if (!that.listView.bound()) {
                    dataSource.fetch().done(function () {
                        that._selectNext();
                    });
                    return;
                }

                that._selectNext();
            }
        },

        _get: function(candidate) {
            var data, found, idx;
            var isFunction = typeof candidate === "function";
            var jQueryCandidate = !isFunction ? $(candidate) : $();

            if (this.hasOptionLabel()) {
                if (typeof candidate === "number") {
                    if (candidate > -1) {
                        candidate -= 1;
                    }
                } else if (jQueryCandidate.hasClass("k-list-optionlabel")) {
                    candidate = -1;
                }
            }

            if (isFunction) {
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

        _firstItem: function() {
            if (this.hasOptionLabel()) {
                this._focus(this.optionLabel);
            } else {
                this.listView.focusFirst();
            }
        },

        _lastItem: function() {
            this._resetOptionLabel();
            this.listView.focusLast();
        },

        _nextItem: function() {
            var focusIndex;

            if (this.optionLabel.hasClass("k-focus")) {
                this._resetOptionLabel();
                this.listView.focusFirst();
                focusIndex = 1;
            } else {
                focusIndex = this.listView.focusNext();
            }

            return focusIndex;
        },

        _prevItem: function() {
            var focusIndex;

            if (this.optionLabel.hasClass("k-focus")) {
                return;
            }

            focusIndex = this.listView.focusPrev();

            if (!this.listView.focus() && !this.options.virtual) {
                this._focus(this.optionLabel);
            }

            return focusIndex;
        },

        _focusItem: function() {
            var options = this.options;
            var listView = this.listView;
            var focusedItem = listView.focus();
            var index = listView.select();

            index = index[index.length - 1];

            if (index === undefined && options.highlightFirst && !focusedItem) {
                index = 0;
            }

            if (index !== undefined) {
                listView.focus(index);
            } else {
                if (options.optionLabel && (!options.virtual || options.virtual.mapValueTo !== "dataItem")) {
                    this._focus(this.optionLabel);
                    this._select(this.optionLabel);
                    this.listView.content.scrollTop(0);
                } else {
                    listView.scrollToIndex(0);
                }
            }
        },

        _resetOptionLabel: function(additionalClass) {
            this.optionLabel.removeClass("k-focus" + (additionalClass || "")).removeAttr("id");
        },

        _focus: function(candidate) {
            var listView = this.listView;
            var optionLabel = this.optionLabel;

            if (candidate === undefined) {
                candidate = listView.focus();

                if (!candidate && optionLabel.hasClass("k-focus")) {
                    candidate = optionLabel;
                }

                return candidate;
            }

            this._resetOptionLabel();

            candidate = this._get(candidate);

            listView.focus(candidate);

            if (candidate === -1) {
                optionLabel.addClass("k-focus")
                           .attr("id", listView._optionID);

                if (this.filterInput) {
                    this.filterInput
                        .removeAttr("aria-activedescendant")
                        .attr("aria-activedescendant", listView._optionID);
                }
            }
        },

        _select: function(candidate, keepState) {
            var that = this;

            candidate = that._get(candidate);

            return that.listView.select(candidate).done(function() {
                if (!keepState && that._state === STATE_FILTER) {
                    that._state = STATE_ACCEPT;
                }

                if (candidate === -1) {
                    that._selectValue(null);
                }
            });
        },

        _selectValue: function(dataItem) {
            var that = this;
            var optionLabel = that.options.optionLabel;
            var idx = that.listView.select();

            var value = "";
            var text = "";

            idx = idx[idx.length - 1];
            if (idx === undefined) {
                idx = -1;
            }

            this._resetOptionLabel(" k-selected");

            if (dataItem || dataItem === 0) {
                text = dataItem;
                value = that._dataValue(dataItem);
                if (optionLabel) {
                    idx += 1;
                }
            } else if (optionLabel) {
                that._focus(that.optionLabel.addClass("k-selected"));

                text = that._optionLabelText();

                if (typeof optionLabel === "string") {
                    value = "";
                } else {
                    value = that._value(optionLabel);
                }

                idx = 0;
            }

            that.selectedIndex = idx;

            if (value === null) {
                value = "";
            }

            that._textAccessor(text);
            that._accessor(value, idx);

            that._triggerCascade();
        },

        _mobile: function() {
            var that = this,
                popup = that.popup,
                mobileOS = support.mobileOS,
                root = popup.element.parents(".km-root").eq(0);

            if (root.length && mobileOS) {
                popup.options.animation.open.effects = (mobileOS.android || mobileOS.meego) ? "fadeIn" : (mobileOS.ios || mobileOS.wp) ? "slideIn:up" : popup.options.animation.open.effects;
            }
        },

        _filterHeader: function() {
            var filterTemplate = '<div class="k-list-filter">' +
                '<span class="k-searchbox k-input k-input-md k-rounded-md k-input-solid" type="text" autocomplete="off">' +
                    '<span class="k-input-icon k-icon k-i-search"></span>' +
                '</span>' +
            '</div>';

            if (this.filterInput) {
                this.filterInput
                    .off(ns)
                    .closest(".k-list-filter")
                    .remove();

                this.filterInput = null;
            }

            if (this._isFilterEnabled()) {
                this.filterInput = $('<input class="k-input-inner" type="text" />')
                    .attr({
                        placeholder: this.element.attr("placeholder"),
                        title: this.options.filterTitle || this.element.attr("title"),
                        role: "searchbox",
                        "aria-label": this.options.filterTitle,
                        "aria-haspopup": "listbox",
                        "aria-autocomplete": "list"
                    });

                this.list
                    .parent()
                    .prepend($(filterTemplate))
                    .find(".k-searchbox")
                    .append(this.filterInput);
            }
        },

        _span: function() {
            var that = this,
                wrapper = that.wrapper,
                SELECTOR = "span.k-input-value-text",
                id = kendo.guid(),
                options = that.options,
                span, arrowBtn;

            span = wrapper.find(SELECTOR);

            if (!span[0]) {
                arrowBtn = html.renderButton('<button type="button" tabindex="-1" unselectable="on" class="k-input-button" aria-label="select"></button>', {
                    icon: "arrow-s",
                    size: options.size,
                    fillMode: options.fillMode,
                    shape: null,
                    rounded: null
                });

                wrapper.append('<span id="' + id + '" unselectable="on" class="k-input-inner">' +
                            '<span class="k-input-value-text"></span>' +
                        '</span>')
                    .append(arrowBtn)
                    .append(that.element);

                span = wrapper.find(SELECTOR);
            }

            that.span = span;
            that._arrow = wrapper.find(".k-input-button");
            that._arrowIcon = that._arrow.find(".k-icon");
        },

        _wrapper: function() {
            var that = this,
                element = that.element,
                DOMelement = element[0],
                wrapper;

            wrapper = element.parent();

            if (!wrapper.is("span.k-picker")) {
                wrapper = element.wrap("<span />").parent();
                wrapper[0].style.cssText = DOMelement.style.cssText;
                wrapper[0].title = DOMelement.title;
            }

            that._focused = that.wrapper = wrapper
                .addClass("k-picker k-dropdownlist")
                .addClass(DOMelement.className)
                .removeClass('input-validation-error')
                .css("display", "")
                .attr({
                    accesskey: element.attr("accesskey"),
                    unselectable: "on",
                    role: "combobox",
                    "aria-haspopup": "listbox",
                    "aria-expanded": false
                });

            element.hide().removeAttr("accesskey");
        },

        _clearSelection: function(parent) {
            this.select(parent.value() ? 0 : -1);
        },

        _openHandler: function(e) {
            this._adjustListWidth();

            if (this.trigger(OPEN)) {
                e.preventDefault();
            } else {
                this.wrapper.attr("aria-expanded", true);
                this.ul.attr("aria-hidden", false);
            }
        },

        _closeHandler: function(e) {
            if (this.trigger(CLOSE)) {
                e.preventDefault();
            } else {
                this.wrapper.attr("aria-expanded", false);
                this.ul.attr("aria-hidden", true);
            }
        },

        _inputTemplate: function() {
            var that = this,
                template = that.options.valueTemplate;


            if (!template) {
                template = kendo.template('#:this._text(data)#', { useWithBlock: false }).bind(that);
            } else {
                template = kendo.template(template);
            }

            that.valueTemplate = template;

            if (that.hasOptionLabel() && !that.options.optionLabelTemplate) {
                try {
                    that.valueTemplate(that._optionLabelDataItem());
                } catch(e) {
                    throw new Error(MSG_INVALID_OPTION_LABEL);
                }
            }
        },

        _textAccessor: function(text) {
            var dataItem = null;
            var template = this.valueTemplate;
            var optionLabelText = this._optionLabelText();
            var span = this.span;

            if (text === undefined) {
                return span.text();
            }

            if ($.isPlainObject(text) || text instanceof ObservableObject) {
                dataItem = text;
            } else if (optionLabelText && optionLabelText === text) {
                dataItem = this.options.optionLabel;
            }

            if (!dataItem) {
                dataItem = this._assignInstance(text, this._accessor());
            }

            if (this.hasOptionLabel()) {
                if (dataItem === optionLabelText || this._text(dataItem) === optionLabelText) {
                    template = this.optionLabelTemplate;

                    if (typeof this.options.optionLabel === "string" && !this.options.optionLabelTemplate) {
                        dataItem = optionLabelText;
                    }
                }
            }

            var getElements = function(){
                return {
                    elements: span.get(),
                    data: [ { dataItem: dataItem } ]
                };
            };

            this.angular("cleanup", getElements);

            try {
                span.html(template(dataItem));
            } catch(e) {
                //dataItem has missing fields required in custom template
                span.html("");
            }

            this.angular("compile", getElements);
        },

        _preselect: function(value, text) {
            if (!value && !text) {
                text = this._optionLabelText();
            }

            this._accessor(value);
            this._textAccessor(text);

            this._old = this._accessor();
            this._oldIndex = this.selectedIndex;

            this.listView.setValue(value);

            this._initialIndex = null;
            this._presetValue = true;
        },

        _assignInstance: function(text, value) {
            var dataTextField = this.options.dataTextField;
            var dataItem = {};

            if (dataTextField) {
                assign(dataItem, dataTextField.split("."), text);
                assign(dataItem, this.options.dataValueField.split("."), value);
                dataItem = new ObservableObject(dataItem);
            } else {
                dataItem = text;
            }

            return dataItem;
        }
    });

    function assign(instance, fields, value) {
        var idx = 0,
            lastIndex = fields.length - 1,
            field;

        for (; idx < lastIndex; ++idx) {
            field = fields[idx];

            if (!(field in instance)) {
                instance[field] = {};
            }

            instance = instance[field];
        }

        instance[fields[lastIndex]] = value;
    }

    function normalizeIndex(index, length) {
        if (index >= length) {
            index -= length;
        }
        return index;
    }

    function sameCharsOnly(word, character) {
        for (var idx = 0; idx < word.length; idx++) {
            if (word.charAt(idx) !== character) {
                return false;
            }
        }
        return true;
    }

    ui.plugin(DropDownList);

    kendo.cssProperties.registerPrefix("DropDownList", "k-picker-");

    kendo.cssProperties.registerValues("DropDownList", [{
        prop: "rounded",
        values: kendo.cssProperties.roundedValues.concat([['full', 'full']])
    }]);
})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
