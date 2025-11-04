---
title: DropDownButton
page_title: Configuration, methods and events of Kendo UI DropDownButton
description: Configuration, methods and events of the Kendo UI DropDownButton
res_type: api
component: dropdownbutton
---

# kendo.ui.DropDownButton

Represents the Kendo UI DropDownButton widget. Inherits from [Widget](/api/javascript/ui/widget).


## Configuration

### enabled `Boolean` *(default: true)*

Indicates whether the **DropDownButton** should be enabled or disabled. By default, it is enabled, unless a `disabled="disabled"` attribute is detected.


<div class="meta-api-description">
How do I make my Kendo UI dropdown button clickable? Control whether the dropdown button is active, clickable, or responsive by setting its enabled state; configure the component to be interactive or non-interactive, toggle button availability, activate or deactivate user input for dropdown menus, manage whether the dropdown trigger can be used or is disabled, and customize the button’s usability at initialization or runtime to control access and functionality.
</div>

#### Example

    <button id="dropdownbutton" type="button">Foo</button>
    <script>
    $("#dropdownbutton").kendoDropDownButton({
        items:[
            { text: "item 1" },
            { text: "item 2" }
        ],
        enabled: false
    });
    </script>


### fillMode `String` *(default: 'solid')*

Controls how the color is applied to the button. Valid values are: `"solid"`, `"outline"`, `"flat"`, `"link"`, and `"none"`. Default value is `"solid"`.


<div class="meta-api-description">
How do I customize the visual appearance of a Kendo UI dropdown button with different fill styles? Adjust how the button applies colors by configuring fill styles such as solid backgrounds, outlined borders, flat designs without depth, link-like appearances, or no fill for minimalistic looks, enabling control over the button’s visual emphasis, background color, border visibility, highlight effects, and how it fits with themes or user interface actions.
</div>

#### Example

    <button id="dropdownbutton" type="button">Cancel</button>
    <script>
        $("#dropdownbutton").kendoDropDownButton({
            items:[
                { text: "item 1" },
                { text: "item 2" }
            ],
            fillMode: "outline"
        });
    </script>

### icon `String`

Defines a name of an existing icon in the Kendo UI theme sprite. The icon will be applied as background image of a `span` element inside the **DropDownButton**.
The `span` element can be added automatically by the widget, or an existing element can be used, if it has a `k-icon` CSS class applied.
For a list of available icon names, please refer to the [Icons demo](https://demos.telerik.com/kendo-ui/web/styling/icons.html).


<div class="meta-api-description">
How do I change the icon in a Kendo UI dropdown button? Configure or customize the dropdown button symbol using named icons from the Kendo UI theme sprite set, enabling developers to specify or change the visual icon displayed within the dropdown trigger element by applying icon names that attach background images to internal span elements with appropriate styling classes. This feature supports various approaches to set or override the default icon, control appearance via theme-consistent iconography, utilize pre-defined icon name references, and integrate with the existing k-icon class for seamless icon embedding inside dropdown buttons, facilitating UI consistency and easy icon swapping in dropdown controls.
</div>

#### Example

    <button id="dropdownbutton" type="button">Cancel</button>
    <script>
    $("#dropdownbutton").kendoDropDownButton({
        items:[
            { text: "item 1" },
            { text: "item 2" }
        ],
        icon: "cancel"
    });
    </script>

### iconClass `String`

Defines a CSS class - or multiple classes separated by spaced - which are applied to a `span` element inside the **DropDownButton**. Allows the usage of custom icons.


<div class="meta-api-description">
How to change the default icon in Kendo UI dropdown button using CSS classes? Configure or customize the icon displayed within a dropdown button by specifying CSS class names, allowing the use of single or multiple space-separated classes to control the visual icon representation. This setting enables adding custom icons, icon fonts, or styled elements inside the dropdown toggle, supporting scenarios like changing default icons, applying icon libraries, modifying styles dynamically, or integrating with design systems. Developers can assign one or more CSS classes to the button’s icon container, facilitating flexible icon customization, alternative indicators, or theming through class-based styling. This is useful for adjusting icon appearance in dropdown menus, toggles, or action buttons where an icon signifies the dropdown action or status.
</div>

#### Example

    <link href="https://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet" />
    <button id="dropdownbutton" type="button">Cancel</button>
    <script>
        $("#dropdownbutton").kendoDropDownButton({
            items:[
                { text: "item 1" },
                { text: "item 2" }
            ],
            iconClass: "fa fa-male"
        });
    </script>

### imageUrl `String`

Defines a URL, which will be used for an `img` element inside the DropDownButton. The URL can be relative or absolute. In case it is relative, it will be evaluated with relation to the web page URL.

The `img` element can be added automatically by the widget, or an existing element can be used, if it has a `k-image` CSS class applied.


<div class="meta-api-description">
How do I set an image URL for a Kendo UI dropdown button? Configure or set an image for a dropdown button using a URL that can be either relative or absolute, enabling display of custom icons or pictures inside the dropdown trigger. Control the visual representation by specifying an image source that integrates seamlessly with web page paths or external links, supporting dynamic image loading and reuse within the dropdown component. Enable embedding of images within dropdown controls, facilitating iconography, branding, or contextual visuals by referencing image URLs or existing elements tagged for image use. Adjust dropdown button appearance by linking images through URLs, allowing customization of button graphics with flexible image sourcing options.
</div>

#### Example

    <button id="dropdownbutton" type="button">Button</button>
    <script>
        $("#dropdownbutton").kendoDropDownButton({
            items:[
                { text: "item 1" },
                { text: "item 2" }
            ],
            imageUrl: "https://demos.telerik.com/kendo-ui/content/web/treeview/edit.png"
        });
    </script>

### items `Array`

Specifies the menu buttons of the **DropDownButton**.


<div class="meta-api-description">
How do I populate the options in a Kendo UI dropdownbutton? Configure, set, or populate the options, entries, choices, or menu items within a drop-down button or menu component, enabling users to select from a list, control available selections, define dropdown entries, customize button options, manage selectable items in a dropdown list, dynamically fill menu buttons, and specify what appears in a collapsible dropdown selection interface.
</div>

#### Example

    <button id="dropdownbutton" type="button">Button</button>
    <script>
        $("#dropdownbutton").kendoDropDownButton({
            items: [
                { id: "item1", text: "Item1", click: function(ev){alert("Item 1 clicked!");} },
                { id: "item2", text: "Item2", icon: "gear", attributes: { "data-context": "some arbitrary data" }},
                { id: "item3", text: "Item3", imageUrl: "https://demos.telerik.com/kendo-ui/content/shared/icons/sports/snowboarding.png"},
                { id: "item4", text: "Item4" },
                { id: "item5", text: "Item5", enabled: false },
                { id: "item6", text: "Item6", hidden: true  }
            ],
        });
    </script>

### items.attributes `Object`

Adds custom attributes to the LI element of the menu button.


<div class="meta-api-description">
How can I customize individual menu items in a Kendo UI dropdown button? Customize individual menu items by setting HTML attributes such as data attributes, ARIA labels, IDs, classes, or other key-value pairs on the list item elements within a dropdown menu, enabling enhanced styling, accessibility improvements, unique identification, and custom behavior for each menu entry. Control and extend the markup of dropdown list items by specifying attributes at the item level, supporting use cases like adding custom data properties, accessibility tags, CSS classes, or element IDs for precise targeting and enhanced user interaction within menu components.
</div>

#### Example

    <button id="dropdownbutton" type="button">Actions</button>
    <script>
        $("#dropdownbutton").kendoDropDownButton({
            items: [
                { 
                    text: "Save", 
                    attributes: { 
                        "data-action": "save",
                        "data-priority": "high",
                        "title": "Save the current document"
                    }
                },
                { 
                    text: "Export", 
                    attributes: { 
                        "data-action": "export",
                        "class": "export-item"
                    }
                }
            ]
        });
    </script>

### items.click `Function`

Adds unique click callback for the menu item.


<div class="meta-api-description">
How do I handle click events on specific items in a Kendo UI dropdown button? Manage and respond to user interactions by assigning specific callback functions or event handlers for each dropdown menu option, enabling custom behavior when a particular item is selected or clicked, configuring per-item click actions to execute distinct functions tied to individual menu entries, setting up unique event responses for dropdown elements, handling item-specific click events, and controlling how dropdown menu selections trigger different processing or logic within the interface.
</div>

#### Example

    <button id="dropdownbutton" type="button">File</button>
    <script>
        $("#dropdownbutton").kendoDropDownButton({
            items: [
                { 
                    text: "New",
                    click: function(e) {
                        console.log("New file clicked");
                        alert("Creating new file...");
                    }
                },
                { 
                    text: "Open",
                    click: function(e) {
                        console.log("Open file clicked", e);
                        alert("Opening file dialog...");
                    }
                },
                { 
                    text: "Save",
                    click: function(e) {
                        console.log("Save clicked", e.item);
                        alert("File saved successfully!");
                    }
                }
            ]
        });
    </script>

### items.data `Function`

Adds a custom data callback to be added to the context of menu item - useful to attach context dynamically.


<div class="meta-api-description">
How to add custom data to each item in a Kendo UI dropdown button? Customize, extend, or enrich menu item content in drop-down buttons by attaching dynamic, per-item contextual data using callbacks that compute, fetch, or inject extra properties for rendering and event handling. Enable templates and interactions to access additional fields tied to each menu option, allowing for dynamic data binding, contextual updates, or personalized item behavior. Control how individual menu entries carry custom metadata, contextual information, or computed values to enhance user interfaces, manage state per option, or support complex event-driven logic within drop-down menus.
</div>

#### Example

    <button id="dropDownButton">Command</button>
    <script>

        var commands = {
            "command_one": function () {
                alert("Command One Executed!")
            },
            "command_two": function () {
                alert("Command Two Executed!")
            },
            "default_command": function () {
                alert("Default Executed!")
            }
        }

        function getContext(item) {
            return {
                command: commands[item.id]
            }
        }

        var dropDownButton = $("#dropDownButton").kendoDropDownButton({
            items: [
                { id: "command_one", text: "Command 1", data: getContext},
                { id: "command_two", text: "Command 2", data: getContext}
            ],
            click: function(ev) {
                if (ev.target.data("command")) {
                    ev.target.data("command")();
                } else {
                    commands["default_command"]();
                }
            }
        }).data("kendoDropDownButton");
    </script>

### items.enabled `Boolean` *(default: true)*

Toggles the enabled state of the item.


<div class="meta-api-description">
How can I dynamically enable or disable specific items in a Kendo UI dropdown button? Control whether specific dropdown menu items are active, selectable, clickable, or grayed out by toggling their enabled state with boolean values; set individual dropdown entries to be interactive or disabled for user input, customize availability per item, manage item activation dynamically, configure item responsiveness within dropdown lists, handle enabling and disabling of menu options programmatically or during initialization, and adjust item accessibility to restrict or allow user selection in dropdown controls.
</div>

#### Example

    <button id="dropdownbutton" type="button">Actions</button>
    <script>
        $("#dropdownbutton").kendoDropDownButton({
            items: [
                { text: "Edit", enabled: true },
                { text: "Delete", enabled: false },  // This item will be disabled
                { text: "Copy", enabled: true },
                { text: "Archive", enabled: false }  // This item will be disabled
            ]
        });
    </script>

### items.hidden `Boolean` *(default: false)*

Indicates wether the item should hidden.


<div class="meta-api-description">
How do I hide specific items in a Kendo UI dropdown button's list using jQuery? Control visibility of individual dropdown menu entries by enabling or disabling their display within the button’s item list, allowing dynamic hiding or showing of specific options based on user actions or programmatic conditions. Configure menu items to be excluded from rendering or dynamically omitted from the dropdown, supporting scenarios where certain entries need to appear or disappear without removing them from the data source. This facilitates conditional visibility, toggling menu elements on or off, controlling availability, managing interactive UI states, and setting whether particular dropdown choices are accessible or hidden during runtime.
</div>

#### Example

    <button id="dropdownbutton" type="button">View</button>
    <script>
        $("#dropdownbutton").kendoDropDownButton({
            items: [
                { text: "Show Details", hidden: false },  // This item will be visible
                { text: "Advanced Options", hidden: true },  // This item will be hidden
                { text: "Export", hidden: false },
                { text: "Debug Mode", hidden: true }  // This item will be hidden
            ]
        });
    </script>

### items.icon `String`

Specifies the icon of the item.


<div class="meta-api-description">
How do I customize the icon for each dropdown menu item in Kendo UI? Set or customize the visual icon for individual dropdown menu entries by specifying icon identifiers, CSS classes, or styles that appear next to the item label, enabling control over how icons are displayed within dropdown buttons, including configuring icons during component initialization, assigning specific symbols or graphic indicators to menu items, and adjusting which icon accompanies each selectable option in a dropdown list.
</div>

#### Example

    <button id="dropdownbutton" type="button">Tools</button>
    <script>
        $("#dropdownbutton").kendoDropDownButton({
            items: [
                { text: "Settings", icon: "gear" },
                { text: "Save", icon: "save" },
                { text: "Print", icon: "print" },
                { text: "Email", icon: "email" }
            ]
        });
    </script>

### items.id `String`

Specifies the id of the item.


<div class="meta-api-description">
How do I assign unique IDs to dropdown menu items in Kendo UI for jQuery? Assign unique identifiers or keys to dropdown menu entries to enable precise selection, manipulation, event handling, and accessibility support by configuring distinct item IDs or unique values for each option within a dropdown control. This facilitates programmatic access, differentiation of items during interactions, setting and retrieving specific selections, managing event callbacks triggered by user choices, and improving screen reader compatibility by providing stable, individual references to each dropdown element. Use unique strings, numbers, or identifiers to distinctly label each menu item for reliable tracking and control within the dropdown interface.
</div>

#### Example

    <button id="dropdownbutton" type="button">Actions</button>
    <script>
        $("#dropdownbutton").kendoDropDownButton({
            items: [
                { id: "new-item", text: "New" },
                { id: "edit-item", text: "Edit" },
                { id: "delete-item", text: "Delete" },
                { id: "duplicate-item", text: "Duplicate" }
            ]
        });
        
        // Later you can access items by their id
        var dropdownbutton = $("#dropdownbutton").data("kendoDropDownButton");
        console.log("Item with id 'edit-item':", dropdownbutton.items().filter('[data-id="edit-item"]'));
    </script>

### items.imageUrl `String`

Specifies the image of the item.


<div class="meta-api-description">
How do I set an image URL for dropdown menu items in Kendo UI DropDownButton? Set or configure the image source URL for dropdown menu items to display icons, thumbnails, or custom images alongside or instead of default symbols in dropdown buttons, enabling visual representation with relative or absolute paths and enhancing menu entry appearance by embedding image links for each dropdown option.
</div>

#### Example

    <button id="dropdownbutton" type="button">Social</button>
    <script>
        $("#dropdownbutton").kendoDropDownButton({
            items: [
                { 
                    text: "Image", 
                    imageUrl: "https://demos.telerik.com/kendo-ui/content/shared/icons/16/photo.png" 
                },
                { 
                    text: "Video", 
                    imageUrl: "https://demos.telerik.com/kendo-ui/content/shared/icons/16/video.png" 
                },
                { 
                    text: "Volume", 
                    imageUrl: "https://demos.telerik.com/kendo-ui/content/shared/icons/16/speaker.png" 
                }
            ]
        });
    </script>

### items.spriteCssClass `String`

Specifies custom css class added to the sprite icon element of the item.


<div class="meta-api-description">
How can I customize the appearance of individual dropdown button item icons in Kendo UI? Customize and control the appearance of individual dropdown button item icons by assigning specific CSS class names to their sprite elements, enabling targeted styling, theming adjustments, visual customization, icon theming, applying custom styles, adding hooks for automation or testing, integrating unique visual markers, modifying sprite icon looks, and controlling icon presentation within dropdown lists through configurable class assignments.
</div>

#### Example

    <style>
        .custom-icon { width: 16px; height: 16px; background-color: #ff6358; }
        .warning-icon { width: 16px; height: 16px; background-color: #ffa500; }
        .success-icon { width: 16px; height: 16px; background-color: #28a745; }
    </style>
    <button id="dropdownbutton" type="button">Status</button>
    <script>
        $("#dropdownbutton").kendoDropDownButton({
            items: [
                { text: "Error", spriteCssClass: "custom-icon" },
                { text: "Warning", spriteCssClass: "warning-icon" },
                { text: "Success", spriteCssClass: "success-icon" }
            ]
        });
    </script>

### items.text `String`

Specifies the text of the item.


<div class="meta-api-description">
How do I change the display text for individual options in a Kendo UI dropdown menu? Control or configure the visible label, title, caption, or display text of individual options within a dropdown menu or selection button, enabling customization of item names, menu entries, choice labels, and rendered strings shown to users. Set or update the textual content for each dropdown item’s display in menus, lists, or interactive UI elements, ensuring clear, descriptive, or dynamic naming, binding item labels, or adjusting captions in dropdown components. Adjust, specify, or manage the readable text that identifies menu selections, list entries, or dropdown options to enhance user interface clarity and interaction.
</div>

#### Example

    <button id="dropdownbutton" type="button">Choose Language</button>
    <script>
        $("#dropdownbutton").kendoDropDownButton({
            items: [
                { text: "English" },
                { text: "Español" },
                { text: "Français" },
                { text: "Deutsch" },
                { text: "日本語" }
            ]
        });
    </script>

### items.url `String`

Specifies the url of the item - it will render `a` element and will navigate the browser on click.


<div class="meta-api-description">
How to make dropdown menu items in Kendo UI for jQuery navigate to a specific URL? Set or configure a dropdown menu item to function as a clickable link that navigates the browser to a specified web address or URL when selected, enabling link behavior within dropdown menus by defining the destination URL for navigation, supporting use cases such as redirecting users, linking to external sites, or triggering page loads through dropdown item clicks, allowing seamless integration of hyperlinks in dropdown controls and controlling navigation targets directly from menu items.
</div>

#### Example

    <button id="dropdownbutton" type="button">Quick Links</button>
    <script>
        $("#dropdownbutton").kendoDropDownButton({
            items: [
                { text: "Google", url: "https://www.google.com" },
                { text: "Kendo UI Demos", url: "https://demos.telerik.com/kendo-ui/" },
                { text: "Documentation", url: "https://docs.telerik.com/kendo-ui/" },
                { text: "Support", url: "https://www.telerik.com/support/kendo-ui" }
            ]
        });
    </script>

### itemTemplate `String|Function`

Specifies a custom template for the menu items.


<div class="meta-api-description">
How can I customize the appearance of dropdown menu items in Kendo UI for jQuery? Customize the rendering of dropdown menu items by defining templates that control layout, design, and content formatting, enabling the inclusion of icons, styled text, dynamic data binding, and complex structures within each menu entry. Enable tailored presentations for dropdown options through configurable templates that dictate how list items appear, supporting advanced customization of item visuals, interactive elements, and markup to match specific UI requirements. Configure menu item appearance with flexible templating to implement personalized layouts, embed images or icons, apply rich text formatting, and manage data-driven rendering for dropdown selections. Control the structure, styling, and data representation of dropdown list items by setting custom templates that transform how each menu option is displayed, supporting various design needs and interactive user interface patterns.
</div>

#### Example

    <button id="dropDownButton">Click me!</button>
    <script>
        $("#dropDownButton").kendoDropDownButton({
            items: [
                { text: "Item 1" },
                { text: "Item 2" },
                { text: "Item 3" }
            ],
            itemTemplate: "<span class=\"k-link k-menu-link\"><strong>#:text#</strong></span>"
        });
    </script>

### popup `Object`

The options that will be used for the popup initialization. For more details about the available options
refer to [Popup](/api/javascript/ui/popup) documentation.


<div class="meta-api-description">
How to control the dropdown menu animation in Kendo UI for jQuery? Control and customize the dropdown menu or popup panel triggered by a button, including settings for positioning, animation effects, open and close behavior, attachment points, and popup appearance. Configure options to define how the popup is initialized, displayed, and behaves in response to user interaction or events. Adjust properties to enable dynamic dropdown content, control popup lifecycle, manage animation timing, align popup placement relative to the button, and fine-tune interaction patterns such as tap, hover, or focus triggers. This encompasses controlling how the dropdown container renders, when it opens or closes, and how it attaches within the UI hierarchy, ensuring flexible configuration of popup behavior in various contexts.
</div>

#### Example

    <button id="dropdownbutton" type="button">Options</button>
    <script>
        $("#dropdownbutton").kendoDropDownButton({
            items: [
                { text: "Option 1" },
                { text: "Option 2" },
                { text: "Option 3" }
            ],
            popup: {
                origin: "bottom left",
                position: "top left",
                anchor: "left",
                appendTo: "body",
                animation: {
                    open: { effects: "fadeIn" },
                    close: { effects: "fadeOut" }
                }
            }
        });
    </script>

### popup.appendTo `String` *(default: document.body)*

Defines a jQuery selector that will be used to find a container element, where the popup will be appended to. The element needs to be relatively positioned.


<div class="meta-api-description">
How do I specify where the dropdown button popup is attached in a Kendo UI for jQuery dropdownbutton? Control and configure the container element or parent node where the dropdown popup or menu is added in the document object model, specifying a CSS selector or jQuery-style selector string to set the attachment target for the popup overlay, ensuring proper placement, positioning, and layering inside a relatively positioned ancestor or container for consistent rendering, avoiding issues with overflow, z-index, or clipping, and enabling custom placement within modals, containers, or specific sections of the page where the dropdown content should appear.
</div>

#### Example

    <div id="container" style="position: relative; width: 500px; height: 300px; border: 1px solid #ccc;">
        <p>This is a container with relative positioning</p>
        <button id="dropdownbutton" type="button">Actions</button>
    </div>
    <script>
        $("#dropdownbutton").kendoDropDownButton({
            items: [
                { text: "Edit" },
                { text: "Delete" },
                { text: "Archive" }
            ],
            popup: {
                appendTo: "#container"  // Popup will be appended to the container div
            }
        });
    </script>

### rounded `String` *(default: 'medium')*

Controls what border radius is applied to a button. Valid values are: `"small"`, `"medium"`, `"large"`, `"full"`, and `"none"`. Default value is `"medium"`.


<div class="meta-api-description">
How can I customize the appearance of rounded corners for a Kendo UI dropdown button? Adjust the shape and curvature of dropdown menu buttons by configuring corner roundness, border radius, or edge styling to achieve small, medium, large, full circle, or no rounding effects for rounded corners, button shape customization, or UI styling preferences during initialization or dynamic updates.
</div>

#### Example

    <button id="dropdownbutton" type="button">Cancel</button>
    <script>
        $("#dropdownbutton").kendoDropDownButton({
            items:[
                { text: "item 1" },
                { text: "item 2" }
            ],
            rounded: "full"
        });
    </script>

### size `String` *(default: 'medium')*

Controls the overall physical size of a button. Valid values are:  `"small"`, `"medium"`, `"large"`, and `"none"`. Default value is `"medium"`.


<div class="meta-api-description">
How do I adjust the size of a Kendo UI DropdownButton? Adjust the overall dimensions and footprint of the dropdown button by configuring its size to control spacing, visual density, and appearance, choosing from options like small, medium, large, or none to make the button compact, prominent, minimized, or standard; this setting helps tailor UI components for different layouts, responsiveness, user interface density preferences, and visual hierarchy, enabling developers to set, scale, customize, or tune the dropdown trigger’s physical presence in forms, menus, toolbars, or interactive elements.
</div>

#### Example

    <button id="dropdownbutton" type="button">Cancel</button>
    <script>
        $("#dropdownbutton").kendoDropDownButton({
            items:[
                { text: "item 1" },
                { text: "item 2" }
            ],
            size: "large"
        });
    </script>

### spriteCssClass `String`

Defines a CSS class (or multiple classes separated by spaces), which will be used for applying a background image to a `span` element inside the **DropDownButton**.
In case you want to use an icon from the Kendo UI theme sprite background image, it is easier to use the [`icon` property](/api/javascript/ui/button#configuration-icon).

The `span` element can be added automatically by the widget, or an existing element can be used, if it has a `k-sprite` CSS class applied.


<div class="meta-api-description">
How do I customize the icon styles on a Kendo UI dropdown button? Set or customize icon styles on dropdown buttons by assigning one or multiple CSS classes that apply sprite images or background icons, enabling the display of graphical indicators through CSS sprites, background images, or predefined sprite classes on internal elements within the button; this includes configuring CSS sprite-based visuals, controlling icon appearance with class names, and integrating theme or custom icon styles using sprite CSS classes to enhance button UI consistently.
</div>

#### Example

    <button id="dropdownbutton" type="button">Button</button>
    <script>
        $("#dropdownbutton").kendoDropDownButton({
            items:[
                { text: "item 1" },
                { text: "item 2" }
            ],
            spriteCssClass: "myEditIcon"
        });
    </script>

### showArrowButton `Boolean`*(default: false)*

Configures the DropDownButton to render a down arrow that opens and closes its popup.


<div class="meta-api-description">
How do I configure the dropdown button's arrow to function independently? Configure the appearance and behavior of a dropdown control’s toggle indicator by enabling or disabling a distinct arrow button that opens or closes the popup menu separately from the main clickable area, allowing users to set whether the dropdown arrow functions independently as a trigger to open or collapse the menu, separate from the primary button action, providing control over user interface interaction patterns, dropdown toggling methods, and the separation between main button commands and menu access.
</div>

#### Example

    <button id="dropdownbutton" type="button">Foo</button>
    <script>
    $("#dropdownbutton").kendoDropDownButton({
        items:[
            { text: "item 1" },
            { text: "item 2" }
        ],
        showArrowButton: true
    });
    </script>


### themeColor `String` *(default: 'base')*

Controls the main color applied to the button. Valid values are:  `"base"`, `"primary"`, `"secondary"`, `"tertiary"`, `"info"`, `"success"`, `"warning"`, `"error"`, `"dark"`, `"light"`, `"inverse"`, and `"none"`. Default value is `"base"`.


<div class="meta-api-description">
How do I customize the color of Kendo UI dropdown buttons? Set or customize the main color scheme, accent, or theme tone of dropdown buttons to align with user interface design, selecting from common palette options like primary, secondary, tertiary, informational, success, warning, error, dark mode, light mode, inverse styles, or no color styling. Control the visual appearance by configuring the color style or theme palette of button dropdowns, enabling developers to match branding colors, enable consistent UI themes, toggle color variations for feedback states, and apply predefined or neutral color options across different contexts or design systems.
</div>

#### Example

    <button id="dropdownbutton" type="button">Cancel</button>
    <script>
        $("#dropdownbutton").kendoDropDownButton({
            items:[
                { text: "item 1" },
                { text: "item 2" }
            ],
            themeColor: "dark"
        });
    </script>

### messages `Object` 

Allows localization of the strings that are used in the widget.


<div class="meta-api-description">
How can I customize the dropdown menu labels in Kendo UI for jQuery? Customize and translate dropdown menu labels, button captions, interface text, and user-facing messages by configuring localization settings, enabling language-specific wording, modifying UI strings, adjusting text content for various locales, setting customized prompts, and tailoring dropdown button labels and alerts to fit different languages and regional preferences.
</div>

#### Example

    <button id="dropdownbutton" type="button">Cancel</button>
    <script>
        $("#dropdownbutton").kendoDropDownButton({
            items:[
                { text: "item 1" },
                { text: "item 2" }
            ],
            messages: {
                labelSuffix: "Button"
            }
        });
    </script>

### messages.labelSuffix `String` 

Controls the label suffix that will be used for the aria-label attribute.


<div class="meta-api-description">
How to customize the accessible aria-label suffix for Kendo UI dropdown buttons? Configure or customize the accessible aria-label suffix for dropdown buttons to improve screen reader descriptions, control the label ending text for better accessibility, set or modify the assistive technology label suffix on dropdown UI elements, adjust aria-label suffixes for dropdown controls to enhance voiceover clarity and usability, manage the suffix portion of aria-labels for dropdown interactions, and tailor accessibility label endings for dropdown components to ensure inclusive user experiences.
</div>

#### Example

    <button id="dropdownbutton" type="button">Cancel</button>
    <script>
        $("#dropdownbutton").kendoDropDownButton({
            items:[
                { text: "item 1" },
                { text: "item 2" }
            ],
            messages: {
                labelSuffix: "MenuButton" // inspect the aria-label attribute in the browser console
            }
        });
    </script>

## Methods

### enable

Enables or disables the DropDownButton and all the items in the Button list.


<div class="meta-api-description">
How do I enable or disable a Kendo UI for jQuery dropdown button programmatically? Control the interactive state of a dropdown button and its menu options dynamically by enabling or disabling the entire component along with all associated list items at runtime. Configure the dropdown’s usability to activate or deactivate user interaction, toggle availability, or set enabled status programmatically, adjusting both the main button and each individual menu entry simultaneously. Manage runtime interactivity changes, switch dropdown functionality on or off, and control whether the button and its items respond to user input via boolean state settings for fully customizable user interface behavior.
</div>

#### Parameters

##### state `Boolean`

Indicates whether the **DropDownButton** should be enabled or disabled. `true` and `false` arguments are accepted. If no argument is supplied, the **DropDownButton** will assume `true` and will be enabled.

##### items `String|jQuery`

Collection of the items to disabled/enabled.

#### Example

    <button id="dropdownbutton" type="button">Button</button>
    <script>
        $("#dropdownbutton").kendoDropDownButton({
            items:[
                { text: "item 1" },
                { text: "item 2" }
            ]
        });
        var button = $("#dropdownbutton").data("kendoDropDownButton");
        // disable button
        button.enable(false);
    </script>

#### Example - disable a specific item

    <button id="dropdownbutton" type="button">Button</button>
    <script>
        $("#dropdownbutton").kendoDropDownButton({
            items:[
                { id: "item1", text: "Item 1" },
                { id: "item2", text: "Item 2" }
            ]
        });
        var button = $("#dropdownbutton").data("kendoDropDownButton");
        
        button.enable(false, "#item1");
    </script>

#### Example - disable a collection of items

    <button id="dropdownbutton" type="button">Button</button>
    <script>
        $("#dropdownbutton").kendoDropDownButton({
            items:[
                { id: "item1", text: "Item 1" },
                { id: "item2", text: "Item 2" }
            ]
        });
        var button = $("#dropdownbutton").data("kendoDropDownButton");
        
        button.enable(false, $("#item1, #item2"));
    </script>

### hide

Hides an item.


<div class="meta-api-description">
How do I programmatically hide menu items in Kendo UI dropdown button? Control the visibility of individual menu items within a dropdown button by programmatically removing or hiding specific actions or options from the popup menu after the component is initialized, enabling dynamic modification of dropdown contents based on user behavior, application state, access permissions, or conditional logic, allowing developers to enable, disable, show, hide, or toggle menu entries in response to interactions or runtime conditions.
</div>

#### Parameters
##### items `String|jQuery`

Collection of the items to hide.

#### Example

    <button id="dropdownbutton" type="button">Button</button>
    <script>
        $("#dropdownbutton").kendoDropDownButton({
            items:[
                { id: "item1", text: "Item 1" },
                { id: "item2", text: "Item 2" }
            ]
        });
        var button = $("#dropdownbutton").data("kendoDropDownButton");
        
        button.hide($("#item1"));
    </script>

### show

Shows an item.


<div class="meta-api-description">
How do I programmatically show a specific menu item in a Kendo UI dropdownbutton? Control programmatically revealing or displaying a specific menu item within a dropdown interface, enabling developers to dynamically show hidden options, force the visibility of particular choices, open or expand dropdown selections by code, trigger the display of specific menu entries after initialization, and configure how items appear on demand for interactive user experiences or conditional menus.
</div>

#### Parameters
##### items `String|jQuery`

Collection of the items to show.

#### Example

    <button id="dropdownbutton" type="button">Button</button>
    <script>
        $("#dropdownbutton").kendoDropDownButton({
            items:[
                { id: "item1", text: "Item 1" },
                { id: "item2", text: "Item 2" }
            ]
        });
        var button = $("#dropdownbutton").data("kendoDropDownButton");
        
        button.show($("#item1"));
    </script>

### items

Returns the menu items as DOM elements wrapped in jQuery collection.


<div class="meta-api-description">
How can I access the dropdown menu items in Kendo UI for jQuery? Access and manipulate the menu item elements within a dropdown button by retrieving the list of rendered items as DOM nodes or jQuery collections to inspect, iterate, modify classes, dynamically add or remove items, attach event listeners, bind custom events, measure dimensions, or programmatically interact with the dropdown options for customization, event handling, UI updates, or advanced control of dropdown content and behavior.
</div>

#### Example

    <button id="dropdownbutton" type="button">Button</button>
    <script>
        $("#dropdownbutton").kendoDropDownButton({
            items:[
                { id: "item1", text: "Item 1" },
                { id: "item2", text: "Item 2" }
            ]
        });
        var button = $("#dropdownbutton").data("kendoDropDownButton");
        
        var items = button.items();
        console.log(items);
    </script>

### open

Opens the button menu.


<div class="meta-api-description">
How can I programmatically open a dropdown menu in Kendo UI for jQuery? Trigger the dropdown menu to open programmatically, enabling dynamic display of popup lists or option menus without user click or tap. Control and invoke the dropdown opening behavior through code, simulate user interaction, respond to custom events, keyboard shortcuts, or conditional logic to reveal choices, menu items, or actionable lists on demand. Enable automatic showing of popup menus, activate dropdown panels from scripts, and manage the visibility of option lists in a way that mimics direct user activation or focuses on accessibility and event-driven interfaces.
</div>

#### Example

    <button id="dropdownbutton" type="button">Button</button>
    <script>
        $("#dropdownbutton").kendoDropDownButton({
            items:[
                { id: "item1", text: "Item 1" },
                { id: "item2", text: "Item 2" }
            ]
        });
        var button = $("#dropdownbutton").data("kendoDropDownButton");
        
        button.open();
    </script>

### close

Closes the button menu.


<div class="meta-api-description">
How do I programmatically close a dropdown menu with Kendo UI for jQuery? Programmatically hiding or dismissing a dropdown menu, closing the dropdown popup or overlay, collapsing an open menu, triggering menu closure after user interaction, custom actions, or external events, controlling dropdown visibility through code, automating menu dismissal for conditional UI states, toggling dropdown menus off, setting dropdown state to closed programmatically, and managing dropdown menu open/close behavior in scripts or event handlers.
</div>

#### Example

    <button id="dropdownbutton" type="button">Button</button>
    <script>
        $("#dropdownbutton").kendoDropDownButton({
            items:[
                { id: "item1", text: "Item 1" },
                { id: "item2", text: "Item 2" }
            ]
        });
        var button = $("#dropdownbutton").data("kendoDropDownButton");
        
        button.close();
    </script>

## Events

### click

Fires when the **DropDownButton** or any if its items is clicked with the mouse, touched on a touch device, or ENTER (or SPACE) is pressed while the **DropDownButton** or an item is focused.


<div class="meta-api-description">
How do I handle click events on Kendo UI for jQuery DropdownButton? Detect and respond to user interactions that activate a dropdown button or its menu items across mouse clicks, touch gestures, keyboard presses such as ENTER or SPACE, enabling customization of behavior on button press, item selection, or keyboard activation, supporting event handling for clicks, taps, keyboard navigation, accessibility input, and interactive UI control for dropdown triggers and option selections.
</div>

#### Event Data

##### e.originalEvent `Object`

The original DOM event.

##### e.target `jQuery`

The DOM element fired the event wrapped in jQuery object.

##### e.id `String`

The id of the element, which fired the event, wrapped in jQuery object. 

#### Example - subscribe to the "click" event during initialization

    <button id="dropdownbutton" type="button">Button</button>
    <script>
        $("#dropdownbutton").kendoDropDownButton({
            items:[
                { id: "item1", text: "item 1" },
                { id: "item2", text: "item 2" }
            ],
            click: function(e) {
                console.log(e.id + " clicked!");
            }
        });
    </script>

#### Example - subscribe to the "click" event after initialization

    <button id="dropdownbutton" type="button">Button</button>
    <script>
        $("#dropdownbutton").kendoDropDownButton({
            items:[
                { text: "item 1" },
                { text: "item 2" }
            ]
        });
        var button = $("#dropdownbutton").data("kendoDropDownButton");
        button.bind("click", function(e) {
            console.log(e.id + " clicked!");
        });
    </script>

### open

Fires when the menu button is opened. 


<div class="meta-api-description">
How to detect when Kendo UI DropDownButton menu opens? Trigger custom actions or functions when a dropdown menu or button opens, enabling detection of menu opening events to start animations, manage focus, dynamically load menu content, update interface elements, track user activity, or handle UI state changes in response to the menu becoming visible or active.
</div>

#### Example

    <button id="dropdownbutton" type="button">Button</button>
    <script>
        $("#dropdownbutton").kendoDropDownButton({
            items:[
                { id: "item1", text: "item 1" },
                { id: "item2", text: "item 2" }
            ],
            open: function(e) {
                console.log("Opened!");
            }
        });
    </script>

### close

Fires when the menu button is closed. 


<div class="meta-api-description">
How do I detect when a Kendo UI dropdown button closes in jQuery? Detect when a dropdown menu or button closes to trigger actions like updating the interface, restoring keyboard focus, logging user interactions, performing cleanup tasks, re-enabling disabled elements, or synchronizing application state after the menu or popup disappears. Capture or listen for menu close events, handle menu dismissal events, respond to dropdown or popup closure signals, and execute callbacks or event handlers that run once a menu or dropdown has been shut, ensuring UI consistency and state management following closure actions.
</div>

#### Example

    <button id="dropdownbutton" type="button">Button</button>
    <script>
        $("#dropdownbutton").kendoDropDownButton({
            items:[
                { id: "item1", text: "item 1" },
                { id: "item2", text: "item 2" }
            ],
            close: function(e) {
                console.log("Closed!");
            }
        });
    </script>
