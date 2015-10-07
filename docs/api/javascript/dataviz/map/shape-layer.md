---
title: ShapeLayer
page_title: API reference for Kendo UI Map Layer
---

# kendo.dataviz.map.ShapeLayer : kendo.dataviz.map.Layer
Represents a data-bound shape layer.

## Constructor Parameters

### map `kendo.dataviz.ui.Map`
The owner Map widget.

### options `Object`
The layer options.

## Fields

### map `kendo.dataviz.ui.Map`
The owner Map widget.

## Methods

### show
Shows the layer, if not visible.

### hide
Hides the layer, if visible.

### setDataSource
Sets the data source of this layer.

#### Example - Set shape layer data source
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "shape"
            }]
        });

        var ds = new kendo.data.DataSource({
            type: "geojson",
            data: [{
                "type": "Polygon",
                "coordinates": [
                    [[30, 10], [40, 40], [20, 40], [10, 20], [30, 10]]
                ]
            }]
        });

        var map = $("#map").data("kendoMap");
        var layer = map.layers[0];
        layer.setDataSource(ds);
    </script>

#### Parameters
##### dataSource `Object`
A live [DataSource](/api/javascript/data/datasource) instance
or its [configuration](/api/javascript/data/datasource#configuration) object.


