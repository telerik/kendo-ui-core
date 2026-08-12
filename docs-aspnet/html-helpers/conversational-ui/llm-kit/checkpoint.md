---
title: Checkpoint
page_title: Checkpoint
description: "Learn how to use the Telerik UI Checkpoint component for {{ site.framework }} to add restore and redo actions to AI conversations."
slug: htmlhelpers_checkpoint_llmkit_aspnetcore
position: 4
components: ["checkpoint"]
---

# {{ site.framework }} Checkpoint

Conversations with AI agents rarely follow a straight path. Users explore, change direction, and sometimes need to recover an earlier path.

The [Checkpoint component](/api/checkpoint) adds an anchor between conversation turns and provides two clear recovery actions: restarting the conversation from scratch or regenerating only the latest response without discarding the rest of the thread.

## Configuration

Place a [`StartOver`](/api/checkpoint/state) checkpoint at the top of the conversation for a global reset, and place `Redo` checkpoints between individual turns for targeted regeneration. The [`State`](/api/checkpoint/state) value controls both the label and icon, making the upcoming action clear to users.

By default, the separator appears only on hover. Set [`DisplayMode`](/api/checkpoint/displaymode) to `"always"` in compact or touch-focused layouts where hover may be unreliable.

```HtmlHelper
    @(Html.Kendo().Checkpoint()
        .Name("checkpoint")
        .State(CheckpointState.StartOver)
        .DisplayMode(CheckpointDisplayMode.Always)
    )
```
{% if site.core %}
```TagHelper
    <kendo-checkpoint name="checkpoint"
        state="CheckpointState.StartOver"
        display-mode="CheckpointDisplayMode.Always">
    </kendo-checkpoint>
```
{% endif %}

Handle the [`Action`](/api/checkpoint/action) event and branch on `event.State`: reset the full thread for `StartOver`, or regenerate only the last response for `Redo`.

## See Also


* [Checkpoint Demo for {{ site.framework }}](https://demos.telerik.com/{{ site.platform }}/llm_kit/checkpoint)
* [LLM Kit Overview]({% slug htmlhelpers_llmkit_aspnetcore %})
* [Server-Side API of the Checkpoint HtmlHelper](/api/checkpoint)
{% if site.core %}
* [Server-Side API of the Checkpoint TagHelper](/api/taghelpers/checkpoint)
{% endif %}
* [JavaScript API Reference of the Checkpoint](/api/javascript/ui/checkpoint)