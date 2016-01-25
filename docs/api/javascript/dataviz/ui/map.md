---
title: Map
page_title: Configuration, methods and events of Kendo UI DataViz Map
description: Learn how to configure Kendo UI Javascript chart widget in a few easy steps, use and change methods and events.
---

# kendo.dataviz.ui.Map

## Fields

### layers `Array`
The [Map layers](/api/javascript/dataviz/map/layer) ordered by index.

## Configuration

### center `Array|kendo.dataviz.map.Location`

The map center. Coordinates are listed as `[Latitude, Longitude]`.

#### Example - setting the map center
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            center: [30.268107, -97.744821],
            zoom: 3,
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });
    </script>

### controls `Object`

The configuration of built-in map controls.

#### Example - hide all controls
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            controls: {
                attribution: false,
                navigator: false
            },
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });
    </script>

### controls.attribution `Boolean|Object` *(default: true)*

Configures or disables the built-in attribution control.

#### Example - hide the attribution control
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            controls: {
                attribution: false
            },
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });
    </script>

### controls.attribution.position `String` *(default: "bottomRight")*

The position of the attribution control. Possible values include:

* "topLeft"
* "topRight"
* "bottomRight"
* "bottomLeft"

#### Example - position the attribution control
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            controls: {
                attribution: {
                    position: "topRight"
                }
            },
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });
    </script>

### controls.navigator `Boolean|Object` *(default: true)*

Configures or disables the built-in navigator control (directional pad).

#### Example - hide the navigator control
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            controls: {
                navigator: false
            },
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });
    </script>

### controls.navigator.position `String` *(default: "topLeft")*

The position of the navigator control. Possible values include:

* "topLeft"
* "topRight"
* "bottomRight"
* "bottomLeft"

#### Example - position the navigator control
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            controls: {
                navigator: {
                    position: "topRight"
                }
            },
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });
    </script>

### controls.zoom `Boolean|Object` *(default: true)*

Configures or disables the built-in zoom control (+/- button).

#### Example - hide the zoom control
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            controls: {
                zoom: false
            },
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });
    </script>

### controls.zoom.position `String` *(default: "topLeft")*

The position of the zoom control. Possible values include:

* "topLeft"
* "topRight"
* "bottomRight"
* "bottomLeft"

#### Example - position the zoom control
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            controls: {
                zoom: {
                    position: "topRight"
                }
            },
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });
    </script>

### layerDefaults `Object`

The default configuration for map layers by type.

#### Example - set tile layer defaults
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layerDefaults: {
                tile: {
                    opacity: 0.5
                }
            },
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });
    </script>

### layerDefaults.marker `Object`

The default configuration for marker layers.

#### Example - setting default marker shape
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layerDefaults: {
                marker: {
                    shape: "pin"
                }
            },
            layers: [{
                type: "marker",

                locationField: "latlng",
                dataSource: {
                    data: [{
                        latlng: [0, 0]
                    }]
                }
            }]
        });
    </script>

### layerDefaults.marker.shape `String` *(default: "pinTarget")*

The default marker shape for all marker layers. The following pre-defined marker shapes are available:

* pinTarget
* pin

Marker shapes are implemented as CSS classes on the marker element (span.k-marker).
For example "pinTarget" is rendered as "k-marker-pin-target".

#### Example - setting default marker shape
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layerDefaults: {
                marker: {
                    shape: "pin"
                }
            },
            layers: [{
                type: "marker",

                locationField: "latlng",
                dataSource: {
                    data: [{
                        latlng: [0, 0]
                    }]
                }
            }]
        });
    </script>

### layerDefaults.marker.tooltip `Object`

The default Kendo UI Tooltip options for all marker layers.

### layerDefaults.marker.tooltip.autoHide `Boolean`*(default: true)*

Specifies if the tooltip will be hidden when mouse leaves the target element. If set to false a close button will be shown within tooltip. If set to false, showAfter is specified and the showOn is set to "mouseenter" the Tooltip will be displayed after the given timeout even if the element is no longer hovered.

#### Example - hide tooltip on mouse leave
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layerDefaults: {
                marker: {
                    tooltip: {
                        autoHide: true,
                        content: "Foo"
                    }
                }
            },
            layers: [{
                type: "marker",

                locationField: "latlng",
                dataSource: {
                    data: [{
                        latlng: [0, 0]
                    }]
                }
            }]
        });
    </script>

### layerDefaults.marker.tooltip.animation `Object`

A collection of {Animation} objects, used to change default animations. A value of **false**
will disable all animations in the widget.

#### Example - disable animations
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layerDefaults: {
                marker: {
                    tooltip: {
                        animation: false,
                        content: "Foo"
                    }
                }
            },
            layers: [{
                type: "marker",

                locationField: "latlng",
                dataSource: {
                    data: [{
                        latlng: [0, 0]
                    }]
                }
            }]
        });
    </script>

### layerDefaults.marker.tooltip.animation.close `Object`

The animation that will be used when a Tooltip closes.

#### Example - set close animation
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layerDefaults: {
                marker: {
                    tooltip: {
                        animation: {
                          close: {
                            effects: "fade:out"
                          }
                        },
                        content: "Foo"
                    }
                }
            },
            layers: [{
                type: "marker",

                locationField: "latlng",
                dataSource: {
                    data: [{
                        latlng: [0, 0]
                    }]
                }
            }]
        });
    </script>

### layerDefaults.marker.tooltip.animation.close.effects `String`

Effect to be used for closing of the tooltip.

#### Example - set close animation effect
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layerDefaults: {
                marker: {
                    tooltip: {
                        animation: {
                            close: {
                                effects: "fade:out"
                            }
                        },
                        content: "Foo"
                    }
                }
            },
            layers: [{
                type: "marker",

                locationField: "latlng",
                dataSource: {
                    data: [{
                        latlng: [0, 0]
                    }]
                }
            }]
        });
    </script>

### layerDefaults.marker.tooltip.animation.close.duration `Number`

Defines the animation duration.

#### Example - set close animation duration
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layerDefaults: {
                marker: {
                    tooltip: {
                        animation: {
                            close: {
                                duration: 1000
                            }
                        },
                        content: "Foo"
                    }
                }
            },
            layers: [{
                type: "marker",

                locationField: "latlng",
                dataSource: {
                    data: [{
                        latlng: [0, 0]
                    }]
                }
            }]
        });
    </script>

### layerDefaults.marker.tooltip.animation.open `Object`

The animation that will be used when a Tooltip opens.

#### Example - set open animation
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layerDefaults: {
                marker: {
                    tooltip: {
                        animation: {
                            open: {
                                effects: "fade:in",
                                duration: 1000
                            }
                        },
                        content: "Foo"
                    }
                }
            },
            layers: [{
                type: "marker",

                locationField: "latlng",
                dataSource: {
                    data: [{
                        latlng: [0, 0]
                    }]
                }
            }]
        });
    </script>

### layerDefaults.marker.tooltip.animation.open.effects `String`

Effect to be used for opening of the Tooltip.

#### Example - set open animation effect
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layerDefaults: {
                marker: {
                    tooltip: {
                        animation: {
                            open: {
                                effects: "fade:in"
                            }
                        },
                        content: "Foo"
                    }
                }
            },
            layers: [{
                type: "marker",

                locationField: "latlng",
                dataSource: {
                    data: [{
                        latlng: [0, 0]
                    }]
                }
            }]
        });
    </script>

### layerDefaults.marker.tooltip.animation.open.duration `Number`

Defines the animation duration.

#### Example - set open animation duration
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layerDefaults: {
                marker: {
                    tooltip: {
                        animation: {
                            open: {
                                duration: "1000"
                            }
                        },
                        content: "Foo"
                    }
                }
            },
            layers: [{
                type: "marker",

                locationField: "latlng",
                dataSource: {
                    data: [{
                        latlng: [0, 0]
                    }]
                }
            }]
        });
    </script>

### layerDefaults.marker.tooltip.content `Object|String|Function`

The text or a function which result will be shown within the tooltip.
By default the tooltip will display the target element title attribute content.

#### Example - extract the content from target marker
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layerDefaults: {
                marker: {
                    tooltip: {
                        content: function(e) {
                            var marker = e.sender.marker;
                            return marker.options.location.toString();
                        }
                    }
                }
            },
            layers: [{
                type: "marker",

                locationField: "latlng",
                dataSource: {
                    data: [{
                        latlng: [0, 0]
                    }]
                }
            }]
        });
    </script>

#### Example - content as static text
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layerDefaults: {
                marker: {
                    tooltip: {
                        content: "Foo"
                    }
                }
            },
            layers: [{
                type: "marker",

                locationField: "latlng",
                dataSource: {
                    data: [{
                        latlng: [0, 0]
                    }]
                }
            }]
        });
    </script>

### layerDefaults.marker.tooltip.content.url `String`

Specifies a URL or request options that the tooltip should load its content from.

>Note: For URLs starting with a protocol (e.g. http://),
a container iframe element is automatically created. This behavior may change in future
versions, so it is advisable to always use the [iframe configuration option](#iframe).

#### Example - load content from remote URL
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layerDefaults: {
                marker: {
                    tooltip: {
                          content: {
                            url: "http://demos.telerik.com/kendo-ui/content/web/tooltip/ajax/ajaxContent3.html"
                          },
                          width: 220,
                          height: 280
                    }
                }
            },
            layers: [{
                type: "marker",

                locationField: "latlng",
                dataSource: {
                    data: [{
                        latlng: [0, 0]
                    }]
                }
            }]
        });
    </script>

### layerDefaults.marker.tooltip.template `String|Template`

The [template](/api/framework/kendo#methods-template) which renders the tooltip content.

The fields which can be used in the template are:

* location - the marker location (`kendo.dataviz.map.Location` instance)
* marker - the marker instance

> Setting a template disables the content option.

#### Example - set tooltip template
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layerDefaults: {
                marker: {
                    tooltip: {
                        template: "Lon:#= location.lng #, Lat:#= location.lat #"
                    }
                }
            },
            layers: [{
                type: "marker",
                locationField: "latlng",
                dataSource: {
                    data: [{
                        latlng: [0, 0]
                    }]
                }
            }]
        });
    </script>

#### Example - use formatted dataItem value in the tooltip template
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "marker",
                tooltip: {
                    template: "#= kendo.toString(marker.dataItem.value, 'C') #"
                },
                dataSource: {
                    data: [{
                        latlng: [0, 0],
                        value: 1000
                    }]
                },
                locationField: "latlng"
            }]
        });
    </script>

### layerDefaults.marker.tooltip.callout `Boolean`*(default:true)*

Specifies if the tooltip callout will be displayed.

#### Example - hide the tooltip callout
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layerDefaults: {
                marker: {
                    tooltip: {
                        callout: false,
                        template: "Lon:#= location.lng #, Lat:#= location.lat #"
                    }
                }
            },
            layers: [{
                type: "marker",

                locationField: "latlng",
                dataSource: {
                    data: [{
                        latlng: [0, 0]
                    }]
                }
            }]
        });
    </script>

### layerDefaults.marker.tooltip.iframe `Boolean`

Explicitly states whether content iframe should be created.

#### Example - load content from remote URL
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layerDefaults: {
                marker: {
                    tooltip: {
                          iframe: true,
                          content: {
                            url: "http://demos.telerik.com/kendo-ui/content/web/tooltip/ajax/ajaxContent3.html"
                          },
                          width: 220,
                          height: 280
                    }
                }
            },
            layers: [{
                type: "marker",

                locationField: "latlng",
                dataSource: {
                    data: [{
                        latlng: [0, 0]
                    }]
                }
            }]
        });
    </script>

### layerDefaults.marker.tooltip.height `Number`*(default: Infinity)*

The height (in pixels) of the tooltip.

#### Example - set the height of the tooltip
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layerDefaults: {
                marker: {
                    tooltip: {
                        height: 80,
                        content: "Foo"
                    }
                }
            },
            layers: [{
                type: "marker",

                locationField: "latlng",
                dataSource: {
                    data: [{
                        latlng: [0, 0]
                    }]
                }
            }]
        });
    </script>

### layerDefaults.marker.tooltip.width `Number`*(default: Infinity)*

The width (in pixels) of the tooltip.

#### Example - set the width of the tooltip
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layerDefaults: {
                marker: {
                    tooltip: {
                        width: 80,
                        content: "Foo"
                    }
                }
            },
            layers: [{
                type: "marker",

                locationField: "latlng",
                dataSource: {
                    data: [{
                        latlng: [0, 0]
                    }]
                }
            }]
        });
    </script>

### layerDefaults.marker.tooltip.position `String`*(default: "top")*

The position relative to the target element, at which the tooltip will be shown. Predefined values are "bottom", "top", "left", "right", "center".

#### Example - set tooltip position
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layerDefaults: {
                marker: {
                    tooltip: {
                        position: "left",
                        content: "Foo"
                    }
                }
            },
            layers: [{
                type: "marker",

                locationField: "latlng",
                dataSource: {
                    data: [{
                        latlng: [0, 0]
                    }]
                }
            }]
        });
    </script>

### layerDefaults.marker.tooltip.showAfter `Number`*(default: 100)*

Specify the delay in milliseconds before the tooltip is shown. This option is ignored if showOn is set to "click" or "focus".

#### Example - set show delay
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layerDefaults: {
                marker: {
                    tooltip: {
                        showOn: "mouseenter",
                        showAfter: 1000,
                        content: "Foo"
                    }
                }
            },
            layers: [{
                type: "marker",

                locationField: "latlng",
                dataSource: {
                    data: [{
                        latlng: [0, 0]
                    }]
                }
            }]
        });
    </script>

### layerDefaults.marker.tooltip.showOn `String`*(default: "mouseenter")*

The event on which the tooltip will be shown. Predefined values are "mouseenter", "click" and "focus".

#### Example - show tooltip on mouse enter
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layerDefaults: {
                marker: {
                    tooltip: {
                        showOn: "mouseenter",
                        content: "Foo"
                    }
                }
            },
            layers: [{
                type: "marker",

                locationField: "latlng",
                dataSource: {
                    data: [{
                        latlng: [0, 0]
                    }]
                }
            }]
        });
    </script>

### layerDefaults.marker.opacity `Number` *(default: 1)*

The the opacity of all marker layers.

#### Example - set marker layer default opacity
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layerDefaults: {
                marker: {
                    opacity: 0.5
                }
            },
            layers: [{
                type: "marker",

                locationField: "latlng",
                dataSource: {
                    data: [{
                        latlng: [0, 0]
                    }]
                }
            }]
        });
    </script>

### layerDefaults.shape `Object`

The default configuration for shape layers.

#### Example
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layerDefaults: {
                shape: {
                    attribution: "&copy; Company Inc."
                }
            },
            layers: [{
                type: "shape",
                dataSource: {
                    type: "geojson",
                    data: [{
                        "type": "Polygon",
                        "coordinates": [
                            [[30, 10], [40, 40], [20, 40], [10, 20], [30, 10]]
                        ]
                    }]
                }
            }]
        });
    </script>

### layerDefaults.shape.attribution `String`

The attribution for all shape layers.

#### Example - set default attribution for all shape layers
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layerDefaults: {
                shape: {
                    attribution: "&copy; Company Inc."
                }
            },
            layers: [{
                type: "shape",
                dataSource: {
                    type: "geojson",
                    data: [{
                        "type": "Polygon",
                        "coordinates": [
                            [[30, 10], [40, 40], [20, 40], [10, 20], [30, 10]]
                        ]
                    }]
                }
            }]
        });
    </script>

### layerDefaults.shape.opacity `Number` *(default: 1)*

The the opacity of all shape layers.

#### Example - set tile layer default opacity
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layerDefaults: {
                shape: {
                    opacity: 0.5
                }
            },
            layers: [{
                type: "shape",
                dataSource: {
                    type: "geojson",
                    data: [{
                        "type": "Polygon",
                        "coordinates": [
                            [[30, 10], [40, 40], [20, 40], [10, 20], [30, 10]]
                        ]
                    }]
                }
            }]
        });
    </script>

### layerDefaults.shape.style `Object`

The default style for shapes.

#### Example - Set default style for all shape layers
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layerDefaults: {
                shape: {
                    style: {
                        fill: {
                            color: "red",
                            opacity: 1
                        },
                        stroke: {
                            color: "green",
                            width: 4,
                            dashType: "longDashDot",
                            opacity: 0.5
                        }
                    }
                }
            },
            layers: [{
                type: "shape",
                dataSource: {
                    type: "geojson",
                    data: [{
                        "type": "Polygon",
                        "coordinates": [
                            [[30, 10], [40, 40], [20, 40], [10, 20], [30, 10]]
                        ]
                    }]
                }
            }]
        });
    </script>

### layerDefaults.shape.style.fill `Object`

The default fill for layer shapes.
Accepts a valid CSS color string or object with detailed configuration.

#### Example - Set default fill for all shape layers
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layerDefaults: {
                shape: {
                    style: {
                        fill: {
                            color: "red",
                            opacity: 1
                        }
                    }
                }
            },
            layers: [{
                type: "shape",
                dataSource: {
                    type: "geojson",
                    data: [{
                        "type": "Polygon",
                        "coordinates": [
                            [[30, 10], [40, 40], [20, 40], [10, 20], [30, 10]]
                        ]
                    }]
                }
            }]
        });
    </script>

### layerDefaults.shape.style.fill.color `String`

The default fill color for layer shapes.
Accepts a valid CSS color string, including hex and rgb.

#### Example - Set default fill color for all shape layers
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layerDefaults: {
                shape: {
                    style: {
                        fill: {
                            color: "red"
                        }
                    }
                }
            },
            layers: [{
                type: "shape",
                dataSource: {
                    type: "geojson",
                    data: [{
                        "type": "Polygon",
                        "coordinates": [
                            [[30, 10], [40, 40], [20, 40], [10, 20], [30, 10]]
                        ]
                    }]
                }
            }]
        });
    </script>

### layerDefaults.shape.style.fill.opacity `Number`

The default fill opacity (0 to 1) for layer shapes.

#### Example - Set default fill with opacity for all shape layers
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layerDefaults: {
                shape: {
                    style: {
                        fill: {
                            color: "red",
                            opacity: 1
                        }
                    }
                }
            },
            layers: [{
                type: "shape",
                dataSource: {
                    type: "geojson",
                    data: [{
                        "type": "Polygon",
                        "coordinates": [
                            [[30, 10], [40, 40], [20, 40], [10, 20], [30, 10]]
                        ]
                    }]
                }
            }]
        });
    </script>

### layerDefaults.shape.style.stroke `Object`

The default stroke for layer shapes.
Accepts a valid CSS color string or object with detailed configuration.

#### Example - Set default stroke for all shape layers
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layerDefaults: {
                shape: {
                    style: {
                        stroke: {
                            color: "green",
                            width: 4,
                            dashType: "longDashDot",
                            opacity: 0.5
                        }
                    }
                }
            },
            layers: [{
                type: "shape",
                dataSource: {
                    type: "geojson",
                    data: [{
                        "type": "Polygon",
                        "coordinates": [
                            [[30, 10], [40, 40], [20, 40], [10, 20], [30, 10]]
                        ]
                    }]
                }
            }]
        });
    </script>

### layerDefaults.shape.style.stroke.color `String`

The default stroke color for layer shapes.
Accepts a valid CSS color string, including hex and rgb.

#### Example - Set default stroke color for all shape layers
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layerDefaults: {
                shape: {
                    style: {
                        stroke: {
                            color: "green"
                        }
                    }
                }
            },
            layers: [{
                type: "shape",
                dataSource: {
                    type: "geojson",
                    data: [{
                        "type": "Polygon",
                        "coordinates": [
                            [[30, 10], [40, 40], [20, 40], [10, 20], [30, 10]]
                        ]
                    }]
                }
            }]
        });
    </script>

### layerDefaults.shape.style.stroke.dashType `String` *(default: "solid")*

The default dash type for layer shapes.
The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - Set default dashed stroke for all shape layers
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layerDefaults: {
                shape: {
                    style: {
                        stroke: {
                            width: 4,
                            dashType: "longDashDot"
                        }
                    }
                }
            },
            layers: [{
                type: "shape",
                dataSource: {
                    type: "geojson",
                    data: [{
                        "type": "Polygon",
                        "coordinates": [
                            [[30, 10], [40, 40], [20, 40], [10, 20], [30, 10]]
                        ]
                    }]
                }
            }]
        });
    </script>

### layerDefaults.shape.style.stroke.opacity `Number`

The default stroke opacity (0 to 1) for layer shapes.

#### Example - Set default stroke with opacity for all shape layers
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layerDefaults: {
                shape: {
                    style: {
                        stroke: {
                            width: 4,
                            opacity: 0.5
                        }
                    }
                }
            },
            layers: [{
                type: "shape",
                dataSource: {
                    type: "geojson",
                    data: [{
                        "type": "Polygon",
                        "coordinates": [
                            [[30, 10], [40, 40], [20, 40], [10, 20], [30, 10]]
                        ]
                    }]
                }
            }]
        });
    </script>

### layerDefaults.shape.style.stroke.width `Number` *(default: 1)*

The default stroke width for layer shapes.

#### Example - Set default stroke width for all shape layers
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layerDefaults: {
                shape: {
                    style: {
                        stroke: {
                            width: 4
                        }
                    }
                }
            },
            layers: [{
                type: "shape",
                dataSource: {
                    type: "geojson",
                    data: [{
                        "type": "Polygon",
                        "coordinates": [
                            [[30, 10], [40, 40], [20, 40], [10, 20], [30, 10]]
                        ]
                    }]
                }
            }]
        });
    </script>

### layerDefaults.bubble `Object`

The default configuration for bubble layers.

#### Example
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layerDefaults: {
                bubble: {
                    attribution: "&copy; Company Inc."
                }
            },
            layers: [{
                type: "bubble",
                dataSource: {
                    data: [{
                        "location": [42, 12], "value": 10
                    }, {
                        "location": [45, 15], "value": 25
                    }]
                }
            }]
        });
    </script>

### layerDefaults.bubble.attribution `String`

The attribution for all bubble layers.

#### Example - set default attribution for all bubble layers
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layerDefaults: {
                bubble: {
                    attribution: "&copy; Company Inc."
                }
            },
            layers: [{
                type: "bubble",
                dataSource: {
                    data: [{
                        "location": [42, 12], "value": 10
                    }, {
                        "location": [45, 15], "value": 25
                    }]
                }
            }]
        });
    </script>

### layerDefaults.bubble.opacity `Number` *(default: 1)*

The the opacity of all bubble layers.

#### Example - set tile layer default opacity
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layerDefaults: {
                bubble: {
                    opacity: 0.5
                }
            },
            layers: [{
                type: "bubble",
                dataSource: {
                    data: [{
                        "location": [42, 12], "value": 10
                    }, {
                        "location": [45, 15], "value": 25
                    }]
                }
            }]
        });
    </script>

### layerDefaults.bubble.maxSize `Number` *(default: 100)*

The maximum symbol size for bubble layer symbols.

#### Example - Set default minSize for all bubble layers
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layerDefaults: {
                bubble: {
                    maxSize: 50
                }
            },
            layers: [{
                type: "bubble",
                dataSource: {
                    data: [{
                        "location": [42, 12], "value": 10
                    }, {
                        "location": [45, 15], "value": 25
                    }]
                }
            }]
        });
    </script>

### layerDefaults.bubble.minSize `Number` *(default: 0)*

The minimum symbol size for bubble layer symbols.

> Setting non-zero value will distort symbol area to value ratio.

#### Example - Set default minSize for all bubble layers
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layerDefaults: {
                bubble: {
                    minSize: 10
                }
            },
            layers: [{
                type: "bubble",
                dataSource: {
                    data: [{
                        "location": [42, 12], "value": 10
                    }, {
                        "location": [45, 15], "value": 25
                    }]
                }
            }]
        });
    </script>

### layerDefaults.bubble.style `Object`

The default style for bubble layer symbols.

#### Example - Set default style for all bubble layers
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layerDefaults: {
                bubble: {
                    style: {
                        fill: {
                            color: "red",
                            opacity: 1
                        },
                        stroke: {
                            color: "green",
                            width: 4,
                            dashType: "longDashDot",
                            opacity: 0.5
                        }
                    }
                }
            },
            layers: [{
                type: "bubble",
                dataSource: {
                    data: [{
                        "location": [42, 12], "value": 10
                    }, {
                        "location": [45, 15], "value": 25
                    }]
                }
            }]
        });
    </script>

### layerDefaults.bubble.style.fill `Object`

The default fill for bubble layer symbols.
Accepts a valid CSS color string or object with detailed configuration.

#### Example - Set default fill for all bubble layers
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layerDefaults: {
                bubble: {
                    style: {
                        fill: {
                            color: "red",
                            opacity: 1
                        }
                    }
                }
            },
            layers: [{
                type: "bubble",
                dataSource: {
                    data: [{
                        "location": [42, 12], "value": 10
                    }, {
                        "location": [45, 15], "value": 25
                    }]
                }
            }]
        });
    </script>

### layerDefaults.bubble.style.fill.color `String`

The default fill color for bubble layer symbols.
Accepts a valid CSS color string, including hex and rgb.

#### Example - Set default fill color for all bubble layers
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layerDefaults: {
                bubble: {
                    style: {
                        fill: {
                            color: "red"
                        }
                    }
                }
            },
            layers: [{
                type: "bubble",
                dataSource: {
                    data: [{
                        "location": [42, 12], "value": 10
                    }, {
                        "location": [45, 15], "value": 25
                    }]
                }
            }]
        });
    </script>

### layerDefaults.bubble.style.fill.opacity `Number`

The default fill opacity (0 to 1) for layer symbols.

#### Example - Set default fill with opacity for all bubble layers
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layerDefaults: {
                bubble: {
                    style: {
                        fill: {
                            color: "red",
                            opacity: 1
                        }
                    }
                }
            },
            layers: [{
                type: "bubble",
                dataSource: {
                    data: [{
                        "location": [42, 12], "value": 10
                    }, {
                        "location": [45, 15], "value": 25
                    }]
                }
            }]
        });
    </script>

### layerDefaults.bubble.style.stroke `Object`

The default stroke for bubble layer symbols.
Accepts a valid CSS color string or object with detailed configuration.

#### Example - Set default stroke for all bubble layers
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layerDefaults: {
                bubble: {
                    style: {
                        stroke: {
                            color: "green",
                            width: 4,
                            dashType: "longDashDot",
                            opacity: 0.5
                        }
                    }
                }
            },
            layers: [{
                type: "bubble",
                dataSource: {
                    data: [{
                        "location": [42, 12], "value": 10
                    }, {
                        "location": [45, 15], "value": 25
                    }]
                }
            }]
        });
    </script>

### layerDefaults.bubble.style.stroke.color `String`

The default stroke color for bubble layer symbols.
Accepts a valid CSS color string, including hex and rgb.

#### Example - Set default stroke color for all bubble layers
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layerDefaults: {
                bubble: {
                    style: {
                        stroke: {
                            color: "green"
                        }
                    }
                }
            },
            layers: [{
                type: "bubble",
                dataSource: {
                    data: [{
                        "location": [42, 12], "value": 10
                    }, {
                        "location": [45, 15], "value": 25
                    }]
                }
            }]
        });
    </script>

### layerDefaults.bubble.style.stroke.dashType `String` *(default: "solid")*

The default dash type for layer symbols.
The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - Set default dashed stroke for all bubble layers
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layerDefaults: {
                bubble: {
                    style: {
                        stroke: {
                            width: 4,
                            dashType: "longDashDot"
                        }
                    }
                }
            },
            layers: [{
                type: "bubble",
                dataSource: {
                    data: [{
                        "location": [42, 12], "value": 10
                    }, {
                        "location": [45, 15], "value": 25
                    }]
                }
            }]
        });
    </script>

### layerDefaults.bubble.style.stroke.opacity `Number`

The default stroke opacity (0 to 1) for bubble layer symbols.

#### Example - Set default stroke with opacity for all bubble layers
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layerDefaults: {
                bubble: {
                    style: {
                        stroke: {
                            width: 4,
                            opacity: 0.5
                        }
                    }
                }
            },
            layers: [{
                type: "bubble",
                dataSource: {
                    data: [{
                        "location": [42, 12], "value": 10
                    }, {
                        "location": [45, 15], "value": 25
                    }]
                }
            }]
        });
    </script>

### layerDefaults.bubble.style.stroke.width `Number` *(default: 1)*

The default stroke width for bubble layer symbols.

#### Example - Set default stroke width for all bubble layers
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layerDefaults: {
                bubble: {
                    style: {
                        stroke: {
                            width: 4
                        }
                    }
                }
            },
            layers: [{
                type: "bubble",
                dataSource: {
                    data: [{
                        "location": [42, 12], "value": 10
                    }, {
                        "location": [45, 15], "value": 25
                    }]
                }
            }]
        });
    </script>

### layerDefaults.bubble.symbol `String|Function` *(default: "circle")*

The default symbol for bubble layers. Possible values:

* "circle" - A circle.
* "square" - A square symbol.
* function - An user defined symbol.

The function must accept an object with the following fields:
* center - The symbol center on the current layer.
* size - The symbol size.
* style - The symbol style.
* dataItem - The dataItem used to create the symbol.
* location - The location of the data point.

The function return value must be a `kendo.drawing.Shape`.

#### Example - Set default symbol for all bubble layers
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layerDefaults: {
                bubble: {
                    symbol: "square"
                }
            },
            layers: [{
                type: "bubble",
                dataSource: {
                    data: [{
                        "location": [42, 12], "value": 10
                    }, {
                        "location": [45, 15], "value": 25
                    }]
                }
            }]
        });
    </script>

### layerDefaults.tileSize `Number` *(default: 256)*
The size of the image tile in pixels.

### layerDefaults.tile `Object`

The default configuration for tile layers.

#### Example - set default options for all tile layers
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layerDefaults: {
                tile: {
                    opacity: 0.8,
                    attribution: "&copy; OpenStreetMap"
                }
            },
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png"
            }]
        });
    </script>

### layerDefaults.tile.urlTemplate `String`

The URL template for tile layers. Template variables:

* x - X coordinate of the tile
* y - Y coordinate of the tile
* zoom - zoom level
* subdomain - Subdomain for this tile. See [subdomains](#configuration-layers-tile-subdomains)

#### Example - set default URL template for all tile layers
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layerDefaults: {
                tile: {
                    urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                    attribution: "&copy; OpenStreetMap"
                }
            },
            layers: [{
                type: "tile"
            }]
        });
    </script>

### layerDefaults.tile.attribution `String`

The attribution of all tile layers.

#### Example - set default attribution for all tile layers
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layerDefaults: {
                tile: {
                    attribution: "&copy; OpenStreetMap"
                }
            },
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png"
            }]
        });
    </script>

### layerDefaults.tile.subdomains `Array`

The subdomain of all tile layers.

#### Example - set subdomains for all tile layers
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layerDefaults: {
                tile: {
                    subdomains: ["a", "b", "c"]
                }
            },
            layers: [{
                type: "tile",
                urlTemplate: "http://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });
    </script>

### layerDefaults.tile.opacity `Number` *(default: 1)*

The the opacity of all tile layers.

#### Example - set tile layer default opacity
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layerDefaults: {
                tile: {
                    opacity: 0.5
                }
            },
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });
    </script>

### layerDefaults.bing `Object`

The default configuration for Bing (tm) tile layers.

#### Example - set default options for all Bing (tm) layers
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layerDefaults: {
                bing: {
                    opacity: 0.8
                }
            },
            layers: [{
                type: "bing",
                key: "YOUR API KEY"
            }]
        });
    </script>

### layerDefaults.bing.attribution `String`

The attribution of all Bing (tm) layers.

#### Example - set default attribution for all Bing (tm) layers
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layerDefaults: {
                bing: {
                    attribution: "&copy; Microsoft"
                }
            },
            layers: [{
                type: "bing",
                key: "YOUR API KEY"
            }]
        });
    </script>

### layerDefaults.bing.opacity `Number` *(default: 1)*

The the opacity of all Bing (tm) tile layers.

#### Example - set Bing (tm) layer default opacity
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layerDefaults: {
                bing: {
                    opacity: 0.5
                }
            },
            layers: [{
                type: "bing",
                key: "YOUR API KEY"
            }]
        });
    </script>

### layerDefaults.bing.key `String`

The key of all Bing (tm) tile layers.

#### Example - set default API key
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layerDefaults: {
                bing: {
                    key: "YOUR API KEY"
                }
            },
            layers: [{
                type: "bing"
            }]
        });
    </script>

### layerDefaults.bing.imagerySet `String` *(default: "road")*

The bing map tile types. Possible options:

    * aerial - Aerial imagery.
    * aerialWithLabels - Aerial imagery with a road overlay.
    * road - Roads without additional imagery. (default)
    
### layerDefaults.bing.culture `String` *(default: "en-US")*

The culture to be used for the bing map tiles. 

#### Example - set default culture for bing layers
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layerDefaults: {
                bing: {
                    culture: "de-DE"
                }
            },
            layers: [{
                type: "bing",
                key: "YOUR API KEY"
            }]
        });
    </script>

### layers `Array`

The configuration of the map layers.
The layer type is determined by the value of the type field.

#### Example - configure map layers
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }, {
                type: "shape",
                dataSource: {
                    type: "geojson",
                    data: [{
                        "type": "Polygon",
                        "coordinates": [
                            [[30, 10], [40, 40], [20, 40], [10, 20], [30, 10]]
                        ]
                    }]
                }
            }]
        });
    </script>

### layers.attribution `String`

The attribution for the layer. Accepts valid HTML.

#### Example - set attribution text
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });
    </script>

### layers.autoBind `Boolean` *(default: true)*

If set to `false` the layer will not bind to the data source during initialization. In this case data binding will occur when the [change](/api/framework/datasource#events-change) event of the
data source is fired. By default the widget will bind to the data source specified in the configuration.

> Setting `autoBind` to `false` is useful when multiple layers (or widgets) are bound to the same data source. Disabling automatic binding ensures that the shared data source doesn't make more than one request to the remote service.

#### Example - using manual binding
    <div id="map"></div>
    <script>
        var ds = new kendo.data.DataSource({
            type: "geojson",
            data: [{
                "type": "Polygon",
                "coordinates": [
                    [[30, 10], [40, 40], [20, 40], [10, 20], [30, 10]]
                ]
            }]
        });

        $("#map").kendoMap({
            layers: [{
                type: "shape",
                autoBind: false,
                dataSource: ds
            }]
        });

        ds.read();
    </script>

#### Example - set Bing (tm) layer API key
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "bing",
                key: "YOUR API KEY"
            }]
        });
    </script>

### layers.dataSource `Object|Array|kendo.data.DataSource`

The data source of the layer. Can be a JavaScript object which represents a valid data source configuration, a JavaScript array or an existing [kendo.data.DataSource](/api/framework/datasource)
instance.

#### Example - binding to inline GeoJSON data
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "shape",
                dataSource: {
                    type: "geojson",
                    data: [{
                        "type": "Polygon",
                        "coordinates": [
                            [[30, 10], [40, 40], [20, 40], [10, 20], [30, 10]]
                        ]
                    }]
                }
            }]
        });
    </script>

#### Example - binding a shape layer to existing data source
    <div id="map"></div>
    <script>
        var ds = new kendo.data.DataSource({
            type: "geojson",
            data: [{
                "type": "Polygon",
                "coordinates": [
                    [[30, 10], [40, 40], [20, 40], [10, 20], [30, 10]]
                ]
            }]
        });

        $("#map").kendoMap({
            layers: [{
                type: "shape",
                dataSource: ds
            }]
        });
    </script>

#### Example - binding a marker layer to existing data source
    <div id="map"></div>
    <script>
        var ds = new kendo.data.DataSource({
            data: [{
                latlng: [0, 0]
            }]
        });

        $("#map").kendoMap({
            layers: [{
                type: "marker",
                dataSource: ds,
                locationField: "latlng"
            }]
        });
    </script>

### layers.extent `Array|kendo.dataviz.map.Extent`

Specifies the extent of the region covered by this layer.
The layer will be hidden when the specified area is out of view.

Accepts a four-element array that specifies the extent covered by this layer:
North-West lat, longitude, South-East latitude, longitude.

If not specified, the layer is always visible.

#### Example - activate shape layer for given region
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            center: [42.6908, 23.3090],
            zoom: 12,
            layers: [{
                type: "tile",
                urlTemplate: "http://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                subdomains: ["a", "b", "c"]
            }, {
                extent: [
                    43.4350, 22.2556,
                    42.2265, 27.4850
                ],
                minZoom: 11,
                type: "shape",
                style: {
                    fill: {
                        opacity: 0
                    },
                    stroke: {
                        color: "green",
                        width: 4
                    }
                },
                dataSource: {
                    type: "geojson",
                    data: [{
                        "type": "Polygon",
                        "coordinates": [[
                            [ 23.3569, 42.6198 ],
                            [ 23.2360, 42.6743 ],
                            [ 23.2278, 42.7288 ],
                            [ 23.2666, 42.7505 ],
                            [ 23.3095, 42.7457 ],
                            [ 23.4046, 42.7089 ],
                            [ 23.4183, 42.6743 ],
                            [ 23.4204, 42.6299 ],
                            [ 23.3569, 42.6198 ]
                        ]]
                    }]
                }
            }]
        });
    </script>

### layers.key `String`

The API key for the layer. Currently supported only for Bing (tm) tile layers.

### layers.imagerySet `String` *(default: "road")*

The bing map tile types. Possible options:

    * aerial - Aerial imagery.
    * aerialWithLabels - Aerial imagery with a road overlay.
    * birdseye - Bird’s eye (oblique-angle) imagery
    * birdseyeWithLabels - Bird’s eye imagery with a road overlay.
    * road - Roads without additional imagery. (default)
    
### layers.culture `String` *(default: "en-US")*

The culture to be used for the bing map tiles.

#### Example - set culture for bing layer
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "bing",
                key: "YOUR API KEY",
                culture: "de-DE"
            }]
        });
    </script>

### layers.locationField `String` *(default: "location")*

The data item field which contains the marker (symbol) location.
The field should be an array with two numbers - latitude and longitude in decimal degrees.

Requires the [dataSource](#configuration-layers-dataSource) option to be set.

Only applicable to "marker" and "bubble" layers.

#### Example - bind marker title
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "marker",
                locationField: "latlng",
                dataSource: {
                    data: [{
                        latlng: [0, 0],
                        text: "POI"
                    }]
                }
            }]
        });
    </script>

### layers.shape `String` *(default: "pinTarget")*

The default marker shape for data-bound markers. The following pre-defined marker shapes are available:

* pinTarget
* pin

Marker shapes are implemented as CSS classes on the marker element (span.k-marker).
For example "pinTarget" is rendered as "k-marker-pin-target".

#### Example - setting marker shape
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "marker",
                shape: "pin",

                locationField: "latlng",
                dataSource: {
                    data: [{
                        latlng: [0, 0]
                    }]
                }
            }]
        });
    </script>

### layers.tileSize `Number` *(default: 256)*
The size of the image tile in pixels.

### layers.titleField `String` *(default: "title")*

The data item field which contains the marker title.
Requires the [dataSource](#configuration-layers-dataSource) option to be set.

#### Example - bind marker title
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "marker",
                locationField: "latlng",
                titleField: "text",
                dataSource: {
                    data: [{
                        latlng: [0, 0],
                        text: "POI"
                    }]
                }
            }]
        });
    </script>

### layers.tooltip `Object`

The default Kendo UI Tooltip options for data-bound markers.

### layers.tooltip.autoHide `Boolean`*(default: true)*

Specifies if the tooltip will be hidden when mouse leaves the target element. If set to false a close button will be shown within tooltip. If set to false, showAfter is specified and the showOn is set to "mouseenter" the Tooltip will be displayed after the given timeout even if the element is no longer hovered.

#### Example - hide tooltip on mouse leave
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "marker",
                tooltip: {
                    autoHide: true,
                    content: "Foo"
                },
                dataSource: {
                    data: [{
                        latlng: [0, 0]
                    }]
                },
                locationField: "latlng"
            }]
        });
    </script>

### layers.tooltip.animation `Object`

A collection of {Animation} objects, used to change default animations. A value of **false**
will disable all animations in the widget.

#### Example - disable animations
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "marker",
                tooltip: {
                    animation: false,
                    content: "Foo"
                },
                dataSource: {
                    data: [{
                        latlng: [0, 0]
                    }]
                },
                locationField: "latlng"
            }]
        });
    </script>

### layers.tooltip.animation.close `Object`

The animation that will be used when a Tooltip closes.

#### Example - set close animation
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "marker",
                tooltip: {
                    animation: {
                      close: {
                        effects: "fade:out"
                      }
                    },
                    content: "Foo"
                },
                dataSource: {
                    data: [{
                        latlng: [0, 0]
                    }]
                },
                locationField: "latlng"
            }]
        });
    </script>

### layers.tooltip.animation.close.effects `String`

Effect to be used for closing of the tooltip.

#### Example - set close animation effect
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "marker",
                tooltip: {
                    animation: {
                        close: {
                            effects: "fade:out"
                        }
                    },
                    content: "Foo"
                },
                dataSource: {
                    data: [{
                        latlng: [0, 0]
                    }]
                },
                locationField: "latlng"
            }]
        });
    </script>

### layers.tooltip.animation.close.duration `Number`

Defines the animation duration.

#### Example - set close animation duration
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "marker",
                tooltip: {
                    animation: {
                        close: {
                            duration: 1000
                        }
                    },
                    content: "Foo"
                },
                dataSource: {
                    data: [{
                        latlng: [0, 0]
                    }]
                },
                locationField: "latlng"
            }]
        });
    </script>

### layers.tooltip.animation.open `Object`

The animation that will be used when a Tooltip opens.

#### Example - set open animation
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "marker",
                tooltip: {
                    animation: {
                        open: {
                            effects: "fade:in",
                            duration: 1000
                        }
                    },
                    content: "Foo"
                },
                dataSource: {
                    data: [{
                        latlng: [0, 0]
                    }]
                },
                locationField: "latlng"
            }]
        });
    </script>

### layers.tooltip.animation.open.effects `String`

Effect to be used for opening of the Tooltip.

#### Example - set open animation effect
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "marker",
                tooltip: {
                    animation: {
                        open: {
                            effects: "fade:in"
                        }
                    },
                    content: "Foo"
                },
                dataSource: {
                    data: [{
                        latlng: [0, 0]
                    }]
                },
                locationField: "latlng"
            }]
        });
    </script>

### layers.tooltip.animation.open.duration `Number`

Defines the animation duration.

#### Example - set open animation duration
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "marker",
                tooltip: {
                    animation: {
                        open: {
                            duration: "1000"
                        }
                    },
                    content: "Foo"
                },
                dataSource: {
                    data: [{
                        latlng: [0, 0]
                    }]
                },
                locationField: "latlng"
            }]
        });
    </script>

### layers.tooltip.content `Object|String|Function`

The text or a function which result will be shown within the tooltip.
By default the tooltip will display the target element title attribute content.

#### Example - extract the content from target marker
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "marker",
                tooltip: {
                    content: function(e) {
                        var marker = e.sender.marker;
                        return marker.options.location.toString();
                    }
                },
                dataSource: {
                    data: [{
                        latlng: [0, 0]
                    }]
                },
                locationField: "latlng"
            }]
        });
    </script>

#### Example - content as static text
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "marker",
                tooltip: {
                    content: "Foo"
                },
                dataSource: {
                    data: [{
                        latlng: [0, 0]
                    }]
                },
                locationField: "latlng"
            }]
        });
    </script>

### layers.tooltip.content.url `String`

Specifies a URL or request options that the tooltip should load its content from.

>Note: For URLs starting with a protocol (e.g. http://),
a container iframe element is automatically created. This behavior may change in future
versions, so it is advisable to always use the [iframe configuration option](#iframe).

#### Example - load content from remote URL
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "marker",
                tooltip: {
                      content: {
                        url: "http://demos.telerik.com/kendo-ui/content/web/tooltip/ajax/ajaxContent3.html"
                      },
                      width: 220,
                      height: 280
                },
                dataSource: {
                    data: [{
                        latlng: [0, 0]
                    }]
                },
                locationField: "latlng"
            }]
        });
    </script>

### layers.tooltip.template `String|Template`

The [template](/api/framework/kendo#methods-template) which renders the tooltip content.

The fields which can be used in the template are:

* location - the marker location (`kendo.dataviz.map.Location` instance)
* marker - the marker instance

> Setting a template disables the content option.

#### Example - set tooltip template
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "marker",
                tooltip: {
                    template: "Lon:#= location.lng #, Lat:#= location.lat #"
                },
                dataSource: {
                    data: [{
                        latlng: [0, 0]
                    }]
                },
                locationField: "latlng"
            }]
        });
    </script>

#### Example - use formatted dataItem value in the tooltip template
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "marker",
                tooltip: {
                    template: "#= kendo.toString(marker.dataItem.value, 'C') #"
                },
                dataSource: {
                    data: [{
                        latlng: [0, 0],
                        value: 1000
                    }]
                },
                locationField: "latlng"
            }]
        });
    </script>

### layers.tooltip.callout `Boolean`*(default:true)*

Specifies if the tooltip callout will be displayed.

#### Example - hide the tooltip callout
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "marker",
                tooltip: {
                    callout: false,
                    template: "Lon:#= location.lng #, Lat:#= location.lat #"
                },
                dataSource: {
                    data: [{
                        latlng: [0, 0]
                    }]
                },
                locationField: "latlng"
            }]
        });
    </script>

### layers.tooltip.iframe `Boolean`

Explicitly states whether content iframe should be created.

#### Example - load content from remote URL
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "marker",
                tooltip: {
                      iframe: true,
                      content: {
                        url: "http://demos.telerik.com/kendo-ui/content/web/tooltip/ajax/ajaxContent3.html"
                      },
                      width: 220,
                      height: 280
                },
                dataSource: {
                    data: [{
                        latlng: [0, 0]
                    }]
                },
                locationField: "latlng"
            }]
        });
    </script>

### layers.tooltip.height `Number`*(default: Infinity)*

The height (in pixels) of the tooltip.

#### Example - set the height of the tooltip
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "marker",
                tooltip: {
                    height: 80,
                    content: "Foo"
                },
                dataSource: {
                    data: [{
                        latlng: [0, 0]
                    }]
                },
                locationField: "latlng"
            }]
        });
    </script>

### layers.tooltip.width `Number`*(default: Infinity)*

The width (in pixels) of the tooltip.

#### Example - set the width of the tooltip
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "marker",
                tooltip: {
                    width: 80,
                    content: "Foo"
                },
                dataSource: {
                    data: [{
                        latlng: [0, 0]
                    }]
                },
                locationField: "latlng"
            }]
        });
    </script>

### layers.tooltip.position `String`*(default: "top")*

The position relative to the target element, at which the tooltip will be shown. Predefined values are "bottom", "top", "left", "right", "center".

#### Example - set tooltip position
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "marker",
                tooltip: {
                    position: "left",
                    content: "Foo"
                },
                dataSource: {
                    data: [{
                        latlng: [0, 0]
                    }]
                },
                locationField: "latlng"
            }]
        });
    </script>

### layers.tooltip.showAfter `Number`*(default: 100)*

Specify the delay in milliseconds before the tooltip is shown. This option is ignored if showOn is set to "click" or "focus".

#### Example - set show delay
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "marker",
                tooltip: {
                    showOn: "mouseenter",
                    showAfter: 1000,
                    content: "Foo"
                },
                dataSource: {
                    data: [{
                        latlng: [0, 0]
                    }]
                },
                locationField: "latlng"
            }]
        });
    </script>

### layers.tooltip.showOn `String`*(default: "mouseenter")*

The event on which the tooltip will be shown. Predefined values are "mouseenter", "click" and "focus".

#### Example - show tooltip on mouse enter
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "marker",
                tooltip: {
                    showOn: "mouseenter",
                    content: "Foo"
                },
                dataSource: {
                    data: [{
                        latlng: [0, 0]
                    }]
                },
                locationField: "latlng"
            }]
        });
    </script>

### layers.maxSize `Number` *(default: 100)*

The maximum symbol size for bubble layer symbols.

#### Example - Set minSize for bubble layer
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "bubble",
                maxSize: 50,
                dataSource: {
                    data: [{
                        "location": [42, 12], "value": 10
                    }, {
                        "location": [45, 15], "value": 25
                    }]
                }
            }]
        });
    </script>

### layers.minSize `Number` *(default: 0)*

The minimum symbol size for bubble layer symbols.

> Setting non-zero value will distort symbol area to value ratio.

#### Example - Set minSize for bubble layer
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "bubble",
                minSize: 10,
                dataSource: {
                    data: [{
                        "location": [42, 12], "value": 10
                    }, {
                        "location": [45, 15], "value": 25
                    }]
                }
            }]
        });
    </script>

### layers.maxZoom

The maximum zoom level at which to show this layer.

#### Example - switch to OpenCycleMap at zoom level 14
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            center: [30.268107, -97.744821],
            zoom: 14,
            layers: [{
                type: "tile",
                urlTemplate: "http://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                subdomains: ["a", "b", "c"],
                maxZoom: 13
            }, {
                minZoom: 14,
                type: "tile",
                urlTemplate: "http://#= subdomain #.tile2.opencyclemap.org/transport/#= zoom #/#= x #/#= y #.png",
                subdomains: ["a", "b", "c"]
            }]
        });
    </script>

### layers.minZoom

The minimum zoom level at which to show this layer.

#### Example - switch to OpenCycleMap at zoom level 14
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            center: [30.268107, -97.744821],
            zoom: 14,
            layers: [{
                type: "tile",
                urlTemplate: "http://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                subdomains: ["a", "b", "c"],
                maxZoom: 13
            }, {
                minZoom: 14,
                type: "tile",
                urlTemplate: "http://#= subdomain #.tile2.opencyclemap.org/transport/#= zoom #/#= x #/#= y #.png",
                subdomains: ["a", "b", "c"]
            }]
        });
    </script>

### layers.opacity `Number` *(default: 1)*

The the opacity for the layer.

#### Example - setting layer opacity
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                opacity: 0.5,
                urlTemplate: "http://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                subdomains: ["a", "b", "c"],
                attribution: "&copy; OpenStreetMap"
            }]
        });
    </script>

### layers.subdomains `Array`

A list of subdomains to use for loading tiles.
Alternating between different subdomains allows more requests to be executed in parallel.

#### Example - setting subdomains for OpenStreetMap tiles
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "http://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                subdomains: ["a", "b", "c"],
                attribution: "&copy; OpenStreetMap"
            }]
        });
    </script>

### layers.symbol `String|Function` *(default: "circle")*

The symbol to use for bubble layers. Possible values:

* "circle" - A circle.
* "square" - A square symbol.
* function - An user defined symbol.

The function must accept an object with the following fields:
* center - The symbol center on the current layer.
* size - The symbol size.
* style - The symbol style.
* dataItem - The dataItem used to create the symbol.
* location - The location of the data point.

The function return value must be a `kendo.drawing.Shape`.

#### Example - Set symbol for bubble layer
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "bubble",
                symbol: "square",
                dataSource: {
                    data: [{
                        "location": [42, 12], "value": 10
                    }, {
                        "location": [45, 15], "value": 25
                    }]
                }
            }]
        });
    </script>

### layers.type `String`

The layer type. Supported types are:

* "bing" - a Bing (tm) tile layer
* "tile" - a generic "slippy map" tile layer
* "marker" - a data-bound marker layer
* "shape" - a vector shape layer, e.g. bound to GeoJSON data
* "bubble" - a specialized vector shape layer for bubble maps

#### Example - creating a tile layer
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });
    </script>

### layers.style `Object`

The default style for shapes.

#### Example - setting style for shape layer
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "shape",
                style: {
                    fill: {
                        color: "red",
                        opacity: 1
                    },
                    stroke: {
                        color: "green",
                        width: 4,
                        dashType: "longDashDot",
                        opacity: 0.5
                    }
                },
                dataSource: {
                    type: "geojson",
                    data: [{
                        "type": "Polygon",
                        "coordinates": [
                            [[30, 10], [40, 40], [20, 40], [10, 20], [30, 10]]
                        ]
                    }]
                }
            }]
        });
    </script>

### layers.style.fill `Object`

The default fill for layer shapes.
Accepts a valid CSS color string or object with detailed configuration.

#### Example set shape fill
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "shape",
                style: {
                    fill: {
                        color: "red",
                        opacity: 1
                    }
                },
                dataSource: {
                    type: "geojson",
                    data: [{
                        "type": "Polygon",
                        "coordinates": [
                            [[30, 10], [40, 40], [20, 40], [10, 20], [30, 10]]
                        ]
                    }]
                }
            }]
        });
    </script>

### layers.style.fill.color `String`

The default fill color for layer shapes.
Accepts a valid CSS color string, including hex and rgb.

#### Example - setting fill color for shape layer
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "shape",
                style: {
                    fill: {
                        color: "red"
                    }
                },
                dataSource: {
                    type: "geojson",
                    data: [{
                        "type": "Polygon",
                        "coordinates": [
                            [[30, 10], [40, 40], [20, 40], [10, 20], [30, 10]]
                        ]
                    }]
                }
            }]
        });
    </script>

### layers.style.fill.opacity `Number`

The default fill opacity (0 to 1) for layer shapes.

#### Example - setting fill opacity for shape layer
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "shape",
                style: {
                    fill: {
                        color: "red",
                        opacity: 0.5
                    }
                },
                dataSource: {
                    type: "geojson",
                    data: [{
                        "type": "Polygon",
                        "coordinates": [
                            [[30, 10], [40, 40], [20, 40], [10, 20], [30, 10]]
                        ]
                    }]
                }
            }]
        });
    </script>

### layers.style.stroke `Object`

The default stroke for layer shapes.
Accepts a valid CSS color string or object with detailed configuration.

#### Example - setting stroke style for shape layer
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "shape",
                style: {
                    stroke: {
                        color: "green",
                        width: 4,
                        dashType: "longDashDot",
                        opacity: 0.5
                    }
                },
                dataSource: {
                    type: "geojson",
                    data: [{
                        "type": "Polygon",
                        "coordinates": [
                            [[30, 10], [40, 40], [20, 40], [10, 20], [30, 10]]
                        ]
                    }]
                }
            }]
        });
    </script>

### layers.style.stroke.color `String`

The default stroke color for layer shapes.
Accepts a valid CSS color string, including hex and rgb.

#### Example - setting stroke color for shape layer
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "shape",
                style: {
                    stroke: {
                        color: "green",
                        width: 4
                    }
                },
                dataSource: {
                    type: "geojson",
                    data: [{
                        "type": "Polygon",
                        "coordinates": [
                            [[30, 10], [40, 40], [20, 40], [10, 20], [30, 10]]
                        ]
                    }]
                }
            }]
        });
    </script>

### layers.style.stroke.dashType `Number` *(default: 1)*

The default dash type for layer shapes.
The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - setting stroke dash type for shape layer
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "shape",
                style: {
                    stroke: {
                        width: 4,
                        dashType: "longDashDot"
                    }
                },
                dataSource: {
                    type: "geojson",
                    data: [{
                        "type": "Polygon",
                        "coordinates": [
                            [[30, 10], [40, 40], [20, 40], [10, 20], [30, 10]]
                        ]
                    }]
                }
            }]
        });
    </script>

### layers.style.stroke.opacity `Number`

The default stroke opacity (0 to 1) for layer shapes.

#### Example - setting stroke opacity for shape layer
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "shape",
                style: {
                    stroke: {
                        width: 4,
                        opacity: 0.5
                    }
                },
                dataSource: {
                    type: "geojson",
                    data: [{
                        "type": "Polygon",
                        "coordinates": [
                            [[30, 10], [40, 40], [20, 40], [10, 20], [30, 10]]
                        ]
                    }]
                }
            }]
        });
    </script>

### layers.style.stroke.width `Number` *(default: 1)*

The default stroke width for layer shapes.

#### Example - setting stroke width for shape layer
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "shape",
                style: {
                    stroke: {
                        width: 4
                    }
                },
                dataSource: {
                    type: "geojson",
                    data: [{
                        "type": "Polygon",
                        "coordinates": [
                            [[30, 10], [40, 40], [20, 40], [10, 20], [30, 10]]
                        ]
                    }]
                }
            }]
        });
    </script>

### layers.urlTemplate `String`

The URL template for tile layers. Template variables:

* x - X coordinate of the tile
* y - Y coordinate of the tile
* zoom - zoom level
* subdomain - Subdomain for this tile. See [subdomains](#configuration-layers-tile-subdomains)

#### Example - setting URL template for tile layer
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "http://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                subdomains: ["a", "b", "c"],
                attribution: "&copy; OpenStreetMap"
            }]
        });
    </script>

### layers.valueField `String` *(default: "value")*

The value field for bubble layer symbols.
The data item field should be a number.

#### Example - Set bubble layer fields
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "bubble",
                locationField: "loc",
                valueField: "val",
                dataSource: {
                    data: [{
                        "loc": [42, 2], "val": 100
                    }, {
                        "loc": [45, 7], "val": 150
                    }]
                }
            }]
        });
    </script>

### layers.zIndex `Number`

The zIndex for this layer.

Layers are normally stacked in declaration order (last one is on top).

### markerDefaults `Object`

The default options for all markers.

#### Example - setting default shape for all markers
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            markerDefaults: {
                shape: "pin"
            },
            markers: [{
                location: [42, 27]
            }, {
                location: [40, 20]
            }]
        });
    </script>

### markerDefaults.shape `String` *(default: "pinTarget")*

The default marker shape. The following pre-defined marker shapes are available:

* pinTarget
* pin

Marker shapes are implemented as CSS classes on the marker element (span.k-marker).
For example "pinTarget" is rendered as "k-marker-pin-target".

#### Example - setting default shape for all markers
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            markerDefaults: {
                shape: "pin"
            },
            markers: [{
                location: [42, 27]
            }, {
                location: [40, 20]
            }]
        });
    </script>

### markerDefaults.tooltip `Object`

Default Kendo UI Tooltip options for this marker.

### markerDefaults.tooltip.autoHide `Boolean`*(default: true)*

Specifies if the tooltip will be hidden when mouse leaves the target element. If set to false a close button will be shown within tooltip. If set to false, showAfter is specified and the showOn is set to "mouseenter" the Tooltip will be displayed after the given timeout even if the element is no longer hovered.

#### Example - hide tooltip on mouse leave
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            markerDefaults: {
                tooltip: {
                    autoHide: true
                }
            },
            markers: [{
                location: [42, 27],
                tooltip: {
                    content: "Foo"
                }
            }, {
                location: [40, 20],
                tooltip: {
                    content: "Bar"
                }
            }]
        });
    </script>

### markerDefaults.tooltip.animation `Object`

A collection of {Animation} objects, used to change default animations. A value of **false**
will disable all animations in the widget.

#### Example - disable animations
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            markerDefaults: {
                tooltip: {
                    animation: false
                }
            },
            markers: [{
                location: [42, 27],
                tooltip: {
                    content: "Foo"
                }
            }, {
                location: [40, 20],
                tooltip: {
                    content: "Bar"
                }
            }]
        });
    </script>

### markerDefaults.tooltip.animation.close `Object`

The animation that will be used when a Tooltip closes.

#### Example - set close animation
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            markerDefaults: {
                tooltip: {
                    animation: {
                      close: {
                        effects: "fade:out"
                      }
                    }
                }
            },
            markers: [{
                location: [42, 27],
                tooltip: {
                    content: "Foo"
                }
            }, {
                location: [40, 20],
                tooltip: {
                    content: "Bar"
                }
            }]
        });
    </script>

### markerDefaults.tooltip.animation.close.effects `String`

Effect to be used for closing of the tooltip.

#### Example - set close animation effect
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            markerDefaults: {
                tooltip: {
                    animation: {
                        close: {
                            effects: "fade:out"
                        }
                    }
                }
            },
            markers: [{
                location: [42, 27],
                tooltip: {
                    content: "Foo"
                }
            }, {
                location: [40, 20],
                tooltip: {
                    content: "Bar"
                }
            }]
        });
    </script>

### markerDefaults.tooltip.animation.close.duration `Number`

Defines the animation duration.

#### Example - set close animation duration
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            markerDefaults: {
                tooltip: {
                    animation: {
                        close: {
                            duration: 1000
                        }
                    }
                }
            },
            markers: [{
                location: [42, 27],
                tooltip: {
                    content: "Foo"
                }
            }, {
                location: [40, 20],
                tooltip: {
                    content: "Bar"
                }
            }]
        });
    </script>

### markerDefaults.tooltip.animation.open `Object`

The animation that will be used when a Tooltip opens.

#### Example - set open animation
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            markerDefaults: {
                tooltip: {
                    animation: {
                        open: {
                            effects: "fade:in",
                            duration: 1000
                        }
                    }
                }
            },
            markers: [{
                location: [42, 27],
                tooltip: {
                    content: "Foo"
                }
            }, {
                location: [40, 20],
                tooltip: {
                    content: "Bar"
                }
            }]
        });
    </script>

### markerDefaults.tooltip.animation.open.effects `String`

Effect to be used for opening of the Tooltip.

#### Example - set open animation effect
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            markerDefaults: {
                tooltip: {
                    animation: {
                        open: {
                            effects: "fade:in"
                        }
                    }
                }
            },
            markers: [{
                location: [42, 27],
                tooltip: {
                    content: "Foo"
                }
            }, {
                location: [40, 20],
                tooltip: {
                    content: "Bar"
                }
            }]
        });
    </script>

### markerDefaults.tooltip.animation.open.duration `Number`

Defines the animation duration.

#### Example - set open animation duration
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            markerDefaults: {
                tooltip: {
                    animation: {
                        open: {
                            duration: "1000"
                        }
                    }
                }
            },
            markers: [{
                location: [42, 27],
                tooltip: {
                    content: "Foo"
                }
            }, {
                location: [40, 20],
                tooltip: {
                    content: "Bar"
                }
            }]
        });
    </script>

### markerDefaults.tooltip.content `Object|String|Function`

The text or a function which result will be shown within the tooltip.
By default the tooltip will display the target element title attribute content.

#### Example - extract the content from target marker
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            markerDefaults: {
                tooltip: {
                    content: function(e) {
                        var marker = e.sender.marker;
                        return marker.options.location.toString();
                    }
                }
            },
            markers: [{
                location: [42, 27]
            }, {
                location: [40, 20]
            }]
        });
    </script>

#### Example - content as static text
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            markerDefaults: {
                tooltip: {
                    content: "Foo"
                }
            },
            markers: [{
                location: [42, 27]
            }, {
                location: [40, 20]
            }]
        });
    </script>

### markerDefaults.tooltip.content.url `String`

Specifies a URL or request options that the tooltip should load its content from.

>Note: For URLs starting with a protocol (e.g. http://),
a container iframe element is automatically created. This behavior may change in future
versions, so it is advisable to always use the [iframe configuration option](#iframe).

#### Example - load content from remote URL
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            markerDefaults: {
                tooltip: {
                      content: {
                        url: "http://demos.telerik.com/kendo-ui/content/web/tooltip/ajax/ajaxContent3.html"
                      },
                      width: 220,
                      height: 280
                }
            },
            markers: [{
                location: [42, 27]
            }, {
                location: [40, 20]
            }]
        });
    </script>

### markerDefaults.tooltip.template `String|Template`

The [template](/api/framework/kendo#methods-template) which renders the tooltip content.

The fields which can be used in the template are:

* location - the marker location (`kendo.dataviz.map.Location` instance)
* marker - the marker instance

> Setting a template disables the content option.

#### Example - set tooltip template
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            markerDefaults: {
                tooltip: {
                    template: "Lon:#= location.lng #, Lat:#= location.lat #"
                }
            },
            markers: [{
                location: [42, 27]
            }, {
                location: [40, 20]
            }]
        });
    </script>

### markerDefaults.tooltip.callout `Boolean`*(default:true)*

Specifies if the tooltip callout will be displayed.

#### Example - hide the tooltip callout
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            markerDefaults: {
                tooltip: {
                    callout: false,
                    template: "Lon:#= location.lng #, Lat:#= location.lat #"
                }
            },
            markers: [{
                location: [42, 27]
            }, {
                location: [40, 20]
            }]
        });
    </script>

### markerDefaults.tooltip.iframe `Boolean`

Explicitly states whether content iframe should be created.

#### Example - load content from remote URL
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            markerDefaults: {
                tooltip: {
                      iframe: true,
                      content: {
                        url: "http://demos.telerik.com/kendo-ui/content/web/tooltip/ajax/ajaxContent3.html"
                      },
                      width: 220,
                      height: 280
                }
            },
            markers: [{
                location: [42, 27]
            }, {
                location: [40, 20]
            }]
        });
    </script>

### markerDefaults.tooltip.height `Number`*(default: Infinity)*

The height (in pixels) of the tooltip.

#### Example - set the height of the tooltip
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            markerDefaults: {
                tooltip: {
                    height: 80,
                    content: "Foo"
                }
            },
            markers: [{
                location: [42, 27]
            }, {
                location: [40, 20]
            }]
        });
    </script>

### markerDefaults.tooltip.width `Number`*(default: Infinity)*

The width (in pixels) of the tooltip.

#### Example - set the width of the tooltip
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            markerDefaults: {
                tooltip: {
                    width: 80,
                    content: "Foo"
                }
            },
            markers: [{
                location: [42, 27]
            }, {
                location: [40, 20]
            }]
        });
    </script>

### markerDefaults.tooltip.position `String`*(default: "top")*

The position relative to the target element, at which the tooltip will be shown. Predefined values are "bottom", "top", "left", "right", "center".

#### Example - set tooltip position
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            markerDefaults: {
                tooltip: {
                    position: "left",
                    content: "Foo"
                }
            },
            markers: [{
                location: [42, 27]
            }, {
                location: [40, 20]
            }]
        });
    </script>

### markerDefaults.tooltip.showAfter `Number`*(default: 100)*

Specify the delay in milliseconds before the tooltip is shown. This option is ignored if showOn is set to "click" or "focus".

#### Example - set show delay
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            markerDefaults: {
                tooltip: {
                    showOn: "mouseenter",
                    showAfter: 1000,
                    content: "Foo"
                }
            },
            markers: [{
                location: [42, 27]
            }, {
                location: [40, 20]
            }]
        });
    </script>

### markerDefaults.tooltip.showOn `String`*(default: "mouseenter")*

The event on which the tooltip will be shown. Predefined values are "mouseenter", "click" and "focus".

#### Example - show tooltip on mouse enter
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            markerDefaults: {
                tooltip: {
                    showOn: "mouseenter",
                    content: "Foo"
                }
            },
            markers: [{
                location: [42, 27]
            }, {
                location: [40, 20]
            }]
        });
    </script>

### markers `Array`

Static markers to display on the map.

#### Example - setting default shape for all markers
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            markers: [{
                location: [42, 27]
            }, {
                location: [40, 20]
            }]
        });
    </script>

### markers.location `Array|kendo.dataviz.map.Location`

The marker location on the map. Coordinates are listed as `[Latitude, Longitude]`.

#### Example - setting marker location
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            markerDefaults: {
                shape: "pin"
            },
            markers: [{
                location: [42, 27]
            }]
        });
    </script>

### markers.shape `String` *(default: "pinTarget")*

The marker shape. The following pre-defined marker shapes are available:

* pinTarget
* pin

Marker shapes are implemented as CSS classes on the marker element (span.k-marker).
For example "pinTarget" is rendered as "k-marker-pin-target".

#### Example - setting marker shape
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            markers: [{
                shape: "pin",
                location: [42, 27]
            }]
        });
    </script>

### markers.title `String` *(default: "pinTarget")*

The marker title. Displayed as browser tooltip.

#### Example - setting marker title
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            markers: [{
                shape: "pin",
                location: [0, 0],
                title: "POI"
            }]
        });
    </script>

### markers.tooltip `Object`

Kendo UI Tooltip options for this marker.

### markers.tooltip.autoHide `Boolean`*(default: true)*

Specifies if the tooltip will be hidden when mouse leaves the target element. If set to false a close button will be shown within tooltip. If set to false, showAfter is specified and the showOn is set to "mouseenter" the Tooltip will be displayed after the given timeout even if the element is no longer hovered.

#### Example - hide tooltip on mouse leave
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            markers: [{
                location: [42, 27],
                tooltip: {
                    autoHide: true,
                    content: "Foo"
                }
            }]
        });
    </script>

### markers.tooltip.animation `Object`

A collection of {Animation} objects, used to change default animations. A value of **false**
will disable all animations in the widget.

#### Example - disable animations
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            markers: [{
                location: [42, 27],
                tooltip: {
                    animation: false,
                    content: "Foo"
                }
            }]
        });
    </script>

### markers.tooltip.animation.close `Object`

The animation that will be used when a Tooltip closes.

#### Example - set close animation
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            markers: [{
                location: [42, 27],
                tooltip: {
                    animation: {
                      close: {
                        effects: "fade:out"
                      }
                    },
                    content: "Foo"
                }
            }]
        });
    </script>

### markers.tooltip.animation.close.effects `String`

Effect to be used for closing of the tooltip.

#### Example - set close animation effect
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            markers: [{
                location: [42, 27],
                tooltip: {
                    animation: {
                        close: {
                            effects: "fade:out"
                        }
                    },
                    content: "Foo"
                }
            }]
        });
    </script>

### markers.tooltip.animation.close.duration `Number`

Defines the animation duration.

#### Example - set close animation duration
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            markers: [{
                location: [42, 27],
                tooltip: {
                    animation: {
                        close: {
                            duration: 1000
                        }
                    },
                    content: "Foo"
                }
            }]
        });
    </script>

### markers.tooltip.animation.open `Object`

The animation that will be used when a Tooltip opens.

#### Example - set open animation
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            markers: [{
                location: [42, 27],
                tooltip: {
                    animation: {
                        open: {
                            effects: "fade:in",
                            duration: 1000
                        }
                    },
                    content: "Foo"
                }
            }]
        });
    </script>

### markers.tooltip.animation.open.effects `String`

Effect to be used for opening of the Tooltip.

#### Example - set open animation effect
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            markers: [{
                location: [42, 27],
                tooltip: {
                    animation: {
                        open: {
                            effects: "fade:in"
                        }
                    },
                    content: "Foo"
                }
            }]
        });
    </script>

### markers.tooltip.animation.open.duration `Number`

Defines the animation duration.

#### Example - set open animation duration
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            markers: [{
                location: [42, 27],
                tooltip: {
                    animation: {
                        open: {
                            duration: "1000"
                        }
                    },
                    content: "Foo"
                }
            }]
        });
    </script>

### markers.tooltip.content `Object|String|Function`

The text or a function which result will be shown within the tooltip.
By default the tooltip will display the target element title attribute content.

#### Example - extract the content from target marker
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            markers: [{
                location: [42, 27],
                tooltip: {
                    content: function(e) {
                        var marker = e.sender.marker;
                        return marker.options.location.toString();
                    }
                }
            }]
        });
    </script>

#### Example - content as static text
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            markers: [{
                location: [42, 27],
                tooltip: {
                    content: "Foo"
                }
            }]
        });
    </script>

### markers.tooltip.content.url `String`

Specifies a URL or request options that the tooltip should load its content from.

>Note: For URLs starting with a protocol (e.g. http://),
a container iframe element is automatically created. This behavior may change in future
versions, so it is advisable to always use the [iframe configuration option](#iframe).

#### Example - load content from remote URL
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            markers: [{
                location: [42, 27],
                tooltip: {
                      content: {
                        url: "http://demos.telerik.com/kendo-ui/content/web/tooltip/ajax/ajaxContent3.html"
                      },
                      width: 220,
                      height: 280
                }
            }]
        });
    </script>

### markers.tooltip.template `String|Template`

The [template](/api/framework/kendo#methods-template) which renders the tooltip content.

The fields which can be used in the template are:

* location - the marker location (`kendo.dataviz.map.Location` instance)
* marker - the marker instance

> Setting a template disables the content option.

#### Example - set tooltip template
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            markers: [{
                location: [42, 27],
                tooltip: {
                    template: "Lon:#= location.lng #, Lat:#= location.lat #"
                }
            }]
        });
    </script>

### markers.tooltip.callout `Boolean`*(default:true)*

Specifies if the tooltip callout will be displayed.

#### Example - hide the tooltip callout
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            markers: [{
                location: [42, 27],
                tooltip: {
                    callout: false,
                    template: "Lon:#= location.lng #, Lat:#= location.lat #"
                }
            }]
        });
    </script>

### markers.tooltip.iframe `Boolean`

Explicitly states whether content iframe should be created.

#### Example - load content from remote URL
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            markers: [{
                location: [42, 27],
                tooltip: {
                      iframe: true,
                      content: {
                        url: "http://demos.telerik.com/kendo-ui/content/web/tooltip/ajax/ajaxContent3.html"
                      },
                      width: 220,
                      height: 280
                }
            }]
        });
    </script>

### markers.tooltip.height `Number`*(default: Infinity)*

The height (in pixels) of the tooltip.

#### Example - set the height of the tooltip
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            markers: [{
                location: [42, 27],
                tooltip: {
                    height: 80,
                    content: "Foo"
                }
            }]
        });
    </script>

### markers.tooltip.width `Number`*(default: Infinity)*

The width (in pixels) of the tooltip.

#### Example - set the width of the tooltip
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            markers: [{
                location: [42, 27],
                tooltip: {
                    width: 80,
                    content: "Foo"
                }
            }]
        });
    </script>

### markers.tooltip.position `String`*(default: "top")*

The position relative to the target element, at which the tooltip will be shown. Predefined values are "bottom", "top", "left", "right", "center".

#### Example - set tooltip position
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            markers: [{
                location: [42, 27],
                tooltip: {
                    position: "left",
                    content: "Foo"
                }
            }]
        });
    </script>

### markers.tooltip.showAfter `Number`*(default: 100)*

Specify the delay in milliseconds before the tooltip is shown. This option is ignored if showOn is set to "click" or "focus".

#### Example - set show delay
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            markers: [{
                location: [42, 27],
                tooltip: {
                    showOn: "mouseenter",
                    showAfter: 1000,
                    content: "Foo"
                }
            }]
        });
    </script>

### markers.tooltip.showOn `String`*(default: "mouseenter")*

The event on which the tooltip will be shown. Predefined values are "mouseenter", "click" and "focus".

#### Example - show tooltip on mouse enter
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            markers: [{
                location: [42, 27],
                tooltip: {
                    showOn: "mouseenter",
                    content: "Foo"
                }
            }]
        });
    </script>

### minZoom `Number` *(default: 1)*

The minimum zoom level.
Typical web maps use zoom levels from 0 (whole world) to 19 (sub-meter features).

> The map [zoom](#configuration-zoom) is clamped to the [minZoom, maxZoom] interval.

#### Example - limit zoom out to level 3
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            minZoom: 3,
            zoom: 5
        });
    </script>

### maxZoom `Number` *(default: 19)*

The maximum zoom level.
Typical web maps use zoom levels from 0 (whole world) to 19 (sub-meter features).

> The map [zoom](#configuration-zoom) is clamped to the [minZoom, maxZoom] interval.

#### Example - limit zoom in to level 10
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            maxZoom: 10,
            zoom: 5
        });
    </script>

### minSize `Number` *(default: 256)*

The size of the map in pixels at zoom level 0.

### pannable `Boolean` *(default: true)*

Controls whether the user can pan the map.

#### Example - make the map non-pannable
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            center: [32.7758, -96.7966],
            zoom: 9,
            pannable: false
        });
    </script>

### wraparound `Boolean` *(default: true)*

Specifies whether the map should wrap around the east-west edges.

#### Example - disable map wrap-around
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            wraparound: false
        });
    </script>

### zoom `Number` *(default: 3)*

The initial zoom level.

Typical web maps use zoom levels from 0 (whole world) to 19 (sub-meter features).

The map size is derived from the zoom level and minScale options: `size = (2 ^ zoom) * minSize`

#### Example - setting initial zoom level
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            center: [32.7758, -96.7966],
            zoom: 9
        });
    </script>

### zoomable `Boolean` *(default: true)*

Controls whether the map zoom level can be changed by the user.

#### Example - make the map non-zoomable
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            center: [32.7758, -96.7966],
            zoom: 9,
            zoomable: false
        });
    </script>

## Methods

### center

Gets or sets the map center.
The setter is chainable, i.e. returns the map instance.

#### Parameters

##### center `Array|kendo.dataviz.map.Location`

The location of the new map center.
An array argument is assumed to be in [Latitude, Lonigude] order.

#### Returns

`kendo.dataviz.map.Location` The current map center.

#### Example - set the map center and zoom level
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });

        var map = $("#map").data("kendoMap");
        map.center([32.7758, -96.7966]).zoom(10);
    </script>

### destroy

Prepares the widget for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> This method does not remove the widget element from DOM.

#### Example - destroy the map and remove it from the DOM
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });

        var map = $("#map").data("kendoMap");
        map.destroy();

        $("#map").remove();
    </script>

### eventOffset

Returns the event coordinates relative to the map element.
Offset coordinates are not synchronized to a particular location on the map.

#### Parameters

##### e `Object|jQuery.Event`

The DOM or jQuery mouse event.

#### Returns

`kendo.geometry.Point` The event coordinates relative to the map element.

#### Example - position elements over widget on click
    <style>
        .box {
            position: absolute;
            display: block;
            width: 10px;
            height: 10px;
            margin: -5px 0 0 -5px;
            background: red;
        }
    </style>
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });

        var map = $("#map").data("kendoMap");
        $("#map").click(function(e) {
            var offset = map.eventOffset(e);
            $("<span class='box'></span>")
            .css({ top: offset.y, left: offset.x })
            .appendTo(map.element);
        });
    </script>

### eventToLayer

Retrieves projected (layer) coordinates that correspond to this mouse event.
Layer coordinates are absolute and change only when the zoom level is changed.

#### Parameters

##### e `Object|jQuery.Event`

The DOM or jQuery mouse event.

#### Returns

`kendo.geometry.Point` The projected (layer) coordinates that correspond to this mouse event.

#### Example - retrieve projected coordinates
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });

        var map = $("#map").data("kendoMap");
        $("#map").click(function(e) {
            var proj = map.eventToLayer(e);
            console.log("Projected coordinates: ", proj.toString());
        });
    </script>

### eventToLocation

Retrieves the geographic location that correspond to this mouse event.

#### Parameters

##### e `Object|jQuery.Event`

The DOM or jQuery mouse event.

#### Returns

`kendo.geometry.Point` The geographic location that correspond to this mouse event.

#### Example - place marker on clicked location
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });

        var map = $("#map").data("kendoMap");
        $("#map").click(function(e) {
            var loc = map.eventToLocation(e);
            map.markers.add({
                location: loc,
                tooltip: {
                    content: "Foo"
                }
            });
        });
    </script>

### eventToView

Retrieves relative (view) coordinates that correspond to this mouse event.
Layer elements positioned on these coordinates will appear under the mouse cursor.

View coordinates are no longer valid after a map [reset](#events-reset).

#### Parameters

##### e `Object|jQuery.Event`

The DOM or jQuery mouse event.

#### Returns

`kendo.geometry.Point` The relative (view) coordinates that correspond to this mouse event.

#### Example - position elements over map on click
    <style>
        .box {
            position: absolute;
            display: block;
            width: 10px;
            height: 10px;
            margin: -5px 0 0 -5px;
            background: red;
        }
    </style>
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });

        var map = $("#map").data("kendoMap");
        $("#map").click(function(e) {
            var view = map.eventToView(e);
            $("<span class='box'></span>")
            .css({ top: view.y, left: view.x })
            .appendTo(map.scrollElement);
        });
    </script>

### extent

Gets or sets the [map extent](/api/dataviz/map/extent) or visible area.
The setter is chainable, i.e. returns the map instance.

#### Parameters

##### extent `kendo.dataviz.map.Extent`
The new extent of the map.

#### Returns
`kendo.dataviz.map.Extent` The current map extent.

#### Example - get the map extent
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });

        var map = $("#map").data("kendoMap");
        var extent = map.extent();

        alert("North West corner: " + extent.nw.toString());
    </script>

#### Example - set the map extent to show Australia
      <div id="map"></div>
      <script>
        $("#map").kendoMap({
          zoom: 4,
          layers: [{
            type: "tile",
            urlTemplate: "http://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
            subdomains: ["a", "b", "c"],
            attribution: "© <a href='http://osm.org/copyright'>OpenStreetMap contributors</a>"
          }]
        });

        var aus = new kendo.dataviz.map.Extent(
          [-10.683333, 113.155],   // North West location
          [-39.138889, 153.638889] // South East location
        );

        $("#map").getKendoMap().extent(aus);
      </script>


### layerToLocation

Transforms layer (projected) coordinates to geographical location.

#### Parameters

##### point `Array|kendo.geometry.Point`

The layer (projected) coordinates.
An array argument is assumed to be in x, y order.

##### zoom `Number`

Optional. Assumed zoom level. Defaults to the current zoom level.

#### Returns

`kendo.dataviz.map.Location` The geographic location that corresponds to the layer coordinates.

#### Example - retrieve location of NW corner (Array)
    <div id="map" style="width: 1024px; height: 1024px;"></div>
    <script>
        $("#map").kendoMap({
            zoom: 1,
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });

        var map = $("#map").data("kendoMap");
        var loc = map.layerToLocation([0, 0]).round();
        console.log(loc.toString());
        // -180.000000,85.000000
    </script>

#### Example - retrieve location of NW corner (kendo.geometry.Point)
    <div id="map" style="width: 1024px; height: 1024px;"></div>
    <script>
        $("#map").kendoMap({
            zoom: 1,
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });

        var map = $("#map").data("kendoMap");
        var point = new kendo.geometry.Point(0, 0);
        var loc = map.layerToLocation(point).round();
        console.log(loc.toString());
        // -180.000000,85.000000
    </script>

### locationToLayer

Returns the layer (projected) coordinates that correspond to a geographical location.

#### Parameters

##### location `Array|kendo.dataviz.map.Location`

The geographic location.
An array argument is assumed to be in [Latitude, Lonigude] order.

##### zoom `Number`

Optional. Assumed zoom level. Defaults to the current zoom level.

#### Returns

`kendo.geometry.Point` The layer (projected) coordinates.

#### Example - retrieve the projected coordinates of a location (Array)
    <div id="map" style="width: 1024px; height: 1024px;"></div>
    <script>
        $("#map").kendoMap({
            zoom: 1,
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });

        var map = $("#map").data("kendoMap");
        var point = map.locationToLayer([0, 0]).round();
        console.log(point.toString());
        // 256,256
    </script>

#### Example - retrieve the projected coordinates of a location (kendo.dataviz.map.Location)
    <div id="map" style="width: 1024px; height: 1024px;"></div>
    <script>
        $("#map").kendoMap({
            zoom: 1,
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });

        var map = $("#map").data("kendoMap");
        var loc = new kendo.dataviz.map.Location(0, 0);
        var point = map.locationToLayer(loc).round();
        console.log(point.toString());
        // 256,256
    </script>

### locationToView

Returns the view (relative) coordinates that correspond to a geographical location.

#### Parameters

##### location `Array|kendo.dataviz.map.Location`

The geographic location.
An array argument is assumed to be in [Latitude, Lonigude] order.

#### Returns

`kendo.geometry.Point` The view coordinates that correspond to a geographical location.

#### Retrieves the view coordinates of the map center (Array)
    <div id="map" style="width: 1024px; height: 1024px;"></div>
    <script>
        $("#map").kendoMap({
            zoom: 3,
            center: [0, 0],
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });

        var map = $("#map").data("kendoMap");
        var view = map.locationToView([0, 0]).round();
        console.log(view.toString());
        // 512,512
    </script>

#### Retrieves the view coordinates of the map center (kendo.dataviz.map.Location)
    <div id="map" style="width: 1024px; height: 1024px;"></div>
    <script>
        $("#map").kendoMap({
            zoom: 3,
            center: [0, 0],
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });

        var map = $("#map").data("kendoMap");
        var loc = new kendo.dataviz.map.Location(0, 0);
        var view = map.locationToView(loc).round();
        console.log(view.toString());
        // 512,512
    </script>

### resize

Adjusts the widget layout to match the size of the container.

#### Example

    <div id="map" style="width: 512px; height: 512px;"></div>
    <script>
        $("#map").kendoMap({
            zoom: 3,
            center: [0, 0],
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });

        $("#map")
           .css({ width: "1024px", height: "1024px" })
           .data("kendoMap").resize();
    </script>

#### Parameters

##### force `Boolean` *optional*

Defines whether the widget should proceed with resizing even if the element dimensions have not changed.

### setOptions

Resets the map and applies new options over the current state.

#### Parameters

##### options `Object`

The new options to be applied.

#### Example - set map zoom & center simultaneously
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });

        var map = $("#map").data("kendoMap");
        map.setOptions({
            zoom: 10,
            center: [32.7758, -96.7966]
        });
    </script>

### viewSize

Retrieves the size of the visible portion of the map.

#### Returns

`Object` The size (width and height) of the visible portion of the map.

#### Example - retrieve view size
    <script>
        $("#map").kendoMap({
            zoom: 1, // Layer size is 512px (2^1 * 256)
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });

        var map = $("#map").data("kendoMap");
        var viewSize = map.viewSize();
        console.log(viewSize);
        // { width: 1024, height: 512 }
    </script>

### viewToLocation

Returns the geographical location that correspond to the view (relative) coordinates.

#### Parameters

##### point `Array|kendo.geometry.Point`

The view coordinates.
An array argument is assumed to be in x, y order.

##### zoom `Number`

Optional. Assumed zoom level. Defaults to the current zoom level.

#### Returns

`kendo.dataviz.map.Location` The geographic location that corresponds to the view coordinates.

#### Example - retrieve location corresponding to view center (Array)
    <div id="map" style="width: 1024px; height: 1024px;"></div>
    <script>
        $("#map").kendoMap({
            zoom: 3,
            center: [0, 0],
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });

        var map = $("#map").data("kendoMap");
        var loc = map.viewToLocation([512, 512]).round();
        console.log(loc.toString());
        // 0.000000,0.000000
    </script>

#### Example - retrieve location corresponding to view center (kendo.geometry.Point)
    <div id="map" style="width: 1024px; height: 1024px;"></div>
    <script>
        $("#map").kendoMap({
            zoom: 3,
            center: [0, 0],
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });

        var map = $("#map").data("kendoMap");
        var view = new kendo.geometry.Point(512, 512);
        var loc = map.viewToLocation(view).round();
        console.log(loc.toString());
        // 0.000000,0.000000
    </script>

### zoom

Gets or sets the map zoom level.
The setter is chainable, i.e. returns the map instance.

#### Parameters

##### level `Number`

The new zoom level. The value is clamped to the
 [[minZoom](#configuration-minZoom), [maxZoom](#configuration-maxZoom)] interval.

#### Returns

`Number` The current zoom level.

#### Example - zoom in
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            center: [32.7758, -96.7966]
        });

        var map = $("#map").data("kendoMap");
        zoom = map.zoom();
        map.zoom(zoom + 2);
    </script>

## Events

### beforeReset

Fired immediately before the map is reset.
This event is typically used for cleanup by layer implementers.

#### Event Data

##### e.sender `kendo.dataviz.ui.Map`

The source widget instance.

### click

Fired when the user clicks on the map.

#### Event Data

##### e.location `kendo.dataviz.map.Location`

The location of the clicked point.

##### e.sender `kendo.dataviz.ui.Map`

The source widget instance.

##### e.originalEvent `Object`

The source jQuery event instance

#### Example - place marker on clicked location
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            zoom: 3,
            center: [0, 0],
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            click: function(e) {
                e.sender.markers.add({
                    location: e.location,
                    tooltip: {
                        content: "Foo"
                    }
                });
            }
        });
    </script>

#### Example - subscribe to the click event after initialization
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            zoom: 3,
            center: [0, 0],
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });

        var map = $("#map").data("kendoMap");
        map.bind("click", function(e) {
            console.log("You clicked at " + e.location.toString());
        });
    </script>

### markerActivate

Fired when a marker has been displayed and has a DOM element assigned.

#### Event Data

##### e.marker `kendo.dataviz.map.Marker`

The marker instance.

##### e.layer `kendo.dataviz.map.Marker`

The marker layer instance.

##### e.sender `kendo.dataviz.ui.Map`

The source widget instance.

#### Example - Customize the marker DOM element
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "shape",
                dataSource: {
                    type: "geojson",
                    data: [{
                        "type": "Point",
                        "coordinates": [
                            [30, 10]
                        ]
                    }]
                }
            }],
            markerActivate: function(e) {
                e.marker.element.addClass("foo");
            }
        });
    </script>


### markerCreated

Fired when a marker has been created and is about to be displayed.
Cancelling the event will prevent the marker from being shown.

Use [markerActivate](#events-markerActivate) if you need to access the marker DOM element.

> Markers are automatically created for GeoJSON Point geometries. If the markerCreated event is cancelled a regular shape (circle) will be created instead.

#### Event Data

##### e.marker `kendo.dataviz.map.Marker`

The marker instance.

##### e.layer `kendo.dataviz.map.Marker`

The marker layer instance.

##### e.sender `kendo.dataviz.ui.Map`

The source widget instance.

#### Example - Draw a shape (circle) instead of a marker
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "shape",
                dataSource: {
                    type: "geojson",
                    data: [{
                        "type": "Point",
                        "coordinates": [
                            [30, 10]
                        ]
                    }]
                }
            }],
            markerCreated: function(e) {
                // Draw a shape (circle) instead of a marker
                e.preventDefault();
            }
        });
    </script>

### markerClick

Fired when a marker has been clicked or tapped.

#### Event Data

##### e.marker `kendo.dataviz.map.Marker`

The marker instance.

##### e.layer `kendo.dataviz.map.Marker`

The marker layer instance.

##### e.sender `kendo.dataviz.ui.Map`

The source widget instance.

### pan

Fired while the map viewport is being moved.

#### Event Data

##### e.origin `kendo.dataviz.map.Location`

The map origin (top left or NW corner).

##### e.center `kendo.dataviz.map.Location`

The current map center.

##### e.sender `kendo.dataviz.ui.Map`

The source widget instance.

##### e.originalEvent `Object`

The source jQuery event instance

#### Example - bind to the map pan event on initialization
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            zoom: 3,
            center: [0, 0],
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            pan: function(e) {
                console.log("pan to " + e.center.toString());
            }
        });
    </script>

#### Example - bind to the map pan event after initialization
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            zoom: 3,
            center: [0, 0],
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });

        var map = $("#map").data("kendoMap");
        map.bind("pan", function(e) {
            console.log("pan to " + e.center.toString());
        });
    </script>

### panEnd

Fires after the map viewport has been moved.

#### Event Data

##### e.origin `kendo.dataviz.map.Location`

The map origin (top left or NW corner).

##### e.center `kendo.dataviz.map.Location`

The map center.

##### e.sender `kendo.dataviz.ui.Map`

The source widget instance.

##### e.originalEvent `Object`

The source jQuery event instance

#### Example - bind to the map panEnd event on initialization
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            zoom: 3,
            center: [0, 0],
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            panEnd: function(e) {
                console.log("pan ended at " + e.center.toString());
            }
        });
    </script>

#### Example - bind to the map panEnd event after initialization
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            zoom: 3,
            center: [0, 0],
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });

        var map = $("#map").data("kendoMap");
        map.bind("panEnd", function(e) {
            console.log("pan ended at " + e.center.toString());
        });
    </script>

### reset

Fired when the map is reset.
This typically occurs on initial load and after a zoom/center change.

#### Event Data

##### e.sender `kendo.dataviz.ui.Map`

The source widget instance.

#### Example - bind to the map reset event on initialization
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            zoom: 3,
            center: [0, 0],
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            reset: function() {
                console.log("map reset");
            }
        });
    </script>

#### Example - bind to the map reset event after initialization
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            zoom: 3,
            center: [0, 0],
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });

        var map = $("#map").data("kendoMap");
        map.bind("reset", function(e) {
            console.log("map reset");
        });
    </script>

### shapeClick

Fired when a shape is clicked or tapped.

#### Event Data

##### e.layer `kendo.dataviz.map.layer.Shape`

The parent layer instance.

##### e.shape `kendo.drawing.Element`

The the shape instance.

##### e.sender `kendo.dataviz.ui.Map`

The source widget instance.

##### e.originalEvent `Object`

The source jQuery event instance

#### Example - bind to the map shapeClick event on initialization
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            zoom: 3,
            center: [0, 0],
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            shapeClick: function() {
                console.log("shape clicked");
            }
        });
    </script>

#### Example - bind to the map shapeClick event after initialization
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            zoom: 3,
            center: [0, 0],
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });

        var map = $("#map").data("kendoMap");
        map.bind("shapeClick", function(e) {
            console.log("shape clicked");
        });
    </script>

### shapeCreated

Fired when a shape is created, but is not rendered yet.

#### Event Data

##### e.layer `kendo.dataviz.map.layer.Shape`

The parent layer instance.

##### e.shape `kendo.drawing.Element`

The the shape instance.

##### e.sender `kendo.dataviz.ui.Map`

The source widget instance.

##### e.originalEvent `Object`

The source jQuery event instance

#### Example - bind to the map shapeCreated event on initialization
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            zoom: 3,
            center: [0, 0],
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            shapeCreated: function() {
                console.log("shape created");
            }
        });
    </script>

#### Example - bind to the map shapeCreated event after initialization
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            zoom: 3,
            center: [0, 0],
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });

        var map = $("#map").data("kendoMap");
        map.bind("shapeCreated", function(e) {
            console.log("shape created");
        });
    </script>

### shapeMouseEnter

Fired when the mouse enters a shape.

#### Event Data

##### e.layer `kendo.dataviz.map.layer.Shape`

The parent layer instance.

##### e.shape `kendo.drawing.Element`

The the shape instance.

##### e.sender `kendo.dataviz.ui.Map`

The source widget instance.

##### e.originalEvent `Object`

The source jQuery event instance

#### Example - bind to the map shapeMouseEnter event on initialization
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            zoom: 3,
            center: [0, 0],
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            shapeMouseEnter: function() {
                console.log("shape mouseenter");
            }
        });
    </script>

#### Example - bind to the map shapeMouseEnter event after initialization
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            zoom: 3,
            center: [0, 0],
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });

        var map = $("#map").data("kendoMap");
        map.bind("shapeMouseEnter", function(e) {
            console.log("shape mouseenter");
        });
    </script>

### shapeMouseLeave

Fired when the mouse leaves a shape.

#### Event Data

##### e.layer `kendo.dataviz.map.layer.Shape`

The parent layer instance.

##### e.shape `kendo.drawing.Element`

The the shape instance.

##### e.sender `kendo.dataviz.ui.Map`

The source widget instance.

##### e.originalEvent `Object`

The source jQuery event instance

#### Example - bind to the map shapeMouseLeave event on initialization
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            zoom: 3,
            center: [0, 0],
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            shapeMouseLeave: function() {
                console.log("shape mouseleave");
            }
        });
    </script>

#### Example - bind to the map shapeMouseLeave event after initialization
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            zoom: 3,
            center: [0, 0],
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });

        var map = $("#map").data("kendoMap");
        map.bind("shapeMouseLeave", function(e) {
            console.log("shape mouseleave");
        });
    </script>

### zoomStart

Fired when the map zoom level is about to change.
Cancelling the event will prevent the user action.

#### Event Data

##### e.sender `kendo.dataviz.ui.Map`

The source widget instance.

##### e.originalEvent `Object`

The source jQuery event instance

#### Example - bind to the map zoomStart event on initialization
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            zoom: 3,
            center: [0, 0],
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            zoomStart: function() {
                console.log("zoom start");
            }
        });
    </script>

#### Example - bind to the map zoomStart event after initialization
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            zoom: 3,
            center: [0, 0],
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });

        var map = $("#map").data("kendoMap");
        map.bind("zoomStart", function(e) {
            console.log("zoom start");
        });
    </script>

#### Example - cancel zoom
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            zoom: 3,
            center: [0, 0],
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            zoomStart: function(e) {
                e.preventDefault();
            }
        });
    </script>

### zoomEnd

Fired when the map zoom level has changed.

#### Event Data

##### e.sender `kendo.dataviz.ui.Map`

The source widget instance.

##### e.originalEvent `Object`

The source jQuery event instance

#### Example - bind to the map zoomEnd event on initialization
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            zoom: 3,
            center: [0, 0],
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            zoomEnd: function(e) {
                console.log("zoom end @ " + e.sender.zoom());
            }
        });
    </script>

#### Example - bind to the map zoomEnd event after initialization
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            zoom: 3,
            center: [0, 0],
            layers: [{
                type: "tile",
                urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });

        var map = $("#map").data("kendoMap");
        map.bind("zoomEnd", function(e) {
            console.log("zoom end @ " + e.sender.zoom());
        });
    </script>

