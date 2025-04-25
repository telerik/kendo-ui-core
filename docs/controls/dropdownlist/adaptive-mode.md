---
title: Adaptive Mode
page_title: Adaptive Mode
description: "Learn how to configure adaptive mode for the Kendo UI for jQuery DropDownList component."
slug: dropdownlist_adaptive_mode_kendo
position: 12
---

# Adaptive Mode

The Kendo UI for jQuery DropDownList provides adaptive mode&mdash;built-in mobile-friendly rendering of its popup that accommodates the component content based on the current screen size.

> Starting with the 2025 Q2 release, when the `adaptiveMode` property is enabled and the component is accessed on a mobile device, the popup will open as soon as the component receives focus. In previous versions, the popup only opened once the user clicks on the component.

To set the adaptive mode, use the `adaptiveMode` option. In the example below, you can resize the browser to see how the component will adapt to different resolutions.

```dojo
    <div style="justify-content:center; display:flex">
      <div style="width:600px; ">
        <input id="products" style="width: 100%;" />
      </div>
    </div>
    <script>
      $(document).ready(function() {
        $("#products").kendoDropDownList({
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

## See Also

* [JavaScript API Reference of the DropDownList](/api/javascript/ui/dropdownlist)
