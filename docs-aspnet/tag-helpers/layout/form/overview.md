---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Form TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /helpers/form, /helpers/tag-helpers/form
slug: taghelpers_form_aspnetcore
position: 1
---

# Form TagHelper Overview

The Telerik UI Form TagHelper for ASP.NET Core is a server-side wrapper for the Kendo UI Form widget.

The Telerik UI Form TagHelper for ASP.NET Core allows you to generate and manage forms. Through a variety of configuration options, it makes creating and customizing forms a seamless experience. Achieve the desired form appearance by using default or custom editors, choose layout and orientation, display the editors in groups and columns, and configure validation.

* [Demo page for the Form](https://demos.telerik.com/aspnet-core/form/tag-helper)

## Initializing the Form

The following example demonstrates how to define the Form Component by using the Form TagHelper:

```tagHelper
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
```cshtml
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

## Referencing Existing Instances

The following example demonstrates a basic configuration for the Form TagHelper and how to get a reference to an existing client-side Form instance:


    <kendo-form name="tagHelperForm" form-data="@Model" method="POST" asp-controller="Form" asp-action="Tag_Helper">
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

    <script>
        $(document).ready(function () {
        // The Name() of the Form is used to get its client-side instance.
        var form = $("#tagHelperForm").data("kendoForm");
        });
    </script>

## See Also

* [Basic Usage of the Form TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/form/tag-helper)
* [Form Server-side API](https://docs.telerik.com/aspnet-core/api/form)
* [Form Client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/form)

