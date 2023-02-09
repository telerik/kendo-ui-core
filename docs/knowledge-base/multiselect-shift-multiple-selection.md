---
title: Select Multiple Items in MultiSelect by Holding Shift Key
description: Learn how to select multiple items by holding shift in MultiSelect.
type: how-to
page_title: Select Multiple Items in MultiSelect by Holding Shift Key - Kendo UI MultiSelect for jQuery
slug: multiselect-shift-multiple-selection
tags: multiselect, shift, multiple, selection
res_type: kb
ticketid: 1540791
component: multiselect
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® MultiSelect for jQuery</td>
 </tr> 
</table>

## Description

Is it possible to select multiple items with two clicks? How to select multiple items by holding shift key in MultiSelect?

## Solution

1. Subscribe to the text [`open`](https://docs.telerik.com/kendo-ui/api/javascript/ui/multiselect/events/open) event of the MultiSelect.
1. In the `open` event handler bind a click event listener to the items using the `k-list` class. 

```dojo
    <div class="demo-section k-content">
        <select id="required" multiple="multiple" data-placeholder="Select attendees...">
            <option>Steven White</option>
            <option>Nancy King</option>
            <option>Nancy Davolio</option>
            <option>Robert Davolio</option>
            <option>Michael Leverling</option>
            <option>Andrew Callahan</option>
            <option>Michael Suyama</option>
            <option selected>Anne King</option>
            <option>Laura Peacock</option>
            <option>Robert Fuller</option>
            <option>Janet White</option>
            <option>Nancy Leverling</option>
            <option>Robert Buchanan</option>
            <option>Margaret Buchanan</option>
            <option selected>Andrew Fuller</option>
            <option>Anne Davolio</option>
            <option>Andrew Suyama</option>
            <option>Nige Buchanan</option>
            <option>Laura Fuller</option>
        </select>
    </div>     
  
    <script>
        $(document).ready(function() {
            var startIndex;
            var endIndex;
            var dataItems = [];
            // create MultiSelect from select HTML element
            var required = $("#required").kendoMultiSelect({
              autoClose:false,
              open:function(e){
                $(".k-list").on("click", "li", function(e){
                  if(e.shiftKey === false){
                    var items = required.items();
                    for(let item of items){
                      if(item === e.target){
                        var dataItem = required.dataItem(item)
                        startIndex = required.dataSource.indexOf(dataItem);
                      }
                    }
                  } else {
                    var items = required.items();
                    for(let item of items){
                      if(item === e.target){
                        var dataItem = required.dataItem(item)
                        endIndex = required.dataSource.indexOf(dataItem);
                        if(endIndex < startIndex) {
                          var newEndIndex = startIndex;
                          startIndex = endIndex;
                          endIndex = newEndIndex;
                        }
                      }	
                    }
                    for(let i = startIndex; i <= endIndex; i++){
                      dataItems.push(required.dataItem(items[i]).value)
                    }
                    var values = required.value();
                    var newValue = values.concat(dataItems)
                    required.value(newValue);
                  }
                })
              }
          }).data("kendoMultiSelect");
        });
      </script>
```

## See Also

* [MultiSelect API Reference](/api/javascript/ui/multiselect)
