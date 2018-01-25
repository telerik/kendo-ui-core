---
title: MVC Gantt Initialized in Container Does not Render Properly
description: An example on how properly display Telerik UI for ASP.NET MVC Gantt chart, when it is placed in initially hidden container.
type: troubleshooting
page_title: Gantt Inside Hidden Container | Telerik UI for ASP.NET MVC Gantt
slug: gantt-inside-container
tags: kendo, kendoui, gantt, hiden, container
ticketid: 1144634
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Telerik UI for ASP.NET MVC Gantt</td>
 </tr>
</table>

## Description

I have a Gantt chart placed in a PanelBar item content, which is not visible initially. When activating the item in question, the Gantt chart is not rendered properly.

## Solution

The issue observed is caused by the fact that the Gantt chart has been initialized in a hidden (display: none;) container. To avoid that, you will need to use [the deferred initialization](https://docs.telerik.com/aspnet-mvc/getting-started/fundamentals#configuration-Deferring) of the Gantt and initialize that widget on the first [`activate`](https://docs.telerik.com/kendo-ui/api/javascript/ui/panelbar#events-activate) event of the PanelBarItem that contains it:

```C#
@(Html.Kendo().Gantt<InPanelBar.Models.TaskViewModel, InPanelBar.Models.DependencyViewModel>()
    .Name("Gantt")
	...
    .Deferred()
)
```

and:

```JavaScript
function onActivate(e) {
    var item = e.item;
    var title = $(item).find('a.k-header').text();
    var gantt = $('#Gantt').getKendoGantt();
 
    if (title === "Add Contenuti" && !gantt) {
        @Html.Kendo().DeferredScriptsFor("Gantt", false);
    }
}
```

## See Also

* [API Reference of the Spreadsheet](https://docs.telerik.com/kendo-ui/api/javascript/ui/gantt)
