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

### position `String` *(default: 'left')*

The position of the drawer. Can be `left` (default) or `right`.

#### Right positioned drawer

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

#### Push mode

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

### template `String`

Specifies the drawer's content.

#### Template example

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

#### Mini mode example

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

#### Mini mode width example

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

### mini.template `String`

Defines a specific template for the Kendo UI Drawer when in mini mode.

#### Template example

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
                    template: `<ul><li data-role='drawer-item'><span class='k-icon k-i-anchor'></span></li><li data-role='drawer-item'><span class='k-icon k-i-paint'></span></li></ul>`
                }
            }).data("kendoDrawer");
        });
    </script>

### swipeToOpen `Boolean` *(default: true)*

If set to `false`, swiping the associated content will not activate the drawer. In this case, the drawer will only be open by calling the show method.

`swipeToOpen` should be disabled for browsers, which use side swiping gestures for back/forward navigation, such as iOS Safari. Otherwise, users should swipe from an inner part of the view, and not from the view edge.

### width `Number`

Defines a specific width for the Kendo UI Drawer when expanded.

#### width example

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
                        console.log("Clicked on the" + e.item.find(".item-text").text());
                    }

                }).data("kendoDrawer");
            });
        </script>

## Fields

### visible `Boolean`

Holds information about the current state of the Drawer. If it is currently opened then the visible field will be set to true.

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
                    console.log(drawerInstance.visible);
                });
            });
        </script>
