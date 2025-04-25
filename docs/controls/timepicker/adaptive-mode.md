---
title: Adaptive Mode
page_title: Adaptive Mode
description: "Learn how to configure adaptive mode for the Kendo UI for jQuery TimePicker component."
slug: timepicker_adaptive_mode_kendo
position: 10
---

# Adaptive Mode

The Kendo UI for jQuery TimePicker provides adaptive mode&mdash;built-in mobile-friendly rendering of its popup that accommodates the component content based on the current screen size.

> Starting with the 2025 Q2 release, when the `adaptiveMode` property is enabled and the component is accessed on a mobile device, the popup will open as soon as the component receives focus. In previous versions, the popup only opened once the user began typing.

To set the adaptive mode, use the `adaptiveMode` option. In the example below, you can resize the browser to see how the component will adapt to different resolutions.

```dojo
    <div style="justify-content:center; display:flex">
      <div style="width:600px; ">
        <input id="timepicker" value="10:00 AM" title="timepicker" style="width: 100%;" />
      </div>
    </div>
    <script>
      $(document).ready(function() {
        $("#timepicker").kendoTimePicker({
          adaptiveMode: "auto"
        });
      });
    </script>
```

# On-Screen Keyboard

To enhance the mobile user experience of your application, you can configure the type of the on-screen keyboard for the TimePicker component.

To configure an on-screen keyboard for the TimePicker, set the `inputMode` property to a supported value. Based on the defined setting, the browser will display the most appropriate virtual keyboard on the screen.

The following example demonstrates how to configure an on-screen keyboard for the Kendo UI for jQuery TimePicker.

```dojo
    <input id="timepicker" value="10:00 AM" title="timepicker"/>     
     <script>
      $(document).ready(function() {
        $("#timepicker").kendoTimePicker({
          inputMode: "auto"
        });
      });
    </script>
```

## See Also

* [JavaScript API Reference of the TimePicker](/api/javascript/ui/timepicker)
