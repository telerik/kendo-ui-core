---
title: Create Markdown Editors
page_title: Create Markdown Editors | Kendo UI Editor
description: "Learn how to use the Kendo UI Editor widget and customize it to generate Markdown."
previous_url: /controls/editors/editor/how-to/markdown-editor
slug: howto_create_markdown_editor
---

# Create Markdown Editors

You can transform the Kendo UI Editor widget into a Markdown editor by using third-party JS libraries.

![](markdown_video.gif)

The following example relies on the [`deserialization`](/api/javascript/ui/editor#configuration-deserialization) and [`serialization`](/api/javascript/ui/editor#configuration-serialization) options provided by the Kendo UI Editor. These are configured by applying custom options to call the methods that are necessary for the conversion from HTML to Markdown.

The actual transformation from HTML to Markdown is not part of the Kendo UI Editor and can be accomplished by using third-party JS libraries. For the example, the following example applies the MIT licensed [markdown-js](https://github.com/evilstreak/markdown-js) and [html-md](https://www.npmjs.com/package/html-md) libraries. However, you might use any other library that best suits your project.

The following example demonstrates how transform the Kendo UI Editor widget into a Markdown editor by using third-party JS libraries.

###### Example

```html
<script src="https://unpkg.com/markdown@0.5.0/lib/markdown.js"></script>
<script src="https://unpkg.com/html-md@3.0.2/dist/md.min.js"></script>

<textarea name="editor" id="editor" cols="30" rows="10">
    You can add here some **Makrdown** content.
</textarea>

<script>
    $("#editor").kendoEditor({
        deserialization: {
            custom: function(html) {
                return markdown.toHTML(html, "Maruku");
            }
        },
        serialization: {
            custom: function(html) {
                return md(html);
            }
        },
        tools: [
            "bold",
            "italic",
            "insertUnorderedList",
            "insertOrderedList",
            "createLink",
            "unlink",
            "viewHtml"
        ],
        messages: {
            viewHtml: "View Source"
        }
    })
</script>
```

## See Also

Other articles on the Kendo UI Editor:

* [Editor JavaScript API Reference](/api/javascript/ui/editor)
* [How to Get Reference to Child Widgets]({% slug howto_get_referenceto_child_widgets_editor %})
* [How to Insert HTML Content via Custom Popup Tools]({% slug howto_insert_html_content_custom_popup_tool_editor %})
* [How to Set Caret Position]({% slug howto_set_caret_position_editor %})
* [How to Show Editor in Full Screen]({% slug howto_show_infull_screen_editor %})
* [How to Use Inline Editor inside Windows]({% slug howto_use_inline_editor_inside_windows_editor %})

For more runnable examples on the Kendo UI Editor, browse its [**How To** documentation folder]({% slug howto_add_max_length_validation_editor %}).
