---
title: Get Reference to Child Widgets
page_title: Get Reference to Child Widgets | Kendo UI Editor
description: "Learn how to get a reference to the ImageBrowser and FileBrowser child widgets in the Kendo UI Editor widget."
previous_url: /controls/editors/editor/how-to/get-reference-to-imagebrowser-child-widgets
slug: howto_get_referenceto_child_widgets_editor
---

# Get Reference to Child Widgets

The ImageBrowser and FileBrowser components of the Editor internally use the Kendo UI Upload, ListView, and DropDownList widgets.

The following example demonstrates how to obtain these client-side objects of the widget.

The FileBrowser-related code is identical to the ImageBrowser one except for:

* To attach the `click` handler, use the `.k-i-file-add` CSS class instead of the `.k-i-image` one.
* Use `var fileBrowser = $(".k-filebrowser").data("kendoFileBrowser");` instead of `var imageBrowser = $(".k-imagebrowser").data("kendoImageBrowser");`.

> **Important**
>
> If you are using the 2017 R1 version or later, use the `.k-insertFile` and `.k-insertImage` classes to get the button elements. 

To attach events with [`bind()`](/intro/installation/events-and-methods#bind-to-events-after-widget-initialization) or to perform other customizations that may not be otherwise supported, use the API calls of the [ListView](/api/javascript/ui/listview), [Upload](/api/javascript/ui/upload) and [DropDownList](/api/javascript/ui/dropdownlist) widget objects after they are available.

The following `transport` configurations are over-simplified and invalid.

###### Example

```html
    <textarea name="editor" id="editor"></textarea>

    <script>

    $(function(){
        // initialize the Editor. When using Kendo UI server wrappers, the following statement will be auto-generated
        $("#editor").kendoEditor({
            tools: [
                "insertImage",
                "insertFile"
            ],
            imageBrowser: {
                transport: {
                    read: "foo",
                    create: "foo",
                    uploadUrl: "foo"
                }
            },
            fileBrowser: {
                transport: {
                    read: "foo",
                    create: "foo",
                    uploadUrl: "foo"
                }
            }
        });

        // example start

        // retrieve the Editor widget object
        var editor = $("#editor").data("kendoEditor");

        // attach a click handler on the tool button, which opens the ImageBrowser dialog
        editor.toolbar.element.find(".k-i-image").parent().click(function(){
            // a setTimeout is required, otherwise the ImageBrowser widget will still not be initialized
            setTimeout(function(){
                // retrieve the ImageBrowser widget object
                var imageBrowser = $(".k-imagebrowser").data("kendoImageBrowser");
                console.log(imageBrowser);

                // retrieve the ListView widget object
                var listView = imageBrowser.listView;
                console.log(listView);

                // retrieve the Upload widget object
                var upload = imageBrowser.upload;
                console.log(upload);

                // retrieve the DropDownList widget object
                var dropdownlist = imageBrowser.arrangeBy;
                console.log(dropdownlist);
            });
        });

        // attach a click handler on the tool button, which opens the FileBrowser dialog
        editor.toolbar.element.find(".k-i-file-add").parent().click(function(){
            // a setTimeout is required, otherwise the FileBrowser widget will still not be initialized
            setTimeout(function(){
                // retrieve the ImageBrowser widget object
                var fileBrowser = $(".k-filebrowser").data("kendoFileBrowser");
                console.log(fileBrowser);

                // retrieve the ListView widget object
                var listView = fileBrowser.listView;
                console.log(listView);

                // retrieve the Upload widget object
                var upload = fileBrowser.upload;
                console.log(upload);

                // retrieve the DropDownList widget object
                var dropdownlist = fileBrowser.arrangeBy;
                console.log(dropdownlist);
            });
        });
    });

    </script>
```

## See Also

Other articles on the Kendo UI Editor:

* [Editor JavaScript API Reference](/api/javascript/ui/editor)
* [How to Insert HTML Content via Custom Popup Tools]({% slug howto_insert_html_content_custom_popup_tool_editor %})
* [How to Set Caret Position]({% slug howto_set_caret_position_editor %})
* [How to Show Editor in Full Screen]({% slug howto_show_infull_screen_editor %})
* [How to Use Inline Editor inside Windows]({% slug howto_use_inline_editor_inside_windows_editor %})

For more runnable examples on the Kendo UI Editor, browse its [**How To** documentation folder]({% slug howto_add_max_length_validation_editor %}).
