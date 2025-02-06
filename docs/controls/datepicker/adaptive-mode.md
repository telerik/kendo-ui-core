---
title: Adaptive Mode
page_title: Adaptive Mode
description: "Learn how to configure adaptive mode for the Kendo UI for jQuery DatePicker component."
slug: datepicker_adaptive_mode_kendo
position: 15
---

# Adaptive Mode

The Kendo UI for jQuery DatePicker provides adaptive mode&mdash;built-in mobile-friendly rendering of its popup that accommodates the component content based on the current screen size.

To set the adaptive mode, use the `adaptiveMode` option. In the example below, you can resize the browser to see how the component will adapt to different resolutions.

```dojo
    <div style="justify-content:center">
      <div style="width:600px; ">
        <input id="datepicker" style="width: 100%;" />
      </div>
    </div>
    <script>
      $(document).ready(function() {
        $("#datepicker").kendoDatePicker({
          adaptiveMode: "auto"            
        });
      });
    </script>
```

# On-Screen Keyboard

To enhance the mobile user experience of your application, you can configure the type of the on-screen keyboard for the DatePicker component.

To configure an on-screen keyboard for the DatePicker, set the `inputMode` property to a supported value. Based on the defined setting, the browser will display the most appropriate virtual keyboard on the screen.

The following example demonstrates how to configure an on-screen keyboard for the Kendo UI for jQuery DatePicker.

```dojo
    <input id="products" style="width: 100%;" />                
    <script>
      $(document).ready(function() {
        $("#products").kendoDatePicker({
          inputMode: "numeric"    
        });
      });
    </script>
```

## See Also

* [JavaScript API Reference of the DatePicker](/api/javascript/ui/datepicker)