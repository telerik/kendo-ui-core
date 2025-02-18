import '@progress/kendo-ui/src/kendo.fx.js';
import { asyncTest } from '../../helpers/unit/async-utils.js';

let container;

function getTransform(element) {
    let chunks = $.grep(element.css("transform").split(/[\(, \)]/), function(chunk) {
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

        let fx = kendo.fx($("<div />"));

        assert.isOk(kendo.isFunction(fx.foo));
    });

    it("Creating effects registers API constructor", function() {
        kendo.effects.createEffect("foo", {
            directions: ["left", "right"]
        });

        let fx = kendo.fx($("<div />"));

        assert.isOk(kendo.isFunction(fx.fooLeft));
        assert.isOk(kendo.isFunction(fx.fooRight));
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

        let effect = kendo.fx($("<div style='width:200px; height: 200px' />").appendTo(Mocha.fixture))[effectName]();
        effect.duration(0);

        withEffect(effect);

        let setup = effect.setup;
        effect.setup = function() {
            setup.call(this);
            before(this.element);
        };

        effect.run().then(function() {
            after(effect.element);
        });
    }

    asyncTest("slideIn slides the element", function(done) {
        verifyEffect("slideInLeft",
            function(element) { assert.equal(getTransform(element).translateX, 200); },
            function(element) { done(() => assert.equal(getTransform(element).translateX, 0)); }
        );
    });

    asyncTest("tile tiles the element", function(done) {
        let foo = $("<div style='width: 200px' />").appendTo(Mocha.fixture),
            bar = $("<div style='width: 200px' />").appendTo(Mocha.fixture),
            effect = kendo.fx(foo).tile("left", bar);

        effect.duration(0);

        effect.run().then(function() {
            done(() => {
                assert.equal(getTransform(foo).translateX, 0);
                assert.equal(getTransform(bar).translateX, -200);
            });
        });
    });

    asyncTest("fade in fades the element", function(done) {
        verifyEffect("fadeIn",
            function(element) { assert.equal(element.css("opacity"), "0"); },
            function(element) { done(() => assert.equal(element.css("opacity"), "1")); }
        );
    });

    asyncTest("fade in accepts custom start/end values", function(done) {
        verifyEffect("fadeIn",
            function(element) { assert.closeTo(parseFloat(element.css("opacity")), 0.3, 0.1); },
            function(element) { done(() => assert.closeTo(parseFloat(element.css("opacity")), 0.8, 0.1)); },
            function(effect) { effect.startValue(0.3).endValue(0.8); }
        );
    });

    asyncTest("fade out can fade the element to a given value", function(done) {
        verifyEffect("fadeOut",
            function(element) { assert.closeTo(parseFloat(element.css("opacity")), 1, 0.1); },
            function(element) {
                done(() => {
                    assert.closeTo(parseFloat(element.css("opacity")), 0.8, 0.1);
                    assert.equal(element.css("display"), "block");
                });
            },
            function(effect) { effect.endValue(0.8); }
        );
    });

    asyncTest("fade out fades the element and hides it", function(done) {
        verifyEffect("fadeOut",
            function(element) { assert.equal(element.css("opacity"), "1"); },
            function(element) {
                done(() => {
                    assert.equal(element.css("opacity"), "0");
                    assert.equal(element.css("display"), "none");
                });
            }
        );
    });

    asyncTest("zoom in zooms the element", function(done) {
        verifyEffect("zoomIn",
            function(element) { assert.equal(getTransform(element).scale, 0.01); },
            function(element) { done(() => assert.equal(getTransform(element).scale, 1)); }
        );
    });

    asyncTest("expanding expands the element", function(done) {
        verifyEffect("expandVertical",
            function(element) { assert.equal(element.css("height"), "0px"); },
            function(element) { done(() => assert.equal(element.css("height"), "200px")); }
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

    asyncTest("transfer transfers the element", function(done) {
        let bar = $("<div style='width: 100px; height: 100px; margin-left: 300px; margin-right: 300px;' />"),
            effect;

        container = $("<div style='width: 200px; height: 200px;' />");

        bar.prependTo(Mocha.fixture);
        effect = kendo.fx(container).transfer(bar);

        effect.duration(0);

        effect.run().then(function() {
            assert.equal(container.css("transform"), "matrix(0.5, 0, 0, 0.5, 0, 0)");
            let transformOrigin = container.css("transformOrigin").match(/(\d+)\.?\d+px/g).map(function(px) { return parseInt(px); });

            done(() => assert.equal(transformOrigin[0], 600));
        });
    });

    asyncTest("page turn turns the two pages, hiding the first one", function(done) {
        let foo, bar, effect;

        container = $("<div><div id='foo'>Foo</div><div id='bar'>Bar</div></div>");
        foo = container.find("#foo");
        bar = container.find("#bar");
        effect = kendo.fx(container).pageturn("horizontal", foo, bar);

        effect.duration(0);

        effect.run().then(function() {
            done(() => {
                assert.equal(foo.css("display"), "none");
                assert.equal(bar.css("display"), "block");
            });
        });
    });

    asyncTest("flip flips the two pages, hiding the first one", function(done) {
        let foo, bar, effect;

        container = $("<div><div id='foo'>Foo</div><div id='bar'>Bar</div></div>");
        foo = container.find("#foo");
        bar = container.find("#bar");
        effect = kendo.fx(container).flip("horizontal", foo, bar);

        effect.duration(0);

        effect.run().then(function() {
            done(() => {
                assert.equal(foo.css("display"), "none");
                assert.equal(bar.css("display"), "block");
            });
        });
    });
});
