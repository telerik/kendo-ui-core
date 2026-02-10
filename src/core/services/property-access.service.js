/**
 * Property Access Service Implementation
 * Provides utilities for dynamic property access using path expressions.
 
 */
export class PropertyAccessService {
    constructor(utilsService) {
        this.utilsService = utilsService;
        this.getterCache = {};
        this.setterCache = {};
    }
    /**
     * Wrap an expression for safe access.
     * Generates nested null-safe property access.
     */
    wrapExpression(members, paramName) {
        let result = paramName || "d";
        let count = 1;
        for (let idx = 0; idx < members.length; idx++) {
            let member = members[idx];
            if (member !== "") {
                const index = member.indexOf("[");
                if (index !== 0) {
                    if (index === -1) {
                        member = "." + member;
                    }
                    else {
                        count++;
                        member = "." + member.substring(0, index) + " || {})" + member.substring(index);
                    }
                }
                count++;
                result += member + ((idx < members.length - 1) ? " || {})" : ")");
            }
        }
        return new Array(count).join("(") + result;
    }
    /**
     * Generate a JavaScript expression for accessing a property path.
     */
    expr(expression, safe, paramName) {
        expression = expression || "";
        if (typeof safe === "string") {
            paramName = safe;
            safe = false;
        }
        paramName = paramName || "d";
        if (expression && expression.charAt(0) !== "[") {
            expression = "." + expression;
        }
        if (safe) {
            expression = expression.replace(/"([^.]*)\.([^"]*)"/g, '"$1_$DOT$_$2"');
            expression = expression.replace(/'([^.]*)\.([^']*)'/g, "'$1_$DOT$_$2'");
            expression = this.wrapExpression(expression.split("."), paramName);
            expression = expression.replace(/_\$DOT\$_/g, ".");
        }
        else {
            expression = paramName + expression;
        }
        return expression;
    }
    /**
     * Convert an expression to an array of field names.
     */
    exprToArray(expression, safe) {
        expression = expression || "";
        return expression.indexOf(".") >= 0 || expression.indexOf("[") >= 0 ?
            expression.split(/[[\].]/).map(v => v.replace(/["']/g, "")).filter(v => v) :
            expression === "" ? [] : [expression];
    }
    /**
     * Create a getter function for a property path.
     */
    getter(expression, safe) {
        const key = expression + safe;
        if (!this.getterCache[key]) {
            this.getterCache[key] = (obj) => {
                const fields = this.exprToArray(expression, safe);
                let result = obj;
                for (let idx = 0; idx < fields.length; idx++) {
                    result = result[fields[idx]];
                    if (!this.utilsService.isPresent(result) && safe) {
                        return result;
                    }
                }
                return result;
            };
        }
        return this.getterCache[key];
    }
    /**
     * Create a setter function for a property path.
     */
    setter(expression) {
        if (!this.setterCache[expression]) {
            this.setterCache[expression] = (obj, value) => {
                const fields = this.exprToArray(expression);
                const innerSetter = (args) => {
                    if (args.props.length) {
                        args.parent = args.parent[args.props.shift()];
                        innerSetter(args);
                    }
                    else {
                        args.parent[args.prop] = args.val;
                    }
                };
                innerSetter({
                    parent: obj,
                    val: value,
                    prop: fields.pop(),
                    props: fields
                });
            };
        }
        return this.setterCache[expression];
    }
    /**
     * Create an accessor with both get and set functions.
     */
    accessor(expression) {
        return {
            get: this.getter(expression),
            set: this.setter(expression)
        };
    }
}
