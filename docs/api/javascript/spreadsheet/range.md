---
title: Range
page_title: Configuration, methods and events of Kendo UI Spreadsheet Range Instance object
res_type: api
---

# kendo.spreadsheet.Range

Represents one or more rectangular regions of cells in a given [Sheet](/api/javascript/spreadsheet/sheet). Inherits from [Class](/api/javascript/class).

An instance of a range object may be obtained as a return value from the Sheet [range](/api/javascript/spreadsheet/sheet/methods/range) or [selection](/api/javascript/spreadsheet/sheet/methods/selection) methods.

## Methods

### background

Gets or sets the background color of the cells in the range.


<div class="meta-api-description">
Retrieve or modify the background color of spreadsheet cells within a selected range by getting the current fill color or setting a new one using CSS color formats like hex codes, RGB values, or color names, enabling control over cell highlights, shading, or color styling programmatically for specific cell blocks, ranges, or grid areas in spreadsheet automation, styling, or formatting tasks.
</div>

#### Parameters

##### value `String` *optional*

Any valid [CSS color](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value).

#### Returns

`String` the current background color of the top-left cell of the range.

#### Example

```
<div id="spreadsheet"></div>
<script type="text/javascript" charset="utf-8">
    $("#spreadsheet").kendoSpreadsheet();
    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
    var sheet = spreadsheet.activeSheet();
    sheet.range("A1:B2").value("foo");
    sheet.range("A1").background("green");
    sheet.range("A2").background("#a0b0c0");
    sheet.range("B1").background("rgb(255,0, 255)");
</script>
```

### bold

Gets or sets the bold state of the cells in the range.


<div class="meta-api-description">
Control, apply, toggle, or check bold text styling on spreadsheet cells within a selected range, enabling setting or retrieving whether the text is displayed in bold font weight. Adjust, enable, disable, or query bold formatting attributes programmatically for all cells in a range, manipulating font emphasis by turning bold on or off, or inspecting the current bold state. Modify the font weight to make contents bold or normal across multiple cells, supporting batch formatting changes or conditional styling logic for spreadsheet data presentation.
</div>

##### value `Boolean` *optional*

True to make the text bold; false otherwise.

#### Returns

`Boolean` the current bold state of the top-left cell of the range.

#### Example

```
<div id="spreadsheet"></div>
<script type="text/javascript" charset="utf-8">
    $("#spreadsheet").kendoSpreadsheet();
    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
    var sheet = spreadsheet.activeSheet();
    sheet.range("A1").value("bold");
    sheet.range("A1").bold(true);
</script>
```

### borderBottom

Gets or sets the state of the bottom border of the cells. If the range includes more than a single cell, the setting is applied to all cells.


<div class="meta-api-description">
Adjust or retrieve the bottom border style, thickness, or visibility for individual or multiple table cells within a selection or range. Enable setting the bottom edge border on a group of cells simultaneously, query current bottom border settings across selected cells, configure border properties dynamically, and control cell bottom outline appearance for styling or layout purposes. This supports border customization, toggling bottom lines, applying borders programmatically, and managing cell edge formatting in grids or tables.
</div>

#### Parameters

##### value `Object` *optional*

The border configuration object. It may contain `size` and `color` keys.

The `color` may be set to any valid [CSS color](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value).
The `size` should be the border width in pixels (numeric, not string).

#### Returns

`Object` the current value of the top-left cell of the range.

#### Example

```
<div id="spreadsheet"></div>
<script type="text/javascript" charset="utf-8">

    $("#spreadsheet").kendoSpreadsheet();

    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

    var sheet = spreadsheet.activeSheet();

    sheet.range("A2:B3").borderBottom({ size: 2, color: "green" });
</script>
```

### borderLeft

Gets or sets the state of the left border of the cells. If the range includes more than a single cell, the setting is applied to all cells.


<div class="meta-api-description">
Accessing or changing the left border of cells within a spreadsheet area, adjusting or reading border styles, thickness, visibility, or color for the left edge in ranges including single or multiple cells, controlling the left side cell borders uniformly across a selection, configuring left border appearance and properties for cells in a defined range, setting or retrieving left border formatting to apply consistent visual borders on the left edge of selected spreadsheet cells, managing left cell border state for formatting, design, or layout purposes across one or many cells in a range.
</div>

#### Parameters

##### value `Object` *optional*

The border configuration object. It may contain `size` and `color` keys.

The `color` may be set to any valid [CSS color](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value).
The `size` should be the border width in pixels (numeric, not string).

#### Returns

`Object` the current value of the top-left cell of the range.

#### Example

```
<div id="spreadsheet"></div>
<script type="text/javascript" charset="utf-8">

    $("#spreadsheet").kendoSpreadsheet();

    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

    var sheet = spreadsheet.activeSheet();

    sheet.range("A2:B3").borderLeft({ size: 2, color: "green" });
</script>
```

### borderRight

Gets or sets the state of the right border of the cells. If the range includes more than a single cell, the setting is applied to all cells.


<div class="meta-api-description">
Accessing or modifying the right border style, thickness, or presence of cells within a spreadsheet selection, enabling retrieval of current right-edge border settings or applying new border configurations to one or multiple cells simultaneously, controlling cell outline appearance on the right side for formatting, customizing right border lines, adjusting cell border visuals, or querying border status for automated styling and consistent border application across a cell range.
</div>

#### Parameters

##### value `Object` *optional*

The border configuration object. It may contain `size` and `color` keys.

The `color` may be set to any valid [CSS color](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value).
The `size` should be the border width in pixels (numeric, not string).

#### Returns

`Object` the current value of the top-left cell of the range.

#### Example

```
<div id="spreadsheet"></div>
<script type="text/javascript" charset="utf-8">

    $("#spreadsheet").kendoSpreadsheet();

    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

    var sheet = spreadsheet.activeSheet();

    sheet.range("A2:B3").borderRight({ size: 2, color: "green" });
</script>
```

### borderTop

Gets or sets the state of the top border of the cells. If the range includes more than a single cell, the setting is applied to all cells.


<div class="meta-api-description">
Accessing or modifying the top edge border of one or multiple cells within a selected cell block, adjusting border visibility, style, or activation along the upper boundary, applying consistent top border settings across all cells in a group, controlling or querying the presence and appearance of top borders in a cell selection, enabling or disabling lines on the upper cell edges uniformly, setting or retrieving the state of cell borders specifically on the top side for formatting or layout purposes within a range of cells.
</div>

#### Parameters

##### value `Object` *optional*

The border configuration object. It may contain `size` and `color` keys.

The `color` may be set to any valid [CSS color](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value).
The `size` should be the border width in pixels (numeric, not string).

#### Returns

`Object` the current value of the top-left cell of the range.

#### Example

```
<div id="spreadsheet"></div>
<script type="text/javascript" charset="utf-8">

    $("#spreadsheet").kendoSpreadsheet();

    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

    var sheet = spreadsheet.activeSheet();

    sheet.range("A2:B3").borderTop({ size: 2, color: "green" });
</script>
```

### color

Gets or sets the text color of the range.


<div class="meta-api-description">
Retrieve or modify the text color or font color of all cells within a spreadsheet range by getting or setting the foreground color using CSS color values like hexadecimal codes, named colors, or RGB formats; control, adjust, configure, or update cell text formatting colors simultaneously across multiple cells with methods that read current colors or apply new font colors to ranges for data visualization, styling, UI customization, and programmatically changing text appearance in spreadsheets.
</div>

#### Parameters

##### value `String` *optional*

Any valid [CSS color](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value).

#### Returns

`String` the current color of the top-left cell of the range.

#### Example

```
<div id="spreadsheet"></div>
<script type="text/javascript" charset="utf-8">
    $("#spreadsheet").kendoSpreadsheet();
    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
    var sheet = spreadsheet.activeSheet();
    sheet.range("A1:B2").value("foo");
    sheet.range("A1").color("green");
    sheet.range("A2").color("#a0b0c0");
    sheet.range("B1").color("rgb(255,0, 255)");
</script>
```

### comment

Gets or sets the comment for the cells.  The comment is a text tooltip that appears when the cell is hovered.


<div class="meta-api-description">
Configure, read, update, or set cell tooltips and comments visible on hover in a spreadsheet, enabling retrieval or modification of the text note attached to individual cells, whether to display existing annotations, edit or overwrite comments, add descriptive tooltips, control hover text, manage cell notes dynamically, or handle user feedback attached to spreadsheet cells through text popups that appear when hovering over cells.
</div>

#### Parameters

##### value `String` *optional*

Text comment.  Pass `null` to remove the comment.

#### Returns

`String` the current comment of the top-left cell in the range.

#### Example

```
<div id="spreadsheet"></div>
<script type="text/javascript" charset="utf-8">
    $("#spreadsheet").kendoSpreadsheet();
    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
    var sheet = spreadsheet.activeSheet();
    sheet.range("A1").comment("Test");
    sheet.range("A1").comment(null); // remove it
    sheet.range("B2").comment("This is a comment");
</script>
```

### clear

Clears the contents of the range cells.


<div class="meta-api-description">
Erase, blank, or reset cell values, text, formulas, or numbers within a specified selection by invoking a method that clears all data in the highlighted range area. Enable programmatic removal of cell contents, wiping out everything inside the chosen spreadsheet range, effectively resetting or emptying those cells without deleting the cells themselves. Clear out the contents of a defined rectangular block of cells, removing whatever values they hold and setting them back to blank or empty states by applying the clear operation on the selected range. Whether it’s text, numerical data, formulas, or any cell information, use this functionality to wipe all such content clean from the targeted spreadsheet area for data refresh, reset, or content removal purposes.
</div>

#### Parameters

##### options `Object` *optional*

An object which may contain `contentsOnly: true` or `formatOnly: true` key values. Clearing the format will remove the cell formatting and visual styles.

If a parameter is not passed, the method will clear both the cells values and the formatting.

#### Example

```
<div id="spreadsheet"></div>
<script type="text/javascript" charset="utf-8">

    $("#spreadsheet").kendoSpreadsheet();

    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

    var sheet = spreadsheet.activeSheet();

    sheet.range("A1").value(1);
    sheet.range("A2").value(2);
    sheet.range("A1:A2").clear();
</script>
```

### clearFilter

Clears the set filters for the given column(s). The indices is relative to the beginning of the range.


<div class="meta-api-description">
Remove or reset filters applied to specific columns within a data range by clearing column filters through programmatic commands using column indexes or positions relative to the range start, enabling developers to dynamically manage, control, and update filtered views, adjust or remove criteria set on particular columns, and handle partial or multiple column filter clearing operations for flexible data manipulation and filtering reset scenarios.
</div>

#### Parameters

##### indices `Array | Number`

The column(s) which filters should be cleared.

#### Example - clear the filters for a column

```
<div id="spreadsheet"></div>

<script type="text/javascript" charset="utf-8">

    $("#spreadsheet").kendoSpreadsheet();

    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

    var sheet = spreadsheet.activeSheet();

    var values = [
        [ "C 1", "C 2", "C 3" ],
        [ 7, 5, 6 ],
        [ 7, 8, 9 ],
        [ 6, 3, 9 ]
    ];

    sheet.range("A1:C4").values(values);

    var filter = new kendo.spreadsheet.ValueFilter({ values: [ 7 ] });
    var filter2 = new kendo.spreadsheet.ValueFilter({ values: [ 8 ] });

    sheet.range("A1:C4").filter([
      { column: 0, filter: filter },
        { column: 1, filter: filter2 }
    ]);

    // row 3 will be visible now.

    sheet.range("A1:C3").clearFilter([ 1 ]);
    // the filter on B column will be cleared, so rows 2 and 3 will be visible.
</script>

```

### editor

Gets or sets the editor of the cells in the range.


<div class="meta-api-description">
Set, get, customize, or control the cell editor used within a selected range of cells, including configuring the editing interface, replacing the default editor, retrieving the current editor instance or function, and managing editor behavior for batch cell editing or inline editing scenarios in spreadsheet-like components. This covers how to specify or modify the editing mechanism, adjust editor options for groups of cells, access editor configurations programmatically, and tailor cell input handling in a flexible, programmable way.
</div>

##### value `String` *optional*

The name of the custom cell editor, registered as [described in this help article](https://docs.telerik.com/kendo-ui/controls/spreadsheet/custom-editors)

#### Returns

`String` name of the custom cell editor.

#### Example

```
<div id="spreadsheet" style="width: 100%;"></div>
  <script>
    kendo.spreadsheet.registerEditor("color", function(){
        var context, dlg, model;

        // Further delay the initialization of the UI until the `edit` method is
        // actually called, so here just return the object with the required API.

        return {
            edit: function(options) {
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

   $(function() {
       $("#spreadsheet").kendoSpreadsheet({
           sheetsbar: false,
           excel: {
               // Required to enable Excel Export in some browsers
               proxyURL: "https://demos.telerik.com/service/v2/core/export"
           },
           sheets: [{
               rows: [{
                   cells: [
                       { value: "Select color:", bold: true },
                       { background: "#fef0cd",
                         editor: "color" }
                   ]
               }]
           }]
       });
   });
  </script>
```

### enable

Gets or sets the disabled state of the cells in the range.


<div class="meta-api-description">
Control cell interactivity within a range by toggling their enabled or disabled status, modify or query whether individual or multiple cells are active, turn on or off user input and interactions for cells programmatically, check current disabled states to conditionally enable or disable cells dynamically, configure cell accessibility to allow or restrict editing, activation, or focus, manage cell responsiveness by enabling or disabling them during runtime or initialization, switch between interactive and non-interactive states for UI elements in a selectable range, adjust cell availability to user actions by setting boolean flags for enabled or disabled modes, retrieve the boolean state indicating if cells are currently enabled or disabled, and implement conditional logic to programmatically set or get cell status for flexible UI behavior.
</div>

##### value `Boolean` *optional*

True to make the cell enabled; false to disable it.

#### Returns

`Boolean` the current disabled state of the top-left cell of the range.

#### Example

```
<div id="spreadsheet"></div>
<script type="text/javascript" charset="utf-8">
    $("#spreadsheet").kendoSpreadsheet();
    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
    var sheet = spreadsheet.activeSheet();
    sheet.range("A1").value("disabled");
    sheet.range("A1").enable(false);
</script>
```

### html

Gets or sets the html rendering of the cells in the range.


<div class="meta-api-description">
Retrieve or modify the HTML content used to render cells within a specified spreadsheet range, enabling customization of cell markup, templates, and displayed content by getting the current HTML or setting new HTML programmatically to update, override, or dynamically control how cells appear within the selection.
</div>

##### value `Boolean` *optional*

True to make the cell render the value as HTML. 
It is important to sanitize the value of the cell on the server for passing safe html because there is no client-side sanitizing. When editing a cell the new value can be checked and prevented in the client `changing` event.

> When the value is 'true ' the value of the cell should be always sanitized on the server for passing safe html.

#### Returns

`Boolean` the current html state of the top-left cell of the range.

#### Example

```
<div id="spreadsheet"></div>
<script type="text/javascript" charset="utf-8">
    $("#spreadsheet").kendoSpreadsheet();
    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
    var sheet = spreadsheet.activeSheet();
    sheet.range("A1").value("<b>bold</b>");
    sheet.range("A1").html(true);
</script>
```


### fillFrom

Fills a range with values inferred from a source range.  This method employs some heuristics similar to what Excel's auto-filling algorithm does when you select a range of cells and drag the bottom-right handle.  The range to be filled is the current object, and you must pass a source range containing data as first argument.


<div class="meta-api-description">
Automatically populate or extend a cell range with data copied or extrapolated from another range, enabling seamless series filling, date increments, number patterns, or text replication similar to spreadsheet drag fill features; configure or trigger this fill operation by specifying the source range to replicate or extend patterns, facilitating auto-fill behaviors, data propagation, sequence continuation, or batch expansion within spreadsheets.
</div>

#### Parameters

##### srcRange `Range | String`

The source range.  It must have the same number of rows or the same number of columns as the current range — otherwise
an exception will be thrown (a `Range.FillError` object having `code` property `"incompatibleRanges"`).

##### direction `Number` *optional*

Specifies the fill direction.  If the source range (`srcRange`) and target range (the current object) are adjacent, the
fill direction can be inferred from their positions, so it can be missing.  For example:

```
    sheet.range("B2:C3").fillFrom("B4:C5")
```

In this case it will select vertical reverse filling, because the target range is above the source range.

If the ranges are not adjacent and the direction is missing, an exception will be thrown if the ranges don't start
either on same column or on the same row (`"noFillDirection"` error code).

Possible values for direction:

- 0 — fill top-down
- 1 — fill left-to-right
- 2 — fill bottom-up
- 3 — fill right-to-left

#### Example

```
    <div id="spreadsheet"></div>
    <script type="text/javascript" charset="utf-8">

        $("#spreadsheet").kendoSpreadsheet();

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

        var sheet = spreadsheet.activeSheet();

        sheet.range("A1:C2").values([
            [ 2, "Mon", "Foo 1" ],
            [ 5, "Wed", "Foo 2" ]
        ]);

        try {
            sheet.range("A3:C10").fillFrom("A1:C2");
        } catch(ex) {
            if (ex instanceof kendo.spreadsheet.Range.FillError) {
                // can be "incompatibleRanges" or "noFillDirection"
	/* The result can be observed in the DevTools(F12) console of the browser. */
                console.log(ex.code);
            } else {
                throw ex;
            }
        }
    </script>
```

The above will continue column `A` with 8, 11, 14 etc., column `B` with "Fri", "Sun", "Thu" etc. and column `C` with
"Foo 3", "Foo 4" etc.

### filter

Enables/disables or sets the filter for a given range.


<div class="meta-api-description">
Control, enable, configure, set, or update filtering on specific spreadsheet cell ranges by programmatically applying filter criteria, definitions, and operators; manage filter states such as turning filters on or off, adjusting column filters, applying complex filter conditions, modifying or removing filters, and dynamically controlling which data is visible within selected cells after initialization; use methods to apply criteria-based filtering, customize filter parameters, and programmatically manage data visibility and sorting within a defined range of cells in a spreadsheet environment.
</div>

#### Parameters

##### filter `Boolean | Object | Array`

Determines the action performed by the method.

* Passing `true` enables the filtering for the given range.
* Passing `false` disables and clears the set filters.
* Passing a `{ column: Number, filter: kendo.spreadsheet.Filter }` object applies the filter to the respective column.
* Passing an array of `{ column: Number, filter: kendo.spreadsheet.Filter }` objects applies each filter to the respective column. The column index is relative to the beginning of the range.

#### Example - enable filter

```
<div id="spreadsheet"></div>
<script type="text/javascript" charset="utf-8">

    $("#spreadsheet").kendoSpreadsheet();

    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

    var sheet = spreadsheet.activeSheet();

    var values = [
        [ 1, 2, 3 ],
        [ 4, 5, 6 ],
        [ 7, 8, 9 ]
    ];

    sheet.range("A1:C3").values(values);

    sheet.range("A1:C3").filter(true);
</script>
```

#### Example - disable filter
```
<div id="spreadsheet"></div>
<script type="text/javascript" charset="utf-8">

    $("#spreadsheet").kendoSpreadsheet();

    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

    var sheet = spreadsheet.activeSheet();

    var values = [
        [ 1, 2, 3 ],
        [ 4, 5, 6 ],
        [ 7, 8, 9 ]
    ];

    sheet.range("A1:C3").values(values);

    sheet.range("A1:C3").filter(true);
    sheet.range("A1:C3").filter(false);
</script>
```

#### Example - set filter
```
<div id="spreadsheet"></div>
<script type="text/javascript" charset="utf-8">

    $("#spreadsheet").kendoSpreadsheet();

    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

    var sheet = spreadsheet.activeSheet();

    var values = [
        [ 1, 2, 3 ],
        [ 4, 5, 6 ],
        [ 7, 8, 9 ]
    ];

    var values = [
        [ "C 1", "C 2", "C 3" ],
        [ 4, 5, 6 ],
        [ 7, 8, 9 ]
    ];

    sheet.range("A1:C3").values(values);

    var filter = new kendo.spreadsheet.ValueFilter({ values: [ 7 ] });

    sheet.range("A1:C3").filter({ column: 0, filter: filter });
</script>
```

#### Example - set multiple filters

```
<div id="spreadsheet"></div>
<script type="text/javascript" charset="utf-8">

    $("#spreadsheet").kendoSpreadsheet();

    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

    var sheet = spreadsheet.activeSheet();

    var values = [
        [ "C 1", "C 2", "C 3" ],
        [ 4, 5, 6 ],
        [ 7, 8, 9 ]
    ];

    sheet.range("A1:C3").values(values);

    var filter = new kendo.spreadsheet.ValueFilter({ values: [ 7 ] });
    var filter2 = new kendo.spreadsheet.ValueFilter({ values: [ 8 ] });

    sheet.range("A1:C3").filter([
        { column: 0, filter: filter },
        { column: 1, filter: filter2 }
    ]);
</script>
```

### fontFamily

Gets or sets the font family of the cells in the range.


<div class="meta-api-description">
Retrieve or adjust the typeface style for multiple spreadsheet cells by configuring, setting, or reading the font family applied within a selected cell range; enable changing or obtaining the text font, typography style, or font name across a block of cells to control appearance, update font settings dynamically, or query current typeface information for a range in spreadsheet automation or scripting tasks.
</div>

#### Parameters

##### value `String` *optional*

The font family that should be set.

#### Returns

`String` the font family of the top-left cell of the range.

#### Example

```
<div id="spreadsheet"></div>
<script type="text/javascript" charset="utf-8">
    $("#spreadsheet").kendoSpreadsheet();
    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
    var sheet = spreadsheet.activeSheet();
    sheet.range("A1:B1").value("monospace");
    sheet.range("A1").fontFamily("monospace");
</script>
```

### fontSize

Gets or sets the font size of the cells in the range.


<div class="meta-api-description">
Set, get, or adjust text size, font scaling, character height, or typography size across all cells in a selected spreadsheet area, enabling programmatic control over cell font dimensions to retrieve current font size or apply new sizing uniformly within a defined range, useful for batch updates, dynamic styling, or reading font metrics in spreadsheets.
</div>

#### Parameters

##### value `Number` *optional*

The font size (in pixels) that should be set.

#### Returns

`Number` the font size of the top-left cell of the range.

#### Example

```
<div id="spreadsheet"></div>
<script type="text/javascript" charset="utf-8">
    $("#spreadsheet").kendoSpreadsheet();
    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
    var sheet = spreadsheet.activeSheet();
    sheet.range("A1").value("50px");
    sheet.range("A1").fontSize(50);
</script>
```

### forEachCell

Executes a function for each cell in the range.


<div class="meta-api-description">
iterate through each cell in a selected range of a spreadsheet, loop over all cells within a defined area, execute a function for every cell individually, perform per-cell operations like reading values, updating content, applying styles or formatting, collect or process data from cells, run synchronous callbacks on each cell in the range, batch modify or analyze cells one by one, traverse cells for custom logic execution, control and manipulate spreadsheet cells programmatically within a specific range using iteration and callback functions.
</div>

#### Parameters

##### callback `Function`

The function that will be executed against every cell. The function receives the following parameters:

- **rowIndex** - the row index of the cell
- **columnIndex** - the column index of the cell
- **cellProperties** - the cell properties

#### Example

```
<div id="spreadsheet"></div>
<script>

    $("#spreadsheet").kendoSpreadsheet({
        sheets: [
            { rows: [
                { cells: [
                    { value: "A1" }, { value: "B1" }
                ] },
                { cells: [
                    { value: "A2" }, { value: "B2" }
                ] }
            ] }
        ]
    });


    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
    var sheet = spreadsheet.activeSheet();
    var range = sheet.range("A1:B2");

    range.forEachCell(function (row, column, cellProperties) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(row, column, cellProperties);
    });
</script>
```

### format

Gets or sets the format of the cells.


<div class="meta-api-description">
Set, change, retrieve, or read the display format applied to spreadsheet cells in a given range, including configuring number formats, date styles, text formats, or custom formatting patterns for cells programmatically; control how cell data appears visually, enable formatting updates, get current formatting details, apply new display settings, and manipulate cell appearance options dynamically within ranges.
</div>

#### Parameters

##### format `String` *optional*

The new format for the cells.

#### Returns

`String` the format of the top-left cell of the range.  When used as a
setter, `format` returns the Range object to allow chained calls.

More details about the supported format may be found in [the cell formatting help topic](/web/spreadsheet/format).

#### Example

```
<div id="spreadsheet"></div>
<script type="text/javascript" charset="utf-8">

    $("#spreadsheet").kendoSpreadsheet();

    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

    var sheet = spreadsheet.activeSheet();

    sheet.range("A1").value(12.3456).format("#.###");
</script>
```

### formula

Gets or sets the formula of the cells.


<div class="meta-api-description">
Retrieve or set spreadsheet cell formulas within a selected range by accessing or assigning formula strings, enabling reading existing formulas, updating multiple cells at once, applying or changing calculations across ranges programmatically, configuring cell expressions, managing formula content, and automating formula adjustments or queries on grouped cells in tabular data environments.
</div>

#### Parameters

##### formula `String` *optional*

The new formula of the cell. The string may optionally start with `=`.

#### Returns

`String` the formula of the top-left cell of the range.

#### Example

```
<div id="spreadsheet"></div>
<script type="text/javascript" charset="utf-8">

    $("#spreadsheet").kendoSpreadsheet();

    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

    var sheet = spreadsheet.activeSheet();

    sheet.range("A1").input("1000");
    sheet.range("A2").formula("A1*2");
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(sheet.range("A2").formula()); // "A1*2"
</script>
```

### hasFilter

Returns `true` if the sheet of the range has filter enabled.


<div class="meta-api-description">
Check if a worksheet or spreadsheet range currently has active filters applied, detect whether filtering or filter views are enabled on the parent sheet, determine filter state to conditionally execute data filtering, export operations, UI updates, or logic that depends on the presence or absence of filters, verify if filter options, filter criteria, or filter toggles are turned on, identify filtering status for managing data visibility, control workflows based on whether sheet filtering is active or disabled, and ascertain filter activation to customize user interface or processing steps accordingly.
</div>

#### Returns

`Boolean` `true` if the sheet has a filter, `false` otherwise.

#### Example - clear the filters for a column

```
<div id="spreadsheet"></div>

<script type="text/javascript" charset="utf-8">

    $("#spreadsheet").kendoSpreadsheet();

    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

    var sheet = spreadsheet.activeSheet();

    var values = [
        [ "C 1", "C 2", "C 3" ],
        [ 7, 5, 6 ],
        [ 7, 8, 9 ],
        [ 6, 3, 9 ]
    ];

    sheet.range("A1:C4").values(values);

    var filter = new kendo.spreadsheet.ValueFilter({ values: [ 7 ] });
    var filter2 = new kendo.spreadsheet.ValueFilter({ values: [ 8 ] });

    sheet.range("A1:C4").filter([
      { column: 0, filter: filter },
        { column: 1, filter: filter2 }
    ]);

	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(sheet.range("A1:C4").hasFilter());
</script>
```


### input

Gets or sets the value of the cells.  This is similar to `value`, but it parses the argument as if it was entered through the text box:

- if it starts with `=` (equal sign), a *formula* is set.  This may throw an error if the formula is syntactically invalid.  Example: `range("C1").input("=A1+B1")`.
- if it looks like a number, a numeric value (not string) is set.
- if it's `true` or `false` (case-insensitive) the respective boolean value is set.
- if it's a `Date` object, or a string that can be parsed as a date, it is converted to the numerical representation of the date.
- if it starts with `'` (single quote), a string containing the rest of the characters is set.  Example: `range("A1").input("'TRUE")` — sets the *text* "TRUE", not the boolean.


<div class="meta-api-description">
Set or retrieve cell contents with exact parsing as entered in a spreadsheet cell input, enabling entry of formulas starting with '=', numerical values, booleans from "true" or "false" strings, dates from Date objects or date-parsable strings converted into serial number form, and explicit text strings beginning with a single quote to prevent formula or data type parsing; control, assign, or configure cell input dynamically to handle formulas, numbers, booleans, date conversions, or literal text exactly as if typed in the interface, supporting error handling for invalid formulas, switching between parsed and unparsed content, and managing diverse input types in spreadsheet range cells.
</div>

#### Parameters

##### value `String|Number|Date` *optional*

The value to be set to the cells.

#### Returns

`Object` the current value of the top-left cell of the range.

#### Example

```
<div id="spreadsheet"></div>
<script type="text/javascript" charset="utf-8">

    $("#spreadsheet").kendoSpreadsheet();

    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

    var sheet = spreadsheet.activeSheet();

    sheet.range("A1").input("1");
    sheet.range("A2").input("=A1*2");
</script>
```

### isSortable

Returns if a range can be sorted.


<div class="meta-api-description">
Check if a selected spreadsheet range supports sorting by verifying its sortable status with methods that return true or false based on the range’s ability to be sorted; useful for conditionally enabling, disabling, or controlling sorting features, preventing errors when applying sort commands, programmatically detecting whether a range can be ordered, managing sortability checks before executing sort operations, and integrating UI logic that reflects whether sorting is allowed on the current selection.
</div>

#### Returns

`Boolean` whether the range can be sorted.

#### Example

```
<div id="spreadsheet"></div>
<script type="text/javascript" charset="utf-8">

    $("#spreadsheet").kendoSpreadsheet();

    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

    var sheet = spreadsheet.activeSheet();

    var range = sheet.range("A1:B1");

    if (range.isSortable()) {
        range.sort()
    }
</script>
```

### isFilterable

Returns if a range can be filtered.


<div class="meta-api-description">
Determine whether a specific range within a spreadsheet or grid supports applying filters by checking its filter capability status, verifying if filter operations like sorting, hiding, or showing rows based on criteria can be enabled or configured, and assessing if the range is eligible for filter application before attempting filter setup or manipulation; this check returns a true or false response indicating whether dynamic filtering, filter controls, or filter-related actions are allowed on that range during runtime validation or conditional logic in data processing workflows.
</div>

#### Returns

`Boolean` whether the range can be filtered.

#### Example

```
<div id="spreadsheet"></div>
<script type="text/javascript" charset="utf-8">

    $("#spreadsheet").kendoSpreadsheet();

    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

    var sheet = spreadsheet.activeSheet();

    var range = sheet.range("A1:B1");

    if (range.isFilterable()) {
        range.filter(true);
    }
</script>
```

### italic

Gets or sets the italic state of the cells in the range.


<div class="meta-api-description">
Configure, check, or toggle italic text styling for multiple cells simultaneously within a selected range in a spreadsheet, enabling programmatic control to apply, remove, enable, disable, set, or query italic font formatting for all cells grouped in that area. Whether you need to enforce italic style, detect if text is italicized, switch italic on or off, or manipulate text appearance across a batch of cells, this method supports seamless bulk updates and style retrieval for cells within any defined spreadsheet range.
</div>

#### Parameters

##### value `Boolean` *optional*

True will make the text of the cells italic; false otherwise.

#### Returns

`Boolean` the current italic state of the top-left cell of the range.

#### Example

```
<div id="spreadsheet"></div>
<script type="text/javascript" charset="utf-8">
    $("#spreadsheet").kendoSpreadsheet();
    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
    var sheet = spreadsheet.activeSheet();
    sheet.range("A1").value("italic");
    sheet.range("A1").italic(true);
</script>
```

### link

Gets or sets the hyperlink of the cells in the range.


<div class="meta-api-description">
Retrieve, update, assign, or modify URLs and hyperlinks across a selection of spreadsheet cells, enabling batch editing, programmatic control of link addresses, setting uniform hyperlinks for multiple cells, reading existing link targets, managing cell references with URLs, bulk hyperlink configuration, and automating link insertion within a cell range for spreadsheet data management and dynamic hyperlink adjustments.
</div>

#### Parameters

##### url `String` *optional*

Pass a string (the URL) to create a hyperlink.  Pass `null` to remove the link.
Omit argument to get the existing URL, if any.

#### Returns

`String` the current hyperlink attribute of the top-left cell of the range.

#### Example

```
<div id="spreadsheet"></div>
<script type="text/javascript" charset="utf-8">
    $("#spreadsheet").kendoSpreadsheet();
    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
    var sheet = spreadsheet.activeSheet();
    sheet.range("A1").value("Visit telerik.com!");
    sheet.range("A1").link("https://www.telerik.com/");
</script>
```

### merge

Merges the range cells into a single merged cell. If the range already includes a merged cell, they are merged, too.


<div class="meta-api-description">
Combine multiple adjacent spreadsheet cells into one unified cell by merging ranges, consolidating any pre-existing merged cells within the selection into a single merged block; configure or enable cell merging to unify contiguous cells horizontally or vertically, set merged areas for formatting or data display, control merging of cells within specified ranges, and apply merges that flatten complex cell groups into one, supporting workflows for grouping and aligning content across spreadsheet grids.
</div>

#### Example

```
<div id="spreadsheet"></div>
<script type="text/javascript" charset="utf-8">

    $("#spreadsheet").kendoSpreadsheet();

    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

    var sheet = spreadsheet.activeSheet();

    sheet.range("A1:B2").merge();
</script>
```


### select

Sets the sheet selection to the range cells.


<div class="meta-api-description">
Configure or update the current cell selection in a spreadsheet interface by programmatically setting focus, highlighting specific cells, or preparing a range for user interaction such as editing and keyboard navigation. This enables controlling which cells are actively selected or focused by applying selection commands to cell ranges, adjusting the active sheet’s highlighted area, and immediately reflecting changes to the selection state for tasks like batch editing, navigation, or focus management within a spreadsheet grid. Use cases include setting or changing the selected cells dynamically, enabling selection updates on initialization or user action, and managing visual focus on specific ranges through code.
</div>

#### Example

```
<div id="spreadsheet"></div>
<script type="text/javascript" charset="utf-8">

    $("#spreadsheet").kendoSpreadsheet();

    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

    var sheet = spreadsheet.activeSheet();

    sheet.range("A1:B2").select();
</script>
```

### sort

Sorts the rows in the range.


<div class="meta-api-description">
Control how to reorder or sort rows within a selected spreadsheet cell range by applying in-place sorting that modifies the data order dynamically, allowing developers to configure sorting based on column keys, ascending or descending sequences, custom comparison functions, or multi-criteria sorting. Enable runtime rearrangement of data rows inside specific ranges, set sorting parameters programmatically to organize table content, and customize sorting behavior through method calls that manipulate cell ranges and their row order according to desired criteria or custom logic.
</div>

#### Parameters

##### sort `Number | Object | Array`

Determines the action performed by the method.

* Passing a number `n` sorts the `n`th column in the range, in ascending order.
* Passing a `{ column: Number, ascending: Boolean }` sorts the respective column in ascending / descending order, based on the ascending parameter. The column index is relative to the beginning of the range.
* Passing an array of `{ column: Number, ascending: Boolean }` objects sorts each column, specified by the index.

#### Example - sort a single column

```
<div id="spreadsheet"></div>
<script type="text/javascript" charset="utf-8">

    $("#spreadsheet").kendoSpreadsheet();

    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

    var sheet = spreadsheet.activeSheet();

    var values = [
        [ 1, 2, 3 ],
        [ 7, 8, 9 ],
        [ 4, 5, 6 ]
    ];

    sheet.range("A1:C3").values(values);

    sheet.range("A1:C3").sort(1);
</script>
```

#### Example - sort a column in descending order

```
<div id="spreadsheet"></div>
<script type="text/javascript" charset="utf-8">

    $("#spreadsheet").kendoSpreadsheet();

    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

    var sheet = spreadsheet.activeSheet();

    var values = [
        [ 1, 2, 3 ],
        [ 7, 8, 9 ],
        [ 4, 5, 6 ]
    ];

    sheet.range("A1:C3").values(values);

    sheet.range("A1:C3").sort({ column: 2, ascending: false });
</script>
```

### textAlign

Gets or sets the text alignment of the cells in the range.


<div class="meta-api-description">
Set, modify, control, retrieve, or configure horizontal text alignment for all cells within a selected spreadsheet range, using keywords like left, center, right, or justify to adjust cell content positioning and layout; determine current alignment by querying without parameters or apply new alignment settings to customize text display, formatting, and cell presentation across columns, rows, or specific ranges, enabling precise alignment adjustments in grid or table data for consistent visual organization and readability in spreadsheet components.
</div>

#### Parameters

##### value `String` *optional*

One of the following values: "left", "center", "right" and "justify".

#### Returns

`String` the current text alignment of the top-left cell of the range.

#### Example

```
<div id="spreadsheet"></div>
<script type="text/javascript" charset="utf-8">
    $("#spreadsheet").kendoSpreadsheet();
    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
    var sheet = spreadsheet.activeSheet();
    sheet.range("A1").value("left");
    sheet.range("A1").textAlign("left");
    sheet.range("A2").value("right");
    sheet.range("A2").textAlign("right");
    sheet.range("A3").value("center");
    sheet.range("A3").textAlign("center");
    sheet.range("A4").value("justify");
    sheet.range("A4").textAlign("justify");
</script>
```

### unmerge

Un-merges any merged cells which are included in the range.


<div class="meta-api-description">
Split merged cells, unmerge combined cells, restore original individual cells from merged areas, break cell spanning across rows or columns, separate merged blocks inside a selected range, reverse merges within specific cell ranges, control cell layout by undoing merges, modify spreadsheet data by splitting merged cells, update sheet model to reflect unmerged cells, revert merged cell formatting inside specified areas while preserving unaffected cells.
</div>

#### Example

```
<div id="spreadsheet"></div>
<script type="text/javascript" charset="utf-8">

    $("#spreadsheet").kendoSpreadsheet();

    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

    var sheet = spreadsheet.activeSheet();

    sheet.range("A1:B2").merge();
    sheet.range("B3:C3").merge();
    sheet.range("A1:D4").unmerge(); // this will unmerge both merged cells.
</script>
```

### values

Gets or sets the values of the range cells. The argument should be an array of arrays which match the dimensions of the range.

> This method clears the formulas on every cell.


<div class="meta-api-description">
Access, retrieve, update, or set values within a rectangular table or grid selection by providing or extracting nested arrays that correspond to the dimensions of the target range, enabling bulk read or write operations on multiple cells simultaneously while overriding any existing formulas, useful for batch modifications, data replacement, or extraction of cell contents programmatically.
</div>

#### Parameters

##### values `Array`

The cell values.

#### Returns

`Array` the cell values.

#### Example

```
<div id="spreadsheet"></div>
<script type="text/javascript" charset="utf-8">

    $("#spreadsheet").kendoSpreadsheet();

    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

    var sheet = spreadsheet.activeSheet();

    var values = [
        [ 1, 2, 3 ],
        [ 4, 5, 6 ],
        [ 7, 8, 9 ]
    ];

    sheet.range("A1:C3").values(values);
</script>
```

### validation

Gets or sets the validation of the cells.


<div class="meta-api-description">
Control, configure, and retrieve data validation rules for a group of cells by accessing or modifying validation settings programmatically within a selected range. Enable specifying criteria, constraints, or restrictions that govern allowable cell values, apply, update, or query validation parameters to enforce input rules, conditions, or requirements on multiple cells collectively. Manage validation states, enforce data integrity, customize validation logic, toggle rules on or off, and dynamically adjust validation definitions across cell collections in spreadsheets or data grids through programmable methods.
</div>

#### Parameters

##### value `Object` *optional*

The validation configuration object. It may contain `type`, `comparerType`, `dataType`, `from`, `to`, `allowNulls`, `messageTemplate` and `titleTemplate` keys.

> Setting a validation, which contains references to a range of two or more cells, leads to the adjustment of the validation formula if a relative reference is used. In such cases, use an absolute reference such as `$A$1`.

The `type` Can be set to "warning" or "reject". By default the type is "warning".

The `comparerType` Can be set to "greaterThan", "lessThan", "between", "equalTo", "notEqualTo", "greaterThanOrEqualTo", "lessThanOrEqualTo", "notBetween" or "custom".

The `dataType` Can be set to "date", "text", "number", "list" or "custom".

The `from` This key holds formula or value. Used as first or only compare value depending on specified comparer.

The `to` This key can be set to formula or value. It's optional depending on the specified comparer.

The `allowNulls` Can be set to boolean value.

The `messageTemplate` The message which will be displayed in the "reject" validation window.

The `titleTemplate` The title of the "reject" validation window.

#### Returns

`Object` the current validation of the top-left cell of the range.

#### Example

```
<div id="spreadsheet"></div>
<script type="text/javascript" charset="utf-8">

    $("#spreadsheet").kendoSpreadsheet();

    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

    var sheet = spreadsheet.activeSheet();

    sheet.range("A1").value(4);
    sheet.range("A1").validation({
        from: "1",
        to: "2",
        comparerType: "between",
        dataType: "number",
        messageTemplate: "Number should match the validation."
    });
</script>
```

### value

Gets or sets the value of the cells.

> If the cell has formula set, the value setting will clear it.


<div class="meta-api-description">
Accessing, retrieving, reading, or updating cell contents within a spreadsheet range involves getting or setting values programmatically, including fetching current data, modifying individual or multiple cell entries, replacing cell contents with new data, clearing formulas automatically when assigning new values, handling single cells or entire ranges of cells, controlling cell data input or output, configuring cell content dynamically, and managing value assignment effects on formulas in cells.
</div>

#### Parameters

##### value `String|Number|Date` *optional*

The value to be set to the cells.

#### Returns

`Object` the current value of the top-left cell of the range.

#### Example

```
<div id="spreadsheet"></div>
<script type="text/javascript" charset="utf-8">

    $("#spreadsheet").kendoSpreadsheet();

    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

    var sheet = spreadsheet.activeSheet();

    sheet.range("A1:B2").value("foo");
</script>
```

### verticalAlign

Gets or sets the vertical alignment of the cells in the range.


<div class="meta-api-description">
Adjust or retrieve the vertical alignment of text or elements inside grid or table cells within a selected range, enabling control over top, middle, bottom, or baseline positioning to format cell content consistently, align items vertically, set or get current vertical positioning, and dynamically update or style multiple cells’ vertical placement in batch operations or responsive layouts.
</div>

#### Parameters

##### value `String` *optional*

One of the following values: "top", "center" and "bottom".

#### Returns

`String` the current text alignment of the top-left cell of the range.

#### Example

```
<div id="spreadsheet"></div>
<script type="text/javascript" charset="utf-8">
    $("#spreadsheet").kendoSpreadsheet();
    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
    var sheet = spreadsheet.activeSheet();
    sheet.rowHeight(0, 40);
    sheet.rowHeight(1, 40);
    sheet.rowHeight(2, 40);
    sheet.range("A1").value("top");
    sheet.range("A1").verticalAlign("top");
    sheet.range("A2").value("center");
    sheet.range("A2").verticalAlign("center");
    sheet.range("A3").value("bottom");
    sheet.range("A3").verticalAlign("bottom");
</script>
```

### wrap

Gets or sets the wrap of the range cells.


<div class="meta-api-description">
Control, enable, toggle, set, or retrieve text wrapping modes for cells within a selected range in a spreadsheet, adjusting how cell content flows or breaks onto multiple lines. Configure the wrapping behavior to automatically wrap text inside cells, disable wrapping for single-line display, or query the current wrap settings of a range to manage cell formatting dynamically. Use this functionality to update cell alignment, control multiline text display, optimize readability, or programmatically switch wrap modes in bulk across spreadsheet ranges, supporting both getting and setting wrap states for precise text flow control in grid or table data.
</div>

#### Parameters

##### value `Boolean` *optional*

`true` if to enable wrapping, `false` otherwise.

#### Returns

`Boolean` the current wrap state of the top-left cell of the range.

#### Example

```
<div id="spreadsheet"></div>
<script type="text/javascript" charset="utf-8">

    $("#spreadsheet").kendoSpreadsheet();

    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

    var sheet = spreadsheet.activeSheet();

    sheet.range("A2").value("long long long long long long text");
    sheet.range("A2:B3").wrap(true);
</script>
```
