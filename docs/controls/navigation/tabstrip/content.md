---
title: Content Operations
page_title: jQuery TabStrip Documentation | Content Operations
description: "Get started with the jQuery TabStrip by Kendo UI and learn how to load its content with AJAX and implement scrolling for its content."
slug: content_tabstrip
position: 5
---

# Content Operations

The TabStrip provides options for [loading its content with AJAX](#loading-content-with-ajax) and [enabling scrolling for its tab content](#enabling-content-scrolling).

## Loading Content with AJAX

The TabStrip provides built-in support for asynchronously loading content from remote URLs. These URLs return HTML content that can be loaded in the content area of the TabStrip items. In order for the AJAX loading to work, the content `div` elements have to be empty. For the complete example, refer to the [demo on loading TabStrip content with AJAX](https://demos.telerik.com/kendo-ui/tabstrip/ajax).

    <div id="tabstrip">
        <ul>
            <li>First Tab</li>
            <li>Second Tab</li>
        </ul>
        <div></div>
        <div></div>
     </div>

     <script>
        $(document).ready(function(){
            $("#tabstrip").kendoTabStrip({
                contentUrls: [null, "html-content-snippet.html"]
            });
        });
     </script>

## Enabling Content Scrolling

By default, the content containers of the TabStrip are scrollable. As a result, if the widget has a fixed height and holds large content that cannot fit, its displays scrollbars on its sides. If required, you can disable the content scrolling of the TabStrip which can help in scenarios where the TabStrip hosts a widget (such as the Menu) that needs to overflow the TabStrip. For a complete example, refer to the article on [disabling the content scrolling of the TabStrip](/controls/navigation/tabstrip/how-to/disable-content-scrolling).

Depending on the browser, the scroll position of the content may be reset upon changing the active tab. To persist the scroll position:

1. Use the [`select`](/api/javascript/ui/tabstrip/events/select) event to save the current scroll position.
1. Use the [`activate`](/api/javascript/ui/tabstrip/events/activate) event to restore it.

For a complete example, refer to the article on [saving the scroll position of the TabStrip content](/controls/navigation/tabstrip/how-to/save-content-scroll-position).

## See Also

* [Loading TabStrip Content with AJAX (Demo)](https://demos.telerik.com/kendo-ui/tabstrip/ajax)
* [Disabling Content Scrolling of the TabStrip (Demo)](/controls/navigation/tabstrip/how-to/disable-content-scrolling)
* [JavaScript API Reference of the TabStrip](/api/javascript/ui/tabstrip)
