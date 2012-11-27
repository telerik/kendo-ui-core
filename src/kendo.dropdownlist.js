(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Select = ui.Select,
        os = kendo.support.mobileOS,
        ns = ".kendoDropDownList",
        ATTRIBUTE = "disabled",
        CHANGE = "change",
        SELECT = "select",
        FOCUSED = "k-state-focused",
        DEFAULT = "k-state-default",
        DISABLED = "k-state-disabled",
        SELECTED = "k-state-selected",
        HOVEREVENTS = "mouseenter" + ns + " mouseleave" + ns,
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

            that._reset();

            that._word = "";

            that._wrapper();

            that._tabindex();

            that._aria();

            that._span();

            that._popup();

            that._mobile();

            that._accessors();

            that._dataSource();

            that._enable();

            that._cascade();

            that.selectedIndex = -1;
            that.selectedValue = options.value || that._accessor();

            if (index !== undefined) {
                options.index = index;
            }

            if (options.autoBind) {
                that.dataSource.fetch();
            } else {
                text = options.text;
                if (!text) {
                    optionLabel = that._optionLabelText(options.optionLabel),
                    useOptionLabel = optionLabel && options.index === 0;

                    if (element.is(SELECT)) {
                        if (useOptionLabel) {
                            text = optionLabel;
                        } else {
                            text = element.children(":selected").text();
                        }
                    } else if (!element[0].value && useOptionLabel) {
                        text = optionLabel;
                    }
                }
                that.text(text);
            }

            kendo.notify(that);
        },

        options: {
            name: "DropDownList",
            enable: true,
            index: 0,
            autoBind: true,
            text: "",
            template: "",
            delay: 500,
            height: 200,
            dataTextField: "",
            dataValueField: "",
            optionLabel: "",
            cascadeFrom: "",
            ignoreCase: true,
            animation: {}
        },
        events: [
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

        destroy: function() {
            var that = this;

            that.wrapper.off(ns);
            that.element.off(ns);
            that._inputWrapper.off(ns);

            Select.fn.destroy.call(that);
        },

        enable: function(enable) {
            var that = this,
                element = that.element,
                wrapper = that.wrapper.off(ns),
                dropDownWrapper = that._inputWrapper.off(HOVEREVENTS);

            if (enable === false) {
                element.attr(ATTRIBUTE, ATTRIBUTE);

                dropDownWrapper
                    .removeClass(DEFAULT)
                    .addClass(DISABLED);

            } else {
                element.removeAttr(ATTRIBUTE, ATTRIBUTE);

                dropDownWrapper
                    .addClass(DEFAULT)
                    .removeClass(DISABLED)
                    .on(HOVEREVENTS, that._toggleHover);

                wrapper
                    .on("touchend" + ns + " click" + ns, function(e) {
                            that._blured = false;
                            e.preventDefault();
                            that.toggle();
                    })
                    .on("keydown" + ns, proxy(that._keydown, that))
                    .on("keypress" + ns, proxy(that._keypress, that))
                    .on("focusin" + ns, function() {
                        dropDownWrapper.addClass(FOCUSED);
                        that._blured = false;
                    })
                    .on("focusout" + ns, function() {
                        if (!that._blured) {
                            that._blur();
                            dropDownWrapper.removeClass(FOCUSED);

                            that._blured = true;
                            element.blur();
                        }
                    });
            }
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
            this._toggle(toggle);
        },

        refresh: function() {
            var that = this,
                data = that._data(),
                length = data.length,
                optionLabel = that.options.optionLabel;

            that.trigger("dataBinding");
            if (that._current) {
                that.current(null);
            }

            that.ul[0].innerHTML = kendo.render(that.template, data);
            that._height(length);

            if (that.popup.visible()) {
                that.popup._position();
            }

            if (that.element.is(SELECT)) {
                if (optionLabel && length) {
                    optionLabel = that._optionLabelText(optionLabel);
                    optionLabel = '<option value="">' + optionLabel + "</option>";
                }

                that._options(data, optionLabel);
                that.selectedValue = that._accessor();
            }

            if (that._open) {
                that._open = false;
                that.toggle(!!length);
            }

            that._hideBusy();
            that._makeUnselectable();

            if (!that._fetch && length /*do set value when no data*/) {
                that._selectItem();
            }

            that._bound = true;
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

        select: function(li) {
            var that = this;

            if (li === undefined) {
                return that.selectedIndex;
            } else {
                that._select(li);
                that._old = that.selectedValue;
                that._oldIndex = that.selectedIndex;

                that.trigger("selected");
            }
        },

        text: function (text) {
            var span = this.span;

            if (text !== undefined) {
                span.text(text);
            } else {
                return span.text();
            }
        },

        value: function(value) {
            var that = this,
                idx, hasValue;

            if (value !== undefined) {
                if (value !== null) {
                    value = value.toString();
                }

                that.selectedValue = value;

                hasValue = value || (that.options.optionLabel && value === "");
                if (hasValue && that._fetchItems(value)) {
                    return;
                }

                idx = that._index(value);
                that.select(idx > -1 ? idx : 0);
            } else {
                return that.selectedValue;
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

        _keypress: function(e) {
            var that = this;

            setTimeout(function() {
                that._word += String.fromCharCode(e.keyCode || e.charCode);
                that._search();
            });
        },

        _popup: function() {
            Select.fn._popup.call(this);
            this.popup.one("open", function() {
                this.wrapper = kendo.wrap(this.element)
                                    .addClass("km-popup");
            });
        },

        _search: function() {
            var that = this;
            clearTimeout(that._typing);

            that._typing = setTimeout(function() {
                that._word = "";
            }, that.options.delay);

            that.search(that._word);
        },

        _select: function(li) {
            var that = this,
                current = that._current,
                data = that._data(),
                value,
                text,
                idx;

            li = that._get(li);

            if (li && li[0] && !li.hasClass(SELECTED)) {
                if (current) {
                    current.removeClass(SELECTED);
                }

                idx = ui.List.inArray(li[0], that.ul[0]);
                if (idx > -1) {
                    data = data[idx];
                    text = that._text(data);
                    value = that._value(data);
                    that.selectedIndex = idx;

                    that.text(text);
                    that._accessor(value !== undefined ? value : text, idx);
                    that.selectedValue = that._accessor();

                    that.current(li.addClass(SELECTED));

                    if (that._optionID) {
                        that._current.attr("aria-selected", true);
                    }
                }
            }
        },

        _mobile: function() {
            var that = this,
                popup = that.popup,
                root = popup.element.parents(".km-root").eq(0);

            if (root.length && os) {
                popup.options.animation.open.effects = (os.android || os.meego) ? "fadeIn" : os.ios ? "slideIn:up" : popup.options.animation.open.effects;
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
