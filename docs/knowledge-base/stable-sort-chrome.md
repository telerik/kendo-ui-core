---
title: Implement Stable Sorting in Chrome
page_title: Stable Sorting in Chrome | Kendo UI Grid for jQuery
description: "An example on how to implement stable sorting in Google Chrome with the Kendo UI Grid for jQuery. "
previous_url: /controls/data-management/grid/how-to/stable-sort-chrome, /controls/data-management/grid/how-to/sorting/stable-sort-chrome
slug: howto_implement_stable_sortin_chrome_grid
tags: implement, stable, sorting, grid, chrome
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>All</td>
 </tr>
</table>

## Description

How can I implement stable sorting in Google Chrome with the Kendo UI Grid for jQuery?

## Solution

The implementation of the built-in sorting algorithm in Google Chrome [is not guaranteed to be stable](https://bugs.chromium.org/p/v8/issues/detail?id=90).

A [non-stable sorting algorithm](https://en.wikipedia.org/wiki/Sorting_algorithm#Stability) might cause items with the same sorting order to change places. The following example demonstrates that when run in Chrome and items are sorted by **Address**, they change places. This is visible if you look at the **Name** column. The demo represents a typical case where a non-stable sorting causes side effects.

```dojo
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

The solution for this issue is to add a position field and use it to maintain stability. This is done through a custom [`columns.sortable.compare function`](/api/javascript/ui/grid/configuration/columns.sortable.compare).

 - a stable sort function using a position field

```dojo
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

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
