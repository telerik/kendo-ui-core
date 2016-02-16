---
title: Editing
page_title: Editing | Kendo UI Diagram
description: "Learn how to enable the editing functionality of the Kendo UI Diagram widget."
slug: editing_kendoui_diagram_widget
position: 2
---

# Editing

By enabling the editing support for the [Kendo UI Diagram widget](http://demos.telerik.com/kendo-ui/diagram/index), you can add tools and shape forms to it, and take full advantage of its layout options, which adds value to your application or website.

## Enable Editing Support

To enable the editing support for Kendo UI Diagram widget, perform the steps below.

### Configure DataSource for Remote CRUD Operations

The example below demonstrates how to configure the Kendo UI dataSource (shapeDataSource) for remote CRUD (Create, Read, Update, Destroy) data operations.

###### Example

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

### Configure `connectionsDataSource` for Remote CRUD Operations

Configure the `connectionsDataSource` for remote CRUD data operations in the way demonstrated by the example below. Note that without the `connectionsDataSource`, the editing support is going to be turned off.

###### Example

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

### Declare Fields Definition: dataSource schema

Declare the fields definition through the `dataSource schema`, as demonstrated below.

###### Example

    var dataSource = new kendo.data.DataSource({
      //..
      model: {
        id: "id",
        fields: {
		  // this field will not be editable (default value is true)
          id: { from: "Id", type: "number", editable: false },
          JobTitle: { type: "string" },
          Color: { type: "string" }
        }
      }
    });

### Declare Fields Definition: connectionsDataSource schema

Declare the fields definition through the `connectionsDataSource schema`, as demonstrated below.

###### Example

    var connectionsDataSource = new kendo.data.DataSource({
      //..
      model: {
        id: "id",
        fields: {
		  // this field will not be editable (default value is true)
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

## Configure Toolbar

If you want to enable new records insertion, configure the Toolbar, as demonstrated below. The `createShape` is added by default.

###### Example

    $("#diagram").kendoDiagram({
      dataSource: dataSource,
      connectionsDataSource: connectionsDataSource,
      editable: {
        tools: ["createShape", "createConnection"]       
	  }
    });

### Add Delete Tool

If you want to be able to delete records, add a delete tool, as demonstrated below.

###### Example

    $("#diagram").kendoDiagram({
      dataSource: dataSource,
      connectionsDataSource: connectionsDataSource,
      editable: {
        tools: ["delete"]       
	  }
    });

## Model Fields

### Shape Model Fields

The shape model has the following fields:

* id `Number`&mdash;The unique identifier of the shape. Shape without `id` field will not be connected.
* type `String`&mdash;The shape type
* text `String`&mdash;The shape text
* x `Number`&mdash;The shape `x` position
* y `Number`&mdash;The shape `y` position
* width `Number`&mdash;The shape width
* height `Number`&mdash;The shape height

Each field gets updated upon user interaction. All fields except `id` are optional.

The example below demonstrates the DataSource `model` definition.

###### Example

	schema: {
	  model: {
		id: "id", // The "id" of the shape is the "id" field. Mandatory.
		fields: {
		  // Describe the shape fields and map them to the fields returned by the remote service
		  id: {
		    // The 'Id' server-side field is mapped to the 'id' client-side field
		    from: "Id", type: "number"
		  },
		  text: {
		    // The 'Text' server-side field is mapped to the 'text' client-side field
		    from: "Text", type: "string"
		  },
		  type: {
		    // The 'Type' server-side field is mapped to the 'type' client-side field
		    from: "Type", type: "string"
		  },
		  x: {
		    // The 'X' server-side field is mapped to the 'x' client-side field
		    from: "X", type: "number"
		  },
		  y: {
		    // The 'Y' server-side field is mapped to the 'y' client-side field
		    from: "Y", type: "number"
		  },
		  width: {
		    // The 'Width' server-side field is mapped to the 'width' client-side field
		    from: "Width", type: "number"
		  },
		  height: {
		    // The 'Height' server-side field is mapped to the 'height' client-side field
		    from: "Height", type: "number"
		  }
		}
	  }
	}

### Connection Model Fields

The connection model has the following fields:

* id `Number`&mdash;The unique identifier of the connection
* text `String`&mdash;The connection text
* from `Number`&mdash;The connection from shape `id`
* to `Number`&mdash;The connection to shape `id`
* fromX `Number`&mdash;The connection from `x` position. If `from` is set, this position is not applied.
* fromY `Number`&mdash;The connection from `y` position. If `from` is set, this position is not applied.
* toX `Number`&mdash;The connection to `x` position. If `from` is set, this position is not applied.
* toY `Number`&mdash;The connection to `y` position. If `from` is set, this position is not applied.
* fromConnector `String`&mdash;The name of the source shape connector.
* toConnector `String`&mdash;The name of the target shape connector.

Each field gets updated upon user interaction.

The example below demonstrates the `connectionsDataSource model` definition.

###### Example

	schema: {
	  model: {
		id: "id", // The "id" of the connection is the "id" field.
		fields: {
		  // Describe the connection fields and map them to the fields returned by the remote service
		  id: {
		    // The 'Id' server-side field is mapped to the 'id' client-side field
		    from: "Id", type: "number"
		  },
		  text: {
		    // The 'Text' server-side field is mapped to the 'text' client-side field
		    from: "Text", type: "string"
		  },
		  from: {
		    // The 'From' server-side field is mapped to the 'from' client-side field
		    from: "From", type: "number"
		  },
		  fromX: {
		    // The 'FromX' server-side field is mapped to the 'fromX' client-side field
		    from: "FromX", type: "number"
		  },
		  fromY: {
		    // The 'FromY' server-side field is mapped to the 'fromY' client-side field
		    from: "FromY", type: "number"
		  },
		  to: {
		    // The 'To' server-side field is mapped to the 'to' client-side field
		    from: "To", type: "number"
		  },
		  toX: {
		    // The 'ToX' server-side field is mapped to the 'toX' client-side field
		    from: "ToX", type: "number"
		  },
		  toY: {
		    // The 'ToY' server-side field is mapped to the 'toY' client-side field
		    from: "ToY", type: "number"
		  },
		  fromConnector: {
		    // The 'FromConnector' server-side field is mapped to the 'fromConnector' client-side field
		    from: "FromConnector", type: "string"
		  },
		  toConnector: {
		    // The 'ToConnector' server-side field is mapped to the 'toConnector' client-side field
		    from: "ToConnector", type: "string"
		  }
		}
	  }
	}

## See Also

Other articles on Kendo UI Diagram:

* [Overview of the Diagram Widget]({% slug overview_kendoui_diagram_widget %})
* [Diagram JavaScript API Reference](/api/javascript/dataviz/ui/diagram)
