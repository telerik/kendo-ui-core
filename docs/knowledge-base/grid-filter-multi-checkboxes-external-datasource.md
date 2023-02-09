---
title: Filter Multi Checkboxes Based on Previous Filters in Grid
description: Learn how to display the valid possibilities in the multi-checkboxes filter list based on the previous filters in the Kendo UI Grid.
type: how-to
page_title: Make Multi Checkboxes Filter Display Valid Possibilities Only - Kendo UI Grid for jQuery
slug: grid-filter-multi-checkboxes-external-datasource
tags: grid, filter, multi, checkboxes, datasource
ticketid: 1138899
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
  <td>Updated with the 2021.3.914 version</td>
 </tr>
</table>

## Description

How can I display only the valid possibilities in the multi-checkbox filter based on the previously applied filters in the Kendo UI Grid?

## Solution

Use an external Kendo UI dataSource and assign it both to the [Grid](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/datasource) and the [filters](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.filterable.datasource).

```dojo
<script src="https://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>
<div id="example">
    <div id="grid"></div>
      <script>
        $(document).ready(function() {

          function removeDuplicates(items, field) {
            if(field.indexOf(".") > 0){
              field = field.substring(0, field.indexOf("."));
            }
            var getter = function(item){return item[field]},
                result = [],
                index = 0,
                seen = {};

            while (index < items.length) {
              var item = items[index++],
                  text = getter(item);
              if(field === "Category"){
                text = text.CategoryName;
              }

              if(text !== undefined && text !== null && !seen.hasOwnProperty(text)){
                result.push(item);
                seen[text] = true;
              }
            }
						
            return result;
          }

          var filterSource = new kendo.data.DataSource({
            data: products
          });

          $("#grid").kendoGrid({
            dataSource: {
              data: products,
              schema: {
                model: {
                  fields: {
                    ProductName: { type: "string"},
                    UnitPrice: { type: "number" },
                    UnitsInStock: { type: "number" },
                    Discontinued: { type: "boolean" },
                    Category: {
                      defaultValue: {
                        CategoryID: 0,
                        CategoryName: ""
                      }
                    },
                  }
                }
              },
              pageSize: 20,
              change: function(e) {
                filterSource.data(e.items);
              },
            },
            height: 550,
            scrollable: true,
            sortable: true,
            pageable: {
              input: true,
              numeric: false
            },
            filterable: true,
            filterMenuInit: function (e){
              var grid = e.sender;
              e.container.data("kendoPopup").bind("open", function() {

                filterSource.sort({field: e.field, dir: "asc"});
                
                
                var filter = e.sender.dataSource.filter();
                
                var query = new kendo.data.Query(grid.dataSource.data());
								var data = query.filter(filter).data;
                
                var uniqueDsResult = removeDuplicates(data, e.field);
								
                
                filterSource.data(uniqueDsResult);
                
                
              })
            },
            columns: [
              {
                field: "Category.CategoryName",               
                title: "Category",             
                filterable: { multi: true, search: true, required: true, dataSource: filterSource },
              },
              {field: "ProductName", filterable: {
                multi: true,
                dataSource: filterSource
              }
              },
              { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: "130px",filterable: {
                multi: true,
                dataSource: filterSource
              } },
              { field: "UnitsInStock", title: "Units In Stock", width: "130px",filterable: {
                multi: true,
                dataSource: filterSource
              } },
              { field: "Discontinued", width: "130px"}
            ]
          });
        });
      </script>
</div>
```
