(function() {
    var dataviz = kendo.dataviz,
        highlight,
        viewMock,
        element,
        ownerGroup,
        viewElement,
        RED = "rgb(255,0,0)",
        GREEN = "rgb(0,255,0)",
        BLUE = "rgb(0,0,255)";

    function uniqueId() {
        uniqueId.id = uniqueId.id || 0;
        return uniqueId.id++;
    }

    function createHighlight() {
        viewMock = {
            renderElement: function(element) {
                return $("<div class='" + element.type + "'>" +
                         element.children + "</div>")[0];
            }
        };

        viewElement = $("<div id='viewelement'></div>");
        QUnit.fixture.append(viewElement);

        highlight = new dataviz.Highlight(viewMock, viewElement[0]);

        ownerGroup = $("<div id='ownergroup'></div>");
        QUnit.fixture.append(ownerGroup);
    }

    function destroyHighlight() {
        QUnit.fixture.empty();
    }

    var elementStub = {
        highlightOverlay: function() {
            return { type: "overlay", children: "" };
        },
        owner: {
            id: "ownergroup"
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

        test("Appends overlay element to owner group", function() {
            highlight.show(elementStub);
            ok(ownerGroup.children().last().is(".overlay"));
        });

        test("Appends overlay element to view element if owner group is not found", function() {
            ownerGroup.remove();
            highlight.show(elementStub);
            ok(viewElement.children().last().is(".overlay"));
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
        module("Highlight / Overlay / isOverlay", {
            setup: createHighlight,
            teardown: destroyHighlight
        });

        test("returns true for overlay element", function() {
            highlight.show(elementStub);
            ok(highlight.isOverlay($(".overlay")[0]));
        });

        test("returns true for overlay child elements", function() {
            highlight.show({
                highlightOverlay: function() {
                    return { children: "<div class='child'></div>" };
                }
            });

            ok(highlight.isOverlay($(".child")[0]));
        });

        test("returns false for other elements", function() {
            highlight.show(elementStub);
            ok(!highlight.isOverlay(document.body));
        });

        // ------------------------------------------------------------
        module("Highlight / Overlay / Multiple points", {
            setup: createHighlight,
            teardown: destroyHighlight
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

        test("Appends overlay elements to owner group", function() {
            highlight.show([elementStub, elementStub]);

            equal(ownerGroup.find(".overlay").length, 2);
        });

        test("Appends overlay elements to view element if owner group is not found", function() {
            ownerGroup.remove();
            highlight.show([elementStub, elementStub]);

            equal(viewElement.find(".overlay").length, 2);
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
                createHighlight();
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
