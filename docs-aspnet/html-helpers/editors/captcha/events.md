---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI Captcha component for {{ site.framework }}."
slug: events_captcha_aspnetcore
position: 7
---

# Events

The Captcha exposes [`Change()` and `Navigate()` events](/api/kendo.mvc.ui.fluent/captchaeventbuilder) that you can handle. 

For a complete example on basic Captcha events, refer to the [demo on using the events of the Captcha](https://demos.telerik.com/{{ site.platform }}/captcha/events).

## Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```HtmlHelper
        @(Html.Kendo().Captcha()
          .Name("Captcha")
          .Events(e => e
                .Change("calendar_change")
                .Navigate("calendar_navigate")
          )
        )
        <script>
        function calendar_navigate() {
            // Handle the navigate event.
        }

        function calendar_change() {
            // Handle the change event.
        }
        </script>
```
{% if site.core %}
```TagHelper
    <kendo-captcha name="captcha" 
                             on-change="calendar_change" 
                             on-navigate="calendar_navigate">
    </kendo-captcha>
    <script>
        function calendar_navigate() {
            // Handle the navigate event.
        }

        function calendar_change() {
            // Handle the change event.
        }
    </script>
```
{% endif %}

## Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```HtmlHelper
  @(Html.Kendo().Captcha()
    .Name("Captcha")
    .Events(e => e
        .Change(@<text>
          function() {
              // Handle the change event inline.
          }
        </text>)
        .Navigate(@<text>
          function() {
              // Handle the navigate event inline.
          }
          </text>)
    )
  )
```
{% if site.core %}
```TagHelper
  <kendo-captcha name="captcha"
                           on-change='function() {
                                  //Handle the change event inline.
                           }'
                           on-navigate='function() {
                                  //Handle the navigate event inline.
                           }'>
  </kendo-captcha>
```
{% endif %}

## Next Steps

* [Configuring the Selection in the Captcha (Demo)](https://demos.telerik.com/aspnet-core/captcha/selection)

## See Also

* [Using the API of the Captcha HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/captcha/api)
* [Server-Side API of the Captcha](/api/captcha)
* [Client-Side API of the Captcha](https://docs.telerik.com/kendo-ui/api/javascript/ui/captcha)
