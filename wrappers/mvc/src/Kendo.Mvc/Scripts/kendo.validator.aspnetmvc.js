(function ($, undefined) {
     $.extend(true, kendo.ui.validator, {
        messageLocators: {
            mvcLocator: {
                locate: function (element, fieldName) {
                    return element.find(".field-validation-valid[data-valmsg-for=" + fieldName + "]");
                },
                decorate: function (message, fieldName) {
                    message.addClass("field-validation-valid").attr("data-val-msg-for", fieldName || "");
                }
            },
            mvcMetadataLocator: {
                locate: function (element, fieldName) {
                    return element.find("#" + fieldName + "_validationMessage.field-validation-valid");
                },
                decorate: function (message, fieldName) {
                    message.addClass("field-validation-valid").attr("id", fieldName + "_validationMessage");
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

                                    return validationRules[rule](input);
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

    var validationRules = {
        required: function (input) {
            var checkbox = input.filter("[type=checkbox]").length && input.attr("checked") !== "checked",
                value = input.val();

            return !(value === "" || !value  || checkbox);
        },
        number: function (input) {
            return kendo.parseFloat(input.val()) !== null
        },
        regex: function (input) {
            return true;
        },
        range: function(input, params) {
            return this.min(input, params) && this.max(input, params);
        },
        min: function(input, params) {
            return true;
        },
        max: function(input, params) {
            return true;
        }
    }
})(jQuery);
