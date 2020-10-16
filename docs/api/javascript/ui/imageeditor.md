---
title: ImageEditor
page_title: Configuration, methods and events of Kendo UI ImageEditor
description: How to initialize and configure an ImageEditor UI widget.
res_type: api
component: imageeditor
---

# kendo.ui.ImageEditor

Represents the Kendo UI ImageEditor. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### width `Number | String` *(default: "100%")*

Configures the width of the ImageEditor.

#### Example

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        width: 500,
        height: 400
    });
    </script>

### height `Number | String` *(default: 500)*

Configures the width of the ImageEditor.

#### Example

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        width: 500,
        height: 400
    });
    </script>

### imageUrl `String`

Sets the url (or base64 string) for the image to open.

> If imageUrl sets image hosted on another domain, the image editing tools will be disabled.

#### Example

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        imageUrl: "image.jpg"
    });
    </script>

### saveAs `Object`

Sets the saveAs options for the save command. Utilizes the [kendo.saveAs](/api/javascript/kendo/methods/saveas) method.

#### Example

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        imageUrl: "image.jpg",
        saveAs: {
            fileName: "download.png"
        }
    });
    </script>

### saveAs.fileName `String` *(default: "image.png")*

Sets the filename of the saved file.

#### Example

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        imageUrl: "image.jpg",
        saveAs: {
            fileName: "download.png"
        }
    });
    </script>

### saveAs.forceProxy `Boolean` *(default: false)*

If set to true, the content will be forwarded to proxyURL even if the browser supports saving files locally.

### saveAs.proxyURL `String` *(default: null)*

The URL of the server side proxy which will stream the file to the end user. A proxy will be used when the browser isn't capable of saving files locally. Such browsers are IE version 9 and lower and Safari.

### saveAs.proxyTarget `String` *(default: "_self")*

A name or keyword indicating where to display the document returned from the proxy.

### toolbar `Boolean | Object` *(default: true)*

Configures the Toolbar of the ImageEditor

### toolbar.items `Array`

Configures the items collection of the toolbar.

#### Example

    <div id="imageEditor"></div>
    <script>
        $("#imageEditor").kendoImageEditor({
            toolbar: {
                items: [
                    "open",
                    "save"
                ]
            }
        });
    </script>

### toolbar.items.type `String`
Specifies the type of the button.

### toolbar.items.overflow `String`
Specifies the overflow of the button.

### toolbar.items.click `Function`
Specifies the click handler of the button.

### toolbar.items.command `String`
Specifies the command of the button.

### toolbar.items.options `String`
Specifies the command options of the button.

### toolbar.items.name `String`
Specifies the name of the button.

### toolbar.items.togglable `Boolean` *(default: false)*
Specifies if the button is togglable, e.g. has a selected and unselected state.

### toolbar.items.text `String`
Sets the text of the button.

### toolbar.items.template `String|Function`
Specifies what element will be added in the ToolBar wrapper. Items with template does not have a type.

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

### toolbar.click `Function`

Fires when the user clicks a command button. [Toolbar Events](/api/javascript/ui/toolbar#events).

### toolbar.close `Function`

Fires when the SplitButton's popup closes. [Toolbar Events](/api/javascript/ui/toolbar#events).

### toolbar.open `Function`

Fires when the Split Button's popup opens. [Toolbar Events](/api/javascript/ui/toolbar#events).

### toolbar.toggle `Function`

Fires when the user changes the checked state of a toggle button. [Toolbar Events](/api/javascript/ui/toolbar#events).

### toolbar.overflowClose `Function`

Fires when the overflow popup container is about to close. [Toolbar Events](/api/javascript/ui/toolbar#events).

### toolbar.overflowOpen `Function`

Fires when the overflow popup container is about to open. [Toolbar Events](/api/javascript/ui/toolbar#events).

### messages `Object`
Defines the text of the localizable UI parts of the FileManager.

#### Example

    <div id="imageEditor"></div>
    <script>
        $("#imageEditor").kendoImageEditor({
            messages: {
                toolbar: {
                    open: "Open Image",
                    save: "Save Image",
                    undo: "Undo",
                    redo: "Redo",
                    crop: "Crop",
                    resize: "Resize",
                    zoomIn: "Zoom In",
                    zoomOut: "Zoom Out",
                    zoomDropdown: "Zoom options",
                    zoomActualSize: "Show actual size",
                    zoomFitToScreen: "Fit to screen"
                },
                panes: {
                    crop: {
                        title: "Crop Image",
                        aspectRatio: "Aspect Ratio:",
                        aspectRatioItems: {
                            "originalRatio": "Original ratio",
                            "1:1": "1:1 (Square)",
                            "4:5": "4:5 (8:10)",
                            "5:7": "5:7",
                            "2:3": "2:3 (4:6)",
                            "16:9": "16:9"
                        },
                        orientation: "Orientation:",
                        portrait: "Portrait",
                        landscape: "Landscape"
                    },
                    resize: {
                        title: "Resize image",
                        pixels: "Pixels",
                        percents: "Percents"
                    }
                },
                common: {
                    width: "Width:",
                    height: "Height:",
                    cancel: "Cancel",
                    confirm: "Confirm",
                    lockAspectRatio: "Lock aspect ratio"
                }
            }
        });
    </script>

### messages.toolbar `Object`
Defines the localization messages for the toolbar.

### messages.toolbar.open `String` *(default: "Open Image")*
Defines the localization tool.

### messages.toolbar.save  `String` *(default: "Save Image")*
Defines the localization tool.

### messages.toolbar.undo  `String` *(default: "Undo")*
Defines the localization tool.

### messages.toolbar.redo  `String` *(default: "Redo")*
Defines the localization tool.

### messages.toolbar.crop  `String` *(default: "Crop")*
Defines the localization tool.

### messages.toolbar.resize  `String` *(default: "Resize")*
Defines the localization tool.

### messages.toolbar.zoomIn  `String` *(default: "Zoom In")*
Defines the localization tool.

### messages.toolbar.zoomOut  `String` *(default: "Zoom Out")*
Defines the localization tool.

### messages.toolbar.zoomDropdown  `String` *(default: "Zoom options")*
Defines the localization tool.

### messages.toolbar.zoomActualSize  `String` *(default: "Show actual size")*
Defines the localization tool.

### messages.toolbar.zoomFitToScreen  `String` *(default: "Fit to screen")*
Defines the localization tool.

### messages.panes `Object`
Defines the localization Pane tools.

### messages.panes.crop `Object`
Defines the localization for the crop pane.

### messages.panes.crop.title  `String` *(default: "Crop Image")*
Defines the localization for the crop pane field.

### messages.panes.crop.aspectRatio  `String` *(default: "Aspect Ratio:")*
Defines the localization for the crop pane field.

### messages.panes.crop.aspectRatioItems `Object`
Defines the localization for the crop pane field.

### messages.panes.crop.aspectRatioItems.originalRatio  `String` *(default: "Original ratio")*
Defines the localization for the crop pane originalRatio field.

#### Example

    <div id="imageEditor"></div>
    <script>
        $("#imageEditor").kendoImageEditor({
            messages: {
                panes: {
                    crop: {
                        aspectRatioItems: {
                            "originalRatio": "Original ratio",
                            "1:1": "1:1 (Square)",
                            "4:5": "4:5 (8:10)",
                            "5:7": "5:7",
                            "2:3": "2:3 (4:6)",
                            "16:9": "16:9"
                        }
                    }
                }
            }
        });
    </script>

### messages.panes.crop.orientation  `String` *(default: "Orientation:")*
Defines the localization for the crop pane field.

### messages.panes.crop.portrait  `String` *(default: "Portrait")*
Defines the localization for the crop pane field.

### messages.panes.crop.landscape  `String` *(default: "Landscape")*
Defines the localization for the crop pane field.

### messages.panes.resize `Object`
Defines the localization for the resize pane.

### messages.panes.resize.title  `String` *(default: "Resize image")*
Defines the localization for the resize pane field.

### messages.panes.resize.pixels  `String` *(default: "Pixels")*
Defines the localization for the resize pane field.

### messages.panes.resize.percents  `String` *(default: "Percents")*
Defines the localization for the resize pane field.

### messages.common `Object`
Defines the localization for the common fields.

### messages.common.width  `String` *(default: "Width:")*
Defines the localization for the common field.

### messages.common.height  `String` *(default: "Height:")*
Defines the localization for the common field.

### messages.common.cancel  `String` *(default: "Cancel")*
Defines the localization for the common field.

### messages.common.confirm  `String` *(default: "Confirm")*
Defines the localization for the common field.

### messages.common.lockAspectRatio  `String` *(default: "Lock aspect ratio")*
Defines the localization for the common field.

## Methods

### drawImage

Draws an Image instance

#### Parameters

##### imageUrl `String`

The path to the image or a base64 string.

#### Returns
`Promise` A promise that will be resolved with the Image instance or fails with an error.

#### Example

    <div id="imageEditor"></div>
    <script>
        $("#imageEditor").kendoImageEditor();
        var imageEditor = $("#imageEditor").data("kendoImageEditor");

        imageEditor.drawImage("image.jpg").done(function (image) {
            imageEditor.drawCanvas(image);
        }).fail(function (ev) {
            alert("Something went wrong!");
        });
    </script>

### drawCanvas

Draws the canvas element with an Image. Triggers the `imageRendered` event.

#### Parameters

##### image `Object`
The Image instance

#### Example

    <div id="imageEditor"></div>
    <script>
        $("#imageEditor").kendoImageEditor();
        var imageEditor = $("#imageEditor").data("kendoImageEditor");

        imageEditor.drawImage("image.jpg").done(function (image) {
            imageEditor.drawCanvas(image);
        }).fail(function (ev) {
            alert("Something went wrong!");
        });
    </script>

### getCanvasElement

Returns the canvas element

#### Returns

`HTMLElement`

### getCurrent2dContext

Returns the canvas' 2d context object

#### Returns

`Object`

### getCurrentImage

Returns the Image instance

#### Returns

`HTMLElement`

### getZoomLevel

Returns the current zoom level

#### Returns

`Number`

### executeCommand

Executes a command.

#### Parameters

##### command `String`

The command to execute.

##### args `Object` *(optional)*

The command arguments.

#### Example

    <div id="imageEditor"></div>
    <script>
        $("#imageEditor").kendoImageEditor({
            height: 500,
            imageUrl: "image.jpg",
            imageRendered: function (ev) {
                var imageEditor = ev.sender;
                imageEditor.executeCommand({ command: "ZoomImageEditorCommand", options: imageEditor.getZoomLevel() - 0.01 });
            }
        });
    </script>

## Events

### imageLoaded

Fired when image is loaded. Can prevent the image rendering by calling the `preventDefault()` method.

#### Event Data

##### e.sender `kendo.ui.ImageEditor`

The widget instance which fired the event.

##### e.image `Object`

The Image instance.

### imageRendered

Fired when canvas is rendered with the image. This event is triggered by commands and when `drawCanvas` method is called.

#### Event Data

##### e.sender `kendo.ui.ImageEditor`

The widget instance which fired the event.

##### e.image `Object`

The Image instance.

##### e.canvas `HTMLElement`

The Canvas element.

##### e.ctx `Object`

The 2D context of the canvas element.

### execute

Fired when a command is executed.

#### Event Data

##### e.sender `kendo.ui.ImageEditor`

The widget instance which fired the event.

##### e.command `String`

The name of the command.

##### e.options `Object`

The options of the command.

### error

Fired when an error happened with the image loading.

#### Event Data

##### e.sender `kendo.ui.ImageEditor`

The widget instance which fired the event.


