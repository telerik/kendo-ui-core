---
title: ListBox
description: Configuration, methods and events of the Kendo UI ListBox
res_type: api
component: listbox
---

# kendo.ui.ListBox

Represents the Kendo UI ListBox widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### autoBind `Boolean` *(default: true)*

If set to `false`, the widget will not bind to the data source during initialization. In this case, the data binding will occur when the [`change`](/api/javascript/data/datasource/events/change) event of the data source is fired. By default, the ListBox will bind to the data source that is specified in the configuration.

> Setting `autoBind` to `false` is useful when multiple widgets are bound to the same data source. Disabling automatic binding ensures that the shared data source does not make more than one request to the remote service.


<div class="meta-api-description">
Control whether the list or selection component loads and binds its data automatically on initialization or waits to fetch data upon a specific trigger, enabling deferred data loading, avoiding duplicate remote requests, managing when data sources connect, synchronizing data binding across multiple components sharing the same data source, toggling automatic versus manual data fetch, configuring initialization behavior for data retrieval, optimizing performance by delaying initial data binding until change events or user actions, and setting how and when the data populates the list interface to prevent redundant requests and improve responsiveness.
</div>

#### Example - disable automatic binding

    <select id="listBox"></select>
    <script>
    var dataSource = new kendo.data.DataSource({
        data: [ { name: "Jane Doe" }, { name: "John Doe" }]
    });
    $("#listBox").kendoListBox({
         dataSource: dataSource,
         template: "<div>#:name#</div>",
         autoBind: false
     });
    dataSource.read(); // "read()" will fire the "change" event of the dataSource and the widget will be bound
    </script>

### connectWith `String` *(default: null)*

 The `id` of the target ListBox to which items from the source ListBox will be transferred and vice versa. If you have to transfer items from the target ListBox over its toolbar, then you also need to set its `connectWith` option.

> * It is not recommended to set the same `connectWith` option on two or more ListBoxes because the behavior of the `transferFrom` and `transferAllFrom` [tools](/api/javascript/ui/listbox/configuration/toolbar#toolbartools) is not deterministic.
> * Configuring a bi-directional relationship between two ListBoxes results in duplicated behavior of their `transferTo` and `transferFrom` options, and `transferAllTo` and `transferAllFrom` tools. If your project does not require such behavior, remove some of the relationships from the [tools](/api/javascript/ui/listbox/configuration/toolbar#toolbartools) option.


<div class="meta-api-description">
Enable linking or connecting one list selection component to another by specifying the target component’s identifier to facilitate transferring, moving, or syncing items back and forth between source and destination lists. Configure linked list boxes, swap or share items dynamically, set up bidirectional or unidirectional item movement, and manage interactions with transfer, move, or synchronize tools including toolbar-enabled item transfers. Control how items flow between connected lists, handle dual-way or single-way connections, avoid conflicting or duplicated transfer behaviors by carefully managing connection mappings, and coordinate multiple list components for seamless item sharing and dynamic list updates.
</div>

#### Example - set up a one-way connection from ListBoxA to ListBoxB

    <select id="listBoxA">
        <option>ItemA1</option>
        <option>ItemA2</option>
    </select>
    <select id="listBoxB">
        <option>ItemB1</option>
        <option>ItemB2</option>
    </select>

    <script>
        $("#listBoxA").kendoListBox({
            connectWith: "listBoxB",
            toolbar: {
                tools: [
                    "transferTo",
                    "transferFrom",
                    "transferAllTo",
                    "transferAllFrom"
                ]
            }
        });

        $("#listBoxB").kendoListBox();
    </script>

#### Example - set up a bidirectional connection between ListBox widgets

    <select id="listBoxA">
        <option>ItemA1</option>
        <option>ItemA2</option>
    </select>
    <select id="listBoxB">
        <option>ItemB1</option>
        <option>ItemB2</option>
    </select>

    <script>
        $("#listBoxA").kendoListBox({
            connectWith: "listBoxB",
            toolbar: {
                tools: [
                    "transferTo",
                    "transferFrom",
                    "transferAllTo",
                    "transferAllFrom"
                ]
            }
        });

        $("#listBoxB").kendoListBox({
            connectWith: "listBoxA",
            toolbar: {
                tools: [
                    "transferTo",
                    "transferFrom",
                    "transferAllTo",
                    "transferAllFrom"
                ]
            }
        });
    </script>

### dataSource `Object|Array|kendo.data.DataSource`

The data source of the widget which is used render ListBox items. Can be a JavaScript object which represents a valid data source configuration, a JavaScript array, or an existing [`kendo.data.DataSource`](/api/javascript/data/datasource) instance.

If the `dataSource` option is set to a JavaScript object or array, the widget initializes a new [`kendo.data.DataSource`](/api/javascript/data/datasource) instance by using that value as the data source configuration.

If the `dataSource` option is an existing [`kendo.data.DataSource`](/api/javascript/data/datasource) instance, the widget uses that instance and does _not_ initialize a new one.


<div class="meta-api-description">
Configure and connect the ListBox to various types of data inputs such as local arrays, remote data endpoints, predefined data source configurations, or an existing instance of a data management object to dynamically load, fetch, filter, sort, and render the list items. Enable flexible data binding for populating the ListBox with any JavaScript array, object representing data source settings, or a ready-made data source instance, allowing control over how data retrieval and updates occur without reinitializing when using existing data source objects. Support scenarios involving dynamic data updates, asynchronous loading, custom filtering, sorting configurations, reusing shared data sources across components, and integrating with remote or local datasets for item population and display.
</div>

#### Example - set dataSource as a JavaScript object

    <select id="listBox"></select>
    <script>
    $("#listBox").kendoListBox({
        dataSource: {
            data: [
                { name: "Jane Doe" },
                { name: "John Doe" }
            ]
        },
        template: "<div>#:name#</div>"
    });
    </script>

#### Example - set dataSource as a JavaScript array

    <select id="listBox"></select>
    <script>
    $("#listBox").kendoListBox({
         dataSource: [
             { name: "Jane Doe" },
             { name: "John Doe" }
        ],
        template: "<div>#:name#</div>"
    });
    </script>

#### Example - set dataSource as an existing kendo.data.DataSource instance

    <select id="listBox"></select>
    <script>
    var dataSource = new kendo.data.DataSource({
      data: [ { name: "Jane Doe" }, { name: "John Doe" }]
    });
    $("#listBox").kendoListBox({
        dataSource: dataSource,
        template: "<div>#:name#</div>"
    });
    </script>

### dataTextField `String` *(default: "")*

The field of the data item that provides the text content of the list items. Based on this field, the widget filters the data source.

> If you define the `dataTextField` option, you also have to set `dataValueField`.


<div class="meta-api-description">
Specify the field from your data source that provides the visible text labels for each item in a list component, enabling text display, search filtering, and matching of list entries based on that text property; this setting controls which data attribute appears as the item’s label and is essential for configuring both display text and enabling text-based filtering or searching within the list, often used alongside a separate value field to link visible text with underlying data identifiers.
</div>

#### Example - set the dataTextField

    <select id="listBox"></select>
    <script>
    $("#listBox").kendoListBox({
        dataSource: [
            { name: "Item 1", id: 1 },
            { name: "Item 2", id: 2 }
        ],
        dataTextField: "name",
        dataValueField: "id"
    });
    </script>

### dataValueField `String` *(default: "")*

The field of the data item that provides the value of the widget.

> If you define the `dataValueField` option, you also have to set `dataTextField`.


<div class="meta-api-description">
Configure the field or property that supplies the underlying value or identifier for each item when binding data to a list, dropdown, or selection control, specifying which data attribute represents the item's actual value as opposed to its display text. Developers often set the value field name, bind the key or id property, or define the data source field used for storing selection values separate from the displayed labels, text, or captions. This is essential for distinguishing the unique data value of each list element during data binding, selection, form submissions, or value retrieval in UI components that require both display text and underlying data keys to be configured simultaneously.
</div>

#### Example - set the dataValueField

    <select id="listBox"></select>
    <script>
    $("#listBox").kendoListBox({
        dataSource: [
            { name: "Item 1", id: 1 },
            { name: "Item 2", id: 2 }
        ],
        dataTextField: "name",
        dataValueField: "id"
    });
    </script>

### draggable `Boolean|Object` *(default: false)*

Indicates whether the ListBox items can be dragged and dropped.

> * The draggable option allows you to drag and drop items within a single or across multiple ListBoxes. If your project requires the multiple-widget scenario, set the `dropSources` option on the target widgets. If your project requires the single-widget scenario, the `dropSources` option is not necessary.
> * If you set the `draggable` option to `true`, you also have to set `selectable`.


<div class="meta-api-description">
Control whether list items can be reordered by dragging and dropping within one list or moved between multiple lists, enabling interactive item rearrangement and transfer across components. Configure drag-and-drop functionality to allow users to pick up, drag, drop, or move items by mouse or touch, supporting both single-list reordering and cross-list dragging when connected with appropriate drop targets. Enable draggable functionality alongside selection capabilities to manage item manipulation, set drag sources and drop targets for custom drag behaviors, and support use cases like sorting, reordering, transferring, or organizing items across multiple lists or within one list.
</div>

#### Example

    <select id="listBoxA">
        <option>ItemA1</option>
        <option>ItemA2</option>
        <option>ItemA3</option>
    </select>
    <select id="listBoxB">
        <option>ItemB1</option>
        <option>ItemB2</option>
        <option>ItemB3</option>
    </select>
    <script>
    $("#listBoxA").kendoListBox({
        draggable: true,
        selectable: "single",
        dropSources: ["listBoxB"]
    });
    $("#listBoxB").kendoListBox({
        draggable: true,
        selectable: "single",
        dropSources: ["listBoxA"]
    });
    </script>

### draggable.enabled `Boolean` *(default: true)*

Indicates whether dragging is enabled.


<div class="meta-api-description">
Control the activation of dragging functionality to let users drag and drop items inside or across lists, configure drag interactions, toggle item reorder through drag gestures, enable or disable moveable list elements, set drag-and-drop capabilities for list components, allow drag motions for rearranging or transferring entries, manage interactive drag events for list items, and specify whether list elements can be dragged for sorting, repositioning, or moving between multiple lists.
</div>

#### Example - ListBox with disabled dragging

    <select id="listBoxA">
        <option>ItemA1</option>
        <option>ItemA2</option>
    </select>
    <select id="listBoxB">
        <option>ItemB1</option>
        <option>ItemB2</option>
    </select>

    <script>
        $("#listBoxA").kendoListBox({
            draggable: true
        });

        $("#listBoxB").kendoListBox({
            dropSources: [ "listBoxA" ],
            draggable: {
                enabled: false,
                placeholder: function(element) {
                    return element.clone().css({
                        "opacity": 0.3,
                        "border": "1px dashed #000000"
                    });
                }
            }
        });
    </script>

### draggable.hint `Function|String|jQuery`

Provides an option to customize the draggable item hint. If a function is supplied, it receives a single argument - the jQuery object of the `draggable` element. If a hint is not provided, the ListBox clones the dragged item and uses it as a hint.

> To avoid styling issues, note that the `hint` element is appended to the `<body>` tag.


<div class="meta-api-description">
Configure or customize the drag preview or drag ghost displayed when moving items within a list or selection component, enabling the provision of a custom drag indicator element or a callback function to dynamically generate or modify the drag visual representation based on the currently dragged item, supporting enhanced drag-and-drop experiences with tailored styling or behavior. Adjust the appearance and content of the drag hint shown during dragging operations, including options to clone, replace, or programmatically build the hint element, ensuring compatibility with DOM placement by appending the drag preview to the document body for consistent styling and interaction across different environments, improving user feedback during drag actions in list or multi-select interfaces.
</div>

#### Example - ListBox with custom hint

    <select id="listBox"></select>
    <script>
    $("#listBox").kendoListBox({
        draggable: {
            hint: function(element) {
                return $("<span></span>")
                    .text(element.text())
                    .css("color", "#FF0000");
            }
        },
        dataSource: [
            { name: "Item 1", id: 1 },
            { name: "Item 2", id: 2 }
        ],
        dataTextField: "name",
        dataValueField: "id"
    });
    </script>

### draggable.placeholder `Function|String|jQuery`

Provides an option to customize the item placeholder of the ListBox. If a function is supplied, it receives a single argument - the jQuery object of the `draggable` element. If a placeholder is not provided, the ListBox clones the dragged item, removes its `id` attribute, sets its visibility to `hidden`, and uses it as a placeholder.

> The `placeholder` element is appended to the container of the ListBox.


<div class="meta-api-description">
Control and customize the placeholder element displayed during drag-and-drop operations in list interfaces, enabling setting a custom HTML element or generating one dynamically via a function that receives the dragged item, with options to modify appearance, visibility, cloning behavior, and container placement for improved user feedback while moving items within sortable or draggable lists.
</div>

#### Example - ListBox with custom placeholder

    <select id="listBox"></select>
    <script>
    $("#listBox").kendoListBox({
        draggable: {
            placeholder: function(element) {
                return element.clone().css({
                    "opacity": 0.3,
                    "border": "1px dashed #000000"
                });
            }
        },
        dataSource: [
            { name: "Item 1", id: 1 },
            { name: "Item 2", id: 2 }
        ],
        dataTextField: "name",
        dataValueField: "id"
    });
    </script>

### dropSources `Array`

Array of `id` strings which determines the ListBoxes that can drag and drop their items to the current ListBox. The `dropSources` option describes a one way relationship. If you want a two-way connection, then set the `dropSources` option on both widgets.

> You have to set the `draggable` option to all source ListBox widgets that are described in `dropSources`.


<div class="meta-api-description">
Control which ListBox instances can drag and drop items into the current ListBox by specifying source identifiers; configure drag-and-drop interactions between multiple list components, enable or restrict item transfers from designated draggable lists, set up one-way or two-way drag sources by listing allowed source IDs, manage cross-list item dragging permissions, define which lists act as drag origins for accepting dropped items, and coordinate inter-list drag behaviors by pairing source and target configurations.
</div>

#### Example - set up a one way connection from ListBoxA to ListBoxB

    <select id="listBoxA">
        <option>ItemA1</option>
        <option>ItemA2</option>
    </select>
    <select id="listBoxB">
        <option>ItemB1</option>
        <option>ItemB2</option>
    </select>

    <script>
        $("#listBoxA").kendoListBox({
            draggable: true
        });

        $("#listBoxB").kendoListBox({
            dropSources: [ "listBoxA" ]
        });
    </script>

### navigatable `Boolean` *(default: true)*

Indicates whether the keyboard navigation is enabled or disabled.

> If you set the `navigatable` option to `true`, you also have to set `selectable`.


<div class="meta-api-description">
Control keyboard interaction and navigation within the list, enabling users to move focus between items using arrow keys, Home and End keys, or by typing to search and jump directly to matching entries. Configure keyboard accessibility to traverse list elements, activate navigation shortcuts, and enhance user experience through keyboard-driven selection and focus. Enable or disable arrow key movement, quick key search navigation, and keyboard focus control for list elements, ensuring seamless keyboard traversal and selection when combining selection ability with navigable behavior.
</div>

#### Example

    <select id="listBox"></select>
    <script>
    $("#listBox").kendoListBox({
        navigatable: true,
        selectable: "single",
        dataSource: [
            { name: "Item 1", id: 1 },
            { name: "Item 2", id: 2 },
            { name: "Item 3", id: 3 }
        ],
        dataTextField: "name",
        dataValueField: "id"
    });
    </script>

### messages `Object`

Defines the localization texts for the ListBox. Used primarily for localization.


<div class="meta-api-description">
Configure and customize the text strings, labels, prompts, and messages displayed within the list selection interface to support different languages and regional settings. Enable localization of user-facing messages, update default labels, override standard notifications, and set multilingual interface text for improved accessibility and tailored user experiences. Control the wording and phrasing used in list box components to match specific localization requirements, translations, or custom terminology, ensuring consistent messaging across various language environments and adapting to diverse user contexts.
</div>

#### Example

    <select id="listBox">
        <option>Orange</option>
        <option>Apple</option>
        <option>Banana</option>
    </select>
    <script>
    $("#listBox").kendoListBox({
        toolbar: {
            tools: ["moveUp", "moveDown", "transferTo", "transferFrom", "transferAllTo", "transferAllFrom", "remove"]
        },
        messages: {
            tools: {
                moveUp: "Move Up",
                moveDown: "Move Down", 
                transferTo: "Transfer To",
                transferFrom: "Transfer From",
                transferAllTo: "Transfer All To",
                transferAllFrom: "Transfer All From",
                remove: "Remove"
            }
        }
    });
    </script>

### messages.tools `Object`

Defines the localization texts for tools in the ListBox. Texts are used when you configure the tooltip and accessibility support.


<div class="meta-api-description">
Control, customize, or configure the localization and translation of tooltip texts, accessibility labels, ARIA descriptions, and helper messages displayed by the selectable list interface, enabling adaptation of the user interface elements for screen readers, internationalization, and multi-language support in user selection components.
</div>

#### Example

    <select id="listBoxA"></select>
    <select id="listBoxB"></select>

    <script>
        $("#listBoxA").kendoListBox({
            connectWith: "listBoxB",
            dataSource: [ "ItemA1", "ItemA2" ],
            toolbar: {
                tools: [ "moveUp", "moveDown", "remove", "transferTo", "transferFrom", "transferAllTo", "transferAllFrom" ]
            },
            messages: {
                tools: {
                    moveUp: "MoveUp",
                    moveDown: "MoveDown",
                    remove: "Remove",
                    transferTo: "TransferTo",
                    transferFrom: "TransferFrom",
                    transferAllTo: "TransferAllTo",
                    transferAllFrom: "TransferAllFrom"
                }
            }
        });

        $("#listBoxB").kendoListBox({
            connectWith: "listBoxA",
            dataSource: [ "ItemB1", "ItemB2" ]
        });
    </script>

### messages.tools.moveDown `String`

Defines the text of the **Move Down** button that is located in the toolbar of the ListBox.


<div class="meta-api-description">
Set or customize the localized label, tooltip, or accessible text for the move down button in a list box toolbar, enabling control over the wording shown for descending item reorder actions, adjusting button descriptions for move down commands, and configuring language-specific messages for shifting items lower in a list interface.
</div>

#### Example

    <select id="listBoxA"></select>
    <select id="listBoxB"></select>

    <script>
        $("#listBoxA").kendoListBox({
            connectWith: "listBoxB",
            dataSource: [ "ItemA1", "ItemA2" ],
            toolbar: {
                tools: [ "moveDown" ]
            },
            messages: {
                tools: {
                    moveUp: "MoveDown"
                }
            }
        });

        $("#listBoxB").kendoListBox({
            connectWith: "listBoxA",
            dataSource: [ "ItemB1", "ItemB2" ]
        });
    </script>

### messages.tools.moveUp `String`

Defines the text of the **Move Up** button that is located in the toolbar of the ListBox.


<div class="meta-api-description">
Customize or translate the label text for the toolbar button that moves selected items upward within a list box, including setting or configuring the button name, caption, or tooltip for accessibility and localization purposes, adjusting the user interface text for the move-up control in list manipulation tools, enabling support for different languages or custom wording for the command that shifts list entries higher in order, and controlling how the move-up action is described or presented in the toolbar of multi-selection lists or item rearrangement components.
</div>

#### Example

    <select id="listBoxA"></select>
    <select id="listBoxB"></select>

    <script>
        $("#listBoxA").kendoListBox({
            connectWith: "listBoxB",
            dataSource: [ "ItemA1", "ItemA2" ],
            toolbar: {
                tools: [ "moveUp" ]
            },
            messages: {
                tools: {
                    moveUp: "MoveUp"
                }
            }
        });

        $("#listBoxB").kendoListBox({
            connectWith: "listBoxA",
            dataSource: [ "ItemB1", "ItemB2" ]
        });
    </script>

### messages.tools.remove `String`

Defines the text of the **Delete** button that is located in the toolbar of the ListBox.


<div class="meta-api-description">
Customize, set, or translate the text label for the delete or remove button in list selection toolbars, enabling localization, modification, or configuration of the button caption that clears, deletes, or removes items from lists or selection boxes, including adjusting toolbar tool names and messages for user interfaces that involve item removal or deletion actions.
</div>

#### Example

    <select id="listBoxA"></select>
    <select id="listBoxB"></select>

    <script>
        $("#listBoxA").kendoListBox({
            connectWith: "listBoxB",
            dataSource: [ "ItemA1", "ItemA2" ],
            toolbar: {
                tools: [ "remove" ]
            },
            messages: {
                tools: {
                    remove: "Remove"
                }
            }
        });

        $("#listBoxB").kendoListBox({
            connectWith: "listBoxA",
            dataSource: [ "ItemB1", "ItemB2" ]
        });
    </script>

### messages.tools.transferAllFrom `String`

Defines the text of the **Transfer All From** button that is located in the toolbar of the ListBox.


<div class="meta-api-description">
Customize, configure, or set the label and text for the button that moves or transfers all items from one list to another within a listbox toolbar, including changing the wording for internationalization, localization, or UI personalization concerns related to bulk item transfer actions, enabling control over how the "transfer all from" functionality is presented in multi-select or dual-list interfaces.
</div>

#### Example

    <select id="listBoxA"></select>
    <select id="listBoxB"></select>

    <script>
        $("#listBoxA").kendoListBox({
            connectWith: "listBoxB",
            dataSource: [ "ItemA1", "ItemA2" ],
            toolbar: {
                tools: [ "transferAllFrom" ]
            },
            messages: {
                tools: {
                    transferAllFrom: "TransferAllFrom"
                }
            }
        });

        $("#listBoxB").kendoListBox({
            connectWith: "listBoxA",
            dataSource: [ "ItemB1", "ItemB2" ]
        });
    </script>

### messages.tools.transferAllTo `String`

Defines the text of the **Transfer All To** button that is located in the toolbar of the ListBox.


<div class="meta-api-description">
Customize or configure the text label and localization for the toolbar button that moves all items from one list to another in a dual-list interface, enabling you to change the displayed phrase, translate, rename, or set the caption for the control that transfers every element at once between lists, adjusting the user interface wording for better clarity or language support.
</div>

#### Example

    <select id="listBoxA"></select>
    <select id="listBoxB"></select>

    <script>
        $("#listBoxA").kendoListBox({
            connectWith: "listBoxB",
            dataSource: [ "ItemA1", "ItemA2" ],
            toolbar: {
                tools: [ "transferAllTo" ]
            },
            messages: {
                tools: {
                    transferAllTo: "TransferAllTo"
                }
            }
        });

        $("#listBoxB").kendoListBox({
            connectWith: "listBoxA",
            dataSource: [ "ItemB1", "ItemB2" ]
        });
    </script>

### messages.tools.transferFrom `String`

Defines the text of the **Transfer From** button that is located in the toolbar of the ListBox.


<div class="meta-api-description">
Customize, configure, or set the label, text, or caption for the transfer from button within the list box toolbar, enabling localization, internationalization, translation, or customization of UI elements related to item transfer controls, toolbar button naming, or messaging for list manipulation actions such as moving or transferring items from one list to another.
</div>

#### Example

    <select id="listBoxA"></select>
    <select id="listBoxB"></select>
    <script>
        $("#listBoxA").kendoListBox({
            connectWith: "listBoxB",
            dataSource: [ "ItemA1", "ItemA2" ],
            toolbar: {
                tools: [ "transferFrom" ]
            },
            messages: {
                tools: {
                    transferFrom: "TransferFrom"
                }
            }
        });

        $("#listBoxB").kendoListBox({
            connectWith: "listBoxA",
            dataSource: [ "ItemB1", "ItemB2" ]
        });
    </script>

### messages.tools.transferTo `String`

Defines the text of the **Transfer To** button that is located in the toolbar of the ListBox.


<div class="meta-api-description">
Set or customize the label, caption, or text displayed on the transfer or move button in a dual-list or multi-select interface, enabling control over the wording for the button that moves selected items from one list to another, such as configuring the toolbar button that transfers items between list boxes, changing the action button text to match application terminology or localization needs, and adjusting UI elements for user-friendly prompts during item transfer operations.
</div>

#### Example

    <select id="listBoxA"></select>
    <select id="listBoxB"></select>

    <script>
        $("#listBoxA").kendoListBox({
            connectWith: "listBoxB",
            dataSource: [ "ItemA1", "ItemA2" ],
            toolbar: {
                tools: [ "transferTo" ]
            },
            messages: {
                tools: {
                    transferTo: "TransferTo"
                }
            }
        });

        $("#listBoxB").kendoListBox({
            connectWith: "listBoxA",
            dataSource: [ "ItemB1", "ItemB2" ]
        });
    </script>

### selectable `String` *(default: "single")*

Indicates whether the selection is single or multiple. The possible values are:
- `"single"` - A single-item selection.
- `"multiple"` - A multiple-item selection.


<div class="meta-api-description">
Control how items can be chosen within a list interface by setting whether users can pick one single entry or multiple entries simultaneously, enabling single selection or multi-selection using keyboard modifiers like Shift and Ctrl, touch gestures, or mouse clicks. Adjust selection behavior to allow exclusive choice when only one option should be active or permit multiple selections for complex user interactions involving bulk actions or range selections. Configure the selection mode to support different user input methods and selection flexibility for lists, menus, or item collections in applications.
</div>

#### Example

    <select id="listBox"></select>
    <script>
    $("#listBox").kendoListBox({
        selectable: "multiple",
        dataSource: [
            { name: "Item 1", id: 1 },
            { name: "Item 2", id: 2 },
            { name: "Item 3", id: 3 }
        ],
        dataTextField: "name",
        dataValueField: "id"
    });
    </script>

### template `String|Function`

Specifies the item template of the ListBox.


<div class="meta-api-description">
Control the rendering of each item in a selectable list by defining custom templates or markup that specify how data fields, images, icons, or conditional content appear within list entries. Configure, set, or customize item layouts using HTML snippets, template expressions, or dynamic formatting to tailor the appearance of selectable options, implement complex visual structures, embed rich content, or apply conditional styling for individual list elements in dropdowns, menus, or selection controls. Enable full customization of item presentation in lists by specifying rendering templates that influence how each entry is displayed based on data or state.
</div>

#### Example

     <script type="text/kendo-x-tmpl" id="template">
        <div>
            Item template for #:name#
        </div>
     </script>

     <select id="listBox"></select>
     <script>
     $("#listBox").kendoListBox({
        dataSource: {
            data: [
                { name: "Jane Doe" },
                { name: "John Doe" }
            ]
        },
        template: kendo.template($("#template").html())
    });
    </script>

### toolbar `Object`

Defines the settings for displaying the toolbar of the ListBox. The toolbar allows you to execute a set of predefined actions.

By default, the toolbar is not displayed. If the `tools` array is populated, then the toolbar and the corresponding tools are displayed.


<div class="meta-api-description">
Customize and manage a toolbar integrated with a list selection interface to display actionable buttons or controls, including configuring the toolbar’s layout, visible tools, and interactive behavior. Enable or disable toolbar visibility based on the presence of action items, arrange and set predefined or custom commands within the toolbar, and control how users interact with list-related functions such as adding, removing, or modifying entries. Tailor the action bar’s appearance and functionality to suit different workflows, trigger dynamic tool rendering when the toolset is populated, and set properties that determine how tools respond to user inputs or programmatic changes. This supports scenarios involving toolbar customization, action button configuration, UI control management, and user interface enhancement for list-based components.
</div>

#### Example

    <select id="listBox"></select>
    <script>
        $("#listBox").kendoListBox({
            dataSource: [ "Item 1", "Item 2", "Item 3", "Item 4" ],
            toolbar: {
                tools: [ "moveUp", "moveDown" ]
            }
        });
    </script>

### toolbar.position `String` *(default: "right")*

The relative position of the ListBox element at which the toolbar will be displayed. The possible values are `"left"`, `"right"`, `"top"`, and `"bottom"`.


<div class="meta-api-description">
Control and set the placement or alignment of toolbar actions in relation to the ListBox component by configuring its position to appear on the left, right, top, or bottom side. Adjust where toolbar buttons, controls, or menus are displayed in the user interface for better layout customization. Enable developers to specify the toolbar location near or around the list container, positioning it horizontally or vertically to suit interface design preferences or usability requirements. Optimize the arrangement of interactive elements by configuring the toolbar’s orientation relative to the list, supporting flexible UI placement and arrangement options.
</div>

#### Example

    <select id="listBox">
        <option>Item 1</option>
        <option>Item 2</option>
        <option>Item 3</option>
        <option>Item 4</option>
    </select>
    <script>
        $("#listBox").kendoListBox({
            toolbar: {
                position: "left",
                tools: [ "moveUp", "moveDown" ]
            }
        });
    </script>

### toolbar.tools `Array`

A collection of tools that are used to interact with the ListBox.

The built-in tools are:
- `"moveUp"` - Moves up the selected ListBox items.
- `"moveDown"` - Moves down the selected ListBox items.
- `"remove"` - Removes the selected ListBox items.
- `"transferTo"` - Moves the selected items from the current ListBox to the target that is defined in the [`connectWith`](/api/javascript/ui/listbox/configuration/connectwith) option.
- `"transferFrom"` - Moves the selected items from the ListBox that is defined in the [`connectWith`](/api/javascript/ui/listbox/configuration/connectwith) option to the current ListBox.
- `"transferAllTo"` - Moves all items from the current ListBox to the target that is defined in the [`connectWith`](/api/javascript/ui/listbox/configuration/connectwith) option.
- `"transferAllFrom"` - Moves all items from the ListBox that is defined in the [`connectWith`](/api/javascript/ui/listbox/configuration/connectwith) option to the current ListBox.


<div class="meta-api-description">
Control and customize toolbar buttons that manage list items by enabling actions such as moving items up or down, reordering elements within a list, removing selected entries, and transferring one or multiple items between linked list containers. Configure predefined action tools like move, delete, and transfer, or define custom toolsets to handle item manipulation across connected lists identified via linking options. Support for item shifting in both directions between lists, bulk transfer of all entries, and fine-grained control over item ordering and removal empowers flexible list management, drag-and-drop emulation, and dynamic item synchronization in multi-list interfaces. Adjust and enable toolbar functionality to reorder, eliminate, or move single or groups of list entries effortlessly between connected or separate list boxes through configurable action sets.
</div>

#### Example

    <select id="listBoxA"></select>
    <select id="listBoxB"></select>

    <script>
        $("#listBoxA").kendoListBox({
            connectWith: "listBoxB",
            dataSource: [ "ItemA1", "ItemA2" ],
            toolbar: {
                tools: [ "transferTo", "transferFrom", "transferAllTo", "transferAllFrom" ]
            }
        });

        $("#listBoxB").kendoListBox({
            connectWith: "listBoxA",
            dataSource: [ "ItemB1", "ItemB2" ]
        });
    </script>

## Methods

### add

Adds an item to the widget.


<div class="meta-api-description">
Insert or append items programmatically into a list or dropdown control at runtime, dynamically updating the displayed collection by adding new entries based on user interactions, data updates, or application logic. Enable adding elements to the existing list after initialization, control the content of selectable lists, inject new options or records, and modify the visible list contents through code to reflect changes instantly. Facilitate dynamic list management, runtime population, item insertion, and collection augmentation within UI components that display multiple selectable or viewable entries.
</div>

#### Example

    <select id="listBox"></select>
    <script>
    $("#listBox").kendoListBox({
         dataSource: {
            data: [
                { name: "Jane Doe" },
                { name: "Sam Doe" }
            ]
        },
        template: "<div>#:name#</div>"
    });
    var listBox = $("#listBox").data("kendoListBox");
    var person = {name: "Bob Doe"};
    listBox.add(person);
    </script>

#### Example

    <select id="listBox"></select>
    <script>
        var Product = kendo.data.Model.define({
            id: "ProductID",
            fields: {
                ProductName: {
                    type:"string"
                }
            }
        });

        var dataSource = new kendo.data.DataSource({
            data:[
                {ProductID:1, ProductName:"Apples"},
                {ProductID:2, ProductName:"Oranges"},
            ],
            schema: {
                model: Product
            }
        });

        $("#listBox").kendoListBox({
            dataSource: dataSource,
            dataTextField:"ProductName",
            dataValueField:"ProductID"
        });

        var listBox = $("#listBox").data("kendoListBox");
        var item = new Product({ProductName:"Bananas"});
        listBox.add(item);
    </script>

### clearSelection

Clears the selected items of the ListBox and triggers the `change` event.


<div class="meta-api-description">
Remove all currently selected items or clear the selection state programmatically from a list or multiple-choice component, reset selections to none, unselect any highlighted or chosen entries, update and refresh the user interface to reflect no selections, trigger change or selection update events to notify event listeners, data bindings, or handlers about the cleared state change, enable clearing of checked or marked options in a selectable list, control selection states dynamically via code to deselect everything at once, handle scenarios where all user-selected items need to be reset or cleared automatically without manual intervention.
</div>

#### Example

    <div id ="listBox"></div>
    <script>
    $("#listBox").kendoListBox({
         dataSource: {
            data: [
                { name: "New York" },
                { name: "London" },
                { name: "Paris" }
            ]
        },
        template: "<div>#:name#</div>",
        selectable: true
    });
    // get a reference to the list box widget
    var listBox = $("#listBox").data("kendoListBox");
    listBox.clearSelection();
    </script>

### dataItem

Returns the data item to which the specified list item is bound.


<div class="meta-api-description">
Retrieve the original data object or model linked to a displayed list element, enabling access to underlying fields for reading values, dynamically selecting items, modifying data programmatically, or customizing templates based on the bound dataset; use this method to map visible list entries back to their source data, facilitating data binding inspection, item manipulation, and integration between UI elements and their associated data records in interactive lists or dropdown controls.
</div>

#### Parameters

##### element `jQuery|Element|String`

A string, DOM element, or jQuery object which represents the item. A string is treated as a jQuery selector.

#### Returns

`kendo.data.ObservableObject` The model of the item that was passed as a parameter.

#### Example - get the data item of the first node

    <select id="listBox"></select>
    <script>
    $("#listBox").kendoListBox({
        dataSource: [
            { id: 1, name: "foo" },
            { id: 2, name: "bar" }
        ],
        dataTextField: "name",
        dataValueField: "id"
    });

    var listbox = $("#listBox").data("kendoListBox");
    var dataItem = listbox.dataItem(".k-list-item:first");
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(dataItem.name); // displays "foo"
    </script>

### dataItems

Returns an array of the data items that are bound to the ListBox widget. This method provides access to the underlying data objects, which can be useful for programmatic manipulation or inspection of the widget's data. The returned array contains observable objects that reflect the current state of the data source. Unlike the `items()` method which returns DOM elements, `dataItems()` returns the actual data objects.


<div class="meta-api-description">
Retrieve or access the full collection of data objects linked or bound to the list box, enabling inspection, filtering, mapping, modification, iteration, and programmatic manipulation of the underlying dataset. This method fetches the current, observable model items representing the live data source state rather than UI elements, facilitating operations such as data transformation, real-time updates, object retrieval by index or property, and integration with business logic or custom processing. It supports developers looking to extract raw data from list-based components for advanced data handling, querying, or synchronization tasks beyond visual element access.
</div>

#### Returns

`kendo.data.ObservableArray` An array of data items to which the widget is bound.

#### Example

    <select id="listBox"></select>
    <script>
        var dataSource = new kendo.data.DataSource({
            data: [{ name: "Jane Doe" }, { name: "John Doe" }]
        });
        var listBox = $("#listBox").kendoListBox({
            dataSource: dataSource,
            template: "<div>#:name#</div>"
        }).data("kendoListBox");
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(listBox.dataItems()) //will output the bound array
    </script>

### destroy

Prepares the ListBox for a safe removal from the DOM. Detaches all event handlers and removes the `jQuery.data` attributes to avoid memory leaks. Calls the `destroy` method of child Kendo UI widgets.

> This method does not remove the ListBox element from the DOM.


<div class="meta-api-description">
Remove event listeners and free resources associated with a list box widget by cleaning up all attached handlers, clearing internal data, and disposing of child UI components to prevent memory leaks and prepare for manual DOM element removal; configure teardown or destroy procedures, perform cleanup operations, disable event bindings, and ensure all references are cleared before removing the component element from the document.
</div>

#### Example

    <select id="listBox"></select>
    <script>
    $("#listBox").kendoListBox({
         dataSource: {
            data: [
                { name: "Jane Doe" },
                { name: "John Doe" }
            ]
        },
        template: "<div>#:name#</div>"
    });
    // get a reference to the list view widget
    var listBox = $("#listBox").data("kendoListBox");
    listBox.destroy();
    </script>

### enable

Enables or disables the ListBox items.


<div class="meta-api-description">
Control toggling item interactivity, enabling or disabling user actions such as selection, focus, keyboard and mouse input on list elements within a multiple-choice or single-select interface; configure item states dynamically after initialization to manage accessibility, selection behavior, input responsiveness, editable states, or user workflow control in list-based UI components.
</div>

#### Parameters

##### element `jQuery|Element|String`

The items that are to be enabled or disabled.

##### enable `Boolean` *(optional, default: true)*

Indicates whether the items should be enabled or disabled.

#### Example - disable the first list item

    <select id="listBox"></select>
    <script>
    $("#listBox").kendoListBox({
        disabled: true,
        dataSource: {
            data: [
                { name: "Jane Doe" },
                { name: "John Doe" }
            ]
        },
        template: "<div>#:name#</div>"
    });
    // get a reference to the list view widget
    var listBox = $("#listBox").data("kendoListBox");
    listBox.enable(".k-list-item:first", false);
    </script>

### items

Obtains an array of the DOM elements which correspond to the data items from the [`view`](/api/javascript/data/datasource/methods/view) method of the Kendo UI DataSource.


<div class="meta-api-description">
Retrieve or access the rendered DOM elements representing each item in a list-based UI component, obtain an array of native HTML elements corresponding to the currently displayed data entries, map or synchronize visual list item nodes with their underlying data source view results, extract or get the actual DOM nodes after component rendering to enable direct element manipulation or inspection, query or fetch the UI elements matching the data items in order to implement custom behaviors or styling, ensure ordering and alignment of DOM nodes with data entries for dynamic lists, enable direct interaction or event binding on individual list items by accessing their DOM representations, handle scenarios where developers need to map between data source output and visible elements for modification or analysis, call on the UI list instance post-initialization to retrieve the current set of list item elements, support use cases requiring precise control and reference of list item nodes generated by a data-driven interface.
</div>

#### Returns

`Array` - The currently rendered view items ( depending on the item template, `<div>`, `<li>`, `<tr>`, and other elements).

#### Example

    <select id="listBox">
        <option>Orange</option>
        <option>Apple</option>
    </select>
    <script>
    $("#listBox").kendoListBox({
        dataSource: [ "Orange", "Apple" ],
        connectWith: "listBoxB"
    });
    // get a reference to the first list box widget
    var listBox = $("#listBox").data("kendoListBox");
    var items = listBox.items();
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(items); // logs the items
    </script>

### refresh

Reloads the data and repaints the ListBox. Triggers the [`dataBound`](/api/javascript/ui/listbox/events/databound) event.


<div class="meta-api-description">
Reload, refresh, or update the list display dynamically by forcing the UI to rebind and redraw items in the list control, enabling real-time data synchronization, immediate content updates, or re-rendering of list entries after data changes; trigger automatic post-refresh events for executing custom logic or UI adjustments once the list data has been reloaded and repainted, supporting scenarios like live data feeds, manual refresh actions, or programmatic data resets to ensure the list’s visual state matches the underlying data source consistently.
</div>

#### Example

    <select id="listBox"></select>
    <script>
    $("#listBox").kendoListBox({
         dataSource:  [
            { name: "Jane Doe" },
            { name: "John Doe" }
        ],
        template: "<div>#:name#</div>"
    });
    var listBox = $("#listBox").data("kendoListBox");
    // refreshes the list box
    listBox.refresh();
    </script>

### reorder

Moves the specified item at a position set by the zero-based index parameter. The rest of the items are reordered accordingly.


<div class="meta-api-description">
Control moving or repositioning items within a list by specifying an item's current location and a target zero-based index to shift or reorder elements dynamically, enabling programmatic rearrangement of list entries, item sorting, or drag-and-drop-like behavior where items can be moved to new positions while maintaining continuous ordering and updating the underlying collection instantly to reflect changes in item sequence or priority.
</div>

#### Parameters

##### element `jQuery|Element|String`

The item that is to be reordered.

##### index `Number`

The new position of the item in the list.

#### Example

    <select id="listBox">
        <option>Orange</option>
        <option>Apple</option>
        <option>Banana</option>
        <option>Peach</option>
    </select>
    <script>
    $("#listBox").kendoListBox();
    var listBox = $("#listBox").data("kendoListBox");
    // moves first item to position with index 2
    listBox.reorder(".k-list-item:first", 2);
    </script>

### remove

Removes items from the widget.


<div class="meta-api-description">
Remove, delete, or clear one or multiple items from a list or collection programmatically or via user actions, controlling which entries are taken out by index, reference, or object data. Enable dynamic updates to a list display, adjust selections and focused elements upon item removal, manage internal state changes after deleting entries, and support scenarios like filtering, clearing selected elements, updating visible list contents, or syncing list data with user input or backend changes. This functionality supports flexible removal methods for interactive lists, selection management, and real-time list modification in applications.
</div>

#### Parameters

##### element `jQuery|Element|String|Array`

The items that are to be removed.

#### Example

    <select id="listBox"></select>
    <script>
    $("#listBox").kendoListBox({
         dataSource: {
            data: [
                { name: "Jane Doe" },
                { name: "Sam Doe" }
            ]
        },
        template: "<div>#:name#</div>"
    });
    var listBox = $("#listBox").data("kendoListBox");
    listBox.remove(listBox.items().first());
    </script>

### select

Gets or sets the selected ListBox items.


<div class="meta-api-description">
Retrieve or set selected items in a list control, enabling programmatic selection management, querying currently highlighted or chosen entries, controlling single or multiple selection modes, updating which list elements are active or checked, accessing or changing selection via code, manipulating item states within a selectable list, configuring which options are selected, getting the current selection set, and dynamically modifying highlighted or marked items in list components.
</div>

#### Parameters

##### items `jQuery|Array`

The items that are to be selected.

#### Returns

`jQuery` - The selected items if called without arguments.

#### Example - select the first element in the listbox

    <select id="listBox"></select>
    <script>
    $("#listBox").kendoListBox({
        dataSource: {
            data: [
                { id: 1, name: "Jane Doe", age: 47 },
                { id: 2, name: "John Doe", age: 50 }
            ]
        },
        template: "<div>#:name#</div>"
    });
    // get a reference to the list box widget
    var listBox = $("#listBox").data("kendoListBox");
    // selects first list box item
    listBox.select(listBox.items().first());
    </script>

#### Example - select an element by its name property

    <select id="listBox"></select>
    <script>
    $("#listBox").kendoListBox({
        dataSource: {
            data: [
                { id: 1, name: "Jane Doe", age: 47 },
                { id: 2, name: "John Doe", age: 50 }
            ]
        },
        template: "<div>#:name#</div>"
    });
    // get a reference to the list box widget
    var listBox = $("#listBox").data("kendoListBox");
    // Find the uid of the element by name.
    let uid = listBox.dataItems().filter(f => f.name == "Jane Doe")[0].uid;
    // Find the element using the uid.
    let item = listBox.wrapper.find("[data-uid='"+uid+"']");
    // Select the element.
    listBox.select(item);
    </script>

### setDataSource

Sets the dataSource of an existing ListBox and rebinds it.


<div class="meta-api-description">
Update or replace the items displayed in a list control by dynamically setting a new collection of data, enabling the component to refresh and rebind its visible entries without recreating the entire element. Change, reset, or modify the source data for a list interface on-the-fly, whether switching datasets, reloading with new content, or synchronizing with updated external data sources. Control the list contents programmatically by assigning compatible data arrays, collections, or bindings, allowing runtime updates to the displayed options, entries, or records shown inside a list component. Adjust the data feed to alter visible items, ensuring the list reflects changes immediately through rebinding and UI refresh triggered by updating the underlying data connection.
</div>

#### Parameters

##### dataSource `kendo.data.DataSource`

#### Example

    <select id="listBox"></select>
    <script>
    $("#listBox").kendoListBox({
        dataValueField: "id",
        dataTextField: "name",
        dataSource: {
            data: [
                { id: 1, name: "United States" },
                { id: 2, name: "France" }
            ]
        }
    });
    var dataSource = new kendo.data.DataSource({
        data: [
            { id: 3, name: "Germany" },
            { id: 4, name: "Sweden" }
        ]
    });
    var listbox = $("#listBox").data("kendoListBox");
    listbox.setDataSource(dataSource);
    </script>

#### Example

    <select id="listBox"></select>
    <script>
    $("#listBox").kendoListBox({
      dataSource: [ "Apples", "Oranges" ]
    });
    var dataSource = new kendo.data.DataSource({
      data: [ "Bananas", "Cherries" ]
    });
    var listbox = $("#listBox").data("kendoListBox");
    listbox.setDataSource(dataSource);
    </script>

## Events

### add

Fires before an item is added to the ListBox.

The function context of the event handler (available through the `this` keyword) that will be set to the widget instance.


<div class="meta-api-description">
Capture and handle events triggered when a new item is about to be inserted into a list or selection control, enabling pre-insertion validation, modification, filtering, or transformation of data before it appears in the user interface. This event mechanism allows developers to intercept additions to collections or list components, run custom logic such as input checks, data sanitization, or dynamic updates to UI state prior to finalizing the item addition. Common use cases include verifying user input, preventing duplicates, altering items on the fly, and seamlessly integrating changes with component state and behavior during item insertion processes.
</div>

#### Event Data

##### e.items `Array`

The item elements that are to be added.

##### e.dataItems `Array`

The data items that are to be added.

#### Example

    <select id="listBoxA">
        <option>ItemA1</option>
        <option>ItemA2</option>
    </select>
    <select id="listBoxB">
        <option>ItemB1</option>
        <option>ItemB2</option>
    </select>

    <script>
        $("#listBoxA").kendoListBox({
            connectWith: "listBoxB",
            toolbar: {
                tools: [ "transferTo" ]
            }
        });

        $("#listBoxB").kendoListBox({
            add: function(e) {
                // handle event
            }
        });
    </script>

### change

Fires when the ListBox selection has changed.

The function context of the event handler (available through the `this` keyword) that will be set to the widget instance.


<div class="meta-api-description">
Detect selection changes, track user or programmatic updates to list selections, handle events triggered when ListBox or similar selection components update choices, listen for selection modifications, respond to item selection alterations, execute code after selection changes occur, access the current selected items from event handlers, monitor changes in dropdown or list-driven user interfaces, manage interactive selection updates, and react to selection change callbacks with event data and context.
</div>

#### Event Data

##### e.sender `kendo.ui.ListBox`

The widget instance which fired the event.

#### Example

    <select id="listBox"></select>
    <script>
    $("#listBox").kendoListBox({
        dataSource: [ "John Doe" ],
        change: function() {
            // handle event
        }
     });
     </script>

#### To set after initialization

    <select id="listBox"></select>
    <script>
    $("#listBox").kendoListBox({
        dataSource: [ "John Doe" ]
    });
    // get a reference to the list box
    var listBox = $("#listBox").data("kendoListBox");
    // bind to the change event
    listBox.bind("change", function(e) {
        // handle event
    });
    </script>

### dataBound

Fires when the ListBox has received data from the data source and is already rendered.

The function context of the event handler (available through the `this` keyword) that will be set to the widget instance.


<div class="meta-api-description">
Detect when the list box finishes loading or updating its items after data retrieval, trigger actions once the items are rendered, execute custom code following data fetching and rendering, handle post-data-binding events to update UI elements or selections, run callbacks when the list content changes or refreshes, respond to data source completion for filtering or initialization, perform DOM manipulations after the list is populated, subscribe to data load completion events for dynamic updates, enable scripts to run after the component fully refreshes its displayed entries, control logic execution right after the list updates from its data source.
</div>

#### Example

    <select id="listBox"></select>
    <script>
    $("#listBox").kendoListBox({
       template: "<div>#: name#</div>",
       dataSource: [
           { name: "John Doe", age: 30 }
       ],
       dataBound: function() {
           //handle event
	/* The result can be observed in the DevTools(F12) console of the browser. */
           console.log("data bound");
       }
    });
    </script>

### dragstart

Fires when the dragging of the ListBox items starts.


<div class="meta-api-description">
Detect when dragging begins on list items to customize drag-and-drop actions, initialize or modify drag metadata and visual cues, control item rearrangement permissions, cancel drag initiation, access details about dragged elements and underlying events, handle user interactions involving moving or copying list entries, set drag payload or effects, and respond programmatically to drag start events for advanced list manipulation and dynamic UI behavior.
</div>

#### Event Data

##### e.draggableEvent `Object`

The original `dragstart` event data of `draggable`.

##### e.items `jQuery`

The elements that will be dragged.

##### e.preventDefault `Function`

If invoked, prevents the `dragstart` action. The element will remain at its original position. The hint and placeholder will not be initialized.

#### Example - prevent certain item from being dragged by cancelling the drag start action

    <select id="listBox">
        <option>Orange</option>
        <option>Apple</option>
        <option>Banana</option>
        <option>Peach</option>
    </select>
    <script>
    $("#listBox").kendoListBox({
         draggable: true,
         dragstart: function(e) {
             if (e.dataItems.text === "Orange") {
                 e.preventDefault();
             }
         }
    });
    </script>

### drag

Fires when the placeholder of the ListBox changes its position.


<div class="meta-api-description">
Capture and respond to dynamic changes in item position during drag-and-drop reorder operations by receiving continuous updates as the placeholder moves within the list. Monitor and handle real-time dragging events to update visuals, enforce restrictions on valid drop targets, synchronize underlying data models, or control behavior while items are actively being repositioned. Enable reactions to ongoing placeholder shifts for seamless interactive list rearrangement, validating item placement, customizing user feedback, or modifying state throughout the drag lifecycle.
</div>

#### Event Data

##### e.items `jQuery`

The elements that are being dragged.

##### e.dataItems `Array`

The data items that are being dragged.

##### e.draggableEvent `Object`

The original `drag` event data of `draggable`.

##### e.preventDefault `Function`

If invoked, prevents the `dragstart` action. The element will remain at its original position. The hint will be initialized.

#### Example

    <select id="listBox">
        <option>Orange</option>
        <option>Apple</option>
        <option>Banana</option>
        <option>Peach</option>
    </select>
    <script>
    $("#listBox").kendoListBox({
         draggable: true,
         drag: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
             console.log("drag event");
         }
    });
    </script>

### drop

Fires when a ListBox item is dropped over one of the drop targets.


<div class="meta-api-description">
Detect and respond to drag-and-drop actions where items are released onto a list interface, capturing when an element is dropped, enabling event listening for drop triggers, accessing details about the dragged item and its destination, managing updates to data structures or user interfaces based on what was dropped and where, controlling behaviors upon dropping items onto list components, handling drop event callbacks, configuring drop interaction responses, and using event arguments to determine drop effects and targets for dynamic content updates.
</div>

#### Event Data

##### e.items `Array`

The item elements that are to be dropped.

##### e.dataItems `Array`

The data items that are to be dropped.

##### e.preventDefault `Function`

If invoked, prevents the `drop` action. The element will remain at its original position. The hint and placeholder will be initialized.

#### Example

    <select id="listBox">
        <option>Orange</option>
        <option>Apple</option>
        <option>Banana</option>
        <option>Peach</option>
    </select>
    <script>
    $("#listBox").kendoListBox({
         draggable: true,
         drop: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
             console.log("drop event");
         }
    });
    </script>

### dragend

Fires when the dragging of the item ends but before its position is changed in the DOM.


<div class="meta-api-description">
Detect when a drag-and-drop action on list items completes to handle post-drag logic such as updating state, validating drop targets, performing cleanup, or managing item reordering before the visual DOM changes; respond to the end of dragging operations to inspect event details, synchronize data sources, trigger animations, notifications, or custom behaviors upon finishing item movement within lists or UI components supporting draggable elements.
</div>

#### Event Data

##### e.items `Array`

The item elements that are to be dragged.

##### e.dataItems `Array`

The data items that are to be dragged.

##### e.draggableEvent `Object`

The original `drag` event data of `draggable`.

#### Example

    <select id="listBox">
        <option>Orange</option>
        <option>Apple</option>
        <option>Banana</option>
        <option>Peach</option>
    </select>
    <script>
    $("#listBox").kendoListBox({
        draggable: true,
        dragend: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(e.items);
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(e.dataItems);
        }
    });
    </script>

### remove

Fires before an item is removed from the ListBox.

The function context of the event handler (available through the `this` keyword) that will be set to the widget instance.


<div class="meta-api-description">
Handle or respond to actions just before an item is deleted or taken out from a selectable list, capturing events when users remove entries from list components, enabling validation, cleanup tasks, or updating associated data and user interface elements prior to item removal, supporting interception of the removal process to prevent or confirm deletion, run logging, enforce business rules, or trigger dynamic UI changes based on upcoming changes in list contents with event handler context bound to the relevant component instance.
</div>

#### Event Data

##### e.items `Array`

The item elements that are to be removed.

##### e.dataItems `Array`

The data items that are to be removed.

#### Example

    <select id="listBox"></select>
    <script>
    $("#listBox").kendoListBox({
        template: "<div>#: name#</div>",
        toolbar: {
            tools: ["remove"]
        },
        dataSource: {
            data: [
                { id: 1, name: "Jane Doe" },
                { id: 2, name: "John Doe" }
            ],
            schema: {
                model: {
                    id: "id",
                    fields: {
                        id: { type: "number" },
                        name: { type: "string" }
                    }
                }
            }
        },
        remove: function(e) {
            //handle event
            alert(e.dataItems[0].name + " was removed from the list");
        }
    });
    </script>

#### To set after initialization

    <select id="listBox"></select>
    <script>
    $("#listBox").kendoListBox({
        template: "<div>#: name#</div>",
        toolbar: {
            tools: ["remove"]
        },
        dataSource: {
            data: [
                { id: 1, name: "Jane Doe" },
                { id: 2, name: "John Doe" }
            ],
            schema: {
                model: {
                    id: "id",
                    fields: {
                        id: { type: "number" },
                        name: { type: "string" }
                    }
                }
            }
        }
    });
    // get a reference to the list box
    var listBox = $("#listBox").data("kendoListBox");
    // bind to the remove event
    listBox.bind("remove", function(e) {
    // handle event
        alert(e.dataItems[0].name + " was removed from the list");
    });
    </script>

### reorder

Fires when ListBox items are reordered.


<div class="meta-api-description">
Detect changes in item order within a list interface by capturing reorder actions such as drag-and-drop rearrangements; respond to these events to update data models, save new item sequences to databases or servers, synchronize user interface elements, track which elements were moved or reordered, handle sorting updates, trigger callbacks for changed item positions, listen for item movement within lists, and maintain consistency between visual order and underlying data structures.
</div>

#### Event Data

##### e.items `Array`

The item elements that are to be reordered.

##### e.dataItems `Array`

The data items that are to be reordered.

##### e.offset `Number`

The offset from the initial position of the item.

#### Example

    <select id="listBox">
        <option>Item 1</option>
        <option>Item 2</option>
        <option>Item 3</option>
        <option>Item 4</option>
    </select>
    <script>
        $("#listBox").kendoListBox({
            toolbar: {
                tools: [ "moveUp", "moveDown" ]
            },
            reorder: function (e) {
                // handle event
            }
        });
    </script>
