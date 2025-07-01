---
title: Adding Dropdown Validation for a Whole Column in Kendo UI Spreadsheet
description: Learn how to configure dropdown validation for a whole column in Kendo UI Spreadsheet and maintain it when adding new rows.
type: how-to
page_title: How to Set Dropdown Validation for Entire Columns in Kendo UI Spreadsheet
slug: dropdown-validation-column-kendo-ui-spreadsheet
tags: spreadsheet, kendo-ui, validation, column, dropdown
res_type: kb
ticketid: 1689145
---

## Environment
<table>
<tbody>
<tr>
<td>Product</td>
<td>Kendo UI Spreadsheet</td>
</tr>
<tr>
<td>Version</td>
<td>2025.2.520</td>
</tr>
</tbody>
</table>

## Description

I want to make an entire column in the [Kendo UI Spreadsheet](https://docs.telerik.com/kendo-ui/spreadsheet/overview) function as a dropdown menu, preserving dropdown validation for newly added rows. 

This knowledge base article also answers the following questions:
- How to set dropdown validation for a column in Kendo UI Spreadsheet?
- How to maintain dropdown validation when adding new rows in Kendo UI Spreadsheet?

## Solution

### Adding Dropdown Validation for a Whole Column

To add dropdown validation for an entire column, configure the validation for the column range using the [`sheets.rows.cells.validation.from`](/api/javascript/ui/spreadsheet/configuration/sheets.rows.cells.validation#sheetsrowscellsvalidationfrom) property. For newly added rows, ensure the same validation is applied to the respective cell in the column by using the [`insertRow`](/api/javascript/ui/spreadsheet/events/insertrow) event. Below is an example of how to configure a custom editor for a column upon adding a new row:

```javascript
insertRow: function (e) {   
    setTimeout(function(){
        e.sender.activeSheet().range(e.index, 1, 1, 1).background("#fef0cd"); // Example: Add custom background
        e.sender.activeSheet().range(e.index, 1, 1, 1).editor("color"); // Example: Set custom editor
    });            
}
```

Use the `Range.editor()` method for applying custom editors. For more details, refer to [Range.editor() documentation](https://docs.telerik.com/kendo-ui/api/javascript/spreadsheet/range/methods/editor).

### Example

```dojo
    <div id="spreadsheet" style="width: 100%"></div>
    <script>
      kendo.spreadsheet.registerEditor("color", function () {
        var context, dlg, model;
        // Further delay the initialization of the UI until the `edit` method is
        // actually called, so here just return the object with the required API.
        return {
          edit: function (options) {
            context = options;
            open();
          },
          icon: "droplet",
        };
        // This function actually creates the UI if not already there, and
        // caches the dialog and the model.
        function create() {
          if (!dlg) {
            model = kendo.observable({
              value: "#000000",
              ok: function () {
                // This is the result when OK is clicked.
                // Invoke the callback with the value.
                context.callback(model.value);
                dlg.close();
              },
              cancel: function () {
                dlg.close();
              },
            });
            var el = $(
              "<div data-visible='true' data-role='window' data-modal='true' data-resizable='false' data-title='Select color'>" +
                "  <div data-role='flatcolorpicker' data-bind='value: value'></div>" +
                "  <div style='margin-top: 1em; text-align: right'>" +
                "    <button style='width: 5em' class='k-button' data-bind='click: ok'>OK</button>" +
                "    <button style='width: 5em' class='k-button' data-bind='click: cancel'>Cancel</button>" +
                "  </div>" +
                "</div>",
            );
            kendo.bind(el, model);

            // Cache the dialog.
            dlg = el.getKendoWindow();
          }
        }
        function open() {
          create();
          dlg.open();
          dlg.center();
          // If the selected cell already contains some value, reflect
          // it in the custom editor.
          var value = context.range.value();
          if (value != null) {
            model.set("value", value);
          }
        }
      });

      $(function () {
        $("#spreadsheet").kendoSpreadsheet({
          sheetsbar: false,
          insertRow: function (e) {
            setTimeout(function () {
              e.sender
                .activeSheet()
                .range(e.index, 1, 1, 1)
                .background("#fef0cd");
              e.sender.activeSheet().range(e.index, 1, 1, 1).editor("color");
            });
          },
          excel: {
            // Required to enable Excel Export in some browsers.
            proxyURL: "//demos.telerik.com/kendo-ui/service/export",
          },
          sheets: [
            {
              rows: [
                {
                  cells: [
                    { value: "Select color:", bold: true },
                    { background: "#fef0cd", editor: "color" },
                  ],
                },
              ],
            },
          ],
        });
      });
    </script>
```



## See Also

- [Spreadsheet Overview](https://www.telerik.com/kendo-jquery-ui/documentation/controls/spreadsheet/overview)
- [Validation Configuration](https://docs.telerik.com/kendo-ui/api/javascript/ui/spreadsheet/configuration/sheets.rows.cells.validation)
- [Range Editor Method](https://docs.telerik.com/kendo-ui/api/javascript/spreadsheet/range/methods/editor)
- [Spreadsheet Custom Cell Editors (Demo)](https://demos.telerik.com/kendo-ui/spreadsheet/custom-editors)
