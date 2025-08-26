---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI for {{ site.framework }} InlineAIPrompt component and how to initialize it."
slug: htmlhelpers_overview_inline_aiprompt
position: 0
---

# {{ site.framework }} InlineAIPrompt Overview

{% if site.core %}
The Telerik UI InlineAIPrompt TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI InlineAIPrompt widget.
{% else %}
The Telerik UI InlineAIPrompt HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI InlineAIPrompt widget.
{% endif %}

The {{ site.framework }} InlineAIPrompt is a compact, popup-style component designed to enable seamless interaction with AI language models directly within your content.

It offers a streamlined interface for submitting prompts and receiving AI-generated responses, all without interrupting the user's workflow. This makes it ideal for use cases where contextual AI assistance is needed—providing intelligent support right where users are working.

* [Demo page for the InlineAIPrompt HtmlHelper](https://demos.telerik.com/{{ site.platform }}/inline-aiprompt)
{% if site.core %}
* [Demo page for the InlineAIPrompt TagHelper](https://demos.telerik.com/aspnet-core/inline-aiprompt)
{% endif %}

## Initializing the InlineAIPrompt

The following example demonstrates how to define the InlineAIPrompt.

```HtmlHelper
    @(Html.Kendo().InlineAIPrompt()
        .Name("inline-aiprompt")
        .SystemPrompt("systemPrompt")
        .Popup(popup => popup.Width(400))
        .Placeholder("Ask a question")
    )
```
{% if site.core %}
```TagHelper
    <kendo-inlineaiprompt name="inline-aiprompt"
        system-prompt="systemPrompt"
        placeholder="Ask a question">
        <popup width="400" />
    </kendo-inlineaiprompt>
```
{% endif %}

## Basic Configuration

The InlineAIPrompt provides options for configuring its commands, system prompt, and Speech-to-Text functionality. The following example demonstrates the basic configuration of the InlineAIPrompt.

```HtmlHelper
@(Html.Kendo().Button()
    .Name("ai-btn")
    .Icon("sparkles")
    .Content("AI Assistance")
    .Events(e => e.Click("onClick"))
)

@(Html.Kendo().InlineAIPrompt()
    .Name("inlineAi")
    .Placeholder("Type your prompt here...")
    .Popup(p => p.Width(400))
    .SystemPrompt("systemPrompt")
    .SpeechToText(true)
    .Readonly(false)
    .Events(e => e.PromptResponse("onPromptRequest").PromptRequestCancel("onPromptRequestCancel"))
    .Commands(commands =>
    {
        commands.Add().Id("funnier").Icon("star").Text("Make the text funnier")
            .Prompt("funnierHandler");

        commands.Add().Id("explain").Icon("question").Text("Explain the text")
            .Prompt("explainHandler");
    })
)

@(Html.Kendo().TextArea()
    .Name("textarea")
    .HtmlAttributes(new { style = "height: 200px; width: 100%" })
    .Value("This is an example of post content")
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-button name="ai-btn" on-click="onClick">
    AI Assistance
</kendo-button>

<kendo-inlineaiprompt name="inlineAi"
    placeholder="Type your prompt here..."
    system-prompt="systemPrompt"
    readonly="false"
    on-prompt-request="onPromptRequest"
    on-prompt-request-cancel="onPromptRequestCancel"
    >
    <popup width="400" />
    <speech-to-text enabled="true" />
    <commands>
        <command id="funnier" icon="star" text="Make the text funnier" prompt="funnierHandler" />
        <command id="explain" icon="question" text="Explain the text" prompt="explainHandler" />
    </commands>
</kendo-inlineaiprompt>

<kendo-textarea name="textarea" style = "height: 200px; width: 100%" value="This is an example of post content"></kendo-textarea>
```
{% endif %}
```JS scripts
    <script>
        function onClick(e) {
            let inline = $("#inlineAi").data('kendoInlineAIPrompt');
            inline.open();
            $('.k-child-animation-container.k-popup').data('kendoPopup').position()
        }

        function systemPrompt(context, prompt) {
            var textarea = $("#textarea").data("kendoTextArea");
            return `${prompt}: ${textarea.value()}`;
        }

        function funnierHandler(e) {
            return `Make the following text funnier: `;
        }

        function explainHandler(e) {
            return `Explain the following text: `;
        }

        function onPromptRequest(ev) {
            console.log("promptRequest event is fired!")
        }

        function onPromptRequestCancel(ev) {
            console.log("promptRequestCancel event is fired!")
        }
    </script>
```

## Functionality and Features

* [Templates]({% slug htmlhelpers_templates_inline_aiprompt %})&mdash;The available templates allow you to control the rendering of the response.
* [Streaming]({% slug htmlhelpers_streaming_inline_aiprompt %})&mdash;The InlineAIPrompt supports streaming responses, allowing users to see AI-generated content as it is being produced.
* [Integration with Microsoft.Extensions.AI]({% slug integration_microsoft_extensions_ai %})&mdash;The InlineAIPrompt supports using the <a href="https://learn.microsoft.com/en-us/dotnet/api/microsoft.extensions.ai?view=net-9.0-pp" target="_blank">Microsoft.Extensions.AI library</a> to provide seamless integration with various AI models and boost your workflow when connecting the InlineAIPrompt with AI models.
* [Events]({% slug htmlhelpers_events_inline_aiprompt %})&mdash;The component emits a variety of events that allow you to implement custom functionality.
* [Accessibility]({% slug htmlhelpers_inline_aiprompt_accessibility %})&mdash;The InlineAIPrompt is accessible for screen readers, supports WAI-ARIA attributes, and delivers [keyboard shortcuts]({% slug keynav_aspnetcore_aiprompt %}) for faster navigation.

## Next Steps

* [Getting Started with the InlineAIPrompt]({% slug inline_aiprompt_getting_started %})
* [Basic Usage of the InlineAIPrompt HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/inline-aiprompt)
{% if site.core %}
* [Basic Usage of the InlineAIPrompt TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/inline-aiprompt)
{% endif %}

## See Also

* [Using the API of the InlineAIPrompt for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/inline-aiprompt/api)
* [Server-Side API of the InlineAIPrompt HtmlHelper](/api/inline-aiprompt)
{% if site.core %}
* [Server-Side API of the InlineAIPrompt TagHelper](/api/taghelpers/inline-aiprompt)
{% endif %}
* [Client-Side API of the InlineAIPrompt](https://docs.telerik.com/kendo-ui/api/javascript/ui/inline-aiprompt)