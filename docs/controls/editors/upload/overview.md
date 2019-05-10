---
title: Overview
page_title: jQuery Upload Documentation | Upload Overview | Kendo UI
description: "Get started with the jQuery Upload by Kendo UI and learn how to initialize the widget, use its events, and reference its existing instances."
slug: overview_kendoui_upload_widget
position: 1
---

# Upload Overview

The [Kendo UI Upload widget](http://demos.telerik.com/kendo-ui/upload/index) helps users send files from their file systems to dedicated server handlers which are configured to receive them and uses progressive enhancement to deliver an uploading user experience without the requirement of extra developer efforts.

## Basic Usage

The Upload provides a set of [default API configuration options](/api/javascript/ui/ipload) which can be set during its initialization such as synchronous and asynchronous modes of operation, chunk upload of files, multiple files selection and removal, progress tracking and in-progress cancellation of the upload, and so on.

> * The Upload does not currently support the upload of large files in chunks because the feature would require an additional Flash or Silverlight plug-in to compensate for the missing API support in older browsers.
> * The Upload works in `<input type="file" />` elements. Therefore, it can only upload files that are selected by the user and which exist in the file system. To upload files that are generated with JavaScript on the fly, use Ajax requests.

For the runnable example, refer to the [demo on the basic usage of the Kendo UI Upload](https://demos.telerik.com/kendo-ui/upload/index).

## Initializing the Upload

To initiate the Upload, use any of the following approaches:
* From an HTML `form` element.
* From an HTML `input` element of the `"file"` type.
* From a jQuery selector.

The following example demonstrates how to initialize the Upload. The array syntax in the `input` name is used to hint the Upload handler to treat the photos as an array. For more information on how to handle the uploaded files, refer to the documentation of your specific server technology.

    <!-- Kendo will automatically set the form `enctype` attribute to "multi-part/form-data" -->
    <form method="post" action="handler.php">
        <div>
            <input name="photos[]" id="photos" type="file" />
        </div>
    </form>

    $(document).ready(function() {
        $("#photos").kendoUpload();
    });

## Features and Functionality

* [Dragging and dropping]({% slug dragandrop_upload_widget %})
* [File processing]({% slug chunkupload_upload_widget %})
* [Modes of operation]({% slug modes_upload_widget %})
* [File restrictions]({% slug validation_upload_widget %})
* [Metadata]({% slug metadata_upload_widget %})
* [Templates]({% slug templates_upload %})
* [Globalization]({% slug globalization_upload %})
* [Accessibility]({% slug accessibility_upload %})

For more information on the browser versions which support the Upload features, refer to the article on [browser support]({% slug browsersupport_upload_widget %}). For more information on implementing specific scenarios, refer to the [**Knowledge Base** section](https://docs.telerik.com/kendo-ui/knowledge-base).

## Events

For a complete example on the basic Upload events, refer to the [demo on using the events of the Upload](https://demos.telerik.com/kendo-ui/upload/events).

## Referencing Existing Instances

You can access an existing Upload instance by using the `.data()` jQuery method. After the reference is established, use the [JavaScript API reference of the Upload](/api/javascript/ui/upload) to control its behavior.

    var upload = $("#upload").data("kendoUpload");

## See Also

* [Basic Usage of the Upload (Demo)](https://demos.telerik.com/kendo-ui/upload/index)
* [Using the Basic Events of the Upload (Demo)](https://demos.telerik.com/kendo-ui/upload/events)
* [Binding the Upload over MVVM (Demo)](https://demos.telerik.com/kendo-ui/upload/mvvm)
* [Using the Upload with AngularJS Directives (Demo)](https://demos.telerik.com/kendo-ui/upload/angular)
* [Applying the Upload API (Demo)](https://demos.telerik.com/kendo-ui/upload/api)
* [JavaScript API Reference of the Upload](/api/javascript/ui/upload)
