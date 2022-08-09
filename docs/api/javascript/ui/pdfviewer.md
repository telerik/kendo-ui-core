---
title: PDF Viewer
page_title: Configuration, methods and events of Kendo UI PDF Viewer
description: Display PDF files in the browser.
res_type: api
component: pdfviewer
---

# kendo.ui.PDFViewer

Kendo UI PDFViewer is used to display a PDF file in the browser. It provides ability to choose the PDF library used for processing. If processing option is not set, pdfjs is used for processing. The viewer supports:

* `PDF.JS`
* `DPL`

## Configuration

### pdfjsProcessing `Object`

Specifies the PDF.JS configuration options. Including `pdfjs` is mandatory.

#### Example

    <div id="pdfviewer"></div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.js"></script>
    <script>
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.worker.js';
    </script>
    <script>
        $("#pdfviewer").kendoPDFViewer({
            pdfjsProcessing: {
                file: ""
            }
        });
    </script>

### pdfjsProcessing.file `Object | String` *default: ""*

Specifies the default file to be displayed.

#### Example

    <div id="pdfviewer"></div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.js"></script>
    <script>
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.worker.js';
    </script>
    <script>
        $("#pdfviewer").kendoPDFViewer({
            pdfjsProcessing: {
                file: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
            }
        });
    </script>

### pdfjsProcessing.file.cMapUrl `String`

Specifies the the URL where the predefined Adobe CMaps are located. Further info in [the PDF.js API ref](https://github.com/mozilla/pdf.js/blob/master/src/display/api.js#L117).

### pdfjsProcessing.file.cMapPacked `Boolean`

Specifies if the Adobe CMaps are binary packed. Further info in [the PDF.js API ref](https://github.com/mozilla/pdf.js/blob/master/src/display/api.js#L119).

### pdfjsProcessing.file.data `Blob | byte[] | String`

Specifies the `data` to be passed to the pdfjs processor. Accepts `blob`, `byte` array or `base64` string.

#### Example

    <div id="pdfViewer"></div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.js"></script>
    <script>
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.worker.js';
    </script>
    <script>
        var request = new XMLHttpRequest();
        request.open('GET', "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf", true);
        request.responseType = 'blob';
        request.onload = function() {
            var reader = new FileReader();
            reader.readAsDataURL(request.response);
            reader.onload =  function(e){
                $("#pdfViewer").kendoPDFViewer({
                    pdfjsProcessing: {
                        file: {
                            //retain the base64 data
                            data: e.target.result.split(",")[1]
                        }
                    },
                    width: "100%",
                    height: 1200
                }).getKendoPDFViewer();
            };
        };
        request.send();
    </script>

### pdfjsProcessing.file.url `String`

Specifies the url to be passed to the pdfjs processor.

#### Example

    <div id="pdfviewer"></div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.js"></script>
    <script>
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.worker.js';
    </script>
    <script>
        $("#pdfviewer").kendoPDFViewer({
            pdfjsProcessing: {
                file: {
                    url: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
                }
            }
        });
    </script>

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

### dplProcessing.upload.saveField `String` *(default: 'file')*
Specifies the name of the form field which is submitted to saveUrl.

### dplProcessing.download `Object`
Specifies the download configuration.

### dplProcessing.download.url `String`
Specifies the download action url  that will be navigated to.

### dplProcessing.loadOnDemand `Boolean` *(default: false)*
Specifies whether read requests should be sent for each page. Note that on the server the `pageField` should be nullable.

### width `Number|String` *(default: 1000)*

The width of the PDFViewer.

#### Example - customizing the width of the viewer

    <div id="pdf-viewer"></div>
    <script>
        $("#pdfviewer").kendoPDFViewer({
            width: 480
        });
    </script>

### height `Number|String` *(default: 1200)*

The height of the PDFViewer.

#### Example - customizing the height of the viewer

    <div id="pdf-viewer"></div>
    <script>
        $("#pdf-viewer").kendoPDFViewer({
            height: 800
        });
    </script>

### defaultPageSize `Object`

Specifies the default page size if no PDF is displayed in the PDFViewer. The page size will shrink to fit the viewer dimensions.

#### Example - customizing the default page sizes

    <div id="pdf-viewer"></div>
    <script>
        $("#pdf-viewer").kendoPDFViewer({
            defaultPageSize: {
                width: 595,
                height: 842
            }
        });
    </script>

### defaultPageSize.width `Number` *(default: 794)*

### defaultPageSize.height `Number` *(default: 1123)*

### page `Number` *(default: 1)*

The selected page number in the viewer.

### scale `Number`

Specifies the default scale of the pages.

#### Example - customizing the scale

    <div id="pdf-viewer"></div>
    <script>
        $("#pdf-viewer").kendoPDFViewer({
            pdfjsProcessing: {
                file: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
            },
            scale: 1.5
        });
    </script>

### zoomMin `Number` *(default: 0.5)*

Specifies the minimum zoom that could be applied to the pages.

#### Example - customizing the zoomMin

    <div id="pdf-viewer"></div>
    <script>
        $("#pdf-viewer").kendoPDFViewer({
            pdfjsProcessing: {
                file: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
            },
            zoomMin: 1
        });
    </script>

### zoomMax `Number` *(default: 4)*

Specifies the maximum zoom that could be applied to the pages.

#### Example - customizing the zoomMax

    <div id="pdf-viewer"></div>
    <script>
        $("#pdf-viewer").kendoPDFViewer({
            pdfjsProcessing: {
                file: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
            },
            zoomMin: 2
        });
    </script>

### zoomRate `Number` *(default: 0.25)*

Specifies the zoom rate that could be applied to the pages. Used when zooming on `mousewheel` and for the `zoomIn` and `zoomOut` tools.

#### Example - customizing the zoomRate

    <div id="pdf-viewer"></div>
    <script>
        $("#pdf-viewer").kendoPDFViewer({
            pdfjsProcessing: {
                file: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
            },
            zoomRate: 0.5
        });
    </script>

### view `Object`

Defines the page surface options. This setting is available only for DPL Processing. The page render a drawing [Surface](/api/javascript/drawing/surface) and all of its configuration options could be defined.

### view.type `String` *(default: "canvas")*

Defines the surface type. It accepts `canvas` or `svg`. This option is supported only for DPL.

#### Example - customizing the type of pages' surfaces

    <div id="pdf-viewer"></div>
    <script>
        $("#pdf-viewer").kendoPDFViewer({
            view: {
              type: "svg"
            }
            // dplProcessing settings
        });
    </script>

### toolbar `Boolean|Object` *(default: true)*

Toolbar option accepts a Boolean value which indicates if the toolbar will be displayed or an Object with `items`. Inherits [Kendo UI Toolbar](/api/javascript/ui/toolbar).

### toolbar.items `Array`

The following list indicates the default tools:

* `pager`
* `zoom`
* `toggleSelection`
* `search`
* `open`
* `download`
* `print`

For DPL Processing `exportAs` tool could be configured to export a single page to `.png` or `.svg`.

#### Example - customizing the toolbar items

    <div id="pdf-viewer"></div>
    <script>
        $("#pdf-viewer").kendoPDFViewer({
            toolbar: {
                items: [
                  "pager", "spacer", "open", "download"
                ]
            }
        });
    </script>


#### Example - customizing the pager default tool

    <div id="pdf-viewer"></div>
    <script>
        $("#pdf-viewer").kendoPDFViewer({
            toolbar: {
                items: [
                  { type: "pager", input: false, previousNext: true, command: "PageChangeCommand"}
                ]
            }
        });
    </script>

#### Example - customizing the zoom default tool

    <div id="pdf-viewer"></div>
    <script>
        $("#pdf-viewer").kendoPDFViewer({
            toolbar: {
                items: [
                  { type: "zoom", zoomInOut: true, combobox: { zoomLevels: [50, 100, 200]}, command: "ZoomCommand"}
                ]
            }
        });
    </script>

### toolbar.items.type `String`

### toolbar.items.overflow `String`

### toolbar.items.command `String`

Default commands in the PDF Viewer are:

* `OpenCommand`
* `PageChangeCommand`
* `DownloadCommand`
* `EnableSelectionCommand`
* `EnablePanCommand`
* `ExportCommand`
* `PrintCommand`
* `OpenSearchCommand`
* `ZoomCommand`

### toolbar.items.name `String`
Specifies the tool's name. Tool definition will be taken from the default collection - `kendo.pdfviewer.DefaultTools`

### toolbar.items.click `Function`
Specifies the click event handler of the button.

### toolbar.items.toggle `Function`
Specifies the toggle event handler of the button. Applicable only for commands of type `button` and `togglable: true`.

### toolbar.items.togglable `Boolean` *(default: false)*
Specifies if the button is togglable, e.g. has a selected and unselected state.

### toolbar.items.text `String`
Sets the text of the button.

### toolbar.items.template `String|Function`
Specifies what element will be added in the ToolBar wrapper. Items with template does not have a type.

#### Example

    <div id="pdf-viewer"></div>
    <script>
      $("#pdf-viewer").kendoPDFViewer({
        toolbar: {
          items: [            
            {
              name: "myCustomTool",
              template: "<button>My custom button </button>"
            }
          ]
        }  
      });     
    </script>

### toolbar.items.showText `String` *(default: "both")*
Specifies where the text will be displayed. Possible values are: "toolbar", "overflow" or "both" (default).

### toolbar.items.primary `Boolean` *(default: false)*
Specifies whether the button is primary. Primary buttons receive different styling.

### toolbar.items.attributes `Object`
Specifies the HTML attributes of a ToolBar button.

### toolbar.items.enable `Boolean` *(default: true)*
Specifies whether the control is initially enabled or disabled. Default value is "true".

### toolbar.items.hidden `Boolean` *(default: false)*
Determines if a button is visible or hidden. By default buttons are visible.

### toolbar.items.spriteCssClass `String`
Defines a CSS class (or multiple classes separated by spaces) which will be used for button icon.

### toolbar.items.imageUrl `String`
If set, the ToolBar will render an image with the specified URL in the button.

### toolbar.items.showIcon `String` *(default: "both")*
Specifies where the button icon will be displayed. Possible values are: "toolbar", "overflow" or "both" (default).

### toolbar.items.icon `String`
Sets icon for the item. The icon should be one of the existing in the Kendo UI theme sprite.

### toolbar.items.id `String`
Specifies the ID of the button.

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

### messages.errorMessages.notSupported  `String` *(default: "Only pdf files allowed.")*

### messages.errorMessages.parseError  `String` *(default: "PDF file fails to process.")*

### messages.errorMessages.notFound  `String` *(default: "File is not found.")*

### messages.dialogs `Object`

### messages.dialogs.exportAsDialog `Object`

### messages.dialogs.exportAsDialog.title `String` *(default: "Export...")*

### messages.dialogs.exportAsDialog.defaultFileName `String` *(default: "Document")*

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
Displays the file passed as a parameter in the PDFViewer. Currently, supported only for PDFJS Processing.

> To run the below example, open it in Dojo

#### Example
        <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.js"></script>
        <script>
            window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.worker.js';
        </script>

        <div id="example">
            <div class="box">
                <div class="box-col">
                    <h4>Load File</h4>
                    <ul class="options">
                        <li>
                            <button class="k-button" id="loadFile" type="button">Load</button>
                        </li>
                    </ul>
                </div>
            </div>
            <div id="pdfViewer">
            </div>
        </div>

        <script>
            $(document).ready(function () {

                var pdfViewer = $("#pdfViewer").kendoPDFViewer({
                    pdfjsProcessing: {
                        file: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"     },
                    width: "100%",
                    height: 700
                }).data("kendoPDFViewer");

                $("#loadFile").click(function () {
                    pdfViewer.fromFile("https://demos.telerik.com/kendo-ui/content/web/pdfViewer/How Does Kendo UI Cut Development Time.pdf")
                });
            });
        </script>

### activatePage
Loads and scrolls to the page by number.

> To run the below example, open it in Dojo

#### Example
        <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.js"></script>
        <script>
            window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.worker.js';
        </script>

        <div id="example">
            <div class="box">
                <div class="box-col">
                    <h4>Change page</h4>
                    <ul class="options">
                        <li>
                            <input id="numeric" type="number" title="numeric" value="17" min="1" max="3" step="1" style="width: 100%;" />
                        </li>
                    </ul>
                </div>
            </div>
            <div id="pdfViewer">
            </div>
        </div>

        <script>
            $(document).ready(function () {
                var numeric = $("#numeric").kendoNumericTextBox({
                    change: onChange,
                    spin: onSpin,
                    format: "n0",
                    value: 1
                }).data("kendoNumericTextBox");

                var pdfViewer = $("#pdfViewer").kendoPDFViewer({
                    pdfjsProcessing: {
                        file: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
                    },
                    width: "100%",
                    height: 700
                }).data("kendoPDFViewer");


                function onChange(e) {
                    var value = this.value();
                    changePdfViewerPage(value)
                }

                function onSpin(e) {
                    var value = this.value();
                    changePdfViewerPage(value)
                }

                function changePdfViewerPage(value) {
                    pdfViewer.activatePage(value);
                }
            });
        </script>

### loadPage
Renders page canvas by number

> To run the below example, open it in Dojo

#### Example

        <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.js"></script>
            <script>
            window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.worker.js';
            </script>

            <div id="example">
            <button id="btn">Load 3rd page of the current document</button>
            <br/><br/>
            <div id="pdfViewer">
            </div>
            </div>

            <script>
            $(document).ready(function () {
                var button = $("#btn").kendoButton({
                click: onChange,
                }).data("kendoButton");

                var pdfViewer = $("#pdfViewer").kendoPDFViewer({
                pdfjsProcessing: {
                    file: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
                },
                width: "100%",
                height: 700
                }).data("kendoPDFViewer");


                function onChange(e) {
                pdfViewer.bind("render", function(){
                    var canvas = pdfViewer.pageContainer.find("canvas")[2];

                    $('<div></div>').kendoAlert({
                    content: "<img width ='300' height ='300' src='"+ canvas.toDataURL() +"'/>"
                    }).data("kendoAlert").open();
                })

                pdfViewer.loadPage(3);

                }
            });
            </script>

### execute
Executes a command of the PDFViewer.

> To run the below example, open it in Dojo

#### Example
        <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.js"></script>
        <script>
            window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.worker.js';
        </script>

        <div id="example">

            <input type="button" value="Download" onclick="onDownloadClick()"/>
            <div id="pdfViewer">
            </div>
        </div>

        <script>



            $(document).ready(function () {
                $("#pdfViewer").kendoPDFViewer({
                    pdfjsProcessing: {
                        file: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
                    },
                    width: "100%",
                    height: 1000,
                    toolbar: {
                        items: [
                            "pager",
                            "spacer",
                            "open",
                            "download"
                        ]
                    }
                });
            });

            function onDownloadClick(){
                var pdfViewer = $("#pdfViewer").data("kendoPDFViewer");
                pdfViewer.execute({command:"DownloadCommand"});
            }
        </script>

### setOptions
Update the dimensions of the widget, the active page or the processor.

> To run the below example, open it in Dojo

#### Example
        <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.js"></script>
        <script>
            window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.worker.js';
        </script>

        <div id="example">
            <div class="box">
                <div class="box-col">
                    <ul class="options">
                        <li>
                            <button class="k-button" id="setOptions" type="button">Set the new options</button>
                        </li>
                    </ul>
                </div>
            </div>
            <div id="pdfViewer">
            </div>
        </div>

        <script>
            $(document).ready(function () {

                var pdfViewer = $("#pdfViewer").kendoPDFViewer({
                    pdfjsProcessing: {
                        file: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
                    },
                    width: "100%",
                    height: 700
                }).data("kendoPDFViewer");

                $("#setOptions").click(function () {
                    pdfViewer.setOptions({
                        width: "85%",
                    height: 450
                    })
                });
            });
        </script>

### destroy
Destroys the widget.

> To run the below example, open it in Dojo

#### Example
        <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.js"></script>
        <script>
            window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.worker.js';
        </script>

        <div id="example">
            <div class="box">
                    <ul class="options">
                        <li>
                            <button class="k-button" id="destroyBtn" type="button">Destroy the widget</button>
                        </li>
                    </ul>
            </div>
            <div id="pdfViewer">
            </div>
        </div>

        <script>
            $(document).ready(function () {

                var pdfViewer = $("#pdfViewer").kendoPDFViewer({
                    pdfjsProcessing: {
                        file: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
                    },
                    width: "100%",
                    height: 700
                }).data("kendoPDFViewer");

                $("#destroyBtn").click(function () {
                  console.log('--- Before Destroy ---')
                  console.log($("#pdfViewer").data("kendoPDFViewer"))
                  $("#pdfViewer").data("kendoPDFViewer").destroy();
                  console.log('--- After Destroy ---')
                  console.log($("#pdfViewer").data("kendoPDFViewer"))

                  // The destroy() method will destroy the PDFViewer widget. To remove the rendered component remove or empty the element from      which the widget has been initialized
                  //$("#pdfViewer").remove()
                });
            });
        </script>

## Events

### render

Fires when a page is rendered

#### Event Data

##### e.sender `kendo.ui.PDFViewer`

The widget instance which fired the event.

##### e.page `Object`

The page instance that was rendered.

### open

Fires when a PDF is opened in the viewer.

#### Example

    <div id="pdfviewer"></div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.js"></script>

    <script>
       window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.worker.js';
    </script>

    <script>
       $("#pdfviewer").kendoPDFViewer({
          open: function (e) {
             kendo.alert("file opened: " + e.file.name);
          },
       });
    </script>

#### Event Data

##### e.sender `kendo.ui.PDFViewer`

The widget instance which fired the event.

##### e.file `Object`

The file that will be displayed in the viewer.

### error

Fires when an error is encountered. By default, a dialog is shown with error message. The dialog will not be shown if the event is prevented.

#### Event Data

##### e.sender `kendo.ui.PDFViewer`

The widget instance which fired the event.

##### e.dialog `kendo.ui.Dialog`

The error dialog instance.

##### e.error `Object`

The encountered error. Might show the file or xhr request.

##### e.message `String`

The error message displayed in the dialog.

#### Example

    <div id="pdfviewer"></div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.js"></script>

    <script>
       window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.worker.js';
    </script>

    <script>	
      $("#pdfviewer").kendoPDFViewer({
        pdfjsProcessing: {
          file: "../non-existing-file.pdf"
        },
        error: function (e) {
          console.log("error message: " + e.message);
        }
      });
    </script>
