(function() {
    var dataviz = kendo.dataviz,
        Box2D = dataviz.Box2D;

    function ContentElementStub(content, options) {
        this.content = content;
        this.options = $.extend({}, this.options, options);
    }

    ContentElementStub.prototype = {
        options: {
        },

        render: function() {
            return this.content;
        }
    };

    (function() {
        var viewElement;

        module("ViewElement", {
            setup: function() {
                viewElement = new dataviz.ViewElement();
            }
        });

        test("render order matches z-index", function() {
            viewElement.children.push(
                new ContentElementStub("2", { zIndex: 2 }),
                new ContentElementStub("1", { zIndex: 1 })
            );
            equal(viewElement.renderContent(), "12");
        });

        test("render order is stable for elements with the same z-index", function() {
            var expected = "";
            for (var i = 0; i < 100; i++) {
                expected += i;

                viewElement.children.push(
                    new ContentElementStub(i)
                );
            }

            ok(viewElement.renderContent() === expected);
        });
    })();
})();
