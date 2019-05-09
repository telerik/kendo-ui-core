---
title: Troubleshooting
page_title: jQuery Grid Documentation | Editing Troubleshooting | Kendo UI
description: "Get started with the editing functionality of the jQuery Grid by Kendo UI and troubleshoot any issues that might occur while editing its data."
previous_url: /controls/data-management/grid/editing/troubleshooting
slug: edittroubleshoot_kendoui_grid_widget
position: 80
---

# Editing Troubleshooting

This article provides solutions for issues you might encounter while working with the editing functionality of the Grid.

* [Setting null values for foreign key columns leaves a column value blank](#setting-null-values-for-foreign-key-columns-leaves-a-column-value-blank)
* [Changing the MultiSelect value when used as a custom editor does not trigger the save event of the Grid](#changing-the-multiselect-value-when-used-as-a-editor-does-not-trigger-the-save-event-of-the-grid)
* [Editing Boolean columns renders styles improperly](#editing-boolean-columns-renders-styles-improperly)

## Setting null values for foreign key columns leaves a column value blank

Normally, a foreign key column is bound to a numeric data field which points to the unique keys of a separate collection. If some of the values in the foreign key column are `null`, an issue related to editing might occur. While such issues do not affect the display mode, they mislead the column editor by indicating that it has to handle object values instead of primitive values. As a result, when a value is picked from the MultiSelect, the widget sets an object value to the data item of the Grid (for example, `{text: "Foo", value: 3}`) instead of a numeric value (for example, `3`) which causes the Grid cell to remain blank upon exiting the edit mode.

To work around the issue, use either of the following approaches:

* Use zeros instead of nulls to match the data values with the declared data field type.
* Use a [custom column editor](http://demos.telerik.com/kendo-ui/grid/editing-custom) with a manually configured DropDownList that has a [`valuePrimitive`](/api/javascript/ui/dropdownlist/configuration/valueprimitive) setting set to `true`.

For a runnable example on implementing foreign-key columns in the Grid, refer to [this demo](https://demos.telerik.com/kendo-ui/grid/foreignkeycolumn).

## Changing the MultiSelect value when used as a custom editor does not trigger the save event of the Grid

When a Kendo UI MultiSelect is used as a custom editor in the Grid and the value of the MultiSelect is changed, the `save` event of the Grid is not triggered. The reason is that the value of the MultiSelect is a reference type (`array`) which prevents the normal usage of the `model.set()` function for setting the value of the corresponding model property.

To work around this issue, define a custom data-binding mechanism. After applying this fix, the `save` event of the Grid is properly triggered each time a new selection is added to the value of the MultiSelect. For a runnable example, refer to the article on [using the MultiSelect as a custom editor in the Grid]({% slug howto_usemultiselectascustomeditor_grid %}).

## Editing Boolean columns renders styles improperly  

When editing is applied to a Boolean column, the Grid renders a standard, CheckBox element input type by default. The custom CheckBox editor enables you to unify the look of the Grid editors by applying additional styles to the CheckBox that are based on the used CSS theme.

The following example demonstrates how to use Kendo UI-styled CheckBox editor for Boolean columns. For a runnable example, refer to [this demo on editing](http://demos.telerik.com/kendo-ui/grid/editing).

###### Example

    function customBoolEditor(container, options) {
        $('<input class="k-checkbox" type="checkbox" name="Discontinued" data-type="boolean" data-bind="checked:Discontinued">').appendTo(container);
        $('<label class="k-checkbox-label">&#8203;</label>').appendTo(container);
    }

## See Also

* [Implementing Foreign-Key Columns in the Grid (Demo)](https://demos.telerik.com/kendo-ui/grid/foreignkeycolumn)
* [Knowledge Base Section](/knowledge-base)
* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
