(function(f, define){
    define([ "./kendo.combobox.aspnetmvc" ], f);
})(function(){

(function ($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui;

    if (ui && ui.MultiSelect) {
        ui.MultiSelect.requestData = function (selector) {
            return { text: $(selector).data("kendoMultiSelect").input.val() };
        };
    }

})(window.kendo.jQuery);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
