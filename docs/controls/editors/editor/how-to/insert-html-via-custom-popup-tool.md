---
title: Insert HTML Content via Custom Popup Tools
page_title: Insert HTML Content via Custom Popup Tools | Kendo UI Editor
description: "Learn how to insert HTML content via custom Kendo UI Editor tools."
slug: howto_insert_html_content_custom_popup_tool_editor
---

# Insert HTML Content via Custom Popup Tools

The HTML markup in the Window resembles the one used internally by the Kendo UI widgets (e.g. Grid popup editing, Editor dialogs, etc.). However, this is not required.

For additional information about the code used below, refer to:

* [How to Configure Editor Tools](/api/javascript/ui/editor#configuration-tools)
* [How to Execute Editor Commands](/api/javascript/ui/editor#methods-exec)
* [Editor Custom Tools Demo](http://demos.telerik.com/kendo-ui/editor/custom-tools)
* [How to Configure a Window](/api/javascript/ui/window)
* [How to Obtain Widget's Element from Its Client Object](/framework/widgets/wrapper-element)
* [Notes on Destroying Windows]({% slug overview_kendoui_window_widget %}#configuration-Destroy)

The example below demonstrates how to use a custom Kendo UI Editor tool and a Kendo UI Window for inserting HTML content in the Editor.

###### Example

```html
    <div id="example">
      <textarea id="editor" rows="10" cols="30" style="width:100%;height:400px">
        &lt;p&gt;
        Kendo UI Editor allows your users to edit HTML in a familiar, user-friendly way.&lt;br /&gt;
        It provides the core HTML editing engine, which includes basic text formatting, hyperlinks, lists,
        and image handling. The widget &lt;strong&gt;outputs identical HTML&lt;/strong&gt; across all major browsers, follows
        accessibility standards and provides API for content manipulation.
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

            // create a modal Window from a new DOM element
            var popupWindow = $(popupHtml)
            .appendTo(document.body)
            .kendoWindow({
                // modality is recommended in this scenario
                modal: true,
                width: 600,
                resizable: false,
                title: "Insert custom content",
                // ensure opening animation
                visible: false,
                // remove the Window from the DOM after closing animation is finished
                deactivate: function(e){ e.sender.destroy(); }
            }).data("kendoWindow")
            .center().open();

            // insert the new content in the Editor when the Insert button is clicked
            popupWindow.element.find(".k-dialog-insert").click(function(){
                var customHtml = popupWindow.element.find("textarea").val();
                editor.exec("inserthtml", { value: customHtml });
            });

            // close the Window when any button is clicked
            popupWindow.element.find(".k-edit-buttons button").click(function(){
                // detach custom event handlers to prevent memory leaks
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

Other articles on the Kendo UI Editor and how-to examples::

* [Editor JavaScript API Reference](/api/javascript/ui/editor)
* [How to Get Reference to Child Widgets]({% slug howto_get_referenceto_child_widgets_editor %})
* [How to Set Caret Position]({% slug howto_set_caret_position_editor %})
* [How to Show Editor in Full Screen]({% slug howto_show_infull_screen_editor %})
* [How to Use Inline Editor inside Windows]({% slug howto_use_inline_editor_inside_windows_editor %})

For more runnable examples on the Kendo UI Editor, browse its [**How To** documentation folder]({% slug howto_add_max_length_validation_editor %}).
