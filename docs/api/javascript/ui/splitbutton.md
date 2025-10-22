---
title: SplitButton
page_title: Configuration, methods and events of Kendo UI SplitButton
description: Configuration, methods and events of the Kendo UI SplitButton
res_type: api
component: splitbutton
---

# kendo.ui.SplitButton

Represents the Kendo UI SplitButton widget. Inherits from [Widget](/api/javascript/ui/widget).


## Configuration

### arrowIcon `String` *(default: 'caret-alt-down')*

The icon rendered for the arrow button of the **SplitButton**.


<div class="meta-api-description">
Control, configure, or customize the icon displayed for dropdown toggles, arrow indicators, or expand buttons in split button components to visually signal menu or options expansion; set, change, or replace the arrow icon, toggle arrow graphic, or dropdown indicator to match design requirements, style preferences, or UI standards, enabling clear user recognition of expandable menus and improving user interface consistency and visual feedback for actionable split buttons with integrated dropdowns.
</div>

#### Example

    <button id="splitbutton" type="button">Foo</button>
    <script>
    $("#splitbutton").kendoSplitButton({
        items:[
            { text: "item 1" },
            { text: "item 2" }
        ],
        arrowIcon: "caret-alt-up"
    });
    </script>

### enabled `Boolean` *(default: true)*

Indicates whether the **SplitButton** should be enabled or disabled. By default, it is enabled, unless a `disabled="disabled"` attribute is detected.


<div class="meta-api-description">
Control whether the button component is active, responsive, or interactive by configuring its enabled or disabled state, allowing developers to set if the button should accept clicks, user input, or be inactive on initialization or dynamically, managing its usability, interactivity, and user engagement through properties or attributes that toggle its operational state between enabled and disabled modes.
</div>

#### Example

    <button id="splitbutton" type="button">Foo</button>
    <script>
    $("#splitbutton").kendoSplitButton({
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
Adjusting button style for visual emphasis and color application, configuring the fill style of a split button using options like solid fill, outlined border, flat appearance without depth, link-style text button, or no background fill, enabling customization of button backgrounds, borders, and overall look to match themes or design preferences, controlling whether the button is fully colored, just outlined, flat and minimal, styled as a hyperlink, or transparent for different UI emphasis and interaction cues.
</div>

#### Example

    <button id="splitbutton" type="button">Cancel</button>
    <script>
        $("#splitbutton").kendoSplitButton({
            items:[
                { text: "item 1" },
                { text: "item 2" }
            ],
            fillMode: "outline"
        });
    </script>

### icon `String`

Defines a name of an existing icon in the Kendo UI theme sprite. The icon will be applied as background image of a `span` element inside the **SplitButton**.
The `span` element can be added automatically by the widget, or an existing element can be used, if it has a `k-icon` CSS class applied.
For a list of available icon names, please refer to the [Icons demo](https://demos.telerik.com/kendo-ui/web/styling/icons.html).


<div class="meta-api-description">
Configure or assign an icon for the split button using theme-based sprite icons by specifying the icon name to display consistent visual symbols, apply custom or predefined icons to control the button appearance with background images, set icons via CSS classes or automatically generated elements, customize button iconography for user interface clarity, and utilize theme icon sets for cohesive design integration by referencing available icon names or sprite resources.
</div>

#### Example

    <button id="splitbutton" type="button">Cancel</button>
    <script>
    $("#splitbutton").kendoSplitButton({
        items:[
            { text: "item 1" },
            { text: "item 2" }
        ],
        icon: "cancel"
    });
    </script>

### iconClass `String`

Defines a CSS class - or multiple classes separated by spaced - which are applied to a `span` element inside the **SplitButton**. Allows the usage of custom icons.


<div class="meta-api-description">
Control and customize the icon appearance by applying one or more CSS classes to the icon element within a split button, enabling developers to style, change, or replace the default icon using custom class names, icon fonts, or CSS rules; configure icon visuals by setting class attributes to modify size, color, layout, or to integrate third-party icon libraries, allowing flexible icon customization, styling overrides, and theming of the split button’s icon area.
</div>

#### Example

    <link href="https://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet" />
    <button id="splitbutton" type="button">Cancel</button>
    <script>
        $("#splitbutton").kendoSplitButton({
            items:[
                { text: "item 1" },
                { text: "item 2" }
            ],
            iconClass: "fa fa-male"
        });
    </script>

### imageUrl `String`

Defines a URL, which will be used for an `img` element inside the SplitButton. The URL can be relative or absolute. In case it is relative, it will be evaluated with relation to the web page URL.

The `img` element can be added automatically by the widget, or an existing element can be used, if it has a `k-image` CSS class applied.


<div class="meta-api-description">
Configure or set the icon image source for a split button by specifying a URL or path, including absolute or relative links, to display a custom graphic or icon within the button. Enable using external or local image files to control the visual representation of the button’s icon, automatically embedding an image element or leveraging existing markup with appropriate styling classes for flexible icon customization in user interfaces. Adjust the button icon by providing image addresses that resolve relative to the hosting page or directly link to resources, facilitating tailored visual cues and enhanced interactive design.
</div>

#### Example

    <button id="splitbutton" type="button">Button</button>
    <script>
        $("#splitbutton").kendoSplitButton({
            items:[
                { text: "item 1" },
                { text: "item 2" }
            ],
            imageUrl: 'https://demos.telerik.com/kendo-ui/content/shared/icons/16/star.png'
        });
    </script>

### items `Array`

Specifies the menu buttons of the **SplitButton**.


<div class="meta-api-description">
Configure and customize the dropdown menu options for secondary actions associated with a split button interface by specifying a list or array of button elements, each defining labels, icons, event handlers, and ordering preferences. This setting lets developers add, remove, reorder, or modify the menu entries tied to the split button’s additional commands or alternate choices, controlling how multiple related buttons or commands are presented in the pop-up menu. Enable flexible, dynamic action lists attached to a primary combined button, managing button text, visuals, click events, and menu item arrangement to tailor user interactions and control secondary functionalities within split button components.
</div>

#### Example

    <button id="splitbutton" type="button">Button</button>
    <script>
        $("#splitbutton").kendoSplitButton({
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
Assign custom HTML attributes such as data attributes, ARIA labels, IDs, classes, and other element properties to individual menu items within a split button or dropdown list to enable fine-grained control over styling, accessibility enhancements, keyboard navigation aids, event tracking hooks, or dynamic data binding on list item elements. This supports configuring element identifiers, accessibility roles, custom data-* properties, CSS class names, and other attribute customizations at initialization or runtime, helping with UI customization, screen reader support, automated testing targeting, and integrating with frameworks that rely on attribute hooks.
</div>

#### Example

    <button id="splitButton">Command</button>
    <script>
        $("#splitButton").kendoSplitButton({
            items: [
                { text: "Item 1", attributes: { "data-value": "value1", "data-info": "custom" } },
                { text: "Item 2", attributes: { "data-value": "value2", "class": "special-item" } }
            ]
        });
    </script>

### items.click `Function`

Adds unique click callback for the menu item.


<div class="meta-api-description">
Trigger custom actions, execute unique functions, or handle individual menu options when a user selects or clicks a specific button or submenu item within a split button component by assigning distinct event handlers or callbacks to each menu entry, allowing precise control over item-specific click behavior, click event listeners, or item-based command execution tailored to each menu choice, enabling developers to respond dynamically to user interactions on separate split button menu items.
</div>

#### Example

    <button id="splitButton">Command</button>
    <script>
        $("#splitButton").kendoSplitButton({
            items: [
                { 
                    text: "Save", 
                    click: function(e) {
                        console.log("Save clicked", e);
                        alert("Document saved!");
                    }
                },
                { 
                    text: "Delete", 
                    click: function(e) {
                        console.log("Delete clicked", e);
                        if (confirm("Are you sure?")) {
                            alert("Document deleted!");
                        }
                    }
                }
            ]
        });
    </script>

### items.data `Function`

Adds a custom data callback to be added to the context of menu item - useful to attach context dynamically.


<div class="meta-api-description">
Attach dynamic metadata or custom runtime data to menu items by configuring callback functions that inject extra fields, properties, or context-specific information into each menu entry. Enable passing additional data or contextual parameters to event handlers, templates, or click logic within button menus, facilitating dynamic content, behavior customization, and state management for user interface components that require flexible, programmable metadata integration in menu options.
</div>

#### Example

    <button id="splitButton">Command</button>
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

        var splitButton = $("#splitButton").kendoSplitButton({
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
        }).data("kendoSplitButton");
    </script>

### items.enabled `Boolean` *(default: true)*

Toggles the enabled state of the item.


<div class="meta-api-description">
Control whether each option or entry within a segmented menu or dropdown button is active, selectable, clickable, or disabled by toggling its interactive state; configure individual elements to be enabled or disabled for user interaction, allowing granular control over which menu items respond to clicks, are accessible, or appear inactive, helping manage item availability, user permissions, or contextual functionality within composite or split button interfaces.
</div>

#### Example

    <button id="splitButton">Command</button>
    <script>
        $("#splitButton").kendoSplitButton({
            items: [
                { text: "Available Option", enabled: true },
                { text: "Disabled Option", enabled: false },
                { text: "Another Available", enabled: true }
            ]
        });
    </script>

### items.hidden `Boolean` *(default: false)*

Indicates wether the item should hidden.


<div class="meta-api-description">
Control visibility of individual menu entries within a split button interface by toggling item display dynamically or statically, enabling developers to hide or show specific options based on user interactions, application state, or conditional logic, using boolean flags or data bindings to manage whether particular menu items appear or remain hidden in the dropdown list.
</div>

#### Example

    <button id="splitButton">Command</button>
    <script>
        $("#splitButton").kendoSplitButton({
            items: [
                { text: "Visible Option", hidden: false },
                { text: "Hidden Option", hidden: true },
                { text: "Another Visible", hidden: false }
            ]
        });
    </script>

### items.icon `String`

Specifies the icon of the item.


<div class="meta-api-description">
Configure or customize the icon displayed alongside SplitButton menu items using various formats such as icon fonts, CSS classes, built-in icon sets, SVG graphics, or image resources. Control or set the visual indicators next to each dropdown option, enabling you to enhance button item representation by assigning specific graphical elements or symbols, supporting different rendering methods for flexible UI design and visual customization in interactive button menus.
</div>

#### Example

    <button id="splitButton">Command</button>
    <script>
        $("#splitButton").kendoSplitButton({
            items: [
                { text: "Save", icon: "save" },
                { text: "Download", icon: "download" },
                { text: "Print", icon: "print" }
            ]
        });
    </script>

### items.id `String`

Specifies the id of the item.


<div class="meta-api-description">
Set or configure a unique string identifier to reference, target, or locate a specific item within a split button’s collection, enabling precise access for event handling, dynamic modifications, or accessibility improvements such as ARIA attributes, ensuring seamless interaction and manipulation of individual dropdown or menu options by their distinct id value.
</div>

#### Example

    <button id="splitButton">Command</button>
    <script>
        $("#splitButton").kendoSplitButton({
            items: [
                { text: "Option 1", id: "option-1" },
                { text: "Option 2", id: "option-2" },
                { text: "Option 3", id: "option-3" }
            ]
        });
    </script>

### items.imageUrl `String`

Specifies the image of the item.


<div class="meta-api-description">
Set or configure the visual icon, picture, or image source URL displayed next to or alongside a menu item within a split button control, enabling the inclusion of graphics, symbols, or thumbnails for individual menu entries to enhance UI clarity, support customization, and improve user recognition; supports setting image paths, URLs, or icon links for items in split buttons, allowing developers to add illustrative images, icons, or visual markers paired with menu text labels in dropdown or split menu components.
</div>

```pseudo
    <button id="splitButton">Command</button>
    <script>
        $("#splitButton").kendoSplitButton({
            items: [
                { text: "Profile", imageUrl: "/images/profile.png" },
                { text: "Settings", imageUrl: "/images/settings.png" },
                { text: "Help", imageUrl: "/images/help.png" }
            ]
        });
    </script>
```

### items.spriteCssClass `String`

Specifies the custom CSS class that is added to the sprite icon element of the item.


<div class="meta-api-description">
Customize or control the icon style for individual menu items by setting or configuring CSS classes that define sprite icons, enabling developers to assign specific icon classes, modify icon appearance, set or override default button item icons, apply custom styling for each SplitButton option, integrate icon fonts or sprite sheets, and manage visual identification of item icons through CSS class names during component setup or runtime adjustments.
</div>

#### Example

    <button id="splitButton">Command</button>
    <script>
        $("#splitButton").kendoSplitButton({
            items: [
                { text: "Home", spriteCssClass: "k-sprite sprite-home" },
                { text: "Dashboard", spriteCssClass: "k-sprite sprite-dashboard" },
                { text: "Reports", spriteCssClass: "k-sprite sprite-reports" }
            ]
        });
    </script>

### items.text `String`

Specifies the text of the item.


<div class="meta-api-description">
Define or customize the displayed label, caption, or title for each item in a dropdown menu or split button list, including setting, binding, or updating the visible text shown to users in a menu item, option label, or dropdown entry, controlling what string or data-bound value appears as the menu item’s name or description in UI components that present selectable choices, menus, or action buttons.
</div>

#### Example

    <button id="splitButton">Command</button>
    <script>
        $("#splitButton").kendoSplitButton({
            items: [
                { text: "New Document" },
                { text: "Open Document" },
                { text: "Save Document" },
                { text: "Print Document" }
            ]
        });
    </script>

### items.url `String`

Specifies the url of the item - it will render `a` element and will navigate the browser on click.


<div class="meta-api-description">
Configure navigation links on menu items to direct users to specific web addresses or URLs when clicked, enabling menu options to act as hyperlinks by assigning target links to individual button entries, controlling browser redirection via item clicks, setting clickable link destinations within dropdown or split button controls, and integrating URL properties to trigger page navigation from interactive button elements.
</div>

#### Example

    <button id="splitButton">Command</button>
    <script>
        $("#splitButton").kendoSplitButton({
            items: [
                { text: "Home", url: "/home" },
                { text: "Products", url: "/products" },
                { text: "Support", url: "/support" },
                { text: "Contact", url: "/contact" }
            ]
        });
    </script>

### itemTemplate `String|Function`

Specifies a custom template for the menu items.


<div class="meta-api-description">
Control the appearance and layout of individual dropdown menu items in a split button by defining custom templates, enabling dynamic rendering of content such as HTML insertion, text modifications, icon changes, or binding specific data fields for each menu entry. This customization supports configuring item visuals, creating personalized dropdown structures, altering button submenu presentation, and tailoring how each option is displayed during component setup or runtime. Adjust, style, or override default menu item rendering to fit UI requirements, improve user experience, or implement complex item formatting within split button dropdowns.
</div>

#### Example

    <button id="splitButton">Click me!</button>
    <script>
        $("#splitButton").kendoSplitButton({
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
Control dropdown behavior and appearance by configuring popup options such as positioning, animation effects, container attachment, and event callbacks to customize how the menu opens and interacts; set or adjust popup initialization settings to manage alignment, display style, event handling, visibility triggers, and integration with parent elements for flexible dropdown or overlay control in button components.
</div>

#### Example

    <button id="splitButton">Command</button>
    <script>
        $("#splitButton").kendoSplitButton({
            items: [
                { text: "Option 1" },
                { text: "Option 2" },
                { text: "Option 3" }
            ],
            popup: {
                origin: "top left",
                position: "bottom left",
                collision: "flip",
                animation: {
                    open: { effects: "slideIn:down" },
                    close: { effects: "slideIn:up" }
                }
            }
        });
    </script>

### popup.appendTo `String`

Defines a jQuery selector that will be used to find a container element, where the popup will be appended to.


<div class="meta-api-description">
Control where the dropdown menu or popup panel is inserted by specifying a selector or container element to append the popup, enabling precise management of positioning, layering order, stacking context, and overflow behavior especially inside scrollable containers or positioned parent elements. Configure the popup attachment point to ensure it renders within desired DOM nodes for fixed, absolute, or relative positioning, allowing seamless integration with custom layouts, avoiding clipping or overflow issues, and enabling specific control over z-index stacking and visibility during interaction with buttons or dropdown triggers. This setting helps developers customize popup containers to avoid rendering problems in complex UI hierarchies and manage focus, event propagation, or scroll containment effectively for dynamic or nested user interface components.
</div>

#### Example

    <div id="container">
        <button id="splitButton">Command</button>
    </div>
    <script>
        $("#splitButton").kendoSplitButton({
            items: [
                { text: "Option 1" },
                { text: "Option 2" },
                { text: "Option 3" }
            ],
            popup: {
                appendTo: "#container"
            }
        });
    </script>

### rounded `String` *(default: 'medium')*

Controls what border radius is applied to a button. Valid values are: `"small"`, `"medium"`, `"large"`, `"full"`, and `"none"`. Default value is `"medium"`.


<div class="meta-api-description">
Adjust the corner radius or border curvature of a button to create different shapes such as subtle rounded edges, pronounced curves, pill-shaped corners, or sharp square corners by setting size options like small, medium, large, full round, or no rounding, enabling control over button styling, corner smoothness, border radius, or edge roundness for customized UI appearance and design consistency.
</div>

#### Example

    <button id="splitbutton" type="button">Cancel</button>
    <script>
        $("#splitbutton").kendoSplitButton({
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
Adjust the scale or physical dimensions of the button to fit different interface densities, spacing requirements, or layout styles by setting the control size to small, medium, large, or none, allowing developers to configure button sizing, adapt UI element scale, control spacing uniformity, customize button dimensions for compact or spacious designs, and ensure consistent appearance across varied screen densities or component groupings in user interfaces.
</div>

#### Example

    <button id="splitbutton" type="button">Cancel</button>
    <script>
        $("#splitbutton").kendoSplitButton({
            items:[
                { text: "item 1" },
                { text: "item 2" }
            ],
            size: "large"
        });
    </script>

### spriteCssClass `String`

Defines a CSS class (or multiple classes separated by spaces), which will be used for applying a background image to a `span` element inside the **SplitButton**.
In case you want to use an icon from the Kendo UI theme sprite background image, it is easier to use the [`icon` property](/api/javascript/ui/button#configuration-icon).

The `span` element can be added automatically by the widget, or an existing element can be used, if it has a `k-sprite` CSS class applied.


<div class="meta-api-description">
Set or customize the background image of a split button by assigning one or multiple CSS classes as sprite icons to the button’s span element, enabling control over the displayed icon, adding custom or theme-based sprite graphics, managing icon appearance with CSS background images, replacing or combining with existing sprite classes, adjusting visual styling of split button elements, configuring icon display through class names rather than separate image files, and tailoring button iconography for different themes or custom designs.
</div>

#### Example

    <button id="splitbutton" type="button">Button</button>
    <script>
        $("#splitbutton").kendoSplitButton({
            items:[
                { text: "item 1" },
                { text: "item 2" }
            ],
            spriteCssClass: "myEditIcon"
        });
    </script>

### themeColor `String` *(default: 'base')*

Controls the main color applied to the button. Valid values are:  `"base"`, `"primary"`, `"secondary"`, `"tertiary"`, `"info"`, `"success"`, `"warning"`, `"error"`, `"dark"`, `"light"`, `"inverse"`, and `"none"`. Default value is `"base"`.


<div class="meta-api-description">
Control and configure the color scheme, visual style, and thematic tone of a split button's appearance by setting or customizing its main color to reflect different states such as primary, secondary, success, warning, error, light, dark, info, tertiary, inverse, or no color, enabling precise styling, branding, or state signaling for user interface components across various design contexts and color theme options.
</div>

#### Example

    <button id="splitbutton" type="button">Cancel</button>
    <script>
        $("#splitbutton").kendoSplitButton({
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
Configure, customize, and translate button text, labels, and captions for split buttons by setting localized messages, enabling multi-language support, adapting UI language strings, providing custom translations, controlling text display, and internationalizing button interface elements for diverse user locales and accessibility requirements.
</div>

#### Example

    <button id="splitbutton" type="button">Cancel</button>
    <script>
        $("#splitbutton").kendoSplitButton({
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

Controls the label suffix that will be concatenated to the button's text and used for the aria-label attribute.


<div class="meta-api-description">
Configure or customize the localized suffix appended to button labels and accessibility attributes, enabling control over the text that appears after main labels in UI components, which helps in internationalization, localization, setting suffixes for screen readers, adjusting aria-label text, enhancing accessibility descriptions, and tailoring user interface button text for various languages and contexts.
</div>

#### Example

    <button id="splitbutton" type="button">Cancel</button>
    <script>
        $("#splitbutton").kendoSplitButton({
            items:[
                { text: "item 1" },
                { text: "item 2" }
            ],
            messages: {
                labelSuffix: "MenuButton"
            }
        });
    </script>

## Methods

### enable

Enables or disables the SplitButton and all the items in the Button list.


<div class="meta-api-description">
Control the activation state of a split button component by programmatically enabling or disabling user interaction with the main button and its dropdown list items at runtime, allowing developers to dynamically set whether the button and its menu options respond to clicks, toggle availability during application flow, prevent user selection, and manage interactive behaviors based on application conditions or user permissions, effectively configuring the component’s responsiveness and accessibility in real time.
</div>

#### Parameters

##### state `Boolean`

Indicates whether the **SplitButton** should be enabled or disabled. `true` and `false` arguments are accepted. If no argument is supplied, the **SplitButton** will assume `true` and will be enabled.

##### items `String|jQuery`

Collection of the items to disabled/enabled.

#### Example

    <button id="splitbutton" type="button">Button</button>
    <script>
        $("#splitbutton").kendoSplitButton({
            items:[
                { text: "item 1" },
                { text: "item 2" }
            ]
        });
        var button = $("#splitbutton").data("kendoSplitButton");
        // disable button
        button.enable(false);
    </script>

#### Example - disable a specific item

    <button id="splitbutton" type="button">Button</button>
    <script>
        $("#splitbutton").kendoSplitButton({
            items:[
                { id: "item1", text: "Item 1" },
                { id: "item2", text: "Item 2" }
            ]
        });
        var button = $("#splitbutton").data("kendoSplitButton");

        button.enable(false, "#item1");
    </script>

#### Example - disable a collection of items

    <button id="splitbutton" type="button">Button</button>
    <script>
        $("#splitbutton").kendoSplitButton({
            items:[
                { id: "item1", text: "Item 1" },
                { id: "item2", text: "Item 2" }
            ]
        });
        var button = $("#splitbutton").data("kendoSplitButton");

        button.enable(false, $("#item1, #item2"));
    </script>

### hide

Hides an item.


<div class="meta-api-description">
Control or toggle the visibility of individual items within a split button or dropdown menu by programmatically hiding specific entries without deleting their configurations, enabling dynamic display adjustments, conditional item concealment, and runtime management of menu options through methods to hide particular buttons or options from users while preserving the underlying settings.
</div>

#### Parameters

##### items `String|jQuery`

Collection of the items to hide.

#### Example

    <button id="splitbutton" type="button">Button</button>
    <script>
        $("#splitbutton").kendoSplitButton({
            items:[
                { id: "item1", text: "Item 1" },
                { id: "item2", text: "Item 2" }
            ]
        });
        var button = $("#splitbutton").data("kendoSplitButton");

        button.hide($("#item1"));
    </script>

### show

Shows an item.


<div class="meta-api-description">
Control which menu option appears or is revealed within a split button interface by programmatically showing, displaying, or enabling a specific split button item on demand; this functionality supports dynamic menu updates, conditional visibility toggling, restoring hidden actions, triggering particular button choices through code, and managing user interface elements that adapt based on user actions or application state changes.
</div>

#### Parameters

##### items `String|jQuery`

Collection of the items to show.

#### Example

    <button id="splitbutton" type="button">Button</button>
    <script>
        $("#splitbutton").kendoSplitButton({
            items:[
                { id: "item1", text: "Item 1", hidden: true },
                { id: "item2", text: "Item 2" }
            ]
        });
        var button = $("#splitbutton").data("kendoSplitButton");

        button.show($("#item1"));
    </script>

### items

Returns the menu items as DOM elements wrapped in jQuery collection.


<div class="meta-api-description">
Retrieve or access menu entries or buttons within a split button component for event handling, iteration, dynamic content updates, or DOM modifications. Find, loop through, bind click or other event listeners, customize, or manipulate the interactive sub-buttons or dropdown items programmatically. Obtain these submenu elements as jQuery objects or wrapped DOM nodes to enable querying, editing text or attributes, toggling visibility, or attaching handlers within the split button’s menu structure. Enable developers to interact with individual dropdown entries for custom behaviors, content changes, or UI adjustments via a method that returns all menu elements associated with the split button control.
</div>

#### Example

    <button id="splitButton">Command</button>
    <script>
        var splitButton = $("#splitButton").kendoSplitButton({
            items: [
                { text: "Option 1", id: "opt1" },
                { text: "Option 2", id: "opt2" },
                { text: "Option 3", id: "opt3" }
            ]
        }).data("kendoSplitButton");

        // Get all menu items
        var items = splitButton.items();
        console.log("Number of menu items:", items.length);
        
        // Access specific item
        items.each(function(index, item) {
            console.log("Item " + index + ":", $(item).text());
        });
    </script>

#### Returns

`jQuery`

### open

Opens the button menu.


<div class="meta-api-description">
Trigger or activate the dropdown menu programmatically for a split button component, enabling the menu to open via code, keyboard input, custom event handlers, or automated logic, ensuring the menu becomes visible and focused if not already open while maintaining its state if it is, useful for controlling UI interactions like simulating user clicks, customizing focus behavior, or integrating with keyboard navigation and accessibility features.
</div>

#### Example

    <button id="splitbutton" type="button">Button</button>
    <script>
        $("#splitbutton").kendoSplitButton({
            items:[
                { id: "item1", text: "Item 1" },
                { id: "item2", text: "Item 2" }
            ]
        });
        var button = $("#splitbutton").data("kendoSplitButton");

        button.open();
    </script>

### close

Closes the button menu.


<div class="meta-api-description">
Control, hide, or programmatically close the dropdown menu or popup of a split button component, enabling immediate closure of the menu without user interaction; useful for closing the popup after an item is selected, dismissing the menu on external clicks or events, managing dropdown state in code, or dynamically hiding the popup to improve user interface flow and interaction handling.
</div>

#### Example

    <button id="splitbutton" type="button">Button</button>
    <script>
        $("#splitbutton").kendoSplitButton({
            items:[
                { id: "item1", text: "Item 1" },
                { id: "item2", text: "Item 2" }
            ]
        });
        var button = $("#splitbutton").data("kendoSplitButton");

        button.close();
    </script>

## Events

### click

Fires when the **SplitButton** or any if its items is clicked with the mouse, touched on a touch device, or ENTER (or SPACE) is pressed while the **SplitButton** or an item is focused.


<div class="meta-api-description">
Handle user interaction events triggered by clicking, tapping, pressing ENTER or SPACE on a SplitButton or its dropdown items, enabling control over activation actions, item selection, and input responses via mouse, touch devices, keyboard focus, or keyboard events to capture all forms of user engagement with split buttons or their menu options.
</div>

#### Event Data

##### e.originalEvent `Object`

The original DOM event.

##### e.target `jQuery`

The DOM element fired the event wrapped in jQuery object.

##### e.id `String`

The id of the element, which fired the event, wrapped in jQuery object.

#### Example - subscribe to the "click" event during initialization

    <button id="splitbutton" type="button">Button</button>
    <script>
        $("#splitbutton").kendoSplitButton({
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

    <button id="splitbutton" type="button">Button</button>
    <script>
        $("#splitbutton").kendoSplitButton({
            items:[
                { text: "item 1" },
                { text: "item 2" }
            ]
        });
        var button = $("#splitbutton").data("kendoSplitButton");
        button.bind("click", function(e) {
            console.log(e.id + " clicked!");
        });
    </script>

### open

Fires when the menu button is opened.


<div class="meta-api-description">
Detect and respond to the event triggered when a split button’s dropdown menu is activated or made visible, enabling you to run custom code on menu open such as dynamically loading or updating menu options, changing interface state, setting focus on specific menu items, capturing user interactions, logging analytics, or managing UI behavior tied to menu visibility and user engagement with the dropdown.
</div>

#### Example

    <button id="splitbutton" type="button">Button</button>
    <script>
        $("#splitbutton").kendoSplitButton({
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
Capture when a menu or dropdown is closed, observe user interactions that dismiss expandable controls, detect closing events from split buttons or similar UI elements, handle focus restoration after menus collapse, track state changes when popups or menus close, update interface or internal state upon menu dismissal, trigger analytics or logging when dropdowns are closed, cancel pending operations or timers linked to an open menu, and manage visibility or open-state indicators for interactive button controls.
</div>

#### Example

    <button id="splitbutton" type="button">Button</button>
    <script>
        $("#splitbutton").kendoSplitButton({
            items:[
                { id: "item1", text: "item 1" },
                { id: "item2", text: "item 2" }
            ],
            close: function(e) {
                console.log("Closed!");
            }
        });
    </script>
