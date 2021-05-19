(function() {
    var container;

    function getTransform(element) {
        var chunks = $.grep(element.css("transform").split(/[\(, \)]/), function(chunk) {
            return chunk.length > 0;
        });

        return {
            scale: chunks[1],
            translateX: chunks[5],
            translateY: chunks[6]
        };
    }

    describe("kendo.effects API Initialization", function() {
        beforeEach(function() {
            kendo.effects.enable();
        });
        afterEach(function() {
            kendo.effects.disable();
        });

        it("Creating effects registers API constructor", function() {
            kendo.effects.createEffect("foo", {});

            var fx = kendo.fx($("<div />"));

            assert.isOk($.isFunction(fx.foo));
        });

        it("Creating effects registers API constructor", function() {
            kendo.effects.createEffect("foo", {
                directions: ["left", "right"]
            });

            var fx = kendo.fx($("<div />"));

            assert.isOk($.isFunction(fx.fooLeft));
            assert.isOk($.isFunction(fx.fooRight));
        });
    });

    describe("kendo.effects Functionality", function() {
        beforeEach(function() {
            kendo.effects.enable();
        });
        afterEach(function() {
            kendo.effects.disable();
        });

        function verifyEffect(effectName, before, after, withEffect) {
            withEffect = withEffect || $.noop;

            var effect = kendo.fx($("<div style='width:200px; height: 200px' />").appendTo(Mocha.fixture))[effectName]();
            effect.duration(0);

            withEffect(effect);

            var setup = effect.setup;
            effect.setup = function() {
                setup.call(this);
                before(this.element);
            };

            effect.run().then(function() {
                after(effect.element);
            });
        }

        it("slideIn slides the element", function(done) {
            verifyEffect("slideInLeft",
                function(element) { assert.equal(getTransform(element).translateX, 200); },
                function(element) { assert.equal(getTransform(element).translateX, 0); done(); }
            );
        });

        it("tile tiles the element", function(done) {
            var foo = $("<div style='width: 200px' />").appendTo(Mocha.fixture),
                bar = $("<div style='width: 200px' />").appendTo(Mocha.fixture),
                effect = kendo.fx(foo).tile("left", bar);

            effect.duration(0);

            effect.run().then(function() {
                assert.equal(getTransform(foo).translateX, 0);
                assert.equal(getTransform(bar).translateX, -200);
                done();
            });
        });

        it("fade in fades the element", function(done) {
            verifyEffect("fadeIn",
                function(element) { assert.equal(element.css("opacity"), "0") },
                function(element) { assert.equal(element.css("opacity"), "1"); done(); }
            );
        });

        it("fade in accepts custom start/end values", function(done) {
            verifyEffect("fadeIn",
                function(element) { assert.closeTo(parseFloat(element.css("opacity")), 0.3, 0.1) },
                function(element) { done(); assert.closeTo(parseFloat(element.css("opacity")), 0.8, 0.1); },
                function(effect) { effect.startValue(0.3).endValue(0.8); }
            );
        });

        it("fade out can fade the element to a given value", function(done) {
            verifyEffect("fadeOut",
                function(element) { assert.closeTo(parseFloat(element.css("opacity")), 1, 0.1); },
                function(element) { assert.closeTo(parseFloat(element.css("opacity")), 0.8, 0.1); assert.equal(element.css("display"), "block"); done(); },
                function(effect) { effect.endValue(0.8); }
            );
        });

        it("fade out fades the element and hides it", function(done) {
            verifyEffect("fadeOut",
                function(element) { assert.equal(element.css("opacity"), "1"); },
                function(element) {
                    assert.equal(element.css("opacity"), "0");
                    assert.equal(element.css("display"), "none");
                    done();
                }
            );
        });

        it("zoom in zooms the element", function(done) {
            verifyEffect("zoomIn",
                function(element) { assert.equal(getTransform(element).scale, 0.01); },
                function(element) { assert.equal(getTransform(element).scale, 1); done(); }
            );
        });

        it("expanding expands the element", function(done) {
            verifyEffect("expandVertical",
                function(element) { assert.equal(element.css("height"), "0px"); },
                function(element) { assert.equal(element.css("height"), "200px"); done(); }
            );
        });
    });

    describe("kendo.effects Methods Functionality", function() {
        beforeEach(function() {
            kendo.effects.enable();
        });
        afterEach(function() {
            kendo.destroy(container);
            Mocha.fixture.empty();
            kendo.destroy(Mocha.fixture);
            kendo.effects.disable();
        });

        it("transfer transfers the element", function(done) {
            var bar = $("<div style='width: 100px; height: 100px; margin-left: 300px; margin-right: 300px;' />"),
                effect;

            container = $("<div style='width: 200px; height: 200px;' />");

            bar.prependTo(Mocha.fixture);
            effect = kendo.fx(container).transfer(bar);

            effect.duration(0);

            effect.run().then(function() {
                assert.equal(container.css("transform"), "matrix(0.5, 0, 0, 0.5, 0, 0)");
                var transformOrigin = container.css("transformOrigin").match(/(\d+)\.?\d+px/g).map(function(px) { return parseInt(px); });

                assert.equal(transformOrigin[0], 616);
                assert.equal(transformOrigin[1], 16);
                done();
            });
        });

        it("page turn turns the two pages, hiding the first one", function(done) {
            var foo, bar, effect;

            container = $("<div><div id='foo'>Foo</div><div id='bar'>Bar</div></div>");
            foo = container.find("#foo");
            bar = container.find("#bar");
            effect = kendo.fx(container).pageturn("horizontal", foo, bar);

            effect.duration(0);

            effect.run().then(function() {
                assert.equal(foo.css("display"), "none");
                assert.equal(bar.css("display"), "block");
                done();
            });
        });

        it("flip flips the two pages, hiding the first one", function(done) {
            var foo, bar, effect;

            container = $("<div><div id='foo'>Foo</div><div id='bar'>Bar</div></div>");
            foo = container.find("#foo");
            bar = container.find("#bar");
            effect = kendo.fx(container).flip("horizontal", foo, bar);

            effect.duration(0);

            effect.run().then(function() {
                assert.equal(foo.css("display"), "none");
                assert.equal(bar.css("display"), "block");
                done();
            });
        });

        // TODO FAIL
        // it("replace replaces one of the elements with the other", function(done) {
        //     var foo, bar, effect;

        //     container = $("<div><div id='foo'>Foo</div><div id='bar'>Bar</div></div>");
        //     foo = container.find("#foo");
        //     bar = container.find("#bar");
        //     effect = kendo.fx(bar).replace(foo, "zoom");

        //     container.prependTo(Mocha.fixture);

        //     effect.run().then(function() {
        //         assert.equal(foo.css("display"), "none");
        //         assert.equal(bar.css("display"), "block");
        //         done();
        //     });
        // });

        // TODO FAIL
        // it("Triggers before/after callbacks", function(done) {
        //     var foo, bar, effect;

        //     container = $("<div><div id='foo'>Foo</div><div id='bar'>Bar</div></div>");
        //     foo = container.find("#foo");
        //     bar = container.find("#bar");
        //     effect = kendo.fx(bar).replace(foo, "zoom");

        //     container.prependTo(Mocha.fixture);

        //     effect
        //         .beforeTransition(function(previous, next) {
        //             assert.equal(previous[0], foo[0]);
        //             assert.equal(next[0], bar[0]);
        //             assert.isOk(container.hasClass("k-fx-start"));
        //         })
        //         .afterTransition(function(previous, next) {
        //             assert.equal(previous[0], foo[0]);
        //             assert.equal(next[0], bar[0]);
        //             assert.isOk(container.hasClass("k-fx-end"));
        //         })
        //         .run()
        //         .then(function() {
        //             done();
        //         });
        // });
    });
}());
