---
title: Open a New Tab on Menu Item Click
description: An example on how to open a new tab when selecting a menu item in the Kendo UI Menu for jQuery.  
type: how-to
page_title: Navigate to a New Tab on Item Click | Kendo UI Menu for jQuery
slug: menu-target-attribute-new-tab-open
tags: menu, target, attribute, new, tab, open, navigate
ticketid: 1408587
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Menu for Progress® Kendo UI®</td>
 </tr>

  <td>Product Version</td>
  <td>2019.2.514</td>
 </tr>
</table>

## Description

How can I navigate to a new browser tab when a user clicks on a Kendo UI Menu item?

## Solution

To open a new tab with a specific URL when a user clicks on a Menu item, use either of the following approaches:

* Utilize the [`select` event](https://docs.telerik.com/kendo-ui/api/javascript/ui/menu/events/select) to determine if the item has a `target` attribute. If it does, use [`window.open`](https://developer.mozilla.org/en-US/docs/Web/API/Window/open) method.

        ```javascript
            select: function(e){
              if(e.item.getAttribute("target")){
                e.preventDefault();

                //use window.open() to open a new browser window
                window.open($(e.item).find("a.k-link").first().attr("href"), e.item.getAttribute("target"));
              }
            },
        ```

        The following example demonstrates the full implementation of the suggested approach.

        ```dojo
            <ul id="menu"></ul>
            <script>
              $(document).ready(function() {
                $("#menu").kendoMenu({
                  select: function(e){
                    if(e.item.getAttribute("target")){
                      e.preventDefault();

                      // Use window.open() to open a new browser window.
                      window.open($(e.item).find("a.k-link").first().attr("href"), e.item.getAttribute("target"));
                    }
                  },
                  dataSource:
                  [{
                    text: "Search Engines",
                    cssClass: "myClass",                          
                    items: [{                                    
                      text: "Google",
                      url: "https://www.google.com",
                      attr: {
                        target: "_blank"
                      }
                    },{
                      text: "Bing",
                      url: "https://www.bing.com",
                      attr: {
                        target: "_blank"
                      }
                    }]
                  },
                  ]
                });
              });
            </script>
        ```

* During the [`open` event](https://docs.telerik.com/kendo-ui/api/javascript/ui/menu/events/open), determine if the `target` attribute was set to `"_blank"` for the menu item. If not, find the `k-link` class and set the target.

        ```javascript
              open: function(e) {
                var hasTarget = $(e.sender.element).find(".k-link").attr("target");
                if(hasTarget != "_blank"){
                  $(e.sender.element).find(".k-link").attr("target", "_blank");  
                }
              },
        ```

        The following example demonstrates the full implementation of the suggested approach.

        ```dojo
          <ul id="menu"></ul>
          <script>
            $(document).ready(function() {
              $("#menu").kendoMenu({
                open: function(e) {
                  var hasTarget = $(e.sender.element).find(".k-link").attr("target");
                  if(hasTarget != "_blank"){
                    $(e.sender.element).find(".k-link").attr("target", "_blank");  
                  }
                },
                dataSource:
                [{
                  text: "Search Engines",
                  cssClass: "myClass",                          
                  items: [{                                    
                    text: "Google",
                    url: "https://www.google.com",
                  },{
                    text: "Bing",
                    url: "https://www.bing.com",
                  }]
                },
                ]
              });
            });
          </script>
        ```

## See Also

* [API Reference of the select Event](https://docs.telerik.com/kendo-ui/api/javascript/ui/menu/events/select)
* [Official MDN Web Documentation of Window.open()](https://developer.mozilla.org/en-US/docs/Web/API/Window/open)
