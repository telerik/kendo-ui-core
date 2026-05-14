---
title: AutoScroll Threshold
page_title: jQuery Chat Documentation - AutoScroll Threshold
description: "Learn how to configure the autoScrollThreshold option in the Kendo UI for jQuery Chat component."
components: ["chat"]
slug: autoscroll_threshold_kendoui_chat
position: 8
---

# Chat AutoScroll Threshold

The Chat component supports the `autoScrollThreshold` configuration option to control when new incoming messages scroll the list to the bottom.

When users stay close enough to the bottom, the Chat keeps the latest message in view. When users scroll further away, the Chat preserves their reading position and displays the scroll-to-bottom action.

## Configuring AutoScroll Threshold

Set the threshold as percentage or pixels.

```dojo
<div id="chat"></div>

<script>
    $("#chat").kendoChat({
        authorId: "user",
        autoScrollThreshold: "50%"
    });
</script>
```

## Updating the Threshold at Runtime

```javascript
const chat = $("#chat").data("kendoChat");
chat.setOptions({
    autoScrollThreshold: "200px"
});
```

## Next Steps

* [Chat Overview]({% slug overview_kendoui_chat_widget %})
* [Chat Adornments]({% slug adornments_kendoui_chat %})
* [AutoScroll Threshold Demo](https://demos.telerik.com/kendo-ui/chat/autoscroll-threshold)
* [Chat API Reference](/api/javascript/ui/chat)
