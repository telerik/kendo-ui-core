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

To initialize the Window, use virtually any DOM element. During initialization, the targeted content is going to be automatically wrapped in the `div` element of the widget.

The example below demonstrates how to create the widget from a simple HTML element with the content of the Window and initialize it by using a jQuery selector.

###### Example

    <div id="window">
        Content of the Window
    </div>

    $(document).ready(function() {
        $("#window").kendoWindow();
    });

When a Window is initialized, it is automatically displayed as open near the location of the DOM element that was used to initialize the content.

### HTML Structure and DOM Placement

By default, the Window is created as a child of the `<body>` element. This behavior is configurable through the [`appendTo` setting](/api/javascript/ui/window#configuration-appendTo).

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

The following example demonstrates how the page markup from the previous example changes after the initialization of the Kendo UI Window, when the widget is moved to become a child of the `<body>` and its additional markup&mdash;the wrapper and the title bar&mdash;is generated.

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

Kendo UI Window provides default configuration options that can be set during initialization.

Some of the properties that can be overridden and controlled are:

* Minimum and maximum height and width during resizing.
* Available user actions&mdash;close, refresh, maximize, minimize, or pin&mdash;and the option to define custom ones.
* Title.
* Draggable and resizable behaviors.
*	Initial position in pixels with regard to the page top-left corner.
*	Pinned state&mdash;whether the Window moves together with the rest of the page content during scrolling.

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

The order of the values in the actions array determines the order in which the action buttons are rendered in the title of a Window. The `maximize` action serves both as a button for expanding a Window to fill the screen and as a button to restore a Window to its previous size. The `minimize` action collapses a Window to its title.

### Custom Actions

If a non-recognized action name is supplied, it is treated as a custom action and the `k-icon` and `k-i-actionname` (all lowercase) CSS classes are rendered for it. No `click` event handler is automatically attached either. The Kendo UI stylesheets have a supplied icon for actions with the name `"custom"`, but you can use any name. The `click` events can be captured and handled in a standard way.

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

Usually, it is preferable to center the Window rather than open it near the HTML element used to define its content. Often, the Window is opened as a result of a user action rather than of the `load` event of the page. The [Window API](/api/javascript/ui/window) provides methods for handling these scenarios. Basically, the widget can be initialized as non-visible and can opened when needed.

The example below demonstrates how to center and open a Kendo UI Window on a button click. If content is loaded through Ajax, [centering occurs after request is complete](#configuration-Load).

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

By default, Kendo UI Window does not have any preset dimensions and its size depends on its content.

If the Window contains horizontally expandable block-level elements&mdash;including Kendo UI widgets such as the Grid, Editor, and others&mdash;the widget can expand horizontally to the point of touching the right edge of the browser viewport. In such cases, the widget sticks to the right viewport edge and cannot be separated from it. This issue occurs because the Dialog is absolutely positioned with CSS. To avoid such behavior, set an appropriate width to the widget, or a (max-)width to its content.

The lack of restrictions over the dimensions for vertical expanding of the Window and its content might result in undesired behavior&mdash;for example, the rendition of a popup which is higher than the browser viewport.

If the Window uses an `iframe` element, it does not resize automatically according to the iframe content, because there is no relationship between the content and size of the iframe. However, iOS devices do not support iframe scrolling and expand iframes according to their content, which might increase the Window height too much. That is why it is not recommended to use the Window in an `iframe` mode on Apple touch devices.

### Load Content through AJAX

The Window provides built-in support for asynchronously loading content from a URL. This URL is expected to return an HTML fragment that can be loaded in a Window content area.

> **Important**
> * Loading full pages inside the Window with AJAX&mdash;pages with a `DOCTYPE`, `html`, `head`, and `body` tags&mdash;causes various undesired side-effects&mdash;breaks the DOM tree, deletes widget instances, and throws Javascript errors.
> * If the Window has no set dimensions, it is probably going to resize after the AJAX content is loaded. This naturally changes the position of the widget on the screen. To center the Window, either [`center`](/api/javascript/ui/window#methods-center) it in the [`refresh`](/api/javascript/ui/window#events-refresh) event handler, or set some explicit [dimensions](/api/javascript/ui/window#configuration-height).

The example below demonstrates how to initialize the Window and configure its content loading.

###### Example

    <div id="window"></div>

    $(document).ready(function(){
        $("#window").kendoWindow({
            content: "html-content-snippet.html",
            title: "Async Window Content"
        });
    });

### Use with iframe

The Window creates an iframe for its content if the content URL contains a protocol&mdash;in this case it is assumed that the nested page resides in another domain. If the URL does not contain a protocol, the assumption is that it is a local URL that is going to load a partial view (not a full page) and an iframe is not created. This behavior can be controlled by explicitly configuring the widget.

> **Important**
> * Loading HTML fragments (partial content) inside an iframe is an incorrect approach. Iframe pages have to include a `DOCTYPE`, `html`, `head`, and `body` tags, just like a standard web page does.
> * It is not recommended to use an iframe on iOS devices. Iframes on these devices are not scrollable and always expand to match the content.

The example below demonstrates how to access the `window` and `document` objects inside the `iframe`. To achieve this, the nested page has to belong to the same domain as the main page. The `iframe` is accessed through the [`element`]({% slug widgetwrapperandelement_references_gettingstarted %}) of the Window widget.

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

By default, after the Window is initialized, it is moved in the DOM and placed as a child of the `body` element. This behavior easily positions it on top of all other page content, but might cause undesired side-effects if the Window is created from an element inside a form, because the moved form fields will not be submitted. To avoid such issues, use any of the following approaches:

1. Place the whole form, including its opening and closing tags, inside the element from which the Window is created.
2. If some parts of the Window need to remain outside it, use the [`appendTo`](/api/javascript/ui/window#configuration-appendTo) property, so that the widget remains inside the form.

When the Window contains a form, which is submitted through a standard POST request, the widget will close and the page will reload. If you have to avoid this behavior, submit the form through Ajax. The approach is strongly recommended when the submitted data is validated on the server, because in such cases the Dialog is expected to remain visible and to display the validation messages that might be returned.

### Destroy

Unlike most widgets, Kendo UI Window is completely removed from the DOM when [destroyed](/framework/widgets/destroy). This means that the element, from which it was initialized, no longer exists on the page. Therefore, you are able to create a new Window instance only from another element.

If you want to destroy a Window instance when it is being closed, the earliest recommended time to do that is the [`deactivate`](/api/javascript/ui/window#events-deactivate) event.

### Print

To select only the Window content that is visible during printing and hide the rest of the page content, use the CSS code demonstrated in the following example. It assumes that only one Window instance exists on the page and that it is a child of the `body` elements&mdash;meaning that the `appendTo` option is not used. If there are multiple Window instances on the page and only one needs to be printed, replace the `.k-window` class by a custom CSS class that is manually applied to the wrapper element of the Window.

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

To refer to an existing Window instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference has been established, use the [Window API](/api/javascript/ui/window) to control its behavior.

The example below demonstrates how to access an existing Window instance.

###### Example

    var win = $("#window").data("kendoWindow");

### Reference from Non-iframe Content

To obtain a reference to a Kendo UI Window instance from within its non-`iframe` content, use DOM traversal.

###### Example

    var win = elementInsideWindow.closest(".k-window-content").data("kendoWindow");

`elementInsideWindow` is a jQuery object containing and an element inside the Window content area.

### Reference from iframe

If the Window is displaying a page in an iframe and the page needs to access the widget, use `window.parent` from within the iframe to obtain a reference to the Window.

###### Example

    var win = window.parent.$("#window").data("kendoWindow");

> **Important**
>
> The iframe-parent access is possible only if the iframe and the parent page belong to the same domain.

### Access DOM Elements

Similar to other Kendo UI widgets, the Window has two DOM elements, which can be accessed and used to customize the appearance of the widget or its content. These are the [`wrapper` and `element`]({% slug widgetwrapperandelement_references_gettingstarted %}) elements of the widget, which are provided as fields of the widget object. In specific scenarios, the Window wrapper can be used to tweak the position or the size of the widget although this is normally done through the API and the [`setOptions` method](/api/javascript/ui/window#methods-setOptions).

###### Example

    var win = $("#window").data("kendoWindow");
    var winWrapper = win.wrapper;

    winWrapper.addClass("myWindowClass");

## Troubleshooting

### Scrollbar Overlaps: OS X

A scrollbar of an element below the Window popup might be displayed incorrectly over the Window popup in the Safari and Chrome browsers which run on OS X.

**Solution**

Apply the CSS style to the scrollbar container below the Window as demonstrated in the example below.

###### Example

    -webkit-transform: translate3d(0, 0, 0);

### Create Windows Multiple Times

To create a Kendo UI Window instance multiple times with the same ID, make sure that the existing instance with this ID is [destroyed](#configuration-Destroy) first. Widgets with the same ID [cannot exist and work properly]({% slug initialize_widgets_using_jquery_plugins_installation %}#duplicate-initialization) at one and the same time.

Alternatively, do not destroy the existing Window instance&mdash;[open](/api/javascript/ui/window#methods-open) it and [refresh](/api/javascript/ui/window#methods-refresh) its Ajax content or [set new static content](/api/javascript/ui/dialog#methods-content) if needed.

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
