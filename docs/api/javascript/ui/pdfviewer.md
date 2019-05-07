---
title: PDF Viewer
page_title: Configuration, methods and events of Kendo UI Pdf Viewer
description: Display PDF files in the browser.
res_type: api
component: pdfviewer
---

# kendo.ui.PDFViewer

Kendo UI PDF Viewer is used to display a PDF file in the browser. It provides ability to choose the PDF library used for processing. If processing option is set, pdfjs is used for processing. The viewer supports:

* `DPL`
* `PDF.JS`

## Configuration

### dplProcessing `Object`

Specifies the DPL configuration options.

### dplProcessing.read `Object`

Specifies the configuration of the jQuery.ajax to make an HTTP request to the remote service.

### dplProcessing.read.url `String`

Specifies the url to which the request is sent.

### dplProcessing.read.pageField `String` *(default: 'pageNumber')*

Specifies the page field parameter submitted to the read url. It is used in scenario with `loadOnDemand` when requests are sent for each page.

### dplProcessing.read.type `String` *(default: 'GET')*
Specifies the type of the request.

### dplProcessing.read.dataType `String`
The type of result expected from the server. Used values are "json" and "jsonp". The PDFViewer expects a json to render the geometries.

### dplProcessing.upload `Object`
Specifies the configuration of the jQuery.ajax to make an HTTP POST request to the remote service.

### dplProcessing.upload.url `String`
Specifies the url that will receive the submitted file. The handler must accept `POST` requests.

### dplProcessing.upload.saveField `String`
Specifies the name of the form field which is submitted to saveUrl.

### dplProcessing.download `Object`
Specifies the download configuration.

### dplProcessing.download.url `String`
Specifies the download action url  that will be navigated to.

### dplProcessing.loadOnDemand `Boolean` *(default: false)*
Specifies whether read requests should be sent for each page.

### pdfjsProcessing `Object`

Specifies the PDF.JS configuration options.

### pdfjsProcessing.file `Blob | byte[] | String`

Specifies the default file to be displayed.

### width `Number|String` *(default: 800)*

The selected page number in the viewer.

### height `Number|String` *(default: 1200)*

The selected page number in the viewer.

### page `Number` *(default: 1)*

The selected page number in the viewer.

### view `Object` *(default: 1)*

Defines the page surface options.

### view.type `String` *(default: "canvas")*

Defines the surface type. It accepts `canvas` or `svg`. This option is supported only for DPL.

#### Example - customizing the type of pages' surfaces

    <div id="pdf-viewer"></div>
    <script>
        $("#pdfviewer").kendoPdfViewer({
            view: {
              type: "svg"
            }
        });
    </script>

### toolbar `Boolean|Object` *(default: true)*

Toolbar option accepts a Boolean value which indicates if the toolbar will be displayed or an Object with `items`.

### toolbar.items `Array`

The following list indicates the default tools:

* `pager`
* `open`
* `download`

#### Example - customizing the toolbar items

    <div id="pdf-viewer"></div>
    <script>
        $("#pdfviewer").kendoPdfViewer({
            toolbar: {
                items: [
                  "pager", "spacer", "open", "download", "exportAs"
                ]
            }
        });
    </script>

### toolbar.items.type `String`

### toolbar.items.overflow `String`

### toolbar.items.command `String`

### toolbar.items.click `Function`

### messages `Object`

Specifies the localization messages of the PDFViewer.

### messages.defaultFileName `String` *(default: "Document")*

Specifies the default file name used for `Download`.

### messages.toolbar `Object`
Specifies the localization messages of the toolbar.

### messages.toolbar.open `String`  *(default: "Open")*
### messages.toolbar.exportAs `String`  *(default: "Export")*
### messages.toolbar.download `String` *(default: "Download")*
### messages.toolbar.pager `Object`
### messages.toolbar.pager.first `String`  *(default: "Go to the first page")*
### messages.toolbar.pager.previous `String` *(default: "Go to the previous page")*
### messages.toolbar.pager.next `String` *(default: "Go to the next page")*
### messages.toolbar.pager.last `String` *(default: "Go to the last page")*
### messages.toolbar.pager.of `String` *(default: " of {0} ")*
### messages.toolbar.pager.page `String` *(default: "page")*
### messages.toolbar.pager.pages `String` *(default: "pages")*
### messages.errorMessages `Object`
### messages.errorMessages.notSupported  `String` *(default: "pages")*
### messages.errorMessages.parseError  `String` *(default: "pages")*
### messages.dialogs `Object`
### messages.dialogs.exportAsDialog `Object`
### messages.dialogs.exportAsDialog.title `String` *(default: "pages")*
### messages.dialogs.exportAsDialog.defaultFileName `String` *(default: "pages")*
### messages.dialogs.exportAsDialog.pdf `String` *(default: "Portable Document Format (.pdf)")*
### messages.dialogs.exportAsDialog.png `String` *(default: "Portable Network Graphics (.png)")*
### messages.dialogs.exportAsDialog.svg `String` *(default: "Scalable Vector Graphics (.svg)")*
### messages.dialogs.exportAsDialog.labels `Object`
### messages.dialogs.exportAsDialog.labels.fileName `String`  *(default: "File name")*
### messages.dialogs.exportAsDialog.labels.saveAsType `String`  *(default: "Save as")*
### messages.dialogs.exportAsDialog.labels.page `String`  *(default: "Page")*
### messages.dialogs.okText `String`  *(default: "OK")*
### messages.dialogs.save `String`  *(default: "Save")*
### messages.dialogs.cancel `String`  *(default: "Cancel")*

## Methods

### fromFile

### activatePage

### setOptions

### destroy

## Events

### render

### open

### error
