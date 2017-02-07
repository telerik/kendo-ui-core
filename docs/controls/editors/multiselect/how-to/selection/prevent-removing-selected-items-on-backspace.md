---
title: Prevent the Deletion of Selected Items on Backspace
page_title: Prevent the Deletion of Selected Items on Backspace | Kendo UI MultiSelect
description: "Learn how to prevent deleting a selected item on pressing the Backspace key in the input of the Kendo UI MultiSelect widget."
previous_url: /controls/editors/multiselect/how-to/prevent-removing-selected-items-on-backspace
slug: howto_prevent_deleting_selected_items_on_backspace_multiselect
---

# Prevent the Deletion of Selected Items on Backspace

The following example demonstrates how to prevent the deletion of selected items on a `Backspace` key-press in the Kendo UI MultiSelect widget.

###### Example

```html
<select id="multiselect" multiple="multiple"></select>
    <script>
      var data = [
        { text: "Africa", value: 1 },
        { text: "Europe", value:2 },
        { text: "Asia", value:3 },
        { text: "North America", value:4 },
        { text: "South America", value:5 },
        { text: "Antarctica", value:6 },
        { text: "Australia", value:7 }
      ];

      $("#multiselect").kendoMultiSelect({
        dataSource: data,
        dataTextField: 'text',
        dataValueField: 'value'
      });

      var multiselect = $("#multiselect").data("kendoMultiSelect");

      var input = multiselect.input;

      input.on('keydown', function(e){
          if(e.which === 8 && !e.target.value.length){
            e.stopImmediatePropagation();  
            e.preventDefault();
          }
      });

      $._data(input[0]).events.keydown.reverse();
    </script>
```

## See Also

Other articles on the Kendo UI MultiSelect:

* [MultiSelect JavaScript API Reference](/api/javascript/ui/multiselect)
* [How to Cascade from DropDownList]({% slug howto_cascade_froma_dropdownlist_multiselect %})
* [How to Filter Values in Widgets Sharing the Same Data]({% slug howto_filter_valuesin_widgetswith_shared_data_multiselect %})
* [How to Preselect Items Using MVVM Binding]({% slug howto_preselect_items_byusing_mvvm_binding_multiselect %})
* [How to Reorder Selected Items]({% slug howto_reorder_selected_items_multiselect %})
* [How to Select All Values with Single Selection]({% slug howto_select_allvalues_witha_single_selection_multiselect %})
* [How to Use MultiSelect with Bootstrap Modal Window]({% slug howto_use_multiselect_with_bootstrap_modal_window_multiselect %})
* [How to Wire Blur Event of the Filter Input]({% slug howto_wire_blur_event_ofthe_filtеr_input_multiselect %})

For more runnable examples on the Kendo UI MultiSelect, browse its [**How To** documentation folder]({% slug howto_preselect_itemson_load_angular_multiselect %}).
