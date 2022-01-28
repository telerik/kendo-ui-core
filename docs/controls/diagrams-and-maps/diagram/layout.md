---
title: Layout
page_title: jQuery Diagram Documentation | Layout
description: "Get started with the jQuery Diagram by Kendo UI and use its built-in layout options."
slug: layout_kendoui_diagram
position: 4
---

# Layout

The layout of the Diagram is its automatic organization based on the way its shapes are connected.

The Diagram layout is also called an "incidence structure". The `Layout()` method is the gateway to a variety of layout algorithms.

The following example demonstrates how the `Layout` method generates a random Diagram and calls the method.

    diagram.randomDiagram();
    // Call the layout method.
    diagram.layout();

The default layout algorithm is the top-down tree layout. To change the default types to another type and subtype, insert it in the layout options. For more information, refer to the [`layout` API reference](/api/javascript/dataviz/ui/diagram/configuration/layout).

    diagram.layout({ type: "ForceDirected" });

## See Also

* [Using the Built-In Layouts of the Diagram (Demo)](https://demos.telerik.com/kendo-ui/diagram/layout)
* [JavaScript API Reference of the Diagram](/api/javascript/dataviz/ui/diagram)
