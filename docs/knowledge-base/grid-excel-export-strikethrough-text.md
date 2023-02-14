---
title: Export Strikethrough Text to Excel
page_title: Export Strikethrough Text to Excel - Kendo UI Grid for jQuery
description: "An example demonstrating how to export cell values that have a strikethrough decoration."
type: how-to
slug: grid-excel-export-strikethrough-text
tags: grid, excel, export, text, decoration, strike, strikethrough
res_type: kb
---

## Environment

<table>
	<tr>
		<td>Product Version</td>
		<td>2022.1.119</td>
	</tr>
	<tr>
		<td>Product</td>
		<td>Progress® Kendo UI® Grid for jQuery</td>
	</tr>
</table>

## Description

Certain values in my Grid have a strikethrough decoration applied with the `<s></s>` HTML tag. When the Grid is exported to Excel, the text decoration is missing. How can I export the text without losing the strikethrough?

## Solution

> This approach appends a unicode character to the value of the cell. The exported text isn't just decorated, the strikethrough will be a part of the cell value.

1. Use a [`template`](/api/javascript/ui/grid/configuration/columns.template) to render the strikethrough text in the Grid.
1. Handle the [`excelExport`](/api/javascript/ui/grid/events/excelexport) event of the Grid.
1. Inside the `excelExport` event, generate an HTML string by using the template.
1. Use a Regular expression to find if the cell value has the `<s></s>` tags.
1. Append the `\u0336` unicode character before each character of the value.
1. Update the cell value with the strikethrough text.

```dojo
    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        toolbar: ["excel"],
        excel: {
          allPages: true
        },
        columns: [
          { field: "ProductName", title: "Product Name" },
          { field: "UnitPrice", title: "Price", template: '#= UnitPrice % 2 ? "<s>"+UnitPrice+"</s>" : UnitPrice #' }
        ],
        pageable: true,
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/kendo-ui/service/products",
              dataType: "jsonp"
            }
          },
          pageSize: 10
        },
        excelExport: function(e) {
          var element = document.createElement('div');
          var sheet = e.workbook.sheets[0];
          var template = kendo.template(this.columns[1].template);

          for (var i = 1; i < sheet.rows.length; i++) {
            var row = sheet.rows[i];

            var dataItem = {
              UnitPrice: row.cells[1].value
            };

            element.innerHTML = template(dataItem);
            // Find Grid values in the Price column that are between <s></s> tags.
            let strikeMatch = element.innerHTML.match(/<s>(.*?)<\/s>/);
            if(strikeMatch) {
              // Create a strikethrough text.
              let strike = strikeThrough(strikeMatch[1]);
              // Update the cell value.
              row.cells[1].value = strike;
            }
          }
        }
      });

      function strikeThrough(text) {
        return text.split("").map(function(char) {
          return "\u0336" + char;
        }).join("");
      }
    </script>
```