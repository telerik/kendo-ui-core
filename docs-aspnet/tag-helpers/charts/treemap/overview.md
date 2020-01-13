---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI TreeMap TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_treemap_aspnetcore
previous_url: /helpers/tag-helpers/treemap
position: 1
---

# TreeMap TagHelper Overview

The Telerik UI TreeMap TagHelper for ASP.NET Core is a server-side wrapper for the Kendo UI TreeMap widget.

The TreeMap displays hierarchical data in a traditional tree structure.

* [Demo page for the TreeMap](https://demos.telerik.com/aspnet-core/treemap/tag-helper)

## Initializing the TreeMap

The following example demonstrates how to define the TreeMap by using the TreeMap TagHelper.

    <kendo-treemap datasource-id="dataSource" name="treeMap" text-field="name" value-field="value"></kendo-treemap>

    <script>
        var dataSource = new kendo.data.HierarchicalDataSource({
            data: [{
                name: "foo",
                value: 1
            }]
        });
    </script>

## Binding to Remote Data

You can also bind the `DataSource` to remote data. The following example demonstrates how to bind the Kendo UI TreeMap TagHelper to a remote service.

```tagHelper
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
```cshtml
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

## See Also

* [Basic Usage of the TreeMap TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/treemap/tag-helper)
* [Server-Side API](/api/treemap)
