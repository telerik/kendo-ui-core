---
title: Highlight the hovered row in Gantt
description: How can I highlight the hovered row in Gantt component for{{ site.product }}?
type: how-to
page_title: Change the color of the highlighted row in Gantt
slug: gantt-highlight-hovered-row
tags: gantt, hover, change, color
res_type: kb
ticketid: 1538429
component: gantt
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product Version</td>
			<td>2023.2.829</td>
		</tr>
		<tr>
			<td>Product</td>
			<td>Gantt for Progress® Telerik® {{ site.product_short }}</td>
		</tr>
	</tbody>
</table>


## Description

How can I change the color of the hovered row in the Telerik UI for {{ site.product_short }} Gantt ?

## Solution

The example below relies on the following key steps:

1. Handle the ["mouseenter"](https://api.jquery.com/mouseenter/) Event of a cell in the Grid.
1. Remove previously assigned **"custom"** class.
1. Get the index of the hovered row.
1. Add the **"custom"** class to the current target.
1. Add the **"custom"** class to the corresponding row(using the index from step 3) in the right calendar part of the Gantt.
1. Add color to the **"custom"** class.
1. Here is an example of the code:

    ```Razor
       @using Kendo.Mvc.Examples.Models.Gantt;

       @(Html.Kendo().Gantt<TaskViewModel, DependencyViewModel>()
           .Name("gantt")
           .Columns(columns =>
           {
               columns.Bound(c => c.TaskID).Title("ID").Width(50);
               columns.Bound(c => c.Title).Editable(true).Sortable(true);
               columns.Group(g =>
               {
                   g.Bound(c => c.Start).Width(100).Editable(true).Sortable(true);
                   g.Bound(c => c.End).Width(100).Editable(true).Sortable(true);
               }).Title("Timings");
           })
           .Views(views =>
           {
               views.DayView();
               views.WeekView(weekView => weekView.Selected(true));
               views.MonthView();
           })
           .Height(700)
           .ShowWorkHours(false)
           .ShowWorkDays(false)
           .Snap(false)
           .DataSource(d => d
               .Model(m =>
               {
                   m.Id(f => f.TaskID);
                   m.ParentId(f => f.ParentID);
                   m.Field(f => f.Expanded).DefaultValue(true);
               })
               .Read("Basic_Usage_ReadTasks", "Gantt")
               .Destroy("Basic_Usage_DestroyTask", "Gantt")
               .Update(update => update.Action("Basic_Usage_UpdateTask", "Gantt").Data("onUpdateCreate"))
               .Create(create => create.Action("Basic_Usage_CreateTask", "Gantt").Data("onUpdateCreate"))
           )
           .DependenciesDataSource(d => d
               .Model(m =>
               {
                   m.Id(f => f.DependencyID);
                   m.PredecessorId(f => f.PredecessorID);
                   m.SuccessorId(f => f.SuccessorID);
               })
               .Read("Basic_Usage_ReadDependencies", "Gantt")
               .Create("Basic_Usage_CreateDependency", "Gantt")
               .Destroy("Basic_Usage_DestroyDependency", "Gantt")
           )
       )
    ```

    ```JavaScript
      $(document).ready(function(){
            var gantt = $("#gantt").data("kendoGantt");
            gantt.wrapper.on("mouseenter", "[role='gridcell']", function(e) {       
             
              $('.custom').removeClass('custom')
              var index = $(e.target).parent().index();
              $($(e.target)[0].parentElement).addClass('custom');
              $('.k-gantt-tasks tr').eq(index).addClass('custom');
            })
      })
    ```
    
    ```CSS
      <style>
        .custom{
          background-color: yellow !important
        }
      </style>
    ```

For a runnable example based on the code above, refer to the:
* [REPL example on coloring the hovered row in Gantt](https://netcorerepl.telerik.com/GxaNcaFo06BCWG8a26)

* [Dojo example on coloring the hovered row in Gantt](https://dojo.telerik.com/@anton.mironov/UJEXohiW).

## More {{ site.framework }} Gantt Resources

* [{{ site.framework }} Gantt Documentation]({%slug htmlhelpers_gantt_aspnetcore%})

* [{{ site.framework }} Gantt Server API](https://docs.telerik.com/{{ site.platform }}/api/gantt)

{% if site.core %}
* [{{ site.framework }} Gantt TagHelper API](https://docs.telerik.com/aspnet-core/api/taghelpers/gantt)
{% endif %}

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

## See Also

* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
