---
title: Overview
page_title: How to use Map HtmlHelper extension | Kendo UI documentation
description: User Guide for server-side wrapper for Kendo UI Map for ASP.NET MVC widget.
---

# Map

The Map HtmlHelper extension is a server-side wrapper for the [Kendo UI Map](/dataviz/map) widget.

## Getting Started

Here is how to configure a simple Kendo UI Map:

1.  Make sure you have followed all the steps from the [Introduction](/aspnet-mvc/introduction) help topic.

2.  Create a new action method which renders the view:

        public ActionResult Index()
        {
            return View();
        }

3.  Add a map:
    - Razor
        @(Html.Kendo().Map()
            .Name("map")
            .Layers(layers =>
            {
                layers.Add()
                    .Type(MapLayerType.Tile)
                    .UrlTemplate("http://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png")
                    .Subdomains("a", "b", "c");
            })
        )

    - WebForms
        <%: Html.Kendo().Map()
            .Name("map")
            .Layers(layers =>
            {
                layers.Add()
                    .Type(MapLayerType.Tile)
                    .UrlTemplate("http://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png")
                    .Subdomains("a", "b", "c");
            })
        %>

## Accessing an Existing Map

You can reference an existing Map instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/javascript/dataviz/ui/map#methods) to control its behavior.

### Accessing an existing Map instance

    // Put this after your Kendo Map for ASP.NET MVC declaration
    <script>
    $(function() {
        // Notice that the Name() of the mao is used to get its client-side instance
        var map = $("#map").data("kendoMap");
    });
    </script>


## Handling Kendo UI Map events

You can subscribe to all [events](/api/javascript/dataviz/ui/map#events) exposed by Kendo UI Editor:

### Razor - subscribe by handler name

    @(Html.Kendo().Map()
        .Name("map")
        .Layers(layers =>
        {
            layers.Add()
                .Type(MapLayerType.Tile)
                .UrlTemplate("http://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png")
                .Subdomains("a", "b", "c");
        })
        .Events(e => e
            .Reset("mapReset")
        )
    )
    <script>
        function mapReset(e) {
            // Handle the reset event
        }
    </script>

### Razor - subscribe by template delegate

    @(Html.Kendo().Map()
        .Name("map")
        .Layers(layers =>
        {
            layers.Add()
                .Type(MapLayerType.Tile)
                .UrlTemplate("http://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png")
                .Subdomains("a", "b", "c");
        })
        .Events(e => e
          .Reset(@<text>
            function() {
                // Handle the reset event inline
            }
            </text>)
        )
    )

### WebForms - subscribe by handler name

    <%: Html.Kendo().Map()
        .Name("map")
        .Layers(layers =>
        {
            layers.Add()
                .Type(MapLayerType.Tile)
                .UrlTemplate("http://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png")
                .Subdomains("a", "b", "c");
        })
        .Events(e => e
            .Reset("mapReset")
        )
    %>
    <script>
        function mapReset(e) {
            // Handle the reset event
        }
    </script>

