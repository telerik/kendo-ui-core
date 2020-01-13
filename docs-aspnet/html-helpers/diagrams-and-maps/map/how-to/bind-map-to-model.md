---
title: Bind Map to View Model
page_title: Bind Map to View Model
description: "Learn how to bind a Map to the View Model in ASP.NET MVC applications."
previous_url: /helpers/diagrams-and-maps/map/how-to/bind-map-to-model
slug: howto_bindtomodel_map
---

# Bind Map to View Model

MVC enables you to natively bind parts of the page to the Model that is passed from the controller.

Using this technique, you can also bind Telerik UI Map HtmlHelper for ASP.NET MVC methods to the Model and populate the **Markers** collection to a collection that is defined in the Model.

The following example demonstrates how to set up the models.

```Map
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
```Marker
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

The following example demonstrates how to set up the Controller.

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

The following example demonstrates how to set up the View.

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

* [Basic Usage of the Map HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/map)
* [Server-Side API](/api/map)
