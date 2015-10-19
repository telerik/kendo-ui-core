(function() {

    function getRootItem(index) {
        return $('#menu').find('> .k-item > .k-link').eq(index)
    }

    var menu;

    module("menu api", {
        setup: function () {
            QUnit.fixture.append(
                    '<div id="target" style="width: 100px; height: 100px;">' +
                    '    <div class="filter" style="width: 20px; height: 20px;">1</div>' +
                    '    <div class="filter" style="width: 20px; height: 20px;">2</div>' +
                    '</div>' +
                    '<ul id="menu">' +
                    '   <li>' +
                    '       Item 1' +
                    '       <ul>' +
                    '           <li>Sub Item 1</li>' +
                    '           <li>Sub Item 2</li>' +
                    '           <li>Sub Item 3</li>' +
                    '       </ul>' +
                    '   </li>' +
                    '   <li>' +
                    '       Item 2' +
                    '       <ul>' +
                    '           <li>Sub Item 1</li>' +
                    '           <li>Sub Item 2</li>' +
                    '           <li>Sub Item 3</li>' +
                    '       </ul>' +
                    '   </li>' +
                    '   <li>' +
                    '       Item 3' +
                    '       <ul>' +
                    '           <li>Sub Item 1</li>' +
                    '           <li>Sub Item 2</li>' +
                    '           <li>Sub Item 3</li>' +
                    '       </ul>' +
                    '   </li>' +
                    '</ul>'
            );
            menu = new kendo.ui.ContextMenu("#menu", { animation: false, target: "#target" });
        },
        teardown: function () {
            kendo.destroy(menu.element);
        }
    });

    test('.k-context-menu is placed on root element', function () {
        ok(menu.element.is(".k-context-menu"));
    });

    test('Popup widget is initialized on the root element', function () {
        ok(menu.popup == menu.element.data("kendoPopup"))
    });

    test('right click on target opens menu', function () {
        $("#target").trigger("contextmenu");

        ok(menu.popup.visible());
    });

    test('right click on body doesn\'t open menu', function () {
        $("body").trigger("contextmenu");

        ok(!menu.popup.visible());
    });

    test('right click on filter opens menu', function () {
        menu.setOptions({
            filter: ".filter"
        });

        $(".filter").eq(0).trigger("contextmenu");

        ok(menu.popup.visible());
    });

    test('right click on target with filter doesn\'t open menu', function () {
        menu.setOptions({
            filter: ".filter"
        });

        $(".target").trigger("contextmenu");

        ok(!menu.popup.visible());
    });

    test('click on target opens menu when showOn is click', function () {
        menu.setOptions({
            showOn: "click"
        });

        $("#target").click();

        ok(menu.popup.visible());
    });

    test('menu is aligned to the target if alignToAnchor is true', 3, function () {
        menu.setOptions({
            alignToAnchor: true
        });

        $("#target").trigger("contextmenu");

        var popupOffset = menu.popup.wrapper.offset(),
            targetOffset = $("#target").offset();


        ok(menu.popup.visible());
        ok(popupOffset.left == targetOffset.left);
        ok(popupOffset.top == targetOffset.top + $("#target").height());
    });

    test('menu is aligned to the filter item if alignToAnchor is true', 3, function () {
        menu.setOptions({
            filter: ".filter",
            alignToAnchor: true
        });

        $(".filter").eq(1).trigger("contextmenu");

        var popupOffset = menu.popup.wrapper.offset(),
            targetOffset = $(".filter").eq(1).offset();


        ok(menu.popup.visible());
        ok(popupOffset.left == targetOffset.left);
        ok(popupOffset.top == targetOffset.top + $(".filter").eq(1).height());
    });

    /* API */

    test('calling open raises open event', function () {
        menu.bind("open", function () {
            ok(true);
        });

        menu.open();
    });

    test('calling close raises close event if popup is visible', function () {
        menu.bind("close", function () {
            ok(true);
        });

        menu.open();
        menu.close();
    });

    test('calling open shows the popup', function () {
        menu.open();

        ok(menu.popup.visible());
    });

    test('calling open with position shows the popup at that position', function () {
        menu.open(100, 100);

        var offset = menu.popup.element.offset();
        ok(offset.left == 100);
        ok(offset.top == 100);
    });

    test('preventing open should not open the popup', function () {
        menu.bind("open", function (e) {
            e.preventDefault();
        });

        menu.open();

        ok(!menu.popup.visible());
    });

    test('preventing close should not close the popup', function () {
        menu.bind("close", function (e) {
            e.preventDefault();
        });

        menu.open();
        menu.close();

        ok(menu.popup.visible());
    });

    test('events should pass the current target regardless of alignToAnchor', function () {
        menu.setOptions({
            filter: ".filter",
            showOn: "click"
        });

        menu.bind("select", function (e) {
            ok(e.target = $(".filter")[0]);
        });

        $(".filter").click();
        $("#menu > li").eq(0).click();

        menu.setOptions({
            filter: ".filter",
            showOn: "click",
            alignToAnchor: true
        });

        $(".filter").click();
        $("#menu > li").eq(0).click();

    });


    test("open event's target argument should point to the DOM element that was clicked, no align",2, function(){
        var target;
        menu.setOptions({
            alignToAnchor: false,
            showOn: "click",
            target: ".filter"
        });

        menu.bind("open", function (e) {
            equal($(e.target).text(), $(target).text());
        });

        target = $(".filter:first");
        target.click();

        target = $(".filter:last");
        target.click();
    });
    test("open event's target argument should point to the DOM element that was clicked",2, function(){
        var target;
        menu.setOptions({
            alignToAnchor: true,
            showOn: "click",
            target: ".filter"
        });

        menu.bind("open", function (e) {
            equal($(e.target).text(), $(target).text());
        });

        target = $(".filter:first");
        target.click();

        target = $(".filter:last");
        target.click();
    });
})();

