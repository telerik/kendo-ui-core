;(function($, undefined) {
    var kendo = window.kendo,
        validation = kendo.support.validation,
        INVALID = "t-invalid",
        emailRegExp = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,
        urlRegExp = /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,
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
                    if (input.filter("[type=text],[type=email]").filter("[pattern]").length && input.val() !== "") {
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
                },
                url: function(input) {
                    if (input.filter("[type=url]").length && input.val() !== "") {
                        return matcher(input.val(), urlRegExp);
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
