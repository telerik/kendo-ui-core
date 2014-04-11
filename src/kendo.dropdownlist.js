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
        proxy = $.proxy;

    var DropDownList = Select.extend( {
        init: function(element, options) {
            var that = this,
                index = options && options.index,
                optionLabel, useOptionLabel, text;

            that.ns = ns;
            options = $.isArray(options) ? { dataSource: options } : options;

            Select.fn.init.call(that, element, options);

            that._focusHandler = function() {
                that.wrapper.focus();
            };

            options = that.options;
            element = that.element.on("focus" + ns, that._focusHandler);

            this._inputTemplate();

            that._reset();

            that._word = "";

            that._wrapper();

            that._tabindex();
            that.wrapper.data(TABINDEX, that.wrapper.attr(TABINDEX));

            that._aria();

            that._span();

            that._popup();

            that._mobile();

            that._dataSource();
            that._ignoreCase();

            that._enable();

            that._oldIndex = that.selectedIndex = -1;

            that._cascade();

            if (index !== undefined) {
                options.index = index;
            }

            if (options.autoBind) {
                that.dataSource.fetch();
            } else if (that.selectedIndex === -1) {
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
            animation: {}
        },
        events: [
            "open",
            "close",
            CHANGE,
            "select",
            "dataBinding",
            "dataBound",
            "cascade"
        ],

        setOptions: function(options) {
            Select.fn.setOptions.call(this, options);

            this._template();
            this._inputTemplate();
            this._accessors();
            this._aria();
        },

        destroy: function() {
            var that = this;

            that.wrapper.off(ns);
            that.element.off(ns);
            that._inputWrapper.off(ns);

            Select.fn.destroy.call(that);
        },

        open: function() {
            var that = this;

            if (!that.ul[0].firstChild) {
                that._open = true;

                if (!that._request) {
                    that.dataSource.fetch();
                }
            } else {
                that.popup.open();
                that._scroll(that._current);
            }
        },

        toggle: function(toggle) {
            this._toggle(toggle, true);
        },

        refresh: function() {
            var that = this,
                data = that._data(),
                length = data.length,
                optionLabel = that.options.optionLabel,
                element = that.element[0],
                selectedIndex;

            that.trigger("dataBinding");
            if (that._current) {
                that.current(null);
            }

            that.ul[0].innerHTML = kendo.render(that.template, data);
            that._height(length);

            if (that.popup.visible()) {
                that.popup._position();
            }

            if (that._isSelect) {
                selectedIndex = element.selectedIndex;

                if (optionLabel && length) {
                    optionLabel = '<option value="">' + that._optionLabelText(optionLabel) + "</option>";
                }

                that._options(data, optionLabel);
                element.selectedIndex = selectedIndex === -1 ? 0 : selectedIndex;
            }

            if (that._open) {
                that._open = false;
                that.toggle(!!length);
            }

            that._hideBusy();
            that._makeUnselectable();

            if (!that._fetch) {
                if (length) {
                    that._selectItem();
                } else if (that._textAccessor() !== optionLabel) {
                    that.element.val("");
                    that._textAccessor("");
                }
            }

            that._bound = !!length;
            that.trigger("dataBound");
        },

        search: function(word) {
            if (word) {
                var that = this,
                    ignoreCase = that.options.ignoreCase;

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
            var that = this,
                idx, hasValue;

            if (value !== undefined) {
                if (value !== null) {
                    value = value.toString();
                }

                that._selectedValue = value;

                hasValue = value || (that.options.optionLabel && !that.element[0].disabled && value === "");
                if (hasValue && that._fetchItems(value)) {
                    return;
                }

                idx = that._index(value);
                that.select(idx > -1 ? idx : 0);
            } else {
                return that._accessor();
            }
        },

        _editable: function(options) {
            var that = this,
                element = that.element,
                disable = options.disable,
                readonly = options.readonly,
                wrapper = that.wrapper.off(ns),
                dropDownWrapper = that._inputWrapper.off(HOVEREVENTS),
                focusin = function() {
                    dropDownWrapper.addClass(FOCUSED);
                    that._blured = false;
                },
                focusout = function() {
                    if (!that._blured) {
                        that._triggerCascade();

                        var isIFrame = window.self !== window.top;
                        if (kendo.support.mobileOS.ios && isIFrame) {
                            that._change();
                        } else {
                            that._blur();
                        }

                        dropDownWrapper.removeClass(FOCUSED);
                        that._blured = true;
                        element.blur();
                    }
                };

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
                    .on("click" + ns, function(e) {
                            that._blured = false;
                            e.preventDefault();
                            that._toggle();
                    })
                    .on("keydown" + ns, proxy(that._keydown, that))
                    .on("keypress" + ns, proxy(that._keypress, that))
                    .on("focusin" + ns, focusin)
                    .on("focusout" + ns, focusout);

            } else {
                if (disable) {
                    wrapper.removeAttr(TABINDEX);
                    dropDownWrapper
                        .addClass(STATEDISABLED)
                        .removeClass(DEFAULT);
                } else {
                    dropDownWrapper
                        .addClass(DEFAULT)
                        .removeClass(STATEDISABLED);

                    wrapper
                        .on("focusin" + ns, focusin)
                        .on("focusout" + ns, focusout);
                }

                element.attr(DISABLED, disable)
                       .attr(READONLY, readonly);

                wrapper.attr(ARIA_DISABLED, disable)
                       .attr(ARIA_READONLY, readonly);
            }
        },

        _accept: function(li) {
            this._focus(li);
        },

        _optionLabelText: function() {
            var options = this.options,
                dataTextField = options.dataTextField,
                optionLabel = options.optionLabel;

            if (optionLabel && dataTextField && typeof optionLabel === "object") {
                return this._text(optionLabel);
            }

            return optionLabel;
        },

        _data: function() {
            var that = this,
                options = that.options,
                optionLabel = options.optionLabel,
                textField = options.dataTextField,
                valueField = options.dataValueField,
                data = that.dataSource.view(),
                length = data.length,
                first = optionLabel,
                idx = 0;

            if (optionLabel && length) {
                if (typeof optionLabel === "object") {
                    first = optionLabel;
                } else if (textField) {
                    first = {};

                    textField = textField.split(".");
                    valueField = valueField.split(".");

                    assign(first, valueField, "");
                    assign(first, textField, optionLabel);
                }

                first = new kendo.data.ObservableArray([first]);

                for (; idx < length; idx++) {
                    first.push(data[idx]);
                }
                data = first;
            }

            return data;
        },

        _selectItem: function() {
            Select.fn._selectItem.call(this);

            if (!this.current()) {
                this.select(0);
            }
        },

        _keydown: function(e) {
            var that = this,
                key = e.keyCode,
                keys = kendo.keys,
                ul = that.ul[0];

            if (key === keys.LEFT) {
                key = keys.UP;
            } else if (key === keys.RIGHT) {
                key = keys.DOWN;
            }

            e.keyCode = key;
            that._move(e);

            if (key === keys.HOME) {
                e.preventDefault();
                that._select(ul.firstChild);
            } else if (key === keys.END) {
                e.preventDefault();
                that._select(ul.lastChild);
            }
        },

        _selectNext: function(word, index) {
            var that = this, text,
                startIndex = index,
                data = that._data(),
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

            if (startIndex > 0) {
                console.log(startIndex);
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
            if (e.which === 0 || e.keyCode === kendo.keys.ENTER) {
                return;
            }

            var that = this,
                character = String.fromCharCode(e.charCode || e.keyCode),
                index = that.selectedIndex,
                word = that._word;

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

        _popup: function() {
            Select.fn._popup.call(this);
            this.popup.one("open", proxy(function() {
                var popup = this.popup;

                popup.wrapper = kendo.wrap(popup.element);
                if (popup.element.closest(".km-root")[0]) {
                    popup.wrapper.addClass("km-popup km-widget");
                    this.wrapper.addClass("km-widget");
                }
            }, this));
        },

        _search: function() {
            var that = this,
                dataSource = that.dataSource,
                index = that.selectedIndex,
                word = that._word;

            clearTimeout(that._typing);

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
        },

        _select: function(li) {
            var that = this,
                current = that._current,
                data = null,
                value,
                idx;

            li = that._get(li);

            if (li && li[0] && !li.hasClass(SELECTED)) {
                if (current) {
                    current.removeClass(SELECTED);
                }

                idx = ui.List.inArray(li[0], that.ul[0]);
                if (idx > -1) {
                    data = that._data()[idx];
                    value = that._value(data);
                    that.selectedIndex = idx;

                    that._textAccessor(data);
                    that._accessor(value !== undefined ? value : that._text(data), idx);
                    that._selectedValue = that._accessor();

                    that.current(li.addClass(SELECTED));

                    if (that._optionID) {
                        that._current.attr("aria-selected", true);
                    }
                }
            }

            return data;
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
            that._arrow = wrapper.find(".k-icon").mousedown(function(e) { e.preventDefault(); });
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
            that._selectedValue = "";

            if (that.dataSource.view()[0] && (optionLabel || that._userTriggered)) {
                that.select(0);
                return;
            }

            that.selectedIndex = -1;

            that.element.val("");
            that._textAccessor(that.options.optionLabel);
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

                span.html(this.valueTemplate(dataItem));
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
