---
title: Diagram
page_title: API Reference for methods, objects and properties in the math module of Kendo diagram
description: Examples and detailed explanation of Kendo UI methods and properties.
---

# kendo.dataviz.ui.Diagram

## Configuration

### autoBind `Boolean` *(default: true)*

If set to `false` the widget will not bind to the data source during initialization. In this case data binding will occur when the [change](/api/javascript/data/datasource#events-change) event of the
data source is fired. By default the widget will bind to the data source specified in the configuration.

> Setting `autoBind` to `false` is useful when multiple widgets are bound to the same data source. Disabling automatic binding ensures that the shared data source doesn't make more than one request to the remote service.

#### Example - disable automatic binding

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        dataSource: [{
           "name": "Telerik",
           "items": [
               {"name": "Kendo"},
               {"name": "Icenium"}
           ]
        }],
        template: "#= item.name #",
        autoBind: false
    });

    // Fetching data will trigger "change" on the dataSource
    $("#diagram").getKendoDiagram().dataSource.fetch();
    </script>

### connectionDefaults `Object`

Defines the defaults of the connections. Whenever a connection is created, the specified connectionDefaults will be used and merged with the (optional) configuration passed through the connection creation method.

#### Example - typical connectionDefaults

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
       shapes:[
           {
               id:"1",
               content:{
                   text: "Monday"
               }
           },
           {
               id:"2",
               content:"Tuesday"
           }
       ],
       connections:[
           {
               from: new Point(100,100),
               to: new Point(100,300)
           },
           {
               from: "1",
               to: "2"
           }
       ],
       connectionDefaults: {
           stroke: {
               color: "#979797",
               width: 1
           },
           type:"polyline",
           startCap: "FilledCircle",
           endCap: "ArrowEnd"
       }
    });
    </script>

### connectionDefaults.content `Object`

Defines the label displayed on the connection path.

### connectionDefaults.content.template `String|Function`

The [template](/api/javascript/kendo#methods-template) which renders the labels.

The fields which can be used in the template are:

* dataItem - the data item, in case a field has been specified

### connectionDefaults.content.text `String`

The static text displayed on the connection.

### connectionDefaults.content.visual `Function`

A function returning a visual element to render for the content of a connection.

#### Example - Connection content visual
```html
    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({
        dataSource: [{
          "name" : "Telerik",
          "items": [
            {"name": "Kendo"},
            {"name": "Icenium"}
          ]
        }],
        connectionDefaults: {
          content: {
            visual: function(e) {
              var g = new kendo.dataviz.diagram.Group({
                autoSize: true
              });
              var text = new kendo.dataviz.diagram.TextBlock({
                text: "Foo",
                fontSize: 16,
                x: 10,
                y: 5
              });

              g.append(text);
              return g;
            }
          }
        },
        layout: {
          type: "tree"
        }
      });
    </script>
```

### connectionDefaults.editable `Boolean|Object` *(default: true)*

Defines the editing behavior of the connections.

### connectionDefaults.editable.drag `Boolean` *(default: true)*

Specifies if the connections can be dragged.

### connectionDefaults.editable.remove `Boolean` *(default: true)*

Specifies if the connections can be removed.

### connectionDefaults.editable.tools `Array`

Specifies the the toolbar tools. Predefined tools are:

* "edit" - Selected item can be edit.
* "delete" - Selected items can be deleted.

### connectionDefaults.editable.tools.name `String`

The name of the tool. The built-in tools are "edit" and "delete".

### connectionDefaults.endCap `String|Object`

The connection end cap configuration or type name.

#### Example - configuring the connection end cap

    <div id="diagram"></div>
    <script>
      var Point = kendo.dataviz.diagram.Point;
      var diagram = $("#diagram").kendoDiagram({
        connectionDefaults: {
          endCap: {
            type: "FilledCircle",
            fill: {
              color: "red"
            },
            stroke: {
              color: "blue",
              width: 2
            }
          }
        }
      }).getKendoDiagram();
      diagram.connect(new Point(100,100), new Point(300,100));
    </script>

### connectionDefaults.endCap.fill `String|Object`

The connection end cap fill options or color.

### connectionDefaults.endCap.fill.color `String` *(default: "black")*

The connection end cap fill color.

### connectionDefaults.endCap.fill.opacity

The connection end cap fill opacity.

### connectionDefaults.endCap.stroke `String|Object`

The connection end cap stroke options or color.

### connectionDefaults.endCap.stroke.color `String`

The connection end cap stroke color.

### connectionDefaults.endCap.stroke.dashType `String`

The connection end cap stroke dash type.

### connectionDefaults.endCap.stroke.width `Number`

The connection end cap stroke width.

### connectionDefaults.endCap.type `String` *(default: "none")*

The connection end cap type.

The supported values are:

* "none": no cap
* "ArrowEnd": a filled arrow
* "FilledCircle": a filled circle

### connectionDefaults.fromConnector `String` *(default: "Auto")*

Specifies the name of the source shape connector that should be used by default.

### connectionDefaults.hover `Object`

Defines the hover configuration.

### connectionDefaults.hover.stroke `Object`

Defines the hover configuration.

### connectionDefaults.hover.stroke.color `String` *(default: "#70CAFF")*

Defines the highlight color when the pointer is hovering over the connection.

#### Example - turning the connection red on hover

     connectionDefaults: {
                hover: {
                    stroke: {color: "red"}
                },
                stroke: {
                    color: "#979797",
                    width: 4
                },
                type: "polyline",
                startCap: "FilledCircle",
                endCap: "ArrowEnd"
            }

### connectionDefaults.selectable `Boolean` *(default: true)*

Specifies if the connection can be selected.

### connectionDefaults.selection `Object`

Defines the connection selection configuration.

##### Example - Styling the connection selection

     connectionDefaults: {
                hover: {
                    stroke: {color: "red"}
                },
                stroke: {
                    color: "#979797",
                    width: 4
                },
                type: "polyline",
                startCap: "FilledCircle",
                endCap: "ArrowEnd",
                selection: {
                    handles: {
                        fill: {color: "Yellow"},
                        stroke: {color: "White"}
                    }
                }
            }

### connectionDefaults.selection.handles `Object`

Defines the connection selection handles configuration.

### connectionDefaults.selection.handles.fill `String|Object`

Defines the handles fill options.

### connectionDefaults.selection.handles.fill.color `String`

Defines the handles fill color.

### connectionDefaults.selection.handles.stroke `Object`

Defines the handles stroke options.

### connectionDefaults.selection.handles.stroke.color `String`

Defines the handles stroke color.

### connectionDefaults.selection.handles.width `Number`

The width of the handle elements.

### connectionDefaults.selection.handles.height `Number`

The height of the handle elements.

### connectionDefaults.startCap `String|Object`

The connection start cap configuration or type name.

#### Example - configuring the connection start cap

    <div id="diagram"></div>
    <script>
      var Point = kendo.dataviz.diagram.Point;
      var diagram = $("#diagram").kendoDiagram({
        connectionDefaults: {
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
        }
      }).getKendoDiagram();
      diagram.connect(new Point(100,100), new Point(300,100));
    </script>

### connectionDefaults.startCap.fill `String|Object`

The connection start cap fill options or color.

### connectionDefaults.startCap.fill.color `String` *(default: "black")*

The connection start cap fill color.

### connectionDefaults.startCap.fill.opacity

The connection start cap fill opacity.

### connectionDefaults.startCap.stroke `String|Object`

The connection start cap stroke options or color.

### connectionDefaults.startCap.stroke.color `String`

The connection start cap stroke color.

### connectionDefaults.startCap.stroke.dashType `String`

The connection start cap stroke dash type.

### connectionDefaults.startCap.stroke.width `Number`

The connection start cap stroke width.

### connectionDefaults.startCap.type `String` *(default: "none")*

The connection start cap type.

The supported values are:

* "none": no cap
* "ArrowStart": a filled arrow
* "FilledCircle": a filled circle

### connectionDefaults.stroke `Object`

Defines the stroke configuration.

### connectionDefaults.stroke.color `String`

Defines the stroke or line color of the connection.

### connectionDefaults.stroke.width `Number`

Defines the stroke width of the connection.

### connectionDefaults.toConnector `String` *(default: "Auto")*

Specifies the name of the target shape connector that should be used by default.

### connectionDefaults.type `String` *(default: "cascading")*

Specifies the connections type. The supported values are `"polyline"` and `"cascading"`.

### connections `Array`

Defines the connections configuration.

### connections.content `Object`

Defines the shapes content settings.

### connections.content.template `String|Function`

The [template](/api/javascript/kendo#methods-template) which renders the labels.

The fields which can be used in the template are:

* dataItem - the data item, in case a field has been specified

### connections.content.text `String`

The text displayed for the connection.

### connections.content.visual `Function`

A function returning a visual element to render for the content of the connection.

### connections.editable `Boolean|Object` *(default: true)*

Defines the shape editable options.

### connections.editable.tools `Array`

Specifies the the toolbar tools. Predefined tools are:

* "edit" - Selected item can be edit.
* "delete" - Selected items can be deleted.

### connections.editable.tools.name `String`

The name of the tool. The built-in tools are "edit" and "delete".

### connections.endCap `String|Object`

The connection end cap configuration or type name.

#### Example - configuring the connection end cap

    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({
        shapes: [{
          id: "1",
          content: {
            text: "Monday"
          }
        }, {
          id: "2",
          x: 200,
          content: "Tuesday"
        }],
        connections: [{
          from: "1",
          to: "2",
          endCap: {
            type: "FilledCircle",
            fill: {
              color: "red"
            },
            stroke: {
              color: "blue",
              width: 2
            }
          }
        }]
      });
    </script>

### connections.endCap.fill `String|Object`

The connection end cap fill options or color.

### connections.endCap.fill.color `String` *(default: "black")*

The connection end cap fill color.

### connections.endCap.fill.opacity

The connection end cap fill opacity.

### connections.endCap.stroke `String|Object`

The connection end cap stroke options or color.

### connections.endCap.stroke.color `String`

The connection end cap stroke color.

### connections.endCap.stroke.dashType `String`

The connection end cap stroke dash type.

### connections.endCap.stroke.width `Number`

The connection end cap stroke width.

### connections.endCap.type `String` *(default: "none")*

The connection end cap type.

The supported values are:

* "none": no cap
* "ArrowEnd": a filled arrow
* "FilledCircle": a filled circle

Note that you can also use the "ArrowStart" for the endCap but its direction will be inversed.

### connections.from `Object|String|Number`

Defines the source of the connection.

### connections.from.x `Number`

Defines the x-coordinate of the connection source.

### connections.from.y `Number`

Defines the y-coordinate of the connection source.

### connections.fromConnector `String` *(default: "Auto")*

Specifies the name of the source shape connector that should be used by default.

### connections.hover `Object`

Defines the hover configuration.

### connections.hover.stroke `Object`

Defines the hover stroke configuration.

### connections.hover.stroke.color `String` *(default: "#70CAFF")*

Defines the highlight color when the pointer is hovering over the connection.

### connections.points `Array`

Sets the intermediate points (in global coordinates) of the connection. It's important to note that currently these points cannot be manipulated in the interface.


#### Example - setting intermediate connection points

![Intermediate connection points.](/api/javascript/dataviz/diagram/connection_points.png)

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "1",
            content: {
                text: "Monday"
            }
        }, {
            id: "2",
            content: "Tuesday"
        }],
        connections: [{
            from: "1",
            to: "2",
            points:[new kendo.dataviz.diagram.Point(100,55)]
        }]
    });
    </script>

### connections.points.x `Number`

Sets the X coordinate of the intermediate point.

### connections.points.y `Number`

Sets the Y coordinate of the intermediate point.

### connections.selection `Object`

Defines the connection selection configuration.

### connections.selection.handles `Object`

Defines the connection selection handles configuration.

### connections.selection.handles.fill `String|Object`

Defines the handles fill options.

### connections.selection.handles.fill.color `String`

Defines the handles fill color.

### connections.selection.handles.stroke `Object`

Defines the handles stroke options.

### connections.selection.handles.stroke.color `String`

Defines the handles stroke color.

### connections.selection.handles.width `Number`

The width of the handle elements.

### connections.selection.handles.height `Number`

The height of the handle elements.

### connections.startCap `String|Object`

The connection start cap configuration or type name.

#### Example - configuring the connection start cap

    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({
        shapes: [{
          id: "1",
          content: {
            text: "Monday"
          }
        }, {
          id: "2",
          x: 200,
          content: "Tuesday"
        }],
        connections: [{
          from: "1",
          to: "2",
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
        }]
      });
    </script>

### connections.startCap.fill `String|Object`

The connection start cap fill options or color.

### connections.startCap.fill.color `String` *(default: "black")*

The connection start cap fill color.

### connections.startCap.fill.opacity

The connection start cap fill opacity.

### connections.startCap.stroke `String|Object`

The connection start cap stroke options or color.

### connections.startCap.stroke.color `String`

The connection start cap stroke color.

### connections.startCap.stroke.dashType `String`

The connection start cap stroke dash type.

### connections.startCap.stroke.width `Number`

The connection start cap stroke width.

### connections.startCap.type `String` *(default: "none")*

The connection start cap type.

The supported values are:

* "none": no cap
* "ArrowStart": a filled arrow
* "FilledCircle": a filled circle

### connections.stroke `Object`

Defines the stroke configuration.

### connections.stroke.color `String`

Defines the stroke or line color of the connection.

### connections.stroke.width `Number`

Defines the stroke width of the connection.

### connections.to `Object|String|Number`

Defines the connection to.

### connections.to.x `Number`

Defines the point x value.

### connections.to.y `Number`

Defines the point y value.

### connections.toConnector `String` *(default: "Auto")*

Specifies the name of the target shape connector that should be used by default.

### connections.type `String`

Specifies the connection type. The supported values are `"polyline"` and `"cascading"`.

### connectionsDataSource `Object|Array|kendo.data.DataSource`

Defines the data source of the connections.

#### Example - settings the connectionsDataSource and dynamic labelling

Note that the 'from' and 'to' fields in the connectionsDataSource refer to the 'id' of the dataSource. The label on the connection is set via the [connectionsDefaults.content.template](#configuration-connectionDefaults.content.template).

    <div id="diagram"></div>
    <script>
     $("#diagram").kendoDiagram({
            dataSource: [
                {id:"one", name:"One"},
                {id:"two", name:"Two"},
                {id:"five", name:"Five"},
            ],
            connectionsDataSource:[
                {from:"one", to:"two", label: "plus one"},
                {from:"one", to:"five", label: "plus three"}
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
            },

            autoBind: true
        });
    </script>

### dataSource `Object|Array|kendo.data.DataSource`

Defines the data source of the diagram.

#### Example - defining a tree-diagram via the dataSource

Note that the HierarchicalDataSource needs to be used to define a hierarchy.
See also the connectionsDataSource example for other ways to define a diagram through a data source.

    <div id="diagram"></div>
    <script>
     var dataSource = new kendo.data.HierarchicalDataSource({
        data: [{
            "name": "Telerik",
            "items": [
                {"name": "Kendo",
                    "items":[
                        {"name": "Tree"},
                        {"name": "Chart"}
                    ]
                },
                {"name": "Icenium"}
            ]
        }],
        schema: {
            model: {
                children: "items"
            }
        }
    });
    $("#diagram").kendoDiagram({
        dataSource:dataSource,
        layout: {
            type: "tree",
            subtype: "radial"
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
            endCap: "ArrowEnd"
        },

        autoBind: true
    });
    </script>

### editable `Boolean|Object` *(default: true)*

Defines how the diagram behaves when the user attempts to edit shape content, create new connections, edit connection labels and so on.

### editable.connectionTemplate `String|Function`

Specifies the connection editor template which shows up when editing the connection via a pop-up editor much like 'editable.template' configuration of the Kendo UI Grid widget.

#### Example - setting the connectionTemplate

Assuming that the diagram is data bound and that the connection data contains properties 'meaning' and 'domain'.
These can be edited by setting a Kendo template and a diagram configuration as follows.

     <script id="popup-editor" type="text/x-kendo-template">
        <h3>Edit Connection Data</h3>
        <p>
            <label>Semantic meaning:<input name="meaning" /></label>
        </p>
        <p>
            <label>Domain: <input data-role="domain" name="domain" /></label>
        </p>
    </script>

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        readOnly: false,
        dataSource: shapesDataSource,
        connectionsDataSource: connectionsDataSource,
        editable: {
            tools: ["edit"],
            connectionTemplate: kendo.template($("#popup-editor").html())
        },
        connectionDefaults: {
           editable: {
                tools: ["edit"]
            }
        },
        dataBound: onDataBound
    });
    </script>

See also the Kendo data-bound sample for a similar example.

### editable.drag `Boolean|Object` *(default: true)*

Specifies if the shapes and connections can be dragged.

### editable.drag.snap `Boolean|Object` *(default: true)*

Specifies the shapes drag snap options.

### editable.drag.snap.size `Number` *(default: 10)*

Specifies the shapes drag snap size.

### editable.remove `Boolean` *(default: true)*

Specifies if the shapes and connections can be removed.

### editable.resize `Boolean|Object` *(default: true)*

Defines the look-and-feel of the resizing handles.

#### Example - styling the resizing handles

The 'editable.resize' configuration below collects pretty much all of the available parameters.

    <div id="diagram"></div>
    <script>
     $("#diagram").kendoDiagram({
        shapes: [{
            id: "1",
            content: {
                text: "Monday"
            }
        }, {
            id: "2",
            content: "Tuesday"
        }],
        connections: [{
            from: "1",
            to: "2"
        }],
        editable: {
            resize: {
                handles: {
                    fill: {
                        color: "red",
                        opacity: 0.5
                    },
                    height: 10,
                    width: 10,
                    stroke: {
                        color:"blue",
                        width:1,
                        dashType:"dot"
                    },
                    hover: {
                        fill: {
                            color:"green",
                            opcaity:.8
                        },
                        stroke: {
                            color:"purple",
                            width:5
                        }
                    }
                }
            }
        }
    });
    </script>

### editable.resize.handles `Object`

Specifies the settings of the resizing handles. See the [editable.resize](#configuration-editable.resize) configuration for an example.

### editable.resize.handles.fill `String|Object`

Specifies the fill settings of the resizing handles. See the [editable.resize](#configuration-editable.resize) configuration for an example.


### editable.resize.handles.fill.color `String`

Specifies the fill color of the resizing handles. See the [editable.resize](#configuration-editable.resize) configuration for an example.


### editable.resize.handles.fill.opacity `Number` *(default: 1)*

Specifies the fill opacity of the resizing handles. See the [editable.resize](#configuration-editable.resize) configuration for an example.


### editable.resize.handles.height `Number`

Specifies the height of the resizing handles. See the [editable.resize](#configuration-editable.resize) configuration for an example.


### editable.resize.handles.hover `Object`

Specifies the settings of the resizing handles on hovering over them. See the [editable.resize](#configuration-editable.resize) configuration for an example.


### editable.resize.handles.hover.fill `String|Object`

Specifies the fill settings on hovering over the resizing handles. See the [editable.resize](#configuration-editable.resize) configuration for an example.


### editable.resize.handles.hover.fill.color `String`

Specifies the fill color on hovering over the resizing handles. See the [editable.resize](#configuration-editable.resize) configuration for an example.


### editable.resize.handles.hover.fill.opacity `Number` *(default: 1)*

Specifies the fill opacity on hovering over the resizing handles. See the [editable.resize](#configuration-editable.resize) configuration for an example.


### editable.resize.handles.hover.stroke `Object`

Specifies the stroke on hovering over the resizing handles. See the [editable.resize](#configuration-editable.resize) configuration for an example.


### editable.resize.handles.hover.stroke.color `String`

Specifies the stroke color on hovering over the resizing handles. See the [editable.resize](#configuration-editable.resize) configuration for an example.


### editable.resize.handles.hover.stroke.dashType `String`

Specifies the stroke dash type on hovering over the resizing handles. See the [editable.resize](#configuration-editable.resize) configuration for an example.


### editable.resize.handles.hover.stroke.width `Number`

Specifies the stroke color on hovering over the resizing handles. See the [editable.resize](#configuration-editable.resize) configuration for an example.


### editable.resize.handles.stroke `Object`

Specifies the stroke of the resizing handles. See the [editable.resize](#configuration-editable.resize) configuration for an example.


### editable.resize.handles.stroke.color `String`

Specifies the stroke color of the resizing handles. See the [editable.resize](#configuration-editable.resize) configuration for an example.


### editable.resize.handles.stroke.dashType `String`

Specifies the stroke dash type of the resizing handles. See the [editable.resize](#configuration-editable.resize) configuration for an example.


### editable.resize.handles.stroke.width `Number`

Specifies the stroke thickness of the resizing handles. See the [editable.resize](#configuration-editable.resize) configuration for an example.


### editable.resize.handles.width `Number`

Specifies the width of the resizing handles. See the [editable.resize](#configuration-editable.resize) configuration for an example.


### editable.rotate `Boolean|Object` *(default: true)*

Specifies whether the shapes can be rotated. Note that changing this setting after creating the diagram will have no effect.

#### Example - styling the rotation thumb

     editable:{
         rotate:{
             fill:{
                 color:"red",
                 opacity:.5
             },
             stroke:{
                 color:"blue",
                 width:2
             }
         }
     }

### editable.rotate.fill `Object`

Specifies the fill settings of the rotation thumb.

### editable.rotate.fill.color `String`

Specifies the fill color of the rotation thumb.

### editable.rotate.fill.opacity `Number` *(default: 1)*

Specifies the fill opacity of the rotation thumb.

### editable.rotate.stroke `Object`

Specifies the stroke settings of the rotation thumb.

### editable.rotate.stroke.color `String`

Specifies the stroke color of the rotation thumb.

### editable.rotate.stroke.width `Number` *(default: 1)*

Specifies the stroke thickness of the rotation thumb.

### editable.shapeTemplate `String|Function`

Specifies the shape editor template. See the 'editable.connectionTemplate' for an example.

### editable.tools `Array`

Specifies the the toolbar tools. Predefined tools are:

* "edit" - Selected item can be edit.
* "createShape" - Adds an empty shape data item and a popup window will be displayed.
* "createConnection" - Adds an empty connection data item and a popup window will be displayed.
* "undo" - Undoes the previous action.
* "redo" - Executes again the previously undone action.
* "rotateClockwise" - Selected items can be rotated clockwise. Default value for rotation is 90 degree.
* "rotateAnticlockwise" - Selected items can be rotated anticlockwise. Default value for rotation is 90 degree.

> If the toolbar or toolbar items are not visible, please make sure the Kendo stylesheets are included in the header.

### editable.tools.name `String`

The name of the tool. The built-in tools are "edit", "createShape", "createConnection", "undo", "redo", "rotateClockwise" and "rotateAnticlockwise".

### editable.tools.step `Number` *(default: 90)*

The step of the rotateClockwise and rotateAnticlockwise tools.

### layout `Object`

The layout of a diagram consists in arranging the shapes (sometimes also the connections) in some fashion in order to achieve an aesthetically pleasing experience to the user. It aims at giving a more direct insight in the information contained within the diagram and its relational structure.

On a technical level, layout consists of a multitude of algorithms and optimizations:

* analysis of the relational structure (loops, multi-edge occurrence...)
* connectedness of the diagram and the splitting into disconnected components
* crossings of connections
* bends and length of links

and various ad-hoc calculations which depend on the type of layout. The criteria on which an algorithm is based vary but the common denominator is:

* a clean separation of connected components (subgraphs)
* an orderly organization of the shapes in such a way that siblings are close to another, i.e. a tight packing of shapes which belong together (parent of child relationship)
* a minimum of connection crossings

Kendo diagram includes three of the most used layout algorithms which should cover most of your layout needs - **tree layout**, **force-directed layout** and **layered layout**. Please, check the type property for more details regarding each type.

The generic way to apply a layout is by calling the **layout()** method on the diagram. The method has a single parameter **options**. It is an object, which can contain parameters which are specific to the layout as well as parameters customizing the global grid layout. Parameters which apply to other layout algorithms can be included but are overlooked if not applicable to the chose layout type. This means that you can define a set of parameters which cover all possible layout types and simply pass it in the method whatever the layout define in the first parameter.

### layout.endRadialAngle `Number` *(default: 360)*

Defines where the circle/arc ends. The positive direction is **clockwise** and the angle is in **degrees**. *This setting is specific to the radial tree layout.*

### layout.grid `Object`

Each layout algorithm has a different set of parameters customizing the layout but they also all have a common collection of parameters which relate to the way 'pieces' of a diagram are organized.
![Diagram component](/api/javascript/dataviz/diagram/component_example.png)

A diagram can have in general disconnected pieces, known as components, which can be organized in a way independent of the way a component on its own is arranged. In the picture above, this is one diagram consisting of four components.

When you apply a certain layout an analysis will first split the diagram in components, arrange each component individually and thereafter organize the components in a grid. The common parameters referred above deal with this grid layout, they define the width, margin and padding of the (invisible) grid used to organize the components.

![Component parameters](/api/javascript/dataviz/diagram/component_parameters.png)

### layout.grid.componentSpacingX `Number` *(default: 50)*

Defines the horizontal spacing between each component. The default is 50.

### layout.grid.componentSpacingY `Number` *(default: 50)*

Defines the vertical spacing between each component. The default is 50.

### layout.grid.offsetX `Number` *(default: 50)*

Defines the left offset of the grid layout. The default is 50.

### layout.grid.offsetY `Number` *(default: 50)*

Defines the top offset of the grid layout. The default is 50.

### layout.grid.width `Number` *(default: 1500)*

Defines the width of the grid. The bigger this parameter the more components will be organized in an horizontal row. How many components really depends on your diagram and they type of layout applied to each component. The default is set to 800.

### layout.horizontalSeparation `Number` *(default: 90)*

Either the distance between the siblings if the tree is up/down or between levels if the tree is left/right. In *tipOver tree layout* this setting is used only for the direct children of the root

![Tree parameters](/api/javascript/dataviz/diagram/tree_parameters.png)

### layout.iterations `Number` *(default: 300)*

The number of times that all the forces in the diagram are being calculated and balanced. The default is set at 300, which should be enough for diagrams up to a hundred nodes. By increasing this parameter you increase the correctness of the simulation but it does not always lead to a more stable topology. In some situations a diagram simply does not have a stable minimum energy state and oscillates (globally or locally) between the minima. In such a situation increasing the iterations will not result in a better topology.

In situations where there is enough symmetry in the diagram the increased number of iterations does lead to a better layout. In the example below the 100 iterations was not enough to bring the grid to a stable state while 300 iterations did bring all the nodes in such a position that the (virtual) energy of the diagram is a minimum.

*This setting is specific to the force-directed layout*

![Increasing iterations](/api/javascript/dataviz/diagram/force_directed_iterations.png)

### layout.layerSeparation `Number` *(default: 50)*

The height (in a vertical layout) or width (in a horizontal layout) between the layers.

### layout.nodeDistance `Number` *(default: 50)*

In the **force-directed layout** this setting defines the optimal length between 2 nodes, which directly correlates to the state of the link between them. If a link is longer than there will be a force pulling the nodes together, if the link is shorter the force will push the nodes apart. The optimal length is more and indication in the algorithm than a guarantee that all nodes will be at this distance. The result of the layout is really a combination of the incidence structure of the diagram, the initial topology (positions of the nodes) and the number of iterations.

In the **layered layout** it defines the minimum distance between nodes on the same level. Due to the nature of the algorithm this distance will only be respected if the the whole crossing of links and optimimzation does not induce a shift of the siblings.

*This setting is specific to the force-directed layout and layered layout*

### layout.radialFirstLevelSeparation `Number` *(default: 200)*

Controls the distance between the root and the immediate children of the root. *This setting is specific to the radial tree layout.*

### layout.radialSeparation `Number` *(default: 150)*

Defines the radial separation between the levels (except the first one which is defined by the aforementioned radialFirstLevelSeparation). *This setting is specific to the radial tree layout.*

### layout.startRadialAngle `Number` *(default: 0)*

Defines where the circle/arc starts. The positive direction is **clockwise** and the angle is in **degrees**. *This setting is specific to the radial tree layout.*

### layout.subtype `String` *(default: "down")*

The subtype further defines the layout type by specifying in greater detail the behaviour expected by the layout algorithm. Possible predefined values are:

* "down" - *tree layout* and *layered layout* specific subtype. In the tree layout the root is arranged at the top and its children downwards. For the layered layout the links are directed downwards. This is the default subtype.

![Tree down parameters](/api/javascript/dataviz/diagram/tree_down_parameters.png)

* "up" - *tree layout* and *layered layout* specific subtype. In the tree layout the root is arranged at the bottom and its children upwards. For the layered layout the links are directed upwards.
* "left" - *tree layout* *layered layout* specific subtype. In the tree layout the root is arranged at the left and its children sideways to the right. For the layered layout the links are directed to the left.
* "right" - *tree layout* *layered layout* specific subtype. In the tree layout the root is arranged at the right and its children sideways to the left. For the layered layout the links are directed downwards.

![Tree right parameters](/api/javascript/dataviz/diagram/tree_right_parameters.png)

* "mindmapHorizontal" - *tree layout* specific subtype. The root sits at the center and its children are spread equally to the left and right.
* "mindmapVertical" - *tree layout* specific subtype. The root sits at the center and its children are spread equally above and below.

![Mindmap parameters](/api/javascript/dataviz/diagram/mindmap_parameters.png)

* "radial" - *tree layout* specific subtype. The root sits at the center and its children are spread radially around.

![Radial tree parameters](/api/javascript/dataviz/diagram/radial_tree_parameters.png)
![Radial layout angles.](/api/javascript/dataviz/diagram/radial_angles.png)

* "tipOver" - *tree layout* specific subtype. A special version of the tree-down layout where the grand-children (and iteratively) are arranged vertically while the direct children are arranged horizontally. This arrangement has the advantage that it doesn't spread as much as the classic tree-down layout. See below for a concrete example.

![Tip-over parameters](/api/javascript/dataviz/diagram/tip_over_parameters.png)

* "horizontal" - *layered layout* specific subtype. The preferred direction of the links is horizontal.
* "vertical" - *layered layout* specific subtype. The preferred direction of the links is vertical.

### layout.tipOverTreeStartLevel `Number` *(default: 0)*

Specifies the start level when the [subtype](#configuration-layout.subtype) is `tipOver`.

#### Example - set the tipOver layout start level

    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({
        dataSource: {
          data: [{
            items: [{
              items: [{
                items: [{}, {}, {}]
              }, {
                items: [{}, {}, {}]
              }, {
                items: [{}, {}, {}]
              }]
            }]
          }]
        },
        layout: {
          type: "tree",
          subtype: "tipover",
          tipOverTreeStartLevel: 1
        },
        shapeDefaults: {
          width: 40,
          height: 40
        }
      });
    </script>


### layout.type `String` *(default: "tree")*

The type of the layout algorithm to use. Predefined values are:

* "tree" - Organizes a diagram in a hierarchical way and is typically used in organizational representations. This type includes the radial tree layout, mindmapping and the classic tree diagrams.
* "force" - Force-directed layout algorithm (also known as the spring-embedder algorithm) is based on a physical simulation of forces acting on the nodes whereby the links define whether two nodes act upon each other. Each link effectively is like a spring embedded in the diagram. The simulation attempts to find a minimum energy state in such a way that the springs are in their base-state and thus do not pull or push any (linked) node. This force-directed layout is **non-deterministic**; each layout pass will result in an unpredictable (and hence not reproducible) layout. The optimal length is more and indication in the algorithm than a guarantee that all nodes will be at this distance. The result of the layout is really a combination of the incidence structure of the diagram, the initial topology (positions of the nodes) and the number of iterations.

![Force-directed parameter](/api/javascript/dataviz/diagram/force_directed_parameters.png)

* "layered" - Organizes the diagram with an emphasis on *flow* and minimizing the crossing between layers of shapes. This layout works well when few components are present and some sort of top-down flow is present. The concept of *flow* in this context being a more or less clear direction of the connections with a minimum of cycles (connections flowing back upstream). Layered graph layout is a type of graph layout in which the nodes of a (directed) graph are drawn in horizontal or vertical layers with the links directed in the complementary direction. It is also known as Sugiyama or hierarchical graph layout. When the graph is a tree the layout reduces to a standard tree layout and thus can be considered as an extension to the classic tree layout.

There are several criteria on which this algorithm is based and which are respected in as far as the incidence structure allows it:
* links have a preferred direction (the complementary direction of the subtype) and attempt to flow as much as possible in this way
* linked nodes try to stay closed to one another (clustering of nodes)
* links crossings should be minimized
* links should be as short as possible (cross a few layers as possible)

The construction of a layered graph drawing proceeds in a series of steps (assuming an horizontal layer from here on):
 + If the input graph is not already a directed acyclic graph, a set of edges is identified the reversal of which will make it acyclic.
 + The nodes of the directed acyclic graph resulting from the first step are assigned to layers, such that each link goes from a higher layer to a lower layer.
 + Edges that span multiple layers are replaced by paths of dummy vertices so that, after this step, each edge in the expanded graph connects two vertices on adjacent layers of the drawing.
 + The nodes within each layer are permuted in an attempt to reduce the number of crossings among the edges connecting it to the previous layer.
 + Each node is assigned a coordinate within its layer, consistent with the permutation calculated in the previous step.
 + The edges reversed in the first step of the algorithm are returned to their original orientations, the dummy vertices are removed from the graph and the vertices and edges are drawn.

![Layered layout parameters.](/api/javascript/dataviz/diagram/layered_parameters.png)

### layout.underneathHorizontalOffset `Number` *(default: 15)*

Defines the horizontal offset from a child with respect to its parent. *This setting is specific to the tipOver tree layout.*

### layout.underneathVerticalSeparation `Number` *(default: 15)*

Defines the vertical separation between siblings and sub-branches. *This setting is specific to the tipOver tree layout.*

### layout.underneathVerticalTopOffset `Number` *(default: 15)*

Defines the vertical separation between a parent and its first child. This offsets the whole set of children with respect to its parent. *This setting is specific to the tipOver tree layout.*

### layout.verticalSeparation `Number` *(default: 50)*

Either the distance between levels if the tree is up/down or between siblings if the tree is left/right. This property is **not used** in *tipOver tree layout* but rather replaced with three additional ones - **underneathVerticalTopOffset**, **underneathVerticalSeparation** and **underneathHorizontalOffset**

### pannable `Boolean|Object` *(default: true)*

Defines the pannable options.

### pannable.key `String` *(default: "ctrl")*

Defines the pannable key. The available values are:

* "none" - No activation key
* "ctrl" - The activation key will be "ctrl"
* "shift" - The activation key will be "ctrl"
* "alt" - The activation key will be "ctrl"

> This option is not aplicable for mobile defices

### pdf `Object`

Configures the export settings for the [saveAsPDF](#methods-saveAsPDF) method.

### pdf.author `String` *(default: null)*

The author of the PDF document.

#### Example - set the author
    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({
          pdf: {
              author: "John Doe"
          },
          dataSource: {
              data: [{ "items": [{ items: [{}] }] }],
              schema: { model: { children: "items" } }
          },
          layout: {
              type: "tree"
          }
      });

      var diagram = $("#diagram").getKendoDiagram();
      diagram.saveAsPDF();
    </script>

### pdf.creator `String` *(default: "Kendo UI PDF Generator")*

The creator of the PDF document.

#### Example - set the creator
    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({
          pdf: {
              creator: "John Doe"
          },
          dataSource: {
              data: [{ "items": [{ items: [{}] }] }],
              schema: { model: { children: "items" } }
          },
          layout: {
              type: "tree"
          }
      });

      var diagram = $("#diagram").getKendoDiagram();
      diagram.saveAsPDF();
    </script>

### pdf.date `Date`

The date when the PDF document is created. Defaults to `new Date()`.

#### Example - set the date
    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({
          pdf: {
              date: new Date("2014/10/10")
          },
          dataSource: {
              data: [{ "items": [{ items: [{}] }] }],
              schema: { model: { children: "items" } }
          },
          layout: {
              type: "tree"
          }
      });

      var diagram = $("#diagram").getKendoDiagram();
      diagram.saveAsPDF();
    </script>

### pdf.fileName `String` *(default: "Export.pdf")*

Specifies the file name of the exported PDF file.

#### Example - set the default PDF file name
    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({
          pdf: {
              fileName: "Products.pdf"
          },
          dataSource: {
              data: [{ "items": [{ items: [{}] }] }],
              schema: { model: { children: "items" } }
          },
          layout: {
              type: "tree"
          }
      });

      var diagram = $("#diagram").getKendoDiagram();
      diagram.saveAsPDF();
    </script>

### pdf.forceProxy `Boolean` *(default: false)*

If set to true, the content will be forwarded to [proxyURL](#configuration-pdf.proxyURL) even if the browser supports saving files locally.

#### Example - use proxy
    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({
          pdf: {
              proxyURL: "/save",
              forceProxy: true
          },
          dataSource: {
              data: [{ "items": [{ items: [{}] }] }],
              schema: { model: { children: "items" } }
          },
          layout: {
              type: "tree"
          }
      });

      var diagram = $("#diagram").getKendoDiagram();
      diagram.saveAsPDF();
    </script>

### pdf.keywords `String` *(default: null)*

Specifies the keywords of the exported PDF file.

#### Example - set the keywords
    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({
          pdf: {
              keywords: "monthly report"
          },
          dataSource: {
              data: [{ "items": [{ items: [{}] }] }],
              schema: { model: { children: "items" } }
          },
          layout: {
              type: "tree"
          }
      });

      var diagram = $("#diagram").getKendoDiagram();
      diagram.saveAsPDF();
    </script>

### pdf.landscape `Boolean` *(default: false)*

Set to `true` to reverse the paper dimensions if needed such that width is the larger edge.

#### Example - enable landscape mode
    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({
          pdf: {
              paperSize: "A4",
              landscape: true
          },
          dataSource: {
              data: [{ "items": [{ items: [{}] }] }],
              schema: { model: { children: "items" } }
          },
          layout: {
              type: "tree"
          }
      });

      var diagram = $("#diagram").getKendoDiagram();
      diagram.saveAsPDF();
    </script>

### pdf.margin `Object`

Specifies the margins of the page (numbers or strings with units). Supported
units are "mm", "cm", "in" and "pt" (default).

#### Example - set the margins
    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({
          pdf: {
              margin: {
                  left: 10,
                  right: "10pt",
                  top: "10mm",
                  bottom: "1in"
              }
          },
          dataSource: {
              data: [{ "items": [{ items: [{}] }] }],
              schema: { model: { children: "items" } }
          },
          layout: {
              type: "tree"
          }
      });

      var diagram = $("#diagram").getKendoDiagram();
      diagram.saveAsPDF();
    </script>

### pdf.margin.bottom `Number|String` *(default: 0)*

The bottom margin. Numbers are considered as "pt" units.

### pdf.margin.left `Number|String` *(default: 0)*

The left margin. Numbers are considered as "pt" units.

### pdf.margin.right `Number|String` *(default: 0)*

The right margin. Numbers are considered as "pt" units.

### pdf.margin.top `Number|String` *(default: 0)*

The top margin. Numbers are considered as "pt" units.

### pdf.paperSize `String|Array` *(default: "auto")*

Specifies the paper size of the PDF document.
The default "auto" means paper size is determined by content.

> The size of the content in pixels will match the size of the output in points (1 pixel = 1/72 inch).

Supported values:

* A predefined size: "A4", "A3" etc
* An array of two numbers specifying the width and height in points (1pt = 1/72in)
* An array of two strings specifying the width and height in units.
  Supported units are "mm", "cm", "in" and "pt".

#### Example - set custom paper size
    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({
          pdf: {
              paperSize: ["20cm", "20cm"]
          },
          dataSource: {
              data: [{ "items": [{ items: [{}] }] }],
              schema: { model: { children: "items" } }
          },
          layout: {
              type: "tree"
          }
      });

      var diagram = $("#diagram").getKendoDiagram();
      diagram.saveAsPDF();
    </script>

### pdf.proxyURL `String` *(default: null)*

The URL of the server side proxy which will stream the file to the end user.

A proxy will be used when the browser isn't capable of saving files locally.
Such browsers are IE version 9 and lower and Safari.

The developer is responsible for implementing the server-side proxy.

The proxy will receive a POST request with the following parameters in the request body:

* contentType: The MIME type of the file
* base64: The base-64 encoded file content
* fileName: The file name, as requested by the caller.

The proxy should return the decoded file with set "Content-Disposition" header.

#### Example - set the server proxy URL
    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({
          pdf: {
              proxyURL: "/save"
          },
          dataSource: {
              data: [{ "items": [{ items: [{}] }] }],
              schema: { model: { children: "items" } }
          },
          layout: {
              type: "tree"
          }
      });

      var diagram = $("#diagram").getKendoDiagram();
      diagram.saveAsPDF();
    </script>

### pdf.proxyTarget `String` *(default: "_self")*

A name or keyword indicating where to display the document returned from the proxy.

If you want to display the document in a new window or iframe,
the proxy should set the "Content-Disposition" header to `inline; filename="<fileName.pdf>"`.

#### Example - open the generated document in a new window
    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({
          pdf: {
              forceProxy: true,
              proxyURL: "/save",
              proxyTarget: "_blank"
          },
          dataSource: {
              data: [{ "items": [{ items: [{}] }] }],
              schema: { model: { children: "items" } }
          },
          layout: {
              type: "tree"
          }
      });

      var diagram = $("#diagram").getKendoDiagram();
      diagram.saveAsPDF();
    </script>

### pdf.subject `String` *(default: null)*

Sets the subject of the PDF file.

#### Example - set the subject
    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({
          pdf: {
              subject: "Products"
          },
          dataSource: {
              data: [{ "items": [{ items: [{}] }] }],
              schema: { model: { children: "items" } }
          },
          layout: {
              type: "tree"
          }
      });

      var diagram = $("#diagram").getKendoDiagram();
      diagram.saveAsPDF();
    </script>

### pdf.title `String` *(default: null)*

Sets the title of the PDF file.

#### Example - set the title
    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({
          pdf: {
              title: "Products"
          },
          dataSource: {
              data: [{ "items": [{ items: [{}] }] }],
              schema: { model: { children: "items" } }
          },
          layout: {
              type: "tree"
          }
      });

      var diagram = $("#diagram").getKendoDiagram();
      diagram.saveAsPDF();
    </script>

### selectable `Boolean|Object` *(default: true)*

Defines the selectable options.

### selectable.key `String` *(default: "none")*

Defines the selectable key. The available values are:

* "none" - No activation key
* "ctrl" - The activation key will be "ctrl"
* "shift" - The activation key will be "ctrl"
* "alt" - The activation key will be "ctrl"

> This option is not aplicable for mobile defices

### selectable.stroke `Object`

Defines the selection stroke configuration.

### selectable.stroke.color `String`

Defines the selection stroke color.

### selectable.stroke.dashType `String`

Defines the selection dash type.

### selectable.stroke.width `Number`

Defines the selection stroke width.

### shapeDefaults `Object`

Defines the shape options.

### shapeDefaults.connectors `Array`

Defines the connectors the shape owns.

* "top" - top connector.
* "right" - right connector.
* "bottom" - bottom connector.
* "bottomRight" - bottom right connector.
* "left" - left connector.
* "auto" - auto connector.

You can define your own custom connectors or use the predefined types.

#### Example - Include only some connectors

    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({
        dataSource: [{name: "item1"}],
        shapeDefaults: {
          connectors: [{ name: "top" }, { name: "left" }]
        }
      });
    </script>


The following defines a custom shape with connectors adapted to the shape's outline. Note in particular the various helpful methods (right(), left(), top()) to define positions relative to the shape.

#### Example - Custom shape with custom connectors

    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({
        dataSource: [{name: "item1"}],
        shapeDefaults: {
          path: "m1,53.69333l17.5647,-17.56445l0,8.78235l23.15292,0l0,-26.34678l-8.78181,0l17.56417,-17.56444l17.5647,17.56444l-8.78238,0l0,26.34678l23.15297,0l0,-8.78235l17.56473,17.56445l-17.56473,17.56466l0,-8.78231l-63.87057,0l0,8.78231l-17.5647,-17.56466l0,0z",
          connectors: [{
            name: "Upstream",
            position: function(shape) {
              return shape._transformPoint(shape.bounds().top());
            }
          }, {
            name: "SideLeft",
            position: function(shape) {
              var p = shape.bounds().left();
              return shape._transformPoint(new kendo.dataviz.diagram.Point(p.x, p.y+17));
            }
          }, {
            name: "SideRight",
            position: function(shape) {
              var p = shape.bounds().right();
              return shape._transformPoint(new kendo.dataviz.diagram.Point(p.x, p.y + 17));
            }
          }]
        }
      });
    </script>


### shapeDefaults.connectors.name `String`

The connector name.

### shapeDefaults.connectors.position `Function`

The function that positions the connector.

### shapeDefaults.content `Object`

Defines the shapes content settings.

### shapeDefaults.content.align `String`

The alignment of the text inside the shape.

### shapeDefaults.content.color `String`

The color of the shape content text.

### shapeDefaults.content.fontFamily `String`

The font family of the shape content text.

### shapeDefaults.content.fontSize `Number`

The font size of the shape content text.

### shapeDefaults.content.template `String|Function`

The [template](/api/javascript/kendo#methods-template) which renders the labels.

The fields which can be used in the template are:

* dataItem - the data item, in case a field has been specified

### shapeDefaults.content.text `String`

The text displayed in the shape.

### shapeDefaults.editable `Boolean|Object` *(default: true)*

Defines the shape editable options.

### shapeDefaults.editable.connect `Boolean` *(default: true)*

Specifies whether the connectors should appear on hover.

### shapeDefaults.editable.drag `Boolean` *(default: true)*

Specifies if the shapes can be dragged.

### shapeDefaults.editable.remove `Boolean` *(default: true)*

Specifies if the shapes can be removed.

### shapeDefaults.editable.tools `Array`

Specifies the the toolbar tools. Predefined tools are:

* "edit" - Selected item can be edit.
* "delete" - Selected items can be deleted.
* "rotateClockwise" - Selected items can be rotated clockwise. Default value for rotation is 90 degree.
* "rotateAnticlockwise" - Selected items can be rotated anticlockwise. Default value for rotation is 90 degree.

### shapeDefaults.editable.tools.name `String`

The name of the tool. The built-in tools are "edit", "delete", "rotateClockwise" and "rotateAnticlockwise".

### shapeDefaults.editable.tools.step `Number` *(default: 90)*

The step of the rotateClockwise and rotateAnticlockwise tools.

### shapeDefaults.fill `String|Object`

Defines the fill options of the shape.

### shapeDefaults.fill.color `String`

Defines the fill color of the shape.

### shapeDefaults.fill.opacity `Number` *(default: 1)*

Defines the fill opacity of the shape.

### shapeDefaults.fill.gradient `Object`

Defines the gradient fill of the shape.

### shapeDefaults.fill.gradient.type `String` *(default: "linear")*
The type of the gradient. Supported values are:

* linear
* radial

Note that support for radial gradients in VML (IE8 and below) is limited.
Not all configurations are guaranteed to work.

### shapeDefaults.fill.gradient.center `Array`
The center of the radial gradient.

Coordinates are relative to the shape bounding box.
For example [0, 0] is top left and [1, 1] is bottom right.

### shapeDefaults.fill.gradient.radius `Number` *(default: 1)*
The radius of the radial gradient relative to the shape bounding box.

### shapeDefaults.fill.gradient.start `Array`
The start point of the linear gradient.

Coordinates are relative to the shape bounding box.
For example [0, 0] is top left and [1, 1] is bottom right.

### shapeDefaults.fill.gradient.end `Array`
The end point of the linear gradient.

Coordinates are relative to the shape bounding box.
For example [0, 0] is top left and [1, 1] is bottom right.

### shapeDefaults.fill.gradient.stops `Array`
The array of gradient color stops.

### shapeDefaults.fill.gradient.stops.offset `Number`
The stop offset from the start of the element.
Ranges from 0 (start of gradient) to 1 (end of gradient).

### shapeDefaults.fill.gradient.stops.color `String`
The color in any of the following formats.

| Format         | Description
| ---            | --- | ---
| red            | [Basic](http://www.w3.org/TR/css3-color/#html4) or [Extended](http://www.w3.org/TR/css3-color/#svg-color) CSS Color name
| #ff0000        | Hex RGB value
| rgb(255, 0, 0) | RGB value

Specifying 'none', 'transparent' or '' (empty string) will clear the fill.

### shapeDefaults.fill.gradient.stops.opacity `Number`
The fill opacity.
Ranges from 0 (completely transparent) to 1 (completely opaque).

### shapeDefaults.height `Number` *(default: 100)*

Defines the height of the shape when added to the diagram.

### shapeDefaults.hover `Object`

Defines the hover configuration.

### shapeDefaults.hover.fill `String|Object`

Hover's fill options.

### shapeDefaults.hover.fill.color `String`

Hover's fill color.

### shapeDefaults.hover.fill.opacity `Number` *(default: 1)*

Hover's fill opacity.

### shapeDefaults.minHeight `Number` *(default: 20)*

Defines the minimum height the shape should have, i.e. it cannot be resized to a value smaller than the given one.

### shapeDefaults.minWidth `Number` *(default: 20)*

Defines the minimum width the shape should have, i.e. it cannot be resized to a value smaller than the given one.

### shapeDefaults.path `String`

The path option of a Shape is a description of a custom geometry. The format follows the standard SVG format (http://www.w3.org/TR/SVG/paths.html#PathData "SVG Path data.").

### shapeDefaults.rotation `Object` *(default: null)*

Defines the rotation of the shape.

### shapeDefaults.rotation.angle `Number` *(default: 0)*

Sets the rotational angle of the shape.

### shapeDefaults.selectable `Boolean` *(default: true)*

Specifies if the shape can be selected.

### shapeDefaults.source `String`

The source of the shape image. Applicable when the type is set to "image".

### shapeDefaults.stroke `Object`

Defines the stroke configuration.

### shapeDefaults.stroke.color `String` *(default: "Black")*

Defines the color of the shape's stroke.

### shapeDefaults.stroke.dashType `String`

The dash type of the shape.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

### shapeDefaults.stroke.width `Number` *(default: 1)*

Defines the thickness or width of the shape's stroke.

### shapeDefaults.type `String` *(default: "rectangle")*

Specifies the type of the Shape using any of the built-in shape type.

* "rectangle": this is the default option
* "circle": a circle/ellipse
* "image": an image

### shapeDefaults.visual `Function`

A function returning a visual element to render for a given shape. The following primitives can be used to construct a composite visual:

* [Circle](/api/javascript/dataviz/diagram/Circle)
* [Rectangle](/api/javascript/dataviz/diagram/Rectangle)
* [Path](/api/javascript/dataviz/diagram/Path)
* [Line](/api/javascript/dataviz/diagram/Line)
* [Polyline](/api/javascript/dataviz/diagram/Polyline)
* [TextBlock](/api/javascript/dataviz/diagram/TextBlock)
* [Image](/api/javascript/dataviz/diagram/Image)
* [Layout](/api/javascript/dataviz/diagram/Layout)

#### Example - how to use the visual

    var diagram = kendo.dataviz.diagram;
    var getVisual = function(data) {
        var g = new diagram.Group({
            autoSize: true
        });
        var r = new diagram.Circle({
            width : 100,
            height: 60,
            fill: "LimeGreen"
        });
        g.append(r);
        var fn = new diagram.TextBlock({
            text: data.name,
            fontSize: 16,
            x: 30,
            y: 30
        });
        g.append(fn);
        return g;
    };

    $("#diagram").kendoDiagram({
        dataSource: [{
            "name" : "Telerik",
            "items": [
                {"name": "Kendo"},
                {"name": "Icenium"}
            ]
        }],
        shapeDefaults: {
            visual: getVisual
        }
    });

    $("#diagram").getKendoDiagram().layout();

### shapeDefaults.width `Number` *(default: 100)*

Defines the width of the shape when added to the diagram.

### shapeDefaults.x `Number` *(default: 0)*

Defines the x-coordinate of the shape when added to the diagram.

### shapeDefaults.y `Number` *(default: 0)*

Defines the y-coordinate of the shape when added to the diagram.

### shapes `Array`

Defines the shape options.

### shapes.connectors `Array`

Defines the connectors the shape owns.

### shapes.connectors.description `String`

The connector description.

### shapes.connectors.name `String`

The connector name. Predefined names include:

* "top" - top connector.
* "right" - right connector.
* "bottom" - bottom connector.
* "bottomRight" - bottom right connector.
* "left" - left connector.
* "auto" - auto connector.

### shapes.connectors.position `Function`

The function that positions the connector.

### shapes.content `Object`

Defines the shapes content settings.

### shapes.content.align `String`

The alignment of the text inside the shape.

### shapes.content.color `String`

The color of the shape content text.

### shapes.content.fontFamily `String`

The font family of the shape content text.

### shapes.content.fontSize `Number`

The font size of the shape content text.

### shapes.content.template `String|Function`

The [template](/api/javascript/kendo#methods-template) which renders the labels.

The fields which can be used in the template are:

* dataItem - the data item, in case a field has been specified

### shapes.content.text `String`

The text displayed in the shape.

### shapes.editable `Boolean|Object` *(default: true)*

Defines the shape editable options.

### shapes.editable.connect `Boolean` *(default: true)*

Specifies whether the connectors should appear on hover.

### shapes.editable.tools `Array`

Specifies the the toolbar tools. Predefined tools are:

* "edit" - Selected item can be edit.
* "delete" - Selected items can be deleted.
* "rotateClockwise" - Selected items can be rotated clockwise. Default value for rotation is 90 degree.
* "rotateAnticlockwise" - Selected items can be rotated anticlockwise. Default value for rotation is 90 degree.

### shapes.editable.tools.name `String`

The name of the tool. The built-in tools are "edit", "delete", "rotateClockwise" and "rotateAnticlockwise".

### shapes.editable.tools.step `Number` *(default: 90)*

The step of the rotateClockwise and rotateAnticlockwise tools.

### shapes.fill `String|Object`

Defines the fill options of the shape.

### shapes.fill.color `String`

Defines the fill color of the shape.

### shapes.fill.opacity `Number` *(default: 1)*

Defines the fill opacity of the shape.

### shapes.fill.gradient `Object`

Defines the gradient fill of the shape.

### shapes.fill.gradient.type `String` *(default: "linear")*
The type of the gradient. Supported values are:

* linear
* radial

Note that support for radial gradients in VML (IE8 and below) is limited.
Not all configurations are guaranteed to work.

### shapes.fill.gradient.center `Array`
The center of the radial gradient.

Coordinates are relative to the shape bounding box.
For example [0, 0] is top left and [1, 1] is bottom right.

### shapes.fill.gradient.radius `Number` *(default: 1)*
The radius of the radial gradient relative to the shape bounding box.

### shapes.fill.gradient.start `Array`
The start point of the linear gradient.

Coordinates are relative to the shape bounding box.
For example [0, 0] is top left and [1, 1] is bottom right.

### shapes.fill.gradient.end `Array`
The end point of the linear gradient.

Coordinates are relative to the shape bounding box.
For example [0, 0] is top left and [1, 1] is bottom right.

### shapes.fill.gradient.stops `Array`
The array of gradient color stops.

### shapes.fill.gradient.stops.offset `Number`
The stop offset from the start of the element.
Ranges from 0 (start of gradient) to 1 (end of gradient).

### shapes.fill.gradient.stops.color `String`
The color in any of the following formats.

| Format         | Description
| ---            | --- | ---
| red            | [Basic](http://www.w3.org/TR/css3-color/#html4) or [Extended](http://www.w3.org/TR/css3-color/#svg-color) CSS Color name
| #ff0000        | Hex RGB value
| rgb(255, 0, 0) | RGB value

Specifying 'none', 'transparent' or '' (empty string) will clear the fill.

### shapes.fill.gradient.stops.opacity `Number`
The fill opacity.
Ranges from 0 (completely transparent) to 1 (completely opaque).

### shapes.height `Number` *(default: 100)*

Defines the height of the shape when added to the diagram.

### shapes.hover `Object`

Defines the hover configuration.

### shapes.hover.fill `String|Object`

Hover's fill options.

### shapes.hover.fill.color `String`

Hover's fill color.

### shapes.hover.fill.opacity `Number` *(default: 1)*

Hover's fill opacity.

### shapes.id `String`

The unique identifier for a Shape.

### shapes.minHeight `Number` *(default: 20)*

Defines the minimum height the shape should have, i.e. it cannot be resized to a value smaller than the given one.

### shapes.minWidth `Number` *(default: 20)*

Defines the minimum width the shape should have, i.e. it cannot be resized to a value smaller than the given one.

### shapes.path `String`

The path option of a Shape is a description of a custom geometry. The format follows the standard SVG format (http://www.w3.org/TR/SVG/paths.html#PathData "SVG Path data.").

### shapes.rotation `Object`

The function that positions the connector.

### shapes.rotation.angle `Number` *(default: 0)*

The rotation angle.

### shapes.source `String`

The source of the shape image. Applicable when the type is set to "image".

### shapes.stroke `Object`

Defines the stroke configuration.

### shapes.stroke.color `String`

Defines the color of the shape's stroke.

### shapes.stroke.dashType `String`

The dash type of the shape.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

### shapes.stroke.width `Number` *(default: 1)*

Defines the thickness or width of the shape's stroke.

### shapes.type `String` *(default: "rectangle")*

Specifies the type of the Shape using any of the built-in shape type.

* "rectangle": this is the default option
* "circle" : a circle/ellipse
* "image": an image

### shapes.visual `Function`

A function returning a visual element to render for this shape.
See [visual](#configuration-shapeDefaults.visual).

### shapes.width `Number` *(default: 100)*

Defines the width of the shape when added to the diagram.

### shapes.x `Number` *(default: 0)*

Defines the x-coordinate of the shape when added to the diagram.

### shapes.y `Number` *(default: 0)*

Defines the y-coordinate of the shape when added to the diagram.

### template `String|Function` *(default: "")*

The [template](/api/javascript/kendo#methods-template) which renders the content of the shape when bound to a dataSource. The names you can use in the template correspond to the properties used in the dataSource. See the dataSource topic below for a concrete example.

### zoom `Number` *(default: 1)*

The zoom level in percentages.

### zoomMax `Number` *(default: 2)*

The zoom max level in percentages.

### zoomMin `Number` *(default: 0.1)*

The zoom min level in percentages.

### zoomRate `Number` *(default: 0.1)*

The zoom step when using the mouse-wheel to zoom in or out.

## Fields

### connections `Array`

An array holding the diagram connections.

### connectionsDataSource `kendo.data.DataSource`

The connections data source, if any.

### dataSource `kendo.data.DataSource`

The shapes data source, if any.

### shapes `Array`

An array holding the diagram shapes.

## Methods

### addConnection

Adds the given Connection to the diagram.

#### Parameters

##### connection `Object`

The Connection instance to be added to the diagram.

##### undoable `Boolean` *(default:true)*

Whether the addition should be recorded in the undo-redo stack.

#### Example - adding a Connection to the diagram

    <script>
    $("#diagram").kendoDiagram();
    var diagram = $("#diagram").data("kendoDiagram");
    var shape1 = diagram.addShape(new Point(100, 100));
    var shape2 = diagram.addShape(new Point(300, 200));

    var connection = new kendo.diagram.Connection(shape1, shape2, { stroke: { color: "red" } });
    diagram.addConnection(connection);
    </script>

### addShape

Adds a new shape to the diagram.

#### Parameters

##### obj `Object`

A Shape instance or a Point where the default shape type will be added.

##### undoable `Boolean` *(default:true)*

Whether the addition should be recorded in the undo-redo stack.

#### Example - adding a shape to the diagram

    <script>
    $("#diagram").kendoDiagram();
    var diagram = $("#diagram").data("kendoDiagram");

     diagram.addShape(new Point(100, 100));
     var shape = new kendo.diagram.Shape({x:500, y:100, fill: "red"});
     diagram.addShape(shape);
    </script>

#### Returns
`kendo.dataviz.diagram.Shape` The newly created diagram shape.

### alignShapes

Aligns the edges (as defined by the bounding box) of the selected shapes.

#### Parameters

##### direction `String`

This can be one of the four supported directions:

* "left"
* "right"
* "top"
* "bottom"

### boundingBox

#### Returns

`kendo.dataviz.diagram.Rect` The bounding rectangle of the specified items. If nothing is specified the bounding box of the all diagram will be returned.

#### Parameters

##### items `Array`

The items (shapes and connections) to include in the bounding box.
Defaults to all items if not specified.

### bringIntoView

Brings one or more items into the view in function of various criteria.

#### Parameters

##### obj `Array|Object`

* a diagram item
* an array of items
* a rectangle: this defines a window which the view should contain

##### options `Object`

* animate
* align

#### Example - bring a portion of the diagram into view

This will offset/pan the diagram to bring the rectangle at position (500,500) into view.

    <script>
        $("#diagram").kendoDiagram();
        var diagram = $("#diagram").data("kendoDiagram");

        var shape1 = diagram.addShape(new Point(100, 100));
        var shape2 = diagram.addShape(new Point(400, 100));
        var con = diagram.connect(shape1,shape2);

        diagram.bringIntoView(new kendo.diagram.Rect(500, 500, 10, 10));
    </script>

#### Example - bring an item into view

The second shape has a vertical position of 1000 and is off the screen at launch. Upon clicking the diagram this item will be in the view.

    <script>
        var shape2;
        function init()
        {
            var diagramElement = $("#canvas").kendoDiagram();
            diagram = diagramElement.data("kendoDiagram");
            diagramElement.css("width", "1200");
            diagramElement.css("height", "800");
        }
        $(document).ready(
                function()
                {
                    init();
                    var shape1 = diagram.addShape(new Point(100, 100));
                    shape2 = diagram.addShape(new Point(400, 1000));
                    var con = diagram.connect(shape1, shape2);
                });
        $(document).click(function()
        {
            diagram.bringIntoView(shape2);
        });
    </script>

### cancelEdit

Cancels edit and close the popup form.

### clear

Clears the content of the diagram.

### connect

Creates a connection which can be either attached on both ends to a shape, half attached or floating (not attached to any shape). When a connection is (half) attached to a shape it happens through the intermediate Connector object. Connectors are part of a Shape's definition and you can specify the binding of a connection to a shape directly via the shape or via one of its connectors. If you specify a Shape as a connection's endpoint the Auto-connector will be used. This means that the endpoint of the connection will switch to the most convenient (in the sense of shortest path) connector automatically. If you specify a shape's connector as an endpoint for a connection the endpoint will remain attached to that given Connector instance.
Finally, if you wish to have a (half) floating connection endpoint you should specify a Point as parameter for the floating end.

![Creating connections.](/api/javascript/dataviz/diagram/connect.png)

#### Parameters

##### source `Object`

The source definition of the connection. This can be a Shape, a Connector or a Point.

##### target `Object`

The target definition of the connection. This can be a Shape, a Connector or a Point.

##### options `Object`

The options of the new connection. See [connections](#configuration-connections) options.

#### Example - connecting two shapes using the Auto-connector

    <script>
    $("#diagram").kendoDiagram();
    var diagram = $("#diagram").data("kendoDiagram");
    var shape1 = diagram.addShape(new Point(100, 100));
    var shape2 = diagram.addShape(new Point(400, 100));
    var connection = diagram.connect(shape1, shape2)
    </script>

#### Example - connecting two shapes using the specific connectors

    <script>
    $("#diagram").kendoDiagram();
    var diagram = $("#diagram").data("kendoDiagram");
    var shape1 = diagram.addShape(new Point(100, 100));
    var shape2 = diagram.addShape(new Point(400, 100));
    var connection = diagram.connect(shape1.getConnector["Top"], shape2.getConnector["Bottom"])
    </script>

#### Example - creating a half-floating connection

    <script>
    $("#diagram").kendoDiagram();
    var diagram = $("#diagram").data("kendoDiagram");
    var shape = diagram.addShape(new Point(100, 100));
    var connection = diagram.connect(new Point(150,150), shape)
    </script>

Note that the Shape holds an indexed connectors collection. Instead of accessing a default or custom connector by means of the **getConnector("name-of-connector")** method you could use **connectors[index]** instead.

### connected

Returns whether the two given shapes are connected through a connection.

#### Parameters

##### source `Object`

A Shape in the diagram.

##### target `Object`

A Shape in the diagram.

### copy

Puts a copy of the currently selected diagram to an internal clipboard.

### createConnection

Adds an empty connection data item and a popup window will be displayed.

#### Parameters

##### item `Object`

A diagram shape item to edit.

### createShape

Adds an empty shape data item and a popup window will be displayed.

#### Parameters

##### item `Object`

A diagram shape item to edit.

### cut

Cuts the currently selected diagram items to an internal clipboard.

### destroy

Prepares the widget for safe removal from the DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> This method does not remove the widget element from the DOM.

#### Example
    <script>
    $("#diagram").kendoDiagram({
      dataSource: [{
          "name" : "Telerik",
          "items": [
              {"name": "Kendo"},
              {"name": "Icenium"}
          ]
      }],
      template: "#= item.name #"
    });
    var diagram = $("#diagram").data("kendoDiagram");
    diagram.destroy();
    </script>

### documentToModel

Transforms a point from Page document coordinates to Model coordinates. Shortcut for viewToModel(documentToView(point))

#### Parameters

##### point `Object`

The point in Page document coordinates.

#### Returns

`Object` the transformed point

### documentToView

Transforms a point from Page document coordinates to View coordinates. View origin is the diagram container.

#### Parameters

##### point `Object`

The point in View coordinates.

#### Returns

`Object` the transformed point

### edit

Edit diagram connection/shape.

#### Parameters

##### item `Object`

A diagram item to edit.

### exportImage

Exports the diagram content as an image.
The result can be saved using [kendo.saveAs](/api/javascript/kendo#methods-saveAs).

The full content of the diagram will be exported in 1:1 scale.
If exporting the current view is desired then the [kendo.drawing.drawDOM](/api/javascript/drawing#methods-drawDOM)
method should be called on a container element.

The export operation is asynchronous and returns a [promise](http://api.jquery.com/Types/#Promise).
The promise will be resolved with a PNG image encoded as a [Data URI](https://developer.mozilla.org/en-US/docs/data_URIs).

#### Parameters

##### options `Object` *(optional)*
Parameters for the exported image.

##### options.width `String`
The width of the exported image. Defaults to the diagram content width.

##### options.height `String`
The height of the exported image. Defaults to the diagram content height.

##### options.cors `String` *(default: "anonymous")*
Specifies how [cross-origin images](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image)
should be requested.

Requesting images without CORS will "taint" the canvas. It will still be visible on the page, but all
script access to it is disabled to prevent information disclosure.

By default they're requested anonymously. Available options are:
* "anonymous" - do not send user credentials as part of the request
* "use-credentials" - send credentials as part of the request
* false - fetch images without CORS, possibly tainting the canvas

See [crossorigin attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-crossorigin)
for more details.

#### Returns
`Promise` A promise that will be resolved with a PNG image encoded as a Data URI.

#### Example - Exporting a diagram to an image
    <div id="diagram"></div>
    <script>
        $("#diagram").kendoDiagram({
          dataSource: {
              data: [{ "items": [{ items: [{}] }] }],
              schema: { model: { children: "items" } }
          },
          layout: {
              type: "tree"
          }
        });

        var diagram = $("#diagram").getKendoDiagram();
        diagram.exportImage().done(function(data) {
            kendo.saveAs({
                dataURI: data,
                fileName: "diagram.png"
            });
        });
    </script>

### exportPDF

Exports the diagram content as a PDF file.
The result can be saved using [kendo.saveAs](/api/javascript/kendo#methods-saveAs).

The export operation is asynchronous and returns a [promise](http://api.jquery.com/Types/#Promise).
The promise will be resolved with a PDF file encoded as a [Data URI](https://developer.mozilla.org/en-US/docs/data_URIs).

#### Parameters

##### options `kendo.drawing.PDFOptions` *(optional)*
Parameters for the exported PDF file.

#### Returns
`Promise` A promise that will be resolved with a PDF file encoded as a Data URI.

#### Example - Exporting a diagram to a PDF file
    <div id="diagram"></div>
    <script>
        $("#diagram").kendoDiagram({
          dataSource: {
              data: [{ "items": [{ items: [{}] }] }],
              schema: { model: { children: "items" } }
          },
          layout: {
              type: "tree"
          }
        });

        var diagram = $("#diagram").getKendoDiagram();
        diagram.exportPDF().done(function(data) {
            kendo.saveAs({
                dataURI: data,
                fileName: "diagram.pdf"
            });
        });
    </script>

### exportSVG

Exports the diagram content as an SVG document.
The result can be saved using [kendo.saveAs](/api/javascript/kendo#methods-saveAs).

The full content of the diagram will be exported in 1:1 scale.
If exporting the current view is desired then the [kendo.drawing.drawDOM](/api/javascript/drawing#methods-drawDOM)
method should be called on a container element.

The export operation is asynchronous and returns a [promise](http://api.jquery.com/Types/#Promise).
The promise will be resolved with a SVG document encoded as a [Data URI](https://developer.mozilla.org/en-US/docs/data_URIs).

#### Parameters

##### options `Object` *(optional)*
Export options.

##### options.raw `Boolean` *(default: false)*
Resolves the promise with the raw SVG document without the Data URI prefix.

#### Returns
`Promise` A promise that will be resolved with a SVG document encoded as a Data URI.

#### Example - Exporting a diagram to an SVG document
    <div id="diagram"></div>
    <script>
        $("#diagram").kendoDiagram({
          dataSource: {
              data: [{ "items": [{ items: [{}] }] }],
              schema: { model: { children: "items" } }
          },
          layout: {
              type: "tree"
          }
        });

        var diagram = $("#diagram").getKendoDiagram();
        diagram.exportSVG().done(function(data) {
            kendo.saveAs({
                dataURI: data,
                fileName: "diagram.svg"
            });
        });
    </script>

### focus

Sets the focus on the diagram.

### getShapeById

Returns the shape or connection with the specified identifier.

#### Parameters

##### id `String`

The unique identifier of the Shape or Connection

#### Returns

`Object` the item that has the provided ID.

### layerToModel

Transforms a point from Layer coordinates to Model coordinates. Layer coordinates are relative to the drawable surface.

#### Parameters

##### point `Object`

The point in layer coordinates.

#### Returns

`Object` the transformed point

### layout

Applies a layout algorithm on the current diagram.

A more detailed overview of layout and graph analysis can be found below.

#### Parameters

##### options `Object`

The layout options. See [options.layout](#configuration-layout) for a full reference.

### load

Loads a saved diagram.

#### Parameters

##### json `String`

The serialized diagram in JSON format.

### modelToDocument

Transforms a point from Model coordinates to Page document coordinates. Shortcut for viewToDocument(modelToView(point))

#### Parameters

##### point `Object`

The point in Model coordinates.

#### Returns

`Object` the transformed point

### modelToLayer

Transforms a point from Model coordinates to Layer coordinates. Layer coordinates are relative to the drawing surface.

#### Parameters

##### point `Object`

The point in Model coordinates.

#### Returns

`Object` the transformed point

### modelToView

Transforms a point from Model coordinates to View coordinates. Model coordinates are independent coordinates to define Shape bounds.

#### Parameters

##### point `Object`

The point in Model coordinates.

#### Returns

`Object` the transformed point

### pan

Pans the diagram with a specified delta (represented as a Point).

#### Parameters

##### pan `Object`

The translation delta to apply to the diagram.

### paste

Pastes the content of the internal diagram clipboard.

### redo

Executes again the previously undone action.

### remove

Removes one or more items from the diagram

#### Parameters

##### items `Object|Array`

A diagram item or an array of diagram items to remove.

##### undoable `Boolean` *(default:true)*

Whether the removal should be recorded in the undo-redo stack.

#### Example - removing items

    <script>
        $("#diagram").kendoDiagram();
        var diagram = $("#diagram").data("kendoDiagram");

        var shape1 = diagram.addShape(new Point(100, 100));
        var shape2 = diagram.addShape(new Point(400, 100));
        var con = diagram.connect(shape1,shape2);
        diagram.remove([shape1, shape2, con]);
    </script>

### resize

Adjusts the diagram size to match the size of the container.

### save

Saves the diagram.

### saveEdit

Saves any changes made by the user.

### select

Gets or sets the selected elements.

#### Parameters

##### elements `kendo.dataviz.diagram.Connection|kendo.dataviz.diagram.Shape|Array`

The diagram element(s) that should be selected.

##### options `Object`

##### options.addToSelection `Boolean`

If set to true the newly selected items will be added to the existing selection. Otherwise a new selection set is created. The default is false.

#### Returns

`Array` The selected diagram elements.

#### Example - select a shape

    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({
        shapes: [{
          id: "1"
        }]
      });
      var diagram = $("#diagram").getKendoDiagram();
      diagram.select(diagram.shapes[0]);
    </script>

### selectAll

Selects all shapes and connections.

### selectArea

Selects all diagram elements within the given rectangle.

#### Parameters

##### rect `kendo.dataviz.diagram.Rect`

The rectangle that determines which elements should be selected.

### setConnectionsDataSource

Sets the connections data source of the diagram.

#### Parameters

##### dataSource `kendo.data.DataSource`

The data source to which the widget should be bound.

### setDataSource

Sets the data source of the diagram.

#### Parameters

##### dataSource `kendo.data.DataSource`

The data source to which the widget should be bound.

### toBack

Sends the specified items to the back, i.e. it's reordering items to ensure they are underneath the complementary items.

#### Parameters

##### items `Array`

An array of diagram items.

##### undoable `Boolean`

Whether the change should be recorded in the undo-redo stack.

### toFront

Brings the specified items in front, i.e. it's reordering items to ensure they are on top of the complementary items.

#### Parameters

##### items `Array`

An array of diagram items.

##### undoable `Boolean`

Whether the change should be recorded in the undo-redo stack.

### transformPoint

Transforms a point from the main canvas coordinates to the non-transformed origin.

#### Parameters

##### p `Object`

An arbitrary point to transform to the diagram coordinate system.

### transformRect

Transforms a given rectangle to the diagram coordinate system.

#### Parameters

##### r `Object`

The rectangle to be transformed.

### undo

Undoes the previous action.

#### Example - undoing items removal

    <script>
        $("#diagram").kendoDiagram();
        var diagram = $("#diagram").data("kendoDiagram");

        var shape1 = diagram.addShape(new Point(100, 100));
        var shape2 = diagram.addShape(new Point(400, 100));
        var con = diagram.connect(shape1,shape2);
        diagram.remove([shape1, shape2], true);
        diagram.undo();
    </script>

### viewToDocument

Transforms a point from View coordinates to Page document coordinates. View origin is the diagram container.

#### Parameters

##### point `kendo.dataviz.diagram.Point`

The point in Page document coordinates.

#### Returns

`kendo.dataviz.diagram.Point` the transformed point

### viewToModel

Transforms a point from View coordinates to Model coordinates. Model coordinates are independent coordinates to define Shape bounds.

#### Parameters

##### point `kendo.dataviz.diagram.Point`

The point in View coordinates.

#### Returns

`kendo.dataviz.diagram.Point` the transformed point

### viewport

The bounds of the diagramming canvas.

#### Returns

`kendo.dataviz.diagram.Rect` as viewport bounds

### zoom

Gets or sets the current zoom level of the diagram.

#### Parameters

##### zoom `Number`

The zoom factor.

##### point `kendo.dataviz.diagram.Point`

The point to zoom into or out of.

#### Returns
`Number` The current zoom level

## Events

### add

Fired when the user adds new shape or connection.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.connection `kendo.dataviz.diagram.Connection`

The connection that will be added.

##### e.shape `kendo.dataviz.diagram.Shape`

The shape that will be added.

##### e.preventDefault `Function`

Prevents the add action. If called, the element will not be added to the diagram.

##### e.sender `kendo.dataviz.ui.Diagram`

The widget instance which fired the event.

#### Example - handling the add event

     $('<div id="diagram" />').kendoDiagram({
         shapes: [{
             id: "id1",
             type: "Rectangle",
             x: 0,
             y: 0,
             width: 100,
             height: 100
         }],
         add: function(e) {
             var addedShape = e.shape;
             // 'this' refers to the widget here
         }
     });

### cancel

Fired when the user clicks the "cancel" button in the popup window in case the item was added via a toolbar.

#### Event Data

##### e.container `jQuery`

The jQuery object representing the container element. That element contains the editing UI.

##### e.connection `kendo.data.Model`

The dataItem to which connection is bound.

##### e.shape `kendo.data.Model`

The dataItem to which shape is bound.

##### e.sender `kendo.dataviz.ui.Diagram`

The widget instance which fired the event.

### change

Fired when an item is added or removed to/from the diagram.

#### Event Data

##### e.added `Array`

The added items (shapes or connections).

##### e.removed `Array`

The removed items (shapes or connections).

##### e.sender `kendo.dataviz.ui.Diagram`

The widget instance which fired the event.

### click

Fired when the user clicks on a shape or a connection.

#### Example - handling the click event

     $("#diagram").kendoDiagram({
                 shapes: [
                     {
                         id: "1",
                         content: {
                             text: "Monday"
                         }
                     },
                     {
                         id: "2",
                         content: "Tuesday"
                     }
                 ],
                 connections: [

                     {
                         from: "1",
                         to: "2"
                     }
                 ],
                 layout: {
                     type: "tree"
                 },
                 click: function(e) {
                     if(e.item instanceof kendo.dataviz.diagram.Shape)
                         console.log(e.item.options.content? e.item.options.content.text: "No content.");
                     else
                         console.log("Clicked a connection.");
                 },
                 shapeDefaults: {
                     type: "circle",
                     width: 70,
                     height: 70,
                     hover: {
                         fill: "Orange"
                     }
                 },
                 connectionDefaults: {
                     type: "polyline",
                     startCap: "FilledCircle",
                     endCap: "ArrowEnd"
                 }
             })

#### Event Data

##### e.item `kendo.dataviz.diagram.Shape` | `kendo.dataviz.diagram.Connection`

The clicked shape or connection.

##### meta `Object`

An object with fields indicating which keys(altKey, ctrlKey, shiftKey, metaKey) were pressed.

##### e.point `kendo.dataviz.diagram.Point`

The clicked location.

##### e.sender `kendo.dataviz.ui.Diagram`

The widget instance which fired the event.

### dataBound

Fired when the widget is bound to data from dataDource and connectionsDataSource.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.sender `kendo.dataviz.ui.Diagram`

### drag

Fired when dragging shapes or connection.

#### Event Data

##### e.connections `Array`

An array with the dragged connection.

##### e.shapes `Array`

An array with the dragged shapes.

##### e.sender `kendo.dataviz.ui.Diagram`

The widget instance which fired the event.

### dragEnd

Fired after finishing dragging shapes or connection.

#### Event Data

##### e.connections `Array`

An array with the dragged connection.

##### e.shapes `Array`

An array with the dragged shapes.

##### e.sender `kendo.dataviz.ui.Diagram`

The widget instance which fired the event.

##### e.preventDefault `Function`

A function that can be used prevent the default action. If invoked, the dragged elements will be returned to their original state.

### dragStart

Fired before starting dragging shapes or connection.

#### Event Data

##### e.connections `Array`

An array with the dragged connection.

##### e.shapes `Array`

An array with the dragged shapes.

##### e.sender `kendo.dataviz.ui.Diagram`

The widget instance which fired the event.

##### e.preventDefault `Function`

A function that can be used prevent the default action. If invoked, the element(s) will not be dragged.

### edit

Fired when the user edits a shape or connection.

#### Event Data

##### e.container `jQuery`

The jQuery object representing the container element. That element contains the editing UI.

##### e.connection `kendo.data.Model`

The dataItem to which connection is bound.

##### e.shape `kendo.data.Model`

The dataItem to which shape is bound.

##### e.sender `kendo.dataviz.ui.Diagram`

The widget instance which fired the event.

### itemBoundsChange

Fired when the location or size of a shape are changed.

#### Event Data

##### e.bounds `kendo.dataviz.diagram.Rect`

The new item bounds.

##### e.item `kendo.dataviz.diagram.Shape`

The affected shape.

##### e.sender `kendo.dataviz.ui.Diagram`

The widget instance which fired the event.

### itemRotate

Fired when a shape is rotated.

#### Event Data

##### e.item `kendo.dataviz.diagram.Shape`

The rotated shape.

##### e.sender `kendo.dataviz.ui.Diagram`

The widget instance which fired the event.

### mouseEnter

Fired when the mouse enters a shape or a connection.

Will not fire for disabled items.

> Available in version 2014.3.1307 and later

#### Event Data

##### e.item `kendo.dataviz.diagram.Shape` | `kendo.dataviz.diagram.Connection`

The target shape or connection.

##### e.sender `kendo.dataviz.ui.Diagram`

The diagram instance which fired the event.

### mouseLeave

Fired when the mouse leaves a shape or a connection.

Will not fire for disabled items.

> Available in version 2014.3.1307 and later

#### Event Data

##### e.item `kendo.dataviz.diagram.Shape` | `kendo.dataviz.diagram.Connection`

The target shape or connection.

##### e.sender `kendo.dataviz.ui.Diagram`

The diagram instance which fired the event.

### pan

Fired when the user pans the diagram.

#### Event Data

##### pan `kendo.dataviz.diagram.Point`

A point representing the pan distance.

##### e.sender `kendo.dataviz.ui.Diagram`

The widget instance which fired the event.

### remove

Fired when the user removes a shape or connection.

#### Event Data

##### e.connection `kendo.dataviz.diagram.Connection`

The connection that will be removed.

##### e.shape `kendo.dataviz.diagram.Shape`

The shape that will be removed.

##### e.preventDefault `Function`

Prevents the remove action. If called, the element will not be removed to the diagram.

##### e.sender `kendo.dataviz.ui.Diagram`

The widget instance which fired the event.

### save

Fired when the user saved a shape or a connection.

#### Event Data

##### e.container `jQuery`

The jQuery object representing the container element. That element contains the editing UI.

##### e.connection `kendo.data.Model`

The dataItem to which connection is bound.

##### e.shape `kendo.data.Model`

The dataItem to which shape is bound.

##### e.sender `kendo.dataviz.ui.Diagram`

The widget instance which fired the event.

### select

Fired when the user selects one or more items.

#### Event Data

##### e.selected `Array`

The selected items (shapes and connections).

##### e.deselected `Array`

The rest of the items (shapes and connections).

##### e.sender `kendo.dataviz.ui.Diagram`

The widget instance which fired the event.

### zoomEnd

Fired when the user changes the diagram zoom level.

#### Event Data

##### e.point `kendo.dataviz.diagram.Point`

The zoom center.

##### e.sender `kendo.dataviz.ui.Diagram`

The widget instance which fired the event.

##### e.zoom `Number`

The current zoom level.

### zoomStart

Fired when the user starts changing the diagram zoom level.

#### Event Data

##### e.point `kendo.dataviz.diagram.Point`

The zoom center.

##### e.sender `kendo.dataviz.ui.Diagram`

The widget instance which fired the event.

##### e.zoom `Number`

The current zoom level.

