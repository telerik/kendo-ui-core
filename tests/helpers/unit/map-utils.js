import '@progress/kendo-ui/src/kendo.dataviz.map.js';
import '@progress/kendo-ui/src/kendo.binder.js';
import { stubMethod } from './dataviz-utils.js';

let Observable = kendo.Observable,
    dataviz = kendo.dataviz,
    g = kendo.geometry,
    m = dataviz.map;

export const MapMock = Observable.extend({
    init: function(options) {
        this.options = options || {};

        if (options && options.element) {
            this.element = $(options.element);
        } else {
            this.element = $("<div class='k-map'></div>").appendTo(Mocha.fixture);
        }

        this.scrollElement = $("<div id='scroll-element'></div>").appendTo(this.element);
        this.options = {};
        this._zoom = 3;
        this._extent = new m.Extent(
            new m.Location(50, -180),
            new m.Location(-50, 180)
        );

        this.attribution = {
            add: function() { },
            clear: function() { }
        };

        Observable.fn.init.call(this);
    },

    destroy: function() {
        Mocha.fixture.empty();
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

export function baseLayerTests(name, TLayer) {
    let layer, map;

    function assertUnbind() {
        map.unbind = function(name, handler) {
            if (name === "reset") {
                assert.isOk(true);
            }

            if (name === "resize") {
                assert.isOk(true);
            }
        };
    }

    function destroyLayer() {
        if (layer) {
            layer.destroy();
        }
    }

    // ------------------------------------------------------------
    describe(name + " / styles", function() {
        beforeEach(function() {
            map = new MapMock();
        });
        afterEach(destroyLayer);

        it("zIndex", function() {
            layer = new TLayer(map, { zIndex: 100 });
            assert.equal(layer.element.css("zIndex"), 100);
        });

        it("opacity", function() {
            layer = new TLayer(map, { opacity: 0.10 });
            close(layer.element.css("opacity"), 0.10, 0.001);
        });
    });

    // ------------------------------------------------------------
    describe(name + " / hide", function() {
        beforeEach(function() {
            map = new MapMock();
            layer = new TLayer(map);
        });
        afterEach(destroyLayer);

        it(name + " / hide hides element", function() {
            layer.hide();
            assert.equal(layer.element.css("display"), "none");
        });

        it("detaches map event handlers", function() {
            assertUnbind();
            layer.hide();

            map.unbind = $.noop;
        });
    });

    // ------------------------------------------------------------
    describe(name + " / show", function() {
        beforeEach(function() {
            map = new MapMock();
            layer = new TLayer(map);
            layer.hide();
        });
        afterEach(destroyLayer);

        it("shows element", function() {
            layer.show();
            assert.equal(layer.element.css("display"), "block");
        });

        it("re-attaches map event handlers", function() {
            stubMethod(TLayer.fn, "reset", function() {
                assert.isOk(true);
            }, function() {
                layer.show();
                map.trigger("reset");
            });
        });

        it("show method does not attach the same handlers multiple times", function() {
            layer.show();
            layer.show();

            assert.equal(layer.map._events["beforeReset"].length, 1);
            assert.equal(layer.map._events["reset"].length, 1);
            assert.equal(layer.map._events["resize"].length, 1);
            assert.equal(layer.map._events["panEnd"].length, 1);
        });

        it("triggers reset", function() {
            stubMethod(TLayer.fn, "reset", function() {
                assert.isOk(true);
            }, function() {
                layer.show();
            });
        });
    });

    // ------------------------------------------------------------
    describe(name + " / destroy", function() {
        beforeEach(function() {
            map = new MapMock();
            layer = new TLayer(map);
        });

        it("detaches map event handlers", function() {
            assertUnbind();
            layer.destroy();
        });
    });

    // ------------------------------------------------------------
    describe(name + " / extent", function() {
        beforeEach(function() {
            map = new MapMock();
        });
        afterEach(destroyLayer);

        it("layer is hidden when zoom < minZoom", function() {
            layer = new TLayer(map, { minZoom: 5 });
            stubMethod(TLayer.fn, "_setVisibility", function(visible) {
                assert.isOk(!visible);
            }, function() {
                map._zoom = 4;
                map.trigger("reset");
            });
        });

        it("layer is shown when zoom = minZoom", function() {
            layer = new TLayer(map, { minZoom: 5 });
            stubMethod(TLayer.fn, "_setVisibility", function(visible) {
                assert.isOk(visible);
            }, function() {
                map._zoom = 5;
                map.trigger("reset");
            });
        });

        it("layer is hidden when zoom > maxZoom", function() {
            layer = new TLayer(map, { maxZoom: 5 });
            stubMethod(TLayer.fn, "_setVisibility", function(visible) {
                assert.isOk(!visible);
            }, function() {
                map._zoom = 6;
                map.trigger("reset");
            });
        });

        it("layer is shown when zoom = maxZoom", function() {
            layer = new TLayer(map, { maxZoom: 5 });
            stubMethod(TLayer.fn, "_setVisibility", function(visible) {
                assert.isOk(visible);
            }, function() {
                map._zoom = 5;
                map.trigger("reset");
            });
        });

        it("layer is hidden when outside zoom range", function() {
            layer = new TLayer(map, { minZoom: 3, maxZoom: 5 });
            stubMethod(TLayer.fn, "_setVisibility", function(visible) {
                assert.isOk(!visible);
            }, function() {
                map._zoom = 1;
                map.trigger("reset");
            });
        });

        it("layer is shown when inside zoom range", function() {
            layer = new TLayer(map, { minZoom: 3, maxZoom: 5 });
            stubMethod(TLayer.fn, "_setVisibility", function(visible) {
                assert.isOk(visible);
            }, function() {
                map._zoom = 4;
                map.trigger("reset");
            });
        });

        it("layer is hidden when outside extent", function() {
            layer = new TLayer(map, {
                extent: [
                    45.3444, 20.8960,
                    40.5222, 29.6850
                ]
            });

            map._extent = new m.Extent([0, 0], [-10, 10]);

            stubMethod(TLayer.fn, "_setVisibility", function(visible) {
                assert.isOk(!visible);
            }, function() {
                map.trigger("reset");
            });
        });

        it("layer is shown when inside extent", function() {
            layer = new TLayer(map, {
                extent: [
                    45.3444, 20.8960,
                    40.5222, 29.6850
                ]
            });

            map._extent = new m.Extent([42, 0], [0, 30]);

            stubMethod(TLayer.fn, "_setVisibility", function(visible) {
                assert.isOk(visible);
            }, function() {
                map.trigger("reset");
            });
        });

        it("layer is shown when inside extent and zoom range", function() {
            layer = new TLayer(map, {
                extent: [
                    45.3444, 20.8960,
                    40.5222, 29.6850
                ],
                minZoom: 5,
                maxZoom: 10
            });

            map._zoom = 5;
            map._extent = new m.Extent([42, 0], [0, 30]);

            stubMethod(TLayer.fn, "_setVisibility", function(visible) {
                assert.isOk(visible);
            }, function() {
                map.trigger("reset");
            });
        });

        it("layer is hidden when inside extent, but outside zoom range", function() {
            layer = new TLayer(map, {
                extent: [
                    45.3444, 20.8960,
                    40.5222, 29.6850
                ],
                minZoom: 5,
                maxZoom: 10
            });

            map._zoom = 4;
            map._extent = new m.Extent([0, 42], [30, 0]);

            stubMethod(TLayer.fn, "_setVisibility", function(visible) {
                assert.isOk(!visible);
            }, function() {
                map.trigger("reset");
            });
        });

        it("extent is evaluated on panEnd", function() {
            layer = new TLayer(map, { minZoom: 5 });
            stubMethod(TLayer.fn, "_setVisibility", function(visible) {
                assert.isOk(true);
            }, function() {
                map.trigger("panEnd");
            });
        });

        it("extent not evaluated for hidden layer", function() {
            layer = new TLayer(map, { minZoom: 5 });
            layer.hide();
            stubMethod(TLayer.fn, "_setVisibility", function(visible) {
                assert.isOk(false);
            }, function() {
                map.trigger("reset");
            });
        });
    });

    // ------------------------------------------------------------
    describe(name + " / reset", function() {
        beforeEach(function() {
            map = new MapMock();
            layer = new TLayer(map);
        });
        afterEach(destroyLayer);

        it("reset triggers _beforeReset handler", function() {
            layer._beforeReset = function() { assert.isOk(true); };
            layer.reset();
        });

        it("reset triggers _reset handler", function() {
            layer._reset = function() { assert.isOk(true); TLayer.fn._reset.call(this); };
            layer.reset();
        });
    });
}
