(function() {
        var isRaised, isActivateRaised;
        var argsCheck = false;

        function getRootItem(index) {
            return $('#TabStrip1').find('.k-item').eq(index);
        }

        function getTabStrip(selector) {
            return $(selector || "#TabStrip1").data("kendoTabStrip");
        }

        //handlers
        function Select(e) {
            if (argsCheck) {
                isRaised = !!e.contentElement;
                argsCheck = false;
            } else
                isRaised = true;
        }

        function Activate(e) {
            if ($(e.contentElement).is(":visible"))
                isActivateRaised = true;
        }


        function Load(e) {
            isRaised = true;
        }

        module('tabstrip api', {
            setup: function() {
                QUnit.fixture.html(__html__['tests/tabstrip/api-fixture.html']);

                $("#TabStrip1").kendoTabStrip({ animation: false, select: Select, activate: Activate });
                $("#parentTabStrip").kendoTabStrip({ animation: false });
                $("#childTabStrip").kendoTabStrip({ animation: false });
            }
        });

    test('clicking item with url should navigate', function() {

        var tabstrip = getTabStrip();
        var $item = $(getRootItem(6));

        var e = new $.Event('click');

        $item.find('> .k-link').trigger(e);

        ok(!e.isDefaultPrevented());

        //stop navigation after assert
        e.preventDefault();
    });

    test('trigger input select should not bubble', function() {

        isRaised = false;

        var tabstrip = getTabStrip();
        var content = tabstrip.contentElement(1);

        $(content).find('input').first().trigger('select');

        ok(!isRaised);
    });

    test('reload method should call ajaxRequest', function() {
        var tabstrip = getTabStrip();
        var isCalled = false;
        var $item = $(getRootItem(4));

        $item.find('> .k-link').data('contentUrl', 'fake');
        tabstrip.ajaxRequest = function () { isCalled = true; };

        tabstrip.reload($item);

        ok(isCalled);
    });

    test('clicking should raise onSelect event', function() {

        var item = getRootItem(2);

        isRaised = false;

        item.find('> .k-link').trigger('click');

        ok(isRaised);
    });

    asyncTest('clicking should raise onActivate event when the new contentElement is visible', function() {

        var item = getRootItem(3);

        isActivateRaised = false;

        item.find('> .k-link').trigger('click');

        setTimeout(function () {
            ok(isActivateRaised);
            start();
        }, 10);
    });

    test('clicking first item should select it', function() {
        var item = getRootItem(0);

        item.find('.k-link').trigger('click');

        ok(item.hasClass('k-state-active'));
    });

    test('select method should select second item', function() {
        var tabstrip = getTabStrip();
        var item = getRootItem(1);

        tabstrip.select(item);

        ok(item.hasClass('k-state-active'));
    });

    test('select method should be able to select by number', function() {
        var tabstrip = getTabStrip();

        tabstrip.select(3);

        ok(getRootItem(3).hasClass('k-state-active'));
    });

    test('disable method should disable item', function() {
        var tabstrip = getTabStrip();

        var item = getRootItem(4);

        tabstrip.disable(item);

        ok(item.hasClass('k-state-disabled'));
    });

    test('enable method should enable disabled item', function() {
        var tabstrip = getTabStrip();

        var item = getRootItem(3);

        tabstrip.enable(item);

        ok(item.hasClass('k-state-default'));
    });

    test('select method should show content', function() {
        var tabstrip = getTabStrip();

        var item = getRootItem(5);
        tabstrip.select(item);

        var content = $(tabstrip.contentElement(5));
        ok(item.hasClass('k-state-active'));
    });

    test('contentElement should return content of seventh tab', function() {
        var tabstrip = getTabStrip();

        var expectedContent = $(tabstrip.element).find('> .k-content').eq(6); //second content under Tab-7

        equal($(tabstrip.contentElement(6)).index(), expectedContent.index());
    });

    test('contentElement should not return tab content if passed argument is not number', function() {
        var tabstrip = getTabStrip();

        equal(tabstrip.contentElement("a"), undefined);
    });

    test('contentElement should not return tab content if passed argument is not in range', function() {
        var tabstrip = getTabStrip();

        equal(tabstrip.contentElement(100), undefined);
    });

    test('getSelectedTab should return current selected tab', function() {
        var tabstrip = getTabStrip();

        var item = getRootItem(0);
        tabstrip.select(item);

        equal(tabstrip.select()[0], item[0]);
    });

    test('getSelectedTab should return negative if no selected tabs', function() {
        var tabstrip = getTabStrip();
        tabstrip.element.find('.k-state-active').removeClass('k-state-active').addClass('k-state-default');

        equal(tabstrip.select().length, 0);
    });

    test('click should raise select event and pass corresponding content', function() {
        argsCheck = true;

        var item = getRootItem(3);

        isRaised = false;

        item.find('> .k-link').trigger('click');

        ok(isRaised);
    });

    test('animated text-only content is opened on load', function() {
        equal($('#TabStrip1 .k-content').css('opacity'), '1');
    });

    test('remove method removes several tabs and their content elements', 2, function() {
        var tabStrip = $("<ul><li>Tab 1</li><li>Tab 2</li></ul>").kendoTabStrip().data("kendoTabStrip");

        tabStrip.remove("li");

        ok(tabStrip.tabGroup.is(":empty"));
        ok(!tabStrip.tabGroup.next()[0]);
    });

    test('select method ignores nested TabStrips', function() {
        var parentTabStrip = getTabStrip("#parentTabStrip"),
            idx = parentTabStrip.select().index();

        equal(idx, 1);
    });
})();
