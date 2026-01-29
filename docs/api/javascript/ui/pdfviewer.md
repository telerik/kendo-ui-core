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


<div class="meta-api-description">
How do I customize PDF rendering in Kendo UI PDFViewer using pdfjsProcessing? Configure PDF rendering behavior by passing customizable PDF.js runtime options within the viewer initialization to control loading, rendering quality, performance optimizations, and feature toggles for PDF documents; set or adjust PDF.js processing parameters, fine-tune decoding, text layer rendering, worker threads, caching strategies, and other low-level PDF handling settings to optimize viewer behavior for different use cases, environments, or performance requirements by providing a detailed PDF.js configuration object during setup.
</div>

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


<div class="meta-api-description">
How to render interactive forms in Kendo UI PDFViewer? Control and configure interactive PDF form rendering to enable filling out text fields, checkboxes, dropdowns, radio buttons, and clickable buttons directly within the viewer interface, allowing dynamic user input and native form widget display inside PDFs, supporting form interaction, input capturing, and customization of embedded forms for surveys, applications, or data entry tasks.
</div>

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


<div class="meta-api-description">
How to set default PDF file in Kendo UI PDFViewer? Configure the initial PDF document to load automatically when the viewer starts, enabling quick setup, preload, default file display, or preset document opening for immediate viewing. This property controls which PDF file is loaded first on initialization, supporting scenarios like setting a startup file, default document, opening a specific PDF, preloading content, or specifying the initial file for immediate access within the PDF viewer component.
</div>

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

Specifies the URL where the predefined Adobe CMaps are located. Further info in [the PDF.js API ref](https://github.com/mozilla/pdf.js/blob/master/src/display/api.js#L117).


<div class="meta-api-description">
How do I configure the cMapUrl property in Kendo UI PDFViewer to load CJK character fonts? Set or configure the base URL for loading Adobe CMap files essential for accurate text extraction, character mapping, and correct display of complex fonts including CJK characters within PDF viewing frameworks. Control where the viewer fetches character mapping resources to ensure proper rendering of Unicode, Asian text, and language-specific glyphs, enabling customization of font data sources and improving text layer accuracy in PDF rendering environments. Adjust, specify, or enable the location path for composite font maps to handle multilingual documents or special character sets effectively during PDF processing or display.
</div>

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


<div class="meta-api-description">
How does Kendo UI's PDFViewer handle Adobe CMaps when rendering PDFs? Configure how font character mapping files (CMaps) are processed when rendering PDFs, specifically controlling whether Adobe CMaps are handled as binary-packed or unpacked formats during PDF loading. Enable or disable packed CMap processing to optimize text extraction, character mapping accuracy, and font rendering behavior when loading or displaying PDFs using PDF.js. Adjust this setting to manage compatibility with different CMap file formats, improve performance in PDF text rendering, and customize how fonts map character codes within PDF documents.
</div>

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


<div class="meta-api-description">
How to set raw PDF data for rendering in Kendo UI PDFViewer? Set or configure raw PDF data input for PDF rendering by providing the document as a Blob, ArrayBuffer, Uint8Array, or base64 string to support loading PDFs directly from memory buffers, file uploads, API responses, or dynamic sources, enabling control over in-memory PDF content processing and display without relying on URLs or file paths.
</div>

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


<div class="meta-api-description">
How do I load a PDF document into Kendo UI's PDFViewer using a URL? Load or embed PDF documents by specifying the exact web address or URL link where the PDF file is hosted, enabling dynamic retrieval and rendering of remote PDF resources, setting or configuring the source path for PDF content loading over HTTP or HTTPS, controlling the online PDF file location for viewer processing, and managing the input URL to fetch, stream, or access external PDF documents for display within the PDF rendering component or viewer interface.
</div>

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


<div class="meta-api-description">
How to configure server-side document processing for PDFViewer in Kendo UI? Set up and control backend document processing integration for PDF viewing by configuring options that specify how PDF rendering and document processing logic connects to server endpoints, enabling customization of server-side parsing, OCR, text extraction, or rendering workflows linked to PDF display components. Adjust or enable server communication protocols, backend processing parameters, and document pipeline handling to optimize PDF viewer performance with server-powered data transformations or processing tasks. Integrate, configure, or customize server-side document processing workflows associated with PDF visualization, allowing for flexible processing behaviors, connection settings, and backend service interactions.
</div>

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


<div class="meta-api-description">
How to configure the PDFViewer's request settings for fetching remote PDF content with Kendo UI for jQuery? Configure and control the HTTP request settings used to fetch remote PDF content, including defining the request URL, HTTP method or type (such as GET or POST), custom headers, payload data, expected response format, timeout duration, and callback functions for events like before sending the request, handling successful responses, or managing errors. Adjust how remote PDF resources are loaded with customizable AJAX parameters to fine-tune network communication, implement authentication headers, set request timeouts, handle asynchronous data retrieval, and respond to server feedback during PDF viewing or data fetching processes. Enable precise control over remote data fetching behavior by setting request options, handling event hooks, and managing request lifecycles for PDF content loading scenarios.
</div>

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


<div class="meta-api-description">
How to configure the URL for reading digital processing tasks in Kendo UI PDFViewer? Configure the URL or endpoint for fetching and loading data during digital processing tasks, enabling control over the remote address used for read operations in document processing workflows. This setting lets you specify or customize the target API or service URL that handles reading or retrieving processed document data, override default remote endpoints for data reads, and integrate with different backends for loading PDF or document content through remote calls. Whether you need to set, change, or direct the read fetch URL for document processing, this controls where read requests are sent, supporting customization, integration, and routing of data retrieval operations in automated PDF handling and remote read services.
</div>

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


<div class="meta-api-description">
How do I configure the page field in PDFViewer's on-demand loading? Configure the query parameter name sent to the server during on-demand page loading when fetching PDF pages individually, enabling dynamic page requests via HTTP or AJAX by specifying the page number or index as part of the URL query string; set or customize the parameter name that indicates which page to retrieve when loading PDF content incrementally or through per-page network calls, controlling how the requested page is communicated in server requests and supporting precise page-specific data fetching in paginated PDF viewers.
</div>

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


<div class="meta-api-description">
How do I configure the request method for PDFViewer's DPL read operations? Configure or set the request method, such as HTTP GET, POST, or other request types, used by the PDF viewer component for data processing load (DPL) read operations. Control how the component issues read requests during dynamic processing or data fetching stages, including specifying the type of network or service request used when retrieving PDF-related data. Enable customization of the communication protocol or request approach for fetching content within the PDF viewer, optimizing or adjusting the interaction type for reading or loading remote resources. Adjust or define the request mode, method, or type for data read calls in processing workflows involving PDF display or interaction components.
</div>

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


<div class="meta-api-description">
What is the dataType property in Kendo UI PDFViewer used for? Configure or specify the expected response format for loading geometric data from the server, choosing between JSON or JSONP to control how the read operation processes and interprets incoming data; setting the data type impacts how geometries are parsed and rendered within the viewer, ensuring compatibility with JSON formats for accurate display and supporting cross-domain requests or standard JSON payloads for dynamic content loading and data integration scenarios.
</div>

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


<div class="meta-api-description">
How do I configure HTTP POST requests for remote document processing in a Kendo UI PDFViewer control? Configure and customize HTTP POST requests for remote document processing by setting options like URL, headers, payload data, content type, timeout duration, data handling, cross-origin requests, and callback functions for success, error, and request initialization. Control and enable fine-tuning of AJAX parameters used during file upload or document processing requests to external services, including setting request headers, managing data serialization, handling response types, and controlling asynchronous communication for remote processing workflows. Adjust, set, or enable parameters to tailor HTTP POST calls, including managing timeouts, setting content type headers, configuring data payload formats, controlling process data flags, and specifying cross-domain access for remote DPL or document handling services.
</div>

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


<div class="meta-api-description">
How to set the server endpoint for file uploads in Kendo UI PDFViewer? Set or configure the server endpoint, upload URL, or destination path to receive files posted during PDF processing uploads, enabling integration with backend storage, API file handlers, or custom server routes that accept HTTP POST requests for file submission from a PDF viewer component; customize, define, or specify the endpoint URL for file transfers, uploads, or data posting during document processing and file handling operations.
</div>

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


<div class="meta-api-description">
How do I configure the PDFViewer to send files to my server with a specific field name? Configure the upload form field name sent during save or upload requests to match server expectations, APIs, or backend handlers requiring specific parameter names such as file, document, or custom identifiers; control and set the exact form field key used in HTTP POST submissions when saving PDFs or uploading files to ensure compatibility with server-side endpoints, REST APIs, or middleware that parse the incoming form data payload by field name.
</div>

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


<div class="meta-api-description">
How do I customize file download behavior in Kendo UI PDFViewer? Control and customize file download behavior during PDF processing, including configuring how processed PDF files are saved or transferred, managing download options and parameters for handling file exports, specifying download settings while processing documents, enabling or disabling automatic downloads, adjusting download workflows, and setting preferences for saving PDFs generated or modified within the viewer component.
</div>

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


<div class="meta-api-description">
How to set the download URL for PDFs in a Kendo UI PDFViewer? Configure or set the URL endpoint for initiating file downloads or retrieving documents within a PDF viewer, allowing browsers to navigate to a specified absolute or relative download link, enabling control over file retrieval locations and download actions through customizable paths or URLs, supporting scenarios where users want to trigger or enable downloading files programmatically or via UI interactions in PDF rendering contexts.
</div>

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


<div class="meta-api-description">
How to implement lazy loading in Kendo UI PDFViewer control? Control on-demand loading or lazy loading of PDF document pages to optimize performance by fetching or streaming individual pages as needed instead of loading the entire PDF at once, configure pagination to load and render pages dynamically, enable partial or incremental page retrieval for memory efficiency and faster startup times, set up per-page read requests to reduce initial data transfer, adjust settings for server compatibility with paged requests, manage page-by-page loading to support large documents and improve responsiveness during PDF viewing or navigation.
</div>

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


<div class="meta-api-description">
How do I set the width of the PDFViewer component in Kendo UI? Adjust or define the horizontal dimension, size, or width of the PDF viewer component to fit fixed layouts, responsive designs, or dynamic resizing needs, including setting or updating the outer width for display control, container fitting, or screen adaptation in various user interfaces.
</div>

#### Example - customizing the width of the viewer

    <div id="pdf-viewer"></div>
    <script type="module">
        $("#pdf-viewer").kendoPDFViewer({
            width: 480
        });
    </script>

### height `Number|String` *(default: 1200)*

The height of the PDFViewer.


<div class="meta-api-description">
How do I set the height of a PDFViewer in Kendo UI for jQuery? Adjust or specify the vertical dimension, size, or height of a PDF viewer component to control its display area, set fixed or flexible height configurations, manage scrolling behavior within the viewer, customize layout appearance, and ensure the embedded PDF fits various screen sizes or container constraints by configuring or overriding height-related settings during initialization or runtime.
</div>

#### Example - customizing the height of the viewer

    <div id="pdf-viewer"></div>
    <script type="module">
        $("#pdf-viewer").kendoPDFViewer({
            height: 800
        });
    </script>

### defaultPageSize `Object`

Specifies the default page size if no PDF is displayed in the PDFViewer. The page size will shrink to fit the viewer dimensions.


<div class="meta-api-description">
What is the default page size for an unloaded PDF document in Kendo UI PDFViewer? Set or configure the initial fallback or default page dimensions and size used as a placeholder when no PDF document is loaded, controlling the default display area, page width and height, scaling behavior, and aspect ratio so the blank viewer layout matches or shrinks to fit available viewer space proportionally; adjust, specify, or control the default empty page size shown before document load, useful for setting up initial viewer appearance, layout, or preview space.
</div>

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


<div class="meta-api-description">
How to set default page width in Kendo UI PDFViewer? Set or configure the initial width of PDF pages before loading documents, defining the default pixel width for each page to control layout and scaling behavior; this enables predefining page dimensions, adjusting page rendering size, setting page width constraints, or controlling the starting width to ensure pages fit viewer dimensions while maintaining aspect ratio during display or zoom operations.
</div>

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


<div class="meta-api-description">
How do I set the initial height of PDF pages in a Kendo UI PDFViewer? Set or configure the initial height dimension in pixels for PDF pages displayed before a document fully loads, control default page height to establish placeholder sizing, adjust or specify starting vertical page size to ensure consistent layout and scaling in PDF viewers, manage default page dimensions for rendering while maintaining aspect ratio, customize or define the initial page height for previews, configure early page sizing to fit viewer containers automatically, establish baseline height to support proper scaling and presentation of pages prior to content availability.
</div>

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


<div class="meta-api-description">
How to set the current page in Kendo UI PDFViewer? Control, set, or retrieve the current page number displayed in a PDF viewer interface, enabling navigation, jumping to, or synchronizing a specific page programmatically or through data binding; adjust or query the visible page index to show, scroll to, or focus on any desired page within the PDF document, facilitating tasks like direct page access, page tracking, or automated page changes during rendering or interaction.
</div>

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


<div class="meta-api-description">
How do I set the default zoom level for PDF documents in a Kendo UI PDF Viewer? Configure the default zoom level or initial page magnification for PDF documents, set the starting scale factor to control how pages are rendered and displayed when opening files, adjust the initial viewing size for better readability or layout control, specify default page enlargement or reduction to optimize document presentation, control the starting zoom setting for navigation and user experience in PDF rendering components, and customize the load-time page scale to ensure PDFs open at a preferred zoom ratio without manual adjustment.
</div>

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


<div class="meta-api-description">
How to set minimum zoom level in Kendo UI PDFViewer control? Control the minimum zoom level or smallest scale allowed when viewing PDF pages, enabling you to set, configure, or restrict how far users or code can zoom out on documents, ensuring pages do not shrink below a defined size or scale factor; this includes setting the lowest zoom threshold, limiting zoom-out functionality, managing page display scaling boundaries, and enforcing minimum zoom constraints during viewing or programmatic adjustments.
</div>

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


<div class="meta-api-description">
What is the maximum zoom limit for PDF pages in a Kendo UI PDFViewer? Control the upper limit for zoom scaling on PDF pages, setting maximum zoom levels to restrict how closely users can enlarge content, managing both manual zoom interactions and automated zoom settings, enabling configuration of zoom boundaries, limiting page enlargement, setting zoom thresholds, and preventing excessive zoom-in while viewing PDFs.
</div>

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


<div class="meta-api-description">
How can I adjust the zoom increment for Kendo UI PDFViewer? Adjust the amount by which page zoom changes during each zoom step, controlling the scale increment for zooming in or out with mouse wheel actions, zoom buttons, or programmatic zoom controls. Configure the zoom step size, scale adjustment, zoom sensitivity, or zoom factor to tailor how much each zoom operation increases or decreases the page view, affecting smoothness and precision of zoom behavior within the PDF display interface. Enable customization of zoom increments to set finer or larger zoom jumps, accommodating different user preferences or application requirements for page scaling and navigation speed.
</div>

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


<div class="meta-api-description">
How can I customize the rendering of individual PDF pages in a Kendo UI for jQuery PDFViewer? Control and configure how each PDF page is rendered by customizing the rendering surface, enabling options such as layers, shapes, transformations, sizing, and rendering settings for drawing surfaces. Adjust page display properties for precise visual output, modify surface configurations for dynamic rendering, set custom rendering layers or shapes for PDF pages, enable transformations and scaling on pages, and tailor PDF page drawing behavior to specific rendering workflows or processing pipelines. This customization supports advanced rendering control, surface modifications, and detailed visual adjustments of PDF pages within viewer components.
</div>

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


<div class="meta-api-description">
What is the difference between using canvas and SVG rendering in Kendo UI PDFViewer? Control how PDF pages are rendered by selecting between raster-based canvas or scalable vector SVG rendering modes, enabling flexible display options for high-quality visuals or performance optimization. Configure the rendering surface type to switch between pixel-based canvas drawing for faster rendering or SVG for crisp, resolution-independent graphics, suitable for zooming and detailed document presentation. Adjust rendering output formats to suit different devices, rendering performance needs, or visual clarity requirements by choosing canvas or SVG drawing methods during PDF viewer setup or runtime configuration.
</div>

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


<div class="meta-api-description">
How can I customize the toolbar in Kendo UI PDFViewer? Configure the visibility and presence of a PDF viewer's toolbar, enabling toggling the toolbar display on or off and customizing toolbar buttons, icons, and controls such as navigation, zoom, search, and page management to tailor the interface. Adjust how toolbar items appear, reorganize ordering, control overflow behavior like collapsible menus or hidden items, and set specific toolbar components according to user needs. This includes options to enable or disable the toolbar, specify which tools are shown, arrange the toolbar layout, and manage how extra tools behave when space is limited, providing flexible UI customization and control over PDF viewing features.
</div>

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


<div class="meta-api-description">
How to enable context menu in PDFViewer toolbar? Configure toolbar arrangement to organize file actions like open, download, and print into a compact dropdown menu within the PDF viewer interface, enabling customization of tool placement and grouping. This setting lets you enable or disable a context menu dropdown button that appears as the toolbar’s first element, consolidating common file operations into a single expandable control instead of displaying them individually on the toolbar's right side. Adjust how the toolbar groups, displays, or moves essential PDF file actions to optimize space, improve user accessibility, or tailor the user interface layout for different workflows and user preferences.
</div>

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


<div class="meta-api-description">
How to customize the toolbar in Kendo UI for jQuery PDFViewer? Control and customize the PDF viewer toolbar by specifying, adding, removing, or rearranging interactive tools for navigation, paging, zooming, search functionality, text selection toggling, annotation management, file opening, downloading, printing, and page export options such as exporting individual pages to PNG or SVG formats. Enable fine-grained configuration of toolbar button sets during initialization to tailor user actions around document viewing, annotation workflows, file handling, print commands, and visual adjustments, supporting flexible ordering and inclusion of standard tools like pager, zoom controls, selection toggle, search bar, open, download, print, annotations, and export features. This setup supports developers looking to configure or customize toolbar interfaces, enable or disable specific PDF interaction tools, create tailored user experiences with document navigation and manipulation options, and integrate varied file export or annotation functionalities within a PDF viewer environment.
</div>

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


<div class="meta-api-description">
How do I customize the type of toolbar items in a Kendo UI PDFViewer? Configure and set the type of toolbar elements in a PDF viewer to customize how buttons, separators, spacers, split buttons, grouped buttons, or template items display and behave within the toolbar interface. Enable controlling toolbar item rendering by choosing from standard UI components like interactive buttons, visual dividers, flexible space fillers, grouped button collections, or custom templates to design and organize toolbar layouts. Adjust, define, or specify types of toolbar controls for consistent appearance and functionality in PDF viewing toolbars, supporting common toolbar element configurations and user interaction patterns.
</div>

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


<div class="meta-api-description">
How do I configure Kendo UI PDFViewer to handle overflow toolbar items? Configure the placement and visibility of toolbar buttons within a PDF viewer's interface, enabling control over whether items remain always visible, move automatically to an overflow menu based on available screen space, or are permanently placed in the overflow area. Manage responsive layouts by setting toolbar actions to dynamically shift to an overflow dropdown when space is limited, keep buttons constantly accessible without collapsing, or force items into a hidden overflow menu. Adjust toolbar item behavior to optimize user interaction, interface cleanliness, and accessibility, handling scenarios like small screens, dynamic resizing, and preference for showing or hiding controls in a condensed toolbar environment.
</div>

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


<div class="meta-api-description">
How to customize the toolbar actions in Kendo UI PDFViewer control? Specify or configure toolbar actions for PDF viewer controls by assigning predefined commands or built-in operations such as opening files, navigating pages, downloading documents, enabling text selection or panning, and exporting content; customize toolbar entries, map buttons to default editor commands, control toolbar functionalities, set command bindings for toolbar items, and enable or disable standard PDF viewer features through command assignment.
</div>

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


<div class="meta-api-description">
How to customize the toolbar items in Kendo UI PDFViewer control? Control and customize which tools or actions appear in a PDF viewer's toolbar by specifying or setting the tool identifier, selecting from default or built-in options, mapping toolbar elements to tool functions or definitions, configuring toolbar buttons, icons, or features, enabling or assigning specific tools to toolbar slots, and referencing predefined tool collections to determine available toolbar capabilities for PDF viewing and interaction.
</div>

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


<div class="meta-api-description">
How can I handle click events on toolbar buttons in Kendo UI PDFViewer? Detect and manage toolbar button press events within a PDF viewing interface by assigning custom JavaScript event handlers that trigger on user clicks, enabling developers to execute custom functions, update interface components, override default actions, call PDF viewer methods, or integrate specific logic when toolbar buttons are activated. This capability covers click event interception, event handling customization, interactive button control, responsive UI updates, and controlling toolbar behavior during user interaction with PDF viewer controls.
</div>

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


<div class="meta-api-description">
How to respond when toggle button is switched on/off in Kendo UI PDFViewer? Control and customize toolbar button toggle behavior in PDF viewers by setting event handlers that respond when toggle buttons switch states or change on/off conditions, enabling execution of custom functions or logic upon user interaction with toolbar buttons that support toggling functionality, such as enabling, disabling, or switching modes; applicable to toolbar actions designed as togglable buttons that require managing state changes, capturing toggle events, intercepting button state changes, and integrating custom responses or workflows triggered by button toggles within PDF viewing interfaces.
</div>

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


<div class="meta-api-description">
How to make PDF viewer toolbar buttons toggleable in Kendo UI for jQuery? Control whether toolbar buttons in a PDF viewer function as toggleable switches with on and off states, enabling persistent active or pressed appearances that can be configured, read, or modified through code and event listeners. Enable or disable toggle behavior for toolbar items to allow users to switch features on or off, set, update, or query toggle states programmatically, handle toggle state changes in interaction handlers, customize button interactivity with selected and deselected modes, and manage toolbar controls that require toggle functionality for user interface or feature activation scenarios.
</div>

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


<div class="meta-api-description">
How to customize toolbar button label text in Kendo UI PDFViewer? Configure the toolbar button label text to customize or localize captions displayed in the PDF viewer interface, enabling control over the visible names of toolbar items, changing button titles, setting custom captions for interface buttons, updating displayed text for toolbar elements, and defining user-facing labels that improve usability, accessibility, or language support for toolbar controls within the PDF viewer.
</div>

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


<div class="meta-api-description">
How to customize the PDF viewer toolbar with custom HTML templates in Kendo UI for jQuery? Customize the PDF viewer toolbar by configuring or embedding your own HTML, elements, widgets, or buttons directly into the toolbar area, enabling personalized controls, interactive content, or unique markup without relying on predefined item types. Insert or render custom templates and elements during initialization to extend or replace default toolbar functionality with bespoke components, tailored controls, or specialized UI widgets for enhanced user interactions and flexible toolbar layouts. Control the rendering of custom toolbar items by specifying templates or HTML snippets that override standard buttons, providing advanced customization options for embedding dynamic content, custom buttons, or interactive elements that integrate seamlessly into the PDF viewer interface.
</div>

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


<div class="meta-api-description">
How do I configure label visibility for toolbar items in a Kendo UI PDF Viewer? Configure how toolbar item labels are displayed in a PDF viewer by setting whether text appears alongside icons on the main toolbar, only within the overflow menu, or in both locations for enhanced clarity and space management, enabling control over icon-label visibility, customizing user interface layout, adjusting label placement for accessibility, and optimizing toolbar appearance in document viewers.
</div>

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


<div class="meta-api-description">
How do I make a specific button primary in Kendo UI PDFViewer toolbar? Control which toolbar button appears as the main or highlighted action within the PDF viewer interface by enabling or setting a primary flag on that item to emphasize its importance, making it visually distinct as a call-to-action or featured function; configure or mark toolbar buttons to stand out through styling that indicates priority or focus, distinguishing key controls from secondary options for improved user attention and interaction.
</div>

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


<div class="meta-api-description">
How do I add custom HTML attributes to PDFViewer toolbar buttons in Kendo UI for jQuery? Configure custom HTML attributes such as classes, IDs, data attributes, or ARIA labels on PDF viewer toolbar buttons to enable tailored styling, improve accessibility, add semantic meaning, or insert test hooks for automated testing. Customize, set, or control button properties using key/value pairs during initialization to enhance user interface flexibility, support screen readers, implement keyboard navigation attributes, or attach unique identifiers for CSS targeting and DOM manipulation in PDF viewer toolbars.
</div>

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


<div class="meta-api-description">
How to enable specific toolbar items in Kendo UI PDFViewer by default? Control or configure the initial active or inactive status of toolbar buttons in a PDF viewer, enabling or disabling specific toolbar features like navigation, zoom, annotation, or search controls at startup, set boolean flags to toggle the toolbar item’s usability or interactivity, define which toolbar tools are accessible or disabled by default when rendering the PDF viewer component, adjust available toolbar options dynamically for user interface customization, and manage toolbar item activation states during component initialization for tailored user experiences in PDF document interactions.
</div>

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


<div class="meta-api-description">
How to hide specific toolbar buttons in Kendo UI PDFViewer? Control the visibility and rendering of toolbar buttons within a PDF viewer interface by enabling or disabling specific toolbar items, hiding or showing individual buttons to customize the user interface, configuring toolbar components to display only selected controls, adjusting button presence during initialization or dynamically, toggling toolbar elements for tailored user experience, setting visibility states to manage interface clutter, and selectively enabling or disabling interactive PDF toolbar features.
</div>

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


<div class="meta-api-description">
How to customize icon styles in Kendo UI PDFViewer toolbar buttons? Set or customize icon styles for toolbar buttons in PDF viewer interfaces by assigning one or multiple CSS classes to the icon elements, enabling use of sprite images or font-based icons for better visuals; control and configure icon appearance, stylize toolbar buttons with spriteCssClass settings, apply custom CSS classes for icon fonts or sprite sheets to enhance toolbar item graphics and ensure consistent icon theming across PDF viewing components.
</div>

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


<div class="meta-api-description">
How can I customize the icons on a PDFViewer toolbar in Kendo UI for jQuery? Set or customize toolbar button icons by specifying the image source URL to display a custom icon in place of default visuals, enabling control over button appearance with remote or local image links, configuring icon images dynamically for PDF viewer toolbars, replacing or adding images via URL to toolbar buttons, and managing visual customization through setting image paths that render as toolbar button graphics.
</div>

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


<div class="meta-api-description">
How do I configure the PDFViewer toolbar to show icons in both main and overflow areas? Configure toolbar button icon placement in a PDF viewer to control whether the icons appear on the main toolbar, within the overflow popup menu, or simultaneously in both areas. Adjust settings to enable showing or hiding button icons in different toolbar regions, customize icon visibility for toolbar buttons, and manage icon rendering preferences during viewer initialization. This setting supports toggling icon display location for improved user interface layout, toolbar customization, and overflow handling in PDF viewer toolbars.
</div>

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


<div class="meta-api-description">
How can I customize the icons in the PDFViewer toolbar with Kendo UI for jQuery? Customize the toolbar icon by specifying which glyph or symbol appears for each toolbar button in the PDF viewer interface, enabling configuration of button visuals, icon themes, symbol sets, and appearance to match design requirements, with options to select from predefined icons, change button images, modify toolbar button styles, control icon display, and tailor the toolbar’s look and feel through icon assignment and theming support.
</div>

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


<div class="meta-api-description">
How to set a unique id for a PDF viewer toolbar button in Kendo UI? Specify or configure the unique identifier for a toolbar button within a PDF viewer interface to enable precise targeting for styling, event handling, customization, lookup, modification, removal, or dynamic updates; set or control the button’s ID to facilitate programmatic access, querying specific toolbar items, managing interaction behaviors, or integrating custom functionality in the PDF viewer toolbar configuration.
</div>

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


<div class="meta-api-description">
How to configure Kendo UI PDFViewer toolbar to handle overflow of buttons when space is limited? Control and customize the behavior of toolbar items when too many buttons or controls exceed the visible space, including how excess toolbar buttons collapse, appear in overflow menus, or adapt responsively for different screen sizes and window widths. Configure settings to enable or disable item collapsing, define overflow menu presentation, handle button wrapping or hiding, and manage responsive toolbar layouts to ensure optimal accessibility and usability of PDF viewer controls under varied interface constraints and dynamic resizing scenarios. Adjust the appearance and interaction of toolbar controls when screen space is limited, overflow actions are needed, or dynamic customization of toolbar item display is required.
</div>

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


<div class="meta-api-description">
How do I configure overflow behavior in Kendo UI PDFViewer toolbar? Control how toolbar items behave when exceeding available space by configuring the display mode for handling overflow in PDF viewer toolbars, including options to move excess items into dropdown menus for compact access, enable horizontal scrolling to keep all controls visible, group toolbar buttons into expandable or collapsible sections for organized navigation, or disable overflow management entirely which may cause buttons to be clipped or hidden. Adjust, set, or enable toolbar overflow handling strategies to customize user interface layouts, optimize toolbar accessibility, and improve navigation in different screen sizes or dynamic content widths, with flexible modes for managing tool overflow through menus, scrollable containers, section groupings, or no overflow control.
</div>

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


<div class="meta-api-description">
How do I control the display of scroll buttons in a Kendo UI PDF Viewer's toolbar when navigation controls overflow? Manage the display and behavior of scroll buttons in a PDF viewer’s toolbar when navigation controls overflow, including options to always show scroll arrows, hide them completely, or display them only when necessary, enabling customization of scrolling navigation visibility, appearance, and user interface control for better toolbar interaction and usability during horizontal scrolling of toolbar items.
</div>

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


<div class="meta-api-description">
How do I configure the scroll buttons in Kendo UI PDFViewer to appear at both ends of the toolbar? Manage the positioning and alignment of overflow scroll buttons within the PDF viewer’s toolbar when toolbar items exceed visible space, enabling configuration of scroll controls to appear on both ends, exclusively at the beginning, or just at the end of the toolbar; customize scroll button placement, control toolbar overflow navigation, set scroll button location, adjust scroll button behavior for better user interaction with overflowing toolbar content, and configure how users can scroll horizontally through excess toolbar items.
</div>

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


<div class="meta-api-description">
How to adjust the scroll step size for PDFViewer toolbar overflow navigation? Adjust the horizontal or vertical scroll step size for toolbar overflow navigation by setting the pixel distance the toolbar moves when users click the overflow scroll controls; this enables fine-tuning how far the toolbar shifts per interaction to improve usability, responsiveness, layout adaptation, smooth scrolling behavior, and accessibility for different screen sizes or input methods when navigating hidden toolbar items.
</div>

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


<div class="meta-api-description">
How do I customize error messages in Kendo UI PDFViewer for different languages? Customize and adapt user interface text for PDF viewing applications by setting, overriding, or translating interface labels, messages, prompts, and tooltips to any language or dialect. Enable internationalization, localization, or multi-language support by supplying custom strings, modifying default UI text, configuring language packs, or injecting personalized messages to ensure the PDF viewer displays contextually relevant and culturally appropriate wording for users worldwide. Adjust wording for error messages, buttons, commands, menus, and notifications within PDF viewers to match project requirements or user preferences.
</div>

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


<div class="meta-api-description">
How to set default file name for PDF download in Kendo UI PDFViewer? Set or customize the filename that appears by default when saving or downloading a PDF document through the viewer, control the default download name for exported or saved files, configure the suggested file name prompt during export or download actions, specify the initial file name presented to users when they save PDF files, manage and change the default file naming behavior for PDF downloads triggered within the viewer interface.
</div>

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


<div class="meta-api-description">
How to customize toolbar labels in Kendo UI PDFViewer? Customize, localize, translate, or configure the toolbar labels, button text, and tooltip messages in the PDF viewing interface to display tooltips, button names, menu options, and toolbar elements in different languages or custom phrases; adjust user interface text for accessibility, internationalization, or branding purposes by setting specific strings for toolbar items and hover descriptions within the PDF viewer’s control panel.
</div>

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


<div class="meta-api-description">
How to customize the text labels on PDFViewer's context menu buttons? Adjust and configure the text labels or captions displayed on the PDF viewing toolbar's context or overflow menu buttons, such as open, download, and print options, enabling customization of menu item names, control over localized or personalized button text, and tailoring of user interface language for better clarity, accessibility, or branding when the context menu feature is active within a PDF viewer component.
</div>

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


<div class="meta-api-description">
How to customize the open button label in Kendo UI PDFViewer toolbar? Control and customize the text label for the file open button on the PDF viewer toolbar, enabling developers to set, change, localize, translate, or modify the open-file button caption or title displayed in the viewer's toolbar interface, ensuring the open command’s user-facing label matches application language, accessibility requirements, or branding needs.
</div>

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


<div class="meta-api-description">
How to customize export options in Kendo UI PDFViewer toolbar? Configure or customize the toolbar label for exporting PDFs, enabling users to export individual pages as image formats like PNG or vector formats like SVG, controlling how export options appear in the PDF viewing interface, setting descriptive text for page-wise export tools, adjusting export button captions, and managing UI messages related to saving PDF pages in different file types.
</div>

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


<div class="meta-api-description">
How to customize the download button text in Kendo UI PDFViewer? Customize or configure the toolbar text label for downloading PDF files in the PDF viewer, allowing developers to set, change, or override the default download button caption, enabling localization, custom wording, or internationalization for saving PDFs locally, controlling how the download prompt appears on the user interface, and tailoring user prompts related to saving, exporting, or retrieving the displayed PDF document from the viewer toolbar.
</div>

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


<div class="meta-api-description">
How to customize the page navigation buttons in Kendo UI PDFViewer? Customize and localize the navigation controls and page indicator text in a PDF viewer toolbar, enabling setting or translating labels for next, previous, first, last buttons, and current page information display; configure or customize pager button captions and page counters to support multiple languages, accessibility needs, or custom UI text for PDF page navigation within document viewers.
</div>

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


<div class="meta-api-description">
How can I customize the tooltip for the first page button in Kendo UI PDFViewer's toolbar? Customize or configure the tooltip text, label, or hover message displayed on the PDF viewer’s toolbar button that navigates users to the first page, including options to set or override the default "first page" pager button description for better clarity, localization, accessibility, user interface hints, or multilingual support in PDF navigation controls.
</div>

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


<div class="meta-api-description">
How do I customize the tooltip for the previous page button in a Kendo UI PDFViewer? Configure the tooltip or hover text for the button that moves to the previous page in a PDF viewer interface, enabling custom labels or hints for the "go back," "navigate to earlier page," or "page back" control in the document navigation toolbar. Adjust or localize the text shown when users hover over the page navigation button that steps backward through pages, improving accessibility and user guidance during page transitions in PDF browsing.
</div>

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


<div class="meta-api-description">
How do I customize the tooltip for the "Next" button in a Kendo UI PDF Viewer toolbar? Configure or customize the tooltip, hover text, or descriptive label displayed on the next-page navigation button in a PDF viewer toolbar, enabling clear guidance or instructions for users looking to move forward through pages. Adjust, set, or localize the tooltip to improve usability, accessibility, or user interface messaging related to advancing to the following page, next slide, or subsequent document section during PDF navigation in web or application environments.
</div>

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


<div class="meta-api-description">
How do I customize the "last page" button text in a Kendo UI PDF Viewer's navigation toolbar? Set or customize the tooltip, hover text, accessibility label, or hint for the button that jumps to the last page in a PDF viewer's navigation toolbar, enabling developers to control or localize the message displayed when users focus on or hover over the final page navigation control, including setting descriptive text to improve usability, support multilingual interfaces, or enhance user guidance for navigating directly to the document's last page.
</div>

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


<div class="meta-api-description">
How do I customize the text between page numbers in a Kendo UI PDFViewer? Customize and control the text displayed between the current page number and total pages in PDF viewer pagers, enabling setting or changing the connecting word or phrase such as "of," "from," "out of," or any localized or personalized label, to tailor pagination navigation display in PDF viewing tools and improve user interface clarity for page counters or page indicators.
</div>

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


<div class="meta-api-description">
How do I customize the "page 1 of 1" label in Kendo UI PDFViewer's toolbar pager? Control and customize the label shown in the PDF viewer’s toolbar pager when displaying a single page, such as configuring the text for scenarios like "page 1 of 1," adjusting or setting the singular form of the pager indicator to clarify the current page status, enabling precise wording for one-page documents, modifying or overriding default page count messages, tailoring user interface strings that denote individual pages in pagination controls, and specifying how the page number label appears when only one page is present in PDF viewing tools or components.
</div>

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


<div class="meta-api-description">
How to customize the pages label in Kendo UI PDFViewer toolbar? Configure or customize the plural term for pages displayed in pagination controls, enabling control over how the number of pages is labeled in user interfaces such as "page 1 of 10 pages," including adjusting wording for pluralization, localization, or formatting in PDF viewer toolbars and pagers to reflect accurate page counts in status messages or navigation elements.
</div>

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


<div class="meta-api-description">
How do I change the print button label in Kendo UI PDFViewer? Customize or configure the print button text, label, or caption on the PDF viewer’s toolbar to support different languages, localization, or regional settings, enabling developers to set, change, override, or translate the print command display text for internationalization, accessibility, or user interface customization in document viewers.
</div>

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


<div class="meta-api-description">
How do I customize the "Toggle Selection" button label in a Kendo PDFViewer? Control and customize the text label for the toolbar button that toggles selection mode in a PDF viewer, including options to set, change, or update the toggle selection message displayed on the interface, modify user prompts for activating or deactivating text selection tools, configure UI text elements related to selection toggling, manage localization or messaging for selection toggle controls, and adjust descriptive labels or messages for enabling or disabling interactive text selection features within PDF viewing components.
</div>

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


<div class="meta-api-description">
How do I change the label for the pan mode toggle button in Kendo UI PDFViewer? Customize or configure the label text, caption, or tooltip for the pan mode toggle button in the PDF viewer toolbar, enabling control over the display name or description shown when switching between pan and other interaction modes. Adjust, set, or override the wording or message that appears for the toolbar control responsible for enabling or disabling panning, allowing personalization of interface text for user guidance, accessibility, or localization purposes related to pan toggle functionality in PDF rendering tools.
</div>

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


<div class="meta-api-description">
How do I change the label for the search button in Kendo UI PDFViewer toolbar? Adjust, translate, or set the search button label text in the PDF viewer toolbar for different languages or custom wording, enabling localization, internationalization, or personalized UI tweaks in PDF viewer interfaces, including controlling the visible search prompt, modifying the toolbar search text, configuring the search label display, and adapting the search interface text for various language preferences or branding requirements.
</div>

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


<div class="meta-api-description">
How do I customize the zoom level options in Kendo UI PDF Viewer? Customize, translate, or configure the text labels and dropdown options related to zoom levels, zoom controls, and scaling in PDF viewing interfaces, enabling localization and adjustment of zoom dropdown menus, zoom presets, magnification controls, and interactive zoom tooltips for user interfaces that display PDF documents.
</div>

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


<div class="meta-api-description">
How do I customize the zoom label in Kendo UI PDF Viewer toolbar to show actual width? Customize or translate the zoom control label in the PDF viewer toolbar that indicates displaying the document at its actual width, configure the zoom indicator text to show real size or 100% scale, enable localization for the zoom level label reflecting original document width, set or modify the toolbar’s zoom description to represent true width view, and adjust the zoom message to use terms like actual size, original width, or native scale in various languages or contexts.
</div>

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


<div class="meta-api-description">
How can I customize the "auto-width" zoom label in Kendo UI PDFViewer? Customize or translate the zoom control text for automatic width adjustment in PDF viewer toolbars, enabling setting or configuring the label shown when the zoom level automatically fits the document width. Adjust, localize, or override the zoom action display for auto-width scaling in PDF viewers, tailoring the message for user interfaces, toolbars, or zoom menus to better match language preferences or user customization needs.
</div>

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


<div class="meta-api-description">
How to customize fit-to-width zoom mode label in Kendo UI PDF Viewer? Configure and customize the zoom toolbar label for fitting a PDF view to the container’s width by localizing or translating the text that appears when enabling fit-to-width zoom mode, controlling how zoom options are displayed or labeled in the PDF viewer toolbar, adapting messages for internationalization, modifying UI labels related to zoom scaling or width adjustment, setting custom text for zoom fit width functionality, adjusting zoom controls messaging for different languages or contexts, and refining how zoom-to-fit-width features communicate with users through toolbar prompts or labels.
</div>

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


<div class="meta-api-description">
How do I customize the "Fit to Page" zoom label in Kendo UI PDFViewer? Customize or translate the toolbar label that controls zooming the PDF view to fit the entire page onscreen, enabling adjustment of the zoom control’s text for different languages, localization needs, or accessibility preferences in PDF viewer interfaces, including modifying labels for "fit to page," page scaling, automatically zooming, or resizing the PDF content to fully display the page within the viewer area.
</div>

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


<div class="meta-api-description">
How do I customize the zoom-in button label in the Kendo UI PDFViewer? Adjust or localize the text label for the zoom-in button on the PDF viewer toolbar, control the displayed wording when increasing page magnification, configure custom messages or translations for zoom in interface elements, set personalized or localized zoom-in button captions, manage toolbar zoom controls text for better user interface clarity, customize zoom increment button labels, modify the wording shown on zoom in buttons within PDF reading tools, enable changing the zoom increase button phrase to match language or branding preferences, control how the zoom in action text appears in the PDF viewer’s toolbar, adapt zoom in button messages for internationalization or accessibility.
</div>

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


<div class="meta-api-description">
How to change the zoom level display in Kendo UI PDFViewer toolbar? Configure or customize the zoom level display text or label in the PDF viewer toolbar, controlling the wording or phrase that indicates the current zoom percentage, magnification factor, or scale setting shown in the PDF reader interface. Enable localization, translation, or modification of the zoom indicator text within the toolbar, allowing adjustment of how zoom levels, view percentages, or magnification data appear visually to users navigating or interacting with PDF files. Tailor the zoom display message or tooltip that reflects the current zoom scale on PDFs for user interface clarity, internationalization support, or customized UI wording.
</div>

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


<div class="meta-api-description">
How to customize the label for the zoom-out button in a Kendo UI PDFViewer toolbar? Set or customize the zoom out button label on a PDF viewer toolbar, localize or translate the text for zoom reduction controls, configure how the zoom-out option appears in user interfaces, adjust or enable the text displayed for zooming out in PDF viewing tools, modify the zoom decrease button caption, control the wording for zoom out functionality, tailor the zoom-out label for different languages, support internationalization of zoom controls, change or set the description displayed for zooming out PDFs, and provide user-friendly text for shrinking PDF view scale.
</div>

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


<div class="meta-api-description">
How can I customize error messages in Kendo UI PDFViewer? Customize and translate error notifications for PDF viewing by configuring localized error message texts, replacing default alerts users see when loading, rendering, or interacting with PDFs, enabling tailored error prompts, multilingual support, custom validation messages, and user-friendly troubleshooting feedback within the PDF display interface.
</div>

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


<div class="meta-api-description">
How to customize error messages when unsupported file types are selected in Kendo UI PDFViewer? Show or customize error alerts, notices, or messages when unsupported file types, especially non-PDF formats, are selected, uploaded, or opened in a PDF viewer or document reader; handle user error feedback, localization of warnings for invalid file formats, and configure notifications for incompatible documents or unsupported file uploads during PDF viewing and file import processes.
</div>

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


<div class="meta-api-description">
How to customize error messages when PDF parsing fails in Kendo UI for jQuery? Configure and customize error notifications displayed during PDF rendering failures, including parsing errors caused by corrupted files, unsupported PDF features, or internal processing issues. Enable control over alert messages when PDF content cannot be read, parsed, or displayed properly, ensuring clear communication for document load failures, format incompatibilities, or unexpected rendering exceptions. Adjust or set the display text for user-facing errors related to PDF parsing, decoding problems, or file corruption during viewing sessions.
</div>

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


<div class="meta-api-description">
How to customize the error message when a PDF file is not found in Kendo UI PDFViewer? Customize or configure the error message displayed when a PDF file cannot be found, a document URL returns a 404 error, or the requested PDF is missing or unavailable; control the text shown to users during file-not-found scenarios in PDF viewers, including handling broken links, inaccessible files, or unavailable documents, with options to set, update, or localize the missing PDF notification message.
</div>

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


<div class="meta-api-description">
How to customize the error message when a popup blocker prevents PDF printing/download in Kendo UI PDFViewer? Customize or set error notifications, alerts, or messages displayed when popup blockers prevent printing or downloading PDF files, controlling how users are informed about blocked popup windows, handling blocked print or download attempts, configuring error popups or warnings related to popup blocking during PDF viewing, adjusting messages for blocked content access caused by browser popup restrictions, managing user feedback for blocked print/download actions, enabling clear error communications about popup interference, and personalizing the prompts or notifications shown when print or download popups are suppressed.
</div>

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


<div class="meta-api-description">
How can I customize export options in Kendo UI PDFViewer for multilingual support? Customize and configure multilingual text for PDF viewer dialogs including export options, search interface prompts, and standard dialog buttons by setting localized messages, labels, and customizable prompts to support internationalization, translation, and flexible language display across export dialogs, search panels, and general user interface messages within the PDF viewer environment.
</div>

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


<div class="meta-api-description">
How can I customize export dialog text in Kendo UI PDFViewer? Customize and translate export dialog text for PDFs, including dialog titles, file format selections, button labels, prompts, and user interface elements related to exporting files; adjust localization and language settings for export options in PDF viewing tools, enabling control over the wording and terminology presented during PDF export, file saving dialogs, and format choices in export workflows.
</div>

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


<div class="meta-api-description">
How to change the title of the export dialog in Kendo UI PDFViewer? Control and customize the header text or title displayed in the export dialog when saving or exporting PDF pages, enabling localization and modification of dialog headings for PDF export interfaces, adjusting export window titles, configuring export dialog labels, and setting the displayed export prompt title in PDF viewing and exporting workflows.
</div>

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


<div class="meta-api-description">
How to set default filename for export dialog in Kendo UI PDFViewer? Set or customize the initial filename that appears by default in the export or save dialog of a PDF viewer when exporting documents, enabling control over the suggested file name, handling cases where the original document has no preset name, configuring the default save-as filename for downloads or exports, specifying fallback filenames for exported PDF files, and managing the automatic naming behavior during PDF export operations.
</div>

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


<div class="meta-api-description">
How do I change the label for the PDF option in a Kendo UI PDF Viewer export dialog? Set or customize the label, name, or text for the PDF file format option in export dialogs or file-type dropdown menus, enabling clear identification and selection of PDF when exporting documents, controlling how PDF appears in export file type lists, configuring export dialog display names for PDF, adjusting the visible label for PDF output formats, and managing the naming shown to users during file export processes involving PDF files.
</div>

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


<div class="meta-api-description">
How do I customize the "PNG" option in a Kendo UI PDF viewer export dialog? Configure the label or text shown for the PNG file format option in the export dialog of a PDF viewer, enabling you to customize, rename, or set the display name for exporting documents as PNG images, control how the PNG export choice appears in file type dropdowns, change or localize the wording for PNG exports, and manage user interface language or terminology related to saving exported files in PNG format.
</div>

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


<div class="meta-api-description">
How to customize the export as SVG option in Kendo UI PDFViewer dialog? Customize, translate, or configure the text label for exporting files as SVG in the file type selector within a PDF viewer’s export dialog, enabling localization, language adaptation, display modification, and user interface text changes for scalable vector graphic export options during file saving or sharing processes.
</div>

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


<div class="meta-api-description">
How do I customize the export dialog labels in Kendo UI PDF Viewer? Customize and translate the export dialog interface in PDF viewers by setting localized text for file name inputs, format dropdowns, page range selectors, and other export-related form labels, enabling multilingual support and adapted user prompts for exporting documents as PDFs or other formats. Adjust labels to match various languages, customize naming fields, control format options, and tailor page selection instructions for seamless internationalization and flexible document export configuration across different user interfaces or export workflows.
</div>

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


<div class="meta-api-description">
How do I change the label for the file name input field in the export dialog of a Kendo UI PDFViewer? Customize and control the text label displayed next to the filename input field within the export dialog of a PDF viewer, enabling localization, renaming prompts, interface personalization, dynamic label setting for export file naming, adjusting input field titles, configuring or changing file name descriptors, and adapting UI wording to different languages or contexts when saving or exporting PDF documents.
</div>

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


<div class="meta-api-description">
How to customize the "Save as type" label in Kendo UI PDFViewer export dialog? Control and customize the text label for the file type or export format dropdown menu in document or image export dialogs, enabling setting or configuring the options like PDF, PNG, SVG, or other supported formats. This feature supports changing or renaming the descriptor for the save-as file format selector seen during exporting or saving operations, tailoring language for user interface elements related to file format choices in export or save dialogs. It helps in adjusting, modifying, or localizing the dropdown label that lists available export file types or formats in PDF viewers, file exporters, or document handling tools.
</div>

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


<div class="meta-api-description">
How to customize the "Page" label in PDF export dialog using Kendo UI for jQuery? Customize or configure the text label shown for page selection controls in export dialogs when saving or exporting individual pages from PDF viewers, including adjusting or setting the descriptor for page selectors, enabling users to specify or identify single-page exports, managing how the page range or single page number is displayed during export operations, and tailoring interface prompts related to page choice in export workflows within PDF viewing or processing tools.
</div>

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


<div class="meta-api-description">
How do I change the label text on the OK button in a Kendo UI PDFViewer dialog? Control the confirmation button label text for dialog boxes in PDF viewers, enabling customization of the OK button, confirmation prompts, acceptance labels, and dialog action buttons to adjust, set, or change the text shown when users confirm actions or close pop-up windows during PDF interactions.
</div>

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


<div class="meta-api-description">
How can I customize the save button label in Kendo UI PDFViewer dialogs? Customize or change the text label for the save, download, or export button in file or export dialogs within PDF viewers, enabling control over the wording shown when users trigger file saving, downloading, or exporting actions. Adjusting this button’s caption or prompt can help tailor user interface messaging, localize or translate save/download commands, and configure how export dialogs communicate file saving confirmation, download initiation, or export options. This setting influences the text displayed on confirmation buttons related to saving, exporting, or downloading PDF documents in viewer dialogs.
</div>

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


<div class="meta-api-description">
How do I change the cancel button caption in Kendo UI PDF Viewer dialogs? Customize or configure the text label for cancel buttons in PDF viewer dialogs, control the wording that appears on dialog cancel actions, set or change the cancel button captions in modal prompts to close windows without saving or applying changes, localize or translate the cancel button text for user interface dialogs, adjust the dismissal button label in pop-up dialogs that abort actions or exit without confirmations.
</div>

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


<div class="meta-api-description">
How do I customize the search dialog in Kendo UI PDFViewer to display different language labels? Customize and localize the text labels, prompts, and buttons within the PDF viewing search interface to display search controls, navigation commands, and dialog messages in different languages or personalized wording, enabling configuration of the search dialog’s user interface text, translation of search prompts, search bar instructions, and navigation button captions to fit various localization, internationalization, or user-specific terminology needs in the PDF viewer component.
</div>

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


<div class="meta-api-description">
How can I customize the close button text in Kendo UI PDFViewer's search dialog? Customize, set, or translate the text label for closing the search dialog in a PDF viewer, enabling localization, language adaptation, or UI text changes for the close button in the search popup, search interface, or find panel. Control the exact wording developers and users see when dismissing or exiting the search box, search panel, or find dialogue, supporting multi-language applications, internationalization, user interface text overrides, and customized messages for closing search dialogs in PDF viewer components. Enable configuring the close action text for search popups to match branding, accessibility needs, or preferred phrasing within PDF viewer tools.
</div>

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


<div class="meta-api-description">
How do I customize the tooltip text for the drag handle of the PDFViewer search dialog? Configure or customize the tooltip text that appears when hovering over the search dialog’s drag handle, enabling clear guidance or instructions for users to move, drag, reposition, or adjust the location of the search interface within the PDF viewer. This setting helps enhance usability by providing contextual hints or descriptions for the draggable search dialog area, improving user interaction with search tools, dialog movement, and interface customization in PDF viewing environments.
</div>

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


<div class="meta-api-description">
How do I change the label on the search input field in a Kendo UI PDF viewer's dialog box? Customize or set the text label for the search input field within a PDF viewer’s search dialog, enabling localization, translation, or modification of the prompt displayed to users when they enter search terms, keywords, or queries inside the PDF search interface; control or configure the input field label wording to match different languages, UI themes, or accessibility requirements for improved user guidance during document text search tasks.
</div>

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


<div class="meta-api-description">
How do I change the "match case" label in a PDFViewer search dialog? Customize or configure the case sensitivity option label in PDF search dialogs for accurate text matching, enable or disable matching uppercase and lowercase letters in search inputs, set localization or translation for the “match case” checkbox in PDF viewer search interfaces, control whether the search distinguishes between capital and small letters, and adjust or override the displayed text for the case matching feature in PDF viewer search dialogs to fit different languages or user preferences.
</div>

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


<div class="meta-api-description">
How to change the label on the "next" button in a PDF viewer's search interface? Customize or translate the label for the next search result button in the PDF viewer's search interface, enabling localization, internationalization, or changing the text that appears when navigating to the following match in a document search dialog. Adjust, modify, or set the button caption for moving to the next instance during text search operations within PDF viewing components. This covers scenarios where developers want to control, override, or configure the wording of the "next" navigation element in search dialogs to fit different languages, user preferences, or UI requirements.
</div>

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


<div class="meta-api-description">
How do I customize the previous button label in Kendo UI PDFViewer search dialogs? Customize and localize the label text or message displayed for the "previous" button in PDF viewer search dialogs, enabling control over language, terminology, or wording for navigating to prior search results, configuring user interface text for better accessibility and clarity in search navigation, adjusting localization settings for backward search commands, and modifying displayed prompts in search dialogs to match specific language preferences or brand messaging requirements.
</div>

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


<div class="meta-api-description">
How do I customize the search result navigation in a Kendo UI PDFViewer? Configure and control the text displayed in search result navigation within a PDF viewer, including phrases like "3 of 10" to indicate current match position and total matches; customize or set the format and wording shown in search dialogs, adjust how search hit counts are presented, and enable precise representation of matched item indices during document text searches, supporting varied expressions of search result enumeration and user feedback on search progress inside PDF content.
</div>

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


<div class="meta-api-description">
How do I dynamically load a PDF file into a Kendo UI PDF Viewer? Load and render a local file dynamically within a PDF viewing component by invoking a method designed to accept file objects or file paths, enabling runtime display and interactive viewing of documents such as PDFs. This functionality supports processing engines like PDFJS to parse, decode, and present content directly from files provided by the user or application, allowing developers to set, configure, or update the displayed document on demand without preloading. Use cases include runtime loading of user-selected files, displaying PDF documents in viewer components, controlling file input sources, managing document rendering states, and enabling file-based document navigation and manipulation within an application interface.
</div>

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


<div class="meta-api-description">
How do I programmatically navigate to a specific page in a Kendo UI PDFViewer? Navigate to, jump to, or programmatically display a specific page within a PDF document by setting or activating the desired page number, enabling smooth scrolling and rendering of that page in view. Control the viewer’s current page, move the viewport to a target page, load a particular page on demand, or set the visible page dynamically in a PDF viewer component. Useful for directing users to specific sections, bookmarks, or referenced pages by enabling developers to command the interface to scroll and display a given page index, facilitating page-focused navigation, page activation, and in-app PDF page control.
</div>

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


<div class="meta-api-description">
How to programmatically load a specific page in Kendo UI PDF viewer? Render or refresh a specific PDF page by its number to display or navigate programmatically within a PDF viewer, enabling targeted page loading, on-demand rendering, dynamic page display, canvas refresh for individual pages, and controlled page navigation or pre-rendering inside the viewer interface.
</div>

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


<div class="meta-api-description">
How do I programmatically zoom in on a PDF in Kendo UI's PDFViewer control? Invoke or trigger commands programmatically in a PDF viewer by calling a method that runs built-in actions like navigation, zooming, printing, or custom plugin functions, enabling automation of user interface operations, integration with external controls, and execution of viewer behaviors with optional parameters for flexible control. This functionality is useful for developers wanting to control page transitions, adjust zoom levels, print documents, or execute custom commands seamlessly through code, allowing interaction with the viewer after it has been initialized and supporting dynamic, script-driven manipulation of PDF display and features.
</div>

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


<div class="meta-api-description">
How can I dynamically change the active page number in a Kendo UI PDFViewer? Modify runtime settings for PDF viewing by configuring display size, selecting the current page, or switching processing engines dynamically without recreating the viewer component. Adjust viewport dimensions, change the active page number, or toggle backend processors on the fly, enabling real-time updates and seamless re-rendering of the document viewer. Control and update viewer options such as page navigation, layout sizing, and rendering methods during execution to customize PDF presentation and interaction effortlessly.
</div>

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


<div class="meta-api-description">
How do I properly dispose of a Kendo UI PDFViewer instance in my application? Terminate or clean up a PDF viewer instance by removing it from the interface, releasing memory, unbinding all event listeners, canceling ongoing network or data requests, and clearing internal references to enable garbage collection. This process supports proper disposal and resource management for PDF rendering components, ensuring no residual handlers or processes remain active after closing or resetting the viewer. Suitable for use after initialization to safely dismantle or reset PDF display elements, prevent memory leaks, and control lifecycle events related to document rendering and user interactions.
</div>

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


<div class="meta-api-description">
When does Kendo UI PDFViewer's render event occur after a page is loaded? Detect when a PDF page has fully rendered or finished drawing, trigger callbacks or event handlers upon page paint completion, enable post-render actions like updating annotations, overlays, accessibility attributes, or UI synchronization, listen for page render events to align canvases, refresh interactive layers, perform layout recalculations, measure content dimensions, track rendering performance or analytics, and control lazy loading or preloading of nearby pages after rendering finishes.
</div>

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


<div class="meta-api-description">
What triggers when a PDF is loaded in Kendo UI's PDFViewer? Detect when a PDF document is opened or loaded in the viewer, trigger actions or event handlers upon PDF display, listen for file open events to run custom code, capture moments when the document becomes accessible for updating interfaces, firing analytics events, executing callbacks, or initiating data fetches immediately after the PDF viewer presents the file.
</div>

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


<div class="meta-api-description">
How to handle errors in Kendo UI PDFViewer? Capture and manage errors occurring during PDF loading and rendering, including detecting failure events, controlling default error popups, suppressing standard error dialogs, implementing custom error notifications or messages, logging PDF load issues, handling rendering exceptions, enabling retries on failures, intercepting error callbacks in PDF viewers, and customizing user feedback for PDF display problems.
</div>

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