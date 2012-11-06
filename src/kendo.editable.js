(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Widget = ui.Widget,
        extend = $.extend,
        isFunction = $.isFunction,
        isPlainObject = $.isPlainObject,
        inArray = $.inArray,
        nameSpecialCharRegExp = /(\[|\]|\$|\.|\:|\+)/g,
        ERRORTEMPLATE = '<div class="k-widget k-tooltip k-tooltip-validation" style="margin:0.5em"><span class="k-icon k-warning"> </span>' +
                    '#=message#<div class="k-callout k-callout-n"></div></div>',
        CHANGE = "change";

    var specialRules = ["url", "email", "number", "date", "boolean"];

    function fieldType(field) {
        field = field != null ? field : "";
        return field.type || $.type(field) || "string";
    }

    function convertToValueBinding(container) {
        container.find(":input:not(:button, [" + kendo.attr("role") + "=upload], [" + kendo.attr("skip") + "]), select").each(function() {
            var bindAttr = kendo.attr("bind"),
                binding = this.getAttribute(bindAttr) || "",
                bindingName = this.type === "checkbox" ||  this.type === "radio" ? "checked:" : "value:",
                fieldName = this.name;

            if (binding.indexOf(bindingName) === -1 && fieldName) {
                binding += (binding.length ? "," : "") + bindingName + fieldName;

                $(this).attr(bindAttr, binding);
            }
        });
    }

    function createAttributes(options) {
        var field = (options.model.fields || options.model)[options.field],
            type = fieldType(field),
            validation = field ? field.validation : {},
            ruleName,
            DATATYPE = kendo.attr("type"),
            BINDING = kendo.attr("bind"),
            rule,
            attr = {
                name: options.field
            };

        for (ruleName in validation) {
            rule = validation[ruleName];

            if (inArray(ruleName, specialRules) >= 0) {
                attr[DATATYPE] = ruleName;
            } else if (!isFunction(rule)) {
                attr[ruleName] = isPlainObject(rule) ? rule.value || ruleName : rule;
            }

            attr[kendo.attr(ruleName + "-msg")] = rule.message;
        }

        if (inArray(type, specialRules) >= 0) {
            attr[DATATYPE] = type;
        }

        attr[BINDING] = (type === "boolean" ? "checked:" : "value:") + options.field;

        return attr;
    }

    function convertItems(items) {
        var idx,
            length,
            item,
            value,
            text,
            result;

        if (items && items.length) {
            result = [];
            for (idx = 0, length = items.length; idx < length; idx++) {
                item = items[idx];
                text = item.text || item.value || item;
                value = item.value == null ? (item.text || item) : item.value;

                result[idx] = { text: text, value: value };
            }
        }
        return result;
    }

    var editors = {
        "number": function(container, options) {
            var attr = createAttributes(options);
            $('<input type="text"/>').attr(attr).appendTo(container).kendoNumericTextBox({ format: options.format });
            $('<span ' + kendo.attr("for") + '="' + options.field + '" class="k-invalid-msg"/>').hide().appendTo(container);
        },
        "date": function(container, options) {
            var attr = createAttributes(options),
                format = options.format;

            if (format) {
                format = kendo._extractFormat(format);
            }

            attr[kendo.attr("format")] = format;

            $('<input type="text"/>').attr(attr).appendTo(container).kendoDatePicker({ format: options.format });
            $('<span ' + kendo.attr("for") + '="' + options.field + '" class="k-invalid-msg"/>').hide().appendTo(container);
        },
        "string": function(container, options) {
            var attr = createAttributes(options);

            $('<input type="text" class="k-input k-textbox"/>').attr(attr).appendTo(container);
        },
        "boolean": function(container, options) {
            var attr = createAttributes(options);
            $('<input type="checkbox" />').attr(attr).appendTo(container);
        },
        "values": function(container, options) {
            var attr = createAttributes(options);
            $('<select ' + kendo.attr("text-field") + '="text"' + kendo.attr("value-field") + '="value"' +
                kendo.attr("source") + "=\'" + kendo.stringify(convertItems(options.values)) +
                "\'" + kendo.attr("role") + '="dropdownlist"/>') .attr(attr).appendTo(container);
            $('<span ' + kendo.attr("for") + '="' + options.field + '" class="k-invalid-msg"/>').hide().appendTo(container);
        }
    };

    function addValidationRules(modelField, rules) {
        var validation = modelField ? (modelField.validation || {}) : {},
            rule;

        for (rule in validation) {
            if (isFunction(validation[rule])) {
                rules[rule] = validation[rule];
            }
        }
    }

    var Editable = Widget.extend({
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);
            that._validateProxy = $.proxy(that._validate, that);
            that.refresh();
        },

        events: [CHANGE],

        options: {
            name: "Editable",
            editors: editors,
            clearContainer: true,
            errorTemplate: ERRORTEMPLATE
        },

        editor: function(field, modelField) {
            var that = this,
                editors = that.options.editors,
                isObject = isPlainObject(field),
                fieldName = isObject ? field.field : field,
                model = that.options.model || {},
                isValuesEditor = isObject && field.values,
                type = isValuesEditor ? "values" : fieldType(modelField),
                isCustomEditor = isObject && field.editor,
                editor = isCustomEditor ? field.editor : editors[type],
                container = that.element.find("[data-container-for=" + fieldName.replace(nameSpecialCharRegExp, "\\$1")+ "]");

            editor = editor ? editor : editors["string"];

            if (isCustomEditor && typeof field.editor === "string") {
                editor = function(container) {
                    container.append(field.editor);
                };
            }

            container = container.length ? container : that.element;
            editor(container, extend(true, {}, isObject ? field : { field: fieldName }, { model: model }));
        },

        _validate: function(e) {
            var that = this,
                isBoolean = typeof e.value === "boolean",
                input,
                preventChangeTrigger = that._validationEventInProgress,
                values = {};

            values[e.field] = e.value;

            input = $(':input[' + kendo.attr("bind") + '="' + (isBoolean ? 'checked:' : 'value:') + e.field + '"]', that.element);

            try {
                that._validationEventInProgress = true;

                if (!that.validatable.validateInput(input) || (!preventChangeTrigger && that.trigger(CHANGE, { values: values }))) {
                    e.preventDefault();
                }

            } finally {
                that._validationEventInProgress = false;
            }
        },

        end: function() {
            return this.validatable.validate();
        },

        destroy: function() {
            var that = this;

            Widget.fn.destroy.call(that);

            that.options.model.unbind("set", that._validateProxy);

            kendo.unbind(that.element);
            kendo.destroy(that.element);

            that.element.removeData("kendoValidator");
        },

        refresh: function() {
            var that = this,
                idx,
                length,
                fields = that.options.fields || [],
                container = that.options.clearContainer ? that.element.empty() : that.element,
                model = that.options.model || {},
                rules = {},
                field,
                isObject,
                fieldName,
                modelField,
                modelFields;

            if (!$.isArray(fields)) {
                fields = [fields];
            }

            for (idx = 0, length = fields.length; idx < length; idx++) {
                 field = fields[idx];
                 isObject = isPlainObject(field);
                 fieldName = isObject ? field.field : field;
                 modelField = (model.fields || model)[fieldName];

                 addValidationRules(modelField, rules);

                 that.editor(field, modelField);
            }

            if (!length) {
                modelFields = model.fields || model;
                for (fieldName in modelFields) {
                    addValidationRules(modelFields[fieldName], rules);
               }
            }

            convertToValueBinding(container);

            kendo.bind(container, that.options.model);

            that.options.model.bind("set", that._validateProxy);

            that.validatable = container.kendoValidator({
                validateOnBlur: false,
                errorTemplate: that.options.errorTemplate || undefined,
                rules: rules }).data("kendoValidator");

            container.find(":input:visible:first").focus();
        }
   });

   ui.plugin(Editable);
})(jQuery);
