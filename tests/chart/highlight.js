(function() {
    var dataviz = kendo.dataviz,
        highlight,
        viewMock,
        element,
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

        highlight = new dataviz.Highlight(viewMock, QUnit.fixture[0], options);
    }
    
    var ElementStub = function () {
        this.id = uniqueId();
    };
    
    ElementStub.prototype = {
        highlightOverlay: function() {
            return { type: "overlay" };
        },
        toggleHighlight: function () {}
    };
    
    function createElementStub (parent) {
        var element = new ElementStub();
        (parent || QUnit.fixture).append("<div id='" + element.id + "'></div>");
        return element;
    }

    (function() {

        module("Highlight / Overlay", {
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

        test("Sets fill on overlay element", 1, function() {
            highlight.show({
                highlightOverlay: function(definition, options) {
                    equal(options.fill, "#cf0");
                }
            });
        });

        test("Sets fill opacity on overlay element", 1, function() {
            highlight.show({
                highlightOverlay: function(definition, options) {
                    equal(options.fillOpacity, 0.5);
                }
            });
        });

        test("Renders overlay element", function() {             
            highlight.show(createElementStub());
            equal($(".overlay").length, 1);
        });
        
        test("Appends overlay element to element parent", function() {             
            var parent = $("<div></div>").appendTo(QUnit.fixture);
            highlight.show(createElementStub(parent));
            ok(parent.children().last().is(".overlay"));
        });        

        test("Does not render overlay if no overlay element exists", function() {            
            highlight.show({ highlightOverlay: function() { } });
            equal($(".overlay").length, 0);
        });

        test("Removes overlay element", function() {
            highlight.show(createElementStub());
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
            highlight.show([createElementStub(), createElementStub()]);
            equal($(".overlay").length, 2);
        });
        
        test("Appends overlay elements to elements' parents", function() {             
            var firstElementParent = $("<div></div>").appendTo(QUnit.fixture),
                secondElementParent = $("<div></div>").appendTo(QUnit.fixture);
                
            highlight.show([createElementStub(firstElementParent), createElementStub(secondElementParent)]);
            
            ok(firstElementParent.children().last().is(".overlay"));
            ok(secondElementParent.children().last().is(".overlay"));
        });  

        test("Removes overlay elements", function() {
            highlight.show([createElementStub(), createElementStub()]);
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
