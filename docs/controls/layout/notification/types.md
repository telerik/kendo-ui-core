---
title: Types
page_title: jQuery Notification Documentation | Types
description: "Get started with the jQuery Notification by Kendo UI and use the built-in types of the widget."
slug: types_kendoui_notification
position: 2
---

# Types

The Notification provides the `"info"`, `"success"`, `"warning"`, and `"error"` built-in notification types.

The predefined Notifications enable you to apply different templates and looks for each type and provide ready-to-use shorthand display methods and styling functionalities. The shorthand method names match the listed notification types. If you do not specify a Notification type, the widget displays the `"info"` type. You can also define an unlimited amount of custom notification types and corresponding templates.

The following example demonstrates how to apply built-in notification types.

    <span id="notification"></span>

  	<script>
    	$(function(){
    		var notificationElement = $("#notification");
            notificationElement.kendoNotification();
            var notificationWidget = notificationElement.data("kendoNotification");

            // Display a "foo" warning message.
            notificationWidget.show("foo", "warning");
            // The above line is equivalent to:
            notificationWidget.warning("foo");

            // Display a "bar" information message.
            notificationWidget.show("bar", "info");
            // The above line is equivalent to:
            notificationWidget.show("bar");
            // and also to:
            notificationWidget.info("bar");
    	});
  	</script>

## See Also

* [Basic Usage of the Notification (Demo)](https://demos.telerik.com/kendo-ui/notification/index)
* [Using the API of the Notification (Demo)](https://demos.telerik.com/kendo-ui/notification/api)
* [JavaScript API Reference of the Notification](/api/javascript/ui/notification)
