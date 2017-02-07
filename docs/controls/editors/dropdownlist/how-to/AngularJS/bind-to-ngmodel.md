---
title: Bind Objects to ngModel
page_title: Bind Objects to ngModel | Kendo UI DropDownList
description: "Learn how to bind objects to ngModel instead of to primitive values in the Kendo UI DropDownList widget."
slug: howto_bindobjectstongmodel_dropdownlist
---

# Bind Objects to ngModel

To bind an object to the `ngModel` in a Kendo UI DropDownList, use the `k-ng-model`.

The `k-ng-model` binding does not update the internal `$dirty` and `$pristine` properties that are used by the built-in AngularJS validation. This approach also works for the [Kendo UI ComboBox]({% slug overview_kendoui_combobox_widget %}) widget.

For more information on the differences between the `ng-model` and `k-ng-model` bindings, refer to the section on [scope bindings]({% slug angularjs_integration_directives %}#scope-bindings).

For more information on how to alternatively use the Kendo UI Validator, refer to the [runnable example on validation](http://demos.telerik.com/kendo-ui/validator/angular) and to the [introductory article of the Validator]({% slug overview_kendoui_validator_widget %}).

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

For more runnable examples on the Kendo UI DropDownList, browse its [**How To** documentation folder]({% slug howto_cascade_withngrepeat_distinct_values_dropdownlist %}).
