---
title: Make The DropDwonList Required
page_title: Make The DropDwonList Required | Kendo UI DropDownList
description: "Learn how to make the selection in Kendo UI DropDownList widget required."
previous_url: /controls/editors/dropdownlist/how-to/make-dropdownlist-required
slug: howto_make_dropdownlist_required
---

# How To Make The DropDownList Required

The DropDownList enables you to initialize it by using the `input` or the `select` element. In cases where selection from the DropDownList is mandatory initialize it from an `input` or `select` element with a `required` attribute. The example below uses the Kendo Validator to display the validation message.

```dojo
    <form id="myForm" action="someAction" method="post">
      <input id="ddl" name="color" required/>
    </form>
    <button id="submitBtn" type="submit"  class="k-button">Submit</button>
   
    <script>
      $("#ddl").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [
          { text: "Black", value: "1" },
          { text: "Orange", value: "2" },
          { text: "Grey", value: "3" }
        ],
        optionLabel: "Select an option",
      });

      $("#submitBtn").click(function () {
          var validator = $("#myForm").kendoValidator().data('kendoValidator');
          validator.validate();
      });
    </script>
```

## See Also

* [JavaScript API Reference of the DropDownList](/api/javascript/ui/dropdownlist)
* [How to Automatically Adjust the Width of a DropDownList]({% slug howto_automatically_adjust_width_dropdownlist %})
* [How to Create DropDownLists with Long Items]({% slug howto_create_listswith_long_items_dropdownlist %})
* [How to Detect Wrapper Focus Events]({% slug howto_detect_wrapper_focus_events_dropdownlist %})
* [How to Move the Group Label on Top of Items]({% slug howto_move_group_label_ontopof_items_dropdownlist %})
* [How to Prevent Popup Closure on Scroll]({% slug howto_prevent_popup_closure_onscroll_dropdownlist %})
* [How to Remove Items]({% slug howto_remove_items_dropdownlist %})
* [How to Set DataSource Dynamically]({% slug howto_set_datasource_dynamically_dropdownlist %})
* [How to Update MVVM Bound Models on Load]({% slug howto_update_mvvm_model_onload_dropdownlist %})
* [How to Validate DropDownLists by Using Required Attributes]({% slug howto_validate_using_required_attributes_dropdownlist %})

For more runnable examples on the Kendo UI DropDownList, browse its [**How To** documentation folder]({% slug howto_bindobjectstongmodel_dropdownlist %}).
