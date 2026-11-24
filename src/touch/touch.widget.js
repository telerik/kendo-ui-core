import { Widget } from "../core/base/widget.js";
import { notifyService } from "../core/services/notify.service.js";
import { UserEvents } from "../userevents/user-events.js";
import { touchDelta } from "../userevents/helpers.js";
const abs = Math.abs;
const MAX_DOUBLE_TAP_DISTANCE = 20;
const TOUCH_EVENTS = ["touchstart", "dragstart", "drag", "dragend", "tap", "doubletap", "hold", "swipe", "gesturestart", "gesturechange", "gestureend"];
const TOUCH_TRIGGER_EVENTS = ["touchstart", "dragstart", "drag", "dragend", "tap", "doubletap", "hold"];
const TOUCH_GESTURE_EVENTS = ["gesturestart", "gesturechange", "gestureend"];
export class Touch extends Widget {
    static options = {
        name: "Touch",
        surface: null,
        global: false,
        fastTap: false,
        filter: null,
        multiTouch: false,
        enableSwipe: false,
        minXDelta: 30,
        maxYDelta: 20,
        maxDuration: 1000,
        minHold: 800,
        doubleTapTimeout: 800,
    };
    static prototypeMembers = {
        events: [...TOUCH_EVENTS],
        lastTap: null,
    };
    init(element, options) {
        const that = this;
        super.init(element, options);
        options = that.options;
        element = that.element;
        that.wrapper = element;
        function eventProxy(name) {
            return function (e) {
                that._triggerTouch(name, e);
            };
        }
        function gestureEventProxy(name) {
            return function (e) {
                that.trigger(name, {
                    touches: e.touches,
                    distance: e.distance,
                    center: e.center,
                    event: e.event,
                });
            };
        }
        that.userEvents = new UserEvents(element, {
            filter: options.filter || undefined,
            surface: options.surface || undefined,
            minHold: options.minHold,
            multiTouch: options.multiTouch,
            allowSelection: true,
            fastTap: options.fastTap,
            press: eventProxy("touchstart"),
            hold: eventProxy("hold"),
            tap: that._tap.bind(that),
            gesturestart: gestureEventProxy("gesturestart"),
            gesturechange: gestureEventProxy("gesturechange"),
            gestureend: gestureEventProxy("gestureend"),
        });
        Reflect.set(that, "events", that.userEvents);
        if (options.enableSwipe) {
            that.userEvents.bind("start", function (e) {
                that._swipestart(e);
            });
            that.userEvents.bind("move", function (e) {
                that._swipemove(e);
            });
        }
        else {
            that.userEvents.bind("start", function (e) {
                that._dragstart(e);
            });
            that.userEvents.bind("move", function (e) {
                that._triggerTouch("drag", e);
            });
            that.userEvents.bind("end", function (e) {
                that._triggerTouch("dragend", e);
            });
        }
        notifyService.notify(that);
        that.endInit();
    }
    cancel() {
        this.userEvents.cancel();
    }
    destroy() {
        super.destroy();
        this.userEvents.destroy();
    }
    _triggerTouch(type, e) {
        if (this.trigger(type, {
            touch: e.touch,
            event: e.event,
        })) {
            e.preventDefault();
        }
    }
    _tap(e) {
        const that = this;
        const lastTap = that.lastTap;
        const touch = e.touch;
        const currentEndTime = touch.endTime ?? Number.NaN;
        const lastEndTime = lastTap?.endTime ?? Number.NaN;
        const doubleTapTimeout = that.options.doubleTapTimeout ?? 800;
        if (lastTap && currentEndTime - lastEndTime < doubleTapTimeout && touchDelta(touch, lastTap).distance < MAX_DOUBLE_TAP_DISTANCE) {
            that._triggerTouch("doubletap", e);
            that.lastTap = null;
        }
        else {
            that._triggerTouch("tap", e);
            that.lastTap = touch;
        }
    }
    _dragstart(e) {
        this._triggerTouch("dragstart", e);
    }
    _swipestart(e) {
        if (abs(e.x.velocity) * 2 >= abs(e.y.velocity)) {
            e.sender.capture();
        }
    }
    _swipemove(e) {
        const that = this;
        const options = that.options;
        const touch = e.touch;
        const duration = touch.startTime === undefined ? Number.NaN : e.event.timeStamp - touch.startTime;
        const direction = touch.x.initialDelta > 0 ? "right" : "left";
        const minXDelta = options.minXDelta ?? 30;
        const maxYDelta = options.maxYDelta ?? 20;
        const maxDuration = options.maxDuration ?? 1000;
        if (abs(touch.x.initialDelta) >= minXDelta && abs(touch.y.initialDelta) < maxYDelta && duration < maxDuration) {
            that.trigger("swipe", {
                direction: direction,
                touch: e.touch,
            });
            touch.cancel();
        }
    }
}
Touch.applyEnumerablePrototype();
Touch.applyPrototypeMembers();
