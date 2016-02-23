---
title: Overview
page_title: Overview | Notification JSP Tag
description: "Get started with the Notification JSP tag in Kendo UI."
slug: overview_notification_uiforjsp
position: 1
---

# Notification JSP Tag Overview

The Notification JSP tag is a server-side wrapper for the [Kendo UI Notification](/api/javascript/ui/notification) widget.

Before reading on, make sure you are familiar with the fundamental [Kendo UI widget concepts]({% slug initialize_widgets_using_jquery_plugins_installation %}) and the [Kendo UI Java wrappers]({% slug overview_uiforjsp %}) are set up correctly.

The Kendo UI Notification widget provides a styled UI widget with arbitrary content, which provides information to the user on various occasions.

## Getting Started

### The Basics

The Notification can be initialized from any element, because it does not manipulate the element's content. The element is going to be hidden if the widget is used with popup notifications, or if static notifications are not appended to the Notification element. In these two cases, it is assumed that the element is not needed for anything.

On the other hand, if the Notification element is used to contain static (non-popup) notifications, then its tag is recommended to be such so as to allow nesting the elements inside the notifications' template. For example, inline elements, such as `span`, `a`, and `em` among others, cannot contain block elements, such as `div`, `p`, `ul`, `li`, headings, etc. Using a `div` element for the widget is OK.

### Initialization

The example below demonstrates how to initialize the Notification and what its basic usage is.

###### Example

        <kendo:notification name="notification"></kendo:notification>

    	<script>
    	$(function(){
            // get the widget object
            var notificationWidget = $("#notification").data("kendoNotification");

            // display a "foo" message
            notificationWidget.show("foo");
    	});
    	</script>

## Configuration

### Notification Types

The Notification provides several built-in notification types&mdash;`"info"`, `"success"`, `"warning"`, and `"error"`. The benefit of having different notification types is that you are able to use different templates and looks for each type. The built-in types provide ready-to-use shorthand methods for displaying, as well as built-in templates and styling. The shorthand method names match the listed notification types.

If no type is specified when a notification is shown, `"info"` is assumed. An unlimited amount of custom notification types and corresponding templates can be defined. For further details, see the section on [templates](#templates).

The example below demonstrates how to apply the built-in notification types.

###### Example

    <kendo:notification name="notification"></kendo:notification>

	<script>
	$(function(){
        var notificationWidget = $("#notification").data("kendoNotification");

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

### Hiding of Notifications

By default, the notifications remain visible for 5 seconds and then disappear. Clicking anywhere on them removes them right away. If this is not intuitive enough for the users, a visible close button can be displayed. Hide delay is configurable in milliseconds. A zero value disables automatic hiding.

If needed, automatic hiding by clicking anywhere on the notifications can be disabled. In this case the notifications can be dismissed only with the button, if it is present. In addition, the ability to hide a notification manually can be postponed. The benefit of this feature is to prevent accidental hiding of notifications, which have just appeared. By default, postponing is disabled.

The example below demonstrates how to manage the settings related to hiding the notifications.

###### Example

      <kendo:notification name="notification" autoHideAfter="7000" allowHideAfter="1000" button="true" hideOnClick="false"></kendo:notification>

### Positioning and Stacking

By default, the Notification creates popups, which overlay the other page content. If no position settings are defined, the first popup is going to displayed near the bottom-right corner of the browser viewport and subsequent popups are going to stack upwards. Positioning and stacking can be controlled independently. If no stacking setting is defined, the popups stack upwards or downwards, depending on the positioning settings, e.g. popups, which display at the top of the viewport, are going to stack downwards and vice versa. In most cases automatic stacking is good enough. Explicitly defining stacking is mostly needed when it is to be positioned leftward or rightward, which is a little uncommon.

By default, popups are pinned&mdash;they do not move when the page is scrolled. This is achieved by applying a `position:fixed` style to the popups. When the popups are not pinned, they use `position:absolute`.

If the popup content varies and stacking is likely to occur, it is recommendable to define explicit dimensions, so that the popups are aligned and look better when stacked next to one another.

The example below demonstrates how to manage the position, stacking, and the size of a notification.

###### Example

    <kendo:notification name="notification" stacking="down" width="300" height="50">
        <kendo:notification-position pinned="false" top="30" right="30" />
    </kendo:notification>

There may be cases when the popup notifications appear too quickly or become too much on the screen and there is no more available space. In this case the subsequent popups appear outside of the visible viewport area and are inaccessible, if pinned. If such scenarios are likely to occur, it is recommended to consider using shorter hide delay or static notifications (see below) for better usability.

The Notification widget can also display static notifications, which do not overlay other elements, but instead take part in the so-called normal flow of the page content. In this case the positioning settings do not make sense and are ignored. Stacking can be downwards (by default) or upwards. Static notifications are displayed, if a target container is specified.

One widget instance can display either popup or static notifications, but not both of them at one and the same time.

The example below demonstrates how to enable static notifications.

###### Example

      <kendo:notification name="notification" appendTo="#notification" stacking="up"></kendo:notification>

### Templates

Before reading on, make sure you are familiar with the [Kendo UI templates]({% slug overview_kendoui_templatescomponent %}).

The Notification widget allows the configuration of multiple templates. Each template is used together with its corresponding [notification type](#configuration-Notification) (either build-in or custom). If you define a custom template for a built-in notification type, you are no longer able to use the corresponding built-in template, but you can still use the shorthand show methods.

The example below demonstrates how to use templates when configuring the Notification.

###### Example

    <script id="myAlertTemplate" type="text/x-kendo-template">
        <div class="myAlert">System alert generated at #= time # : #= myMessage #</div>
    </script>

    <kendo:notification name="notification">
        <kendo:notification-templates>
            <kendo:notification-template type="warning" template="<div class='myWarning'>Warning: #= myMessage #</div>" />
            <kendo:notification-template type="timeAlert" template="<div class='myAlert'>System alert generated at #= time # : #= myMessage #</div>" />
        </kendo:notification-templates>
    </kendo:notification>

    <%-- Templates can also be defined separately. The timeAlert template configuration above can be replaced with: --%>

    <kendo:notification name="notification">
        <kendo:notification-templates>
            <kendo:notification-template type="timeAlert" templateId="myAlertTemplate" />
        </kendo:notification-templates>
    </kendo:notification>

	<script>
	$(function(){
        var n = $("#notification").data("kendoNotification");

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

## See Also

Other articles on Telerik UI for JSP and on the Notification:

* [Overview of the Kendo UI Notification Widget]({% slug overview_kendoui_notification_widget %})
* [Notification JSP Tag API Reference](/api/jsp/notification/position)
* [Notification JavaScript API Reference](/api/javascript/ui/notification)
* [Telerik UI for JSP API Reference Folder](/api/jsp/autocomplete/animation)
* [Telerik UI for JSP Tags Folder]({% slug overview_autocomplete_uiforjsp %})
