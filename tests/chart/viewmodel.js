(function() {
    var dataviz = kendo.dataviz,
        IDPool = dataviz.IDPool,
        Box2D = dataviz.Box2D,
        Point2D = dataviz.Point2D,
        getElement = dataviz.getElement,
        chartBox = new Box2D(5, 5, 1000, 1000),
        uniqueId = dataviz.uniqueId,
        view,
        TOLERANCE = 2;

    function ChartElementStub(viewElement) {
        viewElement = viewElement || new ViewElementStub();
        this.getView = function() {
            return viewElement;
        },

        this.getViewElements = function() {
            return [viewElement];
        },

        this.reflow = function() { }
    }

    function moduleSetup() {
        view = new ViewStub();
    }

    function moduleTeardown() {
    }


    (function() {
        var chartElement;

        // ------------------------------------------------------------
        module("ChartElement", {
            setup: function() {
                moduleSetup();

                chartElement = new dataviz.ChartElement();
            }
        });

        test("box wraps children", function() {
            var childStub = {
                reflow: function() { },
                box: new dataviz.Box2D(10, 10, 100, 100)
            };

            chartElement.children.push(childStub);
            chartElement.reflow();

            sameBox(chartElement.box, childStub.box);
        });

        test("parent set to appended children", function() {
            var child = new dataviz.ChartElement();
            chartElement.append(child);
            ok(child.parent === chartElement);
        });

        test("getRoot returns root for first level children", function() {
            var child = new dataviz.ChartElement();

            chartElement.getRoot = function() { return this; }

            chartElement.append(child);
            ok(child.getRoot() === chartElement);
        });

        test("getRoot returns root for second level children", function() {
            var child1 = new dataviz.ChartElement(),
                child2 = new dataviz.ChartElement();

            chartElement.getRoot = function() { return this; }

            child1.append(child2);
            chartElement.append(child1);

            ok(child2.getRoot() === chartElement);
        });

        test("enableDiscovery assigns unique model id", function() {
            chartElement.enableDiscovery();
            ok(chartElement.modelId.length > 0);
        });

        test("getViewElements registers model id in root", function() {
            var root = new dataviz.RootElement();

            root.append(chartElement);
            chartElement.enableDiscovery();
            chartElement.getViewElements(view);

            ok(root.modelMap[chartElement.modelId]);
        });

        test("getViewElements associates children with discoverable elements", function() {
            var child1 = new dataviz.ChartElement(),
                child2 = new dataviz.ChartElement();

            child1.append(child2);
            chartElement.append(child1);

            chartElement.enableDiscovery();
            chartElement.getViewElements(view);

            equal(chartElement.modelId, child1.modelId);
            equal(chartElement.modelId, child2.modelId);
        });

        test("getViewElements does not register associated elements", function() {
            var root = new dataviz.RootElement(),
                child = new dataviz.ChartElement();

            chartElement.append(child);
            root.append(chartElement);

            chartElement.enableDiscovery();
            chartElement.getViewElements(view);
            child.getViewElements(view);

            ok(root.modelMap[child.modelId] == chartElement);
        });

        test("getViewElements does not associate already discoverable children", function() {
            var child1 = new dataviz.ChartElement();

            child1.enableDiscovery();

            chartElement.enableDiscovery();
            chartElement.append(child1);

            chartElement.getViewElements(view);

            notEqual(chartElement.modelId, child1.modelId);
        });

        // ------------------------------------------------------------
        var pool,
            originalPool;

        module("ChartElement / destroy", {
            setup: function() {
                chartElement = new dataviz.ChartElement();

                originalPool = IDPool.current;
                pool = IDPool.current = new IDPool(10, "", 1);
            },
            teardown: function() {
                IDPool.current = originalPool;
            }
        });

        test("unregisters modelId from root", function() {
            var root = new dataviz.RootElement();

            root.append(chartElement);
            chartElement.enableDiscovery();
            chartElement.getViewElements(view);
            chartElement.destroy();

            ok(!root.modelMap[chartElement.modelId]);
        });

        test("unregisters modelId from IDPool", function() {
            chartElement.enableDiscovery();
            chartElement.destroy();

            equal(pool._pool.length, 1);
        });

        test("unregisters id from IDPool", function() {
            chartElement.id = uniqueId();
            chartElement.destroy();

            equal(pool._pool.length, 1);
        });

        test("destroys children", function() {
            var root = new dataviz.RootElement(),
                child1 = new dataviz.ChartElement(),
                child2 = new dataviz.ChartElement();

            child2.enableDiscovery();

            root.append(chartElement);
            chartElement.append(child1);
            child1.append(child2);

            chartElement.enableDiscovery();
            chartElement.getViewElements(view);
            chartElement.destroy();

            ok(!root.modelMap[child2.modelId]);
        });
    })();

    (function() {
        var rootElement,
            rootRect,
            MARGIN = 10;

        function createRoot(options) {
            rootElement = new dataviz.RootElement(options);

            rootElement.reflow();
        }

        function renderRoot() {
            rootElement.getViewElements(view);
            rootRect = view.log.rect[0];
        }

        // ------------------------------------------------------------
        module("RootElement", {
            setup: function() {
                moduleSetup();

                createRoot();
            }
        });

        test("creates view elements for child elements", function() {
            var group = new ViewElementStub(),
                text = new ViewElementStub();

            rootElement.children.push(new ChartElementStub(group));
            rootElement.children.push(new ChartElementStub(text));

            var viewElements = rootElement.getViewElements(view);
            viewElements.shift(); // Remove the rect
            deepEqual(viewElements, [ group, text ]);
        });

        test("reflow is called for all children", 2, function() {
            var childStub = {
                reflow: function() { ok(true); },
                box: new dataviz.Box2D()
            };

            rootElement.children.push(childStub, childStub);

            rootElement.reflow();
        });

        test("sets border to rootElement", function() {
            createRoot({
                border: {
                    width: 1,
                    color: "red",
                    dashType: "dot"
                }
            });
            renderRoot();

            sameBox(rootRect, new Box2D(1, 1, 599, 399));
            equal(rootRect.style.strokeWidth, 1);
            equal(rootRect.style.stroke, "red");
            equal(rootRect.style.dashType, "dot");
        });

        test("sets background to rootElement", function() {
            createRoot({
                background: "red"
            });
            renderRoot();

            equal(rootRect.style.fill, "red");
        });

        test("sets background opacity to rootElement", function() {
            createRoot({
                opacity: 0.1
            });
            renderRoot();

            equal(rootRect.style.fillOpacity, 0.1);
        });

        test("applies top margin", function() {
            createRoot({
                margin: {
                    top: MARGIN
                }
            });
            renderRoot();

            equal(rootElement.box.y1, rootRect.y1 + MARGIN);
        });

        test("applies right margin", function() {
            createRoot({
                margin: {
                    right: MARGIN
                }
            });
            renderRoot();

            equal(rootElement.box.x2, rootRect.x2 - MARGIN);
        });

        test("applies bottom margin", function() {
            createRoot({
                margin: {
                    bottom: MARGIN
                }
            });
            renderRoot();

            equal(rootElement.box.y2, rootRect.y2 - MARGIN);
        });

        test("applies left margin", function() {
            createRoot({
                margin: {
                    left: MARGIN
                }
            });
            renderRoot();

            equal(rootElement.box.x1, rootRect.x1 + MARGIN);
        });

        test("getRoot returns self", function() {
            ok(rootElement.getRoot() === rootElement);
        });

    })();

    (function() {
        var MARGIN = 3,
            PADDING = 2,
            BORDER = 1,
            WIDTH = 10,
            HEIGHT = 20,
            targetBox = new Box2D(100, 100, 200, 200),
            childBoxes,
            childrenBox = new Box2D(0, 0, 20, 20),
            boxElement,
            childElements;

        function ChildElementStub() {
            this.boxes = []
            this.reflow = function(box) {
                this.box = box;
                this.boxes.push(box.clone());
            }
        };

        // ------------------------------------------------------------
        module("BoxElement", {
            setup: function() {
                moduleSetup();

                boxElement = new dataviz.BoxElement({
                    width: WIDTH,
                    height: HEIGHT
                });
            }
        });

        test("sets width", function() {
            boxElement.reflow(targetBox);

            equal(boxElement.box.width(), WIDTH);
        });

        test("sets height", function() {
            boxElement.reflow(targetBox);

            equal(boxElement.box.height(), HEIGHT);
        });

        test("applies top margin", function() {
            boxElement.options.margin.top = MARGIN;
            boxElement.reflow(targetBox);

            deepEqual([boxElement.box.y1, boxElement.box.y2],
                 [targetBox.y1, targetBox.y1 + HEIGHT + MARGIN]);
        });

        test("applies right margin", function() {
            boxElement.options.margin.right = MARGIN;
            boxElement.reflow(targetBox);

            deepEqual([boxElement.box.x1, boxElement.box.x2],
                 [targetBox.x1, targetBox.x1 + WIDTH + MARGIN]);
        });

        test("applies bottom margin", function() {
            boxElement.options.margin.bottom = MARGIN;
            boxElement.reflow(targetBox);

            deepEqual([boxElement.box.y1, boxElement.box.y2],
                 [targetBox.y1, targetBox.y1 + HEIGHT + MARGIN]);
        });

        test("applies left margin", function() {
            boxElement.options.margin.left = MARGIN;
            boxElement.reflow(targetBox);

            deepEqual([boxElement.box.x1, boxElement.box.x2],
                 [targetBox.x1, targetBox.x1 + WIDTH + MARGIN]);
        });

        test("applies margins", function() {
            boxElement.options.margin = MARGIN;
            boxElement.reflow(targetBox);

            deepEqual([boxElement.box.x1, boxElement.box.y1,
                  boxElement.box.x2, boxElement.box.y2],
                 [targetBox.x1, targetBox.y1,
                  targetBox.x1 + WIDTH + 2 * MARGIN,
                  targetBox.y1 + HEIGHT + 2 * MARGIN]);
        });

        test("padding is added to outer box", function() {
            boxElement.options.padding = PADDING;
            boxElement.reflow(targetBox);

            equal(boxElement.box.width(), WIDTH + 2 * PADDING);
            equal(boxElement.box.height(), HEIGHT + 2 * PADDING);
        });

        test("padding is added to paddingBox", function() {
            boxElement.options.padding = PADDING;
            boxElement.reflow(targetBox);

            equal(boxElement.paddingBox.width(), WIDTH + 2 * PADDING);
            equal(boxElement.paddingBox.height(), HEIGHT + 2 * PADDING);
        });

        test("border is added to outer box", function() {
            boxElement.options.border.width = BORDER;
            boxElement.reflow(targetBox);

            equal(boxElement.box.width(), WIDTH + 2 * BORDER);
            equal(boxElement.box.height(), HEIGHT + 2 * BORDER);
        });

        test("border is not added to padding box", function() {
            boxElement.options.border.width = BORDER;
            boxElement.reflow(targetBox);

            equal(boxElement.paddingBox.width(), WIDTH);
            equal(boxElement.paddingBox.height(), HEIGHT);
        });

        test("margin is added to outer box", function() {
            boxElement.options.margin = MARGIN;
            boxElement.reflow(targetBox);

            equal(boxElement.box.width(), WIDTH + 2 * MARGIN);
            equal(boxElement.box.height(), HEIGHT + 2 * MARGIN);
        });

        test("margin is not added to padding box", function() {
            boxElement.options.margin = MARGIN;
            boxElement.reflow(targetBox);

            equal(boxElement.paddingBox.width(), WIDTH);
            equal(boxElement.paddingBox.height(), HEIGHT);
        });

        test("content box has no padding, border or margin", function() {
            boxElement.options.padding = PADDING;
            boxElement.options.border.width = BORDER;
            boxElement.options.margin = MARGIN;
            boxElement.reflow(targetBox);

            equal(boxElement.contentBox.width(), WIDTH);
            equal(boxElement.contentBox.height(), HEIGHT);
        });

        test("reflows children in box with the actual size", function() {
            boxElement.options.padding = PADDING;
            boxElement.options.border.width = BORDER;
            boxElement.options.margin = MARGIN;
            var stubElement = new ChildElementStub();
            boxElement.children = [stubElement];
            boxElement.reflow(targetBox);

            equal(stubElement.boxes[0].width(), WIDTH);
            equal(stubElement.boxes[0].height(), HEIGHT);
        });

        // ------------------------------------------------------------
        module("BoxElement / Shrink to fit", {
            setup: function() {
                moduleSetup();

                boxElement = new dataviz.BoxElement({
                    shrinkToFit: true,
                    width: WIDTH,
                    height: HEIGHT
                });
            }
        });

        test("padding is not added to outer box", function() {
            boxElement.options.padding = PADDING;
            boxElement.reflow(targetBox);

            equal(boxElement.box.width(), WIDTH);
            equal(boxElement.box.height(), HEIGHT);
        });

        test("padding is added to padding box", function() {
            boxElement.options.padding = PADDING;
            boxElement.reflow(targetBox);

            equal(boxElement.paddingBox.width(), WIDTH);
            equal(boxElement.paddingBox.height(), HEIGHT);
        });

        test("border is not added to outer box", function() {
            boxElement.options.border.width = BORDER;
            boxElement.reflow(targetBox);

            equal(boxElement.box.width(), WIDTH);
            equal(boxElement.box.height(), HEIGHT);
        });

        test("border is subtracted from padding box", function() {
            boxElement.options.border.width = BORDER;
            boxElement.reflow(targetBox);

            equal(boxElement.paddingBox.width(), WIDTH - 2 * BORDER);
            equal(boxElement.paddingBox.height(), HEIGHT - 2 * BORDER);
        });

        test("margin is not added to outer box", function() {
            boxElement.options.margin = MARGIN;
            boxElement.reflow(targetBox);

            equal(boxElement.box.width(), WIDTH);
            equal(boxElement.box.height(), HEIGHT);
        });

        test("margin is subtracted from padding box", function() {
            boxElement.options.margin = MARGIN;
            boxElement.reflow(targetBox);

            equal(boxElement.paddingBox.width(), WIDTH - 2 * MARGIN);
            equal(boxElement.paddingBox.height(), HEIGHT - 2 * MARGIN);
        });

        test("content box has padding, border and margin", function() {
            boxElement.options.padding = PADDING;
            boxElement.options.border.width = BORDER;
            boxElement.options.margin = MARGIN;
            boxElement.reflow(targetBox);

            var nonContent = 2 * PADDING + 2 * BORDER + 2 * MARGIN;

            equal(boxElement.contentBox.width(), WIDTH - nonContent);
            equal(boxElement.contentBox.height(), HEIGHT - nonContent);
        });

        test("reflows children in box with the actual size", function() {
            boxElement.options.padding = PADDING;
            boxElement.options.border.width = BORDER;
            boxElement.options.margin = MARGIN;
            boxElement.options.width = 50;
            boxElement.options.height = 50;
            var stubElement = new ChildElementStub();
            boxElement.children = [stubElement];
            boxElement.reflow(targetBox);

            equal(stubElement.boxes[0].width(), 38);
            equal(stubElement.boxes[0].height(), 38);
        });

        // ------------------------------------------------------------
        module("BoxElement / Alignment", {
            setup: function() {
                moduleSetup();
                boxElement = new dataviz.BoxElement({
                    width: WIDTH,
                    height: HEIGHT,
                    margin: MARGIN,
                    padding: PADDING,
                    border: { width: BORDER }
                });
            }
        });

        test("top alignment", function() {
            boxElement.reflow(targetBox);

            equal(boxElement.box.y1, targetBox.y1);
        });

        test("bottom alignment", function() {
            boxElement.options.vAlign = "bottom";
            boxElement.reflow(targetBox);

            equal(boxElement.box.y2, targetBox.y2);
        });

        test("vertical center alignment", function() {
            boxElement.options.vAlign = "center";
            boxElement.reflow(targetBox);

            equal(boxElement.box.y1,
                  targetBox.y1 + (targetBox.height() - boxElement.box.height()) / 2);
        });

        test("left alignment", function() {
            boxElement.reflow(targetBox);

            equal(boxElement.box.x1, targetBox.x1);
        });

        test("right alignment", function() {
            boxElement.options.align = "right";
            boxElement.reflow(targetBox);

            equal(boxElement.box.x2, targetBox.x2);
        });

        test("horizontal center alignment", function() {
            boxElement.options.align = "center";
            boxElement.reflow(targetBox);

            equal(boxElement.box.x1,
                  targetBox.x1 + (targetBox.width() - boxElement.box.width()) / 2);
        });

        // ------------------------------------------------------------
        module("BoxElement / With children", {
            setup: function() {
                moduleSetup();

                boxElement = new dataviz.BoxElement();
                childElements = [
                    new ChartElementStub(),
                    new ChartElementStub()
                ];

                childBoxes = [
                    new Box2D(0, 0, 10, 10),
                    new Box2D(0, 0, 20, 20)
                ];

                childElements[0].box = childBoxes[0];
                childElements[1].box = childBoxes[1];
                [].push.apply(boxElement.children, childElements);
            }
        });

        test("children set width", function() {
            boxElement.reflow(targetBox);

            equal(boxElement.box.width(), childrenBox.width());
        });

        test("children set height", function() {
            boxElement.reflow(targetBox);

            equal(boxElement.box.height(), childrenBox.height());
        });

        test("moves children from margins", function() {
            boxElement.options.margin = {
                left: 1,
                top: 2
            };
            boxElement.reflow(targetBox);

            $.each(childElements, function() {
                deepEqual([this.box.x1, this.box.y1],
                     [targetBox.x1 + 1, targetBox.y1 + 2]);
            });
        });

        test("moves children from padding", function() {
            boxElement.options.padding = {
                left: 1,
                top: 2
            };
            boxElement.reflow(targetBox);

            $.each(childElements, function() {
                deepEqual([this.box.x1, this.box.y1],
                     [targetBox.x1 + 1, targetBox.y1 + 2]);
            });
        });

        test("children moved after top alignment", function() {
            boxElement.reflow(targetBox);

            $.each(childElements, function() {
                equal(this.box.y1, targetBox.y1);
            });
        });

        test("children moved after bottom alignment", function() {
            boxElement.options.vAlign = "bottom";
            boxElement.reflow(targetBox);

            equal(childElements[0].box.y2, 190);
            equal(childElements[1].box.y2, 200);
        });

        test("children moved after vertical center alignment", function() {
            boxElement.options.vAlign = "center";
            boxElement.reflow(targetBox);

            equal(childElements[0].box.y1, 140);
            equal(childElements[1].box.y1, 140);
        });

        test("children moved after left alignment", function() {
            boxElement.reflow(targetBox);

            $.each(childElements, function() {
                equal(this.box.x1, targetBox.x1);
            });
        });

        test("children moved after right alignment", function() {
            boxElement.options.align = "right";
            boxElement.reflow(targetBox);

            equal(childElements[0].box.x2, 190);
            equal(childElements[1].box.x2, 200);
        });

        test("children moved after horizontal center alignment", function() {
            boxElement.options.align = "center";
            boxElement.reflow(targetBox);

            equal(childElements[0].box.x1, 140);
            equal(childElements[1].box.x1, 140);
        });

        // ------------------------------------------------------------
        module("BoxElement / Rendering", {
            setup: function() {
                moduleSetup();

                boxElement = new dataviz.BoxElement({
                    width: WIDTH,
                    height: HEIGHT,
                    border: { width: 1 },
                    background: "#f00"
                });
            }
        });

        test("does not render rectangle when no border and background are set", function() {
            boxElement = new dataviz.BoxElement();
            boxElement.reflow(targetBox);
            boxElement.getViewElements(view);
            equal(view.log.rect.length, 0);
        });

        test("renders border width", function() {
            boxElement.options.border.width = 1;
            boxElement.reflow(targetBox);
            boxElement.getViewElements(view);

            equal(view.log.rect[0].style.strokeWidth, 1);
        });

        test("renders border color", function() {
            boxElement.options.border.color = "#f00";
            boxElement.options.border.width = 1;
            boxElement.reflow(targetBox);
            boxElement.getViewElements(view);

            equal(view.log.rect[0].style.stroke, "#f00");
        });

        test("renders border dash type", function() {
            boxElement.options.border.width = 1;
            boxElement.options.border.dashType = "dot";
            boxElement.reflow(targetBox);
            boxElement.getViewElements(view);

            equal(view.log.rect[0].style.dashType, "dot");
        });

        test("renders opacity as strokeOpacity", function() {
            boxElement.options.opacity = 0.5;
            boxElement.reflow(targetBox);
            boxElement.getViewElements(view);

            equal(view.log.rect[0].style.strokeOpacity, 0.5);
        });

        test("does not render border color when no width is set", function() {
            boxElement.options.border.width = 0;
            boxElement.options.border.color = "#f00";
            boxElement.reflow(targetBox);
            boxElement.getViewElements(view);

            equal(view.log.rect[0].style.stroke, "");
        });

        test("renders fill color", function() {
            boxElement.options.background = "#f00";
            boxElement.reflow(targetBox);
            boxElement.getViewElements(view);

            equal(view.log.rect[0].style.fill, "#f00");
        });

        test("renders opacity as fillOpacity", function() {
            boxElement.options.opacity = 0.5;
            boxElement.reflow(targetBox);
            boxElement.getViewElements(view);

            equal(view.log.rect[0].style.fillOpacity, 0.5);
        });

        test("content box includes padding", function() {
            boxElement.options.padding = PADDING;
            boxElement.reflow(targetBox);
            boxElement.getViewElements(view);

            var rect = view.log.rect[0];
            equal(rect.x2 - rect.x1, WIDTH + 2 * PADDING);
            equal(rect.y2 - rect.y1, HEIGHT + 2 * PADDING);
        });

        test("padding box does not include border", function() {
            boxElement.options.border.width = BORDER;
            boxElement.reflow(targetBox);
            boxElement.getViewElements(view);

            var rect = view.log.rect[0];
            equal(rect.x2 - rect.x1, WIDTH);
            equal(rect.y2 - rect.y1, HEIGHT);
        });

        test("padding box does not include margin", function() {
            boxElement.options.margin = MARGIN;
            boxElement.reflow(targetBox);
            boxElement.getViewElements(view);

            var rect = view.log.rect[0];
            equal(rect.x2 - rect.x1, WIDTH);
            equal(rect.y2 - rect.y1, HEIGHT);
        });

        test("does not render when visible is false", function() {
            boxElement.options.visible = false;
            boxElement.reflow(targetBox);
            boxElement.getViewElements(view);

            equal(view.log.rect.length, 0);
        });

        test("renders id", function() {
            boxElement.id = "id";
            boxElement.reflow(targetBox);
            boxElement.getViewElements(view);

            equal(view.log.rect[0].style.id, "id");
        });

        test("renders model id as data", function() {
            boxElement.modelId = "id";
            boxElement.reflow(targetBox);
            boxElement.getViewElements(view);

            equal(view.log.rect[0].style.data.modelId, "id");
        });

        test("renders zIndex", function() {
            boxElement.options.zIndex = 100;
            boxElement.reflow(targetBox);
            boxElement.getViewElements(view);

            equal(view.log.rect[0].style.zIndex, 100);
        });

        test("renders cursor", function() {
            boxElement.options.cursor = {
                style: "pointer"
            };
            boxElement.reflow(targetBox);
            boxElement.getViewElements(view);

            equal(view.log.rect[0].style.cursor.style, "pointer");
        });

    })();

    (function() {
        var title,
            titleTextBox,
            titleText,
            Title = dataviz.Title,
            TITLE_TEXT_HEIGHT = 18,
            TITLE_TEXT_WIDTH = 29,
            MARGIN = 10,
            PADDING = 5;

        function createTitle(options) {
            title = new Title($.extend({
                text: "Title",
                font: SANS16,
                margin: MARGIN,
                padding: PADDING }, options));
            title.reflow(chartBox);
            titleTextBox = title.children[0],
            titleText = titleTextBox.children[0].children[0];
        }

        module("Title", {
            setup: function() {
                moduleSetup();

                createTitle();
            },
            teardown: moduleTeardown
        });

        test("text is created", function() {
            ok(titleText != null);

        });

        test("text element has set content", function() {
            equal(titleText.content, "Title");
        });

        test("text element has set font", function() {
            createTitle({
                font: "10px sans-serif"
            });
            equal(titleText.options.font, title.options.font);
        });

        test("text element has set color", function() {
            createTitle({
                color: "#cf0"
            });
            equal(titleText.options.color, title.options.color);
        });

        test("text box has set vAlign", function() {
            createTitle({
                position: "bottom"
            });

            equal(titleTextBox.options.vAlign, "bottom");
        });

        test("text box has set align", function() {
            createTitle({
                align: "right"
            });

            equal(titleTextBox.options.align, "right");
        });

        test("text box has set background", function() {
            createTitle({
                background: "#f00"
            });

            equal(titleTextBox.options.background, "#f00");
        });

        test("text is positioned at top", function() {
            equal(titleText.box.y1 - MARGIN - PADDING, chartBox.y1);
            close(titleText.box.y2 - MARGIN - PADDING,
                   chartBox.y1 + TITLE_TEXT_HEIGHT, TOLERANCE);
        });

        test("text is positioned at bottom", function() {
            createTitle({
                position: "bottom"
            });

            title.reflow(chartBox);
            close(titleText.box.y1 + MARGIN + PADDING,
                   chartBox.y2 - TITLE_TEXT_HEIGHT, TOLERANCE);
            equal(titleText.box.y2 + MARGIN + PADDING, chartBox.y2);
        });

        test("text is aligned at center", function() {
            close(titleText.box.x1,
                   chartBox.x1 + (chartBox.width() - TITLE_TEXT_WIDTH) / 2, TOLERANCE);
        });

        test("box width is equal to container width", function() {
            equal(title.box.width(), chartBox.width());
        });

        test("box height is equal to text height", function() {
            close(title.box.height() - MARGIN * 2 - PADDING * 2,
                   TITLE_TEXT_HEIGHT, TOLERANCE);
        });

        test("getViewElements returns text element", 1, function() {
            title.children[0] = {
                getViewElements: function() { return [ 42 ]; }
            };

            deepEqual(title.getViewElements(), [ 42 ]);
        });

        test("positions title at top with margin 20", function() {
            title = new Title({
                text: "Title",
                margin: MARGIN * 2
            });
            title.reflow(chartBox);

            title1 = new Title({
                text: "Title"
            });

            title1.reflow(chartBox);

            equal(title.box.height(),
                  title1.box.height() + MARGIN * 2 + PADDING * 2);
        });

        test("positions title at bottom with margin 20", function() {
            title = new Title({
                text: "Title",
                position: "bottom",
                margin: MARGIN * 2
            });

            title.reflow(chartBox);

            title1 = new Title({
                text: "Title",
                position: "bottom"
            });

            title1.reflow(chartBox);

            equal(title.box.height(),
                  title1.box.height() + MARGIN * 2 + PADDING * 2);
        });

        // ------------------------------------------------------------
        var parent;

        module("Title / buildTitle", {
            setup: function() {
                parent = new dataviz.ChartElement();
            },
            teardown: moduleTeardown
        });

        test("creates a title from string", function() {
            title = Title.buildTitle("Title", parent);
            equal(title.options.text, "Title");
        });

        test("creates a title from options with text", function() {
            title = Title.buildTitle({ text: "Title" }, parent);
            equal(title.options.text, "Title");
        });

        test("does not create title when not visible", function() {
            title = Title.buildTitle({ text: "Title", visible: false }, parent);
            equal(title, undefined);
        });

        test("does not create title without text", function() {
            title = Title.buildTitle({ text: "" }, parent);
            equal(title, undefined);
        });

        test("applies default options", function() {
            title = Title.buildTitle("Title", parent, { flag: true });
            equal(title.options.flag, true);
        });

    })();

    (function() {
        var text;

        module("Text", {
            setup: function() {
                moduleSetup();

                text = new dataviz.Text("&nbsp;", { font: SANS12 });
            },
            teardown: moduleTeardown
        });

        test("creates text view element", function() {
            var view = {
                createText: function() {
                    return 42;
                }
            };

            deepEqual(text.getViewElements(view), [ 42 ]);
        });

        test("sets content on view element", 1, function() {
            var view = {
                createText: function(content) {
                    equal(content, "Content");
                }
            };

            text.content = "Content";
            text.getViewElements(view)
        });

        test("sets position on view element", 2, function() {
            var view = {
                createText: function(content, options) {
                    equal(options.x, 100);
                    equal(options.y, 110);
                }
            };

            text.reflow(new Box2D(100, 110, 200, 200));
            text.getViewElements(view)
        });

        test("sets font", 1, function() {
            var view = {
                createText: function(content, options) {
                    equal(options.font, text.options.font);
                }
            };

            text.reflow(new Box2D());
            text.getViewElements(view)
        });

        test("sets color", 1, function() {
            var view = {
                createText: function(content, options) {
                    equal(options.color, text.options.color);
                }
            };

            text.reflow(new Box2D());
            text.getViewElements(view)
        });

        test("renders id", function() {
            text.id = "id";
            text.reflow(new Box2D());
            text.getViewElements(view);

            equal(view.log.text[0].style.id, "id");
        });

        test("renders model id as data", function() {
            text.modelId = "id";
            text.reflow(new Box2D());
            text.getViewElements(view);

            equal(view.log.text[0].style.data.modelId, "id");
        });

        test("renders zIndex", function() {
            text.options.zIndex = 100;
            text.reflow(new Box2D());
            text.getViewElements(view);

            equal(view.log.text[0].style.zIndex, 100);
        });

        test("renders baseline", function() {
            text.reflow(new Box2D());
            text.getViewElements(view);

            close(view.log.text[0].style.baseline, 13, TOLERANCE);
        });

    })();

    (function() {
        var textBox,
            TextBox = dataviz.TextBox,
            FloatElement = dataviz.FloatElement,
            Text = dataviz.Text,
            TEXT = "text",
            floatElement,
            floatElementStub,
            targetBox = Box2D(0, 0, 100, 100),
            texts,
            rect;

        function createTextBox(options, text) {
            textBox = new TextBox(text || TEXT, options);
            floatElement = textBox.children[0];
            texts = floatElement.children;
        }

        // ------------------------------------------------------------
        module("TextBox", {});

        test("retains id", function() {
            createTextBox({ id: "1" });
            equal(textBox.id, "1");
        });

        test("appends float element", function() {
            createTextBox();
            ok(floatElement instanceof FloatElement);
            ok(floatElement.parent === textBox);
        });

        test("sets align to float element from its options", function() {
            createTextBox({align: "right"});
            equal(floatElement.options.align, "right");
        });

        test("sets float element wrap to false", function() {
            createTextBox();
            equal(floatElement.options.wrap, false);
        });

        test("sets float element direction to vertical", function() {
            createTextBox();
            equal(floatElement.options.vertical, true);
        });

        test("appends text to float element", function() {
            createTextBox();
            ok(texts[0] instanceof Text);
            ok(texts[0].parent === floatElement);
        });

        test("passes text options", function() {
            createTextBox({font: "foo", color: "bar", cursor: {style: "baz"}});
            var options = texts[0].options;
            equal(options.font, "foo");
            equal(options.color, "bar");
            equal(options.cursor.style, "baz");
        });

        test("sets text vertical align to top", function() {
            createTextBox();
            equal(texts[0].options.vAlign, "top");
        });

        test("sets text align to left", function() {
            createTextBox();
            equal(texts[0].options.align, "left");
        });

        test("sets text rotation to zero", function() {
            createTextBox({rotation: 30});
            equal(texts[0].options.rotation, 0);
        });

        test("sets options id on text", function() {
            createTextBox({ id: "1" });
            equal(texts[0].id, "1");
        });

        test("assigns unique id to text when background or border is set", function() {
            createTextBox({ id: "1", border: { width: 1 }});

            var id = texts[0].id;
            notEqual(id, "1");
            ok(id);
        });

        test("creates text when passed content is a number", function() {
            createTextBox({}, 1);
            ok(texts[0]);
        });

        test("splits text by line feed and creates a appends text to float element for each line", function() {
            createTextBox({}, "line1 \n line2");
            ok(texts[0] instanceof Text);
            equal(texts[0].content, "line1");
            ok(texts[1] instanceof Text);
            equal(texts[1].content, "line2");
        });

        test("multiline text assigns unique id to each text if textbox has box", function() {
            createTextBox({id: "1", background: "red"}, "line1 \n line2");
            ok(texts[0].id);
            notEqual(texts[0].id, "1");
            ok(texts[1].id);
            notEqual(texts[1].id, "1");
        });

        test("multiline assigns id from options to first text and a unique one to each subsequent text when textbox has no box", function() {
            createTextBox({id: "1"}, "line1 \n line2");
            equal(texts[0].id, "1");
            ok(texts[1].id);
            notEqual(texts[1].id, "1");
        });

        test("has box after the initialization", function() {
            textBox = new TextBox(TEXT, {});
            ok(textBox.box);
        });

        // ------------------------------------------------------------

        function FloatElementStub(box) {
            this.box = box;
            this.reflow = function(target) {
                //this.box = target.clone();
            };
            this.getViewElements = function() {
                return [];
            };
            this.options = {};
        }

        function createTextBoxMock(options, floatBox) {
            createTextBox($.extend({
                align: "left",
                vAlign: "top"
            }, options));
            floatElementStub = new FloatElementStub(floatBox || Box2D(0,0,30,30));
            textBox.children = [floatElementStub];
            textBox.container = floatElementStub;
        }

        function compareBoxes(box1, box2) {
            equal(box1.x1, box2.x1);
            equal(box1.x2, box2.x2);
            equal(box1.y1, box2.y1);
            equal(box1.y2, box2.y2);
        }

        module("TextBox / reflow", {});

        test("updates float element align option", function() {
            createTextBoxMock();
            textBox.options.align = "right";
            textBox.reflow(targetBox);
            equal(floatElementStub.options.align, "right");
        });

        test("applies margin", function() {
            createTextBoxMock({margin: 5});
            textBox.reflow(targetBox);
            compareBoxes(textBox.box, floatElementStub.box.pad(5));
        });

        test("applies padding", function() {
            createTextBoxMock({padding: 10});
            textBox.reflow(targetBox);
            compareBoxes(textBox.box, floatElementStub.box.pad(10));
        });

        test("applies border", function() {
            createTextBoxMock({border: {width: 15}});
            textBox.reflow(targetBox);
            compareBoxes(textBox.box, floatElementStub.box.pad(15));
        });

        // ------------------------------------------------------------
        module("TextBox / reflow / align", {
            setup: function() {
                createTextBoxMock();
            }
        });

        test("top", function() {
            textBox.options.vAlign = "top";
            textBox.reflow(targetBox);
            equal(floatElementStub.box.y1, 0);
            equal(floatElementStub.box.y2, 30);
            equal(textBox.box.y1, 0);
            equal(textBox.box.y2, 30);
        });

        test("bottom", function() {
            textBox.options.vAlign = "bottom";
            textBox.reflow(targetBox);
            equal(floatElementStub.box.y1, 70);
            equal(floatElementStub.box.y2, 100);
            equal(textBox.box.y1, 70);
            equal(textBox.box.y2, 100);
        });

        test("vertical center", function() {
            textBox.options.vAlign = "center";
            textBox.reflow(targetBox);
            equal(floatElementStub.box.y1, 35);
            equal(floatElementStub.box.y2, 65);
            equal(textBox.box.y1, 35);
            equal(textBox.box.y2, 65);
        });

        test("left", function() {
            textBox.options.align = "left";
            textBox.reflow(targetBox);
            equal(floatElementStub.box.x1, 0);
            equal(floatElementStub.box.x2, 30);
            equal(textBox.box.x1, 0);
            equal(textBox.box.x2, 30);
        });

        test("right", function() {
            textBox.options.align = "right";
            textBox.reflow(targetBox);
            equal(floatElementStub.box.x1, 70);
            equal(floatElementStub.box.x2, 100);
            equal(textBox.box.x1, 70);
            equal(textBox.box.x2, 100);
        });

        test("horizontal center", function() {
            textBox.options.align = "center";
            textBox.reflow(targetBox);
            equal(floatElementStub.box.x1, 35);
            equal(floatElementStub.box.x2, 65);
            equal(textBox.box.x1, 35);
            equal(textBox.box.x2, 65);
        });

        // ------------------------------------------------------------
        module("TextBox / reflow / rotation", {
            setup: function() {
                createTextBoxMock({rotation: 90}, Box2D(0,0,20,30));
            }
        });

        test("rotates box", function() {
            textBox.reflow(targetBox);
            compareBoxes(textBox.box, Box2D(0,0, 30, 20));
        });

        test("sets normal box to box prior to rotation", function() {
            textBox.reflow(targetBox);
            compareBoxes(textBox.normalBox, Box2D(0,0, 20, 30));
        });

        test("sets normal box to box prior to rotation without margin", function() {
            textBox.options.margin = 5;
            textBox.reflow(targetBox);
            compareBoxes(textBox.normalBox, Box2D(5,5, 25, 35));
        });

        test("rotates box without margin and applies margin to the rotated box", function() {
            textBox.options.margin = 5;
            textBox.reflow(targetBox);
            compareBoxes(textBox.box, Box2D(0,0, 40, 30));
        });

        // ------------------------------------------------------------
        module("TextBox / reflow / rotation / align", {
            setup: function() {
                createTextBoxMock({rotation: 90}, Box2D(0,0,20,30));
            }
        });

        test("top", function() {
            textBox.options.vAlign = "top";
            textBox.reflow(targetBox);
            equal(textBox.box.y1, 0);
            equal(textBox.box.y2, 20);
        });

        test("bottom", function() {
            textBox.options.vAlign = "bottom";
            textBox.reflow(targetBox);
            equal(textBox.box.y1, 80);
            equal(textBox.box.y2, 100);
        });

        test("vertical center", function() {
            textBox.options.vAlign = "center";
            textBox.reflow(targetBox);
            equal(textBox.box.y1, 40);
            equal(textBox.box.y2, 60);
        });

        test("left", function() {
            textBox.options.align = "left";
            textBox.reflow(targetBox);
            equal(textBox.box.x1, 0);
            equal(textBox.box.x2, 30);
        });

        test("right", function() {
            textBox.options.align = "right";
            textBox.reflow(targetBox);
            equal(textBox.box.x1, 70);
            equal(textBox.box.x2, 100);
        });

        test("horizontal center", function() {
            textBox.options.align = "center";
            textBox.reflow(targetBox);
            equal(textBox.box.x1, 35);
            equal(textBox.box.x2, 65);
        });

        // ------------------------------------------------------------
        function setupViewElementsTextBox(options, text) {
            createTextBox(options, text);
            textBox.modelId = "modelId";
            textBox.getViewElements(view);
        }

        module("TextBox / view elements", {
            setup: function() {
                moduleSetup();
            }
        });

        test("creates a TextBox", function() {
            setupViewElementsTextBox();
            equal(view.log.textbox.length, 1);
        });

        test("sets a matrix if rotation is set", function() {
            moduleSetup();
            createTextBoxMock({rotation: 90}, Box2D(0,0,20,30));
            textBox.reflow(targetBox);
            textBox.getViewElements(view);
            var matrix = view.log.textbox[0].options.matrix;
            var tolerance = 0.01;
            close(matrix.a, 0, tolerance);
            close(matrix.b, 1, tolerance);
            close(matrix.c, -1, tolerance);
            close(matrix.d, 0, tolerance);
            close(matrix.e, 30, tolerance);
            close(matrix.f, 0, tolerance);
        });

        test("assigns zIndex from the options to textbox", function() {
            setupViewElementsTextBox({zIndex: 1});
            equal(view.log.textbox[0].options.zIndex, 1);
        });

        test("creates rect when background is set", function() {
            setupViewElementsTextBox({background: "foo"});
            equal(view.log.rect.length, 1);
        });

        test("creates rect when border is set", function() {
            setupViewElementsTextBox({border: { width: 1 }});
            equal(view.log.rect.length, 1);
        });

        test("creates text", function() {
            setupViewElementsTextBox();
            equal(view.log.text.length, 1);
        });

        test("creates text for each line", function() {
            setupViewElementsTextBox({}, "line1 \n line2");
            equal(view.log.text.length, 2);
        });

        test("sets zIndex from the options to text", function() {
            setupViewElementsTextBox({ zIndex: 1});
            equal(view.log.text[0].style.zIndex, 1);
        });

        // ------------------------------------------------------------
        module("TextBox / view elements / rect options", {
            setup: function() {
                moduleSetup();
                setupViewElementsTextBox({
                    id: "1",
                    zIndex: 1,
                    border: {
                        width: 2,
                        color: "red",
                        opacity: 0.5,
                        dashType: "foo"
                    },
                    background: "green",
                    opacity: 0.7,
                    animation: {
                        type: "foo",
                        duration: 100
                    }
                });

                rect = view.log.rect[0];
            }
        });

        test("sets id", function() {
            equal(rect.style.id, "1");
        });

        test("sets zIndex", function() {
            equal(rect.style.zIndex, 1);
        });

        test("sets stroke options", function() {
            equal(rect.style.stroke, "red");
            equal(rect.style.strokeWidth, 2);
            equal(rect.style.strokeOpacity, 0.5);
            equal(rect.style.dashType, "foo");
        });

        test("sets fill", function() {
            equal(rect.style.fill, "green");
            equal(rect.style.fillOpacity, 0.7);
        });

        test("sets animation", function() {
            equal(rect.style.animation.type, "foo");
            equal(rect.style.animation.duration, 100);
        });

        test("sets model id", function() {
            equal(rect.style.data.modelId, "modelId");
        });

    })();

    (function() {
        var legend,
            MARKER_MARGIN = MARKER_SIZE = 7,
            MARGIN = 10;

        function createLegend(options) {
            legend = new dataviz.Legend($.extend({
                items: [ { text: "Series 1" } ],
                labels: {
                    font: SANS12
                }
            }, options));

            legend.reflow(chartBox);
        }

        // ------------------------------------------------------------
        module("Legend", {
            setup: function() {
                moduleSetup();

                createLegend();
            },
            teardown: moduleTeardown
        });

        test("renders legend in a group", function() {
            legend.getViewElements(view);
            equal(view.log.group.length, 1);
        });

        test("renders no elements if legend has no items", function() {
            moduleSetup();

            createLegend({items: []});
            legend.getViewElements(view);

            equal(view.log.group.length, 0);
            equal(view.log.textbox.length, 0);
            equal(view.log.path.length, 0);
        });

        test("sets zIndex on group", function() {
            createLegend({
                zIndex: 10
            });

            legend.getViewElements(view);
            equal(view.log.group[0].options.zIndex, 10);
        });

        test("default zIndex is 1", function() {
            equal(legend.options.zIndex, 1);
        });

        test("positions legend to absolute vertical center (relative to y=0)", function() {
            legend = new dataviz.Legend({
                items: [ { text: "Series 1" } ]
            });

            var legendBox = chartBox.clone().translate(100, 100);
            legend.reflow(legendBox);

            var label = legend.children[0];
            equal(label.box.y1,
                 (legendBox.y2 - label.box.height()) / 2);
        });

        test("legend fills available height", function() {
            deepEqual([legend.box.y1, legend.box.y2], [chartBox.y1, chartBox.y2]);
        });

        // ------------------------------------------------------------
        var baseWidth,
            baseHeight;

        module("Legend position", {
            setup: function() {
                moduleSetup();

                createLegend({ margin: 0 });
                baseWidth = legend.box.width();

                createLegend({ margin: 0, position: "top" });
                baseHeight = legend.box.height();
            },
            teardown: moduleTeardown
        });

        test("positions legend to the right", function() {
            createLegend({
                position: "right",
                margin: 0
            });

            equal(legend.box.x1, chartBox.x2 - legend.box.width());
        });

        test("positions legend to the left", function() {
            createLegend({
                position: "left"
            });

            equal(legend.box.x1, chartBox.x1);
            equal(legend.box.x2, chartBox.x1 + legend.box.width());
        });

        test("positions legend to the top", function() {
            createLegend({
                position: "top"
            });

            equal(legend.box.y1, chartBox.y1);
        });

        test("positions legend to the bottom should have correct box", function() {
            createLegend({
                position: "bottom"
            });

            var legendBox = legend.children[0].box;

            sameBox(legendBox, new Box2D(460, 965, 545, 1000), TOLERANCE);
        });

        test("positions legend to the top should have correct box", function() {
            createLegend({
                position: "top"
            });

            var legendBox = legend.children[0].box;

            sameBox(legendBox, new Box2D(460, 5, 545, 40), TOLERANCE);
        });

        test("positions legend to the bottom", function() {
            createLegend({
                position: "bottom"
            });

            close(legend.box.y1, chartBox.y2 - legend.box.height(), TOLERANCE);
        });

        test("applies left and right margin when positioned to the right", function() {
            createLegend({
                position: "right",
                margin: MARGIN
            });

            equal(legend.box.x1, chartBox.x2 - baseWidth - 2 * MARGIN);
        });

        test("applies left and right margin when positioned to the left", function() {
            createLegend({
                position: "left",
                margin: MARGIN
            });

            equal(legend.box.x2, chartBox.x1 + baseWidth + 2 * MARGIN);
        });

        test("applies top and bottom margin when positioned to the top", function() {
            createLegend({
                position: "top",
                margin: MARGIN
            });

            equal(legend.box.y2, chartBox.y1 + baseHeight + 2 * MARGIN);
        });

        test("applies top and bottom margin when positioned to the bottom", function() {
            createLegend({
                position: "bottom",
                margin: MARGIN
            });
            equal(legend.box.y1, chartBox.y2 - baseHeight - 2 * MARGIN);
        });

        // ------------------------------------------------------------
        var legendBox,
            BORDER_WIDTH = 2,
            BORDER_COLOR = "#f00",
            BORDER_DASH_TYPE = "dot",
            BACKGROUND = "#0f0",
            PADDING = 10;

        module("Legend / Box", {
            setup: function() {
                moduleSetup();

                legend = new dataviz.Legend({
                    items: [ { text: "Series 1", color: "#f00" } ],
                    labels: {
                        font: SANS12
                    },
                    border: {
                        color: BORDER_COLOR,
                        width: BORDER_WIDTH,
                        dashType: BORDER_DASH_TYPE
                    },
                    background: BACKGROUND,
                    padding: PADDING
                });

                legend.reflow(chartBox);
                legend.getViewElements(view);

                legendBox = view.log.rect[0];
            },
            teardown: moduleTeardown
        });

        test("renders box with padding", function() {
            sameBox(legendBox, new Box2D(908, 482.5, 993, 517.5), TOLERANCE);
        });

        test("renders border width", function() {
            deepEqual(legendBox.style.strokeWidth, BORDER_WIDTH);
        });

        test("renders border color", function() {
            deepEqual(legendBox.style.stroke, BORDER_COLOR);
        });

        test("renders border dashType", function() {
            deepEqual(legendBox.style.dashType, BORDER_DASH_TYPE);
        });

        test("renders background color", function() {
            deepEqual(legendBox.style.fill, BACKGROUND);
        });

        // ------------------------------------------------------------

        var legendSeries = [{name: "item1"}, {name: "item2"}],
            legendItems;

        function createLegendWithItems(options) {
            createLegend($.extend({
                items: [{
                    active: true,
                    text: "item1",
                    labels:  {
                        color: "blue",
                        font: "foo"
                    },
                    markerColor: "red",
                    series: legendSeries
                },{
                    active: false,
                    text: "item2",
                    labels:  {
                        color: "green",
                        font: "bar"
                    },
                    markerColor: "pink",
                    series: legendSeries
                }],
                labels: {
                    color: "cyan",
                    font: SANS12,
                    margin: 5
                },
                markers: {
                    border: {
                        width: 2,
                        color: "yellow"
                    },
                    size: 10,
                    margin: 5,
                    type: "circle",
                    padding: 5
                }
            }, options));
            legendItems = legend.container.children[0].children;
        }

        module("Legend / items", {
            setup: function() {
                createLegendWithItems();
            },
            teardown: destroyChart
        });

        test("uses float element to align items", function() {
            ok(legend.container.children[0] instanceof dataviz.FloatElement);
        });

        test("sets float element options", function() {
            var floatElementOptions = legend.container.children[0].options;
            equal(floatElementOptions.wrap, true);
            equal(floatElementOptions.vertical, true);
            createLegendWithItems({position: "top"});
            floatElementOptions = legend.container.children[0].options;
            equal(floatElementOptions.wrap, true);
            equal(floatElementOptions.vertical, false);
        });

        test("appends items to float element", function() {
            equal(legendItems.length, 2);
        });

        test("sets active state", function() {
            equal(legendItems[0].options.active, true);
            equal(legendItems[1].options.active, false);
        });

        test("sets markerColor", function() {
            equal(legendItems[0].options.markerColor, "red");
            equal(legendItems[1].options.markerColor, "pink");
        });

        test("sets text", function() {
            equal(legendItems[0].options.text, "item1");
            equal(legendItems[1].options.text, "item2");
        });

        test("sets series", function() {
            deepEqual(legendItems[0].options.series, legendSeries);
            deepEqual(legendItems[1].options.series, legendSeries);
        });

        test("sets item labels color", function() {
            equal(legendItems[0].options.labels.color, "blue");
            equal(legendItems[1].options.labels.color, "green");
        });

        test("sets options labels color if item has no labels color set", function() {
            createLegendWithItems({
                items: [{
                    text: "item1"
                }, {
                    text: "item2"
                }]
            });
            equal(legendItems[0].options.labels.color, "cyan");
            equal(legendItems[1].options.labels.color, "cyan");
        });

        test("sets item labels font", function() {
            equal(legendItems[0].options.labels.font, "foo");
            equal(legendItems[1].options.labels.font, "bar");
        });

        test("sets options labels font if item has no labels font set", function() {
            createLegendWithItems({
                items: [{
                    text: "item1"
                }, {
                    text: "item2"
                }]
            });
            equal(legendItems[0].options.labels.font, SANS12);
            equal(legendItems[1].options.labels.font, SANS12);
        });

        test("sets labels margin", function() {
            equal(legendItems[0].options.labels.margin, 5);
            equal(legendItems[1].options.labels.margin, 5);
        });

       test("sets markers border", function() {
            var border = legendItems[0].options.markers.border;
            equal(border.width, 2);
            equal(border.color, "yellow");
            border = legendItems[1].options.markers.border;
            equal(border.width, 2);
            equal(border.color, "yellow");
        });

        test("sets markers size", function() {
            equal(legendItems[0].options.markers.size, 10);
            equal(legendItems[1].options.markers.size, 10);
        });

        test("sets markers margin", function() {
            equal(legendItems[0].options.markers.margin, 5);
            equal(legendItems[1].options.markers.margin, 5);
        });

        test("sets markers padding", function() {
            equal(legendItems[0].options.markers.padding, 5);
            equal(legendItems[1].options.markers.padding, 5);
        });

        test("sets markers type", function() {
            equal(legendItems[0].options.markers.padding, 5);
            equal(legendItems[1].options.markers.padding, 5);
        });

        // ------------------------------------------------------------

        var legendItem,
            container,
            marker,
            textbox;

        function createLegendItem(options) {
            legendItem = new dataviz.LegendItem($.extend({
                active: true,
                text: "item1",
                markerColor: "red",
                series: legendSeries,
                labels: {
                    color: "cyan",
                    font: SANS12,
                    margin: 5
                },
                markers: {
                    border: {
                        width: 2
                    },
                    size: 10,
                    margin: 5,
                    type: "triangle",
                    padding: 5
                }
            }, options));

            container = legendItem.children[0];
            marker = container.children[0];
            textbox = container.children[1];
        }

        module("LegendItem", {
            setup: function() {
                createLegendItem();
            }
        });

        test("uses float element to align children", function() {
            ok(container instanceof dataviz.FloatElement);
        });

        test("sets float element options", function() {
            equal(container.options.wrap, false);
            equal(container.options.vertical, false);
            equal(container.options.align, "center");
        });

        test("appends marker to container", function() {
            ok(marker instanceof dataviz.ShapeElement);
        });

        test("sets marker color to border color and background", function() {
            equal(marker.options.border.color, "red");
            equal(marker.options.background, "red");
        });

        test("sets marker type", function() {
            equal(marker.options.type, "triangle");
        });

        test("sets marker width and height from size", function() {
            equal(marker.options.width, 10);
            equal(marker.options.height, 10);
        });

        test("sets marker border width", function() {
            equal(marker.options.border.width, 2);
        });

        test("sets marker margin", function() {
            equal(marker.options.margin, 5);
        });

        test("sets marker padding", function() {
            equal(marker.options.padding, 5);
        });

        test("appends textbox to container", function() {
            ok(textbox instanceof dataviz.TextBox);
        });

        test("sets textbox text", function() {
            equal(textbox.content, "item1");
        });

        test("sets textbox color", function() {
            equal(textbox.options.color, "cyan");
        });

        test("sets textbox font", function() {
            equal(textbox.options.font, SANS12);
        });

        test("sets textbox margin", function() {
            equal(textbox.options.margin, 5);
        });

        // ------------------------------------------------------------
        var chart,
            legend,
            legendItemMarker,
            legendItemLabel;

        function setupLegendItemEvent(options, itemIndex) {
            chart = createChart($.extend(true, {
                series: [{
                    type: "line",
                    data: [1,2,3],
                    name: "test",
                    color: "color"
                }]
            }, options));

            legend = chart._model.children[0];
            legendItem = legend.children[0].children[0].children[itemIndex || 0];
            var legendItemElements = QUnit.fixture.find("[data-model-id='" + legendItem.modelId +"']");
            legendItemMarker = legendItemElements.filter("path");
            legendItemLabel = legendItemElements.filter("text");
        }


        module("LegendItem / Events / click", {
            teardown: destroyChart
        });

        test("fires when clicking item label", 1, function() {
            setupLegendItemEvent({
                legendItemClick: function() { ok(true); }
            });
            clickChart(chart, legendItemLabel);
        });

        test("fires when clicking item marker", 1, function() {
            setupLegendItemEvent({
                legendItemClick: function() { ok(true); }
            });
            clickChart(chart, legendItemMarker);
        });

        test("event arguments contain DOM element", 1, function() {
            setupLegendItemEvent({
                legendItemClick: function(e) {
                    equal(e.element.length, 1);
                }
            });
            clickChart(chart, legendItemLabel);
        });

        test("event arguments contain series name as text", 1, function() {
            setupLegendItemEvent({
                legendItemClick: function(e) {
                    equal(e.text, "test");
                }
            });
            clickChart(chart, legendItemLabel);
        });

        test("event arguments contain series", 1, function() {
            setupLegendItemEvent({
                legendItemClick: function(e) {
                    equal(e.series.type, "line");
                }
            });
            clickChart(chart, legendItemLabel);
        });

        test("event arguments contain seriesIndex", 1, function() {
            setupLegendItemEvent({
                series: [{
                    name: "series1"
                }, {
                    name: "series2"
                }],
                legendItemClick: function(e) {
                    equal(e.seriesIndex, 1);
                }
            }, 1);
            clickChart(chart, legendItemLabel);
        });

        // ------------------------------------------------------------
        module("LegendItem / Events / hover", {
            teardown: destroyChart
        });

        test("fires when hovering item label", 1, function() {
            setupLegendItemEvent({
                legendItemHover: function() { ok(true); }
            });
            triggerEvent("mouseover", legendItemLabel);
        });

        test("fires when hovering item marker", 1, function() {
            setupLegendItemEvent({
                legendItemHover: function() { ok(true); }
            });
            triggerEvent("mouseover", legendItemMarker);
        });

        test("event arguments contain DOM element", 1, function() {
            setupLegendItemEvent({
                legendItemHover: function(e) {
                    equal(e.element.length, 1);
                }
            });
            triggerEvent("mouseover", legendItemLabel);
        });

        test("event arguments contain series name as text", 1, function() {
            setupLegendItemEvent({
                legendItemHover: function(e) {
                    equal(e.text, "test");
                }
            });
            triggerEvent("mouseover", legendItemLabel);
        });

        test("event arguments contain series", 1, function() {
            setupLegendItemEvent({
                legendItemHover: function(e) {
                    equal(e.series.type, "line");
                }
            });
            triggerEvent("mouseover", legendItemLabel);
        });

        test("event arguments contain seriesIndex", 1, function() {
            setupLegendItemEvent({
                series: [{
                    name: "series1"
                }, {
                    name: "series2"
                }],
                legendItemHover: function(e) {
                    equal(e.seriesIndex, 1);
                }
            }, 1);
            triggerEvent("mouseover", legendItemLabel);
        });
    })();

    (function() {
        // ------------------------------------------------------------
        var viewElement,
            pool,
            originalPool;

        module("ViewElement / destroy", {
            setup: function() {
                viewElement = new dataviz.ViewElement();

                originalPool = IDPool.current;
                pool = IDPool.current = new IDPool(10, "", 1);
            },
            teardown: function() {
                IDPool.current = originalPool;
            }
        });

        test("unregisters id from IDPool", function() {
            viewElement.options.id = uniqueId();
            viewElement.destroy();

            equal(pool._pool.length, 1);
        });

        test("destroys children", function() {
            var root = new dataviz.ViewElement(),
                child = new dataviz.ViewElement(),
                grandchild = new dataviz.ViewElement();

            root.children.push(child);
            child.children.push(grandchild);

            grandchild.destroy = function() { ok(true); };

            root.destroy();
        });
    })();

    (function() {
        // ------------------------------------------------------------
        var view;

        module("ViewBase", {
            setup: function() {
                view = new dataviz.ViewBase();
            }
        });

        test("playAnimations plays animation in order", function() {
            var order;
            view.animations = [
                { play: function() { order = "1"; } },
                { play: function() { order += "2"; } }
            ];

            view.playAnimations();
            equal(order, "12");
        });

        test("destroy clears animations", function() {
            var order;
            view.animations = [
                { destroy: function() { } }
            ];

            view.destroy();
            equal(view.animations.length, 0);
        });

        test("decorate applies decorators in order", function() {
            var order;
            view.decorators = [
                { decorate: function(element) { order = "1"; return element; } },
                { decorate: function(element) { order += "2"; return element; } }
            ];

            view.decorate({ children: [] });
            equal(order, "12");
        });

        test("decorate processes elements recursively", function() {
            var order = "";
            view.decorators = [
                { decorate: function(element) { order += element.id; return element; } }
            ];

            view.decorate({
                id: "1",
                children: [{
                    id: "2",
                    children: [{
                        id: "3",
                        children: []
                    }]
                }]
            });

            equal(order, "321");
        });

        // ------------------------------------------------------------
        module("ViewBase / buildGradient", {
            setup: function() {
                view = new dataviz.ViewBase();
            }
        });

        test("builds gradient from name", function() {
            equal(view.buildGradient({ gradient: "glass" }).type, "linear");
        });

        test("returns undefined when no gradient exists", function() {
            equal(typeof view.buildGradient("x"), "undefined");
        });

        test("applies options", function() {
            equal(view.buildGradient({ gradient: "glass", rotation: 90 }).rotation, 90);
        });

        test("returns same gradient for same options", function() {
            equal(view.buildGradient({ gradient: "glass", rotation: 90 }).id,
                   view.buildGradient({ gradient: "glass", rotation: 90 }).id);
        });

    })();

    (function() {
        var ring,
            ringBox;

        function createRing(startAngle, angle, innerRadius) {
            ring = new dataviz.Ring(
                new dataviz.Point2D(100, 100), innerRadius || 0, 100,
                startAngle, angle - startAngle);
            var box = ring.getBBox();
            ringBox = [box.x1, box.y1, box.x2, box.y2]
        }

        // ------------------------------------------------------------
        module("Ring with zero inner radius");

        test("get box with startAngle 10 and endAngle 190", function() {
            createRing(10, 190);
            arrayClose(ringBox, [1, 0, 200, 117], TOLERANCE);
        });

        test("get box with startAngle 10 and endAngle 30", function() {
            createRing(10, 30);
            arrayClose(ringBox, [1, 50, 100, 100], TOLERANCE);
        });

        test("get box with startAngle 0 and endAngle 90", function() {
            createRing(0, 90);
            arrayClose(ringBox, [0, 0, 100, 100], TOLERANCE);
        });

        test("get box with startAngle 30 and endAngle 170", function() {
            createRing(30, 170);
            arrayClose(ringBox, [13, 0, 198, 100], TOLERANCE);
        });

        test("get box with startAngle 0 and endAngle 360", function() {
            createRing(0, 360);
            arrayClose(ringBox, [0, 0, 200, 200], TOLERANCE);
        });

        test("get box with startAngle 0 and endAngle 280", function() {
            createRing(0, 280);
            arrayClose(ringBox, [0, 0, 200, 200], TOLERANCE);
        });

        test("get box with startAngle 90 and endAngle 90 (full circle)", function() {
            createRing(90, 90);
            arrayClose(ringBox, [0, 0, 200, 200], TOLERANCE);
        });

        test("get box with startAngle 180 and endAngle 0", function() {
            createRing(180, 0);
            arrayClose(ringBox, [0, 100, 200, 200], TOLERANCE);
        });

        test("get box with startAngle 180.1 and endAngle 0", function() {
            createRing(180.1, 0);
            arrayClose(ringBox, [0, 100, 200, 200], TOLERANCE);
        });

        // ------------------------------------------------------------
        module("Ring with inner radius");

        test("get box with startAngle 10 and endAngle 190", function() {
            createRing(10, 190, 50);
            arrayClose(ringBox, [1, 0, 200, 117], TOLERANCE);
        });

        test("get box with startAngle 10 and endAngle 30", function() {
            createRing(10, 30, 50);
            arrayClose(ringBox, [1, 50, 13, 83], TOLERANCE);
        });

        test("get box with startAngle 0 and endAngle 90", function() {
            createRing(0, 90, 50);
            arrayClose(ringBox, [0, 0, 100, 100], TOLERANCE);
        });

        test("get box with startAngle 30 and endAngle 170", function() {
            createRing(30, 170, 50);
            arrayClose(ringBox, [13, 0, 198, 83], TOLERANCE);
        });

        test("get box with startAngle 0 and endAngle 360", function() {
            createRing(0, 360, 50);
            arrayClose(ringBox, [0, 0, 200, 200], TOLERANCE);
        });

        test("get box with startAngle 0 and endAngle 280", function() {
            createRing(0, 280, 50);
            arrayClose(ringBox, [0, 0, 200, 200], TOLERANCE);
        });

        test("get box with startAngle 90 and endAngle 450", function() {
            createRing(90, 450, 50);
            arrayClose(ringBox, [0, 0, 200, 200], TOLERANCE);
        });

        test("get box with startAngle 410 and endAngle 450", function() {
            createRing(410, 450, 50);
            arrayClose(ringBox, [35, 0, 100, 23], TOLERANCE);
        });

    })();

    (function() {
        var Pane = dataviz.Pane,
            pane, rect, paneTitle;

        function createPaneRect(options) {
            pane = new Pane(options);
            pane.renderGridLines = function() {};
            pane.reflow(chartBox);

            view = new ViewStub();
            pane.getViewElements(view);
            rect = view.log.rect[0];
        }

        // ------------------------------------------------------------
        module("Pane");

        test("Sets unique id", function() {
            pane = new Pane();
            ok(pane.id);
        });

        test("Sets background color", function() {
            createPaneRect({ background: "color", width: 600, height: 400 });
            equal(rect.style.fill, "color");
        });

        test("Sets border", function() {
            createPaneRect({ border: { color: "color", width: 1, dashType: "dashType" }, width: 600, height: 400 });
            equal(rect.style.stroke, "color");
            equal(rect.style.strokeWidth, 1);
            equal(rect.style.dashType, "dashType");
        });

        // ------------------------------------------------------------

        function createPaneWithTitle(options) {
            pane = new Pane($.extend(true, { title: {
                text: "Title"
            }, width: 600, height: 400 }, options));
            pane.reflow(chartBox);
            paneTitle = pane.title;
        }

        module("Pane / Title");

        test("positions title to the top", function() {
            createPaneWithTitle();

            equal(paneTitle.options.position, "top");
        });

        test("Title shrinks content box", function() {
            createPaneWithTitle();

            equal(pane.contentBox.height(), 365);
        });

        test("aligns Title to the left", function() {
            createPaneWithTitle();
            equal(paneTitle.options.align, "left");
        });

        test("aligns Title to the center", function() {
            createPaneWithTitle({
                title: {
                    position: "center"
                }
            });

            equal(paneTitle.options.align, "center");
        });

        test("aligns Title to the right", function() {
            createPaneWithTitle({
                title: {
                    position: "right"
                }
            });

            equal(paneTitle.options.align, "right");
        });

    })();

    (function() {
        var ShapeElement = dataviz.ShapeElement,
            SIZE = 5,
            BORDER = 2,
            BORDER_COLOR = "#cf0",
            BACKGROUND = "#f00",
            shape,
            box,
            view;

        function createShape(options) {
            shape = new ShapeElement(
                $.extend({
                    width: SIZE,
                    height: SIZE,
                    border: { width: BORDER },
                    background: "#f00"
                }, options)
            );

            box = new Box2D(0, 0, SIZE, SIZE);
            shape.reflow(box);

            view = new ViewStub();
            shape.getViewElements(view);
        }

        // ------------------------------------------------------------
        module("ShapeElement", {
            setup: function() {
                createShape({ type: "square" });
            }
        });

        test("renders square", function() {
            var path = view.log.path[0];
            arrayClose(mapPoints(path.points), [
                [ 0, 0 ], [ SIZE, 0 ],
                [ SIZE, SIZE ], [ 0, SIZE ]
            ], 1);
        });

        test("renders rotated square", function() {
            createShape({ type: "square", rotation: 45 });
            var path = view.log.path[0];
            arrayClose(mapPoints(path.points), [
                [ -1.036, SIZE / 2 ], [ SIZE / 2, -1.036 ],
                [ 6.036, SIZE / 2 ], [ SIZE / 2, 6.036 ]
            ], 1);
            ok(path.closed);
        });

        test("renders triangle", function() {
            createShape({ type: "triangle" });
            var path = view.log.path[0];
            deepEqual(mapPoints(path.points), [
                [SIZE / 2, 0], [0, SIZE], [SIZE, SIZE]
            ]);
            ok(path.closed);
        });

        test("renders rotated triangle", function() {
            createShape({ type: "triangle", rotation: 180 });
            var path = view.log.path[0];
            deepEqual(mapPoints(path.points), [
                [SIZE / 2, SIZE], [SIZE, 0], [0, 0]
            ]);
            ok(path.closed);
        });

        test("renders circle", function() {
            createShape({ type: "circle" });
            var circle = view.log.circle[0];
            deepEqual(circle.c.x, SIZE / 2);
            deepEqual(circle.c.y, SIZE / 2);
            deepEqual(circle.r, SIZE / 2);
        });

        test("renders cross", function() {
            createShape({ type: "cross" });
            var cross1 = view.log.path[0];
            var cross2 = view.log.path[1];
            deepEqual(cross1.points, [Point2D(0, 0), Point2D(SIZE, SIZE)]);
            deepEqual(cross2.points, [Point2D(0, SIZE), Point2D(SIZE, 0)]);
            equal(view.log.group.length, 1);
        });

        test("sets cross group zIndex", function() {
            createShape({ type: "cross", zIndex: 1 });

            equal(view.log.group[0].options.zIndex, 1);
        });

        test("renders id", function() {
            createShape({ id: "id" });
            equal(view.log.circle[0].style.id, "id");
        });

        test("does not render element when hidden", function() {
            createShape({ visible: false });
            equal(view.log.rect.length, 0);
        });

        test("does not render element when hidden (triangle)", function() {
            createShape({ visible: false,  type: "triangle"});
            equal(view.log.path.length, 0);
        });

        test("does not render element when hidden (circle)", function() {
            createShape({ visible: false,  type: "circle"});
            equal(view.log.circle.length, 0);
        });

    })();
})();
