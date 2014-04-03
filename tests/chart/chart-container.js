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
        var view,
            viewElements,
            point;

        function chartPoint(box, visibleLabel) {
            return {
                box: box,
                label: {
                    options: {
                        visible: visibleLabel
                    },
                    getViewElements: function(view) {
                        return [{label: true}]
                    }
                }
            };
        }

        module("chart container / view elements", {
            setup: function() {
                view = new ViewStub();
                setup([setupAxis(Box(1, 10, 1, 100), true)]);
                container.children = [{
                    options: {
                        clip: true
                    },
                    getViewElements: function() {
                        return [];
                    }
                }];
                container.getViewElements(view);
            }
        });

        test("creates clip path", function() {
            equal(view.log.clipPath.length, 1);
        });

        test("creates clip path on each redraw with same id", function() {
            container.getViewElements(view);
            equal(view.log.clipPath.length, 2);
            equal(view.log.clipPath[0].id, view.log.clipPath[1].id);
        });

        test("does not create clip path if no clipping should be applied", function() {
            container.children[0].options.clip = false;
            view = new ViewStub();
            container.getViewElements(view);
            equal(view.log.clipPath.length, 0);
        });

        test("creates group with clipPathId", function() {
            equal(view.log.group.length, 1);
            equal(view.log.group[0].options.clipPathId, container.clipPathId);
        });

        test("creates group without clippathid if no clipping should be applied", function() {
            container.children[0].options.clip = false;
            viewElements = container.getViewElements(view);            
            equal(viewElements.length, 1);
            equal(viewElements[0].options.clipPathId, undefined);
            
        });

        test("sets clipBox", function() {
            ok(container.clipBox instanceof Box && container.clipBox !== undefined);
        });

        test("moves labels after clipping group", function() {
            container.children[0].points = [chartPoint(Box(10, 90, 20, 110), true)];

            viewElements = container.getViewElements(view);
            ok(viewElements[0].options.clipPathId);
            ok(viewElements[1].label);
        });

        test("does not render label if not visible", function() {
            container.children[0].points = [chartPoint(Box(10, 90, 20, 110), false)];

            viewElements = container.getViewElements(view);
            equal(viewElements.length, 1);
            ok(!viewElements[0].label);
        });

        test("does not render label if point does not overlap clipbox", function() {
            container.children[0].points = [chartPoint(Box(10, 101, 20, 110), true)];

            viewElements = container.getViewElements(view);
            equal(viewElements.length, 1);
            ok(!viewElements[0].label);
        });

        test("sets label visible option to false", function() {
            point = chartPoint(Box(10, 90, 20, 110), true);
            container.children[0].points = [point];

            container.getViewElements(view);
            equal(point.label.options.visible, false);
        });

        test("calls alignToClipBox method if available on the label", function() {
            point = chartPoint(Box(10, 90, 20, 110), true);
            point.label.alignToClipBox = function() {
                ok(true);
            };
            container.children[0].points = [point];

            container.getViewElements(view);
        });

    })();

})();