---
title: Enable Dragging For Drag Handle of Kendo UI Switch
page_title: Enable Dragging For Drag Handle | Kendo UI Switch
description: "Learn how to enable dragging of the handle of the Kendo UI Switch."
slug: howto_enable_dragging_switch
---

# Enable Dragging For Drag Handle

The following example demonstrates how to enable dragging of the drag handle. The users will be able to slide the control to reveal the second value.

###### Example

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

* [Switch JavaScript API Reference](/api/javascript/ui/switch)