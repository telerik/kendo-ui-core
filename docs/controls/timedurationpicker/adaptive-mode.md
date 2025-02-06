---
title: Adaptive Mode
page_title: Adaptive Mode
description: "Learn how to configure adaptive mode for the Kendo UI for jQuery TimeDurationPicker component."
slug: timedurationpicker_adaptive_mode_kendo
position: 10
---

# Adaptive Mode

The Kendo UI for jQuery TimeDurationPicker provides adaptive mode&mdash;built-in mobile-friendly rendering of its popup that accommodates the component content based on the current screen size.

To set the adaptive mode, use the `adaptiveMode` option. In the example below, you can resize the browser to see how the component will adapt to different resolutions.

```dojo
    <div style="justify-content:center; display:flex">
      <div style="width:600px; ">
        <input id="timedurationpicker" title="timedurationpicker" />
      </div>
    </div>
    <script>
      $(document).ready(function() {
        $("#timedurationpicker").kendoTimeDurationPicker({
          adaptiveMode: "auto",
          value: 9000000,
          columns: [{ name: "hours", format: "## hours "}, { name: "minutes", format: " ## minutes"}]
        });
      });
    </script>
```

# On-Screen Keyboard

To enhance the mobile user experience of your application, you can configure the type of the on-screen keyboard for the TimeDurationPicker component.

To configure an on-screen keyboard for the TimeDurationPicker, set the `inputMode` property to a supported value. Based on the defined setting, the browser will display the most appropriate virtual keyboard on the screen.

The following example demonstrates how to configure an on-screen keyboard for the Kendo UI for jQuery TimeDurationPicker.

```dojo
    <input id="timedurationpicker" title="timedurationpicker" />       
    <script>
      $(document).ready(function() {
        $("#timedurationpicker").kendoTimeDurationPicker({
          inputMode: "numeric",
          value: 9000000,
          columns: [{ name: "hours", format: "## hours "}, { name: "minutes", format: " ## minutes"}]
        });
      });
    </script>
```

## See Also

* [JavaScript API Reference of the TimeDurationPicker](/api/javascript/ui/timedurationpicker)