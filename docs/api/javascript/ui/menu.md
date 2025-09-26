---
title: Menu
page_title: Configuration, methods and events of Kendo UI Menu
description: How to configure all animations in Menu UI widget, enable and disable, remove specified items and use code examples for all methods and events supported.
res_type: api
component: menu
---

# kendo.ui.Menu

Represents the Kendo UI Menu widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### animation `Boolean|Object`

A collection of **Animation** objects, used to change default animations. A value of `false` will disable all animations in the widget.

`animation:true` is not a valid configuration.

Available animations for the **Menu** are listed below.  Each animation has a reverse options which is used for the **close** effect by default, but can be over-ridden
by setting the **close** animation.  Each animation also has a direction which can be set off the animation (i.e. **slideIn:Down**).


<div class="meta-api-description">
Control and customize menu animations by configuring or disabling the animation effects that govern how menus open, close, and transition, including setting collections of animation objects, toggling animations on or off, overriding default opening and closing animations, specifying direction or slide effects like slideIn down or reverse close animations, enabling or disabling visual transitions for menu components, adjusting animation sequences or disabling animations entirely to achieve smooth, customized UI behavior or instant menu toggling without animation effects.
</div>

#### *slideIn*

Menu content slides in from the top

#### *fadeIn*

Menu content fades in

#### *expand*

Menu content expands from the top down. Similar to slideIn.

#### Example

    <ul id="menu">
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
        $("#menu").kendoMenu({
            animation: { open: { effects: "fadeIn" } }
        });
    </script>

### animation.close `Object`

The animation that will be used when closing sub menus.


<div class="meta-api-description">
Configure or customize the behavior of submenu closing animations in menus by setting effects, durations, easing curves, or disabling animations entirely to control how nested menus collapse or hide; adjust timing, transitions, or visual effects to enhance user experience when submenus close, including toggling animation on or off and fine-tuning the closing motion for dropdowns, flyouts, or hierarchical menu structures.
</div>

#### Example

    <ul id="menu">
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
        $("#menu").kendoMenu({
            animation: { close: { effects: "slideIn:up" } }
        });
    </script>

### animation.close.effects `String`

Effect to be used for closing of the popup.


<div class="meta-api-description">
Control and customize the menu popup’s closing animation effects by configuring the transition styles, enabling smooth or specific visual effects when hiding or closing the menu. Adjust, set, or define the closing animation behavior for menu popups to enhance user interface responsiveness, including fade-outs, slides, or other visual effects during the menu’s close event. This property helps tailor the popup hide animation, control how the menu disappears, and manage the closing effect settings for dynamic and visually appealing menu transitions in user interfaces.
</div>

#### Example

    <ul id="menu">
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
        $("#menu").kendoMenu({
            animation: { close: { effects: "slideIn:up" } }
        });
    </script>

### animation.close.duration `Number`

Defines the animation duration in milliseconds.


<div class="meta-api-description">
Adjust or configure the length of time it takes for submenu or menu closing animations to complete, controlling the speed, timing, and smoothness of transitions when hiding menus, setting the transition duration in milliseconds for responsiveness and visual flow, enabling customization of how fast or slow the menu's close effect plays out during UI interactions or navigation events.
</div>

#### Example

    <ul id="menu">
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
        $("#menu").kendoMenu({
             animation: { open: {
                 effects: "slideIn:down",
                 duration: 100
             } }
         });
    </script>

### animation.open `Object`

The animation that will be used when opening sub menus.


<div class="meta-api-description">
Customize and configure the opening transition, animation style, timing, and visual effects applied when submenus are revealed or expanded within navigation menus. Adjust how submenu panels animate as they open, control ease-in effects, durations, fade or slide motions, and set parameters for smooth or dynamic submenu appearance during user interaction, hover, or click events. Enable tailored submenu open animations to enhance user experience, improve interface responsiveness, and create visually engaging menu behaviors when nested options become visible.
</div>

#### Example

    <ul id="menu">
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
        $("#menu").kendoMenu({
            animation: { open: { effects: "slideIn:down" } }
        });
    </script>

### animation.open.effects `String`

Effect to be used for opening of the popup.


<div class="meta-api-description">
Control and customize the popup menu’s opening animation behavior by configuring animation effects such as fade, slide, or other transition styles, including options to set animation duration, easing, and effect type to create smooth, visually appealing menu appearances. Enable or adjust how the menu displays when triggered, defining popup show animations with parameters for timing and motion style to enhance user interface dynamics and interaction feedback. Manage visual entry effects for dropdowns or menu popups by specifying customizable animation settings that influence the way menus open and become visible on screen.
</div>

#### Example

    <ul id="menu">
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
        $("#menu").kendoMenu({
            animation: { open: { effects: "slideIn:down" } }
        });
    </script>

### animation.open.duration `Number`

Defines the animation duration in milliseconds.


<div class="meta-api-description">
Adjust the length of the menu’s opening animation by setting the duration in milliseconds to speed up or slow down the transition effect when the menu expands or slides into view. Customize the timing of how fast the menu appears or unfolds using animation duration settings, control the open animation speed for smoother or quicker menu reveals, fine-tune or configure the delay for menu opening transitions, and set precise animation intervals for dropdown or slide-in menus to create preferred visual pacing and responsiveness.
</div>

#### Example

    <ul id="menu">
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
        $("#menu").kendoMenu({
            animation: { open: {
                effects: "zoomIn",
                duration: 100
            } }
         });
    </script>

### closeOnClick `Boolean`*(default: true)*

 Specifies that sub menus should close after item selection (provided they won't navigate).


<div class="meta-api-description">
Set or configure automatic closing of dropdown or nested menus upon item selection, controlling whether sub menus collapse after a user clicks an option, with options to keep sub menus open when items trigger navigation links or page changes, enabling intuitive menu behavior like closing popups, toggling visibility after clicks, or preserving expanded menus depending on navigation targets or user interaction; useful for dropdowns, navigation menus, context menus, and multi-level selections where click actions may or may not require hiding the menu interface.
</div>

#### Example

    <ul id="menu">
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
        $("#menu").kendoMenu({
            closeOnClick: false
        });
    </script>

### dataSource `Object|Array|kendo.data.HierarchicalDataSource`

The data source of the widget which is used to render its items. Can be a JSON object/Arra/[kendo.data.HierarchicalDataSource](/api/javascript/data/hierarchicaldatasource) that contains an item or an Array of items to be rendered.
Refer to the example below for a list of the supported properties.


<div class="meta-api-description">
Configure or set the source data feeding the menu items by providing collections such as local arrays, JSON objects, or hierarchical data structures, enabling binding and rendering of nested or flat menu entries; this includes supplying single items or arrays in formats like JavaScript arrays, JSON datasets, or specialized hierarchical data sources to control menu content dynamically across various use cases for data-driven menus, hierarchical navigation, and dynamic item population.
</div>

#### Example - using a local array

    <ul id="menu"></ul>
    <script>
      var imgUrl = "https://demos.telerik.com/kendo-ui/content/shared/icons/sports/swimming.png";
      $(document).ready(function() {
        $("#menu").kendoMenu({
          dataSource:
          [{
            text: "Item 1",
            cssClass: "myClass",                         // Add custom CSS class to the item, optional, added 2012 Q3 SP1.
            url: "https://www.telerik.com/kendo-ui",               // Link URL if navigation is needed, optional.
            attr: {
              custom: 'value',                            // Add attributes with specified values
              other: 'value'
            }
          },
           {
             text: "<b>Item 2</b>",
             encoded: false,                              // Allows use of HTML for item text
             content: "text",                              // content within an item
             contentAttr: {
               style: 'border: 1px solid red; padding: 2px;', // Add attributes to the content container
               custom: 'value'
             }
           },
           {
             text: "Item 3",
             imageAttr: {																	// Add additional image attributes
               alt: 'Image',
               height: '25px',
               width: '25px'
             },
             imageUrl: imgUrl,                            // Item image URL, optional.
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
           },
           {
             text: "Item 5",
             select: function(e) {                        // Item select event handler, optional
                // e.sender - returns reference to the Kendo Menu widget
                // e.target - returns the clicked element. Typically, the span.k-link element.

                // handle event
             }
           },
           {
                text: "Item 6",
                icon: "gear"
           },
           {
                text: "Item 7",
                icon: "pencil",
                iconClass: "custom-icon-class"
           }]
        })
      });
    </script>

#### Example - using kendo.data.HierarchicalDataSource

    <ul id="menu"></ul>
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

        var menu =  $("#menu").kendoMenu({
            dataTextField: "FullName",
            dataSource: dataSource
        })
    </script>

### dataTextField `String`

Sets the field of the data item that provides the text of the menu items.


<div class="meta-api-description">
Control or configure which property or field of your data source supplies the visible text labels for menu items when binding dynamic data to menu components, specifying the exact attribute or key whose string value will be shown as the menu text, supporting various data structures like arrays, objects, or data source collections, enabling customized display of menu entries by mapping underlying data fields to user-facing labels in menus, dropdowns, or navigation lists.
</div>

#### Example

    <ul id="menu"></ul>
    <script>
        var imgUrl = "https://demos.telerik.com/kendo-ui/content/shared/icons/sports/swimming.png";
        $("#menu").kendoMenu({
            dataSource: {
            data: [{
                    Name: "Item 1",
                    UrlPath: "urlPath",
                    Sprite: "spriteCssClass",
                    imgUrl: imgUrl,
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

Sets the field of the data item that provides the url of the menu items.


<div class="meta-api-description">
Specify or set the field name within your data source that holds the URL, link, or href address for each menu or navigation item, enabling dynamic linking, routing, or navigation setup in menus populated from hierarchical or flat data collections; control or configure which data attribute supplies the target link for menu entries to ensure menu items correctly direct users to their intended web pages or routes when binding data-driven menus.
</div>

#### Example

    <ul id="menu"></ul>
    <script>
        var imgUrl = "https://demos.telerik.com/kendo-ui/content/shared/icons/sports/swimming.png";
        $("#menu").kendoMenu({
            dataSource: {
            data: [{
                    Name: "Item 1",
                    UrlPath: "urlPath",
                    Sprite: "spriteCssClass",
                    imgUrl: imgUrl,
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

Sets the field of the data item that provides the sprite css class of the menu items.


<div class="meta-api-description">
Control which data field provides CSS class names for icons or sprites displayed on menu items by specifying the attribute that holds the CSS sprite class to apply custom styling or visuals, map CSS classes from dataset entries to menu components, dynamically assign icon classes based on underlying data properties, configure the linkage between data fields and visual sprite classes, or enable menu entries to reflect styles driven by data attributes for icons, sprites, or custom decorations.
</div>

#### Example

    <ul id="menu"></ul>
    <script>
        var imgUrl = "https://demos.telerik.com/kendo-ui/content/shared/icons/sports/swimming.png";
        $("#menu").kendoMenu({
            dataSource: {
            data: [{
                    Name: "Item 1",
                    UrlPath: "urlPath",
                    Sprite: "spriteCssClass",
                    imgUrl: imgUrl,
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

Sets the field of the data item that provides the image url of the menu items.


<div class="meta-api-description">
Configure and control how to display icons or images adjacent to menu entries by specifying the data field that holds each item's image URL. Enable associating URLs from your data source directly to menu items for visual representation, set or bind image paths to dynamically render icons, embed image references next to entries, and customize menus with linked image assets by pointing to the relevant data attribute containing the graphic resource URL. Facilitate showing visual cues, thumbnails, or icons within menu lists by linking data fields to images, supporting scenarios where menus require graphical elements alongside text labels from structured data sources.
</div>

#### Example

    <ul id="menu"></ul>
    <script>
        $("#menu").kendoMenu({
            dataSource: {
            data: [{
                    Name: "Item 1",
                    imgUrl: "https://demos.telerik.com/kendo-ui/content/shared/icons/sports/golf.png"
                }]
            },
            dataTextField:"Name",
            dataImageUrlField:"imgUrl"
        });
    </script>

### dataIconField `String`

Sets the field of the data item that provides the icon name of the menu items.


<div class="meta-api-description">
Bind icons dynamically to menu items by specifying the data field that contains icon identifiers such as icon names, CSS classes, or image references, enabling menus connected to data sources to display corresponding icons automatically; configure, set, or map icon fields to show relevant visual indicators per menu entry, control icon rendering in data-driven menus, and link icon metadata from your dataset to menu elements for enhanced UI customization and consistent icon representation.
</div>

#### Example

    <ul id="menu"></ul>
    <script>
        $("#menu").kendoMenu({
            dataSource: {
            data: [{
                    Name: "Item 1",
                    IconName: "gear",
                    IconClass: "custom-icon-class"
                }]
            },
            dataTextField:"Name",
            dataIconField:"IconName",
            dataIconClassField:"IconClass"
        });
    </script>

### dataIconClassField `String`

Sets the field of the data item that provides the icon class of the menu items.



<div class="meta-api-description">
Configure dynamic icon styling by assigning the CSS class for each menu item’s icon based on a specific data field, enabling per-item icons through data binding, setting or mapping icon class names from your dataset, controlling icon appearance using the field value from your JSON, objects, or data source, customizing menu icons dynamically by linking CSS class fields to your data structure, applying different icon styles per entry by specifying which property contains the icon class, and supporting flexible icon customization on data-driven menu elements to reflect varying icons per item from backend or frontend data.
</div>

#### Example

    <ul id="menu"></ul>
    <script>
        $("#menu").kendoMenu({
            dataSource: {
            data: [{
                    Name: "Item 1",
                    IconName: "gear",
                    IconClass: "custom-icon-class"
                }]
            },
            dataTextField:"Name",
            dataIconField:"IconName",
            dataIconClassField:"IconClass"
        });
    </script>

### dataContentField `String`

Sets the field of the data item that provides the content of the menu items.


<div class="meta-api-description">
Configure how menu items display custom or dynamic content by specifying the data field containing each entry’s content, enabling binding of menu entries to a particular property in your data source, allowing control over which data attribute is shown as menu text or inner content, set or customize the source field for menu item labels or rich content, link menu item display to a specific data property for dynamic rendering, and adjust or select which data field drives the visible content inside menu elements.
</div>

#### Example

    <ul id="menu"></ul>
    <script>
        var imgUrl = "https://demos.telerik.com/kendo-ui/content/shared/icons/sports/swimming.png";
        $("#menu").kendoMenu({
            dataSource: {
            data: [{
                    Name: "Item 1",
                    UrlPath: "urlPath",
                    Sprite: "spriteCssClass",
                    imgUrl: imgUrl,
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

 Specifies Menu opening direction. Can be "top", "bottom", "left", "right".
You can also specify different direction for root and sub menu items, separating them with space. The example below will initialize the root menu to open upwards and
its sub menus to the left.


<div class="meta-api-description">
Adjust and configure menu panel opening direction by specifying layout orientation such as top, bottom, left, or right for both main and nested submenu levels, enabling control over how dropdowns or slide-out menus appear on user interaction; supports setting different directions for root menus and submenus with options to customize placement behavior, opening flow, panel alignment, navigation structure, and user interface positioning to fit various design needs and interaction patterns.
</div>

#### Example

    <ul id="menu">
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
        $("#menu").kendoMenu({
            direction: "top left"
        });
    </script>

### hoverDelay `Number`*(default: 100)*

 Specifies the delay in ms before the menu is opened/closed - used to avoid accidental closure on leaving.


<div class="meta-api-description">
Set or adjust the delay time in milliseconds before menus open or close when hovering to prevent accidental closures or flickering, controlling the debounce interval for pointer enter and leave events. This configurable timeout manages how quickly hover interactions trigger menu visibility changes, enabling smooth user navigation by fine-tuning hover responsiveness, pointer hover delay, mouseover latency, or hover state timing in interfaces with dropdowns or popup menus.
</div>

#### Example

    <ul id="menu">
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
        $("#menu").kendoMenu({
            hoverDelay: 200
        });
    </script>

### iconPosition `String` *(default: "before")*

Specifies the position of the icon in the Menu items using the text content as a reference. The available options are:
- `before` - the icon is positioned before the text
- `after` - the icon is positioned after the text


<div class="meta-api-description">
Adjust the placement of icons in menu items by setting the position of icons either before or after the label text, enabling control over icon alignment, ordering, and layout in navigation or dropdown menus; customize whether icons appear preceding or following menu item names to fit UI design preferences and improve visual hierarchy, toggle icon placement for better readability or styling, and configure icon ordering relative to text to enhance user interface consistency and interaction flow.
</div>

#### Example

    <ul id="menu"></ul>
    <script>
        $("#menu").kendoMenu({
            iconPosition: "after",
            dataSource: [
                { text: "Item 1", icon: "gear" },
                { text: "Item 2", icon: "pencil" }
            ]
        });
    </script>

### openOnClick `Boolean|Object`*(default: false)*

 Specifies that the root sub menus will be opened on item click.


<div class="meta-api-description">
Control whether root level submenus open when clicking menu items instead of on hover by enabling click-triggered submenu expansion, allowing configuration to switch between hover and click interactions for opening main menu branches, setting up user preferences for submenu activation via click events during initialization to customize navigation behavior and improve user interface responsiveness.
</div>

#### Example

    <ul id="menu">
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
        $("#menu").kendoMenu({
            openOnClick: true
        });
    </script>

### openOnClick.rootMenuItems `Boolean`*(default: false)*

 Specifies that the root menus will be opened only on item click.


<div class="meta-api-description">
Control whether top-level or root menu items open exclusively on mouse clicks instead of hover events, enabling developers to configure menu interaction behavior to require explicit clicks for opening primary menu entries, adjust event triggers between hover and click for root-level navigation items, and set user interface responsiveness to avoid accidental submenu displays by toggling open-on-click functionality for main menu options.
</div>

#### Example

    <ul id="menu">
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
        $("#menu").kendoMenu({
            openOnClick: {
                rootMenuItems: true
            }
        });
    </script>

### openOnClick.subMenuItems `Boolean`*(default: false)*

 Specifies that the sub menus will be opened only on item click.


<div class="meta-api-description">
Control submenu expansion behavior by configuring whether submenus open exclusively on click actions of their parent menu items rather than on hover or focus events, enabling precise interaction control to prevent accidental submenu activation with mouse movements, and allowing developers to set click-driven submenu toggling during menu initialization for customized user interface behavior and improved navigation accuracy in hierarchical menus.
</div>

#### Example

    <ul id="menu">
        <li>Item 1
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2
                    <ul>
                        <li>Sub Item 2.1</li>
                        <li>Sub Item 2.2</li>
                        <li>Sub Item 2.3</li>
                    </ul>
                </li>
                <li>Sub Item 3</li>
            </ul>
        </li>
        <li>Item 2
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2
                    <ul>
                        <li>Sub Item 2.1</li>
                        <li>Sub Item 2.2</li>
                        <li>Sub Item 2.3</li>
                    </ul>
                </li>
                <li>Sub Item 3</li>
            </ul>
        </li>
    </ul>
    <script>
        $("#menu").kendoMenu({
            openOnClick: {
                subMenuItems: true
            }
        });
    </script>

### orientation `String`*(default: "horizontal")*

 Root menu orientation. Could be horizontal or vertical.


<div class="meta-api-description">
Control the menu layout direction by setting whether items are arranged horizontally or vertically, affecting the visual alignment, item organization, navigation flow, and keyboard arrow key behavior for seamless interaction and accessibility. Configure the root orientation to adjust how menu entries are structured and navigated, choosing between horizontal rows or vertical columns to match design and usability requirements, enhance user experience, and guide keyboard navigation patterns accordingly.
</div>

#### Example

    <ul id="menu">
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
        $("#menu").kendoMenu({
            orientation: "vertical"
        });
    </script>

### popupCollision `String`

Specifies how Menu should adjust to screen boundaries. By default the strategy is **"fit"** for a sub menu with a horizontal parent,
meaning it will move to fit in screen boundaries in all directions, and **"fit flip"** for a sub menu with vertical parent, meaning it will fit vertically and flip over
its parent horizontally. You can also switch off the screen boundary detection completely if you set the **popupCollision** to false.


<div class="meta-api-description">
Control sub-menu positioning and viewport boundary handling to ensure menus stay fully visible within the screen; configure automatic adjustments like fitting, flipping, or disabling collision detection for sub-menus based on their orientation to prevent overflow offscreen, enable custom screen edge behavior, manage popup boundaries dynamically, adjust alignment strategies for horizontal or vertical menus, set behavior to avoid clipping or cutoff on edges, and control whether sub-menu popups reposition automatically or remain fixed regardless of viewport space.
</div>

#### Example

    <ul id="menu">
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
        $("#menu").kendoMenu({
            popupCollision: false
        });
    </script>

### scrollable `Boolean|Object` *(default: false)*

If enabled, the Menu displays buttons that scroll the items when they cannot fit the width or the popups' height of the Menu. By default, scrolling is disabled.

The following example demonstrates how to enable the scrolling functionality.


<div class="meta-api-description">
Control the ability to enable or configure horizontal and vertical scrolling with scroll buttons for menus and submenu popups when menu items exceed visible width or height, allowing users to navigate through overflowing list items smoothly. This setting manages scrollable menus, overflow handling, enabling scroll controls for long or large menus, and supports use cases where menu content surpasses display limits requiring user interaction to browse additional items. Adjust scrolling behavior to handle extensive menus with vertical or horizontal overflow, customize user navigation experience, and toggle scroll button visibility for submenu and main menu item lists that do not fit within their containers.
</div>

#### Example

    <ul id="menu" style="width:150px;">
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
    </ul>

    <script>
        $("#menu").kendoMenu({
            scrollable: true
        });
    </script>

### scrollable.distance `Number` *(default: 50)*

Sets the scroll amount (in pixels) that the Menu scrolls when the scroll buttons are hovered. Each such distance is animated and then another animation starts with the same distance. If clicking a scroll button, the Menu scrolls by doubling the distance.


<div class="meta-api-description">
Control the number of pixels the menu content moves or scrolls when using navigation buttons or hovering over scroll controls, specifying the scroll step size to fine-tune the animated scroll increments, adjust how far the menu shifts per hover event, set the scroll distance for smoother or faster horizontal or vertical menu navigation, configure repeated scroll animations for continuous movement, customize scroll speed by defining pixel increments for click and hover actions, enable precise adjustment of menu scrolling behavior with distance values that affect how much content shifts per interaction, and manage scroll responsiveness to create intuitive menu browsing experiences.
</div>

#### Example

    <ul id="menu" style="width:150px;">
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
    </ul>

    <script>
        $("#menu").kendoMenu({
            scrollable: {
                distance: 20
            }
        });
    </script>

### scrollable.scrollButtonsPosition `string` *(default: "split")*

Determines where the scroll buttons appear when menu content overflows. Here's an explanation of the available options:

- "split" (default): Places one scroll button at the beginning and another at the end of the scrollable container
- "start": Places both scroll buttons at the beginning of the scrollable container
- "end": Places both scroll buttons at the end of the scrollable container



<div class="meta-api-description">
Adjust the placement of scroll navigation buttons within a scrollable menu or container when content overflows, allowing configuration of scroll controls to appear either split with one button at the start and one at the end, clustered together at the beginning, or grouped at the end of the scrollable area, enabling customization of user interface scrolling behavior, positioning of navigation arrows, and control over button alignment for horizontally or vertically scrollable menus and lists.
</div>

#### Example

    <ul id="menu" style="width:150px;">
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
    </ul>

    <script>
        $("#menu").kendoMenu({
            scrollable: {
                scrollButtonsPosition: "start"
            }
        });
    </script>

## Methods

### append

Appends an item to a **Menu** in the specified referenceItem's sub menu.


<div class="meta-api-description">
Insert or add a new menu item dynamically into an existing submenu or nested menu structure during runtime, enabling modification, extension, or customization of menus after they have been initialized. This function supports appending entries to target submenu locations identified by a reference child item, allowing developers to control menu hierarchies, extend context menus, add nested options, or programmatically update user interface menus with new or additional interactive elements on the fly.
</div>

#### Example

    <ul id="menu"></ul>
    <script>
        //initialize the menu widget
        $("#menu").kendoMenu()
        // get a reference to the menu widget
        var menu = $("#menu").data("kendoMenu");

        menu.append([
            {
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
                items: [{text: "Sub Item 1"},{text: "Sub Item 2"}] //Sub items
            },
            {
                text: "Item 4",
                spriteCssClass: "imageClass3"                // Item image sprite CSS class, optional.
            }
        ]);
    </script>

#### Parameters

##### item `Object|Array`

Item to be appended, specified as a JSON object. An array of objects can also be passed.

##### referenceItem `String|jQuery` *(optional)*

A reference item to append the new item in. If omitted, the new item will be appended to the as a root item.

#### Returns

`kendo.ui.Menu` Returns the Menu object to support chaining.

### close

Closes a sub-menu of a specified item(s) in a **Menu**.


<div class="meta-api-description">
Programmatically close or collapse nested or child menus, hide open submenu entries, control menu visibility states, manage and toggle sub-menu expansion or collapse dynamically, trigger menu item closing actions, implement custom logic for hiding specific submenus, configure interactive menu behaviors to close dropdowns or nested lists on demand, control open or closed states of menu sections, handle user-driven or code-driven submenu closing within complex navigation components.
</div>

#### Example

    <ul id="menu">
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
        //intialize the menu widget
        $("#menu").kendoMenu();
        // get a reference to the menu widget
        var menu = $("#menu").data("kendoMenu");

        // close the sub menu of "Item1"
        menu.close("#Item1");
    </script>

#### Parameters

##### element `String|Element|jQuery`

Target item selector.

#### Returns

`kendo.ui.Menu` Returns the Menu object to support chaining.

### destroy
Prepares the **Menu** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the Menu element from DOM.


<div class="meta-api-description">
Teardown and cleanup menu instances by removing event listeners, detaching data attributes to prevent memory leaks, disposing of nested widget components, and fully releasing resources associated with menu elements without deleting the DOM node; enables controlled resource management, garbage collection readiness, and safe widget destruction for menus and their child Kendo UI components.
</div>

#### Example

    <ul id="menu">
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
        $("#menu").kendoMenu();
        var menu = $("#menu").data("kendoMenu");

        // detach events
        menu.destroy();
    </script>

### enable

Enables or disables an item of a **Menu**. This can optionally be accomplished on
initialization by setting the **disabled="disabled"** on the desired menu item html element.


<div class="meta-api-description">
Control the activation state of individual menu items dynamically by programmatically enabling or disabling options through method calls, toggling specific entries on or off during runtime, setting menu item availability based on user actions or conditions, managing disabled states via code commands instead of just initial HTML attributes, adjusting interactive menu components for responsiveness or context-sensitive behavior, and configuring which menu options are selectable or grayed out without reloading or rebuilding the entire menu structure.
</div>

#### Example

    <ul id="menu">
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
        $("#menu").kendoMenu();
        // get a reference to the menu widget
        var menu = $("#menu").data("kendoMenu");
        // disable the li menu item with the id "secondItem"
        menu.enable("#secondItem", false);
    </script>

#### Parameters

##### element `String|Element|jQuery`

Target element

##### enable `Boolean`

Desired state

#### Returns

`kendo.ui.Menu` Returns the Menu object to support chaining.


### findByUid

Returns the Menu item by the dataItem's uid.


<div class="meta-api-description">
Locate, access, or retrieve a specific menu element based on its unique identifier (uid) associated with the underlying data item, enabling tasks such as searching for a menu entry by uid, finding and manipulating menu items programmatically, selecting, updating, inspecting, or removing a menu entry referenced by its data id, controlling menu components through their unique keys, and performing operations like lookup, modification, or deletion on particular menu items identified by their uid values.
</div>

#### Example

    <ul id="menu"></ul>
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

        var menu = $("#menu").kendoMenu({
            dataTextField: "FullName",
            dataSource: dataSource
        }).data("kendoMenu");


        menu.one("dataBound", function (ev) {
            var firstItemUid = menu.dataSource.at(0).uid;
            var item = menu.findByUid(firstItemUid);
            menu.open(item);
        });
    </script>

#### Parameters

##### uid `String`

The uid of the data item.

#### Returns

`jQuery` the item found.


### insertAfter

Inserts an item into a **Menu** after the specified referenceItem.


<div class="meta-api-description">
Add or inject a new menu entry immediately following a specific existing item to dynamically reorder or update menu options, enabling insertion of commands or items after a target reference, supporting runtime modification, menu entry placement control, appending entries in sequence, and programmatic menu updates triggered by user interactions or application logic.
</div>

#### Example

    <ul id="menu">
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
        $("#menu").kendoMenu();
        // get a reference to the menu widget
        var menu = $("#menu").data("kendoMenu");
        //
        menu.insertAfter(
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

`kendo.ui.Menu` Returns the Menu object to support chaining.

### insertBefore

Inserts an item into a **Menu** before the specified referenceItem.


<div class="meta-api-description">
Add or insert a new menu item before an existing menu entry dynamically by specifying a reference item to position the new element ahead in the menu list; control, adjust, or reorder menu entries at runtime by placing new options immediately preceding a target item, enabling precise manipulation, insertion, or arrangement of menu components in the user interface or application menus.
</div>

#### Example

    <ul id="menu">
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
        $("#menu").kendoMenu();
        // get a reference to the menu widget
        var menu = $("#menu").data("kendoMenu");
        //
        menu.insertBefore(
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
                imageUrl: "https://demos.telerik.com/kendo-ui/content/shared/icons/sports/swimming.png", // Item image URL, optional.
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

`kendo.ui.Menu` Returns the Menu object to support chaining.

### open

Opens a sub-menu of a specified item(s) in a **Menu**.


<div class="meta-api-description">
Programmatically trigger or control the expansion and display of sub-menus or child items within a menu structure, enabling developers to open one or multiple nested menu entries dynamically through code, synchronize menu visibility with keyboard navigation, routing events, or custom user interactions, and configure menu states such as expanded or collapsed items for enhanced UI control and automated workflows without relying on user clicks.
</div>

#### Example

    <ul id="menu">
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
        $("#menu").kendoMenu();
        // get a reference to the menu widget
        var menu = $("#menu").data("kendoMenu");
        // open the sub menu of "Item1"
        menu.open("#Item1");
    </script>

#### Parameters

##### element `String|Element|jQuery`

Target item selector.

#### Returns

`kendo.ui.Menu` Returns the Menu object to support chaining.

### remove

Removes a specified item(s) from a **Menu**.


<div class="meta-api-description">
Delete or eliminate specific menu items dynamically by specifying and removing one or multiple entries from a menu component, enabling programmatic control to update the visible options, modify or clear selections, adjust menu contents on the fly, and ensure removed items no longer display or respond to user interactions, effectively managing menu state and DOM elements through targeted item references for use cases like real-time menu customization, conditional option removal, and interactive menu updates.
</div>

#### Example

    <ul id="menu">
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
        $("#menu").kendoMenu();
        // get a reference to the menu widget
        var menu = $("#menu").data("kendoMenu");
        // remove the item with the id "Item1"
        menu.remove("#Item1");
    </script>

#### Parameters

##### element `String|Element|jQuery`

Target item selector.

#### Returns

`kendo.ui.Menu` Returns the Menu object to support chaining.

## Events

### close

Fires before a sub menu gets closed. You can cancel this event to prevent closure.


<div class="meta-api-description">
Detect, handle, or prevent submenu closing actions within menu components by intercepting the event triggered just before a submenu closes, enabling developers to execute custom logic like cleanup, analytics tracking, state saving, or conditional blocking by calling preventDefault() to cancel the close operation, controlling submenu visibility and user interaction flow in navigation menus effectively.
</div>

#### Event Data

##### e.item `HTMLElement`

The closed item

#### Example

    <ul id="menu">
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
         $("#menu").kendoMenu({
             close: function(e) {
                 // handle event
             }
         });
    </script>

#### To set after initialization

    <ul id="menu">
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
        $("#menu").kendoMenu();
        // get a reference to the menu widget
        var menu = $("#menu").data("kendoMenu");
        // bind to the close event
        menu.bind("close", function(e) {
            // handle event
        });
    </script>


### dataBound

Fires when the Menu is bound to the set DataSource.


<div class="meta-api-description">
Detect when a menu or navigation component completes loading, updating, or binding its data source to trigger UI refreshes, update menu items, run post-load actions, or execute logic after data is fully loaded and rendered. Capture events signaling the completion of data binding, data source synchronization, or dynamic menu population to enable responsive updates, conditional rendering, or interactive changes once menu items and data connections are established.
</div>

#### Event Data

##### e.item `HTMLElement`

The loaded item (at initial bound this will be the Menu root element).

##### e.dataItem `Object`

The dataItem that is being loaded or bound (at initial bound this should be undefined).

#### Example

    <ul id="menu"></ul>
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

        var menu =  $("#menu").kendoMenu({
            dataTextField: "FullName",
            dataSource: dataSource,
            dataBound: function(){
	/* The result can be observed in the DevTools(F12) console of the browser. */
                console.log("dataBound");
            }
        })
    </script>

#### To set after initialization

    <ul id="menu"></ul>
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

        var menu =  $("#menu").kendoMenu({
            dataTextField: "FullName",
            dataSource: dataSource
        }).data("kendoMenu");

        menu.bind("dataBound", function() {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("dataBound");
        });
    </script>

### open

Fires before a sub menu gets opened. You can cancel this event to prevent opening the sub menu.


<div class="meta-api-description">
Intercept or control the opening of submenus within a menu interface by detecting and handling events triggered before the submenu appears, enabling developers to prevent submenu display through cancellation, implement validation or asynchronous checks before opening, customize open behavior based on user interactions like clicks, hovers, or keyboard navigation, and enforce application-specific logic to dynamically block or allow submenu activation, providing fine-grained management over menu display and interaction flows.
</div>

#### Event Data

##### e.item `HTMLElement`

The opened item

#### Example

    <ul id="menu">
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
         $("#menu").kendoMenu({
             open: function(e) {
                 // handle event
             }
         });
    </script>

#### To set after initialization

    <ul id="menu">
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
        $("#menu").kendoMenu();
        // get a reference to the menu widget
        var menu = $("#menu").data("kendoMenu");
        // bind to the open event
        menu.bind("open", function(e) {
            // handle event
        });
    </script>

### activate

Fires when a sub menu gets opened and its animation finished.


<div class="meta-api-description">
Trigger actions or run custom code immediately after a submenu finishes opening and its animation completes, enabling detection of when dropdowns or nested menus become fully visible and interactive. This event can be used to manage focus, initialize or lazy-load content dynamically within submenus, update application state, track user interaction analytics, or synchronize UI changes precisely upon submenu activation. It supports scenarios such as handling submenu open completion, reacting to nested menu expansions, controlling submenu visibility transitions, and performing tasks contingent on submenu readiness and visual confirmation.
</div>

#### Event Data

##### e.item `HTMLElement`

The activated item

#### Example

    <ul id="menu">
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
         $("#menu").kendoMenu({
             activate: function(e) {
                 // handle event
             }
         });
    </script>

#### To set after initialization

    <ul id="menu">
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
        $("#menu").kendoMenu();
        // get a reference to the menu widget
        var menu = $("#menu").data("kendoMenu");
        // bind to the activate event
        menu.bind("activate", function(e) {
            // handle event
        });
    </script>

### deactivate

Fires when a sub menu gets closed and its animation finished.


<div class="meta-api-description">
Capture the moment when a menu's submenu finishes closing and its closing animation is complete to trigger actions like cleanup tasks, restoring keyboard focus, updating interface state, or executing callbacks after submenu deactivation. Track submenu close completion events, listen for submenu deactivation signals, detect when nested menus have fully closed and their transition animations end, enable handlers for submenu lifecycle completion, and respond to submenu close animations finishing with event objects for precise state management and focus control.
</div>

#### Event Data

##### e.item `HTMLElement`

The deactivated item

#### Example

    <ul id="menu">
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
         $("#menu").kendoMenu({
             deactivate: function(e) {
                 // handle event
             }
         });
    </script>

#### To set after initialization

    <ul id="menu">
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
        $("#menu").kendoMenu();
        // get a reference to the menu widget
        var menu = $("#menu").data("kendoMenu");
        // bind to the deactivate event
        menu.bind("deactivate", function(e) {
            // handle event
        });
    </script>

### select

Fires when a menu item gets selected.


<div class="meta-api-description">
Trigger actions or execute custom logic when a user picks or clicks a menu option, capturing the moment a menu item is chosen or selected within an interface. Detect menu selection events, listen for item clicks or picks, and access detailed data about the chosen menu entry from the event payload, enabling developers to override default behaviors like navigation by preventing the standard response. Handle user interaction with dropdowns, context menus, or navigation lists by responding programmatically to selection inputs and controlling event flow to customize user experience based on the menu choice.
</div>

#### Event Data

##### e.item `HTMLElement`

The selected item

#### Example

    <ul id="menu">
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
         $("#menu").kendoMenu({
             select: function(e) {
                 // handle event
             }
         });
    </script>

#### To set after initialization

    <ul id="menu">
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
        $("#menu").kendoMenu();
        // get a reference to the menu widget
        var menu = $("#menu").data("kendoMenu");
        // bind to the select event
        menu.bind("select", function(e) {
            // handle event
        });
    </script>
