---
title: Use a DropDownList in a Grid Popup Editor
page_title: Use a DropDownList in a Grid Popup Editor
description: "Use a DropDownList in a {{ site.framework }} Grid popup editor and read its selected value and data item."
slug: dropdownlist-in-grid-popup-editor
type: how-to
res_type: kb
tags: aspnet, core, grid, dropdownlist, popup, editor, editing
components: ["general"]
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Grid and DropDownList</td>
 </tr>
</table>

## Description

How can I read the selected value and data item of a DropDownList used as a Grid popup editor?

## Solution

Use a DropDownList editor template for the Grid field. `UseMvvmInitialization(true)` keeps the DropDownList bound to the Grid model, and `ValuePrimitive(true)` binds a nullable primitive field to the selected `DataValueField`. Handle the DropDownList `DataBound` event to read its selection after its data is available.

The example uses the HtmlHelper editor template because `UseMvvmInitialization(true)` is an HtmlHelper configuration option.

The following model uses a nullable category ID:

```C# Model
public class OrderViewModel
{
    public int OrderID { get; set; }

    [System.ComponentModel.DataAnnotations.UIHint("CategoryDropDownList")]
    public int? CategoryID { get; set; }
}
```

Configure the Grid for popup editing and use the `CategoryDropDownList` editor template for the `CategoryID` field:

```HtmlHelper
@(Html.Kendo().Grid<OrderViewModel>()
    .Name("orders")
    .Columns(columns =>
    {
        columns.Bound(order => order.OrderID);
        columns.Bound(order => order.CategoryID).EditorTemplateName("CategoryDropDownList");
        columns.Command(command => command.Edit());
    })
    .Editable(editable => editable.Mode(GridEditMode.PopUp))
    .DataSource(dataSource => dataSource
        .Ajax()
        .Model(model => model.Id(order => order.OrderID))
        .Read(read => read.Action("Orders_Read", "Home"))
        .Update(update => update.Action("Orders_Update", "Home"))
    )
)
```

Create `CategoryDropDownList.cshtml` in the `Views/Shared/EditorTemplates` folder:

```Razor CategoryDropDownList.cshtml
@model int?

@(Html.Kendo().DropDownListFor(model => model)
    .DataTextField("CategoryName")
    .DataValueField("CategoryID")
    .OptionLabel("Select category...")
    .DataSource(source => source
        .Read(read => read.Action("Categories_Read", "Home"))
    )
    .ValuePrimitive(true)
    .UseMvvmInitialization(true)
    .HtmlAttributes(new { data_bind = "value: CategoryID" })
    .Events(events => events.DataBound("onCategoryDataBound"))
)
```

Read the selected value and data item in the DropDownList `DataBound` handler. The `value()` method returns the selected key, and `dataItem()` returns the selected record from the data source.

```JavaScript
function onCategoryDataBound(e) {
    var dropDownList = e.sender;

    console.log(dropDownList.value(), dropDownList.dataItem());
}
```

## See Also

* [Grid Editing Overview]({% slug htmlhelpers_grid_aspnetcore_editing_overview %})
* [DropDownList Model Binding]({% slug htmlhelpers_dropdownlist_modelbinding_aspnetcore %})
