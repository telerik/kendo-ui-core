---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI OTPInput component for {{ site.framework }}."
slug: events_otpinputhelper
position: 6
---

# Events

The Telerik UI for {{ site.framework }} OTPInput exposes an [event](/api/kendo.mvc.ui.fluent/otpinputeventbuilder) that allows you to control and customize the behavior of the UI component.

For a complete example on the basic OTPInput event, refer to the [demo on using the events of the OTPInput](https://demos.telerik.com/{{ site.platform }}/otpinput/events).

## Handling by Handler Name

The following example demonstrates how to subscribe to events by handler name.

```HtmlHelper
    @(Html.Kendo().OTPInput()
        .Name("otp")
        .Items(5)
        .Events(e => e.Change("onChange"))
    )
```
{% if site.core %}
```TagHelper
    <kendo-otpinput name="otp"
                    items="5"
                    on-change="onChange">
    </kendo-otpinput>
```
{% endif %}
```JavaScript
    <script>
        function onChange() {
            // Handle the change event.
        }
    </script>
```

## Handling by Template Delegate

The following example demonstrates how to subscribe to events by using a template delegate.


```HtmlHelper
    @(Html.Kendo().OTPInput()
        .Name("otp")
        .Items(5)
        .Events(e => e
            .Change(@<text>
                function() {
                    // Handle the change event inline.
                }
            </text>)
        )
    )
```
{% if site.core %}
```TagHelper
    <kendo-otpinput name="otp"
                    items="5"
                    on-change="function() {
                         // Handle the change event inline.
                    }">
    </kendo-otpinput>
```
{% endif %}

## Next Steps

* [Using the OTPInput Events (Demo)](https://demos.telerik.com/{{ site.platform }}/otpinput/events)

## See Also

* [Using the API of the OTPInput for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/otpinput/api)
* [Server-Side API of the OTPInput HtmlHelper](/api/otpinput)
{% if site.core %}
* [Server-Side API of the OTPInput TagHelper](/api/taghelpers/otpinput)
{% endif %}
* [Client-Side API of the OTPInput](https://docs.telerik.com/kendo-ui/api/javascript/ui/otpinput)