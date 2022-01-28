---
title: Overview
page_title: jQuery TabStrip Documentation | TabStrip Overview
description: "Get started with the jQuery TabStrip by Kendo UI and learn how to initialize the widget and use its events."
slug: overview_kendoui_tabstrip_widget
position: 1
---

# TabStrip Overview

The TabStrip displays a collection of tabs with associated content.

It is composed of an unordered list of items which represent tabs, and a collection of `div` elements, which contain the content for each tab.

* [Demo page for the TabStrip](https://demos.telerik.com/kendo-ui/tabstrip/index)

## Initializing the TabStrip

To initialize the TabStrip, use either of the following approaches:

* [Using HTML markup](#using-html-markup)
* [Using a JSON `data` object](#using-json-data-object)

> * When you initialize the TabStrip, create it within a `$(document).ready()` statement because the widget has to be initialized after the DOM is fully loaded.
> * It is not mandatory for the tabs to have content. Therefore, when you create an empty tab, you can skip its associated `div` element.

### From HTML

The following example demonstrates how to initialize the TabStrip from HTML markup.

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

### From JSON

The following example demonstrates how to initialize the TabStrip from a JSON `data` object.

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
            url: "https://www.telerik.com"               // (Optional) Link URL if navigation is needed
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
             imageUrl: "https://www.telerik.com/test.jpg" // (Optional) Item image URL
           },
           {
             text: "Item 5",
             spriteCssClass: "imageClass3"               // (Optional) Item image sprite CSS class
           }]
        });
      });
    </script>

## Functionality and Features

* [Icon TabStrip]({% slug icons_tabstrip %})
* [Tabs]({% slug tabs_tabstrip %})
* [Animation]({% slug animations_tabstrip %})
* [Content operations]({% slug content_tabstrip %})
* [Globalization]({% slug globalization_tabstrip %})
* [Accessibility]({% slug accessibility_tabstrip %})

## Events

For a complete example on the basic TabStrip events, refer to the [demo on using the events of the TabStrip](https://demos.telerik.com/kendo-ui/tabstrip/events).

## See Also

* [Basic Usage of the TabStrip (Demo)](https://demos.telerik.com/kendo-ui/tabstrip/index)
* [Using the Basic Events of the TabStrip (Demo)](https://demos.telerik.com/kendo-ui/tabstrip/events)
* [Binding the TabStrip over MVVM (Demo)](https://demos.telerik.com/kendo-ui/tabstrip/mvvm)
* [Using the TabStrip with AngularJS Directives (Demo)](https://demos.telerik.com/kendo-ui/tabstrip/angular)
* [Applying the TabStrip API (Demo)](https://demos.telerik.com/kendo-ui/tabstrip/api)
* [JavaScript API Reference of the TabStrip](/api/javascript/ui/tabstrip)
