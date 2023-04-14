---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI Notification component for {{ site.framework }}."
slug: events_notification_aspnetcore
position: 7
---



# Events

The Telerik UI Notification for {{ site.framework }} exposes multiple [events](/api/Kendo.Mvc.UI.Fluent/NotificationEventBuilder) that allow you to control and customize the behavior of the UI component.

For a complete example on basic Notification events, refer to the [demo on using the events of the Notification](https://demos.telerik.com/{{ site.platform }}/notification/events).

## Handling by Handler Name

The following example demonstrates how to subscribe to events by handler name.

```HtmlHelper
    @(Html.Kendo().Notification()
        .Name("notification")
        .Position(p=>p.Top(120).Left(20))
        .Events(e => e
            .Show("notification_show")
            .Hide("notification_hide")
        )
    )
```
{% if site.core %}
```TagHelper
    <kendo-notification name="notification" on-show="notification_show" on-hide="notification_hide">
         <position top="120" left="20"></position>
    </kendo-notification>
```
{% endif %}
```JavaScript
    <script>
        function notification_show() {
            // Handle the show event.
        }

        function notification_hide() {
            // Handle the hide event.
        }
    </script>

```

## Handling by Template Delegate

The following example demonstrates how to subscribe to events by using a template delegate.

```HtmlHelper
    @(Html.Kendo().Notification()
        .Name("notification")
        .Position(p=>p.Top(120).Left(20))
        .Events(e => e
            .Show(@<text>
                function() {
                    // Handle the show event inline.
                }
            </text>)
            .Hide(@<text>
                function() {
                    // Handle the hide event inline.
                }
            </text>)
        )
    )
```
{% if site.core %}
```TagHelper
    <kendo-notification name="notification"
     on-show="function() {
        //Handle the show event inline.
    }"
     on-hide="function() {
       //Handle the hide event inline.
    }">
    </kendo-notification>
```
{% endif %}

## Next Steps

* [Using the Notification Events (Demo)](https://demos.telerik.com/{{ site.platform }}/notification/events)

## See Also

* [Using the API of the Notification HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/notification/api)
* [Notification Server-Side API](/api/notification)
* [Notification Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/notification)
