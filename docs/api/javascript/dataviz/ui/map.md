---
title: Map
page_title: Configuration, methods and events of Kendo UI DataViz Map
description: Learn how to configure Kendo UI Javascript chart widget in a few easy steps, use and change methods and events.
res_type: api
component: map
---

# kendo.dataviz.ui.Map

## Fields

### layers `Array`
The [Map layers](/api/javascript/dataviz/map/layer) ordered by index.


<div class="meta-api-description">
How to add a new layer to a Kendo UI map? Control and manipulate map layers by accessing the collection of layers where you can add new layers, remove existing ones, reorder them to change rendering priorities, iterate through all layers, and retrieve specific layers by their position or index in the display stack; this enables dynamic layer management, customizing map visuals, organizing data overlays, and adjusting layer order for map rendering and visualization purposes.
</div>

#### Example - accessing map layers
    <div id="map"></div>
    <script>
        var map = $("#map").kendoMap({
            center: [30.268107, -97.744821],
            zoom: 3,
            layers: [{
                type: "tile",
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        }).data("kendoMap");
        
        // Access the layers array
        console.log("Number of layers:", map.layers.length);
        console.log("First layer:", map.layers[0]);
    </script>

## Configuration

### center `Array|kendo.dataviz.map.Location`

The map center. Coordinates are listed as `[Latitude, Longitude]`.


<div class="meta-api-description">
How do I set the initial center point of a Kendo UI map widget? Adjust or specify the main geographical focal point of a map interface by setting its central coordinates in latitude and longitude degrees, enabling control over the initial viewpoint, repositioning, or panning to a desired location, centering the displayed area on a particular spot for map initialization, navigation, or dynamic recentering needs.
</div>

#### Example - setting the map center
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            center: [30.268107, -97.744821],
            zoom: 3,
            layers: [{
                type: "tile",
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });
    </script>

### controls `Object`

The configuration of built-in map controls.


<div class="meta-api-description">
How to customize zoom buttons on Kendo UI map? Configure and customize interactive map user interface elements including zoom buttons, attribution displays, and scale indicators by enabling or disabling controls, adjusting their positions, and setting specific options. Manage built-in map controls through a flexible configuration object to control visibility, layout, functionality, and user interaction features within the map interface, allowing precise setup of navigation tools, informational overlays, and scaling components according to application needs.
</div>

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
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });
    </script>

### controls.attribution `Boolean|Object` *(default: true)*

Configures or disables the built-in attribution control.


<div class="meta-api-description">
How do I customize map credits and attribution displays in Kendo UI for jQuery? Configure, enable, disable, or customize map credits and attribution displays on interactive maps, controlling visibility of source acknowledgments, copyright notices, and credit panels. Manage how map source information, copyright text, and attribution details appear or are hidden, adjusting styling, presence, or content of credit annotations during map setup or runtime. Control, toggle, or modify built-in attribution elements to ensure proper acknowledgment of map data providers while tailoring the display or removal of credit information on your map interface.
</div>

#### Example - hide the attribution control
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            controls: {
                attribution: false
            },
            layers: [{
                type: "tile",
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
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


<div class="meta-api-description">
How do I adjust the position of attribution controls in a Kendo UI map? Set or adjust the placement and alignment of copyright, attribution, or source credit controls on a map interface by choosing their display position in any corner such as top left, top right, bottom right, or bottom left. Control where the attribution label, acknowledgments, or legal credits appear visually on the map to customize UI layout, optimize user interface placement, or comply with legal requirements by positioning attribution indicators or text on map corners. Configure, enable, or modify the location of map source acknowledgment boxes or credit panels by specifying their placement within the map frame’s corners for tailored map control arrangement and user experience.
</div>

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
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });
    </script>

### controls.navigator `Boolean|Object` *(default: true)*

Configures or disables the built-in navigator control (directional pad).


<div class="meta-api-description">
How can I enable or disable the navigator control in a Kendo UI map widget? Control, configure, enable, or disable the directional pad navigation interface on maps to manage user interaction with map panning and movement controls, including toggling visibility, customizing navigation behaviors, adjusting the on-screen navigator buttons, and setting how users can move the map via directional inputs during initialization or runtime.
</div>

#### Example - hide the navigator control
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            controls: {
                navigator: false
            },
            layers: [{
                type: "tile",
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
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


<div class="meta-api-description">
How to position the navigator control on a Kendo UI map? Control the placement and layout of the navigator control on a map interface by configuring its position to any corner, including top left, top right, bottom left, or bottom right. Adjust, set, or customize where navigation elements appear on the map, such as repositioning controls for better user interaction or UI design. Enable precise control over the navigator’s alignment within map boundaries, allowing developers to specify corner placements and optimize user navigation accessibility or aesthetics. Positioning navigator controls at different edges or corners enhances usability, supports responsive design layouts, and integrates seamlessly with map customization or control arrangement requirements.
</div>

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
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });
    </script>

### controls.zoom `Boolean|Object` *(default: true)*

Configures or disables the built-in zoom control (+/- button).


<div class="meta-api-description">
How do I customize the zoom controls on a Kendo UI map? Adjust zoom interface settings including enabling, disabling, showing, hiding, or customizing the zoom buttons and controls on a map's user interface to manage map zoom level interactions through built-in or programmatic options for zoom in, zoom out, or zoom control visibility toggling.
</div>

#### Example - hide the zoom control
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            controls: {
                zoom: false
            },
            layers: [{
                type: "tile",
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
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


<div class="meta-api-description">
How to adjust the position of zoom controls on a Kendo UI map? Adjust, set, or configure the placement and alignment of zoom controls on a map interface to any corner such as top left, top right, bottom left, or bottom right for consistent user interface layout and responsive design. Enable repositioning of zoom buttons for improved accessibility, user experience, and customized map control arrangements, supporting UI adjustments, layout control, and flexible placement of zoom functionalities within map components.
</div>

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
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });
    </script>

### layerDefaults `Object`

The default configuration for map layers by type.


<div class="meta-api-description">
How to set default settings for multiple map layers in Kendo UI Map? Set or customize common default settings and shared configurations for different map layer types such as tile layers, shape layers, marker layers, or other map data visuals to apply consistent styling, behavior, or properties across multiple layers; control or define baseline options for layers that automatically apply unless specifically overridden, enabling uniform layer appearance, interaction parameters, rendering preferences, or data source defaults during map initialization or setup; manage default attributes for groups of map layers to simplify configuration and ensure consistent map visualization across various layer categories.
</div>

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
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });
    </script>

### layerDefaults.marker `Object`

The default configuration for marker layers.


<div class="meta-api-description">
How do I customize default marker settings in Kendo UI for jQuery Map? Configure, customize, or control the default settings, styles, or behavior for all markers across multiple marker layers within a map interface, including appearance, icons, size, color, interactivity, and other common marker attributes that apply globally unless individually overridden per layer, enabling consistent marker presentation, default icon settings, or uniform interaction options during map initialization and rendering across marker collections.
</div>

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
For example "pinTarget" is rendered as "k-i-marker-pin-target".


<div class="meta-api-description">
How do I customize the default marker shape styles in Kendo UI Map? Configure default marker shape styles and appearances for all marker layers on a map, controlling visual marker icons like pins, target pins, or other marker forms through customizable CSS class assignments; set or change marker symbols globally to unify map markers across layers, adjust shape types such as pinTarget or pin for consistent marker styling, and control map marker designs with flexible shape options to influence how markers are rendered and displayed within different map layers or geographic data points.
</div>

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


<div class="meta-api-description">
How do I customize tooltip settings for all marker layers on a Kendo UI map? Configure default tooltip settings for all marker layers on a map to control how tooltips display across markers, including customizing content text, HTML templates, placement and positioning relative to markers, show and hide triggers and delays, animation effects for appearance, styling options like colors and fonts, and behavior consistency across multiple marker groups. Enable or set global tooltip defaults for marker points to ensure uniform hover or click information popups, allowing developers to easily manage the appearance and interactivity of tooltips on map markers without repetitive individual configurations. Adjust tooltip templates and behavior to suit diverse use cases such as dynamic content display, custom animations, delayed show/hide timing, or specific position anchoring on all markers within layered map components.
</div>

#### Example - configuring marker tooltip defaults
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layerDefaults: {
                marker: {
                    tooltip: {
                        autoHide: false,
                        showOn: "click",
                        template: (data) => `<strong>${data.title}</strong><br/>${data.description}`,
                        position: "top"
                    }
                }
            },
            layers: [{
                type: "marker",
                locationField: "latlng",
                titleField: "title",
                dataSource: {
                    data: [{
                        latlng: [42.6977, 23.3219],
                        title: "Sofia",
                        description: "Capital of Bulgaria"
                    }]
                }
            }]
        });
    </script>

### layerDefaults.marker.tooltip.autoHide `Boolean`*(default: true)*

Specifies if the tooltip will be hidden when mouse leaves the target element. If set to false a close button will be shown within tooltip. If set to false, showAfter is specified and the showOn is set to "mouseenter" the Tooltip will be displayed after the given timeout even if the element is no longer hovered.


<div class="meta-api-description">
How to configure Kendo UI map marker tooltips to automatically hide on mouse leave? Configure marker tooltip visibility on maps to automatically hide when the cursor leaves or remain visible with a manual close option, enabling control over tooltip behavior on mouse leave events, including settings to toggle auto-hide true or false, delay-based showing after mouse enter, and managing user interactions with tooltip persistence or dismissal on map markers.
</div>

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


<div class="meta-api-description">
How to animate Kendo UI map marker tooltips? Control and customize tooltip animation effects for map markers by enabling, disabling, or specifying a set of animation sequences; manage how marker tooltips appear and disappear with smooth animated transitions or turn off all tooltip animations entirely to create static, non-animated tooltip behavior on map markers.
</div>

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


<div class="meta-api-description">
How to customize the animation when closing map marker tooltips in Kendo UI for jQuery? Configure or customize the closing animation for map marker tooltips to control how tooltip pop-ups fade out, disappear, or animate when hiding, allowing developers to set exit transitions, timing, visual effects, and smooth dismissal behavior for interactive map markers and their informational overlays. Adjust, enable, or modify animation properties for tooltip closure on markers to create seamless user experiences for hiding tooltip content upon user interaction, map events, or programmatic controls.
</div>

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


<div class="meta-api-description">
How do I customize the closing animation effect for tooltips on map markers in Kendo UI? Control or configure the closing animation effect or transition for tooltips on map markers, including setting animation names, customizing dismiss or hide effects, enabling or disabling visual fade or slide out sequences, specifying animation parameters for tooltip closure, or adjusting how marker pop-up hints disappear smoothly or instantly.
</div>

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


<div class="meta-api-description">
How do I adjust the animation duration for closing map marker tooltips in Kendo UI? Adjust the timing and speed of marker tooltip closing animations on a map by configuring the duration for how long the tooltip fade-out or disappearance effect takes. This setting controls the close animation interval, enabling developers to set, customize, or fine-tune the responsiveness and smoothness of tooltip hiding behavior for map markers. It affects how quickly tooltips vanish after user interaction, improving user experience by managing animation length, exit timing, and visual flow when tooltips are dismissed or hidden on interactive map elements.
</div>

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


<div class="meta-api-description">
How do I customize the animation effect when opening a marker tooltip on a Kendo UI Map? Control and customize the appearance animations for marker tooltips on maps by configuring how tooltip pop-ups open, including setting animation effects, adjusting animation duration, enabling smooth transitions or disabling opening animations entirely, managing tooltip fade-ins or slide effects, and tailoring the visual entrance behavior of informational markers on geographic interfaces to enhance user interaction and visual feedback.
</div>

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


<div class="meta-api-description">
How do I customize the opening animation effect of marker tooltips in Kendo UI for jQuery map layer? Customize and configure how marker tooltips animate when appearing on a map, including setting the opening animation style, transition effects, motion patterns, and visual behaviors for tooltip popups linked to map markers. Enable or adjust various animation effects for tooltip appearance, such as fade-ins, slides, zooms, and other entry animations, controlling the dynamic presentation and user experience when marker tooltips open on interactive maps. This covers setting specific animation names, effect configurations, and animation parameters to tailor tooltip opening sequences for markers within map layers.
</div>

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


<div class="meta-api-description">
How do I set the duration of the opening animation for a marker tooltip on a Kendo UI map? Set or configure the duration time for the opening animation of marker tooltips on a map, controlling how long the tooltip fade-in, slide-in, or reveal effect takes in milliseconds; customize, adjust, or fine-tune the timing for marker popup animations to enhance user interaction, responsiveness, or visual feedback when tooltips appear on markers, including setting animation length, speed, or transition duration for marker info windows or hover tooltips on map layers.
</div>

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


<div class="meta-api-description">
How do I customize the content shown in marker tooltips on a Kendo UI map? Customize the text or dynamic content shown inside marker tooltips on a map by specifying static strings or functions that generate tooltip text based on marker data or context, enabling control over what information appears when hovering or interacting with map markers, overriding default behavior that uses the marker's title attribute, and supporting scenarios like displaying custom labels, dynamic info popups, or contextual details within map pins or markers.
</div>

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


<div class="meta-api-description">
How do I load dynamic HTML content into Kendo UI map marker tooltips using a URL? Configure dynamic or remote HTML content loading into map marker tooltips by specifying a URL string or request options for AJAX or fetch calls, enabling tooltips to retrieve and display external data, HTML snippets, or API responses seamlessly. Control loading tooltip content via URLs, endpoints, or web resources, supporting different protocols and allowing embedding through iframes or AJAX configurations, useful for interactive maps needing dynamic popups, customizable marker details, or content fetched from servers or REST APIs. Enable tooltips to fetch, display, or update marker information from remote sources, supporting dynamic, asynchronous data integration within map layers and markers.
</div>

#### Example - load content from remote URL
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layerDefaults: {
                marker: {
                    tooltip: {
                          content: {
                            url: "https://demos.telerik.com/kendo-ui/content/web/tooltip/ajax/ajaxContent3.html"
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


<div class="meta-api-description">
How do I customize the tooltip template for interactive map markers in Kendo UI for jQuery? Customize interactive map marker tooltips with flexible HTML or text templates, enabling dynamic content rendering using a templating system that accesses marker details and geographical coordinates. Control tooltip appearance and content by defining custom templates that leverage location data and marker properties, replacing static content with personalized information displays. Configure, set, or enable tooltip templates to enhance map markers with context-aware messages, descriptions, or data-driven text, supporting advanced formatting, embedded variables, and conditional content for tooltips on map markers.
</div>

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


<div class="meta-api-description">
How to show or hide the callout arrow in a Kendo UI map marker tooltip? Configure the visibility of the small pointer or arrow connecting the tooltip to map markers, enabling control over whether the marker's tooltip displays its callout indicator, callout arrow, or connector on the map interface; toggle, show, hide, enable, or disable this callout pointer to customize marker tooltip appearance and behavior in various mapping layers or components.
</div>

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


<div class="meta-api-description">
How to embed HTML or external web content in map marker tooltips using Kendo UI for jQuery? Control embedding HTML or external web content inside map marker tooltips by enabling or disabling an iframe container to isolate tooltip content, manage cross-origin security constraints, and customize rendering behavior; toggle iframe usage to either encapsulate dynamic or third-party content within an iframe for sandboxing and preventing style or script conflicts, or render tooltip content inline for simpler integration and performance considerations, supporting various approaches to displaying rich, interactive, or external data within map annotations and popups.
</div>

#### Example - load content from remote URL
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layerDefaults: {
                marker: {
                    tooltip: {
                          iframe: true,
                          content: {
                            url: "https://demos.telerik.com/kendo-ui/content/web/tooltip/ajax/ajaxContent3.html"
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


<div class="meta-api-description">
How can I change the height of map marker tooltips in Kendo UI for jQuery? Adjust or configure the vertical dimension, size, or height of map marker tooltips in pixels to customize the tooltip's display area, appearance, or layout on geographic or interactive maps. Enable precise control over tooltip box height, setting exact numeric values to manage how marker annotations, labels, or popups appear above map pins or icons, supporting visual clarity, UI customization, or responsive design needs for map layers and overlays.
</div>

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


<div class="meta-api-description">
How to set the width of marker tooltips in Kendo UI Map layer? Configure or set the pixel width of marker tooltips on a map to control the size, layout, and text wrapping of pop-up information bubbles associated with map markers. Adjusting tooltip width helps manage how much space the tooltip occupies, ensuring labels or descriptions fit neatly without overflow or truncation. Customize or control the horizontal dimension of marker tooltips for improved readability and consistent presentation of tooltip content on map layers by specifying exact pixel values. This setting is useful for optimizing the display of hover or click information on geographical markers, allowing users to tailor tooltip appearance for clarity and design needs.
</div>

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


<div class="meta-api-description">
How can I customize the placement of tooltips on markers in a Kendo UI map? Adjust or configure the placement of map marker tooltips by setting the tooltip’s position relative to its associated marker or target, enabling control over whether the tooltip appears above, below, left, right, or centered on the marker; customize tooltip alignment to improve map data visibility, control popup placement for markers, specify tooltip orientation for better user interaction, or set tooltip anchor points for precise positioning around map pins or markers.
</div>

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


<div class="meta-api-description">
How to delay showing map marker tooltips in Kendo UI for jQuery? Set or adjust the delay time before a map marker's tooltip appears on hover, configuring how many milliseconds to wait before showing the tooltip popup. Control the tooltip display timing for markers when triggered by mouse hover, enabling or customizing the pause duration before the tooltip becomes visible, while noting that this timing does not apply to tooltips activated by click or keyboard focus events. Configure, enable, or modify the hover delay for marker tooltips on maps to enhance user interaction responsiveness and tailor tooltip appearance timing for better UI feedback.
</div>

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


<div class="meta-api-description">
How can I configure tooltips to appear when users interact with markers on a Kendo UI map? Control the display of marker tooltips on maps by configuring the interaction triggers such as hover, click, or keyboard focus events. Enable tooltips to appear when users mouse over markers, click them, or navigate via keyboard focus, allowing customization of the user experience for marker information visibility. Adjust settings to show or hide tooltips based on user actions like mouseenter, click, or focus events to tailor interactivity and accessibility on interactive map markers.
</div>

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

The opacity of all marker layers.


<div class="meta-api-description">
How to set global transparency for all markers on a Kendo UI Map control? Adjust marker transparency or translucency across all markers in the map by configuring opacity levels, controlling how see-through or solid the marker icons appear, setting global transparency for marker layers, modifying visual marker clarity, enabling consistent alpha blending for markers, customizing marker layer visibility intensity, tuning marker translucence during map setup, applying uniform opacity to all marker elements, and controlling the overall fade or brightness effect of markers displayed on the map interface.
</div>

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


<div class="meta-api-description">
How to set default styles for all shape layers in a Kendo UI map? Set or customize default visual styles, interaction behaviors, rendering options, and appearance settings for all shape layers within a map component, enabling consistent configuration of polygons, lines, or other vector shapes on maps without needing to specify options for each individual layer unless specific overrides are desired.
</div>

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


<div class="meta-api-description">
How to set default attribution text for all shape layers in Kendo UI Map? Configure default source credit, copyright notice, or attribution text and HTML for all shape layers on the map, enabling consistent display of data ownership, source references, licensing information, or credits across every polygon, line, or point layer. Control and set uniform label strings or HTML snippets that identify data providers or copyright holders for shape-based map visuals, ensuring unified acknowledgment and source recognition for all geographic features within the map’s shape layers.
</div>

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

The opacity of all shape layers.


<div class="meta-api-description">
How to set default opacity for map shape layers in Kendo UI for jQuery? Control the overall transparency level for map shape layers, adjusting default opacity to make polygons, circles, or other geometric shapes more transparent or solid; configure shape fill transparency globally to enhance map readability, highlight features, or blend shapes seamlessly with base maps, enabling setting default translucency for multiple vector shape layers and controlling visual prominence of map overlays through opacity adjustments during map setup or runtime.
</div>

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


<div class="meta-api-description">
How to customize default shape appearance in Kendo UI Map? Control and customize the default appearance of all shapes on the map by setting visual attributes such as fill color, stroke thickness, opacity levels, line patterns, and overall shape styling. Adjust the presentation and uniform styles of shapes, polygons, and vector layers to ensure consistent rendering and visual coherence across map features, enabling configuration of default graphical properties for shapes, including borders, fills, transparency, and stroke settings to achieve desired aesthetics or thematic mapping effects.
</div>

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


<div class="meta-api-description">
How to set default fill color for vector shapes on a map layer in Kendo UI? Configure the default fill color and style for vector shapes on map layers, enabling control over the shape's interior appearance including solid colors, gradients, opacity levels, and CSS color formats like hex codes, RGB or RGBA values, and named colors; customize how polygons, polygons, and other vector shapes are visually filled by setting or adjusting fill styles, colors, transparency, or gradient effects to define map layer shape rendering and appearance consistently across the component.
</div>

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


<div class="meta-api-description">
How to customize the default fill color for vector shapes in a Kendo UI Map layer? Control and customize the default fill color for vector shapes within map layers by specifying any valid CSS color formats such as hex codes, RGB, RGBA, HSL, or named colors to unify or override the appearance of polygons, circles, or other vector features; configure, set, or style shape fill colors consistently across map layers for thematic mapping, visual distinction, or UI customization in mapping applications.
</div>

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


<div class="meta-api-description">
How to adjust the default transparency of map layer fills in Kendo UI for jQuery? Adjust, configure, or set the default transparency level of shape fills within map layers by controlling the opacity value, specifying how visible or see-through shape backgrounds appear on maps, with options ranging from completely transparent to fully solid fill colors; manage fill alpha intensity for shapes in mapping layers to customize visual appearance, enhance map readability, or create overlay effects by fine-tuning fill opacity using numeric values between zero and one.
</div>

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


<div class="meta-api-description">
How can I customize the outline appearance of shapes on a map layer using Kendo UI for jQuery? Control and customize the outline appearance for shapes on map layers by configuring border color, stroke style, thickness, dash patterns, and opacity. Adjust or set default line colors and stroke attributes for vector shapes on maps to define shape edges, borders, and outlines with CSS color values or advanced stroke properties. Enable styling of map shape borders including solid, dashed, or custom stroke effects to influence how boundaries and outlines appear in rendered map layers. Manage shape edge styling on geographic layers by specifying stroke color, width, line join, and other visual parameters to enhance map visualization and highlight shape perimeters.
</div>

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


<div class="meta-api-description">
How to set default outline color of shapes on map layers using Kendo UI for jQuery? Control and customize the default outline color of shapes on map layers by specifying the stroke color using any valid CSS color format such as hexadecimal codes, RGB values, or color names, enabling precise styling of shape borders and outlines for map visuals, including setting border colors, adjusting line hues around polygons, paths, and other vector shapes on map layers to achieve consistent or dynamic map layer appearance.
</div>

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


<div class="meta-api-description">
How do I change the dash pattern for shapes on a Kendo UI map layer? Control and configure the stroke dash pattern or line style for shapes rendered in map layers, enabling selection among various dashed line options such as dashed, dotted, dash-dot sequences, long dashes, and combinations like long dash-dot or long dash-dot-dot, as well as solid lines, to customize border styling, line appearance, pattern repetition, and visual differentiation of shape outlines on maps.
</div>

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


<div class="meta-api-description">
How to adjust the opacity of shape outlines in Kendo UI map layers? Adjust or configure the transparency level, alpha, or opacity of shape outlines and borders on map layers to control how visible or faint the stroke or contour appears, enabling settings for outline translucency using numeric values ranging from fully transparent (0) to fully opaque (1) for map shapes and polygons, allowing customization of stroke visibility, border clarity, and layer edge brightness to enhance map visual styling and layer differentiation during map rendering or initialization.
</div>

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


<div class="meta-api-description">
How do I set default stroke width for vector shapes in Kendo UI map layers? Adjust or configure the default border thickness, outline width, or line weight for vector shapes within map layers to control stroke thickness applied by default, enabling consistent shape edge appearance across all rendered vector objects; this setting governs the baseline stroke width that can be overridden for individual layers or shapes, useful for customizing map visualization, styling feature outlines, controlling line thickness, or setting default vector layer shape borders during map setup and rendering processes.
</div>

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


<div class="meta-api-description">
How to configure default bubble map layer settings globally in Kendo UI for jQuery? Configure global default settings for all bubble map layers including visual styles like size, scale, color, opacity, label formatting, and tooltip behavior; control data binding defaults and interactive features such as hover effects or click responses to streamline appearance and functionality across multiple bubble layers, enabling consistent styling, scaling parameters, and unified interactivity options without repetitive manual adjustments during map setup or dynamic updates.
</div>

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


<div class="meta-api-description">
How do I customize the default attribution for all bubble layers in a Kendo UI Map widget? Configure or set the default credit text, source acknowledgment, or HTML markup displayed on all bubble layers within a map visualization, ensuring consistent attribution, copyright notices, source references, or legal disclaimers appear automatically for every bubble data layer. Control how source credits, copyright information, or data provider acknowledgments are presented collectively across all bubble overlays, markers, or thematic bubbles, enabling uniform labeling, metadata display, or copyright tags for geographical bubble representations. Customize or enable default annotations, source footers, or narrative credit elements tied to bubble map layers, helping maintain transparent data provenance and source documentation throughout bubble-driven visual layers.
</div>

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

The opacity of all bubble layers.


<div class="meta-api-description">
How can I control the transparency of bubble map layers in Kendo UI for jQuery? Control and adjust the transparency level or opacity of bubble map layers to make all bubbles more or less see-through, translucent, or fully opaque for visual emphasis, layering, styling, and clarity in map visualizations. Configure opacity settings for bubble markers simultaneously to ensure consistent visual prominence, fine-tune the see-through effect, manage overlapping bubbles, or customize the map’s bubble layer presentation for clarity and aesthetic preferences. Set or modify bubble transparency globally during map initialization or dynamically control bubble layer opacity for better visualization, highlight specific data points, or reduce clutter on interactive maps with bubble markers.
</div>

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


<div class="meta-api-description">
How do I limit the size of bubble markers in a Kendo UI map visualization? Adjust or set the upper limit for the size of bubble markers or circles in map visualizations to control how large data-driven bubbles can appear, constrain maximum scaling of bubble symbols during rendering, define the biggest radius or diameter for bubble overlays on geographic maps, configure the maximum display size for proportional symbols representing data points in map layers, limit bubble size to prevent oversized markers in map visual components, manage the scale cap for visual elements that represent data densities or values with varying circle sizes on maps, fine-tune or restrict bubble symbol growth based on data metrics to maintain visual clarity, set boundaries on symbol sizing to optimize map readability with large or outlier data values, control or cap the maximum bubble dimension in mapping libraries for dynamic data-driven visualization layers, and enable consistent visual scaling of bubbles on spatial maps by specifying the size ceiling for bubble symbols.
</div>

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


<div class="meta-api-description">
How do I prevent bubble markers from shrinking below a certain size on my Kendo UI map? Control and configure the minimum size of bubble markers on a map layer to avoid bubbles shrinking below a specified threshold during scaling, ensuring visibility and preventing excessively small symbols regardless of data values. Enable setting a smallest bubble diameter or radius for map visualizations, adjust marker minimum dimensions to maintain clarity when scaling numeric or proportional data, and manage symbol size constraints to balance between accurate data representation and legibility. This feature helps maintain minimum marker sizes for bubble charts or proportional symbols on geospatial maps, supporting customization of the smallest rendered bubble size to prevent markers from disappearing or becoming visually insignificant.
</div>

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


<div class="meta-api-description">
How do I customize the default style of bubble symbols on a Kendo UI map layer? Control and customize the default visual style of bubble symbols on map layers, including setting fill colors, transparency levels, border colors and thickness, and overall symbol appearance to ensure consistent bubble visualization when individual bubbles lack specific styling, enabling configuration of default bubble fill, opacity, stroke styles, outlines, color schemes, and fallback graphical attributes for map bubbles.
</div>

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


<div class="meta-api-description">
How do I set the default fill color for map bubble layer symbols in Kendo UI Map? Set or customize the default fill color, pattern, or gradient for map bubble layer symbols, enabling control over the visual styling, appearance, and color of data-driven bubbles on maps. Configure solid colors, CSS color strings, or advanced fill options to style bubble markers, adjust transparency, hues, or gradients for thematic mapping, choropleth effects, or dynamic visualization of bubble layers. This styling option supports setting fills for bubbles representing data points on maps to enhance map readability, theming, and user interface design in interactive or static mapping applications.
</div>

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


<div class="meta-api-description">
How do I change the default fill color of bubble markers in a Kendo UI map? Configure or customize the default fill hue, shade, or tint for bubble layer markers, points, or symbols on maps, specifying colors using CSS formats like hex codes, RGB values, or named colors. Enable setting, changing, or overriding the baseline bubble fill appearance to control visual styling, theming, or color schemes for geographical data points, including options for solid colors, custom palettes, and dynamic color assignments in mapping applications.
</div>

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


<div class="meta-api-description">
How do I set the opacity of map bubble markers in Kendo UI for jQuery? Control or adjust the transparency, alpha, or opacity level of map bubble markers or symbols by setting the default fill opacity value ranging from fully transparent to fully opaque; customize or configure the bubble fill transparency globally for all bubbles on a map layer during initialization to achieve visual effects like translucency, see-through symbols, or blending with the map background, enabling developers to set or modify bubble styling, symbol visibility, or layer appearance with precise control over the opacity intensity or transparency percentage.
</div>

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


<div class="meta-api-description">
How do I customize the default border color of bubble markers in a Kendo UI map layer? Configure and customize the default border or outline color, thickness, and style of circular markers or bubble symbols on map layers, controlling their stroke appearance using CSS color values or detailed styling objects to change how bubble outlines look by setting colors, borders, strokes, or outlines for map visualization elements when initializing or updating maps.
</div>

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


<div class="meta-api-description">
How do I change the default outline color of bubble symbols in a Kendo UI map? Configure the default outline color for bubble symbols on maps, controlling the stroke or border color of circle or bubble layers using any CSS-compatible color format such as hexadecimal, RGB, or named colors. Adjust, set, or customize the edge color around map bubbles, circles, or markers to define visual emphasis, styling, or theming of map data layers during initialization or map setup. This coloring option affects how bubble outlines appear, enabling control over highlight colors, contrast, or visual clarity of bubble symbols in geospatial visualization or mapping applications.
</div>

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


<div class="meta-api-description">
How to customize dash pattern for bubble layer outlines in Kendo UI Map? Configure and customize the default stroke dash pattern for bubble layer outlines on maps, enabling control over the appearance of outline styles such as dashed lines, dotted lines, dash-dot sequences, long dash variants, and solid continuous strokes. Adjust or set the outline pattern to enhance visual differentiation of map symbols, including options for dash, dot, dash-dot, long dash, and combinations of dash-dot-dot styles, allowing precise control over how outlines are rendered for bubble elements or polygon edges in layered geographic visualizations. Customize line patterns for map layer boundaries and symbol strokes to match specific design requirements, improve map readability, or create distinctive visual effects in mapping applications.
</div>

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


<div class="meta-api-description">
How to set default opacity of bubble layer borders in Kendo UI Map widget? Adjust the transparency level of outline strokes for circular map markers by setting the default opacity of bubble layer borders, enabling control over bubble outline visibility from fully transparent to fully opaque with decimal values between 0 and 1, allowing customization of the stroke’s fade, translucency, or thickness appearance for map bubble symbols, configuring edge clarity, outline strength, or border transparency in geographic visualizations, managing how prominently bubble edges are displayed against map backgrounds, and fine-tuning visual emphasis or subtlety of bubble outlines through stroke opacity settings.
</div>

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


<div class="meta-api-description">
How do I adjust the stroke width of bubble outlines in a Kendo UI map layer? Adjust or customize the thickness, width, or weight of bubble outlines or borders on map layers, configure default stroke or border width for bubble symbols in mapping visualizations, set or control the thickness of bubble layer outlines globally or per feature, modify the contour or edge width around bubbles to emphasize or de-emphasize them, define or tune the outline stroke size in map bubbles for better visibility or style consistency during map setup or runtime adjustments.
</div>

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


<div class="meta-api-description">
How do I customize the default bubble shape in Kendo UI Map? Configure or set the default visual shape for bubble map layers by choosing common geometric symbols like circles or squares, or enable advanced customization with user-defined functions that control bubble rendering, shape design, size, style, data-driven appearance, and precise positioning on the map layer. Customize bubble icons, markers, or points on the map using predefined or programmatically generated symbol shapes, adjusting appearance dynamically based on data attributes or geographic location, supporting various styles, sizes, and interactive visual mappings to tailor how data bubbles display and behave in map visualizations.
</div>

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


<div class="meta-api-description">
How to adjust the size of individual map tiles in Kendo UI for jQuery? Adjust the pixel dimensions or resolution of individual map tiles to control the size, layout, and clarity of tile-based map layers during rendering, enabling customization of tile width and height to optimize display quality, performance, zoom levels, and map responsiveness when configuring or setting tile parameters for tiled map imagery.
</div>

#### Example - setting default tile size
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layerDefaults: {
                tileSize: 512
            },
            layers: [{
                type: "tile",
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });
    </script>

### layerDefaults.tile `Object`

The default configuration for tile layers.


<div class="meta-api-description">
How do I configure default tile layer settings in Kendo UI Map? Set default options and shared configurations for all map tile layers, including URL templates for loading tiles, attribution text for tile sources, tile size dimensions, and subdomain settings to optimize tile requests. Control global behaviors of tile layers such as customizing the source URL patterns, managing tile loading parameters, applying consistent display settings, and enabling overrides for individual tiles or layers. Configure default properties that affect how map tiles are fetched, rendered, and attributed across multiple layers, allowing easy customization and uniform management of tile data sources, caching strategies, and visual presentation on maps with multiple tile overlays. Use default tile layer settings to streamline repetitive options like tile URLs, attribution notices, tile dimensions, and request patterns, supporting flexible per-layer adjustments.
</div>

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
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png"
            }]
        });
    </script>

### layerDefaults.tile.urlTemplate `String`

The URL template for tile layers. Template variables:

* x - X coordinate of the tile
* y - Y coordinate of the tile
* zoom - zoom level
* subdomain - Subdomain for this tile. See [subdomains](/api/javascript/dataviz/ui/map/configuration/layers.subdomains)


<div class="meta-api-description">
How do I customize the URL pattern for map tile requests in Kendo UI Map? Customize and configure how map tile URLs are generated by specifying URL patterns that dynamically replace coordinates, zoom levels, and optional subdomains to control tile image requests for map layers, enabling flexible integration with various tile servers by setting templates that handle x, y, zoom, and subdomain variables for fetching and displaying map tiles efficiently across different zoom levels and tile grids.
</div>

#### Example - set default URL template for all tile layers
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layerDefaults: {
                tile: {
                    urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
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


<div class="meta-api-description">
How can I customize the attribution information for Kendo UI's map tile layers? Configure or customize the credit and copyright information displayed for map tile layers, control attribution text for all default map tiles, set provider acknowledgments such as OpenStreetMap or Mapbox copyright notices, manage legal and licensing credits shown on tile layers, adjust the visible source or ownership labels for background maps, enable or modify the text giving credit to map data providers, handle the display of source attributions for default map tiles, ensure compliance with map tile licensing by setting proper credit strings, control the attribution labels presented with base tile layers, and set or update copyright or source credits shown in default online map layers.
</div>

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
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png"
            }]
        });
    </script>

### layerDefaults.tile.subdomains `Array`

The subdomain of all tile layers.


<div class="meta-api-description">
How do I optimize Kendo UI map tile loading with multiple subdomains? Configure and control the set of subdomains used for loading map tiles to optimize parallel requests, speed up map rendering, and match URL patterns with variable subdomain placeholders such as {s}. Enable, customize, or set multiple subdomain identifiers like letters or strings to distribute tile requests evenly across different servers, improving performance in map tile layers. Adjusting subdomain arrays supports scenarios involving load balancing, multi-origin tile fetching, and compatibility with various tile providers that require specific subdomain schemes for their tile URLs. This setting is essential for developers seeking to enhance tile loading efficiency, manage asynchronous tile downloads, or fix tile URL template issues related to subdomain placeholders in mapping applications and GIS platforms.
</div>

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
                urlTemplate: "https://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });
    </script>

### layerDefaults.tile.opacity `Number` *(default: 1)*

The opacity of all tile layers.


<div class="meta-api-description">
How do I adjust the transparency of all tile-based map layers in Kendo UI for jQuery? Adjust the transparency or alpha level of all tile-based map layers to control the visibility, brightness, or dimming effect of basemap tiles, allowing users to set opacity values for tile layers to highlight, fade, or blend map imagery, control layer translucency for improved overlay contrast, or configure default tile transparency settings affecting all tile layers uniformly.
</div>

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
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });
    </script>

### layerDefaults.bing `Object`

The default configuration for Bing (tm) tile layers.


<div class="meta-api-description">
How do I configure default settings for Bing map tile layers with Kendo UI for jQuery? Control and customize default settings for Bing map tile layers including authentication credentials, imagery types, visual styles, and tile behavior to ensure consistent configuration across all Bing-based map tiles. Enable centralized management of Bing Maps options such as API keys, map style selection, tile loading preferences, and layer parameters to streamline setup and maintain uniform appearance and performance for Bing tile layers in mapping applications. Configure global Bing tile options to apply common settings automatically, simplifying integration when adding multiple Bing imagery layers, and supporting use cases like satellite, road, or hybrid maps with consistent control over authentication, imagery, rendering, and tile properties.
</div>

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


<div class="meta-api-description">
How do I customize the attribution text on Bing map layers in Kendo UI Map? Control, customize, or override the copyright, credits, provider information, or attribution text visible on all Bing map layers and basemap tiles in mapping components, adjusting the displayed source notices, legal disclaimers, or ownership acknowledgments for Bing-based maps, and setting or modifying the default attribution labels for all Bing tile layers across your map interface.
</div>

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

The opacity of all Bing (tm) tile layers.


<div class="meta-api-description">
How do I adjust the transparency of all Bing map layers in Kendo UI for jQuery? Adjust and configure the transparency, alpha level, or fade effect for all Bing map tiles or layers within the map component, enabling control over the visibility and dimming of Bing basemap imagery. Set, change, or customize the opacity of Bing tile layers collectively to achieve desired visual blending, translucency, or background layering effects, affecting all Bing map data renderings uniformly for enhanced map styling, user interface customization, or thematic display adjustments.
</div>

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


<div class="meta-api-description">
How do I set the default Bing Maps API key in Kendo UI for jQuery map component? Configure or set the default API key for authenticating and enabling Bing Maps tile layers within the map component, controlling access to Bing map tiles across all layers unless overridden by specific keys. This key string manages Bing Maps integration, supports enabling Bing tile services, and provides a centralized way to apply authentication credentials for all Bing-based map layers during map setup or initialization, facilitating seamless access, rendering, and control of Bing tiles in mapping applications.
</div>

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


<div class="meta-api-description">
How can I customize the Bing Maps imagery on my Kendo UI map? Choose and configure the type of Bing Maps tile imagery to display on the map layer by setting the desired base map style such as aerial satellite views, aerial imagery combined with road labels, or standard road map visuals; control visual presentation by selecting between pure satellite photos, hybrid aerial plus labels, or simple road-only tiles to customize map appearance, background layers, or overlays for applications requiring different map contexts, backgrounds, or geographic detail levels.
</div>

#### Example - setting default Bing imagery type
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layerDefaults: {
                bing: {
                    imagerySet: "aerialWithLabels"
                }
            },
            layers: [{
                type: "bing",
                key: "YOUR API KEY"
            }]
        });
    </script>

### layerDefaults.bing.culture `String` *(default: "en-US")*

The culture to be used for the bing map tiles.


<div class="meta-api-description">
How do I set the language for Bing map tiles in Kendo UI Map component? Configure the language, locale, or regional settings for map labels, place names, and localized imagery on Bing map tiles within the map component by specifying a culture or language code such as en-US, fr-FR, or zh-CN; control the display language, regional formats, and cultural context for Bing Maps layers to customize how geographic information, map annotations, and localized content appear based on user locale preferences or application localization needs, enabling maps to show text and data in the desired language or cultural variant during map initialization or runtime adjustments.
</div>

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


<div class="meta-api-description">
How do I customize the visible map layers in Kendo UI Map component? Control and customize the visible map layers by adding, removing, reordering, or setting their behavior and appearance within the map view. Adjust layer configurations such as type, visibility, order, and other settings at initialization to tailor how different geographic or data overlays are rendered. Manage multiple layers’ stacking order and enable or disable specific layers to create dynamic, interactive maps with precise control over which elements appear and when. Configure layers to suit use cases like base maps, data visualizations, heatmaps, markers, or vector shapes, allowing full adaptability of the map’s visual composition and functional layering. Set up and manipulate map layers programmatically for optimal map presentation and layered data display within the Map component.
</div>

#### Example - configure map layers
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
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


<div class="meta-api-description">
How can I customize the attribution for individual layers in a Kendo UI map? Display or configure layer credits, copyright notices, or attributions on the map by setting formatted text or HTML content that includes links, styled text, or markup to acknowledge data sources and map layer providers, enabling customizable and clear ownership or source information for individual layers.
</div>

#### Example - set attribution text
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });
    </script>

### layers.autoBind `Boolean` *(default: true)*

If set to `false` the layer will not bind to the data source during initialization. In this case data binding will occur when the [change](/api/framework/datasource#events-change) event of the
data source is fired. By default the widget will bind to the data source specified in the configuration.

> Setting `autoBind` to `false` is useful when multiple layers (or widgets) are bound to the same data source. Disabling automatic binding ensures that the shared data source doesn't make more than one request to the remote service.


<div class="meta-api-description">
How does autoBind affect data binding for map layers in Kendo UI? Configure automatic or manual data binding for map layers to control when layers connect to their data sources, preventing duplicate network calls when multiple layers share the same source; options include immediate binding upon initialization or deferred binding triggered by data source change events, allowing control over synchronization timing, data loading behavior, and efficient resource management when setting up map visualizations with shared datasets.
</div>

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


<div class="meta-api-description">
How do I configure data binding for map layers in Kendo UI for jQuery? Configure and control the data connection for map layers to bind and display markers, shapes, or geographic features by linking to various data inputs such as local arrays, remote APIs, or preconfigured reusable data sources. Enable dynamic or static data integration by setting custom data sets, JavaScript objects reflecting data configurations, or specialized data source instances to ensure flexible and efficient map rendering and feature binding. Support data-driven visualization with options to connect, set, bind, or change underlying sources for map layers including arrays, external endpoints, and advanced data structures.
</div>

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


<div class="meta-api-description">
How do I restrict the visibility of map layers in Kendo UI based on their geographic extent? Set or configure geographic bounding boundaries to control whether a map layer is visible based on the current map view by specifying coordinates that define a rectangular region. Enable dynamic layer display by defining the viewport limits using latitude and longitude pairs for the northwest and southeast corners, effectively showing or hiding layers depending on if the map area overlaps the defined extent. Adjust or restrict layer visibility to specific geographic zones, use bounding boxes to trigger layer rendering only within selected spatial ranges, and manage layers by their geographic coverage to optimize map performance and user experience when panning or zooming.
</div>

#### Example - activate shape layer for given region
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            center: [42.6908, 23.3090],
            zoom: 12,
            layers: [{
                type: "tile",
                urlTemplate: "https://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
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


<div class="meta-api-description">
How do I set up Bing Maps tile authentication with an API key in Kendo UI for jQuery? Configure map tile authentication by setting the API key for secure access to Bing Maps imagery, enabling authorized loading of map layers with protected tiles, managing credentials for Bing tile services, controlling map layer access through API keys, and ensuring proper authorization when displaying Bing map tiles in your application.
</div>

#### Example - setting Bing API key for a layer
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            center: [30.268107, -97.744821],
            zoom: 3,
            layers: [{
                type: "bing",
                key: "YOUR_BING_MAPS_API_KEY",
                imagerySet: "road"
            }]
        });
    </script>

### layers.imagerySet `String` *(default: "road")*

The bing map tile types. Possible options:

    * aerial - Aerial imagery.
    * aerialWithLabels - Aerial imagery with a road overlay.
    * birdseye - Bird’s eye (oblique-angle) imagery
    * birdseyeWithLabels - Bird’s eye imagery with a road overlay.
    * road - Roads without additional imagery. (default)


<div class="meta-api-description">
How to configure the visual style of a map using the `imagerySet` property in Kendo UI for jQuery? Configure the visual style or tile layer type displayed on a map by selecting from various imagery options such as aerial satellite views, aerial images combined with road labels, oblique bird’s eye perspectives, bird’s eye views including street overlays, or standard road maps showing just roads and basic details. Customize the map appearance by enabling different tile sets like satellite images, labeled aerial photos, angled viewpoints, detailed overhead imagery with labels, or simple road-focused renderings to match user preferences or application themes. Control the map’s background layer visualization with choices including high-resolution aerial photos, hybrid aerial plus street info, bird’s eye oblique images with or without labels, or the default road map layer focusing on streets and routes. Adjust the map’s imagery presentation to display various Bing Maps tile types, facilitating the selection of specific aerial, bird’s eye, or road-based visuals for enhanced navigation, clarity, or thematic emphasis. Enable, set, or switch map layers between satellite imagery, hybrid overlays, oblique views, or plain road tiles for flexible, detailed mapping experiences in web or mobile applications.
</div>

#### Example - setting Bing imagery type for a layer
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            center: [30.268107, -97.744821],
            zoom: 3,
            layers: [{
                type: "bing",
                key: "YOUR_BING_MAPS_API_KEY",
                imagerySet: "aerial"
            }]
        });
    </script>

### layers.culture `String` *(default: "en-US")*

The culture to be used for the bing map tiles.


<div class="meta-api-description">
How do I change the language of Bing map tiles in Kendo UI for jQuery? Set or configure the language and regional settings for map tile labels and content, specifying culture codes like en-US or fr-FR to control the localization of Bing map tiles, enabling maps to display place names, labels, and geographic information in a preferred language or locale, adjusting the cultural context for tile requests to match user language preferences, internationalization, map localization, regional display settings, language customization for map interfaces, controlling language-specific map elements, changing map tile culture for multilingual support, and adapting map content for different countries or languages.
</div>

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

Requires the [dataSource](/api/javascript/dataviz/ui/map#configuration-layers-dataSource) option to be set.

Only applicable to "marker" and "bubble" layers.


<div class="meta-api-description">
How do I specify the field containing latitude and longitude coordinates in a Kendo UI map layer? Specify or configure the geographic coordinates field to control the placement of markers or bubbles on a map layer by indicating which data attribute contains latitude and longitude values as a coordinate pair, enabling location-based visualization, geospatial positioning, map symbol plotting, and data-driven map markers in marker or bubble layers, ensuring proper mapping of points using decimal degree arrays with support for dynamic data sources and customizable geolocation data integration.
</div>

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


<div class="meta-api-description">
How can I change the default shape of Kendo UI map markers? Control and customize the default appearance and style of map markers by selecting between different predefined marker shapes or icons, such as pin, target pin, or similar marker forms, enabling configuration of visual marker representation on map elements, data-bound marker customization with various shape options, setting marker icon styles via class-based shapes, adjusting marker appearance for location indicators, map point highlighting with distinctive marker shapes, and options to enable or set the shape type for map pins or targets to tailor the map’s visual marker layout and interactive cues.
</div>

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


<div class="meta-api-description">
How to adjust the size of map image tiles in Kendo UI Map? Adjust the pixel dimensions or size of map image tiles to configure map resolution, control rendering quality, manage tile requests, optimize performance, and customize how map layers load and display. Set or modify tile dimensions, tile pixel size, or tile resolution to influence map imagery loading, rendering speed, level of detail on zoom, and resource usage for better map visualization and responsiveness across different devices or network conditions.
</div>

#### Example - setting tile size for a layer
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            center: [30.268107, -97.744821],
            zoom: 3,
            layers: [{
                type: "tile",
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap",
                tileSize: 512
            }]
        });
    </script>

### layers.titleField `String` *(default: "title")*

The data item field which contains the marker title.
Requires the [dataSource](/api/javascript/dataviz/ui/map#configuration-layers-dataSource) option to be set.


<div class="meta-api-description">
How do I configure Kendo UI map marker titles with a specific data attribute? Configure which data attribute provides the label or name for each map marker, enabling display, binding, or customization of marker titles based on dataset fields, useful for setting popup labels, tooltips, or identifiers tied to geographic points, allowing control over how markers are named or described on maps when connecting to a data source with layers, useful for selecting the specific field that contains descriptive text or titles for map symbols in mapping applications, supporting flexible labeling of map features by mapping marker titles from data properties.
</div>

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


<div class="meta-api-description">
How can I customize the tooltips that appear when users hover over markers on a Kendo UI map? Configure and customize interactive tooltips for map markers generated from data bindings, enabling control over popup text, templates, positioning, show and hide triggers, styling, and content display on geographic visualizations. Set default marker hover or click info bubbles with customizable appearance and behavior, including dynamic content formatting, CSS styling, trigger events, and layout options to enhance map interactivity and user experience. Adjust how informational popups appear for data-driven markers, including detailed tooltip content, placement, visibility control, and template customization to tailor map annotations and tooltips consistently across all data points.
</div>

#### Example - configuring layer tooltip options
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "marker",
                locationField: "latlng",
                titleField: "title",
                tooltip: {
                    autoHide: false,
                    template: (data) => `<strong>${data.title}</strong><br/>${data.description}`,
                    position: "top",
                    showOn: "click"
                },
                dataSource: {
                    data: [{
                        latlng: [42.6977, 23.3219],
                        title: "Sofia",
                        description: "Capital of Bulgaria"
                    }]
                }
            }]
        });
    </script>

### layers.tooltip.autoHide `Boolean`*(default: true)*

Specifies if the tooltip will be hidden when mouse leaves the target element. If set to false a close button will be shown within tooltip. If set to false, showAfter is specified and the showOn is set to "mouseenter" the Tooltip will be displayed after the given timeout even if the element is no longer hovered.


<div class="meta-api-description">
How do I configure Kendo UI map tooltips to automatically hide when the mouse leaves the target element? Control the automatic hiding behavior of map tooltips by configuring whether tooltips should disappear immediately when the mouse pointer leaves the target element or remain visible until manually closed. Enable or disable auto-hide to manage persistent tooltip display with optional close buttons, support for delayed showing after hover, and consistent visibility even when the cursor moves away, allowing fine-tuned interaction control for hover-triggered or timed tooltip presentation on map layers. Adjust settings to customize how and when tooltips show, stay, or hide in response to user pointer movement, hover events, timeouts, and manual dismissal.
</div>

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


<div class="meta-api-description">
How do I customize tooltip animations in Map.layers? Control and customize tooltip animations on map layers by configuring animation sequences or disabling animations entirely to adjust visual effects, enable smooth transitions, reduce motion for performance optimization, modify hover or focus tooltip behaviors, set custom animation timing and styles for interactive map elements, enhance user experience with tailored tooltip motion, or completely turn off tooltip animations to minimize resource usage and improve responsiveness during map interactions.
</div>

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


<div class="meta-api-description">
How do I customize the animation effect when closing map tooltips in Kendo UI for jQuery? Set or customize the closing animation effect for map tooltips to control how tooltip popups hide, including configuring animation type such as fade, slide, or other transitions, adjusting duration, easing curves, enabling smooth exit animations, or disabling the close animation entirely to optimize user interface behavior and visual feedback.
</div>

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


<div class="meta-api-description">
How to customize the closing animation effect of map layers in Kendo UI for jQuery? Control and customize how tooltips vanish on map layers by setting the closing animation effect, including animation type, transition style, duration, speed, easing curve, fade-out, slide-out, or other visual behaviors for tooltip disappearance. Adjust or configure tooltip exit animations, close effects, or how the hover or click tooltips smoothly hide with tailored animation timing and easing options to enhance user interaction feedback and visual transitions when a map tooltip closes.
</div>

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


<div class="meta-api-description">
How to control the animation duration of closing map layer tooltips in Kendo UI for jQuery? Set and customize the timing, speed, and duration of closing or hiding animations for map layer tooltips, controlling how quickly tooltip overlays disappear or retract on interactive maps, adjusting animation delays, fade-out speed, transition time, and close effects to fine-tune user interface responsiveness and visual flow when tooltips are dismissed or removed from map layers.
</div>

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


<div class="meta-api-description">
How to customize the animation of map layer tooltips opening in Kendo UI for jQuery? Configure and customize the opening animation of map layer tooltips by setting how tooltips appear, including transition effects, durations, easing functions, and timing controls for show behavior. Adjust or enable smooth fade-ins, slide-ins, scaling, or other visual transitions when tooltips become visible on map layers, controlling the appearance speed and animation style to enhance user experience and interaction feedback. Set or modify tooltip open animations, effects, and timing to tailor the display of information overlays triggered by user interaction or map events.
</div>

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


<div class="meta-api-description">
How to customize the opening animation effect of tooltips in Kendo UI Map layers? Control and customize the visual opening animations or transition effects of tooltips on map layers, including options like fade, slide, or other entrance animations to enhance user interaction and visual feedback. Configure how tooltips smoothly appear, animate, or transition into view on map layers by setting the opening animation style or effect. Enable or adjust the opening behavior of tooltip overlays for map features, controlling animation types, transitions, and visual effects that occur when tooltips become visible. Manage the feel and style of tooltip pop-up animations on map layers to improve clarity, user experience, and aesthetic presentation during tooltip activation with various effect options.
</div>

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


<div class="meta-api-description">
How do I control the speed of my map layer's tooltip animation in Kendo UI for jQuery? Control the speed and timing of how a map layer tooltip appears by configuring the animation duration for the tooltip’s open transition, enabling you to set, adjust, or disable the opening animation effect with a numeric value to make the tooltip appear instantly, gradually, or at a custom pace on hover or interaction.
</div>

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


<div class="meta-api-description">
How can I customize the tooltip content in Kendo UI Map layer? Configure and customize the text or HTML content displayed within map layer tooltips, enabling static messages or dynamic, function-generated information to appear when hovering or interacting with map elements. Control what appears inside tooltips by setting fixed strings or using functions that return customized content based on layer data, map features, or user interactions, overriding default behavior that usually shows a target element’s title attribute. This flexibility supports displaying context-sensitive, interactive, or richly formatted tooltip information tailored to specific map layers or user events, enhancing user experience with adaptable and programmable tooltip text shown on map layers.
</div>

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


<div class="meta-api-description">
How to load external data into Kendo UI Map layer tooltips? Configure dynamic tooltip content by specifying a URL or HTTP request options to load, fetch, or embed remote HTML, JSON, or other data directly into map layer tooltips, enabling live data display, external content integration, or custom tooltip rendering from web resources. Support for loading content via URL strings or detailed request settings allows control over remote content retrieval, including cross-origin considerations and iframe embedding for protocol-based URLs. Ideal for scenarios requiring asynchronous tooltip updates, fetching external API responses, or embedding interactive or formatted content within map overlays, with flexibility to adjust content sources and loading behavior dynamically.
</div>

#### Example - load content from remote URL
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "marker",
                tooltip: {
                      content: {
                        url: "https://demos.telerik.com/kendo-ui/content/web/tooltip/ajax/ajaxContent3.html"
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


<div class="meta-api-description">
How do I customize the content of tooltips on map layers in Kendo UI? Customize tooltip content on map layers by configuring templates that render custom HTML or text, bind marker data, coordinates, or location information for dynamic display, format output for markers and locations, control tooltip appearance via template helpers, and set fields like marker instances or geographic coordinates to tailor the information shown, enabling precise control over hover details, data binding, display formatting, and conditional content presentation on map markers and locations in various interactive mapping scenarios.
</div>

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


<div class="meta-api-description">
How to show/hide directional callout pointer in Kendo UI map tooltips? Control the visibility of the small arrow or pointer on map tooltips that connects the tooltip box to a specific location marker, enabling you to enable, disable, show, hide, or toggle the directional callout pointer on map layers' info popups, tooltip pointers, visual arrows, or connecting markers.
</div>

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


<div class="meta-api-description">
How to embed dynamic content in map layer tooltips with iframe? Control embedding layer tooltip content inside an iframe or directly in the DOM by enabling or disabling a dedicated iframe element for tooltips on map layers, allowing configuration of isolated content rendering, security context separation, sandboxing of tooltip HTML, or inline content display, useful for customizing how dynamic or complex tooltip information is presented within interactive map components and managing cross-origin content or styling isolation for tooltips.
</div>

#### Example - load content from remote URL
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "marker",
                tooltip: {
                      iframe: true,
                      content: {
                        url: "https://demos.telerik.com/kendo-ui/content/web/tooltip/ajax/ajaxContent3.html"
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


<div class="meta-api-description">
How do I set the height of tooltips in Kendo UI Map layers? Adjust or set the vertical dimension, height, or pixel size of map tooltips to control their visual layout, appearance, overflow behavior, text wrapping, clipping, and spacing for interactive map layers. Customize or configure tooltip size on map layers to ensure consistent display and readability, manage tooltip container height, or change how much vertical space the information box occupies during map rendering and user interaction. Enable precise control over the height of pop-up info windows or hover tooltips in maps to prevent cutoff, improve usability, and meet design requirements.
</div>

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


<div class="meta-api-description">
How do I set a fixed width for tooltips in Kendo UI Map? Configure or set a fixed width in pixels for tooltips on a map to control the tooltip’s size, layout, and text wrapping, override default or automatic sizing, specify consistent tooltip dimensions for better styling and content display, manage tooltip box width to prevent overflow or tight spacing, and customize the tooltip width to ensure uniform appearance across different map layers or data points.
</div>

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


<div class="meta-api-description">
How do I customize the position of tooltips in a Kendo UI map layer? Configure and customize tooltip placement relative to map elements by setting position preferences such as bottom, top, left, right, or center to control alignment, anchoring, and where informational popups appear near map targets, enabling precise control over tooltip location for improved user interface clarity and interaction on map overlays or layers.
</div>

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


<div class="meta-api-description">
How to delay tooltip appearance on map layers in Kendo UI for jQuery? Configure the delay time in milliseconds before a tooltip appears on map layers to adjust how long users must hover or interact before seeing layer information, enabling precise control over tooltip visibility timing, setting delays for hover-based triggers while ignoring delays for click or focus events that display tooltips instantly, allowing you to fine-tune user experience by defining when tooltips show on map layers and manage interactive feedback timing through customizable latency values.
</div>

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


<div class="meta-api-description">
How do I configure a map layer to show tooltips on hover in Kendo UI for jQuery? Configure when map layer tooltips appear by specifying the user interaction that triggers their display, such as showing tooltips on hover events like mouseenter, on click actions, or when the layer receives keyboard focus. Enable tooltip visibility based on different triggers to customize user experience, control interactive map feedback, bind tooltips to mouse or keyboard events, and set precise conditions for tooltip activation during map navigation or interaction. Adjust tooltip behavior for accessibility, responsiveness, or custom event handling by selecting from common event types to optimize layer information presentation.
</div>

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


<div class="meta-api-description">
How to set maximum size for bubble symbols in Kendo UI map layers? Control and limit the maximum size or radius of bubble or circle symbols in map layers, enabling configuration of symbol scaling, restricting oversized markers, adjusting visual prominence of data points, setting upper bounds on symbol dimensions during map rendering, managing size constraints for overlapping or clustered bubbles, and customizing maximum allowable icon or marker size for map visualization and data representation.
</div>

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


<div class="meta-api-description">
What is the minimum size for bubble symbols in Kendo UI Map layer? Control and configure the smallest visible size or radius for bubble symbols on a map layer to prevent bubbles from becoming too small or disappearing when scaling based on data values, enabling enforcement of a minimum symbol dimension, setting thresholds for symbol sizing, adjusting minimum bubble radius, managing symbol size limits to improve visibility and readability in data visualizations, ensuring that symbol sizes do not shrink below a specified limit regardless of data magnitude, and optimizing visual scaling behavior for bubble layers by defining a baseline minimum size or area constraint.
</div>

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

### layers.maxZoom `Number`

The maximum zoom level at which to show this layer.


<div class="meta-api-description">
How do I control the maximum zoom level for displaying map layers in Kendo UI Map widget? Control the maximum zoom level for displaying map layers to limit visibility based on zoom scale, configure the highest zoom threshold at which tiles or vector layers remain visible, set upper zoom boundaries to hide or show specific layers dynamically, enable layer rendering control tied to zoom changes, optimize map performance by restricting layers beyond a certain zoom level, manage map layer visibility during zoom in and zoom out interactions, customize layer display to appear only within desired zoom ranges, adjust layer show/hide behavior linked to zoom levels, enforce zoom-based layer filtering for rendering efficiency, and apply zoom constraints to tile and vector data presentation on interactive maps.
</div>

#### Example - switch to OpenCycleMap at zoom level 14
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            center: [30.268107, -97.744821],
            zoom: 14,
            layers: [{
                type: "tile",
                urlTemplate: "https://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                subdomains: ["a", "b", "c"],
                maxZoom: 13
            }, {
                minZoom: 14,
                type: "tile",
                urlTemplate: "https://#= subdomain #.tile2.opencyclemap.org/transport/#= zoom #/#= x #/#= y #.png",
                subdomains: ["a", "b", "c"]
            }]
        });
    </script>

### layers.minZoom `Number`

The minimum zoom level at which to show this layer.


<div class="meta-api-description">
How do I control which map layers become visible in Kendo UI based on zoom level? Set or adjust the minimum zoom level to control when a map layer becomes visible, configuring the scale threshold to display or hide specific layers depending on how far users have zoomed in or out, enabling precise control over layer visibility based on zoom settings, scale levels, zoom thresholds, or map zoom units, allowing developers to enable, disable, limit, or filter layers dynamically as users zoom, ensuring that layers appear only at desired zoom ranges across individual layers within the map’s layer collection.
</div>

#### Example - switch to OpenCycleMap at zoom level 14
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            center: [30.268107, -97.744821],
            zoom: 14,
            layers: [{
                type: "tile",
                urlTemplate: "https://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                subdomains: ["a", "b", "c"],
                maxZoom: 13
            }, {
                minZoom: 14,
                type: "tile",
                urlTemplate: "https://#= subdomain #.tile2.opencyclemap.org/transport/#= zoom #/#= x #/#= y #.png",
                subdomains: ["a", "b", "c"]
            }]
        });
    </script>

### layers.opacity `Number` *(default: 1)*

The opacity for the layer.


<div class="meta-api-description">
How to adjust transparency of map layers in Kendo UI for jQuery? Adjust the transparency, translucency, or alpha level of map layers to control visibility, blending, highlighting, or hiding of map features. Configure layer opacity to make layers more or less transparent, enabling emphasis on certain data, fine-tuning visual hierarchy, layering effects, or managing overlap between multiple map elements for clearer presentation and customized rendering. Set or modify transparency settings to control how strongly individual map features or entire layers appear compared to others.
</div>

#### Example - setting layer opacity
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                opacity: 0.5,
                urlTemplate: "https://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                subdomains: ["a", "b", "c"],
                attribution: "&copy; OpenStreetMap"
            }]
        });
    </script>

### layers.subdomains `Array`

A list of subdomains to use for loading tiles.
Alternating between different subdomains allows more requests to be executed in parallel.


<div class="meta-api-description">
How can I distribute Kendo UI map layer requests across multiple subdomains to improve performance? Control distribution of tile requests across multiple subdomains to enhance parallel loading and optimize CDN usage for map layers, enabling faster tile retrieval by spreading requests over different domain endpoints; configure load balancing, improve tile fetch concurrency, set multiple hostnames for map tiles, speed up map rendering by avoiding browser connection limits, and enable efficient tile resource loading through subdomain sharding or domain aliases.
</div>

#### Example - setting subdomains for OpenStreetMap tiles
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "https://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
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


<div class="meta-api-description">
How can I customize the appearance of bubble layers in a Kendo UI Map? Control and customize the visual representation of bubble or symbol layers on maps by selecting predefined shapes like circle or square, or by defining a custom rendering function that dynamically generates symbols based on data-driven parameters such as position, size, styling, and associated data points; configure markers, icons, or graphical symbols for geographic data visualization using flexible options for shape, appearance, and behavior to enable tailored map annotations, data point highlighting, or interactive symbol rendering with programmatic control over geometry and style inputs.
</div>

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


<div class="meta-api-description">
How do I configure different types of map layers in Kendo UI for jQuery? Configure and select the kind of map layer to render by choosing between raster tile layers like Bing tiles or generic slippy map tiles, or data-driven vector layers such as marker layers for pinned locations, vector shape layers bound to GeoJSON or other spatial data, and specialized bubble map vector layers for visualizing proportional data points. Control how the map loads, displays, binds, and manages these different layer types, allowing flexible display of tiles, points, markers, shapes, or custom vector content based on user data and map visualization needs. Enable, set, or toggle layer rendering modes including raster imagery and dynamically bound vector features for interactive geographic interfaces.
</div>

#### Example - creating a tile layer
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });
    </script>

### layers.style `Object`

The default style for shapes.


<div class="meta-api-description">
How do I customize the default styling of shape layers on a map in Kendo UI? Control and customize the default visual styling of shape layers on maps by configuring fill colors, stroke colors and widths, opacity levels, and other vector appearance attributes to define how polygons, lines, and shapes are rendered by setting, adjusting, or overriding default layer styles during map setup and initialization for consistent map visualization with tailored shape presentation, enabling the specification of shape fill styles, border strokes, transparency, and other graphical properties across map layers.
</div>

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


<div class="meta-api-description">
How do I customize the fill color of map layers in Kendo UI for jQuery? Control and customize the default fill color, opacity, and appearance for map layer shapes by setting solid colors, transparent fills, gradients, or detailed color configurations using CSS color names, hex codes, RGBA values, or structured objects. Adjust fill styles to define how polygonal or shape layers are visually rendered on the map background, enabling setting colors programmatically, configuring opacity levels, or applying complex fill patterns during map setup or dynamic styling. This includes options for enabling, modifying, or resetting fill properties to affect layer visibility and thematic color schemes for geographic features.
</div>

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


<div class="meta-api-description">
How do I set the default fill color for polygons in a Kendo UI map using hex codes? Control the default fill color for polygons, paths, and vector shapes on a map by configuring the shape fill appearance using color values like hex codes, RGB, or CSS color strings to customize layer styling, themes, and visual design of geographic features. Adjust or set fill hues, tints, shading, or transparency for layers to achieve specific aesthetic effects or data visualization goals on map objects such as polygons and vector paths. Enable precise color assignment to map layers' filled areas for tailored visual representation, design consistency, or thematic mapping with CSS-compatible color formats.
</div>

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


<div class="meta-api-description">
How to set transparency for polygon fills in Kendo UI Map? Control and adjust the transparency level of polygon fills or vector shape areas on the map by setting the fill alpha or opacity from fully transparent to fully opaque, enabling developers to customize how strongly shapes and colored regions appear, blend, or stand out; configure the default fill transparency to emphasize certain map layers, manage overlapping visual hierarchy, fine-tune shading effects, or set subtle background fills for polygons and vector geometries, with granular control over the intensity and see-through quality of these map elements.
</div>

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


<div class="meta-api-description">
How can I customize the appearance of vector shapes on a Kendo UI map layer? Control and configure the default outline, border, and stroke appearance of vector shapes, polygons, lines, and features on map layers by setting colors, widths, opacities, dash patterns, and stroke styles using CSS color strings or detailed stroke configuration objects; customize how edges and outlines are drawn, styled, rendered, or displayed on map vector data, including adjusting transparency, thickness, dash spacing, and color format for visual emphasis or differentiation on interactive or static maps.
</div>

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


<div class="meta-api-description">
How do I change the outline color of shapes on a Kendo UI map? Set or customize the outline color for shapes or polygons on a map, controlling the stroke or border color around map layers using any CSS-compatible color value such as hex codes, RGB, RGBA, HSL, or named colors. Adjust line colors for map features, shapes, or boundaries to highlight, differentiate, or style visualization layers according to design needs, enabling developers to specify or override default stroke hues in map rendering with flexible color formats for precise appearance control.
</div>

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


<div class="meta-api-description">
How do I customize the line pattern for map layer shapes in Kendo UI? Configure the default stroke line pattern for map layer shapes by choosing from various dash styles such as dashed lines, dotted lines, dash-dot sequences, long dashes, or solid continuous strokes, enabling control over line appearance, line rendering styles, outline patterns, and visual segmentation on map layers to customize how polygon or polyline borders are displayed with options including dash, dot, dash-dot, long dash, and mixed dot patterns for distinct stroke visualization and map styling adjustments.
</div>

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


<div class="meta-api-description">
How do I set the transparency of stroke on a map layer in Kendo UI? Control or set the transparency level, opacity, or alpha channel of outlines, borders, strokes, or edges on map layers, including lines, polygons, and markers, to achieve various visual effects such as fading, highlighting, or blending with backgrounds. Adjust or configure stroke transparency from fully invisible (0) to fully opaque (1) for all shapes and features within map layers, enabling fine-tuning of map appearance, layering, and visibility. Modify or enable dynamic or default opacity settings for vector layer outlines during rendering or initialization to customize map styling, control overlay prominence, or enhance user interface clarity.
</div>

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


<div class="meta-api-description">
How to set stroke width for shapes in Kendo UI map layers? Control the thickness, border size, or outline width of shapes and vector layers on a map by configuring the stroke width or line weight for layer outlines. Adjust, set, or customize the default line thickness, stroke size, or border width for map polygons, lines, or shapes to influence the visual prominence and styling of map layer edges and boundaries. Enable modification of stroke parameters, including line weight and border thickness, to achieve desired map layer appearance, contrast, and detail level in vector rendering.
</div>

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
* subdomain - Subdomain for this tile. See [subdomains](/api/javascript/dataviz/ui/map/configuration/layers.subdomains)


<div class="meta-api-description">
How to configure URL pattern for loading map tiles with Kendo UI Map layers? Configure or set the URL pattern for loading map tiles from various sources such as XYZ tile servers, content delivery networks (CDNs), or custom tile endpoints by specifying customizable URL templates that include variables for tile coordinates (x and y), zoom levels, and optional subdomains to enable parallel requests and improve performance, allowing flexible control over how map layers fetch and display tiled map data from multiple servers or hosts.
</div>

#### Example - setting URL template for tile layer
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "https://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                subdomains: ["a", "b", "c"],
                attribution: "&copy; OpenStreetMap"
            }]
        });
    </script>

### layers.valueField `String` *(default: "value")*

The value field for bubble layer symbols.
The data item field should be a number.


<div class="meta-api-description">
How do I bind a numeric value to customize map layer appearance in Kendo UI Map? Bind a numeric data attribute or field to control dynamic visual properties such as bubble size, radius, scale, or value-driven styling on map layers, enabling size-based symbol customization, quantitative data mapping, variable radius representation, and value-dependent appearance adjustments based on numerical data points.
</div>

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


<div class="meta-api-description">
How do I control the order of map layers in Kendo UI for jQuery? Set or configure the rendering order, draw priority, and stacking sequence of map layers by assigning numeric values to control overlap and visual layering, enabling precise management of which layers appear above or below others regardless of their declaration order, effectively controlling layer precedence, z-index positioning, map layer ordering, and visual hierarchy for complex map compositions.
</div>

#### Example - setting a zIndex for a layer

    <div id="map"></div>
    <script>
      $("#map").kendoMap({
        layers: [{
          type: "tile",
          urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
          attribution: "&copy; OpenStreetMap",
          zIndex: 1
        }, {
        //this layer is not visible as the zIndex of the above one is higher
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

### markerDefaults `Object`

The default options for all markers.


<div class="meta-api-description">
How do I set default settings for map pins in Kendo UI for jQuery? Set global default settings for map pins including default icons, sizes, colors, tooltips, layering order (zIndex), and general appearance and behavior for all markers upon map creation; customize marker styling, control consistent marker visuals and interactions, apply shared marker configuration that can be overridden by individual marker-specific properties, and manage default pin attributes to streamline marker setup and ensure uniform marker presentation across the map interface.
</div>

#### Example - setting default shape for all markers
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
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


<div class="meta-api-description">
How to customize default marker shape in Kendo UI Map widget? Set or customize the default style and appearance of map markers by controlling the marker shape used in map visualizations, including common shapes like pins or target pins, with options to define how markers are rendered or styled via CSS classes. Adjust marker icons, symbols, or shapes to change how locations or points of interest appear on interactive maps, enabling configuration of map markers' visual form, type, or design to match application requirements. This encompasses setting default marker visuals, modifying marker indicators for maps, toggling between different marker shapes, and styling markers on a geographic or spatial interface.
</div>

#### Example - setting default shape for all markers
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
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


<div class="meta-api-description">
How to set default tooltip settings for all map markers in Kendo UI? Set or customize default tooltip settings for map markers to control how marker tooltips appear, what content they show, when and how they display or hide, and the template or styling used across all markers unless individually overridden. Configure global tooltip behavior, appearance, content templates, visibility triggers, and interaction options for markers on a map. Adjust default tooltip options for marker labels, hints, popups, or informational bubbles that appear on hover or click on map points, affecting all markers consistently unless specifically customized on individual markers.
</div>

#### Example - configuring default marker tooltip
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            markerDefaults: {
                tooltip: {
                    autoHide: false,
                    template: (data) => `<strong>${data.title || 'Marker'}</strong><br/>Location: ${data.location}`,
                    position: "bottom",
                    showOn: "click"
                }
            },
            layers: [{
                type: "tile",
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });
    </script>

### markerDefaults.tooltip.autoHide `Boolean`*(default: true)*

Specifies if the tooltip will be hidden when mouse leaves the target element. If set to false a close button will be shown within tooltip. If set to false, showAfter is specified and the showOn is set to "mouseenter" the Tooltip will be displayed after the given timeout even if the element is no longer hovered.


<div class="meta-api-description">
How do I prevent map marker tooltips from disappearing when the mouse leaves the marker in Kendo UI for jQuery? Configure whether map marker tooltips hide automatically when the mouse pointer leaves the marker area, enabling persistent or dismissible tooltips, controlling tooltip auto-hide behavior, setting tooltips to remain visible until manually closed via a button, managing tooltip display timing including delayed show after hover exit, adjusting tooltip visibility triggers like mouse enter events, enabling keeping tooltip visible without hover, controlling tooltip close interactions, and customizing the user experience for marker tooltip persistence and manual dismissal.
</div>

#### Example - hide tooltip on mouse leave
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
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


<div class="meta-api-description">
How to customize animation for map marker tooltips in Kendo UI Map widget? Control the appearance and behavior of map marker tooltip animations by configuring show and hide effects, enabling smooth transitions or disabling animations entirely for performance or style preferences, customize animation sequences with collections of animation objects, adjust timing and visual effects for tooltip popups on map markers, toggle animation on or off to optimize user experience or reduce motion, set default or custom animation patterns for how tooltips appear and disappear on interactive maps, manage tooltip display animations during initialization or runtime to enhance or simplify map interactions, refine tooltip visual cues with animation settings tailored to specific UI needs, override standard tooltip animation defaults with custom sequences for advanced control, and enable or disable motion effects to suit application responsiveness and user accessibility requirements.
</div>

#### Example - disable animations
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
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


<div class="meta-api-description">
How do I customize the closing animation for Kendo UI map marker tooltips? Set and customize the closing animation for map marker tooltips to control how tooltips disappear, including effects, timing, duration, easing, transitions, fade-outs, slide-ups, or other hide animations. Configure the tooltip close behavior for markers on maps by specifying animation styles, enabling smooth or instant hiding, adjusting visual transitions, controlling tooltip disappearance speed, and tailoring user interface responsiveness when tooltips are dismissed. Optimize tooltip exit effects for markers with animation settings that govern the closing motion and style, ensuring precise control over how map popups vanish after interaction.
</div>

#### Example - set close animation
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
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


<div class="meta-api-description">
How to configure closing animation effects for map marker tooltips in Kendo UI? Control and customize the closing animation or transition effect applied when a map marker’s tooltip is hidden or dismissed, including options to configure fade-outs, slide animations, visual effects, or other closing behaviors for tooltips on map markers, enabling smooth, visually appealing disappearance of tooltip content after interaction or automatic dismissal, with flexible settings to specify how tooltip closing animations behave in mapping interfaces.
</div>

#### Example - set close animation effect
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
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


<div class="meta-api-description">
How can I adjust the duration of the tooltip close animation for map markers in Kendo UI? Set or configure the duration, length, or timing of the tooltip close animation for map markers, controlling how quickly or slowly the tooltip fades, disappears, or transitions out when closing. Adjust or customize the close animation speed or delay for marker tooltips, determining the animation period in milliseconds or numeric values to refine user interface responsiveness, tooltip closing effects, and interactive map marker behavior.
</div>

#### Example - set close animation duration
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
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


<div class="meta-api-description">
How to customize the animation when opening a tooltip on a map marker in Kendo UI for jQuery? Control and customize the animation behavior and appearance of tooltips that open on map markers, including configuring effects, transition styles, opening animations, durations, fade-ins, slide-ins, and other animation properties to define how marker tooltips display when activated, enabling smooth visual cues and interactive feedback on geographical or data-driven maps.
</div>

#### Example - set open animation
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
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


<div class="meta-api-description">
How to animate opening of map marker tooltips with Kendo UI for jQuery? Control and customize the opening animations for map marker tooltips by setting specific animation effects that dictate how tooltips appear when triggered, including fade, slide, zoom, bounce, or other supported visual transitions; enable or configure smooth, dynamic tooltip entrances on markers to enhance user interaction, support multiple animation effect names or combinations, and adjust how tooltip displays animate during map initialization or runtime, catering to developers seeking to animate tooltip openings with various visual effects or transitions in mapping applications.
</div>

#### Example - set open animation effect
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
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


<div class="meta-api-description">
How to adjust opening animation speed for map marker tooltips in Kendo UI Map? Adjust or set the length of time for opening animations on map marker tooltips to control how quickly or slowly the tooltip appears, enabling customization of animation speed, timing, or transition duration for marker popups on interactive maps and user interfaces, allowing developers to configure tooltip reveal speed for better UI flow, smoother visual feedback, or tailored map interaction pacing.
</div>

#### Example - set open animation duration
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
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


<div class="meta-api-description">
How do I customize the content of map marker tooltips in Kendo UI for jQuery? Control the text shown in map marker tooltips by providing fixed strings or dynamic callback functions that generate tooltip content, enabling customization of the hover or info popups for markers, overriding default title attributes, and allowing flexible tooltip messages based on marker data or context for enhanced map interactivity and user guidance.
</div>

#### Example - extract the content from target marker
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
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
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
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


<div class="meta-api-description">
How to dynamically load marker tooltip content from a remote URL in Kendo UI Map? Configure marker tooltips in maps to load dynamic content from remote sources by specifying URLs or detailed request options like Ajax or fetch parameters; control how tooltips fetch, render, and update their information from external endpoints by setting string URLs or customized request objects, enabling asynchronous loading of content when users hover or click on markers, including handling cross-origin iframes and embedding considerations for online resources.
</div>

#### Example - load content from remote URL
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            markerDefaults: {
                tooltip: {
                      content: {
                        url: "https://demos.telerik.com/kendo-ui/content/web/tooltip/ajax/ajaxContent3.html"
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


<div class="meta-api-description">
How do I customize the tooltips for markers in Kendo UI map? Customize marker tooltips on maps with dynamic HTML or text templates that receive marker-specific data including location coordinates and marker instance details, enabling tailored tooltip content rendering, formatting, and display control; use templates to configure or override default content popups for map markers, control how marker information is presented interactively, and support access to marker properties and geographic location data within tooltip layouts, offering flexible, data-driven customization instead of static content.
</div>

#### Example - set tooltip template
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
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


<div class="meta-api-description">
How to hide the pointer arrow on map marker tooltips in Kendo UI for jQuery? Configure displaying or hiding the small pointer arrow or visual callout on map marker tooltips, enabling control over whether the tooltip's directional pointer appears with markers, managing the presence of the tooltip’s arrow indicator for marker information popups, toggling the tooltip callout pointer visibility on map markers, setting the display of the marker tooltip’s pointer arrow to improve or simplify visual cues, disabling or enabling the marker tooltip’s callout arrow to customize user interface feedback on map annotations.
</div>

#### Example - hide the tooltip callout
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
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


<div class="meta-api-description">
How to configure tooltip iframes in Kendo UI for jQuery Map widget? Configure whether marker tooltips on the map generate embedded iframes to isolate tooltip content, enable sandboxing, handle external HTML sources securely, control cross-origin restrictions, and manage CSS scope within tooltips; set or toggle iframe creation to customize how popup content for markers is loaded, displayed, and isolated across different security, styling, and content integration contexts.
</div>

#### Example - load content from remote URL
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            markerDefaults: {
                tooltip: {
                      iframe: true,
                      content: {
                        url: "https://demos.telerik.com/kendo-ui/content/web/tooltip/ajax/ajaxContent3.html"
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


<div class="meta-api-description">
How do I set a fixed height for tooltips on Kendo UI map markers? Adjust or configure the fixed vertical dimension in pixels for tooltips displayed on map markers, controlling the height of marker hover popups or info boxes globally unless specifically customized per marker, enabling consistent or uniform tooltip sizing, setting the pixel height for marker tooltip overlays, and managing how tall tooltip content areas appear when users hover or tap on map points.
</div>

#### Example - set the height of the tooltip
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
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


<div class="meta-api-description">
How do I set the width of tooltips for map markers in Kendo UI? Adjust or define the tooltip box width in pixels for map markers to control the horizontal size and layout of informational popups, enabling precise customization of tooltip dimensions, compact or expanded tooltip appearance, and uniform sizing across multiple markers. Configure, set, or limit the pixel width of tooltips displayed on map points to ensure consistent, readable, and well-aligned hover or click tooltips, supporting different UI designs and responsive layouts that require controlled tooltip widths for annotations, labels, or marker info overlays.
</div>

#### Example - set the width of the tooltip
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
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


<div class="meta-api-description">
How can I position the tooltip for my Kendo UI map marker? Set or adjust the placement, position, alignment, or anchor point of a tooltip connected to a map marker to control where the tooltip appears relative to the marker icon or target element, including options such as top, bottom, left, right, or centered positions to customize tooltip display and improve UI clarity when hovering over or interacting with map markers.
</div>

#### Example - set tooltip position
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
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


<div class="meta-api-description">
How do I adjust the delay before a map marker's tooltip appears when hovering over it in Kendo UI for jQuery? Configure or adjust the delay time in milliseconds before a marker’s tooltip becomes visible on hover to control the timing for showing hint text, info popups, or labels on map markers, enabling fine-tuning of tooltip appearance latency and responsiveness; this delay setting is relevant when tooltips appear on mouse hover but does not apply if tooltip activation is triggered by click or focus events, allowing developers to manage hover interactions, prevent immediate tooltip popups, and customize user experience for interactive map markers.
</div>

#### Example - set show delay
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
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


<div class="meta-api-description">
How do I configure when tooltips for map markers appear in Kendo UI for jQuery? Configure or control when tooltips for markers on a map appear based on user interactions such as hovering with a mouse, clicking, or focusing via keyboard or touch input. Enable or set the tooltip trigger event to display marker information automatically upon mouse enter, click actions, or focus events for accessibility and interactive experiences. Adjust how and when tooltip popups show for map markers during initialization to customize interactive feedback, user engagement, or accessibility by specifying events like mouseover, click, or keyboard focus.
</div>

#### Example - show tooltip on mouse enter
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
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


<div class="meta-api-description">
How do I add fixed markers to a Kendo UI map? Add static location pins, markers, pins, or points of interest (POIs) on a map or map interface by configuring fixed markers at specific coordinates. Control and set map annotations, icons, tooltips, titles, and fixed markers during initialization or configuration rather than dynamic or data-driven markers. Enable placement of non-interactive, predefined pins or markers to highlight locations, landmarks, or spots on geographic maps, supporting common use cases like labeling, location tagging, or custom icon placement for visual reference.
</div>

#### Example - setting default shape for all markers
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
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


<div class="meta-api-description">
How do I set the location of a map marker using latitude and longitude coordinates in Kendo UI for jQuery? Set, update, or control map marker positions using geographic coordinates expressed as latitude and longitude values, enabling placement, repositioning, binding, or movement of markers on the map based on location data. Configure marker geographic points, adjust coordinates for markers, specify exact latitude-longitude positions, or sync marker locations dynamically to reflect changes in geographic position. Use coordinate pairs to define, move, or bind markers within maps for geospatial visualization, location tracking, or interactive map features.
</div>

#### Example - setting marker location
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
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


<div class="meta-api-description">
How to customize the appearance of markers in Kendo UI Map widget? Select or configure the appearance and style of map markers by setting their shape, enabling different predefined marker forms such as pins, target pins, or other shape variants that control how markers are visually represented on maps; this includes adjusting marker icons or classes to customize pin shapes, marker silhouettes, or target points for better map visualization, with options typically applied through CSS classes or marker properties to influence the rendering style and enhance map marker identification and user interface design.
</div>

#### Example - setting marker shape
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
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


<div class="meta-api-description">
How to customize the hover tooltip text for map markers in Kendo UI? Set or customize the hover tooltip text displayed when pointing at map markers, configure or control the label or descriptive text that appears on mouseover, enable quick accessibility hints or brief informational popups for markers by defining the tooltip content, adjust the text shown in browser tooltips on marker hover, set marker hover titles for improved UX, create or update marker descriptions that appear on hover to provide contextual or identifying information, control the small info bubbles or labels triggered on hovering over map points, specify the text that appears as browser-native hover tooltips on geographic pins or markers, and configure marker hover annotations for clarity or user guidance.
</div>

#### Example - setting marker title
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
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


<div class="meta-api-description">
How to customize hover hints for map markers in Kendo UI? Set or customize dynamic informational popups, hover hints, or click tooltips for individual map points or markers by configuring content, style, layout, position, visibility triggers, and interaction behavior to enhance user guidance and contextual data presentation on map visualizations, enabling personalized marker annotations, labels, or info bubbles that respond to user actions such as hovering or clicking.
</div>

#### Example - configuring marker tooltip
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            markers: [{
                location: [42.6977, 23.3219],
                tooltip: {
                    autoHide: false,
                    content: "Sofia, Bulgaria - Capital city",
                    position: "top",
                    showOn: "click"
                }
            }]
        });
    </script>

### markers.tooltip.autoHide `Boolean`*(default: true)*

Specifies if the tooltip will be hidden when mouse leaves the target element. If set to false a close button will be shown within tooltip. If set to false, showAfter is specified and the showOn is set to "mouseenter" the Tooltip will be displayed after the given timeout even if the element is no longer hovered.


<div class="meta-api-description">
How do I control when map marker tooltips automatically hide in Kendo UI for jQuery? Control automatic hiding and visibility behavior of tooltips for map markers, including enabling or disabling tooltip dismissal when the mouse pointer leaves the marker area, managing whether a close button is displayed for manual closing, configuring delayed tooltip appearance after a specified timeout even without continuous hover, and adjusting interactive tooltip display settings to suit user intent for showing or hiding information on map elements with flexible delay and close controls.
</div>

#### Example - hide tooltip on mouse leave
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
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


<div class="meta-api-description">
How to control animation effects for marker tooltips in Kendo UI Map? Control and customize the appearance and behavior of marker tooltips on maps by enabling, disabling, or configuring animation effects such as fade, slide, or bounce to enhance user interaction and visual feedback. You can set specific animation sequences, override default transitions, adjust how tooltips animate on show or hide, or completely turn off all tooltip animations for performance or stylistic reasons. This flexibility supports use cases like creating smooth tooltip popups, disabling motion for accessibility or minimalistic designs, or defining custom animation arrays to achieve unique visual effects on map markers.
</div>

#### Example - disable animations
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
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


<div class="meta-api-description">
How can I customize the closing animation of tooltip markers on a Kendo UI map? Configure or disable the closing animation for tooltip markers on maps, controlling how marker tooltips smoothly fade out, slide away, or instantly disappear when closing; adjust animation effects including duration in milliseconds, easing curves for timing control, and toggle animations on or off by setting boolean values or detailed animation objects to customize the hide transitions for map marker tooltips.
</div>

#### Example - set close animation
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
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


<div class="meta-api-description">
How to customize the closing animation of map marker tooltips in Kendo UI for jQuery? Customize the closing animation of map marker tooltips by configuring the visual transition effects, enabling control over how tooltip popups disappear with options to set named effects, animation styles, durations, and easing. This feature supports adjusting tooltip close behavior for smoother or faster fade-outs, slide-away effects, or other animated transitions, allowing developers to tailor user interactions on map markers by controlling animation timing and styles when tooltips are dismissed or hidden.
</div>

#### Example - set close animation effect
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
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


<div class="meta-api-description">
How do I adjust the closing animation duration for map marker tooltips in Kendo UI for jQuery? Control and customize the time it takes for map marker tooltips to close by adjusting the closing animation duration, enabling synchronization with other interface transitions, animations, or effects. Developers often look to set, configure, or fine-tune the delay, speed, or timing of tooltip disappearance to enhance user experience, create smooth UI interactions, or coordinate with simultaneous animations. Adjust the parameter to manage how quickly tooltips fade out, vanish, or slide away after user interaction or events, ensuring responsive and polished map marker behavior across different devices and scenarios.
</div>

#### Example - set close animation duration
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
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


<div class="meta-api-description">
How do I customize the animation of tooltips on map markers in Kendo UI for jQuery? Control and customize the appearance animation of tooltips on map markers by configuring how tooltips open with various effects, durations, and easing options; set or enable opening animations to define the style and timing of marker tooltip transitions, control the animation behavior when marker labels or info bubbles appear, and adjust the visual entrance to enhance user interaction and map usability.
</div>

#### Example - set open animation
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
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


<div class="meta-api-description">
How can I customize the opening animation effect for map marker tooltips in Kendo UI? Customize or configure the opening animations for map marker tooltips to enhance visual presentation, including options to enable fade-in, slide-in, or other transition effects when a tooltip appears on markers. Adjust or control the animation style, timing, and effect type used to reveal informational pop-ups tied to map markers, allowing developers to set smooth, dynamic, or custom entry animations for tooltips. Enable various visual effects to improve user experience when tooltip overlays display upon marker activation or interaction, supporting different animation methods like fade, slide, or tailored custom animations for tooltip appearance on map interfaces.
</div>

#### Example - set open animation effect
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
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


<div class="meta-api-description">
How do I set the duration of the animation when a marker tooltip opens on a Kendo UI Map? Control and customize the timing or speed of how long the tooltip animation takes when marker info popups appear on a map, including setting the duration or length of the opening animation for marker tooltips, adjusting tooltip show time, managing animation delays or intervals for marker info bubbles, and configuring how quickly or slowly the marker tooltips reveal themselves during map interactions or initialization by specifying numeric animation duration values for smooth, timed tooltip opening effects.
</div>

#### Example - set open animation duration
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
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


<div class="meta-api-description">
How can I customize the content of tooltips for map markers in Kendo UI? Control and customize the text or dynamic content shown in tooltips for map markers by setting or generating the information displayed when hovering or interacting with markers. Enable developers to configure static strings or provide callback functions that return custom tooltip payloads, overriding default marker titles or labels. Support varied use cases such as displaying location names, descriptions, coordinates, or dynamic data in marker hover popups, info bubbles, interactive hints, or floating labels, allowing full flexibility in defining what information appears on marker tooltips across the map interface.
</div>

#### Example - extract the content from target marker
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
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
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
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


<div class="meta-api-description">
How to dynamically load marker tooltip content from external URLs in Kendo UI Map? Configure dynamic loading of marker tooltip content from external URLs or remote sources by specifying a string URL or detailed request options like AJAX or fetch parameters, enabling fetching and injecting HTML or data into map marker tooltips with customizable HTTP methods, headers, and other network settings. Control how tooltips retrieve external content including handling cross-origin requests, embedding iframes for protocol-based URLs, and adjusting request behaviors for asynchronous updates or real-time content display. Enable or set remote data sources for hover or click tooltips on map markers, supporting customization of content retrieval strategies, security considerations with CORS, and iframe embedding options to ensure flexible and configurable tooltip content delivery.
</div>

#### Example - load content from remote URL
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            markers: [{
                location: [42, 27],
                tooltip: {
                      content: {
                        url: "https://demos.telerik.com/kendo-ui/content/web/tooltip/ajax/ajaxContent3.html"
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


<div class="meta-api-description">
How can I customize the tooltip that appears when clicking on a marker in my Kendo UI Map widget? Create and customize interactive tooltips for map markers by defining HTML or text templates that dynamically display marker-specific information such as geographic location data and marker properties, enabling control over the tooltip’s appearance and content formatting while overriding default content settings and supporting flexible rendering of contextual details tied to individual map points.
</div>

#### Example - set tooltip template
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
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


<div class="meta-api-description">
How do I show or hide the callout pointer for a map marker's tooltip in Kendo UI? Control the display of the small pointer or arrow that visually connects a tooltip to a map marker by enabling, disabling, showing, hiding, or toggling the marker’s tooltip callout on maps. Configure the visibility of the tooltip pointer or callout indicator to improve user interactions, set whether marker tooltips include an arrow or pointer graphic, manage the presence of callouts for location markers, and customize how tooltips point to markers during map rendering and interaction. Adjust settings to show or suppress the visual callout element that anchors tooltip popups to map markers, enhancing clarity or minimizing visual clutter on map interfaces.
</div>

#### Example - hide the tooltip callout
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
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


<div class="meta-api-description">
How to prevent CSS collisions in Kendo UI map marker tooltips? Control whether marker tooltips on a map render their content inside an isolated iframe to encapsulate HTML, CSS, and JavaScript, enabling embedding of third-party or complex content without style or script conflicts; configure, enable, or disable iframe-based tooltips to manage isolation, prevent CSS collisions, secure sandboxed tooltip display, or customize marker hover content rendering behavior during map initialization.
</div>

#### Example - load content from remote URL
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            markers: [{
                location: [42, 27],
                tooltip: {
                      iframe: true,
                      content: {
                        url: "https://demos.telerik.com/kendo-ui/content/web/tooltip/ajax/ajaxContent3.html"
                      },
                      width: 220,
                      height: 280
                }
            }]
        });
    </script>

### markers.tooltip.height `Number`*(default: Infinity)*

The height (in pixels) of the tooltip.


<div class="meta-api-description">
How do I set the height of tooltips on Kendo UI Map markers? Adjust or configure the vertical height, size, or pixel dimension of tooltips displayed on map markers, controlling how tall the marker pop-up or hover info box appears to ensure consistent tooltip height across different markers or map views, with options to set or customize tooltip vertical spacing and appearance for improved UI alignment and readability on interactive maps.
</div>

#### Example - set the height of the tooltip
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
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


<div class="meta-api-description">
How do I set the width of tooltips for map markers in Kendo UI for jQuery? Adjust or configure the pixel width or size of tooltips on map markers to control how wide the informational popups appear, ensuring proper layout, preventing text overflow or clipping, customizing visual appearance, and maintaining consistent tooltip dimensions across interactive map points or markers.
</div>

#### Example - set the width of the tooltip
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
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


<div class="meta-api-description">
How do I adjust the position of tooltips on Kendo UI Map markers? Adjust or configure the placement and alignment of tooltips appearing on map markers, controlling where informational popups display in relation to the marker icons, such as positioning above, below, to the left, right, or centered over the marker. Enable precise control over tooltip location for enhanced user interface clarity by setting the tooltip’s orientation relative to map pins or markers, allowing developers to define how contextual data or labels appear in mapping applications. Manage tooltip alignment options to improve readability and user interaction by choosing from common directional placements like top, bottom, left, right, or center around the target marker element.
</div>

#### Example - set tooltip position
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
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


<div class="meta-api-description">
How do I control when tooltips appear over map markers in Kendo UI for jQuery? Configure the timing delay for displaying tooltips over map markers, enabling control over how long a user must hover or mouse over before a tooltip appears, with options to debounce quick or repeated hover events, set custom delays in milliseconds for hover or mouseenter triggers, control tooltip visibility timing to improve user experience, and adjust or disable delays for click or focus triggered tooltips.
</div>

#### Example - set show delay
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
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


<div class="meta-api-description">
How to control when tooltips appear on map markers in Kendo UI for jQuery? Customize the display behavior of map marker tooltips by specifying the triggering event such as hover with mouseenter, click interaction, or keyboard focus, enabling control over when tooltips become visible in response to user actions like mouseover, taps, or keyboard navigation to enhance interactivity, accessibility, and user experience on maps.
</div>

#### Example - show tooltip on mouse enter
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
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

> The map [zoom](/api/javascript/dataviz/ui/map#configuration-zoom) is clamped to the [minZoom, maxZoom] interval.


<div class="meta-api-description">
How do I set the minimum zoom level for a Kendo UI map to prevent users from zooming out too far? Control the lowest zoom level or minimum scale at which users can view the map, restricting how far they can zoom out to avoid displaying overly broad or global views; configure the smallest allowed zoom value to ensure maps only show detailed regions above a set threshold, clamp zoom levels to defined ranges to limit map scale, set minimum zoom boundaries to prevent users from seeing the entire world at once, adjust minimum zoom settings for finer control over map interactions and visibility, enforce a floor for zoom level to maintain focus on specific geographic areas, and enable clamping of zoom to ensure map navigation stays within preferred scale limits.
</div>

#### Example - limit zoom out to level 3
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            minZoom: 3,
            zoom: 5
        });
    </script>

### maxZoom `Number` *(default: 19)*

The maximum zoom level.
Typical web maps use zoom levels from 0 (whole world) to 19 (sub-meter features).

> The map [zoom](/api/javascript/dataviz/ui/map#configuration-zoom) is clamped to the [minZoom, maxZoom] interval.


<div class="meta-api-description">
How do I set a maximum zoom level on my Kendo UI map? Set or configure the upper limit for zooming on a map, controlling the maximum magnification level to prevent users from zooming in beyond a certain scale; this setting restricts map detail visibility from broad overviews of entire regions down to street-level or sub-meter precision, ensuring zoom levels stay within defined minimum and maximum boundaries for consistent user interaction, enabling control over map granularity, detail range, and user navigation limits in various mapping applications and interfaces.
</div>

#### Example - limit zoom in to level 10
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            maxZoom: 10,
            zoom: 5
        });
    </script>

### minSize `Number` *(default: 256)*

The size of the map in pixels at zoom level 0.


<div class="meta-api-description">
How do I set the initial map size for Kendo UI Map to control zoom behaviors? Configure the base pixel dimensions or initial map size at the lowest zoom level to control coordinate calculations, tile scaling, and rendering dimensions for maps when setting up zoom behaviors and tile layouts, enabling adjustment of the map’s foundational scale, initial resolution, and pixel sizing used during map initialization and zoom level zero display.
</div>

#### Example - setting minimum map size
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            center: [30.268107, -97.744821],
            zoom: 3,
            minSize: 512,
            layers: [{
                type: "tile",
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });
    </script>

### messages `Object`

Allows localization of the strings that are used in the widget.


<div class="meta-api-description">
How do I customize UI text in Kendo UI Map? Customize and translate UI text labels, messages, prompts, notifications, and interface strings within the map display by setting or configuring localized wording, language packs, or message overrides for map elements, enabling internationalization, multilingual support, and user-facing text adjustments to match specific languages, regions, or custom terminology in map interfaces and controls.
</div>

#### Example - configuring map messages
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            center: [30.268107, -97.744821],
            zoom: 3,
            messages: {
                tileTitle: "Mapa del territorio"
            },
            layers: [{
                type: "tile",
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });
    </script>

### messages.tileTitle `String` *(default: "Map tile")*

Specifies `alt` attribute value for the Map tile `<img>` elements.


<div class="meta-api-description">
How do I customize alternative text labels for map tile images in Kendo UI for jQuery? Configure and customize alternative text labels for map tile images to ensure accessibility compliance and support localization of map imagery descriptions, enabling screen readers and assistive technologies to accurately convey map tile content, set or update image alt attributes dynamically for different languages or regions, control descriptive text for map tiles to improve user experience in multilingual environments, and enhance semantic meaning of visual map elements for better accessibility and internationalization support.
</div>

#### Example - setting custom tile title message
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            center: [30.268107, -97.744821],
            zoom: 3,
            messages: {
                tileTitle: "Interactive Map Tile"
            },
            layers: [{
                type: "tile",
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });
    </script>

### pannable `Boolean` *(default: true)*

Controls whether the user can pan the map.


<div class="meta-api-description">
How can I allow users to pan a Kendo UI map? Control the ability to enable or disable interactive map panning, allowing or blocking user navigation through dragging, touch gestures, mouse movements, or finger swipes to move the viewport, map scrolling gestures, or manual map repositioning. This setting governs whether users can freely explore the map by dragging or touch-dragging the display, set the map to be non-movable or fixed in place, lock or unlock map view navigation, and control gesture-based map movement such as swipe-to-pan or click-and-drag map repositioning. Adjusting this option lets developers restrict or permit user-driven map navigation via pointer or touch interactions, effectively toggling manual viewport movement and panning responsiveness on or off.
</div>

#### Example - make the map non-pannable
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            center: [32.7758, -96.7966],
            zoom: 9,
            pannable: false
        });
    </script>

### wraparound `Boolean` *(default: true)*

Specifies whether the map should wrap around the east-west edges.


<div class="meta-api-description">
How to enable continuous east-west scrolling on Kendo UI Map? Control seamless horizontal scrolling on the map by enabling or disabling continuous east-west wrapping, allowing navigation across the 180-degree meridian with smooth panning and automatic longitude normalization; configure wraparound features to manage how map tiles load and behave when crossing dateline boundaries, supporting infinite horizontal map movement, longitude wrapping, and edge-to-edge seamless navigation for mapping applications.
</div>

#### Example - disable map wrap-around
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            wraparound: false
        });
    </script>

### zoom `Number` *(default: 3)*

The initial zoom level.

Typical web maps use zoom levels from 0 (whole world) to 19 (sub-meter features).

The map size is derived from the zoom level and minScale options: `size = (2 ^ zoom) * minSize`

> Map zoom rounds floating point numbers. This is done so as the majority of web maps use the whole [`zoom levels`](https://wiki.openstreetmap.org/wiki/Zoom_levels) 0 through to 19.


<div class="meta-api-description">
How do I control the initial zoom level of a map view using Kendo UI for jQuery? Adjust initial zoom level or scale of map view to control visible geographic detail, from world overview at zoom 0 up to street or building level detail around zoom 19; configure map magnification, set default zoom scale, enable precise zooming, manage map level of detail for features ranging from global extents to sub-meter resolution, control map initial display size and level, handle zoom rounding behavior between whole-number zoom levels, and customize how closely users see map data by setting zoom to values corresponding to various map scales and detail granularities.
</div>

#### Example - setting initial zoom level
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            center: [32.7758, -96.7966],
            zoom: 9
        });
    </script>

### zoomable `Boolean` *(default: true)*

Controls whether the map zoom level can be changed by the user.


<div class="meta-api-description">
Can I disable zooming on a Kendo UI map through user interactions? Control whether users can zoom in and out of the map through interactive gestures like mouse wheel scrolling, pinch-to-zoom on touch devices, double-click actions, or interface buttons, or restrict zooming exclusively to programmatic commands and disable all user-initiated zoom adjustments. This setting manages the ability to enable, disable, configure, or lock zoom level changes triggered by user input or automated controls, ensuring flexible handling of map scale responsiveness, touch interaction handling, scroll wheel zooming, interface zoom control, and programmatic zoom management.
</div>

#### Example - make the map non-zoomable
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
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


<div class="meta-api-description">
How do I dynamically reposition the Kendo UI map view with a specific latitude and longitude? Retrieve or update the geographical center point of the map view by getting the current coordinates or setting new latitude and longitude values to reposition the map. Control, change, adjust, or recenter the map focus dynamically, enabling smooth map navigation or resetting the viewport. Supports chaining to quickly combine centering with other map operations for fluent, sequential method calls when manipulating map position or viewport. Access or modify the map’s central location for responsive map display, dynamic panning, coordinate setting, or user-driven map adjustments through programmable commands.
</div>

#### Parameters

##### center `Array|kendo.dataviz.map.Location`

The location of the new map center.
An array argument is assumed to be in [Latitude, Longitude] order.

#### Returns

`kendo.dataviz.map.Location` The current map center.

#### Example - set the map center and zoom level
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });

        var map = $("#map").data("kendoMap");
        map.center([32.7758, -96.7966]).zoom(10);
    </script>

### destroy

Prepares the widget for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> This method does not remove the widget element from DOM.


<div class="meta-api-description">
How do I properly dispose of a Kendo UI Map instance to prevent memory leaks? clean up map instance remove event listeners disable event handlers detach attached events erase stored data release resources clean memory prevent memory leaks dispose of child components properly with recursive destruction avoid DOM removal ensure safe component teardown gracefully disable map features and event bindings effectively reset internal state and associated data from the map widget to allow garbage collection and prevent lingering memory use
</div>

#### Example - destroy the map and remove it from the DOM
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
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


<div class="meta-api-description">
How to get the cursor position relative to the map container using Kendo UI's Map widget? Retrieve pointer or cursor position relative to the map container by obtaining event coordinates from mouse or touch inputs for accurate DOM placement tasks such as positioning overlays, tooltips, or interactive elements. Enable capturing pixel offsets within the map viewport to handle hit-testing, detect user interaction points, or align HTML elements based on user input locations without converting to geographic coordinates or map-projected positions. Access relative event offsets to control UI element placement dynamically during pointer events, clicks, taps, or gestures inside the map’s bounding box, focusing on client-area coordinates rather than map spatial references.
</div>

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
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
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


<div class="meta-api-description">
How do I convert mouse event positions to map coordinates in Kendo UI Map? Convert mouse or touch event positions into map coordinates within the map’s projection system, translate screen pointer locations to precise layer coordinates for accurate placement of markers or interactive elements, map clicks or user input to spatial features on the map canvas, enable detection of pointer location relative to map layers regardless of zoom, control coordinate translation from pointer events to map geometry for tasks like hit-testing, coordinate conversion, or interaction mapping, support capturing user interactions by mapping screen events to map space positions, provide access to absolute map layer coordinates corresponding to user clicks or touches, handle input positioning on dynamic map projections and zoom levels, and facilitate accurate event-driven spatial calculations within map visualizations.
</div>

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
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });

        var map = $("#map").data("kendoMap");
        $("#map").click(function(e) {
            var proj = map.eventToLayer(e);
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("Projected coordinates: ", proj.toString());
        });
    </script>

### eventToLocation

Retrieves the geographic location that correspond to this mouse event.


<div class="meta-api-description">
How do I convert mouse click events to geographic coordinates in a Kendo UI Map widget? Translate or convert mouse events, clicks, or pointer actions on a map or map component into geographic coordinates or latitude and longitude values, enabling the retrieval of precise map locations from screen positions or DOM events. This functionality supports extracting map coordinates from user interactions like mouse clicks, pointer events, or touch inputs for placing markers, opening popups, performing spatial queries or calculations, and integrating event-driven geospatial data. Whether you need to map screen-based events to real-world locations, convert UI events into map coordinates, or get lat/lon from a mouse action on an interactive map, this enables seamless linking of DOM events with geographic points.
</div>

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
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
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

View coordinates are no longer valid after a map [reset](/api/javascript/dataviz/ui/map/events/reset).


<div class="meta-api-description">
How to convert mouse events to map coordinates using Kendo UI's eventToView method? Convert mouse or pointer events to map view coordinates to identify locations beneath the cursor by translating screen clicks, taps, or mouse movements into relative map positions; useful for detecting which map features or layers intersect a mouse event, enabling selection, interaction, or hit testing based on user input coordinates; supports mapping pixel or client coordinates from mouse events into the map’s view space for feature detection, cursor tracking, or event handling, but requires recalculating after map resets or view transformations to maintain accuracy.
</div>

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
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
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


<div class="meta-api-description">
How do I adjust the visible map area in Kendo UI for jQuery? Adjust, retrieve, or manipulate the currently visible geographical area on a map by getting or setting the viewport boundaries, visible region, or bounding box; perform programmatic zooming, panning, fitting to specific coordinates or bounds, querying the current map viewable area, and chaining these operations to control what portion of the map is displayed dynamically, enabling seamless integration with navigation, viewport adjustments, or spatial queries.
</div>

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
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });

        var map = $("#map").data("kendoMap");
        var extent = map.extent();

        console.log("North West corner: " + extent.nw.toString());
    </script>

#### Example - set the map extent to show Australia
      <div id="map"></div>
      <script>
        $("#map").kendoMap({
          zoom: 4,
          layers: [{
            type: "tile",
            urlTemplate: "https://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
            subdomains: ["a", "b", "c"],
            attribution: "© <a href='https://osm.org/copyright'>OpenStreetMap contributors</a>"
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


<div class="meta-api-description">
How do I convert map layer coordinates to latitude and longitude using Kendo UI's Map API? Convert or transform coordinates from a map’s projected layer or component coordinate system into real-world geographic locations such as latitude and longitude, enabling precise positioning of markers, interpreting user interactions like clicks or taps on the map layer, translating screen or layer points to global coordinates, and linking spatial data or UI elements with accurate geospatial references after the map is loaded or initialized.
</div>

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
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });

        var map = $("#map").data("kendoMap");
        var loc = map.layerToLocation([0, 0]).round();
	/* The result can be observed in the DevTools(F12) console of the browser. */
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
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });

        var map = $("#map").data("kendoMap");
        var point = new kendo.geometry.Point(0, 0);
        var loc = map.layerToLocation(point).round();
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(loc.toString());
        // -180.000000,85.000000
    </script>

### locationToLayer

Returns the layer (projected) coordinates that correspond to a geographical location.


<div class="meta-api-description">
How to convert geographic coordinates to map layer coordinates in Kendo UI Map? Translate geographic coordinates, latitude and longitude, or map locations into the map’s projected layer coordinate system to position markers, overlays, popups, or perform hit-testing and alignment tasks; enable converting spatial points on the earth’s surface into precise pixel or layer coordinates within the map view for accurate element placement, spatial calculations, or interaction handling on map layers.
</div>

#### Parameters

##### location `Array|kendo.dataviz.map.Location`

The geographic location.
An array argument is assumed to be in [Latitude, Longitude] order.

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
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });

        var map = $("#map").data("kendoMap");
        var point = map.locationToLayer([0, 0]).round();
	/* The result can be observed in the DevTools(F12) console of the browser. */
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
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });

        var map = $("#map").data("kendoMap");
        var loc = new kendo.dataviz.map.Location(0, 0);
        var point = map.locationToLayer(loc).round();
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(point.toString());
        // 256,256
    </script>

### locationToView

Returns the view (relative) coordinates that correspond to a geographical location.


<div class="meta-api-description">
How do I convert geographic coordinates to pixel coordinates using Kendo UI Map's locationToView method? Convert geographic coordinates such as latitude and longitude into pixel or screen coordinates relative to a map container or viewport to position markers, overlays, popups, or custom UI elements accurately on a map. Enable transforming location data into x and y points for precise placement within a map view, configure pixel positioning from geographic positions, calculate coordinate conversions between spatial locations and map pixels, and translate geographic points into view coordinates for rendering interactive elements or dynamic features tied to real-world positions on a map display. This method supports applications needing to map geospatial data onto screen space for visualization, interaction, or custom overlay alignment.
</div>

#### Parameters

##### location `Array|kendo.dataviz.map.Location`

The geographic location.
An array argument is assumed to be in [Latitude, Longitude] order.

#### Returns

`kendo.geometry.Point` The view coordinates that correspond to a geographical location.

#### Example - retrieve view coordinates of map center
    <div id="map" style="width: 1024px; height: 1024px;"></div>
    <script>
        $("#map").kendoMap({
            zoom: 3,
            center: [0, 0],
            layers: [{
                type: "tile",
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });

        var map = $("#map").data("kendoMap");
        var view = map.locationToView([0, 0]).round();
	/* The result can be observed in the DevTools(F12) console of the browser. */
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
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });

        var map = $("#map").data("kendoMap");
        var loc = new kendo.dataviz.map.Location(0, 0);
        var view = map.locationToView(loc).round();
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(view.toString());
        // 512,512
    </script>

### resize

Adjusts the widget layout to match the size of the container.


<div class="meta-api-description">
How to resize a Kendo UI map after window resizing? Adjust map display to fit updated container dimensions after window resizing, layout shifts, or toggling visibility by recalculating viewport size and refreshing layers and rendering. Use methods to update map size, reflow map content, synchronize map visuals with changing CSS or DOM element sizes, ensure map layers and tiles re-render correctly after container resizing events, keep interactive map displays aligned with parent containers when dimensions are altered dynamically, and control map viewport recalculations to maintain accurate display after size changes or responsive layout adjustments.
</div>

#### Example

    <div id="map" style="width: 512px; height: 512px;"></div>
    <script>
        $("#map").kendoMap({
            zoom: 3,
            center: [0, 0],
            layers: [{
                type: "tile",
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
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


<div class="meta-api-description">
How to dynamically update a Kendo UI map's configuration after initialization? Modify or update an active map’s configuration dynamically by applying new settings such as view parameters, control toggles, layer changes, or other customization options without recreating or reloading the map instance. This functionality enables runtime adjustments by merging new options into the existing map state, resetting internal components as needed and triggering a re-render to reflect changes instantly. It supports flexible map updates, live reconfiguration, resetting map properties, changing map behavior on the fly, and refreshing the map display based on new configuration inputs while preserving current map context.
</div>

#### Parameters

##### options `Object`

The new options to be applied.

#### Example - set map zoom & center simultaneously
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
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


<div class="meta-api-description">
How do I get the current visible map area dimensions in Kendo UI Map? Retrieve or obtain the current visible map area dimensions, including width and height, to determine viewport size for placing overlays, markers, tiles, or adapting layouts dynamically; measure the map’s displayed portion during initialization, after zoom changes, or on window resizing to support responsive design, element positioning, and rendering updates by getting accurate viewport measurements and map view boundaries.
</div>

#### Returns

`Object` The size (width and height) of the visible portion of the map.

#### Example - retrieve view size
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            zoom: 1, // Layer size is 512px (2^1 * 256)
            layers: [{
                type: "tile",
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });

        var map = $("#map").data("kendoMap");
        var viewSize = map.viewSize();
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(viewSize);
        // { width: 1024, height: 512 }
    </script>

### viewToLocation

Returns the geographical location that correspond to the view (relative) coordinates.


<div class="meta-api-description">
How do I convert map coordinates to latitude and longitude using Kendo UI for jQuery's viewToLocation method? Convert screen or map viewport pixel coordinates into geographic latitude and longitude to translate user interactions like clicks or touches on the map into real-world locations, enabling placing markers, opening popups at specific points, performing precise hit-testing, mapping view positions to spatial data, transforming relative view points into geographic coordinates, translating x/y map positions to lat/lon, and converting UI coordinate inputs into map locations for interaction handling and location-based features.
</div>

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
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });

        var map = $("#map").data("kendoMap");
        var loc = map.viewToLocation([512, 512]).round();
	/* The result can be observed in the DevTools(F12) console of the browser. */
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
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });

        var map = $("#map").data("kendoMap");
        var view = new kendo.geometry.Point(512, 512);
        var loc = map.viewToLocation(view).round();
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(loc.toString());
        // 0.000000,0.000000
    </script>

### zoom

Gets or sets the map zoom level.
The setter is chainable, i.e. returns the map instance.


<div class="meta-api-description">
How do I programmatically adjust the zoom level of a Kendo UI map? Adjust or retrieve the current zoom level of a map programmatically through methods that let you get the map’s zoom value or set a new zoom scale dynamically. Enable zoom control, modify zoom levels, query current zoom state, update map zoom interactively, and chain zoom adjustments with map instance methods for seamless map scaling and view management. Whether you need to access the current zoom factor or programmatically change the zoom level for map navigation and display, this functionality supports zoom retrieval, assignment, and fluent interface chaining for smooth zoom manipulation and map control workflows.
</div>

#### Parameters

##### level `Number`

The new zoom level. The value is clamped to the
 [[minZoom](/api/javascript/dataviz/ui/map#configuration-minZoom), [maxZoom](/api/javascript/dataviz/ui/map#configuration-maxZoom)] interval.

#### Returns

`Number` The current zoom level.

#### Example - zoom in
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            layers: [{
                type: "tile",
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
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


<div class="meta-api-description">
What happens when Kendo UI map is reset? Detect and respond to the event triggered just before a map reset occurs to perform cleanup tasks such as removing event listeners, detaching or resetting layers, clearing temporary data or caches, handling resource release, and running custom teardown code before the map refreshes or reinitializes, enabling layer control, state reset handling, and efficient resource management prior to the reset action.
</div>

#### Example - handling beforeReset event
    <div id="map"></div>
    <script>
        $("#map").kendoMap({
            center: [30.268107, -97.744821],
            zoom: 3,
            layers: [{
                type: "tile",
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            beforeReset: function(e) {
                console.log("Map is about to reset");
                // Perform cleanup operations here
            }
        });
    </script>

#### Event Data

##### e.sender `kendo.dataviz.ui.Map`

The source widget instance.

### click

Fired when the user clicks on the map.


<div class="meta-api-description">
How do I capture user clicks on a Kendo UI map to add markers? Detect and respond to user clicks on a map interface to enable interactions like adding markers, opening tooltips or popups, selecting geographic features or layers, capturing click coordinates, and accessing event details for updating the display or fetching related information. This event-driven handling supports capturing map surface clicks, retrieving precise location data, identifying target elements or features clicked, managing UI changes triggered by user input, configuring click handlers to control map behavior, and integrating custom responses to map clicks across different contexts.
</div>

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
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
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
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });

        var map = $("#map").data("kendoMap");
        map.bind("click", function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("You clicked at " + e.location.toString());
        });
    </script>

### markerActivate

Fired when a marker has been displayed and has a DOM element assigned.


<div class="meta-api-description">
How do I trigger an event when a marker is displayed on a Kendo UI map? Detect when a map marker is displayed and its associated DOM element becomes accessible by listening for marker activation events that signal the marker’s presence in the document structure. Enable triggering actions when a marker appears on the map, such as attaching event handlers, customizing the marker’s HTML content or attributes, initiating animations, performing layout measurements, or manipulating marker elements dynamically once they are rendered and available in the DOM. This event supports developer needs for marker lifecycle detection, real-time updates, interactive modifications, and integration of marker-related DOM manipulations during or after marker rendering on the map.
</div>

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

Use [markerActivate](/api/javascript/dataviz/ui/map/events/markeractivate) if you need to access the marker DOM element.

> Markers are automatically created for GeoJSON Point geometries. If the markerCreated event is cancelled a regular shape (circle) will be created instead.


<div class="meta-api-description">
How to intercept marker creation events in Kendo UI for jQuery? Detect when a map marker is generated, intercept marker creation events, customize or modify markers prior to displaying them on the map, handle marker instantiation for GeoJSON points, prevent marker rendering by canceling marker creation, control or override default automatic marker placement, manage marker setup before DOM element activation, replace markers with default shapes like circles when creation is canceled, adjust marker appearance or behavior dynamically at creation time, and implement event-driven marker workflows during map rendering or data visualization.
</div>

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


<div class="meta-api-description">
How do I handle click events on map markers with Kendo UI for jQuery? Detect and respond to user interactions with map markers by capturing clicks or taps on markers, enabling custom behavior such as executing functions when a marker is selected, updating application state, displaying popups or information windows, triggering navigation or routing, handling marker activation events, or performing actions based on user inputs on map pins, icons, or points of interest.
</div>

#### Example - Change marker color when it is is clicked or tapped
    <div id="map"></div>
    <script>
      function createMap() {
        $("#map").kendoMap({
          center: [30.268107, -97.744821],
          zoom: 3,
          layers: [{
            type: "tile",
            urlTemplate: "https://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
            subdomains: ["a", "b", "c"],
            attribution: "&copy; <a href='https://osm.org/copyright'>OpenStreetMap contributors</a>"
          }],
          markers: [{
            location: [30.268107, -97.744821],
            shape: "pinTarget",
            tooltip: {
              content: "Austin, TX"
            }
          }],
          markerClick: function(e) {
            $(e.marker.element.context).css("color", "green");
          }
        });
      }
      $(document).ready(createMap);
    </script>

#### Event Data

##### e.marker `kendo.dataviz.map.Marker`

The marker instance.

##### e.layer `kendo.dataviz.map.Marker`

The marker layer instance.

##### e.sender `kendo.dataviz.ui.Map`

The source widget instance.

### pan

Fired while the map viewport is being moved.


<div class="meta-api-description">
How to detect continuous viewport movement in Kendo UI map when user is dragging or panning? Detect continuous viewport movement events during map dragging or panning actions to track and respond in real-time as the map view shifts, enabling dynamic updates for overlays, markers, coordinate displays, synchronized UI components, or custom handlers that handle smooth transitions, viewport changes, animated map movements, and controlled event firing to optimize performance by throttling or debouncing operations during user-driven map navigation or programmatic view adjustments.
</div>

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
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            pan: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
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
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });

        var map = $("#map").data("kendoMap");
        map.bind("pan", function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("pan to " + e.center.toString());
        });
    </script>

### panEnd

Fires after the map viewport has been moved.


<div class="meta-api-description">
How do I trigger an event when the Kendo UI map finishes panning? Detect when the map stops moving or dragging to trigger actions after panning finishes, enabling updates to map overlays, refreshing markers or layers based on the new visible area, synchronizing UI elements with the latest map center and bounds, and initiating data loading or tile requests aligned with the map’s final viewport position once the user completes a pan interaction or programmatic movement.
</div>

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
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            panEnd: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
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
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });

        var map = $("#map").data("kendoMap");
        map.bind("panEnd", function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("pan ended at " + e.center.toString());
        });
    </script>

### reset

Fired when the map is reset.
This typically occurs on initial load and after a zoom/center change.


<div class="meta-api-description">
How do I refresh map layers and markers when the user zooms in/out or changes the center? Listen for map reset triggers such as initial loading, zoom changes, or center updates to detect when the map view or state is refreshed, enabling developers to run custom code that reinitializes layers, overlays, markers, controls, UI elements, or dynamic data bound to the map, refresh view-dependent information, recalculate spatial data, update overlays, recompute zoom-level features, or reset interactive components to maintain synchrony with the updated map context.
</div>

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
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            reset: function() {
	/* The result can be observed in the DevTools(F12) console of the browser. */
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
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });

        var map = $("#map").data("kendoMap");
        map.bind("reset", function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("map reset");
        });
    </script>

### shapeClick

Fired when a shape is clicked or tapped.


<div class="meta-api-description">
How do I handle shape selection events in Kendo UI for jQuery Map component? Capture and respond to user interactions with map shapes including clicks, taps, or selections on polygons, markers, and other vector features. Enable handling of shape selection events to trigger custom logic such as navigation, UI updates, information display, or interactive feedback based on the clicked or tapped shape. Configure event listeners that provide detailed event data and target shape properties for dynamic response to user input on mapped geometries, facilitating interactivity and contextual actions in mapping applications.
</div>

#### Event Data

##### e.layer `kendo.dataviz.map.layer.Shape`

The parent layer instance.

##### e.shape `kendo.drawing.Element`

The shape instance.

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
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            shapeClick: function() {
	/* The result can be observed in the DevTools(F12) console of the browser. */
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
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });

        var map = $("#map").data("kendoMap");
        map.bind("shapeClick", function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("shape clicked");
        });
    </script>

### shapeCreated

Fired when a shape is created, but is not rendered yet.


<div class="meta-api-description">
How can I access the geometry of a shape after it is created on a Kendo UI map? Detect when a new shape is generated on a map, capture the event triggered at shape creation before rendering, access and modify shape geometry, attributes, or metadata right after instantiation, intercept shape objects for inspection or customization, configure or enhance shapes prior to drawing, handle callbacks when shapes are initialized but not yet visible, control shape properties early in the drawing workflow, implement custom logic or validation immediately after a shape is created on a map, respond programmatically to shape creation events for dynamic updates or adjustments.
</div>

#### Event Data

##### e.layer `kendo.dataviz.map.layer.Shape`

The parent layer instance.

##### e.shape `kendo.drawing.Element`

The shape instance.

##### e.sender `kendo.dataviz.ui.Map`

The source widget instance.

##### e.originalEvent `Object`

The source jQuery event instance

#### Example - bind to the map shapeCreated event on initialization
    <div id="map"></div>
    <script>
      var data = [
        { "type": "Feature",
         "geometry": {
           "type": "Polygon",
           "coordinates": [
             [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0],
              [100.0, 1.0], [100.0, 0.0] ]
           ]
         },
         "properties": {
           "name": "Feature #1"
         }
        }
      ];

      $("#map").kendoMap({
        center: [0.5, 100.5],
        zoom: 8,
        layers: [{
          type: "shape",
          dataSource: {
            type: "geojson",
            data: data
          }
        }],
        shapeCreated: onShapeCreated
      });

      function onShapeCreated(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("shape created: ", e.shape.dataItem.properties.name);
      }
    </script>

### shapeFeatureCreated

Fired when a [GeoJSON Feature](https://geojson.org/geojson-spec.html#feature-objects) is created on a shape layer.


<div class="meta-api-description">
What event is triggered when new GeoJSON features are added to a shape layer on a Kendo UI map? Trigger actions or run custom code automatically when new GeoJSON features are added to shape layers on a map, capture and handle events for shapes created interactively or programmatically, detect and respond when users or processes create new geometries or features within map layers, synchronize added shape data with application state or external databases, enable dynamic updates and real-time processing of newly drawn or imported features, monitor and handle shape creation events to update UI components or layer visuals, configure event listeners to intercept feature creation for validation, modification, or analytics, support workflows requiring immediate feedback or manipulation upon adding polygons, lines, or points to map layers.
</div>

#### Event Data

##### e.dataItem `Object`

The original data item for this Feature. Members include `geometries` and `properties`.

##### e.layer `kendo.dataviz.map.layer`

The parent layer instance.

##### e.group `kendo.drawing.Group`

The group containing feature shape instances.

##### e.properties `Object`

A reference to the `dataItem.properties` object.

##### e.sender `kendo.dataviz.ui.Map`

The source widget instance.

#### Example - bind to the map shapeFeatureCreated event on initialization
    <div id="map"></div>
    <script>
      var data = [
        { "type": "Feature",
         "geometry": {
           "type": "Polygon",
           "coordinates": [
             [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0],
              [100.0, 1.0], [100.0, 0.0] ]
           ]
         },
         "properties": {
           "name": "Feature #1"
         }
        }
      ];

      $("#map").kendoMap({
        center: [0.5, 100.5],
        zoom: 8,
        layers: [{
          type: "shape",
          dataSource: {
            type: "geojson",
            data: data
          }
        }],
        shapeFeatureCreated: onShapeFeatureCreated
      });

      function onShapeFeatureCreated(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("feature created: ", e.properties.name);
      }
    </script>

### shapeMouseEnter

Fired when the mouse enters a shape.

> **Important**
>
> This event will fire reliably only for shapes that have set fill color.
> The opacity can still be set to 0 so the shapes appear to have no fill.


<div class="meta-api-description">
How do I detect when the mouse enters or hovers over a shape in Kendo UI Map? Detect when the mouse pointer, cursor, or mouse enters, hovers over, or moves onto a shape on the map for implementing interactive behaviors like highlighting shapes on hover, showing tooltips, changing cursor style, initiating hit-testing, triggering selections on pointer enter, or responding to mouseover events on mapped shapes with fill colors (including invisible fill via zero opacity), supporting use cases related to mouse enter, hover detection, shape pointer events, cursor changes, and interactive shape responses.
</div>

#### Event Data

##### e.layer `kendo.dataviz.map.layer.Shape`

The parent layer instance.

##### e.shape `kendo.drawing.Element`

The shape instance.

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
              type: "shape",
              dataSource: {
                type: "geojson",
                data: [{
                  "type": "Polygon",
                  "coordinates": [
                    [[0, 10], [0, 20], [10, 20], [10, 10], [0, 10]]
                  ]
                }, {
                  "type": "Polygon",
                  "coordinates": [
                    [[0, 0], [0, 10], [10, 10], [10, 0], [0,0]]
                  ]
                }]
              },
              style: {
                fill: {
                  color: "#aaa"
                }
              }
            }],
            shapeMouseEnter: function() {
	/* The result can be observed in the DevTools(F12) console of the browser. */
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
              type: "shape",
              dataSource: {
                type: "geojson",
                data: [{
                  "type": "Polygon",
                  "coordinates": [
                    [[0, 10], [0, 20], [10, 20], [10, 10], [0, 10]]
                  ]
                }, {
                  "type": "Polygon",
                  "coordinates": [
                    [[0, 0], [0, 10], [10, 10], [10, 0], [0,0]]
                  ]
                }]
              },
              style: {
                fill: {
                  color: "#aaa"
                }
              }
            }]
        });

        var map = $("#map").data("kendoMap");
        map.bind("shapeMouseEnter", function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("shape mouseenter");
        });
    </script>

#### Example - Highlight Shapes on shapeMouseEnter/shapeMouseLeave
    <div id="map"></div>
    <script>
      $("#map").kendoMap({
        zoom: 3,
        layers: [{
          type: "shape",
          dataSource: {
            type: "geojson",
            data: [{
              "type": "Polygon",
              "coordinates": [
                [[0, 10], [0, 20], [10, 20], [10, 10], [0, 10]]
              ]
            }, {
              "type": "Polygon",
              "coordinates": [
                [[0, 0], [0, 10], [10, 10], [10, 0], [0,0]]
              ]
            }]
          },
          style: {
            // Simulate no fill with a fully transparent color
            fill: {
              color: "#fff",
              opacity: 0
            }
          }
        }],
        shapeMouseEnter: function(e) {
          e.shape.fill("#00f", 1);
        },
        shapeMouseLeave: function(e) {
          e.shape.fill("#fff", 0);
        }
      });
    </script>

### shapeMouseLeave

Fired when the mouse leaves a shape.

> **Important**
>
> This event will fire reliably only for shapes that have set fill color.
> The opacity can still be set to 0 so the shapes appear to have no fill.


<div class="meta-api-description">
How to handle hover effects removal when mouse pointer exits a filled shape on a Kendo UI map? Trigger actions when the mouse pointer exits or leaves a filled shape on a map polygon, path, or geometry to handle hover effects removal, tooltip hiding, unselection, or UI and state updates. Detect pointer exit events for shapes to run cleanup tasks, disable highlights, update data bindings, or adjust interactivity when users move the cursor away from polygons, markers, or map elements with visible or transparent fills. Listen for mouse leave events related to shapes to manage dynamic feedback, user interactions, or styling changes after hover, ensuring reliable detection only for shapes configured with fill colors even if fully transparent. Enable control over pointer out of map shapes to coordinate interface changes, revert visual cues, or remove active selections in mapping or geospatial applications.
</div>

#### Event Data

##### e.layer `kendo.dataviz.map.layer.Shape`

The parent layer instance.

##### e.shape `kendo.drawing.Element`

The shape instance.

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
              type: "shape",
              dataSource: {
                type: "geojson",
                data: [{
                  "type": "Polygon",
                  "coordinates": [
                    [[0, 10], [0, 20], [10, 20], [10, 10], [0, 10]]
                  ]
                }, {
                  "type": "Polygon",
                  "coordinates": [
                    [[0, 0], [0, 10], [10, 10], [10, 0], [0,0]]
                  ]
                }]
              },
              style: {
                fill: {
                  color: "#aaa"
                }
              }
            }],
            shapeMouseLeave: function() {
	/* The result can be observed in the DevTools(F12) console of the browser. */
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
              type: "shape",
              dataSource: {
                type: "geojson",
                data: [{
                  "type": "Polygon",
                  "coordinates": [
                    [[0, 10], [0, 20], [10, 20], [10, 10], [0, 10]]
                  ]
                }, {
                  "type": "Polygon",
                  "coordinates": [
                    [[0, 0], [0, 10], [10, 10], [10, 0], [0,0]]
                  ]
                }]
              },
              style: {
                fill: {
                  color: "#aaa"
                }
              }
            }]
        });

        var map = $("#map").data("kendoMap");
        map.bind("shapeMouseLeave", function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("shape mouseleave");
        });
    </script>

### zoomStart

Fired when the map zoom level is about to change.
Cancelling the event will prevent the user action.


<div class="meta-api-description">
How to prevent zoom level changes from occurring on a Kendo UI map? Detect, intercept, or listen for zoom level changes about to occur on a map, enabling control over zoom actions before they take effect. This event triggers prior to zoom modifications, allowing you to monitor, validate, confirm, or block zoom updates initiated by users or programmatic interactions. It supports scenarios like canceling unwanted zoom transitions, restricting zoom levels, preventing accidental zoom changes, or enforcing custom zoom restrictions by inspecting and potentially halting zoom start events for maps.
</div>

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
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            zoomStart: function() {
	/* The result can be observed in the DevTools(F12) console of the browser. */
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
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });

        var map = $("#map").data("kendoMap");
        map.bind("zoomStart", function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
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
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            zoomStart: function(e) {
                e.preventDefault();
            }
        });
    </script>

### zoomEnd

Fired when the map zoom level has changed.


<div class="meta-api-description">
What event is triggered when zooming on a Kendo UI map completes? Detect when zooming on a map completes, capturing the moment the zoom level changes and settles to trigger actions such as updating map tiles, refreshing overlays, reclustering markers, syncing zoom controls, saving the current zoom state, loading new data, or updating the user interface after zoom interactions or automated zoom adjustments finish. This event enables executing post-zoom logic like recalculating visible elements, responding to user zoom gestures, programmatically setting zoom levels, and ensuring map content reflects the final zoom scale for dynamic map experiences.
</div>

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
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }],
            zoomEnd: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
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
                urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                attribution: "&copy; OpenStreetMap"
            }]
        });

        var map = $("#map").data("kendoMap");
        map.bind("zoomEnd", function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("zoom end @ " + e.sender.zoom());
        });
    </script>
