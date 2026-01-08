---
title: Azure Tile Maps
page_title: jQuery Map Documentation - Azure Tile Maps
description: "Learn how to integrate Azure Maps tile services with the Kendo UI Map by proxying map tiles through an ASP.NET Core backend."
components: ["map"]
slug: azure-tiles
position: 4
---

# Azure Tile Maps

The Kendo UI Map supports tile layers, which allow you to visualize map imagery provided by external services.
This article demonstrates how to integrate Azure Maps as a tile source by proxying tile requests through an ASP.NET Core backend.

Using a server-side proxy is recommended because Azure Maps requires a subscription key, which should not be exposed on the client.

## Overview

The integration consists of the following steps:

1. Configure the Azure Maps subscription key
2. Create a controller action to proxy tile requests
3. Configure the Kendo UI Map tile layer

## Configuring the Azure Maps Subscription Key

Store your Azure Maps subscription key in the application configuration.

```appsettings.json
    {
      "AzureMaps": {
        "SubscriptionKey": "${SUBSCRIPTION_KEY}"
      }
    }
```

This allows the key to be injected securely through the configuration system without exposing it to the client.

## Proxying Azure Maps Tiles

Create a controller action that receives tile coordinates from the Kendo UI Map and forwards the request to the Azure Maps Tile API.

```C#
    public class MapController : Controller
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
    }
```

The controller acts as a proxy, retrieving tiles from Azure Maps and returning them as PNG images to the client.

## Configuring the Map Tile Layer

Use the tile layer type and point the urlTemplate to the proxy controller action.

```dojo
    <div id="map"></div>

    <script>
        function createMap() {
            $("#map").kendoMap({
                center: [51.505, -0.09],
                zoom: 3,
                layers: [{
                    type: "tile",
                    urlTemplate: "/Map/AzureTile?zoom=#=zoom#&x=#=x#&y=#=y#",
                    attribution: "© Microsoft Azure Maps"
                }]
            });
        }

        $(document).ready(createMap);
    </script>
```    

The urlTemplate placeholders (zoom, x, y) are automatically populated by the Map component when requesting tiles.

## See Also

* [Azure Tile Map(Demo)](https://demos.telerik.com/kendo-ui/map/azure)
* [JavaScript API Reference of the Map](/api/javascript/dataviz/ui/map)
