---
title: Overview
page_title: Map | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Kendo UI Map tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_map_aspnetcore
previous_url: /aspnet-core/helpers/tag-helpers/map
position: 1
---

# Map Tag Helper Overview

The Map tag helper helps you configure the Kendo UI Map widget in ASP.NET Core applications.

## Basic Usage

The following example demonstrates how to define the Map by using the Map tag helper.

###### Example

        <kendo-map name="map" center="new double[] { 30.268107, -97.744821 }" zoom="3"></kendo-map>

## Configuration

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

* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects with the CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
