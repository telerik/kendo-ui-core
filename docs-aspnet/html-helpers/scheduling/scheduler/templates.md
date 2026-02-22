---
title: Templates  
page_title: Templates  
description: "Learn how to use templates to customize the appearance of the Telerik UI for {{ site.framework }} Scheduler component."  
components: ["scheduler"]
slug: scheduler_templates  
position: 8
---

# Templates

The Scheduler component provides different types of templates that allow you to customize the Scheduler's appearance and functionality. The template options can be used to modify event rendering, date and time headers, and other visual elements of the Scheduler.

## Template Options

* [EventTemplate](#eventtemplate)
* [AllDayEventTemplate](#alldayeventtemplate)
* [DateHeaderTemplate](#dateheadertemplate)
* [GroupHeaderTemplate](#groupheadertemplate)
* [MajorTimeHeaderTemplate](#majortimeheadertemplate)
* [MinorTimeHeaderTemplate](#minortimeheadertemplate)
* [Views Templates](#viewstemplates)

---

## EventTemplate

The following example shows how to use the `EventTemplate` to customize the Scheduler events:

- `description` (the Description of the event)
- `end` (the End Date of the event)
- `resources` (the Resources for the event)
- `start` (the Start Date of the event)
- `title` (the Title of the event)

The following example shows how to configure the `EventTemplate` for the Scheduler Component:

```HtmlHelper
@(Html.Kendo().Scheduler<Kendo.Mvc.Examples.Models.Scheduler.TaskViewModel>()
    .Name("scheduler")
    .Date(new DateTime(2022, 6, 13))
    .StartTime(new DateTime(2022, 6, 13, 7, 00, 00))
    .Height(600)
    .Views(views =>
    {
        views.WeekView();
        views.MonthView();
    })
    .Timezone("Etc/UTC")
    .Resources(resource =>
    {
        resource.Add(m => m.OwnerID)
            .Title("Owner")
            .DataTextField("Text")
            .DataValueField("Value")
            .BindTo(new[] {
                new { Text = "Alex", Value = 1 },
                new { Text = "Bob", Value = 2 },
                new { Text = "Charlie", Value = 3 }
            });
    })
    .DataSource(d => d
        .Model(m =>
        {
            m.Id(f => f.TaskID);
            m.Field(f => f.Title);   
            m.Field(f => f.Start);
            m.Field(f => f.End);
            m.Field(f => f.OwnerID);
        })
        .Read("Basic_Usage_Read", "Scheduler")
    )
    .EventTemplate(
        "<div>" +
        "<strong>#= title #</strong><br />" +  
        "<small>#= kendo.toString(start, 'hh:mm tt') # - #= kendo.toString(end, 'hh:mm tt') #</small><br />" +
        "</div>"
    )
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc
@using Kendo.Mvc.UI

@{
    var resources = new[]
    {
        new { Text = "Alex", Value = 1, Color = "#f8a398" } ,
        new { Text = "Bob", Value = 2, Color = "#51a0ed" } ,
        new { Text = "Charlie", Value = 3, Color = "#56ca85" }
    };

    string defaultTitle = "No Title";
}

<kendo-scheduler name="scheduler" 
    date="new DateTime(2022, 6, 13)" 
    start-time="new DateTime(2022, 6, 13, 7, 00, 00)"
    height="600"
    timezone="Etc/UTC" 
    event-template="<div><strong>#= title #</strong><br /><small>#= kendo.toString(start, 'hh:mm tt') # - #= kendo.toString(end, 'hh:mm tt') #</small><br /></div>">
    <views>
        <view type="day"></view>
        <view type="workWeek" selected="true"></view>
        <view type="week"></view>
        <view type="month"></view>
        <view type="year"></view>
        <view type="agenda"></view>
        <view type="timeline"></view>
    </views>
    <resources>
        <resource field="OwnerID" title="Owner" datatextfield="Text" datavaluefield="Value" datacolorfield="Color" bind-to="@resources">
        </resource>
    </resources>
    <scheduler-datasource type="@DataSourceTagHelperType.Ajax">
        <transport>
            <read url="@Url.Action("Read", "Scheduler")" />
            <create url="@Url.Action("Create", "Scheduler")" />
            <destroy url="@Url.Action("Destroy", "Scheduler")" />
            <update url="@Url.Action("Update", "Scheduler")" />
        </transport>
        <schema data="Data" total="Total">
            <scheduler-model id="TaskID">
                <fields>
                    <field name="TaskID" type="number"></field>
                    <field name="title" from="Title" type="string" default-value="@defaultTitle"></field>
                    <field name="start" from="Start" type="date"></field>
                    <field name="end" from="End" type="date"></field>
                    <field name="description" from="Description" type="string"></field>
                    <field name="OwnerID" type="number" default-value="1"></field>
                </fields>
            </scheduler-model>
        </schema>
    </scheduler-datasource>
</kendo-scheduler>
```
{% endif %}

## AllDayEventTemplate

The `AllDayEventTemplate` is used to render the "all day" scheduler events. The following fields are available in the template:

- `description` (the Description of the event)
- `end` (the End Date of the event)
- `isAllDay` (if set to `true`, the event is "all day")
- `resources` (the Resources for the event)
- `start` (the Start Date of the event)
- `title` (the Title of the event)

The following example shows how to configure the `AllDayEventTemplate` for the Scheduler Component:

```HtmlHelper
    .AllDayEventTemplate(
        "<div class='all-day-event'>" +
        "<strong>#= title #</strong> - All day<br />" +
        "</div>"
    )
```
{% if site.core %}
```TagHelper
    <kendo-scheduler name="scheduler"
        date="new DateTime(2022, 6, 13)"
        start-time="new DateTime(2022, 6, 13, 7, 00, 00)"
        height="600"
        timezone="Etc/UTC"
        all-day-event-template="<div><strong> All Day Template for #= title #</strong><br /></div>">
    </kendo-scheduler>
```
{% endif %}

## DateHeaderTemplate

The `DateHeaderTemplate` is used to render the date header cells. By default, the scheduler renders the date using a custom format - "ddd M/dd". The "ddd" specifier represents the abbreviated name of the weekday and will be localized using the current Kendo UI culture. 

If you want to control the day and month order, you can define a custom template. The following field is available for use in the template:

- `date` (the major tick date)

The following example shows how to configure the `DateHeaderTemplate` for the Scheduler Component:

```HtmlHelper
    .DateHeaderTemplate("<strong>#=kendo.toString(date, 'd')#</strong>")
```
{% if site.core %}
```TagHelper
<kendo-scheduler name="scheduler"
    date="new DateTime(2022, 6, 13)"
    start-time="new DateTime(2022, 6, 13, 7, 00, 00)"
    height="600"
    timezone="Etc/UTC"
    date-header-template="<strong>#= kendo.toString(date, 'd') #</strong>">
</kendo-scheduler>
```
{% endif %}

## GroupHeaderTemplate

You can use the `GroupHeaderTemplate` to modify the rendering of the group headers in the `Day`, `Week`, `WorkWeek`, and `Timeline` Views. The following fields are available for use in the template:

- `text` (the group text)
- `color` (the group color)
- `value` (the group value)
- `field` (the resource field of the Scheduler event which contains the resource id)
- `title` (the 'title' option of the resource)
- `name` (the 'name' option of the resource)

The following example shows how to configure the `GroupHeaderTemplate` of the Scheduler:

```HtmlHelper
    .GroupHeaderTemplate("<strong style='color: green'>#=text#</strong>")

```
{% if site.core %}
```TagHelper
    <kendo-scheduler name="scheduler" 
        date="new DateTime(2022, 6, 13)"
        start-time="new DateTime(2022, 6, 13, 7, 00, 00)"
        height="600"
        timezone="Etc/UTC"
        group-header-template="<strong style='color: green'>#=text#</strong>">
    </kendo-scheduler>

```
{% endif %}

## MajorTimeHeaderTemplate

The `MajorTimeHeaderTemplate` allows you to modify the major ticks. By default, the Scheduler renders the time using the current culture time format. The following field is available for use in the template:

- `date` (the major tick date)

The following example shows how to configure the `MajorTimeHeaderTemplate` for the Scheduler Component:

```HtmlHelper
    .MajorTimeHeaderTemplate("<strong>#=kendo.toString(date, 'HH:mm')#</strong>")
```
{% if site.core %}
```TagHelper
    <kendo-scheduler name="scheduler" 
        date="new DateTime(2022, 6, 13)" 
        start-time="new DateTime(2022, 6, 13, 7, 00, 00)"
        height="600"
        timezone="Etc/UTC"
        major-time-header-template="<strong>#=kendo.toString(date, 'HH:mm')#</strong>">
    </kendo-scheduler>

```
{% endif %}

## MinorTimeHeaderTemplate

The `MinorTimeHeaderTemplate` option specifies how the minor ticks are displayed. By default, the Scheduler renders a `&nbsp;`. The following field is available for use in the template:

- `date` (the major tick date)

The following example shows how to configure the `MinorTimeHeaderTemplate` for the Scheduler Component:

```HtmlHelper
    .MinorTimeHeaderTemplate("<small>#=kendo.toString(date, 'mm')#</small>")
```
{% if site.core %}
```TagHelper
    <kendo-scheduler name="scheduler" 
        date="new DateTime(2022, 6, 13)" 
        start-time="new DateTime(2022, 6, 13, 7, 00, 00)"
        height="600"
        timezone="Etc/UTC"
        minor-time-header-template="<small>#=kendo.toString(date, 'mm')#</small>">
    </kendo-scheduler>
```
{% endif %}

## ViewsTemplates

The views displayed by the Scheduler can also use all the Templates listed above.

## See Also

* [Using the Scheduler Templates (Demo)](https://demos.telerik.com/{{ site.platform }}/scheduler/templates)
* [Server-Side API of the Scheduler HtmlHelper](/api/scheduler)
{% if site.core %}
* [Server-Side API of the Scheduler TagHelper](/api/taghelpers/scheduler)
{% endif %}
* [Client-Side API of the Scheduler](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler)