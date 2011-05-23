(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Component = ui.Component,
        DataSource = kendo.data.DataSource,
        CHANGE = "change",
        proxy = $.proxy;

    function getDropDownItems(select) {
        var items = [];
        var options = select.find('option');

        for (var i = 0, length = options.length; i < length; i++) {
            var option = options.eq(i);
            items[i] = {
                Text: option.text(),
                Value: option.val()
                //Selected: option.is(':selected')
            }
        }
        return items;
    }

    function DropDownList(element, options) {
        var that = this;

        options = $.isArray(options) ? { dataSource: options } : options;

        Component.call(that, element, options);

        that._initDataSourceFromSelect();

        that._wrapper();

        that._text();

        that.ul = $("<ul/>");

        that.popup = new ui.Popup(that.ul, {
            anchor: that.wrapper
        });

        that.template = kendo.template(that.options.template);

        that._dataSource();

        that._selectable();

        that.wrapper.bind("click", function(){
            if(that.ul.has("li")) { 
                that.dataSource.read();
            } else {
                that.popup.toggle();
            }
        });
    }

    DropDownList.prototype = {
        options: {
            template: "<li unselectable='on'><%= data.Text %></li>", //unselectable=on is required for IE to prevent the suggestion box from stealing focus from the input
        },

        _click: function() {
            console.log("clicked");
        },

        _dataSource: function() {
            var that = this;

            that.dataSource = DataSource.create(that.options.dataSource || {})
                                        .bind(CHANGE, proxy(that.refresh, that));
        },

        _initDataSourceFromSelect: function() {
            var that = this,
                element = that.element;

            if(element.is("select") && !that.options.dataSource) {
                that.options.dataSource = getDropDownItems(element);
            }
        },

        _selectable: function() {
            var that = this;
            that.selectable = new ui.Selectable(that.element)
                             .bind(CHANGE, proxy(that._click, that));
        },

        _text: function() {
            var that = this,
                wrapper = that.wrapper,
                textWrapper,
                text;

            text = wrapper.find(".t-input");

            if (!text[0]) {
                text = $('<span class="t-input">&nbsp;</span>');
                textWrapper = $('<div class="t-dropdown-wrap t-state-default" />')
                                .append(text)
                                .append('<span class="t-select"><span class="t-icon t-arrow-down">select</span></span>');

                wrapper.append(textWrapper)
                       .append(that.element);
            }

            that.text = text;
        },

        _wrapper: function() {
            var that = this,
                element = that.element,
                wrapper;

            wrapper = element.parent();

            if (!wrapper.is("div")) {
                wrapper = element.hide().wrap("<div />").parent();
            }

            that.wrapper = wrapper.addClass("t-widget t-dropdown t-header");
        },

        refresh: function() {
            var that = this,
                data = that.dataSource.view();

            that.ul[0].innerHTML = kendo.render(that.template, data);

            that.popup[data.length ? "open" : "close"]();
        },
    }

    ui.plugin("DropDownList", DropDownList, Component);
})(jQuery);

