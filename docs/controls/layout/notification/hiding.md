---
title: Hiding
page_title: jQuery Notification Documentation | Hiding
description: "Get started with the jQuery Notification by Kendo UI and learn how to create, initialize, and enable the widget."
slug: hidingw_kendoui_notification
position: 4
---

# Hiding

By default, the Notifications remain visible for five seconds and then disappear.

Clicking anywhere on a notification hides it right away. You can delay hiding which is an option configurable in milliseconds. If you set a zero value, the automatic hiding is disabled. After its hiding animation is completed, the dismissed notification is removed from the DOM.

To make the Notification more intuitive for the end user, the widget allows you to display a visible **Close** button. The default behavior of hiding a notification by clicking anywhere on it can be disabled. In this case, the notification can be dismissed only by clicking the **Close** button, if present.

You can also postpone the manual hiding of a notification which is useful for preventing users from accidentally hiding a notification which has just appeared. By default, the delay for hiding a notification is disabled.

The following example demonstrates how to manage the hiding settings of a notification.

    <span id="notification"></span>

  	<script>
    	$(function(){
    		$("#notification").kendoNotification({
                // hide automatically after 7 seconds
                autoHideAfter: 7000,
                // prevent accidental hiding for 1 second
                allowHideAfter: 1000,
                // show a hide button
                button: true,
                // prevent hiding by clicking on the notification content
                hideOnClick: false
            });
    	});
  	</script>

## See Also

* [Basic Usage of the Notification (Demo)](https://demos.telerik.com/kendo-ui/notification/index)
* [Using the API of the Notification (Demo)](https://demos.telerik.com/kendo-ui/notification/api)
* [JavaScript API Reference of the Notification](/api/javascript/ui/notification)
