---
title: Layout
page_title: Layout
description: "Get started with the Telerik UI Wizard HtmlHelper for {{ site.framework }} and learn how to customize its appearance."
slug: htmlhelpers_wizard_aspnetcore_layout
position: 4
---

# Layout

The {{ site.product }} Wizard supports configuration of its layout.

By default the {{ site.product }} Wizard is rendered with a Stepper in a horizontal orientation above the content of the Wizard. The layout could be configured via the `ContentPosition` configuration option. The available options allow you to display a vertical Stepper on the left or right side of the Wizard step content.

The following example demonstrates how to initialize a Wizard with a vertical Stepper and content rendered on the right side of the Stepper.

```Razor
    @(Html.Kendo().Wizard()
        .Name("wizard")
        .ContentPosition(WizardContentPosition.Right)
        .Steps(s=> {
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
        })
    )
```

## See Also

* [Basic Usage of the Wizard HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/wizard/index)
