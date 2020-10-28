---
title: Remote Data
page_title: jQuery FileManager Documentation | Remote Binding in FileManager
description: "Get understanding in the Remote Binding in FileManager."
slug: remotedata_kendoui_filemanager_widget
position: 2
---

# Remote Data 

The Kendo UI FileManager provides a built-in DataSource which allow you to quickly set up and implement a remote data-binding functionality.

To bind the FileManager to remote data, specify the `dataSource` option and supply the object with the needed endpoints for `read`, `create`, `update` and `destroy` operations. The following example demonstrates such implementation, and the actual endpoints configurations could be found in [here](https://github.com/telerik/kendo-ui-demos-service/blob/master/demos-and-odata-v3/KendoCRUDService/Controllers/FileManagerController.cs):

```
 <div id="filemanager"></div>

<script>
    $("#filemanager").kendoFileManager({
        dataSource: {
            schema: kendo.data.schemas.filemanager,
            transport: {
                read: {
                    url: "/kendo-ui/service/FileManager/Read",
                    method: "POST"
                },
                create: {
                    url: "/kendo-ui/service/FileManager/Create",
                    method: "POST"
                },
                update: {
                    url: "/kendo-ui/service/FileManager/Update",
                    method: "POST"
                },
                destroy: {
                    url: "/kendo-ui/service/FileManager/Destroy",
                    method: "POST"
                }
            }
        },
        uploadUrl: "/kendo-ui/service/FileManager/Upload"
    });
</script>
```



The following list provides information about the default requests and responses for the `create`, `read`, `destroy` operations.

- `create`&mdash;Makes a `POST` request for the creation of a directory with the following parameters.

         {"name":"...","size":0,"path":"...","extension":".txt","isDirectory":...,"hasDirectories":...,"created":"...","createdUtc":"...","modified":"...","modifiedUtc":"..."}

- `read`&mdash;Makes a `POST` request that contains the `path` parameter to specify the path which is browsed and expects a file listing in the following format:

        [
           {"name":"Documents","size":0,"path":"Documents","extension":"","isDirectory":true,"hasDirectories":false,"created":"\/Date(1578897289317)\/","createdUtc":"\/Date(1578897289317)\/","modified":"\/Date(1578897289332)\/","modifiedUtc":"\/Date(1578897289332)\/"},
            ...
        ]


- `destroy`&mdash;Makes a `POST` request containing `FormData` with the following parameters:

    - `name`&mdash;The file or directory to be deleted.
    - `path`&mdash;The directory in which the file or the directory resides.
    - `extension`&mdash; The extension of the deleted file. No extension in the data, if a folder is deleted.
    - `size`&mdash The file size, as provided by the `read` response.
    - `isDirectory`&mdash; Boolean, specifying if the deleted is a file or not.
    - `hasDirectories`&mdash; Boolean, specifying if the deleted contains folders.
    - `created`&mdash; Created Date of the deleted item.
    - `createdUtc`&mdash; Created Date in UTC format of the deleted item.
    - `modified`&mdash; Modified Date of the deleted item.
    - `modifiedUtc`&mdash; Created Date in UTC formats of the deleted item.

- `update`&mdash;Makes a `POST` request, containing the `FileEntry` object. The expected response is a `file` object in the following format:

        {"name":"...","size":...,"path":"...","extension":".txt","isDirectory":...,"hasDirectories":...,"created":"...","createdUtc":"...","modified":"...","modifiedUtc":"..."}



* [Overview of Kendo UI FileManager]({% slug overview_kendoui_filemanager_widget %})
* [Navigation in Kendo UI FileManager]({% slug navigation_kendoui_filemanager_widget %})
* [Preview Panes in Kendo UI FileManager]({% slug previewpane_kendoui_filemanager_widget %})
