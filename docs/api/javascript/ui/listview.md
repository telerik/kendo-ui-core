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

### autoBind `Boolean` *(default: true)*

If set to `false` the widget will not bind to the data source during initialization. In this case data binding will occur when the [change](/api/javascript/data/datasource/events/change) event of the
data source is fired. By default the widget will bind to the data source specified in the configuration.

> Setting `autoBind` to `false` is useful when multiple widgets are bound to the same data source. Disabling automatic binding ensures that the shared data source does not make more than one request to the remote service.

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

### borders `String` *(default: '')*

Renders border around the listview items. Valid values are:

* `all`: renders borders around listview items.
* `horizontal`: renders top border of listview items. Useful when setting `layout: "flex"` and `flex.direction: column`.
* `vertical`: renders top border of listview items. Useful when setting `layout: "flex"` and `flex.direction: row`.

> Note: in order for the property to work, set `k-listview-item` class name to listview items in your template.

### contentElement `String` *(default: 'div')*

Defines the type of element that holds the listview content.

### dataSource `Object|Array|kendo.data.DataSource`

The data source of the widget which is used render table rows. Can be a JavaScript object which represents a valid [kendo.data.DataSource](/api/javascript/data/datasource) configuration, a JavaScript array or an existing [kendo.data.DataSource](/api/javascript/data/datasource)
instance.

If the `dataSource` option is set to a JavaScript object or array the widget will initialize a new [kendo.data.DataSource](/api/javascript/data/datasource) instance using that value as data source configuration.

If the `dataSource` option is an existing [kendo.data.DataSource](/api/javascript/data/datasource) instance the widget will use that instance and will **not** initialize a new one.

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

> Note: Flex and grid layout are supporteed only on modern browsers. Even so, not all browsers that support flex and grid layout, support all features.

#### Example of ListView with flex layout

    <script src="https://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>

    <div id="listView"></div>
    <div id="pager" class="k-pager-wrap"></div>

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

### flex.direction `String` *(default: 'row')*

Defines the direction flex items are placed in the flex container. Think of flex items as primarily laying out either in horizontal rows or vertical columns. Valid values are:

* `row`: This is equivalent to `flex-direction: row`. This establishes the main-axis to be horizontal, thus defining the direction flex items are placed in the flex container: left to right in `ltr`; right to left in `rtl`.
* `row-reverse`: This is equivalent to `flex-direction: row-reverse`. This establishes the main-axis to be horizontal, thus defining the direction flex items are placed in the flex container: right to left in `ltr`; left to right in `rtl`.
* `column`: This is equivalent to `flex-direction: column`. This establishes the main-axis to be vertical, thus defining the direction flex items are placed in the flex container: top to bottom.
* `column-reverse`: This is equivalent to `flex-direction: column-reverse`. This establishes the main-axis to be vertical, thus defining the direction flex items are placed in the flex container: bottom to top.

#### Example of ListView with flex column layout

    <script src="https://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>

    <div id="listView"></div>
    <div id="pager" class="k-pager-wrap"></div>

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

#### Example of ListView with wrapped flex layout

    <script src="https://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>

    <div id="listView"></div>
    <div id="pager" class="k-pager-wrap"></div>

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

#### Example of ListView with grid layout

    <script src="https://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>

    <div id="listView"></div>
    <div id="pager" class="k-pager-wrap"></div>

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

#### Example of the cols setting of the grid layout

    <script src="https://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>

    <div id="listView"></div>
    <div id="pager" class="k-pager-wrap"></div>

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

#### Example of the rows setting of the grid layout

    <script src="https://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>

    <div id="listView"></div>
    <div id="pager" class="k-pager-wrap"></div>

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

#### Example of the gutter setting of the grid layout

    <script src="https://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>

    <div id="listView"></div>
    <div id="pager" class="k-pager-wrap"></div>

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

### scrollable `Boolean|String` *(default: false)*

If set to `true` the listview will display a scrollbar when the content exceeds the listview [height](/api/javascript/ui/listview/configuration/height) value. By default scrolling is disabled.

It could be also set to `endless` in order to enable the endless scrolling functionality. In endless scrolling mode the [height](/api/javascript/ui/listview/configuration/height) should be configured to display a scrollbar. Scrolling to the end of the scrollbar will load more items (equal to the pageSize number) and append them to the listview DOM element utill all items are loaded and displayed.

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

### navigatable `Boolean` *(default: false)*

 Indicates whether keyboard navigation is enabled/disabled.

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
          var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service",
              dataSource = new kendo.data.DataSource({
                transport: {
                  read:  {
                    url: crudServiceBaseUrl + "/Products",
                    dataType: "jsonp"
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
          var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service",
              dataSource = new kendo.data.DataSource({
                transport: {
                  read:  {
                    url: crudServiceBaseUrl + "/Products",
                    dataType: "jsonp"
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

## Methods

### add

Inserts an empty item as a first item in the ListView and puts it in edit mode.

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
      var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service",
          dataSource = new kendo.data.DataSource({
            transport: {
              read:  {
                url: crudServiceBaseUrl + "/Products",
                dataType: "jsonp"
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

#### Parameters

##### row `String|Element|jQuery`

A string, DOM element or jQuery object which represents the ListView item. A string is treated as a jQuery selector.

#### Returns

`kendo.data.ObservableObject` The data item to which the specified ListView item is bound. More information about the ObservableObject type in [kendo.data.ObservableObject](/api/javascript/data/observableobject).

#### Example - get the data item to which the first ListView item is bound

    <div id ="listView"></div>
    <script>
      var dataSource = new kendo.data.DataSource({
        data: [ { name: "Jane Doe" }, { name: "John Doe" }]
      });
      var listview = $("#listView").kendoListView({
        dataSource: dataSource,
        template: "<div>#:name#</div>"
      }).data("kendoListView")

      var row = $('#listView > div').first();
      console.log(listview.dataItem(row));
    </script>

### dataItems

Returns the array of data items that the widget is bound to.

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
      console.log(listview.dataItems()) //will output the bound array
    </script>

### destroy

Prepares the **ListView** for safe removal from DOM. Detaches all event handlers and removes `jQuery.data` attributes to avoid memory leaks. Calls `destroy` method of any child Kendo widgets.

> **Important:** This method does not remove the ListView element from DOM.

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

#### Returns

`Array` The currently rendered ListView items (`<div>`, `<li>`, `<tr>` elements, etc., depending on the item template).

### refresh

Repaints the ListView using the data available in the DataSource.

#### Example

    <button id="refreshBtn" class="k-button">Refresh</button>
    <div id ="listView"></div>
    <script>
      $("#listView").kendoListView({
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/kendo-ui/service/Products",
              dataType: "jsonp"
            }
          },
          pageSize: 21
        },
        template: "<div style='margin: 8px'>#:ProductName#</div>"
      });
      $("#refreshBtn").click(function(){
        var listView = $("#listView").data("kendoListView");
        // refreshes the ListView
        listView.refresh();
      });
    </script>

### remove

Removes the specified item from the ListView. Triggers [remove](/api/javascript/ui/listview/events/remove) event and if not prevented calls the DataSource [sync](/api/javascript/data/datasource/methods/sync) method.

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
      var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service",
          dataSource = new kendo.data.DataSource({
            transport: {
              read:  {
                url: crudServiceBaseUrl + "/Products",
                dataType: "jsonp"
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
            url: "https://demos.telerik.com/kendo-ui/service/Products",
            dataType: "jsonp"
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

#### Example

    <div id="listView"></div>

    <script type="text/x-kendo-tmpl" id="template">
        <div style="padding: 10px">
            #: ProductName#
      </div>
    </script>

    <script>
      var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service",
          dataSource = new kendo.data.DataSource({
            transport: {
              read:  {
                url: crudServiceBaseUrl + "/Products",
                dataType: "jsonp"
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
      var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service",
          dataSource = new kendo.data.DataSource({
            transport: {
              read:  {
                url: crudServiceBaseUrl + "/Products",
                dataType: "jsonp"
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
        console.log(selectedItems);
      });
    </script>

### dataBound

Fires when the ListView has received data from the DataSource and it is already rendered.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Example

    <div id="listView"></div>
    <script>
      $("#listView").kendoListView({
        template: "<div>#: name#</div>",
        dataSource: [
          { name: "John Doe", age: 30 }
        ],
        dataBound: function() {
          console.log("ListView is bound and ready to render.");
        }
      });
    </script>

### dataBinding

Fires when the ListView is about to be bound.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

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
          console.log("ListView is ready to bind to data");
        }
      });
    </script>

### edit

Fires when the ListView enters edit mode.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Example

    <script type="text/x-kendo-tmpl" id="template">
    <div> #:name#
      	<div>
           <a class="k-button k-edit-button" href="\\#"><span class="k-icon k-i-edit"></span></a>
      </div>
      </div>
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
        edit: function(e) {
          console.log("Editing of item with id " + e.model.id);
        }
      });
    </script>

#### To set after initialization

    <script type="text/x-kendo-tmpl" id="template">
    <div> #:name#
      	<div>
           <a class="k-button k-edit-button" href="\\#"><span class="k-icon k-i-edit"></span></a>
      	</div>
      </div>
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
      // bind to the edit event
      listView.bind("edit", function(e) {
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

#### Example

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
        template: kendo.template($("#template").html()),
        remove: function(e) {
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
          console.log("Changes saved.");
        }
      });
    </script>
