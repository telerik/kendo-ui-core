---
title: Delete Rows Selected with Checkboxes
page_title: Delete Rows with Checkboxes | Kendo UI Grid for jQuery
description: "An example on how to delete multiple rows selected with checkboxes in the Kendo UI Grid for jQuery."
previous_url: /web/grid/how-to/Editing/delete-multiple-columns-with-checkboxes, /controls/data-management/grid/how-to/Editing/delete-multiple-rows-with-checkboxes
slug: howto_delete_rows_selectedwith_checkboxes_grid
tags: grid, delete, rows, selected, checkboxes
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I delete multiple rows selected with checkboxes in the Kendo UI Grid for jQuery?

## Solution

The following example demonstrates how to delete multiple rows selected with checkboxes in a Grid.

```dojo
    <script src="https://demos.telerik.com/kendo-ui/content/shared/js/people.js"></script>
    <div id="example" class="k-content">
      <div id="grid"></div>

      <div id="details"></div>

      <script>

        $(document).ready(function () {
          var grid = $("#grid").kendoGrid({
            dataSource: {
              pageSize: 20,
              data: createRandomData(50)
            },
            pageable: true,
            height: 430,
            columns: [
              { field: "FirstName", title: "First Name", width: "140px" },
              { field: "LastName", title: "Last Name", width: "140px" },
              { field: "Title" },
              {
                field : "Select",
                title : "Select",
                width : "16%",
                template: "<input type='checkbox' class='sel' />"},
              { command: { text: "Delete", click: whenYourDeleteButtonIsClicked }, title: " ", width: "140px" }]
          }).data("kendoGrid");

        });

        function whenYourDeleteButtonIsClicked(){
          var grid = $("#grid").data("kendoGrid");
          $("#grid").find("input:checked").each(function(){
            grid.removeRow($(this).closest('tr'));
          })
        }
      </script>


    </div>

    <script>

    </script>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
