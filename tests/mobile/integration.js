(function() {
    module("tabstrip with application", {
        setup: function() {
            $("#qunit-fixture").css({ height: "100px", overflow: "hidden" });
        },
        teardown: function() {
            location.hash = '';
        }
    });

    test("preventing tabstrip navigation does not navigate the application", function() {
        window.tabstripPrevent = function(e) {
            e.preventDefault();
        }
        $("#qunit-fixture").html('<div><div data-role="view" id="foo"/> <div id="bar" data-role="view" />\
            <div data-role="layout" data-id="default"><footer data-role="footer">\
            <div data-role="tabstrip" data-select="window.tabstripPrevent"><a href="#foo">Foo</a><a href="#bar">Bar</a></div>\
        </footer></div></div>');

        var app = new kendo.mobile.Application($("#qunit-fixture").children().first(), {
            layout: "default"
        });

        var barLink = $("#qunit-fixture").find("a").eq(1);
        barLink.trigger($.Event("mousedown"));
        ok(!$("#qunit-fixture").find("#bar").is(":visible"));
        app.destroy();
    });
})();

