---
title: Overview
page_title: Overview
description: "Get started with the Telerik UI Form HtmlHelper for {{ site.framework }} and learn about its features and how to initialize the component."
slug: htmlhelpers_form_aspnetcore_overview
position: 1
---

# Form Overview

The Telerik UI Form HtmlHelper for {{ site.framework }} allows you to generate and manage forms. Through a variety of configuration options, it makes creating and customizing forms a seamless experience. Achieve the desired form appearance by using default or custom editors, choose layout and orientation, display the editors in groups and columns, and configure validation.

* [Demo page for the Form](https://demos.telerik.com/{{ site.platform }}/form/index)

## Initializing the Form

The following example demonstrates how to define the Form by using the Form HtmlHelper.

```Razor
    @(Html.Kendo().Form<MyApplication.Models.UserViewModel>()
        .Name("formExample")
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

## Referencing Existing Instances

The following example demonstrates a basic configuration for the Form HtmlHelper and how to get a reference to an existing Form client-side instance:

```Razor
    @(Html.Kendo().Form<MyApplication.Models.UserViewModel>()
        .Name("exampleForm")
        .HtmlAttributes(new { action = "Index", method = "POST" })
        .Validatable(v =>
        {
            v.ValidateOnBlur(false);
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
                    i.Add()
                        .Field(f => f.Password)
                        .Label(l => l.Text("Password:"))
                        .Hint("Hint: enter alphanumeric characters only.");
                    i.Add()
                        .Field(f => f.Email)
                        .Label(l => l.Text("Email:"));
                    i.Add()
                        .Field(f => f.Agree)
                        .Label(l => l.Text("Agree to Terms:"));
                });
        });
    )

    <script>
    $(document).ready(function () {
    // The Name() of the Form is used to get its client-side instance.
    var form = $("#exampleForm").data("kendoForm");
    });
    </script>
```

## Functionality and Features

* [Items]({% slug htmlhelpers_form_aspnetcore_items %})
* [Layout]({% slug htmlhelpers_form_aspnetcore_layout %})
* [Groups]({% slug htmlhelpers_form_aspnetcore_groups %})
* [Orientation]({% slug htmlhelpers_form_aspnetcore_orientation %})
* [Validation]({% slug htmlhelpers_form_aspnetcore_validation %})
* [Accessibility]({% slug htmlhelpers_form_aspnetcore_accessibility %})

## See Also

* [Basic Usage of the Form HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/form/index)
* [Using the API of the Form HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/form/api)
* [Server-Side API](/api/form)
