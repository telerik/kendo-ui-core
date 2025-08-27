---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI Chat component for {{ site.framework }}."
slug: events_chat_aspnetcore
position: 9
---

# Events

The Telerik UI Chat for {{ site.framework }} exposes multiple [events](/api/kendo.mvc.ui.fluent/chateventbuilder) that allow you to control and customize the behavior of the component.

## Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```HtmlHelper
@(Html.Kendo().Chat()
    .Name("chat")
    .Events(e => e
        .SendMessage("onSendMessage")
        .SuggestionClick("onSuggestionClick")
    )
)
<script>
    function onSendMessage() {
        // Handle the "SendMessage" event.
    }

    function onSuggestionClick() {
        // Handle the "SuggestionClick" event.
    }
</script>
```
{% if site.core %}
```TagHelper
<kendo-chat name="chat"
    on-send-message="onSendMessage"
    on-suggestion-click="onSuggestionClick">
</kendo-chat>

<script>
    function onSendMessage() {
        // Handle the SendMessage event.
    }

    function onSuggestionClick() {
        // Handle the SuggestionClick event.
    }
</script>
```
{% endif %}

## Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```HtmlHelper
@(Html.Kendo().Chat()
    .Name("chat")
    .Events(e => e
        .SendMessage(@<text>
            function() {
                // Handle the SendMessage event inline.
            }
        </text>)
    )
)
```
{% if site.core %}
```TagHelper
<kendo-chat name="chat"
    on-send-message="function() {
        // Handle the SendMessage event inline.
    }">
</kendo-chat>
```
{% endif %}

## See Also

* [Using the API of the Chat for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/chat/api)
* [Client-Side API of the Chat](https://docs.telerik.com/kendo-ui/api/javascript/ui/chat)
* [Server-Side API of the Chat](/api/chat)
{% if site.core %}
* [Server-Side API of the Chat TagHelper](/api/taghelpers/chat)
{% endif %}
