---
title: Overview
page_title: Notification Overview | Telerik UI for ASP.NET MVC HTML Helpers
description: "Learn the basics when working with the Telerik UI Notification HtmlHelper for ASP.NET MVC."
slug: overview_notificatiomhelper_aspnetmvc
position: 1
---

# Notification HtmlHelper Overview

The Telerik UI Notification HtmlHelper for ASP.NET Core is a server-side wrapper for the Kendo UI Notification widget.

The Notification provides a styled UI widget with arbitrary content which can provide information to the user on various occasions.

* [Demo page for the Notification](https://demos.telerik.com/aspnet-core/notification)

## Initializing the Notification

You can initialize the Notification from any element because it does not manipulate its content. The element will be hidden if the widget uses popup notifications or if the static notifications are not appended to the Notification element. In such cases, the element is not needed.

If the Notification element contains static (non-popup) notifications, enable its tag to allow nesting the elements inside the template of the notifications. For example, inline elements, such as `span`, `a`, or `em` cannot contain block elements such as `div`, `p`, `ul`, `li`, or headings. However, you can use a `div` element.

## Basic Configuration

The following example demonstrates the basic configuration of the Notification HtmlHelper.

    @(Html.Kendo().Notification()
        .Name("notification")
    )

    <script>
        $(function(){
            // Get the Notification object.
            var notificationWidget = $("#notification").data("kendoNotification");

            // Display a "foo" message.
            notificationWidget.show("foo");
        });
    </script>

## Functionality and Features

* [Types]({% slug types_notificatiomhelper_aspnetmvc %})
* [Hiding]({% slug hiding_notificatiomhelper_aspnetmvc %})
* [Positioning and stacking]({% slug positioning_notificatiomhelper_aspnetmvc %})
* [Templates]({% slug templates_notificatiomhelper_aspnetmvc %})

## Events

For a complete example on basic Notification events, refer to the [demo on using the events of the Notification](https://demos.telerik.com/aspnet-core/notification/events).

## See Also

* [Basic Usage of the Notification HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/notification)
* [Using the API of the Notification HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/notification/api)
* [NotificationBuilder Server-Side API](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/NotificationBuilder)
* [Notification Server-Side API](/api/notification)
