---
title: Rectangle
res_type: api
---

# kendo.dataviz.diagram.Rectangle

Represents a rectangle.

## Configuration

### fill `String|Object`

Defines the fill options of the rectangle.

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            type: "rectangle",
            x: 100,
            y: 100,
            width: 200,
            height: 100,
            fill: {
                color: "#ff6358",
                opacity: 0.8
            }
        }]
    });
    </script>

### fill.color `String`

Defines the fill color of the rectangle.

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            type: "rectangle",
            x: 100,
            y: 100,
            width: 200,
            height: 100,
            fill: {
                color: "#0099ff"
            }
        }]
    });
    </script>

### fill.opacity `Number` *(default: 1)*

Defines the fill opacity of the rectangle.

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            type: "rectangle",
            x: 100,
            y: 100,
            width: 200,
            height: 100,
            fill: {
                color: "#ff6358",
                opacity: 0.5
            }
        }]
    });
    </script>

### fill.gradient `Object`

Defines the gradient fill of the shape.

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            type: "rectangle",
            x: 100,
            y: 100,
            width: 200,
            height: 100,
            fill: {
                gradient: {
                    type: "linear",
                    start: [0, 0],
                    end: [1, 1],
                    stops: [
                        { offset: 0, color: "#ff6358" },
                        { offset: 1, color: "#ffd246" }
                    ]
                }
            }
        }]
    });
    </script>

### fill.gradient.type `String` *(default: "linear")*
The type of the gradient. Supported values are:

* linear
* radial

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            type: "rectangle",
            x: 100,
            y: 100,
            width: 200,
            height: 100,
            fill: {
                gradient: {
                    type: "radial",
                    center: [0.5, 0.5],
                    radius: 0.8,
                    stops: [
                        { offset: 0, color: "#ff6358" },
                        { offset: 1, color: "#ffd246" }
                    ]
                }
            }
        }]
    });
    </script>

### fill.gradient.center `Array`
The center of the radial gradient.

Coordinates are relative to the shape bounding box.
For example [0, 0] is top left and [1, 1] is bottom right.

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            type: "rectangle",
            x: 100,
            y: 100,
            width: 200,
            height: 100,
            fill: {
                gradient: {
                    type: "radial",
                    center: [0.3, 0.3],
                    radius: 0.7,
                    stops: [
                        { offset: 0, color: "#ff6358" },
                        { offset: 1, color: "#ffd246" }
                    ]
                }
            }
        }]
    });
    </script>

### fill.gradient.radius `Number` *(default: 1)*
The radius of the radial gradient relative to the shape bounding box.

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            type: "rectangle",
            x: 100,
            y: 100,
            width: 200,
            height: 100,
            fill: {
                gradient: {
                    type: "radial",
                    center: [0.5, 0.5],
                    radius: 0.3,
                    stops: [
                        { offset: 0, color: "#ff6358" },
                        { offset: 1, color: "#ffd246" }
                    ]
                }
            }
        }]
    });
    </script>

### fill.gradient.start `Array`
The start point of the linear gradient.

Coordinates are relative to the shape bounding box.
For example [0, 0] is top left and [1, 1] is bottom right.

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            type: "rectangle",
            x: 100,
            y: 100,
            width: 200,
            height: 100,
            fill: {
                gradient: {
                    type: "linear",
                    start: [0, 0.5],
                    end: [1, 0.5],
                    stops: [
                        { offset: 0, color: "#ff6358" },
                        { offset: 1, color: "#ffd246" }
                    ]
                }
            }
        }]
    });
    </script>

### fill.gradient.end `Array`
The end point of the linear gradient.

Coordinates are relative to the shape bounding box.
For example [0, 0] is top left and [1, 1] is bottom right.

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            type: "rectangle",
            x: 100,
            y: 100,
            width: 200,
            height: 100,
            fill: {
                gradient: {
                    type: "linear",
                    start: [0, 0],
                    end: [1, 0],
                    stops: [
                        { offset: 0, color: "#ff6358" },
                        { offset: 1, color: "#ffd246" }
                    ]
                }
            }
        }]
    });
    </script>

### fill.gradient.stops `Array`
The array of gradient color stops.

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            type: "rectangle",
            x: 100,
            y: 100,
            width: 200,
            height: 100,
            fill: {
                gradient: {
                    type: "linear",
                    start: [0, 0],
                    end: [1, 1],
                    stops: [
                        { offset: 0, color: "#ff6358", opacity: 1 },
                        { offset: 0.5, color: "#ffd246", opacity: 0.8 },
                        { offset: 1, color: "#28b4c8", opacity: 0.6 }
                    ]
                }
            }
        }]
    });
    </script>

### fill.gradient.stops.offset `Number`
The stop offset from the start of the element.
Ranges from 0 (start of gradient) to 1 (end of gradient).

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            type: "rectangle",
            x: 100,
            y: 100,
            width: 200,
            height: 100,
            fill: {
                gradient: {
                    type: "linear",
                    start: [0, 0],
                    end: [1, 0],
                    stops: [
                        { offset: 0, color: "#ff6358" },
                        { offset: 0.3, color: "#ffd246" },
                        { offset: 0.7, color: "#28b4c8" },
                        { offset: 1, color: "#78d237" }
                    ]
                }
            }
        }]
    });
    </script>

### fill.gradient.stops.color `String`
The color in any of the following formats.

| Format         | Description
| ---            | --- | ---
| red            | [Basic](https://www.w3.org/TR/css3-color/#html4) or [Extended](https://www.w3.org/TR/css3-color/#svg-color) CSS Color name
| #ff0000        | Hex RGB value
| rgb(255, 0, 0) | RGB value

Specifying 'none', 'transparent' or '' (empty string) will clear the fill.

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            type: "rectangle",
            x: 100,
            y: 100,
            width: 200,
            height: 100,
            fill: {
                gradient: {
                    type: "linear",
                    start: [0, 0],
                    end: [1, 0],
                    stops: [
                        { offset: 0, color: "red" },
                        { offset: 0.5, color: "#ff0000" },
                        { offset: 1, color: "rgb(255, 0, 0)" }
                    ]
                }
            }
        }]
    });
    </script>

### fill.gradient.stops.opacity `Number`
The fill opacity.
Ranges from 0 (completely transparent) to 1 (completely opaque).

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            type: "rectangle",
            x: 100,
            y: 100,
            width: 200,
            height: 100,
            fill: {
                gradient: {
                    type: "linear",
                    start: [0, 0],
                    end: [1, 0],
                    stops: [
                        { offset: 0, color: "#ff6358", opacity: 1 },
                        { offset: 0.5, color: "#ffd246", opacity: 0.7 },
                        { offset: 1, color: "#28b4c8", opacity: 0.3 }
                    ]
                }
            }
        }]
    });
    </script>

### height `Number`

Sets the height of the rectangle.

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            type: "rectangle",
            x: 100,
            y: 100,
            width: 200,
            height: 150,
            fill: {
                color: "#ff6358"
            }
        }]
    });
    </script>

### stroke `Object`

Defines the stroke configuration.

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            type: "rectangle",
            x: 100,
            y: 100,
            width: 200,
            height: 100,
            fill: {
                color: "#ff6358"
            },
            stroke: {
                color: "#0099ff",
                width: 3
            }
        }]
    });
    </script>

### stroke.color `String`

Defines the line color of the rectangle.

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            type: "rectangle",
            x: 100,
            y: 100,
            width: 200,
            height: 100,
            fill: {
                color: "#ff6358"
            },
            stroke: {
                color: "#28b4c8"
            }
        }]
    });
    </script>

### stroke.width `Number`

Defines the stroke width of the rectangle.

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            type: "rectangle",
            x: 100,
            y: 100,
            width: 200,
            height: 100,
            fill: {
                color: "#ff6358"
            },
            stroke: {
                color: "#0099ff",
                width: 5
            }
        }]
    });
    </script>

### width `Number`

Sets the width of the rectangle.

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            type: "rectangle",
            x: 100,
            y: 100,
            width: 300,
            height: 100,
            fill: {
                color: "#ff6358"
            }
        }]
    });
    </script>

### x `Number`

The X position of the top-left corner of the rectangle.

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            type: "rectangle",
            x: 50,
            y: 100,
            width: 200,
            height: 100,
            fill: {
                color: "#ff6358"
            }
        }]
    });
    </script>

### y `Number`

The Y position of the top-left corner of the rectangle.

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            type: "rectangle",
            x: 100,
            y: 50,
            width: 200,
            height: 100,
            fill: {
                color: "#ff6358"
            }
        }]
    });
    </script>

## Fields

### drawingElement `kendo.drawing.Path`

The drawing element used to draw the rectangle.

#### Example

    <div id="diagram"></div>
    <script>
    var diagram = $("#diagram").kendoDiagram({
        shapes: [{
            type: "rectangle",
            x: 100,
            y: 100,
            width: 200,
            height: 100,
            fill: {
                color: "#ff6358"
            }
        }]
    }).getKendoDiagram();
    
    var rectangle = diagram.shapes[0];
    var element = rectangle.drawingElement;
    console.log("Drawing element:", element);
    </script>

## Methods

### visible

Gets or sets the visibility of the current element.

#### Example

    <div id="diagram"></div>
    <script>
    var diagram = $("#diagram").kendoDiagram({
        shapes: [{
            type: "rectangle",
            x: 100,
            y: 100,
            width: 200,
            height: 100,
            fill: {
                color: "#ff6358"
            }
        }]
    }).getKendoDiagram();
    
    var rectangle = diagram.shapes[0];
    
    // Hide the rectangle
    rectangle.visible(false);
    console.log("Visibility:", rectangle.visible());
    
    // Show the rectangle again
    rectangle.visible(true);
    console.log("Visibility:", rectangle.visible());
    </script>

#### Parameters

##### visible `Boolean`

The new visibility state.

#### Returns

`Boolean` True if the element is visible, false otherwise.
