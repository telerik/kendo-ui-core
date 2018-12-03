---
title: Overview
page_title: TreeMap | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the Kendo UI TreeMap HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: overview_treemaphelper_aspnetcore
position: 1
---

# TreeMap HtmlHelper Overview

The TreeMap HtmlHelper extension is a server-side wrapper for the [Kendo UI TreeMap](https://demos.telerik.com/kendo-ui/treemap/index) widget.

## Configuration

Add the TreeMap.

###### Example

```Razor
  @(Html.Kendo().TreeMap()
        .Name("treeMap")
        .DataSource(dataSource => dataSource
            .Read(read => read
                .Action("Population_Read", "TreeMap")
            )
            .Model(m => m.Children("Items"))
        )
        .ValueField("Value")
        .TextField("Name")
  )
```
```Controler
    public ActionResult Population_Read()
    {
        var result = new List<Population>();

        var population = new Population("Parent One", 1, new List<Population>());

        population.Items.Add(new Population("Child 1", 2, null));
        population.Items.Add(new Population("Child 2", 3, null));

        result.Add(population);

        return Json(result);
    }
```
```Model
    public class Population
    {
        public Population(string name, int value, List<Population> items)
        {
            this.Name = name;
            this.Value = value;
            this.Items = items;
        }
        public string Name { get; set; }

        public int Value { get; set; }

        public List<Population> Items { get; set; }
    }
```

## Event Handling

You can subscribe to all TreeMap [events](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/treemap#events).

### By Handler Name

The following example demonstrates how to subscribe to events by a handler name.

###### Example

    @(Html.Kendo().TreeMap()
            .Name("treemap")
            .Events(events => events
                .ItemCreated("onItemCreated")
                .DataBound("onDataBound")
            )
    )

    <script>
    function onItemCreated(e) {
        // the HTML element
        var element = e.element;
        // the dataItem to which the element is bound
        var dataItem = e.sender.dataItem(e.element);
    }

    function onDataBound(e) {
        //Handle the dataBound event.
    }
    </script>

### By Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

###### Example

    @(Html.Kendo().TreeMap()
            .Name("treemap")
            .Events(e => e
                .ItemCreated(@<text>
                function(e) {
                    // the HTML element
                    var element = e.element;
                    // the dataItem to which the element is bound
                    var dataItem = e.sender.dataItem(e.element);
                }
                </text>)
                .DataBound(@<text>
                function(e) {
                    //Handle the dataBound event.
                }
                </text>)
            )
    )

## Reference

### Existing Instances

To reference an existing Kendo UI TreeMap instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [TreeMap API](http://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/treemap#methods) to control its behavior.

###### Example

    // Put this after your Kendo UI TreeMap for ASP.NET MVC declaration.
    <script>
        $(function() {
            //Notice that the Name() of the TreeMap is used to get its client-side instance.
            var treemap = $("#treemap").data("kendoTreeMap");
        });
    </script>

## See Also

* [Overview of the Kendo UI TreeMap Widget](https://docs.telerik.com/kendo-ui/controls/charts/treemap/overview)
* [Overview of the UI for ASP.NET Core Chart HtmlHelper]({% slug htmlhelpers_charts_aspnetcore %})
* [Kendo UI TreeMap for ASP.NET Core demos](https://demos.telerik.com/aspnet-core/treemap/index)
