---
title: Move Visible Notifications after Hiding Others
page_title: Move Visible Notifications after Hiding Others
description: "Learn how to reposition notification messages after hiding other messages in the Kendo UI for jQuery Notification."
slug: howto_move_notifications_after_hiding_others
previous_url: /controls/layout/notification/how-to/move-on-notification-hide 
tags: telerik, kendo, jquery, notification, move, visible, after, hiding, others  
component: notification
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Notification for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Visual Studio version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I move the remaining visible notifications after some have been hidden and empty spaces in the stack have been created?

## Solution

The idea is to use static notification messages inside a positioned container. This approach creates the impression that popup notification messages are used. The position settings, which are normally applied to the Notification widget, have to be replaced by appropriate CSS styles that are applied to the container of the static messages.

The following example is based on the following API and widget functionality:
* [`appendTo`](/api/javascript/ui/notification/configuration/appendto)
* [`stacking`](/api/javascript/ui/notification/configuration/stacking)
* [Positioning and stacking of messages]({% slug positionstacking_kendoui_notification %})
* [Changing the auto-hide timeout on the fly]({% slug positionstacking_kendoui_notification %}#rendering-different-messages-for-single-notifications)

```dojo
<style>
    #appendto {
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 200px;
    }
</style>
  <div id="example">
      <span id="staticNotification"></span>
      <button id="showNotifications">Show some notifications</button>
      <button id="hideNotifications">Hide all</button>
      <div id="appendto"></div>
      <script>
        $(function() {
          // Initialize the Notification.
          var staticNotification = $("#staticNotification").kendoNotification({
            appendTo: "#appendto",
            stacking: "up"
          }).data("kendoNotification");
          // Show Notification messages with variable hide timeout.
          function showNotifications() {
            for (var j = 0; j < 10; j++) {
              staticNotification.setOptions({
                autoHideAfter: Math.ceil(Math.random() * 10000)
              });
              var d = new Date();
              staticNotification.show(kendo.toString(d, 'HH:MM:ss.') +
                                      kendo.toString(d.getMilliseconds(), "000"), "info");
            }
          }
          // Show the handler.
          $("#showNotifications").kendoButton({
            click:showNotifications
          })
          // Hide the handler.
          $("#hideNotifications").kendoButton({
            click:function(){
              staticNotification.hide();
            }
          });
          // Show Notification messages automatically.
          showNotifications();
        });
      </script>
  </div>
```

## See Also

* [Basic Usage of the Notification (Demo)](https://demos.telerik.com/kendo-ui/notification/index)
* [Using the API of the Notification (Demo)](https://demos.telerik.com/kendo-ui/notification/api)
* [JavaScript API Reference of the Notification](/api/javascript/ui/notification)
