(function() {
        function onSelect() {
            isRaised = true;
        }

        function getRootItem(index) {
  	return $('> .k-item', menu.element).eq(index);
        }

        var menu, isRaised,
            CLICK = "click";

        module("Menu / Client Events", {
            setup: function () {
                QUnit.fixture.html(__html__['tests/menu/events-fixture.html']);
                $("#Menu2").kendoMenu({ animation: false, select: onSelect });
                menu = $("#Menu2").data('kendoMenu');
            }
        });

        test("element select is triggered when menu element is clicked", function() {
            var item = getRootItem(0),
                triggerCount = 0;

            menu.bind("select", function() {
                triggerCount++;
            });

            item.trigger(CLICK);

            equal(triggerCount, 1);
        });

        test('clicking disabled item should not raise onSelect event on parent item', function() {
            var item = getRootItem(1);

            isRaised = false;

            item.find('.k-item > .k-link').eq(3).trigger('click');

            ok(!isRaised);
        });

        asyncTest("open event can be canceled", function() {
            menu.bind("open", function (e) { e.preventDefault() });
            menu.open(menu.element.children("li:first"));

            setTimeout(function () {
                equal(menu.element.find(">li:first ul").is(":visible"), false);
                start();
            }, 10);
        });

        asyncTest("activate event is fired after open", function() {
            menu.unbind("open");
            var activated = false;

            menu.bind("activate", function() {
                activated = true;
            });

            menu.open(menu.element.children("li:eq(1)"));

            setTimeout(function () {
                equal(activated, true);
                start();
            }, 100);
        });

        asyncTest("close event can be canceled", function() {
            menu.unbind("activate");
            menu.bind("close", function (e) { e.preventDefault() });

            menu.open(menu.element.children("li:eq(2)"));
            setTimeout(function () {
                menu.close(menu.element.children("li:eq(2)"));

                equal(menu.element.find(">li:eq(2) ul").is(":visible"), true);
                menu.unbind("close");
                start();
            }, 100);
        });
})();
