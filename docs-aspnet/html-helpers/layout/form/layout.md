---
title: Layout
page_title: Layout
description: "Get started with the Telerik UI Form component for {{ site.framework }} and learn about the layouts it supports."
slug: htmlhelpers_form_aspnetcore_layout
position: 4
---

# Layout

In addition the default layout, the Form offers an option to use `Grid` layout. It can be set through the `Layout` option.

> Grid layout is supported only on modern browsers. Even so, not all browsers that support grid layout support all features.

## Grid Layout

To use this layout set the `Layout` option to `grid`, specify the number of columns and the gutter between them. The Form supports up to 12 columns.

```HtmlHelper
    .Layout("grid")
    .Grid(g => g.Cols(2).Gutter(20))
```
{% if site.core %}
```TagHelper
    <grid  cols="2" gutter="20"/>
```
{% endif %}

The following example shows the Form with `grid` layout set.

```HtmlHelper
    @(Html.Kendo().Form<MyApplication.Models.FormOrderViewModel>()
        .Name("exampleForm")
        .HtmlAttributes(new { action = "Layout", method = "POST" })
        .Layout("grid")
        .Grid(g => g.Cols(2).Gutter(20))
        .Items(items =>
        {
            items.AddGroup()
                .Label("Personal Information")
                .Layout("grid")
                .Grid(g => g.Cols(1).Gutter(10))
                .Items(i =>
                {
                    i.Add()
                        .Field(f => f.FirstName)
                        .Label(l => l.Text("First Name:"));
                    i.Add()
                        .Field(f => f.LastName)
                        .Label(l => l.Text("Last Name:"));
                    i.Add()
                        .Field(f => f.Email)
                        .Label(l => l.Text("Email:"));
                });

            items.AddGroup()
                .Label("Shipping Address")
                .Layout("grid")
                .Grid(g => g.Cols(2).Gutter(10))
                .Items(i =>
                {
                    i.Add()
                        .Field(f => f.ShipCountry)
                        .Label(l => l.Text("Country:"))
                        .ColSpan(1)
                        .Editor(e =>
                        {
                            e.ComboBox()
                                .DataTextField("Text")
                                .DataValueField("Value")
                                .BindTo(new List<SelectListItem>() {
                                    new SelectListItem() {
                                        Text = "France", Value = "1"
                                    },
                                    new SelectListItem() {
                                        Text = "Germany", Value = "2"
                                    },
                                    new SelectListItem() {
                                        Text = "Italy", Value = "3"
                                    },
                                    new SelectListItem() {
                                        Text = "Spain", Value = "4"
                                    }
                                });
                        });
                    i.Add()
                        .Field(f => f.City)
                        .Label(l => l.Text("City:"))
                        .ColSpan(1);
                    i.Add()
                        .Field(f => f.Address)
                        .Label(l => l.Text("Address Line:"))
                        .ColSpan(2);
                });
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-form name="exampleForm" form-data="@Model" method="POST" asp-action="Items">
        <validatable validate-on-blur="true" validation-summary="true" />
        <grid  cols="2" gutter="20"/>
        <form-items>
            <form-item type="group">
                <item-label text="Registration Form" />
                <form-items>
                    <form-item field="TextBox">
                        <item-label text="TextBox:"/>
                        <textbox-editor placeholder="TextBox"></textbox-editor>
                    </form-item>
                    <form-item field="NumericTextBox">
                        <item-label text="NumericTextBox:" />
                        <numerictextbox-editor></numerictextbox-editor>
                    </form-item>  
                </form-items>
            </form-item>
        </form-items>
    </kendo-form>
```
{% endif %}

## See Also

* [Layout Demo of the Form HtmlHelper for {{ site.framework }}](https://demos.telerik.com/{{ site.platform }}/form/layout)
* [Server-Side API](/api/form)
