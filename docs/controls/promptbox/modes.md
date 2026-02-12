---
title: Modes
page_title: jQuery PromptBox Documentation - Modes
description: "Learn how to configure different modes for the Kendo UI for jQuery PromptBox component."
slug: modes_kendoui_promptbox
position: 1
components: ["promptbox"]
---

# PromptBox Modes

The PromptBox supports three modes that determine the number of lines displayed in the input area&mdash;single-line, multi-line, and auto.

These PromptBox modes control the layout and behavior of the input area to suit various use cases and user preferences. You can set the desired mode using the [`mode`](/api/javascript/ui/promptbox/configuration/mode) option of the PromptBox.

## Single-Line Mode

To enable single-line mode, set the [`mode`](/api/javascript/ui/promptbox/configuration/mode) option to `"single"`. When the text exceeds the width of the input area, horizontal scrolling is enabled to allow users to view and edit their entire prompt.

```javascript
    $("#promptbox").kendoPromptBox({
        mode: "single"
    });
```

## Multi-Line Mode

To enable multi-line mode, set the [`mode`](/api/javascript/ui/promptbox/configuration/mode) option to `"multi"`.  You can set the number of visible text lines using the [`rows`](/api/javascript/ui/promptbox/configuration/rows) option or use [`maxTextAreaHeight`](/api/javascript/ui/promptbox/configuration/maxtextareaheight) to limit the maximum height of the input area.

```javascript
    $("#promptbox").kendoPromptBox({
        mode: "multi",
        rows: 4
    });
```

## Auto Mode

To enable auto mode, set the [`mode`](/api/javascript/ui/promptbox/configuration/mode) option to `"auto"`. This automatically transforms the PromptBox from single-line to multi-line mode based on the content. You can also set a maximum height for the input area using the [`maxTextAreaHeight`](/api/javascript/ui/promptbox/configuration/maxtextareaheight) option to prevent it from growing indefinitely.

```javascript
    $("#promptbox").kendoPromptBox({
        mode: "auto",
        maxTextAreaHeight: 200
    });
```

## See Also

* [Appearance of the PromptBox]({% slug appearance_kendoui_promptbox %})
* [JavaScript API Reference of the PromptBox](/api/javascript/ui/promptbox)
