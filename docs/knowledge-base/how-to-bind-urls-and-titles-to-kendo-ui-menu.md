---
title: Configuring DataSource with URLs and Titles for Kendo UI Menu
description: Learn how to bind URLs and titles/tooltips to the Kendo UI Menu through a JSON array and open links in a new tab.
type: how-to
page_title: How to Bind URLs and Titles to Kendo UI Menu Items and Open in New Tabs
slug: how-to-bind-urls-and-titles-to-kendo-ui-menu
tags: kendo ui, menu, datasource, json, url, title, tooltip, new tab, window
res_type: kb
components: ["menu"]
ticketid: 1669505
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Menu for Progress® Kendo UI®</td>
</tr>
<tr>
<td>Version</td>
<td>2024.3.1015</td>
</tr>
</tbody>
</table>

## Description

I want to configure a JSON array to bind a URL and a title/tooltip for the [Kendo UI Menu's](https://docs.telerik.com/kendo-ui/api/javascript/ui/menu) DataSource. Additionally, I need to open links in a new tab or window when clicking a menu item. This KB article also answers the following questions:
- How to add a tooltip to Kendo UI Menu items?
- How to configure the DataSource for Kendo UI Menu with URLs?
- How to open Kendo UI Menu links in a new tab?

## Solution

To bind URLs and titles/tooltips to the Kendo UI Menu through a JSON array and ensure links open in a new tab, follow these steps:

1. Define the dataSource with URLs and titles. Use the `attr` property to set the title attribute for tooltips.

    ```javascript
    var data = [
      {
        text: "Kendo UI Components", 
        items: [
          { 
            text: "Kendo UI for jQuery",
            url: "https://www.telerik.com/kendo-jquery-ui", 
            attr: {
              title: 'Kendo UI for jQuery',
            },
          },
          { 
            text: "Kendo UI for Angular",
            url: "https://www.telerik.com/kendo-angular-ui", 
            attr: {
              title: 'Kendo UI for Angular',
            },
          },
          { 
            text: "KendoReact",
            url: "https://www.telerik.com/kendo-react-ui", 
            attr: {
              title: 'KendoReact',
            },
          },
          { 
            text: "Kendo UI for Vue",
            url: "https://www.telerik.com/kendo-vue-ui", 
            attr: {
              title: 'Kendo UI for Vue',
            },
          },
        ]
      }
    ];
    ```

2. Configure the Kendo UI Menu and use the `open` event to set the target attribute to `_blank` for links, ensuring they open in a new tab or window.

    ```javascript
    $("#myMenu").kendoMenu({
      dataSource: data,

      open: function(e) {
        // Check if the item has a target
        var hasTarget = $(e.sender.element).find(".k-link").attr("target");

        // If there is a target but is not _blank, set to _blank
        if(hasTarget != "_blank"){
          $(e.sender.element).find(".k-link").attr("target", "_blank");  
        }
      },
    });
    ```

Refer to the Kendo UI Menu's [API documentation](https://docs.telerik.com/kendo-ui/api/javascript/ui/menu/configuration/datasource) for more details on the dataSource configuration including a list of supported properties and the [`Open a New Tab on Menu Item Click` knowledge base article](https://docs.telerik.com/kendo-ui/knowledge-base/menu-target-attribute-new-tab-open) for additional approaches on opening links in a new tab.

Below is a runnable example: 

```dojo
    <ul id="myMenu"></ul>
    <script>
      var data = [
        {
          text: "Kendo UI Components", 
          items: [
            { 
              text: "Kendo UI for jQuery",
              url: "https://www.telerik.com/kendo-jquery-ui", 
              attr: {
                title: 'Kendo UI for jQuery',
              },
            },
            { 
              text: "Kendo UI for Angular",
              url: "https://www.telerik.com/kendo-angular-ui", 
              attr: {
                title: 'Kendo UI for Angular',
              },
            },
            { 
              text: "KendoReact",
              url: "https://www.telerik.com/kendo-react-ui", 
              attr: {
                title: 'KendoReact',
              },
            },
            { 
              text: "Kendo UI for Vue",
              url: "https://www.telerik.com/kendo-vue-ui", 
              attr: {
                title: 'Kendo UI for Vue',
              },
            },
          ]
        }
      ];

      var inlineDefault = new kendo.data.HierarchicalDataSource({
        data: data,
      });

      $(document).ready(function() {
        $("#myMenu").kendoMenu({
          dataSource: inlineDefault,

          open: function(e) {

            //check if the item has a target
            var hasTarget = $(e.sender.element).find(".k-link").attr("target");

            //if there is a target but is not _blank, set to _blank
            if(hasTarget != "_blank"){
              $(e.sender.element).find(".k-link").attr("target", "_blank");  
            }
          },
        });
      });
    </script>
```

## See Also

- [Kendo UI Menu API - DataSource Configuration](https://docs.telerik.com/kendo-ui/api/javascript/ui/menu/configuration/datasource)
- [Kendo UI Menu Events - Open](https://docs.telerik.com/kendo-ui/api/javascript/ui/menu/events/open)
- [Kendo UI Menu - Opening Links in a New Tab](https://docs.telerik.com/kendo-ui/knowledge-base/menu-target-attribute-new-tab-open)
- [Progress Kendo UI Dojo Example](https://dojo.telerik.com/QIxOAwqU)
