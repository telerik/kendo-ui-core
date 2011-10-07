;(function($, undefined) {
    var kendo = window.kendo,
        Component = kendo.ui.Component,
        INVALIDMSG = "k-invalid-msg",
        INVALIDINPUT = "k-invalid",
        emailRegExp = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,
        urlRegExp = /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,
        INPUTSELECTOR = ":input",
        patternMatcher = function(value, pattern) {
            if (typeof pattern === "string") {
                pattern = new RegExp('^(?:' + pattern + ')$');
            }
            return pattern.test(value);
        },
        matcher = function(input, selector, pattern) {
            var value = input.val();

            if (input.filter(selector).length && value !== "") {
                return patternMatcher(value, pattern);
            }
            return true;
        }

    var Validator = Component.extend( {
        init: function(element, options) {
            var that = this;

            Component.fn.init.call(that, element, options);

            that._errorTemplate = kendo.template(that.options.errorTemplate);

            that._errors = {};
            that._attachEvents();
        },

        options: {
            errorTemplate: "<span>${message}</span>",
            messages: {
                required: "{0} is required",
                pattern: "{0} is not valid",
                min: "{0} should be greater than {1}",
                max: "{0} should be smaller then {1}",
                step: "{0} is not valid",
                email: "{0} is not valid email",
                url: "{0} is not valid URL"
            },
            rules: {
                required: function(input) {
                    if (input.filter("[required]").length && input.val() === "") {
                        return false;
                    }
                    return true;
                },
                pattern: function(input) {
                    if (input.filter("[type=text],[type=email],[type=url],[type=tel],[type=search]").filter("[pattern]").length && input.val() !== "") {
                        return patternMatcher(input.val(), input.attr("pattern"));
                    }
                    return true;
                },
                min: function(input) {
                    if (input.filter("[type=number]").filter("[min]").length && input.val() !== "") {
                        var min = parseInt(input.attr("min"), 10) || 0,
                            val = parseInt(input.val(), 10);

                        return min < val;
                    }
                    return true;
                },
                max: function(input) {
                    if (input.filter("[type=number]").filter("[max]").length && input.val() !== "") {
                        var max = parseInt(input.attr("max"), 10) || 0,
                            val = parseInt(input.val(), 10);

                        return max > val;
                    }
                    return true;
                },
                step: function(input) {
                    if (input.filter("[type=number]").filter("[step]").length && input.val() !== "") {
                        var min = parseInt(input.attr("min"), 10) || 0,
                            step = parseInt(input.attr("step"), 10) || 0,
                            val = parseInt(input.val(), 10);

                        return (val-min)%step === 0;
                    }
                    return true;
                },
                email: function(input) {
                    return matcher(input, "[type=email]", emailRegExp);
                },
                url: function(input) {
                    return matcher(input, "[type=url]", urlRegExp);
                }
            }
        },

        _attachEvents: function() {
            var that = this;
            if (!that.element.is(INPUTSELECTOR)) {
                that.element.delegate(INPUTSELECTOR, "blur", function() {
                    that._validateInput($(this));
                });
            } else {
                that.element.bind("blur", function() {
                    that._validateInput(that.element);
                });
            }
        },

        validate: function() {
            var that = this,
                inputs,
                idx,
                invalid = false,
                length;

            that._errors = {};

            if (!that.element.is(INPUTSELECTOR)) {
                inputs = that.element.find(INPUTSELECTOR);

                for (idx = 0, length = inputs.length; idx < length; idx++) {
                    if (!that._validateInput(inputs.eq(idx))) {
                        invalid = true;
                    }
                }
                return !invalid;
            }
            return that._validateInput(that.element);
        },

        _validateInput: function(input) {
            var that = this,
                template = that._errorTemplate,
                customMessages = that.options.messages,
                result = that._checkValidity(input),
                valid = result.valid,
                lbl = input.next(),
                fieldName = input.attr("name"),
                message;

            if (lbl.hasClass(INVALIDMSG)) {
                lbl.remove();
            }

            if (!valid) {
                message = that._extractMessage(input, result.key);
                that._errors[fieldName] = message;
                $(template({ message: message })).addClass(INVALIDMSG).insertAfter(input);
            }

            input.toggleClass(INVALIDINPUT, !valid);

            return valid;
        },

        _extractMessage: function(input, ruleKey) {
            var that = this,
                customMessage = that.options.messages[ruleKey],
                fieldName = input.attr("name");

            customMessage = $.isFunction(customMessage) ? customMessage(input) : customMessage;

            return kendo.format(input.attr("validationMessage") || input.attr("title") || customMessage || "", fieldName);
        },

        _checkValidity: function(input) {
            var rules = this.options.rules,
                rule;

            for (rule in rules) {
                if (!rules[rule](input)) {
                    return { valid: false, key: rule };
                }
            }

            return { valid: true };
        },

        errors: function() {
            var results = [],
                errors = this._errors,
                error;

            for (error in errors) {
                results.push(errors[error]);
            }
            return results;
        }
    });

    kendo.ui.plugin("Validator", Validator);
})(jQuery);
