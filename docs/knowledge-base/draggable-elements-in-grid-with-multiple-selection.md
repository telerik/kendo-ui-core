---
title: Use Draggable Elements with Multiselection Enabled
page_title: Draggable Elements via Multi|Selection | Kendo UI Grid for jQuery
description: "An example on how to use draggable components with enabled multi-selection in the Kendo UI Grid for jQuery."
previous_url: /controls/data-management/grid/how-to/draggable-elements-in-grid-with-multiple-selection, /controls/data-management/grid/how-to/various/draggable-elements-in-grid-with-multiple-selection
slug: howto_use_draggable_elements_multiselection_enabled_grid
tags: grid, draggable, elements, multiple, selectin, drag
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

How can I use draggable components with enabled multi-selection in the Kendo UI Grid for jQuery?

## Solution

The following example demonstrates how to use draggable components in a Grid when the multi-selection is enabled.

```dojo
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

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
