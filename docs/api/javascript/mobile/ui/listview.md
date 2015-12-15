---
title: ListView
page_title: Configuration, methods and events of Kendo UI Mobile ListView
description: How to display flat or grouped list of items with Kendo UI Mobile ListView widget and use events to handle button clicks and access dataItem.
---

# kendo.mobile.ui.ListView

Represents the Kendo UI Mobile ListView widget. Inherits from [kendo.mobile.ui.Widget](/api/javascript/mobile/ui/mobilewidget).

## Configuration

### appendOnRefresh `Boolean`*(default: false)*

Used in combination with `pullToRefresh`. If set to `true`, newly loaded data will be appended on top when refreshing. **Notice:** not applicable if ListView is in a virtual mode.

#### Example

    <div data-role="view">
      <ul data-role="listview" data-source="foo" data-pull-to-refresh="true" data-append-on-refresh="true" data-template="foo-template">
      </ul>
    </div>

    <script type="text/x-kendo-template" id="foo-template">
        #: name # - #: modified #
    </script>

    <script>
    var i = 0;

    // datasource below is customized for demo purposes.
    var foo = new kendo.data.DataSource({
      transport: {
        read: function(options) {
          var max = i + 5;
          var data = [];
          for (; i < max; i ++) {
            data.unshift({ name: "record" + i, modified: +new Date() });
          }
          // illustration purposes only
          setTimeout(function() {
              options.success(data);
          }, 1000);

        }
      }
    });

    new kendo.mobile.Application();
    </script>

### autoBind `Boolean`*(default: true)*

Indicates whether the listview will call read on the DataSource initially. If set to false, the listview will be bound after the DataSource instance `fetch` method is called.

#### Example

    <div data-role="view">
      <a data-role="button" data-click="fetchData">Fetch Data</a>
      <ul data-role="listview" data-source="foo" data-auto-bind="false" data-template="foo-template">
      </ul>
    </div>

    <script type="text/x-kendo-template" id="foo-template">
        #: data #
    </script>

    <script>
    var foo = new kendo.data.DataSource({
      data: [ 1, 2, 3, 4, 5]
    });

    function fetchData() {
      foo.fetch();
    }

    new kendo.mobile.Application();
    </script>

### dataSource `kendo.data.DataSource | Object`

Instance of DataSource or the data that the mobile ListView will be bound to.

#### Example

    <div data-role="view">
      <ul data-role="listview" data-source="foo" data-template="foo-template">
      </ul>
    </div>

    <script type="text/x-kendo-template" id="foo-template">
    #: data #
    </script>

    <script>
    var foo = new kendo.data.DataSource({ data: [ 1, 2, 3, 4, 5] });

    new kendo.mobile.Application();
    </script>

### endlessScroll `Boolean`*(default: false)*

If set to `true`, the listview gets the next page of data when the user scrolls near the bottom of the view.

#### Example

    <div data-role="view">
      <ul data-role="listview" data-source="foo" data-endless-scroll="true" data-template="foo-template">
      </ul>
    </div>

    <script type="text/x-kendo-template" id="foo-template">
        #: name # - #: modified #
    </script>

    <script>
    var i = 0, pageSize = 100;

    // datasource below is customized for demo purposes.
    var foo = new kendo.data.DataSource({
      transport: {
        read: function(options) {
          var max = i + pageSize;
          var data = [];
          for (; i < max; i ++) {
            data.push({ name: "record" + i, modified: +new Date() });
          }

          options.success(data);
        }
      },

      pageSize: pageSize,
      serverPaging: true,
      schema: {
        total: function() { return 500; }
      }
    });

    new kendo.mobile.Application();
    </script>

### fixedHeaders `Boolean`*(default: false)*

If set to true, the group headers will persist their position when the user scrolls through the listview.
Applicable only when the type is set to group, or when binding to grouped DataSource.

**Notice:** fixed headers are not supported in virtual mode.

#### Example

    <div data-role="view">
      <ul data-role="listview" data-source="groupedData" data-fixed-headers="true" data-template="my-template" data-header-template="header-template"></ul>
    </div>

    <script type="text/x-kendo-template" id="my-template">
      <h3 class="item-title">#: name #</h3>
      <p class="item-info">#: description #</p>
    </script>

    <script type="text/x-kendo-template" id="header-template">
        #: value #
    </script>

    <script>
    var groupedData = new kendo.data.DataSource({
        data: [
          { name: "Sashimi Salad", description: "Organic greens topped with market fresh sashimi, wasabi soy vinaigrette.",  letter: "S" },
          { name: "Seaweed Salad", description: "A nice seaweed salad.",  letter: "S" },
          { name: "Edamame", description: "Boiled soy beans with salt.",  letter: "E" },
          { name: "Maguro", description: "Tuna pieces.",  letter: "M" },
          { name: "Tekka Maki", description: "Tuna roll with wasabi.",  letter: "T" },
          { name: "California Rolls", description: "Crab sticks, avocado and cucumber.",  letter: "C" }
        ],
        group: { field: "letter" }
    });

    new kendo.mobile.Application();
    </script>

### headerTemplate `String|Function`*(default: "#:value#")*

The header item template (applicable when the type is set to group).

#### Example

    <div data-role="view">
      <ul data-role="listview" data-source="groupedData" data-template="my-template" data-header-template="header-template"></ul>
    </div>

    <script type="text/x-kendo-template" id="my-template">
      <h3 class="item-title">#: name #</h3>
      <p class="item-info">#: description #</p>
    </script>

    <script type="text/x-kendo-template" id="header-template">
        my group - #: value #
    </script>

    <script>
    var groupedData = new kendo.data.DataSource({
      data: [
        { name: "Sashimi Salad", description: "Organic greens topped with market fresh sashimi, wasabi soy vinaigrette.",  letter: "S" },
        { name: "Seaweed Salad", description: "A nice seaweed salad.",  letter: "S" },
        { name: "Edamame", description: "Boiled soy beans with salt.",  letter: "E" },
        { name: "Maguro", description: "Tuna pieces.",  letter: "M" },
        { name: "Tekka Maki", description: "Tuna roll with wasabi.",  letter: "T" },
        { name: "California Rolls", description: "Crab sticks, avocado and cucumber.",  letter: "C" }
      ],
      group: { field: "letter" }
    });

    new kendo.mobile.Application();
    </script>

### loadMore `Boolean`*(default: false)*

If set to `true`, a button is rendered at the bottom of the listview. Tapping it fetches and displays the items from the next page of the DataSource.

#### Example

    <div data-role="view">
      <ul data-role="listview" data-source="foo" data-load-more="true" data-template="foo-template">
      </ul>
    </div>

    <script type="text/x-kendo-template" id="foo-template">
        #: name # - #: modified #
    </script>

    <script>
    var i = 0, pageSize = 100;

    // datasource below is customized for demo purposes.
    var foo = new kendo.data.DataSource({
      transport: {
        read: function(options) {
          var max = i + pageSize;
          var data = [];
          for (; i < max; i ++) {
            data.push({ name: "record" + i, modified: +new Date() });
          }

          options.success(data);
        }
      },

      pageSize: pageSize,
      serverPaging: true,
      schema: {
        total: function() { return 500; }
      }
    });

    new kendo.mobile.Application();
    </script>

### messages `Object`

Defines the text of the ListView messages. Used primary for localization.

### messages.loadMoreText `String`*(default: "Press to load more")*

The text of the rendered load-more button (applies only if `loadMore` is set to `true`).

#### Example

    <div data-role="view">
      <ul data-role="listview" data-source="foo" data-load-more="true" data-messages='{ "loadMoreText": "Show more" }' data-template="foo-template">
      </ul>
    </div>

    <script type="text/x-kendo-template" id="foo-template">
        #: name # - #: modified #
    </script>

    <script>
    var i = 0, pageSize = 100;

    // datasource below is customized for demo purposes.
    var foo = new kendo.data.DataSource({
      transport: {
        read: function(options) {
          var max = i + pageSize;
          var data = [];
          for (; i < max; i ++) {
            data.push({ name: "record" + i, modified: +new Date() });
          }

          options.success(data);
        }
      },

      pageSize: pageSize,
      serverPaging: true,
      schema: {
        total: function() { return 500; }
      }
    });

    new kendo.mobile.Application();
    </script>

### messages.pullTemplate `String` *(default: "Pull to refresh")*

Text that appears when scroller is pulled (applies only if `pullToRefresh` is set to `true`).

#### Example

    <div data-role="view">
      <ul data-role="listview" data-source="foo" data-pull-to-refresh="true" data-messages='{ "pullTemplate": "Pull to refresh!" }' data-template="foo-template">
      </ul>
    </div>

    <script type="text/x-kendo-template" id="foo-template">
        #: name # - #: modified #
    </script>

    <script>
    var i = 0, pageSize = 100;

    // datasource below is customized for demo purposes.
    var foo = new kendo.data.DataSource({
      transport: {
        read: function(options) {
          var max = i + pageSize;
          var data = [];
          for (; i < max; i ++) {
            data.push({ name: "record" + i, modified: +new Date() });
          }

          options.success(data);
        }
      },

      pageSize: pageSize,
      serverPaging: true,
      schema: {
        total: function() { return 500; }
      }
    });

    new kendo.mobile.Application();
    </script>

### messages.refreshTemplate `String`*(default: "Refreshing")*

Text that appears when ListView is refreshing (applies only if `pullToRefresh` is set to `true`).

#### Example

    <div data-role="view">
      <ul data-role="listview" data-source="foo" data-pull-to-refresh="true" data-messages='{ "refreshTemplate": "Refreshing!" }' data-template="foo-template">
      </ul>
    </div>

    <script type="text/x-kendo-template" id="foo-template">
        #: name # - #: modified #
    </script>

    <script>
    var i = 0, pageSize = 100;

    // datasource below is customized for demo purposes.
    var foo = new kendo.data.DataSource({
      transport: {
        read: function(options) {
          var max = i + pageSize;
          var data = [];
          for (; i < max; i ++) {
            data.push({ name: "record" + i, modified: +new Date() });
          }

          options.success(data);
        }
      },

      pageSize: pageSize,
      serverPaging: true,
      schema: {
        total: function() { return 500; }
      }
    });

    new kendo.mobile.Application();
    </script>

### messages.releaseTemplate `String` *(default: "Release to refresh")*

Text that appears when scroller is pulled beyound the threshold (applies only if `pullToRefresh` is set to `true`).

#### Example

    <div data-role="view">
      <ul data-role="listview" data-source="foo" data-pull-to-refresh="true" data-messages='{ "releaseTemplate": "Release to refresh!" }' data-template="foo-template">
      </ul>
    </div>

    <script type="text/x-kendo-template" id="foo-template">
        #: name # - #: modified #
    </script>

    <script>
    var i = 0, pageSize = 100;

    // datasource below is customized for demo purposes.
    var foo = new kendo.data.DataSource({
      transport: {
        read: function(options) {
          var max = i + pageSize;
          var data = [];
          for (; i < max; i ++) {
            data.push({ name: "record" + i, modified: +new Date() });
          }

          options.success(data);
        }
      },

      pageSize: pageSize,
      serverPaging: true,
      schema: {
        total: function() { return 500; }
      }
    });

    new kendo.mobile.Application();
    </script>

### pullToRefresh `Boolean`*(default: false)*

If set to true, the listview will reload its data when the user pulls the view over the top limit.

> Pull to refresh option is not compatible with native scrolling containers (view with `use-native-scrolling=true` or scroller with `use-native=true` attributes).

#### Example

    <div data-role="view">
      <ul data-role="listview" data-source="foo" data-pull-to-refresh="true" data-template="foo-template"></ul>
    </div>


    <script type="text/x-kendo-template" id="foo-template">
        #: name # - #: modified #
    </script>

    <script>
    var i = 0;

    // datasource below is customized for demo purposes.
    var foo = new kendo.data.DataSource({
      transport: {
        read: function(options) {
          var max = i + 5;
          var data = [];
          for (; i < max; i ++) {
            data.unshift({ name: "record" + i, modified: +new Date() });
          }
                                options.success(data);


        }
      }
    });

    new kendo.mobile.Application();
    </script>

### pullParameters `Function`

A callback function used when the 'pullToRefresh' option is enabled. The result of the function will be send as additional parameters to the DataSource's `next` method.

**Notice:** When the listview is in a *virtual mode*, the pull to refresh action **removes** the previously loaded items in the listview (instead of appending new records at the top).
Previously loaded pages in the DataSource are also discarded.

#### Example

    <div data-role="view" data-init="initListView">
      <ul id="listview">
      </ul>
    </div>

    <script>
    var i = 0;

    // datasource below is customized for demo purposes.
    var foo = new kendo.data.DataSource({
      transport: {
        read: function(options) {
          console.log(options.data.since_id); // undefined in the first request
          var max = i + 5;
          var data = [];
          for (; i < max; i ++) {
            data.unshift({ name: "record" + i, modified: +new Date() });
          }
          options.success(data);
        }
      }
    });

    function initListView(e) {
      $("#listview").kendoMobileListView({
        dataSource: foo,
        pullToRefresh: true,
        template: "#: name # - #: modified #",
        pullParameters: function(item) {
          console.log(item); // the last item currently displayed
          return { since_id: item.name };
        }
      });

    }

    new kendo.mobile.Application();
    </script>

#### Parameters

##### item `Object`

First dataItem of the ListView // => listView.dataSource.get(0);

### style `String` *(default: "")*

The style of the widget. Can be either empty string(""), or `inset`.

#### Example

    <div data-role="view">
      <ul data-role="listview" data-style="inset">
        <li>Foo</li>
        <li>Bar</li>
      </ul>
    </div>

    <script>

    new kendo.mobile.Application();
    </script>

### template `String|Function`*(default: "#:data#")*

The item template.

#### Example:

    <div id="foo" data-role="view">
        <ul id="list" data-role="listview" data-source="dataSource" data-template="tmp"></ul>
    </div>

    <script id="tmp" type="text/x-kendo-template">
        <p>#: name # <span>Age: #: age #</span></p>
    </script>

    <script>
    var app = new kendo.mobile.Application();
    var dataSource = new kendo.data.DataSource({
        data: [
            { name: "Jane Doe", age: 30 },
            { name: "John Doe", age: 33 }
        ]
    });
    </script>

> The ListView automatically wraps the template content in `<li>` tag. Putting a `<li>` tag inside the template creates invalid nesting of elements.

### type `String` *(default: "flat")*

The type of the control. Can be either `flat` (default) or group. Determined automatically in databound mode.

#### Example

    <div data-role="view">

      <ul data-role="listview" data-style="inset" data-type="group">
        <li>Foo
          <ul>
            <li>Foo 1</li>
            <li>Foo 2</li>
          </ul>
        </li>
        <li>Bar
          <ul>
            <li>Bar 1</li>
            <li>Bar 2</li>
          </ul>
        </li>
      </ul>

    </div>

    <script>
    new kendo.mobile.Application();
    </script>


### filterable `Boolean | Object`*(default: false)*

Indicates whether the filter input must be visible or not.

> **Important:** When the filter is applied it will remove all previous filter expressions applied to the DataSource.

#### Example - enabled filtering

    <div data-role="view" data-init="viewInit">
        <ul id="listView"></ul>
    </div>
    <script>
    function viewInit(e) {
        e.view.element.find("#listView").kendoMobileListView({
            dataSource: [ "foo", "bar" ],
            filterable: true
        });
    }

    new kendo.mobile.Application();
    </script>

### filterable.placeholder `String`*(default: "Search...")*

Placeholder text for search input.

#### Example - enabled filtering with custom text for the input placeholder

    <div data-role="view" data-init="viewInit">
        <ul id="listView"></ul>
    </div>
    <script>
    function viewInit(e) {
        e.view.element.find("#listView").kendoMobileListView({
            dataSource: [ "foo", "bar" ],
            filterable: {
                placeholder: "Type to search..."
            }
        });
    }

    new kendo.mobile.Application();
    </script>

### filterable.autoFilter `Boolean`*(default: true)*

Indicates whether filtering should be performed on every key up event or when the focus is moved out of the filter input.

#### Example - enabled filtering with auto filtering disabled

    <div data-role="view" data-init="viewInit">
        <ul id="listView"></ul>
    </div>
    <script>
    function viewInit(e) {
        e.view.element.find("#listView").kendoMobileListView({
            dataSource: [ "foo", "bar" ],
            filterable: {
                autoFilter: false
            }
        });
    }

    new kendo.mobile.Application();
    </script>

### filterable.field `String`

Specifies the field which will be used in the filter expression. The default field value is `undefined` which is usefull when the list view is bound to a list of primitive types.
If this is not case the field *must* be defined.

#### Example - enabled filtering with default field configuration

    <div data-role="view" data-init="viewInit">
        <ul id="listView"></ul>
    </div>
    <script>
    function viewInit(e) {
        e.view.element.find("#listView").kendoMobileListView({
            dataSource: [ "foo", "bar" ],
            filterable:  true
        });
    }

    new kendo.mobile.Application();
    </script>

#### Example - enabled filtering with field defined

    <div data-role="view" data-init="viewInit">
        <ul id="listView"></ul>
    </div>
    <script>
    function viewInit(e) {
        e.view.element.find("#listView").kendoMobileListView({
            dataSource: [
                { id: 1, text: "foo" },
                { id: 2, text: "bar" }
            ],
            template: "id: #: id# with text: #: text#",
            filterable: {
                field: "text" //filtering for "text" field
            }
        });
    }

    new kendo.mobile.Application();
    </script>

### filterable.ignoreCase `Boolean`*(default: false)*

Specifies whether the filter expression must be case sensitive or not.

#### Example - enabled case insensitive filtering

    <div data-role="view" data-init="viewInit">
        <ul id="listView"></ul>
    </div>
    <script>
    function viewInit(e) {
        e.view.element.find("#listView").kendoMobileListView({
            dataSource: [ "Foo", "bar" ],
            filterable: {
                ignoreCase: true // search for "foo" or "Foo" will return same item
            }
        });
    }

    new kendo.mobile.Application();
    </script>

### filterable.operator `String`*(default: "startsWith")*

Specifies the comparison operator used in the filter expression. The operator must be one of the available DataSource filter [operators](/api/framework/datasource#configuration-filter.operator).

#### Example - enabled filtering with comparison operator defined

    <div data-role="view" data-init="viewInit">
        <ul id="listView"></ul>
    </div>
    <script>
    function viewInit(e) {
        e.view.element.find("#listView").kendoMobileListView({
            dataSource: [ "foo", "bar" ],
            filterable: {
                operator: "eq" // match the whole word
            }
        });
    }

    new kendo.mobile.Application();
    </script>

### virtualViewSize `Number`

 Used when virtualization of local data is used. This configuration is needed to determine the items displayed, since the datasource does not (and should not) have paging set.

#### Example - virtualization using local data

    <script src="../content/shared/js/products.js"></script>
    <div data-role="view" data-init="mobileListViewLocalFiltering" data-title="Products">
      <ul id="local-filterable-listview"></ul>
    </div>

    <script type="text/x-kendo-tmpl" id="mobile-listview-filtering-template">
        <h3>#:ProductName#</h3>
    </script>

    <script>
      function mobileListViewLocalFiltering() {
        var dataSource = new kendo.data.DataSource({
          data: products,
          schema: {
            model: {
              fields: {
                ProductName: { type: "string" },
                UnitPrice: { type: "number" },
                UnitsInStock: { type: "number" },
                Discontinued: { type: "boolean" }
              }
            }
          }
        });

        $("#local-filterable-listview").kendoMobileListView({
          dataSource: dataSource,
          template: $("#mobile-listview-filtering-template").text(),
          filterable: {
            field: "ProductName",
            operator: "startswith"
          },
          virtualViewSize: 100, // this configuration is needed to determine the items displayed, since the datasource does not (and should not) have paging set.
          endlessScroll: true
        });
      }
    </script>
    <script>
      var app = new kendo.mobile.Application(document.body);
    </script>

## Methods

### append

Appends new items generated by rendering the given data items with the listview template to the bottom of the listview.

#### Parameters

##### dataItems `Array`

#### Example

    <div data-role="view">
        <a data-role="button" data-click="addItem">Add item</a>
        <ul id="listview" data-role="listview" data-template="foo">
        </ul>
    </div>

    <script type="text/x-kendo-template" id="foo">
    Item #: idx #
    </script>

    <script>
    var i = 0;
    function addItem() {
      i ++;
      $("#listview").data("kendoMobileListView").append([ { idx: i } ]);
    }

    new kendo.mobile.Application();
    </script>

### prepend

Prepends new items generated by rendering the given data items with the listview template to the top of the listview.

#### Parameters

##### dataItems `Array`

#### Example

    <div data-role="view">
        <a data-role="button" data-click="addItem">Add item</a>
        <ul id="listview" data-role="listview" data-template="foo">
        </ul>
    </div>

    <script type="text/x-kendo-template" id="foo">
    Item #: idx #
    </script>

    <script>
    var i = 0;
    function addItem() {
      i ++;
      $("#listview").data("kendoMobileListView").prepend([ { idx: i } ]);
    }

    new kendo.mobile.Application();
    </script>

### replace

Replaces the contents of the listview with the passed rendered data items.

#### Parameters

##### dataItems `Array`

#### Example

    <div data-role="view">
        <a data-role="button" data-click="replaceItem">Replace item</a>
        <ul id="listview" data-role="listview" data-template="foo">
        </ul>
    </div>

    <script type="text/x-kendo-template" id="foo">
    Item #: idx #
    </script>

    <script>
    var i = 0;
    function replaceItem() {
      i ++;
      $("#listview").data("kendoMobileListView").replace([ { idx: i } ]);
    }

    new kendo.mobile.Application();
    </script>

### remove

Removes the listview items which are rendered with the passed data items.

#### Parameters

##### dataItems `Array`

#### Example

    <div data-role="view">
        <a data-role="button" data-click="removeItem">Remove item</a>
        <ul id="listview" data-role="listview" data-template="foo" data-source="fooDS">
        </ul>
    </div>

    <script type="text/x-kendo-template" id="foo">
      Item #: name #
    </script>

    <script>
    var fooDS = new kendo.data.DataSource({ data: [ {name: "Foo"}, {name: "Bar"} ] });

    function removeItem() {
      $("#listview").data("kendoMobileListView").remove([ fooDS.data()[1] ]);
    }


    new kendo.mobile.Application();
    </script>

### setDataItem

Re-renders the given listview item with the new dataItem provided. In order for the method to work as expected, the data items should be of type kendo.data.Model.

#### Parameters

##### item `jQuery`

The listview item to update

##### dataItem `kendo.data.Model`

The new dataItem

#### Example

    <div data-role="view" data-init="initialItem">
        <a data-role="button" data-click="changeItem">Add item</a>
        <ul id="listview" data-role="listview" data-template="foo">
        </ul>
    </div>

    <script type="text/x-kendo-template" id="foo">
    Item #: idx #
    </script>

    <script>
    var dataItem = new kendo.data.Model({ idx: 1 });

    function initialItem() {
      $("#listview").data("kendoMobileListView").append([dataItem]);
    }

    function changeItem() {
      var newItem = new kendo.data.Model({idx: 2});
      $("#listview").data("kendoMobileListView").setDataItem($("#listview li").eq(0), newItem);
    }

    new kendo.mobile.Application();
    </script>

### destroy

Prepares the **ListView** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the ListView element from DOM.

#### Example

    <div data-role="view">
       <a data-role="button" data-click="destroyListView">Destroy</a>

      <ul id="listView" data-role="listview" data-style="inset">
        <li>Foo</li>
        <li>Bar</li>
      </ul>
    </div>

    <script>
    function destroyListView() {
        var listView = $("#listView").data("kendoMobileListView");
        // detach events
        listView.destroy();
    }

    new kendo.mobile.Application();
    </script>

### items

Get the listview DOM element items

#### Returns

`jQuery` The listview DOM element items

#### Example


    <div data-role="view">
      <a data-role="button" data-click="getListViewItems">Get items</a>
      <ul id="listView" data-role="listview" data-style="inset">
        <li>Foo</li>
        <li>Bar</li>
      </ul>
    </div>

    <script>
    function getListViewItems() {
        console.log($("#listView").data("kendoMobileListView").items());
    }

    new kendo.mobile.Application();
    </script>

### refresh

Repaints the listview (works only in databound mode).

#### example

    <div data-role="view">
      <a data-role="button" data-click="refreshListViewItems">Refresh items</a>
      <ul id="listView" data-role="listview" data-style="inset">
        <li>Foo</li>
        <li>Bar</li>
      </ul>
    </div>

    <script>
    function refreshListViewItems() {
      $("#listView").data("kendoMobileListView").refresh()
    }

    new kendo.mobile.Application();
    </script>

### setDataSource

Sets the DataSource of an existing ListView and rebinds it.

#### Parameters

##### dataSource `kendo.data.DataSource`

#### Example

    <div data-role="view">
      <a data-role="button" data-click="rebindListView">Rebind</a>
      <ul id="listView" data-role="listview" data-template="foo-template" data-source="foo" data-style="inset">
      </ul>
    </div>

    <script id="foo-template">
        #: name #
    </script>

    <script>
    var foo = new kendo.data.DataSource({ data: [ { name: "foo" } ] });
    var bar = new kendo.data.DataSource({ data: [ { name: "bar" } ] });

    function rebindListView() {
        $("#listView").data("kendoMobileListView").setDataSource(bar);
    }

    new kendo.mobile.Application();
    </script>

## Events

### click

Fires when item is tapped.

#### Example

    <div data-role="view">
    <ul data-role="listview" id="foo" data-click="listViewClick">
        <li>Item 1</li>
		<li>Item 2</li>
    </ul>
    </div>

    <script>
    function listViewClick(e) {
        console.log(e.item); // The clicked item as a jQuery object
    }

    new kendo.mobile.Application();
    </script>

#### Accessing dataItem in event

    <div data-role="view">
        <ul id="foo"></ul>
    </div>

    <script>
    $("#foo").kendoMobileListView({
       dataSource: new kendo.data.DataSource({
            data: [{title: "foo"}, {title: "bar"}]
       }),

       click: function(e) {
            console.log(e.dataItem.title);
       }
    });

    new kendo.mobile.Application();
    </script>

#### Event Data

##### e.item `jQuery`

The selected list item.

##### e.target `jQuery`

The tapped DOM element.

##### e.dataItem `Object`

The corresponding dataItem associated with the item (available in databound mode only).
Note: The dataItem must be from a non-primitive type (Object).

##### e.button `kendo.mobile.ui.Button`

The tapped Kendo mobile Button (if present).

### dataBound

Fires when the ListView has received data from the DataSource.

#### Example

    <div data-role="view">
        <ul id="foo"></ul>
    </div>

    <script>
    $("#foo").kendoMobileListView({
       dataSource: new kendo.data.DataSource({
            data: [{title: "foo"}, {title: "bar"}]
       }),

      dataBound: function(e) {
        console.log(e);
      }
    });

    new kendo.mobile.Application();
    </script>

### dataBinding

Fires when the ListView is about to be rendered.

#### Example

    <div data-role="view">
        <ul id="foo"></ul>
    </div>

    <script>
    $("#foo").kendoMobileListView({
       dataSource: new kendo.data.DataSource({
            data: [{title: "foo"}, {title: "bar"}]
       }),

      dataBinding: function(e) {
        console.log(e);
      }
    });

    new kendo.mobile.Application();
    </script>

### itemChange

Fires when a new item is added to the listview (usually in virtual mode).

#### Example

    <div data-role="view">
      <ul data-role="listview" data-source="foo" data-endless-scroll="true" data-template="foo-template" data-item-change="itemChange">
      </ul>
    </div>

    <script type="text/x-kendo-template" id="foo-template">
        #: name # - #: modified #
    </script>

    <script>
    var i = 0, pageSize = 100;

    // datasource below is customized for demo purposes.
    var foo = new kendo.data.DataSource({
      transport: {
        read: function(options) {
          var max = i + pageSize;
          var data = [];
          for (; i < max; i ++) {
            data.push({ name: "record" + i, modified: +new Date() });
          }

          options.success(data);
        }
      },

      pageSize: pageSize,
      serverPaging: true,
      schema: {
        total: function() { return 500; }
      }
    });

      function itemChange(e) {
        console.log(e);
      }

    new kendo.mobile.Application();
    </script>
