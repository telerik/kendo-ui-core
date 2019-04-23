---
title: Content Operations
page_title: jQuery Window Documentation | Content Operations | Kendo UI
description: "Get started with the jQuery Window by Kendo UI and learn how to print its content, control its content when it is displayed in an iframe, and asynchronously load its content with AJAX."
slug: content_window
position: 6
---

# Content Operations

The Window enables you to [handle its content when it is displayed in an `iframe` element](#handling-content-in-iframes), [asynchronously load its content through AJAX](#loading-content-with-ajax), and also [print its content](#printing-the-content).

## Handling Content in iframes

If the URL for the Window content contains a protocol, the Window creates an `iframe` for the content and assumes that the nested page resides in another domain. If the URL does not contain a protocol, the URL is treated as a local URL which will load a partial view and the Window does not create an `iframe` for the content. To control the creation of `iframe` Window content, you have to explicitly configure the widget.

> * Avoid loading HTML fragments (partial content) inside an `iframe`. Like standard web pages, `iframe` pages have to include a `DOCTYPE`, `html`, `head`, and `body` tags.
> * Avoid using an `iframe` on iOS devices because iOS devices do not support `iframe` scrolling and always expand to match the content.

The following example demonstrates how to access the `window` and `document` objects inside the `iframe`. To enable this, the nested page has to belong to the same domain as the main page. The `iframe` is accessed through the [`element`]({% slug widgetwrapperandelement_references_gettingstarted %}) of the Window.

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

        var iframejQuery = iframeWindowObject.$; // Only if jQuery is registered inside the iframe page.
    });
    </script>

## Loading Content with AJAX

The Window provides built-in support for asynchronously loading its content from a URL. This URL is expected to return an HTML fragment that can be loaded in the content area of the Window.

> * Loading full pages inside the Window with AJAX (pages with a `DOCTYPE`, `html`, `head`, and `body` tags) causes undesired side-effects such as breaking the DOM tree, deleting widget instances, and throwing Javascript errors.
> * If you do not set dimensions for the Window, the Window will resize after the AJAX content is loaded and the position of the Window on the screen will change. To center the Window, either [`center`](/api/javascript/ui/window/methods/center) it in the [`refresh`](/api/javascript/ui/window/events/refresh) event handler or set explicit [dimensions](/api/javascript/ui/window/configuration/height).

The following example demonstrates how to initialize the Window and configure its content loading.

    <div id="window"></div>

    $(document).ready(function(){
        $("#window").kendoWindow({
            content: "html-content-snippet.html",
            title: "Async Window Content"
        });
    });

## Printing the Content

To select only the Window content that is visible during printing and hide the rest of the page content, use the CSS code from the following example. The example assumes that only a single Window instance exists on the page and that it is a child of the `body` element which means that the `appendTo` option is not used. If you have multiple Window instances on the page but need to print just one of them, replace the `.k-window` class by a custom CSS class that is manually applied to the wrapper element of the Window.

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

## See Also

* [JavaScript API Reference of the Window](/api/javascript/ui/window)
