---
title: Checkpoint
page_title: jQuery Checkpoint Documentation - LLM Kit Checkpoint
description: "Learn how to use the Kendo UI for jQuery Checkpoint component to add restore and redo actions between AI conversation turns."
slug: checkpoint_kendoui_llmkit
position: 4
components: ["checkpoint"]
---

# {{ site.product }} Checkpoint

Conversations with AI agents rarely follow a straight path. Users explore, change direction, and sometimes need to recover an earlier path.

The [Checkpoint](/api/javascript/ui/checkpoint) component adds an anchor between conversation turns and provides two clear recovery actions: restarting the conversation from scratch or regenerating only the latest response without discarding the rest of the thread.

## Configuration

Place a `startOver` checkpoint at the top of the conversation for a global reset, and place `redo` checkpoints between individual turns for targeted regeneration. The [`state`](/api/javascript/ui/checkpoint/configuration/state) value controls both the label and icon, making the upcoming action clear to users.

By default, the separator appears only on hover. Set [`displayMode`](/api/javascript/ui/checkpoint/configuration/displaymode) to `"always"` in compact or touch-focused layouts where hover may be unreliable.

```html
<div id="checkpoint"></div>

<script>
    $("#checkpoint").kendoCheckpoint({
        state: "restore",
        displayMode: "always"
    });
</script>
```

 Handle the [`action`](/api/javascript/ui/checkpoint/events/action) event and branch on `e.action`: reset the full thread for `startOver`, or regenerate only the last response for `redo`.

```javascript
$("#checkpoint").kendoCheckpoint({
    state: "startOver",
    action: function(e) {
        if (e.action === "startOver") {
            console.log("Reset the conversation");
        }
    }
});
```


## See Also

* [Checkpoint Demo](https://demos.telerik.com/kendo-ui/llm-kit/checkpoint)
* [LLM Kit Overview]({% slug overview_kendoui_llmkit %})
* [Tool Call]({% slug tool_call_kendoui_llmkit %})
* [JavaScript API Reference of the Checkpoint](/api/javascript/ui/checkpoint)
