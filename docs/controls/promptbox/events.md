---
title: Events
page_title: jQuery PromptBox Documentation - Events
description: "Learn more about the events that the Kendo UI for jQuery PromptBox features."
slug: events_kendoui_promptbox
position: 5
components: ["promptbox"]
---

# PromptBox Events

The PromptBox component emits various events that let you handle user interactions and customize the behavior.

This article provides an overview of all available events of the PromptBox.

```javascript
    $("#promptbox").kendoPromptBox({
        valueChange: function(e) {
            console.log("Content changed");
        },
        focus: function(e) {
            console.log("Focused");
        },
        blur: function(e) {
            console.log("Blurred");
        }
        // Add other event handlers here
    });
```

You can subscribe to the events by the handler name.

```javascript
    var promptbox = $("#promptbox").data("kendoPromptBox");
    promptbox.bind("valueChange", function(e) {
        console.log("Content changed");
    });
```

## See Also

* [JavaScript API Reference of the PromptBox](/api/javascript/ui/promptbox)
