(function ($, global, undefined) {
    var deepExtend = kendo.deepExtend;

    function buildRoughlyEqualMessage(actual, expected) {
        return "{expected: " + expected + ", actual: " + actual + "}";
    }

    function roughlyEqual(actual, expected, message) {
        var isOK = Math.abs(actual - expected) < 1E-6;
        var failMessage = (isOK ? "" : " : " + buildRoughlyEqualMessage(actual, expected));
        ok(isOK, message + failMessage);
    }

    function matrixEqual(m1, m2) {
        roughlyEqual(m1.a, m2.a, "matrix difference in a");
        roughlyEqual(m1.b, m2.b, "matrix difference in b");
        roughlyEqual(m1.c, m2.c, "matrix difference in c");
        roughlyEqual(m1.d, m2.d, "matrix difference in d");
        roughlyEqual(m1.e, m2.e, "matrix difference in e");
        roughlyEqual(m1.f, m2.f, "matrix difference in f");
    }

    function equalTranslate(svgNode, point, message) {
        var translateStr = "translate(" + point.x + " " + point.y + ")",
            nodeTransform = svgNode.getAttribute("transform"),
            unifiedTransformFormat = nodeTransform.replace(",", " "),
            isSameTranslate = unifiedTransformFormat.indexOf(translateStr) > -1;

        if (isSameTranslate) {
            ok(true, message);
        } else {
            fail(message + "expected: " + point.toString() + "; actual: " + nodeTransform);
        }
    }

    function randomPoint() {
        return { x: randomInteger(0, 500), y: randomInteger(0, 500) };
    }

    function randomDiagram(diagram) {
        var n = randomInteger(10, 20);
        for (var i = 0; i < n; i++) {
            diagram.addShape(randomPoint(), { data: "Rectangle" })
        }
    }

    deepExtend(window, {
        roughlyEqual: roughlyEqual,
        matrixEqual: matrixEqual,
        equalTranslate: equalTranslate,
        randomDiagram: randomDiagram
    });
})(kendo.jQuery, window);
