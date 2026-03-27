---
title: Switch Between Day, Week, Month, and Year Views in the Gantt
description: Learn how to configure multiple timeline views in the Telerik UI Gantt for ASP.NET Core and switch between them using custom view selector buttons.
type: how-to
page_title: Configure and Switch Gantt Timeline Views for {{ site.product }}
slug: gantt-views
tags: gantt, views, day, week, month, year, timeline, switch
res_type: kb
component: gantt
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Gantt</td>
 </tr>
</table>

## Description

How can I configure the Telerik UI for {{ site.product_short }} Gantt to support Day, Week, Month, and Year views and switch between them with custom buttons?

## Solution

The Gantt component supports multiple built-in views via its `Views` configuration. To switch views programmatically from the client side, use the `view()` method of the Gantt client-side API.

The following approach demonstrates how to:

1. Configure the Gantt with all four view types and set Month as the default selected view.
2. Create custom view selector buttons outside the Gantt.
3. Handle the `Navigate` event to keep the custom buttons synchronized when the user switches views.

### View Configuration

```HtmlHelper
@using Kendo.Mvc.Examples.Models.Gantt;

@(Html.Kendo().Gantt<TaskViewModel, DependencyViewModel>()
    .Name("gantt")
    .Columns(columns =>
    {
        columns.Bound(c => c.TaskID).Title("ID").Width(50);
        columns.Bound(c => c.Title).Editable(true).Sortable(true);
        columns.Bound(c => c.Start).Title("Start Time").Format("{0:MM/dd/yyyy}").Width(100).Editable(true).Sortable(true);
    })
    .Views(views =>
    {
        views.DayView();
        views.WeekView();
        views.MonthView(monthView => monthView.Selected(true));
        views.YearView();
    })
    .Height(430)
    .ShowWorkHours(false)
    .ShowWorkDays(false)
    .Snap(false)
    .Editable(false)
    .Events(events => events.Navigate("onGanttNavigate"))
    .DataSource(d => d
        .Model(m =>
        {
            m.Id(f => f.TaskID);
            m.ParentId(f => f.ParentID);
            m.OrderId(f => f.OrderId);
            m.Field(f => f.Expanded).DefaultValue(true);
        })
        .Read("Views_Read_Tasks", "Gantt")
    )
    .DependenciesDataSource(d => d
        .Model(m =>
        {
            m.Id(f => f.DependencyID);
            m.PredecessorId(f => f.PredecessorID);
            m.SuccessorId(f => f.SuccessorID);
            m.Type(f => f.Type);
        })
        .Read("Views_Read_Dependencies", "Gantt")
    )
)
```
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-gantt name="gantt"
    snap="false"
    height="430"
    show-work-days="false"
    show-work-hours="false"
    editable="false"
    on-navigate="onGanttNavigate">
    <columns>
        <gantt-column field="TaskID" title="ID" width="50px"></gantt-column>
        <gantt-column field="title" title="Title" editable="true">
            <sortable enabled="true" />
        </gantt-column>
        <gantt-column field="start" title="Start Time" format="{0:MM/dd/yyyy}" width="100" editable="true">
            <sortable enabled="true" />
        </gantt-column>
    </columns>
    <views>
        <gantt-view type="GanttViewType.Day"></gantt-view>
        <gantt-view type="GanttViewType.Week"></gantt-view>
        <gantt-view type="GanttViewType.Month" selected="true"></gantt-view>
        <gantt-view type="GanttViewType.Year"></gantt-view>
    </views>
    <gantt-datasource type="DataSourceTagHelperType.Ajax">
        <schema data="Data" total="Total" errors="Errors">
            <model id="TaskID">
                <fields>
                    <field name="TaskID" type="number"></field>
                    <field name="parentId" from="ParentID" type="number" default-value="null"></field>
                    <field name="orderId" from="OrderId" type="number"></field>
                    <field name="title" from="Title" type="string"></field>
                    <field name="start" from="Start" type="date"></field>
                    <field name="end" from="End" type="date"></field>
                    <field name="summary" from="Summary" type="boolean"></field>
                    <field name="expanded" from="Expanded" type="boolean" default-value="true"></field>
                    <field name="percentComplete" from="PercentComplete" type="number"></field>
                </fields>
            </model>
        </schema>
        <transport>
            <read url="@Url.Action("Views_Read_Tasks", "Gantt")" />
        </transport>
    </gantt-datasource>
    <dependency-datasource name="dependencies" type="DataSourceTagHelperType.Ajax">
        <schema>
            <model id="DependencyID">
                <fields>
                    <field name="DependencyID" type="number"></field>
                    <field name="predecessorId" from="PredecessorID" type="number"></field>
                    <field name="successorId" from="SuccessorID" type="number"></field>
                    <field name="type" from="Type" type="number"></field>
                </fields>
            </model>
        </schema>
        <transport>
            <read url="@Url.Action("Views_Read_Dependencies", "Gantt")" />
        </transport>
    </dependency-datasource>
</kendo-gantt>
```

### Custom View Selector Buttons

Place these buttons above the Gantt to provide a visual view switcher.

```html
<div class="gantt-view-buttons">
    <button type="button" class="gantt-view-btn" data-view="day">Day</button>
    <button type="button" class="gantt-view-btn" data-view="week">Week</button>
    <button type="button" class="gantt-view-btn active" data-view="month">Month</button>
    <button type="button" class="gantt-view-btn" data-view="year">Year</button>
</div>
```

### Client-Side Event Handling

```JavaScript
$(document).on("kendoReady", function () {
    $(".gantt-view-btn").on("click", function () {
        var gantt = $("#gantt").data("kendoGantt");
        var selectedView = $(this).data("view");

        $(".gantt-view-btn").removeClass("active");
        $(this).addClass("active");

        gantt.view(selectedView);
    });
});

function onGanttNavigate(e) {
    var viewName = e.view;
    $(".gantt-view-btn").removeClass("active");
    $(".gantt-view-btn[data-view='" + viewName + "']").addClass("active");
}
```

### Controller

The controller provides data endpoints for the Gantt tasks and dependencies.

```Controller
public partial class GanttController : Controller
{
    [Demo]
    public IActionResult Views()
    {
        return View();
    }

    public virtual JsonResult Views_Read_Tasks([DataSourceRequest] DataSourceRequest request)
    {
        return Json(GetViewsTasks().ToDataSourceResult(request));
    }

    public virtual JsonResult Views_Read_Dependencies([DataSourceRequest] DataSourceRequest request)
    {
        return Json(GetViewsDependencies().ToDataSourceResult(request));
    }

    private IList<TaskViewModel> GetViewsTasks()
    {
        return new List<TaskViewModel>
        {
            new TaskViewModel { TaskID = 1, Title = "Project Plan", ParentID = null, OrderId = 0, Start = new DateTime(2024, 7, 14), End = new DateTime(2024, 8, 31), PercentComplete = 0.52m, Summary = true, Expanded = true },
            new TaskViewModel { TaskID = 2, Title = "Research Phase", ParentID = 1, OrderId = 0, Start = new DateTime(2024, 7, 14), End = new DateTime(2024, 7, 20), PercentComplete = 1m, Summary = false, Expanded = true },
            new TaskViewModel { TaskID = 3, Title = "Design Phase", ParentID = 1, OrderId = 1, Start = new DateTime(2024, 7, 8), End = new DateTime(2024, 7, 19), PercentComplete = 1m, Summary = false, Expanded = true },
            new TaskViewModel { TaskID = 4, Title = "Development", ParentID = 1, OrderId = 2, Start = new DateTime(2024, 7, 18), End = new DateTime(2024, 8, 16), PercentComplete = 0.6m, Summary = true, Expanded = true },
            new TaskViewModel { TaskID = 5, Title = "Backend Development", ParentID = 4, OrderId = 0, Start = new DateTime(2024, 7, 18), End = new DateTime(2024, 8, 2), PercentComplete = 0.75m, Summary = false, Expanded = true },
            new TaskViewModel { TaskID = 6, Title = "Frontend Development", ParentID = 4, OrderId = 1, Start = new DateTime(2024, 7, 29), End = new DateTime(2024, 8, 16), PercentComplete = 0.45m, Summary = false, Expanded = true },
            new TaskViewModel { TaskID = 7, Title = "Testing & QA", ParentID = 1, OrderId = 3, Start = new DateTime(2024, 8, 7), End = new DateTime(2024, 8, 17), PercentComplete = 0.2m, Summary = false, Expanded = true },
            new TaskViewModel { TaskID = 8, Title = "Deployment & Launch", ParentID = 1, OrderId = 4, Start = new DateTime(2024, 8, 16), End = new DateTime(2024, 8, 24), PercentComplete = 0m, Summary = false, Expanded = true }
        };
    }

    private IList<DependencyViewModel> GetViewsDependencies()
    {
        return new List<DependencyViewModel>
        {
            new DependencyViewModel { DependencyID = 1, PredecessorID = 2, SuccessorID = 3, Type = DependencyType.FinishStart },
            new DependencyViewModel { DependencyID = 2, PredecessorID = 3, SuccessorID = 4, Type = DependencyType.FinishStart },
            new DependencyViewModel { DependencyID = 3, PredecessorID = 5, SuccessorID = 6, Type = DependencyType.FinishFinish },
            new DependencyViewModel { DependencyID = 4, PredecessorID = 6, SuccessorID = 7, Type = DependencyType.FinishStart },
            new DependencyViewModel { DependencyID = 5, PredecessorID = 7, SuccessorID = 8, Type = DependencyType.FinishStart }
        };
    }
}
```

For a runnable example, refer to the [Gantt Views demo](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Views/Gantt/Views.cshtml).

## See Also

* [{{ site.framework }} Gantt Documentation]({%slug htmlhelpers_gantt_aspnetcore%})

* [{{ site.framework }} Gantt Demos](https://demos.telerik.com/{{ site.platform }}/gantt)

{% if site.core %}
* [{{ site.framework }} Gantt Product Page](https://www.telerik.com/aspnet-core-ui/gantt-chart)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Gantt Product Page](https://www.telerik.com/aspnet-mvc/ganttchart)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
