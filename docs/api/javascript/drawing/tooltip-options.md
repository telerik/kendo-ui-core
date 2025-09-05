---
title: TooltipOptions
page_title: API reference for Kendo UI Drawing API Tooltip options
res_type: api
---

# kendo.drawing.TooltipOptions

Shape tooltip configuration options.

## Fields

### autoHide `Boolean`*(default: true)*

Specifies if the tooltip will be hidden when mouse leaves the shape. If set to false a close button will be shown within the tooltip.

#### Example

    <div id="surface"></div>
    <script>
    var draw = kendo.drawing;
    var geom = kendo.geometry;
    var surface = draw.Surface.create($("#surface"));

    var rect = new draw.Rect(new geom.Rect([10, 10], [100, 50]), {
        fill: { color: "blue" },
        tooltip: {
            autoHide: false,
            content: "Rectangle with persistent tooltip"
        }
    });
    
    surface.draw(rect);
    </script>

### content `String|Function`

The text or a function which result will be shown within the tooltip.

> If the content is not set or is an empty string then the tooltip will not be shown.

#### Example

    <div id="surface"></div>
    <script>
    var draw = kendo.drawing;
    var geom = kendo.geometry;
    var surface = draw.Surface.create($("#surface"));

    var circle = new draw.Circle(new geom.Circle([50, 50], 30), {
        fill: { color: "red" },
        tooltip: {
            content: function(e) {
                return "Circle at position: " + e.shape.geometry().center.toString();
            }
        }
    });
    
    surface.draw(circle);
    </script>

### position `String`*(default: "top")*

The position relative to the target shape, at which the Tooltip will be shown. Predefined values are:

* "top" - the tooltip will be shown above the shape.
* "bottom" - the tooltip will be shown below the shape.
* "left" - the tooltip will be shown on the left side of the shape.
* "right" - the tooltip will be shown on the right side of the shape.
* "cursor" - the tooltip will be shown on top of the current cursor position.

#### Example

    <div id="surface"></div>
    <script>
    var draw = kendo.drawing;
    var geom = kendo.geometry;
    var surface = draw.Surface.create($("#surface"));

    var rect = new draw.Rect(new geom.Rect([50, 50], [80, 40]), {
        fill: { color: "green" },
        tooltip: {
            content: "Positioned tooltip",
            position: "bottom"
        }
    });
    
    surface.draw(rect);
    </script>

### height `Number|String`

The height of the Tooltip.

#### Example

    <div id="surface"></div>
    <script>
    var draw = kendo.drawing;
    var surface = draw.Surface.create($("#surface"));
    
    var path = new draw.Path({
        fill: { color: "purple" },
        tooltip: {
            content: "Custom height tooltip with more content to demonstrate the height setting",
            height: 80
        }
    });
    path.moveTo(20, 20).lineTo(80, 20).lineTo(50, 60).close();
    
    surface.draw(path);
    </script>

### hideDelay `Number`*(default: 0)*

Specifies the delay in milliseconds before the tooltip is hidden after leaving the shape.

#### Example

    <div id="surface"></div>
    <script>
    var draw = kendo.drawing;
    var geom = kendo.geometry;
    var surface = draw.Surface.create($("#surface"));

    var circle = new draw.Circle(new geom.Circle([60, 40], 25), {
        fill: { color: "orange" },
        tooltip: {
            content: "Tooltip with hide delay",
            hideDelay: 2000
        }
    });
    
    surface.draw(circle);
    </script>

### offset `Number`*(default: 7)*

Specifies the offset in pixels from the target position at which the tooltip should be shown.

#### Example

    <div id="surface"></div>
    <script>
    var draw = kendo.drawing;
    var geom = kendo.geometry;
    var surface = draw.Surface.create($("#surface"));

    var rect = new draw.Rect(new geom.Rect([30, 30], [60, 30]), {
        fill: { color: "teal" },
        tooltip: {
            content: "Tooltip with custom offset",
            offset: 20
        }
    });
    
    surface.draw(rect);
    </script>

### shared `Boolean`*(default: false)*

Specifies if the same tooltip should be used for elements within a group or multipath. If set to true, the group or multipath bounding box will be used for the position and the tooltip will not be hidden and shown when moving from one element to another.

#### Example

    <div id="surface"></div>
    <script>
    var draw = kendo.drawing;
    var geom = kendo.geometry;
    var surface = draw.Surface.create($("#surface"));
    
    var group = new draw.Group({
        tooltip: {
            content: "Shared tooltip for group",
            shared: true
        }
    });
    
    var rect1 = new draw.Rect(new geom.Rect([10, 10], [30, 30]), {
        fill: { color: "blue" }
    });

    var rect2 = new draw.Rect(new geom.Rect([50, 10], [30, 30]), {
        fill: { color: "red" }
    });
    
    group.append(rect1, rect2);
    surface.draw(group);
    </script>

### showAfter `Number`*(default: 100)*

Specifies the delay in milliseconds before the tooltip is shown.

#### Example

    <div id="surface"></div>
    <script>
    var draw = kendo.drawing;
    var geom = kendo.geometry;
    var surface = draw.Surface.create($("#surface"));

    var circle = new draw.Circle(new geom.Circle([70, 50], 20), {
        fill: { color: "yellow" },
        stroke: { color: "black" },
        tooltip: {
            content: "Tooltip with show delay",
            showAfter: 1000
        }
    });
    
    surface.draw(circle);
    </script>

### showOn `String`*(default: "mouseenter")*

The event on which the tooltip will be shown. The available values are "mouseenter" and "click".

#### Example

    <div id="surface"></div>
    <script>
    var draw = kendo.drawing;
    var geom = kendo.geometry;
    var surface = draw.Surface.create($("#surface"));

    var rect = new draw.Rect(new geom.Rect([20, 20], [80, 40]), {
        fill: { color: "lightblue" },
        stroke: { color: "navy" },
        tooltip: {
            content: "Click to show tooltip",
            showOn: "click"
        }
    });
    
    surface.draw(rect);
    </script>

### width `Number|String`

The width of the Tooltip.

#### Example

    <div id="surface"></div>
    <script>
    var draw = kendo.drawing;
    var surface = draw.Surface.create($("#surface"));
    
    var path = new draw.Path({
        fill: { color: "pink" },
        tooltip: {
            content: "This tooltip has a custom width setting to demonstrate how the width property works",
            width: 200
        }
    });
    path.moveTo(40, 40).lineTo(90, 40).lineTo(65, 80).close();
    
    surface.draw(path);
    </script>