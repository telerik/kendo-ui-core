---
title: Overview
page_title: Overview | Kendo UI Upload
description: "Learn how to initialize the Kendo UI Upload widget and configure its behavior."
slug: overview_kendoui_upload_widget
position: 1
---

# Upload Overview

The [Kendo UI Upload widget](http://demos.telerik.com/kendo-ui/upload/index) uses progressive enhancement to deliver the best possible uploading experience to users, without requiring extra developer effort.

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

*   Asynchronous and synchronous (on form `submit`) upload of files in the user's file system
*   Multiple file selection
*   Removal of uploaded files
*   Progress tracking
*   File drag-and-drop
*   In-progress cancellation of upload

Progress tracking, file drag-and-drop, and in-progress cancellation of upload are automatically enabled if supported by the browser. For detailed information on the browser versions which support the Upload features, refer to [this article]({% slug browsersupport_upload_widget %}).

> **Important**
> * Uploading large files in chunks is currently not supported, as it would require an additional plug-in&mdash;eitherFlash, or Silverlight&mdash;to compensate for the missing File API support in older browsers.
> * The Upload widget works in `<input type="file" />` elements, so it is only able to upload files selected by the user, which exist in the file system. For uploading files generated with JavaScript on the fly, use another approach, e.g. an Ajax request.

### Modes of Operation

For detailed information on the modes of operation Kendo UI Upload supports, refer to [this article]({% slug modes_upload_widget %}).

### Drag and Drop

For detailed information on the drag-and-drop functionality Kendo UI Upload supports, refer to [this article]({% slug dragandrop_upload_widget %}).

## Common Scenarios

### Identify Files When Uploading

Regardless of the mode of operation, a unique identifier (`uid`) is generated for each file. In the case of a synchronous or asynchronous upload with the [batch option](/api/javascript/ui/upload#configuration-async.batch) enabled, the single `uid` that is generated, stands for the whole batch of files, selected at the same time. In the case of asynchronous upload with the [batch option](/api/javascript/ui/upload#configuration-async.batch) disabled, a `uid` is generated for each separate file.   

The generated `uid` is added to the [`cancel`](/api/javascript/ui/upload#events-cancel) [`error`](/api/javascript/ui/upload#events-error), [`progress`](/api/javascript/ui/upload#events-progress), [`remove`](/api/javascript/ui/upload#events-remove), [`select`](/api/javascript/ui/upload#events-select), and [`upload`](/api/javascript/ui/upload#events-upload) events as a property of the `e.files` collection.

## Reference

### Existing Instances

Refer to an existing Upload instance via the [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference has been established, use the [Upload API](/api/javascript/ui/upload) to control its behavior.

The example below demonstrates how to access an existing Upload instance.

###### Example

    var upload = $("#upload").data("kendoUpload");

## See Also

Other articles and how-to examples on the Kendo UI Upload:

* [Overview of the ASP.NET MVC HtmlHelper Extension for the Upload Widget](/aspnet-mvc/helpers/upload/overview)
* [Overview of the Upload JSP Tag]({% slug overview_upload_uiforjsp %})
* [Overview of the Upload PHP Class](/php/widgets/upload/overview)
* [Drag and Drop]({% slug dragandrop_upload_widget %})
* [Send and Receive Metadata]({% slug metadata_upload_widget %})
* [Modes of Operation]({% slug modes_upload_widget %})
* [Browser Support]({% slug browsersupport_upload_widget %})
* [Troubleshooting]({% slug troubleshooting_upload_widget %})
* [How to Serialize Form Data during Async Upload]({% slug howto_serialize_form_data_upload %})
* [Upload JavaScript API Reference](/api/javascript/ui/upload)

For how-to examples on the Kendo UI Upload widget, browse its [**How To** documentation folder]({% slug howto_remove_files_with_errors %}).
