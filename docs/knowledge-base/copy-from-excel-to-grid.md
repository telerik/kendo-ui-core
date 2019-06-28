---
title: Copy Data from Excel
page_title: Copy Data from Excel | Kendo UI Grid for jQuery
description: "An example on how to copy data from Excel in the Kendo UI Grid for jQuery."
previous_url: /controls/data-management/grid/how-to/copy-from-excel-to-grid.html, /controls/data-management/grid/how-to/copy-from-excel-to-grid, /web/grid/how-to/copy-from-excel-to-grid, /controls/data-management/grid/how-to/excel/copy-from-excel-to-grid
slug: howto_copy_datafrom_excel_grid
tags: grid, copy, excel, data
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

How can I copy data from Excel in the Kendo UI Grid for jQuery?

## Solution

The following example demonstrates how to create a Grid that supports pasting from Excel.

```dojo
     <div id="grid" tabindex="0"></div>
    <script>
      $("#grid").kendoGrid({
        // the column fields should match the excel columns
        columns: [
          { field: "Name" },
          { field: "Age" }
        ],
        dataSource: [
          { Name: "John Doe", Age: 33 }
        ]
      }).on('focusin', function(e) {
        // Get the position of the Grid.
        var offset = $(this).offset();
        // Create a textarea element which will act as a clipboard.
        var textarea = $("<textarea>");
        // Position the textarea on top of the Grid and make it transparent.
        textarea.css({
          position: 'absolute',
          opacity: 0,
          top: offset.top,
          left: offset.left,
          border: 'none',
          width: $(this).width(),
          height: $(this).height()
        })
        .appendTo('body')
        .on('paste', function() {
          // Handle the paste event.
          setTimeout(function() {
            // The pasted content.
            var value = $.trim(textarea.val());
            // Get instance to the Grid.
            var grid = $("#grid").data("kendoGrid");
            // Get the pasted rows - split the text by new line.
            var rows = value.split('\n');

            var data = [];

            for (var i = 0; i < rows.length; i++) {
              var cells = rows[i].split('\t');
              data.push({
                Name: cells[0],
                Age: cells[1]
              });
            };
            grid.dataSource.data(data);
          });
        }).on('focusout', function() {
          // Remove the textarea when it loses focus.
          $(this).remove();
        });
        // Focus the textarea.
        setTimeout(function() {
          textarea.focus();
        });
      });
    </script>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
