---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI MediaPlayer component for {{ site.framework }}."
slug: events_mediaplayer_aspnetcore
position: 7
---

# Events

The MediaPlayer exposes various convenient events](/api/kendo.mvc.ui.fluent/mediaplayereventbuilder) that you can handle. 

For a complete example on basic MediaPlayer events, refer to the [demo on using the events of the MediaPlayer](https://demos.telerik.com/{{ site.platform }}/mediaplayer/events).

## Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```HtmlHelper
        @(Html.Kendo().MediaPlayer()
          .Name("mediaplayer")
          .Events(e => e
                .Pause("mediaplayer_pause")
          )
        )
        <script>
        function mediaplayer_pause() {
            // Handle the pause event.
        }
        </script>
```
{% if site.core %}
```TagHelper
    <kendo-mediaplayer name="mediaplayer" 
                             on-pause="mediaplayer_pause" >
    </kendo-mediaplayer>
    <script>
        function mediaplayer_pause() {
            // Handle the pause event.
        }
    </script>
```
{% endif %}

## Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```HtmlHelper
  @(Html.Kendo().MediaPlayer()
    .Name("mediaplayer")
    .Events(e => e
        .Pause(@<text>
          function() {
              // Handle the pause event inline.
          }
        </text>)
    )
  )
```
{% if site.core %}
```TagHelper
  <kendo-mediaplayer name="mediaplayer"
                           on-pause='function() {
                                  //Handle the pause event inline.
                           }'
                          >
  </kendo-mediaplayer>
```
{% endif %}

## Next Steps

* [Configuring the Selection in the MediaPlayer (Demo)](https://demos.telerik.com/{{ site.platform }}/mediaplayer/selection)

## See Also

* [Using the API of the MediaPlayer HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/mediaplayer/api)
* [Server-Side API of the MediaPlayer](/api/mediaplayer)
* [Client-Side API of the MediaPlayer](https://docs.telerik.com/kendo-ui/api/javascript/ui/mediaplayer)
