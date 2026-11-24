import "./kendo.core.js";
import "./kendo.userevents.js";

import { Touch } from "./touch/index.js";
import { widgetRegistryService } from "./core/services/widget-registry.service.js";

export const __meta__ = {
    id: "touch",
    name: "Touch",
    category: "mobile",
    description: "The kendo Touch widget provides a cross-platform compatible API for handling user-initiated touch events, multi-touch gestures and event sequences (drag, swipe, etc.). ",
    depends: ["core", "userevents"],
};

const kendo = window.kendo;
widgetRegistryService.register(Touch);
export { Touch };
export default kendo;
