---
title: Overview
page_title: TreeMap Overview | Telerik UI for ASP.NET MVC HTML Helpers
description: "Learn the basics when working with the Telerik UI TreeMap HtmlHelper for ASP.NET MVC."
slug: overview_treemaphelper_aspnetmvc
position: 1
---

# TreeMap HtmlHelper Overview

The Telerik UI TreeMap HtmlHelper for ASP.NET MVC is a server-side wrapper for the Kendo UI TreeMap widget.

The TreeMap displays hierarchical data in a traditional tree structure.

* [Demo page for the TreeMap](https://demos.telerik.com/aspnet-mvc/treemap/index)

## Basic Configuration

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).
1. Create a new action method which renders the view.

        public ActionResult Index()
        {
            return View();
        }

1. Add a TreeMap.

    ```ASPX
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
    ```Razor
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

## Events

You can subscribe to all TreeMap [events](/api/treemap). For a complete example on basic TreeMap events, refer to the [demo on using the events of the TreeMap](https://demos.telerik.com/aspnet-mvc/treemap/events).

### Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```ASPX
    <%= Html.Kendo().TreeMap()
            .Name("treemap")
            .Events(events => events
                .ItemCreated("onItemCreated")
                .DataBound("onDataBound")
            )
    %>

    <script>
        function onItemCreated() {
            // Handle the itemCreated event.
        }

        function onDataBound() {
            // Handle the dataBound event.
        }
    </script>
```
```Razor
    $(Html.Kendo().TreeMap()
            .Name("treemap")
            .Events(events => events
                .ItemCreated("onItemCreated")
                .DataBound("onDataBound")
            )
    )

    <script>
        function onItemCreated() {
            // Handle the itemCreated event.
        }

        function onDataBound() {
            // Handle the dataBound event.
        }
    </script>
```

### Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

    @(Html.Kendo().TreeMap()
        .Name("treemap")
        .Events(e => e
            .ItemCreated(@<text>
            function() {
                // Handle the itemCreated event.
            }
            </text>)
            .DataBound(@<text>
            function() {
                // Handle the dataBound event.
            }
            </text>)
        )
    )

## Referencing Existing Instances

To reference an existing TreeMap instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [TreeMap client-side API](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/treemap) to control its behavior.

    // Place the following after the TreeMap for ASP.NET MVC declaration.
    <script>
        $(function() {
            // The Name() of the TreeMap is used to get its client-side instance.
            var treemap = $("#treemap").data("kendoTreeMap");
        });
    </script>

## See Also

* [Basic Usage of the StockChart HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-core/financial/index)
* [Server-Side API](/api/stockchart)
