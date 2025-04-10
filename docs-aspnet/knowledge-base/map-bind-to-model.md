---
title: Bind Map to View Model
page_title: Bind Map to View Model
description: "Learn how to bind a Map to the View Model in {{ site.framework }} applications."
type: how-to
previous_url: /helpers/diagrams-and-maps/map/how-to/bind-map-to-model, /html-helpers/diagrams-and-maps/map/how-to/bind-map-to-model
slug: howto_bindtomodel_map
tags: map, bind, model, telerik, core, mvc
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Map for {{ site.product }}</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>Created with version 2024.4.1112</td>
 </tr>
</table>

## Description

How can I bind the {{ site.framework }} Map component to a Model collection?

## Solution

MVC enables you to natively bind parts of the page to the Model that is passed from the controller.

Using this technique, you can also bind {{ site.product }} Map options to the Model properties and populate the Map markers based on a collection that is defined in the Model.

1. Set up the Models.

```C# Map
public class Map
{
    // The Map properties.
    public string Name { get; set; }
    public double CenterLatitude { get; set; }
    public double CenterLongitude { get; set; }
    public int Zoom { get; set; }

    // The tile layer properties.
    public string TileUrlTemplate { get; set; }
    public string[] TileSubdomains { get; set; }
    public string TileAttribution { get; set; }

    // The markers collection.
    public IEnumerable<Marker> Markers { get; set; }
}
```
```C# Marker
public class Marker
{
    public Marker(double latitude, double longitude, string sname)
    {
        latlng = new double[] { latitude, longitude };
        name = sname;
    }

    public double[] latlng { get; set; }
    public string name { get; set; }
}
```

2. Set up the desired data in the Controller and send it to the View.

```C# Controller
public ActionResult Index()
{
    var map = new TelerikMvcApp.Models.Map()
    {
        Name = "MyMap",
        CenterLatitude = 30.268107,
        CenterLongitude = -97.744821,
        Zoom = 3,
        TileUrlTemplate = "http://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
        TileSubdomains = new string[] { "a", "b", "c" },
        TileAttribution = "&copy; <a href='http://osm.org/copyright'>OpenStreetMap contributors</a>",
        Markers = new List<Marker>
        {
            new Marker(30.268107, -97.744821, "Austin, TX")
        }
    };

    return View(map);
}
```

3. Configure the Map using the Model properties accessible in the View.

```HtmlHelper
@model TelerikMvcApp.Models.Map

@(Html.Kendo().Map()
        .Name(Model.Name)
        .Center(Model.CenterLatitude, Model.CenterLongitude)
        .Zoom(Model.Zoom)
        .Layers(layers => layers
            .Add()
            .Type(MapLayerType.Tile)
            .UrlTemplate(Model.TileUrlTemplate)
            .Subdomains(Model.TileSubdomains)
            .Attribution(Model.TileAttribution)
        )
        .Markers(markers =>
        {
            foreach (var marker in Model.Markers)
            {
                markers.Add()
                .Location(marker.latlng)
                .Title(marker.name);
            }
        })
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc
@model TelerikMvcApp.Models.Map

<kendo-map name="@Model.Name" center="new double[] { @Model.CenterLatitude, @Model.CenterLongitude }" zoom="@Model.Zoom">
    <layers>
        <layer type="MapLayerType.Tile"
               url-template="@Model.TileUrlTemplate"
               subdomains="@Model.TileSubdomains"
               attribution="@Model.TileAttribution">
        </layer>
    </layers>
    <markers>
          @{ foreach (var marker in Model.Markers)
            {
                <map-marker location="@marker.latlng" title="@marker.name">
                </map-marker>
            }
    }
    </markers>
</kendo-map>
```
 {% endif %}
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

* [Basic Usage of the Map HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/map)
* [Server-Side API Reference of the Map for {{ site.framework }}](/api/map)
{% if site.core %}
* [Server-Side TagHelper API Reference of the Map for {{ site.framework }}](/api/taghelpers/map)
{% endif %}
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2024%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
