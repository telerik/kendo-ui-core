---
title: Disabled State
page_title: Disabled State
description: "Enable or disable the Telerik UI for {{ site.framework }} PromptBox and its individual buttons."
slug: htmlhelpers_promptbox_disabled_aspnetcore
position: 6
components: ["promptbox"]
---

# Disabled PromptBox

The PromptBox provides built-in support for disabling both the entire component and individual buttons.

To disable the PromptBox component, set the `Enable` option to `false`. This prevents user interaction with the input area and all built-in tools.

You can also disable each tool independently while keeping the rest of the PromptBox functional. To achieve this, set the `Enable` option of the respective button settings object.

```HtmlHelper
    @(Html.Kendo().PromptBox()
        .Name("promptBox")
        .Enable(false)
    )
```
{% if site.core %}
```TagHelper
    <kendo-promptbox name="promptBox" enable="false">
    </kendo-promptbox>
```
{% endif %}

## Disabling Individual Buttons

To disable a specific button, use the `Enabled` option within the button configuration.

```HtmlHelper
    @(Html.Kendo().PromptBox()
        .Name("promptBox")
        .FileAttachment(fs => fs
            .Enabled(false)
        )
    )
```
{% if site.core %}
```TagHelper
    <kendo-promptbox name="promptBox">
        <file-attachment enabled="false">
        </file-attachment>
    </kendo-promptbox>
```
{% endif %}

## See Also

* [Server-Side API of the PromptBox HtmlHelper](/api/promptbox)
{% if site.core %}
* [Server-Side API of the PromptBox TagHelper](/api/taghelpers/promptbox)
{% endif %}
* [JavaScript API Reference of the PromptBox](/api/javascript/ui/promptbox)
* [PromptBox Appearance]({% slug htmlhelpers_promptbox_appearance_aspnetcore %})
