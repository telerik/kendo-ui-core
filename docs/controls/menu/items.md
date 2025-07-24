---
title: Items
page_title: jQuery Menu Documentation - Items
description: "Get started with the jQuery Menu by Kendo UI and configure the items of the component."
slug: items_kendoui_menu
position: 4
---

# Items

The Menu component displays a hierarchical list of items, which can include submenus, icons, and custom templates. You can define the Menu items declaratively in the HTML or dynamically through JavaScript configuration. 

You can configure the Menu items by specifying an array of objects, where each object represents a menu item. Each item can have the following properties:

| Name         | Type      | Description                                                                 |
|--------------|-----------|-----------------------------------------------------------------------------|
| `text`       | String    | The text displayed for the item.                                            |
| `url`        | String    | The URL to navigate to when the item is clicked.                            |
| `icon`       | String    | The name of a <a href="https://www.telerik.com/design-system/docs/foundation/iconography/icon-list/ target="_blank">built-in Kendo UI icon</a> to display.                            |
| `imageUrl`   | String    | The URL of an image to display as an icon.                                  |
| `items`      | Array     | An array of child items (submenus).                                         |
| `enabled`    | Boolean   | If set to `false`, the item will be disabled.                               |
| `cssClass`   | String    | A custom CSS class to apply to the item.                                    | 

## Setting the Text

You can define the text of the item using the `text` field.

```dojo
<ul id="menu"></ul>

<script>
    $("#menu").kendoMenu({
        dataSource: [
            { text: "File", items: [
                { text: "New"  },
                { text: "Open" },
                { text: "Save" }
            ]
            },
            { text: "Edit", items: [
                { text: "Cut" },
                { text: "Copy" },
                { text: "Paste" }
            ]
            },
            { text: "Help" }
        ]
    });
</script>
```

## Configuring URLs

You can set the URL of the items by using the `url` field. The URL will be rendered as an href attribute on the item link.

```dojo
    <ul id="menu"></ul>
    <script>
        $("#menu").kendoMenu({
            dataSource: [
                { text: "Home", url: "https://www.example.com/?item=1.1" },
                { text: "About Us", url: "https://www.example.com/?item=1.2" }, 
                { text: "Contact", url: "https://www.example.com/?item=1.3" }
            ]
        });
    </script>
```

## Showing Icons and Images

You can easily enhance the content in the Menu by showing an icon or an image through the `icon` and `imageUrl` fields: 

```dojo
    <ul id="menu"></ul>
    <script>
      $("#menu").kendoMenu({
        dataSource: {
          data: [
            {
              Name: "Image Item",
              imgUrl: "https://demos.telerik.com/kendo-ui/content/shared/icons/sports/golf.png",
            },
            {
              Name: "Icon Item",
              icon: "gear",
            },
          ],
        },
        dataTextField: "Name",
        dataImageUrlField: "imgUrl",
      });
    </script>
```

## Adding Styles and Classes

You can add custom CSS classes to the Menu items through the `cssClass` field.

```dojo
    <ul id="menu"></ul>
    <script>
      $("#menu").kendoMenu({
        dataSource: [
          {
            text: "Red Item",
            cssClass: "red",
            items: [
              {text: "Sub Red Item" , cssClass: "red"}
            ]
          },
          {
            text: "Green Item",
            cssClass: "green",
            items: [
              {text: "Sub Green Item" , cssClass: "green"}
            ]
          }
        ],
      });
    </script>
    <style>
      .red {
        color: red !important;
      }

      .green {
        color: green !important;
      }
    </style>
```

## Disabling Items

You can specify a Menu item as disabled by using the `enabled` field.

```dojo
    <ul id="menu"></ul>
    <script>
      $("#menu").kendoMenu({
        dataSource: [
          {
            text: "Item 1",             
          },
          {
            text: "Disabled Item", 
            enabled:false
          }
        ],
      });
    </script>
```

## See Also

* [Overview of the Menu (Demo)](https://demos.telerik.com/kendo-ui/menu/index)
* [Using the API of the Menu (Demo)](https://demos.telerik.com/kendo-ui/menu/api)
* [JavaScript API Reference of the Menu](/api/javascript/ui/menu)
