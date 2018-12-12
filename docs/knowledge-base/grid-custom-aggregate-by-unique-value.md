---
title: Calculate Custom Aggregates by Unique Value in Grid
description: An example on how to display custom aggregate results in a Kendo UI Grid.
type: how-to
page_title: Calculate and Display Custom Aggregate Results | Kendo UI Grid
slug: grid-custom-aggregate-by-unique-value
tags: kendoui, kendo, aggregates, custom aggregates
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

How can I display the count of each unique value in the current view of the Grid as custom aggregate?

## Solution

1. Create a wrapping element with a specific selector in the footer or in the `groupFooter` template.
1. Within the `dataBound` event of the Grid, go through the `view` or the `data` collection for the custom calculations.
1. Manually populate the element in the template.

```dojo
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
