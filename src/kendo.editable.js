(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Component = ui.Component,
        Binder = kendo.data.ModelViewBinder;

    var Editable = Component.extend({
        init: function(element, options) {
            var that = this;

            Component.fn.init.call(that, element, options);

            that.refresh();
        },

        refresh: function() {
            var that = this,
                idx,
                length,
                fields = that.options.fields || [],
                container = that.element.empty();

            if (!(fields instanceof Array)) {
                fields = [fields];
            }

            for(idx = 0, length = fields.length; idx < length; idx++) {
                $('<input name="' + fields[idx] + '"/>').appendTo(container);
            }

            new Binder(container, that.options.model);
        }
   });

   ui.plugin("Editable", Editable);
})(jQuery);
