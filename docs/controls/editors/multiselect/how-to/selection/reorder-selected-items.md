---
title: Reorder Selected Items
page_title: Reorder Selected Items | Kendo UI MultiSelect
description: "Learn how to reorder selected items in the Kendo UI Multiselect widget by using Kendo UI Sortable."
previous_url: /controls/editors/multiselect/how-to/reorder-selected-items
slug: howto_reorder_selected_items_multiselect
---

# Reorder Selected Items

The following example demonstrates how to use the Kendo UI Sortable to reorder the selected values in a Kendo UI MultiSelect widget.

###### Example

```html
     <div id="example" role="application">
      <form method="post" action="http://trykendoui.telerik.com/@ggkrustev/oDEW">
        <h2>Invite Attendees</h2>
        <label for="required">Required</label>
        <select id="required" name="required" multiple="multiple" data-placeholder="Select attendees...">
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
        <button>Post</button>
      </form>
      <script>
        $(document).ready(function() {
          // create MultiSelect from select HTML element
          var required = $("#required").kendoMultiSelect().data("kendoMultiSelect");

          required.tagList.kendoSortable({
            hint:function(element) {
              return element.clone().addClass("hint");
            },
            placeholder:function(element) {
              return element.clone().addClass("placeholder").text("drop here");
            }
          });
        });
      </script>
    </div>
```

## See Also

Other articles on the Kendo UI MultiSelect:

* [MultiSelect JavaScript API Reference](/api/javascript/ui/multiselect)
* [How to Cascade from DropDownList]({% slug howto_cascade_froma_dropdownlist_multiselect %})
* [How to Filter Values in Widgets Sharing the Same Data]({% slug howto_filter_valuesin_widgetswith_shared_data_multiselect %})
* [How to Preselect Items Using MVVM Binding]({% slug howto_preselect_items_byusing_mvvm_binding_multiselect %})
* [How to Select All Values with Single Selection]({% slug howto_select_allvalues_witha_single_selection_multiselect %})
* [How to Use MultiSelect with Bootstrap Modal Window]({% slug howto_use_multiselect_with_bootstrap_modal_window_multiselect %})
* [How to Wire Blur Event of the Filter Input]({% slug howto_wire_blur_event_ofthe_filtеr_input_multiselect %})

For more runnable examples on the Kendo UI MultiSelect, browse its [**How To** documentation folder]({% slug howto_preselect_itemson_load_angular_multiselect %}).
