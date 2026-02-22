---
title: Sheet Resizing
page_title: Spreadsheet Sheet Resizing
description: "Learn how to resize the sheet of the Telerik UI Spreadsheet for {{ site.framework }}, by using the client-side API of the component."
components: ["spreadsheet"]
slug: htmlhelpers_spreadsheet_sheet_resizing_aspnetcore
position: 9
---

# Sheet Resizing 

As of the R1 2022 SP2 release, the API of the Spreadsheet [Sheet](https://docs.telerik.com/kendo-ui/api/javascript/spreadsheet/sheet) includes a `resize` method. You can use it to increase or decrease the number of rows and columns in the sheet, after the initialization of the Spreadsheet. If the user pastes data that exceeds the current sheet size, the sheet will automatically resize. The user can also add or delete columns and rows from the toolbar.

> If you delete a row or a column through the `resize` method or by using the **Delete Row** or **Delete Column** toolbar tool, it will be removed even if it contains data. 


## Using the Resize Method

If you programmmatically set the number of rows or columns with the `resize` method, the user will not able to revert the applied changes through the **Undo** or **Redo** toolbar options. **Undo** and **Redo** will take effect, only if the user modifies the number of rows or columns through the **Insert New Row** or **Insert New Column**, or the **Delete Row** or **Delete Column** toolbar options.

The example below shows how to set the number of rows and columns in the active sheet by using the [`resize`](https://docs.telerik.com/kendo-ui/api/javascript/spreadsheet/sheet/methods/resize) API method. 

```HtmlHelper
@(Html.Kendo().Spreadsheet()
	.Name("spreadsheet")
	.Sheets(sheets =>
	{
		sheets.Add()
			.Name("Food Order");
	})
)

<script>
    $(document).ready(function() {
    	var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
    	var sheet = spreadsheet.activeSheet();
    	sheet.resize(25, 5); //there will be 25 rows and 5 columns in the sheet
    });
</script>
```
{% if site.core %}
```TagHelper
<kendo-spreadsheet name="spreadsheet">
	<sheets>
		<sheet name="Food Order">
		</sheet>
	</sheets>
</kendo-spreadsheet>

<script>
    $(document).ready(function() {
    	var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
    	var sheet = spreadsheet.activeSheet();
    	sheet.resize(25, 5); //there will be 25 rows and 5 columns in the sheet
    });
</script>
```
{% endif %}

## New vs. Old Behavior

The implementation of the `resize` method has led to the following changes in the behavior of the Spreadsheet: 

- **Insert New Row** and **Insert New Column** options&mdash;The user can insert a new row or column in the current sheet, and increase the number of the initially configured rows or columns. This is possible even if the last row or column in the sheet contains data. 

  For versions prior to R1 2022 SP2, if the user inserted rows or columns, the data in the sheet would be shifted, without changing the number of rows and columns. To avoid possible data loss, the user was not allowed to insert a new row or column in the sheet, if the last row or column contained data. 

- **Delete Row** and **Delete Column** options&mdash;Now the user can delete rows or columns through the context menu, by right-clicking a row or column. The user can also decrease the number of rows or columns in the active sheet by using the **Delete Row** or **Delete Column** toolbar options. 

  For versions prior to R1 2022 SP2, the cells were deleted, but the sheet size remained unchanged.

- **Resizing on pasting data**&mdash;Currently, if the user pastes data that exceeds the sheet size, the sheet will automatically add new rows or columns. 

  The Spreadsheet in versions prior to R1 2022 SP2 does not automatically add new rows or columns in this scenario. In those versions the Spreadsheet displays the `"Cannot paste, because the copy area and the paste area are not the same size and shape."` message in a dialog.


## See Also

* [Spreadsheet JavaScript API Reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/spreadsheet)
* [Sheet JavaScript API Reference](https://docs.telerik.com/kendo-ui/api/javascript/spreadsheet/sheet)
