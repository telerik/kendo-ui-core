(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        List = ui.List,
        DataSource = kendo.data.DataSource,
        OPEN = "open",
        CLOSE = "close",
        CHANGE = "change",
        LOADING = "t-loading",
        SELECTED = "t-state-selected",
        DISABLED = "t-state-disabled",
        proxy = $.proxy;

    var ComboBox = List.extend({
        init: function(element, options) {
            var that = this;

            options = $.isArray(options) ? { dataSource: options } : options;

            List.fn.init.call(that, element, options);

            that._wrapper();

            that._input();

            that.arrow = that.input.next().children();

            that.popup = new ui.Popup(that.ul, {
                anchor: that.input
            });

            that._dataAccessors();

            that._dataSource();

            that.bind([CHANGE], that.options);

            that.input.bind({
                keydown: proxy(that._keydown, that),
                blur: function() {
                    that._bluring = setTimeout(function() {
                        that._blur();
                    }, 100);
                }
            });

            if (that.element.prop("disabled")) {
                that.options.enable = false;
            }

            that.enable(that.options.enable);

            if (that.options.autoBind) {
               that.showBusy();
               that.dataSource.query();
            }
        },

        options: {
            enable: true,
            index: -1,
            autoBind: true,
            delay: 500,
            dataTextField: "text",
            dataValueField: "value",
            minLength: 1,
            height: 200
        },

        enable: function(enable) {
            var that = this,
                wrapper = that.wrapper,
                input = that.input,
                arrow = that.arrow;

            if (enable === false) {
                wrapper.addClass('t-state-disabled')
                input.attr('disabled', 'disabled');
                arrow.unbind('click');
            } else {
                wrapper.removeClass('t-state-disabled');
                input.removeAttr("disabled");
                arrow.bind('click', proxy(that.toggle, that));
            }
        },

        close: function() {
            this.popup.close();
        },

        open: function() {
            var that = this
                current = that._current;

            if (!that.ul[0].firstChild) {
                that.showBusy();
                that.options.autoBind = false;
                that.dataSource.query();
            } else {
                that.popup.open()
                if (current) {
                    that._scroll(current[0]);
                }
            }
        },

        toggle: function() {
            var that = this;
            that.input.focus();
            that[that.popup.visible() ? CLOSE : OPEN]();
        },

        refresh: function() {
            var that = this,
                options = that.options,
                height = options.height,
                data = that.dataSource.view();

            that.ul[0].innerHTML = kendo.render(that.template, data);

            that.ul.height(data.length * 20 > height ? height : "auto");

            that.select(that.options.index);

            that.previous = that.value();

            if (!that.options.autoBind) {
                that[data.length ? OPEN : CLOSE]();
            }

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

        select: function(li) {
            var that = this,
                idx,
                length,
                text = "",
                value,
                current = that._current,
                data = that.dataSource.view(),
                children = that.ul[0].childNodes;

            if (current) {
                current.removeClass(SELECTED);
            }

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

            if (li[0] && !li.hasClass(SELECTED)) {
                idx = $.inArray(li[0], children);

                if (idx === -1) {
                    return;
                }

                data = data[idx];
                text = that._text(data);
                value = that._value(data);

                that.current(li.addClass(SELECTED));
            }

            that.text(text);
            that.element[0].value = value != undefined ? value : text;
        },

        search: function() {
            var that = this,
                word = that.text(),
                length,
                caret,
                index;

            //that._current = null;

            clearTimeout(that._typing);

            length = word.length;

            if (!length) {
                that.popup.close();
            } else if (length >= that.options.minLength) {
                that.dataSource.filter( { operator: "startswith", value: word } );
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
                element = that.element[0];

            if (value !== undefined) {
                element.value = value;
            } else {
                return element.value;
            }
        },

        _accept: function(li) {
            var that = this;

            that.select(li);
            that._blur();

            if (that.input[0] !== document.activeElement) {
                that.input.focus();
            }

            //moveCaretAtEnd(that.element[0]);
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

            if(element.is("select")) {
                options.index = element.children(":selected").index();

               dataSource.select = element;
               dataSource.fields = [{ field: options.dataTextField },
                                    { field: options.dataValueField }];
            }

            that.dataSource = DataSource.create(dataSource).bind(CHANGE, proxy(that.refresh, that));
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
        },

        _move: function(li) {
            var that = this;

            if (li[0]) {
                that.select(li);
            }
        },

        _keydown: function(e) {
            var prevent,
                that = this,
                key = e.keyCode,
                keys = kendo.keys,
                select = function(li) {
                    if (li[0]) {
                        that.select(li);
                    }
                };

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
        },

        _search: function() {
            var that = this;
            clearTimeout(that._typing);

            that._typing = setTimeout(function() {
                if (that.previous !== that.value()) {
                    that.search();
                }
            }, that.options.delay);
        },

        _wrapper: function() {
            var that = this,
                element = that.element,
                TABINDEX = "tabIndex",
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
