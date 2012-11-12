(function ($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui;

    if (ui && ui.ComboBox) {
        ui.ComboBox.requestData = function (selector) {
            var combobox = $(selector).data("kendoComboBox"),
                filters = combobox.dataSource.filter(),
                value = combobox.input.val();

            if (!filters) {
                value = "";
            }

            return { text: value };
        };
    }

})(window.kendo.jQuery);
