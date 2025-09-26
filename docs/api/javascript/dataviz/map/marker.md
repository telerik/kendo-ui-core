---
title: Marker
page_title: API reference for Kendo UI Map Marker
res_type: api
---

# kendo.dataviz.map.Marker

Represents a Map marker with title and location.

## Configuration

### location `Array|kendo.dataviz.map.Location`

The marker location on the map. Coordinates are listed as `[Latitude, Longitude]`.


<div class="meta-api-description">
Specify or update the geographic coordinates for placing a map pin or marker using latitude and longitude values in numeric degrees, enabling location setting, repositioning, or dynamic binding of markers on maps by providing an array with latitude first and longitude second to precisely control marker placement or move pins programmatically on geographic interfaces.
</div>

#### Example

    <div id="map"></div>
    <script>
    $("#map").kendoMap({
        layers: [{
            type: "tile",
            urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
            attribution: "&copy; OpenStreetMap"
        }],
        markers: [{
            location: [42.3601, 71.0589], // Boston coordinates
            title: "Boston"
        }]
    });
    </script>

### shape `String` *(default: "pinTarget")*

The marker shape. The following pre-defined marker shapes are available:

* pinTarget
* pin

Marker shapes are implemented as CSS classes on the marker element (span.k-marker).
For example "pinTarget" is rendered as "k-i-marker-pin-target".


<div class="meta-api-description">
Customize or configure the appearance of map markers by selecting or setting the marker icon shape, including options like pin, target pin, or other predefined styles to visually differentiate points on a map, control marker looks with specific CSS class mappings, and change marker icons for better visualization or user interaction on mapping interfaces.
</div>

#### Example

    <div id="map"></div>
    <script>
    $("#map").kendoMap({
        layers: [{
            type: "tile",
            urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
            attribution: "&copy; OpenStreetMap"
        }],
        markers: [{
            location: [42.3601, 71.0589],
            shape: "pin",
            title: "Boston with pin shape"
        }]
    });
    </script>

### title `String` *(default: "pinTarget")*

The marker title. Displayed as browser tooltip.


<div class="meta-api-description">
Set or configure the text displayed as a tooltip, hover label, or mouseover hint for map markers, enabling customized hover messages, title attributes, or tooltip content that appears when users position their cursor over markers on interactive map components; control the marker's descriptive text shown as a browser tooltip or label for improved accessibility, user guidance, or contextual information on geographic points.
</div>

#### Example

    <div id="map"></div>
    <script>
    $("#map").kendoMap({
        layers: [{
            type: "tile",
            urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
            attribution: "&copy; OpenStreetMap"
        }],
        markers: [{
            location: [42.3601, 71.0589],
            title: "Visit Boston - Historical City"
        }]
    });
    </script>

### tooltip `Object`

Kendo UI Tooltip options for this marker.


<div class="meta-api-description">
Configure and enable dynamic contextual popups for map markers by setting up customizable tooltips that control content display, placement, visibility triggers like hover or click, and animations. Adjust or fine-tune interactive balloon-like info boxes linked to map points using standard tooltip settings to show additional details on demand, manage when and how tooltips appear or disappear, and tailor their position relative to markers for clear user guidance. This setup supports various ways to present on-map informational overlays, flexible triggers for showing or hiding them, and customizing their style and behavior to enhance map interactivity and usability.
</div>

#### Example

    <div id="map"></div>
    <script>
    $("#map").kendoMap({
        layers: [{
            type: "tile",
            urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
            attribution: "&copy; OpenStreetMap"
        }],
        markers: [{
            location: [42.3601, 71.0589],
            tooltip: {
                content: "Boston, Massachusetts",
                position: "top",
                showAfter: 200
            }
        }]
    });
    </script>

### tooltip.autoHide `Boolean`*(default: true)*

Specifies if the tooltip will be hidden when mouse leaves the target element. If set to false a close button will be shown within tooltip. If set to false, showAfter is specified and the showOn is set to "mouseenter" the Tooltip will be displayed after the given timeout even if the element is no longer hovered.


<div class="meta-api-description">
Configure tooltip visibility behavior for map markers or UI elements by enabling or disabling automatic hiding when the mouse leaves the target area, controlling whether tooltips disappear immediately on mouseout or persist until manually closed, setting options to keep tooltips visible after delay timers expire regardless of hover state, managing show and hide triggers based on mouseenter or mouseleave events, and customizing whether tooltips include internal close buttons for user dismissal versus automatic disappearances, allowing precise control over tooltip display timing, persistence, and user interaction for interactive marker or overlay elements.
</div>

#### Example

    <div id="map"></div>
    <script>
    $("#map").kendoMap({
        layers: [{
            type: "tile",
            urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
            attribution: "&copy; OpenStreetMap"
        }],
        markers: [{
            location: [42.3601, 71.0589],
            tooltip: {
                content: "This tooltip won't auto-hide",
                autoHide: false
            }
        }]
    });
    </script>

### tooltip.animation `Object`

A collection of {Animation} objects, used to change default animations. A value of **false**
will disable all animations in the widget.


<div class="meta-api-description">
Control and customize the show and hide effects for map marker tooltips by configuring animation settings, enabling or disabling tooltip enter and exit transitions, setting custom animation sequences for tooltip appearance and disappearance, overriding default animation behaviors with specific animation objects, turning off all tooltip animations to improve performance or create static displays, adjusting visual effects tied to tooltip visibility on markers, managing animation timing and style for marker overlays, and tailoring the display behavior of tooltip popups on interactive maps with custom or disabled animation options.
</div>

#### Example - configuring Marker animations

    <div id="map"></div>
    <script>
      $("#map").kendoMap({
        layers: [{
          type: "tile",
          urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
          attribution: "&copy; OpenStreetMap"
        }],
        markers: [
          {
            location: [42, 27],
            tooltip: {
              content: 'Map tooltip',
              animation: {
                open: {
                  effects: "fade:in",
                  duration: 1000
                },
                close: {
                  effects: "fade:out",
                  duration: 1000
                }
              }
            }
          }
        ]
      });
    </script>


### tooltip.animation.close `Object`

The animation that will be used when a Tooltip closes.


<div class="meta-api-description">
Configure and customize the closing animation for tooltips on markers, including setting animation effects, duration, easing, and transition behavior to control how tooltip windows hide or fade out when closing; adjust or enable smooth, instant, or custom exit animations for markers' tooltip popups, managing user interface transitions, hover or click-triggered tooltip disappearances, and the timing or style of tooltip dismissal effects.
</div>

#### Example

    <div id="map"></div>
    <script>
      $("#map").kendoMap({
        layers: [{
          type: "tile",
          urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
          attribution: "&copy; OpenStreetMap"
        }],
        markers: [
          {
            location: [42, 27],
            tooltip: {
              content: 'Map tooltip',
              animation: {                
                close: {
                  effects: "fade:out",
                  duration: 1000
                }
              }
            }
          }
        ]
      });
    </script>

### tooltip.animation.close.effects `String`

Effect to be used for closing of the tooltip.


<div class="meta-api-description">
Control and customize the closing animation effects for tooltip exit, including fade, slide, zoom, or user-defined transitions that run when hiding or dismissing tooltips on markers; configure animation styles, easing, timing, and transitions to smoothly synchronize tooltip disappearance with other user interface elements, enabling fine-tuned visual exit behaviors for marker tooltips or similar components.
</div>

#### Example 

    <div id="map"></div>
    <script>
      $("#map").kendoMap({
        layers: [{
          type: "tile",
          urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
          attribution: "&copy; OpenStreetMap"
        }],
        markers: [
          {
            location: [42, 27],
            tooltip: {
              content: 'Map tooltip',
              animation: {                
                close: {
                  effects: "fade:out"
                }
              }
            }
          }
        ]
      });
    </script>

### tooltip.animation.close.duration `Number`

Defines the animation duration.


<div class="meta-api-description">
Adjust the duration or speed of closing animations for map tooltips to customize how quickly a marker’s tooltip disappears, enabling fine-tuning of animation timing in milliseconds for faster or slower fade-outs, smoother transitions, tighter or looser animation pacing, syncing with other UI effects, and improving user interaction responsiveness on map markers.
</div>

#### Example 

    <div id="map"></div>
    <script>
      $("#map").kendoMap({
        layers: [{
          type: "tile",
          urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
          attribution: "&copy; OpenStreetMap"
        }],
        markers: [
          {
            location: [42, 27],
            tooltip: {
              content: 'Map tooltip',
              animation: {                
                close: {                  
                  duration: 2000
                }
              }
            }
          }
        ]
      });
    </script>

### tooltip.animation.open `Object`

The animation that will be used when a Tooltip opens.


<div class="meta-api-description">
Configure and customize the opening animation of tooltips on map markers, including options to enable or disable the animation, adjust animation effects like fade or slide, set the duration and timing functions such as easing curves, and control how tooltip content smoothly appears when interacting with markers; supports flexible animation behaviors for improving visual feedback and user experience when tooltips are triggered on map elements.
</div>

#### Example 

    <div id="map"></div>
    <script>
      $("#map").kendoMap({
        layers: [{
          type: "tile",
          urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
          attribution: "&copy; OpenStreetMap"
        }],
        markers: [
          {
            location: [42, 27],
            tooltip: {
              content: 'Map tooltip',
              animation: {                
                open: {
                  effects: "fade:in",
                  duration: 1000
                }
              }
            }
          }
        ]
      });
    </script>

### tooltip.animation.open.effects `String`

Effect to be used for opening of the Tooltip.


<div class="meta-api-description">
Adjust and customize the animation effects that control how tooltips appear or open on markers, including options to enable, configure, set, or modify opening transitions and visual effects for interactive tooltip displays. Manage and fine-tune tooltip show animations, entry effects, and transition styles to enhance user experience with smooth, dynamic marker tooltip popups, controlling timing, effect types, and animation sequences when displaying marker information.
</div>

#### Example 

    <div id="map"></div>
    <script>
      $("#map").kendoMap({
        layers: [{
          type: "tile",
          urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
          attribution: "&copy; OpenStreetMap"
        }],
        markers: [
          {
            location: [42, 27],
            tooltip: {
              content: 'Map tooltip',
              animation: {                
                open: {
                  effects: "fade:in"
                }
              }
            }
          }
        ]
      });
    </script>

### tooltip.animation.open.duration `Number`

Defines the animation duration.


<div class="meta-api-description">
Adjust or configure the length of the tooltip opening animation for map markers, specifying how many milliseconds the tooltip fade-in or slide-in effect lasts when it appears, enabling precise control over the transition speed, timing, and easing for marker tooltips on interactive maps, so developers can set, customize, or fine-tune how quickly or slowly tooltip displays activate upon marker interaction or hover events.
</div>

#### Example 

    <div id="map"></div>
    <script>
      $("#map").kendoMap({
        layers: [{
          type: "tile",
          urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
          attribution: "&copy; OpenStreetMap"
        }],
        markers: [
          {
            location: [42, 27],
            tooltip: {
              content: 'Map tooltip',
              animation: {                
                open: {                  
                  duration: 2000
                }
              }
            }
          }
        ]
      });
    </script>

### tooltip.content `Object|String|Function`

The text or a function which result will be shown within the tooltip.
By default the tooltip will display the target element title attribute content.


<div class="meta-api-description">
Set or customize tooltip text for markers by specifying static strings or dynamic functions that generate content shown on hover or focus, enabling flexible tooltip display beyond default title attributes, with support for configuring, updating, or controlling the tooltip message content during marker initialization or runtime, useful for descriptive labels, context hints, or interactive information popups on marker elements.
</div>

#### Example 

    <div id="map"></div>
    <script>
      $("#map").kendoMap({
        layers: [{
          type: "tile",
          urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
          attribution: "&copy; OpenStreetMap"
        }],
        markers: [
          {
            location: [42, 27],
            tooltip: {
              content: 'Map tooltip'              
            }
          }
        ]
      });
    </script>

### tooltip.content.url `String`

Specifies a URL or request options that the tooltip should load its content from.

>Note: For URLs starting with a protocol (e.g. http://),
a container iframe element is automatically created. This behavior may change in future
versions, so it is advisable to always use the [iframe configuration option](#iframe).


<div class="meta-api-description">
Configure dynamic tooltip content for map markers by specifying a URL or request options to fetch remote HTML, AJAX data, or external resources, enabling embedding, loading, or binding of live content within marker tooltips. Enable setting direct links, AJAX configurations, headers, query parameters, or remote endpoints to dynamically populate tooltip displays with server responses, API outputs, or web pages. Control asynchronous content loading, iframe embedding for cross-origin resources, and customize remote data fetching behaviors to enhance tooltip interactivity, real-time updates, and external content integration in mapping applications.
</div>

#### Example

    <div id="map"></div>
    <script>
    $("#map").kendoMap({
        layers: [{
            type: "tile",
            urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
            attribution: "&copy; OpenStreetMap"
        }],
        markers: [{
            location: [42.3601, 71.0589],
            tooltip: {
                content: {
                    url: "/marker-details.html"
                },
                width: 300,
                height: 200
            }
        }]
    });
    </script>

### tooltip.template `String|Template`

The [template](/api/framework/kendo#methods-template) which renders the tooltip content.

The fields which can be used in the template are:

* location - the marker location (`kendo.dataviz.map.Location` instance)
* marker - the marker instance

> Setting a template disables the content option.


<div class="meta-api-description">
Customize and control the tooltip content displayed on map markers by defining or configuring a flexible template for the marker tooltip, enabling dynamic rendering of HTML or text based on marker data or location details, including referencing marker instances and geospatial coordinates, while overriding default content with personalized layouts, snippets, or information formatting for enhanced user interaction, visualization, and data presentation on map interfaces.
</div>

#### Example

    <div id="map"></div>
    <script>
    $("#map").kendoMap({
        layers: [{
            type: "tile",
            urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
            attribution: "&copy; OpenStreetMap"
        }],
        markers: [{
            location: [42.3601, 71.0589],
            title: "Boston",
            tooltip: {
                template: (data) => `
                    <div>
                        <strong>Location:</strong> ${data.marker.title}<br>
                        <strong>Coordinates:</strong> ${data.location.lat}, ${data.location.lng}
                    </div>
                `
            }
        }]
    });
    </script>

### tooltip.callout `Boolean`*(default:true)*

Specifies if the tooltip callout will be displayed.


<div class="meta-api-description">
Configure the visibility of the small triangular pointer on map marker tooltips by enabling or disabling the tooltip callout, controlling whether to show or hide the pointer indicator attached to tooltip popups on markers, managing the display of the distinctive callout arrow to customize how tooltip annotations appear near location markers, adjusting callout pointer presence for enhanced visual clarity or minimalism in map interfaces, and toggling the marker tooltip’s pointer icon without affecting the tooltip’s text or content.
</div>

#### Example

    <div id="map"></div>
    <script>
    $("#map").kendoMap({
        layers: [{
            type: "tile",
            urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
            attribution: "&copy; OpenStreetMap"
        }],
        markers: [{
            location: [42.3601, 71.0589],
            tooltip: {
                content: "Tooltip without callout",
                callout: false
            }
        }]
    });
    </script>

### tooltip.iframe `Boolean`

Explicitly states whether content iframe should be created.


<div class="meta-api-description">
Control displaying marker tooltip content inside an isolated iframe or directly as HTML, enabling or disabling iframe embedding to manage sandboxing, cross-origin content rendering, secure isolation, content injection methods, and customization of map marker tooltips for enhanced security, content encapsulation, and compatibility with various HTML or external resources.
</div>

#### Example

    <div id="map"></div>
    <script>
    $("#map").kendoMap({
        layers: [{
            type: "tile",
            urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
            attribution: "&copy; OpenStreetMap"
        }],
        markers: [{
            location: [42.3601, 71.0589],
            tooltip: {
                content: {
                    url: "https://example.com/marker-info"
                },
                iframe: true,
                width: 400,
                height: 300
            }
        }]
    });
    </script>

### tooltip.height `Number`*(default: Infinity)*

The height (in pixels) of the tooltip.


<div class="meta-api-description">
Adjusting the vertical dimension, height, or pixel size of a marker’s tooltip controls how tall the informational popup appears, influencing layout constraints, content wrapping, text overflow, and the visible area for popup details. Developers often seek to configure or set tooltip height to optimize display space, improve readability, manage tooltip sizing responsively, and ensure consistent visual presentation on markers or map annotations by specifying numerical pixel values for vertical length. This setting enables fine-tuning of popup boundaries, controlling content accommodation inside tooltips, and scaling the vertical extent of marker hover or tap tooltips for enhanced user interface clarity and customization.
</div>

#### Example 

    <div id="map"></div>
    <script>
      $("#map").kendoMap({
        layers: [{
          type: "tile",
          urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
          attribution: "&copy; OpenStreetMap"
        }],
        markers: [
          {
            location: [42, 27],
            tooltip: {
              content: 'Map tooltip',
              height: 200
            }
          }
        ]
      });
    </script>

### tooltip.width `Number`*(default: Infinity)*

The width (in pixels) of the tooltip.


<div class="meta-api-description">
Adjust or define the pixel width for a map marker's tooltip to manage how text is displayed, including controlling wrapping behavior, truncation, overflow, and overall layout of tooltip content. Configure the tooltip size by setting a fixed width in pixels to ensure consistent appearance, prevent excess text spillover, customize display boundaries, and optimize visual presentation for markers on maps. Enable the setting of tooltip dimensions to achieve desired formatting, readability, and content containment for labels or informational popups tied to map markers.
</div>

#### Example 

    <div id="map"></div>
    <script>
      $("#map").kendoMap({
        layers: [{
          type: "tile",
          urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
          attribution: "&copy; OpenStreetMap"
        }],
        markers: [
          {
            location: [42, 27],
            tooltip: {
              content: 'Map tooltip',
              width: 200
            }
          }
        ]
      });
    </script>

### tooltip.position `String`*(default: "top")*

The position relative to the target element, at which the tooltip will be shown. Predefined values are "bottom", "top", "left", "right", "center".


<div class="meta-api-description">
Adjust or set the location of tooltips shown next to map markers, positioning descriptive popups above, below, to the left, right, or centered relative to the marker's icon or point on the map; control or customize tooltip alignment, placement, orientation, or anchor point to improve readability and user interaction by specifying where the hover or click info box displays in relation to geographic markers or points of interest on map interfaces.
</div>

#### Example 

    <div id="map"></div>
    <script>
      $("#map").kendoMap({
        layers: [{
          type: "tile",
          urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
          attribution: "&copy; OpenStreetMap"
        }],
        markers: [
          {
            location: [42, 27],
            tooltip: {
              content: 'Map tooltip',
              position: "right"
            }
          }
        ]
      });
    </script>

### tooltip.showAfter `Number`*(default: 100)*

Specify the delay in milliseconds before the tooltip is shown. This option is ignored if showOn is set to "click" or "focus".


<div class="meta-api-description">
Adjust the delay time in milliseconds before a tooltip appears when hovering over markers, enabling control over tooltip display latency for interactive maps, hover effects, or tooltip timing customization, while noting that this delay is bypassed if the tooltip triggers on click or keyboard focus events; configure, set, manage, or customize tooltip show delay to enhance user experience with responsive feedback on map markers or interface elements.
</div>

#### Example 

    <div id="map"></div>
    <script>
      $("#map").kendoMap({
        layers: [{
          type: "tile",
          urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
          attribution: "&copy; OpenStreetMap"
        }],
        markers: [
          {
            location: [42, 27],
            tooltip: {
              content: 'Map tooltip',
              showAfter: 500
            }
          }
        ]
      });
    </script>

### tooltip.showOn `String`*(default: "mouseenter")*

The event on which the tooltip will be shown. Predefined values are "mouseenter", "click" and "focus".


<div class="meta-api-description">
Control and configure the trigger for displaying informational popups or tooltips on map markers by specifying the user interaction event such as mouse hover, clicking or tapping, or keyboard focus, enabling flexible customization of when marker details, labels, or hints appear based on user actions like entering, selecting, or focusing on the marker element. This includes setting events like mouseenter to show tooltips on hover, click to reveal information on tap or mouse press, and focus for accessibility support via keyboard navigation, allowing developers to enable, set, or control tooltip visibility tied to user engagement patterns on interactive map markers.
</div>

#### Example 

    <div id="map"></div>
    <script>
      $("#map").kendoMap({
        layers: [{
          type: "tile",
          urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
          attribution: "&copy; OpenStreetMap"
        }],
        markers: [
          {
            location: [42, 27],
            tooltip: {
              content: 'Map tooltip',
              showOn: 'click'
            }
          }
        ]
      });
    </script>

## Methods

### location
Gets or sets the Marker location.


<div class="meta-api-description">
Retrieve, update, or set the geographic position of a map marker by getting its current coordinates or assigning new latitude and longitude values, enabling dynamic repositioning, syncing marker placement with data sources, programmatically moving markers in real-time, controlling marker coordinates, and adjusting or configuring marker locations on interactive maps for use cases like binding markers to external data, animating marker movements, or updating marker states through code.
</div>

#### Parameters

##### location `Array|kendo.dataviz.map.Location`
The marker location on the map. Coordinates are listed as `[Latitude, Longitude]`.

#### Returns
`kendo.dataviz.map.Location` The current location of the Marker

#### Example

    <div id="map"></div>
    <script>
    $("#map").kendoMap({
        layers: [{
            type: "tile",
            urlTemplate: "https://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
            attribution: "&copy; OpenStreetMap"
        }],
        markers: [{
            location: [42.3601, 71.0589],
            title: "Boston"
        }],
        markerActivate: function (e) {
            var currentLocation = e.marker.location();
            console.log("Current location:", currentLocation);
        }
    });    
    </script>

