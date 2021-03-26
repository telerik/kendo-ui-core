---
title: Add or Remove Tiles
page_title: Kendo UI for jQuery TileLayout Documentation | TileLayout Add/Remove
description: "Learn how to enable and use the reordering functionality of the Kendo UI for jQuery TileLayout."
slug: add_remove_kendoui_tilelayout_widget
position: 5
---

# Add or Remove Tiles

The Kendo UI TileLayout widget supports the option to dynamically add and remove tiles.

## Usage

This functionality is a custom implementation based on the [`splice`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) JS array method and the [`setOptions`](https://docs.telerik.com/kendo-ui/api/javascript/ui/tilelayout/methods/setOptions) TileLayout client-side method.


The example below demonstrates how you can enable users to remove a tile from the TileLayout by a clicking on its close button.


```dojo
    <base href="https://demos.telerik.com/kendo-ui/tilelayout/reordering">
      <div id="tilelayout"></div>

      <!-- container templates -->
      <script id="barcelona" type="text/x-kendo-template">
        <a class='k-button k-button-icon k-flat k-close-button'><span class='k-icon k-i-close'></span></a>
            <img class="k-card-image" draggable="false" src="../content/web/cards/barcelona.jpg")" />
      </script>
      <script id="sofia" type="text/x-kendo-template">
        <a class='k-button k-button-icon k-flat k-close-button'><span class='k-icon k-i-close'></span></a>
            <img class="k-card-image" draggable="false" src="../content/web/cards/sofia.jpg")" />
      </script>
      <script id="rome" type="text/x-kendo-template">
        <a class='k-button k-button-icon k-flat k-close-button'><span class='k-icon k-i-close'></span></a>
            <img class="k-card-image" draggable="false" src="../content/web/cards/rome.jpg")" />
      </script>
      <script id="sa" type="text/x-kendo-template">
        <a class='k-button k-button-icon k-flat k-close-button'><span class='k-icon k-i-close'></span></a>
            <img class="k-card-image" draggable="false" src="../content/web/cards/south-africa.jpg")" />
      </script>

      <script>
        var tilelayout = $("#tilelayout").kendoTileLayout({
          containers: [{
            colSpan: 1,
            rowSpan: 1,
            bodyTemplate: kendo.template($("#barcelona").html())
          }, {
            colSpan: 1,
            rowSpan: 1,
            bodyTemplate: kendo.template($("#sofia").html())
          }, {
            colSpan: 1,
            rowSpan: 1,
            bodyTemplate: kendo.template($("#rome").html())
          }, {
            colSpan: 1,
            rowSpan: 1,
            bodyTemplate: kendo.template($("#sa").html())
          }],
          columns: 2,
          columnsWidth: 285,
          rowsHeight: 250,
        }).data("kendoTileLayout");

        function add() {

        }

        $("#tilelayout").on("click", ".k-button", function (e) {
          var itemId = $(e.currentTarget).closest(".k-tilelayout-item").attr("id");
          var mainItems = tilelayout.items;
          var item = tilelayout.itemsMap[itemId];

          mainItems.splice(mainItems.indexOf(item), 1);
          item.colSpan = 1;

          recreateSetup(mainItems);
        });


        function recreateSetup(mainItems) {
          for (var i = 0; i < mainItems.length; i++) {
            if (mainItems[i]) {
              mainItems[i].order = i;
            }
          }

          tilelayout.setOptions({ containers: mainItems });
        }
      </script>

  <style>
    .k-card-image {
      width: 285px;
      height: 189px;
      margin-top: 22px;
    }

    .close-button {
      float: right;
    }
    .k-close-button {
      position: absolute;
      right: 0;
      top: 0;
      margin: 5px;
    }
  </style>
```

For a full implementation of the Add/Remove functionality please refer to the official [`Add/Remove demo`](https://demos.telerik.com/kendo-ui/tilelayout/add-remove) page.


## See Also

* [Overview of the TileLayout (Demo)](https://demos.telerik.com/kendo-ui/tilelayout/index)
* [JavaScript API Reference of the TileLayout](/api/javascript/ui/tilelayout)
* [Resizing]({% slug resizing_kendoui_tilelayout_widget %})
* [Containers]({% slug containers_kendoui_tilelayout_widget %})
