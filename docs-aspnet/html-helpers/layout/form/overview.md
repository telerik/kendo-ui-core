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

## Referencing Existing Instances

The following example demonstrates a basic configuration for the Form and how to get a reference to an existing Form client-side instance:

```HtmlHelper
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
{% if site.core %}
```TagHelper
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
```
{% endif %}

## Functionality and Features

* [Items]({% slug htmlhelpers_form_aspnetcore_items %})
* [Layout]({% slug htmlhelpers_form_aspnetcore_layout %})
* [Groups]({% slug htmlhelpers_form_aspnetcore_groups %})
* [Orientation]({% slug htmlhelpers_form_aspnetcore_orientation %})
* [Validation]({% slug htmlhelpers_form_aspnetcore_validation %})
* [Accessibility]({% slug htmlhelpers_form_aspnetcore_accessibility %})
* [Hidden Fields]({% slug htmlhelpers_form_aspnetcore_hiddenfields %})

{% if site.core %}

## Events

You can subscribe to all events of the Form component.

The following example shows a Form configured to handle its `validate`, `submit` and `clear` events.

```TagHelper
    <kendo-form name="exampleForm" form-data="@Model" method="POST" asp-action="Items" on-validate-field="onFormValidateField" on-submit="onFormSubmit" on-clear="onFormClear">
        <validatable validate-on-blur="true" validation-summary="true" />
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
            <form-item type="group">
                 <form-item field="MaskedTextBox">
                        <item-label text="MaskedTextBox:" optional="true" />
                        <maskedtextbox-editor></maskedtextbox-editor>
                    </form-item>
                    <form-item field="DatePicker">
                        <item-label text="DatePicker:" optional="true" />
                    </form-item>
            </form-item>
        </form-items>
    </kendo-form>

    <script>
        function onFormValidateField(e) {
            $("#validation-success").html("");
        }

        function onFormSubmit(e) {
            e.preventDefault();
            $("#validation-success").html("<div class='k-messagebox k-messagebox-success'>Form data is valid!</div>");
        }

        function onFormClear(e) {
            $("#validation-success").html("");
        }
    </script>
```
{% endif %}

## See Also

* [Basic Usage of the Form HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/form/index)
{% if site.core %}
* [Basic Usage of the Form TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/form/tag-helper)
{% endif %}
* [Using the API of the Form HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/form/api)
* [Server-Side API](/api/form)
