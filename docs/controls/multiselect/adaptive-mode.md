---
title: Adaptive Mode
page_title: Adaptive Mode
description: "Learn how to configure adaptive mode for the Kendo UI for jQuery MultiSelect component."
slug: multiselect_adaptive_mode_kendo
position: 14
---

# Adaptive Mode

The Kendo UI for jQuery MultiSelect provides adaptive mode&mdash;built-in mobile-friendly rendering of its popup that accommodates the component content based on the current screen size.

To set the adaptive mode, use the `adaptiveMode` option. In the example below, you can resize the browser to see how the component will adapt to different resolutions.

```dojo
    <div style="justify-content:center; display:flex">
      <div style="width:600px; ">
        <select id="products"></select>
      </div>
    </div>
    <script>
      $(document).ready(function() {
        $("#products").kendoMultiSelect({
          adaptiveMode: "auto",
          dataTextField: "text",
          dataSource: [
            {text: "Apples"},
            {text: "Oranges"},
            {text: "Bananas"}
          ]    
        });
      });
    </script>
```

# On-Screen Keyboard

To enhance the mobile user experience of your application, you can configure the type of the on-screen keyboard for the MultiSelect component.

To configure an on-screen keyboard for the MultiSelect, set the `inputMode` property to a supported value. Based on the defined setting, the browser will display the most appropriate virtual keyboard on the screen.

The following example demonstrates how to configure an on-screen keyboard for the Kendo UI for jQuery MultiSelect.

```dojo
    <select id="products"></select>    
    <script>
       $(document).ready(function() {
        $("#products").kendoMultiSelect({
          inputMode: "search",
          dataTextField: "text",
          dataSource: [
            {text: "Apples"},
            {text: "Oranges"},
            {text: "Bananas"}
          ]    
        });
      });
    </script>
```

## See Also

* [JavaScript API Reference of the MultiSelect](/api/javascript/ui/multiselect)