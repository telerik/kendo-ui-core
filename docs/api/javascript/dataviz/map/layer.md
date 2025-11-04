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


<div class="meta-api-description">
How do I link a layer to its parent map in Kendo UI for jQuery? Configure the initial mapping relationship by specifying the parent map when creating a layer, enabling the layer to bind to its containing map component for proper rendering, event handling, spatial context, and coordinate system association. This setting controls which map instance the layer belongs to at construction time, supporting scenarios like linking layers to maps for display updates, interaction management, or geographic alignment, and is essential for establishing the ownership or hierarchy between map and layer objects in mapping applications.
</div>

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


<div class="meta-api-description">
How do I customize the display of data on a map layer in Kendo UI using Layer.options? Configure and customize a map layer at creation by setting initialization parameters that control source data, visual style, attribution details, rendering options, and other layer-specific behaviors; this includes defining how the layer loads and displays content on the map, setting styling rules, managing data sources, enabling or adjusting interactivity, and specifying metadata or attribution information during layer setup.
</div>

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


<div class="meta-api-description">
How do I access the parent map object in Kendo UI for jQuery? Retrieve or access the parent map object associated with a specific map layer to interact with the main map component, enabling developers to invoke map functions, query or monitor current map state, bind event listeners for user interactions, synchronize layer actions with map updates, and manage the connection between individual layers and the overall map instance once initialized and ready.
</div>

#### Example

    <div id="map"></div>
    <script>
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
        
        // Access the owner Map widget from the layer
        let map = $("#map").data("kendoMap");
        let layer = map.layers[0];
        console.log("Owner map widget:", layer.map);
      }

      $(document).ready(createMap);
    </script>

## Methods

### show
Shows the layer, if not visible.


<div class="meta-api-description">
How do I dynamically show or hide specific layers on a Kendo UI map? Control layer visibility by enabling or activating hidden map layers dynamically through code, toggling layers to appear on the map interface when needed, revealing specific data overlays, turning on layers during user interactions, conditionally displaying map features based on runtime conditions, making invisible layers visible for updates or events, showing layers programmatically without affecting already visible ones, configuring map visuals by setting layers to display on demand, and managing real-time visibility states for geographic data layers to reflect current user needs or application logic.
</div>

#### Example

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


<div class="meta-api-description">
How can I programmatically hide a map layer in Kendo UI for jQuery? Control, toggle, or change the visibility of map layers programmatically by hiding layers that are currently visible without removing or destroying them; dynamically disable rendering or interaction on specific layers, temporarily conceal map data, show or hide layers based on user actions or conditions, manage layer display states on demand, enable or disable layer visibility in real-time, and update map visuals by hiding selected layers while preserving their state for later reactivation.
</div>

#### Example

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
