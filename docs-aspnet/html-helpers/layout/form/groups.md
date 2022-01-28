---
title: Groups
page_title: Groups
description: "Get started with the Telerik UI Form HtmlHelper for {{ site.framework }} and learn how to set up groups."
slug: htmlhelpers_form_aspnetcore_groups
position: 5
---

# Groups

The grouping functionality of the Form allows you to create more intuitive forms by displaying fields in logical grouped sections. 

The following example shows a Form configured to display its editors in two groups.

```Razor
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

> The Form does not support group nesting.

## See Also

* [Groups Demo of the Form HtmlHelper for {{ site.framework }}](https://demos.telerik.com/{{ site.platform }}/form/groups)
* [Server-Side API](/api/form)
