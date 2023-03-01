---
title: ChipList
description: Configuration, methods and events of the Kendo UI ChipList
res_type: api
component: chiplist
---

# kendo.ui.ChipList

Represents the Kendo UI ChipList widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### fillMode `String` *(default: 'solid')*

Specifies the background and border styles of the Chip items. Valid fillMode options are:

* `solid` *(default)*
* `outline`
* `none`

#### Example

    <div id="chiplist"></div>
    <script>
        $('#chiplist').kendoChipList({
            fillMode: "outline",
            items: [
                { label: 'One' },
                { label: 'Two' },
                { label: 'Three' },
            ]
        });
    </script>


### rounded  `String` *(default: 'medium')*

Specifies the size of the chip. Valid options are `small`, `medium`, `large`, `full` and `none`.

#### Example

    <div id="chiplist"></div>
    <script>
        $('#chiplist').kendoChipList({
            rounded: "full",
            items: [
                { label: 'One' },
                { label: 'Two' },
                { label: 'Three' },
            ]
        });
    </script>

### size  `String` *(default: 'medium')*

Specifies the gap between the Chips in the ChipList. Valid options are `small`, `medium`, `large` and `none`.

#### Example

    <div id="chiplist"></div>
    <script>
        $('#chiplist').kendoChipList({
            size: "large",
            itemSize: "none",
            items: [
                { label: 'One' },
                { label: 'Two' },
                { label: 'Three' },
            ]
        });
    </script>


### itemSize  `String` *(default: 'medium')*

Specifies the size of the chip. Valid options are `small`, `medium`, `large` and `none`.

#### Example

    <div id="chiplist"></div>
    <script>
        $('#chiplist').kendoChipList({
            size: "large",
            itemSize: "small",
            items: [
                { label: 'One' },
                { label: 'Two' },
                { label: 'Three' },
            ]
        });
    </script>

### selectable `String` *(default: 'none')*

Sets the selection mode of the ChipList.

The available values are:

* `none` *(default)*
* `single`
* `multiple`

#### Example

    <div id="chiplist"></div>
    <script>
        $('#chiplist').kendoChipList({
            selectable: 'multiple',
            items: [
                { label: 'One' },
                { label: 'Two' },
                { label: 'Three' }
            ]
        });
    </script>

### removable `Boolean` *(default: false)*

Specifies if the Chip items will be removable or not. If the property is set to true, the Chip renders a remove icon.

> **Important:** Clicking the remove icon will remove the Chip from the ChipList.

#### Example

    <div id="chiplist"></div>
    <script>
        $('#chiplist').kendoChipList({
            removable: true,
            items: [
                { icon: 'plus', label: 'Add' },
                { icon: 'pencil', label: 'Edit' },
                { icon: 'trash', label: 'Remove' },
            ]
        });
    </script>

### items `Array`

The configurations of the different chips inside the chiplist.

#### Example

    <div id="chiplist"></div>
    <script>
        $('#chiplist').kendoChipList({
            items: [
                { icon: 'plus', label: 'Add' },
                { icon: 'pencil', label: 'Edit' },
                { icon: 'trash', label: 'Remove' },
            ]
        });
    </script>

### items.icon `String` *(default: '')*

Defines the name for an existing icon in a Kendo UI theme or SVG content. The icon is rendered inside the chip by a `span.k-icon` or `span.k-svg-icon` element.

See [web font icons help article](/kendo-ui/styles-and-layout/icons-web) for more details on Kendo UI icons.

#### Example

    <div id="chiplist"></div>
    <script>
        $('#chiplist').kendoChipList({
            items: [
                { icon: 'plus', label: 'Add' },
                { icon: 'pencil', label: 'Edit' },
                { icon: 'trash', label: 'Remove' },
            ]
        });
    </script>

### items.iconClass `String` *(default: '')*

If set, value will be appended to the icon's element class attribute.

#### Example

    <div id="chiplist"></div>
    <script>
        $('#chiplist').kendoChipList({
            items: [
                { iconClass: 'k-icon k-i-plus', label: 'Add' },
                { iconClass: 'k-icon k-i-pencil', label: 'Edit' },
                { iconClass: 'k-icon k-i-trash', label: 'Remove' },
            ]
        });
    </script>


### items.avatarClass `String` *(default: '')*

If set, value will be appended to the icon's element class attribute. It also appends "k-chip avatar" and "k-avatar" classes to the icon's element.

#### Example

    <style>
        .dan {
            background-image: url("https://demos.telerik.com/kendo-ui/content/web/Customers/SPLIR.jpg");
        }

        .thomas {
            background-image: url("https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg");
        }

        .maria {
            background-image: url("https://demos.telerik.com/kendo-ui/content/web/Customers/BERGS.jpg");
        }
    </style>
    <div id="chiplist"></div>
    <script>
        $('#chiplist').kendoChipList({
            items: [
                { avatarClass: 'maria', label: 'Maria' },
                { avatarClass: 'thomas', label: 'Thomas' },
                { avatarClass: 'dan', label: 'Dan' },
            ]
        });
    </script>

### items.label `String` *(default: '')*

The label text of the chip. Default is empty string.

#### Example

    <div id="chiplist"></div>
    <script>
        $('#chiplist').kendoChipList({
            items: [
                { icon: 'plus', label: 'Add' },
                { icon: 'pencil', label: 'Edit' },
                { icon: 'trash', label: 'Remove' },
            ]
        });
    </script>


### items.themeColor `String` *(default: 'base')*

Specifies the theme color of the Chip item. Valid options are:

* `base`: apply coloring based on surface theme color.
* `info`: apply coloring based on **info** theme color.
* `success`: apply coloring based on **success** theme color.
* `warning`:apply coloring based on **warning** theme color.
* `error`: apply coloring based on **error** theme color.

#### Example

    <div id="chiplist"></div>
    <script>
        $('#chiplist').kendoChipList({
            items: [
                { label:"Base", themeColor: 'base' },
                { label:"Info", themeColor: 'info' },
                { label:"Success", themeColor: 'success' },
                { label:"Warning", themeColor: 'warning' },
                { label:"Error", themeColor: 'error' },
            ]
        });
    </script>

### items.selected `Boolean` *(default: false)*

Toggles the selected state of the Chip.

#### Example

    <div id="chiplist"></div>
    <script>
        $('#chiplist').kendoChipList({
            selectable: "single",
            items: [
                { label: "Default selection" },
                { label: "Pre-selected", selected: true },
            ]
        });
    </script>


### items.enabled `Boolean` *(default: true)*

Toggles the enabled state of the Chip item.

#### Example

    <div id="chiplist"></div>
    <script>
        $('#chiplist').kendoChipList({
            items: [
                { label: "Enabled" },
                { label: "Disabled", enabled: false },
            ]
        });
    </script>

### items.attributes `Object`

Defines custom attributes of the Chip's element.

#### Example

    <div id="chiplist"></div>
    <script>
        $('#chiplist').kendoChipList({
            items: [
                { text: "Home", icon: "home", attributes: { "data-val" : "custom data attribute" } },
                { text: "Info", icon: "info-circle" },
                { text: "Contact", icon: "envelop" }
            ]
        });
    </script>

## Methods

### add

Adds a new  item. If an optional `beforeElement` is provided as second parameter, the new item is added before it.

#### Parameters

##### item `Object` *(required)*

The item definition that will be added.

##### beforeElement `HTMLElement|jQuery` *(optional)*

Add item before an already existing item.

#### Example

    <div id="chiplist"></div>

    <script>
        var chiplist = $("#chiplist").kendoChipList({
            items: [
                { label: "Home", icon: "home" }
            ]
        }).data("kendoChipList");

        chiplist.add({ label: "Contact", icon: "envelop", attributes: { id: "email" } });
        chiplist.add({ label: "Info", icon: "info-circle" }, $("#email"));
    </script>


### enable

Toggles item's enabled state.

#### Parameters

##### element `HTMLElement|jQuery` *(required)*

Specifies an existing item element in the ChipList.

##### state `Boolean` *(optional)*

Specifies the state of the element.

#### Example

    <div id="chiplist"></div>

    <script>
        var chiplist = $("#chiplist").kendoChipList({
            items: [
                { label: "Home", icon: "home", enabled: false, attributes: { id: "home" } },
                { label: "Info", icon: "info-circle" },
                { label: "Contact", icon: "envelop" }
            ]
        }).data("kendoChipList");

        chiplist.enable($("#home"), true);
    </script>


### item

Get item's element by index.

#### Parameters

##### index `Number|String` *(required)*

The zero-based index of the item.

#### Returns

`jQuery` the found item at the specified index.

#### Example

    <div id="chiplist"></div>

    <script>
        var chiplist = $("#chiplist").kendoChipList({
            items: [
                { label: "Home", icon: "home", enabled: false },
                { label: "Info", icon: "info-circle" },
                { label: "Contact", icon: "envelop" }
            ]
        }).data("kendoChipList");

        var home = chiplist.item(0);
        chiplist.enable(home, true);
    </script>

### itemById

Get item's element by id (can be set via `items.attributes`).

#### Parameters

##### id `String` *(required)*

The id of the item.

#### Returns

`jQuery` the found item with the specified id.

#### Example

    <div id="chiplist"></div>

    <script>
        var chiplist = $("#chiplist").kendoChipList({
            items: [
                { label: "Home", icon: "home", enabled: false, attr: { id: "home" } },
                { label: "Info", icon: "info-circle" },
                { label: "Contact", icon: "envelop" }
            ]
        }).data("kendoChipList");

        var home = chiplist.itemById("home");
        chiplist.enable(home, true);
    </script>

### items

Gets items' elements in a jQuery array.

#### Returns

`jQuery` the items collection as jQuery array.

#### Example

    <div id="chiplist"></div>

    <script>
        var chiplist = $("#chiplist").kendoChipList({
            items: [
                { label: "Home", icon: "home" },
                { label: "Info", icon: "info-circle" },
                { label: "Contact", icon: "envelop" }
            ]
        }).data("kendoChipList");

        chiplist.items().find(".info-chip").hide();
    </script>

### remove

Removes an item.

#### Parameters

##### element `HTMLElement|jQuery` *(required)*

The element to be removed.

#### Example

    <div id="chiplist"></div>

    <script>
        var chiplist = $("#chiplist").kendoChipList({
            items: [
                { label: "Home", icon: "home" },
                { label: "Info", icon: "info-circle" },
                { label: "Contact", icon: "envelop" }
            ]
        }).data("kendoChipList");

        var lastItem = chiplist.item(2);
        chiplist.remove(lastItem);
    </script>

### select

Gets selected items if no parameters are passed. Or selects/deselects specific item.

#### Parameters

##### element `HTMLElement|jQuery` *(required)*

The element to be selected/deselected.

##### state `Boolean` *(optional)*

Forces the selected state to the specified one.

#### Returns

`jQuery` if no element is specified returns the currently selected one.

#### Example

    <div id="chiplist"></div>

    <script>
        var chiplist = $("#chiplist").kendoChipList({
            selectable: "single",
            items: [
                { label: "Home", icon: "home" },
                { label: "Info", icon: "info-circle" },
                { label: "Contact", icon: "envelop" }
            ]
        }).data("kendoChipList");

        chiplist.select(chiplist.item(1));
        alert(chiplist.select().eq(0).text());
    </script>


## Events

### select

Fires when the user changes a Chip selection in the ChipList.

#### Event Data

##### e.originalEvent `Object`

The original DOM event.

##### e.sender `kendo.ui.ChipList`

The **ChipList** instance that triggered the event.

##### e.item `kendo.ui.Chip`

The Chip item selected.

##### e.preventDefault `Function`

If invoked prevents the Chip item selection.

#### Example

    <div id="chiplist"></div>

    <script>
        $("#chiplist").kendoChipList({
            selectable: "multiple",
            items: [
                { text: "Home", icon: "home" },
                { text: "Info", icon: "info-circle" },
                { text: "Contact", icon: "envelop" }
            ],
            select: function (ev) {
                var item = ev.item;

                alert(item.element.text());
            }
        })
    </script>


### remove

Fires when the user clicks the remove icon of the Chip.

#### Event Data

##### e.originalEvent `Object`

The original DOM event.

##### e.sender `kendo.ui.ChipList`

The **ChipList** instance that triggered the event.

##### e.preventDefault `Function`

If invoked prevents the ChipList from removing the Chip item.

#### Example

    <div id="chiplist"></div>

    <script>
        $("#chiplist").kendoChipList({
            removable: true,
            items: [
                { text: "Home", icon: "home" },
                { text: "Info", icon: "info-circle" },
                { text: "Contact", icon: "envelop" }
            ],
            remove: function (ev) {
                var item = ev.item;

                alert(item.element.text());
            }
        })
    </script>

