---
title: Insert Button inside a Column Header Template
description: An example on how to place an Add New Record button in the column header of Grid in Telerik UI for ASP.NET Core.
type: how-to
page_title: Add New Record Button in Column Header
slug: grid-add-new-button-header-inline
tags: grid, add, new, button, header, inline, template, command, clientheadertemplate
ticketid: 1413640
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Telerik® UI for ASP.NET Core</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>2019.2.514</td>
 </tr>
</table>

## Description

What is the best approach for adding a button in the Grid to the command column header which will add a new record?

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

## See Also

* [API Reference of the click Event](https://docs.telerik.com/kendo-ui/api/javascript/ui/button/events/click)
* [API Reference of the addRow Event](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/addrow)
