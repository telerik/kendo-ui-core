import "./kendo.core.js";

export const __meta__ = {
    id: "validator",
    name: "Validator",
    category: "web",
    description: "The Validator offers an easy way to do a client-side form validation.",
    depends: [ "core" ]
};


(function($, undefined) {
    let kendo = window.kendo,
        Widget = kendo.ui.Widget,
        NS = ".kendoValidator",
        INVALIDMSG = "k-invalid-msg",
        invalidMsgRegExp = new RegExp(INVALIDMSG,'i'),
        INVALIDINPUT = "k-invalid",
        VALIDINPUT = "k-valid",
        VALIDATIONSUMMARY = "k-validation-summary",
        INVALIDLABEL = "k-text-error",
        MESSAGEBOX = "k-messagebox k-messagebox-error",
        INPUTINNER = ".k-input-inner",
        UPLOADBUTTONWRAPPER = ".k-upload-button-wrap",
        INPUTWRAPPER = ".k-input",
        ARIAINVALID = "aria-invalid",
        ARIADESCRIBEDBY = "aria-describedby",
        emailRegExp = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i,
        ALLOWED_URL_PROTOCOLS = ["http:", "https:", "ftp:", "ftps:"],
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
            if (input.length) {
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

    var SUMMARYTEMPLATE = ({ errors }) => {
        let result = '<ul>';
        for (var i = 0; i < errors.length; i += 1) {
            result += `<li><a data-field="${errors[i].field}" href="#">${errors[i].message}</a></li>`;
        }

        result += '</ul>';
        return result;
    };

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

            const formId = that.element.attr("id");
            that._shouldSearchDocument = that.element.is(FORM) && formId != undefined && $(`:input[form='${formId}']`).length > 0;
            that._containerElement = that._shouldSearchDocument ? $(document) : that.element;
            that._inputSelector = that._buildSelector(INPUTSELECTOR, validateAttributeSelector);
            that._checkboxSelector = that._buildSelector(CHECKBOXSELECTOR, validateAttributeSelector);

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
            errorTemplate: ({ message }) => `<span class="k-form-error">${message}</span>`,
            messages: {
                required: "{0} is required",
                pattern: "{0} is not valid",
                min: "{0} should be greater than or equal to {1}",
                max: "{0} should be smaller than or equal to {1}",
                step: "{0} is not valid",
                email: "{0} is not valid email",
                url: "{0} is not valid URL",
                date: "{0} is not valid date",
                dateCompare: "End date should be greater than or equal to the start date",
                captcha: "The text you entered doesn't match the image."
            },
            rules: {
                required: function(input) {
                    let containerElement = this._containerElement,
                        noNameCheckbox = !input.attr("name") && !input.is(":checked"),
                        name = input.attr("name"),
                        quote = !!name && name.indexOf("'") > -1 ? '\"' : "'",
                        namedCheckbox = input.attr("name") && !containerElement.find("input[name=" + quote + input.attr("name") + quote + "]:checked").length,
                        checkbox = input.filter("[type=checkbox]").length && (noNameCheckbox || namedCheckbox),
                        file = input.filter("[type=file]").parents(UPLOADBUTTONWRAPPER).children("input").length,
                        radio = input.filter("[type=radio]").length && !containerElement.find("input[name=" + quote + input.attr("name") + quote + "]:checked").length,
                        value = input.val();

                        if (file) {
                            let isValid = false;

                            input.filter("[type=file]")
                                .parents(UPLOADBUTTONWRAPPER)
                                .children("input")
                                .each(function(idx) {
                                    if (input.val()) {
                                        isValid = true;
                                    }
                                });

                            return !(hasAttribute(input, "required") && !isValid);
                        }

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
                            step = kendo.parseFloat(input.attr("step")) || 1,
                            val = parseFloat(input.val()),
                            decimals = numberOfDecimalDigits(step),
                            raise;

                        if (decimals) {
                            raise = Math.pow(10, decimals);
                            return ((Math.floor((val - min) * raise)) % (step * raise)) / Math.pow(100, decimals) === 0;
                        }
                        return ((val - min) % step) === 0;
                    }
                    return true;
                },
                email: function(input) {
                    return matcher(input, "[type=email],[" + kendo.attr("type") + "=email]", emailRegExp);
                },
                url: function(input) {
                    if (input.filter("[type=url],[" + kendo.attr("type") + "=url]").length && input.val() !== "") {
                        try {
                            const url = new URL(input.val());
                            return ALLOWED_URL_PROTOCOLS.includes(url.protocol);
                        } catch {
                            return false;
                        }
                    }
                    return true;
                },
                date: function(input) {
                    if (input.filter("[type^=date],[" + kendo.attr("type") + "=date]").length && input.val() !== "") {
                        return kendo.parseDate(input.val(), input.attr(kendo.attr("format"))) !== null;
                    }
                    return true;
                },
                captcha: function(input) {
                    if (input.filter("[" + kendo.attr("role") + "=captcha]").length) {
                        var that = this,
                            captcha = kendo.widgetInstance(input),
                            isValidated = function(isValid) {
                                return typeof(isValid) !== 'undefined' && isValid !== null;
                            };

                        if (!input.data("captcha_validating") && !isValidated(captcha.isValid()) && !!captcha.getCaptchaId()) {
                            input.data("captcha_validating", true);
                            that._validating = true;
                            captcha.validate().done(function() {
                                that._validating = false;
                                that._checkElement(input);
                            }).fail(function(data) {
                                that._validating = false;
                                if (data.error && data.error === "handler_not_defined") {
                                    window.console.warn("Captcha's validationHandler is not defined! You should either define a proper validation endpoint or declare a callback function to ensure the required behavior.");
                                }
                            });
                        }

                        if (isValidated(captcha.isValid())) {
                            input.removeData("captcha_validating");
                            return captcha.isValid();
                        }
                    }
                    return true;
                }
            },
            validateOnBlur: true,
            validationSummary: false
        },

        _buildSelector: function(selectorConstant, validateAttributeSelector) {
            if (!this._shouldSearchDocument) {
                return selectorConstant + validateAttributeSelector;
            }
            const id = this.element.attr("id");

            return `#${id} ` + selectorConstant + validateAttributeSelector + `,[form="${id}"]`;
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
            if ((!this.validate() && !this._allowSubmit()) || this._validating) {
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
            const that = this,
            element = that._containerElement;

            if (that.element.is(FORM)) {
                that.element.on("submit" + NS, that._submit.bind(that));
            }

            if (that.options.validateOnBlur) {
                if (!element.is(INPUTSELECTOR)) {
                    element.on(BLUR + NS, that._inputSelector, function() {
                        that._checkElement($(this));
                    });

                    element.on("click" + NS, that._checkboxSelector, function() {
                        that._checkElement($(this));
                    });
                } else {
                    element.on(BLUR + NS, function() {
                        that._checkElement(that.element);
                    });

                    if (element.is(CHECKBOXSELECTOR)) {
                        element.on("click" + NS, function() {
                            that._checkElement(that.element);
                        });
                    }
                }
            }
        },

        validate: function() {
            let inputs;
            let idx;
            let result = false;
            let length;
            let containerElement = this._containerElement;
            let isValid = this.value();

            this._errors = {};

            if (!this.element.is(INPUTSELECTOR)) {
                let invalid = false;

                inputs = containerElement.find(this._inputSelector);
                let fileInput = containerElement.find("input[type='file']");

                if (fileInput.length) {
                    inputs.push($(fileInput.first())[0]);
                }
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

            if (!kendo.isEmpty(input.closest('.k-otp'))) {
                let otpContainer = input.closest(".k-otp");
                input = otpContainer.find("input[data-role='otpinput']");
            }


            this._isValidated = true;

            const that = this,
                template = that._errorTemplate,
                result = that._checkValidity(input),
                valid = result.valid,
                className = "." + INVALIDMSG,
                fieldName = (input.attr(NAME) || ""),
                lbl = that._findMessageContainer(fieldName).add(input.next(className).filter(function() {
                    let element = that._shouldSearchDocument ? $(document) : $(this);
                    if (element.filter("[" + kendo.attr("for") + "]").length) {
                        return element.attr(kendo.attr("for")) === fieldName;
                    }

                    return true;

                })).addClass("k-hidden"),
                messageText = !valid ? that._extractMessage(input, result.key) : "",
                messageLabel = !valid ? parseHtml(template({ message: decode(messageText), field: fieldName })) : "",
                wasValid = !input.attr(ARIAINVALID),
                isInputInner = input.is(INPUTINNER),
                inputWrapper = input.parent(INPUTWRAPPER);
            let widgetInstance;

            input.removeAttr(ARIAINVALID);

            if (input.hasClass("k-hidden") && (input.attr("data-role") == "otpinput" || input.attr("data-role") == "upload")) {
                widgetInstance = kendo.widgetInstance(input);
            }
            if (input.hasClass("k-hidden") && input.attr("data-role") == "signature") {
                widgetInstance = kendo.widgetInstance(input.closest(".k-signature"));
            }

            if (input.is("[type=radio]")) {
                widgetInstance = kendo.widgetInstance(input.closest(".k-radio-list"));
            }

            if (input.is("[type=checkbox]")) {
                widgetInstance = kendo.widgetInstance(input.closest(".k-checkbox-list"));
            }

            if (!valid && !input.data("captcha_validating")) {
                that._errors[fieldName] = messageText;
                let lblId = lbl.attr('id');

                that._decorateMessageContainer(messageLabel, fieldName);


                if (lblId) {
                    messageLabel.attr('id', lblId);
                }

                if (lbl.length !== 0) {
                    lbl.replaceWith(messageLabel);
                } else {
                    widgetInstance = widgetInstance || kendo.widgetInstance(input);
                    let parentElement = input.parent().get(0);
                    let nextElement = input.next().get(0);
                    let prevElement = input.prev().get(0);

                    // Get the instance of the RadioGroup which is not initialized on the input element
                    if (!widgetInstance && input.is("[type=radio]")) {
                        widgetInstance = kendo.widgetInstance(input.closest(".k-radio-list"));
                    }

                    // Get the instance of the CheckBoxGroup which is not initialized on the input element
                    if (!widgetInstance && input.is("[type=checkbox]")) {
                        widgetInstance = kendo.widgetInstance(input.closest(".k-checkbox-list"));
                    }

                    if (widgetInstance && widgetInstance.wrapper && (widgetInstance.element !== widgetInstance.wrapper || ["Signature", "RadioGroup", "CheckBoxGroup"].indexOf(widgetInstance.options.name) > -1)) {
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
                    } else if (isInputInner && inputWrapper.length) {
                        // Input after input wrapper
                        messageLabel.insertAfter(inputWrapper);
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

            widgetInstance = (widgetInstance && widgetInstance.options.name == "Signature") ? widgetInstance : kendo.widgetInstance(input);

            if (!widgetInstance || !(widgetInstance._inputWrapper || widgetInstance.wrapper) || (input.is("[type=checkbox]") || input.is("[type=radio]"))) {
                input.toggleClass(INVALIDINPUT, !valid);
                input.toggleClass(VALIDINPUT, valid);
            }

            if (widgetInstance) {
                let widgetName = widgetInstance.options.name;
                let inputWrap = widgetInstance._inputWrapper || widgetInstance.wrapper;
                let inputLabel = widgetInstance._inputLabel;

                if (widgetName == "OTPInput") {
                    if (!valid) {
                        widgetInstance._addInvalidState.bind(that);
                        widgetInstance._addInvalidState(inputWrap, true);
                    } else {
                        widgetInstance._removeInvalidState.bind(that);
                        widgetInstance._removeInvalidState(inputWrap, true);
                    }
                } else if (inputWrap && !(input.is("[type=checkbox]") || input.is("[type=radio]"))) {
                    inputWrap.toggleClass(INVALIDINPUT, !valid);
                    inputWrap.toggleClass(VALIDINPUT, valid);
                }
                if (inputLabel) {
                    inputLabel.toggleClass(INVALIDLABEL, !valid);
                }
            }

            if (wasValid !== valid) {
                let errorId = messageLabel ? messageLabel.attr("id") : lbl.attr("id");

                that._associateMessageContainer(input, errorId);

                if (this.options.validationSummary && this.options.validateOnBlur) {
                    this.showValidationSummary();
                }
            }

            return valid;
        },

        hideMessages: function() {
            const that = this,
                className = "." + INVALIDMSG,
                element = that._containerElement;

            that._disassociateMessageContainers();

            if (!element.is(INPUTSELECTOR)) {
                element.find(className).addClass("k-hidden");
            } else {
                element.next(className).addClass("k-hidden");
            }
        },

        reset: function() {
            const that = this,
                containerElement = that._containerElement,
                inputs = containerElement.find("." + INVALIDINPUT),
                labels = containerElement.find("." + INVALIDLABEL);

            that._errors = [];

            that.hideMessages();

            that.hideValidationSummary();

            inputs.removeAttr(ARIAINVALID);
            inputs.removeClass(INVALIDINPUT);
            labels.removeClass(INVALIDLABEL);
        },

        _findMessageContainer: function(fieldName) {
            let locators = kendo.ui.validator.messageLocators,
                name,
                containers = $();

            for (let idx = 0, length = this.element.length; idx < length; idx++) {
                let target = this._shouldSearchDocument ? document : this.element[idx];
                containers = containers.add(searchForMessageContainer(target.getElementsByTagName("*"), fieldName));
            }

            for (name in locators) {
                containers = containers.add(locators[name].locate(this._containerElement, fieldName));
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
            const that = this,
                containerElement = this._containerElement,
                inputs = containerElement.find(that._inputSelector);
            let sorted = [];

            for (let idx = 0, length = inputs.length; idx < length; idx++) {
                let input = $(inputs[idx]);

                if (hasAttribute(input, NAME)) {
                    // Add current name if:
                    // - not present so far;
                    // - present but not part of CheckBoxGroup or RadioGroup.
                    if (sorted.indexOf(input.attr(NAME)) === -1 ||
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

            container.on("click" + NS, that._summaryClick.bind(that));

            return container;
        },

        _summaryClick: function(e) {
            e.preventDefault();

            var that = this,
                link = $(e.target),
                target = that.element.find("[name='" + link.data("field") + "']"),
                nextFocusable;

            if (!target.length) {
                return;
            }

            nextFocusable = kendo.getWidgetFocusableElement(target);

            if (nextFocusable) {
                nextFocusable.trigger("focus");
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
export default kendo;

