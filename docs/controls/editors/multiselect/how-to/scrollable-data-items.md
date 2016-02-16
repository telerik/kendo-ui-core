---
title: Create Scrollable Data Items
page_title: Create Scrollable Data Items | Kendo UI MultiSelect
description: "Learn how to create scrollable data items in the Kendo UI MultiSelect widget."
slug: howto_create_scrollable_data_items_multiselect
---

# Create Scrollable Data Items

The example below demonstrates how to create a scrollable list of the selected items in a Kendo UI MultiSelect widget.

###### Example

```html
    <div id="example" role="application">
    <div class="demo-section k-header">
        <h2>Invite Attendees</h2>
        <label for="required">Required</label>
        <select id="required" multiple="multiple" data-placeholder="Select attendees..." style="width:200px">
            <option selected>Steven White</option>
            <option selected>Nancy King</option>
            <option selected>Nancy Davolio</option>
            <option selected>Robert Davolio</option>
            <option selected>Michael Leverling</option>
            <option selected>Andrew Callahan</option>
            <option selected>Michael Suyama</option>
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
    </div>
    <script>
      $("#required").kendoMultiSelect({
        select: onSelect
      });

      $("#required").data("kendoMultiSelect").wrapper.addClass("myClass");

      function onSelect(e) {
        setTimeout(function() {
          var container = e.sender.wrapper.children(".k-multiselect-wrap");
          container.scrollTop(container[0].scrollHeight);
        });
      }
    </script>

    <style>
      .myClass .k-multiselect-wrap
      {
        overflow: auto;
        max-height: 100px;
      }
    </style>
</div>
```

## See Also

Other articles on Kendo UI MultiSelect:

* [MultiSelect JavaScript API Reference](/api/javascript/ui/multiselect)
* [How to Bind Values to Template]({% slug howto_bind_values_totemplate_multiselect %})
* [How to Cascade from DropDownList]({% slug howto_cascade_froma_dropdownlist_multiselect %})
* [How to Create Cascading MultiSelects]({% slug howto_create_cascading_widgets_multiselect %})
* [How to Create Checkbox Custom Item Template]({% slug howto_checkbox_custom_item_template_multiselect %})
* [How to Filter Values in Widgets Sharing the Same Data]({% slug howto_filter_valuesin_widgetswith_shared_data_multiselect %})
* [How to Preselect Items on Load in AngularJS]({% slug howto_preselect_itemson_load_angular_multiselect %})
* [How to Preselect Items Using MVVM Binding]({% slug howto_preselect_items_byusing_mvvm_binding_multiselect %})
* [How to Reorder Selected Items]({% slug howto_reorder_selected_items_multiselect %})
* [How to Select All Values with Single Selection]({% slug howto_select_allvalues_witha_single_selection_multiselect %})
* [How to Select or Deselect All Items]({% slug howto_select_and_deselect_allitems_multiselect %})
* [How to Select the First Item on TAB]({% slug howto_select_thefirst_itemon_tab_multiselect %})
* [How to Use MultiSelect with Bootstrap Modal Window]({% slug howto_use_multiselect_with_bootstrap_modal_window_multiselect %})
* [How to Wire Blur Event of the Filter Input]({% slug howto_wire_blur_event_ofthe_filtеr_input_multiselect %})
