---
title: Upload Files to OData Service
page_title: Upload Files to OData Service | Kendo UI Upload
description: "Learn how to upload files to the OData service by using the Kendo UI Upload."
slug: howto_upload_odata
---

# Upload Files to OData Service

By default, the Upload uploads files as FileData.

In order for the OData service to consume a file, the body of the sent request has to include the file buffer. To allow the Upload to utilize the [`FileReader`](https://developer.mozilla.org/en-US/docs/Web/API/FileReader) of the browser and send a request that satisfies the OData specification for [Media Entities](http://docs.oasis-open.org/odata/odata/v4.0/errata03/os/complete/part1-protocol/odata-v4.0-errata03-os-part1-protocol-complete.html#_Toc453752304), set the [`useArrayBuffer`](/api/javascript/ui/upload/configuration/async.usearraybuffer) option to `true`.

> **Important**
>
> The `useArrayBuffer` option enables you to use the Upload in SharePoint 2013 and utilize its native [REST service for the file upload mechanism](https://msdn.microsoft.com/en-us/library/office/dn292553.aspx).



```
<input type="file" name="files" id="photos" />
<script>
    $("#photos").kendoUpload({
        async: {
            saveUrl: "http://my-app.localhost/save",
            removeUrl: "http://my-app.localhost/remove",
            useArrayBuffer: true
        }
    });
</script>
```

## See Also

* [JavaScript API Reference of the Upload](/api/javascript/ui/upload)
* [Modes of Operation]({% slug modes_upload_widget %})
* [Metadata]({% slug metadata_upload_widget %})

For more runnable examples on the Kendo UI Upload widget, browse its [**How To** documentation folder]({% slug howto_add_image_preview %}).
