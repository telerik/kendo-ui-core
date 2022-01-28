---
title: Move Visible Notifications after Hiding Others
page_title: Move Visible Notifications after Hiding Others | Kendo UI Notification
description: "Learn how to reposition notification messages after hiding others"
slug: howto_move_notifications_after_hiding_others
---

# Move Visible Notifications after Hiding Others

The following example demonstrates how to move the remaining visible notifications after some have been hidden and empty spaces in the stack have been created.

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
  <button id="showNotifications" class="k-button">Show some notifications</button>
  <button id="hideNotifications" class="k-button">Hide all</button>

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
      $("#showNotifications").click(showNotifications);

      // Hide the handler.
      $("#hideNotifications").click(function(){
        staticNotification.hide();
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
