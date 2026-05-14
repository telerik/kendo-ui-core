---
title: Adornments
page_title: jQuery Chat Documentation - Adornments
description: "Learn how to add start, end, and top PromptBox adornments in the Kendo UI for jQuery Chat component."
components: ["chat"]
slug: adornments_kendoui_chat
position: 7
---

# Chat PromptBox Adornments

The Kendo UI for jQuery Chat allows you to customize the PromptBox area with adornments. You can place additional UI elements before the input, after the input, or above the input, and combine them with built-in features such as file attachments and speech-to-text.

## Overview

You can configure the following PromptBox adornment template options:

* [`messageBox.startAffixTemplate`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/chat/configuration/messagebox.startaffixtemplate)&mdash;Renders content before the message input.
* [`messageBox.endAffixTemplate`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/chat/configuration/messagebox.endaffixtemplate)&mdash;Renders content after the message input.
* [`messageBox.topAffixTemplate`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/chat/configuration/messagebox.topaffixtemplate)&mdash;Renders content above the message input.

## Configuring Start and End Adornments

The example below adds custom action buttons in the start and end PromptBox regions:

```dojo
<div id="chat"></div>

<script>
    $("#chat").kendoChat({
        authorId: "user",
        messageBox: {
            mode: "single",
            startAffixTemplate: '<button class="k-button k-button-flat k-button-sm" type="button">Source</button>',
            endAffixTemplate: '<button class="k-button k-button-flat k-button-sm" type="button">Settings</button>'
        },
        dataSource: {
            data: [
                {
                    id: 1,
                    authorId: "assistant",
                    authorName: "Assistant",
                    text: "Hello! Use the PromptBox adornments to trigger custom actions.",
                    timestamp: new Date()
                }
            ]
        }
    });
</script>
```

## Adding a Top Adornment

Use `topAffixTemplate` to render additional controls such as model selectors or context pickers above the input:

```dojo
<div id="chat"></div>

<script>
    $("#chat").kendoChat({
        authorId: "user",
        messageBox: {
            mode: "multi",
            rows: 3,
            topAffixTemplate: '<div class="chat-model-affix"><select id="model"></select></div>'
        }
    });

    $("#model").kendoDropDownList({
        dataSource: ["GPT-4o", "GPT-4o mini", "Claude 3.5 Haiku"],
        value: "GPT-4o"
    });
</script>
```

## Next Steps

* [Chat Overview]({% slug overview_kendoui_chat_widget %})
* [AutoScroll Threshold]({% slug autoscroll_threshold_kendoui_chat %})
* [Chat Templates]({% slug templates_kendoui_chat %})
* [Chat API Reference](/api/javascript/ui/chat)
* [PromptBox Adornments Demo](https://demos.telerik.com/kendo-ui/chat/adornments)
