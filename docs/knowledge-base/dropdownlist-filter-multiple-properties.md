---
title: Filter by Multiple Properties in DropDownList
description: An example on how to filter by multiple properties in DropDownList
type: how-to
page_title: Filter by Multiple Properties | Kendo UI DropDownList
slug: dropdownlist-filter-multiple-properties
tags: dropdownlist
ticketid: 1138305
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

How to filter by multiple properties in Kendo UI DropDownList?

## Solution

Prevent the default behavior of the filtering event. Use the dataSource filter method, to apply the custom filtering.

```html
	<input id="customers" style="width: 100%;"/>            

    <script>
        $(document).ready(function() {
            $("#customers").kendoDropDownList({
                dataTextField: "ContactName",
                dataValueField: "CustomerID",
              	filter: "contains",
                template: `<h3>Name: #: data.ContactName #</h3>
              							<h4>ID: #: data.CustomerID #</h4>`,
                dataSource: {
                    transport: {
                        read: {
                            dataType: "jsonp",
                            url: "https://demos.telerik.com/kendo-ui/service/Customers",
                        }
                    }
                },
              	filtering: function(ev){
                	var filterValue = ev.filter.value;
                  ev.preventDefault();
                  
                  this.dataSource.filter({
                    logic: "or",
                    filters: [
                      {
                        field: "ContactName",
                        operator: "contains",
                        value: filterValue
                      },
                      {
                        field: "CustomerID",
                        operator: "contains",
                        value: filterValue
                      }
                    ]
                  });
                }
            });
        });
    </script>
```
