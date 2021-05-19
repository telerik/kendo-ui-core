---
title: Display Frozen Rows in Grids
description: An example on how to display frozen rows in a Kendo UI Grid based on a value from the model.
type: how-to
page_title: Freeze Rows | Kendo UI Grid for jQuery
slug: grid-frozen-rows
tags: grid, frozen rows, frozen, row, data item, model, freeze, unfreeze, pin, unpin, dynamically
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
  <td>Progress Kendo UI version</td>
  <td>2017.3.913</td>
 </tr>
</table>

## Description

How can I display frozen rows in a Kendo UI Grid based on a condition or a value from the model?

## Solution 1

If you only want to display particular rows at the top of the Grid, even after scrolling:

1. Clone the rendered records.
1. Append the rendered records to the header of the Grid.

The following example demonstrates the full implementation of this approach and uses a value from the model to determine whether or not to add the records to the header.

```dojo
	<style>
		.customHeaderRowStyles td{
			background: #bde0ed!important;
			background-image: none;
		}
	</style>
<div id="example">
    <div id="grid"></div>
    <script>
    	$(document).ready(function () {
    		$("#grid").kendoGrid({
    			dataSource: {
    				type: "odata",
    				transport: {
    					read: "//demos.telerik.com/kendo-ui/service/Northwind.svc/Customers"
    				},
    				pageSize: 20
    			},
    			height: 350,
    			sortable: true,
    			dataBound: function (e) {
    				e.sender.element.find(".customHeaderRowStyles").remove();
            var items = e.sender.items();
            e.sender.element.height(e.sender.options.height);   
            items.each(function(){
              var row = $(this);
              var dataItem = e.sender.dataItem(row);
              if(dataItem.ContactTitle == "Marketing Manager"){
                  var item = row.clone();                
                  item.addClass("customHeaderRowStyles");
                  var thead = e.sender.element.find(".k-grid-header table thead");
                  thead.append(item);
                	e.sender.element.height(e.sender.element.height() + row.height());                
                  row.hide();
              }
            })

    			},
    			pageable: {
    				refresh: true,
    				pageSizes: true,
    				buttonCount: 5
    			},
    			columns: [{    				
    				field: "ContactName",
    				title: "Contact Name",
    				width: 240
    			}, {
    				field: "ContactTitle",
    				title: "Contact Title"
    			}, {
    				field: "CompanyName",
    				title: "Company Name"
    			}, {
    				field: "Country",
    				width: 150
    			}]
    		});
    	});
    </script>
</div>
```

## Solution 2

To dynamically pin and unpin / freeze and unfreeze rows you can:

1. Create a context menu over the grid rows
1. On `select` pin or unpin the item from the `thead` 

```dojo
	<style>
      .customHeaderRowStyles td{
        background: #bde0ed!important;
        color:black;
        background-image: none;
      }
    </style>
    <script src="https://demos.telerik.com/kendo-ui/content/shared/js/people.js"></script>

    <div id="example">
      <h4>Use the Kendo UI ContextMenu over the grid rows to pin and unpin rows on the fly</h4>
      <div id="grid"></div>
      <ul id="context-menu">
        <li id="pin">Pin to top</li>
        <li id="unPin">Unpin</li>
      </ul>
      <script>
          var grid = $("#grid").kendoGrid({
            dataSource: {
              data: createRandomData(100),
              pageSize: 30,
              schema: {
                model: {
                  id: "Id",
                  fields: {
                    FirstName: { type: "string" },
                    LastName: { type: "string" },
                    City: { type: "string" },
                    Age: { type: "number" },
                    BirthDate: { type: "date" }
                  }
                }
              }
            },
            height: 500,
            selectable: true,
            pageable:true,
            persistSelection:true,
            navigatable: true,
            columns: [ {
              field: "FirstName",
              width: 120,
              title: "First Name"
            } , {
              field: "LastName",
              width: 120,
              title: "Last Name"
            } , {
              width: 120,
              field: "City"
            } , {
              field: "BirthDate",
              title: "Birth Date",
              template: '#= kendo.toString(BirthDate,"dd MMMM yyyy") #'
            } , {
              width: 80,
              field: "Age"
            }]
          }).data("kendoGrid");

          $("#context-menu").kendoContextMenu({
            target: "#grid",
            filter: "td",
            select: function(e) {
              var selectedMenuItem = e.item.id;
              var row = $(e.target).closest("tr");
              grid.element.height(grid.options.height);  
              var thead = grid.element.find(".k-grid-header table thead");

              switch (selectedMenuItem) {
                case "pin":
                  var item = row.clone();                
                  item.addClass("customHeaderRowStyles");
                  thead.append(item);
                  grid.element.height(grid.element.height() + row.height());                
                  row.hide();
                  break;
                case "unPin":
                  if(row.parent().is("thead")){
                    var rowUid = row.data("uid");
                    grid.element.height(grid.element.height() - row.height()); 
                    row.remove();
                    $("tr[data-uid='" + rowUid + "' ]").show();
                  }
                  break;                
                default:
                  break;
              };
            }
          });
      </script>      
    </div>
```