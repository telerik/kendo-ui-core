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

        return new kendo.ui.Chart.ViewElement(style);
    },

    createText: function(content, style) {
        this.log.text.push({
            content: content,
            style: style
        });

        return new kendo.ui.Chart.ViewElement(style);
    },

    createGroup: function(options) {
        this.log.group.push({options: options});
        return new kendo.ui.Chart.ViewElement(options);
    },

    createLine: function(x1, y1, x2, y2, options) {
        this.log.line.push({ x1: x1, y1: y1, x2: x2, y2: y2, options: options });
        return new kendo.ui.Chart.ViewElement(options);
    },

    createPolyline: function(points, closed, style) {
        this.log.path.push({ points: points, closed: closed, style: style });
        return new kendo.ui.Chart.ViewElement(style);
    },

    createCircle: function(center, radius, style) {
        this.log.circle.push({
            center: center, radius: radius, style: style });

        return new kendo.ui.Chart.ViewElement(style);
    },

    createSector: function(sector, style) {
        this.log.sector.push({ sector: sector, style: style });

        return new kendo.ui.Chart.ViewElement(style);
    }
};

function ViewElementStub() {
    this.children = [];
}

function sameBox(a, b, tolerance) {
    same([a.x1, a.y1, a.x2, a.y2], [b.x1, b.y1, b.x2, b.y2], tolerance);
}

function stubMethod(fn, methodName, stub, callback) {
    var oldMethod = fn.prototype[methodName];
    fn.prototype[methodName] = stub;
    try {
        callback();
    }
    finally {
        fn.prototype[methodName] = oldMethod;
    }
}

function mapPoints(points) {
    return $.map(points, function(p) { return [[p.x, p.y]] });
}

kendo.ui.Chart.measureText.cache = {
    "Afont12px Arial,Helvetica,sans-serifundefined": {
        "width": 7,
        "height": 15,
        "baseline": 12
    },
    "Bfont12px Arial,Helvetica,sans-serifundefined": {
        "width": 8,
        "height": 15,
        "baseline": 12
    },
    "Chart Titlefont16px Arial,Helvetica,sans-serifundefined": {
        "width": 71,
        "height": 19,
        "baseline": 15
    },
    "Value Afont12px Arial,Helvetica,sans-serifundefined": {
        "width": 41,
        "height": 15,
        "baseline": 12
    },
    "Value Bfont12px Arial,Helvetica,sans-serifundefined": {
        "width": 42,
        "height": 15,
        "baseline": 12
    },
    "Value Cfont12px Arial,Helvetica,sans-serifundefined": {
        "width": 43,
        "height": 15,
        "baseline": 12
    },
    "1font12px sans-serifundefined": {
        "width": 7,
        "height": 15,
        "baseline": 12
    },
    "2font12px sans-serifundefined": {
        "width": 7,
        "height": 15,
        "baseline": 12
    },
    "3font12px sans-serifundefined": {
        "width": 7,
        "height": 15,
        "baseline": 12
    },
    "4font12px sans-serifundefined": {
        "width": 7,
        "height": 15,
        "baseline": 12
    },
    "5font12px sans-serifundefined": {
        "width": 7,
        "height": 15,
        "baseline": 12
    },
    "6font12px sans-serifundefined": {
        "width": 7,
        "height": 15,
        "baseline": 12
    },
    "40font12px sans-serifundefined": {
        "width": 14,
        "height": 15,
        "baseline": 12
    },
    "140font12px sans-serifundefined": {
        "width": 21,
        "height": 15,
        "baseline": 12
    },
    "70font12px sans-serifundefined": {
        "width": 14,
        "height": 15,
        "baseline": 12
    },
    "20font12px sans-serifundefined": {
        "width": 14,
        "height": 15,
        "baseline": 12
    },
    "Titlefont16px Arial,Helvetica,sans-serifundefined": {
        "width": 29,
        "height": 19,
        "baseline": 15
    },
    "Titlefont10px sans-serifundefined": {
        "width": 22,
        "height": 13,
        "baseline": 10
    },
    "Titlefont12px sans-serifundefined": {
        "width": 23,
        "height": 15,
        "baseline": 12
    },
    "font12px Arial,Helvetica,sans-serifundefined": {
        "width": 0,
        "height": 15,
        "baseline": 12
    },
    "textfont12px sans-serifundefined": {
        "width": 18,
        "height": 15,
        "baseline": 12
    },
    "Series 1font12px Arial,Helvetica,sans-serifundefined": {
        "width": 46,
        "height": 15,
        "baseline": 12
    },
    "Series 2font12px Arial,Helvetica,sans-serifundefined": {
        "width": 46,
        "height": 15,
        "baseline": 12
    },
    "Series 1font10px sans-serifundefined": {
        "width": 38,
        "height": 13,
        "baseline": 10
    },
    "Series 1font12px sans-serifundefined": {
        "width": 46,
        "height": 15,
        "baseline": 12
    },
    "0font12px Arial,Helvetica,sans-serif0": {
        "width": 7,
        "height": 15,
        "baseline": 12
    },
    "0.2font12px Arial,Helvetica,sans-serif0": {
        "width": 17,
        "height": 15,
        "baseline": 12
    },
    "0.4font12px Arial,Helvetica,sans-serif0": {
        "width": 17,
        "height": 15,
        "baseline": 12
    },
    "0.6font12px Arial,Helvetica,sans-serif0": {
        "width": 17,
        "height": 15,
        "baseline": 12
    },
    "0.8font12px Arial,Helvetica,sans-serif0": {
        "width": 17,
        "height": 15,
        "baseline": 12
    },
    "1font12px Arial,Helvetica,sans-serif0": {
        "width": 7,
        "height": 15,
        "baseline": 12
    },
    "1.2font12px Arial,Helvetica,sans-serif0": {
        "width": 17,
        "height": 15,
        "baseline": 12
    },
    "Alphafont12px Arial,Helvetica,sans-serif0": {
        "width": 31,
        "height": 15,
        "baseline": 12
    },
    "Betafont12px Arial,Helvetica,sans-serif0": {
        "width": 25,
        "height": 15,
        "baseline": 12
    },
    "Charliefont12px Arial,Helvetica,sans-serif0": {
        "width": 40,
        "height": 15,
        "baseline": 12
    },
    "0font12px sans-serif0": {
        "width": 7,
        "height": 15,
        "baseline": 12
    },
    "0.2font12px sans-serif0": {
        "width": 17,
        "height": 15,
        "baseline": 12
    },
    "0.4font12px sans-serif0": {
        "width": 17,
        "height": 15,
        "baseline": 12
    },
    "0.6font12px sans-serif0": {
        "width": 17,
        "height": 15,
        "baseline": 12
    },
    "0.8font12px sans-serif0": {
        "width": 17,
        "height": 15,
        "baseline": 12
    },
    "1font12px sans-serif0": {
        "width": 7,
        "height": 15,
        "baseline": 12
    },
    "1.2font12px sans-serif0": {
        "width": 17,
        "height": 15,
        "baseline": 12
    },
    "My Titlefont16px Arial,Helvetica,sans-serifundefined": {
        "width": 53,
        "height": 19,
        "baseline": 15
    },
    "My Titlefont10pt Comic Sansundefined": {
        "width": 46,
        "height": 16,
        "baseline": 12
    },
    "font12px sans-serifundefined": {
        "width": 0,
        "height": 15,
        "baseline": 12
    },
    "font12px Arial,Helvetica,sans-serif0": {
        "width": 0,
        "height": 15,
        "baseline": 12
    },
    "0.5font12px Arial,Helvetica,sans-serif0": {
        "width": 17,
        "height": 15,
        "baseline": 12
    },
    "1.5font12px Arial,Helvetica,sans-serif0": {
        "width": 17,
        "height": 15,
        "baseline": 12
    },
    "2font12px Arial,Helvetica,sans-serif0": {
        "width": 7,
        "height": 15,
        "baseline": 12
    },
    "2.5font12px Arial,Helvetica,sans-serif0": {
        "width": 17,
        "height": 15,
        "baseline": 12
    },
    "Afont12px sans-serif0": {
        "width": 7,
        "height": 15,
        "baseline": 12
    },
    "Bfont12px sans-serif0": {
        "width": 8,
        "height": 15,
        "baseline": 12
    },
    "Cfont12px sans-serif0": {
        "width": 9,
        "height": 15,
        "baseline": 12
    },
    "50font12px sans-serif0": {
        "width": 14,
        "height": 15,
        "baseline": 12
    },
    "100font12px sans-serif0": {
        "width": 21,
        "height": 15,
        "baseline": 12
    },
    "150font12px sans-serif0": {
        "width": 21,
        "height": 15,
        "baseline": 12
    },
    "200font12px sans-serif0": {
        "width": 21,
        "height": 15,
        "baseline": 12
    },
    "250font12px sans-serif0": {
        "width": 21,
        "height": 15,
        "baseline": 12
    },
    "300font12px sans-serif0": {
        "width": 21,
        "height": 15,
        "baseline": 12
    },
    "350font12px sans-serif0": {
        "width": 21,
        "height": 15,
        "baseline": 12
    },
    "font12px sans-serif0": {
        "width": 0,
        "height": 15,
        "baseline": 12
    },
    "20font12px sans-serif0": {
        "width": 14,
        "height": 15,
        "baseline": 12
    },
    "40font12px sans-serif0": {
        "width": 14,
        "height": 15,
        "baseline": 12
    },
    "60font12px sans-serif0": {
        "width": 14,
        "height": 15,
        "baseline": 12
    },
    "80font12px sans-serif0": {
        "width": 14,
        "height": 15,
        "baseline": 12
    },
    "120font12px sans-serif0": {
        "width": 21,
        "height": 15,
        "baseline": 12
    },
    "Afont12px Arial,Helvetica,sans-serif0": {
        "width": 7,
        "height": 15,
        "baseline": 12
    },
    "Bfont12px Arial,Helvetica,sans-serif0": {
        "width": 8,
        "height": 15,
        "baseline": 12
    },
    "50font12px Arial,Helvetica,sans-serif0": {
        "width": 14,
        "height": 15,
        "baseline": 12
    },
    "100font12px Arial,Helvetica,sans-serif0": {
        "width": 21,
        "height": 15,
        "baseline": 12
    },
    "150font12px Arial,Helvetica,sans-serif0": {
        "width": 21,
        "height": 15,
        "baseline": 12
    },
    "200font12px Arial,Helvetica,sans-serif0": {
        "width": 21,
        "height": 15,
        "baseline": 12
    },
    "250font12px Arial,Helvetica,sans-serif0": {
        "width": 21,
        "height": 15,
        "baseline": 12
    },
    "300font12px Arial,Helvetica,sans-serif0": {
        "width": 21,
        "height": 15,
        "baseline": 12
    },
    "350font12px Arial,Helvetica,sans-serif0": {
        "width": 21,
        "height": 15,
        "baseline": 12
    },
    "Valuefont12px Arial,Helvetica,sans-serifundefined": {
        "width": 31,
        "height": 15,
        "baseline": 12
    },
    "0font16px Verdana, sans-serif0": {
        "width": 10,
        "height": 18,
        "baseline": 15
    },
    "0.2font16px Verdana, sans-serif0": {
        "width": 26,
        "height": 18,
        "baseline": 15
    },
    "0.4font16px Verdana, sans-serif0": {
        "width": 26,
        "height": 18,
        "baseline": 15
    },
    "0.6font16px Verdana, sans-serif0": {
        "width": 26,
        "height": 18,
        "baseline": 15
    },
    "0.8font16px Verdana, sans-serif0": {
        "width": 26,
        "height": 18,
        "baseline": 15
    },
    "1font16px Verdana, sans-serif0": {
        "width": 10,
        "height": 18,
        "baseline": 15
    },
    "1.2font16px Verdana, sans-serif0": {
        "width": 26,
        "height": 18,
        "baseline": 15
    },
    "10font16px Verdana, sans-serif0": {
        "width": 20,
        "height": 18,
        "baseline": 15
    },
    "20font16px Verdana, sans-serif0": {
        "width": 20,
        "height": 18,
        "baseline": 15
    },
    "30font16px Verdana, sans-serif0": {
        "width": 20,
        "height": 18,
        "baseline": 15
    },
    "40font16px Verdana, sans-serif0": {
        "width": 20,
        "height": 18,
        "baseline": 15
    },
    "50font16px Verdana, sans-serif0": {
        "width": 20,
        "height": 18,
        "baseline": 15
    },
    "60font16px Verdana, sans-serif0": {
        "width": 20,
        "height": 18,
        "baseline": 15
    },
    "70font16px Verdana, sans-serif0": {
        "width": 20,
        "height": 18,
        "baseline": 15
    },
    "80font16px Verdana, sans-serif0": {
        "width": 20,
        "height": 18,
        "baseline": 15
    },
    "90font16px Verdana, sans-serif0": {
        "width": 20,
        "height": 18,
        "baseline": 15
    },
    "100font16px Verdana, sans-serif0": {
        "width": 30,
        "height": 18,
        "baseline": 15
    },
    "9000font16px Verdana, sans-serif0": {
        "width": 40,
        "height": 18,
        "baseline": 15
    },
    "9500font16px Verdana, sans-serif0": {
        "width": 40,
        "height": 18,
        "baseline": 15
    },
    "10000font16px Verdana, sans-serif0": {
        "width": 50,
        "height": 18,
        "baseline": 15
    },
    "10500font16px Verdana, sans-serif0": {
        "width": 50,
        "height": 18,
        "baseline": 15
    },
    "11000font16px Verdana, sans-serif0": {
        "width": 50,
        "height": 18,
        "baseline": 15
    },
    "11500font16px Verdana, sans-serif0": {
        "width": 50,
        "height": 18,
        "baseline": 15
    },
    "12000font16px Verdana, sans-serif0": {
        "width": 50,
        "height": 18,
        "baseline": 15
    },
    "500font16px Verdana, sans-serif0": {
        "width": 30,
        "height": 18,
        "baseline": 15
    },
    "1000font16px Verdana, sans-serif0": {
        "width": 40,
        "height": 18,
        "baseline": 15
    },
    "1500font16px Verdana, sans-serif0": {
        "width": 40,
        "height": 18,
        "baseline": 15
    },
    "2000font16px Verdana, sans-serif0": {
        "width": 40,
        "height": 18,
        "baseline": 15
    },
    "120font16px Verdana, sans-serif0": {
        "width": 30,
        "height": 18,
        "baseline": 15
    },
    "140font16px Verdana, sans-serif0": {
        "width": 30,
        "height": 18,
        "baseline": 15
    },
    "160font16px Verdana, sans-serif0": {
        "width": 30,
        "height": 18,
        "baseline": 15
    },
    "180font16px Verdana, sans-serif0": {
        "width": 30,
        "height": 18,
        "baseline": 15
    },
    "200font16px Verdana, sans-serif0": {
        "width": 30,
        "height": 18,
        "baseline": 15
    },
    "2font16px Verdana, sans-serif0": {
        "width": 10,
        "height": 18,
        "baseline": 15
    },
    "3font16px Verdana, sans-serif0": {
        "width": 10,
        "height": 18,
        "baseline": 15
    },
    "4font16px Verdana, sans-serif0": {
        "width": 10,
        "height": 18,
        "baseline": 15
    },
    "-70font16px Verdana, sans-serif0": {
        "width": 27,
        "height": 18,
        "baseline": 15
    },
    "-60font16px Verdana, sans-serif0": {
        "width": 27,
        "height": 18,
        "baseline": 15
    },
    "-50font16px Verdana, sans-serif0": {
        "width": 27,
        "height": 18,
        "baseline": 15
    },
    "-40font16px Verdana, sans-serif0": {
        "width": 27,
        "height": 18,
        "baseline": 15
    },
    "-30font16px Verdana, sans-serif0": {
        "width": 27,
        "height": 18,
        "baseline": 15
    },
    "-20font16px Verdana, sans-serif0": {
        "width": 27,
        "height": 18,
        "baseline": 15
    },
    "-10font16px Verdana, sans-serif0": {
        "width": 27,
        "height": 18,
        "baseline": 15
    },
    "0font16px Verdana, sans-serif42.5": {
        "width": 20,
        "height": 20,
        "baseline": 15,
        "normalWidth": 10,
        "normalHeight": 18
    },
    "0.2font16px Verdana, sans-serif42.5": {
        "width": 31,
        "height": 31,
        "baseline": 15,
        "normalWidth": 26,
        "normalHeight": 18
    },
    "0.4font16px Verdana, sans-serif42.5": {
        "width": 31,
        "height": 31,
        "baseline": 15,
        "normalWidth": 26,
        "normalHeight": 18
    },
    "0.6font16px Verdana, sans-serif42.5": {
        "width": 31,
        "height": 31,
        "baseline": 15,
        "normalWidth": 26,
        "normalHeight": 18
    },
    "0.8font16px Verdana, sans-serif42.5": {
        "width": 31,
        "height": 31,
        "baseline": 15,
        "normalWidth": 26,
        "normalHeight": 18
    },
    "1font16px Verdana, sans-serif42.5": {
        "width": 20,
        "height": 20,
        "baseline": 15,
        "normalWidth": 10,
        "normalHeight": 18
    },
    "1.2font16px Verdana, sans-serif42.5": {
        "width": 31,
        "height": 31,
        "baseline": 15,
        "normalWidth": 26,
        "normalHeight": 18
    },
    "$0.00font16px Verdana, sans-serif0": {
        "width": 46,
        "height": 18,
        "baseline": 15
    },
    "$0.20font16px Verdana, sans-serif0": {
        "width": 46,
        "height": 18,
        "baseline": 15
    },
    "$0.40font16px Verdana, sans-serif0": {
        "width": 46,
        "height": 18,
        "baseline": 15
    },
    "$0.60font16px Verdana, sans-serif0": {
        "width": 46,
        "height": 18,
        "baseline": 15
    },
    "$0.80font16px Verdana, sans-serif0": {
        "width": 46,
        "height": 18,
        "baseline": 15
    },
    "$1.00font16px Verdana, sans-serif0": {
        "width": 46,
        "height": 18,
        "baseline": 15
    },
    "$1.20font16px Verdana, sans-serif0": {
        "width": 46,
        "height": 18,
        "baseline": 15
    },
    "|0|font16px Verdana, sans-serif0": {
        "width": 24,
        "height": 18,
        "baseline": 15
    },
    "|0.2|font16px Verdana, sans-serif0": {
        "width": 40,
        "height": 18,
        "baseline": 15
    },
    "|0.4|font16px Verdana, sans-serif0": {
        "width": 40,
        "height": 18,
        "baseline": 15
    },
    "|0.6|font16px Verdana, sans-serif0": {
        "width": 40,
        "height": 18,
        "baseline": 15
    },
    "|0.8|font16px Verdana, sans-serif0": {
        "width": 40,
        "height": 18,
        "baseline": 15
    },
    "|1|font16px Verdana, sans-serif0": {
        "width": 24,
        "height": 18,
        "baseline": 15
    },
    "|1.2|font16px Verdana, sans-serif0": {
        "width": 40,
        "height": 18,
        "baseline": 15
    },
    "-1.2font16px Verdana, sans-serif0": {
        "width": 33,
        "height": 18,
        "baseline": 15
    },
    "-1font16px Verdana, sans-serif0": {
        "width": 17,
        "height": 18,
        "baseline": 15
    },
    "-0.8font16px Verdana, sans-serif0": {
        "width": 33,
        "height": 18,
        "baseline": 15
    },
    "-0.6font16px Verdana, sans-serif0": {
        "width": 33,
        "height": 18,
        "baseline": 15
    },
    "-0.4font16px Verdana, sans-serif0": {
        "width": 33,
        "height": 18,
        "baseline": 15
    },
    "-0.2font16px Verdana, sans-serif0": {
        "width": 33,
        "height": 18,
        "baseline": 15
    },
    "Foofont16px Verdana, sans-serif0": {
        "width": 29,
        "height": 18,
        "baseline": 15
    },
    "Barfont16px Verdana, sans-serif0": {
        "width": 27,
        "height": 18,
        "baseline": 15
    },
    "|Foo|font16px Verdana, sans-serif0": {
        "width": 43,
        "height": 18,
        "baseline": 15
    },
    "|Bar|font16px Verdana, sans-serif0": {
        "width": 41,
        "height": 18,
        "baseline": 15
    },
    "Foofont16px Verdana, sans-serif42.5": {
        "width": 34,
        "height": 33,
        "baseline": 15,
        "normalWidth": 29,
        "normalHeight": 18
    },
    "Barfont16px Verdana, sans-serif42.5": {
        "width": 32,
        "height": 32,
        "baseline": 15,
        "normalWidth": 27,
        "normalHeight": 18
    },
    "100font12px sans-serifundefined": {
        "width": 21,
        "height": 15,
        "baseline": 12
    },
    "150font12px sans-serifundefined": {
        "width": 21,
        "height": 15,
        "baseline": 12
    },
    "$100.00font12px sans-serifundefined": {
        "width": 45,
        "height": 15,
        "baseline": 12
    },
    "$150.00font12px sans-serifundefined": {
        "width": 45,
        "height": 15,
        "baseline": 12
    },
    "-100font12px sans-serifundefined": {
        "width": 25,
        "height": 15,
        "baseline": 12
    },
    "-150font12px sans-serifundefined": {
        "width": 25,
        "height": 15,
        "baseline": 12
    },
    "1%font12px sans-serifundefined": {
        "width": 18,
        "height": 15,
        "baseline": 12
    },
    "Afont12px sans-serifundefined": {
        "width": 7,
        "height": 15,
        "baseline": 12
    },
    "seriesfont12px sans-serifundefined": {
        "width": 35,
        "height": 15,
        "baseline": 12
    },
    "Category Afont12px Arial,Helvetica,sans-serif0": {
        "width": 59,
        "height": 15,
        "baseline": 12
    },
    "4font12px Arial,Helvetica,sans-serif0": {
        "width": 7,
        "height": 15,
        "baseline": 12
    },
    "6font12px Arial,Helvetica,sans-serif0": {
        "width": 7,
        "height": 15,
        "baseline": 12
    },
    "8font12px Arial,Helvetica,sans-serif0": {
        "width": 7,
        "height": 15,
        "baseline": 12
    },
    "10font12px Arial,Helvetica,sans-serif0": {
        "width": 14,
        "height": 15,
        "baseline": 12
    },
    "12font12px Arial,Helvetica,sans-serif0": {
        "width": 14,
        "height": 15,
        "baseline": 12
    },
    "Alphafont11px Arial,Helvetica,sans-serifundefined": {
        "width": 28,
        "height": 14,
        "baseline": 11
    },
    "1font12px Arial,Helvetica,sans-serifundefined": {
        "width": 7,
        "height": 15,
        "baseline": 12
    },
    "1%font12px Arial,Helvetica,sans-serifundefined": {
        "width": 18,
        "height": 15,
        "baseline": 12
    },
    "1font12px comic-sansundefined": {
        "width": 6,
        "height": 16,
        "baseline": 12
    },
    "seriesfont12px Arial,Helvetica,sans-serifundefined": {
        "width": 35,
        "height": 15,
        "baseline": 12
    },
    "1font11px Arial,Helvetica,sans-serifundefined": {
        "width": 6,
        "height": 14,
        "baseline": 11
    },
    "2font11px Arial,Helvetica,sans-serifundefined": {
        "width": 6,
        "height": 14,
        "baseline": 11
    },
    "0.5font12px sans-serif0": {
        "width": 17,
        "height": 15,
        "baseline": 12
    },
    "1.5font12px sans-serif0": {
        "width": 17,
        "height": 15,
        "baseline": 12
    },
    "2font12px sans-serif0": {
        "width": 7,
        "height": 15,
        "baseline": 12
    },
    "2.5font12px sans-serif0": {
        "width": 17,
        "height": 15,
        "baseline": 12
    },
    "3font12px sans-serif0": {
        "width": 7,
        "height": 15,
        "baseline": 12
    },
    "3.5font12px sans-serif0": {
        "width": 17,
        "height": 15,
        "baseline": 12
    }
}
