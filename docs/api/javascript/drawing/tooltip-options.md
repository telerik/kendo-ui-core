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


<div class="meta-api-description">
How do I configure Kendo UI for jQuery to automatically hide tooltips when the cursor leaves a shape? Configure whether tooltips automatically disappear when the cursor moves away from a shape or remain visible until manually closed, enabling control over tooltip visibility behavior, including options to auto-hide on mouse leave, keep tooltips persistent for user interaction, display close buttons for manual dismissal, toggle automatic versus manual hiding, and customize user experiences for tooltip display and dismissal in interactive drawing or diagram components.
</div>

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


<div class="meta-api-description">
How can I dynamically update the content of a tooltip in Kendo UI for jQuery? Set, configure, or update tooltip text dynamically or statically by providing a string value or a function callback that computes and returns the content to display within a tooltip, enabling control over showing or hiding tooltips based on whether content is present, with support for static text, computed messages, dynamic updates, or conditional rendering of tooltip information.
</div>

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


<div class="meta-api-description">
How do I control the placement of a tooltip in Kendo UI using the position property? Control tooltip placement relative to a target element by setting its alignment to above, below, left, or right positions or enabling dynamic follow-the-cursor behavior for tooltips that track the mouse pointer. Configure tooltip location to appear on various sides of a shape or have it float at the current mouse location, supporting fixed or interactive positioning modes. Set position options such as top, bottom, left, right, or cursor-based placement to customize where contextual information appears in relation to target shapes or pointer coordinates, enabling precise control over tooltip orientation and dynamic tracking features for enhanced user interface responsiveness.
</div>

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


<div class="meta-api-description">
How can I adjust the height of a tooltip in Kendo UI? Adjust, set, or control the vertical height, size, or dimension of a tooltip display to customize how tall or high the tooltip appears on the screen, enabling dynamic resizing, height configuration, or modification of the tooltip’s vertical measurement for better layout fit or UI design, including reading the current tooltip height value or updating it programmatically after initialization for precise visual adjustments and interface alignment.
</div>

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


<div class="meta-api-description">
How do I adjust the time it takes for a tooltip to disappear in Kendo UI drawingapi? Set the duration or delay time in milliseconds before a tooltip disappears or hides after the mouse pointer or cursor moves away from an interactive shape or element, controlling how long the hover tooltip remains visible, enabling customization of tooltip fade-out timing to prevent flickering, improve user experience, and fine-tune tooltip responsiveness after pointer leave events or mouseout interactions in drawing components or graphical interfaces.
</div>

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


<div class="meta-api-description">
How can I adjust the position of tooltips in Kendo UI for jQuery to make sure they don't overlap with other elements? Adjust the pixel distance or displacement of tooltips from their target elements to fine-tune alignment, positioning, and placement, enabling precise control over how far or in which direction the tooltip appears relative to the associated UI component, including shifting tooltips horizontally, vertically, or by specific pixel values to customize display offset and improve user interface clarity and responsiveness.
</div>

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


<div class="meta-api-description">
How to enable shared tooltips for grouped elements in Kendo UI drawingapi? Configure tooltips for grouped or multi-part elements to use a single shared tooltip instance that tracks the entire group's bounding area, enabling consistent tooltip display across multiple related items without flickering or toggling visibility when moving between parts. Control whether to consolidate tooltips for elements within the same group or connected paths, ensuring smooth, continuous tooltip positioning based on combined bounding boxes and preventing repeated hide-and-show behavior during navigation among grouped components or multipath structures. Optimize the tooltip experience for grouped data points, shared elements, or complex shapes by enabling shared tooltip usage to manage hover states collectively and maintain stable tooltip visibility across the entire grouped context.
</div>

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


<div class="meta-api-description">
How do I adjust the delay time before a Kendo UI tooltip appears after user interaction? Configure or adjust the delay time before a tooltip appears after user interaction, specifying how many milliseconds to wait before showing the popup, enabling dynamic control over tooltip display timing, setting or retrieving the tooltip delay interval to customize user interface responsiveness, managing when tooltips are triggered following hover or focus events, controlling the wait period prior to tooltip visibility to enhance usability, fine-tuning or querying the tooltip show latency to improve user experience and timing behavior in interactive components.
</div>

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


<div class="meta-api-description">
How do I make a Kendo UI tooltip appear on hover? Configure the trigger for displaying the tooltip by setting it to appear on user interactions such as hovering over elements with the mouse or clicking them, enabling control over tooltip visibility based on mouseenter or click events to customize how and when tooltips show on user interface components for enhanced user experience and interaction handling.
</div>

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


<div class="meta-api-description">
How do I control the width of a tooltip in Kendo UI for jQuery? Adjust, configure, or set the horizontal size, fixed width, visible width, or layout constraints of a tooltip to control how wide the tooltip appears on screen. Enable specifying tooltip box width, control tooltip content width, limit or fix tooltip size, define tooltip horizontal dimensions, and customize tooltip sizing for consistent display across different UI elements. This includes setting initial width measurements or width parameters to manage tooltip width behavior and appearance.
</div>

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