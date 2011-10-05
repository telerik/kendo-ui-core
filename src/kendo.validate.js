;(function($, undefined) {
    var kendo = window.kendo,
        validation = kendo.support.validation,
        INVALID = "t-invalid",
        Component = kendo.ui.Component;

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
                min: function(input) {
                    if (input.filter("[type=number]").filter("[min]").length && input.val() !== "") {
                        var min = parseInt(input.attr("min"),10) || 0,
                            val = parseInt(input.val(), 10);

                        return min < val;
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

            that._messages = [];

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
                individualErrors = that.options.individualErrors,
                template = that._individualErrorTemplate,
                valid = validation ? input[0].checkValidity() :  that._checkValidity(input),
                lbl,
                message;

            if (!valid) {
                message = kendo.format(input.attr("validationMessage") || input.attr("title") || "", input.attr("name"));
                that._messages.push(message);

                if (individualErrors) {
                    $(template({ message: message })).addClass(INVALID).insertAfter(input);
                }
            } else if (individualErrors) {
                lbl = input.next();
                if (lbl.hasClass(INVALID)) {
                    lbl.remove();
                }
            }

            return valid;
        },

        _checkValidity: function(input) {
            var rules = this.options.rules;

            for (rule in rules) {
                if (!rules[rule](input)) {
                    return false;
                }
            }

            return true;
        },

        messages: function() {
            return this._messages || [];
        }
    });

    kendo.ui.plugin("Validator", Validator);
})(jQuery);
