---
title: Overview
page_title: Overview
description: "Get started with the server-side wrapper for the Telerik UI Diagram HtmlHelper for {{ site.framework }}."
previous_url: /helpers/diagrams-and-maps/diagram/overview
slug: htmlhelpers_diagram_aspnetcore
position: 1
---

# Diagram HtmlHelper Overview

The Telerik UI Diagram HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI Diagram widget.

The Diagram represents information in a schematic way and according to particular visualization techniques.

* [Demo page for the Diagram](https://demos.telerik.com/{{ site.platform }}/diagram)

## Basic Configuration

1. Return the data as JSON.

        public ActionResult _OrgChart()
        {
            return Json(DiagramDataRepository.OrgChart(), JsonRequestBehavior.AllowGet);
        }

1. In the view, configure the Diagram to use the action method that was created in the previous step.

    ```Razor
        @(Html.Kendo().Diagram()
            .Name("diagram")
            .DataSource(dataSource => dataSource
                .Read(read => read
                    .Action("_OrgChart", "Diagram") // Specify the action method and controller names.
                )
                .Model(m => m.Children("Items"))
            )
            .Layout(l => l.Type(DiagramLayoutType.Layered))
        )
    ```

## Functionality and Features

* [Data binding]({% slug htmlhelpers_diagram_aspnetcore_binding %})
* [Editing]({% slug htmlhelpers_diagram_aspnetcore_editing %})
* [Layout]({% slug htmlhelpers_diagram_aspnetcore_layout %})
* [Shapes]({% slug htmlhelpers_diagram_aspnetcore_shapes_connections %})
* [PDF export]({% slug htmlhelpers_diagram_aspnetcore_pdf_export %})
* [Advanced export]({% slug htmlhelpers_diagram_aspnetcore_export %})

## Events

You can subscribe to all Diagram [events](/api/diagram). For a complete example on basic Diagram events, refer to the [demo on using the events of the Diagram](https://demos.telerik.com/{{ site.platform }}/diagram/events).

## Referencing Existing Instances

To reference an existing Kendo UI Diagram instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [Diagram client-side API](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/diagram#methods) to control its behavior.

        // Place the following after the Diagram for {{ site.framework }} declaration.
        <script>
            $(function() {
                // The Name() of the Diagram is used to get its client-side instance.
                var diagram = $("#diagram").data("kendoDiagram");
            });
        </script>

## See Also

* [Basic Usage of the Diagram HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/diagram)
* [Server-Side API](/api/diagram)
