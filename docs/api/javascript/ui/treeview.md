---
title: TreeView
page_title: Configuration, methods and events of Kendo UI TreeView
description: Documentation guide that helps the developer configure TreeView UI widget in a few quick steps, apply methods and trigger events.
res_type: api
component: treeview
---

# kendo.ui.TreeView

Represents the Kendo UI TreeView. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### animation `Boolean|Object`

A collection of visual animations used when items are expanded or collapsed through user interaction.
Setting this option to **false** will disable all animations.

`animation:true` is not a valid configuration.


<div class="meta-api-description">
Manage the visual effects and motion behavior when expanding or collapsing items in a hierarchical list or tree structure, enabling customization or disabling of animations that occur during user interactions to enhance UI responsiveness, reduce motion, or create smooth transitions; configure animation toggling, control expand/collapse visual feedback, and adjust the presence or absence of motion effects for better user experience in navigational trees.
</div>

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


<div class="meta-api-description">
Control and customize the collapsing effects, transitions, and timing when closing tree nodes in hierarchical data displays, including enabling or disabling animations, setting duration, easing functions, and configuring visual behaviors for smooth or instant node collapse within tree structures, toggle menus, or nested lists.
</div>

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


<div class="meta-api-description">
Adjust the timing and speed of the node collapse animation for tree structures by configuring the duration in milliseconds, enabling control over how quickly or slowly nodes fold or close in hierarchical views, with options to set or fine-tune animation intervals for smoother or faster transitions when collapsing tree items during user interaction or programmatic updates.
</div>

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


<div class="meta-api-description">
Configure and customize the visual transition effects applied when collapsing nodes in a hierarchical tree display, enabling smooth or subtle animations such as fading out content or vertically collapsing sections. Adjust and combine multiple animation options by specifying effect names like fade, fadeOut, or vertical collapse to control how nodes disappear or shrink on collapse events. Enable, set, or modify the collapse behavior animations for tree structures to enhance user interface responsiveness and visual feedback during node closing or hiding actions. Fine-tune the disappearance styles for collapsing elements, managing effects that govern opacity changes, vertical shrinking, or combined visual transitions to improve clarity and user experience in expandable lists or navigation trees.
</div>

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


<div class="meta-api-description">
Control and customize the visual transition effects when expanding tree nodes, including setting or disabling animations, adjusting animation duration, transition types, easing functions, and expand behavior for hierarchical lists or tree structures. Enable smooth node opening animations, configure how branches unfold, tailor expand effects for better user experience, or turn off expand animations entirely for instant node display in tree or outline views. Adjust timing and visual style of node expansion to suit UI preferences, improve interactivity feedback, or optimize performance when users expand or reveal nested items in a tree component.
</div>

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


<div class="meta-api-description">
Adjust the duration or speed of node expansion animations in hierarchical tree structures by setting the time interval in milliseconds for expand transitions, customizing how quickly or smoothly tree nodes open or unfold. Developers often seek to configure, tune, optimize, or control expand animation timing to enhance user experience, responsiveness, or visual flow when nodes in a tree view or expandable list are triggered. This setting can be used to speed up or slow down expand effects, modify transition delays, or fine-tune animation pacing for nested menus, folders, or expandable UI elements in applications.
</div>

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


<div class="meta-api-description">
Configure and customize the animation behavior for expanding hierarchical nodes in a tree structure by specifying multiple visual effects such as vertical expansion and fade-in transitions. Enable smooth, combined animations when opening or unfolding tree items, control the style and sequence of node expansion effects, and set preferred animation types to enhance user interface responsiveness and readability during node reveal. Options include layering expand vertical growth and gradual opacity increase effects simultaneously to create dynamic, visually appealing node expansion animations within hierarchical data displays or navigation trees.
</div>

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

If set to `false` the widget will not bind to the data source during initialization. In this case data binding will occur when the [change](/api/javascript/data/datasource/events/change) event of the
data source is fired. By default the widget will bind to the data source specified in the configuration.

> Setting `autoBind` to `false` is useful when multiple widgets are bound to the same data source. Disabling automatic binding ensures that the shared data source does not make more than one request to the remote service.


<div class="meta-api-description">
Configure or control the timing of data binding for hierarchical or tree structures, enabling delayed or immediate data loading from the connected data source; options include automatic binding during initialization or postponing binding until data changes occur, useful for optimizing performance, avoiding redundant data requests, and managing shared data sources across multiple tree or nested list components by setting binding triggers or deferring data fetch until explicit events or changes happen.
</div>

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


<div class="meta-api-description">
Control automatic scrolling behavior that triggers when dragging or navigating near the top or bottom edges of a tree-like list or hierarchical view, enabling smooth continuous scrolling as the mouse cursor or touch pointer approaches container edges so items remain visible during drag-and-drop, selection, or navigation actions; configure auto edge scrolling to keep focus on offscreen elements, improve usability for nested item manipulation, and maintain seamless viewport movement without manual scroll input, supporting scenarios where the scroll container differs from the displayed tree structure.
</div>

#### Example - use autoScroll in a scrollable container

    <div style="height:100px; overflow: auto">
      <div id="treeview"></div>
    </div>

    <script>
      var dataSource = new kendo.data.HierarchicalDataSource({
        data: [
          { text: "Apple" },
          { text: "Banana" },
          { text: "Orange" },
          { text: "Tomato" },
          { text: "Melon" },
          { text: "Ananas" },
          { text: "Cucumber" }
        ]
      });

      var treeView = $("#treeview").kendoTreeView({
        autoScroll: true,
        dragAndDrop: true,
        dataSource: dataSource
      });
    </script>

    <style>
      .k-widget.k-treeview {
        overflow: hidden;
      }
    </style>

### checkboxes `Boolean|Object` *(default: false)*

If `true` or an object, renders checkboxes beside each node.


<div class="meta-api-description">
Activate or configure selectable checkboxes adjacent to hierarchical tree nodes to allow users to mark, toggle, enable, or select individual items within a tree structure interface, supporting scenarios such as multi-selection, item checking, batch actions, or state tracking by rendering clickable checkboxes next to each node. This feature can be set to true for simple enablement or customized through options to control checkbox behavior, interaction, and display, making it possible to manage checked states programmatically or via user input during tree view initialization and rendering.
</div>

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


<div class="meta-api-description">
Enable or configure automatic checkbox state propagation in hierarchical tree structures to ensure selecting a parent node sets or clears all its child item checkboxes instantly, with support for partial selections that trigger an indeterminate or mixed state on parent nodes. Control cascading selection and deselection behaviors in tree views or nested lists where checking or unchecking parent elements synchronizes with their descendants, useful for managing group selections, bulk toggling, and reflecting partial child item states dynamically during initialization or runtime setups. Adjust this to activate tri-state checkbox support that visually indicates when some, but not all, child nodes are selected, improving clarity in nested checkbox lists and complex UI components with hierarchical data.
</div>

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


<div class="meta-api-description">
Set or customize the HTML name attribute for checkbox inputs within a hierarchical tree structure to control how selected checkbox values are grouped and submitted in form data, enabling consistent form payload keys, server-side binding, request handling, and integration with backend processing. Configure checkbox input names to ensure proper data inclusion during form submission, support name alignment for server requests, and manage form input identifiers for checkbox selections within dynamic tree components.
</div>

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

The [template](/api/javascript/kendo/methods/template) which renders the checkboxes. Can be used to allow posting of
additional information along the TreeView checkboxes.

The fields which can be used in the template are:

* item - the data item of the given node
* treeview - the TreeView options


<div class="meta-api-description">
Control and customize the rendering of checkboxes within hierarchical tree structures, enabling you to modify the checkbox appearance, inject custom HTML markup, add hidden inputs, or attach additional data attributes for server-side processing and form submission. Configure templates to tailor each checkbox’s embedded content based on the underlying data item or tree configuration, allowing insertion of metadata, dynamic attributes, or specialized markup that enhances interaction, data binding, or state management in tree views with selectable nodes. This covers use cases like customizing checkbox output, enhancing postback payloads, embedding extra information per node, and controlling the visual or data aspects of checkboxes in nested lists or complex tree components.
</div>

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


<div class="meta-api-description">
Specify or configure the field name from your data source that holds the image URL for displaying icons, thumbnails, or pictures on hierarchical tree nodes or tree view components, enabling binding of custom images, node-specific visuals, or dynamic URLs for node decorations and enhancing tree item presentation with user-defined graphics or icons.
</div>

#### Example - specify custom image URL field

    <div id="treeview"></div>
    <script>
    var items = [
      { text: "Mail", image: "https://demos.telerik.com/kendo-ui/content/web/treeview/mail.png" },
      { text: "Search", image: "https://demos.telerik.com/kendo-ui/content/web/treeview/search.png" }
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


<div class="meta-api-description">
Connect or link hierarchical, nested, or tree-structured data to the TreeView control by setting or assigning its data input source using arrays, JavaScript objects, or predefined hierarchical data sources, enabling dynamic population and rendering of expandable nodes, branches, and child elements; configure, supply, or update the underlying data source with raw data arrays, object collections, or specialized data source instances to control the tree's content, structure, and node hierarchy without manual initialization, allowing flexible data binding, dynamic updates, and seamless integration with existing data source patterns for rendering multi-level, parent-child relationships within a navigable, collapsible tree interface.
</div>

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

    $("#treeview").kendoTreeView({
      dataSource: dataSource,
      dataTextField: "FullName"
    });
    </script>

### dataSpriteCssClassField `String` *(default: null)*

Sets the field of the data item that provides the sprite CSS class of the nodes.
If an array, each level uses the field that is at the same index in the array, or the last item in the array.


<div class="meta-api-description">
Control or configure CSS sprite classes applied to TreeView nodes by specifying the data source field(s) that contain class names, supporting both single string field names or arrays for hierarchical levels, enabling dynamic styling of tree node icons or visuals based on data properties with fallback behavior for unmatched levels, useful for customizing appearance, theming, or icon sets in tree structures by linking node data fields to CSS sprite classes.
</div>

#### Example

    <style>
      #treeview .k-sprite {
        background-image: url("https://demos.telerik.com/kendo-ui/content/web/treeview/coloricons-sprite.png");
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


<div class="meta-api-description">
Control or configure the text content displayed for each node in a hierarchical tree structure by specifying the data field or property that supplies the label or title for nodes, including options to assign different text fields based on tree levels or depths, enabling customized node labeling, dynamic field selection, multi-level text mapping, or setting node captions depending on data attributes or nested array elements.
</div>

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


<div class="meta-api-description">
Control which data field supplies the link URL for each tree node to enable clickable navigation, anchor tags, or external linking in hierarchical views; configure the source field containing hrefs for nodes, set or map URL properties to TreeView items, specify link targets embedded in tree data, and manage how tree elements connect to web addresses for user interactions, deep linking, or routing within applications.
</div>

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

### dragAndDrop `Boolean|Object` *(default: false)*

Disables (**false**) or enables (**true**) drag-and-drop of the nodes. If configured as an object allows disabling click move click interaction as an alternative of dragging.


<div class="meta-api-description">
Control the ability to drag, drop, reorder, or move nodes within a hierarchical tree structure, enabling or disabling interactive drag-and-drop node rearrangement, with options to customize drag behavior, prevent specific click-and-move-click interactions, allow node repositioning, and configure whether users can click and drag tree items to change their order or nesting.
</div>

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

### dragAndDrop.clickMoveClick `Boolean` *(default: false)*

Disables (**false**) or enables (**true**) the click move click interaction as an alternative of dragging. The alternative is disabled by default.

> Please note that this functionality would not play well when checkboxes are present in the TreeView. On each checkbox click the respective item will be grabbed to be moved. The same also applies for selection, as every selected item will also be grabbed.


<div class="meta-api-description">
Enable configuring item relocation within a hierarchical tree structure using a click-move-click interaction instead of traditional drag-and-drop, allowing users to select or grab nodes with a single click, move them with a second click, and drop with a third; this feature supports controlling whether moving items is done via clicking sequences rather than dragging gestures and can adjust behavior when checkboxes or multiple selections are involved, facilitating alternative drag and drop workflows, click-based node repositioning, gesture customization for item moving, or click-driven structure reordering in tree views.
</div>

#### Example

    <div id="treeview"></div>
    <script>
    $("#treeview").kendoTreeView({
      dragAndDrop: {
        clickMoveClick: true
      },
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


<div class="meta-api-description">
Control how child nodes in a hierarchical tree structure are loaded, enabling lazy loading or on-demand fetching of child data only when a parent node is expanded to improve performance and reduce upfront data retrieval; configure whether to defer loading of nested datasets until user interaction triggers expansion or to preload all child collections at initialization, including options for toggling between loading all descendants immediately or dynamically loading subsets on expansion, supporting scenarios such as incremental data fetching, dynamic tree population, partial loading strategies, and improving responsiveness in large data trees.
</div>

#### Example - force lazy loading of sublevels

    <div id="treeview"></div>
    <script>
      var serviceRoot = "https://demos.telerik.com/service/v2/core";
      homogeneous = new kendo.data.HierarchicalDataSource({
        transport: {
          read: {
            url: serviceRoot + "/Employees"
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
        dataSource: homogeneous,
        loadOnDemand: false,
        dataTextField: "FullName"
      });
    </script>

### messages `Object`

The text messages displayed in the widget. Use it to customize or localize the messages.


<div class="meta-api-description">
Customize, configure, or localize the text labels, messages, and user interface strings displayed in hierarchical or tree-structured views, enabling control over language translations, terminology adjustments, and personalized wording for node titles, prompts, alerts, and interface messages within tree navigation components.
</div>

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


<div class="meta-api-description">
Control, configure, or set the text displayed as a loading indicator or message during asynchronous fetching, initialization, or rendering of root-level tree nodes or hierarchical data in a navigation or expandable list interface, enabling localization, customization, or translation of placeholder text, status updates, or progress prompts shown while waiting for tree data to load, appear, or refresh in a tree view component or widget.
</div>

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


<div class="meta-api-description">
Customize the error message, notification text, or alert displayed when loading data, fetching content, or retrieving nodes from a hierarchical or tree structure fails or encounters a network, server, or API request error, enabling control over failure feedback, user-facing load errors, or messages shown during data retrieval issues in tree views or nested item collections.
</div>

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


<div class="meta-api-description">
Customize and localize the text shown on retry buttons within hierarchical or tree-structured interfaces, enabling developers to set, control, or translate the retry action label for user prompts, error handling, or recovery workflows in tree views, lists, or expandable item components, supporting multiple languages, localization, internationalization, and user interface messaging for retry or reload interactions.
</div>

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


<div class="meta-api-description">
Customize the rendering of hierarchical tree nodes by defining templates that control node appearance using string templates or functions generating HTML output, enabling dynamic binding to node data fields to display custom markup, icons, links, or conditional content for each tree item. Configure node layout, style, and interactive elements by setting templates that modify how data is presented within tree structures, suitable for tailored UI designs, conditional formatting, or embedding clickable elements inside nodes. Adjust node rendering logic during initialization to create personalized tree views with flexible template-driven content based on node properties and metadata.
</div>

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

### size `String`*(default: "medium")*

Sets a value controlling size of the component. Can also be set to the following string values:

- "small"
- "medium"
- "large"
- "none"


<div class="meta-api-description">
Adjust, configure, or set the visual size, scale, dimension, or density of the hierarchical TreeView element or component interface using numeric values or predefined size presets like small, medium, large, or none, enabling customization of how compact, spacious, or visually dense the tree structure appears in user interfaces or application layouts during initialization or runtime sizing options.
</div>

#### Example

    <div id="treeview"></div>
    <script>
    $("#treeview").kendoTreeView({
      size: "small",
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


<div class="meta-api-description">
Insert, add, or move nodes within a hierarchical tree structure by using a method that enables appending child elements to specified parent nodes, appending directly to the root, or repositioning existing nodes to different branches for dynamic reordering and updating of the tree layout. Control hierarchical organization, update node placement programmatically, restructure nested items, and modify tree levels to customize or manage complex nested data efficiently and flexibly after initialization. Adjust the tree hierarchy by configuring node insertion points, managing parent-child relationships, and enabling dynamic tree modifications through appending operations.
</div>

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


<div class="meta-api-description">
Control and manage hierarchical node visibility by programmatically collapsing expanded tree branches, closing open nodes, hiding child elements, or shrinking selected nodes based on references such as element handles or data items; implement behaviors like collapsing all nodes, closing specific branches on command, or dynamically hiding descendants in tree structures to customize user interface navigation, enable node toggling, or respond to user-triggered collapse actions efficiently.
</div>

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
    treeview.collapse(".k-treeview-item");

    </script>

#### Parameters

##### nodes `jQuery|Element|String`

The nodes that will be collapsed.

### dataItem

Returns the data item to which the specified node is bound.


<div class="meta-api-description">
Access or fetch the underlying data object or model tied to a specific node or item within a hierarchical tree structure, enabling inspection, retrieval, or modification of that node’s associated fields, attributes, or properties; this method supports queries for the node’s bound data, pulling the original data item behind the displayed element, useful for updating content, reading nested values, or integrating node-specific logic in tree views or nested lists.
</div>

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
    var dataItem = treeview.dataItem(".k-treeview-item:first");
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(dataItem.text); // displays "foo"
    </script>

See also: [getting the node data in the select event handler](/web/treeview/overview#get-node-data-in-select-event-handler)

### destroy

Prepares the widget for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> This method does not remove the widget element from DOM.


<div class="meta-api-description">
Clean up and teardown of hierarchical UI components to prevent memory leaks by detaching event listeners, removing stored data attributes, recursively destroying nested child elements, disabling event handlers, and preparing tree structure widgets for safe removal without deleting the actual DOM nodes, enabling controlled dismantling and resource cleanup for composite components and nested interactive elements.
</div>

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


<div class="meta-api-description">
Remove or extract a tree node element from a hierarchical or TreeView structure while retaining all associated data, cached information, and metadata stored via jQuery or similar data APIs, enabling scenarios like moving, reusing, reinserting, or temporarily hiding nodes without losing their underlying state, properties, or event bindings. This function supports developers looking to manipulate tree nodes dynamically, preserve internal data during DOM removal, control node visibility without data loss, and manage node lifecycle with data persistence for caching, drag-and-drop, or deferred rendering use cases.
</div>

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
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(item.data("id")); // logs "abc"
    </script>

### enable

Enables or disables nodes.


<div class="meta-api-description">
Control whether tree nodes are active, clickable, selectable, focusable, or navigable by programmatically enabling or disabling individual or multiple nodes using methods to toggle their interactive state, set node accessibility, manage node availability for user interaction, adjust which nodes respond to clicks or keyboard navigation, and configure node enabled or disabled status dynamically in hierarchical views or navigation trees.
</div>

#### Parameters

##### nodes `jQuery|Element|String|Boolean`

The nodes that are to be enabled/disabled. Or, if *Boolean* parameter is passed, all nodes will be enabled/disabled.

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

#### Example - enable all nodes

    <div id="treeview"></div>
    <script>
    $("#treeview").kendoTreeView({
      dataSource: [
        { text: "foo", enabled: false },
        { text: "bar", enabled: false }
      ]
    });

    var treeview = $("#treeview").data("kendoTreeView");

    // enable all items
    treeview.enable(true);
    </script>

### expand

Expands collapsed nodes.


<div class="meta-api-description">
Invoke the function that opens or displays hidden child elements within a hierarchical view, enabling programmatic expansion of collapsed branches or nodes to reveal nested items and control navigation flow, synchronize visual state after updates, or automatically show deeper levels of a tree structure without requiring user clicks; this method helps in dynamically unfolding tree nodes, managing visibility of subitems, and facilitating automated traversal or inspection of hierarchical data.
</div>

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
        { text: "baz", items: [
		  { text: "biz" }
		] }
      ]
    });

    var treeview = $("#treeview").data("kendoTreeView");
    // expand the item with text "foo"
    treeview.expand(treeview.findByText("foo"));

    // expand all loaded items
    treeview.expand(".k-treeview-item");
    </script>

### expandPath

Expands all nodes from a provided path array, including the last node. Nodes may be loaded from a remote end-point.


<div class="meta-api-description">
Expand or open a sequence of nested tree nodes using a path array to programmatically reveal and navigate to specific branches or leaf nodes within a hierarchical tree structure, including handling asynchronous or lazy loading of intermediate nodes from remote sources, enabling dynamic expansion for selection, editing, or focused navigation tasks in a tree view component.
</div>

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


<div class="meta-api-description">
Programmatically expand all parent nodes and reveal the full hierarchy path to a specific tree item, enabling navigation or automatic opening of nested nodes within a tree structure based on a target element like a DOM node or bound data object already present in the tree. Control tree expansion to ensure a particular branch or node is visible, set open states for ancestor nodes, or navigate deep into nested data by unfolding the tree to the desired item destination.
</div>

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


<div class="meta-api-description">
Locate, find, or search for a tree node by visible label text within a hierarchical structure, enabling you to identify, select, expand, or manipulate the first node whose displayed string matches the query; supports exact or partial text matching, label lookup, node retrieval by display name, and programmatic access to tree elements based on their shown text content.
</div>

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
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(foo);
    </script>

### findByUid

Searches for a node with the given unique identifier.
Applicable when the widget is bound to a [HierarchicalDataSource](/api/javascript/data/hierarchicaldatasource).
If you want to find a node by its `id`, use the [dataSource.get()](/api/javascript/data/datasource#get) method and supply its uid to the `findByUid` method.


<div class="meta-api-description">
Locate or search for a tree node using its unique identifier or UID to retrieve, find, access, or manipulate specific branches or elements within hierarchical or nested data structures. Enable pinpointing nodes by their unique keys or IDs, integrate with data sources for fetching nodes by ID followed by UID matching, perform targeted lookups in TreeView components, configure searches for nodes based on unique identifiers, and control access to particular nodes using their UID for operations like update, delete, or highlight in hierarchical views.
</div>

#### Parameters

##### uid `String`

The uid that is being searched for.

#### Returns

`jQuery` The found node, wrapped in jQuery object.

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
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(barElement);
    </script>

### focus

Sets the focus to the TreeView


<div class="meta-api-description">
Programmatically set or move keyboard focus to a hierarchical tree component to enable keyboard navigation, such as arrow key movement, item selection, and interaction with accessible elements. Control or activate focus on the tree structure after rendering or user events to ensure the interface responds to keyboard input, improving accessibility and allowing developers to configure keyboard-driven interactions within nested tree nodes or lists. Use focus control to manage input focus dynamically and support user workflows that require programmatic keyboard focus shifts for tree views or similar expandable, selectable multi-level UI components.
</div>

#### Example

    <div id="treeview"></div>
    <script>
    $("#treeview").kendoTreeView({
      dataSource: [
        { text: "foo" },
        { text: "bar" },
      ]
    });

    var treeview = $("#treeview").data("kendoTreeView");
    treeview.focus();
    </script>

### insertAfter

Inserts a node after a specified node.
This method may also be used to reorder nodes.


<div class="meta-api-description">
Add or move a tree node directly after a specific existing node to insert siblings, reorder items, adjust node sequence, or reposition nodes within a hierarchical tree structure, supporting dynamic updates, node placement control, sibling insertion, and seamless reordering of entries in a tree or nested list.
</div>

#### Parameters

##### nodeData `Object`

A JSON-formatted string or selector that specifies the node to be inserted.

##### referenceNode `jQuery`

The node that will precede the newly-appended node.

#### Returns

`jQuery` The inserted `<li>` element, wrapped in a jQuery object.

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


<div class="meta-api-description">
Insert, add, or move tree nodes to a specific position before an existing node within a hierarchical TreeView structure, enabling dynamic rearrangement, programmatic reordering, or precise placement of new or existing elements as the immediate previous sibling. This includes controlling node order, repositioning child or parent nodes, adjusting tree hierarchy, modifying node sequences, and programmatically shifting or inserting elements before target nodes to customize tree layouts, structure manipulation, or update node order based on application logic or user interaction.
</div>

#### Parameters

##### nodeData `Object`

A JSON-formatted string or selector that specifies the node to be inserted.

##### referenceNode `jQuery`

The node that follows the inserted node.

#### Returns

`jQuery` The inserted `<li>` element, wrapped in a jQuery object.

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

Obtains an Array of the DOM elements, which correspond to the data items from the Kendo UI DataSource [view](/api/javascript/data/datasource/methods/view).


<div class="meta-api-description">
Retrieve the rendered DOM elements matching the current data items displayed in the hierarchical tree structure, enabling access to an array of HTML elements that align with the ordered and grouped data model from the underlying data source view; this method supports tasks such as attaching event listeners, measuring element size or position, updating styles or content dynamically, and synchronizing UI elements with data changes for customizable interaction and layout adjustments in tree-like component interfaces.
</div>

#### Returns

`Array` The currently rendered tree items (`<div>` elements, that are children of the `<li>` elements).

#### Example

    <div id="treeview"></div>
    <script>
    $("#treeview").kendoTreeView({
      dataSource: [
        { text: "Item 1" },
        { text: "Item 2" },
        { text: "Item 3", items: [
          { text: "Sub Item 1" },
          { text: "Sub Item 2" }
        ]}
      ]
    });

    var treeview = $("#treeview").data("kendoTreeView");
    
    // Get all currently rendered tree items
    var items = treeview.items();
    
    console.log("Number of rendered items:", items.length);
    // Log each item's text content
    items.each(function(index, element) {
      console.log("Item " + index + ":", $(element).find(".k-in").text());
    });
    </script>

### parent

Gets the parent node of the item


<div class="meta-api-description">
Find or obtain the parent node of any given item within a tree structure, enabling navigation upwards, access to immediate ancestor elements, retrieval of higher-level nodes, inspection of parent-child relationships, traversal from child to parent, controlling or updating hierarchical links, setting or getting ancestor references, managing or modifying the tree’s lineage, and supporting operations like moving from a node back to its container or organizing parent nodes dynamically.
</div>

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

    var parentTask = treeview.parent(treeview.findByText("bar"));
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(treeview.text(parentTask)); // logs "foo"

    parentTask = treeview.parent(parentTask);
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(parentTask.length); // logs 0
    </script>

### remove

Removes a node from the widget.


<div class="meta-api-description">
Delete or detach a node dynamically from a tree structure by calling a function that removes specific items at runtime, enabling modification of the hierarchical view on demand, controlling node elimination or exclusion, updating the visual tree representation immediately, managing tree data by discarding unwanted nodes, adjusting the displayed items interactively through code, and supporting operations like removing branches, leaves, or individual elements from the tree interface during application execution.
</div>

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

	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log($("#treeview").find(".k-item").length); // logs 1
    </script>

### scrollTo

Scrolls to a visible node in the TreeView. Behaves in a similar way to calling `scrollIntoView({ block: 'nearest' })` method of the item element. The `scrollTo` method will not expand collapsed parents, hence will not scroll if the node is not visible.


<div class="meta-api-description">
Scroll a specific item or node within a hierarchical tree or nested list view into the visible viewport programmatically without altering expansion states, ensuring the element is brought into view if already rendered and visible, mimicking native DOM scrolling behavior like scrollIntoView with nearest block alignment; control or enable smooth navigation, automatic scrolling, or focus management for tree-like structures where parent nodes remain collapsed but you want to scroll only to nodes currently visible, supporting scenarios of dynamic interface updates, keyboard navigation, and automated view adjustments without expanding or collapsing tree branches.
</div>

#### Parameters

##### node `jQuery`

The node to which the TreeView should scroll and make it visible.

#### Example

    <div id="treeview" style="max-height: 90px"></div>
    <script>
    $("#treeview").kendoTreeView({
      dataSource: [
        {
          text: "foo",
          expanded: true,
          items: [
            { text: "bar" },
            { text: "biz" },
            { text: "baz" }
          ]
        }
      ]
    });

    var treeview = $("#treeview").data("kendoTreeView");

    var baz = treeview.findByText("baz");
    treeview.scrollTo(baz);
    </script>

### select

Gets or sets the selected node.


<div class="meta-api-description">
Programmatically get or set the currently selected item or node within a hierarchical TreeView structure, enabling control over selection state, retrieving the active or highlighted node, updating selection by element or selector references, toggling which node is marked as chosen, and managing focused or active entries in tree components through code without manual user interaction.
</div>

#### Parameters

##### node `jQuery|Element|String` *(optional)*

If provided, the node that should be selected.

#### Returns

`jQuery` The currently selected node.

#### Example - select a node by passing an element

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

	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(treeview.text(treeview.select())); // logs "bar"

    treeview.select($()); // clears selection
    </script>

#### Example - select a node by passing a jQuery selector

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
    treeview.select($(".k-treeview-item").last());

	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(treeview.text(treeview.select())); // logs "bar"

    </script>

#### Example - select a node by passing a string

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
    treeview.select(".k-treeview-item:last");

	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(treeview.text(treeview.select())); // logs "bar"

    </script>

### setDataSource

Sets and binds a dataSource to the widget.

> Note: Calling this method with an array will not change the loadOnDemand flag, unlike initialization with an array option.


<div class="meta-api-description">
Update, replace, or bind a new data source dynamically to a tree structure or hierarchical view component after it has been initialized, allowing developers to set or reset the underlying dataset using various formats such as JavaScript arrays, configuration objects, or data source instances. This method supports changing the displayed items or nodes on demand, enabling real-time data updates, dynamic data refreshing, switching between different data collections, and reconfiguring the data input without reinitializing the component, while preserving existing settings like lazy loading or load-on-demand flags unless explicitly altered. It caters to scenarios involving runtime data manipulation, data rebinding, switching data providers, or updating tree content based on user actions or external data changes.
</div>

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


<div class="meta-api-description">
Access or modify the displayed label or caption of a node in a hierarchical tree structure, enabling retrieval of the current text or dynamic updates to node names, labels, or titles. This functionality supports reading the node’s visible string for display, fetching or inspecting node labels, as well as programmatic renaming, relabeling, localizing, or updating node text content dynamically during runtime. It allows integration with user input, data refreshes, UI updates, or API-driven changes to control node headings, descriptions, or tag values within tree-based components or navigation controls.
</div>

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

    var firstItem = treeview.element.find(".k-treeview-item:first");
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(treeview.text(firstItem)); // logs "foo"

    treeview.text(".k-treeview-item:last", "qux"); // sets text to "qux"
    </script>

### toggle

Toggles the node of a TreeView between its expanded and collapsed states.


<div class="meta-api-description">
Control and modify the expansion or collapse state of a TreeView node programmatically by switching its open or closed status through methods to enable dynamic UI changes, automated toggling in response to events, simulate user clicks on nodes, configure node visibility, or integrate with custom logic to expand and collapse tree structures based on application state or user interaction patterns.
</div>

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
Call it after using the insert / remove API on TreeViews with [checkChildren: true](/api/javascript/ui/treeview#configuration-checkboxes.checkChildren).
Use to improve performance when checking multiple checkboxes through code.


<div class="meta-api-description">
Refresh, recalculate, or recompute checkbox indeterminate states in tree structures after dynamically adding or removing nodes, enabling accurate visual representation of partially selected parent checkboxes. Optimize performance and reduce unnecessary DOM updates when bulk checking, unchecking, or programmatically modifying nested items in hierarchical tree views with cascading checkbox behavior. Ensure checkbox states correctly reflect child selections by updating indeterminate statuses after node insertion or deletion, useful for synchronized or conditional checkbox control in trees with automatic child selection configured.
</div>

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


<div class="meta-api-description">
Detect and handle selection changes in hierarchical lists or tree structures when users click, navigate, or programmatically update selected nodes; respond to selection updates for UI refreshes, state synchronization, or executing custom logic triggered by user input or code-driven selection adjustments, capturing event details to access the newly selected items or node data, enabling dynamic interaction, validation, or data binding workflows based on the current tree selection state.
</div>

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
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("Change", this.select());
      }
    });
    </script>

#### Example - subscribe to the "change" event after initialization

    <div id="treeview"></div>
    <script>
    function tree_change(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
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


<div class="meta-api-description">
Detect and respond to changes in checkbox selections within hierarchical tree structures by listening for check or uncheck actions on nodes, enabling developers to configure event handlers that update data models, synchronize selections, trigger UI refreshes, or implement custom logic when users toggle checkboxes. This event supports cascading behavior by optionally waiting for all child node states to be updated before firing, facilitating bulk or recursive state management. Ideal for managing interactive tree views where checkbox state changes need to be tracked, controlled, or propagated across parent and child nodes in user interfaces or data-driven applications.
</div>

#### Event Data

##### e.node `Element`

The node whose the checkbox has been checked.

#### Example - subscribe to the "check" event during initialization

    <div id="treeview"></div>
    <script>
    $("#treeview").kendoTreeView({
      checkboxes: true,
      dataSource: [
        { text: "foo", items: [
          { text: "bar" }
        ] }
      ],
      check: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("Checking", e.node);
		console.log("Is node checked -> " + $(e.node).attr("aria-checked"))
      }
    });
    </script>

#### Example - subscribe to the "check" event after initialization

    <div id="treeview"></div>
    <script>
    function tree_check(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log("Checking", e.node);
    }
    $("#treeview").kendoTreeView({
      checkboxes: true,
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


<div class="meta-api-description">
Detect, intercept, or cancel node or subgroup collapsing actions in hierarchical views to control whether branches or tree nodes fold or stay expanded, enabling developers to run custom validation, asynchronous checks, or conditional logic before collapse occurs, and to prevent collapsing specific nodes by blocking the collapse event or overriding default behavior.
</div>

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
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("Collapsing", e.node);
      }
    });
    </script>

#### Example - subscribe to the "collapse" event after initialization

    <div id="treeview"></div>
    <script>
    function tree_collapse(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
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


<div class="meta-api-description">
Trigger actions after the tree structure finishes loading or updating data from its source, enabling detection when nodes are added, removed, or changed, allowing execution of custom logic post data refresh, such as updating interface elements, resetting selections, attaching event handlers anew, or syncing the tree’s visual state with external variables. Capture the completion of asynchronous data processing in hierarchical views to run callbacks once the displayed items and internal state reflect the latest data modifications, supporting scenarios like dynamic data loading, UI refresh after data mutations, or programmatic state synchronization following data updates.
</div>

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
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("DataBound", e.node);
      }
    });
    </script>

#### Example - subscribe to the "dataBound" event after initialization

    <div id="treeview"></div>
    <script>
    function tree_dataBound(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
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

	treeview.setDataSource(new kendo.data.HierarchicalDataSource({
      data: [
        { text: "bar", items: [
          { text: "baz" }
        ] }
      ]
    }));
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


<div class="meta-api-description">
Detect and manage ongoing node dragging actions within hierarchical tree structures by capturing continuous drag progress events during node repositioning, enabling dynamic updates to visual indicators, placeholders, drop target validation, or drag cancellation to facilitate real-time interaction control and smooth drag-and-drop workflows in tree views or nested item lists.
</div>

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

The status that the drag clue shows (**add**, **denied**, **insert-top**, **insert-middle** or **insert-bottom**).

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

> Please note that from version 2016.3.914 the naming convention for pre-defined status classes is k-i-className. Since version 2023.1.314 the following status classes are used: `k-i-insert-top`, `k-i-insert-bottom`, `k-i-insert-middle`, `k-i-plus`, `k-i-cancel`.

> Note that status classes are returned without the `k-` prefix by `e.statusClass`, but this prefix is required when setting a predefined status class via `e.setStatusClass`. A prefix is not required if setting a custom status CSS class.

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
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("Drag", e.sourceNode, "over", e.dropTarget);
      }
    });
    </script>

#### Example - subscribe to the "drag" event after initialization

    <div id="treeview"></div>
    <script>
    function tree_drag(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
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
        e.setStatusClass("k-i-cancel");
      }
    });
    </script>

### dragend

Triggered after a node has been dropped.


<div class="meta-api-description">
Detect when a drag-and-drop operation finishes on a tree structure to handle post-drop logic like updating data, rearranging nodes, refreshing the interface, saving changes, or triggering custom behaviors based on which item was dragged and where it was dropped, capturing details about source nodes, target locations, drop positions, and resulting modifications for monitoring, validation, or adjusting the tree hierarchy dynamically after user interactions.
</div>

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
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("Drag end", e.sourceNode, e.dropPosition, e.destinationNode);
      }
    });
    </script>

#### Example - subscribe to the "dragend" event after initialization

    <div id="treeview"></div>
    <script>
    function tree_dragend(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
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


<div class="meta-api-description">
Intercept or control the initiation of dragging a tree node by detecting the drag start event before the drag action begins, enabling inspection of the drag source element, access to the node data or data item, configuring custom drag information, modifying drag behavior, or canceling the drag operation using event prevention methods to customize or conditionally block node dragging within hierarchical views or tree structures.
</div>

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
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("Drag start", e.sourceNode);
      }
    });
    </script>

#### Example - subscribe to the "dragstart" event after initialization

    <div id="treeview"></div>
    <script>
    function tree_dragstart(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
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


<div class="meta-api-description">
Detect and respond to drag-and-drop actions within hierarchical lists or tree structures, capturing when a user finishes moving a node to a new location. This event triggers on drop completion, enabling inspection of the dragged element, the drop target, and the exact drop position, with options to customize behavior by validating, canceling, or altering the drop process. Developers often configure this to update underlying data models, reorder items dynamically, enforce custom validation rules on allowed drops, or implement drag-and-drop workflows that require precise control over node relocation and interaction outcomes.
</div>

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
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("Dropped", e.sourceNode);
      }
    });
    </script>

#### Example - subscribe to the "drop" event after initialization

    <div id="treeview"></div>
    <script>
    function tree_drop(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
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


<div class="meta-api-description">
Detect, handle, or intercept node opening actions before child groups or subtrees expand in hierarchical views, enabling conditional checks, validation of current state, asynchronous data fetching, UI updates, and preparatory tasks triggered just before expanding nested nodes or tree branches; support for managing expansion events allows developers to control, cancel, delay, or augment the process of unfolding tree structures, responding programmatically to user interaction or system-driven expansions in data trees or nested lists.
</div>

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
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("Expand", e.node);
      }
    });
    </script>

#### Example - subscribe to the "expand" event after initialization

    <div id="treeview"></div>
    <script>
    function tree_expand(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
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

### loadCompleted

This event triggers only when `loadOnDemand` is set to `false` - it indicates that all nodes that need to be loaded are ready and present as data items in the DataSource of the TreeView.


<div class="meta-api-description">
Detect when a hierarchical tree structure has fully loaded all its data nodes without on-demand loading, enabling actions after complete data availability such as executing post-load processes, updating interfaces, initializing selections, handling complete datasets, or triggering events once every tree node is present in the data source; useful for workflows that depend on the entire tree hierarchy being preloaded and static, excluding scenarios where nodes load dynamically or asynchronously during interaction.
</div>

#### Event Data

##### e.nodes `Array`

Applicable for remote binding scenario only. All the nodes that have children and are loaded. If empty array is passed then no nodes have children to be loaded. For a local binding scenario the argument will always be an empty array.

#### Example

    <div id="treeview"></div>
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

    $("#treeview").kendoTreeView({
      loadOnDemand: false,
      dataSource: dataSource,
      dataTextField: "FullName",
      loadCompleted: function (ev) {
        console.log("Load Completed: ", ev.nodes);
      }
    });
    </script>

### kendoKeydown

Triggered when the user presses a keyboard key while the TreeView is focused.


<div class="meta-api-description">
Capture and manage keyboard input events such as arrow key navigation, Enter, Space, and shortcut keys while interacting with hierarchical lists or tree structures, enabling custom keyboard controls for selecting, expanding, collapsing, or moving focus between nodes, intercepting key presses to override default navigation, preventing default actions, stopping event propagation, and enhancing accessibility and keyboard-driven interaction within nested item trees.
</div>

#### Event Data

##### e.sender `kendo.ui.TreeView`

The **TreeView** instance that triggered the event.

##### e.preventKendoKeydown `Boolean`

If set to `true` prevents the TreeView keydown logic.

##### e.preventDefault `Function`

If invoked cancels the default action that belongs to the keydown event.

#### Example - subscribe to the "kendoKeydown" event during initialization

    <div id="treeview"></div>

    <script>
      $("#treeview").kendoTreeView({
        dataSource: [{
          text: "foo",
          items: [{ text: "bar" }]
        }],
        kendoKeydown: function(e) {
          e.preventKendoKeydown = true;
        }
      });
    </script>

#### Example - prevent only the TreeView Enter keydown logic

    <div id="treeview"></div>

    <script>
      $("#treeview").kendoTreeView({
        dataSource: [{
          text: "foo",
          items: [{ text: "bar" }]
        }],
        kendoKeydown: function(e) {
          if(e.keyCode === kendo.keys.ENTER){
            e.preventKendoKeydown = true;
            // add custom code here to handle the event
          }
        }
      });
    </script>

### navigate

Triggered when the user moves the focus on another node


<div class="meta-api-description">
Capture and handle focus changes between hierarchical nodes triggered by keyboard, mouse, or programmatic navigation within a tree structure, enabling detection of node transitions, updating user interface elements, highlighting selected items, managing focus states dynamically, responding to navigation events, intercepting event details for custom behavior, controlling keyboard and pointer navigation flows, monitoring focus movement across tree nodes, and implementing tailored navigation logic or UI updates based on user interaction within tree-like components.
</div>

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
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("Navigated to", e.node);
      }
    });
    </script>

#### Example - subscribe to the "navigate" event after initialization

    <div id="treeview"></div>
    <script>
    function tree_navigate(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
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


<div class="meta-api-description">
Detect when a user starts selecting an item in a hierarchical tree structure, enabling developers to listen for selection attempts, implement validation or conditional logic, intercept the selection event, prevent nodes from being chosen by cancelling the action, control or customize selection behavior dynamically, handle user input during node selection, block or allow specific nodes from being selected, and manage selection flow in tree-based UI components by monitoring selection triggers and applying custom rules before the node becomes active.
</div>

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
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("Selecting Node: ", e.node);
        console.log("DataItem: ", e.sender.dataItem(e.node));
      }
    });
    </script>

#### Example - subscribe to the "select" event after initialization

    <div id="treeview"></div>
    <script>
    function tree_select(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
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

