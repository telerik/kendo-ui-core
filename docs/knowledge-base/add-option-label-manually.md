---
title: Manually Add ComboBox Option Labels
page_title: Implement Option Labels Manually - jQuery ComboBox
description: "Learn how to manually add an option label in the Kendo UI for jQuery ComboBox control."
previous_url: /controls/editors/combobox/how-to/add-option-label-manually, /controls/editors/combobox/how-to/binding/add-option-label-manually
slug: howto_add_option_label_manually_combobox
tags: telerik, kendo, jquery, combobox, add, option, labels, manually
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

How can I manually add an option label in a Kendo UI ComboBox?

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
          index: 0,
          dataSource: {
            type: "odata",
            serverFiltering: true,
            transport: {
              read: {
                url: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products",
              }
            },
            requestEnd: function(e) {
              e.response.d.results.unshift({ ProductID:'', ProductName:'All' });
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
* [Bypass ComboBox Boundary Detection]({% slug howto_bypass_boudary_detection_combobox %})
* [Configure Deferred ComboBox Value Binding]({% slug howto_configure_deffered_value_binding_combobox %})
* [Define ComboBox Virtual Configuration Declaratively]({% slug howto_define_virtual_option_combobox %})
* [Implement ComboBox Cascading with Local Data]({% slug howto_implement_cascading_local_data_combobox %})
* [Make the ComboBox Visible Input Readonly]({% slug howto_make_visible_inputs_readonly_combobox %})
* [Open the ComboBox When onFocus Is Triggered]({% slug howto_open_onfocus_combobox %})
* [Prevent Adding Custom ComboBox Values]({% slug howto_prevent_adding_custom_values_combobox %})
* [Underline Matched ComboBox Search Results]({% slug howto_underline_matched_search_combobox %})
