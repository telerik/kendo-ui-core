;(function($, undefined) {
    var kendo = window.kendo,
        validation = kendo.support.validation,
        Component = kendo.ui.Component;

    var Validator = Component.extend( {
        init: function(element, options) {
            var that = this;

            Component.fn.init.call(that, element, options);

            that._individualErrorTemplate = kendo.template(that.options.individualErrorTemplate);
        },

        options: {
            individualErrorTemplate: "<span>${message}</span>"
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
                message;

            if (!valid) {

                message = kendo.format(input.attr("validationMessage") || input.attr("title") || "", input.attr("name"));
                that._messages.push(message);

                if (individualErrors) {
                    $(template({ message: message })).addClass("t-invalid").insertAfter(input);
                }
            } else if (individualErrors) {
                var lbl = input.next();
                if (lbl.is(".t-invalid")) {
                    lbl.remove();
                }
            }

            return valid;
        },

        _checkValidity: function(input) {
            if (input.filter("[required]").length && input.val() !== "") {
                return true;
            }
            return false;
        },

        messages: function() {
            return this._messages || [];
        }
    });

    kendo.ui.plugin("Validator", Validator);
})(jQuery);
