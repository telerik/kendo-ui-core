---
title: Overview
page_title: Overview | Kendo UI Notification HtmlHelper
description: "Get started with the server-side wrapper for the Kendo UI Notification widget for ASP.NET MVC."
slug: overview_notificatiomhelper_aspnetmvc
position: 1
---

# Notification

The Notification HtmlHelper extension is a server-side wrapper for the [Kendo UI Notification](https://demos.telerik.com/kendo-ui/notification/index) widget. The Kendo UI Notification widget delivers a styled UI with arbitrary content, which provides information to the user on various occasions.

Before reading on, make sure you are familiar with the fundamental [Kendo UI widget concepts]({% slug initialize_widgets_using_jquery_plugins_installation %}) and
the [Kendo UI MVC wrappers]({% slug overview_aspnetmvc %}) are setup correctly.

## Getting Started

### The Basics

The Notification widget can be initialized from any element, because it does not manipulate its content. The element will be hidden if the widget is used with popup notifications, or if the static notifications are not appended to the Notification element. In such cases, the element is assumed not needed.

If the Notification element is used to contain static (non-popup) notifications, it is recommended that its tag allows nesting the elements inside the template of the notifications. For example, inline elements, such as `span`, `a`, or `em`, cannot contain block elements, such as `div`, `p`, `ul`, `li`, or headings. Using a `div` element for the widget is OK.

### Initialization

The example below demonstrates how to initialize the Notification.

###### Example

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

## Configuration

### Notification Types

The Notification provides several built-in notification types&mdash;`"info"`, `"success"`, `"warning"`, and `"error"`. The benefit of having different notification types is the ability to use different templates and looks for each type. The built-in types provide ready-to-use shorthand methods for display, as well as built-in templates and styling. The shorthand method names match the listed notification types.

> **Important**
>
> If no type is specified when a notification is shown, the `"info"` type is displayed. An unlimited amount of custom notification types and corresponding templates can be defined.

For further details, refer to the [section on templates]({% slug overview_notificatiomhelper_aspnetmvc %}#templates).

The example below demonstrates the built-in Notification types.

###### Example

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

### Notification Hiding

By default, the notifications remain visible for 5 seconds and then disappear. Clicking anywhere on them removes them right away. If this is not intuitive enough for the user, a visible **Close** button can be displayed. Hide delay is configurable in milliseconds. A `0` (zero) value disables automatic hiding.

If needed, automatic hiding by clicking anywhere on the notifications can be disabled. In this case the notifications can be dismissed only with the button, if present. In addition, manually hiding a notification can be postponed. The benefit of this feature is to prevent accidental hiding of notifications, which have just appeared. By default, postponing is disabled.

The example below demonstrates how to manage the hide settings of the Notification.

###### Example

      @(Html.Kendo().Notification()
          .Name("notification")
          //Hide automatically after 7 seconds.
          .AutoHideAfter(7000)
          //Prevent accidental hiding for 1 second.
          .AllowHideAfter(1000)
          // show a hide button
          .Button(true)
          //Prevent hiding by clicking on the notification content.
          .HideOnClick(false)
      )

### Positioning and Stacking

By default, the Notification creates popup boxes, which overlay the other page content. If no position settings are defined, the first popup is displayed near the bottom-right corner of the browser viewport and subsequent popups stack upwards.

Positioning and stacking can be controlled independently. If no stacking setting is defined, the popups stack upwards or downwards, depending on the positioning settings. For example, popups which display at the top of the viewport stack downwards, and vice versa. Explicitly defining stacking is mostly needed when it should be leftward or rightward, which is a little uncommon.

By default, popups are pinned&mdash;when the page is scrolled, they do not move. This is achieved by applying a `position:fixed` style to the popups. When the popups are not pinned, they use `position:absolute`.

If the popup content varies and stacking is likely to occur, explicitly define dimensions, so that the popups are aligned and look better when stacked next to one another.

The example below demonstrates how to manage the position, stacking, and size of the Notification.

###### Example

      @(Html.Kendo().Notification()
          .Name("notification")
          .Position(p =>
          {
              //Notification popup will scroll together with the other content.
              p.Pinned(false);
              //The first notification popup will appear 30px from the viewport's top and right edge.
              p.Top(30);
              p.Right(30);
          })
          //New notifications will appear below old ones.
          .Stacking(NotificationStackingSettings.Down)
          //Set the appropriate size.
          .Width(300)
          .Height(50)
      )

There may be cases when the popup notifications appear too quickly or are too many on the screen, so that the available space gets very little. In such a case, the subsequent popups appear outside of the visible viewport area and are inaccessible, if pinned. If such scenarios are likely to occur, it is recommended to consider using shorter hide delay or static notifications (see below), for better usability.

Notifications can also display static messages, which do not overlay other elements, but instead take part in the normal flow of the page content. In this case, positioning settings do not make sense and are ignored. Stacking can be downwards (by default) or upwards. Static notifications are displayed if a target container is specified. A single widget instance can display either popup or static notifications, not both at the same time.

The example below demonstrates how to enable static notifications.

###### Example

      @(Html.Kendo().Notification()
          .Name("notification")
          //Insert all notifications to the widget's originating element.
          .AppendTo("#notification")
          //New notifications will appear above old ones.
          .Stacking(NotificationStackingSettings.Up)
      )

### Templates

Before reading on, make sure you are familiar with the concept of the [Kendo UI templates]({% slug overview_kendoui_templatescomponent %}).

Notifications allow configuring multiple templates. Each template is used together with its corresponding [notification type](#notification-types)&mdash;either build-in or custom. If you define a custom template for a built-in notification type, you are no longer able to use the corresponding built-in template, but you are still able to use the shorthand show methods, as demonstrated below.

The example below demonstrates how to use templates.

###### Example

      <script id="myAlertTemplate" type="text/x-kendo-template">
          <div class="myAlert">System alert generated at #= time # : #= myMessage #</div>
      </script>

      @(Html.Kendo().Notification()
          .Name("notification")
          .Templates(t =>
          {
              //Define a custom template for the built-in "warning" Notification type.
              t.Add().Type("warning").ClientTemplate("<div class='myWarning'>Warning: #= myMessage #</div>");
              //Define a template for the custom "timeAlert" Notification type.
              t.Add().Type("timeAlert").ClientTemplate("<div class='myAlert'>System alert generated at #= time # : #= myMessage #</div>");
              //The template content can also be defined separately. The above line can be replaced with:
              t.Add().Type("timeAlert").ClientTemplateID("myAlertTemplate");
          })
      )

  	<script>
  	$(function(){
          var n = $("#notification").data("kendoNotification");

          //Show a warning message using the built-in shorthand method.
          n.warning({
              myMessage: "some warning message here"
          });

          //Show a "timeAlert" message using the default show() method.
          n.show({
              time: new Date().toLocaleTimeString(),
              myMessage: "Server will be restarted."
          }, "timeAlert");
  	});
  	</script>

For more information on other Notification features and behavior, such as HTML output, RTL support, or Events, refer to the [introductory article on the Kendo UI Notification]({% slug overview_kendoui_notification_widget %}). The widget events and methods are described in the [Notification API section](/api/javascript/ui/notification).

## See Also

Other articles on Telerik UI for ASP.NET MVC and on the Notification:

* [ASP.NET MVC API Reference: NotificationBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/NotificationBuilder)
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Overview of the Kendo UI Notification Widget]({% slug overview_kendoui_notification_widget %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/aspnet-mvc/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_barcodehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
