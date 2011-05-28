(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Component = ui.Component,
        DataSource = kendo.data.DataSource,
        CHANGE = "change",
        FOCUSED = "t-state-focused",
        SELECTED = "t-state-selected",
        proxy = $.proxy,
        whiteSpaceRegExp = /\s+/;

    var DropDownList = Component.extend({
        init: function(element, options) {
            var that = this;

            options = $.isArray(options) ? { dataSource: options } : options;

            Component.fn.init.call(that, element, options);

            that._wrapper();

            that._span();

            that.ul = $("<ul/>");

            that.popup = new ui.Popup(that.ul, {
                anchor: that.wrapper
            });

            that._template();

            that._dataAccessors();

            that._dataSource();

            that.bind([CHANGE], that.options);

            that.ul
                .mousedown(function() {
                    setTimeout(function() {
                        clearTimeout(that._bluring);
                    }, 0);
                })
                .delegate("li", "click", proxy(that._click, that));

            that.wrapper
                .bind({
                    keydown: proxy(that._keydown, that),
                    click: function() {
                        if(!that.ul.children()[0]) {
                            that.dataSource.read();
                        } else {
                            that.popup.toggle();
                        }
                    },
                    blur: function() {
                        that._bluring = setTimeout(function() {
                            that._blur();
                        }, 100);
                    }
                });

            if (that.options.autoBind) {
                that.dataSource.query();
            }
        },

        options: {
            index: 0,
            autoBind: true,
            dataSource: {},
            dataTextField: "text",
            dataValueField: "value"
        },

        _accept: function(li) {
            var that = this;

            that.select(li);
            that._blur();

            if (that.wrapper[0] !== document.activeElement) {
                that.wrapper.focus();
            }
        },

        _click: function(e) {
            this._accept($(e.currentTarget));
        },

        _template: function(isCustomTemplate) {
            var that = this,
                options = that.options,
                dataTextField = options.dataTextField;

            if(!options.template){
                options.template = "<%= this._getText(data) %>";
            }

            that.template = kendo.template("<li unselectable='on'>" + options.template + "</li>"); //unselectable=on is required for IE to prevent the suggestion box from stealing focus from the input
        },

        _dataAccessors: function() {
            var that = this,
                options = that.options,
                getter = kendo.getter;

            that._getText = getter(options.dataTextField);
            that._getValue = getter(options.dataValueField);
        },

        _dataSource: function() {
            var that = this;
                element = that.element,
                options = that.options,
                dataSource = options.dataSource;

            if($.isPlainObject(dataSource) && element.is("select")) {
                options.index = element.children(":selected").index();
                $.extend(dataSource, {select: element, fields: [{ field: options.dataTextField }, { field: options.dataValueField }] });
            }

            that.dataSource = DataSource.create(dataSource || {}).bind(CHANGE, proxy(that.refresh, that));
        },

        _keydown: function(e) {
            var prevent,
                that = this,
                TRUE = true,
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
                select(that._current.next());

                prevent = TRUE;
            } else if (key === keys.UP) {
                select(that._current.prev());

                prevent = TRUE;
            } else if (key === keys.HOME) {
                select(that.ul.children().first());

                prevent = TRUE;
            } else if (key === keys.END) {
                select(that.ul.children().last());

                prevent = TRUE;
            } else if (key === keys.ENTER || key === keys.TAB) {
                that._accept(that._current);
            } else if (key === keys.ESC) {
                that.close();
            }

            if (prevent) {
                e.preventDefault();
            }
        },

        _span: function() {
            var that = this,
                wrapper = that.wrapper,
                SELECTOR = ".t-input",
                span;

            span = wrapper.find(SELECTOR);

            if (!span[0]) {
                wrapper.append('<div class="t-dropdown-wrap t-state-default"><span class="t-input">&nbsp;</span><span class="t-select"><span class="t-icon t-arrow-down">select</span></span></div>')
                       .append(that.element);

                span = wrapper.find(SELECTOR);
            }
            that.span = span;
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

            if (!wrapper.attr(TABINDEX)) {
                wrapper.attr(TABINDEX, 0);
            }

            that.wrapper = wrapper.addClass("t-widget t-dropdown t-header");
        },

        _blur: function() {
            var that = this;

            that._change();
            that.close();
        },

        _change: function() {
            var that = this,
                value = that.value();

            if (value !== that.previous) {
                that.trigger(CHANGE);

                // trigger the DOM change event so any subscriber gets notified
                that.element.trigger(CHANGE);

                that.previous = value;
            }
        },

        current: function(candidate) {
            var that = this;

            if (candidate !== undefined) {
                if (that._current) {
                    that._current.removeClass(FOCUSED);
                }

                if (candidate) {
                    candidate.addClass(FOCUSED);
                }
                that._current = candidate;
            } else {
                return that._current;
            }
        },

        open: function() {
            var that = this;
            if (!that.ul.children()[0]) {
                that.options.autoBind = false;
                that.dataSource.query();
            } else {
                that.popup.open();
            }
        },

        close: function() {
            this.popup.close();
        },

        refresh: function() {
            var that = this,
                options = that.options,
                data = that.dataSource.view();

            that.ul[0].innerHTML = kendo.render(proxy(that.template, that), data);

            that.select(that.options.index);

            that.previous = that.value();

            if (!that.options.autoBind) {
                that.popup[data.length ? "open" : "close"]();
            }
        },

        select: function(argument) {
            var idx,
                text,
                dataItem,
                that = this,
                options = that.options,
                data = that.dataSource.view(),
                liItems = that.ul.children().removeClass(SELECTED);

            if (!isNaN(argument - 0) && argument > -1) {

                argument = liItems.eq(argument);

            } else if ($.isFunction(argument)) {

                for (var i = 0, len = data.length; i < len; i++) {
                    if (argument(data[i])) {
                        idx = i;
                        break;
                    }
                }

                argument = liItems.eq(idx);
            }

            if (argument[0] && !argument.hasClass(SELECTED)) {
                idx = argument.index();

                if (idx === -1) {
                    return;
                }

                dataItem = that.dataSource.view()[idx];
                text = that._getText(dataItem);

                that.text(text);
                that.element.val(that._getValue(dataItem) || text);
                that.current(argument.addClass(SELECTED));
            }
        },

        text: function (text) {
            var span = this.span;

            if (text !== undefined) {
                span.html(text && !whiteSpaceRegExp.test(text) ? text : '&nbsp&nbsp');
            } else {
                return span.html();
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
                        if ((that._getValue(dataItem) || that._getText(dataItem)) == value) {
                            return idx;
                        }
                    });
                    that.select(index[0] || 0);
                    that.previous = element.val();
                }
            } else {
                return element.val();
            }
        }
    });

    ui.plugin("DropDownList", DropDownList);
})(jQuery);
