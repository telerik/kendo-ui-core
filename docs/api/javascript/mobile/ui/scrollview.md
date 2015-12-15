---
title: ScrollView
page_title: Configuration, methods and events of Kendo UI Mobile ScrollView
description: You will learn how to configure Mobile ScrollView widget, update the scrollview HTML content and scroll to a given page by using methods.
---

# kendo.mobile.ui.ScrollView

Represents the Kendo UI Mobile ScrollView widget. Inherits from [kendo.mobile.ui.Widget](/api/javascript/mobile/ui/mobilewidget).

## Configuration

### autoBind `Boolean`*(default: true)*

If set to `false` the widget will not bind to the DataSource during initialization. In this case data binding will occur when the change event of the data source is fired. By default the widget will bind to the DataSource specified in the configuration.

**Applicable only in data bound mode.**

#### Example
    <div data-role="view" data-stretch="true">
      <div data-role="scrollview"
        data-auto-bind="false"
        data-source="dataSource"
        data-template="scrollview-template"
        data-content-height="120px"
        data-enable-pager="false">
      </div>
    </div>

    <script id="scrollview-template" type="text/x-kendo-template">
      <div style="width: 110px; height: 110px; background-image: #=setBackground(ProductID)#;"></div>
      <p>#= ProductName #</p>
    </script>

    <script>
    var app = new kendo.mobile.Application();

    var dataSource = new kendo.data.DataSource({
      type: "odata",
      transport: {
        read: {
          url: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
        }
      },
      serverPaging: true,
      pageSize: 30
    });

    function setBackground(id) {
      return "url(http://demos.telerik.com/kendo-ui/content/web/foods/" + id +".jpg)";
    }
    </script>

### bounceVelocityThreshold `Number`*(default: 1.6)*

The velocity threshold after which a swipe will result in a bounce effect.

#### Example - increase bounce velocity threshold

    <div data-role="view" data-stretch="true">
      <div id="scrollView" data-role="scrollview" data-bounce-velocity-threshold="5">
        <div data-role="page"><div style="height: 200px;">Foo</div></div>
        <div data-role="page"><div style="height: 200px;">Bar</div></div>
      </div>
    </div>

    <script>
    var app = new kendo.mobile.Application();
    </script>

### contentHeight `Number|String`*(default: "auto")*

The height of the ScrollView content. Supports `100%` if the ScrollView is embedded in a stretched view and the ScrollView element **is an immediate child** of the view element.

#### Stretched ScrollView

    <div data-role="view" data-stretch="true">
      <div data-role="scrollview" data-content-height="100%">
        <div data-role="page">This page will stretch to fit the entire view height</div>
        <div data-role="page">This page will stretch to fit the entire view height</div>
        <div data-role="page">This page will stretch to fit the entire view height</div>
      </div>
    </div>

    <script>
    var app = new kendo.mobile.Application();
    </script>

### dataSource `kendo.data.DataSource | Object`

Instance of DataSource that the mobile ScrollView will be bound to. *If DataSource is set, the widget will operate in data bound mode.*

> **Important:** In case the total amount of displayed data is large, it is recommended to turn off the pager by setting `enablePager: false` in the configuration options or via `data-enable-pager="false"` data attribute.

#### Example - ScrollView bound to remote DataSource

    <div data-role="view" data-stretch="true">
      <div data-role="scrollview"
        data-source="dataSource"
        data-template="scrollview-template"
        data-content-height="120px"
        data-enable-pager="false">
      </div>
    </div>

    <script id="scrollview-template" type="text/x-kendo-template">
      <div style="width: 110px; height: 110px; background-image: #=setBackground(ProductID)#;"></div>
      <p>#= ProductName #</p>
    </script>

    <script>
    var app = new kendo.mobile.Application();

    var dataSource = new kendo.data.DataSource({
      type: "odata",
      transport: {
        read: {
          url: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
        }
      },
      serverPaging: true,
      pageSize: 30
    });

    function setBackground(id) {
      return "url(http://demos.telerik.com/kendo-ui/content/web/foods/" + id +".jpg)";
    }
    </script>

### duration `Number`*(default: 400)*

The milliseconds that take the ScrollView to snap to the current page after released.

#### Example - increase the duration of snap transtion

    <div data-role="view">
      <div id="scrollView" data-role="scrollview" data-duration="500">
        <div data-role="page">Foo</div>
        <div data-role="page">Bar</div>
      </div>
    </div>

    <script>
    var app = new kendo.mobile.Application();
    </script>

### emptyTemplate `String`*(default: "")*

The template which is used to render the pages without content. By default the ScrollView renders a blank page.

**Applicable only in data bound mode.**

#### Example

    <div data-role="view" data-stretch="true">
      <div data-role="scrollview"
        data-source="dataSource"
        data-template="scrollview-template"
        data-empty-template="scrollview-empty"
        data-content-height="120px">
      </div>
    </div>

    <script id="scrollview-template" type="text/x-kendo-template">
      <div style="width: 110px; height: 110px; background-image: #=setBackground(ProductID)#;"></div>
      <p>#= ProductName #</p>
    </script>

    <script id="scrollview-empty" type="text/x-kendo-template">
      <div style="width: 100%; height: 100%; background-color: red;">empty</div>
    </script>

    <script>
    var app = new kendo.mobile.Application();

    var dataSource = new kendo.data.DataSource({
      type: "odata",
      transport: {
        read: {
          url: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
        }
      },
      serverPaging: true,
      pageSize: 30
    });

    function setBackground(id) {
      return "url(http://demos.telerik.com/kendo-ui/content/web/foods/" + id +".jpg)";
    }
    </script>

### enablePager `Boolean`*(default: true)*

If set to `true` the ScrollView will display a pager. By default pager is enabled.

> **Important:** In case the total amount of displayed data is large, it is recommended to turn off the pager by setting `enablePager: false` in the configuration options or via `data-enable-pager="false"` data attribute.

#### Example - turn off pager (ScrollView in data bound mode)

    <div data-role="view" data-stretch="true">
      <div data-role="scrollview"
        data-source="dataSource"
        data-template="scrollview-template"
        data-content-height="120px"
        data-enable-pager="false">
      </div>
    </div>

    <script id="scrollview-template" type="text/x-kendo-template">
      <div style="width: 110px; height: 110px; background-image: #=setBackground(ProductID)#;"></div>
      <p>#= ProductName #</p>
    </script>

    <script>
    var app = new kendo.mobile.Application();

    var dataSource = new kendo.data.DataSource({
      type: "odata",
      transport: {
        read: {
          url: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
        }
      },
      serverPaging: true,
      pageSize: 30
    });

    function setBackground(id) {
      return "url(http://demos.telerik.com/kendo-ui/content/web/foods/" + id +".jpg)";
    }
    </script>

### itemsPerPage `Number`*(default: 1)*

Determines how many data items will be passed to the page template.

> **Important:** In order ensure smooth scrolling the **pageSize of the DataSource should be 6 times itemsPerPage amount** or higher. For example, if `itemsPerPage` is set to 4, then the `pageSize` must be 24 (4*6) or higher.

**Applicable only in data bound mode.**

#### Example

    <div data-role="view" data-stretch="true">
      <div data-role="scrollview"
        data-source="dataSource"
        data-template="scrollview-template"
        data-items-per-page="2"
        data-content-height="120px">
      </div>
    </div>

    <script id="scrollview-template" type="text/x-kendo-template">
      <div style="width: 110px; height: 110px; background-image: #=setBackground(data[0].ProductID)#;"></div>
      <p>#= data[0].ProductName #</p>
      <div style="width: 110px; height: 110px; background-image: #=setBackground(data[1].ProductID)#;"></div>
      <p>#= data[1].ProductName #</p>
    </script>

    <script>
    var app = new kendo.mobile.Application();

    var dataSource = new kendo.data.DataSource({
      type: "odata",
      transport: {
        read: {
          url: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
        }
      },
      serverPaging: true,
      pageSize: 12 //2*6
    });

    function setBackground(id) {
      return "url(http://demos.telerik.com/kendo-ui/content/web/foods/" + id +".jpg)";
    }
    </script>

### page `Number`*(default: 0)*

The initial page to display.

>If the widget is bound to a DataSource, the initial item to display must be within the records from the first data page. For example if the DataSource has `pageSize: 32` the page configuration option of the ScrollView should not exceed 30.

#### Example

    <div data-role="view">
      <div id="scrollView" data-role="scrollview" data-page="1">
        <div data-role="page">Foo</div>
        <div data-role="page">Bar</div>
      </div>
    </div>

    <script>
      var app = new kendo.mobile.Application();
    </script>

### pageSize `Number`*(default: 1)*

Multiplier applied to the snap amount of the ScrollView. By default, the widget scrolls to the next screen when swipe. If the `pageSize` property is set to `0.5`, the ScrollView will scroll by half of the widget width.

**Not applicable in data bound mode.**

#### Example

    <div data-role="view">
      <div id="scrollView" data-role="scrollview" data-page-size="0.5">
        <div data-role="page">Foo</div>
        <div data-role="page">Bar</div>
        <div data-role="page">Baz</div>
        <div data-role="page">Bat</div>
      </div>
    </div>

    <script>
    var app = new kendo.mobile.Application();
    </script>

### template `String`*(default: "#:data#")*

The template which is used to render the content of pages. By default the ScrollView renders a div element for every page.

**Applicable only in data bound mode.**

#### Example: single item template

    <script id="scrollview-template" type="text/x-kendo-template">
      <p>#= ProductName #</p>
    </script>

#### Example: multiple items template (data is accessed via `data[index].fieldName`)

    <script id="scrollview-template" type="text/x-kendo-template">
        <div>
            <p>#= data[0].ProductName #</p>
        </div>
        <div>
            <p>#= data[1].ProductName #</p>
        </div>
    </script>

    <div data-role="view" data-stretch="true" data-init="onInit">
        <div id="scrollview"></div>
    </div>

    <script>
    var app = new kendo.mobile.Application();

    function onInit() {
        $("#scrollview").kendoMobileScrollView({
            dataSource: {
                type: "odata",
                transport: {
                    read: {
                        url: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
                    }
                },
                serverPaging: true,
                pageSize: 30
            },
            itemsPerPage: 2,
            template: $("#scrollview-template").html(),
            contentHeight: 120,
            enablePager: false
        });
    }
    </script>

### velocityThreshold `Number`*(default: 0.8)*

The velocity threshold after which a swipe will navigate to the next page (as opposed to snapping back to the current page).

#### Example

    <div data-role="view">
      <div id="scrollView" data-role="scrollview" data-velocity-threshold="2">
        <div data-role="page">Foo</div>
        <div data-role="page">Bar</div>
        <div data-role="page">Baz</div>
        <div data-role="page">Bat</div>
      </div>
    </div>

    <script>
    var app = new kendo.mobile.Application();
    </script>

## Methods

### content

Update the ScrollView HTML content.

> **Important:** This method is **not** supported in data bound mode.

#### Parameters

##### content `String | jQuery`

The new ScrollView content.

#### Example - change widget's content after initialization

    <div data-role="view" data-init="changePages">
      <div id="scrollView" data-role="scrollview">
        <div data-role="page">Foo</div>
        <div data-role="page">Bar</div>
        <div data-role="page">Baz</div>
        <div data-role="page">Bat</div>
      </div>
    </div>

    <script>
    var app = new kendo.mobile.Application();

    function changePages() {
      var scrollview = $("#scrollView").data("kendoMobileScrollView");
      scrollview.content('<div data-role="page">Item1</div><div data-role="page">Item2</div>');
    }
    </script>

### destroy
Prepares the **ScrollView** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the ScrollView element from DOM.

#### Example

    <div data-role="view">
      <div id="scrollView" data-role="scrollview">
        <div data-role="page">Foo</div>
        <div data-role="page">Bar</div>
      </div>
    </div>

    <script>
    var app = new kendo.mobile.Application();

    function destroyScrollView() {
      var scrollview = $("#scrollView").data("kendoMobileScrollView");
      scrollview.destroy();
      $("#scrollView").remove();
    }
    </script>

### next

Switches to the next page with animation.

#### Example

    <div data-role="view">
      <div id="scrollView" data-role="scrollview">
        <div data-role="page">Foo</div>
        <div data-role="page">Bar</div>
        <div data-role="page">Baz</div>
        <div data-role="page">Bat</div>
      </div>
      <a data-role="button" data-click="next">Next</a>
    </div>

    <script>
    var app = new kendo.mobile.Application();

    function next() {
      var scrollview = $("#scrollView").data("kendoMobileScrollView");
      scrollview.next();
    }
    </script>

### prev

Switches to the previous page with animation.

#### Example

    <div data-role="view">
      <div id="scrollView" data-role="scrollview">
        <div data-role="page">Foo</div>
        <div data-role="page">Bar</div>
        <div data-role="page">Baz</div>
        <div data-role="page">Bat</div>
      </div>
      <a data-role="button" data-click="prev">Next</a>
    </div>

    <script>
    var app = new kendo.mobile.Application();

    function prev() {
      var scrollview = $("#scrollView").data("kendoMobileScrollView");
      scrollview.prev();
    }
    </script>

### refresh

Redraw the mobile ScrollView pager. Called automatically on device orientation change event.

#### Example

    <div data-role="view">
      <div id="scrollView" data-role="scrollview">
        <div data-role="page">Foo</div>
        <div data-role="page">Bar</div>
      </div>
    </div>

    <script>
    var app = new kendo.mobile.Application();

    function refreshScrollView() {
      var scrollview = $("#scrollView").data("kendoMobileScrollView");
      scrollview.refresh();
    }
    </script>

### scrollTo

Scroll to the given page. Pages are zero-based indexed.

#### Parameters

##### page `Number`

The page to scroll to.

##### instant `Boolean` *(default: false)*

If set to true, the ScrollView will jump instantly to the given page without any animation effects.

#### Example - scroll instantly (without animation)

    <div data-role="view" data-init="onInit">
      <div id="scrollView" data-role="scrollview">
        <div data-role="page">Foo</div>
        <div data-role="page">Bar</div>
        <div data-role="page">Baz</div>
        <div data-role="page">Bat</div>
      </div>
    </div>

    <script>
    var app = new kendo.mobile.Application();

    function onInit() {
      var scrollview = $("#scrollView").data("kendoMobileScrollView");
      scrollview.scrollTo(2); //scrolls to the 3rd page instantly
    }
    </script>

### setDataSource

Sets the DataSource of an existing ScrollView and rebinds it.

#### Parameters

##### dataSource `kendo.data.DataSource`

#### Example

    <div id="home" data-role="view" data-model="viewModel">
        <div id="scrollview" data-role="scrollview" data-source="ds" data-template="tmp"></div>
        <a data-role="button" data-click="onClick">Button</a>
    </div>

    <script id="tmp" type="text/x-kendo-template">
        <div>#: foo #</div>
    </script>

    <script>
        var ds = new kendo.data.DataSource({
            data: [{foo: 1}, {foo: 2}]
        });

        function onClick() {
            //change dataSource
            $("#scrollview").data("kendoMobileScrollView")
                .setDataSource([{foo: 3}, {foo: 4}, {foo: 5}]);
        }

        var app = new kendo.mobile.Application();
    </script>

### value

Works in data-bound mode only. If a parameter is passed, the widget scrolls to the given dataItem. If not, the method return currently displayed dataItem.

#### Parameters

##### dataItem `Object`

The dataItem to set.

#### Returns

`Object` The currently displayed dataItem.

## Events

### changing

Fires before the widget page is changed. The change can be prevented by calling the `preventDefault` method of the event parameter, in which case the widget will snap back to the current page.

#### Event Data

##### e.currentPage `Number`

The current page (zero based index)

##### e.nextPage `Number`

The page about to be displayed (zero based index)

#### Example - prevent scrolling after 3th page

    <div data-role="view">
      <div id="scrollView" data-role="scrollview" data-changing="changing">
        <div data-role="page">Foo</div>
        <div data-role="page">Bar</div>
        <div data-role="page">Baz</div>
        <div data-role="page">Bat</div>
      </div>
    </div>

    <script>
    var app = new kendo.mobile.Application();
    function changing(e) {
      if(e.nextPage > 2) {
        e.preventDefault(); //prevent scrolling
      }
    }
    </script>

### change

Fires when the widget page is changed.

#### Event Data

##### e.page `Number`

The current page (zero based index)

##### e.element `jQuery`

The page element. **Available only in data bound mode.** Parameter will be undefined in standard mode.

##### e.data `Array`

The data collection. **Available only in data bound mode.** Parameter will be undefined in standard mode.

#### Example - hook up to the change event

    <div data-role="view" data-stretch="true">
      <div data-role="scrollview"
        data-source="dataSource"
        data-template="scrollview-template"
        data-content-height="120px"
        data-enable-pager="false"
        data-change="change">
      </div>
    </div>

    <script id="scrollview-template" type="text/x-kendo-template">
      <div style="width: 110px; height: 110px; background-image: #=setBackground(ProductID)#;"></div>
      <p>#= ProductName #</p>
    </script>

    <script>
    var app = new kendo.mobile.Application();

    var dataSource = new kendo.data.DataSource({
      type: "odata",
      transport: {
        read: {
          url: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
        }
      },
      serverPaging: true,
      pageSize: 30
    });

    function setBackground(id) {
      return "url(http://demos.telerik.com/kendo-ui/content/web/foods/" + id +".jpg)";
    }

    function change(e) {
      console.log("page ", e.page, "data: ", e.data);
      //handle event
    }
    </script>

### refresh

Fires when widget refreshes

#### Event Data

##### e.pageCount `Number`

The number of pages

##### e.page `Number`

The current page number (zero based index)

#### Example

    <div data-role="view">
      <div id="scrollView" data-role="scrollview" data-refresh="refresh">
        <div data-role="page">Foo</div>
        <div data-role="page">Bar</div>
        <div data-role="page">Baz</div>
        <div data-role="page">Bat</div>
      </div>
    </div>

    <script>
    var app = new kendo.mobile.Application();
    function refresh(e) {
      console.log("Total: ", e.pageCount, " Current: ", e.page);
      //handle event
    }
    </script>
