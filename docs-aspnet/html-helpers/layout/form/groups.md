---
title: Groups
page_title: Groups
description: "Get started with the Telerik UI Form component for {{ site.framework }} and learn how to set up groups."
components: ["form"]
slug: htmlhelpers_form_aspnetcore_groups
position: 6
---

# Groups

The grouping functionality of the Form allows you to create more intuitive forms by displaying fields in logical grouped sections. 

The following example shows a Form configured to display its editors in two groups.

```HtmlHelper
    @(Html.Kendo().Form<Kendo.Mvc.Examples.Models.Form.FormOrderViewModel>()
        .Name("exampleForm")
        .HtmlAttributes(new { action = "Groups", method = "POST" })
        .Validatable(v =>
        {
            v.ValidateOnBlur(true);
            v.ValidationSummary(vs => vs.Enable(false));
        })
        .Items(items =>
        {
            items.AddGroup()
                .Label("Personal Information")
                .Layout("grid")
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
                .Items(i =>
                {
                    i.Add()
                            .Field(f => f.ShipCountry)
                            .Label(l => l.Text("Country:"))
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
                        .Label(l => l.Text("City:"));
                    i.Add()
                        .Field(f => f.Address)
                        .Label(l => l.Text("Address Line:"));
                });

                items.Add()
                .Field(f => f.Agree)
                .Label(l => l.Text("Agree to Terms:"));
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-form name="exampleForm" form-data="@Model" method="POST" asp-action="Items">
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
```
{% endif %}

> The Form does not support group nesting.

## See Also

* [Groups Demo of the Form HtmlHelper for {{ site.framework }}](https://demos.telerik.com/{{ site.platform }}/form/groups)
* [Server-Side API](/api/form)
