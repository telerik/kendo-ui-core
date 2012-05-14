(function ($, undefined) {
     $.extend(true, kendo.ui.validator, {
        messageLocators: {
            mvcLocator: {
                locate: function (element, fieldName) {
                    return element.find(".field-validation-valid[data-valmsg-for=" + fieldName + "], .field-validation-error[data-valmsg-for=" + fieldName + "]");
                },
                decorate: function (message, fieldName) {
                    message.addClass("field-validation-error").attr("data-val-msg-for", fieldName || "");
                }
            },
            mvcMetadataLocator: {
                locate: function (element, fieldName) {
                    return element.find("#" + fieldName + "_validationMessage.field-validation-valid");
                },
                decorate: function (message, fieldName) {
                    message.addClass("field-validation-error").attr("id", fieldName + "_validationMessage");
                }
            }
        },
        rulesResolvers: {
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
            },
            mvcUnobtrusiveResolver: {
                resolve: function (element) {
                    var name,
                        rules = {},
                        messages = {};

                    for (name in validationRules) {
                        rules["mvc" + name] = (function (rule) {
                            return function (input) {
                                if (input.filter("[data-val-" + rule + "]").length) {
                                    return validationRules[rule](input, extractParams(input, rule));
                                }
                                return true;
                            }
                        })(name);

                        messages["mvc" + name] = (function(rule) {
                            return function (input) {
                                return input.attr("data-val-" + rule);
                            }
                        })(name);
                    }

                    return { rules: rules, messages: messages };
                }
            }
        }
    });

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

            rules[fieldName + validationType] = (function (type, params) {
                return function (input) {
                    if (input.filter("[name=" + fieldName + "]").length) {
                        return validationRules[type](input, params);
                    }
                    return true;
                }
            })(validationType, validationParams);

            messages[fieldName + validationType] = (function (message) {
                return function() { return message; };
            })(fieldRules[idx].ErrorMessage);
        }
        return { rules: rules, messages: messages };
    }

    function patternMatcher(value, pattern) {
        if (typeof pattern === "string") {
            pattern = new RegExp('^(?:' + pattern + ')$');
        }
        return pattern.test(value);
    }

    var validationRules = {
        required: function (input) {
            var checkbox = input.filter("[type=checkbox]").length && input.attr("checked") !== "checked",
                value = input.val();

            return !(value === "" || !value  || checkbox);
        },
        number: function (input) {
            return kendo.parseFloat(input.val()) !== null
        },
        regex: function (input, params) {
            return patternMatcher(input.val(), params.pattern);
        },
        range: function(input, params) {
            return this.min(input, params) && this.max(input, params);
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
            return kendo.parseDate(input.val()) !== null;
        },
        length: function(input, params) {
            var len = $.trim(input.val()).length;
            return len >= (params.min || 0) && len <= (params.max || 0)
        }
    }
})(jQuery);
