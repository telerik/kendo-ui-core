(function($, window) {
    var kendo = window.kendo,
        Component = kendo.ui.Component,
        DataSource = kendo.data.DataSource;


    function ListView(element, options) {
        var that = this;

        options = $.isArray(options) ? { data: options } : options;

        Component.apply(that, arguments);

        that._dataSource();

        that.template = that.options.template;

        that.element.addClass("list-view")
                    .delegate(".list-view > *", "click",  $.proxy(that._click, that));
    }

    ListView.prototype = {
        options: {
            template: ""
        },
        _dataSource: function() {
            var that = this,
                options = that.options,
                dataSource = options.dataSource;

            if ($.isPlainObject(dataSource) && options.data) {
                dataSource.data = options.data;
            }

            that.dataSource = DataSource.create(dataSource);
            that.dataSource.bind("change", $.proxy(that._render, that));
        },
        _render: function() {
            var that = this,
                data = that.dataSource.view(),
                list = new kendo.ui.List(that.element, { data: data, template: that.template });

            this.trigger("dataBound");
        },
        _click: function(e) {
            this.trigger("change", [e.currentTarget]);
        }
    };

    kendo.ui.plugin("ListView", ListView, Component);
})(jQuery, window);
