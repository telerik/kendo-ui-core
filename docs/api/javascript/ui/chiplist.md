---
title: ChipList
description: Configuration, methods and events of the Kendo UI ChipList
res_type: api
component: chiplist
---

# kendo.ui.ChipList

Represents the Kendo UI ChipList widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### fillMode `String` *(default: undefined)*

Specifies the background and border styles of the Chip items. When `undefined` (the default), the theme controls the default fill mode. Valid fillMode options are:

* `solid`
* `outline`

> The `"none"` value is deprecated. Use custom CSS instead.


<div class="meta-api-description">
How can I customize the appearance of chip elements in a Kendo UI ChipList? Set or customize the visual style, background fill, border visibility, and interaction look of chip elements in a list by choosing between solid filled backgrounds, outlined borders without fill, or transparent backgrounds with no fill or border, enabling control over chip appearance, highlight style, UI consistency, and user focus for tagging, selection, or input components.
</div>

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


### rounded  `String` *(default: undefined)*

Specifies the size of the chip. When `undefined` (the default), the theme controls the default border radius. Valid options are `small`, `medium`, `large`, `full`.

> The `"none"` value is deprecated. Use custom CSS instead.


<div class="meta-api-description">
How do I customize the corner radius of Kendo UI ChipList items? Adjust the corner radius and shape style of list items to create varied chip designs such as compact, standard, large, pill-shaped, or square elements, enabling customization of chip roundness, edge smoothness, and touch target size; configure chip border curvature with options like small, medium, large, full circle, or no rounding to control visual appearance and usability for different interface needs.
</div>

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

### size  `String` *(default: undefined)*

Specifies the gap between the Chips in the ChipList. When `undefined` (the default), the theme controls the default size. Valid options are `small`, `medium`, `large`.

> The `"none"` value is deprecated. Use custom CSS instead.


<div class="meta-api-description">
How do I adjust the spacing between chips in a Kendo UI ChipList? Adjust spacing and gap between multiple chips by setting the distance or padding that controls how close or far apart chip elements appear in a chip container, enabling customization of layout density and visual separation. Fine-tune spacing with options to remove all gaps or increase space incrementally, allowing developers to configure compact, medium, or wide layouts for chip collections, ensuring flexible alignment and readability for tags, labels, or selectable items in a horizontal or vertical list through adjustable gap sizes. Control chip layout spacing dynamically by setting small, medium, large, or no spacing to tailor the user interface density and optimize visual grouping or separation of chip components in a list or group format.
</div>

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


### itemSize  `String` *(default: undefined)*

Specifies the size of the chip. When `undefined` (the default), the theme controls the default size. Valid options are `small`, `medium`, `large`.

> The `"none"` value is deprecated. Use custom CSS instead.


<div class="meta-api-description">
How to adjust chip size in Kendo UI for jQuery ChipList? Adjust and customize the size, dimensions, and scale of individual chips or tags within a list or collection to control visual density, spacing, layout, and appearance; configure options to set small, medium, large, or no specific sizing for compactness or expanded views, enabling flexible design choices for chip components, badges, or UI elements representing selectable items, tags, or categories in various interface scenarios.
</div>

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


<div class="meta-api-description">
How do I configure a Kendo UI ChipList to allow multiple item selection at once? Configure and control item selection behavior within a chip list, enabling modes such as disabling selection entirely, allowing single item selection, or permitting multiple items to be selected simultaneously. Adjust how users interact with chips by setting selection modes to none for no selection capability, single for exclusive selection of one chip at a time, or multiple to support selection of several chips concurrently. This setting governs initialization and user-driven selection patterns, supporting scenarios like toggling chips, enabling multi-choice input, or restricting to one active chip, facilitating flexible selection control in chip-based UI components.
</div>

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


<div class="meta-api-description">
How do I enable removal of individual chip items in a Kendo UI ChipList? Configure the ability to delete or remove individual chip items from a list by enabling or disabling the removable feature that controls whether chips display a clickable remove icon for deletion; this includes options to set, toggle, or handle chip removal actions, manage UI affordances for deleting chips, control dynamic removal of items in chip collections, and customize user interactions for removing tags, tokens, or labels within chip-based components.
</div>

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


<div class="meta-api-description">
How do I customize the collection of chip elements in a Kendo UI ChipList? Define, customize, and control the collection of chip elements rendered in a list or tag input, including setting initial chip values, labels, appearance styles, selection states, disabled or active flags, and dynamic content configurations. Enable management of arrays or lists of chip data objects to specify what chips display, how they behave on load, and how each chip's text, icons, removal options, and interactive states are set or updated at initialization and runtime. Support configuring multiple chips with distinct properties like text content, visual style, activation state, and interactivity to handle tagging, filtering, or selection scenarios within user interfaces.
</div>

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

See [web font icons help article](/styles-and-layout/icons-web) for more details on Kendo UI icons.


<div class="meta-api-description">
How do I customize icons for individual chips in a ChipList? Set or customize an icon for individual chips within a list by specifying a theme-based font icon name or embedding custom SVG graphics, enabling developers to display visual symbols inside each chip element using standardized icon classes or scalable vector format, supporting scenarios like configuring badges, status indicators, or category markers within user interface components through font or SVG iconography for enhanced visual representation and consistent styling.
</div>

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


<div class="meta-api-description">
How can I customize the icon styles for individual items in a Kendo UI ChipList? Add or customize icon styles by specifying one or multiple CSS classes or icon fonts for individual item icons within a list, enabling tailored visuals, integration with icon libraries like FontAwesome, controlling icon appearance, applying custom styling rules, injecting additional class names, or enhancing icons with specific CSS selectors to match design requirements or theme overrides.
</div>

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


<div class="meta-api-description">
How do I customize the appearance of avatar icons in a Kendo UI ChipList? Set or modify CSS class names for avatar icons within chip list items to control styling, appearance, and layout of avatar elements in each chip; configure or assign custom avatar classes, append additional style classes to chip icons, target chip avatars for custom themes, override default avatar styles, and enable personalized visual customization of item icons by specifying class names during chip list initialization or dynamic updates.
</div>

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


<div class="meta-api-description">
How do I customize the label on individual chip elements in a Kendo UI ChipList? Control and define the visible text, caption, tag, or badge shown on individual chip elements within a list, enabling configuration, binding, updating, or customizing the label for each chip item. This covers setting display text, adjusting label content dynamically, specifying chip captions, and managing tags or badges associated with chip components during initialization or runtime, supporting various text labeling and naming use cases in chip list interfaces.
</div>

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


<div class="meta-api-description">
How can I set different colors for each item in a Kendo UI ChipList component? Customize or assign semantic colors such as base, info, success, warning, or error to individual items within a chip list, enabling control over the visual theme, accent colors, status indicators, and contextual highlighting for chips during setup or dynamic changes, allowing developers to specify color schemes, status-based visuals, or thematic differentiation on a per-chip basis for UI consistency, alert states, success messages, warnings, informational cues, or default surface color application in chip components.
</div>

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


<div class="meta-api-description">
How do I programmatically toggle chip selection in a Kendo UI ChipList? Control or configure the selection state of individual chip elements within a chip list, enabling toggling, setting, or updating which chips are selected or deselected programmatically or interactively. Enable or bind selected items by specifying them during initialization or dynamically change selection states for single or multiple chips in a user interface that manages tags, filters, or choices. Adjust selection binding, toggle chip selection on or off, manage the active state of chip components, and synchronize or update selected chips based on user interaction, code-driven updates, or configuration settings.
</div>

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


<div class="meta-api-description">
How can I make individual items in a Kendo UI ChipList interactive or non-interactive? Set or configure the interactivity state of individual items within a list of chip elements, controlling whether each chip is active, clickable, selectable, or disabled and non-interactive; toggle, enable, or disable specific chip entries to manage user input options, control selection availability, or dynamically adjust item states during initialization or runtime, including use cases for making certain chips responsive or grayed out and unavailable for interaction.
</div>

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


<div class="meta-api-description">
How do I set custom HTML attributes on individual chip elements in a Kendo UI ChipList? Configure custom HTML attributes such as id, class, data attributes, ARIA roles, and other key-value pairs on individual chip elements within a chip list, enabling developers to set, customize, or control markup properties on each chip dynamically, for purposes like accessibility enhancements, styling hooks, DOM identification, event targeting, or embedding metadata on chips in user interface components.
</div>

#### Example

    <div id="chiplist"></div>
    <script>
        $('#chiplist').kendoChipList({
            items: [
                { text: "Home", icon: "home", attributes: { "data-val" : "custom data attribute" } },
                { text: "Info", icon: "info-circle" },
                { text: "Contact", icon: "envelope" }
            ]
        });
    </script>

## Methods

### add

Adds a new  item. If an optional `beforeElement` is provided as second parameter, the new item is added before it.


<div class="meta-api-description">
How to dynamically add items to a Kendo UI ChipList in jQuery? Add or insert items dynamically into a list of chips by appending new elements or placing them before specified existing items, enabling flexible modification of chip collections after initialization. This functionality supports controlling chip order, updating the chip list programmatically, inserting elements at particular positions, managing tag-like UI components, configuring chip sequences, and enabling interactive additions or rearrangements within the chip group. Use cases include adding tags, labels, tokens, or selectable items to a chip container, inserting new entries before selected elements, and modifying the chip display in response to user actions or code logic.
</div>

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

        chiplist.add({ label: "Contact", icon: "envelope", attributes: { id: "email" } });
        chiplist.add({ label: "Info", icon: "info-circle" }, $("#email"));
    </script>


### enable

Toggles item's enabled state.


<div class="meta-api-description">
How to dynamically enable/disable individual chips in a Kendo UI ChipList? Toggle individual chip item activation state dynamically to control whether each chip accepts user input, interaction, selection, keyboard focus, and navigation. Programmatically enable or disable specific chips within a list to manage click responsiveness and input processing at runtime without resetting or reconstructing the entire chip collection. Control per-chip usability, activation, interactivity, and event handling behavior on demand for flexible UI component management and user interaction control.
</div>

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
                { label: "Contact", icon: "envelope" }
            ]
        }).data("kendoChipList");

        chiplist.enable($("#home"), true);
    </script>


### item

Get item's element by index.


<div class="meta-api-description">
How can I access the DOM element of a specific chip in Kendo UI for jQuery ChipList? Access or retrieve the DOM element of a chip at a specific position in a list to enable direct manipulation such as attaching event listeners, modifying classes, focusing, querying attributes, or implementing custom behaviors like removal and styling; control and interact with individual chip components dynamically by index to support customized event binding, DOM querying, element targeting, and UI updates within chip collections or tag lists.
</div>

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
                { label: "Contact", icon: "envelope" }
            ]
        }).data("kendoChipList");

        var home = chiplist.item(0);
        chiplist.enable(home, true);
    </script>

### itemById

Get item's element by id (can be set via `items.attributes`).


<div class="meta-api-description">
How to get a specific chip element by its id in Kendo UI ChipList? Find or get the specific element, node, or object for a chip or tag by its unique identifier or id within a list or collection, enabling actions like selecting, accessing, updating attributes, adding event listeners, modifying content, changing classes, or measuring size and position. Search for, retrieve, or target chip elements in the DOM or jQuery objects by id to manipulate visual appearance, handle events, or update data dynamically. Use methods or functions that return the exact element corresponding to a chip's id for tasks such as styling, interaction handling, content changes, or querying layout information within an interactive tag list component or UI element collection.
</div>

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
                { label: "Contact", icon: "envelope" }
            ]
        }).data("kendoChipList");

        var home = chiplist.itemById("home");
        chiplist.enable(home, true);
    </script>

### items

Gets items' elements in a jQuery array.


<div class="meta-api-description">
How do I access individual chip elements in Kendo UI ChipList? Retrieve, access, or manipulate rendered chip elements, chip nodes, or individual chip components within a list by obtaining their DOM references or elements for looping, iteration, event handling, attaching event listeners, custom styling, dynamic updates, or querying. Get the chips as a collection or array-like object supporting jQuery operations, enabling developers to index, traverse, bind events, apply CSS, or integrate with other frameworks and APIs for interactive chip management, modification, and control in UI components.
</div>

#### Returns

`jQuery` the items collection as jQuery array.

#### Example

    <div id="chiplist"></div>

    <script>
        var chiplist = $("#chiplist").kendoChipList({
            items: [
                { label: "Home", icon: "home" },
                { label: "Info", icon: "info-circle" },
                { label: "Contact", icon: "envelope" }
            ]
        }).data("kendoChipList");

        chiplist.items().find(".info-chip").hide();
    </script>

### remove

Removes an item.


<div class="meta-api-description">
How do I programmatically remove an item from a Kendo UI ChipList? Programmatically delete or remove an item from a collection of chips, controlling which chips are displayed by dynamically updating the list after initialization to reflect changes in the user interface; enable removal of selected chips through code to manage chip collections based on user actions, application logic, or automated workflows, supporting manipulation of chip elements, deleting specific entries, and synchronizing the UI to match current data state.
</div>

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
                { label: "Contact", icon: "envelope" }
            ]
        }).data("kendoChipList");

        var lastItem = chiplist.item(2);
        chiplist.remove(lastItem);
    </script>

### select

Gets selected items if no parameters are passed. Or selects/deselects specific item.


<div class="meta-api-description">
How do I programmatically select multiple items in a Kendo UI ChipList? Retrieve the current selection, programmatically select, deselect, toggle, or modify individual items in a list of chips or tags, control which chips are active or highlighted, fetch selected elements from a chip-based UI, update selection state dynamically, manage multi-select or single-select chips, handle chip selection programmatically, obtain selected tags or labels, and adjust user selection in a chip group component through method calls that get or set selected chip items.
</div>

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
                { label: "Contact", icon: "envelope" }
            ]
        }).data("kendoChipList");

        chiplist.select(chiplist.item(1));

        // Check the browser console to see the result
        console.log(chiplist.select().eq(0).text());
    </script>


## Events

### select

Fires when the user changes a Chip selection in the ChipList.


<div class="meta-api-description">
How to handle selection changes in Kendo UI ChipList widget? Capture user interactions when a chip or item in a list is chosen, track selection changes, monitor which option is active or highlighted, handle updates to selected values, synchronize UI state with data models, listen for selection events to trigger callbacks or custom logic, enable reactive behavior upon user selection, detect changes in chosen elements for dynamic content updates, respond to selection toggles or swaps, and implement event handling for user-driven selection modifications across chip or list components.
</div>

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
                { text: "Contact", icon: "envelope" }
            ],
            select: function (ev) {
                var item = ev.item;

                alert(item.element.text());
            }
        })
    </script>


### remove

Fires when the user clicks the remove icon of the Chip.


<div class="meta-api-description">
How can I handle chip removal in Kendo UI for jQuery? Detect when a user deletes or removes a chip by clicking its remove icon, enabling you to capture removal actions, handle item deletion events, update data collections, synchronize changes with back-end servers, manage UI cleanup, and respond to user interactions involving chip dismissal or close actions, with event details providing context about the specific chip removed and the original user click or interaction event.
</div>

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
                { text: "Contact", icon: "envelope" }
            ],
            remove: function (ev) {
                var item = ev.item;

                alert(item.element.text());
            }
        })
    </script>

