---
title: Shape
res_type: api
---

# kendo.dataviz.diagram.Shape

The Shape object represents a visual node in the graph or diagram.

## Configuration

### id `String`

The unique identifier for a Shape.

#### Example - creating a shape with id

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");

      var shape = new Shape({
        id: 1
      });
      diagram.addShape(shape);
    </script>

### editable `Boolean|Object` *(default: true)*

Defines the shape editable options.

#### Example - creating non-editable shape

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");

      var shape = new Shape({
        id: 1,
        x: 20,
        y: 20,
        fill: "#c0f0fc",
        editable: false
      });
      diagram.addShape(shape);
    </script>

### editable.connect `Boolean`

Specifies whether the connectors should appear on hover.

#### Example - hiding shape connectors

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");

      var shape = new Shape({
        id: 1,
        x: 20,
        y: 20,
        fill: "#c0f0fc",
        editable: {
          connect: false
        }
      });
      diagram.addShape(shape);
    </script>

### path `String`

The path option of a Shape is a description of a custom geometry. The format follows the standard SVG format (https://www.w3.org/TR/SVG/paths.html#PathData "SVG Path data.").

#### Example - declaring a custom path for the shape

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");

      var shape = new Shape({
        id: 1,
        x: 20,
        y: 20,
        fill: "#c0f0fc",
        path: "m35.15,0 L84.85,0 L120,35.15 L120,84.85 L84.85,120 L35.15,120 L0,84.85 L0,35.15 z"
      });
      diagram.addShape(shape);
    </script>

### stroke `Object`

Defines the stroke configuration.

#### Example - customizing the shape border

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");

      var shape = new Shape({
        id: 1,
        x: 20,
        y: 20,
        fill: "#c0f0fc",
        stroke: {
          color: "#8800cc",
          dashType: "dashDot"
        }
      });
      diagram.addShape(shape);
    </script>

### stroke.color `String`

Defines the color of the shape's stroke.

### stroke.width `Number` *(default: 1)*

Defines the thickness or width of the shape's stroke.

### stroke.dashType `String`

The dash type of the shape.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

### type `String` *(default: "rectangle")*

Specifies the type of the Shape using any of the built-in shape type.

* "rectangle": this is the default option, representing a SVG Rectangle
* "circle" : a SVG circle/ellipse

#### Example - creating a circle shape

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");

      var shape = new Shape({
        id: 1,
        x: 20,
        y: 20,
        fill: "#c0f0fc",
        type: "circle"
      });
      diagram.addShape(shape);
    </script>

### x `Number` *(default: 0)*

Defines the x-coordinate of the shape when added to the diagram.

#### Example - specifying shape horizontal position

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");

      var shape = new Shape({
        id: 1,
        x: 200,
        fill: "#c0f0fc",
        type: "circle"
      });
      diagram.addShape(shape);
    </script>

### y `Number` *(default: 0)*

Defines the y-coordinate of the shape when added to the diagram.

#### Example - specifying shape vertical position

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");

      var shape = new Shape({
        id: 1,
        y: 200,
        fill: "#c0f0fc",
        type: "circle"
      });
      diagram.addShape(shape);
    </script>

### minWidth `Number` *(default: 20)*

Defines the minimum width the shape should have, i.e. it cannot be resized to a value smaller than the given one.

#### Example - specifying a minimum width for the shape

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");

      var shape = new Shape({
        id: 1,
        x: 20,
        y: 20,
        fill: "#c0f0fc",
        minWidth: 60
      });
      diagram.addShape(shape);
    </script>

### minHeight `Number` *(default: 20)*

Defines the minimum height the shape should have, i.e. it cannot be resized to a value smaller than the given one.

#### Example - specifying a minimum height for the shape

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");

      var shape = new Shape({
        id: 1,
        x: 20,
        y: 20,
        fill: "#c0f0fc",
        minHeight: 60
      });
      diagram.addShape(shape);
    </script>

### width `Number` *(default: 100)*

Defines the width of the shape when added to the diagram.

#### Example - specifying width for the shape

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");

      var shape = new Shape({
        id: 1,
        x: 20,
        y: 20,
        fill: "#c0f0fc",
        width: 200
      });
      diagram.addShape(shape);
    </script>

### height `Number` *(default: 100)*

Defines the height of the shape when added to the diagram.

#### Example - specifying height for the shape

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");

      var shape = new Shape({
        id: 1,
        x: 20,
        y: 20,
        fill: "#c0f0fc",
        height: 60
      });
      diagram.addShape(shape);
    </script>

### fill `String|Object`

Defines the fill options of the shape.

#### Example - customizing shape background

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");

      var shape = new Shape({
        id: 1,
        x: 20,
        y: 20,
        fill: {
          color: "#0000ff",
          opacity: 0.5
        },
        width: 200
      });
      diagram.addShape(shape);
    </script>

### fill.color `String`

Defines the fill color of the shape.

### fill.opacity `Number` *(default: 1)*

Defines the fill opacity of the shape.

### fill.gradient `Object`

Defines the gradient fill of the shape.

#### Example - Creating a shape with gradient background

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");

      var shape = new Shape({
        id: 1,
        x: 20,
        y: 20,
        fill: {
          gradient: {
            type: "radial",
            center: [0.5, 0.5],
            radius: 0.9,
            stops: [
              {
                offset: 0,
                color: "lightblue",
                opacity: 0.5
              }, {
                offset: 0.5,
                color: "purple",
                opacity: 0.8
              }
            ]
          }
        }
      });
      diagram.addShape(shape);
    </script>

### fill.gradient.type `String` *(default: "linear")*
The type of the gradient. Supported values are:

* linear
* radial

### fill.gradient.center `Array`
The center of the radial gradient.

Coordinates are relative to the shape bounding box.
For example [0, 0] is top left and [1, 1] is bottom right.

### fill.gradient.radius `Number` *(default: 1)*
The radius of the radial gradient relative to the shape bounding box.

### fill.gradient.start `Array`
The start point of the linear gradient.

Coordinates are relative to the shape bounding box.
For example [0, 0] is top left and [1, 1] is bottom right.

### fill.gradient.end `Array`
The end point of the linear gradient.

Coordinates are relative to the shape bounding box.
For example [0, 0] is top left and [1, 1] is bottom right.

### fill.gradient.stops `Array`
The array of gradient color stops.

### fill.gradient.stops.offset `Number`
The stop offset from the start of the element.
Ranges from 0 (start of gradient) to 1 (end of gradient).

### fill.gradient.stops.color `String`
The color in any of the following formats.

| Format         | Description
| ---            | --- | ---
| red            | [Basic](https://www.w3.org/TR/css3-color/#html4) or [Extended](https://www.w3.org/TR/css3-color/#svg-color) CSS Color name
| #ff0000        | Hex RGB value
| rgb(255, 0, 0) | RGB value

Specifying 'none', 'transparent' or '' (empty string) will clear the fill.

### fill.gradient.stops.opacity `Number`
The fill opacity.
Ranges from 0 (completely transparent) to 1 (completely opaque).

### hover `Object`

Defines the hover configuration.

#### Example - customizing the shape hovered look

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");

      var shape = new Shape({
        id: 1,
        x: 20,
        y: 20,
        fill: "#c0f0fc",
        hover: {
          fill: {
            color: "#c0f08c"
          }
        }
      });
      diagram.addShape(shape);
    </script>

### hover.fill `String|Object`

Defines the hover fill options of the shape.

### hover.fill.color `String`

Defines the hover fill color of the shape.

### hover.fill.opacity `Number` *(default: 1)*

Defines the hover fill opacity of the shape.

### connectors `Array`

Defines the connectors the shape owns.

#### Example - customizing the shape connectors

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");

      var shape = new Shape({
        id: 1,
        x: 20,
        y: 20,
        fill: "#c0f0fc",
        connectors: [
          {
            name: "top"
          },
          {
            name: "Upstream",
            position: function(shp) {
              return shp._transformPoint(shp.bounds().bottomRight());
            }
          }]
      });
      diagram.addShape(shape);
    </script>

### connectors.name `String`

The connector name. Predefined names include:

* "top" - top connector.
* "right" - right connector.
* "bottom" - bottom connector.
* "bottomRight" - bottom right connector.
* "left" - left connector.
* "auto" - auto connector.

### connectors.position `Function`

The function that positions the connector.

### rotation `Object`

The shape rotation settings.

#### Example - creating a rotated shape

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");

      var shape = new Shape({
        id: 1,
        x: 40,
        y: 40,
        fill: "#c0f0fc",
        rotation: {
          angle: 45
        }
      });
      diagram.addShape(shape);
    </script>

### rotation.angle `Number` *(default: 0)*

The rotation angle.

### content `Object`

Defines the shapes content settings.

#### Example - customizing the shape content

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");

      var shape = new Shape({
        id: 1,
        x: 40,
        y: 40,
        fill: "#c0f0fc",
        content: {
          align: "bottom center",
          text: "State 1",
          color: "#cc3388",
          fontFamily: "Segoe UI",
          fontWeight: "bold",
          fontSize: 18,
          fontStyle: "italic"
        }
      });
      diagram.addShape(shape);
    </script>

### content.align `String`

The alignment of the text inside the shape. You can do combinations between "top", "middle" and "bottom" for vertical align and "right", "center" and "left" for horizontal align. For example, "top right", "middle left", "bottom center", and so on.

### content.color `String`

The color of the shape content text.

### content.fontFamily `String`

The font family of the shape content text.

### content.fontSize `Number`

The font size of the shape content text.

### content.fontStyle `String`

The font style of the shape content text.

### content.fontWeight `String`

The font weight of the shape content text.

### content.text `String`

The text displayed in the shape.

### selectable `Boolean` *(default: true)*

Specifies if the shape can be selected.

#### Example - disabling selection for shape

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");

      var shape = new Shape({
        id: 1,
        x: 40,
        y: 40,
        fill: "#c0f0fc",
        selectable: false
      });
      diagram.addShape(shape);
    </script>

### visual `Function`

A function returning a visual element to render for this shape.

#### Example - creating a custom shape visual

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;

      function shapeVisual(data) {
        var g = new kendo.dataviz.diagram.Group({
          autoSize: true
        });
        var r = new kendo.dataviz.diagram.Circle({
          width : 100,
          height: 60,
          fill: "LimeGreen"
        });
        g.append(r);
        var fn = new kendo.dataviz.diagram.TextBlock({
          text: "State 1",
          fontSize: 16,
          x: 25,
          y: 20
        });
        g.append(fn);

        return g;
      }

      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");

      var shape = new Shape({
        id: 1,
        x: 40,
        y: 40,
        fill: "#c0f0fc",
        visual: shapeVisual
      });
      diagram.addShape(shape);
    </script>

### connectorDefaults `Object`

Defines default options for the shape connectors.

#### Example - customizing the shape connectors default settings

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;

      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");

      var shape = new Shape({
        id: 1,
        x: 40,
        y: 40,
        fill: "#c0f0fc",
        connectorDefaults: {
          width: 10,
          height: 10,
          fill: {
            color: "blue",
            opacity: 0.5
          },
          stroke: {
            width: 2,
            color: "lightgreen"
          },
          hover: {
            fill: {
              color: "yellow"
            },
            stroke: {
              color: "lightgreen"
            }
          }
        }
      });
      diagram.addShape(shape);
    </script>

### connectorDefaults.width `Number` *(default: 8)*

Defines the width of the shape connectors.

### connectorDefaults.height `Number` *(default: 8)*

Defines the height of the shape connectors.

### connectorDefaults.hover `Object`

Defines the hover configuration of the shape connectors.

### connectorDefaults.hover.fill `String|Object`

Defines the hover fill options of the shape connectors.

### connectorDefaults.hover.fill.color `String`

Defines the hover fill color of the shape connectors.

### connectorDefaults.hover.fill.opacity `Number` *(default: 1)*

Defines the hover fill opacity of the shape connectors.

### connectorDefaults.hover.stroke `String|Object`

Defines the hover stroke options of the shape connectors.

### connectorDefaults.hover.stroke.color `String` *(default: "Black")*

Defines the hover stroke color.

### connectorDefaults.hover.stroke.dashType `String`

The hover stroke dash type.

### connectorDefaults.hover.stroke.width `Number` *(default: 1)*

Defines the thickness or width of the shape connectors stroke on hover.

### connectorDefaults.fill `String|Object`

Defines the fill options of the shape connectors.

### connectorDefaults.fill.color `String`

Defines the fill color of the shape connectors.

### connectorDefaults.fill.opacity `Number` *(default: 1)*

Defines the fill opacity of the shape connectors.

### connectorDefaults.stroke `String|Object`

Defines the stroke options of the shape connectors.

### connectorDefaults.stroke.color `String` *(default: "Black")*

Defines the stroke color.

### connectorDefaults.stroke.dashType `String`

The stroke dash type.

### connectorDefaults.stroke.width `Number` *(default: 1)*

Defines the thickness or width of the shape connectors stroke.

## Fields

### connectors `Array`

The connectors defined on this shape.

#### Example - accessing the shape connectors

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");

      var shape = new Shape({
        id: 1,
        x: 20,
        y: 20,
        fill: "#c0f0fc",
        connectors: [
          {
            name: "top"
          },
          {
            name: "Upstream",
            position: function(shp) {
              return shp._transformPoint(shp.bounds().bottomRight());
            }
          }]
      });
      diagram.addShape(shape);

      var connectors = shape.connectors;
      console.log("Shape has " + connectors.length + " connectors.");
    </script>

### dataItem `Object`

The data item that this shape is bound to, if any.

#### Example - getting the Diaram shape data item

    <div id="diagram"></div>
    <script>
      var shapesDataSource = {
        data: [
          { id: 1, JobTitle: "Job 1", Color: "red" },
          { id: 2, JobTitle: "Job 2", Color: "blue" },
          { id: 3, JobTitle: "Job 3", Color: "green" }
        ]
      };

      var connectionsDataSource = {
        data: [
          { id: 1, from: 1, to: 2},
          { id: 2, from: 1, to: 3},
        ]
      };

      var diagram = $("#diagram").kendoDiagram({
        dataSource: shapesDataSource,
        connectionsDataSource: connectionsDataSource,
        layout: {
          type: "tree"
        },
        shapeDefaults: {
          content: {
            template: "#= dataItem.JobTitle #"
          }
        }
      }).getKendoDiagram();

      console.log(diagram.shapes[0].dataItem);
    </script>

### shapeVisual `Object`

The visual element representing the shape.

This is either the result returned from
[shape.visual](/api/javascript/dataviz/ui/diagram/configuration/shapedefaults.visual)
or a [predefined type](/api/javascript/dataviz/ui/diagram/configuration/shapes.type).

#### Example - accessing the shape visual element

    <div id="diagram"></div>
    <script>
      var shapesDataSource = {
        data: [
          { id: 1, JobTitle: "Job 1", Color: "red" },
          { id: 2, JobTitle: "Job 2", Color: "blue" },
          { id: 3, JobTitle: "Job 3", Color: "green" }
        ]
      };

      var connectionsDataSource = {
        data: [
          { id: 1, from: 1, to: 2},
          { id: 2, from: 1, to: 3},
        ]
      };

      var diagram = $("#diagram").kendoDiagram({
        dataSource: shapesDataSource,
        connectionsDataSource: connectionsDataSource,
        layout: {
          type: "tree"
        },
        shapeDefaults: {
          content: {
            template: "#= dataItem.JobTitle #"
          }
        }
      }).getKendoDiagram();
      console.log(diagram.shapes[0].shapeVisual);
    </script>

### visual `kendo.dataviz.diagram.Group`

A container for the [shapeVisual](/api/javascript/dataviz/diagram/shape#fields-shapeVisual) element.

Positioning and transformations are applied on this container.

#### Example - accessing the shape visual container

    <div id="diagram"></div>
    <script>
      var shapesDataSource = {
        data: [
          { id: 1, JobTitle: "Job 1", Color: "red" },
          { id: 2, JobTitle: "Job 2", Color: "blue" },
          { id: 3, JobTitle: "Job 3", Color: "green" }
        ]
      };

      var connectionsDataSource = {
        data: [
          { id: 1, from: 1, to: 2},
          { id: 2, from: 1, to: 3},
        ]
      };

      var diagram = $("#diagram").kendoDiagram({
        dataSource: shapesDataSource,
        connectionsDataSource: connectionsDataSource,
        layout: {
          type: "tree"
        },
        shapeDefaults: {
          content: {
            template: "#= dataItem.JobTitle #"
          }
        }
      }).getKendoDiagram();

      diagram.shapes[0].visual.children[1].drawingElement.fill("yellow");
    </script>

## Methods

### position

Get or set method returning the current global position or sets the position specified.

#### Parameters

##### point `kendo.dataviz.diagram.Point`

Either the location to set or if no parameter given returns the current location.

#### Example - changing the shape position

    <div id="diagram"></div>
    <script>
      var shapesDataSource = {
        data: [
          { id: 1, JobTitle: "Job 1", Color: "red" },
          { id: 2, JobTitle: "Job 2", Color: "blue" },
          { id: 3, JobTitle: "Job 3", Color: "green" }
        ]
      };

      var connectionsDataSource = {
        data: [
          { id: 1, from: 1, to: 2},
          { id: 2, from: 1, to: 3},
        ]
      };

      var diagram = $("#diagram").kendoDiagram({
        dataSource: shapesDataSource,
        connectionsDataSource: connectionsDataSource,
        layout: {
          type: "tree"
        },
        shapeDefaults: {
          content: {
            template: "#= dataItem.JobTitle #"
          }
        }
      }).getKendoDiagram();

      diagram.shapes[0].position(new kendo.dataviz.diagram.Point(20, 20));
    </script>

### clone

Returns a clone (with a different id) of the shape.

#### Returns

`kendo.dataviz.diagram.Shape` A clone of the current shape.

#### Example - cloning a shape

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;

      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");

      var shape = new Shape({
        id: 1,
        x: 40,
        y: 40,
        fill: "#c0f0fc",
        connectorDefaults: {
          width: 10,
          height: 10,
          fill: {
            color: "blue",
            opacity: 0.5
          },
          stroke: {
            width: 2,
            color: "lightgreen"
          },
          hover: {
            fill: {
              color: "yellow"
            },
            stroke: {
              color: "lightgreen"
            }
          }
        }
      });
      var shape2 = shape.clone();
      diagram.addShape(shape);
      diagram.addShape(shape2);
      shape2.position(new kendo.dataviz.diagram.Point(150, 150));
    </script>

### connections

Returns the connections attached to the shape. You can optionally specify to return only the incoming or outgoing connections.

#### Parameters

##### type `String`

If not parameter specified all connections are returned, if "in" then only the incoming (i.e. towards the shape) are returned, if "out" the only the outgoing (i.e. away from the shape) are returned.

#### Example - accessing the connections originating from a given shape

    <div id="diagram"></div>
    <script>
      var shapesDataSource = {
        data: [
          { id: 1, JobTitle: "Job 1", Color: "red" },
          { id: 2, JobTitle: "Job 2", Color: "blue" },
          { id: 3, JobTitle: "Job 3", Color: "green" }
        ]
      };

      var connectionsDataSource = {
        data: [
          { id: 1, from: 1, to: 2},
          { id: 2, from: 1, to: 3},
        ]
      };

      var diagram = $("#diagram").kendoDiagram({
        dataSource: shapesDataSource,
        connectionsDataSource: connectionsDataSource,
        layout: {
          type: "tree"
        },
        shapeDefaults: {
          content: {
            template: "#= dataItem.JobTitle #"
          }
        }
      }).getKendoDiagram();

      var outConnections = diagram.shapes[0].connections("out");
      console.log(outConnections);
    </script>

### getConnector

Fetches a (default or custom) Connector defined on the Shape by its name.

#### Parameters

##### name `String`

The name of the connector to get from the shape.

#### Example - getting the shape top connector

    <div id="diagram"></div>
    <script>
      var shapesDataSource = {
        data: [
          { id: 1, JobTitle: "Job 1", Color: "red" },
          { id: 2, JobTitle: "Job 2", Color: "blue" },
          { id: 3, JobTitle: "Job 3", Color: "green" }
        ]
      };

      var connectionsDataSource = {
        data: [
          { id: 1, from: 1, to: 2},
          { id: 2, from: 1, to: 3},
        ]
      };

      var diagram = $("#diagram").kendoDiagram({
        dataSource: shapesDataSource,
        connectionsDataSource: connectionsDataSource,
        layout: {
          type: "tree"
        },
        shapeDefaults: {
          content: {
            template: "#= dataItem.JobTitle #"
          }
        }
      }).getKendoDiagram();

      var connectorTop = diagram.shapes[0].getConnector("top");
      console.log(connectorTop);
    </script>

### getPosition

Returns the middle positions of the sides of the bounds or the center of the shape's bounds. This method is useful when defining custom connectors where a position function relative to the shape's coordinate system is required.

#### Parameters

##### side `String`

One of the four sides of a bound; "left", "right", "top", "bottom". If none specified the center of the shape's bounds will be returned.

#### Example - getting the position of the top side of the shape

    <div id="diagram"></div>
    <script>
      var shapesDataSource = {
        data: [
          { id: 1, JobTitle: "Job 1", Color: "red" },
          { id: 2, JobTitle: "Job 2", Color: "blue" },
          { id: 3, JobTitle: "Job 3", Color: "green" }
        ]
      };

      var connectionsDataSource = {
        data: [
          { id: 1, from: 1, to: 2},
          { id: 2, from: 1, to: 3},
        ]
      };

      var diagram = $("#diagram").kendoDiagram({
        dataSource: shapesDataSource,
        connectionsDataSource: connectionsDataSource,
        layout: {
          type: "tree"
        },
        shapeDefaults: {
          content: {
            template: "#= dataItem.JobTitle #"
          }
        }
      }).getKendoDiagram();

      var position = diagram.shapes[0].getPosition("top");
      console.log(position);
    </script>

### redraw

Renders the shape with the given options. It redefines the options and redraws the shape accordingly.

#### Parameters

##### options `Object`
The object containing a subset of options to change. Follows the same structure as the [configuration](#configuration).

##### Example - Redraw shape with new options

    <div id="diagram"></div>
    <script>
        $("#diagram").kendoDiagram({
          dataSource: {
              data: [{ "items": [{ items: [{}] }] }],
              schema: { model: { children: "items" } }
          },
          layout: {
              type: "tree"
          },
          dataBound: function(e) {
              e.sender.shapes[0].redraw({
                  fill: {
                      color: "green"
                  }
              });
          }
        });
    </script>

### redrawVisual

Redraws the shape visual element and its content

#### Example - redrawing the shape visual element

    <div id="diagram"></div>
    <script>
      var shapesDataSource = {
        data: [
          { id: 1, JobTitle: "Job 1", Color: "red" },
          { id: 2, JobTitle: "Job 2", Color: "blue" },
          { id: 3, JobTitle: "Job 3", Color: "green" }
        ]
      };

      var connectionsDataSource = {
        data: [
          { id: 1, from: 1, to: 2},
          { id: 2, from: 1, to: 3},
        ]
      };

      var diagram = $("#diagram").kendoDiagram({
        dataSource: shapesDataSource,
        connectionsDataSource: connectionsDataSource,
        layout: {
          type: "tree"
        },
        shapeDefaults: {
          content: {
            template: "#= dataItem.JobTitle #"
          }
        }
      }).getKendoDiagram();

      diagram.shapes[0].options.content.template = "Root";
      diagram.shapes[0].redrawVisual();
    </script>

### select

Selects or deselects the shape.

#### Parameters

##### value `Boolean`

Use 'true' to select the shape or 'false' to deselect it.

#### Example - selecting the shape

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;

      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");

      var shape = new Shape({
        id: 1,
        x: 40,
        y: 40,
        fill: "#c0f0fc",
        connectorDefaults: {
          width: 10,
          height: 10,
          fill: {
            color: "blue",
            opacity: 0.5
          },
          stroke: {
            width: 2,
            color: "lightgreen"
          },
          hover: {
            fill: {
              color: "yellow"
            },
            stroke: {
              color: "lightgreen"
            }
          }
        }
      });
      diagram.addShape(shape);

      shape.select(true);
    </script>

### visible

Gets or sets the shape visible state.

#### Parameters

##### visible `Boolean` *optional*
Indicates whether the shape should be visible in the Diagram. If skipped, the method will return the current visible state of the shape.

#### Example

    <button id="hideBtn">Hide Shape 2</button>
    <div id="diagram"></div>
    <script>
      $("#hideBtn").on("click", function(e){
        var diagram = $("#diagram").getKendoDiagram();
        var shape = diagram.shapes[1];
        shape.visible(false);
      });
      $("#diagram").kendoDiagram({
        shapes:[
          {
            id:"1",
            content:{
              text: "State 1"
            },
            x: 20,
            y: 20
          },
          {
            id:"2",
            content: {
              text: "State 2"
            },
            x: 160,
            y: 20
          }
        ],
        connections:[
          {
            from: "1",
            to: "2"
          }
        ]
      });
    </script>
