---
title: Add Fonts to the Spreadsheet Fonts List
description: An example on how to add a font to the fonts DropDownList that is located in the toolbar of the Kendo UI Spreadsheet.
type: how-to
page_title: Add Fonts to the Fonts DropDownList | Kendo UI Spreadsheet for jQuery
slug: spreadsheet-add-font
tags: spreadsheet, font
ticketid: 1140766
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Spreadsheet</td>
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
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I add a font to the drop-down font list of the Spreadsheet?

## Solution

1. Reference the stylesheet of the font.
1. Set the list with the fonts to the reference of the DropDownList which contains the fonts.
1. Implement the `select` event of the widget.
1. Check the current selection and apply the selected font.

```dojo
    <div id="spreadsheet"></div>
    <script>
        $("#spreadsheet").kendoSpreadsheet({
            sheets: [{
                rows: [{
                    cells: [{ value: "A" }, { value: "B" }, { value: "C" }]
                }, {
                    cells: [{ value: "1" }, { value: "2" }, { value: "3" }]
                }, {
                    cells: [{ value: "4" }, { value: "5" }, { value: "6" }]
                }, {
                    cells: [{ value: "Lorem ipsum" },
                            { value: "sed do eiusmod" },
                            { value: "Ut enim ad minim" }]
                }]
            }],
            pdf: {
                area: "selection"
            }
        });

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

      	var ddls = $('.k-spreadsheet-toolbar [data-role="dropdownlist"]')[0];
      	var ddl = $(ddls).data("kendoDropDownList");
      	var dataSource = new kendo.data.DataSource({
  					data: [ "Arial", "Verdana", "Lobster" ]
				});
      	ddl.setDataSource(dataSource);

      	ddl.bind("select", onSelect);

      	function onSelect(e){        	
          	var fontName = e.item.text();
          	var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
    		var sheet = spreadsheet.activeSheet();    
          	var selection = sheet.selection();
    		selection.fontFamily(fontName);
        }       	
    </script>
```
