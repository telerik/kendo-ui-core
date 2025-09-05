---
title: ShapeLayer
page_title: API reference for Kendo UI Map Layer
res_type: api
---

# kendo.dataviz.map.ShapeLayer : kendo.dataviz.map.Layer

Represents a data-bound shape layer.

## Constructor Parameters

### map `kendo.dataviz.ui.Map`
The owner Map widget.

#### Example

    <div id="map"></div>
    <script>
    var map = $("#map").kendoMap({
        layers: [{
            type: "shape",
            dataSource: {
                type: "geojson",
                data: [{
                    "type": "Polygon",
                    "coordinates": [
                        [[30, 10], [40, 40], [20, 40], [10, 20], [30, 10]]
                    ]
                }]
            }
        }]
    }).data("kendoMap");
    console.log("Map component:", map);
    </script>

### options `Object`
The layer options.

#### Example

    <div id="map"></div>
    <script>
    var layerOptions = {
        dataSource: {
            type: "geojson",
            data: [{
                "type": "Polygon",
                "coordinates": [
                    [[30, 10], [40, 40], [20, 40], [10, 20], [30, 10]]
                ]
            }],
        },
        style: {
            fill: {
                color: "#007acc",
                opacity: 0.5
            },
            stroke: {
                color: "#004080",
                width: 2
            }
        }
    };
    var map = $("#map").kendoMap({
        layers: [{
            type: "shape",
            ...layerOptions
        }]
    }).data("kendoMap");

    console.log(map.layers[0]);
    </script>

## Fields

### map `kendo.dataviz.ui.Map`
The owner Map widget.

#### Example

    <div id="map"></div>
    <script>
    $("#map").kendoMap({
        layers: [{
            type: "shape",
            dataSource: {
                type: "geojson",
                data: [{
                    "type": "Polygon",
                    "coordinates": [
                        [[30, 10], [40, 40], [20, 40], [10, 20], [30, 10]]
                    ]
                }]
            }
        }]
    });

    var map = $("#map").data("kendoMap");
    console.log("Owner map widget:", map);
    console.log("Map element:", map.element);
    </script>

## Methods

### show
Shows the layer, if not visible.

#### Example

    <div id="map"></div>
    <script>
    $("#map").kendoMap({
        layers: [{
            type: "shape",
            dataSource: {
                type: "geojson",
                data: [{
                    "type": "Polygon",
                    "coordinates": [
                        [[30, 10], [40, 40], [20, 40], [10, 20], [30, 10]]
                    ]
                }]
            }
        }]
    });

    var map = $("#map").data("kendoMap");
    var shapeLayer = map.layers[0];
    
    // Hide the layer first
    shapeLayer.hide();
    
    // Show the layer
    setTimeout(function() {
        shapeLayer.show();
        console.log("Shape layer is now visible");
    }, 1000);
    </script>

### hide
Hides the layer, if visible.

#### Example

    <div id="map"></div>
    <script>
    $("#map").kendoMap({
        layers: [{
            type: "shape",
            dataSource: {
                type: "geojson",
                data: [{
                    "type": "Polygon",
                    "coordinates": [
                        [[30, 10], [40, 40], [20, 40], [10, 20], [30, 10]]
                    ]
                }]
            }
        }]
    });

    var map = $("#map").data("kendoMap");
    var shapeLayer = map.layers[0];
    
    // Hide the layer after 2 seconds
    setTimeout(function() {
        shapeLayer.hide();
        console.log("Shape layer is now hidden");
    }, 2000);
    </script>

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


