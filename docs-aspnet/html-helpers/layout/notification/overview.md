---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Notification HtmlHelper for {{ site.framework }}."
previous_url: /helpers/html-helpers/notification, /helpers/layout/notification/overview
slug: htmlhelpers_notification_aspnetcore
position: 1
---

# Notification HtmlHelper Overview

The Telerik UI Notification HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI Notification widget.

The Notification provides a styled UI widget with arbitrary content which can provide information to the user on various occasions.

* [Demo page for the Notification](https://demos.telerik.com/{{ site.platform }}/notification/index)

## Initializing the Notification

You can initialize the Notification from any element because it does not manipulate its content. The element will be hidden if the widget uses popup notifications or if the static notifications are not appended to the Notification element. In such cases, the element is not needed.

If the Notification element contains static (non-popup) notifications, enable its tag to allow nesting the elements inside the template of the notifications. For example, inline elements, such as `span`, `a`, or `em` cannot contain block elements such as `div`, `p`, `ul`, `li`, or headings. However, you can use a `div` element.

The following example demonstrates how to define the Notification by using the Notification HtmlHelper.

```
   @(Html.Kendo().Notification()
        .Name("notification")
    )

    <script type="text/javascript">
        $(document).ready(function () {
            var popupNotification = $("#notification").data("kendoNotification");

            popupNotification.show("Test popup message", "info");                        
        });
    </script>
```

## Basic Configuration

The following example demonstrates the basic configuration of the Notification HtmlHelper.

```    
    @(Html.Kendo().Notification()
        .Name("notification")
        .Stacking(NotificationStackingSettings.Down)
        .Width("12em")
        .Height(200)
        .HideOnClick(false)
        .Events(ev => ev.Show("onShow").Hide("onHide"))
        .Templates(t =>
        {
            t.Add().Type("time").ClientTemplate("<div style='padding: .6em 1em'>Time is: #: time #</div>");
        })
        .Button(true)
    )

    <script type="text/javascript">
        $(function () {
            // The Name() of the Notification is used to get its client-side instance.
            var notification = $("#notification").data("kendoNotification");
            console.log(notification);
        });
    </script>
```

## Events

For a complete example on basic Notification events, refer to the [demo on using the events of the Notification](https://demos.telerik.com/{{ site.platform }}/notification/events).

## See Also

* [Basic Usage of the Notification HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/notification)
* [Using the API of the Notification HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/notification/api)
* [Server-Side API](/api/notification)
