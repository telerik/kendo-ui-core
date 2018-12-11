---
title: Overview
page_title: Splitter | Telerik UI for ASP.NET MVC HtmlHelpers
description: "Get started with the server-side wrapper for the Kendo UI Splitter widget for ASP.NET MVC."
slug: overview_splitterhelper_aspnetmvc
position: 1
---

# Splitter HtmlHelper Overview

The Splitter HtmlHelper extension is a server-side wrapper for the [Kendo UI Splitter](https://demos.telerik.com/kendo-ui/splitter/index) widget.

## Configuration

Below are listed the steps for you to follow when configuring the Kendo UI Splitter.

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).

1. Create a new action method which renders the view.

    ###### Example

        public ActionResult Index()
        {
            return View();
        }

1. Add a Splitter.

    ```ASPX
        <%: Html.Kendo().Splitter()
            .Name("splitter") //The name of the Splitter is mandatory. It specifies the "id" attribute of the widget.
            .Panes(panes =>
            {
                panes.Add().Content("Item 1"); //Add the pane.
                panes.Add().Content("Item 2"); //Add the pane.
            })
        %>
    ```
    ```Razor
        @(Html.Kendo().Splitter()
            .Name("splitter") //The name of the Splitter is mandatory. It specifies the "id" attribute of the widget.
            .Panes(panes =>
            {
                panes.Add().Content("Item 1"); //Add the pane.
                panes.Add().Content("Item 2"); //Add the pane.
            })
        )
    ```

## Event Handling

You can subscribe to all Splitter [events](http://docs.telerik.com/kendo-ui/api/javascript/ui/splitter#events).

### By Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```ASPX
    <%: Html.Kendo().Splitter()
            .Name("splitter")
            .Events(e => e
                .Resize("splitter_resize")
            )
    %>
    <script>
        function splitter_resize() {
            //Handle the Resize event.
        }
    </script>
```
```Razor
    @(Html.Kendo().Splitter()
            .Name("splitter")
            .Events(e => e
                .Resize("splitter_resize")
            )
    )
    <script>
        function splitter_resize() {
            //Handle the Resize event.
        }
    </script>
```

### By Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

###### Example

    @(Html.Kendo().Splitter()
            .Name("splitter")
            .Events(e => e
                .Resize(@<text>
                function() {
                    //Handle the Resize event inline.
                }
                </text>)
            )
    )

## Reference

### Existing Instances

To reference an existing Kendo UI Splitter instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [Splitter API](http://docs.telerik.com/kendo-ui/api/javascript/ui/splitter#methods) to control its behavior.

###### Example

    //Put this after your Kendo UI Splitter for ASP.NET MVC declaration.
    <script>
        $(function() {
            //Notice that the Name() of the Splitter is used to get its client-side instance.
            var splitter = $("#splitter").data("kendoSplitter");
        });
    </script>

## See Also

* [Telerik UI for ASP.NET MVC API Reference: SplitterBuilder](/api/Kendo.Mvc.UI.Fluent/SplitterBuilder)
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Overview of the Kendo UI Splitter Widget](http://docs.telerik.com/kendo-ui/controls/layout/splitter/overview)
* [Telerik UI for ASP.NET MVC API Reference Folder](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_autocompletehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
