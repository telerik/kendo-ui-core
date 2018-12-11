---
title: Overview
page_title: TreeList | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Kendo UI TreeList tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_treelist_aspnetcore
previous_url: /aspnet-core/helpers/tag-helpers/treelist
position: 1
---

# TreeList Tag Helper Overview

The QRCodeTreeList tag helper helps you configure the Kendo UI TreeList widget in ASP.NET Core applications.

## Basic Usage

The following example demonstrates how to initialize the TreeList and bind it to a local data array.

```tagHelper
    <kendo-treelist datasource-id="dataSource" name="treelist">
        <columns>
            <treelist-column field="Name"></treelist-column>
            <treelist-column field="Position"></treelist-column>
        </columns>
    </kendo-treelist>

    <script>
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
        var dataSource = new kendo.data.TreeListDataSource({
            data: [
                { id: 1, parentId: null, Name: "Jane Smith", Position: "CEO" },
                { id: 2, parentId: 1, Name: "Alex Sells", Position: "EVP Sales" },
                { id: 3, parentId: 1, Name: "Bob Price", Position: "EVP Marketing" }
            ]

        })
    </script>
```

## Binding to Remote Data

To bind the `TreeListDataSource` to remote data and make it load items from a web service, use the remote data binding functionality. It enables the retrieval of data from the server and the saving of the TreeList data items in the server database.

The following example demonstrates how to enable the remote binding for the TreeList by setting the DataSource `transport`. The `parentId` is mapped from the `ReportsTo` field by the `<treelist-model id="EmployeeId" parent-id="ReportsTo" expanded="true">` line. The TreeList renders its hierarchy based on the `parentId`-`id` relationship.

> **Important**
>
> When you use the `schema.model.fields` configuration, list all fields. Set the field which represents the `id` of the event through the `schema.model.id`. If these are not set, they will still work for displaying the data, but will post incomplete objects on the server when the items are edited.

```tagHelper
    <kendo-treelist name="treelist" height="540">
        <treelist-datasource name="dataSource" >
            <transport>
                <read url="https://demos.telerik.com/kendo-ui/service/EmployeeDirectory/All" datatype="jsonp" />
            </transport>
            <schema type="json">
                <treelist-model id="EmployeeId" parent-id="ReportsTo" expanded="true">
                    <fields>
                        <field name="ReportsTo" nullable="true"></field>
                        <field name="EmployeeId" type="number"></field>
                        <field name="Extension" type="number"></field>
                    </fields>
                </treelist-model>
            </schema>
        </treelist-datasource>

        <columns>
            <treelist-column field="FirstName" title="First Name" width="280px"></treelist-column>
            <treelist-column field="LastName" title="Last Name" width="160px"></treelist-column>
            <treelist-column field="Position"></treelist-column>
            <treelist-column field="Phone" width="200px"></treelist-column>
            <treelist-column field="Extension" width="140px"></treelist-column>
            <treelist-column field="Address"></treelist-column>
        </columns>
    </kendo-treelist>
```
```cshtml
    @(Html.Kendo().TreeList<Kendo.Mvc.Examples.Models.TreeList.EmployeeDirectoryRemoteModel>()
        .Name("treelist")
        .Columns(x=> {
            x.Add().Field(f=> f.FirstName).Title("First Name").Width(200);
            x.Add().Field(f=> f.LastName).Title("Last Name").Width(160);
            x.Add().Field(f=> f.Position);
            x.Add().Field(f=> f.Phone).Width(200);
            x.Add().Field(f=> f.Extension).Width(140);
            x.Add().Field(f=> f.Address);
        })
        .DataSource(x=>
        x.Read(read => read.Action("Index", "EmployeeDirectory"))
            .Model(m=> {
                m.Id(f => f.EmployeeId);
                m.ParentId(f => f.ReportsTo);
                m.Field(f => f.FirstName);
                m.Field(f => f.LastName);
                m.Field(f => f.ReportsTo);
                m.Field(f => f.Position);
                m.Field(f => f.Phone);
                m.Field(f => f.Extension);
                m.Field(f => f.Address);
            })
        )
    )
```

## TreeList API

### Methods and Fields

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
            // Get reference to the kendo.ui.TreeList instance
            var treelist = $("#treelist").data("kendoTreeList");

            // Use the expand method to expand the first row
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
            // Get reference to the kendo.ui.TreeList instance
            var treelist = $("#treelist").data("kendoTreeList");

            // Use the expand method to expand the first row
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

### Events

The TreeList supports a set of [events](https://docs.telerik.com/kendo-ui/api/javascript/ui/treelist#methods) you can subscribe to.

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

## Reference

### Existing Instances

To refer to an existing TreeList instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) method and pass `"kendoTreeList"` as an argument. Once a reference has been established, use the [API of the TreeList](https://docs.telerik.com/kendo-ui/api/javascript/ui/treelist) to control its behavior.

The following example demonstrates how to access an existing TreeList instance

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

## See Also

* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects with the CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
