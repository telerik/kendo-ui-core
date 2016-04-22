---
title: Create Markdown Editor
page_title: Create Markdown Editor | Kendo UI Editor
description: "Learn how to use Kendo Editor widget and customize it to generate Markdown"
slug: howto_create_markdown_editor
---

# Create Markdown Editor

The code below demonstrates how you can transform **Kendo Editor** into a **Markdown** editor by utilizing third-party JS libraries.

![](markdown_video.gif)

The introduced code relies on the [deserialization](/api/javascript/ui/editor#configuration-deserialization) and [serialization](/api/javascript/ui/editor#configuration-serialization) options in **Kendo Editor**. Which are configured with custom options to call the methods needed for the HTML to Markdown conversion. 

The actual tranformation from HTML to Markdown is not part of **Kendo Editor**, but can be accompished with third-party JS libraries. For the example here we choose to use the MIT licensed [markdown-js](https://github.com/evilstreak/markdown-js) and [html-md](https://www.npmjs.com/package/html-md) libraries. You can, however, use any other library that suits the situation best.

###### Example

```
<script src="scripts/markdown.js"></script>
<script src="scripts/md.min.js"></script>

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

Other articles on Kendo UI Editor:

* [Editor JavaScript API Reference](/api/javascript/ui/editor)
* [How to Show Editor in Full Screen]({% slug howto_show_infull_screen_editor %})
* [How to Add Max-Length Validation]({% slug howto_add_max_length_validation_editor %})
* [How to Create Markdown Editor]({% slug howto_create_markdown_editor %})
* [How to Get Reference to Child Widgets]({% slug howto_get_referenceto_child_widgets_editor %})
* [How to Insert HTML Content via Custom Popup Tools]({% slug howto_insert_html_content_custom_popup_tool_editor %})
* [How to Set Caret Position]({% slug howto_set_caret_position_editor %})