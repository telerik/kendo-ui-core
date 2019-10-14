---
title: Get Reference to Child Widgets
page_title: Get Reference to Child Widgets | Kendo UI Editor
description: "Learn how to get a reference to the ImageBrowser and FileBrowser child widgets in the Kendo UI Editor widget."
previous_url: /controls/editors/editor/how-to/get-reference-to-imagebrowser-child-widgets
slug: howto_get_referenceto_child_widgets_editor
---

# Get Reference to Child Widgets

The ImageBrowser and FileBrowser components of the Editor internally use the Kendo UI Upload, ListView, and DropDownList widgets.

The following example demonstrates how to obtain these client-side objects of the widget. The FileBrowser-related code is identical to the ImageBrowser one except for:
* To attach the `click` handler, use the `.k-i-file-add` CSS class instead of the `.k-i-image` one.
* Use `var fileBrowser = $(".k-filebrowser").data("kendoFileBrowser");` instead of `var imageBrowser = $(".k-imagebrowser").data("kendoImageBrowser");`.

> If you are using the 2017 R1 version or later, use the `.k-insertFile` and `.k-insertImage` classes to get the button elements.

To attach events with [`bind()`](/intro/installation/events-and-methods#bind-to-events-after-widget-initialization) or to perform other customizations that may not be otherwise supported, use the API calls of the [ListView](/api/javascript/ui/listview), [Upload](/api/javascript/ui/upload) and [DropDownList](/api/javascript/ui/dropdownlist) widget objects after they are available.

The following `transport` configurations are over-simplified and invalid.

```dojo
    <textarea name="editor" id="editor"></textarea>

    <script>

    $(function(){
        // Initialize the Editor.
        // When using Kendo UI helpers, the following statement will be auto-generated:
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

        // Start of the example.

        // Retrieve the Editor widget object.
        var editor = $("#editor").data("kendoEditor");

        // Attach a click handler on the tool button, which opens the ImageBrowser dialog.
        editor.toolbar.element.find(".k-i-image").parent().click(function(){
            // A setTimeout is required, otherwise the ImageBrowser widget will still not be initialized.
            setTimeout(function(){
                // Retrieve the ImageBrowser widget object.
                var imageBrowser = $(".k-imagebrowser").data("kendoImageBrowser");
                console.log(imageBrowser);

                // Retrieve the ListView widget object.
                var listView = imageBrowser.listView;
                console.log(listView);

                // Retrieve the Upload widget object.
                var upload = imageBrowser.upload;
                console.log(upload);

                // Retrieve the DropDownList widget object.
                var dropdownlist = imageBrowser.arrangeBy;
                console.log(dropdownlist);
            });
        });

        // Attach a click handler on the tool button which opens the FileBrowser dialog.
        editor.toolbar.element.find(".k-i-file-add").parent().click(function(){
            // A setTimeout is required. Otherwise, the FileBrowser widget will still not be initialized.
            setTimeout(function(){
                // Retrieve the ImageBrowser widget object.
                var fileBrowser = $(".k-filebrowser").data("kendoFileBrowser");
                console.log(fileBrowser);

                // Retrieve the ListView widget object.
                var listView = fileBrowser.listView;
                console.log(listView);

                // Retrieve the Upload widget object.
                var upload = fileBrowser.upload;
                console.log(upload);

                // Retrieve the DropDownList widget object.
                var dropdownlist = fileBrowser.arrangeBy;
                console.log(dropdownlist);
            });
        });
    });

    </script>
```

## See Also

* [Basic Usage of the Editor (Demo)](https://demos.telerik.com/kendo-ui/editor/index)
* [Using the API of the Editor (Demo)](https://demos.telerik.com/kendo-ui/editor/api)
* [JavaScript API Reference of the Editor](/api/javascript/ui/editor)
