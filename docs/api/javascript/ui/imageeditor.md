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


<div class="meta-api-description">
Adjust the horizontal dimension, size, or width of the image editor canvas or workspace to control how much area is displayed for editing images, customize or configure the editor’s layout, set the visible span or width of the editing interface to fit within containers or UI constraints, determine and control the pixel width or horizontal size available for image manipulation, resize the editor display area to optimize or limit the editing viewport for content adjustment, and manage the spatial allocation of the image editing tool’s interface during initialization or dynamically to align with design requirements or responsive layouts.
</div>

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


<div class="meta-api-description">
Adjust or configure the vertical dimension, height, or size of an image editing component to control how tall the editor appears within a layout or user interface, enabling dynamic resizing, responsive design adjustments, precise height settings for rendering images, and customization of vertical space usage in image manipulation workflows.
</div>

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


<div class="meta-api-description">
Set or load the input image for editing by specifying an image source through a direct URL, base64 encoded string, or remote link, enabling image manipulation features when the source permits access. Control or configure the editable image content by providing a path or encoded data representing the picture, with awareness that using cross-origin URLs may restrict editing capabilities due to browser security policies. Enable importing images from online locations or encoded formats to populate the editor’s canvas, supporting use cases involving image upload, preview, and transformation, while managing limitations on external domain resources that impact editing interactivity.
</div>

#### Example

    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        imageUrl: "https://demos.telerik.com/kendo-ui/content/shared/images/photos/2.jpg",
    });
    </script>

### imageLabel `String`

Sets the label used for the `<canvas>` element to describe the image contents.


<div class="meta-api-description">
Set or configure descriptive text for the image editing canvas to improve accessibility, enabling screen readers and assistive technologies to recognize and announce the content or purpose of the image area, providing alternative text or ARIA labels for better usability, discoverability, and inclusive design in image editing interfaces, supporting developers who want to enhance user experience for visually impaired users by adding meaningful descriptions to canvas elements.
</div>

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


<div class="meta-api-description">
Control saving or exporting edited images by specifying filename, file format, output type, download behavior, or export options for images after editing, including how to save files in different formats, configure file extensions, set download prompts, enable automatic downloads, and customize image export settings using save commands and file download configurations.
</div>

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


<div class="meta-api-description">
Configure or set the default filename for saved or exported images, customize the output file name when downloading or exporting image edits, control and specify the name of the image file generated after editing, define or change the saved image’s filename programmatically during initialization, preset the export file name for image downloads, customize file naming to ensure consistent, meaningful, or dynamic names for saved images, control image export file naming conventions, set a string value to rename edited images upon save or export actions, customize download filenames for better file management or automation workflows.
</div>

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


<div class="meta-api-description">
Control how edited images are saved by configuring whether the image data is sent directly to a server endpoint or downloaded locally, enabling options to post edited images through a proxy URL for centralized storage, server-side processing, cross-origin upload scenarios, enforced remote saving, overriding default browser download behavior, forcing backend handling of saved content, redirecting image output to a remote server, or managing image export workflows where client-side download is disabled and server upload is required.
</div>

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


<div class="meta-api-description">
Configure a server-side URL endpoint to proxy and stream edited images when direct browser saving is unsupported, enabling seamless file downloads through a backend proxy for browsers lacking local file save capabilities like Internet Explorer 9 and earlier or Safari, allowing image editing tools to handle saving results via a specified proxy path, facilitating fallback mechanisms to deliver processed images to users when local file operations are restricted or disabled by the browser environment.
</div>

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


<div class="meta-api-description">
Configure where the edited image saves or appears by setting the save target for proxy-based image saving, controlling the browsing context such as the window, tab, frame, iframe, or named target where the resulting image document is loaded or displayed after editing. Specify keywords or target names to direct the saved image output through a proxy to desired locations like new tabs, the same frame, parent windows, or custom-named targets, enabling flexible control over where and how edited images are rendered or accessed post-save in web applications.
</div>

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


<div class="meta-api-description">
Customize and configure the image editing toolbar by selecting and arranging tools, controlling tool visibility, defining command bindings, applying custom templates, and adjusting layout settings during initialization to tailor the user interface for image manipulation, editing actions, drawing options, cropping, resizing, filters, and other tool functionalities in the editor environment.
</div>

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


<div class="meta-api-description">
Configure and customize the image editor toolbar by specifying which tools, buttons, separators, or custom controls appear, their sequence, grouping, and visibility. Enable or disable toolbar items, set command identifiers, attach click handlers, supply custom icons or templates, add or remove controls, and control the layout and behavior of the editing toolbar during initialization or dynamically. Adjust toolbar contents to match use cases such as enabling cropping, rotating, drawing tools, or applying filters by setting the collection of toolbar elements, managing their display order, grouping, interactivity, and visibility for a tailored image editing interface.
</div>

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


<div class="meta-api-description">
Configure and control the kind or category of buttons displayed in the image editing toolbar, enabling selection of button type to define its behavior, function, role, and visual appearance. Set or specify toolbar button kinds such as tool selectors, action triggers, toggle buttons, dropdowns, or interactive controls to customize editing workflows and interface elements. Define button semantics and behavior in the image editor interface to optimize user interaction, enable specific editing commands, and tailor toolbar items based on function or UI role within image manipulation environments. Adjust and customize toolbar button types to influence their rendering, accessibility roles, and operational context in image editing toolbars or similar UI components.
</div>

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


<div class="meta-api-description">
Configure the behavior of toolbar buttons when the available space is limited by managing overflow handling in a responsive toolbar layout, enabling options to move buttons into an overflow menu, collapse, hide, or keep them visible based on screen size or container constraints, controlling how interface actions adapt dynamically to different display widths and user environments for optimal accessibility and usability in image editing interfaces.
</div>

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


<div class="meta-api-description">
Manage and customize toolbar button interactions in the image editing interface by setting click event handlers, allowing developers to define callback functions that respond to toolbar item clicks, execute custom code or image manipulation commands, handle user input events, override default actions, trigger specific image editor functionalities, or implement tailored workflows for editing controls and tool buttons.
</div>

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


<div class="meta-api-description">
Specify or configure the action triggered by toolbar buttons to perform editing commands such as crop, rotate, undo, redo, or apply filters; assign built-in or custom function identifiers, command names, or event handlers to define what operation occurs when a user clicks or taps a toolbar item within an image editor interface; customize, enable, or change button behaviors, map commands to toolbar controls, and set up command execution logic for image manipulation tools during initialization or runtime.
</div>

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


<div class="meta-api-description">
Control and customize toolbar button commands for image editing by setting parameters, configuring behavior, adjusting execution settings, passing data or options, enabling command-specific features, tailoring button actions, and managing how commands respond when triggered within the editor interface, optimizing command functionality and user interaction during runtime.
</div>

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


<div class="meta-api-description">
Set or configure the button identifier name for toolbar items in the image editor to enable easy lookup, command binding, event handling, or template targeting by assigning a unique string that developers can reference in code, scripts, or configuration settings when customizing or extending toolbar functionality, controlling toolbar behavior, integrating with commands, or identifying specific buttons programmatically during toolbar setup or interaction.
</div>

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


<div class="meta-api-description">
Control whether toolbar buttons can switch between active and inactive states to toggle selection modes or tools, enabling items to function as pressable toggles that indicate enabled or disabled states, supporting user interactions for switching features on or off, activating or deactivating editing options, configuring toggle behavior for toolbar elements within the image editor interface, setting items to have pressed/unpressed or selected/unselected states for mode switching or feature toggling.
</div>

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


<div class="meta-api-description">
Control or customize the visible label, caption, or text displayed on image editor toolbar buttons, including setting plain strings or localized messages for user interface elements, modifying button names during initialization or dynamically updating toolbar item labels, adjusting toolbar captions, titles, or tags to enhance clarity, user guidance, and accessibility in image editing toolbars.
</div>

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


<div class="meta-api-description">
Configure and customize the image editing toolbar by injecting custom elements, HTML markup, or DOM nodes directly into the toolbar area, enabling the insertion of personalized buttons, controls, or components without predefined item types, thereby allowing full control over toolbar content, appearance, and functionality, supporting scenarios such as adding custom tools, interactive widgets, or unique interface elements tailored to specific editing workflows.
</div>

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


<div class="meta-api-description">
Configure the display location of text labels for toolbar items in image editing interfaces, enabling control over whether button labels appear directly on the main toolbar, only within an overflow or dropdown menu, or simultaneously in both areas to optimize UI clarity and space utilization. This setting supports toggling label visibility for tools to improve user interactions, accessibility, or compactness by showing text on primary toolbars, exclusively inside overflow menus, or across both contexts, catering to preferences for toolbar organization, interface customization, and clearer tool identification in image editors.
</div>

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


<div class="meta-api-description">
Configure or set a toolbar button as the main action or primary command in an image editing interface, enabling visual emphasis such as highlighted styles, primary theme colors, or distinctive CSS classes to indicate important actions like save, apply, or confirm; control which toolbar item appears as the default or dominant choice with enhanced styling for user attention, ensuring key buttons stand out from secondary options by marking them as primary during initialization or setup to influence appearance and user interaction hierarchy.
</div>

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


<div class="meta-api-description">
Customize toolbar buttons in an image editor by setting HTML attributes such as id, class, data-* attributes, title tags, and ARIA roles to control styling, accessibility, behavior, and metadata for buttons. Configure button elements with key-value pairs to add custom identifiers, CSS classes for design, data attributes for binding or scripting, tooltips for user guidance, and ARIA labels to enhance screen reader support and overall interaction within the image editing toolbar. Enable fine-tuned control over button appearance, accessibility features, and data integration on toolbar items through customizable HTML attribute settings during initialization or runtime.
</div>

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


<div class="meta-api-description">
Control whether specific toolbar buttons or features are active, enabled, or disabled on initialization within an image editing interface, allowing you to set interactive states like toggling tools, enabling or disabling editing options, configuring toolbar item availability, customizing interface controls, activating or deactivating buttons, managing default tool states, and adjusting user access to specific image manipulation commands during setup or configuration.
</div>

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


<div class="meta-api-description">
Control the visibility and display of individual toolbar buttons or actions within an image editing interface by enabling, disabling, hiding, or showing specific controls based on user interaction, conditional logic, or initialization settings; configure which editing features, buttons, or tools appear or remain hidden on the toolbar to customize accessibility, streamline the user interface, and dynamically manage tool availability according to context or user roles.
</div>

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


<div class="meta-api-description">
Set or customize the toolbar button icon in the image editor by applying one or more CSS classes, including icon fonts, sprite CSS classes, or custom styles to control and style the button appearance, enabling flexible icon presentation, visual customization, and user interface theming through class-based icon definitions or CSS sprite usage.
</div>

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


<div class="meta-api-description">
Set or customize a toolbar button icon by providing a direct URL to an image, allowing control over the button’s appearance with a custom graphic loaded from a web address, enabling display of user-defined icons, external images, or hosted assets in the toolbar; configure, change, or override the button visuals by specifying the image source link, supporting scenarios such as branding, theming, or personalized toolbar item visuals in image editing interfaces.
</div>

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


<div class="meta-api-description">
Configure the display and placement of toolbar item icons within the image editor’s user interface, enabling options to show icons directly on the main toolbar for quick access, inside the overflow or dropdown menu for cleaner layouts, or simultaneously in both locations for maximum visibility and user convenience. Control icon visibility settings to customize how action buttons appear, toggle icons between toolbar and overflow, manage icon presence in compact or expanded toolbar states, and set preferences for UI clarity and usability in image editing toolbars, including showing or hiding icons depending on menu context or available space.
</div>

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


<div class="meta-api-description">
Customize or control the icon displayed on toolbar buttons in an image editing interface by selecting or setting specific sprite icons from a predefined Kendo UI theme collection; configure the toolbar item’s appearance by assigning icon names that correspond to available theme sprites, enabling developers to define, change, or specify visual symbols for editor tools such as crop, rotate, zoom, or other actions using standardized icon sets within the user interface.
</div>

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


<div class="meta-api-description">
Configure a unique identifier or ID for toolbar buttons within an image editing interface, enabling precise selection, referencing, or targeting of specific toolbar items through DOM queries, event handlers, CSS styling, automated testing, or scripting. This identifier helps control and manipulate individual toolbar elements programmatically, allowing customization, behavior binding, or styling by assigning a distinct ID value during the initialization or setup of the image editor’s toolbar. Whether needing a stable handle for UI automation, custom event attachment, or style overrides, setting a clear and unique button ID streamlines management and interaction with toolbar controls.
</div>

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


<div class="meta-api-description">
Capture and respond to toolbar button clicks, command activations, or user interactions within an image editing interface by attaching event handlers that trigger when toolbar buttons are pressed, clicked, or selected. Enable, set up, or configure listeners for toolbar commands to handle user input, customize responses to tool activations, intercept toolbar actions, or implement custom behavior during image editing workflows. Support event-driven handling for toolbar interactions, button press events, command triggers, and UI controls in the editing toolbar area.
</div>

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


<div class="meta-api-description">
Detect and respond to closing actions of toolbar dropdown menus or popup panels within image editing toolbars, enabling control over user interface updates, state synchronization, and triggering follow-up logic upon closing split buttons or dropdown toolbars. Capture toolbar popup close events to execute custom functions, handle UI refreshes, manage synchronization across components, or automate subsequent processes when image editor toolbar menus or split button dropdowns are dismissed. Enable event handling for the closure of expandable toolbar menus to facilitate state management, interface adjustments, and responsive behavior in image editing environments.
</div>

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


<div class="meta-api-description">
Detect, respond to, or execute custom code when the image editor’s toolbar split-button menu or popup becomes visible or opens, enabling dynamic interface updates, loading or modifying menu items on the fly, triggering analytics tracking, managing UI changes, customizing popup behavior, and capturing toolbar interaction events related to the popup’s appearance or state change.
</div>

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


<div class="meta-api-description">
Capture and respond to changes in toggle buttons within the image editor’s toolbar, enabling detection of when a user switches toggle states on or off, to control features, activate or deactivate tools, update interface elements, save preferences, or trigger custom logic based on toolbar toggle interactions and state transitions.
</div>

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


<div class="meta-api-description">
Adjust and customize how toolbar buttons and controls are handled when there isn’t enough space, including options to show overflow items in a popup menu, collapse them into a separate area, or use responsive breakpoints to dynamically manage toolbar layout and excess icons. Enable configuration for managing toolbar item behavior under limited space, control how extra or hidden tools appear, toggle between overflow popup or collapse modes, and optimize toolbar responsiveness and usability in image editing interfaces.
</div>

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


<div class="meta-api-description">
Configure how toolbar buttons behave when there isn’t enough space by controlling overflow handling modes such as collapsing extra tools into a dropdown menu, enabling horizontal scroll to keep all items visible, grouping controls into expandable or collapsible sections for better organization, or disabling overflow management which may cause some icons or buttons to be clipped or hidden. Adjust toolbar overflow behavior to optimize usability when tool items exceed available width, allowing you to set scrolling, dropdown menus, collapsible groups, or no overflow strategies for responsive interfaces and tool accessibility in image editing environments.
</div>

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


<div class="meta-api-description">
Control the display and behavior of overflow navigation buttons in the image editor toolbar when scrolling mode is active, enabling configuration to always show, hide, or automatically reveal scroll controls for managing toolbar items that extend beyond the visible area, useful for customizing user interface navigation, improving accessibility, or adjusting toolbar responsiveness during horizontal overflow scenarios.
</div>

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


<div class="meta-api-description">
Control the placement of scroll buttons in toolbars that overflow when toolbar items exceed visible space, enabling customization of navigation controls by positioning scroll arrows or buttons either at the beginning, at the end, or split across both sides of the toolbar for efficient horizontal scrolling and better user interface management, allowing developers to set or configure the direction and availability of scroll controls, adjust toolbar overflow navigation behavior, or decide where users can interact with scroll features to browse hidden toolbar content.
</div>

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


<div class="meta-api-description">
Adjust or configure the horizontal scroll step distance to control how far toolbar items shift when navigating through overflowed toolbar buttons, enabling customization of scroll increments in pixels for faster scrolling or precise, smaller movements when clicking navigation arrows. Set or modify the scroll distance to manage horizontal toolbar scrolling speed and responsiveness, fine-tuning the amount the toolbar content shifts with each scroll button press to enhance usability and navigation of toolbar elements when they exceed the visible area.
</div>

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


<div class="meta-api-description">
Detect and handle events when a toolbar overflow menu or popup is closing within an image editing interface, enabling developers to trigger actions like saving state, running cleanup tasks, updating UI elements, executing pre-close logic, or responding to user interactions before the overflow panel disappears, supporting event-driven control over menu visibility, popup lifecycle, and dynamic UI updates during toolbar overflow scenarios.
</div>

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


<div class="meta-api-description">
Detect, capture, or handle the event triggered just before a toolbar overflow menu, popup, or dropdown opens in an image editing interface, enabling you to customize or modify the popup content dynamically, adjust positioning, update component state, inject additional UI elements, track user interactions, or apply accessibility improvements and custom logic prior to the overflow panel becoming visible or active.
</div>

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


<div class="meta-api-description">
Customize and configure localized user interface text strings and messages within the image editing tool, enabling control over language-specific labels, prompts, and interface elements related to file management and editing workflows. Adjust, set, or override default UI text to support various languages, localization needs, translations, and regional wording for menus, buttons, tooltips, and file handling messages in the image editor environment. Enable customized language packs, internationalization options, or adjust text content to fit specific localization scenarios, user preferences, or application contexts dealing with image editing and file management components.
</div>

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


<div class="meta-api-description">
Customize and localize the toolbar button labels, tooltips, and messages to support different languages, configure internationalized text for image editing controls, set custom names and hints for toolbar actions in the image editor interface, enable multilingual support for toolbar elements, adjust UI text for better accessibility and user guidance, provide translated strings for editing tools, and control the display text for toolbar icons and functions in the image editing component.
</div>

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


<div class="meta-api-description">
Set or customize the label text, caption, or tooltip for the open button in an image editor toolbar, enabling localization, translation, or modification of the open command's displayed name; configure how the open tool prompt appears in different languages or customize its wording for accessibility, UI consistency, or user preference when users interact with the image import or file loading feature in graphical editing interfaces.
</div>

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


<div class="meta-api-description">
Customize, translate, or localize the save button label on the image editing toolbar, control the displayed text for saving images, set the toolbar’s save action wording, modify or configure the save prompt, adjust the save button caption language, enable different save button texts for various locales, change save button display text, personalize the save option label, and manage the save control wording on the image editing interface to match user language preferences or application localization needs.
</div>

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


<div class="meta-api-description">
Control and customize the undo button label in the image editor toolbar by setting or translating the localized text for the undo command, enabling developers to configure, rename, or internationalize the undo action's display text in user interfaces, ensuring that undo functionality is clearly communicated in different languages and tailored to various localization, translation, or user preference needs within image editing toolbars.
</div>

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


<div class="meta-api-description">
Configure, customize, or set the localized text, label, caption, or tooltip for the redo button in the image editing toolbar, enabling translation, internationalization, or language adaptation of the redo control, undo reversal action, or command in the editor interface to match different languages, locales, or user preferences for toolbar button naming and descriptions.
</div>

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


<div class="meta-api-description">
Configure and customize the crop button label in the image editing toolbar by setting localized text or translations for the crop tool. Enable control over the crop icon's tooltip, caption, or button title across different languages and regional settings. Adjust or override the crop control's displayed text in the toolbar to match custom UI terminology, internationalization needs, or accessibility requirements. Support changing the crop action name shown on image editing toolbars to align with localized user interfaces and multilingual applications.
</div>

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


<div class="meta-api-description">
Customize or translate the resize button labels, prompts, notifications, and tooltips in the image editing toolbar to match different languages or regional settings, enabling localization, internationalization, or multi-language support for interface resize controls, including adjusting UI text for resize actions, configuring messages shown during image resizing, and tailoring user-facing resize tool feedback and instructions across diverse localization scenarios.
</div>

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


<div class="meta-api-description">
Customize, translate, or localize the zoom in button label, tooltip, or text appearing on the image editing toolbar to support multiple languages, user interfaces, accessibility, or UI customization for zoom controls, magnification features, scaling buttons, or user prompts related to enlarging the image view within image editors or photo editing tools.
</div>

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


<div class="meta-api-description">
Customize, translate, or configure the zoom out button label and tooltip text on the image editor toolbar, enabling localized or personalized display for zoom out controls, adjusting interface language, setting clear tooltips for zooming out functionality, adapting zoom out descriptions in different languages, modifying or overriding default zoom out button titles, and tailoring zoom out UI text for better user understanding and accessibility.
</div>

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


<div class="meta-api-description">
Customize, translate, or localize the zoom control labels and text within the image editing toolbar, enabling setting, configuring, or adapting zoom dropdown menu messages and options for different languages, regional preferences, user interfaces, or accessibility needs in the image editing environment.
</div>

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


<div class="meta-api-description">
Customize, set, or localize the zoom-to-actual-size button label on an image editor’s toolbar to control the display text shown when users want to view the image at 100% scale, enabling translation, language customization, or adjustments to the zoom reset functionality text for different locales, UI configurations, or accessibility purposes.
</div>

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


<div class="meta-api-description">
Customize the zoom-to-fit functionality label and tooltip text in the image editing toolbar for localization, translation, or renaming purposes, enabling control over the user interface wording related to fitting images to screen view, scaling display to fit window, zoom adjustment descriptions, and user guidance on zoom fitting actions within image editing tools.
</div>

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


<div class="meta-api-description">
Configure, customize, and translate user interface pane labels, tooltips, prompts, and messages within the image editing environment to support multiple languages, enable localization of editing panel texts, adapt UI terminology, set custom display text for image editor sections, and control how tool names and notifications appear in different language contexts or regional settings.
</div>

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


<div class="meta-api-description">
Customize, translate, or localize user interface text and labels related to the cropping functionality within an image editing tool, including crop pane messages, prompts, instructions, and button labels, enabling multilingual support and adaptation of crop-related UI elements for different languages or dialects in image manipulation software.
</div>

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


<div class="meta-api-description">
Set or customize the text label, heading, or title shown on the crop section or cropping interface of an image editor, enabling localization, translation, or modification of the cropping pane’s header to match different languages, user preferences, or UI themes for clear identification of the crop tool or pane within image editing workflows.
</div>

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


<div class="meta-api-description">
Customize, translate, or set the label text for the aspect ratio indicator within image cropping tools, configure the display name for crop ratio controls, localize or rename the aspect-ratio description shown in photo editors, adjust the terminology for crop pane ratio settings, modify or provide language-specific text for the crop area's width-to-height ratio label, control how aspect ratio options are presented in image editing interfaces, update the wording for aspect ratio prompts during cropping operations, tailor captions or messages related to crop sizing proportions, and adapt the aspect ratio label for different languages or user preferences in image editing applications.
</div>

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


<div class="meta-api-description">
Customize and localize the labels for aspect ratio options in the crop tool of an image editor, enabling control over the display text for different preset or custom crop proportions, ratio selections, or fixed dimension choices, supporting internationalization, language translation, and tailored user interface configurations for crop pane aspect ratios.
</div>

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


<div class="meta-api-description">
Customize and localize the label or text that represents the original aspect ratio in image cropping tools, enabling control over how the default crop ratio, native width-to-height proportions, or initial image dimensions are displayed in crop interfaces. Adjust, configure, or set the terminology for original, native, or unchanged aspect ratios when cropping images, supporting internationalization, user interface text customization, and precise labeling of the image’s inherent size ratio during editing workflows. This covers scenarios where developers need to alter, translate, or define the wording that indicates the image’s original width-to-height ratio within crop pane controls or aspect ratio selection menus.
</div>

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


<div class="meta-api-description">
Customize or translate the label text for the crop tool’s orientation setting within image editing interfaces, enabling localization and display of orientation options such as landscape, portrait, or rotated crop directions across various languages and regions. Adjust, configure, or set the orientation descriptor in cropping UI panes to match localized terminology, support internationalization, and ensure users see appropriate orientation labels in their preferred language during image cropping activities.
</div>

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


<div class="meta-api-description">
Customize, translate, or set the label text for the portrait option in the image cropping section, enabling localization or language-specific display of the crop tool's portrait mode title, field name, or prompt within the image editor's user interface.
</div>

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


<div class="meta-api-description">
Set or customize the display text, label, or localization string for the landscape crop mode option within the image cropping tool, enabling tailored language, translations, or user interface wording for cropping images in landscape orientation, adjusting how the crop pane presents or names the landscape aspect ratio option, modifying UI text to support different languages or branding in image editing crop settings.
</div>

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


<div class="meta-api-description">
Customize and translate the text labels, prompts, and messages displayed in the image editing interface specifically for resizing controls, enabling localization and adjustment of resize dialog content, captions, button texts, and user interface strings related to image dimensions, scale adjustments, pixel size inputs, and resizing options within an image editing tool.
</div>

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


<div class="meta-api-description">
Customize or translate the title text shown on the resize panel within the image editing interface, enabling control over the label displayed when adjusting dimensions, width, height, or scaling options. Adjust or define the localization, language, or wording for the resize pane header to fit different languages, user preferences, or interface branding in image editing tools. Set or configure the pane’s title for resize controls to match application context, accessibility standards, or internationalization requirements across various image modification workflows.
</div>

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


<div class="meta-api-description">
Customize or localize the label text for the pixel input field in the resize pane of an image editor, enabling control over how the unit "pixels" is displayed, translated, or presented in different languages or regions, including modifying, setting, or configuring the pixel measurement term shown during image resizing operations.
</div>

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


<div class="meta-api-description">
Customize, configure, or set the displayed percentage labels for resizing dimensions within an image editing interface, enabling localization, translation, or adjustment of size indicators during scaling operations, including modifying how percent values are shown in resize controls or panes to match different languages, regional formats, or user preferences for intuitive size adjustment feedback.
</div>

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


<div class="meta-api-description">
Translate and customize local language support for common interface elements, labels, tooltips, prompts, field names, and user interface messages within the image editing environment, enabling multilingual configurations, localization of UI text, setting translated strings for buttons and controls, modifying default wording to fit different languages or cultures, and supporting internationalization of general user-facing text components in the image editor.
</div>

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


<div class="meta-api-description">
Configure or customize the displayed label, prompt, or tooltip text for the image width input field, set or modify the localized or translated string representing the width dimension in image editing tools, adjust the terminology or wording related to image horizontal size, control how the width parameter is presented in different languages or regional settings within graphical image editors, and define the text shown to users when specifying or modifying image width attributes during editing sessions.
</div>

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


<div class="meta-api-description">
Customize or translate the height label and text in image editing tools, enabling localized height dimension controls, height field captions, and interface height indicators; set, configure, or override default height strings in multiple languages for user interface elements that display or request image height values, dimensions, or size attributes within an image editor environment.
</div>

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


<div class="meta-api-description">
Customize or translate the cancel button text, adjust the label for cancel actions, set localized or alternative wording for cancel prompts, configure the cancellation message in image editing interfaces, control the displayed cancel text for user interaction dismissals, specify button captions for aborting operations, enable multilingual support for cancel labels, override default cancel strings, and tailor cancel button wording to match UI language preferences or accessibility needs.
</div>

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


<div class="meta-api-description">
Customize or localize confirmation button text, labels, and prompts within image editing interfaces; configure or set the confirmation message displayed when users approve actions or save changes; control the wording of confirm dialogs, acceptance buttons, or validation messages to match different languages, regions, or branding requirements in photo or graphics editing tools.
</div>

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


<div class="meta-api-description">
Translate or customize the label, tooltip, or message for locking the aspect ratio in image editing interfaces, enabling localization or internationalization of the lock aspect ratio option, configuring the user-visible text that controls whether the width and height scale proportionally to maintain the original aspect ratio, adapting the wording for different languages or regional settings to support consistent UI terminology related to preserving image proportions during resizing or cropping.
</div>

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


<div class="meta-api-description">
Draw or render an image onto a canvas by programmatically placing or compositing image elements, updating visuals, layering pictures, painting or redrawing graphics dynamically within an image editing context, triggering rendering updates, setting or controlling image placement on a drawable surface, managing image composition and updates on an interactive editor canvas through code, enabling automated or scripted drawing of images for dynamic content manipulation, image overlay, or programmatic graphic changes within a visual editing environment.
</div>

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


<div class="meta-api-description">
Refresh or redraw the editing canvas by rendering the current image with all applied transformations, synchronize visual updates, repaint the underlying canvas element, trigger events upon completion, update display after image changes or edits, force canvas re-rendering, repaint preview area, synchronize the image buffer with the visible canvas, control drawing operations on the editing surface, enable immediate visual feedback after modifying or loading images.
</div>

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


<div class="meta-api-description">
Access the native HTMLCanvasElement from the image editor component to manipulate the canvas directly, retrieve the canvas DOM element for low-level canvas operations, obtain the drawing context with getContext(), export image data using toDataURL() or toBlob(), perform custom pixel manipulation or reads, attach native event listeners for advanced interactions, configure or extend drawing capabilities beyond the editor’s built-in tools, and enable integration with other canvas-based APIs or custom rendering workflows by retrieving and controlling the raw canvas element used by the image editor.
</div>

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


<div class="meta-api-description">
Retrieve the 2D drawing context from the image editor’s canvas to access and manipulate pixel data, perform custom rendering, modify images programmatically, obtain canvas pixel maps, apply transformations, draw shapes or images, read or write individual pixels, use canvas APIs like drawImage, getImageData, putImageData, and execute direct pixel operations on the editing surface for enhanced graphic control and interactive editing workflows.
</div>

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


<div class="meta-api-description">
Retrieve or access the currently loaded image within an image editing interface, obtain the active or present image data including its source, dimensions, metadata, or image object for use in transformations, modifications, exporting, or custom rendering workflows. Enable fetching of the current image state after initialization or image loading events, allowing inspection or passing of image information to other editing functions or processing routines. Useful for querying the active image content, interacting with image properties, or integrating with image manipulation features dynamically.
</div>

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


<div class="meta-api-description">
Retrieve the current zoom scale or zoom factor applied in an image editor to obtain the numeric value representing the magnification level, such as 1 for 100%, useful for syncing zoom displays, saving or restoring zoom states, calculating image coordinates or dimensions after zooming, controlling zoom-based logic, or integrating zoom level information in workflows or UI updates.
</div>

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


<div class="meta-api-description">
Run, invoke, perform, or apply image editing operations programmatically by executing named commands with optional parameters to trigger specific editing actions, control image adjustments, or manipulate visuals dynamically during runtime, enabling developers to call editor functions, execute transformation or filter commands, process image changes through command identifiers, and integrate automated or scripted modifications within interactive or batch workflows.
</div>

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


<div class="meta-api-description">
Detect when an image finishes loading to trigger custom actions like inspecting, validating, modifying, or transforming image data before display. Monitor image load completion events to intercept automatic rendering, control behavior by preventing default rendering, cancel or delay image display, and implement custom post-load logic such as filtering, analyzing, or replacing images upon load. Enable event-driven handling for image readiness, load validation, preprocessing, or conditional rendering decisions in image editing workflows.
</div>

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


<div class="meta-api-description">
Trigger notifications when the image editing canvas completes drawing or finishes rendering visual content, enabling detection of when updates, redraws, or image processing operations are done; developers often seek to listen for rendering completion events after applying filters, transformations, or invoking canvas redraw methods to control UI updates, enable save or export buttons, synchronize post-processing tasks like thumbnail generation, or perform additional image adjustments once rendering is finalized.
</div>

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


<div class="meta-api-description">
Detect and handle when image editing actions or commands are run within the editor, including user-triggered operations like toolbar clicks, keyboard shortcuts, or programmatic API calls, enabling you to listen for execution events, respond to command invocations, trigger custom workflows, update interface components, track editing activity, and integrate with undo, redo, or logging mechanisms by capturing every command execution or action performed in the image editing environment.
</div>

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


<div class="meta-api-description">
Detect and respond to failures during image loading by capturing error events, enabling handling of load issues such as broken links, unsupported formats, or network interruptions. Implement error callbacks or listeners to manage fallback actions like showing error messages, triggering retries, fallback images, logging error details for debugging, or notifying users when image resources fail to load within image editing components or interfaces. This covers scenarios involving image load exceptions, failure notifications, error handling workflows, recovery strategies, and diagnostic tracking for image processing failures.
</div>

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

