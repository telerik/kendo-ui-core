import { domUtilsService } from "../core/services/dom-utils.service.js";
import { $ } from "../core/services/kendo-jquery.service.js";
import { effectsService } from "../core/services/effects.service.js";
import { AUTO, BACKFACE, BLANK, DEFAULT_PERSPECTIVE, HEIGHT, HIDDEN, ORIGIN, OVERFLOW, PERSPECTIVE, POSITION, PX, TRANSFORM, TRANSFORM_PERSPECTIVE, TRANSITIONEND, WIDTH, round } from "./constants.js";
import { directions } from "./directions.js";
import { Effect } from "./animation.js";
import { animationProperty, box, fillScale, transformOrigin } from "./geometry.js";
import { each, extend, support } from "./utils.js";
export const effects = effectsService.effects;
const effectsRuntime = effects;
const fxElementRuntime = effects.Element.prototype;
const directionMap = directions;
export const fx = function (element) {
    return effectsService.fx(element);
};
const fxRuntime = fx;
export const fxElementPrototype = effects.Element.prototype;
export function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.substring(1);
}
export function createEffect(name, definition) {
    const effectClass = Effect.extend(definition);
    const effectDirections = effectClass.prototype.directions;
    const effectName = capitalize(name);
    effectsService.registerEffect(name, effectClass);
    effectsRuntime[effectName] = effectClass;
    fxRuntime[effectName] = effectClass;
    fxElementRuntime[name] = function (direction, opt1, opt2, opt3) {
        return new effectClass(this.element, direction, opt1, opt2, opt3);
    };
    each(effectDirections, function (_idx, theDirection) {
        fxElementRuntime[name + capitalize(theDirection)] = function (opt1, opt2, opt3) {
            return new effectClass(this.element, theDirection, opt1, opt2, opt3);
        };
    });
}
export const FOUR_DIRECTIONS = ["left", "right", "up", "down"];
export const IN_OUT = ["in", "out"];
createEffect("slideIn", {
    directions: FOUR_DIRECTIONS,
    divisor: function (value) {
        this.options.divisor = value;
        return this;
    },
    prepare: function (start, end) {
        let that = this;
        let tmp;
        let element = that.element;
        let outerWidth = domUtilsService.outerWidth.bind(domUtilsService);
        let outerHeight = domUtilsService.outerHeight.bind(domUtilsService);
        let direction = directionMap[that._direction || "left"];
        let offset = -Number(direction.modifier || 0) * (direction.vertical ? outerHeight(element) : outerWidth(element));
        let startValue = offset / Number(that.options.divisor || 1) + PX;
        let endValue = "0px";
        if (that._reverse) {
            tmp = start;
            start = end;
            end = tmp;
        }
        const transitionProperty = direction.transition || "translatex";
        start[transitionProperty] = startValue;
        end[transitionProperty] = endValue;
    }
});
createEffect("tile", {
    directions: FOUR_DIRECTIONS,
    init: function (element, direction, previous) {
        Effect.prototype.init.call(this, element, direction);
        this.options = {
            previous: previous
        };
    },
    previousDivisor: function (value) {
        this.options.previousDivisor = value;
        return this;
    },
    children: function () {
        const that = this;
        const reverse = that._reverse;
        const previous = that.options.previous;
        const divisor = that.options.previousDivisor || 1;
        const dir = that._direction;
        const current = fx(that.element);
        const children = [current.slideIn(dir || "left").setReverse(Boolean(reverse))];
        if (previous) {
            const prior = fx(previous);
            children.push(prior.slideIn(directionMap[dir || "left"].reverse).divisor(divisor).setReverse(!reverse));
        }
        return children;
    }
});
export function createToggleEffect(name, property, defaultStart, defaultEnd) {
    createEffect(name, {
        directions: IN_OUT,
        startValue: function (value) {
            this._startValue = value;
            return this;
        },
        endValue: function (value) {
            this._endValue = value;
            return this;
        },
        shouldHide: function () {
            return Boolean(this._shouldHide);
        },
        prepare: function (start, end) {
            const that = this;
            let startValue;
            let endValue;
            const out = this._direction === "out";
            const startDataValue = that.element.data(property);
            const startDataValueIsSet = !(isNaN(startDataValue) || startDataValue == defaultStart);
            if (startDataValueIsSet) {
                startValue = startDataValue;
            }
            else if (typeof this._startValue !== "undefined") {
                startValue = this._startValue;
            }
            else {
                startValue = out ? defaultStart : defaultEnd;
            }
            if (typeof this._endValue !== "undefined") {
                endValue = this._endValue;
            }
            else {
                endValue = out ? defaultEnd : defaultStart;
            }
            if (this._reverse) {
                start[property] = endValue;
                end[property] = startValue;
            }
            else {
                start[property] = startValue;
                end[property] = endValue;
            }
            that._shouldHide = end[property] === defaultEnd;
        }
    });
}
createToggleEffect("fade", "opacity", 1, 0);
createToggleEffect("zoom", "scale", 1, 0.01);
createEffect("slideMargin", {
    prepare: function (start, end) {
        const that = this;
        const element = that.element;
        const options = that.options;
        const origin = element.data(ORIGIN);
        const offset = Number(options.offset);
        let margin;
        const reverse = that._reverse;
        if (!reverse && origin === null) {
            element.data(ORIGIN, parseFloat(element.css("margin-" + options.axis)));
        }
        margin = element.data(ORIGIN) || 0;
        end["margin-" + options.axis] = !reverse ? margin + offset : margin;
    }
});
createEffect("slideTo", {
    prepare: function (start, end) {
        let that = this;
        let element = that.element;
        let options = that.options;
        let offset = String(options.offset || "0,0").split(",");
        let reverse = that._reverse;
        end.translatex = !reverse ? offset[0] : 0;
        end.translatey = !reverse ? offset[1] : 0;
        element.css("left");
    }
});
createEffect("expand", {
    directions: ["horizontal", "vertical"],
    restore: [OVERFLOW],
    prepare: function (start, end) {
        const that = this;
        const element = that.element;
        const options = that.options;
        const reverse = that._reverse;
        const property = that._direction === "vertical" ? HEIGHT : WIDTH;
        const propertyKey = property;
        const elementNode = element[0];
        const setLength = propertyKey === HEIGHT ? elementNode.style.height : elementNode.style.width;
        const oldLength = element.data(property);
        let length = parseFloat(oldLength || setLength);
        const measuredLength = propertyKey === HEIGHT ? element.css(propertyKey, AUTO).height() : element.css(propertyKey, AUTO).width();
        const realLength = round(measuredLength || 0);
        start.overflow = HIDDEN;
        length = options && options.reset ? realLength || length : length || realLength;
        end[property] = (reverse ? 0 : length) + PX;
        start[property] = (reverse ? length : 0) + PX;
        if (oldLength === undefined) {
            element.data(property, setLength);
        }
    },
    shouldHide: function () {
        return Boolean(this._reverse);
    },
    teardown: function () {
        const that = this;
        const element = that.element;
        const property = that._direction === "vertical" ? HEIGHT : WIDTH;
        const length = element.data(property);
        if (length == AUTO || length === BLANK) {
            setTimeout(function () {
                element.css(property, AUTO).css(property);
            }, 0); // jQuery animate complete callback in IE is called before the last animation step!
        }
    }
});
export const TRANSFER_START_STATE = {
    position: "absolute",
    marginLeft: 0,
    marginTop: 0,
    scale: 1
};
/**
 * Intersection point formulas are taken from here - http://zonalandeducation.com/mmts/intersections/intersectionOfTwoLines1/intersectionOfTwoLines1.html
 * Formula for a linear function from two points from here - http://demo.activemath.org/ActiveMath2/search/show.cmd?id=mbase://AC_UK_calculus/functions/ex_linear_equation_two_points
 * The transform origin point is the intersection point of the two lines from the top left corners/top right corners of the element and target.
 * The math and variables below MAY BE SIMPLIFIED (zeroes removed), but this would make the formula too cryptic.
 */
createEffect("transfer", {
    init: function (element, target) {
        this.element = element;
        this.options = {
            target: target
        };
        this.restore = [];
    },
    setup: function () {
        this.element.appendTo(document.body);
    },
    prepare: function (start, end) {
        const that = this;
        const element = that.element;
        const outerBox = box(element);
        const innerBox = box(that.options.target || that.element);
        const currentScale = animationProperty(element, "scale");
        const scale = fillScale(innerBox, outerBox);
        const origin = transformOrigin(innerBox, outerBox);
        extend(start, TRANSFER_START_STATE);
        end.scale = 1;
        element.css(TRANSFORM, "scale(1)").css(TRANSFORM);
        element.css(TRANSFORM, "scale(" + currentScale + ")");
        start.top = outerBox.top;
        start.left = outerBox.left;
        start.transformOrigin = origin.x + PX + " " + origin.y + PX;
        if (that._reverse) {
            start.scale = scale;
        }
        else {
            end.scale = scale;
        }
    }
});
export const CLIPS = {
    top: "rect(auto auto $size auto)",
    bottom: "rect($size auto auto auto)",
    left: "rect(auto $size auto auto)",
    right: "rect(auto auto auto $size)"
};
export const ROTATIONS = {
    top: {
        start: "rotatex(0deg)",
        end: "rotatex(180deg)"
    },
    bottom: {
        start: "rotatex(-180deg)",
        end: "rotatex(0deg)"
    },
    left: {
        start: "rotatey(0deg)",
        end: "rotatey(-180deg)"
    },
    right: {
        start: "rotatey(180deg)",
        end: "rotatey(0deg)"
    }
};
export function clipInHalf(container, direction) {
    const vertical = (directionMap[direction] || directionMap.left).vertical;
    const size = ((vertical ? container.height() : container.width()) || 0) / 2 + "px";
    return CLIPS[direction].replace("$size", size);
}
createEffect("turningPage", {
    directions: FOUR_DIRECTIONS,
    init: function (element, direction, container) {
        Effect.prototype.init.call(this, element, direction);
        this._container = container;
    },
    prepare: function (start, end) {
        const that = this;
        const reverse = that._reverse;
        const direction = reverse ? directionMap[that._direction || "left"].reverse : that._direction || "left";
        const rotation = ROTATIONS[direction];
        start.zIndex = 1;
        if (that._clipInHalf) {
            start.clip = clipInHalf(that._container || that.element, directionMap[direction].reverse);
        }
        start[BACKFACE] = HIDDEN;
        end[TRANSFORM] = TRANSFORM_PERSPECTIVE + (reverse ? rotation.start : rotation.end);
        start[TRANSFORM] = TRANSFORM_PERSPECTIVE + (reverse ? rotation.end : rotation.start);
    },
    setup: function () {
        (this._container || this.element.parent()).append(this.element);
    },
    face: function (value) {
        this._face = value;
        return this;
    },
    shouldHide: function () {
        const that = this;
        const reverse = that._reverse;
        const face = that._face;
        return Boolean((reverse && !face) || (!reverse && face));
    },
    clipInHalf: function (value) {
        this._clipInHalf = value;
        return this;
    },
    temporary: function () {
        this.element.addClass("temp-page");
        return this;
    }
});
createEffect("staticPage", {
    directions: FOUR_DIRECTIONS,
    init: function (element, direction, container) {
        Effect.prototype.init.call(this, element, direction);
        this._container = container;
    },
    restore: ["clip"],
    prepare: function (start, end) {
        const that = this;
        const direction = that._reverse ? directionMap[that._direction || "left"].reverse : that._direction || "left";
        start.clip = clipInHalf(that._container || that.element, direction);
        start.opacity = 0.999;
        end.opacity = 1;
    },
    shouldHide: function () {
        const that = this;
        const reverse = that._reverse;
        const face = that._face;
        return Boolean((reverse && !face) || (!reverse && face));
    },
    face: function (value) {
        this._face = value;
        return this;
    }
});
createEffect("pageturn", {
    directions: ["horizontal", "vertical"],
    init: function (element, direction, face, back) {
        Effect.prototype.init.call(this, element, direction);
        this.options = {};
        this.options.face = face;
        this.options.back = back;
    },
    children: function () {
        const that = this;
        const options = that.options;
        let direction = that._direction === "horizontal" ? "left" : "top";
        let reverseDirection = directionMap[direction].reverse;
        const reverse = that._reverse;
        let temp;
        const face = options.face || that.element;
        const back = options.back || that.element;
        const faceClone = face.clone(true).removeAttr("id");
        const backClone = back.clone(true).removeAttr("id");
        const element = that.element;
        if (reverse) {
            temp = direction;
            direction = reverseDirection;
            reverseDirection = temp;
        }
        return [
            fx(face).staticPage(direction, element).face(true).setReverse(Boolean(reverse)),
            fx(back).staticPage(reverseDirection, element).setReverse(Boolean(reverse)),
            fx(faceClone).turningPage(direction, element).face(true).clipInHalf(true).temporary().setReverse(Boolean(reverse)),
            fx(backClone).turningPage(reverseDirection, element).clipInHalf(true).temporary().setReverse(Boolean(reverse))
        ];
    },
    prepare: function (start, end) {
        start[PERSPECTIVE] = DEFAULT_PERSPECTIVE;
        start.transformStyle = "preserve-3d";
        // hack to trigger transition end.
        start.opacity = 0.999;
        end.opacity = 1;
    },
    teardown: function () {
        this.element.find(".temp-page").remove();
    }
});
createEffect("flip", {
    directions: ["horizontal", "vertical"],
    init: function (element, direction, face, back) {
        Effect.prototype.init.call(this, element, direction);
        this.options = {};
        this.options.face = face;
        this.options.back = back;
    },
    children: function () {
        const that = this;
        const options = that.options;
        let direction = that._direction === "horizontal" ? "left" : "top";
        let reverseDirection = directionMap[direction].reverse;
        const reverse = that._reverse;
        let temp;
        const element = that.element;
        if (reverse) {
            temp = direction;
            direction = reverseDirection;
            reverseDirection = temp;
        }
        return [
            fx(options.face || that.element).turningPage(direction, element).face(true).setReverse(Boolean(reverse)),
            fx(options.back || that.element).turningPage(reverseDirection, element).setReverse(Boolean(reverse))
        ];
    },
    prepare: function (start) {
        start[PERSPECTIVE] = DEFAULT_PERSPECTIVE;
        start.transformStyle = "preserve-3d";
    }
});
export const RESTORE_OVERFLOW = !(support.mobileOS && support.mobileOS.android);
export const IGNORE_TRANSITION_EVENT_SELECTOR = ".km-touch-scrollbar, .km-actionsheet-wrapper";
createEffect("replace", {
    _before: $.noop,
    _after: $.noop,
    init: function (element, previous, transitionClass) {
        Effect.prototype.init.call(this, element);
        this._previous = $(previous);
        this._transitionClass = transitionClass;
    },
    duration: function () {
        throw new Error("The replace effect does not support duration setting; the effect duration may be customized through the transition class rule");
    },
    beforeTransition: function (callback) {
        this._before = callback;
        return this;
    },
    afterTransition: function (callback) {
        this._after = callback;
        return this;
    },
    _both: function () {
        return $().add(this._element || $()).add(this._previous || $());
    },
    _containerClass: function () {
        const direction = this._direction;
        let containerClass = "k-fx k-fx-start k-fx-" + this._transitionClass;
        if (direction) {
            containerClass += " k-fx-" + direction;
        }
        if (this._reverse) {
            containerClass += " k-fx-reverse";
        }
        return containerClass;
    },
    complete: function (e) {
        if (!this.deferred || (e && $(e.target).is(IGNORE_TRANSITION_EVENT_SELECTOR))) {
            return;
        }
        const container = this.container || $();
        container.removeClass("k-fx-end").removeClass(this._containerClass()).off(TRANSITIONEND, this.completeProxy || $.noop);
        (this._previous || $()).hide().removeClass("k-fx-current");
        this.element.removeClass("k-fx-next");
        if (RESTORE_OVERFLOW) {
            container.css(OVERFLOW, "");
        }
        if (!this.isAbsolute) {
            this._both().css(POSITION, "");
        }
        this.deferred.resolve();
        delete this.deferred;
    },
    run: function () {
        if (this._additionalEffects && this._additionalEffects[0]) {
            return this.compositeRun();
        }
        let that = this;
        let element = that.element;
        let previous = that._previous || $();
        let container = element.parents().filter(previous.parents()).first();
        let both = that._both ? that._both() : $().add(element).add(previous);
        let deferred = $.Deferred();
        let originalPosition = element.css(POSITION);
        let originalOverflow;
        // edge case for grid/scheduler, where the previous is already destroyed.
        if (!container.length) {
            container = element.parent();
        }
        this.container = container;
        this.deferred = deferred;
        this.isAbsolute = originalPosition == "absolute";
        if (!this.isAbsolute) {
            both.css(POSITION, "absolute");
        }
        if (RESTORE_OVERFLOW) {
            originalOverflow = container.css(OVERFLOW);
            container.css(OVERFLOW, "hidden");
        }
        element.addClass("k-fx-hidden");
        container.addClass(this._containerClass());
        this.completeProxy = this.complete.bind(this);
        container.on(TRANSITIONEND, this.completeProxy);
        domUtilsService.animationFrame(function () {
            element.removeClass("k-fx-hidden").addClass("k-fx-next");
            previous.css("display", "").addClass("k-fx-current");
            that._before?.(previous, element);
            domUtilsService.animationFrame(function () {
                container.removeClass("k-fx-start").addClass("k-fx-end");
                that._after?.(previous, element);
            });
        });
        return deferred.promise();
    },
    stop: function () {
        this.complete();
    }
});
