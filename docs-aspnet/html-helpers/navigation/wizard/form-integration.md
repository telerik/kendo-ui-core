---
title: Form Integration
page_title: Form Integration
description: "Get started with the Telerik UI Wizard HtmlHelper for {{ site.framework }} and learn how the Wizard integrates with the Telerik UI Form HtmlHelper for {{ site.framework }}."
slug: htmlhelpers_wizard_aspnetcore_form_integration
position: 2
---

# Form Integration

The {{ site.product }} Wizard can be initialized as a `<form>` element or as a `<div>` element. The configuration is set via the `.Tag()` configuration option.

## Initialization as a `<form>` Element

When the {{ site.product }} Wizard is initialized as a `<form>` element the Done button at the last Wizard step will act as a submit button. In this scenario, the Form DOM elements inside the {{ site.product }} Wizard will be rendered as `<div>` elements.

```Razor
    @(Html.Kendo().Wizard()
        .Name("wizard")
        .Tag("form")
        .ValidateForms(true)
        .Steps(s=> {
            s.Add().Content("Initial Step");
            s.Add<UserViewModel>()
                .Title("User Details")
                .Form(form =>
                {
                    form.FormData(Model);
                    form.Items(itm =>
                    {
                        itm.Add().Field(f => f.UserName);
                        itm.Add().Field(f => f.Email);
                        itm.Add().Field(f => f.Password);
                    });
                });
            s.Add<UserViewModel>()
                .Title("Personal Details")
                .Form(form =>
                {
                    form.FormData(Model);
                    form.Items(itm =>
                    {
                        itm.Add().Field(f => f.FirstName);
                        itm.Add().Field(f => f.LastName);
                        itm.Add().Field(f => f.DateOfBirth);
                    });
                });
            s.Add().Content("Final Step");
        })
    )
```

## Initialization as a `<div>` Element

When the {{ site.product }} Wizard is initialized as a `<div>` element any forms initialized via the Wizard configuration option will behave as regular forms. If the Wizard contains multiple forms as part of its steps content and the requirement is to submit them separately a Submit button must be defined via the Form `ButtonsTemplate` configuration option. It is advisable to handle the Form submit event and submit the form data via Ajax as otherwise the page will reload and the Wizard will return in its initial state.

```Razor
    @(Html.Kendo().Wizard()
        .Name("wizard")
        .Tag("div")
        .ValidateForms(true)
        .Steps(s=> {
            s.Add().Content("Initial Step");
            s.Add<UserViewModel>()
                .Title("User Details")
                .Form(form =>
                {
                    form.FormData(Model);
                    form.Items(itm =>
                    {
                        itm.Add().Field(f => f.UserName);
                        itm.Add().Field(f => f.Email);
                        itm.Add().Field(f => f.Password);
                    });
                    form.ButtonsTemplate("<input type=\"submit\" />");
                    form.Events(ev => ev.Submit("onSubmit"));
                });
            s.Add<UserViewModel>()
                .Title("Personal Details")
                .Form(form =>
                {
                    form.FormData(Model);
                    form.Items(itm =>
                    {
                        itm.Add().Field(f => f.FirstName);
                        itm.Add().Field(f => f.LastName);
                        itm.Add().Field(f => f.DateOfBirth);
                    });
                    form.ButtonsTemplate("<input type=\"submit\" />");
                    form.Events(ev => ev.Submit("onSubmit"));
                });
            s.Add().Content("Final Step");
        })
    )

    <script>
        function onSubmit(event){
            event.preventDefault();
            //handle data submission
        }
    </script>
```

## See Also

* [Basic Usage of the Wizard HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/wizard/index)
* [Using the API of the Wizard HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/wizard/api)
* [Configure the Content of the Wizard HtmlHelper for {{ site.framework }} ]({% slug htmlhelpers_wizard_aspnetcore_content %})
