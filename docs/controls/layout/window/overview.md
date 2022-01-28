---
title: Overview
page_title: jQuery Window Documentation | Window Overview
description: "Get started with the jQuery Window by Kendo UI, get to know its basic usage, initialize and reference its existing instances, and use its events."
slug: overview_kendoui_window_widget
position: 1
---

# Window Overview

The Window displays content in a modal or non-modal HTML window.

By default, the user can move, resize, and close a Window. Its content can also be defined either as static HTML or dynamically loaded with AJAX.

* [Demo page for the Window](https://demos.telerik.com/kendo-ui/window/index) 

## Basic Usage

The Window provides a set of [default API configuration options](/api/javascript/ui/window) which can be set during its initialization such as minimum and maximum height and width, user actions, title, dragging and resizing, initial position, pinned state, and so on.

The following example demonstrates how to create a modal Window with a predefined position and enable all user actions. The order of the values in the action array determines the order in which the action buttons will be rendered in the title of a Window. The `maximize` action serves both as a button for expanding a Window to fill the screen and as a button to restore a Window to its previous size. The `minimize` action collapses the Window to its title.

    $("#window").kendoWindow({
          actions: ["Custom", "Pin", "Refresh", "Maximize", "Minimize", "Close"],
          draggable: false,
          height: "300px",
          modal: true,
    	pinned: false,
    	position: {
    		top: 100,
    		left: 100
    	},
          resizable: false,
          title: "Modal Window",
          width: "500px"
    });

## Getting Started

* [Initializing from Any DOM Element](#initializing-from-any-dom-element)
* [Initializing from body](#initializing-from-body)
* [Accessing the Window Elements](#accessing-the-window-elements)
* [Destroying the Window](#destroying-the-window)
* [Creating Windows from the Same ID](#creating-windows-from-the-same-id)

### Initializing from Any DOM Element

To initialize the Window, you can use any of the DOM elements. During the initialization, the targeted content will be automatically wrapped in a `div` element. The following example demonstrates how to create the Window from an HTML element and initialize it by using a jQuery selector.

    <div id="window">
        Content of the Window
    </div>

    $(document).ready(function() {
        $("#window").kendoWindow();
    });

### Initializing from body

By default, the Window is created as a child of the `<body>` element. When a Window initializes, it is automatically displayed in its open state near the location of the DOM element that was used to initialize its content. To control this behavior, use the [`appendTo`](/api/javascript/ui/window/configuration/appendto) setting.

The following example demonstrates a possible markup before the Window is initialized.

  	<body>
  		<div id="container1">
  			<div id="window">
  				Content of the Window
  			</div>
  			...
  		</div>
  		<div id="container2">
  			...
  		</div>
  	</body>

The following example demonstrates how the page markup from the previous example changes after the initialization of the Window when the widget is moved to become a child of the `<body>` element and its additional markup (the wrapper and the title bar) is generated.

  	<body>
  		<div id="container1">
  			...
  		</div>
  		<div id="container2">
  			...
  		</div>
  		<div class="k-widget k-window">
  			<div class="k-window-titlebar">...</div>
  			<div id="window" class="k-window-content">
  				Content of the Window
  			</div>
  		</div>
  	</body>

### Accessing the Window Elements

The Window provides the [`wrapper` and `element`]({% slug widgetwrapperandelement_references_gettingstarted %}) DOM elements as fields of its object which you can access and use to customize its appearance and content. Even though the handling of the position and size of the Window is normally done through its API and the [`setOptions`](/api/javascript/ui/window/methods/setoptions) method, you can also utilize `wrapper` to tweak the position or the size of the widget.

    var win = $("#window").data("kendoWindow");
    var winWrapper = win.wrapper;

    winWrapper.addClass("myWindowClass");

### Destroying the Window

When the Window is [destroyed](/framework/widgets/destroy), it is completely removed from the DOM&mdash;the element from which it was initialized no longer exists on the page. As a result, you can create a new Window instance only from another element. To destroy a Window instance on closing, the earliest time that is recommended for this is the [`deactivate`](/api/javascript/ui/window/events/deactivate) event.

### Creating Windows with the Same ID  

To create a Kendo UI Window instance multiple times with the same ID, make sure that the existing instance with this ID is [destroyed](#configuration-Destroy). Widgets with the same ID [cannot exist and work properly simultaneously]({% slug initialize_widgets_using_jquery_plugins_installation %}#duplicate-initialization).

Alternatively, you can [`open`](/api/javascript/ui/window/methods/open) the existing Window instance, [`refresh`](/api/javascript/ui/window/methods/refresh) its AJAX content or [set some new static content](/api/javascript/ui/dialog/methods/content) without having to destroy the instance.

## Functionality and Features

* [Animations]({% slug animations_window %})
* [Positioning]({% slug positiondrag_window %})
* [Dimensions]({% slug dimensionsresize_window %})
* [Custom actions]({% slug customactions_window %})
* [Content operations]({% slug content_window %})
* [Globalization]({% slug globalization_window %})
* [Accessibility]({% slug accessibility_window %})

## Events

For a complete example on the basic Window events, refer to the [demo on using the events of the Window](https://demos.telerik.com/kendo-ui/window/events).

## Referencing Existing Instances

To refer to an existing Window instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/). Once a reference has been established, use the [Window API](/api/javascript/ui/window) to control its behavior.

    var win = $("#window").data("kendoWindow");

To obtain a reference to a Kendo UI Window instance from within its non-`iframe` content, use DOM traversal. `elementInsideWindow` is a jQuery object which contains an element inside the content area of the Window.

    var win = elementInsideWindow.closest(".k-window-content").data("kendoWindow");

If the Window is displaying a page in an `iframe` and the page has to access the widget, obtain a reference to the Window by using `window.parent` from within the `iframe`.

> The access of the parent `iframe` is possible only if the `iframe` and the parent page belong to the same domain.

    var win = window.parent.$("#window").data("kendoWindow");

## See Also

* [Basic Usage of the Window (Demo)](https://demos.telerik.com/kendo-ui/window/index)
* [Using the Basic Events of the Window (Demo)](https://demos.telerik.com/kendo-ui/window/events)
* [Binding the Window over MVVM (Demo)](https://demos.telerik.com/kendo-ui/window/mvvm)
* [Using the Window with AngularJS Directives (Demo)](https://demos.telerik.com/kendo-ui/window/angular)
* [Applying the Window API (Demo)](https://demos.telerik.com/kendo-ui/window/api)
* [JavaScript API Reference of the Window](/api/javascript/ui/window)
* [Troubleshooting]({% slug troubleshoot_window %})
