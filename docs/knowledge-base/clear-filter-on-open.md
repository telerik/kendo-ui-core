---
title: Clear Filter on Opening the ComboBox
page_title: Clear Filter on Opening the ComboBox
description: "Learn how to clear the filter of the Kendo UI ComboBox on opening the component."
previous_url: /controls/editors/combobox/how-to/clear-filter-on-open, /controls/editors/combobox/how-to/filtering/clear-filter-on-open
slug: howto_clear_filter_open_combobox
tags: telerik, kendo, jquery, combobox, clear, filter, on, opening
component: combobox
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® ComboBox for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Visual Studio Version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I clear the filter of the Kendo UI ComboBox on opening the widget?

## Solution

The following example demonstrates how to achieve the desired scenario.


```dojo
  <div id="example">
    <div class="demo-section k-header">
      <h4>Products</h4>
      <input id="products" style="width: 400px" />
    </div>
    <script>
      $(document).ready(function() {
        $("#products").kendoComboBox({
          placeholder: "Select product",
          dataTextField: "ProductName",
          dataValueField: "ProductID",
          filter: "contains",
          autoBind: false,
          minLength: 3,
          dataSource: {
            type: "odata",
            serverFiltering: true,
            transport: {
              read: {
                url: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products",
              }
            }
          },
          open: function() {
            var filters = this.dataSource.filter();

            if (filters) {
              //clear applied filters
              this.dataSource.filter({});
            }
          }
        });
      });
    </script>

    <style scoped>
      .demo-section {
        width: 400px;
      }
    </style>
  </div>
```

## See Also

* [ComboBox JavaScript API Reference](/api/javascript/ui/combobox)
* [Bypass Boundary Detection]({% slug howto_bypass_boudary_detection_combobox %})
* [Configure Deferred Value Binding]({% slug howto_configure_deffered_value_binding_combobox %})
* [Implement Cascading with Local Data]({% slug howto_implement_cascading_local_data_combobox %})
* [Make Visible Input Readonly]({% slug howto_make_visible_inputs_readonly_combobox %})
* [Open ComboBox When onFocus is Triggered]({% slug howto_open_onfocus_combobox %})
* [Prevent Adding Custom Values]({% slug howto_prevent_adding_custom_values_combobox %})
* [Underline Matched Search]({% slug howto_underline_matched_search_combobox %})
