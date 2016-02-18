---
title: Overview
page_title: Overview | Kendo UI Notification
description: "Learn how to initialize the Kendo UI Notification widget and customize it functionalities."
slug: overview_kendoui_notification_widget
position: 1
---

# Notification Overview

The [Kendo UI Notification widget](http://demos.telerik.com/kendo-ui/notification/index) provides a styled UI widget with arbitrary content, which can provide information to the user on various occasions.

> **Important**  
> The content of this page is intended to users that are familiar with the [fundamental Kendo UI widget concepts](/widgets).

## Getting Started

### Initialize the Notification

Kendo UI Notification can be initialized from any element, because it does not manipulate the element's content.

The element will be hidden if the widget is used with popup notifications, or if static notifications are not appended to the Notification element. In these two cases it is assumed that the element will not be needed. However, if the Notification element is meant to contain static (non-popup) notifications, then its tag is recommended to be such so as to allow nesting the elements inside the notifications' template. For example, inline elements, such as `<span>`, `<a>`, `<em>`, etc. cannot contain block elements, such as `<div>`, `<p>`, `<ul>`, `<li>`, headings, etc. It is perfectly fine to use a `<div>` element for initiating the widget.

The example below demonstrates how to initialize the Notification and what its basic usage is.

###### Example

    <span id="notification"></span>

	<script>
	$(function(){
		var notificationElement = $("#notification");

        // initialize the widget
        notificationElement.kendoNotification();

        // get the widget object
        var notificationWidget = notificationElement.data("kendoNotification");

        // display a "foo" message
        notificationWidget.show("foo");
	});
	</script>

## Configuration

### Notification Types

Kendo UI Notification provides the following built-in notification types: `"info"`, `"success"`, `"warning"` and `"error"`. By using them, you can apply different templates and looks for each type. The built-in types provide ready-to-use shorthand display methods and styling functionalities. The shorthand method names match the listed notification types. If you do not specify a notification type, the widget assumes that the default `"info"` should be invoked and will display it. You can also defines an unlimited amount of custom notification types and corresponding templates.

For more information on Notification templates, refer to the [Templates section of this article]({% slug overview_kendoui_notification_widget %}#templates).

The example below demonstrates how to apply built-in notification types.

###### Example

    <span id="notification"></span>

	<script>
	$(function(){
		var notificationElement = $("#notification");
        notificationElement.kendoNotification();
        var notificationWidget = notificationElement.data("kendoNotification");

        // display a "foo" warning message
        notificationWidget.show("foo", "warning");
        // the above line is equivalent to
        notificationWidget.warning("foo");

        // display a "bar" info message
        notificationWidget.show("bar", "info");
        // the above line is equivalent to
        notificationWidget.show("bar");
        // and also to
        notificationWidget.info("bar");
	});
	</script>

### Hide Notifications

By default, Kendo UI Notifications remain visible for 5 seconds and then disappear. Clicking anywhere on a notification hides it right away. You can delay hiding, which is an option configurable in milliseconds. If you set a zero value, the automatic hiding is disabled. After its hiding animation is completed, the dismissed notification is removed from the DOM.

If you want to make the notification more intuitive for the end user, the widget allows for displaying a visible **Close** button.

The default behavior of hiding a notification by clicking anywhere on it can be disabled. In this case, the notification can be dismissed only by clicking the **Close** button, if present.

The option of hiding a notification manually can also be postponed, which is useful if you want to prevent users from accidentally hiding a notification, which has just appeared. Note that by default the option to postpone the hiding of a notification is disabled.

The example below demonstrates how to manage the hiding settings of a notification.

###### Example

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

### Position and Stack Notifications

#### Popup messages

By default, Kendo UI Notification creates popups, which overlay the other page content. If you do not define any position settings, the first popup will be displayed near the bottom-right corner of the browser viewport and subsequent popups will stack upwards.

You can independently control positioning and stacking. If you do not define any stacking settings, the popups will stack upwards or downwards, depending on the positioning settings. For example, popups displayed at the top of the viewport will stack downwards and vice versa. The automatic settings of the stacking functionality comply with a common preference among users. However, you can render leftward or rightward stacking by explicitly defining the respective settings.  

Popups are [pinned](/api/javascript/ui/notification#configuration-position.pinned) by default, which means that they do not change their position when users scroll the page. The pinned functionality is achieved by applying a `position:fixed` style to the popups. If you want to let the popups move together with the scrolled page, use the `position:absolute` style.

If the popup content is expected to vary and stacking is likely to occur, it is a good idea to define explicit dimensions. In this way, the popups are aligned and look better when stacked next to one another.

The example below demonstrates how to manage the positioning, stacking, and sizing functionalities of notifications.

###### Example

    <span id="notification"></span>

	<script>
	$(function(){
		$("#notification").kendoNotification({
            position: {
                // notification popup will scroll together with the other content
                pinned: false,
                // the first notification popup will appear 30px from the viewport's top and right edge
                top: 30,
                right: 30
            },
            // new notifications will appear below old ones
            stacking: "down",
            // set appropriate size
            width: 300,
            height: 50
        });
	});
	</script>

There may be cases when the popup notifications appear too quickly or occupy too much space on the screen, so that there is not enaou. In such cases the subsequent popups will appear outside of the visible viewport area and will be inaccessible (if pinned). If such scenarios are likely to occur, it is recommended to consider using shorter hide delay or static notifications (see below), for better usability.

Stacking works with the help of a Globally Unique Identifier (GUID), which is generated by the widget upon initialization and appended as a CSS class to each notification element. In this way every Notification instance can recognize and manage its own currently visible notifications independently.

When a popup notification message from a given stack is hidden, the remaining visible popups do not move. If automatic moving and repositioning is desired, it can be achieved, as shown in the [Move Visible Notifications after Hiding Others]({% slug howto_move_notifications_after_hiding_others %}) how-to article.

> **Important**  
>
> Using several Notification widget instances, which display notifications at the same place on the page, is not recommended because the notifications from the multiple instances will overlap.

#### Static messages

Kendo UI Notification also allows for displaying static notifications, which do not overlay other elements, but instead take part in the so-called normal flow of the page content. In such cases, the positioning settings are ignored as they do not make sense. When you use static notifications, the stacking direction can only be set to `down`, which is the default setting, or `up`, depending on whether new messages should appear after or before the existing ones. Static notifications are displayed if a target container is specified. One widget instance can display either popup, or static notifications, but not both of them at one time.

The example below demonstrates how to enable static notifications.

###### Example

    <div id="notification"></div>

	<script>
	$(function(){
		$("#notification").kendoNotification({
            // insert all notifications to the widget's originating element
            appendTo: "#notification",
            // new notifications will appear above old ones
            stacking: "up"
        });
	});
	</script>

### Change Settings for Specific Notification Messages

It is possible for a single Notification widget instance to display different messages with different settings, e.g. messages related to automatic hiding, hide timeouts, etc. To apply the desired configuration options, use the [`setOptions`](/api/javascript/ui/widget#methods-setOptions) method. The new options will apply to all messages displayed later on. To restore or change the widget settings again, use `setOptions` as many times as necessary.

###### Example

    <span id="notification"></span>
    <script>
        var notificationWidget = $("#notification").kendoNotification({
            autoHideAfter: 1000
        }).data("kendoNotification");

        notificationWidget.show("foo text"); // message will auto hide after 1 second

        notificationWidget.setOptions({
            autoHideAfter: 2000
        });

        notificationWidget.show("bar text"); // message will auto hide after 2 seconds
    </script>

## HTML Output

Each notification is rendered inside the `<div>` wrapper element:

    <div class="k-widget k-notification k-notification-TYPE" data-role="popup">
        <!-- ... default or custom template content ... -->
    </div>

`TYPE` denotes the [notification type](#configuration-Types), either built-in, or custom, for example `k-notification-info` or `k-notification-success`, etc.

When the widget displays popups, the above `div.k-notification` is nested inside a positioned, either `absolute`, or `fixed`, `div.k-animation-container`, which is an element that wraps every Kendo UI popup.

When the widget displays static notifications, the above `div.k-notification` is a child of the element specified by the widget's [`appendTo`](#configuration-appendTo) setting.

The default template of Kendo UI Notification is shown below. This markup is rendered inside the `div.k-notification` element.

    <div class="k-notification-wrap">
        <span class="k-icon k-i-note">#=typeIcon#</span>
            #=content#
        <span class="k-icon k-i-close">Hide</span>
    </div>

## Notification API

### Events

Kendo UI Notification exposes two events: `show` and `hide`. The `show` event is fired when the showing animation starts. The `hide` event is fired when the hiding animation starts.

For more information on the configuration options, refer to the [Kendo UI Notification API section](/api/javascript/ui/notification).

## Templates

> **Important**  
>
> The content of this section is intended to users that are familiar with [Kendo UI templates](/framework/templates/overview).

Kendo UI Notification allows configuring multiple templates. Each template will be used together with its corresponding [notification type](#configuration-Types), either build-in, or custom. If you define a custom template for a built-in notification type, you will no longer be able to use the corresponding built-in template, but you will still be able to use the shorthand show methods, as demonstrated in the example below.

###### Example

    <span id="notification"></span>

    <script id="myAlertTemplate" type="text/x-kendo-template">
        <div class="myAlert">System alert generated at #= time # : #= myMessage #</div>
    </script>

	<script>
	$(function(){
        var notificationElement = $("#notification");

		notificationElement.kendoNotification({
            templates: [{
                    // define a custom template for the built-in "warning" notification type
                    type: "warning",
                    template: "<div class='myWarning'>Warning: #= myMessage #</div>"
                }, {
                    // define a template for the custom "timeAlert" notification type
                    type: "timeAlert",
                    template: "<div class='myAlert'>System alert generated at #= time # : #= myMessage #</div>"
                    // template content can also be defined separately
                    //template: $("#myAlertTemplate").html()
            }]
        });

        var n = notificationElement.data("kendoNotification");

        // show a warning message using the built-in shorthand method
        n.warning({
            myMessage: "some warning message here"
        });

        // show a "timeAlert" message using the default show() method
        n.show({
            time: new Date().toLocaleTimeString(),
            myMessage: "Server will be restarted."
        }, "timeAlert");
	});
	</script>

## RTL Support

Proper right-to-left support for the popup notifications, when using the built-in notification templates, requires the originating element of the Notification widget to be a descendant of an element with a `k-rtl` class. Static notifications using built-in templates should also be descendants of such a `.k-rtl` element.

For more information on right-to-left language support, refer to the [general RTL Support help article](http://docs.telerik.com/kendo-ui/web/appearance-rtl).

## Reference

### Existing Instances

Similar to all other Kendo UI widgets, an existing Notification instance is accessed via the `.data("kendoNotification")` jQuery method, executed by the jQuery object of the originating element.

For detailed information on how to get a reference to a Kendo UI widget, see [this help topic](/widgets#getting-reference-to-a-kendo-ui-widget).

For further reading on Kendo UI Notification settings, refer to [Kendo UI Notification API](/api/web/notification/).

## See Also

Other articles on Kendo UI Notification:

* [Notification JavaScript API Reference](/api/javascript/ui/notification)
* [How to Move Popup Notifications on Window Resize]({% slug howto_move_popup_notifications_onwindow_resize_notification %})
* [How to Move Visible Notifications after Hiding Others]({% slug howto_move_notifications_after_hiding_others %})
* [How to Stack Static Notifications to the Left or Right]({% slug howto_stack_static_tothe_leftor_right_notification %})
* [Overview of the ASP.NET MVC HtmlHelper Extension for the Notification Widget](/aspnet-mvc/helpers/notification/overview)
* [Overview of the Notification JSP Tag]({% slug overview_notification_uiforjsp %})
* [Overview of the Notification PHP Class](/php/widgets/notification/overview)
