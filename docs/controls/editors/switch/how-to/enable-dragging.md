---
title: Enable Dragging for the Drag Handle
page_title: Enable Dragging for the Drag Handle | Kendo UI Switch
description: "Learn how to enable the dragging of the handle of the Kendo UI Switch."
slug: howto_enable_dragging_switch
---

# Enable Dragging for the Drag Handle

You can enable the users to slide the Switch to reveal its second value.

The following example demonstrates how to enable the dragging of the Switch drag handle.

```dojo
  <input type="checkbox" id="switch" />

  <script>
    var sliding = false;
    var position;
    var handle;
    var constrain;
    var RESOLVEDPREFIX = kendo.support.transitions.css === undefined ? "" : kendo.support.transitions.css;
    var TRANSFORMSTYLE = RESOLVEDPREFIX + "transform";

    var switchButton = $("#switch").kendoSwitch({
      checked: true,
      width: 200,
      messages: {
        checked: "Yes",
        unchecked: "No",
      },
      change: function (e) {
        if (sliding) {
          e.preventDefault();
          sliding = false;
        }
      }
    }).data("kendoSwitch");

    handle = switchButton.wrapper.find(".k-switch-handle");
    var userEvents = new kendo.UserEvents(switchButton.wrapper, {
      start: _start,
      move: _move,
      end: _stop
    });

    function limitValue(value, minLimit, maxLimit) {
      return Math.max(minLimit, Math.min(maxLimit, value));
    }

    function _start() {
      if(!switchButton.options.enabled) {
          userEvents.cancel();
      } else {
          userEvents.capture();

          constrain = kendo._outerWidth(switchButton.wrapper, true) - kendo._outerWidth(handle, true);
          position = 0;

          handle.addClass("k-state-active");
      }
    };

    function _stop(e) {
      var checked = position > constrain / 2;

      sliding = false;

      handle.removeClass("k-state-active");
      switchButton.check(checked);
      switchButton.trigger("change", { checked: checked });
      sliding = true;
      handle.css(TRANSFORMSTYLE, "");
    };

    function _move(e) {
      var value = limitValue(position + e.x.delta, -constrain, constrain);
      e.preventDefault();

      position = value;
      handle.css(TRANSFORMSTYLE, "translatex(" + position + "px)");
    }
  </script>
```

## See Also

* [Basic Usage of the Switch (Demo)](https://demos.telerik.com/kendo-ui/switch/index)
* [Using the API of the Switch (Demo)](https://demos.telerik.com/kendo-ui/switch/api)
* [JavaScript API Reference of the Switch](/api/javascript/ui/switch)
