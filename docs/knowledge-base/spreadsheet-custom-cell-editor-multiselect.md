---
title: Use MultiSelect as a Custom Cell Editor in Spreadsheet
description: Learn how to display a popup containing a MultiSelect as a custom cell editor in a Kendo UI Spreadsheet.
type: how-to
page_title: Show Multiselect as Custom Cell Editor - Kendo UI Spreadsheet for jQuery
slug: spreadsheet-custom-cell-editor-multiselect
tags: spreadsheet, custom, editor, cell, popup, multiselect
ticketid: 1626834
res_type: kb
component: spreadsheet
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Spreadsheet for jQuery</td>
 </tr>
</table>

## Description

I want to show a popup that contains a MultiSelect so that I can select multiple values for a cell in the Kendo UI for jQuery Spreadsheet. 

## Solution

The following example demonstrates how to implement this scenario.

```dojo
    <div id="spreadsheet" style="width: 100%;"></div> 

    <script>
      kendo.spreadsheet.registerEditor("multiSelect", function(){
        var context, dlg, model;

        // Further delay the initialization of the UI until the `edit` method is
        // actually called, so here just return the object with the required API.

        return {
          edit: function(options) {
            context = options;
            open();
          },
          icon: "k-font-icon k-i-text"
        };

        // This function actually creates the UI if not already there, and
        // caches the dialog and the model.
        function create() {
          if (!dlg) {
            model = kendo.observable({
              value: "",
              data: [
                { ProductName: "Product 1", ProductID: 1 },
                { ProductName: "Product 2", ProductID: 2 },
              ],
              ok: function() {
                var values = [];
                // This is the result when OK is clicked.
                // Invoke the callback with the value.
                if(model.value.length !== 0){

                  values = model.value.map((item) => item.ProductName);
                  context.callback(values);               
                }

                dlg.close();
              },
              cancel: function() {
                dlg.close();
              }
            });
            var el = $("<div data-visible='true' data-role='popup' data-origin='top right' data-position='top left' data-collision='fit' data-width='200'>" +
                       "  <select data-role='multiselect' data-text-field='ProductName' data-value-field='ProductID' data-no-data-template='false' data-bind='value: value, source: data'></select>" +
                       "  <div style='margin-top: 1em; text-align: right'>" +
                       "    <button style='width: 5em' class='k-button' data-bind='click: ok'>OK</button>" +
                       "    <button style='width: 5em' class='k-button' data-bind='click: cancel'>Cancel</button>" +
                       "  </div>" +
                       "</div>");
            kendo.bind(el, model);

            // Cache the dialog.
            dlg = el.getKendoPopup();
          }
        }

        function open() {
          create();
          dlg.setOptions({
            anchor: $(".k-spreadsheet-editor-button")
          })
          dlg.open();

          var value = context.range.value();
          if (value != null) {
            model.set("value", value);
          }
        }
      });

      $(function() {
        $("#spreadsheet").kendoSpreadsheet({
          sheetsbar: false,
          excel: {
            // Required to enable Excel Export in some browsers
            proxyURL: "//demos.telerik.com/kendo-ui/service/export"
          },
          sheets: [{
            rows: [{
              cells: [
                { value: "Select Items:", bold: true },
                { background: "#fef0cd",
                 editor: "multiSelect" }
              ]
            }]
          }]
        });
      });
    </script>
```
