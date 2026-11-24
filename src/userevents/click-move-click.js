import { Observable } from "../core/index.js";
import { eventMapService } from "../core/services/event-map.service.js";
import { $ } from "../core/services/kendo-jquery.service.js";
import { utilsService } from "../core/services/utils.service.js";
import { CANCEL, CLICK_DELAY, ENABLE_GLOBAL_SURFACE, END, HOLD, MOVE, SELECT, START, extend, } from "./constants.js";
import { getTouches } from "./helpers.js";
import { Touch } from "./touch.js";
export class ClickMoveClick extends Observable {
    static current = null;
    filter;
    touches;
    _maxTouches;
    eventNS;
    _downStarted;
    element;
    surface;
    stopPropagation;
    pressed;
    _destroyed;
    currentTarget;
    _preventCancel;
    _downTarget;
    _clicks = 0;
    useClickAsTap;
    threshold;
    minHold;
    supportDoubleTap;
    _shouldNotMove;
    constructor(element, options) {
        super();
        if (element && this.init === ClickMoveClick.prototype.init) {
            this.init(element, options);
        }
    }
    init(element, options = {}, ..._args) {
        const that = this;
        const ns = utilsService.guid();
        const filter = that.filter = options.filter;
        const wrappedElement = $(element).handler(that);
        super.init();
        that.touches = [];
        that._maxTouches = 1;
        that.eventNS = ns;
        that._downStarted = 0;
        extend(that, {
            element: wrappedElement,
            surface: options.global && ENABLE_GLOBAL_SURFACE ? $(wrappedElement[0].ownerDocument.documentElement) : $(options.surface || wrappedElement),
            stopPropagation: options.stopPropagation,
            pressed: false,
        });
        that.surface.handler(that).on(eventMapService.applyEventMap("move", ns), "_move").on(eventMapService.applyEventMap("up", ns), "_surfaceUp").on(eventMapService.applyEventMap("cancel", ns), "cancel");
        wrappedElement.on(eventMapService.applyEventMap("down", ns), filter, "_down").on(eventMapService.applyEventMap("up", ns), filter, "_up");
        that.bind([START, MOVE, END, HOLD, CANCEL, SELECT], options);
    }
    destroy() {
        const that = this;
        if (that._destroyed) {
            return;
        }
        that._destroyed = true;
        that.element.kendoDestroy(that.eventNS);
        that.surface.kendoDestroy(that.eventNS);
        that.element.removeData("handler");
        that.surface.removeData("handler");
        that._disposeAll();
        that.unbind();
        delete that.surface;
        delete that.element;
        delete that.currentTarget;
    }
    capture() {
        ClickMoveClick.current = this;
    }
    cancel() {
        if (this._preventCancel) {
            this._preventCancel = false;
        }
        else if (this.touches.length > 0) {
            this._disposeAll();
            this.trigger(CANCEL);
        }
    }
    notify(eventName, data) {
        data.clickMoveClick = true;
        return this.trigger(eventName, extend(data, { type: eventName }));
    }
    _down(e) {
        if (e.which && e.which > 1) {
            this.cancel();
        }
        else {
            this._downStarted = new Date().getTime();
            this._downTarget = e.target;
        }
    }
    _up(e) {
        const currentMilestone = new Date().getTime();
        const currentTarget = e.target;
        if ((!e.which || e.which === 1) && currentMilestone < this._downStarted + CLICK_DELAY && currentTarget === this._downTarget) {
            if (this.touches.length > 0) {
                this._end(e);
            }
            else {
                this._start(e);
            }
            this._preventCancel = true;
        }
        else {
            this.cancel();
        }
        this._downStarted = 0;
        this._downTarget = null;
    }
    _surfaceUp(e) {
        const type = e.type;
        if (type === "touchcancel" || type === "pointercancel" || type === "pointerleave" || type === "mouseleave") {
            return;
        }
        if (e.which && e.which > 1) {
            return;
        }
        if (this._preventCancel) {
            this._preventCancel = false;
            return;
        }
        if (this.touches.length > 0) {
            this._end(e);
        }
    }
    _maxTouchesReached() {
        return this.touches.length >= this._maxTouches;
    }
    _disposeAll() {
        const touches = this.touches;
        while (touches.length > 0) {
            const touch = touches.pop();
            touch?.dispose();
        }
    }
    _start(e) {
        const that = this;
        let idx = 0;
        const filter = that.filter;
        const touches = getTouches(e);
        const which = e.which;
        if ((which && which > 1) || that._maxTouchesReached()) {
            return;
        }
        ClickMoveClick.current = null;
        that.currentTarget = e.currentTarget;
        if (that.stopPropagation) {
            e.stopPropagation();
        }
        for (; idx < touches.length; idx++) {
            if (that._maxTouchesReached()) {
                break;
            }
            const touchInfo = touches[idx];
            const target = filter ? $(touchInfo.currentTarget) : that.element;
            if (!target.length) {
                continue;
            }
            const touch = new Touch(that, target, touchInfo);
            that.touches.push(touch);
            touch.press();
            touch._start(touch);
        }
    }
    _move(e) {
        this._eachTouch("move", e);
    }
    _end(e) {
        this._eachTouch("move", e);
        this._eachTouch("end", e);
    }
    _eachTouch(methodName, e) {
        const dict = {};
        const touches = getTouches(e);
        for (const activeTouch of this.touches) {
            dict[activeTouch.id] = activeTouch;
        }
        for (const touchInfo of touches) {
            const matchingTouch = dict[touchInfo.id];
            if (matchingTouch) {
                matchingTouch.x.move(touchInfo.location);
                matchingTouch.y.move(touchInfo.location);
                matchingTouch[methodName](touchInfo);
            }
        }
    }
}
ClickMoveClick.applyEnumerablePrototype();
ClickMoveClick.applyPrototypeMembers();
