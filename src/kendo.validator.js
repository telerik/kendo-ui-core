(function(f, define){
    define([ "./kendo.core" ], f);
})(function(){

var __meta__ = { // jshint ignore:line
    id: "validator",
    name: "Validator",
    category: "web",
    description: "The Validator offers an easy way to do a client-side form validation.",
    depends: [ "core" ]
};

/* jshint eqnull: true */
(function($, undefined) {
    var kendo = window.kendo,
        Widget = kendo.ui.Widget,
        NS = ".kendoValidator",
        INVALIDMSG = "k-invalid-msg",
        invalidMsgRegExp = new RegExp(INVALIDMSG,'i'),
        INVALIDINPUT = "k-invalid",
        VALIDINPUT = "k-valid",
        VALIDATIONSUMMARY = "k-validation-summary",
        INVALIDLABEL = "k-text-error",
        MESSAGEBOX = "k-messagebox k-messagebox-error",
        ARIAINVALID = "aria-invalid",
        ARIADESCRIBEDBY = "aria-describedby",
        emailRegExp = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i,
        urlRegExp = /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,
        INPUTSELECTOR = ":input:not(:button,[type=submit],[type=reset],[disabled],[readonly])",
        CHECKBOXSELECTOR = ":checkbox:not([disabled],[readonly])",
        NUMBERINPUTSELECTOR = "[type=number],[type=range]",
        BLUR = "blur",
        NAME = "name",
        FORM = "form",
        NOVALIDATE = "novalidate",
        //events
        VALIDATE = "validate",
        CHANGE = "change",
        VALIDATE_INPUT = "validateInput",
        proxy = $.proxy,
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
        },
        hasAttribute = function(input, name) {
            if (input.length)  {
                return input[0].attributes[name] != null;
            }
            return false;
        };

    if (!kendo.ui.validator) {
        kendo.ui.validator = { rules: {}, messages: {}, allowSubmit: $.noop, validateOnInit: $.noop };
    }

    function resolveRules(element) {
        var resolvers = kendo.ui.validator.ruleResolvers || {},
            rules = {},
            name;

        for (name in resolvers) {
            $.extend(true, rules, resolvers[name].resolve(element));
        }
        return rules;
    }

    function decode(value) {
        return value.replace(/&amp/g, '&amp;')
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>');
    }

    function numberOfDecimalDigits(value) {
        value = (value + "").split('.');
        if (value.length > 1) {
            return value[1].length;
        }
        return 0;
    }

    function parseHtml(text) {
        if ($.parseHTML) {
            return $($.parseHTML(text));
        }
        return $(text);
    }

    function searchForMessageContainer(elements, fieldName) {
        var containers = $(),
            element,
            attr;

        for (var idx = 0, length = elements.length; idx < length; idx++) {
            element = elements[idx];
            if (invalidMsgRegExp.test(element.className)) {
                attr = element.getAttribute(kendo.attr("for"));
                if (attr === fieldName) {
                    containers = containers.add(element);
                }
            }
        }
        return containers;
    }

    function isLabelFor(label, element) {
        if (!label) {
            return false;
        }
        if (typeof label.nodeName !== 'string' || label.nodeName !== 'LABEL') {
            return false;
        }
        if (typeof label.getAttribute('for') !== 'string' || typeof element.getAttribute('id') !== 'string') {
            return false;
        }
        if (label.getAttribute('for') !== element.getAttribute('id')) {
            return false;
        }

        return true;
    }

    var SUMMARYTEMPLATE = '<ul>' +
        '#for(var i = 0; i < errors.length; i += 1){#' +
            '<li><a data-field="#=errors[i].field#" href="\\#">#= errors[i].message #</a></li>' +
        '# } #' +
    '</ul>';

    var Validator = Widget.extend({
        init: function(element, options) {
            var that = this,
                resolved = resolveRules(element),
                validateAttributeSelector = "[" + kendo.attr("validate") + "!=false]";

            options = options || {};

            options.rules = $.extend({}, kendo.ui.validator.rules, resolved.rules, options.rules);
            options.messages = $.extend({}, kendo.ui.validator.messages, resolved.messages, options.messages);

            Widget.fn.init.call(that, element, options);

            that._errorTemplate = kendo.template(that.options.errorTemplate);
            that._summaryTemplate = kendo.template(that.options.validationSummary.template || SUMMARYTEMPLATE);

            if (that.element.is(FORM)) {
                that.element.attr(NOVALIDATE, NOVALIDATE);
            }

            that._inputSelector = INPUTSELECTOR + validateAttributeSelector;
            that._checkboxSelector = CHECKBOXSELECTOR + validateAttributeSelector;

            that._errors = {};
            that._attachEvents();
            that._isValidated = false;

            if (that._validateOnInit()) {
                that.validate();
            }
        },

        events: [ VALIDATE, CHANGE, VALIDATE_INPUT ],

        options: {
            name: "Validator",
            errorTemplate: '<span class="k-form-error">#= message #</span>',
            messages: {
                required: "{0} is required",
                pattern: "{0} is not valid",
                min: "{0} should be greater than or equal to {1}",
                max: "{0} should be smaller than or equal to {1}",
                step: "{0} is not valid",
                email: "{0} is not valid email",
                url: "{0} is not valid URL",
                date: "{0} is not valid date",
                dateCompare: "End date should be greater than or equal to the start date"
            },
            rules: {
                required: function(input) {
                    var noNameCheckbox = !input.attr("name") && !input.is(":checked"),
                        namedCheckbox = input.attr("name") && !this.element.find("input[name='" + input.attr("name") + "']:checked").length,
                        checkbox = input.filter("[type=checkbox]").length && (noNameCheckbox || namedCheckbox),
                        radio = input.filter("[type=radio]").length && !this.element.find("input[name='" + input.attr("name") + "']:checked").length,
                        value = input.val();

                    return !(hasAttribute(input, "required") && (!value || value === "" || value.length === 0 || checkbox || radio));
                },
                pattern: function(input) {
                    if (input.filter("[type=text],[type=email],[type=url],[type=tel],[type=search],[type=password]").filter("[pattern]").length && input.val() !== "") {
                        return patternMatcher(input.val(), input.attr("pattern"));
                    }
                    return true;
                },
                min: function(input) {
                    if (input.filter(NUMBERINPUTSELECTOR + ",[" + kendo.attr("type") + "=number]").filter("[min]").length && input.val() !== "") {
                        var min = parseFloat(input.attr("min")) || 0,
                            val = kendo.parseFloat(input.val());

                        return min <= val;
                    }
                    return true;
                },
                max: function(input) {
                    if (input.filter(NUMBERINPUTSELECTOR + ",[" + kendo.attr("type") + "=number]").filter("[max]").length && input.val() !== "") {
                        var max = parseFloat(input.attr("max")) || 0,
                            val = kendo.parseFloat(input.val());

                        return max >= val;
                    }
                    return true;
                },
                step: function(input) {
                    if (input.filter(NUMBERINPUTSELECTOR + ",[" + kendo.attr("type") + "=number]").filter("[step]").length && input.val() !== "") {
                        var min = parseFloat(input.attr("min")) || 0,
                            step = parseFloat(input.attr("step")) || 1,
                            val = parseFloat(input.val()),
                            decimals = numberOfDecimalDigits(step),
                            raise;

                        if (decimals) {
                            raise = Math.pow(10, decimals);
                            return ((Math.floor((val-min)*raise))%(step*raise)) / Math.pow(100, decimals) === 0;
                        }
                        return ((val-min)%step) === 0;
                    }
                    return true;
                },
                email: function(input) {
                    return matcher(input, "[type=email],[" + kendo.attr("type") + "=email]", emailRegExp);
                },
                url: function(input) {
                    return matcher(input, "[type=url],[" + kendo.attr("type") + "=url]", urlRegExp);
                },
                date: function(input) {
                    if (input.filter("[type^=date],[" + kendo.attr("type") + "=date]").length && input.val() !== "") {
                        return kendo.parseDate(input.val(), input.attr(kendo.attr("format"))) !== null;
                    }
                    return true;
                }
            },
            validateOnBlur: true,
            validationSummary: false
        },

        _allowSubmit: function() {
            return kendo.ui.validator.allowSubmit(this.element, this.errors());
        },

        _validateOnInit: function() {
            return kendo.ui.validator.validateOnInit(this.element);
        },

        destroy: function() {
            Widget.fn.destroy.call(this);

            this.element.off(NS);

            if (this.validationSummary) {
                this.validationSummary.off(NS);
                this.validationSummary = null;
            }
        },

        value: function() {
            if (!this._isValidated) {
                return false;
            }

            return this.errors().length === 0;
        },

        _submit: function(e) {
            if (!this.validate() && !this._allowSubmit()) {
                e.stopPropagation();
                e.stopImmediatePropagation();
                e.preventDefault();
                return false;
            }
            return true;
        },

        _checkElement: function(element) {
            var state = this.value();

            this.validateInput(element);

            if (this.value() !== state) {
                this.trigger(CHANGE);
            }
        },

        _attachEvents: function() {
            var that = this;

            if (that.element.is(FORM)) {
                that.element.on("submit" + NS, proxy(that._submit, that));
            }

            if (that.options.validateOnBlur) {
                if (!that.element.is(INPUTSELECTOR)) {
                    that.element.on(BLUR + NS, that._inputSelector, function() {
                        that._checkElement($(this));
                    });

                    that.element.on("click" + NS, that._checkboxSelector, function() {
                        that._checkElement($(this));
                    });
                } else {
                    that.element.on(BLUR + NS, function() {
                        that._checkElement(that.element);
                    });

                    if (that.element.is(CHECKBOXSELECTOR)) {
                        that.element.on("click" + NS, function() {
                            that._checkElement(that.element);
                        });
                    }
                }
            }
        },

        validate: function() {
            var inputs;
            var idx;
            var result = false;
            var length;

            var isValid = this.value();

            this._errors = {};

            if (!this.element.is(INPUTSELECTOR)) {
                var invalid = false;

                inputs = this.element.find(this._inputSelector);

                for (idx = 0, length = inputs.length; idx < length; idx++) {
                    if (!this.validateInput(inputs.eq(idx))) {
                        invalid = true;
                    }
                }

                result = !invalid;
            } else {
                result = this.validateInput(this.element);
            }

            if (this.options.validationSummary && !isValid) {
                this.showValidationSummary();
            }

            this.trigger(VALIDATE, { valid: result, errors: this.errors() });

            if (isValid !== result) {
                this.trigger(CHANGE);
            }

            return result;
        },

        validateInput: function(input) {
            input = $(input);

            this._isValidated = true;

            var that = this,
                template = that._errorTemplate,
                result = that._checkValidity(input),
                valid = result.valid,
                className = "." + INVALIDMSG,
                fieldName = (input.attr(NAME) || ""),
                lbl = that._findMessageContainer(fieldName).add(input.next(className).filter(function() {
                    var element = $(this);
                    if (element.filter("[" + kendo.attr("for") + "]").length) {
                        return element.attr(kendo.attr("for")) === fieldName;
                    }

                    return true;

                })).addClass("k-hidden"),
                messageText = !valid ? that._extractMessage(input, result.key) : "",
                messageLabel = !valid ? parseHtml(template({ message: decode(messageText), field: fieldName })) : "",
                wasValid = !input.attr(ARIAINVALID);

            input.removeAttr(ARIAINVALID);

            if (!valid) {
                that._errors[fieldName] = messageText;
                var lblId = lbl.attr('id');

                that._decorateMessageContainer(messageLabel, fieldName);


                if (lblId) {
                    messageLabel.attr('id', lblId);
                }

                if (lbl.length !== 0) {
                    lbl.replaceWith(messageLabel);
                } else {
                    var widgetInstance = kendo.widgetInstance(input);
                    var parentElement = input.parent().get(0);
                    var nextElement = input.next().get(0);
                    var prevElement = input.prev().get(0);

                    // Get the instance of the RadioGroup which is not initialized on the input element
                    if(!widgetInstance && input.is("[type=radio]")) {
                        widgetInstance = kendo.widgetInstance(input.closest(".k-radio-list"));
                    }

                    // Get the instance of the CheckBoxGroup which is not initialized on the input element
                    if(!widgetInstance && input.is("[type=checkbox]")) {
                        widgetInstance = kendo.widgetInstance(input.closest(".k-checkbox-list"));
                    }

                    if (widgetInstance && widgetInstance.wrapper) {
                        messageLabel.insertAfter(widgetInstance.wrapper);
                    } else if (parentElement && parentElement.nodeName === "LABEL") {
                        // Input inside label
                        messageLabel.insertAfter(parentElement);
                    } else if (nextElement && isLabelFor(nextElement, input[0])) {
                        // Input before label
                        messageLabel.insertAfter(nextElement);
                    } else if (prevElement && isLabelFor(prevElement, input[0])) {
                        // Input after label
                        messageLabel.insertAfter(input);
                    } else {
                        messageLabel.insertAfter(input);
                    }
                }

                messageLabel.removeClass("k-hidden");

                input.attr(ARIAINVALID, true);
            } else {
                delete that._errors[fieldName];
            }

            if (wasValid !== valid) {
                this.trigger(VALIDATE_INPUT, { valid: valid, input: input, error: messageText, field: fieldName });
            }

            input.toggleClass(INVALIDINPUT, !valid);
            input.toggleClass(VALIDINPUT, valid);

            if (kendo.widgetInstance(input)) {
                var inputWrap = kendo.widgetInstance(input)._inputWrapper;
                var inputLabel = kendo.widgetInstance(input)._inputLabel;

                if (inputWrap) {
                    inputWrap.toggleClass(INVALIDINPUT, !valid);
                    inputWrap.toggleClass(VALIDINPUT, valid);
                }
                if (inputLabel) {
                    inputLabel.toggleClass(INVALIDLABEL, !valid);
                }
            }

            if (wasValid !== valid) {
                var errorId = messageLabel ? messageLabel.attr("id") : lbl.attr("id");

                that._associateMessageContainer(input, errorId);

                if (this.options.validationSummary && this.options.validateOnBlur) {
                    this.showValidationSummary();
                }
            }

            return valid;
        },

        hideMessages: function() {
            var that = this,
                className = "." + INVALIDMSG,
                element = that.element;

            that._disassociateMessageContainers();

            if (!element.is(INPUTSELECTOR)) {
                element.find(className).addClass("k-hidden");
            } else {
                element.next(className).addClass("k-hidden");
            }
        },

        reset: function() {
            var that = this,
                inputs = that.element.find("." + INVALIDINPUT),
                labels = that.element.find("." + INVALIDLABEL);

            that._errors = [];

            that.hideMessages();

            that.hideValidationSummary();

            inputs.removeAttr(ARIAINVALID);
            inputs.removeClass(INVALIDINPUT);
            labels.removeClass(INVALIDLABEL);
        },

        _findMessageContainer: function(fieldName) {
            var locators = kendo.ui.validator.messageLocators,
                name,
                containers = $();

            for (var idx = 0, length = this.element.length; idx < length; idx++) {
                containers = containers.add(searchForMessageContainer(this.element[idx].getElementsByTagName("*"), fieldName));
            }

            for (name in locators) {
                containers = containers.add(locators[name].locate(this.element, fieldName));
            }

            return containers;
        },

        _decorateMessageContainer: function(container, fieldName) {
            var locators = kendo.ui.validator.messageLocators,
                name;

            container.addClass(INVALIDMSG)
                .attr(kendo.attr("for"), fieldName || "");

            if (!container.attr("id")) {
                container.attr("id", fieldName + "-error");
            }

            for (name in locators) {
                locators[name].decorate(container, fieldName);
            }
        },

        _extractMessage: function(input, ruleKey) {
            var that = this,
                customMessage = that.options.messages[ruleKey],
                fieldName = input.attr(NAME),
                nonDefaultMessage;

            if (!kendo.ui.Validator.prototype.options.messages[ruleKey]) {
                 nonDefaultMessage = kendo.isFunction(customMessage) ? customMessage(input) : customMessage;
            }

            customMessage = kendo.isFunction(customMessage) ? customMessage(input) : customMessage;

            return kendo.format(input.attr(kendo.attr(ruleKey + "-msg")) || input.attr("validationMessage") || nonDefaultMessage || customMessage || input.attr("title") || "",
                fieldName,
                input.attr(ruleKey) || input.attr(kendo.attr(ruleKey)));
        },

        _checkValidity: function(input) {
            var rules = this.options.rules,
                rule;

            for (rule in rules) {
                if (!rules[rule].call(this, input)) {
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
        },

        setOptions: function(options) {
            if (options.validationSummary) {
                this.hideValidationSummary();
            }

            kendo.deepExtend(this.options, options);

            this.destroy();

            this.init(this.element, this.options);

            this._setEvents(this.options);
        },

        _getInputNames: function() {
            var that = this,
                inputs = that.element.find(that._inputSelector),
                sorted = [];

            for (var idx = 0, length = inputs.length; idx < length; idx++) {
                var input = $(inputs[idx]);

                if (hasAttribute(input, NAME)) {
                    // Add current name if:
                    // - not present so far;
                    // - present but not part of CheckBoxGroup or RadioGroup.
                    if(sorted.indexOf(input.attr(NAME)) === -1 ||
                        (input.closest(".k-checkbox-list").length === 0 &&
                        input.closest(".k-radio-list").length === 0)) {
                            sorted.push(input.attr(NAME));
                    }
                }
            }

            return sorted;
        },

        _associateMessageContainer: function(input, errorId) {
            var nextFocusable = kendo.getWidgetFocusableElement(input);

            if (!nextFocusable || !errorId) {
                return;
            }

            kendo.toggleAttribute(nextFocusable, ARIADESCRIBEDBY, errorId);
        },

        _disassociateMessageContainers: function() {
            var that = this,
                inputs = that.element.find("." + INVALIDINPUT).addBack(),
                input, errorId;

            for (var i = 0; i < inputs.length; i += 1) {
                input = $(inputs[i]);

                if (input.is("input")) {
                    errorId = that._findMessageContainer(input.attr(NAME))
                        .add(input.next("." + INVALIDMSG))
                        .attr("id");

                    that._associateMessageContainer(input, errorId);
                }
            }
        },

        _errorsByName: function() {
            var that = this,
                inputNames = that._getInputNames(),
                sorted = [];

            for (var i = 0; i < inputNames.length; i += 1) {
                var name = inputNames[i];

                if (that._errors[name]) {
                    sorted.push({
                        field: name,
                        message: that._errors[name]
                    });
                }
            }

            return sorted;
        },

        _renderSummary: function() {
            var that = this,
                options = this.options.validationSummary,
                element = this.element,
                prevElement = element.prev(),
                container;

            if (options.container) {
                container = $(options.container);
            } else if (prevElement && prevElement.hasClass(VALIDATIONSUMMARY)) {
                container = prevElement;
            } else {
                container = $("<div />").insertBefore(that.element);
            }

            container.addClass([VALIDATIONSUMMARY, MESSAGEBOX].join(" "));
            container.attr("role", "alert");

            container.on("click" + NS, proxy(that._summaryClick, that));

            return container;
        },

        _summaryClick: function(e) {
            e.preventDefault();

            var that = this,
                link = $(e.target),
                target = that.element.find("[name='" + link.data("field") +  "']"),
                nextFocusable;

            if (!target.length) {
                return;
            }

            nextFocusable = kendo.getWidgetFocusableElement(target);

            if (nextFocusable) {
                nextFocusable.focus();
            }
        },

        showValidationSummary: function() {
            var that = this,
                summary = that.validationSummary,
                errors = that._errorsByName(),
                errorsList;

            if (!summary) {
                summary = that.validationSummary = that._renderSummary();
            }

            errorsList = parseHtml(that._summaryTemplate({
                errors: errors
            }));

            summary.html(errorsList);

            summary.toggleClass("k-hidden", !errors.length);
        },

        hideValidationSummary: function() {
            var that = this,
                summary = that.validationSummary;

            if (!summary) {
                return;
            }

            summary.addClass("k-hidden");
        }
    });

    kendo.ui.plugin(Validator);
})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)();  });
