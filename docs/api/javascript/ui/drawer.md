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
Control the behavior of a side panel to automatically hide, collapse, or close when a navigation link or menu item is selected, enabling smooth click or touch interactions. Configure whether the navigation drawer or menu panel should shrink, fold, or retract itself after user selection to improve user experience on mobile or desktop interfaces requiring dynamic panel visibility control. Manage settings to enable or disable the automatic hiding or collapsing action triggered by user navigation input, optimizing for responsive design and streamlined navigation workflows.
</div>

#### Example

    <div id="drawer">
        <div>Content area content.</div>
    </div>
    <script>
        $(document).ready(function() {
            var drawerInstance = $("#drawer").kendoDrawer({
                template: `<ul><li data-role='drawer-item'><span class='k-icon k-i-star-outline'></span><span class='item-text'>item 1</span></li><li data-role='drawer-separator'></li><li data-role='drawer-item'><span class='k-icon k-i-twitter'></span><span class='item-text'>item 2</span></li></ul>`,
                autoCollapse: false
            }).data("kendoDrawer");

            drawerInstance.show();
        });
    </script>

### expanded `Boolean` *(default: false)*

Specifies if the Drawer will be expanded by default.


<div class="meta-api-description">
Control the initial open or closed state of a side panel, sidebar, or navigation drawer by setting it to expand or collapse when the interface loads. Configure the default visibility, enable the drawer to start opened or closed at initialization, set whether the sidebar or menu is expanded automatically, and manage the default layout by specifying if the panel should be shown or hidden on component startup. Adjust the property to control if the drawer appears expanded by default, ensuring the user interface reflects the desired initial accessibility and navigation display.
</div>

#### Example

    <div id="drawer">
      <div>Content area content.</div>
    </div>
    <script>
      $("#drawer").kendoDrawer({
        expanded: true,
        mode: "push",
        template: `<ul><li data-role='drawer-item'><span class='k-icon k-i-star-outline'></span><span class='item-text'>item 1</span></li><li data-role='drawer-separator'></li><li data-role='drawer-item'><span class='k-icon k-i-twitter'></span><span class='item-text'>item 2</span></li></ul>`,
        position: 'left'
      });
    </script>

### position `String` *(default: 'left')*

The position of the drawer. Can be `left` (default) or `right`.


<div class="meta-api-description">
Set or configure the side from which a sliding panel, drawer, or sidebar appears, controlling whether it opens, anchors, docks, or slides in from the left or right edge of the screen or container; useful for positioning user interface panels, navigation menus, or overlay components by specifying their entry or attachment side, adjusting placement or alignment to left or right directions to match layout requirements or user preferences.
</div>

#### Example

    <div id="drawer">
        <div>Content area content.</div>
    </div>
    <script>
        $(document).ready(function() {
            var drawerInstance = $("#drawer").kendoDrawer({
                template: `<ul><li data-role='drawer-item'><span class='k-icon k-i-star-outline'></span><span class='item-text'>item 1</span></li><li data-role='drawer-separator'></li><li data-role='drawer-item'><span class='k-icon k-i-twitter'></span><span class='item-text'>item 2</span></li></ul>`,
                position: 'right'
            }).data("kendoDrawer");

            drawerInstance.show();
        });
    </script>

### mode `String` *(default: 'overlay')*

Determines how the Kendo UI Drawer will interact with the associated content. The default one (overlay) will simply overlap the associated content with overlay effect. On the other hand "push" mode will show the drawer next to associated cotent. The associated content will shrink its content.


<div class="meta-api-description">
Configure how a sliding panel or sidebar interacts with the main content by choosing between overlaying the content with a semi-transparent layer or pushing and resizing the content area to make room for the panel. Control whether the panel appears on top of the existing content with dimming effects or shifts the layout to display alongside the content, affecting the viewport's size and visible space. Enable, set, or adjust the behavior of a side menu, drawer, or sidebar to either float above the page elements with a modal effect or slide in while compressing or repositioning the adjacent content area for responsive and interactive UI layouts. Customize the display mode to determine if the navigation drawer overlaps or shares screen real estate with the main application view, impacting user accessibility and interface responsiveness.
</div>

#### Example

    <div id="drawer">
        <div>Content area content.</div>
    </div>
    <script>
        $(document).ready(function() {
            var drawerInstance = $("#drawer").kendoDrawer({
                mode: "push",
                template: `<ul><li data-role='drawer-item'><span class='k-icon k-i-star-outline'></span><span class='item-text'>item 1</span></li><li data-role='drawer-separator'></li><li data-role='drawer-item'><span class='k-icon k-i-twitter'></span><span class='item-text'>item 2</span></li></ul>`,
                position: 'left'
            }).data("kendoDrawer");

            drawerInstance.show();
        });
    </script>

### navigatable `Boolean` *(default: false)*

If set to `true` the use could navigate the widget using the keyboard navigation. By default keyboard navigation is disabled.


<div class="meta-api-description">
Control keyboard interaction with the sliding panel by enabling or disabling keyboard-based navigation, allowing users to move focus within the drawer using keys like Tab, arrow keys, or other keyboard inputs; configure, activate, or set keyboard focus control to improve accessibility, support tabbing through elements inside the drawer, and handle keyboard-driven navigation flows within the component, ensuring keyboard users can seamlessly interact with drawer content by toggling navigation capabilities on or off.
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
                template: `<ul><li data-role='drawer-item'><span class='k-icon k-i-star-outline'></span><span class='item-text'>item 1</span></li><li data-role='drawer-separator'></li><li data-role='drawer-item'><span class='k-icon k-i-twitter'></span><span class='item-text'>item 2</span></li></ul>`,
                position: 'left'
            }).data("kendoDrawer");

            drawerInstance.show();
        });
    </script>

### template `String | Function`

Specifies the drawer's content.


<div class="meta-api-description">
Customize the sliding panel content by defining a template or template function that controls the HTML structure, layout, and dynamic data binding inside the drawer or side menu, enabling replacement of default areas with personalized markup, custom components, or rendering expressions during setup, configuration, or runtime to tailor the appearance and behavior of the drawer content.
</div>

#### Example

    <div id="drawer">
        <div>Content area content.</div>
    </div>
    <script>
        $(document).ready(function() {
            var drawerInstance = $("#drawer").kendoDrawer({
                mode: "push",
                template: `<ul><li data-role='drawer-item'><span class='k-icon k-i-star-outline'></span><span class='item-text'>item 1</span></li><li data-role='drawer-separator'></li><li data-role='drawer-item'><span class='k-icon k-i-twitter'></span><span class='item-text'>item 2</span></li></ul>`,
                position: 'left'
            }).data("kendoDrawer");

            drawerInstance.show();
        });
    </script>

### minHeight `Number`

Specifies the minimum height for the drawer in push mode. The overlay mode takes 100% of the page height.


<div class="meta-api-description">
Set or configure the minimum vertical height constraint to control the smallest size a sliding panel or sidebar occupies on the screen during expanded or partial display in push mode, ensuring consistent layout and smooth transitions while preventing collapse below a set threshold, with override behavior where full screen overlay mode ignores this limit and stretches the panel to fill the entire page height.
</div>

#### Example

    <div id="drawer">
        <div>Content area content.</div>
    </div>
    <script>
        $(document).ready(function() {
            var drawerInstance = $("#drawer").kendoDrawer({
                mode: "push",
                template: `<ul><li data-role='drawer-item'><span class='k-icon k-i-star-outline'></span><span class='item-text'>item 1</span></li></ul>`,
                position: 'left',
                minHeight: 200
            }).data("kendoDrawer");

            drawerInstance.show();
        });
    </script>

### mini `Boolean | Object`

Enables or configures the mini mode for the Kendo UI Drawer. This is a compact view that is displayed when the Kendo UI Drawer is collapsed. Usually it used to show only the icons when the drawer content contains icon and text for an item. When set to `true` it uses the main template.


<div class="meta-api-description">
Control or configure a compact or collapsed sidebar display that minimizes the navigation panel to icons only, enabling space-saving layouts and streamlined user interfaces; toggle or set a minimized drawer view that hides text labels and shows only icons for items, customize how the drawer appears when collapsed, define mini mode behavior with simple true/false settings or detailed object configurations to adjust the appearance and rendering of the minimized navigation panel, enable a slim or condensed sidebar that conserves screen space while maintaining access to key navigation icons.
</div>

#### Example

    <div id="drawer">
        <div>Content area content.</div>
    </div>
    <script>
        $(document).ready(function() {
            var drawerInstance = $("#drawer").kendoDrawer({
                mode: "push",
                template: `<ul><li data-role='drawer-item'><span class='k-icon k-i-star-outline'></span><span class='item-text'>item 1</span></li><li data-role='drawer-separator'></li><li data-role='drawer-item'><span class='k-icon k-i-twitter'></span><span class='item-text'>item 2</span></li></ul>`,
                position: 'left',
                mini: true
            }).data("kendoDrawer");
        });
    </script>

### mini.width `Number`

Defines a specific width for the Kendo UI Drawer when in mini mode.


<div class="meta-api-description">
Adjust the compact navigation panel width to control how narrow or wide the drawer appears when minimized or collapsed, enabling customization of the sidebar’s slim mode size for responsive designs, mini drawer layouts, or slim navigation bars. Configure or set the minimized panel’s visible width to balance space usage and accessibility, controlling the narrow sidebar width in collapsed, small, or mini mode for responsive user interfaces and compact navigation controls.
</div>

#### Example

    <div id="drawer">
        <div>Content area content.</div>
    </div>
    <script>
        $(document).ready(function() {
            var drawerInstance = $("#drawer").kendoDrawer({
                mode: "push",
                template: `<ul><li data-role='drawer-item'><span class='k-icon k-i-star-outline'></span><span class='item-text'>item 1</span></li><li data-role='drawer-separator'></li><li data-role='drawer-item'><span class='k-icon k-i-twitter'></span><span class='item-text'>item 2</span></li></ul>`,
                position: 'left',
                mini: {
                    width: 45
                }
            }).data("kendoDrawer");
        });
    </script>

### mini.template `String | Function`

Defines a specific template for the Kendo UI Drawer when in mini mode.


<div class="meta-api-description">
Customize the collapsed drawer view by specifying custom templates or content to control exactly what markup, layout, and bindings appear when the navigation drawer is minimized or in mini mode, enabling tailored display, alternate icons, compact menus, or simplified interfaces during drawer collapse, with options to configure rendering behavior, override default mini layouts, or set specialized visuals and components for reduced sidebar states.
</div>

#### Example

    <div id="drawer">
        <div>Content area content.</div>
    </div>
    <script>
        $(document).ready(function() {
            var drawerInstance = $("#drawer").kendoDrawer({
                mode: "push",
                template: `<ul><li data-role='drawer-item'><span class='k-icon k-i-star-outline'></span><span class='item-text'>item 1</span></li><li data-role='drawer-separator'></li><li data-role='drawer-item'><span class='k-icon k-i-twitter'></span><span class='item-text'>item 2</span></li></ul>`,
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
Enable or disable the ability to open a side panel or navigation drawer using swipe gestures, controlling whether users can reveal the drawer by swiping from the screen edge or within the app view. Configure gesture recognition for opening the drawer, manage swipe interactions to prevent accidental activation, and handle platform-specific behaviors like side-swipe navigation on iOS Safari or other touch-enabled browsers. Adjust settings to require swipes from specific areas or completely disable swipe-to-open functionality to control how and when the drawer becomes visible, ensuring consistent user experience across devices and interaction patterns.
</div>

#### Example

    <div id="drawer">
        <div>Content area content.</div>
    </div>
    <script>
        $(document).ready(function() {
            var drawerInstance = $("#drawer").kendoDrawer({
                template: `<ul><li data-role='drawer-item'><span class='k-icon k-i-star-outline'></span><span class='item-text'>item 1</span></li><li data-role='drawer-separator'></li><li data-role='drawer-item'><span class='k-icon k-i-twitter'></span><span class='item-text'>item 2</span></li></ul>`,
                swipeToOpen: false
            }).data("kendoDrawer");

            drawerInstance.show();
        });
    </script>

### width `Number`

Defines a specific width for the Kendo UI Drawer when expanded.


<div class="meta-api-description">
Adjust or configure the expanded size, width, or overall dimension of a sliding panel or sidebar to control layout and spacing in user interfaces, enabling customization of the panel’s visual width, setting fixed or specific widths, modifying the expanded drawer size, resizing side menus or navigation drawers, managing how wide the drawer appears when open, and tailoring the horizontal space the panel occupies to fit design or UI requirements.
</div>

#### Example

    <div id="drawer">
        <div>Content area content.</div>
    </div>
    <script>
        $(document).ready(function() {
            var drawerInstance = $("#drawer").kendoDrawer({
                mode: "push",
                template: `<ul><li data-role='drawer-item'><span class='k-icon k-i-star-outline'></span><span class='item-text'>item 1</span></li><li data-role='drawer-separator'></li><li data-role='drawer-item'><span class='k-icon k-i-twitter'></span><span class='item-text'>item 2</span></li></ul>`,
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
Remove or clean up a sliding panel or menu component by detaching event listeners, clearing internal data and references, and properly disposing of nested or child UI components to prevent memory leaks and lingering handlers without deleting the element from the page structure. Handle teardown, disable, or reset interactive sidebar elements safely by releasing associated events, cleaning stored metadata, and invoking destruction routines on embedded widgets, ensuring efficient resource management and avoiding residual bindings while keeping the DOM intact.
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
                    template: `<ul><li data-role='drawer-item'><span class='k-icon k-i-star-outline'></span><span class='item-text'>item 1</span></li><li data-role='drawer-separator'></li><li data-role='drawer-item'><span class='k-icon k-i-twitter'></span><span class='item-text'>item 2</span></li></ul>`,
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
Programmatically close, collapse, or hide a side panel or overlay menu to control its visibility dynamically, including toggling a drawer UI component after setup in response to navigation events, user interactions, or adaptive/responsive layout changes. Enable developers to set, trigger, or manage the hidden state of slide-out panels or menus on demand, allowing automatic or manual concealment of sidebar panels through code commands for user interface control and state transitions.
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
                    template: `<ul><li data-role='drawer-item'><span class='k-icon k-i-star-outline'></span><span class='item-text'>item 1</span></li><li data-role='drawer-separator'></li><li data-role='drawer-item'><span class='k-icon k-i-twitter'></span><span class='item-text'>item 2</span></li></ul>`,
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
Trigger the drawer to open or slide into view programmatically by invoking a function that makes the drawer visible, initiates its configured animations, positioning, sliding mode, or expansion behavior, and activates any linked open events or callbacks; enable or set drawer visibility dynamically from code to control its appearance on demand after initialization, supporting use cases like toggling, showing, or programmatically expanding side panels, navigation drawers, or overlay menus.
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
                    template: `<ul><li data-role='drawer-item'><span class='k-icon k-i-star-outline'></span><span class='item-text'>item 1</span></li><li data-role='drawer-separator'></li><li data-role='drawer-item'><span class='k-icon k-i-twitter'></span><span class='item-text'>item 2</span></li></ul>`,
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
Detect or intercept the moment just before a sliding panel, sidebar, or drawer UI element closes or hides, enabling execution of custom logic, cancellation, or prevention of the hide or close action by listening for or handling an event triggered prior to the component disappearing or collapsing. This event allows developers to control, stop, block, or abort the closing transition based on conditions, user input, or state, providing hooks for validation, prompts, or cleanup before the drawer or overlay vanishes from view.
</div>

#### Example

    <div id="drawer">
            <div>Content area content.</div>
        </div>
        <script>
            $(document).ready(function() {
                var drawerInstance = $("#drawer").kendoDrawer({
                    mode: "push",
                    template: `<ul><li data-role='drawer-item'><span class='k-icon k-i-star-outline'></span><span class='item-text'>item 1</span></li><li data-role='drawer-separator'></li><li data-role='drawer-item'><span class='k-icon k-i-twitter'></span><span class='item-text'>item 2</span></li></ul>`,
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
Intercept or control the process of opening a sidebar or slide-out panel by handling events triggered just before it becomes visible, enabling you to run validation checks, execute asynchronous logic, enforce permissions, modify component state, or block automatic opening through event cancellation techniques, preventing the panel from revealing until certain conditions are met, such as user authentication, feature toggles, or dynamic validations before displaying the drawer interface.
</div>

#### Example

    <div id="drawer">
            <div>Content area content.</div>
        </div>
        <script>
            $(document).ready(function() {
                var drawerInstance = $("#drawer").kendoDrawer({
                    mode: "push",
                    template: `<ul><li data-role='drawer-item'><span class='k-icon k-i-star-outline'></span><span class='item-text'>item 1</span></li><li data-role='drawer-separator'></li><li data-role='drawer-item'><span class='k-icon k-i-twitter'></span><span class='item-text'>item 2</span></li></ul>`,
                    position: 'left',
                    show: function(e) {
                        e.preventDefault();
                    }

                }).data("kendoDrawer");
            });
        </script>

### itemClick

Fires when user clicks on item from the Kendo UI Drawer.


<div class="meta-api-description">
Detect and respond to user clicks on navigation or menu items within a sidebar or drawer interface by capturing item selection events, enabling custom logic execution, application state updates, route navigation, or prevention of default actions when an item is tapped or pressed. This interaction event delivers detailed information about the selected menu entry and the original click event, supporting access to item metadata and DOM event properties for tailored handling of drawer menu actions, item activation callbacks, or intercepting clicks for conditional behaviors in interfaces with slide-out panels or navigation drawers.
</div>

#### Example

    <div id="drawer">
            <div>Content area content.</div>
        </div>
        <script>
            $(document).ready(function() {
                var drawerInstance = $("#drawer").kendoDrawer({
                    mode: "push",
                    template: `<ul><li data-role='drawer-item'><span class='k-icon k-i-star-outline'></span><span class='item-text'>item 1</span></li><li data-role='drawer-separator'></li><li data-role='drawer-item'><span class='k-icon k-i-twitter'></span><span class='item-text'>item 2</span></li></ul>`,
                    position: 'left',
                    itemClick: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
                        console.log("Clicked on the" + e.item.find(".item-text").text());
                    }

                }).data("kendoDrawer");
            });
        </script>

## Fields

### visible `Boolean`

Holds information about the current state of the Drawer. If it is currently opened then the visible field will be set to true.


<div class="meta-api-description">
Determine if the sidebar panel or sliding drawer is currently open or closed, track its visibility state as a boolean toggle, monitor and respond to changes in drawer display status, check whether the navigation or options drawer is shown or hidden at runtime, access and observe the drawer’s open state to control UI behavior, detect when to render or hide content based on the drawer being active or inactive, enable conditional logic driven by whether the drawer is expanded or collapsed, read real-time visibility flags for side menus or panel overlays, and integrate state checks for toggling interface elements dependent on drawer presence.
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
                    template: `<ul><li data-role='drawer-item'><span class='k-icon k-i-star-outline'></span><span class='item-text'>item 1</span></li><li data-role='drawer-separator'></li><li data-role='drawer-item'><span class='k-icon k-i-twitter'></span><span class='item-text'>item 2</span></li></ul>`,
                    position: 'left'
                }).data("kendoDrawer");

                $('#show').click(function() {
                    drawerInstance.show();
	/* The result can be observed in the DevTools(F12) console of the browser. */
                    console.log(drawerInstance.visible);
                });
            });
        </script>
