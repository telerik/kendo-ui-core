---
title: Modes
page_title: Modes
description: "Learn how to configure different modes for the Telerik UI for {{ site.framework }} PromptBox component."
slug: htmlhelpers_promptbox_modes_aspnetcore
position: 1
components: ["promptbox"]
---

# PromptBox Modes

The PromptBox supports three modes that determine the number of lines displayed in the input area&mdash;single-line, multi-line, and auto.

These PromptBox modes control the layout and behavior of the input area to suit various use cases and user preferences. You can set the desired mode using the `Mode` option of the PromptBox.

## Single-Line Mode

To enable single-line mode, set the `Mode` option to `Single`. When the text exceeds the width of the input area, horizontal scrolling is enabled to allow users to view and edit their entire prompt.

```HtmlHelper
    @(Html.Kendo().PromptBox()
        .Name("promptBox")
        .Mode(PromptBoxMode.Single)
    )
```
{% if site.core %}
```TagHelper
    <kendo-promptbox name="promptBox" mode="PromptBoxMode.Single">
    </kendo-promptbox>
```
{% endif %}

## Multi-Line Mode

To enable multi-line mode, set the `Mode` option to `Multi`.  You can set the number of visible text lines using the `Rows` option or use `MaxHeight` to limit the maximum height of the input area.

```HtmlHelper
    @(Html.Kendo().PromptBox()
        .Name("promptBox")
        .Mode(PromptBoxMode.Multi)
        .Rows(4)
    )
```
{% if site.core %}
```TagHelper
    <kendo-promptbox name="promptBox" mode="PromptBoxMode.Multi" rows="4">
    </kendo-promptbox>
```
{% endif %}

## Auto Mode

To enable auto mode, set the `Mode` option to `Auto`. This automatically transforms the PromptBox from single-line to multi-line mode based on the content. You can also set a maximum height for the input area using the `MaxTextAreaHeight` option to prevent it from growing indefinitely.

```HtmlHelper
    @(Html.Kendo().PromptBox()
        .Name("promptBox")
        .Mode(PromptBoxMode.Auto)
        .MaxTextAreaHeight(200)
    )
```
{% if site.core %}
```TagHelper
    <kendo-promptbox name="promptBox" mode="PromptBoxMode.Auto" max-text-area-height="200">
    </kendo-promptbox>
```
{% endif %}

## See Also

* [Appearance of the PromptBox]({% slug htmlhelpers_promptbox_appearance_aspnetcore %})
* [Server-Side API of the PromptBox HtmlHelper](/api/promptbox)
{% if site.core %}
* [Server-Side API of the PromptBox TagHelper](/api/taghelpers/promptbox)
{% endif %}
* [JavaScript API Reference of the PromptBox](/api/javascript/ui/promptbox)
