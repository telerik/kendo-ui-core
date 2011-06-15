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

            that._customOption();

            that._wrapper();

            that._input();

            that.popup = new ui.Popup(that.ul, {
                anchor: that.input
            });

            that._dataAccessors();

            that._dataSource();

            that.bind([CHANGE], that.options);

            that.input.bind({
                keydown: proxy(that._keydown, that),
                blur: function() {
                    if (!that._current) {
                        that.value(that.text()); //select by text, not by value... just use that.select(predicate); also with value will not raise change event.
                    }
                    that._bluring = setTimeout(function() {
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
                that.showBusy();
                that.dataSource.bind(CHANGE, proxy(that._select, that));
                that.dataSource.query();
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
            filter: "none",
            suggest: false
        },

        enable: function(enable) {
            var that = this,
                wrapper = that.wrapper,
                input = that.input,
                arrow = that.arrow,
                CLICK = "click",
                ATTRIBUTE = "disabled";

            if (enable === false) {
                wrapper.addClass(DISABLED)
                input.attr(ATTRIBUTE, ATTRIBUTE);
                arrow.unbind(CLICK);
            } else {
                wrapper.removeClass(DISABLED);
                input.removeAttr(ATTRIBUTE);
                arrow.bind(CLICK, proxy(that.toggle, that));
            }
        },

        close: function() {
            this.popup.close();
        },

        open: function() {
            var that = this,
                selected = that._selected;

            if (!that.ul[0].firstChild) {
                that.showBusy();
                that.dataSource.bind(CHANGE, proxy(that._select, that));
                that.dataSource.query();
            } else if (selected && that._filtered) {
                that._filtered = false;
                that.showBusy();
                that.dataSource.bind(CHANGE, proxy(that._select, that));
                that.dataSource.query();
            } else {
                that.popup.open()
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

        refresh: function() {
            var that = this,
                ul = that.ul,
                options = that.options,
                height = options.height,
                data = that.dataSource.view(),
                length = data.length;

            ul[0].innerHTML = kendo.render(that.template, data);
            ul.height(length * 20 > height ? height : "auto");

            if (options.suggest && length) {
                that.current($(that.ul[0].firstChild));
                that.suggest(that._current);
            }

            if (!options.autoBind) {
                that.popup[length ? OPEN : CLOSE]();
            }

            options.autoBind = false;

            that.hideBusy();
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
                idx = -1,
                length,
                text = "",
                value,
                data = that.dataSource.view(),
                children = that.ul[0].childNodes;

            that.current(null);

            if (typeof li === "function") {
                for (idx = 0, length = data.length; idx < length; idx++) {
                    if (li(data[idx])) {
                        li = idx;
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

        select: function(li) {

            var that = this,
                text,
                value,
                current = that._selected,
                idx = that.highlight(li),
                data = that.dataSource.view();

            if (current) {
                current.removeClass(SELECTED);
            }

            if (idx !== -1) {
                that._selected = that._current.addClass(SELECTED);

                data = data[idx];
                text = that._text(data);
                value = that._value(data);

                that.text(text);
                that.element[0].value = value !== undefined ? value : text;
            }
        },

        search: function() {
            var that = this,
                options = that.options,
                word = that.text(),
                length = word.length;

            clearTimeout(that._typing);

            if (!length) {
                that.close();
            } else if (length >= options.minLength) {

                if (options.filter === "none") {
                    var that = this,
                        predicate = function(dataItem) {
                            var text = that._text(dataItem);
                            if(text !== undefined) {
                                return (text + "").toLowerCase().indexOf(word.toLowerCase()) === 0;
                            }
                        },
                        handler = function () {
                            that.search();
                            that.dataSource.unbind(CHANGE, handler);
                        }

                    if (!that.ul[0].firstChild) {
                        that.dataSource.bind(CHANGE, handler);
                        that.dataSource.read();
                        return;
                    }

                    if (that.highlight(predicate) !== -1) {
                        if (that.options.suggest && that._current) {
                            that.suggest(that._current);
                        }
                        that.open();
                    }

                } else {
                    that._filtered = true;
                    that.current(null);
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
                        var val = that._value(dataItem);

                        val = val !== undefined ? val : that._text(dataItem);

                        if (val == value) {
                            return idx;
                        }
                    })[0];
                }

                if (index !== undefined) {
                    that.select(index);
                } else {
                    if (that._current) {
                        that._selected.removeClass(SELECTED);
                        that.current(null);
                    }

                    if (that.element.is(SELECT)) {
                        that._custom.text(value);
                    }

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

        _customOption: function() {
            var that = this,
                element = that.element;

            if (element.is(SELECT)) {
                that._custom = $("<option></option>");
                element.append(that._custom);
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

        _select: function() {
            var that = this,
                value = that.value();

            if (value) {
                that.value(value);
            } else {
                that.select(that.options.index);
            }

            that.previous = that.value();

            that.dataSource
                .unbind(CHANGE)
                .bind(CHANGE, proxy(that.refresh, that));
        },

        _input: function() {
            var that = this,
                wrapper = that.wrapper,
                SELECTOR = ".t-input",
                input;

            input = wrapper.find(SELECTOR);

            if (!input[0]) {
                wrapper.append('<div class="t-dropdown-wrap t-state-default"><input class="t-input" type="text" autocomplete="off"></input><span class="t-select"><span class="t-icon t-arrow-down">select</span></span></div>')
                       .append(that.element);

                input = wrapper.find(SELECTOR);
            }
            that.input = input;

            that.arrow = wrapper.find(".t-icon");
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

            setTimeout(function() {
                var current = that._current;
                if (current && !that.input.val()) {
                    that.ul.children().removeClass(SELECTED); //should use that._selected
                    that.current(null);
                }
            });
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

        _wrapper: function() {
            var that = this,
                element = that.element,
                wrapper;

            wrapper = element.parent();

            if (!wrapper.is("div")) {
                wrapper = element.hide().wrap("<div />").parent();
            }

            that.wrapper = wrapper.addClass("t-widget t-combobox t-header");
        }
    });

    ui.plugin("ComboBox", ComboBox);
})(jQuery);
