---
title: Create Checkbox Custom Item Templates
page_title: Create Checkbox Custom Item Templates | Kendo UI MultiSelect
description: "Learn how to create a Kendo UI MultiSelect with checkboxes."
previous_url: /controls/editors/multiselect/how-to/checkbox-item-template
slug: howto_checkbox_custom_item_template_multiselect
---

# Create Checkbox Custom Item Templates

The following example demonstrates how to create a Kendo UI MultiSelect widget with checkboxes.

###### Example

```html
    <div id="example" role="application">
        <div class="demo-section k-header">
            <h2>Invite Attendees</h2>
            <label for="required">Required</label>
            <select id="required" multiple="multiple" data-placeholder="Select attendees...">
                <option selected>Steven White</option>
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
        </div>
        <style>
            .k-list .k-item {
                position: relative;
            }  

          .k-item input {
            position: absolute;
            right: 0
          }
        </style>
        <script>
            $(document).ready(function() {
                var checkInputs = function(elements) {
                  elements.each(function() {
                        var element = $(this);     
                    var input = element.children("input");

                    input.prop("checked", element.hasClass("k-state-selected"));
                  });
                };
                // create MultiSelect from select HTML element
                var required = $("#required").kendoMultiSelect({
                  itemTemplate: "#:data.text# <input type='checkbox'/>",
                  autoClose: false,
                  dataBound: function() {
                    var items = this.ul.find("li");
                    setTimeout(function() {
                      checkInputs(items);
                    });
                  },
                  change: function() {
                    var items = this.ul.find("li");
                    checkInputs(items);
                  }
                }).data("kendoMultiSelect");
            });
        </script>
    </div>
```

## See Also

* [MultiSelect JavaScript API Reference](/api/javascript/ui/multiselect)
* [How to Cascade from DropDownList]({% slug howto_cascade_froma_dropdownlist_multiselect %})
* [How to Filter Values in Widgets Sharing the Same Data]({% slug howto_filter_valuesin_widgetswith_shared_data_multiselect %})
* [How to Preselect Items Using MVVM Binding]({% slug howto_preselect_items_byusing_mvvm_binding_multiselect %})
* [How to Reorder Selected Items]({% slug howto_reorder_selected_items_multiselect %})
* [How to Select All Values with Single Selection]({% slug howto_select_allvalues_witha_single_selection_multiselect %})
* [How to Use MultiSelect with Bootstrap Modal Window]({% slug howto_use_multiselect_with_bootstrap_modal_window_multiselect %})
* [How to Wire Blur Event of the Filter Input]({% slug howto_wire_blur_event_ofthe_filtеr_input_multiselect %})

For more runnable examples on the Kendo UI MultiSelect, browse its [**How To** documentation folder]({% slug howto_bindobjectstongmodel_multiselect %}).
