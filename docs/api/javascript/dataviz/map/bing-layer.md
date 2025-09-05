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


