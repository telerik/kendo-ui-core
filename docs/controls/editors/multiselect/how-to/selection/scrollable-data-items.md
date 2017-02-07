---
title: Scroll Selected Items
page_title: Scroll Selected Items | Kendo UI MultiSelect
description: "Learn how to create scrollable data items in the Kendo UI MultiSelect widget."
previous_url: /controls/editors/multiselect/how-to/scrollbale-data-items, /web/multiselect/how-to/scrollbale-data-items, /controls/editors/multiselect/how-to/scrollable-data-items
slug: howto_create_scrollable_data_items_multiselect
---

# Scroll Selected Items

The following example demonstrates how to create a scrollable list of the selected items in a Kendo UI MultiSelect widget.

###### Example

```html
<div id="example">
    <style>
      .myClass .k-multiselect-wrap
      {
        /* enable scrollability */
        overflow: auto;
        /* control selected items' container - use height or min-height and/or max-height */
        max-height: 100px;
      }

      .myClass .k-multiselect-wrap .k-button {
        /* force each selected item on a new line, if required */
        clear: left;
      }
    </style>

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

  // set the custom class that applies all custom styling related to heights, scrollability and selected items arrangement
  $("#required").data("kendoMultiSelect").wrapper.addClass("myClass");

  function onSelect(e) {
    setTimeout(function() {
      // scroll the selected items' container to its bottom
      var container = e.sender.wrapper.children(".k-multiselect-wrap");
      container.scrollTop(container[0].scrollHeight);
    });
  }
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
