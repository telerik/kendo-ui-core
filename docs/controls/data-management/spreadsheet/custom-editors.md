---
title: Custom Cell Editors
page_title: Custom Cell Editors | Kendo UI Spreadsheet
description: "Learn how to define custom cell editors."
slug: custom_editors_spreadsheet_widget
position: 3
---

# Custom Cell Editors

Custom editors are helpers that make it easier for users to enter a correct
value.  For instance, if a cell should contain a date, then it's nice to have
some way to pick it from a calendar, rather than typing it.  This can be
achieved by applying data validation with the "Date" criteria, and selecting the
"Display button to show calendar" checkbox.  Another editor that is built-in is
for "List" validation criteria -- it will display a popup with the allowed
values.

To define custom editors, you can use `kendo.spreadsheet.registerEditor(name,
editor)`.  The `name` is an ID of your choice, that you will later use to select
this particular editor on a `Range`.  The `editor` can be an object or a
function.  As an object, it currently should have an `edit` method, and an
`icon` property:

- `edit(options)` -- will be invoked with the following options:

  - `range` -- the currently selected cell as a `Range` object

  - `rect` -- the rectangle with the position of the selected cell on screen.
    It has `top`, `left`, `width`, `height`, `right` and `bottom` properties.
    You can use this if you need to position the editor near the cell, for
    example.

  - `callback` -- a function which your editor should call when a value is
    selected.  It receives the `value` and an optional second argument
    `parse`: when `parse` is `true`, the `value` should be a string and it
    will be parsed as if inputted by the end user through the inline editor.
    You can use this to e.g. return a formula: `callback("=sum(a1:a5)", true)`.

- `icon` -- a string containing a CSS class name to be applied to the drop-down
  button.

When `editor` is a function, it will be called the first time a cell having this
editor is displayed.  It should return an object as above (having `edit` method
and `icon` property), and the result will be cached.  We can use this trick to
delay initialization of our editor until it's first needed.

## Example: color picker

Here is how we could write a color picker custom editor.

    kendo.spreadsheet.registerEditor("color", function(){
        var context, dlg, model;

        // We further delay initialization of our UI until the `edit` method is
        // actually called, so here just return the object with the required API

        return {
            edit: function(options) {
                context = options;
                open();
            },
            icon: "k-font-icon k-i-background"
        };

        // this function actually creates the UI if not already there, and
        // caches the dialog and model.
        function create() {
            if (!dlg) {
                model = kendo.observable({
                    value: "#000000",
                    ok: function() {
                        // when OK is clicked we get here.  Invoke the
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

                // cache the dialog
                dlg = el.getKendoWindow();
            }
        }

        function open() {
            create();
            dlg.open();
            dlg.center();

            // if the selected cell already contains some value, reflect
            // it in our custom editor.
            var value = context.range.value();
            if (value != null) {
                model.set("value", value);
            }
        }
    });

Once we have defined our editor, we can now apply it through the API to any
cell, for example:

    var sheet = spreadsheet.activeSheet();
    sheet.range("A5").editor("color");

Now when the user selects `A5`, a button showing our icon is displayed next to
the cell.  When clicked, our custom color picker pops up allowing the user to
select a color.

The `edit` method gives complete flexibility.  You could use a `Popup` widget
for instance, there's no requirement to use a `Window`.  You can cache the UI if
you know that no two instances will be displayed simultaneously -- we did that
above because it's a modal dialog -- or you can create a fresh instance each
time `edit` is invoked.
