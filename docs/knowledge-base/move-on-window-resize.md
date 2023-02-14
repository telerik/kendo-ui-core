---
title: Move Popup Notifications on Window Resize
page_title: Move Popup Notifications on Window Resize 
description: "Learn how to move popup notifications on window resize in the Kendo UI Notification widget."
slug: howto_move_popup_notifications_onwindow_resize_notification
previous_url: /controls/layout/notification/how-to/move-on-window-resize 
tags: telerik, kendo, jquery, notification, move, popup, on, window, resize  
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

How can I move popup notifications on browser window resize, so that they remain within the viewport boundaries?

## Solution

The code from the example below executes the following actions:
1. Ensures that the `timeOutMoveFunction` function is executed once, some time after browser window resizing is complete.
1. Calculates the expected position of the first (oldest) notification popup and compare it with the current position.
1. Moves all notification popups, according to the discrepancy derived from the previous point.

```dojo
  <div id="example">

      <span id="notification" style="display:none;"></span>

      <p>
        <button id="showNotification" >Show a notification</button>
      </p>
      <h4>Hide notifications:</h4>
      <p>
        <button id="hideAllNotifications">Hide all notifications</button>
      </p>

      <script>
        $(document).ready(function() {

          var notification = $("#notification").kendoNotification({
            position: {
              bottom: 30,
              right: 30
            },
            autoHideAfter: 0
          }).data("kendoNotification");

          $("#showNotification").kendoButton({
            click:function(){
              notification.info("foo");
            }
          });

          $("#hideAllNotifications").kendoButton({
            click:function(){
              notification.hide();
            }
          });

          var timeOut = -1;
          var timeOutMoveFunction = function(){
            var allNotificationPopups = $("body > .k-animation-container > .k-notification");
            if (allNotificationPopups[0]) {
              var firstPopupInstance = allNotificationPopups.first().data("kendoPopup");

              // Calculate the expected Notification popup position according to the widget settings and popup size.
              var x = $(window).width() - firstPopupInstance.element.width() - notification.options.position.right;
              var y = $(window).height() - firstPopupInstance.element.height() - notification.options.position.bottom;

              // Compare the expected and actual popup position.
              var diff = {
                top: y - parseInt(firstPopupInstance.wrapper.css("top"), 10),
                left: x - parseInt(firstPopupInstance.wrapper.css("left"), 10)
              };

              firstPopupInstance.wrapper.css({top: y, left: x});

              // Move all notification popups except for the first one.
              allNotificationPopups.not(allNotificationPopups.first()).each(function(){
                var element = $(this);
                element.parent().css({
                  top: parseInt(element.parent().css("top"), 10) + diff.top,
                  left: parseInt(element.parent().css("left"), 10) + diff.left
                });
              });
            }
          };

          // Attach a window.resize handler, which will be executed once, after the browser window resizing is complete.
          $(window).resize(function() {
            if (timeOut != -1) {
              window.clearTimeout(timeOut);
            }
            timeOut = window.setTimeout(timeOutMoveFunction, 100);
          });

        });
      </script>
  </div>
```

## See Also

* [Basic Usage of the Notification (Demo)](https://demos.telerik.com/kendo-ui/notification/index)
* [Using the API of the Notification (Demo)](https://demos.telerik.com/kendo-ui/notification/api)
* [JavaScript API Reference of the Notification](/api/javascript/ui/notification)
