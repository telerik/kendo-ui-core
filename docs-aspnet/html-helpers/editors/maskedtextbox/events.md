---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI MaskedTextBox component for {{ site.framework }}."
slug: events_maskedtextbox_aspnetcore
position: 7
---

# Events

The Telerik UI MaskedTextBox for {{ site.framework }} exposes multiple [events](/api/kendo.mvc.ui.fluent/maskedtextboxeventbuilder) that allow you to control and customize the behavior of the UI component.

For a complete example on basic MaskedTextBox events, refer to the [demo on using the events of the MaskedTextBox](https://demos.telerik.com/{{ site.platform }}/maskedtextbox/events).

## Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.


```HtmlHelper
  @(Html.Kendo().MaskedTextBox()
        .Name("maskedtextbox")
        .Events(e => e
            .Change("maskedtextbox_change")
        )
  )
```
{% if site.core %}
```TagHelper
<kendo-maskedtextbox name="maskedtextbox"
               on-change="maskedtextbox_change">
</kendo-maskedtextbox>
```
{% endif %}
```JS script.js
  <script>
  function maskedtextbox_change() {
      // Handle the change event.
  }
  </script>
```

## Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.
    
```HtmlHelper
    @(Html.Kendo().MaskedTextBox()
        .Name("maskedtextbox")
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
    <kendo-maskedtextbox name="maskedtextbox"
                         on-change="
                         function() {
                           // Handle the change event inline.
                         }">
    </kendo-maskedtextbox>
```
{% endif %}

## Next Steps

* [Using the MaskedTextBox Events (Demo)](https://demos.telerik.com/{{ site.platform }}/maskedtextbox/events)

## See Also

* [Using the API of the MaskedTextBox HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/maskedtextbox/api)
* [MaskedTextBox Server-Side API](/api/maskedtextbox)
* [MaskedTextBox Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/maskedtextbox)
