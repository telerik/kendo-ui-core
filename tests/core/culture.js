(function(){

var culture = kendo.culture;

module("kendo.culture", {
    setup: function() {
        this.de = kendo.cultures["de-DE"];
    },
    teardown: function() {
        kendo.culture("en-US");
        kendo.cultures["de-DE"] = this.de;
    }
});

test("default culture should be en-US", function() {
    ok(kendo.cultures.current);
    equal(kendo.cultures.current.name, "en-US");
});

test("culture should set cultures.current", function() {
    culture("en-US");
    ok(kendo.cultures.current);
    equal(kendo.cultures.current.name, "en-US");
});

test("additional cultures can be added to kendo.cultures", function() {
    kendo.cultures["de-DE"] = { name: "de-DE", calendars: {standard: {}}};
    culture("de-DE");
    ok(kendo.cultures.current);
    equal(kendo.cultures.current.name, "de-DE");
});

test("if no culture set en-US", function() {
    var cultureName = "no-such-culture";
    culture(cultureName);
    ok(kendo.cultures.current);
    equal(kendo.cultures.current.name, "en-US");
});

test("culture() should return cultures.current", function() {
    equal(culture(), kendo.cultures.current);
});

test("culture method fallbacks to more general culture indentifier", function() {
    kendo.cultures["fr"] = { name: "fr", calendars: {standard: {}}};
    culture("fr-FR");

    equal(kendo.cultures.current.name, "fr");
});

test("findCulture method returns culture", function() {
    kendo.cultures["de-DE"] = { name: "de-DE", calendars: {standard: {}}};

    var result = kendo.findCulture("de-DE");

    equal(result.name, "de-DE");
});

test("findCulture method returns closest culture", function() {
    kendo.cultures["fr"] = { name: "fr", calendars: {standard: {}}};

    var result = kendo.findCulture("fr-FR");

    equal(result.name, "fr");
});

test("findCulture method returns null", function() {
    var result = kendo.findCulture("no-such-culture");

    equal(result, null);
});

test("findCulture method returns argument if it is a culture object", function() {
    var culture = { numberFormat: {}};
    var result = kendo.findCulture(culture);

    equal(result, culture);
});

}());
