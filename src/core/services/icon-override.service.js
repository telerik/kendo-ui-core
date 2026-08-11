class IconService {
    constructor() {
        this.overrides = {};
        this._hasOverrides = false;
        this.registry = new WeakMap();
        this._tokenCounter = 0;
        this._activeContexts = new Map();
        this._contextOrder = [];
    }
    setIcons(dictionary) {
        const keys = Object.keys(dictionary);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const value = dictionary[key];
            if (typeof value === "string" || this.isSVGIcon(value)) {
                this.overrides[key] = value;
            }
            else if (typeof value === "object" && value !== null) {
                if (!this.overrides[key] || this.isSVGIcon(this.overrides[key]) || typeof this.overrides[key] === "string") {
                    this.overrides[key] = {};
                }
                const iconNames = Object.keys(value);
                for (let j = 0; j < iconNames.length; j++) {
                    this.overrides[key][iconNames[j]] = value[iconNames[j]];
                }
            }
        }
        this._hasOverrides = true;
    }
    beginInit(componentName, element) {
        const token = ++this._tokenCounter;
        this._activeContexts.set(token, componentName);
        this._contextOrder.push(token);
        if (element) {
            this.registerElement(element, componentName);
        }
        return token;
    }
    registerElement(element, componentName) {
        const rootToken = this._contextOrder.length > 0 ? this._contextOrder[0] : null;
        const rootName = rootToken !== null ? this._activeContexts.get(rootToken) : componentName;
        this.registry.set(element, {
            root: rootName,
            self: componentName
        });
    }
    finalizeContext(token) {
        this._activeContexts.delete(token);
        const idx = this._contextOrder.indexOf(token);
        if (idx !== -1) {
            this._contextOrder.splice(idx, 1);
        }
    }
    resolve(iconName, context) {
        if (!this._hasOverrides) {
            return null;
        }
        let names;
        if (this._contextOrder.length > 0) {
            names = [];
            for (let i = 0; i < this._contextOrder.length; i++) {
                names.push(this._activeContexts.get(this._contextOrder[i]));
            }
        }
        else if (context) {
            const ctx = this.registry.get(context) || this._findAncestorContext(context);
            if (ctx) {
                names = ctx.root !== ctx.self ? [ctx.root, ctx.self] : [ctx.root];
            }
        }
        if (names) {
            for (let i = 0; i < names.length; i++) {
                const ov = this.overrides[names[i]];
                if (ov && !this.isSVGIcon(ov) && typeof ov !== "string") {
                    const icon = ov[iconName];
                    if (icon) {
                        return icon;
                    }
                }
            }
        }
        const globalOv = this.overrides[iconName];
        if (globalOv && (this.isSVGIcon(globalOv) || typeof globalOv === "string")) {
            return globalOv;
        }
        return null;
    }
    reset() {
        this.overrides = {};
        this._hasOverrides = false;
        this._activeContexts.clear();
        this._contextOrder = [];
        this._tokenCounter = 0;
    }
    _findAncestorContext(element) {
        let current = element.parentElement;
        while (current) {
            const ctx = this.registry.get(current);
            if (ctx) {
                return ctx;
            }
            current = current.parentElement;
        }
        return undefined;
    }
    isSVGIcon(value) {
        return typeof value === "object" &&
            value !== null &&
            "name" in value &&
            "viewBox" in value &&
            "content" in value;
    }
}
export const iconService = new IconService();
