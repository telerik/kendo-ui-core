---
title: Hiding
page_title: Hiding
description: "Learn the basics when working with the Telerik UI Notification HtmlHelper for {{ site.framework }}."
previous_url: /helpers/layout/notification/hiding
slug: hiding_notificatiomhelper_aspnetmvc
position: 3
---

# Hiding

By default, the Notification remains visible for five seconds and then disappears.

A `0` (zero) value disables the automatic hiding of the Notification. The delay of the Notification hiding can be configured in milliseconds.

Clicking anywhere on the Notification immediately hides it. If this behavior is not intuitive enough for the user, you can implement a visible **Close** button.

You can also disable the automatic hiding of the Notification that is triggered by the user clicking anywhere on it. In this case, the Notification can be dismissed only with a button for closing or hiding (if implemented).

In addition, you can postpone the manual hiding of the Notification which prevents the accidental hiding of notifications which have just appeared. By default, the manual delay of the Notification is disabled.

The following example demonstrates how to manage the hiding of the Notification.

    @(Html.Kendo().Notification()
        .Name("notification")
        // Hide automatically after seven seconds.
        .AutoHideAfter(7000)
        // Prevent accidental hiding for one second.
        .AllowHideAfter(1000)
        // Show a Hide button.
        .Button(true)
        // Prevent hiding by clicking on the Notification content.
        .HideOnClick(false)
    )

## See Also

* [NotificationBuilder Server-Side API](/api/Kendo.Mvc.UI.Fluent/NotificationBuilder)
* [Notification Server-Side API](/api/notification)
