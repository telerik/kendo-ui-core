---
title: Overview
page_title: TreeMap Overview
description: "Learn the basics when working with the Telerik UI TreeMap component for {{ site.framework }}."
previous_url: /helpers/charts/treemap/overview
slug: overview_treemaphelper_aspnetcore
position: 0
---

# {{ site.framework }} TreeMap Overview

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

## Setting Custom Color Ranges

You can customize the TreeMap through the `Colors` configuration option by adding the desired color ranges:

```HtmlHelper
    @(Html.Kendo().TreeMap()
        .Name("treeMap")
        .DataSource(dataSource => dataSource
            .Read(read => read
                .Action("Population_Read", "TreeMap")
            )
            .Model(m => m.Children("Items"))
        )
        .Colors(color =>
        {
            color.AddRange("#0072c6", "#cbe2f3");
            color.AddRange("#5db2ff", "#deeffe");
            color.AddRange("#ff8f32", "#cbe7d0");
            color.AddRange("#82ba00", "#e5f0cb");
            color.AddRange("#ff8f32", "#fee8d5");
            color.AddRange("#9e0a61", "#eccedf");
            color.AddRange("#ac193d", "#eed0d7");
        })
        .ValueField("Value")
        .TextField("Name")
    )
```

## Next Steps
* [Getting Started with the TreeMap]({% slug aspnetcore_treemap_getting_started %})
* [Basic Usage of the TreeMap for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/treemap/index)
* [TreeMap Events]({% slug events_treemap_aspnetcore %})

## See Also
* [Basic Usage of the TreeMap HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/treemap/index)
* [Basic Usage of the TreeMap TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/treemap/tag-helper)
{% if site.core %}
* [TreeMap in Razor Pages]({% slug razorpages_treemap_aspnetcore %})
{% endif %}
* [Server-Side API](/api/treemap)
