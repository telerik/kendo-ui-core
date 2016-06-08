---
title: Get Reference to Child Widgets
page_title: Get Reference to Child Widgets | Kendo UI Editor
description: "Learn how to get a reference to the ImageBrowser's and FileBrowser's child widgets in the Kendo UI Editor widget."
slug: howto_get_referenceto_child_widgets_editor
---

# Get Reference to Child Widgets

The Editor's ImageBrowser and FileBrowser widgets internally use the Kendo UI Upload, ListView, and DropDownList widgets. The example below demonstrates how to obtain these widgets' client-side objects.

The FileBrowser-related code is identical to the ImageBrowser one, with two exceptions:

* The `.k-insertFile` CSS class should be used instead of `.k-insertImage` to attach the `click` handler.
* `var fileBrowser = $(".k-filebrowser").data("kendoFileBrowser");` should be used instead of `var imageBrowser = $(".k-imagebrowser").data("kendoImageBrowser");`.

Once the [ListView](/api/javascript/ui/listview), [Upload](/api/javascript/ui/upload) and [DropDownList](/api/javascript/ui/dropdownlist) widget objects are available, one can use their APIs to attach events with [`bind()`](/intro/installation/events-and-methods#bind-to-events-after-widget-initialization) or perform other customizations, which may not be otherwise supported.

Note that the `transport` configurations below are over-simplified and invalid.

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
        editor.toolbar.element.find(".k-insertImage").parent().click(function(){
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
        editor.toolbar.element.find(".k-insertFile").parent().click(function(){
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

Other articles on the Kendo UI Editor and how-to examples::

* [Editor JavaScript API Reference](/api/javascript/ui/editor)
* [How to Insert HTML Content via Custom Popup Tools]({% slug howto_insert_html_content_custom_popup_tool_editor %})
* [How to Set Caret Position]({% slug howto_set_caret_position_editor %})
* [How to Show Editor in Full Screen]({% slug howto_show_infull_screen_editor %})
* [How to Use Inline Editor inside Windows]({% slug howto_use_inline_editor_inside_windows_editor %})

For more runnable examples on the Kendo UI Editor, browse its [**How To** documentation folder]({% slug howto_add_max_length_validation_editor %}).
