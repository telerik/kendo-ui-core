import { Class } from "../core/index.js";
import { $ } from "../core/services/kendo-jquery.service.js";
import { CLICK_DELAY, DOUBLETAP, END, HOLD, MOVE, PRESS, RELEASE, START, TAP, extend, now, } from "./constants.js";
import { TouchAxis } from "./touch-axis.js";
import { UserEvents } from "./user-events.js";
const THRESHOLD = {
    api: 0,
    touch: 0,
    mouse: 9,
    pointer: 9,
};
export class Touch extends Class {
    x;
    y;
    type;
    useClickAsTap;
    threshold;
    userEvents;
    target;
    currentTarget;
    initialTouch;
    id;
    pressEvent;
    _clicks;
    supportDoubleTap;
    _moved = false;
    _finished = false;
    _holdTimeout;
    _clickTimeout;
    startTime;
    endTime;
    constructor(userEvents, target, touchInfo) {
        super();
        if (userEvents && target && touchInfo && this.init === Touch.prototype.init) {
            this.init(userEvents, target, touchInfo);
        }
    }
    init(userEvents, target, touchInfo, ..._args) {
        extend(this, {
            x: new TouchAxis("X", touchInfo.location),
            y: new TouchAxis("Y", touchInfo.location),
            type: touchInfo.type,
            useClickAsTap: userEvents.useClickAsTap,
            threshold: userEvents.threshold || THRESHOLD[touchInfo.type],
            userEvents: userEvents,
            target: target,
            currentTarget: touchInfo.currentTarget,
            initialTouch: touchInfo.target,
            id: touchInfo.id,
            pressEvent: touchInfo,
            _clicks: userEvents._clicks,
            supportDoubleTap: userEvents.supportDoubleTap,
            _moved: false,
            _finished: false,
        });
    }
    press() {
        this._holdTimeout = setTimeout(this._hold.bind(this), this.userEvents.minHold);
        this._trigger(PRESS, this.pressEvent);
    }
    move(touchInfo) {
        const that = this;
        const preventMove = touchInfo.type !== "api" && that.userEvents._shouldNotMove;
        if (that._finished || preventMove) {
            return;
        }
        that.x.move(touchInfo.location);
        that.y.move(touchInfo.location);
        if (!that._moved) {
            if (that._withinIgnoreThreshold()) {
                return;
            }
            if (!UserEvents.current || UserEvents.current === that.userEvents) {
                that._start(touchInfo);
            }
            else {
                that.dispose();
                return;
            }
        }
        if (!that._finished) {
            that._trigger(MOVE, touchInfo);
        }
    }
    end(touchInfo) {
        this.endTime = now();
        if (this._finished) {
            return;
        }
        this._finished = true;
        this._trigger(RELEASE, touchInfo);
        if (this._moved) {
            this._trigger(END, touchInfo);
        }
        else if (!this.useClickAsTap) {
            if (this.supportDoubleTap) {
                this._tap(touchInfo);
            }
            else {
                this._trigger(TAP, touchInfo);
            }
        }
        clearTimeout(this._holdTimeout);
        this.dispose();
    }
    dispose() {
        const activeTouches = this.userEvents.touches;
        this._finished = true;
        this.pressEvent = undefined;
        clearTimeout(this._holdTimeout);
        activeTouches.splice($.inArray(this, activeTouches), 1);
    }
    skip() {
        this.dispose();
    }
    cancel() {
        this.dispose();
    }
    isMoved() {
        return this._moved;
    }
    _tap(touchInfo) {
        const that = this;
        that.userEvents._clicks++;
        if (that.userEvents._clicks == 1) {
            that._clickTimeout = setTimeout(function () {
                if (that.userEvents._clicks == 1) {
                    that._trigger(TAP, touchInfo);
                }
                else {
                    that._trigger(DOUBLETAP, touchInfo);
                }
                that.userEvents._clicks = 0;
            }, CLICK_DELAY);
        }
    }
    _hold() {
        this._trigger(HOLD, this.pressEvent);
    }
    _start(touchInfo) {
        clearTimeout(this._holdTimeout);
        this.startTime = now();
        this._moved = true;
        this._trigger(START, touchInfo);
    }
    _trigger(name, touchInfo) {
        const that = this;
        const jQueryEvent = "event" in touchInfo ? touchInfo.event : undefined;
        const data = {
            touch: that,
            x: that.x,
            y: that.y,
            target: that.target,
            event: jQueryEvent,
        };
        if (that.userEvents.notify(name, data)) {
            jQueryEvent.preventDefault();
        }
    }
    _withinIgnoreThreshold() {
        const xDelta = this.x.initialDelta;
        const yDelta = this.y.initialDelta;
        return Math.sqrt(xDelta * xDelta + yDelta * yDelta) <= this.threshold;
    }
}
Touch.applyEnumerablePrototype();
Touch.applyPrototypeMembers();
