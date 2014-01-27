(function() {
    var kendo = window.kendo,
        Observable = kendo.Observable,

        dataviz = kendo.dataviz,
        g = dataviz.geometry,
        m = dataviz.map;

    var MapMock = Observable.extend({
        init: function() {
            this.element = $("<div class='k-map'></div>").appendTo(QUnit.fixture);
            this.scrollElement = $("<div id='scroll-element'></div>").appendTo(this.element);
            this.options = {};
            this._zoom = 3;
            this._extent = new m.Extent(
                new m.Location(50, -180),
                new m.Location(-50, 180)
            );

            Observable.fn.init.call(this);
        },

        destroy: function() {
            QUnit.fixture.empty();
        },

        locationToView: function(loc) {
            return new g.Point(loc.lng, loc.lat);
        },

        locationToLayer: function(loc) {
            return new g.Point(loc.lng, loc.lat);
        },

        center: function() {
            return new m.Location(0, 0);
        },

        zoom: function(zoom) {
            return this._zoom;
        },

        extent: function() {
            return this._extent;
        }
    });

    window.MapMock = MapMock;
})();
