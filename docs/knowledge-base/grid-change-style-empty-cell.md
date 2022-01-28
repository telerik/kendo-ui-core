---
title: Change the CSS of an Empty Cell
description: An example describing how to style a Kendo UI Grid cell which has no value.
type: how-to
page_title: Style Cell with No Text | Kendo UI Grid
slug: grid-change-style-empty-cell
position: 
tags: grid, cell, empty, null, style, css
ticketid: 1438929
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
How can I change the style of a cell such as the background color in my Kendo UI Grid if the grid cell is null or empty?

## Solution
Add a class to the specific column using the [columns.attributes property](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.attributes).  Then, during the [DataBound event](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/databound), reference all DOM row elements in the Kendo UI Grid using the [items method](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/items), and check the [text](https://api.jquery.com/text/) of the `td` element.

```dojo
    <style>
      .noValue {
        background-color: red;
      }
    </style>

    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        dataBound: function(e){
          //get all DOM row elements
          var allRows = e.sender.items();   

          //for each row, find the td with the class
          allRows.each(function (index, row) {  
            var nameCell = $(this).find("td.name");

            //check the value of the cell
            if (!nameCell.text()) {  
              
              //add specific style class
              nameCell.addClass("noValue")  
            }
          });
        },
        columns: [
          { 
            field: "name", 
            attributes:{
              "class" : "name" 
            }
          },
          { 
            field: "age", 
            attributes:{
              "class" : "age"
            }
          },
          { 
            field: "custom", 
            attributes:{
              "class" : "custom"
            } 
          }
        ],
        dataSource: [
          { name: "Jane Doe", age: 30, custom: 'abc' },
          { name: "John Doe", age: 33, custom: 'def' },
          { age: 36, custom: 'ghi' }  //no name value
        ]
      });
    </script>
```

## See Also
* [columns.attributes property - Kendo UI Grid jQuery API](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.attributes)
* [dataBound event - Kendo UI Grid jQuery API](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/databound)
* [items method - Kendo UI Grid jQuery API](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/items)
* [text() - jQuery API](https://api.jquery.com/text/)
