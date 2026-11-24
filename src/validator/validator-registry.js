import { $ } from "../core/services/kendo-jquery.service";
const defaultValidatorNamespace = {
    rules: {},
    messages: {},
    allowSubmit: $.noop,
    validateOnInit: $.noop,
    ruleResolvers: {},
    messageLocators: {}
};
let validatorNamespace = defaultValidatorNamespace;
export function setValidatorNamespace(next) {
    validatorNamespace = next || defaultValidatorNamespace;
    return ensureValidatorNamespace();
}
export function getValidatorNamespace() {
    return ensureValidatorNamespace();
}
export function ensureValidatorNamespace() {
    validatorNamespace.rules = validatorNamespace.rules || {};
    validatorNamespace.messages = validatorNamespace.messages || {};
    validatorNamespace.allowSubmit = validatorNamespace.allowSubmit || $.noop;
    validatorNamespace.validateOnInit = validatorNamespace.validateOnInit || $.noop;
    validatorNamespace.ruleResolvers = validatorNamespace.ruleResolvers || {};
    validatorNamespace.messageLocators = validatorNamespace.messageLocators || {};
    return validatorNamespace;
}
export function resolveRules(element) {
    const resolvers = getValidatorNamespace().ruleResolvers;
    const rules = {};
    for (const name in resolvers) {
        $.extend(true, rules, resolvers[name].resolve(element));
    }
    return rules;
}
