---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI Chat component for {{ site.framework }}."
slug: events_chat_aspnetcore
position: 5
---

# Events

The Telerik UI Chat for {{ site.framework }} exposes multiple [events](/api/kendo.mvc.ui.fluent/chateventbuilder) that allow you to control and customize the behavior of the component.

## Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```HtmlHelper
    @(Html.Kendo().Chat()
        .Name("chat")
        .Events(e => e
            .Post("onPost")
            .ActionClick("onActionClick")
        )
    )
    <script>
        function onPost() {
            // Handle the post event.
        }

        function onActionClick() {
            // Handle the action click event.
        }
    </script>
```
{% if site.core %}
```TagHelper
    <script>
        function onPost() {
            // Handle the post event.
        }

        function onActionClick() {
            // Handle the action click event.
        }
    </script>

    <kendo-chat name="chat"
        on-post="onPost"
        on-action-click="onActionClick">
    </kendo-chat>
```
{% endif %}

## Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```HtmlHelper
    @(Html.Kendo().Chat()
        .Name("chat")
        .Events(e => e
            .Post(@<text>
                function() {
                    // Handle the post event inline.
                }
            </text>)
            .ActionClick(@<text>
                function() {
                    // Handle the action click event inline.
                }
            </text>)
        )
    )
```
{% if site.core %}
```TagHelper

    <kendo-chat name="chat"
        on-post="function() {
            // Handle the post event inline.
        }"
        on-action-click="function() {
            // Handle the action click event inline.
        }">
    </kendo-chat>
```
{% endif %}

## See Also

* [Server-Side API of the Chat](/api/chat)
* [Client-Side API of the Chat](https://docs.telerik.com/kendo-ui/api/javascript/ui/chat)
