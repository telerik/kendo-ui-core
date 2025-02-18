import '@progress/kendo-ui/src/kendo.fx.js';
import { asyncTest } from '../../helpers/unit/async-utils.js';

let animate = kendo.animate,
    matrix3dRegExp = /matrix3?d?\s*\(.*,\s*([\d\.\-]+)\w*?,\s*([\d\.\-]+)\w*?,\s*([\d\.\-]+)\w*?,\s*([\d\.\-]+)\w*?/i,
    translateXRegExp = /translatex?$/i,
    TRANSFORM = "transform",
    span;

function animationProperty(element, property) {
    let transform = element.css(TRANSFORM);
    if (transform == "none") {
        return property == "scale" ? 1 : 0;
    }

    let match = transform.match(new RegExp(property + "\\s*\\(([\\d\\w\\.]+)")),
        computed = 0;

    if (match) {
        computed = parseInt(match[1], 10);
    } else {
        match = transform.match(matrix3dRegExp) || [0, 0, 0, 0, 0];
        property = property.toLowerCase();

        if (translateXRegExp.test(property)) {
            computed = parseFloat(match[3] / match[2]);
        } else if (property == "translatey") {
            computed = parseFloat(match[4] / match[2]);
        } else if (property == "scale") {
            computed = parseFloat(match[2]);
        } else if (property == "rotate") {
            computed = parseFloat(Math.atan2(match[2], match[1]));
        }
    }

    return computed;
}

describe("kendo.animate", function() {
    beforeEach(function() {
        kendo.effects.enable();

        span = $("<span style='position: absolute; top: 0; left: 0; visibility: hidden;'>foo</span>").appendTo(document.body);
    });
    afterEach(function() {
        span.remove();
        kendo.effects.disable();
    });

    asyncTest("kendoStop calls callback", function(done) {
        let span = kendo.jQuery("<span />");

        span.kendoAnimate({
            effects: "fadeOut",
            duration: 600,
            complete: function() {
                done(() => assert.isOk(true));
            }
        });

        span.kendoStop(true, true);
    });

    asyncTest("animate waits all effects to finish", function(done) {
        let fooFinished = false, barFinished = false;

        kendo.effects.createEffect("foo", {
            prepare: function() {
                fooFinished = true;
                return { start: {}, end: {} };
            }
        });

        kendo.effects.createEffect("bar", {
            prepare: function() {
                barFinished = true;
                return { start: {}, end: {} };
            }
        });

        animate(span, "foo bar", function() {
            done(() => {
                assert.isOk(fooFinished);
                assert.isOk(barFinished);
            });
        });
    });

    it("reverse method of the effect is called if reverse = true", function() {
        kendo.effects.createEffect("foo", {
            prepare: function() {
                assert.equal(this._reverse, true);
                return { start: {}, end: {} };
            }
        });

        animate(span, "foo", true);
    });

    asyncTest("passing options to animate works", function(done) {
        kendo.effects.createEffect("foo", {
            prepare: function() {
                assert.equal(this._reverse, true);
                return { start: {}, end: {} };
            }
        });

        animate(span, {
            effects: { foo: {} },
            reverse: true,
            complete: function() {
                done(() => assert.isOk(true));
            }
        });
    });

    asyncTest("passing options to animate effects as string", function(done) {
        kendo.effects.createEffect("foo", {
            prepare: function() {
                assert.equal(this._reverse, true);
                return { start: {}, end: {} };
            }
        });

        animate(span, {
            reverse: true,
            complete: function() {
                done(() => assert.isOk(true));
            },
            effects: "foo"
        });
    });

    // legacy test, not sure why
    asyncTest("make sure css, setup, teardown and restore are called in sequence", function(done) {
        span.css("overflow", "visible");

        kendo.effects.createEffect("foo", {
            restore: ["overflow"],

            prepare: function() {
                assert.isOk(this.element.data("overflow") == "visible");
                return { start: { overflow: "hidden" } };
            },

            teardown: function() {
                done(() => assert.isOk(this.element.css("overflow") == "visible"));
            }
        });

        animate(span, "foo");
    });

    asyncTest("callback is fired asynchronously after animate", function(done) {
        kendo.effects.createEffect("moo", {
            prepare: function() {
                return { end: { translateX: "10px" } };
            }
        });

        span.kendoAnimate({
            effects: "moo",
            duration: 100,
            complete: function() {
                done(() => assert.isOk(true));
            }
        });
    });

    if (!kendo.support.browser.mozilla) {
        asyncTest("Passing properties to the effect overrides the end state", function(done) {
            let height = -1;

            kendo.effects.createEffect("foo", {
                prepare: function(start, end) {
                    start.height = 0;
                    start.display = "block";
                    end.height = 100;
                }
            });

            span.kendoAnimate({
                effects: { foo: { properties: { height: 20 } } },

                duration: 20,

                init: function() {
                    height = span.height();
                },

                complete: function() {
                    done(() => {
                        assert.equal(height, 0);
                        assert.equal(span.height(), 20);
                    });
                }
            });
        });

        asyncTest("animating height from 0 to 100 results in 100px high element", function(done) {
            let height = -1;

            kendo.effects.createEffect("foo", {
                prepare: function(start, end) {
                    start.height = 0;
                    start.display = "block";
                    end.height = 100;
                }
            });

            span.kendoAnimate({
                effects: "foo",
                duration: 20,
                init: function() {
                    height = span.height();
                },
                complete: function() {
                    done(() => {
                        assert.equal(height, 0);
                        assert.equal(span.height(), 100);
                    });
                }
            });
        });

        asyncTest("fadeIn animates the opacity from 0 to 1", function(done) {
            span.css({ position: "absolute", display: "block" });

            let opacity = 5;

            span.kendoAnimate({
                effects: "fadeIn",
                duration: 10,
                init: function() {
                    opacity = span.css("opacity");
                },
                complete: function() {
                    done(() => {
                        assert.isOk(opacity === '0');
                        assert.isOk(span.css("opacity") == 1);
                    });
                }
            });
        });

        asyncTest("fadeOut animates the opacity from 1 to 0", function(done) {
            span.css({ position: "absolute", display: "block" });

            kendo.effects.Fade.prototype.restore = [];

            span.kendoAnimate({
                effects: "fadeOut",
                duration: 10,
                complete: function() {
                    done(() => assert.equal(span.css("opacity"), 0));
                }
            });
        });

        if (!kendo.support.browser.msie) { // TODO: Write the IE part of this test.
            asyncTest("zoomIn animates the scale from 0.01 to 1", function(done) {
                span.css({ position: "absolute", display: "block" });

                let scale = 5;

                span.kendoAnimate({
                    effects: "zoomIn",
                    duration: 10,
                    init: function() {
                        scale = animationProperty(span, "scale");
                    },
                    complete: function() {
                        done(() => {
                            assert.isOk(scale == 0.01);
                            assert.isOk(animationProperty(span, "scale") == 1);
                        });
                    }
                });
            });
        }

        asyncTest("slideIn:right moves the element right from - its width to 0", function(done) {
            span.css({ position: "absolute", display: "block", left: 10, width: 10 });

            let position = 1;
            span.css(TRANSFORM, "translateX(10px)");

            span.kendoAnimate({
                effects: "slideIn:right",
                duration: 20,
                init: function() {
                    position = animationProperty(span, "translateX");
                },
                complete: function() {
                    done(() => {
                        assert.isOk(position == -span.width());
                        assert.isOk(animationProperty(span, "translateX") === 0);
                    });
                }
            });
        });

        asyncTest("slideIn:down moves the element down from - its height to 0", function(done) {
            span.css({ position: "absolute", display: "block", top: 10 });

            let position = 1;
            span.css(TRANSFORM, "translateY(10px)");

            span.kendoAnimate({
                effects: "slideIn:down",
                duration: 20,
                init: function() {
                    position = animationProperty(span, "translateY");
                },
                complete: function() {
                    done(() => {
                        assert.isOk(position == -span.height());
                        assert.isOk(animationProperty(span, "translateY") === 0);
                    });
                }
            });
        });

        asyncTest("expand:vertical expands the element from 0 to its height", function(done) {
            span.css({ position: "absolute", display: "block", height: 100 });
            let initialHeight = 100;

            span.kendoAnimate({
                effects: "expand:vertical",
                duration: 20,
                init: function() {
                    initialHeight = span.height();
                },
                complete: function() {
                    done(() => {
                        assert.isOk(initialHeight === 0);
                        assert.isOk(span.height() == 100);
                    });
                }
            });
        });

        asyncTest("expand:horizontal expands the element from 0 to its width", function(done) {
            span.css({ position: "absolute", display: "block", width: 100, height: 100 });
            let initialWidth = 100;

            span.kendoAnimate({
                effects: "expand:horizontal",
                duration: 20,
                init: function() {
                    initialWidth = span.width();
                },
                complete: function() {
                    done(() => {
                        assert.isOk(initialWidth === 0);
                        assert.isOk(span.width() == 100);
                    });
                }
            });
        });
    }
});
