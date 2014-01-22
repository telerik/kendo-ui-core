(function ($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui;

    if (ui && ui.MultiSelect) {
        ui.MultiSelect.requestData = function (selector) {
            var multiselect = $(selector).data("kendoMultiSelect");
            var text = multiselect.input.val();
            
            return { text: text !== multiselect.options.placeholder ? text : "" };
        };
    }

})(window.kendo.jQuery);