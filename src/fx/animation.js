import { domUtilsService } from "../core/services/dom-utils.service.js";
import { Class } from "../core/index.js";
import { $ } from "../core/services/kendo-jquery.service.js";
import { TRANSFORM } from "./constants.js";
import { animate } from "./promise.js";
import { extend, normalizeCSS } from "./utils.js";
export class EffectSet extends Class {
    element;
    effects;
    restore;
    constructor(element, options) {
        super();
        if (this.init === EffectSet.prototype.init) {
            this.init(element, options);
        }
    }
    init(element, options) {
        const that = this;
        that.element = element;
        that.effects = [];
        that.options = options;
        that.restore = [];
    }
    run(effects) {
        let effectName;
        let that = this;
        let effect;
        let idx;
        let jdx;
        let length = effects.length;
        let element = that.element;
        let options = that.options;
        let deferred = $.Deferred();
        let start = {};
        let end = {};
        let target;
        let children = [];
        let childrenLength;
        that.effects = effects;
        deferred.done(that.complete.bind(that));
        element.data("animating", true);
        for (idx = 0; idx < length; idx++) {
            effect = effects[idx];
            effect.setReverse(options.reverse);
            effect.setOptions(options);
            that.addRestoreProperties(effect.restore);
            effect.prepare(start, end);
            children = effect.children();
            for (jdx = 0, childrenLength = children.length; jdx < childrenLength; jdx++) {
                children[jdx].duration(options.duration).run();
            }
        }
        // legacy support for options.properties
        for (effectName in options.effects || {}) {
            extend(end, options.effects?.[effectName]?.properties || {});
        }
        // Show the element initially
        if (!element.is(":visible")) {
            extend(start, {
                display: element.data("olddisplay") || "block"
            });
        }
        if (!options.reset) {
            target = element.data("targetTransform");
            if (target) {
                start = extend(target, start);
            }
        }
        start = normalizeCSS(element, start);
        element.css(start).css(TRANSFORM); // Nudge
        for (idx = 0; idx < length; idx++) {
            effects[idx].setup();
        }
        if (options.init) {
            options.init();
        }
        element.data("targetTransform", end);
        animate(element, end, extend({}, options, {
            complete: deferred.resolve
        }));
        return deferred.promise();
    }
    stop() {
        this.element.kendoStop(true, true);
    }
    addRestoreProperties(restore) {
        const element = this.element;
        let value;
        let i = 0;
        const length = restore.length;
        for (; i < length; i++) {
            value = restore[i];
            this.restore.push(value);
            if (!element.data(value)) {
                element.data(value, element.css(value));
            }
        }
    }
    restoreCallback() {
        let i;
        let length;
        const element = this.element;
        for (i = 0, length = this.restore.length; i < length; i++) {
            const value = this.restore[i];
            element.css(value, element.data(value));
        }
    }
    complete() {
        let that = this;
        let idx = 0;
        let element = that.element;
        let options = that.options;
        let effects = that.effects;
        let length = effects.length;
        element.removeData("animating").dequeue(); // call next animation from the queue
        if (options.hide) {
            element.data("olddisplay", element.data("olddisplay") || element.css("display")).hide();
        }
        this.restoreCallback();
        for (; idx < length; idx++) {
            effects[idx].teardown();
        }
        if (options.completeCallback) {
            options.completeCallback(element);
        }
    }
}
EffectSet.applyEnumerablePrototype();
EffectSet.applyPrototypeMembers();
export class Effect extends Class {
    static shouldHide = () => false;
    static setup = $.noop;
    static prepare = $.noop;
    static teardown = $.noop;
    static directions = [];
    element;
    _direction;
    _additionalEffects;
    restore;
    _reverse;
    _duration;
    constructor(element, direction) {
        super();
        if (this.init === Effect.prototype.init) {
            this.init(element, direction);
        }
    }
    init(element, direction) {
        const that = this;
        that.element = element;
        that._direction = direction;
        that.options = {};
        that._additionalEffects = [];
        if (!that.restore) {
            that.restore = [];
        }
    }
    // Public API
    reverse() {
        this._reverse = true;
        return this.run();
    }
    play() {
        this._reverse = false;
        return this.run();
    }
    add(additional) {
        this._additionalEffects.push(additional);
        return this;
    }
    direction(value) {
        this._direction = value;
        return this;
    }
    duration(duration) {
        this._duration = duration;
        return this;
    }
    compositeRun() {
        const that = this;
        const effectSet = new EffectSet(that.element, {
            reverse: that._reverse,
            duration: that._duration
        });
        const effects = that._additionalEffects.concat([that]);
        return effectSet.run(effects);
    }
    run() {
        if (this._additionalEffects && this._additionalEffects[0]) {
            return this.compositeRun();
        }
        let that = this;
        let element = that.element;
        let idx = 0;
        let restore = that.restore;
        let length = restore.length;
        let value;
        let deferred = $.Deferred();
        let start = {};
        let end = {};
        let target;
        let children = that.children();
        let childrenLength = children.length;
        deferred.done(that._complete.bind(that));
        element.data("animating", true);
        for (idx = 0; idx < length; idx++) {
            value = restore[idx];
            if (!element.data(value)) {
                element.data(value, element.css(value));
            }
        }
        for (idx = 0; idx < childrenLength; idx++) {
            children[idx].duration(that._duration).run();
        }
        that.prepare(start, end);
        if (!element.is(":visible")) {
            extend(start, {
                display: element.data("olddisplay") || "block"
            });
        }
        target = element.data("targetTransform");
        if (target) {
            start = extend(target, start);
        }
        start = normalizeCSS(element, start);
        element.css(start).css(TRANSFORM); // Trick webkit into re-rendering
        that.setup();
        element.data("targetTransform", end);
        animate(element, end, {
            duration: that._duration,
            complete: deferred.resolve
        });
        return deferred.promise();
    }
    stop() {
        let idx = 0;
        const children = this.children();
        const childrenLength = children.length;
        for (idx = 0; idx < childrenLength; idx++) {
            children[idx].stop();
        }
        this.element.kendoStop(true, true);
        return this;
    }
    restoreCallback() {
        let i;
        let length;
        const element = this.element;
        for (i = 0, length = this.restore.length; i < length; i++) {
            const value = this.restore[i];
            element.css(value, element.data(value));
        }
    }
    /////////////////////////// Support for kendo.animate;
    setOptions(options) {
        extend(true, this.options, options);
    }
    children() {
        return [];
    }
    setReverse(reverse) {
        this._reverse = reverse;
        return this;
    }
    _complete() {
        let that = this;
        let element = that.element;
        element.removeData("animating").dequeue(); // call next animation from the queue
        that.restoreCallback();
        if (that.shouldHide()) {
            element.data("olddisplay", element.css("display")).hide();
        }
        that.teardown();
    }
}
Effect.prototype.shouldHide = Effect.shouldHide;
Effect.prototype.setup = Effect.setup;
Effect.prototype.prepare = Effect.prepare;
Effect.prototype.teardown = Effect.teardown;
Effect.prototype.directions = Effect.directions;
Effect.applyEnumerablePrototype();
Effect.applyPrototypeMembers();
export class Animation extends Class {
    static tick = $.noop;
    static done = () => false;
    static onEnd = $.noop;
    static onCancel = $.noop;
    _tickProxy;
    _started;
    constructor() {
        super();
        if (this.init === Animation.prototype.init) {
            this.init();
        }
    }
    init() {
        const that = this;
        that._tickProxy = that._tick.bind(that);
        that._started = false;
    }
    start() {
        if (!this.enabled()) {
            return;
        }
        if (!this.done()) {
            this._started = true;
            domUtilsService.animationFrame(this._tickProxy);
        }
        else {
            this.onEnd();
        }
    }
    enabled() {
        return true;
    }
    cancel() {
        this._started = false;
        this.onCancel();
    }
    _tick() {
        const that = this;
        if (!that._started) {
            return;
        }
        that.tick();
        if (!that.done()) {
            domUtilsService.animationFrame(that._tickProxy);
        }
        else {
            that._started = false;
            that.onEnd();
        }
    }
}
Animation.prototype.tick = Animation.tick;
Animation.prototype.done = Animation.done;
Animation.prototype.onEnd = Animation.onEnd;
Animation.prototype.onCancel = Animation.onCancel;
Animation.applyEnumerablePrototype();
Animation.applyPrototypeMembers();
export class Transition extends Animation {
    duration;
    startDate;
    movable;
    axis;
    initial;
    delta;
    static easeOutExpo(t, b, c, d) {
        return t == d ? b + c : c * (-Math.pow(2, (-10 * t) / d) + 1) + b;
    }
    static easeOutBack(t, b, c, d, s) {
        s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    }
    constructor(options) {
        super();
        if (this.init === Transition.prototype.init) {
            this.init(options);
        }
    }
    init(options) {
        const that = this;
        extend(that, options);
        super.init();
    }
    done() {
        return this.timePassed() >= this.duration;
    }
    timePassed() {
        return Math.min(this.duration, Date.now() - this.startDate.getTime());
    }
    moveTo(options) {
        const that = this;
        const movable = that.movable;
        that.initial = movable[that.axis];
        that.delta = options.location - that.initial;
        that.duration = typeof options.duration == "number" ? options.duration : 300;
        that.tick = that._easeProxy(options.ease);
        that.startDate = new Date();
        that.start();
    }
    _easeProxy(ease) {
        const that = this;
        return function () {
            that.movable.moveAxis(that.axis, ease(that.timePassed(), that.initial, that.delta, that.duration));
        };
    }
}
Transition.applyEnumerablePrototype();
Transition.applyPrototypeMembers();
