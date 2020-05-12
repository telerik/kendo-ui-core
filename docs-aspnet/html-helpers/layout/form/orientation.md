---
title: Orientation
page_title: Orientation
description: "Get started with the Telerik UI Form HtmlHelper for {{ site.framework }} and learn about its orientation options."
slug: htmlhelpers_form_aspnetcore_orientation
position: 6
---

# Orientation

The Form can render labels above or to the left of their respective editors. This behavior is controlled with the `Orientation` configuration option. 

To configure orientation, use either of the following settings:

* `vertical`
* `horizontal`

## Vertical Mode

By default, the Form uses `vertical` orientation mode and renders the labels above their editors.

```Razor
    @(Html.Kendo().Form<MyApplication.Models.UserViewModel>()
        .Name("formExample")
        .Orientation("vertical")
        .HtmlAttributes(new { action = "Index", method = "POST" })
        .Items(items =>
        {
            items.Add()
                .Field(f => f.FirstName)
                .Label(l => l.Text("First Name:"));
            items.Add()
                .Field(f => f.LastName)
                .Label(l => l.Text("Last Name:"));
            items.Add()
                .Field(f => f.UserName)
                .Label(l => l.Text("Username:"));
            items.Add()
                .Field(f => f.Password)
                .Label(l => l.Text("Password:"))
                .Hint("Hint: enter alphanumeric characters only.");
        })
    )
```

## Horizontal Mode

Set the `Оrientation` option to `horizontal`, if you want to render labels to the left of their editors. 

```Razor
    @(Html.Kendo().Form<MyApplication.Models.UserViewModel>()
        .Name("formExample")
        .Orientation("horizontal")
        .HtmlAttributes(new { action = "Index", method = "POST" })
        .Items(items =>
        {
            items.Add()
                .Field(f => f.FirstName)
                .Label(l => l.Text("First Name:"));
            items.Add()
                .Field(f => f.LastName)
                .Label(l => l.Text("Last Name:"));
            items.Add()
                .Field(f => f.UserName)
                .Label(l => l.Text("Username:"));
            items.Add()
                .Field(f => f.Password)
                .Label(l => l.Text("Password:"))
                .Hint("Hint: enter alphanumeric characters only.");
        })
    )
```

## See Also

* [Orientation Demo of the Form HtmlHelper for {{ site.framework }}](https://demos.telerik.com/{{ site.platform }}/form/orientation)
* [Server-Side API](/api/form)
