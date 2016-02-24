---
title: Map Authoring
page_title: Map Authoring | Kendo UI Map
description: "Learn how to process and transform maps from external sources so they can be used with the Kendo UI Map widget."
slug: mapauthoring_mapwidget
position: 3
---

# Map Authoring

This article illustrates the process of creating a map from scratch and by using freely available datasets. The goal of this tutorial is a map of the Australian states and mainland territories.

**Figure 1. The expected outlook of a finished map**

![Finished map](/controls/diagrams-and-maps/map/images/map-au.png)

## Steps

### Find Data

The first step is to locate a map dataset that matches your requirements. The [U.S. Census Bureau](http://www.census.gov) and [Ordnance Survey](http://www.ordnancesurvey.co.uk/) are popular official sources for map data.

The data used in this article is from the [Natural Earth project](http://www.naturalearthdata.com/). Natural Earth datasets are in the public domain. The project is supported by [NACIS](http://nacis.org/). It offers different data themes in three levels of detail - 1:10m, 1:50m and 1:110m.

For the purpose of this project, the [Admin 1 – States, provinces](http://www.naturalearthdata.com/downloads/50m-cultural-vectors) data set is going to be used. A scale of 1:50 000 000 provides good detail/size balance on a country level. The dataset is available for download in [Esri Shapefile format](http://www.naturalearthdata.com/http//www.naturalearthdata.com/download/50m/cultural/ne_50m_admin_1_states_provinces_lakes.zip).

### Explore Data

A traditional [desktop geographic information system (GIS)](https://en.wikipedia.org/wiki/Geographic_information_system) application can be invaluable for exploring new datasets. The open-source [QGIS](http://www.qgis.org/en/site/) project is an excellent choice in this regard.

Start by [importing the Esri Shapefile](http://www.qgis.org/en/docs/user_manual/working_with_vector/supported_data.html#esri-shapefiles) for the data set. With the help of the [Identify tool](http://www.qgis.org/en/docs/user_manual/introduction/general_tools.html#identify) you can quickly inspect the available metadata.

**Figure 2. Identifying of the results**

![Identify results](/controls/diagrams-and-maps/map/images/map-qgis-identify.png)

You are also able to narrow down your interest to features with the "AU" [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code.

### Process Data

You need to extract the data for the target region and convert it to GeoJSON format to make it usable for the Kendo UI Map widget.

When it comes to converting between different vector formats the first project that comes to mind is the [OGR Library and utilities](http://www.gdal.org/ogr/index.html), part of the [Geospatial Data Abstraction Library](http://www.gdal.org/). The [ogr2ogr](http://www.gdal.org/ogr2ogr.html) command-line tool is also included in it.

> **Important**
>
> [Mapshaper](http://www.mapshaper.org/) is also a great tool that allows you to do many edits directly in the browser. Make sure you check it out.

The example below demonstrates the command that converts the dataset to GeoJSON and filters it out.

###### Example

    ogr2ogr -f GeoJSON -where "iso_a2 = 'AU'" au-states.json ne_50m_admin_1_states_provinces_lakes.shp

Your dataset is now ready and you can display it.

### Load Data

Set up a simple Kendo UI Map and add a single shape layer to it, as demonstrated in the example below. Its GeoJSON data source will point to your processed dataset.

> **Important**
>
> Make sure the GeoJSON files are properly encoded, preferably in UTF-8.

###### Example

    <div id="map" style="width: 600px; height: 600px;"></div>
    <script>
    $("#map").kendoMap({
        center: [-28.0000, 136.2500],
        zoom: 4,
        layers: [{
            type: "shape",
            dataSource: {
                type: "geojson",
                transport: {
                    read: "./au-states.json"
                }
            }
        }]
    });
    </script>

![Unstyled map](/controls/diagrams-and-maps/map/images/map-au-base.png)

### Add Styles

The example below demonstrates how to define a palette and apply it based on province.

###### Example

    <div id="map" style="width: 600px; height: 600px;"></div>
    <script>
    var colors = ["#E96D63", "#7FCA9F", "#F4BA70", "#85C1F5", "#4A789C", "#13A1CB", "#728CB0", "#C296B6"];

    $("#map").kendoMap({
        center: [-28.0000, 136.2500],
        zoom: 4,
        layers: [{
            type: "shape",
            dataSource: {
                type: "geojson",
                transport: {
                    read: "./au-states.json"
                }
            }
        }],
        shapeCreated: function(e) {
            var provNum = e.shape.dataItem.properties["provnum_ne"];
            if (provNum) {
                e.shape.fill(colors[provNum % colors.length]);
            }
        }
    });
    </script>

The `provnum_ne` field goes from 1 to 9 denoting each mainland state and territory. This project uses the [`shapeCreated`](/api/dataviz/map#events-shapeCreated) event to set the fill color of the newly created shape.

## See Also

Other articles on Kendo UI Map:

* [Overview of the Map Widget]({% slug overview_kendoui_mapwidget %})
* [Map Layers]({% slug maplayers_mapwidget %})
* [Map JavaScript API Reference](/api/javascript/dataviz/ui/map)
