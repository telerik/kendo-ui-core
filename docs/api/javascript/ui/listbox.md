---
title: ListBox
description: Configuration, methods and events of the Kendo UI ListBox
---

# kendo.ui.ListBox

## Configuration

### autoBind `Boolean` *(default: true)*
If set to `false` the widget will not bind to the data source during initialization. In this case data binding will occur when the [change](/api/javascript/data/datasource#events-change) event of the data source is fired. By default the widget will bind to the data source specified in the configuration.

> Setting `autoBind` to `false` is useful when multiple widgets are bound to the same data source. Disabling automatic binding ensures that the shared data source does not make more than one request to the remote service.

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

A selector which determines that the target ListBox should be used when items are transferred from and to the current ListBox. The `connectWith` option defines **one-way** relationship - if the developer wants a two-way connection, then the `connectWith` option should be set on both widgets.
 
> **Important**: Setting the same `connectWith` option by more than one ListBox widgets is not recommended as the behavior of `transferFrom` and `transferAllFrom` [tools](/api/javascript/ui/listbox#configuration-toolbar.tools) is not deterministic.

> **Important**: Configuring a bidirectional relationship between two ListBox widgets results in a duplicated behavior of their `transferTo` and `transferFrom` as well as `transferAllTo` and `transferAllFrom` tools. If this isn't necessary, you can remove some of them from the [tools](/api/javascript/ui/listbox#configuration-toolbar.tools) option.

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
            connectWith: "#listBoxB",
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
            connectWith: "#listBoxB",
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
            connectWith: "#listBoxA",
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

The data source of the widget which is used render listbox items. Can be a JavaScript object which represents a valid data source configuration, a JavaScript array or an existing [kendo.data.DataSource](/api/javascript/data/datasource) instance.

If the `dataSource` option is set to a JavaScript object or array the widget will initialize a new [kendo.data.DataSource](/api/javascript/data/datasource) instance using that value as data source configuration.

If the `dataSource` option is an existing [kendo.data.DataSource](/api/javascript/data/datasource) instance the widget will use that instance and will **not** initialize a new one.

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

The field of the data item that provides the text content of the list items. The widget will filter the data source based on this field.

> **Important** When `dataTextField` is defined, the `dataValueField` option also should be set.

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

> **Important** When `dataValueField` is defined, the `dataTextField` option also should be set.

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

### draggable `Boolean | Object` *(default: false)*

Indicates if the widget items can be draged and droped.

> **Important:** When `draggable` is set to `true`, the `dropSources` option also should be set.

### hint `Function | String | jQuery`

Provides a way for customization of the sortable item hint. If a function is supplied, it receives one argument - the draggable element's jQuery object.
If hint function is not provided the widget will clone dragged item and use it as a hint.

> **Important: The hint element is appended to the `<body>` tag.** The developer should have this in mind in order to avoid styling issues.

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

### draggable.placeholder `Function | String | jQuery`

Provides a way for customization of the ListBox item placeholder. If a function is supplied, it receives one argument - the draggable element's jQuery object.
If placeholder function is not provided the widget will clone dragged item, remove its ID attribute, set its visibility to hidden and use it as a placeholder.

> **Important:** The placeholder element is appended to the ListBox widget container.

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

Array of id strings which determines the ListBox widgets that can drag and drop their items to the current ListBox widget. The `dropSources` option describes **one way** relationship, if the developer wants a two way connection then the `dropSources` option should be set on both widgets.

> **Important** When `dropSources` is defined, the `draggable` option also should be set to `true`.

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

### navigatable `Boolean` *(default: false)*
Indicates whether keyboard navigation is enabled/disabled.

#### Example

    <select id="listBox"></select>
    <script>
    $("#listBox").kendoListBox({
        navigatable: true,
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

### messages.tools `Object`

Defines the localization texts for tools in the ListBox. Texts are used for tooltip and accessibility purpose.

#### Example

    <select id="listBoxA"></select>
    <select id="listBoxB"></select>

    <script>
        $("#listBoxA").kendoListBox({
            connectWith: "#listBoxB",
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
            connectWith: "#listBoxA",
            dataSource: [ "ItemB1", "ItemB2" ]
        });
    </script>

### messages.tools.moveDown `String`

Defines the text of the "Move Down" button located in the toolbar of the widget.

#### Example

    <select id="listBoxA"></select>
    <select id="listBoxB"></select>

    <script>
        $("#listBoxA").kendoListBox({
            connectWith: "#listBoxB",
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
            connectWith: "#listBoxA",
            dataSource: [ "ItemB1", "ItemB2" ]
        });
    </script>

### messages.tools.moveUp `String`

Defines the text of the "Move Up" button located in the toolbar of the widget.

#### Example

    <select id="listBoxA"></select>
    <select id="listBoxB"></select>

    <script>
        $("#listBoxA").kendoListBox({
            connectWith: "#listBoxB",
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
            connectWith: "#listBoxA",
            dataSource: [ "ItemB1", "ItemB2" ]
        });
    </script>

### messages.tools.remove `String`

Defines the text of the "Delete" button located in the toolbar of the widget.

#### Example

    <select id="listBoxA"></select>
    <select id="listBoxB"></select>

    <script>
        $("#listBoxA").kendoListBox({
            connectWith: "#listBoxB",
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
            connectWith: "#listBoxA",
            dataSource: [ "ItemB1", "ItemB2" ]
        });
    </script>

### messages.tools.transferAllFrom `String`

Defines the text of the "All to Left" button located in the toolbar of the widget.

#### Example

    <select id="listBoxA"></select>
    <select id="listBoxB"></select>

    <script>
        $("#listBoxA").kendoListBox({
            connectWith: "#listBoxB",
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
            connectWith: "#listBoxA",
            dataSource: [ "ItemB1", "ItemB2" ]
        });
    </script>

### messages.tools.transferAllTo `String`

Defines the text of the "All to Right" button located in the toolbar of the widget.

#### Example

    <select id="listBoxA"></select>
    <select id="listBoxB"></select>

    <script>
        $("#listBoxA").kendoListBox({
            connectWith: "#listBoxB",
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
            connectWith: "#listBoxA",
            dataSource: [ "ItemB1", "ItemB2" ]
        });
    </script>

### messages.tools.transferFrom `String`

Defines the text of the "To Left" button located in the toolbar of the widget.

#### Example

    <select id="listBoxA"></select>
    <select id="listBoxB"></select>
    <script>
        $("#listBoxA").kendoListBox({
            connectWith: "#listBoxB",
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
            connectWith: "#listBoxA",
            dataSource: [ "ItemB1", "ItemB2" ]
        });
    </script>

### messages.tools.transferTo `String`

Defines the text of the "To Right" button located in the toolbar of the widget.

#### Example

    <select id="listBoxA"></select>
    <select id="listBoxB"></select>

    <script>
        $("#listBoxA").kendoListBox({
            connectWith: "#listBoxB",
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
            connectWith: "#listBoxA",
            dataSource: [ "ItemB1", "ItemB2" ]
        });
    </script>

### selectable `String` *(default: "single")*

Indicates whether selection is enabled/disabled. Possible values:

#### *"single"*

Single item selection.

#### *"multiple"*

Multiple item selection.


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

### template `Function`

Specifies ListBox item template.

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

Defines settings for displaying a toolbar for the ListBox widget, which allows a set of predefined actions to be executed. By default, the toolbar isn't shown. Populating the `tools` array will show the toolbar and the corresponding tools.

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

The position relative to the ListBox element, at which the toolbar will be shown. The possible values are "left", "right", "top" and "bottom".

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

A collection of tools that are used to interact with the ListBox. The built-in tools are:

- "moveUp" - moves up the selected ListBox item(s)
- "moveDown" - moves down the selected ListBox item(s)
- "moveDown" - moves down the selected ListBox item(s)
- "remove" - removes the selected ListBox item(s)
- "transferTo" - moves the selected item(s) from the current ListBox to the target defined in the [connectWith](/api/javascript/ui/listbox#configuration-connectWith) option
- "transferFrom" - moves the selected item(s) from the ListBox defined in the [connectWith](/api/javascript/ui/listbox#configuration-connectWith) option to the current ListBox
- "transferAllTo" - moves all items from the current ListBox to the target defined in the [connectWith](/api/javascript/ui/listbox#configuration-connectWith) option
- "transferAllFrom" - moves all item(s) from the ListBox defined in the [connectWith](/api/javascript/ui/listbox#configuration-connectWith) option to the current ListBox

#### Example

    <select id="listBoxA"></select>
    <select id="listBoxB"></select>

    <script>
        $("#listBoxA").kendoListBox({
            connectWith: "#listBoxB",
            dataSource: [ "ItemA1", "ItemA2" ],
            toolbar: {
                tools: [ "transferTo", "transferFrom", "transferAllTo", "transferAllFrom" ]
            }
        });

        $("#listBoxB").kendoListBox({
            connectWith: "#listBoxA",
            dataSource: [ "ItemB1", "ItemB2" ]
        });
    </script>

## Methods

### dataItem

Returns the data item to which the specified list item is bound.

#### Parameters

##### element `jQuery|Element|String`

A string, DOM element or jQuery object which represents the item. A string is treated as a jQuery selector.

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
    var dataItem = listbox.dataItem(".k-item:first");
    console.log(dataItem.name); // displays "foo"
    </script>

### dataItems

#### Returns

`kendo.data.ObservableArray` An array of data items that the widget is bound to.

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
        console.log(listBox.dataItems()) //will output the bound array
    </script>

### destroy

Prepares the **ListBox** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the ListBox element from DOM.

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

Enables or disables ListBox items.

#### Parameters

##### element `jQuery|Element|String`

The item(s) that are to be enabled/disabled.

##### enable `Boolean` *(optional, default: true)*

Whether the items should be enabled or disabled.

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
    listBox.enable(".k-item:first", false);
    </script>

### items

Obtains an Array of the DOM elements, which correspond to the data items from the Kendo UI DataSource [view](/api/javascript/data/datasource#methods-view).

#### Returns

`Array` The currently rendered View items (`<div>`, `<li>`, `<tr>` elements, etc., depending on the item template).

    <select id="listBox">
        <option>Orange</option>
        <option>Apple</option>
    </select>
    <script>
    $("#listBox").kendoListBox({
        dataSource: [ "Orange", "Apple" ],
        connectWith: "#listBoxB"
    });
    // get a reference to the first list box widget
    var listBox = $("#listBox").data("kendoListBox");
    var items = listBox.items();
    console.log(items); // logs the items
    </script>

### refresh
Reloads the data and repaints the ListBox. Triggers [dataBound](#events-dataBound) event.

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

Moves the specified item at position set by zero-based index parameter. The rest of the items are reordered accordingly.

#### Parameters

##### element `jQuery|Element|String`

The item to be reordered.

##### index `Number`

The new position of the item in the list.

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
    listBox.reorder(".k-item:first", 2);
    </script>

### remove

Removes item(s) from the widget.

#### Parameters

##### element `jQuery|Element|String`

The item(s) that will be removed.

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

Get/set the selected ListBox item(s).

#### Example

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

#### Returns

`jQuery` the selected item(s) if called without arguments.

#### Parameters

##### items `jQuery | Array`

The item(s) to select.

### setDataSource

Sets the dataSource of an existing ListBox and rebinds it.

#### Parameters

##### dataSource `kendo.data.DataSource`

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

The event handler function context (available via the `this` keyword) will be set to the widget instance.

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
            connectWith: "#listBoxB",
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

#### Event Data

##### e.items `Array`

The item elements to be added.

##### e.dataItems `Array`

The data items to be added.

### change

Fires when the ListBox selection has changed.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

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

Fires when the ListBox has received data from the data source and it is already rendered.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

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
           console.log("data bound");
       }
    });
    </script>

### dragstart

Fires when ListBox item(s) drag starts.

#### Event Data

##### e.draggableEvent `Object`

The original draggable's dragstart event data.

##### e.item `jQuery`

The element that will be dragged.

##### e.preventDefault `Function`

If invoked prevents the drag start action. The element will remain at its original position. The hint and placeholder will not be initialized.

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
             if (e.item.text() === "Orange") {
                 e.preventDefault();
             }
         }
    });
    </script>

### drag

Fires when ListBox's placeholder changes its position.

#### Event Data

##### e.item `jQuery`

The element that is dragged.

##### e.target `jQuery`

The target element under cursor against which placeholder is positioned.

##### e.list `kendo.ui.ListBox`

The ListBox widget instance which the item belongs to (useful in case there are connected ListBox widgets).

##### e.draggableEvent `Object`

The original draggable's drag event data.

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
             console.log("drag event");
         }
    });
    </script>

### drop
Fired when ListBox item is dropped over one of the drop targets.

#### Event Data

##### e.items `Array`

The item elements to be droped.

##### e.dataItems `Array`

The data items which to be droped.

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
             console.log("drop event");
         }
    });
    </script>

### dragend

Fires when item dragging ends but before the item's position is changed in the DOM. This event is suitable for preventing the sort action.

#### Event Data

##### e.action `String`

Possible values are: "sort" - indicates that item's position was changed inside the same ListBox container; "remove" - indicates that the item was removed from current ListBox widget; "receive" - indicates that the item was received by a connected ListBox widget instance;

##### e.preventDefault `Function`

If invoked prevents the sort action. The element will be reverted at its original position. The hint and placeholder will be destroyed.

##### e.items `Array`

The item elements to be dragged.

##### e.oldIndex `Number`

The original position of the item in the ListBox collection. In case the item is received from connected ListBox the value will be -1

##### e.newIndex `Number`

The position where item will be placed. In case the item is removed from connected ListBox the value will be -1

##### e.draggableEvent `Object`

The original draggable's drag event data.

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
            console.log("from " + e.oldIndex + " to " + e.newIndex);

            //prevent first item to be placed at the end of the list
            if(e.newIndex == 2 && e.oldIndex == 0) {
                e.preventDefault();
            }
        }
    });
    </script>

### remove

Fires before an item is removed from the ListBox.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Example

    <select id="listBox"></select>
    <script>
    $("#listBox").kendoListBox({
        template: "<div>#: name#</div>",
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
            e.preventDefault();
        }
    });
    // get a reference to the list box
    var listBox = $("#listBox").data("kendoListBox");
    listBox.remove(listBox.items().first());
    </script>

#### To set after initialization

    <select id="listBox"></select>
    <script>
    $("#listBox").kendoListBox({
        template: "<div>#: name#</div>",
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
        console.log("remove");
        e.preventDefault();
    });
    listBox.remove(listBox.items().first());
    </script>

#### Event Data

##### e.items `Array`

The item elements to be removed.

##### e.dataItems `Array`

The data items to be removed.

### reorder

Fires when items in the widget are reordered.

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

#### Event Data

##### e.items `Array`

The item elements to be reordered.

##### e.dataItems `Array`

The data items to be reordered.

#### e.offset `Number`

The offset is -1 when moving up and 1 when moving down.
