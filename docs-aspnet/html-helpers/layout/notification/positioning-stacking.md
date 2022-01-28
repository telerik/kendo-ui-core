---
title: Positioning and Stacking
page_title: Positioning and Stacking
description: "Learn the basics when working with the Telerik UI Notification HtmlHelper for {{ site.framework }}."
previous_url: /helpers/layout/notification/positioning-stacking
slug: positioning_notificatiomhelper_aspnetmvc
position: 4
---

# Positioning and Stacking

By default, the Notification creates popup boxes which overlay the rest of the page content.

If no position settings are defined, the first popup will be displayed near the bottom-right corner of the browser viewport and subsequent popups will stack upwards.

You can independently control the positioning and stacking of the Notifications. If you do not define any stacking setting, the popups stack upwards or downwards depending on the positioning settings. For example, popups which display at the top of the viewport stack downwards and vice versa. Explicitly defining stacking is mostly needed when you need a more specific stacking direction, for example, leftwards or rightwards.

By default, popups are pinned, that is, when the page is scrolled, popups do not move. This behavior is achieved by applying a `position:fixed` style to the popups. When the popups are not pinned, they use `position:absolute`.

If the popup content varies and stacking is likely to occur, explicitly define dimensions so that the popups are aligned and look better when stacked next to one another.

The following example demonstrates how to manage the position, stacking, and size of the Notification.

    @(Html.Kendo().Notification()
        .Name("notification")
        .Position(p =>
        {
            // The Notification popup will scroll together with the other content.
            p.Pinned(false);
            // The first Notification popup will appear 30px from the top and right edge of the viewport.
            p.Top(30);
            p.Right(30);
        })
        // New notifications will appear under old ones.
        .Stacking(NotificationStackingSettings.Down)
        // Set the appropriate size.
        .Width(300)
        .Height(50)
    )

You may need the popup notifications to appear too quickly or to implement so many Notifications on the screen that the available space gets very little. In such cases, the subsequent popups appear outside the visible viewport area and are inaccessible if they are pinned. In such cases, consider using a shorter hiding delay or implementing static notifications for better usability.

Notifications can also display static messages which do not overlay other elements but take part in the normal flow of the page content instead. In this case, the positioning settings are ignored. Stacking can be downwards (by default) or upwards. Static notifications are displayed if you specify a target container. A single Notification instance can display either popup or static notifications but not both types at the same time.

The following example demonstrates how to enable static notifications.

    @(Html.Kendo().Notification()
        .Name("notification")
        // Insert all notifications to the originating element of the Notification.
        .AppendTo("#notification")
        // New notifications will appear over old ones.
        .Stacking(NotificationStackingSettings.Up)
    )

## See Also

* [Positioning and Stacking by the Notification HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/notification/position-stacking)
* [NotificationBuilder Server-Side API](/api/Kendo.Mvc.UI.Fluent/NotificationBuilder)
* [Notification Server-Side API](/api/notification)
