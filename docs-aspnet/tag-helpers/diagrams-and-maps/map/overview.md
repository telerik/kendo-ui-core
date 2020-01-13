---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Map TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_map_aspnetcore
previous_url: /helpers/tag-helpers/map
position: 1
---

# Map TagHelper Overview

The Telerik UI Map TagHelper for ASP.NET Core is a server-side wrapper for the Kendo UI Map widget.

The Map displays geospatial information organized in layers and is supported for both desktop and mobile devices. The layers which the Map supports are tile, shape (vector), and marker layers.

* [Demo page for the Map](https://demos.telerik.com/aspnet-core/map/tag-helper)

## Initializing the Map

The following example demonstrates how to define the Map by using the Map TagHelper.

    <kendo-map name="map" center="new double[] { 30.268107, -97.744821 }" zoom="3"></kendo-map>

## Basic Configuration

The Map TagHelper configuration options are passed as attributes of the tag.

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

* [Basic Usage of the Map TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/map/tag-helper)
* [Server-Side API](/api/map)
