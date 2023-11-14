---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI CheckBox component for {{ site.framework }}."
slug: events_checkbox
position: 3
---

# Events

The CheckBox for {{ site.framework }} exposes the [`Change()` event](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/checkboxeventbuilder#changesystemstring) that you can use for capturing the CheckBox's value during user interaction. 

### Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```HtmlHelper
    @(Html.Kendo().CheckBox()
        .Name("CheckBox")
        .Events(e => e
            .Change("change")
        )
    )
    <script>
        function change(e) {
            // Handle the change event.
        }
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-checkbox name="checkbox" on-change="change"></kendo-checkbox>
    <script>
        function change(e) {
            // Handle the change event.
        }
    </script>
```
{% endif %}

### Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```HtmlHelper
    @(Html.Kendo().CheckBox()
        .Name("checkbox")
        .Events(e => e
            .Change(@<text>
              function(e) {
                  // Handle the change event inline.
              }
            </text>)
        )
    )
```
{% if site.core %}
```TagHelper
    <kendo-checkbox name="checkbox"
              on-change="function() {
                 // Handle the change event inline.
              }">
    </kendo-checkbox>
```
{% endif %}

## Next Steps

* [Setting the CheckBox Appearance (Demo)](https://demos.telerik.com/{{ site.platform }}/checkbox/appearance)

## See Also

* [CheckBox Server-Side API for {{ site.framework}}](/api/checkbox)
* [CheckBox Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/checkbox)