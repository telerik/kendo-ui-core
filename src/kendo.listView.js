(function($, window) {
    var kendo = window.kendo,
        CHANGE = "change",
        DATABOUND = "dataBound"
        Component = kendo.ui.Component,
        DataSource = kendo.data.DataSource;


    function ListView(element, options) {
        var that = this;

        options = $.isArray(options) ? { data: options } : options;

        Component.apply(that, arguments);

        that.bind([CHANGE,DATABOUND], options);

        that._dataSource();

        that.template = that.options.template;

        that._selection();

        that._navigation();

        that.dataSource.read();
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
            that.dataSource.bind(CHANGE, $.proxy(that._render, that));
        },
        _render: function() {
            var that = this,
                data = that.dataSource.view(),
                list = new kendo.ui.List(that.element, { data: data, template: that.template });

            this.trigger(DATABOUND);
        },
        _selection: function() {
            var that = this;
            that.selectable = new kendo.ui.Selectable(that.element, {
                change: function() {
                    that.trigger(CHANGE);
                }
            });
            that.element.keydown(function(e) {
                if (e.keyCode === kendo.keys.SPACEBAR) {

                    that.selectable.clear();

                    that.selectable.value(that.navigatable.current);
                }
            });

        },
        _navigation: function() {
            var that = this;

            that.navigatable = new kendo.ui.Navigatable(that.element, {
                context: that.element,
            });
       },
        selected: function() {
            return this.selectable.value();
        }
    };

    kendo.ui.plugin("ListView", ListView, Component);
})(jQuery, window);
