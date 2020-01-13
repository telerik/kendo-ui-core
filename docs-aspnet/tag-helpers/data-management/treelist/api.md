---
title: Using the API
page_title: Using the API
description: "Learn the basics when working with the Telerik UI TreeList TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: usingapi_treelist_aspnetcore
position: 4
---

# Using the API

The TreeList provides an API which enables you to use its methods, fields, and events.  

## Methods and Fields

The TreeList exposes a set of [methods](https://docs.telerik.com/kendo-ui/api/javascript/ui/treelist#methods) and [fields](https://docs.telerik.com/kendo-ui/api/javascript/ui/treelist#fields).

```tagHelper
    <kendo-treelist datasource-id="dataSource" name="treelist">
        <columns>
            <treelist-column field="Name"></treelist-column>
            <treelist-column field="Position"></treelist-column>
        </columns>
    </kendo-treelist>

    <script>

        $(function () {
            // Get a reference to the kendo.ui.TreeList instance.
            var treelist = $("#treelist").data("kendoTreeList");

            // Use the expand method to expand the first row.
            treelist.expand($("#treelist tbody>tr:eq(0)"));T
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
        .Columns(x=> {
            x.Add().Field("Name");
            x.Add().Field("Position");
        })
        .DataSource("dataSource")
        )

    <script>

        $(function () {
            // Get a reference to the kendo.ui.TreeList instance.
            var treelist = $("#treelist").data("kendoTreeList");

            // Use the expand method to expand the first row.
            treelist.expand($("#treelist tbody>tr:eq(0)"));T
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

## Events

The TreeList supports a set of [events](https://docs.telerik.com/kendo-ui/api/javascript/ui/treelist#methods) to which you can subscribe.

To handle the events, either:
* Specify the JavaScript function which will handle the event during the initialization of the widget, or
* Use the `bind` method of the widget after initialization.

The event handler is the JavaScript function which is invoked when the event is fired. The argument of the event handler is a JavaScript object which contains event-specific data. Get a reference of the widget, which fired the event, through the `sender` field of the event argument. The function context of the event handler, which is available through the `this` keyword, is set to the instance of the widget which fired the event.

The following example demonstrates how to subscribe to a TreeList event during the initialization of the widget.

```tagHelper
    <kendo-treelist datasource-id="dataSource" name="treelist" on-data-bound="dataBound">
        <columns>
            <treelist-column field="Name"></treelist-column>
            <treelist-column field="Position"></treelist-column>
        </columns>
    </kendo-treelist>

    <script>

        function dataBound(e) {
            console.log("dataBound");
        }

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
                .Events(x=> x.DataBound("dataBound"))
    )

    <script>
        function dataBound(e) {
            console.log("dataBound");
        }

        var dataSource = new kendo.data.TreeListDataSource({
            data: [
                { id: 1, parentId: null, Name: "Jane Smith", Position: "CEO" },
                { id: 2, parentId: 1, Name: "Alex Sells", Position: "EVP Sales" },
                { id: 3, parentId: 1, Name: "Bob Price", Position: "EVP Marketing" }
            ]

        })
    </script>
```

The following example demonstrates how to subscribe to a TreeList event by using the `bind` method.

```tagHelper
    <kendo-treelist datasource-id="dataSource" name="treelist">
        <columns>
            <treelist-column field="Name"></treelist-column>
            <treelist-column field="Position"></treelist-column>
        </columns>
    </kendo-treelist>

    <script>

        $(function () {
            $("#treelist").data("kendoTreeList").bind('dataBound', dataBound);
        })

        function dataBound(e) {
            console.log("dataBound");
        }

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
            $("#treelist").data("kendoTreeList").bind('dataBound', dataBound);
        })

        function dataBound(e) {
            console.log("dataBound");
        }

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
