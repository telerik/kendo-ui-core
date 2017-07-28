---
title: Diagram
page_title: Diagram | UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the Diagram HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_diagram_aspnetcore
---

# Diagram HtmlHelper Overview

The Diagram HtmlHelper extension is a server-side wrapper for the [Kendo UI Diagram](https://demos.telerik.com/kendo-ui/diagram/index) widget.

For more information on the HtmlHelper, refer to the article on the [Diagram HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/diagram/overview).

## Configuration

The following example demonstrates the basic configuration for the Diagram.

###### Example

```
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

You can subscribe to all Diagram [events](http://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/diagram#events).

The following example demonstrates how to subscribe to events by a handler name.

###### Example

```
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

## Reference

### Existing Instances

To reference an existing Kendo UI Diagram instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [Diagram API](http://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/diagram#methods) to control its behavior.

The following example demonstrates how to access an existing Diagram instance.

###### Example

        //Put this after your Kendo UI Diagram for ASP.NET Core declaration.
        <script>
            $(function() {
                //Notice that the Name() of the Diagram is used to get its client-side instance.
                var diagram = $("#diagram").data("kendoDiagram");
            });
        </script>

## See Also

* [Overview of the JavaScript Kendo UI Diagram Widget](http://docs.telerik.com/kendo-ui/controls/diagrams-and-maps/diagram/overview)
* [Overview of Telerik UI for ASP.NET Core - RC1]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET MVC in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET MVC in ASP.NET Core Projects on Linux]({% slug gettingstartedlinux_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
