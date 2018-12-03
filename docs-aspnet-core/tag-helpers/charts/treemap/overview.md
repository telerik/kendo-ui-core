---
title: Overview
page_title: TreeMap | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Kendo UI TreeMap tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_treemap_aspnetcore
previous_url: /aspnet-core/helpers/tag-helpers/treemap
position: 1
---

# TreeMap Tag Helper Overview

The TreeMap tag helper helps you configure the Kendo UI TreeMap widget in ASP.NET Core applications.

## Basic Usage

The following example demonstrates how to define the TreeMap by using the TreeMap tag helper.

###### Example

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

You can also bind the `DataSource` to remote data. The following example demonstrates how to bind the Kendo UI TreeMap tag helper to a remote service.

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

* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects with the CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
