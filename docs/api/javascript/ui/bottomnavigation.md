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

#### Example

    <nav id="bottomnav"></nav>

    <script>
        $("#bottomnav").kendoBottomNavigation({
            border: false,
            items: [
                { text: "Home", icon: "home" },
                { text: "Info", icon: "info" },
                { text: "Contact", icon: "email" }
            ]
        });
    </script>

### shadow `Boolean` *(default: false)*

Toggles the shadow of the widget.

#### Example

    <nav id="bottomnav"></nav>

    <script>
        $("#bottomnav").kendoBottomNavigation({
            shadow: true,
            items: [
                { text: "Home", icon: "home" },
                { text: "Info", icon: "info" },
                { text: "Contact", icon: "email" }
            ]
        });
    </script>

### fill `String`  *(default: "flat")*

Specifies how fill is applied to the BottomNavigation. Valid options are `flat` (default) and `solid`.

#### Example

    <nav id="bottomnav"></nav>

    <script>
        $("#bottomnav").kendoBottomNavigation({
            fill: "solid",
            items: [
                { text: "Home", icon: "home" },
                { text: "Info", icon: "info" },
                { text: "Contact", icon: "email" }
            ]
        });
    </script>

### itemFlow `String` *(default: "vertical")*

Sets the position of the text label. Valid options are `vertical` and `horizontal`.  

#### Example

    <nav id="bottomnav"></nav>

    <script>
        $("#bottomnav").kendoBottomNavigation({
            itemFlow: "horizontal",
            items: [
                { text: "Home", icon: "home" },
                { text: "Info", icon: "info" },
                { text: "Contact", icon: "email" }
            ]
        });
    </script>

### themeColor `String`  *(default: "primary")*

Specifies the theme color of the component. Valid options are:

* `inherit`: no coloring will be applied to the badge. Useful when the badge needs to blend-in with the surrounding elements.
* `default`: apply coloring based on surface theme color.
* `primary`:  apply coloring based on **primary** theme color.
* `secondary`: apply coloring based on **secondary** theme color.
* `tertiary`: apply coloring based on **tertiary** theme color.
* `info`: apply coloring based on **info** theme color.
* `success`: apply coloring based on **success** theme color.
* `warning`:apply coloring based on **warning** theme color.
* `error`: apply coloring based on **error** theme color.
* `dark`: apply coloring based on **dark** theme color.
* `light`: always coloring based on **light** theme color.
* `inverse`: depending on the luminance of the theme, light or dark, inverted will be dark or light.

#### Example

    <nav id="bottomnav"></nav>

    <script>
        $("#bottomnav").kendoBottomNavigation({
            themeColor: "dark",
            items: [
                { text: "Home", icon: "home" },
                { text: "Info", icon: "info" },
                { text: "Contact", icon: "email" }
            ]
        });
    </script>

### items `Array` 

Specifies the items of the BottomNavigation component.

#### Example

    <nav id="bottomnav"></nav>

    <script>
        $("#bottomnav").kendoBottomNavigation({
            items: [
                { text: "Home", icon: "home" },
                { text: "Info", icon: "info" },
                { text: "Contact", icon: "email" }
            ]
        });
    </script>

### items.url `String` 

The URL (href) to which the item will navigate to.

#### Example

    <nav id="bottomnav"></nav>

    <script>
        $("#bottomnav").kendoBottomNavigation({
            items: [
                { text: "Home", icon: "home", url: "http://www.telerik.com" },
                { text: "Info", icon: "info" },
                { text: "Contact", icon: "email" }
            ]
        });
    </script>

### items.data `Object` 

Contextual data to be used for events within the component.

#### Example

    <nav id="bottomnav"></nav>

    <script>
        $("#bottomnav").kendoBottomNavigation({
            items: [
                { text: "Home", icon: "home", data: { view: "home" } },
                { text: "Info", icon: "info", data: { view: "info" } },
                { text: "Contact", icon: "email", data: { view: "info" } }
            ],
            select: function (ev) {
                alert(ev.data.view);
            }
        });
    </script>

### items.icon `String` 

Defines the name for an existing icon in a Kendo UI theme.

See [web font icons help article](/kendo-ui/styles-and-layout/icons-web) for more details on Kendo UI icons.

#### Example

    <nav id="bottomnav"></nav>

    <script>
        $("#bottomnav").kendoBottomNavigation({
            items: [
                { text: "Home", icon: "home" },
                { text: "Info", icon: "info" },
                { text: "Contact", icon: "email" }
            ]
        });
    </script>

### items.text `String` 

The text of the item. It is optional - if not set, no text will be rendered.

#### Example

    <nav id="bottomnav"></nav>

    <script>
        $("#bottomnav").kendoBottomNavigation({
            items: [
                { icon: "home" },
                { icon: "info" },
                { icon: "email" }
            ]
        });
    </script>

### items.encoded `Boolean` *(default: true)*

If false, the text will be able to render HTML.

#### Example

    <nav id="bottomnav"></nav>

    <script>
        $("#bottomnav").kendoBottomNavigation({
            items: [
                { text: "<strong>Home</strong>", icon: "home", encoded: false },
                { text: "<strong>Info</strong>", icon: "info", encoded: true },
                { text: "Contact", icon: "email" }
            ]
        });
    </script>

### items.iconClass `String` 

Defines the class name added to the icon element.

#### Example

    <nav id="bottomnav"></nav>

    <script>
        $("#bottomnav").kendoBottomNavigation({
            items: [
                { text: "Home", icon: "home", iconClass: "my-icon-class" },
                { text: "Info", icon: "info" },
                { text: "Contact", icon: "email" }
            ]
        });
    </script>

### items.cssClass `String` 

Defines the class names of the item's element.

#### Example

    <nav id="bottomnav"></nav>

    <script>
        $("#bottomnav").kendoBottomNavigation({
            items: [
                { text: "Home", icon: "home", cssClass: "my-css-class" },
                { text: "Info", icon: "info" },
                { text: "Contact", icon: "email" }
            ]
        });
    </script>

### items.attributes `Object` 

Defines custom attributes of the item's element.

#### Example

    <nav id="bottomnav"></nav>

    <script>
        $("#bottomnav").kendoBottomNavigation({
            items: [
                { text: "Home", icon: "home", attributes: { "data-val" : "custom data attribute" } },
                { text: "Info", icon: "info" },
                { text: "Contact", icon: "email" }
            ]
        });
    </script>

### items.enabled `Boolean` *(default: true)*

Toggles the enabled state of the item.

#### Example

    <nav id="bottomnav"></nav>

    <script>
        $("#bottomnav").kendoBottomNavigation({
            items: [
                { text: "Home", icon: "home", enabled: false },
                { text: "Info", icon: "info" },
                { text: "Contact", icon: "email" }
            ]
        });
    </script>

### items.selected `Boolean` *(default: false)*

Toggles the selected state of the item.

#### Example

    <nav id="bottomnav"></nav>

    <script>
        $("#bottomnav").kendoBottomNavigation({
            items: [
                { text: "Home", icon: "home", selected: true },
                { text: "Info", icon: "info" },
                { text: "Contact", icon: "email" }
            ]
        });
    </script>

### items.template `String|Function` 

Sets a custom template for the item (overrides the `template` option).

#### Example

    <nav id="bottomnav"></nav>

    <script>
        $("#bottomnav").kendoBottomNavigation({
            items: [
                { text: "Home", icon: "home", template: "<span>#:text#</span>" },
                { text: "Info", icon: "info" },
                { text: "Contact", icon: "email" }
            ]
        });
    </script>

### template `String | Function` 

Sets a custom template for the items.

#### Example

    <nav id="bottomnav"></nav>

    <script>
        $("#bottomnav").kendoBottomNavigation({
            items: [
                { text: "Home", icon: "home" },
                { text: "Info", icon: "info" },
                { text: "Contact", icon: "email" }
            ], 
            template: "<span>#:text#</span>"
        });
    </script>

### positionMode `String`  *(default: "fixed")*

Specifies CSS position of the BottomNavigation in the document. Valid options are: `absolute`, `fixed` and `sticky`.

#### Example

    <nav id="bottomnav"></nav>

    <script>
        $("#bottomnav").kendoBottomNavigation({
            positionMode: "absolute",
            items: [
                { text: "Home", icon: "home" },
                { text: "Info", icon: "info" },
                { text: "Contact", icon: "email" }
            ]
        });
    </script>

## Methods

### add

Adds a new item. If an optional beforeElement is provided as second parameter, the new item is added before it.

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

        bottomNav.add({ text: "Contact", icon: "email", attributes: { id: "email" } });
        bottomNav.add({ text: "Info", icon: "info" }, $("#email"));
    </script>


### enable

Toggles item's enabled state.

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
                { text: "Info", icon: "info" },
                { text: "Contact", icon: "email" }
            ]
        }).data("kendoBottomNavigation");

        bottomNav.enable($("#home"), true);
    </script>


### item

Get item's element by index.

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
                { text: "Info", icon: "info" },
                { text: "Contact", icon: "email" }
            ]
        }).data("kendoBottomNavigation");

        var home = bottomNav.item(0);
        bottomNav.enable(home, true);
    </script>

### itemById

Get item's element by id (can be set via `items.attributes`).

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
                { text: "Info", icon: "info" },
                { text: "Contact", icon: "email" }
            ]
        }).data("kendoBottomNavigation");

        var home = bottomNav.itemById("home");
        bottomNav.enable(home, true);
    </script>

### items 

Gets items' elements in a jQuery array.

#### Returns

`jQuery` the items collection as jQuery array.

#### Example

    <nav id="bottomnav"></nav>

    <script>
        var bottomNav = $("#bottomnav").kendoBottomNavigation({
            items: [
                { text: "Home", icon: "home" },
                { text: "Info", icon: "info" },
                { text: "Contact", icon: "email" }
            ]
        }).data("kendoBottomNavigation");

        bottomNav.items().find(".k-bottom-nav-item-text").hide();
    </script>

### remove

Removes an item.

#### Parameters

##### element `HTMLElement|jQuery` *(required)*

The element to be removed.

#### Example

    <nav id="bottomnav"></nav>

    <script>
        var bottomNav = $("#bottomnav").kendoBottomNavigation({
            items: [
                { text: "Home", icon: "home" },
                { text: "Info", icon: "info" },
                { text: "Contact", icon: "email" }
            ]
        }).data("kendoBottomNavigation");

        var lastItem = bottomNav.item(2);
        bottomNav.remove(lastItem);
    </script>

### select

Gets selected item if no parameters are passed. Or selects/deselects specific item.

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
                { text: "Info", icon: "info" },
                { text: "Contact", icon: "email" }
            ]
        }).data("kendoBottomNavigation");

        bottomNav.select(bottomNav.item(0));
        alert(bottomNav.select().text());
    </script>

### showText

Toggles the visibility of all items' text elements in the BottomNavigation.

#### Parameters

##### show `Boolean`

A bool value to toggle the visibility state of the text element.

#### Example

    <nav id="bottomnav"></nav>

    <script>
        var bottomNav = $("#bottomnav").kendoBottomNavigation({
            items: [
                { text: "Home", icon: "home" },
                { text: "Info", icon: "info" },
                { text: "Contact", icon: "email" }
            ]
        }).data("kendoBottomNavigation");

        bottomNav.showText(false);
    </script>

## Events

### select

Fires when the user selects an item in BottomNavigation.

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
                { text: "Info", icon: "info", data: { view: "info" } },
                { text: "Contact", icon: "email", data: { view: "email" } }
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
