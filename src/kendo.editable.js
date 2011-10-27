(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Widget = ui.Widget,
        extend = $.extend,
        isFunction = $.isFunction,
        inArray = $.inArray,
        Binder = kendo.data.ModelViewBinder;

    var specialRules = ["url", "email", "number", "date", "boolean"];

    function createInput(options) {
        var field = options.model.fields[options.field],
            type = field.type,
            validation = field.validation,
            ruleName,
            rule,
            attr = {
                name: options.field,
                type: type == "boolean" ? "checkbox" : "text"
            };

        for (ruleName in validation) {
            rule = validation[ruleName];

            if (inArray(ruleName, specialRules) >= 0) {
                attr["data-kendo-type"] = ruleName;
            } else if (!isFunction(rule)) {
                attr[ruleName] = rule;
            }
        }

        if (inArray(type, specialRules) >= 0) {
            attr["data-kendo-type"] = type;
        }

        return $("<input />").attr(attr);
    }

    var editors = {
        "number": function(container, options) {
            createInput(options).appendTo(container);
        },
        "date": function(container, options) {
            createInput(options).appendTo(container).kendoDatePicker();
        },
        "string": function(container, options) {
            createInput(options).appendTo(container);
        },
        "boolean": function(container, options) {
            createInput(options).appendTo(container);
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

            editor = editor ? editor : editors["string"];

            if (modelField) {
                editor(that.element, extend(true, {}, isObject ? field : { field: fieldName }, { model: model }));
            }
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
