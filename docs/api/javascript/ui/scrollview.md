---
title: ScrollView
page_title: Configuration, methods and events of Kendo UI ScrollView
description: You will learn how to configure ScrollView widget, update the scrollview HTML content and scroll to a given page by using methods.
res_type: api
component: scrollview
---

# kendo.ui.ScrollView

Represents the Kendo UI ScrollView widget. Inherits from [kendo.ui.Widget](/api/javascript/ui/widget).

## Configuration

### autoBind `Boolean`*(default: true)*

If set to `false` the widget will not bind to the DataSource during initialization.

**Applicable only in data bound mode.**

#### Example

    <div id="scrollView" style="height: 500px; width:600px;"></div>

    <script id="scrollview-template" type="text/x-kendo-template">
      <div style="width: 110px; height: 110px; background-image: #=setBackground(ProductID)#;"></div>
      <p>#= ProductName #</p>
    </script>

    <script>


    var dataSource = new kendo.data.DataSource({
      type: "odata",
      transport: {
        read: {
          url: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
        }
      },
      serverPaging: true,
      pageSize: 30
    });

    $("#scrollView").kendoScrollView({
        dataSource: dataSource,
        template: $("#scrollview-template").html(),
        contentHeight: 120,
        enablePager: true
    });

    function setBackground(id) {
      return "url(https://demos.telerik.com/kendo-ui/content/web/foods/" + id +".jpg)";
    }
    </script>

### bounceVelocityThreshold `Number`*(default: 1.6)*

The intensity of the swipe after which the swipe will result in a bounce effect when user scrolls to next page. Higher values will require more accelerative swipe to notice the bounce effect when a page is changed.

#### Example - increase bounce velocity threshold

    <div id="scrollView">
      <div data-role="page"><div style="height: 200px;">Foo</div></div>
      <div data-role="page"><div style="height: 200px;">Bar</div></div>
    </div>

    <script>

    $("#scrollView").kendoScrollView({
        bounceVelocityThreshold: 5
    });

    </script>

### contentHeight `Number|String`*(default: "auto")*

The height of the ScrollView content. For string values it accepts `100%` and `auto`. Please use `100%` if the ScrollView container element does have set height. In this case each page will be streched to fill the container height.

#### Stretched ScrollView

    <div id="scrollView" style="height: 500px;>
      <div data-role="page">This page will stretch to fit the entire view height</div>
      <div data-role="page">This page will stretch to fit the entire view height</div>
      <div data-role="page">This page will stretch to fit the entire view height</div>
    </div>

    <script>
    $("#scrollView").kendoScrollView({
        contentHeight: "100%"
    });
    </script>

### dataSource `kendo.data.DataSource | Object`

Instance of DataSource that the ScrollView will be bound to. *If DataSource is set, the widget will operate in data bound mode.*

#### Example - ScrollView bound to remote DataSource

    <div id="scrollView" style="height: 500px; width:600px;"></div>

    <script id="scrollview-template" type="text/x-kendo-template">
      <div style="width: 110px; height: 110px; background-image: #=setBackground(ProductID)#;"></div>
      <p>#= ProductName #</p>
    </script>

    <script>


    var dataSource = new kendo.data.DataSource({
      type: "odata",
      transport: {
        read: {
          url: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
        }
      },
      serverPaging: true,
      pageSize: 30
    });

    $("#scrollView").kendoScrollView({
        dataSource: dataSource,
        template: $("#scrollview-template").html(),
        contentHeight: 120,
        enablePager: true
    });

    function setBackground(id) {
      return "url(https://demos.telerik.com/kendo-ui/content/web/foods/" + id +".jpg)";
    }
    </script>

### duration `Number`*(default: 400)*

The milliseconds that take the ScrollView to snap to the current page after released.

#### Example - increase the duration of snap transition

    <div id="scrollView" style="height: 500px;>
      <div data-role="page">This page will stretch to fit the entire view height</div>
      <div data-role="page">This page will stretch to fit the entire view height</div>
      <div data-role="page">This page will stretch to fit the entire view height</div>
    </div>

    <script>
    $("#scrollView").kendoScrollView({
        duration: "800",
		contentHeight: "100%"
    });
    </script>

### emptyTemplate `String`*(default: "")*

The template which is used to render the pages without content. By default the ScrollView renders a blank page.

**Applicable only in data bound mode.**

#### Example

    <div id="scrollview" style="height: 120px;">
    </div>

    <script id="scrollview-template" type="text/x-kendo-template">
      <div style="width: 110px; height: 110px; background-image: #=setBackground(ProductID)#;"></div>
      <p>#= ProductName #</p>
    </script>

    <script id="scrollview-empty" type="text/x-kendo-template">
      <div style="width: 100%; height: 100%; background-color: red;">empty</div>
    </script>

    <script>

    var dataSource = new kendo.data.DataSource({
      type: "odata",
      transport: {
        read: {
          url: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
        }
      },
      serverPaging: true
    });

    function setBackground(id) {
      return "url(https://demos.telerik.com/kendo-ui/content/web/foods/" + id +".jpg)";
    }

    $("#scrollView").kendoScrollView({
        dataSource: dataSource,
        template: "scrollview-template",
        emptyTemplate: "scrollview-empty",
		contentHeight: "100%"
    });
    </script>

### enablePager `Boolean`*(default: true)*

If set to `true` the ScrollView will display a pager. By default pager is enabled.

#### Example - turn off pager (ScrollView in data bound mode)


    <div id="scrollview"></div>

    <script id="scrollview-template" type="text/x-kendo-template">
      <div style="width: 110px; height: 110px; background-image: #=setBackground(ProductID)#;"></div>
      <p>#= ProductName #</p>
    </script>

    <script>
    $("#scrollView").kendoScrollView({
        dataSource: dataSource,
        template: "scrollview-template",
        enablePager: false,
        contentHeight: "120px"
    });

    var dataSource = new kendo.data.DataSource({
      type: "odata",
      transport: {
        read: {
          url: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
        }
      },
      serverPaging: true
    });

    function setBackground(id) {
      return "url(https://demos.telerik.com/kendo-ui/content/web/foods/" + id +".jpg)";
    }
    </script>

### page `Number`*(default: 0)*

The initial page to display.

#### Example

    <div id="scrollView">
      <div data-role="page">Foo</div>
      <div data-role="page">Bar</div>
    </div>

    <script>
    $("#scrollView").kendoScrollView({
        page: 1
    });
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
        # for (var i = 0; i < data.length; i++) { #
        <div>
            <p>#= data[i].ProductName #</p>
        </div>
         # } #
    </script>

    <div id="scrollview" style="height: 120px;"></div>

    <script>


    $("#scrollview").kendoScrollView({
        dataSource: {
            type: "odata",
            transport: {
                read: {
                    url: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
                }
            },
            serverPaging: true,
            pageSize: 2
        },
        template: $("#scrollview-template").html(),
        contentHeight: 120,
        enablePager: false
    });
    </script>

### velocityThreshold `Number`*(default: 0.8)*

The length of horizotal swipe after which a swipe will navigate to the next page (as opposed to snapping back to the current page). Higher values will require long area swipe in order to navigate to the next page.

#### Example


    <div id="scrollView" data-velocity-threshold="2">
      <div data-role="page">Foo</div>
      <div data-role="page">Bar</div>
      <div data-role="page">Baz</div>
      <div data-role="page">Bat</div>
    </div>

    <script>
    $("#scrollview").kendoScrollView({
        velocityThreshold: 2
    });
    </script>

## Methods

### content

Update the ScrollView HTML content.

> **Important:** This method is **not** supported in data bound mode.

#### Parameters

##### content `String | jQuery`

The new ScrollView content.

#### Example - change widget's content after initialization

    <div id="scrollView">
      <div data-role="page">Foo</div>
      <div data-role="page">Bar</div>
      <div data-role="page">Baz</div>
      <div data-role="page">Bat</div>
    </div>


    <script>
    $("#scrollView").kendoScrollView({
        velocityThreshold: 2
    });

    var scrollview = $("#scrollView").data("kendoScrollView");
    scrollview.content('<div data-role="page">Item1</div><div data-role="page">Item2</div>');
    </script>

### destroy
Prepares the **ScrollView** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the ScrollView element from DOM.

#### Example

    <div id="scrollView">
      <div data-role="page">Foo</div>
      <div data-role="page">Bar</div>
    </div>

    <script>
    $("#scrollView").kendoScrollView();

    function destroyScrollView() {
      var scrollView = $("#scrollView").data("kendoScrollView");
      scrollView.destroy();
      $("#scrollView").remove();
    }
    </script>

### next

Switches to the next page with animation.

#### Example

<div id="scrollView" style="height: 150px">
    <div data-role="page">Foo</div>
    <div data-role="page">Bar</div>
    <div data-role="page">Baz</div>
    <div data-role="page">Bat</div>
</div>
<script>
    var scrollView = $("#scrollView").kendoScrollView().data().kendoScrollView;
    scrollView.next();
</script>

### prev

Switches to the previous page with animation.

#### Example

	<div id="scrollView" style="height: 150px">
		<div data-role="page">Foo</div>
		<div data-role="page">Bar</div>
		<div data-role="page">Baz</div>
		<div data-role="page">Bat</div>
	</div>
	<script>
		var scrollView = $("#scrollView").kendoScrollView({ page: 1}).data().kendoScrollView;
		scrollView.prev();
	</script>

### refresh

Redraw the ScrollView pager.

#### Example


	<div id="scrollView" style="height: 150px">
		<div data-role="page">Foo</div>
		<div data-role="page">Bar</div>
	</div>

	<script>
		var scrollView = $("#scrollView").kendoScrollView({ enablePager: true}).data().kendoScrollView;
		scrollView.refresh();
	</script>

### scrollTo

Scroll to the given page. Pages are zero-based indexed.

#### Parameters

##### page `Number`

The page to scroll to.

##### instant `Boolean` *(default: false)*

If set to true, the ScrollView will jump instantly to the given page without any animation effects.

#### Example - scroll instantly (without animation)

	<div id="scrollView">
		<div data-role="page">Foo</div>
		<div data-role="page">Bar</div>
		<div data-role="page">Baz</div>
		<div data-role="page">Bat</div>
	</div>
	<script>
    var scrollView = $("#scrollView").kendoScrollView().data().kendoScrollView;
    scrollView.scrollTo(2); //scrolls to the 3rd page

	</script>

### setDataSource

Sets the DataSource of an existing ScrollView and rebinds it.

#### Parameters

##### dataSource `kendo.data.DataSource`

#### Example


	<div id="scrollview" style="height: 150px;"></div>
	<script id="tmp" type="text/x-kendo-template">
		<div>#: foo #</div>
	</script>
	<script>
    var ds = new kendo.data.DataSource({
        data: [{ foo: 1 }, { foo: 2 }]
    });

    var scrollView = $("#scrollview").kendoScrollView({
        dataSource: ds,
        template: $("#tmp").html()
    }).data().kendoScrollView;

    scrollView.setDataSource(new kendo.data.DataSource({
        data: [{ foo: 3 }, { foo: 4 }]
    }));


</script>

## Events

### change

Fires when the widget page is changed.

#### Event Data

##### e.currentPage `Number`

The current page (zero based index)

##### e.nextPage `Number`

The next page (zero based index)

##### e.element `jQuery`

The page element. **Available only in data bound mode.** Parameter will be undefined in standard mode.

##### e.data `Array`

The data collection. **Available only in data bound mode.** Parameter will be undefined in standard mode.

##### e.preventDefault `Function`

If invoked prevents the change action.

#### Example - hook up to the change event


    <div id="scrollview"></div>

    <script id="scrollview-template" type="text/x-kendo-template">
      <div style="width: 110px; height: 110px; background-image: #=setBackground(ProductID)#;"></div>
      <p>#= ProductName #</p>
    </script>

    <script>
    $("#scrollview").kendoScrollView({
          dataSource: dataSource,
          template: "scrollview-template",
          contentHeight: "120px",
          enablePager: false,
          change: change
    });

    var dataSource = new kendo.data.DataSource({
      type: "odata",
      transport: {
        read: {
          url: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
        }
      },
      serverPaging: true,
      pageSize: 30
    });

    function setBackground(id) {
      return "url(https://demos.telerik.com/kendo-ui/content/web/foods/" + id +".jpg)";
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

##### e.preventDefault `Function`

If invoked prevents the change event. The widget stays on the current page.

#### Example


    <div id="scrollView">
      <div data-role="page">Foo</div>
      <div data-role="page">Bar</div>
      <div data-role="page">Baz</div>
      <div data-role="page">Bat</div>
    </div>


    <script>
     $("#scrollView").kendoScrollView({
          refresh: refresh
    });

    function refresh(e) {
      console.log("Total: ", e.pageCount, " Current: ", e.page);
      //handle event
    }
    </script>
