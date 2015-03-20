---
title: Overview
page_title: Overview of Kendo UI Upload widget
description: How to use File Upload UI widget, initialize Upload and access and existing Upload instance.
position: 1
---

# Upload Overview

An **Upload** uses progressive enhancement to deliver the best possible uploading experience to
users without requiring extra developer effort. Features highlights:


*   Asynchronous and synchronous (on form submit) file upload
*   Multiple file selection
*   Removing uploaded files
*   Progress tracking *
*   File drag-and-drop *
*   Cancelling upload in-progress *


(*) These features are automatically enabled if supported by the browser.

An **Upload** is a standards-based widget; no plug-ins required.

## Getting Started

### 1\. Create a simple HTML form and input element of type "file"

    <!-- Kendo will automatically set the form enctype attribute to "multi-part/form-data" -->
    <form method="post" action="handler.php">
        <div>
            <input name="photos[]" id="photos" type="file" />
        </div>
    </form>

### 2\. Initialize Upload with a jQuery selector

    $(document).ready(function() {
        $("#photos").kendoUpload();
    });

Note the array syntax in the input name; it is used to hint the upload handler to treat photos as an array.

Please consult the documentation of your specific server technology regarding the handling of uploaded files.

## See Also

[Upload Modes](/web/upload/modes)

## Accessing an Existing Upload

You can reference an existing **Upload** instance via
[jQuery.data()](http://api.jquery.com/jQuery.data/). Once a reference has been established, you can
use the API to control its behavior.

### Accessing an existing Upload instance

    var upload = $("#upload").data("kendoUpload");

