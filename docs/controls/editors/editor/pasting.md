---
title: Pasting
page_title: Pasting | Kendo UI Editor
description: "Paste content from HTML and MS Word documents to the Kendo UI Editor widget."
slug: pasting_editor_widget
position: 6
---

# Pasting

Pasting from other HTML and MS Word documents to the Kendo UI Editor widget is essential for the end-user experience.

This article demonstrates the basic concepts of pasting to editable elements as well as the built-in features provided by the Editor, which help to fine-tune the final results.

## Basic Concepts

The Editor facilitates the DOM clipboard events. Therefore, any content that is pasted is first processed by the browser.

After the browser processes the content, the [`pasteCleanup`](/api/javascript/ui/editor#configuration-pasteCleanup) options are applied to help you control what is going to be pasted.

## Common Scenarios

### Clean HTML on Paste

The built-in [`pasteCleanup`](/api/javascript/ui/editor#configuration-pasteCleanup) options are:

* [`none`](/api/javascript/ui/editor#configuration-pasteCleanup.none)&mdash;Disables all options, meaning that none of the `pasteCleanup` options will be executed. The option is disabled by default.
* [`all`](/api/javascript/ui/editor#configuration-pasteCleanup.all)&mdash;Strips all HTML tags and leaves only plain text; disabled by default.
* [`keepNewLines`](/api/javascript/ui/editor#configuration-pasteCleanup.keepNewLines)&mdash;Removes all HTML elements, such as the `all` option, but preserves new lines; disabled by default.
* [`span`](/api/javascript/ui/editor#configuration-pasteCleanup.span)&mdash;Removes the `span` elements from the copied content; disabled by default.
* [`css`](/api/javascript/ui/editor#configuration-pasteCleanup.css)&mdash;Removes the `style` and `class` attributes out of all HTML elements from the copied content; disabled by default.
* [`msTags`](/api/javascript/ui/editor#configuration-pasteCleanup.msTags)&mdash;Strips the MS Word specific tags when pasting content and cleans up extra metadata. The option is enabled by default.
* [`msAllFormatting`](/api/javascript/ui/editor#configuration-pasteCleanup.msAllFormatting)&mdash;Strips the MS Word specific tags and removes the font-name and font-size decoration derived from MS Word; disabled by default.
* [`msConvertLists`](/api/javascript/ui/editor#configuration-pasteCleanup.msConvertLists)&mdash;Converts MS Word lists to HTML lists; enabled by default.
* [`custom`](/api/javascript/ui/editor#configuration-pasteCleanup.custom)&mdash;Uses a callback function to create [s custom `pasteCleanup` option](#create-your-own-pastecleanup-fucntion).

The example below demonstrates how to copy the HTML content above the Editor and paste it in the content area. Because of the enabled `span` option, `span` tags are removed.

###### Example

```html
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

### Paste from MS Word

The `pasteCleanup` options starting with an `ms` prefix target MS Word. They intend to offer more control over pasting content from MS Word. Most browsers translate MS Word content to HTML, but no strict rules or specification leading to proper results exist. That is why, these options deliver a better cross-browser outcome in such cases.

The `msTags` and the `msAllFormatting` options strip MS Word specific tags. MS Word specific tags are some valid XML nodes that MS Word uses to render text formatting and decoration. Some browsers do not translate these tags and they are just inserted into the content area on pasting. This causes the HTML to be invalid. Additionally, the `msAllFormatting` option removes the font-name and font-size stylization.

The `msConvertLists` is an option that enables the end user to successfully paste MS Word lists and convert them to proper HTML lists on pasting. Only few browsers support this feature and lists are pasted as plain `<p>` tags.

The example below demonstrates how to adjust the MS Word specific options. Click on preview and see the result by pasting some content from MS Word.

###### Example

```html
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
````

### Create Custom pasteCleanup Functions

The `custom` field is a powerful way to define your own logic to clean the pasted HTML through the assignment of a callback function. The exposed argument of this callback is the HTML that is passed through all other `pasteCleanup` options. Implement your own logic that modifies the exposed HTML and return it as a `string`.

The example below demonstrates a simple logic to strip the `<strong>` tags from the pasted HTML content.

###### Example

```html
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

Other articles on the Kendo UI Editor:

* [Overview of the Editor Widget]({% slug overview_kendoui_editor_widget %})
* [Image Browser]({% slug image_browser_editor_widget %})
* [Post-Process Content]({% slug post_process_content_editor_widget %})
* [Set Selections]({% slug set_selections_editor_widget %})
* [Prevent Cross-Site Scripting]({% slug prevent_xss_editor_widget %})
* [Troubleshooting]({% slug troubleshooting_editor_widget %})
* [Editor JavaScript API Reference](/api/javascript/ui/editor)

For how-to examples on the Kendo UI Editor widget, browse its [**How To** documentation folder]({% slug howto_add_max_length_validation_editor %}).
