---
title: Grouping
page_title: Grouping
description: "Group the resources in the Telerik UI Scheduler TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: grouping_scheduler_aspnetcore
position: 3
---

# Grouping

The Scheduler provides options for grouping its resources.

By default, the `group.resources` option is disabled.

```cshtml
        @(Html.Kendo().Scheduler<Kendo.Mvc.Examples.Models.Scheduler.TaskViewModel>()
            .Name("scheduler")
            .Date(new DateTime(2013, 6, 13))
            .StartTime(new DateTime(2013, 6, 13, 7, 00, 00))
            .Height(600)
            .Group(group => { group.Resources("Owner"); })
            .Views(views =>
            {
                views.DayView();
                views.WorkWeekView(workWeekView =>
                {
                    workWeekView.Selected(true);
                });
                views.WeekView();
                views.MonthView();
                views.AgendaView();
                views.TimelineView();
            })
            .Timezone("Etc/UTC")
            .Resources(resource =>
            {
                resource.Add(m => m.OwnerID)
                    .Title("Owner")
                    .DataTextField("Text")
                    .DataValueField("Value")
                    .DataColorField("Color")
                    .BindTo(new[] {
                        new { Text = "Alex", Value = 1, Color = "#f8a398" } ,
                        new { Text = "Bob", Value = 2, Color = "#51a0ed" } ,
                        new { Text = "Charlie", Value = 3, Color = "#56ca85" }
                    });
            })
            .DataSource(d => d
                .Events(e => e.Error("onError"))
                .Model(m =>
                {
                    m.Id(f => f.TaskID);
                    m.Field(f => f.Title).DefaultValue("No title");
                    m.Field(f => f.OwnerID).DefaultValue(1);
                    m.RecurrenceId(f => f.RecurrenceID);
                })
                .Read("Read", "Scheduler")
                .Create("Create", "Scheduler")
                .Destroy("Destroy", "Scheduler")
                .Update("Update", "Scheduler")
                .Filter(filters =>
                {
                    filters.Add(model => model.OwnerID).IsEqualTo(1).Or().IsEqualTo(2);
                })
            )
        )
```
```tagHelper
        @{
            var resources = new[]
            {
                new { Text = "Alex", Value = 1, Color = "#f8a398" },
                new { Text = "Bob", Value = 2, Color = "#51a0ed" },
                new { Text = "Charlie", Value = 3, Color = "#56ca85" },
            };
        }
        <kendo-scheduler name="scheduler" height="600" date="new DateTime(2013, 6, 13)" selectable="true" start-time="new DateTime(2013, 6, 13, 7, 0, 0, 0)" timezone="Etc/UTC">
            <views>
                <view type="day"></view>
                <view type="workWeek" selected="true"></view>
                <view type="week"></view>
                <view type="month"></view>
                <view type="agenda"></view>
                <view type="timeline"></view>
            </views>
            <group>
                <resources>
                    <group-resource name="Owner" />
                </resources>
            </group>
            <resources>
                <resource name="Owner" datacolorfield="Color" datatextfield="Text" datavaluefield="Value" field="OwnerID" bind-to="@resources">
                </resource>
            </resources>
            <scheduler-datasource>
                <transport>
                    <read url="https://demos.telerik.com/kendo-ui/service/tasks" type="jsonp" />
                    <update url="https://demos.telerik.com/kendo-ui/service/tasks/update" type="jsonp" />
                </transport>
                <schema data="Data" total="Total" errors="Errors">
                    <scheduler-model id="TaskID">
                        <fields>
                            <field name="TaskID" type="number"></field>
                            <field name="title" from="Title" type="string"></field>
                            <field name="start" from="Start" type="date"></field>
                            <field name="end" from="End" type="date"></field>
                            <field name="description" from="Description" type="number"></field>
                            <field name="recurrenceId" type="number" from="RecurrenceID"></field>
                            <field name="recurrenceRule" type="string" from="RecurrenceRule"></field>
                            <field name="recurrenceException" type="string" from="RecurrenceException"></field>
                            <field name="OwnerID" type="number"></field>
                            <field name="startTimezone" from="StartTimeZone" type="string"></field>
                            <field name="endTimezone" from="EndTimeZone" type="string"></field>
                            <field name="isAllDay" from="IsAllDay" type="boolean"></field>
                        </fields>
                    </scheduler-model>
                </schema>
            </scheduler-datasource>
        </kendo-scheduler>
```

## See Also

* [Server-Side API](/api/scheduler)
