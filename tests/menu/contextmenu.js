(function() {

    function getRootItem(index) {
        return $('#menu').find('> .k-item > .k-link').eq(index);
    }

    var menu;
    var assertOk = function() { assert.isOk(true); };

    describe("menu api", function () {
        beforeEach(function () {
            Mocha.fixture.append(
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
        });
        afterEach(function () {
            kendo.destroy(menu.element);
        });

    it('.k-context-menu is placed on root element', function () {
        assert.isOk(menu.element.is(".k-context-menu"));
    });

    it('Popup widget is initialized on the root element', function () {
        assert.isOk(menu.popup == menu.element.data("kendoPopup"))
    });

    it('right click on target opens menu', function () {
        $("#target").trigger("contextmenu");

        assert.isOk(menu.popup.visible());
    });

    it('right click on body doesn\'t open menu', function () {
        $("body").trigger("contextmenu");

        assert.isOk(!menu.popup.visible());
    });

    it('right click on filter opens menu', function () {
        menu.setOptions({
            filter: ".filter"
        });

        $(".filter").eq(0).trigger("contextmenu");

        assert.isOk(menu.popup.visible());
    });

    it('right click on target with filter doesn\'t open menu', function () {
        menu.setOptions({
            filter: ".filter"
        });

        $(".target").trigger("contextmenu");

        assert.isOk(!menu.popup.visible());
    });

    it('right click on jquery filter selector opens menu', function () {
        menu.setOptions({
            filter: ".filter:not('.exclude')"
        });

        $(".filter").eq(0).trigger("contextmenu");
        assert.isOk(menu.popup.visible());
    });

    it('right click on excluded element from filter selector does not open menu', function () {
        menu.setOptions({
            filter: ".filter:not('.exclude')"
        });

        $(".filter").eq(2).trigger("contextmenu");
        assert.isOk(!menu.popup.visible());
    });

    it('right click on complex jquery filter selector opens menu', function () {
        menu.setOptions({
            filter: ".filter:not(div:has(.exclude))"
        });

        $(".filter").eq(0).trigger("contextmenu");
        assert.isOk(menu.popup.visible());
    });

    it('right click on excluded element from complex filter selector does not open menu', function () {
        menu.setOptions({
            filter: ".filter:not(div:has(.exclude))"
        });

        $(".filter").eq(2).trigger("contextmenu");
        assert.isOk(!menu.popup.visible());
    });

    it('click on target opens menu when showOn is click', function () {
        menu.setOptions({
            showOn: "click"
        });

        $("#target").click();

        assert.isOk(menu.popup.visible());
    });

    it('menu is aligned to the target if alignToAnchor is true', function () {
        menu.setOptions({
            alignToAnchor: true
        });

        $("#target").trigger("contextmenu");

        var popupOffset = menu.popup.wrapper.offset(),
            targetOffset = $("#target").offset();


        assert.isOk(menu.popup.visible());
        assert.isOk(popupOffset.left == targetOffset.left);
        assert.isOk(popupOffset.top == targetOffset.top + $("#target").height());
    });

    it('menu is aligned to the filter item if alignToAnchor is true', function () {
        menu.setOptions({
            filter: ".filter",
            alignToAnchor: true
        });

        $(".filter").eq(1).trigger("contextmenu");

        var popupOffset = menu.popup.wrapper.offset(),
            targetOffset = $(".filter").eq(1).offset();


        assert.isOk(menu.popup.visible());
        assert.isOk(popupOffset.left == targetOffset.left);
        assert.isOk(popupOffset.top == targetOffset.top + $(".filter").eq(1).height());
    });

    /* API */

    it('calling open raises open event', function () {
        menu.bind("open", function () {
            assert.isOk(true);
        });

        menu.open();
    });

    it('Overflow context menu - calling open raises open event', function () {
        menu.options.scrollable = true;
        menu._initOverflow({scrollable: true, orientation:"vertical"});

        menu.bind("open", function () {
            assert.isOk(true);
        });

        menu.open();
    });

    it('calling close raises close event if popup is visible', function () {
        menu.bind("close", function () {
            assert.isOk(true);
        });

        menu.open();
        menu.close();
    });

    it('Overflow context menu - calling close raises close event if popup is visible', function () {
        menu.options.scrollable = true;
        menu._initOverflow({scrollable: true, orientation:"vertical"});

        menu.bind("close", function () {
            assert.isOk(true);
        });

        menu.open();
        menu.close();
    });

    it('calling open shows the popup', function () {
        menu.open();

        assert.isOk(menu.popup.visible());
    });

    it('Overflow context menu - calling open shows the popup', function () {
        menu.options.scrollable = true;
        menu._initOverflow({scrollable: true, orientation:"vertical"});

        menu.open();

        assert.isOk(menu.popup.visible());
        assert.isOk(menu.popup.element.height() > 0);
    });

    it('calling open with position shows the popup at that position', function () {
        menu.open(100, 100);

        var offset = menu.popup.element.offset();
        assert.isOk(offset.left == 100);
        assert.isOk(offset.top == 100);
    });

    it('preventing open should not open the popup', function () {
        menu.bind("open", function (e) {
            e.preventDefault();
        });

        menu.open();

        assert.isOk(!menu.popup.visible());
    });

    it('preventing close should not close the popup', function () {
        menu.bind("close", function (e) {
            e.preventDefault();
        });

        menu.open();
        menu.close();

        assert.isOk(menu.popup.visible());
    });

    it('events should pass the current target regardless of alignToAnchor', function () {
        menu.setOptions({
            filter: ".filter",
            showOn: "click"
        });

        menu.bind("select", function (e) {
            assert.isOk(e.target = $(".filter")[0]);
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


    it("open event's target argument should point to the DOM element that was clicked, no align", function(){
        var target;
        menu.setOptions({
            alignToAnchor: false,
            showOn: "click",
            target: ".filter"
        });

        menu.bind("open", function (e) {
            assert.equal($(e.target).text(), $(target).text());
        });

        target = $(".filter:first");
        target.click();

        target = $(".filter:last");
        target.click();
    });
    it("open event's target argument should point to the DOM element that was clicked", function(){
        var target;
        menu.setOptions({
            alignToAnchor: true,
            showOn: "click",
            target: ".filter"
        });

        menu.bind("open", function (e) {
            assert.equal($(e.target).text(), $(target).text());
        });

        target = $(".filter:first");
        target.click();

        target = $(".filter:last");
        target.click();
    });

    it("the element containing the context menu should be the element it was appended to", function(){
        var menuContainer = $('<div id="menu-container">&nbsp;</div>').appendTo(Mocha.fixture);
        var secondContextMenu = $('<div id="context-menu">&nbsp;</div>').appendTo(Mocha.fixture);
        var contextMenu = new kendo.ui.ContextMenu("#context-menu", { target: "#menu-container", appendTo: "#menu-container"});

        assert.isOk($('#context-menu').parent().is("#menu-container"));
        contextMenu.destroy();
        menuContainer.remove();
    });

    it('overflow context menu - setOptions reattach events', function() {
        mockFunc(kendo.ui.ContextMenu.fn, "_detachMenuEventsHandlers", assertOk);
        mockFunc(kendo.ui.ContextMenu.fn, "_destroyOverflow", assertOk);
        mockFunc(kendo.ui.ContextMenu.fn, "_initOverflow", assertOk);
        mockFunc(kendo.ui.ContextMenu.fn, "_attachMenuEventsHandlers", assertOk);

        menu.setOptions({scrollable: true, orientation:"vertical"});

        removeMocksIn(kendo.ui.ContextMenu.fn);
    });

    it('overflow context menu - remove oveflow', function() {
        menu.setOptions({scrollable: true, orientation:"vertical"});
        menu.setOptions({scrollable: false, orientation:"vertical"});

        menu.open();

        assert.isOk(menu.popup.visible());
    });

    it('overflow context menu - destroy oveflow', function() {
        menu.setOptions({scrollable: true, orientation:"vertical"});
        mockFunc(kendo.ui.ContextMenu.fn, "_detachMenuEventsHandlers", assertOk);

        menu.destroy();

        assert.isOk(!menu._overflowWrapper());

        removeMocksIn(kendo.ui.ContextMenu.fn);
    });

    });
}());

