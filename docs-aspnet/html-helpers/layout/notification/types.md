---
title: Types
page_title: Types
description: "Use the built-in types of the Telerik UI Notification component for ASP.NET MVC."
components: ["notification"]
previous_url: /helpers/layout/notification/types
slug: types_notificatiomhelper_aspnetmvc
position: 2
---

# Types

The Notification provides the built-in `"info"`, `"success"`, `"warning"`, and `"error"` Notification types.

You can use different templates and looks for each type. The built-in Notification types provide ready-to-use shorthand methods for display as well as built-in templates and styling. The names of the shorthand methods match the listed Notification types.

> Starting with [**2026 Q1**](slug:breakingchanges_2026) version when no `type` parameter is passed to the [`show`](/api/javascript/ui/notification/methods/show) method, the Notification will be displayed with default colors (colourless). Previously, the default value of the `type` property was `info`. If you need to acheive the previous appearance you can use [`info`](/api/javascript/ui/notification/methods/info) method or explicitly pass `info` as a parameter to the [`show`](/api/javascript/ui/notification/methods/show) method.

The following example demonstrates the built-in Notification types. You can define an unlimited amount of custom notification types and corresponding [templates]({% slug templates_notificatiomhelper_aspnetmvc %}).

```HtmlHelper
    @(Html.Kendo().Notification()
        .Name("notification")
    )
```
{% if site.core %}
```TagHelper
<kendo-notification name="notification">
</kendo-notification>
```
{% endif %}
```JS script.js
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
```

## See Also

* [NotificationBuilder Server-Side API](/api/kendo.mvc.ui.fluent/notificationbuilder)
* [Notification Server-Side API](/api/notification)
