---
title: Overview
page_title: Overview | Kendo UI Diagram HtmlHelper
description: "Get started with the server-side wrapper for the Kendo UI Diagram widget for ASP.NET MVC."
slug: overview_diagramhelper_aspnetmvc
position: 1
---

# Diagram HtmlHelper Overview

The Diagram HtmlHelper extension is a server-side wrapper for the [Kendo UI Diagram](https://demos.telerik.com/kendo-ui/diagram/index) widget.

## Getting Started

### The Basics

The Kendo UI Diagram for ASP.NET MVC can be bound through Ajax binding. This means that the Diagram makes Ajax requests to get the data.

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI Diagram for ASP.NET MVC.

**Step 1** Return the data as JSON.

###### Example

        public ActionResult _OrgChart()
        {
            return Json(DiagramDataRepository.OrgChart(), JsonRequestBehavior.AllowGet);
        }

<!--_-->
**Step 2** In the view, configure the Diagram to use the action method created in the previous step.

###### Example 

```tab-ASPX

        <%= Html.Kendo().Diagram()
                .Name("diagram")
                .DataSource(dataSource => dataSource
                    .Read(read => read
                        .Action("_OrgChart", "Diagram") //Specify the action method and controller names.
                    )
                    .Model(m => m.Children("Items"))
                )
                .Layout(l => l.Type(DiagramLayoutType.Layered))
        %>

```
```tab-Razor

        @(Html.Kendo().Diagram()
                .Name("diagram")
                .DataSource(dataSource => dataSource
                    .Read(read => read
                        .Action("_OrgChart", "Diagram") //Specify the action method and controller names.
                    )
                    .Model(m => m.Children("Items"))
                )
                .Layout(l => l.Type(DiagramLayoutType.Layered))
        )

```

## Event Handling

You can subscribe to all Diagram [events](/api/javascript/dataviz/ui/diagram#events).

### By Handler Name

The examples below demonstrates how to subscribe to events by a handler name.

###### Example

```tab-ASPX

        <%= Html.Kendo().Diagram()
                .Name("diagram")
                .DataSource(dataSource => dataSource
                    .Read(read => read
                        .Action("_OrgChart", "Diagram") //Specify the action method and controller names.
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
                // Handle the click event
            }
        </script>
```
```tab-Razor

    @(Html.Kendo().Diagram()
          .Name("diagram")
          .DataSource(dataSource => dataSource
              .Read(read => read
                  .Action("_OrgChart", "Diagram") //Specify the action method and controller names.
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
            // Handle the click event
        }
    </script>
```

### By Template Delegate

The example below demonstrates how to subscribe to events by a template delegate.

###### Example

```tab-Razor

    @(Html.Kendo().Diagram()
          .Name("diagram")
          .Events(e => e
              .Click(@<text>
                   function() {
                       //Handle the click event inline.
                   }
              </text>)
          )
    )
```

## Reference

### Existing Instances

You can reference an existing Kendo UI Diagram instance via [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [Diagram API](/api/javascript/dataviz/ui/diagram#methods) to control its behavior.

###### Example

        //Put this after your Kendo UI Diagram for ASP.NET MVC declaration.
        <script>
            $(function() {
                //Notice that the Name() of the Diagram is used to get its client-side instance.
                var diagram = $("#diagram").data("kendoDiagram");
            });
        </script>

## See Also

Other articles on Telerik UI for ASP.NET MVC and on the Diagram:

* [ASP.NET MVC API Reference: DiagramBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/DiagramBuilder)
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Overview of the Kendo UI Diagram Widget]({% slug overview_kendoui_diagram_widget %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/aspnet-mvc/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_autocompletehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
