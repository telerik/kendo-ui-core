(function($, window) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Component = ui.Component;

    function List(element, options) {
        var that = this;

        Component.apply(that, arguments);

        that.template = kendo.template(that.options.template);
        that.dataBind(that.options.data);
    }

    List.prototype = {
        options: {
            data: [],
            template: ""
        },
        dataBind: function(data) {
            var that = this,
                idx,
                length,
                html = "";

            for (idx = 0, length = data.length; idx < length; idx++) {
                html += that.template(data[idx]);
            }

            that.element.html(html);
        }
    }

    ui.plugin("List", List, Component);

})(jQuery, window);
