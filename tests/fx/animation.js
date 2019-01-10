(function() {
    var animate = kendo.animate,
        transforms = kendo.support.transforms,
        matrix3dRegExp = /matrix3?d?\s*\(.*,\s*([\d\.\-]+)\w*?,\s*([\d\.\-]+)\w*?,\s*([\d\.\-]+)\w*?,\s*([\d\.\-]+)\w*?/i,
        translateXRegExp = /translatex?$/i,
        TRANSFORM = kendo.support.transforms.css + "transform",
        span;

    function animationProperty(element, property) {
        if (transforms) {
            var transform = element.css(TRANSFORM);
            if (transform == "none") {
                return property == "scale" ? 1 : 0;
            }

            var match = transform.match(new RegExp(property + "\\s*\\(([\\d\\w\\.]+)")),
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
        } else {
            return element.css(property);
        }
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

        it("kendoStop calls callback", function() {
            jasmine.clock().install();

            var span = kendo.jQuery("<span />");

            span.kendoAnimate({
                effects: "fadeOut",
                duration: 600,
                complete: function() {
                    assert.isOk(true);
                }
            });

            span.kendoStop(true, true);

            jasmine.clock().tick();
            jasmine.clock().uninstall();
        });

        it("animate waits all effects to finish", function(done) {
            var fooFinished = false, barFinished = false;

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
                assert.isOk(fooFinished);
                assert.isOk(barFinished);
                done();
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

        it("passing options to animate works", function(done) {
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
                    assert.isOk(true);
                    done();
                }
            });
        });

        it("passing options to animate effects as string", function(done) {
            kendo.effects.createEffect("foo", {
                prepare: function() {
                    assert.equal(this._reverse, true);
                    return { start: {}, end: {} };
                }
            });

            animate(span, {
                reverse: true,
                complete: function() {
                    assert.isOk(true);
                    done();
                },
                effects: "foo"
            });
        });

        // legacy test, not sure why
        it("make sure css, setup, teardown and restore are called in sequence", function(done) {
            span.css("overflow", "visible");

            kendo.effects.createEffect("foo", {
                restore: ["overflow"],

                prepare: function() {
                    assert.isOk(this.element.data("overflow") == "visible");
                    return { start: { overflow: "hidden" } };
                },

                teardown: function() {
                    assert.isOk(this.element.css("overflow") == "visible");
                    done();
                }
            });

            animate(span, "foo");
        });

        it("callback is fired asynchronously after animate", function(done) {
            var called = false;

            kendo.effects.createEffect("moo", {
                prepare: function() {
                    return { end: { translateX: "10px" } };
                }
            });

            span.kendoAnimate({
                effects: "moo",
                duration: 100,
                complete: function() {
                    called = true;
                    done();
                }
            });

            assert.isOk(!called);
        });

        if (!kendo.support.browser.mozilla) {
            it("Passing properties to the effect overrides the end state", function(done) {
                var height = -1;

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
                        assert.equal(height, 0);
                        assert.equal(span.height(), 20);
                        done();
                    }
                });
            });

            it("animating height from 0 to 100 results in 100px high element", function(done) {
                var height = -1;

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
                        assert.equal(height, 0);
                        assert.equal(span.height(), 100);
                        done();
                    }
                });
            });

            it("fadeIn animates the opacity from 0 to 1", function(done) {
                span.css({ position: "absolute", display: "block" });

                var opacity = 5;

                span.kendoAnimate({
                    effects: "fadeIn",
                    duration: 10,
                    init: function() {
                        opacity = span.css("opacity");
                    },
                    complete: function() {
                        assert.isOk(opacity === '0');
                        assert.isOk(span.css("opacity") == 1);
                        done();
                    }
                });
            });

            it("fadeOut animates the opacity from 1 to 0", function(done) {
                span.css({ position: "absolute", display: "block" });

                kendo.effects.Fade.prototype.restore = [];

                span.kendoAnimate({
                    effects: "fadeOut",
                    duration: 10,
                    complete: function() {
                        assert.equal(span.css("opacity"), 0);
                        done();
                    }
                });
            });

            if (!kendo.support.browser.msie) { // TODO: Write the IE part of this test.
                it("zoomIn animates the scale from 0.01 to 1", function(done) {
                    span.css({ position: "absolute", display: "block" });

                    var scale = 5;

                    span.kendoAnimate({
                        effects: "zoomIn",
                        duration: 10,
                        init: function() {
                            scale = animationProperty(span, "scale");
                        },
                        complete: function() {
                            assert.isOk(scale == 0.01);
                            assert.isOk(animationProperty(span, "scale") == 1);
                            done();
                        }
                    });
                });
            }

            it("slideIn:right moves the element right from - its width to 0", function(done) {
                span.css({ position: "absolute", display: "block", left: 10, width: 10 });

                var position = 1;
                if (transforms) {
                    span.css(TRANSFORM, "translateX(10px)");
                }

                span.kendoAnimate({
                    effects: "slideIn:right",
                    duration: 20,
                    init: function() {
                        position = (transforms ? animationProperty(span, "translateX") : span.offset().left);
                    },
                    complete: function() {
                        assert.isOk(position == -span.width());
                        assert.isOk((transforms ? animationProperty(span, "translateX") : span.offset().left) === 0);
                        done();
                    }
                });
            });

            it("slideIn:down moves the element down from - its height to 0", function(done) {
                span.css({ position: "absolute", display: "block", top: 10 });

                var position = 1;
                if (transforms) {
                    span.css(TRANSFORM, "translateY(10px)");
                }

                span.kendoAnimate({
                    effects: "slideIn:down",
                    duration: 20,
                    init: function() {
                        position = (transforms ? animationProperty(span, "translateY") : span.offset().top);
                    },
                    complete: function() {
                        assert.isOk(position == -span.height());
                        assert.isOk((transforms ? animationProperty(span, "translateY") : span.offset().top) === 0);
                        done();
                    }
                });
            });

            it("expand:vertical expands the element from 0 to its height", function(done) {
                span.css({ position: "absolute", display: "block", height: 100 });
                var initialHeight = 100;

                span.kendoAnimate({
                    effects: "expand:vertical",
                    duration: 20,
                    init: function() {
                        initialHeight = span.height();
                    },
                    complete: function() {
                        assert.isOk(initialHeight === 0);
                        assert.isOk(span.height() == 100);
                        done();
                    }
                });
            });

            it("expand:horizontal expands the element from 0 to its width", function(done) {
                span.css({ position: "absolute", display: "block", width: 100, height: 100 });
                var initialWidth = 100;

                span.kendoAnimate({
                    effects: "expand:horizontal",
                    duration: 20,
                    init: function() {
                        initialWidth = span.width();
                    },
                    complete: function() {
                        assert.isOk(initialWidth === 0);
                        assert.isOk(span.width() == 100);
                        done();
                    }
                });
            });
        }
    });

    // Sporadic Fails. Investigating in another branch
    // describe("kendo.animationFrame Animation", function() {
    //     beforeEach(function() {
    //         kendo.effects.enable();
    //     });
    //     afterEach(function() {
    //         kendo.effects.disable();
    //     });

    //     it("executes callbacks", function(done) {
    //         var animation = kendo.effects.Animation.extend({
    //             counter: 0,
    //             tick: function() {
    //                 this.counter++;
    //             },
    //             onEnd: function() {
    //                 assert.equal(this.counter, 3);
    //                 done();
    //             },
    //             done: function() {
    //                 return this.counter === 3;
    //             }
    //         });

    //         new animation().start();
    //     });

    //     it("is cancellable", function(done) {
    //         var animation = kendo.effects.Animation.extend({
    //             counter: 0,
    //             tick: function() {
    //                 this.counter++;
    //                 if (this.counter === 2) {
    //                     this.cancel();
    //                 }
    //             },
    //             onCancel: function() {
    //                 assert.equal(this.counter, 2);
    //                 done();
    //             },
    //             onEnd: function() {
    //                 assert.isOk(false);
    //             },
    //             done: function() {
    //                 return this.counter === 3;
    //             }
    //         });

    //         new animation().start();
    //     });
    // });
}());
