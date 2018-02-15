---
title: ListBox
description: Configuration, methods and events of the Kendo UI ListBox
res_type: api
component: listbox
---

# kendo.ui.ListBox

## Configuration

### autoBind `Boolean` *(default: true)*

If set to `false`, the widget will not bind to the data source during initialization. In this case, the data binding will occur when the [`change`](/api/javascript/data/datasource/events/change) event of the data source is fired. By default, the ListBox will bind to the data source that is specified in the configuration.

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

 The `id` of the target ListBox to which items from the source ListBox will be transferred and vice versa. If you have to transfer items from the target ListBox over its toolbar, then you also need to set its `connectWith` option.

> * It is not recommended to set the same `connectWith` option on two or more ListBoxes because the behavior of the `transferFrom` and `transferAllFrom` [tools](/api/javascript/ui/listbox/configuration/toolbar.tools) is not deterministic.
> * Configuring a bi-directional relationship between two ListBoxes results in duplicated behavior of their `transferTo` and `transferFrom` options, and `transferAllTo` and `transferAllFrom` tools. If your project does not require such behavior, remove some of the relationships from the [tools](/api/javascript/ui/listbox/configuration/toolbar.tools) option.

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

### draggable.enabled `Boolean` *(default: true)*

Indicates whether dragging is enabled.

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

### messages.tools `Object`

Defines the localization texts for tools in the ListBox. Texts are used when you configure the tooltip and accessibility support.

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

### clearSelection

Clears the selected items of the ListBox and triggers the `change` event.

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
    var dataItem = listbox.dataItem(".k-item:first");
    console.log(dataItem.name); // displays "foo"
    </script>

### dataItems

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
        console.log(listBox.dataItems()) //will output the bound array
    </script>

### destroy

Prepares the ListBox for a safe removal from the DOM. Detaches all event handlers and removes the `jQuery.data` attributes to avoid memory leaks. Calls the `destroy` method of child Kendo UI widgets.

> This method does not remove the ListBox element from the DOM.

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
    listBox.enable(".k-item:first", false);
    </script>

### items

Obtains an array of the DOM elements which correspond to the data items from the [`view`](/api/javascript/data/datasource/methods/view) method of the Kendo UI DataSource.

#### Returns

`Array` - The currently rendered view items ( depending on the item template, `<div>`, `<li>`, `<tr>`, and other elements).

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
    console.log(items); // logs the items
    </script>

### refresh

Reloads the data and repaints the ListBox. Triggers the [`dataBound`](/api/javascript/ui/listbox/events/databound) event.

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
    listBox.reorder(".k-item:first", 2);
    </script>

### remove

Removes items from the widget.

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

#### Parameters

##### items `jQuery|Array`

The items that are to be selected.

#### Returns

`jQuery` - The selected items if called without arguments.

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

### setDataSource

Sets the dataSource of an existing ListBox and rebinds it.

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

Fires when the dragging of the ListBox items starts.

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
             console.log("drag event");
         }
    });
    </script>

### drop

Fires when a ListBox item is dropped over one of the drop targets.

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
             console.log("drop event");
         }
    });
    </script>

### dragend

Fires when the dragging of the item ends but before its position is changed in the DOM.

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
            console.log(e.items);
            console.log(e.dataItems);
        }
    });
    </script>

### remove

Fires before an item is removed from the ListBox.

The function context of the event handler (available through the `this` keyword) that will be set to the widget instance.

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

### reorder

Fires when ListBox items are reordered.

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
