---
title: Implement Batch Editing with OData
page_title: Implement Batch Editing with OData | Kendo UI Grid
description: "Learn how to implement batch editing with the Kendo UI Grid when binding to OData service."
slug: howto_batch_editing_odata_grid
---

# Implement Batch Editing with OData

The Grid does not come with a built-in support for batch editing when binding to OData. Achieve this by using a third-party library.

To submit the actual request, the example below uses [Batch.js by Pavel Volgarev](https://github.com/volpav/batchjs). See also [Batch Processing](http://www.odata.org/documentation/odata-version-3-0/batch-processing/) in the OData 3.0 documentation.

> **Important**
>
> An experimental `transport.submit` member of the Kendo UI DataSource is used. This is yet to be included as an officially supported API.

###### Example

```html
    <div id="grid"></div>
    <script>
      $(document).ready(function () {
        // The methods below create an entry in the requests array for the given operation
        function queueCreated(requests, items) {
          for (var i = 0; i < items.length; i++) {
            requests.push({
              url: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers",
              type: "POST",
              data: items[i]
            });

            // Assign temporary IDs as placeholders
            items[i].ContactID = kendo.guid();
          }
        }

        function queueUpdated(requests, items) {
          for (var i = 0; i < items.length; i++) {
            requests.push({
              url: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers/" +
              items[i].CustomerID,
              type: "PUT",
              data: items[i]
            });
          }
        }

        function queueDestroyed(requests, items) {
          for (var i = 0; i < items.length; i++) {
            requests.push({
              url: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers/" +
              items[i].CustomerID,
              type: "DELETE"
            });
          }
        }

        $("#grid").kendoGrid({
          dataSource: {
            type: "odata",
            batch: true,
            transport: {
              // Not an official feature, but it's close to being one
              submit: function(e) {
                var requests = [];

                // We get all batched operations in e.data
                queueCreated(requests, e.data.created);
                queueUpdated(requests, e.data.updated);
                queueDestroyed(requests, e.data.destroyed);

                // Check out the network tab on "Save Changes"
                $.ajaxBatch({
                  // Not that this service doesn't actually support batching
                  url: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Batch",
                  data: requests
                })
                  .done(function() {
                  e.success(e.data.created, "create");
                  e.success([], "update");
                  e.success([], "destroy");
                })
                  .fail(function() {
                  e.error({});
                });
              },
              read: function(e) {
                var data = kendo.data.transports.odata.parameterMap(e.data, "read");
                $.ajax({
                  url: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers",
                  dataType: "jsonp",
                  data: data,
                  jsonp: "$callback"
                })
                  .done(e.success)
                  .fail(e.error);
              }
            },
            schema: {
              model: {
                id: "CustomerID",
                fields: {
                  "ContactName": { type: "string" }
                }
              }
            },
            pageSize: 20
          },
          height: 550,
          editable: "incell",
          toolbar: ["save", "create"],
          groupable: true,
          sortable: true,
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
          }, {
            command: ["destroy"]
          }]
        });
      });
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
