---
title: Update aggregates on change
page_title: Update aggregates on change
description: "Learn how to update the aggregates shown by the grid when a value is changed"
---

# Use Nested Chart

The example below demonstrates how to redraw only the grid footer and the group footers so that the new aggregates are shown without rebinding the entire grid. Note that a full refresh will be required if the group fields can be changed. 

###### Example

```html

    <div id="grid"></div>
    <script>
      $(document).ready(function() {
        var categories = [{
          "value": 1,
          "text": "Beverages"
        },{
          "value": 2,
          "text": "Condiments"
        },{
          "value": 3,
          "text": "Confections"
        },{
          "value": 4,
          "text": "Dairy Products"
        },{
          "value": 5,
          "text": "Grains/Cereals"
        },{
          "value": 6,
          "text": "Meat/Poultry"
        },{
          "value": 7,
          "text": "Produce"
        },{
          "value": 8,
          "text": "Seafood"
        }];
        $("#grid").kendoGrid({
          dataSource: {
            type: "odata",
            transport: {
              read: "//demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
            },
            schema:{
              model: {
                fields: {                    
                  ProductName: { type: "string" },
                  UnitPrice: { type: "number" },
                  UnitsOnOrder: { type: "number" },
                  CategoryID: { type: "number" }
                }
              }
            },
            pageSize: 20,
            group: [{
              field: "CategoryID", aggregates: [
                { field: "UnitPrice", aggregate: "sum" }
              ],
            }, {
              field: "UnitsOnOrder", aggregates: [
                { field: "UnitPrice", aggregate: "sum" }
              ]
            }],
            aggregate: [{ field: "UnitPrice", aggregate: "sum" }],

            change: function (e) {
              if (e.field && e.action == "itemchange") {
                var grid = $("#grid").data("kendoGrid");
                var model = e.items[0];
                var groupFooterIndex = 0;
                var groupFooters = grid.tbody.children(".k-group-footer");                                    

                function updateGroupFooters(items) {
                  var updatedSubGroup;
                  var updatedElement;
                  for (var idx = 0; idx < items.length; idx++) {
                    var item = items[idx];
                    if (item.hasSubgroups) {
                      updatedSubGroup = updateGroupFooters(item.items);
                    }
                    if (updatedSubGroup || $.inArray(model, item.items) !== -1) {
                      updatedElement = true;                        
                      groupFooters.eq(groupFooterIndex).replaceWith(grid.groupFooterTemplate(item.aggregates));
                    }
                    groupFooterIndex++;                    
                  }
                  return updatedElement;
                }  

                updateGroupFooters(this.view());

                grid.footer.find(".k-footer-template").replaceWith(grid.footerTemplate(this.aggregates()));
              }
            }
          },
          editable: true,
          sortable: true,
          scrollable: false,
          pageable: true,
          columns: [
            {field: "CategoryID", title: "Category", values: categories, hidden: true},
            { field: "ProductName", title: "Product Name" },

            { field: "UnitPrice", title: "Unit Price", aggregates: ["sum"], footerTemplate: "Sum: #=sum#",
             groupFooterTemplate: "Sum: #=sum#" }           
          ]
        });
      });
    </script>

```