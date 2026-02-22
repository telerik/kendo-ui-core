---
title: Controlling Tooltip Trigger Time in Kendo UI for ASP.NET MVC
description: Learn how to delay the tooltip trigger in Kendo UI for ASP.NET MVC to only display after a specified hover duration.
type: how-to
page_title: How to Delay Tooltip Trigger in Kendo UI for ASP.NET MVC
slug: delay-tooltip-trigger-kendo-ui-aspnet-mvc
tags: kendo-ui, asp.net-mvc, tooltip, hover, delay, trigger
res_type: kb
components: ["tooltip"]
category: knowledge-base
ticketid: 1636529
---

## Environment

| Product                  | Version   |
|--------------------------|-----------|
| Progress® Kendo UI® ToolTip for ASP.NET MVC | 2021.2.511 |

## Description

I want to control the trigger time for the Kendo UI Tooltip. The tooltip should not display immediately upon hover. Instead, it should only trigger after the cursor has been over the target element for more than one second. The current behavior triggers the tooltip on any mouseover, but I want to delay this so the tooltip does not show if the hover duration is less than a few seconds (specifically 1 second here).

This KB article also answers the following questions:
- How to delay the display of a tooltip in ASP.NET MVC?
- How to implement a hover delay for Kendo UI Tooltip?
- How to prevent a tooltip from showing immediately upon mouseover in Kendo UI for ASP.NET MVC?

## Solution

To delay the tooltip trigger in Kendo UI for ASP.NET MVC, follow these steps:

1. Add an HTML element (the target for the tooltip) and its wrapper element.
2. In the global scope of the JavaScript, set two variables: `counter` and `myInterval`. These variables will count the hover time.
3. Use the `document.ready` scope to handle the `hover` event of the target element.
4. Utilize the `setInterval` method to start counting every second upon hover.
5. Configure the tooltip and show it based on the counter value.
6. Use a callback function to clear the interval and destroy the tooltip when the mouse leaves the element.

Below is an example implementation:

```html
<!-- The HTML -->
<span id="container">
    <span id="testBtn" class="k-button wider">Hover me!</span>
</span>
```

```javascript
// The JavaScript
<script>
    var counter = 0;
    var myInterval = null;

    $(document).ready(function () {
        $("#testBtn").hover(function (e) {
            counter = 0; // Reset counter on hover
            myInterval = setInterval(function () {
                ++counter;
                if (counter >= 1) { // Check if hover duration is more than 1 second
                    var tooltip = $("#container").kendoTooltip({
                        content: "Hello!",
                    }).data("kendoTooltip");

                    tooltip.show();
                }
            }, 1000); // Set interval to 1000 milliseconds (1 second)
        }, function (e) {
            clearInterval(myInterval); // Clear interval on mouse leave
            $("#container").data("kendoTooltip").destroy(); // Destroy tooltip
        });
    });
</script>
```

This implementation sets the tooltip to trigger after hovering over the target element for more than one second. Adjust the interval duration (`1000` milliseconds in this example) as needed to change the delay before the tooltip triggers.

## Notes

- The example sets the interval to 1000 milliseconds (1 second) to delay the tooltip trigger. Adjust this value to meet your specific requirements.
- Ensure that you destroy the tooltip on mouse leave to avoid memory leaks and unexpected behavior.

## See Also

- [Kendo UI Tooltip for ASP.NET MVC - Overview](https://docs.telerik.com/aspnet-mvc/helpers/tooltip/overview)
- [Document Ready](https://learn.jquery.com/using-jquery-core/document-ready/)
- [jQuery hover Event](https://api.jquery.com/hover/)
- [setInterval Method](https://www.w3schools.com/jsref/met_win_setinterval.asp)
- [clearInterval Method](https://www.w3schools.com/jsref/met_win_clearinterval.asp)
