---
title: Select multiple rows with checkboxes
page_title: Select multiple rows with checkboxes
description: Select multiple rows with checkboxes
---

# Select multiple rows with checkboxes

The following runnable sample demonstrates how to select multiple rows using checkbox template.

#### Example

```html
  <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        dataSource: {
          data: [
            {id: 1, foo: "item1", bar: "name1"},
            {id: 2, foo: "item2", bar: "name2"},
            {id: 3, foo: "item3", bar: "name3"},
            {id: 4, foo: "item4", bar: "name4"},
            {id: 5, foo: "item5", bar: "name5"},
            {id: 6, foo: "item6", bar: "name6"},
            {id: 7, foo: "item7", bar: "name7"},
            {id: 8, foo: "item8", bar: "name8"},
            {id: 9, foo: "item9", bar: "name9"}
          ]
        },
        columns: [{
          title: "select",
          template: '<input class="checkbox" type="checkbox" />'
        }, 
                  { field: "id" },
                  { field: "foo" },
                  { field: "bar" }],
        dataBound: function () {
          $(".checkbox").bind("change", function (e) {
            $(e.target).closest("tr").toggleClass("k-state-selected");
          });
        }
      })
    </script>
```