(function($, window) {
    var kendo = window.kendo;

    function ListView(element, options) {
        var that = this;
        that.element = element;
        that.wrapper = $(element);

        that.options = $.extend({}, that.options, options);
        that.template = that.options.template;
        that.dataSource = options.dataSource;

        that.wrapper.addClass("list-view");

        that.wrapper.delegate(".list-view > *", "click",  $.proxy(that._click, that));
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

            this.wrapper.trigger("kendo:dataBind");
        },
        _click: function(e) {
            this.wrapper.trigger("kendo:change", [e.currentTarget]);
        }
    };

    $.fn.kendoListView = function(options) {
        $(this).each(function() {
            $(this).data("kendoListView", new ListView(this, options));
        });

        return this;
    }

    kendo.ui.ListView = ListView;

})(jQuery, window);
