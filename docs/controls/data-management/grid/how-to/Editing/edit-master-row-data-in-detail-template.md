---
title: Edit Records in Child Grids
page_title: Edit Records in Child Grids | Kendo UI Grid
description: "Learn how to edit records in hierarchical Kendo UI Grids."
slug: howto_edit_recordsin_children_grid
---

# Edit Records in Child Grids

The example below demonstrates how to edit records in a child Kendo UI Grid.

###### Example

```html
  <div id="grid"></div>
  <script>
    var preventBinding = false,
    grid = $("#grid").kendoGrid({
      dataSource: {
        type: "odata",
        transport: {
          read: {
            url: "http://demos.kendoui.com/service/Northwind.svc/Employees",
            data: { $expand: "Orders" }
          }
        },
        schema: {
          model: {
            id: "EmployeeID"
          }
        },
        change: function (e) {
          if (e.field && e.field.indexOf("Orders.results") >= 0) {
            preventBinding = true;
          }
        },
        pageSize: 6,
        serverPaging: true,
        serverSorting: true
      },
      dataBinding: function (e) {
        if (preventBinding) {
          e.preventDefault();
        }
        preventBinding = false;
      },
      height: 430,
      sortable: true,
      pageable: true,
      detailInit: detailInit,
      columns: [
        {
          field: "FirstName",
          title: "First Name",
          width: "110px"
        },
        {
          field: "LastName",
          title: "Last Name",
          width: "110px"
        },
        {
          field: "Country",
          width: "110px"
        },
        {
          field: "City",
          width: "110px"
        },
        {
          field: "Title"
        }
      ]
    }).data("kendoGrid");

function detailInit(e) {
  var findByID = function (id) {
    return e.data.Orders.results.find(function(item){
      return item.OrderID == id;
    });
  };

  $("<div/>").appendTo(e.detailCell).kendoGrid({
    dataSource: {
      transport: {
        read: function (options) {
          options.success(e.data.Orders.results.toJSON());
        },
        update: function (options) {
          var data = options.data,
              parentItem = findByID(data.OrderID);
          for (var field in data) {
            if(!(field.indexOf("_") === 0)){
              parentItem[field] = data[field];
            }
          }

          e.data.dirty = true;
          options.success();
        },
        destroy: function (options) {
          var parentItem = findByID(options.data.OrderID);
          preventBinding = true;

          e.data.Orders.results.remove(parentItem);

          options.success();
        },
      },
      pageSize: 10,
      schema: {
        model: {
          id: "OrderID",
          fields: {
            OrderID: { editable: false },
            EmployeeID: { editable: false }
          }
        }
      }
    },
    scrollable: false,
    sortable: true,
    pageable: true,
    editable: "inline",
    columns: [
      { field: "OrderID", width: "70px" },
      { field: "ShipCountry", title: "Ship Country", width: "110px" },
      { field: "ShipAddress", title: "Ship Address" },
      { field: "ShipName", title: "Ship Name", width: "200px" },
      { command: ["edit", "destroy"], title: "&nbsp;" }
    ]
  });
}
  </script>
```

## See Also

Other articles on the Kendo UI Grid and how-to examples related to its editing functionality:

* [JavaScript API Reference](/api/javascript/ui/grid)
* [How to Add New Rows When Tabbing out of the Last One]({% slug howto_add_new_rows_when_tabbingoutof_thelast_one_grid %})
* [How to Build Custom dataSource for Custom Editor]({% slug howto_build_custom_datasourcefor_custom_editor_grid %})
* [How to Customize the Delete Confirmation Dialog]({% slug howto_customize_delete_confirmation_dialog_grid %})
* [How to Delete Multiple Rows Selected with Checkboxes]({% slug howto_delete_rows_selectedwith_checkboxes_grid %})
* [How to Edit Records in Child Grids]({% slug howto_edit_recordsin_children_grid %})
* [How to Edit Records Using External Forms]({% slug howto_edit_records_using_external_forms_grid %})
* [How to Increase Popup Edit Form and Textbox Width]({% slug howto_increase_popup_edit_formand_textbox_grid %})
* [How to Preserve Dirty Indicator in Incell Editing and Client Operations]({% slug howto_preserve_dirty_indicator_incell_editing_client_operations_grid %})
* [How to Render Grid Editor in Column Template]({% slug howto_render_editor_column_template_grid %})
* [How to Show Custom Editor Using the Selected Item outside the Grid]({% slug howto_use_show_custom_editor_selected_item_outside_grid %})
* [How to Skip Non-editable Cells When Tabbing]({% slug howto_skip_noneditable_cells_when_tabbing_grid %})
* [How to Use AutoComplete as Custom Column Editor]({% slug howto_use_autocompleteas_custom_column_editor_grid %})
* [How to Use CRUD Operations When Grid Is Bound through MVVM]({% slug howto_use_crud_operationswith_mvvmbound_grid %})
* [How to Use Editors Based on Data Item Property]({% slug howto_use_editors_basedon_dataitem_property_grid %})
* [How to Use TreeView as Custom Editor]({% slug howto_usethe_treeview_aseditor_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_create_custom_editors_grid %}).
