---
title: PanelBar
page_title: Configuration, methods and events of Kendo UI PanelBar
description: Configure the PanelBar UI widget, use methods and explore the events which are triggered upon certain behaviors.
---

# kendo.ui.PanelBar

Represents the Kendo UI PanelBar widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### animation `Object|Boolean`

A collection of visual animations used when **PanelBar** items are expand or collapsed through
user interactions. Setting this option to `false` will disable all animations.

`animation:true` is not a valid configuration.

#### Example

    <ul id="panelbar">
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
        $("#panelbar").kendoPanelBar({
            animation: {
                // fade-out closing items over 1000 milliseconds
                collapse: {
                    duration: 1000,
                    effects: "fadeOut"
                },
               // fade-in and expand opening items over 500 milliseconds
               expand: {
                   duration: 500,
                   effects: "expandVertical fadeIn"
               }
           }
        });
    </script>

### animation.collapse `Object`

The visual animation(s) that will be used when **PanelBar** items are closed.

#### Example

    <ul id="panelbar">
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
        $("#panelbar").kendoPanelBar({
            animation: {
                collapse: {
                    duration: 200,
                    effects: "fadeOut"
                }
            }
        });
    </script>

### animation.collapse.duration `Number`*(default: 200)*

The number of milliseconds used for the visual animation when a **PanelBar** item is closed.

#### Example

    <ul id="panelbar">
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
        $("#panelbar").kendoPanelBar({
            animation: {
               collapse: {
                    duration: 1000
               }
          }
        });
    </script>

### animation.collapse.effects `String`

A whitespace-delimited string of animation effects that are utilized when a **PanelBar** item
is closed. Options include **"fadeOut"**.

#### Example

    <ul id="panelbar">
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
        $("#panelbar").kendoPanelBar({
            animation: {
                collapse: {
                    duration: 1000,
                    effects: "fadeOut"
                }
            }
        });
    </script>

### animation.expand `Object`

The visual animation(s) that will be used when opening items.

#### Example

    <ul id="panelbar">
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
        $("#panelbar").kendoPanelBar({
            animation: {
                expand: {
                    duration: 200,
                    effects: "expandVertical"
                }
            }
        });
    </script>

### animation.expand.duration `Number`*(default: 200)*

The number of milliseconds used for the visual animation when an item is opened.

#### Example

    <ul id="panelbar">
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
        $("#panelbar").kendoPanelBar({
         animation: {
              expand: {
                  duration: 1000
              }
           }
        });
    </script>

### animation.expand.effects `String`*(default: "expandVertical")*

A whitespace-delimited string of animation effects that are used when an item is expanded. Options include
**"expandVertical"** and **"fadeIn"**.

    <ul id="panelbar">
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
        $("#panelbar").kendoPanelBar({
            animation: {
                expand: {
                    effects: "expandVertical"
                }
            }
        });
    </script>

### autoBind `Boolean` *(default: true)*

If set to `false` the widget will not bind to the data source during initialization. In this case data binding will occur when the [change](/api/javascript/data/datasource#events-change) event of the
data source is fired. By default the widget will bind to the data source specified in the configuration.

> Setting `autoBind` to `false` is useful when multiple widgets are bound to the same data source. Disabling automatic binding ensures that the shared data source does not make more than one request to the remote service.

#### Example - disable automatic binding

    <div id="panelbar"></div>
    <script>
    var dataSource = new kendo.data.HierarchicalDataSource({
      data: [ { text: "Jane Doe" }, { text: "John Doe" }]
    });
    $("#panelbar").kendoPanelBar({
      autoBind: false,
      dataSource: dataSource
    });
    dataSource.read(); // "read()" will fire the "change" event of the dataSource and the widget will be bound
    </script>

### contentUrls `Array`

Sets an array with the URLs from which the **PanelBar** items content to be loaded from. If only specific items should be loaded via Ajax, then you should set the URLs to the corresponding positions in the array and set the other elements to null.

#### Example - specify that the second item should be loaded remotely

    <ul id="panelbar">
        <li>Item 1
          <div>Content 1</div>
        </li>
        <li>
            Ajax Item
            <div></div>
        </li>
    </ul>

    <script>
        $("#panelbar").kendoPanelBar({
            contentUrls: [
              null,
              "http://demos.telerik.com/kendo-ui/content/web/panelbar/ajax/ajaxContent1.html"
            ]
        });
    </script>

### dataImageUrlField `String` *(default: null)*

Sets the field of the data item that provides the image URL of the **PanelBar** nodes.

#### Example - specify custom image URL field

    <div id="panelbar"></div>
    <script>
    var items = [
      { text: "Baseball", image: "http://demos.telerik.com/kendo-ui/content/shared/icons/sports/baseball.png" },
      { text: "Golf", image: "http://demos.telerik.com/kendo-ui/content/shared/icons/sports/golf.png" }
    ];
    $("#panelbar").kendoPanelBar({
      dataImageUrlField: "image",
      dataSource: items
    });
    </script>

### dataSource `Object|Array|kendo.data.HierarchicalDataSource`

The data source of the widget which is used render nodes. Can be a JavaScript object which represents a valid data source configuration, a JavaScript array or an existing [kendo.data.HierarchicalDataSource](/api/javascript/data/hierarchicaldatasource) instance.

If the `dataSource` option is set to a JavaScript object or array the widget will initialize a new [kendo.data.HierarchicalDataSource](/api/javascript/data/hierarchicaldatasource) instance using that value as data source configuration.

If the `dataSource` option is an existing [kendo.data.HierarchicalDataSource](/api/javascript/data/hierarchicaldatasource) instance the widget will use that instance and will **not** initialize a new one.

#### Example - set dataSource as a JavaScript object

    <div id="panelbar"></div>
    <script>
    $("#panelbar").kendoTreeView({
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

   <ul id="panelbar"></ul>

    <script>
      $("#panelbar").kendoPanelBar({
          dataSource: [
              {
                  text: "Item 1 (link)",
                  cssClass: "myClass",                            // Add custom CSS class to the item, optional, added 2012 Q3 SP1.
                  url: "http://www.kendoui.com/"                  // link URL if navigation is needed (optional)
              },
              {
                  text: "<b>Item 2</b>",
                  encoded: false,                                 // Allows use of HTML for item text
                  content: "text"                                 // content within an item
              },
              {
                  text: "Item 3",
                  // content URL to load within an item
                  contentUrl: "http://demos.telerik.com/kendo-ui/content/web/panelbar/ajax/ajaxContent1.html"
              },
              {
                  text: "Item 4",
                  // item image URL, optional
                  imageUrl: "http://demos.telerik.com/kendo-ui/content/shared/icons/sports/baseball.png",
                  expanded: true,                                 // item is rendered expanded
                  items: [{                                       // Sub item collection.
                      text: "Sub Item 1"
                  },
                  {
                      text: "Sub Item 2"
                  }]
              },
              {
                  text: "Item 5"
              }
          ]
      });
    </script>

#### Example - set dataSource as an existing kendo.data.HierarchicalDataSource instance

    <div id="panelbar"></div>
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

    $("#panelbar").kendoPanelBar({
      dataSource: dataSource,
      dataTextField: "FullName"
    });
    </script>

### dataSpriteCssClassField `String` *(default: null)*

Sets the field of the data item that provides the sprite CSS class of the nodes.
If an array, each level uses the field that is at the same index in the array, or the last item in the array.

#### Example

    <style>
        #panelbar .k-sprite {
            background-image: url("http://demos.telerik.com/kendo-ui/content/shared/styles/flags.png");
        }    
    </style>
    <div id="panelbar"></div>
    <script>
    var items = [
      { text: "Brazil", sprite: "brazilFlag" },
      { text: "India", sprite: "indiaFlag" }
    ];
    $("#panelbar").kendoPanelBar({
      dataSpriteCssClassField: "sprite",
      dataSource: items
    });
    </script>

### dataTextField `String|Array` *(default: null)*

Sets the field of the data item that provides the text content of the nodes.
If an array, each level uses the field that is at the same index in the array, or the last item in the array.

#### Example

    <div id="panelbar"></div>
    <script>
    var items = [
      { ProductName: "Tea", items: [
        { ProductName: "Green Tea" },
        { ProductName: "Black Tea" }
      ] },
      { ProductName: "Coffee" }
    ];
    $("#panelbar").kendoPanelBar({
      dataTextField: "ProductName",
      dataSource: items
    });
    </script>

#### Example - using different fields on different levels

    <div id="panelbar"></div>
    <script>
    var items = [
      { CategoryName: "Tea", items: [
        { ProductName: "Green Tea" },
        { ProductName: "Black Tea" }
      ] },
      { CategoryName: "Coffee" }
    ];
    $("#panelbar").kendoPanelBar({
      dataTextField: [ "CategoryName", "ProductName" ],
      dataSource: items
    });
    </script>

### dataUrlField `String` *(default: null)*

Sets the field of the data item that provides the link URL of the nodes.

#### Example

    <div id="panelbar"></div>
    <script>
    var items = [
      { text: "Tea", LinksTo: "http://tea.example.com" },
      { text: "Coffee", LinksTo: "http://coffee.example.com" }
    ];
    $("#panelbar").kendoPanelBar({
      dataUrlField: "LinksTo",
      dataSource: items
    });
    </script>

### expandMode `String`*(default: "multiple")*

Specifies how the **PanelBar** items are displayed when opened and closed. The following values
are available:

#### *"single"*

Display one item at a time when an item is opened; opening an item will close the previously opened item.

#### *"multiple"*

Display multiple values at one time; opening an item has no visual impact on any other items in the **PanelBar**.

#### Example

    <ul id="panelbar">
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
        $("#panelbar").kendoPanelBar({
            expandMode: "single"
        });
    </script>

### loadOnDemand `Boolean` *(default: true)*

Indicates whether the child DataSources should be fetched lazily when parent groups get expanded.
Setting this to false causes all child DataSources to be loaded at initialization time.

#### Example - force lazy loading of sublevels

    <div id="panelbar"></div>
    <script>
    $("#panelbar").kendoPanelBar({
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

    <div id="panelbar"></div>
    <script>
    $("#panelbar").kendoPanelBar({
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

    <div id="panelbar"></div>
    <script>
    $("#panelbar").kendoPanelBar({
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

    <div id="panelbar"></div>
    <script>
    $("#panelbar").kendoPanelBar({
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

    <div id="panelbar"></div>
    <script>
    $("#panelbar").kendoPanelBar({
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

    <div id="panelbar"></div>
    <script>
    $("#panelbar").kendoPanelBar({
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

Appends an item(s) to the PanelBar.

#### Example

    <ul id="panelbar"></ul>
    <script>
        $("#panelbar").kendoPanelBar();

        var panelBar = $("#panelbar").data("kendoPanelBar");
        panelBar.append(
            [
                {
                    text: "Item 1",
                    cssClass: "myClass",                            // Add custom CSS class to the item, optional, added 2012 Q3 SP1.
                    url: "http://www.telerik.com/"                  // link URL if navigation is needed, optional.
                },
                {
                    text: "<b>Item 2</b>",
                    encoded: false,                                 // Allows use of HTML for item text
                    content: "text"                                 // content within an item
                },
                {
                    text: "Item 3",
                    contentUrl: "http://demos.telerik.com/kendo-ui/content/web/panelbar/ajax/ajaxContent1.html"
                },
                {
                    text: "Item 4",
                    imageUrl: "http://demos.telerik.com/kendo-ui/content/shared/icons/sports/baseball.png",
                    expanded: true,                                 // item is rendered expanded
                    items: [{                                       // Sub item collection.
                        text: "Sub Item 1"
                    },
                    {
                        text: "Sub Item 2"
                    }]
                },
                {
                    text: "Item 5",
                    // item image sprite CSS class, optional
                    spriteCssClass: "imageClass3"
                }
            ]
        );
    </script>

#### Parameters

##### item `String|Element|jQuery|Array`

Target item, specified as the JSON representation of an object. You can pass item `text`, `content` or
`contentUrl` here. Can handle an HTML string or array of such strings or JSON.

##### referenceItem `String|Element|jQuery`

A reference item to append the new item in the PanelBar, can be omitted.

#### Returns

`kendo.ui.PanelBar` Returns the PanelBar object to support chaining.

### clearSelection

Clears the currently selected PanelBar items.

#### Example - clear selection

    <ul id="panelbar">
        <li id="item1">Item 1</li>
        <li id="item2">Item 2</li>
    </ul>
    <script>
        // create a PanelBar instance and get it.
        var panelBar = $("#panelbar").kendoPanelBar().data("kendoPanelBar");

        // select the element with ID "item1"
        panelBar.select($("#item1"));

        // select the element with ID "item2"
        panelBar.select($("#item2"));

        // clear all selection
        setTimeout(function() {
          panelBar.clearSelection();
        }, 2000);
    </script>

### collapse

Collapses the specified item(s) of a **PanelBar**.

#### Example

    <ul id="panelbar">
        <li id="item1">Item 1
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
        <li id="item2">Item 2
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
    </ul>
    <script>
        $("#panelbar").kendoPanelBar();
        // access an existing PanelBar instance
        var panelBar = $("#panelbar").data("kendoPanelBar");
        // collapse the element with ID, "item1"
        panelBar.collapse($("#item1"));
        // collapse the element with ID, "item2" without visual animations
        panelBar.collapse($("#item2"), false);
        // collapse all list items that start with ID, "item"
        panelBar.collapse($('[id^="item"]'));
    </script>

#### Parameters

##### element `String|Element|jQuery`

The **PanelBar** item(s) to be collapsed, expressed as a string containing a selector
expression or represented by a [jQuery selector](http://api.jquery.com/category/selectors/).

##### useAnimation `Boolean`

_optional, default: _

Temporarily enables (**true**) or disables (**false**) any visual animation(s)
when collapsing items.

#### Returns

`kendo.ui.PanelBar` Returns the PanelBar object to support chaining.

### destroy
Prepares the **PanelBar** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the PanelBar element from DOM.

#### Example

    <ul id="panelbar">
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
        $("#panelbar").kendoPanelBar();
        var panelBar = $("#panelbar").data("kendoPanelBar");

        // detach events
        panelBar.destroy();
    </script>

### enable

Enables (**true**) or disables (**false**) the specified item(s) of the
**PanelBar**.

#### Example

    <ul id="panelbar">
        <li id="item1">Item 1
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
        <li id="item2">Item 2
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
    </ul>
    <script>
        $("#panelbar").kendoPanelBar();
        // access an existing PanelBar instance
        var panelBar = $("#panelbar").data("kendoPanelBar");
        // enable the item of the PanelBar with ID, "item1"
        panelBar.enable($("#item1"), true);
        // disable the currently selected item of the PanelBar
        var item = panelBar.select();
        panelBar.enable($("#item2"), false);
        // disable all list items that start with ID, "item"
        panelBar.enable($('[id^="item"]'), false);
    </script>

#### Parameters

##### element `String|Element|jQuery`

The **PanelBar** item(s) to be enabled (**true**) or disabled (**false**), expressed as a
string containing a selector expression or represented by a
[jQuery selector](http://api.jquery.com/category/selectors/).

##### enable `Boolean`

The desired state - enabled (**true**) or disabled (**false**) - of the target
element(s).

### expand

Expands the specified item(s) of a **PanelBar**.

#### Example

    <ul id="panelbar">
        <li id="item1">Item 1
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
        <li id="item2">Item 2
            <ul>
                <li>Sub Item 1</li>
                <li>Sub Item 2</li>
                <li>Sub Item 3</li>
            </ul>
        </li>
    </ul>
    <script>
        $("#panelbar").kendoPanelBar();
        // access an existing PanelBar instance
        var panelBar = $("#panelbar").data("kendoPanelBar");
        // expand the element with ID, "item1"
        panelBar.expand($("#item1"));
        // expand the element with ID, "item2" without visual animations
        panelBar.expand($("#item2"), false);
        // expand all list items that start with ID, "item"
        panelBar.expand($('[id^="item"]'));
    </script>

#### Parameters

##### element `String|Element|jQuery`

The **PanelBar** item(s) to be expanded, expressed as a selector.

##### useAnimation `Boolean`

_optional, default: _

Temporarily enables (**true**) or disables (**false**) any visual animation(s) when expanding items.

#### Returns

`kendo.ui.PanelBar` Returns the PanelBar object to support chaining.

### insertAfter

Inserts a PanelBar item after the specified referenceItem

#### Example

    <ul id="panelbar">
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
        $("#panelbar").kendoPanelBar();

        var panelBar = $("#panelbar").data("kendoPanelBar");

        panelBar.insertAfter(
            [{
                text: "Item 1",
                url: "http://www.telerik.com"                // Link URL if navigation is needed, optional.
            },
            {
                text: "<b>Item 2</b>",
                encoded: false,                              // Allows use of HTML for item text
                content: "text"                              // Content for the content element
            },
            {
                text: "Item 3",
                contentUrl: "http://demos.telerik.com/kendo-ui/content/web/panelbar/ajax/ajaxContent1.html"
            },
            {
                text: "Item 4",
                imageUrl: "http://demos.telerik.com/kendo-ui/content/shared/icons/sports/baseball.png",
                expanded: true,                              // item is rendered expanded
                items: [{                                    // Sub item collection.
                     text: "Sub Item 1"
                },
                {
                     text: "Sub Item 2"
                }]
            },
            {
                text: "Item 5"
            }],
            "li:first-child"
        );
    </script>

#### Parameters

##### item `String|Element|jQuery|Array`

Target item, specified as a JSON object. You can pass item `text`, `content` or `contentUrl` here. Can handle an HTML string or array of such strings or JSON.

##### referenceItem `String|Element|jQuery`

A reference item to insert the new item after

### insertBefore

Inserts a PanelBar item before the specified referenceItem

#### Example

    <ul id="panelbar">
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
        $("#panelbar").kendoPanelBar();

        var panelBar = $("#panelbar").data("kendoPanelBar");

        panelBar.insertBefore(
            [{
                text: "Item 1",
                url: "http://www.telerik.com"                // Link URL if navigation is needed, optional.
            },
            {
                text: "<b>Item 2</b>",
                encoded: false,                              // Allows use of HTML for item text
                content: "text"                              // Content for the content element
            },
            {
                text: "Item 3",
                contentUrl: "http://demos.telerik.com/kendo-ui/content/web/panelbar/ajax/ajaxContent1.html"
            },
            {
                text: "Item 4",
                imageUrl: "http://demos.telerik.com/kendo-ui/content/shared/icons/sports/baseball.png",
                expanded: true,                              // item is rendered expanded
                items: [{                                    // Sub item collection.
                     text: "Sub Item 1"
                },
                {
                     text: "Sub Item 2"
                }]
            },
            {
                text: "Item 5"
            }],
            "li:last-child"
        );
    </script>

#### Parameters

##### item `String|Element|jQuery|Array`

Target item, specified as a JSON object. You can pass item `text`, `content` or `contentUrl` here. Can handle an
TML string or array of such strings or JSON.

##### referenceItem `String|Element|jQuery`

A reference item to insert the new item before.

#### Returns

`kendo.ui.PanelBar` Returns the PanelBar object to support chaining.

### reload

Reloads the content of a **PanelBar** from an AJAX request.

#### Example

    <ul id="panelbar">
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
        $("#panelbar").kendoPanelBar();
        // get a reference to the panel bar
        var panelBar = $("#panelbar").data("kendoPanelBar");
        // reload the panel bar
        panelBar.reload("> .k-item");
    </script>

#### Parameters

##### element `String|Element|jQuery`

Target element

### remove

Removes the specified PanelBar item(s).

#### Example

    <ul id="panelbar">
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
        $("#panelbar").kendoPanelBar();
        // get a reference to the panel bar
        var panelBar = $("#panelbar").data("kendoPanelBar");
        // remove Item 1
        panelBar.remove("#Item1");
    </script>

#### Parameters

##### element `String|Element|jQuery`

The **PanelBar** item(s) to be removed, expressed as a selector string, DOM element or a jQuery object.

### select

Gets or sets the selected item.

#### Example

    <ul id="panelbar">
        <li id="item1">Item 1
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
        $("#panelbar").kendoPanelBar();
        // access an existing PanelBar instance
        var panelBar = $("#panelbar").data("kendoPanelBar");
        // select the item with ID, "item1"
        panelBar.select("#item1");
    </script>

#### Parameters

##### element `String|Element|jQuery` *(optional)*

The **PanelBar** item to be selected, expressed as a string containing a selector expression or
represented by a [jQuery selector](http://api.jquery.com/category/selectors/).

#### Returns

`jQuery` the selected item if called without arguments. `kendo.ui.PanelBar` if called with arguments.

## Events

### activate

Triggered when an item of a PanelBar is activated.

#### Event Data

##### e.item `Element`

The activated item of the PanelBar.

#### Attach activate event handler during initialization; detach via unbind()

    <ul id="panelbar">
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
        // event handler for activate
        var onActivate = function(e) {
            // access the activated item via e.item (HTMLElement)

            // detach activate event handler via unbind()
            panelBar.data("kendoPanelBar").unbind("activate", onActivate);
        };

        // attach activate event handler during initialization
        var panelBar = $("#panelbar").kendoPanelBar({
            activate: onActivate
        });
    </script>

#### Attach activate event handler via bind(); detach via unbind()

    <ul id="panelbar">
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
        $("#panelbar").kendoPanelBar();

        // event handler for activate
        var onActivate = function(e) {
            // access the activated item via e.item (HTMLElement)

            // detach activate event handler via unbind()
            $("#panelbar").data("kendoPanelBar").unbind("activate", onActivate);
        };

        // attach activate event handler via bind()
        $("#panelbar").data("kendoPanelBar").bind("activate", onActivate);
    </script>

### collapse

Triggered when an item of a PanelBar is collapsed.

#### Event Data

##### e.item `Element`

The collapsing item of the PanelBar.

#### Attach collapse event handler during initialization; detach via unbind()

    <ul id="panelbar">
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
        // event handler for collapse
        var onCollapse = function(e) {
            // access the collapsed item via e.item (HTMLElement)

            // detach collapse event handler via unbind()
            panelBar.data("kendoPanelBar").unbind("collapse", onCollapse);
        };

        // attach collapse event handler during initialization
        var panelBar = $("#panelbar").kendoPanelBar({
            collapse: onCollapse
        });
    </script>

#### Attach collapse event handler via bind(); detach via unbind()

    <ul id="panelbar">
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
        $("#panelbar").kendoPanelBar();

        // event handler for collapse
        var onCollapse = function(e) {
            // access the collapsed item via e.item (HTMLElement)

            // detach collapse event handler via unbind()
            $("#panelbar").data("kendoPanelBar").unbind("collapse", onCollapse);
        };

        // attach collapse event handler via bind()
        $("#panelbar").data("kendoPanelBar").bind("collapse", onCollapse);
    </script>

### contentLoad

Fires when content is fetched from an AJAX request.

#### Event Data

##### e.item `Element`

The selected item

##### e.contentElement `Element`

The loaded content element

#### Example

    <ul id="panelbar">
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
        $("#panelbar").kendoPanelBar({
            contentLoad: function(e) {
                // handle event
            }
        });
    </script>

#### To set after initialization

    <ul id="panelbar">
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
        // get a reference to the panel bar
        var panelBar = $("#panelbar").data("kendoPanelBar");
        // bind the contentLoad event
        panelBar.bind("contentLoad", function(e) {
            // handle event
        });
    </script>

### dataBound

Triggered after the dataSource change event has been processed (adding/removing items);

#### Event Data

##### e.node `jQuery`

The node whose children have been changed. If the changes have occurred on the root level, this parameter is undefined.

#### Example - subscribe to the "dataBound" event during initialization

    <div id="panelbar"></div>
    <script>
    $("#panelbar").kendoPanelBar({
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

    <div id="panelbar"></div>
    <script>
    function panelbar_dataBound(e) {
      console.log("DataBound", e.node);
    }
    $("#panelbar").kendoPanelBar({
      dataSource: [
        { text: "foo", items: [
          { text: "bar" }
        ] }
      ]
    });
    var panelbar = $("#panelbar").data("kendoPanelBar");
    panelbar.bind("dataBound", panelbar_dataBound);
    </script>

#### Example - show an empty message when no items have been loaded from the server

    <div id="panelbar"></div>
    <script>
      $("#panelbar").kendoPanelBar({
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

### error

Fires when AJAX request results in an error.

> This event won't fire if you use jQuery 3.x. More information is available [here](https://github.com/telerik/kendo-ui-core/issues/2296).

#### Event Data

##### e.xhr `jqXHR`

The jqXHR object used to load the content

##### e.status `String`

The returned status.

#### Example

    <ul id="panelbar">
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
        $("#panelbar").kendoPanelBar({
            error: function(e) {
                // handle event
            }
        });
    </script>

#### To set after initialization

    <ul id="panelbar">
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
        $("#panelbar").kendoPanelBar();
        // get a reference to the panel bar
        var panelBar = $("#panelbar").data("kendoPanelBar");
        // bind the error ajax event
        panelBar.bind("error", function(e) {
            // handle event
        });
    </script>

### expand

Triggered when an item of a PanelBar is expanded.

#### Event Data

##### e.item `Element`

The expanding item of the PanelBar.

#### Attach expand event handler during initialization; detach via unbind()

    <ul id="panelbar">
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
        // event handler for expand
        var onExpand = function(e) {
            // access the expanded item via e.item (HTMLElement)

            // detach expand event handler via unbind()
            panelBar.data("kendoPanelBar").unbind("expand", onExpand);
        };

        // attach expand event handler during initialization
        var panelBar = $("#panelbar").kendoPanelBar({
            expand: onExpand
        });
    </script>

#### Attach expand event handler via bind(); detach via unbind()

    <ul id="panelbar">
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
        $("#panelbar").kendoPanelBar();

        // event handler for expand
        var onExpand = function(e) {
            // access the expanded item via e.item (HTMLElement)

            // detach expand event handler via unbind()
            $("#panelbar").data("kendoPanelBar").unbind("expand", onExpand);
        };

        // attach expand event handler via bind()
        $("#panelbar").data("kendoPanelBar").bind("expand", onExpand);
    </script>

### select

Triggered when an item of a PanelBar is selected.

#### Event Data

##### e.item `Element`

The selected item of the PanelBar.

#### Attach select event handler during initialization; detach via unbind()

    <ul id="panelbar">
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
        // event handler for select
        var onSelect = function(e) {
            // access the selected item via e.item (HTMLElement)

            // detach select event handler via unbind()
            panelBar.data("kendoPanelBar").unbind("select", onSelect);
        };

        // attach select event handler during initialization
        var panelBar = $("#panelbar").kendoPanelBar({
            select: onSelect
        }).data("kendoPanelBar");
    </script>

#### Attach select event handler via bind(); detach via unbind()

    <ul id="panelbar">
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
        $("#panelbar").kendoPanelBar();

        // event handler for select
        var onSelect = function(e) {
            // access the selected item via e.item (HTMLElement)

            // detach select event handler via unbind()
            $("#panelbar").data("kendoPanelBar").unbind("select", onSelect);
        };

        // attach select event handler via bind()
        $("#panelbar").data("kendoPanelBar").bind("select", onSelect);
    </script>
