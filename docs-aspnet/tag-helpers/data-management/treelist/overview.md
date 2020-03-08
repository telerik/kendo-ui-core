---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI TreeList TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_treelist_aspnetcore
previous_url: /helpers/tag-helpers/treelist
position: 1
---

# TreeList TagHelper Overview

The Telerik UI TreeList TagHelper for ASP.NET Core is a server-side wrapper for the Kendo UI TreeList widget.

The TreeList enables the display of self-referencing tabular data and allows sorting, filtering, and data editing.

* [Demo page for the TreeList](https://demos.telerik.com/aspnet-core/treelist/tag-helper)

## Initializing the TreeList

The following example demonstrates how to define the TreeList by using the TreeList TagHelper.

```tagHelper
    <kendo-treelist name="treelist">
        <columns>
            <treelist-column field="Name"></treelist-column>
            <treelist-column field="Position"></treelist-column>
        </columns>
    </kendo-treelist>
```

## Functionality and Features

* [Data binding]({% slug databinding_treelist_aspnetcore %})
* [Paging]({% slug client_side_paging_aspnetcore_treelist_tag_helper %})
* [Methods, fields, and events]({% slug usingapi_treelist_aspnetcore %})

## Referencing Existing Instances

To refer to an existing TreeList instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) method and pass `"kendoTreeList"` as an argument. Once a reference has been established, use the [TreeList client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/treelist#methods) to control its behavior.

The following example demonstrates how to access an existing TreeList instance.

```tagHelper
    <kendo-treelist datasource-id="dataSource" name="treelist">
        <columns>
            <treelist-column field="Name"></treelist-column>
            <treelist-column field="Position"></treelist-column>
        </columns>
    </kendo-treelist>

    <script>

        $(function () {
            // Get reference to the kendo.ui.TreeList instance
            var treelist = $("#treelist").data("kendoTreeList");
        })

        var dataSource = new kendo.data.TreeListDataSource({
            data: [
                { id: 1, parentId: null, Name: "Jane Smith", Position: "CEO" },
                { id: 2, parentId: 1, Name: "Alex Sells", Position: "EVP Sales" },
                { id: 3, parentId: 1, Name: "Bob Price", Position: "EVP Marketing" }
            ]

        })
    </script>
```
```cshtml
    @(Html.Kendo().TreeList<dynamic>()
                .Name("treelist")
                .Columns(x =>
                {
                    x.Add().Field("Name");
                    x.Add().Field("Position");
                })
                .DataSource("dataSource")
    )

    <script>

        $(function () {
            // Get a reference to the kendo.ui.TreeList instance.
            var treelist = $("#treelist").data("kendoTreeList");
        })

        var dataSource = new kendo.data.TreeListDataSource({
            data: [
                { id: 1, parentId: null, Name: "Jane Smith", Position: "CEO" },
                { id: 2, parentId: 1, Name: "Alex Sells", Position: "EVP Sales" },
                { id: 3, parentId: 1, Name: "Bob Price", Position: "EVP Marketing" }
            ]

        })
    </script>
```

## See Also

* [Basic Usage of the TreeList TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/treelist/tag-helper)
* [Server-Side API](/api/treelist)
