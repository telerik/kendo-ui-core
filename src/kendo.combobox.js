(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        List = ui.List,
        DataSource = kendo.data.DataSource,
        OPEN = "open",
        CLOSE = "close",
        CHANGE = "change",
        LOADING = "t-loading",
        FOCUSED = "t-state-focused",
        SELECTED = "t-state-selected",
        DISABLED = "t-state-disabled",
        SELECT = "select",
        CHARACTER = "character",
        proxy = $.proxy;

    function selectText(element, selectionStart, selectionEnd) {
        if (element.createTextRange) {
            textRange = element.createTextRange();
            textRange.collapse(true);
            textRange.moveStart(CHARACTER, selectionStart);
            textRange.moveEnd(CHARACTER, selectionEnd - selectionStart);
            textRange.select();
        } else {
            element.selectionStart = selectionStart;
            element.selectionEnd = selectionEnd;
        }
    }

    var ComboBox = List.extend({
        init: function(element, options) {
            var that = this;

            options = $.isArray(options) ? { dataSource: options } : options;

            List.fn.init.call(that, element, options);

            that._wrapper();

            that._input();

            that._popup();

            that._dataAccessors();

            that._dataSource();

            that.bind([CHANGE], that.options);

            that.input.bind({
                keydown: proxy(that._keydown, that),
                blur: function() {
                    that._bluring = setTimeout(function() {
                        if (!that._current) {
                            that.text(that.text());
                        }

                        clearTimeout(that._typing);
                        that._blur();
                    }, 100);
                }
            });

            if (that.element.prop("disabled")) {
                that.options.enable = false;
            }

            that.enable(that.options.enable);

            that.previous = that.value();

            if (that.options.autoBind) {
                that._select();
            } else if (that.element.is(SELECT)) {
                that.input.val(that.element.children(":selected").text());
            }
        },

        options: {
            enable: true,
            index: -1,
            autoBind: true,
            delay: 200,
            dataTextField: "text",
            dataValueField: "value",
            minLength: 1,
            height: 200,
            highlightFirst: true,
            filter: "none",
            suggest: false
        },

        enable: function(enable) {
            var that = this,
                element = that.element,
                wrapper = that.wrapper,
                input = that.input,
                arrow = that.arrow,
                CLICK = "click",
                ATTRIBUTE = "disabled";

            if (enable === false) {
                wrapper.addClass(DISABLED);
                input.attr(ATTRIBUTE, ATTRIBUTE);
                element.attr(ATTRIBUTE, ATTRIBUTE);
                arrow.unbind(CLICK);
            } else {
                wrapper.removeClass(DISABLED);
                input.removeAttr(ATTRIBUTE);
                element.removeAttr(ATTRIBUTE);
                arrow.bind(CLICK, proxy(that.toggle, that));
            }
        },

        close: function() {
            this.popup.close();
        },

        open: function() {
            var that = this,
                selected = that._selected;

            if (!that.ul[0].firstChild || (that._filtered && selected)) {
                that._filtered = false;
                that._select();
            } else {
                that.popup.open();
                if (selected) {
                    that._scroll(selected[0]);
                }
            }
        },

        toggle: function() {
            var that = this;
            that.input[0].focus();
            clearTimeout(that._bluring);
            that[that.popup.visible() ? CLOSE : OPEN]();
        },

        showBusy: function () {
            var that = this;
            that._busy = setTimeout(proxy(function () {
                that.arrow.addClass(LOADING);
            }, this), 100);
        },

        hideBusy: function () {
            var that = this;
            clearTimeout(that._busy);
            that.arrow.removeClass(LOADING);
        },

        highlight: function(li) {
            var that = this,
                i = 0,
                idx = -1,
                length,
                text = "",
                value,
                data = that.dataSource.view(),
                children = that.ul[0].childNodes;

            that.current(null);

            if (typeof li === "function") {
                for (i = 0, length = data.length; i < length; i++) {
                    if (li(data[i])) {
                        li = i;
                        break;
                    }
                }
            }

            if (typeof li === "number") {
                li = $(children[li]);
            }

            if (li[0] && !li.hasClass(FOCUSED)) {
                idx = $.inArray(li[0], children);

                if (idx !== -1) {
                    that.current(li);
                }
            }

            return idx;
        },

        refresh: function() {
            var that = this,
                ul = that.ul,
                options = that.options,
                suggest = options.suggest,
                height = options.height,
                data = that.dataSource.view(),
                length = data.length;

            ul[0].innerHTML = kendo.render(that.template, data);
            ul.height(length * 20 > height ? height : "auto");

            that._rebuildSelect(data);

            if (length) {
                if (suggest || options.highlightFirst) {
                    that.current($(that.ul[0].firstChild));
                }

                if (suggest) {
                    that.suggest(that._current);
                }
            }

            if (!options.autoBind) {
                that.popup[length ? OPEN : CLOSE]();
            }

            options.autoBind = false;

            that.hideBusy();
        },

        select: function(li) {
            var that = this,
                text,
                value,
                idx = that.highlight(li),
                data = that.dataSource.view();

            if (idx !== -1) {
                that._selected = that._current.addClass(SELECTED);

                data = data[idx];
                text = that._text(data);
                value = that._value(data);

                that.input[0].value = text;
                that.element[0].value = value !== undefined ? value : text;
            }
        },

        search: function() {
            var that = this,
                word = that.text(),
                length = word.length,
                options = that.options;

            clearTimeout(that._typing);

            if (!length) {
                that.close();
            } else if (length >= options.minLength) {
                that.showBusy();
                if (options.filter === "none") {
                    that._filter(word);
                } else {
                    that._filtered = true;
                    that.dataSource.filter( {field: options.dataTextField, operator: options.filter, value: word } );
                }
            }
        },

        suggest: function(word) {
            var that = this,
                element = that.input[0],
                value = that.text(),
                caret = that._caret();


            if (typeof word !== "string") {
                word = word ? word.text() : "";
            }

            if (caret <= 0) {
                caret = value.toLowerCase().indexOf(word.toLowerCase()) + 1;
            }

            if (!word) {
                word = value.substring(0, caret);
            }

            if (word !== value) {
                that.text(word);
                selectText(element, caret, word.length);
            }
        },

        text: function (text) {
            var that = this,
                input = that.input[0];

            if (text !== undefined) {
                that.select(function(dataItem) {
                    return that._text(dataItem) === text;
                });

                if (!that._selected) {
                    that._customOption(text);
                    that.element.val(text);
                }

                input.value = text;
            } else {
                return input.value;
            }
        },

        value: function(value) {
            var that = this,
                element = that.element;

            if (value !== undefined) {
                var data = that.dataSource.view(),
                    index;

                if (data[0]) {
                    index = $.map(data, function(dataItem, idx) {
                        var dataValue = that._value(dataItem);
                        if (dataValue === undefined) {
                            dataValue = that._text(dataItem);
                        }

                        if (dataValue == value) {
                            return idx;
                        }
                    })[0];
                }

                if (index !== undefined) {
                    that.select(index);
                } else {
                    that.current(null);
                    that._customOption(value);

                    element.val(value);
                    that.text(value);
                }

                that.previous = element.val();
            } else {
                return element.val();
            }
        },

        _accept: function(li) {
            var that = this;

            if (li) {
                that.select(li);
                that._blur();

                if (that.input[0] !== document.activeElement) {
                    that.input.focus();
                }
            } else {
                var prev = that.previous;
                that.value(that.text());
                that.previous = prev;
                that._change();
            }
        },

        _caret: function() {
            var caret,
                input = this.input[0],
                selection = input.ownerDocument.selection;

            if (selection) {
                caret = Math.abs(selection.createRange().moveStart(CHARACTER, -input.value.length));
            } else {
                caret = input.selectionStart;
            }

            return caret;
        },

        _customOption: function(value) {
            var that = this,
                element = that.element,
                custom = that._custom;

            if (element.is(SELECT)) {
                if (!custom) {
                    custom = that._custom = $("<option/>");
                    element.append(custom);
                }
                custom.text(value);
            }
        },

        _dataAccessors: function() {
            var that = this,
                element = that.element,
                options = that.options,
                getter = kendo.getter,
                textField = element.attr("data-text-field"),
                valueField = element.attr("data-value-field");

            if (textField) {
                options.dataTextField = textField;
            }

            if (valueField) {
                options.dataValueField = valueField;
            }

            that._text = getter(options.dataTextField);
            that._value = getter(options.dataValueField);
        },

        _dataSource: function() {
            var that = this,
                element = that.element,
                options = that.options,
                dataSource = options.dataSource || {};

            dataSource = $.isArray(dataSource) ? {data: dataSource} : dataSource;

            if(that.element.is(SELECT)) {
                options.index = element.children(":selected").index();

                dataSource.select = element;
                dataSource.fields = [{ field: options.dataTextField },
                                     { field: options.dataValueField }];
            }

            that.dataSource = DataSource.create(dataSource)
                                        .bind(CHANGE, proxy(that.refresh, that));
        },

        _filter: function(word) {
            var that = this,
                options = that.options,
                dataSource = that.dataSource,
                predicate = function(dataItem) {
                    var text = that._text(dataItem);
                    if (text !== undefined) {
                        return (text + "").toLowerCase().indexOf(word.toLowerCase()) === 0;
                    }
                };

            if (!that.ul[0].firstChild) {
                options.autoBind = true;
                dataSource.bind(CHANGE, function search() {
                    that.search();
                    dataSource.unbind(CHANGE, handler);
                }).query();
                return;
            }

            if (that.highlight(predicate) !== -1) {
                if (options.suggest && that._current) {
                    that.suggest(that._current);
                }
                that.open();
            }

            that.hideBusy();
        },

        _input: function() {
            var that = this,
                element = that.element[0],
                wrapper = that.wrapper,
                SELECTOR = ".t-input",
                input;

            input = wrapper.find(SELECTOR);

            if (!input[0]) {
                wrapper.append('<div class="t-dropdown-wrap t-state-default"><input class="t-input" type="text" autocomplete="off"></input><span class="t-select"><span class="t-icon t-arrow-down">select</span></span></div>')
                       .append(that.element);

                input = wrapper.find(SELECTOR);
            }
            input[0].style.cssText = element.style.cssText;
            input.addClass(element.className).show();

            that.input = input;

            that.arrow = wrapper.find(".t-icon");
        },

        _clear: function() {
            var that = this;
            if (!that.text()) {
                that.current(null);
            }
        },

        _move: function(li) {
            if (li[0]) {
                this.select(li);
            }
        },

        _keydown: function(e) {
            var prevent,
                that = this,
                key = e.keyCode,
                keys = kendo.keys;

            if (e.altKey) {
                if (key === keys.DOWN) {
                    that.open();
                } else if (key === keys.UP) {
                    that.close();
                }
            } else if (key === keys.DOWN) {
                that._move(that._current ? that._current.next() : that.ul.children().first());

                prevent = true;
            } else if (key === keys.UP) {
                that._move(that._current ? that._current.prev() : that.ul.children().last());

                prevent = true;
            } else if (key === keys.ENTER || key === keys.TAB) {
                that._accept(that._current);
            } else if (key === keys.ESC) {
                that.close();
            } else {
                that._search();
            }

            if (prevent) {
                e.preventDefault();
            }

            setTimeout(proxy(that._clear, that));
        },

        _search: function() {
            var that = this;
            clearTimeout(that._typing);

            that._typing = setTimeout(function() {
                var value = that.input.val();
                if (value && that._previousText !== value) {
                    that._previousText = value;
                    that.search();
                }
            }, that.options.delay);
        },

        _select: function() {
            var that = this,
                dataSource = that.dataSource,
                handler = function () {
                    var value = that.value();
                    if (value) {
                        that.value(value);
                    } else {
                        that.select(that.options.index);
                    }

                    that.previous = that.value();
                    dataSource.unbind(CHANGE, handler);
                };

            dataSource.bind(CHANGE, handler);

            that.showBusy();
            that.dataSource.query();
        },


        _wrapper: function() {
            var that = this,
                element = that.element,
                wrapper;

            wrapper = element.parent();

            if (!wrapper.is("div.t-widget")) {
                wrapper = element.hide().wrap("<div />").parent();
            }

            that.wrapper = wrapper.addClass("t-widget t-combobox t-header");
        },

        _rebuildSelect: function(data) {
            var that = this,
                value = that.value(),
                length = data.length,
                options = [],
                i = 0;

            if (that.element.is(SELECT)) {
                for (; i < length; i++) {
                    var option = "<option",
                    dataItem = data[i],
                    dataText = that._text(dataItem),
                    dataValue = that._value(dataItem);

                    if (dataValue !== undefined) {
                        option += " value=" + dataValue;
                    }

                    option += ">";

                    if (dataText !== undefined) {
                        option += dataText;
                    }

                    option += "</option>";
                    options.push(option);
                }

                that.element.html(options.join(""));

                that.element.val(value);
            }
        },

        _popup: function() {
            var that = this,
                ul = that.ul,
                wrapper = that.wrapper;

            that.popup = new ui.Popup(ul, {
                anchor: wrapper
            });

            ul.width(wrapper.width() - (ul.outerWidth() - ul.innerWidth()));
        }
    });

    ui.plugin("ComboBox", ComboBox);
})(jQuery);
