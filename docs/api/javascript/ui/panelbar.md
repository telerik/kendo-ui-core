---
title: PanelBar
page_title: Configuration, methods and events of Kendo UI PanelBar
description: Configure the PanelBar UI widget, use methods and explore the events which are triggered upon certain behaviors.
res_type: api
component: panelbar
---

# kendo.ui.PanelBar

Represents the Kendo UI PanelBar widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### animation `Object|Boolean`

A collection of visual animations used when **PanelBar** items are expand or collapsed through
user interactions. Setting this option to `false` will disable all animations.

`animation:true` is not a valid configuration.


<div class="meta-api-description">
Control and customize the visual effects and transitions for expanding or collapsing item sections, enabling smooth or instant toggling animations, configuring ease and timing of expansion or collapse interactions, disabling animations completely by setting to false, managing panel open/close motion behavior, adjusting expand/collapse feedback visuals, enabling or disabling animated UI responses during user interaction, setting animation preferences for panel toggling effects, controlling the presence or absence of dynamic effects when items expand or contract, and optimizing user experience with or without visual motion in item reveal or hide operations.
</div>

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


<div class="meta-api-description">
Control and configure closing animations for collapsible interface sections, specifying visual effects like timing, easing functions, transition types, and animation duration to customize how panel or menu items smoothly collapse or hide when closed, enabling dynamic, visually appealing transitions for closing expandable content areas or accordion elements within user interfaces.
</div>

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


<div class="meta-api-description">
Adjust the speed or timing of collapse animations for expandable panels, controlling how long the closing transition takes in milliseconds. Configure or set the duration for panel collapse effects to customize the animation smoothness and timing when items close or contract. Enable precise control over animation length, closing speed, or duration of collapsing UI elements, optimizing visual transition times and user experience for panel folding or hide effects.
</div>

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


<div class="meta-api-description">
Configure or customize the closing animation of expandable menu items by setting one or more collapse visual effects such as fade-out or other transitions applied when a panel or accordion section is closing or collapsing. Enable smooth or combined animation styles to control how content fades, shrinks, or visually disappears upon collapsing, including specifying multiple effects using space-separated keywords to achieve desired UI behaviors during panel close operations or accordion item collapse transitions. Adjust animation sequences, timing, and visual feedback to enhance user experience when a collapsible panel or item is hidden, retracted, or closed.
</div>

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


<div class="meta-api-description">
Control and customize the opening animations for expandable items in a panel or menu by configuring animation effects like duration, easing, and enablement for smooth or instant expansion; set, adjust, or disable visual transitions that play when sections unfold or expand, allowing developers to tailor how panels reveal content with options to animate or instantly show expanded panels, menus, or list items for enhanced user interface interactions and dynamic content display.
</div>

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


<div class="meta-api-description">
Adjust or configure the speed, timing, or length of the expand opening animation for panel or accordion components, controlling how fast or slow the content expands or reveals when triggered. Set, customize, or tune the duration in milliseconds for expand or open animations to create smooth, immediate, delayed, or gradual visual transitions on item expansion, affecting animation performance and user experience.
</div>

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


<div class="meta-api-description">
Control and customize the visual opening behavior of expandable items with animation effects such as vertical expansion, fading in, or combining multiple animations simultaneously; set, enable, or configure how content panels animate on expansion, including effects like slide down, fade transition, reveal animations, and other user interface visual cues that enhance the experience when revealing hidden or collapsed sections within a panel list or accordion component.
</div>

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
                    effects: "expandVertical"
                }
            }
        });
    </script>

### autoBind `Boolean` *(default: true)*

If set to `false` the widget will not bind to the data source during initialization. In this case data binding will occur when the [change](/api/javascript/data/datasource/events/change) event of the
data source is fired. By default the widget will bind to the data source specified in the configuration.

> Setting `autoBind` to `false` is useful when multiple widgets are bound to the same data source. Disabling automatic binding ensures that the shared data source does not make more than one request to the remote service.


<div class="meta-api-description">
Control the timing and behavior of data loading for hierarchical or expandable panel components by enabling or disabling automatic data source binding during initialization, preventing immediate fetches, delaying or skipping initial data binding to optimize performance, reduce redundant requests especially when data sources are shared, configure binding to trigger only on data changes or events, manage when the panel bar or similar widgets connect to their data feeds, and customize data retrieval control to avoid duplicate network calls or unnecessary data operations during startup or dynamic updates.
</div>

#### Example - disable automatic binding

    <ul id="panelbar"></ul>
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


<div class="meta-api-description">
Load dynamic content for expandable interface sections by specifying an array of endpoint URLs, enabling asynchronous fetching of content per item using index-based mapping; configure remote content loading, control which items retrieve data via Ajax calls, and set null values to exclude specific items from remote loading or defer content rendering to client-side sources.
</div>

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
              "https://demos.telerik.com/kendo-ui/content/web/panelbar/ajax/ajaxContent1.html"
            ]
        });
    </script>

### dataIconField `String` *(default: "icon")*

Sets the field of the data item that provides the icon name of the **PanelBar** nodes.


<div class="meta-api-description">
Configure node icons by specifying the data source field that holds icon names or CSS classes to dynamically assign icons to hierarchical panels or menus. Enable binding of icon identifiers directly from your dataset for menu items, tree nodes, or accordion panels, controlling icon visuals through data-driven values. Set or customize which property in your input data maps to icon styling or glyphs for each navigational or collapsible element, supporting dynamic UI icon rendering from database fields or JSON attributes. Use field name references to toggle, update, or manage icons on expandable nodes based on your structured source data.
</div>

#### Example - specify icon name field

    <ul id="panelbar"></ul>
    <script>
    var items = [
      { text: "Ask AI", myIconField: "sparkles", myIconClassField: "my-class" },
      { text: "Comment", myIconField: "comment", myIconClassField: "my-class" }
    ];
    $("#panelbar").kendoPanelBar({
      dataIconField: "myIconField",
      dataIconClassField: "myIconClassField",
      dataSource: items
    });
    </script>

### dataIconClassField `String` *(default: "icon")*

Sets the field of the data item that provides the custom class for the icon element of the **PanelBar** nodes.


<div class="meta-api-description">
Control custom icons for each item in a hierarchical panel or menu by linking icon styles dynamically to a data source field, enabling per-node icon customization through CSS class bindings, specifying which data attribute holds the icon class for display, and configuring individual item icons by setting the class names based on data properties or fields, useful for dynamically rendering distinct icons in expandable panels or navigation trees depending on item-specific metadata or icon class identifiers.
</div>

#### Example - specify field for custom icon class

    <ul id="panelbar"></ul>
    <script>
    var items = [
      { text: "Ask AI", myIconField: "sparkles", myIconClassField: "my-class" },
      { text: "Comment", myIconField: "comment", myIconClassField: "my-class" }
    ];
    $("#panelbar").kendoPanelBar({
      dataIconField: "myIconField",
      dataIconClassField: "myIconClassField",
      dataSource: items
    });
    </script>

### dataImageUrlField `String` *(default: null)*

Sets the field of the data item that provides the image URL of the **PanelBar** nodes.


<div class="meta-api-description">
Set or configure the field name in your data source that provides image URLs for each node, enabling display of icons or pictures within hierarchical or flat list structures, with support for dynamic data binding and initialization to control the image source per item; this lets you associate, map, or link images to nodes, customize node visuals with URLs from data fields, and integrate multimedia content into expandable panels or tree views.
</div>

#### Example - specify custom image URL field

    <ul id="panelbar"></ul>
    <script>
    var items = [
      { text: "Baseball", image: "https://demos.telerik.com/kendo-ui/content/shared/icons/sports/baseball.png" },
      { text: "Golf", image: "https://demos.telerik.com/kendo-ui/content/shared/icons/sports/golf.png" }
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


<div class="meta-api-description">
Configure hierarchical or nested data binding for the expandable menu by connecting it to structured data sources, including JavaScript objects, arrays, or pre-existing hierarchical data source instances; control dynamic loading, tree-like data rendering, and multi-level node population by setting data models or collections that represent parent-child relationships, ensuring the interface accurately reflects nested datasets and supports updating or manipulating complex item hierarchies using standard or custom data source formats for menus, panels, or tree views.
</div>

#### Example - set dataSource as a JavaScript object

    <ul id="panelbar"></ul>
    <script>
    $("#panelbar").kendoPanelBar({
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
                  url: "https://www.telerik.com/kendo-ui/"                  // link URL if navigation is needed (optional)
              },
              {
                  text: "<b>Item 2</b>",
                  encoded: false,                                 // Allows use of HTML for item text
                  content: "text"                                 // content within an item
              },
              {
                  text: "Item 3",
                  // content URL to load within an item
                  contentUrl: "https://demos.telerik.com/kendo-ui/content/web/panelbar/ajax/ajaxContent1.html"
              },
              {
                  text: "Item 4",
                  // item image URL, optional
                  imageUrl: "https://demos.telerik.com/kendo-ui/content/shared/icons/sports/baseball.png",
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

    <ul id="panelbar"></ul>
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

    $("#panelbar").kendoPanelBar({
      dataSource: dataSource,
      dataTextField: "FullName"
    });
    </script>

### dataSpriteCssClassField `String` *(default: null)*

Sets the field of the data item that provides the sprite CSS class of the nodes.
If an array, each level uses the field that is at the same index in the array, or the last item in the array.


<div class="meta-api-description">
Configure the source field or fields that define the CSS classes for icons or sprites on hierarchical menu or panel nodes, enabling dynamic binding of custom icon styles from your data model for each level of navigation. Control how icon styling classes are assigned to expandable tree or panel items by specifying single or multiple data fields corresponding to different hierarchy depths, allowing flexible and precise visual customization of node icons based on your underlying dataset or structure. Set icon CSS class references dynamically to ensure each nested item or node displays appropriate sprite or font-based icons using fields mapped from your data source, supporting varied icon configurations for multi-level menus or panel bar components.
</div>

#### Example

    <style>
        #panelbar .k-sprite {
            background-image: url("https://demos.telerik.com/kendo-ui/content/shared/styles/flags.png");
        }
    </style>
    <ul id="panelbar"></ul>
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


<div class="meta-api-description">
Control the display text or labels of hierarchical menu items by specifying the data source field or fields that define each node's text content, enabling customization of node captions in nested structures, set single or multiple text fields to map different levels in a tree or menu, configure which attribute or property in your data represents the label for each item, adjust or define the text shown on navigation nodes, manage text bindings for multi-level elements, set or map text values dynamically for each node based on data hierarchy, customize menu or panel item labels by pointing to specific data properties used as display text, enable flexible text field mapping for hierarchical UI components.
</div>

#### Example

    <ul id="panelbar"></ul>
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

    <ul id="panelbar"></ul>
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


<div class="meta-api-description">
Specify or configure the data field that holds the URL or link for each node in a hierarchical or tree structure, enabling navigation paths, hyperlink targets, or node-specific links when binding data to a menu or panel component. Control the mapping between data items and their associated hyperlink references, set or change which property in your data source contains the navigation URLs, manage link fields for nodes in a data-driven menu, and ensure correct assignment of href or navigation targets during initialization or data binding processes. This functionality supports dynamically assigning clickable links to tree nodes or menu items by selecting the corresponding field from your data model that defines the link destination.
</div>

#### Example

    <ul id="panelbar"></ul>
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


<div class="meta-api-description">
Control how expandable items open and close by configuring whether multiple panels can be expanded simultaneously or only one at a time, adjusting accordion behavior versus multi-expand modes, setting toggle functionality for expanding or collapsing sections, managing display states of open or closed items, and enabling precise control over item expansion, collapse, or exclusive opening behavior in panel or accordion interfaces.
</div>

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


<div class="meta-api-description">
Configure dynamic data loading strategies for hierarchical or nested panels by enabling or disabling lazy loading of child content, controlling whether child items are fetched only when their parent is expanded or preloaded upfront, managing deferred data retrieval to optimize initial load times or ensuring immediate availability of all nested data, setting preferences to balance between reduced initial bandwidth consumption and responsive user experience for expandable lists, trees, or menu components that support on-demand data fetching versus full data preloading during component initialization.
</div>

#### Example - force lazy loading of sublevels

    <ul id="panelbar"></ul>
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


<div class="meta-api-description">
Control and customize the text strings, labels, commands, prompts, and status messages displayed within the navigation panel or menu bar interface, enabling localization, translation, or personalized wording for buttons, tooltips, error messages, and informational text to suit different languages, user preferences, or application contexts. Adjust messages content for UI elements in the panel, set custom strings for commands and statuses, and enable internationalization or tailored user communication within the navigation components.
</div>

#### Example - customize PanelBar messages

    <ul id="panelbar"></ul>
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


<div class="meta-api-description">
Customize, translate, or set the text displayed during loading states for menu or navigation components when root items are being retrieved or fetched, enabling localization and adjustment of loading indicators, spinner messages, or progress prompts shown while hierarchical menus or expandable panels load their initial content, useful for adapting user interface messages to different languages and contexts during asynchronous data loading or dynamic content retrieval in navigation elements.
</div>

#### Example - customize loading message

    <ul id="panelbar"></ul>
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


<div class="meta-api-description">
Configure and customize error messages for failed content loading in expandable UI panels, enabling localization and setting specific text displayed when data requests or content fetch operations do not succeed, controlling user-facing notifications and feedback during panel content retrieval failures or network errors.
</div>

#### Example - customize requestFailed message

    <ul id="panelbar"></ul>
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


<div class="meta-api-description">
Customize and localize the text label for the retry button shown during error states in navigation panels or expandable menus, enabling control over retry prompts, error recovery messages, and button captions for retry actions in user interface components that expand or collapse content areas.
</div>

#### Example - customize retry message

    <ul id="panelbar"></ul>
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


<div class="meta-api-description">
Control and customize the rendering of each node in hierarchical or expandable panels by defining templates that specify custom HTML layouts, include icons, badges, dynamic content, or interactive components tailored to node data. Enable per-item customization and data-driven rendering for tree-like structures, menus, or accordion panels by configuring template functions or markup that bind to node properties, supporting flexible visualization, styling, and interactivity in expandable UI elements. Adjust node appearance, inject custom elements, and bind data context dynamically to control how individual sections or nodes display in collapsible panel interfaces.
</div>

#### Example

    <ul id="panelbar"></ul>
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


<div class="meta-api-description">
Add or insert one or multiple entries dynamically to an existing navigation panel, menu, or section at runtime without replacing or resetting current items; enable programmatic extension, real-time update, or incremental growth of hierarchical or collapsible item collections, lists, or panels by appending new elements while preserving the original structure and user interactions, ideal for modifying UI components on the fly, adapting to user inputs, or expanding menus through code.
</div>

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
                    url: "https://www.telerik.com/"                  // link URL if navigation is needed, optional.
                },
                {
                    text: "<b>Item 2</b>",
                    encoded: false,                                 // Allows use of HTML for item text
                    content: "text"                                 // content within an item
                },
                {
                    text: "Item 3",
                    contentUrl: "https://demos.telerik.com/kendo-ui/content/web/panelbar/ajax/ajaxContent1.html"
                },
                {
                    text: "Item 4",
                    imageUrl: "https://demos.telerik.com/kendo-ui/content/shared/icons/sports/baseball.png",
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

##### referenceItem `String|Element|jQuery` *(optional)*

A reference item to append the new item in the PanelBar, can be omitted.

#### Returns

`kendo.ui.PanelBar` Returns the PanelBar object to support chaining.

### clearSelection

Clears the currently selected PanelBar items.


<div class="meta-api-description">
Remove or reset user selections in a PanelBar by programmatically clearing chosen items, deselecting all selected elements to revert the UI state, resetting item highlights or focus after interactions, controlling selection dynamically, and managing or unsetting current selections during runtime to ensure no item remains selected or highlighted in the navigation component.
</div>

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


<div class="meta-api-description">
Control collapsing or closing specific sections or panels within a collapsible interface programmatically, enabling dynamic hiding of content and managing expansion states through code or event handling. This method supports folding or retracting items to update user interface visibility, allowing developers to set, trigger, or automate the closing of expandable areas in menus, accordions, or sidebars, facilitating UI state management such as collapsing open panels, toggling sections, or controlling visibility of grouped elements during runtime or interaction.
</div>

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
expression or represented by a [jQuery selector](https://api.jquery.com/category/selectors/).

##### useAnimation `Boolean`

_optional, default: _

Temporarily enables (**true**) or disables (**false**) any visual animation(s)
when collapsing items.

#### Returns

`kendo.ui.PanelBar` Returns the PanelBar object to support chaining.

### dataItem

Returns the data item to which the specified item is bound. The method will return an item only when the PanelBar is populated using a DataSource.


<div class="meta-api-description">
Retrieve or access the data object, record, or model associated with a specific item or node in a hierarchical UI component, allowing you to map, link, or bind DOM elements or panel items to their underlying data source for inspection, modification, synchronization, or dynamic updates when using data-driven lists, trees, or panels. This enables queries like getting the bound data for a clicked item, updating the data behind a UI element, syncing UI state with the data model, or iterating through data records tied to visual elements in a data-bound widget or control.
</div>

#### Parameters

##### node `jQuery|Element|String`

A string, DOM element or jQuery object which represents the item. A string is treated as a jQuery selector.

#### Returns

`kendo.data.Node` The model of the item that was passed as a parameter.

#### Example - get the data item of the first node

    <ul id="panelBar"></ul>
    <script>
        $("#panelBar").kendoPanelBar({
            dataSource: [
                { id: 1, text: "foo" },
                { id: 2, text: "bar" }
            ]
        });

        var panelBar = $("#panelBar").data("kendoPanelBar");
        var dataItem = panelBar.dataItem(".k-panelbar-item:first");
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(dataItem.text); // displays "foo"
    </script>

### destroy
Prepares the **PanelBar** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the PanelBar element from DOM.


<div class="meta-api-description">
Teardown or clean up a hierarchical menu or accordion interface by removing all event listeners, clearing stored data attributes, and recursively triggering cleanup on nested child components to prevent memory leaks and dangling handlers before element removal, without physically deleting the HTML element from the page. This process ensures efficient resource management in dynamic UI components by detaching events, releasing data bindings, and recursively destroying embedded subcomponents or widgets that rely on shared resources, enabling developers to properly disable or reset interactive panel-based navigation or content containers while keeping the DOM structure intact for flexible manipulation or reinitialization.
</div>

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


<div class="meta-api-description">
Control the active state and interactivity of one or multiple PanelBar items by programmatically turning them on or off, activating or deactivating specific elements, toggling item availability, enabling or disabling selections, managing item state dynamically, setting individual or group item accessibility, and adjusting which parts of a PanelBar respond to user actions through boolean flags or method calls that specify true for enabling and false for disabling.
</div>

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
[jQuery selector](https://api.jquery.com/category/selectors/).

##### enable `Boolean`

The desired state - enabled (**true**) or disabled (**false**) - of the target
element(s).

### expand

Expands the specified item(s) of a **PanelBar**.


<div class="meta-api-description">
Programmatically open or expand specific sections, panels, or items within a collapsible navigation or accordion interface to reveal nested content or subsections without direct user interaction, enabling dynamic control of visibility, UI state updates, content display, navigation management, or automated user interface workflows by setting, triggering, or managing expanded states via code commands or methods.
</div>

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


<div class="meta-api-description">
Add or inject a new item immediately following an existing item within a hierarchical or collapsible navigation panel, enabling dynamic adjustment of item order, sequence, or layout during runtime or programmatic updates. Control insertion points by specifying the target reference element to place the new entry right after it, supporting real-time modification, interface reshuffling, or interactive rearrangement of menu, accordion, or sidebar items. Customize or update component structures on the fly, insert sibling nodes after selected items, and programmatically manage navigation trees, lists, or panels for responsive user interface behavior and adaptive content placement.
</div>

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
                url: "https://www.telerik.com"                // Link URL if navigation is needed, optional.
            },
            {
                text: "<b>Item 2</b>",
                encoded: false,                              // Allows use of HTML for item text
                content: "text"                              // Content for the content element
            },
            {
                text: "Item 3",
                contentUrl: "https://demos.telerik.com/kendo-ui/content/web/panelbar/ajax/ajaxContent1.html"
            },
            {
                text: "Item 4",
                imageUrl: "https://demos.telerik.com/kendo-ui/content/shared/icons/sports/baseball.png",
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


<div class="meta-api-description">
Insert a new element, node, or configuration into a navigational or accordion-like menu by placing it directly ahead of a specified existing item, enabling developers to dynamically add menu entries, list items, or components at precise positions within a hierarchical or flat panel structure. Control, manage, or rearrange the order of items programmatically by specifying the target insertion point using index references, DOM elements, or selectors, allowing real-time updates to the panel’s layout and content. This method supports adding content defined as configuration objects, HTML snippets, or existing elements, facilitating seamless dynamic modifications to sidebars, accordion menus, or expandable panels with fine-grained control over placement and structure changes.
</div>

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
                url: "https://www.telerik.com"                // Link URL if navigation is needed, optional.
            },
            {
                text: "<b>Item 2</b>",
                encoded: false,                              // Allows use of HTML for item text
                content: "text"                              // Content for the content element
            },
            {
                text: "Item 3",
                contentUrl: "https://demos.telerik.com/kendo-ui/content/web/panelbar/ajax/ajaxContent1.html"
            },
            {
                text: "Item 4",
                imageUrl: "https://demos.telerik.com/kendo-ui/content/shared/icons/sports/baseball.png",
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


<div class="meta-api-description">
Refresh or reload dynamic content within collapsible navigation panels by triggering an asynchronous fetch to update and replace existing panel item content, enabling real-time data refreshes, remote content retrieval, automatic HTML updates, and re-rendering of collapsible sections without full page reloads, supporting interactive updates, AJAX requests, and content synchronization in expandable menu structures.
</div>

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


<div class="meta-api-description">
Delete or remove one or multiple PanelBar entries dynamically to update or modify the navigation structure, programmatically control and manage panel items by specifying which to remove, enable runtime deletion or content adjustments, control visible elements within the PanelBar by removing selected items, and handle scenarios where entries need to be cleared, hidden, or refreshed through method calls that alter the component’s displayed items list.
</div>

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


<div class="meta-api-description">
Control or query the active or highlighted item within a hierarchical menu or list interface, enabling programmatic retrieval or assignment of the current selection by specifying elements, selectors, or objects, supporting dynamic updates to which item is marked as chosen or focused, with functionality to get the selected node or set a new selected node using DOM references, jQuery objects, or CSS selectors, suitable for managing menu state, user interaction, and item highlighting through code.
</div>

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
represented by a [jQuery selector](https://api.jquery.com/category/selectors/).

#### Returns

`jQuery` the selected item if called without arguments. `kendo.ui.PanelBar` if called with arguments.

### setDataSource

Sets the dataSource of an existing PanelBar and rebinds it.


<div class="meta-api-description">
Update or replace the items displayed in a panel or menu dynamically by providing new data in the form of arrays, objects, or data sources, enabling real-time refreshing, rebinding, and re-rendering of content without reconstructing the entire component. Easily configure, set, or swap datasets at runtime to control the displayed list elements, apply templates to fresh data, and manage dynamic item updates for navigation components that support hierarchical or grouped data binding. This method supports seamless data source changes, live updates to menu or panel content, and flexible handling of structured data inputs for interactive user interfaces.
</div>

#### Parameters

##### dataSource `kendo.data.HierarchicalDataSource`

The new dataSource that the widget will bind to

#### Example

    <ul id="panelbar"></ul>
    <script>
      var panelbar = $("#panelbar").kendoPanelBar({
        dataTextField: "FullName"
      }).data('kendoPanelBar');

     var ds = new kendo.data.HierarchicalDataSource({
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

      panelbar.setDataSource(ds)
    </script>

## Events

### activate

Triggered when an item of a PanelBar is activated.


<div class="meta-api-description">
Detect when a panel or menu item is selected, clicked, or focused to trigger custom actions such as opening sections, loading dynamic content, updating interface state, or executing event handlers upon activation. Capture activation events in navigation components like a PanelBar or accordion to identify which item became active, react to user interactions for UI updates, and implement custom logic for selected or expanded items using event listeners that provide detailed context about the triggered element. Enable responsive behavior when a specific panel or menu entry becomes active or highlighted, ensuring synchronization with application state and content rendering.
</div>

#### Event Data

##### e.item `Element`

The activated item of the PanelBar.

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
            activate: function(e) {
                console.log("Activated item:", e.item);
            }
        });
    </script>

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


<div class="meta-api-description">
Detect and handle the moment a panel or accordion item closes or collapses within a user interface, enabling developers to trigger custom logic such as updating application state, toggling visibility, dynamically loading or unloading content, or responding to user interactions when a collapsible section folds shut. Capture events that notify when a collapsible panel, section, or item is minimized or closed, with access to details about the affected item and its container for managing UI changes, animations, or asynchronous operations tied to collapsing panels.
</div>

#### Event Data

##### e.item `Element`

The collapsing item of the PanelBar.

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
            collapse: function(e) {
                console.log("Collapsed item:", e.item);
            }
        });
    </script>

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


<div class="meta-api-description">
Listen for or handle events triggered after asynchronous remote content loading in a collapsible panel interface, capturing when dynamic HTML is fetched via AJAX calls, enabling developers to run callbacks, update UI components, modify or inspect loaded markup, initialize nested widgets, trigger data transformations, synchronize interface changes, or clean up resources once external content is fully retrieved and integrated into the panel structure.
</div>

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
        var panelBar = $("#panelbar").kendoPanelBar().data("kendoPanelBar");
        // bind the contentLoad event
        panelBar.bind("contentLoad", function(e) {
            // handle event
        });
    </script>

### dataBound

Triggered after the dataSource change event has been processed (adding/removing items);


<div class="meta-api-description">
Detect when a dynamic list or menu completes updating after data changes, triggering actions to respond once items are added, removed, or modified in the interface. Monitor or handle events that occur after data source refreshes in hierarchical or expandable UI components, enabling updates to the user interface, rebinding event handlers, initializing interactive behaviors, or manipulating the DOM in response to new or changed data. Capture the moment when asynchronous data updates finish so you can run custom logic, synchronize UI states, or execute additional scripts tied to data rendering completion in navigational or menu structures.
</div>

#### Event Data

##### e.node `jQuery`

The node whose children have been changed. If the changes have occurred on the root level, this parameter is undefined.

#### Example - subscribe to the "dataBound" event during initialization

    <ul id="panelbar"></ul>
    <script>
    $("#panelbar").kendoPanelBar({
      dataSource: [
        { text: "foo", items: [
          { text: "bar" }
        ] }
      ],
      dataBound: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("DataBound", e.node);
      }
    });
    </script>

#### Example - subscribe to the "dataBound" event after initialization

    <ul id="panelbar"></ul>
    <script>
    function panelbar_dataBound(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
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

    <ul id="panelbar"></ul>
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


<div class="meta-api-description">
Detect and manage failures during asynchronous content loading in expandable panel interfaces by capturing load errors, enabling implementation of fallback actions like showing error notifications, logging error information, retrying failed AJAX requests, or handling network or server issues when dynamically retrieved panel content cannot be loaded. This event-driven error handling supports interruption detection of remote data fetches, facilitates debugging of dynamic UI components, and aids robust content loading control in interactive navigation panels.
</div>

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


<div class="meta-api-description">
Capture and respond to the action of expanding a collapsible panel or menu item, detect when an expandable section opens either by user interaction or programmatically, trigger custom logic upon expansion such as updating UI state, loading or rendering additional content dynamically, initiating animations, or synchronizing related components, monitor expansion events on accordion or panel controls to execute event handlers, listen for state changes when panels unfold or reveal nested items, handle expand triggers for dynamic content loading, manage event-driven updates on expandable UI elements, and intercept expansion events to customize user interface behavior and workflow.
</div>

#### Event Data

##### e.item `Element`

The expanding item of the PanelBar.

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
            expand: function(e) {
                console.log("Expanded item:", e.item);
            }
        });
    </script>

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

Triggered when an item of a PanelBar is selected by the user.


<div class="meta-api-description">
Capture user interactions when an item in a hierarchical or collapsible menu is chosen, detect selection changes to trigger custom logic or update interfaces, listen for selection events to handle user clicks or taps on menu entries, manage component state and perform actions based on which item is selected, respond dynamically to user navigation within expandable panels or tree structures, and access event details to determine the selected element for conditional rendering or data updates.
</div>

#### Event Data

##### e.item `Element`

The selected item of the PanelBar.

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
            select: function(e) {
                console.log("Selected item:", e.item);
            }
        });
    </script>

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
