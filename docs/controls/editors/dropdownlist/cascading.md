---
title: Cascading DropDownLists
page_title: jQuery DropDownList Documentation | Cascading DropDownLists | Kendo UI
description: "Get started with the jQuery DropDownList by Kendo UI and learn how to implement a series of two or more DropDownLists and cascade them."
slug: cascading_kendoui_ddl_widget
position: 8
---

# Cascading DropDownLists

The [cascading DropDownList](https://demos.telerik.com/kendo-ui/dropdownlist/cascadingdropdownlist) is a series of two or more DropDownLists in which each DropDownList is filtered according to the selected options in the previous DropDownList.

## Basic Concepts and Requirements

The child DropDownList cascades from the parent one if the [`cascadeFrom`](/api/javascript/ui/dropdownlist/configuration/cascadefrom) option is defined. The `cascadeFrom` option has to point to the parent `ID`.

The child DropDownList takes the following actions during initialization:
- Checks if the `cascadeFrom` property is set. If not, cascading is disabled.
- Tries to find the parent DropDownList object. If the result is `null`, then the functionality is omitted.
- Listens to any changes of the parent value.
- If the parent does not have a value, the child is disabled. If the parent has a value, the child is enabled and filters its data accordingly. The filter options are similar to the following:

        field: "parentID",  //the dataValueField of the parent
        operator: "eq",
        value: "" // Parent's value.

    The following example demonstrates the parameters of this request.

        filter[logic]: and
        filter[filters][0][field]: parentID
        filter[filters][0][operator]: eq
        filter[filters][0][value]:

> * The cascading functionality works only when you define the `cascadeFrom` property and initialize the parent DropDownList.
> * The filter operator is always `"eq"`. To filter the data, the child DropDownList uses the `dataValueField` option of the parent DropDownList.

## Enabling Cascading

The following example demonstrates how to initialize a cascading DropDownList.

###### Example

    <input id="parent" />
    <input id="child" />

    <script type="text/javascript">
         $(function() {
             $("#parent").kendoDropDownList({
                dataTextField: "parentName",
                dataValueField: "parentID"
                // Define the settings for the DropDownList.
             });

             $("#child").kendoDropDownList({
                cascadeFrom: "parent"
                // Define other settings.
             });
         });
    </script>

## MVVM Value Binding

The MVVM [`value`]({% slug valuebinding_mvvm_kendoui %}) binding updates the `model` when a UI element triggers a `change` event. When widgets cascade, however, they do not raise a `change` event and the `model` is not updated.

* For more information on how to sync a `model` by implementing a [custom MVVM binding]({% slug custombinding_mvvm_kendoui %}) that will update the model accordingly, refer to [this runnable demo example](http://dojo.telerik.com/@ggkrustev/aSAlU) .
* For more information on why a widget does not trigger a `change` event, refer to [this GitHub discussion](http://github.com/telerik/kendo-ui-core/issues/661).

## See Also

* [Cascading DropDownLists (Demo)](https://demos.telerik.com/kendo-ui/dropdownlist/cascadingdropdownlist)
* [JavaScript API Reference of the DropDownList](/api/javascript/ui/dropdownlist)
