import { eventMapService } from "../core/services/event-map.service.js";
import { support } from "./constants.js";
export function touchDelta(touch1, touch2) {
    const x1 = touch1.x.location;
    const y1 = touch1.y.location;
    const x2 = touch2.x.location;
    const y2 = touch2.y.location;
    const dx = x1 - x2;
    const dy = y1 - y2;
    return {
        center: {
            x: (x1 + x2) / 2,
            y: (y1 + y2) / 2,
        },
        distance: Math.sqrt(dx * dx + dy * dy),
    };
}
export function getTouches(e) {
    const touches = [];
    const originalEvent = e.originalEvent;
    const currentTarget = e.currentTarget;
    let idx = 0;
    if (e.api) {
        touches.push({
            id: 2,
            event: e,
            target: e.target,
            currentTarget: e.target,
            location: e,
            type: "api",
        });
    }
    else if (e.type.match(/touch/)) {
        const changedTouches = originalEvent && "changedTouches" in originalEvent ? originalEvent.changedTouches ?? [] : [];
        for (; idx < changedTouches.length; idx++) {
            const touch = changedTouches[idx];
            touches.push({
                location: touch,
                event: e,
                target: touch.target,
                currentTarget: currentTarget,
                id: touch.identifier,
                type: "touch",
            });
        }
    }
    else if (support.pointers || support.msPointers) {
        const pointerEvent = originalEvent;
        touches.push({
            location: pointerEvent,
            event: e,
            target: e.target,
            currentTarget: currentTarget,
            id: pointerEvent.pointerId,
            type: "pointer",
        });
    }
    else {
        touches.push({
            id: 1,
            event: e,
            target: e.target,
            currentTarget: currentTarget,
            location: e,
            type: "mouse",
        });
    }
    return touches;
}
export function withEachUpEvent(callback) {
    const downEvents = eventMapService.getFullEventMap().up.split(" ");
    let idx = 0;
    for (; idx < downEvents.length; idx++) {
        callback(downEvents[idx]);
    }
}
