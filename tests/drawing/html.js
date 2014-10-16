(function(){

    var container;
    var drawing = kendo.drawing;

    module("drawDOM tests", {
        setup: function() {
            container = $("<div style='position: absolute !important; left: 0 !important; top: 0 !important;' />").appendTo(QUnit.fixture);
        },
        teardown: function() {
            container.remove();
        }
    });

    test("[drawDOM] jQuery element", function(){
        container.html("<span style='font: bold 16px monospace'>Foo bar</span>");
        drawing.drawDOM(container).done(function(group){
            ok(true);
        });
    });

    test("[drawDOM] simple text node", function(){
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

    test("[drawDOM] CSS borders", function(){
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

    /* -----[ utils ]----- */

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

})();
