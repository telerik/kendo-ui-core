var SANS = "Arial,Helvetica,sans-serif",
    SANS11 = "11px " + SANS,
    SANS12 = "12px " + SANS,
    SANS16 = "16px " + SANS;

function ViewStub() {
    var view = this,
        log = view.log = { };

    log.rect = [];
    log.text = [];
    log.group = [];
    log.line = [];
    log.path = [];
    log.circle = [];
    log.sector = [];
    log.ring = [];
}

ViewStub.prototype = {
    createRect: function(box, style) {
        this.log.rect.push({
            x1: box.x1,
            y1: box.y1,
            x2: box.x2,
            y2: box.y2,
            style: style
        });

        return new kendo.dataviz.ViewElement(style);
    },

    createText: function(content, style) {
        this.log.text.push({
            content: content,
            style: style
        });

        return new kendo.dataviz.ViewElement(style);
    },

    createGroup: function(options) {
        this.log.group.push({options: options});
        return new kendo.dataviz.ViewElement(options);
    },

    createLine: function(x1, y1, x2, y2, options) {
        this.log.line.push({ x1: x1, y1: y1, x2: x2, y2: y2, options: options });
        return new kendo.dataviz.ViewElement(options);
    },

    createPolyline: function(points, closed, style) {
        this.log.path.push({ points: points, closed: closed, style: style });
        var element = new kendo.dataviz.ViewElement(style);
        element.points = points;
        element.closed = closed;
        element.clone = function() {
            return this;
        };
        return element;
    },

    createCircle: function(c, r, style) {
        this.log.circle.push({
            c: c, r: r, style: style });

        var element = new kendo.dataviz.ViewElement(style);
        element.c = c;
        element.r = r;

        return element;
    },

    createSector: function(sector, style) {
        this.log.sector.push({ sector: sector, style: style });

        return new kendo.dataviz.ViewElement(style);
    },

    createRing: function(ring, style) {
        this.log.ring.push({ ring: ring, style: style });

        return new kendo.dataviz.ViewElement(style);
    }
};

function ViewElementStub() {
    this.children = [];
}

function sameBox(a, b, tolerance) {
    same([a.x1, a.y1, a.x2, a.y2], [b.x1, b.y1, b.x2, b.y2], tolerance);
}

function stubMethod(fn, methodName, stub, callback) {
    var oldMethod = fn[methodName];

    fn[methodName] = stub;

    fn._stubbed = fn.overrides || [];
    fn._stubbed[methodName] = oldMethod;

    try {
        callback();
    }
    finally {
        fn[methodName] = oldMethod;
    }
}

function mapPoints(points) {
    return $.map(points, function(p) { return [[p.x, p.y]] });
}

function triggerEvent(eventName, element, offsetX, offsetY) {
    var offset = element.position(),
        e = new jQuery.Event(eventName);

    e.clientX = offset.left + (offsetX || 0);
    e.clientY = offset.top + (offsetY || 0);
    element.trigger(e);
}

function createChart(options) {
    $("#container").kendoChart(options);

    return $("#container").data("kendoChart");
}

function destroyChart(element) {
    var element = element || $("#container");
    kendo.destroy(element);
    element.unbind().empty();
}

function serializeFontCache() {
    var cache = kendo.dataviz.measureText.cache,
        ptr = cache._head,
        result = "(function() {\r\n" +
                  "    var cache = kendo.dataviz.measureText.cache;\r\n" +
                  "    cache._size = 100000;\r\n";

    while (ptr) {
        result += "    cache.put(\"" +
            ptr.key + "\", " +
            JSON.stringify(ptr.value) +
            ");\r\n";

        ptr = ptr.newer;
    }

    result += "})();";

    $(document.body)
        .empty()
        .append($("<textarea id='cache' rows='25' cols='160' />").text(result));
}

// Primed cache for measureText - used to avoid browser rendering differences
// Replace with the result from serializeFontCache();
(function() {
    var cache = kendo.dataviz.measureText.cache;
    cache._size = 100000;
    cache.put("My Titlefont12px sans-serifundefined", {"width":40,"height":15,"baseline":12});
    cache.put("My Titlefont16px Arial,Helvetica,sans-serifundefined", {"width":53,"height":19,"baseline":15});
    cache.put("My Titlefont10pt Comic Sansundefined", {"width":46,"height":16,"baseline":12});
    cache.put("font12px sans-serifundefined", {"width":0,"height":0,"baseline":0});
    cache.put("140font12px Arial,Helvetica,sans-serif0", {"width":21,"height":15,"baseline":12});
    cache.put("nullfont12px Arial,Helvetica,sans-serif0", {"width":0,"height":15,"baseline":12});
    cache.put("Baz: Salesfont12px Arial,Helvetica,sans-serifundefined", {"width":58,"height":15,"baseline":12});
    cache.put("90font12px Arial,Helvetica,sans-serif0", {"width":14,"height":15,"baseline":12});
    cache.put("95font12px Arial,Helvetica,sans-serif0", {"width":14,"height":15,"baseline":12});
    cache.put("105font12px Arial,Helvetica,sans-serif0", {"width":21,"height":15,"baseline":12});
    cache.put("115font12px Arial,Helvetica,sans-serif0", {"width":21,"height":15,"baseline":12});
    cache.put("125font12px Arial,Helvetica,sans-serif0", {"width":21,"height":15,"baseline":12});
    cache.put("Foofont12px Arial,Helvetica,sans-serifundefined", {"width":21,"height":15,"baseline":12});
    cache.put("Barfont12px Arial,Helvetica,sans-serifundefined", {"width":19,"height":15,"baseline":12});
    cache.put("Foo: Salesfont12px Arial,Helvetica,sans-serifundefined", {"width":59,"height":15,"baseline":12});
    cache.put("Bar: Salesfont12px Arial,Helvetica,sans-serifundefined", {"width":57,"height":15,"baseline":12});
    cache.put("Sales for product Foofont12px Arial,Helvetica,sans-serifundefined", {"width":117,"height":15,"baseline":12});
    cache.put("Sales for product Barfont12px Arial,Helvetica,sans-serifundefined", {"width":115,"height":15,"baseline":12});
    cache.put("Salesfont12px Arial,Helvetica,sans-serifundefined", {"width":32,"height":15,"baseline":12});
    cache.put("Janfont12px Arial,Helvetica,sans-serif0", {"width":20,"height":15,"baseline":12});
    cache.put("Febfont12px Arial,Helvetica,sans-serif0", {"width":21,"height":15,"baseline":12});
    cache.put("94font12px Arial,Helvetica,sans-serif0", {"width":14,"height":15,"baseline":12});
    cache.put("96font12px Arial,Helvetica,sans-serif0", {"width":14,"height":15,"baseline":12});
    cache.put("98font12px Arial,Helvetica,sans-serif0", {"width":14,"height":15,"baseline":12});
    cache.put("102font12px Arial,Helvetica,sans-serif0", {"width":21,"height":15,"baseline":12});
    cache.put("104font12px Arial,Helvetica,sans-serif0", {"width":21,"height":15,"baseline":12});
    cache.put("106font12px Arial,Helvetica,sans-serif0", {"width":21,"height":15,"baseline":12});
    cache.put("108font12px Arial,Helvetica,sans-serif0", {"width":21,"height":15,"baseline":12});
    cache.put("110font12px Arial,Helvetica,sans-serif0", {"width":21,"height":15,"baseline":12});
    cache.put("112font12px Arial,Helvetica,sans-serif0", {"width":21,"height":15,"baseline":12});
    cache.put("Titlefont10px sans-serifundefined", {"width":22,"height":13,"baseline":10});
    cache.put("Titlefont16px Arial,Helvetica,sans-serifundefined", {"width":29,"height":19,"baseline":15});
    cache.put("&nbsp;font12px Arial,Helvetica,sans-serifundefined", {"width":3,"height":15,"baseline":12});
    cache.put("textfont12px sans-serifundefined", {"width":18,"height":15,"baseline":12});
    cache.put("Series 2font12px Arial,Helvetica,sans-serifundefined", {"width":46,"height":15,"baseline":12});
    cache.put("Series 1font10px sans-serifundefined", {"width":38,"height":13,"baseline":10});
    cache.put("Series 1font12px sans-serifundefined", {"width":46,"height":15,"baseline":12});
    cache.put("Series 1font12px Arial,Helvetica,sans-serifundefined", {"width":46,"height":15,"baseline":12});
    cache.put("afont12px sans-serif0", {"width":7,"height":15,"baseline":12});
    cache.put("bfont12px sans-serif0", {"width":7,"height":15,"baseline":12});
    cache.put("Bfont12px sans-serif0", {"width":8,"height":15,"baseline":12});
    cache.put("Cfont12px sans-serif0", {"width":9,"height":15,"baseline":12});
    cache.put("3/1font12px sans-serif0", {"width":17,"height":15,"baseline":12});
    cache.put("3/2font12px sans-serif0", {"width":17,"height":15,"baseline":12});
    cache.put("3/3font12px sans-serif0", {"width":17,"height":15,"baseline":12});
    cache.put("3/4font12px sans-serif0", {"width":17,"height":15,"baseline":12});
    cache.put("Thu Mar 01 2012 00:00:00 GMT+0200 (FLE Standard Time)font12px sans-serif0", {"width":323,"height":15,"baseline":12});
    cache.put("Fri Mar 02 2012 00:00:00 GMT+0200 (FLE Standard Time)font12px sans-serif0", {"width":316,"height":15,"baseline":12});
    cache.put("Sun Mar 04 2012 00:00:00 GMT+0200 (FLE Standard Time)font12px sans-serif0", {"width":324,"height":15,"baseline":12});
    cache.put("2/4font12px sans-serif0", {"width":17,"height":15,"baseline":12});
    cache.put("4.5font12px sans-serif0", {"width":17,"height":15,"baseline":12});
    cache.put("Feb '12font12px sans-serif0", {"width":40,"height":15,"baseline":12});
    cache.put("5font12px sans-serif0", {"width":7,"height":15,"baseline":12});
    cache.put("7font12px sans-serif0", {"width":7,"height":15,"baseline":12});
    cache.put("9font12px sans-serif0", {"width":7,"height":15,"baseline":12});
    cache.put("long textfont12px sans-serif0", {"width":45,"height":15,"baseline":12});
    cache.put("Titlefont12px sans-serifundefined", {"width":23,"height":15,"baseline":12});
    cache.put("Looooooooooooooooooooooooooooooooooooooooooooooooooooooongfont12px sans-serif0", {"width":406,"height":15,"baseline":12});
    cache.put("Afont12px sans-serif0", {"width":7,"height":15,"baseline":12});
    cache.put("afont12px Arial,Helvetica,sans-serif0", {"width":7,"height":15,"baseline":12});
    cache.put("bfont12px Arial,Helvetica,sans-serif0", {"width":7,"height":15,"baseline":12});
    cache.put("9/15font12px Arial,Helvetica,sans-serif0", {"width":24,"height":15,"baseline":12});
    cache.put("1/31font12px sans-serif0", {"width":24,"height":15,"baseline":12});
    cache.put("2/1font12px sans-serif0", {"width":17,"height":15,"baseline":12});
    cache.put("2/2font12px sans-serif0", {"width":17,"height":15,"baseline":12});
    cache.put("2/3font12px sans-serif0", {"width":17,"height":15,"baseline":12});
    cache.put("0.02font12px sans-serif0", {"width":24,"height":15,"baseline":12});
    cache.put("0.04font12px sans-serif0", {"width":24,"height":15,"baseline":12});
    cache.put("0.06font12px sans-serif0", {"width":24,"height":15,"baseline":12});
    cache.put("0.08font12px sans-serif0", {"width":24,"height":15,"baseline":12});
    cache.put("0.1font12px sans-serif0", {"width":17,"height":15,"baseline":12});
    cache.put("0.12font12px sans-serif0", {"width":24,"height":15,"baseline":12});
    cache.put("02:00font12px sans-serif0", {"width":31,"height":15,"baseline":12});
    cache.put("03:00font12px sans-serif0", {"width":31,"height":15,"baseline":12});
    cache.put("23:00font12px sans-serif0", {"width":31,"height":15,"baseline":12});
    cache.put("00:00font12px sans-serif0", {"width":31,"height":15,"baseline":12});
    cache.put("01:00font12px sans-serif0", {"width":31,"height":15,"baseline":12});
    cache.put("20font12px sans-serif0", {"width":14,"height":15,"baseline":12});
    cache.put("40font12px sans-serif0", {"width":14,"height":15,"baseline":12});
    cache.put("60font12px sans-serif0", {"width":14,"height":15,"baseline":12});
    cache.put("80font12px sans-serif0", {"width":14,"height":15,"baseline":12});
    cache.put("120font12px sans-serif0", {"width":21,"height":15,"baseline":12});
    cache.put("200000000000font12px sans-serif0", {"width":84,"height":15,"baseline":12});
    cache.put("400000000000font12px sans-serif0", {"width":84,"height":15,"baseline":12});
    cache.put("600000000000font12px sans-serif0", {"width":84,"height":15,"baseline":12});
    cache.put("800000000000font12px sans-serif0", {"width":84,"height":15,"baseline":12});
    cache.put("1000000000000font12px sans-serif0", {"width":91,"height":15,"baseline":12});
    cache.put("1200000000000font12px sans-serif0", {"width":91,"height":15,"baseline":12});
    cache.put("1400000000000font12px sans-serif0", {"width":91,"height":15,"baseline":12});
    cache.put("1600000000000font12px sans-serif0", {"width":91,"height":15,"baseline":12});
    cache.put("-350font12px sans-serif0", {"width":25,"height":15,"baseline":12});
    cache.put("-250font12px sans-serif0", {"width":25,"height":15,"baseline":12});
    cache.put("-150font12px sans-serif0", {"width":25,"height":15,"baseline":12});
    cache.put("-50font12px sans-serif0", {"width":18,"height":15,"baseline":12});
    cache.put("-1font12px sans-serif0", {"width":11,"height":15,"baseline":12});
    cache.put("-0.8font12px sans-serif0", {"width":21,"height":15,"baseline":12});
    cache.put("-0.6font12px sans-serif0", {"width":21,"height":15,"baseline":12});
    cache.put("-0.4font12px sans-serif0", {"width":21,"height":15,"baseline":12});
    cache.put("-0.2font12px sans-serif0", {"width":21,"height":15,"baseline":12});
    cache.put("50font12px sans-serif0", {"width":14,"height":15,"baseline":12});
    cache.put("100font12px sans-serif0", {"width":21,"height":15,"baseline":12});
    cache.put("150font12px sans-serif0", {"width":21,"height":15,"baseline":12});
    cache.put("250font12px sans-serif0", {"width":21,"height":15,"baseline":12});
    cache.put("300font12px sans-serif0", {"width":21,"height":15,"baseline":12});
    cache.put("350font12px sans-serif0", {"width":21,"height":15,"baseline":12});
    cache.put("4font12px sans-serif0", {"width":7,"height":15,"baseline":12});
    cache.put("6font12px sans-serif0", {"width":7,"height":15,"baseline":12});
    cache.put("8font12px sans-serif0", {"width":7,"height":15,"baseline":12});
    cache.put("10font12px sans-serif0", {"width":14,"height":15,"baseline":12});
    cache.put("12font12px sans-serif0", {"width":14,"height":15,"baseline":12});
    cache.put("200font12px sans-serif0", {"width":21,"height":15,"baseline":12});
    cache.put("400font12px sans-serif0", {"width":21,"height":15,"baseline":12});
    cache.put("600font12px sans-serif0", {"width":21,"height":15,"baseline":12});
    cache.put("800font12px sans-serif0", {"width":21,"height":15,"baseline":12});
    cache.put("1000font12px sans-serif0", {"width":28,"height":15,"baseline":12});
    cache.put("1200font12px sans-serif0", {"width":28,"height":15,"baseline":12});
    cache.put("0.2font12px sans-serif0", {"width":17,"height":15,"baseline":12});
    cache.put("0.4font12px sans-serif0", {"width":17,"height":15,"baseline":12});
    cache.put("0.6font12px sans-serif0", {"width":17,"height":15,"baseline":12});
    cache.put("0.8font12px sans-serif0", {"width":17,"height":15,"baseline":12});
    cache.put("1.2font12px sans-serif0", {"width":17,"height":15,"baseline":12});
    cache.put("40font12px Arial,Helvetica,sans-serif0", {"width":14,"height":15,"baseline":12});
    cache.put("60font12px Arial,Helvetica,sans-serif0", {"width":14,"height":15,"baseline":12});
    cache.put("80font12px Arial,Helvetica,sans-serif0", {"width":14,"height":15,"baseline":12});
    cache.put("120font12px Arial,Helvetica,sans-serif0", {"width":21,"height":15,"baseline":12});
    cache.put("500font12px Arial,Helvetica,sans-serif0", {"width":21,"height":15,"baseline":12});
    cache.put("700font12px Arial,Helvetica,sans-serif0", {"width":21,"height":15,"baseline":12});
    cache.put("900font12px Arial,Helvetica,sans-serif0", {"width":21,"height":15,"baseline":12});
    cache.put("0font12px sans-serif0", {"width":7,"height":15,"baseline":12});
    cache.put("0.5font12px sans-serif0", {"width":17,"height":15,"baseline":12});
    cache.put("1font12px sans-serif0", {"width":7,"height":15,"baseline":12});
    cache.put("1.5font12px sans-serif0", {"width":17,"height":15,"baseline":12});
    cache.put("2font12px sans-serif0", {"width":7,"height":15,"baseline":12});
    cache.put("2.5font12px sans-serif0", {"width":17,"height":15,"baseline":12});
    cache.put("3font12px sans-serif0", {"width":7,"height":15,"baseline":12});
    cache.put("3.5font12px sans-serif0", {"width":17,"height":15,"baseline":12});
    cache.put("$100.00font12px sans-serifundefined", {"width":45,"height":15,"baseline":12});
    cache.put("$150.00font12px sans-serifundefined", {"width":45,"height":15,"baseline":12});
    cache.put("100font12px sans-serifundefined", {"width":21,"height":15,"baseline":12});
    cache.put("150font12px sans-serifundefined", {"width":21,"height":15,"baseline":12});
    cache.put("-100font12px sans-serifundefined", {"width":25,"height":15,"baseline":12});
    cache.put("-150font12px sans-serifundefined", {"width":25,"height":15,"baseline":12});
    cache.put("1%font12px sans-serifundefined", {"width":18,"height":15,"baseline":12});
    cache.put("Afont12px sans-serifundefined", {"width":7,"height":15,"baseline":12});
    cache.put("seriesfont12px sans-serifundefined", {"width":35,"height":15,"baseline":12});
    cache.put("Category Bfont12px Arial,Helvetica,sans-serif0", {"width":60,"height":15,"baseline":12});
    cache.put("Value-testfont12px Arial,Helvetica,sans-serifundefined", {"width":55,"height":15,"baseline":12});
    cache.put("50font12px Arial,Helvetica,sans-serif0", {"width":14,"height":15,"baseline":12});
    cache.put("100font12px Arial,Helvetica,sans-serif0", {"width":21,"height":15,"baseline":12});
    cache.put("150font12px Arial,Helvetica,sans-serif0", {"width":21,"height":15,"baseline":12});
    cache.put("250font12px Arial,Helvetica,sans-serif0", {"width":21,"height":15,"baseline":12});
    cache.put("300font12px Arial,Helvetica,sans-serif0", {"width":21,"height":15,"baseline":12});
    cache.put("350font12px Arial,Helvetica,sans-serif0", {"width":21,"height":15,"baseline":12});
    cache.put("Alphafont12px Arial,Helvetica,sans-serif0", {"width":31,"height":15,"baseline":12});
    cache.put("Betafont12px Arial,Helvetica,sans-serif0", {"width":25,"height":15,"baseline":12});
    cache.put("Charliefont12px Arial,Helvetica,sans-serif0", {"width":40,"height":15,"baseline":12});
    cache.put("90font16px Verdana, sans-serif0", {"width":20,"height":18,"baseline":15});
    cache.put("9000font16px Verdana, sans-serif0", {"width":40,"height":18,"baseline":15});
    cache.put("9500font16px Verdana, sans-serif0", {"width":40,"height":18,"baseline":15});
    cache.put("10000font16px Verdana, sans-serif0", {"width":50,"height":18,"baseline":15});
    cache.put("10500font16px Verdana, sans-serif0", {"width":50,"height":18,"baseline":15});
    cache.put("11000font16px Verdana, sans-serif0", {"width":50,"height":18,"baseline":15});
    cache.put("11500font16px Verdana, sans-serif0", {"width":50,"height":18,"baseline":15});
    cache.put("12000font16px Verdana, sans-serif0", {"width":50,"height":18,"baseline":15});
    cache.put("500font16px Verdana, sans-serif0", {"width":30,"height":18,"baseline":15});
    cache.put("1000font16px Verdana, sans-serif0", {"width":40,"height":18,"baseline":15});
    cache.put("1500font16px Verdana, sans-serif0", {"width":40,"height":18,"baseline":15});
    cache.put("2000font16px Verdana, sans-serif0", {"width":40,"height":18,"baseline":15});
    cache.put("160font16px Verdana, sans-serif0", {"width":30,"height":18,"baseline":15});
    cache.put("180font16px Verdana, sans-serif0", {"width":30,"height":18,"baseline":15});
    cache.put("220font16px Verdana, sans-serif0", {"width":30,"height":18,"baseline":15});
    cache.put("35font16px Verdana, sans-serif0", {"width":20,"height":18,"baseline":15});
    cache.put("45font16px Verdana, sans-serif0", {"width":20,"height":18,"baseline":15});
    cache.put("55font16px Verdana, sans-serif0", {"width":20,"height":18,"baseline":15});
    cache.put("65font16px Verdana, sans-serif0", {"width":20,"height":18,"baseline":15});
    cache.put("140font16px Verdana, sans-serif0", {"width":30,"height":18,"baseline":15});
    cache.put("-65font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("-55font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("-45font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("-35font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("-140font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("-120font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("-100font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("-80font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("2font16px Verdana, sans-serif0", {"width":10,"height":18,"baseline":15});
    cache.put("3font16px Verdana, sans-serif0", {"width":10,"height":18,"baseline":15});
    cache.put("4font16px Verdana, sans-serif0", {"width":10,"height":18,"baseline":15});
    cache.put("30font16px Verdana, sans-serif0", {"width":20,"height":18,"baseline":15});
    cache.put("70font16px Verdana, sans-serif0", {"width":20,"height":18,"baseline":15});
    cache.put("98font16px Verdana, sans-serif0", {"width":20,"height":18,"baseline":15});
    cache.put("98.5font16px Verdana, sans-serif0", {"width":36,"height":18,"baseline":15});
    cache.put("99font16px Verdana, sans-serif0", {"width":20,"height":18,"baseline":15});
    cache.put("99.5font16px Verdana, sans-serif0", {"width":36,"height":18,"baseline":15});
    cache.put("100.5font16px Verdana, sans-serif0", {"width":46,"height":18,"baseline":15});
    cache.put("101font16px Verdana, sans-serif0", {"width":30,"height":18,"baseline":15});
    cache.put("101.5font16px Verdana, sans-serif0", {"width":46,"height":18,"baseline":15});
    cache.put("5font16px Verdana, sans-serif0", {"width":10,"height":18,"baseline":15});
    cache.put("10font16px Verdana, sans-serif0", {"width":20,"height":18,"baseline":15});
    cache.put("-70font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("-60font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("-50font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("-40font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("-30font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("-20font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("-10font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("0font16px Verdana, sans-serif42.5", {"width":19.533397105183123,"height":20.026894138738832,"baseline":15,"normalWidth":10,"normalHeight":18});
    cache.put("0.2font16px Verdana, sans-serif42.5", {"width":31.32983449414511,"height":30.836337460589398,"baseline":15,"normalWidth":26,"normalHeight":18});
    cache.put("0.4font16px Verdana, sans-serif42.5", {"width":31.32983449414511,"height":30.836337460589398,"baseline":15,"normalWidth":26,"normalHeight":18});
    cache.put("0.6font16px Verdana, sans-serif42.5", {"width":31.32983449414511,"height":30.836337460589398,"baseline":15,"normalWidth":26,"normalHeight":18});
    cache.put("0.8font16px Verdana, sans-serif42.5", {"width":31.32983449414511,"height":30.836337460589398,"baseline":15,"normalWidth":26,"normalHeight":18});
    cache.put("1font16px Verdana, sans-serif42.5", {"width":19.533397105183123,"height":20.026894138738832,"baseline":15,"normalWidth":10,"normalHeight":18});
    cache.put("1.2font16px Verdana, sans-serif42.5", {"width":31.32983449414511,"height":30.836337460589398,"baseline":15,"normalWidth":26,"normalHeight":18});
    cache.put("$0.00font16px Verdana, sans-serif0", {"width":46,"height":18,"baseline":15});
    cache.put("$0.20font16px Verdana, sans-serif0", {"width":46,"height":18,"baseline":15});
    cache.put("$0.40font16px Verdana, sans-serif0", {"width":46,"height":18,"baseline":15});
    cache.put("$0.60font16px Verdana, sans-serif0", {"width":46,"height":18,"baseline":15});
    cache.put("$0.80font16px Verdana, sans-serif0", {"width":46,"height":18,"baseline":15});
    cache.put("$1.20font16px Verdana, sans-serif0", {"width":46,"height":18,"baseline":15});
    cache.put("0.3font16px Verdana, sans-serif0", {"width":26,"height":18,"baseline":15});
    cache.put("0.9font16px Verdana, sans-serif0", {"width":26,"height":18,"baseline":15});
    cache.put("|0|font16px Verdana, sans-serif0", {"width":24,"height":18,"baseline":15});
    cache.put("|0.2|font16px Verdana, sans-serif0", {"width":40,"height":18,"baseline":15});
    cache.put("|0.4|font16px Verdana, sans-serif0", {"width":40,"height":18,"baseline":15});
    cache.put("|0.6|font16px Verdana, sans-serif0", {"width":40,"height":18,"baseline":15});
    cache.put("|0.8|font16px Verdana, sans-serif0", {"width":40,"height":18,"baseline":15});
    cache.put("|1|font16px Verdana, sans-serif0", {"width":24,"height":18,"baseline":15});
    cache.put("|1.2|font16px Verdana, sans-serif0", {"width":40,"height":18,"baseline":15});
    cache.put("0.5font16px Verdana, sans-serif0", {"width":26,"height":18,"baseline":15});
    cache.put("-1.2font16px Verdana, sans-serif0", {"width":33,"height":18,"baseline":15});
    cache.put("-1font16px Verdana, sans-serif0", {"width":17,"height":18,"baseline":15});
    cache.put("-0.8font16px Verdana, sans-serif0", {"width":33,"height":18,"baseline":15});
    cache.put("-0.6font16px Verdana, sans-serif0", {"width":33,"height":18,"baseline":15});
    cache.put("-0.4font16px Verdana, sans-serif0", {"width":33,"height":18,"baseline":15});
    cache.put("-0.2font16px Verdana, sans-serif0", {"width":33,"height":18,"baseline":15});
    cache.put("0.2font16px Verdana, sans-serif0", {"width":26,"height":18,"baseline":15});
    cache.put("0.4font16px Verdana, sans-serif0", {"width":26,"height":18,"baseline":15});
    cache.put("0.6font16px Verdana, sans-serif0", {"width":26,"height":18,"baseline":15});
    cache.put("0.8font16px Verdana, sans-serif0", {"width":26,"height":18,"baseline":15});
    cache.put("1font16px Verdana, sans-serif0", {"width":10,"height":18,"baseline":15});
    cache.put("1.2font16px Verdana, sans-serif0", {"width":26,"height":18,"baseline":15});
    cache.put("$1.00font16px Verdana, sans-serif0", {"width":46,"height":18,"baseline":15});
    cache.put("$2.00font16px Verdana, sans-serif0", {"width":46,"height":18,"baseline":15});
    cache.put("|Foo|font16px Verdana, sans-serif0", {"width":43,"height":18,"baseline":15});
    cache.put("|Bar|font16px Verdana, sans-serif0", {"width":41,"height":18,"baseline":15});
    cache.put("Foofont16px Verdana, sans-serif42.5", {"width":33.54166650457548,"height":32.86310808343638,"baseline":15,"normalWidth":29,"normalHeight":18});
    cache.put("Barfont16px Verdana, sans-serif42.5", {"width":32.067111830955234,"height":31.511927668205054,"baseline":15,"normalWidth":27,"normalHeight":18});
    cache.put("Foofont16px Verdana, sans-serif0", {"width":29,"height":18,"baseline":15});
    cache.put("Barfont16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("Bazfont16px Verdana, sans-serif0", {"width":30,"height":18,"baseline":15});
    cache.put("50font16px Verdana, sans-serif0", {"width":20,"height":18,"baseline":15});
    cache.put("150font16px Verdana, sans-serif0", {"width":30,"height":18,"baseline":15});
    cache.put("200font16px Verdana, sans-serif0", {"width":30,"height":18,"baseline":15});
    cache.put("250font16px Verdana, sans-serif0", {"width":30,"height":18,"baseline":15});
    cache.put("300font16px Verdana, sans-serif0", {"width":30,"height":18,"baseline":15});
    cache.put("350font16px Verdana, sans-serif0", {"width":30,"height":18,"baseline":15});
    cache.put("textfont16px Verdana, sans-serif0", {"width":33,"height":18,"baseline":15});
    cache.put("0font16px Verdana, sans-serif0", {"width":10,"height":18,"baseline":15});
    cache.put("20font16px Verdana, sans-serif0", {"width":20,"height":18,"baseline":15});
    cache.put("40font16px Verdana, sans-serif0", {"width":20,"height":18,"baseline":15});
    cache.put("60font16px Verdana, sans-serif0", {"width":20,"height":18,"baseline":15});
    cache.put("80font16px Verdana, sans-serif0", {"width":20,"height":18,"baseline":15});
    cache.put("100font16px Verdana, sans-serif0", {"width":30,"height":18,"baseline":15});
    cache.put("120font16px Verdana, sans-serif0", {"width":30,"height":18,"baseline":15});
    cache.put("textfont16px Verdana, sans-serif-90", {"width":18,"height":33,"baseline":15,"normalWidth":33,"normalHeight":18});
    cache.put("Afont16px Verdana, sans-serif0", {"width":11,"height":18,"baseline":15});
    cache.put("undefinedfont12px Arial,Helvetica,sans-serif0", {"width":55,"height":15,"baseline":12});
    cache.put("Cfont12px Arial,Helvetica,sans-serif0", {"width":9,"height":15,"baseline":12});
    cache.put("00:01font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("00:02font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("00:03font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("00:04font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("00:05font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("00:06font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("00:07font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("00:08font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("00:09font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("00:10font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("00:11font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("00:12font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("00:13font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("00:14font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("00:15font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("00:16font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("00:17font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("00:18font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("00:19font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("00:20font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("11:00font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("11:01font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("11:02font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("11:03font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("11:04font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("11:05font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("10:11font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("10:12font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("10:13font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("10:14font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("10:15font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("10:16font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("10:17font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("10:18font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("10:19font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("10:20font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("10:21font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("10:22font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("10:23font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("10:24font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("10:25font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("10:26font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("10:27font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("10:28font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("10:29font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("10:30font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("10:31font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("10:32font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("10:33font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("10:34font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("10:35font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("10:36font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("10:37font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("10:38font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("10:39font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("10:40font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("10:41font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("10:42font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("10:43font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("10:44font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("10:45font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("10:46font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("10:47font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("10:48font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("10:49font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("10:50font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("10:01font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("10:02font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("10:03font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("10:04font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("10:05font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("10:06font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("10:07font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("10:08font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("10:09font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("10:10font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("23:00font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("00:00font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("10:00font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("12:00font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("18:00font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("20:00font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("2/29font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("2/10font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("2/13font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("2/14font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("2/15font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("2/16font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("2/17font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("2/20font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("2/21font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("2/22font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("2/23font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("2/24font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("2/25font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("2/27font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("2/28font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("3/2font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("3/3font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("3/4font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("3/5font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("3/6font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("3/7font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("3/8font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("3/9font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("3/10font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("3/11font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("3/12font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("3/13font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("3/14font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("3/15font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("3/16font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("3/17font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("3/18font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("3/19font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("3/20font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("3/21font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("3/22font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("3/23font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("3/24font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("3/25font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("3/26font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("3/27font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("3/28font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("3/29font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("3/30font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("3/31font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("4/1font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("4/2font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("4/3font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("4/4font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("4/5font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("4/6font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("4/7font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("4/8font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("4/9font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("4/10font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("4/11font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("4/12font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("4/13font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("4/14font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("4/15font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("4/16font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("4/17font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("4/18font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("4/19font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("4/20font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("4/21font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("4/22font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("4/23font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("4/24font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("4/25font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("4/26font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("4/27font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("4/28font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("4/29font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("4/30font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("5/1font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("5/2font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("5/3font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("5/4font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("5/5font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("5/6font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("5/7font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("5/8font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("5/9font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("5/10font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("5/11font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("5/12font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("5/13font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("5/14font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("5/15font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("5/16font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("5/17font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("5/18font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("5/19font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("5/20font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("5/21font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("5/22font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("5/23font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("5/24font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("5/25font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("5/26font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("5/27font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("5/28font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("5/29font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("5/30font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("5/31font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("6/1font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("6/2font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("6/3font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("6/4font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("6/5font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("6/6font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("6/7font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("6/8font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("6/9font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("6/10font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("6/11font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("6/12font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("6/13font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("6/14font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("6/15font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("6/16font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("6/17font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("6/18font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("6/19font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("6/20font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("6/21font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("6/22font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("6/23font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("6/24font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("6/25font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("6/26font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("6/27font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("6/28font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("6/29font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("6/30font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("7/1font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("7/2font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("7/3font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("7/4font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("7/5font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("7/6font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("7/7font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("7/8font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("7/9font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("7/10font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("7/11font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("7/12font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("7/13font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("7/14font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("7/15font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("7/16font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("7/17font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("7/18font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("7/19font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("7/20font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("7/21font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("7/22font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("7/23font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("7/24font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("7/25font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("7/26font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("7/27font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("7/28font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("7/29font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("7/30font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("7/31font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("8/1font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("8/2font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("8/3font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("8/4font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("8/5font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("8/6font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("8/7font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("8/8font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("8/9font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("8/10font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("8/11font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("8/12font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("8/13font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("8/14font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("8/15font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("8/16font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("8/17font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("8/18font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("8/19font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("8/20font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("8/21font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("8/22font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("8/23font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("8/24font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("8/25font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("8/26font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("8/27font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("8/28font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("8/29font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("8/30font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("8/31font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("9/1font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("9/2font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("9/3font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("9/4font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("9/5font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("9/6font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("9/7font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("9/8font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("9/9font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("9/10font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("9/11font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("9/12font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("9/13font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("9/14font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("9/15font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("9/16font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("9/17font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("9/18font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("9/19font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("9/20font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("9/21font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("9/22font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("9/23font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("9/24font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("9/25font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("9/26font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("9/27font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("9/28font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("9/29font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("9/30font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("10/1font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("10/2font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("10/3font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("10/4font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("10/5font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("10/6font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("10/7font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("10/8font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("10/9font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("10/10font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("10/11font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("10/12font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("10/13font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("10/14font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("10/15font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("10/16font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("10/17font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("10/18font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("10/19font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("10/20font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("10/21font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("10/22font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("10/23font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("10/24font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("10/25font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("10/26font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("10/27font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("10/28font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("10/29font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("10/30font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("10/31font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("11/2font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("11/3font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("11/4font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("11/5font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("11/6font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("11/8font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("11/9font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("11/10font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("11/11font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("11/12font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("11/14font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("11/15font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("11/16font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("11/17font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("11/18font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("11/20font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("11/21font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("11/22font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("11/23font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("11/24font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("11/26font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("11/27font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("11/28font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("11/29font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("11/30font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("12/2font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("12/3font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("12/4font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("12/5font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("12/6font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("12/7font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("12/8font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("12/9font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("12/10font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("12/11font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("12/12font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("12/13font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("12/14font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("12/15font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("12/16font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("12/17font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("12/18font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("12/19font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("12/20font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("12/21font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("12/22font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("12/23font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("12/24font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("12/27font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("12/28font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("12/29font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("12/30font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("1/3font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("1/5font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("1/7font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("1/11font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("1/12font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("1/14font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("1/16font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("1/17font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("1/18font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("1/19font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("1/20font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("1/21font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("1/23font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("1/24font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("1/26font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("1/27font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("1/28font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("1/30font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("12/26font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("1/9font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("Jan '11font16px Verdana, sans-serif0", {"width":57,"height":18,"baseline":15});
    cache.put("Feb '11font16px Verdana, sans-serif0", {"width":59,"height":18,"baseline":15});
    cache.put("Mar '11font16px Verdana, sans-serif0", {"width":59,"height":18,"baseline":15});
    cache.put("Apr '11font16px Verdana, sans-serif0", {"width":57,"height":18,"baseline":15});
    cache.put("Apr '12font16px Verdana, sans-serif0", {"width":57,"height":18,"baseline":15});
    cache.put("Jun '12font16px Verdana, sans-serif0", {"width":57,"height":18,"baseline":15});
    cache.put("2016font16px Verdana, sans-serif0", {"width":40,"height":18,"baseline":15});
    cache.put("1/13font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("1/25font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("2/18font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("3/1font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("11/1font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("11/7font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("11/13font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("11/19font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("11/25font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("12/1font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("12/31font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("1/2font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("1/4font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("1/6font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("1/10font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("2/6font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("2/8font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("2/7font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("2/9font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("2/11font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("2/4font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("1/31font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("2/1font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("2/2font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("2/3font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("1/31/12font16px Verdana, sans-serif0", {"width":64,"height":18,"baseline":15});
    cache.put("2/2/12font16px Verdana, sans-serif0", {"width":54,"height":18,"baseline":15});
    cache.put("2/3/12font16px Verdana, sans-serif0", {"width":54,"height":18,"baseline":15});
    cache.put("31.enefont16px Verdana, sans-serif0", {"width":56,"height":18,"baseline":15});
    cache.put("1.febfont16px Verdana, sans-serif0", {"width":42,"height":18,"baseline":15});
    cache.put("2.febfont16px Verdana, sans-serif0", {"width":42,"height":18,"baseline":15});
    cache.put("3.febfont16px Verdana, sans-serif0", {"width":42,"height":18,"baseline":15});
    cache.put("1/22font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("1/22/12font16px Verdana, sans-serif0", {"width":64,"height":18,"baseline":15});
    cache.put("1/29font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("2/5font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("2/12font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("2/19font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("2/26font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("12/25font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("1/1font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("1/8font16px Verdana, sans-serif0", {"width":27,"height":18,"baseline":15});
    cache.put("1/15font16px Verdana, sans-serif0", {"width":37,"height":18,"baseline":15});
    cache.put("12/25/11font16px Verdana, sans-serif0", {"width":74,"height":18,"baseline":15});
    cache.put("1/8/12font16px Verdana, sans-serif0", {"width":54,"height":18,"baseline":15});
    cache.put("1/15/12font16px Verdana, sans-serif0", {"width":64,"height":18,"baseline":15});
    cache.put("Dec '11font16px Verdana, sans-serif0", {"width":60,"height":18,"baseline":15});
    cache.put("Jan '12font16px Verdana, sans-serif0", {"width":57,"height":18,"baseline":15});
    cache.put("Feb '12font16px Verdana, sans-serif0", {"width":59,"height":18,"baseline":15});
    cache.put("Mar '12font16px Verdana, sans-serif0", {"width":59,"height":18,"baseline":15});
    cache.put("12/1/11font16px Verdana, sans-serif0", {"width":64,"height":18,"baseline":15});
    cache.put("2/1/12font16px Verdana, sans-serif0", {"width":54,"height":18,"baseline":15});
    cache.put("3/1/12font16px Verdana, sans-serif0", {"width":54,"height":18,"baseline":15});
    cache.put("2011font16px Verdana, sans-serif0", {"width":40,"height":18,"baseline":15});
    cache.put("2012font16px Verdana, sans-serif0", {"width":40,"height":18,"baseline":15});
    cache.put("2013font16px Verdana, sans-serif0", {"width":40,"height":18,"baseline":15});
    cache.put("2014font16px Verdana, sans-serif0", {"width":40,"height":18,"baseline":15});
    cache.put("1/1/11font16px Verdana, sans-serif0", {"width":54,"height":18,"baseline":15});
    cache.put("1/1/12font16px Verdana, sans-serif0", {"width":54,"height":18,"baseline":15});
    cache.put("1/1/13font16px Verdana, sans-serif0", {"width":54,"height":18,"baseline":15});
    cache.put("1/1/14font16px Verdana, sans-serif0", {"width":54,"height":18,"baseline":15});
    cache.put("14:00font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("15:00font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("16:00font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("17:00font16px Verdana, sans-serif0", {"width":47,"height":18,"baseline":15});
    cache.put("1/1 14:00font16px Verdana, sans-serif0", {"width":80,"height":18,"baseline":15});
    cache.put("1/1 15:00font16px Verdana, sans-serif0", {"width":80,"height":18,"baseline":15});
    cache.put("1/1 16:00font16px Verdana, sans-serif0", {"width":80,"height":18,"baseline":15});
    cache.put("1/1 17:00font16px Verdana, sans-serif0", {"width":80,"height":18,"baseline":15});
    cache.put("2font11px Arial,Helvetica,sans-serifundefined", {"width":6,"height":14,"baseline":11});
    cache.put("100 %font12px Arial,Helvetica,sans-serifundefined", {"width":35,"height":15,"baseline":12});
    cache.put("1font12px comic-sansundefined", {"width":6,"height":16,"baseline":12});
    cache.put("1%font12px Arial,Helvetica,sans-serifundefined", {"width":18,"height":15,"baseline":12});
    cache.put("1font12px Arial,Helvetica,sans-serifundefined", {"width":7,"height":15,"baseline":12});
    cache.put("seriesfont12px Arial,Helvetica,sans-serifundefined", {"width":35,"height":15,"baseline":12});
    cache.put("Valuefont12px Arial,Helvetica,sans-serifundefined", {"width":31,"height":15,"baseline":12});
    cache.put("Category Afont12px Arial,Helvetica,sans-serif0", {"width":59,"height":15,"baseline":12});
    cache.put("Alphafont11px Arial,Helvetica,sans-serifundefined", {"width":28,"height":14,"baseline":11});
    cache.put("Afont12px Arial,Helvetica,sans-serif0", {"width":7,"height":15,"baseline":12});
    cache.put("Bfont12px Arial,Helvetica,sans-serif0", {"width":8,"height":15,"baseline":12});
    cache.put("testfont12px Arial,Helvetica,sans-serifundefined", {"width":20,"height":15,"baseline":12});
    cache.put("Value Afont12px Arial,Helvetica,sans-serifundefined", {"width":41,"height":15,"baseline":12});
    cache.put("Value Bfont12px Arial,Helvetica,sans-serifundefined", {"width":42,"height":15,"baseline":12});
    cache.put("Value Cfont12px Arial,Helvetica,sans-serifundefined", {"width":43,"height":15,"baseline":12});
    cache.put("Chart Titlefont16px Arial,Helvetica,sans-serifundefined", {"width":71,"height":19,"baseline":15});
    cache.put("$2.00font12px sans-serifundefined", {"width":31,"height":15,"baseline":12});
    cache.put("$1.00font12px sans-serifundefined", {"width":31,"height":15,"baseline":12});
    cache.put("2font12px sans-serifundefined", {"width":7,"height":15,"baseline":12});
    cache.put("3font12px sans-serifundefined", {"width":7,"height":15,"baseline":12});
    cache.put("4font12px sans-serifundefined", {"width":7,"height":15,"baseline":12});
    cache.put("5font12px sans-serifundefined", {"width":7,"height":15,"baseline":12});
    cache.put("6font12px sans-serifundefined", {"width":7,"height":15,"baseline":12});
    cache.put("20font12px sans-serifundefined", {"width":14,"height":15,"baseline":12});
    cache.put("70font12px sans-serifundefined", {"width":14,"height":15,"baseline":12});
    cache.put("140font12px sans-serifundefined", {"width":21,"height":15,"baseline":12});
    cache.put("40font12px sans-serifundefined", {"width":14,"height":15,"baseline":12});
    cache.put("Bfont12px Arial,Helvetica,sans-serifundefined", {"width":8,"height":15,"baseline":12});
    cache.put("1font12px sans-serifundefined", {"width":7,"height":15,"baseline":12});
    cache.put("1font11px Arial,Helvetica,sans-serifundefined", {"width":6,"height":14,"baseline":11});
    cache.put("$1.00 $10.00font12px sans-serifundefined", {"width":72,"height":15,"baseline":12});
    cache.put("$2.00 $20.00font12px sans-serifundefined", {"width":72,"height":15,"baseline":12});
    cache.put("200font12px Arial,Helvetica,sans-serif0", {"width":21,"height":15,"baseline":12});
    cache.put("400font12px Arial,Helvetica,sans-serif0", {"width":21,"height":15,"baseline":12});
    cache.put("600font12px Arial,Helvetica,sans-serif0", {"width":21,"height":15,"baseline":12});
    cache.put("800font12px Arial,Helvetica,sans-serif0", {"width":21,"height":15,"baseline":12});
    cache.put("1000font12px Arial,Helvetica,sans-serif0", {"width":28,"height":15,"baseline":12});
    cache.put("1200font12px Arial,Helvetica,sans-serif0", {"width":28,"height":15,"baseline":12});
    cache.put("6font12px Arial,Helvetica,sans-serif0", {"width":7,"height":15,"baseline":12});
    cache.put("8font12px Arial,Helvetica,sans-serif0", {"width":7,"height":15,"baseline":12});
    cache.put("12font12px Arial,Helvetica,sans-serif0", {"width":14,"height":15,"baseline":12});
    cache.put("Afont12px Arial,Helvetica,sans-serifundefined", {"width":7,"height":15,"baseline":12});
    cache.put("A-testfont12px Arial,Helvetica,sans-serifundefined", {"width":31,"height":15,"baseline":12});
    cache.put("5font12px Arial,Helvetica,sans-serif0", {"width":7,"height":15,"baseline":12});
    cache.put("10font12px Arial,Helvetica,sans-serif0", {"width":14,"height":15,"baseline":12});
    cache.put("15font12px Arial,Helvetica,sans-serif0", {"width":14,"height":15,"baseline":12});
    cache.put("20font12px Arial,Helvetica,sans-serif0", {"width":14,"height":15,"baseline":12});
    cache.put("25font12px Arial,Helvetica,sans-serif0", {"width":14,"height":15,"baseline":12});
    cache.put("0.2font12px Arial,Helvetica,sans-serif0", {"width":17,"height":15,"baseline":12});
    cache.put("0.4font12px Arial,Helvetica,sans-serif0", {"width":17,"height":15,"baseline":12});
    cache.put("0.6font12px Arial,Helvetica,sans-serif0", {"width":17,"height":15,"baseline":12});
    cache.put("0.8font12px Arial,Helvetica,sans-serif0", {"width":17,"height":15,"baseline":12});
    cache.put("1.2font12px Arial,Helvetica,sans-serif0", {"width":17,"height":15,"baseline":12});
    cache.put("font12px Arial,Helvetica,sans-serifundefined", {"width":0,"height":0,"baseline":0});
    cache.put("0font12px Arial,Helvetica,sans-serif0", {"width":7,"height":15,"baseline":12});
    cache.put("0.5font12px Arial,Helvetica,sans-serif0", {"width":17,"height":15,"baseline":12});
    cache.put("1font12px Arial,Helvetica,sans-serif0", {"width":7,"height":15,"baseline":12});
    cache.put("1.5font12px Arial,Helvetica,sans-serif0", {"width":17,"height":15,"baseline":12});
    cache.put("2font12px Arial,Helvetica,sans-serif0", {"width":7,"height":15,"baseline":12});
    cache.put("2.5font12px Arial,Helvetica,sans-serif0", {"width":17,"height":15,"baseline":12});
    cache.put("3font12px Arial,Helvetica,sans-serif0", {"width":7,"height":15,"baseline":12});
    cache.put("3.5font12px Arial,Helvetica,sans-serif0", {"width":17,"height":15,"baseline":12});
    cache.put("4font12px Arial,Helvetica,sans-serif0", {"width":7,"height":15,"baseline":12});
    cache.put("4.5font12px Arial,Helvetica,sans-serif0", {"width":17,"height":15,"baseline":12});
})();
