---
title: Drawer
page_title: Configuration, methods and events of Kendo UI Drawer
description: Set direction of the Kendo UI Drawer container, use methods to show and hide it.
res_type: api
component: drawer
---

# kendo.ui.Drawer

Represents the Kendo UI Drawer widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### autoCollapse `Boolean` *(default: true)*

Specifies if the Drawer will be automatically collapsed when an item is clicked.


<div class="meta-api-description">
How to automatically collapse Kendo UI for jQuery Drawer after navigation link is clicked? Control the behavior of a side panel to automatically hide, collapse, or close when a navigation link or menu item is selected, enabling smooth click or touch interactions. Configure whether the navigation drawer or menu panel should shrink, fold, or retract itself after user selection to improve user experience on mobile or desktop interfaces requiring dynamic panel visibility control. Manage settings to enable or disable the automatic hiding or collapsing action triggered by user navigation input, optimizing for responsive design and streamlined navigation workflows.
</div>

#### Example

    <div id="drawer">
        <div>Content area content.</div>
    </div>
    <script>
        $(document).ready(function() {
            var drawerInstance = $("#drawer").kendoDrawer({
                template: `<ul><li data-role='drawer-item'><span class='k-icon k-i-star'></span><span class='item-text'>item 1</span></li><li data-role='drawer-separator'></li><li data-role='drawer-item'><span class='k-icon k-i-x-logo'></span><span class='item-text'>item 2</span></li></ul>`,
                autoCollapse: false
            }).data("kendoDrawer");

            drawerInstance.show();
        });
    </script>

### expanded `Boolean` *(default: false)*

Specifies if the Drawer will be expanded by default.


<div class="meta-api-description">
How do I control the initial state of a Kendo UI for jQuery navigation drawer? Control the initial open or closed state of a side panel, sidebar, or navigation drawer by setting it to expand or collapse when the interface loads. Configure the default visibility, enable the drawer to start opened or closed at initialization, set whether the sidebar or menu is expanded automatically, and manage the default layout by specifying if the panel should be shown or hidden on component startup. Adjust the property to control if the drawer appears expanded by default, ensuring the user interface reflects the desired initial accessibility and navigation display.
</div>

#### Example

    <div id="drawer">
      <div>Content area content.</div>
    </div>
    <script>
      $("#drawer").kendoDrawer({
        expanded: true,
        mode: "push",
        template: `<ul><li data-role='drawer-item'><span class='k-icon k-i-star'></span><span class='item-text'>item 1</span></li><li data-role='drawer-separator'></li><li data-role='drawer-item'><span class='k-icon k-i-x-logo'></span><span class='item-text'>item 2</span></li></ul>`,
        position: 'left'
      });
    </script>

### items `Array`

Specifies the items rendered by the Drawer when the top-level `template` option is not set. Each item can define text, icon, state, custom attributes, per-item template functions, and nested child items through `items.items`. If `template` is configured, it takes precedence and the `items` configuration is ignored.


<div class="meta-api-description">
How do I bind or configure Drawer navigation items in Kendo UI for jQuery? Populate a drawer, sidebar, or slide-out navigation panel from an array of item objects, control text, icons, separators, selected and enabled states, nested child entries, per-item rendering, and custom attributes, and manage generated navigation structures for side menus without hand-writing the full HTML template. Configure menu data for a drawer, set up hierarchical navigation items, customize generated list entries, and ask how to render Drawer items from data instead of a static template.
</div>

#### Example - configure generated Drawer items

    <div id="drawer">
        <div>Content area content.</div>
    </div>
    <script>
        $("#drawer").kendoDrawer({
            mode: "push",
            position: "left",
            items: [
                { text: "Home", icon: "home", selected: true },
                { text: "Reports", icon: "chart-bar" },
                { separator: true },
                {
                    text: "Settings",
                    icon: "gear",
                    items: [
                        { text: "Profile", icon: "user" },
                        { text: "Notifications", icon: "bell" }
                    ]
                }
            ]
        });
    </script>

### items.text `String`

Defines the text of the item. If not set, the generated item renders no text.


<div class="meta-api-description">
How do I set the text label for a Drawer item in Kendo UI for jQuery? Configure the visible caption, label, title, or item text shown in generated drawer navigation entries, control whether an item displays descriptive text or appears without a label, and customize the wording used for side menu options, navigation rows, or hierarchical drawer entries in the generated item surface.
</div>

#### Example - set item text

    <div id="drawer">
        <div>Content area content.</div>
    </div>
    <script>
        $("#drawer").kendoDrawer({
            mode: "push",
            items: [
                { text: "Inbox", icon: "inbox" },
                { text: "Archive", icon: "folder" }
            ]
        });
    </script>

### items.icon `String`

Defines the name for an existing icon in a Kendo UI theme.

See [web font icons help article](/styles-and-layout/icons-web) for more details on Kendo UI icons.


<div class="meta-api-description">
How do I show icons in generated Drawer items? Configure a theme icon name for each drawer entry, set icons for navigation items in a sidebar or slide-out menu, customize the graphic shown next to drawer labels, and choose built-in Kendo UI icons for generated side navigation items to improve recognition and visual hierarchy.
</div>

#### Example - configure item icons

    <div id="drawer">
        <div>Content area content.</div>
    </div>
    <script>
        $("#drawer").kendoDrawer({
            mode: "push",
            items: [
                { text: "Dashboard", icon: "home" },
                { text: "Files", icon: "folder" },
                { text: "Preferences", icon: "gear" }
            ]
        });
    </script>

### items.separator `Boolean` *(default: false)*

Defines a separator item. When set to `true`, the Drawer renders a separator instead of a clickable item.


<div class="meta-api-description">
How do I add separators between Drawer items in Kendo UI for jQuery? Insert divider rows or separator elements inside generated drawer navigation, break item groups apart visually, configure non-clickable separator entries between menu items, and organize side menu content with section breaks in the generated Drawer items collection.
</div>

#### Example - render a separator item

    <div id="drawer">
        <div>Content area content.</div>
    </div>
    <script>
        $("#drawer").kendoDrawer({
            mode: "push",
            items: [
                { text: "Overview", icon: "home" },
                { separator: true },
                { text: "Administration", icon: "gear" }
            ]
        });
    </script>

### items.selected `Boolean` *(default: false)*

Toggles the selected state of the item.


<div class="meta-api-description">
How do I preselect a generated Drawer item in Kendo UI for jQuery? Configure which drawer navigation entry starts active, highlighted, chosen, or selected, initialize a selected state for generated side menu items, and control the active item in a Drawer so the current section or route is visually indicated when the widget is rendered.
</div>

#### Example - select an item by default

    <div id="drawer">
        <div>Content area content.</div>
    </div>
    <script>
        $("#drawer").kendoDrawer({
            mode: "push",
            items: [
                { text: "Overview", icon: "home" },
                { text: "Profile", icon: "user", selected: true },
                { text: "Security", icon: "lock" }
            ]
        });
    </script>

### items.enabled `Boolean` *(default: true)*

Toggles the enabled state of the item.


<div class="meta-api-description">
How do I disable individual Drawer items in Kendo UI for jQuery? Control whether generated drawer entries are enabled, disabled, interactive, clickable, or available for selection, configure inactive side menu items based on permissions or workflow state, and manage which generated navigation items can respond to user input inside the Drawer.
</div>

#### Example - disable an item

    <div id="drawer">
        <div>Content area content.</div>
    </div>
    <script>
        $("#drawer").kendoDrawer({
            mode: "push",
            items: [
                { text: "Projects", icon: "folder" },
                { text: "Billing", icon: "dollar", enabled: false },
                { text: "Support", icon: "question-circle" }
            ]
        });
    </script>

### items.cssClass `String`

Defines the class names of the generated item element.


<div class="meta-api-description">
How can I add custom CSS classes to generated Drawer items? Apply custom styling hooks, class names, or theme modifiers to individual drawer entries, control per-item appearance in a side navigation menu, assign classes for custom layouts or states, and configure generated Drawer item elements for targeted CSS styling and automation.
</div>

#### Example - add custom classes to an item

    <div id="drawer">
        <div>Content area content.</div>
    </div>
    <script>
        $("#drawer").kendoDrawer({
            mode: "push",
            items: [
                { text: "Priority", icon: "star", cssClass: "priority-item" },
                { text: "Standard", icon: "home" }
            ]
        });
    </script>

### items.attr `Object`

Defines custom HTML attributes of the generated item element.


<div class="meta-api-description">
How do I set custom HTML attributes on generated Drawer items? Configure data attributes, ARIA attributes, titles, IDs, and other DOM attributes for generated drawer navigation elements, add metadata or accessibility settings to side menu items, and control the rendered HTML attributes for individual Drawer entries without writing the full top-level template.
</div>

#### Example - configure custom item attributes

    <div id="drawer">
        <div>Content area content.</div>
    </div>
    <script>
        $("#drawer").kendoDrawer({
            mode: "push",
            items: [
                {
                    text: "Reports",
                    icon: "chart-bar",
                    attr: {
                        "data-section": "reports",
                        "title": "Open Reports"
                    }
                },
                { text: "Users", icon: "user" }
            ]
        });
    </script>

### items.template `Function`

Sets a custom template function for the item. The implemented items surface supports function values only. The function must return the item markup. If the top-level `template` option is configured, it takes precedence over `items` and per-item templates are not used.


<div class="meta-api-description">
How do I customize the markup of a single Drawer item instead of the whole Drawer? Provide a per-item rendering function for generated drawer entries, override the default HTML of a specific side menu item, return custom markup for an individual Drawer item, and configure item-level rendering for generated navigation while keeping the overall Drawer on the items surface instead of switching to the top-level template.
</div>

#### Example - use a per-item template function

    <div id="drawer">
        <div>Content area content.</div>
    </div>
    <script>
        $("#drawer").kendoDrawer({
            mode: "push",
            items: [
                {
                    text: "Profile",
                    icon: "user",
                    template: function(item) {
                        return "<li data-role='drawer-item'>" +
                            kendo.ui.icon({ icon: item.icon }) +
                            "<span class='k-item-text'>" + kendo.htmlEncode(item.text) + "</span>" +
                            "</li>";
                    }
                },
                { text: "Preferences", icon: "gear" }
            ]
        });
    </script>

### items.miniTemplate `Function`

Sets a custom template function for the item in mini mode. The implemented items surface supports function values only. The function must return the item markup used while the Drawer is collapsed in mini mode. If `mini.template` is configured, it takes precedence over `items.miniTemplate`.


<div class="meta-api-description">
How do I customize a generated Drawer item only in mini mode? Configure a per-item mini-mode rendering function for collapsed drawer navigation, return custom compact markup for individual items when the Drawer is minimized, tailor icon-only or condensed side menu entries per item, and ask how to override mini rendering for specific Drawer items while keeping the full items surface for normal mode.
</div>

#### Example - use a per-item mini template function

    <div id="drawer">
        <div>Content area content.</div>
    </div>
    <script>
        $("#drawer").kendoDrawer({
            mode: "push",
            mini: {
                width: 60
            },
            items: [
                {
                    text: "Inbox",
                    icon: "inbox",
                    miniTemplate: function(item) {
                        return "<li data-role='drawer-item' title='" + kendo.htmlEncode(item.text) + "'>" +
                            kendo.ui.icon({ icon: item.icon }) +
                            "</li>";
                    }
                },
                { text: "Archive", icon: "folder" }
            ]
        });
    </script>

### items.items `Array`

Specifies nested child items. The Drawer renders child items recursively by using the same item configuration surface.


<div class="meta-api-description">
How do I create nested or hierarchical Drawer items in Kendo UI for jQuery? Build multilevel drawer navigation with child items, configure recursive side menu structures, add subitems or nested menu entries inside generated Drawer items, and represent parent-child navigation trees in a slide-out menu using nested arrays of item definitions.
</div>

#### Example - configure nested Drawer items

    <div id="drawer">
        <div>Content area content.</div>
    </div>
    <script>
        $("#drawer").kendoDrawer({
            expanded: true,
            mode: "push",
            items: [
                {
                    text: "Management",
                    icon: "folder",
                    items: [
                        { text: "Team", icon: "user" },
                        { text: "Projects", icon: "home", selected: true }
                    ]
                },
                { text: "Help", icon: "question-circle" }
            ]
        });
    </script>

### items.expanded `Boolean` *(default: false)*

Toggles the initial expanded state of the item. When set to `true`, the item starts expanded and its child items are visible. Clicking a parent item toggles expand and collapse regardless of this setting.


<div class="meta-api-description">
How do I pre-expand a parent Drawer item with nested children in Kendo UI for jQuery? Configure which parent drawer navigation entries start open or expanded when the widget is rendered, control the default visibility of child items under a parent, initialize a nested drawer item group in an expanded or open state, and manage which hierarchical drawer groups are pre-opened to show their children without requiring user interaction.
</div>

#### Example - pre-expand a parent item

    <div id="drawer">
        <div>Content area content.</div>
    </div>
    <script>
        $("#drawer").kendoDrawer({
            expanded: true,
            mode: "push",
            items: [
                {
                    text: "Management",
                    icon: "folder",
                    expanded: true,
                    items: [
                        { text: "Team", icon: "user" },
                        { text: "Projects", icon: "home" }
                    ]
                },
                { text: "Help", icon: "question-circle" }
            ]
        });
    </script>

### position `String` *(default: 'left')*

The position of the drawer. Can be `left` (default) or `right`.


<div class="meta-api-description">
How do I set the position of a Kendo UI drawer to open from the left or right side? Set or configure the side from which a sliding panel, drawer, or sidebar appears, controlling whether it opens, anchors, docks, or slides in from the left or right edge of the screen or container; useful for positioning user interface panels, navigation menus, or overlay components by specifying their entry or attachment side, adjusting placement or alignment to left or right directions to match layout requirements or user preferences.
</div>

#### Example

    <div id="drawer">
        <div>Content area content.</div>
    </div>
    <script>
        $(document).ready(function() {
            var drawerInstance = $("#drawer").kendoDrawer({
                template: `<ul><li data-role='drawer-item'><span class='k-icon k-i-star'></span><span class='item-text'>item 1</span></li><li data-role='drawer-separator'></li><li data-role='drawer-item'><span class='k-icon k-i-x-logo'></span><span class='item-text'>item 2</span></li></ul>`,
                position: 'right'
            }).data("kendoDrawer");

            drawerInstance.show();
        });
    </script>

### mode `String` *(default: 'overlay')*

Determines how the Kendo UI Drawer will interact with the associated content. The default one (overlay) will simply overlap the associated content with overlay effect. On the other hand "push" mode will show the drawer next to associated cotent. The associated content will shrink its content.


<div class="meta-api-description">
How does the mode property affect the interaction between the drawer panel and main content in Kendo UI for jQuery? Configure how a sliding panel or sidebar interacts with the main content by choosing between overlaying the content with a semi-transparent layer or pushing and resizing the content area to make room for the panel. Control whether the panel appears on top of the existing content with dimming effects or shifts the layout to display alongside the content, affecting the viewport's size and visible space. Enable, set, or adjust the behavior of a side menu, drawer, or sidebar to either float above the page elements with a modal effect or slide in while compressing or repositioning the adjacent content area for responsive and interactive UI layouts. Customize the display mode to determine if the navigation drawer overlaps or shares screen real estate with the main application view, impacting user accessibility and interface responsiveness.
</div>

#### Example

    <div id="drawer">
        <div>Content area content.</div>
    </div>
    <script>
        $(document).ready(function() {
            var drawerInstance = $("#drawer").kendoDrawer({
                mode: "push",
                template: `<ul><li data-role='drawer-item'><span class='k-icon k-i-star'></span><span class='item-text'>item 1</span></li><li data-role='drawer-separator'></li><li data-role='drawer-item'><span class='k-icon k-i-x-logo'></span><span class='item-text'>item 2</span></li></ul>`,
                position: 'left'
            }).data("kendoDrawer");

            drawerInstance.show();
        });
    </script>

### navigatable `Boolean` *(default: false)*

If set to `true` the use could navigate the widget using the keyboard navigation. By default keyboard navigation is disabled.


<div class="meta-api-description">
How do I enable keyboard navigation in Kendo UI for jQuery Drawer control? Control keyboard interaction with the sliding panel by enabling or disabling keyboard-based navigation, allowing users to move focus within the drawer using keys like Tab, arrow keys, or other keyboard inputs; configure, activate, or set keyboard focus control to improve accessibility, support tabbing through elements inside the drawer, and handle keyboard-driven navigation flows within the component, ensuring keyboard users can seamlessly interact with drawer content by toggling navigation capabilities on or off.
</div>

#### Example

    <div id="drawer">
        <div>Content area content.</div>
    </div>
    <script>
        $(document).ready(function() {
            var drawerInstance = $("#drawer").kendoDrawer({
                mode: "push",
                navigatable: true,
                template: `<ul><li data-role='drawer-item'><span class='k-icon k-i-star'></span><span class='item-text'>item 1</span></li><li data-role='drawer-separator'></li><li data-role='drawer-item'><span class='k-icon k-i-x-logo'></span><span class='item-text'>item 2</span></li></ul>`,
                position: 'left'
            }).data("kendoDrawer");

            drawerInstance.show();
        });
    </script>

### template `String | Function`

Specifies the drawer's content. When configured, it takes precedence over `items`.


<div class="meta-api-description">
How do I customize the content of the Kendo UI Drawer? Customize the sliding panel content by defining a template or template function that controls the HTML structure, layout, and dynamic data binding inside the drawer or side menu, enabling replacement of default areas with personalized markup, custom components, or rendering expressions during setup, configuration, or runtime to tailor the appearance and behavior of the drawer content.
</div>

#### Example

    <div id="drawer">
        <div>Content area content.</div>
    </div>
    <script>
        $(document).ready(function() {
            var drawerInstance = $("#drawer").kendoDrawer({
                mode: "push",
                template: `<ul><li data-role='drawer-item'><span class='k-icon k-i-star'></span><span class='item-text'>item 1</span></li><li data-role='drawer-separator'></li><li data-role='drawer-item'><span class='k-icon k-i-x-logo'></span><span class='item-text'>item 2</span></li></ul>`,
                position: 'left'
            }).data("kendoDrawer");

            drawerInstance.show();
        });
    </script>

### minHeight `Number`

Specifies the minimum height for the drawer in push mode. The overlay mode takes 100% of the page height.


<div class="meta-api-description">
How do I set the minimum height of a Kendo UI Drawer in jQuery? Set or configure the minimum vertical height constraint to control the smallest size a sliding panel or sidebar occupies on the screen during expanded or partial display in push mode, ensuring consistent layout and smooth transitions while preventing collapse below a set threshold, with override behavior where full screen overlay mode ignores this limit and stretches the panel to fill the entire page height.
</div>

#### Example

    <div id="drawer">
        <div>Content area content.</div>
    </div>
    <script>
        $(document).ready(function() {
            var drawerInstance = $("#drawer").kendoDrawer({
                mode: "push",
                template: `<ul><li data-role='drawer-item'><span class='k-icon k-i-star'></span><span class='item-text'>item 1</span></li></ul>`,
                position: 'left',
                minHeight: 200
            }).data("kendoDrawer");

            drawerInstance.show();
        });
    </script>

### mini `Boolean | Object`

Enables or configures the mini mode for the Kendo UI Drawer. This is a compact view that is displayed when the Kendo UI Drawer is collapsed. Usually it used to show only the icons when the drawer content contains icon and text for an item. When set to `true` it uses the main template.


<div class="meta-api-description">
How to enable a minimized drawer view in Kendo UI for jQuery? Control or configure a compact or collapsed sidebar display that minimizes the navigation panel to icons only, enabling space-saving layouts and streamlined user interfaces; toggle or set a minimized drawer view that hides text labels and shows only icons for items, customize how the drawer appears when collapsed, define mini mode behavior with simple true/false settings or detailed object configurations to adjust the appearance and rendering of the minimized navigation panel, enable a slim or condensed sidebar that conserves screen space while maintaining access to key navigation icons.
</div>

#### Example

    <div id="drawer">
        <div>Content area content.</div>
    </div>
    <script>
        $(document).ready(function() {
            var drawerInstance = $("#drawer").kendoDrawer({
                mode: "push",
                template: `<ul><li data-role='drawer-item'><span class='k-icon k-i-star'></span><span class='item-text'>item 1</span></li><li data-role='drawer-separator'></li><li data-role='drawer-item'><span class='k-icon k-i-x-logo'></span><span class='item-text'>item 2</span></li></ul>`,
                position: 'left',
                mini: true
            }).data("kendoDrawer");
        });
    </script>

### mini.width `Number`

Defines a specific width for the Kendo UI Drawer when in mini mode.


<div class="meta-api-description">
How do I adjust the width of the minimized drawer in Kendo UI for jQuery? Adjust the compact navigation panel width to control how narrow or wide the drawer appears when minimized or collapsed, enabling customization of the sidebar’s slim mode size for responsive designs, mini drawer layouts, or slim navigation bars. Configure or set the minimized panel’s visible width to balance space usage and accessibility, controlling the narrow sidebar width in collapsed, small, or mini mode for responsive user interfaces and compact navigation controls.
</div>

#### Example

    <div id="drawer">
        <div>Content area content.</div>
    </div>
    <script>
        $(document).ready(function() {
            var drawerInstance = $("#drawer").kendoDrawer({
                mode: "push",
                template: `<ul><li data-role='drawer-item'><span class='k-icon k-i-star'></span><span class='item-text'>item 1</span></li><li data-role='drawer-separator'></li><li data-role='drawer-item'><span class='k-icon k-i-x-logo'></span><span class='item-text'>item 2</span></li></ul>`,
                position: 'left',
                mini: {
                    width: 45
                }
            }).data("kendoDrawer");
        });
    </script>

### mini.template `String | Function`

Defines a specific template for the Kendo UI Drawer when in mini mode. When configured, it takes precedence over `items.miniTemplate`.


<div class="meta-api-description">
How to customize the collapsed view of Kendo UI for jQuery Drawer? Customize the collapsed drawer view by specifying custom templates or content to control exactly what markup, layout, and bindings appear when the navigation drawer is minimized or in mini mode, enabling tailored display, alternate icons, compact menus, or simplified interfaces during drawer collapse, with options to configure rendering behavior, override default mini layouts, or set specialized visuals and components for reduced sidebar states.
</div>

#### Example

    <div id="drawer">
        <div>Content area content.</div>
    </div>
    <script>
        $(document).ready(function() {
            var drawerInstance = $("#drawer").kendoDrawer({
                mode: "push",
                template: `<ul><li data-role='drawer-item'><span class='k-icon k-i-star'></span><span class='item-text'>item 1</span></li><li data-role='drawer-separator'></li><li data-role='drawer-item'><span class='k-icon k-i-x-logo'></span><span class='item-text'>item 2</span></li></ul>`,
                position: 'left',
                mini: {
                    width: 45,
                    template: handler
                }
            }).data("kendoDrawer");
        });

        function handler() {
            return `<ul>
                <li data-role='drawer-item'>
                    ${generateIcon('anchor')}
                </li>
                <li data-role='drawer-item'>
                    ${generateIcon('info-circle')}
                </li>
            </ul>`
        }

        function generateIcon(iconName){
            return kendo.ui.icon(iconName);
        }
    </script>

### swipeToOpen `Boolean` *(default: true)*

If set to `false`, swiping the associated content will not activate the drawer. In this case, the drawer will only be open by calling the show method.

`swipeToOpen` should be disabled for browsers, which use side swiping gestures for back/forward navigation, such as iOS Safari. Otherwise, users should swipe from an inner part of the view, and not from the view edge.


<div class="meta-api-description">
How to disable swipe-to-open navigation drawer in Kendo UI for jQuery? Enable or disable the ability to open a side panel or navigation drawer using swipe gestures, controlling whether users can reveal the drawer by swiping from the screen edge or within the app view. Configure gesture recognition for opening the drawer, manage swipe interactions to prevent accidental activation, and handle platform-specific behaviors like side-swipe navigation on iOS Safari or other touch-enabled browsers. Adjust settings to require swipes from specific areas or completely disable swipe-to-open functionality to control how and when the drawer becomes visible, ensuring consistent user experience across devices and interaction patterns.
</div>

#### Example

    <div id="drawer">
        <div>Content area content.</div>
    </div>
    <script>
        $(document).ready(function() {
            var drawerInstance = $("#drawer").kendoDrawer({
                template: `<ul><li data-role='drawer-item'><span class='k-icon k-i-star'></span><span class='item-text'>item 1</span></li><li data-role='drawer-separator'></li><li data-role='drawer-item'><span class='k-icon k-i-x-logo'></span><span class='item-text'>item 2</span></li></ul>`,
                swipeToOpen: false
            }).data("kendoDrawer");

            drawerInstance.show();
        });
    </script>

### width `Number`

Defines a specific width for the Kendo UI Drawer when expanded.


<div class="meta-api-description">
How do I set a fixed width for a Kendo UI Drawer? Adjust or configure the expanded size, width, or overall dimension of a sliding panel or sidebar to control layout and spacing in user interfaces, enabling customization of the panel’s visual width, setting fixed or specific widths, modifying the expanded drawer size, resizing side menus or navigation drawers, managing how wide the drawer appears when open, and tailoring the horizontal space the panel occupies to fit design or UI requirements.
</div>

#### Example

    <div id="drawer">
        <div>Content area content.</div>
    </div>
    <script>
        $(document).ready(function() {
            var drawerInstance = $("#drawer").kendoDrawer({
                mode: "push",
                template: `<ul><li data-role='drawer-item'><span class='k-icon k-i-star'></span><span class='item-text'>item 1</span></li><li data-role='drawer-separator'></li><li data-role='drawer-item'><span class='k-icon k-i-x-logo'></span><span class='item-text'>item 2</span></li></ul>`,
                position: 'left',
                width: 200
            }).data("kendoDrawer");
        });
    </script>

## Methods

### destroy

Prepares the **Drawer** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the Drawer element from DOM.


<div class="meta-api-description">
What happens when I call the destroy method on a Kendo UI Drawer component? Remove or clean up a sliding panel or menu component by detaching event listeners, clearing internal data and references, and properly disposing of nested or child UI components to prevent memory leaks and lingering handlers without deleting the element from the page structure. Handle teardown, disable, or reset interactive sidebar elements safely by releasing associated events, cleaning stored metadata, and invoking destruction routines on embedded widgets, ensuring efficient resource management and avoiding residual bindings while keeping the DOM intact.
</div>

#### Example

    <button  class='destroy'>Destroy</button>
    <div id="drawer">
            <div>Content area content.</div>
        </div>
        <script>
            $(document).ready(function() {
                var drawerInstance = $("#drawer").kendoDrawer({
                    mode: "push",
                    template: `<ul><li data-role='drawer-item'><span class='k-icon k-i-star'></span><span class='item-text'>item 1</span></li><li data-role='drawer-separator'></li><li data-role='drawer-item'><span class='k-icon k-i-x-logo'></span><span class='item-text'>item 2</span></li></ul>`,
                    position: 'left'
                }).data("kendoDrawer");

                $('.destroy').click(function() {
                    drawerInstance.destroy();
                });
            });
        </script>

### hide

Hide the Drawer


<div class="meta-api-description">
How do I programmatically hide a Kendo UI Drawer component? Programmatically close, collapse, or hide a side panel or overlay menu to control its visibility dynamically, including toggling a drawer UI component after setup in response to navigation events, user interactions, or adaptive/responsive layout changes. Enable developers to set, trigger, or manage the hidden state of slide-out panels or menus on demand, allowing automatic or manual concealment of sidebar panels through code commands for user interface control and state transitions.
</div>

#### Example

    <button id='show'>Show</button>
    <button id='hide'>Hide</button>
    <div id="drawer">
            <div>Content area content.</div>
        </div>
        <script>
            $(document).ready(function() {
                var drawerInstance = $("#drawer").kendoDrawer({
                    mode: "push",
                    template: `<ul><li data-role='drawer-item'><span class='k-icon k-i-star'></span><span class='item-text'>item 1</span></li><li data-role='drawer-separator'></li><li data-role='drawer-item'><span class='k-icon k-i-x-logo'></span><span class='item-text'>item 2</span></li></ul>`,
                    position: 'left'
                }).data("kendoDrawer");

                $('#show').click(function() {
                    drawerInstance.show();
                });
                $('#hide').click(function() {
                    drawerInstance.hide();
                });
            });
        </script>

### show

Show the Drawer


<div class="meta-api-description">
How can I programmatically show a Kendo UI drawer? Trigger the drawer to open or slide into view programmatically by invoking a function that makes the drawer visible, initiates its configured animations, positioning, sliding mode, or expansion behavior, and activates any linked open events or callbacks; enable or set drawer visibility dynamically from code to control its appearance on demand after initialization, supporting use cases like toggling, showing, or programmatically expanding side panels, navigation drawers, or overlay menus.
</div>

#### Example

    <button id='show'>Show</button>
    <button id='hide'>Hide</button>
    <div id="drawer">
            <div>Content area content.</div>
        </div>
        <script>
            $(document).ready(function() {
                var drawerInstance = $("#drawer").kendoDrawer({
                    mode: "push",
                    template: `<ul><li data-role='drawer-item'><span class='k-icon k-i-star'></span><span class='item-text'>item 1</span></li><li data-role='drawer-separator'></li><li data-role='drawer-item'><span class='k-icon k-i-x-logo'></span><span class='item-text'>item 2</span></li></ul>`,
                    position: 'left'
                }).data("kendoDrawer");

                $('#show').click(function() {
                    drawerInstance.show();
                });
                $('#hide').click(function() {
                    drawerInstance.hide();
                });
            });
        </script>


## Events

### hide

Fired when the Kendo UI Drawer is about to be hidden. The event can be prevented by calling the `preventDefault` method of the event parameter.


<div class="meta-api-description">
How can I prevent a Kendo UI for jQuery Drawer from hiding programmatically? Detect or intercept the moment just before a sliding panel, sidebar, or drawer UI element closes or hides, enabling execution of custom logic, cancellation, or prevention of the hide or close action by listening for or handling an event triggered prior to the component disappearing or collapsing. This event allows developers to control, stop, block, or abort the closing transition based on conditions, user input, or state, providing hooks for validation, prompts, or cleanup before the drawer or overlay vanishes from view.
</div>

#### Example

    <div id="drawer">
            <div>Content area content.</div>
        </div>
        <script>
            $(document).ready(function() {
                var drawerInstance = $("#drawer").kendoDrawer({
                    mode: "push",
                    template: `<ul><li data-role='drawer-item'><span class='k-icon k-i-star'></span><span class='item-text'>item 1</span></li><li data-role='drawer-separator'></li><li data-role='drawer-item'><span class='k-icon k-i-x-logo'></span><span class='item-text'>item 2</span></li></ul>`,
                    position: 'left',
                    hide: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
                        console.log("Drawer is about to be hidden");
                    }

                }).data("kendoDrawer");
            });
        </script>

#### Event Data

##### e.sender `kendo.ui.Drawer`

The widget instance which fired the event.

### show

Fires before the Kendo UI Drawer is revealed. The event can be prevented by calling the `preventDefault` method of the event parameter.


<div class="meta-api-description">
How to prevent Kendo UI Drawer from showing until user is authenticated? Intercept or control the process of opening a sidebar or slide-out panel by handling events triggered just before it becomes visible, enabling you to run validation checks, execute asynchronous logic, enforce permissions, modify component state, or block automatic opening through event cancellation techniques, preventing the panel from revealing until certain conditions are met, such as user authentication, feature toggles, or dynamic validations before displaying the drawer interface.
</div>

#### Example

    <div id="drawer">
            <div>Content area content.</div>
        </div>
        <script>
            $(document).ready(function() {
                var drawerInstance = $("#drawer").kendoDrawer({
                    mode: "push",
                    template: `<ul><li data-role='drawer-item'><span class='k-icon k-i-star'></span><span class='item-text'>item 1</span></li><li data-role='drawer-separator'></li><li data-role='drawer-item'><span class='k-icon k-i-x-logo'></span><span class='item-text'>item 2</span></li></ul>`,
                    position: 'left',
                    show: function(e) {
                        e.preventDefault();
                    }

                }).data("kendoDrawer");
            });
        </script>

### itemClick

Fires when the user clicks an item in the Kendo UI Drawer.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

<div class="meta-api-description">
How do I handle Drawer item clicks and get the clicked item data in Kendo UI for jQuery? Detect item selection in generated Drawer navigation, respond to clicks on side menu entries, access the clicked DOM element, retrieve the item configuration object for generated items, determine which Drawer entry was activated, and handle navigation logic or state changes when users click Drawer items rendered from the items surface or a custom template.
</div>

#### Event Data

##### e.item `jQuery`

The clicked item element.

##### e.dataItem `Object`

The item configuration object for generated items. When the Drawer uses the top-level `template` option, `e.dataItem` is `undefined`.

##### e.sender `kendo.ui.Drawer`

The widget instance which fired the event.

#### Example - subscribe to the "itemClick" event during initialization

    <div id="drawer">
        <div>Content area content.</div>
    </div>
    <script>
        $("#drawer").kendoDrawer({
            mode: "push",
            position: "left",
            items: [
                { text: "Home", icon: "home" },
                { text: "Settings", icon: "gear" }
            ],
            itemClick: function(e) {
                alert("Clicked: " + e.dataItem.text);
            }
        });
    </script>

#### Example - subscribe to the "itemClick" event after initialization

    <div id="drawer-after-init">
        <div>Content area content.</div>
    </div>
    <script>
        var drawer = $("#drawer-after-init").kendoDrawer({
            mode: "push",
            position: "left",
            items: [
                { text: "Projects", icon: "folder" },
                { text: "Team", icon: "user" }
            ]
        }).data("kendoDrawer");

        drawer.bind("itemClick", function(e) {
            alert("Clicked element text: " + $.trim(e.item.text()));
        });
    </script>

## Fields

### visible `Boolean`

Holds information about the current state of the Drawer. If it is currently opened then the visible field will be set to true.


<div class="meta-api-description">
How to check if Kendo UI Drawer is currently open in jQuery? Determine if the sidebar panel or sliding drawer is currently open or closed, track its visibility state as a boolean toggle, monitor and respond to changes in drawer display status, check whether the navigation or options drawer is shown or hidden at runtime, access and observe the drawer’s open state to control UI behavior, detect when to render or hide content based on the drawer being active or inactive, enable conditional logic driven by whether the drawer is expanded or collapsed, read real-time visibility flags for side menus or panel overlays, and integrate state checks for toggling interface elements dependent on drawer presence.
</div>

#### Example - get the current Drawer state

    <button id='show'>Show</button>
    <div id="drawer">
            <div>Content area content.</div>
        </div>
        <script>
            $(document).ready(function() {
                var drawerInstance = $("#drawer").kendoDrawer({
                    mode: "push",
                    template: `<ul><li data-role='drawer-item'><span class='k-icon k-i-star'></span><span class='item-text'>item 1</span></li><li data-role='drawer-separator'></li><li data-role='drawer-item'><span class='k-icon k-i-x-logo'></span><span class='item-text'>item 2</span></li></ul>`,
                    position: 'left'
                }).data("kendoDrawer");

                $('#show').click(function() {
                    drawerInstance.show();
	/* The result can be observed in the DevTools(F12) console of the browser. */
                    console.log(drawerInstance.visible);
                });
            });
        </script>

### kendoKeydown

Triggered when the user presses a keyboard key while the Drawer is focused.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

<div class="meta-api-description">
How do I handle keyboard events in Kendo UI Drawer? Capture and intercept keydown events fired while the Drawer is focused, enabling custom keyboard navigation, overriding default key behaviors, preventing built-in keydown logic with the preventKendoKeydown flag, canceling native browser actions via preventDefault, and implementing custom keyboard shortcuts or accessibility enhancements within the Drawer component.
</div>

#### Event Data

##### e.sender `kendo.ui.Drawer`

The widget instance which fired the event.

##### e.preventKendoKeydown `Boolean`

If set to `true` prevents the default Drawer keydown logic.

##### e.preventDefault `Function`

If invoked cancels the default action that belongs to the keydown event.

#### Example - subscribe to the "kendoKeydown" event during initialization

    <div id="drawer">
      <div data-role="drawer-content">Content area</div>
    </div>
    <script>
      $("#drawer").kendoDrawer({
        template: "<ul><li>Home</li><li>About</li></ul>",
        kendoKeydown: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log(e.keyCode);
        }
      });
    </script>

#### Example - subscribe to the "kendoKeydown" event after initialization

    <div id="drawer">
      <div data-role="drawer-content">Content area</div>
    </div>
    <script>
      $("#drawer").kendoDrawer({
        template: "<ul><li>Home</li><li>About</li></ul>",
      });
      var widget = $("#drawer").data("kendoDrawer");
      widget.bind("kendoKeydown", function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.keyCode);
      });
    </script>
