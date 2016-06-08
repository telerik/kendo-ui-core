---
title: Metadata
page_title: Metadata | Kendo UI Upload
description: "Learn how to send metadata to the save handler and receive metadata in the Kendo UI Upload widget."
slug: metadata_upload_widget
position: 3
---

# Metadata

Asynchronous uploading usually means that you lose the association between the files and the context they originate from. For example, in an application the save handler must associate the uploaded files with a particular message. The message and the file might even be processed on different servers in a load balancing or cloud computing scenario.

## Send and Receive

### Send Metadata

To send metadata over to the `save` handler, follow the steps below.

**Step 1** Add an `input` field for the file description. Its value is going to be sent to the save handler.

###### Example

        <input type="text" id="fileDescription" />

**Step 2** Declare a handler for the `upload` event and attach a data object to the passed event.

###### Example

        function onUpload(e) {
            e.data = {
                fileDescription: $("#fileDescription").val()
            };
        }

**Step 3** Attach the `upload` event handler.

###### Example

        $("#photos").kendoUpload({
            async: {
                saveUrl: "saveHandler.php",
                removeUrl: "removeHandler.php"
            },
            upload: onUpload
        });

**Step 4** Process the file and the associated description.

The description, and any other fields of the `e.data` object, are going to be serialized in the POST request.

For more information on how to read posted form fields, refer to the documentation of your server-side platform.

### Receive Metadata

The save handler can sometimes produce a result that needs to be routed back to the page. The Upload requires a response in a JSON format with a `Content-Type` set to `"text/plain"`. Responses that are not empty and in a format other than JSON are going to be treated as a server error.

To receive metadata from the save handler, follow the steps below:

**Step 1** Build the response.

###### Example

        <?php

            header('Content-Type: text/plain;');

            $data = array('foo' => 'bar', 'status' => 'ok');

            echo json_encode($data);
        ?>

**Step 2** Declare a handler for the [`success` event](/api/javascript/ui/upload#events-success) and process the response.

###### Example

        function onSuccess(e) {
            alert("Status: " + e.response.status);
        }

**Step 3** Attach the event handler.

###### Example

        $("#photos").kendoUpload({
            async: {
                saveUrl: "saveHandler.php",
                removeUrl: "removeHandler.php"
            },
            success: onSuccess
        });

> **Important**
>
> The same approach of sending and receiving metadata is also applicable for the `remove` handler.

## See Also

Other articles on the Kendo UI Upload:

* [Overview of the Upload Widget]({% slug overview_kendoui_upload_widget %})
* [Drag and Drop]({% slug dragandrop_upload_widget %})
* [Modes of Operation]({% slug modes_upload_widget %})
* [Browser Support]({% slug browsersupport_upload_widget %})
* [Troubleshooting]({% slug troubleshooting_upload_widget %})

For how-to examples on the Kendo UI Upload widget, browse its [**How To** documentation folder]({% slug howto_remove_files_with_errors %}).
