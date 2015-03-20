---
title: Column menu using checkboxes
page_title: Column menu using checkboxes
description: Column menu using checkboxes
---

# Column menu using checkboxes

The following runnable sample demonstrates how to use checkboxes inside a Kendo UI Grid column menu.

#### Example:

```html
     <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [
          { field: "id", menu: false },
          { field: "name", menu: false },
          { field: "age" }
        ],
        columnMenu: true,
        dataSource: [
          { id: 1, name: "Jane Doe", age: 30 },
          { id: 2, name: "John Doe", age: 33 }
        ],
        columnMenuInit:function(e){    
          var menu = e.container.children().data("kendoMenu");
          var handler = $.proxy(enableCheckbox, menu);
          
          menu.bind("open", handler).bind("select", handler);    
        }
      });
      
      function enableCheckbox() {
        this.element.find(".k-columns-item :checkbox").prop("disabled", false);
      }
    </script>
```