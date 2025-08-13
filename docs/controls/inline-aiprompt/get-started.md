---
title: Getting Started
page_title: jQuery InlineAIPrompt Documentation - Getting Started with the InlineAIPrompt
description: "Get started with the jQuery InlineAIPrompt by Kendo UI and learn how to create the component."
slug: getting_started_kendoui_inlineaiprompt_component
position: 1
---

# Getting Started with the InlineAIPrompt

This guide demonstrates how to get up and running with the Kendo UI for jQuery InlineAIPrompt.

After the completion of this guide, you will be able to achieve the following end result:

```dojo
    <div id="inlineAi"></div>
    <script>
      var inline = $("#inlineAi")
        .kendoInlineAIPrompt({
          placeholder: "Type your prompt here...",          
          systemPrompt: (context, prompt) => `${prompt}: ${context}`,
          speechToText: true,
          service: {
            url: "https://demos.telerik.com/service/v2/ai/completion",
          },
          commands: [
            {
              id: "recipe",
              text: "Suggest a pizza recipe",
              icon: "star",
              prompt: () => `Suggest a pizza recipe: `,
            },
       		{
              id: "forecast",
              text: "What is the weather forecast in Toronto",
              icon: "flag",
              prompt: () => `What is the weather forecast in Toronto: `,
            },
          ],
        })
        .data("kendoInlineAIPrompt").open();
    </script>
```

## 1. Create an Empty Div Element

First, create an empty `<div>` element on the page that will be used to initialize the component.

```html
<div id="inlineaiprompt"></div>
```


## 2. Initialize the InlineAIPrompt 

In this step, you will initialize the InlineAIPrompt from the `<div>` element. When you initialize the component, all settings of the InlineAIPrompt will be provided in the script statement. You have to describe its configuration and event handlers in JavaScript.

```html
<div id="inlineaiprompt"></div>

<script>
    // Target the div element by using jQuery and then call the kendoInlineAIPrompt() method.
    $("#inlineaiprompt").kendoInlineAIPrompt();
</script>
```

## 3. Add the Service URL

Configure the AI service endpoint that will process the prompts. The [`service.url`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/inlineaiprompt/configuration/service.url) option specifies the backend endpoint for AI completion requests.

The example in this article uses a Telerik-hosted AI service for demonstration purposes only.

```javascript
service: {
  url: "https://demos.telerik.com/service/v2/ai/completion"
},
```

## 4. Adding Prompt Commands

Prompt commands are predefined actions that you can apply to the content for which the InlineAIPrompt is displayed. They allow users to quickly modify or enhance a text without making a dedicated prompt.

The following example shows how to set the prompt [commands](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/inlineaiprompt/configuration/commands) in the InlineAIPrompt component and quickly improve the writing, make it shorter, or fix grammar issues.

```javascript
commands: [
  {
    id: "recipe",
    text: "Suggest a pizza recipe",
    icon: "star",
    prompt: function() { return "Suggest a pizza recipe: "; }
  },
  {
    id: "forecast",
    text: "What is the weather forecast in Toronto",
    icon: "flag",
    prompt: function() { return "What is the weather forecast in Toronto: "; }
  }
],
```

## 5. Configure the systemPrompt Option

Set up the logic for how the system prompt is constructed. The [`systemPrompt`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/inlineaiprompt/configuration/systemPrompt) function customizes how the prompt and context are combined before sending to the AI service.

```javascript
systemPrompt: function(context, prompt) {
  return prompt + ": " + context;
},
```

## 6. Enable the Speech-to-Text Button

The InlineAIPrompt component supports speech-to-text functionality, allowing users to input prompts using their voice. To enable this feature, set the [`speechToText`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/inlineaiprompt/configuration/speechToText) property to `true`.

```javascript
speechToText: true,
```



## Next Steps 

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %}) 
* [Templates in the Kendo UI for jQuery InlineAIPrompt]({% slug templates_inlineaiprompt_component %})
* [Demo Page for the Kendo UI for jQuery InlineAIPrompt](https://demos.telerik.com/kendo-ui/inline-aiprompt/index)

## See Also 

* [JavaScript API Reference of the jQuery InlineAIPrompt](/api/javascript/ui/inlineaiprompt)
* [Knowledge Base Section](/knowledge-base)


