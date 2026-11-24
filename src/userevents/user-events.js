import { Observable } from "../core/index.js";
import { eventMapService } from "../core/services/event-map.service.js";
import { $ } from "../core/services/kendo-jquery.service.js";
import { utilsService } from "../core/services/utils.service.js";
import { CANCEL, DOUBLETAP, ENABLE_GLOBAL_SURFACE, END, GESTURECHANGE, GESTUREEND, GESTURESTART, GESTURETAP, HOLD, MOVE, PRESS, RELEASE, SELECT, START, TAP, extend, now, support, } from "./constants.js";
import { getTouches, touchDelta, withEachUpEvent } from "./helpers.js";
import { Touch } from "./touch.js";
export let DEFAULT_MIN_HOLD = 800;
export let DEFAULT_THRESHOLD = support.browser.msie ? 5 : 0;
export class UserEvents extends Observable {
    static current = null;
    filter;
    threshold;
    minHold;
    touches;
    _maxTouches;
    allowSelection;
    captureUpIfMoved;
    useClickAsTap;
    eventNS;
    _clicks;
    supportDoubleTap;
    element;
    surface;
    stopPropagation;
    preventDefault;
    pressed;
    currentTarget;
    _destroyed;
    _shouldNotMove;
    static defaultThreshold(value) {
        DEFAULT_THRESHOLD = value;
    }
    static minHold(value) {
        DEFAULT_MIN_HOLD = value;
    }
    constructor(element, options) {
        super();
        if (element && this.init === UserEvents.prototype.init) {
            this.init(element, options);
        }
    }
    init(element, options = {}, ..._args) {
        const that = this;
        const ns = utilsService.guid();
        const filter = that.filter = options.filter;
        const wrappedElement = $(element).handler(that);
        super.init();
        that.threshold = options.threshold || DEFAULT_THRESHOLD;
        that.minHold = options.minHold || DEFAULT_MIN_HOLD;
        that.touches = [];
        that._maxTouches = options.multiTouch ? 2 : 1;
        that.allowSelection = options.allowSelection;
        that.captureUpIfMoved = options.captureUpIfMoved;
        that.useClickAsTap = !options.fastTap && !support.delayedClick();
        that.eventNS = ns;
        that._clicks = 0;
        that.supportDoubleTap = options.supportDoubleTap;
        extend(that, {
            element: wrappedElement,
            surface: options.global && ENABLE_GLOBAL_SURFACE ? $(wrappedElement[0].ownerDocument.documentElement) : $(options.surface || wrappedElement),
            stopPropagation: options.stopPropagation,
            preventDefault: options.preventDefault,
            pressed: false,
        });
        that.surface.handler(that).on(eventMapService.applyEventMap("move", ns), "_move").on(eventMapService.applyEventMap("up cancel", ns), "_end");
        wrappedElement.on(eventMapService.applyEventMap("down", ns), filter, "_start");
        if (that.useClickAsTap) {
            wrappedElement.on(eventMapService.applyEventMap("click", ns), filter, "_click");
        }
        if (support.pointers || support.msPointers) {
            if (support.browser.version < 11) {
                const defaultAction = "pinch-zoom double-tap-zoom";
                wrappedElement.css("-ms-touch-action", options.touchAction && options.touchAction != "none" ? `${defaultAction} ${options.touchAction}` : defaultAction);
            }
            else {
                wrappedElement.css("touch-action", options.touchAction || "none");
            }
        }
        if (options.preventDragEvent) {
            wrappedElement.on(eventMapService.applyEventMap("dragstart", ns), (e) => e.preventDefault());
        }
        wrappedElement.on(eventMapService.applyEventMap("mousedown", ns), filter, { root: wrappedElement }, "_select");
        if (that.captureUpIfMoved && support.eventCapture) {
            const surfaceElement = that.surface[0];
            const preventIfMovingProxy = that.preventIfMoving.bind(that);
            withEachUpEvent(function (eventName) {
                surfaceElement.addEventListener(eventName, preventIfMovingProxy, true);
            });
        }
        that.bind([PRESS, HOLD, TAP, DOUBLETAP, START, MOVE, END, RELEASE, CANCEL, GESTURESTART, GESTURECHANGE, GESTUREEND, GESTURETAP, SELECT], options);
    }
    preventIfMoving(e) {
        if (this._isMoved()) {
            e.preventDefault();
        }
    }
    destroy() {
        const that = this;
        if (that._destroyed) {
            return;
        }
        that._destroyed = true;
        if (that.captureUpIfMoved && support.eventCapture) {
            const surfaceElement = that.surface[0];
            withEachUpEvent(function (eventName) {
                surfaceElement.removeEventListener(eventName, that.preventIfMoving);
            });
        }
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
        UserEvents.current = this;
    }
    cancel() {
        this._disposeAll();
        this.trigger(CANCEL);
    }
    notify(eventName, data) {
        const touches = this.touches;
        if (this._isMultiTouch()) {
            switch (eventName) {
                case MOVE:
                    eventName = GESTURECHANGE;
                    break;
                case END:
                    eventName = GESTUREEND;
                    break;
                case TAP:
                    eventName = GESTURETAP;
                    break;
            }
            extend(data, { touches: touches }, touchDelta(touches[0], touches[1]));
        }
        return this.trigger(eventName, extend(data, { type: eventName }));
    }
    press(x, y, target) {
        this._apiCall("_start", x, y, target);
    }
    move(x, y) {
        this._apiCall("_move", x, y);
    }
    end(x, y) {
        this._apiCall("_end", x, y);
    }
    _isMultiTouch() {
        return this.touches.length > 1;
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
    _isMoved() {
        return $.grep(this.touches, function (touch) {
            return touch.isMoved();
        }).length;
    }
    _select(e) {
        if (!this.allowSelection || this.trigger(SELECT, { event: e })) {
            e.preventDefault();
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
        UserEvents.current = null;
        that.currentTarget = e.currentTarget;
        if (that.preventDefault) {
            e.preventDefault();
        }
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
            if (that._isMultiTouch()) {
                that.notify("gesturestart", {});
            }
        }
    }
    _move(e) {
        this._eachTouch("move", e);
    }
    _end(e) {
        this._eachTouch("end", e);
    }
    _click(e) {
        const currentTarget = e.currentTarget ?? e.target;
        const data = {
            touch: {
                initialTouch: e.target,
                target: $(currentTarget),
                endTime: now(),
                x: {
                    location: e.pageX,
                    client: e.clientX,
                },
                y: {
                    location: e.pageY,
                    client: e.clientY,
                },
            },
            x: e.pageX,
            y: e.pageY,
            target: $(currentTarget),
            event: e,
            type: "tap",
        };
        if (this.trigger("tap", data)) {
            e.preventDefault();
        }
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
                matchingTouch[methodName](touchInfo);
            }
        }
    }
    _apiCall(type, x, y, target) {
        this[type]({
            api: true,
            type,
            pageX: x,
            pageY: y,
            clientX: x,
            clientY: y,
            screenX: x,
            screenY: y,
            target: $(target || this.element)[0] ?? null,
            currentTarget: $(target || this.element)[0] ?? null,
            stopPropagation: $.noop,
            preventDefault: $.noop,
        });
    }
}
UserEvents.applyEnumerablePrototype();
UserEvents.applyPrototypeMembers();
