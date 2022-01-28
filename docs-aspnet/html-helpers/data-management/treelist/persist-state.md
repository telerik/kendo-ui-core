---
title: State Persistence
page_title: State Persistence
description: "Get started with the Telerik UI TreeList HtmlHelper for {{ site.framework }} and persist the state of the widget."
slug: htmlhelpers_treelist_aspnetcore_persiststate
position: 9
---

# State Persistence

The TreeList component enables you to store the custom settings of the user and restore them when the user logs back in at some future moment. This feature is known as state persistence.

To persist the settings that were previously applied to its structure, use the `getOptions` and `setOptions` methods of the TreeList. These methods allow you to serialize the current state of the TreeList if needed and recover that state later. 

The following example demonstrates how to automatically maintain an up-to-date state of the TreeList. Upon a page reload, the stored settings will be provided to the TreeList configuration and will be applied.

```View
@(Html.Kendo().TreeList<Kendo.Mvc.Examples.Models.TreeList.EmployeeDirectoryModel>()
    .Name("treelist")
    .Columns(columns =>
    {
        columns.Add().Field(e => e.FirstName).Title("First Name").Width(250);
        columns.Add().Field(e => e.LastName).Title("Last Name");
        columns.Add().Field(e => e.Position);
        columns.Add().Field(e => e.Extension).Title("Ext").Format("{0:#}").Filterable(false);

    })
    .Filterable(true)
    .Sortable(true)
    .Reorderable(true)
    .Resizable(true)
    .ColumnMenu()
    .DataSource(dataSource => dataSource
        .ServerOperation(false)
        .Read(read => read.Action("All", "EmployeeDirectory"))
        .Model(m =>
            {
                m.Id(f => f.EmployeeId);
                m.ParentId(f => f.ReportsTo);
                m.Expanded(true);
                m.Field(f => f.FirstName);
                m.Field(f => f.LastName);
                m.Field(f => f.ReportsTo);
                m.Field(f => f.Position);
                m.Field(f => f.Extension);
            })
    )
    .Height(540)
)

<script>
    $(document).ready(function () {
        var treeList = $("#treelist").data("kendoTreeList");
        
        var options = localStorage["kendo-treelist-options"];
        if (options) {
            treeList.setOptions(JSON.parse(options)); // Load the stored TreeList options after its initialization
        }
        
        $(window).on( "unload", function(e){
            e.preventDefault();
            localStorage["kendo-treelist-options"] = kendo.stringify(treeList.getOptions()); // Get and store the TreeList settings when navigating away from the page
        });
    });
</script>
```

## See Also

* [Persisting the State of the TreeList HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/treelist/persist-state)
* [Server-Side API](/api/treelist)
