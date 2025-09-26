---
title: BingLayer
page_title: API reference for Kendo UI Map Layer
res_type: api
---

# kendo.dataviz.map.BingLayer : kendo.dataviz.map.TileLayer

A tile layer backed by Bing Maps.

## Constructor Parameters

### map `kendo.dataviz.ui.Map`
The owner Map widget.


<div class="meta-api-description">
Set or pass the parent map instance when creating a BingLayer to link the layer with the containing map, ensuring the layer is rendered properly, can listen to map events, and access key map properties like zoom level, center coordinates, and overall map state; configuring this parameter lets you integrate the BingLayer seamlessly into the map’s lifecycle, control its visibility and update behavior based on the map, and connect layers to specific map instances during initialization or dynamic layer management.
</div>

#### Example

    <div id="map"></div>
    <script>
    $("#map").kendoMap({
        layers: [{
            type: "bing",
            key: "AqaPuZWytKRUA8Nm5nqvXHWGL8BDCXvK8onCl2PkC581Zp3T_fYAQBiwIphJbRAK"
        }]
    });
    
    var layer = $("#map").data("kendoMap").layers[0];
    console.log("Owner Map widget:", layer.map);
    </script>

### options `Object`
The layer options.


<div class="meta-api-description">
Set initial configuration for Bing map layers by passing an options object during creation to control visibility, rendering behavior, tile loading parameters, imagery source selection, credentials for accessing the map service, and various layer-specific settings that govern appearance and data fetching. Enable customization of the map layer’s source, manage authentication credentials, specify tile grid details, toggle layer display on or off, and adjust rendering options to fit application needs by defining all these parameters upfront in the constructor options. This configuration approach supports managing how the map data is retrieved and rendered right from layer initialization, incorporating credentials, tile settings, visual control, and source selection in one comprehensive setup.
</div>

#### Example

    <div id="map"></div>
    <script>
    var layerOptions = {
        baseUrl: "//dev.virtualearth.net/REST/v1/Imagery/Metadata/",
        imagerySet: "aerial",
        key: "AqaPuZWytKRUA8Nm5nqvXHWGL8BDCXvK8onCl2PkC581Zp3T_fYAQBiwIphJbRAK"
    };
    
    $("#map").kendoMap({
        layers: [{
            type: "bing",
            ...layerOptions
        }]
    });
    
    console.log("Layer options:", layerOptions);
    </script>

## Fields

### map `kendo.dataviz.ui.Map`
The owner Map widget.


<div class="meta-api-description">
access or reference the main map object to inspect or control the map’s state, interact with layer configurations, manage view settings such as pan and zoom, bind event listeners, retrieve current map properties, manipulate zoom levels, adjust map center or viewport, hook into map lifecycle events, and programmatically control map behavior and display features through the owner map instance after initialization for seamless integration and dynamic control of mapping components.
</div>

#### Example

    <div id="map"></div>
    <script>
    $("#map").kendoMap({
        layers: [{
            type: "bing",
            key: "AqaPuZWytKRUA8Nm5nqvXHWGL8BDCXvK8onCl2PkC581Zp3T_fYAQBiwIphJbRAK"
        }]
    });
    
    var layer = $("#map").data("kendoMap").layers[0];
    console.log("Map widget reference:", layer.map);
    </script>

## Configuration

### baseUrl `String` *(default: "//dev.virtualearth.net/REST/v1/Imagery/Metadata/")*

The Bing API end-point.


<div class="meta-api-description">
Configure the endpoint URL for retrieving map tiles, imagery data, and metadata through REST API calls, enabling customization of the service URL, proxy usage, or directing requests to alternative Bing map servers. Set, control, or change the base HTTP address used for accessing Bing mapping services, including switching between default or custom endpoints to influence where map imagery and metadata are fetched from. Tailor the source URL for map tile requests and related Bing REST APIs to suit development environments, custom proxies, or alternative server configurations supporting Bing mapping functionality.
</div>

#### Example

    <div id="map"></div>
    <script>
    $("#map").kendoMap({
        layers: [{
            type: "bing",
            baseUrl: "//dev.virtualearth.net/REST/v1/Imagery/Metadata/",
            imagerySet: "road",
            key: "AqaPuZWytKRUA8Nm5nqvXHWGL8BDCXvK8onCl2PkC581Zp3T_fYAQBiwIphJbRAK"
        }]
    });
    
    console.log("Custom Bing API endpoint configured");
    </script>

### imagerySet `String` *(default: "road")*
The default imagery set of the map.


<div class="meta-api-description">
Set or configure the type of map imagery shown, selecting from options like aerial views, road maps, satellite images, or hybrid layers with labels to customize the base map style and tile appearance; control the default visual presentation of map backgrounds, enable specific map styles during initialization, choose between different map tile sets including streets, satellite, or labeled aerial imagery, and adjust the underlying map layer to match display preferences or application requirements.
</div>

#### Example

    <div id="map"></div>
    <script>
    $("#map").kendoMap({
        layers: [{
            type: "bing",
            imagerySet: "aerial",
            key: "AqaPuZWytKRUA8Nm5nqvXHWGL8BDCXvK8onCl2PkC581Zp3T_fYAQBiwIphJbRAK"
        }]
    });
    
    console.log("Bing layer with aerial imagery set initialized");
    </script>

## Methods

### show
Shows the layer, if not visible.


<div class="meta-api-description">
Enable or activate a hidden map layer to display its contents by making the layer visible and rendering it on the map interface. Use commands or functions to reveal layers that were previously concealed, allowing them to participate in map events, interactions, updates, or user actions. Control the visibility state to toggle layers on and off, showing map data dynamically, ensuring the map reflects the desired overlays, geo data, or visual elements. This method supports scenarios where layers need to be programmatically shown after being hidden for filtering, user interaction, animation, or conditional display purposes. Calling this action makes the hidden layers accessible for rendering, interaction, and visibility management.
</div>

#### Example

    <div id="map"></div>
    <script>
    $("#map").kendoMap({
        layers: [{
            type: "bing",
            key: "AqaPuZWytKRUA8Nm5nqvXHWGL8BDCXvK8onCl2PkC581Zp3T_fYAQBiwIphJbRAK"
        }]
    });
    
    var layer = $("#map").data("kendoMap").layers[0];
    layer.hide();
    
    setTimeout(function() {
        layer.show();
        console.log("Bing layer is now visible");
    }, 2000);
    </script>

### hide
Hides the layer, if visible.


<div class="meta-api-description">
Control the map layer’s visibility by hiding it from view without removing or deleting it from the map’s layer collection, enabling toggling or managing display dynamically; set the layer to invisible, conceal or disable rendering temporarily, programmatically turn off or hide map elements, manage on-screen layers without altering data or layer structure, and support paired visibility functions for showing or hiding layers as needed in mapping applications or UI controls.
</div>

#### Example

    <div id="map"></div>
    <script>
    $("#map").kendoMap({
        layers: [{
            type: "bing",
            key: "AqaPuZWytKRUA8Nm5nqvXHWGL8BDCXvK8onCl2PkC581Zp3T_fYAQBiwIphJbRAK"
        }]
    });
    
    var layer = $("#map").data("kendoMap").layers[0];
    
    setTimeout(function() {
        layer.hide();
        console.log("Bing layer is now hidden");
    }, 2000);
    </script>

### imagerySet
Sets the preferred imagery set for the map.

Available imagery sets:
* "aerial" - Aerial imagery.
* "aerialWithLabels" - Aerial imagery with a road overlay.
* "road" - Roads without additional imagery.


<div class="meta-api-description">
Configure or switch the map’s base layer style to display aerial photos, aerial images with road labels, or road-only views by selecting or setting the preferred satellite or street map imagery type, enabling control over visual map themes such as photographic backgrounds, labeled aerial views, or simple road overlays, useful for toggling between different map presentations, customizing map tiles, enabling or disabling label visibility, changing basemap sets, or applying specific imagery rendering styles like aerial, aerial with labels, and roads-only for enhanced map visualization and user interface customization.
</div>

#### Example - Set Bing layer imagery set
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "bing",
                imagerySet: "road",

                // IMPORTANT: This key is locked to demos.telerik.com
                // Please replace with your own Bing Key
                key: "AqaPuZWytKRUA8Nm5nqvXHWGL8BDCXvK8onCl2PkC581Zp3T_fYAQBiwIphJbRAK"
            }]
        });

        setTimeout(function() {
            var map = $("#map").data("kendoMap");
            var layer = map.layers[0];
            layer.imagerySet("aerialWithLabels");
        }, 2000);
    </script>

#### Parameters
##### name `String`
The identifier for the imagery set. Case-insensitive.


