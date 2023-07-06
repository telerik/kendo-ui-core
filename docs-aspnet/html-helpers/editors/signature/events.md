---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI Signature component for {{ site.framework }}."
slug: events_signature_aspnetcore
position: 7
---



# Events

The Telerik UI Signature for {{ site.framework }} exposes multiple [events](/api/kendo.mvc.ui.fluent/signatureeventbuilder) that allow you to control and customize the behavior of the UI component.

For a complete example on basic Signature events, refer to the [demo on using the events of the Signature](https://demos.telerik.com/{{ site.platform }}/signature/events).

## Handling by Handler Name

The following example demonstrates how to subscribe to events by handler name.

```HtmlHelper
    @(Html.Kendo().Signature()
      .Name("signature")
      .Events(e => e
            .Open("signature_open")
            .Close("signature_close")
            .Change("signature_change")
      )
    )
```
{% if site.core %}
```TagHelper
    <kendo-signature name="signature"
        on-open="signature_open"
        on-close="signature_close"
        on-change="signature_change"/>
```
{% endif %}
```script.js
    function signature_open() {
        // Handle the open event.
    }

    function signature_close() {
        // Handle the close event.
    }

    function signature_change() {
        // Handle the change event.
    }
```

### Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```HtmlHelper
    @(Html.Kendo().Signature()
      .Name("signature")
      .Events(e => e
          .Open(@<text>
            function() {
                // Handle the open event inline.
            }
          </text>)
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
    <kendo-signature name="signature"
        on-open='function(e)
        {
            // Handle the open event inline.
        }'
        on-change='function(e)
        {
            // Handle the change event inline.
        }'/>
```
{% endif %}

## Next Steps

* [Using the Signature Events (Demo)](https://demos.telerik.com/{{ site.platform }}/signature/events)

## See Also

* [Using the API of the Signature HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/signature/api)
* [Signature Server-Side API](/api/signature)
* [Signature Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/signature)
