---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI Form component for {{ site.framework }}."
slug: form_events
position: 4
---

# Events

The Telerik UI Form for {{ site.framework }} [exposes a number of JavaScript events](/api/kendo.mvc.ui.fluent/formeventbuilder) that allow you to control the behavior of the UI component.

## Subscribing to Events

You can subscribe to all events of the Form component.

The following example shows a Form configured to handle its `validate`, `submit` and `clear` events.
```HtmlHelper
    <div id="validation-success"></div>
    @(Html.Kendo().Form<Kendo.Mvc.Examples.Models.Form.UserViewModel>()
        .Name("formExample")
        .HtmlAttributes(new { action = "Index", method = "POST" })
        .Validatable(v =>
        {
            v.ValidateOnBlur(true);
            v.ValidationSummary(vs => vs.Enable(false));
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
                        .Field(f => f.UserName)
                        .Label(l => l.Text("Username:"));
                    i.Add()
                        .Field(f => f.Email)
                        .Label(l => l.Text("Email:"));
                     i.Add()
                        .Field(f => f.DateOfBirth)
                        .Label(l => l.Text("Date of Birth:").Optional(true));
                    i.Add()
                        .Field(f => f.Agree)
                        .Label(l => l.Text("Agree to Terms:"));
                });
        })
        .Events(ev => ev.ValidateField("onFormValidateField").Submit("onFormSubmit").Clear("onFormClear"))
```
{% if site.core %}
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
```
{% endif %}
```JavaScript
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
```


## Next Steps

* [Using the Form Events (Demo)](https://demos.telerik.com/{{ site.platform }}/form/events)

## See Also

* [Using the API of the Form for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/form/api)
* [Assigning predefined resources to the Form (Demo)](https://demos.telerik.com/{{ site.platform }}/form/resources)
* [Server-Side API of the Form](/api/form)
* [Client-Side API of the Form](https://docs.telerik.com/kendo-ui/api/javascript/ui/form)