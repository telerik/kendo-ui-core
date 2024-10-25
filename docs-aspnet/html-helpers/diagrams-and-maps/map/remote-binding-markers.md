---
title: Remote Binding Markers
page_title: Remote Binding Markers
description: "Learn how to bind the markers to remote data when working with the Telerik UI Map component for {{ site.framework }}."
slug: htmlhelpers_map_remote_binding_markers
position: 1
---

## Remote Binding Markers

The Telerik UI for {{ site.framework }} Map marker exposes the ability to bind its markers to a remote service. It enables you to transpose the key logic for fetching the markers to a more autonomous server-side location. This omits the need to explicitly declare the markers within the Map definition and makes the component more concise in terms of readability.

## Configuration

To enable the remote data operations for the markers, use the [`DataSource()`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/maplayerbuilder#datasourcesystemaction) configuration method. The specified remote service must return an array of objects with a `Location` and an optional `Title` field. 

> The location field must be an array with two numbers&mdash;`Latitude` and `Longitude` in decimal degrees.

The following example demonstrates how to configure the markers for remote data binding.

```HtmlHelper
    @(Html.Kendo().Map()
        .Name("map")
        .Center(30.268107, -97.744821)
        .Zoom(15)
        .Layers(layers =>
        {
            layers.Add()
                .Type(MapLayerType.Tile)
                .UrlTemplate("https://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png")
                .Subdomains("a", "b", "c")
                .Attribution("&copy; <a href='https://osm.org/copyright'>OpenStreetMap contributors</a>." +
                             "Tiles courtesy of <a href='https://www.opencyclemap.org/'>Andy Allan</a>");

            layers.Add()
                .Type(MapLayerType.Marker)
                .DataSource(dataSource => dataSource
                      .Read(read => read.Action("_StoreLocations", "Map"))
                )
                .LocationField("LatLng")
                .TitleField("Name");
        })
    )
```

{% if site.core %}
```TagHelper
    @{
        var coordinates = new double[] { 30.2681, -97.7448 };
        var subdomains = new string[] { "a","b","c" };
    }

    <kendo-map name="map" center="coordinates" zoom="15">
        <layers>
            <layer type="MapLayerType.Tile" 
                   url-template="https://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png"
                   subdomains="subdomains"
                   attribution="&copy; <a href='https://osm.org/copyright'>OpenStreetMap contributors</a>. Tiles courtesy of <a href='https://www.opencyclemap.org/'>Andy Allan</a>">
            </layer>
            <layer type="MapLayerType.Marker" location-field="LatLng" title-field="Name">
                <datasource>
                    <transport>
                        <read url="@Url.Action("_StoreLocations","Map")" type="POST"/>
                    </transport>
                </datasource>
            </layer>
        </layers>
    </kendo-map>
```
{% endif %}

```Controller
    public partial class MapController : BaseController
    {
        public ActionResult _StoreLocations()
        {
            return Json(MapDataRepository.StoreLocations());
        }
    }
```
```MapDataRepository
    public class MapDataRepository
    {
        public static IList<Marker> StoreLocations() 
        {
            return new Marker[]
            {
                new Marker(30.2675,-97.7409, "Zevo Toys"),
                new Marker(30.2707,-97.7490, "Foo Bars"),
                new Marker(30.2705,-97.7409, "Mainway Toys"),
                new Marker(30.2686,-97.7494, "Acme Toys")
            };
        }
    }
```

## See Also

* [Markers Binding to Remote Data HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/map/remote-markers)
* [Server-Side API of the Map for {{ site.framework }}](/api/map)
