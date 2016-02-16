---
title: Filter Values in Widgets Sharing the Same Data
page_title: Filter Values in Widgets Sharing the Same Data | Kendo UI MultiSelect
description: "Learn how to filter values in two Kendo UI Multiselect widgets that share the same data."
slug: howto_filter_valuesin_widgetswith_shared_data_multiselect
---

# Filter Values in Widgets Sharing the Same Data

The example below demonstrates how to filter the values of two Kendo UI widgets sharing same data based on user selection.

###### Example

```html
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

Other articles on Kendo UI MultiSelect:

* [MultiSelect JavaScript API Reference](/api/javascript/ui/multiselect)
* [How to Bind Values to Template]({% slug howto_bind_values_totemplate_multiselect %})
* [How to Cascade from DropDownList]({% slug howto_cascade_froma_dropdownlist_multiselect %})
* [How to Create Cascading MultiSelects]({% slug howto_create_cascading_widgets_multiselect %})
* [How to Create Checkbox Custom Item Template]({% slug howto_checkbox_custom_item_template_multiselect %})
* [How to Create Scrollable Data Items]({% slug howto_create_scrollable_data_items_multiselect %})
* [How to Preselect Items on Load in AngularJS]({% slug howto_preselect_itemson_load_angular_multiselect %})
* [How to Preselect Items Using MVVM Binding]({% slug howto_preselect_items_byusing_mvvm_binding_multiselect %})
* [How to Reorder Selected Items]({% slug howto_reorder_selected_items_multiselect %})
* [How to Select All Values with Single Selection]({% slug howto_select_allvalues_witha_single_selection_multiselect %})
* [How to Select or Deselect All Items]({% slug howto_select_and_deselect_allitems_multiselect %})
* [How to Select the First Item on TAB]({% slug howto_select_thefirst_itemon_tab_multiselect %})
* [How to Use MultiSelect with Bootstrap Modal Window]({% slug howto_use_multiselect_with_bootstrap_modal_window_multiselect %})
* [How to Wire Blur Event of the Filter Input]({% slug howto_wire_blur_event_ofthe_filtеr_input_multiselect %})
