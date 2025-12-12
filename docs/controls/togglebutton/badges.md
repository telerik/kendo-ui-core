---
title: Badge
page_title: Badge
description: "Include a badge and enhance the meaning of the text content of the Telerik UI ToggleButton component for {{ site.framework }}."
components: ["togglebutton"]
slug: badges_kendoui_togglebutton
position: 4
---

# Badge ToggleButton

The ToggleButton can incorporate a [Badge](https://docs.telerik.com/kendo-ui/controls/badge/overview) to enhance the meaning of the text content.

The ToggleButton provides the `badge` setting for configuring the ToggleButton's Badge. The [API](https://docs.telerik.com/kendo-ui/api/javascript/ui/badge) exposes several methods that you can use to customize the appearance of the Badge:

* `shape`&mdash;Specifies the shape of the badge. The default value is `rounded`.
* `size`&mdash;Sets the proportions of the badge. The default size is `medium`
* `themeColor`&mdash;Configures the default theme color for the badge. The default value is `primary`.
* `position`&mdash;Defines the position of the Badge of the badge. The default value is `inline`.
* `fill`&mdash;Species the fill mode of the badge. The default value is `solid`. 
* `visible`&mdash;Configures the visible state of the badge.
* `align`&mdash;Defines the alignment of the badge.
* `cutoutBorder`&mdash;Specifies wether or not to render additional cutout border around the badge.


```dojo

    <button id="inlineBadgeBtn">
        Inline Badge
    </button>

    <button id="overlayBadgeBtn">
        Overlay Badge
    </button>

    <script>
        $(document).ready(function(){
            $("#inlineBadgeBtn").kendoToggleButton({
                group: "badges",
                badge: {
                    position: "inline",
                    shape: "pill",
                    themeColor: "success",
                    text: "100%"
                }
            })

            $("#overlayBadgeBtn").kendoToggleButton({
                group: "badges",
                badge: {
                    shape: "rectangle",
                    themeColor: "warning",
                    text: "80%"
                }
            })
        })
    </script>
```

## See Also

* [Adding Badges to the ToggleButton for Kendo UI for jQuery (Demo)](https://demos.telerik.com/kendo-ui/togglebutton/badges)