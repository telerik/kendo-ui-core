---
title: Validation
page_title: Validation
description: "Get started with the Telerik UI Form component for {{ site.framework }} and learn about its validation configuration."
slug: htmlhelpers_form_aspnetcore_validation
position: 9
---

# Validation

The Form has a built-in validator. Validation of all Form fields is triggered on form submission. By default, the Form displays a validation message when an editor is focused, then blurred without setting its value. 

The following example shows how to disable the built-in validation on blur.

```HtmlHelper
    @(Html.Kendo().Form<MyApplication.Models.UserViewModel>()
        .Name("exampleForm")
        .HtmlAttributes(new { action = "Index", method = "POST" })
        .Validatable(v =>
        {
            v.ValidateOnBlur(false);
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
                        .Field(f => f.Agree)
                        .Label(l => l.Text("Agree to Terms:"));
                });
        });
    )
```
{% if site.core %}
```TagHelper
        <kendo-form name="exampleForm" form-data="@Model"" action="Index" method="POST">
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
                        <form-item field="Agree">
                            <item-label text="Agree to Terms:">
                        </form-item>
                    </form-items>
            </form-item>
        </form-items>
        <validatable validate-on-blur="true" error-template="<span style='color: red'>Fill in #=data.field#</span>" />
    </kendo-form>
```
{% endif %}

## Validation Summary

The Form can display a list of all validation errors. The validation summary is rendered as an unordered list of messages. By default, this option is disabled.

The following example shows how to enable validation summary in the Form.

```HtmlHelper
    @(Html.Kendo().Form<MyApplication.Models.UserViewModel>()
        .Name("exampleForm")
        .HtmlAttributes(new { action = "Index", method = "POST" })
        .Validatable(v =>
        {
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
                        .Field(f => f.Agree)
                        .Label(l => l.Text("Agree to Terms:"));
                });
        });
    )
```

You can set the `ValidationSummary.Container` option, if you want to use an element as a container for the validation messages. This allows you to specify where the messages will be displayed, for example, above the Form, below it, or elsewhere on the page. 

The following example shows how to set `ValidationSummary.Container`.

```HtmlHelper
    <div class="container"></div>

    @(Html.Kendo().Form<MyApplication.Models.UserViewModel>()
        .Name("exampleForm")
        .HtmlAttributes(new { action = "Index", method = "POST" })
        .Validatable(v =>
        {
            v.ValidationSummary(vs => vs.Enable(false).Container(".container"));
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
                        .Field(f => f.Agree)
                        .Label(l => l.Text("Agree to Terms:"));
                });
        });
    )
```
{% if site.core %}
```TagHelper
<kendo-form name="exampleForm" form-data="@Model" action="Index" method="POST">
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
                        <form-item field="HireDate">
                            <item-label text="Hire Date:">
                                <datepicker-editor></datepicker-editor>
                        </form-item>
                        <form-item field="retireDate">
                            <item-label text="Retire Date:">
                                <datepicker-editor></datepicker-editor>
                        </form-item>
                    </form-items>
            </form-item>
        </form-items>
    </kendo-form>
```
{% endif %}

## Error Message Template

You can customize validation error messages with templates.

The following example shows how to define a template with the `Validatable.ErrorTemplate` option.

```HtmlHelper
    @(Html.Kendo().Form<MyApplication.Models.UserViewModel>()
        .Name("exampleForm")
        .HtmlAttributes(new { action = "Index", method = "POST" })
        .Validatable(v =>
        {
            v.ErrorTemplate("<span style='color: red'>Fill in #=data.field#</span>");
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
                        .Field(f => f.Agree)
                        .Label(l => l.Text("Agree to Terms:"));
                });
        });
    )
```

## Custom Validation

You can implement your own validation logic and return the respective error message, which the Form will display.

The following example demonstrates custom validation of the `LastName` and `RetireDate` fields.

```HtmlHelper
    @(Html.Kendo().Form<MyApplication.Models.UserViewModel>()
        .Name("exampleForm")
        .HtmlAttributes(new { action = "Index", method = "POST" })
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
                        .Field(f => f.HireDate)
                        .Editor(e => e.DatePicker())
                        .Label(l => l.Text("Hire Date:"));
                    i.Add()
                        .Field(f => f.RetireDate)
                        .Editor(e => e.DatePicker())
                        .Label(l => l.Text("Retire Date:"));
                });
        });
    )
```
```Controller
    [HttpPost]
    public ActionResult Index(UserViewModel model)
    {
        int compareDates = Nullable.Compare<DateTime>(model.HireDate, model.RetireDate);

        if (model.FirstName == model.LastName)
        {
            ModelState.AddModelError("LastName", "LastName must be different than First Name.");
        }
        else if (compareDates >= 0)
        {
            ModelState.AddModelError("RetireDate", "Retire Date must be after Hire Date.");
        }

        if (!ModelState.IsValid)
        {
            return View(model);
        }
        else
        {
            return View("Success");
        }
    }
```

## DataAnnotation Attributes

The Form component supports DataAnnotation attributes and will configure the editors and the built-in validation based on the DataAnnotation attributes set for the model properties. The following table summarizes the supported DataAnnotation attributes:

|Attribute|Description|
|----------|-----------|
|[Required]| Adds the `required` atribute to a form element. |
|[Compare]| Provides an attribute that compares two properties.  |
|[DataType]| Specifies the name of an additional type to associate with a data field. Supported types are `EmailAddress`, `Phone`, `Url`, `Text`, `Password` and `HiddenInput`.|
|[RegularExpression]| Specifies that the field must match the specified regular expression. |
|[Display]| Sets a value that is used for a Label and `title` attribute for the field, if they are not explicitly configured.  |
|[StringLength]| Specifies the minimum and maximum length of characters that are allowed in a data field.|
|[HiddenInput]| Indicates whether the `<input />` element should be hidden. |
|[Range]| Specifies the numeric range constraints for the property. |

## See Also

* [Validation Demo of the Form HtmlHelper for {{ site.framework }}](https://demos.telerik.com/{{ site.platform }}/form/validation)
* [Server-Side API](/api/form)
