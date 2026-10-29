---
title: How to Set a Grid CheckBox to Checked for New Records
description: "Learn how to set a Grid CheckBox to checked by default for new records in Telerik UI for {{ site.framework }}."
type: how-to
page_title: Set a Grid CheckBox to Checked for New Records
slug: grid-checkbox-default-checked
tags: grid, checkbox, default value, add new record, boolean
ticketid: 1594389
ticketed: true
res_type: kb
components: ["grid"]
component: grid
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product Version</td>
            <td>2023.1.117</td>
        </tr>
        <tr>
            <td>Product</td>
            <td>Grid for {{ site.framework }}</td>
        </tr>
    </tbody>
</table>

## Description

When you add a new record in the Grid, a CheckBox bound to a Boolean field may appear unchecked. To have it checked by default, set the field's default value in the Grid DataSource model.

## Solution

1. Define a Boolean property in the model and bind a Grid column to it.
2. Set the field's default value to `true` in the Grid DataSource model.
3. Configure the Grid to allow users to add records.

The following model uses `TestBoolean` for the CheckBox field:

```C#.skip-repl
public class OrderViewModel
{
    public int OrderID { get; set; }
    public bool TestBoolean { get; set; }
}
```

### HtmlHelper

Set `DefaultValue(true)` on the Boolean field in the DataSource model:

```HtmlHelper.skip-repl
@(Html.Kendo().Grid<OrderViewModel>()
    .Name("orders")
    .Columns(columns => columns
        .Bound(order => order.TestBoolean))
    .ToolBar(toolbar => toolbar.Create())
    .Editable(editable => editable.Mode(GridEditMode.PopUp))
    .DataSource(dataSource => dataSource
        .Ajax()
        .Model(model =>
        {
            model.Id(order => order.OrderID);
            model.Field(order => order.TestBoolean).DefaultValue(true);
        })
        .Read(read => read.Action("Orders_Read", "Grid"))
        .Create(create => create.Action("Orders_Create", "Grid"))
        .Update(update => update.Action("Orders_Update", "Grid"))
    )
)
```

{% if site.core %}
### TagHelper

Set the Boolean field's `default-value` to `true` in the DataSource schema:

```TagHelper.skip-repl
@addTagHelper *, Kendo.Mvc

<kendo-grid name="orders">
    <toolbar>
        <toolbar-button name="create" />
    </toolbar>
    <editable mode="popup" />
    <columns>
        <column field="TestBoolean" />
    </columns>
    <datasource type="DataSourceTagHelperType.Ajax" page-size="20">
        <transport>
            <read url="@Url.Action("Orders_Read", "Grid")" />
            <create url="@Url.Action("Orders_Create", "Grid")" />
            <update url="@Url.Action("Orders_Update", "Grid")" />
        </transport>
        <schema>
            <model id="OrderID">
                <fields>
                    <field name="TestBoolean" type="boolean" default-value="true"></field>
                </fields>
            </model>
        </schema>
    </datasource>
</kendo-grid>
```
{% endif %}

### Test the Behavior

1. Open the Grid and select **Add new record**.
2. Confirm that the `TestBoolean` CheckBox is checked in the popup editor.
3. Save the record and confirm that `TestBoolean` is `true`.

## See Also

- [Grid Editing Overview]({% slug htmlhelpers_grid_aspnetcore_editing_overview %})
- [Frequently Asked Questions]({% slug freqaskedquestions_gridhelper_aspnetmvc %})
- [Configuring Editable CheckBox Columns in the Grid]({% slug grid-checkbox-column %})
