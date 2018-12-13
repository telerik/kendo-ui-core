---
title: Set Multi-Checkbox Filtering to Use contains instead of equalTo
description: An example on how to change the multi-checkbox filtering of the Kendo UI Grid to use contains instead of equalTo.
type: how-to
page_title: Set a Different dataSource for the Multi-Checkbox and contains Filter | Kendo UI Grid
slug: grid-how-to-change-multi-checkbox-filter-to-contains
tags: grid, filter, multi-checkbox, contains
ticketid: 1132412
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
</table>

## Description

A Grid column contains comma-delimited values (`AAA,BBB,CCC`) and uses checkboxes to perform filtering.

How can I set a checkbox for each unique value and filter the data by using `contains` instead of `equalTo`? For example:

```
AAA
BBB
CCC
```

## Solution

The built-in multi-checkbox filtering uses the data from the Grid and the values will match the entire field value.

To customize the filter:

1. Define a custom dataSource for the filter in the column with the unique values.

1. Within the `filter` event of the Grid, modify the filter expression and change them to `contains`.


```dojo
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
```
