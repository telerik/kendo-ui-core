---
title: Orientation
page_title: Orientation
description: "Get started with the Telerik UI Form component for {{ site.framework }} and learn about its orientation options."
slug: htmlhelpers_form_aspnetcore_orientation
position: 7
---

# Orientation

The Form can render labels above or to the left of their respective editors. This behavior is controlled with the `Orientation` configuration option.

To configure orientation, use either of the following settings:

* `vertical`
* `horizontal`

## Vertical Mode

By default, the Form uses `vertical` orientation mode and renders the labels above their editors.

```HtmlHelper
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
{% if site.core %}
```TagHelper
    @model Kendo.Mvc.Examples.Models.Form.UserViewModel

     <kendo-form name="formExample" orientation="vertical" form-data="@Model" action="Index" method="POST">
        <form-items>
            <form-item type="group">
                <item-label text="Registration Form">
                    <form-items>
                        <form-item field="FirstName">
                            <item-label text="FirstName" />
                        </form-item>
                        <form-item field="LastName">
                            <item-label text="Last Name:">
                        </form-item>
                        <form-item field="UserName">
                            <item-label text="Username:">
                        </form-item>
                        <form-item field="Password" hint="Hint: enter alphanumeric characters only.">
                            <item-label text="Password:">
                        </form-item>
                    </form-items>
            </form-item>
        </form-items>
    </kendo-form>
```
{% endif %}

## Horizontal Mode

Set the `Orientation` option to `horizontal`, if you want to render labels to the left of their editors.

```HtmlHelper
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
{% if site.core %}
```TagHelper
    @model Kendo.Mvc.Examples.Models.Form.UserViewModel

     <kendo-form name="formExample" orientation="horizontal" form-data="@Model" action="Index" method="POST">
        <form-items>
            <form-item type="group">
                <item-label text="Registration Form">
                    <form-items>
                        <form-item field="FirstName">
                            <item-label text="FirstName" />
                        </form-item>
                        <form-item field="LastName">
                            <item-label text="Last Name:">
                        </form-item>
                        <form-item field="UserName">
                            <item-label text="Username:">
                        </form-item>
                        <form-item field="Password" hint="Hint: enter alphanumeric characters only.">
                            <item-label text="Password:">
                        </form-item>
                    </form-items>
            </form-item>
        </form-items>
    </kendo-form>
    ```
{% endif %}

## See Also

* [Orientation Demo of the Form HtmlHelper for {{ site.framework }}](https://demos.telerik.com/{{ site.platform }}/form/orientation)
* [Server-Side API](/api/form)
