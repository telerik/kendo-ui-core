(function($, window, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        DataSource = kendo.data.DataSource,
        Component = ui.Component,
        extend = $.extend;

    function AutoComplete(element, options) {
        var that = this;

        options = $.isArray(options) ? { data: options } : options;

        Component.call(that, element, options);

        that.ul = $("<ul/>");

        that.popup = new ui.Popup(that.ul, {
            anchor: that.element
        });

        that.list = new ui.List(that.ul, {
            template: that.options.template
        });

        that._dataSource();

        that.dataSource.read();
    }

    AutoComplete.prototype = {
        options: {
            multiple: false,
            separator: ', ',
            template: "<li><%= data %></li>"
        },

        refresh: function() {
            var that = this,
                data = that.dataSource.view();


            that.list.dataBind(data);
        },

        _dataSource: function() {
            var that = this,
                options = that.options,
                dataSource = options.dataSource || {};

            if (options.data) {
                dataSource.data = options.data;
            }

            that.dataSource = DataSource.create(dataSource);
            that.dataSource.bind("change", $.proxy(that.refresh, that));
        }
    }

    ui.plugin("AutoComplete", AutoComplete, Component);
})(jQuery, window);
