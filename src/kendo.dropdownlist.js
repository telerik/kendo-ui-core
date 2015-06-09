(function(f, define){
    define([ "./kendo.list", "./kendo.mobile.scroller" ], f);
})(function(){

var __meta__ = {
    id: "dropdownlist",
    name: "DropDownList",
    category: "web",
    description: "The DropDownList widget displays a list of values and allows the selection of a single value from the list.",
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
        Select = ui.Select,
        support = kendo.support,
        activeElement = kendo._activeElement,
        ObservableObject = kendo.data.ObservableObject,
        keys = kendo.keys,
        ns = ".kendoDropDownList",
        DISABLED = "disabled",
        READONLY = "readonly",
        CHANGE = "change",
        FOCUSED = "k-state-focused",
        DEFAULT = "k-state-default",
        STATEDISABLED = "k-state-disabled",
        ARIA_DISABLED = "aria-disabled",
        ARIA_READONLY = "aria-readonly",
        SELECTED = "k-state-selected",
        HOVEREVENTS = "mouseenter" + ns + " mouseleave" + ns,
        TABINDEX = "tabindex",
        STATE_FILTER = "filter",
        STATE_ACCEPT = "accept",
        proxy = $.proxy;

    var DropDownList = Select.extend( {
        init: function(element, options) {
            var that = this;
            var index = options && options.index;
            var optionLabel, text, disabled;

            that.ns = ns;
            options = $.isArray(options) ? { dataSource: options } : options;

            Select.fn.init.call(that, element, options);

            options = that.options;
            element = that.element.on("focus" + ns, proxy(that._focusHandler, that));

            that._focusInputHandler = $.proxy(that._focusInput, that);
            that._inputTemplate();

            that._reset();

            that._prev = "";
            that._word = "";
            that.optionLabel = $();

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

            that._oldIndex = that.selectedIndex = -1;

            if (index !== undefined) {
                options.index = index;
            }

            that._initialIndex = options.index;
            that._optionLabel();
            that._initList();

            that._cascade();

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

            kendo.notify(that);
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
            ignoreCase: true,
            animation: {},
            filter: "none",
            minLength: 1,
            virtual: false,
            template: null,
            valueTemplate: null,
            optionLabelTemplate: null,
            groupTemplate: "#:data#",
            fixedGroupTemplate: "#:data#"
        },

        events: [
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

            this.listView.setOptions(this._listOptions(options));

            this._optionLabel();
            this._inputTemplate();
            this._accessors();
            this._filterHeader();
            this._enable();
            this._aria();

            if (!this.value() && this.optionLabel[0]) {
                this.select(0);
            }
        },

        destroy: function() {
            var that = this;

            that.wrapper.off(ns);
            that.element.off(ns);
            that._inputWrapper.off(ns);

            that._arrow.off();
            that._arrow = null;

            that.optionLabel.off();

            Select.fn.destroy.call(that);
        },

        open: function() {
            var that = this;

            if (that.popup.visible()) {
                return;
            }

            if (!that.listView.isBound() || that._state === STATE_ACCEPT) {
                that._open = true;
                that._state = "rebind";

                if (that.filterInput) {
                    that.filterInput.val("");
                    that._prev = "";
                }

                that._filterSource();
            } else if (that._allowOpening()) {
                that.popup.one("activate", that._focusInputHandler);
                that.popup.open();
                that._focusItem();
            }
        },

        _focusInput: function () {
            this._focusElement(this.filterInput);
        },

        toggle: function(toggle) {
            this._toggle(toggle, true);
        },

        _allowOpening: function(length) {
            return this.optionLabel[0] || this.filterInput || this.dataSource.view().length;
        },

        current: function(candidate) {
            var current;

            if (candidate === undefined) {
                current = this.listView.focus();

                if (!current && this.selectedIndex === 0 && this.optionLabel[0]) {
                    return this.optionLabel;
                }

                return current;
            }

            this._focus(candidate);
        },

        dataItem: function(index) {
            var that = this;
            var dataItem = null;
            var hasOptionLabel = !!that.optionLabel[0];
            var optionLabel = that.options.optionLabel;

            if (index === undefined) {
                dataItem = that.listView.selectedDataItems()[0];
            } else {
                if (typeof index !== "number") {
                    if (index.hasClass("k-list-optionlabel")) {
                        index = -1;
                    } else {
                        index = $(that.items()).index(index);
                    }
                } else if (hasOptionLabel) {
                    index -= 1;
                }

                dataItem = that.dataSource.flatView()[index];
            }

            if (!dataItem && hasOptionLabel) {
                dataItem = $.isPlainObject(optionLabel) ? new ObservableObject(optionLabel) : that._assignInstance(that._optionLabelText(), "");
            }

            return dataItem;
        },

        refresh: function() {
            this.listView.refresh();
        },

        text: function (text) {
            var that = this;
            var dataItem, loweredText;
            var ignoreCase = that.options.ignoreCase;

            text = text === null ? "" : text;

            if (text !== undefined) {
                if (typeof text === "string") {
                    loweredText = ignoreCase ? text.toLowerCase() : text;

                    that._select(function(data) {
                        data = that._text(data);

                        if (ignoreCase) {
                            data = (data + "").toLowerCase();
                        }

                        return data === loweredText;
                    });

                    dataItem = that.dataItem();

                    if (dataItem) {
                        text = dataItem;
                    }
                }

                that._textAccessor(text);
            } else {
                return that._textAccessor();
            }
        },

        value: function(value) {
            var that = this;

            if (value === undefined) {
                value = that._accessor() || that.listView.value()[0];
                return value === undefined || value === null ? "" : value;
            }

            if (value) {
                that._initialIndex = null;
            }

            that.listView.value(value).done(function() {
                that._triggerCascade();

                if (that.selectedIndex === -1 && that.text()) {
                    that.text("");
                    that._accessor("", -1);
                }

                that._old = that._accessor();
                that._oldIndex = that.selectedIndex;
            });

            that._fetchData();
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

            if (!that.optionLabel[0]) {
                that.optionLabel = $('<div class="k-list-optionlabel"></div>').prependTo(that.list);
            }

            that.optionLabel.html(template(optionLabel))
                            .off()
                            .click(proxy(that._click, that))
                            .on(HOVEREVENTS, that._toggleHover);

            that.angular("compile", function(){
                return { elements: that.optionLabel };
            });
        },

        _optionLabelText: function() {
            var optionLabel = this.options.optionLabel;
            return (typeof optionLabel === "string") ? optionLabel : this._text(optionLabel);
        },

        _listBound: function() {
            var that = this;
            var initialIndex = that._initialIndex;
            var optionLabel = that.options.optionLabel;
            var filtered = that._state === STATE_FILTER;
            var element = that.element[0];

            var data = that.dataSource.flatView();
            var length = data.length;
            var dataItem;

            var height;
            var value;

            that._angularItems("compile");

            that._presetValue = false;

            if (!that.options.virtual) {
                height = that._height(filtered ? (length || 1) : length);
                that._calculateGroupPadding(height);
            }

            that.popup.position();

            if (that._isSelect) {
                value = that.value();

                if (length) {
                    if (optionLabel) {
                        optionLabel = that._option("", that._optionLabelText());
                    }
                } else if (value) {
                    optionLabel = that._option(value, that.text());
                }

                that._options(data, optionLabel, value);
            }

            that._makeUnselectable();

            if (!filtered) {
                if (that._open) {
                    that.toggle(that._allowOpening());
                }

                that._open = false;

                if (!that._fetch) {
                    if (length) {
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

        _focusHandler: function() {
            this.wrapper.focus();
        },

        _focusinHandler: function() {
            this._inputWrapper.addClass(FOCUSED);
            this._prevent = false;
        },

        _focusoutHandler: function() {
            var that = this;
            var filtered = that._state === STATE_FILTER;
            var isIFrame = window.self !== window.top;
            var focusedItem = that._focus();

            if (!that._prevent) {
                clearTimeout(that._typingTimeout);

                if (filtered && focusedItem && !that.trigger("select", { item: focusedItem })) {
                    that._select(focusedItem, !that.dataSource.view().length);
                }

                if (support.mobileOS.ios && isIFrame) {
                    that._change();
                } else {
                    that._blur();
                }

                that._inputWrapper.removeClass(FOCUSED);
                that._prevent = true;
                that._open = false;
                that.element.blur();
            }
        },

        _wrapperMousedown: function() {
            this._prevent = !!this.filterInput;
        },

        _wrapperClick: function(e) {
            e.preventDefault();
            this.popup.unbind("activate", this._focusInputHandler);
            this._focused = this.wrapper;
            this._toggle();
        },

        _editable: function(options) {
            var that = this;
            var element = that.element;
            var disable = options.disable;
            var readonly = options.readonly;
            var wrapper = that.wrapper.add(that.filterInput).off(ns);
            var dropDownWrapper = that._inputWrapper.off(HOVEREVENTS);

            if (!readonly && !disable) {
                element.removeAttr(DISABLED).removeAttr(READONLY);

                dropDownWrapper
                    .addClass(DEFAULT)
                    .removeClass(STATEDISABLED)
                    .on(HOVEREVENTS, that._toggleHover);

                wrapper
                    .attr(TABINDEX, wrapper.data(TABINDEX))
                    .attr(ARIA_DISABLED, false)
                    .attr(ARIA_READONLY, false)
                    .on("keydown" + ns, proxy(that._keydown, that))
                    .on("focusin" + ns, proxy(that._focusinHandler, that))
                    .on("focusout" + ns, proxy(that._focusoutHandler, that))
                    .on("mousedown" + ns, proxy(that._wrapperMousedown, that));

                that.wrapper.on("click" + ns, proxy(that._wrapperClick, that));

                if (!that.filterInput) {
                    wrapper.on("keypress" + ns, proxy(that._keypress, that));
                }

            } else if (disable) {
                wrapper.removeAttr(TABINDEX);
                dropDownWrapper
                    .addClass(STATEDISABLED)
                    .removeClass(DEFAULT);
            } else {
                dropDownWrapper
                    .addClass(DEFAULT)
                    .removeClass(STATEDISABLED);

                wrapper
                    .on("focusin" + ns, proxy(that._focusinHandler, that))
                    .on("focusout" + ns, proxy(that._focusoutHandler, that));
            }

            element.attr(DISABLED, disable)
                   .attr(READONLY, readonly);

            wrapper.attr(ARIA_DISABLED, disable)
                   .attr(ARIA_READONLY, readonly);
        },

        _option: function(value, text) {
            return '<option value="' + value + '">' + text + "</option>";
        },

        _keydown: function(e) {
            var that = this;
            var key = e.keyCode;
            var altKey = e.altKey;
            var ul = that.ul[0];
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

            if (altKey && key === keys.UP) {
                that._focusElement(that.wrapper);
            }

            if (key === keys.ENTER && that._typingTimeout && that.filterInput && isPopupVisible) {
                e.preventDefault();
                return;
            }

            handled = that._move(e);

            if (handled) {
                return;
            }

            if (!isPopupVisible || !that.filterInput) {
                if (key === keys.HOME) {
                    handled = true;
                    that._firstItem();
                } else if (key === keys.END) {
                    handled = true;
                    that._lastItem();
                }

                if (handled) {
                    that._select(that._focus());
                    e.preventDefault();
                }
            }

            if (!altKey && !handled && that.filterInput) {
                that._search();
            }
        },

        _matchText: function(text, index) {
            var that = this;
            var ignoreCase = that.options.ignoreCase;
            var found = false;

            text = text + "";

            if (ignoreCase) {
                text = text.toLowerCase();
            }

            if (text.indexOf(that._word) === 0) {
                if (that.optionLabel[0]) {
                    index += 1;
                }

                that._select(index);
                if (!that.popup.visible()) {
                    that._change();
                }

                found = true;
            }

            return found;
        },

        _selectNext: function(index) {
            var that = this;
            var startIndex = index;
            var data = that.dataSource.flatView();
            var length = data.length;
            var text;

            for (; index < length; index++) {
                text = that._text(data[index]);

                if (text && that._matchText(text, index) && !(that._word.length === 1 && startIndex === that.selectedIndex)) {
                    return true;
                }
            }

            if (startIndex > 0 && startIndex < length) {
                index = 0;
                for (; index <= startIndex; index++) {
                    text = that._text(data[index]);
                    if (text && that._matchText(text, index)) {
                        return true;
                    }
                }
            }

            return false;
        },

        _keypress: function(e) {
            var that = this;

            if (e.which === 0 || e.keyCode === kendo.keys.ENTER) {
                return;
            }

            var character = String.fromCharCode(e.charCode || e.keyCode);
            var index = that.selectedIndex;
            var length = that._word.length;

            if (that.options.ignoreCase) {
                character = character.toLowerCase();
            }

            if (character === " ") {
                e.preventDefault();
            }

            if (!length) {
                that._word = character;
            }

            if (that._last === character && length <= 1 && index > -1) {
                if (that._selectNext(index)) {
                    return;
                }
            }

            if (length) {
                that._word += character;
            }

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
            this.popup.one("open", proxy(this._popupOpen, this));
        },

        _click: function (e) {
            var item = e.item || $(e.currentTarget);

            if (this.trigger("select", { item: item })) {
                this.close();
                return;
            }

            this._userTriggered = true;

            this._select(item);
            this._focusElement(this.wrapper);

            this._blur();
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

            if (filterInput && compareElement[0] === active) {
                this._prevent = true;
                this._focused = element.focus();
            }
        },

        _filter: function(word) {
            if (word) {
                var that = this;
                var ignoreCase = that.options.ignoreCase;

                if (ignoreCase) {
                    word = word.toLowerCase();
                }

                that._select(function(dataItem) {
                    var text = that._text(dataItem);

                    if (text !== undefined) {
                        text = (text + "");
                        if (ignoreCase) {
                            text = text.toLowerCase();
                        }

                        return text.indexOf(word) === 0;
                    }
                });
            }
        },

        _search: function() {
            var that = this;
            var dataSource = that.dataSource;
            var index = that.selectedIndex;

            clearTimeout(that._typingTimeout);

            if (that.options.filter !== "none") {
                that._typingTimeout = setTimeout(function() {
                    var value = that.filterInput.val();

                    if (that._prev !== value) {
                        that._prev = value;
                        that.search(value);
                    }

                    that._typingTimeout = null;
                }, that.options.delay);
            } else {
                that._typingTimeout = setTimeout(function() {
                    that._word = "";
                }, that.options.delay);

                if (index === -1) {
                    index = 0;
                }

                if (!that.ul[0].firstChild) {
                    dataSource.fetch().done(function () {
                        if (dataSource.data()[0] && index > -1) {
                            that._selectNext(index);
                        }
                    });
                    return;
                }

                that._selectNext(index);
            }
        },

        _get: function(candidate) {
            var data, found, idx;
            var jQueryCandidate = $(candidate);

            if (this.optionLabel[0]) {
                if (typeof candidate === "number") {
                    if (candidate > -1) {
                        candidate -= 1;
                    }
                } else if (jQueryCandidate.hasClass("k-list-optionlabel")) {
                    candidate = -1;
                }
            }

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

        _firstItem: function() {
            if (this.optionLabel[0]) {
                this._focus(this.optionLabel);
            } else {
                this.listView.first();
            }
        },

        _lastItem: function() {
            this.optionLabel.removeClass("k-state-focused");
            this.listView.last();
        },

        _nextItem: function() {
            if (this.optionLabel.hasClass("k-state-focused")) {
                this.optionLabel.removeClass("k-state-focused");
                this.listView.first();
            } else {
                this.listView.next();
            }
        },

        _prevItem: function() {
            if (this.optionLabel.hasClass("k-state-focused")) {
                return;
            }

            this.listView.prev();
            if (!this.listView.focus()) {
                this.optionLabel.addClass("k-state-focused");
            }
        },

        _focusItem: function() {
            var listView = this.listView;
            var focusedItem = listView.focus();
            var index = listView.select();

            index = index[index.length - 1];

            if (index === undefined && this.options.highlightFirst && !focusedItem) {
                index = 0;
            }

            if (index !== undefined) {
                listView.focus(index);
            } else {
                if (this.options.optionLabel) {
                    this._focus(this.optionLabel);
                    this._select(this.optionLabel);
                } else {
                    listView.scrollToIndex(0);
                }
            }
        },

        _focus: function(candidate) {
            var listView = this.listView;
            var optionLabel = this.optionLabel;

            if (candidate === undefined) {
                candidate = listView.focus();

                if (!candidate && optionLabel.hasClass("k-state-focused")) {
                    candidate = optionLabel;
                }

                return candidate;
            }

            optionLabel.removeClass("k-state-focused");

            candidate = this._get(candidate);

            listView.focus(candidate);

            if (candidate === -1) {
                //TODO: ARIA
                optionLabel.addClass("k-state-focused");
            }
        },

        _select: function(candidate, keepState) {
            var that = this;
            var optionLabel = that.optionLabel;

            candidate = that._get(candidate);

            that.listView.select(candidate);

            if (!keepState && that._state === STATE_FILTER) {
                that.listView.filter(false);
                that._state = STATE_ACCEPT;
            }

            if (candidate === -1) {
                that._selectValue(null);
            }
        },

        _selectValue: function(dataItem) {
            var that = this;
            var optionLabel = that.options.optionLabel;
            var labelElement = that.optionLabel;
            var idx = that.listView.select();

            var value = "";
            var text = "";

            idx = idx[idx.length - 1];
            if (idx === undefined) {
                idx = -1;
            }

            labelElement.removeClass("k-state-focused k-state-selected");

            if (dataItem) {
                text = dataItem;
                value = that._dataValue(dataItem);
                if (optionLabel) {
                    idx += 1;
                }
            } else if (optionLabel) {
                that._focus(labelElement.addClass("k-state-selected"));
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
            var icon;
            var options = this.options;
            var filterEnalbed = options.filter !== "none";

            if (this.filterInput) {
                this.filterInput
                    .off(ns)
                    .parent()
                    .remove();

                this.filterInput = null;
            }

            if (filterEnalbed) {
                icon = '<span unselectable="on" class="k-icon k-i-search">select</span>';

                this.filterInput = $('<input class="k-textbox"/>')
                                      .attr({
                                          role: "listbox",
                                          "aria-haspopup": true,
                                          "aria-expanded": false
                                      });

                this.list
                    .prepend($('<span class="k-list-filter" />')
                    .append(this.filterInput.add(icon)));
            }
        },

        _span: function() {
            var that = this,
                wrapper = that.wrapper,
                SELECTOR = "span.k-input",
                span;

            span = wrapper.find(SELECTOR);

            if (!span[0]) {
                wrapper.append('<span unselectable="on" class="k-dropdown-wrap k-state-default"><span unselectable="on" class="k-input">&nbsp;</span><span unselectable="on" class="k-select"><span unselectable="on" class="k-icon k-i-arrow-s">select</span></span></span>')
                       .append(that.element);

                span = wrapper.find(SELECTOR);
            }

            that.span = span;
            that._inputWrapper = $(wrapper[0].firstChild);
            that._arrow = wrapper.find(".k-icon");
        },

        _wrapper: function() {
            var that = this,
                element = that.element,
                DOMelement = element[0],
                wrapper;

            wrapper = element.parent();

            if (!wrapper.is("span.k-widget")) {
                wrapper = element.wrap("<span />").parent();
                wrapper[0].style.cssText = DOMelement.style.cssText;
                wrapper[0].title = DOMelement.title;
            }

            element.hide();

            that._focused = that.wrapper = wrapper
                              .addClass("k-widget k-dropdown k-header")
                              .addClass(DOMelement.className)
                              .css("display", "")
                              .attr({
                                  unselectable: "on",
                                  role: "listbox",
                                  "aria-haspopup": true,
                                  "aria-expanded": false
                              });
        },

        _clearSelection: function(parent) {
            this.select(parent.value() ? 0 : -1);
        },

        _inputTemplate: function() {
            var that = this,
                template = that.options.valueTemplate;


            if (!template) {
                template = $.proxy(kendo.template('#:this._text(data)#', { useWithBlock: false }), that);
            } else {
                template = kendo.template(template);
            }

            that.valueTemplate = template;
        },

        _textAccessor: function(text) {
            var dataItem = null;
            var template = this.valueTemplate;
            var options = this.options;
            var optionLabel = options.optionLabel;
            var span = this.span;

            if (text !== undefined) {
                if ($.isPlainObject(text) || text instanceof ObservableObject) {
                    dataItem = text;
                } else if (optionLabel && this._optionLabelText() === text) {
                    dataItem = optionLabel;
                    template = this.optionLabelTemplate;
                }

                if (!dataItem) {
                    dataItem = this._assignInstance(text, this._accessor());
                }

                var getElements = function(){
                    return {
                        elements: span.get(),
                        data: [ { dataItem: dataItem } ]
                    };
                };
                this.angular("cleanup", getElements);
                span.html(template(dataItem));
                this.angular("compile", getElements);
            } else {
                return span.text();
            }
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

    ui.plugin(DropDownList);
})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
