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

    module('tabstrip ajax loading', {
        setup: function() {
            kendo.effects.disable();
            $.mockjax({
                url: "error.html",
                response: function() {
                    this.responseText = 'foo<script type="text/javascript">throw new Error("Exception required to fire the error event")<' + '/script>';
                }
            });

            $.mockjax({
                url: "AjaxView1.html",
                response: function() {
                    this.responseText = __html__['tests/tabstrip/ajax-view1-fixture.html'];
                }
            });

            $.mockjax({
                url: "AjaxView2.html",
                response: function() {
                    this.responseText = __html__['tests/tabstrip/ajax-view2-fixture.html'];
                }
            });

            QUnit.fixture.html(__html__['tests/tabstrip/ajax-loading-fixture.html']);
            $("#TabStrip1").kendoTabStrip({ animation: false, select: Select, contentUrls: [ 'AjaxView1.html', 'AjaxView2.html', 'AjaxView1.html', 'AjaxView2.html', 'AjaxView1.html', 'error.html' ] });
            window.con = window.console;
        },

        teardown: function () {
            kendo.effects.enable();
            window.console = window.con;
        }
    });


    function getRootItem(index) {
        return $('#TabStrip1').find('.k-item').eq(index)
    }

    function getTabStrip() {
        return $("#TabStrip1").data("kendoTabStrip");
    }

    asyncTest('clicking should make clicked item active', 1, function() {
        var item = getRootItem(2);

        item.find('> .k-link').trigger('click');

        setTimeout(function() {
            ok(item.hasClass('k-state-active'));
            start();
        }, 500);
    });

    asyncTest('clicking should make all items except clicked unactive', function() {
        var item = getRootItem(0);

        item.find('> .k-link').trigger('click');

        setTimeout(function() {
            equal(item.parent().find('.k-state-active').length, 1);
            start();
        }, 10);
    });

    test('ajax content url should be attached to item', function() {
        var item = getRootItem(4);

        equal(item.find('> .k-link').data('contentUrl'), 'AjaxView1.html');
    });

    asyncTest('loading ajax content should trigger adding the loading element to the tab', function() {
        var tabStrip = getTabStrip(),
            item = getRootItem(3);

        tabStrip.bind("select", function () {
            tabStrip.unbind("select");
            setTimeout(function () {
                start();
                ok(item.find('.k-loading').width() - item.width() <= 1);
            }, 250);
        });

        item.click();
    });

    asyncTest("ajax content with error fires error handler and writes the error message to the console", 1, function () {
        var tabStrip = getTabStrip(),
            item = getRootItem(5);

        tabStrip.bind("error", function (e) {
            ok(true);
            start();
        });

        item.click();
    });
})();
