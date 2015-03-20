---
title: Search for dropped with the mouse text 
page_title: Search for dropped with the mouse text
description: Example that shows how to search for dropped with the mouse text
---

# How to make search for dropped with the mouse text

The example below demonstrates how to make readonly visible input of Kendo UI ComboBox.
To test the example select the text 'Chai' with the mouse, drag it to the ComboBox and drop it over the input.

#### Example:

```html
  <div id="example">
    <div class="demo-section k-header">
      <h4>Products</h4>
      <div> Drag: Chai </div>
      <input id="products" style="width: 400px" />
    </div>
    <script>
      $(document).ready(function() {
        $("#products").kendoComboBox({
          placeholder: "Select product",
          dataTextField: "ProductName",
          dataValueField: "ProductID",
          filter: "contains",
          autoBind: false,
          minLength: 3,
          dataSource: {
            type: "odata",
            serverFiltering: true,
            transport: {
              read: {
                url: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Products",
              }
            }
          }
        });

        //Wire the drop event
        var combobox = $("#products").data("kendoComboBox");

        combobox.input.on("drop", function(e) { 
          var input = e.currentTarget;
          var droppedText = e.originalEvent.dataTransfer.getData("text");

          setTimeout(function() {
            input.value = droppedText;
            combobox.search(droppedText);
          });
        });
      });
    </script>

    <style scoped>
      .demo-section {
        width: 400px;
      }
    </style>
  </div>
```
