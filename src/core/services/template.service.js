import { formatterService } from "./formatter.service";
// Regex patterns for template parsing
const argumentNameRegExp = /^\w+/;
const paramNameRegExp = /^\w+(?:\.[\p{ID_Start}$_][\p{ID_Continue}$\u200C\u200D]*|\[(?:'(?:[^'\\\r\n\u2028\u2029]|\\[^\r\n\u2028\u2029])*'|"(?:[^"\\\r\n\u2028\u2029]|\\[^\r\n\u2028\u2029])*"|\d+)\])*$/u;
const encodeRegExp = /\$\{([^}]*)\}/g;
const escapedCurlyRegExp = /\\\}/g;
const curlyRegExp = /__CURLY__/g;
const escapedSharpRegExp = /\\#/g;
const sharpRegExp = /__SHARP__/g;
/**
 * Compile a template part (either string literal or code)
 */
function compilePart(part, stringPart) {
    if (stringPart) {
        return "'" +
            part.split("'").join("\\'")
                .split('\\"').join('\\\\\\"')
                .replace(/\n/g, "\\n")
                .replace(/\r/g, "\\r")
                .replace(/\t/g, "\\t") + "'";
    }
    else {
        const first = part.charAt(0);
        const rest = part.substring(1);
        if (first === "=") {
            return "+(" + rest + ")+";
        }
        else if (first === ":") {
            return "+$kendoHtmlEncode(" + rest + ")+";
        }
        else {
            return ";" + part + ";$kendoOutput+=";
        }
    }
}
/**
 * Template service for compiling and rendering Kendo UI templates
 *
 * Supports the legacy Kendo template syntax:
 * - #= expression # - Output expression result
 * - #: expression # - Output HTML-encoded expression result
 * - # code # - Execute JavaScript code
 */
class Template {
    static paramName = "data";
    static useWithBlock = true;
    static debugTemplates = false;
    static setDebugMode(enabled) {
        Template.debugTemplates = enabled;
    }
    static render(template, data) {
        let html = "";
        for (let idx = 0; idx < data.length; idx++) {
            html += template(data[idx]);
        }
        return html;
    }
    static compile(template, options) {
        if (typeof template === "function") {
            return template;
        }
        const settings = {
            paramName: options?.paramName !== undefined ? options.paramName : Template.paramName,
            useWithBlock: options?.useWithBlock !== undefined ? options.useWithBlock : Template.useWithBlock
        };
        const paramName = settings.paramName;
        if (typeof paramName !== "string" || !paramNameRegExp.test(paramName)) {
            throw new Error(formatterService.format("Invalid template paramName:'{0}'", paramName));
        }
        const argumentName = paramName.match(argumentNameRegExp)[0];
        const useWithBlock = settings.useWithBlock;
        let functionBody = "var $kendoOutput, $kendoHtmlEncode = kendo.htmlEncode;";
        functionBody += useWithBlock ? "with(" + paramName + "){" : "";
        functionBody += "$kendoOutput=";
        const parts = template
            .replace(escapedCurlyRegExp, "__CURLY__")
            .replace(encodeRegExp, "#=$kendoHtmlEncode($1)#")
            .replace(curlyRegExp, "}")
            .replace(escapedSharpRegExp, "__SHARP__")
            .split("#");
        for (let idx = 0; idx < parts.length; idx++) {
            functionBody += compilePart(parts[idx], idx % 2 === 0);
        }
        functionBody += useWithBlock ? ";}" : ";";
        functionBody += "return $kendoOutput;";
        functionBody = functionBody.replace(sharpRegExp, "#");
        try {
            // Function evaluation required for legacy Kendo Template syntax (non-CSP compliant)
            const fn = new Function(argumentName, functionBody);
            fn._slotCount = Math.floor(parts.length / 2);
            return fn;
        }
        catch (e) {
            if (Template.debugTemplates) {
                console.warn(`Invalid template:'${template}' Generated code:'${functionBody}'`);
                return (() => "");
            }
            else {
                throw new Error(formatterService.format("Invalid template:'{0}' Generated code:'{1}'", template, functionBody));
            }
        }
    }
}
export { Template };
export const templateService = Template;
