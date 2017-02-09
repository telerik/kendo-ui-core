---
title: Bind Map to View Model
page_title: Bind Map to View Model | Kendo UI Grid HtmlHelper
description: "Binding a Map to Model in ASP.NET MVC applications."
slug: howto_bindtomodel_map
---

# Bind Map to View Model

MVC enables you to natively bind parts of the page to the Model passed from the controller. Using this techiques you can also bind **Map** helper methods to the Model.

Also, populate the **Markers** collection to a collection defined in the Model.

###### Example

Models:

```
public class Map
{
    // Map properties
    public string Name { get; set; }
    public double CenterLatitude { get; set; }
    public double CenterLongitude { get; set; }
    public int Zoom { get; set; }

    // Tile layer properties
    public string TileUrlTemplate { get; set; }
    public string[] TileSubdomains { get; set; }
    public string TileAttribution { get; set; }

    // Markers collection
    public IEnumerable<Marker> Markers { get; set; }
}
```

```
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

Controller:

```
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

View:

```
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

## See Also

* [Overview of the Map HtmlHelper]({% slug overview_maphelper_aspnetmvc %})
* [Map API Reference](/api/Kendo.Mvc.UI.Fluent/MapBuilder)
