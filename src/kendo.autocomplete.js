(function ($, undefined) {
    var kendo = window.kendo,
        support = kendo.support,
        placeholderSupported = support.placeholder,
        ui = kendo.ui,
        keys = kendo.keys,
        DataSource = kendo.data.DataSource,
        List = ui.List,
        DEFAULT = "k-state-default",
        DISABLED = "disabled",
        FOCUSED = "k-state-focused",
        SELECTED = "k-state-selected",
        STATEDISABLED = "k-state-disabled",
        HOVER = "k-state-hover",
        ns = ".kendoAutoComplete",
        HOVEREVENTS = "mouseenter" + ns + " mouseleave" + ns,
        caretPosition = List.caret,
        selectText = List.selectText,
        proxy = $.proxy;

    function indexOfWordAtCaret(caret, text, separator) {
        return separator ? text.substring(0, caret).split(separator).length - 1 : 0;
    }

    function wordAtCaret(caret, text, separator) {
        return text.split(separator)[indexOfWordAtCaret(caret, text, separator)];
    }

    function replaceWordAtCaret(caret, text, word, separator) {
        var words = text.split(separator);

        words.splice(indexOfWordAtCaret(caret, text, separator), 1, word);

        if (separator && words[words.length - 1] !== "") {
            words.push("");
        }

        return words.join(separator);
    }

    function moveCaretAtEnd(element) {
        var length = element.value.length;

        selectText(element, length, length);
    }

    var AutoComplete = List.extend({
        init: function (element, options) {
            var that = this, wrapper;

            that.ns = ns;
            options = $.isArray(options) ? { dataSource: options} : options;

            List.fn.init.call(that, element, options);

            element = that.element;
            options = that.options;

            options.placeholder = options.placeholder || element.attr("placeholder");
            if (placeholderSupported) {
                element.attr("placeholder", options.placeholder);
            }

            that._wrapper();

            that._accessors();

            that._dataSource();

            element[0].type = "text";
            wrapper = that.wrapper;

            that._enable();

            that._popup();

            element
                .addClass("k-input")
                .on("keydown" + ns, proxy(that._keydown, that))
                .on("paste" + ns, proxy(that._search, that))
                .on("focus" + ns, function () {
                    that._prev = that._accessor();
                    that._placeholder(false);
                    wrapper.addClass(FOCUSED);
                })
                .on("blur" + ns, function () {
                    that._change();
                    that._placeholder();
                    wrapper.removeClass(FOCUSED);
                })
                .attr({
                    autocomplete: "off",
                    role: "textbox",
                    "aria-haspopup": true,
                    "aria-autocomplete": options.suggest ? "both" : "list"
                });

            that._enable();

            that._popup();

            that._old = that._accessor();

            if (element[0].id) {
                element.attr("aria-owns", that.ul[0].id);
            }

            that._placeholder();

            kendo.notify(that);
        },

        options: {
            name: "AutoComplete",
            suggest: false,
            template: "",
            dataTextField: "",
            minLength: 1,
            delay: 200,
            height: 200,
            filter: "startswith",
            ignoreCase: true,
            highlightFirst: false,
            separator: null,
            placeholder: "",
            animation: {}
        },

        _dataSource: function() {
            var that = this;

            if (that.dataSource && that._refreshHandler) {
                that._unbindDataSource();
            } else {
                that._refreshHandler = proxy(that.refresh, that);
            }

            that.dataSource = DataSource.create(that.options.dataSource)
                .bind("change", that._refreshHandler);
        },

        setDataSource: function(dataSource) {
            this.options.dataSource = dataSource;

            this._dataSource();
        },

        events: [
            "open",
            "close",
            "change",
            "select",
            "dataBinding",
            "dataBound"
        ],

        setOptions: function(options) {
            List.fn.setOptions.call(this, options);

            this._template();
            this._accessors();
        },


        enable: function(enable) {
            var that = this,
                element = that.element,
                wrapper = that.wrapper.off(HOVEREVENTS);

            if (enable === false) {
                wrapper
                    .removeClass(DEFAULT)
                    .addClass(STATEDISABLED);

                element.attr(DISABLED, DISABLED);
            } else {
                wrapper
                    .removeClass(STATEDISABLED)
                    .addClass(DEFAULT)
                    .on(HOVEREVENTS, that._toggleHover);

                element
                    .removeAttr(DISABLED);
            }
        },

        close: function () {
            var that = this;
            that._current = null;
            that.popup.close();
        },

        destroy: function() {
            var that = this;

            that.element.off(ns);
            that.wrapper.off(ns);

            List.fn.destroy.call(that);
        },

        refresh: function () {
            var that = this,
            ul = that.ul[0],
            popup = that.popup,
            options = that.options,
            data = that._data(),
            length = data.length,
            action;

            that.trigger("dataBinding");

            ul.innerHTML = kendo.render(that.template, data);

            that._height(length);

            if (popup.visible()) {
                popup._position();
            }

            if (length) {
                if (options.highlightFirst) {
                    that.current($(ul.firstChild));
                }

                if (options.suggest) {
                    that.suggest($(ul.firstChild));
                }
            }

            if (that._open) {
                that._open = false;
                action = length ? "open" : "close";

                if (that._typing && that.element[0] !== document.activeElement) {
                    action = "close";
                }

                popup[action]();
                that._typing = undefined;
            }

            if (that._touchScroller) {
                that._touchScroller.reset();
            }

            that._makeUnselectable();

            that.trigger("dataBound");
        },

        select: function (li) {
            this._select(li);
        },

        search: function (word) {
            var that = this,
            options = that.options,
            ignoreCase = options.ignoreCase,
            separator = options.separator,
            length;

            word = word || that._accessor();

            that._current = null;

            clearTimeout(that._typing);

            if (separator) {
                word = wordAtCaret(caretPosition(that.element[0]), word, separator);
            }

            length = word.length;

            if (!length) {
                that.popup.close();
            } else if (length >= that.options.minLength) {
                that._open = true;

                that.dataSource.filter({
                    value: ignoreCase ? word.toLowerCase() : word,
                    operator: options.filter,
                    field: options.dataTextField,
                    ignoreCase: ignoreCase
                });
            }
        },

        suggest: function (word) {
            var that = this,
                key = that._last,
                value = that._accessor(),
                element = that.element[0],
                caret = caretPosition(element),
                separator = that.options.separator,
                words = value.split(separator),
                wordIndex = indexOfWordAtCaret(caret, value, separator),
                selectionEnd = caret,
                idx;

            if (key == keys.BACKSPACE || key == keys.DELETE) {
                that._last = undefined;
                return;
            }

            word = word || "";

            if (typeof word !== "string") {
                idx = List.inArray(word[0], that.ul[0]);

                if (idx > -1) {
                    word = that._text(that._data()[idx]);
                } else {
                    word = "";
                }
            }

            if (caret <= 0) {
                caret = value.toLowerCase().indexOf(word.toLowerCase()) + 1;
            }

            idx = value.substring(0, caret).lastIndexOf(separator);
            idx = idx > -1 ? caret - (idx + separator.length) : caret;
            value = words[wordIndex].substring(0, idx);

            if (word) {
                idx = word.toLowerCase().indexOf(value.toLowerCase());
                if (idx > -1) {
                    word = word.substring(idx + value.length);

                    selectionEnd = caret + word.length;

                    value += word;
                }

                if (separator && words[words.length - 1] !== "") {
                    words.push("");
                }

            }

            words[wordIndex] = value;

            that._accessor(words.join(separator || ""));

            selectText(element, caret, selectionEnd);
        },

        value: function (value) {
            if (value !== undefined) {
                this._accessor(value);
                this._old = value;
            } else {
                return this._accessor();
            }
        },

        _accessor: function (value) {
            var that = this,
                element = that.element[0];

            if (value !== undefined) {
                element.value = value;
                that._placeholder();
            } else {
                value = element.value;

                if (element.className.indexOf("k-readonly") > -1) {
                    if (value === that.options.placeholder) {
                        return "";
                    } else {
                        return value;
                    }
                }

                return value;
            }
        },

        _accept: function (li) {
            var that = this;

            that._focus(li);
            moveCaretAtEnd(that.element[0]);
        },

        _keydown: function (e) {
            var that = this,
                ul = that.ul[0],
                key = e.keyCode,
                current = that._current,
                visible = that.popup.visible();

            that._last = key;

            if (key === keys.DOWN) {
                if (visible) {
                    that._move(current ? current.next() : $(ul.firstChild));
                }
                e.preventDefault();
            } else if (key === keys.UP) {
                if (visible) {
                    that._move(current ? current.prev() : $(ul.lastChild));
                }
                e.preventDefault();
            } else if (key === keys.ENTER || key === keys.TAB) {

                if (key === keys.ENTER && that.popup.visible()) {
                    e.preventDefault();
                }

                that._accept(current);
            } else if (key === keys.ESC) {
                if (that.popup.visible()) {
                    e.preventDefault();
                }
                that.close();
            } else {
                that._search();
            }
        },

        _move: function (li) {
            var that = this;

            li = li[0] ? li : null;

            that.current(li);

            if (that.options.suggest) {
                that.suggest(li);
            }
        },

        _placeholder: function(show) {
            if (placeholderSupported) {
                return;
            }

            var that = this,
                element = that.element,
                placeholder = that.options.placeholder,
                value;

            if (placeholder) {
                value = element.val();

                if (show === undefined) {
                    show = !value;
                }

                if (!show) {
                    if (value !== placeholder) {
                        placeholder = value;
                    } else {
                        placeholder = "";
                    }
                }

                if (value === that._old && !show) {
                    return;
                }

                element.toggleClass("k-readonly", show)
                       .val(placeholder);
            }
        },

        _search: function () {
            var that = this;
            clearTimeout(that._typing);

            that._typing = setTimeout(function () {
                if (that._prev !== that._accessor()) {
                    that._prev = that._accessor();
                    that.search();
                }
            }, that.options.delay);
        },

        _select: function (li) {
            var that = this,
                separator = that.options.separator,
                data = that._data(),
                text,
                idx;

            li = $(li);

            if (li[0] && !li.hasClass(SELECTED)) {
                idx = List.inArray(li[0], that.ul[0]);

                if (idx > -1) {
                    data = data[idx];
                    text = that._text(data);

                    if (separator) {
                        text = replaceWordAtCaret(caretPosition(that.element[0]), that._accessor(), text, separator);
                    }

                    that._accessor(text);
                    that.current(li.addClass(SELECTED));
                }
            }
        },

        _toggleHover: function(e) {
            if (!support.touch) {
                $(e.currentTarget).toggleClass(HOVER, e.type === "mouseenter");
            }
        },

        _wrapper: function () {
            var that = this,
                element = that.element,
                DOMelement = element[0],
                wrapper;

            wrapper = element.parent();

            if (!wrapper.is("span.k-widget")) {
                wrapper = element.wrap("<span />").parent();
            }

            //aria

            wrapper.attr("tabindex", -1);
            wrapper.attr("role", "presentation");

            //end

            wrapper[0].style.cssText = DOMelement.style.cssText;
            element.css({
                width: "100%",
                height: DOMelement.style.height
            });

            that._focused = that.element;
            that.wrapper = wrapper
                              .addClass("k-widget k-autocomplete k-header")
                              .addClass(DOMelement.className);
        }
    });

    ui.plugin(AutoComplete);
})(jQuery);
