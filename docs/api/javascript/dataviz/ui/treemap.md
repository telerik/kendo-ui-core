---
title: TreeMap
page_title: Configuration, methods and events of Kendo UI DataViz TreeMap
description: Learn how to configure Kendo UI Javascript TreeMap widget in a few easy steps, use and change methods and events.
res_type: api
component: treemap
---

# kendo.dataviz.ui.TreeMap

## Configuration

### dataSource `Object|Array|kendo.data.HierarchicalDataSource`

The data source of the treeMap which is used to display the tiles and titles. Can be a JavaScript object which represents a valid data source configuration, a JavaScript array or an existing [kendo.data.HierarchicalDataSource](/api/framework/hierarchicaldatasource)
instance.

If the `HierarchicalDataSource` option is set to a JavaScript object or array the widget will initialize a new [kendo.data.HierarchicalDataSource](/api/framework/hierarchicaldatasource) instance using that value as data source configuration.

If the `HierarchicalDataSource` option is an existing [kendo.data.HierarchicalDataSource](/api/framework/hierarchicaldatasource) instance the widget will use that instance and will **not** initialize a new one.


<div class="meta-api-description">
How to connect hierarchical data structures to Kendo UI TreeMap? Connect hierarchical or nested data structures, configure data inputs, bind arrays or JavaScript objects, use existing or new hierarchical data sources, supply dynamic or static datasets for tiles and labels, control data hierarchy, manage data binding for tree maps, integrate with hierarchical data collections, utilize kendo.data.HierarchicalDataSource instances or raw data in various formats for visualization, support inputting structured datasets to render tree map layouts.
</div>

#### Example

    <div id="treemap"></div>
    <script>
      $("#treemap").kendoTreeMap({
          dataSource: [
              {
                  name: "Technology",
                  value: 30,
                  items: [
                      { name: "Mobile", value: 15 },
                      { name: "Desktop", value: 15 }
                  ]
              },
             
          ],
          valueField: "value",
          textField: "name"
      });
    </script>

### autoBind `Boolean` *(default: true)*

If set to `false` the widget will not bind to the data source during initialization. In this case data binding will occur when the [change](/api/framework/hierarchicaldatasource#events-change) event of the
data source is fired. By default the widget will bind to the data source specified in the configuration.

> Setting `autoBind` to `false` is useful when multiple widgets are bound to the same data source. Disabling automatic binding ensures that the shared data source does not make more than one request to the remote service.


<div class="meta-api-description">
How to prevent automatic data binding in Kendo TreeMap? Control or configure automatic connection and synchronization of hierarchical data sets on initialization in a TreeMap visualization, enabling deferred or manual data binding to prevent premature fetching or loading of data, avoid duplicate or redundant remote API calls especially when multiple widgets share the same data source, and manage when data is bound by reacting to data source change events rather than immediate default binding at setup.
</div>

#### Example - disable automatic binding

    <div id="treemap"></div>
    <script>
    var dataSource = new kendo.data.HierarchicalDataSource({
        data: [{
            name: "foo",
            value: 1
        }]
    });

    $("#treemap").kendoTreeMap({
        autoBind: false,
        dataSource: dataSource,
        valueField: "value",
        textField: "name"
    });
    dataSource.read(); // "read()" will fire the "change" event of the dataSource and the widget will be bound
    </script>

### type `String` *(default: "squarified")*

The layout type for the TreeMap.

The Supported values are:

* squarified
* horizontal
* vertical


<div class="meta-api-description">
How to configure the layout in a Kendo UI treemap? Adjust or configure the layout and arrangement of tiles or nodes in a hierarchical treemap visualization by selecting different tiling algorithms or orientation methods such as squarified, horizontal strip, or vertical strip layouts. Enable control over how data rectangles are optimally packed, whether focusing on squarish aspect ratios or linear horizontal or vertical stacking, to customize the visual hierarchy, layout style, and orientation of treemap segments for better readability and data comparison. Choose or set layout strategies to organize treemap nodes effectively according to various visualization needs, enabling varied spatial organization patterns in hierarchical data displays.
</div>

#### Example

    <div id="treemap"></div>
    <script>
    $("#treemap").kendoTreeMap({
        dataSource: [
            { name: "Category A", value: 40 },
            { name: "Category B", value: 30 },
            { name: "Category C", value: 20 },
            { name: "Category D", value: 10 }
        ],
        type: "horizontal",
        valueField: "value",
        textField: "name"
    });
    </script>

### theme `String` *(default: "sass")*

The theme of the TreeMap.

Note: Since Q2 2024 release, the default value for the `theme` property is "sass" instead of "default". It is recommended to use "sass" with version Q2 2024 or later.


<div class="meta-api-description">
How do I change the default appearance of my Kendo UI treemap component? Customize the appearance, skin, or visual style of hierarchical data visualizations by selecting or configuring themes, presets, or design profiles to change layout colors, fonts, shading, and overall look for treemap components; adjust or apply built-in, predefined, or user-defined themes and style sets to control the graphical presentation, enabling seamless integration with application UI skins or branding requirements, including switching from default styling to modern sass-based themes or custom CSS-driven designs for enhanced visual consistency and developer theming preferences.
</div>

#### Example

    <div id="treemap"></div>
    <script>
    $("#treemap").kendoTreeMap({
        dataSource: [
            { name: "Product A", value: 50 },
            { name: "Product B", value: 30 },
            { name: "Product C", value: 20 }
        ],
        theme: "bootstrap",
        valueField: "value",
        textField: "name"
    });
    </script>

### valueField `String` *(default: "value")*

The data item field which contains the tile value.


<div class="meta-api-description">
How do I specify the field that determines the size of each tile in a Kendo UI TreeMap? Configure which data attribute defines the numeric values used for sizing tiles, controlling the area or weight of each tile in a hierarchical visualization like a TreeMap. Enable or set the field containing the quantitative metrics that influence tile proportions, allowing you to bind size dimensions dynamically based on your dataset’s numeric properties. Control how tiles scale relative to one another by specifying the value source, adjusting visual emphasis or weight to reflect underlying data points such as amounts, counts, or measures. This setup is essential for rendering proportional representations in tree structure layouts where data-driven sizing impacts the appearance of each tile.
</div>

#### Example

    <div id="treemap"></div>
    <script>
    $("#treemap").kendoTreeMap({
        dataSource: [
            { title: "Sales", revenue: 120000 },
            { title: "Marketing", revenue: 80000 },
            { title: "Development", revenue: 95000 }
        ],
        valueField: "revenue",
        textField: "title"
    });
    </script>

### colorField `String` *(default: "color")*

The data item field which contains the tile color.


<div class="meta-api-description">
How to dynamically assign colors in Kendo UI TreeMap based on data field values? Specify the data attribute or field that defines the color values for each tile, enabling dynamic color assignment based on underlying data properties, configuring visual color mapping, setting or controlling tile colors from data-driven fields, linking data fields to color output, driving colors by dataset attributes, choosing or assigning the property that determines color coding, enabling color rendering based on data field values, customizing tile colors through specific data keys, and mapping dataset values directly to color display.
</div>

#### Example

    <div id="treemap"></div>
    <script>
    $("#treemap").kendoTreeMap({
        dataSource: [
            { name: "High Priority", value: 40, tileColor: "#ff6347" },
            { name: "Medium Priority", value: 30, tileColor: "#ffa500" },
            { name: "Low Priority", value: 20, tileColor: "#90ee90" }
        ],
        valueField: "value",
        textField: "name",
        colorField: "tileColor"
    });
    </script>

### textField `String` *(default: "text")*

The data item field which contains the tile title.


<div class="meta-api-description">
How do I set the title for each tile in a Kendo UI treemap? Control or configure the visible text labels on each tile of a treemap visualization by specifying which data attribute or field holds the title or name to display, enabling dynamic binding of string values from data items to tile labels, setting text content for each tile based on data fields, customizing or mapping data properties to tile captions, showing or enabling textual titles on treemap sections, and defining which specific field or property in your dataset should appear as the label for treemap nodes or tiles in order to clearly identify or annotate each area within the treemap layout.
</div>

#### Example

    <div id="treemap"></div>
    <script>
    $("#treemap").kendoTreeMap({
        dataSource: [
            { description: "Technology Sector", value: 45 },
            { description: "Healthcare Sector", value: 35 },
            { description: "Finance Sector", value: 25 }
        ],
        valueField: "value",
        textField: "description"
    });
    </script>

### template `String|Function`

The [template](/api/framework/kendo#methods-template) which renders the treeMap tile content.

The fields which can be used in the template are:

* dataItem - the original data item used to construct the point.
* text - the original tile text.


<div class="meta-api-description">
How to customize the content of each tile in Kendo UI Treemap? Customize the content displayed within hierarchical tile layouts by defining a render template that controls how each tile’s data is presented, enabling dynamic formatting, binding, or insertion of values into the tile visuals. This customization supports accessing underlying data elements and original text strings, allowing developers to tailor the layout with personalized HTML or text snippets for each section of the map. Control over tile content rendering empowers scenarios such as conditional styles, data-driven labels, context-aware displays, and integration of additional metadata or values directly within each tile’s visual representation in the tree visualization.
</div>

#### Example

    <div id="treemap"></div>
    <script>
    $("#treemap").kendoTreeMap({
        dataSource: [
            { name: "Technology", value: 50, percentage: 45 },
            { name: "Healthcare", value: 35, percentage: 32 },
            { name: "Finance", value: 25, percentage: 23 }
        ],
        valueField: "value",
        textField: "name",
        template: (data) => `${data.text}<br/>Value: ${data.dataItem.value}<br/>${data.dataItem.percentage}%`
    });
    </script>

### colors `Array`

The default colors for the TreeMap items (tiles). Can be set to array of specific colors or array of color ranges. For more information on the widget behavior, see the [Colors](/controls/charts/treemap/overview#colors) section on the TreeMap Overview page.


<div class="meta-api-description">
How to dynamically change the color of TreeMap items based on their values? Adjust or define the color scheme, palette, or set of fill colors applied to TreeMap tiles or items by specifying arrays of solid colors or gradients, enabling dynamic coloring based on data values for visual encoding, color coding, or thematic mapping; this includes configuring custom color sequences, value-driven color scales, or range-based colors to enhance data visualization, control appearance, and improve interpretation of hierarchical data structures.
</div>

#### Example - set the treemap tile colors

    <div id="treemap"></div>
    <script>
      $("#treemap").kendoTreeMap({
        dataSource: {
          data: [{
            name: "Root",
            items: [{ name: "foo", value: 1 }, { name: "bar", value: 2 }, { name: "baz", value: 3 }]
          }]
        },
        valueField: "value",
        textField: "name",
        colors: ["red", "green"]
      });
    </script>

#### Example - set the treemap color ranges

    <div id="treemap"></div>
    <script>
      $("#treemap").kendoTreeMap({
        dataSource: {
          data: [{
            name: "Root",
            items: [{
              name: "Group A",
              value: 1,
              items: [{ name: "foo", value: 1 }, { name: "bar", value: 2 }, { name: "baz", value: 3 }]
            }, {
              name: "Group B",
              value: 1,
              items: [{ name: "foo", value: 1 }, { name: "bar", value: 2 }, { name: "baz", value: 3 }]
            }]
          }]
        },
        valueField: "value",
        textField: "name",
        colors: [["#ff6666", "#ff0000"], ["#7fb17f", "#006400"]]
      });
    </script>

## Events

### itemCreated

Fired when a tile has been created.


<div class="meta-api-description">
How to customize treemap tiles after they're generated? Trigger custom actions immediately after a tile or node is generated in a hierarchical treemap visualization, enabling dynamic modification of the tile’s DOM elements such as adding CSS classes, setting attributes, binding event listeners, or annotating visuals based on the data associated with each tile. Capture the moment each visual segment is created within the treemap to implement per-item customization, dynamic styling, interactive behavior, or data-driven enhancements, useful for applying tailored user interaction, conditional formatting, or metadata injection as the graphical elements are instantiated.
</div>

#### Event Data

##### e.element `jQuery|Element`

The item html instance.

##### e.sender `kendo.dataviz.ui.TreeMap`

The source widget instance.

#### Example - Change color of the tile
    <div id="treeMap"></div>
    <script>
        $("#treeMap").kendoTreeMap({
            dataSource: {
                data: [{
                    name: "foo",
                    value: 1,
                    color: "red"
                }]
            },
            valueField: "value",
            textField: "name",
            colorField: "color",
            itemCreated: function(e) {
                e.element.css("background-color", "blue");
            }
        });
    </script>

### dataBound

Fired when the widget is bound to data from its dataSource.


<div class="meta-api-description">
How to customize TreeMap appearance after data binding is complete? Handle actions after data loads into the TreeMap, such as updating layouts, applying custom colors or labels, computing summaries, triggering animations, or executing extra data processing once the data source is fully bound and rendered. Enable post-data binding event handling to customize visual updates, refresh views, set color schemes, calculate aggregates, or launch additional operations when the data finishes loading into the hierarchical map. This event supports configuring reactions after data binding completes, allowing dynamic styling, label adjustments, data transformations, or animation sequences following data rendering in the map visualization.
</div>

#### Event Data

##### e.sender `kendo.dataviz.ui.TreeMap`

The source widget instance.

#### Example - subscribe to the "dataBound" event during initialization

    <div id="treemap"></div>
    <script>
      $("#treemap").kendoTreeMap({
        dataSource: {
          data: [{
            name: "test",
            items: [{
              category: "foo",
              value: 1,
              color: "#3073ad"
            }]
          }]
        },
        valueField: "value",
        textField: "category",
        colorField: "color",
        dataBound: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log("DataBound");
        }
      });
    </script>

#### Example - subscribe to the "dataBound" event after initialization
    <div id="treemap"></div>
    <script>
      function dataBound(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("DataBound");
      }

      $("#treemap").kendoTreeMap({
        dataSource: {
          data: [{
            name: "test",
            items: [{
              category: "foo",
              value: 1,
              color: "#3073ad"
            }]
          }]
        },
        autoBind: false,
        valueField: "value",
        textField: "category",
        colorField: "color"
      });
      var treemap = $("#treemap").getKendoTreeMap();
      treemap.bind("dataBound", dataBound);
      treemap.dataSource.fetch();
    </script>

## Methods

### destroy

Prepares the TreeMap for safe removal from the DOM.

Detaches event handlers and removes data entries in order to avoid memory leaks.


<div class="meta-api-description">
How do I properly remove a Kendo UI TreeMap control to free up memory? Remove or dispose of the interactive tree map visualization to free up memory by detaching event listeners, clearing internal data structures, and preventing further rendering or user interactions; safely clean up resources and component references to avoid leaks and ensure the component is fully torn down before removing the visualization element from the webpage or application.
</div>

#### Example

    <div id="treemap"></div>
    <script>
    $("#treemap").kendoTreeMap({
        dataSource: [
            { name: "Item 1", value: 30 },
            { name: "Item 2", value: 25 },
            { name: "Item 3", value: 20 }
        ],
        valueField: "value",
        textField: "name"
    });

    var treemap = $("#treemap").getKendoTreeMap();
    treemap.destroy();
    </script>

### findByUid

Searches for an item with the given unique identifier.
Applicable when the widget is bound to a [HierarchicalDataSource](/api/framework/hierarchicaldatasource).
If you want to find an item by its `id`, use the [dataSource.get()](/api/framework/datasource#get) method and supply its uid to the `findByUid` method.


<div class="meta-api-description">
How do I access a specific node in a TreeMap by its unique identifier? Locate or retrieve a specific data entry within a hierarchical tree structure by searching for its unique identifier (UID) in complex nested datasets, enabling quick access to nodes or items when working with hierarchical or nested data sources, supporting scenarios where you need to identify, fetch, or manipulate tree elements through their unique keys or UIDs rather than simple IDs, and providing a way to navigate and query deeply nested hierarchical collections based on unique node identification, ideal for developers looking to access tree nodes, data elements, or records by UID within hierarchical or tree-like data models.
</div>

#### Parameters

##### text `String`

The text that is being searched for.

#### Returns

`jQuery` All nodes that have the text.

#### Example

    <div id="treemap"></div>
    <script>
    $("#treemap").kendoTreeMap({
        dataSource: {
            data: [{
                name: "foo",
                value: 1,
                color: "red",
                id: 1
            }]
        },
        valueField: "value",
        textField: "name",
        colorField: "color"
    });

    var treemap = $("#treemap").getKendoTreeMap();
    var fooDataItem = treemap.dataSource.get(1);
    var fooElement = treemap.findByUid(fooDataItem.uid);
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(fooElement);
    </script>

### dataItem

Returns the data item to which the specified tile is bound.


<div class="meta-api-description">
How to access data for a specific tile in Kendo UI treemap chart? Retrieve or access the data object linked to a specific visual element or tile within a treemap chart, allowing developers to identify, inspect, or manipulate the underlying model associated with that tile. This method enables obtaining the bound data entry from a given visual reference to facilitate custom logic, event handling, data-driven rendering, tooltip generation, or interactive features tied to individual tiles in hierarchical or nested data visualizations. It supports workflows where you need to map UI components back to their source data, enabling inspection, conditional behavior, or dynamic updates based on the tile’s associated dataset.
</div>

#### Parameters

##### tile `jQuery|Element|String`

A string, DOM element or jQuery object which represents the tile. A string is treated as a jQuery selector.

#### Returns

`kendo.data.Node` The model of the item that was passed as a parameter.

#### Example - get the data item of the first node

    <div id="treemap"></div>
    <script>
    $("#treemap").kendoTreeMap({
        dataSource: {
            data: [{
                name: "foo",
                value: 1,
                color: "red",
                id: 1
            }]
        },
        valueField: "value",
        textField: "name",
        colorField: "color"
    });

    var treemap = $("#treemap").getKendoTreeMap();
    var dataItem = treemap.dataItem(".k-treemap-tile:first");
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(dataItem.name); // displays "foo"
    </script>

### resize

Adjusts the treeMap layout to match the size of the container.


<div class="meta-api-description">
How do I refresh the layout of my Kendo UI TreeMap when its container size changes? Adjust, update, or recalculate the layout and rendering of a hierarchical, rectangular space-filling visualization when its container’s size or style changes, enabling refresh of node positioning and dimensions without recreating or reinitializing the entire component; trigger this method after dynamic resizing events, CSS modifications, toggling visibility, or any programmatic changes to the hosting element to ensure the visualization correctly fits and displays with updated geometry and layout alignment.
</div>

#### Example
    <div id="treeMap" style="width: 400px;"></div>
    <script>
        $(function(){
            $("#treeMap").kendoTreeMap({
                dataSource: {
                    data: [{
                        name: "foo",
                        value: 1,
                        color: "red",
                        id: 1
                    }]
                },
                valueField: "value",
                textField: "name",
                colorField: "color"
            });

            $("#treeMap").css("width", "800px");
            var treeMap = $("#treeMap").getKendoTreeMap();
            treeMap.resize();
        });
    </script>

#### Parameters

##### force `Boolean` *optional*

Defines whether the widget should proceed with resizing even if the element dimensions have not changed.

### setDataSource

Sets the data source of the widget.


<div class="meta-api-description">
How do I update the data in my TreeMap widget dynamically? Change or update the hierarchical data for the TreeMap dynamically by assigning a new data source, enabling runtime replacement or rebinding of nodes without recreating the component; supports setting data from JavaScript arrays, plain objects, data source configurations, or existing DataSource instances to refresh or modify the displayed tree structure, control live data updates, switch datasets programmatically, and manage hierarchical visualization content efficiently.
</div>

#### Parameters

##### dataSource `kendo.data.HierarchicalDataSource`

The data source to which the widget should be bound.

#### Example - set the data source
    <div id="treeMap"></div>
    <script>
    $("#treeMap").kendoTreeMap({
        dataSource: {
            data: [{
                name: "foo",
                value: 1,
                color: "red"
            }]
        },
        valueField: "value",
        textField: "name",
        colorField: "color"
    });

    var dataSource = new kendo.data.HierarchicalDataSource({
        data: [{
            name: "foo",
            value: 1,
            items: [{
                name: "bar",
                value: 1
            },{
                name: "baz",
                value: 1
            }]
        }],
        schema: {
            model: {
                children: "items"
            }
        }
    });

    var treeMap = $("#treeMap").getKendoTreeMap();
    treeMap.setDataSource(dataSource);
    </script>

### setOptions

Sets the widget options. Changes are cumulative.


<div class="meta-api-description">
How can I dynamically update the layout of my Kendo UI treemap visualization? Adjust, update, or modify TreeMap visualizations dynamically by configuring layout, colors, data mapping, or interaction behavior without rebuilding or resetting the entire component; change or merge settings incrementally during runtime to control appearance, data representation, styling, or user experience instantly, enabling flexible real-time customization such as altering color schemes, adjusting hierarchical structures, modifying data bindings, toggling interactive features, or fine-tuning display options through parameter updates that accumulate on existing configurations without losing previous adjustments.
</div>

#### Parameters

##### options `Object`

The treeMap settings to update.

#### Example - change the treeMap theme
    <div id="treeMap"></div>
    <script>
    $("#treeMap").kendoTreeMap({
        dataSource: {
            data: [{
                name: "foo",
                value: 1,
                items: [{
                    name: "bar",
                    value: 1
                },{
                    name: "baz",
                    value: 1
                }]
            }],
            schema: {
                model: {
                    children: "items"
                }
            }
        },
        valueField: "value",
        textField: "name"
    });

    var treeMap = $("#treeMap").getKendoTreeMap();
    treeMap.setOptions({ type: "horizontal" });
    </script>
