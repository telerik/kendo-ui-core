---
title: BingLayer
page_title: API reference for Kendo UI Map Layer
---

# kendo.dataviz.map.BingLayer : kendo.dataviz.map.TileLayer
A tile layer backed by Bing Maps.

## Constructor Parameters

### map `kendo.dataviz.ui.Map`
The owner Map widget.

### options `Object`
The layer options.

## Fields

### map `kendo.dataviz.ui.Map`
The owner Map widget.

## Configuration

### baseUrl `String` *(default: "//dev.virtualearth.net/REST/v1/Imagery/Metadata/")*

The Bing API end-point.
The creator of the workbook.

### imagerySet `String` *(default: "road")*
The default imagery set of the map.

## Methods

### show
Shows the layer, if not visible.

### hide
Hides the layer, if visible.

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


