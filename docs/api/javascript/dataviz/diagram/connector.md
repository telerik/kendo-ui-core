---
title: Connector
res_type: api
---

# kendo.dataviz.diagram.Connector

The Connector object is a visual intermediate between the Connection and the Shape, it represents the attachment point of a Connection to a Shape.

## Configuration

### width `Number` *(default: 8)*

Defines the width of the connector.

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

