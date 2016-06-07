---
title: Overview
page_title: Overview | Kendo UI TabStrip
description: "Learn how to initialize the Kendo UI TabStrip widget and configure its behaviors."
slug: overview_kendoui_tabstrip_widget
position: 1
---

# TabStrip Overview

The [Kendo UI TabStrip widget](http://demos.telerik.com/kendo-ui/tabstrip/index) displays a collection of tabs with associated content. It is composed of an unordered list of items, representing tabs, and a collection of `div` elements, which contain the content for each tab.

## Getting Started

### Initialize the TabStrip

The Kendo UI TabStrip widget can be initialized in two ways:

* From HTML markup
* From a JSON data object

> **Important**  
> * As TabStrip should be initialized after the DOM is fully loaded, make sure you create it within a $(document).ready() statement.
> * It is not required for the tabs of the widget to have content. Therefore, if you need to have tabs with no content, it is safe to omit their associated `div` elements.

#### Using HTML Markup

The example below demonstrates how to initialize Kendo UI TabStrip from HTML markup.

###### Example

    <div id="tabstrip">
        <ul>
            <li>First tab</li>
            <li>Second tab</li>
        </ul>
        <div>First tab content</div>
        <div>Second tab content</div>
    </div>

    <script>
        $(document).ready(function() {
            $("#tabstrip").kendoTabStrip();
        });
    </script>

#### Using JSON Data Object

The example below demonstrates how to initialize Kendo UI TabStrip from a JSON data object.

###### Example

     <div id="tabstrip"></div>

    <script>
      $(document).ready(function() {
        $("#tabstrip").kendoTabStrip({
          dataTextField: "text",
          dataContentField: "content",
          dataUrlField: "url",
          dataImageUrlField: "imageUrl",
          dataSpriteCssClass: "spriteCssClass",
          dataContentUrlField: "contentUrl",
          dataSource:
          [{
            text: "Item 1",
            url: "http://www.telerik.com"               // (Optional) Link URL if navigation is needed
          },
           {
             text: "Item 2",
             content: "text"                             // Content for the content element
           },
           {
             text: "Item 3",
             contentUrl: "partialContent.html"           // From where to load the item content
           },
           {
             text: "Item 4",
             imageUrl: "http://www.telerik.com/test.jpg" // (Optional) Item image URL
           },
           {
             text: "Item 5",
             spriteCssClass: "imageClass3"               // (Optional) Item image sprite CSS class
           }]
        });
      });
    </script>

## Configuration

### Load Content with AJAX

Kendo UI TabStrip provides built-in support for asynchronously loading content from remote URLs. These URLs return HTML content that can be loaded in the TabStrip item content area. Content `div` elements must be empty for the AJAX loading to work.

The example below demonstrates how to load content asynchronously using AJAX.

###### Example

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

### Dynamic Tabs

The TabStrip API provides methods for dynamically adding or removing TabStrip bars. To add items, provide the new item as a JSON object along with a reference item. A reference item is a target TabStrip tab HTML element that already exists in the TabStrip. The reference item will be used to determine the placement in the hierarchy of the new tab. Any valid jQuery selector can be used to obtain a reference to the target item.

For more information on configuring TabStrip items, see the [TabStrip API demos](http://demos.telerik.com/kendo-ui/tabstrip/api).

The example below demonstrates how to add a new TabStrip tab.

###### Example

    <div id="tabstrip">
        <ul>
            <li>First Tab</li>
            <li>Second Tab</li>
        </ul>
        <div></div>
        <div></div>
    </div>

    <script>
        var tabstrip = $("#tabstrip").data("kendoTabStrip");
        tabstrip.insertAfter(
            { text: "New Tab" },
            tabstrip.tabGroup.children("li:last")
        );
    </script>

### Scrollable Tabs

As of 2015 Q2 (2015.2.624) version Kendo UI TabStrip supports scrollable tabs for `tabPosition` of `"top"` and `"bottom"`. During initialization, the widget checks if the tabs fit in the available horizontal space and if not, scroll buttons will appear on the widget sides. This behavior is enabled by default, but [can be disabled](/api/javascript/ui/tabstrip#configuration-scrollable).

If the TabStrip has no fixed width and is placed in a fluid layout, it can re-check whether tab scrolling is necessary, or is no longer required. To achieve this, execute the widget's [`resize()` method](/using-kendo-in-responsive-web-pages#individual-widget-resizing), e.g. in `window.resize`. The `resize` method will also show the right scroll button if the last and selected tab becomes invisibile as a result of TabStrip shrinking.

For additional information on the configuration, events, and methods of the widget, check the [TabStrip API](/api/javascript/ui/tabstrip).

### Scrollable Content

The TabStrip content containers are scrollable by default. This allows the widget to display scrollbars if it has a fixed height and holds large content that cannot fit. If needed, it is possible to disable TabStrip content scrolling. This can help in scenarios where the TabStrip hosts a widget such as a Menu that needs to overflow outside the TabStrip. For more information and a runnable example, check the following how-to article: [Disable TabStrip Content Scrolling](/controls/navigation/tabstrip/how-to/disable-content-scrolling)

### Select Tab on Initial Load

It is possible to select a tab and display its associated content upon the initial load. There are two ways to accomplish this task:

1.  Add a `"k-state-active"` class to the DOM element of the tab
2.  Use `select()` to target and select a tab either by selector, or index

Both approaches produce the same result.

The example below demonstrates how to manually select a default tab using HTML.

###### Example

    <div id="tabstrip">
        <ul>
            <li class="k-state-active">First Tab</li>
            <li>Second Tab</li>
        </ul>
        <div></div>
        <div></div>
    </div>

The example below demonstrates how to initialize a TabStrip and select the first tab via `select` (element).  

###### Example

    <div id="tabstrip">
        <ul>
            <li class="k-state-active">First Tab</li>
            <li>Second Tab</li>
        </ul>
        <div></div>
        <div></div>
    </div>

    <script>
        $(document).ready(function(){
            var tabstrip = $("#tabstrip").kendoTabStrip().data("kendoTabStrip");
            tabstrip.select(tabstrip.tabGroup.children("li:first"));
        });
    </script>

The example below demonstrates how to initialize a TabStrip and select the first tab via `select` (index).

###### Example

    <div id="tabstrip">
        <ul>
            <li class="k-state-active">First Tab</li>
            <li>Second Tab</li>
        </ul>
        <div></div>
        <div></div>
    </div>

    <script>
        $(document).ready(function(){
            var tabstrip = $("#tabstrip").kendoTabStrip().data("kendoTabStrip");
            tabstrip.select(0);
        });
    </script>

## See Also

Other articles on Kendo UI TabStrip:

* [Overview of the ASP.NET MVC HtmlHelper Extension for the TabStrip Widget](/aspnet-mvc/helpers/tabstrip/overview)
* [Overview of the TabStrip JSP Tag]({% slug overview_tabstrip_uiforjsp %})
* [Overview of the TabStrip PHP Class](/php/widgets/tabstrip/overview)
* [How to Display Buttons at the Bottom]({% slug howto_displaybuttonsatthebottom_tabstrip %})
* [How to Expand to 100% Height and Auto-Resize]({% slug howto_expandto100percentheightautoresize_tabstrip %})
* [How to Initialize the Grid in Kendo UI TabStrip]({% slug initialize_thegrid_tabstrip_widget %})
* [How to Scroll TabStrip with Keyboard]({% slug howto_scrolltabstripwithkeyboard_tabstrip %})
* [TabStrip JavaScript API Reference](/api/javascript/ui/tabstrip)
