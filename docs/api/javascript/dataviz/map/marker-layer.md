---
title: MarkerLayer
page_title: API reference for Kendo UI Map Layer
---

# kendo.dataviz.map.MarkerLayer : kendo.dataviz.map.Layer
Represents a data-bound marker layer.

## Constructor Parameters

### map `kendo.dataviz.ui.Map`
The owner Map widget.

### options `Object`
The layer options.

## Fields

### map `kendo.dataviz.ui.Map`
The owner Map widget.

### items `Array`
An array of the markers currently loaded in this layer.

## Methods

### add
Adds a Marker to the layer.

#### Parameters

##### marker `kendo.dataviz.map.Marker`
The Marker instance to add.

### clear
Clears all Markers from the layer.

### hide
Hides the layer, if visible.

### remove
Removes a Marker from the layer.

#### Parameters

##### marker `kendo.dataviz.map.Marker`
The Marker instance to remove.

### setDataSource
Sets the data source of this layer.

#### Example - Set shape layer data source
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "marker",
                dataSource: ds,
                locationField: "latlng"
            }]
        });

        var ds = new kendo.data.DataSource({
            data: [{
                latlng: [0, 0]
            }]
        });

        var map = $("#map").data("kendoMap");
        var layer = map.layers[0];
        layer.setDataSource(ds);
    </script>

#### Parameters

##### dataSource `Object`
A live [DataSource](/api/javascript/data/datasource) instance
or its [configuration](/api/javascript/data/datasource#configuration) object.

### show
Shows the layer, if not visible.

