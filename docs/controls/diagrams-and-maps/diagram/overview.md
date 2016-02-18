---
title: Overview
page_title: Overview | Kendo UI Diagram
description: "Learn how to initialize the Kendo UI Diagram widget, add diagram elements, change properties and get an overview of its major features."
slug: overview_kendoui_diagram_widget
position: 1
---

# Diagram Overview

The [Kendo UI Diagram widget](http://demos.telerik.com/kendo-ui/diagram/index) represents information in a schematic way and according to particular visualization techniques.

## Getting Started

### Create the Diagram

Create a Kendo UI Diagram widget by using a simple `div` and optionally set a height and width via CSS.

###### Example

    <div id="diagram"></div>

### Initialize the Diagram

Initialize the Diagram with its default configuration as demonstrated in the example below.

###### Example

       $(document).ready(function() {
           $("#diagram").kendoDiagram();
       });

This renders an empty diagramming surface and unless you look at the resulting HTML you will not see any visual changes. The actual diagramming API can be accessed by calling the `data()` method, as demonstrated below.

###### Example

     var diagram = $("#diagram").kendoDiagram().data("kendoDiagram");

## Configuration

### Add Shapes

To add a rectangular shape to the diagram, call the `addShape()` method (`diagram.addShape();`), which renders a rectangle in the upper-left corner of the diagram surface. To have a different initial position, call the `addShape()` method with an additional Point parameter, as demonstrated in the example below.

###### Example

    var Point = kendo.dataviz.diagram.Point;
    diagram.addShape(new Point(100,220));

Additional properties can be specified via the `options` parameter.

The example below demonstrates how to set the background color of the shape.

###### Example

    diagram.addShape(new Point(100,220), { background: "red" });

For detailed information on the Diagram options, refer to the [Kendo UI Diagram API reference on shapes](/api/javascript/dataviz/diagram/shape).

The `addShape()` method also accepts a `shape` instance, so you can also add a new shape, as shown below.

###### Example

    var Point = kendo.dataviz.diagram.Point;
    var shapeInstance = new kendo.diagram.Shape();
    var shape = diagram.addShape(shape);
    shape.position(new Point(100,220));

### Add Connections

Shapes can be connected using the `connect()` method.

###### Example

    var Point = kendo.dataviz.diagram.Point;
    var shape1 = diagram.addShape(new Point(100,100));
    var shape2 = diagram.addShape(new Point(300,100));
    var connection = diagram.connect(shape1, shape2);

The result is similar to the one below.

**Figure 1. Diagram connected shapes.**

![Two shapes connected.](/controls/diagrams-and-maps/diagram/diagram-connection.png)

### Set Layout

The Diagram layout is the automatic organization of a diagram based on how its shapes are connected, which is the so-called incidence structure. The `layout()` method is the gateway to a variety of layout algorithms.

The example below demonstrates the effect of the `layout` method by generating a random diagram and calling the method.

###### Example

    diagram.randomDiagram();

    // call the layout method
    diagram.layout();

The default layout algorithm is the top-down tree layout. You are able to change this to another type and subtype by inserting it in the layout options, as demonstrated below.

###### Example

    diagram.layout({ type: "ForceDirected" });

For detailed information on the layout types and options, refer to the [Kendo UI Diagram API reference on layout](/api/javascript/dataviz/diagram/layout).

## Configuration

### Data Binding

This section requires that you are comfortable with the [general overview on the way data binding in Kendo UI works]({% slug overview_kendoui_datasourcecomponent %}), as Kendo UI dataSource is an essential concept that applies to the diagramming framework.

You are able to define and customize data binding in various ways. To create a hierarchical Diagram, the easiest way is to pass a dataSource as an option together with a Kendo UI template, as demonstrated in the example below.

###### Example

    var diagram = $("#diagram").kendoDiagram({
        theme: "default",
        dataSource: [{
          "name": "Telerik",
          "items": [{
            "name": "Kendo"
          }, {
            "name": "Icenium"
          }]
        }],
        shapeDefaults: {
          content: {
            template: "#= item.name #"
          }
        }
    }).data("kendoDiagram");
    diagram.layout();

This produces a tree diagram with default rectangular shapes. Alternatively, you can also define the data binding through the `setDataSource` method.

###### Example

    diagram.options.template = "#= item.name #";
    diagram.setDataSource([{"name": ... }]);

If you need more flexibility, you are fully able to control where and how data is displayed by defining the `visualTemplate` option rather than the `template` option. This entails the creation of a function, which returns a visual, usually a Group, element containing other visuals bound to your data.

The example below demonstrates how to reproduce the same diagram with ellipses rather than with the previous rectangular shapes.

###### Example

    var visualTemplate = function(options) {
      var dataviz = kendo.dataviz,
          dataItem = options.dataItem;

      var g = new dataviz.diagram.Group({
        autoSize: true
      });

      var r = new dataviz.diagram.Circle({
        width: 100,
        height: 60,
        background: "LimeGreen"
      });

      g.append(r);

      var fn = new dataviz.diagram.TextBlock({
        text: dataItem.name,
        color: "#ffffff",
        fontSize: 16,
        x: 30,
        y: 30
      });

      g.append(fn);
      return g;
    };

    var diagram = $("#diagram").kendoDiagram({
      dataSource: [{
        "name": "Telerik",
        "items": [{
          "name": "Kendo"
        }, {
          "name": "Icenium"
        }]
      }],
      shapeDefaults: {
        visual: visualTemplate
      }
    }).data("kendoDiagram");
    diagram.layout();

Note that the function, returning a visual, has a parameter containing the data item to be displayed.

## See Also

Other articles and how-to examples on Kendo UI Diagram:

* [Overview of the ASP.NET MVC HtmlHelper Extension for the Diagram Widget](/aspnet-mvc/helpers/diagram/overview)
* [Overview of the Diagram JSP Tag]({% slug overview_diagram_uiforjsp %})
* [Overview of the Diagram PHP Class](/php/widgets/diagram/overview)
* [How to Change Shape Visual Elements Dynamically]({% slug howto_changeshapevisualelements_dynamically_diagram %})
* [How to Drag and Drop on Shapes]({% slug howto_draganddrop_onshapes_diagram %})
* [How to Implement Local Data Editing]({% slug howto_editlocaladata_diagram %})
* [How to Render External Content in Shapes]({% slug howto_renderexternalcontent_inshapes_diagram %})
* [How to Use Scrollbars]({% slug howto_usescrollbar_diagram %})
* [How to Wrap Text]({% slug howto_wraptext_diagram %})
* [Diagram JavaScript API Reference](/api/javascript/dataviz/ui/diagram)
