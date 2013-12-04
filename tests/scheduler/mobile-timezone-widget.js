(function() {
    var MobileTimezoneEditor = kendo.ui.MobileTimezoneEditor,
        div;

    module("kendo.ui.MobileTimezoneEditor initialization", {
        setup: function() {
            div = $("<div />").appendTo(QUnit.fixture);
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("kendoTimezoneEditor attaches a MobileTimezoneEditor object to target", function() {
        div.kendoMobileTimezoneEditor();

       ok(div.data("kendoMobileTimezoneEditor") instanceof MobileTimezoneEditor);
    });

    test("MobileTimezoneEditor creates query from windows_zones", function() {
        var widget = new MobileTimezoneEditor(div);

        ok(widget._zonesQuery);
        equal(widget._zonesQuery.data.length, kendo.timezone.windows_zones.length);
    });

    test("MobileTimezoneEditor renders zone_titles select", function() {
        var widget = new MobileTimezoneEditor(div),
            zone_title = div.find("select:first");

        ok(zone_title);

        equal(zone_title.children().length, kendo.timezone.zones_titles.length + 1);
    });

    test("MobileTimezoneEditor renders zones dropdownlist", function() {
        var widget = new MobileTimezoneEditor(div),
            zone = div.find("select").eq(1);

        ok(zone);
        ok(!zone.is(":visible"));

        equal(zone.children().length, 0);
    });

    test("MobileTimezoneEditor selects zone_title based on timezone", function() {
        var widget = new MobileTimezoneEditor(div);
        var zone_title = div.find("select").eq(0);
        var zone = div.find("select").eq(1);

        widget.value("Europe/Sofia");

        equal(widget.value(), "Europe/Sofia");
        equal(zone.val(), "Europe/Sofia");
        equal(zone_title.val(), "FLE Standard Time");

        ok(zone.is(":visible"));
    });

    test("MobileTimezoneEditor shows second select if more timezones are available", function() {
        var widget = new MobileTimezoneEditor(div);
        var zone_title = div.find("select").eq(0);
        var zone = div.find("select").eq(1);

        widget.value("America/New_York");

        ok(zone.is(":visible"));
        equal(zone.val(), "America/New_York");
        equal(zone_title.val(), "Eastern Standard Time");
    });

    test("MobileTimezoneEditor clears selection if no such timezone", function() {
        var widget = new MobileTimezoneEditor(div);
        var zone_title = div.find("select").eq(0);
        var zone = div.find("select").eq(1);

        widget.value("America/New_York");
        widget.value("test");

        ok(!zone.is(":visible"));
        equal(zone_title.val(), "");
    });

    test("MobileTimezoneEditor selects America/Toronto", function() {
        var widget = new MobileTimezoneEditor(div);
        var zone_title = div.find("select").eq(0);
        var zone = div.find("select").eq(1);

        widget.value("America/Toronto");

        equal(zone.val(), "America/Toronto");
        equal(zone_title.val(), "Eastern Standard Time");
    });

    module("kendo.ui.MobileTimezoneEditor interaction", {
        setup: function() {
            div = $("<div />").appendTo(QUnit.fixture);
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("Select zone_title selects timezone", function() {
        var widget = new MobileTimezoneEditor(div);
        var zone_title = div.find("select").eq(0);
        var zone = div.find("select").eq(1);

        zone_title[0].selectedIndex = 1;
        zone_title.trigger("change");

        ok(widget.value());
        equal(widget.value(), zone.val());
    });

    test("Select option label clears widget value", function() {
        var widget = new MobileTimezoneEditor(div);
        var zone_title = div.find("select").eq(0);
        var zone = div.find("select").eq(1);

        zone_title[0].selectedIndex = 1;
        zone_title.trigger("change");

        zone_title[0].selectedIndex = 0;
        zone_title.trigger("change");

        equal(widget.value(), "");
        equal(widget.value(), zone[0].value);
    });

    test("Select specific value from second dropdownlist changes widget value", function() {
        var widget = new MobileTimezoneEditor(div);
        var zone_title = div.find("select").eq(0);
        var zone = div.find("select").eq(1);

        zone_title.val("Eastern Standard Time");

        zone[0].selectedIndex = 2;
        zone.trigger("change");

        equal(widget.value(), zone[0].value);
    });

    module("kendo.ui.MobileTimezoneEditor events", {
        setup: function() {
            div = $("<div />").appendTo(QUnit.fixture);
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("Select zone_title triggers change", 1, function() {
        var widget = new MobileTimezoneEditor(div, {
            change: function() {
                ok(true);
            }
        });

        var zone_title = div.find("select").eq(0);
        var zone = div.find("select").eq(1);

        zone_title.val("Eastern Standard Time");
        zone_title.trigger("change");
    });

    test("Select zone triggers change", 1, function() {
        var widget = new MobileTimezoneEditor(div, {
            change: function() {
                ok(true);
            }
        });

        var zone_title = div.find("select").eq(0);
        var zone = div.find("select").eq(1);

        zone_title.val("Eastern Standard Time");

        zone.val("Eastern Standard Time");
        zone.trigger("change");
    });

    test("Clear timezone triggers change", 1, function() {
        var widget = new MobileTimezoneEditor(div);

        var zone_title = div.find("select").eq(0);
        var zone = div.find("select").eq(1);

        zone_title.val("Eastern Standard Time");
        zone_title.trigger("change");

        widget.bind("change", function() { ok(true); });

        zone_title.val("");
        zone_title.trigger("change");
    });
})();
