---
title: Overview
page_title: Overview of Tabstrip UI widget | Kendo UI Documentation
description: This documentation helps you get started with TabStrip, initialize the widget and how to load the content with AJAX.
---

# TabStrip Overview

The Kendo UI TabStrip displays a collection of tabs with associated content. It is composed of an
unordered list of items - representing tabs - and a collection of div elements, which contain the content for
each tab.


## Getting Started

### Initialize a Kendo UI TabStrip using HTML markup

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

### Initialize a Kendo UI TabStrip using a JSON data object
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
            url: "http://www.telerik.com"               // Link URL if navigation is needed, optional.
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
             imageUrl: "http://www.telerik.com/test.jpg" // Item image URL, optional.
           },
           {
             text: "Item 5",
             spriteCssClass: "imageClass3"               // Item image sprite CSS class, optional.
           }]
        });
      });
    </script>

Initialization of a TaStrip should occur after the DOM is fully loaded. It is recommended that initialization the TaStrip is done within a $(document).ready() statement.
    
The tabs of a TabStrip are not required to have content. Should a tab have no content, it is safe to omit its associated div.

## Load TabStrip content with AJAX

The TabStrip provides built-in support for asynchronously loading content from remote URLs. These URLs should return HTML content that can be
loaded in the TabStrip item content area. Content DIVs should be empty for AJAX loading to work.

### Loading Tab content asynchronously using AJAX

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
     
## Configure dynamic TabStrip tabs

The TabStrip API provides methods for dynamic adding or removing TabStrip bars. To add items, you need to provide the new item as a JSON
object along with a reference item.

A reference item is a target TabStrip tab HTML element that already exists in the TabStrip. The reference item will be used to determine the
placement in the hierarchy of the new tab. Any valid jQuery selector can be used to obtain a reference to the target item.

### How to add a new tab
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

## Select a Tab on Initial Load

It is possible to select a tab and display its associated content upon the initial load. There are two (2) ways
to accomplish this task:


1.  Add a "k-state-active" class to the DOM element of the tab
2.  Use select() to target and select a tab either by selector or index

Both approaches will produce the same result.

### Select a default tab manually using HTML

    <div id="tabstrip">
        <ul>
            <li class="k-state-active">First Tab</li>
            <li>Second Tab</li>
        </ul>
        <div></div>
        <div></div>
    </div>

### Initialize a TabStrip and select first tab via select(element)
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

### Initialize a TabStrip and select first tab via select(index)
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
