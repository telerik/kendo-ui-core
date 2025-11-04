---
title: ContextMenu
page_title: Configuration, methods and events of Kendo UI ContextMenu
description: How to configure all animations in ContextMenu UI widget, enable and disable, remove specified items and use code examples for all methods and events supported.
res_type: api
---

# kendo.ui.ContextMenu

Represents the Kendo UI ContextMenu widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### alignToAnchor `Boolean`*(default: false)*

Specifies that ContextMenu should be shown aligned to the target or the filter element if specified.


<div class="meta-api-description">
How do I position a Kendo UI ContextMenu relative to its trigger element? Control the alignment and positioning of a contextual menu relative to its trigger or specified target element, enabling precise placement of menus anchored to the invoking user interface component or a filtered element; configure whether the menu attaches directly to the anchor point, adjusts dynamically to different reference nodes, and determines how context menus align for improved user interaction and interface consistency.
</div>

#### Example

    <div id="target">Target</div>
    <ul id="context-menu">
        <li>Item 1
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
        <li>Item 2
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
    </ul>
    <script>
        $("#context-menu").kendoContextMenu({
            target: "#target",
            alignToAnchor: true
        });
    </script>

### animation `Boolean|Object`

A collection of **Animation** objects, used to change default animations. A value of `false` will disable all animations in the widget.

`animation:true` is not a valid configuration.

Available animations for the **ContextMenu** are listed below.  Each animation has a reverse options which is used for the **close** effect by default, but can be over-ridden
by setting the **close** animation. Each animation also has a direction which can be set off the animation (i.e. **slideIn:Down**).


<div class="meta-api-description">
How to enable animations for ContextMenu in Kendo UI for jQuery? Configure and customize menu open and close animations, transitions, and visual effects for contextual menus by enabling or disabling animations, applying collections of animation sequences, setting specific entry and exit motion styles with reversible effects, overriding default closing animations, controlling directional animation flow such as slide or fade movements from various directions, disabling all animations entirely to create instant menu responses, and fine-tuning how context menus appear and disappear through customizable animated behaviors to enhance user interface dynamics and responsiveness.
</div>

#### *slideIn*

ContextMenu content slides in from the top.

#### *fadeIn*

ContextMenu content fades in.

#### *expand*

ContextMenu content expands from the top down. Similar to slideIn.

#### Example

    <div id="target">Target</div>
    <ul id="context-menu">
        <li>Item 1
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
        <li>Item 2
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
    </ul>
    <script>
        $("#context-menu").kendoContextMenu({
            target: "#target",
            animation: {
                open: {
                    effects: "fadeIn"
                }
            }
        });
    </script>

### animation.close `Object`

The animation that will be used when closing sub menus.


<div class="meta-api-description">
How to customize close animation for Kendo UI context menu items? Control and customize the closing animation of context menus and submenus by configuring closure effects, timing, transitions, and easing functions. Manage how context menu items animate when they close, specifying close animations to create smooth, configurable exit effects. Adjust or set the submenu closing behavior with precise animation controls including speed, duration, easing curves, and visual transition styles for closing dropdown or popup menus. Enable or modify how menus retract or disappear by defining close animations, closure delays, and motion types to enhance user interface responsiveness and interaction feedback.
</div>

#### Example

    <div id="target">Target</div>
    <ul id="context-menu">
        <li>Item 1
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
        <li>Item 2
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
    </ul>
    <script>
        $("#context-menu").kendoContextMenu({
            target: "#target",
            animation: {
                close: {
                    effects: "slideIn:up"
                }
            }
        });
    </script>

### animation.close.effects `String`

Effect to be used when closing the popup.


<div class="meta-api-description">
How do I customize the closing animation of a Kendo UI context menu? Control the closing animation and visual transitions for context menus by setting specific effects that define how the popup hides, enabling customization of fade, slide, zoom, or other animation styles to match user interface themes, improve accessibility, or create smooth and responsive UI feedback when context menus close. Adjust, configure, or enable different animation behaviors for closing popups to enhance user experience, synchronize with other UI elements, or comply with design guidelines for seamless or subtle exit effects.
</div>

#### Example

    <div id="target">Target</div>
    <ul id="context-menu">
        <li>Item 1
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
        <li>Item 2
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
    </ul>
    <script>
        $("#context-menu").kendoContextMenu({
            target: "#target",
            animation: {
                close: {
                    effects: "slideIn:up"
                }
            }
        });
    </script>

### animation.close.duration `Number`

Defines the close animation duration in milliseconds.


<div class="meta-api-description">
How to adjust animation speed when closing ContextMenu in Kendo UI for jQuery? Adjust the timing for closing menus and overlays by setting the duration for hide or dismiss animations, allowing control over how quickly or slowly a menu or popup retracts. Configure animation close speed in milliseconds to create smooth transitions, instant hides, or customized pacing for user interface context menus and dropdowns. Fine-tune how long it takes for interface components to disappear after interaction, enabling bounce-free, fluid, or rapid closing effects tailored to user experience preferences and application responsiveness.
</div>

#### Example

    <div id="target">Target</div>
    <ul id="context-menu">
        <li>Item 1
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
        <li>Item 2
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
    </ul>
    <script>
        $("#context-menu").kendoContextMenu({
            target: "#target",
            animation: {
                open: {
                    effects: "slideIn:down",
                    duration: 100
                }
            }
         });
    </script>

### animation.open `Object`

The animation that will be used when opening sub menus.


<div class="meta-api-description">
How can I customize the animation effect when opening submenus in Kendo UI for jQuery ContextMenu? Control and customize how sub menus smoothly appear or unfold by configuring the opening animation effect, duration, easing, and other animation parameters when revealing context menu sub items. Enable or disable transition animations for sub menu expansions, set specific animation types or timings for submenu opening, and fine-tune the visual behavior during submenu reveal to enhance user interaction or create dynamic opening effects. Adjust or disable submenu opening animations to match UI preferences, controlling the entrance style, speed, and easing for nested menu items as they become visible.
</div>

#### Example

    <div id="target">Target</div>
    <ul id="context-menu">
        <li>Item 1
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
        <li>Item 2
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
    </ul>
    <script>
        $("#context-menu").kendoContextMenu({
            target: "#target",
            animation: {
                open: {
                    effects: "slideIn:down"
                }
            }
        });
    </script>

### animation.open.effects `String`

Effect to be used when opening the popup.


<div class="meta-api-description">
How do I configure the opening animation effect in Kendo UI's ContextMenu widget? Configure, customize, or control the visual animations, transitions, or effects applied when a context menu, popup, or dropdown is opened or shown, enabling smooth, fade, slide, or other entry animations that define how the menu appears on activation or display. Adjust or set the opening effect style, transition type, or animation behavior to enhance user interface feedback when triggering contextual menus or popups, ensuring seamless, dynamic presentation during component initialization or interactive display.
</div>

#### Example

    <div id="target">Target</div>
    <ul id="context-menu">
        <li>Item 1
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
        <li>Item 2
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
    </ul>
    <script>
        $("#context-menu").kendoContextMenu({
            target: "#target",
            animation: {
                open: {
                    effects: "slideIn:down"
                }
            }
        });
    </script>

### animation.open.duration `Number`

Defines the open animation duration in milliseconds.


<div class="meta-api-description">
How do I adjust the animation duration for opening a Kendo UI context menu? Control or adjust the time it takes for a context menu or dropdown to appear by setting or configuring the open animation duration, speed, or timing in milliseconds. Enable smooth or customized transitions for the context menu opening effect, specifying how quickly or slowly the menu unfolds or animates into view. Set, fine-tune, or modify the animation length when initializing or updating UI components to manage the responsiveness and visual flow of pop-up menus, right-click menus, or floating menus. Optimize the delay before the context menu fully shows by configuring the open animation time, ensuring seamless user interaction with configurable animation speed for fade-ins, slides, or other entrance effects.
</div>

#### Example

    <div id="target">Target</div>
    <ul id="context-menu">
        <li>Item 1
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
        <li>Item 2
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
    </ul>
    <script>
        $("#context-menu").kendoContextMenu({
            target: "#target",
            animation: {
                open: {
                    effects: "zoomIn",
                    duration: 100
                }
            }
         });
    </script>

### appendTo `String|jQuery`*(default: document.body)*

The DOM element to which the ContextMenu will be appended. The element needs to be relatively positioned.


<div class="meta-api-description">
How do I specify where to append a Kendo UI context menu in jQuery? Control where the context menu is added by specifying a target container or DOM element to append or mount the menu, enabling precise placement, positioning, and stacking context management within a chosen parent, ensuring correct clipping and visibility inside a relatively positioned element or specific section of the page, useful for embedding menus into custom containers, managing overflow, or overriding default attachment points for better UI layout and interaction control.
</div>

#### Example

    <div id="container">Container</div>
    <ul id="context-menu">
        <li>Item 1
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
        <li>Item 2
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
    </ul>
    <script>
        $("#context-menu").kendoContextMenu({
            appendTo: "#container"
        });
    </script>

### closeOnClick `Boolean`*(default: true)*

 Specifies that sub menus should close after item selection (provided they won't navigate).


<div class="meta-api-description">
How can I configure Kendo UI context menu to close submenus on click? Control whether nested or sub menus collapse or remain open automatically after selecting an item in a context menu, enabling configuration to close or keep open submenu panels on user clicks, settable during initialization to manage menu behavior when clicking items that don’t trigger navigation, useful for customizing interactive menu flows, submenu auto-collapse settings, and controlling user interface responsiveness to menu selections in right-click or context-sensitive menus.
</div>

#### Example

    <div id="target">Target</div>
    <ul id="context-menu">
        <li>Item 1
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
        <li>Item 2
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
    </ul>
    <script>
        $("#context-menu").kendoContextMenu({
            target: "#target",
            closeOnClick: false
        });
    </script>

### copyAnchorStyles `Boolean`*(default: true)*

 Copies and uses the styles from the anchor.


<div class="meta-api-description">
How to inherit styles from anchor element in Kendo UI context menu? Configure the menu popup to inherit or replicate the visual style, design, and CSS properties of its trigger element by copying computed or inline styles such as fonts, colors, spacing, and other layout attributes; control whether the context menu adopts the anchor element’s appearance for consistent theming and seamless integration, enabling style inheritance, visual matching, CSS cloning, and dynamic style synchronization between the trigger anchor and the popup menu.
</div>

#### Example

    <span class="k-icon k-i-filter" id="span-target"></span>
    <ul id="context-menu-span">
      <li>Item 1
        <ul>
          <li>Sub Item 1</li>
          <li>Sub Item 2</li>
          <li>Sub Item 3</li>
        </ul>
      </li>
      <li>Item 2
        <ul>
          <li>Sub Item 1</li>
          <li>Sub Item 2</li>
          <li>Sub Item 3</li>
        </ul>
      </li>
    </ul>
    <script>

      $("#context-menu-span").kendoContextMenu({
        target: "#span-target",
        alignToAnchor: true,
        copyAnchorStyles: false
      });
    </script>

### dataSource `Object|Array|kendo.data.HierarchicalDataSource`

The data source of the widget which is used to render its items. Can be a JSON object/Array/[kendo.data.HierarchicalDataSource](/api/javascript/data/hierarchicaldatasource) that contains an item or an Array of items to be rendered.
Refer to the example below for a list of the supported properties.


<div class="meta-api-description">
How do I bind dynamic menu items to a Kendo UI for jQuery ContextMenu using JSON objects? Configure or bind dynamic menu items for context menus using a flexible data source such as JSON objects, JavaScript arrays, or hierarchical data structures to populate options, submenus, and nested items. Enable setting, updating, or controlling menu entries for right-click or contextual action menus by supplying flat or hierarchical collections, including arrays with nested subitems or complex data models. Support for hierarchical or tree-like menu data allows rendering multi-level dropdowns, submenu structures, and grouped items, making it possible to load, modify, or update context menu content programmatically using various data formats and sources. Integrate, customize, or extend context-sensitive options by connecting any structured data as menu content, facilitating dynamic, data-driven right-click menus or interactive command lists in applications.
</div>

#### Example - using a local array

    <div id="target">Target</div>
    <ul id="context-menu">
        <li>Item 1
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
        <li>Item 2
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
    </ul>
    <script>
        $(document).ready(function() {
            $("#context-menu").kendoContextMenu({
                target: "#target",
                dataSource:
                    [{
                        text: "Item 1",
                        cssClass: "myClass",                         // Add custom CSS class to the item, optional, added 2012 Q3 SP1.
                        url: "https://www.telerik.com/kendo-ui"                // Link URL if navigation is needed, optional.
                    },
                    {
                        text: "<b>Item 2</b>",
                        encoded: false,                              // Allows use of HTML for item text
                        content: "text"                              // content within an item
                    },
                    {
                        text: "Item 3",
                        imageUrl: "https://demos.telerik.com/kendo-ui/content/web/toolbar/done.png", // Item image URL, optional.
                        items: [{                                    // Sub item collection
                             text: "Sub Item 1"
                        },
                        {
                             text: "Sub Item 2"
                        }]
                    },
                    {
                        text: "Item 4",
                        spriteCssClass: "imageClass3"                // Item image sprite CSS class, optional.
                    }]
            })
        });
    </script>

#### Example - using kendo.data.HierarchicalDataSource

    <div id="target">Target</div>
    <ul id="context-menu"></ul>
    <script>
        var dataSource = new kendo.data.HierarchicalDataSource({
            transport: {
                read: {
                    url: "https://demos.telerik.com/service/v2/core/Employees"
                }
            },
            schema: {
                model: {
                    id: "EmployeeId",
                    hasChildren: "HasEmployees"
                }
            }
        });

        $("#context-menu").kendoContextMenu({
            target: "#target",
            dataTextField: "FullName",
            dataSource: dataSource
        })
    </script>

### dataTextField `String`

Sets the field of the data item that provides the text of the ContextMenu items.


<div class="meta-api-description">
How to customize menu item labels in Kendo UI ContextMenu with dynamic data? Configure the displayed label for each menu item by specifying which data attribute or field to use as the text for menu entries, enabling control over how menu options are named or shown based on dynamic data sources. This setting lets you set, designate, or map a specific data property—such as a key, title, label, or name field—to be used as the visible text in context menus, supporting customization, localization, or different data models to define what text appears for each menu item. Ideal for scenarios where you want to customize item captions, dynamically set menu labels from data objects, or control what string value renders as the menu entry name, accommodating various data structures and presentation needs.
</div>

#### Example

    <div id="target">Target</div>
    <ul id="context-menu"></ul>
    <script>
        $("#context-menu").kendoMenu({
            target: "#target",
            dataSource: {
                data: [{
                    Name: "Item 1",
                    //UrlPath: "urlPath",
                    Sprite: "spriteCssClass",
                    //imgUrl: "imgUrl",
                    description: "some description"
                }]
            },
            dataTextField:"Name",
            dataUrlField:"UrlPath",
            dataSpriteCssClassField:"Sprite",
            dataImageUrlField:"imgUrl",
            dataContentField:"description"
        });
    </script>

### dataUrlField `String`

Sets the field of the data item that provides the url of the ContextMenu items.


<div class="meta-api-description">
How do I map a URL field to my data items in Kendo UI for jQuery ContextMenu? Map or configure the URL field within your data items to define link targets for context menu entries, enabling dynamic assignment of anchor href attributes based on data source properties, set or control which data property supplies the hyperlink for each menu item, associate menu items with specific URLs from data fields, link context menu options to corresponding URLs extracted from data items, specify the property that provides clickable destination addresses, bind menu entries to URL paths defined in data sources, control dynamic hyperlink generation from item fields, customize the source field used for context menu item URLs, and enable the linking of menu commands to data-driven URLs for contextual navigation.
</div>

#### Example

    <div id="target">Target</div>
    <ul id="context-menu"></ul>
    <script>
        $("#context-menu").kendoMenu({
            target: "#target",
            dataSource: {
                data: [{
                    Name: "Item 1",
                    //UrlPath: "urlPath",
                    Sprite: "spriteCssClass",
                    //imgUrl: "imgUrl",
                    description: "some description"
                }]
            },
            dataTextField:"Name",
            dataUrlField:"UrlPath",
            dataSpriteCssClassField:"Sprite",
            dataImageUrlField:"imgUrl",
            dataContentField:"description"
        });
    </script>

### dataSpriteCssClassField `String`

Sets the field of the data item that provides the sprite css class of the ContextMenu items.


<div class="meta-api-description">
How to configure dynamic icon rendering in Kendo UI context menus using data-driven menu items? Configure the field name that holds the CSS class for item icons in data-driven menus, enabling dynamic icon rendering by linking sprite or custom CSS classes to menu items from your data source, allowing control over icon styling, appearance, and visual binding in context menus based on underlying data properties or attributes.
</div>

#### Example

    <div id="target">Target</div>
    <ul id="context-menu"></ul>
    <script>
        $("#context-menu").kendoMenu({
            target: "#target",
            dataSource: {
                data: [{
                    Name: "Item 1",
                    //UrlPath: "urlPath",
                    Sprite: "spriteCssClass",
                    //imgUrl: "imgUrl",
                    description: "some description"
                }]
            },
            dataTextField:"Name",
            dataUrlField:"UrlPath",
            dataSpriteCssClassField:"Sprite",
            dataImageUrlField:"imgUrl",
            dataContentField:"description"
        });
    </script>

### dataImageUrlField `String`

Sets the field of the data item that provides the image url of the ContextMenu items.


<div class="meta-api-description">
How to specify the field that holds image URLs in a Kendo UI context menu? Control or configure the field name from your data source that supplies the image URL or path used to display icons or images in context menu entries, enabling customization of each menu item’s visual representation by linking image URLs from data objects for dynamic, image-based menu content, supporting scenarios where developers want to set, bind, or specify the source of images for items in a context menu for more engaging UI elements or icon-enhanced lists.
</div>

#### Example

    <div id="target">Target</div>
    <ul id="context-menu"></ul>
    <script>
        $("#context-menu").kendoMenu({
            target: "#target",
            dataSource: {
                data: [{
                    Name: "Item 1",
                    //UrlPath: "urlPath",
                    Sprite: "spriteCssClass",
                    //imgUrl: "imgUrl",
                    description: "some description"
                }]
            },
            dataTextField:"Name",
            dataUrlField:"UrlPath",
            dataSpriteCssClassField:"Sprite",
            dataImageUrlField:"imgUrl",
            dataContentField:"description"
        });
    </script>

### dataContentField `String`

Sets the field of the data item that provides the content of the ContextMenu items.


<div class="meta-api-description">
How do I specify which data field to display in Kendo UI context menu entries? Configure which data attribute or property from your items is used to display the content in context menu entries, enabling control over which field’s value appears as the visible label, text, or content in the menu. Set or customize the binding to a specific data field to determine the displayed content in right-click or contextual menus, mapping your dataset’s property to the menu items, controlling how data is rendered in the menu interface for dynamic or static data sources. This functionality supports specifying the exact property key whose value should appear as the user-facing content in context menu items, aiding in flexible UI data presentation and enabling targeted display of relevant information from your data objects.
</div>

#### Example

    <div id="target">Target</div>
    <ul id="context-menu"></ul>
    <script>
        $("#context-menu").kendoMenu({
            target: "#target",
            dataSource: {
                data: [{
                    Name: "Item 1",
                    //UrlPath: "urlPath",
                    Sprite: "spriteCssClass",
                    //imgUrl: "imgUrl",
                    description: "some description"
                }]
            },
            dataTextField:"Name",
            dataUrlField:"UrlPath",
            dataSpriteCssClassField:"Sprite",
            dataImageUrlField:"imgUrl",
            dataContentField:"description"
        });
    </script>

### direction `String`*(default: "default")*

Specifies ContextMenu's sub menu opening direction. Can be "top", "bottom", "left", "right".
The example below will initialize the sub menus to open to the left.


<div class="meta-api-description">
How do I control the direction of submenus in a Kendo UI ContextMenu? Configure or control the opening side and orientation of nested or sub menus within a context menu, setting the direction or placement to top, bottom, left, or right; specify or adjust the submenu expansion position during context menu initialization to customize user interface behavior, ensuring submenus appear on the desired edge such as leftward, rightward, upward, or downward based on layout preferences or user interaction patterns.
</div>

#### Example

    <div style='margin-left:100px' id="target">Target</div>
    <ul id="context-menu">
        <li>Item 1
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
        <li>Item 2
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
    </ul>
    <script>
        $("#context-menu").kendoContextMenu({
            target: "#target",
            direction: "left"
        });
    </script>

### filter `String`

Specifies ContextMenu filter selector - the ContextMenu will only be shown on items that satisfy the provided selector.


<div class="meta-api-description">
How can I restrict where the context menu appears on my webpage? Control and customize where context menus appear by specifying CSS selectors or element filters to restrict the menu display to particular list items, table cells, or specific DOM elements, enabling precise targeting of context-sensitive menus while preventing them from showing on unrelated parts of the interface; configure, enable, or limit context menu visibility based on element classes, IDs, attributes, or tag names to manage user interaction zones and tailor right-click or long-press menus to selected components, ensuring context menus only trigger on desired elements within complex layouts or dynamic content.
</div>

#### Example - Show the ContextMenu on some elements inside the target

    <div id="target">Target
        <div class="box"></div>
        <div></div>
        <div class="box"></div>
    </div>
    <ul id="context-menu">
        <li>Item 1
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
        <li>Item 2
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
    </ul>
    <script>
        $("#context-menu").kendoContextMenu({
            target: "#target",
            filter: ".box"
        });
    </script>

### hoverDelay `Number`*(default: 100)*

Specifies the delay in ms before the sub menus are opened/closed - used to avoid accidental closure on leaving.


<div class="meta-api-description">
How to set delay before submenu opens in Kendo UI contextmenu? Control the timing delay before submenu panels open or close on hover to prevent accidental toggling, enabling you to set how many milliseconds the interface waits after cursor hover or mouse exit events before showing or hiding nested menu options. Adjust and configure the hover timeout, delay intervals, or submenu activation responsiveness to fine-tune user interactions, reduce unintended submenu expansions, and manage hover duration sensitivity for smoother navigation and improved user experience in contextual dropdown menus.
</div>

#### Example

    <div id="target">Target</div>
    <ul id="context-menu">
        <li>Item 1
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
        <li>Item 2
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
    </ul>
    <script>
        $("#context-menu").kendoContextMenu({
            target: "#target",
            hoverDelay: 200
        });
    </script>

### orientation `String`*(default: "vertical")*

Root menu orientation. Could be horizontal or vertical.


<div class="meta-api-description">
How to configure horizontal or vertical menu layout in Kendo UI ContextMenu widget? Set or configure the main layout direction for top-level menu items by choosing between horizontal or vertical arrangement, allowing control over how root menu entries are displayed in a row or column format. Adjust the alignment, visual flow, and keyboard navigation behavior of the menu's primary items by switching the root menu presentation axis, enabling developers to enable horizontal or vertical top-level item stacking, configure menu orientation at initialization, and customize navigation order and focus flow depending on whether menu items appear side-by-side or stacked vertically.
</div>

#### Example

    <div id="target">Target</div>
    <ul id="context-menu">
        <li>Item 1
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
        <li>Item 2
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
    </ul>
    <script>
        $("#context-menu").kendoContextMenu({
            target: "#target",
            orientation: "horizontal"
        });
    </script>

### popupCollision `String`

Specifies how ContextMenu should adjust to screen boundaries. By default the strategy is **"fit"** for a sub menu with a horizontal parent or the root menu,
meaning it will move to fit in screen boundaries in all directions, and **"fit flip"** for a sub menu with vertical parent, meaning it will fit vertically and flip over
its parent horizontally. You can also switch off the screen boundary detection completely if you set the **popupCollision** to false.


<div class="meta-api-description">
How do I prevent context menu collisions with the screen edges in Kendo UI for jQuery? Configure and control how popup menus or context menus detect and handle collisions with screen edges or viewport boundaries to keep menus fully visible and prevent them from being cut off or hidden. Adjust positioning strategies like fitting within screen limits, flipping menu orientation horizontally or vertically based on parent menu alignment, or disabling collision detection entirely to allow menus to render beyond visible areas. Manage submenu behaviors dynamically to ensure contextual or nested menus avoid overlapping screen edges, overflow issues, or clipping by specifying collision detection modes, boundary handling, edge fitting, menu flipping, or simple fixed positioning. Enable precise control over how menus respond to screen constraints with options to set collision strategies, boundary awareness, popup placement rules, visibility preservation, and responsive submenu alignment.
</div>

#### Example

    <div id="target">Target</div>
    <ul id="context-menu">
        <li>Item 1
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
        <li>Item 2
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
    </ul>
    <script>
        $("#context-menu").kendoContextMenu({
            target: "#target",
            popupCollision: false
        });
    </script>

### scrollable `Boolean|Object` *(default: false)*

If enabled, the ContextMenu displays buttons that scroll the items when they cannot fit the viewport height. By default, scrolling is disabled.


<div class="meta-api-description">
How to enable scrolling within a Kendo UI context menu? Control the ability to enable or disable scrolling functionality within a contextual menu to navigate through menu items when the list exceeds the visible area, including options to show scroll buttons or indicators for moving up and down through overflowing menu entries. This setting helps manage long dropdown or popup lists by allowing users to scroll inside the menu container when items go beyond the viewport height, improving accessibility and usability of menus with many entries. Adjust scrolling behavior to handle overflow, enable smooth navigation of large item sets, configure scroll controls, and control visibility of navigation buttons within the menu interface.
</div>

#### Example - enabling the scrolling functionality

    <div id="target">Target</div>
    <ul id="context-menu">
        <li>Item 1</li><li>Item 2</li><li>Item 3</li>
        <li>Item 1</li><li>Item 2</li><li>Item 3</li>
        <li>Item 1</li><li>Item 2</li><li>Item 3</li>
        <li>Item 1</li><li>Item 2</li><li>Item 3</li>
        <li>Item 1</li><li>Item 2</li><li>Item 3</li>
        <li>Item 1</li><li>Item 2</li><li>Item 3</li>
        <li>Item 1</li><li>Item 2</li><li>Item 3</li>
        <li>Item 1</li><li>Item 2</li><li>Item 3</li>
        <li>Item 1</li><li>Item 2</li><li>Item 3</li>
        <li>Item 1</li><li>Item 2</li><li>Item 3</li>
        <li>Item 1</li><li>Item 2</li><li>Item 3</li>
        <li>Item 1</li><li>Item 2</li><li>Item 3</li>
    </ul>

    <script>
        $("#context-menu").kendoContextMenu({
            target: "#target",
            scrollable: true
        });
    </script>

### scrollable.distance `Number` *(default: 50)*

Sets the scroll amount (in pixels) that the ContextMenu scrolls when the scroll buttons are hovered. Each such distance is animated and then another animation starts with the same distance. If clicking a scroll button, the ContextMenu scrolls by doubling the distance.


<div class="meta-api-description">
How to adjust the scrolling speed in Kendo UI context menu? Adjust the pixel increment for each scrolling action when using scroll buttons in a context menu, controlling how far the menu moves per step during hover or click events, enabling smooth, repeated scrolling animations and customizing scroll speed or distance to fit user interface needs and improve navigation responsiveness within scrollable context menus.
</div>

#### Example - applying the scroll buttons of the ContextMenu

    <div id="target">Target</div>
    <ul id="context-menu">
        <li>Item 1</li><li>Item 2</li><li>Item 3</li>
        <li>Item 1</li><li>Item 2</li><li>Item 3</li>
        <li>Item 1</li><li>Item 2</li><li>Item 3</li>
        <li>Item 1</li><li>Item 2</li><li>Item 3</li>
        <li>Item 1</li><li>Item 2</li><li>Item 3</li>
        <li>Item 1</li><li>Item 2</li><li>Item 3</li>
        <li>Item 1</li><li>Item 2</li><li>Item 3</li>
        <li>Item 1</li><li>Item 2</li><li>Item 3</li>
        <li>Item 1</li><li>Item 2</li><li>Item 3</li>
        <li>Item 1</li><li>Item 2</li><li>Item 3</li>
        <li>Item 1</li><li>Item 2</li><li>Item 3</li>
        <li>Item 1</li><li>Item 2</li><li>Item 3</li>
    </ul>

    <script>
        $("#context-menu").kendoContextMenu({
            scrollable: {
                distance: 20
            }
        });
    </script>


### showOn `String`

Specifies the event or events on which ContextMenu should open. By default ContextMenu will show on *contextmenu* event on desktop and *hold* event on touch devices.
Could be any pointer/mouse/touch event, also several, separated by spaces.


<div class="meta-api-description">
How to configure event for showing Kendo UI ContextMenu? Configure or control the user interactions that trigger displaying the context menu by specifying one or more events such as right-click, long press, tap, hold, mouse click, or touch gestures, enabling flexible activation on desktop and mobile devices, with the ability to set custom pointer, mouse, or touch events so the menu opens precisely when users perform desired actions or gestures, supporting multiple event types simultaneously to tailor interaction responsiveness and improve user experience across different input methods.
</div>

#### Example - Show the ContextMenu on left click

    <div id="target">Target</div>
    <ul id="context-menu">
        <li>Item 1
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
        <li>Item 2
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
    </ul>
    <script>
        $("#context-menu").kendoContextMenu({
            target: "#target",
            showOn: "click"
        });
    </script>

### target `String|jQuery`*(default: "body")*

Specifies the element on which ContextMenu should open. The default element is the document body.


<div class="meta-api-description">
How can I customize the target element for the Kendo UI context menu? Configure, assign, or bind the context menu to a particular HTML element, CSS selector, or DOM node to control where the menu appears, enabling precise placement relative to user interactions such as right-clicks or specific element events; set or override the default target from the entire document body to customize the context menu’s anchor point, element scope, or activation zone for dynamic UI behavior and tailored user experience.
</div>

#### Example - Show the ContextMenu on element with ID target

    <div id="target">Target</div>
    <ul id="context-menu">
        <li>Item 1
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
        <li>Item 2
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
    </ul>
    <script>
        $("#context-menu").kendoContextMenu({
            target: "#target"
        });
    </script>

## Methods

### append

Appends an item to a **ContextMenu** in the specified referenceItem's sub menu (or the root ContextMenu if not specified).


<div class="meta-api-description">
How can I dynamically add new options to a Kendo UI context menu at runtime? Add or insert new menu items dynamically into a context menu or its submenus by appending entries at runtime, enabling customization of right-click menus, extending existing submenu options, controlling where new options appear relative to specific items, configuring contextual actions on the fly, and programmatically modifying menu content based on user interaction or application state.
</div>

#### Example

    <div id="target">Target</div>
    <ul id="context-menu"></ul>
    <script>
        // initialize the ContextMenu
        $("#context-menu").kendoContextMenu({
            target: "#target"
        });

        // get a reference to already initialized ContextMenu widget
        var contextMenu = $("#context-menu").data("kendoContextMenu");

        contextMenu.append(
            [{
                text: "Item 1",
                cssClass: "myClass",                         // Add custom CSS class to the item, optional, added 2012 Q3 SP1.
                url: "https://www.telerik.com"                // Link URL if navigation is needed, optional.
            },
            {
                text: "<b>Item 2</b>",
                encoded: false,                              // Allows use of HTML for item text
                content: "text"                              // content within an item
            },
            {
                text: "Item 3",
                imageUrl: "https://demos.telerik.com/kendo-ui/content/web/toolbar/todo.png", // Item image URL, optional.
                items: [{                                    // Sub item collection
                     text: "Sub Item 1"
                },
                {
                     text: "Sub Item 2"
                }]
            },
            {
                text: "Item 4",
                spriteCssClass: "mail"                // Item image sprite CSS class, optional.
            }]
        );
    </script>
    <style>
    .k-sprite {
            background-image: url("https://demos.telerik.com/kendo-ui/content/web/toolbar/mail.png");
        }
    </style>

#### Parameters

##### item `Object|Array`

Item to be appended, specified as a JSON object. An array of objects can also be passed.

##### referenceItem `String|jQuery` *(optional)*

A reference item to append the new item in. If omitted, the new item will be appended to the as a root item.

#### Returns

`kendo.ui.ContextMenu` Returns the ContextMenu object to support chaining.

### close

Closes the **ContextMenu**. This method can be prevented to stop the closure.


<div class="meta-api-description">
How do I programmatically close an open Kendo UI context menu in jQuery? Programmatically close or dismiss an open context menu, stop or cancel the closing operation during events or lifecycle stages, control when and how context menus are hidden or shut, trigger or handle menu closure actions, manage interaction ending and prevent accidental closure by intercepting or blocking close events, ensure precise control over context menu visibility, automate or manually invoke menu dismissal, configure and handle close event lifecycles including cancellation and prevention of closure in user interfaces.
</div>

#### Example

    <div id="target">Target</div>
    <ul id="context-menu">
        <li id="Item1">Item 1
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
        <li>Item 2
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
    </ul>
    <script>
        // initialize the ContextMenu
        $("#context-menu").kendoContextMenu({
            target: "#target"
        });
        // get a reference to the ContextMenu widget
        var contextMenu = $("#context-menu").data("kendoContextMenu");
        // close the ContextMenu
        contextMenu.close();
    </script>

#### Parameters

##### element `Element|jQuery`

If called without arguments, will close the ContextMenu. If passed an item, it will be closed (if opened).

#### Returns

`kendo.ui.ContextMenu` Returns the ContextMenu object to support chaining.

### destroy
Safely removes the **ContextMenu** from the DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

If a new ContextMenu widget should be created afterwards, use a new `<ul>` for that, as the old one no longer exists.


<div class="meta-api-description">
How do I properly remove a Kendo UI context menu component to prevent memory leaks? Remove or delete context menu components and release associated resources by safely detaching event listeners, cleaning up data bindings, and ensuring all child widgets and event handlers are properly destroyed to prevent memory leaks and orphaned DOM elements; enable cleanup of menu structures, reset or reset UI elements by fully removing context menu from the page including its original HTML elements, facilitating reinitialization or recreation of menus without residual effects or conflicts.
</div>

#### Example

    <div id="target">Target</div>
    <ul id="context-menu">
        <li>Item 1
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
        <li>Item 2
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
    </ul>
    <script>
        // initialize the ContextMenu
        $("#context-menu").kendoContextMenu({
            target: "#target"
        });

        var contextMenu = $("#context-menu").data("kendoContextMenu");

        // detach events
        contextMenu.destroy();
    </script>

### enable

Enables or disables an item of a **ContextMenu**. This can optionally be accomplished on
initialization by setting the **disabled="disabled"** on the desired menu item html element.


<div class="meta-api-description">
How can I programmatically disable specific context menu items in Kendo UI for jQuery? Control or toggle the active state of individual context menu items dynamically during runtime, enabling or disabling specific entries through programmatic methods to activate, deactivate, or switch availability of menu options on the fly, with the ability to set initial disabled states via standard HTML attributes for selective menu item control, allowing developers to manage context menu item accessibility, interactivity, and visibility based on application state, user roles, or custom logic.
</div>

#### Example

    <div id="target">Target</div>
    <ul id="context-menu">
        <li>Item 1
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
        <li id="secondItem">Item 2
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
    </ul>
    <script>
        // initialize the ContextMenu
        $("#context-menu").kendoContextMenu({
            target: "#target"
        });
        // get a reference to the ContextMenu widget
        var contextMenu = $("#context-menu").data("kendoContextMenu");
        // disable the li menu item with the id "secondItem"
        contextMenu.enable("#secondItem", false);
    </script>

#### Parameters

##### element `String|Element|jQuery`

Target element

##### enable `Boolean`

Desired state

#### Returns

`kendo.ui.ContextMenu` Returns the ContextMenu object to support chaining.


### findByUid

Returns the ContextMenu item by the dataItem's uid.


<div class="meta-api-description">
How to access a specific context menu entry in Kendo UI by its unique identifier? Locate or access a specific context menu entry using a unique identifier linked to its data item, enabling programmatic retrieval, inspection, modification, or interaction with the menu item’s properties, configuration, state, or DOM element. This functionality supports searching by unique IDs, finding menu entries to update or control them dynamically, handling operations like enable, disable, show, hide, or customize a particular menu choice within a context menu structure. Queries related to accessing menu items by unique keys, manipulating menu options via identifiers, or integrating context menu item management based on data-driven UIDs align with this capability.
</div>

#### Example

    <div id="target">Target</div>
    <ul id="context-menu"></ul>
    <script>
        var dataSource = new kendo.data.HierarchicalDataSource({
            transport: {
                read: {
                    url: "https://demos.telerik.com/service/v2/core/Employees"
                }
            },
            schema: {
                model: {
                    id: "EmployeeId",
                    hasChildren: "HasEmployees"
                }
            }
        });

        var contextMenu = $("#context-menu").kendoContextMenu({
            target: "#target",
            dataTextField: "FullName",
            dataSource: dataSource
        }).data("kendoContextMenu");


        contextMenu.one("dataBound", function (ev) {
            contextMenu.open();
            var firstItemUid = contextMenu.dataSource.at(0).uid;
            var item = contextMenu.findByUid(firstItemUid);
            contextMenu.open(item);
        });
    </script>

#### Parameters

##### uid `String`

The uid of the data item.

#### Returns

`jQuery` the item found.

### insertAfter

Inserts an item into a **ContextMenu** after the specified referenceItem.


<div class="meta-api-description">
How to insert a new menu item after a specific existing entry in Kendo UI contextmenu? Add or insert a new menu item directly following a specific existing entry within a context menu during runtime, enabling dynamic modification, extension, or reordering of menu options based on a target reference item. Control menu positioning by programmatically placing items immediately after chosen entries, allowing for customized, context-sensitive menu updates, insertions, or adjustments in the user interface. This method supports precise addition and ordering of interactive commands or options relative to other menu elements in real time.
</div>

#### Example

    <div id="target">Target</div>
    <ul id="context-menu">
        <li>Item 1
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
        <li>Item 2
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
    </ul>
    <script>
        // initialize the ContextMenu
        $("#context-menu").kendoContextMenu({
            target: "#target"
        });
        // get a reference to the ContextMenu widget
        var contextMenu = $("#context-menu").data("kendoContextMenu");
        //
        contextMenu.insertAfter(
            [{
                text: "Item 1",
                url: "https://www.telerik.com"                // Link URL if navigation is needed, optional.
            },
            {
                text: "<b>Item 2</b>",
                encoded: false,                                 // Allows use of HTML for item text
                content: "text"                                 // content within an item
            },
            {
                text: "Item 3",
                //imageUrl: "https://www.telerik.com/test.jpg", // Item image URL, optional.
                items: [{                                    // Sub item collection
                     text: "Sub Item 1"
                },
                {
                     text: "Sub Item 2"
                }]
            },
            {
                text: "Item 4",
                spriteCssClass: "imageClass3"                // Item image sprite CSS class, optional.
            }],
            "li:last-child"
        );
    </script>

#### Parameters

##### item `Object|Array`

Target item, specified as a JSON object. Can also handle an array of such objects.

##### referenceItem `String|Element|jQuery`

A reference item to insert the new item after.

#### Returns

`kendo.ui.ContextMenu` Returns the ContextMenu object to support chaining.

### insertBefore

Inserts an item into a **ContextMenu** before the specified referenceItem.


<div class="meta-api-description">
How do I insert a new menu item before an existing one in a Kendo UI context menu? Add or insert a new menu item before an existing one in a context menu dynamically, allowing runtime modification, reordering, or insertion of options ahead of a reference or target menu entry. Enable programmatic control to place new items directly preceding specific menu elements, update context menu contents without recreating the full menu, and manage the positioning of commands by specifying the target item to insert before. Control insertion points for menu options, reorder context menu entries efficiently, and adjust menu structures on the fly by referencing particular existing items as anchors.
</div>

#### Example

    <div id="target">Target</div>
    <ul id="context-menu">
        <li>Item 1
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
        <li>Item 2
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
    </ul>
    <script>
        // initialize the ContextMenu
        $("#context-menu").kendoContextMenu({
            target: "#target"
        });
        // get a reference to the ContextMenu widget
        var contextMenu = $("#context-menu").data("kendoContextMenu");
        //
        contextMenu.insertBefore(
            [{
                text: "Item 1",
                //url: "https://www.telerik.com"                // Link URL if navigation is needed, optional.
            },
            {
                text: "<b>Item 2</b>",
                encoded: false,                                 // Allows use of HTML for item text
                content: "text"                                 // content within an item
            },
            {
                text: "Item 3",
                //imageUrl: "https://www.telerik.com/test.jpg", // Item image URL, optional.
                items: [{                                    // Sub item collection
                     text: "Sub Item 1"
                },
                {
                     text: "Sub Item 2"
                }]
            },
            {
                text: "Item 4",
                spriteCssClass: "imageClass3"                // Item image sprite CSS class, optional.
            }],
            "li:first-child"
        );
    </script>

#### Parameters

##### item `Object|Array`

Target item, specified as a JSON object. Can also handle an array of such objects.

##### referenceItem `String|Element|jQuery`

A reference item to insert the new item before

#### Returns

`kendo.ui.ContextMenu` Returns the ContextMenu object to support chaining.

### open

Shows the **ContextMenu** at the specified coordinates in pixels or aligned to the specified anchor. If passed an item, it will be opened. This method can be prevented to stop the ContextMenu from opening.


<div class="meta-api-description">
How do I programmatically open a Kendo UI context menu at specific screen coordinates? Open or display a context menu at precise screen coordinates, pixel positions, or aligned to a specific anchor element, controlling where the menu appears relative to user interaction or UI components. Enable opening the menu programmatically with options to specify exact x and y coordinates or attach it to anchors, linking menu visibility to target items or context references. Support scenarios like triggering right-click menus, contextual actions over elements, or preventing the menu from opening through event handlers and programmatic control, allowing developers to manage context menu display dynamically and responsively based on user input or application state.
</div>

#### Example

    <div id="target">Target</div>
    <ul id="context-menu">
        <li id="Item1">Item 1
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
        <li>Item 2
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
    </ul>
    <script>
        // initialize the ContextMenu
        $("#context-menu").kendoContextMenu({
            target: "#target"
        });
        // get a reference to the ContextMenu widget
        var contextMenu = $("#context-menu").data("kendoContextMenu");
        // open the ContextMenu at 100px, 100px
        contextMenu.open(100, 100);
    </script>

#### Parameters

##### x `Number|Element|jQuery`

X coordinate in pixels or the anchor element to which to align. If passed an item - jQuery object or element - it will be opened.

##### y `Number` *optional*

Y coordinate in pixels. If not specified, ContextMenu will assume the first parameter is an anchor element.

#### Returns

`kendo.ui.ContextMenu` Returns the ContextMenu object to support chaining.

### remove

Removes a specified item(s) from a **ContextMenu**.


<div class="meta-api-description">
How do I dynamically remove context menu entries in Kendo UI? Delete, remove, or dynamically clear one or more context menu entries at runtime by specifying individual or multiple items to be removed; control the displayed menu options programmatically to update, modify, or synchronize menu state with application logic, enabling real-time menu customization, item deletion, entry management, and dynamic adjustment of available commands or selections within the context menu interface.
</div>

#### Example

    <div id="target">Target</div>
    <ul id="context-menu">
        <li id="Item1">Item 1
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
        <li>Item 2
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
    </ul>
    <script>
        // initialize the ContextMenu
        $("#context-menu").kendoContextMenu({
            target: "#target"
        });
        // get a reference to the ContextMenu widget
        var contextMenu = $("#context-menu").data("kendoContextMenu");
        // remove the item with the id "Item1"
        contextMenu.remove("#Item1");
    </script>

#### Parameters

##### element `String|Element|jQuery`

Target item selector.

#### Returns

`kendo.ui.ContextMenu` Returns the ContextMenu object to support chaining.

## Events

### close

Fires before a sub menu or the ContextMenu gets closed. You can cancel this event to prevent closure.


<div class="meta-api-description">
How do I prevent context menu from closing in Kendo UI for jQuery? Detect, intercept, or control the closing behavior of context menus or submenus by handling pre-close events that trigger just before the menu or submenu closes; manage or abort closure actions by preventing default behavior, enabling cleanup operations, conditional cancellation, or customized workflows to keep menus open or finalize state before exit, supporting scenarios like validation, user confirmations, or dynamic interface adjustments prior to the menu disappearing.
</div>

#### Event Data

##### e.item `Element`

The closed item

##### e.type `String`

The event type as a string - "close".

##### e.target `Element`

The current target of the ContextMenu - either the init target or the current element chosen through filter, if specified.

##### e.event `jQuery.Event`

The jQuery event that triggered this one - only available for the close event of the whole ContextMenu and not for its items.

#### Example

    <div id="target">Target</div>
    <ul id="context-menu">
        <li>Item 1
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
        <li>Item 2
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
    </ul>
    <script>
        $("#context-menu").kendoContextMenu({
            target: "#target",
             close: function(e) {
                 // handle event
             }
        });
    </script>

#### To set after initialization

    <div id="target">Target</div>
    <ul id="context-menu">
        <li>Item 1
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
        <li>Item 2
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
    </ul>
    <script>
        // initialize the ContextMenu
        $("#context-menu").kendoContextMenu({
            target: "#target"
        });
         // get a reference to the ContextMenu widget
         var contextMenu = $("#context-menu").data("kendoContextMenu");
         // bind to the close event
         contextMenu.bind("close", function(e) {
             // handle event
         });
    </script>

### dataBound

Fires when the ContextMenu is bound to the set DataSource.


<div class="meta-api-description">
When does the Kendo UI context menu's data load complete? Handle actions triggered after the menu items have successfully loaded, updated, or refreshed from the data source by detecting when the binding process completes; this event supports scenarios such as customizing menu entries after data retrieval, attaching additional event listeners to menu items, recalculating layout or positioning once data is applied, performing follow-up data requests, and responding dynamically to changes in the underlying data or data refresh cycles in context menus or similar UI components.
</div>

#### Event Data

##### e.item `HTMLElement`

The loaded item (at initial bound this will be the Menu root element).

##### e.dataItem `Object`

The dataItem that is being loaded or bound (at initial bound this should be undefined).

#### Example
    <div id="target">Target</div>
    <ul id="context-menu"></ul>
    <script>
        var dataSource = new kendo.data.HierarchicalDataSource({
            transport: {
                read: {
                    url: "https://demos.telerik.com/service/v2/core/Employees"
                }
            },
            schema: {
                model: {
                    id: "EmployeeId",
                    hasChildren: "HasEmployees"
                }
            }
        });

         $("#context-menu").kendoContextMenu({
            target: "#target",
            dataTextField: "FullName",
            dataSource: dataSource,
            dataBound: function(){
	/* The result can be observed in the DevTools(F12) console of the browser. */
                console.log("dataBound");
            }
        })
    </script>

#### To set after initialization

    <div id="target">Target</div>
    <ul id="context-menu"></ul>
    <script>
        var dataSource = new kendo.data.HierarchicalDataSource({
            transport: {
                read: {
                    url: "https://demos.telerik.com/service/v2/core/Employees"
                }
            },
            schema: {
                model: {
                    id: "EmployeeId",
                    hasChildren: "HasEmployees"
                }
            }
        });

        var contextMenu = $("#context-menu").kendoContextMenu({
            target: "#target",
            dataTextField: "FullName",
            dataSource: dataSource
        }).data("kendoContextMenu");

        contextMenu.bind("dataBound", function() {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("dataBound");
        });
    </script>

### open

Fires before a sub menu or the ContextMenu gets opened. You can cancel this event to prevent opening the sub menu.


<div class="meta-api-description">
How can I customize the right-click menu in Kendo UI for jQuery using the open event? Detect, intercept, or control when a context menu or submenu is about to appear by handling the event triggered before the menu opens, allowing you to conditionally block, cancel, or modify the display of right-click menus, context popups, or nested menu actions for customization, access control, or dynamic behavior based on specific user interactions, application state, or permissions.
</div>

#### Event Data

##### e.item `Element`

The opened item

##### e.type `String`

The event type as a string - "open".

##### e.target `Element`

The current target of the ContextMenu - either the init target or the current element chosen through filter, if specified.

##### e.event `jQuery.Event`

The jQuery event that triggered this one - only available for the open event of the whole ContextMenu and not for its items.

#### Example

    <div id="target">Target</div>
    <input type="checkbox" id="cbx"/> Prevent the `open` event
    <ul id="context-menu">
        <li>Item 1
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
        <li>Item 2
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
    </ul>
    <script>
        $("#context-menu").kendoContextMenu({
            target: "#target",
            open: function(e) {
                if($('#cbx').is(':checked')){
                    e.preventDefault();
                }
            }
        });
    </script>

#### To set after initialization

    <div id="target">Target</div>
    <ul id="context-menu">
        <li>Item 1
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
        <li>Item 2
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
    </ul>
    <script>
        // initialize the ContextMenu
        $("#context-menu").kendoContextMenu({
            target: "#target"
        });
         // get a reference to the ContextMenu widget
         var contextMenu = $("#context-menu").data("kendoContextMenu");
         // bind to the open event
         contextMenu.bind("open", function(e) {
             // handle event
         });
    </script>

### activate

Fires when a sub menu or the ContextMenu gets opened and its animation finished.


<div class="meta-api-description">
When does the Kendo UI context menu finish opening and become fully visible? Trigger actions or execute code when a context menu or submenu finishes opening and its animation completes, enabling detection of the exact moment the menu becomes fully visible. This event can be used to implement behavior such as setting keyboard focus after the menu appears, lazily loading or initializing submenu items or content, syncing application state or UI elements when the menu is active, or running custom logic right when the menu open transition ends. It is useful for handling menu open completion events, responding to submenu activation, controlling post-animation interactions, and synchronizing dynamic content loading or focus management in context menus.
</div>

#### Event Data

##### e.item `Element`

The activated item

##### e.type `String`

The event type as a string - "activate".

##### e.target `Element`

The current target of the ContextMenu - either the init target or the current element chosen through filter, if specified.

#### Example

    <div id="target">Target</div>
    <ul id="context-menu">
        <li>Item 1
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
        <li>Item 2
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
    </ul>
    <script>
        $("#context-menu").kendoContextMenu({
            target: "#target",
            activate: function(e){
                $('li.k-item.k-hover').css('font-weight','bold');
	/* The result can be observed in the DevTools(F12) console of the browser. */
                console.log(e.item);
            },
            deactivate: function(e) {
                $('li.k-item').css('font-weight','');
	/* The result can be observed in the DevTools(F12) console of the browser. */
                console.log(e.item);
            }
        });
    </script>

#### To set after initialization

    <div id="target">Target</div>
    <ul id="context-menu">
        <li>Item 1
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
        <li>Item 2
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
    </ul>
    <script>
        // initialize the ContextMenu
        $("#context-menu").kendoContextMenu({
            target: "#target"
        });
         // get a reference to the ContextMenu widget
         var contextMenu = $("#context-menu").data("kendoContextMenu");
         // bind to the activate event
         contextMenu.bind("activate", function(e) {
             // handle event
         });
    </script>

### deactivate

Fires when a sub menu or the ContextMenu gets closed and its animation finished.


<div class="meta-api-description">
When does the Kendo UI context menu deactivate event occur? Detect when context menus or submenus finish closing, including after animations, to trigger cleanup tasks, restore keyboard or mouse focus, update UI state, or initiate follow-up actions and transitions. Capture the full closure event of dropdown menus to manage lifecycle events, handle post-close behavior, reset interface elements, or synchronize component states once the menu and any nested submenus have fully deactivated and disappeared. Monitor menu deactivation events for controlling focus restoration, triggering callbacks, or managing sequential UI workflows after all context menu layers are closed.
</div>

#### Event Data

##### e.item `Element`

The deactivated item

##### e.type `String`

The event type as a string - "deactivate".

##### e.target `Element`

The current target of the ContextMenu - either the init target or the current element chosen through filter, if specified.

#### Example

    <div id="target">Target</div>
    <ul id="context-menu">
        <li>Item 1
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
        <li>Item 2
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
    </ul>
    <script>
        $("#context-menu").kendoContextMenu({
            target: "#target",
            activate: function(e){
                $('li.k-item.k-hover').css('font-weight','bold');
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(e.item);
            },
            deactivate: function(e) {
                $('li.k-item').css('font-weight','');
	/* The result can be observed in the DevTools(F12) console of the browser. */
                console.log(e.item);
            }
        });
    </script>

#### To set after initialization

    <div id="target">Target</div>
    <ul id="context-menu">
        <li>Item 1
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
        <li>Item 2
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
    </ul>
    <script>
        // initialize the ContextMenu
        $("#context-menu").kendoContextMenu({
            target: "#target"
        });
         // get a reference to the ContextMenu widget
         var contextMenu = $("#context-menu").data("kendoContextMenu");
         // bind to the deactivate event
         contextMenu.bind("deactivate", function(e) {
             // handle event
         });
    </script>

### select

Fires when a menu item gets selected.


<div class="meta-api-description">
How do I capture user selections from Kendo UI context menus? Capture and respond to user interactions selecting options from right-click or context menus, detect which menu item was chosen, execute custom logic or commands tied to specific selections, intercept or cancel selection events using preventDefault, access event details to determine user choices, control navigation flow based on selected menu entries, and handle dynamic behavior triggered by contextual menu item activation in applications.
</div>

#### Event Data

##### e.item `Element`

The selected item

##### e.type `String`

The event type as a string - "select".

##### e.target `Element`

The current target of the ContextMenu - either the init target or the current element chosen through filter, if specified.

#### Example

    <div id="target">Target</div>
    <ul id="context-menu">
        <li>Item 1
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
        <li>Item 2
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
    </ul>
    <script>
        $("#context-menu").kendoContextMenu({
            target: "#target",
            select: function(e) {
                // handle event
            }
        });
    </script>

#### To set after initialization

    <div id="target">Target</div>
    <ul id="context-menu">
        <li>Item 1
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
        <li>Item 2
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
    </ul>
    <script>
        // initialize the ContextMenu
        $("#context-menu").kendoContextMenu({
            target: "#target"
        });
         // get a reference to the ContextMenu widget
         var contextMenu = $("#context-menu").data("kendoContextMenu");
         // bind to the select event
         contextMenu.bind("select", function(e) {
             // handle event
         });
    </script>
