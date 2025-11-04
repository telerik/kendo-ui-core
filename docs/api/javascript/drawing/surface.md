---
title: Surface
page_title: API reference for Kendo UI Drawing API Surface
res_type: api
---

# kendo.drawing.Surface : kendo.Observable
An abstract class representing the top-level drawing surface.
This class can't be instantiated directly.

Specific implementations are created via the static `create` method.
The implementations for SVG and Canvas inherit from this base class.

## Example - Creating a drawing surface
    <div id="container" style="position: relative; width: 600px; height: 400px;"></div>
    <script>
        var draw = kendo.drawing;
        var surface = draw.Surface.create($("#container"));

        var path = new draw.Path().fill("red")
            .moveTo(50, 0).lineTo(100, 50).lineTo(0, 50).close();

        surface.draw(path);
    </script>

## Class Methods

### create

Creates a drawing surface matching the browser capabilities.


<div class="meta-api-description">
How do I create a rendering surface in Kendo UI for jQuery that adapts to different browsers? Generate or initialize a drawing or rendering surface optimized for web browsers by instantiating a graphical canvas that automatically detects and selects the most suitable rendering technology such as SVG, Canvas API, or legacy VML fallbacks based on device compatibility and browser support. Enable or configure a graphics layer that adapts rendering backends to ensure smooth, compatible visual output across diverse environments, facilitating browser-friendly rendering surfaces for drawing, painting, or graphic operations.
</div>

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

This option will be ignored if not supported by the browser.
See [Supported Browsers](/intro/supporting/browser-support).


<div class="meta-api-description">
How to configure the rendering method for Kendo UI drawingapi? Control and configure the rendering method by selecting between vector-based formats like SVG or raster-based canvas surfaces to optimize graphical output, performance, and compatibility across different browsers and environments, enabling you to set preferred rendering surfaces for drawing operations, specifying whether to use scalable vector graphics or pixel-based canvases depending on your needs or device capabilities, with automatic fallback when certain rendering types are unsupported.
</div>

#### Example

    <div id="container"></div>
    <script>
        var draw = kendo.drawing;
        var surface = draw.Surface.create($("#container"), {
            type: "svg",
            width: "400px",
            height: "300px"
        });

        var path = new draw.Path().fill("blue")
            .moveTo(50, 0).lineTo(100, 50).lineTo(0, 50).close();

        surface.draw(path);
    </script>

### height `String` *(default: "100%")*
The height of the surface element.
By default the surface will expand to fill the height of the first positioned container.


<div class="meta-api-description">
How do I set a fixed height for a Kendo UI drawing surface? Adjust or specify the vertical dimension, height, or size of the drawing surface or canvas area using fixed units like pixels or relative percentages to control or limit how tall the rendering region or visual container becomes, including enabling dynamic resizing, setting exact measurement values, managing layout height constraints, overriding default automatic stretching behavior inside parent elements, and defining how the space for graphical or UI rendering is allocated in the context of containers or positioned elements.
</div>

#### Example

    <div id="container" style="height: 300px; border: 1px solid #ccc;"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;
        var surface = draw.Surface.create($("#container"), {
            height: "250px",
            width: "400px"
        });

        var rect = new draw.Rect(new geom.Rect([10, 10], [200, 100]))
            .fill("green");

        surface.draw(rect);
    </script>

### width `String` *(default: "100%")*
The width of the surface element.
By default the surface will expand to fill the width of the first positioned container.


<div class="meta-api-description">
How do I set an explicit width for a Kendo UI rendering surface? Adjust or define the horizontal dimension, width, or size of a rendering surface area to control layout, fix or set explicit width values, override automatic or responsive sizing behavior, manage container filling or expansion, specify fixed or flexible width in pixels or units for a UI surface, manipulate horizontal scaling, configure surface boundaries, control rendering width constraints, and customize interface element width independent of parent container sizing.
</div>

#### Example

    <div id="container" style="width: 500px; border: 1px solid #ccc;"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;
        var surface = draw.Surface.create($("#container"), {
            width: "450px",
            height: "200px"
        });

        var circle = new draw.Circle(new geom.Circle([150, 80], 60))
            .fill("orange");

        surface.draw(circle);
    </script>

### tooltip `Object`

Specifies general options for the shapes tooltip.


<div class="meta-api-description">
How to customize shape tooltips in Kendo UI for jQuery interactive surfaces? Control and customize shape tooltips on interactive surfaces by setting appearance details, placement, and user interaction behaviors; configure how hover labels or info boxes show for shapes within a graphical surface, adjusting visibility, style, content display, and responsive positioning; enable or disable tooltips, set timing and triggers for displaying information overlays on shapes, and manage how contextual details appear dynamically when users mouse over or focus on surface elements in data visualizations, charts, or graphical interfaces.
</div>

#### Example

    <div id="container"></div>
    <script>
        var draw = kendo.drawing;
        var surface = draw.Surface.create($("#container"), {
            width: "400px",
            height: "300px",
            tooltip: {
                appendTo: "body",
                animation: {
                    open: { duration: 200 },
                    close: { duration: 100 }
                }
            }
        });

        var path = new draw.Path({
            tooltip: {
                content: "Interactive Path Element"
            }
        }).fill("purple")
        .moveTo(50, 0).lineTo(100, 50).lineTo(0, 50).close();

        surface.draw(path);
    </script>

### tooltip.animation `Boolean|Object`

Configures the opening and closing animations of the tooltip. Setting the `animation` option to `false` will disable the opening and closing animations. As a result the tooltip will open and close instantly.

`animation:true` is not a valid configuration.


<div class="meta-api-description">
How can I disable animations for surface tooltips in Kendo UI? Configure or disable the opening and closing animations for surface tooltips to control how tooltips appear and disappear, enabling instant show and hide effects without animations by setting animation off; adjust animation behavior to customize tooltip transitions, smooth fade-ins or outs, or completely remove animation delays for immediate visibility changes.
</div>

#### Example

    <div id="container"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;
        var surface = draw.Surface.create($("#container"), {
            width: "400px",
            height: "300px",
            tooltip: {
                animation: {
                    open: { effects: "fadeIn", duration: 300 },
                    close: { effects: "fadeOut", duration: 150 }
                }
            }
        });

        var rect = new draw.Rect(new geom.Rect([50, 50], [100, 80]), {
            tooltip: {
                content: "Animated Tooltip Rectangle"
            }
        }).fill("teal");

        surface.draw(rect);
    </script>

### tooltip.animation.close `Object`

The animation played when the tooltip is closed.


<div class="meta-api-description">
How do I customize the closing animation of tooltips in Kendo UI for jQuery? Adjust and customize the closing animation for tooltips by configuring effects, durations, easing functions, and callbacks to control how the tooltip hides or fades out when dismissed or closed. Enable or set animations to create smooth, customizable transitions on tooltip exit, modify timing or easing curves for the hide effect, and control the visual behavior during the tooltip closing phase to match user interface designs or preferences. Optimize tooltip disappearance by configuring animation parameters that dictate closing motion, speed, and style for seamless UI interactions and improved user experience.
</div>

#### Example

    <div id="container"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;
        var surface = draw.Surface.create($("#container"), {
            width: "400px",
            height: "300px",
            tooltip: {
                animation: {
                    close: {
                        effects: "slideUp fadeOut",
                        duration: 250
                    }
                }
            }
        });

        var circle = new draw.Circle(new geom.Circle([200, 150], 50), {
            tooltip: {
                content: "Circle with Close Animation"
            }
        }).fill("red");

        surface.draw(circle);
    </script>

### tooltip.animation.close.effects `String`

The effect(s) to use when playing the close animation. Multiple effects should be separated with a space.

[Complete list of available animations](/api/javascript/effects/common)


<div class="meta-api-description">
How to customize the closing animation effects of tooltips in Kendo UI for jQuery? Control and customize the closing animation effects of tooltips by specifying single or multiple animation names to define how tooltips disappear, combining fade, slide, zoom, or other visual effects; configure, set, or modify close transition styles to create smooth, engaging tooltip dismissals, adjusting animation sequences or layering effects for refined UI interactions, managing tooltip closing behavior with flexible effect options for interactive feedback and polished user experiences.
</div>

#### Example

    <div id="container"></div>
    <script>
        var draw = kendo.drawing;
        var surface = draw.Surface.create($("#container"), {
            width: "400px",
            height: "300px",
            tooltip: {
                animation: {
                    close: {
                        effects: "zoomOut fadeOut",
                        duration: 200
                    }
                }
            }
        });

        var path = new draw.Path({
            tooltip: {
                content: "Path with Zoom-Out Close Effect"
            }
        }).fill("navy")
        .moveTo(100, 50).lineTo(150, 100).lineTo(50, 100).close();

        surface.draw(path);
    </script>

### tooltip.animation.close.duration `Number`

The duration of the close animation in milliseconds.


<div class="meta-api-description">
How can I adjust the duration of my Kendo UI tooltip's close animation? Set or adjust the duration of the tooltip hide or close animation timing, configure how long the tooltip takes to disappear or fade out in milliseconds, control the speed and smoothness of tooltip dismissal animations for improved responsiveness and user experience, modify the closing animation length to balance visual fluidity and performance, and fine-tune tooltip exit timing for subtle or quick transitions in UI components that display contextual information.
</div>

#### Example

    <div id="container"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;
        var surface = draw.Surface.create($("#container"), {
            width: "400px",
            height: "300px",
            tooltip: {
                animation: {
                    close: {
                        effects: "fadeOut",
                        duration: 1000  // 1 second close duration
                    }
                }
            }
        });

        var rect = new draw.Rect(new geom.Rect([80, 60], [120, 80]), {
            tooltip: {
                content: "Slow Fade Out Tooltip"
            }
        }).fill("maroon");

        surface.draw(rect);
    </script>

### tooltip.animation.open `Object`

The animation played when the tooltip is opened.


<div class="meta-api-description">
How can I customize the animation effect when opening a tooltip on a Kendo UI surface element? Adjust or customize the tooltip's opening animation effect, including how the tooltip appears or fades in when triggered, control the animation duration, timing, easing curves, delays before showing, and choose or configure the reveal style for tooltips associated with surface elements. Enable setting precise animation parameters such as fade, slide, zoom, or other entrance transitions to fine-tune the tooltip’s appearance timing and style when it first becomes visible, ensuring smooth interactive feedback and visual cues on hover, focus, or other user actions. This setting supports configuring the reveal behavior of contextual popup tooltips, allowing you to define or control all aspects of how and when the tooltip opens with animated motion.
</div>

#### Example

    <div id="container"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;
        var surface = draw.Surface.create($("#container"), {
            width: "400px",
            height: "300px",
            tooltip: {
                animation: {
                    open: {
                        effects: "slideDown fadeIn",
                        duration: 400
                    }
                }
            }
        });

        var circle = new draw.Circle(new geom.Circle([200, 150], 60), {
            tooltip: {
                content: "Circle with Open Animation"
            }
        }).fill("darkgreen");

        surface.draw(circle);
    </script>

### tooltip.animation.open.effects `String`

The effect(s) to use when playing the open animation. Multiple effects should be separated with a space.

[Complete list of available animations](/api/javascript/effects/common)


<div class="meta-api-description">
How can I customize the animation effects when opening a tooltip in Kendo UI for jQuery? Customize and configure the opening animation of tooltip displays by specifying one or more animation effects to play when the tooltip appears, enabling smooth or dynamic transitions such as fade, slide, zoom, or bounce; set multiple animation styles simultaneously by listing effect names separated by spaces for combined visual effects, allowing precise control over tooltip entrance behavior, transitions, and motion effects to enhance user interface feedback and interaction aesthetics.
</div>

#### Example

    <div id="container"></div>
    <script>
        var draw = kendo.drawing;
        var surface = draw.Surface.create($("#container"), {
            width: "400px",
            height: "300px",
            tooltip: {
                animation: {
                    open: {
                        effects: "zoomIn bounceIn",
                        duration: 350
                    }
                }
            }
        });

        var path = new draw.Path({
            tooltip: {
                content: "Path with Zoom-In Bounce Effect"
            }
        }).fill("crimson")
        .moveTo(120, 80).lineTo(180, 130).lineTo(60, 130).close();

        surface.draw(path);
    </script>

### tooltip.animation.open.duration `Number`

The duration of the open animation in milliseconds.


<div class="meta-api-description">
How can I adjust the time it takes for tooltips to appear in my Kendo UI application? Adjust the duration of tooltip open animations in user interface elements by setting the time it takes for tooltips to appear, controlling animation speed for smooth or instant visibility, configuring delay or synchronization with other animations, fine-tuning tooltip display timing in milliseconds, enabling customization of the opening effect to match UI transitions or improve user experience, and specifying how long tooltips take to animate when showing, including options to speed up, slow down, or align tooltip appearance with other interactive components.
</div>

#### Example

    <div id="container"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;
        var surface = draw.Surface.create($("#container"), {
            width: "400px",
            height: "300px",
            tooltip: {
                animation: {
                    open: {
                        effects: "fadeIn",
                        duration: 800  // 0.8 second open duration
                    }
                }
            }
        });

        var rect = new draw.Rect(new geom.Rect([100, 100], [150, 100]), {
            tooltip: {
                content: "Slow Fade In Tooltip"
            }
        }).fill("indigo");

        surface.draw(rect);
    </script>

### tooltip.appendTo `String|jQuery`*(default: document.body)*

Which element the tooltip will be appended to.


<div class="meta-api-description">
How to specify the container for Kendo UI tooltip elements in jQuery? Control where tooltip elements are inserted in the DOM by specifying the container or parent element for tooltip rendering, using CSS selectors, direct DOM nodes, or jQuery references to define the target append container for tooltips, which influences visual stacking order, layering, z-index context, and placement relative to other elements, ensuring tooltips render within the desired section of the page or component hierarchy and preventing overflow or clipping issues by configuring the tooltip’s attachment point in flexible ways.
</div>

#### Example

    <div id="container"></div>
    <div id="tooltip-container"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;
        var surface = draw.Surface.create($("#container"), {
            width: "400px",
            height: "300px",
            tooltip: {
                appendTo: "#tooltip-container"
            }
        });

        var circle = new draw.Circle(new geom.Circle([200, 150], 50), {
            tooltip: {
                content: "Tooltip appended to custom container"
            }
        }).fill("gold");

        surface.draw(circle);
    </script>

## Methods

### clear
Clears the drawing surface.


<div class="meta-api-description">
How do I reset the entire drawing area to blank using the Kendo UI for jQuery Surface API? Erase all existing graphics and reset the entire drawing area to a blank or empty state by clearing rendered shapes, paths, or any visual elements on the canvas, enabling programmatic resetting, refreshing, or wiping of the surface before redrawing, reinitializing, or loading new drawings or visual content dynamically through commands that remove all previously drawn data and restore the surface for new rendering operations.
</div>

#### Example

    <div id="container"></div>
    <button onclick="clearSurface()">Clear Surface</button>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;
        var surface = draw.Surface.create($("#container"), {
            width: "400px",
            height: "300px"
        });

        // Draw some initial shapes
        var rect = new draw.Rect(new geom.Rect([50, 50], [100, 80]))
            .fill("blue");
        var circle = new draw.Circle(new geom.Circle([250, 100], 40))
            .fill("red");

        surface.draw(rect);
        surface.draw(circle);

        function clearSurface() {
            surface.clear();
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("Surface cleared");
        }
    </script>


### draw
Draws the element and its children on the surface.
Existing elements will remain visible.


<div class="meta-api-description">
How do I redraw specific visual elements on a Kendo UI Surface control without clearing previously rendered content? Control rendering or refreshing visual elements and their nested children on a graphical surface by invoking a method that draws shapes, groups, or nodes while preserving any previously rendered content without clearing or removing it, enabling layered or cumulative drawing updates. This approach supports redrawing specific components, incremental rendering, refreshing visuals after data or style changes, updating scene graphs, and managing overlays or stacked graphics without erasing what has already been displayed, making it suitable for dynamic drawing, partial updates, and continuous visual layering on a canvas or similar rendering context.
</div>

#### Example

    <div id="container"></div>
    <button onclick="addShape()">Add Shape</button>
    <script>
        var draw = kendo.drawing;
        var surface = draw.Surface.create($("#container"), {
            width: "400px",
            height: "300px"
        });

        var shapeCount = 0;

        function addShape() {
            var x = Math.random() * 300;
            var y = Math.random() * 200;
            
            var circle = new draw.Circle(new draw.geometry.Circle([x + 50, y + 50], 25))
                .fill("hsl(" + (shapeCount * 45) + ", 70%, 50%)");

            surface.draw(circle);
            shapeCount++;
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("Shape drawn at:", x + 50, y + 50);
        }
    </script>

#### Parameters

##### element `kendo.drawing.Element`
The element to draw.


### eventTarget
Returns the target drawing element of a DOM event.


<div class="meta-api-description">
How do I determine which drawing object was clicked on in a Kendo UI canvas? Determine or retrieve the specific drawing element or graphical shape that was clicked, touched, or interacted with via pointer or mouse events, enabling developers to map user interactions from DOM input events to corresponding visual elements for hit detection, event handling, and custom interaction logic; detect which visual object underlies a given event, identify target elements for event listeners, associate DOM event targets with canvas or vector graphics components, and translate raw input events into meaningful references to featured drawing objects, shapes, or layers for responsive UI behavior on clicks, taps, or pointer-driven actions.
</div>

#### Example

    <div id="container"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;
        var surface = draw.Surface.create($("#container"), {
            width: "400px",
            height: "300px"
        });

        // Create different shapes
        var rect = new draw.Rect(new geom.Rect([50, 50], [100, 80]))
            .fill("lightblue");
        var circle = new draw.Circle(new geom.Circle([250, 100], 40))
            .fill("lightcoral");

        surface.draw(rect);
        surface.draw(circle);

        // Add click event listener to the container
        $("#container").on("click", function(e) {
            var targetElement = surface.eventTarget(e);
            if (targetElement) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
                console.log("Clicked on drawing element:", targetElement.options.fill.color);
            }
        });
    </script>

#### Parameters

##### e `Object`
The original DOM or jQuery event object.

#### Returns
`kendo.drawing.Element` The target drawing element, if any.

### hideTooltip
Hides the surface tooltip.


<div class="meta-api-description">
How do I programmatically close the tooltip on a Kendo UI Surface component? Programmatically dismiss or close the tooltip displayed on the Surface component by controlling tooltip visibility through methods that hide or remove tooltip UI on demand, enabling dynamic interaction like hiding tooltips after pointer leave events, clicks, or custom triggers to manage overlay or pop-up messages within surfaces, panels, or UI elements where controlling the display of contextual hints, help popups, or info bubbles is required.
</div>

#### Example

    <div id="container"></div>
    <button onclick="hideTooltipManually()">Hide Tooltip</button>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;
        var surface = draw.Surface.create($("#container"), {
            width: "400px",
            height: "300px"
        });

        var rect = new draw.Rect(new geom.Rect([100, 100], [150, 100]), {
            tooltip: {
                content: "This tooltip can be hidden manually"
            }
        }).fill("violet");

        surface.draw(rect);

        function hideTooltipManually() {
            surface.hideTooltip();
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("Tooltip hidden manually");
        }
    </script>


### resize
Resizes the surface to match the size of the container.


<div class="meta-api-description">
How to adjust the size of a drawing area in Kendo UI for jQuery after window resize? Adjust, update, or synchronize the drawing area's size or canvas dimensions to match container or layout changes, enabling developers to control resizing behavior after window size shifts, DOM modifications, or CSS updates. Configure the internal rendering context and coordinate system to keep shapes, graphics, or drawings properly scaled and positioned by applying a resize operation or method. Handle automatic or manual adjustments to the rendering surface to maintain visual consistency during dynamic layout resizing, viewport changes, or responsive design scenarios by invoking a function that recalculates and updates the surface size accordingly.
</div>

#### Example

    <div id="container" style="width: 300px; height: 200px; border: 1px solid #ccc; resize: both; overflow: auto;"></div>
    <button onclick="resizeSurface()">Resize Surface</button>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;
        var surface = draw.Surface.create($("#container"));

        var rect = new draw.Rect(new geom.Rect([10, 10], [100, 80]))
            .fill("orange");
        
        surface.draw(rect);

        function resizeSurface() {
            surface.resize();
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("Surface resized to match container");
        }
    </script>

#### Parameters

##### force `Boolean` *optional*
Whether to proceed with resizing even if the container dimensions have not changed.

### showTooltip

Shows the surface tooltip for the passed shape.


<div class="meta-api-description">
How can I programmatically control the tooltip visibility in Kendo UI for jQuery drawingapi? Trigger or display the tooltip for a particular visual element or shape programmatically by controlling tooltip visibility, simulating hover or focus states, showing contextual information or hints linked to specific chart or UI components, invoking tooltip rendering dynamically during user interactions or custom events, enabling manual tooltip activation or toggling on demand, managing tooltip placement relative to targeted graphical shapes, and integrating tooltip display logic to enhance user feedback, guidance, or data explanation without relying solely on default hover behavior.
</div>

#### Example

    <div id="container"></div>
    <button onclick="showTooltipManually()">Show Tooltip</button>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;
        var surface = draw.Surface.create($("#container"), {
            width: "400px",
            height: "300px"
        });

        var circle = new draw.Circle(new geom.Circle([200, 150], 50), {
            tooltip: {
                content: "Manually triggered tooltip"
            }
        }).fill("cyan");

        surface.draw(circle);

        function showTooltipManually() {
            surface.showTooltip(circle, {
                content: "Custom tooltip content"
            });
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("Tooltip shown manually");
        }
    </script>

#### Parameters

##### element `kendo.drawing.Element`
The element for which the tooltip should be shown.

##### options `Object` *optional*
Options for the tooltip.

## Events

### click
Triggered when an element has been clicked.


<div class="meta-api-description">
How do I handle user clicks on shapes rendered by a visual surface in Kendo UI for jQuery? Detect and respond to user click actions, taps, or pointer presses on graphical elements such as shapes, paths, or grouped items rendered by a visual surface component, enabling custom event handling, interaction tracking, and identification of clicked targets for implementing interactive behaviors, user input responses, or gesture recognition in applications that manage dynamic visual content or UI elements.
</div>

#### Example - subscribe to the "click" event during initialization
    <div id="container"></div>
    <script>
        var draw = kendo.drawing;
        var surface = draw.Surface.create($("#container"), {
            click: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
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


<div class="meta-api-description">
How do I detect when the mouse hovers over a graphical surface in Kendo UI for jQuery? Detect when the mouse cursor or pointer moves over, enters, or hovers on an element within a graphical surface or interactive area by capturing event triggers related to mouseenter, hover detection, or mouseover actions. Enable or configure handlers that respond to pointer entry events to highlight elements, display tooltips, initiate animations, or start interactive behaviors when the cursor crosses into a target surface region, supporting use cases like UI feedback, dynamic content display, and user interaction tracking on visual components or canvas-like surfaces.
</div>

#### Example - subscribe to the "mouseenter" event during initialization
    <div id="container"></div>
    <script>
        var draw = kendo.drawing;
        var surface = draw.Surface.create($("#container"), {
            mouseenter: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
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


<div class="meta-api-description">
How do I stop hover effects when the mouse leaves a Kendo UI drawingapi surface? Detect and respond to the cursor or pointer exiting a visual area or interactive element by capturing mouse leave, pointer out, hover end, or mouseout events, enabling control over stopping hover effects, hiding tooltips or overlays, finalizing drag or pointer interactions, managing user interface cleanup, resetting hover states, and updating component behavior when the mouse moves away from a surface or interactive region.
</div>

#### Example - subscribe to the "mouseleave" event during initialization
    <div id="container"></div>
    <script>
        var draw = kendo.drawing;
        var surface = draw.Surface.create($("#container"), {
            mouseleave: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
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


<div class="meta-api-description">
How do I detect when a Kendo UI tooltip is closed? Detect when a tooltip is closed, listen for tooltip dismissal events, trigger actions on tooltip hide, respond to tooltip closing to update interface or state, handle tooltip closure to run cleanup code, track tooltip interactions by capturing close events, synchronize UI changes or fire analytics upon tooltip disappearance, enable event handling for tooltip shutdown, control behaviors tied to tooltip lifecycle ending, and respond programmatically when a tooltip finishes displaying.
</div>

#### Example - subscribe to the "tooltipClose" event

    <div id="container"></div>
    <script>
      var draw = kendo.drawing;
      var surface = draw.Surface.create($("#container"), {
        tooltipClose: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
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


<div class="meta-api-description">
How to detect when a tooltip is opened in Kendo UI for jQuery? Detect when a tooltip becomes visible on a surface or UI element by listening for events signaling tooltip activation, enabling actions like dynamically updating tooltip text, tracking user engagement with tooltips, modifying related interface components when the tooltip appears, controlling tooltip display timing, responding to hover or focus that triggers tooltips, configuring custom reactions during tooltip presentation, and integrating tooltip visibility changes with analytics or UI adjustments.
</div>

#### Example - subscribe to the "tooltipOpen" event

    <div id="container"></div>
    <script>
      var draw = kendo.drawing;
      var surface = draw.Surface.create($("#container"), {
        tooltipOpen: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
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
