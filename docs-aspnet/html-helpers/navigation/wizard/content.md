---
title: Content
page_title: Content
description: "Get started with the Telerik UI Wizard component for {{ site.framework }} and learn how to set its content."
slug: htmlhelpers_wizard_aspnetcore_content
position: 3
---

# Content

The {{ site.product }} Wizard provides options for loading content via AJAX or defining local content.

## Loading Content with AJAX

The {{ site.product }} Wizard provides built-in support for asynchronously loading content from remote URLs via the `ContentUrl` configuration option. Those endpoints should return HTML content that will be loaded in the content area of respective step of the Wizard. When content is loaded via AJAX the Wizard allows the user to configure whether each step content will be loaded only when it is selected via the `LoadOnDemand` configuration option. Otherwise, all steps will be initially loaded with the Wizard rendering. It is possible to also configure whether the step content will be reloaded on each navigation to a given Step via the `ReloadOnSelect` configuration option.
For a complete example, refer to the [demo on loading Wizard content with AJAX](https://demos.telerik.com/{{ site.platform }}/wizard/ajax).

```HtmlHelper
    @(Html.Kendo().Wizard()
        .Name("wizard")
        .LoadOnDemand(true)
        .ReloadOnSelect(false)
        .Steps(steps =>
        {
            steps.Add().ContentUrl(Url.Content("~/shared/web/wizard/ajax/ajaxContent1.html"))
            .Buttons(b =>
            {
                b.Previous();
                b.Next();
            });
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-wizard name="wizard" load-on-demand="true" reload-on-select="false">
        <wizard-steps>
            <wizard-step content-url="~/Content/web/wizard/ajax/ajaxContent1.html">
                <wizard-step-buttons>
                    <wizard-step-button name="next" text="Next"></wizard-step-button>
                    <wizard-step-button name="previous" text="Previous"></wizard-step-button>
                </wizard-step-buttons>
            </wizard-step>
        </wizard-steps>
    </kendo-wizard>
```
{% endif %}

## Loading Local Content

### Loading Local Content via the Built-in Form Configuration

The {{ site.product }} Wizard integrates the {{ site.product }} Form and supports all its configuration options. For further details on Form functionality and configuration options refer to the [Form documentation section]({% slug htmlhelpers_form_aspnetcore_overview %}).

```HtmlHelper
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
                })
                .Buttons(b =>
                {
                    b.Next();
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
                })
                .Buttons(b =>
                {
                    b.Previous();
                    b.Done();
                });
        })
    )
```
{% if site.core %}
```TagHelper
@addTagHelper *,Kendo.Mvc
    <kendo-wizard name="wizard">
        <wizard-steps>
            <wizard-step title="User Details">
                <wizard-step-form form-data="@Model">
                    <form-items>
                        <form-item field="UserName">
                        </form-item>
                        <form-item field="Email">
                        </form-item>
                        <form-item field="Password">
                        </form-item>
                    </form-items>
                </wizard-step-form>
                <wizard-step-buttons>
                    <wizard-step-button name="next" text="Next"></wizard-step-button>
                </wizard-step-buttons>
            </wizard-step>
            <wizard-step title="Personal Details">
                <wizard-step-form form-data="Model">
                    <validatable validate-on-blur="true" validation-summary="false"/>
                    <form-items>
                        <form-item field="FirstName">
                        </form-item>
                        <form-item field="LastName">
                        </form-item>
                        <form-item field="DateOfBirth">
                        </form-item>
                    </form-items>
                </wizard-step-form>
                <wizard-step-buttons>
                    <wizard-step-button name="previous" text="Previous"></wizard-step-button>
                    <wizard-step-button text="Done" name="done"></wizard-step-button>
                </wizard-step-buttons>
            </wizard-step>
        </wizard-steps>
    </kendo-wizard>
```
{% endif %}

### Loading Local HTML Content

The content of each Wizard step can be specified via the Wizard Step `Content` or `ContentId` configuration options. In this way a specific HTML string or a DOM element, specified by its Id, will be used as content:

```HtmlHelper
    @(Html.Kendo().Wizard()
        .Name("wizard")
        .Steps(s=> {
            s.Add().Content("<h1>Start Registration</h1><br/><br/><br/><h3>Click \"Next\" to start filling-in the form</h3>")
            .Buttons(b =>
            {
                b.Next();
            });

            s.Add().ContentId("finalStep")
            .Buttons(b =>
            {
                b.Previous();
                b.Done();
            });
        })
    )

    <script id="finalStep" type="text/kendo-template">
        <h1>Thank you for registering</h1>
        <br /><br /><br />
        <h3>Click "Done" to complete the registration process</h3>
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-wizard name="wizard" load-on-demand="true" reload-on-select="false">
        <wizard-steps>
            <wizard-step title="Initial step">
                <wizard-step-content>
                    <h1>Start Registration</h1>
                    <br /><br /><br />
                    <h3>Click "Next" to start filling-in the form</h3>
                </wizard-step-content>
                <wizard-step-buttons>
                    <wizard-step-button name="next" text="Next"></wizard-step-button>
                </wizard-step-buttons>
            </wizard-step>
    
            <wizard-step content-id="finalStep">
                <wizard-step-buttons>
                    <wizard-step-button name="previous" text="Previous"></wizard-step-button>
                    <wizard-step-button text="Done" name="done"></wizard-step-button>
                </wizard-step-buttons>
            </wizard-step>
        </wizard-steps>
    </kendo-wizard>

    <script id="finalStep" type="text/kendo-template">
        <h1>Thank you for registering</h1>
        <br /><br /><br />
        <h3>Click "Done" to complete the registration process</h3>
    </script>
```
{% endif %}

## See Also

* [Basic Usage of the Wizard HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/wizard/index)
