---
title: Display Validation Messages with Templates
page_title: Display Validation Messages with Templates | Kendo UI Upload
description: "Learn how to display validation messages when the Kendo UI Upload is configured to use a template."
slug: howto_display_validation_messages_with_templates
---

# Display Validation Messages with Templates

When the Upload is configured to use a template, the content of the template replaces some of the HTML elements of the widget that are rendered by default.   

The following example demonstrates how to add a `span` element to the template. This allows a validation message to be conditionally displayed.

###### Example

```dojo
<div id="example">
    <input name="files" id="files" type="file" />
    <div class="demo-hint">You can only upload <strong>PDF</strong> files.</div>

    <script id="fileTemplate" type="text/x-kendo-template">
        <span class='k-progress'></span>
        <div class='file-wrapper'>
            <h4 class='file-heading file-name-heading'>Name: #=name#</h4>
            <h4 class='file-heading file-size-heading'>Size: #=size# bytes</h4>
            <span class='validation-message #=files[0].extension == ".pdf" ? "hide" : "show"#'>#=files[0].extension# file type not allowed. </span>
            <button type='button' class='k-upload-action'></button>
        </div>
    </script>

    <script>
        $(document).ready(function () {
            $("#files").kendoUpload({
                async: {
                    saveUrl: "save",
                    removeUrl: "remove"
                },
                validation: {
                    allowedExtensions: [".pdf"]
                },
                template: kendo.template($('#fileTemplate').html())
            });
        });
    </script>
    <style>
        .hide {
            display: none;
        }

        .show {
            display: inline;
        }

        .validation-message {
            color: red;
        }
    </style>
</div>
```

## See Also

* [JavaScript API Reference of the Upload](/api/javascript/ui/upload)
* [Modes of Operation]({% slug modes_upload_widget %})
* [Metadata]({% slug metadata_upload_widget %})

For more runnable examples on the Kendo UI Upload widget, browse its [**How To** documentation folder]({% slug howto_add_image_preview %}).
