(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Component = ui.Component,
        DataSource = kendo.data.DataSource,
        CHANGE = "change",
        SELECTED = "t-state-selected",
        FOCUSED = "t-state-focused",
        proxy = $.proxy,
        whiteSpaceRegExp = /\s+/;

    function getDropDownItems(select) {
        var items = [];
        var options = select.find('option');

        for (var i = 0, length = options.length; i < length; i++) {
            var option = options.eq(i);
            items[i] = {
                Text: option.text(),
                Value: option.val()
            }
        }
        return items;
    }

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

            that._template(options && options.template);

            that._dataAccessors();

            that._dataSource();

            that.ul.delegate("li", "click", proxy(that._click, that));

            that.wrapper
                .bind({
                    keydown: proxy(that._keydown, that),
                    click: function() {
                        if(!that.ul.children()[0]) {
                            that.dataSource.read();
                        } else {
                            that.popup.toggle();
                        }
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
            dataTextField: "Text",
            dataValueField: "Value"
        },

        _click: function(e) {
            var that = this;
            that.select($(e.currentTarget));
            that.popup.close();
        },

        _template: function(isCustomTemplate) {
            var that = this,
                options = that.options,
                dataTextField = options.dataTextField;

            if(!isCustomTemplate){
                options.template = "<%= kendo.getter('" + options.dataTextField + "')(data) %>";
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
            var li,
                that = this,
                key = e.keyCode,
                keys = kendo.keys;

            if (key === keys.DOWN) {
                li = that._current.next();
                if(li[0]) {
                    that.select(li);
                }

                e.preventDefault();
            } else if (key === keys.UP) {
                li = that._current.prev();
                if(li[0]) {
                    that.select(li);
                }
                e.preventDefault();
            } else if (key === keys.HOME) {
                li = that.ul.children().first();
                if(li[0]) {
                    that.select(li);
                }
                e.preventDefault();
            } else if (key === keys.END) {
                li = that.ul.children().last();
                if(li[0]) {
                    that.select(li);
                }
                e.preventDefault();
            } else if (key === keys.ENTER) {
                that.popup.close();
            } else if (key === keys.ESC) {
                that.popup.close();
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

        _value: function(value) {
            var element = this.element[0];

            if (value !== undefined) {
                element.value = value;
            } else {
                return element.value;
            }
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

        refresh: function() {
            var that = this,
                data = that.dataSource.view();

            that.ul[0].innerHTML = kendo.render(that.template, data);

            that.select(that.options.index);

            if(!that.options.autoBind) {
                that.popup[data.length ? "open" : "close"]();
            }
        },

        select: function(li) {
            var text,
                dataItem,
                that = this,
                options = that.options,
                liItems = that.ul.children().removeClass(SELECTED);

            if (!isNaN(li - 0) && li > -1) {
                li = liItems.eq(li);
            }

            if (li[0] && !li.hasClass(SELECTED)) {
                dataItem = that.dataSource.view()[li.index()];
                text = that._getText(dataItem);

                that.text(text);
                that._value(that._getValue(dataItem) || text);
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
            return this._value(value);
        }
    });

    ui.plugin("DropDownList", DropDownList);
})(jQuery);

