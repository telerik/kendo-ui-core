---
title: Streaming
page_title: Streaming
description: "Learn how to implement real-time AI response streaming with the Telerik UI for {{ site.framework }} InlineAIPrompt component."
slug: htmlhelpers_streaming_inline_aiprompt
position: 2
---

# Streaming AI Responses with InlineAIPrompt

The {{ site.framework }} InlineAIPrompt component enables streaming responses, allowing users to view AI-generated content in real time as it's being created. This capability significantly improves the user experience by offering instant feedback and a more dynamic interaction.

Streaming proves especially beneficial in scenarios such as:

- Handling lengthy AI outputs that require several seconds to complete.
- Building inline editing tools where users anticipate immediate updates.
- Connecting with AI platforms that deliver responses in chunks.
- Boosting engagement in contextual AI support environments.

## Configuration

To enable streaming in the InlineAIPrompt component, follow these steps:

1. Enable the `IsStreaming` property of the InlineAIPrompt. This property controls whether the component displays the **Stop Generation** button and indicates that a response is being streamed.

    ```HtmlHelper
        @(Html.Kendo().InlineAIPrompt()
            .Name("inlineAi")
            .IsStreaming(true)
            ...... //Additional configuration
        )
    ```
    {% if site.core %}
    ```TagHelper
        <kendo-inlineaiprompt name="inlineAi"
            is-streaming="true"
        >
            <!--Other configuration-->
        </kendo-inlineaiprompt>
    ```
    {% endif %}

1. To initiate streaming in the {{ site.framework }} InlineAIPrompt component, you need to handle the `PromptRequest` event. This event is triggered when the user either clicks the **Send** button or presses Enter.

    ```HtmlHelper
        @(Html.Kendo().InlineAIPrompt()
            .Name("inlineaiprompt")
            .Events(ev => ev.PromptRequest("onPromptRequest"))
            ... //Additional configuration
        )
    ```
    {% if site.core %}
    ```TagHelper
        @addTagHelper *, Kendo.Mvc

        <kendo-inlineaiprompt name="inlineaiprompt" on-prompt-request="onPromptRequest">
        <!--Other configuration-->
        </kendo-inlineaiprompt>
    ```
    {% endif %}
    ```JS scripts
        <script>
            async function onPromptRequest(e) {
                const inlineAiPromptInstance = this;
                if (ev.prompt && ev.prompt.trim()) {
                    ......
                } else {
                    console.log("Prompt is empty, not sending request.");
                }
            }
        </script>
    ```

## See Also

* [Using the API of the InlineAIPrompt for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/inlineaiprompt/api)
* [Client-Side API of the InlineAIPrompt](https://docs.telerik.com/kendo-ui/api/javascript/ui/inlineaiprompt)
* [Server-Side API of the InlineAIPrompt](/api/inlineaiprompt)
{% if site.core %}
* [Server-Side API of the InlineAIPrompt TagHelper](/api/taghelpers/inlineaiprompt)
{% endif %}