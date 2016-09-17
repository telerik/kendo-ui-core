---
title: AutoComplete Filter By Current View
page_title: AutoComplete Filter By Current View | Kendo UI Grid
description: "Learn how to filter the Kendo UI Grid with the AutoComplete by showing results from the current view."
previous_url: /controls/data-management/grid/how-to/autocomplete-filter-by-current-view.html
slug: howto_autocomplete_filter_by_current_view
---

# AutoComplete Filter By Current View

Generally, the autocomplete filter of the grid is bound to the whole data source of the grid. You can, however, show autocomplete results only for the current grid view by following the steps below:


* Attach a click handler to the autocomplete filter in the grid's [dataBound event](/api/javascript/ui/grid#events-dataBound).
* Get the grid's [data source view](/api/javascript/data/datasource.html#methods-view) in the click handler and set it as a  data source to the autocomplete filter.

The example below demonstrates how to filter the Kendo UI Grid via the autocomplete according to the current view. 

###### Example

```html
    <div id="grid"></div>
    <script>
    function attachFilterClickHandler(e){
      $(".k-autocomplete input").on("click", filterAutoCompleteDataSource(e.sender));
    }
    function filterAutoCompleteDataSource(grid){
      var currentData = grid.dataSource.view();
      $(".k-autocomplete input").data("kendoAutoComplete").setDataSource(currentData);
    }

    $(document).ready(function() {                                 
      $("#grid").kendoGrid({
        dataSource: {
          type: "odata",
          transport: {
            read: "//demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
          },
          schema: {
            model: {
              fields: {
                OrderID: { type: "number" },
                Freight: { type: "number" },
                ShipName: { type: "string" },
                OrderDate: { type: "date" },
                ShipCity: { type: "string" }
              }
            }
          },
          pageSize: 20,
          serverPaging: true,
          serverFiltering: true,
        },
        dataBound: attachFilterClickHandler,
        height: 550,
        filterable: {
          mode: "row"
        },
        pageable: true,
        columns: 
        [{
          field: "OrderID",
          width: 225,
          filterable: {
            cell: {
              showOperators: false
            }
          }
        },
         {
           field: "ShipName",
           width: 500,
           title: "Ship Name",
           filterable: {
             cell: {
               operator: "contains"
             }
           }
         },{
           field: "Freight",
           width: 255,
           filterable: {
             cell: {
               operator: "gte"
             }
           }
         },{
           field: "OrderDate",
           title: "Order Date",
           format: "{0:MM/dd/yyyy}"
         }]
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
* [How to Implement Stable Sort in Chrome]({% slug howto_implement_stable_sortin_chrome_grid %})
* [How to Initialize Data Attribute with Detail Template]({% slug howto_initialize_data_attributewith_detail_template_grid %})
* [How to Load and Append More Records While Scrolling Down]({% slug howto_loadand_append_morerecords_while_scrollingdown_grid %})
* [How to Perform CRUD Operations with Local Storage Data]({% slug howto_perform_crud_operationswith_local_storage_data_grid %})
* [How to Persist Expanded Rows after Refresh]({% slug howto_persist_expanded_rows_afetrrefresh_grid %})
* [How to Set Cell Color Based on ForeignKey Values]({% slug howto_set_cell_color_basedon_foreignkey_values_grid %})
* [How to Show Tooltip for Column Records]({% slug howto_show_tooltipfor_column_records_grid %})
* [How to Update Toolbar Content Using MVVM Binding]({% slug howto_update_toolbar_content_using_mvvmbinding_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_create_custom_editors_grid %}).
