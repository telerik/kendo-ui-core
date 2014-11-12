(function() {

    var dataviz = kendo.dataviz,
        highlight;

    function createHighlight() {
        highlight = new dataviz.Highlight();
    }

    (function() {

        module("Highlight", {
            setup: createHighlight
        });

        test("show toggles highlight", 1, function() {
            highlight.show({
                toggleHighlight: function(visible) {
                    equal(visible, true);
                }
            });
        });

        test("hide toggles highlight on currently highlighted elements", function() {
            var elementStub = {
                toggleHighlight: function () {}
            };
            highlight.show(elementStub);
            elementStub.toggleHighlight = function(visible) {
                equal(visible, false);
            };
            highlight.hide();
        });

        test("Does not toggle highlight if element does not have toggleHighlight method", function() {
            highlight.show({ });
            ok(true);
        });

        test("isHighlighted returns true if element is highlighted", function() {
            var elementStub = {
                toggleHighlight: function () {}
            };
            highlight.show(elementStub);
            equal(highlight.isHighlighted(elementStub), true);
        });

        test("isHighlighted returns false if element is not highlighted", function() {
            highlight.show({
                toggleHighlight: $.noop
            });

            equal(highlight.isHighlighted({}), false);
        });
        // ------------------------------------------------------------
        module("Highlight / Multiple points", {
            setup: createHighlight
        });

        test("show toggles highlight", 2, function() {
            highlight.show([{
                toggleHighlight: function(visible) {
                    equal(visible, true);
                }
            }, {
                toggleHighlight: function(visible) {
                    equal(visible, true);
                }
            }]);
        });

        test("hide toggles highlight on currently highlighted elements", 2, function() {
            var elementStub = {
                toggleHighlight: function () {}
            };
            highlight.show([elementStub, elementStub]);
            elementStub.toggleHighlight = function(visible) {
                equal(visible, false);
            };
            highlight.hide();
        });

        test("Does not toggle highlight if element does not have toggleHighlight method", function() {
            highlight.show([{}, {}]);
            ok(true);
        });
    })();

})();
