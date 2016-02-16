---
title: Create Cascading MultiSelects
page_title: Create Cascading MultiSelects | Kendo UI MultiSelect
description: "Learn how to create cascading Kendo UI MultiSelect widgets."
slug: howto_create_cascading_widgets_multiselect
---

# Create Cascading MultiSelects

The example below demonstrates how to cascade multiple Kendo UI MultiSelect widgets.

###### Example

```html
    supplier: <select id="suppliers"></select>
    product: <select id="products"></select>
    <script>
      $(function() {
        var productsDataSource = new kendo.data.DataSource({
          type: "odata",
          serverFiltering: true,
          transport: {
            read: {
              url: "http://demos.kendoui.com/service/Northwind.svc/Products",
            },
            parameterMap: function(data) {
              var result = {};
              var filter = data.filter;

              if (filter) {
                filter = filter.filters;

                for (var i = 0, length = filter.length; i < length; i++) {
                  result["filters[" + i + "]"] = filter[i].value;
                }
              }

              return result;
            }
          }
        });

        $("#products").kendoMultiSelect({
          autoBind: false,
          dataTextField: "ProductName",
          dataValueField: "ProductID",
          dataSource: productsDataSource
        });

        $("#suppliers").kendoMultiSelect({
          autoBind: false,
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
            var filters = buildFilters(this.dataItems());
            productsDataSource .filter(filters);
          }
        });

        function buildFilters(dataItems) {
          var filters = [],
              length = dataItems.length,
              idx = 0, dataItem;

          for (; idx < length; idx++) {
            dataItem = dataItems[idx];

            filters.push({
              field: "SupplierID",
              operator: "eq",
              value: parseInt(dataItem.SupplierID)
            });
          }

          return {
            logic: "or",
            filters: filters
          };
        }
      });
    </script>
```

## See Also

Other articles on Kendo UI MultiSelect:

* [MultiSelect JavaScript API Reference](/api/javascript/ui/multiselect)
* [How to Bind Values to Template]({% slug howto_bind_values_totemplate_multiselect %})
* [How to Cascade from DropDownList]({% slug howto_cascade_froma_dropdownlist_multiselect %})
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
