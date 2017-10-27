---
title: Spreadsheet .saveAsPDF and More Content in a Single PDF
description: Merge the Kendo Spreadsheet into the same file, where other parts of the page are combined.
type: how-to
page_title: Save Spreadsheet and Other Content to the Same PDF | Kendo UI Spreadsheet
slug: spreadsheet-save-with-additional-content-to-single-pdf
tags: spreadsheet,pdf,drawing,single-pdf
ticketid: 1135953 
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Spreadsheet</td>
 </tr>
</table>

## Description

I am able to combine different sections of the HTML page into a single PDF file, but I also need to merge the Kendo Spreadsheet into the same file.

## Solution

In order to achieve the desired you could use the *Spreadsheet.Sheet.draw()* method, which is internally used by the Spreadsheet PDF export:

```html
	<input type="button" id="btn" value="Export"/>
	<div id="Checklist">This is in Checklist</div>
	<div id="Init">
	  This is in Init
	  <span class="page-break"></span>
	  This is also in Init
	</div>
	<input id="Id" value="TEST"/>
	<div id="spreadsheet" style="width: 100%;"></div>
	<script>
	  $(function() {
		$("#spreadsheet").kendoSpreadsheet({
		  sheets: [
			{
			  name: "Food Order",
			  mergedCells: [
				"A1:G1",
				"C15:E15"
			  ],
			  rows: [
				{
				  height: 70,
				  cells: [
					{
					  index: 0, value: "Invoice #52 - 06/23/2015", fontSize: 32, background: "rgb(96,181,255)",
					  textAlign: "center", color: "white"
					}
				  ]
				},
				{
				  height: 25,
				  cells: [
					{
					  value: "ID", background: "rgb(167,214,255)", textAlign: "center", color: "rgb(0,62,117)"
					},
					{
					  value: "Product", background: "rgb(167,214,255)", textAlign: "center", color: "rgb(0,62,117)"
					},
					{
					  value: "Quantity", background: "rgb(167,214,255)", textAlign: "center", color: "rgb(0,62,117)"
					},
					{
					  value: "Price", background: "rgb(167,214,255)", textAlign: "center", color: "rgb(0,62,117)"
					},
					{
					  value: "Tax", background: "rgb(167,214,255)", textAlign: "center", color: "rgb(0,62,117)"
					},
					{
					  value: "Amount", background: "rgb(167,214,255)", textAlign: "center", color: "rgb(0,62,117)"
					},
					{
					  background: "rgb(167,214,255)", color: "rgb(0,62,117)"
					}
				  ]
				},
				{
				  cells: [
					{
					  value: 216321, textAlign: "center", background: "rgb(255,255,255)", color: "rgb(0,62,117)"
					},
					{
					  value: "Calzone", background: "rgb(255,255,255)", color: "rgb(0,62,117)"
					},
					{
					  value: 1, textAlign: "center", background: "rgb(255,255,255)", color: "rgb(0,62,117)"
					},
					{
					  value: 12.39, format: "$#,##0.00", background: "rgb(255,255,255)", color: "rgb(0,62,117)"
					},
					{
					  formula: "C3*D3*0.2", format: "$#,##0.00", background: "rgb(255,255,255)", color: "rgb(0,62,117)"
					},
					{
					  formula: "C3*D3+E3", format: "$#,##0.00", background: "rgb(255,255,255)", color: "rgb(0,62,117)"
					},
					{
					  background: "rgb(255,255,255)", color: "rgb(0,62,117)"
					}
				  ]
				},
				{
				  cells: [
					{
					  value: 546897, textAlign: "center", background: "rgb(229,243,255)", color: "rgb(0,62,117)"
					},
					{
					  value: "Margarita", background: "rgb(229,243,255)", color: "rgb(0,62,117)"
					},
					{
					  value: 2, textAlign: "center", background: "rgb(229,243,255)", color: "rgb(0,62,117)"
					},
					{
					  value: 8.79, format: "$#,##0.00", background: "rgb(229,243,255)", color: "rgb(0,62,117)"
					},
					{
					  formula: "C4*D4*0.2", format: "$#,##0.00", background: "rgb(229,243,255)", color: "rgb(0,62,117)"
					},
					{
					  formula: "C4*D4+E4", format: "$#,##0.00", background: "rgb(229,243,255)", color: "rgb(0,62,117)"
					},
					{
					  background: "rgb(229,243,255)", color: "rgb(0,62,117)"
					}
				  ]
				}
			  ]
			}
		  ]
		});
		$("#Id").kendoMaskedTextBox();
		$('#btn').on('click', function() {
		  var spreadsheet = jQuery("#spreadsheet").data("kendoSpreadsheet");
		  if (null != spreadsheet) {
			var currentSheet = spreadsheet.activeSheet();
			
			currentSheet.draw(function(spread){
			  kendo.drawing.drawDOM(jQuery("#Checklist")).done(function(header) {
				kendo.drawing.drawDOM("#Init", {
				  forcePageBreak: ".page-break"
				}).then(function(group){
				  group.children.unshift(header);
				  group.options.set("pdf.margin", "1cm");
				  
				  var length = spread.children.length;
                                  if (length > 0) {
	                            for (var i = 0; i < length; i ++) {
		                      var currentChild = spread.children[0];
                                      group.append(currentChild);
                                    }
                                  } else {
                                    group.append(spread);
                                  }
				  
				  return kendo.drawing.exportPDF(group);
				}).done(function(data) {
				  var d = new Date();
				  var name = jQuery("#Id").data("kendoMaskedTextBox").value();
				  name += "_";
				  name += kendo.toString(d, "yyyyMMddHHmmss");
				  name += ".pdf"; 
				  
				  kendo.saveAs({
					dataURI: data,
					fileName: name
				  });
				});
			  });
			});
		  }
		});
	  });
	</script>
```

## See Also

* [Kendo Spreadsheet API Reference](http://docs.telerik.com/kendo-ui/api/javascript/ui/spreadsheet)
* [Kendo Drawing Group API Reference](https://docs.telerik.com/kendo-ui/api/javascript/drawing/group)
* [Kendo Drawing API Reference](https://docs.telerik.com/kendo-ui/api/javascript/drawing)

