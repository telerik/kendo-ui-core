---
title: Create Cascading MultiSelects
page_title: Implement a Cascading Feature for MultiSelects
description: "Learn how to create cascading Kendo UI MultiSelect widgets."
previous_url: /controls/editors/multiselect/how-to/cascading-multiselects, /controls/editors/multiselect/how-to/cascade/cascading-multiselects
slug: howto_create_cascading_widgets_multiselect
tags: telerik, kendo, jquery, multiselect, create, cascading, multiselects
component: multiselect
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® MultiSelect for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Visual Studio version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I cascade multiple Kendo UI MultiSelect widgets?

## Solution

The following example demonstrates how to achieve the desired scenario.

```dojo
    supplier: <select id="suppliers"></select>
    product: <select id="products"></select>
    <script>
      $(function() {
        var productsDataSource = new kendo.data.DataSource({
          type: "odata",
          serverFiltering: true,
          transport: {
            read: {
              url: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products",
            },
            parameterMap: function(data) {
              return kendo.data.transports.odata.parameterMap.call(this, data);
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
                url: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Suppliers"
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

* [MultiSelect JavaScript API Reference](/api/javascript/ui/multiselect)
* [How to Cascade from DropDownList]({% slug howto_cascade_froma_dropdownlist_multiselect %})
* [How to Filter Values in Widgets Sharing the Same Data]({% slug howto_filter_valuesin_widgetswith_shared_data_multiselect %})
* [How to Preselect Items Using MVVM Binding]({% slug howto_preselect_items_byusing_mvvm_binding_multiselect %})
* [How to Select All Values with Single Selection]({% slug howto_select_allvalues_witha_single_selection_multiselect %})
* [How to Use MultiSelect with Bootstrap Modal Window]({% slug howto_use_multiselect_with_bootstrap_modal_window_multiselect %})
* [How to Wire Blur Event of the Filter Input]({% slug howto_wire_blur_event_ofthe_filtеr_input_multiselect %})
