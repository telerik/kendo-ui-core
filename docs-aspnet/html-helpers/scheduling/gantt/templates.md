---
title: Templates
page_title: Templates
description: "Use templates and customize the rendering of the tasks of the Telerik UI Gantt HtmlHelper for {{ site.framework }}."
slug: htmlhelpers_gantt_templates_aspnetcore
position: 6
---

# Templates

To customize the way the tasks of the Gantt are rendered, use the `TaskTemplateId` configuration option.

```
    @(Html.Kendo().Gantt<TaskViewModel, DependencyViewModel>()
        .Name("gantt")
        .Columns(columns =>
        {
            columns.Bound(c => c.Title).Editable(true).Sortable(true);
            columns.Resources("resources").Editable(true).Title("Assigned Resources");
        })
        .Views(views =>
        {
            views.DayView();
            views.WeekView(weekView => weekView.Selected(true));
        })
        .Height(700)
        .TaskTemplateId("task-template")
        .RowHeight(62)
    )

     <!-- Template -->
     <script id="task-template" type="text/x-kendo-template">
        # if (resources[0]) { #
        <div class="template" style="background-color: #= resources[0].color #;">
            <img class="resource-img" src="../shared/web/gantt/resources/#:resources[0].id#.jpg" alt="#: resources[0].id #" />
            <div class="wrapper">
                <strong class="title">#= title # </strong>
                <span class="resource">#= resources[0].name #</span>
            </div>
            <div class="progress" style="width:#= (100 * parseFloat(percentComplete)) #%"> </div>
        </div>
        # } else { #
        <div class="template">
            <div class="wrapper">
                <strong class="title">#= title # </strong>
                <span class="resource">no resource assigned</span>
            </div>
            <div class="progress" style="width:#= (100 * parseFloat(percentComplete)) #%"> </div>
        </div>
        # } #
    </script>
```

For a runnable example, refer to the [Task Templates demo](https://demos.telerik.com/{{ site.platform }}/gantt/task-template).

For more information on the capabilities and syntax of the templates, refer to the [Kendo UI Templates Overview documentation article](https://docs.telerik.com/kendo-ui/framework/templates/overview). 

## See Also

* [Task Templates in the Gantt HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/gantt/task-template)
* [Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/gantt)
* [Server-Side API](/api/gantt)
