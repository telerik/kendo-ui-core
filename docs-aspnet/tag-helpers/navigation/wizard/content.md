---
title: Content
page_title: Content
description: "Get started with the Telerik UI Wizard TagHelper for ASP.NET Core and learn how to set its content."
slug: taghelpers_wizard_aspnetcore_content
position: 2
---

# Content

The Telerik UI Wizard TagHelper for ASP.NET Core Wizard provides option for loading content via AJAX or defining local content.

## Loading Content with AJAX

The Telerik UI for ASP.NET Core Wizard provides built-in support for asynchronously loading content from remote URLs via the `content-url` configuration option. These URLs return HTML content that can be loaded in the content area of the Wizard. When content is loaded via AJAX the Wizard provides to option to configure whether each step content will be loaded only when it is selected via the `load-on-demand` configuration option. It is possible to also configure whether the step content will be reloaded on each navigation to the given Step via the `reload-on-select` configuration option.

```tagHelper
    <kendo-wizard name="wizard" load-on-demand="true" reload-on-select="false">
        <wizard-steps>
            <wizard-step content-url="~/Content/web/wizard/ajax/ajaxContent1.html"></wizard-step>
            <wizard-step content-url="~/Content/web/wizard/ajax/ajaxContent2.html"></wizard-step>
            <wizard-step content-url="~/Content/web/wizard/ajax/ajaxContent3.html"></wizard-step>
            <wizard-step content-url="~/Content/web/wizard/ajax/ajaxContent4.html"></wizard-step>
        </wizard-steps>
    </kendo-wizard>
```

## Loading local content

### Loading local HTML content

The content of each Wizard step can be specified via the Wizard Step `<wizard-step-content>` or `contentId` configuration options. In this way a specific HTML string or a DOM element, specified by its Id, will be used as content:

```tagHelper
    <kendo-wizard name="wizard" load-on-demand="true" reload-on-select="false">
        <wizard-steps>
            <wizard-step title="Initial step">
                <wizard-step-content>
                    <h1>Start Registration</h1>
                    <br /><br /><br />
                    <h3>Click "Next" to start filling-in the form</h3>
                </wizard-step-content>
            </wizard-step>
            <wizard-step content-url="~/Content/web/wizard/ajax/ajaxContent2.html"></wizard-step>
            <wizard-step content-url="~/Content/web/wizard/ajax/ajaxContent3.html"></wizard-step>
            <wizard-step content-id="finalStep"></wizard-step>
        </wizard-steps>
    </kendo-wizard>

    <script id="finalStep" type="text/kendo-template">
        <h1>Thank you for registering</h1>
        <br /><br /><br />
        <h3>Click "Done" to complete the registration process</h3>
    </script>
```

## See Also

* [Basic Usage of the Wizard TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/wizard/tag-helper)
