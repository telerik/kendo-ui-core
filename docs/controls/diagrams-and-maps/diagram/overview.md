---
title: Overview
page_title: jQuery Diagram Documentation | Diagram Overview
description: "Get started with the jQuery Diagram by Kendo UI and learn how to create, initialize, and enable the widget."
slug: overview_kendoui_diagram_widget
position: 1
---

# Diagram Overview

The Diagram represents information in a schematic way and according to particular visualization techniques.

* [Demo page for the Diagram](https://demos.telerik.com/kendo-ui/diagram/index)

## Basic Configuration

To create a Diagram, use a `div` element and optionally set a height and width via CSS.

    <div id="diagram"></div>

The following example demonstrates how to initialize the Diagram with its default configuration. The widget will render an empty diagramming surface and the changes will be visible only in the resulting HTML.

       $(document).ready(function() {
           $("#diagram").kendoDiagram();
       });

To access the actual diagramming API, call the `data()` method.

     var diagram = $("#diagram").kendoDiagram().data("kendoDiagram");

## Functionality and Features

* [Data binding]({% slug binding_kendoui_diagram %})
* [Editing]({% slug editing_kendoui_diagram_widget %})
* [Layout]({% slug layout_kendoui_diagram %})
* [Shapes]({% slug shapes_kendoui_diagram %})

## See Also

* [Basic Usage of the Diagram (Demo)](https://demos.telerik.com/kendo-ui/diagram/index)
* [JavaScript API Reference of the Diagram](/api/javascript/dataviz/ui/diagram)
