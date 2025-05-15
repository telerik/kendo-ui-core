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

### shape `String` *(default: "pinTarget")*

The marker shape. The following pre-defined marker shapes are available:

* pinTarget
* pin

Marker shapes are implemented as CSS classes on the marker element (span.k-marker).
For example "pinTarget" is rendered as "k-i-marker-pin-target".

### title `String` *(default: "pinTarget")*

The marker title. Displayed as browser tooltip.

### tooltip `Object`

Kendo UI Tooltip options for this marker.

### tooltip.autoHide `Boolean`*(default: true)*

Specifies if the tooltip will be hidden when mouse leaves the target element. If set to false a close button will be shown within tooltip. If set to false, showAfter is specified and the showOn is set to "mouseenter" the Tooltip will be displayed after the given timeout even if the element is no longer hovered.

### tooltip.animation `Object`

A collection of {Animation} objects, used to change default animations. A value of **false**
will disable all animations in the widget.

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

#### Example

    <div id="map"></div>
    <script>
      $("#map").kendoMap({
        layers: [{
          type: "tile",
          urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
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

#### Example 

    <div id="map"></div>
    <script>
      $("#map").kendoMap({
        layers: [{
          type: "tile",
          urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
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

#### Example 

    <div id="map"></div>
    <script>
      $("#map").kendoMap({
        layers: [{
          type: "tile",
          urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
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

#### Example 

    <div id="map"></div>
    <script>
      $("#map").kendoMap({
        layers: [{
          type: "tile",
          urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
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

#### Example 

    <div id="map"></div>
    <script>
      $("#map").kendoMap({
        layers: [{
          type: "tile",
          urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
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

#### Example 

    <div id="map"></div>
    <script>
      $("#map").kendoMap({
        layers: [{
          type: "tile",
          urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
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

### tooltip.template `String|Template`

The [template](/api/framework/kendo#methods-template) which renders the tooltip content.

The fields which can be used in the template are:

* location - the marker location (`kendo.dataviz.map.Location` instance)
* marker - the marker instance

> Setting a template disables the content option.

### tooltip.callout `Boolean`*(default:true)*

Specifies if the tooltip callout will be displayed.

### tooltip.iframe `Boolean`

Explicitly states whether content iframe should be created.

### tooltip.height `Number`*(default: Infinity)*

The height (in pixels) of the tooltip.

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

#### Example 

    <div id="map"></div>
    <script>
      $("#map").kendoMap({
        layers: [{
          type: "tile",
          urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
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

#### Parameters

##### location `Array|kendo.dataviz.map.Location`
The marker location on the map. Coordinates are listed as `[Latitude, Longitude]`.

#### Returns
`kendo.dataviz.map.Location` The current location of the Marker

