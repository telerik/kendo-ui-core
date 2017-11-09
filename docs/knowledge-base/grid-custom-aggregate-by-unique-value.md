---
title: Calculate Custom Aggregates By Unique Value in Kendo UI Grid
description: An example for displaying custom aggregate result in Grid
type: how-to
page_title: Calculating and Displaying Custom Aggregate Result in Kendo UI Grid
slug: grid-custom-aggregate-by-unique-value
tags: kendoui, kendo, aggregates, custom aggregates
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

How to display the count of each unique value in the current view as custom aggregate? 

## Solution

The easiest way for achieving such requirement would be to create a wrapping element with specific selector in the footer or groupFooter template and within the __dataBound__ event of the Grid, go through the __view__ or the __data__ collection for the custom calculations and finally, manually populate the element in the template.

```html
<div id="example">
    <div id="grid"></div>
    <script>
        $(document).ready(function () {
            $("#grid").kendoGrid({
                dataSource: {
                    type: "odata",
                    transport: {
                        read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers"
                    },
                    pageSize: 5
                },
                height: 550,
                groupable: true,
                sortable: true,
                dataBound: function(e){
                  var items = e.sender.items();
                  var summary = {};
                  items.each(function(){
                    var dataItem = e.sender.dataItem(this);
                    if(!summary[dataItem.ContactTitle]){
                      summary[dataItem.ContactTitle] = 1;
                    }
                    else{
                      summary[dataItem.ContactTitle] ++;
                    }                    
                  })
                  
                  var wrapper = e.sender.element.find(".summaryWrapper");
                  for (var prop in summary) {
                    wrapper.append("<div>"+ prop + "total: "+summary[prop]+"</div>");
                  }
                },
                pageable: {
                    refresh: true,
                    pageSizes: true,
                    buttonCount: 5
                },
                columns: [{                    
                    field: "ContactTitle",
                    title: "Contact Title",
                  footerTemplate: "<div class='summaryWrapper'></div>"
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
