---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI TaskBoard TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_taskboard_aspnetcore
previous_url: /helpers/tag-helpers/taskboard
position: 1
---

# TaskBoard TagHelper Overview

The Telerik UI TaskBoard TagHelper for ASP.NET Core is a server-side wrapper for the Kendo UI TaskBoard widget.

The TaskBoard allows you to easily organize items and keep track of their state. The component provides a clean and user-friendly interface and enables you to manage tasks, notes, projects, people, or other kinds of items. The TaskBoard displays columns (lanes), which can represent different types of project/task statuses. Tasks are visualized as cards, and they can be reordered within the same column, or dragged and dropped onto another column.

* [Demo page for the TaskBoard](https://demos.telerik.com/aspnet-core/taskboard/tag-helper)

## Initializing the TaskBoard

The following example demonstrates how to define the TaskBoard by using the TaskBoard TagHelper.

      <kendo-taskboard name="taskBoard"></kendo-taskboard>

## Basic Configuration

The TaskBoard TagHelper configuration options are passed as attributes of the tag. The TaskBoard uses the [DataSource tag helper]({% slug taghelpers_datasource_aspnetcore %}) to bind its data.


```tagHelper
<kendo-taskboard name="taskBoard" datatitlefield="title" datastatusfield="OwnerID" datadescriptionfield="Description" datacategoryfield="ID" height="750">
    <datasource>
        <transport>
            <read url="@Url.Action("Tag_Helper_Tasks_Read", "TaskBoard")" />
            <create url="@Url.Action("Tag_Helper_Tasks_Create", "TaskBoard")" />
            <update url="@Url.Action("Tag_Helper_Tasks_Update", "TaskBoard")" />
            <destroy url="@Url.Action("Tag_Helper_Tasks_Destroy", "TaskBoard")" />
        </transport>
        <schema data="Data" total="Total" errors="Errors">
            <model id="TaskID">
                <fields>
                    <field name="TaskID" type="number"></field>
                    <field name="title" from="Title" type="string"></field>
                    <field name="Description" from="Description" type="string"></field>
                    <field name="OwnerID" type="number" default-value="0"></field>
                </fields>
            </model>
        </schema>
    </datasource>
    <column-settings datatextfield="Text" datastatusfield="ID">
    </column-settings>
    <taskboard-columns>
        <datasource>
            <transport>
                <read url="@Url.Action("Tag_Helper_Columns_Read", "TaskBoard")" />
                <create url="@Url.Action("Tag_Helper_Columns_Create", "TaskBoard")" />
                <update url="@Url.Action("Tag_Helper_Columns_Update", "TaskBoard")" />
                <destroy url="@Url.Action("Tag_Helper_Columns_Destroy", "TaskBoard")" />
            </transport>
            <schema data="Data" total="Total" errors="Errors">
                <model id="ID">
                    <fields>
                        <field name="ID" type="number"></field>
                        <field name="Text" from="Text" type="string"></field>
                    </fields>
                </model>
            </schema>
        </datasource>
    </taskboard-columns>
</kendo-taskboard>
```
```cshtml
@(Html.Kendo().TaskBoard<Kendo.Mvc.Examples.Models.Scheduler.TaskViewModel, Kendo.Mvc.Examples.Models.TaskBoard.Column>()
    .Name("taskBoard")
    .ColumnSettings(columnSettings => columnSettings
        .DataTextField("Text")
        .DataStatusField("ID")
    )
    .Columns(dataSource => dataSource
        .Ajax()
        .Read("Editing_Columns_Read", "TaskBoard")
        .Create("Editing_Columns_Create", "TaskBoard")
        .Update("Editing_Columns_Update", "TaskBoard")
        .Destroy("Editing_Columns_Destroy", "TaskBoard")
    )
    .DataTitleField("Title")
    .DataStatusField("OwnerID")
    .DataDescriptionField("Description")
    .DataCategoryField("ID")
    .DataSource(dataSource => dataSource
        .Ajax()
        .Model(model => model.Id(p => p.TaskID))
        .Read(read => read.Action("Tasks_Read", "TaskBoard"))
        .Create(update => update.Action("Tasks_Create", "TaskBoard"))
        .Update(update => update.Action("Tasks_Update", "TaskBoard"))
        .Destroy(update => update.Action("Tasks_Destroy", "TaskBoard"))
    )
    .Height("750")
)
```

## Functionality and Features

* [Data Binding]({% slug htmlhelpers_taskboard_aspnetcore_databinding %})
* [Cards]({% slug htmlhelpers_taskboard_aspnetcore_cards %})
* [Columns]({% slug htmlhelpers_taskboard_aspnetcore_columns %})
* [Editing]({% slug htmlhelpers_taskboard_aspnetcore_editing %})
* [Resources]({% slug htmlhelpers_taskboard_aspnetcore_resources %})
* [Search]({% slug htmlhelpers_taskboard_aspnetcore_search %})
* [Templates]({% slug htmlhelpers_taskboard_aspnetcore_templates %})
* [Toolbar]({% slug htmlhelpers_taskboard_aspnetcore_toolbar %})
* [Accessibility]({% slug htmlhelpers_taskboard_aspnetcore_accessibility %})
* [Globalization]({% slug htmlhelpers_taskboard_aspnetcore_globalization %})

## Referencing Existing Instances

To get a reference to an existing TaskBoard instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) method. Once a reference is established, use the [TaskBoard client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/taskboard#methods) to control its behavior.

        $(document).ready(function() {
            // The Name() of the TaskBoard is used to get its client-side instance.
            var taskBoard = $("#taskBoard").data("kendoTaskBoard");
        });

## See Also

* [Basic Usage of the TaskBoard TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/taskboard/tag-helper)
* [Server-Side API](/api/taskboard)
