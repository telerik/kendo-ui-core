(function () {
    var panelbar;
    var ul;

    module("panelbar ajax loading", {
        setup: function() {
            kendo.effects.disable();

            QUnit.fixture.append(
                '<ul class="k-widget k-panelbar k-reset" id="panelbar" style="width: 300px; float: left; visibility: hidden; position: absolute;">' +
                '    <li><a>Pure ASP.NET MVC components</a>' +
                '       <div></div>' +
                '   </li>' +
                '   <li><a>Completely Open Source</a>' +
                '       <div></div>' +
                '   </li>' +
                '   <li><a>Exceptional Performance</a>' +
                '       <div></div>' +
                '   </li>' +
                '   <li><a>Based on jQuery</a>' +
                '       <div></div>' +
                '   </li>' +
                '   <li>Wide Cross-browser support' +
                '       <div></div>' +
                '   </li>' +
                '   <li>Wide Cross-browser support' +
                '       <div></div>' +
                '   </li>' +
                '</ul>'
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

            ul = $("#panelbar");

            panelbar = new kendo.ui.PanelBar(ul, {
                animation: false,
                contentUrls: [
                    'ajax-view-one.html', 'ajax-view-two.html', 'ajax-view-one.html', 'ajax-view-two.html', 'ajax-view-one.html', 'error.html'
                ]
            });
        },
        teardown: function() {
            kendo.effects.enable();
            panelbar.destroy();
        }
    });

    function getRootItem(index) {
        return ul.children().eq(index).children(".k-link");
    }

    test("PanelBar renders anchor instead of span if contentUrl", function() {
        var children = ul.find("li:last").children();

        equal(children.filter("a").length, 1);
        equal(children.filter("span").length, 0)
    });

    asyncTest("clicking collapsed content items should expand them", 1, function() {
        var item = getRootItem(0);

        panelbar.bind("contentLoad", function() {
            start();
            equal($(arguments[0].contentElement).css("display"), "block");
            panelbar.unbind("contentLoad");
        });

        item.trigger("click");
    });

    test("clicking expanded content items should collapse them", function() {
        var item = getRootItem(0);

        item.trigger("click");

        equal(item.parent().find(".k-content").css("display"), "none");
    });

    asyncTest("clicking collapsed content items should toggle arrow", 1, function() {
        var item = getRootItem(1);

        panelbar.bind("contentLoad", function() {
            start();
            ok($(arguments[0].item).find(".k-icon").hasClass("k-i-arrow-n"));
            panelbar.unbind("contentLoad");
        });

        item.trigger("click");
    });

    test("clicking expanded content items should toggle arrow", 1, function() {
        var item = getRootItem(1);

        item.trigger("click");

        ok(item.find(".k-icon").hasClass("k-i-arrow-s"));
    });

    asyncTest("clicking should make item active", 1, function() {
        var item = getRootItem(2);

        panelbar.bind("contentLoad", function() {
            start();
            ok(item.parent().hasClass("k-state-active"));
            panelbar.unbind("contentLoad");
        });

        item.click();
    });

    asyncTest("initially expanded items fetch their AJAX content", 1, function() {
        kendo.destroy(QUnit.fixture);

        QUnit.fixture.html("")
             .append(
                '<ul id="panelbar">' +
                '    <li><a>Pure ASP.NET MVC components</a>' +
                '       <div></div>' +
                '   </li>' +
                '   <li class="k-state-active"><a>Completely Open Source</a>' +
                '       <div></div>' +
                '   </li>' +
                '</ul>'
             );

        ul = $("#panelbar");

        panelbar = new kendo.ui.PanelBar(ul, {
            animation: false,
            contentUrls: [
                'ajax-view-one.html', 'ajax-view-two.html'
            ]
        });

        var item = getRootItem(1);

        panelbar.bind("contentLoad", function() {
            start();
            equal(item.parent().find(".k-content").css("display"), "block");
            panelbar.unbind("contentLoad");
        });
    });

    asyncTest("ajax content with error fires error handler and writes the error message to the console", 1, function () {
        var item = getRootItem(5);

        panelbar.bind("error", function (e) {
            start();
            ok(true);
        });

        item.click();
    });
})();
