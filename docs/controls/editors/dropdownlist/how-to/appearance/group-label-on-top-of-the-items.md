---
title: Move Group Labels on Top of Items
page_title: Move Group Labels on Top of Items | Kendo UI DropDownList
description: "Learn how to move the group label on top of the items in a Kendo UI DropDownList widget."
previous_url: /controls/editors/dropdownlist/how-to/group-label-on-top-of-the-items
slug: howto_move_group_label_ontopof_items_dropdownlist
---

# Move Group Labels on Top of Items

The DropDownList provides an option for grouping its list items by certain criteria and showing the group labels and grouped items within the drop-down list.

The following example demonstrates how to move the group label on top of the grouped items in a Kendo UI DropDownList. The approach is also applicable to the [ComboBox](http://demos.telerik.com/kendo-ui/combobox/index) and [MultiSelect](http://demos.telerik.com/kendo-ui/multiselect/index) widgets.

###### Example

```html
<input id="customers" style="width: 400px" />
    <script>
      $(document).ready(function() {
        $("#customers").kendoDropDownList({
          dataTextField: "ContactName",
          dataValueField: "CustomerID",
          fixedGroupTemplate: "LEFT ALIGNED, FULL ROW #=data#",
          groupTemplate: "FULL LINE ABOVE ROW: #: data #",
          height: 400,
          dataSource: {
            type: "odata",
            transport: {
              read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers"
            },
            group: { field: "Country" }
          }
        });
      });
    </script>
    <style>
      .k-list > .k-item.k-first {
        padding-top: 2em;
      }

      .k-list > .k-state-hover.k-first {
        padding-top: calc(2em - 1px);
      }

      .k-list > .k-item.k-first > .k-group {
        height: 2em;
        left: 0;
      }

      .k-list > .k-state-hover.k-first > .k-group {
        top: -1px;
        left: -1px;
      }
    </style>
```

## See Also

Other articles on the Kendo UI DropDownList:

* [DropDownList JavaScript API Reference](/api/javascript/ui/dropdownlist)
* [How to Automatically Adjust the Width of a DropDownList]({% slug howto_automatically_adjust_width_dropdownlist %})
* [How to Create DropDownLists with Long Items]({% slug howto_create_listswith_long_items_dropdownlist %})
* [How to Detect Wrapper Focus Events]({% slug howto_detect_wrapper_focus_events_dropdownlist %})
* [How to Prevent Popup Closure on Scroll]({% slug howto_prevent_popup_closure_onscroll_dropdownlist %})
* [How to Remove Items]({% slug howto_remove_items_dropdownlist %})
* [How to Set DataSource Dynamically]({% slug howto_set_datasource_dynamically_dropdownlist %})
* [How to Update MVVM Bound Models on Load]({% slug howto_update_mvvm_model_onload_dropdownlist %})
* [How to Validate DropDownLists by Using Required Attributes]({% slug howto_validate_using_required_attributes_dropdownlist %})

For more runnable examples on the Kendo UI DropDownList, browse its [**How To** documentation folder]({% slug howto_cascade_withngrepeat_distinct_values_dropdownlist %}).
