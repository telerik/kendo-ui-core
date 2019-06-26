---
title: Overview
page_title: Map Overview | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Kendo UI Map tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_map_aspnetcore
previous_url: /aspnet-core/helpers/tag-helpers/map
position: 1
---

# Map Tag Helper Overview

The [Kendo UI Map widget](http://demos.telerik.com/aspnet-core/map/index) displays geospatial information organized in layers and is supported for both desktop and mobile devices.

The layers that the Map provides are:
* Tile layers
* Shape (vector) layers
* Marker layers

The Map tag helper extension is a server-side wrapper for the [Kendo UI Map](http://demos.telerik.com/aspnet-mvc/map/index) widget and enables you to configure the Kendo UI Map widget in ASP.NET Core applications.

## Initializing the Map

The following example demonstrates how to define the Map by using the Map tag helper.

    <kendo-map name="map" center="new double[] { 30.268107, -97.744821 }" zoom="3"></kendo-map>

## Basic Configuration

The Map tag helper configuration options are passed as attributes of the tag.

```tagHelper
    <kendo-map name="map" center="new double[] { 30.268107, -97.744821 }"              zoom="3">
        <layer-defaults>
            <map-marker>
                <tooltip>
                    <popup-animation>
                        <open duration="1200" effects="zoom:in" />
                    </popup-animation>
                </tooltip>
            </map-marker>
        </layer-defaults>
        <markers>
            <map-marker location="new double[] { 30.268107, -97.744821 }"  shape="MapMarkersShape.PinTarget">
                <tooltip content="Austin, TX"></tooltip>
            </map-marker>
        </markers>
        <layers>
            <layer type="MapLayerType.Bing"
                imagery-set="MapLayersImagerySet.AerialWithLabels"
                key="AqaPuZWytKRUA8Nm5nqvXHWGL8BDCXvK8onCl2PkC581Zp3T_fYAQBiwIphJbRAK">
            </layer>
        </layers>
    </kendo-map>
```
```cshtml
    @(Html.Kendo().Map()
        .Name("map")
        .Center(30.268107, -97.744821)
        .Zoom(3)
        .Layers(layers =>
        {
            layers.Add()
                .Type(MapLayerType.Bing)
                .ImagerySet(MapLayersImagerySet.AerialWithLabels)
                .Key("AqaPuZWytKRUA8Nm5nqvXHWGL8BDCXvK8onCl2PkC581Zp3T_fYAQBiwIphJbRAK");
        })
        .Markers(markers =>
        {
            markers.Add()
                .Location(30.268107, -97.744821)
                .Shape(MapMarkersShape.PinTarget)
                .Tooltip(tooltip => tooltip.Content("Austin, TX"));
        })
    )
```

## See Also

* [Basic Usage of the Map Tag Helper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/map/tag-helper)
* [JavaScript API Reference of the Map](http://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/map)
