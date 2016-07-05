---
title: Drag and Drop
page_title: Drag and Drop | Kendo UI Upload
description: "Learn how to upload files with the drag-and-drop functionality in asyncronous mode in the Kendo UI Upload widget."
slug: dragandrop_upload_widget
position: 2
---

# Drag and Drop

Users can select files by dropping them over the Kendo UI Upload.

> **Important**
>
> The drag-and-drop functionality is only available in [async mode](modes#asynchronous-mode) and requires a [supported browser]({% slug browsersupport_upload_widget %}).

## Select and Upload Files

### File Upload

To upload a file, follow the steps below:

1. Drag a file over the browser window for the drop zone to appear. ![](/controls/editors/upload/upload-dd1.png)
2. When you pass the mouse over the drop zone, it gets highlighted. ![](/controls/editors/upload/upload-dd2.png)
3. Release the file over the drop zone so it adds it to the upload queue. ![](/controls/editors/upload/upload-dd3.png)

###  Drop Zone Visibility

By default, the drop zone is not visible.

The example below demonstrates how to override this behavior by applying the CSS rules.

###### Example

    div.k-dropzone {
        border: 1px solid #c5c5c5; /* For Default; Different for each theme */
    }

    div.k-dropzone em {
        visibility: visible;
    }

<!--*-->
## See Also

Other articles on the Kendo UI Upload:

* [Overview of the Upload Widget]({% slug overview_kendoui_upload_widget %})
* [Send and Receive Metadata]({% slug metadata_upload_widget %})
* [Modes of Operation]({% slug modes_upload_widget %})
* [Browser Support]({% slug browsersupport_upload_widget %})
* [Troubleshooting]({% slug troubleshooting_upload_widget %})

For how-to examples on the Kendo UI Upload widget, browse its [**How To** documentation folder]({% slug howto_remove_files_with_errors %}).
