---
title: Show lines between nodes
page_title: Show lines between nodes
description: Show lines between nodes
---

# Show lines between nodes

The example below demonstrates how to show lines between TreeView nodes.

#### Example

```html
    <div id="treeview"></div>

    <script>
      $("#treeview").kendoTreeView({
        dataSource: [
          { text: "Furniture", items: [
            { text: "Tables & Chairs" },
            { text: "Sofas" },
            { text: "Occasional Furniture" }
          ] },
          { text: "Decor", items: [
            { text: "Bed Linen" },
            { text: "Curtains & Blinds" },
            { text: "Carpets" }
          ] }
        ]
      });

    </script>


    <style>
      body {
        font-size: 12px;
      }

      .k-treeview .k-top,
      .k-treeview .k-mid,
      .k-treeview .k-bot {
        background-image: url('http://aspnet-skins.telerikstatic.com/mvc/2012.2.607/Default/treeview-nodes.png');
        background-repeat: no-repeat;
        margin-left: -16px;
        padding-left: 16px;
      }

      .k-treeview .k-item { background-image: url('http://aspnet-skins.telerikstatic.com/mvc/2012.2.607/Default/treeview-line.png'); }
      .k-treeview .k-last { background-image: none; }


      .k-treeview .k-top { background-position: -91px 0; }
      .k-treeview .k-bot { background-position: -69px -22px; }
      .k-treeview .k-mid { background-position: -47px -44px; }
      .k-treeview .k-last .k-top { background-position: -25px -66px; }
      .k-treeview .k-group .k-last .k-bot { background-position: -69px -22px; }

      .k-treeview .k-item {
        background-repeat: no-repeat;
      }

      .k-treeview .k-first {
        background-repeat: no-repeat;
        background-position: 0 16px;
      }

    </style>
```
