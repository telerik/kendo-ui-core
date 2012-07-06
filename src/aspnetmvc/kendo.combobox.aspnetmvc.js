(function ($, undefined) {
    var kendo = window.kendo;

    kendo.ui.ComboBox.requestData = function (selector) {
        var combobox = $(selector).data("kendoComboBox"),
            filters = combobox.dataSource.filter(),
            value = combobox.input.val();

        if (!filters) {
            value = "";
        }

        return { text: value };
    };

})(jQuery);