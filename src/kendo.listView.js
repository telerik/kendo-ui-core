(function($, window) {
    var kendo = window.kendo,
        Component = kendo.ui.Component;


    function ListView(element, options) {
        var that = this;

        Component.apply(that, arguments);

        that.element = element;
        that.wrapper = $(element);

        that.options = $.extend({}, that.options, options);
        that.template = that.options.template;
        that.dataSource = options.dataSource;

        that.wrapper.addClass("list-view")
                    .delegate(".list-view > *", "click",  $.proxy(that._click, that));
        that.dataSource.bind("change", $.proxy(that._render, that));
    }

    ListView.prototype = {
        options: {
            template: ""
        },
        _render: function() {
            var that = this,
                data = that.dataSource.view()
                list = new kendo.ui.List(that.element, { data: data, template: that.template });

            this.trigger("dataBound");
        },
        _click: function(e) {
            this.trigger("change", [e.currentTarget]);
        }
    };

    kendo.ui.plugin("ListView", ListView, Component);
})(jQuery, window);
