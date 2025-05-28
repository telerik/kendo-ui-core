---
title: Adaptive Mode
page_title: Adaptive Mode
description: "Learn how to configure adaptive mode for the Kendo UI for jQuery DateRangePicker component."
slug: daterangepicker_adaptive_mode_kendo
position: 10
---

# Adaptive Mode

The Kendo UI for jQuery DateRangePicker provides adaptive mode&mdash;built-in mobile-friendly rendering of its popup that accommodates the component content based on the current screen size.

> Starting with the 2025 Q2 release, when the `adaptiveMode` property is enabled and the component is accessed on a mobile device, the popup will open as soon as the component receives focus. In previous versions, the popup only opened once the user began typing.

To set the adaptive mode, use the `adaptiveMode` option.

<demo metaUrl="daterangepicker/adaptive-mode/" height="600"></demo>

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
