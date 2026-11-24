import "./kendo.core.js";
import { ClickMoveClick, UserEvents, getTouches, touchDelta } from "./userevents/index.js";

export const __meta__ = {
    id: "userevents",
    name: "User Events",
    category: "framework",
    depends: ["core"],
    hidden: true,
};

const kendo = window.kendo;

kendo.getTouches = getTouches;
kendo.touchDelta = touchDelta;
kendo.UserEvents = UserEvents;
kendo.ClickMoveClick = ClickMoveClick;

export default kendo;
