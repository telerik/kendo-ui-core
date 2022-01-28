---
title: Metadata
page_title: jQuery Upload Documentation | Metadata
description: "Get started with the jQuery Upload by Kendo UI and learn how to send and receive metadata during the asynchronous mode of Upload operation."
slug: metadata_upload_widget
position: 6
---

# Metadata

When the Upload is in its asynchronous mode, the association between the files and the context they originate from is normally lost.

For example, in an application, the `save` handler has to associate the uploaded files with a specific message. The message and the file might be processed on different servers in a load-balancing or cloud-computing scenario.

> The described approaches for sending and receiving metadata are also applicable to the `remove` handler.

## Sending Metadata

To send metadata over to the `save` handler:

1. Add an `input` field for the file description whose value will be sent to the `save` handler.

        <input type="text" id="fileDescription" />

2. Declare a handler for the `upload` event and attach a data object to the passed event.

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

4. Process the file and the associated description. The description and any other fields of the `e.data` object will be serialized in the POST request. For more information on how to read posted form fields, refer to the documentation of your server-side platform.

## Receiving Metadata

The `save` handler can sometimes produce a result that needs to be routed back to the page. The Upload requires a response in a JSON format with a `Content-Type` set to `"text/plain"`. Responses that are not empty and in a format other than JSON will be treated as a server error.

To receive metadata from the `save` handler:

1. Build the response.

        <?php
            header('Content-Type: text/plain;');
            $data = array('foo' => 'bar', 'status' => 'ok');
            echo json_encode($data);
        ?>

2. Declare a handler for the [`success` event](/api/javascript/ui/upload/events/success) and process the response.

        function onSuccess(e) {
            alert("Status: " + e.response.status);
        }

3. Attach the event handler.

        $("#photos").kendoUpload({
            async: {
                saveUrl: "saveHandler.php",
                removeUrl: "removeHandler.php"
            },
            success: onSuccess
        });

## See Also

* [JavaScript API Reference of the Upload](/api/javascript/ui/upload)
