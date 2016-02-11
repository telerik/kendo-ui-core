---
title: TreeView
page_title: Configuration, methods and events of Kendo UI TreeView
description: Documentation guide that helps the developer configure TreeView UI widget in a few quick steps, apply methods and trigger events.
---

# kendo.ui.TreeView

Represents the Kendo UI TreeView. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### animation `Boolean|Object`

A collection of visual animations used when items are expanded or collapsed through user interaction.
Setting this option to **false** will disable all animations.

#### Example - disable animation of subnodes

    <div id="treeview"></div>
    <script>
    $("#treeview").kendoTreeView({
      animation: false,
      dataSource: [
        { text: "foo", items: [
          { text: "bar" }
        ] }
      ]
    });
    </script>

### animation.collapse `Boolean|Object`

The animation that will be used when collapsing items.

#### Example - disable the collapse animation

    <div id="treeview"></div>
    <script>
    $("#treeview").kendoTreeView({
      animation: {
        collapse: false
      },
      dataSource: [
        { text: "foo", items: [
          { text: "bar" }
        ] }
      ]
    });
    </script>

### animation.collapse.duration `Number` *(default: 200)*

The number of milliseconds used for the animation when a node is expanded.

#### Example - specify a collapse animation duration

    <div id="treeview"></div>
    <script>
    $("#treeview").kendoTreeView({
      animation: {
        collapse: {
          duration: 400
        }
      },
      dataSource: [
        { text: "foo", items: [
          { text: "bar" }
        ] }
      ]
    });
    </script>

### animation.collapse.effects `String`

A whitespace-delimited string of animation effects that are used when collapsing nodes.
The supported effects are **fadeOut** and **collapseVertical**.

#### Example - make sub-levels fade out and collapse vertically

    <div id="treeview"></div>
    <script>
    $("#treeview").kendoTreeView({
      animation: {
        collapse: {
          effects: "fadeOut collapseVertical"
        }
      },
      dataSource: [
        { text: "foo", items: [
          { text: "bar" }
        ] }
      ]
    });
    </script>

### animation.expand `Boolean|Object`

The animation that will be used when expanding items.

#### Example - disable expand animation

    <div id="treeview"></div>
    <script>
    $("#treeview").kendoTreeView({
      animation: {
        expand: false
      },
      dataSource: [
        { text: "foo", items: [
          { text: "bar" }
        ] }
      ]
    });
    </script>

### animation.expand.duration `Number` *(default: 200)*

The number of milliseconds used for the animation when a
node is expanded.

#### Example - specify a slow expand animation

    <div id="treeview"></div>
    <script>
    $("#treeview").kendoTreeView({
      animation: {
        expand: {
          duration: 600
        }
      },
      dataSource: [
        { text: "foo", items: [
          { text: "bar" }
        ] }
      ]
    });
    </script>

### animation.expand.effects `String` *(default: "expandVertical")*

A whitespace-delimited string of animation effects that are used when expanding nodes.
The supported effects are **"expandVertical"** and **"fadeIn"**.

#### Example - make sub-levels fade in and expand vertically

    <div id="treeview"></div>
    <script>
    $("#treeview").kendoTreeView({
      animation: {
        expand: {
          effects: "fadeIn expandVertical"
        }
      },
      dataSource: [
        { text: "foo", items: [
          { text: "bar" }
        ] }
      ]
    });
    </script>

### autoBind `Boolean` *(default: true)*

If set to `false` the widget will not bind to the data source during initialization. In this case data binding will occur when the [change](/api/javascript/data/datasource#events-change) event of the
data source is fired. By default the widget will bind to the data source specified in the configuration.

> Setting `autoBind` to `false` is useful when multiple widgets are bound to the same data source. Disabling automatic binding ensures that the shared data source does not make more than one request to the remote service.

#### Example - disable automatic binding

    <div id="treeview"></div>
    <script>
    var dataSource = new kendo.data.HierarchicalDataSource({
      data: [ { text: "Jane Doe" }, { text: "John Doe" }]
    });
    $("#treeview").kendoTreeView({
      autoBind: false,
      dataSource: dataSource
    });
    dataSource.read(); // "read()" will fire the "change" event of the dataSource and the widget will be bound
    </script>

### autoScroll `Boolean`*(default: false)*

If set to `true` the widget will auto-scroll the containing element when the mouse/finger is close to the top/bottom of it.

> If the scroll container is different than the TreeView container, set `overflow: hidden` on the TreeView container.

#### Example - use autoScroll in a scrollable container

    <div style="height: 200px; overflow: auto">
        <div style="height:1500px">
            <div id="treeview"></div>
        </div>
    </div>
    <script>
    var dataSource = new kendo.data.HierarchicalDataSource({
      data: [ { text: "Jane Doe" }, { text: "John Doe" }]
    });

    $("#treeview").kendoTreeView({
      autoScroll: true,
      dataSource: dataSource
    });
    dataSource.read(); // "read()" will fire the "change" event of the dataSource and the widget will be bound
    </script>

### checkboxes `Boolean|Object`

If `true` or an object, renders checkboxes beside each node.

#### Example - show node checkboxes

    <div id="treeview"></div>
    <script>
    $("#treeview").kendoTreeView({
      checkboxes: true,
      dataSource: [
        { text: "foo", items: [
          { text: "bar" }
        ] }
      ]
    });
    </script>

### checkboxes.checkChildren `Boolean`*(default: false)*

Indicates whether checkboxes of child items should get checked when the checkbox of a parent item is checked. This
also enables tri-state checkboxes with an indeterminate state.

#### Example - enable tri-state checkboxes and propagate checked state to children

    <div id="treeview"></div>
    <script>
    $("#treeview").kendoTreeView({
      checkboxes: {
        checkChildren: true
      },
      dataSource: [
        { text: "foo", items: [
          { text: "bar" }
        ] }
      ]
    });
    </script>

### checkboxes.name `String`

Sets the name attribute of the checkbox inputs. That name will be posted to the server.

#### Example

    <div id="treeview"></div>
    <script>
    $("#treeview").kendoTreeView({
      checkboxes: {
        name: "checkedItems[]"
      },
      dataSource: [
        { text: "foo", items: [
          { text: "bar" }
        ] }
      ]
    });
    </script>

### checkboxes.template `String|Function`

The [template](/api/javascript/kendo#methods-template) which renders the checkboxes. Can be used to allow posting of
additional information along the TreeView checkboxes.

The fields which can be used in the template are:

* item - the data item of the given node
* treeview - the TreeView options

#### Example - specify a different name for each checkbox, bound to the item id

    <div id="treeview"></div>
    <script>
    $("#treeview").kendoTreeView({
      checkboxes: {
        template: "<input type='checkbox' name='checkedFiles[#= item.id #]' value='true' />"
      },
      dataSource: [
        { id: 1, text: "foo", items: [
          { id: 2, text: "bar" }
        ] }
      ]
    });
    </script>

### dataImageUrlField `String` *(default: null)*

Sets the field of the data item that provides the image URL of the TreeView nodes.

#### Example - specify custom image URL field

    <div id="treeview"></div>
    <script>
    var items = [
      { text: "Mail", image: "http://demos.telerik.com/kendo-ui/content/web/treeview/mail.png" },
      { text: "Search", image: "http://demos.telerik.com/kendo-ui/content/web/treeview/search.png" }
    ];
    $("#treeview").kendoTreeView({
      dataImageUrlField: "image",
      dataSource: items
    });
    </script>

### dataSource `Object|Array|kendo.data.HierarchicalDataSource`

The data source of the widget which is used render nodes. Can be a JavaScript object which represents a valid data source configuration, a JavaScript array or an existing [kendo.data.HierarchicalDataSource](/api/javascript/data/hierarchicaldatasource) instance.

If the `dataSource` option is set to a JavaScript object or array the widget will initialize a new [kendo.data.HierarchicalDataSource](/api/javascript/data/hierarchicaldatasource) instance using that value as data source configuration.

If the `dataSource` option is an existing [kendo.data.HierarchicalDataSource](/api/javascript/data/hierarchicaldatasource) instance the widget will use that instance and will **not** initialize a new one.

#### Example - set dataSource as a JavaScript object

    <div id="treeview"></div>
    <script>
    $("#treeview").kendoTreeView({
      dataSource: {
        data: [
          { text: "foo", items: [
            { text: "bar" }
          ] }
        ]
      }
    });
    </script>

#### Example - set dataSource as a JavaScript array

    <div id="treeview"></div>
    <script>
    $("#treeview").kendoTreeView({
      dataSource: [
        { text: "foo", items: [
          { text: "bar" }
        ] }
      ]
    });
    </script>

#### Example - set dataSource as an existing kendo.data.HierarchicalDataSource instance

    <div id="treeview"></div>
    <script>
    var dataSource = new kendo.data.HierarchicalDataSource({
      transport: {
        read: {
          url: "http://demos.telerik.com/kendo-ui/service/Employees",
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

    $("#treeview").kendoTreeView({
      dataSource: dataSource,
      dataTextField: "FullName"
    });
    </script>

### dataSpriteCssClassField `String` *(default: null)*

Sets the field of the data item that provides the sprite CSS class of the nodes.
If an array, each level uses the field that is at the same index in the array, or the last item in the array.

#### Example

    <style>
      #treeview .k-sprite {
        background-image: url("http://demos.telerik.com/kendo-ui/content/web/treeview/coloricons-sprite.png");
      }

      .folder { background-position: 0 -16px; }
      .html { background-position: 0 -48px; }
    </style>

    <div id="treeview"></div>
    <script>
    var items = [
      { text: "assets", sprite: "folder" },
      { text: "index.html", sprite: "html" }
    ];
    $("#treeview").kendoTreeView({
      dataSpriteCssClassField: "sprite",
      dataSource: items
    });
    </script>

### dataTextField `String|Array` *(default: null)*

Sets the field of the data item that provides the text content of the nodes.
If an array, each level uses the field that is at the same index in the array, or the last item in the array.

#### Example

    <div id="treeview"></div>
    <script>
    var items = [
      { ProductName: "Tea", items: [
        { ProductName: "Green Tea" },
        { ProductName: "Black Tea" }
      ] },
      { ProductName: "Coffee" }
    ];
    $("#treeview").kendoTreeView({
      dataTextField: "ProductName",
      dataSource: items
    });
    </script>

#### Example - using different fields on different levels

    <div id="treeview"></div>
    <script>
    var items = [
      { CategoryName: "Tea", items: [
        { ProductName: "Green Tea" },
        { ProductName: "Black Tea" }
      ] },
      { CategoryName: "Coffee" }
    ];
    $("#treeview").kendoTreeView({
      dataTextField: [ "CategoryName", "ProductName" ],
      dataSource: items
    });
    </script>

### dataUrlField `String` *(default: null)*

Sets the field of the data item that provides the link URL of the nodes.

#### Example

    <div id="treeview"></div>
    <script>
    var items = [
      { text: "Tea", LinksTo: "http://tea.example.com" },
      { text: "Coffee", LinksTo: "http://coffee.example.com" }
    ];
    $("#treeview").kendoTreeView({
      dataUrlField: "LinksTo",
      dataSource: items
    });
    </script>

### dragAndDrop `Boolean` *(default: false)*

Disables (**false**) or enables (**true**) drag-and-drop of the nodes.

#### Example

    <div id="treeview"></div>
    <script>
    $("#treeview").kendoTreeView({
      dragAndDrop: true,
      dataSource: [
        { text: "foo" },
        { text: "bar" }
      ]
    });
    </script>

### loadOnDemand `Boolean` *(default: true)*

Indicates whether the child DataSources should be fetched lazily when parent groups get expanded.
Setting this to false causes all child DataSources to be loaded at initialization time.

> Note: when initializing the widget from an array (rather than from a HierarchicalDataSource instance), this option defaults to false, rather than true.

#### Example - force lazy loading of sublevels

    <div id="treeview"></div>
    <script>
    $("#treeview").kendoTreeView({
      loadOnDemand: true,
      dataSource: [
        { text: "foo", items: [
          { text: "bar" }
        ] }
      ]
    });
    </script>

### messages `Object`

The text messages displayed in the widget. Use it to customize or localize the messages.

#### Example - customize TreeView messages

    <div id="treeview"></div>
    <script>
    $("#treeview").kendoTreeView({
      dataSource: {
        transport: {
          read: function(options) {
            // request always fails after 1s
            setTimeout(function() {
              options.error({});
            }, 1000);
          }
        }
      },
      messages: {
        retry: "Wiederholen",
        requestFailed: "Anforderung fehlgeschlagen.",
        loading: "Laden..."
      }
    });
    </script>

### messages.loading `String` *(default: "Loading...")*

The text message shown while the root level items are loading.

#### Example - customize loading message

    <div id="treeview"></div>
    <script>
    $("#treeview").kendoTreeView({
      dataSource: {
        transport: {
          read: function(options) {
            // request always fails after 1s
            setTimeout(function() {
              options.error({});
            }, 1000);
          }
        }
      },
      messages: {
        loading: "Laden..."
      }
    });
    </script>

### messages.requestFailed `String` *(default: "Request failed.")*

The text message shown when an error occurs while fetching the content.

#### Example - customize requestFailed message

    <div id="treeview"></div>
    <script>
    $("#treeview").kendoTreeView({
      dataSource: {
        transport: {
          read: function(options) {
            // request always fails after 1s
            setTimeout(function() {
              options.error({});
            }, 1000);
          }
        }
      },
      messages: {
        requestFailed: "Anforderung fehlgeschlagen."
      }
    });
    </script>

### messages.retry `String` *(default: "Retry")*

The text message shown in the retry button.

#### Example - customize retry message

    <div id="treeview"></div>
    <script>
    $("#treeview").kendoTreeView({
      dataSource: {
        transport: {
          read: function(options) {
            // request always fails after 1s
            setTimeout(function() {
              options.error({});
            }, 1000);
          }
        }
      },
      messages: {
        retry: "Wiederholen"
      }
    });
    </script>

### template `String|Function`

Template for rendering each node.

#### Example

    <div id="treeview"></div>
    <script>
    $("#treeview").kendoTreeView({
      template: "#= item.text # (#= item.inStock #)",
      dataSource: [
        { text: "foo", inStock: 7, items: [
          { text: "bar", inStock: 2 },
          { text: "baz", inStock: 5 }
        ] }
      ]
    });
    </script>

## Methods

### append

Appends a node to any level of the TreeView . This method may also be used to reorder nodes.

#### Example

    <div id="treeview"></div>
    <script>
    $("#treeview").kendoTreeView({
      dataSource: [
        { text: "foo" }
      ]
    });

    var treeview = $("#treeview").data("kendoTreeView");
    // appends a new node to the root level
    treeview.append({ text: "bar" });

    // appends a new node to the first treeview item
    treeview.append({ text: "baz" }, $("#treeview .k-item:first"));

    // move the item with text "bar" within the item with text "foo"
    treeview.append(treeview.findByText("bar"), treeview.findByText("foo"));

    // append two items to the root level
    treeview.append([
      { text: "qux" },
      { text: "cat" }
    ]);
    </script>

#### Parameters

##### nodeData `Object|jQuery`

A JSON-formatted string or selector that specifies the node to be appended.
If the argument is a plain JavaScript object, a new item will be created.
If the argument is a jQuery element that holds a node, the TreeView node will be moved.
If the argument is an array of objects, each item of the array will be appended.

##### parentNode `jQuery` *(optional)*

The node that will contain the newly appended node. If not specified, the new node will be appended to the
root group of the TreeView.

##### success `Function` *(optional)*

A success callback that will be called once the new node has been appended.
Useful in the case of remote binding where an item is appended to an unfetched node. The callback is called
once the siblings have been fetched.

#### Returns

`jQuery` The inserted `<li>` element, wrapped in a jQuery object,
or `null` if the new model has not been inserted immediately.

### collapse

Collapses nodes.

#### Example

    <div id="treeview"></div>
    <script>
    $("#treeview").kendoTreeView({
      dataSource: [
        { text: "foo", expanded: true, items: [
          { text: "bar" }
        ] },
        { text: "baz", expanded: true, items: [
          { text: "qux" }
        ] }
      ]
    });

    var treeview = $("#treeview").data("kendoTreeView");
    // collapse the item with text "foo"
    treeview.collapse(treeview.findByText("foo"));

    // collapse all items
    treeview.collapse(".k-item");
    </script>

#### Parameters

##### nodes `jQuery|Element|String`

The nodes that will be collapsed.

### dataItem

Returns the data item to which the specified node is bound.

#### Parameters

##### node `jQuery|Element|String`

A string, DOM element or jQuery object which represents the node. A string is treated as a jQuery selector.

#### Returns

`kendo.data.Node` The model of the item that was passed as a parameter.

#### Example - get the data item of the first node

    <div id="treeview"></div>
    <script>
    $("#treeview").kendoTreeView({
      dataSource: [
        { id: 1, text: "foo" },
        { id: 2, text: "bar" }
      ]
    });

    var treeview = $("#treeview").data("kendoTreeView");
    var dataItem = treeview.dataItem(".k-item:first");
    console.log(dataItem.text); // displays "foo"
    </script>

See also: [getting the node data in the select event handler](/web/treeview/overview#getting-the-node-data-in-the-select-event-handler)

### destroy

Prepares the widget for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> This method does not remove the widget element from DOM.

#### Example

    <div id="treeview"></div>
    <script>
    $("#treeview").kendoTreeView({
      dataSource: [
        { id: 1, text: "foo" },
        { id: 2, text: "bar" }
      ]
    });

    var treeview = $("#treeview").data("kendoTreeView");
    treeview.destroy();
    </script>

### detach

Removes a node from a TreeView, but keeps its jQuery.data() objects.

#### Parameters

##### node `jQuery|Element|String`

The node that is to be detached.

#### Returns

`jQuery` The node that has been detached.

#### Example - remove the node with ID, firstItem

    <div id="treeview"></div>
    <script>
    $("#treeview").kendoTreeView({
      dataSource: [
        { id: 1, text: "foo" },
        { id: 2, text: "bar" }
      ]
    });

    var treeview = $("#treeview").data("kendoTreeView");
    var item = treeview.findByText("foo");
    item.data("id", "abc");
    treeview.detach(item);
    console.log(item.data("id")); // logs "abc"
    </script>

### enable

Enables or disables nodes.

#### Parameters

##### nodes `jQuery|Element|String`

The nodes that are to be enabled/disabled.

##### enable `Boolean` *(optional, default: true)*

Whether the nodes should be enabled or disabled.

#### Example

    <div id="treeview"></div>
    <script>
    $("#treeview").kendoTreeView({
      dataSource: [
        { text: "foo", enabled: false },
        { text: "bar", enabled: false }
      ]
    });

    var treeview = $("#treeview").data("kendoTreeView");
    // enable the item with text "foo"
    treeview.enable(treeview.findByText("foo"));

    // enable all items
    treeview.enable(".k-item");
    </script>

### expand

Expands collapsed nodes.

#### Parameters

##### nodes `jQuery|Element|String`

The nodes that are to be expanded.

#### Example

    <div id="treeview"></div>
    <script>
    $("#treeview").kendoTreeView({
      dataSource: [
        { text: "foo", items: [
          { text: "bar" }
        ] },
        { text: "baz" }
      ]
    });

    var treeview = $("#treeview").data("kendoTreeView");
    // expand the item with text "foo"
    treeview.expand(treeview.findByText("foo"));

    // expand all loaded items
    treeview.expand(".k-item");
    </script>

### expandPath

Expands all nodes to a given element. Nodes may be loaded from a remote end-point.

#### Parameters

##### path `Array`

The IDs of the nodes that need to be expanded.

##### complete `Function`

Callback function that will be called once the path has been expanded.

#### Example

    <div id="treeview"></div>
    <script>
    $("#treeview").kendoTreeView({
      dataSource: [
        { id: 1, text: "foo", items: [
          { id: 2, text: "bar", items: [
            { id: 3, text: "baz" }
          ] }
        ] }
      ]
    });

    var treeview = $("#treeview").data("kendoTreeView");

    // expand the path of nodes with IDs 1, 2, and 3
    treeview.expandPath([1, 2, 3]);

    </script>

#### Example of expanding a remote loaded path

    <button class="k-button">Expand</button>
    <div id="treeview"></div>

    <script>
      var datasource = new kendo.data.HierarchicalDataSource({
        transport: {
          read: {
            url: "http://demos.telerik.com/kendo-ui/service/Employees",
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

      $("#treeview").kendoTreeView({
        dataSource: datasource,
        dataTextField: "FullName"
      });

      $("button").click(function() {
        var treeview = $("#treeview").data("kendoTreeView");

        treeview.expandPath([2, 5]);
      });
    </script>

### expandTo

Expands all nodes up to a given element. The element needs to be already loaded.

#### Parameters

##### targetNode `kendo.data.Node|Object`

The dataItem of the node up to which to expand. Can also be the node ID

#### Example

    <div id="treeview"></div>
    <script>
    $("#treeview").kendoTreeView({
      dataSource: [
        { id: 1, text: "foo", items: [
          { id: 2, text: "bar", items: [
            { id: 3, text: "baz" }
          ] }
        ] },
        { text: "one", items: [
          { text: "two", items: [
            { text: "three" }
          ] }
        ] }
      ]
    });

    var treeview = $("#treeview").data("kendoTreeView");

    // expand all nodes up to "baz" (with id = 3)
    treeview.expandTo(3);


    // expand all nodes up to "three"
    var three = treeview.dataItem(treeview.findByText("three"));
    treeview.expandTo(three);

    </script>

### findByText

Searches for a node that has specific text.

#### Parameters

##### text `String`

The text that is being searched for.

#### Returns

`jQuery` All nodes that have the text.

#### Example

    <div id="treeview"></div>
    <script>
    $("#treeview").kendoTreeView({
      dataSource: [
        { text: "foo" },
        { text: "bar" }
      ]
    });

    var treeview = $("#treeview").data("kendoTreeView");
    // find the node with text "foo"
    var foo = treeview.findByText("foo");
    console.log(foo);
    </script>

### findByUid

Searches for a node with the given unique identifier.
Applicable when the widget is bound to a [HierarchicalDataSource](/api/javascript/data/hierarchicaldatasource).
If you want to find a node by its `id`, use the [dataSource.get()](/api/javascript/data/datasource#get) method and supply its uid to the `findByUid` method.

#### Parameters

##### text `String`

The text that is being searched for.

#### Returns

`jQuery` All nodes that have the text.

#### Example

    <div id="treeview"></div>
    <script>
    $("#treeview").kendoTreeView({
      dataSource: [
        { id: 1, text: "foo" },
        { id: 2, text: "bar" }
      ]
    });

    var treeview = $("#treeview").data("kendoTreeView");
    var barDataItem = treeview.dataSource.get(2);
    var barElement = treeview.findByUid(barDataItem.uid);
    console.log(barElement);
    </script>

### insertAfter

Inserts a node after a specified node.
This method may also be used to reorder nodes.

#### Parameters

##### nodeData `Object`

A JSON-formatted string or selector that specifies the node to be inserted.

##### referenceNode `jQuery`

The node that will precede the newly-appended node.

#### Example

    <div id="treeview"></div>
    <script>
    $("#treeview").kendoTreeView({
      dataSource: [
        { text: "foo" }
      ]
    });

    var treeview = $("#treeview").data("kendoTreeView");
    var foo = treeview.findByText("foo");

    // insert "bar" after "foo"
    treeview.insertAfter({ text: "bar" }, foo);

    // move the node "foo" after the node "bar"
    treeview.insertAfter(foo, treeview.findByText("bar"));
    </script>

### insertBefore

Inserts a node before another node. This method may also be used to reorder nodes.

#### Parameters

##### nodeData `Object`

A JSON-formatted string or selector that specifies the node to be inserted.

##### referenceNode `jQuery`

The node that follows the inserted node.

#### Example

    <div id="treeview"></div>
    <script>
    $("#treeview").kendoTreeView({
      dataSource: [
        { text: "foo" }
      ]
    });

    var treeview = $("#treeview").data("kendoTreeView");
    var foo = treeview.findByText("foo");

    // insert "bar" before "foo"
    treeview.insertBefore({ text: "bar" }, foo);

    // move the node "foo" before the node "bar"
    treeview.insertBefore(foo, treeview.findByText("bar"));
    </script>

### items

Obtains an Array of the DOM elements, which correspond to the data items from the Kendo UI DataSource [view](/api/javascript/data/datasource#methods-view).

#### Returns

`Array` The currently rendered tree items (`<div>` elements, that are children of the `<li>` elements).

### parent

Gets the parent node of the item

#### Parameters

##### node `jQuery|Element|String`

The child node whose parent will be returned.

#### Returns

`jQuery` The parent node of the given parameter node.

#### Example

    <div id="treeview"></div>
    <script>
    $("#treeview").kendoTreeView({
      dataSource: [
        { text: "foo", items: [
          { text: "bar" }
        ] }
      ]
    });

    var treeview = $("#treeview").data("kendoTreeView");

    var parent = treeview.parent(treeview.findByText("bar"));
    console.log(treeview.text(parent)); // logs "foo"

    parent = treeview.parent(parent);
    console.log(parent.length); // logs 0
    </script>

### remove

Removes a node from the widget.

#### Parameters

##### node `jQuery|Element|String`

The node that is to be removed.

#### Example

    <div id="treeview"></div>
    <script>
    $("#treeview").kendoTreeView({
      dataSource: [
        { text: "foo", items: [
          { text: "bar" }
        ] }
      ]
    });

    var treeview = $("#treeview").data("kendoTreeView");

    var bar = treeview.findByText("bar");

    treeview.remove(bar);

    console.log($("#treeview").find(".k-item").length); // logs 1
    </script>

### select

Gets or sets the selected node.

#### Parameters

##### node `jQuery|Element|String` *(optional)*

If provided, the node that should be selected.

#### Returns

`jQuery` The currently selected node.

#### Example

    <div id="treeview"></div>
    <script>
    $("#treeview").kendoTreeView({
      dataSource: [
        { text: "foo", items: [
          { text: "bar" }
        ] }
      ]
    });

    var treeview = $("#treeview").data("kendoTreeView");

    var bar = treeview.findByText("bar");
    treeview.select(bar);

    console.log(treeview.text(treeview.select())); // logs "bar"

    treeview.select($()); // clears selection
    </script>

### setDataSource

Sets and binds a dataSource to the widget.

> Note: Calling this method with an array will not change the loadOnDemand flag, unlike initialization with an array option.

#### Parameters

##### dataSource `kendo.data.HierarchicalDataSource`

The new dataSource that the widget will bind to

#### Example

    <div id="treeview"></div>
    <script>
    $("#treeview").kendoTreeView({
      dataSource: [
        { text: "foo", items: [
          { text: "bar" }
        ] }
      ]
    });

    var treeview = $("#treeview").data("kendoTreeView");

    treeview.setDataSource(new kendo.data.HierarchicalDataSource({
      data: [
        { text: "bar", items: [
          { text: "baz" }
        ] }
      ]
    }));
    </script>

### text

Gets or sets the text of a node in a TreeView.

#### Parameters

##### node `jQuery|Element|String`

The node of which the text is being retrieved or set.

##### newText `String`

Optional. When passed, sets the node text to the specified string

#### Returns

`String` The text of a node.

#### Example

    <div id="treeview"></div>
    <script>
    $("#treeview").kendoTreeView({
      dataSource: [
        { text: "foo", items: [
          { text: "bar" }
        ] }
      ]
    });

    var treeview = $("#treeview").data("kendoTreeView");

    var firstItem = treeview.element.find(".k-item:first");
    console.log(treeview.text(firstItem)); // logs "foo"

    treeview.text(".k-item:last", "qux"); // sets text to "qux"
    </script>

### toggle

Toggles the node of a TreeView between its expanded and collapsed states.

#### Parameters

##### node `jQuery|Element|String`

The node that should be toggled.

#### Example

    <div id="treeview"></div>
    <script>
    $("#treeview").kendoTreeView({
      dataSource: [
        { text: "foo", items: [
          { text: "bar" }
        ] },
        { text: "baz", items: [
          { text: "qux" }
        ] }
      ]
    });

    var treeview = $("#treeview").data("kendoTreeView");

    treeview.toggle(".k-item:first");

    var baz = treeview.findByText("baz");
    treeview.toggle(baz);
    </script>

### updateIndeterminate

Updates the indeterminate state of the TreeView checkboxes.
Call it after using the insert / remove API on TreeViews with [checkChildren: true](#configuration-checkboxes.checkChildren).
Use to improve performance when checking multiple checkboxes through code.

#### Parameters

##### node `jQuery`

Optional. The root of the hierarchy that will be looped through. Allows only a subtree to be processed. The default value is the TreeView root.

#### Example

    <div id="treeview"></div>
    <script>
    $("#treeview").kendoTreeView({
      checkboxes: {
        checkChildren: true
      },
      dataSource: [
        { text: "foo", expanded: true, items: [
          { text: "bar" },
          { text: "baz" },
          { text: "qux" }
        ] }
      ]
    });

    $(":checkbox").filter(function() {
      var text = $(this).parent().next().text();
      return text != "bar" && text != "foo";
    }).prop("checked", true);

    var treeview = $("#treeview").data("kendoTreeView");
    treeview.updateIndeterminate();
    </script>

## Events

### change

Triggered when the selection has changed (either by the user or through the `select` method).

#### Example - subscribe to the "change" event during initialization

    <div id="treeview"></div>
    <script>
    $("#treeview").kendoTreeView({
      dataSource: [
        { text: "foo", items: [
          { text: "bar" }
        ] }
      ],
      change: function(e) {
        console.log("Change", this.select());
      }
    });
    </script>

#### Example - subscribe to the "change" event after initialization

    <div id="treeview"></div>
    <script>
    function tree_change(e) {
      console.log("Change", this.select());
    }
    $("#treeview").kendoTreeView({
      dataSource: [
        { text: "foo", items: [
          { text: "bar" }
        ] }
      ]
    });
    var treeview = $("#treeview").data("kendoTreeView");
    treeview.bind("change", tree_change);
    </script>

### check

Triggered after the user has checked or unchecked a checkbox.
If [checkChildren](#checkboxes.checkChildren) is `true`, the event is triggered after all checked states are updated.
This event has been introduced in internal builds after 2014.2.828.

#### Event Data

##### e.node `Element`

The node whose the checkbox has been checked.

#### Example - subscribe to the "check" event during initialization

    <div id="treeview"></div>
    <script>
    $("#treeview").kendoTreeView({
      dataSource: [
        { text: "foo", items: [
          { text: "bar" }
        ] }
      ],
      check: function(e) {
        console.log("Checking", e.node);
      }
    });
    </script>

#### Example - subscribe to the "check" event after initialization

    <div id="treeview"></div>
    <script>
    function tree_check(e) {
      console.log("Checking", e.node);
    }
    $("#treeview").kendoTreeView({
      dataSource: [
        { text: "foo", items: [
          { text: "bar" }
        ] }
      ]
    });
    var treeview = $("#treeview").data("kendoTreeView");
    treeview.bind("check", tree_check);
    </script>

### collapse

Triggered before a subgroup gets collapsed. Cancellable.

#### Event Data

##### e.node `Element`

The collapsed node

#### Example - subscribe to the "collapse" event during initialization

    <div id="treeview"></div>
    <script>
    $("#treeview").kendoTreeView({
      dataSource: [
        { text: "foo", items: [
          { text: "bar" }
        ] }
      ],
      collapse: function(e) {
        console.log("Collapsing", e.node);
      }
    });
    </script>

#### Example - subscribe to the "collapse" event after initialization

    <div id="treeview"></div>
    <script>
    function tree_collapse(e) {
      console.log("Collapsing", e.node);
    }
    $("#treeview").kendoTreeView({
      dataSource: [
        { text: "foo", items: [
          { text: "bar" }
        ] }
      ]
    });
    var treeview = $("#treeview").data("kendoTreeView");
    treeview.bind("collapse", tree_collapse);
    </script>

### dataBound

Triggered after the dataSource change event has been processed (adding/removing items);

#### Event Data

##### e.node `jQuery`

The node whose children have been changed. If the changes have occurred on the root level, this parameter is undefined.

#### Example - subscribe to the "dataBound" event during initialization

    <div id="treeview"></div>
    <script>
    $("#treeview").kendoTreeView({
      dataSource: [
        { text: "foo", items: [
          { text: "bar" }
        ] }
      ],
      dataBound: function(e) {
        console.log("DataBound", e.node);
      }
    });
    </script>

#### Example - subscribe to the "dataBound" event after initialization

    <div id="treeview"></div>
    <script>
    function tree_databound(e) {
      console.log("DataBound", e.node);
    }
    $("#treeview").kendoTreeView({
      dataSource: [
        { text: "foo", items: [
          { text: "bar" }
        ] }
      ]
    });
    var treeview = $("#treeview").data("kendoTreeView");
    treeview.bind("dataBound", tree_dataBound);
    </script>

#### Example - show an empty message when no items have been loaded from the server

    <div id="treeview"></div>
    <script>
      $("#treeview").kendoTreeView({
        dataSource: [],
        dataBound: function(e) {
          if (!this.dataSource.data().length) {
            this.element.append("<p class='no-items'>No items yet.</p>");
          } else {
            this.element.find(".no-items").remove();
          }
        }
      });
    </script>

### drag

Triggered while a node is being dragged.

#### Event Data

##### e.sourceNode `Element`

The node that is being dragged.

##### e.dropTarget `Element`

The element that the node is placed over.

##### e.pageX `Number`

The x coordinate of the mouse.

##### e.pageY `Number`

The y coordinate of the mouse.

##### e.statusClass `String`

The status that the drag clue shows.

##### e.setStatusClass `Function`

Allows a custom drag clue status to be set.

Pre-defined status classes are:

*   **k-insert-top**
        - Indicates that the item will be inserted on top.
*   **k-insert-middle**
        - Indicates that the item will be inserted in the middle.
*   **k-insert-bottom**
        - Indicates that the item will be inserted at the bottom.
*   **k-add**
        - Indicates that the item will be added/appended.
*   **k-denied**
        - Indicates an invalid operation. Using this class will automatically
          make the drop operation invalid, so there will be no need to call
          `setValid(false)` in the `drop` event.

#### Example - subscribe to the "drag" event during initialization

    <div id="treeview"></div>
    <script>
    $("#treeview").kendoTreeView({
      dragAndDrop: true,
      dataSource: [
        { text: "foo", items: [
          { text: "bar" }
        ] }
      ],
      drag: function(e) {
        console.log("Drag", e.sourceNode, "over", e.dropTarget);
      }
    });
    </script>

#### Example - subscribe to the "drag" event after initialization

    <div id="treeview"></div>
    <script>
    function tree_drag(e) {
      console.log("Drag", e.sourceNode, "over", e.dropTarget);
    }
    $("#treeview").kendoTreeView({
      dragAndDrop: true,
      dataSource: [
        { text: "foo", items: [
          { text: "bar" }
        ] }
      ]
    });
    var treeview = $("#treeview").data("kendoTreeView");
    treeview.bind("drag", tree_drag);
    </script>

#### Example - disable node reordering

    <div id="treeview"></div>
    <script>
    $("#treeview").kendoTreeView({
      dragAndDrop: true,
      dataSource: [
        { text: "foo", items: [
          { text: "bar" },
          { text: "baz" }
        ] }
      ]
    });

    var treeview = $("#treeview").data("kendoTreeView");

    treeview.bind("drag", function(e) {
      // if the current status is "insert-top/middle/bottom"
      if (e.statusClass.indexOf("insert") >= 0) {
        // deny the operation
        e.setStatusClass("k-denied");
      }
    });
    </script>

### dragend

Triggered after a node has been dropped.

#### Event Data

##### e.sourceNode `Element`

The node that is being dropped.

##### e.destinationNode `Element`

The node that the sourceNode is being dropped upon.

##### e.dropPosition `String`

Shows where the source has been dropped. One of the values **over**, **before**, or **after**.

#### Example - subscribe to the "dragend" event during initialization

    <div id="treeview"></div>
    <script>
    $("#treeview").kendoTreeView({
      dragAndDrop: true,
      dataSource: [
        { text: "foo", items: [
          { text: "bar" }
        ] }
      ],
      dragend: function(e) {
        console.log("Drag end", e.sourceNode, e.dropPosition, e.destinationNode);
      }
    });
    </script>

#### Example - subscribe to the "dragend" event after initialization

    <div id="treeview"></div>
    <script>
    function tree_dragend(e) {
      console.log("Drag end", e.sourceNode, e.dropPosition, e.destinationNode);
    }
    $("#treeview").kendoTreeView({
      dragAndDrop: true,
      dataSource: [
        { text: "foo", items: [
          { text: "bar" }
        ] }
      ]
    });
    var treeview = $("#treeview").data("kendoTreeView");
    treeview.bind("dragend", tree_dragend);
    </script>

### dragstart

Triggered before the dragging of a node starts.

#### Event Data

##### e.sourceNode `Element`

The node that will be dragged.

#### Example - subscribe to the "dragstart" event during initialization

    <div id="treeview"></div>
    <script>
    $("#treeview").kendoTreeView({
      dragAndDrop: true,
      dataSource: [
        { text: "foo", items: [
          { text: "bar" }
        ] }
      ],
      dragstart: function(e) {
        console.log("Drag start", e.sourceNode);
      }
    });
    </script>

#### Example - subscribe to the "dragstart" event after initialization

    <div id="treeview"></div>
    <script>
    function tree_dragstart(e) {
      console.log("Drag start", e.sourceNode);
    }
    $("#treeview").kendoTreeView({
      dragAndDrop: true,
      dataSource: [
        { text: "foo", items: [
          { text: "bar" }
        ] }
      ]
    });
    var treeview = $("#treeview").data("kendoTreeView");
    treeview.bind("dragstart", tree_dragstart);
    </script>

#### Example - disable dragging of root nodes

    <div id="treeview"></div>
    <script>
    $("#treeview").kendoTreeView({
      dragAndDrop: true,
      dataSource: [
        { text: "foo", items: [
          { text: "bar" }
        ] }
      ],
      dragstart: function(e) {
        if ($(e.sourceNode).parentsUntil(".k-treeview", ".k-item").length == 0) {
          e.preventDefault();
        }
      }
    });
    </script>

### drop

Triggered when a node is being dropped.

#### Event Data

##### e.sourceNode `Element`

The node that is being dropped.

##### e.destinationNode `Element`

The node that the sourceNode is being dropped upon.

##### e.valid `Boolean`

Whether this drop operation is permitted.

##### e.setValid `Function`

Allows the drop to be prevented.

##### e.dropTarget `Element`

The element that the node is placed over.

##### e.dropPosition `String`

Shows where the source will be dropped. One of the values **over**, **before**, or **after**.

#### The difference between e.setValid(false) and e.preventDefault()

Both operations cancel the default drag operation, but the indication to the user is different.
`e.setValid(false)` indicates that the operation was unsuccessful by animating the drag clue to its original position.
`e.preventDefault()` simply removes the clue, as if it has been dropped.
As a general rule, use `preventDefault` to manually handle the drag&drop operation, and `setValid(false)` to indicate unsuccessful drag&drops.

#### Example - subscribe to the "drop" event during initialization

    <div id="treeview"></div>
    <script>
    $("#treeview").kendoTreeView({
      dragAndDrop: true,
      dataSource: [
        { text: "foo", items: [
          { text: "bar" }
        ] }
      ],
      drop: function(e) {
        console.log("Dropped", e.sourceNode);
      }
    });
    </script>

#### Example - subscribe to the "drop" event after initialization

    <div id="treeview"></div>
    <script>
    function tree_drop(e) {
      console.log("Dropped", e.sourceNode);
    }
    $("#treeview").kendoTreeView({
      dragAndDrop: true,
      dataSource: [
        { text: "foo", items: [
          { text: "bar" }
        ] }
      ]
    });
    var treeview = $("#treeview").data("kendoTreeView");
    treeview.bind("drop", tree_drop);
    </script>

### expand

Triggered before a subgroup gets expanded.

#### Event Data

##### e.node `Element`

The expanded node

#### Example - subscribe to the "expand" event during initialization

    <div id="treeview"></div>
    <script>
    $("#treeview").kendoTreeView({
      dataSource: [
        { text: "foo", items: [
          { text: "bar" }
        ] }
      ],
      expand: function(e) {
        console.log("Expand", e.node);
      }
    });
    </script>

#### Example - subscribe to the "expand" event after initialization

    <div id="treeview"></div>
    <script>
    function tree_expand(e) {
      console.log("Expand", e.node);
    }
    $("#treeview").kendoTreeView({
      dataSource: [
        { text: "foo", items: [
          { text: "bar" }
        ] }
      ]
    });
    var treeview = $("#treeview").data("kendoTreeView");
    treeview.bind("expand", tree_expand);
    </script>

### navigate

Triggered when the user moves the focus on another node

#### Event Data

##### e.node `Element`

The focused node

#### Example - subscribe to the "navigate" event during initialization

    <div id="treeview"></div>
    <script>
    $("#treeview").kendoTreeView({
      dataSource: [
        { text: "foo", items: [
          { text: "bar" }
        ] }
      ],
      navigate: function(e) {
        console.log("Navigated to", e.node);
      }
    });
    </script>

#### Example - subscribe to the "navigate" event after initialization

    <div id="treeview"></div>
    <script>
    function tree_navigate(e) {
      console.log("Navigating to", e.node);
    }
    $("#treeview").kendoTreeView({
      dataSource: [
        { text: "foo", items: [
          { text: "bar" }
        ] }
      ]
    });
    var treeview = $("#treeview").data("kendoTreeView");
    treeview.bind("navigate", tree_navigate);
    </script>

### select

Triggered when a node is being selected by the user. Cancellable.

#### Event Data

##### e.node `Element`

The selected node

#### Example - subscribe to the "select" event during initialization

    <div id="treeview"></div>
    <script>
    $("#treeview").kendoTreeView({
      dataSource: [
        { text: "foo", items: [
          { text: "bar" }
        ] }
      ],
      select: function(e) {
        console.log("Selecting", e.node);
      }
    });
    </script>

#### Example - subscribe to the "select" event after initialization

    <div id="treeview"></div>
    <script>
    function tree_select(e) {
      console.log("select", e.node);
    }
    $("#treeview").kendoTreeView({
      dataSource: [
        { text: "foo", items: [
          { text: "bar" }
        ] }
      ]
    });
    var treeview = $("#treeview").data("kendoTreeView");
    treeview.bind("select", tree_select);
    </script>

