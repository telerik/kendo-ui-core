---
title: Metadata
page_title: Documentation guide for using metadata in File Upload UI widget
description: How to send metadata to the save handler and receive metadata in Kendo UI Upload widget.
position: 3
---

Asynchronous uploading usually means that you lose the association betwen the files and the context that they originate from.

Take an e-mail application for example. The save handler must associate the uploaded files to a particular message.

The message and the file even might be processed on different servers in a load balancing or cloud computing scenario.

## Sending metadata to the save handler

1. Add an input field for description. We will send its value to the save handler.

        <input type="text" id="fileDescription" />

2. Declare a handler for the upload event and attach a data object to the passed event.

        function onUpload(e) {
            e.data = {
                fileDescription: $("#fileDescription").val()
            };
        }

3. Attach the `upload` event handler.

        $("#photos").kendoUpload({
            async: {
                saveUrl: "saveHandler.php",
                removeUrl: "removeHandler.php"
            },
            upload: onUpload
        });

4. Process the file and the associated description

The description, and any other fields of the `e.data` object, will be serialized in the POST request.

Please consult the documentation of your server-side platform for instructions on how to read posted form fields.

## Receiving metadata from the save handler

The save handler can sometimes produce a result that needs to be routed back to the page.

The Upload requires the response to be in JSON format with Content-Type set to "text/plain". Any non-empty response that is not JSON will be treated as a server error.

1. Build the response

        <?php

            header('Content-Type: text/plain;');

            $data = array('foo' => 'bar', 'status' => 'ok');

            echo json_encode($data);
        ?>

2. Declare a handler for the [success event](/api/web/upload/events.aspx#success) and process the response

        function onSuccess(e) {
            alert("Status: " + e.response.status);
        }

3. Attach the event handler

        $("#photos").kendoUpload({
            async: {
                saveUrl: "saveHandler.php",
                removeUrl: "removeHandler.php"
            },
            success: onSuccess
        });

> The same approach of sending and receiving metadata is applicable for the **remove** handler as well.
