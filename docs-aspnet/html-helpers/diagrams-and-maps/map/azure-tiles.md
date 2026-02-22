---
title: Azure Tile Maps
page_title: Azure Tile Maps with the Map for {{ site.framework }}
description: "Learn how to integrate Azure Maps tile services with the Telerik UI Map for {{ site.framework }} by proxying map tiles through an ASP.NET Core backend."
components: ["map"]
slug: azure-tiles
position: 4
---

# Azure Tile Maps

The Telerik UI Map for {{ site.framework }} supports tile layers, which allow you to visualize map imagery provided by external services.
This article demonstrates how to integrate Azure Maps as a tile source by proxying tile requests through an ASP.NET controller.

Using a server-side proxy is recommended because Azure Maps requires a subscription key, which should not be exposed on the client.

## Overview

The integration consists of the following steps:

1. Configure the Azure Maps subscription key
2. Create a controller action to proxy tile requests
3. Configure the Map tile layer using HtmlHelper or TagHelper syntax

## Configuring the Azure Maps Subscription Key

Store your Azure Maps subscription key in the application configuration.

    {
      "AzureMaps": {
        "SubscriptionKey": "${SUBSCRIPTION_KEY}"
      }
    }

This allows the key to be injected securely through the configuration system without exposing it to the client.

## Proxying Azure Maps Tiles

Create a controller action that receives tile coordinates from the Map component and forwards the request to the Azure Maps Tile API.

```C#
    public partial class MapController : BaseController
    {
        [HttpGet]
        public async Task<IActionResult> AzureTile(
            int zoom,
            int x,
            int y,
            [FromServices] IConfiguration configuration)
        {
            var key = configuration["AzureMaps:SubscriptionKey"];

            var url =
                $"https://atlas.microsoft.com/map/tile" +
                $"?api-version=2.1" +
                $"&tilesetId=microsoft.base.road" +
                $"&zoom={zoom}&x={x}&y={y}" +
                $"&tileSize=256" +
                $"&subscription-key={key}";

            using var client = new HttpClient();
            var response = await client.GetAsync(url);

            if (!response.IsSuccessStatusCode)
            {
                var error = await response.Content.ReadAsStringAsync();
                return StatusCode((int)response.StatusCode, error);
            }

            var bytes = await response.Content.ReadAsByteArrayAsync();
            return File(bytes, "image/png");
        }

        [Demo]
        public IActionResult Azure()
        {
            return View();
        }
    }
```

The controller acts as a proxy, retrieving tiles from Azure Maps and returning them as PNG images to the client.

## Configuring the Map Tile Layer

Use a tile layer and configure its UrlTemplate to point to the proxy controller action.

### HtmlHelper Configuration

```HtmlHelper
    @(Html.Kendo().Map()
        .Name("map")
        .Center(51.505, -0.09)
        .Zoom(3)
        .Layers(layers =>
        {
            layers.Add()
                .Type(MapLayerType.Tile)
                .UrlTemplate(
                    Url.Action("AzureTile", "Map") +
                    "?zoom=#=zoom#&x=#=x#&y=#=y#"
                )
                .Attribution("© Microsoft Azure Maps");
        })
    )
```

{% if site.core %}
### TagHelper Configuration

```TagHelper
    @addTagHelper *, Kendo.Mvc
    @addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers

    @{
        var coordinates = new double[] { 51.505, -0.09 };
    }

    <kendo-map name="map" center="coordinates" zoom="3">
        <layers>
            <layer type="MapLayerType.Tile"
                   url-template="@Url.Action("AzureTile", "Map")?zoom=#=zoom#&x=#=x#&y=#=y#"
                   attribution="© Microsoft Azure Maps">
            </layer>
        </layers>
    </kendo-map>
```

{% endif %}

The UrlTemplate placeholders (zoom, x, y) are automatically populated by the Map component when requesting tiles.

## See Also

* [Azure Tile Map (Demo)](https://demos.telerik.com/{{ site.platform }}/map/azure)
* [Map Server-Side API](/api/map)
* [Map Client-Side API](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/dataviz/ui/map)
