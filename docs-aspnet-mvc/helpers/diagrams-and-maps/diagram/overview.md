---
title: Overview
page_title: Diagram Overview | Telerik UI for ASP.NET MVC HTML Helpers
description: "Get started with the server-side wrapper for the Telerik UI Diagram HtmlHelper for ASP.NET MVC."
slug: overview_diagramhelper_aspnetmvc
position: 1
---

# Diagram HtmlHelper Overview

The Telerik UI Diagram HtmlHelper for ASP.NET MVC is a server-side wrapper for the Kendo UI Diagram widget.

The Diagram represents information in a schematic way and according to particular visualization techniques.

* [Demo page for the Diagram](https://demos.telerik.com/aspnet-mvc/diagram)

## Basic Configuration

1. Return the data as JSON.

        public ActionResult _OrgChart()
        {
            return Json(DiagramDataRepository.OrgChart(), JsonRequestBehavior.AllowGet);
        }

1. In the view, configure the Diagram to use the action method that was created in the previous step.

    ```ASPX
        <%= Html.Kendo().Diagram()
            .Name("diagram")
            .DataSource(dataSource => dataSource
                .Read(read => read
                    .Action("_OrgChart", "Diagram") // Specify the action method and controller names.
                )
                .Model(m => m.Children("Items"))
            )
            .Layout(l => l.Type(DiagramLayoutType.Layered))
        %>
    ```
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

## Events

You can subscribe to all Diagram [events](/api/diagram). For a complete example on basic Diagram events, refer to the [demo on using the events of the Diagram](https://demos.telerik.com/aspnet-mvc/diagram/events).

### Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```ASPX
    <%= Html.Kendo().Diagram()
            .Name("diagram")
            .DataSource(dataSource => dataSource
                .Read(read => read
                    .Action("_OrgChart", "Diagram") // Specify the action method and controller names.
                )
                .Model(m => m.Children("Items"))
            )
            .Layout(l => l.Type(DiagramLayoutType.Layered))
            .Events(e => e
                .Click("diagram_click")
            )
    %>

    <script>
        function diagram_click() {
            // Handle the click event.
        }
    </script>
```
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
          .Events(e => e
              .Click("diagram_click")
          )
    )

    <script>
        function diagram_click() {
            // Handle the click event.
        }
    </script>
```

### Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

    @(Html.Kendo().Diagram()
        .Name("diagram")
        .Events(e => e
            .Click(@<text>
                function() {
                    // Handle the click event inline.
                }
            </text>)
        )
    )

## Referencing Existing Instances

To reference an existing Kendo UI Diagram instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [Diagram API](http://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/diagram#methods) to control its behavior.

        // Place the following after the Diagram for ASP.NET MVC declaration.
        <script>
            $(function() {
                // The Name() of the Diagram is used to get its client-side instance.
                var diagram = $("#diagram").data("kendoDiagram");
            });
        </script>

## See Also

* [Basic Usage of the Diagram HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/diagram)
* [Server-Side API](/api/diagram)
