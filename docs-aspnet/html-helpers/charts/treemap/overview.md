---
title: Overview
page_title: TreeMap Overview
description: "Learn the basics when working with the Telerik UI TreeMap component for {{ site.framework }}."
previous_url: /helpers/charts/treemap/overview
slug: overview_treemaphelper_aspnetcore
position: 1
---

# TreeMap Overview

The TreeMap displays hierarchical data in a traditional tree structure. TreeMaps also support different rendering types such us Squarified, Vertical, and Horizontal (slice and dice algorithm).

{% if site.core %}
The Telerik UI TreeMap TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI TreeMap widget. To add the component to your ASP.NET Core app, you can use either.
{% else %}
The Telerik UI TreeMap HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI TreeMap widget.
{% endif %}

{% if site.has_cta_panels == true %}
{% include cta-panel-introduction.html %}
{% endif %}

To see the component in action, check the examples:

* [Demo page for the TreeMap HtmlHelper](https://demos.telerik.com/{{ site.platform }}/treemap/index)
* [Demo page for the TreeMap TagHelper](https://demos.telerik.com/aspnet-core/treemap/tag-helper)

## Initializing the TreeMap

The following example demonstrates how to define a TreeMap by using the TreeMap TagHelper and the TreeMap HtmlHelper.

```HtmlHelper
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
{% if site.core %}
```TagHelper
    <kendo-treemap value-field="Value" 
                text-field="Name" 
                name="treeMap">
        <hierarchical-datasource>
            <transport>
                <read url="@Url.Action("Population_Read", "TreeMap")"/>
            </transport>
            <schema>
                <hierarchical-model children="Items">
                </hierarchical-model>
            </schema>
        </hierarchical-datasource>
    </kendo-treemap>
```
{% endif %}
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

## Binding to Remote Data

You can also bind the `DataSource` to remote data. The following example demonstrates how to bind the Kendo UI TreeMap TagHelper to a remote service.

```HtmlHelper
    @(Html.Kendo().TreeMap()
        .Name("treeMap")
        .DataSource(dataSource => dataSource
            .Read(read => read
                .Action("_PopulationUSA", "TreeMap")
            )
            .Model(m => m.Children("Items"))
        )
        .ValueField("Value")
        .TextField("Name")
        .HtmlAttributes(new { style = "height:600px; font-size: 12px;" })
    )
```
{% if site.core %}
```TagHelper
    <kendo-treemap name="treemap" text-field="name" value-field="value">
        <hierarchical-datasource>
            <transport>
                <read url="/treemap/_populationusa" />
            </transport>
            <schema>
                <hierarchical-model children="items"></hierarchical-model>
            </schema>
        </hierarchical-datasource>
    </kendo-treemap>
```
{% endif %}


## Events

You can subscribe to all TreeMap [events](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/treemap#events).

### Handling Events by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```HtmlHelper
    @(Html.Kendo().TreeMap()
            .Name("treemap")
            .Events(events => events
                .ItemCreated("onItemCreated")
                .DataBound("onDataBound")
            )
    )
```
{% if site.core %}
```TagHelper

@addTagHelper *, Kendo.Mvc
    <kendo-treemap name="treemap" 
                on-item-created="onItemCreated" 
                on-data-bound="onDataBound">
    </kendo-treemap>

```
{% endif %}
```script.js

    <script>
        function onItemCreated(e) {
            // The HTML element.
            var element = e.element;
            // The dataItem to which the element is bound.
            var dataItem = e.sender.dataItem(e.element);
        }

        function onDataBound(e) {
            // Handle the dataBound event.
        }
    </script>
    
```

{% if site.core %}
### Handling Events by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```HtmlHelper
    @(Html.Kendo().TreeMap()
            .Name("treemap")
            .Events(e => e
                .ItemCreated(@<text>
                function(e) {
                    // The HTML element.
                    var element = e.element;
                    // The dataItem to which the element is bound.
                    var dataItem = e.sender.dataItem(e.element);
                }
                </text>)
                .DataBound(@<text>
                function(e) {
                    // Handle the dataBound event.
                }
                </text>)
            )
    )
```

{% endif %}

## Referencing Existing Instances

To reference an existing Kendo UI TreeMap instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [TreeMap client-side API](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/treemap#methods) to control its behavior.

    // Place the following after the declaration of the TreeMap for {{ site.framework }}.
    <script>
        $(function() {
            // The Name() of the TreeMap is used to get its client-side instance.
            var treemap = $("#treemap").data("kendoTreeMap");
        });
    </script>

## See Also

* [Basic Usage of the TreeMap HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/treemap/index)
* [Basic Usage of the TreeMap TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/treemap/tag-helper)
* [Server-Side API](/api/treemap)
