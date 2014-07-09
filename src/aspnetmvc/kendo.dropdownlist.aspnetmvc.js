(function(f, define){
    define([ "./kendo.data.aspnetmvc" ], f);
})(function(){

(function ($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui;

    if (ui && ui.DropDownList) {
        ui.DropDownList.requestData = function (selector) {
            var dropdownlist = $(selector).data("kendoDropDownList"),
                filters = dropdownlist.dataSource.filter(),
                value = dropdownlist.input.val();

            if (!filters) {
                value = "";
            }

            return { text: value };
        };
    }

})(window.kendo.jQuery);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
