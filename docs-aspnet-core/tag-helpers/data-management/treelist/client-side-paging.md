---
title: Client-Side Paging
page_title: Client-Side Paging | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn how to enable the client-side paging feature to the Kendo UI TreeList Tag Helper for ASP.NET Core."
slug: client_side_paging_aspnetcore_treelist_tag_helper
position: 2
---

# Client-Side Paging

The TreeList supports client-side paging for large sets of data.

To enable the paging functionality, configure the `Pageable` settings.

> **Important**
>
> Remember to set a `PageSize`. You can define a `PageSize` in the `Pageable` or in the `DataSource` settings. If an already existing dataSource instance is passed to the TreeList, then the `PageSize` option has to be set in the dataSource settings and not in the `Pageable` settings.

###### Example

```tab-tagHelper

    <kendo-treelist name="treelist" height="540">
        <treelist-datasource>
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
            <treelist-column field="FirstName" title="First Name" width="280px" template-id="photo-template"></treelist-column>
            <treelist-column field="LastName" title="Last Name" width="160px"></treelist-column>
            <treelist-column field="Position"></treelist-column>
            <treelist-column field="Phone" width="200px"></treelist-column>
            <treelist-column field="Extension" width="140px"></treelist-column>
            <treelist-column field="Address"></treelist-column>
        </columns>
        <pageable page-size="15" page-sizes="new int[] { 5,15,20}"></pageable>
    </kendo-treelist>

```
```tab-cshtml

    @(Html.Kendo().TreeList<EmployeeDirectoryModel>()
        .Name("treelist")
        .Columns(columns =>
        {
            columns.Add().Field(e => e.FirstName).Width(220).TemplateId("photo-template");
            columns.Add().Field(e => e.LastName).Width(160);
            columns.Add().Field(e => e.Position);
            columns.Add().Field(e => e.Phone).Width(200);
            columns.Add().Field(e => e.Extension).Width(140);
            columns.Add().Field(e => e.Address);
        })
        .Filterable()
        .Sortable()
        .DataSource(dataSource => dataSource
            .Read(read => read.Action("All", "EmployeeDirectory"))
            .ServerOperation(false)
            .Model(m => {
                m.Id(f => f.EmployeeId);
                m.ParentId(f => f.ReportsTo);
                m.Expanded(true);
                m.Field(f => f.FirstName);
                m.Field(f => f.LastName);
                m.Field(f => f.ReportsTo);
            })
        )
        .Height(540)
        .Pageable(p => p.PageSize(15)
                        .PageSizes(true)
        )
    )
    </script>

```


> * When client-side paging is used with editing and an item is added, if the "id" field of the model should be nullable (e.g. `int?`), then the model should be configured to have a default "id" field value on the client-side that is **different** from the default "parentId" field value. This is required as root TreeList items have their "parentId" field set to the default value for no parent (by default this is equal to `null`, but can be configured from the `dataSource.schema.model.fields[FIELD_NAME].defaultValue` option). If this is the case, the default value of the "id" field (null) will be equal to the default "parentId" field value (null), which creates a circular dependency. Setting the default "id" field to a different value (e.g. zero) can be done instead.

###### Example
```
    <kendo-treelist name="treelist" height="540">
        <treelist-datasource>
            ...
            <schema type="json">
                <treelist-model id="EmployeeId" parent-id="ReportsTo" expanded="true">
                    <fields>
                        <field name="EmployeeId" type="number"  default-value="0"></field>
                        <field name="ReportsTo" nullable="true"></field>>
                    </fields>
                </treelist-model>
            </schema>
        </treelist-datasource>

        ...
    </kendo-treelist>
```

## See Also

* [JavaScript API Reference for the Kendo UI jQuery TreeList](https://docs.telerik.com/kendo-ui/api/javascript/ui/treelist)
* [UI for ASP.NET Core TreeList editing live demo](https://demos.telerik.com/aspnet-core/treelist/editing)
