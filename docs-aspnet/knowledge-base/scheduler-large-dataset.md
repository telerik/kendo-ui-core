---
title: Large Data Set in Scheduler
description: Preventing the Scheduler from crashing when a large amount of events is present.
type: how-to
page_title: Scheduler Working with High Amounts of Data
slug: scheduler-large-dataset
position: 
tags: Scheduler, dataset, large, paging, filtering, pagination, 500k
ticketid: 1622308
res_type: kb
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
            <td>Scheduler for ASP.NET Core</td>
        </tr>
    </tbody>
</table>


## Description
We have implemented a {{ site.product }} Scheduler and have 500K+ entries of data. We cannot call GetAll() to load all the data in one go as it crashes the Scheduler.

## Solution
To control the number of events that are populated in the {{ site.product }} Scheduler add the current date and the currently selected view as additional data to the Read transport of the DataSource:

```
.Read(read=>read.Action("Overview_Read", "Scheduler").Data("additionalData"))
```
```
function additionalData(e){
        var scheduler = $("#scheduler").data("kendoScheduler");
        var date = scheduler.date();
        var view = scheduler.viewName();
        var data = { Date: date, View: view };
        return data;
    }
```
This will allow you to use the Date and View type (for example 'week') at the server-side to return events only for that time period.

Review the code above in [this Telerik REPL example](https://netcorerepl.telerik.com/cnuXkplF02JV6BYJ06).

Furthermore,  subscribe to the [Navigate Event](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler/events/navigate) of the Scheduler. In the handler of the event you can force another read request to ensure new data is applied when the selected View or Date change.

## More {{ site.framework }} Scheduler Resources

* [{{ site.framework }} Scheduler Documentation](/html-helpers/scheduling/scheduler/overview)

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
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)