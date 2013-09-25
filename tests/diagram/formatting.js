(function($, undefined) {
    var container,
        content,
        aligner,
        diagram = kendo.diagram,
        Rect = diagram.Rect,
        RectAlign = diagram.RectAlign;

    module("rectangle alignment", {
        setup: function() {
            container = new Rect(0, 0, 100, 100);
            content = new Rect(0, 0, 10, 10);

            aligner = new RectAlign(container);
        }
    });

    test("rect align gets created", function() {
        aligner = new RectAlign(container);

        equal(aligner.container, container);
    });

    test("rect align is created by a replica of a Rect object", function() {
        aligner = new RectAlign({x: container.x, y: container.y, width: container.width, height: container.height});

        deepEqual(container, aligner.container);
    });

    test("simple align to left", function() {
        content.x = 20;
        content = aligner.left(content);

        equal(content.x, container.x, "content should be aligned with left edge of container");
    });

    test("simple align to center", function() {
        content = aligner.center(content);

        equal(content.x, 45, "formula is (container.width - content.width) / 2");
    });

    test("simple align to right", function() {
        content = aligner.right(content);

        equal(content.x, container.width - content.width);
    });

    test("simple align to top", function() {
        content.y = 20;
        content = aligner.top(content);

        equal(content.y, container.y);
    });

    test("simple align to middle", function() {
        content = aligner.middle(content);

        equal(content.y, 45);
    });

    test("simple align to bottom", function() {
        content = aligner.bottom(content);

        equal(content.y, 90);
    });

    test("multiple align center/middle", function() {
        content = aligner.center(aligner.middle(content));

        equal(content.x, 45);
        equal(content.y, 45);
    });

    test("simple descriptive align using the align method", function() {
        content = aligner.align(content, "right");

        equal(content.x, 90);
    });

    test("simple descriptive align is case-insensitive", function() {
        content = aligner.align(content, "RiGht");

        equal(content.x, 90);
    });

    test("simple descriptive align using invalid align value", function() {
        content = aligner.align(content, "align_me");

        equal(content.x, 0);
    });

    test("multiple descriptive align", function() {
        content = aligner.align(content, "center middle");

        equal(content.x, 45);
        equal(content.y, 45);
    });
})(kendo.jQuery);

