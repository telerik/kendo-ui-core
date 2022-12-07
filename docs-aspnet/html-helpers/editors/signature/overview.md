---
title: Overview
page_title: Telerik UI Signature for {{ site.framework }} Documentation - Signature Overview
description: "Learn the basics when working with the Telerik UI Signature for {{ site.framework }}."
slug: overview_telerikui_signature_component
position: 1
---

# {{ site.framework }} Signature Overview

The Telerik UI Signature for {{ site.framework }} is a server-side wrapper for the Kendo UI Signature widget.

The Telerik UI Signature for {{ site.framework }} enables the user to create handwritten signatures.

* [Demo page for the Signature HtmlHelper](https://demos.telerik.com/{{ site.platform }}/signature/index)

## Basic Configuration

The following example demonstrates the basic configuration for the Signature.

```HtmlHelper
        @(Html.Kendo().Signature()
                .Name("signature")
                .Maximizable(false)
                .HideLine(true))
```
{% if site.core %}
```TagHelper
        <kendo-signature name="signature"
                         maximizable="false"
                         hide-line="true">
        </kendo-signature>
```
{% endif %}

## Functionality and Features

* [Image Export]({% slug image_export_telerikui_signature_component %})
* [Form Integration]({% slug form_integration_telerikui_signature_component %})

## Events

You can subscribe to all Signature [events](/api/signature). For a complete example on Signature events, refer to the [demo on handling Signature events](https://demos.telerik.com/{{ site.platform }}/signature/events).

The following example demonstrates how to subscribe to events by a handler name.

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

## Referencing Existing Instances

To reference an existing Telerik UI Signature for {{ site.framework }} instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) method. Once a reference is established, use the [Signature client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/signature#methods) to control its behavior.

        // Place the following after your Telerik UI Signature for {{ site.framework }} declaration.
        <script>
        $(function() {
        // The Name() of the Signature is used to get its client-side instance.
            var signature = $("#signature").data("kendoSignature");

            //Use the "value" API method to get the Signature's value.
            console.log(signature.value());
        });
        </script>

## See Also

* [Demo Page for the Signature](https://demos.telerik.com/{{ site.platform }}/signature)
* [API Reference of the Signature](https://docs.telerik.com/{{ site.platform }}/api/Kendo.Mvc.UI.Fluent/SignatureBuilder)
* [Knowledge Base Section](/knowledge-base)
