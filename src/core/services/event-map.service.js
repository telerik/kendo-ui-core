/**
 * Event Map Service
 * Provides cross-browser event mapping for touch, pointer, and mouse events.
 *
 * @module core-v2/services/event-map.service
 */
/**
 * Event map service for cross-browser event handling.
 * Maps abstract event names (down, move, up, cancel) to the appropriate
 * browser-specific events based on touch/pointer/mouse support.
 */
export class EventMapService {
    constructor($, support) {
        this.$ = $;
        this.support = support;
        /**
         * Regex for matching event names in a string
         */
        this.eventRegEx = /([^ ]+)/g;
        this.eventMap = this.buildEventMap();
        this.setupMSPointerEvents();
    }
    /**
     * Build the event map based on browser capabilities
     */
    buildEventMap() {
        // Default: combined touch and mouse events
        let map = {
            down: "touchstart mousedown",
            move: "mousemove touchmove",
            up: "mouseup touchend touchcancel",
            cancel: "mouseleave touchcancel"
        };
        if (this.support.touch && (this.support.mobileOS && (this.support.mobileOS.ios || this.support.mobileOS.android))) {
            // Touch-only devices
            map = {
                down: "touchstart",
                move: "touchmove",
                up: "touchend touchcancel",
                cancel: "touchcancel"
            };
        }
        else if (this.support.pointers) {
            // W3C Pointer Events
            map = {
                down: "pointerdown",
                move: "pointermove",
                up: "pointerup",
                cancel: "pointercancel pointerleave"
            };
        }
        else if (this.support.msPointers) {
            // IE10 MS Pointer Events
            map = {
                down: "MSPointerDown",
                move: "MSPointerMove",
                up: "MSPointerUp",
                cancel: "MSPointerCancel MSPointerLeave"
            };
        }
        return map;
    }
    /**
     * Setup MSPointerEnter/MSPointerLeave events for IE10
     * Creates these events using mouseover/out and event-time checks
     */
    setupMSPointerEvents() {
        if (this.support.msPointers && !("onmspointerenter" in window)) {
            // IE10 - Create MSPointerEnter/MSPointerLeave events
            this.$.each({
                MSPointerEnter: "MSPointerOver",
                MSPointerLeave: "MSPointerOut"
            }, (orig, fix) => {
                this.$.event.special[orig] = {
                    delegateType: fix,
                    bindType: fix,
                    handle: function (event) {
                        let ret;
                        const target = this;
                        const related = event.relatedTarget;
                        const handleObj = event.handleObj;
                        // For mousenter/leave call the handler if related is outside the target.
                        // NB: No relatedTarget if the mouse left/entered the browser window
                        if (!related || (related !== target && !this.$.contains(target, related))) {
                            event.type = handleObj.origType;
                            ret = handleObj.handler.apply(this, arguments);
                            event.type = fix;
                        }
                        return ret;
                    }
                };
            });
        }
    }
    /**
     * Get the mapped event for an abstract event name
     * @param eventName - The abstract event name (down, move, up, cancel) or specific event
     * @returns The browser-specific event(s) or the original event if no mapping exists
     */
    getEventMap(eventName) {
        return this.eventMap[eventName] || eventName;
    }
    /**
     * Get the full event map object
     */
    getFullEventMap() {
        return Object.assign({}, this.eventMap);
    }
    /**
     * Apply event mapping to a space-separated list of events
     * @param events - Space-separated event names to map
     * @param ns - Optional namespace to append to each event
     * @returns The mapped and namespaced events
     */
    applyEventMap(events, ns) {
        events = events.replace(this.eventRegEx, (e) => this.getEventMap(e));
        if (ns) {
            events = events.replace(this.eventRegEx, "$1." + ns);
        }
        return events;
    }
}
