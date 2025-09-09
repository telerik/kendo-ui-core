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
        imageUrl: "https://demos.telerik.com/kendo-ui/content/shared/images/photos/2.jpg",
    });
    </script>

### imageLabel `String`

Sets the label used for the `<canvas>` element to describe the image contents.

#### Example

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        imageUrl: "https://demos.telerik.com/kendo-ui/content/shared/images/photos/5.jpg",
        imageLabel: "Rose Field."
    });
    </script>


### saveAs `Object`

Sets the saveAs options for the save command. Utilizes the [kendo.saveAs](/api/javascript/kendo/methods/saveas) method.

#### Example

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        imageUrl: "https://demos.telerik.com/kendo-ui/content/shared/images/photos/2.jpg",
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
        imageUrl: "https://demos.telerik.com/kendo-ui/content/shared/images/photos/2.jpg",
        saveAs: {
            fileName: "download.png"
        }
    });
    </script>

### saveAs.forceProxy `Boolean` *(default: false)*

If set to true, the content will be forwarded to proxyURL even if the browser supports saving files locally.

#### Example

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        saveAs: {
            forceProxy: true,
            proxyURL: "/save",
            fileName: "edited-image.png"
        }
    });
    </script>

### saveAs.proxyURL `String` *(default: null)*

The URL of the server side proxy which will stream the file to the end user. A proxy will be used when the browser isn't capable of saving files locally. Such browsers are IE version 9 and lower and Safari.

#### Example

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        saveAs: {
            proxyURL: "/save-proxy",
            fileName: "image.png"
        }
    });
    </script>

### saveAs.proxyTarget `String` *(default: "_self")*

A name or keyword indicating where to display the document returned from the proxy.

#### Example

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        saveAs: {
            proxyURL: "/save-proxy",
            proxyTarget: "_blank",
            fileName: "image.png"
        }
    });
    </script>

### toolbar `Boolean | Object` *(default: true)*

Configures the Toolbar of the ImageEditor.

#### Example

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        toolbar: {
            items: ["open", "save", "undo", "redo", "crop", "resize"]
        }
    });
    </script>

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

Apart from the built-in tools, the ImageEditor fully exposes the [ToolBar.items API](/api/javascript/ui/toolbar/configuration/items). This way you can specify any custom tools in the widget using the components available in the ToolBar itself.

### toolbar.items.type `String`
Specifies the type of the button.

#### Example

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        toolbar: {
            items: [
                { type: "button", text: "Custom Tool", click: function() { console.log("Custom clicked"); } }
            ]
        }
    });
    </script>

### toolbar.items.overflow `String`
Specifies the overflow of the button.

#### Example

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        toolbar: {
            items: [
                { text: "Always", overflow: "always" },
                { text: "Never", overflow: "never" },
                { text: "Auto", overflow: "auto" }
            ]
        }
    });
    </script>

### toolbar.items.click `Function`
Specifies the click handler of the button.

#### Example

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        toolbar: {
            items: [
                { 
                    text: "Custom Action", 
                    click: function(e) { 
                        console.log("Button clicked:", e); 
                        alert("Custom action executed!"); 
                    } 
                }
            ]
        }
    });
    </script>

### toolbar.items.command `String`
Specifies the command of the button.

#### Example

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        toolbar: {
            items: [
                { command: "crop" },
                { command: "resize" },
                { command: "undo" }
            ]
        }
    });
    </script>

### toolbar.items.options `String`
Specifies the command options of the button.

#### Example

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        toolbar: {
            items: [
                { 
                    command: "crop", 
                    options: { aspectRatio: "16:9" } 
                }
            ]
        }
    });
    </script>

### toolbar.items.name `String`
Specifies the name of the button.

#### Example

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        toolbar: {
            items: [
                { name: "customTool", text: "Custom Tool", click: function() { console.log("Custom tool clicked"); } }
            ]
        }
    });
    </script>

### toolbar.items.togglable `Boolean` *(default: false)*
Specifies if the button is togglable, e.g. has a selected and unselected state.

#### Example

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        toolbar: {
            items: [
                { 
                    text: "Toggle Mode", 
                    togglable: true,
                    click: function(e) { 
                        console.log("Toggle state:", e.selected); 
                    } 
                }
            ]
        }
    });
    </script>

### toolbar.items.text `String`
Sets the text of the button.

#### Example

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        toolbar: {
            items: [
                { text: "My Custom Tool", click: function() { console.log("Custom tool clicked"); } }
            ]
        }
    });
    </script>

### toolbar.items.template `String|Function`
Specifies what element will be added in the ToolBar wrapper. Items with template does not have a type.

#### Example

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        toolbar: {
            items: [
                { 
                    template: (data) => `<button class="k-button">Custom: ${data.text || 'Button'}</button>`,
                    click: function() { console.log("Template button clicked"); }
                }
            ]
        }
    });
    </script>

### toolbar.items.showText `String` *(default: "both")*
Specifies where the text will be displayed. Possible values are: "toolbar", "overflow" or "both" (default).

#### Example

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        toolbar: {
            items: [
                { text: "Toolbar Only", showText: "toolbar", icon: "crop" },
                { text: "Overflow Only", showText: "overflow", icon: "resize" },
                { text: "Both", showText: "both", icon: "save" }
            ]
        }
    });
    </script>

### toolbar.items.primary `Boolean` *(default: false)*
Specifies whether the button is primary. Primary buttons receive different styling.

#### Example

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        toolbar: {
            items: [
                { text: "Primary Button", primary: true, click: function() { console.log("Primary clicked"); } },
                { text: "Secondary Button", primary: false, click: function() { console.log("Secondary clicked"); } }
            ]
        }
    });
    </script>

### toolbar.items.attributes `Object`
Specifies the HTML attributes of a ToolBar button.

#### Example

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        toolbar: {
            items: [
                { 
                    text: "Custom Button", 
                    attributes: { 
                        "data-role": "custom-tool",
                        "title": "Custom tooltip",
                        "class": "my-custom-class"
                    },
                    click: function() { console.log("Custom button clicked"); }
                }
            ]
        }
    });
    </script>

### toolbar.items.enable `Boolean` *(default: true)*
Specifies whether the control is initially enabled or disabled. Default value is "true".

#### Example

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        toolbar: {
            items: [
                { text: "Enabled Button", enable: true, click: function() { console.log("Enabled clicked"); } },
                { text: "Disabled Button", enable: false, click: function() { console.log("Disabled clicked"); } }
            ]
        }
    });
    </script>

### toolbar.items.hidden `Boolean` *(default: false)*
Determines if a button is visible or hidden. By default buttons are visible.

#### Example

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        toolbar: {
            items: [
                { text: "Visible Button", hidden: false, click: function() { console.log("Visible clicked"); } },
                { text: "Hidden Button", hidden: true, click: function() { console.log("Hidden clicked"); } }
            ]
        }
    });
    </script>

### toolbar.items.spriteCssClass `String`
Defines a CSS class (or multiple classes separated by spaces) which will be used for button icon.

#### Example

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        toolbar: {
            items: [
                { 
                    text: "Custom Icon", 
                    spriteCssClass: "my-custom-icon k-icon",
                    click: function() { console.log("Custom icon clicked"); }
                }
            ]
        }
    });
    </script>

### toolbar.items.imageUrl `String`
If set, the ToolBar will render an image with the specified URL in the button.

#### Example

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        toolbar: {
            items: [
                { 
                    text: "Custom Image", 
                    imageUrl: "/images/custom-icon.png",
                    click: function() { console.log("Custom image button clicked"); }
                }
            ]
        }
    });
    </script>

### toolbar.items.showIcon `String` *(default: "both")*
Specifies where the button icon will be displayed. Possible values are: "toolbar", "overflow" or "both" (default).

#### Example

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        toolbar: {
            items: [
                { text: "Toolbar Icon", icon: "crop", showIcon: "toolbar" },
                { text: "Overflow Icon", icon: "resize", showIcon: "overflow" },
                { text: "Both", icon: "save", showIcon: "both" }
            ]
        }
    });
    </script>

### toolbar.items.icon `String`
Sets icon for the item. The icon should be one of the existing in the Kendo UI theme sprite.

#### Example

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        toolbar: {
            items: [
                { text: "Crop", icon: "crop", command: "crop" },
                { text: "Resize", icon: "resize", command: "resize" },
                { text: "Save", icon: "save", command: "save" }
            ]
        }
    });
    </script>

### toolbar.items.id `String`
Specifies the ID of the button.

#### Example

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        toolbar: {
            items: [
                { 
                    id: "customTool",
                    text: "Custom Tool", 
                    click: function() { 
                        console.log("Button with ID 'customTool' clicked"); 
                    }
                }
            ]
        }
    });
    </script>

### toolbar.click `Function`

Fires when the user clicks a command button. [Toolbar Events](/api/javascript/ui/toolbar#events).

#### Example

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        toolbar: {
            click: function(e) {
                console.log("Toolbar button clicked:", e.id);
            }
        }
    });
    </script>

### toolbar.close `Function`

Fires when the SplitButton's popup closes. [Toolbar Events](/api/javascript/ui/toolbar#events).

#### Example

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        toolbar: {
            close: function(e) {
                console.log("Toolbar popup closed:", e.target);
            }
        }
    });
    </script>

### toolbar.open `Function`

Fires when the Split Button's popup opens. [Toolbar Events](/api/javascript/ui/toolbar#events).

#### Example

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        toolbar: {
            open: function(e) {
                console.log("Toolbar popup opened:", e.target);
            }
        }
    });
    </script>

### toolbar.toggle `Function`

Fires when the user changes the checked state of a toggle button. [Toolbar Events](/api/javascript/ui/toolbar#events).

#### Example

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        toolbar: {
            toggle: function(e) {
                console.log("Toolbar button toggled:", e.id, "checked:", e.checked);
            }
        }
    });
    </script>

### toolbar.overflow `Object`
Specifies [`Toolbar.overflow`](/api/javascript/ui/toolbar/configuration/overflow) configuration for the toolbar.

#### Example

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        toolbar: {
            overflow: {
                mode: "scroll",
                scrollButtons: "visible"
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

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        toolbar: {
            overflow: {
                mode: "scroll"
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

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        toolbar: {
            overflow: {
                mode: "scroll",
                scrollButtons: "visible"
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

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        toolbar: {
            overflow: {
                mode: "scroll",
                scrollButtonsPosition: "end"
            }
        }
    });
    </script>


### toolbar.overflow.scrollDistance `Number` *(default: 50)*

Specifies the distance (in pixels) the toolbar scrolls when a scroll button is clicked.

#### Example

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        toolbar: {
            overflow: {
                mode: "scroll",
                scrollDistance: 100
            }
        }
    });
    </script>


### toolbar.overflowClose `Function`

Fires when the overflow popup container is about to close. [Toolbar Events](/api/javascript/ui/toolbar#events).

#### Example

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        toolbar: {
            overflowClose: function(e) {
                console.log("Overflow popup is closing");
            }
        }
    });
    </script>

### toolbar.overflowOpen `Function`

Fires when the overflow popup container is about to open. [Toolbar Events](/api/javascript/ui/toolbar#events).

#### Example

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        toolbar: {
            overflowOpen: function(e) {
                console.log("Overflow popup is opening");
            }
        }
    });
    </script>

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

#### Example

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        messages: {
            toolbar: {
                open: "Öppna bild",
                save: "Spara bild",
                undo: "Ångra",
                redo: "Gör om"
            }
        }
    });
    </script>

### messages.toolbar.open `String` *(default: "Open Image")*
Defines the localization tool.

#### Example

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        messages: {
            toolbar: {
                open: "Öppna bild"
            }
        }
    });
    </script>

### messages.toolbar.save  `String` *(default: "Save Image")*
Defines the localization tool.

#### Example

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        messages: {
            toolbar: {
                save: "Spara bild"
            }
        }
    });
    </script>

### messages.toolbar.undo  `String` *(default: "Undo")*
Defines the localization tool.

#### Example

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        messages: {
            toolbar: {
                undo: "Ångra"
            }
        }
    });
    </script>

### messages.toolbar.redo  `String` *(default: "Redo")*
Defines the localization tool.

#### Example

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        messages: {
            toolbar: {
                redo: "Gör om"
            }
        }
    });
    </script>

### messages.toolbar.crop  `String` *(default: "Crop")*
Defines the localization tool.

#### Example

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        messages: {
            toolbar: {
                crop: "Beschneiden"
            }
        }
    });
    </script>

### messages.toolbar.resize  `String` *(default: "Resize")*
Defines the localization tool.

#### Example

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        messages: {
            toolbar: {
                resize: "Größe ändern"
            }
        }
    });
    </script>

### messages.toolbar.zoomIn  `String` *(default: "Zoom In")*
Defines the localization tool.

#### Example

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        messages: {
            toolbar: {
                zoomIn: "Vergrößern"
            }
        }
    });
    </script>

### messages.toolbar.zoomOut  `String` *(default: "Zoom Out")*
Defines the localization tool.

#### Example

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        messages: {
            toolbar: {
                zoomOut: "Verkleinern"
            }
        }
    });
    </script>

### messages.toolbar.zoomDropdown  `String` *(default: "Zoom options")*
Defines the localization tool.

#### Example

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        messages: {
            toolbar: {
                zoomDropdown: "Zoom-Optionen"
            }
        }
    });
    </script>

### messages.toolbar.zoomActualSize  `String` *(default: "Show actual size")*
Defines the localization tool.

#### Example

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        messages: {
            toolbar: {
                zoomActualSize: "Tatsächliche Größe anzeigen"
            }
        }
    });
    </script>

### messages.toolbar.zoomFitToScreen  `String` *(default: "Fit to screen")*
Defines the localization tool.

#### Example

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        messages: {
            toolbar: {
                zoomFitToScreen: "An Bildschirm anpassen"
            }
        }
    });
    </script>

### messages.panes `Object`
Defines the localization Pane tools.

#### Example

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        messages: {
            panes: {
                crop: {
                    title: "Bild zuschneiden"
                },
                resize: {
                    title: "Bildgröße ändern"
                }
            }
        }
    });
    </script>

### messages.panes.crop `Object`
Defines the localization for the crop pane.

#### Example

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        messages: {
            panes: {
                crop: {
                    title: "Bild zuschneiden",
                    aspectRatio: "Seitenverhältnis:",
                    orientation: "Ausrichtung:"
                }
            }
        }
    });
    </script>

### messages.panes.crop.title  `String` *(default: "Crop Image")*
Defines the localization for the crop pane field.

#### Example

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        messages: {
            panes: {
                crop: {
                    title: "Bild zuschneiden"
                }
            }
        }
    });
    </script>

### messages.panes.crop.aspectRatio  `String` *(default: "Aspect Ratio:")*
Defines the localization for the crop pane field.

#### Example

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        messages: {
            panes: {
                crop: {
                    aspectRatio: "Seitenverhältnis:"
                }
            }
        }
    });
    </script>

### messages.panes.crop.aspectRatioItems `Object`
Defines the localization for the crop pane field.

#### Example

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        messages: {
            panes: {
                crop: {
                    aspectRatioItems: {
                        "originalRatio": "Ursprüngliches Verhältnis",
                        "1:1": "1:1 (Quadrat)",
                        "4:5": "4:5 (8:10)",
                        "16:9": "16:9 (Widescreen)"
                    }
                }
            }
        }
    });
    </script>

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

#### Example

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        messages: {
            panes: {
                crop: {
                    orientation: "Ausrichtung:"
                }
            }
        }
    });
    </script>

### messages.panes.crop.portrait  `String` *(default: "Portrait")*
Defines the localization for the crop pane field.

#### Example

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        messages: {
            panes: {
                crop: {
                    portrait: "Hochformat"
                }
            }
        }
    });
    </script>

### messages.panes.crop.landscape  `String` *(default: "Landscape")*
Defines the localization for the crop pane field.

#### Example

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        messages: {
            panes: {
                crop: {
                    landscape: "Querformat"
                }
            }
        }
    });
    </script>

### messages.panes.resize `Object`
Defines the localization for the resize pane.

#### Example

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        messages: {
            panes: {
                resize: {
                    title: "Bildgröße ändern",
                    pixels: "Pixel",
                    percents: "Prozent"
                }
            }
        }
    });
    </script>

### messages.panes.resize.title  `String` *(default: "Resize image")*
Defines the localization for the resize pane field.

#### Example

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        messages: {
            panes: {
                resize: {
                    title: "Bildgröße ändern"
                }
            }
        }
    });
    </script>

### messages.panes.resize.pixels  `String` *(default: "Pixels")*
Defines the localization for the resize pane field.

#### Example

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        messages: {
            panes: {
                resize: {
                    pixels: "Pixel"
                }
            }
        }
    });
    </script>

### messages.panes.resize.percents  `String` *(default: "Percents")*
Defines the localization for the resize pane field.

#### Example

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        messages: {
            panes: {
                resize: {
                    percents: "Prozent"
                }
            }
        }
    });
    </script>

### messages.common `Object`
Defines the localization for the common fields.

#### Example

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        messages: {
            common: {
                width: "Breite:",
                height: "Höhe:",
                cancel: "Abbrechen",
                confirm: "Bestätigen",
                lockAspectRatio: "Seitenverhältnis sperren"
            }
        }
    });
    </script>

### messages.common.width  `String` *(default: "Width:")*
Defines the localization for the common field.

#### Example

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        messages: {
            common: {
                width: "Breite:"
            }
        }
    });
    </script>

### messages.common.height  `String` *(default: "Height:")*
Defines the localization for the common field.

#### Example

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        messages: {
            common: {
                height: "Höhe:"
            }
        }
    });
    </script>

### messages.common.cancel  `String` *(default: "Cancel")*
Defines the localization for the common field.

#### Example

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        messages: {
            common: {
                cancel: "Abbrechen"
            }
        }
    });
    </script>

### messages.common.confirm  `String` *(default: "Confirm")*
Defines the localization for the common field.

#### Example

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        messages: {
            common: {
                confirm: "Bestätigen"
            }
        }
    });
    </script>

### messages.common.lockAspectRatio  `String` *(default: "Lock aspect ratio")*
Defines the localization for the common field.

#### Example

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        messages: {
            common: {
                lockAspectRatio: "Seitenverhältnis sperren"
            }
        }
    });
    </script>

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

        imageEditor.drawImage("https://demos.telerik.com/kendo-ui/content/shared/images/photos/2.jpg").done(function (image) {
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

        imageEditor.drawImage("https://demos.telerik.com/kendo-ui/content/shared/images/photos/2.jpg").done(function (image) {
            imageEditor.drawCanvas(image);
        }).fail(function (ev) {
            alert("Something went wrong!");
        });
    </script>

### getCanvasElement

Returns the canvas element

#### Returns `HTMLElement`

#### Example

	<button id="getCanvas" class='k-button'>Get Canvas</button>
    <div id="imageEditor"></div>
    <script>
      $("#imageEditor").kendoImageEditor({
        imageUrl: "https://demos.telerik.com/kendo-ui/content/shared/images/photos/2.jpg"
      });
      var imageEditor = $("#imageEditor").data("kendoImageEditor");
      $("#getCanvas").click(function(){
        var canvas = imageEditor.getCanvasElement()
        console.log(canvas);
      })
    </script>

### getCurrent2dContext

Returns the canvas' 2d context object

#### Example

    <button id="getCanvas" class='k-button'>Get Canvas Object</button>
    <div id="imageEditor"></div>
    <script>
      $("#imageEditor").kendoImageEditor({
        imageUrl: "https://demos.telerik.com/kendo-ui/content/shared/images/photos/2.jpg"
      });
      var imageEditor = $("#imageEditor").data("kendoImageEditor");
      $("#getCanvas").click(function(){
        var canvas = imageEditor.getCurrent2dContext()
        console.log(canvas);
      })
    </script>
#### Returns `Object`

### getCurrentImage

Returns the Image instance

#### Returns `HTMLElement`

The `img` element in the ImageEditor.
#### Example

    <button id="getImage" class='k-button'>Get Image</button>
    <div id="imageEditor"></div>
    <script>
      $("#imageEditor").kendoImageEditor({
        imageUrl: "https://demos.telerik.com/kendo-ui/content/shared/images/photos/2.jpg"
      });
      var imageEditor = $("#imageEditor").data("kendoImageEditor");
      $("#getImage").click(function(){
        var image = imageEditor.getCurrentImage()
        console.log(image);
      })
    </script>

### getZoomLevel

Returns the current zoom level

#### Returns

`Number`

#### Example

    <div id="imageEditor"></div>
    <script>
    var imageEditor = $("#imageEditor").kendoImageEditor({
        imageUrl: "https://demos.telerik.com/kendo-ui/content/shared/images/photos/2.jpg"
    }).data("kendoImageEditor");
    
    // Get current zoom level
    var currentZoom = imageEditor.getZoomLevel();
    console.log("Current zoom level:", currentZoom);
    </script>

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
            imageUrl: "https://demos.telerik.com/kendo-ui/content/shared/images/photos/2.jpg",
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

#### Example

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        imageUrl: "https://demos.telerik.com/kendo-ui/content/shared/images/photos/2.jpg",
        imageLoaded: function(e) {
            console.log("Image loaded:", e.image);
            console.log("Image dimensions:", e.image.width, "x", e.image.height);
        }
    });
    </script>

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

#### Example

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        imageUrl: "https://demos.telerik.com/kendo-ui/content/shared/images/photos/2.jpg",
        imageRendered: function(e) {
            console.log("Image rendered on canvas");
            console.log("Canvas element:", e.canvas);
            console.log("Canvas context:", e.ctx);
        }
    });
    </script>

### execute

Fired when a command is executed.

#### Event Data

##### e.sender `kendo.ui.ImageEditor`

The widget instance which fired the event.

##### e.command `String`

The name of the command.

##### e.options `Object`

The options of the command.

#### Example

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        imageUrl: "https://demos.telerik.com/kendo-ui/content/shared/images/photos/2.jpg",
        execute: function(e) {
            console.log("Command executed:", e.command);
            console.log("Command options:", e.options);
        }
    });
    </script>

### error

Fired when an error happened with the image loading.

#### Event Data

##### e.sender `kendo.ui.ImageEditor`

The widget instance which fired the event.

```pseudo
    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        imageUrl: "invalid-image-url.jpg",
        error: function(e) {
            console.log("Error loading image:", e);
            alert("Failed to load image. Please try again.");
        }
    });
    </script>
```

