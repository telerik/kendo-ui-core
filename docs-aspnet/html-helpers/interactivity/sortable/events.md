---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI for {{ site.framework }} Sortable component."
slug: events_sortable
position: 7
---

# Events

The Telerik UI Sortable for {{ site.framework }} [exposes multiple events](/api/kendo.mvc.ui.fluent/sortableeventbuilder) that allow you to control the behavior of the UI component.

For a complete example, refer to the [demo on using the Sortable events](https://demos.telerik.com/{{ site.platform }}/sortable/events).

## Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```HtmlHelper
    <ul id="sortable">
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
    </ul>

    @(Html.Kendo().Sortable()
        .For("#sortable")
        .Events(events => events
            .Start("onStart")
            .Change("onChange")
        )
    )

    <script>
        function onStart(e) {
            var id = e.sender.element.attr("id");
            console.log(id + " start: " + e.item.text());
        }

        function onChange(e) {
            var id = e.sender.element.attr("id"),
                text = e.item.text(),
                newIndex = e.newIndex,
                oldIndex = e.oldIndex;

            console.log(id + " change: " + text + " newIndex: " + newIndex + " oldIndex: " + oldIndex + " action: " + e.action);
        }
    </script>
```
{% if site.core %}
```TagHelper
     <ul id="sortable">
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
    </ul>

    <kendo-sortable name="sortable" on-start="onStart" on-change="onChange">
    </kendo-sortable>

    <script>
        function onStart(e) {
            var id = e.sender.element.attr("id");
            console.log(id + " start: " + e.item.text());
        }

        function onChange(e) {
            var id = e.sender.element.attr("id"),
                text = e.item.text(),
                newIndex = e.newIndex,
                oldIndex = e.oldIndex;

            console.log(id + " change: " + text + " newIndex: " + newIndex + " oldIndex: " + oldIndex + " action: " + e.action);
        }
    </script>
```
{% endif %}

## Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```HtmlHelper
    <ul id="sortable">
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
    </ul>

    @(Html.Kendo().Sortable()
        .For("#sortable")
        .Events(events => events
            .Start(@<text>
                function() {
                    // Handle the Start event inline.
                }
            </text>)
            .Change(@<text>
                function() {
                    // Handle the Change event inline.
                }
            </text>)
        )
    )
```
{% if site.core %}
```TagHelper
    <ul id="sortable">
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
    </ul>

    <kendo-sortable name="sortable"
        on-start="function() {
                 // Handle the Strat event inline.
              }"
        on-change="function() {
                 // Handle the Change event inline.
              }">
    </kendo-sortable>
```
{% endif %}

## See Also

* [Client-Side API of the Sortable](https://docs.telerik.com/kendo-ui/api/javascript/ui/sortable)
* [Server-Side API of the Sortable HtmlHelper](/api/sortable)
{% if site.core %}
* [Server-Side API of the Sortable TagHelper](/api/taghelpers/sortable)
{% endif %}

