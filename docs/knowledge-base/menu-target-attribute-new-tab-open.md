---
title: Open New Tab on Menu Item Click
description: An example demonstrating how to open a new tab when selecting a menu item
type: how-to
page_title: Navigate to New Tab on Item Click | Kendo UI Menu
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

What is the best way to navigate to a new browser tab when a user clicks on a Kendo UI Menu item? 

## Solution

There are a couple of ways to open new tab with a specific url when a user clicks on a Kendo UI Menu item:

1. Utilizing the [Select event](https://docs.telerik.com/kendo-ui/api/javascript/ui/menu/events/select) to determine if the item has a target attribute.  If it does, use [window.open](https://developer.mozilla.org/en-US/docs/Web/API/Window/open):

```javascript
    select: function(e){
      if(e.item.getAttribute("target")){
        e.preventDefault();
        
        //use window.open() to open a new browser window
        window.open($(e.item).find("a.k-link").first().attr("href"), e.item.getAttribute("target"));
      }
    },
```

```dojo
    <ul id="menu"></ul>
    <script>
      $(document).ready(function() {
        $("#menu").kendoMenu({
          select: function(e){
            if(e.item.getAttribute("target")){
              e.preventDefault();
              
              //use window.open() to open a new browser window
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

2.  During the [Open event](https://docs.telerik.com/kendo-ui/api/javascript/ui/menu/events/open), determine if the target attribute has been set to "_blank" for the menu item.  If not, find the k-link class and set the target:
```javascript
      open: function(e) {
        var hasTarget = $(e.sender.element).find(".k-link").attr("target");
        if(hasTarget != "_blank"){
          $(e.sender.element).find(".k-link").attr("target", "_blank");  
        }
      },
```

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

* [select - Documentation and API Reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/menu/events/select)
* [Window.open() - MDN web docs](https://developer.mozilla.org/en-US/docs/Web/API/Window/open)
