;(function($, undefined) {
    var kendo = window.kendo,
        validation = kendo.support.validation,
        INVALID = "t-invalid",
        emailRegExp = /^[a-z0-9_.%+\-]+@[0-9a-z.\-]+\.[a-z.]{2,6}$/i,
        Component = kendo.ui.Component;

    var matcher = function(value, pattern) {
        if (typeof pattern === "string") {
            pattern = new RegExp('^(?:' + pattern + ')$');
        }
        return pattern.test(value);
    };

    var Validator = Component.extend( {
        init: function(element, options) {
            var that = this;

            Component.fn.init.call(that, element, options);

            that._individualErrorTemplate = kendo.template(that.options.individualErrorTemplate);
        },

        options: {
            individualErrorTemplate: "<span>${message}</span>",
            rules: {
                required: function(input) {
                    if (input.filter("[required]").length && input.val() === "") {
                        return false;
                    }
                    return true;
                },
                pattern: function(input) {
                    if (input.filter("[type=text]").filter("[pattern]").length && input.val() !== "") {
                        return matcher(input.val(), input.attr("pattern"));
                    }
                    return true;
                },
                min: function(input) {
                    if (input.filter("[type=number]").filter("[min]").length && input.val() !== "") {
                        var min = parseInt(input.attr("min"),10) || 0,
                            val = parseInt(input.val(), 10);

                        return min < val;
                    }
                    return true;
                },
                max: function(input) {
                    if (input.filter("[type=number]").filter("[max]").length && input.val() !== "") {
                        var max = parseInt(input.attr("max"),10) || 0,
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
                    if (input.filter("[type=email]").length && input.val() !== "") {
                        return matcher(input.val(), emailRegExp);
                    }
                    return true;
                }
            }
        },

        validate: function() {
            var that = this,
                inputs,
                idx,
                invalid = false;
                length;

            that._errors = [];

            if (!that.element.is(":input")) {
                inputs = that.element.find(":input");

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
                template = that._individualErrorTemplate,
                valid = validation ? input[0].checkValidity() :  that._checkValidity(input),
                lbl,
                message;

            if (!valid) {
                message = kendo.format(input.attr("validationMessage") || input.attr("title") || "", input.attr("name"));
                that._errors.push(message);

                $(template({ message: message })).addClass(INVALID).insertAfter(input);
            } else {
                lbl = input.next();
                if (lbl.hasClass(INVALID)) {
                    lbl.remove();
                }
            }

            return valid;
        },

        _checkValidity: function(input) {
            var rules = this.options.rules;

            for (var rule in rules) {
                if (!rules[rule](input)) {
                    return false;
                }
            }

            return true;
        },

        errors: function() {
            return this._errors || [];
        }
    });

    kendo.ui.plugin("Validator", Validator);
})(jQuery);
