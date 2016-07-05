---
title: Custom Cell Editors
page_title: Custom Cell Editors | Kendo UI Spreadsheet
description: "Define custom cell editors in a Kendo UI Spreadsheet widget."
slug: custom_editors_spreadsheet_widget
position: 3
---

# Custom Cell Editors

Custom editors are helpers that make it easier for the user to enter a correct value. For example, a custom editor allows the user to enter a date in a cell by picking it from a calendar, rather than typing it. This functionality is achieved by applying data validation with the `Date` criteria, and selecting the **Display button to show calendar** checkbox. Another built-in editor is for the `List` validation criterion&mdash;it displays a popup displaying the allowed values.

To define custom editors, use `kendo.spreadsheet.registerEditor(name, editor)`. The `name` is an ID of your choice, which you will later use to select this particular editor on a `Range`. The `editor` can be an object or a function. As an object, it should currently have an `edit` method, and an `icon` property, as explained below.

The `edit(options)` method is invoked with the following options:

* `range`&mdash;The cell that is currently selected as a `Range` object.
* `rect`&mdash;The rectangle with the position of the selected cell on the screen. It has `top`, `left`, `width`, `height`, `right`, and `bottom` properties. Use this option to position the editor near the cell, for example.
* `callback`&mdash;A function which your editor calls when a value is selected. It receives the `value` and an optional second argument `parse`. When `parse` is `true`, the `value` should be a string and it is then parsed as if inputted by the end user through the inline editor. Use this option to return a formula, for example&mdash;`callback("=sum(a1:a5)", true)`.

The `icon` property is a string which contains a CSS class name that is to be applied to the drop-down button.

When the `editor` is a function, it is called the first time a cell, having this editor, is displayed. It returns an object as in the case above&mdash;having the `edit` method and the `icon` property, and the result is cached. Use this trick to delay the initialization of the editor until it is first needed.

The example below demonstrates how to set up a color-picking custom editor.

###### Example

    kendo.spreadsheet.registerEditor("color", function(){
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
                var el = $("<div data-visible='true' data-role='window' data-modal='true' data-resizable='false' data-title='Select color'>" +
                           "  <div data-role='flatcolorpicker' data-bind='value: value'></div>" +
                           "  <div style='margin-top: 1em; text-align: right'>" +
                           "    <button style='width: 5em' class='k-button' data-bind='click: ok'>OK</button>" +
                           "    <button style='width: 5em' class='k-button' data-bind='click: cancel'>Cancel</button>" +
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

Once the editor is defined, apply it through the API to any cell.

###### Example

    var sheet = spreadsheet.activeSheet();
    sheet.range("A5").editor("color");

Now, when the user selects `A5`, a button that shows the icon is displayed next to the cell. When clicked, the custom color picker pops up and allows the user to
select a color.

The `edit` method provides a complete flexibility. Use a Popup widget as an example&mdash;you are not obliged, nor required to use a Window. Cache the UI if you know that no two instances will be displayed simultaneously, or create a fresh instance each time the `edit` is invoked. Note that the example above refers to a modal dialog.

## See Also

Other articles on the Kendo UI Spreadsheet:

* [Overview]({% slug overview_spreadsheet_widget %})
* [Custom Functions]({% slug custom_functions_spreadsheet_widget %})
* [Cell Formatting]({% slug cell_formatting_spreadsheet_widget %})
* [Data Source Binding]({% slug bind_todata_source_spreadsheet_widget %})
* [Export to Excel]({% slug export_toexcel_spreadsheet_widget %})
* [Server-Side Processing]({% slug serverside_processing_spreadsheet_widget %})
* [User Guide]({% slug user_guide_spreadsheet_widget %})
* [Spreadsheet JavaScript API Reference](/api/javascript/ui/spreadsheet)
