import '@progress/kendo-ui/src/kendo.core.js';
import '@progress/kendo-ui/src/cultures/kendo.culture.fr-FR.js';
import '@progress/kendo-ui/src/cultures/kendo.culture.de-DE.js';

var culture = kendo.culture;

describe("kendo.culture", function() {
    afterEach(function() {
        kendo.culture("en-US");
        delete kendo.cultures["bs"];
    });

    it("default culture should be en-US", function() {
        assert.isOk(kendo.cultures.current);
        assert.equal(kendo.cultures.current.name, "en-US");
    });

    it("culture should set cultures.current", function() {
        culture("en-US");
        assert.isOk(kendo.cultures.current);
        assert.equal(kendo.cultures.current.name, "en-US");
    });

    it("additional cultures can be added to kendo.cultures", function() {
        kendo.cultures["de-DE"] = { name: "de-DE", calendars: { standard: {} } };
        culture("de-DE");
        assert.isOk(kendo.cultures.current);
        assert.equal(kendo.cultures.current.name, "de-DE");
    });

    it("if no culture set en-US", function() {
        var cultureName = "no-such-culture";
        culture(cultureName);
        assert.isOk(kendo.cultures.current);
        assert.equal(kendo.cultures.current.name, "en-US");
    });

    it("culture() should return cultures.current", function() {
        assert.equal(culture(), kendo.cultures.current);
    });

    it("culture method fallbacks to more general culture indentifier", function() {
        kendo.cultures["bs"] = { name: "bs", calendars: { standard: {} } };
        culture("bs-BS");

        assert.equal(kendo.cultures.current.name, "bs");
    });

    it("findCulture method returns culture", function() {
        kendo.cultures["de-DE"] = { name: "de-DE", calendars: { standard: {} } };

        var result = kendo.findCulture("de-DE");

        assert.equal(result.name, "de-DE");
    });

    it("findCulture method returns closest culture", function() {
        kendo.cultures["bs"] = { name: "bs", calendars: { standard: {} } };

        var result = kendo.findCulture("bs-BS");

        assert.equal(result.name, "bs");
    });

    it("findCulture method returns null", function() {
        var result = kendo.findCulture("no-such-culture");

        assert.equal(result, null);
    });

    it("findCulture method returns argument if it is a culture object", function() {
        var culture = { numberFormat: {} };
        var result = kendo.findCulture(culture);

        assert.equal(result, culture);
    });

});
