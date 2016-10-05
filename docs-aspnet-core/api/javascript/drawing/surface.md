---
title: Surface
page_title: API reference for Kendo UI Drawing API Surface
---

# kendo.drawing.Surface : kendo.Observable
An abstract class representing the top-level drawing surface.
This class can't be instantiated directly.

Specific implementations are created via the static `create` method.
The implementations for SVG, Canvas and VML inherit from this base class.

## Example - Creating a drawing surface
    <div id="container" style="position: relative; width: 600px; height: 400px;"></div>
    <script>
        var draw = kendo.drawing;
        var surface = draw.Surface.create($("#container"));

        var path = new draw.Path().fill("red")
            .moveTo(50, 0).lineTo(100, 50).lineTo(0, 50).close();

        surface.draw(path);
    </script>

## Class methods

### create

Creates a drawing surface matching the browser capabilities.

#### Example - Specifying a preferred type and size
    <div id="container"></div>
    <script>
        var draw = kendo.drawing;
        var surface = draw.Surface.create($("#container"), {
            type: "canvas",
            width: "600px",
            height: "400px"
        });

        var path = new draw.Path().fill("red")
            .moveTo(50, 0).lineTo(100, 50).lineTo(0, 50).close();

        surface.draw(path);
    </script>

#### Parameters

##### element `jQuery|Element`
The DOM (or jQuery) element that will host the surface.

##### options `Object` *optional*
The options to pass to the surface.

#### Returns
`kendo.drawing.Surface` An implementation matching the browser capabilities or caller preference; undefined if none is available.


## Configuration

### type `String`
The preferred type of surface to [create](#create).
Supported types (case insensitive):
- `svg`
- `canvas`
- `vml`

This option will be ignored if not supported by the browser.
See [Supported Browsers](/intro/supporting/browser-support).

### height `String` *(default: "100%")*
The height of the surface element.
By default the surface will expand to fill the height of the first positioned container.

### width `String` *(default: "100%")*
The width of the surface element.
By default the surface will expand to fill the width of the first positioned container.

### tooltip `Object`

Specifies general options for the shapes tooltip.

### tooltip.animation `Boolean|Object`

Configures the opening and closing animations of the tooltip. Setting the `animation` option to `false` will disable the opening and closing animations. As a result the tooltip will open and close instantly.

`animation:true` is not a valid configuration.

### tooltip.animation.close `Object`

The animation played when the tooltip is closed.

### tooltip.animation.close.effects `String`

The effect(s) to use when playing the close animation. Multiple effects should be separated with a space.

[Complete list of available animations](/api/javascript/effects/common)

### tooltip.animation.close.duration `Number`

The duration of the close animation in milliseconds.

### tooltip.animation.open `Object`

The animation played when the tooltip is opened.

### tooltip.animation.open.effects `String`

The effect(s) to use when playing the open animation. Multiple effects should be separated with a space.

[Complete list of available animations](/api/javascript/effects/common)

### tooltip.animation.open.duration `Number`

The duration of the open animation in milliseconds.

### tooltip.appendTo `String|jQuery`*(default: document.body)*

Which element the tooltip will be appended to.

## Methods

### clear
Clears the drawing surface.


### draw
Draws the element and its children on the surface.
Existing elements will remain visible.

#### Parameters

##### element `kendo.drawing.Element`
The element to draw.


### eventTarget
Returns the target drawing element of a DOM event.

#### Parameters

##### e `Object`
The original DOM or jQuery event object.

#### Returns
`kendo.drawing.Element` The target drawing element, if any.

### hideTooltip
Hides the surface tooltip.


### resize
Resizes the surface to match the size of the container.

#### Parameters

##### force `Boolean` *optional*
Whether to proceed with resizing even if the container dimensions have not changed.

### showTooltip

Shows the surface tooltip for the passed shape.

#### Parameters

##### element `kendo.drawing.Element`
The element for which the tooltip should be shown.

##### options `Object` *optional*
Options for the tooltip.

## Events

### click
Triggered when an element has been clicked.

#### Example - subscribe to the "click" event during initialization
    <div id="container"></div>
    <script>
        var draw = kendo.drawing;
        var surface = draw.Surface.create($("#container"), {
            click: function(e) {
                console.log("Click");
            }
        });

        var path = new draw.Path().fill("red")
            .moveTo(50, 0).lineTo(100, 50).lineTo(0, 50).close();

        surface.draw(path);
    </script>

#### Event Data

##### e.element `kendo.drawing.Element`
The clicked element.

##### e.originalEvent `Object`
The browser event that triggered the click.

### mouseenter
Triggered when the mouse is moved over an element.

#### Example - subscribe to the "mouseenter" event during initialization
    <div id="container"></div>
    <script>
        var draw = kendo.drawing;
        var surface = draw.Surface.create($("#container"), {
            mouseenter: function(e) {
                console.log("Mouse enter");
            }
        });

        var path = new draw.Path().fill("red")
            .moveTo(50, 0).lineTo(100, 50).lineTo(0, 50).close();

        surface.draw(path);
    </script>

#### Event Data

##### e.element `kendo.drawing.Element`
The target element.

##### e.originalEvent `Object`
The browser event that triggered the click.

### mouseleave
Triggered when the mouse is leaves an element.

#### Example - subscribe to the "mouseleave" event during initialization
    <div id="container"></div>
    <script>
        var draw = kendo.drawing;
        var surface = draw.Surface.create($("#container"), {
            mouseleave: function(e) {
                console.log("Mouse leave");
            }
        });

        var path = new draw.Path().fill("red")
            .moveTo(50, 0).lineTo(100, 50).lineTo(0, 50).close();

        surface.draw(path);
    </script>

#### Event Data

##### e.element `kendo.drawing.Element`
The target element.

##### e.originalEvent `Object`
The browser event that triggered the click.

### tooltipClose
Triggered when closing the surface tooltip.

#### Example - subscribe to the "tooltipClose" event

    <div id="container"></div>
    <script>
      var draw = kendo.drawing;
      var surface = draw.Surface.create($("#container"), {
        tooltipClose: function(e) {
          console.log("tooltip close");
        }
      });

      var path = new draw.Path({
        tooltip: {
          content: "Path"
        }
      }).fill("red")
      .moveTo(50, 0).lineTo(100, 50).lineTo(0, 50).close();

      surface.draw(path);
    </script>

#### Event Data

##### e.element `kendo.drawing.Element`
The element with set tooltip options. Can differ from the target element for groups.

##### e.preventDefault `Function`

If invoked, prevents the close action.

##### e.target `kendo.drawing.Element`
The target element.

### tooltipOpen
Triggered when opening the surface tooltip.

#### Example - subscribe to the "tooltipOpen" event

    <div id="container"></div>
    <script>
      var draw = kendo.drawing;
      var surface = draw.Surface.create($("#container"), {
        tooltipOpen: function(e) {
          console.log("tooltip open");
        }
      });

      var path = new draw.Path({
        tooltip: {
          content: "Path"
        }
      }).fill("red")
      .moveTo(50, 0).lineTo(100, 50).lineTo(0, 50).close();

      surface.draw(path);
    </script>

#### Event Data

##### e.element `kendo.drawing.Element`
The element with set tooltip options. Can differ from the target element for groups.

##### e.preventDefault `Function`

If invoked, prevents the open action.

##### e.target `kendo.drawing.Element`
The target element.