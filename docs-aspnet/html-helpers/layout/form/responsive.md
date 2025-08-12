---
title: Responsive Form
page_title: Responsive Form
description: "Get started with the Telerik UI Form component for {{ site.framework }} and learn how to build responsive forms using the grid layout configuration."
slug: htmlhelpers_form_aspnetcore_responsive
position: 8
---

# Responsive Form

The Form component in {{ site.framework }} provides responsive layouts using a flexible grid structure. The responsive layout automatically adapts to various screen sizes, ensuring optimal usability of the Form across desktop, tablet, and mobile devices.

To enable responsive behavior, set the `Layout()` option to `"grid"` and configure the desired breakpoints through the `Cols()` configuration.

You can control the width and arrangement of form items and groups based on screen width by using the `ColSpan()` method, which dynamically adjusts the layout as the viewport changes.

## Breakpoint Configuration

Define responsive breakpoints through the `Cols()` configuration inside the `Grid()` method. Each breakpoint includes a `MinWidth`, `MaxWidth`, and a `value` that represents the number of columns in the grid.

```HtmlHelper
.Grid(g => g.Cols(c =>
{
    c.Add().MaxWidth(500).Value(3);
    c.Add().MinWidth(501).MaxWidth(768).Value(6);
    c.Add().MinWidth(769).Value(12);
}))
```

{% if site.core %}
```TagHelper
<cols>
    <col max-width="500" value="3" />
    <col min-width="501" max-width="768" value="6" />
    <col min-width="769" value="12" />
</cols>
```
{% endif %}

By default, three breakpoints define the Form columns as follows:

|| **Small** | **Medium** | **Large** |
|-------|-------|--------|-------|
**Dimensions** | up to 500px | 501px to 768px | over 768px |
**Columns** | 3 | 6 | 12 |

The following example shows hot to set a fixed ColSpan for a field.

```HtmlHelper
i.Add().Field(f => f.Email)
    .Label("Email")
    .ColSpan(3)
    .Editor(e => e.TextBox());
```

{% if site.core %}
```TagHelper
<form-item field="Email" col-span="3">
    <item-label text="Email" />
    <textbox-editor />
</form-item>
```
{% endif %}

## ColSpan on Groups

You can apply `ColSpan()` option to Form [groups](slug:htmlhelpers_form_aspnetcore_groups) to define their width in the parent layout.

```HtmlHelper
items.AddGroup()
    .Label("Shipping Address")
    .Layout("grid")
    .ColSpan(6)
    .Items(i =>
    {
        i.Add().Field(f => f.Country)
            .Label("Country")
            .ColSpan(3);
        i.Add().Field(f => f.City)
            .Label("City")
            .ColSpan(3);
    });
```

{% if site.core %}
```TagHelper
<form-item type="group" label="Personal Info" layout="grid" col-span="6">
        <form-items>
            <form-item field="FullName" col-span="3">
                <item-label text="Full name" />
                <textbox-editor />
            </form-item>
            <form-item field="Email" col-span="3">
                <item-label text="Email" />
                <textbox-editor />
            </form-item>
        </form-items>
</form-item>
```
{% endif %}

The example below demonstrates a responsive Form with multiple groups.

```HtmlHelper 

@(Html.Kendo().Form<Kendo.Mvc.Examples.Models.Form.ResponsiveFormViewModel>()
    .Name("responsiveForm")
    .HtmlAttributes(new { method = "POST" })
    .Layout("grid")
    .ClearButton(false)
    .Grid(g => g.Cols(c =>
    {
        c.Add().MaxWidth(500).Value(3);
        c.Add().MinWidth(501).MaxWidth(768).Value(6);
        c.Add().MinWidth(769).Value(12);
    }))
    .Validatable(v =>
    {
        v.ValidateOnBlur(true);
        v.ValidationSummary(vs => vs.Enable(false));
    })
    .Items(items =>
    {
        items.AddGroup()
            .Label("Personal Info")
            .Layout("grid")
            .ColSpan(6)
            .Items(i =>
            {
                i.Add().Field(f => f.FullName)
                    .Label("Full name")
                    .ColSpan(3)
                    .Editor(e => e.TextBox());

                i.Add().Field(f => f.Email)
                    .Label("Email")
                    .ColSpan(3)
                    .Editor(e => e.TextBox());
            });

        items.AddGroup()
            .Label("Address")
            .Layout("grid")
            .ColSpan(6)
            .Items(i =>
            {
                i.Add().Field(f => f.Country)
                    .Label("Country")
                    .ColSpan(3)
                    .Editor(e => e.ComboBox()
                        .Placeholder("EU Country")
                        .BindTo(new[] { "France", "Germany", "Italy", "Spain", "Bulgaria" }));

                i.Add().Field(f => f.City)
                    .Label("City")
                    .ColSpan(3)
                    .Editor(e => e.TextBox());
            });
    }))
```

{% if site.core %}
```TagHelper 

@addTagHelper *, Kendo.Mvc
@model Kendo.Mvc.Examples.Models.Form.ResponsiveFormViewModel

<kendo-form name="responsiveForm" layout="grid" clear-button="false">
    <grid>
        <cols>
            <col max-width="500" value="3" />
            <col min-width="501" max-width="768" value="6" />
            <col min-width="769" value="12" />
        </cols>
    </grid>
    <validatable validate-on-blur="true">
        <validation-summary enable="false" />
    </validatable>
    <form-items>
        <form-item type="group" label="Personal Info" layout="grid" col-span="6">
            <form-items>
                <form-item field="FullName" col-span="3">
                    <item-label text="Full name" />
                    <textbox-editor />
                </form-item>
                <form-item field="Email" col-span="3">
                    <item-label text="Email" />
                    <textbox-editor />
                </form-item>
            </form-items>
        </form-item>
        <form-item type="group" label="Address" layout="grid" col-span="6">
            <form-items>
                <form-item field="Country" col-span="3">
                    <item-label text="Country" />
                    <combobox-editor placeholder="EU Country" bind-to="@ViewBag.CountryData" />
                </form-item>
                <form-item field="City" col-span="3">
                    <item-label text="City" />
                    <textbox-editor />
                </form-item>
            </form-items>
        </form-item>
    </form-items>
</kendo-form>
```
{% endif %}

## Best Practices

When implementing column spanning in the forms, consider the following recommendations:

- Start Mobile-First&mdash;Define responsive breakpoints starting from the smallest screen size and working up to larger viewports.
- Balance ColSpans&mdash;Ensure that all items in a row do not exceed the total grid column width.
- Use Groups&mdash;Group related fields to provide logical structure and improve UX.
- Adjust for Content&mdash;Give more space to fields like addresses or longer inputs.
- Test Across Devices&mdash;Verify that the responsive columns appear as expected across different screen sizes and orientations.

## See Also

* [Creating Responsive Form for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/form/responsive-form)
* [Server-Side API of the Form](/api/form)
{% if site.core %}
* [Server-Side TagHelper API of the Form](/api/taghelpers/form)
{% endif %}