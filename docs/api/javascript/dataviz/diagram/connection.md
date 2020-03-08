---
title: Connection
res_type: api
---

# kendo.dataviz.diagram.Connection

The Connection object is a visual link or connection in the graph or diagram.
Connections are usually created by calling [connect](/api/dataviz/diagram#methods-connect) on a Diagram instance.

## Configuration

### content `Object`

Defines the options for the label displayed on the connection path.

#### Example - configuring the content

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");
      var shape1 = diagram.addShape( new Shape({x:100, y: 100}));
      var shape2 = diagram.addShape( new Shape({x:300, y: 100}));

      var connection = new kendo.dataviz.diagram.Connection(shape1, shape2, {
        content: {
          text: "Step 1",
          color: "#336699",
          fontSize: 16,
          fontStyle: "italic",
          fontWeight: "bold"
        },
        selectable: false
      });

      diagram.addConnection(connection);
    </script>


### content.color `String`

The color of the connection content text.

### content.fontFamily `String`

The font family of the connection content text.

### content.fontSize `Number`

The font size of the connection content text.

### content.fontStyle `String`

The font style of the connection content text.

### content.fontWeight `String`

The font weight of the connection content text.

### content.template `String|Function`

The [template](/api/javascript/kendo/methods/template) which renders the labels.

The fields which can be used in the template are:

* dataItem - the data item, in case a field has been specified

### content.text `String`

The static text displayed on the connection.

### content.visual `Function`

A function returning a visual element to render for the content of a connection.

#### Example - configuring the content

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");
      var shape1 = diagram.addShape( new Shape({x:100, y: 100}));
      var shape2 = diagram.addShape( new Shape({x:300, y: 100}));

      var connection = new kendo.dataviz.diagram.Connection(shape1, shape2, {
        content: {
          text: "Step 1",
          visual: function(e){
            var group = new kendo.dataviz.diagram.Group();
            group.append(new kendo.dataviz.diagram.TextBlock({ text: e.text }));
            group.rotate(-90, new kendo.dataviz.diagram.Point(10, 0));
            return group;
          }
        },
        selectable: false
      });

      diagram.addConnection(connection);
    </script>


### fromConnector `String` *(default: "Auto")*

Specifies the name of the source shape connector that should be used by default.

#### Example - configuring the fromConnector

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");
      var shape1 = diagram.addShape( new Shape({ x: 100, y: 100 }));
      var shape2 = diagram.addShape( new Shape({ x: 300, y: 180 }));

      var connection = new kendo.dataviz.diagram.Connection(shape1, shape2, {
        fromConnector: "left",
        type: "cascading",
        selectable: false
      });

      diagram.addConnection(connection);
    </script>


### fromX `Number`

The absolute point (X-coordinate), if any, that the connection is originating from.

### fromY `Number`

The absolute point (Y-coordinate), if any, that the connection is originating from.

### stroke `Object`

Defines the stroke configuration.

#### Example - configuring the stroke

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");
      var shape1 = diagram.addShape( new Shape({x:100, y: 100}));
      var shape2 = diagram.addShape( new Shape({x:300, y: 100}));

      var connection = new kendo.dataviz.diagram.Connection(shape1, shape2, {
        stroke: {
          color: "red",
          width: 2,
          dashType: "dash"
        },
        selectable: false
      });

      diagram.addConnection(connection);
    </script>


### stroke.color `String`

Defines the stroke or line color of the connection.

### stroke.dashType `String`

Specifies the stroke dash type.

The following dash types are supported:

* "dash" - A line that consists of dashes
* "dashDot" - A line that consists of a repeating pattern of dash-dot
* "dot" - A line that consists of dots
* "longDash" - A line that consists of a repeating pattern of long-dash
* "longDashDot" - A line that consists of a repeating pattern of long-dash-dot
* "longDashDotDot" - A line that consists of a repeating pattern of long-dash-dot-dot
* "solid" - A solid line

### stroke.width `Number`

Defines the stroke width of the connection.

### hover `Object`

Defines the hover configuration.

### hover.stroke `Object`

Defines the hover stroke configuration.

### hover.stroke.color `String`

Defines the highlight color when the pointer is hovering over the connection.

#### Example - configuring the hover

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");
      var shape1 = diagram.addShape( new Shape({x:100, y: 100}));
      var shape2 = diagram.addShape( new Shape({x:300, y: 100}));

      var connection = new kendo.dataviz.diagram.Connection(shape1, shape2, {
        hover: {
          stroke: {
            color: "red"
          }
        },
        stroke: {
          color: "green",
          width: 2
        },
        selectable: false
      });

      diagram.addConnection(connection);
    </script>


### startCap `String|Object`

The connection start cap configuration or type name.

#### Example - configuring the startCap

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
        },
        selectable: false
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

#### Example - configuring the endCap

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
        },
        selectable: false
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

#### Example - configuring the points

    <div id="diagram"></div>
    <script>
      var Point = kendo.dataviz.diagram.Point;
      var diagram = $("#diagram").kendoDiagram({ }).getKendoDiagram();
      var connection = diagram.connect(new Point(100,100), new Point(300,100), {
        type: "polyline",
        points: [
          new Point(150,100),
          new Point(150,150),
          new Point(200,150),
          new Point(200,100)
        ],
        selectable: false
      });
    </script>


### points.x `Number`

Sets the X coordinate of the point.

#### Example - configuring the points.x

    <div id="diagram"></div>
    <script>
      var Point = kendo.dataviz.diagram.Point;
      var diagram = $("#diagram").kendoDiagram({ }).getKendoDiagram();
      var connection = diagram.connect(new Point(100,100), new Point(300,100), {
        type: "polyline",
        points: [
          { x: 150, y: 100 },
          { x: 175, y: 150 },
          { x: 200, y: 100 }
        ],
        selectable: false
      });
    </script>


### points.y `Number`

Sets the Y coordinate of the point.

### selectable `Boolean` *(default: true)*

Specifies if the connection can be selected.

#### Example - configuring the selectable

    <div id="diagram"></div>
    <script>
      var Point = kendo.dataviz.diagram.Point;
      var diagram = $("#diagram").kendoDiagram({ }).getKendoDiagram();
      var connection = diagram.connect(new Point(100,100), new Point(300,100), {
        selectable: false
      });
    </script>


### toConnector `String` *(default: "Auto")*

Specifies the name of the target shape connector that should be used by default.

#### Example - configuring the toConnector

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");
      var shape1 = diagram.addShape( new Shape({x:100, y: 250}));
      var shape2 = diagram.addShape( new Shape({x:300, y: 50}));

      var connection = new kendo.dataviz.diagram.Connection(shape1, shape2, {
        fromConnector: "top",
        toConnector: "bottom",
        type: "cascading",
        selectable: false
      });

      diagram.addConnection(connection);
    </script>


### toX `Number`

The absolute point (X-coordinate), if any, that the connection is pointing to.

### toY `Number`

The absolute point (Y-coordinate), if any, that the connection is pointing to.

### type `String`

Specifies the connection type. The supported values are `"polyline"` and `"cascading"`.

#### Example - configuring the type

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");
      var shape1 = diagram.addShape( new Shape({x:100, y: 250}));
      var shape2 = diagram.addShape( new Shape({x:300, y: 50}));

      var connection = new kendo.dataviz.diagram.Connection(shape1, shape2, {
        fromConnector: "top",
        toConnector: "bottom",
        type: "cascading",
        selectable: false
      });

      diagram.addConnection(connection);
    </script>


## Fields

### dataItem `Object`
The data item, if any, for the connection.

#### Example - configuring the dataItem

    <button id="getConnInfo">Get 1st Connection Label</button>
    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({
        dataSource: {
          data: [
            {id: 1, name:"One"},
            {id: 2, name:"Two"},
            {id: 3, name:"Four"},
          ],
          schema: {
            model: {
              id: "id"
            }
          }
        },
        connectionsDataSource:[
          {from: 1, to: 2, label: "plus one"},
          {from: 2, to: 3, label: "plus three"}
        ],
        layout: {
          type: "tree",
          subtype: "right"
        },
        shapeDefaults: {
          type: "circle",
          content: {
            template: "#= name #"
          },
          width: 70,
          height: 70,
          hover: {
            fill: "Orange"
          }
        },
        connectionDefaults: {
          stroke: {
            color: "#979797",
            width: 1
          },
          type: "polyline",
          startCap: "FilledCircle",
          endCap: "ArrowEnd",
          content:{
            template:"#= label#"
          }
        }
      });

      $("#getConnInfo").on("click", function(){
        var diagram = $("#diagram").getKendoDiagram();

        var dataItem = diagram.connections[0].dataItem;
        console.log("First connection text: " + dataItem.label);
      });
    </script>


### from `kendo.dataviz.diagram.Shape`
The shape, if any, that the connection originates from.

#### Example - configuring the from

    <button id="getShapeBtn">Get Source Shape</button>
    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");
      var shape1 = diagram.addShape( new Shape({ x: 100, y: 100 }));
      var shape2 = diagram.addShape( new Shape({ x: 300, y: 180 }));

      var connection = new kendo.dataviz.diagram.Connection(shape1, shape2, {
        fromConnector: "left",
        type: "cascading",
        selectable: false
      });

      diagram.addConnection(connection);

      $("#getShapeBtn").on("click", function(){
        console.log("Source shape id: " + diagram.connections[0].from.id);
      });
    </script>


### sourceConnector `kendo.dataviz.diagram.Connector`
The connector, if any, that the connection originates from.

#### Example - configuring the sourceConnector

    <button id="getConnectorBtn">Get Source Connector</button>
    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");
      var shape1 = diagram.addShape( new Shape({ x: 100, y: 100 }));
      var shape2 = diagram.addShape( new Shape({ x: 300, y: 180 }));

      var connection = new kendo.dataviz.diagram.Connection(shape1, shape2, {
        fromConnector: "left",
        type: "cascading",
        selectable: false
      });

      diagram.addConnection(connection);

      $("#getConnectorBtn").on("click", function(){
        var connector = diagram.connections[0].sourceConnector;
        console.log("Source connector name: " + connector.options.name);
      });
    </script>


### targetConnector `kendo.dataviz.diagram.Connector`
The connector, if any, that the connection points to.

#### Example - configuring the targetConnector

    <button id="getConnectorBtn">Get Target Connector</button>
    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");
      var shape1 = diagram.addShape( new Shape({ x: 100, y: 100 }));
      var shape2 = diagram.addShape( new Shape({ x: 300, y: 180 }));

      var connection = new kendo.dataviz.diagram.Connection(shape1, shape2, {
        fromConnector: "left",
        type: "cascading",
        selectable: false
      });

      diagram.addConnection(connection);

      $("#getConnectorBtn").on("click", function(){
        var connector = diagram.connections[0].targetConnector;
        console.log("Target connector name: " + connector.options.name);
      });
    </script>


### to `kendo.dataviz.diagram.Shape`
The shape, if any, that the connection points to.

#### Example - configuring the to

    <button id="getShapeBtn">Get Target Shape</button>
    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");
      var shape1 = diagram.addShape( new Shape({ x: 100, y: 100 }));
      var shape2 = diagram.addShape( new Shape({ x: 300, y: 180 }));

      var connection = new kendo.dataviz.diagram.Connection(shape1, shape2, {
        fromConnector: "left",
        type: "cascading",
        selectable: false
      });

      diagram.addConnection(connection);

      $("#getShapeBtn").on("click", function(){
        console.log("Target shape id: " + diagram.connections[0].to.id);
      });
    </script>


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


The following example shows how to change the source shape of a connection:

#### Example - configuring the source

    <button id="changeSourceBtn">Change Connection Source</button>
    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");
      var shape1 = diagram.addShape( new Shape({ x: 100, y: 100 }));
      var shape2 = diagram.addShape( new Shape({ x: 300, y: 180 }));
      var shape3 = diagram.addShape( new Shape({ x: 300, y: 20 }));

      var connection = new kendo.dataviz.diagram.Connection(shape1, shape2, {
        fromConnector: "left",
        type: "cascading",
        selectable: false
      });

      diagram.addConnection(connection);

      $("#changeSourceBtn").on("click", function(){
        var connection = diagram.connections[0];
        connection.source(shape3);
      });
    </script>


### sourcePoint

Gets the global coordinate of the connection's start (initial endpoint).
The method returns a Point independently of the object to which the source is attached.

#### Returns

`kendo.dataviz.diagram.Point` the coordinates of the connection source.


#### Example - configuring the sourcePoint

    <button id="getSourceBtn">Get Connection Source Point</button>
    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");
      var shape1 = diagram.addShape( new Shape({ x: 100, y: 100 }));
      var shape2 = diagram.addShape( new Shape({ x: 300, y: 180 }));

      var connection = new kendo.dataviz.diagram.Connection(shape1, shape2, {
        fromConnector: "left",
        type: "cascading",
        selectable: false
      });

      diagram.addConnection(connection);

      $("#getSourceBtn").on("click", function(){
        var connection = diagram.connections[0];
        var point = connection.sourcePoint();
        console.log("Connection source point: x = " + point.x + "; y = " + point.y);
      });
    </script>


### target

Gets or set the target of the Connection.

This object can be a Point for a floating endpoint (i.e. not attached to a shape), a Shape or a Connector of a Shape. You can use the Shape.getConnector() method to fetch a Connector on the basis of its name. If a Shape is specified the Connection will attach to the "Auto" connector.

#### Parameters

##### target `kendo.dataviz.diagram.Shape|kendo.dataviz.diagram.Point|kendo.dataviz.diagram.Connector`

* Point: any Point on the canvas. This creates an unattached floating endpoint.
* Shape: will bind the endpoint to the"Auto" Connector which will switch between the other connectors to minimize the length of the connection.
* Connector: the connection's endpoint will remain fixed attached to the specified Connector.

If no source is specified the method will return the current object to which the Connection's endpoint is attached.

#### Example - configuring the target

    <button id="changeTargetBtn">Change Connection Target</button>
    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");
      var shape1 = diagram.addShape( new Shape({ x: 120, y: 180 }));
      var shape2 = diagram.addShape( new Shape({ x: 120, y: 30 }));
      var shape3 = diagram.addShape( new Shape({ x: 120, y: 330 }));

      var connection = new kendo.dataviz.diagram.Connection(shape1, shape2, {
        type: "cascading",
        selectable: false
      });

      diagram.addConnection(connection);

      $("#changeTargetBtn").on("click", function(){
        var connection = diagram.connections[0];
        connection.target(shape3.getConnector("right"));
      });
    </script>


#### Returns

`Object` the connection target.

### targetPoint

Similar to the sourcePoint, this gets the coordinates of the target of the Connection independently of its endpoint attachment.

#### Returns

`kendo.dataviz.diagram.Point` the coordinates of the connection target.

#### Example - configuring the targetPoint

    <button id="getTargetBtn">Get Connection Target Point</button>
    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");
      var shape1 = diagram.addShape( new Shape({ x: 100, y: 100 }));
      var shape2 = diagram.addShape( new Shape({ x: 300, y: 180 }));

      var connection = new kendo.dataviz.diagram.Connection(shape1, shape2, {
        fromConnector: "left",
        type: "cascading",
        selectable: false
      });

      diagram.addConnection(connection);

      $("#getTargetBtn").on("click", function(){
        var connection = diagram.connections[0];
        var point = connection.targetPoint();
        console.log("Connection target point: x = " + point.x + "; y = " + point.y);
      });
    </script>


### select

Select or deselects the Connection.

#### Parameters

##### value `Boolean` *(default: true)*

True to select the Connection and `false` to deselect it.

#### Example - configuring the select

    <button id="selectBtn">Select Connection</button>
    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");
      var shape1 = diagram.addShape( new Shape({ x: 100, y: 100 }));
      var shape2 = diagram.addShape( new Shape({ x: 300, y: 100 }));

      var connection = new kendo.dataviz.diagram.Connection(shape1, shape2, {
        type: "cascading",
        selection: {
          handles: {
            width: 8,
            height: 8,
            fill: {
              color: "green"
            }
          }
        },
        editable: false
      });

      diagram.addConnection(connection);

      $("#selectBtn").on("click", function(){
        var connection = diagram.connections[0];
        connection.select(true);
      });
    </script>


### type

Gets or sets the (sub-) type of the Connection which defines the way it routes.

The routing of a connection is the way that intermediate points of a Connection defines a route. A route is usually defined on the basis of constraints or behaviors. Currently the framework defines a default polyline route (which simply connects the given intermediate points) and a simple rectangular (aka cascading) route. The cascading type is useful when using tree layout and hierarchies; the routed Connection will in this case enhance the representation of the hierarchy and thus reproduce a classic organization diagram.

#### Parameters

##### value `String` *(default: "Polyline")*

* "polyline" - connects the defined intermediate points. See the points() method.
* "cascading" - discards given points and defines a cascading path between the endpoints.

#### Example - configuring the type

    <button id="changeTypeBtn">Change Connection Type</button>
    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");
      var shape1 = diagram.addShape( new Shape({ x: 100, y: 100 }));
      var shape2 = diagram.addShape( new Shape({ x: 300, y: 180 }));

      var connection = new kendo.dataviz.diagram.Connection(shape1, shape2, {
        selectable: false
      });

      diagram.addConnection(connection);

      $("#changeTypeBtn").on("click", function(){
        var connection = diagram.connections[0];
        connection.type("cascading");
      });
    </script>


### points

Gets the intermediate points of the connection.

#### Example - configuring the points

    <button id="getPointsBtn">Get Connection Points</button>
    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");
      var shape1 = diagram.addShape( new Shape({ x: 20, y: 180 }));
      var shape2 = diagram.addShape( new Shape({ x: 300, y: 180 }));

      var connection = new kendo.dataviz.diagram.Connection(shape1, shape2, {
        type: "polyline",
        points: [
          { x: 150, y: 100 },
          { x: 175, y: 150 },
          { x: 200, y: 100 }
        ],
        selectable: false
      });

      diagram.addConnection(connection);

      $("#getPointsBtn").on("click", function(){
        var connection = diagram.connections[0];
        console.log(connection.points());
      });
    </script>


#### Returns

`Array` the intermediate points of the connection.

### allPoints

Gets all points of the Connection.
This is the union of the endpoints and the intermediate points.

#### Returns

`Array` all points of the connection.

#### Example - using allPoints

    <button id="getPointsBtn">Get Connection Points</button>
    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");
      var shape1 = diagram.addShape( new Shape({ x: 20, y: 180 }));
      var shape2 = diagram.addShape( new Shape({ x: 300, y: 180 }));

      var connection = new kendo.dataviz.diagram.Connection(shape1, shape2, {
        type: "polyline",
        points: [
          { x: 150, y: 100 },
          { x: 175, y: 150 },
          { x: 200, y: 100 }
        ],
        selectable: false
      });

      diagram.addConnection(connection);

      $("#getPointsBtn").on("click", function(){
        var connection = diagram.connections[0];
        console.log(connection.points());
      });
    </script>


### redraw

Redraws the Connection with the given options.

#### Parameters

##### options `Object` *optional*
The new options for the connection. This object should follow the configuration structure.

#### Example - using redraw

    <button id="redrawBtn">Redraw Connection</button>
    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");
      var shape1 = diagram.addShape( new Shape({ x: 20, y: 100 }));
      var shape2 = diagram.addShape( new Shape({ x: 300, y: 100 }));

      var connection = new kendo.dataviz.diagram.Connection(shape1, shape2, {
        selectable: false
      });

      diagram.addConnection(connection);

      $("#redrawBtn").on("click", function(){
        var connection = diagram.connections[0];
        connection.redraw({
          stroke: {
            color: "orange",
            width: 3
          },
          content: {
            text: "Step 1"
          }
        });
      });
    </script>


### visible

Gets or sets the connection visible state.

#### Parameters

##### visible `Boolean` *optional*
Indicates whether the connection should be visible in the Diagram. If skipped, the method will return the current visible state of the connection.

#### Example - using visible

    <button id="hideBtn">Hide Connection</button>
    <div id="diagram"></div>
    <script>
      $("#hideBtn").on("click", function(e){
        var diagram = $("#diagram").getKendoDiagram();
        var connection = diagram.connections[0];
        connection.visible(false);
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
