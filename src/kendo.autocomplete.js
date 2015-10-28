(function(f, define){
    define([ "./kendo.list", "./kendo.mobile.scroller" ], f);
})(function(){

var __meta__ = { // jshint ignore:line
    id: "autocomplete",
    name: "AutoComplete",
    category: "web",
    description: "The AutoComplete widget provides suggestions depending on the typed text.It also allows multiple value entries.",
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

(function ($, undefined) {
    var kendo = window.kendo,
        support = kendo.support,
        caret = kendo.caret,
        activeElement = kendo._activeElement,
        placeholderSupported = support.placeholder,
        ui = kendo.ui,
        List = ui.List,
        keys = kendo.keys,
        DataSource = kendo.data.DataSource,
        ARIA_DISABLED = "aria-disabled",
        ARIA_READONLY = "aria-readonly",
        DEFAULT = "k-state-default",
        DISABLED = "disabled",
        READONLY = "readonly",
        FOCUSED = "k-state-focused",
        SELECTED = "k-state-selected",
        STATEDISABLED = "k-state-disabled",
        HOVER = "k-state-hover",
        ns = ".kendoAutoComplete",
        HOVEREVENTS = "mouseenter" + ns + " mouseleave" + ns,
        proxy = $.proxy;

    function indexOfWordAtCaret(caretIdx, text, separator) {
        return separator ? text.substring(0, caretIdx).split(separator).length - 1 : 0;
    }

    function wordAtCaret(caretIdx, text, separator) {
        return text.split(separator)[indexOfWordAtCaret(caretIdx, text, separator)];
    }

    function replaceWordAtCaret(caretIdx, text, word, separator) {
        var words = text.split(separator);

        words.splice(indexOfWordAtCaret(caretIdx, text, separator), 1, word);

        if (separator && words[words.length - 1] !== "") {
            words.push("");
        }

        return words.join(separator);
    }

    var AutoComplete = List.extend({
        init: function (element, options) {
            var that = this, wrapper, disabled;

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
            that._loader();

            that._dataSource();
            that._ignoreCase();

            element[0].type = "text";
            wrapper = that.wrapper;

            that._popup();

            element
                .addClass("k-input")
                .on("keydown" + ns, proxy(that._keydown, that))
                .on("paste" + ns, proxy(that._search, that))
                .on("focus" + ns, function () {
                    that._active = true;
                    that._prev = that._accessor();
                    that._placeholder(false);
                    wrapper.addClass(FOCUSED);
                })
                .on("focusout" + ns, function () {
                    that._change();
                    that._placeholder();
                    that._active = false;
                    wrapper.removeClass(FOCUSED);
                })
                .attr({
                    autocomplete: "off",
                    role: "textbox",
                    "aria-haspopup": true
                });

            that._enable();

            that._old = that._accessor();

            if (element[0].id) {
                element.attr("aria-owns", that.ul[0].id);
            }

            that._aria();

            that._placeholder();

            that._initList();

            disabled = $(that.element).parents("fieldset").is(':disabled');

            if (disabled) {
                that.enable(false);
            }

            that.listView.bind("click", function(e) { e.preventDefault(); });

            that._resetFocusItemHandler = $.proxy(that._resetFocusItem, that);

            kendo.notify(that);
        },

        options: {
            name: "AutoComplete",
            enabled: true,
            suggest: false,
            template: "",
            groupTemplate: "#:data#",
            fixedGroupTemplate: "#:data#",
            dataTextField: "",
            minLength: 1,
            delay: 200,
            height: 200,
            filter: "startswith",
            ignoreCase: true,
            highlightFirst: false,
            separator: null,
            placeholder: "",
            animation: {},
            virtual: false,
            value: null
        },

        _dataSource: function() {
            var that = this;

            if (that.dataSource && that._refreshHandler) {
                that._unbindDataSource();
            } else {
                that._progressHandler = proxy(that._showBusy, that);
            }

            that.dataSource = DataSource.create(that.options.dataSource)
                .bind("progress", that._progressHandler);
        },

        setDataSource: function(dataSource) {
            this.options.dataSource = dataSource;
            this._dataSource();

            this.listView.setDataSource(this.dataSource);
        },

        events: [
            "open",
            "close",
            "change",
            "select",
            "filtering",
            "dataBinding",
            "dataBound"
        ],

        setOptions: function(options) {
            var listOptions = this._listOptions(options);

            List.fn.setOptions.call(this, options);

            listOptions.dataValueField = listOptions.dataTextField;

            this.listView.setOptions(listOptions);
            this._accessors();
            this._aria();
        },

        _editable: function(options) {
            var that = this,
                element = that.element,
                wrapper = that.wrapper.off(ns),
                readonly = options.readonly,
                disable = options.disable;

            if (!readonly && !disable) {
                wrapper
                    .addClass(DEFAULT)
                    .removeClass(STATEDISABLED)
                    .on(HOVEREVENTS, that._toggleHover);

                element.removeAttr(DISABLED)
                       .removeAttr(READONLY)
                       .attr(ARIA_DISABLED, false)
                       .attr(ARIA_READONLY, false);
            } else {
                wrapper
                    .addClass(disable ? STATEDISABLED : DEFAULT)
                    .removeClass(disable ? DEFAULT : STATEDISABLED);

                element.attr(DISABLED, disable)
                       .attr(READONLY, readonly)
                       .attr(ARIA_DISABLED, disable)
                       .attr(ARIA_READONLY, readonly);
            }
        },

        close: function () {
            var that = this;
            var current = that.listView.focus();

            if (current) {
                current.removeClass(SELECTED);
            }

            that.popup.close();
        },

        destroy: function() {
            var that = this;

            that.element.off(ns);
            that.wrapper.off(ns);

            List.fn.destroy.call(that);
        },

        refresh: function() {
            this.listView.refresh();
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

            clearTimeout(that._typingTimeout);

            if (separator) {
                word = wordAtCaret(caret(that.element)[0], word, separator);
            }

            length = word.length;

            if (!length || length >= options.minLength) {
                that._open = true;

                that.listView.filter(true);
                that.listView.value([]);

                that._filterSource({
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
                caretIdx = caret(element)[0],
                separator = that.options.separator,
                words = value.split(separator),
                wordIndex = indexOfWordAtCaret(caretIdx, value, separator),
                selectionEnd = caretIdx,
                idx;

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

            idx = value.substring(0, caretIdx).lastIndexOf(separator);
            idx = idx > -1 ? caretIdx - (idx + separator.length) : caretIdx;
            value = words[wordIndex].substring(0, idx);

            if (word) {
                word = word.toString();
                idx = word.toLowerCase().indexOf(value.toLowerCase());
                if (idx > -1) {
                    word = word.substring(idx + value.length);

                    selectionEnd = caretIdx + word.length;

                    value += word;
                }

                if (separator && words[words.length - 1] !== "") {
                    words.push("");
                }

            }

            words[wordIndex] = value;

            that._accessor(words.join(separator || ""));

            if (element === activeElement()) {
                caret(element, caretIdx, selectionEnd);
            }
        },

        value: function (value) {
            if (value !== undefined) {
                this.listView.value(value);

                this._accessor(value);
                this._old = this._accessor();
            } else {
                return this._accessor();
            }
        },

        _click: function(e) {
            var item = e.item;
            var element = this.element;

            this._active = true;

            if (this.trigger("select", { item: item })) {
                this.close();
                return;
            }

            this._select(item);
            this._blur();

            caret(element, element.val().length);
        },

        _initList: function() {
            var that = this;
            var virtual = that.options.virtual;
            var hasVirtual = !!virtual;

            var listBoundHandler = proxy(that._listBound, that);

            var listOptions = {
                autoBind: false,
                selectable: true,
                dataSource: that.dataSource,
                click: $.proxy(that._click, this),
                change: $.proxy(that._listChange, this),
                activate: proxy(that._activateItem, that),
                deactivate: proxy(that._deactivateItem, that),
                dataBinding: function() {
                    that.trigger("dataBinding");
                    that._angularItems("cleanup");
                },
                dataBound: listBoundHandler,
                listBound: listBoundHandler,
                skipUpdateOnBind: true
            };

            listOptions = $.extend(that._listOptions(), listOptions, typeof virtual === "object" ? virtual : {});

            listOptions.dataValueField = listOptions.dataTextField;

            if (!hasVirtual) {
                that.listView = new kendo.ui.StaticList(that.ul, listOptions);
            } else {
                that.listView = new kendo.ui.VirtualList(that.ul, listOptions);
            }

            that.listView.value(that.options.value);
        },

        _resetFocusItem: function() {
            var index = this.options.highlightFirst ? 0 : -1;

            if (this.options.virtual) {
                this.listView.scrollTo(0);
            }

            this.listView.focus(index);
        },

        _listBound: function() {
            var that = this;
            var popup = that.popup;
            var options = that.options;
            var data = that.dataSource.flatView();
            var length = data.length;
            var isActive = that.element[0] === activeElement();
            var action;

            that._angularItems("compile");

            that._calculateGroupPadding(that._height(length));

            popup.position();

            if (length) {
                if (options.suggest && isActive) {
                    that.suggest(data[0]);
                }
            }

            if (that._open) {
                that._open = false;
                action = length ? "open" : "close";

                if (that._typingTimeout && !isActive) {
                    action = "close";
                }

                if (length) {
                    if (!options.virtual) {
                        that._resetFocusItem();
                    } else {
                        that.popup
                            .unbind("activate", that._resetFocusItemHandler)
                            .one("activate", that._resetFocusItemHandler);
                    }
                }

                popup[action]();
                that._typingTimeout = undefined;
            }

            that.listView.filter(false);

            if (that._touchScroller) {
                that._touchScroller.reset();
            }

            that._hideBusy();
            that._makeUnselectable();

            that.trigger("dataBound");
        },

        _listChange: function() {
            if (!this.listView.filter() && this._active) {
                this._selectValue(this.listView.selectedDataItems()[0]);
            }
        },

        _selectValue: function(dataItem) {
            var separator = this.options.separator;
            var text = "";

            if (dataItem) {
                text = this._text(dataItem);
            }

            if (text === null) {
                text = "";
            }

            if (separator) {
                text = replaceWordAtCaret(caret(this.element)[0], this._accessor(), text, separator);
            }

            this._prev = text;
            this._accessor(text);
            this._placeholder();
        },

        _accessor: function (value) {
            var that = this,
                element = that.element[0];

            if (value !== undefined) {
                element.value = value === null ? "" : value;
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

        _keydown: function (e) {
            var that = this;
            var key = e.keyCode;
            var visible = that.popup.visible();
            var current = this.listView.focus();

            that._last = key;

            if (key === keys.DOWN) {
                if (visible) {
                    this._move(current ? "focusNext" : "focusFirst");
                }
                e.preventDefault();
            } else if (key === keys.UP) {
                if (visible) {
                    this._move(current ? "focusPrev" : "focusLast");
                }
                e.preventDefault();
            } else if (key === keys.ENTER || key === keys.TAB) {

                if (key === keys.ENTER && visible) {
                    e.preventDefault();
                }

                if (visible && current) {
                    if (that.trigger("select", { item: current })) {
                        return;
                    }

                    this._select(current);
                }

                this._blur();
            } else if (key === keys.ESC) {
                if (visible) {
                    e.preventDefault();
                }
                that.close();
            } else {
                that._search();
                that._typing = true;
            }
        },

        _move: function (action) {
            this.listView[action]();

            if (this.options.suggest) {
                this.suggest(this.listView.focus());
            }
        },

        _hideBusy: function () {
            var that = this;
            clearTimeout(that._busy);
            that._loading.hide();
            that.element.attr("aria-busy", false);
            that._busy = null;
        },

        _showBusy: function () {
            var that = this;

            if (that._busy) {
                return;
            }

            that._busy = setTimeout(function () {
                that.element.attr("aria-busy", true);
                that._loading.show();
            }, 100);
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

                if (!placeholder && element[0] === document.activeElement) {
                    caret(element[0], 0, 0);
                }
            }
        },

        _search: function () {
            var that = this;
            clearTimeout(that._typingTimeout);

            that._typingTimeout = setTimeout(function () {
                if (that._prev !== that._accessor()) {
                    that._prev = that._accessor();
                    that.search();
                }
            }, that.options.delay);
        },

        _select: function(candidate) {
            this.listView.select(candidate);
        },

        _loader: function() {
            this._loading = $('<span class="k-icon k-loading" style="display:none"></span>').insertAfter(this.element);
        },

        _toggleHover: function(e) {
            $(e.currentTarget).toggleClass(HOVER, e.type === "mouseenter");
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

            wrapper.attr("tabindex", -1);
            wrapper.attr("role", "presentation");

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
})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
