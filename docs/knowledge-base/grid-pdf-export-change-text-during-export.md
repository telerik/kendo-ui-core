---
title: Export Grid PDF with Custom Text for Some Columns
description: Learn how to include special content to be exported to PDF as column template of the Grid
type: how-to
page_title: Change the value of grid data in PDF Export | Kendo UI Grid
slug: grid-pdf-export-change-text-during-export
position: 
tags: grid, pdf, export, change, value, only, hidden, content, column, data, template
ticketid: 1430735
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product Version</td>
			<td>2019.3.917</td>
		</tr>
		<tr>
			<td>Product</td>
			<td>Grid for Progress® Kendo UI®</td>
		</tr>
	</tbody>
</table>


## Description

How I can change the value before export of grid data to PDF?

I have a checkbox, and I need to change the format, I want to write YES/NO for checkboxes.
Is it possible to change PDF export to say Yes / No for check-boxes?

## Solution

The Kendo UI PDF export adds a [special class during the export](/framework/drawing/pdf-output/custom-appearance#using-the) so you can use that to your advantage in the following way:

1. In the template column, add a span with the Yes/No text (the [Kendo Template syntax](/framework/templates/overview) can be used for that) and a class name of your choice

    ```
        { 
            template: '#=dirtyField(data,"Discontinued")#<input type="checkbox" #= Discontinued ?   \'checked="checked"\' : "" # class="chkbx" /><span class="export-text">#= Discontinued ? "Yes": "No"#</   span>',
            width: 110
        }
    ```
    
1. Add a CSS rule that this element with your chosen class should be hidden
1. Add another CSS rule that when the `.k-pdf-export` class is added, the element with the text should be visible and the checkbox should be hidden

    ```
        <style>
            .k-pdf-export input.chkbx, .export-text  {
              display:none;
            }
            .k-pdf-export .export-text {
              display:inline;
            }
        </style>
    ```

```dojo
    <style>
    .k-pdf-export input.chkbx, .export-text  {
      display:none;
    }
    .k-pdf-export .export-text {
      display:inline;
    }
  </style>
   <div id="grid"></div>
    <script>
      var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service",
          dataSource = new kendo.data.DataSource({
            transport: {
              read:  {
                url: crudServiceBaseUrl + "/Products",
                dataType: "jsonp"
              },
              update: {
                url: crudServiceBaseUrl + "/Products/Update",
                dataType: "jsonp"
              },
              destroy: {
                url: crudServiceBaseUrl + "/Products/Destroy",
                dataType: "jsonp"
              },
              parameterMap: function(options, operation) {
                if (operation !== "read" && options.models) {
                  return {models: kendo.stringify(options.models)};
                }
              }
            },
            batch: true,
            pageSize: 20,
            schema: {
              model: {
                id: "ProductID",
                fields: {
                  ProductID: { editable: false, nullable: true },
                  ProductName: { validation: { required: true } },
                  UnitPrice: { type: "number", validation: { required: true, min: 1} },
                  Discontinued: { type: "boolean" },
                  UnitsInStock: { type: "number", validation: { min: 0, required: true } }
                }
              }
            }
          });

      $("#grid").kendoGrid({
        dataSource: dataSource,
        pageable: true,
        height: 430,
        toolbar: ["pdf"],
        columns: [
          "ProductName",
          { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: 110 },
          { field: "UnitsInStock", title: "Units In Stock", width: 110 },
          { template: '#=dirtyField(data,"Discontinued")#<input type="checkbox" #= Discontinued ? \'checked="checked"\' : "" # class="chkbx" /><span class="export-text">#= Discontinued ? "Yes": "No"#</span>', width: 110 },
          { command: "destroy", title: "&nbsp;", width: 100 }],
        editable: true
      });

      $("#grid .k-grid-content").on("change", "input.chkbx", function(e) {
        var grid = $("#grid").data("kendoGrid"),
            dataItem = grid.dataItem($(e.target).closest("tr"));

        dataItem.set("Discontinued", this.checked);
      });

      function dirtyField(data, fieldName){
        var hasClass = $("[data-uid=" + data.uid + "]").find(".k-dirty-cell").length < 1;
        if(data.dirty && data.dirtyFields[fieldName] && hasClass){
          return "<span class='k-dirty'></span>"
        }
        else{
          return "";
        }
      }
    </script>
```

