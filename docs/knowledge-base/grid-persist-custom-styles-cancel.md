---
title: Persist Applied Custom Styles when Editing is Canceled in Grid
description: Learn how to persist the custom styles applied when the user decides to cancel the editing in the Kendo UI Grid.
type: how-to
page_title: Persist Applied Custom Styles when Editing is Canceled in Grid - Kendo UI for jQuery Grid
slug: grid-persist-custom-styles-cancel
tags: grid, cancel, persist, styles
ticketid: 1600921
res_type: kb
---

## Environment

<table>	
	<tr>
		<td>Product</td>
		<td>Progress® Kendo UI® Grid for jQuery</td>
	</tr>
</table>

## Description

If I set a custom background color on each row, based on specific rules it works great, except for when I try to edit the row and then decide to cancel the editing, by pressing the _`Cancel`_ button. When the editing mode is 'popup' or' inline' the applied custom styles disappear. 
How can I preserve the appearance even when the editing is canceled?

## Solution

The observed behavior is due to that the row re-renders once the _`Cancel`_ button is clicked, thus the classes added in the `databound` event handler are cleared. To have the same styles applied after the _`Cancel`_ button is clicked you can:
 
1. Handle the [`cancel`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/cancel) event of the Grid.
1. In the event handler, you can check if a custom class is applied, retrieve it and apply it again.

```dojo
    <style>
      .custom1{
        background-color: pink !important;
      }
      .custom2{
        background-color: lightblue !important;
      }
      .custom3{
        background-color: yellow !important;
      }
    </style>

    <div id="grid"></div>

    <script>
        $(document).ready(function () {
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
                  create: {
                    url: crudServiceBaseUrl + "/Products/Create",
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
            height: 550,
            dataBound: function(e){
              var grid = e.sender;
              for (var j = 0; j < grid.tbody.children().length; j++)
              {            
                var row = $(grid.tbody.children()[j]);
                $(row).addClass('custom'+j)            
              }
            },
            cancel: function(e) {
              var classes = $('tr[data-uid="'+e.model.uid+'"]').attr('class').split(' ').length;
              var lastClass = $('tr[data-uid="'+e.model.uid+'"]').attr('class').split(' ').pop();
              setTimeout(function(){
                $('tr[data-uid="'+e.model.uid+'"]').addClass(lastClass)
              })
            },
            toolbar: ["create"],
            columns: [
              { field:"ProductName", title: "Product Name" },
              { field: "UnitPrice", title:"Unit Price", format: "{0:c}", width: "120px" },
              { field: "UnitsInStock", title:"Units In Stock", width: "120px" },
              { field: "Discontinued", width: "120px"},
              { command: ["edit", "destroy"], title: "&nbsp;", width: "250px" }],
            editable: "popup"
          });
        });
    </script>
```
