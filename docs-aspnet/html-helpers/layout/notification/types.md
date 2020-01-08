---
title: Types
page_title: Types
description: "Use the built-in types of the Telerik UI Notification HtmlHelper for ASP.NET MVC."
previous_url: /helpers/layout/notification/types
slug: types_notificatiomhelper_aspnetmvc
position: 2
---

# Types

The Notification provides the built-in `"info"`, `"success"`, `"warning"`, and `"error"` Notification types.

You can use different templates and looks for each type. The built-in Notification types provide ready-to-use shorthand methods for display as well as built-in templates and styling. The names of the shorthand methods match the listed Notification types.

> If no type is specified when a Notification is displayed, the `"info"` type is displayed. You can define an unlimited amount of custom notification types and corresponding [templates]({% slug templates_notificatiomhelper_aspnetmvc %}).

The following example demonstrates the built-in Notification types.

    @(Html.Kendo().Notification()
        .Name("notification")
    )

    <script>
        $(function(){
            var notificationWidget = $("#notification").data("kendoNotification");

            // Display a "foo" warning message.
            notificationWidget.show("foo", "warning");
            // The above line is equivalent to the following:
            notificationWidget.warning("foo");

            // Display a "bar" info message.
            notificationWidget.show("bar", "info");
            // The above line is equivalent to the following:
            notificationWidget.show("bar");
            // and also to the following:
            notificationWidget.info("bar");
        });
    </script>

## See Also

* [NotificationBuilder Server-Side API](/api/Kendo.Mvc.UI.Fluent/NotificationBuilder)
* [Notification Server-Side API](/api/notification)
