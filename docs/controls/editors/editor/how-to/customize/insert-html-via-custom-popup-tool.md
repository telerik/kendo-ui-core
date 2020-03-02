---
title: Insert HTML Content through Custom Popup Tools
page_title: Insert HTML Content through Custom Popup Tools | Kendo UI Editor
description: "Learn how to insert HTML content via custom Kendo UI Editor tools."
previous_url: /controls/editors/editor/how-to/insert-html-via-custom-popup-tool
slug: howto_insert_html_content_custom_popup_tool_editor
---

# Insert HTML Content through Custom Popup Tools

The HTML markup in the Window resembles the HTML markup internally used by the Kendo UI widgets&mdash;for example, the popup editing of the Grid and the Editor dialogs.

However, this is not required as demonstrated in the following example. It shows how to use a custom Kendo UI Editor tool and a Kendo UI Window for inserting HTML content in the Editor.

For additional information about the code used in the example, refer to the following resources:
* [How to Configure Editor Tools](/api/javascript/ui/editor/configuration/tools)
* [How to Execute Editor Commands](/api/javascript/ui/editor/methods/exec)
* [Editor Custom Tools Demo](https://demos.telerik.com/kendo-ui/editor/custom-tools)
* [How to Configure a Window](/api/javascript/ui/window)
* [How to Obtain Widget's Element from Its Client Object](/framework/widgets/wrapper-element)
* [Notes on Destroying Windows]({% slug overview_kendoui_window_widget %}#configuration-Destroy)

```dojo
    <div id="example">
      <textarea id="editor" rows="10" cols="30" style="width:100%;height:400px">
        &lt;p&gt;
        Kendo UI Editor allows your users to edit HTML in a familiar, user-friendly way.&lt;br /&gt;
        It provides the core HTML editing engine, which includes basic text formatting, hyperlinks, lists,
        and image handling. The widget &lt;strong&gt;outputs identical HTML&lt;/strong&gt; across all major browsers, follows accessibility standards and provides API for content manipulation.
        &lt;/p&gt;
      </textarea>
    </div>

    <script>

    $(function(){

        function onCustomToolClick (e) {
            var popupHtml =
                '<div class="k-editor-dialog k-popup-edit-form k-edit-form-container" style="width:auto;">' +
                  '<div style="padding: 0 1em;">' +
                    '<p><textarea cols="60" rows="10" style="width:90%"></textarea></p>' +
                  '</div>' +
                  '<div class="k-edit-buttons k-state-default">' +
                    '<button class="k-dialog-insert k-button k-primary">Insert</button>' +
                    '<button class="k-dialog-close k-button">Cancel</button>' +
                  '</div>' +
                '</div>';

            var editor = $(this).data("kendoEditor");

            // Store the Editor range object.
            // Needed for IE.
            var storedRange = editor.getRange();

            // Create a modal Window from a new DOM element.
            var popupWindow = $(popupHtml)
            .appendTo(document.body)
            .kendoWindow({
                // Modality is recommended in this scenario.
                modal: true,
                width: 600,
                resizable: false,
                title: "Insert custom content",
                // Ensure the opening animation.
                visible: false,
                // Remove the Window from the DOM after closing animation is finished.
                deactivate: function(e){ e.sender.destroy(); }
            }).data("kendoWindow")
            .center().open();

            // Insert the new content in the Editor when the Insert button is clicked.
            popupWindow.element.find(".k-dialog-insert").click(function(){
                var customHtml = popupWindow.element.find("textarea").val();
                editor.selectRange(storedRange);
                editor.exec("inserthtml", { value: customHtml });
            });

            // Close the Window when any button is clicked.
            popupWindow.element.find(".k-edit-buttons button").click(function(){
                // Detach custom event handlers to prevent memory leaks.
                popupWindow.element.find(".k-edit-buttons button").off();
                popupWindow.close();
            });
        }

        $("#editor").kendoEditor({
            tools: [
                {
                    name: "custom",
                    tooltip: "Insert HTML content",
                    exec: onCustomToolClick
                }
            ]
        });

    });

    </script>
```

## See Also

* [Basic Usage of the Editor (Demo)](https://demos.telerik.com/kendo-ui/editor/index)
* [Using the API of the Editor (Demo)](https://demos.telerik.com/kendo-ui/editor/api)
* [JavaScript API Reference of the Editor](/api/javascript/ui/editor)
