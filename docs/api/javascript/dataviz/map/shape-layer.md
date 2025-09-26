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


<div class="meta-api-description">
Specify or configure the map instance or map object to link a shape or graphics layer with its parent map component, enabling the layer to access map functions, render shapes in map coordinates, synchronize with map events, handle user interactions on the map, and align its lifecycle with the map’s state. This connection ensures that the shapes are properly positioned according to the map’s projection and zoom level, allows the layer to respond to map changes and user interactions, and integrates the graphical elements seamlessly within the map environment. Passing or setting the map reference during the layer initialization or construction binds the layer’s rendering and event handling context to the map component, facilitating coordination between visual elements and map behavior.
</div>

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


<div class="meta-api-description">
Set and customize initialization parameters for a ShapeLayer to control how it renders and interacts on a map, including configuring data binding attributes, applying styles, managing visibility toggles, adjusting display order with z-index, and enabling or disabling user interactions such as clicks or hovers during layer creation; configure options that affect layer appearance, behavior, and integration within map components upon setup.
</div>

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


<div class="meta-api-description">
Accessing and interacting with the parent map instance from a shape or layer to call map methods, retrieve or modify map options, manage layers and markers dynamically, control the map’s state and properties, reference the main map object for runtime updates, enable direct manipulation of map features, configure map behaviors from a child layer perspective, link shape or vector layers back to their owning map, integrate with the map API programmatically, and synchronize shapes or overlays with the underlying map component and its current settings.
</div>

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


<div class="meta-api-description">
Activate or display a previously hidden shape layer on a map interface, enabling rendering and interactive functionality for its graphical elements; control visibility by making the layer appear if currently invisible, ensuring its shapes respond to user interactions, toggling map overlays, or managing layer display without affecting already visible layers.
</div>

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


<div class="meta-api-description">
Control the visibility of a vector shape layer by programmatically hiding it or removing its shapes from the map display, enabling developers to dynamically toggle layer appearance, disable rendering of map shapes, or conditionally hide visible map features without affecting layers already hidden. Manage showing and hiding of graphic elements, turn off visible overlays, configure map layers to disappear on demand, and control map visualization by setting shape rendering to invisible or removing shapes from view during runtime.
</div>

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


<div class="meta-api-description">
Update, configure, or rebind spatial data sources for a shape layer dynamically at runtime by setting or replacing the underlying geometry or feature collection. Enable live data updates by supplying new data from various formats including data source instances, JavaScript arrays, or configuration objects. Control how vector features, shapes, or geometries are refreshed or switched without recreating the visual layer component. Implement data source swapping, dynamic binding, or incremental loading of spatial datasets to modify displayed map features on the fly. Adjust or reset the layer’s data connection programmatically to reflect changing geographic or feature data seamlessly.
</div>

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


