---
title: Filter Values in MultiSelects Sharing the Same Data
page_title: Filter Values in MultiSelects Sharing the Same Data
description: "Learn how to filter values in two Kendo UI Multiselect widgets that share the same data."
previous_url: /controls/editors/multiselect/how-to/distinct-values-in-widgets-sharing-same-data, /controls/editors/multiselect/how-to/filtering/distinct-values-in-widgets-sharing-same-data
slug: howto_filter_valuesin_widgetswith_shared_data_multiselect
tags: telerik, kendo, jquery, multiselect, filter, values, in, two, or, more, multiselects, share, the, same, data
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

How can I filter the values of two Kendo UI widgets, which share the same data, based on user selection?

## Solution

The following example demonstrates how to achieve the desired scenario.

```dojo
    <select id="multiselect1">
    </select>
    <br />
    <select id="multiselect2">
    </select>
    <script>
      var initialData = [{id:1, name: "item1"}, {id:2, name: "item2"}, {id:3, name: "item3"}];

      function distinctValues(values) {
        return initialData.filter(function(current){
          return values.filter(function(initial){
            return initial == current.id
          }).length == 0
        });
      }

      $("#multiselect1").kendoMultiSelect({
        dataSource: initialData,
        dataTextField: "name",
        dataValueField: "id",
        change: function() {
          var ms2 = $("#multiselect2").getKendoMultiSelect();
          var values = distinctValues(this.value());
          ms2.dataSource.data(values);
        }
      });

      $("#multiselect2").kendoMultiSelect({
        dataTextField: "name",
        dataValueField: "id",
        dataSource: initialData,
        change: function() {
          var ms1 = $("#multiselect1").getKendoMultiSelect();
					var values = distinctValues(this.value());
          ms1.dataSource.data(values);
        }
      });
    </script>
```

## See Also

* [MultiSelect JavaScript API Reference](/api/javascript/ui/multiselect)
* [How to Cascade from DropDownList]({% slug howto_cascade_froma_dropdownlist_multiselect %})
* [How to Preselect Items Using MVVM Binding]({% slug howto_preselect_items_byusing_mvvm_binding_multiselect %})
* [How to Select All Values with Single Selection]({% slug howto_select_allvalues_witha_single_selection_multiselect %})
* [How to Use MultiSelect with Bootstrap Modal Window]({% slug howto_use_multiselect_with_bootstrap_modal_window_multiselect %})
* [How to Wire Blur Event of the Filter Input]({% slug howto_wire_blur_event_ofthe_filtеr_input_multiselect %})
