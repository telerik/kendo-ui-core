---
title: Adaptive Mode
page_title: Adaptive Mode
description: "Learn how to configure adaptive mode for the Kendo UI for jQuery DateRangePicker component."
slug: daterangepicker_adaptive_mode_kendo
position: 10
---

# Adaptive Mode

The Kendo UI for jQuery DateRangePicker provides adaptive mode&mdash;built-in mobile-friendly rendering of its popup that accommodates the component content based on the current screen size.

To set the adaptive mode, use the `adaptiveMode` option. In the example below, you can resize the browser to see how the component will adapt to different resolutions.

```dojo
    <div style="justify-content:center">
      <div style="width:600px; ">
        <div id="daterangepicker" style="width: 100%;"></div>
      </div>
    </div>
    <script>
      $(document).ready(function() {
        $("#products").kendoDateRangePicker({
          adaptiveMode: "auto"
        });
      });
    </script>
```

# On-Screen Keyboard

To enhance the mobile user experience of your application, you can configure the type of the on-screen keyboard for the DateRangePicker component.

To configure an on-screen keyboard for the DateRangePicker, set the `inputMode` property to a supported value. Based on the defined setting, the browser will display the most appropriate virtual keyboard on the screen.

The following example demonstrates how to configure an on-screen keyboard for the Kendo UI for jQuery DateRangePicker.

```dojo
    <div id="daterangepicker" "></div>          
    <script>
      $(document).ready(function() {
        $("#daterangepicker").kendoDateRangePicker({
          inputMode: "numeric"         
        });
      });
    </script>
```

## See Also

* [JavaScript API Reference of the DateRangePicker](/api/javascript/ui/daterangepicker)