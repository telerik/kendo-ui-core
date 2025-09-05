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
