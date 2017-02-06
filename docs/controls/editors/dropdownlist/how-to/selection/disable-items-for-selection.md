---
title: Disable Items for Selection
page_title: Disable Items for Selection | Kendo UI DropDownList
description: "Learn how to disable items for selection within a Kendo UI DropDownList."
previous_url: /controls/editors/dropdownlist/how-to/disable-items-for-selection
slug: howto_disable_items_for_selection_dropdownlist
---

# Disable Items for Selection

The Kendo UI DropDownList provides an option for displaying list items as non-active.

A possible approach to make items appear as disabled is to apply the `k-state-disabled` CSS class in a Kendo UI Template.

To prevent the future selection of disabled items, add an event handler to the [`select`](/api/javascript/ui/dropdownlist#events-select) event and call `e.preventDefault()`.

###### Example

```html
    <input id="dropdownlist" /> <button class="k-button"> Mark Oranges as deleted</button>
    <script id="template" type="text/x-kendo-template">
    <span class="#: isDeleted ? 'k-state-disabled': ''#">
       #: name #
    </span>
    </script>
    <script>
      $("#dropdownlist").kendoDropDownList({
        dataSource: [
          { id: 1, name: "Apples", isDeleted: false},
          { id: 3, name: "Mangoes", isDeleted: false},
          { id: 2, name: "Oranges" , isDeleted: false}
        ],
        dataTextField: "name",
        dataValueField: "id",
        select: function(e){
          if(e.dataItem.isDeleted){
            e.preventDefault();
          }
        },
        template: kendo.template($("#template").html())
      });

      $(".k-button").click(function(){
        var dropdown = $("#dropdownlist").data("kendoDropDownList");
        var oranges = dropdown.dataSource.get(2);
        oranges.set("isDeleted", true);
      })
    </script>
```

## See Also

Other articles on the Kendo UI DropDownList:

* [DropDownList JavaScript API Reference](/api/javascript/ui/dropdownlist)
* [How to Automatically Adjust the Width of a DropDownList]({% slug howto_automatically_adjust_width_dropdownlist %})
* [How to Create DropDownLists with Long Items]({% slug howto_create_listswith_long_items_dropdownlist %})
* [How to Detect Wrapper Focus Events]({% slug howto_detect_wrapper_focus_events_dropdownlist %})
* [How to Move the Group Label on Top of Items]({% slug howto_move_group_label_ontopof_items_dropdownlist %})
* [How to Prevent Popup Closure on Scroll]({% slug howto_prevent_popup_closure_onscroll_dropdownlist %})
* [How to Remove Items]({% slug howto_remove_items_dropdownlist %})
* [How to Set DataSource Dynamically]({% slug howto_set_datasource_dynamically_dropdownlist %})
* [How to Update MVVM Bound Models on Load]({% slug howto_update_mvvm_model_onload_dropdownlist %})
* [How to Validate DropDownLists by Using Required Attributes]({% slug howto_validate_using_required_attributes_dropdownlist %})

For more runnable examples on the Kendo UI DropDownList, browse its [**How To** documentation folder]({% slug howto_cascade_withngrepeat_distinct_values_dropdownlist %}).
