---
title: Metadata
page_title: Metadata
description: "Learn how to send and receive metadata when uploading files with the Telerik UI Upload HtmlHelper for {{ site.framework }}."
previous_url: /helpers/editors/upload/metadata
slug: htmlhelpers_upload_send_meta_aspnetcore
position: 6
---

# Metadata

Usually, asynchronous uploading means that you lose the association between the files and the context they originate from.

For example, in an application, the `save` handler must associate the uploaded files with a particular message. The message and the file might be processed on different servers in a load-balancing or cloud-computing scenario.

## Sending Metadata

To send metadata over to the `Save()` handler:

1. Add an `input` field for the file description. Its value is going to be sent to the save handler.

    ```
    @(Html.Kendo().TextBox().Name("fileDescription"))
    ```

2. Declare a handler for the `upload` event and attach a data object to the passed event.

    ```
    function onUpload(e) {
        e.data = {
            fileDescription: $("#fileDescription").val()
        };
    }
    ```

3. Attach the `upload` event handler.    

    ```
    @(Html.Kendo().Upload()
        .Name("files")
        .Async(a => a
            .Save("ChunkSave", "Upload")
            .Remove("Remove", "Upload")
        )
        .Events(e => e.Upload("onUpload"))
    )
    ```

4. Process the file and the associated description. The description, and any other fields of the `e.data` object, will be serialized in the `POST` request.

## Receiving Metadata

The `save` handler can sometimes produce a result that needs to be routed back to the page. The Upload requires a response in a JSON format with a `Content-Type` set to `"text/plain"`. Responses that are not empty and in a format other than JSON are treated as a server error.

> The same approach of sending and receiving metadata is also applicable for the `remove` endpoint handler.

To receive metadata from the `save` handler:

1. Build the response.

    ```
    return Json(new object() { foo = "bar" });
    ```

2. Declare a handler for the [`success` event](https://docs.telerik.com/kendo-ui/api/javascript/ui/upload/events/success) and process the response.

    ```
    function onSuccess(e) {
        alert("Foo: " + e.response.foo);
    }
    ```

3. Attach the event handler.

    ```
    @(Html.Kendo().Upload()
        .Name("files")
        .Async(a => a
            .Save("ChunkSave", "Upload")
            .Remove("Remove", "Upload")
        )
        .Events(e => e.Success("onSuccess"))
    )
    ```

## See Also

* [Server-Side API](/api/upload)
