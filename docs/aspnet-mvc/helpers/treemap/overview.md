---
title: Overview
page_title: Overview | Kendo UI TreeMap HtmlHelper
description: "Get started with the server-side wrapper for the Kendo UI TreeMap widget for ASP.NET MVC."
slug: overview_treemaphelper_aspnetmvc
position: 1
---

# TreeMap HtmlHelper Overview

The TreeMap HtmlHelper extension is a server-side wrapper for the [Kendo UI TreeMap](https://demos.telerik.com/kendo-ui/treemap/index) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI TreeMap.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).

**Step 2** Create a new action method which renders the view.

###### Example

        public ActionResult Index()
        {
            return View();
        }

**Step 3** Add a TreeMap.

###### Example

```tab-ASPX

        <%= Html.Kendo().TreeMap()
                .Name("treeMap")
                .DataSource(dataSource => dataSource
                    .Read(read => read
                        .Action("_PopulationUSA", "TreeMap")
                    )
                    .Model(m => m.Children("Items"))
                )
                .ValueField("Value")
                .TextField("Name")
        %>
```
```tab-Razor

        $(Html.Kendo().TreeMap()
              .Name("treeMap")
              .DataSource(dataSource => dataSource
                  .Read(read => read
                      .Action("_PopulationUSA", "TreeMap")
                  )
                  .Model(m => m.Children("Items"))
              )
              .ValueField("Value")
              .TextField("Name")
        )
```

## Event Handling

You can subscribe to all TreeMap [events](/api/javascript/dataviz/ui/treemap#events).

### By Handler Name

The examples below demonstrates how to subscribe to events by a handler name.

###### Example

```tab-ASPX

        <%= Html.Kendo().TreeMap()
                .Name("treemap")
                .Events(events => events
                    .ItemCreated("onItemCreated")
                    .DataBound("onDataBound")
                )
        %>

        <script>
        function onItemCreated() {
            //Handle the itemCreated event.
        }

        function onDataBound() {
            //Handle the dataBound event.
        }
        </script>
```
```tab-Razor

        $(Html.Kendo().TreeMap()
              .Name("treemap")
              .Events(events => events
                  .ItemCreated("onItemCreated")
                  .DataBound("onDataBound")
              )
        )

        <script>
        function onItemCreated() {
            //Handle the itemCreated event.
        }

        function onDataBound() {
            //Handle the dataBound event.
        }
        </script>
```

### By Template Delegate

The example below demonstrates how to subscribe to events by a template delegate.

###### Example

```tab-Razor

        @(Html.Kendo().TreeMap()
              .Name("treemap")
              .Events(e => e
                  .ItemCreated(@<text>
                    function() {
                        //Handle the itemCreated event.
                    }
                  </text>)
                  .DataBound(@<text>
                    function() {
                        //Handle the dataBound event.
                    }
                    </text>)
              )
        )
```

## Reference

### Existing Instances

You can reference an existing Kendo UI TreeMap instance via [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [TreeMap API](/api/javascript/dataviz/ui/treemap#methods) to control its behavior.

###### Example

        // Put this after your Kendo UI TreeMap for ASP.NET MVC declaration.
        <script>
        $(function() {
            //Notice that the Name() of the TreeMap is used to get its client-side instance.
            var treemap = $("#treemap").data("kendoTreeMap");
        });
        </script>

## See Also

Other articles on Telerik UI for ASP.NET MVC and on the TreeMap:

* [ASP.NET MVC API Reference: TreeMapBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/TreeMapBuilder)
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Overview of the Kendo UI TreeMap Widget]({% slug overview_treemap_widget %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/aspnet-mvc/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_autocompletehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
