import "./kendo.checkbox.js";
import "./kendo.dropdownlist.js";
import "./kendo.datepicker.js";
import "./kendo.numerictextbox.js";
import "./kendo.validator.js";
import "./kendo.binder.js";
import "./kendo.icons.js";

var __meta__ = {
    id: "editable",
    name: "Editable",
    category: "framework",
    depends: [ "checkbox", "dropdownlist", "datepicker", "numerictextbox", "validator", "binder", "icons" ],
    hidden: true
};


(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Widget = ui.Widget,
        extend = $.extend,
        isFunction = kendo.isFunction,
        isPlainObject = $.isPlainObject,
        inArray = $.inArray,
        POINT = ".",
        AUTOCOMPLETEVALUE = "off",
        nameSpecialCharRegExp = /("|\%|'|\[|\]|\$|\.|\,|\:|\;|\+|\*|\&|\!|\#|\(|\)|<|>|\=|\?|\@|\^|\{|\}|\~|\/|\||`)/g,
        ERRORTEMPLATE = ({ message }) => '<div class="k-tooltip k-tooltip-error k-validator-tooltip">' +
            kendo.ui.icon({ icon: "exclamation-circle", iconClass: "k-tooltip-icon" }) +
            `<span class="k-tooltip-content">${message}</span>` +
            '<span class="k-callout k-callout-n"></span>' +
        '</div>',
        CHANGE = "change";
    var EQUAL_SET = "equalSet";
    var specialRules = ["url", "email", "number", "date", "boolean"];

    function fieldType(field) {
        field = field != null ? field : "";
        return field.type || kendo.type(field) || "string";
    }

    function convertToValueBinding(container) {
        container.find(":input:not(:button, .k-combobox .k-input, .k-checkbox-list .k-checkbox, .k-radio-list .k-radio, [" + kendo.attr("role") + "=listbox], [" + kendo.attr("role") + "=upload], [" + kendo.attr("skip") + "], [type=file]), [" + kendo.attr("role") + "=radiogroup]").each(function() {
            var bindAttr = kendo.attr("bind"),
                binding = this.getAttribute(bindAttr) || "",
                bindingName = this.type === "checkbox" || this.type === "radio" ? "checked:" : "value:",
                isAntiForgeryToken = this.getAttribute("name") === Editable.antiForgeryTokenName,
                fieldName = this.attributes.name && this.attributes.name.value;

            if (binding.indexOf(bindingName) === -1 && fieldName && !isAntiForgeryToken) {
                binding += (binding.length ? "," : "") + bindingName + fieldName;

                $(this).attr(bindAttr, binding);
            }
        });
    }

    function createAttributes(options) {
        var field = (options.model.fields || options.model)[options.field],
            type = fieldType(field),
            validation = field ? field.validation : {},
            attributes = field ? field.attributes : {},
            ruleName,
            DATATYPE = kendo.attr("type"),
            BINDING = kendo.attr("bind"),
            rule,
            attr = {
                id: options.id || options.field,
                name: options.field,
                title: options.title ? options.title : options.field
            };

        for (ruleName in validation) {
            rule = validation[ruleName];

            if (inArray(ruleName, specialRules) >= 0) {
                attr[DATATYPE] = ruleName;
            } else if (!isFunction(rule)) {
                var culture = kendo.getCulture();

                if (typeof rule === "number" && culture.name.length) {
                    var numberFormat = culture.numberFormat;
                    var stringRule = rule.toString()
                        .replace(POINT, numberFormat[POINT]);

                    attr[ruleName] = stringRule;
                } else {
                    attr[ruleName] = isPlainObject(rule) ? rule.value || ruleName : rule;
                }
            }

            attr[kendo.attr(ruleName + "-msg")] = rule.message;

            attr.autocomplete = AUTOCOMPLETEVALUE;
        }

        for (var attributeName in attributes) {
            attr[attributeName] = attributes[attributeName];
        }

        if (inArray(type, specialRules) >= 0) {
            attr[DATATYPE] = type;
        }

        attr[BINDING] = (type === "boolean" ? "checked:" : "value:") + options.field;

        return attr;
    }

    function addIdAttribute(container, attr) {
        var id = container.attr("id");

        if (id) {
            attr.id = id;
            container.removeAttr("id");
        }

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

    function getEditorTag(type, options) {
        var tag;

        if (!type.length) { return; }

        if ((type === "DropDownTree" && options && options.checkboxes) || type === "MultiSelect") {
            tag = "<select />";
        } else if (type === "RadioGroup" || type === "CheckBoxGroup") {
            tag = "<ul />";
        } else if (type === "Signature") {
            tag = "<div></div>";
        } else {
            tag = type === "Editor" || type === "TextArea" ? "<textarea />" : "<input />";
        }

        return tag;
    }

    var kendoEditors = [
        "AutoComplete", "CheckBox", "CheckBoxGroup", "ColorGradient", "ColorPicker", "ColorPalette", "ComboBox", "DateInput",
        "DatePicker", "DateTimePicker", "DropDownTree",
        "Editor", "FlatColorPicker", "MaskedTextBox", "MultiColumnComboBox","MultiSelect",
        "NumericTextBox", "RadioGroup", "Rating", "Slider", "Switch", "TimePicker", "DropDownList",
        "TextBox", "TextArea", "Captcha", "Signature", "TimeDurationPicker"
    ];

    var editors = {
        "hidden": function(container, options) {
            var attr = createAttributes(options);
            $('<input type="hidden"/>').attr(attr).appendTo(container);
        },
        "number": function(container, options) {
            var attr = createAttributes(options);
            $('<input type="text"/>').attr(attr).appendTo(container).kendoNumericTextBox(extend({}, options.editorOptions, { format: options.format }));
            $('<span ' + kendo.attr("for") + '="' + options.field + '" class="k-invalid-msg k-hidden"/>').appendTo(container);
        },
        "date": function(container, options) {
            var attr = createAttributes(options),
                format = options.format;

            if (format) {
                format = kendo._extractFormat(format);
            }

            attr[kendo.attr("format")] = format;

            $('<input type="text"/>').attr(attr).appendTo(container).kendoDatePicker(extend({}, options.editorOptions, { format: options.format }));
            $('<span ' + kendo.attr("for") + '="' + options.field + '" class="k-invalid-msg k-hidden"/>').appendTo(container);
        },
        "string": function(container, options) {
            var attr = createAttributes(options);

            $('<input type="text"/>').attr(attr).appendTo(container).kendoTextBox(options.editorOptions);
        },
        "boolean": function(container, options) {
            var attr = createAttributes(options);
            var element = $('<input type="checkbox" />').attr(attr).kendoCheckBox(options.editorOptions).appendTo(container);

            renderHiddenForMvcCheckbox(element, container, options);
        },
        "values": function(container, options) {
            var attr = createAttributes(options);
            var items = kendo.stringify(convertItems(options.values));
            $('<select ' +
                kendo.attr("text-field") + '="text"' +
                kendo.attr("value-field") + '="value"' +
                kendo.attr("source") + "=\'" + (items ? items.replace(/\'/g,"&apos;") : items) + "\'" +
                kendo.attr("size") + '="' + options.editorOptions.size + '"' +
                kendo.attr("role") + '="dropdownlist"/>')
                .attr(attr).appendTo(container);
            $('<span ' + kendo.attr("for") + '="' + options.field + '" class="k-invalid-msg  k-hidden"/>').appendTo(container);
        },
        "kendoEditor": function(container, options) {
            var attr = createAttributes(options);
            var type = options.editor;
            var editor = "kendo" + type;
            var editorOptions = options.editorOptions;
            var tagElement = getEditorTag(type, editorOptions);

            var element = $(tagElement)
                .attr(attr)
                .appendTo(container)
                [editor](editorOptions);

            renderHiddenForMvcCheckbox(element, container, options);
        }
    };

    var mobileEditors = {
        "number": function(container, options) {
            var attr = createAttributes(options);
            attr = addIdAttribute(container, attr);

            $('<input type="number"/>').attr(attr).appendTo(container);
        },
        "date": function(container, options) {
            var attr = createAttributes(options);
            attr = addIdAttribute(container, attr);

            $('<input type="date"/>').attr(attr).appendTo(container);
        },
        "string": function(container, options) {
            var attr = createAttributes(options);
            attr = addIdAttribute(container, attr);

            $('<input type="text" />').attr(attr).appendTo(container);
        },
        "boolean": function(container, options) {
            var attr = createAttributes(options);
            attr = addIdAttribute(container, attr);

            $('<input type="checkbox" />').attr(attr).appendTo(container);
        },
        "values": function(container, options) {
            var attr = createAttributes(options);
            var items = options.values;
            var select = $('<select />');

            attr = addIdAttribute(container, attr);

            for (var index in items) {
                $('<option value="' + items[index].value + '">' + items[index].text + '</option>').appendTo(select);
            }

            select.attr(attr).appendTo(container);
        }
    };

    function addValidationRules(modelField, rules) {
        var validation = modelField ? (modelField.validation || {}) : {},
            rule,
            descriptor;

        for (rule in validation) {
            descriptor = validation[rule];

            if (isPlainObject(descriptor) && descriptor.value) {
                descriptor = descriptor.value;
            }

            if (isFunction(descriptor)) {
                rules[rule] = descriptor;
            }
        }
    }

    function renderHiddenForMvcCheckbox(tag, container, field) {
        var addHidden = field ? (field.shouldRenderHidden || false) : false;

        if (addHidden) {
            tag.val(true);
            container.append($("<input type='hidden' name='" + field.field + "' value='false' data-skip='true' data-validate='false'/>"));
        }
    }

    var Editable = Widget.extend({
        init: function(element, options) {
            var that = this;

            if (options.target) {
                options.$angular = options.target.options.$angular;

                if (options.target.pane) {
                    that._isMobile = true;
                }
            }
            Widget.fn.init.call(that, element, options);
            that._validateProxy = that._validate.bind(that);
            that.refresh();
        },

        events: [CHANGE],

        options: {
            name: "Editable",
            editors: editors,
            mobileEditors: mobileEditors,
            clearContainer: true,
            validateOnBlur: true,
            validationSummary: false,
            errorTemplate: ERRORTEMPLATE,
            skipFocus: false,
            size: "medium"
        },

        editor: function(field, modelField) {
            var that = this,
                editors = that._isMobile ? mobileEditors : that.options.editors,
                isObject = isPlainObject(field),
                fieldName = isObject ? field.field : field,
                model = that.options.model || {},
                isValuesEditor = isObject && field.values,
                type = isValuesEditor ? "values" : fieldType(modelField),
                isHidden = isObject && typeof field.editor === "string" && field.editor === "hidden",
                isCustomEditor = isObject && !isHidden && field.editor,
                isKendoEditor = isObject && $.inArray(field.editor, kendoEditors) !== -1,
                editor = isCustomEditor ? field.editor : editors[isHidden ? "hidden" : type],
                container = that.element.find("[" + kendo.attr("container-for") + "=" + fieldName.replace(nameSpecialCharRegExp, "\\$1") + "]"),
                op;

            editor = editor ? editor : editors.string;

            if (isKendoEditor) {
                editor = editors.kendoEditor;
            } else if (isCustomEditor && typeof field.editor === "string") {
                editor = function(container) {
                    container.append(field.editor);
                };
            }

            if (!isObject) {
                op = {
                    field: fieldName,
                    editorOptions: {
                        size: that.options.size
                    }
                };
            } else {
                if (!field.editorOptions) {
                    field.editorOptions = {};
                }

                field.editorOptions = extend({}, { size: that.options.size }, field.editorOptions);
                op = field;
            }

            container = container.length ? container : that.element;
            editor(container, extend(true, {}, op, { model: model }));
        },

        _validate: function(e) {
            var that = this,
                input,
                value = e.value,
                preventChangeTrigger = that._validationEventInProgress,
                values = {},
                bindAttribute = kendo.attr("bind"),
                fieldName = e.field.replace(nameSpecialCharRegExp, "\\$1"),
                bindingRegex = new RegExp("(value|checked)\\s*:\\s*" + fieldName + "\\s*(,|$)");

            values[e.field] = e.value;

            input = $(':input[' + bindAttribute + '*="' + fieldName + '"]', that.element)
                .filter("[" + kendo.attr("validate") + "!='false']").filter(function() {
                   return bindingRegex.test($(this).attr(bindAttribute));
                });
            if (input.length > 1) {
                input = input.filter(function() {
                    var element = $(this);
                    return !element.is(":radio") || element.val() == value;
                });
            }

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

            that.angular("cleanup", function() {
                return { elements: that.element };
            });

            Widget.fn.destroy.call(that);

            that.options.model.unbind("set", that._validateProxy);
            that.options.model.unbind(EQUAL_SET, that._validateProxy);

            kendo.unbind(that.element);

            if (that.validatable) {
                that.validatable.destroy();
            }
            kendo.destroy(that.element);

            that.element.removeData("kendoValidator");

            if (that.element.is("[" + kendo.attr("role") + "=editable]")) {
                that.element.removeAttr(kendo.attr("role"));
            }
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

            if (!Array.isArray(fields)) {
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

            if (that.options.target) {
                that.angular("compile", function() {
                    return {
                        elements: container,
                        data: container.map(function() { return { dataItem: model }; })
                    };
                });
            }

            if (!length) {
                modelFields = model.fields || model;
                for (fieldName in modelFields) {
                    addValidationRules(modelFields[fieldName], rules);
               }
            }

            convertToValueBinding(container);

            if (that.validatable) {
                that.validatable.destroy();
            }

            kendo.bind(container, that.options.model);

            if (that.options.validateOnBlur) {
                that.options.model
                    .unbind("set", that._validateProxy)
                    .bind("set", that._validateProxy);

                that.options.model
                    .unbind(EQUAL_SET, that._validateProxy)
                    .bind(EQUAL_SET, that._validateProxy);
            }

            that.validatable = new kendo.ui.Validator(container, {
                validateOnBlur: that.options.validateOnBlur,
                validationSummary: that.options.validationSummary,
                errorTemplate: that.options.errorTemplate || undefined,
                rules: rules });

            if (!that.options.skipFocus) {
                container.find(":kendoFocusable").eq(0).trigger("focus");
            }
        }
   });

   Editable.antiForgeryTokenName = "__RequestVerificationToken";

   ui.plugin(Editable);
})(window.kendo.jQuery);

