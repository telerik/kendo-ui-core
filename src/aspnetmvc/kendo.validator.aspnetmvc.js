(function ($, undefined) {
    var nameSpecialCharRegExp = /(\[|\]|\$|\.|\:|\+)/g;

    function generateMessages() {
        var name,
            messages = {};

        for (name in validationRules) {
            messages["mvc" + name] = createMessage(name);
        }
        return messages;
    }

    function generateRules() {
         var name,
             rules = {};

         for (name in validationRules) {
             rules["mvc" + name] = createRule(name);
        }
        return rules;
    }

    function extractParams(input, ruleName) {
        var params = {},
            index,
            data = input.data(),
            length = ruleName.length,
            rule,
            key;

        for (key in data) {
            rule = key.toLowerCase();
            index = rule.indexOf(ruleName);
            if (index > -1) {
                rule = rule.substring(index + length, key.length);
                if (rule) {
                    params[rule] = data[key];
                }
            }
        }
        return params;
    }

    function rulesFromData(metadata) {
        var idx,
            length,
            fields = metadata.Fields || [],
            rules = {};

        for (idx = 0, length = fields.length; idx < length; idx++) {
            $.extend(true, rules, rulesForField(fields[idx]));
        }
        return rules;
    }

    function rulesForField(field) {
        var rules = {},
            messages = {},
            fieldName = field.FieldName,
            fieldRules = field.ValidationRules,
            validationType,
            validationParams,
            idx,
            length;

        for (idx = 0, length = fieldRules.length; idx < length; idx++) {
            validationType = fieldRules[idx].ValidationType;
            validationParams = fieldRules[idx].ValidationParameters;

            rules[fieldName + validationType] = createMetaRule(fieldName, validationType, validationParams);

            messages[fieldName + validationType] = createMetaMessage(fieldRules[idx].ErrorMessage);
        }
        return { rules: rules, messages: messages };
    }

    function createMessage(rule) {
        return function (input) {
            return input.attr("data-val-" + rule);
        };
    }

    function createRule(ruleName) {
        return function (input) {
            if (input.filter("[data-val-" + ruleName + "]").length) {
                return validationRules[ruleName](input, extractParams(input, ruleName));
            }
            return true;
        };
    }

    function createMetaMessage(message) {
        return function() { return message; };
    }

    function createMetaRule(fieldName, type, params) {
        return function (input) {
            if (input.filter("[name=" + fieldName + "]").length) {
                return validationRules[type](input, params);
            }
            return true;
        };
    }

    function patternMatcher(value, pattern) {
        if (typeof pattern === "string") {
            pattern = new RegExp('^(?:' + pattern + ')$');
        }
        return pattern.test(value);
    }

    var validationRules = {
        required: function (input) {
            var value = input.val(),
                checkbox = input.filter("[type=checkbox]");

            if (checkbox.length) {
                var hidden = checkbox.next("input:hidden[name=" + checkbox[0].name + "]");
                if (hidden.length) {
                    value = hidden.val();
                } else {
                    value = input.attr("checked") === "checked";
                }
            }

            return !(value === "" || !value);
        },
        number: function (input) {
            return input.val() === "" || kendo.parseFloat(input.val()) !== null;
        },
        regex: function (input, params) {
            return patternMatcher(input.val(), params.pattern);
        },
        range: function(input, params) {
            if (input.val() !== "") {
                return this.min(input, params) && this.max(input, params);
            }
            return true;
        },
        min: function(input, params) {
            var min = parseFloat(params.min) || 0,
                val = parseFloat(input.val());

            return min <= val;
        },
        max: function(input, params) {
            var max = parseFloat(params.max) || 0,
                val = parseFloat(input.val());

            return val <= max;
        },
        date: function(input) {
            return input.val() === "" || kendo.parseDate(input.val()) !== null;
        },
        length: function(input, params) {
            var len = $.trim(input.val()).length;
            return (!params.min || len >= (params.min || 0)) && (!params.max || len <= (params.max || 0));
        }
    };

    $.extend(true, kendo.ui.validator, {
        rules: generateRules(),
        messages: generateMessages(),
        messageLocators: {
            mvcLocator: {
                locate: function (element, fieldName) {
                    fieldName = fieldName.replace(nameSpecialCharRegExp, "\\$1");
                    return element.find(".field-validation-valid[data-valmsg-for=" + fieldName + "], .field-validation-error[data-valmsg-for=" + fieldName + "]");
                },
                decorate: function (message, fieldName) {
                    message.addClass("field-validation-error").attr("data-val-msg-for", fieldName || "");
                }
            },
            mvcMetadataLocator: {
                locate: function (element, fieldName) {
                    fieldName = fieldName.replace(nameSpecialCharRegExp, "\\$1");
                    return element.find("#" + fieldName + "_validationMessage.field-validation-valid");
                },
                decorate: function (message, fieldName) {
                    message.addClass("field-validation-error").attr("id", fieldName + "_validationMessage");
                }
            }
        },
        ruleResolvers: {
            mvcMetaDataResolver: {
                resolve: function (element) {
                    var metadata = window.mvcClientValidationMetadata || [];

                    if (metadata.length) {
                        element = $(element);
                        for (var idx = 0; idx < metadata.length; idx++) {
                            if (metadata[idx].FormId == element.attr("id")) {
                                return rulesFromData(metadata[idx]);
                            }
                        }
                    }
                    return {};
                }
            }
        }
    });
})(jQuery);
