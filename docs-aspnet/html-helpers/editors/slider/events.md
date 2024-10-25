---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI for {{ site.framework }} Slider component."
slug: events_slider
position: 4
---

# Events

The Telerik UI Slider for {{ site.framework }} exposes [`Change`](/api/kendo.mvc.ui.fluent/slidereventbuilder#changesystemstring) and [`Slide`](/api/kendo.mvc.ui.fluent/slidereventbuilder#slidesystemstring) events that allow you to control the behavior of the UI component.

For a complete example, refer to the [demo on using the Slider events](https://demos.telerik.com/{{ site.platform }}/slider/events).

## Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```HtmlHelper
    @(Html.Kendo().Slider()
        .Name("slider")
        .Events(e => e
            .Change("change")
            .Slide("slide")
        )
    )

    <script>
        function change(e) {
            // Handle the change event.
        }

        function slide(e) {
            // Handle the slide event.
        }
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-slider name="slider"
        on-change="change"
        on-slide="slide"
    </kendo-slider>

    <script>
        function change(e) {
            // Handle the change event.
        }

        function slide(e) {
            // Handle the slide event.
        }
    </script>
```
{% endif %}

## Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```HtmlHelper
    @(Html.Kendo().Slider()
        .Name("slider")
        .Events(e => e
            .Change(@<text>
              function(e) {
                  // Handle the change event inline.
              }
            </text>)
            .Slide(@<text>
              function(e) {
                  // Handle the slide event inline.
              }
              </text>)
        )
    )
```
{% if site.core %}
```TagHelper
    <kendo-slider name="slider"
        on-change="function() {
                 // Handle the change event inline.
              }"
        on-slide="function() {
                 // Handle the slide event inline.
              }">
    </kendo-slider>
```
{% endif %}

## See Also

* [Client-Side API of the Slider](https://docs.telerik.com/kendo-ui/api/javascript/ui/slider)
* [Server-Side API of the Slider HtmlHelper](/api/slider)
{% if site.core %}
* [Server-Side API of the Slider TagHelper](/api/taghelpers/slider)
{% endif %}


