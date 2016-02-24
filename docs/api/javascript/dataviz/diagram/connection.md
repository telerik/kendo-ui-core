---
title: Connection
---

# kendo.dataviz.diagram.Connection

The Connection object is a visual link or connection in the graph or diagram.
Connections are usually created by calling [connect](/api/dataviz/diagram#methods-connect) on a Diagram instance.

## Configuration

### content `Object`

Defines the label displayed on the connection path.

### content.template `String|Function`

The [template](/api/javascript/kendo#methods-template) which renders the labels.

The fields which can be used in the template are:

* dataItem - the data item, in case a field has been specified

### content.text `String`

The static text displayed on the connection.

### content.visual `Function`

A function returning a visual element to render for the content of a connection.

### fromConnector `String` *(default: "Auto")*

Specifies the name of the source shape connector that should be used by default.

### fromX `Number`

The absolute point (X-coordinate), if any, that the connection is originating from.

### fromY `Number`

The absolute point (Y-coordinate), if any, that the connection is originating from.

### stroke `Object`

Defines the stroke configuration.

### stroke.color `String`

Defines the stroke or line color of the connection.

#### Example - setting the stroke of a Connection

    <div id="diagram"></div>
    <script>
        var Point = kendo.dataviz.diagram.Point;
        var diagram = $("#diagram").kendoDiagram({ }).getKendoDiagram();
        var shapeA = diagram.addShape(new Point(100, 100));
        var shapeB = diagram.addShape(new Point(400, 100));
        var connection = diagram.connect(shapeA, shapeB, { stroke: { color: "red" } });
    </script>

### hover `Object`

Defines the hover configuration.

### hover.stroke `Object`

Defines the hover stroke configuration.

### hover.stroke.color `String`

Defines the highlight color when the pointer is hovering over the connection.

#### Example setting color and hovering color of the connection

    <div id="diagram"></div>
    <script>
        var Point = kendo.dataviz.diagram.Point;
        var diagram = $("#diagram").kendoDiagram({ }).getKendoDiagram();
        var shapeA = diagram.addShape(new Point(100, 100));
        var shapeB = diagram.addShape(new Point(400, 100));
        var connection = diagram.connect(shapeA, shapeB, {
            stroke: { color: "red" },
            hover: {
                stroke: {
                    color: "blue"
                }
            }
        });
    </script>

### startCap `String|Object`

The connection start cap configuration or type name.

#### Example - configuring the connection start cap

    <div id="diagram"></div>
    <script>
      var Point = kendo.dataviz.diagram.Point;
      var diagram = $("#diagram").kendoDiagram({ }).getKendoDiagram();
      var connection = diagram.connect(new Point(100,100), new Point(300,100), {
        startCap: {
          type: "FilledCircle",
          fill: {
            color: "red"
          },
          stroke: {
            color: "blue",
            width: 2
          }
        }
      });
    </script>

### startCap.fill `String|Object`

The connection start cap fill options or color.

### startCap.fill.color `String` *(default: "black")*

The connection start cap fill color.

### startCap.fill.opacity

The connection start cap fill opacity.

### startCap.stroke `String|Object`

The connection start cap stroke options or color.

### startCap.stroke.color `String`

The connection start cap stroke color.

### startCap.stroke.dashType `String`

The connection start cap stroke dash type.

### startCap.stroke.width `Number`

The connection start cap stroke width.

### startCap.type `String` *(default: "none")*

The connection start cap type.

The supported values are:

* "none": no cap
* "ArrowStart": a filled arrow
* "FilledCircle": a filled circle

### endCap `String|Object`

The connection end cap configuration or type name.

#### Example - configuring the connection end cap

    <div id="diagram"></div>
    <script>
      var Point = kendo.dataviz.diagram.Point;
      var diagram = $("#diagram").kendoDiagram({ }).getKendoDiagram();
      var connection = diagram.connect(new Point(100,100), new Point(300,100), {
        endCap: {
          type: "ArrowEnd",
          fill: {
            color: "red"
          },
          stroke: {
            color: "blue",
            width: 2
          }
        }
      });
    </script>

### endCap.fill `String|Object`

The connection end cap fill options or color.

### endCap.fill.color `String` *(default: "black")*

The connection end cap fill color.

### endCap.fill.opacity

The connection end cap fill opacity.

### endCap.stroke `String|Object`

The connection end cap stroke options or color.

### endCap.stroke.color `String`

The connection end cap stroke color.

### endCap.stroke.dashType `String`

The connection end cap stroke dash type.

### endCap.stroke.width `Number`

The connection end cap stroke width.

### endCap.type `String` *(default: "none")*

The connection end cap type.

The supported values are:

* "none": no cap
* "ArrowEnd": a filled arrow
* "FilledCircle": a filled circle

### points `Array`

Sets the intermediate points (in global coordinates) of the connection.

#### Example - setting intermediate connection points

![Intermediate connection points.](/api/dataviz/diagram/connectionpoints.png)

    <div id="diagram"></div>
    <script>
        var Point = kendo.dataviz.diagram.Point;
        var diagram = $("#diagram").kendoDiagram({ }).getKendoDiagram();
        var connection = diagram.connect(new Point(100,100), new Point(300,100), {
            points: [
                new Point(150,100),
                new Point(150,150),
                new Point(200,150),
                new Point(200,100)
            ]
        });
    </script>

### points.x `Number`

Sets the X coordinate of the point.

### points.y `Number`

Sets the Y coordinate of the point.

### selectable `Boolean` *(default: true)*

Specifies if the connection can be selected.

### toConnector `String` *(default: "Auto")*

Specifies the name of the target shape connector that should be used by default.

### toX `Number`

The absolute point (X-coordinate), if any, that the connection is pointing to.

### toY `Number`

The absolute point (Y-coordinate), if any, that the connection is pointing to.

### type `String`

Specifies the connection type. The supported values are `"polyline"` and `"cascading"`.

## Fields

### dataItem `Object`
The data item, if any, for the connection.

### from `kendo.dataviz.diagram.Shape`
The shape, if any, that the connection originates from.

### sourceConnector `kendo.dataviz.diagram.Connector`
The connector, if any, that the connection originates from.

### targetConnector `kendo.dataviz.diagram.Connector`
The connector, if any, that the connection points to.

### to `kendo.dataviz.diagram.Shape`
The shape, if any, that the connection points to.

## Methods

### source

Gets or sets the current source of the connection.

This object can be a Point for a floating endpoint (i.e. not attached to a shape), a Shape or a Connector of a Shape. You can use the Shape.getConnector() method to fetch a Connector on the basis of its name. If a Shape is specified the Connection will attach to the "Auto" connector.

#### Parameters

##### source `kendo.dataviz.diagram.Shape|kendo.dataviz.diagram.Point|kendo.dataviz.diagram.Connector`

* Point: any Point on the canvas. This creates an unattached floating endpoint.
* Shape: will bind the endpoint to the"Auto" Connector which will switch between the other connectors to minimize the length of the connection.
* Connector: the connection's endpoint will remain fixed attached to the specified Connector.

If no source is specified the method will return the current object to which the Connection's endpoint is attached.

#### Returns

`Object` the connection source.

### sourcePoint

Gets the global coordinate of the connection's start (initial endpoint).
The method returns a Point independently of the object to which the source is attached.

#### Returns

`kendo.dataviz.diagram.Point` the coordinates of the connection source.

### target

Gets or set the target of the Connection.

This object can be a Point for a floating endpoint (i.e. not attached to a shape), a Shape or a Connector of a Shape. You can use the Shape.getConnector() method to fetch a Connector on the basis of its name. If a Shape is specified the Connection will attach to the "Auto" connector.

#### Parameters

##### target `kendo.dataviz.diagram.Shape|kendo.dataviz.diagram.Point|kendo.dataviz.diagram.Connector`

* Point: any Point on the canvas. This creates an unattached floating endpoint.
* Shape: will bind the endpoint to the"Auto" Connector which will switch between the other connectors to minimize the length of the connection.
* Connector: the connection's endpoint will remain fixed attached to the specified Connector.

If no source is specified the method will return the current object to which the Connection's endpoint is attached.

#### Returns

`Object` the connection target.

### targetPoint

Similar to the sourcePoint, this gets the coordinates of the target of the Connection independently of its endpoint attachement.

#### Returns

`kendo.dataviz.diagram.Point` the coordinates of the connection target.

### select

Select or deselects the Connection.

#### Parameters

##### value `Boolean` *(default: true)*

True to select the Connection and `false` to deselect it.

### type

Gets or sets the (sub-) type of the Connection which defines the way it routes.

The routing of a connection is the way that intermediate points of a Connection defines a route. A route is usually defined on the basis of constraints or behaviors. Currently the framework defines a default polyline route (which simply connects the given intermediate points) and a simple rectangular (aka cascading) route. The cascading type is useful when using tree layout and hierarchies; the routed Connection will in this case enhance the representation of the hierarchy and thus reproduce a classic organization diagram.

#### Parameters

##### value `String` *(default: "Polyline")*

* "Polyline" - connects the defined intermediate points. See the points() method.
* "Cascading" - discards given points and defines a cascading path between the endpoints.

### points

Gets the intermediate points of the connection.

#### Returns

`Array` the intermediate points of the connection.

### allPoints

Gets all points of the Connection.
This is the union of the endpoints and the intermediate points.

#### Returns

`Array` all points of the connection.

### redraw

Redraws the Connection with the given options.

#### Parameters

##### options `Object` *optional*
The new options for the connection. This object should follow the configuration structure.


##### Example - changing the Connection after it has been added

    <div id="diagram"></div>
    <script>
        var Point = kendo.dataviz.diagram.Point;
        var diagram = $("#diagram").kendoDiagram({ }).getKendoDiagram();
        var connection = diagram.connect(new Point(10,10), new Point(200,70));

        connection.redraw({
            stroke: {
                color: "orange"
            },
            points:[new Point(200,10)]
        });
    </script>

