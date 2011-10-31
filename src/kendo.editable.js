(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Widget = ui.Widget,
        extend = $.extend,
        isFunction = $.isFunction,
        isPlainObject = $.isPlainObject,
        inArray = $.inArray,
        Binder = kendo.data.ModelViewBinder,
        Validatable = ui.Validatable,
        DATATYPE = "data-kendo-type";

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
                attr[DATATYPE] = ruleName;
            } else if (!isFunction(rule)) {
                attr[ruleName] = isPlainObject(rule) ? rule.value || ruleName : rule;
            }

            attr["data-kendo-" + ruleName + "-msg"] = rule.message;
        }

        if (inArray(type, specialRules) >= 0) {
            attr[DATATYPE] = type;
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
            name: "Editable",
            editors: editors
        },

        editor: function(field, modelField) {
            var that = this,
                editors = that.options.editors,
                isObject = isPlainObject(field),
                fieldName = isObject ? field.field : field,
                model = that.options.model || {},
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
                container = that.element.empty(),
                model = that.options.model || {},
                rules = {};

            if (!$.isArray(fields)) {
                fields = [fields];
            }

            for(idx = 0, length = fields.length; idx < length; idx++) {
                var field = fields[idx],
                    isObject = isPlainObject(field),
                    fieldName = isObject ? field.field : field,
                    modelField = (model.fields || {})[fieldName],
                    validation = modelField ? (modelField.validation || {}) : {};

                for (var rule in validation) {
                    if (isFunction(validation[rule])) {
                        rules[rule] = validation[rule];
                    }
                }

                that.editor(field, modelField);
            }

            new Binder(container, that.options.model);

            that.validatable = new Validatable(container, { rules: rules });
        }
   });

   ui.plugin(Editable);
})(jQuery);
