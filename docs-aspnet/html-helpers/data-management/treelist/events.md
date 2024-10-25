---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI TreeList component for {{ site.framework }}."
slug: treelist_events
position: 5
---

# Events

You can subscribe to [all TreeList events](/api/kendo.mvc.ui.fluent/treelisteventbuilder) and then use them to further customize the behavior of the control.

The example below demonstrates how to use the [`DataBound` event](/api/kendo.mvc.ui.fluent/treelisteventbuilder#databoundsystemstring) that the TreeList triggers when it is loaded with data.

```HtmlHelper
    @using Kendo.Mvc.UI

    @(Html.Kendo().TreeList<MyApplication.Models.EmployeeDirectoryRemoteModel>()
        .Name("treelist")
        .Columns(columns =>
        {
            columns.Add().Field(f => f.FirstName).Width(250);
            columns.Add().Field(e => e.LastName);
            columns.Add().Field(e => e.Position);
            columns.Add().Field(e => e.Extension).Title("Ext").Format("{0:#}");
        })
        .DataSource(dataSource => dataSource
            .Read(read => read.Action("GetData", "Home"))
            .Model(m => {
                m.Id(f => f.EmployeeId);
                m.ParentId(f => f.ReportsTo).Nullable(true);
                m.Field(f => f.FirstName);
                m.Field(f => f.LastName);
                m.Field(f => f.ReportsTo);
            })
        )
        .Events(events =>
        {
            events.DataBound("onDataBound");
        })
    )

    <script>
        function onDataBound(e) {
            console.log("TreeList data bound");
        }
    </script>
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-treelist name="treelist"
        on-data-bound="onDataBound">
        <columns>
            <treelist-column field="FirstName" width="250px"></treelist-column>
            <treelist-column field="LastName"></treelist-column>
            <treelist-column field="Position"></treelist-column>
            <treelist-column field="Extension" title="Ext" format="{0:#}"></treelist-column>
        </columns>
        <treelist-datasource>
            <transport>
                <read url="@Url.Action("GetData","Home")"/>
            </transport>
            <schema data="Data" total="Total" errors="Errors">
                <treelist-model id="EmployeeId" parent-id="ReportsTo">
                    <fields>
                        <field name="EmployeeId" type="number"></field>
                        <field name="ReportsTo" nullable="true"></field>
                        <field name="FirstName" type="string"></field>
                        <field name="LastName" type="string"></field>
                    </fields>
                </treelist-model>
            </schema>
        </treelist-datasource>
    </kendo-treelist>

    <script>
        function onDataBound(e) {
            console.log("TreeList data bound");
        }
    </script>
```
{% endif %}

## Next Steps

* [API for Configuring the TreeList Events](/api/kendo.mvc.ui.fluent/treelisteventbuilder)
* [Using the TreeList Events (Demo)](https://demos.telerik.com/{{ site.platform }}/treelist/events)

## See Also

* [Using the API of the TreeList for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/treelist/api)
