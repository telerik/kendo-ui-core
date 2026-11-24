import { domUtilsService } from "../core/services/dom-utils.service";
import { htmlService } from "../core/services/html.service";
import { $ } from "../core/services/kendo-jquery.service";
import { invalidMsgRegExp } from "./constants";
export const patternMatcher = function (value, pattern) {
    if (typeof pattern === "string") {
        pattern = new RegExp("^(?:" + pattern + ")$");
    }
    return pattern.test(value);
};
export const matcher = function (input, selector, pattern) {
    const value = input.val();
    if (input.filter(selector).length && value !== "") {
        return patternMatcher(Array.isArray(value) ? value.join("") : String(value ?? ""), pattern);
    }
    return true;
};
export const hasAttribute = function (input, name) {
    if (input.length) {
        return input[0].getAttribute(name) != null;
    }
    return false;
};
export function numberOfDecimalDigits(value) {
    const parts = String(value).split(".");
    if (parts.length > 1) {
        return parts[1].length;
    }
    return 0;
}
export function parseHtml(text) {
    if ($.parseHTML) {
        return $($.parseHTML(text));
    }
    return $(text);
}
export function searchForMessageContainer(elements, fieldName) {
    let containers = $();
    let element;
    let attr;
    for (let idx = 0, length = elements.length; idx < length; idx++) {
        element = elements[idx];
        if (invalidMsgRegExp.test(element.className)) {
            attr = element.getAttribute(domUtilsService.attr("for"));
            if (attr === fieldName) {
                containers = containers.add(element);
            }
        }
    }
    return containers;
}
export function isLabelFor(label, element) {
    if (!label) {
        return false;
    }
    if (typeof label.nodeName !== "string" || label.nodeName !== "LABEL") {
        return false;
    }
    if (typeof label.getAttribute("for") !== "string" || typeof element.getAttribute("id") !== "string") {
        return false;
    }
    if (label.getAttribute("for") !== element.getAttribute("id")) {
        return false;
    }
    return true;
}
export const SUMMARYTEMPLATE = (data) => {
    const { errors } = data;
    let result = "<ul>";
    for (let i = 0; i < errors.length; i += 1) {
        result += `<li><a data-field="${htmlService.encode(errors[i].field)}" href="#">${htmlService.encode(errors[i].message)}</a></li>`;
    }
    result += "</ul>";
    return result;
};
