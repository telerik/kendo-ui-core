---
title: Overview
page_title: Notification Overview | Telerik UI for ASP.NET Core HTML Helpers
description: "Learn the basics when working with the Telerik UI Notification HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/html-helpers/notification
slug: htmlhelpers_notification_aspnetcore
position: 1
---

# Notification HtmlHelper Overview

The Telerik UI Notification HtmlHelper for ASP.NET Core is a server-side wrapper for the Kendo UI Notification widget.

The Notification provides a styled UI widget with arbitrary content which can provide information to the user on various occasions.

* [Demo page for the Notification](https://demos.telerik.com/aspnet-core/notification/index)

## Initializing the Notification

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

For a complete example on basic Notification events, refer to the [demo on using the events of the Notification](https://demos.telerik.com/aspnet-core/notification/events).

## See Also

* [Basic Usage of the Notification HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/notification)
* [Using the API of the Notification HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/notification/api)
* [Server-Side API](/api/notification)
