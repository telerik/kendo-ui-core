---
title: Connector
res_type: api
---

# kendo.dataviz.diagram.Connector

The Connector object is a visual intermediate between the Connection and the Shape, it represents the attachment point of a Connection to a Shape.

## Configuration

### width `Number` *(default: 8)*

Defines the width of the connector.


<div class="meta-api-description">
Adjust the thickness, line width, or stroke weight of connections or links between shapes and nodes in diagrams, flowcharts, or graphical components; customize how bold, thin, or visually prominent the connector lines appear in visual interfaces by configuring or setting connector thickness, line size, stroke weight, or link width to enhance clarity, visibility, or subtlety of connections within diagramming, node-linking, or graph visualization contexts.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "1",
            content: "Shape 1",
            x: 100,
            y: 100
        }, {
            id: "2", 
            content: "Shape 2",
            x: 300,
            y: 100
        }],
        connections: [{
            from: "1",
            to: "2"
        }],
        connectionDefaults: {
            fromConnector: {
                width: 12
            },
            toConnector: {
                width: 12
            }
        }
    });
    </script>

### height `Number` *(default: 8)*

Defines the height of the connector.


<div class="meta-api-description">
Adjust and control the vertical size or height of connectors between diagram elements, enabling customization of spacing, alignment, and proportions in flowcharts or node links, including setting connector thickness or vertical dimensions during layout or initialization to ensure clear, well-spaced connections and improve visual structure in diagrams.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "1",
            content: "Shape 1",
            x: 100,
            y: 100
        }, {
            id: "2", 
            content: "Shape 2",
            x: 300,
            y: 100
        }],
        connections: [{
            from: "1",
            to: "2"
        }],
        connectionDefaults: {
            fromConnector: {
                height: 12
            },
            toConnector: {
                height: 12
            }
        }
    });
    </script>

### hover `Object`

Defines the hover configuration.


<div class="meta-api-description">
Manage and customize interactive visual effects for links or connections in diagrams during mouse hover or pointer focus by configuring hover states such as changing styles, colors, opacity, cursors, animations, or highlight effects. Enable or disable hover feedback on connectors to improve user interaction, define how connections respond to pointer events with different visual cues, and set behaviors that trigger when users mouse over or touch edges between nodes in graphical interfaces. Adjust hover animations, cursor types, visual emphasis, and styling to control the look and feel of connection elements when hovered, ensuring intuitive and responsive diagram navigation and interaction.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "1",
            content: "Shape 1",
            x: 100,
            y: 100
        }, {
            id: "2", 
            content: "Shape 2",
            x: 300,
            y: 100
        }],
        connections: [{
            from: "1",
            to: "2"
        }],
        connectionDefaults: {
            fromConnector: {
                hover: {
                    fill: {
                        color: "red",
                        opacity: 0.8
                    },
                    stroke: {
                        color: "blue",
                        width: 2
                    }
                }
            }
        }
    });
    </script>

### hover.fill `String|Object`

Defines the hover fill options of the connector.


<div class="meta-api-description">
Set or customize the fill color, opacity, gradient, or visual appearance of a connector in a diagram when the mouse pointer hovers over it, enabling control over hover states, highlight effects, interactive styling, and dynamic fill changes to enhance user interaction and visual feedback on connector elements during mouseover events.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "1",
            content: "Shape 1",
            x: 100,
            y: 100
        }, {
            id: "2", 
            content: "Shape 2",
            x: 300,
            y: 100
        }],
        connections: [{
            from: "1",
            to: "2"
        }],
        connectionDefaults: {
            fromConnector: {
                hover: {
                    fill: {
                        color: "orange",
                        opacity: 0.7
                    }
                }
            }
        }
    });
    </script>

### hover.fill.color `String`

Defines the hover fill color of the connector.


<div class="meta-api-description">
Customize the fill color that appears when hovering over connections or links within diagrams or graphical interfaces to highlight focus, emphasize interactivity, and provide visual feedback on mouseover events. Adjust the highlight shade, enable hover state coloring, control color transitions for connectors or edge elements when the cursor is over them, and set visual styles to improve user experience by signaling active or selectable connections on hover. This includes configuring interactive fill tint, hover emphasis colors, and dynamic color changes for connection lines or graphical connectors during pointer hover activity.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "1",
            content: "Shape 1",
            x: 100,
            y: 100
        }, {
            id: "2", 
            content: "Shape 2",
            x: 300,
            y: 100
        }],
        connections: [{
            from: "1",
            to: "2"
        }],
        connectionDefaults: {
            fromConnector: {
                hover: {
                    fill: {
                        color: "purple"
                    }
                }
            }
        }
    });
    </script>

### hover.fill.opacity `Number` *(default: 1)*

Defines the hover fill opacity of the connector.


<div class="meta-api-description">
Adjust the transparency, alpha level, or opacity of the hover fill color for connectors to emphasize, highlight, dim, fade, or visually distinguish connections when the mouse pointer or cursor hovers over, rolls over, or focuses on a link or connector line. Enable, customize, set, or configure how visible or subtle the hover background or fill effect appears on interactive connectors, edges, or links in diagrams, flowcharts, or graphs during user hover interactions or mouse events to control visual feedback and user interface clarity.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "1",
            content: "Shape 1",
            x: 100,
            y: 100
        }, {
            id: "2", 
            content: "Shape 2",
            x: 300,
            y: 100
        }],
        connections: [{
            from: "1",
            to: "2"
        }],
        connectionDefaults: {
            fromConnector: {
                hover: {
                    fill: {
                        color: "green",
                        opacity: 0.5
                    }
                }
            }
        }
    });
    </script>

### hover.stroke `String|Object`

Defines the hover stroke options of the connector.


<div class="meta-api-description">
configure interactive connector highlight styles for diagram links on pointer hover including customizable stroke color, width, dash patterns, and opacity to visually emphasize or distinguish connections when hovering, enabling control over hover effects, link outline appearance, and dynamic stroke styling to improve user feedback and interaction cues in diagram or flowchart components.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "1",
            content: "Shape 1",
            x: 100,
            y: 100
        }, {
            id: "2", 
            content: "Shape 2",
            x: 300,
            y: 100
        }],
        connections: [{
            from: "1",
            to: "2"
        }],
        connectionDefaults: {
            fromConnector: {
                hover: {
                    stroke: {
                        color: "red",
                        width: 3,
                        dashType: "dash"
                    }
                }
            }
        }
    });
    </script>

### hover.stroke.color `String` *(default: "Black")*

Defines the hover stroke color.


<div class="meta-api-description">
Customize or set the outline color for connectors during mouse hover, touch interaction, or focus states to highlight, emphasize, or visually indicate connectors in diagrams and flowcharts; control and configure stroke colors for connector hover effects, enabling dynamic styling, visual feedback, and interactive highlighting of connector lines when users point, select, or focus on them.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "1",
            content: "Shape 1",
            x: 100,
            y: 100
        }, {
            id: "2", 
            content: "Shape 2",
            x: 300,
            y: 100
        }],
        connections: [{
            from: "1",
            to: "2"
        }],
        connectionDefaults: {
            fromConnector: {
                hover: {
                    stroke: {
                        color: "crimson"
                    }
                }
            }
        }
    });
    </script>

### hover.stroke.dashType `String`

The hover stroke dash type.


<div class="meta-api-description">
Configure dash patterns for a connector’s outline during mouse hover or pointer over interactions in diagrams, enabling customization of stroke styles like dashed, dotted, or custom dash arrays to highlight connectors visually when hovered. Adjust, set, or control hover stroke dash types to create emphasis, improve visibility, or provide dynamic visual feedback on connectors in flowcharts, node links, or graphical interface elements, supporting various dash styles for interactive highlighting and focus states during user interaction or pointer events.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "1",
            content: "Shape 1",
            x: 100,
            y: 100
        }, {
            id: "2", 
            content: "Shape 2",
            x: 300,
            y: 100
        }],
        connections: [{
            from: "1",
            to: "2"
        }],
        connectionDefaults: {
            fromConnector: {
                hover: {
                    stroke: {
                        color: "blue",
                        dashType: "dashDot"
                    }
                }
            }
        }
    });
    </script>

### hover.stroke.width `Number` *(default: 1)*

Defines the thickness or width of the connector's stroke on hover.


<div class="meta-api-description">
Adjust or set the thickness, stroke width, or line weight of connectors when a pointer hovers over them, enabling visual emphasis or highlight effects on diagram connectors during mouseover or hover interactions. Control, configure, or customize the connector outline thickness dynamically on hover to improve visual feedback, focus, or user interaction responsiveness in diagram components and graphical user interfaces.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "1",
            content: "Shape 1",
            x: 100,
            y: 100
        }, {
            id: "2", 
            content: "Shape 2",
            x: 300,
            y: 100
        }],
        connections: [{
            from: "1",
            to: "2"
        }],
        connectionDefaults: {
            fromConnector: {
                hover: {
                    stroke: {
                        color: "orange",
                        width: 4
                    }
                }
            }
        }
    });
    </script>

### fill `String|Object`

Defines the fill options of the connector.


<div class="meta-api-description">
Configure and customize the interior coloring and shading of connector lines or shapes within diagrams by setting properties that control fill color, opacity levels, gradient effects, transparency, and painting styles. Enable, adjust, or style how connector interiors appear by manipulating fill properties such as solid colors, semi-transparent tints, gradient fills, or custom shading to visually distinguish connectors, highlight paths, or match design themes in diagramming tools. This includes options to set fill aesthetics, control opacity for subtle appearance, apply gradient transitions for smooth color blending, and fully customize the internal paint of connectors for enhanced visualization and thematic consistency.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "1",
            content: "Shape 1",
            x: 100,
            y: 100
        }, {
            id: "2", 
            content: "Shape 2",
            x: 300,
            y: 100
        }],
        connections: [{
            from: "1",
            to: "2"
        }],
        connectionDefaults: {
            fromConnector: {
                fill: {
                    color: "lightblue",
                    opacity: 0.8
                }
            }
        }
    });
    </script>

### fill.color `String`

Defines the fill color of the connector.


<div class="meta-api-description">
Adjust or define the interior fill color of diagram connectors to customize connection appearance, synchronize with shape fills or themes, implement branding colors, control connector visualization, style line fillings, set connector background hues, configure fill tones for connectors, and enhance visual emphasis or differentiation within diagrams through color settings.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "1",
            content: "Shape 1",
            x: 100,
            y: 100
        }, {
            id: "2", 
            content: "Shape 2",
            x: 300,
            y: 100
        }],
        connections: [{
            from: "1",
            to: "2"
        }],
        connectionDefaults: {
            fromConnector: {
                fill: {
                    color: "yellow"
                }
            }
        }
    });
    </script>

### fill.opacity `Number` *(default: 1)*

Defines the fill opacity of the connector.


<div class="meta-api-description">
Adjust the fill transparency or alpha level of connector shapes to control how opaque or see-through the connection areas appear in diagrams, allowing configuration of visual layering, emphasis, or subtle background effects by setting numeric opacity values such as decimals between 0 and 1; customize fill visibility for styling, RGBA color effects, or blending connectors with other diagram elements to enhance clarity, focus, or aesthetic presentation within visual layouts.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "1",
            content: "Shape 1",
            x: 100,
            y: 100
        }, {
            id: "2", 
            content: "Shape 2",
            x: 300,
            y: 100
        }],
        connections: [{
            from: "1",
            to: "2"
        }],
        connectionDefaults: {
            fromConnector: {
                fill: {
                    color: "pink",
                    opacity: 0.6
                }
            }
        }
    });
    </script>

### stroke `String|Object`

Defines the stroke options of the connector.


<div class="meta-api-description">
Control and customize connection line appearance by configuring outline color, width, dash patterns, opacity, and other SVG stroke attributes that define how connectors or links render in diagrams and flowcharts. Adjust stroke settings to set line borders, dash types, transparency levels, thickness, and overall visual style for connector paths, link lines, or diagram edges. Enable styling of connection strokes, outlines, or link visuals with flexible options to manage color shading, line patterns, and opacity for enhanced diagram presentation and connectivity visualization.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "1",
            content: "Shape 1",
            x: 100,
            y: 100
        }, {
            id: "2", 
            content: "Shape 2",
            x: 300,
            y: 100
        }],
        connections: [{
            from: "1",
            to: "2"
        }],
        connectionDefaults: {
            fromConnector: {
                stroke: {
                    color: "navy",
                    width: 2,
                    dashType: "solid"
                }
            }
        }
    });
    </script>

### stroke.color `String` *(default: "Black")*

Defines the stroke color.


<div class="meta-api-description">
Adjust or configure the visible line color, outline color, or stroke color of connection lines, edges, or paths between nodes or shapes within diagrams, flowcharts, or visual graphs. Customize, set, or control connector link or edge colors to enhance visual clarity, highlight relationships, or match design themes by specifying the color applied to connector strokes, outlines, or borders in diagramming or charting tools. Enable modifications to the connector’s line color for rendering lines, paths, or edges that connect elements, supporting color changes for connectors, links, and connection lines in diagram editing, visualization, or UI design contexts.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "1",
            content: "Shape 1",
            x: 100,
            y: 100
        }, {
            id: "2", 
            content: "Shape 2",
            x: 300,
            y: 100
        }],
        connections: [{
            from: "1",
            to: "2"
        }],
        connectionDefaults: {
            fromConnector: {
                stroke: {
                    color: "darkgreen"
                }
            }
        }
    });
    </script>

### stroke.dashType `String`

The stroke dash type.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line


<div class="meta-api-description">
Adjust and configure line styles for connectors by setting dash patterns such as dashed, dotted, dash-dot, long dash, and solid lines to customize the visual appearance of connections, enhance diagram readability, apply specific stroke patterns, enable different line textures, control connector outlines, and tailor connectors to design standards or user preferences by selecting from multiple dash type options to differentiate links or relationships within a diagram or chart.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "1",
            content: "Shape 1",
            x: 100,
            y: 100
        }, {
            id: "2", 
            content: "Shape 2",
            x: 300,
            y: 100
        }],
        connections: [{
            from: "1",
            to: "2"
        }],
        connectionDefaults: {
            fromConnector: {
                stroke: {
                    color: "purple",
                    dashType: "longDash"
                }
            }
        }
    });
    </script>

### stroke.width `Number` *(default: 1)*

Defines the thickness or width of the connector's stroke.


<div class="meta-api-description">
Adjusting the thickness, line weight, or stroke size of connector lines to customize visual appearance, control how bold or thin connectors appear, set numeric values for line width, configure connector border thickness, modify stroke weight for better visibility or subtlety, scale line thickness for clearer interaction cues, tune connector line rendering weight, and enable precise control over connector stroke dimensions during setup or runtime.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "1",
            content: "Shape 1",
            x: 100,
            y: 100
        }, {
            id: "2", 
            content: "Shape 2",
            x: 300,
            y: 100
        }],
        connections: [{
            from: "1",
            to: "2"
        }],
        connectionDefaults: {
            fromConnector: {
                stroke: {
                    color: "maroon",
                    width: 3
                }
            }
        }
    });
    </script>

## Fields

### connections `Array`

An array of [Connections](/api/javascript/dataviz/diagram/connection) that originate or terminate in this connector.


<div class="meta-api-description">
Access and manipulate all connection links associated with a specific interface point, enabling retrieval, inspection, updating, adding, removing, or detaching of connection endpoints tied to a connector within a diagram or network structure. This capability supports programmatic iteration and searching through connections that start or end at a given point, allowing dynamic control over relational links between nodes or components, useful for modifying connection graphs, managing linked data paths, or adjusting network topology after setup.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "1",
            content: "Shape 1",
            x: 100,
            y: 100
        }, {
            id: "2", 
            content: "Shape 2",
            x: 300,
            y: 100
        }],
        connections: [{
            from: "1",
            to: "2"
        }]
    });
    
    var diagram = $("#diagram").data("kendoDiagram");
    var shape = diagram.shapes[0];
    var connector = shape.connectors[0];
    
    // Get connections associated with this connector
    console.log("Connections:", connector.connections);
    </script>

### shape `kendo.dataviz.diagram.Shape`

The [Shape](/api/javascript/dataviz/diagram/shape) that owns the connector.


<div class="meta-api-description">
Retrieve or modify the parent shape instance associated with a connector, including accessing its unique identifier, layout properties, anchor points, or overall configuration; manage relationships between connectors and their owning shapes, navigate from a connector to the container shape object, inspect or update the shape that contains or owns the connector, control connections by referencing the shape linked to a given connector element, and handle shape properties dynamically through connector-to-shape references.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "1",
            content: "Shape 1",
            x: 100,
            y: 100
        }, {
            id: "2", 
            content: "Shape 2",
            x: 300,
            y: 100
        }],
        connections: [{
            from: "1",
            to: "2"
        }]
    });
    
    var diagram = $("#diagram").data("kendoDiagram");
    var shape = diagram.shapes[0];
    var connector = shape.connectors[0];
    
    // Get the shape that owns this connector
    console.log("Parent shape:", connector.shape);
    console.log("Shape content:", connector.shape.content);
    </script>

## Methods

### position

Gets the position of the Connector.


<div class="meta-api-description">
Get the current location, coordinates, or spatial position of a connector or link element for layout calculations, alignment, hit-testing, collision detection, exporting visuals, or recalculating rendering areas; retrieve updated placement data anytime after initialization or layout changes to access the exact on-screen or canvas position necessary for UI adjustments, graphics processing, or interactive element alignment.
</div>

#### Returns

`kendo.dataviz.diagram.Point` the current position of the connector.

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "1",
            content: "Shape 1",
            x: 100,
            y: 100
        }, {
            id: "2", 
            content: "Shape 2",
            x: 300,
            y: 100
        }],
        connections: [{
            from: "1",
            to: "2"
        }]
    });
    
    var diagram = $("#diagram").data("kendoDiagram");
    var shape = diagram.shapes[0];
    var connector = shape.connectors[0];
    
    // Get the connector's position
    var position = connector.position();
    console.log("Connector position - X:", position.x, "Y:", position.y);
    </script>

