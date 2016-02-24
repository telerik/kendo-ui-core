---
title: Move Visible Notifications after Hiding Others
page_title: Move Visible Notifications after Hiding Others | Kendo UI Notification
description: "Learn how to reposition notification messages after hiding others"
slug: howto_move_notifications_after_hiding_others
---

# Move Visible Notifications after Hiding Others

The example below demonstrates how to move the remaining visible notifications after some have been hidden and empty spaces in the stack have been created.

The idea is to use **static** notification messages inside a **positioned container**. This creates the impression that popup notification messages are used.

The position settings, which are normally applied to the Notification widget, should be replaced by appropriate CSS styles applied to the static messages' container.

The example is based on the following API and widget functionality:

* [`appendTo`](/api/javascript/ui/notification#configuration-appendTo) setting
* [`stacking`](/api/javascript/ui/notification#configuration-stacking) setting
* [Positioning and Stacking]({% slug overview_kendoui_notification_widget %}#configuration-Position) documentation,
which also explains how to [change the auto-hide timeout on the fly]({% slug overview_kendoui_notification_widget %}#change-settings-for-specific-notification-messages)

###### Example

```html
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
  <button id="showNotifications" class="k-button">Show some notifications</button>
  <button id="hideNotifications" class="k-button">Hide all</button>

  <div id="appendto"></div>

  <script>
    $(function() {
      // initialize the Notification widget
      var staticNotification = $("#staticNotification").kendoNotification({
        appendTo: "#appendto",
        stacking: "up"
      }).data("kendoNotification");

      // show some Notification messages with variable hide timeout
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

      // show handler
      $("#showNotifications").click(showNotifications);

      // hide handler
      $("#hideNotifications").click(function(){
        staticNotification.hide();
      });

      // show some Notification messages automatically
      showNotifications();

    });
  </script>
</div>
```

## See Also

Other articles on Kendo UI Notification:

* [Notification JavaScript API Reference](/api/javascript/ui/notification)
* [How to Stack Static Notifications to the Left or Right]({% slug howto_stack_static_tothe_leftor_right_notification %})
* [How to Move Popup Notifications on Window Resize]({% slug howto_move_popup_notifications_onwindow_resize_notification %})
