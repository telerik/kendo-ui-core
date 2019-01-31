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

> Applicable only in the data-bound mode.

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

The intensity of the swipe after which the swipe will result in a bounce effect when the user scrolls to the next page. Higher values require more accelerative swipe to notice the bounce effect when a page is changed.

#### Example - increasing the bounce velocity threshold

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

The height of the ScrollView content.

The supported string values are:

* `100%` - Used if the ScrollView container element does not have a set height. In this case, each page will be stretched to fill the height of the container.
* `auto`

#### Example - stretching the ScrollView

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

An instance of a DataSource to which the ScrollView will be bound.

> If `dataSource` is set, the widget will operate in the data-bound mode.

#### Example - binding the ScrollView to a remote DataSource

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

The duration (in milliseconds) for the ScrollView to snap to the current page after the user releases it.

#### Example - increasing the duration of the snap transition

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

The template for rendering the pages without content. By default, the ScrollView renders a blank page.

> Applicable only in the data-bound mode.

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

If set to `true`, the ScrollView will display a pager. By default, the pager is enabled.

#### Example - turning off the pager in a ScrollView in the data-bound mode

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

The initial page that will be displayed.

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

The template for rendering the content of the pages. By default, the ScrollView renders a `div` element for every page.

> Applicable only in the data-bound mode.

#### Example - using a single-item template

    <script id="scrollview-template" type="text/x-kendo-template">
      <p>#= ProductName #</p>
    </script>

#### Example - using a multiple-item template with data being accessed through data[index].fieldName

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

The length of the horizontal swipe after which a swipe will navigate to the next page - as opposed to snapping back to the current page. Higher values require long area swipes to navigate to the next page.

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

Updates the HTML content of the scrollView.

> The `content` method is not supported in the data-bound mode.

#### Parameters

##### content `String | jQuery`

The new ScrollView content.

#### Example - changing the content after initialization

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

Prepares the ScrollView for safe removal from the DOM. Detaches all event handlers and removes the `jQuery.data` attributes to avoid memory leaks. Calls the `destroy` method of any child Kendo UI widgets.

> The `destroy` method does not remove the `ScrollView` element from the DOM.

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

Switches to the next page with an animation.

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

Switches to the previous page with an animation.

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

Redraws the ScrollView pager.

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

Scrolls to the specified page. Page indices are zero-based.

#### Parameters

##### page `Number`

The page to which will be scrolled.

##### instant `Boolean` *(default: false)*

If set to `true`, the ScrollView will instantly jump to the specified page without any animation effects.

#### Example - scrolling instantly and without animation

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

Fires when the ScrollView page is changed.

#### Event Data

##### e.currentPage `Number`

The current page (zero-based index).

##### e.nextPage `Number`

The next page (zero-based index).

##### e.element `jQuery`

The page element. In the standard mode, the parameter will be undefined.

> Available only in the data-bound mode.

##### e.data `Array`

The data collection. In the standard mode, the parameter will be undefined.

> Available only in the data-bound mode.

##### e.preventDefault `Function`

If invoked, prevents the change action.

#### Example - hooking up to the change event

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

Fires when the ScrollView refreshes.

#### Event Data

##### e.pageCount `Number`

The number of pages.

##### e.page `Number`

The current page number (zero-based index).

##### e.preventDefault `Function`

If invoked, prevents the `change` event. The ScrollView stays on the current page.

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
