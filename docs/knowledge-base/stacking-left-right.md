---
title: Stack Static Notifications to the Left or Right
page_title: Stack Static Notifications to the Left or Right 
description: "Learn how to stack static notifications to the left or to the right in the Kendo UI Notfication widget."
slug: howto_stack_static_tothe_leftor_right_notification
previous_url: /controls/layout/notification/how-to/stacking-left-right 
tags: telerik, kendo, jquery, notification, stack, static, to, the, left, or, right 
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

How can I stack static notifications to the left or to the right in the Kendo UI Notfication?

## Solution

The following example demonstrates how to achieve the desired scenario.

```dojo
  <style>
      .notification-container
      {
        min-height: 2.6em;
        padding: .3em .6em;
        overflow: auto;
      }

      #ntfLeft
      {
        text-align: right;
      }

      .notification-container .k-notification
      {
        padding: .3em .6em;
      }

    </style>

    <script id="my-template" type="text/x-kendo-template">
    <div class="my-container">
      #= message #
      </div>
    </script>

    <p><button id="buttonRight">Stack to the right</button></p>
    <div id="ntfRight" class="k-block notification-container"></div>

    <p><button id="buttonLeft">Stack to the left</button></p>
    <div id="ntfLeft" class="k-block notification-container"></div>

    <script>
      $(function() {
        var options = {
          stacking: "down",
          autoHideAfter: 0,
          templates: [{
            type: "my-type",
            template: $("#my-template").html()
          }],
          show: function(e) {
            e.element.css("display", "inline-block");
          }
        };
        var ntfRight = $("#ntfRight").kendoNotification($.extend(options, {stacking: "down", appendTo: "#ntfRight"})).data("kendoNotification");
        var ntfLeft = $("#ntfLeft").kendoNotification($.extend(options, {stacking: "up", appendTo: "#ntfLeft"})).data("kendoNotification");

        $("#buttonRight").kendoButton({
          click:stackLeftRight
        });

        $("#buttonLeft").kendoButton({
          click:stackLeftRight
        });
        function stackLeftRight(e) {
          var notificationWidget = $(e.sender.element).is("#buttonLeft") ? ntfLeft : ntfRight;
          var d = new Date();
          notificationWidget.show({
            message: kendo.toString(d, 'HH:MM:ss.') + kendo.toString(d.getMilliseconds(), "000")
          }, "my-type");

          var container = $(notificationWidget.options.appendTo);
          container.scrollTop(container[0].scrollHeight);
        }
      });
    </script>
```

## See Also

* [Basic Usage of the Notification (Demo)](https://demos.telerik.com/kendo-ui/notification/index)
* [Using the API of the Notification (Demo)](https://demos.telerik.com/kendo-ui/notification/api)
* [JavaScript API Reference of the Notification](/api/javascript/ui/notification)
