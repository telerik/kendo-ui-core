---
title: Add or Remove Tiles
page_title: The Telerik UI TileLayout HtmlHelper for {{ site.framework }} Documentation | TileLayout Add/Remove
description: "Learn the basics of the The Telerik UI TileLayout HtmlHelper for {{ site.framework }} add/remove functionality."
slug: htmlhelpers_aspnet_tilelayout_add_remove
position: 5
---

# Add or Remove Tiles

The Kendo UI TileLayout component supports the option to dynamically add and remove tiles.

## Usage

This functionality is a custom implementation based on the [`splice`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) JS array method and the [`setOptions`](https://docs.telerik.com/kendo-ui/api/javascript/ui/tilelayout/methods/setOptions) TileLayout client-side method.


The example below demonstrates how you can enable users to remove a tile from the TileLayout by a clicking on its close button.


```Razor
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
```

For a full implementation of the Add/Remove functionality please refer to the official [`Add/Remove demo`](https://demos.telerik.com/{{ site.platform }}/tilelayout/add-remove) page.

## See Also

* [Overview of the Tile Layout (Demo)](https://demos.telerik.com/{{ site.platform }}/tilelayout/index)
* [API Reference of the Tile Layout](/api/tilelayout)
* [Resizing]({% slug htmlhelpers_aspnet_tilelayout_resizing %})
* [Reordering]({% slug htmlhelpers_aspnet_tilelayout_reordering %})
