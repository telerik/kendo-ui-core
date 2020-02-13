---
title: Overview
page_title: Gantt Overview
description: "Learn the basics when working with the Telerik UI Gantt TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /helpers/tag-helpers/gantt
slug: taghelpers_gantt_aspnetcore
position: 1
---

# Gantt TagHelper Overview

The Telerik UI Gantt TagHelper for ASP.NET Core is a server-side wrapper for the Kendo UI Gantt widget.

The Gantt displays a set of tasks and dependencies which are used to visualize project-planning data. It provides a TreeList section where the user can edit the tasks, and sort and reorder them in a grid-like fashion, and a Timeline section where the tasks and dependencies are visualized under an adjustable time ruler. The user can resize, move, edit and remove them. The Gantt also supports the display of the Timeline section in the day, week, and month views.

* [Demo page for the Gantt](https://demos.telerik.com/aspnet-core/gantt/tag-helper)

## Initializing the Gantt

The following example demonstrates how to define the Gantt by using the Gantt TagHelper.

    <kendo-gantt name="gantt" show-work-days="false" show-work-hours="false" snap="false" height="700">
        <columns>
            <gantt-column field="title" title="Title" editable="true" sortable="true"></gantt-column>
            <gantt-column field="resources" title="Assigned Resources" editable="true" sortable="true"></gantt-column>
        </columns>
        <views>
            <gantt-view type="GanttViewType.Day"></gantt-view>
            <gantt-view type="GanttViewType.Week"></gantt-view>
            <gantt-view type="GanttViewType.Month" selected="true"></gantt-view>
        </views>
        <gantt-datasource type="DataSourceTagHelperType.Ajax">
            <transport>
                <read url="@Url.Action("ReadTasks","Gantt")" />
            </transport>
            <schema>
                <model id="TaskID">
                    <fields>
                        <field name="TaskID" type="number"></field>
                        <field name="parentId" from="ParentID" type="number"></field>
                        <field name="title" from="Title" type="string"></field>
                        <field name="start" from="Start" type="date"></field>
                        <field name="end" from="End" type="date"></field>
                        <field name="summary" from="Summary" type="boolean"></field>
                        <field name="expanded" from="Expanded" type="boolean" default-value="true"></field>
                        <field name="percentComplete" from="PercentComplete" type="number"></field>
                        <field name="orderId" from="OrderId" type="number"></field>
                    </fields>
                </model>
            </schema>
        </gantt-datasource>
    </kendo-gantt>

## Basic Configuration

With the attributes and inner tags you can define the columns, views, DataSource, messages, range and all other widget options available from the [API of the Gantt widget](https://docs.telerik.com/kendo-ui/api/javascript/ui/gantt#methods).

    <kendo-gantt name="gantt" show-work-days="false" show-work-hours="false" snap="false" height="700">
        <tooltip visible="false" />
        <current-time-marker enabled="false" />
        <messages>
            <views day="MyDay" week="MyWeek" month="MyMonth" />
        </messages>
        <columns>
            <gantt-column field="title" title="Title" editable="true" sortable="true"></gantt-column>
            <gantt-column field="resources" title="Assigned Resources" editable="true" sortable="true"></gantt-column>
        </columns>
        <views>
            <gantt-view type="GanttViewType.Day"></gantt-view>
            <gantt-view type="GanttViewType.Week"></gantt-view>
            <gantt-view type="GanttViewType.Month" selected="true"></gantt-view>
        </views>
    </kendo-gantt>

## Functionality and Features

The Gantt provides options for [binding it to data]({% slug binding_gantt_aspnetcore %}).

## See Also

* [Basic Usage of the Gantt TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/gantt/tag-helper)
* [Server-Side API](/api/gantt)
