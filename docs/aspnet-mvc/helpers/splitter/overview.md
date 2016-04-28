---
title: Overview
page_title: Overview | Kendo UI Splitter HtmlHelper
description: "Get started with the server-side wrapper for the Kendo UI Splitter widget for ASP.NET MVC."
slug: overview_splitterhelper_aspnetmvc
position: 1
---

# Splitter HtmlHelper Overview

The Splitter HtmlHelper extension is a server-side wrapper for the [Kendo UI Splitter](https://demos.telerik.com/kendo-ui/splitter/index) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI Splitter.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).

**Step 2** Create a new action method which renders the view.

###### Example

        public ActionResult Index()
        {
            return View();
        }

**Step 3** Add a Splitter.

###### Example

```tab-ASPX

        <%: Html.Kendo().Splitter()
                .Name("splitter") //The name of the Splitter is mandatory. It specifies the "id" attribute of the widget.
                .Panes(panes =>
                {
                    panes.Add().Content("Item 1"); //Add the pane.
                    panes.Add().Content("Item 2"); //Add the pane.
                })
        %>
```
```tab-Razor

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

You can subscribe to all Splitter [events](/api/javascript/ui/splitter#events).

### By Handler Name

The examples below demonstrates how to subscribe to events by a handler name.

###### Example

```tab-ASPX

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
```tab-Razor

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

The example below demonstrates how to subscribe to events by a template delegate.

###### Example

```tab-Razor

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
```

## Reference

### Existing Instances

You can reference an existing Kendo UI Splitter instance via [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [Splitter API](/api/javascript/ui/splitter#methods) to control its behavior.

###### Example

        //Put this after your Kendo UI Splitter for ASP.NET MVC declaration.
        <script>
        $(function() {
            //Notice that the Name() of the Splitter is used to get its client-side instance.
            var splitter = $("#splitter").data("kendoSplitter");
        });
        </script>

## See Also

Other articles on Telerik UI for ASP.NET MVC and on the Splitter:

* [ASP.NET MVC API Reference: SplitterBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/SplitterBuilder)
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Overview of the Kendo UI Splitter Widget]({% slug overview_kendoui_splitter_widget %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/aspnet-mvc/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_autocompletehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
