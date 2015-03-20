---
title: Overview
page_title: Overview of Kendo UI Window widget
description: Learn how to get started with Kendo UI Window widget, load content via Ajax, access an existing window.
---

# Window Overview

A **Window** displays content in a modal or non-modal HTML window. By default, a
**Window** can be moved, resized, and closed. Its content can also be defined with either as
static HTML or loaded dynamically via AJAX.

A **Window** can be initialized from virtually any DOM element. During initialization, the
targeted content will automatically be wrapped in the div element of the **Window**.


## Getting Started

### Create a simple HTML element with the Window content

    <div id="window">
        Content of the Window
    </div>

### Initialize the Window using a selector

    $(document).ready(function() {
        $("#window").kendoWindow();
    });

When a **Window** is initialized, it will automatically be displayed open near the location of the
DOM element that was used to initialize the content.

### HTML structure and DOM Placement

By default, the Window is created as a child of the `<body>` element. This behavior should be taken into account with regard to CSS selectors or element discovery via Javascript.
The behavior is configurable via the [`appendTo` setting](/api/web/window#configuration-appendTo).

#### Before initialization

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

#### After initialization

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

## Configuring Window Behaviors

A **Window** provides many configuration options that can be easily set during initialization.
Among the properties that can be controlled:

*   Minimum and maximum height/width during resizing
*   Available user actions (close/refresh/maximize/minimize/pin) and ability to define custom ones
*   Title
*   Draggable and resizable behaviors
*	Initial position in pixels, with regard to the page top-left corner
*	Pinned state - whether the Window moves together with the rest of the page content during scrolling

### Create a modal Window with all user actions enabled and a predefined position

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

The order of the values in the actions array determines the order in which the action buttons will be rendered
in the title of a **Window**. The maximize action serves both as a button for expanding a
**Window** to fill the screen and as a button to restore a **Window** to its previous
size. The minimize action collapses a **Window** to its title.

If a non-recognized action name is supplied, it is treated as a custom action and the following CSS classes are rendered for it - **k-icon** and **k-i-actionname** (all letters lowercase).
No click event handler is attached automatically either. The Kendo stylesheets have a supplied icon for actions with the name "custom", but any name can be used.
Click events can be captured and handled in a standard way:

### Custom actions

      $("#window").kendoWindow({
          actions: ["Custom", "Minimize", "Maximize", "Close"],
          title: "Window Title"
      }).data("kendoWindow").wrapper.find(".k-i-custom").click(function(e) {
          alert("Custom action button clicked");
          e.preventDefault();
      });

    <h3>Positioning and Opening a Window</h3>
    <p>
     In some scenarios, it is preferable to center a <strong>Window</strong> rather than open it near the HTML
     element used to define the content. It is also common to open a <strong>Window</strong> as the result of the
     action of a user rather than on the load event of a page. The <strong>Window</strong> API provides methods for
     handling these scenarios.
    </p>

### Centering a Window and opening on button click

    <div id="window">
        Content of the Window
    </div>
    <button id="openButton">Open Window</button>

### Initialize Window, center, and configure button click action

    $(document).ready(function(){
        var win = $("#window").kendoWindow({
            height: "200px",
            title: "Centered Window",
            visible: false,
            width: "200px"
        }).data("kendoWindow");
    });

    $("#openButton").click(function(){
        var win = $("#window").data("kendoWindow");
        win.center();
        win.open();
    });

## Window dimensions

By default the Window does not have any preset dimensions, so its size depends on its content. You need to keep in mind the following:

* If the Window contains horizontally expandable block-level elements (including Kendo UI widgets such as the Grid, Editor, etc), the Window can expand horizontally to the point of touching the browser viewport's right edge.
In this situation the widget "sticks" to the right viewport edge and cannot be separated from it. This problem is caused by the fact that the Window is absolutely positioned with CSS and is not related to Kendo UI.
In order to avoid the issue, set some appropriate width to the Window or set a (max-)width to its content.
* If the Window and its content are able to expand vertically without any restrictions, this may result in a popup, which is higher than the browser viewport. Such an interface is not very usable and should be avoided.
* When the Window uses an `iframe` it does not resize automatically, according to the iframe content, because there is no relationship between the iframe content and iframe size. On the other side,
iOS devices do not support iframe scrolling and expand iframes, according to their content, which may increase the Window height too much. That's why using the Window in iframe mode on Apple touch devices is not recommended.

## Loading Window content via AJAX

A **Window** provides built-in support for asynchronously loading content from a URL. This URL
should return an **HTML fragment** that can be loaded in a Window content area.

> Loading full pages (i.e. ones with a DOCTYPE, `html`, `head` and `body` tags) inside the Window with AJAX is incorrect and will cause
all sorts of undesired side effects, including a broken DOM tree, deleted widget instances and Javascript errors.

### Load Window content asynchronously

    <div id="window"></div>

### Initialize window and configure content loading

    $(document).ready(function(){
        $("#window").kendoWindow({
            content: "html-content-snippet.html",
            title: "Async Window Content"
        });
    });

If the Window has no set dimensions, it will probably resize after the AJAX content is loaded. This will naturally change the widget position on the screen and it will no longer be centered. If this is a requirement,
then either [`center`](/api/web/window#methods-center) the Window in its [`refresh`](/api/web/window#events-refresh) event, or set some explicit dimensions.

## Using iframes

The Window creates an `iframe` for its content if the content URL contains a protocol, i.e. it is assumed that in this case the nested page resides on another domain.
If the URL does not contain s protocol, the assumption is that it is a local URL that will load a partial view (not a full page), so an iframe is not created.
This behavior can be controlled explicitly via the widget configuration.

> Loading HTML fragments (partial content) inside an iframe is incorrect. Iframe pages should include a DOCTYPE, `html`, `head` and `body` tags, just like a standard web page does.

### Accessing the `window` and `document` objects inside the `iframe`

In order to access content and script objects inside the Kendo UI Window `iframe`, the nested page must belong to the **same domain** as the main page.

    <div id="window"></div>

    <script>
    
    var windowElement = $("#window").kendoWindow({
        iframe: true,
        content: "http://docs.telerik.com/kendo-ui/"
    });

    var iframeDomElement = windowElement.children("iframe")[0];
    var iframeWindowObject = iframeDomElement.contentWindow;
    var iframeDocumentObject = iframeDomElement.contentDocument;
    // which is equivalent to
    // var iframeDocumentObject = iframeWindowObject.document;
    var iframejQuery = iframeWindowObject.$; // if jQuery is registered inside the iframe page, of course
    
    </script>

## Accessing an Existing Window

You can reference an existing **Window** instance via
[jQuery.data()](http://api.jquery.com/jQuery.data/). Once a reference has been established, you can
use the API to control its behavior.

### Accessing an existing Window instance

    var win = $("#window").data("kendoWindow");

### Accessing an existing Window instance from its non-iframe content

An easy way to obtain reference to a Kendo UI Window instance from within its non-iframe content is to use DOM traversal.

    var win = elementInsideWindow.closest(".k-window-content").data("kendoWindow");

`elementInsideWindow` is a jQuery object containing and element inside the Window content area.

### Accessing an existing Window instance from within an iframe

If the Window is displaying a page in an iframe and the page needs to access the widget, this can be achieved by using `window.parent` from within the iframe.

    var win = window.parent.$("#window").data("kendoWindow");

> Please note that iframe-parent access is possible only if the iframe and the parent page belong to the same domain.
	
## Using Kendo UI Window with a form

This section applies only to cases when the Window is *not* using an `iframe`.

By default, the Window widget is moved in the DOM and placed as a child of the `body` element after initialization. In this way the widget is easily positioned on top of all other page content,
but may lead to undesired side effects if the Window is created from an element inside a form, because the moved form fields will not be submitted. There are two ways to avoid this:

1. the whole form including its opening and closing tags should be inside the element, from which the Window is created;
1. if some parts of the form should remain outside the Window, then the [appendTo](/api/web/window#configuration-appendTo) property should be used,
so that the widget remains inside the form;

When the Window contains a form, which is submitted via standard POST, the widget will be closed and the page will be reloaded.
If this is not desired, then the form should be submitted via Ajax. This is recommended especially when the submitted data is validated on the server,
because in such cases the Window should remain visible to display and validation messages that may be returned.

## Destroying a Kendo UI Window

Unlike most other widgets, the Kendo UI Window is **completely removed from the DOM** when [destroyed](/widgets#destroying-kendo-ui-widgets).
This means that the element, from which it was initialized, no longer exists on the page, so a new Window instance can be created only from another element.

## Printing the Window contents

The CSS code below can be used to hide all the page content and leave only the Window content visible during printing.
The code assumes that only one Window instance exists on the page and it is a child of the `body`, i.e. the `appendTo` option is **not** used.
If there are multiple Window instances on the page and only one should be printed, then the `.k-window` class below should be replaced by a custom CSS class, which is applied to the Window wrapper element manually.

    @media print
    {
        body > *
        {
            display: none !important;
        }
        
        body > .k-window
        {
            display: block !important;
            position: relative !important;
            top: auto !important;
            left: auto !important;
            width: auto !important;
            height: auto !important;
            border-width: 0;
            box-shadow: none !important;
        }
        
        .k-window .k-window-titlebar
        {
            display: none;
        }
    }

## Resolve scrollbar overlap issue in OS X

In Safari and Chrome browsers running on OS X, a scrollbar of an element **below** the Window popup may be displayed incorrectly **over** the Window popup.
This can be resolved with the following CSS style applied to the scrollbar container below the Window:

    -webkit-transform: translate3d(0, 0, 0);
