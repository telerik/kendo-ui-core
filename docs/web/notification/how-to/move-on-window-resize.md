---
title: Move popup notifications on window resize
page_title: Move popup notifications on window resize
description: Move popup notifications on window resize
---

# Move popup notifications on window resize

The following demo shows how to move popup notifications on browser window resize, so that they retain their original position with regard to the viewport boundaries.

What the code below does is the following:

1. Ensure that the `timeOutMoveFunction` function is executed once, some time after browser window resizing is complete.
1. Calculate the expected position of the first (oldest) notification popup and compare it with the current position.
1. Move all notification popups, according to the discrepancy derived in the previous point.

#### Example

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