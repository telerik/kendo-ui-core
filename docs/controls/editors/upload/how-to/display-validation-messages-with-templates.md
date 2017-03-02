---
title: Display Validation Messages with Templates
page_title: Display Validation Messages with Templates | Kendo UI Upload
description: "Learn how you can display validation messages when the Upload is configured to use a Template."
slug: howto_display_validation_messages_with_templates
---

# Display Validation Messages with Templates

When the Kendo UI Upload widget is configured to use a template, the template's content replaces some of the widget's HTML elements that are renderd by default.   

The following example demonstrates how to add a span element to the template, which allows a validation message to be displayed conditionally.

###### Example

```html
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

* [Upload JavaScript API Reference](/api/javascript/ui/upload)
* [Modes of Operation]({% slug modes_upload_widget %})
* [Metadata]({% slug metadata_upload_widget %})

For more runnable examples on the Kendo UI Upload widget, browse its [**How To** documentation folder]({% slug howto_remove_files_with_errors %}).
