import '@progress/kendo-ui/src/kendo.fx.js';
import { asyncTest } from '../../helpers/unit/async-utils.js';

function getTransformValue(element, property) {
    let transform = element.css("transform");

    if (transform == "none") {
        return property == "scale" ? 1 : 0;
    }

    let directMatch = transform.match(new RegExp(property + "\\(([-\\d\\.]+)", "i"));

    if (directMatch) {
        return parseFloat(directMatch[1]);
    }

    let chunks = $.grep(transform.split(/[\(, \)]/), function(chunk) {
        return chunk.length > 0;
    });

    if (property == "scale") {
        return parseFloat(chunks[1]);
    }

    if (property == "translateX") {
        return parseFloat(chunks[5]);
    }

    return parseFloat(chunks[6]);
}

describe("kendo.fx migration coverage", function() {
    let originalOffset = $.fn.offset;
    let originalUniqueSort = $.uniqueSort;
    let originalUnique = $.unique;
    let originalHasOwnProperty = $.hasOwnProperty;
    let originalAnimate = $.fn.animate;
    let originalGetComputedStyles = kendo.getComputedStyles;

    beforeEach(function() {
        kendo.effects.enable();
        $.fn.offset = function() {
            let node = this[0];

            if (!node) {
                return originalOffset.apply(this, arguments);
            }

            return {
                top: parseFloat(node.style.top) || 0,
                left: parseFloat(node.style.left) || 0
            };
        };
    });

    afterEach(function() {
        $.fn.offset = originalOffset;
        $.uniqueSort = originalUniqueSort;
        $.unique = originalUnique;
        $.hasOwnProperty = originalHasOwnProperty;
        $.fn.animate = originalAnimate;
        kendo.getComputedStyles = originalGetComputedStyles;
        kendo.destroy(Mocha.fixture);
        Mocha.fixture.empty();
        kendo.effects.disable();
    });

    it("toggleClass toggles multiple classes with transition options", function() {
        let element = $("<div />").appendTo(Mocha.fixture),
            result = kendo.toggleClass(element, "alpha beta", { duration: 0 }, true);

        assert.strictEqual(result, element);
        assert.isTrue(element.hasClass("alpha"));
        assert.isTrue(element.hasClass("beta"));
    });

    it("parseEffects mirrors object directions", function() {
        let effects = kendo.parseEffects({
            slideIn: {
                direction: "left"
            }
        }, true);

        assert.equal(effects.slideIn.direction, "right");
    });

    asyncTest("transition uses jQuery unique when uniqueSort is unavailable", function(done) {
        let element = $("<div />").appendTo(Mocha.fixture),
            originalHasOwnProperty = $.hasOwnProperty;

        $.hasOwnProperty = function(property) {
            if (property == "uniqueSort") {
                return false;
            }

            return originalHasOwnProperty.call(this, property);
        };

        kendo.effects.transition(element, { opacity: 0.5 }, {
            duration: 0,
            complete: function() {
                done(() => {
                    assert.deepEqual(element.data("keys"), ["opacity"]);
                });
            }
        });
    });

    it("kendoStop keeps computed styles when gotoEnd is false", function() {
        let element = $("<div />").appendTo(Mocha.fixture),
            completeCalls = 0;

        element.data("keys", ["opacity"]);
        element.data("completeCallback", function() {
            completeCalls += 1;
        });

        kendo.effects.stopQueue(element, false, false);

        assert.equal(completeCalls, 1);
        assert.isUndefined(element.data("keys"));
    });

    it("animate strips 3d transforms when transitions are disabled", function() {
        let element = $("<div />").appendTo(Mocha.fixture),
            capturedProperties;

        $.fn.animate = function(properties, options) {
            capturedProperties = properties;

            if (options.complete) {
                options.complete.call(this);
            }

            return this;
        };

        kendo.effects.animate(element, { translatez: "10px", opacity: 0.5 }, {
            duration: 0,
            transition: false,
            complete: $.noop
        });

        assert.isUndefined(capturedProperties.translatez);
        assert.equal(capturedProperties.opacity, 0.5);
    });

    asyncTest("transfer reads the current scale from a direct transform", function(done) {
        let target = $("<div style='width: 100px; height: 100px; position: absolute; left: 300px; top: 0;' />").appendTo(Mocha.fixture),
            element = $("<div style='width: 200px; height: 200px; position: absolute; left: 0; top: 0;' />").appendTo(Mocha.fixture),
            effect = kendo.fx(element.css("transform", "scale(0.25)")).transfer(target);

        effect.duration(0);

        effect.run().then(function() {
            done(() => assert.equal(getTransformValue(element, "scale"), 0.5));
        });
    });

    asyncTest("transfer reads the current scale from a matrix transform", function(done) {
        let target = $("<div style='width: 100px; height: 100px; position: absolute; left: 300px; top: 0;' />").appendTo(Mocha.fixture),
            element = $("<div style='width: 200px; height: 200px; position: absolute; left: 0; top: 0;' />").appendTo(Mocha.fixture),
            effect = kendo.fx(element.css("transform", "matrix(0.25, 0, 0, 0.25, 0, 0)")).transfer(target);

        effect.duration(0);

        effect.run().then(function() {
            done(() => assert.equal(getTransformValue(element, "scale"), 0.5));
        });
    });
});
