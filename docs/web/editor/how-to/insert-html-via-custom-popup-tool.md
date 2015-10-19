---
title: Insert HTML content via custom popup tool
page_title: Insert HTML content via custom popup tool
description: Insert HTML content via custom popup tool
---

# Insert HTML content via custom popup Editor tool

The following example demonstrates how to use a custom Editor tool and a Kendo UI Window for inserting HTML content in the Editor.

The HTML markup in the Kendo UI Window resembles the one used internally by the Kendo UI widgets (e.g. Grid popup editing, Editor dialogs, etc), however, this is not required.

For additional information about the code used below, please check:

* [how to configure Editor tools](/api/javascript/ui/editor#configuration-tools)
* [how to execute Editor commands](/api/javascript/ui/editor#methods-exec)
* [Editor custom tools demo](http://demos.telerik.com/kendo-ui/editor/custom-tools)
* [how to configure a Window](/api/javascript/ui/window)
* [how to obtain a widget's element from its client object](/framework/widgets/wrapper-element)
* [notes on destroying Windows](/web/window/overview#destroying-a-kendo-ui-window)

#### Example

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