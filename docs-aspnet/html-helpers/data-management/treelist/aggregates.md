---
title: Aggregates
page_title: Aggregates
description: "Get started with the Telerik UI TreeList component for {{ site.framework }} and group its data by using aggregate functions."
slug: htmlhelpers_treelist_aspnetcore_aggregates
position: 3
---

# Aggregates

The TreeList enables you to display aggregated number results when the user groups its data.

To enable the aggregate functions, use the `DataSource.Aggregates()` and the `FooterTemplate()` methods of the TreeList, and the `aggregate` fields of its data source. 

```HtmlHelper
    @(Html.Kendo().TreeList<Kendo.Mvc.Examples.Models.TreeList.EmployeeDirectoryModel>()
        .Name("treelist")
        .Columns(columns =>
        {
            columns.Add().Field(e => e.Extension).Title("Ext")
            .FooterTemplate("Tota: #= count #, Sum: #= sum #, Min: #= min #, Max: #= max #, Average: #= average #");
        })
        .DataSource(dataSource => dataSource
            .ServerOperation(false)
            .Read(read => read.Action("All", "EmployeeDirectory"))
            .Aggregates(aggr =>
            {
                aggr.Add(e => e.Extension).Count().Sum().Max().Min().Average();
            })
            .Model(m =>
            {
                m.Id(f => f.EmployeeId);
                m.ParentId(f => f.ReportsTo);
                m.Field(f => f.ReportsTo);
            })
        )
    )
```
{% if site.core %}
```TagHelper
    <kendo-treelist name="treelist">
        <columns>
            <treelist-column field="Extension" title="Ext" 
            footer-template="Tota: #= count #, Sum: #= sum #, Min: #= min #, Max: #= max #, Average: #= average #"></treelist-column>
        </columns>
        <treelist-datasource server-operation="false">
            <transport>
                <read url="@Url.Action("All","EmployeeDirectory")"/>
            </transport>
            <aggregates>
                <aggregate field="Extension" aggregate="count"/>
                <aggregate field="Extension" aggregate="sum"/>
                <aggregate field="Extension" aggregate="min"/>
                <aggregate field="Extension" aggregate="max"/>
                <aggregate field="Extension" aggregate="average"/>
            </aggregates>
            <schema data="Data" total="Total" errors="Errors">
                <treelist-model id="EmployeeId" parent-id="ReportsTo">
                    <fields>
                        <field name="EmployeeId" type="number"></field>
                        <field name="ReportsTo" nullable="true"></field>
                        <field name="Extension" type="number"></field>
                    </fields>
                </treelist-model>
            </schema>
        </treelist-datasource>
    </kendo-treelist>
```
{% endif %}

For a runnable example, refer to the [demo on using aggregate functions in the TreeList](https://demos.telerik.com/{{ site.platform }}/treelist/aggregates).

## See Also

* [Aggregates by the TreeList HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/treelist/aggregates)
* [Server-Side API](/api/treelist)
