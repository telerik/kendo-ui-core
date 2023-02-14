---
title: Paging
page_title: Paging
description: "Learn how to enable the client-side paging feature to the Telerik UI TreeList component for {{ site.framework }}."
slug: client_side_paging_aspnetcore_treelist_helper
position: 4
---

# Paging

The TreeList supports client-side paging for large sets of data.

To enable the paging functionality of the TreeList, configure the `Pageable` settings.

> * Remember to set a `PageSize`. You can define a `PageSize` in the `Pageable` or in the `DataSource` settings. If an already existing dataSource instance is passed to the TreeList, then the `PageSize` option has to be set in the dataSource settings and not in the `Pageable` settings.
> * By default, `ServerOperations` are enabled in the TreeList HtmlHelper. For client-side paging you have to disable the server operations by setting the `ServerOperations` to `false`.

```HtmlHelper
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
```
{% if site.core %}
```TagHelper
    <kendo-treelist name="treelist" height="540">
        <columns>
            <treelist-column field="FirstName" width="220px" template-id="photo-template"></treelist-column>
            <treelist-column field="LastName" width="160px"></treelist-column>
            <treelist-column field="Position"></treelist-column>
            <treelist-column field="Phone" width="200px"></treelist-column>
            <treelist-column field="Extension" width="140px"></treelist-column>
            <treelist-column field="Address"></treelist-column>
        </columns>
        <filterable enabled="true"/>
        <sortable enabled="true"/>
        <pageable enabled="true" page-size="15" page-sizes-enabled="true"/>
        <treelist-datasource server-operation="false">
            <transport>
                <read url="@Url.Action("All","EmployeeDirectory")"/>
            </transport>
            <schema data="Data" total="Total" errors="Errors">
                <treelist-model id="EmployeeId" parent-id="ReportsTo" expanded="true">
                    <fields>
                        <field name="EmployeeId" type="number"></field>
                        <field name="ReportsTo" nullable="true"></field>
                        <field name="FirstName" type="string"></field>
                        <field name="LastName" type="string"></field>
                        <field name="Position" type="string"></field>
                        <field name="Phone" type="string"></field>
                        <field name="Extension" type="number"></field>
                        <field name="Address" type="string"></field>
                    </fields>
                </treelist-model>
            </schema>
        </treelist-datasource>
    </kendo-treelist>

```
{% endif %}

The root TreeList items have their `parentId` field set to the default value for no parent. By default, the value is `null` and can be configured through the `dataSource.schema.model.fields[FIELD_NAME].defaultValue` option.

> If you use client-side paging together with editing, the user adds an item, and the `id` field of the model has to be nullable (for example, `int?`), then you have to configure the model so that it features a default `id` field value on the client side which is different from the default `parentId` field value. In such cases, the default value of the `id` field (`null`) will equal the default `parentId` field value (`null`) which creates a circular dependency. To avoid this issue, set the default `id` field to a different value, for example, to `zero`.

```HtmlHelper
    @(Html.Kendo().TreeList<Kendo.Mvc.Examples.Models.TreeList.EmployeeDirectoryModel>()
        .Name("treelist")
        ...
        .DataSource(dataSource => dataSource
            .ServerOperation(false)
            .Read(read => read.Action("All", "EmployeeDirectory"))
            .Model(m => {
                // Assuming the "EmployeeId" field is equal to null by default and
                // the default value of the "ReportsTo" field is also null.
                m.Field(f => f.EmployeeId).DefaultValue(0);
                m.Id(f => f.EmployeeId);
                m.ParentId(f => f.ReportsTo);
                m.Field(f => f.ReportsTo);
                m.Expanded(true);
            })
        )
        .Height(540)
        .Pageable(p => p.PageSize(15)
                        .PageSizes(true)
        )
    )
```
{% if site.core %}
```TagHelper
    <kendo-treelist name="treelist" height="540">
        ...
        <treelist-datasource server-operation="false">
            <transport>
                <read url="@Url.Action("All","EmployeeDirectory")"/>
            </transport>
            <schema data="Data" total="Total" errors="Errors">
                <treelist-model id="EmployeeId" parent-id="ReportsTo" expanded="true">
                    <fields>
                        <field name="EmployeeId" type="number" default-value="0"></field>
                        <field name="ReportsTo" nullable="true"></field>>
                    </fields>
                </treelist-model>
            </schema>
        </treelist-datasource>
        <pageable enabled="true" page-size="15" page-sizes-enabled="true"/>
    </kendo-treelist>
```
{% endif %}

## See Also

* [Client-Side paging by the TreeList HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/treelist/client-side-paging)
{% if site.core %}
* [Basic Usage of the TreeList TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/treelist/tag-helper)
{% endif %}
* [Server-Side API](/api/treelist)
