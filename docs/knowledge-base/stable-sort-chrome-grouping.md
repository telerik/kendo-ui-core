---
title: Implement Stable Sorting for Grouped Data in Chrome
page_title: Stable Sorting for Grouped Data | Kendo UI Grid for jQuery
description: "An example on how to implement stable sorting for grouped data in Google Chrome when using the Kendo UI jQuery Grid widget."
previous_url: /controls/data-management/grid/how-to/sorting/stable-sort-chrome-grouping
slug: howto_implement_stable_sortwithgroupingin_chrome_grid
tags: implement, stable, sorting, for, grouped, data, grid, chrome
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

How can I implement stable sorting for grouped data in Google Chrome when using the Kendo UI jQuery Grid widget?

## Solution

The implementation of the built-in sorting algorithm in Google Chrome [is not guaranteed to be stable](https://bugs.chromium.org/p/v8/issues/detail?id=90).

A [non-stable sorting algorithm](https://en.wikipedia.org/wiki/Sorting_algorithm#Stability) might cause items with the same sorting order to change places. When the Grid is grouped by a given field, you can use the [`sort`](/api/javascript/data/datasource/methods/sort) method in the [`group`](/api/javascript/ui/grid/events/group) event handler to programmatically sort the items within each group in the preferred order.

The following example demonstrates how to apply a stable sort function by using a position field in the Grid.

```dojo
<div id="grid"></div>

    <script>
      $("#grid").kendoGrid({
        dataSource: [
          { "Name": "Group1", "Value": 1 },
          { "Name": "Group1", "Value": 2 },
          { "Name": "Group1", "Value": 3 },
          { "Name": "Group1", "Value": 4 },
          { "Name": "Group1", "Value": 5 },
          { "Name": "Group1", "Value": 6 },
          { "Name": "Group1", "Value": 7 },
          { "Name": "Group1", "Value": 8 },
          { "Name": "Group2", "Value": 1 },
          { "Name": "Group2", "Value": 2 },
          { "Name": "Group2", "Value": 3 }
        ],
        height: 600,
        group: function(e){
          var groupedByName = false;
          e.groups.forEach(function(item){
            if(item.field === 'Name'){
              groupedByName = true;
              return;
            }
          })

          if(groupedByName){
            e.sender.dataSource.sort({
              field: 'Name',
              dir: 'asc',
              compare: function(a, b) {
                if(a.Name !== b.Name) {
                  return a.Name.localeCompare(b.Name);
                }

                return a.Value - b.Value;
              }
            });
          }
        },
        groupable: true,
        columns: ['Name', 'Value']
      });
    </script>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
