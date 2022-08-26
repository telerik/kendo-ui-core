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

## Responsive Form

You can use [Media Queries](https://docs.telerik.com/kendo-ui/styles-and-layout/using-kendo-in-responsive-web-pages#media-queries) to enhance the Form appearance on different form factors. [The following example](https://netcorerepl.telerik.com/cmaibrbF27FhokP833) demonstrates how you can use Media Queries to override the default CSS rules in order to change the Form Layout from two columns to a single column on devices with screen width of 600px or less:

{% if site.core %}
```HtmlHelper
    <style>
      @media screen and (max-width: 600px) { //Resize the screen to less than 600px and check out the styling in action.
        .k-form-field{
          grid-column-start: 1;
          grid-column-end: span 1;
        }
        fieldset{
            grid-column-start: 1;
            grid-column-end: span 1;
        }
        div.k-form-layout.k-d-grid.k-grid-cols-2 {
            grid-template-columns:repeat(1, minmax(0px, 1fr));         
        }
      }
    </style>

    @(Html.Kendo().Form<Kendo.Mvc.Examples.Models.Form.FormOrderViewModel>()
        .Name("responsiveLayoutForm")
        .HtmlAttributes(new { action = @Url.Action("MyAction","MyController"), method = "POST" })
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
                });

            items.AddGroup()
                .Label("Shipping Address")
                .Layout("grid")
                .Grid(g => g.Cols(2).Gutter(10))
                .Items(i =>
                {
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
```TagHelper
    @addTagHelper *, Kendo.Mvc
    @model Kendo.Mvc.Examples.Models.Form.FormOrderViewModel

    <style>
      @media screen and (max-width: 600px) { //Resize the screen to less than 600px and check out the styling in action.
        .k-form-field{
          grid-column-start: 1;
          grid-column-end: span 1;
        }
        fieldset{
            grid-column-start: 1;
            grid-column-end: span 1;
        }
        div.k-form-layout.k-d-grid.k-grid-cols-2 {
            grid-template-columns:repeat(1, minmax(0px, 1fr));         
        }
      }
    </style>

    <kendo-form name="responsiveLayoutForm" form-data="@Model" action="MyAction" controller="MyController" method="POST"
        layout="grid">
        <grid cols="2" gutter="20" />
        <form-items>
            <form-item type="group">
                <item-label text="Personal Information" />
                <form-items>
                    <form-item field="FirstName">
                        <item-label text="First Name:">
                    </form-item>
                    <form-item field="LastName">
                        <item-label text="Last Name:">
                    </form-item>
                </form-items>
            </form-item>
            <form-item type="group">
                <item-label text="Shipping Address" />
                <form-items>
                    <form-item field="City" col-span="1">
                        <item-label text="City:">
                    </form-item>
                    <form-item field="Address" col-span="2">
                        <item-label text="Address Line:">
                    </form-item>
                </form-items>
            </form-item>
        </form-items>
    </kendo-form>

```
{% else %}
```HtmlHelper
    <style>
      @media screen and (max-width: 600px) { //Resize the screen to less than 600px and check out the styling in action.
        .k-form-field{
          grid-column-start: 1;
          grid-column-end: span 1;
        }
        fieldset{
            grid-column-start: 1;
            grid-column-end: span 1;
        }
        div.k-form-layout.k-d-grid.k-grid-cols-2 {
            grid-template-columns:repeat(1, minmax(0px, 1fr));         
        }
      }
    </style>

    @(Html.Kendo().Form<Kendo.Mvc.Examples.Models.Form.FormOrderViewModel>()
        .Name("responsiveLayoutForm")
        .HtmlAttributes(new { action = @Url.Action("MyAction","MyController"), method = "POST" })
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
                });

            items.AddGroup()
                .Label("Shipping Address")
                .Layout("grid")
                .Grid(g => g.Cols(2).Gutter(10))
                .Items(i =>
                {
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
{% endif %}

For more information on the Grid layout of the Form, refer to [the official CSS Grid documentation](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout).

## See Also

* [Layout Demo of the Form HtmlHelper for {{ site.framework }}](https://demos.telerik.com/{{ site.platform }}/form/layout)
* [Server-Side API](/api/form)
