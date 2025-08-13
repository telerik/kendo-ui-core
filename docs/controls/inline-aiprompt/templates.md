---
title: Templates
page_title: jQuery InlineAIPrompt Documentation - InlineAIPrompt Template
description: "Learn about how to use Kendo UI Prompt Response Template with the jQuery InlineAIPrompt"
slug: templates_inlineaiprompt_component
position: 3
---

# Templates

The InlineAIPrompt provides template options that enable you to customize the rendering of its output content.

For a complete example, refer to the [demo on customizing the InlineAIPrompt templates](https://demos.telerik.com/kendo-ui/inlineaiprompt/templates).

## Response Template

The InlineAIPrompt component provides the ability to customize the appearance of the AI response that is displayed in the output card.

To customize the response appearance, handle the [`responseTemplate`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/inlineaiprompt/configuration/responsetemplate) function and customize the rendering of the AI response. 

```
    responseTemplate: function(response) {
        return `
            <p><strong>Prompt:</strong></p>
            <p>${response.prompt}</p>
            <br/>
            <p><strong>Output:</strong></p>
            <p><strong>${response.output}</strong></p>
        `
    },
```

## See Also

* [Templates Demo of the InlineAIPrompt](https://demos.telerik.com/kendo-ui/inline-aiprompt/templates)
* [JavaScript API Reference of the InlineAIPrompt](/api/javascript/ui/inlineaiprompt)
