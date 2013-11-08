var kendo = window.kendo,
    Observable = kendo.Observable,

    dataviz = kendo.dataviz,
    g = dataviz.geometry;

var MapMock = Observable.extend({
    init: function() {
        this.element = $("<div class='k-map'></div>").appendTo($("#qunit-fixture"));
        this.scrollElement = $("<div id='scroll-element'></div>").appendTo(this.element);
        this.options = {};
        Observable.fn.init.call(this);
    },

    locationToView: function(loc) {
        return new g.Point(loc.lng, loc.lat);
    }
});

window.MapMock = MapMock;
