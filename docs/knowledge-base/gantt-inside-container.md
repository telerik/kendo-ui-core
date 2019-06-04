---
title: Gantt for ASP.NET MVC Initialized in Container Does Not Render Properly
description: I want to properly display the Telerik UI for ASP.NET MVC Gantt chart when it is placed in an initially hidden container.
type: troubleshooting
page_title: Gantt Inside Hidden Container Does Not Properly Render | Kendo UI Gantt for ASP.NET MVC
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

My Gantt chart is placed in PanelBar item content that is not initially visible. When activating this item, the Gantt does not render properly.

## Cause

The Gantt was initialized in a hidden (`display: none;`) container.

## Solutions

1. Use [the deferred initialization](https://docs.telerik.com/aspnet-mvc/getting-started/fundamentals#configuration-Deferring) of the Gantt.

    ```C#
    @(Html.Kendo().Gantt<InPanelBar.Models.TaskViewModel, InPanelBar.Models.DependencyViewModel>()
    .Name("Gantt")
    ...
    .Deferred()
    )
    ```
1. Initialize the widget on the first [`activate`](https://docs.telerik.com/kendo-ui/api/javascript/ui/panelbar/events/activate) event of the PanelBarItem that contains it.

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

* [API Reference of the Gantt](https://docs.telerik.com/kendo-ui/api/javascript/ui/gantt)
