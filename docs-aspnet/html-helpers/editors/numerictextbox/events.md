---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI NumericTextBox component for {{ site.framework }}."
slug: events_numerictextbox_aspnetcore
position: 8
---

# Events

You can subscribe to the `Change` and `Spin` [NumericTextBox events](/api/kendo.mvc.ui.fluent/numerictextboxeventbuilder) and further customize the functionality of the component.

For a complete example on basic NumericTextBox events, refer to the [demo on using the events of the NumericTextBox](https://demos.telerik.com/{{ site.platform }}/numerictextbox/events).

## Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```HtmlHelper
    @(Html.Kendo().NumericTextBox()
          .Name("numerictextbox")
          .Events(e => e
                .Change("numerictextbox_change")
                .Spin("numerictextbox_spin")
          )
    )
```
{% if site.core %}
```TagHelper
    <kendo-numerictextbox name="numerictextbox"
                      on-change="numerictextbox_change"
                      on-spin="numerictextbox_spin">
    </kendo-numerictextbox>
```
{% endif %}
```script
<script>
    function numerictextbox_spin() {
        // Handle the spin event.
    }

    function numerictextbox_change() {
        // Handle the change event.
    }
</script>
```

## Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```HtmlHelper
    @(Html.Kendo().NumericTextBox()
        .Name("numerictextbox")
        .Events(e => e
            .Change(@<text>
                function() {
                    // Handle the change event inline.
                }
            </text>)
            .Spin(@<text>
                function() {
                    // Handle the spin event inline.
                }
            </text>)
        )
    )
```

## Next Steps

* [Using the NumericTextBox Events (Demo)](https://demos.telerik.com/aspnet-core/numerictextbox/events)

## See Also

* [Using the API of the NumericTextBox HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/numerictextbox/api)
* [Known Limitations of the NumericTextBox HtmlHelper for {{ site.framework }}]({% slug limitations_numerictextbox_aspnetcore %})
