(function() {
    var dataviz = kendo.dataviz,
        ChartContainer = dataviz.ChartContainer,
        Box = dataviz.Box2D,
        pane,
        container;

    function setup(axes, box) {
        pane = {
            axes: axes,
            box: box || Box(1,1,100,100)
        };
        container = new ChartContainer({}, pane);
    }

    function setupAxis(lineBox, vertical) {
        return {
            lineBox: function() {
                return lineBox;
            },
            options: {
                vertical: vertical
            }
        };
    }

    (function() {
        module("chart container", {
            setup: function (){
                setup([setupAxis(Box(1,10, 1, 100), true)]);
            }
        });

        test("shouldClip returns false if the clip option of all of its children is false", function() {
            container.children = [{options: {clip: false}}, {options: {clip: false}}];
            ok(container.shouldClip() === false);
        });

        test("shouldClip returns true if the clip option of any of its children is true", function() {
            container.children = [{options: {clip: true}}, {options: {clip: false}}];
            ok(container.shouldClip() === true);
        });

        test("shouldClip returns true if the clip option of its children is true", function() {
            container.children = [{options: {clip: true}}, {options: {clip: true}}];
            ok(container.shouldClip());
        });

        test("destroy calls destroy on the children", 1, function() {
            container.children = [{ destroy: function() {
                ok(true);
            }}];
            container.destroy();
        });

        test("destroy deletes parent", function() {
            container.parent = {
                getRoot: function() {
                    return null;
                }
            };
            container.destroy();
            equal(container.parent, undefined);
        });
    })();

    (function(){
        module("chart container / clip box", {});

        test("calculates clip box", function() {
            setup([setupAxis(Box(1,10, 1, 100), true), setupAxis(Box(10,1, 100, 1), false)]);
            deepEqual(container._clipBox(), Box(10,10,100,100));
        });

        test("gets clip box coordinates from pane if there is no secondary axis", function() {
            setup([setupAxis(Box(1,10, 1, 100), true)], Box(1, 1, 100, 100));
            deepEqual(container._clipBox(), Box(1,10,100,100));
        });
    })();


    (function() {
        var visual,
            point;

        function chartPoint(box, visibleLabel) {
            return {
                box: box,
                label: {
                    options: {
                        visible: visibleLabel
                    },
                    createVisual: function() {
                        return [{label: true}]
                    }
                }
            };
        }

        module("chart container / rendering", {
            setup: function() {
                setup([setupAxis(Box(1, 10, 1, 100), true)]);
                container.children = [{
                    options: {
                        clip: true
                    },
                    renderVisual: $.noop
                }];
                container.renderVisual();
                visual = container.visual;
            }
        });

        test("creates group", function() {
            equal(visual.nodeType, "Group");
        });

        test("creates clip path", function() {
            ok(visual.clip());
        });

        test("create clip path on each render", function() {
            var initialClip = container.visual.clip();
            container.renderVisual();
            var newClip = container.visual.clip();
            ok(newClip.id !== initialClip.id);
        });

        test("does not create clip path if no clipping should be applied", function() {
            container.children[0].options.clip = false;
            container.renderVisual();
            ok(!container.visual.clip());
        });

        test("sets clipBox", function() {
            ok(container.clipBox instanceof Box && container.clipBox !== undefined);
        });

        test("sets noclip option to labels", function() {
            container.children[0].points = [chartPoint(Box(10, 90, 20, 110), true)];

            container.renderVisual();

            ok(container.children[0].points[0].label.options.noclip);
        });

        test("does not set noclip option if label is not visible", function() {
            container.children[0].points = [chartPoint(Box(10, 90, 20, 110), false)];

            container.renderVisual();
            ok(!container.children[0].points[0].label.options.noclip);
        });

        test("does not set noclip option if point does not overlap clipbox", function() {
            container.children[0].points = [chartPoint(Box(10, 101, 20, 110), true)];

            container.renderVisual();
            ok(!container.children[0].points[0].label.options.noclip);
        });


        test("calls alignToClipBox method if available on the label", function() {
            point = chartPoint(Box(10, 90, 20, 110), true);
            point.label.alignToClipBox = function() {
                ok(true);
            };
            container.children[0].points = [point];

            container.renderVisual();
        });

    })();

})();
