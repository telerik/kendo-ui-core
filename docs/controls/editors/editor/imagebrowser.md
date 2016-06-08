---
title: Image Browser
page_title: Image Browser | Kendo UI Editor
description: "Learn how to initialize and configure the Kendo UI Editor widget."
slug: image_browser_editor_widget
position: 2
---

# Image Browser

By default the **Insert Image** tool opens a simple dialog which allows you to type in or paste the URL of an image and, optionally, specify a tooltip.

![Insert Image Dialog](/controls/editors/editor/editor-insert-image.png)

## Overview

From Q3 2012 release onwards the Editor supports a new way of picking an image by browsing a list of predefined files and directories. Uploading new images is also supported.

![Image Browser Dialog](/controls/editors/editor/editor-image-browser.png)

The image browser needs a server-side implementation to retrieve and upload the files and directories.

## Configuration

The image browser tool can be configured through the [`imagebrowser` configuration option](/api/javascript/ui/editor#configuration-imageBrowser).

###### Example

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

The default requests and responses for the `create/read/destroy/upload` operations are as follows:

- `create` - makes a request for the creation of a directory with the parameters below and does not expect a response:

        { "name": "New folder name", "type": "d", "path": "foo/" }

- `read` - sends the `path` parameter to specify the path which is browsed and expects a file listing in the format below:

        [
            { "name": "foo.png", "type": "f", "size": 73289 },
            { "name": "bar.jpg", "type": "f", "size": 15289 },
            ...
        ]

    Where `name` is the file or directory name, `type` is either an **f** for a file or a **d** for a directory, and `size` is the file size (optional).

- `destroy` - makes a request with the following parameters:

    - `name` - the file or directory to be deleted.
    - `path` - the directory in which the file or the directory resides.
    - `type` - whether a file or a directory is to be deleted (an **f** or a **d**).
    - `size` - optional, the file size, as provided by the `read` response.

- `upload` - makes a request to the `uploadUrl`. The request payload consists of the uploaded file and expects a `file` object in response:

        { "name": "foo.png", "type": "f", "size": 12345 }

All of these can be changed through the [`imagebrowser` configuration](/api/javascript/ui/editor#configuration-imageBrowser).

## See Also

Other articles on the Kendo UI Editor:

* [Overview of the Editor Widget]({% slug overview_kendoui_editor_widget %})
* [Post-Process Content]({% slug post_process_content_editor_widget %})
* [Set Selections]({% slug set_selections_editor_widget %})
* [Pasting]({% slug pasting_editor_widget %})
* [Prevent Cross-Site Scripting]({% slug prevent_xss_editor_widget %})
* [Troubleshooting]({% slug troubleshooting_editor_widget %})
* [Editor JavaScript API Reference](/api/javascript/ui/editor)

For how-to examples on the Kendo UI Editor widget, browse its [**How To** documentation folder]({% slug howto_add_max_length_validation_editor %}).
