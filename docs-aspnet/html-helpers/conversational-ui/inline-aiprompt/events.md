---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI InlineAIPrompt component for {{ site.framework }}."
components: ["inlineaiprompt"]
slug: htmlhelpers_events_inline_aiprompt
position: 4
---

# Events

The Telerik UI InlineAIPrompt for {{ site.framework }} [exposes multiple events](/api/kendo.mvc.ui.fluent/inlineaiprompteventbuilder) like `PromptRequest`, `PromptRequestCancel`, and more, that allow you to control the behavior of the UI component.

For a complete example on basic InlineAIPrompt events, refer to the [demo on using the events of the InlineAIPrompt](https://demos.telerik.com/{{ site.platform }}/inline-aiprompt/events).

## Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

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
        function onPromptRequest(e){
            // Handle the InlineAIPrompt PromptRequest event that triggers when the Send button is clicked.
        }
    </script>
```

## Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```HtmlHelper
    @(Html.Kendo().InlineAIPrompt()
        .Name("inlineaiprompt")
        .Events(e => e.PromptRequest(@<text>
            function() {
                // Handle the InlineAIPrompt PromptRequest event inline.
            }
            </text>)
        )
        ... //Additional configuration
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-inlineaiprompt name="inlineaiprompt" on-prompt-request="function() {
            // Handle the InlineAIPrompt PromptRequest event inline.
        }">
        <!-- Additional configuration -->
    </kendo-inlineaiprompt>
```
{% endif %}

## Next Steps

* [Using the InlineAIPrompt Events (Demo)](https://demos.telerik.com/{{ site.platform }}/inline-aiprompt/events)

## See Also

* [Using the API of the InlineAIPrompt for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/inlineaiprompt/api)
* [Client-Side API of the InlineAIPrompt](https://docs.telerik.com/kendo-ui/api/javascript/ui/inlineaiprompt)
* [Server-Side API of the InlineAIPrompt](/api/inlineaiprompt)
{% if site.core %}
* [Server-Side API of the InlineAIPrompt TagHelper](/api/taghelpers/inlineaiprompt)
{% endif %}