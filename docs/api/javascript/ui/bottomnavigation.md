---
title: BottomNavigation
description: Configuration, methods and events of the Kendo UI BottomNavigation
res_type: api
component: BottomNavigation
---

# kendo.ui.BottomNavigation

Represents the Kendo UI BottomNavigation. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### border `Boolean` *(default: true)*

Toggles the border of the widget.


<div class="meta-api-description">
How do I remove the border from my Kendo UI bottom navigation component? Enable or disable a visible border or outline around the bottom navigation component to control its visual separation and styling, allowing customization of whether the bottom navigation bar displays a distinct dividing line, edge, frame, or border line that sets it apart from other page elements; configure or set the appearance to show or hide the boundary, outline, or separator for improved UI clarity or minimal design based on user preference or layout requirements.
</div>

#### Example

    <nav id="bottomnav"></nav>

    <script>
        $("#bottomnav").kendoBottomNavigation({
            border: false,
            items: [
                { text: "Home", icon: "home" },
                { text: "Info", icon: "info-circle" },
                { text: "Contact", icon: "envelope" }
            ]
        });
    </script>

### shadow `Boolean` *(default: false)*

Toggles the shadow of the widget.


<div class="meta-api-description">
How do I turn off the drop shadow effect in Kendo UI's bottom navigation component? Configure and control the appearance of a navigation bar's drop-shadow or elevation effect beneath the bottom navigation component to adjust visual depth and layering, enabling or disabling shading, shadow rendering, or elevation styling for user interface depth perception and design customization, including turning on or off shadow effects to highlight or flatten the navigation bar's presence on screen.
</div>

#### Example

    <nav id="bottomnav"></nav>

    <script>
        $("#bottomnav").kendoBottomNavigation({
            shadow: true,
            items: [
                { text: "Home", icon: "home" },
                { text: "Info", icon: "info-circle" },
                { text: "Contact", icon: "envelope" }
            ]
        });
    </script>

### fillMode `String`  *(default: "flat")*

Specifies which fillMode is applied to the BottomNavigation. Valid options are `flat` (default) and `solid`.


<div class="meta-api-description">
How can I customize the background styling of navigation items in a Kendo UI bottom navigation bar? Control and customize the background styling of navigation items in a bottom navigation bar by setting different fill styles such as flat or solid, enabling adjustment of visual emphasis, theming consistency, item highlighting, and overall appearance customization for user interfaces that require distinct or subtle item background effects in navigation components.
</div>

#### Example

    <nav id="bottomnav"></nav>

    <script>
        $("#bottomnav").kendoBottomNavigation({
            fillMode: "solid",
            items: [
                { text: "Home", icon: "home" },
                { text: "Info", icon: "info-circle" },
                { text: "Contact", icon: "envelope" }
            ]
        });
    </script>

### itemFlow `String` *(default: "vertical")*

Sets the position of the text label. Valid options are `vertical` and `horizontal`.


<div class="meta-api-description">
How do I control the placement of text labels in bottom navigation items relative to their icons? Control or customize the placement and arrangement of text labels in navigation items relative to their icons, including options to stack text vertically below the icon or align it horizontally beside the icon, enabling developers to configure label orientation, position, and flow in bottom navigation menus, adjust visual layout for better readability or compactness, and choose between vertical stacking or side-by-side text and icon display for navigation elements during interface setup or styling.
</div>

#### Example

    <nav id="bottomnav"></nav>

    <script>
        $("#bottomnav").kendoBottomNavigation({
            itemFlow: "horizontal",
            items: [
                { text: "Home", icon: "home" },
                { text: "Info", icon: "info-circle" },
                { text: "Contact", icon: "envelope" }
            ]
        });
    </script>

### themeColor `String` *(default: undefined)*

Sets a value controlling the theme color of the component. When `undefined` (the default), the theme controls the color. Can also be set to the following string values:

* `inherit`: no coloring will be applied to the badge. Useful when the badge needs to blend-in with the surrounding elements.
* `default`: apply coloring based on surface theme color.
* `primary`: apply coloring based on **primary** theme color.
* `secondary`: apply coloring based on **secondary** theme color.
* `tertiary`: apply coloring based on **tertiary** theme color.
* `info`: apply coloring based on **info** theme color.
* `success`: apply coloring based on **success** theme color.
* `warning`: apply coloring based on **warning** theme color.
* `error`: apply coloring based on **error** theme color.
* `dark`: apply coloring based on **dark** theme color.
* `light`: apply coloring based on **light** theme color.
* `inverse`: depending on the luminance of the theme, light or dark, inverted will be dark or light.


<div class="meta-api-description">
How do I change the color scheme of a BottomNavigation component in Kendo UI? Configure and control the BottomNavigation component’s color scheme by setting theme colors that determine surface, accent, and badge hues through options like inherit, default, primary, secondary, tertiary, info, success, warning, error, dark, light, or inverse. Enable blending or contrasting visual styles by mapping navigation elements to a theme palette or contextual modes that adapt based on luminance or design intent. Set, customize, or switch the appearance for badges, backgrounds, and accents with color roles that support branding, alerts, status, or UI contrast, allowing flexible theming aligned with primary, secondary, tertiary priorities, semantic states like info or error, or adaptive light/dark modes. Control and override default colors, enable dynamic inversion, or maintain consistent surface tone integration across navigation components using scalable theme color options for responsive design and user interface clarity.
</div>

#### Example

    <nav id="bottomnav"></nav>

    <script>
        $("#bottomnav").kendoBottomNavigation({
            themeColor: "dark",
            items: [
                { text: "Home", icon: "home" },
                { text: "Info", icon: "info-circle" },
                { text: "Contact", icon: "envelope" }
            ]
        });
    </script>

### items `Array`

Specifies the items of the BottomNavigation component.


<div class="meta-api-description">
How do I customize the items in Kendo UI Bottom Navigation? Configure and customize the list of navigation buttons or tabs displayed in a bottom navigation bar by providing an array of menu items that control labels, icons, active or selected states, and user interactions such as click or tap handlers. Enable ordering, updating, or modifying bottom navigation entries dynamically, setting up multiple navigation options with descriptive text, graphical icons, and handling selection or navigation events to switch views or routes. Adjust or set the bottom tab bar entries, control their appearance and behavior, and manage navigation item properties to build interactive, responsive bottom navigation menus.
</div>

#### Example

    <nav id="bottomnav"></nav>

    <script>
        $("#bottomnav").kendoBottomNavigation({
            items: [
                { text: "Home", icon: "home" },
                { text: "Info", icon: "info-circle" },
                { text: "Contact", icon: "envelope" }
            ]
        });
    </script>

### items.url `String`

The URL (href) to which the item will navigate to.


<div class="meta-api-description">
How to configure URL links for Kendo UI bottom navigation items? Configure navigation links for bottom navigation items by setting their target URLs, enabling redirection or page transitions when users activate an item. Support absolute and relative URL paths, specify hrefs for direct linking or routing, control link destinations on item clicks, and define navigation behavior for bottom menu elements through configurable URLs assigned during initialization. This URL setting governs where each bottom navigation button routes or opens, allowing linking to internal pages, external sites, or API endpoints seamlessly within the navigation component.
</div>

#### Example

    <nav id="bottomnav"></nav>

    <script>
        $("#bottomnav").kendoBottomNavigation({
            items: [
                { text: "Home", icon: "home", url: "http://www.telerik.com" },
                { text: "Info", icon: "info-circle" },
                { text: "Contact", icon: "envelope" }
            ]
        });
    </script>

### items.data `Object`

Contextual data to be used for events within the component.


<div class="meta-api-description">
How to add custom data to Kendo UI BottomNavigation items? Add customizable metadata or user-defined information to individual navigation items at the bottom of your app interface, enabling storage of any primitive values, objects, or context-specific details that can be accessed during event handling, action binding, command execution, or when reacting to user interactions. Embed extra data properties, contextual info, or custom payloads directly into navigation elements for flexible retrieval in event listeners, callbacks, or handlers, facilitating state management, dynamic behavior customization, and enhanced navigation item control based on associated metadata across different runtime scenarios.
</div>

#### Example

    <nav id="bottomnav"></nav>

    <script>
        $("#bottomnav").kendoBottomNavigation({
            items: [
                { text: "Home", icon: "home", data: { view: "home" } },
                { text: "Info", icon: "info-circle", data: { view: "info" } },
                { text: "Contact", icon: "envelope", data: { view: "info" } }
            ],
            select: function (ev) {
                alert(ev.data.view);
            }
        });
    </script>

### items.icon `String`

Defines the name for an existing icon in a Kendo UI theme.

See [web font icons help article](/styles-and-layout/icons-web) for more details on Kendo UI icons.


<div class="meta-api-description">
How can I customize the icon for each item in a Kendo UI BottomNavigation? Set or customize the icon displayed for navigation bar items by specifying the exact name of a prebuilt theme icon or web font icon, enabling control over the visual representation of each navigation element, including options to choose from a library of standard, predefined icons to enhance user interface design, configure menu or tab icons, or replace default symbols with custom theme-based icons for better UX and consistent styling across bottom navigation components.
</div>

#### Example

    <nav id="bottomnav"></nav>

    <script>
        $("#bottomnav").kendoBottomNavigation({
            items: [
                { text: "Home", icon: "home" },
                { text: "Info", icon: "info-circle" },
                { text: "Contact", icon: "envelope" }
            ]
        });
    </script>

### items.text `String`

The text of the item. It is optional - if not set, no text will be rendered.


<div class="meta-api-description">
How do I set the text label for an item in a Kendo UI bottom navigation bar? Set or configure the label, caption, or visible text displayed alongside or below a navigation icon in bottom navigation bars, controlling whether an item shows descriptive text or remains icon-only, with options to enable, disable, or customize the text content associated with each navigation entry for clearer user interface cues and accessibility enhancements.
</div>

#### Example

    <nav id="bottomnav"></nav>

    <script>
        $("#bottomnav").kendoBottomNavigation({
            items: [
                { icon: "home" },
                { icon: "info-circle" },
                { icon: "envelope" }
            ]
        });
    </script>

### items.encoded `Boolean` *(default: true)*

If false, the text will be able to render HTML.


<div class="meta-api-description">
How to configure HTML encoding for BottomNavigation items labels? Control how navigation item labels handle HTML content by enabling or disabling HTML encoding to allow raw HTML markup, formatted text, or plain text display within navigation elements. Configure whether item text is interpreted as encoded strings or rendered with embedded HTML tags to customize label appearance, support rich content, or prevent cross-site scripting vulnerabilities. Adjust encoding settings to manage text rendering, raw HTML injection, safe content display, and tag processing for bottom navigation elements or similar menu items, ensuring correct interpretation of user interface text whether plain, sanitized, or HTML-enhanced.
</div>

#### Example

    <nav id="bottomnav"></nav>

    <script>
        $("#bottomnav").kendoBottomNavigation({
            items: [
                { text: "<strong>Home</strong>", icon: "home", encoded: false },
                { text: "<strong>Info</strong>", icon: "info-circle", encoded: true },
                { text: "Contact", icon: "envelope" }
            ]
        });
    </script>

### items.iconClass `String`

Defines the class name added to the icon element.


<div class="meta-api-description">
How do I customize the appearance of navigation item icons in a Kendo UI BottomNavigation? Customize or style navigation item icons by adding one or multiple CSS class names to the icon element, enabling control over icon appearance, theming, or visual modifications within a bottom navigation bar. Adjust icon styling dynamically by specifying class attributes, use custom styles or framework classes to change icon size, color, or effects, and configure icon presentation during initialization or runtime by assigning relevant style classes to each navigation item’s icon. This property supports flexible icon customization for developers needing to apply unique icon visuals, differentiate menu items, or integrate consistent design patterns across bottom navigation components.
</div>

#### Example

    <nav id="bottomnav"></nav>

    <script>
        $("#bottomnav").kendoBottomNavigation({
            items: [
                { text: "Home", icon: "home", iconClass: "my-icon-class" },
                { text: "Info", icon: "info-circle" },
                { text: "Contact", icon: "envelope" }
            ]
        });
    </script>

### items.cssClass `String`

Defines the class names of the item's element.


<div class="meta-api-description">
How to customize styling for individual items in Kendo UI Bottom Navigation? Customize individual bottom navigation entries by assigning one or multiple CSS class names as a space-separated string to control their styling, appearance, theming, active or disabled states, layout modifications, and dynamic visual behavior. Configure item-level CSS styling hooks to enable granular control over navigation button styles, enhance UX with state-specific classes, apply custom themes or adjust positioning by specifying custom class lists for each navigation element root. Set, control, or enable per-item CSS classes to tailor the look and behavior of navigation controls according to design requirements or interaction states.
</div>

#### Example

    <nav id="bottomnav"></nav>

    <script>
        $("#bottomnav").kendoBottomNavigation({
            items: [
                { text: "Home", icon: "home", cssClass: "my-css-class" },
                { text: "Info", icon: "info-circle" },
                { text: "Contact", icon: "envelope" }
            ]
        });
    </script>

### items.attributes `Object`

Defines custom attributes of the item's element.


<div class="meta-api-description">
How can I set custom data attributes on individual items in a Kendo UI BottomNavigation component? Configure custom HTML attributes like data-*, aria-*, id, class, or any other attribute on individual navigation items within the bottom navigation component to control accessibility, styling, identification, and data binding on each element; customize per-item DOM properties by setting attributes during initialization to tailor element behavior, improve semantic markup, enable specific automation hooks, or integrate with frameworks requiring precise attribute control for each navigation link or button.
</div>

#### Example

    <nav id="bottomnav"></nav>

    <script>
        $("#bottomnav").kendoBottomNavigation({
            items: [
                { text: "Home", icon: "home", attributes: { "data-val" : "custom data attribute" } },
                { text: "Info", icon: "info-circle" },
                { text: "Contact", icon: "envelope" }
            ]
        });
    </script>

### items.enabled `Boolean` *(default: true)*

Toggles the enabled state of the item.


<div class="meta-api-description">
How do I enable or disable individual items in Kendo UI Bottom Navigation? Control the interactivity and availability of individual navigation items by enabling or disabling them, managing whether they respond to user actions like clicks, taps, focus, or keyboard navigation, to dynamically activate, deactivate, lock, or make specific bottom navigation elements non-clickable and non-focusable depending on application state or user permissions.
</div>

#### Example

    <nav id="bottomnav"></nav>

    <script>
        $("#bottomnav").kendoBottomNavigation({
            items: [
                { text: "Home", icon: "home", enabled: false },
                { text: "Info", icon: "info-circle" },
                { text: "Contact", icon: "envelope" }
            ]
        });
    </script>

### items.selected `Boolean` *(default: false)*

Toggles the selected state of the item.


<div class="meta-api-description">
How do I programmatically select an item in Kendo UI bottom navigation bar? Control which navigation item is currently active or highlighted by enabling or disabling its selection state, set or toggle the chosen tab in a bottom navigation bar, programmatically update or initialize the selected option to reflect the user’s current screen or choice, manage focus or active indicators on navigation elements, and switch between items to change the interface’s visual focus or functionality dynamically.
</div>

#### Example

    <nav id="bottomnav"></nav>

    <script>
        $("#bottomnav").kendoBottomNavigation({
            items: [
                { text: "Home", icon: "home", selected: true },
                { text: "Info", icon: "info-circle" },
                { text: "Contact", icon: "envelope" }
            ]
        });
    </script>

### items.template `String|Function`

Sets a custom template for the item (overrides the `template` option).


<div class="meta-api-description">
How do I customize the appearance of individual items in a Kendo UI BottomNavigation component? Customize how each navigation item appears by defining a specific rendering template or layout for individual bottom navigation elements, enabling control over the visual structure, content arrangement, and presentation on initialization or dynamically; this includes setting custom item designs, overriding default rendering, configuring item-specific markups, tailoring appearance per navigation option, and adjusting templates for personalized navigation styling within the bottom navigation bar component.
</div>

#### Example

    <nav id="bottomnav"></nav>

    <script>
        $("#bottomnav").kendoBottomNavigation({
            items: [
                { text: "Home", icon: "home", template: "<span>#:text#</span>" },
                { text: "Info", icon: "info-circle" },
                { text: "Contact", icon: "envelope" }
            ]
        });
    </script>

### template `String | Function`

Sets a custom template for the items.


<div class="meta-api-description">
How to customize the layout of bottom navigation items in Kendo UI for jQuery? Customize the layout and appearance of bottom navigation items by defining a flexible template that controls the HTML structure, data binding, and rendering logic for each entry. Enable developers to set custom icons, labels, conditional content, and dynamic markup based on item properties, supporting use cases like personalized styling, custom item formatting, or integrating complex UI elements. Configure or override default item templates to tailor navigation components’ presentation and behavior, facilitating advanced customization scenarios such as altering icon placement, text arrangement, or visibility rules within bottom navigation menus.
</div>

#### Example

    <nav id="bottomnav"></nav>

    <script>
        $("#bottomnav").kendoBottomNavigation({
            items: [
                { text: "Home", icon: "home" },
                { text: "Info", icon: "info-circle" },
                { text: "Contact", icon: "envelope" }
            ],
            template: "<span>#:text#</span>"
        });
    </script>

### positionMode `String`  *(default: "fixed")*

Specifies CSS position of the BottomNavigation in the document. Valid options are: `absolute`, `fixed` and `sticky`.


<div class="meta-api-description">
How do I configure the Kendo UI bottom navigation bar to stay anchored during scrolling? Configure how the navigation bar is positioned relative to other page elements, controlling whether it stays anchored during scrolling, overlays content, or moves with the document flow by setting layout behaviors such as fixed placement that pins to the viewport, absolute positioning that anchors within the page structure, or sticky behavior that toggles visibility based on scroll position, enabling control over docking, floating, overlay effects, scroll responsiveness, and persistent display options for bottom navigation components in web layouts.
</div>

#### Example

    <nav id="bottomnav"></nav>

    <script>
        $("#bottomnav").kendoBottomNavigation({
            positionMode: "absolute",
            items: [
                { text: "Home", icon: "home" },
                { text: "Info", icon: "info-circle" },
                { text: "Contact", icon: "envelope" }
            ]
        });
    </script>

## Methods

### add

Adds a new item. If an optional beforeElement is provided as second parameter, the new item is added before it.


<div class="meta-api-description">
How to dynamically add navigation items to a Kendo UI bottom navigation menu? Insert or append navigation items dynamically to a bottom navigation menu to customize its buttons or tabs by adding new entries at the end or before specific existing elements. Control placement of menu options programmatically during runtime, enabling modification or extension of the navigation bar by inserting actionable items anywhere within the navigation list based on their order or reference elements. Configure new buttons or links on the bottom navigation interface by specifying insertion points to adjust the user interface flow, ensuring flexibility in updating navigation options while the application runs.
</div>

#### Parameters

##### item `Object` *(required)*

The item definition that will be added.

##### beforeElement `HTMLElement|jQuery` *(optional)*

Add item before an already existing item.

#### Example

    <nav id="bottomnav"></nav>

    <script>
        var bottomNav = $("#bottomnav").kendoBottomNavigation({
            items: [
                { text: "Home", icon: "home" }
            ]
        }).data("kendoBottomNavigation");

        bottomNav.add({ text: "Contact", icon: "envelope", attributes: { id: "email" } });
        bottomNav.add({ text: "Info", icon: "info-circle" }, $("#email"));
    </script>


### enable

Toggles item's enabled state.


<div class="meta-api-description">
How can I programmatically enable or disable bottom navigation items in Kendo UI for jQuery? Programmatically activate, deactivate, toggle, set, control, or switch the interactivity, clickability, availability, or enabled state of a bottom navigation item, dynamically managing whether a navigation tab or button is responsive, selectable, or disabled based on user input, application status, or conditional logic after initialization, adjusting UI behavior to enable or disable specific navigation elements on demand.
</div>

#### Parameters

##### element `HTMLElement|jQuery` *(required)*

Specifies an existing item element in the BottomNavigation.

##### state `Boolean` *(optional)*

Specifies the state of the element.

#### Example

    <nav id="bottomnav"></nav>

    <script>
        var bottomNav = $("#bottomnav").kendoBottomNavigation({
            items: [
                { text: "Home", icon: "home", enabled: false, attributes: { id: "home" } },
                { text: "Info", icon: "info-circle" },
                { text: "Contact", icon: "envelope" }
            ]
        }).data("kendoBottomNavigation");

        bottomNav.enable($("#home"), true);
    </script>


### item

Get item's element by index.


<div class="meta-api-description">
How do I access a specific navigation item in Kendo UI bottom navigation bar by its index? Access or get a specific navigation element from a bottom navigation bar by position or index to interact with its DOM node, enabling tasks like attaching event listeners, modifying styles or classes, updating attributes, measuring size or layout, or programmatically controlling individual navigation items. Retrieve a single navigation item's element based on its order number to dynamically manipulate or query it, handling cases when the index might be invalid or out of bounds. This supports scenarios such as customizing behavior, updating appearance, or capturing user interactions on particular navigation entries within a bottom navigation structure.
</div>

#### Parameters

##### index `Number|String` *(required)*

The zero-based index of the item.

#### Returns

`jQuery` the found item with the specified id.

#### Example

    <nav id="bottomnav"></nav>

    <script>
        var bottomNav = $("#bottomnav").kendoBottomNavigation({
            items: [
                { text: "Home", icon: "home", enabled: false },
                { text: "Info", icon: "info-circle" },
                { text: "Contact", icon: "envelope" }
            ]
        }).data("kendoBottomNavigation");

        var home = bottomNav.item(0);
        bottomNav.enable(home, true);
    </script>

### itemById

Get item's element by id (can be set via `items.attributes`).


<div class="meta-api-description">
How can I access a specific item in a Kendo UI bottom navigation bar by its ID? Locate and access a navigation element within a bottom navigation bar by specifying its unique identifier, enabling actions such as attaching event listeners, modifying properties, updating visual attributes, measuring dimensions, or scrolling to that specific item programmatically. This method supports retrieving the corresponding UI element based on predefined item IDs set through attributes, facilitating dynamic interaction, customization, and control over individual navigation entries by referencing their unique keys or identifiers. Use case scenarios include identifying items by ID to manipulate or query them directly for user interface updates, event handling customization, or automated scrolling behavior in navigation components.
</div>

#### Parameters

##### id `String` *(required)*

The id of the item.

#### Returns

`jQuery` the found item at the specified index.

#### Example

    <nav id="bottomnav"></nav>

    <script>
        var bottomNav = $("#bottomnav").kendoBottomNavigation({
            items: [
                { text: "Home", icon: "home", enabled: false, attr: { id: "home" } },
                { text: "Info", icon: "info-circle" },
                { text: "Contact", icon: "envelope" }
            ]
        }).data("kendoBottomNavigation");

        var home = bottomNav.itemById("home");
        bottomNav.enable(home, true);
    </script>

### items

Gets items' elements in a jQuery array.


<div class="meta-api-description">
How do I access individual items in Kendo UI BottomNavigation? Retrieve, access, or manipulate the individual navigation item elements within a bottom navigation component by obtaining a collection of these elements suitable for iterating, adding or removing CSS classes, attaching event listeners, measuring dimensions, or performing direct DOM updates and changes. This method enables selecting all bottom navigation entries as an array-like jQuery set for bulk or item-specific DOM operations, event binding, styling adjustments, and dynamic content manipulation relevant for customizing or controlling the navigation structure and behavior.
</div>

#### Returns

`jQuery` the items collection as jQuery array.

#### Example

    <nav id="bottomnav"></nav>

    <script>
        var bottomNav = $("#bottomnav").kendoBottomNavigation({
            items: [
                { text: "Home", icon: "home" },
                { text: "Info", icon: "info-circle" },
                { text: "Contact", icon: "envelope" }
            ]
        }).data("kendoBottomNavigation");

        bottomNav.items().find(".k-bottom-nav-item-text").hide();
    </script>

### remove

Removes an item.


<div class="meta-api-description">
How can I dynamically remove an item from the Kendo UI BottomNavigation widget? Delete or remove a navigation item dynamically from the bottom navigation bar, modify or update the list of navigation options at runtime, programmatically eliminate specific menu entries, control and manage bottom navigation elements on the fly, adjust or refresh navigation items instantly, enable dynamic customization of navigation menus, remove entries based on user actions or logic, handle runtime navigation item changes, update the bottom navigation UI by removing specified items, and configure the navigation bar to reflect real-time item removals.
</div>

#### Parameters

##### element `HTMLElement|jQuery` *(required)*

The element to be removed.

#### Example

    <nav id="bottomnav"></nav>

    <script>
        var bottomNav = $("#bottomnav").kendoBottomNavigation({
            items: [
                { text: "Home", icon: "home" },
                { text: "Info", icon: "info-circle" },
                { text: "Contact", icon: "envelope" }
            ]
        }).data("kendoBottomNavigation");

        var lastItem = bottomNav.item(2);
        bottomNav.remove(lastItem);
    </script>

### select

Gets selected item if no parameters are passed. Or selects/deselects specific item.


<div class="meta-api-description">
How to programmatically change the selected item in Kendo UI bottom navigation? Retrieve or update the actively chosen item in bottom navigation menus, control selection state programmatically, fetch which item is currently selected, set a specific menu item as selected or deselect it, toggle selection status for navigation options, clear all selected entries, dynamically manage user interface navigation choices via code, query or modify the highlighted navigation item, manipulate selection in bottom navigation bars through method calls, handle item selection states for navigation controls within applications.
</div>

#### Parameters

##### element `HTMLElement|jQuery` *(required)*

The element to be selected/deselected.

##### state `Boolean` *(optional)*

Forces the selected state to the specified one.

#### Returns

`jQuery` if no element is specified returns the currently selected one.

#### Example

    <nav id="bottomnav"></nav>

    <script>
        var bottomNav = $("#bottomnav").kendoBottomNavigation({
            items: [
                { text: "Home", icon: "home" },
                { text: "Info", icon: "info-circle" },
                { text: "Contact", icon: "envelope" }
            ]
        }).data("kendoBottomNavigation");

        bottomNav.select(bottomNav.item(0));
        console.log(bottomNav.select().text());
    </script>

### showText

Toggles the visibility of all items' text elements in the BottomNavigation.


<div class="meta-api-description">
How to toggle label visibility on Kendo UI bottom navigation? Control the visibility of navigation item labels by toggling all text elements on or off in the bottom navigation bar, enabling dynamic updates to show or hide item titles after initialization, instantly reflecting changes in label display for every rendered menu item and allowing flexible customization of interface text visibility in navigation components.
</div>

#### Parameters

##### show `Boolean`

A bool value to toggle the visibility state of the text element.

#### Example

    <nav id="bottomnav"></nav>

    <script>
        var bottomNav = $("#bottomnav").kendoBottomNavigation({
            items: [
                { text: "Home", icon: "home" },
                { text: "Info", icon: "info-circle" },
                { text: "Contact", icon: "envelope" }
            ]
        }).data("kendoBottomNavigation");

        bottomNav.showText(false);
    </script>

## Events

### select

Fires when the user selects an item in BottomNavigation.


<div class="meta-api-description">
How can I capture when a user selects an option in a Kendo UI BottomNavigation component? Capture and respond to user interactions when selecting navigation items, detect which bottom navigation option is chosen by the user, trigger actions or updates based on the selection event, listen for navigation item clicks or taps, retrieve details about the selected element such as its position or identifier, handle selection changes dynamically to update interfaces or perform navigation, implement event handlers for item selection in bottom navigation menus, manage user-driven choice events to control application flow or UI state, detect and process user selection events within bottom navigation components, enable reaction to specific navigation item activations through event listeners providing context about the selected item.
</div>

#### Event Data

##### e.originalEvent `Object`

The original DOM event.

##### e.sender `kendo.ui.BottomNavigation`

The **BottomNavigation** instance that triggered the event.

##### e.data `Object`

The contextual data passed via `items.data` option.

##### e.item `jQuery`

The item selected.

##### e.preventDefault `Function`

If invoked prevents the item selection.

#### Example

    <nav id="bottomnav"></nav>

    <script>
        $("#bottomnav").kendoBottomNavigation({
            items: [
                { text: "Home", icon: "home", url: "http://www.telerik.com", data: { view: "home" } },
                { text: "Info", icon: "info-circle", data: { view: "info" } },
                { text: "Contact", icon: "envelope", data: { view: "email" } }
            ],
            select: function (ev) {
                var data = ev.data;
                var item = ev.item;

                if (item.is("a")) {
                    // prevent navigation from links.
                    ev.originalEvent.preventDefault();
                }

                if (data.view === "email") {
                    // prevent selection
                    ev.preventDefault();
                }

                alert(data.view);
            }
        })
    </script>
