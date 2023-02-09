---
title: Restore filters applied through the Grid's UI when the Search input is cleared
description: An example demonstrating how to restore the filters applied through the Grid's UI when the search panel's value is cleared.
type: how-to
page_title: Grid restore filters when search input is cleared - Kendo UI Grid for jQuery
slug: grid-clear-search-restores-previously-applied-filters
tags: grid, search, input, panel, filters, clear, persist, restore
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for jQuery</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>2021.2.616</td>
 </tr>
</table>

## Description

When I clear the Grid's search panel, all of my filters are deleted. How can I restore the filters that I applied through the Grid's filter menu?

## Solution

Utilize the Grid's [`filter`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/filter) event and save the filters applied through the UI.

```dojo
    <div id="grid"></div>
    <script>
      	// Declare an empty array.
      	var savedFilters = [];
    
        $(document).ready(function () {
            $("#grid").kendoGrid({
                dataSource: {
                    type: "odata",
                    transport: {
                        read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers"
                    },
                    pageSize: 20
                },
              	filter: onFilter,
              	filterable: true,
                height: 550,
                toolbar: ["search"],
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

          // Define the filter event handler.
          function onFilter(e) {
            // Check if the filter exists.
            if(e.filter) {
              	setTimeout(function() {
                // Push the applied filter in the array.
              	savedFilters.push(e.filter);
            	}, 20);
            // If the filter doesn't exist in the event data, it has been removed through the Filter Menu.
            } else {
              let field = e.field;
              // Itterate over the array of saved filters.
              for(var i=0; i<savedFilters.length; i++) {
                let filters = savedFilters[i].filters;
                if(filters[0] && filters[0].field === field) {
                  // Remove the filter from the array of saved filters.
                  savedFilters.splice(i, 1);
                }
              }
            }
          }

          // Attach a handler to the input event of the search panel.
          $(".k-grid-search").on("input", function(e) {
            let inputValueLength = e.target.value.length;

            // Check if there are any saved filters and if the input has been cleared.
            if(savedFilters && inputValueLength === 0) {
             let grid = $("#grid").data("kendoGrid");
             setTimeout(function() {
               // Apply the saved filters after the input has been cleared.
               grid.dataSource.filter(savedFilters);
             }, 310);
            }
          })
        });
    </script>

    <style type="text/css">
        .k-grid .k-grid-search {
            margin-left: auto;
            margin-right: 0;
        }
    </style>
```