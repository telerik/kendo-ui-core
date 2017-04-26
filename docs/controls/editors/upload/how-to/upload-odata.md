---
title: Upload Files to OData Service
page_title: Upload Files to OData Service | Kendo UI Upload
description: "Learn how to upload fiels to OData service with the Kendo UI Upload widget."
slug: howto_upload_odata
---

# Upload Files to OData Service

**Kendo Upload**, by default, uploads files as filedata. In order for the **OData** service to consume a file, the body of the sent request should include the file buffer. You can enable the [useArrayBuffer option](/api/javascript/ui/upload#configuration-async.useArrayBuffer) so that **Kendo Upload** utilize the browser's [FileReader](https://developer.mozilla.org/en-US/docs/Web/API/FileReader) and send a request that satisfies the OData specification for [Media Entities](http://docs.oasis-open.org/odata/odata/v4.0/errata03/os/complete/part1-protocol/odata-v4.0-errata03-os-part1-protocol-complete.html#_Toc453752304).

> Note
>
> This option will enable you to use **Kendo Upload** in **SharePoint 2013** and utilize its native [REST service for the file upload mechanism](https://msdn.microsoft.com/en-us/library/office/dn292553.aspx).

###### Example

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

For more runnable examples on the Kendo UI Upload widget, browse its **How To** documentation folder.
