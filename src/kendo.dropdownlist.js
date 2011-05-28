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

            that._word = "";

            options = $.isArray(options) ? { dataSource: options } : options;

            Component.fn.init.call(that, element, options);

            that._wrapper();

            that._span();

            that.ul = $("<ul/>");

            that.popup = new ui.Popup(that.ul, {
                anchor: that.wrapper
            });

            that._dataAccessors();

            that._dataSource();

            that._template();

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
                    keypress: function(e) {
                        setTimeout(function() {
                            that._word += String.fromCharCode(e.keyCode);
                            that._search();
                        });
                    },
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
            delay: 500,
            dataSource: {},
            dataTextField: "text",
            dataValueField: "value"
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

        close: function() {
            this.popup.close();
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

        refresh: function() {
            var that = this,
                options = that.options,
                data = that.dataSource.view();

            that.ul[0].innerHTML = kendo.render(that.template, data);

            that.select(that.options.index);

            that.previous = that.value();

            if (!that.options.autoBind) {
                that.popup[data.length ? "open" : "close"]();
            }
        },

        search: function(word) {
            if(word){
                var that = this;
                that.select(function(dataItem) {
                    var text = that._text(dataItem);
                    text = text ? text.toString() : "";
                    text = text.toLowerCase().slice(0, word.length);
                    return text == word.toLowerCase();
                });
            }
        },

        select: function(li) {
            var that = this,
                idx,
                length,
                text,
                data = that.dataSource.view(),
                children = that.ul.children().removeClass(SELECTED);

            if (typeof li === "function") {
                for (idx = 0, length = data.length; idx < length; idx++) {
                    if (li(data[idx])) {
                        li = idx;
                        break;
                    }
                }
            }

            if (typeof li === "number") {
                li = children.eq(li);
            }

            if (li[0] && !li.hasClass(SELECTED)) {
                idx = li.index();

                if (idx === -1) {
                    return;
                }

                data = data[idx];
                text = that._text(data);

                that.text(text);
                that.element.val(that._value(data) || text);
                that.current(li.addClass(SELECTED));
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
                        if ((that._value(dataItem) || that._text(dataItem)) == value) {
                            return idx;
                        }
                    });
                    that.select(index[0] || 0);
                    that.previous = element.val();
                }
            } else {
                return element.val();
            }
        },

        _accept: function(li) {
            var that = this;

            that.select(li);
            that._blur();

            if (that.wrapper[0] !== document.activeElement) {
                that.wrapper.focus();
            }
        },

        _blur: function() {
            var that = this;

            that._change();
            that.close();
        },

        _click: function(e) {
            this._accept($(e.currentTarget));
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

        _dataAccessors: function() {
            var that = this,
                options = that.options,
                getter = kendo.getter;

            that._text = getter(options.dataTextField);
            that._value = getter(options.dataValueField);
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

                prevent = true;
            } else if (key === keys.UP) {
                select(that._current.prev());

                prevent = true;
            } else if (key === keys.HOME) {
                select(that.ul.children().first());

                prevent = true;
            } else if (key === keys.END) {
                select(that.ul.children().last());

                prevent = true;
            } else if (key === keys.ENTER || key === keys.TAB) {
                that._accept(that._current);
            } else if (key === keys.ESC) {
                that.close();
            }

            if (prevent) {
                e.preventDefault();
            }
        },

        _search: function() {
            var that = this;
            clearTimeout(that._typing);

            that._typing = setTimeout(function() {
                that._word = "";
            }, that.options.delay);

            that.search(that._word);
        },

        _template: function() {
            var that = this,
                options = that.options;

            options.template = options.template || "${" + (options.dataTextField || "data") + "}";

            //unselectable=on is required for IE to prevent the suggestion box from stealing focus from the input
            that.template = kendo.template("<li class='t-item' unselectable='on'>" + options.template + "</li>");
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
        }
    });

    ui.plugin("DropDownList", DropDownList);
})(jQuery);
