import "./kendo.core.js";

import { widgetRegistryService } from "./core/services/widget-registry.service.js";
import {
    Validator,
    ensureValidatorNamespace,
    getValidatorNamespace,
    setValidatorNamespace
} from "./validator";

export const __meta__ = {
    id: "validator",
    name: "Validator",
    category: "web",
    description: "The Validator offers an easy way to do a client-side form validation.",
    depends: ["core"],
};

const kendo = window.kendo;
const existingValidatorNamespace = kendo.ui.validator;

setValidatorNamespace(existingValidatorNamespace);

Object.defineProperty(kendo.ui, "validator", {
    configurable: true,
    enumerable: true,
    get() {
        return getValidatorNamespace();
    },
    set(value) {
        setValidatorNamespace(value);
    }
});

ensureValidatorNamespace();
widgetRegistryService.register(Validator);

export default kendo;
