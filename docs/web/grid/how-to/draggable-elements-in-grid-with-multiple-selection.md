---
title: Draggable elements in Kendo UI Grid with Multiple Selection
page_title: Draggable elements in Kendo UI Grid with Multiple Selection
description: Draggable elements in Kendo UI Grid with Multiple Selection
---

# Draggable elements in Kendo UI Grid with Multiple Selection

The following example demonstrates how to use draggable components in Kendo UI Grid with enabled multiselection.

#### Example:

```html
  <div id="example">

    <div class="demo-section k-content wide">
      <h4>Grid with multiple row selection enabled</h4>
      <div id="rowSelection"></div>
    </div>

    <script>
      kendo.UserEvents.defaultThreshold(0); //globally change the default defaultThreshold
      $(document).ready(function () {
        var boxes = [{
          ID : 1,
          Name : "Box 1",
          Color: "red"
        }, {
          ID : 2,
          Name : "Box 2",
          Color: "green"
        }, {
          ID : 3,
          Name : "Box 3",
          Color: "blue"
        }];

        $("#rowSelection").kendoGrid({
          dataSource: {
            data: boxes
          },
          selectable: "multiple",
          scrollable: false,
          navigatable: true,
          columns: [
            {
              field: "ID",
              width: 300
            },
            {
              field: "Name",
              width: 300
            },
            {
              title: "Box Draggable",
              template: '<div class="box" style="background-color: #= Color #; cursor: move; width: 20px; height: 20px; text-align: center; color: white;">#= ID #</div>'
            }
          ]
        });

        $(".box").kendoDraggable({
          hint: function(element) {
            return element.clone();
          }
        });
      });
    </script>
  </div>
```
