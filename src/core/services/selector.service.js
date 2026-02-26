/**
 * Selector Service Implementation
 * Provides utilities for building CSS selectors.
 
 */
class SelectorService {
    /**
     * Convert space-separated class names to a CSS selector.
     */
    selectorFromClasses(classes) {
        return "." + classes.split(" ").join(".");
    }
    /**
     * Build a role selector for data-role attributes.
     */
    roleSelector(role, ns) {
        return role.replace(/(\S+)/g, "[data-" + ns + "role=$1],").slice(0, -1);
    }
    /**
     * Build a directive selector for mobile components.
     */
    directiveSelector(directives) {
        const selectors = directives.split(" ");
        if (selectors) {
            for (let i = 0; i < selectors.length; i++) {
                if (selectors[i] !== "view") {
                    selectors[i] = selectors[i].replace(/(\w*)(view|bar|strip|over)$/, "$1-$2");
                }
            }
        }
        return selectors.join(" ").replace(/(\S+)/g, "kendo-mobile-$1,").slice(0, -1);
    }
}
export const selectorService = new SelectorService();
