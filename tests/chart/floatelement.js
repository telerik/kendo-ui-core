(function() {
    var dataviz = kendo.dataviz,
        Box = dataviz.Box2D,
        FloatElement = dataviz.FloatElement,
        extend = $.extend,
        floatElement,
        childBox,
        X = "x",
        Y = "y",
        WIDTH = "width",
        HEIGHT = "height";

    var StubElement = function(box) {
        this.box = box;
        this.reflow = function(box) {
            this.box = box;
        };
    };

    function createStubElement(elementBox) {
        return new StubElement(elementBox);
    }

    function createFloatElement(options, children) {
        var element = new FloatElement(options);
        element.children = children || [];

        return element;
    }

    function compareChildrenBoxes(element, childrenBoxes, field) {
        var children = element.children;
        var length = children.length;
        for (var idx = 0; idx < length; idx++) {
            compareBoxes(children[idx].box,  childrenBoxes[idx], field);
        }
    }

    function compareBoxes(box1, box2, field) {
        if (field) {
            equal(box1[field + 1], box2[field + 1]);
            equal(box1[field + 2], box2[field + 2]);
        } else {
            equal(box1.x1, box2.x1);
            equal(box1.x2, box2.x2);
            equal(box1.y1, box2.y1);
            equal(box1.y2, box2.y2);
        }
    }

    //----------------------------------------------------------------------
    module("FloatElement", {});

    test("Sets fields for vertical layout", function() {
        floatElement = createFloatElement({
            vertical: true
        });

        equal(floatElement.groupAxis, X);
        equal(floatElement.elementAxis, Y);
        equal(floatElement.groupSizeField, WIDTH);
        equal(floatElement.elementSizeField, HEIGHT);
    });

    test("Sets spacing for vertical layout", function() {
        floatElement = createFloatElement({
            vertical: true,
            spacing: 5,
            vSpacing: 10
        });

        equal(floatElement.groupSpacing, 5);
        equal(floatElement.elementSpacing, 10);
    });

    test("Sets fields for horizontal layout", function() {
        floatElement = createFloatElement({
            vertical: false
        });

        equal(floatElement.groupAxis, Y);
        equal(floatElement.elementAxis, X);
        equal(floatElement.groupSizeField, HEIGHT);
        equal(floatElement.elementSizeField, WIDTH);
    });

    test("Sets spacing for horizontal layout", function() {
        floatElement = createFloatElement({
            vertical: false,
            spacing: 5,
            vSpacing: 10
        });

        equal(floatElement.groupSpacing, 10);
        equal(floatElement.elementSpacing, 5);
    });

    test("reflows children in a 1000 x 1000 box if the target box has 0 width and height", 4, function() {
        floatElement = createFloatElement({
            vertical: true
        }, [{
            reflow: function(targetBox) {
                equal(targetBox.width(), 1000);
                equal(targetBox.height(), 1000);
                this.box = targetBox.clone();
            }
        }]);

        floatElement.reflow(Box());
    });

    (function() {
        var containerBox = Box(10, 10, 100, 100);

        function setupElement(options, children) {
            floatElement = new FloatElement(extend({
                vertical: true
            }, options));

            floatElement.children = children || [createStubElement(Box(0, 0, 20, 10)), createStubElement(Box(0, 0, 30, 20))];
        }

        //----------------------------------------------------------------------
        module("FloatElement / Vertical ", {
            setup: function() {
                setupElement();
            }
        });

        test("stacks children vertically", function() {
            floatElement.reflow(containerBox);
            compareChildrenBoxes(floatElement, [Box(0,10,0, 20), Box(0,20,0, 40)], Y);
        });

        //----------------------------------------------------------------------
        module("FloatElement / Vertical / spacing", {
            setup: function() {
                setupElement({
                    vSpacing: 10,
                    spacing: 5
                });
            }
        });

        test("adds vertical spacing to the elements", function() {
            floatElement.reflow(containerBox);
            compareChildrenBoxes(floatElement, [Box(0, 10, 0, 20), Box(0, 30, 0, 50)], Y);
        });

        test("sets its box to the minimum bounding box", function() {
            floatElement.reflow(containerBox);
            compareBoxes(floatElement.box, Box(10, 10, 40, 50));
        });

        //----------------------------------------------------------------------
        module("FloatElement / Vertical / align / left", {
            setup: function() {
                setupElement();
            }
        });

        test("aligns children", function() {
            floatElement.reflow(containerBox);
            compareChildrenBoxes(floatElement, [Box(10,0,30,0), Box(10,0,40,0)], X);
        });

        test("aligns children in a tight box", function() {
            floatElement.reflow(Box(10,10,20,60));
            compareChildrenBoxes(floatElement, [Box(10,0,30,0), Box(10,0,40,0)], X);
        });

        test("sets its box to the minimum bounding box ", function() {
            floatElement.reflow(containerBox);
            compareBoxes(floatElement.box, Box(10, 10, 40, 40));
        });

        //----------------------------------------------------------------------
        module("FloatElement / Vertical / align / center", {
            setup: function() {
                setupElement({
                    align: "center"
                });
            }
        });

        test("aligns children", function() {
            floatElement.reflow(containerBox);
            compareChildrenBoxes(floatElement, [Box(45, 0, 65, 0), Box(40, 0, 70, 0)], X);
        });

        test("aligns children in a tight box", function() {
            floatElement.reflow(Box(10,10,20,60));
            compareChildrenBoxes(floatElement, [Box(5, 0, 25, 0), Box(0, 0, 30, 0)], X);
        });

        test("sets its box to the minimum bounding box ", function() {
            floatElement.reflow(containerBox);
            compareBoxes(floatElement.box, Box(40, 10, 70, 40));
        });

        //----------------------------------------------------------------------
        module("FloatElement / Vertical / align / right", {
            setup: function() {
                setupElement({
                    align: "right"
                });
            }
        });

        test("aligns children", function() {
            floatElement.reflow(containerBox);
            compareChildrenBoxes(floatElement, [Box(80, 0, 100, 0), Box(70, 0, 100, 0)], X);
        });

        test("aligns children in a tight box", function() {
            floatElement.reflow(Box(10,10,20,60));
            compareChildrenBoxes(floatElement, [Box(0, 0, 20, 0), Box(-10, 0, 20, 0)], X);
        });

        test("sets its box to the minimum bounding box", function() {
            floatElement.reflow(containerBox);
            compareBoxes(floatElement.box, Box(70, 10, 100, 40));
        });

        //----------------------------------------------------------------------
        module("FloatElement / Horizontal ", {
            setup: function() {
                setupElement({
                    vertical: false
                });
            }
        });

        test("stacks children horizontally", function() {
            floatElement.reflow(containerBox);
            compareChildrenBoxes(floatElement, [Box(10, 0, 30, 0), Box(30, 0, 60, 0)], X);
        });

        //----------------------------------------------------------------------
        module("FloatElement / Horizontal / spacing", {
            setup: function() {
                setupElement({
                    vertical: false,
                    vSpacing: 10,
                    spacing: 5
                });
            }
        });

        test("adds horizontal spacing to the elements", function() {
            floatElement.reflow(containerBox);
            compareChildrenBoxes(floatElement, [Box(10, 0, 30, 0), Box(35, 0, 65, 0)], X);
        });

        test("sets its box to the minimum bounding box", function() {
            floatElement.reflow(containerBox);
            compareBoxes(floatElement.box, Box(10, 10, 65, 30));
        });

        //----------------------------------------------------------------------
        module("FloatElement / Horizontal / align / top", {
            setup: function() {
                setupElement({
                    vertical: false
                });
            }
        });

        test("aligns children", function() {
            floatElement.reflow(containerBox);
            compareChildrenBoxes(floatElement, [Box(0, 10, 0, 20), Box(0, 10, 0, 30)], Y);
        });

        test("aligns children in a tight box", function() {
            floatElement.reflow(Box(10,10,60,20));
            compareChildrenBoxes(floatElement, [Box(0, 10, 0, 20), Box(0, 10, 0, 30)], Y);
        });

        test("sets its box to the minimum bounding box ", function() {
            floatElement.reflow(containerBox);
            compareBoxes(floatElement.box, Box(10, 10, 60, 30));
        });

        //----------------------------------------------------------------------
        module("FloatElement / Horizontal / align / center", {
            setup: function() {
                setupElement({
                    vertical: false,
                    align: "center"
                });
            }
        });

        test("aligns children", function() {
            floatElement.reflow(containerBox);
            compareChildrenBoxes(floatElement, [Box(0, 50, 0, 60), Box(0, 45, 0, 65)], Y);
        });

        test("aligns children in a tight box", function() {
            floatElement.reflow(Box(10,10,60,20));
            compareChildrenBoxes(floatElement, [Box(0, 10, 0, 20), Box(0, 5, 0, 25)], Y);
        });

        test("sets its box to the minimum bounding box ", function() {
            floatElement.reflow(containerBox);
            compareBoxes(floatElement.box, Box(10, 45, 60, 65));
        });

        //----------------------------------------------------------------------
        module("FloatElement / Horizontal / align / bottom", {
            setup: function() {
                setupElement({
                    vertical: false,
                    align: "bottom"
                });
            }
        });

        test("aligns children", function() {
            floatElement.reflow(containerBox);
            compareChildrenBoxes(floatElement, [Box(0, 90, 0, 100), Box(0, 80, 0, 100)], Y);
        });

        test("aligns children in a tight box", function() {
            floatElement.reflow(Box(10,10,60,20));
            compareChildrenBoxes(floatElement, [Box(0, 10, 0, 20), Box(0, 0, 0, 20)], Y);
        });

        test("sets its box to the minimum bounding box", function() {
            floatElement.reflow(containerBox);
            compareBoxes(floatElement.box, Box(10, 80, 60, 100));
        });

    })();

    //----------------------------------------------------------------------

    (function() {
        var containerBox = Box(10, 10, 65, 65);

        function setupElement(options, children) {
            floatElement = new FloatElement(extend({
                vertical: true
            }, options));

            floatElement.children = children || [createStubElement(Box(0, 0, 10, 10)),
                createStubElement(Box(0, 0, 20, 20)), createStubElement(Box(0, 0, 30, 30))];
        }

        //----------------------------------------------------------------------
        module("FloatElement / Multiple Groups / Vertical ", {});

        test("stacks children vertically in more than one group", function() {
            setupElement();
            floatElement.reflow(containerBox);
            compareChildrenBoxes(floatElement, [Box(0, 10, 0, 20), Box(0, 20, 0, 40), Box(0, 10, 0, 40)], Y);
        });

        test("stacks children vertically in one group if the wrap option is set to false", function() {
            setupElement({
                wrap: false
            });
            floatElement.reflow(containerBox);
            compareChildrenBoxes(floatElement, [Box(0, 10, 0, 20), Box(0, 20, 0, 40), Box(0, 40, 0, 70)], Y);
        });

        //----------------------------------------------------------------------
        module("FloatElement / Multiple Groups / Vertical / spacing", {
            setup: function() {
                setupElement({
                    vSpacing: 10,
                    spacing: 5
                });
            }
        });

        test("adds vertical spacing to the elements", function() {
            floatElement.reflow(containerBox);
            compareChildrenBoxes(floatElement, [Box(0, 10, 0, 20), Box(0, 30, 0, 50), Box(0, 10, 0, 40)], Y);
        });

        test("adds horizontal spacing between the groups", function() {
            floatElement.reflow(containerBox);
            compareChildrenBoxes(floatElement, [Box(10, 0, 20, 0), Box(10, 0, 30, 0), Box(35, 0, 65, 0)], X);
        });

        test("sets its box to the minimum bounding box", function() {
            floatElement.reflow(containerBox);
            compareBoxes(floatElement.box, Box(10, 10, 65, 50));
        });

        //----------------------------------------------------------------------
        module("FloatElement / Multiple Groups / Vertical / align / left", {
            setup: function() {
                setupElement();
            }
        });

        test("aligns children", function() {
            floatElement.reflow(containerBox);
            compareChildrenBoxes(floatElement, [Box(10, 0, 20, 0), Box(10, 0, 30, 0), Box(30, 0, 60, 0)], X);
        });

        test("aligns children in a tight box", function() {
            floatElement.reflow(Box(10, 10, 20, 65));
            compareChildrenBoxes(floatElement, [Box(10, 0, 20, 0), Box(10, 0, 30, 0), Box(30, 0, 60, 0)], X);
        });

        test("sets its box to the minimum bounding box ", function() {
            floatElement.reflow(containerBox);
            compareBoxes(floatElement.box, Box(10, 10, 60, 40));
        });

        //----------------------------------------------------------------------
        module("FloatElement / Multiple Groups / Vertical / align / center", {
            setup: function() {
                setupElement({
                    align: "center"
                });
            }
        });

        test("aligns children", function() {
            floatElement.reflow(containerBox);
            compareChildrenBoxes(floatElement, [Box(17.5, 0, 27.5, 0), Box(12.5, 0, 32.5, 0), Box(32.5, 0, 62.5, 0)], X);
        });

        test("aligns children in a tight box", function() {
            floatElement.reflow(Box(10, 10, 20, 65));
            compareChildrenBoxes(floatElement, [Box(-5, 0, 5, 0), Box(-10, 0, 10, 0), Box(10, 0, 40, 0)], X);
        });

        test("sets its box to the minimum bounding box ", function() {
            floatElement.reflow(containerBox);
            compareBoxes(floatElement.box, Box(12.5, 10, 62.5, 40));
        });

        //----------------------------------------------------------------------
        module("FloatElement / Multiple Groups / Vertical / align / right", {
            setup: function() {
                setupElement({
                    align: "right"
                });
            }
        });

        test("aligns children", function() {
            floatElement.reflow(containerBox);
            compareChildrenBoxes(floatElement, [Box(25, 0, 35, 0), Box(15, 0, 35, 0), Box(35, 0, 65, 0)], X);
        });

        test("aligns children in a tight box", function() {
            floatElement.reflow(Box(10, 10, 20, 65));
            compareChildrenBoxes(floatElement, [Box(-20, 0, -10, 0), Box(-30, 0, -10, 0), Box(-10, 0, 20, 0)], X);
        });

        test("sets its box to the minimum bounding box", function() {
            floatElement.reflow(containerBox);
            compareBoxes(floatElement.box, Box(15, 10, 65, 40));
        });

        //----------------------------------------------------------------------
        module("FloatElement / Multiple Groups / Horizontal ", {});

        test("stacks children horizontally in more than one group", function() {
            setupElement({
                vertical: false
            });
            floatElement.reflow(containerBox);
            compareChildrenBoxes(floatElement, [Box(10, 0, 20, 0), Box(20, 0, 40, 0), Box(10, 0, 40, 0)], X);
        });

        test("stacks children horizontally in one group if the wrap option is set to false", function() {
            setupElement({
                vertical: false,
                wrap: false
            });
            floatElement.reflow(containerBox);
            compareChildrenBoxes(floatElement, [Box(10, 0, 20, 0), Box(20, 0, 40, 0), Box(40, 0, 70, 0)], X);
        });

        //----------------------------------------------------------------------
        module("FloatElement / Multiple Groups / Horizontal / spacing", {
            setup: function() {
                setupElement({
                    vertical: false,
                    vSpacing: 5,
                    spacing: 10
                });
            }
        });

        test("adds horizontal spacing to the elements", function() {
            floatElement.reflow(containerBox);
            compareChildrenBoxes(floatElement, [Box(10, 0, 20, 0), Box(30, 0, 50, 0), Box(10, 0, 40, 0)], X);
        });

        test("adds vertical spacing between the groups", function() {
            floatElement.reflow(containerBox);
            compareChildrenBoxes(floatElement, [Box(0, 10, 0, 20), Box(0, 10, 0, 30), Box(0, 35, 0, 65)], Y);
        });

        test("sets its box to the minimum bounding box", function() {
            floatElement.reflow(containerBox);
            compareBoxes(floatElement.box, Box(10, 10, 50, 65));
        });

        //----------------------------------------------------------------------
        module("FloatElement / Multiple Groups / Horizontal / align / top", {
            setup: function() {
                setupElement({
                    vertical: false
                });
            }
        });

        test("aligns children", function() {
            floatElement.reflow(containerBox);
            compareChildrenBoxes(floatElement, [Box(0, 10, 0, 20), Box(0, 10, 0, 30), Box(0, 30, 0, 60)], Y);
        });

        test("aligns children in a tight box", function() {
            floatElement.reflow(Box(10, 10, 65, 20));
            compareChildrenBoxes(floatElement, [Box(0, 10, 0, 20), Box(0, 10, 0, 30), Box(0, 30, 0, 60)], Y);
        });

        test("sets its box to the minimum bounding box ", function() {
            floatElement.reflow(containerBox);
            compareBoxes(floatElement.box, Box(10, 10, 40, 60));
        });

        //----------------------------------------------------------------------
        module("FloatElement / Multiple Groups / Horizontal / align / center", {
            setup: function() {
                setupElement({
                    vertical: false,
                    align: "center"
                });
            }
        });

        test("aligns children", function() {
            floatElement.reflow(containerBox);
            compareChildrenBoxes(floatElement, [Box(0, 17.5, 0, 27.5), Box(0, 12.5, 0, 32.5), Box(0, 32.5, 0, 62.5)], Y);
        });

        test("aligns children in a tight box", function() {
            floatElement.reflow(Box(10, 10, 65, 20));
            compareChildrenBoxes(floatElement, [Box(0, -5, 0, 5), Box(0, -10, 0, 10), Box(0, 10, 0, 40)], Y);
        });

        test("sets its box to the minimum bounding box ", function() {
            floatElement.reflow(containerBox);
            compareBoxes(floatElement.box, Box(10, 12.5, 40, 62.5));
        });

        //----------------------------------------------------------------------
        module("FloatElement / Multiple Groups / Horizontal / align / bottom", {
            setup: function() {
                setupElement({
                    vertical: false,
                    align: "bottom"
                });
            }
        });

        test("aligns children", function() {
            floatElement.reflow(containerBox);
            compareChildrenBoxes(floatElement, [Box(0, 25, 0, 35), Box(0, 15, 0, 35), Box(0, 35, 0, 65)], Y);
        });

        test("aligns children in a tight box", function() {
            floatElement.reflow(Box(10, 10, 65, 20));
            compareChildrenBoxes(floatElement, [Box(0, -20, 0, -10), Box(0, -30, 0, -10), Box(0, -10, 0, 20)], Y);
        });

        test("sets its box to the minimum bounding box", function() {
            floatElement.reflow(containerBox);
            compareBoxes(floatElement.box, Box(10, 15, 40, 65));
        });

    })();

})();