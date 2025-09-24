---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI Map component for {{ site.framework }}."
slug: events_map_aspnetcore
position: 4
---

# Events

You can subscribe to the following [Map events](/api/kendo.mvc.ui.fluent/mapeventbuilder) and further customize the functionality of the component:

* `BeforeReset`&mdash;Fired immediately before the map is reset. This event is used for cleanup by layer implementer.
* `Click`&mdash;Fired when the user clicks on the map.
* `MarkerActivate`&mdash;Fired when a marker has been displayed and has a DOM element assigned.
* `MarkerCreated`&mdash;Fired when a marker has been created and is about to be displayed. 
* `MarkerClick`&mdash;Fired when a marker has been clicked or tapped.
* `Pan`&mdash;Fired while the map viewport is being moved.
* `PanEnd`&mdash;Fires after the map viewport has been moved.
* `Reset`&mdash;Fired when the map is reset. This occurs on initial load and after a zoom/center change.
* `ShapeClick`&mdash;Fired when a shape is clicked or tapped.
* `ShapeCreated`&mdash;Fired when a shape is created, but is not rendered yet.
* `ShapeFeatureCreated`&mdash;Fired when a GeoJSON Feature is created on a shape layer.
* `ShapeMouseEnter`&mdash;Fired when the mouse enters a shape.
* `ShapeMouseLeave`&mdash;Fired when the mouse leaves a shape.
* `ZoomStart`&mdash;Fired when the map zoom level is about to change.
* `ZoomEnd`&mdash;Fired when the map zoom level has changed.


## Handling Events by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```HtmlHelper
    @(Html.Kendo().Map()
          .Name("map")
          .HtmlAttributes(new { style = "height: 300px;" })
          .Center(39.6924, -97.3370)
          .Zoom(4)
          .Layers(layers =>
          {
              layers.Add()
                  .Style(style => style
                      .Fill(fill => fill.Color("#b3cde3"))
                      .Stroke(stroke => stroke.Color("#cceebc5"))
                  )
                  .Type(MapLayerType.Shape)
                  .DataSource(dataSource => dataSource
                      .GeoJson()
                      .Read(read => read.Url(Url.Content("~/shared/dataviz/map/us.geo.json")))
                  );
          })
          .Events(events => events
              .Click("onClick")
              .Reset("onReset")
              .Pan("onPan")
              .PanEnd("onPanEnd")
              .ShapeClick("onShapeClick")
              .ShapeCreated("onShapeCreated")
              .ShapeFeatureCreated("onShapeFeatureCreated")
              .ShapeMouseEnter("onShapeMouseEnter")
              .ShapeMouseLeave("onShapeMouseLeave")
              .ZoomStart("onZoomStart")
              .ZoomEnd("onZoomEnd")
          )
    )
    
    <script>
            function onClick(e) {
                kendoConsole.log("Click at ...");
            }
    
            function onReset(e) {
                kendoConsole.log("Reset");
            }
    
            function onPan(e) {
                kendoConsole.log("Pan");
            }
    
            function onPanEnd(e) {
                kendoConsole.log("Pan end");
            }
    
            function onShapeClick(e) {
                kendoConsole.log(kendo.format(
                    "Shape click :: {0}", e.shape.dataItem.properties.name
                ));
            }
    
            function onShapeCreated(e) {
                kendoConsole.log(kendo.format(
                    "Shape created :: {0}", e.shape.dataItem.properties.name
                ));
            }
    
            function onShapeFeatureCreated(e) {
                kendoConsole.log(kendo.format(
                    "Feature created :: {0} with {1} child shape(s)",
                    e.properties.name,
                    e.group.children.length
                ));
            }
    
            function onShapeMouseEnter(e) {
                kendoConsole.log(kendo.format(
                    "Shape mouseEnter :: {0}", e.shape.dataItem.properties.name
                ));
            }
    
            function onShapeMouseLeave(e) {
                kendoConsole.log(kendo.format(
                    "Shape mouseLeave :: {0}", e.shape.dataItem.properties.name
                ));
            }
    
            function onZoomStart(e) {
                kendoConsole.log("Zoom start");
            }
    
            function onZoomEnd(e) {
                kendoConsole.log("Zoom end");
            }
        </script>

```
{% if site.core %}
```TagHelper
    <kendo-map name="map" center="coordinates"
                      style="height:300px"
                      zoom="4"
                      on-click="onClick"
                      on-reset="onReset"
                      on-pan="onPan"
                      on-pan-end="onPanEnd"
                      on-shape-click="onShapeClick"
                      on-shape-created="onShapeCreated"
                      on-shape-feature-created="onShapeFeatureCreated"
                      on-shape-mouse-enter="onShapeMouseEnter"
                      on-shape-mouse-leave="onShapeMouseLeave"
                      on-zoom-start="onZoomStart"
                      on-zoom-end="onZoomEnd">
    <layers>
        <layer type="MapLayerType.Shape">
            <map-style>
                <fill color="#b3cde3" />
                <stroke color="#cceebc5" />
            </map-style>
            <datasource custom-type="geojson">
                <transport>
                    <read url="@Url.Content("~/shared/dataviz/map/us.geo.json")" />
                </transport>
            </datasource>
        </layer>
    </layers>
</kendo-map>

<script>
        function onClick(e) {
            kendoConsole.log("Click at ...");
        }

        function onReset(e) {
            kendoConsole.log("Reset");
        }

        function onPan(e) {
            kendoConsole.log("Pan");
        }

        function onPanEnd(e) {
            kendoConsole.log("Pan end");
        }

        function onShapeClick(e) {
            kendoConsole.log(kendo.format(
                "Shape click :: {0}", e.shape.dataItem.properties.name
            ));
        }

        function onShapeCreated(e) {
            kendoConsole.log(kendo.format(
                "Shape created :: {0}", e.shape.dataItem.properties.name
            ));
        }

        function onShapeFeatureCreated(e) {
            kendoConsole.log(kendo.format(
                "Feature created :: {0} with {1} child shape(s)",
                e.properties.name,
                e.group.children.length
            ));
        }

        function onShapeMouseEnter(e) {
            kendoConsole.log(kendo.format(
                "Shape mouseEnter :: {0}", e.shape.dataItem.properties.name
            ));
        }

        function onShapeMouseLeave(e) {
            kendoConsole.log(kendo.format(
                "Shape mouseLeave :: {0}", e.shape.dataItem.properties.name
            ));
        }

        function onZoomStart(e) {
            kendoConsole.log("Zoom start");
        }

        function onZoomEnd(e) {
            kendoConsole.log("Zoom end");
        }
    </script>
```
{% endif %}

## Handling Events by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```HtmlHelper

    @(Html.Kendo().Map()
      .Name("map")
      .HtmlAttributes(new { style = "height: 300px;" })
      .Center(39.6924, -97.3370)
      .Zoom(4)
      .Layers(layers =>
      {
          layers.Add()
              .Style(style => style
                  .Fill(fill => fill.Color("#b3cde3"))
                  .Stroke(stroke => stroke.Color("#cceebc5"))
              )
              .Type(MapLayerType.Shape)
              .DataSource(dataSource => dataSource
                  .GeoJson()
                  .Read(read => read.Url(Url.Content("~/shared/dataviz/map/us.geo.json")))
              );
      })
      .Events(events => events
          .Click(@<text>
             function(){
                 // Handle the click event inline.
             }
            </text>)
          .Reset(@<text>
             function(){
                 // Handle the reset event inline.
             }
            </text>)
          .Pan("@<text>
             function(){
                 // Handle the pan event inline.
             }
            </text>")
          .PanEnd(@<text>
             function(){
                 // Handle the panEnd event inline.
             }
            </text>)
          .ShapeClick(@<text>
             function(){
                 // Handle the shapeClick event inline.
             }
            </text>)
          .ShapeCreated(@<text>
             function(){
                 // Handle the shapeCreated event inline.
             }
            </text>)
          .ShapeFeatureCreated(@<text>
             function(){
                 // Handle the shapeFeatureCreated event inline.
             }
            </text>)
          .ShapeMouseEnter(@<text>
             function(){
                 // Handle the shapeMouseEnter event inline.
             }
            </text>)
          .ShapeMouseLeave(@<text>
             function(){
                 // Handle the shapeMouseLeave event inline.
             }
            </text>)
          .ZoomStart(@<text>
             function(){
                 // Handle the zoomStart event inline.
             }
            </text>)
          .ZoomEnd(@<text>
             function(){
                 // Handle the zoomEnd event inline.
             }
            </text>)
      )
)
```
{% if site.core %}
```TagHelper

    <kendo-map name="map" center="coordinates"
                      style="height:300px"
                      zoom="4"
                      on-click="
                            function(){
                                // Handle the click event inline.
                            }"
                      on-reset="                            
                            function(){
                                // Handle the reset event inline.
                            }"
                      on-pan="                            
                            function(){
                                // Handle the pan event inline.
                            }"
                      on-pan-end="                            
                            function(){
                                // Handle the panEnd event inline.
                            }"
                      on-shape-click="                            
                            function(){
                                // Handle the shapeClick event inline.
                            }"
                      on-shape-created="                            
                            function(){
                                // Handle the shapeCreated event inline.
                            }"
                      on-shape-feature-created="                            
                            function(){
                                // Handle the shapeFeatureCreated event inline.
                            }"
                      on-shape-mouse-enter="                            
                            function(){
                                // Handle the shapeMouseEnter event inline.
                            }"
                      on-shape-mouse-leave="                            
                            function(){
                                // Handle the shapeMouseLeave event inline.
                            }"
                      on-zoom-start="                            
                            function(){
                                // Handle the zoomStart event inline.
                            }"
                      on-zoom-end="                            
                            function(){
                                // Handle the zoomEnd event inline.
                            }">
        <layers>
            <layer type="MapLayerType.Shape">
                <map-style>
                    <fill color="#b3cde3" />
                    <stroke color="#cceebc5" />
                </map-style>
                <datasource custom-type="geojson">
                    <transport>
                        <read url="@Url.Content("~/shared/dataviz/map/us.geo.json")" />
                    </transport>
                </datasource>
            </layer>
        </layers>
    </kendo-map>
```
{% endif %}

## See Also

* [Using the API of the Map for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/map/api)
* [Map Server-Side API](/api/map)
* [Map Client-Side API](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/dataviz/ui/map)