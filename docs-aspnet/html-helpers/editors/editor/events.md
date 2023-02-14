---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI Editor component for {{ site.framework }}."
slug: events_editor_aspnetcore
position: 7
---

# Events

The Telerik UI Editor for {{ site.framework }} exposes multiple [events](/api/Kendo.Mvc.UI.Fluent/EditorEventBuilder) that allow you to control and customize the behavior of the component.

For a complete example of the basic Editor events, refer to the [demo on using the events of the Editor](https://demos.telerik.com/{{ site.platform }}/editor/events).

## Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```HtmlHelper
    <script>
        function onChange(e) {
            // Handle the change event.
        }

        function onPaste(e) {
            // Handle the paste event.
        }
    </script>

    @(Html.Kendo().Editor()
        .Name("editor")
        .HtmlAttributes(new { style = "width: 100%; height:470px" })
        .Events(e => e // Configure the client-side events.
            .Change("onChange")
            .Paste("onPaste")
        )
    )
```
{% if site.core %}
```TagHelper
    <script>
        function onChange(e) {
            // Handle the change event.
        }

        function onPaste(e) {
            // Handle the paste event.
        }
    </script>

    <kendo-editor name="editor" 
        style="width: 100%; height:470px"
        on-change="onChange"
        on-paste="onPaste">
    </kendo-editor>
```
{% endif %}

## Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```HtmlHelper
    @(Html.Kendo().Editor()
        .Name("editor")
        .HtmlAttributes(new { style = "width: 100%; height:470px" })
        .Events(e => e
            .Change(@<text>
                function() {
                    // Handle the change event inline.
                }
            </text>)
            .Paste(@<text>
                function() {
                    // Handle the paste event inline.
                }
            </text>)
        )
    )
```
{% if site.core %}
```TagHelper
    <kendo-editor name="editor" 
        style="width: 100%; height:470px"
        on-change="function() {
            // Handle the change event inline.
        }"
        on-paste="function() {
            // Handle the paste event inline.
        }">
    </kendo-editor>
```
{% endif %}

## Next Steps

* [Using the Editor Events (Demo)](https://demos.telerik.com/{{ site.platform }}/editor/events)

## See Also

* [Using the API of the Editor for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/editor/api)
* [Server-Side API of the Editor](/api/editor)
* [Client-Side API of the Editor](https://docs.telerik.com/kendo-ui/api/javascript/ui/editor)
