---
title: Select or Deselect All MultiSelect Items
page_title: Select or Deselect All MultiSelect Items
description: "Learn how to select or deselect all items in the Kendo UI MultiSelect component."
previous_url: /controls/editors/multiselect/how-to/select-deselect-all-items, /controls/editors/multiselect/how-to/selection/select-deselect-all-items
slug: howto_select_and_deselect_allitems_multiselect
tags: telerik, kendo, jquery, multiselect, select, or, deselect, all, items
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
  <td>Visual Studio Version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I select or deselect all items in the Kendo UI MultiSelect widget by using external buttons?

## Solution

The following example demonstrates how to achieve the desired scenario.

```dojo
    <div id="example" role="application">
      <div class="demo-section k-header">
        <h2>Invite Attendees</h2>
        <label for="required">Required</label>
        <select id="required" multiple="multiple" data-placeholder="Select attendees...">
          <option>Steven White</option>
          <option>Nancy King</option>
          <option>Nancy Davolio</option>
          <option>Robert Davolio</option>
          <option>Michael Leverling</option>
          <option>Andrew Callahan</option>
          <option>Michael Suyama</option>
          <option selected>Anne King</option>
          <option>Laura Peacock</option>
          <option>Robert Fuller</option>
          <option>Janet White</option>
          <option>Nancy Leverling</option>
          <option>Robert Buchanan</option>
          <option>Margaret Buchanan</option>
          <option selected>Andrew Fuller</option>
          <option>Anne Davolio</option>
          <option>Andrew Suyama</option>
          <option>Nige Buchanan</option>
          <option>Laura Fuller</option>
        </select>
        <button class="k-button" id="select">Select All</button>
        <button class="k-button" id="deselect">Deselect All</button>
      </div>
      <style scoped>
        .demo-section {
          width: 350px;
          min-height: 140px;
        }
        .demo-section h2 {
          font-weight: normal;
        }
        .demo-section label {
          display: inline-block;
          margin: 15px 0 5px 0;
        }
        .demo-section select {
          width: 350px;
        }
        #get {
          float: right;
          margin: 25px auto 0;
        }
      </style>
      <script>
        $(document).ready(function() {
          // create MultiSelect from select HTML element
          var required = $("#required").kendoMultiSelect().data("kendoMultiSelect");

          $("#select").click(function() {
            var values = $.map(required.dataSource.data(), function(dataItem) {
              return dataItem.value;
            });

            required.value(values);
          });

          $("#deselect").click(function() {
            required.value([]);
          });
        });
      </script>
    </div>
```

## See Also

* [MultiSelect JavaScript API Reference](/api/javascript/ui/multiselect)
* [Cascade from DropDownList]({% slug howto_cascade_froma_dropdownlist_multiselect %})
* [Filter Values in Widgets Sharing the Same Data]({% slug howto_filter_valuesin_widgetswith_shared_data_multiselect %})
* [Preselect Items Using MVVM Binding]({% slug howto_preselect_items_byusing_mvvm_binding_multiselect %})
* [Select All Values with Single Selection]({% slug howto_select_allvalues_witha_single_selection_multiselect %})
* [Use MultiSelect with Bootstrap Modal Window]({% slug howto_use_multiselect_with_bootstrap_modal_window_multiselect %})
* [Wire Blur Event of the Filter Input]({% slug howto_wire_blur_event_ofthe_filter_input_multiselect %})
