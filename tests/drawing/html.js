(function(){

    var container;
    var drawing = kendo.drawing;

    module("[drawDOM]", {
        setup: function() {
            container = createContainer();
        },
        teardown: function() {
            container.remove();
        }
    });

    test("Draws jQuery element", function(){
        container.html("<span style='font: bold 16px monospace'>Foo bar</span>");
        drawing.drawDOM(container).done(function(group){
            ok(true);
        });
    });

    test("Fails with no element", function(){
        drawing.drawDOM($())
        .fail(function() {
            ok(true);
        })
        .done(function(group){
            ok(false, "Should fail");
        });
    });

    test("Draws simple text node", function(){
        container.html("<span style='font: bold 16px monospace'>Foo bar</span>");
        drawing.drawDOM(container[0]).done(function(group){
            var text = find(group, function(node){
                return node instanceof drawing.Text;
            });
            ok(text instanceof drawing.Text);
            equal(text.content(), "Foo bar");

            var font = text.options.font.replace("700", "bold");
            equal(font, "normal normal bold 16px monospace");
        });
    });

    test("CSS borders", function(){
        container.html("<div style='border: 2px solid red; width: 100px; height: 200px'></div>");
        drawing.drawDOM(container[0]).done(function(group){
            // a simple border where all edges have the same colors, widths and no corner radiuses
            // will be rendered as a single Path.
            var path = findMany(group, function(node){
                return node instanceof drawing.Path;
            });
            equal(path.length, 1);
            path = path[0];
            ok(path.options.closed);

            // check stroke width and color
            equal(path.options.stroke.width, 2);
            ok(kendo.parseColor(path.options.stroke.color).equals("#f00"));

            // check that it's a rectangle, and dimensions
            var segments = path.segments;
            equal(segments.length, 4);
            var s1 = segments[0], s2 = segments[1], s3 = segments[2], s4 = segments[3];
            equal(s1.anchor().y, s2.anchor().y);
            equal(s2.anchor().x, s3.anchor().x);
            equal(s3.anchor().y, s4.anchor().y);
            equal(s4.anchor().x, s1.anchor().x);

            // half the border width is added on each side, so the
            // path appears to be 2px wider.
            equal(s2.anchor().x - s1.anchor().x, 102); // width
            equal(s4.anchor().y - s1.anchor().y, 202); // height
        });
    });

    // ------------------------------------------------------------
    (function() {
        var container;
        var element;
        var widget;

        module("[drawDOM] / Exportable Widgets", {
            setup: function() {
                container = createContainer();
                element = $("<div />").kendoExportable().appendTo(container);
                widget = element.getKendoExportable();
            },
            teardown: function() {
                container.remove();
            }
        });

        test("calls exportVisual", function(){
            widget.exportVisual = function() {
                ok(true);
                return new drawing.Group();
            };

            drawing.drawDOM(container);
        });

        test("appends exportVisual result", function(){
            drawing.drawDOM(container).done(function(group) {
                ok(group.children[0] instanceof drawing.Group);
            });
        });

        test("positions widget", function(){
            element.css({
                position: "absolute",
                left: "50px",
                top: "100px"
            });

            drawing.drawDOM(container).done(function(group) {
                deepEqual(group.bbox().origin.toArray(), [50, 100]);
            });
        });

        test("ignores children", function(){
            element.append($("<div>Foo</div>"));

            drawing.drawDOM(container).done(function(group) {
                equal(group.children.length, 1);
            });
        });
    })();

    /* -----[ utils ]----- */

    var Exportable = kendo.ui.Widget.extend({
        options: {
            name: "Exportable"
        },

        exportVisual: function() {
            var path = new drawing.Path().moveTo(0, 0).lineTo(1, 1);
            var group = new drawing.Group();
            group.append(path);

            return group;
        }
    });
    kendo.ui.plugin(Exportable);

    function find(group, predicate) {
        return findMany(group, predicate)[0];
    }

    function findMany(group, predicate) {
        var result = [];
        (function dive(node){
            if (predicate(node)) result.push(node);
            if (node instanceof drawing.Group || node instanceof drawing.MultiPath) {
                for (var i = 0; i < node.children.length; ++i) {
                    dive(node.children[i]);
                }
            }
        })(group);
        return result;
    }

    function createContainer() {
        return $("<div style='position: absolute !important; left: 0 !important; top: 0 !important;' />").appendTo(QUnit.fixture);
    }

})();
