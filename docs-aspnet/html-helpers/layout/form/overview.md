---
title: Overview
page_title: Overview
description: "Get started with the Telerik UI Form component for {{ site.framework }} and learn about its features and how to initialize the component."
slug: htmlhelpers_form_aspnetcore_overview
position: 1
---

# {{ site.framework }} Form Overview

{% if site.core %}
The Telerik UI Form TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI Form widget.
{% else %}
The Telerik UI Form HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI Form widget.
{% endif %}

The Telerik UI Form for {{ site.framework }} allows you to generate and manage forms. Through a variety of configuration options, it makes creating and customizing forms a seamless experience. Achieve the desired form appearance by using default or custom editors, choose layout and orientation, display the editors in groups and columns, and configure validation.

* [Demo page for the Form HtmlHelper](https://demos.telerik.com/{{ site.platform }}/form/index)
{% if site.core %}
* [Demo page for the Form TagHelper](https://demos.telerik.com/aspnet-core/form/tag-helper)
{% endif %}

## Initializing the Form

The following example demonstrates how to define the Form.

{% if site.core %}
```HtmlHelper
        @(Html.Kendo().Form<MyApplication.Models.UserViewModel>()
        .Name("form")
        .HtmlAttributes(new { action = "Index", method = "POST" })
        .Validatable(v =>
        {
            v.ValidateOnBlur(true);
            v.ValidationSummary(vs => vs.Enable(true));
        })
        .Items(items =>
        {
            items.AddGroup()
                .Label("Registration Form")
                .Items(i =>
                {
                    i.Add()
                        .Field(f => f.FirstName)
                        .Label(l => l.Text("First Name:"));
                    i.Add()
                        .Field(f => f.LastName)
                        .Label(l => l.Text("Last Name:"));
                });
        });
    )

```
```TagHelper
    @model Kendo.Mvc.Examples.Models.Form.UserViewModel

    <kendo-form name="form" form-data="@Model" method="POST" asp-controller="Form" asp-action="Tag_Helper">
        <validatable validate-on-blur="true" validation-summary="true" />
        <form-items>
            <form-item type="group">
                <item-label text="Registration Form" />
                <form-items>
                    <form-item field="FirstName">
                        <item-label text="First Name:" />
                    </form-item>
                    <form-item field="LastName">
                        <item-label text="Last Name:" />
                    </form-item>
                </form-items>
            </form-item>
        </form-items>
    </kendo-form>

```
{% else %}
```HtmlHelper
    @(Html.Kendo().Form<MyApplication.Models.UserViewModel>()
        .Name("formExample")
        //configure the action and method attributes of the HTML <form> element
        .HtmlAttributes(new { action = @Url.Action("MyAction","MyController"), method = "POST" })
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
{% endif %}

## Functionality and Features
|Feature|Description|
|-------|-----------|
| [Items]({% slug htmlhelpers_form_aspnetcore_items %})| The configuration of the Form Items allows you to customize their appearance and behavior. |
| [Layout]({% slug htmlhelpers_form_aspnetcore_layout %})| You can choose between the default and `Grid` layout. |
| [Groups]({% slug htmlhelpers_form_aspnetcore_groups %})| The Form allows you to group the input fields in logical sections. |
| [Orientation]({% slug htmlhelpers_form_aspnetcore_orientation %})|  You can choose between a `vertical` or `horizontal` orientation of the labels in the Form. |
| [Validation]({% slug htmlhelpers_form_aspnetcore_validation %})| The Form has a built-in validator to enable seamless client-side validaiton. |
| [Accessibility]({% slug htmlhelpers_form_aspnetcore_accessibility %})| The Form is accessible by screen readers and provides WAI-ARIA, Section 508, and WCAG 2.2 support. |
| [Hidden Fields]({% slug htmlhelpers_form_aspnetcore_hiddenfields %})| You can hide certain fields like the `ID`. |
## Next Steps

* [Getting Started with the Form]({% slug form_getting_started %})
* [Basic Usage of the Form HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/form/index)
{% if site.core %}
* [Basic Usage of the Form TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/form/tag-helper)
{% endif %}

## See Also

* [Using the API of the Form for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/form/api)
* [Server-Side API](/api/form)
