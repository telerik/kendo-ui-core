---
title: Data Binding
page_title: jQuery Diagram Documentation | Data Binding
description: "Get started with the jQuery Diagram by Kendo UI and learn how to bind the widget to data."
slug: binding_kendoui_diagram
position: 2
---

# Data Binding

The Diagram provides options for binding it to data.

> Make sure that you are familiar with the [Kendo UI for jQuery DataSource component]({% slug overview_kendoui_datasourcecomponent %}).

To create a hierarchical Diagram, pass a Kendo UI template and a data source as an option.

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

The previous example produces a tree diagram with default rectangular shapes. Alternatively, you can also define the data binding through the `setDataSource` method.

    diagram.options.template = "#= item.name #";
    diagram.setDataSource([{"name": ... }]);

To provide more flexibility, you can control the location and the way to display the data by defining the `visualTemplate` option. This approach requires the creation of a function which returns a visual element (usually a Group) that contains other visuals which are bound to your data.

The following example demonstrates how to reproduce the same Diagram with ellipses instead with rectangular shapes. The function which returns a visual has a parameter that contains the data item which will be displayed.

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

## See Also

* [Basic Usage of the Diagram (Demo)](https://demos.telerik.com/kendo-ui/diagram/index)
* [JavaScript API Reference of the Diagram](/api/javascript/dataviz/ui/diagram)
