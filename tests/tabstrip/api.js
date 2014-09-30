(function() {
var isRaised, isActivateRaised;
var argsCheck = false;

function getRootItem(index) {
    return $('#tabstrip').find('.k-item').eq(index);
}

function getTabStrip(selector) {
    return $(selector || "#tabstrip").data("kendoTabStrip");
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
        QUnit.fixture.append(
            ' <div class="k-widget k-tabstrip k-header" id="tabstrip" style="visibility: hidden;">' +
            '    <ul class="k-reset k-tabstrip-items">' +
            '        <li class="k-item k-state-default k-state-active"><a class="k-link" href="#tabstrip-1">ASP.NET MVC</a></li>' +
            '        <li class="k-item k-state-default"><a class="k-link" href="#tabstrip-2">Silverlight</a></li>' +
            '        <li class="k-item k-state-default"><a class="k-link" href="#tabstrip-3">ASP.NET AJAX</a></li>' +
            '        <li class="k-item k-state-default"><a class="k-link" href="#tabstrip-4">OpenAccess ORM</a></li>' +
            '        <li class="k-item k-state-default"><a class="k-link" href="#tabstrip-5">Reporting</a></li>' +
            '        <li class="k-item k-state-default"><a class="k-link" href="#tabstrip-6">Sitefinity ASP.NET CMS</a></li>' +
            '        <li class="k-item k-state-default"><a class="k-link" href="http://www.google.com">Sitefinity ASP.NET CMS</a></li>' +
            '    </ul>' +
            '    <div class="k-content k-state-active" id="tabstrip-1" style="display: block;">' +
            '        <ul>' +
            '            <li>Pure ASP.NET MVC components</li>' +
            '            <li>Completely Open Source</li>' +
            '            <li>Exceptional Performance</li>' +
            '            <li>Based on jQuery</li>' +
            '            <li>Search Engine Optimized</li>' +
            '            <li>Cross-browser support</li>' +
            '        </ul>' +
            '    </div>' +
            '    <div class="k-content" id="tabstrip-2">' +
            '        <ul>' +
            '            <li>Built on Silverlight 3</li>' +
            '            <li>RIA services support</li>' +
            '            <li>Validation support</li>' +
            '            <li>Out of browser support</li>' +
            '            <li>The first commercial 3D chart</li>' +
            '            <li>Free testing framework</li>' +
            '        </ul>' +
            '    </div>' +
            '    <div class="k-content" id="tabstrip-3">' +
            '        <ul>' +
            '            <li>Built on top of Microsoft ASP.NET AJAX framework</li>' +
            '            <li>Rich client-side capabilities; nearly identical client-side and server-side APIs</li>' +
            '            <li>.NET 3.5 built-in support for LINQ, EntityDataSource, ADO.NET DataServices, WCF, etc</li>' +
            '            <li>Performance optimization helper controls and HTTP compression</li>' +
            '            <li>SharePoint and DotNetNuke Integration; ASP.NET MVC-ready</li>' +
            '            <li>Wide cross-browser compatible and XHTML compliant</li>' +
            '        </ul>' +
            '    </div>' +
            '    <div class="k-content" id="tabstrip-4">' +
            '        <ul>' +
            '            <li>Model First and Schema First approaches</li>' +
            '            <li>Stored Procedures for Multiple Databases</li>' +
            '            <li>Views for Multiple Databases</li>' +
            '            <li>Generic Metadata Access and artificial fields API in the runtime</li>' +
            '            <li>Support for Ado.Net Data Services and WCF</li>' +
            '            <li>Support for LINQ, OQL, and SQL Languages</li>' +
            '        </ul>' +
            '    </div>' +
            '    <div class="k-content" id="tabstrip-5">' +
            '        <ul>' +
            '            <li>Excellent data presentation and analysis: Crosstabs, Charts, Tables, Lists</li>' +
            '            <li>SubReports, Barcodes, Images, Shapes, and more</li>' +
            '            <li>Revolutionary WYSIWYG design surface in Visual Studio</li>' +
            '            <li>Easy conditional formatting, sorting, filtering, grouping</li>' +
            '            <li>Powerful styling, data binging and data processing models</li>' +
            '            <li>Significantly reduced development time through wizards and builders</li>' +
            '        </ul>' +
            '    </div>' +
            '    <div class="k-content" id="tabstrip-6">' +
            '        <ul>' +
            '            <li>Multi-lingual Content Integration</li>' +
            '            <li>Workflow Engine</li>' +
            '            <li>Document versioning</li>' +
            '            <li>Permissions</li>' +
            '            <li>Interface Localization</li>' +
            '            <li>Wide cross-browser compatible and XHTML compliant</li>' +
            '        </ul>' +
            '    </div>' +
            '</div>' +
            '<div id="parent-tabstrip" class="k-widget k-tabstrip k-header" style="visibility: hidden; position: absolute;">' +
            '    <ul class="k-reset k-tabstrip-items">' +
            '        <li class="k-item k-state-default">Tab 1</li>' +
            '        <li class="k-item k-state-default k-state-active">Tab 2</li>' +
            '    </ul>' +
            '    <div id="parent-tabstrip-1" class="k-content">foo</div>' +
            '    <div id="parent-tabstrip-2" class="k-content" style="display: block;">' +
            '        <div id="child-tabstrip" class="k-widget k-tabstrip k-header">' +
            '            <ul class="k-reset k-tabstrip-items">' +
            '                <li class="k-item k-state-default">foo</li>' +
            '                <li class="k-item k-state-default k-state-active">bar</li>' +
            '            </ul>' +
            '            <div id="child-tabstrip-1">foo</div>' +
            '            <div id="child-tabstrip-2" style="display: block;">bar</div>' +
            '        </div>' +
            '    </div>' +
            '</div>'
        );

        $("#tabstrip").kendoTabStrip({ animation: false, select: Select, activate: Activate });
        $("#parent-tabstrip").kendoTabStrip({ animation: false });
        $("#child-tabstrip").kendoTabStrip({ animation: false });
    },
    teardown: function() {
        kendo.destroy(QUnit.fixture);
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

asyncTest('clicking should raise onActivate event when the new contentElement is visible and scrollWrap should be sized accordingly', function() {
    var tabstrip = getTabStrip();
    var item = getRootItem(1);

    isActivateRaised = false;

    var height = Math.round(tabstrip.scrollWrap.height());
    item.find('> .k-link').trigger('click');

    setTimeout(function () {
        ok(isActivateRaised);
        equal(height, Math.round(tabstrip.scrollWrap.height()));
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
    equal($('#tabstrip .k-content').css('opacity'), '1');
});

test('remove method removes several tabs and their content elements', 2, function() {
    var tabStrip = $("<ul><li>Tab 1</li><li>Tab 2</li></ul>").kendoTabStrip().data("kendoTabStrip");

    try {
        tabStrip.remove("li");

        ok(tabStrip.tabGroup.is(":empty"));
        ok(!tabStrip.tabGroup.next()[0]);
    } finally {
        tabStrip.destroy();
    }
});

test('insertAfter method moves a tab and its content elements if called with existing tab', 2, function() {
    var tabStrip = $("<div><ul><li>Tab 1</li><li>Tab 2</li></ul><div>Content 1</div><div>Content 2</div></div>").kendoTabStrip().data("kendoTabStrip");

    try {
        tabStrip.insertAfter("li:contains(Tab 1)", "li:last-child");

        ok(tabStrip.tabGroup.children("li:last-child").text() == "Tab 1");
        ok(tabStrip.element.children("div:last-child").text() == "Content 1");
    } finally {
        tabStrip.destroy();
    }
});

test('select method ignores nested TabStrips', function() {
    var parentTabstrip = getTabStrip("#parent-tabstrip"),
        idx = parentTabstrip.select().index();

    equal(idx, 1);
});

function createTabStrip(options) {
    if ($.isArray(options)) {
        options = { dataSource: options };
    }

    return $("<div />").appendTo(QUnit.fixture).kendoTabStrip($.extend({
        dataTextField: "text",
        dataContentField: "content"
    }, options)).data("kendoTabStrip");
}

test("remove method calls kendo.destroy on removed contentElements", 2, function() {
    var tabStrip = createTabStrip([ { text: "foo" }, { text: "bar" } ]);
    var destroy = kendo.destroy;

    try {
        kendo.destroy = function() { ok(true); }

        tabStrip.remove("li");
    } finally {
        kendo.destroy = destroy;
    }
});

test("remove method removes the specified tab", function() {
    var tabStrip = createTabStrip([ { text: "foo" }, { text: "bar" } ]);

    tabStrip.remove("li:eq(0)");

    var items = tabStrip.element.find("li");
    equal(items.length, 1);
    equal(items.text(), "bar");
});

test("remove method removes the content of the tab", function() {
    var tabStrip = createTabStrip([
        { text: "foo", content: "fcontent" },
        { text: "bar", content: "bcontent" }
    ]);

    tabStrip.remove("li:eq(1)");

    var items = tabStrip.element.find("div");
    equal(items.text(), "fcontent");
});
})();
