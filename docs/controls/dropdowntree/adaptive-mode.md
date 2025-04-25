---
title: Adaptive Mode
page_title: Adaptive Mode
description: "Learn how to configure adaptive mode for the Kendo UI for jQuery DropDownTree component."
slug: dropdowntree_adaptive_mode_kendo
position: 12
---

# Adaptive Mode

The Kendo UI for jQuery DropDownTree provides adaptive mode&mdash;built-in mobile-friendly rendering of its popup that accommodates the component content based on the current screen size.

> Starting with the 2025 Q2 release, when the `adaptiveMode` property is enabled and the component is accessed on a mobile device, the popup will open as soon as the component receives focus. In previous versions, the popup only opened once the user clicks on the component.

To set the adaptive mode, use the `adaptiveMode` option. In the example below, you can resize the browser to see how the component will adapt to different resolutions.

```dojo
    <div style="justify-content:center; display:flex">
      <div style="width:600px; ">
        <input id="dropdowntree" style="width: 100%;" />
      </div>
    </div>
    <script>
      $(document).ready(function() {
        $("#dropdowntree").kendoDropDownTree({
          adaptiveMode: "auto", 
          placeholder: "Select ...",
          filter: "startswith",
          dataSource: [
              {
                  text: "Furniture", expanded: true, items: [
                      { text: "Tables & Chairs" },
                      { text: "Sofas" },
                      { text: "Occasional Furniture" }
                  ]
              },
              {
                  text: "Decor", items: [
                      { text: "Bed Linen" },
                      { text: "Curtains & Blinds" },
                      { text: "Carpets" }
                  ]
              }
          ]         
        });
      });
    </script>
```

## See Also

* [JavaScript API Reference of the DropDownTree](/api/javascript/ui/dropdowntree)
