---
title: Reorderable Grid with Row Template ColumnMenu issue
description: An example on how to implement a column menu in a reorderable grid with row template.
type: how-to
page_title: Implement Column Menu with Row Template | Kendo UI Grid for jQuery
slug: grid-reorderable-with-column-menu-and-row-template
tags: grid, rowTemplate, columnMenu, issue, does not work, row, template, column, menu, reorderable, reorder
ticketid: 1160575
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
  <td>Progress Kendo UI version</td>
  <td>Created with 2018.1.221 version</td>
 </tr>
</table>

## Description

The column reordering does not work well with column menu when using custom row template. Can you please advise needs to be done to make column reordering work when using custom row template and column menu?

## Solution

1. To continue using a row template, you could bind a style within the template to make it show and hide as well as the columns' visibility changes

```
    <script id="template" type="text/x-kendo-template">
        # var columns = $("\\#grid").data("kendoGrid").columns #    
        <tr data-uid="#= uid #">
            <td style="display:#= columns[0].hidden ? 'none': '' #"> #= data[columns[0].field] #</td>
            <td style="display:#= columns[1].hidden ? 'none': '' #"> #= data[columns[1].field] # </td>
            <td style="display:#= columns[2].hidden ? 'none': '' #"> #= data[columns[2].field] # </td>
        </tr>
    </script>
```

```dojo
    <div id="grid" style="width: 70%; margin: 0 auto;"></div>
    <script src="https://demos.telerik.com/kendo-ui/content/shared/js/people.js"></script>
    <script id="template" type="text/x-kendo-template">
    # var columns = $("\\#grid").data("kendoGrid").columns #     
    <tr data-uid="#= uid #">
        <td style="display:#= columns[0].hidden ? 'none': '' #"> #= data[columns[0].field] #</td>
        <td style="display:#= columns[1].hidden ? 'none': '' #"> #= data[columns[1].field] # </td>
        <td style="display:#= columns[2].hidden ? 'none': '' #"> #= data[columns[2].field] # </td>
      </tr>
    </script>
    <script>
      var ds = new kendo.data.DataSource({
        data: createRandomData(50),
        schema: {
          model: {
            fields: {
              FirstName: { type: "string" },
              LastName: { type: "string" },
              City: { type: "string" },
              Title: { type: "string" },
              Age: { type: "number" }
            }
          }
        },
        pageSize: 10
      });

      $(document).ready(function() {
        $("#grid").kendoGrid({
          dataSource: ds,
          columnMenu:true,
          height: 450,
          sortable: true,
          reorderable: true,
          resizable: true,
          pageable: true,
          rowTemplate: kendo.template($("#template").html()),
          columns: ["FirstName", "Title", "Age"]
        });
      });
    </script>
```
