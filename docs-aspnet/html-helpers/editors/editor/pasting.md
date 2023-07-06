---
title: Pasting
page_title: Pasting Content
description: "Learn how to control the pasting behavior of the Telerik UI Editor component for {{ site.framework }}."
slug: htmlhelpers_editor_pasting_aspnetcore
position: 4
---

# Pasting Content

Pasting content from HTML and Microsoft (MS) Word documents to the Editor is essential for the end-user experience.

## Basic Concepts

The Editor facilitates the DOM clipboard events. Any content that is pasted is first processed by the browser. After the browser processes the content, the Editor applies the [`PasteCleanup()`](/api/kendo.mvc.ui.fluent/editorbuilder#pastecleanupsystemactionkendomvcuifluenteditorpastecleanupsettingsbuilder) options which help control the content that will be pasted.

## Cleaning HTML on Paste

The following list represents the built-in [`PasteCleanup()`](/api/kendo.mvc.ui.fluent/editorpastecleanupsettingsbuilder) options:

* [`None()`](/api/kendo.mvc.ui.fluent/editorpastecleanupsettingsbuilder#nonesystemboolean)&mdash;Disables all options which means that none of the `pasteCleanup` options will be executed. Disabled by default.
* [`All()`](/api/kendo.mvc.ui.fluent/editorpastecleanupsettingsbuilder#allsystemboolean)&mdash;Strips all HTML tags and leaves only plain text. Disabled by default.
* [`KeepNewLines()`](/api/kendo.mvc.ui.fluent/editorpastecleanupsettingsbuilder#keepnewlines)&mdash;Removes all HTML elements, such as the `all` option, but preserves new lines. Disabled by default.
* [`Span()`](/api/kendo.mvc.ui.fluent/editorpastecleanupsettingsbuilder#spansystemboolean)&mdash;Removes the `span` elements from the copied content. Disabled by default.
* [`Css()`](/api/kendo.mvc.ui.fluent/editorpastecleanupsettingsbuilder#csssystemboolean)&mdash;Removes the `style` and `class` attributes out of all HTML elements from the copied content. Disabled by default.
* [`MsTags()`](/api/kendo.mvc.ui.fluent/editorpastecleanupsettingsbuilder#mstagssystemboolean)&mdash;Strips the MS Word specific tags when pasting content and cleans up extra metadata. Enabled by default.
* [`MsAllFormatting()`](/api/kendo.mvc.ui.fluent/editorpastecleanupsettingsbuilder#msallformatting)&mdash;Strips the MS Word specific tags and removes the font-name and font-size decoration derived from MS Word. Disabled by default.
* [`MsConvertLists()`](/api/kendo.mvc.ui.fluent/editorpastecleanupsettingsbuilder#msconvertlistssystemboolean)&mdash;Converts MS Word lists to HTML lists. Enabled by default.
* [`Custom()`](/api/kendo.mvc.ui.fluent/editorpastecleanupsettingsbuilder#customsystemstring)&mdash;uses a callback function to create [a custom `pastecleanup` option](#creating-custom-pastecleanup-functions).

The following example demonstrates how to copy the HTML content above the Editor and paste it in the content area. Because of the enabled `Span()` option, the `span` tags are removed.

```HtmlHelper
    <p>
        Copy this is a paragraph that has some
        <span style="font-family:Impact, Charcoal, sans-serif;">
            inline
        </span>
        <span style="font-family:Impact, Charcoal, sans-serif;color:#ffffff;background-color:#3366ff;">
            styles
        </span>
        and paste it in the Editor.
    </p>
    <hr />

    @(Html.Kendo().Editor()
        .Name("editor")
        .PasteCleanup(p => p
            .Span()
        )
    )
```
{% if site.core %}
```TagHelper
    <p>
        Copy this is a paragraph that has some
        <span style="font-family:Impact, Charcoal, sans-serif;">
            inline
        </span>
        <span style="font-family:Impact, Charcoal, sans-serif;color:#ffffff;background-color:#3366ff;">
            styles
        </span>
        and paste it in the Editor.
    </p>
    <hr />

    <kendo-editor name="editor">
    	<paste-cleanup span="true" />
    </kendo-editor>
```
{% endif %}

## Pasting from MS Word

The `PasteCleanup()` options starting with an `Ms` prefix that targets MS Word. They offer more control over the pasting of content from MS Word. Most browsers translate MS Word content to HTML, but strict rules or specification leading to proper results do not exist. That is why, in such cases, these options deliver a better cross-browser outcome.

The `MsTags()` and the `MsAllFormatting()` options strip MS Word specific tags. MS Word specific tags are some valid XML nodes that MS Word uses to render text formatting and decoration. Some browsers do not translate these tags and they are just inserted into the content area on pasting. This makes the HTML invalid. Additionally, the `MsAllFormatting()` option removes the font-name and font-size stylization.

The `MsConvertLists()` is an option that enables the end user to successfully paste MS Word lists and convert them to proper HTML lists on pasting. Only few browsers support this feature and lists are pasted as plain `<p>` tags.

The following example demonstrates how to adjust the MS Word specific options. To see the result, paste some content from MS Word.

```HtmlHelper
    @(Html.Kendo().Editor()
        .Name("editor")
        .PasteCleanup(p => p
            .MsTags(true)
            .MsAllFormatting(false)
            .MsConvertLists(true)
        )
    )
```
{% if site.core %}
```TagHelper
    <kendo-editor name="editor">
    	<paste-cleanup ms-tags="true" ms-all-formatting="false" ms-convert-lists="true"/>
    </kendo-editor>
```
{% endif %}

## Creating Custom pasteCleanup Functions

The `Custom()` method is a powerful way to define your own logic to clean the pasted HTML through the assignment of a callback function. The exposed argument of this callback is the HTML that is passed through all other `PasteCleanup()` options. In this way, you can implement your own logic that modifies the exposed HTML and return it as a `string`.

The following example demonstrates a simple logic to strip the `<strong>` tags from the pasted HTML content.

```HtmlHelper
    <p>some text with <strong>bold text</strong> inside.</p>
    <hr />

    @(Html.Kendo().Editor()
        .Name("editor")
        .PasteCleanup(p => p
            .Custom("customPasteCleanUp")
        )
    )

    <script>
        function customPasteCleanUp(html) {
            return html.replace(/<\/?strong[^>]*>/, "");
        }
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-editor name="editor">
    	<paste-cleanup custom="customPasteCleanUp"/>
    </kendo-editor>

    <script>
        function customPasteCleanUp(html) {
            return html.replace(/<\/?strong[^>]*>/, "");
        }
    </script>
```
{% endif %}

## See Also

* [Server-Side API](/api/editor)
