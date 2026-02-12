---
title: Tools
page_title: Tools
description: "Learn how to configure different tools for the Telerik UI for {{ site.framework }} PromptBox component."
slug: htmlhelpers_promptbox_tools_aspnetcore
position: 2
components: ["promptbox"]
---

# PromptBox Tools

The PromptBox provides several built-in tools that enhance functionality and user experience.

These tools include the Action Button for submitting prompts, the File Select Button for attaching files, and the Speech-to-Text Button for voice input. In case you need additional tools, refer to the [PromptBox Adornments]({% slug htmlhelpers_promptbox_adornments_aspnetcore %}) article.

## Action Button

The action button submits the prompt. Customize its appearance and behavior by setting the `ActionButton` option.

The button supports loading state for better user feedback during prompt submission and icon customizations for each state.

```HtmlHelper
    @(Html.Kendo().PromptBox()
        .Name("promptBox")
        .ActionButton(button => button
            .Icon("sparkles")
            .FillMode(FillMode.Flat)
        )
    )
```
{% if site.core %}
```TagHelper
    <kendo-promptbox name="promptBox">
        <action-button icon="sparkles" fill-mode="FillMode.Flat">
        </action-button>
    </kendo-promptbox>
```
{% endif %}

## Speech-to-Text Button

The speech-to-text button enables you to input prompts with voice commands. Customize its appearance and behavior by setting the `SpeechToText` option. The button provides visual feedback during the speech recognition process.

```HtmlHelper
    @(Html.Kendo().PromptBox()
        .Name("promptBox")
        .SpeechToText(true)
    )
```
{% if site.core %}
```TagHelper
    <kendo-promptbox name="promptBox">
        <speech-to-text enabled="true">
        </speech-to-text>
    </kendo-promptbox>
```
{% endif %}

## File Select Button

The file select button allows you to attach files to prompts. Customize its appearance, behavior and file restrictions by setting the `FileAttachment` option.

To enable file attachments in the PromptBox, set the `FileAttachment` option to `true` or use a configuration object for further customization.

```HtmlHelper
    @(Html.Kendo().PromptBox()
        .Name("promptBox")
        .FileAttachment(button => button
            .Multiple(true)
            .Restrictions(r => r.AllowedExtensions(new[] { ".jpg", ".png" }))
        )
    )
```
{% if site.core %}
```TagHelper
    <kendo-promptbox name="promptBox">
        <file-attachment multiple="true">
            <restrictions allowed-extensions='new string[] { ".jpg", ".png" }'>
            </restrictions>
        </file-attachment>
    </kendo-promptbox>
```
{% endif %}

### Attaching Multiple Files

You can allow users to attach multiple files by setting the `Multiple` option of the `FileAttachment` configuration.

```HtmlHelper
    @(Html.Kendo().PromptBox()
        .Name("promptBox")
        .FileAttachment(button => button
            .Multiple(true)
        )
    )
```
{% if site.core %}
```TagHelper
    <kendo-promptbox name="promptBox">
        <file-attachment multiple="true">
        </file-attachment>
    </kendo-promptbox>
```
{% endif %}

### File Size Restrictions

You can restrict the maximum file size for attachments by setting the `MaxFileSize` option in the `Restrictions` configuration of the `FileAttachment` setting.

```HtmlHelper
    @(Html.Kendo().PromptBox()
        .Name("promptBox")
        .FileAttachment(button => button
            .Restrictions(r => r.MaxFileSize(1048576))
        )
    )
```
{% if site.core %}
```TagHelper
    <kendo-promptbox name="promptBox">
        <file-attachment>
            <restrictions max-file-size="1048576">
            </restrictions>
        </file-attachment>
    </kendo-promptbox>
```
{% endif %}

### File Type Restrictions

You can restrict the allowed file types for attachments by setting the `AllowedExtensions` option in the `Restrictions` configuration of the `FileAttachment` setting.

```HtmlHelper
    @(Html.Kendo().PromptBox()
        .Name("promptBox")
        .FileAttachment(button => button
             .Restrictions(r => r.AllowedExtensions(new[] { ".png", ".jpg", ".jpeg" }))
        )
    )
```
{% if site.core %}
```TagHelper
    <kendo-promptbox name="promptBox">
        <file-attachment>
            <restrictions allowed-extensions='new string[] { ".png", ".jpg", ".jpeg" }'>
            </restrictions>
        </file-attachment>
    </kendo-promptbox>
```
{% endif %}

## See Also

* [PromptBox Adornments]({% slug htmlhelpers_promptbox_adornments_aspnetcore %})
* [Appearance of the PromptBox]({% slug htmlhelpers_promptbox_appearance_aspnetcore %})
* [Server-Side API of the PromptBox HtmlHelper](/api/promptbox)
{% if site.core %}
* [Server-Side API of the PromptBox TagHelper](/api/taghelpers/promptbox)
{% endif %}
* [JavaScript API Reference of the PromptBox](/api/javascript/ui/promptbox)
