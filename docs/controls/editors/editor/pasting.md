---
title: Pasting Content
page_title: jQuery Editor Documentation | Pasting Content
description: "Get started with the jQuery Editor by Kendo UI and paste content from HTML and MS Word documents."
slug: pasting_editor_widget
position: 9
---

# Pasting Content

Pasting content from HTML and Microsoft (MS) Word documents to the Editor is essential for the end-user experience.

## Basic Concepts

The Editor facilitates the DOM clipboard events. Any content that is pasted is first processed by the browser. After the browser processes the content, the Editor applies the [`pasteCleanup`](/api/javascript/ui/editor/configuration/pastecleanup) options which help control the content that will be pasted.

## Cleaning HTML on Paste

The following list represents the built-in [`pasteCleanup`](/api/javascript/ui/editor/configuration/pastecleanup) options:

* [`none`](/api/javascript/ui/editor/configuration/pastecleanup.none)&mdash;Disables all options which means that none of the `pasteCleanup` options will be executed. Disabled by default.
* [`all`](/api/javascript/ui/editor/configuration/pastecleanup.all)&mdash;Strips all HTML tags and leaves only plain text. Disabled by default.
* [`keepNewLines`](/api/javascript/ui/editor/configuration/pastecleanup.keepnewlines)&mdash;Removes all HTML elements, such as the `all` option, but preserves new lines. Disabled by default.
* [`span`](/api/javascript/ui/editor/configuration/pastecleanup.span)&mdash;Removes the `span` elements from the copied content. Disabled by default.
* [`css`](/api/javascript/ui/editor/configuration/pastecleanup.css)&mdash;Removes the `style` and `class` attributes out of all HTML elements from the copied content. Disabled by default.
* [`msTags`](/api/javascript/ui/editor/configuration/pastecleanup.mstags)&mdash;Strips the MS Word specific tags when pasting content and cleans up extra metadata. Enabled by default.
* [`msAllFormatting`](/api/javascript/ui/editor/configuration/pastecleanup.msallformatting)&mdash;Strips the MS Word specific tags and removes the font-name and font-size decoration derived from MS Word. Disabled by default.
* [`msConvertLists`](/api/javascript/ui/editor/configuration/pastecleanup.msconvertlists)&mdash;Converts MS Word lists to HTML lists. Enabled by default.
* [`custom`](/api/javascript/ui/editor/configuration/pastecleanup.custom)&mdash;Uses a callback function to create [s custom `pasteCleanup` option](#create-your-own-pastecleanup-fucntion).

The following example demonstrates how to copy the HTML content above the Editor and paste it in the content area. Because of the enabled `span` option, the `span` tags are removed.

```dojo
    <p>Copy this is a paragraph that has some <span style="font-family:Impact, Charcoal, sans-serif;">inline </span><span style="font-family:Impact, Charcoal, sans-serif;color:#ffffff;background-color:#3366ff;">styles</span> and paste it in the Editor.</p>
    <hr />
    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        pasteCleanup: {
            span: true
        }
    });
    </script>
````

## Pasting Content from MS Word

The `pasteCleanup` options starting with an `ms` prefix target MS Word. They offer more control over the pasting of content from MS Word. Most browsers translate MS Word content to HTML, but strict rules or specification leading to proper results do not exist. That is why, in such cases, these options deliver a better cross-browser outcome.

The `msTags` and the `msAllFormatting` options strip MS Word specific tags. MS Word specific tags are some valid XML nodes that MS Word uses to render text formatting and decoration. Some browsers do not translate these tags and they are just inserted into the content area on pasting. This makes the HTML invalid. Additionally, the `msAllFormatting` option removes the font-name and font-size stylization.

The `msConvertLists` is an option that enables the end user to successfully paste MS Word lists and convert them to proper HTML lists on pasting. Only few browsers support this feature and lists are pasted as plain `<p>` tags.

The following example demonstrates how to adjust the MS Word specific options. To see the result, paste some content from MS Word and click on **PREVIEW**.

```dojo
    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        pasteCleanup: {
            msAllFormatting: false,
            msConvertLists: true,
            msTags: true
        }
    });
    </script>
```

## Pasting Text and Image from MS Word

If you copy text and an image from MS Word and paste in the Editor, the image will not get pasted as expected. This behavior is due to the security policy of the browser. Instead of reading the image data and loading it as a base64 string to the `src` attribute of the `<img>` element, it generates an `<img>` tag which points to the clipboard location of the file on the client machine. As the browser is not allowed to access such a resource, it throws an error and the image is not rendered which you can verify in the browser dev tools console.

* In Chrome, a "Not allowed to load local resource..." exception will be thrown. For more information, refer to [this StackOverflow thread](https://stackoverflow.com/questions/39007243/cannot-open-local-file-chrome-not-allowed-to-load-local-resource).
* In Internet Explorer, a "HTTPS security is compromised..." error will be thrown. For more information, refer to [this StackOverflow thread](https://stackoverflow.com/questions/16168132/https-security-is-compromised-error-how-to-fix).

To work around this issue, copy only the text or a single image from the MS Word document, and paste it in the content area of the Editor. By default, the browser allows you to copy and paste a single image from Word in the Editor by converting its `src` to a base64 string. If you paste more images at the same time, their `src` attributes will not be converted to base64 strings and the browser will paste them with their `http` protocol and URL pointing to the physical folder which is the way the observed behavior will be exposed.

## Creating Custom pasteCleanup Functions

The `custom` field is a powerful way to define your own logic to clean the pasted HTML through the assignment of a callback function. The exposed argument of this callback is the HTML that is passed through all other `pasteCleanup` options. In this way, you can implement your own logic that modifies the exposed HTML and return it as a `string`.

The following example demonstrates a simple logic to strip the `<strong>` tags from the pasted HTML content.

```dojo
    <p>some text with <strong>bold text</strong> inside.</p>
    <hr />
    <textarea id="editor"></textarea>
    <script>
        $("#editor").kendoEditor({
            pasteCleanup: {
                custom: function(html) {
                    return html.replace(/<\/?strong[^>]*>/, "");
                }
            }
        });
    </script>
````

## See Also

* [Basic Usage of the Editor (Demo)](https://demos.telerik.com/kendo-ui/editor/index)
* [JavaScript API Reference of the Editor](/api/javascript/ui/editor)
