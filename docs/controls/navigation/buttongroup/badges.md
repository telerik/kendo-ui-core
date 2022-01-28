---
title: Badges
page_title: jQuery ButtonGroup Documentation | Badges
description: "Get started with the jQuery ButtonGroup by Kendo UI and add badges to its Button instances."
slug: badges_kendoui_buttongroup
position: 5
---

# Badges

The ButtonGroup provides options for adding badges to its Buttons.

To add or update a badge, use the `badge` property or the [`badge`](/api/javascript/ui/buttongroup/methods/badge) method.

    <div id="buttongroup">
    </div>

    <script>
        $("#buttongroup").kendoButtonGroup({
            items: [
                { text: "Option1", badge: "8" },
                { text: "Option2" }
            ]
        });
    </script>

## See Also

* [Using Badges in the ButtonGroup (Demo)](https://demos.telerik.com/kendo-ui/buttongroup/badges)
* [JavaScript API Reference of the ButtonGroup](/api/javascript/ui/buttongroup)
