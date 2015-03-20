---
title: Dynamic calculation of the widget height
page_title: Dynamic calculation of the widget height
description: Dynamic calculation of the widget height
---

# Dynamic calculation of the widget height

The example below demonstrates how to calculate widgets height dynamically.

#### Example:

```html
<div id="scheduler"></div>
<script type="text/javascript">
$(function() {
    $("#scheduler").kendoScheduler({
        height: 100,
        views: [
            {type: "day"},
            {type: "week", selected: true}
        ],
        timezone: "Etc/UTC",
        date: kendo.date.today(),
        dataSource: []
    });

    function fitWidget() {
      var widget = $("#scheduler").data("kendoScheduler");
      var height = $(window).outerHeight();

      //size widget to take the whole view
      widget.element.height(height);
      widget.resize(true);
    }

    $(window).resize(function() {
      clearTimeout(window._resizeId);

      window._resizeId = setTimeout(function() {
        console.log("resize");
        fitWidget();
      }, 500);
    });

    fitWidget();
  });
</script>
```
