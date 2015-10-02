---
title: Stable Sort in Chrome
page_title: Stable Sort in Google Chrome
description: A How-To article explaining how to implement a stable sort in Google Chrome
---

# Implementing Stable Sort in Google Chrome

The implementation of the built-in sorting algorithm in Google Chrome [is not guaranteed to be stable](https://code.google.com/p/v8/issues/detail?id=90).

A [non-stable sorting algorithm](https://en.wikipedia.org/wiki/Sorting_algorithm#Stability) may cause items with the same sorting order to change places.

Take the example below. When you run it in Chrome and sort by the Address field, the items will change place.
This is visible if you look at the Name column.

#### Example: A typical case where non-stable sort will cause side effects

```html
    <div id="grid"></div>
    <script>
      var dataSource = new kendo.data.DataSource({
        data: [
          { Name: "Jane Doe",    Address:"" },
          { Name: "Jane Doe 1",  Address:"" },
          { Name: "Jane Doe 2",  Address:"" },
          { Name: "Jane Doe 3",  Address:"" },
          { Name: "Jane Doe 4",  Address:"" },
          { Name: "Jane Doe 5",  Address:"" },
          { Name: "Jane Doe 6",  Address:"" },
          { Name: "Jane Doe 7",  Address:"" },
          { Name: "Jane Doe 8",  Address:"" },
          { Name: "Jane Doe 9",  Address:"" },
          { Name: "Jane Doe 10", Address:"" }
        ]
      });

      $("#grid").kendoGrid({
        dataSource: dataSource,
        sortable:true,
        columns: [{
          field: "Name"
        }, {
          field: "Address"
        }]
      });
    </script>
```

We can "sort" this out by adding a position field and using it to maintain stability.
This is done with a custom [columns.sortable.compare function](/api/javascript/ui/grid#configuration-columns.sortable.compare).

#### Example: A stable sort function using a position field

```html
    <div id="grid"></div>
    <script>
      var dataSource = new kendo.data.DataSource({
        data: [
          { _position: 1,  Name: "Jane Doe",    Address:"" },
          { _position: 2,  Name: "Jane Doe 1",  Address:"" },
          { _position: 3,  Name: "Jane Doe 2",  Address:"" },
          { _position: 4,  Name: "Jane Doe 3",  Address:"" },
          { _position: 5,  Name: "Jane Doe 4",  Address:"" },
          { _position: 6,  Name: "Jane Doe 5",  Address:"" },
          { _position: 7,  Name: "Jane Doe 6",  Address:"" },
          { _position: 8,  Name: "Jane Doe 7",  Address:"" },
          { _position: 9,  Name: "Jane Doe 8",  Address:"" },
          { _position: 10, Name: "Jane Doe 9",  Address:"" },
          { _position: 11, Name: "Jane Doe 10", Address:"" }
        ]
      });

      $("#grid").kendoGrid({
        dataSource: dataSource,
        sortable:true,
        columns: [{
          field: "Name"
        }, {
          field: "Address",
          sortable: {
            compare: function(a, b, descending) {
              if(a.Address !== b.Address)
              {
                return a.Address - b.Address;
              }

              if (descending) {
                return b._position - a._position;
              } else {
                return a._position - b._position;
              }
            }
          }
        }]
      });
    </script>
```
