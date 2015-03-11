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
    } ]
};

(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Select = ui.Select,
        os = kendo.support.mobileOS,
        activeElement = kendo._activeElement,
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
            var optionLabel, useOptionLabel, text;

            that.ns = ns;
            options = $.isArray(options) ? { dataSource: options } : options;

            Select.fn.init.call(that, element, options);

            options = that.options;
            element = that.element.on("focus" + ns, proxy(that._focusHandler, that));

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

            that._oldIndex = that.selectedIndex = -1;

            if (index !== undefined) {
                options.index = index;
            }

            that._initialIndex = options.index;
            this._optionLabel();
            this._initList();

            that._cascade();

            if (options.autoBind) {
                that.dataSource.fetch();
            } else if (that.selectedIndex === -1) { //selectedIndex !== -1 when cascade functionality happens instantly

                //TODO: Refactor
                text = options.text || "";
                if (!text) {
                    optionLabel = options.optionLabel;
                    useOptionLabel = optionLabel && options.index === 0;

                    if (that._isSelect) {
                        if (useOptionLabel) {
                            text = optionLabel;
                        } else {
                            text = element.children(":selected").text();
                        }
                    } else if (!element[0].value && useOptionLabel) {
                        text = optionLabel;
                    }
                }

                that._textAccessor(text);
            }

            kendo.notify(that);
        },

        _optionLabel: function() {
            var options = this.options;
            var optionLabel = options.optionLabel;
            var textField = options.dataTextField;
            var valueField = options.dataValueField;
            var optionInstance = {};

            if (optionLabel && textField && typeof optionLabel !== "object") {
                textField = textField.split(".");
                valueField = valueField.split(".");

                assign(optionInstance, valueField, "");
                assign(optionInstance, textField, optionLabel);

                optionLabel = optionInstance;
            }

            this.optionLabel = optionLabel;
        },

        options: {
            name: "DropDownList",
            enabled: true,
            autoBind: true,
            index: 0,
            text: null,
            value: null,
            template: "",
            valueTemplate: "",
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
            virtual: false
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

            this.listView.setOptions(options);

            this._inputTemplate();
            this._accessors();
            this._filterHeader();
            this._enable();
            this._aria();
        },

        destroy: function() {
            var that = this;

            that.wrapper.off(ns);
            that.element.off(ns);
            that._inputWrapper.off(ns);

            that._arrow.off();
            that._arrow = null;

            Select.fn.destroy.call(that);
        },

        open: function() {
            var that = this;

            if (that.popup.visible()) {
                return;
            }

            if (!this.dataSource.view().length || that._state === STATE_ACCEPT) {
                that._open = true;
                that._state = "rebind";

                if (that.filterInput) {
                    that.filterInput.val("");
                }

                that._filterSource();
            } else {
                that.popup.open();
                that._focusElement(that.filterInput);
                that.listView.focus(that.listView.select());
            }
        },

        toggle: function(toggle) {
            this._toggle(toggle, true);
        },

        _initList: function() {
            var that = this;
            var options = this.options;
            var virtualOptions;

            if (options.virtual) {
                virtualOptions = {
                    autoBind: false, //dropdownlist fetches the data
                    dataValueField: options.dataValueField,
                    dataSource: this.dataSource,
                    optionLabel: this.optionLabel,
                    selectable: true,
                    height: this.options.height,
                    groupTemplate: options.groupTemplate || "#:data#",
                    fixedGroupTemplate: options.fixedGroupTemplate || "#:data#",
                    template: options.template || "#:" + kendo.expr(options.dataTextField, "data") + "#",
                    activate: function() {
                        var current = this.focus();
                        if (current) {
                            that._focused.add(that.filterInput).attr("aria-activedescendant", current.attr("id"));
                        }
                    },
                    change: $.proxy(this._listChange, this),
                    deactivate: function() {
                        that._focused.add(that.filterInput).removeAttr("aria-activedescendant");
                    },
                    listBound: $.proxy(this._listBound, this)
                    /*
                    dataBinding: function() {
                        that.trigger("dataBinding"); //TODO: make preventable
                    },
                    dataBound: $.proxy(this._listBound, this)
                    */
                };

                if (typeof options.virtual === "object") {
                    $.extend(virtualOptions, options.virtual);
                }

                this.listView = new kendo.ui.VirtualList(this.ul, virtualOptions);
            } else {
                this.listView = new kendo.ui.StaticList(this.ul, {
                    dataValueField: options.dataValueField,
                    dataSource: this.dataSource,
                    optionLabel: this.optionLabel,
                    groupTemplate: options.groupTemplate || "#:data#",
                    fixedGroupTemplate: options.fixedGroupTemplate || "#:data#",
                    template: options.template || "#:" + kendo.expr(options.dataTextField, "data") + "#",
                    activate: function() {
                        var current = this.focus();
                        if (current) {
                            that._focused.add(that.filterInput).attr("aria-activedescendant", current.attr("id"));
                        }
                    },
                    click: $.proxy(this._click, this),
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

                    dataItem = that._select(function(data) {
                        data = that._text(data);

                        if (ignoreCase) {
                            data = (data + "").toLowerCase();
                        }

                        return data === loweredText;
                    });

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

            //TODO: Test this functionality... return cached value before request
            if (value === undefined) {
                value = that._accessor() || that.listView.value()[0];
                return value === undefined || value === null ? "" : value;
            }

            if (value !== null) {
                value = value.toString();
            }

            this.listView.value(value).done(function() {
                that._selectValue(that.listView.selectedDataItems()[0]);
                that._triggerCascade();

                that._old = that._accessor();
                that._oldIndex = that.selectedIndex;
            });

            that._fetchData();
        },

        _listBound: function() {
            var that = this;
            var data = that.listView.data();
            var length = data.length;
            var optionLabel = that.options.optionLabel;
            var filtered = that._state === STATE_FILTER;
            var element = that.element[0];
            var selectedIndex;
            var value;

            //TODO: test this
            if (!this.options.virtual) {
                that._height(filtered ? (length || 1) : length);
            }

            if (that.popup.visible()) {
                that.popup._position();
            }

            if (that._isSelect) {
                selectedIndex = element.selectedIndex;
                value = that.value();

                if (length) {
                    if (optionLabel) {
                        optionLabel = that._option("", this._text(optionLabel));
                    }
                } else if (value) {
                    selectedIndex = 0;
                    optionLabel = that._option(value, that.text());
                }

                that._options(data, optionLabel);
                element.selectedIndex = selectedIndex === -1 ? 0 : selectedIndex;
            }

            that._hideBusy();
            that._makeUnselectable();

            if (!filtered) {
                if (that._open) {
                    that.toggle(!!length);
                }

                that._open = false;

                if (!that._fetch) {
                    if (length) {
                        var dataItem = this.listView.selectedDataItems()[0];

                        if (dataItem) {
                            that._selectValue(dataItem);
                            this._oldIndex = this.selectedIndex;
                            this._triggerCascade(that._userTriggered);
                        } else if (this.selectedIndex === -1 && this._initialIndex !== null) {
                            this._select(this._initialIndex);
                            this._triggerEvents();
                        }

                        this._initialIndex = null;
                    } else if (this._textAccessor() !== optionLabel) {
                        this.listView.value("");
                        this._selectValue(null);
                    }
                }
            } else {
                this.listView.first();
            }

            that._bound = !!length;
            that.trigger("dataBound");
        },

        _listChange: function() {
            this._selectValue(this.listView.selectedDataItems()[0]);
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

            if (!that._prevent) {
                if (filtered) {
                    that._select(that.listView.focus());
                }

                if (!filtered || that.dataItem()) {
                    that._triggerCascade();
                }

                if (kendo.support.mobileOS.ios && isIFrame) {
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
            var handled;

            if (key === keys.LEFT) {
                key = keys.UP;
            } else if (key === keys.RIGHT) {
                key = keys.DOWN;
            }

            e.keyCode = key;

            if (altKey && key === keys.UP) {
                that._focusElement(that.wrapper);
            }

            handled = that._move(e);

            if (handled) {
                return;
            }

            if (!that.popup.visible() || !that.filterInput) {
                if (key === keys.HOME) {
                    handled = true;
                    that.listView.first();
                } else if (key === keys.END) {
                    handled = true;
                    that.listView.last();
                }

                if (handled) {
                    that._select(that.listView.focus());
                    e.preventDefault();
                }
            }

            if (!altKey && !handled && that.filterInput) {
                that._search();
            }
        },

        _selectNext: function(word, index) {
            var that = this, text,
                startIndex = index,
                data = that.listView.data(),
                length = data.length,
                ignoreCase = that.options.ignoreCase,
                action = function(text, index) {
                    text = text + "";
                    if (ignoreCase) {
                        text = text.toLowerCase();
                    }

                    if (text.indexOf(word) === 0) {
                        that._select(index);
                        that._triggerEvents();
                        return true;
                    }
                };

            for (; index < length; index++) {
                text = that._text(data[index]);
                if (text && action(text, index)) {
                    return true;
                }
            }

            if (startIndex > 0 && startIndex < length) {
                index = 0;
                for (; index <= startIndex; index++) {
                    text = that._text(data[index]);
                    if (text && action(text, index)) {
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
            var word = that._word;

            if (that.options.ignoreCase) {
                character = character.toLowerCase();
            }

            if (character === " ") {
                e.preventDefault();
            }

            if (that._last === character && word.length <= 1 && index > -1) {
                if (!word) {
                    word = character;
                }

                if (that._selectNext(word, index + 1)) {
                    return;
                }
            }

            that._word = word + character;
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

        _click: function(e) {
            var item = e.item;

            if (this.trigger("select", { item: item })) {
                this.close();
                return;
            }

            this._select(item);
            this._focusElement(this.wrapper);

            this._triggerCascade(true);

            var activeFilter = this.filterInput && this.filterInput[0] === activeElement();

            if (activeFilter && key === keys.TAB) {
                this.wrapper.focusout();
            } else {
                this._blur();
            }
        },

        _focusElement: function(element) {
            var active = activeElement();
            var wrapper = this.wrapper;
            var filterInput = this.filterInput;
            var compareElement = element === filterInput ? wrapper : filterInput;

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
            var that = this,
                dataSource = that.dataSource,
                index = that.selectedIndex,
                word = that._word;

            clearTimeout(that._typing);

            if (that.options.filter !== "none") {
                that._typing = setTimeout(function() {
                    var value = that.filterInput.val();

                    if (that._prev !== value) {
                        that._prev = value;
                        that.search(value);
                    }

                    that._typing = null;
                }, that.options.delay);
            } else {
                that._typing = setTimeout(function() {
                    that._word = "";
                }, that.options.delay);

                if (index === -1) {
                    index = 0;
                }

                if (!that.ul[0].firstChild) {
                    dataSource.one(CHANGE, function () {
                        if (dataSource.data()[0] && index > -1) {
                            that._selectNext(word, index);
                        }
                    }).fetch();
                    return;
                }

                that._selectNext(word, index);
                that._triggerEvents();
            }
        },

        _select: function(candidate) {
            this.listView.select(candidate);

            if (this._state === STATE_FILTER) {
                this._state = STATE_ACCEPT;
            }
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
                text = dataItem;
            }

            if (value === null) {
                value = "";
            }

            this._textAccessor(text);
            this._accessor(value, idx); //TODO: test this how it works with filtered datasource
        },

        _triggerEvents: function() {
            if (!this.popup.visible()) {
                this._triggerCascade();
                this._change();
            }
        },

        _mobile: function() {
            var that = this,
                popup = that.popup,
                root = popup.element.parents(".km-root").eq(0);

            if (root.length && os) {
                popup.options.animation.open.effects = (os.android || os.meego) ? "fadeIn" : (os.ios || os.wp) ? "slideIn:up" : popup.options.animation.open.effects;
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

        _clearSelection: function() {
            var that = this;
            var optionLabel = that.options.optionLabel;

            that.options.value = "";

            if (that.dataSource.view()[0] && (optionLabel || that._userTriggered)) {
                that.select(0);
            } else {
                that.select(-1);
                that._textAccessor(that.options.optionLabel);
            }
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
            var dataItem = this.dataItem();
            var options = this.options;
            var span = this.span;

            if (text !== undefined) {
                if ($.isPlainObject(text) || text instanceof kendo.data.ObservableObject) {
                    dataItem = text;
                } else if (!dataItem || this._text(dataItem) !== text) {
                    if (options.dataTextField) {
                        dataItem = {};
                        assign(dataItem, options.dataTextField.split("."), text);
                        assign(dataItem, options.dataValueField.split("."), this._accessor());
                    } else {
                        dataItem = text;
                    }
                }

                var getElements = function(){
                    return {
                        elements: span.get(),
                        data: [ { dataItem: dataItem } ]
                    };
                };
                this.angular("cleanup", getElements);
                span.html(this.valueTemplate(dataItem));
                this.angular("compile", getElements);
            } else {
                return span.text();
            }
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
