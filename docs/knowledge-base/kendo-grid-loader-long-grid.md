---
title: Ensuring Kendo UI for jQuery Grid Loader Appears Above the Fold on Long Grids
description: Learn how to ensure the Kendo UI for jQuery Grid's loader appears above the fold of the page, even with large grids.
type: how-to
page_title: Positioning Kendo UI for jQuery Grid Loader for Long Grids
meta_title: Positioning Kendo UI for jQuery Grid Loader for Long Grids
slug: kendo-grid-loader-long-grid
tags: kendo-ui-for-jquery, grid, excel-export, loader
res_type: kb
ticketid: 1682050
---

## Environment

<table>
<tbody>
<tr>
<td> Product </td>
<td>
Kendo UI for jQuery Grid
</td>
</tr>
<tr>
<td> Version </td>
<td> 2026.2.520 </td>
</tr>
</tbody>
</table>

## Description

The "Exporting..." loader in the [Kendo UI for jQuery Grid](https://www.telerik.com/kendo-jquery-ui/documentation/controls/grid/overview) may not be visible if the grid has a large number of rows and exceeds the browser's viewport. This occurs because the loader is positioned relative to the Grid element, causing it to get hidden in the scrollable content when the grid height is larger than the viewport.

This knowledge base article also answers the following questions:

- How can I reposition the Grid loader to stay visible for long grids?
- Why does the "Exporting..." loader in Kendo Grid not appear on large grids?
- How to ensure the Kendo Grid loader is always centered on the page?

## Solution

To ensure the loader appears above the fold, you can modify its position by appending a CSS class dynamically in the `excelExport` event handler of the Grid. The CSS class will adjust the loader's position based on the grid's height.

1. Attach an [`excelExport`](/api/javascript/ui/grid/events/excelexport) event handler to the Grid.
2. Check the Grid's height in the event handler.
3. Conditionally add a CSS class to the loader for proper positioning.
4. Define the new styles in your CSS.

Here is an example implementation:

### JavaScript

```javascript
$("#grid").kendoGrid({
  excelExport: function (e) {
    let gridHeight = $("#grid").height();
    if (gridHeight < 700) {
      $("div.k-loader-container-inner").addClass("smallHeight");
    } else {
      $("div.k-loader-container-inner").addClass("biggerHeight");
    }
  },
  // Other grid configurations...
});
```

### CSS

```css
div.loaderPosition {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

div.biggerHeight {
  position: absolute;
  top: 50vh;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

### Demo

You can view the implementation the example below:

```dojo
 <div id="tabstrip">
      <ul>
        <li class="k-active">Tab 1</li>
        <li>Tab 2</li>
      </ul>
      <div>
        <div id="grid"></div>
      </div>
      <div>Content 2</div>
    </div>

    <script>
      $("#tabstrip").kendoTabStrip({
        tabPosition: "left",
        animation: {
          open: {
            effects: "fadeIn",
          },
        },
      });
      $("#grid").kendoGrid({
        toolbar: ["excel"],
        columns: [{ field: "name" }],
        dataSource: [
          { name: "Jane Doe" },
          { name: "Jane Doe" },
          { name: "Jane Doe" },
          { name: "Jane Doe" },
          { name: "Jane Doe" },
          { name: "Jane Doe" },
          { name: "Jane Doe" },
          { name: "Jane Doe" },
          { name: "Jane Doe" },
          { name: "Jane Doe" },
          { name: "Jane Doe" },
          { name: "Jane Doe" },
          { name: "Jane Doe" },
          { name: "Jane Doe" },
          { name: "Jane Doe" },
          { name: "Jane Doe" },
          { name: "Jane Doe" },
          { name: "Jane Doe" },
          { name: "Jane Doe" },
          { name: "Jane Doe" },
          { name: "Jane Doe" },
          { name: "Jane Doe" },
          { name: "Jane Doe" },
          { name: "Jane Doe" },
          { name: "Jane Doe" },
          { name: "Jane Doe" },
          { name: "Jane Doe" },
          { name: "Jane Doe" },
          { name: "Jane Doe" },
          { name: "Jane Doe" },
          { name: "Jane Doe" },
          { name: "Jane Doe" },
          { name: "Jane Doe" },
          { name: "Jane Doe" },
          { name: "Jane Doe" },
          { name: "Jane Doe" },
          { name: "Jane Doe" },
          { name: "Jane Doe" },
          { name: "Jane Doe" },
          { name: "Jane Doe" },
          { name: "Jane Doe" },
          { name: "Jane Doe" },
          { name: "Jane Doe" },
          { name: "Jane Doe" },
          { name: "Jane Doe" },
        ],
        excelExport: function (e) {
          let gridHeight = $("#grid").height();
          if (gridHeight < 700) {
            $("div.k-loader-container-inner").addClass("smallHeight");
          } else {
            $("div.k-loader-container-inner").addClass("biggerHeight");
          }
        },
      });
    </script>
    <style>
      div.loaderPosition {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      div.biggerHeight {
        position: absolute;
        top: 50vh;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    </style>
```

## See Also

- [Kendo UI for jQuery Grid Overview](https://www.telerik.com/kendo-jquery-ui/documentation/controls/grid/overview)
- [Kendo UI Loader Documentation](https://docs.telerik.com/kendo-ui/controls/interactivity/loader/overview)
