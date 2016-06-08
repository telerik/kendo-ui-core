---
title: Update Aggregates on Change
page_title: Update Aggregates on Change | Kendo UI Grid Widget
description: "Learn how to update the aggregates shown by the Kendo UI Grid when a value is changed."
slug: howto_update_aggregatesonchange_grid
---

# Update Aggregates on Change

The example below demonstrates how to re-draw only the grid footer and the group footers, so that the new aggregates are shown without rebinding the entire grid. Note that a full refresh are required upon changing the group fields.

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

## See Also

Other articles on the Kendo UI Grid and how-to examples:

* [JavaScript API Reference](/api/javascript/ui/grid)
* [How to Add Cascading DropDownList Editors]({% slug howto_add_cascading_dropdown_list_editors_grid %})
* [How to Copy Data from Excel]({% slug howto_copy_datafrom_excel_grid %})
* [How to Drag and Drop Rows between Grids]({% slug howto_dragand_drop_rows_between_twogrids_grid %})
* [How to Enable ForeignKey Column Sorting by Text]({% slug howto_enable_foreignkey_sotringby_text_grid %})
* [How to Filter Array Columns Using MultiSelect]({% slug howto_filetr_array_columns_using_multiselect_grid %})
* [How to Implement Stable Sort in Chrome]({% slug howto_implement_stable_sortin_chrome_grid %})
* [How to Initialize Data Attribute with Detail Template]({% slug howto_initialize_data_attributewith_detail_template_grid %})
* [How to Load and Append More Records While Scrolling Down]({% slug howto_loadand_append_morerecords_while_scrollingdown_grid %})
* [How to Perform CRUD Operations with Local Storage Data]({% slug howto_perform_crud_operationswith_local_storage_data_grid %})
* [How to Persist Expanded Rows after Refresh]({% slug howto_persist_expanded_rows_afetrrefresh_grid %})
* [How to Set Cell Color Based on ForeignKey Values]({% slug howto_set_cell_color_basedon_foreignkey_values_grid %})
* [How to Show Tooltip for Column Records]({% slug howto_show_tooltipfor_column_records_grid %})
* [How to Update Toolbar Content Using MVVM Binding]({% slug howto_update_toolbar_content_using_mvvmbinding_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_create_custom_editors_grid %}).
