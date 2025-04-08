---
title: Sending the Selected Grid Rows to the Controller
description: An example on how to get the selected {{ site.product }} Grid rows and send them through an AJAX request to the Controller.
type: how-to
page_title: Send the Selected Grid Rows through an AJAX request to the Controller.
slug: grid-send-selected-rows-through-ajax-to-controller
tags: grid, selected, rows, ajax, controller, server
ticketid: 1579778
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product Version</td>
  <td>2022.3.913</td>
 </tr>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Grid</td>
 </tr>
</table>

## Description

How can I get the selected rows in the {{ site.product }} Grid and send them through an AJAX request to the server?

## Solution

1. Create a button and handle its `click` event.
1. Use the client-side [`select()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/select) method to get the selected row elements.
1. Iterate through the selected rows, retrieve the respective data item through the [`dataItem()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/dataitem) method of the Grid, and store it in an array `selectedDataItems`.
1. Convert the data items into strings by using the [`JSON.stringify()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) method.
1. Perform an asynchronous HTTP (Ajax) request to the server.
1. Access the received data on the server.

```HtmlHelper
    @(Html.Kendo().Button()
        .Name("sendDataBtn")
        .Content("Submit selected Grid rows to the server")
        .HtmlAttributes(new { type = "button" })
        .Events(ev => ev.Click("onClick"))
    )

    @(Html.Kendo().Grid<GridModel>()
      .Name("grid")
      .Selectable(selectable => selectable.Mode(GridSelectionMode.Multiple))
      //Other configuration
    )
    
```
```JavaScript
    function onClick() {
        var grid = $("#grid").data("kendoGrid");
        var selectedDataItems = [];
        var selectedRows = grid.select();
          
        for (var i = 0; i < selectedRows.length; i++) {
          var dataItem = grid.dataItem(selectedRows[i]);
          selectedDataItems.push(dataItem);
        }
        
        var rows = JSON.stringify(selectedDataItems);
        
        $.ajax({
            url: '@Url.Action("GetSelectedRows","Grid")',
            data: rows,
            dataType: "json",
            type: "POST",
            contentType: 'application/json;'
        });
    }
```
```C# GridController
  public ActionResult GetSelectedRows([FromBody] List<GridModel> rows)
  {
    List<GridModel> selecteditems = rows;
    ...
  }

```

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})

* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid/index)

{% if site.core %}
* [{{ site.framework }} DataGrid Product Page](https://www.telerik.com/aspnet-core-ui/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-mvc/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
