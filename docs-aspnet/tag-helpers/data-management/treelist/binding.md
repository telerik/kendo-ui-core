---
title: Data Binding
page_title: Data Binding
description: "Learn the basics when working with the Telerik UI TreeList TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: databinding_treelist_aspnetcore
position: 2
---

# Data Binding

The TreeList provides options for binding it to local and remote data.

## Local Data

The following example demonstrates how to initialize and bind the TreeList to local data.

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

## Remote Data

To bind the `TreeListDataSource` to remote data and make it load items from a web service, use the remote data binding functionality. It enables the retrieval of data from the server and the saving of the TreeList data items in the server database.

The following example demonstrates how to enable the remote binding for the TreeList by setting the DataSource `transport`. The `parentId` is mapped from the `ReportsTo` field by the `<treelist-model id="EmployeeId" parent-id="ReportsTo" expanded="true">` line. The TreeList renders its hierarchy based on the `parentId`-`id` relationship.

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

## See Also

* [Basic Usage of the TreeList TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/treelist/tag-helper)
* [Server-Side API](/api/treelist)
