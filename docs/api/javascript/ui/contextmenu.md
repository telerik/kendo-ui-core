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
                        url: "http://www.kendoui.com"                // Link URL if navigation is needed, optional.
                    },
                    {
                        text: "<b>Item 2</b>",
                        encoded: false,                              // Allows use of HTML for item text
                        content: "text"                              // content within an item
                    },
                    {
                        text: "Item 3",
                        imageUrl: "http://www.kendoui.com/test.jpg", // Item image URL, optional.
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
                    url: "https://demos.telerik.com/kendo-ui/service/Employees",
                    dataType: "jsonp"
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

#### Example

    <div id="target">Target</div>
    <ul id="context-menu"></ul>
    <script>
        $("#context-menu").kendoMenu({
            target: "#target",
            dataSource: {
            data: [{
                    Name: "Item 1",
                    UrlPath: "urlPath",
                    Sprite: "spriteCssClass",
                    imgUrl: "imgUrl",
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

#### Example

    <div id="target">Target</div>
    <ul id="context-menu"></ul>
    <script>
        $("#context-menu").kendoMenu({
            target: "#target",
            dataSource: {
            data: [{
                    Name: "Item 1",
                    UrlPath: "urlPath",
                    Sprite: "spriteCssClass",
                    imgUrl: "imgUrl",
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

#### Example

    <div id="target">Target</div>
    <ul id="context-menu"></ul>
    <script>
        $("#context-menu").kendoMenu({
            target: "#target",
            dataSource: {
            data: [{
                    Name: "Item 1",
                    UrlPath: "urlPath",
                    Sprite: "spriteCssClass",
                    imgUrl: "imgUrl",
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

#### Example

    <div id="target">Target</div>
    <ul id="context-menu"></ul>
    <script>
        $("#context-menu").kendoMenu({
            target: "#target",
            dataSource: {
            data: [{
                    Name: "Item 1",
                    UrlPath: "urlPath",
                    Sprite: "spriteCssClass",
                    imgUrl: "imgUrl",
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

#### Example

    <div id="target">Target</div>
    <ul id="context-menu"></ul>
    <script>
        $("#context-menu").kendoMenu({
            target: "#target",
            dataSource: {
            data: [{
                    Name: "Item 1",
                    UrlPath: "urlPath",
                    Sprite: "spriteCssClass",
                    imgUrl: "imgUrl",
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
            direction: "left"
        });
    </script>

### filter `String`

Specifies ContextMenu filter selector - the ContextMenu will only be shown on items that satisfy the provided selector.

#### Show the ContextMenu on some elements inside the target

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

#### Show the ContextMenu on left click

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

#### Show the ContextMenu on element with ID target

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
                url: "http://www.telerik.com"                // Link URL if navigation is needed, optional.
            },
            {
                text: "<b>Item 2</b>",
                encoded: false,                              // Allows use of HTML for item text
                content: "text"                              // content within an item
            },
            {
                text: "Item 3",
                imageUrl: "http://www.telerik.com/test.jpg", // Item image URL, optional.
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
        );
    </script>

#### Parameters

##### item `Object|Array`

Item to be appended, specified as a JSON object. An array of objects can also be passed.

##### referenceItem `String|jQuery` *(optional)*

A reference item to append the new item in. If omitted, the new item will be appended to the as a root item.

#### Returns

`kendo.ui.ContextMenu` Returns the ContextMenu object to support chaining.

### close

Closes the **ContextMenu**. This method can be prevented to stop the closure.

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
        contextMenu.close(100, 100);
    </script>

#### Parameters

##### element `Element|jQuery`

If called without arguments, will close the ContextMenu. If passed an item, it will be closed (if opened).

#### Returns

`kendo.ui.ContextMenu` Returns the ContextMenu object to support chaining.

### destroy
Safely removes the **ContextMenu** from the DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

If a new ContextMenu widget should be created afterwards, use a new `<ul>` for that, as the old one no longer exists.

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

#### Example

    <div id="target">Target</div>
    <ul id="context-menu"></ul>
    <script>
        var dataSource = new kendo.data.HierarchicalDataSource({
            transport: {
                read: {
                    url: "https://demos.telerik.com/kendo-ui/service/Employees",
                    dataType: "jsonp"
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
                url: "http://www.telerik.com"                // Link URL if navigation is needed, optional.
            },
            {
                text: "<b>Item 2</b>",
                encoded: false,                                 // Allows use of HTML for item text
                content: "text"                                 // content within an item
            },
            {
                text: "Item 3",
                imageUrl: "http://www.telerik.com/test.jpg", // Item image URL, optional.
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
                url: "http://www.telerik.com"                // Link URL if navigation is needed, optional.
            },
            {
                text: "<b>Item 2</b>",
                encoded: false,                                 // Allows use of HTML for item text
                content: "text"                                 // content within an item
            },
            {
                text: "Item 3",
                imageUrl: "http://www.telerik.com/test.jpg", // Item image URL, optional.
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
                    url: "https://demos.telerik.com/kendo-ui/service/Employees",
                    dataType: "jsonp"
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
                    url: "https://demos.telerik.com/kendo-ui/service/Employees",
                    dataType: "jsonp"
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
            console.log("dataBound");
        });
    </script>

### open

Fires before a sub menu or the ContextMenu gets opened. You can cancel this event to prevent opening the sub menu.

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
         // bind to the open event
         contextMenu.bind("open", function(e) {
             // handle event
         });
    </script>

### activate

Fires when a sub menu or the ContextMenu gets opened and its animation finished.

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
            activate: function(e) {
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
         // bind to the activate event
         contextMenu.bind("activate", function(e) {
             // handle event
         });
    </script>

### deactivate

Fires when a sub menu or the ContextMenu gets closed and its animation finished.

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
            deactivate: function(e) {
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
         // bind to the deactivate event
         contextMenu.bind("deactivate", function(e) {
             // handle event
         });
    </script>

### select

Fires when a menu item gets selected.

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
