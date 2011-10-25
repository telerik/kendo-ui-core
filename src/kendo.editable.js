(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Widget = ui.Widget,
        Binder = kendo.data.ModelViewBinder;

    var editors = {
        "number": function(container, options) {
            $('<input name="' + options.field + '" type="number"/>').appendTo(container);
        },
        "date": function(container, options) {
            $('<input name="' + options.field + '" type="date"/>').appendTo(container).kendoDatePicker();
        },
        "string": function(container, options) {
            $('<input type="text" name="' + options.field + '"/>').appendTo(container);
        }
    };

    var Editable = Widget.extend({
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            that.refresh();
        },

        options: {
            name: "Editable"
        },

        editor: function(field) {
            var that = this,
                model = that.options.model || {},
                isObject = $.isPlainObject(field),
                fieldName = isObject ? field.field : field,
                modelField = (model.fields || {})[fieldName],
                fieldType = modelField && modelField.type ? modelField.type : "string",
                editor = isObject && field.editor ? field.editor : editors[fieldType];

            return editor(that.element, $.extend(true, {}, isObject ? field : { field: fieldName }, { model: model }));
        },

        refresh: function() {
            var that = this,
                idx,
                length,
                fields = that.options.fields || [],
                container = that.element.empty();

            if (!$.isArray(fields)) {
                fields = [fields];
            }

            for(idx = 0, length = fields.length; idx < length; idx++) {
                that.editor(fields[idx]);
            }

            new Binder(container, that.options.model);
        }
   });

   ui.plugin(Editable);
})(jQuery);
