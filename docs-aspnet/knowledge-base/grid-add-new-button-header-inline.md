---
title: Inserting a Button inside a Column Header Template
description: An example on how to place an Add New Record button in the column header of the Grid in {{ site.product }}.
type: how-to
page_title: Adding New Record Button in Column Header
slug: grid-add-new-button-header-inline
tags: grid, add, new, button, header, inline, template, command, clientheadertemplate
ticketid: 1413640
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Grid</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>2019.2.514</td>
 </tr>
</table>

## Description

What is the best approach for adding a button in the Grid's command column header? The function of the button will be to add a new record.

## Solution

1. Utilize the `ClientHeaderTemplate` property of the command column.

    ```javascript
          .Columns(columns =>
          {
              columns.Command(command => { command.Edit(); command.Destroy(); }).Width(250).ClientHeaderTemplate("<button id='addNew'>Add New</button>");
          })
    ```

1. Initialize the Kendo UI Button and configure its [`click` event](https://docs.telerik.com/kendo-ui/api/javascript/ui/button/events/click). To add a new record to the Grid, use the [`addRow()` method](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/addrow).

    ```javascript
          $(document).ready(function () {
              $("#addNew").kendoButton({
                  icon: "plus",
                  click: function (e) {
                    e.preventDefault();
                    var grid = $("#grid").data("kendoGrid");
                    grid.addRow();
                  }
              });

          });
    ```

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})

* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid/index)

{% if site.core %}
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-core-ui/grid)

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
