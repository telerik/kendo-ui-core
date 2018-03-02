---
title: Client-side Virtualization in Kendo DropDownlist
description: An example on client-side virtualization in Kendo DropDownlist
type: how-to
page_title: Client-side Virtualization | Kendo UI DropDownList 
slug: dropdownlist-client-side-virtualization
tags: dropdownlist, virtualization
ticketid: 1150272  
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI DropDownList</td>
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

How to create client-side virtualization in Kendo DropDownList?

## Solution

Based on the index of the currently selected value, the indexes of the next items, that should be rendered are calculated.

```html
<input id="orders" style="width: 100%;" />
<script>
    var data = []; 
    
    for(var i = 0; i < 20000; i++) {
      data.push({ ShipName: "Name " + (i + 1), OrderID: i + 1});
    }       
    
    $("#orders").kendoDropDownList({
      value: 15000,         
      dataTextField: "ShipName",
      dataValueField: "OrderID",
      filter: "contains",
      virtual: {
        itemHeight: 26,
        valueMapper: function(options) {
          var values = convertValues(options.value);
          var indices = [];
          if (values && values.length > 0) {
            for(var j = 0; j < data.length; j ++){
              var order = data[j];
              if (values.indexOf(order.OrderID) > -1) {
                indices.push(j);
              }
            }
          }
          options.success(indices);
        }
      },
      height: 290,
      dataSource: {
        data: data,
        schema: {
          model: {
            fields: {
              OrderID: { type: "number" },
              ShipName: { type: "string" }
            }
          }
        },
        pageSize: 80
      }
    });
    
    function convertValues(value) {
      var data = [];
      value = $.isArray(value) ? value : [value];
      for (var idx = 0; idx < value.length; idx++) {
        data.push(value[idx]);
      }
      return data;
    }  
</script> 
```
