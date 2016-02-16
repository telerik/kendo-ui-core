---
title: Cascade from DropDownList
page_title: Cascade from DropDownList | Kendo UI MultiSelect
description: "Learn how to cascade the Kendo UI MultiSelect widget from a Kendo UI DropDownList."
slug: howto_cascade_froma_dropdownlist_multiselect
---

# Cascade from DropDownList

The example below demonstrates how to cascade the Kendo UI Multiselect from a Kendo UI DropDownList.

###### Example

```html
    <div>
      supplier: <select id="suppliers"></select>
    </div>
    <div>
      product: <select id="products"></select>
    </div>
    <script>
      $(function() {
        var productsDataSource = new kendo.data.DataSource({
          type: "odata",
          serverFiltering: true,
          transport: {
            read: {
              url: "http://demos.kendoui.com/service/Northwind.svc/Products",
            }
          }
        });

        $("#products").kendoMultiSelect({
          autoBind: false,
          dataTextField: "ProductName",
          dataValueField: "ProductID",
          dataSource: productsDataSource
        });

        $("#suppliers").kendoDropDownList({
          optionLabel: "Select supplier",
          dataTextField: "CompanyName",
          dataValueField: "SupplierID",
          dataSource: {
            type: "odata",
            serverFiltering: true,
            transport: {
              read: {
                url: "http://demos.kendoui.com/service/Northwind.svc/Suppliers"
              }
            }
          },
          change: function() {
            var filters = buildFilters([this.dataItem()]);
            productsDataSource.filter(filters);
          }
        });

        function buildFilters(dataItems) {
          var filters = [];
          var length = dataItems.length;
          var supplierID;
          var idx = 0;

          for (; idx < length; idx++) {
            supplierID = parseInt(dataItems[idx].SupplierID);

            if (!isNaN(supplierID)) {
              filters.push({
                field: "SupplierID",
                operator: "eq",
                value: supplierID
              });
            }
          }
          return filters;
        }
      });
    </script>
```

## See Also

Other articles on Kendo UI MultiSelect:

* [MultiSelect JavaScript API Reference](/api/javascript/ui/multiselect)
* [How to Bind Values to Template]({% slug howto_bind_values_totemplate_multiselect %})
* [How to Create Cascading MultiSelects]({% slug howto_create_cascading_widgets_multiselect %})
* [How to Create Checkbox Custom Item Template]({% slug howto_checkbox_custom_item_template_multiselect %})
* [How to Create Scrollable Data Items]({% slug howto_create_scrollable_data_items_multiselect %})
* [How to Filter Values in Widgets Sharing the Same Data]({% slug howto_filter_valuesin_widgetswith_shared_data_multiselect %})
* [How to Preselect Items on Load in AngularJS]({% slug howto_preselect_itemson_load_angular_multiselect %})
* [How to Preselect Items Using MVVM Binding]({% slug howto_preselect_items_byusing_mvvm_binding_multiselect %})
* [How to Reorder Selected Items]({% slug howto_reorder_selected_items_multiselect %})
* [How to Select All Values with Single Selection]({% slug howto_select_allvalues_witha_single_selection_multiselect %})
* [How to Select or Deselect All Items]({% slug howto_select_and_deselect_allitems_multiselect %})
* [How to Select the First Item on TAB]({% slug howto_select_thefirst_itemon_tab_multiselect %})
* [How to Use MultiSelect with Bootstrap Modal Window]({% slug howto_use_multiselect_with_bootstrap_modal_window_multiselect %})
* [How to Wire Blur Event of the Filter Input]({% slug howto_wire_blur_event_ofthe_filtеr_input_multiselect %})
