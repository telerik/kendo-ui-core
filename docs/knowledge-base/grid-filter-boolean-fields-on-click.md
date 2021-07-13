---
title: Filter Boolean on Click
description: An example on how to filter Kendo UI Grid boolean fields on click of the radio button in the FilterMenu.
type: how-to
page_title: Filter Bool Columns on Click | Kendo UI Grid for jQuery
slug: grid-filter-boolean-fields-on-click
tags: grid, filter, bool, boolean, fields, on click, radio, radiobuttons
res_type: kb
---

## Environment

<table>
	<tr>
		<td>Created with Product Version</td>
		<td>2016.3.914</td>
	</tr>
	<tr>
		<td>Product</td>
		<td>Progress Kendo UI Grid</td>
	</tr>
</table>

## Description

How can I filter a boolean column on click of the radio button without the need to press the filter button?

## Solution

1. Add a [`filterMenuInit`](/api/javascript/ui/grid/events/filtermenuinit) event handler.
1. Check if the field for which the event was triggered is the boolean field
1. Attach a click handler to the radio buttons
1. Programmatically apply the filter using the dataSource [`filter()`](/api/javascript/data/datasource/methods/filter) method.

```
    filterMenuInit: function(e){
        var dataSource = this.dataSource;

        if(e.field == "isAdmin"){
            var radioButtons = e.container.find("input[type=radio]");
            radioButtons.click(function(e){
                var boolFilter;
                if(e.target.value === "false"){
                    boolFilter = false;
                } else{
                    boolFilter = true;
                }
                dataSource.filter({field: "isAdmin",operator: "eq", value: boolFilter });
            })
        }
    }
```

```dojo
    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        filterMenuInit: function(e){
          var dataSource = this.dataSource;

          if(e.field == "isAdmin"){
            var radioButtons = e.container.find("input[type=radio]");
            radioButtons.click(function(e){
              var boolFilter;
              if(e.target.value === "false"){
                boolFilter = false;
              } else{
                boolFilter = true;
              }
              dataSource.filter({field: "isAdmin",operator: "eq", value: boolFilter });
            })
          }
        },
        columns: [
          { field: "name" },
          { field: "age" },
          { field: "isAdmin", title: "Admin", template: "#=isAdmin? 'Yes' : 'No'#"}
        ],
        filterable: true,
        dataSource:{
          data:[
            { name: "Jane Doe", age: 30, isAdmin: false },
            { name: "John Doe", age: 33 , isAdmin: false},
            { name: "Connor Wild", age: 30, isAdmin: true },
            { name: "Sasha Johnson", age: 33 , isAdmin: true}
          ],
          schema:{
            model:{
              fields:{
                isAdmin:{type: 'boolean'}
              }
            }
          }
        }
      });
    </script>
```
