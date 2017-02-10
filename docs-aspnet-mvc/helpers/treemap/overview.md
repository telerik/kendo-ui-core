---
title: Overview
page_title: Overview | Kendo UI TreeMap HtmlHelper
description: "Get started with the server-side wrapper for the Kendo UI TreeMap widget for ASP.NET MVC."
slug: overview_treemaphelper_aspnetmvc
position: 1
---

# TreeMap HtmlHelper Overview

The TreeMap HtmlHelper extension is a server-side wrapper for the [Kendo UI TreeMap](https://demos.telerik.com/kendo-ui/treemap/index) widget.

## Configuration

Below are listed the steps for you to follow when configuring the Kendo UI TreeMap.

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).

1. Create a new action method which renders the view.

    ###### Example

            public ActionResult Index()
            {
                return View();
            }

1. Add a TreeMap.

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

You can subscribe to all TreeMap [events](../../../kendo-ui/api/javascript/dataviz/ui/treemap#events).

### By Handler Name

The following example demonstrates how to subscribe to events by a handler name.

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

The following example demonstrates how to subscribe to events by a template delegate.

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

To reference an existing Kendo UI TreeMap instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [TreeMap API](../../../kendo-ui/api/javascript/dataviz/ui/treemap#methods) to control its behavior.

###### Example

        // Put this after your Kendo UI TreeMap for ASP.NET MVC declaration.
        <script>
        $(function() {
            //Notice that the Name() of the TreeMap is used to get its client-side instance.
            var treemap = $("#treemap").data("kendoTreeMap");
        });
        </script>

## See Also

* [ASP.NET MVC API Reference: TreeMapBuilder](/api/Kendo.Mvc.UI.Fluent/TreeMapBuilder)
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Overview of the Kendo UI TreeMap Widget](http://docs.telerik.com/kendo-ui/controls/charts/treemap/overview)
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_autocompletehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
