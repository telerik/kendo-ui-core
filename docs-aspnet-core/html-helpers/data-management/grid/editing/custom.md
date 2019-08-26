---
title: Custom
page_title: Custom Editing | Telerik UI Grid HtmlHelper for ASP.NET Core
description: "Get started with the editing functionality of the Telerik UI Grid HtmlHelper for ASP.NET Core allowing you to manipulate the way the data is presented."
slug: customediting_grid_aspnetcore
position: 5
---

# Custom Editing

The Grid enables you to implement custom column editors and to specify validation rules that apply while the user edits the data.

## Implementing Custom Editors

To implement a custom editor in the Grid, specify the `editor` field of the respective column. The value of this field will point to a JavaScript function which will instantiate the column editor for the corresponding column cells. For a runnable example, refer to the [demo on editing with custom editors in the Grid](https://demos.telerik.com/aspnet-core/grid/editing-custom).

The following example demonstrates how to use the NumericTextBox as a custom editor in the Grid. The UI for ASP.NET Core Visual Studio Templates come with EditorTemplates which are located in `\Views\Shared\EditorTemplates`. To utilize the provided `Number` editor in the [example on the popup edit mode of the Grid]({% slug popupediting_grid_aspnetcore %}), decorate the Model field with a `[UIHint("Number")]` attribute.

```Model
    public class OrderViewModel
    {
        public int OrderID { get; set; }

        public string ShipCountry { get; set; }

        [UIHint("Number")]
        public int? Freight { get; set; }
    }
```
```Editor
    @model int?
    
    @(Html.Kendo().NumericTextBoxFor(m => m)
          .HtmlAttributes(new { style = "width:100%" })
    )
```

## Setting Validation Rules

To define a validation rule on the client-side, extend the Kendo UI for jQuery Validator. The Validator is initialized when an item is in edit mode. For a runnable example, refer to the [demo on custom validator editing in the Grid](https://demos.telerik.com/aspnet-core/grid/editing-custom-validation).

## See Also

* [Custom Editing by the Grid HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/grid/editing-custom)
* [Custom Validator Editing by the Grid HtmlHelper for ASP.NET Core  (Demo)](https://demos.telerik.com/aspnet-core/grid/editing-custom-validation)
