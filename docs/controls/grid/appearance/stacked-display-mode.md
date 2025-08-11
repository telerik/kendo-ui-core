---
title: Stacked Display Mode
page_title: jQuery Grid Documentation - Stacked Display Mode
description: "Learn how to configure and use the Stacked Display Mode in the jQuery Grid by Kendo UI."
slug: stacked_display_mode_kendoui_grid_widget
position: 6
---

# Stacked Display Mode

The Stacked Display Mode provides an alternative way to visualize Grid data in a card-like layout, where each row is displayed as a separate block with the fields arranged in a grid pattern.

This mode is particularly useful for responsive designs and when displaying data on mobile devices, as it provides a more compact and readable layout compared to the traditional column-based grid view.

## Getting Started

To enable the Stacked Display Mode, set the [`dataLayoutMode`](/api/javascript/ui/grid/configuration/datalayoutmode) property to `"stacked"`. Additionally, you can configure the layout using the [`stackedLayoutSettings`](/api/javascript/ui/grid/configuration/stackedlayoutsettings) property.

The following example demonstrates how to configure the Grid in Stacked Display Mode:

```dojo
    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataLayoutMode: "stacked",
        stackedLayoutSettings: {
          cols: 2
        },
        dataSource: {
          data: [
            { id: 1, name: "Jane Doe", age: 30 },
            { id: 2, name: "John Doe", age: 33 }
          ],
          schema: {
            model: {
              id: "id"
            }
          }
        },
        selectable: "row"
      });
    </script>
```

## Layout Settings

The stacked layout can be customized using the [`stackedLayoutSettings`](/api/javascript/ui/grid/configuration/stackedLayoutSettings) property, which accepts the following options:

### cols `Number|Array` *(default: 2)*

Defines the number of columns to display in each stacked row. The Grid will automatically arrange the fields into the specified number of columns.
If set as `array`, the size of the array represents the number of columns, and the values represent the column widths. Possible values are: `string`, `number`, and `object`.

```javascript
stackedLayoutSettings: {
  cols: 3 // Display fields in 3 columns
}
```

## Supported Functionalities

The Stacked Display Mode supports most of the standard Grid functionalities:

### Data Rendering

All data is rendered in a card-like format, with each record displayed as a separate block. Field names appear as labels next to their corresponding values.

### Editing

All types of editing are supported in Stacked Display Mode:

- **Inline editing** - Fields are edited directly within the stacked layout
- **Popup editing** - A popup window appears for editing the record
- **Batch editing** - Multiple records can be edited before saving changes
- **Incell editing** - Individual cells can be edited

### Filtering and Sorting

Filtering and sorting work seamlessly with the Stacked Display Mode. Users can access these features through the toolbar or column headers, just as they would in the standard column layout.

```javascript
$("#grid").kendoGrid({
  dataLayoutMode: "stacked",
  toolbar: ["search"],
  filterable: true,
  sortable: true,
  // Other configuration
});
```

### Grouping and Aggregates

Grouping and aggregates are fully supported in Stacked Display Mode. When grouping is enabled, the stacked cards are organized within their respective groups.

```javascript
$("#grid").kendoGrid({
  dataLayoutMode: "stacked",
  groupable: true,
  aggregate: [
    { field: "age", aggregate: "average" }
  ],
  // Other configuration
});
```

### Selection

Row selection is supported in Stacked Display Mode. Each stacked card represents a row and can be selected as a whole.

```javascript
$("#grid").kendoGrid({
  dataLayoutMode: "stacked",
  selectable: "row",
  // Other configuration
});
```

### Master/Detail

Master/Detail functionality works in Stacked Display Mode, allowing you to display hierarchical data.

```javascript
$("#grid").kendoGrid({
  dataLayoutMode: "stacked",
  detailTemplate: kendo.template($("#detail-template").html()),
  // Other configuration
});
```

### Keyboard Navigation and Accessibility

Keyboard navigation and accessibility features are preserved in Stacked Display Mode. Users can navigate between stacked rows using keyboard shortcuts, and all accessibility attributes are properly maintained.

### Exporting

Data can be exported from a Grid in Stacked Display Mode:

- **PDF Export** - Exports the data as visualized in the stacked layout
- **Excel Export** - Exports the data in a tabular format regardless of the display mode

```javascript
$("#grid").kendoGrid({
  dataLayoutMode: "stacked",
  toolbar: ["excel", "pdf"],
  excel: {
    fileName: "Exported-Data.xlsx"
  },
  pdf: {
    fileName: "Exported-Data.pdf"
  },
  // Other configuration
});
```

## Switching Between Display Modes

You can programmatically switch between stacked and column display modes:

```javascript
// Switch to stacked mode
grid.setOptions({ dataLayoutMode: "stacked" });

// Switch to columns mode
grid.setOptions({ dataLayoutMode: "columns" });
```

You can also provide a UI for users to toggle between modes:

```dojo
    <div class="k-d-flex k-flex-row">
      <div class="k-mr-4">
        <button id="columnsButton" class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base">Columns View</button>
        <button id="stackedButton" class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary">Stacked View</button>
      </div>
      <div id="grid" class="k-flex-grow"></div>
    </div>
    
    <script>
      $(document).ready(function() {
        var grid = $("#grid").kendoGrid({
          columns: [
            { field: "name", title: "Name" },
            { field: "age", title: "Age" },
            { field: "city", title: "City" }
          ],
          dataSource: {
            data: [
              { id: 1, name: "Jane Doe", age: 30, city: "New York" },
              { id: 2, name: "John Doe", age: 33, city: "Boston" },
              { id: 3, name: "Sam Smith", age: 27, city: "Chicago" }
            ]
          }
        }).data("kendoGrid");
        
        $("#columnsButton").click(function() {
          grid.setOptions({ dataLayoutMode: "columns" });
          $(this).addClass("k-button-solid-primary").removeClass("k-button-solid-base");
          $("#stackedButton").addClass("k-button-solid-base").removeClass("k-button-solid-primary");
        });
        
        $("#stackedButton").click(function() {
          grid.setOptions({ 
            dataLayoutMode: "stacked",
            stackedLayoutSettings: { cols: 2 }
          });
          $(this).addClass("k-button-solid-primary").removeClass("k-button-solid-base");
          $("#columnsButton").addClass("k-button-solid-base").removeClass("k-button-solid-primary");
        });
      });
    </script>
```

## Responsive Behavior

Stacked Display Mode is particularly useful for responsive designs. You can switch to stacked mode when the screen size decreases:

```javascript
$(window).resize(function() {
  var grid = $("#grid").data("kendoGrid");
  if (window.innerWidth < 768) {
    grid.setOptions({ 
      dataLayoutMode: "stacked",
      stackedLayoutSettings: { cols: 1 }
    });
  } else {
    grid.setOptions({ dataLayoutMode: "columns" });
  }
});
```

## See Also

* [API Reference of the Grid](/api/javascript/ui/grid)
* [Grid Adaptive Rendering]({% slug adaptive_rendering_kendoui_grid_widget %})
* [Grid Sizing]({% slug sizing_kendoui_grid %})