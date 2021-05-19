---
title: Persist Focused Grid Cells after Rebind
page_title: Persist Focused Cells after Rebind | Kendo UI Grid for jQuery
description: "An example on how to persist a focused cell in the Kendo UI Grid for jQuery after rebind."
previous_url: /controls/data-management/grid/how-to/Editing/persist-focused-cell
slug: howto_persist_focused_grid_cell_grid
tags: persist, focused, grid, cells, after, rebind
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>All</td>
 </tr>
</table>

## Description

How can I persist a focused cell in the Kendo UI Grid for jQuery after rebind?

## Solution

The following example demonstrates how to persist a focused Grid cell after rebinding.

The demo implies the usage of incell editing, built-in keyboard navigation, and the [`autoSync:true`](/api/javascript/data/datasource/configuration/autosync) configuration for the Grid [DataSource instance](/api/javascript/data/datasource).

The functionality relies on the following milestones:

* The [`navigatable`](/api/javascript/ui/grid/configuration/navigatable) option is set to `true`.
* The [`editable`](/api/javascript/ui/grid/configuration/editable) option is set to `true` or the [`editable.mode`](/api/javascript/ui/grid/configuration/editable.mode) option is set to `"incell"`.
* The [`dataBinding`](/api/javascript/ui/grid/events/databinding) event handler of the Grid is used to obtain the [`current`](/api/javascript/ui/grid/methods/current) Grid cell and its corresponding row and cell indexes.
* The saved row and cell indexes are applied through the [`current()`](/api/javascript/ui/grid/methods/current) method in the [`dataBound`](/api/javascript/ui/grid/events/databound) event handler.
* The [`table`](/api/javascript/ui/grid#fields-table) option of the Grid can be focused explicitly if the user has clicked on the **Save Changes** button&mdash;this requires you to set a flag in the [`saveChanges`](/api/javascript/ui/grid/events/savechanges) event handler.

Generally, it is uncommon to enable the [`autoSync`](/api/javascript/data/datasource/configuration/autosync) option for the incell editing because it greatly increases the amount of update-related remote requests. Nevertheless, it is possible for you to use such an approach if required.

```dojo
<div id="grid"></div>

<script>
  $(function () {
    var crudServiceBaseUrl = "//demos.telerik.com/kendo-ui/service",
        dataSource = new kendo.data.DataSource({
          transport: {
            read:  {
              url: crudServiceBaseUrl + "/Products",
              dataType: "jsonp"
            },
            update: {
              url: crudServiceBaseUrl + "/Products/Update",
              dataType: "jsonp"
            },
            destroy: {
              url: crudServiceBaseUrl + "/Products/Destroy",
              dataType: "jsonp"
            },
            create: {
              url: crudServiceBaseUrl + "/Products/Create",
              dataType: "jsonp"
            },
            parameterMap: function(options, operation) {
              if (operation !== "read" && options.models) {
                return {models: kendo.stringify(options.models)};
              }
            }
          },
          batch: true,
          autoSync: true,
          pageSize: 5,
          schema: {
            model: {
              id: "ProductID",
              fields: {
                ProductID: { editable: false, nullable: true },
                ProductName: { validation: { required: true } },
                UnitPrice: { type: "number", validation: { required: true, min: 1} },
                Discontinued: { type: "boolean" },
                UnitsInStock: { type: "number", validation: { min: 0, required: true } }
              }
            }
          }
        });

    var rowIndex = null;
    var cellIndex = null;
    var saveButtonClicked = false;

    $("#grid").kendoGrid({
      dataSource: dataSource,
      navigatable: true,
      pageable: true,
      height: 300,
      toolbar: ["create", "save", "cancel"],
      columns: [
        "ProductName",
        { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: 120 },
        { field: "UnitsInStock", title: "Units In Stock", width: 120 },
        { field: "Discontinued", width: 120 },
        { command: "destroy", title: "&nbsp;", width: 150 }],
      editable: true,
      saveChanges: function(e) {
        saveButtonClicked = true;
      },
      dataBinding: function(e) {
        var current = e.sender.current() || [];
        if (current[0]) {
          cellIndex = current.index();
          rowIndex = current.parent().index();
        }
      },
      dataBound: function(e) {
        if (!isNaN(cellIndex)) {
          e.sender.current(e.sender.tbody.children().eq(rowIndex).children().eq(cellIndex));
          rowIndex = cellIndex = null;

          // The code below is needed only when the user clicks on the "Save Changes" button.
          // Otherwise, focusing the table explicitly and unconditionally can steal the page focus.
          if (saveButtonClicked) {
            e.sender.table.focus();
            saveButtonClicked = false;
          }
        }
      }
    });
  });
</script>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
