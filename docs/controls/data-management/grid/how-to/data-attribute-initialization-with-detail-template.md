---
title: Initialize Data Attribute with Detail Template
page_title: Initialize Data Attribute with Detail Template | Kendo UI Grid
description: "Learn how to initialize a Kendo UI Grid widget by using data attributes and including a detail template."
slug: howto_initialize_data_attributewith_detail_template_grid
---

# Initialize Data Attribute with Detail Template

The example below demonstrates how to initialize a Kendo UI Grid using data attributes and include a detail template.

###### Example

```html
     <div id="grid"
         data-role="grid"
         data-sortable="true"
         data-pageable="true"
         data-height="450"
         data-detail-init="viewModel.detailInit"
         data-columns='[{"field": "FirstName"}, {"field": "LastName"}, {"field": "Country"}, {"field": "City"}, {"field": "Title"}]'
         data-bind="source: dataSource, events: { dataBound: dataBound }"></div>
    <script>
      var dataSource = new kendo.data.DataSource({
        type: "odata",
        transport: {
          read: "http://demos.kendoui.com/service/Northwind.svc/Employees"
        },
        pageSize: 6,
        serverPaging: true,
        serverSorting: true
      });

      var viewModel = kendo.observable({
        dataSource: dataSource,
        detailInit: function (e) {
          $("<div/>").appendTo(e.detailCell).kendoGrid({
            dataSource: {
              type: "odata",
              transport: {
                read: "http://demos.kendoui.com/service/Northwind.svc/Orders"
              },
              serverPaging: true,
              serverSorting: true,
              serverFiltering: true,
              pageSize:6,
              filter: { field: "EmployeeID", operator: "eq", value: e.data.EmployeeID }
            },
            scrollable: false,
            sortable: true,
            pageable: true,
            columns: [
              { field: "OrderID", width: 70 },
              { field: "ShipCountry", title:"Ship Country", width: 100 },
              { field: "ShipAddress", title:"Ship Address" },
              { field: "ShipName", title: "Ship Name", width: 200 }
            ]
          });
        },
        dataBound: function(e) {
          e.sender.expandRow(e.sender.tbody.find("tr.k-master-row").first());
        }
      });
      kendo.bind($(document.body), viewModel);
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
* [How to Load and Append More Records While Scrolling Down]({% slug howto_loadand_append_morerecords_while_scrollingdown_grid %})
* [How to Perform CRUD Operations with Local Storage Data]({% slug howto_perform_crud_operationswith_local_storage_data_grid %})
* [How to Persist Expanded Rows after Refresh]({% slug howto_persist_expanded_rows_afetrrefresh_grid %})
* [How to Set Cell Color Based on ForeignKey Values]({% slug howto_set_cell_color_basedon_foreignkey_values_grid %})
* [How to Show Tooltip for Column Records]({% slug howto_show_tooltipfor_column_records_grid %})
* [How to Update Toolbar Content Using MVVM Binding]({% slug howto_update_toolbar_content_using_mvvmbinding_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_create_custom_editors_grid %}).
