/**
 * Mouse Event Normalizer Service
 * Handles mouse event capturing and muting for touch/pointer event normalization.
 *
 * @module core-v2/services/mouse-event-normalizer.service
 */
/**
 * Mouse event normalizer service for handling touch/mouse event conflicts.
 * Prevents ghost clicks and normalizes touch events to mouse events.
 */
export class MouseEventNormalizerService {
    constructor($, support) {
        this.$ = $;
        this.support = support;
        /**
         * Whether the mouse trap has been set up
         */
        this.mouseTrap = false;
        /**
         * Whether click events should be busted (prevented)
         */
        this.bustClick = false;
        /**
         * Whether mouse events are currently being captured/muted
         */
        this.captureMouse = false;
        /**
         * List of mouse events to capture
         */
        this.MOUSE_EVENTS = ["mousedown", "mousemove", "mouseenter", "mouseleave", "mouseover", "mouseout", "mouseup", "click"];
        /**
         * Selector for elements that should not have click busting
         */
        this.EXCLUDE_BUST_CLICK_SELECTOR = "label, input, [data-rel=external]";
    }
    /**
     * Set up mouse event capturing to prevent ghost clicks from touch events.
     * This sets up event listeners on document.documentElement to intercept
     * and optionally stop mouse events when touch events are active.
     */
    setupMouseMute() {
        let idx = 0;
        const length = this.MOUSE_EVENTS.length;
        const element = document.documentElement;
        if (this.mouseTrap || !this.support.eventCapture) {
            return;
        }
        this.mouseTrap = true;
        this.bustClick = false;
        this.captureMouse = false;
        const self = this;
        const handler = function (e) {
            if (self.captureMouse) {
                if (e.type === "click") {
                    if (self.bustClick && !self.$(e.target).is(self.EXCLUDE_BUST_CLICK_SELECTOR)) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                }
                else {
                    e.stopPropagation();
                }
            }
        };
        for (; idx < length; idx++) {
            element.addEventListener(this.MOUSE_EVENTS[idx], handler, true);
        }
    }
    /**
     * Mute mouse events. Called on touchstart to prevent ghost clicks.
     * @param e - The jQuery event with bustClick data
     */
    muteMouse(e) {
        var _a;
        this.captureMouse = true;
        if ((_a = e.data) === null || _a === void 0 ? void 0 : _a.bustClick) {
            this.bustClick = true;
        }
        clearTimeout(this.mouseTrapTimeoutID);
    }
    /**
     * Unmute mouse events. Called on touchend after a delay to allow
     * legitimate mouse events through again.
     */
    unMuteMouse() {
        clearTimeout(this.mouseTrapTimeoutID);
        this.mouseTrapTimeoutID = setTimeout(() => {
            this.captureMouse = false;
            this.bustClick = false;
        }, 400);
    }
}
