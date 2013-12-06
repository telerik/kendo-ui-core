(function() {
var isRaised;

var argsCheck = false;

//handlers
function Select(e) {
    if (argsCheck) {
        isRaised = !!e.contentElement;
        argsCheck = false;
    } else
        isRaised = true;
}


var tabstrip;

module('tabstrip ajax loading', {
    setup: function() {
        kendo.effects.disable();

        QUnit.fixture.append(
            '<div id="tabstrip">' +
            '    <ul>' +
            '        <li class="k-state-active">ASP.NET MVC</li>' +
            '        <li class="k-state-disabled">Silverlight</li>' +
            '        <li>ASP.NET AJAX</li>' +
            '        <li>OpenAccess ORM</li>' +
            '        <li>Reporting</li>' +
            '        <li>Sitefinity ASP.NET CMS</li>' +
            '    </ul>' +
            '    <div>' +
            '        <ul>' +
            '            <li>Pure ASP.NET MVC components</li>' +
            '            <li>Completely Open Source</li>' +
            '            <li>Exceptional Performance</li>' +
            '            <li>Based on jQuery</li>' +
            '            <li>Search Engine Optimized</li>' +
            '            <li>Cross-browser support</li>' +
            '        </ul>' +
            '    </div>' +
            '    <div></div>' +
            '    <div></div>' +
            '    <div></div>' +
            '    <div></div>' +
            '    <div></div>' +
            '</div>'
        );

        $.mockjaxSettings.responseTime = 0;

        $.mockjax({
            url: "error.html",
            response: function() {
                this.responseText = 'foo<script type="text/javascript">throw new Error("Exception required to fire the error event")<' + '/script>';
            }
        });

        $.mockjax({
            url: "ajax-view-one.html",
            response: function() {
                this.responseText = "<p>This content was loaded via ajax ().</p>"
            }
        });

        $.mockjax({
            url: "ajax-view-two.html",
            response: function() {
                this.responseText = "<p>This content was loaded via ajax ().</p>"
            }
        });

        tabstrip = new kendo.ui.TabStrip("#tabstrip", {
            animation: false,
            select: Select,
            contentUrls: [
                'ajax-view-one.html', 'ajax-view-two.html', 'ajax-view-one.html', 'ajax-view-two.html', 'ajax-view-one.html', 'error.html'
            ]
        });
    },

    teardown: function () {
        kendo.effects.enable();
        tabstrip.destroy();
    }
});

function getRootItem(index) {
    return $('#tabstrip').find('.k-item').eq(index)
}

asyncTest('clicking should make clicked item active', 1, function() {
    var item = getRootItem(2);

    tabstrip.bind("activate", function() {
        ok(item.hasClass('k-state-active'));
        start();
    });

    item.find('> .k-link').trigger('click');
});

asyncTest('clicking should make all items except clicked unactive', function() {
    var item = getRootItem(0);

    item.find('> .k-link').trigger('click');

    setTimeout(function() {
        equal(item.parent().find('.k-state-active').length, 1);
        start();
    });
});

test('ajax content url should be attached to item', function() {
    var item = getRootItem(4);

    equal(item.find('> .k-link').data('contentUrl'), 'ajax-view-one.html');
});

asyncTest('loading ajax content should trigger adding the loading element to the tab', function() {
    var item = getRootItem(3);

    tabstrip.bind("select", function () {
        setTimeout(function () {
            start();
            ok(item.find('.k-loading').width() - item.width() <= 1);
        });
    });

    item.click();
});

asyncTest("ajax content with error fires error handler and writes the error message to the console", 1, function () {
    var item = getRootItem(5);

    tabstrip.bind("error", function (e) {
        ok(true);
        start();
    });

    item.click();
});

})();
