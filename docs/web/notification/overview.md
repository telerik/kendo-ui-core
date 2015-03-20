---
title: Overview
page_title: Summary of Kendo UI Notification functionality
description: Find out how to use the Kendo UI Notification widget
---

# Notification Overview

The **Kendo UI Notification** provides a styled UI widget with arbitrary content, which can provide information to the user on various occasions.

*It is assumed that the reader of this page is familiar with the [fundamental Kendo UI widget concepts](/widgets).*

## Getting Started

The **Notification** widget can be initialized from any element, because it does not manipulate the element's content.
The element **will be hidden** if the widget will be used with popup notifications, or if static notifications will **not** be appended to the Notification element.
In these two cases it is assumed that the element will not be needed for anything.

On the other hand, if the **Notification** element will be used to contain static (non-popup) notifications, then its tag is recommended to be one,
which allows nesting the elements inside the notifications' template. For example, inline elements (`span`, `a`, `em`, etc.) cannot contain block
elements (`div`, `p`, `ul`, `li`, headings, etc.). Using a `div` element for the widget is OK.

### Example - initialization and basic usage

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

## Notification Types

The **Notification** widget provides several built-in notification types: `"info"`, `"success"`, `"warning"` and `"error"`.
The benefit of having different notification types is the ability to use different templates and looks for each type.
The built-in types provide ready-to-use shorthand methods for displaying, as well as built-in templates and styling.
The shorthand method names match the listed notification types. If no type is specified when a notification is shown, `"info"` is assumed.
An unlimited amount of custom notification types and corresponding templates can be defined. For further details, see [Templates](#templates).

### Example - built-in notification types

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

## Hiding the notifications

By default, the notifications remain visible for 5 seconds and then disappear. Clicking anywhere on them hides them right away.
If this is not intuitive enough for the users, a visible close button can be displayed. Hide delay is configurable in milliseconds. A zero value disables automatic hiding.

After its hiding animation is complete, the dismissed notification is removed from the DOM.

If needed, automatic hiding by clicking anywhere on the notifications can be disabled. In this case the notifications can be dismissed only with the button, if it is present.
In addition, the ability to hide a notification manually can be postponed. The benefit of this feature is to prevent accidental hiding of notifications, which have just appeared.
By default, postponing is disabled.

### Example - manage hide settings

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

## Positioning and stacking

### Popup messages

By default, the **Notification** widget creates popups, which overlay the other page content. If no position settings are defined,
the first popup will be displayed near the bottom-right corner of the browser viewport and subsequent popups will stack upwards.
Positioning and stacking can be controlled independently. If no stacking setting is defined, the popups will stack upwards or downwards, depending on the positioning settings
(e.g. popups which display at the top of the viewport will stack downwards and vice versa). In most cases automatic stacking is good enough.
Defining stacking explicitly is needed mostly when it should be leftward or rightward, which is a little uncommon.

By default, popups are *pinned*, i.e. when the page is scrolled, they do not move. This is achieved by applying a `position:fixed` style to the popups.
When the popups are not pinned, they use `position:absolute`.

If the popup content will vary and stacking is likely to occur, it is a good idea to define explicit dimensions, so that the popups are aligned and look better when stacked next to one another.

### Example - manage position, stacking and size

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

There may be cases when the popup notifications appear too quickly or become too much on the screen and there is no more available space.
In this case the subsequent popups will appear outside of the visible viewport area and will be inaccessible (if pinned).
If such scenarios are likely to occur, it is recommended to consider using shorter hide delay or static notifications (see below), for better usability.

Stacking works with the help of a GUID, which is generated by the widget upon initialization and appended as a CSS class to each notification element.
In this way every **Notification** instance can recognize and manage its own currently visible notifications independently.

> Using several **Notification** widget instances, which display notifications at the same place on the page is not recommended, because the notifications from the multiple instances will overlap.

### Static messages

The **Notification** widget can also display "static" notifications, which do not overlay other elements, but instead take part in the so-called *normal flow* of the page content.
In this case positioning settings do not make sense and are ignored. When static notifications are used, the stacking direction can only be set to `down` (default) or `up`,
depending on whether new messages should appear after or before existing ones. Static notifications are displayed, if a target container is specified.
One widget instance can display either popup or static notifications, not both at the same time.

### Example - enable static notifications

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

## Templates

*This documentation section assumes that you are familiar with [Kendo UI templates](/framework/templates/overview)*.

The **Notification** widget allows configuring multiple templates. Each template will be used together with its corresponding [notification type](#notification-types) (either build-in or custom).
If you define a custom template for a built-in notification type, you will no longer be able to use the corresponding built-in template,
but you will still be able to use the shorthand show methods, as demonstrated below.

### Example - template usage

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

## HTML output

Each notification is rendered inside the following wrapper element:

    <div class="k-widget k-notification k-notification-TYPE" data-role="popup">
        <!-- ... default or custom template content ... -->
    </div>

`TYPE` denotes the [notification type](#notification-types) (either a built-in or a custom one), for example `k-notification-info` or `k-notification-success`, etc.

When the widget displays popups, the above `div.k-notification` is nested inside a positioned (`absolute` or `fixed`) `div.k-animation-container`,
which is an element that wraps every Kendo UI popup.

When the widget displays static notifications, the above `div.k-notification` is a child of the element specified by the widget's [`appendTo`](#configuration-appendTo) setting.
    
The default template of the **Notification** widget is shown below. This markup is rendered inside the `div.k-nitification` element.

    <div class="k-notification-wrap">
        <span class="k-icon k-i-note">#=typeIcon#</span>
            #=content#
        <span class="k-icon k-i-close">Hide</span>
    </div>

## RTL Support

Proper right-to-left support for the popup notifications (when using the built-in notification templates) requires the originating element
of the Notification widget to be a descendant of an element with a `k-rtl` class. Static notifications using built-in templates should also be descendants of such a `.k-rtl` element.

For more information, please refer to the [general RTL Support article](http://docs.telerik.com/kendo-ui/web/appearance-rtl).

## Events

The **Notification** widgets exposes two events - `show` and `hide`. The `show` event is fired when the showing animation starts. The `hide` event is fired when the hiding animation starts.

## Accessing the Notification instance

Similar to all other Kendo UI widgets, an existing **Notification** instance is accessed via the `.data("kendoNotification")` jQuery method, executed by the jQuery object of the originating element.
See [Getting reference to a Kendo UI widget](/widgets#getting-reference-to-a-kendo-ui-widget).

For further reading and related information, please refer to the [Notification API](/api/web/notification/).