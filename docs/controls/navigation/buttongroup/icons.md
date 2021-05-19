---
title: Icon ButtonGroup
page_title: jQuery ButtonGroup Documentation | Icon ButtonGroup
description: "Get started with the jQuery ButtonGroup by Kendo UI and accommodate an icon and enhance the meaning of its text content."
slug: icon_kendoui_buttongroup
position: 3
---

# Icon ButtonGroup

The ButtonGroup can accommodate an icon and in this way to enhance the meaning of the text content.

You can configure the icons by using the `icon` and `imageUrl` properties of the ButtonGroup. To set a particular Button instance, use only one of them.

  <div id="buttongroup">
  </div>

  <script>
      $("#buttongroup").kendoButtonGroup({
          items: [
              { icon: "edit" },
              { imageUrl: "/images/myEditIcon.gif" }
          ]
      });
  </script>

## See Also

* [Using Icons in the ButtonGroup (Demo)](https://demos.telerik.com/kendo-ui/buttongroup/icons)
* [JavaScript API Reference of the ButtonGroup](/api/javascript/ui/buttongroup)
