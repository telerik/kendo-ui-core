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


<div class="meta-api-description">
Specify or configure the parent map component to bind or attach a tile layer during its creation or setup, enabling the tile layer to inherit, access, or interact with the map’s APIs, rendering context, state, or lifecycle for proper initialization and synchronized display. This connection allows setting the owner map when constructing or instantiating the layer, linking map controls, map state management, map rendering, and tile management, ensuring the layer operates within the map’s environment and can respond to map events or updates from the start.
</div>

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


<div class="meta-api-description">
Set up and customize map tile layers by defining source options, rendering controls, loading strategies, display parameters, and initialization settings during creation; configure how tiles are fetched, displayed, refreshed, and managed within map components by specifying layer sources, enabling or disabling caching, zoom levels, tile grid options, opacity, visibility toggles, update intervals, and loading priorities as constructor inputs to tailor map tile behavior and appearance.
</div>

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


<div class="meta-api-description">
Retrieve or reference the parent map object or instance associated with a specific tile layer to interact with the overall map container holding that layer, enabling operations like accessing map properties, invoking map functions, managing map events, controlling layer visibility, adjusting layer order relative to other layers, and manipulating map view parameters such as panning and zooming within the context of the displayed map environment.
</div>

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


<div class="meta-api-description">
Set or customize the URL pattern for fetching map tile images by specifying dynamic templates that include variables such as tile x and y coordinates, zoom levels, and optional subdomains to optimize tile server requests; control how map tiles are loaded by configuring URL structures, enabling developers to define or modify tile URL schemes, generate tile request endpoints dynamically, incorporate coordinate placeholders, handle multi-subdomain distribution for load balancing, and tailor tile fetching behavior for mapping applications or custom tile servers.
</div>

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


<div class="meta-api-description">
Configure multiple hostnames or domain prefixes to enable parallel loading and faster retrieval of map tiles by distributing requests across various subdomains. Control, set, or customize the list of sub-domain strings used to fetch tile images, improving performance through concurrent network connections, load balancing tile requests among different servers, and optimizing map rendering speed. Enable domain sharding or multi-host loading strategies to increase tile request throughput and reduce bottlenecks during tile fetching.
</div>

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


<div class="meta-api-description">
Adjust the pixel dimensions or resolution of individual map tiles by specifying the size used when rendering and fetching tiles, enabling customization of tile layout, image clarity, zoom detail, and loading strategies for map display. This setting influences how tile images are requested from servers and how they appear visually, affecting map performance and visual fidelity across different zoom levels or device screens. Control, set, or configure tile pixel size to optimize tile rendering, tile requests, and overall map tile appearance and behavior.
</div>

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


<div class="meta-api-description">
Reveal or display a previously hidden map tile layer programmatically, enable visibility for map layers that are currently turned off or hidden, control the appearance of dynamic or toggled layers by showing them on the map, restore tile layers after they have been hidden or removed, activate rendering of specific map tile layers without affecting those already visible, manage visibility state changes for tile overlays, configure displaying of map sections on demand, set layers to be visible again after being disabled, toggle on map tiles dynamically through code, and programmatically control when geographic tile content appears in mapping applications.
</div>

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


<div class="meta-api-description">
Control the visibility of a map tile layer by hiding it without deleting or destroying the layer, enabling you to toggle display on and off, pause rendering to improve performance, temporarily remove the map tiles from view while preserving their state for future reactivation, manage layer visibility dynamically during runtime, and seamlessly switch between visible and hidden states for overlays or base layers without reloading or rebuilding the layer data.
</div>

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

