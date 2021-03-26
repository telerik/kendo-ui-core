---
title: Editing
page_title: jQuery Diagram Documentation | Editing
description: "Get started with the jQuery Diagram by Kendo UI and enable its editing functionality."
slug: editing_kendoui_diagram_widget
position: 3
---

# Editing

The Diagram provides editing options which enable you to add tools and shapes to it, and use its layout options.

## Getting Started

To enable the editing functionality of the Diagram:

1. Configure the DataSource for remote CRUD operations.

        var dataSource = new kendo.data.DataSource({
          transport: {
            read: {
              url: "/DiagramShapes",
              dataType: "jsonp"
            },
            update: {
              url: "/DiagramShapes/Update",
              dataType: "jsonp"
            },
            destroy: {
              url: "/DiagramShapes/Destroy",
              dataType: "jsonp"
            },
            create: {
              url: "/DiagramShapes/Create",
              dataType: "jsonp"
            },
            //...
    	  }
        });

1. Configure `connectionsDataSource` for remote CRUD operations. Without setting the `ConnectionsDataSource`, editing is disabled.

        var connectionsDataSource = new kendo.data.DataSource({
          transport: {
            read: {
              url: "/DiagramConnections",
              dataType: "jsonp"
            },
            update: {
              url: "/DiagramConnections/Update",
              dataType: "jsonp"
            },
            destroy: {
              url: "/DiagramConnections/Destroy",
              dataType: "jsonp"
            },
            create: {
              url: "/DiagramConnections/Create",
              dataType: "jsonp"
            },
            //...
    	  }
        });

1. Declare the fields definition by using the `schema` of the DataSource.

        var dataSource = new kendo.data.DataSource({
          //..
          model: {
            id: "id",
            fields: {
    		  // This field will not be editable. The default value is true.
              id: { from: "Id", type: "number", editable: false },
              JobTitle: { type: "string" },
              Color: { type: "string" }
            }
          }
        });

1. Declare fields definition by using the `schema` of the `connectionsDataSource`.

    var connectionsDataSource = new kendo.data.DataSource({
      //..
      model: {
        id: "id",
        fields: {
		  // This field will not be editable. The default value is true.
          id: { from: "Id", type: "number", editable: false },
          from: { from: "FromShapeId", type: "number" },
          to: { from: "ToShapeId", type: "number" },
          fromX: { from: "FromPointX", type: "number" },
          fromY: { from: "FromPointY", type: "number" },
          toX: { from: "ToPointX", type: "number" },
          toY: { from: "ToPointY", type: "number" }
        }
      }
    });

1. Enable the insertion of new record by configuring the toolbar. The `createShape` is added by default.

    $("#diagram").kendoDiagram({
      dataSource: dataSource,
      connectionsDataSource: connectionsDataSource,
      editable: {
        tools: ["createShape", "createConnection"]       
	  }
    });

1. Enable the deletion of records by adding a delete tool.

    $("#diagram").kendoDiagram({
      dataSource: dataSource,
      connectionsDataSource: connectionsDataSource,
      editable: {
        tools: ["delete"]       
	  }
    });

## Model Fields


### Shape Model

The shape model provides the following fields:

* `id` (Number)&mdash;A mandatory field. Represents the unique identifier of the shape. A shape without an `id` field will not be connected.
* `type` (String)&mdash;The shape type.
* `text` (String)&mdash;The shape text.
* `x` (Number)&mdash;The `x` position of the shape.
* `y` (Number)&mdash;The `y` position of the shape.
* `width` (Number)&mdash;The shape width.
* `height` (Number)&mdash;The shape height.

Each shape model field gets updated upon user interaction.

The following example demonstrates the DataSource `model` definition.

	schema: {
	  model: {
		id: "id", // The "id" of the shape is the "id" field. Mandatory.
		fields: {
		  // Describe the shape fields and map them to the fields that are returned by the remote service.
		  id: {
		    // The 'Id' server-side field is mapped to the 'id' client-side field.
		    from: "Id", type: "number"
		  },
		  text: {
		    // The 'Text' server-side field is mapped to the 'text' client-side field.
		    from: "Text", type: "string"
		  },
		  type: {
		    // The 'Type' server-side field is mapped to the 'type' client-side field.
		    from: "Type", type: "string"
		  },
		  x: {
		    // The 'X' server-side field is mapped to the 'x' client-side field.
		    from: "X", type: "number"
		  },
		  y: {
		    // The 'Y' server-side field is mapped to the 'y' client-side field.
		    from: "Y", type: "number"
		  },
		  width: {
		    // The 'Width' server-side field is mapped to the 'width' client-side field.
		    from: "Width", type: "number"
		  },
		  height: {
		    // The 'Height' server-side field is mapped to the 'height' client-side field.
		    from: "Height", type: "number"
		  }
		}
	  }
	}

### Connection Model

The connection model provides the following fields:

* `id` (Number)&mdash;The unique identifier of the connection.
* `text` (String)&mdash;The connection text.
* `from` (Number)&mdash;The connection from shape `id`.
* `to` (Number)&mdash;The connection to shape `id`.
* `fromX` (Number)&mdash;The connection from `x` position. If `from` is set, this position is not applied.
* `fromY` (Number)&mdash;The connection from `y` position. If `from` is set, this position is not applied.
* `toX` (Number)&mdash;The connection to `x` position. If `from` is set, this position is not applied.
* `toY` (Number)&mdash;The connection to `y` position. If `from` is set, this position is not applied.
* `fromConnector` (String)&mdash;The name of the source shape connector.
* `toConnector` (String)&mdash;The name of the target shape connector.

Each connection model field gets updated upon user interaction.

The following example demonstrates the `connectionsDataSource model` definition.

	schema: {
	  model: {
		id: "id", // The "id" of the connection is the "id" field.
		fields: {
		  // Describe the connection fields and map them to the fields that are returned by the remote service.
		  id: {
		    // The 'Id' server-side field is mapped to the 'id' client-side field
		    from: "Id", type: "number"
		  },
		  text: {
		    // The 'Text' server-side field is mapped to the 'text' client-side field.
		    from: "Text", type: "string"
		  },
		  from: {
		    // The 'From' server-side field is mapped to the 'from' client-side field.
		    from: "From", type: "number"
		  },
		  fromX: {
		    // The 'FromX' server-side field is mapped to the 'fromX' client-side field.
		    from: "FromX", type: "number"
		  },
		  fromY: {
		    // The 'FromY' server-side field is mapped to the 'fromY' client-side field.
		    from: "FromY", type: "number"
		  },
		  to: {
		    // The 'To' server-side field is mapped to the 'to' client-side field.
		    from: "To", type: "number"
		  },
		  toX: {
		    // The 'ToX' server-side field is mapped to the 'toX' client-side field.
		    from: "ToX", type: "number"
		  },
		  toY: {
		    // The 'ToY' server-side field is mapped to the 'toY' client-side field.
		    from: "ToY", type: "number"
		  },
		  fromConnector: {
		    // The 'FromConnector' server-side field is mapped to the 'fromConnector' client-side field.
		    from: "FromConnector", type: "string"
		  },
		  toConnector: {
		    // The 'ToConnector' server-side field is mapped to the 'toConnector' client-side field.
		    from: "ToConnector", type: "string"
		  }
		}
	  }
	}

## See Also

* [Editing in the Diagram (Demo)](https://demos.telerik.com/kendo-ui/diagram/editing)
* [Diagram JavaScript API Reference](/api/javascript/dataviz/ui/diagram)
