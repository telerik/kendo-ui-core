---
title: Move Popup Notifications on Window Resize
page_title: Move Popup Notifications on Window Resize | Kendo UI Notification
description: "Learn how to move popup notifications on window resize in the Kendo UI Notification widget."
slug: howto_move_popup_notifications_onwindow_resize_notification
---

# Move Popup Notifications on Window Resize

The example below demonstrates how to move popup notifications on browser window resize, so that they remain within the viewport boundaries.

The code from the snippet executes the following actions:

1. Ensures that the `timeOutMoveFunction` function is executed once, some time after browser window resizing is complete.
1. Calculates the expected position of the first (oldest) notification popup and compare it with the current position.
1. Moves all notification popups, according to the discrepancy derived from the previous point.

###### Example

```html
    <div id="example">

      <span id="notification" style="display:none;"></span>

      <p>
        <button id="showNotification" class="k-button">Show a notification</button>
      </p>
      <h4>Hide notifications:</h4>
      <p>
        <button id="hideAllNotifications" class="k-button">Hide all notifications</button>
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

          $("#showNotification").click(function(){
            notification.info("foo");
          });

          $("#hideAllNotifications").click(function(){
            notification.hide();
          });

          var timeOut = -1;
          var timeOutMoveFunction = function(){
            var allNotificationPopups = $("body > .k-animation-container > .k-notification");
            if (allNotificationPopups[0]) {
              var firstPopupInstance = allNotificationPopups.first().data("kendoPopup");

              // calculate the expected notification popup position, according to the widget settings and popup size
              var x = $(window).width() - firstPopupInstance.element.width() - notification.options.position.right;
              var y = $(window).height() - firstPopupInstance.element.height() - notification.options.position.bottom;

              // compare the expected and actual popup position
              var diff = {
                top: y - parseInt(firstPopupInstance.wrapper.css("top"), 10),
                left: x - parseInt(firstPopupInstance.wrapper.css("left"), 10)
              };

              firstPopupInstance.wrapper.css({top: y, left: x});

              // move all notification popup, except the first one
              allNotificationPopups.not(allNotificationPopups.first()).each(function(){
                var element = $(this);
                element.parent().css({
                  top: parseInt(element.parent().css("top"), 10) + diff.top,
                  left: parseInt(element.parent().css("left"), 10) + diff.left
                });
              });
            }
          };

          // attach a window.resize handler, which will be executed once, after the browser window resizing is complete
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

Other articles on Kendo UI Notification:

* [Notification JavaScript API Reference](/api/javascript/ui/notification)
* [How to Stack Static Notifications to the Left or Right]({% slug howto_stack_static_tothe_leftor_right_notification %})
* [How to Move Visible Notifications after Hiding Others]({% slug howto_move_notifications_after_hiding_others %})
