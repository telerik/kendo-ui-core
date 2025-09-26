---
title: ListView
page_title: Configuration, methods and events of Kendo UI ListView
description: Step-by-step instructions and samples for Kendo UI ListView widget configuration, methods and event handling.
res_type: api
component: listview
---

# kendo.ui.ListView

Represents the Kendo UI ListView widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### ariaLabel `String` *(default: null)*

Sets an `aria-label` attribute on the ListView content element (the element with `role` `listbox` or `list`).


<div class="meta-api-description">
Set or customize accessible names and labels for list content to improve screen reader support, enable descriptive aria-label attributes on list elements with roles like listbox or list, control how screen readers, VoiceOver, and assistive technologies announce list views, enhance accessibility identification of list items, provide meaningful spoken descriptions for dynamic or static lists, configure screen reader announcements for lists, improve navigation and context for users relying on a11y features, and ensure proper labeling of list content for enhanced usability and inclusivity in user interfaces.
</div>

#### Example - disable automatic binding

    <div id ="listView"></div>
    <script>
      var dataSource = new kendo.data.DataSource({
        data: [ { name: "Jane Doe" }, { name: "John Doe" }]
      });
      $("#listView").kendoListView({
        dataSource: dataSource,
        template: "<div>#:name#</div>",
        ariaLabel: "ListView with names"
      });
    </script>

### autoBind `Boolean` *(default: true)*

If set to `false` the widget will not bind to the data source during initialization. In this case data binding will occur when the [change](/api/javascript/data/datasource/events/change) event of the
data source is fired. By default the widget will bind to the data source specified in the configuration.

> Setting `autoBind` to `false` is useful when multiple widgets are bound to the same data source. Disabling automatic binding ensures that the shared data source does not make more than one request to the remote service.


<div class="meta-api-description">
Configure automatic or manual data binding behavior for list or grid views, controlling whether the component immediately fetches and binds data upon initialization or defers loading until triggered by events like data source changes; adjust settings to prevent redundant network requests when multiple interfaces share the same data source, manage initialization timing, optimize data fetching, enable or disable immediate data load, set deferred data binding to handle asynchronous data loading scenarios, and control when data synchronization occurs between UI elements and the underlying data model.
</div>

#### Example - disable automatic binding

    <button id="btn">Read Data</button>
    <div id ="listView"></div>
    <script>
      var dataSource = new kendo.data.DataSource({
        data: [ { name: "Jane Doe" }, { name: "John Doe" }]
      });
      $("#listView").kendoListView({
        dataSource: dataSource,
        template: "<div>#:name#</div>",
        autoBind: false
      });

      $("#btn").click(function(){
        dataSource.read(); // "read()" will fire the "change" event of the dataSource and the widget will be bound
      });
    </script>

### bordered `Boolean` *(default: true)*

Renders border around the listview element.


<div class="meta-api-description">
Add or remove a visible outline, edge, or frame around a list display to visually distinguish or separate the list area from other page elements, control the presence of borders or boxes around list components, configure border styles for list containers, enable or disable visual separators for lists, create distinct boxed or outlined list views for clearer UI boundaries, apply or remove decorative or functional borders around list sections, toggle enclosing frames to highlight or section off list content within interfaces.
</div>

#### Example

    <div id="listview"></div>
    <script>
    $("#listview").kendoListView({
        dataSource: [
            { name: "Item 1" },
            { name: "Item 2" },
            { name: "Item 3" }
        ],
        template: "<div class='k-listview-item'>#: name #</div>",
        bordered: false
    });
    </script>

### borders `String` *(default: '')*

Renders border around the listview items. Valid values are:

* `all`: renders borders around listview items.
* `horizontal`: renders top border of listview items. Useful when setting `layout: "flex"` and `flex.direction: column`.
* `vertical`: renders top border of listview items. Useful when setting `layout: "flex"` and `flex.direction: row`.


<div class="meta-api-description">
Configure and customize item borders in a ListView to control visual separation and styling, including options to set borders around every item, apply only horizontal or vertical borders depending on layout orientation such as flex containers with column or row directions, enable or disable border rendering for better item delineation in lists, and adjust how edges appear for improved UI structuring and design consistency in scrollable item collections.
</div>

#### Example

    <div id="listview"></div>
    <script>
    $("#listview").kendoListView({
        dataSource: [
            { name: "Item 1" },
            { name: "Item 2" },
            { name: "Item 3" }
        ],
        template: "<div class='k-listview-item'>#: name #</div>",
        borders: "all"
    });
    </script>

> Note: in order for the property to work, set `k-listview-item` class name to listview items in your template.

### contentElement `String` *(default: 'div')*

Defines the type of element that holds the listview content.


<div class="meta-api-description">
Control or customize the container element wrapping a list’s rendered items by setting which HTML or DOM element acts as the wrapper for item content, enabling configuration of the enclosing element to adjust styling, markup structure, accessibility roles, interaction with CSS frameworks, custom layout integration, or adapting the surrounding element to specific frontend requirements.
</div>

#### Example

    <div id="listview"></div>
    <script>
    $("#listview").kendoListView({
        dataSource: [
            { name: "Item 1" },
            { name: "Item 2" },
            { name: "Item 3" }
        ],
        template: "<div class='k-listview-item'>#: name #</div>",
        contentElement: "ul"
    });
    </script>

### dataSource `Object|Array|kendo.data.DataSource`

The data source of the widget which is used render table rows. Can be a JavaScript object which represents a valid [kendo.data.DataSource](/api/javascript/data/datasource) configuration, a JavaScript array or an existing [kendo.data.DataSource](/api/javascript/data/datasource)
instance.

If the `dataSource` option is set to a JavaScript object or array the widget will initialize a new [kendo.data.DataSource](/api/javascript/data/datasource) instance using that value as data source configuration.

If the `dataSource` option is an existing [kendo.data.DataSource](/api/javascript/data/datasource) instance the widget will use that instance and will **not** initialize a new one.


<div class="meta-api-description">
Configure and control the collection of items displayed in a list or table by connecting local arrays, remote data endpoints, or data source instances that handle loading, binding, filtering, sorting, and paging of rows. Enable seamless data management by setting the list’s data container with JavaScript arrays, data source objects, or existing data source instances that dictate how list items populate and update dynamically. Manage collections for lists by linking various data structures or remote services to render UI rows, handle real-time updates, apply sorting and filtering criteria, and control pagination behavior during component initialization or runtime.
</div>

#### Example - set dataSource as a JavaScript object

    <div id ="listView"></div>
    <script>
    $("#listView").kendoListView({
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

    <div id ="listView"></div>
    <script>
    $("#listView").kendoListView({
         dataSource: [
            { name: "Jane Doe" },
            { name: "John Doe" }
        ],
        template: "<div>#:name#</div>"
    });
    </script>

#### Example - set dataSource as an existing kendo.data.DataSource instance

    <div id ="listView"></div>
    <script>
    var dataSource = new kendo.data.DataSource({
      data: [ { name: "Jane Doe" }, { name: "John Doe" }]
    });
    $("#listView").kendoListView({
        dataSource: dataSource,
        template: "<div>#:name#</div>"
    });
    </script>

### editTemplate `Function`

Specifies the template for ListView items during edit mode.


<div class="meta-api-description">
Customize item editing interfaces with templates that define how list entries appear while being modified, enabling configurable inline editors, personalized input layouts, and bespoke editing controls within list views. This supports setting or configuring custom edit forms, controlling the rendering of editable list items, enabling tailored, dynamic edit UIs, and adjusting how content is presented during item modification to match specific user interactions, workflows, or data entry requirements.
</div>

#### Example of

    <script type="text/x-kendo-tmpl" id="template">
     <div>
       <dl>
         <dt>Name</dt> <dd>#:name#</dd>
         <dt>Age</dt> <dd>#:age#</dd>
      </dl>
       <div>
           <a class="k-button k-edit-button" href="\\#"><span class="k-icon k-i-edit"></span></a>
           <a class="k-button k-delete-button" href="\\#"><span class="k-icon k-i-delete"></span></a>
      </div>
      </div>
    </script>

    <script type="text/x-kendo-tmpl" id="editTemplate">
     <div>
       <dl>
         <dt>Name</dt>
         <dd><input type="text" data-bind="value:name" name="name" required="required" /></dd>
         <dt>Age</dt>
         <dd><input type="text" data-bind="value:age" data-role="numerictextbox" data-type="number" name="age" required="required" /></dd>
      </dl>
       <div>
           <a class="k-button k-update-button" href="\\#"><span class="k-icon k-i-check"></span></a>
           <a class="k-button k-cancel-button" href="\\#"><span class="k-icon k-i-cancel"></span></a>
      </div>
      </div>
    </script>

    <div id="listView"></div>
    <script>
      $("#listView").kendoListView({
        template: kendo.template($("#template").html()),
        editTemplate: kendo.template($("#editTemplate").html()),
        dataSource: {
          data: [
            { id: 1, name: "Jane Doe", age: 47 },
            { id: 2, name: "John Doe", age: 50 }
          ],
          schema: {
            model: {
              id: "id",
              fields: {
                id: { type: "number" },
                name: { type: "string" },
                age: { type: "number" }
              }
            }
          }
        }
      });
    </script>

### height `Number|String`

The height of the listview. Numeric values are treated as pixels.


<div class="meta-api-description">
Adjust the vertical dimension or fixed pixel height of a scrollable list display to control layout, container sizing, or viewport height of a dynamic item collection. Configure or set the visible height for lists, enable precise height control using numeric pixel values, resize or constrain the list’s vertical space, and manage how much content appears vertically without scrolling. Use this to limit, lock, or define the pixel height for vertical list components, affecting user interface arrangement and rendering space.
</div>

#### Example - set the height as a number

    <div id ="listView"></div>
    <script>
    var dataSource = new kendo.data.DataSource({
      data: [ { name: "Jane Doe" }, { name: "John Doe" }]
    });
    $("#listView").kendoListView({
        dataSource: dataSource,
        template: "<div>#:name#</div>",
        height: 50
    });
    </script>

#### Example - set the height as a string

    <div id ="listView"></div>
    <script>
    var dataSource = new kendo.data.DataSource({
      data: [ { name: "Jane Doe" }, { name: "John Doe" }]
    });
    $("#listView").kendoListView({
        dataSource: dataSource,
        template: "<div>#:name#</div>",
        height: "1em"
    });
    </script>

### layout `String` *(default: '')*

Specify the layout of listview content. Valid options are:

* `flex`: This is equivalent to `display: flex`. It defines a flex container and enables a flex context for all its direct children. Think of flex items as primarily laying out either in horizontal rows or vertical columns.
* `grid`: This is equivalent to `display: grid`. It defines the element as a grid container and establishes a new grid formatting context for its contents.

> Note: Flex and grid layout are supported only on modern browsers. Even so, not all browsers that support flex and grid layout, support all features.


<div class="meta-api-description">
Control and configure the arrangement and flow of list content by choosing between flexible box layouts or grid layouts to set horizontal or vertical alignment, wrapping, spacing, and distribution of items within the list. Enable responsive layouts using flexbox-style row or column direction and flexible item sizing or switch to grid-based layouts for precise two-dimensional content placement, grid template areas, rows and columns configuration, and advanced spacing control. Adjust how child elements are organized in a ListView with properties emulating CSS flex and grid display behaviors, supporting dynamic and adaptive list orientations on modern browsers, accommodating developers looking to set layout models, switch container types, manage wrapping behavior, or control alignment and distribution patterns inside lists or repeated components.
</div>

#### Example of ListView with flex layout

    <script src="https://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>

    <div id="listView"></div>
    <div id="pager" class="k-pager"></div>

    <script type="text/x-kendo-template" id="template">
        <div class="product">
            <img src="https://demos.telerik.com/kendo-ui/content/web/foods/#= ProductID #.jpg" alt="#: ProductName # image" />
            <h3>#:ProductName#</h3>
            <p>#:kendo.toString(UnitPrice, "c")#</p>
      </div>
    </script>

    <script>
      $(function() {
        var dataSource = new kendo.data.DataSource({
          data: products,
          pageSize: 9
        });

        $("#pager").kendoPager({
          dataSource: dataSource
        });

        $("#listView").kendoListView({
          dataSource: dataSource,
          layout: "flex",
          template: kendo.template($("#template").html())
        });
      });
    </script>
    <style>
      .product{
        width: 100px;
      }
      .product h3{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: .9em;
      }
    </style>

### flex `Object`

Flex layout settings


<div class="meta-api-description">
Adjust or configure responsive item arrangement in a list using flexible layout controls that set direction, wrapping behavior, alignment, spacing, and sizing of items within a container. Enable adaptive flow and dynamic resizing for list elements to ensure seamless display across different screen sizes and container dimensions, controlling how items wrap, align, and space themselves in flexible, responsive layouts. Manage and tune flexbox-inspired properties to optimize item distribution and visual structure in scrollable or static lists that respond fluidly to available space and orientation changes.
</div>

#### Example

    <div id="listview"></div>
    <script>
    $("#listview").kendoListView({
        dataSource: [
            { name: "Item 1" },
            { name: "Item 2" },
            { name: "Item 3" }
        ],
        template: "<div class='k-listview-item'>#: name #</div>",
        layout: "flex",
        flex: {
            direction: "column",
            wrap: "wrap"
        }
    });
    </script>

### flex.direction `String` *(default: 'row')*

Defines the direction flex items are placed in the flex container. Think of flex items as primarily laying out either in horizontal rows or vertical columns. Valid values are:

* `row`: This is equivalent to `flex-direction: row`. This establishes the main-axis to be horizontal, thus defining the direction flex items are placed in the flex container: left to right in `ltr`; right to left in `rtl`.
* `row-reverse`: This is equivalent to `flex-direction: row-reverse`. This establishes the main-axis to be horizontal, thus defining the direction flex items are placed in the flex container: right to left in `ltr`; left to right in `rtl`.
* `column`: This is equivalent to `flex-direction: column`. This establishes the main-axis to be vertical, thus defining the direction flex items are placed in the flex container: top to bottom.
* `column-reverse`: This is equivalent to `flex-direction: column-reverse`. This establishes the main-axis to be vertical, thus defining the direction flex items are placed in the flex container: bottom to top.


<div class="meta-api-description">
Control or configure the orientation and layout direction for items in a flex container by setting the main axis to horizontal or vertical flow, enabling alignment of list elements in rows or columns, with options for normal or reverse ordering from left-to-right, right-to-left, top-to-bottom, or bottom-to-top depending on locale and layout needs. Adjust or set layout axis, flow direction, or arrangement of list or flexbox items using values like row, row-reverse, column, and column-reverse to customize visual order, stacking, or scrolling behavior in user interfaces.
</div>

#### Example of ListView with flex column layout

    <script src="https://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>

    <div id="listView"></div>
    <div id="pager" class="k-pager"></div>

    <script type="text/x-kendo-template" id="template">
        <div class="product">
            <img src="https://demos.telerik.com/kendo-ui/content/web/foods/#= ProductID #.jpg" alt="#: ProductName # image" />
            <h3>#:ProductName#</h3>
            <p>#:kendo.toString(UnitPrice, "c")#</p>
      </div>
    </script>

    <script>
      $(function() {
        var dataSource = new kendo.data.DataSource({
          data: products,
          pageSize: 21
        });

        $("#pager").kendoPager({
          dataSource: dataSource
        });

        $("#listView").kendoListView({
          dataSource: dataSource,
          layout: "flex",
          flex: {
            direction: "column",
          },
          template: kendo.template($("#template").html())
        });
      });
    </script>
    <style>
      .product{
        width: 100px;
      }
      .product h3{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: .9em;
      }
    </style>

### flex.wrap `String` *(default: 'nowrap')*

By default, flex items will all try to fit onto one line. Customizing the property defines how items wrap or not within flex continer. Valid values are:

* `wrap`: This is equivalent to `flex-wrap: wrap`. It allows flex items to wrap as needed onto multiple lines, from top to bottom.
* `nowrap`: This is equivalent to `flex-wrap: nowrap`. All flex items will be on one line.
* `wrap-reverse`:This is equivalent to `flex-wrap: wrap-reverse`. It allows flex items to wrap as needed onto multiple lines, from bottom to top.


<div class="meta-api-description">
Control how flex items inside a ListView container wrap or do not wrap, enabling multi-line layouts or single-line arrangements by setting wrapping behavior that corresponds to CSS flex-wrap options such as wrap for items flowing onto multiple lines top to bottom, nowrap for all items on one line without wrapping, or wrap-reverse for items wrapping onto multiple lines bottom to top, allowing configuration of item flow direction, line breaks, and responsive flex container layouts within the component.
</div>

#### Example of ListView with wrapped flex layout

    <script src="https://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>

    <div id="listView"></div>
    <div id="pager" class="k-pager"></div>

    <script type="text/x-kendo-template" id="template">
        <div class="product">
            <img src="https://demos.telerik.com/kendo-ui/content/web/foods/#= ProductID #.jpg" alt="#: ProductName # image" />
            <h3>#:ProductName#</h3>
            <p>#:kendo.toString(UnitPrice, "c")#</p>
      </div>
    </script>

    <script>
      $(function() {
        var dataSource = new kendo.data.DataSource({
          data: products,
          pageSize: 21
        });

        $("#pager").kendoPager({
          dataSource: dataSource
        });

        $("#listView").kendoListView({
          dataSource: dataSource,
          layout: "flex",
          flex: {
            wrap: "wrap"
          },
          template: kendo.template($("#template").html())
        });
      });
    </script>
    <style>
      .product{
        width: 100px;
      }
      .product h3{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: .9em;
      }
    </style>

### grid `Object`

Grid layout settings.


<div class="meta-api-description">
Configure item layout for lists in a grid format by setting rows, columns, spacing, gaps, and alignment to organize elements in a structured, multi-column arrangement; adjust responsive grid settings to control how items are distributed in rows and columns with customizable spacing for consistent layout, item positioning, and visual alignment, enabling precise control over list item arrangement in tabular or matrix formats across different screen sizes and initialization stages.
</div>

#### Example of ListView with grid layout

    <script src="https://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>

    <div id="listView"></div>
    <div id="pager" class="k-pager"></div>

    <script type="text/x-kendo-template" id="template">
        <div class="product">
            <img src="https://demos.telerik.com/kendo-ui/content/web/foods/#= ProductID #.jpg" alt="#: ProductName # image" />
            <h3>#:ProductName#</h3>
            <p>#:kendo.toString(UnitPrice, "c")#</p>
      </div>
    </script>

    <script>
      $(function() {
        var dataSource = new kendo.data.DataSource({
          data: products,
          pageSize: 21
        });

        $("#pager").kendoPager({
          dataSource: dataSource
        });

        $("#listView").kendoListView({
          dataSource: dataSource,
          layout: "grid",
          grid: {
            cols: 5,
          },
          template: kendo.template($("#template").html())
        });
      });
    </script>
    <style>
      .product{
        width: 100px;
      }
      .product h3{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: .9em;
      }
    </style>

### grid.cols `Number|String`

Defines the columns of the grid.


<div class="meta-api-description">
Configure or set the number of columns, column counts, or column layouts for grid-style item arrangement in a list view or grid view. Control column definitions, column widths, column sizing, column distribution, and how list or grid items are arranged horizontally across multiple columns. Adjust grid column settings to customize how data or elements are organized into columns, define the shape and structure of a grid, specify column parameters or descriptors, and manage multi-column layouts for displaying collections or lists. Enable column-based layouts by controlling the column array, column definitions, or column configuration to influence the presentation and alignment of items in grid or list views.
</div>

#### Example of the cols setting of the grid layout

    <script src="https://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>

    <div id="listView"></div>
    <div id="pager" class="k-pager"></div>

    <script type="text/x-kendo-template" id="template">
        <div class="product">
            <img src="https://demos.telerik.com/kendo-ui/content/web/foods/#= ProductID #.jpg" alt="#: ProductName # image" />
            <h3>#:ProductName#</h3>
            <p>#:kendo.toString(UnitPrice, "c")#</p>
      </div>
    </script>

    <script>
      $(function() {
        var dataSource = new kendo.data.DataSource({
          data: products,
          pageSize: 21
        });

        $("#pager").kendoPager({
          dataSource: dataSource
        });

        $("#listView").kendoListView({
          dataSource: dataSource,
          layout: "grid",
          grid: {
            cols: 11,
            gutter: 20
          },
          template: kendo.template($("#template").html())
        });
      });
    </script>
    <style>
      .product{
        width: 100px;
      }
      .product h3{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: .9em;
      }
    </style>

### grid.rows `Number|String`

Defines the rows of the grid.


<div class="meta-api-description">
Set up and control the number and configuration of rows in a grid-based list or view by defining row sizes, order, layout, and custom row objects to manage how elements flow vertically within the grid structure. Configure row count and layout for grid-style displays, adjust row properties for responsive item placement, customize row order and spacing, enable precise vertical arrangement of list or grid items, and control grid row definitions during component initialization to tailor the flow of content across multiple rows in a structured or dynamic way.
</div>

#### Example of the rows setting of the grid layout

    <script src="https://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>

    <div id="listView"></div>
    <div id="pager" class="k-pager"></div>

    <script type="text/x-kendo-template" id="template">
        <div class="product">
            <img src="https://demos.telerik.com/kendo-ui/content/web/foods/#= ProductID #.jpg" alt="#: ProductName # image" />
            <h3>#:ProductName#</h3>
            <p>#:kendo.toString(UnitPrice, "c")#</p>
      </div>
    </script>

    <script>
      $(function() {
        var dataSource = new kendo.data.DataSource({
          data: products,
          pageSize: 21
        });

        $("#pager").kendoPager({
          dataSource: dataSource
        });

        $("#listView").kendoListView({
          dataSource: dataSource,
          layout: "grid",
          grid: {
            cols: 11,
	          rows: 3,
            gutter: 20
          },
          template: kendo.template($("#template").html())
        });
      });
    </script>
    <style>
      .product{
        width: 100px;
      }
      .product h3{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: .9em;
      }
    </style>

### grid.gutter `Number|String`

Defines the width of the gutters between the columns / rows.


<div class="meta-api-description">
Adjust and control the spacing or gaps between grid cells, columns, and rows within a responsive ListView grid layout by setting horizontal and vertical gutter widths, enabling fine-tuned control over visual separation, column gaps, row gaps, padding between items, and inter-item spacing in grids for cleaner, customizable layouts.
</div>

#### Example of the gutter setting of the grid layout

    <script src="https://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>

    <div id="listView"></div>
    <div id="pager" class="k-pager"></div>

    <script type="text/x-kendo-template" id="template">
        <div class="product">
            <img src="https://demos.telerik.com/kendo-ui/content/web/foods/#= ProductID #.jpg" alt="#: ProductName # image" />
            <h3>#:ProductName#</h3>
            <p>#:kendo.toString(UnitPrice, "c")#</p>
      </div>
    </script>

    <script>
      $(function() {
        var dataSource = new kendo.data.DataSource({
          data: products,
          pageSize: 21
        });

        $("#pager").kendoPager({
          dataSource: dataSource
        });

        $("#listView").kendoListView({
          dataSource: dataSource,
          layout: "grid",
          grid: {
            cols: 11,
            gutter: 20
          },
          template: kendo.template($("#template").html())
        });
      });
    </script>
    <style>
      .product{
        width: 100px;
      }
      .product h3{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: .9em;
      }
    </style>

### scrollable `String`

Accepts `endless` to enable the endless scrolling functionality. In endless scrolling mode the [height](/api/javascript/ui/listview/configuration/height) should be configured to display a scrollbar. Scrolling to the end of the scrollbar will load more items (equal to the pageSize number) and append them to the listview DOM element utill all items are loaded and displayed.

If set to any other value the listview will display a scrollbar when the content exceeds the listview [height](/api/javascript/ui/listview/configuration/height) value.


<div class="meta-api-description">
Configure continuous scrolling that automatically loads and appends more list items as the user reaches the bottom of the scrollable area, enabling infinite or endless scroll behavior to fetch additional data in pages while maintaining a visible scrollbar within a fixed container height; set up dynamic content loading, lazy loading, pagination-on-scroll, or virtual scrolling scenarios where new entries appear seamlessly as users navigate, and control whether overflow triggers loading more items or simply shows a scrollbar when content surpasses the viewport limit.
</div>

#### Example - set the scrollable to endless

    <script src="https://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>
    <div>
        <div id="listView"></div>
    </div>

    <script type="text/x-kendo-tmpl" id="template">
        <div class="k-widget">
            <div>Product Name</div>
            <div>#:ProductName#</div>
            <div>Unit Price</div>
            <div>#:kendo.toString(UnitPrice, "c")#</div>
            <div>Units In Stock</div>
            <div>#:UnitsInStock#</div>
            <div>Discontinued</div>
            <div>#:Discontinued#</div>
        </div>
    </script>

    <script>
        $(document).ready(function () {
            var dataSource = new kendo.data.DataSource({
                data: products,
                pageSize: 6
            });

            $("#listView").kendoListView({
                dataSource: dataSource,
                height: 400,
                scrollable: "endless",
                template: kendo.template($("#template").html()),
            });
        });
    </script>

### pageable `Boolean|Object` *(default: false)*

If set to `true` the ListView will display a pager. By default paging is disabled.

Can be set to a JavaScript object which represents the pager configuration.

> Don't forget to set a [`pageSize`](/api/javascript/data/datasource/configuration/pagesize), no matter if paging is performed client-side or server-side. A `pageSize` can be defined in the `pageable` settings, or in the [`dataSource`](/api/javascript/ui/listview/configuration/datasource) settings. If an already existing datasource instance is passed to the ListView, then the [`pagesize`](/api/javascript/data/datasource/configuration/pagesize) option should be set in the dataSource's settings and not in the `pageable` settings.


<div class="meta-api-description">
Control and enable pagination, paging, or page navigation features within a list or grid interface to display items in segments or pages; configure page size, enable or disable page controls, customize pager options, and manage how many records or list elements appear per page; set paging behavior using boolean flags or detailed settings objects; ensure page size is specified either in the paging configuration or data source setup to properly activate paged data views; useful for scenarios requiring efficient data browsing, paged result sets, navigation buttons, scrollable lists with page breaks, and dynamic content chunking.
</div>

#### Example - enable paging

    <div id="listView"></div>

    <script type="text/x-kendo-tmpl" id="template">
      <div class="product-view k-widget">
          <dl>
              <dt>Product Name</dt>
              <dd>#:ProductName#</dd>
          </dl>
      </div>
    </script>

    <script>
      $(document).ready(function () {
        var crudServiceBaseUrl = "https://demos.telerik.com/service/v2/core",
            dataSource = new kendo.data.DataSource({
              transport: {
                read:  {
                  url: crudServiceBaseUrl + "/Products"
                }
              },
              pageSize: 10
            });

        var listView = $("#listView").kendoListView({
          dataSource: dataSource,
          template: kendo.template($("#template").html()),
          navigatable: true,
          pageable: true
        }).data("kendoListView");
      });
    </script>

### pageable.buttonCount `Number` *(default: 10)*

The maximum number of buttons displayed in the numeric pager. The pager will display ellipsis (...) if there are more pages than the specified number.


<div class="meta-api-description">
Set or adjust the number of visible numeric pagination buttons in a list or grid display, controlling how many page links appear in the pager navigation; limit the maximum count of clickable page numbers shown, enabling display of an ellipsis or truncated indicator when total pages exceed the configured button count, helping manage and customize pagination controls, page navigation length, page button visibility, and user interface for browsing large datasets.
</div>

#### Example - set pager button count

    <div id="listView"></div>

    <script type="text/x-kendo-tmpl" id="template">
      <div class="product-view k-widget">
          <dl>
              <dt>Product Name</dt>
              <dd>#:ProductName#</dd>
          </dl>
      </div>
    </script>

    <script>
      $(document).ready(function () {
        var crudServiceBaseUrl = "https://demos.telerik.com/service/v2/core",
            dataSource = new kendo.data.DataSource({
              transport: {
                read:  {
                  url: crudServiceBaseUrl + "/Products"
                }
              },
              pageSize: 10
            });

        var listView = $("#listView").kendoListView({
          dataSource: dataSource,
          template: kendo.template($("#template").html()),
          navigatable: true,
          pageable: {
            buttonCount: 10
          }
        }).data("kendoListView");
      });
    </script>

### pageable.info `Boolean` *(default: true)*

If set to `true` the pager will display information about the current page and total number of data items. By default the paging information is displayed.


<div class="meta-api-description">
Control visibility of pagination details showing current page number, total items count, or data range in paged lists or grids; enable or disable on-screen page indicators, item counts, or pager summaries in ListView or similar components to provide users with contextual navigation info, page status updates, or total record visibility while configuring or customizing pagers, pagination controls, or page info display features.
</div>

#### Example - hide the paging information

    <div id="listView"></div>

    <script type="text/x-kendo-tmpl" id="template">
      <div class="product-view k-widget">
          <dl>
              <dt>Product Name</dt>
              <dd>#:ProductName#</dd>
          </dl>
      </div>
    </script>

    <script>
      $(document).ready(function () {
        var crudServiceBaseUrl = "https://demos.telerik.com/service/v2/core",
            dataSource = new kendo.data.DataSource({
              transport: {
                read:  {
                  url: crudServiceBaseUrl + "/Products"
                }
              },
              pageSize: 10
            });

        var listView = $("#listView").kendoListView({
          dataSource: dataSource,
          template: kendo.template($("#template").html()),
          navigatable: true,
          pageable: {
            info: false
          }
        }).data("kendoListView");
      });
    </script>

### pageable.input `Boolean` *(default: false)*

If set to `true` the pager will display an input element which allows the user to type a specific page number. By default the page input is not displayed.

Using `pageable.input` and [`pageable.numeric`](pageable.numeric) at the same time is not recommended.


<div class="meta-api-description">
Allow users to directly enter or type a specific page number in a data list or grid pager to quickly jump to that page, enabling direct page navigation input controls for faster access in paginated views. This supports configuring numeric input fields within pagination controls to facilitate manual page selection, controlling or enabling typed page jumps instead of only clicking navigation arrows or numeric buttons. It covers use cases for paging input customization, handling user-driven page entry, and improving user experience by allowing direct page number input to navigate large datasets or lists efficiently.
</div>

#### Example - show the pager input

    <div id="listView"></div>

    <script type="text/x-kendo-tmpl" id="template">
      <div class="product-view k-widget">
          <dl>
              <dt>Product Name</dt>
              <dd>#:ProductName#</dd>
          </dl>
      </div>
    </script>

    <script>
      $(document).ready(function () {
        var crudServiceBaseUrl = "https://demos.telerik.com/service/v2/core",
            dataSource = new kendo.data.DataSource({
              transport: {
                read:  {
                  url: crudServiceBaseUrl + "/Products"
                }
              },
              pageSize: 10
            });

        var listView = $("#listView").kendoListView({
          dataSource: dataSource,
          template: kendo.template($("#template").html()),
          navigatable: true,
          pageable: {
            input: true
          }
        }).data("kendoListView");
      });
    </script>

### pageable.adaptiveMode `String`*(default: "none")*
Specifies a value whether the page sizes dropdown will be adaptive. Possible values are:

* `none` - The current page.
* `auto` - The total number of pages.


<div class="meta-api-description">
Control how the pagination size selector adapts in list or grid views by configuring whether the dropdown displays fixed options, dynamic page counts, or adjusts responsively for different screen sizes and compact layouts. Enable or disable adaptive behavior of page size controls to optimize user interaction with pagination, customize how page counts and navigation elements react to varying dataset sizes or viewport widths, and set options to show either the current page, total pages, or tailor dropdown menus for mobile-friendly or desktop environments. Adjust pagination controls to improve navigation, streamline page selection, and enhance usability across devices and data scenarios.
</div>

#### Example

    <div id="listview"></div>
    <div id="pager"></div>
    <script>
    var dataSource = new kendo.data.DataSource({
        data: [
            { name: "Item 1" },
            { name: "Item 2" },
            { name: "Item 3" },
            { name: "Item 4" },
            { name: "Item 5" }
        ],
        pageSize: 2
    });

    $("#listview").kendoListView({
        dataSource: dataSource,
        template: "<div class='k-listview-item'>#: name #</div>",
        pageable: {
            adaptiveMode: "auto",
            pageSizes: [2, 5, 10]
        }
    });
    </script>

### pageable.messages `Object`

The text messages displayed in pager. Use this option to customize or localize the pager messages.


<div class="meta-api-description">
Customize, configure, or localize the pagination text, labels, and messages that appear within a ListView's paging controls, including modifying default pager button text, messages for navigating between pages, user prompts for page numbers, and any information displayed regarding current page status or total pages, enabling developers to set personalized, translated, or context-specific pager wording to enhance user interface clarity and accessibility across different languages and use cases.
</div>

#### Example

    <div id="listview"></div>
    <div id="pager"></div>
    <script>
    var dataSource = new kendo.data.DataSource({
        data: [
            { name: "Item 1" },
            { name: "Item 2" },
            { name: "Item 3" },
            { name: "Item 4" },
            { name: "Item 5" }
        ],
        pageSize: 2
    });

    $("#listview").kendoListView({
        dataSource: dataSource,
        template: "<div class='k-listview-item'>#: name #</div>",
        pageable: {
            messages: {
                display: "Showing {0} to {1} of {2} entries",
                empty: "No records to display",
                page: "Page",
                of: "of {0}",
                itemsPerPage: "entries per page",
                first: "Go to first page",
                previous: "Go to previous page",
                next: "Go to next page",
                last: "Go to last page"
            }
        }
    });
    </script>

### pageable.messages.display `String` *(default: "{0} - {1} of {2} items")*,

The pager info text. Uses [kendo.format](/api/javascript/kendo/methods/format).

Contains three placeholders:
- {0} - the first data item index
- {1} - the last data item index
- {2} - the total number of data items


<div class="meta-api-description">
Customize and configure pager text labels, format and control the display of pagination messages such as first page, last page, and total pages counts; set dynamic placeholders for page numbers and totals within page navigation text, enabling tailored pager messages using templates, string formatting patterns, or custom text output for list views or grid pagination components.
</div>

#### Example - set the "display" pager message

    <div id="listView"></div>

    <script type="text/x-kendo-tmpl" id="template">
      <div class="product-view k-widget">
          <dl>
              <dt>Product Name</dt>
              <dd>#:ProductName#</dd>
          </dl>
      </div>
    </script>

    <script>
      $(document).ready(function () {
        var crudServiceBaseUrl = "https://demos.telerik.com/service/v2/core",
            dataSource = new kendo.data.DataSource({
              transport: {
                read:  {
                  url: crudServiceBaseUrl + "/Products"
                }
              },
              pageSize: 2
            });

        var listView = $("#listView").kendoListView({
          dataSource: dataSource,
          template: kendo.template($("#template").html()),
          navigatable: true,
          pageable: {
            messages: {
              display: "Showing {0}-{1} from {2} data items"
            }
          }
        }).data("kendoListView");
      });
    </script>

### pageable.messages.empty `String` *(default: "No items to display")*,

The text displayed when the grid is empty.


<div class="meta-api-description">
Customize or configure the message, text, or label shown when no items, data, or entries are available in a pageable list or grid view component, enabling control over empty state notifications, default empty list text, placeholder content, or user-facing messages that appear when the data source contains no records during pagination or data loading in list or grid interfaces.
</div>

#### Example - set the "empty" pager message

    <div id="listView"></div>

    <script>
      $(document).ready(function () {
        var listView = $("#listView").kendoListView({
          dataSource: [],
          pageable: {
            messages: {
              empty: "No data"
            }
          }
        }).data("kendoListView");
      });
    </script>

### pageable.messages.page `String` *(default: "Page")*,

The label displayed before the pager input.


<div class="meta-api-description">
Control and customize the text label or prompt displayed before the page number input in a pageable list or grid interface, allowing you to set or change the wording for navigation prompts related to pagination, page selection, page indicator, or paging controls, enabling tailored messages that improve user experience when moving between pages or entries in a scrollable list view component with paging functionality.
</div>

#### Example - set the label before the pager input

    <div id="listView"></div>

    <script type="text/x-kendo-tmpl" id="template">
      <div class="product-view k-widget">
          <dl>
              <dt>Product Name</dt>
              <dd>#:ProductName#</dd>
          </dl>
      </div>
    </script>

    <script>
      $(document).ready(function () {
        var dataSource = new kendo.data.DataSource({
              transport: {
                read:  {
                  url: "https://demos.telerik.com/service/v2/core/Products"
                }
              },
              pageSize: 2
            });

        $("#listView").kendoListView({
          dataSource: dataSource,
          template: kendo.template($("#template").html()),
          navigatable: true,
          pageable: {
            input: true,
            messages: {
              page: "Enter page"
            }
          }
        });
      });
    </script>

### pageable.messages.of `String` *(default: "of {0}")*,

The label displayed before the pager input. Uses [kendo.format](/api/javascript/kendo/methods/format). Contains one optional placeholder {0} which represents the total number of pages.


<div class="meta-api-description">
Configure the text label displayed before the page number input in a list pagination interface, customize the paging message format to show phrases like "page X of Y," include dynamic total page counts using placeholders such as {0}, control how page navigation information is presented, and personalize or localize the pager prompts within list or data view components to improve user guidance during pagination.
</div>

#### Example - set the label after the pager input

    <div id="listView"></div>

    <script type="text/x-kendo-tmpl" id="template">
      <div class="product-view k-widget">
          <dl>
              <dt>Product Name</dt>
              <dd>#:ProductName#</dd>
          </dl>
      </div>
    </script>

    <script>
      $(document).ready(function () {
        var dataSource = new kendo.data.DataSource({
              transport: {
                read:  {
                  url: "https://demos.telerik.com/service/v2/core/Products"
                }
              },
              pageSize: 2
            });

        $("#listView").kendoListView({
          dataSource: dataSource,
          template: kendo.template($("#template").html()),
          navigatable: true,
          pageable: {
            input: true,
            messages: {
              of: "from {0}"
            }
          }
        });
      });
    </script>

### pageable.messages.itemsPerPage `String` *(default: "items per page")*,

The label displayed after the page size DropDownList.


<div class="meta-api-description">
Configure the text label shown next to the page size selector, dropdown, or pagination control to customize how the number of items displayed per page is described or indicated, enabling adjustment of the page size descriptor, pager item count label, results per page text, or rows per page wording in list or grid views for clearer pagination interfaces and user-friendly navigation controls.
</div>

#### Example - set the label after the page size DropDownList

    <div id="listView"></div>

    <script type="text/x-kendo-tmpl" id="template">
      <div class="product-view k-widget">
          <dl>
              <dt>Product Name</dt>
              <dd>#:ProductName#</dd>
          </dl>
      </div>
    </script>

    <script>
      $(document).ready(function () {
        var crudServiceBaseUrl = "https://demos.telerik.com/service/v2/core",
            dataSource = new kendo.data.DataSource({
              transport: {
                read:  {
                  url: "https://demos.telerik.com/service/v2/core/Products"
                }
              },
              pageSize: 2
            });

        $("#listView").kendoListView({
          dataSource: dataSource,
          template: kendo.template($("#template").html()),
          navigatable: true,
          pageable: {
            pageSizes: true,
            messages: {
              itemsPerPage: "data items per page"
            }
          }
        });
      });
    </script>

### pageable.messages.first `String` *(default: "Go to the first page")*,

The tooltip of the button which goes to the first page.


<div class="meta-api-description">
Configure or customize the tooltip, hover text, or accessibility label shown on the navigation control for jumping directly to the first page in a paginated list or grid view, enabling user interface hints, button descriptions, or screen reader prompts that clarify the action of moving to the starting page in multi-page navigation components.
</div>

#### Example - set the Tooltip of the first page button
    <div id="listView"></div>

    <script type="text/x-kendo-tmpl" id="template">
      <div class="product-view k-widget">
          <dl>
              <dt>Product Name</dt>
              <dd>#:ProductName#</dd>
          </dl>
      </div>
    </script>

    <script>
      $(document).ready(function () {
        var crudServiceBaseUrl = "https://demos.telerik.com/service/v2/core",
            dataSource = new kendo.data.DataSource({
              transport: {
                read:  {
                  url: "https://demos.telerik.com/service/v2/core/Products"
                }
              },
              pageSize: 10
            });

        $("#listView").kendoListView({
          dataSource: dataSource,
          template: kendo.template($("#template").html()),
          navigatable: true,
          pageable: {
            messages: {
              first: "First page"
            }
          }
        });
      });
    </script>

### pageable.messages.last `String` *(default: "Go to the last page")*,

The tooltip of the button which goes to the last page.


<div class="meta-api-description">
Adjust, configure, or customize the tooltip text shown on the last page button of a ListView pager, enabling localization, internationalization, or personalization of the navigation UI label for the final pagination control, so users can see tailored hover text or accessible descriptions when moving to the last available page in lists, grids, or data views.
</div>

#### Example - set the Tooltip of the last page button

    <div id="listView"></div>

    <script type="text/x-kendo-tmpl" id="template">
      <div class="product-view k-widget">
          <dl>
              <dt>Product Name</dt>
              <dd>#:ProductName#</dd>
          </dl>
      </div>
    </script>

    <script>
      $(document).ready(function () {
        var crudServiceBaseUrl = "https://demos.telerik.com/service/v2/core",
            dataSource = new kendo.data.DataSource({
              transport: {
                read:  {
                  url: "https://demos.telerik.com/service/v2/core/Products"
                }
              },
              pageSize: 10
            });

        $("#listView").kendoListView({
          dataSource: dataSource,
          template: kendo.template($("#template").html()),
          navigatable: true,
          pageable: {
            messages: {
              last: "Last page"
            }
          }
        });
      });
    </script>

### pageable.messages.next `String` *(default: "Go to the next page")*,

The Tooltip of the button which goes to the next page.


<div class="meta-api-description">
Customize, configure, or set the hover tooltip, title text, or accessibility label for the next page button in a pageable list or grid view to improve user navigation cues, enhance UI clarity, enable localization or internationalization of paging controls, control the descriptive text shown when users mouse over or focus on the "next" pagination control, and adjust or override the default paging button’s informational prompt in scrollable or paged content displays.
</div>

#### Example - set the Tooltip of the next page button

    <div id="listView"></div>

    <script type="text/x-kendo-tmpl" id="template">
      <div class="product-view k-widget">
          <dl>
              <dt>Product Name</dt>
              <dd>#:ProductName#</dd>
          </dl>
      </div>
    </script>

    <script>
      $(document).ready(function () {
        var crudServiceBaseUrl = "https://demos.telerik.com/service/v2/core",
            dataSource = new kendo.data.DataSource({
              transport: {
                read:  {
                  url: "https://demos.telerik.com/service/v2/core/Products"
                }
              },
              pageSize: 10
            });

        $("#listView").kendoListView({
          dataSource: dataSource,
          template: kendo.template($("#template").html()),
          navigatable: true,
          pageable: {
            messages: {
              next: "Next page"
            }
          }
        });
      });
    </script>

### pageable.messages.previous `String` *(default: "Go to the previous page")*,

The Tooltip of the button which goes to the previous page.


<div class="meta-api-description">
Set or customize the tooltip, hover text, or hover tooltip for the pagination control’s previous button in a list or data view, enabling user-friendly navigation cues, adjustable labels, accessible hints, and localized or custom text for the "go back," "previous page," or "navigate backward" button in pageable lists, grids, or data displays.
</div>

#### Example - set the Tooltip of the previous page button

    <div id="listView"></div>

    <script type="text/x-kendo-tmpl" id="template">
      <div class="product-view k-widget">
          <dl>
              <dt>Product Name</dt>
              <dd>#:ProductName#</dd>
          </dl>
      </div>
    </script>

    <script>
      $(document).ready(function () {
        var crudServiceBaseUrl = "https://demos.telerik.com/service/v2/core",
            dataSource = new kendo.data.DataSource({
              transport: {
                read:  {
                  url: "https://demos.telerik.com/service/v2/core/Products"
                }
              },
              pageSize: 10
            });

        $("#listView").kendoListView({
          dataSource: dataSource,
          template: kendo.template($("#template").html()),
          navigatable: true,
          pageable: {
            messages: {
              previous: "Previous page"
            }
          }
        });
      });
    </script>

### pageable.messages.refresh `String` *(default: "Refresh")*,

The Tooltip of the refresh button.


<div class="meta-api-description">
Customize or configure the tooltip text for the refresh button within a pageable list view interface, control the label or hint displayed on hover over the refresh control in paginated lists, enable changing or setting descriptive text for the refresh action in pageable UI components, adjust messages that guide users on refreshing data in list views with pagination, optimize user experience by specifying the tooltip for the update or reload button in pageable list interfaces, manage text prompts or tooltips associated with refreshing content on paged data grids or lists.
</div>

#### Example - set the Tooltip of the refresh button

    <div id="listView"></div>

    <script type="text/x-kendo-tmpl" id="template">
      <div class="product-view k-widget">
          <dl>
              <dt>Product Name</dt>
              <dd>#:ProductName#</dd>
          </dl>
      </div>
    </script>

    <script>
      $(document).ready(function () {
        var crudServiceBaseUrl = "https://demos.telerik.com/service/v2/core",
            dataSource = new kendo.data.DataSource({
              transport: {
                read:  {
                  url: "https://demos.telerik.com/service/v2/core/Products"
                }
              },
              pageSize: 10
            });

        $("#listView").kendoListView({
          dataSource: dataSource,
          template: kendo.template($("#template").html()),
          navigatable: true,
          pageable: {
            refresh: true,
            messages: {
                refresh: "Refresh the ListView"
            }
          }
        });
      });
    </script>

### pageable.messages.morePages `String` *(default: "More pages")*,

The Tooltip of the ellipsis ("...") button, which appears when the number of pages is greater than the `buttonCount`.


<div class="meta-api-description">
Customize or set the tooltip text for the pagination ellipsis button that appears in list or grid views when there are additional pages beyond the displayed page buttons, enabling localization, translation, or adjustment of user interface hints for overflow pagination controls, including scenarios where the number of pages exceeds the visible page buttons and users need guidance on accessing more pages through the ellipsis indicator.
</div>

#### Example - set the Tooltip of the ellipsis button

    <div id="listView"></div>

    <script type="text/x-kendo-tmpl" id="template">
      <div class="product-view k-widget">
          <dl>
              <dt>Product Name</dt>
              <dd>#:ProductName#</dd>
          </dl>
      </div>
    </script>

    <script>
      $(document).ready(function () {
        var crudServiceBaseUrl = "https://demos.telerik.com/service/v2/core",
            dataSource = new kendo.data.DataSource({
              transport: {
                read:  {
                  url: "https://demos.telerik.com/service/v2/core/Products"
                }
              },
              pageSize: 1
            });

        $("#listView").kendoListView({
          dataSource: dataSource,
          template: kendo.template($("#template").html()),
          navigatable: true,
          pageable: {
            buttonCount: 2,
            refresh: true,
            messages: {
              morePages: "More pages"
            }
          }
        });
      });
    </script>

### pageable.numeric `Boolean` *(default: true)*

If set to `true` the pager will display buttons for navigating to specific pages. By default those buttons are displayed.

Using `pageable.numeric` and [`pageable.input`](pageable.input) at the same time is not recommended.


<div class="meta-api-description">
Control or enable numeric pagination buttons in list views to display clickable page numbers for direct navigation, allowing users to jump to specific pages easily. Configure the pagination style to show numbered page buttons instead of input fields or other controls, facilitating quick page switching and improved user experience with page indexes. Set up the pager to highlight and manage numeric page navigation, help users jump to exact pages, and avoid mixing numeric buttons with input-based page controls for clarity and usability. Adjust list pagination behavior by toggling page number visibility, enabling straightforward navigation through multiple data pages with distinct numeric selectors or buttons.
</div>

#### Example - hide the numeric pager buttons

    <div id="listView"></div>

    <script type="text/x-kendo-tmpl" id="template">
      <div class="product-view k-widget">
          <dl>
              <dt>Product Name</dt>
              <dd>#:ProductName#</dd>
          </dl>
      </div>
    </script>

    <script>
      $(document).ready(function () {
        var crudServiceBaseUrl = "https://demos.telerik.com/service/v2/core",
            dataSource = new kendo.data.DataSource({
              transport: {
                read:  {
                  url: "https://demos.telerik.com/service/v2/core/Products"
                }
              },
              pageSize: 1
            });

        $("#listView").kendoListView({
          dataSource: dataSource,
          template: kendo.template($("#template").html()),
          navigatable: true,
          pageable: {
            numeric: false
          }
        });
      });
    </script>

### pageable.pageSize `Number`

The number of data items which will be displayed in the ListView. **This setting will not work if the ListView is assigned an already existing Kendo UI DataSource instance.**


<div class="meta-api-description">
Configure the number of items displayed per page in a paginated list or grid, control the batch size for paging through data entries, set how many records appear on each page of a scrollable or pageable view, adjust page length to optimize performance and user experience, define page capacity to manage data loading chunks, specify item count for paged navigation, control page chunk size when using internal data management, and determine the visible data quantity per page in list or table components without external data sources.
</div>

#### Example - set page size

    <div id="listView"></div>

    <script type="text/x-kendo-tmpl" id="template">
      <div class="product-view k-widget">
          <dl>
              <dt>Product Name</dt>
              <dd>#:ProductName#</dd>
          </dl>
      </div>
    </script>

    <script>
      $("#listView").kendoListView({
        dataSource: {
          data: [
            { ProductName: "Tea", ProductID: 1 },
            { ProductName: "Coffee", ProductID: 2 },
            { ProductName: "Ham", ProductID: 3 },
            { ProductName: "Bread", ProductID: 4 }
          ]
        },
        template: kendo.template($("#template").html()),
        navigatable: true,
        pageable: {
          pageSize: 2,
        }
      })
    </script>

### pageable.pageSizes `Boolean|Array` *(default: false)*

If set to `true` the pager will display a drop-down which allows the user to pick a page size.

Can be set to an array of predefined page sizes to override the default list.
A special `all` value is supported. It sets the page size to the total number of records.

If a `pageSize` setting is provided for the data source then this value will be selected initially.


<div class="meta-api-description">
Control and customize pagination options by enabling or configuring dropdown menus for selecting the number of items displayed per page in list views, allowing users to pick from default sizes, specify custom page size arrays, include an option to view all records on a single page, set initial page size automatically based on data source configurations, and manage dynamic or fixed page length selections to optimize user navigation, browsing, and data presentation in paged lists.
</div>

#### Example - show the page size DropDownList

    <div id="listView"></div>

    <script type="text/x-kendo-tmpl" id="template">
      <div class="product-view k-widget">
          <dl>
              <dt>Product Name</dt>
              <dd>#:ProductName#</dd>
          </dl>
      </div>
    </script>

    <script>
      $(document).ready(function () {
        var crudServiceBaseUrl = "https://demos.telerik.com/service/v2/core",
            dataSource = new kendo.data.DataSource({
              transport: {
                read:  {
                  url: "https://demos.telerik.com/service/v2/core/Products"
                }
              },
              pageSize: 1
            });

        $("#listView").kendoListView({
          dataSource: dataSource,
          template: kendo.template($("#template").html()),
          pageable: {
            pageSizes: true
          }
        });
      });
    </script>

#### Example - specify the page sizes as array

    <div id="listView"></div>

    <script type="text/x-kendo-tmpl" id="template">
      <div class="product-view k-widget">
          <dl>
              <dt>Product Name</dt>
              <dd>#:ProductName#</dd>
          </dl>
      </div>
    </script>

    <script>
      $(document).ready(function () {
        var crudServiceBaseUrl = "https://demos.telerik.com/service/v2/core",
            dataSource = new kendo.data.DataSource({
              transport: {
                read:  {
                  url: "https://demos.telerik.com/service/v2/core/Products"
                }
              },
              pageSize: 2
            });

        $("#listView").kendoListView({
          dataSource: dataSource,
          template: kendo.template($("#template").html()),
          pageable: {
            pageSizes: [2, 3, 4, "all"],
            numeric: false
          }
        });
      });
    </script>

### pageable.position `String` *(default: "bottom")*

Specifies the position in which the ListView pager will be rendered. Valid values are "top" and "bottom" (default).


<div class="meta-api-description">
Adjust or configure the pagination control placement above or below the displayed list items in a scrollable or paged view, enabling setting the pager position at the top or bottom of the list interface, controlling where users see navigation elements for flipping through pages, toggling the location of page navigation controls to optimize user experience and interface layout, setting pagination UI to appear either before or after the list contents, determining if the page selector appears at the start or end of the item collection display, enabling control over pager placement within list views for customizable navigation arrangement, managing the location of page controls relative to item listings to fit design preferences and usability needs.
</div>

#### Example - place the Pager on top of the ListView

    <div id="listView"></div>

    <script type="text/x-kendo-tmpl" id="template">
      <div class="product-view k-widget">
          <dl>
              <dt>Product Name</dt>
              <dd>#:ProductName#</dd>
          </dl>
      </div>
    </script>

    <script>
      $("#listView").kendoListView({
        dataSource: {
          data: [
            { ProductName: "Tea", ProductID: 1 },
            { ProductName: "Coffee", ProductID: 2 },
            { ProductName: "Ham", ProductID: 3 },
            { ProductName: "Bread", ProductID: 4 }
          ]
        },
        template: kendo.template($("#template").html()),
        navigatable: true,
        pageable: {
          pageSize: 2,
          position: "top"
        }
      })
    </script>

### pageable.previousNext `Boolean` *(default: true)*

If set to `true` the Pager will display buttons for going to the first, previous, next and last pages.


<div class="meta-api-description">
Control pagination navigation by enabling or disabling interface buttons that let users jump to the first page, move to the previous page, advance to the next page, or go directly to the last page within a list or data view. Configure display options for pagination controls that provide quick navigation shortcuts, such as first, previous, next, and last page buttons, supporting user-friendly traversal of large datasets or multi-page lists. Adjust the visibility and availability of these navigation buttons during list or grid initialization to improve usability and streamline moving through paged content, including settings for enabling or disabling sequential and boundary page jumps.
</div>

#### Example - hide the first, previous, next, and last buttons

    <div id="listView"></div>

    <script type="text/x-kendo-tmpl" id="template">
      <div class="product-view k-widget">
          <dl>
              <dt>Product Name</dt>
              <dd>#:ProductName#</dd>
          </dl>
      </div>
    </script>

    <script>
      $("#listView").kendoListView({
        dataSource: {
          data: [
            { ProductName: "Tea", ProductID: 1 },
            { ProductName: "Coffee", ProductID: 2 },
            { ProductName: "Ham", ProductID: 3 },
            { ProductName: "Bread", ProductID: 4 }
          ]
        },
        template: kendo.template($("#template").html()),
        navigatable: true,
        pageable: {
          pageSize: 2,
          previousNext: false
        }
      })
    </script>

### pageable.refresh `Boolean` *(default: false)*

If set to `true` the pager will display the refresh button. Clicking the refresh button will [refresh](/api/javascript/ui/listview/methods/refresh) the ListView.


<div class="meta-api-description">
Control the display and functionality of a refresh button within pageable data lists to reload or update content on demand, allowing users to trigger data reloading, refresh the current page, enable manual data fetching, or reset the view dynamically; configure whether a refresh control appears alongside pagination controls, customize behavior for refreshing paged datasets instantly, and manage how the list content updates when users interact with pagination or refresh triggers.
</div>

#### Example - show the refresh button

    <div id="listView"></div>

    <script type="text/x-kendo-tmpl" id="template">
      <div class="product-view k-widget">
          <dl>
              <dt>Product Name</dt>
              <dd>#:ProductName#</dd>
          </dl>
      </div>
    </script>

    <script>
      $("#listView").kendoListView({
        dataSource: {
          data: [
            { ProductName: "Tea", ProductID: 1 },
            { ProductName: "Coffee", ProductID: 2 },
            { ProductName: "Ham", ProductID: 3 },
            { ProductName: "Bread", ProductID: 4 }
          ]
        },
        template: kendo.template($("#template").html()),
        navigatable: true,
        pageable: {
          pageSize: 2,
          refresh: true
        }
      })
    </script>

### pageable.responsive `Boolean` *(default: true)*

If set to `false` the pager will not be responsive.


<div class="meta-api-description">
Configure the pagination controls to automatically adjust or stay fixed based on screen size, container width, or viewport changes, enabling or disabling responsiveness for the pager layout to optimize usability on mobile devices, tablets, and dynamic resizing scenarios, controlling whether page navigation elements adapt fluidly to smaller screens or maintain a consistent fixed appearance regardless of display or container size variations.
</div>

#### Example - show the responsive button

    <div id="listView"></div>

    <script type="text/x-kendo-tmpl" id="template">
      <div class="product-view k-widget">
          <dl>
              <dt>Product Name</dt>
              <dd>#:ProductName#</dd>
          </dl>
      </div>
    </script>

    <script>
      $("#listView").kendoListView({
        dataSource: {
          data: [
            { ProductName: "Tea", ProductID: 1 },
            { ProductName: "Coffee", ProductID: 2 },
            { ProductName: "Ham", ProductID: 3 },
            { ProductName: "Bread", ProductID: 4 }
          ]
        },
        template: kendo.template($("#template").html()),
        navigatable: true,
        pageable: {
          pageSize: 2,
          responsive: false
        }
      })
    </script>

### navigatable `Boolean` *(default: false)*

 Indicates whether keyboard navigation is enabled/disabled.


<div class="meta-api-description">
Control keyboard interaction with list items by enabling or disabling focus movement and navigation within a ListView component, allowing users to traverse, select, or activate entries using arrow keys, tabbing, or other keyboard controls, enhancing accessibility and keyboard-driven UI workflows by configuring focus cycling, item highlighting, and keyboard event handling for intuitive list navigation.
</div>

#### Example

      <div id="listView"></div>

      <script type="text/x-kendo-tmpl" id="template">
        <div class="product-view k-widget">
            <dl>
                <dt>Product Name</dt>
                <dd>#:ProductName#</dd>
            </dl>
        </div>
      </script>

      <script>
        $(document).ready(function () {
          var crudServiceBaseUrl = "https://demos.telerik.com/service/v2/core",
              dataSource = new kendo.data.DataSource({
                transport: {
                  read:  {
                    url: crudServiceBaseUrl + "/Products"
                  }
                },
                pageSize: 10
              });

          var listView = $("#listView").kendoListView({
            dataSource: dataSource,
            navigatable: true,
            template: kendo.template($("#template").html())
          }).data("kendoListView");
        });
      </script>

### selectable `Boolean|String` *(default: false)*

 Indicates whether selection is enabled/disabled. Possible values:



<div class="meta-api-description">
Enable or disable item selection within a list view, configuring whether users can select none, one, or multiple items simultaneously. Control selection modes including single-item selection, multiple-item selection, or turning selection off entirely, adjusting user interaction with list entries. Set, toggle, or restrict selection behavior to fine-tune list navigation, highlighting, or activation in user interfaces, supporting use cases like selecting individual elements, batch selecting multiple items, or disabling selection for read-only lists. Manage selection preferences to customize list item interaction patterns, such as click, tap, or keyboard navigation, ensuring flexibility for single or multi-select user experiences.
</div>

#### *true*

Single item selection.

#### *"single"*

Single item selection.

#### *"multiple"*

Multiple item selection.

#### Example of ListView with multiple selection enabled

      <div id="listView"></div>

      <script type="text/x-kendo-tmpl" id="template">
        <div class="product-view k-widget">
            <dl>
                <dt>Product Name</dt>
                <dd>#:ProductName#</dd>
        </dl>
        </div>
      </script>

      <script>
        $(document).ready(function () {
          var crudServiceBaseUrl = "https://demos.telerik.com/service/v2/core",
              dataSource = new kendo.data.DataSource({
                transport: {
                  read:  {
                    url: crudServiceBaseUrl + "/Products"
                  }
                },
                pageSize: 10
              });

          var listView = $("#listView").kendoListView({
            dataSource: dataSource,
            selectable: "multiple",
            template: kendo.template($("#template").html())
          }).data("kendoListView");
        });
      </script>

### template `Function`

Specifies ListView item template.

> The outermost HTML element in the template must be enclosed in another container such as a `div` or `span` element.


<div class="meta-api-description">
Customize how each item displays in a list by defining personalized HTML structures and layouts for individual entries, controlling item appearance and dynamically binding data fields within the list rendering. Configure custom markup templates to shape the presentation of each element in the collection, wrapping the content in container elements like div or span to ensure proper rendering. Enable detailed item-level customization with flexible HTML templates that let you set styles, attributes, and embedded data bindings for list entries, supporting varied designs, user interfaces, and dynamic content display in data-driven lists.
</div>

#### Example

     <script type="text/kendo-x-tmpl" id="template">
        <div>
            Item template for #:name#
        </div>
     </script>

     <div id ="listView"></div>
     <script>
     $("#listView").kendoListView({
        dataSource: {
            data: [
                { name: "Jane Doe" },
                { name: "John Doe" }
            ]
        },
        template: kendo.template($("#template").html())
    });
    </script>

### altTemplate `Function`

Template to be used for rendering the alternate items in the ListView.

> The outermost HTML element in the template must be enclosed in another container such as a `div` or `span` element.


<div class="meta-api-description">
Customize rendering for alternating items by setting different templates or layouts for odd and even entries in a list or collection view, enabling unique HTML structures, CSS classes, and data bindings for every other item to achieve distinct styling or content differentiation. Control how alternate list elements display by defining custom markup patterns for alternate indices, support dynamic presentation changes for even or odd rows with tailored containers like divs or spans wrapping the outer elements, and configure templating that adjusts the appearance, structure, and behavior of items based on their position within a repeating list.
</div>

#### Example of alternate item template


     <script type="text/kendo-x-tmpl" id="template">
        <div>
            Item template for #:name#
        </div>
     </script>

     <script type="text/kendo-x-tmpl" id="altTemplate">
        <div>
            Alternate item template for #:name#
        </div>
     </script>

     <div id ="listView"></div>
     <script>
     $("#listView").kendoListView({
        dataSource: {
            data: [
                { name: "Jane Doe" },
                { name: "John Doe" }
            ]
        },
        template: kendo.template($("#template").html()),
        altTemplate: kendo.template($("#altTemplate").html())
    });
    </script>

## Fields

### dataSource `kendo.data.DataSource`

The [DataSource](/api/javascript/data/datasource) of the widget. Configured via the [dataSource](/api/javascript/ui/listview/configuration/datasource) option.

> Changes of the DataSource will be reflected in the widget.

> **Important:** Assigning a new DataSource would have no effect. Use the [setDataSource](/api/javascript/ui/listview/methods/setdatasource) method instead.


<div class="meta-api-description">
Access and control the live data collection used by the list or grid component by referencing the underlying data source object that dynamically reflects changes, enabling synchronization between the data set and the UI display without replacing the entire data source instance; manage, query, or update the bound collection through this active data handler to support real-time data modifications, incremental updates, and interactive data-driven interfaces while ensuring that direct assignment does not replace the data backing but interaction methods maintain state consistency.
</div>

#### Example

    <div id="listview"></div>
    <script>
    var dataSource = new kendo.data.DataSource({
        data: [
            { name: "Item 1" },
            { name: "Item 2" },
            { name: "Item 3" }
        ]
    });

    var listview = $("#listview").kendoListView({
        dataSource: dataSource,
        template: "<div class='k-listview-item'>#: name #</div>"
    }).data("kendoListView");

    // Access the dataSource
    var currentDataSource = listview.dataSource;
    /* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(currentDataSource.data()); // logs the data array
    </script>

## Methods

### add

Inserts an empty item as a first item in the ListView and puts it in edit mode.


<div class="meta-api-description">
Programmatically prepend a blank or empty entry to a list-based UI component and instantly enable inline editing mode to allow immediate user input or data entry, supporting actions like creating new items dynamically, triggering editable states upon insertion, automating item creation workflows, initiating add-and-edit sequences, and integrating with save or data processing logic for seamless addition of records, new fields, or list rows in applications that require interactive item insertion with direct editing capabilities.
</div>

#### Example

    <script type="text/x-kendo-tmpl" id="template">
     <div>
       <dl>
         <dt>Name</dt> <dd>#:name#</dd>
         <dt>Age</dt> <dd>#:age#</dd>
      </dl>
      </div>
    </script>

    <script type="text/x-kendo-tmpl" id="editTemplate">
     <div>
       <dl>
         <dt>Name</dt>
         <dd><input type="text" data-bind="value:name" name="name" required="required" /></dd>
         <dt>Age</dt>
         <dd><input type="text" data-bind="value:age" data-role="numerictextbox" data-type="number" name="age" required="required" /></dd>
      </dl>
       <div>
          <a class="k-button k-update-button" href="\\#">
          	<span class="k-icon k-i-check"></span>
      		</a>
          <a class="k-button k-cancel-button" href="\\#">
          	<span class="k-icon k-i-cancel"></span>
      		</a>
      </div>
      </div>
    </script>
    <button class="k-button" id="addBtn">Add New</button>
    <div id="listView"></div>
    <script>
      $("#listView").kendoListView({
        template: kendo.template($("#template").html()),
        editTemplate: kendo.template($("#editTemplate").html()),
        dataSource: {
          data: [
            { id: 1, name: "Jane Doe", age: 47 },
            { id: 2, name: "John Doe", age: 50 }
          ],
          schema: {
            model: {
              id: "id",
              fields: {
                id: { type: "number" },
                name: { type: "string" },
                age: { type: "number" }
              }
            }
          }
        }
      });
      $("#addBtn").click(function(){
        // get a reference to the ListView widget
        var listView = $("#listView").data("kendoListView");
        // add an item to the ListView
        listView.add();
      });
    </script>

### cancel

Cancels changes in the currently edited item.


<div class="meta-api-description">
Stop editing the current item in a list or grid by aborting inline changes, discarding unsaved edits, reverting data to its last saved state, exiting or closing the edit mode, cancelling active editors, rolling back modifications, and programmatically halting in-progress edit sessions to restore original values and prevent updates.
</div>

#### Example

    <script type="text/x-kendo-tmpl" id="template">
     <div>
       <dl>
         <dt>Name</dt> <dd>#:name#</dd>
         <dt>Age</dt> <dd>#:age#</dd>
      </dl>
       <div>
           <a class="k-button k-edit-button" href="\\#"><span class="k-icon k-i-edit"></span></a>
      </div>
      </div>
    </script>

    <script type="text/x-kendo-tmpl" id="editTemplate">
     <div>
       <dl>
         <dt>Name</dt>
         <dd><input type="text" data-bind="value:name" name="name" required="required" /></dd>
         <dt>Age</dt>
         <dd><input type="text" data-bind="value:age" data-role="numerictextbox" data-type="number" name="age" required="required" /></dd>
      </dl>
       <div>
          <a class="k-button k-update-button" href="\\#">
          	<span class="k-icon k-i-check"></span>
      		</a>
      </div>
      </div>
    </script>
    <button class="k-button" id="cancelBtn">Cancel</button>
    <div id="listView"></div>
    <script>
      $("#listView").kendoListView({
        template: kendo.template($("#template").html()),
        editTemplate: kendo.template($("#editTemplate").html()),
        dataSource: {
          data: [
            { id: 1, name: "Jane Doe", age: 47 },
            { id: 2, name: "John Doe", age: 50 }
          ],
          schema: {
            model: {
              id: "id",
              fields: {
                id: { type: "number" },
                name: { type: "string" },
                age: { type: "number" }
              }
            }
          }
        }
      });
      $("#cancelBtn").click(function(){
        $("#listView").data("kendoListView").cancel();
      });
    </script>

### clearSelection

Clears ListView selected items and triggers the [`change` event](/api/javascript/ui/listview/events/change).


<div class="meta-api-description">
Reset or remove all selected items in a list display component, deselecting entries programmatically to update the visible selection and internal state, clearing highlighted or chosen elements in the user interface, synchronizing selection status after content changes, data refreshes, or external model updates, triggering associated change notifications or events to reflect the current unselected state, enabling control over item selection clearing, disabling highlighted choices, and managing selection resets within interactive list views.
</div>

#### Example

    <button class="k-button" id="clearBtn">Clear Selection</button>
    <div id="listView"></div>

    <script type="text/x-kendo-tmpl" id="template">
        <div class="product-view k-widget">
            <dl>
                <dt>Product Name</dt>
                <dd>#:ProductName#</dd>
      </dl>
      </div>
    </script>

    <script>
      $("#clearBtn").click(function(){
        $("#listView").data("kendoListView").clearSelection();
      });
      var crudServiceBaseUrl = "https://demos.telerik.com/service/v2/core",
          dataSource = new kendo.data.DataSource({
            transport: {
              read:  {
                url: crudServiceBaseUrl + "/Products"
              }
            },
            pageSize: 10
          });

      var listView = $("#listView").kendoListView({
        dataSource: dataSource,
        selectable: "multiple",
        template: kendo.template($("#template").html())
      }).data("kendoListView");
    </script>

### dataItem

Returns the data item corresponding to the passed row object or selector.


<div class="meta-api-description">
Retrieve or access the data object, model, or underlying dataset for a specific row in a list or grid by using methods to map from a row element, jQuery selector, DOM node, or any reference identifying that row, enabling you to get the associated data entry, record, or item bound to the displayed row, whether you want to fetch, query, lookup, or extract the data behind a visible list item or convert a UI element back to its original data model for processing, rendering, or manipulation purposes.
</div>

#### Parameters

##### row `String|Element|jQuery`

A string, DOM element or jQuery object which represents the ListView item. A string is treated as a jQuery selector.

#### Returns

`kendo.data.ObservableObject` The data item to which the specified ListView item is bound. More information about the ObservableObject type in [kendo.data.ObservableObject](/api/javascript/data/observableobject).

#### Example - get the data item to which the first ListView item is bound

    <div id ="listView"></div>
    <div id="result"></div>
    
    <script>
      var dataSource = new kendo.data.DataSource({
        data: [ { name: "Jane Doe", age: 25 }, { name: "John Doe", age: 56 }]
      });
      var listview = $("#listView").kendoListView({
        dataSource: dataSource,
        template: "<div>#:name#</div>"
      }).data("kendoListView");
    
      var row = $('#listView .k-listview-item').first();
    
      var dataItem = listview.dataItem(row);
      $("#result").html("Result: " + dataItem.name + " - " + dataItem.age);
    </script>

### dataItems

Returns the array of data items that the widget is bound to.


<div class="meta-api-description">
Retrieve or access the current set of data objects displayed or bound within a list or UI component to inspect, iterate, or manipulate them programmatically; obtain an array representing the active collection of items rendered, which may include observable model instances or plain JavaScript objects sourced from the underlying data layer, allowing developers to loop through, map, filter, or synchronize these data entries with the user interface, supporting tasks such as data inspection, dynamic updates, or integration with other application logic that requires the current visible dataset.
</div>

#### Returns

`kendo.data.ObservableArray` The array of items that the ListView is bound to.

#### Example

    <div id ="listView"></div>
    <script>
      var dataSource = new kendo.data.DataSource({
        data: [ { name: "Jane Doe" }, { name: "John Doe" }]
      });
      var listview = $("#listView").kendoListView({
        dataSource: dataSource,
        template: "<div>#:name#</div>"
      }).data("kendoListView")
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(listview.dataItems()) //will output the bound array
    </script>

### destroy

Prepares the **ListView** for safe removal from DOM. Detaches all event handlers and removes `jQuery.data` attributes to avoid memory leaks. Calls `destroy` method of any child Kendo widgets.

> **Important:** This method does not remove the ListView element from DOM.


<div class="meta-api-description">
clean up or remove event listeners from a list view component, clear associated data and memory by detaching event handlers and removing stored attributes, properly dispose of child components and nested UI elements to avoid memory leaks, safely reset or disable interactive list behaviors without deleting the HTML node, configure destruction and cleanup processes for list or grid UI elements, manage lifecycle of dynamic list-based widgets including resource cleanup and event unbinding, handle teardown and proper disposal routines for list rendering components in single-page applications or dynamic interfaces, control safe removal or reinitialization of list data views by clearing internal references and event bindings, enable thorough cleanup of complex list UI components to prevent memory retention and ensure performance, set up list or item view destruction methods to prepare components for reuse or DOM manipulation while maintaining structural DOM integrity.
</div>

#### Example

    <button id="destroy">Destroy and remove ListView</button>
    <div id ="listView"></div>
    <script>
      $("#listView").kendoListView({
        dataSource: {
          data: [
            { name: "Jane Doe" },
            { name: "John Doe" }
          ]
        },
        template: "<div>#:name#</div>"
      });

      $("#destroy").click(function(){
        $("#listView").data("kendoListView").destroy(); // destroy the ListView

        $("#listView").remove(); // remove all ListView HTML
      });
    </script>

### edit

Puts the specified ListView item in edit mode. Fires the [edit](/api/javascript/ui/listview/events/edit) event.


<div class="meta-api-description">
Trigger or initiate inline editing on a particular list or grid item by activating edit mode programmatically, enabling direct content updates within that item’s editor field, and automatically focusing the input area for immediate user interaction; control or respond to editing start events, manage editing state changes, handle or cancel edits before modification, and customize the editing workflow in dynamic data views or item collections.
</div>

#### Example

    <script type="text/x-kendo-tmpl" id="template">
     <div>
       <dl>
         <dt>Name</dt> <dd>#:name#</dd>
         <dt>Age</dt> <dd>#:age#</dd>
      </dl>
      </div>
    </script>

    <script type="text/x-kendo-tmpl" id="editTemplate">
     <div>
       <dl>
         <dt>Name</dt>
         <dd><input type="text" data-bind="value:name" name="name" required="required" /></dd>
         <dt>Age</dt>
         <dd><input type="text" data-bind="value:age" data-role="numerictextbox" data-type="number" name="age" required="required" /></dd>
      </dl>
       <div>
          <a class="k-button k-update-button" href="\\#">
          	<span class="k-icon k-i-check"></span>
      </a>
          <a class="k-button k-cancel-button" href="\\#">
          	<span class="k-icon k-i-cancel"></span>
      </a>
      </div>
      </div>
    </script>
    <button class="k-button" id="editBtn">Edit First Item</button>
    <div id="listView"></div>
    <script>
      $("#listView").kendoListView({
        template: kendo.template($("#template").html()),
        editTemplate: kendo.template($("#editTemplate").html()),
        dataSource: {
          data: [
            { id: 1, name: "Jane Doe", age: 47 },
            { id: 2, name: "John Doe", age: 50 }
          ],
          schema: {
            model: {
              id: "id",
              fields: {
                id: { type: "number" },
                name: { type: "string" },
                age: { type: "number" }
              }
            }
          }
        }
      });
      $("#editBtn").click(function(){
        // get a reference to the ListView widget
        var listView = $("#listView").data("kendoListView");
        // edit the first ListView item
        listView.edit(listView.content.children().first());
      });
    </script>

#### Parameters

##### item `jQuery`

A jQuery object which represents the item to be edited.

### items

Obtains an Array of the DOM elements, which correspond to the data items from the Kendo UI DataSource [view](/api/javascript/data/datasource/methods/view).


<div class="meta-api-description">
Retrieve or access the current rendered list elements corresponding to the visible data items in a list or collection view for purposes like event binding, dynamic DOM manipulation, per-item updates, measuring element sizes, custom rendering adjustments, or enhancing accessibility. This method provides a way to get a synchronized array of DOM nodes that directly map to the displayed data entries, enabling developers to set event listeners, update UI components individually, control or modify list items dynamically after initialization, and work with the actual elements linked to the current data view or filtered dataset. Use this approach when needing to interact with or manipulate each displayed list element in context of the underlying data source snapshot, facilitating operations such as dynamic updates, analytics on rendered nodes, or integration with other UI behaviors.
</div>

#### Returns

`Array` The currently rendered ListView items (`<div>`, `<li>`, `<tr>` elements, etc., depending on the item template).

#### Example

    <div id="listview"></div>
    <script>
    var dataSource = new kendo.data.DataSource({
        data: [
            { name: "Item 1" },
            { name: "Item 2" },
            { name: "Item 3" }
        ]
    });

    var listview = $("#listview").kendoListView({
        dataSource: dataSource,
        template: "<div class='k-listview-item'>#: name #</div>"
    }).data("kendoListView");

    // Get the DOM elements for all items
    var items = listview.items();
    /* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(items.length); // logs 3
    console.log(items[0]); // logs the first DOM element
    </script>

### refresh

Repaints the ListView using the data available in the DataSource.


<div class="meta-api-description">
Force update, redraw, or repaint a list or collection view to reflect the latest underlying data, trigger rerendering of list items, rebind to current data source, refresh displayed content after model changes or dynamic updates, synchronize UI with updated dataset, reload visible elements without recreating the entire list, manually trigger a visual update to show programmatic or external data modifications, ensure list reflects recent state changes or mutations, and control when the component redraws its item elements based on fresh or modified data.
</div>

#### Example

    <button id="refreshBtn" class="k-button">Refresh</button>
    <div id ="listView"></div>
    <script>
      $("#listView").kendoListView({
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/service/v2/core/Products"
            }
          },
          pageSize: 21
        },
        template: "<div style='margin: 8px'>#:ProductName#</div>"
      });
      $("#refreshBtn").click(function(){
        var listView = $("#listView").data("kendoListView");
        // Change the ProductName of the first item in the data.
        listView.dataSource.data()[0].ProductName = "test";
        // Call the refresh method in order to see the change.
        listView.refresh();
        });
    </script>

### remove

Removes the specified item from the ListView. Triggers [remove](/api/javascript/ui/listview/events/remove) event and if not prevented calls the DataSource [sync](/api/javascript/data/datasource/methods/sync) method.


<div class="meta-api-description">
Remove or delete an item from a list or collection by specifying the target element to be removed, triggering an event to handle custom removal logic or cancellation, controlling whether the change syncs automatically to update underlying data sources or back-end storage, configuring item deletion behavior with optional event interception to prevent automatic persistence, handling removal with event-driven hooks to customize or cancel data synchronization operations after item deletion requests.
</div>

#### Example

    <script type="text/x-kendo-tmpl" id="template">
     <div>
       <dl>
         <dt>Name</dt> <dd>#:name#</dd>
         <dt>Age</dt> <dd>#:age#</dd>
      </dl>
      </div>
    </script>

    <button class="k-button" id="deleteBtn">Remove First Item</button>
    <div id="listView"></div>
    <script>
      $("#listView").kendoListView({
        template: kendo.template($("#template").html()),
        dataSource: {
          data: [
            { id: 1, name: "Jane Doe", age: 47 },
            { id: 2, name: "John Doe", age: 50 }
          ],
          schema: {
            model: {
              id: "id",
              fields: {
                id: { type: "number" },
                name: { type: "string" },
                age: { type: "number" }
              }
            }
          }
        }
      });
      $("#deleteBtn").click(function(){
        // get a reference to the list view widget
        var listView = $("#listView").data("kendoListView");
        // remove first list view item
        listView.remove(listView.content.children().first());
      });
    </script>

#### Parameters

##### item `Object`

jQuery object which represents the item to be removed.

### save

Saves the currently edited ListView item. Triggers the [save](/api/javascript/ui/listview/events/save) event. If the `save` event is not prevented and validation succeeds the ListView will call the DataSource [sync](/api/javascript/data/datasource/methods/sync) method.


<div class="meta-api-description">
Save the current item being edited within a list or table interface, commit inline modifications back to the underlying data store, trigger save operations or events for handling custom save workflows, enable programmatic saving of edits, ensure client-side validation before persisting data changes, control when and how edited content is synchronized with the backend datasource, implement custom save logic or validations during data submission, programmatically finalize user changes, commit user edits from interactive list or grid components, and manage data synchronization operations after editing user interface entries.
</div>

#### Example

     <script type="text/x-kendo-tmpl" id="template">
     <div>
       <dl>
         <dt>Name</dt> <dd>#:name#</dd>
         <dt>Age</dt> <dd>#:age#</dd>
      </dl>
       <div>
           <a class="k-button k-edit-button" href="\\#"><span class="k-icon k-i-edit"></span></a>
      </div>
      </div>
    </script>

    <script type="text/x-kendo-tmpl" id="editTemplate">
     <div>
       <dl>
         <dt>Name</dt>
         <dd><input type="text" data-bind="value:name" name="name" required="required" /></dd>
         <dt>Age</dt>
         <dd><input type="text" data-bind="value:age" data-role="numerictextbox" data-type="number" name="age" required="required" /></dd>
      </dl>
       <div>
          <a class="k-button k-cancel-button" href="\\#">
          	<span class="k-icon k-i-cancel"></span>
      		</a>
      </div>
      </div>
    </script>
    <button class="k-button" id="saveBtn">Save</button>
    <div id="listView"></div>
    <script>
      $("#listView").kendoListView({
        template: kendo.template($("#template").html()),
        editTemplate: kendo.template($("#editTemplate").html()),
        dataSource: {
          data: [
            { id: 1, name: "Jane Doe", age: 47 },
            { id: 2, name: "John Doe", age: 50 }
          ],
          schema: {
            model: {
              id: "id",
              fields: {
                id: { type: "number" },
                name: { type: "string" },
                age: { type: "number" }
              }
            }
          }
        }
      });
      $("#saveBtn").click(function(){
        $("#listView").data("kendoListView").save();
      });
    </script>

### select

Gets/sets the selected ListView item(s).


<div class="meta-api-description">
Retrieve or modify the selected items in a list interface, enabling programmatic access to read current selections or update which entries are chosen, supporting both single and multiple selection modes; use this method to query, change, control, or configure list selection states dynamically from code, handling selection retrieval and updates in list views for diverse user interaction scenarios.
</div>

#### Example

    <button class="k-button" id="selectBtn">Select First Item</button>
    <div id="listView"></div>

    <script type="text/x-kendo-tmpl" id="template">
        <div class="product-view k-widget">
            <dl>
                <dt>Product Name</dt>
                <dd>#:ProductName#</dd>
      </dl>
      </div>
    </script>

    <script>
      var crudServiceBaseUrl = "https://demos.telerik.com/service/v2/core",
          dataSource = new kendo.data.DataSource({
            transport: {
              read:  {
                url: crudServiceBaseUrl + "/Products"
              }
            },
            pageSize: 10
          });

      var listView = $("#listView").kendoListView({
        dataSource: dataSource,
        selectable: "multiple",
        template: kendo.template($("#template").html())
      }).data("kendoListView");

      $("#selectBtn").click(function(){
        // get a reference to the ListView widget
        var listView = $("#listView").data("kendoListView");
        // selects first ListView item
        listView.select(listView.content.children().first());
      });
    </script>

#### Returns

`jQuery` The selected items if called without arguments.

#### Parameters

##### items `jQuery | Array`

Items to select.

### setDataSource

Sets the `dataSource` of an existing ListView and rebinds it.


<div class="meta-api-description">
Update, replace, or refresh the data displayed in a list component by setting a new data source, whether from a data array, data source object, or configuration, triggering the list to re-render with the latest items, apply existing templates, and rebind the UI dynamically. Enable switching between datasets, force refreshes of the list view, reset or update the underlying data model for displayed lists, or reapply data bindings to update item rendering instantly. Control how a list updates when data changes by supplying a fresh dataset or configuration, effectively updating the user interface with new or modified data in real time.
</div>

#### Parameters

##### dataSource `kendo.data.DataSource`

The DataSource to which the widget should be bound.

#### Example - set the data source

    <button class="k-button" id="dsBtn">Change DataSource</button>
    <div id="listView"></div>

    <script>
      $("#listView").kendoListView({
        template: "<div>#: ProductName#</div>",
        dataSource: [
          { ProductName: "Chai" }
        ]
      });
      var dataSource = new kendo.data.DataSource({
        transport: {
          read: {
            url: "https://demos.telerik.com/service/v2/core/Products"
          }
        },
        pageSize: 21
      });
      $("#dsBtn").click(function(){
        var listView = $("#listView").data("kendoListView");
        listView.setDataSource(dataSource);
      });
    </script>

## Events

### cancel

Fired when the user clicks the "cancel" button.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
Detect and respond to user-triggered cancellation actions in list interfaces, capturing events when users click cancel buttons or abort operations, enabling code to intercept, manage, or override default behavior during cancellation. This includes configuring listeners to handle the cancellation event, setting callbacks to execute when a cancel action occurs, controlling or updating the list component’s state upon user abort, and supporting patterns for halting processes, undoing actions, or resetting views when users cancel interactions in list-based UI elements.
</div>

#### Example

    <script type="text/x-kendo-tmpl" id="template">
    <div> #:name# </div>
    </script>

    <script type="text/x-kendo-tmpl" id="editTemplate">
     <div>
       Name: <input type="text" data-bind="value:name" name="name" required="required" />
       <div>
           <a class="k-button k-update-button" href="\\#"><span class="k-icon k-i-check"></span></a>
           <a class="k-button k-cancel-button" href="\\#"><span class="k-icon k-i-cancel"></span></a>
      </div>
      </div>
    </script>

    <div id="listView"></div>
    <script>
      $("#listView").kendoListView({
        template: kendo.template($("#template").html()),
        editTemplate: kendo.template($("#editTemplate").html()),
        dataSource: {
          data: [
            { id: 1, name: "Jane Doe", age: 47 },
            { id: 2, name: "John Doe", age: 50 }
          ],
          schema: {
            model: {
              id: "id",
              fields: {
                id: { type: "number" },
                name: { type: "string" },
                age: { type: "number" }
              }
            }
          }
        },
        cancel: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
					console.log("Cancelled editing of item with id " + e.model.id);
        }
      });
      var listView = $("#listView").data("kendoListView");
      listView.edit(listView.content.children().first());
    </script>

#### To set after initialization

    <script type="text/x-kendo-tmpl" id="template">
    <div> #:name# </div>
    </script>

    <script type="text/x-kendo-tmpl" id="editTemplate">
     <div>
       Name: <input type="text" data-bind="value:name" name="name" required="required" />
       <div>
           <a class="k-button k-update-button" href="\\#"><span class="k-icon k-i-check"></span></a>
           <a class="k-button k-cancel-button" href="\\#"><span class="k-icon k-i-cancel"></span></a>
      </div>
      </div>
    </script>

    <div id="listView"></div>
    <script>
      $("#listView").kendoListView({
        template: kendo.template($("#template").html()),
        editTemplate: kendo.template($("#editTemplate").html()),
        dataSource: {
          data: [
            { id: 1, name: "Jane Doe", age: 47 },
            { id: 2, name: "John Doe", age: 50 }
          ],
          schema: {
            model: {
              id: "id",
              fields: {
                id: { type: "number" },
                name: { type: "string" },
                age: { type: "number" }
              }
            }
          }
        }
      });
      var listView = $("#listView").data("kendoListView");
      // bind to the cancel event
      listView.bind("cancel", function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("Cancelled editing of item with id " + e.model.id);
      });
      listView.edit(listView.content.children().first());
    </script>

#### Event Data

##### e.container `jQuery`

The jQuery object that represents the edit form container element.

##### e.model `kendo.data.Model`

The model to which the current ListView item is bound.

##### e.preventDefault `Function`

If invoked, prevents the cancel action. The item remains in edit mode.

### change

Fires when the ListView selection has changed.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
Detect and respond to selection changes in list views, capturing user interactions when items are selected, deselected, or updated; handle events triggered by modifying the current selection to update interfaces, load additional details, synchronize application state, or trigger side effects; listen for changes in selection states, control selection updates, track user choice modifications, and execute callbacks with access to component methods and properties for dynamic UI updates or data loading based on list item selections.
</div>

#### Example

    <div id="listView"></div>

    <script type="text/x-kendo-tmpl" id="template">
        <div style="padding: 10px">
            #: ProductName#
      </div>
    </script>

    <script>
      var crudServiceBaseUrl = "https://demos.telerik.com/service/v2/core",
          dataSource = new kendo.data.DataSource({
            transport: {
              read:  {
                url: crudServiceBaseUrl + "/Products"
              }
            },
            pageSize: 10
          });

      var listView = $("#listView").kendoListView({
        dataSource: dataSource,
        selectable: "multiple",
        template: kendo.template($("#template").html()),
        change: function(e){
          // get ListView selection
          var selectedItems = e.sender.select();
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log(selectedItems);
        }
      }).data("kendoListView");
    </script>

#### To set after initialization

    <div id="listView"></div>

    <script type="text/x-kendo-tmpl" id="template">
        <div style="padding: 10px">
            #: ProductName#
      </div>
    </script>

    <script>
      var crudServiceBaseUrl = "https://demos.telerik.com/service/v2/core",
          dataSource = new kendo.data.DataSource({
            transport: {
              read:  {
                url: crudServiceBaseUrl + "/Products"
              }
            },
            pageSize: 10
          });

      var listView = $("#listView").kendoListView({
        dataSource: dataSource,
        selectable: "multiple",
        template: kendo.template($("#template").html())
      }).data("kendoListView");

      listView.bind("change", function(e){
        // get ListView selection
        var selectedItems = e.sender.select();
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(selectedItems);
      });
    </script>

### dataBound

Fires when the ListView has received data from the DataSource and it is already rendered.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
Trigger actions or execute code immediately after a list view completes loading, rendering, and receiving data from its data source, enabling detection of when all items are fully displayed; this facilitates running post-render updates, manipulating or refreshing the DOM, attaching additional event listeners, performing layout recalculations, or running custom logic once binding or refresh operations finish, with the event context tied to the list view instance for seamless integration and dynamic UI updates.
</div>

#### Example

    <div id="listView"></div>
    <script>
      $("#listView").kendoListView({
        template: "<div>#: name#</div>",
        dataSource: [
          { name: "John Doe", age: 30 }
        ],
        dataBound: function() {
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log("ListView is bound.");
        }
      });
    </script>

### dataBinding

Fires when the ListView is about to be bound.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
Configure or hook into the event triggered just before data is bound to a list or grid, enabling you to intercept, inspect, modify, or manipulate the dataset or component state right before rendering occurs. This pre-binding hook lets you add custom logic, run validation, transform data collections, or update component properties synchronously before the interface updates, useful for dynamically adjusting content, filtering items, or injecting additional state into list views or repeaters. Developers searching for ways to tap into data lifecycle events, control rendering timing, customize data binding processes, or handle pre-render updates in UI components will find this pre-render event critical for fine-grained data flow control and reactive UI adjustments.
</div>

#### Example

    <div id="listView"></div>
    <script>
      $("#listView").kendoListView({
        template: "<div>#: name#</div>",
        dataSource: [
          { name: "John Doe", age: 30 }
        ],
        dataBinding: function(e) {
          // call e.preventDefault() if you want to cancel binding.
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log("ListView is ready to bind to data");
        }
      });
    </script>

### edit

Fires when the ListView enters edit mode.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
Detect when an item in a list or grid enters editing mode to trigger custom behaviors like validation, updating the user interface, managing input focus, or running logic when editing begins, starts, or an edit UI appears; useful for handling events related to initiating edits, responding to inline or row editing actions, capturing start-edit triggers, or controlling the transition into editable states within list-based components.
</div>

#### Example

    <script type="text/x-kendo-tmpl" id="template">
			<div> #:name#
    	  <div>
			    <button class="edit k-edit-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-icon-button" type="button">
            <span class="k-icon k-svg-icon k-svg-i-pencil k-button-icon" aria-hidden="true"></span>
          </button>
        </div>
      </div>
    </script>

    <script type="text/x-kendo-tmpl" id="editTemplate">
 			<div>Name: <input type="text" data-bind="value:name" name="name" required="required" />
   		  <div>
   			  <button class="update k-update-button" type="button"></button>
      	  <button class="cancel k-cancel-button" type="button"></button>
        </div>
      </div>
    </script>

    <div id="listView"></div>
    <script>
      $("#listView").kendoListView({
        template: kendo.template($("#template").html()),
        editTemplate: kendo.template($("#editTemplate").html()),
        dataSource: {
          data: [
            { id: 1, name: "Jane Doe", age: 47 },
            { id: 2, name: "John Doe", age: 50 }
          ],
          schema: {
            model: {
              id: "id",
              fields: {
                id: { type: "number" },
                name: { type: "string" },
                age: { type: "number" }
              }
            }
          }
        },
        dataBound: function() {
          kendo.ui.icon($(".k-svg-i-pencil"), { icon: 'pencil' });
        }
      });

      var listView = $("#listView").data("kendoListView");
      // bind to the edit event
      listView.bind("edit", function(e) {
        $(".update").kendoButton({
          icon: "check"
        });

        $(".cancel").kendoButton({
          icon: "cancel",
          click: function() {
            setTimeout(function() {
              kendo.ui.icon($(".k-svg-i-pencil"), { icon: 'pencil' });
            });
          }
        });
        /* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("Editing of item with id " + e.model.id);
      });
    </script>

#### To set after initialization

    <script type="text/x-kendo-tmpl" id="template">
			<div> #:name#
    	<div>
			<button class="edit k-edit-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-icon-button" type="button">
         <span class="k-icon k-svg-icon k-svg-i-pencil k-button-icon" aria-hidden="true"></span>
      </button>
      </div>
      </div>
    </script>

    <script type="text/x-kendo-tmpl" id="editTemplate">
 			<div>Name: <input type="text" data-bind="value:name" name="name" required="required" />
   		<div>
   			<button class="update k-update-button" type="button"></button>
      	<button class="cancel k-cancel-button" type="button"></button>
      </div>
      </div>
    </script>

    <div id="listView"></div>
    <script>
      $("#listView").kendoListView({
        template: kendo.template($("#template").html()),
        editTemplate: kendo.template($("#editTemplate").html()),
        dataSource: {
          data: [
            { id: 1, name: "Jane Doe", age: 47 },
            { id: 2, name: "John Doe", age: 50 }
          ],
          schema: {
            model: {
              id: "id",
              fields: {
                id: { type: "number" },
                name: { type: "string" },
                age: { type: "number" }
              }
            }
          }
        },
        dataBound: function() {
          kendo.ui.icon($(".k-svg-i-pencil"), { icon: 'pencil' });
        }
      });

      var listView = $("#listView").data("kendoListView");
      // bind to the edit event
      listView.bind("edit", function(e) {
        $(".update").kendoButton({
          icon: "check"
        });

        $(".cancel").kendoButton({
          icon: "cancel",
          click: function() {
            setTimeout(function() {
              kendo.ui.icon($(".k-svg-i-pencil"), { icon: 'pencil' });
            });
          }
        });
        /* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("Editing of item with id " + e.model.id);
      });
    </script>

#### Event Data

##### e.item `jQuery`

The jQuery element to be edited.

##### e.model `kendo.data.Model`

The model to be edited.

### remove

Fires before the list view item is put in edit mode. If the event is not prevented, the ListView will call the DataSource [sync](/api/javascript/data/datasource/methods/sync) method.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
Handle intercepting and controlling item removal actions before editing begins in a list view by capturing events that enable confirmation dialogs, cancellation of removals, or triggering server-side saves; configure event handlers to prevent default behavior to stop automatic data synchronization or halt the transition into edit mode, allowing control over edit flows, item deletion confirmations, and server updates while accessing component context within the handler for dynamic responses to user interactions or programmatic changes.
</div>

#### Example

    <div id="listview"></div>

    <script type="text/x-kendo-tmpl" id="template">
      <div class="item">
        <p>#: name # || #: age #</p>
          <div class="edit-buttons">
             <a role="button" class="k-button k-button-solid-base k-button-solid k-button-md k-rounded-md k-delete-button" href="\\#">#= kendo.ui.icon({ icon: 'x' }) #</a>
      </div>
      </div>
    </script>

    <script>
      $("#listview").kendoListView({
        dataSource: {
          data:[
            { id: 1, name: "Jane Doe", age: 30},
            { id: 2, name: "John Doe", age: 33}
          ],
          schema: {
            model: { id: "id" }
          }
        },
        template: kendo.template($("#template").html()),
        remove: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log("Item with id "+ e.model.id + " deleted.");
        }
      });
    </script>

#### To set after initialization

    <div id="listview"></div>

    <script type="text/x-kendo-tmpl" id="template">
      <div class="item">
        <p>#: name # || #: age #</p>
          <div class="edit-buttons">
            <a class="k-button k-button-icontext k-delete-button" href="\\#"><span class="k-icon k-i-delete"></span></a>
      </div>
      </div>
    </script>

    <script>
      $("#listview").kendoListView({
        dataSource: {
          data:[
            { id: 1, name: "Jane Doe", age: 30},
            { id: 2, name: "John Doe", age: 33}
          ],
          schema: {
            model: { id: "id" }
          }
        },
        template: kendo.template($("#template").html())
      });

      var listView = $("#listview").data("kendoListView");
      listView.bind("remove", function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("Item with id "+ e.model.id + " deleted.");
      });
    </script>

#### Event Data

##### e.item `jQuery`

The item element to be deleted.

##### e.model `kendo.data.Model`

The model to be deleted.

### save

Fired when a data item is saved.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
Trigger custom actions or handle logic immediately after saving data entries in a list or grid interface, such as updating the user interface, synchronizing application state, executing callbacks, or initiating workflows following data persistence events. Capture and respond to save operations on individual records within list-like components, access component-specific methods and properties during this event, configure event handlers to manage post-save behavior, and integrate data save confirmations or validations seamlessly into your application’s data management flow.
</div>

#### Event Data

##### e.model `kendo.data.Model`

The data item to which the ListView item is bound.

##### e.item `jQuery`

The jQuery object representing the current ListView item.

##### e.sender `kendo.ui.ListView`

The ListView instance which fired the event.

#### Example - subscribe to the "save" event

    <div id="listview"></div>

    <script type="text/x-kendo-tmpl" id="template">
      <div class="item">
        <p>#: name # || #: age #</p>
          <div class="edit-buttons">
            <a class="k-button k-button-icontext k-edit-button" href="\\#"><span class="k-icon k-i-edit"></span></a>
            <a class="k-button k-button-icontext k-delete-button" href="\\#"><span class="k-icon k-i-delete"></span></a>
      </div>
      </div>
    </script>

    <script type="text/x-kendo-tmpl" id="editTemplate">
      <div class="item">
        <div class="edit-buttons">
            <a class="k-button k-button-icontext k-update-button" href="\\#"><span class="k-icon k-i-check"></span></a>
            <a class="k-button k-button-icontext k-cancel-button" href="\\#"><span class="k-icon k-i-cancel"></span></a>
      </div>
        <input type="text" class="k-textbox" data-bind="value:name" name="name" required="required" validationMessage="required" />
        <span data-for="name" class="k-invalid-msg"></span>
        <br />
        <input type="text" data-role="numerictextbox" data-bind="value:age" name="age" required="required" validationMessage="required" />
        <span data-for="age" class="k-invalid-msg"></span>
      </div>
    </script>

    <script>
      $("#listview").kendoListView({
        dataSource: {
          data:[
            { id: 1, name: "Jane Doe", age: 30},
            { id: 2, name: "John Doe", age: 33}
          ],
          schema: {
            model: { id: "id" }
          }
        },
        template: kendo.template($("#template").html()),
        editTemplate: kendo.template($("#editTemplate").html()),
        save: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log("Changes saved.");
        }
      });
    </script>
