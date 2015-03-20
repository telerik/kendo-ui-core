---
title: Copy data from Excel
page_title: Copy data from Excel
description: Copy data from Excel
---

# Copy data from Excel

The following runnable sample demonstrates how to create a Kendo UI Grid that supports pasting from Excel

#### Example:

```html
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
        // get the grid position
        var offset = $(this).offset();
        // crete a textarea element which will act as a clipboard
        var textarea = $("<textarea>");
        // position the textarea on top of the grid and make it transparent
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
          // handle the paste event
          setTimeout(function() {
            // the the pasted content
            var value = $.trim(textarea.val());
            // get instance to the grid
            var grid = $("#grid").data("kendoGrid");
            // get the pasted rows - split the text by new line
            var rows = value.split('\n');

            var data = [];

            for (var i = 0; i < rows.length; i++) {
              // get the cells - split by tab
              var cells = rows[i].split('\t');
              // add a new item in the grid
              grid.dataSource.add({
                Name: cells[0],
                Age: cells[1]
              });
            }
          });
        }).on('focusout', function() {
          // remove the textarea when it loses focus
          $(this).remove();
        });
        // focus the textarea
        setTimeout(function() {
          textarea.focus();
        });
      });
    </script>
```