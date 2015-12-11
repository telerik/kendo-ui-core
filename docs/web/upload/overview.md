---
title: Overview
page_title: Overview | Kendo UI Upload Widget
description: "Learn how to initialize the Kendo UI Upload widget and configure its behavior."
slug: overview_kendoui_upload_widget
position: 1
---

# Upload Overview

[Kendo UI Upload widget](http://demos.telerik.com/kendo-ui/upload/index) uses progressive enhancement to deliver the best possible uploading experience to users, without requiring extra developer effort. 

## Getting Started

### Initialize the Upload

Kendo UI Upload can be initiated from a simple HTML `form`, an `input` element of the `"file"` type, and a jQuery selector.

The example below demonstrates how to create and initialize the Upload.

###### Example

    <!-- Kendo will automatically set the form enctype attribute to "multi-part/form-data" -->
    <form method="post" action="handler.php">
        <div>
            <input name="photos[]" id="photos" type="file" />
        </div>
    </form>

    $(document).ready(function() {
        $("#photos").kendoUpload();
    });

Note the array syntax in the input name: it is used to hint the Upload handler to treat the photos as an array.

For detailed information on how to send metadata to the save handler and receive metadata in the Upload widget, see [this article]({% slug metadata_upload_widget %}).

For more information on how to handle the uploaded files, refer to the documentation of your specific server technology.

## Features 

### Basic Functionalities

Kendo UI Upload is a widget based on standards and requires no plug-ins. It supports the following functionalities:

*   Asynchronous and synchronous (on form `submit`) file upload
*   Multiple file selection
*   Removal of uploaded files
*   Progress tracking
*   File drag-and-drop
*   In-progress cancellation of upload

Progress tracking, file drag-and-drop, and in-progress cancellation of upload are automatically enabled if supported by the browser. For detailed information on the browser versions which support the Upload features, refer to [this article]({% slug browsersupport_upload_widget %}).

> **Important** 
>
> Uploading large files in chunks is currently not supported, as it would require an additional plug-in&mdash;eitherFlash, or Silverlight&mdash;to compensate for the missing File API support in older browsers.

### Modes of Operation

For detailed information on the modes of operation Kendo UI Upload supports, refer to [this article]({% slug modes_upload_widget %}).

### Drag and Drop

For detailed information on the drag-and-drop functionality Kendo UI Upload supports, refer to [this article]({% slug dragandrop_upload_widget %}).

## Reference

### Existing Instances

Refer to an existing Upload instance via the [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference has been established, use the [Upload API](/api/javascript/ui/upload) to control its behavior.

The example below demonstrates how to access an existing Upload instance.

###### Example

    var upload = $("#upload").data("kendoUpload");
    
## See Also

Other articles on Kendo UI Upload:

* [Overview of the ASP.NET MVC HtmlHelper Extension](/aspnet-mvc/helpers/upload/overview)
* [Overview of the JSP Tag](/jsp/tags/upload/overview)
* [Overview of the PHP Class](/php/widgets/upload/overview)
* [Drag and Drop]({% slug dragandrop_upload_widget %})
* [Send and Receive Metadata]({% slug metadata_upload_widget %})
* [Modes of Operation]({% slug modes_upload_widget %})
* [Browser Support]({% slug browsersupport_upload_widget %})
* [Troubleshooting]({% slug troubleshooting_upload_widget %})
* [JavaScript API Reference](/api/javascript/ui/upload)