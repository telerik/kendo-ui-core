---
title: Custom Cell Editors
page_title: Spreadsheet Custom Cell Editors
description: "Learn how to implement custom cell editors for the Telerik UI Spreadsheet component for {{ site.framework }}."
slug: htmlhelpers_spreadsheet_custom_cell_editors_aspnetcore
position: 8
---

# Custom Cell Editors

The Telerik UI Spreadsheet for {{ site.framework }} allows you to use custom cell editors that help users enter correct values.

A cell editor allows the user to enter the data in the correct format. For example, the user can enter a date in a cell by clicking a calendar icon and selecting the date from a calendar rather than typing it. This functionality is achieved by applying data validation. For more details on the configuration of the built-in data-validation editors, see the [Spreadsheet for {{ site.framework }} Validation]({% slug htmlhelpers_spreadsheet_validation_aspnetcore %}) section.

## Configuring
To define a custom editor, use `kendo.spreadsheet.registerEditor(name, editor)`:
 *  `name` is an ID of your choice. You will use it to select the particular editor on a `Range`. 
 
 *  `editor` can be an [object](#configuring-editor-as-object) or a [function](#configuring-editor-as-function). 
 
 ### Configuring `editor` as Object
 
 When `editor` is an Object, it must have an `edit` method, and an `icon` property. 
 
 An `Editor()` method is not available in the SpreadsheetSheetRowCellBuilder for the Teelrik UI Spreadsheet for {{ site.framework }}. That is why you must configure the custom cell editor by using the [`Range.editor()`](https://docs.telerik.com/kendo-ui/api/javascript/spreadsheet/range/methods/editor) method.

You can invoke the `edit(options)` method with the following options:
* `range` - The cell that is currently selected as a `Range` object.
* `rect` - The position of the rectangle with the editor. The possible properties are `top`, `left`, `width`, `height`, `right`, and `bottom`. Use this option to position the editor near the cell, for example.
* `callback` - A function that your editor calls when a value is selected. It receives the `value` and an optional `parse` argument . When `parse` is `true`, the `value` must be a string and it is then parsed as if input by the end user through the inline editor. Use this option to return a formula, for example&mdash;`callback("=sum(a1:a5)", true)`.

The `icon` property is a string with the name of a CSS class that will be applied to the drop-down button.

When the `editor` is a function, it is called the first time when a cell with this editor is displayed. It returns an object as in the previous case - having the `edit` method and the `icon` property, and the result is cached. You can use this approach to delay the initialization of the editor until the first time it is needed.

The following example demonstrates how to set up a color-picking custom editor.

```HtmlHelper
    @(Html.Kendo().Spreadsheet()
            .Name("spreadsheet")
            .Sheets(sheets =>
            {
                sheets.Add()
                    .Rows(rows =>
                    {
                        rows.Add().Cells(cells =>
                        {
                            cells.Add()
                                    .Value("Select color:")
                                    .Bold(true);
                        });
                    });
            })
    )
```
```JavaScript
    <script>
        $(document).ready(function () {
            kendo.spreadsheet.registerEditor("color", function () {
                var context, dlg, model;
                // Further delay the initialization of the UI until the `edit` method is
                // actually called, so here just return the object with the required API.
                return {
                    edit: function (options) {
                        context = options;
                        open();
                    },
                    icon: "k-icon k-i-background"
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
                            }
                        });
                        var el = $("<div data-visible='true' data-role='window' data-modal='true' data-resizable='false' data-title='Select color'>" +
                            "  <div data-role='flatcolorpicker' data-bind='value: value'></div>" +
                            "  <div style='margin-top: 1em; text-align: right'>" +
                            "    <button style='width: 6em' class='k-button' data-bind='click: ok'>OK</button>" +
                            "    <button style='width: 6em' class='k-button' data-bind='click: cancel'>Cancel</button>" +
                            "  </div>" +
                            "</div>");
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

            //After the editor is defined, you can apply it to any cell through the API.
            var spreadsheet = $('#spreadsheet').getKendoSpreadsheet();
            var activeSheet = spreadsheet.activeSheet();
            var cell = activeSheet.range("B1");

            cell.editor('color');
        });
    </script>
```
{% if site.core %}
```TagHelper
	<kendo-spreadsheet name="spreadsheet" >
		<sheets>
	 		<sheet>
	 	 		<rows>
	 	 	 		<sheet-row>
	 	 	 	 		<cells>
	 	 	 	 	 		<cell value="Select color:" bold="true">
	 	 	 	 	 		</cell>
	 	 	 	 		</cells>
	 	 	 		</sheet-row>
	 	 		</rows>
	 		</sheet>
		</sheets>
	</kendo-spreadsheet>
```
{% endif %}

As a result, when the user selects cell `B2`, a button that shows the icon is displayed next to the cell. When clicked, the custom color picker pops up and allows the user to
select a color.

## See Also

* [Implementing Custom Cell Editors in the Spreadsheet (Demo)](https://demos.telerik.com/kendo-ui/spreadsheet/custom-editors)
* [Spreadsheet JavaScript API Reference](/api/javascript/ui/spreadsheet)
