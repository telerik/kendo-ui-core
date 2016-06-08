---
title: Group Data
page_title: Group Data | Hybrid UI ListView
description: "Learn how to group data in the Hybrid UI ListView of Kendo UI."
slug: howto_group_data_hybridlistview
---

# Group Data

The example below demonstrates how to group data by the first letter of each item in a hybrid Kendo UI ListView.

###### Example

```html
    <div id="home" data-role="view" data-init="onInit">
      <ul id="listview"></ul>
    </div>
    <script>
      var app = new kendo.mobile.Application();

      var groupedData = [
        {name: "Sashimi salad"},
        {name: "Chirashi sushi"},
        {name: "Seaweed salad"},
        {name: "Edamame"},
        {name: "Miso soup"},
        {name: "Maguro"},
        {name: "Shake"},
        {name: "Shiromi"},
        {name: "Tekka maki"},
        {name: "Hosomaki Mix"},
        {name: "California rolls"},
        {name: "Seattle rolls"},
        {name: "Spicy Tuna rolls"},
        {name: "Ebi rolls"},
        {name: "Chicken Teriyaki"},
        {name: "Salmon Teriyaki"},
        {name: "Gohan"},
        {name: "Tori Katsu"},
        {name: "Yaki Udon"}
      ];

      function onInit() {
        $("#listview").kendoMobileListView({
          dataSource: {
            data: groupedData,
            schema: {
              parse: function (data) {
                for(var i = 0; i < data.length; i++) {
                  data[i].letter = data[i].name.charAt(0);
                }
                return data;
              }
            },
            group: { field: "letter" }
          },
          template: "${name}",
          fixedHeaders: true
        });
      }
    </script>
```

## See Also

Other articles and how-to examples on the Hybrid UI ListView:

* [Hybrid UI ListView JavaScript API Reference](/api/javascript/mobile/ui/listview)
* [Overview of the Hybrid UI ListView]({% slug overview_hybridlistview %})
* [Endless Scrolling Feature]({% slug endlessscrolling_hybridlistview %})
* [Pull-to-Refresh Feature]({% slug pulltorefreshfeature_hybridlistview %})

For more runnable examples on the Kendo UI hybrid ListView, browse its [**How To** documentation folder]({% slug howto_usejssignature_hybridlistview %}).
