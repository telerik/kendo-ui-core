---
title: Overview
page_title: Notification HtmlHelper extension for Kendo UI Notification widget | Kendo UI documentation
description: Getting started with Notification HtmlHelper extension in quick steps - configure Kendo UI Notification widget and operate Kendo UI Notification events.
---

# Notification

The Notification HtmlHelper extension is a server-side wrapper for the [Kendo UI Notification](/api/web/notification) widget.

It is assumed that the reader of this page is familiar with the fundamental [Kendo UI widget concepts](/widgets) and
the [Kendo UI MVC wrappers](/aspnet-mvc/introduction) are setup correctly.

The **Kendo UI Notification** provides a styled UI widget with arbitrary content, which can provide information to the user on various occasions.

## Getting Started

The **Notification** widget can be initialized from any element, because it does not manipulate the element's content. The element **will be hidden** if the widget will be used with popup notifications,
or if static notifications will **not** be appended to the Notification element. In these two cases it is assumed that the element will not be needed for anything.

On the other hand, if the **Notification** element will be used to contain static (non-popup) notifications, then its tag is recommended to be one, which allows nesting the elements inside the notifications' template.
For example, inline elements (`span`, `a`, `em`, etc.) cannot contain block elements (`div`, `p`, `ul`, `li`, headings, etc.). Using a `div` element for the widget is OK.

### Example - initialization and basic usage

    @(Html.Kendo().Notification()
        .Name("notification")
    )
    
	<script>
	$(function(){
        // get the widget object
        var notificationWidget = $("#notification").data("kendoNotification");
        
        // display a "foo" message
        notificationWidget.show("foo");
	});
	</script>

## Notification Types

The **Notification** widget provides several built-in notification types: `"info"`, `"success"`, `"warning"` and `"error"`. The benefit of having different notification types is the ability to
use different templates and looks for each type. The built-in types provide ready-to-use shorthand methods for displaying, as well as built-in templates and styling. The shorthand method names match the listed notification types.
If no type is specified when a notification is shown, `"info"` is assumed. An unlimited amount of custom notification types and corresponding templates can be defined. For further details, see [Templates](#templates).

### Example - built-in notification types

    @(Html.Kendo().Notification()
        .Name("notification")
    )
	
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

## Hiding the notifications

By default, the notifications remain visible for 5 seconds and then disappear. Clicking anywhere on them removes them right away. If this is not intuitive enough for the users, a visible close button can be displayed.
Hide delay is configurable in milliseconds. A zero value disables automatic hiding.

If needed, automatic hiding by clicking anywhere on the notifications can be disabled. In this case the notifications can be dismissed only with the button, if it is present.
In addition, the ability to hide a notification manually can be postponed. The benefit of this feature is to prevent accidental hiding of notifications, which have just appeared. By default, postponing is disabled.

### Example - manage hide settings

    @(Html.Kendo().Notification()
        .Name("notification")
        // hide automatically after 7 seconds
        .AutoHideAfter(7000)
        // prevent accidental hiding for 1 second
        .AllowHideAfter(1000)
        // show a hide button
        .Button(true)
        // prevent hiding by clicking on the notification content
        .HideOnClick(false)
    )

## Positioning and stacking

By default, the **Notification** widget creates popups, which overlay the other page content. If no position settings are defined, the first popup will be displayed near the bottom-right corner of the browser viewport
and subsequent popups will stack upwards. Positioning and stacking can be controlled independently. If no stacking setting is defined, the popups will stack upwards or downwards, depending on the positioning settings
(e.g. popups which display at the top of the viewport will stack downwards and vice versa). In most cases automatic stacking is good enough.
Defining stacking explicitly is needed mostly when it should be leftward or rightward, which is a little uncommon.

By default, popups are *pinned*, i.e. when the page is scrolled, they do not move. This is achieved by applying a `position:fixed` style to the popups. When the popups are not pinned, they use `position:absolute`.

If the popup content will vary and stacking is likely to occur, it is a good idea to define explicit dimensions, so that the popups are aligned and look better when stacked next to one another.

### Example - manage position, stacking and size

    @(Html.Kendo().Notification()
        .Name("notification")
        .Position(p =>
        {
            // notification popup will scroll together with the other content
            p.Pinned(false);
            // the first notification popup will appear 30px from the viewport's top and right edge
            p.Top(30);
            p.Right(30);
        })
        // new notifications will appear below old ones
        .Stacking(NotificationStackingSettings.Down)
        // set appropriate size
        .Width(300)
        .Height(50)
    )

There may be cases when the popup notifications appear too quickly or become too much on the screen and there is no more available space. In this case the subsequent popups will appear outside of the visible
viewport area and will be inaccessible (if pinned). If such scenarios are likely to occur, it is recommended to consider using shorter hide delay or static notifications (see below), for better usability.

The **Notification** widget can also display "static" notifications, which do not overlay other elements, but instead take part in the so-called *normal flow* of the page content. In this case
positioning settings do not make sense and are ignored. Stacking can be downwards (by default) or upwards. Static notifications are displayed, if a target container is specified.
One widget instance can display either popup or static notifications, not both at the same time.

### Example - enable static notifications

    @(Html.Kendo().Notification()
        .Name("notification")
        // insert all notifications to the widget's originating element
        .AppendTo("#notification")
        // new notifications will appear above old ones
        .Stacking(NotificationStackingSettings.Up)
    )

## Templates

*This documentation section assumes that you are familiar with [Kendo UI templates](/framework/templates/overview)*.

The **Notification** widget allows configuring multiple templates. Each template will be used together with its corresponding [notification type](#notification-types) (either build-in or custom).
If you define a custom template for a built-in notification type, you will no longer be able to use the corresponding built-in template,
but you will still be able to use the shorthand show methods, as demonstrated below.

### Example - template usage

    <script id="myAlertTemplate" type="text/x-kendo-template">
        <div class="myAlert">System alert generated at #= time # : #= myMessage #</div>
    </script>

    @(Html.Kendo().Notification()
        .Name("notification")
        .Templates(t =>
        {
            // define a custom template for the built-in "warning" notification type
            t.Add().Type("warning").ClientTemplate("<div class='myWarning'>Warning: #= myMessage #</div>");
            // define a template for the custom "timeAlert" notification type
            t.Add().Type("timeAlert").ClientTemplate("<div class='myAlert'>System alert generated at #= time # : #= myMessage #</div>");
            // template content can also be defined separately. The above line can be replaced with:
            t.Add().Type("timeAlert").ClientTemplateID("myAlertTemplate");
        })
    )
    
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


For more information on other Notification features and behavior (HTML output, RTL support, Events, etc),
please refer to the widget's main [Overview](/web/notification/overview) help page.
The widget events and methods are described on the [Notification API](/api/web/notification/) page.