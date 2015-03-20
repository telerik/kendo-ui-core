---
title: Editing
page_title: Documentation for enabling editing in Kendo UI Diagram widget
description: Which steps to follow in order to enable the editing support of Kendo UI Diagram widget.
position: 3
---

# Diagram Editing

To enable the editing support of KendoUI Diagram widget the following steps should be performed:

## Configure the dataSource(shapeDataSource) for remote CRUD (Create, Read, Update, Destroy) data operations:

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

## Configure the connectionsDataSource for remote CRUD (Create, Read, Update, Destroy) data operations(without connectionsDataSource the editing will be turned off):

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

## Declare fields definition through the dataSource schema:

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

## Declare fields definition through the connectionsDataSource schema:

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

## If you want to enable new records insertion, you should configure the toolbar(the createShape will be added by default):

    $("#diagram").kendoDiagram({
      dataSource: dataSource,
      connectionsDataSource: connectionsDataSource,
      editable: {
        tools: ["createShape", "createConnection"]       
	  }
    });

## In order to be able to delete records, you should add a delete tool:

    $("#diagram").kendoDiagram({
      dataSource: dataSource,
      connectionsDataSource: connectionsDataSource,
      editable: {
        tools: ["delete"]       
	  }
    });

## The fields of the shape model

The shape model has the following fields:

* id `Number` - the unique identifier of the shape. Shape without `id` field will not be connected.
* type `String` - the shape type.
* text `String` - the shape text.
* x `Number` - the shape x position.
* y `Number` - the shape y position.
* width `Number` - the shape width.
* height `Number` - the shape height.

Each field will be updated with user interaction. All fields except `id` are not required. DataSource model definition:

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

## The fields of the connection model

The connection model has the following fields:

* id `Number` - the unique identifier of the connection.
* text `String` - the connection text.
* from `Number` - the connection from shape id.
* to `Number` - the connection to shape id.
* fromX `Number` - the connection from x position. (If from is set this position will not be applied)
* fromY `Number` - the connection from y position. (If from is set this position will not be applied)
* toX `Number` - the connection to x position. (If from is set this position will not be applied)
* toY `Number` - the connection to y position. (If from is set this position will not be applied)

Each field will be updated with user interaction. ConnectionsDataSource model definition:

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
		  }
		}
	  }
	}
