---
title: Layer
page_title: API reference for Kendo UI Map Layer
previous_url: /api/javascript/dataviz/map/layer/shape
res_type: api
---

# kendo.dataviz.map.Layer : kendo.Class

Represents an individual map layer.

## Constructor Parameters

### map `kendo.dataviz.ui.Map`
The owner Map widget.

#### Example - add a layer to an existing map instance

    <button class="k-button k-button-lg k-button-solid-primary" id="add">Add Layer</button>
    <div id="map"></div>
    <script>
      $("#add").on("click", function() {
        let map = $("#map").data("kendoMap"),
            layerOptions = {
            urlTemplate: "https://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
            subdomains: ["a", "b", "c"],
            attribution: "&copy; <a href='https://osm.org/copyright'>OpenStreetMap contributors</a>"
            };

        let layer = new kendo.dataviz.map.layers.TileLayer(map, layerOptions);
        map.layers.push(layer);
        layer.show();
      });

      function createMap() {
        $("#map").kendoMap({
          center: [45, 45],
          minZoom: 3,
          zoom: 4,
          wraparound: false
        });
      }

      $(document).ready(createMap);
    </script>

### options `Object`
The layer [`options`](/api/javascript/dataviz/ui/map/configuration/layers#related-properties).

#### Example - add a layer to an existing map instance

    <button class="k-button k-button-lg k-button-solid-primary" id="add">Add Layer</button>
    <div id="map"></div>
    <script>
      $("#add").on("click", function() {
        let map = $("#map").data("kendoMap"),
            layerOptions = {
            urlTemplate: "https://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
            subdomains: ["a", "b", "c"],
            attribution: "&copy; <a href='https://osm.org/copyright'>OpenStreetMap contributors</a>"
            };

        let layer = new kendo.dataviz.map.layers.TileLayer(map, layerOptions);
        map.layers.push(layer);
        layer.show();
      });

      function createMap() {
        $("#map").kendoMap({
          center: [45, 45],
          minZoom: 3,
          zoom: 4,
          wraparound: false
        });
      }

      $(document).ready(createMap);
    </script>

## Fields

### map `kendo.dataviz.ui.Map`
The owner Map widget.

## Methods

### show
Shows the layer, if not visible.

    <button class="k-button k-button-lg k-button-solid-primary" id="show">Show Layer</button>
    <div id="map"></div>
    <script>
      $("#show").on("click", function() {
        let map = $("#map").data("kendoMap");
        let layer = map.layers[0];

        // Show the first layer of the map
        layer.show();
      });

      function createMap() {
        $("#map").kendoMap({
          center: [45, 45],
          minZoom: 3,
          zoom: 4,
          wraparound: false,
          layers: [
            {
              type: "tile",
              urlTemplate: "https://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
              subdomains: ["a", "b", "c"],
              attribution: "&copy; <a href='https://osm.org/copyright'>OpenStreetMap contributors</a>"
            }
          ]
        });
        
        // Hide the first layer by default.
        $("#map").data("kendoMap").layers[0].hide();
      }

      $(document).ready(createMap);
    </script>

### hide
Hides the layer, if visible.

    <button class="k-button k-button-lg k-button-solid-primary" id="hide">Hide Layer</button>
    <div id="map"></div>
    <script>
      $("#hide").on("click", function() {
        let map = $("#map").data("kendoMap");
        let layer = map.layers[0];

        // Hide the first layer of the map
        layer.hide();
      });

      function createMap() {
        $("#map").kendoMap({
          center: [45, 45],
          minZoom: 3,
          zoom: 4,
          wraparound: false,
          layers: [
            {
              type: "tile",
              urlTemplate: "https://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
              subdomains: ["a", "b", "c"],
              attribution: "&copy; <a href='https://osm.org/copyright'>OpenStreetMap contributors</a>"
            }
          ]
        });
      }

      $(document).ready(createMap);
    </script>
