---
title: Adaptive Mode
page_title: Adaptive Mode
description: "Learn how to configure adaptive mode for the Kendo UI for jQuery ColorPicker component."
slug: colorpicker_adaptive_mode_kendo
position: 8
---

# Adaptive Mode

The Kendo UI for jQuery ColorPicker supports an adaptive mode that allows the component to render a mobile-friendly popup. The popup will adjust its size and accommodate its content based on the current screen size.

To set the adaptive mode, use the `adaptiveMode` option. In the example below, you can resize the browser to see how the component will adapt to different resolutions.

```dojo
    <div style="justify-content:center; display:flex">
      <div style="width:600px; ">
        <input id="colorpicker" />
      </div>
    </div>
    <script>
      $(document).ready(function() {
        $("#colorpicker").kendoColorPicker({
          adaptiveMode: "auto"    
        });
      });
    </script>
```

## See Also

* [JavaScript API Reference of the ColorPicker](/api/javascript/ui/colorpicker)