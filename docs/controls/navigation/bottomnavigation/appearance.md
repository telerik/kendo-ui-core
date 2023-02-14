---
title: Appearance
page_title: jQuery BottomNavigation Documentation
description: "Learn how to customize the appearance of the jQuery BottomNavigation."
slug: appearance_bottomnavigation_widget
position: 3
---

# Appearance 

The Kendo UI BottomNavigation allows you to alter the appearance of the widget by setting its [itemFlow](/api/javascript/ui/bottomnavigation/configuration/itemflow), [themeColor](/api/javascript/ui/bottomnavigation/configuration/themeColor), [border](/api/javascript/ui/bottomnavigation/configuration/border), [shadow](/api/javascript/ui/bottomnavigation/configuration/shadow) and [fill](/api/javascript/ui/bottomnavigation/configuration/fill) options.

The example below demonstrates how to modify the appearance by using the above settings:

```dojo
    <nav id="bottomnavigation"></nav>

    <script>
        $(document).ready(function () {
            $("#bottomnavigation").kendoBottomNavigation({
                items: [
                    { data: { view: "home" }, icon: "home", text: "Home", selected: true },
                    { data: { view: "calendar" }, icon: "calendar", text: "Calendar" },
                    { data: { view: "profile" }, icon: "user", text: "Profile" }
                ],
                positionMode: "absolute",
                itemFlow:"vertical",
                themeColor: "secondary",
                fill: "solid",
                border: false,
                shadow: true
            });
        });
    </script>
```

For a complete example, please review [the Appearance BottomNavigation Demo](https://demos.telerik.com/kendo-ui/bottomnavigation/appearance)

## See Also

* [JavaScript API Reference of the BottomNavigation](/api/javascript/ui/bottomnavigation)