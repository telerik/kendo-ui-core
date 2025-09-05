---
title: PDF Viewer
page_title: Configuration, methods and events of Kendo UI PDF Viewer
description: Display PDF files in the browser.
res_type: api
component: pdfviewer
include_pdfjs: true
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
    <script type="module">
        $("#pdfviewer").kendoPDFViewer({
            pdfjsProcessing: {
                file: ""
            }
        });
    </script>

### pdfjsProcessing.renderForms `Boolean` *(default: false)*

Enables form filling capabilities by rendering widgets such as:

* TextBox
* CheckBox
* DropDown
* RadioButton
* Button

#### Example

    <div id="pdfviewer"></div>
    <script type="module">
    $("#pdfviewer").kendoPDFViewer({
        pdfjsProcessing: {
            renderForms: true,
            file: ""
        }
    });
    </script>

### pdfjsProcessing.file `Object | String` *default: ""*

Specifies the default file to be displayed.

#### Example

    <div id="pdfviewer"></div>
    <script type="module">
    $("#pdfviewer").kendoPDFViewer({
        pdfjsProcessing: {
            file: {
                url: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
            }
        }
    });
    </script>

### pdfjsProcessing.file.cMapUrl `String`

Specifies the the URL where the predefined Adobe CMaps are located. Further info in [the PDF.js API ref](https://github.com/mozilla/pdf.js/blob/master/src/display/api.js#L117).

#### Example

    <div id="pdfviewer"></div>
    <script type="module">
    $("#pdfviewer").kendoPDFViewer({
        pdfjsProcessing: {
            file: {
                cMapUrl: "https://cdn.jsdelivr.net/npm/pdfjs-dist@3.4.120/cmaps/",
                url: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
            }
        }
    });
    </script>

### pdfjsProcessing.file.cMapPacked `Boolean`

Specifies if the Adobe CMaps are binary packed. Further info in [the PDF.js API ref](https://github.com/mozilla/pdf.js/blob/master/src/display/api.js#L119).

#### Example

    <div id="pdfviewer"></div>
    <script type="module">
    $("#pdfviewer").kendoPDFViewer({
        pdfjsProcessing: {
            file: {
                cMapPacked: true,
                url: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
            }
        }
    });
    </script>

### pdfjsProcessing.file.data `Blob | byte[] | String`

Specifies the `data` to be passed to the pdfjs processor. Accepts `blob`, `byte` array or `base64` string.

#### Example

    <div id="pdfViewer"></div>
    <script type="module">
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
    <script type="module">
        $("#pdfviewer").kendoPDFViewer({
            pdfjsProcessing: {
                file: {
                    url: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
                }
            }
        });
    </script>

### dplProcessing `Object`

Specifies the DPL configuration options. For a complete demo and a backend implementation, check the <a href="https://demos.telerik.com/aspnet-core/pdfviewer/dpl-processing" target="_blank">Telerik UI for ASP.NET Core DPL Processing demo</a>.

#### Example

```pseudo
    <div id="pdfviewer"></div>
    <script type="module">
        $("#pdfviewer").kendoPDFViewer({
            dplProcessing: {
                read: {
                    url: ""
                },
                download: {
                    url: ""
                },
                upload: {
                    url: ""
                }
            },
            toolbar: {
                items: [
                    "pager", "spacer", "open", "download"
                ]
            }
        });
    </script>
```

### dplProcessing.read `Object`

Specifies the configuration of the jQuery.ajax to make an HTTP request to the remote service.

#### Example

```pseudo
    <div id="pdfviewer"></div>
    <script type="module">
    $("#pdfviewer").kendoPDFViewer({
        dplProcessing: {
            read: {
                url: "/api/pdfviewer/read",
                type: "POST",
                dataType: "json"
            }
        }
    });
    </script>
```

### dplProcessing.read.url `String`

Specifies the url to which the request is sent.

#### Example

```pseudo
    <div id="pdfviewer"></div>
    <script type="module">
    $("#pdfviewer").kendoPDFViewer({
        dplProcessing: {
            read: {
                url: "/api/pdfviewer/documents/read"
            }
        }
    });
    </script>
```

### dplProcessing.read.pageField `String` *(default: 'pageNumber')*

Specifies the page field parameter submitted to the read url. It is used in scenario with `loadOnDemand` when requests are sent for each page.

#### Example

```pseudo
    <div id="pdfviewer"></div>
    <script type="module">
    $("#pdfviewer").kendoPDFViewer({
        dplProcessing: {
            read: {
                url: "/api/pdfviewer/read",
                pageField: "page"
            },
            loadOnDemand: true
        }
    });
    </script>
```

### dplProcessing.read.type `String` *(default: 'GET')*
Specifies the type of the request.

#### Example

```pseudo
    <div id="pdfviewer"></div>
    <script type="module">
    $("#pdfviewer").kendoPDFViewer({
        dplProcessing: {
            read: {
                url: "/api/pdfviewer/read",
                type: "POST"
            }
        }
    });
    </script>
```

### dplProcessing.read.dataType `String`
The type of result expected from the server. Used values are "json" and "jsonp". The PDFViewer expects a json to render the geometries.

#### Example

```pseudo
    <div id="pdfviewer"></div>
    <script type="module">
    $("#pdfviewer").kendoPDFViewer({
        dplProcessing: {
            read: {
                url: "/api/pdfviewer/read",
                dataType: "json"
            }
        }
    });
    </script>
```

### dplProcessing.upload `Object`
Specifies the configuration of the jQuery.ajax to make an HTTP POST request to the remote service.

#### Example

```psuedo
    <div id="pdfviewer"></div>
    <script type="module">
    $("#pdfviewer").kendoPDFViewer({
        dplProcessing: {
            upload: {
                url: "/api/pdfviewer/upload",
                saveField: "document"
            }
        }
    });
    </script>
```

### dplProcessing.upload.url `String`
Specifies the url that will receive the submitted file. The handler must accept `POST` requests.

#### Example

```psuedo
    <div id="pdfviewer"></div>
    <script type="module">
    $("#pdfviewer").kendoPDFViewer({
        dplProcessing: {
            upload: {
                url: "/api/pdfviewer/documents/upload"
            }
        }
    });
    </script>
```

### dplProcessing.upload.saveField `String` *(default: 'file')*
Specifies the name of the form field which is submitted to saveUrl.

#### Example

```psuedo
    <div id="pdfviewer"></div>
    <script type="module">
    $("#pdfviewer").kendoPDFViewer({
        dplProcessing: {
            upload: {
                url: "/api/pdfviewer/upload",
                saveField: "pdfFile"
            }
        }
    });
    </script>
```

### dplProcessing.download `Object`
Specifies the download configuration.

#### Example

```pseudo
    <div id="pdfviewer"></div>
    <script type="module">
    $("#pdfviewer").kendoPDFViewer({
        dplProcessing: {
            download: {
                url: "/api/pdfviewer/download"
            }
        }
    });
    </script>
```

### dplProcessing.download.url `String`
Specifies the download action url  that will be navigated to.

#### Example

```psuedo
    <div id="pdfviewer"></div>
    <script type="module">
    $("#pdfviewer").kendoPDFViewer({
        dplProcessing: {
            download: {
                url: "/api/pdfviewer/documents/download"
            }
        }
    });
    </script>
```

### dplProcessing.loadOnDemand `Boolean` *(default: false)*
Specifies whether read requests should be sent for each page. Note that on the server the `pageField` should be nullable.

#### Example

```pseudo
    <div id="pdfviewer"></div>
    <script type="module">
    $("#pdfviewer").kendoPDFViewer({
        dplProcessing: {
            read: {
                url: "/api/pdfviewer/read",
                pageField: "pageNumber"
            },
            loadOnDemand: true
        }
    });
    </script>
```

### width `Number|String` *(default: 1000)*

The width of the PDFViewer.

#### Example - customizing the width of the viewer

    <div id="pdf-viewer"></div>
    <script type="module">
        $("#pdf-viewer").kendoPDFViewer({
            width: 480
        });
    </script>

### height `Number|String` *(default: 1200)*

The height of the PDFViewer.

#### Example - customizing the height of the viewer

    <div id="pdf-viewer"></div>
    <script type="module">
        $("#pdf-viewer").kendoPDFViewer({
            height: 800
        });
    </script>

### defaultPageSize `Object`

Specifies the default page size if no PDF is displayed in the PDFViewer. The page size will shrink to fit the viewer dimensions.

#### Example - customizing the default page sizes

    <div id="pdf-viewer"></div>
    <script type="module">
        $("#pdf-viewer").kendoPDFViewer({
            defaultPageSize: {
                width: 595,
                height: 842
            }
        });
    </script>

### defaultPageSize.width `Number` *(default: 794)*

Specifies the default width in pixels for PDF pages when no document is loaded. The page will be automatically scaled to fit the viewer's dimensions while maintaining aspect ratio.

#### Example

    <div id="pdfviewer"></div>
    <script type="module">
    $("#pdfviewer").kendoPDFViewer({
        defaultPageSize: {
            width: 600
        },
        pdfjsProcessing: {
            file: {
                url: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
            }
        }
    });
    </script>

### defaultPageSize.height `Number` *(default: 1123)*

Specifies the default height in pixels for PDF pages when no document is loaded. The page will be automatically scaled to fit the viewer's dimensions while maintaining aspect ratio.

#### Example

    <div id="pdfviewer"></div>
    <script type="module">
    $("#pdfviewer").kendoPDFViewer({
        defaultPageSize: {
            height: 900
        },
        pdfjsProcessing: {
            file: {
                url: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
            }
        }
    });
    </script>

### page `Number` *(default: 1)*

The selected page number in the viewer.

#### Example

    <div id="pdfviewer"></div>
    <script type="module">
    $("#pdfviewer").kendoPDFViewer({
        page: 3,
        pdfjsProcessing: {
            file: {
                url: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
            }
        }
    });
    </script>

### scale `Number`

Specifies the default scale of the pages.

#### Example - customizing the scale

    <div id="pdf-viewer"></div>
    <script type="module">
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
    <script type="module">
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
    <script type="module">
         $("#pdf-viewer").kendoPDFViewer({
            pdfjsProcessing: {
                file: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
            },
            zoomMax: 2
        });
    </script>

### zoomRate `Number` *(default: 0.25)*

Specifies the zoom rate that could be applied to the pages. Used when zooming on `mousewheel` and for the `zoomIn` and `zoomOut` tools.

#### Example - customizing the zoomRate

    <div id="pdf-viewer"></div>
    <script type="module">
         $("#pdf-viewer").kendoPDFViewer({
            pdfjsProcessing: {
                file: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
            },
            zoomMax: 2
        });
    </script>

### view `Object`

Defines the page surface options. This setting is available only for DPL Processing. The page render a drawing [Surface](/api/javascript/drawing/surface) and all of its configuration options could be defined.

#### Example

```pseudo
    <div id="pdfviewer"></div>
    <script type="module">
    $("#pdfviewer").kendoPDFViewer({
        view: {
            type: "svg"
        },
        dplProcessing: {
            read: {
                url: "/api/pdfviewer/read"
            }
        }
    });
    </script>
```

### view.type `String` *(default: "canvas")*

Defines the surface type. It accepts `canvas` or `svg`. This option is supported only for DPL.

#### Example - customizing the type of pages' surfaces

    <div id="pdf-viewer"></div>
    <script type="module">
        $("#pdf-viewer").kendoPDFViewer({
            view: {
              type: "svg"
            }
            // dplProcessing settings
        });
    </script>

### toolbar `Boolean|Object` *(default: true)*

Toolbar option accepts a Boolean value which indicates if the toolbar will be displayed or an Object with `items` and `overflow` configuration. Inherits [Kendo UI Toolbar](/api/javascript/ui/toolbar).

#### Example

    <div id="pdfviewer"></div>
    <script type="module">
    $("#pdfviewer").kendoPDFViewer({
        toolbar: {
            items: ["pager", "spacer", "open", "download"],
            contextMenu: false
        },
        pdfjsProcessing: {
            file: {
                url: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
            }
        }
    });
    </script>

### toolbar.contextMenu `Boolean` *(default: false)*

When this option is set to true, the toolbar will render a dropdown button as its first item. The dropdown will contain the `open`, `download` and `print` tools instead of them being rendered on the right-side of the toolbar.

#### Example

    <div id="pdfviewer"></div>
    <script type="module">
    $("#pdfviewer").kendoPDFViewer({
        toolbar: {
            contextMenu: true
        },
        pdfjsProcessing: {
            file: {
                url: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
            }
        }
    });
    </script>

### toolbar.items `Array`

The following list indicates the default tools:

* `pager`
* `zoomInOut`
* `zoom`
* `toggleSelection`
* `search`
* `open`
* `download`
* `print`
* `annotations`

For DPL Processing `exportAs` tool could be configured to export a single page to `.png` or `.svg`.

#### Example - customizing the toolbar items

    <div id="pdf-viewer"></div>
    <script type="module">
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
    <script type="module">
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
    <script type="module">
        $("#pdf-viewer").kendoPDFViewer({
            toolbar: {
                items: [
                  { type: "zoom", combobox: { zoomLevels: [50, 100, 200]}, command: "ZoomCommand"}
                ]
            }
        });
    </script>

Apart from the built-in tools, the PDFViewer fully exposes the [ToolBar.items API](/api/javascript/ui/toolbar/configuration/items). This way you can specify any custom tools in the widget using the components available in the ToolBar itself.

### toolbar.items.type `String`

Specifies the type of toolbar item to be rendered. Supported types include `button`, `separator`, `spacer`, `splitButton`, `buttonGroup`, and `template` as defined by the ToolBar component.

#### Example

    <div id="pdfviewer"></div>
    <script type="module">
    $("#pdfviewer").kendoPDFViewer({
        toolbar: {
            items: [
                { type: "button", text: "Custom Action" },
                { type: "separator" },
                "pager"
            ]
        },
        pdfjsProcessing: {
            file: {
                url: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
            }
        }
    });
    </script>

### toolbar.items.overflow `String`

Specifies the overflow behavior of the toolbar item. Accepts `auto`, `never`, or `always` to control when the item appears in the toolbar's overflow menu.

#### Example

    <div id="pdfviewer"></div>
    <script type="module">
    $("#pdfviewer").kendoPDFViewer({
        toolbar: {
            items: [
                { type: "button", text: "Custom", overflow: "always" },
                "pager"
            ]
        },
        pdfjsProcessing: {
            file: {
                url: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
            }
        }
    });
    </script>

### toolbar.items.command `String`

Default commands in the PDF Viewer are:

* `OpenCommand`
* `PageChangeCommand`
* `DownloadCommand`
* `EnableSelectionCommand`
* `EnablePanCommand`
* `ExportCommand`

#### Example

    <div id="pdfviewer"></div>
    <script type="module">
    $("#pdfviewer").kendoPDFViewer({
        toolbar: {
            items: [
                { type: "pager", command: "PageChangeCommand" },
                { type: "button", text: "Download", command: "DownloadCommand" }
            ]
        },
        pdfjsProcessing: {
            file: {
                url: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
            }
        }
    });
    </script>
* `PrintCommand`
* `OpenSearchCommand`
* `ZoomCommand`

### toolbar.items.name `String`
Specifies the tool's name. Tool definition will be taken from the default collection - `kendo.pdfviewer.DefaultTools`

#### Example

    <div id="pdfviewer"></div>
    <script type="module">
    $("#pdfviewer").kendoPDFViewer({
        toolbar: {
            items: [
                { name: "pager" },
                { name: "zoom" },
                { name: "open" }
            ]
        },
        pdfjsProcessing: {
            file: {
                url: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
            }
        }
    });
    </script>

### toolbar.items.click `Function`
Specifies the click event handler of the button.

#### Example

    <div id="pdfviewer"></div>
    <script type="module">
    $("#pdfviewer").kendoPDFViewer({
        toolbar: {
            items: [
                {
                    type: "button",
                    text: "Custom",
                    click: function(e) {
                        console.log("Custom button clicked");
                    }
                },
                "pager"
            ]
        },
        pdfjsProcessing: {
            file: {
                url: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
            }
        }
    });
    </script>

### toolbar.items.toggle `Function`
Specifies the toggle event handler of the button. Applicable only for commands of type `button` and `togglable: true`.

#### Example

    <div id="pdfviewer"></div>
    <script type="module">
    $("#pdfviewer").kendoPDFViewer({
        toolbar: {
            items: [
                {
                    type: "button",
                    text: "Toggle",
                    togglable: true,
                    toggle: function(e) {
                        console.log("Toggle state: " + e.checked);
                    }
                },
                "pager"
            ]
        },
        pdfjsProcessing: {
            file: {
                url: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
            }
        }
    });
    </script>

### toolbar.items.togglable `Boolean` *(default: false)*
Specifies if the button is togglable, e.g. has a selected and unselected state.

#### Example

    <div id="pdfviewer"></div>
    <script type="module">
    $("#pdfviewer").kendoPDFViewer({
        toolbar: {
            items: [
                {
                    type: "button",
                    text: "Selection Mode",
                    togglable: true,
                    command: "EnableSelectionCommand"
                },
                "pager"
            ]
        },
        pdfjsProcessing: {
            file: {
                url: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
            }
        }
    });
    </script>

### toolbar.items.text `String`
Sets the text of the button.

#### Example

    <div id="pdfviewer"></div>
    <script type="module">
    $("#pdfviewer").kendoPDFViewer({
        toolbar: {
            items: [
                {
                    type: "button",
                    text: "My Custom Action"
                },
                "pager"
            ]
        },
        pdfjsProcessing: {
            file: {
                url: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
            }
        }
    });
    </script>

### toolbar.items.template `String|Function`
Specifies what element will be added in the ToolBar wrapper. Items with template does not have a type.

#### Example

    <div id="pdf-viewer"></div>
    <script type="module">
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

#### Example

    <div id="pdfviewer"></div>
    <script type="module">
    $("#pdfviewer").kendoPDFViewer({
        toolbar: {
            items: [
                {
                    type: "button",
                    text: "Open File",
                    command: "OpenCommand",
                    showText: "toolbar"
                },
                "pager"
            ]
        },
        pdfjsProcessing: {
            file: {
                url: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
            }
        }
    });
    </script>

### toolbar.items.primary `Boolean` *(default: false)*
Specifies whether the button is primary. Primary buttons receive different styling.

#### Example

    <div id="pdfviewer"></div>
    <script type="module">
    $("#pdfviewer").kendoPDFViewer({
        toolbar: {
            items: [
                {
                    type: "button",
                    text: "Important Action",
                    primary: true
                },
                "pager"
            ]
        },
        pdfjsProcessing: {
            file: {
                url: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
            }
        }
    });
    </script>

### toolbar.items.attributes `Object`
Specifies the HTML attributes of a ToolBar button.

#### Example

    <div id="pdfviewer"></div>
    <script type="module">
    $("#pdfviewer").kendoPDFViewer({
        toolbar: {
            items: [
                {
                    type: "button",
                    text: "Custom",
                    attributes: {
                        "data-action": "custom",
                        "title": "Custom Action"
                    }
                },
                "pager"
            ]
        },
        pdfjsProcessing: {
            file: {
                url: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
            }
        }
    });
    </script>

### toolbar.items.enable `Boolean` *(default: true)*
Specifies whether the control is initially enabled or disabled. Default value is "true".

#### Example

    <div id="pdfviewer"></div>
    <script type="module">
    $("#pdfviewer").kendoPDFViewer({
        toolbar: {
            items: [
                {
                    type: "button",
                    text: "Disabled",
                    enable: false
                },
                "pager"
            ]
        },
        pdfjsProcessing: {
            file: {
                url: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
            }
        }
    });
    </script>

### toolbar.items.hidden `Boolean` *(default: false)*
Determines if a button is visible or hidden. By default buttons are visible.

#### Example

    <div id="pdfviewer"></div>
    <script type="module">
    $("#pdfviewer").kendoPDFViewer({
        toolbar: {
            items: [
                {
                    type: "button",
                    text: "Hidden Button",
                    hidden: true
                },
                "pager"
            ]
        },
        pdfjsProcessing: {
            file: {
                url: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
            }
        }
    });
    </script>

### toolbar.items.spriteCssClass `String`
Defines a CSS class (or multiple classes separated by spaces) which will be used for button icon.

#### Example

    <div id="pdfviewer"></div>
    <script type="module">
    $("#pdfviewer").kendoPDFViewer({
        toolbar: {
            items: [
                {
                    type: "button",
                    text: "Custom Icon",
                    spriteCssClass: "k-icon k-i-star"
                },
                "pager"
            ]
        },
        pdfjsProcessing: {
            file: {
                url: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
            }
        }
    });
    </script>

### toolbar.items.imageUrl `String`
If set, the ToolBar will render an image with the specified URL in the button.

#### Example

    <div id="pdfviewer"></div>
    <script type="module">
    $("#pdfviewer").kendoPDFViewer({
        toolbar: {
            items: [
                {
                    type: "button",
                    text: "Custom Image",
                    imageUrl: "/content/shared/icons/sports/snowboarding.png"
                },
                "pager"
            ]
        },
        pdfjsProcessing: {
            file: {
                url: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
            }
        }
    });
    </script>

### toolbar.items.showIcon `String` *(default: "both")*
Specifies where the button icon will be displayed. Possible values are: "toolbar", "overflow" or "both" (default).

#### Example

    <div id="pdfviewer"></div>
    <script type="module">
    $("#pdfviewer").kendoPDFViewer({
        toolbar: {
            items: [
                {
                    type: "button",
                    text: "Download",
                    icon: "download",
                    showIcon: "toolbar"
                },
                "pager"
            ]
        },
        pdfjsProcessing: {
            file: {
                url: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
            }
        }
    });
    </script>

### toolbar.items.icon `String`
Sets icon for the item. The icon should be one of the existing in the Kendo UI theme sprite.

#### Example

    <div id="pdfviewer"></div>
    <script type="module">
    $("#pdfviewer").kendoPDFViewer({
        toolbar: {
            items: [
                {
                    type: "button",
                    text: "Print",
                    icon: "print"
                },
                "pager"
            ]
        },
        pdfjsProcessing: {
            file: {
                url: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
            }
        }
    });
    </script>

### toolbar.items.id `String`
Specifies the ID of the button.

#### Example

    <div id="pdfviewer"></div>
    <script type="module">
    $("#pdfviewer").kendoPDFViewer({
        toolbar: {
            items: [
                {
                    type: "button",
                    text: "Custom",
                    id: "my-custom-button"
                },
                "pager"
            ]
        },
        pdfjsProcessing: {
            file: {
                url: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
            }
        }
    });
    </script>

### toolbar.overflow `Object`
Specifies [`Toolbar.overflow`](/api/javascript/ui/toolbar/configuration/overflow) configuration for the toolbar.

#### Example

    <div id="pdfviewer"></div>
    <script type="module">
    $("#pdfviewer").kendoPDFViewer({
        toolbar: {
            overflow: {
                mode: "scroll",
                scrollButtons: "visible"
            }
        },
        pdfjsProcessing: {
            file: {
                url: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
            }
        }
    });
    </script>


### toolbar.overflow.mode `String` *(default: "menu")*

Defines the overflow mode. The available options are:
- `"menu"` — Moves overflowing items into a dropdown menu.
- `"scroll"` — Keeps items visible and enables horizontal scrolling.
- `"section"` — Groups items into collapsible sections.
- `"none"` — Disables overflow handling; items may be cut off.

#### Example

    <div id="pdfviewer"></div>
    <script type="module">
    $("#pdfviewer").kendoPDFViewer({
        toolbar: {
            overflow: {
                mode: "scroll"
            }
        },
        pdfjsProcessing: {
            file: {
                url: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
            }
        }
    });
    </script>


### toolbar.overflow.scrollButtons `String` *(default: "auto")*

Defines the visibility of scroll buttons when `mode` is `"scroll"`. The available options are:
- `"auto"` — Displays scroll buttons only when needed.
- `"hidden"` — Hides the scroll buttons at all times.
- `"visible"` — Always shows the scroll buttons.

#### Example

    <div id="pdfviewer"></div>
    <script type="module">
    $("#pdfviewer").kendoPDFViewer({
        toolbar: {
            overflow: {
                mode: "scroll",
                scrollButtons: "visible"
            }
        },
        pdfjsProcessing: {
            file: {
                url: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
            }
        }
    });
    </script>


### toolbar.overflow.scrollButtonsPosition `String` *(default: "split")*

Defines the placement of scroll buttons. The available options are:
- `"split"` — Scroll buttons appear at both ends of the toolbar.
- `"start"` — Scroll buttons appear only at the start of the toolbar.
- `"end"` — Scroll buttons appear only at the end of the toolbar.

#### Example

    <div id="pdfviewer"></div>
    <script type="module">
    $("#pdfviewer").kendoPDFViewer({
        toolbar: {
            overflow: {
                mode: "scroll",
                scrollButtonsPosition: "end"
            }
        },
        pdfjsProcessing: {
            file: {
                url: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
            }
        }
    });
    </script>


### toolbar.overflow.scrollDistance `Number` *(default: 50)*

Specifies the distance (in pixels) the toolbar scrolls when a scroll button is clicked.

#### Example

    <div id="pdfviewer"></div>
    <script type="module">
    $("#pdfviewer").kendoPDFViewer({
        toolbar: {
            overflow: {
                mode: "scroll",
                scrollDistance: 100
            }
        },
        pdfjsProcessing: {
            file: {
                url: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
            }
        }
    });
    </script>


### messages `Object`

Specifies the localization messages of the PDFViewer.

#### Example

    <div id="pdfviewer"></div>
    <script type="module">
    $("#pdfviewer").kendoPDFViewer({
        messages: {
            defaultFileName: "My Document",
            toolbar: {
                open: "Abrir",
                download: "Descargar"
            }
        },
        pdfjsProcessing: {
            file: {
                url: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
            }
        }
    });
    </script>

### messages.defaultFileName `String` *(default: "Document")*

Specifies the default file name used for `Download`.

#### Example

    <div id="pdfviewer"></div>
    <script type="module">
    $("#pdfviewer").kendoPDFViewer({
        messages: {
            defaultFileName: "MyPDFDocument"
        },
        pdfjsProcessing: {
            file: {
                url: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
            }
        }
    });
    </script>

### messages.toolbar `Object`
Specifies the localization messages of the toolbar.

#### Example

    <div id="pdfviewer"></div>
    <script type="module">
    $("#pdfviewer").kendoPDFViewer({
        messages: {
            toolbar: {
                open: "Open File",
                download: "Download PDF",
                print: "Print Document"
            }
        },
        pdfjsProcessing: {
            file: {
                url: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
            }
        }
    });
    </script>

### messages.toolbar.contextMenu `String`  *(default: "Menu")*

Specifies the text for the toolbar's context menu button when contextMenu is enabled. This button contains the overflow menu with open, download, and print tools.

#### Example

    <div id="pdfviewer"></div>
    <script type="module">
    $("#pdfviewer").kendoPDFViewer({
        messages: {
            toolbar: {
                contextMenu: "Menú"
            }
        },
        pdfjsProcessing: {
            file: {
                url: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
            }
        }
    });
    </script>

### messages.toolbar.open `String`  *(default: "Open")*

Specifies the text displayed for the open file tool in the toolbar. This tool allows users to browse and select PDF files from their local file system.

#### Example

    <div id="pdfviewer"></div>
    <script type="module">
    $("#pdfviewer").kendoPDFViewer({
        messages: {
            toolbar: {
                open: "Abrir Archivo"
            }
        },
        pdfjsProcessing: {
            file: {
                url: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
            }
        }
    });
    </script>

### messages.toolbar.exportAs `String`  *(default: "Export")*

Specifies the text displayed for the export tool in the toolbar when using DPL processing. This tool enables users to export individual pages as PNG or SVG files.

#### Example

    <div id="pdfviewer"></div>
    <script type="module">
    $("#pdfviewer").kendoPDFViewer({
        messages: {
            toolbar: {
                exportAs: "Exportar Como"
            }
        },
        pdfjsProcessing: {
            file: {
                url: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
            }
        }
    });
    </script>

### messages.toolbar.download `String` *(default: "Download")*

Specifies the text displayed for the download tool in the toolbar. This tool allows users to download the currently loaded PDF file to their local file system.

#### Example

    <div id="pdfviewer"></div>
    <script type="module">
    $("#pdfviewer").kendoPDFViewer({
        messages: {
            toolbar: {
                download: "Descargar"
            }
        },
        pdfjsProcessing: {
            file: {
                url: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
            }
        }
    });
    </script>

### messages.toolbar.pager `Object`

Specifies the localization messages for the pager component in the toolbar. Contains text for navigation buttons and page information display.

#### Example

    <div id="pdfviewer"></div>
    <script type="module">
    $("#pdfviewer").kendoPDFViewer({
        messages: {
            toolbar: {
                pager: {
                    first: "Primera página",
                    previous: "Página anterior",
                    next: "Página siguiente",
                    last: "Última página"
                }
            }
        },
        pdfjsProcessing: {
            file: {
                url: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
            }
        }
    });
    </script>

### messages.toolbar.pager.first `String`  *(default: "Go to the first page")*

Specifies the tooltip text for the "first page" navigation button in the pager toolbar. This button navigates to the first page of the PDF document.

#### Example

    <div id="pdfviewer"></div>
    <script type="module">
    $("#pdfviewer").kendoPDFViewer({
        messages: {
            toolbar: {
                pager: {
                    first: "Ir a la primera página"
                }
            }
        },
        pdfjsProcessing: {
            file: {
                url: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
            }
        }
    });
    </script>

### messages.toolbar.pager.previous `String` *(default: "Go to the previous page")*

Specifies the tooltip text for the "previous page" navigation button in the pager toolbar. This button navigates to the previous page of the PDF document.

#### Example

    <div id="pdfviewer"></div>
    <script type="module">
    $("#pdfviewer").kendoPDFViewer({
        messages: {
            toolbar: {
                pager: {
                    previous: "Ir a la página anterior"
                }
            }
        },
        pdfjsProcessing: {
            file: {
                url: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
            }
        }
    });
    </script>

### messages.toolbar.pager.next `String` *(default: "Go to the next page")*

Specifies the tooltip text for the "next page" navigation button in the pager toolbar. This button navigates to the next page of the PDF document.

#### Example

    <div id="pdfviewer"></div>
    <script type="module">
    $("#pdfviewer").kendoPDFViewer({
        messages: {
            toolbar: {
                pager: {
                    next: "Ir a la página siguiente"
                }
            }
        },
        pdfjsProcessing: {
            file: {
                url: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
            }
        }
    });
    </script>

### messages.toolbar.pager.last `String` *(default: "Go to the last page")*

Specifies the tooltip text for the "last page" navigation button in the pager toolbar. This button navigates to the last page of the PDF document.

#### Example

    <div id="pdfviewer"></div>
    <script type="module">
    $("#pdfviewer").kendoPDFViewer({
        messages: {
            toolbar: {
                pager: {
                    last: "Ir a la última página"
                }
            }
        },
        pdfjsProcessing: {
            file: {
                url: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
            }
        }
    });
    </script>

### messages.toolbar.pager.of `String` *(default: "of")*

Specifies the text used in the pager's page information display (e.g., "page 1 of 10"). This appears between the current page number and total page count.

#### Example

    <div id="pdfviewer"></div>
    <script type="module">
    $("#pdfviewer").kendoPDFViewer({
        messages: {
            toolbar: {
                pager: {
                    of: "de"
                }
            }
        },
        pdfjsProcessing: {
            file: {
                url: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
            }
        }
    });
    </script>

### messages.toolbar.pager.page `String` *(default: "page")*

Specifies the singular form of the word "page" used in the pager's status display when there is only one page (e.g., "page 1 of 1").

#### Example

    <div id="pdfviewer"></div>
    <script type="module">
    $("#pdfviewer").kendoPDFViewer({
        messages: {
            toolbar: {
                pager: {
                    page: "página"
                }
            }
        },
        pdfjsProcessing: {
            file: {
                url: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
            }
        }
    });
    </script>

### messages.toolbar.pager.pages `String` *(default: "pages")*

Specifies the plural form of the word "pages" used in the pager's status display when there are multiple pages (e.g., "page 1 of 10 pages").

#### Example

    <div id="pdfviewer"></div>
    <script type="module">
    $("#pdfviewer").kendoPDFViewer({
        messages: {
            toolbar: {
                pager: {
                    pages: "páginas"
                }
            }
        },
        pdfjsProcessing: {
            file: {
                url: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
            }
        }
    });
    </script>

### messages.toolbar.print `String` *(default: "Print")*

> To run the below example, open it in Dojo

#### Example - set custom text for Print message

    <div id="pdfviewer"></div>
    <script type="module">
      $("#pdfviewer").kendoPDFViewer({
        pdfjsProcessing: {
          file: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
        },
        messages: {
          toolbar: {
            print: "Custom Print Message"
          }
        }
      });
    </script>

### messages.toolbar.toggleSelection `String` *(default: "Enable Selection")*

> To run the below example, open it in Dojo

#### Example - set custom text for toggleSelection message

    <div id="pdfviewer"></div>
    <script type="module">
      $("#pdfviewer").kendoPDFViewer({
        pdfjsProcessing: {
          file: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
        },
        messages: {
          toolbar: {
              toggleSelection: "Custom Enable Selection Message"
          }
        }
      });
    </script>

### messages.toolbar.togglePan `String` *(default: "Enable Panning")*

> To run the below example, open it in Dojo

#### Example - set custom text for togglePan message

    <div id="pdfviewer"></div>
    <script type="module">
      $("#pdfviewer").kendoPDFViewer({
        pdfjsProcessing: {
          file: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
        },
        messages: {
          toolbar: {
              togglePan: "Custom Enable Panning Message"
          }
        }
      });
    </script>

### messages.toolbar.search `String` *(default: "Search")*

> To run the below example, open it in Dojo

#### Example - set custom text for search message

    <div id="pdfviewer"></div>
    <script type="module">
      $("#pdfviewer").kendoPDFViewer({
        pdfjsProcessing: {
          file: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
        },
        messages: {
          toolbar: {
              search: "Custom Search Message"
          }
        }
      });
    </script>

### messages.toolbar.zoom `Object`

Specifies the localization messages for the zoom tool dropdown in the toolbar. Contains text for various zoom options including predefined zoom levels and zoom controls.

#### Example

    <div id="pdfviewer"></div>
    <script type="module">
      $("#pdfviewer").kendoPDFViewer({
        pdfjsProcessing: {
          file: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
        },
        messages: {
          toolbar: {
            zoom: {
              actualWidth: "Actual Width",
              autoWidth: "Auto Width",
              fitWidth: "Fit Width",
              pageWidth: "Page Width"
            }
          }
        }
      });
    </script>

### messages.toolbar.zoom.actualWidth `String` *(default: "Actual Width")*

> To run the below example, open it in Dojo

#### Example - set custom text for Actual Width message

    <div id="pdfviewer"></div>
    <script type="module">
      $("#pdfviewer").kendoPDFViewer({
        pdfjsProcessing: {
          file: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
        },
        messages: {
          toolbar: {
            zoom: {
              actualWidth: "Custom Actual Width Message"
            }
          }
        }
      });
    </script>

### messages.toolbar.zoom.autoWidth `String` *(default: "Automatic Width")*

> To run the below example, open it in Dojo

#### Example - set custom text for Auto width message

    <div id="pdfviewer"></div>
    <script type="module">
      $("#pdfviewer").kendoPDFViewer({
        pdfjsProcessing: {
          file: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
        },
        messages: {
          toolbar: {
            zoom: {
              autoWidth: "Custom Automatic Width Message"
            }
          }
        }
      });
    </script>

### messages.toolbar.zoom.fitToWidth `String` *(default: "Fit To Width")*

> To run the below example, open it in Dojo

#### Example - set custom text for Fit To Width message

    <div id="pdfviewer"></div>
    <script type="module">
      $("#pdfviewer").kendoPDFViewer({
        pdfjsProcessing: {
          file: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
        },
        messages: {
          toolbar: {
            zoom: {
              fitToWidth: "Custom Fit To Width Message"
            }
          }
        }
      });
    </script>

### messages.toolbar.zoom.fitToPage `String` *(default: "Fit To Page")*

> To run the below example, open it in Dojo

#### Example - set custom text for Fit To Page message

    <div id="pdfviewer"></div>
    <script type="module">
      $("#pdfviewer").kendoPDFViewer({
        pdfjsProcessing: {
          file: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
        },
        messages: {
          toolbar: {
            zoom: {
              fitToPage: "Custom Fit To Page Message"
            }
          }
        }
      });
    </script>


### messages.toolbar.zoom.zoomIn `String` *(default: "Zoom In")*

> To run the below example, open it in Dojo

#### Example - set custom text for Zoom In message

    <div id="pdfviewer"></div>
    <script type="module">
      $("#pdfviewer").kendoPDFViewer({
        pdfjsProcessing: {
          file: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
        },
        messages: {
          toolbar: {
            zoom: {
              zoomIn: "Custom Zoom In Message"
            }
          }
        }
      });
    </script>

### messages.toolbar.zoom.zoomLevel `String` *(default: "Zoom Level")*

> To run the below example, open it in Dojo

#### Example - set custom text for Zoom In message

    <div id="pdfviewer"></div>
    <script type="module">
      $("#pdfviewer").kendoPDFViewer({
        pdfjsProcessing: {
          file: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
        },
        messages: {
          toolbar: {
            zoom: {
              zoomLevel: "Custom Zoom Level Message"
            }
          }
        }
      });
    </script>


### messages.toolbar.zoom.zoomOut `String` *(default: "Zoom Out")*

> To run the below example, open it in Dojo

#### Example - set custom text for Zoom Out message

    <div id="pdfviewer"></div>
    <script type="module">
      $("#pdfviewer").kendoPDFViewer({
        pdfjsProcessing: {
          file: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
        },
        messages: {
          toolbar: {
            zoom: {
              zoomOut: "Custom Zoom Out Message"
            }
          }
        }
      });
    </script>


### messages.errorMessages `Object`

Specifies the localization messages for various error scenarios that can occur during PDF processing and display. These messages are shown to users when errors are encountered.

#### Example

    <div id="pdfviewer"></div>
    <script type="module">
      $("#pdfviewer").kendoPDFViewer({
        pdfjsProcessing: {
          file: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
        },
        messages: {
          errorMessages: {
            notSupported: "Only PDF files are allowed.",
            parseError: "PDF file failed to process.",
            notFound: "File was not found.",
            popupBlocked: "Popup was blocked."
          }
        }
      });
    </script>

### messages.errorMessages.notSupported  `String` *(default: "Only pdf files allowed.")*

Specifies the error message displayed when a user attempts to open a file that is not a PDF format. This validation occurs during file selection or upload.

#### Example

    <div id="pdfviewer"></div>
    <script type="module">
      $("#pdfviewer").kendoPDFViewer({
        pdfjsProcessing: {
          file: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
        },
        messages: {
          errorMessages: {
            notSupported: "Custom message: Only PDF files are allowed."
          }
        }
      });
    </script>

### messages.errorMessages.parseError  `String` *(default: "PDF file fails to process.")*

Specifies the error message displayed when the PDF processing library fails to parse or render the PDF file due to corruption, unsupported features, or internal errors.

#### Example

    <div id="pdfviewer"></div>
    <script type="module">
      $("#pdfviewer").kendoPDFViewer({
        pdfjsProcessing: {
          file: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
        },
        messages: {
          errorMessages: {
            parseError: "Custom message: PDF file failed to process."
          }
        }
      });
    </script>

### messages.errorMessages.notFound  `String` *(default: "File is not found.")*

Specifies the error message displayed when the specified PDF file URL returns a 404 error or the file cannot be located at the provided path.

#### Example

    <div id="pdfviewer"></div>
    <script type="module">
      $("#pdfviewer").kendoPDFViewer({
        pdfjsProcessing: {
          file: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
        },
        messages: {
          errorMessages: {
            notFound: "Custom message: File was not found."
          }
        }
      });
    </script>

### messages.errorMessages.popupBlocked  `String` *(default: "Popup is blocked.")*

Specifies the error message displayed when browser popup blockers prevent the PDF viewer from opening new windows for print or download operations.

#### Example

    <div id="pdfviewer"></div>
    <script type="module">
      $("#pdfviewer").kendoPDFViewer({
        pdfjsProcessing: {
          file: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
        },
        messages: {
          errorMessages: {
            popupBlocked: "Custom message: Popup was blocked."
          }
        }
      });
    </script>

### messages.dialogs `Object`

Specifies the localization messages for various dialog windows used by the PDF viewer, including export dialogs, search panels, and common dialog buttons.

#### Example

    <div id="pdfviewer"></div>
    <script type="module">
      $("#pdfviewer").kendoPDFViewer({
        pdfjsProcessing: {
          file: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
        },
        messages: {
          dialogs: {
            exportAsDialog: {
              title: "Export Document...",
              defaultFileName: "MyDocument"
            },
            okText: "OK",
            save: "Save",
            cancel: "Cancel"
          }
        }
      });
    </script>

### messages.dialogs.exportAsDialog `Object`

Specifies the localization messages for the export dialog that appears when using DPL processing. Contains text for dialog elements including title, file format options, and form labels.

#### Example

  ```pseudo  
    <div id="pdfviewer"></div>
    <script type="module">
      $("#pdfviewer").kendoPDFViewer({
        dplProcessing: {
          read: {
            url: ""
          },
          download: {
            url: ""
          },
          upload: {
            url: ""
          }
        },
        messages: {
          dialogs: {
            exportAsDialog: {
              title: "Export Document...",
              defaultFileName: "MyDocument",
              pdf: "PDF Format (.pdf)",
              png: "PNG Format (.png)",
              svg: "SVG Format (.svg)",
              labels: {
                fileName: "File Name",
                saveAsType: "Save as Type",
                page: "Page"
              }
            }
          }
        }
      });
    </script>
  ```

### messages.dialogs.exportAsDialog.title `String` *(default: "Export...")*

Specifies the title text displayed in the export dialog header when users choose to export PDF pages in different formats.

#### Example

  ```pseudo
    <div id="pdfviewer"></div>
    <script type="module">
      $("#pdfviewer").kendoPDFViewer({
        dplProcessing: {
          read: {
            url: ""
          },
          download: {
            url: ""
          },
          upload: {
            url: ""
          }
        },
        messages: {
          dialogs: {
            exportAsDialog: {
              title: "Custom Export Dialog Title"
            }
          }
        }
      });
    </script>
  ```

### messages.dialogs.exportAsDialog.defaultFileName `String` *(default: "Document")*

Specifies the default filename shown in the export dialog's file name input field when no specific document name is available.

#### Example

  ```pseudo
    <div id="pdfviewer"></div>
    <script type="module">
      $("#pdfviewer").kendoPDFViewer({
        dplProcessing: {
          read: {
            url: ""
          },
          download: {
            url: ""
          },
          upload: {
            url: ""
          }
        },
        messages: {
          dialogs: {
            exportAsDialog: {
              defaultFileName: "MyCustomDocument"
            }
          }
        }
      });
    </script>
  ```

### messages.dialogs.exportAsDialog.pdf `String` *(default: "Portable Document Format (.pdf)")*

Specifies the display text for the PDF export format option in the export dialog's file type dropdown list.

#### Example

  ```pseudo
    <div id="pdfviewer"></div>
    <script type="module">
      $("#pdfviewer").kendoPDFViewer({
        dplProcessing: {
          read: {
            url: ""
          },
          download: {
            url: ""
          },
          upload: {
            url: ""
          }
        },
        messages: {
          dialogs: {
            exportAsDialog: {
              pdf: "PDF Format (.pdf)"
            }
          }
        }
      });
    </script>
  ```

### messages.dialogs.exportAsDialog.png `String` *(default: "Portable Network Graphics (.png)")*

Specifies the display text for the PNG export format option in the export dialog's file type dropdown list.

#### Example

  ```pseudo
    <div id="pdfviewer"></div>
    <script type="module">
      $("#pdfviewer").kendoPDFViewer({
        dplProcessing: {
          read: {
            url: ""
          },
          download: {
            url: ""
          },
          upload: {
            url: ""
          }
        },
        messages: {
          dialogs: {
            exportAsDialog: {
              png: "PNG Format (.png)"
            }
          }
        }
      });
    </script>
  ```

### messages.dialogs.exportAsDialog.svg `String` *(default: "Scalable Vector Graphics (.svg)")*

Specifies the display text for the SVG export format option in the export dialog's file type dropdown list.

#### Example

  ```pseudo
    <div id="pdfviewer"></div>
    <script type="module">
      $("#pdfviewer").kendoPDFViewer({
        dplProcessing: {
          read: {
            url: ""
          },
          download: {
            url: ""
          },
          upload: {
            url: ""
          }
        },
        messages: {
          dialogs: {
            exportAsDialog: {
              svg: "SVG Format (.svg)"
            }
          }
        }
      });
    </script>
  ```

### messages.dialogs.exportAsDialog.labels `Object`

Specifies the localization messages for form field labels within the export dialog, including file name input, format selection, and page selection controls.

#### Example

  ```pseudo
    <div id="pdfviewer"></div>
    <script type="module">
      $("#pdfviewer").kendoPDFViewer({
        dplProcessing: {
          read: {
            url: ""
          },
          download: {
            url: ""
          },
          upload: {
            url: ""
          }
        },
        messages: {
          dialogs: {
            exportAsDialog: {
              labels: {
                fileName: "File Name",
                saveAsType: "Save as Type",
                page: "Page"
              }
            }
          }
        }
      });
    </script>
  ```

### messages.dialogs.exportAsDialog.labels.fileName `String`  *(default: "File name")*

Specifies the label text for the filename input field in the export dialog where users enter the desired output filename.

#### Example

  ```pseudo
    <div id="pdfviewer"></div>
    <script type="module">
      $("#pdfviewer").kendoPDFViewer({
        dplProcessing: {
          read: {
            url: ""
          },
          download: {
            url: ""
          },
          upload: {
            url: ""
          }
        },
        messages: {
          dialogs: {
            exportAsDialog: {
              labels: {
                fileName: "Custom File Name Label"
              }
            }
          }
        }
      });
    </script>
  ```

### messages.dialogs.exportAsDialog.labels.saveAsType `String`  *(default: "Save as")*

Specifies the label text for the file format selection dropdown in the export dialog where users choose the export format (`PDF`, `PNG`, or `SVG`).

#### Example

  ```pseudo
    <div id="pdfviewer"></div>
    <script type="module">
      $("#pdfviewer").kendoPDFViewer({
        dplProcessing: {
          read: {
            url: ""
          },
          download: {
            url: ""
          },
          upload: {
            url: ""
          }
        },
        messages: {
          dialogs: {
            exportAsDialog: {
              labels: {
                saveAsType: "Custom Save As Type Label"
              }
            }
          }
        }
      });
    </script>
  ```

### messages.dialogs.exportAsDialog.labels.page `String`  *(default: "Page")*

Specifies the label text for the page selection control in the export dialog where users specify which page to export when using single-page export formats.

#### Example

  ```pseudo
    <div id="pdfviewer"></div>
    <script type="module">
      $("#pdfviewer").kendoPDFViewer({
        dplProcessing: {
          read: {
            url: ""
          },
          download: {
            url: ""
          },
          upload: {
            url: ""
          }
        },
        messages: {
          dialogs: {
            exportAsDialog: {
              labels: {
                page: "Custom Page Label"
              }
            }
          }
        }
      });
    </script>
  ```

### messages.dialogs.okText `String`  *(default: "OK")*

Specifies the text for the confirmation button in dialog windows. This button is used to confirm actions and close dialogs with positive results.

#### Example

    <div id="pdfviewer"></div>
    <script type="module">
      $("#pdfviewer").kendoPDFViewer({
        pdfjsProcessing: {
          file: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
        },
        messages: {
          dialogs: {
            okText: "Accept"
          }
        }
      });
    </script>

### messages.dialogs.save `String`  *(default: "Save")*

Specifies the text for the save/download button in export and file dialogs. This button initiates the file save or download operation.

#### Example

    <div id="pdfviewer"></div>
    <script type="module">
      $("#pdfviewer").kendoPDFViewer({
        pdfjsProcessing: {
          file: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
        },
        messages: {
          dialogs: {
            save: "Download"
          }
        }
      });
    </script>

### messages.dialogs.cancel `String`  *(default: "Cancel")*

Specifies the text for the cancel button in dialog windows. This button closes dialogs without performing any action or saving changes.

#### Example

    <div id="pdfviewer"></div>
    <script type="module">
      $("#pdfviewer").kendoPDFViewer({
        pdfjsProcessing: {
          file: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
        },
        messages: {
          dialogs: {
            cancel: "Close"
          }
        }
      });
    </script>

### messages.dialogs.search `Object`

Specifies the localization messages for the search dialog that appears when users perform text searches within PDF documents. Contains text for search controls and navigation buttons.

#### Example

    <div id="pdfviewer"></div>
    <script type="module">
      $("#pdfviewer").kendoPDFViewer({
        pdfjsProcessing: {
          file: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
        },
        messages: {
          dialogs: {
            search: {
              close: "Close",
              dragHandle: "Drag search",
              inputLabel: "Search Text",
              matchCase: "Match Case",
              next: "Next Match",
              previous: "Previous Match",
              of: " of {0}"
            }
          }
        }
      });
    </script>

### messages.dialogs.search.close `String` *(default: "Close")*

> To run the below example, open it in Dojo

#### Example - set custom text for search dialog close message

    <div id="pdfviewer"></div>
    <script type="module">
      $("#pdfviewer").kendoPDFViewer({
        pdfjsProcessing: {
          file: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
        },
        messages: {
          search: {
              close: "Custom Close Message"
          }
        }
      });
    </script>

### messages.dialogs.search.dragHandle `String` *(default: "Drag search")*

Specifies the tooltip text for the drag handle element of the search dialog. This allows users to reposition the search dialog by dragging it to different locations.

#### Example

    <div id="pdfviewer"></div>
    <script type="module">
      $("#pdfviewer").kendoPDFViewer({
        pdfjsProcessing: {
          file: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
        },
        messages: {
          dialogs: {
            search: {
              dragHandle: "Custom Drag Handle Message"
            }
          }
        }
      });
    </script>

### messages.dialogs.search.inputLabel `String` *(default: "Search Text")*

> To run the below example, open it in Dojo

#### Example - set custom text for search dialog input label text message

    <div id="pdfviewer"></div>
    <script type="module">
      $("#pdfviewer").kendoPDFViewer({
        pdfjsProcessing: {
          file: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
        },
        messages: {
          search: {
              inputLabel: "Custom Search Text Message"
          }
        }
      });
    </script>

### messages.dialogs.search.matchCase `String` *(default: "Match Case")*

> To run the below example, open it in Dojo

#### Example - set custom text for search dialog match case text message

    <div id="pdfviewer"></div>
    <script type="module">
      $("#pdfviewer").kendoPDFViewer({
        pdfjsProcessing: {
          file: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
        },
        messages: {
          search: {
              matchCase: "Custom Match Case Message"
          }
        }
      });
    </script>

### messages.dialogs.search.next `String` *(default: "Next Match")*

> To run the below example, open it in Dojo

#### Example - set custom text for search dialog next message

    <div id="pdfviewer"></div>
    <script type="module">
      $("#pdfviewer").kendoPDFViewer({
        pdfjsProcessing: {
          file: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
        },
        messages: {
          search: {
              next: "Custom Next Match Message"
          }
        }
      });
    </script>

### messages.dialogs.search.previous `String` *(default: "Previous Match")*

> To run the below example, open it in Dojo

#### Example - set custom text for search dialog previous message

    <div id="pdfviewer"></div>
    <script type="module">
      $("#pdfviewer").kendoPDFViewer({
        pdfjsProcessing: {
          file: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
        },
        messages: {
          search: {
              previous: "Custom Previous Match Message"
          }
        }
      });
    </script>

### messages.dialogs.search.of `String` *(default: " of {0}")*

> To run the below example, open it in Dojo

#### Example - set custom text for search dialog of message

    <div id="pdfviewer"></div>
    <script type="module">
      $("#pdfviewer").kendoPDFViewer({
        pdfjsProcessing: {
          file: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
        },
        messages: {
          search: {
              of: "Custom Of Message"
          }
        }
      });
    </script>

## Methods

### fromFile
Displays the file passed as a parameter in the PDFViewer. Currently, supported only for PDFJS Processing.

> To run the below example, open it in Dojo

#### Example - pass an URL to load a file

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

        <script type="module">
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

#### Example - Pass a base64 string to load a file

    <div id="pdfViewer">
    </div>
    <script type="module">
      var data;
      var request = new XMLHttpRequest();
      request.open('GET', "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf", true);
      request.responseType = 'blob';
      request.onload = function() {
        var reader = new FileReader();
        reader.readAsDataURL(request.response);
        reader.onload =  function(e){

          const string = e.target.result;
          const substring = ",";

          data = string.substring(string.indexOf(substring)+1);
          var pdfViewer = $("#pdfViewer").kendoPDFViewer({
            width: "100%",
            height: 700
          }).data("kendoPDFViewer");

          pdfViewer.fromFile({data: data})
        };
      };
      request.send();
    </script>

### activatePage
Loads and scrolls to the page by number.

> To run the below example, open it in Dojo

#### Example

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

        <script type="module">
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

    <div id="example">
      <button id="btn">Load 3rd page of the current document</button>
      <br/><br/>
      <div id="pdfViewer"></div>
    </div>

    <script type="module">
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

    <div id="example">
      <button id="download">Download</button>
      <div id="pdfViewer"></div>
    </div>
    <script type="module">
      $(document).ready(function () {
        $("#pdfViewer").kendoPDFViewer({
          pdfjsProcessing: {
            file: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf",
          },
          width: "100%",
          height: 1000,
          toolbar: {
            items: ["pager", "spacer", "open", "download"],
          },
        });
        $("#download").click(onDownloadClick)
        function onDownloadClick() {
          var pdfViewer = $("#pdfViewer").data("kendoPDFViewer");
          pdfViewer.execute({ command: "DownloadCommand" });
        }
      });
    </script>

### setOptions
Update the dimensions of the widget, the active page or the processor.

> To run the below example, open it in Dojo

#### Example

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

    <script type="module">
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

    <script type="module">
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

#### Example

    <div id="pdfviewer"></div>
    <script type="module">
      $("#pdfviewer").kendoPDFViewer({
        pdfjsProcessing: {
          file: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
        },
        render: function (e) {
          console.log("Page rendered:", e.page);
        }
      });
    </script>

#### Event Data

##### e.sender `kendo.ui.PDFViewer`

The widget instance which fired the event.

##### e.page `Object`

The page instance that was rendered.

### open

Fires when a PDF is opened in the viewer.

#### Example

    <div id="pdfviewer"></div>

    <script type="module">
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
```pseudo
    <div id="pdfviewer"></div>

    <script type="module">
      $("#pdfviewer").kendoPDFViewer({
        pdfjsProcessing: {
          file: "../non-existing-file.pdf"
        },
        error: function (e) {
          console.log("error message: " + e.message);
        }
      });
    </script>
```