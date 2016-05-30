---
title: Overview
page_title: Overview | Kendo UI Window
description: "Learn how to initialize the Kendo UI Window widget and configure its behaviors."
slug: overview_kendoui_window_widget
position: 1
---

# Window Overview

The [Kendo UI Window widget](http://demos.telerik.com/kendo-ui/window/index) displays content in a modal or non-modal HTML window. By default, a Window can be moved, resized, and closed. Its content can also be defined with either as static HTML, or dynamically loaded via AJAX.

## Getting Started

### Initialize the Window

Kendo UI Window can be initialized from virtually any DOM element. During initialization, the targeted content is going to be automatically wrapped in the `div` element of the widget.

The example below demonstrates how to create the widget from a simple HTML element with the content of the Window and initialize it by using a jQuery selector.

###### Example

    <div id="window">
        Content of the Window
    </div>

    $(document).ready(function() {
        $("#window").kendoWindow();
    });

When a Window is initialized, it is going to be automatically displayed as open near the location of the DOM element, which was used to initialize the content.

### HTML Structure and DOM Placement

With regard to the CSS selectors or element discovery via Javascript, take into account that, by default, the Window is created as a child of the `<body>` element. This behavior is configurable via the [`appendTo` setting](/api/javascript/ui/window#configuration-appendTo).

The example below demonstrates the possible markup before the initialization of the Kendo UI Window.

###### Example

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

The example below demonstrates how the above page markup changes after the initialization of the Kendo UI Window, when the widget is moved to become a child of the `<body>` and its additional markup is generated&mdash;that is, the wrapper and the title bar.

###### Example

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

## Configuration

### Defaults

Kendo UI Window provides default configuration options that can be set during initialization. Some of the properties that can be overriden and controlled are:

*   Minimum and maximum height and width during resizing
*   Available user actions (`close`/`refresh`/`maximize`/`minimize`/`pin`) and the option to define custom ones
*   Title
*   Draggable and resizable behaviors
*	Initial position in pixels with regard to the page top-left corner
*	Pinned state (whether the Window moves together with the rest of the page content during scrolling)

The example below demonstrates how to create a modal Window with a predefined position and enable all user actions.

###### Example

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

The order of the values in the actions array determines the order in which the action buttons will be rendered in the title of a Window. The `maximize` action serves both as a button for expanding a Window to fill the screen, and as a button to restore a Window to its previous size. The `minimize` action collapses a Window to its title.

### Custom Actions

If a non-recognized action name is supplied, it is treated as a custom action and the `k-icon` and `k-i-actionname` (all lowercase) CSS classes are rendered for it. No `click` event handler is automatically attached either. The Kendo UI stylesheets have a supplied icon for actions with the name `"custom"`, but you can use any name. `click` events can be captured and handled in a standard way.

The example below demonstrates how to set custom actions in a Window.

###### Example

      $("#window").kendoWindow({
          actions: ["Custom", "Minimize", "Maximize", "Close"],
          title: "Window Title"
      }).data("kendoWindow").wrapper.find(".k-i-custom").click(function(e) {
          alert("Custom action button clicked");
          e.preventDefault();
      });

### Positioning and Opening

In lots of scenarios, it is preferable to center the Window rather than open it near the HTML element used to define its content. It is also common to open a Window as the result of a user action, rather than on the `load` event of the page. The [Window API](/api/javascript/ui/window) provides methods for handling these scenarios. Basically, the widget can be initialized as non-visible and opened when needed.

The example below demonstrates how to center and open a Kendo UI Window on button click. Note that if content is loaded via Ajax, [centering should occur after request is complete](#configuration-Load).

###### Example

    <div id="window">
        Content of the Window
    </div>
    <button id="openButton">Open Window</button>

The example below demonstrates how to initialize a Window, center, and configure the button click action.

###### Example

    $(document).ready(function(){
        $("#window").kendoWindow({
            width: 200,
            height: 200,
            title: "Centered Window",
            visible: false            
        }).data("kendoWindow");
    });

    $("#openButton").click(function(){
        var win = $("#window").data("kendoWindow");
        win.center().open();
    });

### Dimensions

By default, Kendo UI Window does not have any preset dimensions, so its size depends on its content.

If the Window contains horizontally expandable block-level elements, including Kendo UI widgets such as the Grid, Editor, etc., the widget can expand horizontally to the point of touching the browser viewport's right edge. In such cases the widget sticks to the right viewport edge and cannot be separated from it. This issue is not related to Kendo UI, but rather to the fact that the Window is absolutely positioned with CSS. To avoid the issue, set some appropriate width to the Window, or set a (max-)width to its content.

If the Window and its content are able to expand vertically without any restrictions, this may result in a popup which is higher than the browser viewport. Such an interface is not very usable, so try to avoid it.

When the Window uses an `iframe` element, it does not resize automatically according to the iframe content, because there is no relationship between the content and size of the iframe. On the other hand, iOS devices do not support iframe scrolling and expand iframes according to their content, which may increase the Window height too much. That is why using the Window in an `iframe` mode on Apple touch devices is not recommended.

### Load Content via AJAX

Kendo UI Window provides built-in support for asynchronously loading content from a URL. This URL is expected to return an HTML fragment that can be loaded in a Window content area.

> **Important**
> * Loading full pages, i.e. pages with a DOCTYPE, `html`, `head`, and `body` tags, inside the Window with AJAX is incorrect and is going to cause all sorts of undesired side-effects, including a broken DOM tree, deleted widget instances, and Javascript errors.
> * If the Window has no set dimensions, it is probably going to resize after the AJAX content is loaded. This naturally changes the position of the widget on the screen. If the Window should be centered, then either [`center`](/api/javascript/ui/window#methods-center) it in the [`refresh`](/api/javascript/ui/window#events-refresh) event handler, or set some explicit [dimensions](/api/javascript/ui/window#configuration-height).

The example below demonstrates how to initialize the Window and configure its content loading.

###### Example

    <div id="window"></div>

    $(document).ready(function(){
        $("#window").kendoWindow({
            content: "html-content-snippet.html",
            title: "Async Window Content"
        });
    });

### Use with an iframe

Kendo UI Window creates an iframe for its content if the content URL contains a protocol, i.e. it is assumed that in this case the nested page resides in another domain. If the URL does not contain a protocol, the assumption is that it is a local URL that is going to load a partial view (not a full page), so an iframe is not created. This behavior can be controlled explicitly through configuring the widget.

> **Important**
> * Loading HTML fragments (partial content) inside an iframe is incorrect. Iframe pages should include a DOCTYPE, `html`, `head`, and `body` tags, just like a standard web page does.
>  * Using an iframe on iOS devices is not recommended. Iframes on these devices are not scrollable and always expand to match the content.

The example below demonstrates how to access the `window` and `document` objects inside the `iframe`. Note that to achieve this, the nested page must belong to the same domain as the main page. The `iframe` is accessed through the [`element`]({% slug widgetwrapperandelement_references_gettingstarted %}) of the Window widget.

###### Example

    <div id="window"></div>

    <script>

    $(function() {
        $("#window").kendoWindow({
            iframe: true,
            content: "http://docs.telerik.com/kendo-ui/"
        });
    });

    // The code above will be generated automatically when using server-side Kendo UI wrappers.

    $(function() {
        var windowElement = $("#window");
        var iframeDomElement = windowElement.children("iframe")[0];
        var iframeWindowObject = iframeDomElement.contentWindow;

        var iframeDocumentObject = iframeDomElement.contentDocument;
        // which is equivalent to
        // var iframeDocumentObject = iframeWindowObject.document;

        var iframejQuery = iframeWindowObject.$; // if jQuery is registered inside the iframe page, of course    
    });

    </script>

### Integrate with Forms

> **Important**
>
> This section only applies to cases when the Window is not using an `iframe`.

By default, Kendo UI Window is moved in the DOM and placed as a child of the `body` element after its initialization. In this way the widget is easily positioned on top of all other page content, but may lead to undesired side-effects if the Window is created from an element inside a form, because the moved form fields will not be submitted. To avoid this behavior, apply any of the following:

1. Place the whole form, including its opening and closing tags, inside the element from which the Window is created.
2. Use the [`appendTo`](/api/javascript/ui/window#configuration-appendTo) property, if some parts of the Window need to remain outside the Window, so that the widget remains inside the form.

When the Window contains a form, which is submitted via a standard POST request, the widget is going to close and the page reloaded. If you want to avoid this behavior, submit the form via Ajax. This is essentially recommended when the submitted data is validated on the server, because in such cases the Window should remain visible to display any validation messages that may be returned.

### Destroy

Unlike most widgets, Kendo UI Window is completely removed from the DOM when [destroyed](/framework/widgets/destroy). This means that the element, from which it was initialized, no longer exists on the page. Therefore, you are able to create a new Window instance only from another element.

If you want to destroy a Window instance when it is being closed, the earliest recommended time to do that is the [`deactivate`](/api/javascript/ui/window#events-deactivate) event.

### Print

To select only the Window content visible during printing and hide the rest of the page content, you are able to use the CSS code demonstrated in the example below. The code assumes that only one Window instance exists on the page and it is a child of the `body`, meaning that the `appendTo` option is not used. If there are multiple Window instances on the page and only one should be printed, then replace the `.k-window` class by a custom CSS class, which is manually applied to the Window wrapper element.

###### Example

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

## Reference

### Existing Instances

Refer to an existing Window instance via the [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference has been established, use the [Window API](/api/javascript/ui/window) to control its behavior.

The example below demonstrates how to access an existing Window instance.

###### Example

    var win = $("#window").data("kendoWindow");

#### Reference from Non-iframe Content

An easy way to obtain reference to a Kendo UI Window instance from within its non-`iframe` content is to use DOM traversal.

The example below demonstrates how to access an existing Window instance from its non-`iframe` content.

###### Example

    var win = elementInsideWindow.closest(".k-window-content").data("kendoWindow");

`elementInsideWindow` is a jQuery object containing and an element inside the Window content area.

#### Reference from within an iframe

If the Window is displaying a page in an iframe and the page needs to access the widget, you are able to achieve this by using `window.parent` from within the iframe.

The example below demonstrates how to access an existing Window instance from within an iframe.

###### Example

    var win = window.parent.$("#window").data("kendoWindow");

> **Important**
>
> The iframe-parent access is possible only if the iframe and the parent page belong to the same domain.

### Access DOM Elements

Similar to other Kendo UI widgets, the Window has two DOM elements, which you may want to access and use to customize the appearance of the widget or its content. These are the widget's [`wrapper` and `element`](/framework/widgets/wrapper-element), which are provided as fields of the widget object. In specific scenarios, the Window wrapper can be used to tweak the widget's position or size, although this is normally done via the API and the [`setOptions` method](/api/javascript/ui/window#methods-setOptions).

The example below demonstrates how to access the DOM elements of a Window.

###### Example

    var win = $("#window").data("kendoWindow");
    var winWrapper = win.wrapper;

    winWrapper.addClass("myWindowClass");

## Troubleshooting

### Scrollbar Overlaps: OS X

In Safari and Chrome browsers running on OS X, a scrollbar of an element below the Window popup may be displayed incorrectly over the Window popup. Resolve this issue by applying the CSS style demonstrated in the example to the scrollbar container below the Window.

###### Example

    -webkit-transform: translate3d(0, 0, 0);

### Create Windows Multiple Times

It is possible to create a Kendo UI Window instance multiple times with the same ID only if the existing instance with this ID is [destroyed](#configuration-Destroy) first. Multiple widgets with the same ID [cannot exist and work properly]({% slug initialize_widgets_using_jquery_plugins_installation %}#duplicate-initialization) at the same time. An alternative approach is not to destroy the existing Window instance, but just [open](/api/javascript/ui/window#methods-open) it and [refresh](/api/javascript/ui/window#methods-refresh) its Ajax content&mdash;or [set new static content](/api/javascript/ui/window#methods-content)&mdash;if needed.

## See Also

Other articles on Kendo UI Upload:

* [Overview of the ASP.NET MVC HtmlHelper Extension for the Upload Widget](/aspnet-mvc/helpers/window/overview)
* [Overview of the Upload JSP Tag]({% slug overview_window_uiforjsp %})
* [Overview of the Upload PHP Class](/php/widgets/window/overview)
* [How to Add Auto-Resizing Splitter]({% slug howto_addautoresizingsplitter_window %})
* [How to Add Close Button inside Modal Windows]({% slug howto_addclosebutton_insidemodalwindows_window %})
* [How to Cascade Open Windows]({% slug howto_cascadeopenwindows_window %})
* [How to Create Confirmation Dialog via Promises]({% slug howto_createconfirmationdialog_viapromises_window %})
* [How to Display Loading Indicator over Window]({% slug howto_displayloadingindicator_overwindow_window %})
* [How to Initialize the Grid]({% slug initialize_thegrid_window_widget %})
* [How to Post to Iframe]({% slug howto_posttoiframe_window %})
* [How to Restrict Window Positioning]({% slug howto_restrictpositioning_window %})
* [How to Use Custom Action Icons]({% slug howto_customactionicons_window %})
* [How to Use MVVM Binding for Window Data Editing]({% slug howto_usemvvmbinding_forwindowdataediting_mvvm_window %})
* [Window JavaScript API Reference](/api/javascript/ui/window)
