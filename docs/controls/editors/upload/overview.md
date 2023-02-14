---
title: Overview
page_title: jQuery Upload Documentation - Upload Overview
description: "Try now the Kendo UI for jQuery Upload component covering everything from operation modes and templates to file processing and dragging and dropping."
slug: overview_kendoui_upload_widget
position: 1
---

# {{ site.product }} Upload Overview

The Upload uses progressive enhancement to deliver the best possible uploading experience to users, without requiring extra developer efforts.

The Upload provides a set of [default API configuration options](/api/javascript/ui/upload) that you can set during its initialization, for example, synchronous and asynchronous modes of operation, chunk upload of files, multiple files selection and removal, progress tracking and in-progress cancellation of the upload, and so on.

> * The Upload does not currently support the upload of large files in chunks because the feature requires an additional Flash or Silverlight plugin to compensate for the missing API support in older browsers.
> * The Upload works in `<input type="file" />` elements. Therefore, you can only upload files that are selected and exist in the file system. To upload files that are generated with JavaScript on the fly use Ajax requests.

* [Demo page for the Upload](https://demos.telerik.com/kendo-ui/upload/index)

## Functionality and Features

| Feature                                                               |Definition
| :---                                                                  |:---
| [Dragging and dropping]({% slug dragandrop_upload_widget %})          |You can select files for upload by dragging and dropping them over the component.
| [File processing]({% slug chunkupload_upload_widget %})               |The Upload enables you to persist the initially selected files as well as upload batches of files and files that are selected through multiple requests.
| [Modes of operation]({% slug modes_upload_widget %})                  |The Upload can work in a synchronous and asynchronous mode.
| [File restrictions]({% slug validation_upload_widget %})              |You can also use the Upload to validate the files selected for upload in terms of their extension and size.
| [Templates]({% slug templates_upload %})                              |The Upload enables you to use templates for rendering its content and layout. 
| [Globalization]({% slug globalization_upload %})                      |The Upload supports globalization to ensure that it can fit well in any application, no matter what [languages and locales]({% slug localization_upload %}) need to be supported. Additionally, the Upload supports [rendering in a right-to-left (RTL) direction]({% slug rtl_upload %}).
| [Accessibility]({% slug accessibility_upload %})                      |The Upload is accessible for screen readers, supports WAI-ARIA attributes, and delivers [keyboard shortcuts for faster navigation]({% slug keynav_upload %}).

## Next Steps

* [Getting Started with the Kendo UI Upload for jQuery]({% slug getting_started_kendoui_upload_widget %})
* [Basic Usage of the Upload (Demo)](https://demos.telerik.com/kendo-ui/upload/index)
* [JavaScript API Reference of the Upload](/api/javascript/ui/upload)
* [Browser Support]({% slug browsersupport_upload_widget %})

## See Also

* [Basic Usage of the Upload (Demo)](https://demos.telerik.com/kendo-ui/upload/index)
* [Using the Basic Events of the Upload (Demo)](https://demos.telerik.com/kendo-ui/upload/events)
* [Binding the Upload over MVVM (Demo)](https://demos.telerik.com/kendo-ui/upload/mvvm)
* [Using the Upload with AngularJS Directives (Demo)](https://demos.telerik.com/kendo-ui/upload/angular)
* [Applying the Upload API (Demo)](https://demos.telerik.com/kendo-ui/upload/api)
* [JavaScript API Reference of the Upload](/api/javascript/ui/upload)
