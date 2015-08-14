(function() {

var tabstrip;

function createTabStrip(options) {
    tabstrip = new kendo.ui.TabStrip("#tabstrip", $.extend({
        animation: false
    }, options));
}

function createNonScrollableTabStrip(options) {
    tabstrip = new kendo.ui.TabStrip("#tabstrip-nonscrollable", $.extend({
        animation: false
    }, options));
}

module('tabstrip scrolling', {
    setup: function() {
        kendo.effects.disable();

        QUnit.fixture.append(
            '<div id="tabstrip" style="width:200px;">' +
            '    <ul>' +
            '        <li class="k-state-active">some item text 1</li>' +
            '        <li>some item text 2</li>' +
            '        <li>some item text 3</li>' +
            '        <li>some item text 4</li>' +
            '        <li>some item text 5</li>' +
            '        <li>some item text 6</li>' +
            '        <li>some item text 7</li>' +
            '        <li>some item text 8</li>' +
            '        <li>some item text 9</li>' +
            '        <li>some item text 10</li>' +
            '    </ul>' +
            '    <div>content 1</div>' +
            '    <div>content 2</div>' +
            '    <div>content 3</div>' +
            '    <div>content 4</div>' +
            '    <div>content 5</div>' +
            '    <div>content 6</div>' +
            '    <div>content 7</div>' +
            '    <div>content 8</div>' +
            '    <div>content 9</div>' +
            '    <div>content 10</div>' +
            '</div>'
        );

        QUnit.fixture.append(
            '<div id="tabstrip-nonscrollable" style="width:400px;">' +
            '    <ul>' +
            '        <li class="k-state-active">1</li>' +
            '        <li>2</li>' +
            '    </ul>' +
            '    <div>content 1</div>' +
            '    <div>content 2</div>' +
            '</div>'
        );
    },

    teardown: function () {
        kendo.effects.enable();
        tabstrip.destroy();
    }
});

test('scrolling is enabled by default with distance configured', 2, function () {
    createTabStrip();

    ok(tabstrip.options.scrollable !== false);
    ok(!isNaN(tabstrip.options.scrollable.distance));
});

test('scrolling CSS class is applied to TabStrip if tabPosition is top', 1, function () {
    createTabStrip({tabPosition:"top"});

    ok(tabstrip.wrapper.hasClass("k-tabstrip-scrollable"));
});

test('scrolling CSS class is applied to TabStrip if tabPosition is bottom', 1, function () {
    createTabStrip({ tabPosition: "bottom" });

    ok(tabstrip.wrapper.hasClass("k-tabstrip-scrollable"));
});

test('scrolling CSS class is not applied to TabStrip if tabPosition is left', 1, function () {
    createTabStrip({ tabPosition: "left" });

    ok(!tabstrip.wrapper.hasClass("k-tabstrip-scrollable"));
});

test('scrolling CSS class is not applied to TabStrip if tabPosition is right', 1, function () {
    createTabStrip({ tabPosition: "right" });

    ok(!tabstrip.wrapper.hasClass("k-tabstrip-scrollable"));
});

test('scrolling CSS class is not applied to TabStrip if not needed and tabPosition is top', 1, function () {
    createNonScrollableTabStrip({ tabPosition: "top" });

    ok(!tabstrip.wrapper.hasClass("k-tabstrip-scrollable"));
});

test('scrolling CSS class is not applied to TabStrip if not needed and tabPosition is bottom', 1, function () {
    createNonScrollableTabStrip({ tabPosition: "bottom" });

    ok(!tabstrip.wrapper.hasClass("k-tabstrip-scrollable"));
});

test('scrolling buttons are rendered if tabs do not fit', 3, function () {
    createTabStrip();

    var buttons = tabstrip.wrapper.children(".k-button.k-button-icon.k-button-bare");

    equal(buttons.length, 2);
    ok(buttons.eq(0).is(".k-tabstrip-prev"));
    ok(buttons.eq(1).is(".k-tabstrip-next"));
});

test('scrolling buttons are not rendered if tabs fit', 1, function () {
    createNonScrollableTabStrip();

    var buttons = tabstrip.wrapper.children(".k-button.k-button-icon.k-button-bare");

    equal(buttons.length, 0);
});

test('right scrolling button scrolls to the right by delta when clicked', 1, function () {
    createTabStrip();

    tabstrip.tabGroup.scrollLeft(0);
    tabstrip.wrapper.children(".k-tabstrip-next").trigger("mousedown").trigger("mouseup");
    tabstrip.tabGroup.finish();
    
    equal(tabstrip.tabGroup.scrollLeft(), tabstrip.options.scrollable.distance);
});

test('left scrolling button scrolls to the left by delta when clicked', 1, function () {
    createTabStrip();

    tabstrip.tabGroup.scrollLeft(999);
    var initialScrollPosition = tabstrip.tabGroup.scrollLeft();
    tabstrip.wrapper.children(".k-tabstrip-prev").trigger("mousedown").trigger("mouseup");
    tabstrip.tabGroup.finish();

    equal(tabstrip.tabGroup.scrollLeft(), initialScrollPosition - tabstrip.options.scrollable.distance);
});

test('left scrolling button disappears and appears when (not) needed', 2, function () {
    createTabStrip();

    var buttonPrev = tabstrip.wrapper.children(".k-tabstrip-prev");
    var buttonNext = tabstrip.wrapper.children(".k-tabstrip-next");

    tabstrip.tabGroup.scrollLeft(0);
    buttonPrev.trigger("mousedown").trigger("mouseup");
    tabstrip.tabGroup.finish();

    ok(!buttonPrev.is(":visible"));

    buttonNext.trigger("mousedown").trigger("mouseup");
    tabstrip.tabGroup.finish();

    ok(buttonPrev.is(":visible"));
});

test('right scrolling button disappears and appears when (not) needed', 2, function () {
    createTabStrip();

    var buttonPrev = tabstrip.wrapper.children(".k-tabstrip-prev");
    var buttonNext = tabstrip.wrapper.children(".k-tabstrip-next");

    tabstrip.tabGroup.scrollLeft(tabstrip.tabGroup[0].scrollWidth + 100);
    buttonNext.trigger("mousedown").trigger("mouseup");
    tabstrip.tabGroup.finish();

    ok(!buttonNext.is(":visible"));

    buttonPrev.trigger("mousedown").trigger("mouseup");
    tabstrip.tabGroup.finish();

    ok(buttonNext.is(":visible"));
});

test('right scrolling button appears if browser window width is reduced', 2, function () {
    createTabStrip();

    var buttonNext = tabstrip.wrapper.children(".k-tabstrip-next");

    tabstrip.tabGroup.scrollLeft(tabstrip.tabGroup[0].scrollWidth + 100);
    buttonNext.trigger("mousedown").trigger("mouseup");
    tabstrip.tabGroup.finish();

    ok(!buttonNext.is(":visible"));

    tabstrip.wrapper.width(tabstrip.wrapper.width() - 50);

    tabstrip.resize();

    ok(buttonNext.is(":visible"));
});

})();
