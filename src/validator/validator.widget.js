import { Widget } from "../core/base/widget";
import { domUtilsService } from "../core/services/dom-utils.service";
import { dateParserService } from "../core/services/date-parser.service";
import { focusUtilsService } from "../core/services/focus-utils.service";
import { formatterService } from "../core/services/formatter.service";
import { htmlService } from "../core/services/html.service";
import { $ } from "../core/services/kendo-jquery.service";
import { numberParserService } from "../core/services/number-parser.service";
import { Template } from "../core/services/template.service";
import { utilsService } from "../core/services/utils.service";
import { widgetUtilsService } from "../core/services/widget-utils.service";
import { ALLOWED_URL_PROTOCOLS, ARIADESCRIBEDBY, ARIAINVALID, BLUR, CHANGE, CHECKBOXSELECTOR, CHECKBOXWRAPPER, FORM, INPUTINNER, INPUTSELECTOR, INPUTWRAPPER, INVALIDINPUT, INVALIDLABEL, INVALIDMSG, MESSAGEBOX, NAME, NOVALIDATE, NS, NUMBERINPUTSELECTOR, UPLOADBUTTONWRAPPER, VALIDATE, VALIDATE_INPUT, VALIDATIONSUMMARY, VALIDINPUT, emailRegExp } from "./constants";
import { SUMMARYTEMPLATE, hasAttribute, isLabelFor, matcher, numberOfDecimalDigits, parseHtml, patternMatcher, searchForMessageContainer } from "./validator-helpers";
import { getValidatorNamespace, resolveRules } from "./validator-registry";
export class Validator extends Widget {
    static events = [VALIDATE, CHANGE, VALIDATE_INPUT];
    static options = {
        name: "Validator",
        prefix: "",
        errorTemplate: (data) => {
            const { message } = data;
            return `<span class="k-form-error">${htmlService.encode(message)}</span>`;
        },
        messageBoxThemeColor: "error",
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
            required: function (input) {
                let containerElement = this._containerElement;
                let noNameCheckbox = !input.attr("name") && !input.is(":checked");
                let name = input.attr("name");
                let quote = !!name && name.indexOf("'") > -1 ? "\"" : "'";
                let namedCheckbox = input.attr("name") && !containerElement.find("input[name=" + quote + input.attr("name") + quote + "]:checked").length;
                let checkbox = input.filter("[type=checkbox]").length && (noNameCheckbox || namedCheckbox);
                let file = input.filter("[type=file]").parents(UPLOADBUTTONWRAPPER).children("input").length;
                let radio = input.filter("[type=radio]").length && !containerElement.find("input[name=" + quote + input.attr("name") + quote + "]:checked").length;
                let value = input.val();
                if (file) {
                    let isValid = false;
                    input.filter("[type=file]").parents(UPLOADBUTTONWRAPPER).children("input").each(function (_idx) {
                        if (input.val()) {
                            isValid = true;
                        }
                    });
                    return !(hasAttribute(input, "required") && !isValid);
                }
                return !(hasAttribute(input, "required") && (!value || value === "" || (Array.isArray(value) && value.length === 0) || checkbox || radio));
            },
            pattern: function (input) {
                if (input.filter("[type=text],[type=email],[type=url],[type=tel],[type=search],[type=password]").filter("[pattern]").length && input.val() !== "") {
                    return patternMatcher(String(input.val()), input.attr("pattern") ?? "");
                }
                return true;
            },
            min: function (input) {
                if (input.filter(NUMBERINPUTSELECTOR + ",[" + domUtilsService.attr("type") + "=number]").filter("[min]").length && input.val() !== "") {
                    const min = parseFloat(input.attr("min") ?? "") || 0;
                    const val = numberParserService.parseFloat(input.val());
                    return val !== null && min <= val;
                }
                return true;
            },
            max: function (input) {
                if (input.filter(NUMBERINPUTSELECTOR + ",[" + domUtilsService.attr("type") + "=number]").filter("[max]").length && input.val() !== "") {
                    const max = parseFloat(input.attr("max") ?? "") || 0;
                    const val = numberParserService.parseFloat(input.val());
                    return val !== null && max >= val;
                }
                return true;
            },
            step: function (input) {
                if (input.filter(NUMBERINPUTSELECTOR + ",[" + domUtilsService.attr("type") + "=number]").filter("[step]").length && input.val() !== "") {
                    const min = parseFloat(input.attr("min") ?? "") || 0;
                    const step = numberParserService.parseFloat((input.attr("step") ?? "")) || 1;
                    const val = parseFloat(String(input.val()));
                    const decimals = numberOfDecimalDigits(step);
                    let raise;
                    if (decimals) {
                        raise = Math.pow(10, decimals);
                        return (Math.floor((val - min) * raise) % (step * raise)) / Math.pow(100, decimals) === 0;
                    }
                    return (val - min) % step === 0;
                }
                return true;
            },
            email: function (input) {
                return matcher(input, "[type=email],[" + domUtilsService.attr("type") + "=email]", emailRegExp);
            },
            url: function (input) {
                if (input.filter("[type=url],[" + domUtilsService.attr("type") + "=url]").length && input.val() !== "") {
                    try {
                        const url = new URL(String(input.val()));
                        return ALLOWED_URL_PROTOCOLS.includes(url.protocol);
                    }
                    catch {
                        return false;
                    }
                }
                return true;
            },
            date: function (input) {
                if (input.filter("[type^=date],[" + domUtilsService.attr("type") + "=date]").length && input.val() !== "") {
                    return dateParserService.parseDate(String(input.val()), input.attr(domUtilsService.attr("format"))) !== null;
                }
                return true;
            },
            captcha: function (input) {
                if (input.filter("[" + domUtilsService.attr("role") + "=captcha]").length) {
                    const that = this;
                    const captcha = widgetUtilsService.widgetInstance(input);
                    const isValidated = function (isValid) {
                        return typeof isValid !== "undefined" && isValid !== null;
                    };
                    if (!input.data("captcha_validating") && !isValidated(captcha.isValid()) && !!captcha.getCaptchaId()) {
                        input.data("captcha_validating", true);
                        that._validating = true;
                        captcha.validate().done(function () {
                            that._validating = false;
                            that._checkElement(input);
                        }).fail(function (data) {
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
    };
    constructor(element, options) {
        super(element, options);
    }
    init(element, options) {
        const that = this;
        const resolved = resolveRules(element);
        const validateAttributeSelector = "[" + domUtilsService.attr("validate") + "!=false]";
        options = options || {};
        const validatorNamespace = getValidatorNamespace();
        options.rules = $.extend({}, validatorNamespace.rules, resolved.rules, options.rules);
        options.messages = $.extend({}, validatorNamespace.messages, resolved.messages, options.messages);
        super.init(element, options);
        that.validationSummary = null;
        that._shouldSearchDocument = false;
        that._validating = false;
        that._errors = {};
        that._isValidated = false;
        that._errorTemplate = Template.compile(that.options.errorTemplate);
        const validationSummary = that.options.validationSummary === true ? {} : that.options.validationSummary || {};
        that._summaryTemplate = Template.compile(validationSummary.template || SUMMARYTEMPLATE);
        if (that.element.is(FORM)) {
            that.element.attr(NOVALIDATE, NOVALIDATE);
        }
        const formId = that.element.attr("id");
        that._shouldSearchDocument = that.element.is(FORM) && formId != undefined && $(`:input[form='${formId}']`).length > 0;
        that._containerElement = that._shouldSearchDocument ? $(document) : that.element;
        that._inputSelector = that._buildSelector(INPUTSELECTOR, validateAttributeSelector);
        that._checkboxSelector = that._buildSelector(CHECKBOXSELECTOR, validateAttributeSelector);
        that._attachEvents();
        if (that._validateOnInit()) {
            that.validate();
        }
        that.endInit();
    }
    destroy() {
        super.destroy();
        this.element.off(NS);
        if (this.validationSummary) {
            this.validationSummary.off(NS);
            this.validationSummary = null;
        }
    }
    value() {
        if (!this._isValidated) {
            return false;
        }
        return this.errors().length === 0;
    }
    validate() {
        let inputs = $();
        let idx;
        let result = false;
        let length;
        let containerElement = this._containerElement;
        let isValid = this.value();
        this._errors = {};
        if (!this.element.is(INPUTSELECTOR)) {
            let invalid = false;
            inputs = containerElement.find(this._inputSelector);
            containerElement.find(UPLOADBUTTONWRAPPER).each(function () {
                let uploadContainer = $($(this).parents(".k-upload")[0]);
                let firstFileInput = $(this).find("input:hidden[type='file']").first();
                if (firstFileInput.length) {
                    if (uploadContainer.length && !uploadContainer.hasClass("k-disabled")) {
                        Array.prototype.push.call(inputs, firstFileInput[0]);
                    }
                }
            });
            for (idx = 0, length = inputs.length; idx < length; idx++) {
                if (!this.validateInput(inputs.eq(idx))) {
                    invalid = true;
                }
            }
            result = !invalid;
        }
        else {
            result = this.validateInput(this.element);
        }
        if (this.options.validationSummary && !isValid) {
            this.showValidationSummary();
        }
        this.trigger(VALIDATE, {
            valid: result,
            errors: this.errors()
        });
        if (isValid !== result) {
            this.trigger(CHANGE);
        }
        return result;
    }
    validateInput(input) {
        input = $(input);
        if (!utilsService.isEmpty(input.closest(".k-otp"))) {
            let otpContainer = input.closest(".k-otp");
            input = otpContainer.find("input[data-role='otpinput']");
        }
        this._isValidated = true;
        const that = this;
        const template = that._errorTemplate;
        const result = that._checkValidity(input);
        const valid = result.valid;
        const className = "." + INVALIDMSG;
        const fieldName = input.attr(NAME) || "";
        const lbl = that._findMessageContainer(fieldName).add(input.next(className).filter(function () {
            let element = that._shouldSearchDocument ? $(document) : $(this);
            if (element.filter("[" + domUtilsService.attr("for") + "]").length) {
                return element.attr(domUtilsService.attr("for")) === fieldName;
            }
            return true;
        })).addClass("k-hidden");
        const messageText = !valid ? that._extractMessage(input, result.key || "") : "";
        const messageLabel = !valid ? parseHtml(template({
            message: messageText,
            field: fieldName
        })) : $();
        const wasValid = !input.attr(ARIAINVALID);
        const isInputInner = input.is(INPUTINNER);
        const inputWrapper = input.parent(INPUTWRAPPER);
        let widgetInstance;
        input.removeAttr(ARIAINVALID);
        if (input.hasClass("k-hidden") && (input.attr("data-role") == "otpinput" || input.attr("data-role") == "upload")) {
            widgetInstance = widgetUtilsService.widgetInstance(input);
        }
        if (input.hasClass("k-hidden") && input.attr("data-role") == "signature") {
            widgetInstance = widgetUtilsService.widgetInstance(input.closest(".k-signature"));
        }
        if (input.is("[type=radio]")) {
            widgetInstance = widgetUtilsService.widgetInstance(input.closest(".k-radio-list"));
        }
        if (input.is("[type=checkbox]")) {
            widgetInstance = widgetUtilsService.widgetInstance(input.closest(".k-checkbox-list"));
        }
        if (!valid && !input.data("captcha_validating")) {
            that._errors[fieldName] = messageText;
            let lblId = lbl.attr("id");
            that._decorateMessageContainer(messageLabel, fieldName);
            if (lblId) {
                messageLabel.attr("id", lblId);
            }
            if (lbl.length !== 0) {
                lbl.replaceWith(messageLabel);
            }
            else {
                widgetInstance = widgetInstance || widgetUtilsService.widgetInstance(input);
                let parentElement = input.parent().get(0);
                let nextElement = input.next().get(0);
                let prevElement = input.prev().get(0);
                // Get the instance of the RadioGroup which is not initialized on the input element
                if (!widgetInstance && input.is("[type=radio]")) {
                    widgetInstance = widgetUtilsService.widgetInstance(input.closest(".k-radio-list"));
                }
                // Get the instance of the CheckBoxGroup which is not initialized on the input element
                if (!widgetInstance && input.is("[type=checkbox]")) {
                    widgetInstance = widgetUtilsService.widgetInstance(input.closest(".k-checkbox-list"));
                }
                if (widgetInstance && widgetInstance.wrapper && (widgetInstance.element !== widgetInstance.wrapper || ["Signature", "RadioGroup", "CheckBoxGroup"].indexOf(widgetInstance.options.name) > -1)) {
                    messageLabel.insertAfter(widgetInstance.wrapper);
                }
                else if (parentElement && parentElement.nodeName === "LABEL") {
                    // Input inside label
                    messageLabel.insertAfter(parentElement);
                }
                else if (nextElement && isLabelFor(nextElement, input[0])) {
                    // Input before label
                    messageLabel.insertAfter(nextElement);
                }
                else if (prevElement && isLabelFor(prevElement, input[0])) {
                    // Input after label
                    messageLabel.insertAfter(input);
                }
                else if (isInputInner && inputWrapper.length) {
                    // Input after input wrapper
                    messageLabel.insertAfter(inputWrapper);
                }
                else {
                    messageLabel.insertAfter(input);
                }
            }
            messageLabel.removeClass("k-hidden");
            input.attr(ARIAINVALID, "true");
        }
        else {
            delete that._errors[fieldName];
        }
        if (wasValid !== valid) {
            this.trigger(VALIDATE_INPUT, {
                valid: valid,
                input: input,
                error: messageText,
                field: fieldName
            });
        }
        widgetInstance = widgetInstance && widgetInstance.options.name == "Signature" ? widgetInstance : widgetUtilsService.widgetInstance(input);
        if (!widgetInstance || !(widgetInstance._inputWrapper || widgetInstance.wrapper) || input.is("[type=checkbox]") || input.is("[type=radio]")) {
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
                }
                else {
                    widgetInstance._removeInvalidState.bind(that);
                    widgetInstance._removeInvalidState(inputWrap, true);
                }
            }
            else if (inputWrap && !(input.is("[type=checkbox]") || input.is("[type=radio]"))) {
                inputWrap.toggleClass(INVALIDINPUT, !valid);
                inputWrap.toggleClass(VALIDINPUT, valid);
            }
            if (inputLabel) {
                inputLabel.toggleClass(INVALIDLABEL, !valid);
            }
        }
        if (wasValid !== valid) {
            let errorId = messageLabel.attr("id") || lbl.attr("id");
            that._associateMessageContainer(input, errorId);
            if (this.options.validationSummary && this.options.validateOnBlur) {
                this.showValidationSummary();
            }
        }
        return valid;
    }
    hideMessages() {
        const that = this;
        const className = "." + INVALIDMSG;
        const element = that._containerElement;
        that._disassociateMessageContainers();
        if (!element.is(INPUTSELECTOR)) {
            element.find(className).addClass("k-hidden");
        }
        else {
            element.next(className).addClass("k-hidden");
        }
    }
    reset() {
        const that = this;
        const containerElement = that._containerElement;
        const inputs = containerElement.find("." + INVALIDINPUT);
        const labels = containerElement.find("." + INVALIDLABEL);
        that._errors = {};
        that.hideMessages();
        that.hideValidationSummary();
        inputs.removeAttr(ARIAINVALID);
        inputs.removeClass(INVALIDINPUT);
        labels.removeClass(INVALIDLABEL);
    }
    errors() {
        const results = [];
        const errors = this._errors;
        let error;
        for (error in errors) {
            results.push(errors[error]);
        }
        return results;
    }
    setOptions(options) {
        if (options.validationSummary) {
            this.hideValidationSummary();
        }
        utilsService.deepExtend(this.options, options);
        this.destroy();
        this.init(this.element, this.options);
        this._setEvents(this.options);
    }
    showValidationSummary() {
        const that = this;
        let summary = that.validationSummary;
        const errors = that._errorsByName();
        let errorsList;
        if (!summary) {
            summary = that.validationSummary = that._renderSummary();
        }
        errorsList = parseHtml(that._summaryTemplate({
            errors: errors
        }));
        summary.empty().append(errorsList);
        summary.toggleClass("k-hidden", !errors.length);
    }
    hideValidationSummary() {
        const that = this;
        const summary = that.validationSummary;
        if (!summary) {
            return;
        }
        summary.addClass("k-hidden");
    }
    _buildSelector(selectorConstant, validateAttributeSelector) {
        if (!this._shouldSearchDocument) {
            return selectorConstant + validateAttributeSelector;
        }
        const id = this.element.attr("id");
        return `#${id} ` + selectorConstant + validateAttributeSelector + `,[form="${id}"]`;
    }
    _allowSubmit() {
        return getValidatorNamespace().allowSubmit(this.element, this.errors());
    }
    _validateOnInit() {
        return getValidatorNamespace().validateOnInit(this.element);
    }
    _submit(e) {
        if ((!this.validate() && !this._allowSubmit()) || this._validating) {
            e.stopPropagation();
            e.stopImmediatePropagation();
            e.preventDefault();
            return false;
        }
        return true;
    }
    _checkElement(element) {
        const state = this.value();
        this.validateInput(element);
        if (this.value() !== state) {
            this.trigger(CHANGE);
        }
    }
    _attachEvents() {
        const that = this;
        const element = that._containerElement;
        if (that.element.is(FORM)) {
            that.element.on("submit" + NS, that._submit.bind(that));
        }
        if (that.options.validateOnBlur) {
            if (!element.is(INPUTSELECTOR)) {
                element.on(BLUR + NS, that._inputSelector, function () {
                    that._checkElement($(this));
                });
                element.on("click" + NS, that._checkboxSelector, function () {
                    that._checkElement($(this));
                });
            }
            else {
                element.on(BLUR + NS, function () {
                    that._checkElement(that.element);
                });
                if (element.is(CHECKBOXSELECTOR)) {
                    element.on("click" + NS, function () {
                        that._checkElement(that.element);
                    });
                }
            }
        }
    }
    _findMessageContainer(fieldName) {
        let locators = getValidatorNamespace().messageLocators || {};
        let name;
        let containers = $();
        for (let idx = 0, length = this.element.length; idx < length; idx++) {
            let target = this._shouldSearchDocument ? document : this.element[idx];
            containers = containers.add(searchForMessageContainer(target.getElementsByTagName("*"), fieldName));
        }
        for (name in locators) {
            containers = containers.add(locators[name].locate(this._containerElement, fieldName));
        }
        return containers;
    }
    _decorateMessageContainer(container, fieldName) {
        const locators = getValidatorNamespace().messageLocators || {};
        let name;
        container.addClass(INVALIDMSG).attr(domUtilsService.attr("for"), fieldName || "");
        if (!container.attr("id")) {
            container.attr("id", fieldName + "-error");
        }
        for (name in locators) {
            locators[name].decorate(container, fieldName);
        }
    }
    _extractMessage(input, ruleKey) {
        const that = this;
        let customMessage = that.options.messages[ruleKey];
        const fieldName = input.attr(NAME) || "";
        let nonDefaultMessage;
        if (!Validator.options.messages[ruleKey]) {
            nonDefaultMessage = utilsService.isFunction(customMessage) ? customMessage(input) : customMessage;
        }
        customMessage = utilsService.isFunction(customMessage) ? customMessage(input) : customMessage;
        const closestParentWithFieldName = input.parent().closest("[name='" + fieldName + "']");
        const target = closestParentWithFieldName.length ? closestParentWithFieldName : input;
        return formatterService.format(target.attr(domUtilsService.attr(ruleKey + "-msg")) || target.attr("validationMessage") || nonDefaultMessage || customMessage || target.attr("title") || "", fieldName, target.attr(ruleKey) || input.attr(domUtilsService.attr(ruleKey)));
    }
    _checkValidity(input) {
        const rules = this.options.rules;
        let rule;
        for (rule in rules) {
            if (!rules[rule].call(this, input)) {
                return {
                    valid: false,
                    key: rule
                };
            }
        }
        return {
            valid: true
        };
    }
    _getInputNames() {
        const that = this;
        const containerElement = this._containerElement;
        const inputs = containerElement.find(that._inputSelector);
        let sorted = [];
        let checkBoxNames = [];
        for (let idx = 0, length = inputs.length; idx < length; idx++) {
            let input = $(inputs[idx]);
            const inputName = input.attr(NAME) || "";
            if (hasAttribute(input, NAME)) {
                // Add current name if:
                // - not present so far;
                // - present but not part of CheckBoxGroup or RadioGroup.
                if (sorted.indexOf(inputName) === -1 || (input.closest(".k-checkbox-list").length === 0 && input.closest(".k-radio-list").length === 0)) {
                    if (input.parents(CHECKBOXWRAPPER).length) {
                        checkBoxNames.push(inputName);
                        sorted.push(inputName);
                    }
                    else {
                        if (!checkBoxNames.includes(inputName)) {
                            sorted.push(inputName);
                        }
                    }
                }
            }
        }
        return sorted;
    }
    _associateMessageContainer(input, errorId) {
        const nextFocusable = focusUtilsService.getWidgetFocusableElement(input);
        if (!nextFocusable || !errorId) {
            return;
        }
        domUtilsService.toggleAttribute(nextFocusable, ARIADESCRIBEDBY, errorId);
    }
    _disassociateMessageContainers() {
        let i;
        const that = this;
        const inputs = that.element.find("." + INVALIDINPUT).addBack();
        let input;
        let errorId;
        for (i = 0; i < inputs.length; i += 1) {
            input = $(inputs[i]);
            if (input.is("input")) {
                errorId = that._findMessageContainer(input.attr(NAME) || "").add(input.next("." + INVALIDMSG)).attr("id");
                that._associateMessageContainer(input, errorId);
            }
        }
    }
    _errorsByName() {
        let i;
        const that = this;
        const inputNames = that._getInputNames();
        const sorted = [];
        for (i = 0; i < inputNames.length; i += 1) {
            const name = inputNames[i];
            if (that._errors[name]) {
                sorted.push({
                    field: name,
                    message: that._errors[name]
                });
            }
        }
        return sorted;
    }
    _renderSummary() {
        const that = this;
        const options = this.options.validationSummary === true ? {} : this.options.validationSummary || {};
        const element = this.element;
        const prevElement = element.prev();
        let container;
        if (options.container) {
            container = $(options.container);
        }
        else if (prevElement && prevElement.hasClass(VALIDATIONSUMMARY)) {
            container = prevElement;
        }
        else {
            container = $("<div />").insertBefore(that.element);
        }
        container.addClass([VALIDATIONSUMMARY, MESSAGEBOX].join(" "));
        const themeColor = that.options.messageBoxThemeColor;
        if (themeColor) {
            container.addClass("k-messagebox-" + themeColor);
        }
        container.attr("role", "alert");
        container.on("click" + NS, function (e) {
            that._summaryClick(e);
        });
        return container;
    }
    _summaryClick(e) {
        e.preventDefault();
        const that = this;
        const link = $(e.target);
        const target = that.element.find("[name='" + link.data("field") + "']");
        let nextFocusable;
        if (!target.length) {
            return;
        }
        nextFocusable = focusUtilsService.getWidgetFocusableElement(target);
        if (nextFocusable) {
            nextFocusable.trigger("focus");
        }
    }
}
Validator.applyEnumerablePrototype();
Validator.applyPrototypeMembers();
