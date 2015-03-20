---
title: Image Browser
position: 2
---

# Image Browser

## Introduction

By default the "Insert Image" tool opens a simple dialog which allows the user to type in or paste the URL of an image and optionally specify a tooltip.

![Insert Image Dialog](/web/editor/editor-insert-image.png)

Since the Q3 2012 release KendoUI Editor widget supports a new way of picking an image by browsing a list of predefined files and directories. Uploading new images is also supported.

![Image Browser Dialog](/web/editor/editor-image-browser.png)

The image browser needs a server side implementation to retrieve and upload the files and directories.

## Configuring the ImageBrowser

The image browser tool can be configured through the [`imagebrowser` configuration option](/api/web/editor#configuration-imageBrowser).

#### Example

       $(document).ready(function(){
         $("#editor").kendoEditor({
             imageBrowser: {
                transport: {
                    read: "imagebrowser/read",
                    destroy: "imagebrowser/destroy",
                    create: "imagebrowser/createDirectory",
                    uploadUrl: "imagebrowser/upload",
                    thumbnailUrl: "imagebrowser/thumbnail"
                    imageUrl: "/content/images/{0}"
                }
             }
         });
      });
      
The default requests and responses for the create / read / destroy / upload  operations are as follows:
 
- **create** - makes a request for the creation of a directory with the following parameters:

        { "name": "New folder name", "type": "d", "path": "foo/" }

    Does not expect a response.

- **read** - sends the `path` parameter to specify the path which is browsed. Expects a file listing in the following format:
   
        [
            { "name": "foo.png", "type": "f", "size": 73289 },
            { "name": "bar.jpg", "type": "f", "size": 15289 },
            ...
        ]

    Where `name` is the file or directory name, `type` is either "f" for file or "d" for directory, and `size` is the file size (optional).

- **destroy** - makes a request with the following parameters

    - **name** - the file / directory to be deleted
    - **path** - the directory in which the file / directory resides
    - **type** - whether a file or a directory is to be deleted ("f" or "d")
    - **size** - optional, the file size, as provided from the **read** response

- **upload** - makes a request to the `uploadUrl`. The request payload consists of the uploaded file. Expects a file object in response:

        { "name": "foo.png", "type": "f", "size": 12345 }

All of these can be changed through the [`imagebrowser` configuration](/api/web/editor#configuration-imageBrowser).
