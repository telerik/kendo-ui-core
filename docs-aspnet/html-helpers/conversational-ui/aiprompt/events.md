---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI AIPrompt component for {{ site.framework }}."
slug: htmlhelpers_events_aiprompt
position: 4
---

# Events

The Telerik UI AIPrompt for {{ site.framework }} [exposes multiple events](/api/kendo.mvc.ui.fluent/aiprompteventbuilder) like `CommandExecute`, `PromptRequest`, and more, that allow you to control the behavior of the UI component.

For a complete example on basic AIPrompt events, refer to the [demo on using the events of the AIPrompt](https://demos.telerik.com/{{ site.platform }}/aiprompt/events).

## Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```HtmlHelper
    @(Html.Kendo().AIPrompt()
        .Name("aiprompt")
        .Events(ev => ev.PromptRequest("onPromptRequest"))
        ... //Additional configuration
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-aiprompt name="aiprompt" on-prompt-request="onPromptRequest">
        <!-- Additional configuration -->
    </kendo-aiprompt>
```
{% endif %}
```Scripts
    <script>
        function onPromptRequest(e){
            // Handle the AIPrompt PromptRequest event that triggers when the prompt view 'Generate output' button is clicked.
        }
    </script>
```

## Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```HtmlHelper
    @(Html.Kendo().AIPrompt()
        .Name("aiprompt")
        .Events(e => e.PromptRequest(@<text>
            function() {
                // Handle the AIPrompt PromptRequest event inline.
            }
            </text>)
        )
        ... //Additional configuration
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-aiprompt name="aiprompt" on-prompt-request="function() {
            // Handle the AIPrompt PromptRequest event inline.
        }">
        <!-- Additional configuration -->
    </kendo-aiprompt>
```
{% endif %}

## Next Steps

* [Using the AIPrompt Events (Demo)](https://demos.telerik.com/{{ site.platform }}/aiprompt/events)

## See Also

* [Using the API of the AIPrompt for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/aiprompt/api)
* [Client-Side API of the AIPrompt](https://docs.telerik.com/kendo-ui/api/javascript/ui/aiprompt)
* [Server-Side API of the AIPrompt](/api/aiprompt)
{% if site.core %}
* [Server-Side API of the AIPrompt TagHelper](/api/taghelpers/aiprompt)
{% endif %}