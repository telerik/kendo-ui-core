---
title: TileLayer
page_title: API reference for Kendo UI Map Layer
res_type: api
---

# kendo.dataviz.map.TileLayer : kendo.dataviz.map.Layer

A tile layer for displaying raster maps.

## Constructor Parameters

### map `kendo.dataviz.ui.Map`
The owner Map widget.

#### Example

    <div id="map"></div>
    <script>
    // Creating a tile layer with map parameter
    $("#map").kendoMap({
        layers: [{
            type: "tile",
            urlTemplate: "https://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
            subdomains: ["a", "b", "c"]
        }]
    });
    </script>

### options `Object`
The layer options.

#### Example

    <div id="map"></div>
    <script>
    // Options for tile layer configuration
    var options = {
        type: "tile",
        urlTemplate: "https://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
        subdomains: ["a", "b", "c"],
        tileSize: 256
    };
    
    $("#map").kendoMap({
        layers: [options]
    });
    </script>

## Fields

### map `kendo.dataviz.ui.Map`
The owner Map widget.

#### Example

    <div id="map"></div>
    <script>
    var map = $("#map").kendoMap({
        layers: [{
            type: "tile",
            urlTemplate: "https://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
            subdomains: ["a", "b", "c"]
        }]
    }).data("kendoMap");
    
    // Access the map field from the tile layer
    var tileLayer = map.layers[0];
    console.log("Layer's map field:", tileLayer.map);
    console.log("Is same as parent map:", tileLayer.map === map);
    </script>

## Configuration

### urlTemplate `String`

The URL template for tile layer. Template variables:

* x - X coordinate of the tile
* y - Y coordinate of the tile
* zoom - zoom level
* subdomain - Subdomain for this tile

#### Example

    <div id="map"></div>
    <script>
    $("#map").kendoMap({
        zoom: 3,
        center: [30.2681, -97.7448],
        layers: [{
            type: "tile",
            urlTemplate: "https://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
            subdomains: ["a", "b", "c"]
        }]
    });
    </script>

### subdomains `Array`

A list of sub-domains to use for loading tiles.
Alternating between different subdomains allows more requests to be executed in parallel.

#### Example

    <div id="map"></div>
    <script>
    $("#map").kendoMap({
        zoom: 3,
        center: [30.2681, -97.7448],
        layers: [{
            type: "tile",
            urlTemplate: "https://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
            subdomains: ["a", "b", "c"]
        }]
    });
    </script>

### tileSize `Number` *(default: 256)*
The tile size in pixels.

#### Example

    <div id="map"></div>
    <script>
    $("#map").kendoMap({
        zoom: 3,
        center: [30.2681, -97.7448],
        layers: [{
            type: "tile",
            urlTemplate: "https://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
            subdomains: ["a", "b", "c"],
            tileSize: 512
        }]
    });
    </script>

## Methods

### show
Shows the layer, if not visible.

#### Example

    <div id="map"></div>
    <script>
    var map = $("#map").kendoMap({
        zoom: 3,
        center: [30.2681, -97.7448],
        layers: [{
            type: "tile",
            urlTemplate: "https://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
            subdomains: ["a", "b", "c"]
        }]
    }).data("kendoMap");
    
    var tileLayer = map.layers[0];
    
    // Hide and then show the layer
    tileLayer.hide();
    setTimeout(function() {
        tileLayer.show();
        console.log("Tile layer is now visible");
    }, 1000);
    </script>

### hide
Hides the layer, if visible.

#### Example

    <div id="map"></div>
    <script>
    var map = $("#map").kendoMap({
        zoom: 3,
        center: [30.2681, -97.7448],
        layers: [{
            type: "tile",
            urlTemplate: "https://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
            subdomains: ["a", "b", "c"]
        }]
    }).data("kendoMap");
    
    var tileLayer = map.layers[0];
    
    // Hide the tile layer
    setTimeout(function() {
        tileLayer.hide();
        console.log("Tile layer is now hidden");
    }, 1000);
    </script>

