---
title: Sheet Resizing
page_title: jQuery Spreadsheet Documentation - Sheet Resizing
description: "Get started with the jQuery Spreadsheet by Kendo UI and learn how to change the size of the sheet."
slug: resize_spreadsheet_widget
position: 8
---

# Sheet Resizing 

As of the R1 2022 SP2 release, the Spreadsheet [Sheet](/api/javascript/spreadsheet/sheet) exposes a `resize` method that allows you to change the number of the rows and columns in the current sheet. 

The new functionality increases or decreases the size of the rows and columns after loading. The sheet automatically resizes after the user pastes more data than the current sheet size allows for and exposes flexible behavior when the user adds or deletes columns and rows from the toolbar.

> If you delete rows or columns within a sheet, the sheet may lose data. If a row or column is deleted either by using the `resize` method or by using the **Delete Row** or **Delete Column** tool, it will be removed even if it contains data. 


## Using the resize Method

If the count of the rows or columns is programmatically set through the `resize` method, the user cannot revert the applied changes through the **Undo** or **Redo** toolbar options. In this case, **Undo** and **Redo** will take effect only if the user changes the number of the rows or columns with the **Insert New Row** or **Insert New Column**, or with **Delete Row** or **Delete Column** options.

The example below demonstrates how to set the count of the rows and columns in the current active sheet by using the [`resize`](/api/javascript/spreadsheet/sheet/methods/resize) method. 

```dojo
<div id="spreadsheet"></div>
<script>
    $("#spreadsheet").kendoSpreadsheet({
		sheets: [{                
		    rows: [{                
				cells: [{
				    value: "My Company"
				}]
		    }],
		},{                
		   name: "Second Sheet"
		}]           
    });

    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
    var sheet = spreadsheet.activeSheet();
    sheet.resize(25, 5); //there will be 25 rows and 5 columns in the sheet
</script>
```

## New vs. Old Behavior

The implementation of the `resize` method changes aspects of the Spreadsheet behavior in the following way: 

- **Insert New Row** and **Insert New Column** options&mdash;The new functionality allows the user to insert a new row or column in the current sheet, and to increase the number of the initially configured rows or columns. This is possible even if the last row or column in the sheet contains data. 

  For versions prior to R1 2022 SP2, if the user inserted rows or columns, the data in the sheet would be shifted, but the number of rows or columns would remain the same. The user was not allowed to insert a new row or column in the sheet if the last row or column contained data because of possible data loss. 

- **Delete Row** and **Delete Column** options&mdash;Now the user can delete rows or columns by right-clicking the row or column and showing the context menu. Also, the user can decrease the rows or columns in the currently active sheet by using the **Delete Row** or **Delete Column** options. 

  For versions prior to R1 2022 SP2, the cells were deleted but the sheet size remained the same.

- **Resizing on pasting data**&mdash;Currently, when the user pastes more data than the current sheet size allows for, the sheet will automatically add new rows or columns. 

  Versions prior to R1 2022 SP2 do not support such behavior. In similar cases, the Spreadsheet displayed a dialog with the "Cannot paste, because the copy area and the paste area are not the same size and shape." message.


## See Also

* [Spreadsheet Resize Sheet Demo](https://demos.telerik.com/kendo-ui/spreadsheet/resize)
* [Spreadsheet JavaScript API Reference](/api/javascript/ui/spreadsheet)
