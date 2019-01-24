---
title: Add Row Numbers
page_title: jQuery Grid Documentation | Add Row Numbers | Kendo UI
description: "Get started with the jQuery Grid by Kendo UI and learn how to implement row numbers to the widget."
slug: howto_addrownumbers_grid
---

# Add Row Numbers

The following example demonstrates how to implement row numbers in a Grid by using the [`page()`](/api/javascript/data/datasource/methods/page) and [`pageSize()`](/api/javascript/data/datasource/methods/pagesize) methods of the Data Source.

###### Example

```dojo
  <div id="grid"></div>
    <script>
      var record = 0;

      $("#grid").kendoGrid({
        dataSource: {
          type: "odata",
          transport: {
            read: "//demos.telerik.com/kendo-ui/service/Northwind.svc/Customers"
          },
          pageSize: 20

        },
        sortable: true,
        columns: [
          {
            title: "#",
            template: "#= ++record #",
            width: 35
          }, {
            field: "ContactName", title: "Contact Name"
          }, {
            field: "CompanyName",
            title: "Company Name"
          }, {
            field: "Country",
            width: 150
          }
        ],
        pageable: true,
        dataBinding: function() {
          record = (this.dataSource.page() -1) * this.dataSource.pageSize();
        }
      });
    </script>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
* [How to Implement Stable Sort in Chrome]({% slug howto_implement_stable_sortin_chrome_grid %})
* [How to Initialize Data Attribute with Detail Template]({% slug howto_initialize_data_attributewith_detail_template_grid %})
* [How to Persist Expanded Rows after Refresh]({% slug howto_persist_expanded_rows_afetrrefresh_grid %})
* [How to Set Cell Color Based on ForeignKey Values]({% slug howto_set_cell_color_basedon_foreignkey_values_grid %})
* [How to Show Tooltip for Column Records]({% slug howto_show_tooltipfor_column_records_grid %})
* [How to Update Toolbar Content Using MVVM Binding]({% slug howto_update_toolbar_content_using_mvvmbinding_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_adjust_row_heights_template_locked_columns_grid %}).
