---
title: Templates
page_title: Templates
description: "Use templates and customize the appearance of the prompt suggestion and view items of the Telerik UI InlineAIPrompt component for {{ site.framework }}."
components: ["inlineaiprompt"]
slug: htmlhelpers_templates_inline_aiprompt
position: 3
---

# Templates

The InlineAIPrompt allows you to control the appearance of the prompt suggestion and view items by using template options.

For more information on the capabilities and syntax of the templates, see the [Using Client Templates]({% slug client_templates_overview %}) article. For a runnable example, refer to the [demo on customizing the templates in the InlineAIPrompt](https://demos.telerik.com/{{ site.platform }}/inline-aiprompt/templates).

## Response Template

The InlineAIPrompt component provides the ability to customize the appearance of the AI response that is displayed in the output card.

To customize the response appearance, handle the `ResponseTemplate` configuration and customize the rendering of the AI response. 

```HtmlHelper
    @(Html.Kendo().InlineAIPrompt()
        .Name("inlineAi")
        .ResponseTemplateHandler("responseTemplate")
        ...... //Additional configuration
    )
```
{% if site.core %}
```TagHelper
    <kendo-inlineaiprompt name="inlineAi"
        is-streaming="true"
        response-template-handler="responseTemplate"
    >
        <!--Other configuration-->
    </kendo-inlineaiprompt>
```
{% endif %}
```JS scripts
    function responseTemplate(response) {
        return `
            <p><strong>Prompt:</strong></p>
            <p>${response.prompt}</p>
            <br/>
            <p><strong>Output:</strong></p>
            <p><strong>${response.output}</strong></p>
        `
    }
```

## See Also

* [Using the API of the InlineAIPrompt for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/inlineaiprompt/api)
* [Client-Side API of the InlineAIPrompt](https://docs.telerik.com/kendo-ui/api/javascript/ui/inlineaiprompt)
* [Server-Side API of the InlineAIPrompt](/api/inlineaiprompt)
{% if site.core %}
* [Server-Side API of the InlineAIPrompt TagHelper](/api/taghelpers/inlineaiprompt)
{% endif %}