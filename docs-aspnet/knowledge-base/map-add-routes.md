---
title: Adding Routes in Map
page_title: Adding Routes in Map
description: "Learn how to enable the user to add routes to markers when working with the Telerik UI for {{ site.framework }} Map component."
slug: map-add-routes
tags: map, add, routes, markers, location, core, mvc, telerik
component: map
res_type: kb
---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Progress {{ site.product }} Map</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2023.2.606 version</td>
 </tr>
</table>


## Description

How can I add routes to given location markers when working with the {{ site.product }} Map component?

## Solution

Follow the steps below to achieve the desired scenario:

1. Create a `Model` that will hold a `PointTo` field, which will be utilized for the drawing line shapes and establishing the route.
1. Supplement the data on the backend with `RouteModel` instances.
1. Create `3` layers within the Map component that will hold a `Tile`, `Shape`, and `Marker`. From there, bind the previously defined data for the markers using a DataSource mediator.
1. Subscribe to the [`Reset`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/mapeventbuilder?#resetsystemstring) event.
1. To draw the routes, create a custom function that will execute for drawing lines using the help of the [Kendo UI Drawing API](https://docs.telerik.com/kendo-ui/framework/drawing/overview).
1. Within the `Reset` event handler, traverse through each of the Markers' Layer and execute the `linkMarker` function created in the previous step.

> The `PointTo` field needs to include a Longitude and Latitude similar to an existing object.

```Index.cshtml
    @(Html.Kendo().Map()
        .Name("map")
        .Center(30.268107, -97.744821)
        .Zoom(6)
        .Layers(layers =>
        {
            layers.Add() // Layer 1
                .Type(MapLayerType.Tile)
                .UrlTemplate("https://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png")
                .Subdomains("a", "b", "c")
                .Attribution("&copy; <a href='https://osm.org/copyright'>OpenStreetMap contributors</a>");

            layers.Add() // Layer 2
                .Type(MapLayerType.Shape);

            layers.Add() // Layer 3
                .Type(MapLayerType.Marker)
                .DataSource(dataSource => dataSource
                      .Read(read => read.Action("_LoadRoutes", "Home"))
                )
                .LocationField("Location")
                .TitleField("Title");

        })
        .Events(events => {
            events.Reset("onReset");
        })
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc
    @addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers

    @{
        var coordinates = new double[] { 30.2681, -97.7448 };
        var subdomains = new string[] { "a","b","c" };
    }

    <kendo-map name="map" center="coordinates" zoom="6" on-reset="onReset">
        <layers>
            <layer type="MapLayerType.Tile" 
                   url-template="https://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/    #= y #.png"
                   subdomains="subdomains"
                   attribution="&copy; <a href='https://osm.org/copyright'>OpenStreetMap    contributors</a>."> // Layer 1
            </layer>
            <layer type="MapLayerType.Shape"> // Layer 2
            </layer>
            <layer type="MapLayerType.Marker" location-field="Location" title-field="Title">
                <datasource>
                    <transport>
                        <read url="@Url.Action("_LoadRoutes","Home")" type="POST"/>
                    </transport>
                </datasource>
            </layer> // Layer 3
        </layers>
    </kendo-map>
```
{% endif %}
```Model.cs
    public class RouteModel
    {
        public double[] Location { get; set; }
        public string Title { get; set; }
        public double[] PointTo { get; set; }
    }
```
{% if site.core %}
```Controller.cs
    public IActionResult _LoadRoutes()
    {
        var data = new List<RouteModel>
        {
            new RouteModel { Title = "Feeling heroic in Austin", Location = new double[] { 30.268107, -97.744821 }, PointTo = new double[] { 30.4515, -91.1871 } },
            new RouteModel { Title = "A bit tired in Baton Rouge", Location = new double[] { 30.4515, -91.1871 }, PointTo = new double[] { 35.1495, -90.0490 } },
            new RouteModel { Title = "Crawling in Memphis, crawling..", Location = new double[] { 35.1495, -90.0490 } }
        };

        return Json(data);
    }
```
{% else %}
```Controller.cs
    public ActionResult _LoadRoutes()
    {
        var data = new List<RouteModel>
        {
            new RouteModel { Title = "Feeling heroic in Austin", Location = new double[] { 30.268107, -97.744821 }, PointTo = new double[] { 30.4515, -91.1871 } },
            new RouteModel { Title = "A bit tired in Baton Rouge", Location = new double[] { 30.4515, -91.1871 }, PointTo = new double[] { 35.1495, -90.0490 } },
            new RouteModel { Title = "Crawling in Memphis, crawling..", Location = new double[] { 35.1495, -90.0490 } }
        };

        return Json(data, JsonRequestBehavior.AllowGet);
    }
```
{% endif %}

```Script.js
    <script>
         function onReset(e){
            var map = e.sender;
            setTimeout(function(){
                var markers = map.layers[2].items; // 1. Gather the marker item object references.

                for (var i = 0; i < markers.length; i++) { // 2. Traverse through each of the markers.
                    linkMarker(map, markers[i]); // 4. Call the common function.
                }
            }, 50)

        }
        function linkMarker(map, marker) { // 3. Create a common function for creating the marker item.
            var data = marker.dataItem;
            if (data.PointTo) {
                // Convert the latitude and longitude locations to coordinates on the screen.
                // See: http://docs.telerik.com/kendo-ui/api/dataviz/map#methods-eventToView
                var from = map.locationToView(marker.location());
                var to = map.locationToView(data.PointTo);

                // Draw a path on the shape layer.
                // See: http://docs.telerik.com/kendo-ui/api/dataviz/drawing/path
                // http://docs.telerik.com/kendo-ui/getting-started/dataviz/drawing/basic-shapes
                var shapeLayer = map.layers[1];
                var line = new kendo.dataviz.drawing.Path({
                    stroke: {
                        color: "#aaa",
                        width: 4,
                        lineCap: "round"
                    }
                });

                line.moveTo(from).lineTo(to);

                shapeLayer.surface.draw(line);
            }
         }
    </script>
```

## More {{ site.framework }} Map Resources
* [{{ site.framework }} Map Documentation]({%slug htmlhelpers_map_aspnetcore %})
* [{{ site.framework }} Map Demos](https://demos.telerik.com/{{ site.platform }}/map/index)
{% if site.core %}
* [{{ site.framework }} Map Product Page](https://www.telerik.com/aspnet-core-ui/map)
* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})
* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)
{% else %}
* [{{ site.framework }} Map Product Page](https://www.telerik.com/aspnet-mvc/map)
* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})
* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the Map for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/map)
* [Server-Side API Reference of the Map for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/map)
{% if site.core %}
* [Server-Side TagHelper API Reference of the Map for ASP.NET Core](https://docs.telerik.com/aspnet-core/api/taghelpers/map)
{% endif %}
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)


