---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI ProgressBar component for {{ site.framework }}."
slug: progressbar_events
position: 6
---

# Events

You can subscribe to all [ProgressBar events](/api/kendo.mvc.ui.fluent/progressbareventbuilder). For a complete example on basic ProgressBar events, refer to the [demo on using the events of the ProgressBar](https://demos.telerik.com/{{ site.platform }}/progressbar/events).

## Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```HtmlHelper
    @(Html.Kendo().ProgressBar()
            .Name("progressBar")
            .Events(e => {
                    e.Change("onChange");
                    e.Complete("onComplete");
            })
    )
    <script>
        function onChange(e) {
            // Handle the change event.
        }

        function onComplete(e) {
            // Handle the complete event.
        }
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-progressbar name="progressBar" on-change="onChange" on-complete="onComplete"/>
        <script>
        function onChange(e) {
            // Handle the change event.
        }

        function onComplete(e) {
            // Handle the complete event.
        }
    </script>
```
{% endif %}

## Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```HtmlHelper
    @(Html.Kendo().ProgressBar()
        .Name("progressBar")
        .Events(e => e.Change(@<text>
                function() {
                    // Handle the change event.
                }
            </text>)
        )
    )
```

## Next Steps

* [Using the ProgressBar Events (Demo)](https://demos.telerik.com/{{ site.platform }}/progressbar/events)

## See Also

* [Using the API of the ProgressBar for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/progressbar/api)
* [Server-Side API of the ProgressBar](/api/progressbar)
* [Client-Side API of the ProgressBar](https://docs.telerik.com/kendo-ui/api/javascript/ui/progressbar)
