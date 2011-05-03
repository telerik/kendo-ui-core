(function($, window, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        DataSource = kendo.data.DataSource,
        List = kendo.ui.List,
        Component = ui.Component,
        extend = $.extend;

    function AutoComplete(element, options) {
        var that = this;

        options = $.isArray(options) ? { data: options } : options;

        Component.call(that, element, options);
    }

    AutoComplete.prototype = {
        options: {
            multiple: false,
            separator: ', '
        }
    }

    ui.plugin("AutoComplete", AutoComplete, Component);
})(jQuery, window);
