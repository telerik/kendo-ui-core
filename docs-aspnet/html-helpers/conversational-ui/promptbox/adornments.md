---
title: Adornments
page_title: Adornments
description: "Learn how to enhance the Telerik UI for {{ site.framework }} PromptBox component with icons, buttons, and other UI elements using adornments."
slug: htmlhelpers_promptbox_adornments_aspnetcore
position: 3
components: ["promptbox"]
---

# PromptBox Adornments

You can further customize the elements around the input area by using the specialized adornment configuration.

The PromptBox provides options to render content in specific locations relative to the input area&mdash;start, end, and top.

## Start Affix

The start adornments are displayed at the left side of the input in single-line mode, and at the bottom left corner when in multi-line mode. To add custom content to the start of the PromptBox input area, use the `StartAffixTemplate` option.

```HtmlHelper
    @(Html.Kendo().PromptBox()
        .Name("promptbox")
        .StartAffixTemplate("<span class='k-icon k-i-paperclip'></span>")
    )
```
{% if site.core %}
```TagHelper
    <kendo-promptbox name="promptbox">
        <start-affix-template>
            <span class='k-icon k-i-paperclip'></span>
        </start-affix-template>
    </kendo-promptbox>
```
{% endif %}

## End Affix

The end adornments are displayed at the end of the input, before the built-in controls. To add custom content to the end of the PromptBox input area, use the `EndAffixTemplate` option.

```HtmlHelper
    @(Html.Kendo().PromptBox()
        .Name("promptbox")
        .EndAffixTemplate("<span class='k-icon k-i-gear'></span>")
    )
```
{% if site.core %}
```TagHelper
    <kendo-promptbox name="promptbox">
        <end-affix-template>
            <span class='k-icon k-i-gear'></span>
        </end-affix-template>
    </kendo-promptbox>
```
{% endif %}

## Top Affix

The top adornments are displayed above the input area of the PromptBox and only apply in `'multi'` [mode]({% slug htmlhelpers_promptbox_modes_aspnetcore %}). To add custom content to the top of the PromptBox input area, use the `TopAffixTemplate` option.

```HtmlHelper
    @(Html.Kendo().PromptBox()
        .Name("promptbox")
        .Mode(PromptBoxMode.Multi)
        .TopAffixTemplate("<div class='custom-header'>Attached files:</div>")
    )
```
{% if site.core %}
```TagHelper
    <kendo-promptbox name="promptbox" mode="PromptBoxMode.Multi">
        <top-affix-template>
            <div class='custom-header'>Attached files:</div>
        </top-affix-template>
    </kendo-promptbox>
```
{% endif %}

## Disabling Adornments

By default, the adornments are part of the PromptBox. When you set the `Enable` option to `false`, the PromptBox applies disabled styling to the adornment elements. This styling sets `pointer-events` to `none` and adjusts the `opacity` to match the disabled appearance.

```HtmlHelper
    @(Html.Kendo().PromptBox()
        .Name("promptbox")
        .Enable(false)
        .StartAffixTemplate("<button>Click me</button>")
    )
```
{% if site.core %}
```TagHelper
    <kendo-promptbox name="promptbox" enable="false">
        <start-affix-template>
            <button>Click me</button>
        </start-affix-template>
    </kendo-promptbox>
```
{% endif %}

## See Also

* [PromptBox Modes]({% slug htmlhelpers_promptbox_modes_aspnetcore %})
* [Appearance of the PromptBox]({% slug htmlhelpers_promptbox_appearance_aspnetcore %})
* [Server-Side API of the PromptBox HtmlHelper](/api/promptbox)
{% if site.core %}
* [Server-Side API of the PromptBox TagHelper](/api/taghelpers/promptbox)
{% endif %}
* [JavaScript API Reference of the PromptBox](/api/javascript/ui/promptbox)
