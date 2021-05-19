---
title: Overview
page_title: jQuery Notification Documentation | Notification Overview
description: "Get started with the jQuery Notification by Kendo UI and learn how to create, initialize, and enable the widget."
slug: overview_kendoui_notification_widget
position: 1
---

# Notification Overview

The Notification provides a styled UI widget with arbitrary content which can provide information to the user on various occasions.

* [Demo page for the Notification](https://demos.telerik.com/kendo-ui/notification/index)

## Initializing the Notification

You can initialize the Notification from any element because the widget does not manipulate the content of that element. The element will be hidden if the widget is used with popup notifications or if static notifications are not appended to the Notification element. In these two cases it is assumed that the element will not be needed. However, if the Notification element is intended to contain static (non-popup) notifications, then its tag is recommended to be such so as to allow the nesting of elements inside the notification template. For example, inline elements, such as `<span>`, `<a>`, or `<em>`, cannot contain block elements, such as `<div>`, `<p>`, `<ul>`, `<li>`, or headings. It is perfectly fine to use a `<div>` element for initiating the widget.

The following example demonstrates how to initialize the Notification and what its basic usage is.

    <span id="notification"></span>

	<script>
	$(function(){
		var notificationElement = $("#notification");

        // Initialize the widget.
        notificationElement.kendoNotification();

        // Get the widget object.
        var notificationWidget = notificationElement.data("kendoNotification");

        // Display a "foo" message.
        notificationWidget.show("foo");
	});
	</script>

## Basic Configuration

Each Notification is rendered inside the `<div>` wrapper element. `TYPE` denotes if the [notification type]({% slug types_kendoui_notification %}) is built-in or custom, for example, `k-notification-info` or `k-notification-success`.

    <div class="k-widget k-notification k-notification-TYPE" data-role="popup">
        <!-- ... default or custom template content ... -->
    </div>

When the widget displays popups, the `div.k-notification` is nested inside an `absolute` or `fixed` positioned `div.k-animation-container` which is an element that wraps every Kendo UI popup. When the widget displays static notifications, the `div.k-notification` is a child of the element which is specified by the `appendTo` setting of the widget.

The following example demonstrates the default template of the Notification. The markup is rendered inside the `div.k-notification` element.

    <div class="k-notification-wrap">
        <span class="k-icon k-i-note">#=typeIcon#</span>
            #=content#
        <span class="k-icon k-i-close">Hide</span>
    </div>

## Functionality and Features

* [Notification types]({% slug types_kendoui_notification %})
* [Messages]({% slug positionstacking_kendoui_notification %})
* [Hiding]({% slug hidingw_kendoui_notification %})
* [Templates]({% slug templates_kendoui_notification %})
* [Globalization]({% slug globalization_kendoui_notification %})

## Events

The Notification exposes the `show` and `hide` events. `show` fires when the showing animation starts. `hide` fires when the hiding animation starts. For a runable example, refer to the [demo on using the events of the Notification](https://demos.telerik.com/kendo-ui/notification/events).

## Referencing Existing Instances

To access an existing Notification instance, use the `.data("kendoNotification")` jQuery method that is executed by the jQuery object of the originating element. For more information, refer to the article [getting a reference to a Kendo UI widget]({% slug initialize_widgets_using_jquery_plugins_installation %}). Once a reference is established, use the [Notification API](/api/javascript/ui/notification) to control its behavior.

## See Also

* [Basic Usage of the Notification (Demo)](https://demos.telerik.com/kendo-ui/notification/index)
* [Using the API of the Notification (Demo)](https://demos.telerik.com/kendo-ui/notification/api)
* [JavaScript API Reference of the Notification](/api/javascript/ui/notification)
