---
title: Content
page_title: Content
description: "Get started with the Telerik UI Wizard HtmlHelper for {{ site.framework }} and learn how to set its content."
slug: htmlhelpers_wizard_aspnetcore_content
position: 3
---

# Content

The {{ site.product }} Wizard provides options for loading content via AJAX or defining local content.

## Loading Content with AJAX

The {{ site.product }} Wizard provides built-in support for asynchronously loading content from remote URLs via the `ContentUrl` configuration option. Those endpoints should return HTML content that will be loaded in the content area of respective step of the Wizard. When content is loaded via AJAX the Wizard allows the user to configure whether each step content will be loaded only when it is selected via the `LoadOnDemand` configuration option. Otherwise, all steps will be initially loaded with the Wizard rendering. It is possible to also configure whether the step content will be reloaded on each navigation to a given Step via the `ReloadOnSelect` configuration option.
For a complete example, refer to the [demo on loading Wizard content with AJAX](https://demos.telerik.com/{{ site.platform }}/wizard/ajax).

## Loading Local Content

### Loading Local Content via the Built-in Form Configuration

The {{ site.product }} Wizard integrates the {{ site.product }} Form and supports all its configuration options. For further details on Form functionality and configuration options refer to the [Form documentation section]({% slug htmlhelpers_form_aspnetcore_overview %}).

```Razor
    @(Html.Kendo().Wizard()
        .Name("wizard")
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

### Loading Local HTML Content

The content of each Wizard step can be specified via the Wizard Step `Content` or `ContentId` configuration options. In this way a specific HTML string or a DOM element, specified by its Id, will be used as content:

```Razor
    @(Html.Kendo().Wizard()
        .Name("wizard")
        .Steps(s=> {
            s.Add().Content("<h1>Start Registration</h1><br/><br/><br/><h3>Click \"Next\" to start filling-in the form</h3>");
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
            s.Add().ContentId("finalStep");
        })
    )

    <script id="finalStep" type="text/kendo-template">
        <h1>Thank you for registering</h1>
        <br /><br /><br />
        <h3>Click "Done" to complete the registration process</h3>
    </script>
```

## See Also

* [Basic Usage of the Wizard HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/wizard/index)
