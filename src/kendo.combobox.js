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

            that._aria();

            that._initialIndex = options.index;

            that._initList();

            that._cascade();

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

            this.listView.setOptions(options);

            this._accessors();
            this._aria();
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

            //TODO: Check how to remove this check ???
            /*if ((!that.ul[0].firstChild && state !== STATE_FILTER) ||
                (state === STATE_ACCEPT && !serverFiltering)) {*/

            if ((!this.dataSource.view()[0] && state !== STATE_FILTER) || that._state === STATE_ACCEPT) {
                that._open = true;
                that._state = STATE_REBIND;
                that._filterSource();
            } else {
                that.popup.open();
            }
        },

        _initList: function() {
            var that = this;
            var options = this.options;

            if (options.virtual) {
                this.listView = new kendo.ui.VirtualList(this.ul, {});
            } else {
                this.listView = new kendo.ui.StaticList(this.ul, {
                    dataValueField: options.dataValueField,
                    dataSource: this.dataSource,
                    optionLabel: this.optionLabel,
                    groupTemplate: options.groupTemplate || "#:data#",
                    fixedGroupTemplate: options.fixedGroupTemplate || "#:data#",
                    template: options.template || "#:" + kendo.expr(options.dataTextField, "data") + "#",
                    activate: function() {
                        var current = this.current();
                        if (current) {
                            that._focused.add(that.filterInput).attr("aria-activedescendant", current.attr("id"));
                        }
                    },
                    change: $.proxy(this._listChange, this),
                    deactivate: function() {
                        that._focused.add(that.filterInput).removeAttr("aria-activedescendant");
                    },
                    dataBinding: function() {
                        that.trigger("dataBinding"); //TODO: make preventable
                    },
                    dataBound: $.proxy(this._listBound, this)
                });
            }

            this.listView.value(this.options.value);
        },

        _listBound: function() {
            var that = this;
            var options  = that.options;
            var data = that.listView.data();
            var length = data.length;
            var filtered = that._state === STATE_FILTER;
            var element = that.element[0];
            var value;

            that._height(length);

            if (that.popup.visible()) {
                that.popup._position();
            }

            if (that._isSelect) {
                var hasChild = that.element[0].children[0];

                if (that._state === STATE_REBIND) { //TODO: do we need this???
                    that._state = "";
                }

                var keepState = true;
                var custom = that._option;
                that._option = undefined;
                that._options(data);

                //TODO: find a way how to remove keepState
                if (custom && custom[0].selected) {
                    that._custom(custom.val(), keepState);
                } else if (!that._bound && !hasChild) {
                    that._custom("", keepState);
                }
            }

            that._hideBusy();
            that._makeUnselectable();

            if (!filtered && !that._fetch) {
                var dataItem = this.listView.dataItems()[0]; //this will not work well in filtered list

                if (dataItem) {
                    that._selectValue(dataItem);
                    this._oldIndex = this.selectedIndex;
                    this._triggerCascade(that._userTriggered);
                } else if (this.selectedIndex === -1 && this._initialIndex > -1 && this._initialIndex !== null) {
                    this._select(this._initialIndex);
                    //this._triggerEvents();
                    //
                    this._triggerCascade();
                    this._change();
                }

                this._initialIndex = null;
            } else if (filtered) {
                //TODO: should clear selected value here!
                var current = this.listView.current();
                if (current) {
                    current.removeClass("k-state-selected"); //pretty ugly to be honest
                }
            }

            if (length) {
                var current = this.listView.current();

                if (options.highlightFirst && !current) {
                    that.listView.first();
                }

                if (options.suggest && that.input.val() && that._request !== undefined /*first refresh ever*/) {
                    that.suggest(data[0]);
                }
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

            //TODO: Why we do not do this in DropDownList too!
            if (that._touchScroller) {
                that._touchScroller.reset();
            }

            that._bound = true;
            //that._bound = !!length;
            that.trigger("dataBound");
        },

        _listChange: function() {
            this._selectValue(this.listView.dataItems()[0]);
        },

        _select: function(candidate) {
            this.listView.select(candidate);

            if (this._state === STATE_FILTER) {
                this._state = STATE_ACCEPT;
            }

            return this.listView.dataItems()[0]; //TODO: remove the need to return selected data Item
        },

        _selectValue: function(dataItem) {
            var value = "";
            var text = "";
            var idx = this.listView.select();

            idx = idx[idx.length - 1];
            if (idx === undefined) {
                idx = -1;
            }

            this.selectedIndex = idx;

            if (dataItem) {
                value = this._dataValue(dataItem);
                //text = dataItem;
                text = this._text(dataItem);
            }

            if (value === null) {
                value = "";
            }

            /*this._textAccessor(text);
            this._accessor(value, idx); //TODO: test this how it works with filtered datasource
            */

            this._prev = this.input[0].value = text;
            this._accessor(value !== undefined ? value : text, idx);
            this._placeholder(); //this is diff than DropDownList
        },

        //TODO: Refactor as part of this was moved into StaticList
        refresh: function() {
            this.listView.refresh();
        },

        //TODO: add support for data item
        suggest: function(word) {
            var that = this;
            var element = that.input[0];
            var value = that.text();
            var caretIdx = caret(element)[0];
            var key = that._last;

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
                    that._accessor(text);
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

        //TODO: refactor
        value: function(value) {
            var that = this;
            var options = that.options;

            if (value !== undefined) {
                if (value !== null) {
                    value = value.toString();
                }

                that.listView.value(value);

                if (!that._open && value && that._fetchItems(value)) {
                    return;
                }

                //if options.value and options.text are defined do not clear it
                //TODO: probably it is not needed anymore
                if (value === options.value && that.input.val() === options.text) {
                    return;
                }

                that.select(function(data) {
                    return that._dataValue(data) == value;
                });

                if (that.selectedIndex === -1) {
                    that.listView.focus(-1);
                    that._accessor(value);
                    that.text(value);

                    that._placeholder();

                    /*if (options.value !== value || options.text !== that.input.val()) {
                        that.text(value);
                        that._placeholder();
                    }*/

                    that._old = that._accessor();
                    that._oldIndex = that.selectedIndex;
                }
            } else {
                //TODO: return selectedValue, if not bound!
                //
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

        _click: function(e) {
            if (!e.isDefaultPrevented()) {
                var element = $(e.currentTarget);

                if (this.trigger("select", { item: element })) {
                    this.close();
                    return;
                }

                this._select(element);
                //this._focusElement(this.wrapper);

                //this._userTriggered = true; ???
                this._triggerCascade(true);

                /*var activeFilter = this.filterInput && this.filterInput[0] === activeElement();

                if (activeFilter && key === keys.TAB) {
                    this.wrapper.focusout();
                } else {*/
                this._blur();
                //}
            }
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

            this.listView.focus(predicate);

            var current = this.listView.current();

            if (current) {
                if (options.suggest) {
                    this.suggest(current);
                }

                this.open();
            }

            if (this.options.highlightFirst && !current) {
                this.listView.first();
            }

            that._hideBusy();
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
