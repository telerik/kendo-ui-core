(function() {
    var dataviz = kendo.dataviz,
        highlight,
        viewMock,
        element,
        clipGroup,
        RED = "rgb(255,0,0)",
        GREEN = "rgb(0,255,0)",
        BLUE = "rgb(0,0,255)";

    function uniqueId() {
        uniqueId.id = uniqueId.id || 0;
        return uniqueId.id++;
    }

    function createHighlight(options) {
        viewMock = {
            renderElement: function(element) {
                return $("<div class='" + element.type + "'></div>")[0];
            }
        };

        highlight = new dataviz.Highlight(viewMock, options);

        clipGroup = $("<div id='clipgroup'></div>");
        QUnit.fixture.append(clipGroup);
    }

    function destroyHighlight() {
        QUnit.fixture.empty();
    }

    var elementStub = {
        highlightOverlay: function() {
            return { type: "overlay" };
        },
        owner: {
            pane: {
                chartContainer: {
                    id: "clipgroup"
                }
            }
        },
        toggleHighlight: function () {}
    };

    (function() {

        module("Highlight / Overlay", {
            setup: createHighlight,
            teardown: destroyHighlight
        });

        test("Retrieves overlay element", 1, function() {
            highlight.show({
                highlightOverlay: function() {
                    ok(true);
                }
            });
        });

        test("Does not retrieve overlay element when highlight is disabled", 0, function() {
            highlight.show({
                options: {
                    highlight: {
                        visible: false
                    }
                },
                highlightOverlay: function() {
                    ok(false);
                }
            });
        });

        test("Renders overlay element", function() {
            highlight.show(elementStub);
            equal($(".overlay").length, 1);
        });

        test("Appends overlay element to clip group", function() {
            highlight.show(elementStub);
            ok(clipGroup.children().last().is(".overlay"));
        });

        test("Does not render overlay if no overlay element exists", function() {
            highlight.show({ highlightOverlay: function() { } });
            equal($(".overlay").length, 0);
        });

        test("Removes overlay element", function() {
            highlight.show(elementStub);
            highlight.hide();
            equal($(".overlay").length, 0);
        });

        // ------------------------------------------------------------
        module("Highlight / Overlay / Multiple points", {
            setup: function() {
                createHighlight();
            },
            teardown: function() {
                QUnit.fixture.empty();
            }
        });

        test("Retrieves overlay elements", 2, function() {
            highlight.show([{
                highlightOverlay: function() {
                    ok(true);
                }
            }, {
                highlightOverlay: function() {
                    ok(true);
                }
            }]);
        });

        test("Renders overlay elements", function() {
            highlight.show([elementStub, elementStub]);
            equal($(".overlay").length, 2);
        });

        test("Appends overlay elements to clip group", function() {
            highlight.show([elementStub, elementStub]);

            equal(clipGroup.find(".overlay").length, 2);
        });

        test("Removes overlay elements", function() {
            highlight.show([elementStub, elementStub]);
            highlight.hide();
            equal($(".overlay").length, 0);
        });

    })();

    (function() {

        module("Highlight / Toggle", {
            setup: function() {
                createHighlight({
                    fill: "#cf0",
                    fillOpacity: 0.5
                });
            },
            teardown: function() {
                QUnit.fixture.empty();
            }
        });

        test("Calls toggleHighlight on show", 1, function() {
            highlight.show({
                toggleHighlight: function(view) {
                    ok(true);
                }
            });
        });

        test("Does not call toggleHighlight on show (highlight disabled)", 0, function() {
            highlight.show({
                options: {
                    highlight: {
                        visible: false
                    }
                },
                toggleHighlight: function() {
                    ok(false);
                }
            });
        });

        test("Calls toggleHighlight on hide", 2, function() {
            highlight.show({
                toggleHighlight: function(view) {
                    ok(true);
                }
            });
            highlight.hide();
        });

        test("Does not call toggleHighlight on hide (highlight disabled)", 0, function() {
            highlight.show({
                options: {
                    highlight: {
                        visible: false
                    }
                },
                toggleHighlight: function() {
                    ok(false);
                }
            });
            highlight.hide();
        });

        // ------------------------------------------------------------
        module("Highlight / Toggle / Multiple points", {
            setup: function() {
                createHighlight();
            },
            teardown: function() {
                QUnit.fixture.empty();
            }
        });

        test("Calls toggleHighlight on show", 2, function() {
            highlight.show([{
                toggleHighlight: function(view) {
                    ok(true);
                }
            }, {
                toggleHighlight: function(view) {
                    ok(true);
                }
            }]);
        });

        test("Calls toggleHighlight on hide", 4, function() {
            highlight.show([{
                toggleHighlight: function(view) {
                    ok(true);
                }
            }, {
                toggleHighlight: function(view) {
                    ok(true);
                }
            }]);
            highlight.hide();
        });

    })();
})();
