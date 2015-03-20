---
title: Stack static notifications to the left or right
page_title: Stack static notifications to the left or right
description: Stack static notifications to the left or right
---

# Stack static notifications to the left or right

The following demo shows how to stack static notifications to the left or to the right

#### Example

```html
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

<p><button id="buttonRight" class="k-button">Stack to the right</button></p>
<div id="ntfRight" class="k-block notification-container"></div>

<p><button id="buttonLeft" class="k-button">Stack to the left</button></p>
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
  
  $(".k-button").click(function (e) {
    var notificationWidget = $(e.target).is("#buttonLeft") ? ntfLeft : ntfRight;
    var d = new Date();
    notificationWidget.show({
      message: kendo.toString(d, 'HH:MM:ss.') + kendo.toString(d.getMilliseconds(), "000")
    }, "my-type");

    var container = $(notificationWidget.options.appendTo);
    container.scrollTop(container[0].scrollHeight);
  });

  
});

</script>
```