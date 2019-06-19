---
title: Insert Button Inside a Column Header Template
description: An example demonstrating how to place an Add New Record button in a column header
type: how-to
page_title: Add New Record Button in Column Header | Kendo UI Grid
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

  <td>Product Version</td>
  <td>2019.2.514</td>
 </tr>
</table>

## Description

What is the best approach to adding a button into a Kendo UI Grid's command column header which will add a new record?

## Solution

Utilizing the command column's ClientHeaderTemplate property, a new button can be added into the header.

```javascript
      .Columns(columns =>
      {
          columns.Command(command => { command.Edit(); command.Destroy(); }).Width(250).ClientHeaderTemplate("<button id='addNew'>Add New</button>");
      })
```

Then, taking advantage of Kendo UI for jQuery, initialize the Kendo UI Button and configure its [click event](https://docs.telerik.com/kendo-ui/api/javascript/ui/button/events/click).  To add a new record to the Kendo UI Grid, use the [addRow() method](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/addrow):
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

* [click - Documentation and API Reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/button/events/click)
* [addRow - Documentation and API Reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/addrow)
