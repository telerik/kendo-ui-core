---
title: Auto-Scrolling to the Top Left Corner on Column Grouping in Kendo UI Grid
description: Learn how to automatically navigate to the first page and scroll to the top left corner of the Kendo UI Grid when a column is grouped.
type: how-to
page_title: How to Automatically Scroll to the Top Left Corner in Kendo UI Grid After Grouping a Column
slug: auto-scroll-top-left-kendo-grid-grouping
tags: kendo, ui, grid, autoscroll, grouping, javascript
res_type: kb
ticketid: 1664400
---

## Environment

| Product | Kendo UI for jQuery Grid / 2024.2.514 | 
| --- | --- |

## Description

I have a Kendo UI Grid with a large number of columns, for example, 35 columns. When I scroll horizontally to around the 20th field and drag and drop a column into the groupable area, the columns group correctly. However, I must manually scroll back to the left to see the grouped columns. I want the grid to automatically navigate to the first page and scroll to the top left corner when a column is grouped. 

This KB article also answers the following questions:
- How can I make the Kendo UI Grid scroll to the top left corner after grouping a column?
- Is there a way to automatically navigate to the first page in the Kendo UI Grid when grouping columns?
- Can the Kendo UI Grid auto-scroll to show the grouped columns immediately after grouping?

## Solution

To achieve auto-scrolling to the top left corner and navigate to the first page when a column is grouped in the Kendo UI Grid, you can handle the `group` event. In this event, you can call the `scrollLeft` method on the Grid's content to scroll to the left. Additionally, use the `page` method of the Grid's pager to navigate to the first page.

Here's a step-by-step guide to implementing this functionality:

1. Define the Kendo UI Grid and enable grouping.

2. Subscribe to the `group` event of the Grid.

3. In the event handler function, use the `scrollLeft` methods to scroll the content to the left.

4. Use the `page` method of the Grid's pager to navigate to the first page.

```dojo
<div id="grid"></div>
      <script>
        $(document).ready(function () {
          var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service",
              dataSource = new kendo.data.DataSource({
                transport: {
                  read: {
                    url: crudServiceBaseUrl + "/detailproducts",
                    dataType: "jsonp"
                  },
                  update: {
                    url: crudServiceBaseUrl + "/detailproducts/Update",
                    dataType: "jsonp"
                  },
                  destroy: {
                    url: crudServiceBaseUrl + "/detailproducts/Destroy",
                    dataType: "jsonp"
                  },
                  parameterMap: function (options, operation) {
                    if (operation !== "read" && options.models) {
                      return { models: kendo.stringify(options.models) };
                    }
                  }
                },
                batch: true,
                pageSize: 20,
                autoSync: true,
                aggregate: [{
                  field: "TotalSales",
                  aggregate: "sum"
                }],
                
                schema: {
                  model: {
                    id: "ProductID",
                    fields: {
                      ProductID: { editable: false, nullable: true },
                      Discontinued: { type: "boolean", editable: false },
                      TotalSales: { type: "number", editable: false },
                      TargetSales: { type: "number", editable: false },
                      LastSupply: { type: "date" },
                      UnitPrice: { type: "number" },
                      UnitsInStock: { type: "number" },
                      Category: {
                        defaultValue: {
                          CategoryID: 8,
                          CategoryName: "Seafood"
                        }
                      },
                      Country: {
                        defaultValue: {
                          CountryNameLong: "Bulgaria",
                          CountryNameShort: "bg"
                        }
                      }
                    }
                  }
                }
              });

          $("#grid").kendoGrid({
            group:function(e){
              if(e.groups.length > 0 ){
                setTimeout(function(){
                  e.sender.pager.page(1)
                  e.sender.element.find(".k-grid-content").scrollLeft(0);
                })

              }
            },
            dataSource: dataSource,
            columnMenu: {
              filterable: false
            },
            height: 680, 
            pageable: true, 
            groupable: true, 
            dataBound: onDataBound,
            
            columns: [{
              selectable: true,
              width: 75,
              attributes: {
                "class": "checkbox-align",
              },
              headerAttributes: {
                "class": "checkbox-align",
              }
            }, {
              field: "ProductName",
              title: "Product Name",
              template: "<div class='product-photo' style='background-image: url(../content/web/foods/#:data.ProductID#.jpg);'></div><div class='product-name'>#: ProductName #</div>",
              width: 300
            }, {
              field: "UnitPrice",
              title: "Price",
              format: "{0:c}",
              width: 105
            }, {
              field: "Discontinued",
              title: "In Stock",
              template: "<span id='badge_#=ProductID#' class='badgeTemplate'></span>",
              width: 130,
            }, {
              field: "CustomerRating",
              title: "Rating",
              template: "<input id='rating_#=ProductID#' data-bind='value: CustomerRating' class='rating'/>",
              editable: returnFalse,
              width: 200
            }, {
              field: "UnitsInStock",
              title: "Units",
              width: 105
            }, {
              field: "TotalSales",
              title: "Total Sales",
              format: "{0:c}",
              width: 140,
              aggregates: ["sum"],
            }, {
              field: "TargetSales",
              title: "Target Sales",
              format: "{0:c}",
             
              width: 220
            },
             ],
          });
        });

        function onDataBound(e) {
          var grid = this;
          grid.table.find("tr").each(function () {
            var dataItem = grid.dataItem(this);
            var themeColor = dataItem.Discontinued ? 'success' : 'error';
            var text = dataItem.Discontinued ? 'available' : 'not available';

            
            $(this).find(".rating").kendoRating({
              min: 1,
              max: 5,
              label: false,
              value: dataItem.CustomerRating,
              selection: "continuous"
            });

           
            kendo.bind($(this), dataItem);
          });
        }

        function returnFalse() {
          return false;
        }     
      </script>
```


## Notes

- The `setTimeout` function is used to defer the execution of the scroll and page navigation. This ensures that the DOM has been updated following the group operation.
- You may need to adjust the timing (currently set to `100` milliseconds) based on your specific requirements or the performance of your application.

## See Also

- [Kendo UI Grid Documentation](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
- [Grid Grouping Documentation](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/groupable)
