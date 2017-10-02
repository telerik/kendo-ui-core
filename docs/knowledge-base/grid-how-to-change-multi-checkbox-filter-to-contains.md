---
title: How to Change Multi-Checkbox Filtering to use Contains Instead of EqualTo
description: Changing the multi-checkbox filtering to use Contains
type: how-to
page_title: Using different dataSource for the multi-checkbox filter and filter with Contains
slug: grid-how-to-change-multi-checkbox-filter-to-contains
tags: grid, filter, multi-checkbox, contains
ticketid: 1132412
res_type: kb
---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
</table>


## Description

I have a Grid with a column that contains commas delimited values.

For example:
````
AAA,BBB,CCC
````

The filtering for this column uses checkboxes.

I would like to have a checkbox for each unique value and filter with "_Contains_" instead of "_EqualTo_".

For example:
````
AAA
BBB
CCC
````

## Solution
  
Since the built-in multi-checkbox filtering will use the data from the Grid, the values will match the entire field value. For customizing the filter you could define custom dataSource for the filter in that column (_with the unique values_) and modify the filter expression to be changed to "__contains__" within the **filter** event of the Grid. This approach is demonstrated in the following example:


````html
<div id="grid"></div>
  
<script>
$("#grid").kendoGrid({
  filter: function(e){
    if(e.field == "someField"){
    	e.filter.filters.forEach(function(f){
        f.operator = "contains";
      })
    }
  },
  filterMenuOpen: function(e){
    if(e.sender.dataSource.filter()){
      e.sender.dataSource.filter().filters.forEach(function(f){
        if(f.field == "someField"){
          var checkbox = e.container.find("input[value='"+f.value+"']");
          if(!checkbox[0].checked){
          	e.container.find("input[value='"+f.value+"']").click()  
          }          
        }
      })
   }
  },
  columns: [ {
    field: "someField",
    filterable: {
        multi:true,
      dataSource: [ { someField: "AAA" }, { someField: "BBB" }, { someField: "CCC" } ]
    }
  } ],
  filterable: true,
    dataSource: [ { someField: "AAA, BBB" }, { someField: "CCC" } ]
  });
  
</script>
````

