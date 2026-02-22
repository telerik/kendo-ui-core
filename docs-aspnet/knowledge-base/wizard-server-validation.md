---
title: Implementing Server Validation for the Wizard Component
description: An example on how to implement server validation for the {{ site.product }} Wizard component.
type: how-to
page_title: Implement Server Validation for Wizard
slug: wizard-server-validation
tags: wizard, validation
ticketid: 1524438
res_type: kb
components: ["general"]
component: wizard
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Wizard</td>
 </tr>
</table>

## Description

How can I implement server-side validation with the Wizard component?

## Solution

You can achieve this requirement using the following approach:


```Razor Index.cshtml
<style>
    .k-form-buttons {
        display: none;
    }
</style>

@(Html.Kendo().Wizard()
        .Name("wizard")
        .Events(e=>e.Select("wizardSelect"))
        .Steps(s =>
        {
            s.Add()
            .Title("Step 1")
            .ContentId("stepOne")
            .Buttons(b =>
            {
                b.Next();
            });
            s.Add()
            .Title("Step 2")
            .Content("<h4>You can now complete the wizard.</h4>")
            .Buttons(b =>
            {
                b.Previous();
                b.Done();
            });
        })
    )
<script id="stepOne" type="text/kendo-template">
    @(Html.Kendo().Form<Kendo.Mvc.Examples.Models.Form.UserViewModel>()
        .Name("formExample")
        .HtmlAttributes(new { action = @Url.Action("Validation", "Form"), method = "POST" })
        .Orientation("vertical")
        .Validatable(v =>
        {
            v.ValidateOnBlur(true);
            v.ValidationSummary(vs => vs.Enable(true));
            v.ErrorTemplate("<span class='k-form-error'>#:message#</span>");
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
                        .Field(f => f.Password)
                        .Label(l => l.Text("Password:"))
                        .Hint("Hint: enter alphanumeric characters only.")
                        .EditorTemplateHandler("setPasswordEditor");
                    i.Add()
                        .Field(f => f.Email)
                        .Label(l => l.Text("Email:"));
                    i.Add()
                        .Field(f => f.DateOfBirth)
                        .Label(l => l.Text("Date of Birth:").Optional(true));
                    i.Add()
                        .Field(f => f.HireDate)
                        .Editor(e => e.DatePicker())
                        .Label(l => l.Text("Hire Date:"));
                    i.Add()
                        .Field(f => f.RetireDate)
                        .Editor(e => e.DatePicker())
                        .Label(l => l.Text("Retire Date:"));
                    i.Add()
                        .Field(f => f.Agree)
                        .Label(l => l.Text("Agree to Terms:"));
                });
        })
    )
</script>


<script>
    function setPasswordEditor(container, options) {
        container.append($("<input type='password' class='k-textbox k-valid' id='Password' name='Password' title='Password' required='required' autocomplete='off' aria-labelledby='Password-form-label' data-bind='value:Password' aria-describedby='Password-form-hint'>"));
    }
    function wizardSelect(e) {
        if (e.step.options.index == 1 && e.button.element.text() == "Next") {
            e.preventDefault();
            button = e.button.element;
            $(".k-form-submit").click();
        }
    }
    $(document).ready(function () {
        var result = @Html.Raw(Json.Encode(ViewData["Result"]));
        if (result=="Valid") {
            var wizard = $("#wizard").data().kendoWizard;
            wizard.next();
        }
    });
</script>
```
```C# ValidationController.cs
    public partial class FormController : Controller
    {
        public ActionResult Validation()
        {
            return View(new UserViewModel()
            {
                FirstName = "John",
                LastName = "John",
                Email = "john.doe@email.com",
                UserName = "johny",
                Password = "123456",
                DateOfBirth = new DateTime(2020, 5, 8),
                HireDate = new DateTime(2020, 1, 1),
                RetireDate = new DateTime(2020, 1, 1),
                Agree = false
            });
        }

        [HttpPost]
        public ActionResult Validation(UserViewModel model)
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
                ViewData["Result"] = "Invalid";
                return View(model);
            }
            else
            {
                ViewData["Result"] = "Valid";
                //return View("Success");
                return View();
            }
        }
    }
```

## More {{ site.framework }} Wizard Resources

* [{{ site.framework }} Wizard Documentation]({%slug htmlhelpers_wizard_aspnetcore_overview%})

* [{{ site.framework }} Wizard Demos](https://demos.telerik.com/{{ site.platform }}/wizard)

{% if site.core %}
* [{{ site.framework }} Wizard Product Page](https://www.telerik.com/aspnet-core-ui/wizard)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Wizard Product Page](https://www.telerik.com/aspnet-mvc/wizard)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the Wizard for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/wizard)
* [Server-Side API Reference of the Wizard for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/wizard)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)

