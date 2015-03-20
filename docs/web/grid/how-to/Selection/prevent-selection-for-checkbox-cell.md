---
title: Prevent selection for checkbox cell
page_title: Prevent selection for checkbox cell
description: Prevent selection for checkbox cell
---

# Prevent selection for checkbox cell

The following runnable sample demonstrates how to prevent the cell selection for checkbox cell or any cell.

#### Example

```html
    <div id="grid"></div>
    <script>
      $(function() {

        var grid = $("#grid").kendoGrid({
          dataSource: {
            data: [{foo:1}, {foo:2}]
          },
          columns: [ 
            {
              template: '<input type="checkbox" />'
            },
            "foo"
          ],
          selectable: "multiple cell"  
        }).on("mouseup", ".k-grid-content tr > td:first-child", function () {

          grid.selectable.one("select", function(e) {
            e.preventDefault();
          });    

        }).data("kendoGrid");  
      });
    </script>
```