---
title: Cascade MultiSelects from DropDownLists
page_title: Cascade MultiSelects from DropDownLists
description: "Learn how to cascade the Kendo UI MultiSelect widget from a Kendo UI DropDownList."
previous_url: /controls/editors/multiselect/how-to/cascade-from-ddl, /controls/editors/dropdownlist/how-to/cascade-multiselect-from-ddl, /controls/editors/dropdownlist/how-to/cascade/cascade-multiselect-from-ddl
slug: howto_cascade_froma_dropdownlist_multiselect
tags: telerik, kendo, jquery, multiselect, cascade, from, dropdownlists
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

How can I cascade the Kendo UI MultiSelect from a Kendo UI DropDownList?

## Solution

The following example demonstrates how to achieve the desired scenario.

```dojo
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
              url: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products",
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
                url: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Suppliers"
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

* [MultiSelect JavaScript API Reference](/api/javascript/ui/multiselect)
* [How to Filter Values in Widgets Sharing the Same Data]({% slug howto_filter_valuesin_widgetswith_shared_data_multiselect %})
* [How to Preselect Items Using MVVM Binding]({% slug howto_preselect_items_byusing_mvvm_binding_multiselect %})
* [How to Select All Values with Single Selection]({% slug howto_select_allvalues_witha_single_selection_multiselect %})
* [How to Use MultiSelect with Bootstrap Modal Window]({% slug howto_use_multiselect_with_bootstrap_modal_window_multiselect %})
* [How to Wire Blur Event of the Filter Input]({% slug howto_wire_blur_event_ofthe_filtеr_input_multiselect %})
