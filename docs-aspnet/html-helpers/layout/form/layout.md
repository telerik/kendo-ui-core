---
title: Layout
page_title: Layout
description: "Get started with the Telerik UI Form HtmlHelper for {{ site.framework }} and learn about the layouts it supports."
slug: htmlhelpers_form_aspnetcore_layout
position: 4
---

# Layout

In addition the default layout, the Form offers an option to use `Grid` layout. It can be set through the `Layout` option.

> Grid layout is supported only on modern browsers. Even so, not all browsers that support grid layout support all features.

## Grid Layout

To use this layout set the `Layout` option to `grid`, specify the number of columns and the gutter between them. The Form supports up to 12 columns.

```Razor
    .Layout("grid")
    .Grid(g => g.Cols(2).Gutter(20))
```

The following example shows the Form with `grid` layout set.

```Razor
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

## See Also

* [Layout Demo of the Form HtmlHelper for {{ site.framework }}](https://demos.telerik.com/{{ site.platform }}/form/layout)
* [Server-Side API](/api/form)
