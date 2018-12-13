---
title: Show Popup next to a Custom Cell Editor in Spreadsheet
description: An example on how to display a popup next to a custom cell editor in a Kendo UI Spreadsheet.
type: how-to
page_title: Show Custom Cell Editor with a Kendo UI Popup | Kendo UI Spreadsheet
slug: spreadsheet-custom-cell-editor-popup
tags: spreadsheet, custom, editor, cell, popup
ticketid: 1115323
res_type: kb
component: spreadsheet
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Spreadsheet</td>
 </tr>
</table>

## Description

I want to show the editor to the side of the selected Spreadsheet cell and make it disappear when the user clicks outside the popup. Can I use the Spreadsheet custom editor with a Kendo UI Popup?

## Solution

The following example demonstrates how to implement this scenario.

```dojo
    <!DOCTYPE html>
    <html>
        <head>
            <base href="https://demos.telerik.com/kendo-ui/spreadsheet/custom-editors">
            <style>html { font-size: 14px; font-family: Arial, Helvetica, sans-serif; }</style>
            <title></title>
            <link rel="stylesheet" href="https://kendo.cdn.telerik.com/2017.2.621/styles/kendo.default-v2.min.css" />

            <script src="https://kendo.cdn.telerik.com/2017.2.621/js/jquery.min.js"></script>
            <script src="https://kendo.cdn.telerik.com/2017.2.621/js/jszip.min.js"></script>
            <script src="https://kendo.cdn.telerik.com/2017.2.621/js/kendo.all.min.js"></script>
        </head>
        <body>
            <div id="example">
                <div id="spreadsheet" style="width: 100%;"></div>
            </div>

            <script>
                kendo.spreadsheet.registerEditor("popup", function(){
                    var context, dlg, model;

                    // Further delay the initialization of the UI until the `edit` method is
                    // actually called, so here just return the object with the required API.

                    return {
                        edit: function(options) {
                            context = options;
                            open();
                        },
                        icon: "k-font-icon k-i-background"
                    };

                    // This function actually creates the UI if not already there, and
                    // caches the dialog and the model.
                    function create() {
                        if (!dlg) {
                            model = kendo.observable({
                                value: "#000000",
                                ok: function() {
                                    // This is the result when OK is clicked. Invoke the
                                    // callback with the value.

                                    context.callback(model.value);
                                    dlg.close();
                                },
                                cancel: function() {
                                    dlg.close();
                                }
                            });
                            var el = $("<div data-visible='true' data-role='popup' data-origin='top right' data-position='top left' data-collision='fit' data-width='200'>" +
                                    "  <div data-role='flatcolorpicker' data-bind='value: value'></div>" +
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
                                    { value: "Select color:", bold: true },
                                    { background: "#fef0cd",
                                        editor: "popup" }
                                ]
                            }]
                        }]
                    });
                });
            </script>
        </body>
    </html>
```
