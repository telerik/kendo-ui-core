---
title: Wire the blur Event of the Filter Input
page_title: Wire the blur Event of the Filter Input | Kendo UI MultiSelect
description: "Learn how to bind to the blur event of the filter input element in the Kendo UI MultiSelect widget."
previous_url: /controls/editors/multiselect/how-to/wire-blur-event-of-filter-input
slug: howto_wire_blur_event_ofthe_filtеr_input_multiselect
---

# Wire the blur Event of the Filter Input

The following example demonstrates how to bind to the `blur` event of the `filter` input element.

###### Example

```html
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

                //add the autocomplete="off" attribute

                required.input.bind("blur", function() {
                                alert(1);
                });
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

For more runnable examples on the Kendo UI MultiSelect, browse its [**How To** documentation folder]({% slug howto_bindobjectstongmodel_multiselect %}).
