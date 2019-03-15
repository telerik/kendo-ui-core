---
title: Custom
page_title: jQuery Grid Documentation | Custom Editing | Kendo UI
description: "Get started with the editing functionality of the jQuery Grid by Kendo UI allowing you to manipulate the way the data is presented."
slug: customediting_grid
position: 5
---

# Custom Editing

The Grid enables you to implement custom column editors and to specify validation rules that apply while the user edits the data.

## Implementing Custom Editors

To implement a custom editor in the Grid, specify the `editor` field of the respective column. The value of this field will point to a JavaScript function which will instantiate the column editor for the corresponding column cells. For a runnable example, refer to the [demo on editing with custom editors in the Grid](https://demos.telerik.com/kendo-ui/grid/editing-custom).

## Setting Validation Rules

To define a validation rule for the edit operation, configure the `validation` option in the `schema` of the data source. For a runnable example, refer to the [demo on custom validator editing in the Grid](https://demos.telerik.com/kendo-ui/grid/editing-custom-validation).

## See Also

* [Custom Editing by the Grid (Demo)](https://demos.telerik.com/kendo-ui/grid/editing-custom)
* [Custom Validator Editing by the Grid (Demo)](https://demos.telerik.com/kendo-ui/grid/editing-custom-validation)
* [Knowledge Base Section](/knowledge-base)
