import { formatterService } from "./formatter.service";
// Regex patterns for template parsing
const argumentNameRegExp = /^\w+/;
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
class TemplateService {
    constructor() {
        this.paramName = "data";
        this.useWithBlock = true;
        this.debugTemplates = false;
    }
    /**
     * Enable or disable template debugging
     */
    setDebugMode(enabled) {
        this.debugTemplates = enabled;
    }
    /**
     * Render a template with an array of data items
     */
    render(template, data) {
        let html = "";
        for (let idx = 0; idx < data.length; idx++) {
            html += template(data[idx]);
        }
        return html;
    }
    /**
     * Compile a template string into a function
     */
    compile(template, options) {
        // If already a function, return as-is
        if (typeof template === "function") {
            return template;
        }
        // Use options values only if they're not undefined (matches original jQuery extend behavior)
        const settings = {
            paramName: (options === null || options === void 0 ? void 0 : options.paramName) !== undefined ? options.paramName : this.paramName,
            useWithBlock: (options === null || options === void 0 ? void 0 : options.useWithBlock) !== undefined ? options.useWithBlock : this.useWithBlock
        };
        const paramName = settings.paramName;
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
            // This function evaluation is required for legacy support of the Kendo Template syntax - non CSP compliant.
            // NOSONAR - It is a valid security concern, however this is required for backward compatibility
            const fn = new Function(argumentName, functionBody);
            fn._slotCount = Math.floor(parts.length / 2);
            return fn;
        }
        catch (e) {
            if (this.debugTemplates) {
                console.warn(`Invalid template:'${template}' Generated code:'${functionBody}'`);
                // Return a no-op function in debug mode
                //NOSONAR - In debug mode we do not want to throw an error.
                return (() => "");
            }
            else {
                throw new Error(formatterService.format("Invalid template:'{0}' Generated code:'{1}'", template, functionBody));
            }
        }
    }
}
export const templateService = new TemplateService();
