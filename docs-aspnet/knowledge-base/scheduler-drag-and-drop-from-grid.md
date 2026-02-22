---
title: Drag and Drop Events from Grid to Scheduler
description: Learn how to implement the drag and drop functionality between the {{ site.product }} Grid and {{ site.product }} Scheduler.
type: how-to
page_title: Drag and Drop Events from Grid to Scheduler
previous_url: /helpers/scheduling/scheduler/how-to/drag-and-drop, /html-helpers/scheduling/scheduler/how-to/drag-and-drop
slug: scheduler-drag-and-drop-from-grid
tags: scheduler, drag, drop, events, grid, telerik, core, mvc
res_type: kb
components: ["general"]
component: scheduler
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Scheduler</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>Created with version 2024.4.1112</td>
 </tr>
</table>

## Description

How can I implement a Drag and Drop functionality to allow the user to move events from a [{{ site.framework }} Grid]({% slug htmlhelpers_grid_aspnetcore_overview %}) to the {{ site.framework }} Scheduler?

## Solution

1. Define the Scheduler and the Grid components and bind them to the same Model. Define a `Destory` action for the Grid since it will be triggered when a specified event is moved to the Scheduler.

    ```HtmlHelper
        <div style="width: 50%; margin-left: auto; margin-right: auto;">
            @(Html.Kendo().Scheduler<Telerik.Examples.Mvc.Areas.SchedulerDragAndDrop.Models.MeetingViewModel>()
                .Name("scheduler")
                ...// Additional configuration.
            )

            <h3>Drag events from the Grid to the Scheduler:</h3>
            @(Html.Kendo().Grid<Telerik.Examples.Mvc.Areas.SchedulerDragAndDrop.Models.MeetingViewModel>()
                .Name("grid")
                .Scrollable()
                .Columns(columns => {
                    columns.Bound(c => c.Title);
                    columns.Bound(c => c.Description);
                    columns.Bound(c => c.Start).Format("{0:yyyy/MM/dd HH:mm}");
                    columns.Bound(c => c.End).Format("{0:yyyy/MM/dd HH:mm}");
                })
                .Selectable()
                .DataSource(d => d
                    .Ajax()
                    .Model(m => {
                        m.Id(f => f.MeetingID);
                        m.Field(f => f.MeetingID);
                        m.Field(f => f.Description);
                        m.Field(f => f.Start);
                        m.Field(f => f.End);
                        m.Field(f => f.Title).DefaultValue("No title");
                    })
                    .Read("Meetings_Read", "Home")
                    .Destroy("Meetings_Destroy", "Home")
                )
            )
        </div>
    ```
    {% if site.core %}
    ```TagHelper
        @addTagHelper *, Kendo.Mvc
        <div style="width: 50%; margin-left: auto; margin-right: auto;">
            <kendo-scheduler name="scheduler">
                <!-- Other configuration -->
            </kendo-scheduler>

            <h3>Drag events from the Grid to the Scheduler:</h3>
            <kendo-grid name="grid" height="430" selectable="true">
                <datasource type="DataSourceTagHelperType.Ajax">
                    <schema>
                        <model id="MeetingID">
                            <fields>
                                <field name="MeetingID" type="number"></field>
                                <field name="Description" type="string"></field>
                                <field name="Start" type="date"></field>
                                <field name="End" type="date"></field>
                                <field name="Title" type="string" default-value="No title"></field>
                            </fields>
                        </model>
                    </schema>
                    <transport>
                        <read url="@Url.Action("Meetings_Read","Home")"/>
                        <destroy url="@Url.Action("Meetings_Destroy","Home")"/>
                    </transport>
                </datasource>
                <columns>
                    <column field="Title"/>
                    <column field="Description"/>
                    <column field="Start" format="{0:yyyy/MM/dd HH:mm}"/>
                    <column field="End" format="{0:yyyy/MM/dd HH:mm}"/>
                </columns>
                <scrollable enabled="true"/>
            </kendo-grid>
        </div>
    ```
    {% endif %}

1. Handle the [`DataBound`](/api/kendo.mvc.ui.fluent/schedulereventbuilder#databoundsystemstring) event of the Scheduler and call the `createDropArea()` function that creates the [drop target area](https://docs.telerik.com/kendo-ui/api/javascript/ui/droptargetarea) for the events that will be dropped into the current view.

    ```HtmlHelper
        @(Html.Kendo().Scheduler<Telerik.Examples.Mvc.Areas.SchedulerDragAndDrop.Models.MeetingViewModel>()
            .Name("scheduler")
            .Events(e => e.DataBound("onDataBound"))
            ...// Additional configuration.
        )
    ```
    {% if site.core %}
    ```TagHelper
        @addTagHelper *, Kendo.Mvc

        <kendo-scheduler name="scheduler" on-data-bound="onDataBound">
            <!-- Other configuration -->
        </kendo-scheduler>
    ```
    {% endif %}
    ```JS scripts
        <script type="text/javascript">
            function onDataBound(e) {
                createDropArea(this);
            }

            function createDropArea(scheduler) {
                scheduler.view().content.kendoDropTargetArea({
                    filter: ".k-scheduler-table td, .k-event",
                    drop: function (e) { // Handle the "drop" event that triggers when the draggable is dropped over one of the drop targets.
                        var grid = $("#grid").data("kendoGrid");
                        var scheduler = $("#scheduler").data("kendoScheduler");

                        var offset = $(e.dropTarget).offset(); // Get the x and y-coordinates of the drop target element.

                        var slot = scheduler.slotByPosition(offset.left, offset.top); // Select the target time slot in the Scheduler by using the horizontal and vertical position of the drop target.
                        var dataItem = grid.dataItem(grid.select()); // Get the data item of the selected Grid record.

                        if (dataItem && slot) { // Check if the target slot and the data item are available.
                            var newEvent = { // Create the new event that will be added in the Scheduler.
                                title: dataItem.Title,
                                end: new Date(slot.startDate.getTime() + (dataItem.End - dataItem.Start)),
                                start: slot.startDate,
                                isAllDay: slot.isDaySlot,
                                description: dataItem.Description
                            };

                            // Delete the current event from the Grid.
                            grid.dataSource.remove(dataItem);
                            grid.dataSource.sync();
                            grid.dataSource.read();

                            // Save the new event in the Scheduler and sync it with the server.
                            scheduler.dataSource.add(newEvent);
                            scheduler.dataSource.sync();
                        }
                    }
                });
            }
        </script>
    ```
1. Within the [`$(document).ready()`](https://learn.jquery.com/using-jquery-core/document-ready/) function, get a reference to the Grid and use the [Kendo UI for jQuery Draggable](https://docs.telerik.com/kendo-ui/api/javascript/ui/draggable) widget to allow the row elements to be moved.

    ```JS
    <script type="text/javascript">
        $(function () {
            var grid = $("#grid").data("kendoGrid"),
                gridRowOffset = grid.tbody.find("tr:first").offset();

            grid.table.kendoDraggable({
                filter: "tbody > tr",
                dragstart: function (e) {
                    // Add a margin to correctly position the tooltip under the pointer.
                    $("#dragTooltip").css("margin-left", e.clientX - gridRowOffset.left - 50);
                },
                hint: function (row) {
                    // Remove the old selection,
                    row.parent().find(".k-selected").each(function () {
                        $(this).removeClass("k-selected")
                    });

                    // Add the "k-selected" class to the current row.
                    row.addClass("k-selected");

                    var dataItem = grid.dataItem(row);

                    var tooltipHtml = "<div class='k-event' id='dragTooltip'><div class='k-event-template'>" +
                        kendo.format("{0:t} - {1:t}", dataItem.Start, dataItem.End) +
                        "</div><div class='k-event-template'>" + dataItem.Title +
                        "</div></div>";

                    return $(tooltipHtml).css("width", 300);
                }
            });
        });

        $(document).on("mousedown", ".k-master-row",function () {
            var grid = $("#grid").data("kendoGrid");
            grid.select(this);
        });
    </script>
    ```

For a runnable example, refer to the [ASP.NET MVC application](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/SchedulerDragAndDrop) in the [UI for ASP.NET MVC Examples repository](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master). {% if site.core %}You can use this as a starting point to configure the same behavior in an ASP.NET Core project.{% endif %}

## More {{ site.framework }} Scheduler Resources

* [{{ site.framework }} Scheduler Documentation]({%slug htmlhelpers_scheduler_aspnetcore%})

* [{{ site.framework }} Scheduler Demos](https://demos.telerik.com/{{ site.platform }}/scheduler/index)

{% if site.core %}
* [{{ site.framework }} Scheduler Product Page](https://www.telerik.com/aspnet-core-ui/scheduler)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Scheduler Product Page](https://www.telerik.com/aspnet-mvc/scheduler)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the Scheduler for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler)
* [Server-Side API Reference of the Scheduler for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/scheduler)
{% if site.core %}
* [Server-Side TagHelper API Reference of the Scheduler for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/taghelpers/scheduler)
{% endif %}
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2024%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)

